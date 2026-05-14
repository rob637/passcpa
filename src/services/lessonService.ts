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

// Cache for lessons per course (in-memory)
const lessonsCacheByCore: Map<CourseId, Lesson[]> = new Map();

/**
 * Vite-discovered lesson modules. We import lessons directly (NOT via the
 * generic courseDataLoader / COURSE_DATA aggregator) because COURSE_DATA also
 * statically imports questions, TBS, flashcards and mock-exams - which can
 * easily total 30 MB+ per course and would otherwise be pulled in just to
 * render lesson metadata on the Home dashboard.
 */
const lessonModules = import.meta.glob<{
  default?: Lesson[] | Record<string, Lesson[]>;
  getAllLessons?: () => Lesson[];
}>(
  '../data/*/lessons/index.ts',
  { eager: false }
);

/**
 * Per-section JSON loaders. Each lesson JSON file becomes its own dynamic
 * chunk so that fetching a single section (the common dashboard / daily-plan
 * path) doesn't pull every other section's lesson markdown into memory.
 *
 * The previous behaviour bundled every JSON for a course into one ~4 MB chunk
 * the moment any lesson was requested.
 */
const lessonJsonModules = import.meta.glob<{ default: Lesson[] }>(
  '../data/*/lessons/json/*.json',
  { eager: false }
);

/**
 * Manifest mapping section -> JSON files containing that section's lessons.
 * Some files (e.g. `cia-batch3.json`) contain lessons spanning multiple
 * sections; those files appear under each applicable section and we filter
 * by `lesson.section` after loading.
 *
 * Generated from on-disk content; update if lesson JSONs are renamed.
 */
const LESSON_SECTION_FILES: Partial<Record<CourseId, Record<string, string[]>>> = {
  cpa: {
    AUD: ['aud.json'],
    BAR: ['bar.json'],
    FAR: ['far.json', 'far-batch2.json'],
    ISC: ['isc.json'],
    PREP: ['prep.json'],
    REG: ['reg.json'],
    TCP: ['tcp.json'],
  },
  ea: {
    SEE1: ['see1.json', 'see1-batch2.json'],
    SEE2: ['see2.json'],
    SEE3: ['see3.json'],
  },
  cma: {
    CMA1: ['cma1-a.json', 'cma1-b.json', 'cma1-c.json', 'cma1-d.json', 'cma1-e.json', 'cma1-f.json'],
    CMA2: ['cma2-a.json', 'cma2-b.json', 'cma2-c.json', 'cma2-d.json', 'cma2-e.json', 'cma2-f.json'],
  },
  cisa: {
    CISA1: ['cisa1.json', 'cisa1-batch2.json', 'cisa1-batch3.json', 'cisa1-batch4.json'],
    CISA2: ['cisa2.json', 'cisa2-batch2.json', 'cisa2-batch3.json'],
    CISA3: ['cisa3.json', 'cisa3-batch2.json', 'cisa3-batch3.json'],
    CISA4: ['cisa4.json', 'cisa4-batch2.json', 'cisa4-batch3.json'],
    CISA5: ['cisa5.json', 'cisa5-batch2.json', 'cisa5-batch3.json'],
  },
  cia: {
    CIA1: ['cia1.json', 'cia1-batch2.json', 'cia1-batch3.json', 'cia1-batch4.json', 'cia1-batch5.json', 'cia1-batch-v3.json', 'cia-batch3.json', 'cia-batch4.json', 'cia-batch5.json', 'gias-2024.json'],
    CIA2: ['cia2.json', 'cia2-batch2.json', 'cia2-batch3.json', 'cia2-batch4.json', 'cia2-batch5.json', 'cia2-batch-v3.json', 'cia2-domain-iii.json', 'cia-batch3.json', 'cia-batch4.json', 'cia-batch5.json', 'cia-missing.json'],
    CIA3: ['cia3.json', 'cia3-batch2.json', 'cia3-batch3.json', 'cia3-batch4.json', 'cia3-batch5.json', 'cia3-batch-v3.json', 'cia-batch3.json', 'cia-batch4.json', 'cia-batch5.json', 'cia-missing.json'],
  },
  cfp: {
    'CFP-EST': ['est-advanced.json', 'est-batch2.json', 'est-documents.json', 'est-taxation.json', 'est-transfers.json'],
    'CFP-GEN': ['gen-batch2.json', 'gen-economic.json', 'gen-education.json', 'gen-financial-statements.json', 'gen-time-value.json'],
    'CFP-INV': ['inv-batch2.json', 'inv-portfolio.json', 'inv-theory.json', 'inv-vehicles.json'],
    'CFP-PCR': ['pcr-batch2.json', 'pro-fiduciary.json', 'pro-regulations.json', 'pro-standards.json'],
    'CFP-PSY': ['psy-batch2.json', 'psy-behavioral.json', 'psy-counseling.json'],
    'CFP-RET': ['ret-advanced.json', 'ret-batch2.json', 'ret-employer.json', 'ret-executive.json', 'ret-individual.json', 'ret-needs.json', 'ret-special.json'],
    'CFP-RISK': ['ris-fundamentals.json', 'ris-health.json', 'ris-life.json', 'ris-property.json', 'risk-batch2.json'],
    'CFP-TAX': ['tax-advanced.json', 'tax-batch2.json', 'tax-fundamentals.json', 'tax-strategies.json'],
  },
};

// Per-section cache so we never re-parse the same JSON twice per session.
const sectionLessonCache: Map<string, Lesson[]> = new Map();

/**
 * Resolve the canonical manifest section key for a given user-supplied
 * section string. Handles case differences and the CFP "CFP-XYZ" prefix
 * that some study-plan code already strips.
 */
function resolveManifestSectionKey(courseId: CourseId, section: string): string | null {
  const manifest = LESSON_SECTION_FILES[courseId];
  if (!manifest) return null;
  const upper = section.toUpperCase();
  if (manifest[upper]) return upper;
  // CFP study plan sometimes passes 'GEN', 'INV' etc. without the CFP- prefix.
  if (courseId === 'cfp') {
    const prefixed = `CFP-${upper}`;
    if (manifest[prefixed]) return prefixed;
  }
  return null;
}

/**
 * Load only the JSON files needed for one section. Returns null if the
 * section isn't in the manifest (caller should fall back to the full load).
 */
async function loadSectionLessons(courseId: CourseId, section: string): Promise<Lesson[] | null> {
  const key = resolveManifestSectionKey(courseId, section);
  if (!key) return null;

  const cacheKey = `${courseId}::${key}`;
  const cached = sectionLessonCache.get(cacheKey);
  if (cached) return cached;

  const files = LESSON_SECTION_FILES[courseId]![key];
  const upper = key.toUpperCase();

  const chunks = await Promise.all(
    files.map(async (fname) => {
      const modKey = `../data/${courseId}/lessons/json/${fname}`;
      const loader = lessonJsonModules[modKey];
      if (!loader) {
        logger.warn(`Lesson JSON not found at ${modKey}`);
        return [] as Lesson[];
      }
      try {
        const mod = await loader();
        const data = (mod && 'default' in mod ? mod.default : mod) as Lesson[] | undefined;
        return Array.isArray(data) ? data : [];
      } catch (e) {
        logger.error(`Failed to load lesson JSON ${modKey}:`, e);
        return [] as Lesson[];
      }
    })
  );

  // Cross-section files (e.g. cia-batch3.json contains CIA1+CIA2+CIA3) get
  // filtered down to the requested section here, mirroring the legacy filter
  // in fetchLessonsBySection().
  const filtered = chunks.flat().filter((l) => {
    const sec = (l as Lesson & { section?: string }).section?.toUpperCase();
    return sec === upper || sec?.startsWith(upper + '-');
  });

  sectionLessonCache.set(cacheKey, filtered);
  return filtered;
}

/**
 * Load lessons for a specific course from local data (with caching).
 * Loads ONLY the lessons module - not the rest of COURSE_DATA - so the
 * Home/daily-plan flow stays small.
 */
async function loadLessonsForCourse(courseId: CourseId): Promise<Lesson[]> {
  const cached = lessonsCacheByCore.get(courseId);
  if (cached) return cached;

  try {
    const key = `../data/${courseId}/lessons/index.ts`;
    const loader = lessonModules[key];
    if (!loader) {
      logger.warn(`No lessons module found for course "${courseId}" at ${key}`);
      return [];
    }
    const mod = await loader();
    // Different courses export different shapes:
    //   - cpa: default = Record<string, Lesson[]>, also exports getAllLessons()
    //   - others: default = Lesson[]
    let lessons: Lesson[] = [];
    if (typeof mod.getAllLessons === 'function') {
      lessons = mod.getAllLessons();
    } else if (Array.isArray(mod.default)) {
      lessons = mod.default;
    } else if (mod.default && typeof mod.default === 'object') {
      lessons = Object.values(mod.default).flat();
    }

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
 * @param section - Exam section (e.g., 'FAR', 'AUD', 'CMA1', 'SEE1') or 'ALL' for all sections
 * @param courseId - Course filter (defaults to 'cpa')
 */
export async function fetchLessonsBySection(section: string, courseId: CourseId = DEFAULT_COURSE_ID): Promise<Lesson[]> {
  try {
    const upperSection = section.toUpperCase();

    // 'ALL' and full-exam queries (CFP/CISA root) need every lesson — fall
    // through to loadLessonsForCourse below.
    const isAllQuery = upperSection === 'ALL';
    const isFullExamQuery = (courseId === 'cfp' && upperSection === 'CFP') ||
                            (courseId === 'cisa' && upperSection === 'CISA');

    if (!isAllQuery && !isFullExamQuery) {
      // Fast path: load ONLY the JSON files for this section. Each becomes
      // its own dynamic chunk, so the dashboard / daily-plan flow downloads
      // ~10x less than the legacy "load entire course" path.
      const sectionLessons = await loadSectionLessons(courseId, section);
      if (sectionLessons) {
        return [...sectionLessons].sort((a, b) => (a.order || 0) - (b.order || 0));
      }
    }

    const lessons = await loadLessonsForCourse(courseId);

    // 'ALL' returns all lessons for the course (used by single-exam courses like CISA, CFP)
    if (isAllQuery) {
      return lessons.sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    // Full-exam courses (CFP, CISA): when querying by course code, return all lessons
    // These courses have subsections (CFP-GEN, CISA1) but study plans use the course code
    if (isFullExamQuery) {
      return lessons.sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    // Filter by section, domain (CFP uses domain instead of section), or blueprintArea prefix
    // Also match if lesson's section starts with the requested section (e.g., CFP-GEN starts with CFP)
    const filtered = lessons.filter(lesson => {
      const l = lesson as Lesson & { domain?: string };
      return (
        l.section?.toUpperCase() === upperSection ||
        l.section?.toUpperCase().startsWith(upperSection + '-') ||
        l.domain?.toUpperCase() === upperSection ||
        l.blueprintArea?.toUpperCase().startsWith(upperSection)
      );
    });

    // Sort by order field to ensure consistent display
    return filtered.sort((a, b) => (a.order || 0) - (b.order || 0));
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
