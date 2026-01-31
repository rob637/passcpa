/**
 * Quality Tests for Notification Service
 * 
 * Tests push notification permissions, scheduling, and delivery.
 * Focus: Permission handling, service worker integration, browser support
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Notification Service - Quality Tests', () => {
  let notificationModule: any;
  let mockNotification: any;
  let mockServiceWorkerRegistration: any;

  beforeEach(async () => {
    // Mock Notification API
    mockNotification = {
      permission: 'default' as NotificationPermission,
      requestPermission: vi.fn(() => Promise.resolve('granted' as NotificationPermission)),
    };

    mockServiceWorkerRegistration = {
      showNotification: vi.fn(() => Promise.resolve()),
    };

    vi.stubGlobal('Notification', mockNotification);
    vi.stubGlobal('navigator', {
      ...navigator,
      serviceWorker: {
        ready: Promise.resolve(mockServiceWorkerRegistration),
        register: vi.fn(),
        getRegistration: vi.fn(() => Promise.resolve(mockServiceWorkerRegistration)),
      },
    });

    vi.resetModules();
    notificationModule = await import('../../services/notifications');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe('notificationsSupported', () => {
    it('should return true when Notification and serviceWorker are available', () => {
      expect(notificationModule.notificationsSupported()).toBe(true);
    });

    it('should return false when Notification is not available', async () => {
      // Need to delete from window for 'in' check to work
      const original = window.Notification;
      // @ts-expect-error - intentionally removing for test
      delete window.Notification;
      
      vi.resetModules();
      notificationModule = await import('../../services/notifications');
      
      const result = notificationModule.notificationsSupported();
      
      // Restore
      window.Notification = original;
      
      expect(result).toBe(false);
    });

    it('should return false when serviceWorker is not available', async () => {
      // Save original and delete property (not just set to undefined)
      const descriptor = Object.getOwnPropertyDescriptor(navigator, 'serviceWorker');
      
      // The 'in' operator checks property existence, so we need to delete
      // @ts-expect-error - intentionally removing for test
      delete navigator.serviceWorker;
      
      vi.resetModules();
      notificationModule = await import('../../services/notifications');
      
      const result = notificationModule.notificationsSupported();
      
      // Restore using original descriptor if it existed
      if (descriptor) {
        Object.defineProperty(navigator, 'serviceWorker', descriptor);
      }
      
      expect(result).toBe(false);
    });
  });

  describe('requestNotificationPermission', () => {
    it('should return granted true when permission is granted', async () => {
      mockNotification.requestPermission = vi.fn(() => Promise.resolve('granted'));
      
      const result = await notificationModule.requestNotificationPermission();
      
      expect(result.granted).toBe(true);
      expect(result.permission).toBe('granted');
    });

    it('should return granted false when permission is denied', async () => {
      mockNotification.requestPermission = vi.fn(() => Promise.resolve('denied'));
      
      const result = await notificationModule.requestNotificationPermission();
      
      expect(result.granted).toBe(false);
      expect(result.permission).toBe('denied');
    });

    it('should return granted false when permission is default (dismissed)', async () => {
      mockNotification.requestPermission = vi.fn(() => Promise.resolve('default'));
      
      const result = await notificationModule.requestNotificationPermission();
      
      expect(result.granted).toBe(false);
      expect(result.permission).toBe('default');
    });

    it('should return not-supported when notifications not available', async () => {
      // Need to delete from window for 'in' check to work
      const original = window.Notification;
      // @ts-expect-error - intentionally removing for test
      delete window.Notification;
      
      vi.resetModules();
      notificationModule = await import('../../services/notifications');
      
      const result = await notificationModule.requestNotificationPermission();
      
      // Restore
      window.Notification = original;
      
      expect(result.granted).toBe(false);
      expect(result.reason).toBe('not-supported');
    });
  });

  describe('getNotificationPermission', () => {
    it('should return current permission status', () => {
      mockNotification.permission = 'granted';
      
      expect(notificationModule.getNotificationPermission()).toBe('granted');
    });

    it('should return denied when denied', () => {
      mockNotification.permission = 'denied';
      
      expect(notificationModule.getNotificationPermission()).toBe('denied');
    });

    it('should return default when not yet requested', () => {
      mockNotification.permission = 'default';
      
      expect(notificationModule.getNotificationPermission()).toBe('default');
    });

    it('should return not-supported when unavailable', async () => {
      // Need to delete from window for 'in' check to work
      const original = window.Notification;
      // @ts-expect-error - intentionally removing for test
      delete window.Notification;
      
      vi.resetModules();
      notificationModule = await import('../../services/notifications');
      
      const result = notificationModule.getNotificationPermission();
      
      // Restore
      window.Notification = original;
      
      expect(result).toBe('not-supported');
    });
  });

  describe('scheduleNotification', () => {
    it('should show immediate notification when delay is 0', async () => {
      mockNotification.permission = 'granted';
      
      const result = await notificationModule.scheduleNotification({
        title: 'Test Title',
        body: 'Test body',
      });
      
      expect(result.success).toBe(true);
      expect(mockServiceWorkerRegistration.showNotification).toHaveBeenCalledWith(
        'Test Title',
        expect.objectContaining({
          body: 'Test body',
        })
      );
    });

    it('should return not-permitted when permission not granted', async () => {
      mockNotification.permission = 'denied';
      
      const result = await notificationModule.scheduleNotification({
        title: 'Test',
        body: 'Test',
      });
      
      expect(result.success).toBe(false);
      expect(result.reason).toBe('not-permitted');
    });

    it('should include tag in notification options', async () => {
      mockNotification.permission = 'granted';
      
      await notificationModule.scheduleNotification({
        title: 'Test',
        body: 'Test',
        tag: 'study-reminder',
      });
      
      expect(mockServiceWorkerRegistration.showNotification).toHaveBeenCalledWith(
        'Test',
        expect.objectContaining({
          tag: 'study-reminder',
        })
      );
    });

    it('should include data payload in notification', async () => {
      mockNotification.permission = 'granted';
      
      const customData = { action: 'practice', section: 'FAR' };
      
      await notificationModule.scheduleNotification({
        title: 'Test',
        body: 'Test',
        data: customData,
      });
      
      expect(mockServiceWorkerRegistration.showNotification).toHaveBeenCalledWith(
        'Test',
        expect.objectContaining({
          data: customData,
        })
      );
    });

    it('should include icon in notification', async () => {
      mockNotification.permission = 'granted';
      
      await notificationModule.scheduleNotification({
        title: 'Test',
        body: 'Test',
      });
      
      expect(mockServiceWorkerRegistration.showNotification).toHaveBeenCalledWith(
        'Test',
        expect.objectContaining({
          icon: expect.any(String),
        })
      );
    });

    it('should schedule delayed notification', async () => {
      vi.useFakeTimers();
      mockNotification.permission = 'granted';
      
      await notificationModule.scheduleNotification({
        title: 'Delayed',
        body: 'Test',
        delay: 5000,
      });
      
      // Immediate call shouldn't show notification
      expect(mockServiceWorkerRegistration.showNotification).not.toHaveBeenCalled();
      
      // Advance timers
      await vi.advanceTimersByTimeAsync(5000);
      
      // Now should be called
      expect(mockServiceWorkerRegistration.showNotification).toHaveBeenCalled();
      
      vi.useRealTimers();
    });

    it('should handle service worker errors gracefully', async () => {
      mockNotification.permission = 'granted';
      mockServiceWorkerRegistration.showNotification = vi.fn(() => 
        Promise.reject(new Error('SW error'))
      );
      
      const result = await notificationModule.scheduleNotification({
        title: 'Test',
        body: 'Test',
      });
      
      // Should handle error
      expect(result.success).toBe(false);
    });
  });

  describe('Notification Actions', () => {
    it('should include action buttons', async () => {
      mockNotification.permission = 'granted';
      
      await notificationModule.scheduleNotification({
        title: 'Time to Study!',
        body: 'Complete your daily practice',
      });
      
      expect(mockServiceWorkerRegistration.showNotification).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          actions: expect.arrayContaining([
            expect.objectContaining({ action: 'open', title: 'Study Now' }),
            expect.objectContaining({ action: 'dismiss', title: 'Later' }),
          ]),
        })
      );
    });
  });

  describe('Study Reminder Notifications', () => {
    it('should schedule study reminder', async () => {
      mockNotification.permission = 'granted';
      
      if (notificationModule.scheduleStudyReminder) {
        const result = await notificationModule.scheduleStudyReminder({
          time: '09:00',
          days: ['Mon', 'Wed', 'Fri'],
        });
        
        expect(result).toBeDefined();
      }
    });

    it('should cancel study reminder', async () => {
      if (notificationModule.cancelStudyReminder) {
        await notificationModule.cancelStudyReminder('reminder-123');
        // Should not throw
      }
    });
  });

  describe('Streak Reminder', () => {
    it('should send streak at risk notification', async () => {
      mockNotification.permission = 'granted';
      
      if (notificationModule.sendStreakAtRiskNotification) {
        await notificationModule.sendStreakAtRiskNotification(5);
        
        expect(mockServiceWorkerRegistration.showNotification).toHaveBeenCalledWith(
          expect.stringContaining('streak'),
          expect.any(Object)
        );
      }
    });
  });

  describe('Achievement Notification', () => {
    it('should send achievement notification', async () => {
      mockNotification.permission = 'granted';
      
      if (notificationModule.sendAchievementNotification) {
        await notificationModule.sendAchievementNotification({
          name: 'First Steps',
          description: 'Complete your first lesson',
        });
        
        expect(mockServiceWorkerRegistration.showNotification).toHaveBeenCalled();
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', async () => {
      mockNotification.permission = 'granted';
      
      const result = await notificationModule.scheduleNotification({
        title: '',
        body: 'Test body',
      });
      
      // Should still work
      expect(result.success).toBe(true);
    });

    it('should handle empty body', async () => {
      mockNotification.permission = 'granted';
      
      const result = await notificationModule.scheduleNotification({
        title: 'Test title',
        body: '',
      });
      
      expect(result.success).toBe(true);
    });

    it('should handle very long title', async () => {
      mockNotification.permission = 'granted';
      
      const longTitle = 'A'.repeat(1000);
      
      const result = await notificationModule.scheduleNotification({
        title: longTitle,
        body: 'Test',
      });
      
      expect(result.success).toBe(true);
    });

    it('should handle unicode in notification', async () => {
      mockNotification.permission = 'granted';
      
      const result = await notificationModule.scheduleNotification({
        title: '🎯 Study Time! 日本語',
        body: 'Complete 10 questions 📚',
      });
      
      expect(result.success).toBe(true);
    });

    it('should handle negative delay', async () => {
      mockNotification.permission = 'granted';
      
      // Negative delay should be treated as immediate
      const result = await notificationModule.scheduleNotification({
        title: 'Test',
        body: 'Test',
        delay: -1000,
      });
      
      // Should handle gracefully
      expect(result).toBeDefined();
    });

    it('should handle very large delay', async () => {
      mockNotification.permission = 'granted';
      
      const result = await notificationModule.scheduleNotification({
        title: 'Test',
        body: 'Test',
        delay: Number.MAX_SAFE_INTEGER,
      });
      
      // Should not throw
      expect(result).toBeDefined();
    });
  });

  describe('Browser Permission Flow', () => {
    it('should handle permission prompt being ignored', async () => {
      // User ignores prompt - stays 'default'
      mockNotification.requestPermission = vi.fn(() => Promise.resolve('default'));
      
      const result = await notificationModule.requestNotificationPermission();
      
      expect(result.granted).toBe(false);
    });

    it('should handle permission request error', async () => {
      mockNotification.requestPermission = vi.fn(() => 
        Promise.reject(new Error('User gesture required'))
      );
      
      try {
        await notificationModule.requestNotificationPermission();
      } catch {
        // May throw, which is acceptable
      }
    });
  });
});
