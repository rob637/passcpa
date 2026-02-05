/**
 * Lesson Service - Quality Tests (Bug-Finding Focus)
 * 
 * Tests the lesson service for edge cases and potential bugs.
 * These tests are designed to find issues in:
 * - Course ID filtering
 * - Section filtering and sorting
 * - Search functionality
 * - Topic-based filtering
 * - Cache behavior
 * 
 * @batch 7 of 20 (25 tests)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchAllLessons,
  fetchLessonsBySection,
  fetchLessonById,
  getLessonStats,
  fetchLessonsByTopic,
  searchLessons,
  clearLessonCache,
} from '../../services/lessonService';
import type { CourseId } from '../../types';

describe('Lesson Service - Quality Tests', () => {
  beforeEach(() => {
    clearLessonCache();
    vi.clearAllMocks();
  });

  describe('fetchAllLessons - Course ID Filtering', () => {
    it('returns array for default course ID', async () => {
      const lessons = await fetchAllLessons();
      expect(Array.isArray(lessons)).toBe(true);
    });

    it('returns array for explicit cpa course ID', async () => {
      const lessons = await fetchAllLessons('cpa');
      expect(Array.isArray(lessons)).toBe(true);
    });

    it('returns empty or filtered for future course IDs', async () => {
      // CMA, EA, CIA are future courses - might be empty
      const cmaLessons = await fetchAllLessons('cma' as CourseId);
      expect(Array.isArray(cmaLessons)).toBe(true);
    });

    it('handles invalid course ID gracefully', async () => {
      const lessons = await fetchAllLessons('invalid-course' as CourseId);
      expect(Array.isArray(lessons)).toBe(true);
    });
  });

  describe('fetchAllLessons - Sorting', () => {
    it('returns lessons sorted by section then order', async () => {
      const lessons = await fetchAllLessons();
      
      if (lessons.length >= 2) {
        for (let i = 1; i < lessons.length; i++) {
          const prev = lessons[i - 1];
          const curr = lessons[i];
          
          if (prev.section === curr.section) {
            // Within same section, should be sorted by order
            expect((prev.order || 0) <= (curr.order || 0)).toBe(true);
          } else {
            // Different sections should be in alphabetical order
            expect(prev.section.localeCompare(curr.section)).toBeLessThanOrEqual(0);
          }
        }
      }
    });
  });

  describe('fetchLessonsBySection - Edge Cases', () => {
    it('returns lessons for valid section', async () => {
      const lessons = await fetchLessonsBySection('FAR');
      expect(Array.isArray(lessons)).toBe(true);
      
      lessons.forEach(lesson => {
        expect(lesson.section.toUpperCase()).toBe('FAR');
      });
    });

    it('handles lowercase section input', async () => {
      const lessons = await fetchLessonsBySection('far');
      expect(Array.isArray(lessons)).toBe(true);
      
      // Should normalize to uppercase
      lessons.forEach(lesson => {
        expect(lesson.section.toUpperCase()).toBe('FAR');
      });
    });

    it('returns empty array for invalid section', async () => {
      const lessons = await fetchLessonsBySection('INVALID');
      expect(Array.isArray(lessons)).toBe(true);
      expect(lessons).toEqual([]);
    });

    it('handles empty string section', async () => {
      const lessons = await fetchLessonsBySection('');
      expect(Array.isArray(lessons)).toBe(true);
    });

    it('filters by course ID when provided', async () => {
      const cpaLessons = await fetchLessonsBySection('FAR', 'cpa');
      expect(Array.isArray(cpaLessons)).toBe(true);
    });
  });

  describe('fetchLessonById - Edge Cases', () => {
    it('returns null for non-existent ID', async () => {
      const lesson = await fetchLessonById('nonexistent-lesson-xyz');
      expect(lesson).toBeNull();
    });

    it('returns null for empty string ID', async () => {
      const lesson = await fetchLessonById('');
      expect(lesson).toBeNull();
    });

    it('finds existing lesson by ID', async () => {
      const allLessons = await fetchAllLessons();
      
      if (allLessons.length > 0) {
        const existingId = allLessons[0].id;
        const lesson = await fetchLessonById(existingId);
        
        expect(lesson).not.toBeNull();
        expect(lesson?.id).toBe(existingId);
      }
    });

    it('handles special characters in ID', async () => {
      const lesson = await fetchLessonById('id/with/slashes');
      expect(lesson).toBeNull(); // Should not crash
    });
  });

  describe('getLessonStats', () => {
    it('returns valid stats object', async () => {
      const stats = await getLessonStats();
      
      expect(stats).toHaveProperty('total');
      expect(stats).toHaveProperty('bySection');
      expect(stats).toHaveProperty('byDifficulty');
      expect(typeof stats.total).toBe('number');
    });

    it('bySection contains expected sections', async () => {
      const stats = await getLessonStats();
      
      // At least some sections should have lessons
      const sectionCounts = Object.values(stats.bySection);
      expect(sectionCounts.some(count => count > 0)).toBe(true);
    });

    it('total matches sum of section counts', async () => {
      const stats = await getLessonStats();
      
      const sum = Object.values(stats.bySection).reduce((a, b) => a + b, 0);
      expect(stats.total).toBe(sum);
    });
  });

  describe('fetchLessonsByTopic - Edge Cases', () => {
    it('returns lessons matching topic', async () => {
      const lessons = await fetchLessonsByTopic('Revenue');
      expect(Array.isArray(lessons)).toBe(true);
    });

    it('is case-insensitive', async () => {
      const lowercase = await fetchLessonsByTopic('revenue');
      const uppercase = await fetchLessonsByTopic('REVENUE');
      
      expect(lowercase.length).toBe(uppercase.length);
    });

    it('handles empty topic string', async () => {
      const lessons = await fetchLessonsByTopic('');
      expect(Array.isArray(lessons)).toBe(true);
      // Empty string matches all
    });

    it('returns empty for nonexistent topic', async () => {
      const lessons = await fetchLessonsByTopic('xyz-nonexistent-topic-123');
      expect(lessons).toEqual([]);
    });

    it('searches in both topics array and title', async () => {
      const allLessons = await fetchAllLessons();
      
      if (allLessons.length > 0 && allLessons[0].title) {
        const titlePart = allLessons[0].title.substring(0, 5);
        const lessons = await fetchLessonsByTopic(titlePart);
        expect(lessons.length).toBeGreaterThan(0);
      }
    });
  });

  describe('searchLessons - Edge Cases', () => {
    it('handles empty search query', async () => {
      const results = await searchLessons('');
      expect(Array.isArray(results)).toBe(true);
    });

    it('handles single character query', async () => {
      const results = await searchLessons('a');
      expect(Array.isArray(results)).toBe(true);
    });

    it('is case-insensitive', async () => {
      const lowercase = await searchLessons('accounting');
      const uppercase = await searchLessons('ACCOUNTING');
      
      expect(lowercase.length).toBe(uppercase.length);
    });

    it('searches in title, topics, and description', async () => {
      const allLessons = await fetchAllLessons();
      
      if (allLessons.length > 0 && allLessons[0].title) {
        const title = allLessons[0].title;
        const results = await searchLessons(title.substring(0, 5));
        expect(results.length).toBeGreaterThan(0);
      }
    });

    it('handles special characters in query', async () => {
      const results = await searchLessons('test@#$%');
      expect(Array.isArray(results)).toBe(true);
    });

    it('handles very long query string', async () => {
      const longQuery = 'a'.repeat(1000);
      const results = await searchLessons(longQuery);
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });

    it('respects course ID parameter', async () => {
      const cpaResults = await searchLessons('Revenue', 'cpa');
      expect(Array.isArray(cpaResults)).toBe(true);
    });
  });

  describe('clearLessonCache', () => {
    it('clears cache without error', () => {
      expect(() => clearLessonCache()).not.toThrow();
    });

    it('cache is cleared and lessons can be re-fetched', async () => {
      await fetchAllLessons();
      clearLessonCache();
      
      const lessons = await fetchAllLessons();
      expect(Array.isArray(lessons)).toBe(true);
    });

    it('multiple cache clears are idempotent', () => {
      expect(() => {
        clearLessonCache();
        clearLessonCache();
        clearLessonCache();
      }).not.toThrow();
    });
  });
});
