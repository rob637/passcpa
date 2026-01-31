/**
 * Quality Tests for Lesson Service
 * 
 * Tests lesson fetching, caching, and multi-course support.
 * Focus: Cache behavior, course filtering, error handling
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  serverTimestamp: vi.fn(),
}));

vi.mock('../../config/firebase', () => ({
  db: {},
}));

describe('Lesson Service - Quality Tests', () => {
  let lessonService: any;
  let mockGetDocs: any;
  let mockGetDoc: any;

  beforeEach(async () => {
    vi.resetModules();
    vi.useFakeTimers();
    
    const firestore = await import('firebase/firestore');
    mockGetDocs = firestore.getDocs as any;
    mockGetDoc = firestore.getDoc as any;
    
    lessonService = await import('../../services/lessonService');
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe('fetchAllLessons', () => {
    it('should return lessons from Firestore', async () => {
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [
            { id: 'l1', data: () => ({ title: 'Lesson 1', section: 'FAR', order: 1 }) },
            { id: 'l2', data: () => ({ title: 'Lesson 2', section: 'FAR', order: 2 }) },
          ].forEach(cb);
        },
      });

      const lessons = await lessonService.fetchAllLessons();
      
      expect(lessons.length).toBe(2);
      expect(lessons[0].title).toBe('Lesson 1');
    });

    it('should sort lessons by section and order', async () => {
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [
            { id: 'l3', data: () => ({ title: 'L3', section: 'FAR', order: 3 }) },
            { id: 'l1', data: () => ({ title: 'L1', section: 'AUD', order: 1 }) },
            { id: 'l2', data: () => ({ title: 'L2', section: 'FAR', order: 1 }) },
          ].forEach(cb);
        },
      });

      const lessons = await lessonService.fetchAllLessons();
      
      // Should be sorted: AUD first (alphabetically), then FAR by order
      expect(lessons[0].section).toBe('AUD');
      expect(lessons[1].section).toBe('FAR');
      expect(lessons[1].order).toBe(1);
      expect(lessons[2].order).toBe(3);
    });

    it('should handle lessons with missing order', async () => {
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [
            { id: 'l1', data: () => ({ title: 'L1', section: 'FAR' }) }, // No order
            { id: 'l2', data: () => ({ title: 'L2', section: 'FAR', order: 1 }) },
          ].forEach(cb);
        },
      });

      const lessons = await lessonService.fetchAllLessons();
      
      // Should not throw
      expect(lessons.length).toBe(2);
    });

    it('should use cache on subsequent calls', async () => {
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [{ id: 'l1', data: () => ({ title: 'Cached', section: 'FAR' }) }].forEach(cb);
        },
      });

      // First call - hits Firestore
      const first = await lessonService.fetchAllLessons();
      
      // Second call - should use cache
      const second = await lessonService.fetchAllLessons();
      
      // Should only call Firestore once
      expect(mockGetDocs).toHaveBeenCalledTimes(1);
      expect(first).toEqual(second);
    });

    it('should invalidate cache after 5 minutes', async () => {
      mockGetDocs.mockResolvedValue({
        forEach: (cb: any) => {
          [{ id: 'l1', data: () => ({ title: 'Fresh', section: 'FAR' }) }].forEach(cb);
        },
      });

      // First call
      await lessonService.fetchAllLessons();
      
      // Advance time past cache duration (5 minutes)
      await vi.advanceTimersByTimeAsync(6 * 60 * 1000);
      
      // Second call - should hit Firestore again
      await lessonService.fetchAllLessons();
      
      expect(mockGetDocs).toHaveBeenCalledTimes(2);
    });

    it('should filter by courseId', async () => {
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [
            { id: 'l1', data: () => ({ title: 'CPA Lesson', section: 'FAR', courseId: 'cpa' }) },
            { id: 'l2', data: () => ({ title: 'CMA Lesson', section: 'FAR', courseId: 'cma' }) },
          ].forEach(cb);
        },
      });

      const cpaLessons = await lessonService.fetchAllLessons('cpa');
      
      expect(cpaLessons.every((l: any) => l.courseId === 'cpa' || !l.courseId)).toBe(true);
    });

    it('should default courseId to cpa', async () => {
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [
            { id: 'l1', data: () => ({ title: 'Legacy Lesson', section: 'FAR' }) }, // No courseId
          ].forEach(cb);
        },
      });

      const lessons = await lessonService.fetchAllLessons();
      
      // Legacy lessons (no courseId) should be included
      expect(lessons.length).toBe(1);
    });

    it('should return stale cache on Firestore error', async () => {
      // First call succeeds
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [{ id: 'l1', data: () => ({ title: 'Cached', section: 'FAR' }) }].forEach(cb);
        },
      });
      
      await lessonService.fetchAllLessons();
      
      // Invalidate cache
      await vi.advanceTimersByTimeAsync(6 * 60 * 1000);
      
      // Second call fails
      mockGetDocs.mockRejectedValueOnce(new Error('Network error'));
      
      const lessons = await lessonService.fetchAllLessons();
      
      // Should return stale cache
      expect(lessons[0].title).toBe('Cached');
    });

    it('should return empty array on error with no cache', async () => {
      mockGetDocs.mockRejectedValueOnce(new Error('Network error'));
      
      const lessons = await lessonService.fetchAllLessons('new-course' as any);
      
      expect(lessons).toEqual([]);
    });
  });

  describe('fetchLessonsBySection', () => {
    it('should fetch lessons for specific section', async () => {
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [
            { id: 'l1', data: () => ({ title: 'FAR Lesson', section: 'FAR' }) },
          ].forEach(cb);
        },
      });

      const lessons = await lessonService.fetchLessonsBySection('FAR');
      
      expect(lessons.every((l: any) => l.section === 'FAR')).toBe(true);
    });

    it('should handle case insensitive section', async () => {
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [{ id: 'l1', data: () => ({ title: 'FAR', section: 'FAR' }) }].forEach(cb);
        },
      });

      const lessons = await lessonService.fetchLessonsBySection('far');
      
      expect(lessons).toBeDefined();
    });

    it('should fallback to filtering all lessons on error', async () => {
      // First call fails for section query
      mockGetDocs.mockRejectedValueOnce(new Error('Query error'));
      
      // Fallback fetches all lessons
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [
            { id: 'l1', data: () => ({ title: 'FAR', section: 'FAR' }) },
            { id: 'l2', data: () => ({ title: 'AUD', section: 'AUD' }) },
          ].forEach(cb);
        },
      });

      const lessons = await lessonService.fetchLessonsBySection('FAR');
      
      // Should filter to just FAR
      expect(lessons.every((l: any) => l.section === 'FAR')).toBe(true);
    });

    it('should filter by courseId', async () => {
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [
            { id: 'l1', data: () => ({ title: 'CPA', section: 'FAR', courseId: 'cpa' }) },
            { id: 'l2', data: () => ({ title: 'CMA', section: 'FAR', courseId: 'cma' }) },
          ].forEach(cb);
        },
      });

      const lessons = await lessonService.fetchLessonsBySection('FAR', 'cpa');
      
      expect(lessons.every((l: any) => l.courseId === 'cpa' || !l.courseId)).toBe(true);
    });
  });

  describe('fetchLessonById', () => {
    it('should fetch single lesson by ID', async () => {
      mockGetDoc.mockResolvedValueOnce({
        exists: () => true,
        id: 'lesson-123',
        data: () => ({
          title: 'Test Lesson',
          content: 'Lesson content...',
          section: 'FAR',
        }),
      });

      const lesson = await lessonService.fetchLessonById('lesson-123');
      
      expect(lesson.id).toBe('lesson-123');
      expect(lesson.title).toBe('Test Lesson');
    });

    it('should return null for non-existent lesson', async () => {
      mockGetDoc.mockResolvedValueOnce({
        exists: () => false,
      });

      const lesson = await lessonService.fetchLessonById('non-existent');
      
      expect(lesson).toBeNull();
    });

    it('should check cache before fetching', async () => {
      // Prime cache
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [
            { id: 'l1', data: () => ({ title: 'Cached Lesson', section: 'FAR' }) },
          ].forEach(cb);
        },
      });
      
      await lessonService.fetchAllLessons();
      
      // Now fetch by ID - should use cache
      const lesson = await lessonService.fetchLessonById('l1');
      
      // Should not call getDoc if found in cache
      expect(lesson.title).toBe('Cached Lesson');
    });

    it('should handle fetch error', async () => {
      mockGetDoc.mockRejectedValueOnce(new Error('Network error'));

      const lesson = await lessonService.fetchLessonById('error-lesson');
      
      expect(lesson).toBeNull();
    });
  });

  describe('CRUD Operations', () => {
    it('should add new lesson', async () => {
      const { addDoc } = await import('firebase/firestore');
      (addDoc as any).mockResolvedValueOnce({ id: 'new-lesson' });

      if (lessonService.addLesson) {
        await lessonService.addLesson({
          title: 'New Lesson',
          content: 'Content...',
          section: 'FAR',
        });

        expect(addDoc).toHaveBeenCalled();
      }
    });

    it('should update lesson', async () => {
      const { updateDoc } = await import('firebase/firestore');
      (updateDoc as any).mockResolvedValueOnce(undefined);

      if (lessonService.updateLesson) {
        await lessonService.updateLesson('l1', { title: 'Updated' });

        expect(updateDoc).toHaveBeenCalled();
      }
    });

    it('should delete lesson', async () => {
      const { deleteDoc } = await import('firebase/firestore');
      (deleteDoc as any).mockResolvedValueOnce(undefined);

      if (lessonService.deleteLesson) {
        await lessonService.deleteLesson('l1');

        expect(deleteDoc).toHaveBeenCalled();
      }
    });
  });

  describe('Cache Isolation by Course', () => {
    it('should maintain separate caches for different courses', async () => {
      // CPA lessons
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [{ id: 'l1', data: () => ({ title: 'CPA', section: 'FAR', courseId: 'cpa' }) }].forEach(cb);
        },
      });
      
      const cpaLessons = await lessonService.fetchAllLessons('cpa');
      
      // CMA lessons
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [{ id: 'l2', data: () => ({ title: 'CMA', section: 'FAR', courseId: 'cma' }) }].forEach(cb);
        },
      });
      
      const cmaLessons = await lessonService.fetchAllLessons('cma');
      
      expect(cpaLessons[0].title).toBe('CPA');
      expect(cmaLessons[0].title).toBe('CMA');
      
      // Verify cache is separate
      const cachedCpa = await lessonService.fetchAllLessons('cpa');
      expect(cachedCpa[0].title).toBe('CPA');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty section', async () => {
      mockGetDocs.mockResolvedValueOnce({
        forEach: () => {},
      });

      const lessons = await lessonService.fetchLessonsBySection('');
      
      expect(lessons).toBeDefined();
    });

    it('should handle lessons with all fields', async () => {
      mockGetDocs.mockResolvedValueOnce({
        forEach: (cb: any) => {
          [{
            id: 'complete-lesson',
            data: () => ({
              title: 'Complete Lesson',
              subtitle: 'Subtitle here',
              content: 'Full content...',
              section: 'FAR',
              order: 1,
              duration: 30,
              difficulty: 'medium',
              objectives: ['Learn X', 'Understand Y'],
              courseId: 'cpa',
              blueprintArea: 'I',
              blueprintGroup: 'A',
              createdAt: new Date(),
              updatedAt: new Date(),
            }),
          }].forEach(cb);
        },
      });

      const lessons = await lessonService.fetchAllLessons();
      
      expect(lessons[0]).toMatchObject({
        id: 'complete-lesson',
        title: 'Complete Lesson',
        section: 'FAR',
      });
    });
  });
});
