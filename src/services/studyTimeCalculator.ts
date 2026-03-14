/**
 * Study Time Calculator
 * 
 * Calculates realistic study time estimates based on ACTUAL content
 * rather than arbitrary industry benchmarks.
 * 
 * This ensures study plans are grounded in real data:
 * - Actual lesson durations from our curriculum
 * - Actual question counts with realistic review time
 * - TBS/simulation practice time
 * - Flashcard spaced repetition time
 */

import type { CourseId } from '../types/course';
import logger from '../utils/logger';

// =============================================================================
// TIME CONSTANTS (minutes per activity)
// =============================================================================

/**
 * MCQ time includes:
 * - Reading the question (30 sec)
 * - Thinking and selecting answer (60 sec)
 * - Reading explanation (90 sec for learning mode)
 */
const MCQ_TIME_FIRST_PASS = 3;     // Learning mode: read carefully, study explanation
const MCQ_TIME_REVIEW_PASS = 1.5;  // Review mode: familiar, quick check
const MCQ_TIME_MASTERY_PASS = 1;   // Mastery mode: rapid recall

/**
 * TBS/Simulation time varies by complexity
 */
const TBS_TIME_FIRST_PASS = 20;    // First attempt: learning the format
const TBS_TIME_REVIEW_PASS = 15;   // Review: faster but still thorough

/**
 * Flashcard time with spaced repetition
 * Assumes 6 review sessions for retention
 */
const FLASHCARD_TIME_PER_CARD = 0.5;  // 30 seconds per card per session
const FLASHCARD_REVIEW_SESSIONS = 6;   // Average sessions for long-term retention

/**
 * Mock exam time (full-length practice exam)
 */
const MOCK_EXAM_TIME = 240;  // 4 hours

// =============================================================================
// EXPERIENCE MULTIPLIERS
// =============================================================================

/**
 * Experience affects LESSON time significantly:
 * - Beginners need more time to absorb concepts
 * - Experienced users can skim familiar material
 * - Retakers focus on weak areas only
 * 
 * Experience affects PRACTICE time less:
 * - Everyone benefits from doing questions
 * - But experienced users need fewer repetitions
 */
export interface ExperienceMultipliers {
  lessonMultiplier: number;      // How much longer lessons take
  mcqPassesNeeded: number;       // How many passes through questions
  tbsPassesNeeded: number;       // TBS practice repetitions
  flashcardMultiplier: number;   // Flashcard intensity
}

export const EXPERIENCE_FACTORS: Record<string, ExperienceMultipliers> = {
  'none': {
    lessonMultiplier: 1.5,     // 50% more time: pausing, notes, re-reading
    mcqPassesNeeded: 2.5,      // 2-3 passes through questions
    tbsPassesNeeded: 3,        // Practice TBS multiple times
    flashcardMultiplier: 1.0,  // Full flashcard coverage
  },
  'some': {
    lessonMultiplier: 1.0,     // Standard pace
    mcqPassesNeeded: 2.0,      // 2 passes
    tbsPassesNeeded: 2,        // 2 TBS attempts
    flashcardMultiplier: 0.7,  // Skip familiar terms
  },
  'retake': {
    lessonMultiplier: 0.6,     // Can skim most content
    mcqPassesNeeded: 1.5,      // Focus on weak areas
    tbsPassesNeeded: 2,        // Still practice TBS
    flashcardMultiplier: 0.5,  // Quick review only
  },
};

// =============================================================================
// CONTENT STATS INTERFACE
// =============================================================================

export interface SectionContentStats {
  courseId: CourseId;
  section: string;
  lessonCount: number;
  lessonMinutes: number;         // Total minutes from lesson.duration
  mcqCount: number;
  tbsCount: number;
  flashcardCount: number;
}

export interface StudyTimeEstimate {
  section: string;
  experience: string;
  
  // Breakdown by activity (all in hours)
  lessonHours: number;
  mcqHours: number;
  tbsHours: number;
  flashcardHours: number;
  mockExamHours: number;
  
  // Totals
  totalHours: number;
  totalHoursRange: { min: number; max: number };
  
  // Metadata
  contentStats: SectionContentStats;
  assumptions: string[];
}

// =============================================================================
// CALCULATION FUNCTIONS
// =============================================================================

/**
 * Calculate study time estimate based on actual content
 */
export function calculateStudyTime(
  stats: SectionContentStats,
  experience: 'none' | 'some' | 'retake' = 'some',
  mockExamCount: number = 2
): StudyTimeEstimate {
  const factors = EXPERIENCE_FACTORS[experience];
  
  // 1. Lesson time
  const baseLessonMinutes = stats.lessonMinutes;
  const adjustedLessonMinutes = baseLessonMinutes * factors.lessonMultiplier;
  const lessonHours = adjustedLessonMinutes / 60;
  
  // 2. MCQ time
  // Calculate weighted average time per question based on passes
  const avgTimePerQuestion = calculateMcqAverageTime(factors.mcqPassesNeeded);
  const totalMcqMinutes = stats.mcqCount * avgTimePerQuestion;
  const mcqHours = totalMcqMinutes / 60;
  
  // 3. TBS time
  const tbsMinutesPerAttempt = (TBS_TIME_FIRST_PASS + TBS_TIME_REVIEW_PASS * (factors.tbsPassesNeeded - 1)) / factors.tbsPassesNeeded;
  const totalTbsMinutes = stats.tbsCount * tbsMinutesPerAttempt * factors.tbsPassesNeeded;
  const tbsHours = totalTbsMinutes / 60;
  
  // 4. Flashcard time
  const flashcardMinutes = stats.flashcardCount * FLASHCARD_TIME_PER_CARD * FLASHCARD_REVIEW_SESSIONS * factors.flashcardMultiplier;
  const flashcardHours = flashcardMinutes / 60;
  
  // 5. Mock exams
  const mockExamHours = mockExamCount * (MOCK_EXAM_TIME / 60);
  
  // Total
  const totalHours = Math.round(lessonHours + mcqHours + tbsHours + flashcardHours + mockExamHours);
  
  // Range: ±15% to account for individual variation
  const totalHoursRange = {
    min: Math.round(totalHours * 0.85),
    max: Math.round(totalHours * 1.15),
  };
  
  // Assumptions for transparency
  const assumptions: string[] = [
    `Lesson time: ${Math.round(baseLessonMinutes)} min × ${factors.lessonMultiplier}x = ${Math.round(adjustedLessonMinutes)} min`,
    `MCQ: ${stats.mcqCount} questions × ${factors.mcqPassesNeeded} passes × ${avgTimePerQuestion.toFixed(1)} min avg`,
    `TBS: ${stats.tbsCount} simulations × ${factors.tbsPassesNeeded} attempts`,
    `Flashcards: ${stats.flashcardCount} cards × ${FLASHCARD_REVIEW_SESSIONS} sessions × ${factors.flashcardMultiplier}x`,
    `Mock exams: ${mockExamCount} × 4 hours`,
  ];
  
  return {
    section: stats.section,
    experience,
    lessonHours: Math.round(lessonHours * 10) / 10,
    mcqHours: Math.round(mcqHours * 10) / 10,
    tbsHours: Math.round(tbsHours * 10) / 10,
    flashcardHours: Math.round(flashcardHours * 10) / 10,
    mockExamHours,
    totalHours,
    totalHoursRange,
    contentStats: stats,
    assumptions,
  };
}

/**
 * Calculate weighted average MCQ time based on number of passes
 * First pass takes longer, subsequent passes are faster
 */
function calculateMcqAverageTime(passes: number): number {
  if (passes <= 1) {
    return MCQ_TIME_FIRST_PASS;
  }
  
  // Weight: 40% first pass, 35% review, 25% mastery
  const firstPassWeight = 1;
  const reviewWeight = Math.min(passes - 1, 1);
  const masteryWeight = Math.max(0, passes - 2);
  
  const totalTime = 
    (MCQ_TIME_FIRST_PASS * firstPassWeight) +
    (MCQ_TIME_REVIEW_PASS * reviewWeight) +
    (MCQ_TIME_MASTERY_PASS * masteryWeight);
  
  return totalTime / passes;
}

/**
 * Generate content-based study hours for use in study plans
 * This replaces the hardcoded SECTION_STUDY_HOURS with real calculations
 */
export function getContentBasedStudyHours(
  stats: SectionContentStats,
  experience: 'none' | 'some' | 'retake' = 'some'
): number {
  const estimate = calculateStudyTime(stats, experience);
  return estimate.totalHours;
}

/**
 * Compare content-based estimate with industry standard
 */
export function compareWithIndustryStandard(
  stats: SectionContentStats,
  industryHours: number,
  experience: 'none' | 'some' | 'retake' = 'some'
): {
  contentBased: number;
  industry: number;
  difference: number;
  percentDifference: number;
  recommendation: string;
} {
  const contentBased = getContentBasedStudyHours(stats, experience);
  const difference = contentBased - industryHours;
  const percentDifference = Math.round((difference / industryHours) * 100);
  
  let recommendation: string;
  if (percentDifference > 30) {
    recommendation = 'Content requires significantly more time than industry average. Consider marking some lessons as optional or supplementary.';
  } else if (percentDifference > 10) {
    recommendation = 'Content is comprehensive. Users should plan for slightly more study time.';
  } else if (percentDifference < -20) {
    recommendation = 'Content may need expansion to match industry expectations.';
  } else {
    recommendation = 'Content aligns well with industry study time recommendations.';
  }
  
  return {
    contentBased,
    industry: industryHours,
    difference,
    percentDifference,
    recommendation,
  };
}

/**
 * Log study time analysis for debugging
 */
export function logStudyTimeAnalysis(
  stats: SectionContentStats,
  industryHours: number
): void {
  logger.info(`\n=== Study Time Analysis: ${stats.section} ===`);
  
  for (const exp of ['none', 'some', 'retake'] as const) {
    const estimate = calculateStudyTime(stats, exp);
    const comparison = compareWithIndustryStandard(stats, industryHours, exp);
    
    logger.info(`\n${exp.toUpperCase()} experience:`);
    logger.info(`  Lessons:    ${estimate.lessonHours} hrs`);
    logger.info(`  MCQs:       ${estimate.mcqHours} hrs`);
    logger.info(`  TBS:        ${estimate.tbsHours} hrs`);
    logger.info(`  Flashcards: ${estimate.flashcardHours} hrs`);
    logger.info(`  Mock exams: ${estimate.mockExamHours} hrs`);
    logger.info(`  TOTAL:      ${estimate.totalHours} hrs (${estimate.totalHoursRange.min}-${estimate.totalHoursRange.max})`);
    logger.info(`  vs Industry (${industryHours}h): ${comparison.percentDifference > 0 ? '+' : ''}${comparison.percentDifference}%`);
  }
}
