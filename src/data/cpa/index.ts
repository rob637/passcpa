/**
 * CPA Course Data Index
 * Certified Public Accountant
 *
 * Sections: FAR, AUD, REG (Core) + BAR, ISC, TCP (Disciplines)
 * BEC retired December 15, 2023 — content migrated to relevant sections.
 */

import type { CourseData } from '../../types/courseData';

// Questions
import { ALL_QUESTIONS } from './questions';

// Flashcards
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
  questions: ALL_QUESTIONS,
  flashcards: CPA_FLASHCARDS,
  lessons: getAllLessons(),
  tbs: ALL_TBS,
  cheatsheets: CPA_CHEATSHEETS,
  mockExams: Object.values(ALL_MOCK_EXAMS).flat(),
};

// Re-export sub-modules for backward compatibility
export * from './questions';
export * from './flashcards';
export * from './lessons';
export * from './tbs';
export * from './cheatsheets';
