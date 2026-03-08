import { NextRequest, NextResponse } from "next/server";
import { getTaskContext, deleteTaskContext } from "@/lib/manus";
import { postMessage } from "@/lib/discord";

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
      return NextResponse.json({ ok: true });
    }

    const taskId = body.task_detail?.task_id;
    const stopReason = body.task_detail?.stop_reason;
    if (!taskId) return NextResponse.json({ ok: true });

    const context = await getTaskContext(taskId);
    if (!context) {
      console.error("No context found for task:", taskId);
      return NextResponse.json({ ok: true });
    }

    await deleteTaskContext(taskId);

    if (stopReason === "finish") {
      const attachment = await fetchAttachmentContent(body.task_detail?.attachments);
      const result =
        attachment ??
        body.task_detail?.message ??
        "리서치가 완료되었지만 결과를 가져올 수 없습니다.";
      await postMessage(context.channelId, result);
    } else {
      await postMessage(
        context.channelId,
        "⚠️ 리서치 중 문제가 발생했습니다. 다시 시도해주세요."
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error handling Manus webhook:", error);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
