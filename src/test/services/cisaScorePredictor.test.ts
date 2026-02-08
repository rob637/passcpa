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
  predictScore,
  analyzeTrends,
  getQuickPrediction,
  getStudyPlan,
  PredictionInput,
} from '../../services/cisaScorePredictor';

describe('cisaScorePredictor.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('predictScore', () => {
    it('should return prediction object with required fields', () => {
      const mockInput: PredictionInput = {
        domainAccuracy: {
          CISA1: 0.75,
          CISA2: 0.80,
          CISA3: 0.70,
          CISA4: 0.85,
          CISA5: 0.78,
        },
        totalQuestionsAnswered: 270,
        averageTimePerQuestion: 60,
        recentTrend: 'improving',
        mockExamScores: [420, 450, 480],
      };

      const prediction = predictScore(mockInput);

      expect(prediction).toHaveProperty('predictedScore');
      expect(prediction).toHaveProperty('confidenceInterval');
      expect(prediction).toHaveProperty('passProbability');
      expect(prediction).toHaveProperty('recommendations');
    });

    it('should return scaled score between 200 and 800', () => {
      const mockInput: PredictionInput = {
        domainAccuracy: {
          CISA1: 0.60,
          CISA2: 0.60,
          CISA3: 0.60,
          CISA4: 0.60,
          CISA5: 0.60,
        },
        totalQuestionsAnswered: 100,
        averageTimePerQuestion: 90,
        recentTrend: 'stable',
        mockExamScores: [],
      };

      const prediction = predictScore(mockInput);

      expect(prediction.predictedScore).toBeGreaterThanOrEqual(200);
      expect(prediction.predictedScore).toBeLessThanOrEqual(800);
    });

    it('should have confidence interval with low less than high', () => {
      const mockInput: PredictionInput = {
        domainAccuracy: {
          CISA1: 0.70,
          CISA2: 0.75,
          CISA3: 0.65,
          CISA4: 0.80,
          CISA5: 0.72,
        },
        totalQuestionsAnswered: 160,
        averageTimePerQuestion: 75,
        recentTrend: 'improving',
        mockExamScores: [430, 460],
      };

      const prediction = predictScore(mockInput);

      expect(prediction.confidenceInterval.low).toBeLessThan(
        prediction.confidenceInterval.high
      );
    });

    it('should provide pass probability between 0 and 100', () => {
      const mockInput: PredictionInput = {
        domainAccuracy: {
          CISA1: 0.50,
          CISA2: 0.50,
          CISA3: 0.50,
          CISA4: 0.50,
          CISA5: 0.50,
        },
        totalQuestionsAnswered: 50,
        averageTimePerQuestion: 120,
        recentTrend: 'declining',
        mockExamScores: [],
      };

      const prediction = predictScore(mockInput);

      expect(prediction.passProbability).toBeGreaterThanOrEqual(0);
      expect(prediction.passProbability).toBeLessThanOrEqual(100);
    });

    it('should provide higher score for better domain accuracy', () => {
      const lowInput: PredictionInput = {
        domainAccuracy: {
          CISA1: 0.50,
          CISA2: 0.50,
          CISA3: 0.50,
          CISA4: 0.50,
          CISA5: 0.50,
        },
        totalQuestionsAnswered: 100,
        averageTimePerQuestion: 90,
        recentTrend: 'stable',
        mockExamScores: [],
      };

      const highInput: PredictionInput = {
        domainAccuracy: {
          CISA1: 0.85,
          CISA2: 0.85,
          CISA3: 0.85,
          CISA4: 0.85,
          CISA5: 0.85,
        },
        totalQuestionsAnswered: 100,
        averageTimePerQuestion: 90,
        recentTrend: 'stable',
        mockExamScores: [],
      };

      const lowPrediction = predictScore(lowInput);
      const highPrediction = predictScore(highInput);

      expect(highPrediction.predictedScore).toBeGreaterThan(lowPrediction.predictedScore);
    });
  });

  describe('analyzeTrends', () => {
    it('should return trend analysis object', () => {
      const trends = analyzeTrends();

      expect(trends).toHaveProperty('overallTrend');
      expect(trends).toHaveProperty('weeklyGrowthRate');
      expect(trends).toHaveProperty('domainTrends');
      expect(['improving', 'stable', 'declining']).toContain(trends.overallTrend);
    });

    it('should provide projectedScoreInWeeks function', () => {
      const trends = analyzeTrends();

      expect(typeof trends.projectedScoreInWeeks).toBe('function');
      const projected = trends.projectedScoreInWeeks(4);
      expect(typeof projected).toBe('number');
    });
  });

  describe('getQuickPrediction', () => {
    it('should return quick prediction without input', () => {
      const prediction = getQuickPrediction();

      expect(prediction).toHaveProperty('predictedScore');
      expect(prediction).toHaveProperty('passProbability');
      expect(prediction).toHaveProperty('readinessLevel');
    });

    it('should return a valid readiness level', () => {
      const prediction = getQuickPrediction();
      
      expect(['not-ready', 'at-risk', 'borderline', 'likely', 'confident']).toContain(
        prediction.readinessLevel
      );
    });
  });

  describe('getStudyPlan', () => {
    it('should return study plan object', () => {
      const plan = getStudyPlan(30);

      expect(plan).toHaveProperty('phase');
      expect(plan).toHaveProperty('hoursPerDay');
      expect(plan).toHaveProperty('focusAreas');
      expect(plan).toHaveProperty('activities');
      expect(Array.isArray(plan.focusAreas)).toBe(true);
      expect(Array.isArray(plan.activities)).toBe(true);
    });

    it('should adjust phase based on days until exam', () => {
      const longPlan = getStudyPlan(60);
      const shortPlan = getStudyPlan(3);

      expect(shortPlan.phase).toBe('cram');
      expect(longPlan.phase).toBe('learning');
    });

    it('should increase hours per day as exam approaches', () => {
      const longPlan = getStudyPlan(60);
      const shortPlan = getStudyPlan(3);

      expect(shortPlan.hoursPerDay).toBeGreaterThan(longPlan.hoursPerDay);
    });
  });
});
