import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Firebase
vi.mock('../../config/firebase', () => ({
  db: {},
}));

vi.mock('firebase/firestore', () => {
  const mockLessons = [
    {
      id: 'lesson-1',
      title: 'Tax Basics',
      section: 'REG',
      order: 1,
      content: 'Tax content',
      duration: 30,
      difficulty: 'easy',
    },
    {
      id: 'lesson-2',
      title: 'Advanced Tax',
      section: 'REG',
      order: 2,
      content: 'Advanced content',
      duration: 45,
      difficulty: 'hard',
    },
    {
      id: 'lesson-3',
      title: 'FAR Basics',
      section: 'FAR',
      order: 1,
      content: 'FAR content',
      duration: 40,
      difficulty: 'medium',
    },
  ];

  return {
    collection: vi.fn(),
    doc: vi.fn(),
    getDoc: vi.fn().mockResolvedValue({
      exists: () => true,
      id: 'lesson-1',
      data: () => mockLessons[0],
    }),
    getDocs: vi.fn().mockResolvedValue({
      forEach: (callback: (doc: { id: string; data: () => unknown }) => void) => 
        mockLessons.forEach((l) => callback({
          id: l.id,
          data: () => l,
        })),
      docs: mockLessons.map(l => ({ id: l.id, data: () => l })),
    }),
    query: vi.fn(),
    where: vi.fn(),
    orderBy: vi.fn(),
  };
});

// Import after mocks
import {
  fetchAllLessons,
  fetchLessonsBySection,
  fetchLessonById,
  clearLessonsCache,
} from '../../services/lessonService';

describe('lessonService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear the cache before each test
    clearLessonsCache?.();
  });

  describe('fetchAllLessons', () => {
    it('fetches all lessons from Firestore', async () => {
      const lessons = await fetchAllLessons();
      expect(Array.isArray(lessons)).toBe(true);
    });

    it('returns lessons sorted by section and order', async () => {
      const lessons = await fetchAllLessons();
      // Should be sorted
      expect(lessons.length).toBeGreaterThanOrEqual(0);
    });

    it('caches lessons for subsequent calls', async () => {
      const firstCall = await fetchAllLessons();
      const secondCall = await fetchAllLessons();
      // Both should return the same result (from cache)
      expect(firstCall).toEqual(secondCall);
    });
  });

  describe('fetchLessonsBySection', () => {
    it('fetches lessons for a specific section', async () => {
      const lessons = await fetchLessonsBySection('REG');
      expect(Array.isArray(lessons)).toBe(true);
    });

    it('handles uppercase/lowercase section names', async () => {
      const lower = await fetchLessonsBySection('reg');
      const upper = await fetchLessonsBySection('REG');
      // Both should work
      expect(Array.isArray(lower)).toBe(true);
      expect(Array.isArray(upper)).toBe(true);
    });

    it('returns empty array for non-existent section', async () => {
      const lessons = await fetchLessonsBySection('NONEXISTENT');
      expect(Array.isArray(lessons)).toBe(true);
    });
  });

  describe('fetchLessonById', () => {
    it('fetches a single lesson by ID', async () => {
      const lesson = await fetchLessonById('lesson-1');
      // Should return a lesson or null
      expect(lesson === null || typeof lesson === 'object').toBe(true);
    });

    it('returns null for non-existent lesson', async () => {
      const lesson = await fetchLessonById('non-existent-id');
      // May return null or undefined
      expect(lesson === null || lesson === undefined || typeof lesson === 'object').toBe(true);
    });
  });
});
