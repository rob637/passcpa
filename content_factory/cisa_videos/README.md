# CISA Video Generation Pipeline

## Fully Automated HeyGen Video Creation (No API)

This pipeline generates educational videos for CISA exam topics using HeyGen's Avatar III, **without using the expensive HeyGen API**. Runs completely unattended in the background for hours/days.

---

## Quick Start

```bash
# 1. Install dependencies  
pip install -r requirements.txt && playwright install chromium

# 2. One-time login (opens browser for Google OAuth)
python test_login.py
# → Log in with Google in the browser window
# → Session is saved automatically

# 3. Start pipeline
./start.sh
```

Check progress anytime with: `./start.sh --status`

### Authentication Options

| Method | Setup |
|--------|-------|
| **Google OAuth** (recommended) | Run `python test_login.py` once, log in manually. Session persists. |
| **Email/Password** | Set `HEYGEN_EMAIL` and `HEYGEN_PASSWORD` in `.env.local` |

The browser session is saved to `browser_data/` directory - you only need to log in once.

---

## How It Works

```
┌──────────────┐    ┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│ 1. Analyze   │───▶│ 2. Generate │───▶│ 3. HeyGen    │───▶│ 4. Download │
│    Topics    │    │    Content  │    │   Browser    │    │   & Store   │
│ (automatic)  │    │   (AI APIs) │    │ (automated)  │    │  (Firebase) │
└──────────────┘    └─────────────┘    └──────────────┘    └─────────────┘
      │                   │                   │                   │
      ▼                   ▼                   ▼                   ▼
 Hard questions      Scripts +           Creates video      Saves MP4 +
 from question      backgrounds           via web UI        uploads to
 bank analysis       via AI                in headless       cloud
                                           browser
```

### Key Features

- ✅ **Fully autonomous** - runs for hours/days unattended
- ✅ **State persistence** - survives restarts, resumes from where it left off
- ✅ **Failure recovery** - automatic retries with exponential backoff
- ✅ **Progress logging** - detailed logs to file + status command
- ✅ **Graceful shutdown** - Ctrl+C saves state before exit
- ✅ **Docker support** - isolated, reproducible environment

---

## Components

| File | Purpose |
|------|---------|
| `orchestrator.py` | **Main controller** - runs the full pipeline |
| `analyze_topics.py` | Finds hardest CISA topics from questions |
| `generate_scripts.py` | Creates video scripts using Gemini AI |
| `generate_backgrounds.py` | Creates backgrounds using DALL-E |
| `heygen_automation.py` | Browser automation for HeyGen web |
| `webhook_server.py` | HTTP API for Make.com/Zapier integration |
| `config.py` | Configuration and settings |
| `start.sh` | Background process controller |

---

## Prerequisites

| Requirement | Purpose | Setup |
|-------------|---------|-------|
| **HeyGen Account** | Avatar subscription | Sign up at heygen.com |
| **OpenAI API Key** | DALL-E backgrounds | platform.openai.com |
| **Gemini API Key** | Script generation | Already in your .env |
| **Python 3.10+** | Runtime | Pre-installed |

---

## Configuration

Add to your `.env` file (or create `.env.local` in this directory):

```env
# HeyGen credentials (for browser automation login)
HEYGEN_EMAIL=your-email@example.com
HEYGEN_PASSWORD=your-heygen-password

# OpenAI (for DALL-E backgrounds)
OPENAI_API_KEY=sk-...

# Gemini (for scripts - you already have this)
VITE_GEMINI_API_KEY=...
```

---

## Running the Pipeline

### Option 1: Background Process (Recommended)

```bash
# Start
./start.sh

# Check status
./start.sh --status

# Watch logs
./start.sh --logs

# Stop
./start.sh --stop
```

### Option 2: Docker (Most Robust)

```bash
# Start container
docker-compose up -d

# Watch logs
docker-compose logs -f

# Check status
docker-compose exec pipeline python orchestrator.py --status

# Stop
docker-compose down
```

### Option 3: Direct Python

```bash
# Foreground (for debugging)
python orchestrator.py --batch-size 10

# Background with nohup
nohup python orchestrator.py --batch-size 100 > /dev/null 2>&1 &
```

---

## Make.com / Zapier Integration

The webhook server provides HTTP endpoints for external automation:

```bash
# Start webhook server
python webhook_server.py

# Or with Docker
docker-compose --profile webhook up -d
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/status` | Pipeline progress |
| GET | `/tasks` | List all tasks |
| GET | `/tasks/<id>` | Get specific task |
| POST | `/trigger` | Start new batch |
| POST | `/add-topic` | Add specific topic |

### Example Make.com Scenario

1. **Schedule Trigger** - Run every 6 hours
2. **HTTP Request** - POST to `/trigger` with batch_size
3. **Wait** - Delay 2 hours (video processing time)
4. **HTTP Request** - GET `/status` to check completion
5. **Email/Slack** - Notify on completion or failure

---

## Cost Breakdown

| Component | Cost per Video | Notes |
|-----------|----------------|-------|
| Script (Gemini) | ~$0.01 | ~500 tokens |
| Background (DALL-E) | ~$0.04 | Standard quality |
| HeyGen | $0.00 | Included in subscription |
| Storage | ~$0.01 | Firebase |
| **Total** | **~$0.06** | |

**100 videos = ~$6** (vs $100+ using HeyGen API directly)

---

## Output Structure

```
output/
├── pipeline_state.json    # Persistent state (survives restarts)
├── pipeline.log           # Detailed logs
├── topics_analysis.json   # Topic rankings
├── scripts_manifest.json  # Script metadata
├── scripts/               # Generated TXT scripts
│   ├── 01_COBIT_Framework.txt
│   └── ...
├── backgrounds/           # Generated PNG backgrounds
│   ├── 01_COBIT_Framework.png
│   └── ...
└── videos/                # Downloaded MP4 videos
    ├── CISA-VIDEO-001_COBIT_Framework.mp4
    └── ...
```

---

## Troubleshooting

### "Playwright not installed"
```bash
pip install playwright
playwright install chromium
```

### "Login failed"
1. Check HEYGEN_EMAIL and HEYGEN_PASSWORD in .env
2. Try with `headless=False` to see the browser:
   ```python
   # In heygen_automation.py, change:
   HeyGenAutomation(headless=False)
   ```

### "Video stuck in processing"
- HeyGen videos take 2-10 minutes to generate
- Pipeline polls every 60 seconds automatically
- Check HeyGen dashboard directly if stuck >30 minutes

### "State corrupted"
```bash
# Reset pipeline state (loses progress!)
rm output/pipeline_state.json
./start.sh
```

---

## Extending to Other Exams

The pipeline is designed for CISA but can be extended:

1. Copy `cisa_videos/` to `cpa_videos/`
2. Update `analyze_topics.py` to read CPA questions
3. Update domain mappings in `config.py`
4. Run with same commands
