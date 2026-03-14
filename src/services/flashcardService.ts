/**
 * Flashcard Service
 *
 * Multi-course flashcard service that loads flashcards from JSON files.
 * Flashcards are stored in content/{course}/flashcards.json
 */

import { CourseId } from '../types/course';
import logger from '../utils/logger';
import { DEFAULT_COURSE_ID } from '../types/course';
import { COURSES } from '../courses';

// Common flashcard interface that all course flashcards must conform to
export interface Flashcard {
  id: string;
  courseId?: string;
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
  skillLevel?: string;
}

interface FlashcardFile {
  $schema?: string;
  courseId: string;
  exportedAt?: string;
  flashcards: Flashcard[];
}

// Cache for loaded flashcards
const flashcardCache: Record<string, Flashcard[]> = {};

// Dynamic import for JSON files
const flashcardModules = import.meta.glob<FlashcardFile>(
  '/content/*/flashcards.json',
  { eager: false }
);

/**
 * Load all flashcards for a course from JSON (with caching).
 */
export async function getFlashcardsByCourse(courseId: CourseId): Promise<Flashcard[]> {
  const cacheKey = `${courseId}-all`;

  if (flashcardCache[cacheKey]) {
    return flashcardCache[cacheKey];
  }

  try {
    const key = `/content/${courseId}/flashcards.json`;
    const loader = flashcardModules[key];
    
    if (!loader) {
      logger.warn(`No flashcard file found for course ${courseId}`);
      return [];
    }
    
    const data = await loader();
    const flashcards = data.flashcards || [];
    
    flashcardCache[cacheKey] = flashcards;
    return flashcards;
  } catch (error) {
    logger.error(`Failed to load flashcards for course ${courseId}:`, error);
    return [];
  }
}

/**
 * Load flashcards for a specific section.
 * Loads all course flashcards then filters by section.
 * Use 'ALL' to get all flashcards for the course (single-exam courses like CISA, CFP).
 */
export async function getFlashcardsBySection(section: string, courseId?: CourseId): Promise<Flashcard[]> {
  const effectiveCourse = courseId || getCourseFromSection(section);
  const cacheKey = `${effectiveCourse}-${section}`;

  if (flashcardCache[cacheKey]) {
    return flashcardCache[cacheKey];
  }

  try {
    const all = await getFlashcardsByCourse(effectiveCourse);

    // 'ALL' returns all flashcards for the course (used by single-exam courses)
    if (section.toUpperCase() === 'ALL') {
      flashcardCache[cacheKey] = all;
      return all;
    }

    // Single-exam courses: if section matches the course name (e.g., 'CISA' for cisa course),
    // return all flashcards since the individual flashcards use domain sections like 'CISA1', 'CISA2'
    const sectionUpper = section.toUpperCase();
    const courseUpper = effectiveCourse.toUpperCase();
    if (sectionUpper === courseUpper) {
      flashcardCache[cacheKey] = all;
      return all;
    }

    // Normalize section matching: CFP-GEN → GEN, CISA-1 → 1, etc.
    const domain = section.replace(/^(CFP|CISA|CMA|CIA|EA)-?/i, '');

    const flashcards = all.filter(f => {
      const fSection = f.section?.toUpperCase();
      const fBlueprint = f.blueprintArea?.toUpperCase();
      const sectionCheck = section.toUpperCase();
      const domainUpper = domain.toUpperCase();
      
      return fSection === sectionCheck ||
        fSection === domainUpper ||
        fBlueprint === sectionCheck ||
        fBlueprint === domainUpper ||
        // Also match if section starts with the domain (e.g., 'CISA1' starts with 'CISA1')
        fSection?.startsWith(sectionCheck) ||
        sectionCheck.startsWith(fSection || '');
    });

    flashcardCache[cacheKey] = flashcards;
    return flashcards;
  } catch (error) {
    logger.error(`Failed to load flashcards for section ${section}:`, error);
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
