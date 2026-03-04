# Elbaph Hub

Automation hub for Elbaph — a community of ambitious builders.

## What's in here

- **Loki Bot** (`apps/loki/`) — AI Slack bot that answers questions (Gemini) and does deep research (Manus) when tagged
- **Slack Archive** (`scripts/archive-slack/`) — weekly auto-archive of #ideas and #projects to searchable markdown, with AI thread summaries
- **News Skill** (`.claude/skills/news/`) — daily news briefing posted to #news via Claude Code

## Local Setup

### Prerequisites

- Node.js 18+
- npm
- [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`)

### 1. Clone the repo

```bash
git clone https://github.com/cwoo1090/elbaph-hub.git
cd elbaph-hub
```

### 2. Install dependencies

```bash
cd apps/loki
npm install
```

### 3. Set up environment variables

Link the Vercel project and pull env vars automatically:

```bash
vercel link
vercel env pull .env.local
```

If you don't have Vercel access, copy the example and ask Chulwoo for the keys:

```bash
cp .env.example .env.local
```

### 4. Run locally

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

## Deployment

Loki is deployed on **Vercel**. Pushes to `main` auto-deploy.

## Project Structure

```
elbaph-hub/
├── apps/loki/              # Loki Slack bot (Next.js)
│   ├── src/
│   │   ├── app/api/        # API routes (Slack events, Manus webhook)
│   │   └── lib/            # Shared utilities (format, Gemini, Manus, Redis)
│   └── .env.example        # Required env vars
├── scripts/archive-slack/  # Weekly Slack archive (GitHub Actions)
├── archive/                # Archived Slack messages (auto-generated)
├── .claude/skills/         # Claude Code automation skills
│   └── news/               # Daily news briefing
├── CLAUDE.md               # Project context for Claude Code
└── members.md              # Member profiles
```
