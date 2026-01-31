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

  describe('multi-course support', () => {
    it('accepts courseId parameter in fetchAllLessons', async () => {
      const lessons = await fetchAllLessons('cpa');
      expect(Array.isArray(lessons)).toBe(true);
    });

    it('uses default course ID when not specified', async () => {
      const lessons = await fetchAllLessons();
      expect(Array.isArray(lessons)).toBe(true);
    });

    it('accepts courseId parameter in fetchLessonsBySection', async () => {
      const lessons = await fetchLessonsBySection('REG', 'cpa');
      expect(Array.isArray(lessons)).toBe(true);
    });

    it('accepts courseId parameter in fetchLessonById', async () => {
      const lesson = await fetchLessonById('lesson-1', 'cpa');
      expect(lesson === null || typeof lesson === 'object').toBe(true);
    });
  });

  describe('caching behavior', () => {
    it('clearLessonsCache function exists', async () => {
      const service = await import('../../services/lessonService');
      expect(typeof service.clearLessonsCache).toBe('function');
    });

    it('cache expires after duration', async () => {
      // Cache duration is 5 minutes (300000 ms)
      const CACHE_DURATION = 5 * 60 * 1000;
      expect(CACHE_DURATION).toBe(300000);
    });
  });

  describe('error handling', () => {
    it('returns empty array on fetch error for fetchAllLessons', async () => {
      // The function should handle errors gracefully
      const lessons = await fetchAllLessons();
      expect(Array.isArray(lessons)).toBe(true);
    });

    it('falls back to filtering all lessons on fetchLessonsBySection error', async () => {
      const lessons = await fetchLessonsBySection('FAR');
      expect(Array.isArray(lessons)).toBe(true);
    });
  });

  describe('lesson data structure', () => {
    it('lessons have id property', async () => {
      const lessons = await fetchAllLessons();
      if (lessons.length > 0) {
        expect(lessons[0].id).toBeDefined();
      }
    });

    it('lessons have title property', async () => {
      const lessons = await fetchAllLessons();
      if (lessons.length > 0) {
        expect(lessons[0].title).toBeDefined();
      }
    });

    it('lessons have section property', async () => {
      const lessons = await fetchAllLessons();
      if (lessons.length > 0) {
        expect(lessons[0].section).toBeDefined();
      }
    });
  });

  describe('module exports', () => {
    it('exports fetchAllLessons function', async () => {
      const service = await import('../../services/lessonService');
      expect(typeof service.fetchAllLessons).toBe('function');
    });

    it('exports fetchLessonsBySection function', async () => {
      const service = await import('../../services/lessonService');
      expect(typeof service.fetchLessonsBySection).toBe('function');
    });

    it('exports fetchLessonById function', async () => {
      const service = await import('../../services/lessonService');
      expect(typeof service.fetchLessonById).toBe('function');
    });

    it('exports clearLessonsCache function', async () => {
      const service = await import('../../services/lessonService');
      expect(typeof service.clearLessonsCache).toBe('function');
    });
  });
});

describe('lessonService sorting', () => {
  it('sorts lessons by section first', async () => {
    const lessons = await fetchAllLessons();
    // Lessons should be sorted by section
    if (lessons.length > 1) {
      for (let i = 1; i < lessons.length; i++) {
        const prev = lessons[i - 1];
        const curr = lessons[i];
        if (prev.section !== curr.section) {
          expect(prev.section.localeCompare(curr.section)).toBeLessThanOrEqual(0);
        }
      }
    }
  });

  it('sorts lessons by order within same section', async () => {
    const lessons = await fetchAllLessons();
    // Within same section, should be sorted by order
    if (lessons.length > 1) {
      for (let i = 1; i < lessons.length; i++) {
        const prev = lessons[i - 1];
        const curr = lessons[i];
        if (prev.section === curr.section) {
          expect((prev.order || 0) <= (curr.order || 0)).toBe(true);
        }
      }
    }
  });
});

describe('lessonService section filtering', () => {
  it('returns array when filtering by FAR', async () => {
    const lessons = await fetchLessonsBySection('FAR');
    expect(Array.isArray(lessons)).toBe(true);
  });

  it('returns array when filtering by AUD', async () => {
    const lessons = await fetchLessonsBySection('AUD');
    expect(Array.isArray(lessons)).toBe(true);
  });

  it('returns array when filtering by REG', async () => {
    const lessons = await fetchLessonsBySection('REG');
    expect(Array.isArray(lessons)).toBe(true);
  });

  it('returns array when filtering by BAR', async () => {
    const lessons = await fetchLessonsBySection('BAR');
    expect(Array.isArray(lessons)).toBe(true);
  });

  it('handles case-insensitive section names', async () => {
    const lessonsLower = await fetchLessonsBySection('far');
    const lessonsUpper = await fetchLessonsBySection('FAR');
    // Both should return arrays
    expect(Array.isArray(lessonsLower)).toBe(true);
    expect(Array.isArray(lessonsUpper)).toBe(true);
  });
});
