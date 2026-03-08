# Elbaph Hub

Automation hub for Elbaph — a 5-member community of ambitious builders who meet monthly and push each other to grow.

For member profiles, see [members.md](members.md).

## Skills

- `/news` — daily news briefing posted to #news

## Loki Bot

AI Discord bot (`apps/loki/`) — members use `/ask` to get answers or deep research. Deployed on Vercel (free).

- **Triage**: Gemini 3 Flash Preview (free) answers most questions with Google Search grounding
- **Deep research**: Only for questions explicitly requiring comprehensive reports across 10+ sources — routes to Manus API (Pro subscription), results posted via webhook
- **State**: Upstash Redis (free tier) for Manus task context across serverless invocations
- **Interaction**: `/ask` slash command (works in channels and threads)
- **Context**: Reads thread messages (all) or channel messages (last 10) before answering

**Env vars** (Vercel): `DISCORD_BOT_TOKEN`, `DISCORD_APPLICATION_ID`, `DISCORD_PUBLIC_KEY`, `GEMINI_API_KEY`, `MANUS_API_KEY`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`

**Architecture**:
- Next.js on Vercel — Discord Interactions Endpoint (HTTP, not Gateway)
- Ed25519 signature verification via `tweetnacl`
- Deferred responses (type 5) + `waitUntil` from `@vercel/functions` for background processing

**Endpoints**:
- `POST /api/discord/interactions` — Discord Interactions API (slash commands)
- `POST /api/manus/webhook` — Manus task completion callback

**Gotchas**:
- `after()` from next/server does NOT work on Vercel — use `waitUntil` from `@vercel/functions`
- Manus results are in attachment files, not output_text
- Discord messages max 2000 chars — bot splits long responses automatically
- Bot needs Administrator permission in the server to read message history
- Vercel project is NOT connected to Git — deploy manually via `cd apps/loki && npx vercel --prod --yes`

## Discord

- Server: ELBAPH
- Server ID: `1480074652884795462`

| Channel | ID | Type | Purpose |
|---------|----|------|---------|
| #announcements | `1480075434749067264` | text | Important updates (read-only) |
| #intros | `1480085087797117050` | text | Member introductions |
| #lounge | `1480085107174936697` | text | Casual conversation |
| #meetups | `1480085195570024468` | text | Monthly meetup coordination |
| #news | `1480085235315114195` | text | Daily news briefings |
| #projects | `1480085442283049041` | forum | Project discussions |
| #ideas | `1480085417393918043` | forum | Idea discussions |

## Discord MCP

Custom MCP server at `packages/discord-mcp/` — gives Claude Code tools to read and post in Discord.

**Tools**: `discord_list_channels`, `discord_read_channel`, `discord_read_thread`, `discord_post_message`, `discord_reply_to_thread`, `discord_add_reaction`

**Setup**: `claude mcp add discord-mcp -- node /path/to/packages/discord-mcp/dist/index.js` (requires `DISCORD_BOT_TOKEN` env var)
