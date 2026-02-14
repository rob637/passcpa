/**
 * Flashcard Service
 *
 * Multi-course flashcard service. Uses the generic courseDataLoader —
 * no per-course switch/case statements needed. Adding a new course requires
 * only a COURSE_DATA export with a flashcards array.
 */

import { CourseId } from '../types/course';
import { DEFAULT_COURSE_ID } from '../types/course';
import { COURSES } from '../courses';
import { loadCourseData } from './courseDataLoader';

// Common flashcard interface that all course flashcards must conform to
export interface Flashcard {
  id: string;
  section: string;
  type: string;
  topic: string;
  subtopic?: string;
  blueprintArea?: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  example?: string;
  formula?: string;
  mnemonic?: string;
  comparison?: unknown; // Different exams have different comparison shapes
  tags?: string[];
  reference?: string;
}

// Cache for loaded flashcards
const flashcardCache: Record<string, Flashcard[]> = {};

// Helper to normalize flashcards to common interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeFlashcards(flashcards: any[]): Flashcard[] {
  return flashcards.map(card => ({
    id: card.id || `card-${Math.random().toString(36).slice(2)}`,
    section: card.section || card.domain || '',
    type: card.type || 'concept',
    topic: card.topic || card.blueprintArea || card.domain || '',
    subtopic: card.subtopic,
    blueprintArea: card.blueprintArea || card.domain,
    front: card.front || card.question || '',
    back: card.back || card.answer || '',
    difficulty: card.difficulty || 'medium',
    example: card.example,
    formula: card.formula,
    mnemonic: card.mnemonic,
    comparison: card.comparison,
    tags: card.tags,
    reference: card.reference,
  }));
}

/**
 * Load all flashcards for a course (with caching + normalization).
 * Uses COURSE_DATA — no per-course switch/case needed.
 */
export async function getFlashcardsByCourse(courseId: CourseId): Promise<Flashcard[]> {
  const cacheKey = `${courseId}-all`;

  if (flashcardCache[cacheKey]) {
    return flashcardCache[cacheKey];
  }

  try {
    const courseData = await loadCourseData(courseId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flashcards = normalizeFlashcards((courseData.flashcards || []) as any[]);
    flashcardCache[cacheKey] = flashcards;
    return flashcards;
  } catch (error) {
    console.error(`Failed to load flashcards for course ${courseId}:`, error);
    return [];
  }
}

/**
 * Load flashcards for a specific section.
 * Loads all course flashcards then filters by section.
 */
export async function getFlashcardsBySection(section: string, courseId?: CourseId): Promise<Flashcard[]> {
  const effectiveCourse = courseId || getCourseFromSection(section);
  const cacheKey = `${effectiveCourse}-${section}`;

  if (flashcardCache[cacheKey]) {
    return flashcardCache[cacheKey];
  }

  try {
    const all = await getFlashcardsByCourse(effectiveCourse);

    // Normalize section matching: CFP-GEN → GEN, etc.
    const domain = section.replace(/^CFP-/, '');

    const flashcards = all.filter(f =>
      f.section === section ||
      f.section === domain ||
      f.blueprintArea === section ||
      f.blueprintArea === domain
    );

    flashcardCache[cacheKey] = flashcards;
    return flashcards;
  } catch (error) {
    console.error(`Failed to load flashcards for section ${section}:`, error);
    return [];
  }
}

/**
 * Get flashcard statistics for a course
 */
export async function getFlashcardStats(courseId: CourseId): Promise<{
  total: number;
  bySection: Record<string, number>;
  byType: Record<string, number>;
  byDifficulty: Record<string, number>;
}> {
  const flashcards = await getFlashcardsByCourse(courseId);
  
  const bySection: Record<string, number> = {};
  const byType: Record<string, number> = {};
  const byDifficulty: Record<string, number> = {};
  
  flashcards.forEach(card => {
    bySection[card.section] = (bySection[card.section] || 0) + 1;
    byType[card.type] = (byType[card.type] || 0) + 1;
    byDifficulty[card.difficulty] = (byDifficulty[card.difficulty] || 0) + 1;
  });
  
  return {
    total: flashcards.length,
    bySection,
    byType,
    byDifficulty,
  };
}

/**
 * Determine course from section ID by looking up the course registry.
 * Zero-touch: new courses are discovered automatically from COURSES config.
 */
function getCourseFromSection(section: string): CourseId {
  const upperSection = section.toUpperCase();
  for (const [courseId, course] of Object.entries(COURSES)) {
    if (course.sections?.some(s => s.id === upperSection || s.shortName === upperSection)) {
      return courseId as CourseId;
    }
  }
  // CFP uses domain-prefixed sections (CFP-GEN, CFP-TAX) and short domains (GEN, TAX)
  // Check if section matches a prefix pattern
  for (const [courseId, course] of Object.entries(COURSES)) {
    const prefix = courseId.toUpperCase();
    if (section.toUpperCase().startsWith(`${prefix}-`)) {
      return courseId as CourseId;
    }
    // Check if any blueprint area matches
    if (course.sections?.some(s =>
      s.blueprintAreas?.some(ba => ba.id === section || ba.id === upperSection)
    )) {
      return courseId as CourseId;
    }
  }
  return DEFAULT_COURSE_ID;
}

/**
 * Clear the flashcard cache
 */
export function clearFlashcardCache(): void {
  Object.keys(flashcardCache).forEach(key => delete flashcardCache[key]);
}
