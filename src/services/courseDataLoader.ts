/**
 * Generic Course Data Loader
 *
 * Zero-touch dynamic loader for course content. Uses Vite's import.meta.glob
 * to auto-discover all course data modules at build time. Adding a new course
 * requires ONLY creating src/data/{course}/index.ts with a COURSE_DATA export.
 *
 * Replaces the per-course switch/case statements that previously existed in
 * lessonService.ts, flashcardService.ts, examService.ts, and lazyDataLoader.ts.
 */

import type { CourseData } from '../types/courseData';
import type { CourseId } from '../types/course';
import logger from '../utils/logger';

/**
 * Vite discovers all course data modules at build time.
 * Each must export `COURSE_DATA: CourseData`.
 * New modules are auto-discovered — no manual registration needed.
 */
const courseModules = import.meta.glob<{ COURSE_DATA: CourseData }>(
  '../data/*/index.ts',
  { eager: false }
);

/** Cache for loaded course data */
const dataCache = new Map<CourseId, CourseData>();

/**
 * Load course data by courseId. Returns cached data if available.
 *
 * @example
 * const data = await loadCourseData('cpa');
 * console.log(data.questions.length); // 6203
 */
export async function loadCourseData(courseId: CourseId): Promise<CourseData> {
  const cached = dataCache.get(courseId);
  if (cached) return cached;

  const key = `../data/${courseId}/index.ts`;
  const loader = courseModules[key];

  if (!loader) {
    const available = getAvailableDataModules();
    throw new Error(
      `No data module found for course "${courseId}". ` +
      `Expected: src/data/${courseId}/index.ts exporting COURSE_DATA. ` +
      `Available modules: ${available.join(', ')}`
    );
  }

  try {
    const mod = await loader();
    const data = mod.COURSE_DATA;

    if (!data) {
      throw new Error(
        `Module src/data/${courseId}/index.ts does not export COURSE_DATA`
      );
    }

    dataCache.set(courseId, data);
    return data;
  } catch (error) {
    logger.error(`Failed to load course data for "${courseId}":`, error);
    throw error;
  }
}

/**
 * Get the list of course IDs that have data modules (auto-discovered at build time).
 * Useful for validating courseIds or iterating over all courses.
 */
export function getAvailableDataModules(): string[] {
  return Object.keys(courseModules)
    .map(key => {
      const match = key.match(/\.\.\/data\/([^/]+)\/index\.ts$/);
      return match ? match[1] : '';
    })
    .filter(Boolean);
}

/**
 * Clear cached course data.
 * @param courseId - Clear specific course, or all if omitted.
 */
export function clearCourseDataCache(courseId?: CourseId): void {
  if (courseId) {
    dataCache.delete(courseId);
  } else {
    dataCache.clear();
  }
}
