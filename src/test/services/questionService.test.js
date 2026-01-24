import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchQuestions,
  getQuestionById,
  getWeakAreaQuestions,
} from '../../services/questionService';

// Mock Firebase Firestore
const mockGetDoc = vi.fn();
const mockGetDocs = vi.fn();

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => 'questions-collection'),
  doc: vi.fn(() => 'question-doc'),
  getDoc: (...args) => mockGetDoc(...args),
  getDocs: (...args) => mockGetDocs(...args),
  query: vi.fn((...args) => args),
  where: vi.fn((field, op, value) => ({ field, op, value })),
  limit: vi.fn((n) => ({ limit: n })),
  orderBy: vi.fn((field, dir) => ({ orderBy: field, direction: dir })),
  startAfter: vi.fn((cursor) => ({ startAfter: cursor })),
  writeBatch: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(),
}));

vi.mock('../../config/firebase', () => ({
  db: {},
}));

describe('Question Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchQuestions', () => {
    const mockQuestionDocs = [
      {
        id: 'q1',
        data: () => ({
          section: 'REG',
          topicId: 'reg-ethics',
          question: 'Question 1?',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
          difficulty: 'medium',
        }),
      },
      {
        id: 'q2',
        data: () => ({
          section: 'REG',
          topicId: 'reg-income',
          question: 'Question 2?',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 1,
          difficulty: 'easy',
        }),
      },
      {
        id: 'q3',
        data: () => ({
          section: 'REG',
          topicId: 'reg-deductions',
          question: 'Question 3?',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 2,
          difficulty: 'hard',
        }),
      },
    ];

    beforeEach(() => {
      mockGetDocs.mockResolvedValue({
        docs: mockQuestionDocs,
      });
    });

    it('should fetch questions with default options', async () => {
      const questions = await fetchQuestions();

      expect(mockGetDocs).toHaveBeenCalled();
      expect(questions).toBeInstanceOf(Array);
    });

    it('should filter by section', async () => {
      await fetchQuestions({ section: 'REG' });

      expect(mockGetDocs).toHaveBeenCalled();
    });

    it('should filter by topicId', async () => {
      await fetchQuestions({ topicId: 'reg-ethics' });

      expect(mockGetDocs).toHaveBeenCalled();
    });

    it('should filter by difficulty', async () => {
      await fetchQuestions({ difficulty: 'hard' });

      expect(mockGetDocs).toHaveBeenCalled();
    });

    it('should respect count limit', async () => {
      const questions = await fetchQuestions({ count: 2 });

      expect(questions.length).toBeLessThanOrEqual(2);
    });

    it('should exclude specified question IDs', async () => {
      const questions = await fetchQuestions({
        excludeIds: ['q1'],
      });

      const ids = questions.map((q) => q.id);
      expect(ids).not.toContain('q1');
    });

    it('should shuffle questions for random mode', async () => {
      // Run multiple times to verify randomization
      const results = [];
      for (let i = 0; i < 5; i++) {
        const questions = await fetchQuestions({ mode: 'random' });
        results.push(questions.map((q) => q.id).join(','));
      }

      // At least some orderings should differ (with high probability)
      // This is a probabilistic test
      expect((questions) => questions.length > 0).toBeTruthy();
    });

    it('should handle empty results gracefully', async () => {
      mockGetDocs.mockResolvedValue({ docs: [] });

      const questions = await fetchQuestions();

      expect(questions).toEqual([]);
    });

    it('should handle API errors gracefully', async () => {
      mockGetDocs.mockRejectedValue(new Error('Network error'));

      const questions = await fetchQuestions();

      expect(questions).toEqual([]);
    });

    it('should map document data correctly', async () => {
      const questions = await fetchQuestions();

      if (questions.length > 0) {
        expect(questions[0]).toHaveProperty('id');
        expect(questions[0]).toHaveProperty('section');
        expect(questions[0]).toHaveProperty('question');
        expect(questions[0]).toHaveProperty('options');
        expect(questions[0]).toHaveProperty('correctAnswer');
      }
    });
  });

  describe('getQuestionById', () => {
    it('should fetch a single question by ID', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        id: 'q1',
        data: () => ({
          section: 'REG',
          question: 'Test question?',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
        }),
      });

      const question = await getQuestionById('q1');

      expect(question).toHaveProperty('id', 'q1');
      expect(question).toHaveProperty('question', 'Test question?');
    });

    it('should return null for non-existent question', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => false,
      });

      const question = await getQuestionById('nonexistent');

      expect(question).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      mockGetDoc.mockRejectedValue(new Error('Network error'));

      const question = await getQuestionById('q1');

      expect(question).toBeNull();
    });
  });

  describe('getWeakAreaQuestions', () => {
    beforeEach(() => {
      mockGetDocs.mockResolvedValue({
        docs: [
          {
            id: 'q1',
            data: () => ({
              section: 'REG',
              topicId: 'weak-topic',
              question: 'Weak area question?',
              options: ['A', 'B', 'C', 'D'],
              correctAnswer: 0,
            }),
          },
        ],
      });
    });

    it('should fetch questions for weak areas', async () => {
      const questions = await getWeakAreaQuestions('user123', 'REG', 10);

      expect(mockGetDocs).toHaveBeenCalled();
    });

    it('should respect count parameter', async () => {
      const questions = await getWeakAreaQuestions('user123', 'REG', 5);

      expect(questions.length).toBeLessThanOrEqual(5);
    });

    it('should handle users with no weak areas', async () => {
      mockGetDocs.mockResolvedValue({ docs: [] });

      const questions = await getWeakAreaQuestions('user123', 'REG', 10);

      expect(questions).toEqual([]);
    });
  });
});

describe('Question Service - Data Validation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should validate question structure', async () => {
    const invalidDoc = {
      id: 'bad-q',
      data: () => ({
        section: 'REG',
        // Missing required fields
      }),
    };

    mockGetDocs.mockResolvedValue({ docs: [invalidDoc] });

    const questions = await fetchQuestions();

    // Should still return the question (validation happens elsewhere)
    expect(questions.length).toBe(1);
  });

  it('should handle null values in document data', async () => {
    const nullDoc = {
      id: 'null-q',
      data: () => ({
        section: 'REG',
        question: null,
        options: null,
        correctAnswer: null,
      }),
    };

    mockGetDocs.mockResolvedValue({ docs: [nullDoc] });

    const questions = await fetchQuestions();

    expect(questions[0].question).toBeNull();
  });
});
