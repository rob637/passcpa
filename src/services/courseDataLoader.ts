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
 * Per-section question banks are served as STATIC JSON from /public/data/
 * (synced from content/ via scripts/sync-content-to-public.cjs at build time).
 *
 * They are intentionally NOT bundled — at ~70 MB across all courses, inlining
 * them as JS chunks would bloat the build by 60+ MB. Fetching plain JSON lets
 * Firebase Hosting gzip + cache them, and skips V8 parse cost.
 */
interface SectionManifestEntry {
  section: string;
  bytes: number;
}
interface QuestionsManifest {
  courses: Record<string, { sections: SectionManifestEntry[] }>;
  generatedAt?: string;
}

const QUESTIONS_BASE = '/data/questions';
const MANIFEST_URL = `${QUESTIONS_BASE}/manifest.json`;

let manifestPromise: Promise<QuestionsManifest> | null = null;
async function loadManifest(): Promise<QuestionsManifest> {
  if (!manifestPromise) {
    manifestPromise = fetch(MANIFEST_URL, { credentials: 'same-origin' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Manifest fetch failed: ${res.status} ${res.statusText}`);
        }
        return res.json() as Promise<QuestionsManifest>;
      })
      .catch((err) => {
        manifestPromise = null;
        throw err;
      });
  }
  return manifestPromise;
}

/** Cache for loaded course data */
const dataCache = new Map<CourseId, CourseData>();

/** Cache for loaded per-section question arrays. */
const sectionQuestionsCache = new Map<string, unknown[]>();
/** In-flight fetches deduped by cacheKey. */
const sectionQuestionsInFlight = new Map<string, Promise<unknown[]>>();

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
 * Lazily load questions for a single section. Each section's JSON file is
 * fetched once from /public/data/questions/{course}/{section}.json and cached
 * in memory. Section matching is case-insensitive against the manifest.
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

  const inFlight = sectionQuestionsInFlight.get(cacheKey);
  if (inFlight) return inFlight;

  const promise = (async () => {
    let canonicalSection: string | undefined;
    try {
      const manifest = await loadManifest();
      const courseEntry = manifest.courses[courseId];
      if (!courseEntry) {
        logger.warn(`No manifest entry for course ${courseId}`);
        return [];
      }
      const sectionLower = section.toLowerCase();
      const match = courseEntry.sections.find(
        (s) => s.section.toLowerCase() === sectionLower
      );
      if (!match) {
        logger.warn(`No questions.json for ${courseId}/${section}`);
        return [];
      }
      canonicalSection = match.section;
    } catch (error) {
      logger.error(`Failed to load questions manifest:`, error);
      return [];
    }

    try {
      const url = `${QUESTIONS_BASE}/${courseId}/${canonicalSection}.json`;
      const res = await fetch(url, { credentials: 'same-origin' });
      if (!res.ok) {
        throw new Error(`Fetch ${url} -> ${res.status} ${res.statusText}`);
      }
      const raw: unknown = await res.json();
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
  })();

  sectionQuestionsInFlight.set(cacheKey, promise);
  try {
    return await promise;
  } finally {
    sectionQuestionsInFlight.delete(cacheKey);
  }
}

/**
 * Load all questions for a course (every section concatenated). This is the
 * heavyweight operation — only call from admin/audit/search code paths that
 * truly need the entire bank.
 */
export async function loadAllCourseQuestions(courseId: CourseId): Promise<unknown[]> {
  let sections: string[] = [];
  try {
    const manifest = await loadManifest();
    sections = manifest.courses[courseId]?.sections.map((s) => s.section) ?? [];
  } catch (error) {
    logger.error(`Failed to load manifest for ${courseId}:`, error);
    return [];
  }

  const results = await Promise.all(
    sections.map((s) => loadSectionQuestions(courseId, s))
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
