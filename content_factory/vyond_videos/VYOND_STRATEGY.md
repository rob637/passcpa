# Vyond Video Production Strategy
## VoraPrep Animated Training Videos

---

## Executive Summary

**Goal:** Fully automated video production. Input content → Output video. Zero manual work.

**Solution:** Vyond Go API + content generation pipeline

**Timeline:**
- Phase 1 (Now): Semi-automated with copy-paste TTS
- Phase 2 (1 month): Template-based generation
- Phase 3 (2-3 months): Full API automation

---

## THE VISION: FULL AUTOMATION

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTOMATED PIPELINE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   src/data/ea/lessons/see2.ts                               │
│              │                                               │
│              ▼                                               │
│   ┌──────────────────────┐                                  │
│   │  Content Extractor   │  (Python script)                 │
│   │  - Topics            │                                  │
│   │  - Key points        │                                  │
│   │  - Examples          │                                  │
│   └──────────┬───────────┘                                  │
│              │                                               │
│              ▼                                               │
│   ┌──────────────────────┐                                  │
│   │  Script Generator    │  (Claude API)                    │
│   │  - TTS-ready script  │                                  │
│   │  - On-screen text    │                                  │
│   │  - Scene structure   │                                  │
│   └──────────┬───────────┘                                  │
│              │                                               │
│              ▼                                               │
│   ┌──────────────────────┐                                  │
│   │  Vyond Go API        │  (REST API)                      │
│   │  - Create scenes     │                                  │
│   │  - Add TTS audio     │                                  │
│   │  - Render video      │                                  │
│   └──────────┬───────────┘                                  │
│              │                                               │
│              ▼                                               │
│   ┌──────────────────────┐                                  │
│   │  Firebase Upload     │                                  │
│   │  - CDN storage       │                                  │
│   │  - Lesson linkage    │                                  │
│   └──────────────────────┘                                  │
│                                                              │
│   INPUT: Topic name                                          │
│   OUTPUT: Published video linked to lesson                   │
│   HUMAN EFFORT: Zero                                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. VYOND vs. HEYGEN COMPARISON

| Aspect | HeyGen (Current) | Vyond (Proposed) |
|--------|------------------|------------------|
| **Visual Style** | Realistic AI avatars | Animated characters |
| **Best For** | Talking head videos, instructor presence | Complex explanations, diagrams, processes |
| **Animation** | Limited to avatar gestures | Full scene control, object animations |
| **Diagrams** | Must be pre-made graphics | Can animate charts, flows, numbers |
| **Cost** | Per-video credit model | Subscription unlimited renders |
| **API** | REST API available | REST API available (Vyond Go/API) |
| **Automation Difficulty** | Medium (you've solved this) | Medium-High (more parameters) |

### Recommendation: Use Both

| Video Type | Platform |
|------------|----------|
| Welcome/motivation videos | HeyGen (human presence) |
| Concept explanations with visuals | Vyond |
| Formula walkthroughs | Vyond |
| Case study breakdowns | Vyond |
| Exam tips/strategy | HeyGen |
| Step-by-step calculations | Vyond |

**For S Corp Basis specifically:** Vyond is ideal because:
- Numbers can animate (basis going up/down)
- Ordering rules can be shown as flowcharts
- Formulas can build step-by-step
- T-accounts and spreadsheets can fill in real-time

---

## 2. VYOND VIDEO ANATOMY

### Scene Types to Leverage

```
1. WHITEBOARD SCENE
   - Character writing/pointing
   - Text appearing as if being written
   - Perfect for: formulas, definitions

2. CONTEMPORARY SCENE
   - Modern office/professional settings
   - Characters presenting to "camera"
   - Perfect for: introductions, summaries

3. INFOGRAPHIC SCENE
   - Charts, graphs, data visualization
   - Numbers animating
   - Perfect for: calculations, comparisons

4. SPLIT-SCREEN
   - Two concepts side by side
   - Perfect for: stock vs debt basis, before/after
```

### Character Strategy

Recommend 4-6 recurring characters across courses:
- **Tax Expert** - Business casual, glasses (EA, CPA-REG)
- **Accountant** - Professional, energetic (CPA-FAR, CMA)
- **Auditor** - Formal, trustworthy (CPA-AUD, CIA)
- **Tech Specialist** - Modern, casual (CISA)
- **Financial Advisor** - Warm, approachable (CFP)

---

## 3. CONTENT-TO-VIDEO PIPELINE

### Phase 1: Content Extraction (Automated)

```
Source Data:
  src/data/ea/lessons/see2.ts
         ↓
Extract:
  • Topics
  • Key concepts
  • Formulas
  • Examples
  • Memory aids
         ↓
Output:
  content_factory/vyond_videos/{topic}/content.json
```

### Phase 2: Script Generation (AI-Assisted)

```
content.json + template
         ↓
Claude/GPT-4 generates:
  • Slide deck (Markdown)
  • Narration script (with SSML)
  • Visual direction notes
         ↓
Human review + edit
         ↓
Final: slide_deck.md, narration_script.md
```

### Phase 3: Vyond Build (Semi-Automated)

```
Option A: Vyond Studio (Manual)
  - Use slide deck as storyboard
  - Build in Vyond interface
  - Record/upload narration

Option B: Vyond API (Automated) ← Target for Engine
  - POST scene definitions via API
  - Programmatic asset placement
  - TTS or upload audio
  - Batch render multiple videos
```

---

## 4. VYOND API INTEGRATION ARCHITECTURE

### API Capabilities (Vyond Go)

```javascript
// Vyond API structure (conceptual)
{
  "project": {
    "name": "S Corp Shareholder Basis",
    "resolution": "1080p",
    "aspectRatio": "16:9"
  },
  "scenes": [
    {
      "id": "scene-1",
      "template": "whiteboard",
      "duration": 15000, // milliseconds
      "elements": [
        {
          "type": "character",
          "characterId": "business-female-01",
          "action": "presenting",
          "position": { "x": 100, "y": 300 }
        },
        {
          "type": "text",
          "content": "S Corporation Shareholder Basis",
          "animation": "typewriter",
          "startTime": 1000
        }
      ],
      "audio": {
        "type": "tts", // or "upload"
        "text": "If there's one topic that trips up EA candidates...",
        "voice": "en-US-professional-female"
      }
    }
  ]
}
```

### Proposed Engine Structure

```
content_factory/
├── vyond_videos/
│   ├── engine/
│   │   ├── vyond_client.py        # API wrapper
│   │   ├── template_mapper.py     # Content → Vyond scenes
│   │   ├── batch_runner.py        # Multi-video orchestration
│   │   └── config.py              # API keys, templates
│   ├── templates/
│   │   ├── title_scene.json       # Reusable scene templates
│   │   ├── formula_scene.json
│   │   ├── example_scene.json
│   │   └── memory_aid_scene.json
│   └── {course}_{topic}/
│       ├── content.json           # Extracted content
│       ├── slide_deck.md          # Human-readable storyboard
│       ├── narration_script.md    # TTS-ready script
│       ├── vyond_project.json     # API payload
│       └── output/
│           └── video.mp4
```

---

## 5. VIDEO PRODUCTION WORKFLOW

### Manual Workflow (Phase 1 - Current)

```
Week 1: Content Selection
  └── Identify 5-10 hard topics per course
  └── Prioritize by: exam weight, student struggle areas, visual potential

Week 2-3: Script Development  
  └── Create slide deck (like the S Corp Basis example)
  └── Write narration script with SSML
  └── Internal review for accuracy

Week 4: Vyond Production
  └── Build scenes in Vyond Studio
  └── Upload/generate audio
  └── Add transitions, timing, polish

Week 5: QA + Integration
  └── Review for accuracy, pacing
  └── Export at multiple resolutions
  └── Upload to CDN (Firebase Storage)
  └── Link to lessons in database
```

### Automated Workflow (Phase 2 - Target)

```python
# Conceptual batch runner
def produce_video_batch(topics: list[str], course: str):
    for topic in topics:
        # 1. Extract content from lesson data
        content = extract_lesson_content(course, topic)
        
        # 2. Generate script via AI
        script = generate_script_with_claude(content)
        
        # 3. Map to Vyond scenes
        vyond_project = map_to_vyond_scenes(script)
        
        # 4. Submit to Vyond API
        render_job = vyond_api.create_project(vyond_project)
        
        # 5. Poll for completion
        video_url = vyond_api.wait_for_render(render_job.id)
        
        # 6. Upload to Firebase Storage
        upload_to_storage(video_url, f"{course}/videos/{topic}.mp4")
        
        # 7. Update lesson with video reference
        update_lesson_video_url(course, topic, video_url)
```

---

## 6. VIDEO LENGTH GUIDELINES

| Topic Complexity | Duration | Slide Count |
|------------------|----------|-------------|
| Simple concept | 3-4 min | 6-8 slides |
| Medium concept | 5-6 min | 10-12 slides |
| Complex (like S Corp Basis) | 7-8 min | 14-16 slides |
| Deep dive | 10-12 min | 18-22 slides |

### Content Per Minute Benchmarks
- Speaking rate: ~130-150 words/minute (for learning content)
- ~3-4 visual changes per minute
- ~1 major concept every 2 minutes

---

## 7. PRIORITY TOPICS FOR VYOND (EA Course)

Based on difficulty and visual explanability:

| Priority | Topic | Section | Why Vyond Works |
|----------|-------|---------|-----------------|
| 1 | S Corp Shareholder Basis | SEE2 | Numbers, ordering rules, flowcharts |
| 2 | Partnership Distributions | SEE2 | Hot assets, basis reduction visuals |
| 3 | Depreciation Recapture (§1245/1250) | SEE2 | Comparison charts, recapture math |
| 4 | At-Risk & Passive Activity Limits | SEE2 | Stacked limitation visualization |
| 5 | AMT for Individuals | SEE1 | Parallel calculation system |
| 6 | Capital Gains Netting | SEE1 | Net gains/losses flowing through |
| 7 | Estate/Gift Basis Rules | SEE1 | Decision trees, FMV vs carryover |
| 8 | Circular 230 Penalties | SEE3 | Dollar amounts, sanctions matrix |
| 9 | Collection Due Process | SEE3 | Timeline, CDP hearing flowchart |
| 10 | Net Operating Losses | SEE2 | Carryforward tracking, 80% limit |

---

## 8. INTEGRATION WITH VORAPREP

### Database Schema Addition

```typescript
// Addition to Lesson type
interface Lesson {
  // ... existing fields
  videos?: VideoResource[];
}

interface VideoResource {
  id: string;
  platform: 'vyond' | 'heygen' | 'youtube';
  url: string;
  duration: number;        // seconds
  thumbnailUrl?: string;
  captions?: {
    en: string;            // VTT file URL
  };
  chapters?: VideoChapter[];
}

interface VideoChapter {
  title: string;
  startTime: number;       // seconds
  endTime: number;
}
```

### UI Integration Points

1. **Lesson page** - Video player at top (before text content)
2. **Study journey** - Video milestones as progress markers
3. **Mobile app** - Downloadable videos for offline viewing
4. **Search** - Videos searchable by topic/transcript

---

## 9. COST ANALYSIS

### Vyond Pricing (Business Plan)

- **$89/month/seat** (annual billing)
- Unlimited video exports
- API access requires Enterprise

### Production Costs per Video

| Element | Manual | Automated |
|---------|--------|-----------|
| Content extraction | 15 min | ~0 (automated) |
| Script writing | 2-3 hours | 30 min (AI + review) |
| Vyond production | 3-4 hours | ~0 (API) |
| QA/Polish | 1 hour | 30 min |
| **Total** | **6-8 hours** | **1 hour** |

### ROI Projection

- 100 topics × 6 hours = 600 hours manual
- 100 topics × 1 hour = 100 hours automated
- **Savings: 500 hours = ~$25,000** (at $50/hr)

---

## 10. NEXT STEPS

### Immediate (This Week)
1. ✅ Create first complete slide deck (S Corp Basis - DONE)
2. ✅ Create narration script with SSML (DONE)
3. Build video manually in Vyond Studio
4. Validate quality/approach

### Short-Term (1-2 Weeks)
1. Create 5 more slide decks for priority topics
2. Establish Vyond account (Business plan)
3. Document Vyond scene templates
4. Build basic content extraction script

### Medium-Term (1 Month)
1. Complete 10 EA videos manually
2. Develop Vyond API integration (if Enterprise)
3. Build semi-automated batch runner
4. Integrate videos into lesson pages

### Long-Term (3 Months)
1. Scale to 50+ videos per course
2. Full automation pipeline
3. A/B test video vs. text-only learning outcomes
4. Expand to all 6 courses

---

## APPENDIX: RESOURCES

### Vyond
- [Vyond API Documentation](https://www.vyond.com/api)
- [Vyond Studio Templates](https://www.vyond.com/templates)
- [Vyond Character Gallery](https://www.vyond.com/characters)

### Reference Videos (Quality Benchmarks)
- Khan Academy animated explainers
- TED-Ed lessons
- CrashCourse videos

### Tools
- [Descript](https://www.descript.com) - Audio editing, auto-transcription
- [Canva](https://www.canva.com) - Supplementary graphics
- [Lottie](https://lottiefiles.com) - Animation assets
