import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  notificationsSupported,
  requestNotificationPermission,
  getNotificationPermission,
  scheduleNotification,
  getContextualReminder,
  setupReminders,
  getDailyReminderSettings,
} from '../../services/notifications';

describe('notifications.ts', () => {
  // Store originals
  const originalNotification = global.Notification;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock localStorage
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    
    // Mock console.error
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('notificationsSupported', () => {
    it('should return true when Notification and serviceWorker are available', () => {
      // @ts-ignore
      global.Notification = vi.fn();
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {},
        configurable: true,
      });

      expect(notificationsSupported()).toBe(true);
    });

    it('should return false when Notification is not available', () => {
      // @ts-ignore
      delete global.Notification;

      expect(notificationsSupported()).toBe(false);
      
      // Restore
      global.Notification = originalNotification;
    });
  });

  describe('getNotificationPermission', () => {
    it('should return "not-supported" when notifications are not supported', () => {
      // @ts-ignore
      delete global.Notification;

      expect(getNotificationPermission()).toBe('not-supported');
      
      // Restore
      global.Notification = originalNotification;
    });

    it('should return current permission when supported', () => {
      // @ts-ignore
      global.Notification = { permission: 'granted' };
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {},
        configurable: true,
      });

      expect(getNotificationPermission()).toBe('granted');
    });

    it('should return denied when permission is denied', () => {
      // @ts-ignore
      global.Notification = { permission: 'denied' };
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {},
        configurable: true,
      });

      expect(getNotificationPermission()).toBe('denied');
    });

    it('should return default when permission is default', () => {
      // @ts-ignore
      global.Notification = { permission: 'default' };
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {},
        configurable: true,
      });

      expect(getNotificationPermission()).toBe('default');
    });
  });

  describe('requestNotificationPermission', () => {
    it('should return not-supported when notifications not available', async () => {
      // @ts-ignore
      delete global.Notification;

      const result = await requestNotificationPermission();
      
      expect(result.granted).toBe(false);
      expect(result.reason).toBe('not-supported');
      
      // Restore
      global.Notification = originalNotification;
    });

    it('should request permission and return granted when allowed', async () => {
      // @ts-ignore
      global.Notification = {
        permission: 'default',
        requestPermission: vi.fn().mockResolvedValue('granted'),
      };
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {},
        configurable: true,
      });

      const result = await requestNotificationPermission();
      
      expect(result.granted).toBe(true);
      expect(result.permission).toBe('granted');
    });

    it('should return not granted when denied', async () => {
      // @ts-ignore
      global.Notification = {
        permission: 'default',
        requestPermission: vi.fn().mockResolvedValue('denied'),
      };
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {},
        configurable: true,
      });

      const result = await requestNotificationPermission();
      
      expect(result.granted).toBe(false);
      expect(result.permission).toBe('denied');
    });
  });

  describe('scheduleNotification', () => {
    it('should return not-permitted when notifications not supported', async () => {
      // @ts-ignore
      delete global.Notification;

      const result = await scheduleNotification({
        title: 'Test',
        body: 'Test body',
      });
      
      expect(result.success).toBe(false);
      expect(result.reason).toBe('not-permitted');
      
      // Restore
      global.Notification = originalNotification;
    });

    it('should return not-permitted when permission not granted', async () => {
      // @ts-ignore
      global.Notification = { permission: 'denied' };
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {},
        configurable: true,
      });

      const result = await scheduleNotification({
        title: 'Test',
        body: 'Test body',
      });
      
      expect(result.success).toBe(false);
      expect(result.reason).toBe('not-permitted');
    });

    it('should schedule immediate notification', async () => {
      const showNotificationMock = vi.fn().mockResolvedValue(undefined);
      
      // @ts-ignore
      global.Notification = { permission: 'granted' };
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          ready: Promise.resolve({
            showNotification: showNotificationMock,
          }),
        },
        configurable: true,
      });

      const result = await scheduleNotification({
        title: 'Test',
        body: 'Test body',
        tag: 'test-tag',
      });
      
      expect(result.success).toBe(true);
      expect(showNotificationMock).toHaveBeenCalledWith('Test', expect.objectContaining({
        body: 'Test body',
        tag: 'test-tag',
      }));
    });

    it('should schedule delayed notification', async () => {
      vi.useFakeTimers();
      const showNotificationMock = vi.fn().mockResolvedValue(undefined);
      
      // @ts-ignore
      global.Notification = { permission: 'granted' };
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          ready: Promise.resolve({
            showNotification: showNotificationMock,
          }),
        },
        configurable: true,
      });

      const result = await scheduleNotification({
        title: 'Test',
        body: 'Test body',
        delay: 5000,
      });
      
      expect(result.success).toBe(true);
      expect(result.scheduled).toBe(true);
      
      // Notification should not be shown yet
      expect(showNotificationMock).not.toHaveBeenCalled();
      
      // Advance time
      await vi.advanceTimersByTimeAsync(5000);
      
      expect(showNotificationMock).toHaveBeenCalled();
      
      vi.useRealTimers();
    });

    it('should handle notification errors', async () => {
      // @ts-ignore
      global.Notification = { permission: 'granted' };
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          ready: Promise.resolve({
            showNotification: vi.fn().mockRejectedValue(new Error('Test error')),
          }),
        },
        configurable: true,
      });

      const result = await scheduleNotification({
        title: 'Test',
        body: 'Test body',
      });
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Test error');
    });
  });

  describe('getContextualReminder', () => {
    it('should return a message with title and body', () => {
      const reminder = getContextualReminder();
      
      expect(reminder).toHaveProperty('title');
      expect(reminder).toHaveProperty('body');
      expect(typeof reminder.title).toBe('string');
      expect(typeof reminder.body).toBe('string');
    });

    it('should return morning message in morning hours', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 0, 15, 8, 0)); // Monday 8 AM
      
      const reminder = getContextualReminder();
      
      // Should be one of the morning messages
      expect(reminder.title).toMatch(/morning|rise|motivation/i);
      
      vi.useRealTimers();
    });

    it('should return afternoon message in afternoon hours', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 0, 15, 14, 0)); // Monday 2 PM
      
      const reminder = getContextualReminder();
      
      // Should be one of the afternoon messages
      expect(reminder.title).toMatch(/afternoon|quiz|power/i);
      
      vi.useRealTimers();
    });

    it('should return evening message in evening hours', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 0, 15, 20, 0)); // Monday 8 PM
      
      const reminder = getContextualReminder();
      
      // Should be one of the evening messages
      expect(reminder.title).toMatch(/evening|night|sleep/i);
      
      vi.useRealTimers();
    });

    it('should return weekend message on weekends', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 0, 13, 10, 0)); // Saturday 10 AM
      
      const reminder = getContextualReminder();
      
      // Should be one of the weekend messages
      expect(reminder.title).toMatch(/weekend|gains|prize/i);
      
      vi.useRealTimers();
    });

    it('should return weekend message on Sunday', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 0, 14, 10, 0)); // Sunday 10 AM
      
      const reminder = getContextualReminder();
      
      // Should be one of the weekend messages
      expect(reminder.title).toMatch(/weekend|gains|prize/i);
      
      vi.useRealTimers();
    });
  });

  describe('getDailyReminderSettings', () => {
    it('should return default time of 09:00 when not set', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
      
      const settings = getDailyReminderSettings();
      
      expect(settings.time).toBe('09:00');
    });

    it('should return enabled false when not set', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

      const settings = getDailyReminderSettings();
      
      expect(settings.enabled).toBe(false);
    });

    it('should have time property', () => {
      const settings = getDailyReminderSettings();
      
      expect(settings).toHaveProperty('time');
      expect(settings).toHaveProperty('enabled');
    });
  });

  describe('setupReminders', () => {
    it('should return true when disabling reminders', async () => {
      const result = await setupReminders({ enabled: false, time: '09:00' });
      
      expect(result).toBe(true);
    });

    it('should return false when permission is denied', async () => {
      // @ts-ignore
      global.Notification = {
        permission: 'default',
        requestPermission: vi.fn().mockResolvedValue('denied'),
      };
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {},
        configurable: true,
      });

      const result = await setupReminders({ enabled: true, time: '09:00' });
      
      expect(result).toBe(false);
    });

    it('should schedule reminder when enabled and permitted', async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 0, 15, 8, 0)); // 8 AM
      
      const showNotificationMock = vi.fn().mockResolvedValue(undefined);
      
      // @ts-ignore
      global.Notification = {
        permission: 'default',
        requestPermission: vi.fn().mockResolvedValue('granted'),
      };
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          ready: Promise.resolve({
            showNotification: showNotificationMock,
          }),
        },
        configurable: true,
      });

      // Then set permission to granted for scheduleNotification check
      // @ts-ignore
      global.Notification.permission = 'granted';

      const result = await setupReminders({ enabled: true, time: '09:00' });
      
      expect(result).toBe(true);
      
      // Advance past the scheduled time
      await vi.advanceTimersByTimeAsync(3600000); // 1 hour
      
      expect(showNotificationMock).toHaveBeenCalled();
      
      vi.useRealTimers();
    });

    it('should schedule for next day when time has passed', async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 0, 15, 10, 0)); // 10 AM
      
      const showNotificationMock = vi.fn().mockResolvedValue(undefined);
      
      // @ts-ignore
      global.Notification = {
        permission: 'granted',
        requestPermission: vi.fn().mockResolvedValue('granted'),
      };
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          ready: Promise.resolve({
            showNotification: showNotificationMock,
          }),
        },
        configurable: true,
      });

      const result = await setupReminders({ enabled: true, time: '09:00' }); // 9 AM, already passed
      
      expect(result).toBe(true);
      
      // Should not show immediately since it's scheduled for next day
      expect(showNotificationMock).not.toHaveBeenCalled();
      
      vi.useRealTimers();
    });
  });
});
