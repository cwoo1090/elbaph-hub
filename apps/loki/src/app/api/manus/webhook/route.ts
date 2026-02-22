import { NextRequest, NextResponse } from "next/server";
import { getSlackContext, deleteSlackContext } from "@/lib/manus";
import { slack } from "@/lib/slack";
import { markdownToSlack } from "@/lib/format";

async function fetchAttachmentContent(attachments: any[]): Promise<string | null> {
  const mdFile = attachments?.find((a: any) => a.file_name?.endsWith(".md"));
  if (!mdFile?.url) return null;

  const res = await fetch(mdFile.url);
  if (!res.ok) return null;
  return await res.text();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Manus webhook:", body.event_type, body.task_detail?.task_id);

    if (body.event_type !== "task_stopped") {
      return new NextResponse("ok", { status: 200 });
    }

    const taskId = body.task_detail?.task_id;
    const stopReason = body.task_detail?.stop_reason;

    if (!taskId) {
      return new NextResponse("ok", { status: 200 });
    }

    const context = await getSlackContext(taskId);
    if (!context) {
      console.error("No Slack context found for task:", taskId);
      return new NextResponse("ok", { status: 200 });
    }

    await deleteSlackContext(taskId);

    if (stopReason === "finish") {
      // Try to get the full report from attachments first
      const attachments = body.task_detail?.attachments;
      let result = await fetchAttachmentContent(attachments);

      // Fallback to the webhook message if no attachment
      if (!result) {
        result = body.task_detail?.message || "리서치가 완료되었지만 결과를 가져올 수 없습니다.";
      }
      result = result as string;

      // Convert markdown to Slack format and split if needed
      const chunks = splitMessage(markdownToSlack(result), 3900);
      for (const chunk of chunks) {
        await slack.chat.postMessage({
          channel: context.channel,
          thread_ts: context.threadTs,
          text: chunk,
        });
      }
    } else {
      await slack.chat.postMessage({
        channel: context.channel,
        thread_ts: context.threadTs,
        text: "⚠️ 리서치 중 문제가 발생했습니다. 다시 시도해주세요.",
      });
    }

    return new NextResponse("ok", { status: 200 });
  } catch (error) {
    console.error("Error handling Manus webhook:", error);
    return new NextResponse("error", { status: 500 });
  }
}

function splitMessage(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];

  const chunks: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    // Try to split at a newline
    let splitIdx = remaining.lastIndexOf("\n", maxLen);
    if (splitIdx < maxLen / 2) splitIdx = maxLen;
    chunks.push(remaining.slice(0, splitIdx));
    remaining = remaining.slice(splitIdx);
  }
  return chunks;
}
