/**
 * Tests for CIA Analytics Service
 * IIA scoring model (250-750 scale, 600 passing)
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  initializeAnalytics,
  recordQuestionAttempt,
  recordStudySession,
  recordMockExam,
  updatePartTrend,
  updateIppfKnowledge,
  updateIiaStandardsMastery,
  updateEthicsCodeFamiliarity,
  addDailyTrend,
  addWeeklyTrend,
  getAnalyticsSummary,
  getPartInsights,
  getStudyPlanProgress,
  rawToScaledScore,
  scaledScoreToPassInfo,
  serializeAnalytics,
  deserializeAnalytics,
  CIA_PART_CONFIG,
  CIAAnalytics,
} from '../../services/ciaAnalytics';

describe('ciaAnalytics', () => {
  let analytics: CIAAnalytics;

  beforeEach(() => {
    analytics = initializeAnalytics('test-user');
  });

  describe('initializeAnalytics', () => {
    it('creates analytics with correct user ID', () => {
      expect(analytics.userId).toBe('test-user');
    });

    it('initializes with zero stats', () => {
      expect(analytics.totalQuestionsAttempted).toBe(0);
      expect(analytics.totalQuestionsCorrect).toBe(0);
      expect(analytics.overallAccuracy).toBe(0);
      expect(analytics.totalMockExamsTaken).toBe(0);
    });

    it('initializes all 3 CIA parts', () => {
      const parts = Object.keys(analytics.partMastery);
      expect(parts).toHaveLength(3);
      expect(parts).toContain('CIA1');
      expect(parts).toContain('CIA2');
      expect(parts).toContain('CIA3');
    });

    it('sets correct part weights', () => {
      expect(analytics.partMastery['CIA1'].examWeight).toBe(40);
      expect(analytics.partMastery['CIA2'].examWeight).toBe(30);
      expect(analytics.partMastery['CIA3'].examWeight).toBe(30);
    });

    it('initializes CIA-specific metrics', () => {
      expect(analytics.ippfKnowledge).toBe(0);
      expect(analytics.iiaStandardsMastery).toBe(0);
      expect(analytics.ethicsCodeFamiliarity).toBe(0);
    });

    it('initializes exam readiness as not-ready', () => {
      expect(analytics.examReadiness).toBe('not-ready');
    });
  });

  describe('CIA_PART_CONFIG', () => {
    it('has correct configuration for Part 1', () => {
      expect(CIA_PART_CONFIG.CIA1.name).toBe('Essentials of Internal Auditing');
      expect(CIA_PART_CONFIG.CIA1.weight).toBe(40);
      expect(CIA_PART_CONFIG.CIA1.questions).toBe(125);
    });

    it('has correct configuration for Part 2', () => {
      expect(CIA_PART_CONFIG.CIA2.name).toBe('Practice of Internal Auditing');
      expect(CIA_PART_CONFIG.CIA2.weight).toBe(30);
      expect(CIA_PART_CONFIG.CIA2.questions).toBe(100);
    });

    it('has correct configuration for Part 3', () => {
      expect(CIA_PART_CONFIG.CIA3.name).toBe('Business Knowledge for Internal Auditing');
      expect(CIA_PART_CONFIG.CIA3.weight).toBe(30);
      expect(CIA_PART_CONFIG.CIA3.questions).toBe(100);
    });

    it('weights sum to 100%', () => {
      const totalWeight = CIA_PART_CONFIG.CIA1.weight + 
                          CIA_PART_CONFIG.CIA2.weight + 
                          CIA_PART_CONFIG.CIA3.weight;
      expect(totalWeight).toBe(100);
    });

    it('has topics for each part', () => {
      expect(CIA_PART_CONFIG.CIA1.topics.length).toBeGreaterThan(0);
      expect(CIA_PART_CONFIG.CIA2.topics.length).toBeGreaterThan(0);
      expect(CIA_PART_CONFIG.CIA3.topics.length).toBeGreaterThan(0);
    });
  });

  describe('rawToScaledScore (IIA 250-750 scale)', () => {
    it('converts 0% to 250 (minimum)', () => {
      expect(rawToScaledScore(0)).toBe(250);
    });

    it('converts 75% to 600 (passing threshold)', () => {
      expect(rawToScaledScore(75)).toBe(600);
    });

    it('converts 100% to 750 (maximum)', () => {
      expect(rawToScaledScore(100)).toBe(750);
    });

    it('handles values below 0', () => {
      expect(rawToScaledScore(-10)).toBe(250);
    });

    it('handles values above 100', () => {
      expect(rawToScaledScore(110)).toBe(750);
    });

    it('scales in lower range (0-75%)', () => {
      const score30 = rawToScaledScore(30);
      expect(score30).toBeGreaterThan(250);
      expect(score30).toBeLessThan(600);
    });

    it('scales in upper range (75-100%)', () => {
      const score90 = rawToScaledScore(90);
      expect(score90).toBeGreaterThan(600);
      expect(score90).toBeLessThan(750);
    });
  });

  describe('scaledScoreToPassInfo', () => {
    it('returns not passed for scores below 600', () => {
      const info = scaledScoreToPassInfo(550);
      expect(info.passed).toBe(false);
    });

    it('returns passed for scores at 600', () => {
      const info = scaledScoreToPassInfo(600);
      expect(info.passed).toBe(true);
    });

    it('returns passed for scores above 600', () => {
      const info = scaledScoreToPassInfo(700);
      expect(info.passed).toBe(true);
    });

    it('returns probability between 0 and 100', () => {
      const info = scaledScoreToPassInfo(550);
      expect(info.probability).toBeGreaterThanOrEqual(0);
      expect(info.probability).toBeLessThanOrEqual(100);
    });
  });

  describe('recordQuestionAttempt', () => {
    it('increments total questions attempted', () => {
      const updated = recordQuestionAttempt(analytics, {
        questionId: 'q1',
        part: 'CIA1',
        isCorrect: true,
        timeSpent: 90,
        attemptedAt: new Date(),
      });
      expect(updated.totalQuestionsAttempted).toBe(1);
    });

    it('increments correct count for correct answers', () => {
      const updated = recordQuestionAttempt(analytics, {
        questionId: 'q1',
        part: 'CIA1',
        isCorrect: true,
        timeSpent: 90,
        attemptedAt: new Date(),
      });
      expect(updated.totalQuestionsCorrect).toBe(1);
    });

    it('does not increment correct count for incorrect answers', () => {
      const updated = recordQuestionAttempt(analytics, {
        questionId: 'q1',
        part: 'CIA1',
        isCorrect: false,
        timeSpent: 90,
        attemptedAt: new Date(),
      });
      expect(updated.totalQuestionsCorrect).toBe(0);
    });

    it('updates part mastery for the attempted part', () => {
      const updated = recordQuestionAttempt(analytics, {
        questionId: 'q1',
        part: 'CIA2',
        isCorrect: true,
        timeSpent: 90,
        attemptedAt: new Date(),
      });
      expect(updated.partMastery['CIA2'].questionsAttempted).toBe(1);
      expect(updated.partMastery['CIA2'].questionsCorrect).toBe(1);
    });

    it('calculates overall accuracy correctly', () => {
      let updated = analytics;
      // 3 correct, 2 incorrect = 60% accuracy
      for (let i = 0; i < 3; i++) {
        updated = recordQuestionAttempt(updated, {
          questionId: `q${i}`,
          part: 'CIA1',
          isCorrect: true,
          timeSpent: 90,
          attemptedAt: new Date(),
        });
      }
      for (let i = 3; i < 5; i++) {
        updated = recordQuestionAttempt(updated, {
          questionId: `q${i}`,
          part: 'CIA1',
          isCorrect: false,
          timeSpent: 90,
          attemptedAt: new Date(),
        });
      }
      expect(updated.overallAccuracy).toBe(60);
    });
  });

  describe('recordStudySession', () => {
    it('increments total study time', () => {
      const updated = recordStudySession(analytics, {
        sessionId: 's1',
        date: new Date(),
        duration: 60,
        type: 'practice',
        part: 'CIA1',
      });
      expect(updated.totalStudyMinutes).toBe(60);
    });

    it('accumulates study time across sessions', () => {
      let updated = analytics;
      for (let i = 0; i < 3; i++) {
        updated = recordStudySession(updated, {
          sessionId: `s${i}`,
          date: new Date(),
          duration: 30,
          type: 'practice',
          part: 'CIA1',
        });
      }
      expect(updated.totalStudyMinutes).toBe(90);
    });
  });

  describe('recordMockExam', () => {
    it('increments mock exams taken', () => {
      const updated = recordMockExam(analytics, 'CIA1', 75, 75, 100);
      expect(updated.mockExamsTaken['CIA1']).toBe(1);
      expect(updated.totalMockExamsTaken).toBe(1);
    });

    it('records scaled score', () => {
      const updated = recordMockExam(analytics, 'CIA1', 75, 75, 100);
      expect(updated.scaledScores['CIA1']).toHaveLength(1);
      expect(updated.scaledScores['CIA1'][0]).toBe(600);
    });

    it('tracks mock exam history per part', () => {
      let updated = analytics;
      updated = recordMockExam(updated, 'CIA1', 70, 70, 100);
      updated = recordMockExam(updated, 'CIA2', 80, 80, 100);
      expect(updated.mockExamsTaken['CIA1']).toBe(1);
      expect(updated.mockExamsTaken['CIA2']).toBe(1);
      expect(updated.totalMockExamsTaken).toBe(2);
    });
  });

  describe('updateIppfKnowledge', () => {
    it('updates IPPF knowledge score', () => {
      const updated = updateIppfKnowledge(analytics, 85);
      expect(updated.ippfKnowledge).toBe(85);
    });

    it('clamps score to 0-100 range', () => {
      let updated = updateIppfKnowledge(analytics, 110);
      expect(updated.ippfKnowledge).toBe(100);
      updated = updateIppfKnowledge(analytics, -10);
      expect(updated.ippfKnowledge).toBe(0);
    });
  });

  describe('updateIiaStandardsMastery', () => {
    it('updates IIA standards mastery score', () => {
      const updated = updateIiaStandardsMastery(analytics, 90);
      expect(updated.iiaStandardsMastery).toBe(90);
    });

    it('clamps score to 0-100 range', () => {
      let updated = updateIiaStandardsMastery(analytics, 150);
      expect(updated.iiaStandardsMastery).toBe(100);
      updated = updateIiaStandardsMastery(analytics, -20);
      expect(updated.iiaStandardsMastery).toBe(0);
    });
  });

  describe('updateEthicsCodeFamiliarity', () => {
    it('updates ethics code familiarity score', () => {
      const updated = updateEthicsCodeFamiliarity(analytics, 80);
      expect(updated.ethicsCodeFamiliarity).toBe(80);
    });

    it('clamps score to 0-100 range', () => {
      let updated = updateEthicsCodeFamiliarity(analytics, 120);
      expect(updated.ethicsCodeFamiliarity).toBe(100);
      updated = updateEthicsCodeFamiliarity(analytics, -5);
      expect(updated.ethicsCodeFamiliarity).toBe(0);
    });
  });

  describe('getAnalyticsSummary', () => {
    it('returns summary with all key metrics', () => {
      const summary = getAnalyticsSummary(analytics);
      expect(summary).toHaveProperty('overview');
      expect(summary.overview).toHaveProperty('accuracy');
      expect(summary.overview).toHaveProperty('questionsCompleted');
      expect(summary).toHaveProperty('partBreakdown');
    });

    it('includes all 3 parts in summary', () => {
      const summary = getAnalyticsSummary(analytics);
      expect(summary.partBreakdown).toHaveLength(3);
    });

    it('includes CIA-specific metrics', () => {
      const summary = getAnalyticsSummary(analytics);
      expect(summary).toHaveProperty('ciaSpecific');
      expect(summary.ciaSpecific).toHaveProperty('ippfScore');
      expect(summary.ciaSpecific).toHaveProperty('iiaStandards');
    });
  });

  describe('getPartInsights', () => {
    it('returns insights for a specific part', () => {
      let updated = analytics;
      for (let i = 0; i < 20; i++) {
        updated = recordQuestionAttempt(updated, {
          questionId: `q${i}`,
          part: 'CIA1',
          isCorrect: i % 2 === 0,
          timeSpent: 90,
          attemptedAt: new Date(),
        });
      }
      const insights = getPartInsights(updated, 'CIA1');
      expect(insights).not.toBeNull();
      expect(insights!.part).toBe('CIA1');
      expect(insights!.accuracy).toBe(50);
    });

    it('includes recommendations', () => {
      const insights = getPartInsights(analytics, 'CIA2');
      expect(insights).not.toBeNull();
      expect(insights!.recommendations).toBeDefined();
      expect(Array.isArray(insights!.recommendations)).toBe(true);
    });
  });

  describe('getStudyPlanProgress', () => {
    it('returns progress metrics', () => {
      const progress = getStudyPlanProgress(analytics);
      expect(progress).toHaveProperty('overallProgress');
      expect(progress).toHaveProperty('partProgress');
    });

    it('tracks progress per part', () => {
      const progress = getStudyPlanProgress(analytics);
      expect(progress.partProgress).toHaveProperty('CIA1');
      expect(progress.partProgress).toHaveProperty('CIA2');
      expect(progress.partProgress).toHaveProperty('CIA3');
    });
  });

  describe('addDailyTrend', () => {
    it('adds daily trend entry', () => {
      const updated = addDailyTrend(analytics, {
        date: new Date(),
        questionsCompleted: 50,
        accuracy: 72,
        studyMinutes: 90,
      });
      expect(updated.dailyTrends).toHaveLength(1);
    });
  });

  describe('addWeeklyTrend', () => {
    it('adds weekly trend entry', () => {
      const updated = addWeeklyTrend(analytics, {
        date: new Date(),
        questionsCompleted: 150,
        accuracy: 75,
        studyMinutes: 300,
      });
      expect(updated.weeklyTrends).toHaveLength(1);
    });
  });

  describe('updatePartTrend', () => {
    it('updates trend based on recent performance', () => {
      let updated = analytics;
      for (let i = 0; i < 10; i++) {
        updated = recordQuestionAttempt(updated, {
          questionId: `q${i}`,
          part: 'CIA1',
          isCorrect: true,
          timeSpent: 60,
          attemptedAt: new Date(),
        });
      }
      // Pass recent accuracy (100% since all correct)
      updated = updatePartTrend(updated, 'CIA1', 100);
      expect(['improving', 'stable']).toContain(updated.partMastery['CIA1'].trend);
    });
  });

  describe('serialization', () => {
    it('serializes analytics to JSON', () => {
      const json = serializeAnalytics(analytics);
      expect(typeof json).toBe('string');
      expect(() => JSON.parse(json)).not.toThrow();
    });

    it('deserializes JSON back to analytics', () => {
      const json = serializeAnalytics(analytics);
      const restored = deserializeAnalytics<CIAAnalytics>(json);
      expect(restored.userId).toBe(analytics.userId);
    });

    it('maintains data through serialization cycle', () => {
      let updated = analytics;
      updated = recordQuestionAttempt(updated, {
        questionId: 'q1',
        part: 'CIA1',
        isCorrect: true,
        timeSpent: 90,
        attemptedAt: new Date(),
      });
      const json = serializeAnalytics(updated);
      const restored = deserializeAnalytics<CIAAnalytics>(json);
      expect(restored.totalQuestionsAttempted).toBe(1);
      expect(restored.totalQuestionsCorrect).toBe(1);
    });
  });
});
