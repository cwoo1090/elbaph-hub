# Elbaph Hub

Automation hub for Elbaph — a 5-member community of ambitious builders who meet monthly and push each other to grow.

For member profiles, see [members.md](members.md).

## Skills

- `/news` — daily news briefing posted to #news
- `/meetup` — meetup reminders and scheduling for #meetups
- `/research [topic]` — deep-dive research on a requested topic

## Loki Bot

AI Slack bot (`apps/loki/`) — members tag @Loki to get answers or deep research. Deployed on Vercel.

- **Triage**: Gemini 3 Flash Preview (free) answers most questions with Google Search grounding
- **Deep research**: Only for questions explicitly requiring comprehensive reports across 10+ sources — routes to Manus API (Pro subscription), results posted via webhook
- **State**: Upstash Redis stores task context across serverless invocations
- **Formatting**: `src/lib/format.ts` converts markdown → Slack mrkdwn

**Env vars** (Vercel): `SLACK_BOT_TOKEN`, `SLACK_SIGNING_SECRET`, `GEMINI_API_KEY`, `MANUS_API_KEY`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`

**Endpoints**:
- `POST /api/slack/events` — Slack Events API (signature verified)
- `POST /api/manus/webhook` — Manus task completion callback

**Gotchas**:
- `after()` from next/server does NOT work on Vercel — process inline
- Slack disables event delivery after >95% failure rate in 60 min — re-save Request URL to fix
- Manus results are in attachment files, not output_text

## Slack

- Workspace: ELBAPH
- Team ID: `T0A96RV9SSE`

| Channel | ID | Purpose |
|---------|----|---------|
| #news | `C0AFH9SQ857` | Daily news briefings |
| #announcements | `C0A98L4HTHT` | Important updates |
| #meetups | `C0AA6BW3ERW` | Monthly meetup coordination |
| #lounge | `C0AA15Q77FS` | Casual conversation |
| #projects | `C0A95QN2DNX` | Project discussions |
| #intros | `C0AAJF8TWP2` | Member introductions |
