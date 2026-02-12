# CISA Video Production Master Plan

> **Total Videos:** 83  
> **Total Runtime:** ~15 hours (886 minutes)  
> **Production Status:** Ready for Automation  
> **Last Updated:** February 2026

---

## Presenter Configuration

### Primary Avatar: "Alex" - The IS Auditor

| Setting | Value |
|---------|-------|
| **Avatar Name** | Alex_IT_Auditor |
| **HeyGen Avatar ID** | `avatar_alex_professional_v2` (or select from available) |
| **Voice** | Professional, clear, moderate pace |
| **Voice Speed** | 1.0x (standard) |
| **Tone** | Confident, approachable, exam-focused |

### Visual Identity

| Element | Specification |
|---------|---------------|
| **Background** | Modern office with subtle tech elements - blue/gray tones |
| **Background Style** | Clean, professional, slight depth blur |
| **Outfit** | Navy blue blazer, light blue shirt, no tie (business casual) |
| **Framing** | Shoulders up, centered, slight left positioning for graphics |

### Speaking Style Guidelines

- Direct address to camera ("You will see this on the exam...")
- Use SSML breaks for emphasis: `<break time='1.0s' />`
- Rhetorical questions to engage ("But what does ISACA really mean by governance?")
- Exam tips clearly flagged ("Here's the exam trap...")
- Mnemonics spoken slowly with letter emphasis

---

## Video Numbering System

```
[Domain]-[Type][Number]

Domain Codes:
  D1 = Domain 1: Information Systems Auditing Process
  D2 = Domain 2: Governance and Management of IT
  D3 = Domain 3: Information Systems Acquisition, Development, Implementation
  D4 = Domain 4: Information Systems Operations and Business Resilience
  D5 = Domain 5: Protection of Information Assets
  EX = Exam Preparation (cross-domain)

Type Codes:
  OV = Overview (domain introduction)
  CO = Concept Explainer
  FW = Framework Deep-Dive
  SC = Scenario Walkthrough
  VS = Comparison (X vs Y)
  MA = Memory Aid
  ES = Exam Strategy
```

**Examples:**
- `D1-OV` = Domain 1 Overview
- `D5-CO07` = Domain 5 Concept #7
- `D2-FW02` = Domain 2 Framework #2
- `EX-ES03` = Exam Prep Strategy #3

---

## Production Batches

| Batch | Domain | Videos | Status | CSV File |
|-------|--------|--------|--------|----------|
| 1 | Domain 1: IS Auditing | 12 | Ready | `cisa_d1_batch.csv` |
| 2 | Domain 2: Governance | 13 | Ready | `cisa_d2_batch.csv` |
| 3 | Domain 3: Acquisition | 13 | Ready | `cisa_d3_batch.csv` |
| 4 | Domain 4: Operations | 18 | Ready | `cisa_d4_batch.csv` |
| 5 | Domain 5: Protection | 22 | Ready | `cisa_d5_batch.csv` |
| 6 | Exam Prep | 5 | Ready | `cisa_exam_batch.csv` |

---

## Priority Tiers

### Tier 1 - Launch Critical (20 videos)
Must have for course launch. Core concepts that unlock everything else.

- All 5 Domain Overviews
- All 5 Memory Aid videos (one per domain)
- 5 highest-weight concept videos from D4 and D5
- 5 Scenario walkthroughs

### Tier 2 - Core Content (35 videos)
Build depth in each domain.

- All Framework deep-dives
- Remaining P1 concept videos
- Additional scenarios

### Tier 3 - Complete (28 videos)
Nice-to-have depth for comprehensive coverage.

- P2 concept videos
- Extra comparison videos
- Supplementary exam prep

---

## Visual Asset Templates

### Title Card
```
Background: Deep blue gradient with subtle circuit pattern
Title: Large white text, centered
Subtitle: Smaller light blue text
Logo: Bottom right corner
```

### Concept Diagram
```
Style: Flat vector, 3-4 colors max
Layout: Left-to-right or top-to-bottom flow
Labels: Clear, sans-serif font
Icons: Simple line icons (Lucide style)
```

### Comparison (VS) Visual
```
Split screen: 50/50 or 60/40
Left side: Concept A with color coding
Right side: Concept B with contrasting color
Key differences highlighted in center divide
```

### Memory Aid Visual
```
Large mnemonic letters prominently displayed
Each letter expanded below with brief text
Color coding to distinguish components
Visual icons reinforcing each concept
```

---

## Quality Checklist (Per Video)

- [ ] Script flows naturally when read aloud
- [ ] SSML breaks placed at natural pauses
- [ ] No sentences over 25 words
- [ ] Technical terms explained on first use
- [ ] At least one mnemonic or memory hook
- [ ] Exam tip clearly stated
- [ ] Call to action at end (practice questions)
- [ ] Duration within ±2 minutes of target
- [ ] Visual prompts match script timing

---

## Run Order

For overnight batch processing, run in this order:

1. **cisa_d1_batch.csv** - Foundational auditing concepts
2. **cisa_d5_batch.csv** - Highest exam weight (27%)
3. **cisa_d4_batch.csv** - Second highest weight (23%)
4. **cisa_d2_batch.csv** - Governance frameworks
5. **cisa_d3_batch.csv** - Development lifecycle
6. **cisa_exam_batch.csv** - Final prep content

This prioritizes content by exam weight if processing is interrupted.

---

## Automation Command

```bash
cd content_factory/cisa_videos

# Run all batches sequentially with virtual display
xvfb-run -a python ../orchestrator.py \
  --batches cisa_d1_batch.csv,cisa_d5_batch.csv,cisa_d4_batch.csv,cisa_d2_batch.csv,cisa_d3_batch.csv,cisa_exam_batch.csv \
  --output ./output/ \
  --resume-on-failure
```

Or run individual batches:
```bash
xvfb-run -a python ../heygen_automation_v2.py --input cisa_d1_batch.csv
```
