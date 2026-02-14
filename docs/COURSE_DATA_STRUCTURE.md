# Course Data Directory Structure

> Canonical reference for organizing course content in `src/data/{course}/`.
> Follow this guide when adding new courses or content types.

---

## Quick Start — Adding a New Course

1. Create `src/data/{course}/` with the required directories below.
2. Create `src/data/{course}/index.ts` exporting `COURSE_DATA: CourseData`.
3. Register the course in `src/courses/index.ts` and `src/types/course.ts`.
4. Add a feature flag in `src/config/featureFlags.ts`.
5. Run `npx tsc --noEmit` to verify.
6. Run `npx tsx scripts/count-content.ts` to update stats.

---

## Directory Layout

Every course lives under `src/data/{course}/` where `{course}` is the lowercase `CourseId` (e.g., `cpa`, `ea`, `cma`, `cia`, `cfp`, `cisa`).

### Required Directories (every course)

| Directory | Contents | Notes |
|-----------|----------|-------|
| `questions/` | MCQ question banks | Section-specific files, aggregated by `index.ts` |
| `flashcards/` | Flashcard decks | Section-specific files |
| `lessons/` | Lesson content | Section-specific files |
| `cheatsheets/` | Quick-reference cheatsheets | Section-specific files |
| `mock-exams/` | Full-length mock exam definitions | Exam configs + question selections |
| `references/` | Markdown reference docs | `.md` files, not imported in code |
| `study-materials/` | Supplemental study content | `.md` files, tips, guides |

### Optional Directories (exam-specific)

Add these only when the exam format requires them:

| Directory | Used By | Purpose |
|-----------|---------|---------|
| `tbs/` | CPA | Task-Based Simulations |
| `essays/` | CMA | Written Communication Tasks (WCTask) |
| `cbq/` | CMA | Case-Based Questions |
| `practice-simulations/` | CMA | Practice simulation scenarios |
| `case-studies/` | CFP | Multi-part case study problems |
| `item-sets/` | CFP | Item set questions |
| `calculator-problems/` | CFP | Calculator-based problems |
| `formulas/` | CFP | Formula reference sheets |
| `quick-reference/` | CFP | Quick-reference guides |
| `why-wrong/` | CFP | "Why wrong" explanations |
| `glossary/` | CIA, CISA | Term glossaries |
| `standards/` | CIA, CISA | Professional standards reference |
| `reference-data/` | EA | TypeScript data files (form guides, penalty tables, etc.) |

---

## Naming Conventions

### Directories

- **Always kebab-case**: `mock-exams/`, `case-studies/`, `reference-data/`
- **Never camelCase**: ~~`mockExams/`~~, ~~`caseStudies/`~~
- **Never PascalCase**: ~~`MockExams/`~~

### Files

Content files are hidden behind `index.ts` aggregators, so internal file naming is flexible. However, new files should follow this pattern:

```
{section}-{type}-batch{N}.ts
```

**Examples:**
```
far-questions-batch1.ts
see1-flashcards-batch1.ts
cisa3-questions-batch2.ts
cma1-essays-batch1.ts
```

**Rules:**
- Lowercase section prefix matching the exam section code
- Descriptive type suffix
- Batch number for large content sets
- `.ts` extension (TypeScript)

### Exports

- **File-level exports**: `UPPER_SNAKE_CASE` arrays
  ```typescript
  export const FAR_QUESTIONS_BATCH1: Question[] = [...]
  export const SEE1_FLASHCARDS: Flashcard[] = [...]
  ```

- **Aggregator exports** (in `index.ts`): Combine all batches
  ```typescript
  export const FAR_QUESTIONS = [...FAR_QUESTIONS_BATCH1, ...FAR_QUESTIONS_BATCH2]
  ```

---

## The `index.ts` Pattern

Every directory **must** have an `index.ts` that aggregates and re-exports its contents.

### Directory-level `index.ts`

```typescript
// src/data/{course}/questions/index.ts
import { SECTION1_QUESTIONS_BATCH1 } from './section1-questions-batch1';
import { SECTION1_QUESTIONS_BATCH2 } from './section1-questions-batch2';

export const SECTION1_QUESTIONS = [
  ...SECTION1_QUESTIONS_BATCH1,
  ...SECTION1_QUESTIONS_BATCH2,
];

export const ALL_QUESTIONS = [
  ...SECTION1_QUESTIONS,
  ...SECTION2_QUESTIONS,
];
```

### Course-level `index.ts`

Every course must export a `COURSE_DATA` object conforming to the `CourseData` interface:

```typescript
// src/data/{course}/index.ts
import type { CourseData } from '../../types/courseData';
import { ALL_QUESTIONS } from './questions';
import { ALL_FLASHCARDS } from './flashcards';
import { ALL_LESSONS } from './lessons';
import { ALL_CHEATSHEETS } from './cheatsheets';
import { MOCK_EXAMS } from './mock-exams';

export const COURSE_DATA: CourseData = {
  courseId: '{course}',
  questions: ALL_QUESTIONS,
  flashcards: ALL_FLASHCARDS,
  lessons: ALL_LESSONS,
  cheatsheets: ALL_CHEATSHEETS,
  mockExams: MOCK_EXAMS,
  // Optional fields as needed:
  // tbs: ALL_TBS,
  // essays: ALL_ESSAYS,
  // cbqs: ALL_CBQS,
};

// Re-export for direct imports
export * from './questions';
export * from './flashcards';
export * from './lessons';
```

---

## CourseData Interface

Defined in `src/types/courseData.ts`:

```typescript
export interface CourseData {
  courseId: string;
  questions: unknown[];
  flashcards: unknown[];
  lessons: unknown[];
  cheatsheets?: unknown[];
  tbs?: unknown[];
  essays?: unknown[];
  cbqs?: unknown[];
  practiceSimulations?: unknown[];
  caseStudies?: unknown[];
  itemSets?: unknown[];
  calculatorProblems?: unknown[];
  mockExams?: unknown[];
}
```

---

## Current Course Matrix

| Directory | CPA | EA | CMA | CIA | CFP | CISA |
|-----------|:---:|:--:|:---:|:---:|:---:|:----:|
| `questions/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `flashcards/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `lessons/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `cheatsheets/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `mock-exams/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `references/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `study-materials/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `tbs/` | ✓ | | | | | |
| `essays/` | | | ✓ | | | |
| `cbq/` | | | ✓ | | | |
| `practice-simulations/` | | | ✓ | | | |
| `case-studies/` | | | | | ✓ | |
| `item-sets/` | | | | | ✓ | |
| `calculator-problems/` | | | | | ✓ | |
| `formulas/` | | | | | ✓ | |
| `quick-reference/` | | | | | ✓ | |
| `why-wrong/` | | | | | ✓ | |
| `glossary/` | | | | ✓ | | ✓ |
| `standards/` | | | | ✓ | | ✓ |
| `reference-data/` | | ✓ | | | | |

---

## Content Stats Pipeline

After adding or modifying content:

1. **Count content**: `npx tsx scripts/count-content.ts`
2. **Update stats**: Edit `src/config/contentStats.ts` with new counts
3. **Verify build**: `npx tsc --noEmit`

The `contentStats.ts` file provides `COURSE_STATS`, `COURSE_DISPLAY_STATS`, and `TOTAL_DISPLAY` which are consumed by landing pages, SEO metadata, onboarding, and marketing copy throughout the app.

---

## Checklist for New Courses

- [ ] Create `src/data/{course}/` with all required directories
- [ ] Create `index.ts` in each directory with proper aggregation
- [ ] Create course-level `index.ts` exporting `COURSE_DATA: CourseData`
- [ ] Add `CourseId` to `src/types/course.ts`
- [ ] Add course config to `src/courses/{course}/config.ts`
- [ ] Register in `src/courses/index.ts`
- [ ] Add feature flag in `src/config/featureFlags.ts`
- [ ] Add progress hook: `src/hooks/use{COURSE}Progress.ts`
- [ ] Add services: `{course}AdaptiveEngine.ts`, `{course}ProgressService.ts`, `{course}ScorePredictor.ts`
- [ ] Run `npx tsx scripts/count-content.ts` and update `contentStats.ts`
- [ ] Run `npx tsc --noEmit` — zero new errors
- [ ] Update this document's Course Matrix table
