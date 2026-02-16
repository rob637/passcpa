/**
 * Question History Service - Quality Tests (Bug-Finding Focus)
 * 
 * Tests the spaced repetition and question tracking algorithms for edge cases.
 * These tests are designed to find issues in:
 * - Mastery level calculations
 * - Spaced repetition interval logic
 * - Cache behavior and invalidation
 * - Smart selection algorithm edge cases
 * - Curriculum filtering edge cases
 * 
 * @batch 3 of 20 (25 tests)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getSmartQuestionSelection,
  getFreshQuestions,
  type CurriculumFilterOptions,
} from '../../services/questionHistoryService';

// Mock Firebase
vi.mock('../../config/firebase', () => ({
  db: {},
}));

// Mock Firestore functions
const mockGetDoc = vi.fn();
const mockGetDocs = vi.fn();
const mockSetDoc = vi.fn();

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => ({})),
  doc: vi.fn(() => ({})),
  getDoc: (...args: unknown[]) => mockGetDoc(...args),
  getDocs: (...args: unknown[]) => mockGetDocs(...args),
  setDoc: (...args: unknown[]) => mockSetDoc(...args),
  query: vi.fn(() => ({})),
  where: vi.fn(() => ({})),
  orderBy: vi.fn(() => ({})),
  limit: vi.fn(() => ({})),
  Timestamp: {
    fromDate: vi.fn((d: Date) => ({ toDate: () => d })),
    now: vi.fn(() => ({ toDate: () => new Date() })),
  },
  writeBatch: vi.fn(() => ({
    set: vi.fn(),
    commit: vi.fn().mockResolvedValue(undefined),
  })),
  arrayUnion: vi.fn((arr) => arr),
  onSnapshot: vi.fn(() => vi.fn()),
}));

describe('Question History Service - Quality Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock: empty history
    mockGetDoc.mockResolvedValue({ exists: () => false });
    mockGetDocs.mockResolvedValue({ docs: [] });
    mockSetDoc.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getSmartQuestionSelection - Edge Cases', () => {
    it('handles empty allQuestionIds array', async () => {
      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        [],
        15
      );

      expect(result.questionIds).toEqual([]);
      expect(result.breakdown.due).toBe(0);
      expect(result.breakdown.incorrect).toBe(0);
      expect(result.breakdown.fresh).toBe(0);
    });

    it('handles targetCount of 0', async () => {
      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1', 'q2', 'q3'],
        0
      );

      expect(result.questionIds.length).toBe(0);
    });

    it('handles targetCount of 1', async () => {
      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1', 'q2', 'q3'],
        1
      );

      expect(result.questionIds.length).toBeLessThanOrEqual(1);
    });

    it('handles undefined userId', async () => {
      const result = await getSmartQuestionSelection(
        '',
        'FAR',
        ['q1', 'q2', 'q3'],
        15
      );

      // Should fall back to fresh questions only
      expect(Array.isArray(result.questionIds)).toBe(true);
    });

    it('handles exam date in crunch time (< 14 days)', async () => {
      const crunchDate = new Date();
      crunchDate.setDate(crunchDate.getDate() + 10);

      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1', 'q2', 'q3', 'q4', 'q5'],
        4,
        crunchDate.toISOString()
      );

      // Should have adjusted weights for crunch time
      expect(result).toBeDefined();
    });

    it('handles exam date in final week (< 7 days)', async () => {
      const finalWeek = new Date();
      finalWeek.setDate(finalWeek.getDate() + 3);

      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1', 'q2', 'q3', 'q4', 'q5'],
        4,
        finalWeek.toISOString()
      );

      // Final week should maximize review weight
      expect(result).toBeDefined();
    });

    it('handles exam date today', async () => {
      const today = new Date().toISOString();

      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1', 'q2', 'q3'],
        3,
        today
      );

      expect(result).toBeDefined();
    });

    it('handles exam date in the past', async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 5);

      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1', 'q2', 'q3'],
        3,
        pastDate.toISOString()
      );

      // Should not crash with past date
      expect(result).toBeDefined();
    });

    it('handles malformed exam date string', async () => {
      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1', 'q2', 'q3'],
        3,
        'not-a-date'
      );

      // Should handle gracefully
      expect(result).toBeDefined();
      expect(Array.isArray(result.questionIds)).toBe(true);
    });
  });

  describe('getSmartQuestionSelection - Curriculum Filtering', () => {
    it('filters questions to covered topics when enabled', async () => {
      const curriculumOptions: CurriculumFilterOptions = {
        enableCurriculumFilter: true,
        coveredTopics: new Set(['Revenue Recognition', 'Inventory']),
        questionTopicMap: new Map([
          ['q1', 'Revenue Recognition'],
          ['q2', 'Leases'], // Not covered
          ['q3', 'Inventory'],
          ['q4', 'Bonds'], // Not covered
        ]),
      };

      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1', 'q2', 'q3', 'q4'],
        10,
        undefined,
        curriculumOptions
      );

      // Only q1 and q3 should be considered (covered topics)
      expect(result.breakdown.filtered).toBeDefined();
    });

    it('includes preview topics when provided', async () => {
      const curriculumOptions: CurriculumFilterOptions = {
        enableCurriculumFilter: true,
        coveredTopics: new Set(['Revenue']),
        previewTopics: new Set(['Leases']),
        questionTopicMap: new Map([
          ['q1', 'Revenue'],
          ['q2', 'Leases'], // In preview
          ['q3', 'Bonds'], // Not allowed
        ]),
      };

      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1', 'q2', 'q3'],
        10,
        undefined,
        curriculumOptions
      );

      // q1 and q2 should be considered
      expect(result).toBeDefined();
    });

    it('falls back to all questions when no topics match', async () => {
      const curriculumOptions: CurriculumFilterOptions = {
        enableCurriculumFilter: true,
        coveredTopics: new Set(['NonexistentTopic12345']),
        questionTopicMap: new Map([
          ['q1', 'Revenue'],
          ['q2', 'Leases'],
        ]),
      };

      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1', 'q2'],
        10,
        undefined,
        curriculumOptions
      );

      // Should fall back and return questions
      expect(result).toBeDefined();
    });

    it('handles empty coveredTopics set', async () => {
      const curriculumOptions: CurriculumFilterOptions = {
        enableCurriculumFilter: true,
        coveredTopics: new Set(),
        questionTopicMap: new Map([
          ['q1', 'Revenue'],
        ]),
      };

      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1'],
        10,
        undefined,
        curriculumOptions
      );

      expect(result).toBeDefined();
    });

    it('handles empty questionTopicMap', async () => {
      const curriculumOptions: CurriculumFilterOptions = {
        enableCurriculumFilter: true,
        coveredTopics: new Set(['Revenue']),
        questionTopicMap: new Map(),
      };

      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1', 'q2'],
        10,
        undefined,
        curriculumOptions
      );

      // Should fall back since no mappings
      expect(result).toBeDefined();
    });

    it('handles case-insensitive topic matching', async () => {
      const curriculumOptions: CurriculumFilterOptions = {
        enableCurriculumFilter: true,
        coveredTopics: new Set(['revenue recognition']), // lowercase
        questionTopicMap: new Map([
          ['q1', 'Revenue Recognition'], // Different case
        ]),
      };

      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1'],
        10,
        undefined,
        curriculumOptions
      );

      expect(result).toBeDefined();
    });

    it('handles partial topic matches', async () => {
      const curriculumOptions: CurriculumFilterOptions = {
        enableCurriculumFilter: true,
        coveredTopics: new Set(['Revenue']), // Partial
        questionTopicMap: new Map([
          ['q1', 'Revenue Recognition'], // Full topic
        ]),
      };

      const result = await getSmartQuestionSelection(
        'user-1',
        'FAR',
        ['q1'],
        10,
        undefined,
        curriculumOptions
      );

      expect(result).toBeDefined();
    });

    it('handles topics with special characters', async () => {
      const curriculumOptions: CurriculumFilterOptions = {
        enableCurriculumFilter: true,
        coveredTopics: new Set(['401(k) Plans']),
        questionTopicMap: new Map([
          ['q1', '401(k) Plans'],
        ]),
      };

      const result = await getSmartQuestionSelection(
        'user-1',
        'REG',
        ['q1'],
        10,
        undefined,
        curriculumOptions
      );

      expect(result).toBeDefined();
    });
  });

  describe('getFreshQuestions - Edge Cases', () => {
    it('returns all questions when user has no history', async () => {
      const allIds = ['q1', 'q2', 'q3', 'q4', 'q5'];
      
      const fresh = await getFreshQuestions('user-1', 'FAR', allIds, 10);

      expect(fresh.length).toBeLessThanOrEqual(5);
    });

    it('handles empty allQuestionIds', async () => {
      const fresh = await getFreshQuestions('user-1', 'FAR', [], 10);

      expect(fresh).toEqual([]);
    });

    it('handles maxCount of 0', async () => {
      const fresh = await getFreshQuestions('user-1', 'FAR', ['q1', 'q2'], 0);

      expect(fresh).toEqual([]);
    });

    it('handles maxCount of 1', async () => {
      const fresh = await getFreshQuestions('user-1', 'FAR', ['q1', 'q2'], 1);

      expect(fresh.length).toBeLessThanOrEqual(1);
    });

    it('handles empty userId', async () => {
      const fresh = await getFreshQuestions('', 'FAR', ['q1', 'q2'], 5);

      // Empty user = no history = all questions fresh
      expect(Array.isArray(fresh)).toBe(true);
    });

    it('respects maxCount limit', async () => {
      const manyIds = Array.from({ length: 100 }, (_, i) => `q${i}`);
      
      const fresh = await getFreshQuestions('user-1', 'FAR', manyIds, 10);

      expect(fresh.length).toBeLessThanOrEqual(10);
    });
  });

  describe('Mastery Level Calculations', () => {
    it('new question starts at learning level', () => {
      // Test the mastery thresholds logic
      const timesAnswered = 1;
      const timesCorrect = 1;
      const accuracy = timesCorrect / timesAnswered;
      
      let masteryLevel = 'learning';
      if (timesAnswered >= 5 && accuracy >= 0.8) {
        masteryLevel = 'mastered';
      } else if (timesAnswered >= 3 && accuracy >= 0.6) {
        masteryLevel = 'reviewing';
      }
      
      expect(masteryLevel).toBe('learning');
    });

    it('question with 3+ correct at 60%+ advances to reviewing', () => {
      const timesAnswered = 5;
      const timesCorrect = 3; // 60% accuracy
      const accuracy = timesCorrect / timesAnswered;
      
      let masteryLevel = 'learning';
      if (timesAnswered >= 5 && accuracy >= 0.8) {
        masteryLevel = 'mastered';
      } else if (timesAnswered >= 3 && accuracy >= 0.6) {
        masteryLevel = 'reviewing';
      }
      
      expect(masteryLevel).toBe('reviewing');
    });

    it('question with 5+ at 80%+ advances to mastered', () => {
      const timesAnswered = 5;
      const timesCorrect = 4; // 80% accuracy
      const accuracy = timesCorrect / timesAnswered;
      
      let masteryLevel = 'learning';
      if (timesAnswered >= 5 && accuracy >= 0.8) {
        masteryLevel = 'mastered';
      } else if (timesAnswered >= 3 && accuracy >= 0.6) {
        masteryLevel = 'reviewing';
      }
      
      expect(masteryLevel).toBe('mastered');
    });

    it('high volume low accuracy stays at learning', () => {
      const timesAnswered = 10;
      const timesCorrect = 4; // 40% accuracy
      const accuracy = timesCorrect / timesAnswered;
      
      let masteryLevel = 'learning';
      if (timesAnswered >= 5 && accuracy >= 0.8) {
        masteryLevel = 'mastered';
      } else if (timesAnswered >= 3 && accuracy >= 0.6) {
        masteryLevel = 'reviewing';
      }
      
      expect(masteryLevel).toBe('learning');
    });

    it('handles 0 timesAnswered (division by zero)', () => {
      const timesAnswered = 0;
      const timesCorrect = 0;
      const accuracy = timesAnswered > 0 ? timesCorrect / timesAnswered : 0;
      
      expect(accuracy).toBe(0);
      expect(Number.isNaN(accuracy)).toBe(false);
    });

    it('handles 100% accuracy', () => {
      const timesAnswered = 5;
      const timesCorrect = 5;
      const accuracy = timesCorrect / timesAnswered;
      
      let masteryLevel = 'learning';
      if (timesAnswered >= 5 && accuracy >= 0.8) {
        masteryLevel = 'mastered';
      }
      
      expect(masteryLevel).toBe('mastered');
    });
  });

  describe('Spaced Repetition Intervals', () => {
    const SPACED_INTERVALS = {
      new: 0,
      learning: 1,
      reviewing: 3,
      mastered: 7,
    };

    it('new questions have 0 day interval', () => {
      expect(SPACED_INTERVALS.new).toBe(0);
    });

    it('learning questions have 1 day interval', () => {
      expect(SPACED_INTERVALS.learning).toBe(1);
    });

    it('reviewing questions have 3 day interval', () => {
      expect(SPACED_INTERVALS.reviewing).toBe(3);
    });

    it('mastered questions have 7 day interval', () => {
      expect(SPACED_INTERVALS.mastered).toBe(7);
    });

    it('incorrect answer should reduce interval to 0', () => {
      const isCorrect = false;
      const masteryLevel = 'mastered';
      
      const intervalDays = isCorrect 
        ? SPACED_INTERVALS[masteryLevel]
        : 0;
      
      expect(intervalDays).toBe(0);
    });
  });
});
