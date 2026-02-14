/**
 * CISA Course Data Index
 * Certified Information Systems Auditor
 *
 * Domains: CISA1 (IS Auditing Process, 21%)
 *          CISA2 (Governance & Management of IT, 16%)
 *          CISA3 (IS Acquisition, Development & Implementation, 18%)
 *          CISA4 (IS Operations & Business Resilience, 20%)
 *          CISA5 (Protection of Information Assets, 25%)
 */

import type { CourseData } from '../../types/courseData';

// Questions
import { CISA_QUESTIONS } from './questions';

// Flashcards
import { allCisaFlashcards } from './flashcards';

// Lessons
import { allCisaLessons } from './lessons';

// Cheat sheets
import { cisaCheatsheets } from './cheatsheets';

/** Standard course data export */
export const COURSE_DATA: CourseData = {
  courseId: 'cisa',
  questions: CISA_QUESTIONS,
  flashcards: allCisaFlashcards,
  lessons: allCisaLessons,
  cheatsheets: Object.values(cisaCheatsheets),
};

// Re-export sub-modules for backward compatibility
export * from './questions';
export * from './flashcards';
export * from './lessons';
export * from './cheatsheets';
