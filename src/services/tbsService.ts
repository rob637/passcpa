/**
 * TBS Service - Local-first approach
 * Task-Based Simulations are stored in TypeScript files for fast loading and offline support.
 * Firebase is used only for user progress tracking, not TBS content.
 */

import { TBS, ExamSection } from '../types';
import logger from '../utils/logger';

// Cache for TBS (in-memory)
let tbsCache: TBS[] | null = null;

/**
 * Load all TBS from local data (with caching)
 */
async function loadAllTBS(): Promise<TBS[]> {
  if (tbsCache) {
    return tbsCache;
  }

  try {
    const tbsData = await import('../data/tbs');
    tbsCache = tbsData.ALL_TBS || [];
    return tbsCache;
  } catch (error) {
    logger.error('Failed to load TBS:', error);
    return [];
  }
}

/**
 * Fetch all TBS simulations from local data
 */
export async function fetchAllTBS(): Promise<TBS[]> {
  try {
    const allTBS = await loadAllTBS();
    
    // Sort by section and title
    return [...allTBS].sort((a, b) => {
      if (a.section !== b.section) return a.section.localeCompare(b.section);
      return a.title.localeCompare(b.title);
    });
  } catch (error) {
    logger.error('Error fetching all TBS:', error);
    return [];
  }
}

/**
 * Fetch TBS simulations by exam section
 */
export async function fetchTBSBySection(section: ExamSection): Promise<TBS[]> {
  try {
    const { getTBSBySection } = await import('../data/tbs');
    return getTBSBySection(section);
  } catch (error) {
    logger.error(`Error fetching TBS for section ${section}:`, error);
    return [];
  }
}

/**
 * Fetch a single TBS by ID
 */
export async function fetchTBSById(tbsId: string): Promise<TBS | null> {
  try {
    const { getTBSById } = await import('../data/tbs');
    return getTBSById(tbsId) || null;
  } catch (error) {
    logger.error(`Error fetching TBS ${tbsId}:`, error);
    return null;
  }
}

/**
 * Get TBS statistics by section
 */
export async function getTBSStats(): Promise<{ section: ExamSection; count: number }[]> {
  try {
    const { getTBSStats: getStats } = await import('../data/tbs');
    const stats = getStats();
    
    return Object.entries(stats.bySection).map(([section, count]) => ({
      section: section as ExamSection,
      count: count as number,
    }));
  } catch (error) {
    logger.error('Error getting TBS stats:', error);
    return [];
  }
}

/**
 * Fetch TBS by type (e.g., 'journal-entry', 'document-review')
 */
export async function fetchTBSByType(type: string): Promise<TBS[]> {
  try {
    const { getTBSByType } = await import('../data/tbs');
    return getTBSByType(type as any);
  } catch (error) {
    logger.error(`Error fetching TBS by type ${type}:`, error);
    return [];
  }
}

/**
 * Search TBS by query
 */
export async function searchTBS(searchQuery: string): Promise<TBS[]> {
  try {
    const allTBS = await loadAllTBS();
    const query = searchQuery.toLowerCase();
    
    return allTBS.filter(tbs => 
      tbs.title?.toLowerCase().includes(query) ||
      tbs.scenario?.toLowerCase().includes(query) ||
      tbs.section?.toLowerCase().includes(query)
    );
  } catch (error) {
    logger.error('Error searching TBS:', error);
    return [];
  }
}

/**
 * Get total TBS count
 */
export async function getTBSCount(section?: ExamSection): Promise<number> {
  try {
    if (section) {
      const sectionTBS = await fetchTBSBySection(section);
      return sectionTBS.length;
    }
    const allTBS = await loadAllTBS();
    return allTBS.length;
  } catch (error) {
    logger.error('Error getting TBS count:', error);
    return 0;
  }
}

/**
 * Clear the TBS cache (useful for testing or forcing reload)
 */
export function clearTBSCache(): void {
  tbsCache = null;
}
