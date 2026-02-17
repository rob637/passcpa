/**
 * Unified Adaptive Engine Adapter
 *
 * Provides a consistent interface for all 6 per-course adaptive engines.
 * Each engine has different parameter signatures for recordAnswer() and
 * selectQuestions(). This adapter normalizes them behind a single API so
 * that StudyProvider, Practice, and DailyPlan can call one function
 * regardless of the active course.
 *
 * All imports are dynamic to avoid circular dependencies and allow
 * per-course code-splitting.
 */

import type { CourseId } from '../types/course';
import type { Question } from '../types';
import logger from '../utils/logger';

// ============================================================================
// Public API — Record an answer in the course's adaptive engine
// ============================================================================

/**
 * Record a user's answer in the appropriate adaptive engine.
 * This updates SM-2 state, difficulty tracking, and concept mastery.
 *
 * Should be called alongside Firestore writes (not instead of them).
 * Fire-and-forget: errors are logged but never thrown.
 */
export async function recordAnswerToEngine(
  courseId: CourseId,
  questionId: string,
  section: string,
  isCorrect: boolean,
  options: {
    blueprintArea?: string;
    topic?: string;
    difficulty?: string;
    timeSpentSeconds?: number;
  } = {}
): Promise<void> {
  try {
    const timeMs = options.timeSpentSeconds ? options.timeSpentSeconds * 1000 : undefined;

    switch (courseId) {
      case 'cpa': {
        const engine = await import('./cpaAdaptiveEngine');
        engine.recordAnswer(
          questionId,
          section as Parameters<typeof engine.recordAnswer>[1],
          options.blueprintArea,
          isCorrect,
          [],
          timeMs,
        );
        break;
      }
      case 'ea': {
        const engine = await import('./eaAdaptiveEngine');
        engine.recordAnswer(
          questionId,
          section as Parameters<typeof engine.recordAnswer>[1],
          options.blueprintArea, // mapped to EA's "domain" param
          isCorrect,
          [],
          timeMs,
        );
        break;
      }
      case 'cma': {
        const engine = await import('./cmaAdaptiveEngine');
        engine.recordAnswer(
          questionId,
          isCorrect,
          section as Parameters<typeof engine.recordAnswer>[2],
          options.blueprintArea, // mapped to CMA's "_domain" param
          options.timeSpentSeconds,
        );
        break;
      }
      case 'cia': {
        const engine = await import('./ciaAdaptiveEngine');
        // CIA uses recordAnswerToCore for the shared core state
        engine.recordAnswerToCore(
          questionId,
          section as Parameters<typeof engine.recordAnswerToCore>[1],
          isCorrect,
          timeMs,
        );
        break;
      }
      case 'cisa': {
        const engine = await import('./cisaAdaptiveEngine');
        engine.recordAnswer(
          questionId,
          section as Parameters<typeof engine.recordAnswer>[1],
          isCorrect,
          (options.difficulty || 'medium') as 'easy' | 'medium' | 'hard',
          [],
          options.blueprintArea, // mapped to CISA's "subdomain" param
          timeMs,
        );
        break;
      }
      case 'cfp': {
        const engine = await import('./cfpAdaptiveEngine');
        const state = engine.loadAdaptiveState();
        engine.recordResult(
          state,
          questionId,
          section, // CFP uses "domain" which maps to section
          isCorrect,
          timeMs,
        );
        break;
      }
      default:
        logger.warn(`No adaptive engine for course: ${courseId}`);
    }
  } catch (error) {
    // Fire-and-forget: log but don't throw
    logger.error(`Failed to record answer in ${courseId} adaptive engine:`, error);
  }
}

// ============================================================================
// Public API — Select questions using the course's adaptive engine
// ============================================================================

/**
 * Use the adaptive engine's question selection algorithm.
 *
 * This selects questions based on:
 * - Spaced repetition (SM-2 review-due questions)
 * - Weak area targeting
 * - Difficulty matching (adaptive to user level)
 * - Exam-weighted distribution
 *
 * Returns a subset of the provided questions, sorted by priority.
 * Falls back to empty array on error (caller should have fallback logic).
 */
export async function selectQuestionsFromEngine(
  courseId: CourseId,
  allQuestions: Question[],
  options: {
    section?: string;
    count?: number;
    prioritizeWeakAreas?: boolean;
    includeReviewDue?: boolean;
    examWeighted?: boolean;
    difficulty?: 'easy' | 'medium' | 'hard' | 'adaptive';
  } = {}
): Promise<Question[]> {
  const {
    section,
    count = 10,
    prioritizeWeakAreas = true,
    includeReviewDue = true,
    examWeighted = false,
    difficulty = 'adaptive',
  } = options;

  try {
    switch (courseId) {
      case 'cpa': {
        const engine = await import('./cpaAdaptiveEngine');
        const results = engine.selectQuestions(
          allQuestions as unknown as Parameters<typeof engine.selectQuestions>[0],
          {
            sections: section ? [section] as any : undefined,
            blueprintAreas: undefined,
            difficulty,
            count,
            excludeRecent: true,
            prioritizeWeakAreas,
            includeReviewDue,
            examWeighted,
          }
        );
        return results as unknown as Question[];
      }
      case 'ea': {
        const engine = await import('./eaAdaptiveEngine');
        const results = engine.selectQuestions(
          allQuestions as unknown as Parameters<typeof engine.selectQuestions>[0],
          {
            parts: section ? [section] as any : undefined,
            domains: undefined,
            difficulty,
            count,
            excludeRecent: true,
            prioritizeWeakAreas,
            includeReviewDue,
            examWeighted,
          }
        );
        return results as unknown as Question[];
      }
      case 'cma': {
        const engine = await import('./cmaAdaptiveEngine');
        const results = engine.selectQuestions(
          allQuestions as unknown as Parameters<typeof engine.selectQuestions>[0],
          count,
          section as any,
        );
        return results as unknown as Question[];
      }
      case 'cisa': {
        const engine = await import('./cisaAdaptiveEngine');
        const results = engine.selectQuestions(
          allQuestions as unknown as Parameters<typeof engine.selectQuestions>[0],
          {
            domains: section ? [section] as any : undefined,
            difficulty,
            count,
            excludeRecent: true,
            prioritizeWeakAreas,
            includeReviewDue,
            examWeighted,
          }
        );
        return results as unknown as Question[];
      }
      case 'cfp': {
        const engine = await import('./cfpAdaptiveEngine');
        const state = engine.loadAdaptiveState();
        const results = engine.selectQuestions(
          allQuestions as unknown as Parameters<typeof engine.selectQuestions>[0],
          state,
          {
            domains: section ? [section] : undefined,
            difficulty,
            count,
            excludeRecent: true,
            prioritizeWeakAreas,
            includeReviewDue,
            examWeighted,
          }
        );
        return results as unknown as Question[];
      }
      case 'cia': {
        // CIA doesn't have selectQuestions on the engine — use core directly
        const { selectQuestionsCore } = await import('./adaptiveEngineCore');
        const engine = await import('./ciaAdaptiveEngine');
        const coreState = engine.getCoreState();
        const config = engine.getCIAEngineConfig();
        const results = selectQuestionsCore(
          allQuestions as any,
          coreState,
          config,
          {
            sections: section ? [section] : undefined,
            difficulty,
            count,
            excludeRecent: true,
            prioritizeWeakAreas,
            includeReviewDue,
            examWeighted,
          },
          (q: any) => q.section || q.part,
        );
        return results as unknown as Question[];
      }
      default:
        logger.warn(`No adaptive engine for course: ${courseId}`);
        return [];
    }
  } catch (error) {
    logger.error(`Failed to select questions via ${courseId} adaptive engine:`, error);
    return [];
  }
}
