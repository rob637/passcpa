/**
 * TBS Service - Firestore-based Task-Based Simulation fetching
 * Replaces static data imports from data/tbs
 */

import { collection, query, where, getDocs, doc, getDoc, orderBy, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { TBS, ExamSection } from '../types';
import logger from '../utils/logger';

// In-memory cache with TTL
interface CacheEntry {
  data: TBS[];
  timestamp: number;
}

const tbsCache: Map<string, CacheEntry> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Check if cache entry is still valid
 */
function isCacheValid(entry: CacheEntry | undefined): boolean {
  if (!entry) return false;
  return Date.now() - entry.timestamp < CACHE_TTL;
}

/**
 * Fetch all TBS simulations from Firestore
 */
export async function fetchAllTBS(): Promise<TBS[]> {
  const cacheKey = 'all';
  const cached = tbsCache.get(cacheKey);
  
  if (isCacheValid(cached)) {
    return cached!.data;
  }

  try {
    const tbsRef = collection(db, 'tbs');
    const q = query(tbsRef, orderBy('section'), orderBy('title'));
    const snapshot = await getDocs(q);
    
    const simulations: TBS[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as TBS[];
    
    tbsCache.set(cacheKey, {
      data: simulations,
      timestamp: Date.now()
    });
    
    return simulations;
  } catch (error) {
    logger.error('Error fetching TBS from Firestore:', error);
    return [];
  }
}

/**
 * Fetch TBS simulations by exam section
 */
export async function fetchTBSBySection(section: ExamSection): Promise<TBS[]> {
  const cacheKey = `section-${section}`;
  const cached = tbsCache.get(cacheKey);
  
  if (isCacheValid(cached)) {
    return cached!.data;
  }

  try {
    const tbsRef = collection(db, 'tbs');
    const q = query(
      tbsRef, 
      where('section', '==', section),
      orderBy('title')
    );
    const snapshot = await getDocs(q);
    
    const simulations: TBS[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as TBS[];
    
    tbsCache.set(cacheKey, {
      data: simulations,
      timestamp: Date.now()
    });
    
    return simulations;
  } catch (error) {
    logger.error(`Error fetching TBS for section ${section}:`, error);
    return [];
  }
}

/**
 * Fetch a single TBS by ID
 */
export async function fetchTBSById(tbsId: string): Promise<TBS | null> {
  // Check if we have it in any cache
  for (const [, entry] of tbsCache) {
    if (isCacheValid(entry)) {
      const found = entry.data.find(t => t.id === tbsId);
      if (found) return found;
    }
  }

  try {
    const tbsDoc = await getDoc(doc(db, 'tbs', tbsId));
    
    if (tbsDoc.exists()) {
      return { id: tbsDoc.id, ...tbsDoc.data() } as TBS;
    }
    
    return null;
  } catch (error) {
    logger.error(`Error fetching TBS ${tbsId}:`, error);
    return null;
  }
}

/**
 * Search TBS by title or topic
 */
export async function searchTBS(searchTerm: string): Promise<TBS[]> {
  const all = await fetchAllTBS();
  const term = searchTerm.toLowerCase();
  
  return all.filter(tbs =>
    (tbs.title || '').toLowerCase().includes(term) ||
    tbs.topic?.toLowerCase().includes(term) ||
    tbs.scenario?.toLowerCase().includes(term)
  );
}

/**
 * Get TBS stats by section
 */
export async function getTBSStats(): Promise<{ section: ExamSection; count: number }[]> {
  const all = await fetchAllTBS();
  const stats = new Map<ExamSection, number>();
  
  for (const tbs of all) {
    const count = stats.get(tbs.section) || 0;
    stats.set(tbs.section, count + 1);
  }
  
  return Array.from(stats.entries()).map(([section, count]) => ({
    section,
    count
  }));
}

/**
 * Clear the TBS cache
 */
export function clearTBSCache(): void {
  tbsCache.clear();
}

/**
 * Preload TBS for faster access
 */
export async function preloadTBS(): Promise<void> {
  await fetchAllTBS();
}

// ============================================================================
// ADMIN CRUD Operations
// ============================================================================

/**
 * Add a new TBS to Firestore
 */
export async function addTBS(tbs: Omit<TBS, 'id'>): Promise<string> {
  try {
    const tbsRef = collection(db, 'tbs');
    const docRef = await addDoc(tbsRef, {
      ...tbs,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    // Clear cache
    clearTBSCache();
    
    return docRef.id;
  } catch (error) {
    logger.error('Error adding TBS:', error);
    throw error;
  }
}

/**
 * Update an existing TBS
 */
export async function updateTBS(id: string, data: Partial<TBS>): Promise<void> {
  try {
    const tbsRef = doc(db, 'tbs', id);
    await updateDoc(tbsRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    
    // Clear cache
    clearTBSCache();
  } catch (error) {
    logger.error('Error updating TBS:', error);
    throw error;
  }
}

/**
 * Delete a TBS
 */
export async function deleteTBS(id: string): Promise<void> {
  try {
    const tbsRef = doc(db, 'tbs', id);
    await deleteDoc(tbsRef);
    
    // Clear cache
    clearTBSCache();
  } catch (error) {
    logger.error('Error deleting TBS:', error);
    throw error;
  }
}
