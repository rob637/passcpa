---
description: "Use when working with course configuration, course registry, feature flags, or adding new exam courses."
applyTo: "src/courses/**"
---
# Multi-Course Architecture

## Course Registry (`src/courses/index.ts`)
- Single source of truth for all course metadata
- Each course: sections, blueprint areas, weighting, pricing, features, exam format
- Feature flags control availability: `ENABLE_EA_COURSE`, `ENABLE_CMA_COURSE`, etc.

## Per-Course Pattern
1. Config: `src/courses/{course}/config.ts`
2. Data: `src/data/{course}/`
3. Services: `src/services/{course}AdaptiveEngine.ts`, `{course}ProgressService.ts`, `{course}ScorePredictor.ts`
4. Hooks: `src/hooks/use{COURSE}Progress.ts`

## Exam Sections
| Exam | Sections |
|------|----------|
| CPA | FAR, AUD, REG + BAR/ISC/TCP (pick 1) |
| EA | SEE1, SEE2, SEE3 |
| CMA | CMA1, CMA2 |
| CIA | CIA1, CIA2, CIA3 |
| CISA | CISA1–CISA5 (full-exam) |
| CFP | 8 sections (full-exam) |

## Content Registry (`src/services/contentRegistry.ts`)
- Single source of truth for content counts (lessons, questions, flashcards per section)
- Used by studyPlanService to auto-fill plan generation
