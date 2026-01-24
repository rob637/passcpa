// Notification Service
// Handles push notifications for study reminders

/**
 * Check if notifications are supported
 */
export function notificationsSupported() {
  return 'Notification' in window && 'serviceWorker' in navigator;
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission() {
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
export function getNotificationPermission() {
  if (!notificationsSupported()) return 'not-supported';
  return Notification.permission;
}

/**
 * Schedule a local notification (using service worker)
 */
export async function scheduleNotification(options) {
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
        vibrate: [200, 100, 200],
        requireInteraction: false,
        actions: [
          { action: 'open', title: 'Study Now' },
          { action: 'dismiss', title: 'Later' },
        ],
      });

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
        vibrate: [200, 100, 200],
      });
    }, delay);

    return { success: true, scheduled: true };
  } catch (error) {
    console.error('Notification error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Study reminder messages
 */
const REMINDER_MESSAGES = {
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
    { title: '📚 Study reminder', body: "You haven't studied today yet. Even 15 minutes helps!" },
    { title: '🎯 Stay on track', body: 'Your streak is on the line! Quick practice session?' },
  ],
  evening: [
    { title: '🌙 Evening study time', body: 'Wind down with some flashcard review before bed.' },
    {
      title: "✨ Don't break the chain!",
      body: 'A few questions before bed keeps your streak alive.',
    },
    { title: '📖 Last chance today', body: 'Complete your daily goal before midnight!' },
  ],
  streak: [
    { title: '🔥 Streak at risk!', body: "Don't lose your {streak}-day streak! Study now." },
    { title: '⚠️ Streak ending soon', body: 'Your {streak}-day streak ends at midnight. Save it!' },
  ],
  achievement: [
    { title: '🏆 New achievement!', body: 'You unlocked "{achievement}". Keep up the great work!' },
    { title: '⭐ Milestone reached!', body: 'Congratulations on reaching {milestone}!' },
  ],
  encouragement: [
    { title: '💡 Pro tip', body: 'Review your weak areas for 20% faster improvement.' },
    { title: "📈 You're improving!", body: 'Your accuracy went up {percent}% this week. Nice!' },
    { title: '🎉 Great progress', body: "You've answered {count} questions this week!" },
  ],
};

/**
 * Get a random reminder message
 */
export function getRandomReminder(type = 'afternoon') {
  const messages = REMINDER_MESSAGES[type] || REMINDER_MESSAGES.afternoon;
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

/**
 * Send a streak reminder
 */
export async function sendStreakReminder(streakDays) {
  const message = getRandomReminder('streak');
  const body = message.body.replace('{streak}', streakDays);

  return scheduleNotification({
    title: message.title,
    body,
    tag: 'streak-reminder',
    data: { type: 'streak', streak: streakDays },
  });
}

/**
 * Send a study reminder based on time of day
 */
export async function sendStudyReminder() {
  const hour = new Date().getHours();
  let type = 'afternoon';

  if (hour >= 5 && hour < 12) {
    type = 'morning';
  } else if (hour >= 17) {
    type = 'evening';
  }

  const message = getRandomReminder(type);

  return scheduleNotification({
    title: message.title,
    body: message.body,
    tag: 'study-reminder',
    data: { type: 'reminder' },
  });
}

/**
 * Send an achievement notification
 */
export async function sendAchievementNotification(achievementName) {
  return scheduleNotification({
    title: '🏆 Achievement Unlocked!',
    body: `You earned "${achievementName}". Keep going!`,
    tag: 'achievement',
    data: { type: 'achievement', achievement: achievementName },
  });
}

/**
 * Setup daily reminder (stores preference)
 */
export function setupDailyReminder(time = '09:00', enabled = true) {
  localStorage.setItem('dailyReminderTime', time);
  localStorage.setItem('dailyReminderEnabled', enabled ? 'true' : 'false');

  // Note: Actual scheduling would require a backend service
  // This just stores the preference for the app to check
  return { time, enabled };
}

/**
 * Get daily reminder settings
 */
export function getDailyReminderSettings() {
  return {
    time: localStorage.getItem('dailyReminderTime') || '09:00',
    enabled: localStorage.getItem('dailyReminderEnabled') !== 'false',
  };
}

/**
 * Check if user should be reminded (called on app load)
 */
export async function checkAndRemind(userStats) {
  const settings = getDailyReminderSettings();

  if (!settings.enabled) return;

  const lastReminder = localStorage.getItem('lastReminderDate');
  const today = new Date().toDateString();

  // Don't remind if already reminded today
  if (lastReminder === today) return;

  // Don't remind if user has already studied today
  if (userStats?.studiedToday) return;

  // Check if current time is past reminder time
  const now = new Date();
  const [reminderHour, reminderMinute] = settings.time.split(':').map(Number);
  const reminderTime = new Date();
  reminderTime.setHours(reminderHour, reminderMinute, 0, 0);

  if (now >= reminderTime) {
    await sendStudyReminder();
    localStorage.setItem('lastReminderDate', today);
  }
}
