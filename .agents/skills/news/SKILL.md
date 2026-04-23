---
name: news
description: Daily news briefing for Elbaph Discord. Fetches curated sources and searches the web for latest news across AI, robotics, BCI, medtech, and Korea startups. Posts briefing to #news. Trigger with "/news", "daily briefing", "news briefing".
---

# Daily News Briefing

When invoked, follow these steps in order:

1. Read [reference.md](reference.md) for topics, curated sources, search queries, and format template.

2. **Dispatch 5 topic subagents in parallel:** Launch one `Task` subagent (`subagent_type: "general-purpose"`) per topic, all with `run_in_background: true`. Each subagent receives:
   - Its topic name and emoji
   - Its curated source URLs from reference.md (WebFetch prompt: "List the latest headlines with publication dates")
   - Its WebSearch queries from reference.md (replace `[month]`/`[year]` with current month/year)
   - Selection rules from reference.md section C
   - Today's date for 24h filtering
   - Instruction to return structured output (see format below)

   **Critical — sequential fetches inside each subagent:** Instruct each subagent to fetch sources ONE AT A TIME (not in parallel). This prevents sibling-call cascade failures where one source error kills all other fetches. If a source returns an error, skip it and continue to the next.

   **Subagent return format:** Each subagent must return a structured text block:
   ```
   TOPIC: [topic name]
   STORIES_FOUND: [number]

   STORY 1:
   - source_url: [URL]
   - company: [Company/Product name in English]
   - one_liner: [concise Korean summary]
   - breakdown: [2-3 sentence Korean breakdown]
   - date: [publication date]

   STORY 2:
   ...
   ```
   If no stories within 24h, return `STORIES_FOUND: 0`.

3. **Collect results:** Wait for all 5 subagents to complete using `TaskOutput`. Gather the structured output from each.

4. **Compose main message:** Assemble the 5 topic results into the main message template from reference.md. For topics with `STORIES_FOUND: 0`, show `• *최근 24시간 내 주요 뉴스가 없습니다*`. Clean one-liners, no links. Write in Korean.

5. **Post main message:** Post to #news channel (`1480085235315114195`) via `discord_post_message`. **Capture the returned message `id`.**

6. **Compose & post thread reply:** Format a single thread reply using the thread template in reference.md — all topics in one reply, with source links and detailed breakdowns. Only include topics that have actual stories. Post via `discord_reply_to_thread` using the captured message `id` as `message_id`.

7. **Cross-post to #lounge:** Compose a short hook message using the lounge template in reference.md. Pick the single most impactful headline as a teaser, add a provocative question or comment related to today's news. **Construct a Discord message link** using the format `https://discord.com/channels/1480074652884795462/1480085235315114195/{message_id}` and include it as a link to the full briefing. Post to #lounge channel (`1480085107174936697`) via `discord_post_message`.

If ALL topics returned `STORIES_FOUND: 0`, do not post — inform the user instead.
