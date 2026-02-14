/**
 * CourseData — Standard interface for all course data modules.
 *
 * Every course's `src/data/{course}/index.ts` MUST export a `COURSE_DATA`
 * object conforming to this interface. This ensures:
 * 1. Consistent access pattern across all 6+ courses
 * 2. A single import for the runtime content counter
 * 3. Type-safe access to content arrays for stats, landing pages, etc.
 *
 * Usage:
 *   import { COURSE_DATA } from '../data/cpa';
 *   console.log(COURSE_DATA.questions.length);
 *
 * All content arrays use `unknown[]` because flashcard/lesson types differ
 * per course. For type-safe access to specific content, import from the
 * course's sub-modules directly (e.g., `from '../data/cpa/questions'`).
 */

import type { CourseId } from './course';

export interface CourseData {
  /** Course identifier */
  courseId: CourseId;

  // ── Required (every course) ────────────────────────────────────────

  /** All MCQ questions */
  questions: unknown[];

  /** All flashcards */
  flashcards: unknown[];

  /** All lessons */
  lessons: unknown[];

  // ── Optional (course-specific content types) ───────────────────────

  /** Task-Based Simulations (CPA only) */
  tbs?: unknown[];

  /** Essay / Written Communication tasks (CMA only) */
  essays?: unknown[];

  /** Case-Based Questions (CMA only) */
  cbqs?: unknown[];

  /** Practice simulations (CMA only) */
  practiceSimulations?: unknown[];

  /** Case studies (CFP only) */
  caseStudies?: unknown[];

  /** Item sets (CFP only) */
  itemSets?: unknown[];

  /** Calculator problems (CFP only) */
  calculatorProblems?: unknown[];

  /** Cheat sheets / study aids */
  cheatsheets?: unknown[];

  /** Mock exam configs or static exams */
  mockExams?: unknown[];
}
