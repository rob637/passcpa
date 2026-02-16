/**
 * Unified Notification Service
 * Handles notifications across all platforms:
 * - Web: FCM Push Notifications + Browser Notifications
 * - iOS/Android: Capacitor Local Notifications
 * - Email: Weekly reports via Cloud Functions (server-side)
 */

import { Capacitor } from '@capacitor/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { getApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../config/firebase';
import logger from '../utils/logger';

// FCM VAPID key - get this from Firebase Console > Project Settings > Cloud Messaging
const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || '';

// Platform detection
export const isNative = Capacitor.isNativePlatform();
export const isWeb = !isNative;

// ============================================================================
// FCM PUSH NOTIFICATIONS (Web)
// ============================================================================

let messagingInstance: Messaging | null = null;

/**
 * Initialize Firebase Cloud Messaging
 */
export async function initializeFCM(): Promise<boolean> {
  if (!isWeb) return false;
  
  // Skip FCM if no VAPID key configured (prevents 401 errors on staging)
  if (!VAPID_KEY) {
    logger.info('FCM skipped: VITE_FIREBASE_VAPID_KEY not configured');
    return false;
  }
  
  try {
    const app = getApp();
    messagingInstance = getMessaging(app);
    
    // Listen for foreground messages
    onMessage(messagingInstance, (payload) => {
      logger.log('FCM message received in foreground:', payload);
      
      // Show as browser notification
      if (payload.notification) {
        showBrowserNotification(
          payload.notification.title || 'VoraPrep',
          payload.notification.body || ''
        );
      }
    });
    
    return true;
  } catch (error) {
    logger.error('FCM initialization failed:', error);
    return false;
  }
}

/**
 * Request FCM permission and get token
 */
export async function requestFCMToken(userId: string): Promise<string | null> {
  if (!isWeb || !messagingInstance || !VAPID_KEY) return null;
  
  try {
    // Request notification permission first
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      logger.log('Notification permission denied');
      return null;
    }
    
    // Get FCM token
    const token = await getToken(messagingInstance, { vapidKey: VAPID_KEY });
    
    if (token) {
      // Save token to user's Firestore document
      await saveFCMToken(userId, token);
      logger.log('FCM token saved:', token.substring(0, 20) + '...');
      return token;
    }
    
    return null;
  } catch (error) {
    logger.error('Error getting FCM token:', error);
    return null;
  }
}

/**
 * Save FCM token to Firestore
 */
async function saveFCMToken(userId: string, token: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    fcmTokens: arrayUnion(token),
    lastTokenUpdate: new Date()
  });
}

/**
 * Remove FCM token from Firestore
 */
export async function removeFCMToken(userId: string, token: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    fcmTokens: arrayRemove(token)
  });
}

// ============================================================================
// BROWSER NOTIFICATIONS (Web fallback)
// ============================================================================

/**
 * Show a browser notification
 */
export async function showBrowserNotification(title: string, body: string, options?: NotificationOptions): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission !== 'granted') return false;
  
  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, {
      body,
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      tag: 'voraprep-notification',
      ...options
    });
    return true;
  } catch (error) {
    logger.error('Browser notification failed:', error);
    return false;
  }
}

// ============================================================================
// CAPACITOR LOCAL NOTIFICATIONS (iOS/Android)
// ============================================================================

/**
 * Initialize Capacitor local notifications
 */
export async function initializeLocalNotifications(): Promise<boolean> {
  if (!isNative) return false;
  
  try {
    // Request permission
    const result = await LocalNotifications.requestPermissions();
    
    if (result.display === 'granted') {
      // Listen for notification actions
      LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        logger.log('Notification action performed:', notification);
        // Handle notification tap - could navigate to specific page
      });
      
      return true;
    }
    
    return false;
  } catch (error) {
    logger.error('Local notifications init failed:', error);
    return false;
  }
}

/**
 * Schedule a local notification (Capacitor)
 */
export async function scheduleLocalNotification(options: {
  id: number;
  title: string;
  body: string;
  scheduleAt: Date;
  repeats?: boolean;
  every?: 'day' | 'week' | 'hour';
}): Promise<boolean> {
  if (!isNative) return false;
  
  try {
    const schedule: ScheduleOptions = {
      notifications: [{
        id: options.id,
        title: options.title,
        body: options.body,
        schedule: {
          at: options.scheduleAt,
          repeats: options.repeats || false,
          every: options.every as any,
          allowWhileIdle: true
        },
        sound: 'default',
        actionTypeId: 'STUDY_REMINDER',
        extra: {
          type: 'daily_reminder'
        }
      }]
    };
    
    await LocalNotifications.schedule(schedule);
    logger.log('Local notification scheduled:', options);
    return true;
  } catch (error) {
    logger.error('Failed to schedule local notification:', error);
    return false;
  }
}

/**
 * Cancel all scheduled local notifications
 */
export async function cancelAllLocalNotifications(): Promise<void> {
  if (!isNative) return;
  
  try {
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel(pending);
    }
  } catch (error) {
    logger.error('Failed to cancel notifications:', error);
  }
}

// ============================================================================
// UNIFIED DAILY REMINDER SETUP
// ============================================================================

const DAILY_REMINDER_ID = 1001;

/**
 * Setup daily study reminder across all platforms
 */
export async function setupDailyReminder(
  userId: string,
  enabled: boolean,
  time: string // "HH:MM" format
): Promise<boolean> {
  // Save preference to localStorage (for immediate access)
  localStorage.setItem('dailyReminderEnabled', String(enabled));
  localStorage.setItem('dailyReminderTime', time);
  
  if (!enabled) {
    // Cancel any existing reminders
    if (isNative) {
      await cancelAllLocalNotifications();
    }
    return true;
  }
  
  const [hours, minutes] = time.split(':').map(Number);
  
  if (isNative) {
    // Use Capacitor Local Notifications for mobile
    await cancelAllLocalNotifications();
    
    // Schedule for today or tomorrow
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);
    
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }
    
    return await scheduleLocalNotification({
      id: DAILY_REMINDER_ID,
      title: '📚 Time to Study!',
      body: 'Your daily CPA practice session is waiting.',
      scheduleAt: scheduledTime,
      repeats: true,
      every: 'day'
    });
  } else {
    // For web, request FCM token - server will handle scheduling
    const token = await requestFCMToken(userId);
    return token !== null;
  }
}

/**
 * Get current reminder settings
 */
export function getDailyReminderSettings(): { enabled: boolean; time: string } {
  return {
    enabled: localStorage.getItem('dailyReminderEnabled') === 'true',
    time: localStorage.getItem('dailyReminderTime') || '09:00'
  };
}

// ============================================================================
// WEEKLY REPORT PREFERENCES (Server-side via Cloud Functions)
// ============================================================================

/**
 * Update weekly report preference
 * Note: Actual sending is handled by Cloud Functions
 */
export async function setWeeklyReportEnabled(userId: string, enabled: boolean): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    weeklyReportEnabled: enabled
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize notification system for current platform
 */
export async function initializeNotifications(userId?: string): Promise<boolean> {
  if (isNative) {
    return await initializeLocalNotifications();
  } else {
    const fcmInit = await initializeFCM();
    
    // If user is logged in and FCM is ready, request token
    if (fcmInit && userId) {
      await requestFCMToken(userId);
    }
    
    return fcmInit;
  }
}

// ============================================================================
// CONTEXTUAL REMINDER MESSAGES
// ============================================================================

export function getContextualReminderMessage(): { title: string; body: string } {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  
  const messages = {
    morning: [
      { title: '🌅 Good morning!', body: 'Start your day with 10 questions to build momentum.' },
      { title: '☀️ Rise and shine!', body: 'Your CPA journey continues. Ready for a quick study session?' },
    ],
    afternoon: [
      { title: '💪 Afternoon check-in', body: 'Take a break from work with some CPA practice.' },
      { title: '📝 Quick quiz?', body: '5 minutes now saves 50 minutes later.' },
    ],
    evening: [
      { title: '🌙 Evening review', body: 'Wrap up your day with a rapid review session.' },
      { title: '🦉 Night owl?', body: 'Perfect time to study while the world is quiet.' },
    ],
    weekend: [
      { title: '📅 Weekend warrior', body: 'This is where the real progress happens!' },
      { title: '🚀 Big gains', body: 'Weekends are for deep work. Tackle some questions?' },
    ],
  };
  
  let category: keyof typeof messages = 'morning';
  if (day === 0 || day === 6) {
    category = 'weekend';
  } else if (hour >= 12 && hour < 17) {
    category = 'afternoon';
  } else if (hour >= 17) {
    category = 'evening';
  }
  
  const categoryMessages = messages[category];
  return categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
}

export default {
  isNative,
  isWeb,
  initializeNotifications,
  setupDailyReminder,
  getDailyReminderSettings,
  setWeeklyReportEnabled,
  showBrowserNotification,
  scheduleLocalNotification,
  cancelAllLocalNotifications,
  getContextualReminderMessage
};
