# Drafting Prompt Template

Use this prompt pattern when the user wants a reusable prompt or when you need to internally structure the drafting pass.

## Prompt

```text
You are drafting an Elbaph meetup article.

Goal:
Turn the provided meetup transcript, presentation materials, and speaker samples into a polished Korean article draft. The output should read like a standalone Elbaph blog article authored by the speaker, not like a transcript summary or meetup recap.

Inputs:
- Meetup metadata: {meetup_yaml_path}
- Speaker folder: {presentation_folder}
- Transcript: {transcript_path}
- Materials: {materials_paths}
- Existing draft, if any: {existing_article_or_blog_path}
- Speaker writing samples, if any: {speaker_samples}
- Existing Elbaph reference articles: {reference_article_paths}

Process:
1. Read all local sources before writing.
2. Extract the central thesis of the talk in one sentence.
3. Extract concrete examples, analogies, technical terms, caveats, and Q&A-derived insights.
4. Compare the reference Elbaph articles for structure, opening style, section-title style, paragraph rhythm, and conclusion style.
5. Design a narrative ramp for the first 10-20 lines: broad frame readers recognize -> overlooked problem -> central question.
6. Design the section arc before drafting. For technical research articles, prefer: common frame -> hard problem -> old workaround -> new approach -> limits -> realistic use case.
7. If speaker samples exist, match the speaker's 문체: sentence endings, first-person use, paragraph length, and rhetorical habits.
8. For difficult technical terms, decide which ones need first-use explanation, which can be inferred, and which should be replaced with plain Korean.
9. Choose length mode: default 5,500-7,500 Korean body characters, compact 4,000-5,500, deep-dive 7,500-10,000.
10. Draft a Korean article with frontmatter and 4-5 strong sections by default.
11. Keep meetup/Q&A context mostly invisible. Fold Q&A insights into the argument instead of writing "질문이 나왔다".
12. Do not invent the speaker's private thoughts, preparation process, emotions, or motivations.
13. Avoid polite endings if the speaker style uses plain declarative endings.
14. End with a sharpened thesis, not a recap.

Style:
- Korean body, with natural English technical terms when needed.
- Explain central technical terms at first use with a short sentence or tight parenthetical; avoid footnotes/glossary by default.
- Plain declarative style unless speaker samples indicate otherwise.
- Short paragraphs.
- Topic-first opening with a smooth ramp into the central question; avoid cold technical jumps.
- Concrete example before abstraction.
- Opinionated but careful.
- Preserve uncertainty where the source is uncertain.
- Keep the article in the selected length mode. Cut repeated explanations, second examples, side discussions, and market speculation before cutting the thesis or caveats.

Hard avoids:
- "이번 밋업에서는 ..."
- "발표에서는 ..."
- "질의에서는 ..."
- "이 글은 발표 자료를 요약한 것이 아니라 ..."
- "처음에는 ... 생각했다" unless directly supported
- writing about the speaker in third person when the speaker is the author
- unverifiable inner-state claims
- vague section headings such as "Q&A", "기술 설명", "결론"

Output:
Write `meetups/YYYY-MM-meetup-N/presentations/NN-speaker/article.md`.
```

## Revision Prompt

Use this after a first draft:

```text
Revise the draft into a stronger Elbaph article.

Check:
1. Does the opening work without knowing there was a meetup?
2. Does the first 10-20 lines move from recognizable frame to tension to central question, or does it start too abruptly?
3. Does the article have one clear thesis?
4. Do the section titles reveal 기승전결 when read alone?
5. Are transcript/Q&A details transformed into article logic?
6. Are there any invented feelings, preparation details, or speaker motivations?
7. Does the first-person voice match the speaker samples?
8. Are polite endings removed when inappropriate?
9. Are section titles claims rather than labels?
10. Is the conclusion adding a final frame rather than summarizing?
11. Are technical caveats preserved?
12. Are difficult technical terms explained naturally at first use without turning the article into a glossary?
13. Is the article within the selected length mode according to `wc -m`, allowing for frontmatter overhead?
14. Does the article resemble existing Elbaph pieces such as Taekyu humanoid, Younghoon AI chip, Yechan surgical data, or Chulwoo product reflection?
```

## Quick Regex Audit

```bash
rg -n '입니다|습니다|합니다|했습니다|봅니다|됩니다|있습니다|없습니다|했어요|이에요|예요|요[.?!]|죠[.?!]' meetups/.../article.md
rg -n '밋업|발표|질의|질문이 나왔다|모셨다|승준님|우리는 부탁' meetups/.../article.md
rg -n '처음에는|막상 준비|좋았다|느꼈다|선명해졌다|정리해보고 싶었다' meetups/.../article.md
wc -m meetups/.../article.md
```

These regexes are not final judgments. Use them to find lines that need manual review.
