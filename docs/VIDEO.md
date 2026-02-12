# Video Production Guide

> **Last Updated:** February 2026  
> **Primary Platform:** HeyGen AI Studio  
> **Primary Instructor:** Sarah (The Tax Strategist)

---

## Production Philosophy

### Consistency vs. Variety Balance

| Element | Keep Consistent | Add Variety |
|---------|----------------|-------------|
| Instructor | Sarah as "anchor" | Occasional guest for specialty topics |
| Duration | ✓ 8-12 min range | |
| Opening hook | | Rotate: scenario, question, myth-bust |
| Visuals | | Mix: DALL-E, screencasts, mermaid diagrams |
| Closing | ✓ Exam tip + CTA | |

### Why Consistency Matters
1. **Cognitive load** - Students know what to expect, can focus on content not format
2. **Brand recognition** - "Sarah" becomes a trusted instructor they look for
3. **Production efficiency** - Batch processing is faster
4. **Study routine** - Predictable format fits into study habits
5. **Professional feel** - Major platforms (Khan Academy, Coursera) use consistent formats

### Why Variety Matters
1. **Attention fatigue** - After 5-10 videos, monotony sets in
2. **Learning modalities** - Some topics suit whiteboard, others suit animation
3. **Engagement metrics** - Variety can improve completion rates
4. **Topic matching** - Abstract concepts vs. step-by-step calculations need different approaches

### Recommendation
- **Batch 1:** Full consistency to establish brand and production workflow
- **Batch 2+:** Introduce variety based on engagement data (completion rates, rewatch patterns)

---

## Video Format Templates

### Format A: "The Standard" (Current Default)
Best for: Core concept explanations, foundational topics

```
Structure:
├── Hook (0:00-0:45) - Scenario with relatable client problem
├── Core Concept (0:45-4:00) - Theory with visual diagrams
├── Worked Example (4:00-7:00) - Numbers on screen
├── Common Mistakes (7:00-8:30) - "Exam Traps"
└── Outro (8:30-10:00) - Summary + CTA to practice

Visuals: Title card → Diagrams → Calculations → Exam tip card
Avatar: Sarah, professional setting, consistent background
```

---

### Format B: "Myth Buster"
Best for: Common misconceptions, "gotcha" topics

```
Structure:
├── The Myth (0:00-1:00) - "Most people think X..."
├── Why It's Wrong (1:00-3:00) - IRS code citation
├── The Truth (3:00-6:00) - Correct rule with examples
├── Side-by-Side Comparison (6:00-8:00) - Myth vs Reality table
└── Memory Hook (8:00-10:00) - Mnemonic or analogy

Visuals: ❌ vs ✓ graphics, before/after comparisons
Opening Line: "Everyone gets this wrong. Here's why..."
```

**Good Topics:**
- S-Corp basis from loan guarantees (it's zero!)
- Hobby loss "3 of 5 years" myth
- "Cash basis means I don't report receivables"

---

### Format C: "The Showdown"
Best for: Comparing similar concepts (S-Corp vs Partnership, 1245 vs 1250)

```
Structure:
├── Setup (0:00-1:00) - "Two rules that look identical but aren't"
├── Contender 1 (1:00-4:00) - First concept in depth
├── Contender 2 (4:00-7:00) - Second concept in depth
├── The Comparison (7:00-9:00) - Side-by-side table/visual
└── Exam Strategy (9:00-10:00) - "If you see X, think Y"

Visuals: Split screen, comparison tables, decision trees
Opening Line: "On the surface, these look the same..."
```

**Good Topics:**
- S-Corp vs Partnership basis rules
- Section 1245 vs 1250 recapture
- Active vs Material Participation
- Form 8832 vs 2553

---

### Format D: "The Walkthrough"
Best for: Multi-step calculations, form completion

```
Structure:
├── The Goal (0:00-0:30) - "We're going to calculate X"
├── Step 1 (0:30-2:30) - First calculation with narration
├── Step 2 (2:30-4:30) - Building on step 1
├── Step 3 (4:30-6:30) - Continue building
├── Full Solution (6:30-8:00) - Show complete answer
└── Variations (8:00-10:00) - "What if the numbers changed?"

Visuals: Screen recording style, numbers appearing step-by-step
Opening Line: "Grab a calculator. We're doing this together."
```

**Good Topics:**
- Partnership basis calculations (BASE formula)
- AMT computation
- Net Operating Loss carryforward
- Schedule K-1 distribution analysis

---

### Format E: "The Story"
Best for: Complex scenarios, real-world application

```
Structure:
├── Meet the Client (0:00-1:30) - Character intro with problem
├── The Investigation (1:30-4:00) - Uncovering the facts
├── The Analysis (4:00-7:00) - Applying tax rules to facts
├── The Resolution (7:00-9:00) - Solution and outcome
└── The Lesson (9:00-10:00) - Abstract principle extracted

Visuals: Character graphics, timeline, document props
Opening Line: "Let me tell you about a client I'll call..."
```

**Good Topics:**
- Hobby loss audits
- Entity selection decisions
- Passive loss limitation planning
- Complex distribution scenarios

---

### Format F: "Quick Hit" (5 minutes)
Best for: Single rules, memorization topics, exam tips

```
Structure:
├── The Rule (0:00-1:00) - State it clearly
├── Why It Exists (1:00-2:00) - Brief context
├── Example (2:00-3:30) - One clear application
├── Exam Format (3:30-4:30) - How it appears on test
└── Memory Trick (4:30-5:00) - Mnemonic

Visuals: Minimal, focus on key numbers/thresholds
Opening Line: "60 seconds to learn a rule worth 2 points..."
```

**Good Topics:**
- $25,000 rental exception thresholds
- 60-month election limitation
- At-risk basis rules
- Specific form numbers

---

## Visual Asset Types

### 1. DALL-E Generated (Current)
- Title cards
- Conceptual illustrations
- Metaphor graphics

### 2. Mermaid Diagrams
- Flowcharts for decision trees
- Sequence diagrams for ordering rules
- Entity relationship diagrams

### 3. Animated Text/Numbers
- Step-by-step calculations
- Formula reveals
- Threshold animations

### 4. Comparison Tables
- Side-by-side rules
- Before/after scenarios
- Entity comparisons

### 5. Screen Recordings (Future)
- IRS form walkthroughs
- Software demonstrations
- Website navigation

---

## Background Running (Xvfb)

To run video production without taking over your display:

```bash
# Install xvfb (one-time)
sudo apt-get install xvfb

# Run automation with virtual display
xvfb-run -a python heygen_automation_v2.py

# Or wrap any command
xvfb-run -a <command>
```

This allows the browser automation to run in a virtual screen while you use your computer normally.

---

## Batch Production Workflow

1. **Script Preparation**
   - Write scripts in markdown with visual cues
   - Generate CSV for automation

2. **Visual Generation**
   - Run DALL-E prompts for assets
   - Create mermaid diagrams
   - Prepare any screen recordings

3. **Video Generation**
   - Run HeyGen automation (background with xvfb)
   - Monitor progress via logs

4. **Quality Review**
   - Check timing and pacing
   - Verify audio clarity
   - Confirm visual sync

5. **Upload & Metadata**
   - Add to Firebase storage
   - Update lesson metadata
   - Generate thumbnails

---

## Retrieving Generated Videos from HeyGen

### Step 1: Check Video Status
After running the automation, videos are queued for processing. Check status:

```bash
cd content_factory
python check_status.py
```

Or use the HeyGen API directly:
```python
import requests

HEYGEN_API_KEY = "your_key"
VIDEO_ID = "from_batch_results"

response = requests.get(
    f"https://api.heygen.com/v1/video_status.get?video_id={VIDEO_ID}",
    headers={"X-Api-Key": HEYGEN_API_KEY}
)
data = response.json()

if data['data']['status'] == 'completed':
    video_url = data['data']['video_url']  # Direct download URL
```

### Step 2: Download Videos

**Option A: Batch Download Script**
```bash
# Create download script
python scripts/download_heygen_videos.py --batch ea_batch1_results.json --output ./videos/ea/
```

**Option B: Manual Download**
- Go to [HeyGen Dashboard](https://app.heygen.com/videos)
- Select videos → Download MP4
- Rename to match our ID format: `SEE2-005.mp4`

### Step 3: Upload to Firebase Storage
```bash
# Upload to Firebase Storage for CDN delivery
firebase deploy --only storage
# Or use gsutil for bulk upload:
gsutil -m cp -r videos/ea/* gs://passcpa.appspot.com/videos/ea/
```

### Step 4: Get CDN URLs
Firebase Storage URLs follow this pattern:
```
https://firebasestorage.googleapis.com/v0/b/passcpa.appspot.com/o/videos%2Fea%2FSEE2-005.mp4?alt=media
```

---

## App Integration Plan

### Where Videos Appear

Videos integrate at three touchpoints:

```
┌─────────────────────────────────────────────────────────────┐
│  1. LESSON VIEWER (Primary)                                  │
│     /lessons/{lessonId}                                      │
│     ┌─────────────────────────────────────┐                  │
│     │  [VIDEO PLAYER]                     │                  │
│     │  Sarah explains S-Corp Basis...     │                  │
│     └─────────────────────────────────────┘                  │
│     Text content below (for reference/search)                │
├─────────────────────────────────────────────────────────────┤
│  2. STUDY JOURNEY                                            │
│     Video indicator badge on lesson cards                    │
│     "🎬 Video Available" or play icon                        │
├─────────────────────────────────────────────────────────────┤
│  3. QUESTION EXPLANATIONS                                    │
│     After answering wrong → "Watch Sarah explain this"       │
│     Links to relevant video segment                          │
└─────────────────────────────────────────────────────────────┘
```

### Data Model

Videos are linked via the `VideoLesson` type in `src/courses/ea/videos.ts`:

```typescript
// Current structure (already exists)
export interface VideoLesson {
  id: string;           // 'SEE2-005'
  sectionId: string;    // 'SEE2'
  title: string;
  description: string;
  duration: number;     // minutes
  order: number;
  status: VideoStatus;  // 'planned' | 'in-production' | 'available'
  videoUrl?: string;    // Firebase Storage URL (add when ready)
  thumbnailUrl?: string;
  transcript?: string;
  topics: string[];
}
```

**To activate a video:**
```typescript
// In src/courses/ea/videos.ts, update the video entry:
{
  id: 'SEE2-005',
  sectionId: 'SEE2',
  title: 'S-Corp Basis (Stock vs. Debt)',
  status: 'available',  // Change from 'planned'
  videoUrl: 'https://firebasestorage.googleapis.com/v0/b/passcpa.appspot.com/o/videos%2Fea%2FSEE2-005.mp4?alt=media',
  thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/passcpa.appspot.com/o/thumbnails%2Fea%2FSEE2-005.jpg?alt=media',
  // ... rest of fields
}
```

### Implementation Tasks

| Task | File | Status |
|------|------|--------|
| Video player component | `src/components/VideoPlayer.tsx` | To create |
| Add to LessonViewer | `src/components/pages/LessonViewer.tsx` | To update |
| Video indicator on cards | `src/components/pages/StudyJourney.tsx` | To update |
| Question → Video link | `src/components/pages/Practice.tsx` | To update |
| Batch download script | `scripts/download_heygen_videos.py` | To create |
| Thumbnail generator | `scripts/generate_thumbnails.py` | To create |

### Recommended Video Player

Use a lightweight player that supports:
- HLS/DASH adaptive streaming (if we transcode)
- Simple MP4 playback (current approach)
- Playback speed control (0.5x - 2x)
- Chapter markers (timestamps from Visual_Prompts)
- Mobile-responsive

Options:
1. **Plyr** - Lightweight, customizable, React wrapper available
2. **Video.js** - Full-featured, widely used
3. **Native HTML5 `<video>`** - Simplest, no dependencies

### Example LessonViewer Integration

```tsx
// In LessonViewer.tsx
import { VideoPlayer } from '../VideoPlayer';
import { getVideoForLesson } from '../../courses/ea/videos';

const LessonViewer = ({ lessonId }) => {
  const video = getVideoForLesson(lessonId);
  
  return (
    <div>
      {video?.status === 'available' && (
        <VideoPlayer
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          title={video.title}
        />
      )}
      
      {/* Existing lesson content */}
      <LessonContent ... />
    </div>
  );
};
```

---

## Video Asset Locations

| Asset Type | Location | Notes |
|------------|----------|-------|
| Raw MP4s from HeyGen | `content_factory/output/` | Temporary, don't commit |
| Production videos | Firebase Storage `videos/{course}/` | CDN-served |
| Thumbnails | Firebase Storage `thumbnails/{course}/` | Auto-generated |
| Transcripts | Firestore `videos/{videoId}` | For search/accessibility |
| Batch manifests | `content_factory/*.json` | Track production status |
| Video metadata | `src/courses/{course}/videos.ts` | TypeScript config |

---

## CISA Video Production System

> **Location:** `content_factory/cisa_videos/`  
> **Current Curriculum:** 84 videos across 5 CISA domains + exam strategy

### Quick Start Commands

```bash
cd content_factory/cisa_videos

# ─── Batch Runner (USE THIS) ────────────────────────────────
python create_batch_drafts.py                  # Start from beginning
python create_batch_drafts.py --limit 10       # Only do 10 videos (lunch break)
python create_batch_drafts.py --start 25       # Start from video #25
python create_batch_drafts.py --resume         # Pick up where you left off
python create_batch_drafts.py --status         # Progress dashboard with ETA
python create_batch_drafts.py --retry-failed   # Redo any that errored
python create_batch_drafts.py --reset          # Wipe progress, start fresh

# ─── Direct PyAutoGUI (single video testing) ────────────────
python heygen_pyautogui.py --test              # Test with 1 video
python heygen_pyautogui.py --test=3            # Test with 3 videos

# ─── Calibration (if screen/resolution changed) ────────────
python heygen_pyautogui.py --calibrate         # Full recalibration
python heygen_pyautogui.py --remap             # Quick outfit recalibration
```

### Batch Runner Workflow

1. Run `python create_batch_drafts.py` (or `--resume`)
2. Script opens HeyGen editor in your default browser
3. Log in manually (only needed once per session)
4. Press ENTER and **walk away** — PyAutoGUI takes over your mouse
5. **Ctrl+C anytime** to stop — progress is saved after every single video
6. Come back, run `--resume` to continue exactly where you stopped

**Progress tracking:**
- Saved to `output/batch_progress.json` after every video
- `--status` shows a progress bar, ETA, failures, and what's next
- `output/batch_log.txt` has full timestamped log of everything

**Tips for running:**
- At ~2-3 min per video, 84 videos ≈ 3-4 hours
- Do 10-20 per session: `--limit 15` before lunch, `--resume` after
- Or run overnight and let it finish the full batch
- Your mouse/keyboard will be in use — plan accordingly

### Key Files

| File | Purpose |
|------|---------|
| `create_batch_drafts.py` | ⭐ **BATCH RUNNER** - Progress tracking, resume, status dashboard |
| `heygen_pyautogui.py` | ⭐ **VIDEO ENGINE** - PyAutoGUI with calibrated coordinates |
| `output/video_matrix.json` | Master list of all 84 videos with avatar/outfit/background assignments |
| `output/scripts_spoken/*.txt` | Individual script files (one per video, SSML-cleaned) |
| `output/batch_progress.json` | Auto-saved progress tracker (completed/failed video nums) |
| `output/batch_log.txt` | Timestamped log of batch runs |
| `cleanup_scripts.py` | Script quality fixer (acronyms, domain weights, names) |
| `prepare_batch.py` | Converts phase CSVs → video_matrix.json + script files |
| `phase*.csv` | Source scripts in CSV format |

### Video Matrix Format

Each entry in `video_matrix.json`:

```json
{
  "num": 1,
  "id": "CISA-D1-OV-01",
  "topic": "Domain 1 Overview: The IS Audit Process",
  "type": "overview",
  "avatar_id": "Freja",
  "avatar_look": "Freja Look 1",
  "background": "bg_corporate_blue.png",
  "script": "01_Domain_1_Overview_The_IS_Audit_Process_spoken.txt",
  "words": 312,
  "duration_min": 2.1
}
```

### Avatar Pool

| Avatar | Looks Available | Notes |
|--------|-----------------|-------|
| Freja | Look 1 - Look 5 | Female, professional |
| Zosia | Look 1 - Look 5 | Female, professional |
| Esmond | Look 1 - Look 4 | Male, professional |
| Jinwoo | Look 1 - Look 5 | Male, professional |

**Rotation Logic:**
- Avatars cycle: Freja → Zosia → Esmond → Jinwoo → repeat
- Look advances every 4 videos (after cycling through all avatars)
- Background rotates every 4 videos

### Background Pool

| Filename | Description | Grid Position |
|----------|-------------|---------------|
| `bg_executive_dark.png` | Dark navy | Row 1, Col 1 |
| `bg_slate_gray.png` | Gray gradient | Row 1, Col 2 |
| `bg_modern_teal.png` | Teal | Row 1, Col 3 |
| `bg_corporate_blue.png` | Blue gradient | Row 2, Col 1 |

### Coordinate Mapping

Coordinates are stored in `heygen_pyautogui.py`:

```python
# Main UI coordinates
COORDS = {
    "script": (300, 400),          # Script text area
    "avatar_preview": (740, 380),  # Avatar in preview
    "change_avatar": (658, 102),   # Change avatar button
    # ... more coordinates
}

# Outfit grid coordinates (row1_col1 = top-left outfit)
# Same grid positions for all avatars
OUTFIT_COORDS = {
    "Freja Look 1": "outfit_row1_col1",
    "Freja Look 2": "outfit_row1_col2",
    # ... etc
}

# Background grid coordinates
BACKGROUND_COORDS = {
    "bg_executive_dark.png": "bg_row1_col1",
    "bg_slate_gray.png": "bg_row1_col2",
    # ... etc
}
```

### Adding New Videos

1. **Create CSV file** with columns: `ID`, `Title`, `Script` (and optional `Duration`, `Type`)
2. **Add CSV to `CSV_FILES` list** in `prepare_batch.py`
3. **Run prepare_batch.py**:
   ```bash
   python prepare_batch.py          # Append to existing matrix
   python prepare_batch.py --fresh  # Start fresh (replaces all)
   ```
4. **Run heygen_pyautogui.py** to create videos

### Domain Breakdown (Current 84 Videos)

| Domain | Videos | Topics |
|--------|--------|--------|
| D1 - IS Audit Process | 13 | Audit lifecycle, evidence, sampling, SoD |
| D2 - IT Governance | 16 | COBIT, ITIL, ISO, steering committee, KRIs |
| D3 - System Development | 14 | SDLC, Agile/Waterfall, testing, change mgmt |
| D4 - IT Operations | 17 | BCP/DRP, backup, cloud, incident mgmt |
| D5 - Information Assets | 19 | Access control, encryption, database, pen testing |
| EX - Exam Strategy | 5 | Question patterns, traps, time management |

### Troubleshooting

**"Wrong avatar appears" (e.g., Bruce instead of Freja)**
- Check `video_matrix.json` has correct avatar names: `Freja`, `Zosia`, `Esmond`, `Jinwoo`
- These are HeyGen Public Avatars, not custom avatars

**Coordinates are off**
- Run `python heygen_pyautogui.py --calibrate`
- Follow the on-screen instructions to recapture positions

**Script not found**
- Ensure `output/scripts_spoken/` contains matching `.txt` files
- Run `prepare_batch.py` to regenerate if needed

### DON'T USE These Scripts

| Script | Why Not |
|--------|---------|
| `heygen_automation.py` | Older version, unreliable |
| `heygen_automation_v2.py` | Playwright-based — HeyGen's dynamic UI breaks Playwright selectors |

> **Why PyAutoGUI?** HeyGen's editor uses a heavily dynamic React UI with
> shadow DOM, canvas-rendered elements, and likely anti-bot measures. DOM-
> based automation (Playwright/Selenium) can't reliably click UI elements.
> PyAutoGUI drives pixel coordinates like a human — it's the only method
> that works. The tradeoff is your mouse is "in use" while it runs.

---

## Format Rotation Strategy (Batch 2+)

Suggested mix per 10-video batch:
- 4x Format A (Standard) - Core content
- 2x Format C (Showdown) - Comparison topics
- 2x Format D (Walkthrough) - Calculation heavy
- 1x Format B (Myth Buster) - Engagement boost
- 1x Format F (Quick Hit) - Exam prep focus

Adjust based on:
- Completion rate data
- Topic complexity
- Student feedback
