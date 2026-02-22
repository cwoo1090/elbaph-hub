import { NextRequest, NextResponse } from "next/server";
import { verifySlackSignature } from "@/lib/slack";
import { handleAppMention } from "@/lib/handler";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const body = JSON.parse(rawBody);

  // Slack URL verification challenge (before signature check)
  if (body.type === "url_verification") {
    return NextResponse.json({ challenge: body.challenge });
  }

  // Verify request is from Slack
  const signingSecret = process.env.SLACK_SIGNING_SECRET?.trim();
  const signature = req.headers.get("x-slack-signature") || "";
  const timestamp = req.headers.get("x-slack-request-timestamp") || "";

  if (!signingSecret || !verifySlackSignature(signingSecret, signature, timestamp, rawBody)) {
    console.error("Slack signature verification failed");
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Handle app_mention events
  if (body.event?.type === "app_mention") {
    await handleAppMention(body.event);
  }

  return new NextResponse("ok", { status: 200 });
}
