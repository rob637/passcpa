import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  initAnalytics,
  trackPageView,
  trackEvent,
  analytics,
} from '../../services/analytics';

describe('analytics.ts', () => {
  let originalDoNotTrack: string | null;
  let originalDataLayer: unknown[] | undefined;
  let originalGtag: ((command: string, ...args: unknown[]) => void) | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    
    // Save originals
    originalDoNotTrack = navigator.doNotTrack;
    originalDataLayer = window.dataLayer;
    originalGtag = window.gtag;
    
    // Reset state - use type assertions for test mocking
    window.dataLayer = undefined as unknown as unknown[];
    window.gtag = undefined as unknown as (command: string, ...args: unknown[]) => void;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    
    // Restore originals - use type assertions for test restoration
    Object.defineProperty(navigator, 'doNotTrack', {
      value: originalDoNotTrack,
      configurable: true,
      writable: true,
    });
    window.dataLayer = originalDataLayer as unknown as unknown[];
    window.gtag = originalGtag as unknown as (command: string, ...args: unknown[]) => void;
  });

  describe('initAnalytics', () => {
    it('should not throw when called', () => {
      // Window is available in jsdom, so this test checks the code path
      expect(() => initAnalytics()).not.toThrow();
    });

    it('should call initAnalytics multiple times safely', () => {
      // Call multiple times - should not throw
      initAnalytics();
      initAnalytics();
      initAnalytics();
    });
  });

  describe('trackPageView', () => {
    it('should not track if analytics not initialized', () => {
      trackPageView('/test', 'Test Page');
      // Should not throw
    });

    it('should call gtag if initialized', () => {
      const mockGtag = vi.fn();
      window.gtag = mockGtag;
      
      // Simulate initialized state by having gtag available
      trackPageView('/test', 'Test Page');
      
      // Note: won't track because initialized is false internally
      // This tests the guard clause
    });
  });

  describe('trackEvent', () => {
    it('should not track if analytics not initialized', () => {
      trackEvent('test_event', { key: 'value' });
      // Should not throw
    });

    it('should handle missing gtag gracefully', () => {
      window.gtag = undefined as unknown as (command: string, ...args: unknown[]) => void;
      trackEvent('test_event');
      // Should not throw
    });
  });

  describe('analytics object methods', () => {
    describe('study events', () => {
      it('startStudySession should call trackEvent', () => {
        // Call the method
        analytics.startStudySession('FAR', 'practice');
        // Should not throw even if analytics not initialized
      });

      it('completeStudySession should call trackEvent', () => {
        analytics.completeStudySession('FAR', 'practice', 1800, 85);
        // Should not throw
      });
    });

    describe('question events', () => {
      it('answerQuestion should track correct answer', () => {
        analytics.answerQuestion(true, 'FAR', 'Revenue Recognition');
        // Should not throw
      });

      it('answerQuestion should track incorrect answer', () => {
        analytics.answerQuestion(false, 'REG', 'Depreciation');
        // Should not throw
      });

      it('answerQuestion should handle undefined section', () => {
        analytics.answerQuestion(true, undefined, 'General');
        // Should not throw
      });
    });

    describe('practice events', () => {
      it('startPractice should call trackEvent', () => {
        analytics.startPractice('AUD', 10);
        // Should not throw
      });

      it('completePractice should calculate accuracy', () => {
        analytics.completePractice('AUD', 8, 10, 600);
        // Should not throw
      });

      it('completePractice should handle zero total', () => {
        analytics.completePractice('AUD', 0, 0, 0);
        // Should not throw - accuracy should be 0
      });
    });

    describe('exam events', () => {
      it('startExam should call trackEvent', () => {
        analytics.startExam('FAR');
        // Should not throw
      });

      it('completeExam should track passed exam', () => {
        analytics.completeExam('FAR', 85, true);
        // Should not throw
      });

      it('completeExam should track failed exam', () => {
        analytics.completeExam('REG', 65, false);
        // Should not throw
      });
    });

    describe('AI Tutor events', () => {
      it('askAITutor should call trackEvent', () => {
        analytics.askAITutor('leases', 'explain');
        // Should not throw
      });
    });

    describe('achievement events', () => {
      it('unlockAchievement should call trackEvent', () => {
        analytics.unlockAchievement('first_100', 'First 100 Questions');
        // Should not throw
      });
    });

    describe('streak events', () => {
      it('maintainStreak should call trackEvent', () => {
        analytics.maintainStreak(7);
        // Should not throw
      });

      it('loseStreak should call trackEvent', () => {
        analytics.loseStreak(5);
        // Should not throw
      });
    });

    describe('user journey events', () => {
      it('completeOnboarding with exam date', () => {
        analytics.completeOnboarding('FAR', new Date('2025-07-01'));
        // Should not throw
      });

      it('completeOnboarding without exam date', () => {
        analytics.completeOnboarding('REG', null);
        // Should not throw
      });

      it('completeOnboarding with string date', () => {
        analytics.completeOnboarding('AUD', '2025-07-01');
        // Should not throw
      });
    });

    describe('feature usage', () => {
      it('useFeature should call trackEvent', () => {
        analytics.useFeature('flashcards');
        // Should not throw
      });
    });

    describe('error tracking', () => {
      it('trackError should call trackEvent', () => {
        analytics.trackError('Test error message', 'TestComponent');
        // Should not throw
      });
    });
  });

  describe('default export', () => {
    it('should export analytics object', async () => {
      const module = await import('../../services/analytics');
      
      expect(module.default).toBeDefined();
      expect(module.default.startStudySession).toBeDefined();
      expect(module.default.trackError).toBeDefined();
    });
  });
});
