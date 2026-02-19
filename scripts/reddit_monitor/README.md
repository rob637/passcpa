# 🎯 Multi-Platform Opportunity Finder

Monitors social platforms for people asking about exam prep software (CPA, EA, CMA, CIA, CISA, CFP). Sends you email notifications with links and AI-generated suggested responses.

**You respond manually** — the bot only finds opportunities and drafts responses. This keeps it ethical and effective.

## Platform Support

| Platform | Status | API Cost | Notes |
|----------|--------|----------|-------|
| **Reddit** | ✅ Ready | **Free (RSS)** | No API key needed! Uses public RSS feeds |
| **Discord** | ✅ Ready | Free | Bot token required |
| **Twitter/X** | ✅ Ready | $100/mo | Basic tier for API access |
| **LinkedIn** | 📋 Manual | Free | Export/import manually |
| **Quora** | 🔜 Planned | N/A | Coming soon |

## Quick Start

### 1. Install Dependencies

```bash
cd scripts/reddit_monitor
pip install -r requirements.txt
```

### 2. Reddit — Works Immediately! (No setup)

Reddit uses **public RSS feeds** — no API key or account needed!

Monitored subreddits:
- r/CPA, r/Accounting, r/AccountingStudents
- r/CFP, r/FinancialPlanning
- r/taxpros (for EA)
- r/InternalAudit (for CIA)
- r/cybersecurity (for CISA)

### 3. Configure Discord (Optional, ~5 min)

1. Go to https://discord.com/developers/applications
2. Click "New Application" → name it "VoraPrep Opportunity Finder"
3. Go to "Bot" tab → click "Add Bot"
4. Click "Reset Token" and copy the token
5. Go to "OAuth2" → "URL Generator"
   - Select scopes: `bot`
   - Select permissions: `Read Messages/View Channels`, `Read Message History`
6. Copy the generated URL and open it to invite bot to accounting/CPA Discord servers

### 4. Set Up Environment

```bash
cp .env.example .env
# Edit .env with your credentials:
#   DISCORD_BOT_TOKEN=...     (optional - for Discord monitoring)
#   GEMINI_API_KEY=...        (use your existing VoraPrep key)
#   RESEND_API_KEY=...        (use your existing VoraPrep key)
#   NOTIFICATION_EMAIL=...
```

Note: Reddit works without any credentials!

### 5. Test Run

```bash
# Test mode (prints to console, doesn't send emails)
python reddit_opportunity_finder.py --test

# Check configuration status
python reddit_opportunity_finder.py --status
```

### 6. Run Continuously

```bash
# Check every 30 minutes
python reddit_opportunity_finder.py --daemon

# Check every 15 minutes
python reddit_opportunity_finder.py --daemon --interval 15
```

## Usage

```bash
# Run all configured platforms once
python reddit_opportunity_finder.py

# Run specific platform only
python reddit_opportunity_finder.py --platform reddit
python reddit_opportunity_finder.py --platform discord

# Run multiple platforms
python reddit_opportunity_finder.py --platform reddit --platform discord

# Test mode (print to console, don't email)
python reddit_opportunity_finder.py --test

# Run continuously
python reddit_opportunity_finder.py --daemon

# Check status
python reddit_opportunity_finder.py --status
```

## What It Monitors

### Reddit Subreddits
- r/CPA, r/cpa_exam, r/Accounting, r/AccountingStudents
- r/CFP, r/FinancialPlanning
- r/taxpros (for EA)
- r/InternalAudit (for CIA)
- r/cybersecurity (for CISA)

### Discord Servers
The bot monitors any server it's invited to, focusing on channels with names containing:
- `general`, `study`, `help`, `question`
- `cpa`, `accounting`, `exam`, `prep`

**Good Discord servers to join:**
- CPA Exam Discord servers (search "CPA Discord" on Reddit for links)
- Accounting student servers
- Professional certification study groups

### Keywords Detected
- "study material", "review course", "best course"
- "becker alternative", "cheaper than becker", "can't afford becker"
- "how to pass", "failed the exam", "retaking"
- "adaptive learning", "practice questions", "ai tutor"

### Exams Auto-Detected
- CPA (FAR, AUD, REG, BAR, ISC, TCP)
- EA (Enrolled Agent, SEE1/2/3)
- CMA, CIA, CISA, CFP

## Email Format

Each opportunity email includes:
1. **Original post/comment** with link
2. **Detected exam type(s)**
3. **AI-generated suggested response** (Gemini 2.0 Flash)
4. **Direct link to respond**

## Adding Twitter/X ($100/month)

Twitter requires a paid API subscription:

1. Apply at https://developer.twitter.com/
2. Subscribe to Basic tier ($100/mo for 10,000 reads)
3. Generate a Bearer Token
4. Add to `.env`:
   ```
   TWITTER_BEARER_TOKEN=your_token_here
   ```

## Response Best Practices

The AI generates responses, but **you control the posting**. Tips:

1. **Be helpful first** — Answer their question genuinely
2. **Don't be salesy** — Mention VoraPrep as ONE option
3. **Add personal touches** — Edit the AI response to sound like you
4. **Wait before responding** — Don't respond to every post immediately
5. **Share real value** — Link to blog posts, free resources when relevant

## Cron Setup (for servers)

```bash
# Run every 30 minutes
*/30 * * * * cd /path/to/passcpa/scripts/reddit_monitor && python reddit_opportunity_finder.py >> /var/log/opportunity-finder.log 2>&1
```

## Tracked Posts

Seen posts are stored in `seen_posts.json` (auto-created). Posts older than 30 days are automatically cleaned up.

## Architecture

```
PlatformAdapter (base class)
├── RedditAdapter      ✅ Uses PRAW
├── DiscordAdapter     ✅ Uses Discord REST API
├── TwitterAdapter     ✅ Uses Twitter API v2
├── LinkedInAdapter    📋 Manual JSON import
└── QuoraAdapter       🔜 Future (web scraping)

Opportunity (dataclass)
├── id, platform, type
├── title, text, url
├── author, created, score
├── exams (auto-detected)
└── extra (platform-specific)
```

## Cost Summary

| Component | Cost |
|-----------|------|
| Reddit API | Free |
| Discord API | Free |
| Twitter API | $100/month (optional) |
| Gemini API | ~$0.001 per response |
| Resend emails | Free tier: 3,000/mo |

**Recommended start:** Reddit + Discord (both free) + existing Gemini/Resend keys = **$0/month**

## Files

```
scripts/reddit_monitor/
├── reddit_opportunity_finder.py  # Main script
├── requirements.txt              # Python dependencies
├── .env.example                  # Environment template
├── .env                          # Your credentials (gitignored)
├── seen_posts.json              # Tracked posts (auto-created)
├── linkedin_import.json         # Manual LinkedIn import (optional)
└── README.md                    # This file
```
