# News Briefing Reference

## A. Curated Sources (Layer 1 — WebFetch)

Use the WebFetch prompt: "List the latest headlines with publication dates"

| Topic | Sources |
|-------|---------|
| AI / LLM | Hacker News — `https://news.ycombinator.com/` |
| | TechCrunch AI — `https://techcrunch.com/category/artificial-intelligence/` |
| | GeekNews — `https://news.hada.io/` |
| | Crescendo AI — `https://www.crescendo.ai/news/latest-ai-news-and-updates` |
| Robotics / Physical AI | The Robot Report — `https://www.therobotreport.com/` |
| | Robotics & Automation News — `https://roboticsandautomationnews.com/` |
| BCI | Neuroscience News Neurotech — `https://neurosciencenews.com/neuroscience-topics/neurotech/` |
| | ScienceDaily BCI — `https://www.sciencedaily.com/news/mind_brain/brain-computer_interfaces/` |
| Medtech / Surgical Robotics | MassDevice — `https://www.massdevice.com/` |
| | STAT News — `https://www.statnews.com/` |
| Korea Startup / Tech | KoreaTechToday — `https://koreatechtoday.com/` |
| | KED Global — `https://www.kedglobal.com/` |
| | KoreaTechDesk — `https://koreatechdesk.com/` |
| | Korea Herald Tech — `https://www.koreaherald.com/Business/Technology` |

All sources above are confirmed to return actual article content with dates via WebFetch. (AI Business removed due to intermittent 403 errors causing fetch failures.)

## B. WebSearch Queries (Layer 2 — Supplement)

Run 2 queries per topic. Replace `[month]` and `[year]` with the current month and year.

| Topic | Q1: General News | Q2: Community/Social |
|-------|-----------------|----------------------|
| AI / LLM | `AI LLM latest news [month] [year]` | `reddit AI LLM news [month] [year]` |
| Robotics / Physical AI | `robotics physical AI humanoid news [month] [year]` | `reddit robotics humanoid news [month] [year]` |
| BCI | `brain computer interface BCI news [month] [year]` | `reddit BCI brain computer interface [month] [year]` |
| Medtech / Surgical Robotics | `medtech surgical robot news [month] [year]` | `reddit surgical robotics medtech [month] [year]` |
| Korea Startup / Tech | `Korea startup funding tech news [month] [year]` | `한국 스타트업 투자 뉴스 [month] [year]` |

## C. Selection Rules

- Pick 3-4 stories per topic
- Prioritize: breakthroughs, major funding, new product/demo launches, viral moments, regulatory news, industry trends
- **Date verification:** For every candidate story, check its publication date from the source. Only include stories from the last 24 hours. If a story has no visible date, skip it.
- 24h strict. Only stories published today or yesterday. No exceptions for older stories regardless of significance.
- If a topic has no stories within 24h, keep the topic header and show `• _최근 24시간 내 주요 뉴스가 없습니다_`
- If the same story appears from multiple sources, pick the most informative version
- Deduplicate across topics

## D. Slack Message Template

No links in the message — keep it clean and scannable. Write in Korean.

```
📰 *Elbaph Daily Briefing — [Mon DD, YYYY]*

---

*🤖 AI / LLM*
• *[Company/Product]* — 한 줄 요약
• *[Company/Product]* — 한 줄 요약
• *[Company/Product]* — 한 줄 요약

*🦾 Robotics / Physical AI*
• *[Company/Product]* — 한 줄 요약
• *[Company/Product]* — 한 줄 요약
• *[Company/Product]* — 한 줄 요약

*🧠 BCI (Brain-Computer Interface)*
• *[Company/Product]* — 한 줄 요약
• *[Company/Product]* — 한 줄 요약

*🏥 Medtech / Surgical Robotics*
• *[Company/Product]* — 한 줄 요약
• *[Company/Product]* — 한 줄 요약

*🇰🇷 Korea Startup / Tech*
• *[Company/Product]* — 한 줄 요약
• *[Company/Product]* — 한 줄 요약
• *[Company/Product]* — 한 줄 요약

---
_Curated by Elbaph News Bot_ 🤖
```

Rules:
- Bold the company/product name, then a concise one-line summary in Korean
- Company/product names stay in English; summaries in Korean
- If a topic has no stories within 24h, show the topic header with `• _최근 24시간 내 주요 뉴스가 없습니다_` instead of skipping
- No links in the Slack message

## E. Thread Reply Template

Post ONE thread reply containing all detailed breakdowns + source links. Use `slack_reply_to_thread` with the main message's `ts`. Write in Korean.

```
🔗 *상세 내용 & 소스*

*🤖 AI / LLM*

*<URL|Company/Product>*
2-3문장 상세 설명 — 무슨 일이 있었는지, 왜 중요한지

*<URL|Company/Product>*
2-3문장 상세 설명

*🦾 Robotics / Physical AI*

*<URL|Company/Product>*
2-3문장 상세 설명

(각 토픽별로 반복)
```

Rules:
- All topics in a single thread reply
- Use Slack link syntax `<URL|display text>` for source links
- Company/product names in English, descriptions in Korean
- Only include topics that have actual stories (skip topics with no 24h news from thread reply)
- Keep breakdowns concise — 2-3 sentences max per story

## F. Lounge Cross-Post Template

Post to #lounge (`C0AA15Q77FS`) via `slack_post_message`. Write in Korean.

```
💡 *오늘의 픽*
*[Company/Product]* — 가장 임팩트 있는 헤드라인 한 줄 요약

[오늘 뉴스에서 영감을 받은 생각을 자극하는 질문이나 코멘트]

<https://elbaph.slack.com/archives/C0AFH9SQ857/p{ts_without_dot}|오늘의 전체 브리핑 보기> 📰
```

Rules:
- Pick the single most impactful/surprising headline from today's briefing
- Add one thought-provoking question or sharp comment that could spark discussion
- The question should connect the news to topics the Elbaph members care about (robotics, medtech, BCI, startups, Korea tech)
- Keep it short — 3-4 lines max
- No details — just enough to hook curiosity
- Construct the permalink by removing the dot from the main message `ts` and prepending `p` (e.g., ts `1234567890.123456` → `p1234567890123456`)
- If ALL topics were empty (no 24h news), skip the lounge post entirely

## G. Archive Format

Save to `archive/YYYY-MM-DD.md`:

```markdown
# Daily Briefing — YYYY-MM-DD

[same content as Slack message, in plain markdown without Slack formatting]
```
