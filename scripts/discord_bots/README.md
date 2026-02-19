# VoraPrep Quiz Bots

Platform-agnostic quiz bots for 6 professional certification exams. Each bot serves practice questions with leaderboards, streaks, and calls-to-action driving users to VoraPrep.

## Architecture

```
quiz_engine.py          ← Platform-agnostic core (questions, leaderboard, stats)
├── discord_adapter.py  ← Discord (slash commands + emoji reactions)
├── telegram_adapter.py ← Telegram (inline keyboards + callbacks)
├── slack_adapter.py    ← Slack stub (Block Kit, future)
└── run_bots.py         ← Multi-bot launcher
```

## Supported Exams

| Exam | Questions | Sections |
|------|-----------|----------|
| 📊 CPA | 200 | FAR, AUD, REG, BAR, ISC, TCP |
| 🏛️ EA | 200 | SEE1, SEE2, SEE3 |
| 💹 CMA | 200 | CMA1, CMA2 |
| 🔍 CIA | 200 | CIA1, CIA2, CIA3 |
| 🔐 CISA | 200 | CISA1-CISA5 |
| 💰 CFP | 200 | 8 sections |

**Total: 1,200 questions** (~1.2% of 16,366 in the full platform — enough to hook users, not give away the farm)

## Quick Start

### Discord

1. **Create a Discord Application** at https://discord.com/developers/applications
2. Create a Bot, copy the token
3. Add token to `.env`:
   ```
   DISCORD_BOT_TOKEN=your_token_here
   ```
4. Invite the bot to your server:
   ```
   https://discord.com/api/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=85056&scope=bot%20applications.commands
   ```
5. Run:
   ```bash
   python run_bots.py --platform discord --exams cpa
   ```

### Telegram

1. **Create a bot** via [@BotFather](https://t.me/botfather)
2. Copy the token
3. Add to `.env`:
   ```
   TELEGRAM_BOT_TOKEN=your_token_here
   ```
4. Run:
   ```bash
   python run_bots.py --platform telegram --exams cpa
   ```

## Commands

### Discord (Slash Commands)
- `/quiz [section] [difficulty]` — Random practice question
- `/daily` — Question of the day
- `/leaderboard` — Server rankings
- `/stats [@user]` — Personal stats
- `/sections` — Available exam sections
- `/help` — Bot commands

### Telegram
- `/quiz` — Random question
- `/quiz FAR hard` — Filtered question
- `/quiz_FAR` — Section-specific
- `/daily` — Daily question
- `/leaderboard` — Group rankings
- `/stats` — Your stats
- `/sections` — Available sections

## CLI Usage

```bash
# Dry run — show question stats without connecting
python run_bots.py --dry-run

# Run specific exams
python run_bots.py --platform discord --exams cpa ea cma

# Run all 6 on Telegram
python run_bots.py --platform telegram
```

## Running 6 Separate Bots

For production, create 6 separate Discord applications and set exam-specific tokens:

```env
DISCORD_BOT_TOKEN_CPA=...
DISCORD_BOT_TOKEN_EA=...
DISCORD_BOT_TOKEN_CMA=...
DISCORD_BOT_TOKEN_CIA=...
DISCORD_BOT_TOKEN_CISA=...
DISCORD_BOT_TOKEN_CFP=...
```

Then run all 6:
```bash
python run_bots.py --platform discord
```

## Files

| File | Purpose |
|------|---------|
| `quiz_engine.py` | Core engine — questions, answers, leaderboards, stats |
| `discord_adapter.py` | Discord bot — slash commands, embeds, emoji reactions |
| `telegram_adapter.py` | Telegram bot — commands, inline keyboards, callbacks |
| `slack_adapter.py` | Slack bot stub — Block Kit messages (future) |
| `run_bots.py` | CLI launcher — starts bots on any platform |
| `bot_configs.json` | Per-exam configuration (names, colors, sections) |
| `extract_questions.ts` | TypeScript script to extract questions from source data |
| `data/*.json` | Extracted question files (200 per exam) |
| `leaderboards/*.json` | Persistent leaderboard data |

## Content Strategy

- **200 questions per exam** (1,200 total) — enough for ~6 months of daily questions
- **Truncated explanations** (300 chars max on Discord, 200 on Telegram) — tease full content
- **CTA on every interaction** — answer reveals, stats, leaderboards all link to VoraPrep
- **No systematic study** — random questions only, no structured learning path
- **Viral mechanics** — leaderboards encourage inviting friends, daily questions build habits

## Re-extracting Questions

To refresh the question pool from the main app's data:

```bash
npx tsx scripts/discord_bots/extract_questions.ts
```

This extracts 200 curated questions per exam from the full 16,366+ question bank.
