import { slack } from "./slack";
import { askGemini } from "./gemini";
import { createManusTask, pollManusTask } from "./manus";

const processedEvents = new Set<string>();

export async function handleAppMention(event: {
  text: string;
  user: string;
  channel: string;
  ts: string;
  thread_ts?: string;
}) {
  const eventKey = `${event.channel}-${event.ts}`;
  if (processedEvents.has(eventKey)) return;
  processedEvents.add(eventKey);
  setTimeout(() => processedEvents.delete(eventKey), 10 * 60 * 1000);

  const question = event.text.replace(/<@[A-Z0-9]+>/g, "").trim();
  if (!question) return;

  const threadTs = event.thread_ts || event.ts;

  try {
    let threadContext = "";
    if (event.thread_ts) {
      const replies = await slack.conversations.replies({
        channel: event.channel,
        ts: event.thread_ts,
        limit: 50,
      });
      if (replies.messages) {
        threadContext = replies.messages
          .filter((m) => m.ts !== event.ts)
          .map((m) => m.text || "")
          .join("\n");
      }
    }

    const result = await askGemini(question, threadContext);

    if (result.type === "answer") {
      await slack.chat.postMessage({
        channel: event.channel,
        thread_ts: threadTs,
        text: result.text,
      });
    } else {
      // Deep research via Manus
      await slack.chat.postMessage({
        channel: event.channel,
        thread_ts: threadTs,
        text: "🔍 리서치 중입니다... 잠시만 기다려주세요.",
      });

      try {
        const manusPrompt = threadContext
          ? `Context from team discussion:\n${threadContext}\n\nResearch request: ${question}\n\nProvide a structured research report in Korean with TL;DR, key findings with details, and source URLs.`
          : `Research request: ${question}\n\nProvide a structured research report in Korean with TL;DR, key findings with details, and source URLs.`;

        const taskId = await createManusTask(manusPrompt);
        const manusResult = await pollManusTask(taskId);

        await slack.chat.postMessage({
          channel: event.channel,
          thread_ts: threadTs,
          text: manusResult,
        });
      } catch (error) {
        const message =
          error instanceof Error && error.message === "TIMEOUT"
            ? "⏰ 리서치가 예상보다 오래 걸리고 있습니다. 결과가 나오면 알려드릴게요."
            : "⚠️ 리서치 중 문제가 발생했습니다. 다시 시도해주세요.";

        await slack.chat.postMessage({
          channel: event.channel,
          thread_ts: threadTs,
          text: message,
        });
      }
    }
  } catch (error) {
    console.error("Error handling app_mention:", error);
    await slack.chat.postMessage({
      channel: event.channel,
      thread_ts: threadTs,
      text: "⚠️ 잠시 문제가 생겼습니다. 다시 시도해주세요.",
    });
  }
}
