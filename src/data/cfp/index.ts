/**
 * CFP Course Data Index
 * Certified Financial Planner
 *
 * Sections: General Principles, Investments, Tax, Retirement,
 *           Estate, Risk/Insurance, Professional, Psychology
 */

import type { CourseData } from '../../types/courseData';

// Questions
import { CFP_QUESTIONS_ALL } from './questions';

// Flashcards
import { CFP_FLASHCARDS } from './flashcards';

// Lessons
import { ALL_CFP_LESSONS } from './lessons';

// Case Studies
import { CFP_CASE_STUDIES } from './case-studies';

// Item Sets
import { CFP_ITEM_SETS } from './item-sets';

// Calculator Problems
import { ALL_CALCULATOR_PROBLEMS } from './calculator-problems';

// Cheat sheets
import { CFP_CHEATSHEETS } from './cheatsheets';

// Mock exams
import { CFP_MOCK_EXAMS } from './mock-exams';

/** Standard course data export */
export const COURSE_DATA: CourseData = {
  courseId: 'cfp',
  questions: CFP_QUESTIONS_ALL,
  flashcards: CFP_FLASHCARDS,
  lessons: ALL_CFP_LESSONS,
  caseStudies: CFP_CASE_STUDIES,
  itemSets: CFP_ITEM_SETS,
  calculatorProblems: ALL_CALCULATOR_PROBLEMS,
  cheatsheets: CFP_CHEATSHEETS,
  mockExams: CFP_MOCK_EXAMS,
};

// Re-export sub-modules for backward compatibility
export * from './questions';
export * from './flashcards';
export * from './lessons';
export * from './case-studies';
export * from './item-sets';
export * from './cheatsheets';
