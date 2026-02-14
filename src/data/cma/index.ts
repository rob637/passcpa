/**
 * CMA Course Data Index
 * Certified Management Accountant
 *
 * Parts: CMA1 (Financial Planning, Performance, Analytics)
 *        CMA2 (Strategic Financial Management)
 */

import type { CourseData } from '../../types/courseData';

// Questions
import { CMA_ALL_QUESTIONS } from './questions';

// Flashcards
import { ALL_CMA_FLASHCARDS } from './flashcards';

// Lessons
import { cmaLessons } from './lessons';

// Essays
import { CMA_ESSAYS } from './essays/index';

// CBQs
import { ALL_CMA_CBQS } from './cbq';

// Practice Simulations
import { ALL_PRACTICE_SIMULATIONS } from './practice-simulations';

// Cheat sheets
import { CMA_CHEATSHEETS } from './cheatsheets';

// Mock exams
import { ALL_CMA_MOCK_EXAMS } from './mock-exams';

/** Standard course data export */
export const COURSE_DATA: CourseData = {
  courseId: 'cma',
  questions: CMA_ALL_QUESTIONS,
  flashcards: ALL_CMA_FLASHCARDS,
  lessons: cmaLessons,
  essays: CMA_ESSAYS,
  cbqs: ALL_CMA_CBQS,
  practiceSimulations: ALL_PRACTICE_SIMULATIONS,
  cheatsheets: CMA_CHEATSHEETS,
  mockExams: ALL_CMA_MOCK_EXAMS,
};

// Re-export sub-modules for backward compatibility
export * from './questions';
export * from './flashcards';
export * from './lessons';
export { CMA1_ALL_ESSAYS, CMA2_ALL_ESSAYS, CMA_ESSAYS, getEssaysByPart } from './essays/index';
export { CMA1_CBQS, CMA2_CBQS, ALL_CMA_CBQS, getCBQsBySection, getCBQsByBlueprintArea, getCBQById } from './cbq';
export * from './cheatsheets';
