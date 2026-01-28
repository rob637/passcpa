/**
 * Written Communication Service - Firestore-based WC task fetching
 * Replaces static data imports from data/written-communication
 */

import { collection, query, where, getDocs, doc, getDoc, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { WCTask, WCRubric, ExamSection } from '../types';

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

// In-memory cache with TTL
interface CacheEntry {
  data: WCTask[];
  timestamp: number;
}

const wcCache: Map<string, CacheEntry> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Check if cache entry is still valid
 */
function isCacheValid(entry: CacheEntry | undefined): boolean {
  if (!entry) return false;
  return Date.now() - entry.timestamp < CACHE_TTL;
}

/**
 * Fetch all WC tasks from Firestore
 */
export async function fetchAllWCTasks(): Promise<WCTask[]> {
  const cacheKey = 'all';
  const cached = wcCache.get(cacheKey);
  
  if (isCacheValid(cached)) {
    return cached!.data;
  }

  try {
    const wcRef = collection(db, 'written-communication');
    const q = query(wcRef, orderBy('topic'));
    const snapshot = await getDocs(q);
    
    const tasks: WCTask[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as WCTask[];
    
    wcCache.set(cacheKey, {
      data: tasks,
      timestamp: Date.now()
    });
    
    return tasks;
  } catch (error) {
    console.error('Error fetching WC tasks from Firestore:', error);
    return [];
  }
}

/**
 * Fetch WC tasks by section
 */
export async function fetchWCTasksBySection(section: ExamSection): Promise<WCTask[]> {
  const cacheKey = `section-${section}`;
  const cached = wcCache.get(cacheKey);
  
  if (isCacheValid(cached)) {
    return cached!.data;
  }

  try {
    const wcRef = collection(db, 'written-communication');
    const q = query(
      wcRef, 
      where('section', '==', section),
      orderBy('topic')
    );
    const snapshot = await getDocs(q);
    
    const tasks: WCTask[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as WCTask[];
    
    wcCache.set(cacheKey, {
      data: tasks,
      timestamp: Date.now()
    });
    
    return tasks;
  } catch (error) {
    console.error(`Error fetching WC tasks for section ${section}:`, error);
    return [];
  }
}

/**
 * Fetch a single WC task by ID
 */
export async function fetchWCTaskById(taskId: string): Promise<WCTask | null> {
  // Check if we have it in any cache
  for (const [, entry] of wcCache) {
    if (isCacheValid(entry)) {
      const found = entry.data.find(t => t.id === taskId);
      if (found) return found;
    }
  }

  try {
    const wcDoc = await getDoc(doc(db, 'written-communication', taskId));
    
    if (wcDoc.exists()) {
      return { id: wcDoc.id, ...wcDoc.data() } as WCTask;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching WC task ${taskId}:`, error);
    return null;
  }
}

/**
 * Get a random WC task (optionally filtered by section)
 */
export async function getRandomWCTask(section?: ExamSection): Promise<WCTask | null> {
  try {
    const tasks = section 
      ? await fetchWCTasksBySection(section)
      : await fetchAllWCTasks();
    
    if (tasks.length === 0) return null;
    
    return tasks[Math.floor(Math.random() * tasks.length)];
  } catch (error) {
    console.error('Error getting random WC task:', error);
    return null;
  }
}

/**
 * Search WC tasks by topic
 */
export async function searchWCTasks(searchTerm: string): Promise<WCTask[]> {
  const all = await fetchAllWCTasks();
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
  wcCache.clear();
}
