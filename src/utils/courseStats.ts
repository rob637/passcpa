/**
 * Course-level question statistics
 * ================================
 * SINGLE SOURCE OF TRUTH for question counts across the app.
 * 
 * Update these numbers when adding significant question batches.
 * Used by: Landing page, marketing materials, course cards
 * 
 * To recalculate from actual data:
 * npx tsx -e "
 *   import * as cpa from './src/data/cpa/questions/index';
 *   import * as cma from './src/data/cma/questions/index';
 *   import * as ea from './src/data/ea/questions/index';
 *   import { CFP_QUESTION_STATS } from './src/data/cfp/questions/index';
 *   import { ALL_CIA1_QUESTIONS, ALL_CIA2_QUESTIONS, ALL_CIA3_QUESTIONS } from './src/data/cia/questions/index';
 *   import { CISA_QUESTIONS } from './src/data/cisa/questions/index';
 *   console.log('CPA:', cpa.getQuestionStats().total);
 *   console.log('EA:', ea.EA_QUESTION_COUNTS.Total);
 *   console.log('CMA:', cma.getQuestionStats().total);
 *   console.log('CIA:', ALL_CIA1_QUESTIONS.length + ALL_CIA2_QUESTIONS.length + ALL_CIA3_QUESTIONS.length);
 *   console.log('CFP:', CFP_QUESTION_STATS.total);
 *   console.log('CISA:', CISA_QUESTIONS.length);
 * "
 * 
 * Last updated: 2026-02-09
 */

// ==========================================
// QUESTION COUNTS - UPDATE HERE
// ==========================================
export const QUESTION_COUNTS = {
  cpa: 3197,
  ea: 2190,
  cma: 2025,
  cia: 1524,
  cfp: 2521,
  cisa: 1523,
} as const;

// ==========================================
// FLASHCARD COUNTS
// ==========================================
export const FLASHCARD_COUNTS = {
  cpa: 613,
  ea: 466,
  cma: 506,
  cia: 535,
  cfp: 531,
  cisa: 506,
} as const;

// ==========================================
// LESSON COUNTS
// ==========================================
export const LESSON_COUNTS = {
  cpa: 463,
  ea: 152,
  cma: 114,
  cia: 140,
  cfp: 138,
  cisa: 109,
} as const;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Format a number as "X,XXX+" for marketing display
 */
function formatCount(count: number): string {
  const rounded = Math.floor(count / 100) * 100;
  return rounded.toLocaleString() + '+';
}

/**
 * Get formatted question count for a course
 */
export function getFormattedCount(courseId: string): string {
  const count = QUESTION_COUNTS[courseId as keyof typeof QUESTION_COUNTS];
  return count ? formatCount(count) : '0';
}

/**
 * Get total questions across all courses
 */
export function getTotalQuestions(): number {
  return Object.values(QUESTION_COUNTS).reduce((sum, count) => sum + count, 0);
}

/**
 * Get formatted total
 */
export function getFormattedTotal(): string {
  return formatCount(getTotalQuestions());
}

/**
 * Get total flashcards across all courses
 */
export function getTotalFlashcards(): number {
  return Object.values(FLASHCARD_COUNTS).reduce((sum, count) => sum + count, 0);
}

/**
 * Get total lessons across all courses
 */
export function getTotalLessons(): number {
  return Object.values(LESSON_COUNTS).reduce((sum, count) => sum + count, 0);
}

/**
 * Get all content totals
 */
export function getContentTotals() {
  return {
    questions: getTotalQuestions(),
    flashcards: getTotalFlashcards(),
    lessons: getTotalLessons(),
  };
}
