// Notification Service
// Handles push notifications for study reminders

/**
 * Check if notifications are supported
 */
export function notificationsSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator;
}

export interface NotificationRequestResult {
  granted: boolean;
  permission?: NotificationPermission;
  reason?: string;
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<NotificationRequestResult> {
  if (!notificationsSupported()) {
    return { granted: false, reason: 'not-supported' };
  }

  const permission = await Notification.requestPermission();

  return {
    granted: permission === 'granted',
    permission,
  };
}

/**
 * Get current notification permission status
 */
export function getNotificationPermission(): NotificationPermission | 'not-supported' {
  if (!notificationsSupported()) return 'not-supported';
  return Notification.permission;
}

export interface NotificationOptions {
  title: string;
  body: string;
  tag?: string;
  delay?: number;
  data?: Record<string, any>;
}

export interface NotificationResult {
  success: boolean;
  reason?: string;
  error?: string;
  scheduled?: boolean;
}

/**
 * Schedule a local notification (using service worker)
 */
export async function scheduleNotification(options: NotificationOptions): Promise<NotificationResult> {
  const { title, body, tag, delay = 0, data = {} } = options;

  if (!notificationsSupported() || Notification.permission !== 'granted') {
    return { success: false, reason: 'not-permitted' };
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    // For immediate notifications
    if (delay === 0) {
      await registration.showNotification(title, {
        body,
        tag,
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        data,
        // vibrate: [200, 100, 200], // Not in all TS definitions
        requireInteraction: false,
        actions: [
          { action: 'open', title: 'Study Now' },
          { action: 'dismiss', title: 'Later' },
        ],
      } as any);

      return { success: true };
    }

    // For delayed notifications, we'd need a backend service
    // For now, use setTimeout as a fallback (only works while app is open)
    setTimeout(async () => {
      await registration.showNotification(title, {
        body,
        tag,
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        data,
        // vibrate: [200, 100, 200],
      });
    }, delay);

    return { success: true, scheduled: true };
  } catch (error: any) {
    console.error('Notification error:', error);
    return { success: false, error: error.message };
  }
}

interface ReminderMessage {
  title: string;
  body: string;
}

/**
 * Study reminder messages
 */
const REMINDER_MESSAGES: Record<string, ReminderMessage[]> = {
  morning: [
    { title: '🌅 Good morning!', body: 'Start your day with 10 questions to build momentum.' },
    {
      title: '☀️ Rise and shine!',
      body: 'Your CPA journey continues. Ready for a quick study session?',
    },
    { title: '🎯 Morning motivation', body: "Consistent daily practice beats cramming. Let's go!" },
  ],
  afternoon: [
    { title: '💪 Afternoon check-in', body: 'Take a break from work with some CPA practice.' },
    { title: '📝 Quick quiz?', body: '5 minutes now saves 50 minutes later.' },
    { title: '⚡ Power through', body: 'Energy dip? Wake up your brain with a quick simulation.' },
  ],
  evening: [
    { title: '🌙 Evening review', body: 'Wrap up your day with a rapid review session.' },
    { title: '🦉 Night owl?', body: 'Perfect time to study while the world is quiet.' },
    { title: '💤 Sleep learning', body: 'Review your weak spots before bed for better retention.' },
  ],
  weekend: [
    { title: '📅 Weekend warrior', body: 'This is where the real progress happens. Keep going!' },
    { title: '🚀 Big gains', body: 'Weekends are for deep work. Tackle a full practice exam?' },
    { title: '🏆 Eyes on the prize', body: 'Every hour today gets you closer to those 3 letters: CPA.' },
  ],
  long_break: [
    { title: '👋 Checkpoint', body: "It's been a while. Don't let your streak break!" },
    { title: '🔄 Refresh your memory', body: 'Spaced repetition works best with consistency.' },
    { title: '⏰ Time to study', body: 'Get back on track today.' },
  ],
};

/**
 * Get a tailored reminder message based on time of day
 */
export function getContextualReminder(): ReminderMessage {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  let category = 'morning';

  if (day === 0 || day === 6) {
    category = 'weekend';
  } else if (hour >= 5 && hour < 12) {
    category = 'morning';
  } else if (hour >= 12 && hour < 17) {
    category = 'afternoon';
  } else {
    category = 'evening';
  }

  const messages = REMINDER_MESSAGES[category];
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

/**
 * Setup daily reminders
 */
export async function setupReminders(preferences: { enabled: boolean; time: string }): Promise<boolean> {
  // Save preferences
  localStorage.setItem('dailyReminderEnabled', String(preferences.enabled));
  localStorage.setItem('dailyReminderTime', preferences.time);

  if (!preferences.enabled) {
    return true; // "Success" in disabling
  }

  const permission = await requestNotificationPermission();
  if (!permission.granted) return false;

  // Calculate delay until next reminder time
  const now = new Date();
  const [hours, minutes] = preferences.time.split(':').map(Number);
  const scheduledTime = new Date(now);
  scheduledTime.setHours(hours, minutes, 0, 0);

  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const delay = scheduledTime.getTime() - now.getTime();
  const message = getContextualReminder();

  scheduleNotification({
    title: message.title,
    body: message.body,
    tag: 'daily-study',
    delay,
  });

  return true;
}

export function getDailyReminderSettings() {
  return {
    enabled: localStorage.getItem('dailyReminderEnabled') === 'true',
    time: localStorage.getItem('dailyReminderTime') || '09:00'
  };
}

export const setupDailyReminder = setupReminders;

export default {
  notificationsSupported,
  requestNotificationPermission,
  getNotificationPermission,
  scheduleNotification,
  getContextualReminder,
  setupReminders,
  setupDailyReminder,
  getDailyReminderSettings
};
