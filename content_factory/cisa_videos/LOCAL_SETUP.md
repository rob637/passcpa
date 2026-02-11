# Running HeyGen Video Pipeline Locally

**Last Updated:** 2026-02-11

## Why Local?

The HeyGen browser automation uses Playwright to control a Chrome browser. This **cannot run in GitHub Codespaces** because:
- Codespaces don't have a display
- Playwright needs a real browser environment

You must run this on your **local machine** (Mac/Windows/Linux with a display).

---

## Quick Start (Local Machine)

### 1. Clone and Navigate

```bash
cd path/to/passcpa/content_factory/cisa_videos
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
playwright install chromium
```

### 3. First-Time Login (Opens Browser)

```bash
python test_login.py
```

A browser window opens. Log in with Google OAuth.  
The session is saved to `output/.browser_data/` — you only need to do this once.

### 4. Run Pipeline

```bash
# Test with 1 video first
python orchestrator.py --batch-size 1

# Or use the start script
./start.sh
```

---

## Single Video Test

To get **one video working** before running the full batch:

### Option A: Use the Orchestrator (Recommended)

```bash
python orchestrator.py --batch-size 1
```

This will:
1. Pick the hardest topic from the question bank
2. Generate a script (already done: `output/scripts/`)
3. Open HeyGen in browser
4. Create the video
5. Wait for completion
6. Download to `output/videos/`

### Option B: Manual HeyGen Upload

If automation fails, you can manually create a video:

1. Go to https://app.heygen.com/projects
2. Click "Create" → "Video"
3. Select an Avatar (Sarah, Bruce, or Jin)
4. Paste script from `output/scripts/CISA-VIDEO-001_Outsourcing.txt`
5. Set background to solid color (teal/light recommended)
6. Click "Submit"
7. Wait 5-10 minutes for render
8. Download the MP4

---

## Current State (2026-02-11)

| Item | Status |
|------|--------|
| Scripts Generated | ✅ 2 ready in `output/scripts/` |
| Videos Completed | ❌ 0 (automation failed in codespace) |
| HeyGen Session | ❌ Needs login on local machine |

### Generated Scripts Ready to Use:
- `CISA-VIDEO-001_Outsourcing.txt` - Outsourcing audit concepts
- `CISA-VIDEO-002_Risk-Based_Audit_Planning.txt` - Risk-based planning

---

## Environment Variables

Create `.env.local` in this directory (or use root `.env`):

```env
# HeyGen (for email/password login - optional if using Google)
HEYGEN_EMAIL=your-email@example.com
HEYGEN_PASSWORD=your-password

# OpenAI (for DALL-E backgrounds)
OPENAI_API_KEY=sk-...

# Gemini (for script generation)
VITE_GEMINI_API_KEY=...
```

---

## Troubleshooting

### "NoneType has no attribute 'goto'"
- **Cause:** Playwright can't launch browser (no display)
- **Fix:** Run on local machine, not codespace

### "No HeyGen session found"
- **Cause:** Need to login first
- **Fix:** Run `python test_login.py` and complete Google OAuth

### Video Stuck at "processing"
- **Cause:** HeyGen render queue is slow
- **Fix:** Wait 10-15 minutes, check HeyGen dashboard

---

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  orchestrator   │────▶│ generate_scripts│────▶│heygen_automation│
│     .py         │     │      .py        │     │      .py        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
   Topics from            Gemini AI              Playwright
   question bank          generates              browser
   analysis               scripts                automates
                                                 HeyGen web
```

Files are saved to:
- `output/scripts/` - Generated video scripts
- `output/videos/` - Downloaded MP4 files
- `output/.browser_data/` - Playwright session
- `output/pipeline.log` - Detailed logs
