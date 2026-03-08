import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { verifyDiscordRequest, editOriginalResponse, sendFollowup, fetchMessages, resolveIsThread } from "@/lib/discord";
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
    const interactionChannel = body.channel as { type?: number; parent_id?: string | null } | undefined;
    const displayName = body.member?.user?.global_name || body.member?.user?.username || "Someone";

    if (!question) {
      return NextResponse.json({
        type: 4,
        data: { content: "Please enter a question.", flags: 64 },
      });
    }

    // Non-ephemeral deferred response — everyone sees "Loki is thinking..."
    waitUntil(handleQuestion(question, displayName, applicationId, interactionToken, channelId, interactionChannel));
    return NextResponse.json({ type: 5 });
  }

  return new NextResponse("Unknown interaction type", { status: 400 });
}

async function handleQuestion(
  question: string,
  displayName: string,
  applicationId: string,
  interactionToken: string,
  channelId: string,
  interactionChannel?: { type?: number; parent_id?: string | null }
) {
  try {
    const isThread = await resolveIsThread(channelId, interactionChannel);
    const threadContext = await fetchMessages(channelId, isThread);
    const result = await askGemini(question, threadContext);

    if (result.type === "answer") {
      await editOriginalResponse(applicationId, interactionToken, `> **${displayName}:** ${question}\n\n${result.text}`);
    } else {
      await editOriginalResponse(
        applicationId,
        interactionToken,
        `> **${displayName}:** ${question}\n\n🔍 리서치 중입니다... 잠시만 기다려주세요.`
      );

      try {
        const manusPrompt = threadContext
          ? `[Conversation context]\n${threadContext}\n\n[Question]\n${question}\n\nProvide a structured research report in Korean with TL;DR, key findings with details, and source URLs. Use the conversation context when it clarifies what the user is asking.`
          : `Research request: ${question}\n\nProvide a structured research report in Korean with TL;DR, key findings with details, and source URLs.`;
        await createManusTask(manusPrompt, { channelId });
      } catch {
        await sendFollowup(applicationId, interactionToken, "⚠️ 리서치 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  } catch (error) {
    console.error("Error handling question:", error);
    await editOriginalResponse(
      applicationId,
      interactionToken,
      `> **${displayName}:** ${question}\n\n⚠️ 잠시 문제가 생겼습니다. 다시 시도해주세요.`
    );
  }
}
