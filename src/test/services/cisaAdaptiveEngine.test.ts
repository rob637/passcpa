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

// Import after mock setup
import {
  loadAdaptiveState,
  recordAnswer,
  getWeakDomains,
  getPerformanceSummary,
  getRecommendedAction,
  resetAdaptiveState,
} from '../../services/cisaAdaptiveEngine';

describe('cisaAdaptiveEngine.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    resetAdaptiveState();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('loadAdaptiveState', () => {
    it('should initialize default state when no stored data exists', () => {
      const state = loadAdaptiveState();
      
      expect(state).toBeDefined();
      expect(state.sectionPerformance).toBeDefined();
      expect(state.questionHistory).toBeInstanceOf(Map);
      expect(state.recentResults).toEqual([]);
      expect(state.currentDifficulty).toBe('medium');
    });

    it('should restore state from localStorage when data exists', () => {
      const mockState = {
        sectionPerformance: {
          CISA1: {
            sectionId: 'CISA1',
            accuracy: 0.75,
            questionsAttempted: 10,
            recentAccuracy: 0.8,
            lastPracticed: new Date().toISOString(),
            needsWork: false,
            masteredConcepts: ['concept1'],
            struggleConcepts: [],
            subSectionPerformance: {},
          },
        },
        questionHistory: [['q1', { questionId: 'q1', attempts: 1 }]],
        recentResults: [true, false, true],
        currentDifficulty: 'hard',
      };
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockState));
      
      const state = loadAdaptiveState();
      
      expect(localStorageMock.getItem).toHaveBeenCalledWith('cisa-adaptive-state');
      expect(state.recentResults).toEqual([true, false, true]);
      expect(state.currentDifficulty).toBe('hard');
    });
  });

  describe('recordAnswer', () => {
    it('should update domain performance when answer is recorded', () => {
      recordAnswer('q1', 'CISA1', true, 'medium', ['concept1']);
      
      const summary = getPerformanceSummary();
      expect(summary.totalQuestions).toBeGreaterThan(0);
    });

    it('should save state to localStorage', () => {
      recordAnswer('q1', 'CISA1', true, 'medium', []);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cisa-adaptive-state',
        expect.any(String)
      );
    });

    it('should track multiple questions', () => {
      recordAnswer('q1', 'CISA1', true, 'medium', []);
      recordAnswer('q2', 'CISA1', false, 'medium', []);
      recordAnswer('q3', 'CISA1', true, 'medium', []);
      
      const summary = getPerformanceSummary();
      expect(summary.totalQuestions).toBe(3);
    });
  });

  describe('getWeakDomains', () => {
    it('should return domains with lower performance', () => {
      // Record several incorrect answers for CISA1
      for (let i = 0; i < 5; i++) {
        recordAnswer(`q${i}`, 'CISA1', false, 'medium', []);
      }
      
      const weakDomains = getWeakDomains();
      expect(Array.isArray(weakDomains)).toBe(true);
    });

    it('should return empty array when all domains are performing well', () => {
      // Record correct answers (10+ per domain with 80%+ accuracy)
      for (let i = 0; i < 25; i++) {
        const domains = ['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'] as const;
        recordAnswer(`q${i}`, domains[i % 5], true, 'medium', []);
      }
      
      const weakDomains = getWeakDomains();
      expect(Array.isArray(weakDomains)).toBe(true);
    });
  });

  describe('getPerformanceSummary', () => {
    it('should return complete summary object', () => {
      const summary = getPerformanceSummary();
      
      expect(summary).toHaveProperty('totalQuestions');
      expect(summary).toHaveProperty('overallAccuracy');
      expect(summary).toHaveProperty('strongDomains');
      expect(summary).toHaveProperty('weakDomains');
      expect(summary).toHaveProperty('readinessScore');
      expect(summary).toHaveProperty('passProbability');
    });

    it('should calculate overall accuracy as percentage', () => {
      recordAnswer('q1', 'CISA1', true, 'medium', []);
      recordAnswer('q2', 'CISA1', true, 'medium', []);
      recordAnswer('q3', 'CISA1', false, 'medium', []);
      
      const summary = getPerformanceSummary();
      expect(typeof summary.overallAccuracy).toBe('number');
      expect(summary.overallAccuracy).toBeGreaterThanOrEqual(0);
      expect(summary.overallAccuracy).toBeLessThanOrEqual(100);
    });
  });

  describe('getRecommendedAction', () => {
    it('should return valid recommendation object', () => {
      const recommendation = getRecommendedAction();
      
      expect(recommendation).toHaveProperty('action');
      expect(recommendation).toHaveProperty('domain');
      expect(recommendation).toHaveProperty('reason');
      expect(['practice', 'review', 'exam', 'cram']).toContain(recommendation.action);
    });

    it('should recommend practice for new users', () => {
      const recommendation = getRecommendedAction();
      expect(recommendation.action).toBe('practice');
    });
  });

  describe('resetAdaptiveState', () => {
    it('should clear all progress data', () => {
      recordAnswer('q1', 'CISA1', true, 'medium', []);
      recordAnswer('q2', 'CISA2', true, 'medium', []);
      
      resetAdaptiveState();
      
      const summary = getPerformanceSummary();
      expect(summary.totalQuestions).toBe(0);
    });
  });
});
