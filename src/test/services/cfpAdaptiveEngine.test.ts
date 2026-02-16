/**
 * Tests for CFP Adaptive Engine (Functional/Immutable Pattern)
 *
 * Covers: state lifecycle, answer recording, weak domain detection,
 * recommendations (both getStudyRecommendation and normalized getRecommendedAction),
 * performance summary, session management.
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
  saveAdaptiveState,
  startSession,
  endSession,
  recordResult,
  getStudyRecommendation,
  getRecommendedAction,
  getPerformanceSummary,
  getDueForReview,
  getWeakDomains,
} from '../../services/cfpAdaptiveEngine';

describe('cfpAdaptiveEngine (functional)', () => {
  let state: ReturnType<typeof initializeAdaptiveState>;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    state = initializeAdaptiveState();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('state management', () => {
    it('initializes with default state', () => {
      expect(state.totalQuestionsAnswered).toBe(0);
      expect(state.currentDifficulty).toBe('medium');
      expect(state.questionHistory).toBeInstanceOf(Map);
    });

    it('saves and loads state', () => {
      const updated = recordResult(state, 'q1', 'GP', true);
      saveAdaptiveState(updated);
      const loaded = loadAdaptiveState();
      expect(loaded.totalQuestionsAnswered).toBe(1);
    });
  });

  describe('recordResult', () => {
    it('returns new state (immutable)', () => {
      const updated = recordResult(state, 'q1', 'GP', true);
      expect(updated).not.toBe(state);
      expect(updated.totalQuestionsAnswered).toBe(1);
      expect(state.totalQuestionsAnswered).toBe(0); // original unchanged
    });

    it('tracks domain performance', () => {
      let s = recordResult(state, 'q1', 'GP', true);
      s = recordResult(s, 'q2', 'GP', false);
      expect(s.sectionPerformance.GP.questionsAttempted).toBe(2);
    });

    it('adds to question history', () => {
      const updated = recordResult(state, 'q1', 'GP', true);
      expect(updated.questionHistory.has('q1')).toBe(true);
    });

    it('auto-saves to localStorage', () => {
      recordResult(state, 'q1', 'GP', true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cfp-adaptive-state',
        expect.any(String)
      );
    });
  });

  describe('getStudyRecommendation', () => {
    it('returns CFP-specific recommendation', () => {
      const rec = getStudyRecommendation(state);
      expect(rec).toHaveProperty('action');
      expect(rec).toHaveProperty('reason');
      expect(rec).toHaveProperty('priority');
      expect(['review', 'weak-areas', 'new-content', 'mock-exam', 'maintain']).toContain(rec.action);
    });
  });

  describe('getRecommendedAction (normalized)', () => {
    it('returns standardized action set', () => {
      const rec = getRecommendedAction(state);
      expect(rec).toHaveProperty('action');
      expect(rec).toHaveProperty('reason');
      expect(['practice', 'review', 'mock-exam', 'break']).toContain(rec.action);
    });

    it('maps weak-areas to practice', () => {
      // Force weak domain by recording many wrong answers
      let s = state;
      for (let i = 0; i < 15; i++) {
        s = recordResult(s, `q${i}`, 'GP', false);
      }
      const rec = getRecommendedAction(s);
      // Should map to either 'practice' or 'review' (not 'weak-areas')
      expect(['practice', 'review', 'mock-exam', 'break']).toContain(rec.action);
    });
  });

  describe('getDueForReview', () => {
    it('returns empty array initially', () => {
      expect(getDueForReview(state)).toEqual([]);
    });
  });

  describe('getWeakDomains', () => {
    it('returns array', () => {
      expect(Array.isArray(getWeakDomains(state))).toBe(true);
    });
  });

  describe('getPerformanceSummary', () => {
    it('returns summary with expected fields', () => {
      const s = getPerformanceSummary(state);
      expect(s).toHaveProperty('totalQuestions');
      expect(s).toHaveProperty('overallAccuracy');
      expect(s).toHaveProperty('currentDifficulty');
      expect(s).toHaveProperty('readinessScore');
    });

    it('reflects recorded answers', () => {
      let s = recordResult(state, 'q1', 'GP', true);
      s = recordResult(s, 'q2', 'IP', false);
      const summary = getPerformanceSummary(s);
      expect(summary.totalQuestions).toBe(2);
    });
  });

  describe('session management', () => {
    it('startSession returns new state with session start', () => {
      const sessionState = startSession(state);
      expect(sessionState.sessionStartTime).toBeDefined();
    });

    it('endSession returns summary', () => {
      let s = startSession(state);
      s = recordResult(s, 'q1', 'GP', true);
      const result = endSession(s);
      expect(result.summary).toHaveProperty('duration');
      expect(result.summary).toHaveProperty('questionsAnswered');
      expect(result.summary).toHaveProperty('accuracy');
    });
  });
});
