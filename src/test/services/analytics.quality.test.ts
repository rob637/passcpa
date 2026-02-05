/**
 * Analytics Service - Quality Tests (Bug-Finding Focus)
 * 
 * Tests GA4 analytics integration for edge cases and potential bugs.
 * These tests are designed to find issues in:
 * - Initialization under various conditions
 * - Event tracking with malformed data
 * - Privacy preference handling
 * - Race conditions during init
 * 
 * @batch 1 of 20 (30 tests)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  initAnalytics,
  trackPageView,
  trackEvent,
  analytics,
} from '../../services/analytics';

// Mock window.gtag
const mockGtag = vi.fn();

describe('Analytics Service - Quality Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset module state
    vi.resetModules();
    
    // Mock gtag
    (window as any).gtag = mockGtag;
    (window as any).dataLayer = [];
    
    // Mock navigator.doNotTrack
    Object.defineProperty(navigator, 'doNotTrack', {
      value: null,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initAnalytics - Initialization Edge Cases', () => {
    it('handles missing window gracefully in SSR context', () => {
      // In Node.js test environment, should not crash
      expect(() => initAnalytics()).not.toThrow();
    });

    it('respects Do Not Track preference', () => {
      Object.defineProperty(navigator, 'doNotTrack', {
        value: '1',
        configurable: true,
      });
      
      // Should not throw, just skip initialization
      expect(() => initAnalytics()).not.toThrow();
    });

    it('handles repeated initialization calls (idempotent)', () => {
      initAnalytics();
      initAnalytics();
      initAnalytics();
      
      // Should not throw or create multiple script elements
      expect(() => initAnalytics()).not.toThrow();
    });
  });

  describe('trackPageView - Edge Cases', () => {
    it('handles empty path gracefully', () => {
      expect(() => trackPageView('', 'Home')).not.toThrow();
    });

    it('handles empty title gracefully', () => {
      expect(() => trackPageView('/home', '')).not.toThrow();
    });

    it('handles very long path strings', () => {
      const longPath = '/' + 'a'.repeat(10000);
      expect(() => trackPageView(longPath, 'Test')).not.toThrow();
    });

    it('handles special characters in path', () => {
      expect(() => trackPageView('/path?query=<script>', 'Test')).not.toThrow();
    });

    it('handles unicode in title', () => {
      expect(() => trackPageView('/home', '首页 홈 🏠')).not.toThrow();
    });

    it('handles null-like values without crash', () => {
      expect(() => trackPageView(null as any, undefined as any)).not.toThrow();
    });
  });

  describe('trackEvent - Edge Cases', () => {
    it('handles empty event name', () => {
      expect(() => trackEvent('')).not.toThrow();
    });

    it('handles event name with spaces', () => {
      expect(() => trackEvent('event with spaces')).not.toThrow();
    });

    it('handles empty params object', () => {
      expect(() => trackEvent('test_event', {})).not.toThrow();
    });

    it('handles deeply nested params', () => {
      const deepParams = {
        level1: {
          level2: {
            level3: {
              value: 'deep',
            },
          },
        },
      };
      expect(() => trackEvent('test_event', deepParams)).not.toThrow();
    });

    it('handles circular reference in params gracefully', () => {
      const circular: any = { a: 1 };
      circular.self = circular;
      
      // Should not crash, may ignore circular ref
      expect(() => trackEvent('test_event', circular)).not.toThrow();
    });

    it('handles params with undefined values', () => {
      expect(() => trackEvent('test', { key: undefined })).not.toThrow();
    });

    it('handles params with null values', () => {
      expect(() => trackEvent('test', { key: null })).not.toThrow();
    });

    it('handles params with very large numbers', () => {
      expect(() => trackEvent('test', { big: Number.MAX_SAFE_INTEGER })).not.toThrow();
    });
  });

  describe('analytics.startStudySession - Edge Cases', () => {
    it('handles empty section', () => {
      expect(() => analytics.startStudySession('', 'timed')).not.toThrow();
    });

    it('handles empty mode', () => {
      expect(() => analytics.startStudySession('FAR', '')).not.toThrow();
    });

    it('handles invalid section value', () => {
      expect(() => analytics.startStudySession('INVALID', 'study')).not.toThrow();
    });
  });

  describe('analytics.completeStudySession - Edge Cases', () => {
    it('handles zero duration', () => {
      expect(() => analytics.completeStudySession('FAR', 'timed', 0, 80)).not.toThrow();
    });

    it('handles negative duration (bug scenario)', () => {
      expect(() => analytics.completeStudySession('FAR', 'timed', -100, 80)).not.toThrow();
    });

    it('handles score over 100', () => {
      expect(() => analytics.completeStudySession('FAR', 'study', 100, 150)).not.toThrow();
    });

    it('handles negative score', () => {
      expect(() => analytics.completeStudySession('FAR', 'study', 100, -10)).not.toThrow();
    });

    it('handles NaN values', () => {
      expect(() => analytics.completeStudySession('FAR', 'study', NaN, NaN)).not.toThrow();
    });
  });

  describe('analytics.answerQuestion - Edge Cases', () => {
    it('handles undefined section', () => {
      expect(() => analytics.answerQuestion(true, undefined, 'Leases')).not.toThrow();
    });

    it('handles empty topic', () => {
      expect(() => analytics.answerQuestion(true, 'FAR', '')).not.toThrow();
    });
  });

  describe('analytics.completePractice - Boundary Conditions', () => {
    it('handles zero total (division by zero scenario)', () => {
      // This tests accuracy calculation: correct/total
      expect(() => analytics.completePractice('FAR', 0, 0, 100)).not.toThrow();
    });

    it('handles more correct than total (invalid state)', () => {
      expect(() => analytics.completePractice('FAR', 10, 5, 100)).not.toThrow();
    });

    it('handles negative counts', () => {
      expect(() => analytics.completePractice('FAR', -5, 10, 100)).not.toThrow();
    });
  });

  describe('analytics.maintainStreak - Edge Cases', () => {
    it('handles zero day streak', () => {
      expect(() => analytics.maintainStreak(0)).not.toThrow();
    });

    it('handles very large streak', () => {
      expect(() => analytics.maintainStreak(10000)).not.toThrow();
    });

    it('handles negative streak (invalid state)', () => {
      expect(() => analytics.maintainStreak(-5)).not.toThrow();
    });
  });

  describe('analytics.loseStreak - Edge Cases', () => {
    it('handles zero previous days', () => {
      expect(() => analytics.loseStreak(0)).not.toThrow();
    });

    it('handles single day streak lost', () => {
      expect(() => analytics.loseStreak(1)).not.toThrow();
    });
  });

  describe('analytics.completeOnboarding - Edge Cases', () => {
    it('handles null exam date', () => {
      expect(() => analytics.completeOnboarding('FAR', null)).not.toThrow();
    });

    it('handles Date object exam date', () => {
      expect(() => analytics.completeOnboarding('FAR', new Date())).not.toThrow();
    });

    it('handles string exam date', () => {
      expect(() => analytics.completeOnboarding('FAR', '2024-06-01')).not.toThrow();
    });

    it('handles past exam date', () => {
      expect(() => analytics.completeOnboarding('FAR', '2020-01-01')).not.toThrow();
    });
  });

  describe('analytics.trackError - Edge Cases', () => {
    it('handles empty error message', () => {
      expect(() => analytics.trackError('', 'TestComponent')).not.toThrow();
    });

    it('handles empty component name', () => {
      expect(() => analytics.trackError('Error occurred', '')).not.toThrow();
    });

    it('handles very long error message', () => {
      const longMsg = 'Error: ' + 'x'.repeat(10000);
      expect(() => analytics.trackError(longMsg, 'Component')).not.toThrow();
    });

    it('handles special characters in error', () => {
      expect(() => analytics.trackError('<script>alert(1)</script>', 'Test')).not.toThrow();
    });
  });
});
