// Offline Question Cache Service
// Caches questions in IndexedDB for offline practice

const DB_NAME = 'passcpa-offline';
const DB_VERSION = 1;
const QUESTIONS_STORE = 'questions';
const TBS_STORE = 'tbs';
const META_STORE = 'meta';

let dbInstance = null;

/**
 * Open/create the IndexedDB database
 */
async function openDB() {
  if (dbInstance) return dbInstance;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

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
 * Cache questions for offline use
 */
export async function cacheQuestions(questions) {
  const db = await openDB();
  const tx = db.transaction(QUESTIONS_STORE, 'readwrite');
  const store = tx.objectStore(QUESTIONS_STORE);

  for (const question of questions) {
    store.put(question);
  }

  await new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
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
export async function cacheTBS(tbsList) {
  const db = await openDB();
  const tx = db.transaction(TBS_STORE, 'readwrite');
  const store = tx.objectStore(TBS_STORE);

  for (const tbs of tbsList) {
    store.put(tbs);
  }

  await new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });

  await updateMeta('tbs_cached_at', Date.now());
  await updateMeta('tbs_count', tbsList.length);

  return tbsList.length;
}

/**
 * Get cached questions with optional filters
 */
export async function getCachedQuestions(options = {}) {
  const { section, topic, difficulty, count = 10 } = options;

  const db = await openDB();
  const tx = db.transaction(QUESTIONS_STORE, 'readonly');
  const store = tx.objectStore(QUESTIONS_STORE);

  return new Promise((resolve, reject) => {
    const questions = [];
    let cursor;

    if (section) {
      cursor = store.index('section').openCursor(IDBKeyRange.only(section));
    } else {
      cursor = store.openCursor();
    }

    cursor.onsuccess = (event) => {
      const result = event.target.result;

      if (result && questions.length < count * 2) {
        const q = result.value;

        // Apply filters
        if (topic && q.topic !== topic) {
          result.continue();
          return;
        }
        if (difficulty && q.difficulty !== difficulty) {
          result.continue();
          return;
        }

        questions.push(q);
        result.continue();
      } else {
        // Shuffle and limit
        const shuffled = questions.sort(() => Math.random() - 0.5);
        resolve(shuffled.slice(0, count));
      }
    };

    cursor.onerror = () => reject(cursor.error);
  });
}

/**
 * Get cached TBS
 */
export async function getCachedTBS(section = null) {
  const db = await openDB();
  const tx = db.transaction(TBS_STORE, 'readonly');
  const store = tx.objectStore(TBS_STORE);

  return new Promise((resolve, reject) => {
    const tbsList = [];
    let cursor;

    if (section) {
      cursor = store.index('section').openCursor(IDBKeyRange.only(section));
    } else {
      cursor = store.openCursor();
    }

    cursor.onsuccess = (event) => {
      const result = event.target.result;
      if (result) {
        tbsList.push(result.value);
        result.continue();
      } else {
        resolve(tbsList);
      }
    };

    cursor.onerror = () => reject(cursor.error);
  });
}

/**
 * Update metadata
 */
async function updateMeta(key, value) {
  const db = await openDB();
  const tx = db.transaction(META_STORE, 'readwrite');
  const store = tx.objectStore(META_STORE);

  store.put({ key, value, updatedAt: Date.now() });

  return new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Get metadata
 */
export async function getMeta(key) {
  const db = await openDB();
  const tx = db.transaction(META_STORE, 'readonly');
  const store = tx.objectStore(META_STORE);

  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result?.value);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Get cache status
 */
export async function getCacheStatus() {
  try {
    const questionsCount = (await getMeta('questions_count')) || 0;
    const tbsCount = (await getMeta('tbs_count')) || 0;
    const questionsCachedAt = await getMeta('questions_cached_at');
    const tbsCachedAt = await getMeta('tbs_cached_at');

    return {
      isAvailable: questionsCount > 0,
      questions: {
        count: questionsCount,
        cachedAt: questionsCachedAt ? new Date(questionsCachedAt) : null,
      },
      tbs: {
        count: tbsCount,
        cachedAt: tbsCachedAt ? new Date(tbsCachedAt) : null,
      },
    };
  } catch (error) {
    return {
      isAvailable: false,
      error: error.message,
    };
  }
}

/**
 * Clear all cached data
 */
export async function clearCache() {
  const db = await openDB();

  const tx = db.transaction([QUESTIONS_STORE, TBS_STORE, META_STORE], 'readwrite');

  tx.objectStore(QUESTIONS_STORE).clear();
  tx.objectStore(TBS_STORE).clear();
  tx.objectStore(META_STORE).clear();

  return new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Check if offline mode is active
 */
export function isOffline() {
  return !navigator.onLine;
}

/**
 * Subscribe to online/offline status changes
 */
export function subscribeToNetworkStatus(callback) {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}
