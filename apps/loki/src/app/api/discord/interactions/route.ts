import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { verifyDiscordRequest, sendFollowup, editOriginalResponse } from "@/lib/discord";
import { askGemini } from "@/lib/gemini";
import { createManusTask } from "@/lib/manus";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  const publicKey = process.env.DISCORD_PUBLIC_KEY?.trim();
  const signature = req.headers.get("x-signature-ed25519") || "";
  const timestamp = req.headers.get("x-signature-timestamp") || "";

  if (!publicKey || !verifyDiscordRequest(publicKey, signature, timestamp, rawBody)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = JSON.parse(rawBody);

  // PING — Discord verification handshake
  if (body.type === 1) {
    return NextResponse.json({ type: 1 });
  }

  // Slash command
  if (body.type === 2 && body.data?.name === "ask") {
    const question = body.data.options?.[0]?.value || "";
    const applicationId = body.application_id;
    const interactionToken = body.token;
    const channelId = body.channel_id;

    if (!question) {
      return NextResponse.json({
        type: 4,
        data: { content: "Please enter a question." },
      });
    }

    // Defer, then process in background via waitUntil
    waitUntil(handleQuestion(question, applicationId, interactionToken, channelId));
    return NextResponse.json({ type: 5 }); // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
  }

  return new NextResponse("Unknown interaction type", { status: 400 });
}

async function handleQuestion(
  question: string,
  applicationId: string,
  interactionToken: string,
  channelId: string
) {
  try {
    const result = await askGemini(question, "");

    if (result.type === "answer") {
      await editOriginalResponse(applicationId, interactionToken, `> **Q:** ${question}\n\n${result.text}`);
    } else {
      await editOriginalResponse(
        applicationId,
        interactionToken,
        `> **Q:** ${question}\n\n🔍 리서치 중입니다... 잠시만 기다려주세요.`
      );

      try {
        const manusPrompt = `Research request: ${question}\n\nProvide a structured research report in Korean with TL;DR, key findings with details, and source URLs.`;
        await createManusTask(manusPrompt, { channelId });
      } catch {
        await sendFollowup(
          applicationId,
          interactionToken,
          "⚠️ 리서치 중 문제가 발생했습니다. 다시 시도해주세요."
        );
      }
    }
  } catch (error) {
    console.error("Error handling question:", error);
    await editOriginalResponse(
      applicationId,
      interactionToken,
      `> **Q:** ${question}\n\n⚠️ 잠시 문제가 생겼습니다. 다시 시도해주세요.`
    );
  }
}
