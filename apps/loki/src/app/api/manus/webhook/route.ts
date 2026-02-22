import { NextRequest, NextResponse } from "next/server";
import { getTaskContext, deleteTaskContext, fetchManusResult } from "@/lib/manus";
import { slack } from "@/lib/slack";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Only handle task_stopped events with stop_reason "finish"
    if (body.event_type !== "task_stopped") {
      return new NextResponse("ok", { status: 200 });
    }

    const taskId = body.task_detail?.task_id;
    const stopReason = body.task_detail?.stop_reason;

    if (!taskId) {
      return new NextResponse("ok", { status: 200 });
    }

    // Look up where to post the result
    const context = getTaskContext(taskId);
    if (!context) {
      // Task not from our bot (or store was reset)
      return new NextResponse("ok", { status: 200 });
    }

    deleteTaskContext(taskId);

    if (stopReason === "finish") {
      // Fetch full result from Manus API
      const result = await fetchManusResult(taskId);
      await slack.chat.postMessage({
        channel: context.channel,
        thread_ts: context.threadTs,
        text: result,
      });
    } else {
      // Task stopped for another reason (e.g., "ask" — needs input)
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
