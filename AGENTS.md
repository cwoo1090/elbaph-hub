# Elbaph Hub

Automation and publishing workspace for Elbaph, a small builder community that meets monthly.

For member profiles, see `members.md`.

## Main Areas

- `apps/site/` - public Next.js site with meetup/blog content.
- `apps/loki/` - Discord `/ask` bot using Gemini with search grounding.
- `packages/discord-mcp/` - local Discord MCP server for reading and posting in Discord.
- `meetups/` - canonical meetup workspace for materials, recordings, transcripts, and blog outputs.
- `.agents/skills/news/` and `.agents/skills/news_codex/` - daily news briefing skills.

## Meetup Structure

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
- Presentation folder names use order plus member only, for example `01-chulwoo`.
- Use `00-overview` for the short opening deck about recent Elbaph activity and discussion topics.
- Put talk titles and metadata in `meetup.yaml`, not folder names.
- Store raw video/audio in Google Drive and link it from `recording.md`; do not commit media files.
- `transcript.md` is ClovaNote STT output.
- `blog.md` is the final Korean blog post.

## Loki Bot

`apps/loki/` is a Next.js app deployed on Vercel.

- Endpoint: `POST /api/discord/interactions`
- Command: `/ask`
- Required env vars: `DISCORD_BOT_TOKEN`, `DISCORD_APPLICATION_ID`, `DISCORD_PUBLIC_KEY`, `GEMINI_API_KEY`
- Use `waitUntil` from `@vercel/functions` for deferred Discord responses.
- Discord messages max 2000 chars, so long responses must be split.

## Discord

- Server: ELBAPH
- Server ID: `1480074652884795462`
- Key channels:
  - `#meetups` - `1480085195570024468`
  - `#news` - `1480085235315114195`
  - `#projects` - `1480085442283049041`
  - `#ideas` - `1480085417393918043`

## Git Notes

- Keep repo guidance simple and current.
- Do not commit raw meetup recordings or extracted audio.
- Presentation materials under `meetups/**/materials/` are intended to be committed, including PDFs and PPTX files.
