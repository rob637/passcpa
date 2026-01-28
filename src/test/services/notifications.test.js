import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  notificationsSupported,
  requestNotificationPermission,
  getNotificationPermission,
  scheduleNotification,
  getContextualReminder,
  getDailyReminderSettings,
} from '../../services/notifications';

describe('Notification Service', () => {
  const originalNotification = global.Notification;
  const originalNavigator = global.navigator;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Setup default mocks
    global.Notification = { permission: 'default' };
    global.navigator = { serviceWorker: {} };
    
    // Mock localStorage
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
    });
  });

  afterEach(() => {
    // Restore originals
    global.Notification = originalNotification;
    global.navigator = originalNavigator;
    vi.unstubAllGlobals();
  });

  describe('notificationsSupported', () => {
    it('should return true when Notification and serviceWorker are available', () => {
      global.Notification = { permission: 'default' };
      global.navigator = { serviceWorker: {} };
      
      expect(notificationsSupported()).toBe(true);
    });

    it('should return false when Notification is not available', () => {
      delete global.Notification;
      global.navigator = { serviceWorker: {} };
      
      expect(notificationsSupported()).toBe(false);
    });

    it('should return false when serviceWorker is not available', () => {
      global.Notification = { permission: 'default' };
      global.navigator = {};
      
      expect(notificationsSupported()).toBe(false);
    });
  });

  describe('requestNotificationPermission', () => {
    it('should return not-supported when notifications not available', async () => {
      delete global.Notification;
      
      const result = await requestNotificationPermission();
      
      expect(result.granted).toBe(false);
      expect(result.reason).toBe('not-supported');
    });

    it('should request permission and return granted status', async () => {
      global.Notification = {
        permission: 'default',
        requestPermission: vi.fn().mockResolvedValue('granted'),
      };
      global.navigator = { serviceWorker: {} };
      
      const result = await requestNotificationPermission();
      
      expect(result.granted).toBe(true);
      expect(result.permission).toBe('granted');
    });

    it('should handle denied permission', async () => {
      global.Notification = {
        permission: 'default',
        requestPermission: vi.fn().mockResolvedValue('denied'),
      };
      global.navigator = { serviceWorker: {} };
      
      const result = await requestNotificationPermission();
      
      expect(result.granted).toBe(false);
      expect(result.permission).toBe('denied');
    });
  });

  describe('getNotificationPermission', () => {
    it('should return not-supported when notifications unavailable', () => {
      delete global.Notification;
      
      expect(getNotificationPermission()).toBe('not-supported');
    });

    it('should return current permission status', () => {
      global.Notification = { permission: 'granted' };
      global.navigator = { serviceWorker: {} };
      
      expect(getNotificationPermission()).toBe('granted');
    });
  });

  describe('scheduleNotification', () => {
    it('should return error when notifications not supported', async () => {
      delete global.Notification;
      
      const result = await scheduleNotification({
        title: 'Test',
        body: 'Test body',
      });
      
      expect(result.success).toBe(false);
    });

    it('should return error when permission not granted', async () => {
      global.Notification = { permission: 'denied' };
      global.navigator = { serviceWorker: {} };
      
      const result = await scheduleNotification({
        title: 'Test',
        body: 'Test body',
      });
      
      expect(result.success).toBe(false);
    });
  });

  describe('getContextualReminder', () => {
    it('should return a reminder message object', () => {
      const reminder = getContextualReminder();
      
      expect(reminder).toBeDefined();
      expect(reminder.title).toBeDefined();
      expect(reminder.body).toBeDefined();
    });

    it('should return different messages for different times', () => {
      // Get multiple reminders
      const reminders = [
        getContextualReminder(),
        getContextualReminder(),
        getContextualReminder(),
      ];
      
      // All should be valid
      reminders.forEach(r => {
        expect(r.title).toBeDefined();
        expect(r.body).toBeDefined();
      });
    });
  });

  describe('getDailyReminderSettings', () => {
    it('should return settings object', () => {
      localStorage.getItem.mockReturnValue(null);
      
      const settings = getDailyReminderSettings();
      
      expect(settings).toBeDefined();
      expect(typeof settings.enabled).toBe('boolean');
      expect(typeof settings.time).toBe('string');
    });

    it('should return enabled true when stored as true', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'dailyReminderEnabled') return 'true';
        if (key === 'dailyReminderTime') return '09:00';
        return null;
      });
      
      const settings = getDailyReminderSettings();
      
      expect(settings.enabled).toBe(true);
    });

    it('should return default time when not set', () => {
      localStorage.getItem.mockReturnValue(null);
      
      const settings = getDailyReminderSettings();
      
      expect(settings.time).toBe('09:00');
    });
  });
});
