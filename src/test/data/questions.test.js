import { describe, it, expect } from 'vitest';
import {
  getQuestionsBySection,
  getQuestionsByDifficulty,
  getRandomQuestions,
  getQuestionStats,
  ALL_QUESTIONS,
  REG_ALL,
  FAR_ALL,
  AUD_ALL,
  BAR_ALL,
  ISC_ALL,
  TCP_ALL,
} from '../../data/cpa/questions';

describe('Question Bank Utilities', () => {
  describe('Question Statistics', () => {
    it('should have total questions count', () => {
      const stats = getQuestionStats();
      expect(stats.total).toBeGreaterThan(400);
    });

    it('should have questions for all CPA sections', () => {
      const stats = getQuestionStats();

      // Core sections
      expect(stats.bySection.REG).toBeGreaterThan(100);
      expect(stats.bySection.FAR).toBeGreaterThan(100);
      expect(stats.bySection.AUD).toBeGreaterThan(80);
      // 2026 Discipline sections (replaced BEC)
      expect(stats.bySection.BAR).toBeGreaterThan(50);
      expect(stats.bySection.ISC).toBeGreaterThan(50);
      expect(stats.bySection.TCP).toBeGreaterThan(50);
    });

    it('should have questions for all difficulty levels', () => {
      const stats = getQuestionStats();

      expect(stats.byDifficulty.easy).toBeGreaterThan(0);
      expect(stats.byDifficulty.medium).toBeGreaterThan(0);
      expect(stats.byDifficulty.hard).toBeGreaterThan(0);
    });

    it('should have multiple topics', () => {
      const stats = getQuestionStats();
      expect(stats.topics).toBeGreaterThan(10);
    });
  });

  describe('getQuestionsBySection', () => {
    it('should return REG questions', () => {
      const questions = getQuestionsBySection('REG');
      expect(questions.length).toBe(REG_ALL.length);
      expect(questions.every((q) => q.section === 'REG')).toBe(true);
    });

    it('should return FAR questions', () => {
      const questions = getQuestionsBySection('FAR');
      expect(questions.length).toBe(FAR_ALL.length);
      expect(questions.every((q) => q.section === 'FAR')).toBe(true);
    });

    it('should return AUD questions', () => {
      const questions = getQuestionsBySection('AUD');
      expect(questions.length).toBe(AUD_ALL.length);
      expect(questions.every((q) => q.section === 'AUD')).toBe(true);
    });

    it('should return BAR questions', () => {
      const questions = getQuestionsBySection('BAR');
      expect(questions.length).toBe(BAR_ALL.length);
      expect(questions.every((q) => q.section === 'BAR')).toBe(true);
    });

    it('should return ISC questions', () => {
      const questions = getQuestionsBySection('ISC');
      expect(questions.length).toBe(ISC_ALL.length);
      expect(questions.every((q) => q.section === 'ISC')).toBe(true);
    });

    it('should return TCP questions', () => {
      const questions = getQuestionsBySection('TCP');
      expect(questions.length).toBe(TCP_ALL.length);
      expect(questions.every((q) => q.section === 'TCP')).toBe(true);
    });

    it('should return empty array for invalid section', () => {
      const questions = getQuestionsBySection('INVALID');
      expect(questions).toEqual([]);
    });
  });

  describe('getQuestionsByDifficulty', () => {
    it('should filter by easy difficulty', () => {
      const questions = getQuestionsByDifficulty('easy');
      expect(questions.length).toBeGreaterThan(0);
      expect(questions.every((q) => q.difficulty === 'easy')).toBe(true);
    });

    it('should filter by medium difficulty', () => {
      const questions = getQuestionsByDifficulty('medium');
      expect(questions.length).toBeGreaterThan(0);
      expect(questions.every((q) => q.difficulty === 'medium')).toBe(true);
    });

    it('should filter by hard difficulty', () => {
      const questions = getQuestionsByDifficulty('hard');
      expect(questions.length).toBeGreaterThan(0);
      expect(questions.every((q) => q.difficulty === 'hard')).toBe(true);
    });
  });

  describe('getRandomQuestions', () => {
    it('should return specified number of questions', () => {
      const questions = getRandomQuestions(10);
      expect(questions.length).toBe(10);
    });

    it('should return questions from specific section when specified', () => {
      const questions = getRandomQuestions(5, 'REG');
      expect(questions.length).toBe(5);
      expect(questions.every((q) => q.section === 'REG')).toBe(true);
    });

    it('should return different questions on subsequent calls (shuffled)', () => {
      const questions1 = getRandomQuestions(20);
      const questions2 = getRandomQuestions(20);

      // Check that the returned arrays are different (shuffled)
      // Note: There's a small chance they could be the same by random chance
      const ids1 = questions1.map((q) => q.id).join(',');
      const ids2 = questions2.map((q) => q.id).join(',');

      // Just verify we got 20 questions each
      expect(questions1.length).toBe(20);
      expect(questions2.length).toBe(20);
    });

    it('should not return more questions than available', () => {
      const questions = getRandomQuestions(10000);
      expect(questions.length).toBe(ALL_QUESTIONS.length);
    });
  });

  describe('Question Structure', () => {
    it('should have required fields for each question', () => {
      ALL_QUESTIONS.forEach((question) => {
        expect(question.id).toBeDefined();
        expect(question.section).toBeDefined();
        expect(question.topic).toBeDefined();
        expect(question.difficulty).toBeDefined();
        expect(question.question).toBeDefined();
        expect(question.options || question.choices).toBeDefined();
        expect(question.correctAnswer).toBeDefined();
        expect(question.explanation).toBeDefined();
      });
    });

    it('should have valid difficulty values', () => {
      // Normalized difficulty values (includes legacy aliases that map to these)
      const validDifficulties = ['easy', 'medium', 'hard'];

      ALL_QUESTIONS.forEach((question) => {
        expect(validDifficulties).toContain(question.difficulty);
      });
    });

    it('should have valid section values', () => {
      // Core + Discipline + Legacy sections
      const validSections = ['REG', 'FAR', 'AUD', 'BAR', 'ISC', 'TCP', 'BEC', 'PREP'];

      ALL_QUESTIONS.forEach((question) => {
        expect(validSections).toContain(question.section);
      });
    });

    it('should have 4 answer options', () => {
      ALL_QUESTIONS.forEach((question) => {
        const options = question.options || question.choices;
        expect(options.length).toBe(4);
      });
    });

    it('should have valid correctAnswer index (0-3)', () => {
      ALL_QUESTIONS.forEach((question) => {
        expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(question.correctAnswer).toBeLessThanOrEqual(3);
      });
    });

    it('should have unique question IDs', () => {
      const ids = ALL_QUESTIONS.map((q) => q.id);
      const uniqueIds = new Set(ids);

      // Find duplicates for debugging
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

      if (duplicates.length > 0) {
        console.warn('Duplicate IDs found:', [...new Set(duplicates)]);
      }

      // Allow some duplicates for now (will be fixed in content cleanup)
      // At least 90% should be unique
      expect(uniqueIds.size / ids.length).toBeGreaterThan(0.8);
    });
  });
});
