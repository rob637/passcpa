/**
 * Tests for CIA Score Predictor Service
 * IIA scoring model (250-750 scale, 600 passing)
 */
import { describe, it, expect } from 'vitest';
import {
  rawToScaled,
  scaledToRaw,
  predictPartScore,
  predictOverall,
  calculateImprovementRate,
  projectFutureScore,
  estimateSessionsToTarget,
  generateScoreReport,
  PerformanceData,
} from '../../services/ciaScorePredictor';

describe('ciaScorePredictor', () => {
  describe('rawToScaled (IIA 250-750 scale)', () => {
    it('converts 0% to 250 (minimum)', () => {
      expect(rawToScaled(0)).toBe(250);
    });

    it('converts 100% to 750 (maximum)', () => {
      expect(rawToScaled(100)).toBe(750);
    });

    it('converts 75% to 600 (passing)', () => {
      expect(rawToScaled(75)).toBe(600);
    });

    it('handles negative values', () => {
      expect(rawToScaled(-10)).toBe(250);
    });

    it('handles values over 100', () => {
      expect(rawToScaled(120)).toBe(750);
    });

    it('scales in lower range (0-75%)', () => {
      const score30 = rawToScaled(30);
      expect(score30).toBeGreaterThan(250);
      expect(score30).toBeLessThan(600);
    });

    it('scales in upper range (75-100%)', () => {
      const score90 = rawToScaled(90);
      expect(score90).toBeGreaterThan(600);
      expect(score90).toBeLessThan(750);
    });

    it('is monotonically increasing', () => {
      const scores = [0, 25, 50, 75, 100].map(rawToScaled);
      for (let i = 1; i < scores.length; i++) {
        expect(scores[i]).toBeGreaterThan(scores[i - 1]);
      }
    });
  });

  describe('scaledToRaw', () => {
    it('converts 250 to 0%', () => {
      expect(scaledToRaw(250)).toBe(0);
    });

    it('converts 750 to 100%', () => {
      expect(scaledToRaw(750)).toBe(100);
    });

    it('converts 600 to 75%', () => {
      expect(scaledToRaw(600)).toBe(75);
    });

    it('handles values below 250', () => {
      expect(scaledToRaw(200)).toBe(0);
    });

    it('handles values above 750', () => {
      expect(scaledToRaw(800)).toBe(100);
    });

    it('is inverse of rawToScaled', () => {
      const originalRaw = 65;
      const scaled = rawToScaled(originalRaw);
      const backToRaw = scaledToRaw(scaled);
      expect(backToRaw).toBeCloseTo(originalRaw, 0);
    });
  });

  describe('predictPartScore', () => {
    const basePerformance: PerformanceData = {
      part: 'CIA1',
      questionsAttempted: 100,
      questionsCorrect: 75,
      accuracy: 75,
      averageTimePerQuestion: 72,
      mockExamScores: [72, 75, 78],
      recentTrend: 'stable',
      topicMastery: {},
    };

    it('returns prediction for valid data', () => {
      const prediction = predictPartScore(basePerformance);
      expect(prediction.part).toBe('CIA1');
      expect(prediction.predictedRawScore).toBeGreaterThan(0);
      expect(prediction.predictedScaledScore).toBeGreaterThan(0);
    });

    it('includes confidence interval', () => {
      const prediction = predictPartScore(basePerformance);
      expect(prediction.confidenceInterval).toBeDefined();
      expect(prediction.confidenceInterval.low).toBeLessThan(prediction.confidenceInterval.high);
    });

    it('calculates pass probability', () => {
      const prediction = predictPartScore(basePerformance);
      expect(prediction.passProbability).toBeGreaterThanOrEqual(0);
      expect(prediction.passProbability).toBeLessThanOrEqual(100);
    });

    it('includes recommendations', () => {
      const prediction = predictPartScore(basePerformance);
      expect(prediction.recommendations).toBeDefined();
      expect(Array.isArray(prediction.recommendations)).toBe(true);
    });

    it('adjusts prediction for improving trend', () => {
      const improving = { ...basePerformance, recentTrend: 'improving' as const };
      const stable = { ...basePerformance, recentTrend: 'stable' as const };
      const improvingPred = predictPartScore(improving);
      const stablePred = predictPartScore(stable);
      expect(improvingPred.predictedRawScore).toBeGreaterThanOrEqual(stablePred.predictedRawScore);
    });

    it('adjusts prediction for declining trend', () => {
      const declining = { ...basePerformance, recentTrend: 'declining' as const };
      const stable = { ...basePerformance, recentTrend: 'stable' as const };
      const decliningPred = predictPartScore(declining);
      const stablePred = predictPartScore(stable);
      expect(decliningPred.predictedRawScore).toBeLessThanOrEqual(stablePred.predictedRawScore);
    });

    it('factors in mock exam performance', () => {
      const withMocks = { ...basePerformance, mockExamScores: [80, 82, 85] };
      const prediction = predictPartScore(withMocks);
      expect(prediction.predictedRawScore).toBeGreaterThan(basePerformance.accuracy);
    });
  });

  describe('predictOverall', () => {
    const partData: Record<string, PerformanceData> = {
      CIA1: {
        part: 'CIA1',
        questionsAttempted: 100,
        questionsCorrect: 80,
        accuracy: 80,
        averageTimePerQuestion: 72,
        mockExamScores: [75, 78],
        recentTrend: 'stable',
        topicMastery: {},
      },
      CIA2: {
        part: 'CIA2',
        questionsAttempted: 80,
        questionsCorrect: 60,
        accuracy: 75,
        averageTimePerQuestion: 72,
        mockExamScores: [72, 74],
        recentTrend: 'stable',
        topicMastery: {},
      },
      CIA3: {
        part: 'CIA3',
        questionsAttempted: 60,
        questionsCorrect: 45,
        accuracy: 75,
        averageTimePerQuestion: 72,
        mockExamScores: [70, 72],
        recentTrend: 'stable',
        topicMastery: {},
      },
    };

    it('returns predictions for all parts', () => {
      const overall = predictOverall(partData);
      expect(overall.partPredictions).toHaveProperty('CIA1');
      expect(overall.partPredictions).toHaveProperty('CIA2');
      expect(overall.partPredictions).toHaveProperty('CIA3');
    });

    it('calculates overall pass probability', () => {
      const overall = predictOverall(partData);
      expect(overall.overallPassProbability).toBeGreaterThanOrEqual(0);
      expect(overall.overallPassProbability).toBeLessThanOrEqual(100);
    });

    it('determines readiness level', () => {
      const overall = predictOverall(partData);
      expect(['not-ready', 'getting-close', 'ready', 'well-prepared']).toContain(overall.readinessLevel);
    });

    it('estimates study hours needed', () => {
      const overall = predictOverall(partData);
      expect(overall.estimatedStudyHoursNeeded).toBeGreaterThanOrEqual(0);
    });
  });

  describe('calculateImprovementRate', () => {
    // Helper to create dated scores
    const createDatedScores = (scores: number[]) => 
      scores.map((score, i) => ({ date: new Date(2024, 0, i + 1), score }));

    it('returns positive rate for improvement', () => {
      const scores = createDatedScores([60, 65, 70, 75, 80]);
      const rate = calculateImprovementRate(scores);
      expect(rate).toBeGreaterThan(0);
    });

    it('returns negative rate for decline', () => {
      const scores = createDatedScores([80, 75, 70, 65, 60]);
      const rate = calculateImprovementRate(scores);
      expect(rate).toBeLessThan(0);
    });

    it('returns near zero for stable performance', () => {
      const scores = createDatedScores([70, 71, 70, 69, 70]);
      const rate = calculateImprovementRate(scores);
      expect(Math.abs(rate)).toBeLessThan(2);
    });

    it('handles empty array', () => {
      const rate = calculateImprovementRate([]);
      expect(rate).toBe(0);
    });

    it('handles single score', () => {
      const rate = calculateImprovementRate(createDatedScores([75]));
      expect(rate).toBe(0);
    });
  });

  describe('projectFutureScore', () => {
    it('projects higher score with positive improvement rate', () => {
      const current = 70;
      const rate = 2; // 2% improvement per session
      const sessions = 10;
      const projected = projectFutureScore(current, rate, sessions);
      expect(projected).toBeGreaterThan(current);
    });

    it('projects lower score with negative improvement rate', () => {
      const current = 80;
      const rate = -1;
      const sessions = 5;
      const projected = projectFutureScore(current, rate, sessions);
      expect(projected).toBeLessThan(current);
    });

    it('caps at 100%', () => {
      const current = 90;
      const rate = 5;
      const sessions = 20;
      const projected = projectFutureScore(current, rate, sessions);
      expect(projected).toBeLessThanOrEqual(100);
    });

    it('floors at 0%', () => {
      const current = 30;
      const rate = -10;
      const sessions = 10;
      const projected = projectFutureScore(current, rate, sessions);
      expect(projected).toBeGreaterThanOrEqual(0);
    });
  });

  describe('estimateSessionsToTarget', () => {
    it('returns 0 if already at target', () => {
      const sessions = estimateSessionsToTarget(80, 75, 2);
      expect(sessions).toBe(0);
    });

    it('returns positive number if below target', () => {
      const sessions = estimateSessionsToTarget(65, 75, 2);
      expect(sessions).toBeGreaterThan(0);
    });

    it('returns higher sessions for larger gap', () => {
      const small = estimateSessionsToTarget(70, 75, 2);
      const large = estimateSessionsToTarget(50, 75, 2);
      expect(large).toBeGreaterThan(small);
    });

    it('returns higher sessions for slower improvement rate', () => {
      const fast = estimateSessionsToTarget(60, 75, 3);
      const slow = estimateSessionsToTarget(60, 75, 1);
      expect(slow).toBeGreaterThan(fast);
    });
  });

  describe('generateScoreReport', () => {
    const partData: Record<string, PerformanceData> = {
      CIA1: {
        part: 'CIA1',
        questionsAttempted: 100,
        questionsCorrect: 75,
        accuracy: 75,
        averageTimePerQuestion: 72,
        mockExamScores: [72, 75],
        recentTrend: 'stable',
        topicMastery: { 'IPPF': 80, 'Governance': 70 },
      },
      CIA2: {
        part: 'CIA2',
        questionsAttempted: 80,
        questionsCorrect: 60,
        accuracy: 75,
        averageTimePerQuestion: 72,
        mockExamScores: [70, 73],
        recentTrend: 'improving',
        topicMastery: { 'Engagement': 75, 'Planning': 70 },
      },
      CIA3: {
        part: 'CIA3',
        questionsAttempted: 60,
        questionsCorrect: 42,
        accuracy: 70,
        averageTimePerQuestion: 72,
        mockExamScores: [68, 71],
        recentTrend: 'stable',
        topicMastery: { 'IT': 65, 'Business': 75 },
      },
    };

    // First generate the overall prediction, then use it for the report
    const getOverallPrediction = () => predictOverall(partData as Record<'CIA1' | 'CIA2' | 'CIA3', PerformanceData>);

    it('generates comprehensive report', () => {
      const prediction = getOverallPrediction();
      const report = generateScoreReport(prediction);
      expect(report).toBeDefined();
      expect(report).toHaveProperty('summary');
      expect(report).toHaveProperty('partDetails');
      expect(report).toHaveProperty('overallStatus');
      expect(report).toHaveProperty('priorityOrder');
    });

    it('includes part details for all parts', () => {
      const prediction = getOverallPrediction();
      const report = generateScoreReport(prediction);
      expect(report.partDetails.length).toBe(3);
      expect(report.partDetails.map(p => p.part)).toContain('CIA1');
      expect(report.partDetails.map(p => p.part)).toContain('CIA2');
      expect(report.partDetails.map(p => p.part)).toContain('CIA3');
    });

    it('includes overall status assessment', () => {
      const prediction = getOverallPrediction();
      const report = generateScoreReport(prediction);
      expect(typeof report.overallStatus).toBe('string');
      expect(report.overallStatus.length).toBeGreaterThan(0);
    });

    it('includes priority order for parts', () => {
      const prediction = getOverallPrediction();
      const report = generateScoreReport(prediction);
      expect(report.priorityOrder).toHaveLength(3);
      // Priority order should be sorted by pass probability (lowest first)
      expect(report.priorityOrder).toContain('CIA1');
      expect(report.priorityOrder).toContain('CIA2');
      expect(report.priorityOrder).toContain('CIA3');
    });

    it('identifies part status correctly', () => {
      const prediction = getOverallPrediction();
      const report = generateScoreReport(prediction);
      // Each part should have a status
      for (const part of report.partDetails) {
        expect(['passing', 'borderline', 'failing']).toContain(part.status);
        expect(typeof part.score).toBe('number');
        expect(typeof part.passProbability).toBe('number');
      }
    });
  });
});
