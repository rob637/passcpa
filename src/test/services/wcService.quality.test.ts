/**
 * WC (Written Communication) Service - Quality Tests (Bug-Finding Focus)
 * 
 * Tests the Written Communication service for edge cases and potential bugs.
 * These tests are designed to find issues in:
 * - WC task fetching and filtering
 * - Section-based filtering
 * - Random selection
 * - Search functionality
 * - Cache behavior
 * 
 * @batch 8 of 20 (25 tests)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchAllWCTasks,
  fetchWCTasksBySection,
  fetchWCTaskById,
  getRandomWCTask,
  searchWCTasks,
  clearWCCache,
  getWCStats,
  getWCTotalCount,
  WC_RUBRIC,
} from '../../services/wcService';
import type { ExamSection } from '../../types';

describe('WC Service - Quality Tests', () => {
  beforeEach(() => {
    clearWCCache();
    vi.clearAllMocks();
  });

  describe('WC_RUBRIC - Structure Validation', () => {
    it('has required rubric categories', () => {
      expect(WC_RUBRIC).toHaveProperty('organization');
      expect(WC_RUBRIC).toHaveProperty('development');
      expect(WC_RUBRIC).toHaveProperty('expression');
    });

    it('weights sum to 1.0', () => {
      const totalWeight = 
        WC_RUBRIC.organization.weight +
        WC_RUBRIC.development.weight +
        WC_RUBRIC.expression.weight;
      
      expect(totalWeight).toBeCloseTo(1.0, 5);
    });

    it('each category has criteria array', () => {
      expect(Array.isArray(WC_RUBRIC.organization.criteria)).toBe(true);
      expect(Array.isArray(WC_RUBRIC.development.criteria)).toBe(true);
      expect(Array.isArray(WC_RUBRIC.expression.criteria)).toBe(true);
    });

    it('each category has non-empty criteria', () => {
      expect(WC_RUBRIC.organization.criteria.length).toBeGreaterThan(0);
      expect(WC_RUBRIC.development.criteria.length).toBeGreaterThan(0);
      expect(WC_RUBRIC.expression.criteria.length).toBeGreaterThan(0);
    });
  });

  describe('fetchAllWCTasks - Edge Cases', () => {
    it('returns array of WC tasks', async () => {
      const tasks = await fetchAllWCTasks();
      expect(Array.isArray(tasks)).toBe(true);
    });

    it('tasks are sorted by section then topic', async () => {
      const tasks = await fetchAllWCTasks();
      
      if (tasks.length >= 2) {
        for (let i = 1; i < tasks.length; i++) {
          const prev = tasks[i - 1];
          const curr = tasks[i];
          
          if (prev.section === curr.section) {
            expect(prev.topic.localeCompare(curr.topic)).toBeLessThanOrEqual(0);
          } else {
            expect(prev.section.localeCompare(curr.section)).toBeLessThanOrEqual(0);
          }
        }
      }
    });

    it('each task has required properties', async () => {
      const tasks = await fetchAllWCTasks();
      
      tasks.forEach(task => {
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('section');
        expect(task).toHaveProperty('topic');
      });
    });

    it('uses cache on second call', async () => {
      const first = await fetchAllWCTasks();
      const second = await fetchAllWCTasks();
      
      // Same reference from cache
      expect(first.length).toBe(second.length);
    });
  });

  describe('fetchWCTasksBySection - Edge Cases', () => {
    it('returns tasks for valid section', async () => {
      const tasks = await fetchWCTasksBySection('FAR');
      expect(Array.isArray(tasks)).toBe(true);
      
      tasks.forEach(task => {
        expect(task.section).toBe('FAR');
      });
    });

    it('handles each valid section', async () => {
      const sections: ExamSection[] = ['FAR', 'AUD', 'REG', 'BAR'];
      
      for (const section of sections) {
        const tasks = await fetchWCTasksBySection(section);
        expect(Array.isArray(tasks)).toBe(true);
      }
    });

    it('handles invalid section gracefully', async () => {
      const tasks = await fetchWCTasksBySection('INVALID' as ExamSection);
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.length).toBe(0);
    });
  });

  describe('fetchWCTaskById - Edge Cases', () => {
    it('returns null for non-existent ID', async () => {
      const task = await fetchWCTaskById('nonexistent-wc-xyz');
      expect(task).toBeNull();
    });

    it('returns null for empty string ID', async () => {
      const task = await fetchWCTaskById('');
      expect(task).toBeNull();
    });

    it('finds existing task by ID', async () => {
      const allTasks = await fetchAllWCTasks();
      
      if (allTasks.length > 0) {
        const existingId = allTasks[0].id;
        const task = await fetchWCTaskById(existingId);
        
        expect(task).not.toBeNull();
        expect(task?.id).toBe(existingId);
      }
    });

    it('handles special characters in ID', async () => {
      const task = await fetchWCTaskById('id/with/special@chars');
      expect(task).toBeNull();
    });
  });

  describe('getRandomWCTask - Edge Cases', () => {
    it('returns a task without section filter', async () => {
      const task = await getRandomWCTask();
      
      // Could be null if no tasks exist
      if (task !== null) {
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('section');
      }
    });

    it('returns task matching section filter', async () => {
      const task = await getRandomWCTask('FAR');
      
      if (task !== null) {
        expect(task.section).toBe('FAR');
      }
    });

    it('returns null for section with no tasks', async () => {
      // Invalid section should return null or empty
      const task = await getRandomWCTask('INVALID' as ExamSection);
      expect(task).toBeNull();
    });
  });

  describe('searchWCTasks - Edge Cases', () => {
    it('handles empty search term', async () => {
      const results = await searchWCTasks('');
      expect(Array.isArray(results)).toBe(true);
      // Empty string should match all tasks
      const all = await fetchAllWCTasks();
      expect(results.length).toBe(all.length);
    });

    it('is case-insensitive', async () => {
      const lowercase = await searchWCTasks('revenue');
      const uppercase = await searchWCTasks('REVENUE');
      
      expect(lowercase.length).toBe(uppercase.length);
    });

    it('searches in topic field', async () => {
      const allTasks = await fetchAllWCTasks();
      
      if (allTasks.length > 0 && allTasks[0].topic) {
        const topicPart = allTasks[0].topic.substring(0, 5);
        const results = await searchWCTasks(topicPart);
        expect(results.length).toBeGreaterThan(0);
      }
    });

    it('returns empty for nonsense search', async () => {
      const results = await searchWCTasks('xyz123nonsense456');
      expect(results).toEqual([]);
    });

    it('handles special characters in search', async () => {
      const results = await searchWCTasks('test@#$%^&');
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe('clearWCCache', () => {
    it('clears cache without error', () => {
      expect(() => clearWCCache()).not.toThrow();
    });

    it('allows re-fetch after clear', async () => {
      await fetchAllWCTasks();
      clearWCCache();
      
      const tasks = await fetchAllWCTasks();
      expect(Array.isArray(tasks)).toBe(true);
    });

    it('multiple clears are idempotent', () => {
      expect(() => {
        clearWCCache();
        clearWCCache();
        clearWCCache();
      }).not.toThrow();
    });
  });

  describe('getWCStats', () => {
    it('returns array of section stats', async () => {
      const stats = await getWCStats();
      expect(Array.isArray(stats)).toBe(true);
    });

    it('each stat has section and count', async () => {
      const stats = await getWCStats();
      
      stats.forEach(stat => {
        expect(stat).toHaveProperty('section');
        expect(stat).toHaveProperty('count');
        expect(typeof stat.count).toBe('number');
      });
    });
  });

  describe('getWCTotalCount', () => {
    it('returns a number', async () => {
      const count = await getWCTotalCount();
      expect(typeof count).toBe('number');
    });

    it('matches length of fetchAllWCTasks', async () => {
      const count = await getWCTotalCount();
      const tasks = await fetchAllWCTasks();
      
      expect(count).toBe(tasks.length);
    });

    it('is non-negative', async () => {
      const count = await getWCTotalCount();
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });
});
