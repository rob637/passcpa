/**
 * Push Notifications Service - Quality Tests (Bug-Finding Focus)
 * 
 * Tests multi-platform notification system for edge cases.
 * @batch 4 of autonomous tests (45 tests)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Capacitor at module level
vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: () => false,
    getPlatform: () => 'web',
  },
}));

// Mock Capacitor Push Notifications
vi.mock('@capacitor/push-notifications', () => ({
  PushNotifications: {
    requestPermissions: vi.fn(() => Promise.resolve({ receive: 'granted' })),
    register: vi.fn(() => Promise.resolve()),
    addListener: vi.fn(() => Promise.resolve({ remove: vi.fn() })),
    removeAllListeners: vi.fn(() => Promise.resolve()),
    getDeliveredNotifications: vi.fn(() => Promise.resolve({ notifications: [] })),
    removeDeliveredNotifications: vi.fn(() => Promise.resolve()),
    removeAllDeliveredNotifications: vi.fn(() => Promise.resolve()),
  },
}));

// Mock Capacitor Local Notifications
vi.mock('@capacitor/local-notifications', () => ({
  LocalNotifications: {
    requestPermissions: vi.fn(() => Promise.resolve({ display: 'granted' })),
    schedule: vi.fn(() => Promise.resolve()),
    cancel: vi.fn(() => Promise.resolve()),
    removeAllListeners: vi.fn(() => Promise.resolve()),
    addListener: vi.fn(() => Promise.resolve({ remove: vi.fn() })),
    getPending: vi.fn(() => Promise.resolve({ notifications: [] })),
  },
}));

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => ({})),
  getDoc: vi.fn(() => Promise.resolve({ exists: () => false })),
  setDoc: vi.fn(() => Promise.resolve()),
  updateDoc: vi.fn(() => Promise.resolve()),
  arrayUnion: vi.fn((arr) => arr),
  arrayRemove: vi.fn((arr) => arr),
}));

// Mock Firebase messaging
vi.mock('firebase/messaging', () => ({
  getMessaging: vi.fn(() => ({})),
  getToken: vi.fn(() => Promise.resolve('mock-fcm-token')),
  onMessage: vi.fn(() => () => {}),
  isSupported: vi.fn(() => Promise.resolve(true)),
}));

// Mock firebase config
vi.mock('../../config/firebase', () => ({
  db: {},
  messaging: {},
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

// Mock Notification API
Object.defineProperty(global, 'Notification', {
  value: class MockNotification {
    static permission = 'granted';
    static requestPermission = vi.fn(() => Promise.resolve('granted'));
    constructor(_title: string, _options?: NotificationOptions) {}
  },
  writable: true,
});

import {
  isNative,
  isWeb,
  initializeFCM,
  requestFCMToken,
  removeFCMToken,
  showBrowserNotification,
  initializeLocalNotifications,
  scheduleLocalNotification,
  cancelAllLocalNotifications,
  setupDailyReminder,
  getDailyReminderSettings,
  getContextualReminderMessage,
} from '../../services/pushNotifications';

describe('Push Notifications Service - Quality Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  describe('Platform Detection', () => {
    it('isNative is boolean', () => {
      expect(typeof isNative).toBe('boolean');
    });

    it('isWeb is boolean', () => {
      expect(typeof isWeb).toBe('boolean');
    });

    it('isNative and isWeb are mutually exclusive', () => {
      expect(isNative !== isWeb).toBe(true);
    });
  });

  describe('initializeFCM', () => {
    it('returns boolean', async () => {
      const result = await initializeFCM();
      expect(typeof result).toBe('boolean');
    });

    it('does not throw on web platform', async () => {
      await expect(initializeFCM()).resolves.not.toThrow();
    });

    it('can be called multiple times', async () => {
      await initializeFCM();
      await initializeFCM();
      await initializeFCM();
      // Should not throw
    });
  });

  describe('requestFCMToken', () => {
    it('returns string or null', async () => {
      const result = await requestFCMToken('user123');
      expect(result === null || typeof result === 'string').toBe(true);
    });

    it('handles empty userId', async () => {
      const result = await requestFCMToken('');
      expect(result === null || typeof result === 'string').toBe(true);
    });

    it('handles special characters in userId', async () => {
      const result = await requestFCMToken('user@test.com');
      expect(result === null || typeof result === 'string').toBe(true);
    });
  });

  describe('removeFCMToken', () => {
    it('resolves for valid parameters', async () => {
      await expect(removeFCMToken('user123', 'token123')).resolves.not.toThrow();
    });

    it('handles empty userId', async () => {
      await expect(removeFCMToken('', 'token123')).resolves.not.toThrow();
    });

    it('handles empty token', async () => {
      await expect(removeFCMToken('user123', '')).resolves.not.toThrow();
    });
  });

  describe('showBrowserNotification', () => {
    it('returns boolean', async () => {
      const result = await showBrowserNotification('Test Title', 'Test Body');
      expect(typeof result).toBe('boolean');
    });

    it('handles empty title', async () => {
      const result = await showBrowserNotification('', 'Body');
      expect(typeof result).toBe('boolean');
    });

    it('handles empty body', async () => {
      const result = await showBrowserNotification('Title', '');
      expect(typeof result).toBe('boolean');
    });

    it('handles notification options', async () => {
      const result = await showBrowserNotification('Title', 'Body', {
        icon: '/icon.png',
        badge: '/badge.png',
      });
      expect(typeof result).toBe('boolean');
    });

    it('handles very long title', async () => {
      const longTitle = 'A'.repeat(200);
      const result = await showBrowserNotification(longTitle, 'Body');
      expect(typeof result).toBe('boolean');
    });

    it('handles unicode in content', async () => {
      const result = await showBrowserNotification('🎉 Title', '中文 Body');
      expect(typeof result).toBe('boolean');
    });
  });

  describe('initializeLocalNotifications', () => {
    it('returns boolean', async () => {
      const result = await initializeLocalNotifications();
      expect(typeof result).toBe('boolean');
    });

    it('can be called multiple times', async () => {
      await initializeLocalNotifications();
      await initializeLocalNotifications();
      // Should not throw
    });
  });

  describe('scheduleLocalNotification', () => {
    it('handles basic notification', async () => {
      await expect(scheduleLocalNotification({
        id: 1,
        title: 'Test',
        body: 'Test body',
        scheduleAt: new Date(Date.now() + 60000),
      })).resolves.not.toThrow();
    });

    it('handles notification with all options', async () => {
      await expect(scheduleLocalNotification({
        id: 2,
        title: 'Full Test',
        body: 'Full body',
        scheduleAt: new Date(Date.now() + 60000),
        repeats: false,
      })).resolves.not.toThrow();
    });

    it('handles past date gracefully', async () => {
      await expect(scheduleLocalNotification({
        id: 3,
        title: 'Past',
        body: 'Past body',
        scheduleAt: new Date(Date.now() - 60000),
      })).resolves.not.toThrow();
    });

    it('handles very far future date', async () => {
      await expect(scheduleLocalNotification({
        id: 4,
        title: 'Future',
        body: 'Future body',
        scheduleAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      })).resolves.not.toThrow();
    });

    it('handles negative ID', async () => {
      await expect(scheduleLocalNotification({
        id: -1,
        title: 'Negative',
        body: 'Negative ID',
        scheduleAt: new Date(Date.now() + 60000),
      })).resolves.not.toThrow();
    });
  });

  describe('cancelAllLocalNotifications', () => {
    it('resolves without error', async () => {
      await expect(cancelAllLocalNotifications()).resolves.not.toThrow();
    });

    it('can be called multiple times', async () => {
      await cancelAllLocalNotifications();
      await cancelAllLocalNotifications();
      // Should not throw
    });
  });

  describe('setupDailyReminder', () => {
    it('handles enabled reminder', async () => {
      await expect(setupDailyReminder('user123', true, '09:00')).resolves.not.toThrow();
    });

    it('handles disabled reminder', async () => {
      await expect(setupDailyReminder('user123', false, '09:00')).resolves.not.toThrow();
    });

    it('handles various times', async () => {
      const times = ['00:00', '06:30', '12:00', '18:45', '23:59'];
      for (const time of times) {
        await expect(setupDailyReminder('user123', true, time)).resolves.not.toThrow();
      }
    });

    it('handles empty time string', async () => {
      await expect(setupDailyReminder('user123', true, '')).resolves.not.toThrow();
    });

    it('handles invalid time format gracefully', async () => {
      await expect(setupDailyReminder('user123', true, 'invalid')).resolves.not.toThrow();
    });
  });

  describe('getDailyReminderSettings', () => {
    it('returns object with enabled and time', () => {
      const result = getDailyReminderSettings();
      expect(typeof result).toBe('object');
      expect(typeof result.enabled).toBe('boolean');
      expect(typeof result.time).toBe('string');
    });

    it('time is valid format', () => {
      const result = getDailyReminderSettings();
      // Time should be HH:MM format
      expect(result.time).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  describe('getContextualReminderMessage', () => {
    it('returns object with title and body', () => {
      const result = getContextualReminderMessage();
      expect(typeof result).toBe('object');
      expect(typeof result.title).toBe('string');
      expect(typeof result.body).toBe('string');
    });

    it('title is non-empty', () => {
      const result = getContextualReminderMessage();
      expect(result.title.length).toBeGreaterThan(0);
    });

    it('body is non-empty', () => {
      const result = getContextualReminderMessage();
      expect(result.body.length).toBeGreaterThan(0);
    });

    it('returns consistent structure', () => {
      const result1 = getContextualReminderMessage();
      const result2 = getContextualReminderMessage();
      expect(Object.keys(result1)).toEqual(Object.keys(result2));
    });
  });
});
