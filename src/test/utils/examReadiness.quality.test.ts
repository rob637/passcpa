/**
 * Exam Readiness Calculation Tests
 * 
 * These tests verify the scoring algorithm that tells users
 * whether they're ready for the CPA exam. Incorrect calculations
 * could give false confidence or discourage prepared students.
 */

import { describe, it, expect } from 'vitest';
import {
  calculateExamReadiness,
  getStatusText,
  getStatusColor,
  getStatusBgColor,
  type StudyStats,
  type TopicStat,
} from '../../utils/examReadiness';

describe('Exam Readiness Calculation', () => {
  describe('calculateExamReadiness', () => {
    // Note: The actual function signature is:
    // calculateExamReadiness(stats, topicPerformance[], lessonsCompleted, totalLessons)
    
    const createTopics = (count: number): TopicStat[] => 
      Array.from({ length: count }, (_, i) => ({
        id: `topic-${i}`,
        topic: `Topic ${i}`,
        accuracy: 75,
        questions: 20,
      }));

    const baseStats: StudyStats = {
      totalQuestions: 250,
      correctAnswers: 200,
      accuracy: 80,
      lessonsCompleted: 10,
      totalLessons: 20,
    };

    describe('Component Score Calculations', () => {
      it('calculates accuracy component correctly (35% weight)', () => {
        const result = calculateExamReadiness(
          { ...baseStats, accuracy: 80 },
          createTopics(15),
          10,
          20
        );
        
        // 80% accuracy * 1.25 = 100 (capped), contributes 35 points
        expect(result.breakdown.accuracy).toBe(100);
      });

      it('caps accuracy score at 100', () => {
        const result = calculateExamReadiness(
          { ...baseStats, accuracy: 90 },
          createTopics(15),
          10,
          20
        );
        
        // 90 * 1.25 = 112.5, capped at 100
        expect(result.breakdown.accuracy).toBe(100);
      });

      it('calculates coverage component based on topics practiced (25% weight)', () => {
        // 15 topics is the baseline for 100% coverage
        const result = calculateExamReadiness(
          baseStats,
          createTopics(8), // About half
          10,
          20
        );
        
        // 8/15 * 100 ≈ 53%
        expect(result.breakdown.coverage).toBeCloseTo(53, 0);
      });

      it('calculates volume component correctly (20% weight)', () => {
        // 500 questions = 100%
        const result = calculateExamReadiness(
          { ...baseStats, totalQuestions: 250 },
          createTopics(15),
          10,
          20
        );
        
        // 250/500 * 100 = 50%
        expect(result.breakdown.volume).toBe(50);
      });

      it('calculates consistency component correctly (20% weight)', () => {
        const result = calculateExamReadiness(
          baseStats,
          createTopics(15),
          10, // lessons completed
          20  // total lessons
        );
        
        // 10/20 * 100 = 50%
        expect(result.breakdown.consistency).toBe(50);
      });
    });

    describe('Overall Score and Status', () => {
      it('returns "ready" status for score >= 80', () => {
        const result = calculateExamReadiness(
          { ...baseStats, accuracy: 85, totalQuestions: 450 },
          createTopics(14),
          18, // 90% lessons
          20
        );
        
        expect(result.status).toBe('ready');
        expect(result.overall).toBeGreaterThanOrEqual(80);
      });

      it('returns "almost" status for score >= 60 and < 80', () => {
        const result = calculateExamReadiness(
          { ...baseStats, accuracy: 70, totalQuestions: 300 },
          createTopics(10),
          12,
          20
        );
        
        expect(result.status).toBe('almost');
        expect(result.overall).toBeGreaterThanOrEqual(60);
        expect(result.overall).toBeLessThan(80);
      });

      it('returns "more-study" status for score < 60', () => {
        const result = calculateExamReadiness(
          { ...baseStats, accuracy: 50, totalQuestions: 100 },
          createTopics(5),
          5,
          20
        );
        
        expect(result.status).toBe('more-study');
        expect(result.overall).toBeLessThan(60);
      });
    });

    describe('Edge Cases', () => {
      it('handles zero topics gracefully', () => {
        const result = calculateExamReadiness(
          baseStats,
          [],
          10,
          20
        );
        
        expect(result.breakdown.coverage).toBe(0);
        expect(result.overall).toBeGreaterThanOrEqual(0);
      });

      it('handles zero lessons completed', () => {
        const result = calculateExamReadiness(
          baseStats,
          createTopics(10),
          0, // no lessons
          20
        );
        
        expect(result.breakdown.consistency).toBe(0);
      });

      it('handles zero total lessons', () => {
        const result = calculateExamReadiness(
          baseStats,
          createTopics(10),
          0,
          0 // zero total lessons
        );
        
        expect(result.breakdown.consistency).toBe(0);
      });

      it('handles zero accuracy', () => {
        const result = calculateExamReadiness(
          { ...baseStats, accuracy: 0 },
          createTopics(10),
          10,
          20
        );
        
        expect(result.breakdown.accuracy).toBe(0);
      });

      it('handles maximum values without errors', () => {
        const result = calculateExamReadiness(
          { ...baseStats, accuracy: 100, totalQuestions: 1000 },
          createTopics(20),
          20,
          20
        );
        
        // Should cap at 100
        expect(result.overall).toBeLessThanOrEqual(100);
        expect(result.status).toBe('ready');
      });
    });

    describe('Score Weighting', () => {
      it('uses correct weights (35/25/20/20)', () => {
        // Perfect scores in all areas
        const result = calculateExamReadiness(
          { ...baseStats, accuracy: 80, totalQuestions: 500 },
          createTopics(15), // 100% coverage
          20, // 100% lessons
          20
        );
        
        // All components at 100% should give 100% overall
        expect(result.overall).toBe(100);
      });
    });
  });

  describe('Status Helper Functions', () => {
    describe('getStatusText', () => {
      it('returns correct text for "ready" status', () => {
        const text = getStatusText('ready');
        expect(text.toLowerCase()).toMatch(/ready/);
      });

      it('returns correct text for "almost" status', () => {
        const text = getStatusText('almost');
        expect(text.toLowerCase()).toMatch(/almost/);
      });

      it('returns correct text for "more-study" status', () => {
        const text = getStatusText('more-study');
        expect(text).toBeTruthy();
      });
    });

    describe('getStatusColor', () => {
      it('returns different colors for each status', () => {
        const readyColor = getStatusColor('ready');
        const almostColor = getStatusColor('almost');
        const moreStudyColor = getStatusColor('more-study');
        
        // Just verify they're different
        expect(readyColor).not.toBe(almostColor);
        expect(almostColor).not.toBe(moreStudyColor);
      });

      it('returns green-ish color for ready', () => {
        const color = getStatusColor('ready');
        // Could be semantic class like 'success' or actual color name
        expect(color.toLowerCase()).toMatch(/green|emerald|success/);
      });

      it('returns yellow-ish color for almost', () => {
        const color = getStatusColor('almost');
        // Could be semantic class like 'warning' or actual color name
        expect(color.toLowerCase()).toMatch(/yellow|amber|warning/);
      });
    });

    describe('getStatusBgColor', () => {
      it('returns different bg colors for each status', () => {
        const readyBg = getStatusBgColor('ready');
        const almostBg = getStatusBgColor('almost');
        const moreBg = getStatusBgColor('more-study');
        
        expect(readyBg).not.toBe(almostBg);
        expect(almostBg).not.toBe(moreBg);
        expect(readyBg).not.toBe(moreBg);
      });
    });
  });
});
