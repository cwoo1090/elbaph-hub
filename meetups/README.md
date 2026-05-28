# Meetups

This directory is the canonical workspace for Elbaph meetup materials, recording links, transcripts, and article outputs.

Keep the structure small. Each meetup has one `meetup.yaml` and one folder per presentation or session item.

Published site articles are copied manually from:

```text
meetups/{meetup}/presentations/{presentation}/article.md
```

to:

```text
apps/site/content/articles/{meetup-id}/
```

Article assets used by the site live under:

```text
apps/site/public/articles/{meetup-id}/{member}/
```

## Structure

```text
meetups/
  2026-02-meetup-1/
    meetup.yaml

    presentations/
      00-overview/
        materials/
          slides.pdf
          index.html
          assets/

      01-speaker/
        materials/
          slides.pdf
          slides.pptx
          outline.md
        recording.md
        transcript.md
        article.md
```

Only create files when they are useful. For example, do not add `transcript.md` before the ClovaNote export exists.

## File Meanings

- `materials/` - committed input files from the presenter, such as PDF/PPTX slides, HTML decks, source notes, papers, or deck assets.
- `recording.md` - Google Drive links to the raw video and extracted audio. Do not commit the media files.
- `transcript.md` - ClovaNote STT output for that presentation.
- `article.md` - final Korean article for that presentation.
- `00-overview/` - optional opening deck for last-month Elbaph activity, meetup framing, and discussion topics.

## Git Policy

Commit:

- meetup metadata
- presentation material files such as PDF, PPTX, HTML decks, source notes, and assets
- ClovaNote transcript exports
- final articles
- source links to Google Drive recordings

Do not commit raw recordings or extracted audio. Store those in Google Drive and record the link in `recording.md`.

## Naming

Use:

```text
YYYY-MM-meetup-N/
presentations/01-speaker/
```

The `meetup-N` suffix should match the site meetup ID in `apps/site/src/data/meetups.ts` and the published article directory under `apps/site/content/articles/`.

Presentation folder names should use order plus speaker only. Keep the talk topic in `meetup.yaml`, not in the folder name.

Example:

```text
2026-02-meetup-1/presentations/01-chulwoo/
```

Use `presentations/00-overview/` for the short opening overview/discussion deck when the meetup has one.
