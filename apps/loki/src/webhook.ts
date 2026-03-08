import express from "express";
import { client } from "./discord.js";
import { getDiscordContext, deleteDiscordContext } from "./lib/manus.js";
import { TextChannel, Message } from "discord.js";

const app = express();
app.use(express.json());

function splitMessage(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    let splitIdx = remaining.lastIndexOf("\n", maxLen);
    if (splitIdx < maxLen / 2) splitIdx = maxLen;
    chunks.push(remaining.slice(0, splitIdx));
    remaining = remaining.slice(splitIdx);
  }
  return chunks;
}

async function fetchAttachmentContent(attachments: any[]): Promise<string | null> {
  const mdFile = attachments?.find((a: any) => a.file_name?.endsWith(".md"));
  if (!mdFile?.url) return null;
  const res = await fetch(mdFile.url);
  if (!res.ok) return null;
  return await res.text();
}

app.post("/manus/webhook", async (req, res) => {
  try {
    const body = req.body;
    console.log("Manus webhook:", body.event_type, body.task_detail?.task_id);

    if (body.event_type !== "task_stopped") {
      return res.send("ok");
    }

    const taskId = body.task_detail?.task_id;
    const stopReason = body.task_detail?.stop_reason;
    if (!taskId) return res.send("ok");

    const context = await getDiscordContext(taskId);
    if (!context) {
      console.error("No Discord context found for task:", taskId);
      return res.send("ok");
    }

    await deleteDiscordContext(taskId);

    const channel = await client.channels.fetch(context.channelId);
    if (!channel || !channel.isTextBased()) return res.send("ok");

    const originalMessage = await (channel as TextChannel).messages.fetch(context.messageId);

    if (stopReason === "finish") {
      const attachment = await fetchAttachmentContent(body.task_detail?.attachments);
      const result = attachment ?? body.task_detail?.message ?? "리서치가 완료되었지만 결과를 가져올 수 없습니다.";

      const chunks = splitMessage(result, 1900);
      for (const chunk of chunks) {
        await originalMessage.reply(chunk);
      }
    } else {
      await originalMessage.reply("⚠️ 리서치 중 문제가 발생했습니다. 다시 시도해주세요.");
    }

    res.send("ok");
  } catch (error) {
    console.error("Error handling Manus webhook:", error);
    res.status(500).send("error");
  }
});

export function startWebhookServer(port: number = 3000) {
  app.listen(port, () => {
    console.log(`Webhook server listening on port ${port}`);
  });
}
