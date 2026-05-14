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

// TBS
import { ALL_TBS } from './tbs';

// Cheat sheets
import { CPA_CHEATSHEETS } from './cheatsheets';

// Mock exams
import { ALL_MOCK_EXAMS } from './mock-exams';

/** Standard course data export */
export const COURSE_DATA: CourseData = {
  courseId: 'cpa',
  flashcards: CPA_FLASHCARDS,
  lessons: getAllLessons(),
  tbs: ALL_TBS,
  cheatsheets: CPA_CHEATSHEETS,
  mockExams: Object.values(ALL_MOCK_EXAMS).flat(),
};

// Re-export sub-modules for backward compatibility.
// `./questions` is NOT re-exported here — re-exporting it would pull all
// section JSONs into this module's chunk, defeating per-section lazy loading.
// Importers that need the legacy ALL_QUESTIONS / FAR_ALL etc. should
// `import` from './questions' directly (it stays a separate dynamic chunk).
export * from './flashcards';
export * from './lessons';
export * from './tbs';
export * from './cheatsheets';
