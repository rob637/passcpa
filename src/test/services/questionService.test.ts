/**
 * Question Service Tests - Local-first Architecture
 * Tests the questionService which loads questions from local TypeScript files.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  fetchQuestions,
  getQuestionById,
  getWeakAreaQuestions,
  getQuestionCount,
  getQuestionStats,
  clearQuestionCache,
} from '../../services/questionService';

describe('questionService', () => {
  beforeEach(() => {
    // Clear cache before each test for clean state
    clearQuestionCache();
  });

  describe('fetchQuestions', () => {
    it('fetches questions with default options', async () => {
      const questions = await fetchQuestions();
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeGreaterThan(0);
      expect(questions.length).toBeLessThanOrEqual(10); // default count
    });

    it('filters by section', async () => {
      const farQuestions = await fetchQuestions({ section: 'FAR', count: 5 });
      expect(farQuestions.length).toBeGreaterThan(0);
      expect(farQuestions.length).toBeLessThanOrEqual(5);
      farQuestions.forEach(q => {
        expect(q.section).toBe('FAR');
      });
    });

    it('filters by difficulty', async () => {
      const easyQuestions = await fetchQuestions({ 
        section: 'FAR', 
        difficulty: 'easy', 
        count: 20 
      });
      // Should return questions (may be 0 if no easy questions exist)
      expect(Array.isArray(easyQuestions)).toBe(true);
      easyQuestions.forEach(q => {
        expect(q.difficulty).toBe('easy');
      });
    });

    it('respects count parameter', async () => {
      const questions = await fetchQuestions({ section: 'FAR', count: 3 });
      expect(questions.length).toBeLessThanOrEqual(3);
    });

    it('handles excludeIds', async () => {
      const firstBatch = await fetchQuestions({ section: 'FAR', count: 5 });
      const excludeIds = firstBatch.map(q => q.id);
      
      const secondBatch = await fetchQuestions({ 
        section: 'FAR', 
        count: 5,
        excludeIds 
      });
      
      // Second batch should not include any IDs from first batch
      secondBatch.forEach(q => {
        expect(excludeIds).not.toContain(q.id);
      });
    });

    it('returns empty array on error gracefully', async () => {
      // Non-existent section should return empty
      const questions = await fetchQuestions({ 
        section: 'NONEXISTENT' as any, 
        count: 5 
      });
      expect(Array.isArray(questions)).toBe(true);
    });
  });

  describe('getQuestionById', () => {
    it('fetches a single question by ID', async () => {
      // First get some questions to find a valid ID
      const questions = await fetchQuestions({ section: 'FAR', count: 1 });
      expect(questions.length).toBeGreaterThan(0);
      
      const question = await getQuestionById(questions[0].id);
      expect(question).not.toBeNull();
      expect(question?.id).toBe(questions[0].id);
    });

    it('returns null for non-existent ID', async () => {
      const question = await getQuestionById('nonexistent-id-12345');
      expect(question).toBeNull();
    });
  });

  describe('getWeakAreaQuestions', () => {
    it('returns questions for weak areas', async () => {
      const questions = await getWeakAreaQuestions('user-123', 'FAR', 5, []);
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeLessThanOrEqual(5);
    });

    it('prioritizes specified weak topics', async () => {
      // Get a valid topic from questions
      const sampleQuestions = await fetchQuestions({ section: 'FAR', count: 10 });
      const topicsWithQuestions = sampleQuestions
        .filter(q => q.topicId)
        .map(q => q.topicId!);
      
      if (topicsWithQuestions.length > 0) {
        const weakQuestions = await getWeakAreaQuestions(
          'user-123', 
          'FAR', 
          5, 
          [topicsWithQuestions[0]]
        );
        expect(weakQuestions.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getQuestionCount', () => {
    it('returns count for specific section', async () => {
      const farCount = await getQuestionCount('FAR');
      expect(farCount).toBeGreaterThan(0);
    });

    it('returns total count for all sections', async () => {
      const totalCount = await getQuestionCount();
      expect(totalCount).toBeGreaterThan(0);
      
      // Total should be at least as much as one section
      const farCount = await getQuestionCount('FAR');
      expect(totalCount).toBeGreaterThanOrEqual(farCount);
    });
  });

  describe('getQuestionStats', () => {
    it('returns statistics for all sections', async () => {
      const stats = await getQuestionStats();
      expect(stats.total).toBeGreaterThan(0);
      expect(typeof stats.bySection).toBe('object');
      // Should have at least one section
      expect(Object.keys(stats.bySection).length).toBeGreaterThan(0);
    });
  });

  describe('clearQuestionCache', () => {
    it('clears the question cache', async () => {
      // Load some questions to populate cache
      await fetchQuestions({ section: 'FAR', count: 5 });
      
      // Clear cache
      clearQuestionCache();
      
      // Should still work after clearing
      const questions = await fetchQuestions({ section: 'FAR', count: 5 });
      expect(questions.length).toBeGreaterThan(0);
    });
  });

  describe('question data integrity', () => {
    it('questions have required fields', async () => {
      const questions = await fetchQuestions({ section: 'FAR', count: 5 });
      questions.forEach(q => {
        expect(q.id).toBeDefined();
        expect(q.question).toBeDefined();
        expect(q.section).toBeDefined();
      });
    });

    it('questions have answer options', async () => {
      const questions = await fetchQuestions({ section: 'FAR', count: 5 });
      questions.forEach(q => {
        // MCQ questions should have options
        if ((q as any).type !== 'TBS') {
          expect(q.options || (q as any).answers).toBeDefined();
        }
      });
    });
  });

  describe('module exports', () => {
    it('exports fetchQuestions function', () => {
      expect(typeof fetchQuestions).toBe('function');
    });

    it('exports getQuestionById function', () => {
      expect(typeof getQuestionById).toBe('function');
    });

    it('exports getWeakAreaQuestions function', () => {
      expect(typeof getWeakAreaQuestions).toBe('function');
    });

    it('exports getQuestionCount function', () => {
      expect(typeof getQuestionCount).toBe('function');
    });

    it('exports clearQuestionCache function', () => {
      expect(typeof clearQuestionCache).toBe('function');
    });
  });
});
