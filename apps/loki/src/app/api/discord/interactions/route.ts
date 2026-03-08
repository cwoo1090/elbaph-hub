import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { verifyDiscordRequest, sendFollowup, fetchMessages } from "@/lib/discord";
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
    const channelType = body.channel?.type;
    const isThread = channelType === 11 || channelType === 12;
    const displayName = body.member?.user?.global_name || body.member?.user?.username || "Someone";

    if (!question) {
      return NextResponse.json({
        type: 4,
        data: { content: "Please enter a question.", flags: 64 },
      });
    }

    // Ephemeral deferred response — only the user sees "thinking..."
    waitUntil(handleQuestion(question, displayName, applicationId, interactionToken, channelId, isThread));
    return NextResponse.json({ type: 5, data: { flags: 64 } });
  }

  return new NextResponse("Unknown interaction type", { status: 400 });
}

async function handleQuestion(
  question: string,
  displayName: string,
  applicationId: string,
  interactionToken: string,
  channelId: string,
  isThread: boolean
) {
  try {
    const threadContext = await fetchMessages(channelId, isThread);
    const result = await askGemini(question, threadContext);

    if (result.type === "answer") {
      await sendFollowup(applicationId, interactionToken, `> **${displayName}:** ${question}\n\n${result.text}`);
    } else {
      await sendFollowup(applicationId, interactionToken, `> **${displayName}:** ${question}\n\n🔍 리서치 중입니다... 잠시만 기다려주세요.`);

      try {
        const manusPrompt = `Research request: ${question}\n\nProvide a structured research report in Korean with TL;DR, key findings with details, and source URLs.`;
        await createManusTask(manusPrompt, { channelId });
      } catch {
        await sendFollowup(applicationId, interactionToken, "⚠️ 리서치 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  } catch (error) {
    console.error("Error handling question:", error);
    await sendFollowup(applicationId, interactionToken, `> **${displayName}:** ${question}\n\n⚠️ 잠시 문제가 생겼습니다. 다시 시도해주세요.`);
  }
}
