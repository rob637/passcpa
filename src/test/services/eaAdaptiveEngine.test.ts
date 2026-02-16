/**
 * Tests for EA Adaptive Engine
 *
 * Covers: state lifecycle, answer recording, weak part/domain detection,
 * recommendations, performance summary, session management.
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
  initializeAdaptiveState,
  loadAdaptiveState,
  getAdaptiveState,
  resetAdaptiveState,
  recordAnswer,
  getQuestionsDueForReview,
  getWeakParts,
  getWeakDomains,
  getRecommendedAction,
  getPerformanceSummary,
  startSession,
  endSession,
} from '../../services/eaAdaptiveEngine';

describe('eaAdaptiveEngine', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    resetAdaptiveState();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('state management', () => {
    it('initializes with default state', () => {
      const state = initializeAdaptiveState();
      expect(state.totalQuestionsAnswered).toBe(0);
      expect(state.currentDifficulty).toBe('medium');
    });

    it('loads state from storage', () => {
      const state = loadAdaptiveState();
      expect(state).toBeDefined();
      expect(state.questionHistory).toBeInstanceOf(Map);
    });

    it('getAdaptiveState returns module state', () => {
      const state = getAdaptiveState();
      expect(state.totalQuestionsAnswered).toBe(0);
    });

    it('resetAdaptiveState clears progress', () => {
      recordAnswer('q1', 'SEE1', 'SEE1-A', true);
      resetAdaptiveState();
      expect(getAdaptiveState().totalQuestionsAnswered).toBe(0);
    });
  });

  describe('recordAnswer', () => {
    it('increments questions answered', () => {
      recordAnswer('q1', 'SEE1', 'SEE1-A', true);
      expect(getAdaptiveState().totalQuestionsAnswered).toBe(1);
    });

    it('tracks part performance', () => {
      recordAnswer('q1', 'SEE1', undefined, true);
      recordAnswer('q2', 'SEE1', undefined, false);
      expect(getAdaptiveState().sectionPerformance.SEE1.questionsAttempted).toBe(2);
    });

    it('saves to localStorage', () => {
      recordAnswer('q1', 'SEE1', undefined, true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'ea-adaptive-state',
        expect.any(String)
      );
    });

    it('tracks domain subsection performance', () => {
      recordAnswer('q1', 'SEE2', 'SEE2-B', true);
      const sub = getAdaptiveState().sectionPerformance.SEE2?.subSectionPerformance?.['SEE2-B'];
      expect(sub).toBeDefined();
      expect(sub?.questionsAttempted).toBe(1);
    });
  });

  describe('getQuestionsDueForReview', () => {
    it('returns empty array initially', () => {
      expect(getQuestionsDueForReview()).toEqual([]);
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
        recordAnswer(`q${i}`, 'SEE1', undefined, false);
      }
      expect(getWeakParts()).toContain('SEE1');
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

    it('reflects recorded answers', () => {
      recordAnswer('q1', 'SEE1', undefined, true);
      recordAnswer('q2', 'SEE2', undefined, false);
      expect(getPerformanceSummary().totalQuestions).toBe(2);
    });
  });

  describe('session management', () => {
    it('startSession and endSession lifecycle', () => {
      startSession();
      recordAnswer('q1', 'SEE1', undefined, true);
      const result = endSession();
      expect(result).toHaveProperty('duration');
      expect(result).toHaveProperty('questionsAnswered');
      expect(result).toHaveProperty('accuracy');
    });
  });
});
