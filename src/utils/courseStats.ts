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
  cma: 1954,
  cia: 1500,
  cfp: 2190,
  cisa: 1499,
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
