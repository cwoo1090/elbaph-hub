const MANUS_API_URL = "https://api.manus.ai/v1/tasks";

interface ManusTask {
  id: string;
  status: "pending" | "running" | "completed" | "failed";
  output?: Array<{
    content: Array<{
      type: string;
      text?: string;
    }>;
  }>;
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

export async function pollManusTask(
  taskId: string,
  maxWaitMs = 5 * 60 * 1000
): Promise<string> {
  const startTime = Date.now();
  const pollInterval = 5000; // 5 seconds

  while (Date.now() - startTime < maxWaitMs) {
    const res = await fetch(`${MANUS_API_URL}/${taskId}`, {
      headers: { API_KEY: process.env.MANUS_API_KEY || "" },
    });

    if (!res.ok) throw new Error(`Manus poll error: ${res.status}`);
    const task: ManusTask = await res.json();

    if (task.status === "completed") {
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

    if (task.status === "failed") {
      throw new Error("Manus task failed");
    }

    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  throw new Error("TIMEOUT");
}
