const MANUS_API_URL = "https://api.manus.ai/v1/tasks";

// In-memory store: maps Manus task_id → Slack thread info
// This resets on redeploy, but tasks typically complete in minutes
const taskStore = new Map<string, { channel: string; threadTs: string }>();

export function saveTaskContext(
  taskId: string,
  context: { channel: string; threadTs: string }
) {
  taskStore.set(taskId, context);
  // Clean up after 30 minutes
  setTimeout(() => taskStore.delete(taskId), 30 * 60 * 1000);
}

export function getTaskContext(taskId: string) {
  return taskStore.get(taskId);
}

export function deleteTaskContext(taskId: string) {
  taskStore.delete(taskId);
}

export async function createManusTask(prompt: string): Promise<string> {
  const res = await fetch(MANUS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      API_KEY: process.env.MANUS_API_KEY || "",
    },
    body: JSON.stringify({
      prompt,
      agentProfile: "manus-1.6",
    }),
  });

  if (!res.ok) throw new Error(`Manus API error: ${res.status}`);
  const data = await res.json();
  return data.task_id;
}

export async function fetchManusResult(taskId: string): Promise<string> {
  const res = await fetch(`${MANUS_API_URL}/${taskId}`, {
    headers: { API_KEY: process.env.MANUS_API_KEY || "" },
  });

  if (!res.ok) throw new Error(`Manus fetch error: ${res.status}`);
  const task = await res.json();

  const texts: string[] = [];
  for (const item of task.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) {
        texts.push(content.text);
      }
    }
  }
  return texts.join("\n\n") || "리서치가 완료되었지만 결과가 비어있습니다.";
}
