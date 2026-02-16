/**
 * useEngagementMetrics - Hook for tracking user engagement
 * Tracks session duration, question attempts, and study patterns
 */

import { useEffect, useRef, useCallback } from 'react';
import logger from '../utils/logger';

// Types
interface SessionData {
  section: string | null;
  startTime: number | null;
  questionsAnswered: number;
  correctAnswers: number;
}

interface QuestionStartData {
  id: string;
  section: string;
  topic: string;
  startTime: number;
}

interface QuestionAttemptMetrics {
  question_id: string;
  section: string;
  topic: string;
  time_spent_seconds: number;
  attempt_number: number;
  is_correct: boolean;
}

interface StudySessionMetrics {
  section: string | null;
  duration_seconds: number;
  questions_answered: number;
  correct_answers: number;
  accuracy_percent: number;
}

// Lazy import analytics
const logAnalyticsEvent = async (eventName: string, params: Record<string, unknown>): Promise<void> => {
  try {
    const { analytics } = await import('../config/firebase');
    const { logEvent } = await import('firebase/analytics');
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
  } catch {
    // Analytics not available
  }
};

/**
 * Track time spent on the app
 */
export const useSessionTracking = () => {
  const sessionStart = useRef<number>(Date.now());
  const lastActivity = useRef<number>(Date.now());
  const isVisible = useRef<boolean>(true);

  useEffect(() => {
    // Track visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible.current = false;
        // Log session pause
        const activeDuration = Date.now() - sessionStart.current;
        logger.debug(
            '[Engagement] Session paused after',
            Math.round(activeDuration / 1000),
            'seconds'
          );
      } else {
        isVisible.current = true;
        // Resume session
        lastActivity.current = Date.now();
      }
    };

    // Track user activity
    const handleActivity = () => {
      lastActivity.current = Date.now();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('click', handleActivity, { passive: true });
    document.addEventListener('keydown', handleActivity, { passive: true });
    document.addEventListener('scroll', handleActivity, { passive: true });

    // Log session on unload
    const handleUnload = () => {
      const sessionDuration = Math.round((Date.now() - sessionStart.current) / 1000);

      if (sessionDuration > 5) {
        // Log to analytics
        logAnalyticsEvent('session_end', {
          session_duration_seconds: sessionDuration,
          timestamp: new Date().toISOString(),
        });
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleActivity);
      document.removeEventListener('keydown', handleActivity);
      document.removeEventListener('scroll', handleActivity);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return {
    getSessionDuration: (): number => Math.round((Date.now() - sessionStart.current) / 1000),
    getTimeSinceLastActivity: (): number => Math.round((Date.now() - lastActivity.current) / 1000),
  };
};

/**
 * Track question attempt metrics
 */
export const useQuestionMetrics = () => {
  const questionStart = useRef<QuestionStartData | null>(null);
  const attempts = useRef<number>(0);

  const startQuestion = useCallback((questionId: string, section: string, topic: string) => {
    questionStart.current = {
      id: questionId,
      section,
      topic,
      startTime: Date.now(),
    };
    attempts.current = 0;
  }, []);

  const recordAttempt = useCallback((isCorrect: boolean): QuestionAttemptMetrics | null => {
    attempts.current += 1;

    if (questionStart.current) {
      const timeSpent = Math.round((Date.now() - questionStart.current.startTime) / 1000);

      const metrics: QuestionAttemptMetrics = {
        question_id: questionStart.current.id,
        section: questionStart.current.section,
        topic: questionStart.current.topic,
        time_spent_seconds: timeSpent,
        attempt_number: attempts.current,
        is_correct: isCorrect,
      };

      logger.debug('[Engagement] Question attempt:', metrics);

      logAnalyticsEvent('question_attempt', metrics as unknown as Record<string, unknown>);

      // Track if took multiple attempts
      if (attempts.current > 1 && isCorrect) {
        logAnalyticsEvent('question_mastered', {
          question_id: questionStart.current.id,
          attempts_required: attempts.current,
        });
      }

      return metrics;
    }
    return null;
  }, []);

  const endQuestion = useCallback(() => {
    questionStart.current = null;
    attempts.current = 0;
  }, []);

  return {
    startQuestion,
    recordAttempt,
    endQuestion,
    getAttemptCount: (): number => attempts.current,
  };
};

/**
 * Track study session metrics
 */
export const useStudySessionMetrics = () => {
  const sessionData = useRef<SessionData>({
    section: null,
    startTime: null,
    questionsAnswered: 0,
    correctAnswers: 0,
  });

  const startSession = useCallback((section: string) => {
    sessionData.current = {
      section,
      startTime: Date.now(),
      questionsAnswered: 0,
      correctAnswers: 0,
    };

    logAnalyticsEvent('study_session_start', {
      section,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const recordAnswer = useCallback((isCorrect: boolean) => {
    sessionData.current.questionsAnswered += 1;
    if (isCorrect) {
      sessionData.current.correctAnswers += 1;
    }
  }, []);

  const endSession = useCallback((): StudySessionMetrics | null => {
    if (!sessionData.current.startTime) return null;

    const duration = Math.round((Date.now() - sessionData.current.startTime) / 1000);
    const accuracy =
      sessionData.current.questionsAnswered > 0
        ? Math.round(
            (sessionData.current.correctAnswers / sessionData.current.questionsAnswered) * 100
          )
        : 0;

    const metrics: StudySessionMetrics = {
      section: sessionData.current.section,
      duration_seconds: duration,
      questions_answered: sessionData.current.questionsAnswered,
      correct_answers: sessionData.current.correctAnswers,
      accuracy_percent: accuracy,
    };

    logger.debug('[Engagement] Study session ended:', metrics);

    if (sessionData.current.questionsAnswered > 0) {
      logAnalyticsEvent('study_session_end', metrics as unknown as Record<string, unknown>);
    }

    sessionData.current = {
      section: null,
      startTime: null,
      questionsAnswered: 0,
      correctAnswers: 0,
    };

    return metrics;
  }, []);

  return {
    startSession,
    recordAnswer,
    endSession,
    getSessionStats: () => ({
      questionsAnswered: sessionData.current.questionsAnswered,
      correctAnswers: sessionData.current.correctAnswers,
      duration: sessionData.current.startTime
        ? Math.round((Date.now() - sessionData.current.startTime) / 1000)
        : 0,
    }),
  };
};

/**
 * Track feature usage
 */
export const trackFeatureUsage = (featureName: string, metadata: Record<string, unknown> = {}): void => {
  logger.debug('[Engagement] Feature used:', featureName, metadata);

  logAnalyticsEvent('feature_used', {
    feature_name: featureName,
    ...metadata,
  });
};

/**
 * Track user milestones
 */
export const trackMilestone = (milestoneName: string, value: unknown): void => {
  logger.debug('[Engagement] Milestone reached:', milestoneName, value);

  logAnalyticsEvent('milestone_reached', {
    milestone_name: milestoneName,
    milestone_value: value,
  });
};

export default {
  useSessionTracking,
  useQuestionMetrics,
  useStudySessionMetrics,
  trackFeatureUsage,
  trackMilestone,
};
