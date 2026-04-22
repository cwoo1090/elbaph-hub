# Elbaph Hub

Automation hub for Elbaph — a 5-member community of ambitious builders who meet monthly and push each other to grow.

For member profiles, see [members.md](members.md).

## Skills

- `/news` — daily news briefing posted to #news
- `/news_codex` — Codex-native daily news briefing using the same sources/templates with Discord MCP when available

## Loki Bot

AI Discord bot (`apps/loki/`) — members use `/ask` to get concise Gemini answers with search grounding. Deployed on Vercel.

- **Answering**: Gemini 3 Flash Preview (free) answers with Google Search grounding for current or volatile facts
- **Source handling**: Time-sensitive answers require grounding metadata sources; otherwise Loki refuses to answer confidently
- **Interaction**: `/ask` slash command
- **State**: Stateless for answer handling; no Manus, Redis, Upstash, or background research queue

**Env vars** (Vercel): `DISCORD_BOT_TOKEN`, `DISCORD_APPLICATION_ID`, `DISCORD_PUBLIC_KEY`, `GEMINI_API_KEY`

**Architecture**:
- Next.js on Vercel — Discord Interactions Endpoint (HTTP, not Gateway)
- Ed25519 signature verification via `tweetnacl`
- Deferred responses (type 5) + `waitUntil` from `@vercel/functions` for background processing

**Gotchas**:
- Discord messages max 2000 chars — bot splits long responses automatically
- Bot needs permission to read message history for channel/thread context

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

Custom MCP server at `packages/discord-mcp/` — gives Codex tools to read and post in Discord.

**Tools**: `discord_list_channels`, `discord_read_channel`, `discord_read_thread`, `discord_post_message`, `discord_reply_to_thread`, `discord_add_reaction`

**Setup**: `Codex mcp add discord-mcp -- node /path/to/packages/discord-mcp/dist/index.js` (requires `DISCORD_BOT_TOKEN` env var)
