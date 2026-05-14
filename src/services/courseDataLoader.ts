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

/**
 * Per-section question JSON discovered at build time. Each becomes its own
 * lazily-loaded chunk so users only download the section they're studying
 * instead of the entire 6-section, 30+ MB course bundle.
 */
interface SectionQuestionFile {
  default: { questions?: unknown[] } | unknown[];
}
const sectionQuestionModules = import.meta.glob<SectionQuestionFile>(
  '../../content/*/*/questions.json',
  { eager: false }
);

/** Cache for loaded course data */
const dataCache = new Map<CourseId, CourseData>();

/** Cache for loaded per-section question arrays. */
const sectionQuestionsCache = new Map<string, unknown[]>();

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

/**
 * Lazily load questions for a single section. Each section's JSON file is its
 * own dynamically-imported chunk — opening "FAR" no longer drags AUD/REG/BAR/
 * ISC/TCP into the same bundle.
 *
 * Section is matched case-insensitively against the on-disk content directory.
 *
 * @example
 *   const farQuestions = await loadSectionQuestions('cpa', 'FAR');
 */
export async function loadSectionQuestions(
  courseId: CourseId,
  section: string
): Promise<unknown[]> {
  const cacheKey = `${courseId}/${section}`;
  const cached = sectionQuestionsCache.get(cacheKey);
  if (cached) return cached;

  const sectionLower = section.toLowerCase();
  // Find the matching file path; section directory may be lowercase ("cisa1")
  // or mixed case ("CFP-RET"), so compare case-insensitively.
  const matchedKey = Object.keys(sectionQuestionModules).find(key => {
    const m = key.match(/\.\.\/\.\.\/content\/([^/]+)\/([^/]+)\/questions\.json$/);
    if (!m) return false;
    const [, course, sec] = m;
    return course === courseId && sec.toLowerCase() === sectionLower;
  });

  if (!matchedKey) {
    logger.warn(`No questions.json found for ${courseId}/${section}`);
    sectionQuestionsCache.set(cacheKey, []);
    return [];
  }

  try {
    const mod = await sectionQuestionModules[matchedKey]();
    const raw = mod.default;
    let items: unknown[] = [];
    if (Array.isArray(raw)) items = raw;
    else if (raw && typeof raw === 'object' && Array.isArray((raw as { questions?: unknown[] }).questions)) {
      items = (raw as { questions: unknown[] }).questions;
    }
    sectionQuestionsCache.set(cacheKey, items);
    return items;
  } catch (error) {
    logger.error(`Failed to load section questions for ${courseId}/${section}:`, error);
    return [];
  }
}

/**
 * Load all questions for a course (every section concatenated). This is the
 * heavyweight operation — only call from admin/audit/search code paths that
 * truly need the entire bank.
 */
export async function loadAllCourseQuestions(courseId: CourseId): Promise<unknown[]> {
  const sectionKeys = Object.keys(sectionQuestionModules)
    .map(key => {
      const m = key.match(/\.\.\/\.\.\/content\/([^/]+)\/([^/]+)\/questions\.json$/);
      return m && m[1] === courseId ? m[2] : null;
    })
    .filter((s): s is string => !!s);

  const results = await Promise.all(
    sectionKeys.map(s => loadSectionQuestions(courseId, s))
  );
  return results.flat();
}

/**
 * Clear cached section questions.
 * @param courseId - Optional. Clear all sections of a course, or all caches if omitted.
 */
export function clearSectionQuestionsCache(courseId?: CourseId): void {
  if (!courseId) {
    sectionQuestionsCache.clear();
    return;
  }
  for (const key of Array.from(sectionQuestionsCache.keys())) {
    if (key.startsWith(`${courseId}/`)) sectionQuestionsCache.delete(key);
  }
}
