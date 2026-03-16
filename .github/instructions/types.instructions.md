---
description: "Use when working with TypeScript type definitions, interfaces, or the multi-course type system."
applyTo: "src/types/**"
---
# Type System Standards

## Core Types (src/types/index.ts)
- `Question`, `Lesson`, `TBS`, `WCTask`, `CBQ`, `CaseStudy`
- `UserProfile` — Firestore user document shape
- `Difficulty` — `'easy' | 'medium' | 'hard'` (legacy aliases: `'beginner'`, `'moderate'`, `'tough'`)

## Course Types (src/types/course.ts)
- `CourseId` — `'cpa' | 'cma' | 'ea' | 'cia' | 'cfp' | 'cisa'`
- `Course`, `ExamSectionConfig`, `BlueprintArea`

## Study Plan Types (src/types/studyPlan.ts)
- `StudyPlanSetupInput` — wizard input (has weekdayHours/weekendHours split)
- `StudyPlan`, `StudyPlanWeek` — generated plan structure

## Conventions
- Use `import type` for type-only imports
- Prefix unused parameters with `_`
- Strict mode enabled — no implicit any
