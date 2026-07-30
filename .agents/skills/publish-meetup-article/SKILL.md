---
name: publish-meetup-article
description: Publish Elbaph meetup talk articles to the Next.js site and Substack. Use when Codex is asked to prepare, translate, illustrate, create Substack copy links, deploy, or verify Elbaph meetup articles for a speaker such as "태규 글", "예찬 글", "meetup 3 글", "Substack에 올릴 글", or "이미지 만들고 배포".
---

# Publish Meetup Article

Follow this workflow for Elbaph meetup article publishing. Do not ask the user to re-explain context that can be found in the repo.

## Sources

1. Read `AGENTS.md` and `meetups/README.md` when available.
2. Identify the meetup and speaker from the request.
3. Read local source material before writing:
   - `meetups/YYYY-MM-meetup-N/meetup.yaml`
   - `meetups/YYYY-MM-meetup-N/presentations/NN-member/blog.md` or `article.md`
   - `transcript.md`, slides, outlines, or materials when the article needs more context
4. Compare existing site articles under `apps/site/content/articles/meetup-N/` and images under `apps/site/public/articles/meetup-N/`.
5. If the user references Hermes, Discord, or previous edits, search local files first. Use available connectors only when they are installed and relevant.

## Article Files

1. Create or update the Korean article at `apps/site/content/articles/meetup-N/member.md`.
2. Put frontmatter only in the Korean article:
   - `slug: meetup-N-member`
   - `date: YYYY-MM-DD`
   - `publishedAt: YYYY-MM-DDTHH:mm:ss+09:00` for publish-time ordering
   - bilingual `title.ko`, `title.en`, `subtitle.ko`, `subtitle.en`
3. Create or update the English body at `apps/site/content/articles/meetup-N/member.en.md` without frontmatter.
4. Preserve the same image order and caption meaning in Korean and English.
5. Write polished essays, not transcript summaries. Keep speaker-specific ideas, concrete examples, and the meetup discussion arc.

## Image Workflow

1. Search the web first for real images, references, products, people, places, or visual language relevant to the talk.
2. Use real images only when reuse is clearly acceptable and attribution/licensing is not risky.
3. If real image reuse is unclear, generate original bitmap images inspired by the researched context.
4. Use the `imagegen` skill for generated images.
5. Create 4-6 images per article unless the article structure suggests otherwise.
6. Make the first image bright, readable, and suitable as a Substack cover.
7. Make later images visually diverse: vary lighting, palette, distance, subject, and composition. Avoid a repetitive single-tone image set.
8. Keep images contextual and inspectable, not generic stock-like atmosphere.
9. Save images under `apps/site/public/articles/meetup-N/member/` with ordered names such as:
   - `01-cover-topic.png`
   - `02-specific-scene.png`
10. Prefer 16:9 images and normalize generated images to the current article size:
    ```bash
    sips -z 941 1672 apps/site/public/articles/meetup-N/member/*.png
    ```

## Substack Support

1. Add or update article tags in `apps/site/src/lib/substack.ts`.
2. Verify the copy page works for both locales:
   - `https://elbaph.vercel.app/substack-copy?slug=meetup-N-member&locale=ko`
   - `https://elbaph.vercel.app/substack-copy?slug=meetup-N-member&locale=en`
3. Use the Substack copy page as the default publishing handoff. The user should be able to click `Copy body` and paste rich text directly into Substack.
4. Confirm Substack copy output uses absolute image URLs from `https://elbaph.vercel.app/...`.

## Validation And Deploy

Run commands from `apps/site`:

```bash
npm run lint
npm run build
```

For local visual checks, run the site and inspect the article:

```bash
npm run dev -- --port 3001
```

Deploy from the repo root when the site is ready:

```bash
npx vercel --prod --yes
```

After deployment, verify production:

1. Article page loads at `https://elbaph.vercel.app/blog/slug`.
2. All article image URLs return `200 image/png`.
3. Substack copy pages return `200` and contain the expected localized title.

## Response

Report concise Korean status with:

- live article URL
- Substack copy links for KO and EN
- validation and deployment result
- any skipped checks or blockers

Mention when deployment was done from a dirty working tree and do not imply a commit was created unless it was.
