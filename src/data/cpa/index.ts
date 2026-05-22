/**
 * CPA Course Data Index
 * Certified Public Accountant
 *
 * Sections: FAR, AUD, REG (Core) + BAR, ISC, TCP (Disciplines)
 * BEC retired December 15, 2023 — content migrated to relevant sections.
 */

import type { CourseData } from '../../types/courseData';

// NOTE: Questions are NOT eagerly imported. The `questions` field on
// COURSE_DATA is intentionally omitted so each section's JSON loads as
// its own dynamic chunk via `loadSectionQuestions()` in courseDataLoader.
// Admin/audit code that needs the full bank can `import('./questions')`
// directly — that path remains intact via the questions sub-module.

// Flashcards (from JSON)
import { CPA_FLASHCARDS } from './flashcards';

// Lessons
import { getAllLessons } from './lessons';

// NOTE: TBS bank (~743 KB) is NOT eagerly imported here. It loads on demand
// via `tbsService.fetchTBSBySection()` / dynamic `import('./tbs')`. Pulling
// ALL_TBS into COURSE_DATA would inflate every CPA data load by ~743 KB even
// for users on lesson/flashcard routes that don't touch TBS.

// Cheat sheets
import { CPA_CHEATSHEETS } from './cheatsheets';

// Mock exam blueprint configs only (heavy data deps inside mock-exams are now
// dynamically imported by the loader helpers \u2014 see ./mock-exams/index.ts).
import { ALL_MOCK_EXAMS } from './mock-exams';

/** Standard course data export */
export const COURSE_DATA: CourseData = {
  courseId: 'cpa',
  flashcards: CPA_FLASHCARDS,
  lessons: getAllLessons(),
  cheatsheets: CPA_CHEATSHEETS,
  mockExams: Object.values(ALL_MOCK_EXAMS).flat(),
};

// Re-export sub-modules for backward compatibility.
// `./questions` and `./tbs` are NOT re-exported here \u2014 re-exporting them
// would pull all section JSONs / TBS data into this module's chunk,
// defeating per-section lazy loading. Importers that need the legacy
// ALL_QUESTIONS / FAR_ALL / ALL_TBS exports should `import` from
// './questions' or './tbs' directly (each stays a separate dynamic chunk).
export * from './flashcards';
export * from './lessons';
export * from './cheatsheets';
