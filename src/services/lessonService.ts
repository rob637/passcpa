/**
 * Lesson Service
 * Fetches lessons from Firestore database
 * Supports multi-course architecture with backwards compatibility
 */

import { collection, doc, getDoc, getDocs, query, where, orderBy, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Lesson, CourseId } from '../types';
import { DEFAULT_COURSE_ID } from '../types/course';

// Cache for lessons (in-memory) - keyed by courseId
const lessonsCache: Map<CourseId, Lesson[]> = new Map();
const cacheTimestamp: Map<CourseId, number> = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch all lessons from Firestore
 * @param courseId - Optional course filter (defaults to 'cpa' for backwards compatibility)
 */
export async function fetchAllLessons(courseId: CourseId = DEFAULT_COURSE_ID): Promise<Lesson[]> {
  // Return cache if valid
  const cached = lessonsCache.get(courseId);
  const timestamp = cacheTimestamp.get(courseId) || 0;
  if (cached && Date.now() - timestamp < CACHE_DURATION) {
    return cached;
  }

  try {
    const lessonsRef = collection(db, 'lessons');
    const snapshot = await getDocs(lessonsRef);
    
    const lessons: Lesson[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as Lesson;
      // Filter by courseId - include lessons that match or have no courseId (legacy data)
      const lessonCourseId = data.courseId || DEFAULT_COURSE_ID;
      if (lessonCourseId === courseId) {
        lessons.push({ id: doc.id, ...data });
      }
    });

    // Sort by section and order
    lessons.sort((a, b) => {
      if (a.section !== b.section) {
        return a.section.localeCompare(b.section);
      }
      return (a.order || 0) - (b.order || 0);
    });

    // Update cache
    lessonsCache.set(courseId, lessons);
    cacheTimestamp.set(courseId, Date.now());

    return lessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return lessonsCache.get(courseId) || []; // Return stale cache if available
  }
}

/**
 * Fetch lessons by section
 * @param section - Exam section (e.g., 'FAR', 'AUD')
 * @param courseId - Optional course filter (defaults to 'cpa')
 */
export async function fetchLessonsBySection(section: string, courseId: CourseId = DEFAULT_COURSE_ID): Promise<Lesson[]> {
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
      const data = doc.data() as Lesson;
      const lessonCourseId = data.courseId || DEFAULT_COURSE_ID;
      if (lessonCourseId === courseId) {
        lessons.push({ id: doc.id, ...data });
      }
    });

    return lessons;
  } catch (error) {
    console.error(`Error fetching lessons for section ${section}:`, error);
    // Fallback to filtering all lessons
    const allLessons = await fetchAllLessons(courseId);
    return allLessons.filter(l => l.section.toUpperCase() === section.toUpperCase());
  }
}

/**
 * Fetch a single lesson by ID
 * @param lessonId - The lesson ID
 * @param courseId - Optional course filter for cache lookup (defaults to 'cpa')
 */
export async function fetchLessonById(lessonId: string, courseId: CourseId = DEFAULT_COURSE_ID): Promise<Lesson | null> {
  // Check cache first
  const courseCache = lessonsCache.get(courseId);
  if (courseCache) {
    const cached = courseCache.find(l => l.id === lessonId);
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
 * @param courseId - Optional course filter (defaults to 'cpa')
 */
export async function getLessonStats(courseId: CourseId = DEFAULT_COURSE_ID): Promise<{
  total: number;
  bySection: Record<string, number>;
}> {
  const lessons = await fetchAllLessons(courseId);
  
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
 * @param searchTerm - Search query
 * @param courseId - Optional course filter (defaults to 'cpa')
 */
export async function searchLessons(searchTerm: string, courseId: CourseId = DEFAULT_COURSE_ID): Promise<Lesson[]> {
  const lessons = await fetchAllLessons(courseId);
  const term = searchTerm.toLowerCase();
  
  return lessons.filter(lesson => 
    lesson.title.toLowerCase().includes(term) ||
    lesson.topics?.some(t => t.toLowerCase().includes(term))
  );
}

/**
 * Get lessons by topic
 * @param topic - Topic to filter by
 * @param courseId - Optional course filter (defaults to 'cpa')
 */
export async function fetchLessonsByTopic(topic: string, courseId: CourseId = DEFAULT_COURSE_ID): Promise<Lesson[]> {
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
      const data = doc.data() as Lesson;
      const lessonCourseId = data.courseId || DEFAULT_COURSE_ID;
      if (lessonCourseId === courseId) {
        lessons.push({ id: doc.id, ...data });
      }
    });

    return lessons;
  } catch (error) {
    console.error(`Error fetching lessons for topic ${topic}:`, error);
    const allLessons = await fetchAllLessons(courseId);
    return allLessons.filter(l => l.topics?.includes(topic));
  }
}

/**
 * Clear the lessons cache
 * @param courseId - Optional course to clear cache for, or all if not provided
 */
export function clearLessonsCache(courseId?: CourseId): void {
  if (courseId) {
    lessonsCache.delete(courseId);
    cacheTimestamp.delete(courseId);
  } else {
    lessonsCache.clear();
    cacheTimestamp.clear();
  }
}

/**
 * Preload lessons cache
 * @param courseId - Optional course to preload (defaults to 'cpa')
 */
export async function preloadLessons(courseId: CourseId = DEFAULT_COURSE_ID): Promise<void> {
  await fetchAllLessons(courseId);
}

// ============================================================================
// ADMIN CRUD Operations
// ============================================================================

/**
 * Add a new lesson to Firestore
 */
export async function addLesson(lesson: Omit<Lesson, 'id'>): Promise<string> {
  try {
    const lessonsRef = collection(db, 'lessons');
    const docRef = await addDoc(lessonsRef, {
      ...lesson,
      courseId: lesson.courseId || DEFAULT_COURSE_ID,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    // Clear cache to reflect new lesson
    clearLessonsCache(lesson.courseId || DEFAULT_COURSE_ID);
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding lesson:', error);
    throw error;
  }
}

/**
 * Update an existing lesson
 */
export async function updateLesson(id: string, data: Partial<Lesson>): Promise<void> {
  try {
    const lessonRef = doc(db, 'lessons', id);
    await updateDoc(lessonRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    
    // Clear cache to reflect updates
    clearLessonsCache();
  } catch (error) {
    console.error('Error updating lesson:', error);
    throw error;
  }
}

/**
 * Delete a lesson
 */
export async function deleteLesson(id: string): Promise<void> {
  try {
    const lessonRef = doc(db, 'lessons', id);
    await deleteDoc(lessonRef);
    
    // Clear cache
    clearLessonsCache();
  } catch (error) {
    console.error('Error deleting lesson:', error);
    throw error;
  }
}
