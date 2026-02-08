/**
 * Written Communication Service - Local-first approach
 * WC tasks are stored in TypeScript files for fast loading and offline support.
 * Firebase is used only for user progress tracking, not WC content.
 */

import { WCTask, WCRubric, ExamSection } from '../types';
import logger from '../utils/logger';

// WC Rubric is small and doesn't change - keep it here as config
export const WC_RUBRIC: WCRubric = {
  organization: {
    weight: 0.25,
    criteria: [
      'Clear opening that addresses the task',
      'Logical flow of ideas',
      'Effective transitions',
      'Strong conclusion',
    ],
  },
  development: {
    weight: 0.4,
    criteria: [
      'Addresses all aspects of the task',
      'Provides relevant examples',
      'Demonstrates understanding of concepts',
      'Sufficient depth of analysis',
    ],
  },
  expression: {
    weight: 0.35,
    criteria: [
      'Professional business tone',
      'Correct grammar and punctuation',
      'Appropriate vocabulary',
      'Clear and concise language',
    ],
  },
};

// Cache for WC tasks (in-memory)
let wcCache: WCTask[] | null = null;

/**
 * Load all WC tasks from local data (with caching)
 */
async function loadWCTasks(): Promise<WCTask[]> {
  if (wcCache) {
    return wcCache;
  }

  try {
    const { ALL_WC_TASKS } = await import('../data/cpa/writtenCommunication');
    wcCache = ALL_WC_TASKS;
    return wcCache;
  } catch (error) {
    logger.error('Failed to load WC tasks:', error);
    return [];
  }
}

/**
 * Fetch all WC tasks from local data
 */
export async function fetchAllWCTasks(): Promise<WCTask[]> {
  try {
    const allTasks = await loadWCTasks();
    
    // Sort by section and topic
    return [...allTasks].sort((a, b) => {
      if (a.section !== b.section) return a.section.localeCompare(b.section);
      return a.topic.localeCompare(b.topic);
    });
  } catch (error) {
    logger.error('Error fetching WC tasks:', error);
    return [];
  }
}

/**
 * Fetch WC tasks by section
 */
export async function fetchWCTasksBySection(section: ExamSection): Promise<WCTask[]> {
  try {
    const { getWCBySection } = await import('../data/cpa/writtenCommunication');
    return getWCBySection(section);
  } catch (error) {
    logger.error(`Error fetching WC tasks for section ${section}:`, error);
    return [];
  }
}

/**
 * Fetch a single WC task by ID
 */
export async function fetchWCTaskById(taskId: string): Promise<WCTask | null> {
  try {
    const allTasks = await loadWCTasks();
    return allTasks.find(t => t.id === taskId) || null;
  } catch (error) {
    logger.error(`Error fetching WC task ${taskId}:`, error);
    return null;
  }
}

/**
 * Get a random WC task (optionally filtered by section)
 */
export async function getRandomWCTask(section?: ExamSection): Promise<WCTask | null> {
  try {
    const { getRandomWC } = await import('../data/cpa/writtenCommunication');
    return getRandomWC(section) || null;
  } catch (error) {
    logger.error('Error getting random WC task:', error);
    return null;
  }
}

/**
 * Search WC tasks by topic
 */
export async function searchWCTasks(searchTerm: string): Promise<WCTask[]> {
  const all = await loadWCTasks();
  const term = searchTerm.toLowerCase();
  
  return all.filter(task =>
    task.topic.toLowerCase().includes(term) ||
    task.scenario?.toLowerCase().includes(term)
  );
}

/**
 * Clear the WC cache
 */
export function clearWCCache(): void {
  wcCache = null;
}

/**
 * Get WC stats by section
 */
export async function getWCStats(): Promise<{ section: string; count: number }[]> {
  try {
    const { getWCStats: getStats } = await import('../data/cpa/writtenCommunication');
    const stats = getStats();
    
    return Object.entries(stats.bySection).map(([section, count]) => ({
      section,
      count: count as number,
    }));
  } catch (error) {
    logger.error('Error getting WC stats:', error);
    return [];
  }
}

/**
 * Get total WC task count
 */
export async function getWCTotalCount(): Promise<number> {
  const tasks = await loadWCTasks();
  return tasks.length;
}
