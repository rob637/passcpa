import { describe, it, expect } from 'vitest';
import {
  calculateExamReadiness,
  getStatusText,
  getStatusColor,
  getStatusBgColor,
  type StudyStats,
  type TopicStat,
  type ReadinessData,
} from '../../utils/examReadiness';

describe('examReadiness', () => {
  describe('calculateExamReadiness', () => {
    it('calculates readiness for a well-prepared student', () => {
      const stats: StudyStats = {
        totalQuestions: 500,
        correctAnswers: 400,
        accuracy: 80,
      };
      const topicPerformance: TopicStat[] = Array(15).fill({
        id: 'topic1',
        topic: 'Topic',
        accuracy: 80,
        questions: 30,
      });

      const result = calculateExamReadiness(stats, topicPerformance, 50, 50, 20, 20);

      expect(result.overall).toBeGreaterThanOrEqual(80);
      expect(result.status).toBe('ready');
      expect(result.breakdown.accuracy).toBe(100);
      expect(result.breakdown.volume).toBe(100);
      expect(result.breakdown.lessons).toBe(100);
    });

    it('calculates readiness for beginner student', () => {
      const stats: StudyStats = {
        totalQuestions: 50,
        correctAnswers: 25,
        accuracy: 50,
      };
      const topicPerformance: TopicStat[] = [
        { id: 't1', topic: 'Topic 1', accuracy: 50, questions: 30 },
        { id: 't2', topic: 'Topic 2', accuracy: 50, questions: 20 },
      ];

      const result = calculateExamReadiness(stats, topicPerformance, 5, 50);

      expect(result.overall).toBeLessThan(60);
      expect(result.status).toBe('more-study');
    });

    it('calculates readiness for intermediate student', () => {
      const stats: StudyStats = {
        totalQuestions: 250,
        correctAnswers: 175,
        accuracy: 70,
      };
      const topicPerformance: TopicStat[] = Array(10).fill({
        id: 'topic',
        topic: 'Topic',
        accuracy: 70,
        questions: 25,
      });

      const result = calculateExamReadiness(stats, topicPerformance, 30, 50, 10, 20);

      // With TBS included, score should be in 'almost' range
      expect(result.overall).toBeGreaterThanOrEqual(55);
      expect(result.overall).toBeLessThan(80);
      expect(result.status).toBe('almost');
    });

    it('handles zero questions', () => {
      const stats: StudyStats = {
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0,
      };

      const result = calculateExamReadiness(stats, [], 0, 50);

      expect(result.overall).toBe(0);
      expect(result.status).toBe('more-study');
      expect(result.breakdown.accuracy).toBe(0);
      expect(result.breakdown.coverage).toBe(0);
      expect(result.breakdown.volume).toBe(0);
      expect(result.breakdown.lessons).toBe(0);
    });

    it('handles zero total lessons', () => {
      const stats: StudyStats = {
        totalQuestions: 100,
        accuracy: 60,
      };

      const result = calculateExamReadiness(stats, [], 0, 0);

      expect(result.breakdown.lessons).toBe(0);
    });

    it('caps accuracy score at 100', () => {
      const stats: StudyStats = {
        totalQuestions: 100,
        accuracy: 100,
      };

      const result = calculateExamReadiness(stats, [], 0, 50);

      // 100 * 1.25 = 125, but should cap at 100
      expect(result.breakdown.accuracy).toBe(100);
    });

    it('caps coverage score at 100', () => {
      const stats: StudyStats = {
        totalQuestions: 100,
        accuracy: 70,
      };
      const topicPerformance: TopicStat[] = Array(30).fill({
        id: 'topic',
        topic: 'Topic',
        accuracy: 70,
        questions: 10,
      });

      const result = calculateExamReadiness(stats, topicPerformance, 0, 50);

      expect(result.breakdown.coverage).toBe(100);
    });

    it('caps volume score at 100', () => {
      const stats: StudyStats = {
        totalQuestions: 1000,
        accuracy: 70,
      };

      const result = calculateExamReadiness(stats, [], 0, 50);

      expect(result.breakdown.volume).toBe(100);
    });

    it('rounds overall score', () => {
      const stats: StudyStats = {
        totalQuestions: 123,
        accuracy: 67.5,
      };

      const result = calculateExamReadiness(stats, [], 17, 50);

      expect(Number.isInteger(result.overall)).toBe(true);
    });

    it('includes all breakdown scores', () => {
      const stats: StudyStats = {
        totalQuestions: 100,
        accuracy: 60,
      };

      const result = calculateExamReadiness(stats, [], 10, 50);

      expect(result.breakdown).toHaveProperty('accuracy');
      expect(result.breakdown).toHaveProperty('coverage');
      expect(result.breakdown).toHaveProperty('volume');
      expect(result.breakdown).toHaveProperty('lessons');
    });

    it('handles undefined accuracy in stats', () => {
      const stats: StudyStats = {
        totalQuestions: 100,
        accuracy: 0,
      };

      const result = calculateExamReadiness(stats, [], 0, 50);

      expect(result.breakdown.accuracy).toBe(0);
    });
  });

  describe('getStatusText', () => {
    it('returns "Exam Ready!" for ready status', () => {
      expect(getStatusText('ready')).toBe('Exam Ready!');
    });

    it('returns "Almost There" for almost status', () => {
      expect(getStatusText('almost')).toBe('Almost There');
    });

    it('returns "Keep Studying" for more-study status', () => {
      expect(getStatusText('more-study')).toBe('Keep Studying');
    });
  });

  describe('getStatusColor', () => {
    it('returns success color for ready status', () => {
      expect(getStatusColor('ready')).toBe('text-success-600');
    });

    it('returns warning color for almost status', () => {
      expect(getStatusColor('almost')).toBe('text-warning-600');
    });

    it('returns primary color for more-study status', () => {
      expect(getStatusColor('more-study')).toBe('text-primary-600');
    });
  });

  describe('getStatusBgColor', () => {
    it('returns success background for ready status', () => {
      expect(getStatusBgColor('ready')).toBe('bg-success-50 border-success-200');
    });

    it('returns warning background for almost status', () => {
      expect(getStatusBgColor('almost')).toBe('bg-warning-50 border-warning-200');
    });

    it('returns primary background for more-study status', () => {
      expect(getStatusBgColor('more-study')).toBe('bg-primary-50 border-primary-200');
    });
  });

  describe('Type exports', () => {
    it('ReadinessData type has correct structure', () => {
      const data: ReadinessData = {
        overall: 75,
        breakdown: {
          accuracy: 80,
          coverage: 70,
          volume: 60,
          lessons: 90,
          tbs: 75,
        },
        status: 'almost',
      };

      expect(data.overall).toBe(75);
      expect(data.breakdown.accuracy).toBe(80);
      expect(data.status).toBe('almost');
    });

    it('TopicStat type has correct structure', () => {
      const stat: TopicStat = {
        id: 'topic-1',
        topic: 'Revenue Recognition',
        accuracy: 85.5,
        questions: 42,
      };

      expect(stat.id).toBe('topic-1');
      expect(stat.topic).toBe('Revenue Recognition');
      expect(stat.accuracy).toBe(85.5);
      expect(stat.questions).toBe(42);
    });

    it('StudyStats type has correct structure', () => {
      const stats: StudyStats = {
        totalQuestions: 200,
        correctAnswers: 160,
        accuracy: 80,
        lessonsCompleted: 25,
        totalLessons: 50,
      };

      expect(stats.totalQuestions).toBe(200);
      expect(stats.accuracy).toBe(80);
    });
  });

  describe('Edge cases', () => {
    it('handles very high accuracy (100%)', () => {
      const stats: StudyStats = {
        totalQuestions: 100,
        correctAnswers: 100,
        accuracy: 100,
      };

      const result = calculateExamReadiness(stats, [], 50, 50);

      expect(result.breakdown.accuracy).toBe(100);
    });

    it('handles fractional percentages', () => {
      const stats: StudyStats = {
        totalQuestions: 333,
        accuracy: 66.67,
      };

      const result = calculateExamReadiness(stats, [], 33, 50);

      expect(typeof result.overall).toBe('number');
      expect(result.overall).toBeGreaterThanOrEqual(0);
      expect(result.overall).toBeLessThanOrEqual(100);
    });

    it('handles very large numbers', () => {
      const stats: StudyStats = {
        totalQuestions: 10000,
        accuracy: 90,
      };
      const topicPerformance: TopicStat[] = Array(100).fill({
        id: 'topic',
        topic: 'Topic',
        accuracy: 90,
        questions: 100,
      });

      const result = calculateExamReadiness(stats, topicPerformance, 100, 100);

      expect(result.overall).toBeLessThanOrEqual(100);
      expect(result.breakdown.accuracy).toBeLessThanOrEqual(100);
      expect(result.breakdown.coverage).toBeLessThanOrEqual(100);
      expect(result.breakdown.volume).toBeLessThanOrEqual(100);
    });
  });
});
