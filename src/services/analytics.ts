/**
 * Analytics Service
 * Google Analytics 4 + Custom Event Tracking
 *
 * This module provides a unified analytics interface that:
 * - Loads GA4 on demand
 * - Tracks page views automatically
 * - Provides custom event tracking
 * - Respects user privacy preferences
 * 
 * SETUP: Replace GA_MEASUREMENT_ID with your GA4 Measurement ID from:
 * https://analytics.google.com/ → Admin → Data Streams → Web Stream
 */

import logger from '../utils/logger';
import { trackPWAEngagement } from '../hooks/usePWAInstall';

// GA4 Measurement ID - Get from Google Analytics 4 Admin → Data Streams → Web
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

let initialized = false;

/**
 * Initialize Google Analytics
 */
export const initAnalytics = (): void => {
  if (initialized || typeof window === 'undefined') return;

  // Check for Do Not Track
  if (navigator.doNotTrack === '1') {
    logger.log('Analytics disabled: Do Not Track enabled');
    return;
  }

  // Don't load in development unless explicitly enabled
  if (import.meta.env.DEV && !import.meta.env.VITE_ENABLE_ANALYTICS) {
    logger.log('Analytics disabled in development');
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: any[]) {
    // @ts-ignore - Argument spread is intended
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll track manually for SPA
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });

  initialized = true;
  logger.log('Analytics initialized');
};

/**
 * Track page view
 */
export const trackPageView = (path: string, title: string): void => {
  if (!initialized || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
};

/**
 * Track custom event
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}): void => {
  if (!initialized || !window.gtag) return;

  window.gtag('event', eventName, params);
};

/**
 * Track user engagement
 */
export const analytics = {
  // Study events
  startStudySession: (section: string, mode: string) => {
    trackEvent('study_session_start', {
      exam_section: section,
      study_mode: mode,
    });
  },

  completeStudySession: (section: string, mode: string, duration: number, score: number) => {
    trackEvent('study_session_complete', {
      exam_section: section,
      study_mode: mode,
      duration_seconds: duration,
      score_percentage: score,
    });
  },

  // Question events
  answerQuestion: (correct: boolean, section: string | undefined, topic: string) => {
    trackEvent('answer_question', {
      is_correct: correct,
      exam_section: section,
      topic: topic,
    });
    // Track for PWA install prompt engagement threshold
    trackPWAEngagement('question_answered');
  },

  // Practice mode events
  startPractice: (section: string, count: number) => {
    trackEvent('practice_start', {
      exam_section: section,
      question_count: count,
    });
  },

  completePractice: (section: string, correct: number, total: number, timeSpent: number) => {
    trackEvent('practice_complete', {
      exam_section: section,
      correct_count: correct,
      total_count: total,
      time_spent_seconds: timeSpent,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
    });
  },

  // Exam simulator events
  startExam: (section: string) => {
    trackEvent('exam_start', {
      exam_section: section,
    });
  },

  completeExam: (section: string, score: number, passed: boolean) => {
    trackEvent('exam_complete', {
      exam_section: section,
      score_percentage: score,
      passed: passed,
    });
  },

  // AI Tutor events
  askAITutor: (topic: string, mode: string) => {
    trackEvent('ai_tutor_ask', {
      topic: topic,
      mode: mode,
    });
  },

  // Achievement events
  unlockAchievement: (achievementId: string, achievementName: string) => {
    trackEvent('achievement_unlock', {
      achievement_id: achievementId,
      achievement_name: achievementName,
    });
  },

  // Streak events
  maintainStreak: (days: number) => {
    trackEvent('streak_maintain', {
      streak_days: days,
    });
  },

  loseStreak: (previousDays: number) => {
    trackEvent('streak_lost', {
      previous_days: previousDays,
    });
  },

  // User journey events
  completeOnboarding: (section: string, examDate: string | Date | null) => {
    trackEvent('onboarding_complete', {
      exam_section: section,
      has_exam_date: !!examDate,
    });
  },

  // Feature usage
  useFeature: (featureName: string) => {
    trackEvent('feature_use', {
      feature_name: featureName,
    });
  },

  // Error tracking
  trackError: (errorMessage: string, componentName: string) => {
    trackEvent('exception', {
      description: errorMessage,
      component: componentName,
      fatal: false,
    });
  },
};

export default analytics;
