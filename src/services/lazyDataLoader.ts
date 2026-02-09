/**
 * Lazy Course Data Loader
 * 
 * Provides dynamic imports for course content to reduce initial bundle size.
 * Content is loaded on-demand when a user accesses a specific course.
 */

import { CourseId } from '../types/course';
import { Question, Lesson } from '../types';

// Generic types for content that varies by course
type CourseContent = unknown[];

// Cache for loaded course data
const dataCache: Record<string, CourseContent> = {};

/**
 * Lazy load questions for a specific course
 */
export async function loadCourseQuestions(courseId: CourseId): Promise<Question[]> {
  const cacheKey = `questions-${courseId}`;
  if (dataCache[cacheKey]) {
    return dataCache[cacheKey] as Question[];
  }

  let questions: Question[] = [];

  try {
    switch (courseId) {
      case 'cpa': {
        const module = await import('../data/cpa/questions');
        questions = module.ALL_QUESTIONS || [];
        break;
      }
      case 'ea': {
        const module = await import('../data/ea');
        questions = (module as { EA_ALL_QUESTIONS?: Question[] }).EA_ALL_QUESTIONS || [];
        break;
      }
      case 'cma': {
        const module = await import('../data/cma/questions');
        questions = (module as { CMA_ALL_QUESTIONS?: Question[] }).CMA_ALL_QUESTIONS || [];
        break;
      }
      case 'cia': {
        const module = await import('../data/cia/questions');
        questions = (module as { CIA_QUESTIONS?: Question[] }).CIA_QUESTIONS || [];
        break;
      }
      case 'cisa': {
        const module = await import('../data/cisa/questions');
        questions = (module as { getAllCISAQuestions?: () => Question[] }).getAllCISAQuestions?.() || [];
        break;
      }
      case 'cfp': {
        const module = await import('../data/cfp/questions');
        questions = (module as { CFP_ALL_QUESTIONS?: Question[] }).CFP_ALL_QUESTIONS || [];
        break;
      }
    }
  } catch (error) {
    console.error(`Failed to load questions for ${courseId}:`, error);
  }

  dataCache[cacheKey] = questions;
  return questions;
}

/**
 * Lazy load lessons for a specific course
 */
export async function loadCourseLessons(courseId: CourseId): Promise<Lesson[]> {
  const cacheKey = `lessons-${courseId}`;
  if (dataCache[cacheKey]) {
    return dataCache[cacheKey] as Lesson[];
  }

  let lessons: Lesson[] = [];

  try {
    switch (courseId) {
      case 'cpa': {
        const module = await import('../data/cpa/lessons');
        // Try both possible export names
        lessons = (module as { ALL_LESSONS?: Lesson[]; getAllLessons?: () => Lesson[] }).ALL_LESSONS || 
                  (module as { getAllLessons?: () => Lesson[] }).getAllLessons?.() || [];
        break;
      }
      case 'ea': {
        // EA lessons are exported from individual files, use main index
        const module = await import('../data/ea');
        lessons = (module as { EA_ALL_LESSONS?: Lesson[] }).EA_ALL_LESSONS || [];
        break;
      }
      case 'cma': {
        const module = await import('../data/cma/lessons');
        // lessons/index.ts exports as 'cmaLessons' (default) and named
        lessons = (module as { cmaLessons?: Lesson[]; default?: Lesson[] }).cmaLessons || module.default || [];
        break;
      }
      case 'cia': {
        const module = await import('../data/cia/lessons');
        lessons = (module as { CIA_ALL_LESSONS?: Lesson[] }).CIA_ALL_LESSONS || [];
        break;
      }
      case 'cisa': {
        const module = await import('../data/cisa/lessons');
        lessons = (module as { CISA_ALL_LESSONS?: Lesson[] }).CISA_ALL_LESSONS || [];
        break;
      }
      case 'cfp': {
        const module = await import('../data/cfp/lessons');
        lessons = ((module as unknown) as { ALL_CFP_LESSONS?: Lesson[] }).ALL_CFP_LESSONS || [];
        break;
      }
    }
  } catch (error) {
    console.error(`Failed to load lessons for ${courseId}:`, error);
  }

  dataCache[cacheKey] = lessons;
  return lessons;
}

/**
 * Lazy load flashcards for a specific course
 */
export async function loadCourseFlashcards(courseId: CourseId): Promise<unknown[]> {
  const cacheKey = `flashcards-${courseId}`;
  if (dataCache[cacheKey]) {
    return dataCache[cacheKey];
  }

  let flashcards: unknown[] = [];

  try {
    switch (courseId) {
      case 'cpa': {
        const module = await import('../data/cpa/flashcards');
        flashcards = (module as { CPA_FLASHCARDS?: unknown[] }).CPA_FLASHCARDS || [];
        break;
      }
      case 'ea': {
        const module = await import('../data/ea/flashcards');
        // Use available export (SEE1_FLASHCARDS, etc.)
        flashcards = Object.values(module).flat().filter(Array.isArray) as unknown[];
        break;
      }
      case 'cma': {
        const module = await import('../data/cma/flashcards');
        // Load ALL flashcards (Part 1 + Part 2)
        flashcards = (module as { ALL_CMA_FLASHCARDS?: unknown[] }).ALL_CMA_FLASHCARDS || [];
        break;
      }
      case 'cia': {
        const module = await import('../data/cia/flashcards');
        flashcards = (module as { CIA1_FLASHCARDS?: unknown[] }).CIA1_FLASHCARDS || [];
        break;
      }
      case 'cisa': {
        const module = await import('../data/cisa/flashcards');
        flashcards = Object.values(module).flat().filter(Array.isArray) as unknown[];
        break;
      }
      case 'cfp': {
        const module = await import('../data/cfp/flashcards');
        flashcards = (module as { CFP_FLASHCARDS?: unknown[] }).CFP_FLASHCARDS || [];
        break;
      }
    }
  } catch (error) {
    console.error(`Failed to load flashcards for ${courseId}:`, error);
  }

  dataCache[cacheKey] = flashcards;
  return flashcards;
}

/**
 * Lazy load TBS/simulations for a specific course
 */
export async function loadCourseTBS(courseId: CourseId): Promise<unknown[]> {
  const cacheKey = `tbs-${courseId}`;
  if (dataCache[cacheKey]) {
    return dataCache[cacheKey];
  }

  let tbs: unknown[] = [];

  try {
    switch (courseId) {
      case 'cpa': {
        const module = await import('../data/cpa/tbs');
        tbs = module.ALL_TBS || [];
        break;
      }
      // Other courses may not have TBS - will return empty array
      default:
        break;
    }
  } catch (error) {
    console.error(`Failed to load TBS for ${courseId}:`, error);
  }

  dataCache[cacheKey] = tbs;
  return tbs;
}

/**
 * Preload all content for a course (useful when user selects a course)
 */
export async function preloadCourseContent(courseId: CourseId): Promise<void> {
  await Promise.all([
    loadCourseQuestions(courseId),
    loadCourseLessons(courseId),
    loadCourseFlashcards(courseId),
    loadCourseTBS(courseId),
  ]);
}

/**
 * Clear cached data for a course (useful for memory management)
 */
export function clearCourseCache(courseId?: CourseId): void {
  if (courseId) {
    Object.keys(dataCache)
      .filter(key => key.endsWith(`-${courseId}`))
      .forEach(key => delete dataCache[key]);
  } else {
    Object.keys(dataCache).forEach(key => delete dataCache[key]);
  }
}

/**
 * Get cache status
 */
export function getCacheStatus(): { loaded: string[]; itemCount: number } {
  const loaded = Object.keys(dataCache);
  const itemCount = Object.values(dataCache).reduce((sum: number, arr) => {
    return sum + (Array.isArray(arr) ? arr.length : 0);
  }, 0);
  
  return {
    loaded,
    itemCount,
  };
}
