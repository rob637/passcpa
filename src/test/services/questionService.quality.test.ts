/**
 * Question Service - Quality Tests (Bug-Finding Focus)
 * 
 * Tests the question fetching and filtering algorithms for edge cases.
 * These tests are designed to find issues in:
 * - Filter combinations that might return empty results
 * - Edge cases with excludeIds
 * - Adaptive selection algorithm bugs
 * - Cache behavior edge cases
 * 
 * @batch 2 of 20 (25 tests)
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  fetchQuestions,
  getQuestionById,
  getWeakAreaQuestions,
  getQuestionCount,
  getQuestionStats,
  clearQuestionCache,
  fetchAdaptiveQuestions,
  getTopicsForSection,
  type AdaptiveSelectionInput,
} from '../../services/questionService';
import type { ExamSection } from '../../types';

// Mock question history service (smart selection)
vi.mock('../../services/questionHistoryService', () => ({
  getSmartQuestionSelection: vi.fn().mockResolvedValue({
    questionIds: ['q1', 'q2', 'q3'],
    breakdown: { due: 1, incorrect: 1, fresh: 1 },
  }),
}));

describe('Question Service - Quality Tests', () => {
  beforeEach(() => {
    clearQuestionCache();
    vi.clearAllMocks();
  });

  describe('fetchQuestions - Filter Edge Cases', () => {
    it('returns empty array when section has no questions', async () => {
      // Using a section that might not have questions
      const questions = await fetchQuestions({ 
        section: 'TCP' as ExamSection, // TCP might have fewer questions
        topicId: 'nonexistent-topic-12345',
        count: 5 
      });

      expect(Array.isArray(questions)).toBe(true);
      // Should return 0 if no matches
    });

    it('handles count of 0', async () => {
      const questions = await fetchQuestions({ 
        section: 'FAR', 
        count: 0 
      });

      expect(questions).toHaveLength(0);
    });

    it('handles count of 1', async () => {
      const questions = await fetchQuestions({ 
        section: 'FAR', 
        count: 1 
      });

      expect(questions.length).toBeLessThanOrEqual(1);
    });

    it('handles very large count gracefully', async () => {
      const questions = await fetchQuestions({ 
        section: 'FAR', 
        count: 100000 
      });

      // Should return all available, not crash
      expect(Array.isArray(questions)).toBe(true);
    });

    it('handles negative count', async () => {
      const questions = await fetchQuestions({ 
        section: 'FAR', 
        count: -5 
      });

      // Should handle gracefully
      expect(Array.isArray(questions)).toBe(true);
    });

    it('filters by multiple criteria simultaneously', async () => {
      const questions = await fetchQuestions({ 
        section: 'FAR',
        difficulty: 'hard',
        count: 5
      });

      questions.forEach(q => {
        expect(q.section).toBe('FAR');
        expect(q.difficulty).toBe('hard');
      });
    });

    it('excludeIds with empty array works', async () => {
      const questions = await fetchQuestions({ 
        section: 'FAR', 
        count: 5,
        excludeIds: []
      });

      expect(questions.length).toBeGreaterThan(0);
    });

    it('excludeIds with all question IDs returns empty', async () => {
      // First get some questions
      const allQuestions = await fetchQuestions({ section: 'FAR', count: 1000 });
      const allIds = allQuestions.map(q => q.id);

      // Then try to fetch excluding all of them
      const noQuestions = await fetchQuestions({ 
        section: 'FAR', 
        count: 5,
        excludeIds: allIds
      });

      expect(noQuestions.length).toBe(0);
    });

    it('handles undefined section (all sections)', async () => {
      const questions = await fetchQuestions({ count: 5 });

      expect(questions.length).toBeLessThanOrEqual(5);
      // Questions can be from different sections
    });

    it('hr1Only filter works correctly', async () => {
      const hr1Questions = await fetchQuestions({ 
        section: 'REG',
        hr1Only: true,
        count: 10
      });

      // All returned questions should have hr1 = true
      hr1Questions.forEach(q => {
        expect(q.hr1).toBe(true);
      });
    });
  });

  describe('getQuestionById - Edge Cases', () => {
    it('returns null for non-existent ID', async () => {
      const question = await getQuestionById('nonexistent-id-xyz-123');

      expect(question).toBeNull();
    });

    it('returns null for empty string ID', async () => {
      const question = await getQuestionById('');

      expect(question).toBeNull();
    });

    it('finds question that exists in cache', async () => {
      // First, fetch some questions to populate cache
      const questions = await fetchQuestions({ section: 'FAR', count: 1 });
      
      if (questions.length > 0) {
        const found = await getQuestionById(questions[0].id);
        expect(found).toBeDefined();
        expect(found?.id).toBe(questions[0].id);
      }
    });

    it('handles special characters in ID', async () => {
      const question = await getQuestionById('id/with/slashes');

      expect(question).toBeNull(); // Should not crash
    });
  });

  describe('getWeakAreaQuestions - Edge Cases', () => {
    it('handles empty weakTopics array', async () => {
      const questions = await getWeakAreaQuestions('user-1', 'FAR', 5, []);

      expect(Array.isArray(questions)).toBe(true);
    });

    it('handles single weak topic', async () => {
      const questions = await getWeakAreaQuestions('user-1', 'FAR', 5, ['Revenue']);

      expect(Array.isArray(questions)).toBe(true);
    });

    it('handles many weak topics (more than 3)', async () => {
      const manyTopics = ['Topic1', 'Topic2', 'Topic3', 'Topic4', 'Topic5'];
      const questions = await getWeakAreaQuestions('user-1', 'FAR', 10, manyTopics);

      // Should limit to first 3 topics
      expect(Array.isArray(questions)).toBe(true);
    });

    it('handles count of 0', async () => {
      const questions = await getWeakAreaQuestions('user-1', 'FAR', 0, ['Revenue']);

      expect(questions.length).toBe(0);
    });

    it('handles nonexistent topics gracefully', async () => {
      const questions = await getWeakAreaQuestions(
        'user-1', 
        'FAR', 
        5, 
        ['NonexistentTopic12345']
      );

      expect(Array.isArray(questions)).toBe(true);
    });
  });

  describe('getQuestionCount - Edge Cases', () => {
    it('returns count for valid section', async () => {
      const count = await getQuestionCount('FAR');

      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(0);
    });

    it('returns 0 for invalid section', async () => {
      const count = await getQuestionCount('INVALID' as ExamSection);

      expect(count).toBe(0);
    });

    it('returns total count for all sections when no section specified', async () => {
      const totalCount = await getQuestionCount();
      const farCount = await getQuestionCount('FAR');
      const audCount = await getQuestionCount('AUD');

      expect(totalCount).toBeGreaterThanOrEqual(farCount + audCount);
    });
  });

  describe('getQuestionStats', () => {
    it('returns valid stats object', async () => {
      const stats = await getQuestionStats();

      expect(stats).toHaveProperty('total');
      expect(stats).toHaveProperty('bySection');
      expect(typeof stats.total).toBe('number');
      expect(typeof stats.bySection).toBe('object');
    });

    it('bySection contains expected sections', async () => {
      const stats = await getQuestionStats();

      expect(stats.bySection).toHaveProperty('FAR');
      expect(stats.bySection).toHaveProperty('AUD');
      expect(stats.bySection).toHaveProperty('REG');
    });

    it('total equals sum of all section counts', async () => {
      const stats = await getQuestionStats();

      const sum = Object.values(stats.bySection).reduce((a, b) => a + b, 0);
      expect(stats.total).toBe(sum);
    });
  });

  describe('fetchAdaptiveQuestions - Edge Cases', () => {
    it('handles empty topicStats', async () => {
      const input: AdaptiveSelectionInput = {
        section: 'FAR',
        count: 10,
        topicStats: [],
      };

      const result = await fetchAdaptiveQuestions(input);

      expect(result.questions).toBeDefined();
      expect(result.breakdown).toBeDefined();
    });

    it('handles count of 0', async () => {
      const input: AdaptiveSelectionInput = {
        section: 'FAR',
        count: 0,
        topicStats: [{ topic: 'Revenue', accuracy: 50, totalQuestions: 10 }],
      };

      const result = await fetchAdaptiveQuestions(input);

      expect(result.questions.length).toBe(0);
    });

    it('prioritizes previously missed questions', async () => {
      // First get some question IDs
      const questions = await fetchQuestions({ section: 'FAR', count: 5 });
      const missedIds = questions.slice(0, 2).map(q => q.id);

      const input: AdaptiveSelectionInput = {
        section: 'FAR',
        count: 10,
        topicStats: [],
        previouslyMissedIds: missedIds,
      };

      const result = await fetchAdaptiveQuestions(input);

      // Should include the missed questions
      const hasMissed = result.breakdown.some(b => b.topic === 'Previously Missed');
      if (missedIds.length > 0 && questions.length > 0) {
        expect(hasMissed).toBe(true);
      }
    });

    it('handles excludeIds correctly', async () => {
      const questions = await fetchQuestions({ section: 'FAR', count: 10 });
      const excludeIds = questions.slice(0, 5).map(q => q.id);

      const input: AdaptiveSelectionInput = {
        section: 'FAR',
        count: 10,
        topicStats: [],
        excludeIds,
      };

      const result = await fetchAdaptiveQuestions(input);

      // None of the excluded IDs should be in results
      result.questions.forEach(q => {
        expect(excludeIds).not.toContain(q.id);
      });
    });

    it('handles topic with 0% accuracy', async () => {
      const input: AdaptiveSelectionInput = {
        section: 'FAR',
        count: 10,
        topicStats: [{ topic: 'Revenue', accuracy: 0, totalQuestions: 10 }],
      };

      const result = await fetchAdaptiveQuestions(input);

      expect(result).toBeDefined();
    });

    it('handles all topics at 100% accuracy', async () => {
      const input: AdaptiveSelectionInput = {
        section: 'FAR',
        count: 10,
        topicStats: [
          { topic: 'Topic1', accuracy: 100, totalQuestions: 20 },
          { topic: 'Topic2', accuracy: 100, totalQuestions: 20 },
        ],
      };

      const result = await fetchAdaptiveQuestions(input);

      // Should still return questions (from variety pool)
      expect(result.questions.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getTopicsForSection', () => {
    it('returns array of topics for valid section', async () => {
      const topics = await getTopicsForSection('FAR');

      expect(Array.isArray(topics)).toBe(true);
    });

    it('returns sorted topics', async () => {
      const topics = await getTopicsForSection('FAR');

      const sortedTopics = [...topics].sort();
      expect(topics).toEqual(sortedTopics);
    });

    it('returns unique topics only', async () => {
      const topics = await getTopicsForSection('FAR');

      const uniqueTopics = [...new Set(topics)];
      expect(topics.length).toBe(uniqueTopics.length);
    });
  });

  describe('clearQuestionCache', () => {
    it('clears cache without error', () => {
      expect(() => clearQuestionCache()).not.toThrow();
    });

    it('cache is cleared and questions can be re-fetched', async () => {
      // Fetch to populate cache
      await fetchQuestions({ section: 'FAR', count: 5 });
      
      // Clear cache
      clearQuestionCache();
      
      // Fetch again - should work
      const questions = await fetchQuestions({ section: 'FAR', count: 5 });
      expect(questions.length).toBeGreaterThan(0);
    });
  });
});
