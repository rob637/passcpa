import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Mock firebase imports
vi.mock('../../config/firebase', () => ({
  analytics: {},
}));

vi.mock('firebase/analytics', () => ({
  logEvent: vi.fn(),
}));

import {
  useSessionTracking,
  useQuestionMetrics,
  useStudySessionMetrics,
  trackFeatureUsage,
  trackMilestone,
} from '../../hooks/useEngagementMetrics';

describe('useEngagementMetrics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('useSessionTracking', () => {
    it('should return getSessionDuration function', () => {
      const { result } = renderHook(() => useSessionTracking());
      
      expect(typeof result.current.getSessionDuration).toBe('function');
    });

    it('should return getTimeSinceLastActivity function', () => {
      const { result } = renderHook(() => useSessionTracking());
      
      expect(typeof result.current.getTimeSinceLastActivity).toBe('function');
    });

    it('should track session duration', () => {
      const { result } = renderHook(() => useSessionTracking());
      
      // Initial duration should be 0
      expect(result.current.getSessionDuration()).toBe(0);
      
      // Advance time
      act(() => {
        vi.advanceTimersByTime(5000);
      });
      
      expect(result.current.getSessionDuration()).toBe(5);
    });

    it('should track time since last activity', () => {
      const { result } = renderHook(() => useSessionTracking());
      
      expect(result.current.getTimeSinceLastActivity()).toBe(0);
      
      // Advance time
      act(() => {
        vi.advanceTimersByTime(3000);
      });
      
      expect(result.current.getTimeSinceLastActivity()).toBe(3);
    });

    it('should handle visibility change events', () => {
      const { result } = renderHook(() => useSessionTracking());
      
      // Simulate visibility change
      Object.defineProperty(document, 'hidden', {
        value: true,
        configurable: true,
      });
      
      act(() => {
        document.dispatchEvent(new Event('visibilitychange'));
      });
      
      // Should not throw
      expect(result.current.getSessionDuration).toBeDefined();
    });

    it('should handle click activity', () => {
      const { result } = renderHook(() => useSessionTracking());
      
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      
      act(() => {
        document.dispatchEvent(new Event('click'));
      });
      
      // Activity time should reset
      expect(result.current.getTimeSinceLastActivity()).toBeLessThanOrEqual(1);
    });
  });

  describe('useQuestionMetrics', () => {
    it('should return startQuestion function', () => {
      const { result } = renderHook(() => useQuestionMetrics());
      
      expect(typeof result.current.startQuestion).toBe('function');
    });

    it('should return recordAttempt function', () => {
      const { result } = renderHook(() => useQuestionMetrics());
      
      expect(typeof result.current.recordAttempt).toBe('function');
    });

    it('should return endQuestion function', () => {
      const { result } = renderHook(() => useQuestionMetrics());
      
      expect(typeof result.current.endQuestion).toBe('function');
    });

    it('should return getAttemptCount function', () => {
      const { result } = renderHook(() => useQuestionMetrics());
      
      expect(typeof result.current.getAttemptCount).toBe('function');
    });

    it('should track attempt count', () => {
      const { result } = renderHook(() => useQuestionMetrics());
      
      expect(result.current.getAttemptCount()).toBe(0);
      
      act(() => {
        result.current.startQuestion('q1', 'REG', 'Depreciation');
      });
      
      act(() => {
        result.current.recordAttempt(false);
      });
      
      expect(result.current.getAttemptCount()).toBe(1);
    });

    it('should start and end question tracking', () => {
      const { result } = renderHook(() => useQuestionMetrics());
      
      act(() => {
        result.current.startQuestion('q1', 'REG', 'Depreciation');
      });
      
      act(() => {
        result.current.recordAttempt(true);
      });
      
      act(() => {
        result.current.endQuestion();
      });
      
      expect(result.current.getAttemptCount()).toBe(0);
    });

    it('should return null when recording attempt without starting', () => {
      const { result } = renderHook(() => useQuestionMetrics());
      
      let metrics;
      act(() => {
        metrics = result.current.recordAttempt(true);
      });
      
      expect(metrics).toBeNull();
    });

    it('should return metrics when recording attempt', () => {
      const { result } = renderHook(() => useQuestionMetrics());
      
      act(() => {
        result.current.startQuestion('q1', 'REG', 'Depreciation');
      });
      
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      
      let metrics;
      act(() => {
        metrics = result.current.recordAttempt(true);
      });
      
      expect(metrics).toMatchObject({
        question_id: 'q1',
        section: 'REG',
        topic: 'Depreciation',
        is_correct: true,
        attempt_number: 1,
      });
    });
  });

  describe('useStudySessionMetrics', () => {
    it('should return startSession function', () => {
      const { result } = renderHook(() => useStudySessionMetrics());
      
      expect(typeof result.current.startSession).toBe('function');
    });

    it('should return recordAnswer function', () => {
      const { result } = renderHook(() => useStudySessionMetrics());
      
      expect(typeof result.current.recordAnswer).toBe('function');
    });

    it('should return endSession function', () => {
      const { result } = renderHook(() => useStudySessionMetrics());
      
      expect(typeof result.current.endSession).toBe('function');
    });

    it('should return getSessionStats function', () => {
      const { result } = renderHook(() => useStudySessionMetrics());
      
      expect(typeof result.current.getSessionStats).toBe('function');
    });

    it('should track session stats', () => {
      const { result } = renderHook(() => useStudySessionMetrics());
      
      act(() => {
        result.current.startSession('REG');
      });
      
      act(() => {
        result.current.recordAnswer(true);
        result.current.recordAnswer(false);
        result.current.recordAnswer(true);
      });
      
      const stats = result.current.getSessionStats();
      expect(stats.questionsAnswered).toBe(3);
      expect(stats.correctAnswers).toBe(2);
    });

    it('should return null when ending session that was not started', () => {
      const { result } = renderHook(() => useStudySessionMetrics());
      
      let metrics;
      act(() => {
        metrics = result.current.endSession();
      });
      
      expect(metrics).toBeNull();
    });

    it('should return metrics when ending session', () => {
      const { result } = renderHook(() => useStudySessionMetrics());
      
      act(() => {
        result.current.startSession('FAR');
      });
      
      act(() => {
        result.current.recordAnswer(true);
        result.current.recordAnswer(true);
      });
      
      act(() => {
        vi.advanceTimersByTime(10000);
      });
      
      let metrics;
      act(() => {
        metrics = result.current.endSession();
      });
      
      expect(metrics).toMatchObject({
        section: 'FAR',
        questions_answered: 2,
        correct_answers: 2,
        accuracy_percent: 100,
      });
    });

    it('should return metrics even when no questions answered', () => {
      const { result } = renderHook(() => useStudySessionMetrics());
      
      act(() => {
        result.current.startSession('AUD');
      });
      
      let metrics;
      act(() => {
        metrics = result.current.endSession();
      });
      
      // Still returns metrics with zero questions
      expect(metrics).toMatchObject({
        section: 'AUD',
        questions_answered: 0,
        correct_answers: 0,
        accuracy_percent: 0,
      });
    });
  });

  describe('trackFeatureUsage', () => {
    it('should be callable', () => {
      expect(() => trackFeatureUsage('test-feature')).not.toThrow();
    });

    it('should accept metadata', () => {
      expect(() => trackFeatureUsage('test-feature', { key: 'value' })).not.toThrow();
    });
  });

  describe('trackMilestone', () => {
    it('should be callable', () => {
      expect(() => trackMilestone('test-milestone', 100)).not.toThrow();
    });
  });

  describe('default export', () => {
    it('should export all hooks and functions', async () => {
      const module = await import('../../hooks/useEngagementMetrics');
      
      expect(module.default.useSessionTracking).toBeDefined();
      expect(module.default.useQuestionMetrics).toBeDefined();
      expect(module.default.useStudySessionMetrics).toBeDefined();
      expect(module.default.trackFeatureUsage).toBeDefined();
      expect(module.default.trackMilestone).toBeDefined();
    });
  });
});
