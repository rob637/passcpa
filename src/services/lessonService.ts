/**
 * Lesson Service - Local-first approach
 * Lessons are stored in TypeScript files for fast loading and offline support.
 * Firebase is used only for user progress tracking, not lesson content.
 *
 * Uses the generic courseDataLoader — no per-course switches needed.
 */

import { Lesson, CourseId } from '../types';
import { DEFAULT_COURSE_ID } from '../types/course';
import logger from '../utils/logger';
import { loadCourseData } from './courseDataLoader';

// Cache for lessons per course (in-memory)
const lessonsCacheByCore: Map<CourseId, Lesson[]> = new Map();

/**
 * Load lessons for a specific course from local data (with caching).
 * Uses COURSE_DATA — no per-course switch/case needed.
 * All courses (including CFP) now export standard Lesson[] from their data files.
 */
async function loadLessonsForCourse(courseId: CourseId): Promise<Lesson[]> {
  const cached = lessonsCacheByCore.get(courseId);
  if (cached) return cached;

  try {
    const courseData = await loadCourseData(courseId);
    const lessons = courseData.lessons as Lesson[];

    lessonsCacheByCore.set(courseId, lessons);
    return lessons;
  } catch (error) {
    logger.error(`Failed to load lessons for course ${courseId}:`, error);
    return [];
  }
}

/**
 * Fetch all lessons from local data
 * @param courseId - Optional course filter (defaults to 'cpa' for backwards compatibility)
 */
export async function fetchAllLessons(courseId: CourseId = DEFAULT_COURSE_ID): Promise<Lesson[]> {
  try {
    const lessons = await loadLessonsForCourse(courseId);

    // Sort by section and order
    const sorted = [...lessons].sort((a, b) => {
      if (a.section !== b.section) {
        return a.section.localeCompare(b.section);
      }
      return (a.order || 0) - (b.order || 0);
    });

    return sorted;
  } catch (error) {
    logger.error('Error fetching lessons:', error);
    return [];
  }
}

/**
 * Fetch lessons by section
 * @param section - Exam section (e.g., 'FAR', 'AUD', 'CMA1', 'SEE1')
 * @param courseId - Course filter (defaults to 'cpa')
 */
export async function fetchLessonsBySection(section: string, courseId: CourseId = DEFAULT_COURSE_ID): Promise<Lesson[]> {
  try {
    const lessons = await loadLessonsForCourse(courseId);
    const upperSection = section.toUpperCase();
    
    // Filter by section, domain (CFP uses domain instead of section), or blueprintArea prefix
    return lessons.filter(lesson => {
      const l = lesson as Lesson & { domain?: string };
      return (
        l.section?.toUpperCase() === upperSection ||
        l.domain?.toUpperCase() === upperSection ||
        l.blueprintArea?.toUpperCase().startsWith(upperSection)
      );
    });
  } catch (error) {
    logger.error(`Error fetching lessons for section ${section}:`, error);
    return [];
  }
}

/**
 * Fetch a single lesson by ID
 * @param lessonId - The lesson ID
 * @param courseId - Optional course hint (will search if not found)
 */
export async function fetchLessonById(lessonId: string, courseId?: CourseId): Promise<Lesson | null> {
  try {
    // If courseId provided, search that course first
    if (courseId) {
      const lessons = await loadLessonsForCourse(courseId);
      const found = lessons.find(l => l.id === lessonId);
      if (found) return found;
    }
    
    // Search all courses if not found or no courseId provided
    const { COURSES } = await import('../courses');
    const allCourses = Object.keys(COURSES) as CourseId[];
    for (const course of allCourses) {
      if (course === courseId) continue; // Already searched
      const lessons = await loadLessonsForCourse(course);
      const found = lessons.find(l => l.id === lessonId);
      if (found) return found;
    }
    
    return null;
  } catch (error) {
    logger.error(`Error fetching lesson ${lessonId}:`, error);
    return null;
  }
}

/**
 * Get lesson statistics
 * @param courseId - Course to get stats for
 */
export async function getLessonStats(courseId: CourseId = DEFAULT_COURSE_ID): Promise<{
  total: number;
  bySection: Record<string, number>;
  byDifficulty: Record<string, number>;
}> {
  try {
    const lessons = await loadLessonsForCourse(courseId);
    
    const bySection: Record<string, number> = {};
    const byDifficulty: Record<string, number> = { easy: 0, medium: 0, hard: 0 };
    
    for (const lesson of lessons) {
      // Count by section
      const section = lesson.section || 'unknown';
      bySection[section] = (bySection[section] || 0) + 1;
      
      // Count by difficulty if available
      if (lesson.difficulty) {
        byDifficulty[lesson.difficulty] = (byDifficulty[lesson.difficulty] || 0) + 1;
      }
    }
    
    return {
      total: lessons.length,
      bySection,
      byDifficulty,
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
 * @param courseId - Optional: clear cache for specific course only
 */
export function clearLessonCache(courseId?: CourseId): void {
  if (courseId) {
    lessonsCacheByCore.delete(courseId);
  } else {
    lessonsCacheByCore.clear();
  }
}
