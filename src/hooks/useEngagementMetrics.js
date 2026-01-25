/**
 * useEngagementMetrics - Hook for tracking user engagement
 * Tracks session duration, question attempts, and study patterns
 */

/* eslint-disable no-console */

import { useEffect, useRef, useCallback } from 'react';

// Lazy import analytics
const logAnalyticsEvent = async (eventName, params) => {
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
  const sessionStart = useRef(Date.now());
  const lastActivity = useRef(Date.now());
  const isVisible = useRef(true);

  useEffect(() => {
    // Track visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible.current = false;
        // Log session pause
        const activeDuration = Date.now() - sessionStart.current;
        if (import.meta.env.DEV) {
          console.log(
            '[Engagement] Session paused after',
            Math.round(activeDuration / 1000),
            'seconds'
          );
        }
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
    getSessionDuration: () => Math.round((Date.now() - sessionStart.current) / 1000),
    getTimeSinceLastActivity: () => Math.round((Date.now() - lastActivity.current) / 1000),
  };
};

/**
 * Track question attempt metrics
 */
export const useQuestionMetrics = () => {
  const questionStart = useRef(null);
  const attempts = useRef(0);

  const startQuestion = useCallback((questionId, section, topic) => {
    questionStart.current = {
      id: questionId,
      section,
      topic,
      startTime: Date.now(),
    };
    attempts.current = 0;
  }, []);

  const recordAttempt = useCallback((isCorrect) => {
    attempts.current += 1;

    if (questionStart.current) {
      const timeSpent = Math.round((Date.now() - questionStart.current.startTime) / 1000);

      const metrics = {
        question_id: questionStart.current.id,
        section: questionStart.current.section,
        topic: questionStart.current.topic,
        time_spent_seconds: timeSpent,
        attempt_number: attempts.current,
        is_correct: isCorrect,
      };

      if (import.meta.env.DEV) {
        console.log('[Engagement] Question attempt:', metrics);
      }

      logAnalyticsEvent('question_attempt', metrics);

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
    getAttemptCount: () => attempts.current,
  };
};

/**
 * Track study session metrics
 */
export const useStudySessionMetrics = () => {
  const sessionData = useRef({
    section: null,
    startTime: null,
    questionsAnswered: 0,
    correctAnswers: 0,
  });

  const startSession = useCallback((section) => {
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

  const recordAnswer = useCallback((isCorrect) => {
    sessionData.current.questionsAnswered += 1;
    if (isCorrect) {
      sessionData.current.correctAnswers += 1;
    }
  }, []);

  const endSession = useCallback(() => {
    if (!sessionData.current.startTime) return null;

    const duration = Math.round((Date.now() - sessionData.current.startTime) / 1000);
    const accuracy =
      sessionData.current.questionsAnswered > 0
        ? Math.round(
            (sessionData.current.correctAnswers / sessionData.current.questionsAnswered) * 100
          )
        : 0;

    const metrics = {
      section: sessionData.current.section,
      duration_seconds: duration,
      questions_answered: sessionData.current.questionsAnswered,
      correct_answers: sessionData.current.correctAnswers,
      accuracy_percent: accuracy,
    };

    if (import.meta.env.DEV) {
      console.log('[Engagement] Study session ended:', metrics);
    }

    if (sessionData.current.questionsAnswered > 0) {
      logAnalyticsEvent('study_session_end', metrics);
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
export const trackFeatureUsage = (featureName, metadata = {}) => {
  if (import.meta.env.DEV) {
    console.log('[Engagement] Feature used:', featureName, metadata);
  }

  logAnalyticsEvent('feature_used', {
    feature_name: featureName,
    ...metadata,
  });
};

/**
 * Track user milestones
 */
export const trackMilestone = (milestoneName, value) => {
  if (import.meta.env.DEV) {
    console.log('[Engagement] Milestone reached:', milestoneName, value);
  }

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
