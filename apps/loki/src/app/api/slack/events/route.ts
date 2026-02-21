import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { verifySlackSignature } from "@/lib/slack";
import { handleAppMention } from "@/lib/handler";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const body = JSON.parse(rawBody);

  // Slack URL verification challenge (no signature check needed)
  if (body.type === "url_verification") {
    return NextResponse.json({ challenge: body.challenge });
  }

  // Verify request is from Slack
  const signature = req.headers.get("x-slack-signature") || "";
  const timestamp = req.headers.get("x-slack-request-timestamp") || "";
  const signingSecret = process.env.SLACK_SIGNING_SECRET || "";

  if (!verifySlackSignature(signingSecret, signature, timestamp, rawBody)) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  // Handle app_mention events in background
  if (body.event?.type === "app_mention") {
    after(() => handleAppMention(body.event));
  }

  // Acknowledge immediately
  return new NextResponse("ok", { status: 200 });
}
