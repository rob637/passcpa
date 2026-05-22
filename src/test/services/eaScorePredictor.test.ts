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
  predictScore,
  predictAllPartsScores,
  getQuickPrediction,
  PredictionInput,
} from '../../services/eaScorePredictor';

describe('eaScorePredictor.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const baseInput = (overrides: Partial<PredictionInput> = {}): PredictionInput => ({
    part: 'SEE1',
    domainAccuracy: {
      'SEE1-1': 75,
      'SEE1-2': 80,
      'SEE1-3': 70,
      'SEE1-4': 85,
      'SEE1-5': 78,
      'SEE1-6': 72,
    },
    totalQuestionsAnswered: 150,
    averageTimePerQuestion: 70,
    recentTrend: 'improving',
    mockExamScores: [100, 105, 110],
    ...overrides,
  });

  describe('predictScore', () => {
    it('returns prediction object with required fields', () => {
      const prediction = predictScore(baseInput());

      expect(prediction).toHaveProperty('part', 'SEE1');
      expect(prediction).toHaveProperty('predictedScore');
      expect(prediction).toHaveProperty('confidenceInterval');
      expect(prediction).toHaveProperty('passProbability');
      expect(prediction).toHaveProperty('readinessLevel');
      expect(prediction).toHaveProperty('domainPredictions');
      expect(prediction).toHaveProperty('recommendations');
    });

    it('returns score within IRS SEE range (40-130)', () => {
      const prediction = predictScore(baseInput({
        domainAccuracy: {
          'SEE1-1': 60, 'SEE1-2': 60, 'SEE1-3': 60,
          'SEE1-4': 60, 'SEE1-5': 60, 'SEE1-6': 60,
        },
      }));

      expect(prediction.predictedScore).toBeGreaterThanOrEqual(40);
      expect(prediction.predictedScore).toBeLessThanOrEqual(130);
    });

    it('confidence interval low is less than high', () => {
      const prediction = predictScore(baseInput());
      expect(prediction.confidenceInterval.low).toBeLessThan(prediction.confidenceInterval.high);
    });

    it('pass probability is between 0 and 100', () => {
      const prediction = predictScore(baseInput());
      expect(prediction.passProbability).toBeGreaterThanOrEqual(0);
      expect(prediction.passProbability).toBeLessThanOrEqual(100);
    });

    it('higher domain accuracy yields higher predicted score', () => {
      const low = predictScore(baseInput({
        domainAccuracy: {
          'SEE1-1': 40, 'SEE1-2': 40, 'SEE1-3': 40,
          'SEE1-4': 40, 'SEE1-5': 40, 'SEE1-6': 40,
        },
      }));
      const high = predictScore(baseInput({
        domainAccuracy: {
          'SEE1-1': 70, 'SEE1-2': 70, 'SEE1-3': 70,
          'SEE1-4': 70, 'SEE1-5': 70, 'SEE1-6': 70,
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

    it('works for SEE2 and SEE3 parts', () => {
      const see2 = predictScore({
        ...baseInput(),
        part: 'SEE2',
        domainAccuracy: { 'SEE2-1': 7, 'SEE2-2': 75, 'SEE2-3': 72 },
      });
      const see3 = predictScore({
        ...baseInput(),
        part: 'SEE3',
        domainAccuracy: { 'SEE3-1': 7, 'SEE3-2': 75, 'SEE3-3': 72, 'SEE3-4': 7 },
      });
      expect(see2.part).toBe('SEE2');
      expect(see3.part).toBe('SEE3');
    });
  });

  describe('predictAllPartsScores', () => {
    it('returns prediction for all three SEE parts', () => {
      const all = predictAllPartsScores();
      expect(all).toHaveProperty('parts');
      expect(all).toHaveProperty('overallReadiness');
      expect(all).toHaveProperty('overallPassProbability');
      expect(all).toHaveProperty('recommendations');
      expect(all.parts).toHaveProperty('SEE1');
      expect(all.parts).toHaveProperty('SEE2');
      expect(all.parts).toHaveProperty('SEE3');
    });

    it('overall pass probability is between 0 and 100', () => {
      const all = predictAllPartsScores();
      expect(all.overallPassProbability).toBeGreaterThanOrEqual(0);
      expect(all.overallPassProbability).toBeLessThanOrEqual(100);
    });
  });

  describe('getQuickPrediction', () => {
    it('returns a prediction summary for SEE1', () => {
      const prediction = getQuickPrediction('SEE1');
      expect(prediction).toHaveProperty('score');
      expect(prediction).toHaveProperty('probability');
      expect(prediction).toHaveProperty('readiness');
    });

    it('handles insufficient data gracefully', () => {
      const prediction = getQuickPrediction('SEE3');
      expect(typeof prediction.score).toBe('number');
      expect(typeof prediction.readiness).toBe('string');
    });
  });
});
