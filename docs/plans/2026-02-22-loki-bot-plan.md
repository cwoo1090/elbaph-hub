# Loki Bot Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Slack bot that responds to @Loki mentions — answering simple questions via Gemini 3 Flash and routing deep research to Manus API.

**Architecture:** Next.js App Router on Vercel with a single API route (`/api/slack/events`). Slack sends `app_mention` events → server responds 200 immediately → uses `after()` from `next/server` to process in background → Gemini 3 Flash Preview triages and answers, or routes to Manus API for deep research → posts reply to Slack thread.

**Tech Stack:** Next.js 15+, TypeScript, `@slack/web-api`, `@google/genai`, Vercel deployment

**Design doc:** `docs/plans/2026-02-22-loki-bot-design.md`

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `apps/loki/package.json`
- Create: `apps/loki/tsconfig.json`
- Create: `apps/loki/next.config.js`
- Create: `apps/loki/.env.local`
- Create: `apps/loki/.gitignore`
- Create: `apps/loki/src/app/layout.tsx`
- Create: `apps/loki/src/app/page.tsx`

**Step 1: Initialize Next.js project**

```bash
cd apps/loki
npx create-next-app@latest . --typescript --app --tailwind=no --eslint=no --src-dir --import-alias="@/*" --use-npm
```

Or manually create minimal files:

`apps/loki/package.json`:
```json
{
  "name": "loki",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@slack/web-api": "^7.0.0",
    "@google/genai": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0"
  }
}
```

`apps/loki/.env.local`:
```
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
GEMINI_API_KEY=your-gemini-api-key
MANUS_API_KEY=your-manus-api-key
```

`apps/loki/.gitignore`:
```
node_modules/
.next/
.env.local
```

**Step 2: Install dependencies**

```bash
cd apps/loki && npm install
```

**Step 3: Verify it runs**

```bash
cd apps/loki && npm run dev
```

Expected: Next.js dev server starts on localhost:3000

**Step 4: Commit**

```bash
git add apps/loki
git commit -m "feat(loki): scaffold Next.js project with dependencies"
```

---

### Task 2: Slack Event Endpoint — Challenge Verification

Slack sends a `url_verification` challenge when you first set the Request URL. The endpoint must respond with the challenge value.

**Files:**
- Create: `apps/loki/src/app/api/slack/events/route.ts`

**Step 1: Write the route handler with challenge verification**

`apps/loki/src/app/api/slack/events/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Slack URL verification challenge
  if (body.type === "url_verification") {
    return NextResponse.json({ challenge: body.challenge });
  }

  // Acknowledge event immediately
  return new NextResponse("ok", { status: 200 });
}
```

**Step 2: Test locally with ngrok or similar**

```bash
cd apps/loki && npm run dev
# In another terminal:
curl -X POST http://localhost:3000/api/slack/events \
  -H "Content-Type: application/json" \
  -d '{"type": "url_verification", "challenge": "test123"}'
```

Expected: `{"challenge":"test123"}`

**Step 3: Commit**

```bash
git add apps/loki/src/app/api/slack/events/route.ts
git commit -m "feat(loki): add Slack events endpoint with challenge verification"
```

---

### Task 3: Slack Request Signature Verification

Verify that incoming requests are actually from Slack using the signing secret. This prevents anyone from spoofing events to your endpoint.

**Files:**
- Create: `apps/loki/src/lib/slack.ts`
- Modify: `apps/loki/src/app/api/slack/events/route.ts`

**Step 1: Create Slack utility module**

`apps/loki/src/lib/slack.ts`:
```typescript
import crypto from "crypto";
import { WebClient } from "@slack/web-api";

export const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

export function verifySlackSignature(
  signingSecret: string,
  signature: string,
  timestamp: string,
  body: string
): boolean {
  const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 60 * 5;
  if (parseInt(timestamp) < fiveMinutesAgo) return false;

  const sigBasestring = `v0:${timestamp}:${body}`;
  const mySignature =
    "v0=" +
    crypto
      .createHmac("sha256", signingSecret)
      .update(sigBasestring)
      .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(mySignature),
    Buffer.from(signature)
  );
}
```

**Step 2: Update route handler to verify signatures**

`apps/loki/src/app/api/slack/events/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { verifySlackSignature } from "@/lib/slack";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const body = JSON.parse(rawBody);

  // Slack URL verification challenge
  if (body.type === "url_verification") {
    return NextResponse.json({ challenge: body.challenge });
  }

  // Verify request is from Slack
  const signature = req.headers.get("x-slack-signature") || "";
  const timestamp = req.headers.get("x-slack-request-timestamp") || "";
  const signingSecret = process.env.SLACK_SIGNING_SECRET || "";

  if (!verifySlackSignature(signingSecret, signature, timestamp, rawBody)) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  // Acknowledge event immediately
  return new NextResponse("ok", { status: 200 });
}
```

**Step 3: Commit**

```bash
git add apps/loki/src/lib/slack.ts apps/loki/src/app/api/slack/events/route.ts
git commit -m "feat(loki): add Slack request signature verification"
```

---

### Task 4: Handle app_mention Events with Background Processing

Use Next.js `after()` to process the event after responding 200 to Slack. Fetch thread context, strip bot mention, and prepare for AI processing.

**Files:**
- Create: `apps/loki/src/lib/handler.ts`
- Modify: `apps/loki/src/app/api/slack/events/route.ts`

**Step 1: Create the event handler module**

`apps/loki/src/lib/handler.ts`:
```typescript
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
```

**Step 2: Update route handler to use after()**

`apps/loki/src/app/api/slack/events/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { verifySlackSignature } from "@/lib/slack";
import { handleAppMention } from "@/lib/handler";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const body = JSON.parse(rawBody);

  // Slack URL verification challenge
  if (body.type === "url_verification") {
    return NextResponse.json({ challenge: body.challenge });
  }

  // Verify request is from Slack
  const signature = req.headers.get("x-slack-signature") || "";
  const timestamp = req.headers.get("x-slack-request-timestamp") || "";
  const signingSecret = process.env.SLACK_SIGNING_SECRET || "";

  if (!verifySlackSignature(signingSecret, signature, timestamp, rawBody)) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  // Handle app_mention events in background
  if (body.event?.type === "app_mention") {
    after(() => handleAppMention(body.event));
  }

  // Acknowledge immediately
  return new NextResponse("ok", { status: 200 });
}
```

**Step 3: Test end-to-end**

Deploy to Vercel or use ngrok, set the Request URL in Slack Event Subscriptions, then @mention Loki in a channel. Expected: Loki echoes back the message.

**Step 4: Commit**

```bash
git add apps/loki/src/lib/handler.ts apps/loki/src/app/api/slack/events/route.ts
git commit -m "feat(loki): handle app_mention events with thread context"
```

---

### Task 5: Gemini Integration — Triage + Answer

Integrate Gemini 3 Flash Preview with Google Search grounding. Gemini either answers directly or returns `[DEEP_RESEARCH]` for Manus routing.

**Files:**
- Create: `apps/loki/src/lib/gemini.ts`
- Modify: `apps/loki/src/lib/handler.ts`

**Step 1: Create Gemini module**

`apps/loki/src/lib/gemini.ts`:
```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are Loki, an AI assistant for the ELBAPH community — a group of builders interested in robotics, medtech, BCI, AI, and startups.

You have Google Search available. Follow these rules:
1. If you can confidently answer from your knowledge, answer directly.
2. If the question needs current/recent information, use Google Search and answer.
3. ONLY respond with exactly [DEEP_RESEARCH] (nothing else) if the question requires:
   - Multi-step investigation across many sources
   - A comprehensive research report
   - Deep competitive analysis or market research
   - Tasks that go far beyond a quick search

Always respond in Korean. Be concise and use bullet points where appropriate.`;

export async function askGemini(
  question: string,
  threadContext: string
): Promise<{ type: "answer" | "deep_research"; text: string }> {
  const userMessage = threadContext
    ? `[이전 대화 맥락]\n${threadContext}\n\n[질문]\n${question}`
    : question;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: userMessage,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      tools: [{ googleSearch: {} }],
    },
  });

  const text = response.text?.trim() || "";

  if (text === "[DEEP_RESEARCH]") {
    return { type: "deep_research", text: "" };
  }

  return { type: "answer", text };
}
```

**Step 2: Update handler to use Gemini**

Replace the echo logic in `apps/loki/src/lib/handler.ts`:
```typescript
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
```

**Step 3: Test**

@mention Loki with a simple question like "ROS2가 뭐야?" — expected: Gemini answers in Korean.
@mention Loki with "한국 BCI 스타트업 최근 투자 현황 리서치해줘" — expected: loading message.

**Step 4: Commit**

```bash
git add apps/loki/src/lib/gemini.ts apps/loki/src/lib/handler.ts
git commit -m "feat(loki): integrate Gemini 3 Flash with search grounding"
```

---

### Task 6: Manus API Integration — Deep Research

When Gemini returns `[DEEP_RESEARCH]`, create a Manus task, poll for completion, and post the result to Slack.

**Files:**
- Create: `apps/loki/src/lib/manus.ts`
- Modify: `apps/loki/src/lib/handler.ts`

**Step 1: Create Manus module**

`apps/loki/src/lib/manus.ts`:
```typescript
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
      // Extract text from output
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
```

**Step 2: Update handler to route deep research to Manus**

In `apps/loki/src/lib/handler.ts`, replace the `else` branch:
```typescript
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
        const result = await pollManusTask(taskId);

        await slack.chat.postMessage({
          channel: event.channel,
          thread_ts: threadTs,
          text: result,
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
```

**Step 3: Test**

@mention Loki with a deep research request. Expected: loading message → Manus researches → result posted.

**Step 4: Commit**

```bash
git add apps/loki/src/lib/manus.ts apps/loki/src/lib/handler.ts
git commit -m "feat(loki): integrate Manus API for deep research"
```

---

### Task 7: Deploy to Vercel

**Step 1: Configure Vercel project**

```bash
cd apps/loki && npx vercel
```

- Set root directory to `apps/loki`
- Framework: Next.js (auto-detected)

**Step 2: Set environment variables in Vercel dashboard**

Add these in Vercel project settings → Environment Variables:
- `SLACK_BOT_TOKEN`
- `SLACK_SIGNING_SECRET`
- `GEMINI_API_KEY`
- `MANUS_API_KEY`

**Step 3: Deploy**

```bash
cd apps/loki && npx vercel --prod
```

**Step 4: Set Slack Request URL**

Go to Slack App settings → Event Subscriptions → Request URL:
`https://your-app.vercel.app/api/slack/events`

Slack will send a challenge request. Expected: verified successfully.

**Step 5: Configure Vercel function timeout**

Create or update `apps/loki/vercel.json`:
```json
{
  "functions": {
    "src/app/api/slack/events/route.ts": {
      "maxDuration": 300
    }
  }
}
```

This sets 5 minute max duration for the Manus polling. Vercel free tier allows up to 60s for serverless functions, but `after()` may extend this. If 60s is not enough, consider upgrading to Vercel Pro ($20/mo) or switching Manus integration to use webhooks instead of polling.

**Step 6: End-to-end test in Slack**

- Simple question: `@Loki ROS2가 뭐야?` → Gemini answers
- Search question: `@Loki 오늘 AI 뉴스 뭐 있어?` → Gemini searches and answers
- Deep research: `@Loki 한국 수술로봇 시장 리서치해줘` → loading → Manus result

**Step 7: Commit**

```bash
git add apps/loki/vercel.json
git commit -m "feat(loki): add Vercel deployment config"
```

---

## Summary

| Task | What | Key files |
|------|------|-----------|
| 1 | Scaffold Next.js project | `apps/loki/package.json`, deps |
| 2 | Slack event endpoint + challenge | `route.ts` |
| 3 | Request signature verification | `lib/slack.ts`, `route.ts` |
| 4 | app_mention handler + thread context | `lib/handler.ts`, `route.ts` |
| 5 | Gemini triage + answer | `lib/gemini.ts`, `lib/handler.ts` |
| 6 | Manus deep research | `lib/manus.ts`, `lib/handler.ts` |
| 7 | Deploy to Vercel + Slack config | `vercel.json`, Slack dashboard |
