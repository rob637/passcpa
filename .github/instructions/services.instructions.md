---
description: "Use when creating or modifying service files, business logic, adaptive engines, progress services, or score predictors."
applyTo: "src/services/**"
---
# Service Layer Standards

- Services handle all Firebase/API interactions — components should not call Firestore directly
- Per-course naming: `{course}AdaptiveEngine.ts`, `{course}ProgressService.ts`, `{course}ScorePredictor.ts`
- Use `logger` from `src/utils/logger.ts` for all logging

## Key Services
- `contentRegistry.ts` — Single source of truth for content counts (lessons, questions, flashcards per section)
- `studyPlanService.ts` — Study plan roadmap generation (System A)
- `dailyPlanService.ts` — Adaptive daily plan generation (System B), reads from System A
- `dailyPlanPersistence.ts` — Firestore persistence for daily plans

## Phase Naming
- studyPlanService uses hyphenated: `'foundation'`, `'core-study'`, `'final-review'`, `'exam-week'`
- dailyPlanService uses camelCase: `'foundation'`, `'coreStudy'`, `'finalReview'`, `'examWeek'`
- Mapping lives in `STUDY_PLAN_PHASE_MAP` in dailyPlanService

## Firestore Paths
- `users/{uid}` — User profiles
- `users/{uid}/studyPlans/{courseId}_{section}` — Study plans
- `users/{uid}/dailyLogs/{date}` — Daily activity
- `users/{uid}/questionHistory/{qId}` — Per-question performance
