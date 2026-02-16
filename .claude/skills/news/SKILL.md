---
name: news
description: Daily news briefing for Elbaph Slack. Searches latest news, curates top stories, posts to #news channel. Trigger with "/news", "daily briefing", "news briefing".
disable-model-invocation: true
---

# Daily News Briefing

When invoked, follow these steps in order:

1. Read [reference.md](reference.md) for topics, search patterns, and format
2. Web search each topic using the query pattern in reference.md
3. Pick 3-4 most notable stories per topic (prioritize breakthroughs, funding, new releases)
4. Format as a Slack message using the template in reference.md
5. Post to #news channel (`C0AFH9SQ857`) via Slack MCP
6. Save the briefing to `archive/YYYY-MM-DD.md` (use today's date)

If a topic has no meaningful news today, skip that section entirely.
