---
name: draft-meetup-article
description: Draft polished Korean Elbaph meetup articles from local meetup transcripts, presenter materials, outlines, blog drafts, and speaker writing samples. Use when Codex is asked to turn a meetup transcript/material deck into an article draft, revise a draft toward Elbaph article style, preserve a speaker's 문체, or create `meetups/.../article.md` before publishing.
---

# Draft Meetup Article

Use this skill for the drafting stage only. It turns raw meetup sources into a polished Korean article that sounds like the speaker could have written it. It does not create images, English translations, Substack copy, deploys, or production article pages; use `publish-meetup-article` for those later steps.

## Required Reading

1. Read `AGENTS.md` and `meetups/README.md` if available.
2. Identify the meetup and speaker from the user request or from `meetups/YYYY-MM-meetup-N/meetup.yaml`.
3. Read all local source material for the target talk:
   - `transcript.md`
   - `materials/` files such as `slides.pptx`, `slides.pdf`, `outline.md`, `index.html`
   - existing `blog.md` or `article.md` drafts
   - any speaker writing samples supplied by the user
4. Read at least 2-4 existing Korean Elbaph articles from `apps/site/content/articles/meetup-*/*.md`, prioritizing similar topic/speaker/article type.
5. Read the reference files for this skill:
   - `references/elbaph-article-style.md` for the house style and anti-patterns
   - `references/transformation-casebook.md` for concrete source-to-article lessons
   - `references/drafting-prompt.md` when the user asks for a reusable prompt or when drafting from scratch

## Source Extraction

- For PPTX, extract slide text with Python `zipfile` + XML or another structured parser. Inspect slide titles, roadmap, key claims, diagrams, and cited examples.
- For PDF, extract text when possible and visually inspect relevant pages if layout/diagrams matter.
- For transcript, do not summarize linearly. Mine it for:
  - the speaker's main thesis
  - concrete examples and analogies
  - the broader frame a reader already understands before the technical problem appears
  - places where Q&A clarified an important constraint
  - phrases that reveal the speaker's actual stance
  - uncertainty, caveats, and limits
- Treat ClovaNote speaker labels as unreliable. Infer speaker turns from content only when needed.

## Drafting Rules

Write an article, not meeting minutes.

- Start from the topic's central question or a concrete scenario, not from "이번 밋업에서는", "발표에서는", or "질의에서는", unless the user explicitly wants a meetup recap.
- Give the opening a narrative ramp. If a concrete scenario feels abrupt, start one level broader with the domain frame readers already understand, then narrow to the central question in 3-8 short paragraphs.
- Keep meetup/Q&A context mostly invisible. Fold useful Q&A points into the article's argument.
- Do not invent the speaker's private feelings, preparation process, or motivations. Avoid claims like "처음에는 ... 생각했다", "질문들이 좋았다", "더 선명해졌다" unless directly supported.
- Do not write from an outside narrator's perspective if the article is authored by the speaker. Avoid "승준님은", "모셨다", "우리는 부탁했다" in the article body.
- Match the requested speaker's 문체. If the speaker sample uses plain declarative endings, avoid polite endings such as `입니다`, `습니다`, `합니다`, `했어요`, `이에요`, `예요`.
- Use speaker-owned first person when appropriate: `나는 ...라고 생각한다`, `내가 보기에는`, `솔직히 아직 모르겠다`. Do not overuse it.
- Preserve technical nuance. Do not simplify away caveats, uncertainty, or the difference between a promising signal and clinical proof.
- Keep difficult terms, but make them readable. Explain important technical terms at first use in the body with one short sentence or a tight parenthetical; do not default to a separate glossary or footnotes.
- Prefer clear claims over clever metaphors. Avoid metaphors that can be misread by general readers.

## Technical Term Handling

Elbaph readers can handle technical depth, but articles should not feel like a jargon list.

- Keep domain-native English terms when they are useful: `policy`, `MOR`, `ground truth`, `IMU`, `Kalman filter`, `latency`, `backlash`, `foundation model`.
- At first meaningful use, add a compact explanation:
  - Good: `policy는 로봇이 보고 있는 값(observation)을 받아 다음 행동(action)을 내는 제어 함수에 가깝다.`
  - Good: `MOR, motor operating region이다. 쉽게 말하면 모터가 어떤 회전 속도에서 어느 정도 torque를 낼 수 있는지 나타내는 영역이다.`
  - Good: `calibration은 실제 로봇을 계측해서 simulation model을 현실에 맞게 보정하는 일이다.`
- Use parentheses only for very short clarifications: `ground truth, 즉 실제 참값`.
- If a term appears only once and is not central, consider replacing it with plain Korean instead of explaining it.
- Avoid stacking many definitions in one paragraph. Spread explanations across the argument where each term becomes necessary.
- Do not over-explain terms the article's target reader can infer from context unless misunderstanding would break the thesis.

## Length Control

Use a readable blog length by default, not a transcript-document length.

- Default: Korean article body target is 5,500-7,500 characters. Use this unless the user requests otherwise.
- Compact: If the user says "짧게", "compact", "너무 길다", or "줄여줘", target 4,000-5,500 characters and reduce the current draft by roughly 25-40%.
- Deep-dive: Use 7,500-10,000 characters only when the topic has multiple technical axes or the user asks for detail.
- Over 10,000 characters requires an explicit reason or user request.
- Default section count is 4-5. Use 6 only for a deep technical article; if there are 7 or more sections, merge related sections first.
- When shortening, preserve the thesis, key technical caveats, and conclusion. Cut repeated explanations, second examples, side discussions, meeting-derived tangents, and broad market speculation first.

## Article Shape

Default shape:

1. Frontmatter with `slug`, `date`, bilingual `title`, bilingual `subtitle`.
2. Opening hook that frames the article's core problem in 3-8 short paragraphs.
3. 4-5 `##` sections by default, each advancing one argument.
4. A conclusion that sharpens the core thesis rather than recapping the talk.

Prefer a visible argument arc:

```text
broad frame readers recognize
central question / tension
why the problem is hard
how people currently work around it
what the speaker's approach changes
what limits or caveats remain
where it is realistically useful
final reframing
```

Use existing Elbaph article rhythm:

- short paragraphs
- direct questions
- concrete examples before abstractions
- Korean body with selective English technical terms
- explanatory but opinionated, not neutral lecture notes

## Revision Audit

Before finishing, run these checks with `rg` and manual reading:

- No polite endings if the speaker style is plain declarative:
  `입니다|습니다|합니다|했습니다|봅니다|됩니다|있습니다|없습니다|했어요|이에요|예요|요[.?!]|죠[.?!]`
- No outside-narrator markers unless intentionally retained:
  `밋업|발표|질의|질문이 나왔다|모셨다|승준님|우리는 부탁`
- No unsupported mind-reading:
  `처음에는|막상 준비|좋았다|느꼈다|선명해졌다|정리해보고 싶었다`
- The first 10-20 lines read like a standalone article and do not feel like a cold technical jump. They should move from frame to tension to question.
- Section titles reveal the article's progression, not just topic labels. The reader should be able to skim them and see 기승전결.
- `wc -m article.md` is within the target length mode, allowing for frontmatter overhead.
- Major technical terms are either naturally inferable, briefly explained at first use, or intentionally left unexplained because the target reader will know them.
- Every major technical claim is grounded in transcript/materials or explicitly marked as inference.
- Q&A-derived details appear as part of the argument, not as a meeting log.

## Output

Write or update:

```text
meetups/YYYY-MM-meetup-N/presentations/NN-speaker/article.md
```

Report the file path, the drafting stance, notable source material used, and any unresolved uncertainty. Do not imply publishing, translation, image generation, staging, or deployment unless those actions actually happened.
