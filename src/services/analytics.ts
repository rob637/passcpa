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
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Google Ads Conversion ID - Get from Google Ads → Tools → Conversions → Tag setup
// Format: AW-XXXXXXXXX/YYYYYYYYYYYYYYY
const GOOGLE_ADS_CONVERSION_ID = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID || '';

let initialized = false;

/**
 * Initialize Google Analytics
 */
export const initAnalytics = (): void => {
  if (initialized || typeof window === 'undefined') return;

  // Skip if no measurement ID configured
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.startsWith('G-XXXX')) {
    logger.log('Analytics disabled: No GA4 Measurement ID configured.');
    return;
  }

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

  // Initialize dataLayer and gtag function BEFORE loading the script
  // This is the standard Google-recommended pattern
  window.dataLayer = window.dataLayer || [];
  // Always create a fresh gtag function to avoid conflicts with Firebase SDK
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  window.gtag = function (..._args: unknown[]) {
    // Using `arguments` object instead of spread for gtag compatibility
    window.dataLayer.push(arguments);
  };

  // Google Consent Mode V2 (required since March 2024)
  // Without this, gtag.js silently drops ALL events
  window.gtag('consent', 'default', {
    'analytics_storage': 'granted',
    'ad_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted',
  });

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll track manually for SPA
  });

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  initialized = true;
  logger.log('Analytics initialized with Consent Mode V2');

  // Track session start for PWA install threshold
  trackPWAEngagement('session_start');
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

  // ============================================
  // GOOGLE ADS CONVERSION TRACKING
  // Required for SEM bid optimization
  // ============================================

  /**
   * Track signup conversion for Google Ads
   * Called when user creates an account
   */
  trackSignupConversion: (userId: string, method: string = 'email') => {
    trackEvent('sign_up', {
      method: method,
      user_id: userId,
    });

    // Google Ads conversion
    if (GOOGLE_ADS_CONVERSION_ID && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_CONVERSION_ID,
        event_category: 'signup',
      });
      logger.log('Google Ads signup conversion tracked');
    }
  },

  /**
   * Track trial start conversion for Google Ads
   * Called when user starts their free trial
   */
  trackTrialStartConversion: (userId: string, courseId: string) => {
    trackEvent('trial_start', {
      user_id: userId,
      course_id: courseId,
    });

    // Google Ads conversion
    if (GOOGLE_ADS_CONVERSION_ID && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_CONVERSION_ID,
        event_category: 'trial_start',
        value: 0,
        currency: 'USD',
      });
      logger.log('Google Ads trial start conversion tracked');
    }
  },

  /**
   * Track purchase conversion for Google Ads
   * Called when user completes a subscription purchase
   */
  trackPurchaseConversion: (userId: string, courseId: string, value: number, planType: 'monthly' | 'annual') => {
    trackEvent('purchase', {
      user_id: userId,
      course_id: courseId,
      value: value,
      currency: 'USD',
      plan_type: planType,
    });

    // Google Ads conversion with value
    if (GOOGLE_ADS_CONVERSION_ID && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_CONVERSION_ID,
        event_category: 'purchase',
        value: value,
        currency: 'USD',
        transaction_id: `${userId}_${Date.now()}`,
      });
      logger.log(`Google Ads purchase conversion tracked: $${value}`);
    }
  },

  /**
   * Check if Google Ads tracking is configured
   */
  isGoogleAdsConfigured: (): boolean => {
    return !!GOOGLE_ADS_CONVERSION_ID && !GOOGLE_ADS_CONVERSION_ID.startsWith('AW-XXXX');
  },
};

export default analytics;
