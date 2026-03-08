import { Redis } from "@upstash/redis";

const MANUS_API_URL = "https://api.manus.ai/v1/tasks";
const CONTEXT_TTL = 30 * 60; // 30 minutes

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

interface TaskContext {
  channelId: string;
}

export async function createManusTask(
  prompt: string,
  context: TaskContext
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

  await getRedis().set(`manus:${data.task_id}`, JSON.stringify(context), { ex: CONTEXT_TTL });

  return data.task_id;
}

export async function getTaskContext(taskId: string): Promise<TaskContext | null> {
  const raw = await getRedis().get<string>(`manus:${taskId}`);
  if (!raw) return null;
  return typeof raw === "string" ? JSON.parse(raw) : raw;
}

export async function deleteTaskContext(taskId: string) {
  await getRedis().del(`manus:${taskId}`);
}
