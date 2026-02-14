/**
 * Centralized Content Statistics — Single Source of Truth
 * 
 * ALL content counts (questions, flashcards, lessons) should reference this file.
 * When content is added, update the numbers here and they propagate everywhere:
 * - Landing pages (ExamLandingData.ts)
 * - SEO metadata (useSEO.ts)
 * - Onboarding (OnboardingTour.tsx)
 * - Email templates (functions/index.js) — update manually, can't import TS
 * - index.html meta tags — update manually, static HTML
 * - Stripe product descriptions (scripts/setup-stripe-products.cjs) — update manually
 * 
 * To recount from data files, run: npx tsx scripts/count-content.ts
 * 
 * Last updated: 2026-02-13 (verified via runtime import counter)
 */

import type { CourseId } from '../types/course';

// ============================================================================
// RAW COUNTS (from data files — update after adding content)
// ============================================================================

export interface CourseContentStats {
  /** Actual count of questions in data files */
  questions: number;
  /** Actual count of flashcards in data files */
  flashcards: number;
  /** Actual count of lessons in data files */
  lessons: number;
}

/**
 * Raw content counts per course.
 * Run `npx tsx scripts/count-content.ts` to verify these numbers.
 */
export const COURSE_STATS: Record<CourseId, CourseContentStats> = {
  cpa:  { questions: 5033, flashcards: 609, lessons: 463 },
  ea:   { questions: 2190, flashcards: 451, lessons: 152 },
  cma:  { questions: 2025, flashcards: 491, lessons: 114 },
  cia:  { questions: 1524, flashcards: 557, lessons: 140 },
  cfp:  { questions: 2517, flashcards: 557, lessons: 141 },
  cisa: { questions: 1523, flashcards: 531, lessons: 109 },
};

// ============================================================================
// DERIVED / DISPLAY VALUES
// ============================================================================

/** Total questions across all courses */
export const TOTAL_QUESTIONS = Object.values(COURSE_STATS).reduce(
  (sum, s) => sum + s.questions, 0
);

/** Total flashcards across all courses */
export const TOTAL_FLASHCARDS = Object.values(COURSE_STATS).reduce(
  (sum, s) => sum + s.flashcards, 0
);

/** Total lessons across all courses */
export const TOTAL_LESSONS = Object.values(COURSE_STATS).reduce(
  (sum, s) => sum + s.lessons, 0
);

/**
 * Round down to the nearest hundred and format with commas + "+"
 * e.g., 5411 → "5,400+", 2190 → "2,100+", 1523 → "1,500+"
 */
function formatDisplayCount(n: number): string {
  const rounded = Math.floor(n / 100) * 100;
  return rounded.toLocaleString('en-US') + '+';
}

/**
 * Display-friendly strings for marketing and UI.
 * These are rounded-down to the nearest 100 with "+" suffix.
 */
export interface CourseDisplayStats {
  questions: string;
  flashcards: string;
  lessons: string;
}

export const COURSE_DISPLAY_STATS: Record<CourseId, CourseDisplayStats> = Object.fromEntries(
  (Object.keys(COURSE_STATS) as CourseId[]).map((courseId) => {
    const stats = COURSE_STATS[courseId];
    return [
      courseId,
      {
        questions: formatDisplayCount(stats.questions),
        flashcards: formatDisplayCount(stats.flashcards),
        lessons: formatDisplayCount(stats.lessons),
      },
    ];
  })
) as Record<CourseId, CourseDisplayStats>;

export const TOTAL_DISPLAY = {
  questions: formatDisplayCount(TOTAL_QUESTIONS),
  flashcards: formatDisplayCount(TOTAL_FLASHCARDS),
  lessons: formatDisplayCount(TOTAL_LESSONS),
};

/**
 * Helper to get display stats for a given course.
 */
export function getCourseDisplayStats(courseId: CourseId): CourseDisplayStats {
  return COURSE_DISPLAY_STATS[courseId];
}

/**
 * Helper to get raw stats for a given course.
 */
export function getCourseStats(courseId: CourseId): CourseContentStats {
  return COURSE_STATS[courseId];
}
