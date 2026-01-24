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

// GA4 Measurement ID - Get from Google Analytics 4 Admin → Data Streams → Web
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

let initialized = false;

/**
 * Initialize Google Analytics
 */
export const initAnalytics = () => {
  if (initialized || typeof window === 'undefined') return;

  // Check for Do Not Track
  if (navigator.doNotTrack === '1') {
    console.log('Analytics disabled: Do Not Track enabled');
    return;
  }

  // Don't load in development unless explicitly enabled
  if (import.meta.env.DEV && !import.meta.env.VITE_ENABLE_ANALYTICS) {
    console.log('Analytics disabled in development');
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll track manually for SPA
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });

  initialized = true;
  console.log('Analytics initialized');
};

/**
 * Track page view
 */
export const trackPageView = (path, title) => {
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
export const trackEvent = (eventName, params = {}) => {
  if (!initialized || !window.gtag) return;

  window.gtag('event', eventName, params);
};

/**
 * Track user engagement
 */
export const analytics = {
  // Study events
  startStudySession: (section, mode) => {
    trackEvent('study_session_start', {
      exam_section: section,
      study_mode: mode,
    });
  },

  completeStudySession: (section, mode, duration, score) => {
    trackEvent('study_session_complete', {
      exam_section: section,
      study_mode: mode,
      duration_seconds: duration,
      score_percentage: score,
    });
  },

  // Question events
  answerQuestion: (correct, section, topic) => {
    trackEvent('answer_question', {
      is_correct: correct,
      exam_section: section,
      topic: topic,
    });
  },

  // Practice mode events
  startPractice: (section, count) => {
    trackEvent('practice_start', {
      exam_section: section,
      question_count: count,
    });
  },

  completePractice: (section, correct, total, timeSpent) => {
    trackEvent('practice_complete', {
      exam_section: section,
      correct_count: correct,
      total_count: total,
      time_spent_seconds: timeSpent,
      accuracy: Math.round((correct / total) * 100),
    });
  },

  // Exam simulator events
  startExam: (section) => {
    trackEvent('exam_start', {
      exam_section: section,
    });
  },

  completeExam: (section, score, passed) => {
    trackEvent('exam_complete', {
      exam_section: section,
      score_percentage: score,
      passed: passed,
    });
  },

  // AI Tutor events
  askAITutor: (topic, mode) => {
    trackEvent('ai_tutor_ask', {
      topic: topic,
      mode: mode,
    });
  },

  // Achievement events
  unlockAchievement: (achievementId, achievementName) => {
    trackEvent('achievement_unlock', {
      achievement_id: achievementId,
      achievement_name: achievementName,
    });
  },

  // Streak events
  maintainStreak: (days) => {
    trackEvent('streak_maintain', {
      streak_days: days,
    });
  },

  loseStreak: (previousDays) => {
    trackEvent('streak_lost', {
      previous_days: previousDays,
    });
  },

  // User journey events
  completeOnboarding: (section, examDate) => {
    trackEvent('onboarding_complete', {
      exam_section: section,
      has_exam_date: !!examDate,
    });
  },

  // Feature usage
  useFeature: (featureName) => {
    trackEvent('feature_use', {
      feature_name: featureName,
    });
  },

  // Error tracking
  trackError: (errorMessage, componentName) => {
    trackEvent('exception', {
      description: errorMessage,
      component: componentName,
      fatal: false,
    });
  },
};

export default analytics;
