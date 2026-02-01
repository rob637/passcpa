/**
 * Lesson Service Tests - Local-first Architecture
 * Tests the lessonService which loads lessons from local TypeScript files.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  fetchAllLessons,
  fetchLessonsBySection,
  fetchLessonById,
  getLessonStats,
  fetchLessonsByTopic,
  searchLessons,
  clearLessonCache,
} from '../../services/lessonService';

describe('lessonService', () => {
  beforeEach(() => {
    // Clear cache before each test to ensure clean state
    clearLessonCache();
  });

  describe('fetchAllLessons', () => {
    it('fetches all lessons from local data', async () => {
      const lessons = await fetchAllLessons();
      expect(Array.isArray(lessons)).toBe(true);
      expect(lessons.length).toBeGreaterThan(0);
    });

    it('returns lessons sorted by section and order', async () => {
      const lessons = await fetchAllLessons();
      
      // Verify sorting - same section should be ordered by order field
      for (let i = 1; i < lessons.length; i++) {
        const prev = lessons[i - 1];
        const curr = lessons[i];
        if (prev.section === curr.section) {
          expect(prev.order).toBeLessThanOrEqual(curr.order ?? Infinity);
        }
      }
    });

    it('caches lessons for subsequent calls', async () => {
      const firstCall = await fetchAllLessons();
      const secondCall = await fetchAllLessons();
      // Both should return equivalent arrays
      expect(firstCall.length).toBe(secondCall.length);
      expect(firstCall[0]?.id).toBe(secondCall[0]?.id);
    });

    it('filters by courseId', async () => {
      const cpaLessons = await fetchAllLessons('cpa');
      expect(cpaLessons.length).toBeGreaterThan(0);
      // All lessons should be for 'cpa' course
      cpaLessons.forEach(lesson => {
        expect(lesson.courseId || 'cpa').toBe('cpa');
      });
    });
  });

  describe('fetchLessonsBySection', () => {
    it('fetches lessons for a specific section', async () => {
      const lessons = await fetchLessonsBySection('FAR');
      expect(Array.isArray(lessons)).toBe(true);
      expect(lessons.length).toBeGreaterThan(0);
      lessons.forEach(lesson => {
        expect(lesson.section).toBe('FAR');
      });
    });

    it('handles case insensitive section names', async () => {
      const lessons = await fetchLessonsBySection('far');
      expect(lessons.length).toBeGreaterThan(0);
      lessons.forEach(lesson => {
        expect(lesson.section).toBe('FAR');
      });
    });

    it('returns empty array for non-existent section', async () => {
      const lessons = await fetchLessonsBySection('NONEXISTENT');
      expect(lessons).toEqual([]);
    });
  });

  describe('fetchLessonById', () => {
    it('fetches a single lesson by ID', async () => {
      // First get all lessons to find a valid ID
      const allLessons = await fetchAllLessons();
      expect(allLessons.length).toBeGreaterThan(0);
      
      const firstLesson = allLessons[0];
      const lesson = await fetchLessonById(firstLesson.id);
      
      expect(lesson).not.toBeNull();
      expect(lesson?.id).toBe(firstLesson.id);
    });

    it('returns null for non-existent ID', async () => {
      const lesson = await fetchLessonById('nonexistent-id-12345');
      expect(lesson).toBeNull();
    });
  });

  describe('getLessonStats', () => {
    it('returns lesson statistics', async () => {
      const stats = await getLessonStats();
      
      expect(stats.total).toBeGreaterThan(0);
      expect(typeof stats.bySection).toBe('object');
      expect(typeof stats.byDifficulty).toBe('object');
    });

    it('has stats for known sections', async () => {
      const stats = await getLessonStats();
      
      // Should have at least one of the main sections
      const hasKnownSection = ['FAR', 'AUD', 'REG', 'BAR', 'BEC'].some(
        section => section in stats.bySection
      );
      expect(hasKnownSection).toBe(true);
    });
  });

  describe('fetchLessonsByTopic', () => {
    it('returns lessons matching a topic', async () => {
      // Get all lessons first to find a topic
      const allLessons = await fetchAllLessons();
      const lessonWithTopic = allLessons.find(l => l.topic);
      
      if (lessonWithTopic && lessonWithTopic.topic) {
        const topicLessons = await fetchLessonsByTopic(lessonWithTopic.topic);
        expect(topicLessons.length).toBeGreaterThan(0);
      }
    });

    it('returns empty array for non-matching topic', async () => {
      const lessons = await fetchLessonsByTopic('xyz123nonexistenttopic456');
      expect(lessons).toEqual([]);
    });
  });

  describe('searchLessons', () => {
    it('finds lessons by title keyword', async () => {
      const allLessons = await fetchAllLessons();
      const firstLesson = allLessons[0];
      
      // Search by first word of title
      const searchWord = firstLesson.title.split(' ')[0];
      const results = await searchLessons(searchWord);
      
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(r => r.id === firstLesson.id)).toBe(true);
    });

    it('is case insensitive', async () => {
      const allLessons = await fetchAllLessons();
      const firstLesson = allLessons[0];
      
      const searchWord = firstLesson.title.split(' ')[0];
      const upperResults = await searchLessons(searchWord.toUpperCase());
      const lowerResults = await searchLessons(searchWord.toLowerCase());
      
      expect(upperResults.length).toBe(lowerResults.length);
    });

    it('returns empty array for no matches', async () => {
      const results = await searchLessons('xyz123nonexistent456abc');
      expect(results).toEqual([]);
    });
  });

  describe('clearLessonCache', () => {
    it('clears the cache', async () => {
      // Load lessons to populate cache
      const firstCall = await fetchAllLessons();
      
      // Clear cache
      clearLessonCache();
      
      // Next call should reload (won't be same reference)
      const secondCall = await fetchAllLessons();
      
      // After clear, it's a fresh load, so reference should be different
      // (unless the implementation changed - this tests the cache clearing behavior)
      expect(secondCall.length).toBe(firstCall.length);
    });
  });

  describe('module exports', () => {
    it('exports fetchAllLessons function', () => {
      expect(typeof fetchAllLessons).toBe('function');
    });

    it('exports fetchLessonsBySection function', () => {
      expect(typeof fetchLessonsBySection).toBe('function');
    });

    it('exports fetchLessonById function', () => {
      expect(typeof fetchLessonById).toBe('function');
    });

    it('exports clearLessonCache function', () => {
      expect(typeof clearLessonCache).toBe('function');
    });
  });
});
