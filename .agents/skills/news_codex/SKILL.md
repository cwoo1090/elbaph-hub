---
name: news_codex
description: Codex-native daily news briefing for Elbaph Discord. Trigger with "/news_codex" or "news codex". Research the latest news across AI, robotics, BCI, medtech, and Korea startups, format the Korean briefing, and post to #news and #lounge when Discord MCP tools are available.
---

# Daily News Briefing For Codex

When invoked, follow these steps in order:

1. Read [../news/reference.md](../news/reference.md) for topics, curated sources, search queries, selection rules, templates, and channel IDs.

2. Research the five topics using Codex tools:
   - Use the curated source URLs first.
   - Then run the supplement web search queries with the current month and year substituted.
   - Use browsing tools to inspect source pages and linked articles.
   - Prefer direct source pages and original reporting.
   - Verify a visible publication date for every candidate story. If a story has no trustworthy date, skip it.
   - If a source errors or blocks access, skip it and continue.

3. Apply the reference selection rules strictly:
   - Only include stories from the last 24 hours relative to the current local date.
   - Pick 3-4 stories per topic when available.
   - Deduplicate across sources and across topics.
   - Prefer the most informative source when the same story appears multiple times.

4. Normalize each retained story into:
   - `source_url`
   - `company`
   - `one_liner`
   - `breakdown`
   - `date`

   Keep company and product names in English. Write `one_liner` and `breakdown` in Korean.

5. Compose all outputs from the shared templates in `../news/reference.md`:
   - Main #news message with no links
   - One thread reply containing detailed Korean breakdowns and source links
   - One short #lounge teaser built around the most impactful story

6. If Discord MCP tools are available in the current session:
   - Post the main message to #news via `discord_post_message` and capture the returned message id.
   - Post the detailed reply via `discord_reply_to_thread`.
   - Build the Discord message URL from the server and channel IDs in the reference file.
   - Post the teaser to #lounge via `discord_post_message`.

7. If Discord MCP tools are not available in the current session:
   - Still generate the main message, thread reply, and lounge teaser.
   - Return the prepared post content to the user and state that Discord posting could not be completed from this session.

8. If all topics are empty after 24-hour filtering:
   - Do not post to Discord.
   - Inform the user that no qualifying stories were found.
