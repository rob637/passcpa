/**
 * Tests for CPA Adaptive Engine
 *
 * Covers: state lifecycle, answer recording, weak section detection,
 * recommendations, performance summary, session management, discipline selection.
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
  setChosenDiscipline,
  getChosenDiscipline,
  getActiveSections,
  recordAnswer,
  getQuestionsDueForReview,
  getWeakSections,
  getWeakBlueprintAreas,
  getRecommendedAction,
  getPerformanceSummary,
  startSession,
  endSession,
} from '../../services/cpaAdaptiveEngine';

describe('cpaAdaptiveEngine', () => {
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
      expect(state.chosenDiscipline).toBeNull();
    });

    it('loads state from localStorage', () => {
      const state = loadAdaptiveState();
      expect(state).toBeDefined();
      expect(state.questionHistory).toBeInstanceOf(Map);
    });

    it('getAdaptiveState returns current module state', () => {
      const state = getAdaptiveState();
      expect(state.totalQuestionsAnswered).toBe(0);
    });

    it('resetAdaptiveState clears all progress', () => {
      recordAnswer('q1', 'FAR', 'FAR-I', true);
      resetAdaptiveState();
      const state = getAdaptiveState();
      expect(state.totalQuestionsAnswered).toBe(0);
    });

    it('saves state to localStorage on answer', () => {
      recordAnswer('q1', 'FAR', 'FAR-I', true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cpa-adaptive-state',
        expect.any(String)
      );
    });
  });

  describe('discipline selection', () => {
    it('starts with no chosen discipline', () => {
      expect(getChosenDiscipline()).toBeNull();
    });

    it('sets chosen discipline', () => {
      setChosenDiscipline('BAR');
      expect(getChosenDiscipline()).toBe('BAR');
    });

    it('active sections include core only when no discipline selected', () => {
      const sections = getActiveSections();
      expect(sections).toEqual(['FAR', 'AUD', 'REG']);
    });

    it('active sections include chosen discipline', () => {
      setChosenDiscipline('ISC');
      const sections = getActiveSections();
      expect(sections).toContain('ISC');
      expect(sections.length).toBe(4);
    });

    it('rejects invalid disciplines', () => {
      setChosenDiscipline('FAR'); // Not a discipline section
      expect(getChosenDiscipline()).toBeNull();
    });
  });

  describe('recordAnswer', () => {
    it('increments questions answered', () => {
      recordAnswer('q1', 'FAR', 'FAR-I', true);
      const state = getAdaptiveState();
      expect(state.totalQuestionsAnswered).toBe(1);
    });

    it('tracks section performance', () => {
      recordAnswer('q1', 'FAR', 'FAR-I', true);
      recordAnswer('q2', 'FAR', 'FAR-I', false);
      const state = getAdaptiveState();
      expect(state.sectionPerformance.FAR.questionsAttempted).toBe(2);
    });

    it('tracks blueprint area performance', () => {
      recordAnswer('q1', 'FAR', 'FAR-II', true);
      const state = getAdaptiveState();
      const subPerf = state.sectionPerformance.FAR?.subSectionPerformance?.['FAR-II'];
      expect(subPerf).toBeDefined();
      expect(subPerf?.questionsAttempted).toBe(1);
    });

    it('records multiple answers correctly', () => {
      for (let i = 0; i < 5; i++) {
        recordAnswer(`q${i}`, 'FAR', undefined, i % 2 === 0);
      }
      const state = getAdaptiveState();
      expect(state.totalQuestionsAnswered).toBe(5);
    });
  });

  describe('getQuestionsDueForReview', () => {
    it('returns empty array initially', () => {
      expect(getQuestionsDueForReview()).toEqual([]);
    });
  });

  describe('getWeakSections / getWeakBlueprintAreas', () => {
    it('returns weak sections array', () => {
      const weak = getWeakSections();
      expect(Array.isArray(weak)).toBe(true);
    });

    it('returns weak blueprint areas array', () => {
      const weak = getWeakBlueprintAreas();
      expect(Array.isArray(weak)).toBe(true);
    });

    it('identifies weak sections after wrong answers', () => {
      for (let i = 0; i < 10; i++) {
        recordAnswer(`q${i}`, 'FAR', undefined, false);
      }
      const weak = getWeakSections();
      expect(weak).toContain('FAR');
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
      const rec = getRecommendedAction();
      expect(rec.action).toBe('practice');
    });
  });

  describe('getPerformanceSummary', () => {
    it('returns complete summary', () => {
      const summary = getPerformanceSummary();
      expect(summary).toHaveProperty('totalQuestions');
      expect(summary).toHaveProperty('overallAccuracy');
      expect(summary).toHaveProperty('currentDifficulty');
      expect(summary).toHaveProperty('readinessScore');
      expect(summary).toHaveProperty('sectionBreakdown');
      expect(summary).toHaveProperty('weakSections');
      expect(summary).toHaveProperty('strongSections');
      expect(summary).toHaveProperty('chosenDiscipline');
    });

    it('reflects answers recorded', () => {
      recordAnswer('q1', 'FAR', undefined, true);
      recordAnswer('q2', 'AUD', undefined, false);
      const summary = getPerformanceSummary();
      expect(summary.totalQuestions).toBe(2);
    });
  });

  describe('session management', () => {
    it('startSession and endSession lifecycle', () => {
      startSession();
      recordAnswer('q1', 'FAR', undefined, true);
      recordAnswer('q2', 'FAR', undefined, false);
      const result = endSession();
      expect(result).toHaveProperty('duration');
      expect(result).toHaveProperty('questionsAnswered');
      expect(result).toHaveProperty('accuracy');
    });
  });
});
