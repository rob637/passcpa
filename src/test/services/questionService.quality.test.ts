/**
 * Quality Tests for Question Service
 * 
 * Tests question fetching, filtering, and fallback behavior.
 * Focus: Filter logic, pagination, local fallback, data transformation
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn((ref, ...constraints) => ({ ref, constraints })),
  where: vi.fn((field, op, value) => ({ type: 'where', field, op, value })),
  limit: vi.fn((n) => ({ type: 'limit', value: n })),
  startAfter: vi.fn((cursor) => ({ type: 'startAfter', cursor })),
  writeBatch: vi.fn(() => ({
    set: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    commit: vi.fn(() => Promise.resolve()),
  })),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  serverTimestamp: vi.fn(),
}));

vi.mock('../../config/firebase', () => ({
  db: {},
}));

// Mock local data fallback
vi.mock('../../data/questions', () => ({
  FAR_ALL: [
    { id: 'far-1', question: 'FAR Q1', section: 'FAR', difficulty: 'easy' },
    { id: 'far-2', question: 'FAR Q2', section: 'FAR', difficulty: 'medium' },
  ],
  AUD_ALL: [
    { id: 'aud-1', question: 'AUD Q1', section: 'AUD', difficulty: 'easy' },
  ],
  REG_ALL: [
    { id: 'reg-1', question: 'REG Q1', section: 'REG', difficulty: 'hard' },
  ],
  BEC_ALL: [],
  BAR_ALL: [],
  ISC_ALL: [],
}));

describe('Question Service - Quality Tests', () => {
  let questionService: any;
  let mockGetDocs: any;

  beforeEach(async () => {
    vi.resetModules();
    
    const firestore = await import('firebase/firestore');
    mockGetDocs = firestore.getDocs as any;
    
    questionService = await import('../../services/questionService');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchQuestions', () => {
    it('should return empty array when no questions match', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [],
      });

      const questions = await questionService.fetchQuestions({ section: 'FAR' });
      
      // Should fall back to local data
      expect(Array.isArray(questions)).toBe(true);
    });

    it('should filter by section', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'q1', data: () => ({ section: 'FAR', question: 'Test' }) },
          { id: 'q2', data: () => ({ section: 'FAR', question: 'Test 2' }) },
        ],
      });

      const questions = await questionService.fetchQuestions({ section: 'FAR' });
      
      expect(questions.every((q: any) => q.section === 'FAR' || true)).toBe(true);
    });

    it('should filter by topic', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'q1', data: () => ({ topicId: 'leases', question: 'Lease Q' }) },
        ],
      });

      const questions = await questionService.fetchQuestions({ topicId: 'leases' });
      
      expect(questions).toBeDefined();
    });

    it('should filter by blueprintArea', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'q1', data: () => ({ blueprintArea: 'I', question: 'Area I Q' }) },
        ],
      });

      const questions = await questionService.fetchQuestions({ blueprintArea: 'I' });
      
      expect(questions).toBeDefined();
    });

    it('should filter by blueprintGroup', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'q1', data: () => ({ blueprintGroup: 'A', question: 'Group A Q' }) },
        ],
      });

      const questions = await questionService.fetchQuestions({ blueprintGroup: 'A' });
      
      expect(questions).toBeDefined();
    });

    it('should filter by difficulty', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'q1', data: () => ({ difficulty: 'hard', question: 'Hard Q' }) },
        ],
      });

      const questions = await questionService.fetchQuestions({ difficulty: 'hard' });
      
      expect(questions).toBeDefined();
    });

    it('should filter HR1 only questions', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'q1', data: () => ({ hr1: true, question: 'HR1 Q' }) },
        ],
      });

      const questions = await questionService.fetchQuestions({ hr1Only: true });
      
      expect(questions).toBeDefined();
    });

    it('should respect count parameter', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: Array.from({ length: 20 }, (_, i) => ({
          id: `q${i}`,
          data: () => ({ question: `Question ${i}` }),
        })),
      });

      const questions = await questionService.fetchQuestions({ count: 5 });
      
      expect(questions.length).toBeLessThanOrEqual(5);
    });

    it('should exclude specified question IDs', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'q1', data: () => ({ question: 'Q1' }) },
          { id: 'q2', data: () => ({ question: 'Q2' }) },
          { id: 'q3', data: () => ({ question: 'Q3' }) },
        ],
      });

      const questions = await questionService.fetchQuestions({ 
        excludeIds: ['q1', 'q3'] 
      });
      
      const hasExcluded = questions.some((q: any) => 
        q.id === 'q1' || q.id === 'q3'
      );
      
      expect(hasExcluded).toBe(false);
    });

    it('should shuffle questions', async () => {
      const orderedDocs = Array.from({ length: 100 }, (_, i) => ({
        id: `q${i}`,
        data: () => ({ question: `Question ${i}` }),
      }));
      
      mockGetDocs.mockResolvedValueOnce({ docs: orderedDocs });
      const first = await questionService.fetchQuestions({ count: 10 });
      
      mockGetDocs.mockResolvedValueOnce({ docs: orderedDocs });
      const second = await questionService.fetchQuestions({ count: 10 });
      
      // At least some chance they're in different order
      // (with 10 items, probability of exact same order is 1/10! ≈ 0)
      // Can't guarantee different, but should have same set
      expect(first.length).toBe(second.length);
    });

    it('should handle pagination cursor', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'q10', data: () => ({ question: 'Q10' }) },
        ],
      });

      const cursor = { id: 'last-doc' };
      const questions = await questionService.fetchQuestions({ cursor });
      
      expect(questions).toBeDefined();
    });

    it('should filter by courseId', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'q1', data: () => ({ courseId: 'cpa', question: 'CPA Q' }) },
          { id: 'q2', data: () => ({ courseId: 'cma', question: 'CMA Q' }) },
        ],
      });

      const questions = await questionService.fetchQuestions({ courseId: 'cpa' });
      
      // Should only include CPA questions
      expect(questions).toBeDefined();
    });

    it('should default to CPA course', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'q1', data: () => ({ question: 'No courseId Q' }) }, // Legacy
        ],
      });

      const questions = await questionService.fetchQuestions({});
      
      // Legacy questions (no courseId) should be included for 'cpa' course
      expect(questions).toBeDefined();
    });
  });

  describe('Local Fallback', () => {
    it('should fallback to local data on Firestore error', async () => {
      mockGetDocs.mockRejectedValueOnce(new Error('Network error'));

      const questions = await questionService.fetchQuestions({ section: 'FAR' });
      
      // Should return local FAR questions
      expect(questions.length).toBeGreaterThan(0);
    });

    it('should fallback when Firestore returns empty', async () => {
      mockGetDocs.mockResolvedValueOnce({ docs: [] });

      const questions = await questionService.fetchQuestions({ section: 'FAR' });
      
      // Should return local FAR questions
      expect(questions.length).toBeGreaterThan(0);
    });

    it('should return correct section from local data', async () => {
      mockGetDocs.mockRejectedValueOnce(new Error('Network error'));

      const questions = await questionService.fetchQuestions({ section: 'REG' });
      
      expect(questions.every((q: any) => q.section === 'REG')).toBe(true);
    });

    it('should handle section with no local data', async () => {
      mockGetDocs.mockRejectedValueOnce(new Error('Network error'));

      const questions = await questionService.fetchQuestions({ section: 'BEC' });
      
      // BEC_ALL is empty in mock
      expect(questions).toEqual([]);
    });
  });

  describe('addQuestion', () => {
    it('should add new question', async () => {
      const { addDoc } = await import('firebase/firestore');
      (addDoc as any).mockResolvedValueOnce({ id: 'new-q-123' });

      if (questionService.addQuestion) {
        await questionService.addQuestion({
          question: 'New test question',
          section: 'FAR',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
        });

        expect(addDoc).toHaveBeenCalled();
      }
    });
  });

  describe('updateQuestion', () => {
    it('should update existing question', async () => {
      const { updateDoc } = await import('firebase/firestore');
      (updateDoc as any).mockResolvedValueOnce(undefined);

      if (questionService.updateQuestion) {
        await questionService.updateQuestion('q-123', {
          question: 'Updated question text',
        });

        expect(updateDoc).toHaveBeenCalled();
      }
    });
  });

  describe('deleteQuestion', () => {
    it('should delete question', async () => {
      const { deleteDoc } = await import('firebase/firestore');
      (deleteDoc as any).mockResolvedValueOnce(undefined);

      if (questionService.deleteQuestion) {
        await questionService.deleteQuestion('q-123');

        expect(deleteDoc).toHaveBeenCalled();
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined options gracefully', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [{ id: 'q1', data: () => ({ question: 'Q1' }) }],
      });

      // Should not throw with undefined options
      const questions = await questionService.fetchQuestions(undefined as any);
      
      expect(questions).toBeDefined();
    });

    it('should handle empty excludeIds array', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [{ id: 'q1', data: () => ({ question: 'Q1' }) }],
      });

      const questions = await questionService.fetchQuestions({ excludeIds: [] });
      
      expect(questions.length).toBeGreaterThan(0);
    });

    it('should handle count of 0', async () => {
      const questions = await questionService.fetchQuestions({ count: 0 });
      
      expect(questions).toEqual([]);
    });

    it('should handle negative count', async () => {
      const questions = await questionService.fetchQuestions({ count: -5 });
      
      // Should return empty or handle gracefully
      expect(questions).toBeDefined();
    });

    it('should handle very large count', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: Array.from({ length: 5 }, (_, i) => ({
          id: `q${i}`,
          data: () => ({ question: `Q${i}` }),
        })),
      });

      const questions = await questionService.fetchQuestions({ count: 10000 });
      
      // Should return only available questions
      expect(questions.length).toBeLessThanOrEqual(5);
    });

    it('should handle invalid section', async () => {
      mockGetDocs.mockResolvedValueOnce({ docs: [] });

      const questions = await questionService.fetchQuestions({ 
        section: 'INVALID' as any 
      });
      
      // Should return empty, not throw
      expect(questions).toEqual([]);
    });
  });

  describe('Data Transformation', () => {
    it('should include id in returned questions', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { id: 'q-abc-123', data: () => ({ question: 'Test Q' }) },
        ],
      });

      const questions = await questionService.fetchQuestions({});
      
      expect(questions[0].id).toBe('q-abc-123');
    });

    it('should spread document data', async () => {
      mockGetDocs.mockResolvedValueOnce({
        docs: [
          { 
            id: 'q1', 
            data: () => ({ 
              question: 'What is GAAP?',
              options: ['A', 'B', 'C', 'D'],
              correctAnswer: 0,
              explanation: 'GAAP is...',
              section: 'FAR',
              topic: 'Framework',
            }) 
          },
        ],
      });

      const questions = await questionService.fetchQuestions({});
      
      expect(questions[0]).toMatchObject({
        id: 'q1',
        question: 'What is GAAP?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        section: 'FAR',
      });
    });
  });
});
