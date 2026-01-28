/**
 * Lesson Service
 * Fetches lessons from Firestore database
 */

import { collection, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Lesson } from '../types';

// Cache for lessons (in-memory)
let lessonsCache: Lesson[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch all lessons from Firestore
 */
export async function fetchAllLessons(): Promise<Lesson[]> {
  // Return cache if valid
  if (lessonsCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return lessonsCache;
  }

  try {
    const lessonsRef = collection(db, 'lessons');
    const snapshot = await getDocs(lessonsRef);
    
    const lessons: Lesson[] = [];
    snapshot.forEach((doc) => {
      lessons.push({ id: doc.id, ...doc.data() } as Lesson);
    });

    // Sort by section and order
    lessons.sort((a, b) => {
      if (a.section !== b.section) {
        return a.section.localeCompare(b.section);
      }
      return (a.order || 0) - (b.order || 0);
    });

    // Update cache
    lessonsCache = lessons;
    cacheTimestamp = Date.now();

    return lessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return lessonsCache || []; // Return stale cache if available
  }
}

/**
 * Fetch lessons by section
 */
export async function fetchLessonsBySection(section: string): Promise<Lesson[]> {
  try {
    const lessonsRef = collection(db, 'lessons');
    const q = query(
      lessonsRef,
      where('section', '==', section.toUpperCase()),
      orderBy('order', 'asc')
    );
    
    const snapshot = await getDocs(q);
    const lessons: Lesson[] = [];
    
    snapshot.forEach((doc) => {
      lessons.push({ id: doc.id, ...doc.data() } as Lesson);
    });

    return lessons;
  } catch (error) {
    console.error(`Error fetching lessons for section ${section}:`, error);
    // Fallback to filtering all lessons
    const allLessons = await fetchAllLessons();
    return allLessons.filter(l => l.section.toUpperCase() === section.toUpperCase());
  }
}

/**
 * Fetch a single lesson by ID
 */
export async function fetchLessonById(lessonId: string): Promise<Lesson | null> {
  // Check cache first
  if (lessonsCache) {
    const cached = lessonsCache.find(l => l.id === lessonId);
    if (cached) return cached;
  }

  try {
    const lessonRef = doc(db, 'lessons', lessonId);
    const snapshot = await getDoc(lessonRef);
    
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Lesson;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching lesson ${lessonId}:`, error);
    return null;
  }
}

/**
 * Get lesson stats from cached data
 */
export async function getLessonStats(): Promise<{
  total: number;
  bySection: Record<string, number>;
}> {
  const lessons = await fetchAllLessons();
  
  const bySection: Record<string, number> = {};
  lessons.forEach(lesson => {
    const section = lesson.section.toUpperCase();
    bySection[section] = (bySection[section] || 0) + 1;
  });

  return {
    total: lessons.length,
    bySection
  };
}

/**
 * Search lessons by title or topics
 */
export async function searchLessons(searchTerm: string): Promise<Lesson[]> {
  const lessons = await fetchAllLessons();
  const term = searchTerm.toLowerCase();
  
  return lessons.filter(lesson => 
    lesson.title.toLowerCase().includes(term) ||
    lesson.topics?.some(t => t.toLowerCase().includes(term))
  );
}

/**
 * Get lessons by topic
 */
export async function fetchLessonsByTopic(topic: string): Promise<Lesson[]> {
  try {
    const lessonsRef = collection(db, 'lessons');
    const q = query(
      lessonsRef,
      where('topics', 'array-contains', topic),
      orderBy('order', 'asc')
    );
    
    const snapshot = await getDocs(q);
    const lessons: Lesson[] = [];
    
    snapshot.forEach((doc) => {
      lessons.push({ id: doc.id, ...doc.data() } as Lesson);
    });

    return lessons;
  } catch (error) {
    console.error(`Error fetching lessons for topic ${topic}:`, error);
    const allLessons = await fetchAllLessons();
    return allLessons.filter(l => l.topics?.includes(topic));
  }
}

/**
 * Clear the lessons cache
 */
export function clearLessonsCache(): void {
  lessonsCache = null;
  cacheTimestamp = 0;
}

/**
 * Preload lessons cache
 */
export async function preloadLessons(): Promise<void> {
  await fetchAllLessons();
}
