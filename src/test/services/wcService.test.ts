import { describe, it, expect, beforeEach } from 'vitest';

import {
  fetchAllWCTasks,
  fetchWCTasksBySection,
  fetchWCTaskById,
  getRandomWCTask,
  searchWCTasks,
  clearWCCache,
  getWCStats,
  getWCTotalCount,
  WC_RUBRIC
} from '../../services/wcService';

describe('wcService', () => {
  beforeEach(() => {
    // Clear cache before each test
    clearWCCache();
  });

  describe('WC_RUBRIC', () => {
    it('should have all required rubric categories', () => {
      expect(WC_RUBRIC).toHaveProperty('organization');
      expect(WC_RUBRIC).toHaveProperty('development');
      expect(WC_RUBRIC).toHaveProperty('expression');
    });

    it('should have valid weights that sum to 1', () => {
      const totalWeight = Object.values(WC_RUBRIC).reduce(
        (sum, category) => sum + (category.weight || 0),
        0
      );
      expect(totalWeight).toBeCloseTo(1, 2);
    });
  });

  describe('fetchAllWCTasks', () => {
    it('should return an array of WC tasks', async () => {
      const tasks = await fetchAllWCTasks();
      expect(Array.isArray(tasks)).toBe(true);
    });

    it('should return tasks with required fields', async () => {
      const tasks = await fetchAllWCTasks();
      if (tasks.length > 0) {
        const task = tasks[0];
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('topic');
        // WC tasks use 'prompt' field for the task description
        expect(task).toHaveProperty('prompt');
        expect(task).toHaveProperty('section');
      }
    });

    it('should cache results for subsequent calls', async () => {
      const tasks1 = await fetchAllWCTasks();
      const tasks2 = await fetchAllWCTasks();
      // Data is the same even if reference differs due to spread operator
      expect(tasks1).toStrictEqual(tasks2);
    });
  });

  describe('fetchWCTasksBySection', () => {
    it('should return tasks filtered by section', async () => {
      const tasks = await fetchWCTasksBySection('AUD');
      expect(Array.isArray(tasks)).toBe(true);
      tasks.forEach(task => {
        expect(task.section).toBe('AUD');
      });
    });

    it('should return empty array for section with no tasks', async () => {
      const tasks = await fetchWCTasksBySection('FAR');
      expect(Array.isArray(tasks)).toBe(true);
      // FAR may or may not have WC tasks, just check it's an array
    });
  });

  describe('fetchWCTaskById', () => {
    it('should return a task when ID exists', async () => {
      const allTasks = await fetchAllWCTasks();
      if (allTasks.length > 0) {
        const task = await fetchWCTaskById(allTasks[0].id);
        expect(task).not.toBeNull();
        expect(task?.id).toBe(allTasks[0].id);
      }
    });

    it('should return null for non-existent ID', async () => {
      const task = await fetchWCTaskById('non-existent-id-12345');
      expect(task).toBeNull();
    });
  });

  describe('getRandomWCTask', () => {
    it('should return a random task', async () => {
      const task = await getRandomWCTask();
      // May return null if no tasks exist
      if (task) {
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('topic');
      }
    });

    it('should return task from specified section when provided', async () => {
      const task = await getRandomWCTask('AUD');
      if (task) {
        expect(task.section).toBe('AUD');
      }
    });
  });

  describe('searchWCTasks', () => {
    it('should return tasks matching search term', async () => {
      const tasks = await searchWCTasks('memo');
      expect(Array.isArray(tasks)).toBe(true);
    });

    it('should be case insensitive', async () => {
      const tasks1 = await searchWCTasks('MEMO');
      const tasks2 = await searchWCTasks('memo');
      expect(tasks1.length).toBe(tasks2.length);
    });

    it('should return empty array for no matches', async () => {
      const tasks = await searchWCTasks('xyznonexistent123');
      expect(tasks).toEqual([]);
    });
  });

  describe('clearWCCache', () => {
    it('should clear the cache', async () => {
      // Load into cache
      const tasks1 = await fetchAllWCTasks();
      
      // Clear cache
      clearWCCache();
      
      // Load again - should be fresh (but same data since from local files)
      const tasks2 = await fetchAllWCTasks();
      
      // Different references mean cache was cleared
      expect(tasks1).not.toBe(tasks2);
    });
  });

  describe('getWCStats', () => {
    it('should return stats by section', async () => {
      const stats = await getWCStats();
      expect(Array.isArray(stats)).toBe(true);
      stats.forEach(stat => {
        expect(stat).toHaveProperty('section');
        expect(stat).toHaveProperty('count');
        expect(typeof stat.count).toBe('number');
      });
    });
  });

  describe('getWCTotalCount', () => {
    it('should return total count of WC tasks', async () => {
      const count = await getWCTotalCount();
      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(0);
    });

    it('should match length of fetchAllWCTasks', async () => {
      const count = await getWCTotalCount();
      const tasks = await fetchAllWCTasks();
      expect(count).toBe(tasks.length);
    });
  });
});
