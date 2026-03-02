# Elbaph Hub

Automation hub for Elbaph — a community of ambitious builders.

## What's in here

- **Loki Bot** (`apps/loki/`) — AI Slack bot that answers questions (Gemini) and does deep research (Manus) when tagged
- **News Skill** (`.claude/skills/news/`) — daily news briefing posted to #news via Claude Code

## Local Setup

### Prerequisites

- Node.js 18+
- npm

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

```bash
cp .env.example .env.local
```

Ask Chulwoo for the API keys and fill them in `.env.local`.

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
├── apps/loki/          # Loki Slack bot (Next.js)
│   ├── src/
│   │   ├── app/api/    # API routes (Slack events, Manus webhook)
│   │   └── lib/        # Shared utilities (format, Gemini, Manus, Redis)
│   └── .env.example    # Required env vars
├── .claude/skills/     # Claude Code automation skills
│   └── news/           # Daily news briefing
├── CLAUDE.md           # Project context for Claude Code
└── members.md          # Member profiles
```
