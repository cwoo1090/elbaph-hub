import { Redis } from "@upstash/redis";

const MANUS_API_URL = "https://api.manus.ai/v1/tasks";

let redis: Redis;
function getRedis() {
  if (!redis) {
    redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    });
  }
  return redis;
}

export async function createManusTask(
  prompt: string,
  slackContext: { channel: string; threadTs: string }
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

  // Store Slack context in Redis (expires in 30 minutes)
  await getRedis().set(`manus:${data.task_id}`, JSON.stringify(slackContext), { ex: 1800 });

  return data.task_id;
}

export async function getSlackContext(taskId: string): Promise<{ channel: string; threadTs: string } | null> {
  const data = await getRedis().get<string>(`manus:${taskId}`);
  if (!data) return null;
  try {
    return typeof data === "string" ? JSON.parse(data) : data;
  } catch {
    return null;
  }
}

export async function deleteSlackContext(taskId: string) {
  await getRedis().del(`manus:${taskId}`);
}

export async function fetchManusTask(taskId: string) {
  const res = await fetch(`${MANUS_API_URL}/${taskId}`, {
    headers: { API_KEY: process.env.MANUS_API_KEY?.trim() || "" },
  });

  if (!res.ok) throw new Error(`Manus fetch error: ${res.status}`);
  return await res.json();
}

export function extractResult(task: any): string {
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
