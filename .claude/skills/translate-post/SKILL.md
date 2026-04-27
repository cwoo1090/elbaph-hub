---
name: translate-post
description: Translate a Korean Elbaph blog post to English. Reads the Korean source, translates body/title/subtitle preserving voice and markdown structure, writes <name>.en.md, patches the source frontmatter with title.en and subtitle.en, and auto-commits with a Conventional Commit message. Use when the user runs `/translate-post <path>` or asks to translate an Elbaph blog post to English.
---

# Translate Post Skill

Translate a Korean Elbaph blog post to English, write the English body to a sibling `.en.md` file, patch the source frontmatter, and auto-commit.

## Inputs

A single path argument: the Korean source `.md` file. Resolve relative paths against the repo root.

Examples:
- `apps/site/content/posts/meetup-2/chulwoo.md`
- `apps/site/content/posts/meetup-3/younghoon.md`

## Procedure

1. **Read** the source file at the given path.

2. **Validate**:
   - File must exist; otherwise abort with a clear error including the resolved path.
   - Frontmatter must contain `title.ko`. If missing, abort: "this doesn't look like an Elbaph blog post (missing `title.ko`)".
   - Check for an existing sibling `.en.md` (same base name, `.en.md` extension). If present, ask the user to confirm regeneration; default to no.

3. **Translate the body** to English, preserving:
   - Markdown structure exactly: headings (`##`, `###`), lists, blockquotes, code blocks, links, emphasis, paragraph spacing.
   - Voice: direct, intellectual, no-filler — match the Elbaph brand (see `apps/site/CLAUDE.md` design context).
   - Personal-essay tone: first-person, conversational, confident.
   - Loanwords already borrowed in Korean stay in English (`writing`, `friction`, `side project`, `prompt`, `MVP`, `landing page`, etc.).
   - Translate meaning and rhythm, not literal phrases. Korean idioms become natural English equivalents.
   - Do not smooth out the author's voice or add filler the original did not have.

4. **Translate `title.ko` and `subtitle.ko`** to English with the same voice guidelines. Keep them tight.

5. **Write** the translated body to the sibling `<name>.en.md` file. Body only — no frontmatter.

6. **Update** the source `.md` file's frontmatter to add or replace `title.en` and `subtitle.en`. Preserve `slug`, `date`, and any other fields. Result frontmatter shape:

   ```yaml
   ---
   slug: ...
   date: ...
   title:
     ko: ...
     en: <translated title>
   subtitle:
     ko: ...
     en: <translated subtitle>
   ---
   ```

7. **Stage and commit** both files (`git add` the `.md` and the `.en.md`) with this commit message:

   ```
   docs: translate <slug> to English
   ```

   Use the `slug` from the frontmatter. Do not skip hooks. Do not amend prior commits.

## Output

After committing, print:
- Both file paths written.
- Approximate English word count.
- The commit hash and short message.

Do not run the dev server. Do not open a browser. The author reviews the translation in their editor and makes follow-up commits if they want to hand-edit.

## Failure modes

- File not found → fail with the resolved path; no changes made.
- No `title.ko` in frontmatter → fail with the message above; no changes made.
- Existing `.en.md` and user declines regeneration → exit cleanly with no changes.
- `git commit` fails (e.g. pre-commit hook) → leave the files in place, surface the error so the author can resolve and create a new commit themselves.
