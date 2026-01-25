// Offline Question Cache Service
// Caches questions in IndexedDB for offline practice

import { Question } from '../types';

const DB_NAME = 'passcpa-offline';
const DB_VERSION = 1;
const QUESTIONS_STORE = 'questions';
const TBS_STORE = 'tbs';
const META_STORE = 'meta';

let dbInstance: IDBDatabase | null = null;

/**
 * Open/create the IndexedDB database
 */
async function openDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Questions store
      if (!db.objectStoreNames.contains(QUESTIONS_STORE)) {
        const questionsStore = db.createObjectStore(QUESTIONS_STORE, { keyPath: 'id' });
        questionsStore.createIndex('section', 'section', { unique: false });
        questionsStore.createIndex('topic', 'topic', { unique: false });
        questionsStore.createIndex('difficulty', 'difficulty', { unique: false });
      }

      // TBS store
      if (!db.objectStoreNames.contains(TBS_STORE)) {
        const tbsStore = db.createObjectStore(TBS_STORE, { keyPath: 'id' });
        tbsStore.createIndex('section', 'section', { unique: false });
      }

      // Metadata store
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: 'key' });
      }
    };
  });
}

/**
 * Update metadata
 */
async function updateMeta(key: string, value: any) {
  const db = await openDB();
  const tx = db.transaction(META_STORE, 'readwrite');
  const store = tx.objectStore(META_STORE);
  store.put({ key, value });
}

/**
 * Cache questions for offline use
 */
export async function cacheQuestions(questions: Question[]): Promise<number> {
  const db = await openDB();
  const tx = db.transaction(QUESTIONS_STORE, 'readwrite');
  const store = tx.objectStore(QUESTIONS_STORE);

  for (const question of questions) {
    store.put(question);
  }

  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });

  // Update cache metadata
  await updateMeta('questions_cached_at', Date.now());
  await updateMeta('questions_count', questions.length);

  return questions.length;
}

/**
 * Cache TBS for offline use
 */
export async function cacheTBS(tbsList: any[]): Promise<number> {
  const db = await openDB();
  const tx = db.transaction(TBS_STORE, 'readwrite');
  const store = tx.objectStore(TBS_STORE);

  for (const tbs of tbsList) {
    store.put(tbs);
  }

  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });

  await updateMeta('tbs_cached_at', Date.now());
  await updateMeta('tbs_count', tbsList.length);

  return tbsList.length;
}

interface QuestionFilters {
  section?: string;
  topic?: string;
  difficulty?: string;
  limit?: number;
}

/**
 * Get cached questions with optional filters
 */
export async function getCachedQuestions(filters: QuestionFilters = {}): Promise<Question[]> {
  const db = await openDB();
  const tx = db.transaction(QUESTIONS_STORE, 'readonly');
  const store = tx.objectStore(QUESTIONS_STORE);
  
  // Use index if filtering by one property
  let request;
  if (filters.section) {
    const index = store.index('section');
    request = index.getAll(filters.section);
  } else if (filters.topic) {
    const index = store.index('topic');
    request = index.getAll(filters.topic);
  } else {
    request = store.getAll();
  }

  const result = await new Promise<Question[]>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  // Apply remaining filters in memory
  let filtered = result;
  
  if (filters.difficulty) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filtered = filtered.filter(q => (q as any).type === 'mcq' && (q as any).difficulty === filters.difficulty);
  }

  if (filters.limit) {
    return filtered.slice(0, filters.limit);
  }

  return filtered;
}

/**
 * Get cache status
 */
export async function getCacheStatus() {
  const db = await openDB();
  const tx = db.transaction(META_STORE, 'readonly');
  const store = tx.objectStore(META_STORE);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const result = request.result;
      const status: Record<string, any> = {};
      result.forEach((item: any) => {
        status[item.key] = item.value;
      });
      resolve(status);
    };
    request.onerror = () => reject(request.error);
  });
}

/**
 * Clear cache
 */
export async function clearCache() {
  const db = await openDB();
  const tx = db.transaction([QUESTIONS_STORE, TBS_STORE, META_STORE], 'readwrite');
  
  tx.objectStore(QUESTIONS_STORE).clear();
  tx.objectStore(TBS_STORE).clear();
  tx.objectStore(META_STORE).clear();

  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export default {
  cacheQuestions,
  cacheTBS,
  getCachedQuestions,
  getCacheStatus,
  clearCache,
};
