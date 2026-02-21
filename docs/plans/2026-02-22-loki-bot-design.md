# Loki Bot — Design Document

Date: 2026-02-22

## Overview

Loki is a Slack bot for the ELBAPH community (5 members). When a member tags `@Loki` in any channel, the bot reads thread context, triages the question, and responds — either answering directly via Gemini or routing to Manus for deep research.

## Goals

- Members can interact with an AI bot directly in Slack
- Simple questions answered instantly (free, via Gemini)
- Deep research handled by Manus (uses existing Pro subscription credits)
- Zero additional cost beyond existing subscriptions

## Architecture

```
Member @mentions @Loki in Slack
  → Vercel API route receives app_mention event
  → Responds 200 immediately
  → Fetches thread context via conversations.replies
  → Sends to Gemini 3 Flash Preview for triage

  Tier 1 — Simple Q&A:
    → Gemini answers from knowledge
    → Posts reply to thread

  Tier 2 — Light research:
    → Gemini uses Google Search grounding
    → Posts reply to thread

  Tier 3 — Deep research:
    → Posts loading message to thread
    → Calls Manus API
    → Posts research result to thread when complete
```

## Tech Stack

- **Server:** Next.js App Router on Vercel (free tier)
- **Orchestrator/Q&A:** Gemini 3 Flash Preview (free tier, 5K search-grounded prompts/month)
- **Deep Research:** Manus API (Pro subscription credits — 19,900/month)
- **Slack App:** Loki (existing app, already installed in ELBAPH workspace)

## Project Structure

```
elbaph-hub/
├── apps/loki/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── .env.local
│   │   ├── SLACK_BOT_TOKEN
│   │   ├── SLACK_SIGNING_SECRET
│   │   ├── GEMINI_API_KEY
│   │   └── MANUS_API_KEY
│   └── src/app/api/slack/events/route.ts
```

## Slack App Config

- App name: Loki
- Team ID: T0A96RV9SSE
- OAuth scopes: app_mentions:read, channels:history, channels:read, chat:write, chat:write.customize, files:write, users:read
- Event subscription: app_mention
- Available in: all public channels

## Data Flow

1. Slack sends `app_mention` event to `POST /api/slack/events`
2. Server responds 200 immediately
3. Server calls `conversations.replies` to get thread context
4. Strips `<@BOT_ID>` from message text
5. Sends thread context + question to Gemini 3 Flash Preview with Google Search tool
6. Gemini system prompt: answer from knowledge, use search for current info, respond `[DEEP_RESEARCH]` only for multi-step investigation
7. If Gemini answers → post to thread
8. If `[DEEP_RESEARCH]` → post loading message, call Manus API, post result when done

## Gemini System Prompt

```
You are Loki, an AI assistant for the ELBAPH community — a group of builders
interested in robotics, medtech, BCI, AI, and startups. You have Google Search
available. Answer from your knowledge when possible. Use search for current
information. Only respond with [DEEP_RESEARCH] if the question requires
multi-step investigation, comparing multiple sources, or a comprehensive report
that goes beyond a quick search. Always respond in Korean.
```

## Response Format

### Simple Q&A / Light Research (Gemini)
```
💡 [Answer in Korean]

• [Bullet point 1]
• [Bullet point 2]
```

### Deep Research (Manus)
```
🔬 *Deep Research — [Topic]*

*📌 TL;DR*
[2-3 sentence summary]

*Key Findings:*

*1. [Finding title]*
[2-3 sentence explanation]

*2. [Finding title]*
[2-3 sentence explanation]

🔗 *Sources:*
• [URL 1]
• [URL 2]
```

### Loading
```
🔍 리서치 중입니다... 잠시만 기다려주세요.
```

## Error Handling

- Gemini API fails → "⚠️ 잠시 문제가 생겼습니다. 다시 시도해주세요."
- Manus API fails → "⚠️ 리서치 중 문제가 발생했습니다. 다시 시도해주세요."
- Manus task >5 min → "⏰ 리서치가 예상보다 오래 걸리고 있습니다. 결과가 나오면 알려드릴게요."
- Duplicate Slack events → track event IDs, skip duplicates

## Out of Scope (for now)

- DM support
- Scheduled/cron features (handled by Claude Code skills)
- Member personalization
- Database or persistent storage
- Admin dashboard

## Estimated Cost

$0/month — all free tiers + existing subscriptions
