/**
 * Lesson Service - Local-first approach
 * Lessons are stored in TypeScript files for fast loading and offline support.
 * Firebase is used only for user progress tracking, not lesson content.
 */

import { Lesson, CourseId } from '../types';
import { DEFAULT_COURSE_ID } from '../types/course';
import logger from '../utils/logger';

// Cache for lessons (in-memory)
let lessonsCache: Lesson[] | null = null;

/**
 * Load all lessons from local data (with caching)
 */
async function loadLessons(): Promise<Lesson[]> {
  if (lessonsCache) {
    return lessonsCache;
  }

  try {
    const { getAllLessons } = await import('../data/cpa/lessons');
    lessonsCache = getAllLessons();
    return lessonsCache;
  } catch (error) {
    logger.error('Failed to load lessons:', error);
    return [];
  }
}

/**
 * Fetch all lessons from local data
 * @param courseId - Optional course filter (defaults to 'cpa' for backwards compatibility)
 */
export async function fetchAllLessons(courseId: CourseId = DEFAULT_COURSE_ID): Promise<Lesson[]> {
  try {
    const allLessons = await loadLessons();
    
    // Filter by courseId if needed
    const filtered = allLessons.filter(lesson => {
      const lessonCourseId = lesson.courseId || DEFAULT_COURSE_ID;
      return lessonCourseId === courseId;
    });

    // Sort by section and order
    filtered.sort((a, b) => {
      if (a.section !== b.section) {
        return a.section.localeCompare(b.section);
      }
      return (a.order || 0) - (b.order || 0);
    });

    return filtered;
  } catch (error) {
    logger.error('Error fetching lessons:', error);
    return [];
  }
}

/**
 * Fetch lessons by section
 * @param section - Exam section (e.g., 'FAR', 'AUD')
 * @param courseId - Optional course filter (defaults to 'cpa')
 */
export async function fetchLessonsBySection(section: string, courseId: CourseId = DEFAULT_COURSE_ID): Promise<Lesson[]> {
  try {
    const { getLessonsBySection } = await import('../data/cpa/lessons');
    const lessons = getLessonsBySection(section.toUpperCase());
    
    // Filter by courseId
    return lessons.filter(lesson => {
      const lessonCourseId = lesson.courseId || DEFAULT_COURSE_ID;
      return lessonCourseId === courseId;
    });
  } catch (error) {
    logger.error(`Error fetching lessons for section ${section}:`, error);
    return [];
  }
}

/**
 * Fetch a single lesson by ID
 * @param lessonId - The lesson ID
 */
export async function fetchLessonById(lessonId: string): Promise<Lesson | null> {
  try {
    const { getLessonById } = await import('../data/cpa/lessons');
    return getLessonById(lessonId) || null;
  } catch (error) {
    logger.error(`Error fetching lesson ${lessonId}:`, error);
    return null;
  }
}

/**
 * Get lesson statistics
 * @param _courseId - Optional course filter (reserved for future use)
 */
export async function getLessonStats(_courseId: CourseId = DEFAULT_COURSE_ID): Promise<{
  total: number;
  bySection: Record<string, number>;
  byDifficulty: Record<string, number>;
}> {
  try {
    const { getLessonStats: getStats } = await import('../data/cpa/lessons');
    const stats = getStats();
    
    // If _courseId filtering needed, we'd need to filter here
    // For now, return the full stats since most content is for 'cpa' course
    return {
      total: stats.total,
      bySection: stats.bySection,
      byDifficulty: { easy: 0, medium: 0, hard: 0 }, // Lessons don't have difficulty currently
    };
  } catch (error) {
    logger.error('Error getting lesson stats:', error);
    return { total: 0, bySection: {}, byDifficulty: {} };
  }
}

/**
 * Fetch lessons by topic
 * @param topic - The topic to filter by
 * @param courseId - Optional course filter
 */
export async function fetchLessonsByTopic(topic: string, courseId: CourseId = DEFAULT_COURSE_ID): Promise<Lesson[]> {
  try {
    const allLessons = await fetchAllLessons(courseId);
    return allLessons.filter(lesson => 
      lesson.topics?.some(t => t.toLowerCase().includes(topic.toLowerCase())) ||
      lesson.title?.toLowerCase().includes(topic.toLowerCase())
    );
  } catch (error) {
    logger.error(`Error fetching lessons for topic ${topic}:`, error);
    return [];
  }
}

/**
 * Search lessons by query
 * @param searchQuery - Search string
 * @param courseId - Optional course filter
 */
export async function searchLessons(searchQuery: string, courseId: CourseId = DEFAULT_COURSE_ID): Promise<Lesson[]> {
  try {
    const allLessons = await fetchAllLessons(courseId);
    const query = searchQuery.toLowerCase();
    
    return allLessons.filter(lesson => 
      lesson.title?.toLowerCase().includes(query) ||
      lesson.topics?.some(t => t.toLowerCase().includes(query)) ||
      lesson.description?.toLowerCase().includes(query)
    );
  } catch (error) {
    logger.error(`Error searching lessons:`, error);
    return [];
  }
}

/**
 * Clear the lesson cache (useful for testing or forcing reload)
 */
export function clearLessonCache(): void {
  lessonsCache = null;
}
