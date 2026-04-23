# Elbaph Hub

Automation and publishing workspace for Elbaph, a small builder community that meets monthly.

For member profiles, see `members.md`.

## Main Areas

- `apps/site/` - public Next.js site for Elbaph, meetup pages, and blog content.
- `apps/loki/` - Discord `/ask` bot using Gemini with Google Search grounding.
- `packages/discord-mcp/` - local Discord MCP server for reading and posting in Discord.
- `meetups/` - canonical meetup workspace for materials, recording links, transcripts, and blog outputs.
- `.agents/skills/news/` and `.agents/skills/news_codex/` - daily news briefing skills.

## Meetup Workflow

Use `meetups/README.md` as the source of truth.

Current convention:

```text
meetups/
  YYYY-MM-meetup-N/
    meetup.yaml
    presentations/
      00-overview/
        materials/
          slides.pdf
      01-member/
        materials/
          slides.pdf
          slides.pptx
        recording.md
        transcript.md
        blog.md
```

Rules:

- `meetup-N` must match `apps/site/src/data/meetups.ts` and `apps/site/content/posts/meetup-N`.
- Presentation folders use order plus member only, for example `01-chulwoo`.
- Use `00-overview` for the short opening deck about recent Elbaph activity and discussion topics.
- Store raw video/audio in Google Drive and link it from `recording.md`.
- `transcript.md` is ClovaNote STT output.
- `blog.md` is the final Korean blog post.

## Local Setup

Prerequisites:

- Node.js 18+
- npm

## Run The Site

```bash
cd apps/site
npm install
npm run dev
```

Runs on `http://localhost:3001`.

## Run Loki

```bash
cd apps/loki
npm install
cp .env.example .env.local
npm run dev
```

Runs on `http://localhost:3000`.

Required env vars:

- `DISCORD_BOT_TOKEN`
- `DISCORD_APPLICATION_ID`
- `DISCORD_PUBLIC_KEY`
- `GEMINI_API_KEY`

Register slash commands:

```bash
cd apps/loki
npm run register-commands
```

## Run Discord MCP

```bash
cd packages/discord-mcp
npm install
npm run build
```

Then add it to Codex or Claude with:

```bash
node /path/to/packages/discord-mcp/dist/index.js
```

Requires `DISCORD_BOT_TOKEN`.

## Discord

- Server: ELBAPH
- Server ID: `1480074652884795462`

Key channels:

- `#meetups` - `1480085195570024468`
- `#news` - `1480085235315114195`
- `#projects` - `1480085442283049041`
- `#ideas` - `1480085417393918043`

## Repo Notes

- Keep guidance files simple and current.
- Do not commit raw meetup recordings or extracted audio.
- Presentation materials under `meetups/**/materials/` are intended to be committed, including PDFs and PPTX files.
