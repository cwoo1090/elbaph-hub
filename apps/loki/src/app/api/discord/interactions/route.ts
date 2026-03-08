import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { verifyDiscordRequest, editOriginalResponse, postMessage } from "@/lib/discord";
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
    const displayName = body.member?.user?.global_name || body.member?.user?.username || "Someone";

    if (!question) {
      return NextResponse.json({
        type: 4,
        data: { content: "Please enter a question.", flags: 64 },
      });
    }

    // Ephemeral deferred response — only the user sees "thinking..."
    waitUntil(handleQuestion(question, displayName, applicationId, interactionToken, channelId));
    return NextResponse.json({ type: 5, data: { flags: 64 } });
  }

  return new NextResponse("Unknown interaction type", { status: 400 });
}

async function handleQuestion(
  question: string,
  displayName: string,
  applicationId: string,
  interactionToken: string,
  channelId: string
) {
  try {
    const result = await askGemini(question, "");

    if (result.type === "answer") {
      // Post as a regular bot message — looks like natural conversation
      await postMessage(channelId, `> **${displayName}:** ${question}\n\n${result.text}`);
      await editOriginalResponse(applicationId, interactionToken, "✅");
    } else {
      await postMessage(channelId, `> **${displayName}:** ${question}\n\n🔍 리서치 중입니다... 잠시만 기다려주세요.`);
      await editOriginalResponse(applicationId, interactionToken, "✅ 리서치 요청 완료");

      try {
        const manusPrompt = `Research request: ${question}\n\nProvide a structured research report in Korean with TL;DR, key findings with details, and source URLs.`;
        await createManusTask(manusPrompt, { channelId });
      } catch {
        await postMessage(channelId, "⚠️ 리서치 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  } catch (error) {
    console.error("Error handling question:", error);
    await postMessage(channelId, `> **${displayName}:** ${question}\n\n⚠️ 잠시 문제가 생겼습니다. 다시 시도해주세요.`);
    await editOriginalResponse(applicationId, interactionToken, "⚠️ 오류 발생");
  }
}
