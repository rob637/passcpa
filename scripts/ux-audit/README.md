# VoraPrep UX Audit Tool

AI-powered autonomous browser testing using [browser-use](https://github.com/browser-use/browser-use) + Claude + Playwright.

## What It Does

An AI agent opens a real browser, navigates VoraPrep like a user would, interacts with every feature, takes screenshots, and writes structured UX audit reports — all autonomously.

## Setup

```bash
cd scripts/ux-audit

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers
playwright install chromium

# Set environment variables
cp .env.example .env
# Edit .env with your API keys
```

### Required Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Claude API key (required) |
| `VORAPREP_URL` | App URL (default: `http://localhost:5173`) |
| `VORAPREP_EMAIL` | Test user email |
| `VORAPREP_PASSWORD` | Test user password |

## Usage

```bash
# List all available audit tasks
python audit.py --list

# Run a single audit task
python audit.py --course cpa --task dashboard
python audit.py --course ea --task practice

# Smoke test (login + dashboard + practice + navigation)
python audit.py --course cpa --suite smoke

# Full audit (all 13 tasks)
python audit.py --course cpa --suite full

# Watch the browser work (headed mode)
python audit.py --course cpa --task dashboard --headed

# Run against production
python audit.py --course cpa --task landing --url https://voraprep.com

# Batch: smoke test ALL courses
python run_all.py

# Batch: full audit specific courses
python run_all.py --courses cpa ea cma --suite full
```

## Audit Tasks

| Task | Auth | Description |
|------|------|-------------|
| `login` | No | Authentication flow & error handling |
| `signup` | No | Registration & onboarding experience |
| `landing` | No | Public landing page conversion audit |
| `dashboard` | Yes | Study dashboard usability & info architecture |
| `navigation` | Yes | All nav paths, breadcrumbs, back button |
| `practice` | Yes | MCQ practice session end-to-end |
| `exam-simulator` | Yes | Full exam simulation experience |
| `flashcards` | Yes | Flashcard study interaction |
| `lessons` | Yes | Lesson reading & content experience |
| `settings` | Yes | Profile & settings management |
| `dark-mode` | Yes | Dark mode visual consistency |
| `responsive` | Yes | Layout at 4 viewport widths |
| `accessibility` | Yes | Keyboard nav, ARIA, contrast |

## Output

Reports are saved to `scripts/ux-audit/reports/` as timestamped Markdown files:

```
reports/
  ux_audit_cpa_dashboard_20260212_143022.md
  ux_audit_ea_practice_20260212_143522.md
  summary_20260212_150000.json
```

Each report includes:
- **Summary**: Overall assessment
- **Issues Found**: Severity-rated with steps to reproduce
- **Positive Observations**: What works well
- **Recommendations**: Prioritized improvements

## Architecture

```
scripts/ux-audit/
├── audit.py          # Main agent runner (CLI entry point)
├── config.py         # URLs, credentials, browser settings
├── tasks.py          # Task prompt definitions (13 audit types)
├── run_all.py        # Batch runner for all courses
├── requirements.txt  # Python dependencies
├── README.md         # This file
├── reports/          # Generated audit reports (gitignored)
└── screenshots/      # Agent screenshots (gitignored)
```
