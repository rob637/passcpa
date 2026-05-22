import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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
  predictScore,
  predictAllPartsScores,
  getQuickPrediction,
  PredictionInput,
} from '../../services/cmaScorePredictor';

describe('cmaScorePredictor.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const baseInput = (overrides: Partial<PredictionInput> = {}): PredictionInput => ({
    part: 'CMA1',
    domainAccuracy: {
      'CMA1-A': 75,
      'CMA1-B': 80,
      'CMA1-C': 70,
      'CMA1-D': 75,
      'CMA1-E': 72,
      'CMA1-F': 78,
    },
    totalQuestionsAnswered: 150,
    averageTimePerQuestion: 80,
    recentTrend: 'improving',
    mockExamScores: [340, 360, 380],
    ...overrides,
  });

  describe('predictScore', () => {
    it('returns prediction object with required fields', () => {
      const prediction = predictScore(baseInput());
      expect(prediction).toHaveProperty('part', 'CMA1');
      expect(prediction).toHaveProperty('predictedScore');
      expect(prediction).toHaveProperty('confidenceInterval');
      expect(prediction).toHaveProperty('passProbability');
      expect(prediction).toHaveProperty('readinessLevel');
      expect(prediction).toHaveProperty('domainPredictions');
      expect(prediction).toHaveProperty('recommendations');
    });

    it('returns score within IMA scale (0-500)', () => {
      const prediction = predictScore(baseInput({
        domainAccuracy: {
          'CMA1-A': 6, 'CMA1-B': 6, 'CMA1-C': 6,
          'CMA1-D': 6, 'CMA1-E': 6, 'CMA1-F': 6,
        },
      }));
      expect(prediction.predictedScore).toBeGreaterThanOrEqual(0);
      expect(prediction.predictedScore).toBeLessThanOrEqual(500);
    });

    it('confidence interval low less than high', () => {
      const prediction = predictScore(baseInput());
      expect(prediction.confidenceInterval.low).toBeLessThan(prediction.confidenceInterval.high);
    });

    it('pass probability between 0 and 100', () => {
      const prediction = predictScore(baseInput());
      expect(prediction.passProbability).toBeGreaterThanOrEqual(0);
      expect(prediction.passProbability).toBeLessThanOrEqual(100);
    });

    it('higher accuracy yields higher predicted score', () => {
      const low = predictScore(baseInput({
        domainAccuracy: {
          'CMA1-A': 40, 'CMA1-B': 40, 'CMA1-C': 40,
          'CMA1-D': 40, 'CMA1-E': 40, 'CMA1-F': 40,
        },
      }));
      const high = predictScore(baseInput({
        domainAccuracy: {
          'CMA1-A': 75, 'CMA1-B': 75, 'CMA1-C': 75,
          'CMA1-D': 75, 'CMA1-E': 75, 'CMA1-F': 75,
        },
      }));
      expect(high.predictedScore).toBeGreaterThan(low.predictedScore);
    });

    it('returns valid readiness level', () => {
      const prediction = predictScore(baseInput());
      expect(['not-ready', 'at-risk', 'borderline', 'likely', 'confident']).toContain(
        prediction.readinessLevel
      );
    });

    it('works for CMA2 part', () => {
      const cma2 = predictScore({
        ...baseInput(),
        part: 'CMA2',
        domainAccuracy: {
          'CMA2-A': 7, 'CMA2-B': 7, 'CMA2-C': 7,
          'CMA2-D': 7, 'CMA2-E': 7, 'CMA2-F': 7,
        },
      });
      expect(cma2.part).toBe('CMA2');
    });
  });

  describe('predictAllPartsScores', () => {
    it('returns prediction for both CMA parts', () => {
      const all = predictAllPartsScores();
      expect(all).toHaveProperty('parts');
      expect(all).toHaveProperty('overallReadiness');
      expect(all).toHaveProperty('overallPassProbability');
      expect(all.parts).toHaveProperty('CMA1');
      expect(all.parts).toHaveProperty('CMA2');
    });

    it('overall pass probability between 0 and 100', () => {
      const all = predictAllPartsScores();
      expect(all.overallPassProbability).toBeGreaterThanOrEqual(0);
      expect(all.overallPassProbability).toBeLessThanOrEqual(100);
    });
  });

  describe('getQuickPrediction', () => {
    it('returns quick prediction for CMA1', () => {
      const prediction = getQuickPrediction('CMA1');
      expect(prediction).toHaveProperty('score');
      expect(prediction).toHaveProperty('probability');
      expect(prediction).toHaveProperty('readiness');
    });
  });
});
