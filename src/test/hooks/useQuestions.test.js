import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuestions } from '../../hooks/useQuestions';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
  limit: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
}));

vi.mock('../../config/firebase', () => ({
  db: {},
}));

import { getDocs, getDoc } from 'firebase/firestore';

describe('useQuestions Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have empty questions array initially', () => {
      const { result } = renderHook(() => useQuestions());
      expect(result.current.questions).toEqual([]);
    });

    it('should have loading as false initially', () => {
      const { result } = renderHook(() => useQuestions());
      expect(result.current.loading).toBe(false);
    });

    it('should have null error initially', () => {
      const { result } = renderHook(() => useQuestions());
      expect(result.current.error).toBeNull();
    });

    it('should have currentIndex at 0 initially', () => {
      const { result } = renderHook(() => useQuestions());
      expect(result.current.currentIndex).toBe(0);
    });
  });

  describe('fetchQuestions', () => {
    it('should fetch questions and update state', async () => {
      const mockQuestions = [
        { id: '1', question: 'Question 1', section: 'REG' },
        { id: '2', question: 'Question 2', section: 'REG' },
      ];

      getDocs.mockResolvedValueOnce({
        docs: mockQuestions.map(q => ({
          id: q.id,
          data: () => q,
        })),
      });

      const { result } = renderHook(() => useQuestions({ section: 'REG' }));

      await act(async () => {
        await result.current.fetchQuestions();
      });

      expect(result.current.questions.length).toBe(2);
      expect(result.current.loading).toBe(false);
    });

    it('should set loading to true during fetch', async () => {
      getDocs.mockImplementation(() => new Promise(resolve => setTimeout(() => {
        resolve({ docs: [] });
      }, 100)));

      const { result } = renderHook(() => useQuestions());

      act(() => {
        result.current.fetchQuestions();
      });

      expect(result.current.loading).toBe(true);
    });

    it('should handle fetch errors', async () => {
      getDocs.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useQuestions());

      await act(async () => {
        await result.current.fetchQuestions();
      });

      expect(result.current.error).toBe('Network error');
      expect(result.current.questions).toEqual([]);
    });

    it('should reset currentIndex on new fetch', async () => {
      const mockQuestions = [
        { id: '1', question: 'Q1' },
        { id: '2', question: 'Q2' },
        { id: '3', question: 'Q3' },
      ];

      getDocs.mockResolvedValue({
        docs: mockQuestions.map(q => ({ id: q.id, data: () => q })),
      });

      const { result } = renderHook(() => useQuestions());

      await act(async () => {
        await result.current.fetchQuestions();
      });

      // Move to next question
      act(() => {
        result.current.nextQuestion();
      });
      expect(result.current.currentIndex).toBe(1);

      // Fetch again
      await act(async () => {
        await result.current.fetchQuestions();
      });

      expect(result.current.currentIndex).toBe(0);
    });
  });

  describe('getQuestion', () => {
    it('should fetch a single question by ID', async () => {
      const mockQuestion = { id: 'q1', question: 'Test question', answer: 'A' };

      getDoc.mockResolvedValueOnce({
        exists: () => true,
        id: mockQuestion.id,
        data: () => mockQuestion,
      });

      const { result } = renderHook(() => useQuestions());

      let question;
      await act(async () => {
        question = await result.current.getQuestion('q1');
      });

      expect(question).toEqual({ ...mockQuestion, id: 'q1' });
    });

    it('should return null for non-existent question', async () => {
      getDoc.mockResolvedValueOnce({
        exists: () => false,
      });

      const { result } = renderHook(() => useQuestions());

      let question;
      await act(async () => {
        question = await result.current.getQuestion('non-existent');
      });

      expect(question).toBeNull();
    });

    it('should handle errors when fetching single question', async () => {
      getDoc.mockRejectedValueOnce(new Error('Fetch error'));

      const { result } = renderHook(() => useQuestions());

      let question;
      await act(async () => {
        question = await result.current.getQuestion('q1');
      });

      expect(question).toBeNull();
    });
  });

  describe('Navigation', () => {
    beforeEach(async () => {
      const mockQuestions = [
        { id: '1', question: 'Q1' },
        { id: '2', question: 'Q2' },
        { id: '3', question: 'Q3' },
      ];

      getDocs.mockResolvedValue({
        docs: mockQuestions.map(q => ({ id: q.id, data: () => q })),
      });
    });

    it('should move to next question', async () => {
      const { result } = renderHook(() => useQuestions());

      await act(async () => {
        await result.current.fetchQuestions();
      });

      expect(result.current.currentIndex).toBe(0);

      act(() => {
        const moved = result.current.nextQuestion();
        expect(moved).toBe(true);
      });

      expect(result.current.currentIndex).toBe(1);
    });

    it('should return false when at last question', async () => {
      const { result } = renderHook(() => useQuestions());

      await act(async () => {
        await result.current.fetchQuestions();
      });

      // Move to last question
      act(() => {
        result.current.nextQuestion();
        result.current.nextQuestion();
      });

      expect(result.current.currentIndex).toBe(2);

      act(() => {
        const moved = result.current.nextQuestion();
        expect(moved).toBe(false);
      });

      expect(result.current.currentIndex).toBe(2);
    });

    it('should move to previous question', async () => {
      const { result } = renderHook(() => useQuestions());

      await act(async () => {
        await result.current.fetchQuestions();
      });

      act(() => {
        result.current.nextQuestion();
      });
      expect(result.current.currentIndex).toBe(1);

      act(() => {
        const moved = result.current.previousQuestion();
        expect(moved).toBe(true);
      });

      expect(result.current.currentIndex).toBe(0);
    });

    it('should return false when at first question', async () => {
      const { result } = renderHook(() => useQuestions());

      await act(async () => {
        await result.current.fetchQuestions();
      });

      act(() => {
        const moved = result.current.previousQuestion();
        expect(moved).toBe(false);
      });

      expect(result.current.currentIndex).toBe(0);
    });

    it('should jump to specific question', async () => {
      const { result } = renderHook(() => useQuestions());

      await act(async () => {
        await result.current.fetchQuestions();
      });

      act(() => {
        result.current.goToQuestion(2);
      });

      expect(result.current.currentIndex).toBe(2);
    });

    it('should not jump to invalid index', async () => {
      const { result } = renderHook(() => useQuestions());

      await act(async () => {
        await result.current.fetchQuestions();
      });

      act(() => {
        result.current.goToQuestion(10);
      });

      expect(result.current.currentIndex).toBe(0);

      act(() => {
        result.current.goToQuestion(-1);
      });

      expect(result.current.currentIndex).toBe(0);
    });
  });

  describe('currentQuestion', () => {
    it('should return the current question', async () => {
      const mockQuestions = [
        { id: '1', question: 'Q1' },
        { id: '2', question: 'Q2' },
      ];

      getDocs.mockResolvedValueOnce({
        docs: mockQuestions.map(q => ({ id: q.id, data: () => q })),
      });

      const { result } = renderHook(() => useQuestions());

      await act(async () => {
        await result.current.fetchQuestions();
      });

      // Check that we have a current question (shuffled, so can't check specific id)
      expect(result.current.currentQuestion).toBeDefined();
      expect(result.current.currentQuestion.question).toMatch(/Q[12]/);

      act(() => {
        result.current.nextQuestion();
      });

      // After moving, should still have a valid question
      expect(result.current.currentQuestion).toBeDefined();
    });

    it('should return null when no questions', () => {
      const { result } = renderHook(() => useQuestions());
      expect(result.current.currentQuestion).toBeNull();
    });
  });

  describe('totalQuestions', () => {
    it('should return correct total count', async () => {
      const mockQuestions = Array(5).fill(null).map((_, i) => ({
        id: String(i),
        question: `Q${i}`,
      }));

      getDocs.mockResolvedValueOnce({
        docs: mockQuestions.map(q => ({ id: q.id, data: () => q })),
      });

      const { result } = renderHook(() => useQuestions());

      await act(async () => {
        await result.current.fetchQuestions();
      });

      expect(result.current.totalQuestions).toBe(5);
    });
  });
});
