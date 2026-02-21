import { slack } from "./slack";
import { askGemini } from "./gemini";

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
    // Fetch thread context
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

    // Ask Gemini
    const result = await askGemini(question, threadContext);

    if (result.type === "answer") {
      await slack.chat.postMessage({
        channel: event.channel,
        thread_ts: threadTs,
        text: result.text,
      });
    } else {
      // TODO: Route to Manus (Task 6)
      await slack.chat.postMessage({
        channel: event.channel,
        thread_ts: threadTs,
        text: "🔍 리서치 중입니다... 잠시만 기다려주세요.",
      });
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
