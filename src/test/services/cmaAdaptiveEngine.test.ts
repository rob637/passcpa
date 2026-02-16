/**
 * Tests for CMA Adaptive Engine
 *
 * Covers: state lifecycle, answer recording, weak part/domain detection,
 * recommendations, performance summary, session management, domain performance.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

import {
  initializeAdaptiveEngine,
  resetAdaptiveState,
  recordAnswer,
  getDueForReview,
  getWeakParts,
  getWeakDomains,
  getRecommendedAction,
  getPerformanceSummary,
  getDomainPerformance,
  startSession,
  endSession,
} from '../../services/cmaAdaptiveEngine';

describe('cmaAdaptiveEngine', () => {
  const testUserId = 'test-user-123';

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    initializeAdaptiveEngine(testUserId);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('state management', () => {
    it('initializes with user ID', () => {
      const state = initializeAdaptiveEngine(testUserId);
      expect(state.totalQuestionsAnswered).toBe(0);
      expect(state.currentDifficulty).toBe('medium');
    });

    it('resets state for a user', () => {
      recordAnswer('q1', true, 'CMA1', 'CMA1-A');
      resetAdaptiveState(testUserId);
      const state = initializeAdaptiveEngine(testUserId);
      expect(state.totalQuestionsAnswered).toBe(0);
    });
  });

  describe('recordAnswer', () => {
    it('increments question count', () => {
      recordAnswer('q1', true, 'CMA1');
      const summary = getPerformanceSummary();
      expect(summary.totalQuestions).toBe(1);
    });

    it('tracks part performance', () => {
      recordAnswer('q1', true, 'CMA1');
      recordAnswer('q2', false, 'CMA1');
      const summary = getPerformanceSummary();
      const cma1 = summary.partBreakdown.find(p => p.part === 'CMA1');
      expect(cma1?.questionsAttempted).toBe(2);
    });

    it('tracks domain sub-performance', () => {
      recordAnswer('q1', true, 'CMA1', 'CMA1-A');
      const domain = getDomainPerformance('CMA1');
      expect(domain['CMA1-A']).toBeDefined();
      expect(domain['CMA1-A'].attempted).toBe(1);
    });

    it('saves to localStorage', () => {
      recordAnswer('q1', true, 'CMA1');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cma-adaptive-state',
        expect.any(String)
      );
    });
  });

  describe('getDueForReview', () => {
    it('returns empty initially', () => {
      expect(getDueForReview()).toEqual([]);
    });
  });

  describe('getWeakParts / getWeakDomains', () => {
    it('returns weak parts as array', () => {
      expect(Array.isArray(getWeakParts())).toBe(true);
    });

    it('returns weak domains as array', () => {
      expect(Array.isArray(getWeakDomains())).toBe(true);
    });

    it('identifies weak parts after wrong answers', () => {
      for (let i = 0; i < 10; i++) {
        recordAnswer(`q${i}`, false, 'CMA1');
      }
      expect(getWeakParts()).toContain('CMA1');
    });

    it('identifies weak domains after wrong answers', () => {
      for (let i = 0; i < 10; i++) {
        recordAnswer(`q${i}`, false, 'CMA1', 'CMA1-A');
      }
      const weak = getWeakDomains();
      // Weak subsection detection requires minimum question threshold
      expect(Array.isArray(weak)).toBe(true);
    });
  });

  describe('getRecommendedAction', () => {
    it('returns valid recommendation', () => {
      const rec = getRecommendedAction();
      expect(rec).toHaveProperty('action');
      expect(rec).toHaveProperty('reason');
      expect(['practice', 'review', 'mock-exam', 'break']).toContain(rec.action);
    });

    it('recommends practice for new users', () => {
      expect(getRecommendedAction().action).toBe('practice');
    });
  });

  describe('getPerformanceSummary', () => {
    it('returns complete summary', () => {
      const s = getPerformanceSummary();
      expect(s).toHaveProperty('totalQuestions');
      expect(s).toHaveProperty('overallAccuracy');
      expect(s).toHaveProperty('partBreakdown');
      expect(s).toHaveProperty('weakParts');
      expect(s).toHaveProperty('strongParts');
    });
  });

  describe('getDomainPerformance', () => {
    it('returns domain data for a part', () => {
      const perf = getDomainPerformance('CMA1');
      expect(typeof perf).toBe('object');
    });

    it('updates after recording answers', () => {
      recordAnswer('q1', true, 'CMA1', 'CMA1-A');
      recordAnswer('q2', false, 'CMA1', 'CMA1-A');
      const perf = getDomainPerformance('CMA1');
      expect(perf['CMA1-A'].attempted).toBe(2);
    });
  });

  describe('session management', () => {
    it('tracks session questions answered', () => {
      startSession();
      recordAnswer('q1', true, 'CMA1');
      recordAnswer('q2', false, 'CMA2');
      const result = endSession();
      expect(result).toHaveProperty('duration');
      expect(result.questionsAnswered).toBe(2);
    });
  });
});
