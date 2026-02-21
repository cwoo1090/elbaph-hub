import { slack } from "./slack";

// In-memory set to deduplicate Slack retries
const processedEvents = new Set<string>();

export async function handleAppMention(event: {
  text: string;
  user: string;
  channel: string;
  ts: string;
  thread_ts?: string;
}) {
  // Deduplicate
  const eventKey = `${event.channel}-${event.ts}`;
  if (processedEvents.has(eventKey)) return;
  processedEvents.add(eventKey);

  // Clean up old entries after 10 minutes
  setTimeout(() => processedEvents.delete(eventKey), 10 * 60 * 1000);

  try {
    // Strip bot mention from text
    const question = event.text.replace(/<@[A-Z0-9]+>/g, "").trim();
    if (!question) return;

    // Determine thread_ts for replies
    const threadTs = event.thread_ts || event.ts;

    // Fetch thread context if this is in a thread
    let threadContext = "";
    if (event.thread_ts) {
      const replies = await slack.conversations.replies({
        channel: event.channel,
        ts: event.thread_ts,
        limit: 50,
      });
      if (replies.messages) {
        threadContext = replies.messages
          .filter((m) => m.ts !== event.ts) // exclude the current message
          .map((m) => m.text || "")
          .join("\n");
      }
    }

    // TODO: Send to Gemini for triage + answer (Task 5)
    // For now, echo back to verify the pipeline works
    await slack.chat.postMessage({
      channel: event.channel,
      thread_ts: threadTs,
      text: `Received: "${question}"${threadContext ? "\n\nThread context loaded." : ""}`,
    });
  } catch (error) {
    console.error("Error handling app_mention:", error);
  }
}
