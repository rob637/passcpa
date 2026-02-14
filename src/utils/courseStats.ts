/**
 * Course-level content statistics (re-exported from contentStats.ts)
 * ==================================================================
 * This file re-exports from src/config/contentStats.ts which is the
 * SINGLE SOURCE OF TRUTH. Do NOT add hardcoded numbers here.
 * 
 * Used by: VoraPrep.tsx (homepage), marketing materials, course cards
 */

import { COURSE_STATS } from '../config/contentStats';

// ==========================================
// QUESTION COUNTS — derived from contentStats
// ==========================================
export const QUESTION_COUNTS = {
  cpa: COURSE_STATS.cpa.questions,
  ea: COURSE_STATS.ea.questions,
  cma: COURSE_STATS.cma.questions,
  cia: COURSE_STATS.cia.questions,
  cfp: COURSE_STATS.cfp.questions,
  cisa: COURSE_STATS.cisa.questions,
} as const;

// ==========================================
// FLASHCARD COUNTS — derived from contentStats
// ==========================================
export const FLASHCARD_COUNTS = {
  cpa: COURSE_STATS.cpa.flashcards,
  ea: COURSE_STATS.ea.flashcards,
  cma: COURSE_STATS.cma.flashcards,
  cia: COURSE_STATS.cia.flashcards,
  cfp: COURSE_STATS.cfp.flashcards,
  cisa: COURSE_STATS.cisa.flashcards,
} as const;

// ==========================================
// LESSON COUNTS — derived from contentStats
// ==========================================
export const LESSON_COUNTS = {
  cpa: COURSE_STATS.cpa.lessons,
  ea: COURSE_STATS.ea.lessons,
  cma: COURSE_STATS.cma.lessons,
  cia: COURSE_STATS.cia.lessons,
  cfp: COURSE_STATS.cfp.lessons,
  cisa: COURSE_STATS.cisa.lessons,
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
