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
  predictExamScore,
  quickPrediction,
  CFP_DOMAIN_WEIGHTS,
  PASSING_SCORE,
  PredictionInput,
  DomainPerformance,
} from '../../services/cfpScorePredictor';

describe('cfpScorePredictor.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const makeDomain = (
    domain: string,
    accuracy: number,
    overrides: Partial<DomainPerformance> = {}
  ): DomainPerformance => ({
    domain,
    questionsAttempted: 50,
    correctAnswers: Math.round(50 * accuracy),
    accuracy,
    consistency: 0.8,
    recentTrend: 'stable',
    avgTimePerQuestion: 75,
    ...overrides,
  });

  const baseInput = (overrides: Partial<PredictionInput> = {}): PredictionInput => ({
    domainPerformance: Object.keys(CFP_DOMAIN_WEIGHTS).map((d) => makeDomain(d, 0.75)),
    mockExamResults: [],
    totalQuestionsAttempted: 350,
    studyDays: 60,
    studyHoursTotal: 120,
    lastStudyDate: new Date(),
    ...overrides,
  });

  describe('CFP_DOMAIN_WEIGHTS', () => {
    it('domain weights sum to approximately 1.0', () => {
      const sum = Object.values(CFP_DOMAIN_WEIGHTS).reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(1.0, 1);
    });

    it('passing score is a positive number', () => {
      expect(PASSING_SCORE).toBeGreaterThan(0);
    });
  });

  describe('predictExamScore', () => {
    it('returns prediction object with required fields', () => {
      const prediction = predictExamScore(baseInput());

      expect(prediction).toHaveProperty('predictedScore');
      expect(prediction).toHaveProperty('confidenceInterval');
      expect(prediction).toHaveProperty('passProbability');
      expect(prediction).toHaveProperty('readinessLevel');
      expect(prediction).toHaveProperty('domainPredictions');
      expect(prediction).toHaveProperty('factors');
      expect(prediction).toHaveProperty('recommendations');
    });

    it('confidence interval low is less than or equal to high', () => {
      const prediction = predictExamScore(baseInput());
      expect(prediction.confidenceInterval.low).toBeLessThanOrEqual(
        prediction.confidenceInterval.high
      );
    });

    it('pass probability is between 0 and 100', () => {
      const prediction = predictExamScore(baseInput());
      expect(prediction.passProbability).toBeGreaterThanOrEqual(0);
      expect(prediction.passProbability).toBeLessThanOrEqual(100);
    });

    it('higher domain accuracy yields higher predicted score', () => {
      const low = predictExamScore(baseInput({
        domainPerformance: Object.keys(CFP_DOMAIN_WEIGHTS).map((d) => makeDomain(d, 0.50)),
      }));
      const high = predictExamScore(baseInput({
        domainPerformance: Object.keys(CFP_DOMAIN_WEIGHTS).map((d) => makeDomain(d, 0.90)),
      }));

      expect(high.predictedScore).toBeGreaterThan(low.predictedScore);
    });

    it('returns a valid readiness level', () => {
      const prediction = predictExamScore(baseInput());
      expect(['not-ready', 'needs-work', 'getting-close', 'ready', 'well-prepared']).toContain(
        prediction.readinessLevel
      );
    });

    it('factors array is non-empty', () => {
      const prediction = predictExamScore(baseInput());
      expect(Array.isArray(prediction.factors)).toBe(true);
      expect(prediction.factors.length).toBeGreaterThan(0);
    });

    it('domain predictions cover all weighted domains', () => {
      const prediction = predictExamScore(baseInput());
      Object.keys(CFP_DOMAIN_WEIGHTS).forEach((d) => {
        expect(prediction.domainPredictions).toHaveProperty(d);
      });
    });
  });

  describe('quickPrediction', () => {
    it('returns prediction summary fields', () => {
      const prediction = quickPrediction(0.75, 72);
      expect(prediction).toHaveProperty('predictedScore');
      expect(prediction).toHaveProperty('passProbability');
    });

    it('handles null mockExamAvg', () => {
      const prediction = quickPrediction(0.70, null);
      expect(typeof prediction.predictedScore).toBe('number');
      expect(typeof prediction.passProbability).toBe('number');
    });

    it('higher accuracy yields higher predicted score', () => {
      const low = quickPrediction(0.50, null);
      const high = quickPrediction(0.90, null);
      expect(high.predictedScore).toBeGreaterThan(low.predictedScore);
    });
  });
});
