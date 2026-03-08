const MANUS_API_URL = "https://api.manus.ai/v1/tasks";

const taskContexts = new Map<string, { channelId: string; messageId: string }>();

export async function createManusTask(
  prompt: string,
  discordContext: { channelId: string; messageId: string }
): Promise<string> {
  const res = await fetch(MANUS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      API_KEY: process.env.MANUS_API_KEY?.trim() || "",
    },
    body: JSON.stringify({
      prompt,
      agentProfile: "manus-1.6",
    }),
  });

  if (!res.ok) throw new Error(`Manus API error: ${res.status}`);
  const data = await res.json();

  taskContexts.set(data.task_id, discordContext);
  // Auto-cleanup after 30 minutes
  setTimeout(() => taskContexts.delete(data.task_id), 30 * 60 * 1000);

  return data.task_id;
}

export function getDiscordContext(taskId: string): { channelId: string; messageId: string } | null {
  return taskContexts.get(taskId) || null;
}

export function deleteDiscordContext(taskId: string) {
  taskContexts.delete(taskId);
}
