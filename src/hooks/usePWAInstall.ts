/**
 * usePWAInstall - World-class PWA install prompt management
 * 
 * Google-style approach:
 * 1. Contextual timing - Show after user engagement
 * 2. Value messaging - Benefits specific to exam prep
 * 3. Non-intrusive - Dismissible, remembers preference
 * 4. Smart re-prompting - Only after X days if dismissed
 * 
 * Captures beforeinstallprompt event and provides install functionality.
 */

import { useState, useEffect, useCallback } from 'react';
import logger from '../utils/logger';

// Types for the beforeinstallprompt event (not in standard TS lib)
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallState {
  /** Whether PWA can be installed (browser supports it and not already installed) */
  canInstall: boolean;
  /** Whether the app is already installed as PWA */
  isInstalled: boolean;
  /** Whether we're on iOS (needs special instructions) */
  isIOS: boolean;
  /** Whether we're on Android */
  isAndroid: boolean;
  /** Whether the install prompt is currently showing */
  isPromptOpen: boolean;
  /** Whether user has dismissed the prompt (this session) */
  isDismissed: boolean;
  /** Days until we can show prompt again (0 = can show now) */
  daysUntilCanPrompt: number;
}

interface PWAInstallActions {
  /** Trigger the native install prompt */
  promptInstall: () => Promise<boolean>;
  /** Open custom prompt UI */
  showPrompt: () => void;
  /** Close/dismiss the prompt */
  dismissPrompt: (rememberForDays?: number) => void;
  /** Reset the dismiss timer (for testing) */
  resetDismiss: () => void;
}

// Storage keys
const STORAGE_KEYS = {
  DISMISSED_UNTIL: 'pwa_dismissed_until',
  INSTALL_COUNT: 'pwa_install_prompt_count',
  LAST_ENGAGEMENT: 'pwa_last_engagement_score',
};

// Engagement thresholds for showing prompt
export const ENGAGEMENT_THRESHOLDS = {
  /** Questions answered before first prompt */
  QUESTIONS_ANSWERED: 5,
  /** Days of use before prompting */
  DAYS_ACTIVE: 2,
  /** Sessions before prompting */
  SESSIONS: 3,
};

// Re-prompt delays (in days)
const REPROMPT_DELAYS = [3, 7, 14, 30]; // Increasing delays for repeat dismissals

/**
 * Detect if running on iOS
 */
function isIOSDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && 
         // @ts-expect-error - MSStream is IE-specific
         !window.MSStream;
}

/**
 * Detect if running on Android
 */
function isAndroidDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android/.test(navigator.userAgent);
}

/**
 * Check if already installed as PWA
 */
function isPWAInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check display mode
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  
  // iOS Safari specific check
  // @ts-expect-error - navigator.standalone is iOS-specific
  const isIOSStandalone = window.navigator.standalone === true;
  
  return isStandalone || isIOSStandalone;
}

/**
 * Get dismiss delay based on how many times user has dismissed
 */
function getDismissDelay(dismissCount: number): number {
  const index = Math.min(dismissCount, REPROMPT_DELAYS.length - 1);
  return REPROMPT_DELAYS[index];
}

/**
 * Check if we can show prompt based on dismiss history
 */
function canShowPrompt(): { canShow: boolean; daysRemaining: number } {
  const dismissedUntil = localStorage.getItem(STORAGE_KEYS.DISMISSED_UNTIL);
  
  if (!dismissedUntil) {
    return { canShow: true, daysRemaining: 0 };
  }
  
  const dismissedDate = new Date(dismissedUntil);
  const now = new Date();
  
  if (now >= dismissedDate) {
    return { canShow: true, daysRemaining: 0 };
  }
  
  const daysRemaining = Math.ceil((dismissedDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return { canShow: false, daysRemaining };
}

/**
 * Main PWA install hook
 */
export function usePWAInstall(): [PWAInstallState, PWAInstallActions] {
  // Store the deferred prompt event
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(isPWAInstalled());

  // Check dismiss status
  const { canShow, daysRemaining } = canShowPrompt();

  // Listen for beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      logger.debug('PWA install prompt available');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      logger.info('PWA installed successfully');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Trigger the native install prompt
  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) {
      logger.warn('No deferred prompt available');
      return false;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      
      // Wait for user response
      const { outcome } = await deferredPrompt.userChoice;
      
      logger.info('PWA install prompt outcome:', outcome);
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        return true;
      }
      
      return false;
    } catch (error) {
      logger.error('PWA install prompt error:', error);
      return false;
    } finally {
      // Clear the deferred prompt - can only be used once
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  // Show custom prompt UI
  const showPrompt = useCallback(() => {
    setIsPromptOpen(true);
    setIsDismissed(false);
  }, []);

  // Dismiss the prompt
  const dismissPrompt = useCallback((rememberForDays?: number) => {
    setIsPromptOpen(false);
    setIsDismissed(true);

    // Track dismiss count
    const currentCount = parseInt(localStorage.getItem(STORAGE_KEYS.INSTALL_COUNT) || '0', 10);
    localStorage.setItem(STORAGE_KEYS.INSTALL_COUNT, String(currentCount + 1));

    // Calculate when to show again
    const daysToWait = rememberForDays ?? getDismissDelay(currentCount);
    const dismissUntil = new Date();
    dismissUntil.setDate(dismissUntil.getDate() + daysToWait);
    localStorage.setItem(STORAGE_KEYS.DISMISSED_UNTIL, dismissUntil.toISOString());

    logger.debug(`PWA prompt dismissed, will show again after ${daysToWait} days`);
  }, []);

  // Reset dismiss timer (for testing/debug)
  const resetDismiss = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.DISMISSED_UNTIL);
    localStorage.removeItem(STORAGE_KEYS.INSTALL_COUNT);
    setIsDismissed(false);
  }, []);

  const state: PWAInstallState = {
    canInstall: !!deferredPrompt && canShow && !isInstalled,
    isInstalled,
    isIOS: isIOSDevice(),
    isAndroid: isAndroidDevice(),
    isPromptOpen,
    isDismissed,
    daysUntilCanPrompt: daysRemaining,
  };

  const actions: PWAInstallActions = {
    promptInstall,
    showPrompt,
    dismissPrompt,
    resetDismiss,
  };

  return [state, actions];
}

/**
 * Track user engagement for smart prompt timing
 */
export function trackPWAEngagement(event: 'question_answered' | 'session_start' | 'study_complete'): void {
  const key = `pwa_engagement_${event}`;
  const count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
  localStorage.setItem(key, String(count));
}

/**
 * Check if user has sufficient engagement to show PWA prompt
 */
export function hasMetEngagementThreshold(): boolean {
  const questionsAnswered = parseInt(localStorage.getItem('pwa_engagement_question_answered') || '0', 10);
  const sessionsStarted = parseInt(localStorage.getItem('pwa_engagement_session_start') || '0', 10);
  
  return questionsAnswered >= ENGAGEMENT_THRESHOLDS.QUESTIONS_ANSWERED || 
         sessionsStarted >= ENGAGEMENT_THRESHOLDS.SESSIONS;
}

export default usePWAInstall;
