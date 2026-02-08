/**
 * Flashcard Service
 * 
 * Multi-course flashcard service that dynamically loads flashcards for any exam.
 * Mirrors the pattern used in questionService for consistency.
 */

import { CourseId } from '../types/course';

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
 * Load flashcards for a specific section
 */
export async function getFlashcardsBySection(section: string, courseId?: CourseId): Promise<Flashcard[]> {
  const cacheKey = `${courseId || 'all'}-${section}`;
  
  if (flashcardCache[cacheKey]) {
    return flashcardCache[cacheKey];
  }
  
  let flashcards: Flashcard[] = [];
  
  try {
    // Determine course from section if not provided
    const effectiveCourse = courseId || getCourseFromSection(section);
    
    switch (effectiveCourse) {
      case 'cpa': {
        const cpaData = await import('../data/cpa/flashcards');
        flashcards = normalizeFlashcards(cpaData.getFlashcardsBySection(section));
        break;
      }
      case 'ea': {
        const eaData = await import('../data/ea/flashcards');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allEa = (eaData.ALL_EA_FLASHCARDS || []) as any[];
        flashcards = normalizeFlashcards(allEa.filter(f => f.section === section));
        break;
      }
      case 'cma': {
        const cmaData = await import('../data/cma/flashcards');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allCma = (cmaData.ALL_CMA_FLASHCARDS || []) as any[];
        flashcards = normalizeFlashcards(allCma.filter(f => f.section === section));
        break;
      }
      case 'cia': {
        const ciaData = await import('../data/cia/flashcards');
        flashcards = normalizeFlashcards(ciaData.getCIAFlashcardsBySection(section as 'CIA1' | 'CIA2' | 'CIA3'));
        break;
      }
      case 'cisa': {
        const cisaData = await import('../data/cisa/flashcards');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allCisa = (cisaData.allCisaFlashcards || cisaData.default || []) as any[];
        flashcards = normalizeFlashcards(allCisa.filter(f => f.section === section || f.domain === section));
        break;
      }
      case 'cfp': {
        const cfpData = await import('../data/cfp/flashcards');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allCfp = (cfpData.CFP_FLASHCARDS || cfpData.default || []) as any[];
        // CFP uses domain-based sections like CFP-GEN, CFP-TAX, etc.
        // Map to domain: CFP-GEN -> GEN
        const domain = section.replace('CFP-', '');
        flashcards = normalizeFlashcards(allCfp.filter(f => 
          f.section === section || f.section === domain || f.domain === section || f.domain === domain
        ));
        break;
      }
      default:
        flashcards = [];
    }
  } catch (error) {
    console.error(`Failed to load flashcards for section ${section}:`, error);
    flashcards = [];
  }
  
  // Cache the result
  flashcardCache[cacheKey] = flashcards;
  return flashcards;
}

/**
 * Load all flashcards for a course
 */
export async function getFlashcardsByCourse(courseId: CourseId): Promise<Flashcard[]> {
  const cacheKey = `${courseId}-all`;
  
  if (flashcardCache[cacheKey]) {
    return flashcardCache[cacheKey];
  }
  
  let flashcards: Flashcard[] = [];
  
  try {
    switch (courseId) {
      case 'cpa': {
        const cpaData = await import('../data/cpa/flashcards');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        flashcards = normalizeFlashcards((cpaData.ALL_DEDICATED_FLASHCARDS || cpaData.CPA_FLASHCARDS || []) as any[]);
        break;
      }
      case 'ea': {
        const eaData = await import('../data/ea/flashcards');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        flashcards = normalizeFlashcards((eaData.ALL_EA_FLASHCARDS || []) as any[]);
        break;
      }
      case 'cma': {
        const cmaData = await import('../data/cma/flashcards');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        flashcards = normalizeFlashcards((cmaData.ALL_CMA_FLASHCARDS || []) as any[]);
        break;
      }
      case 'cia': {
        const ciaData = await import('../data/cia/flashcards');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        flashcards = normalizeFlashcards((ciaData.ALL_CIA_FLASHCARDS || ciaData.default || []) as any[]);
        break;
      }
      case 'cisa': {
        const cisaData = await import('../data/cisa/flashcards');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        flashcards = normalizeFlashcards((cisaData.allCisaFlashcards || cisaData.default || []) as any[]);
        break;
      }
      case 'cfp': {
        const cfpData = await import('../data/cfp/flashcards');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        flashcards = normalizeFlashcards((cfpData.CFP_FLASHCARDS || cfpData.default || []) as any[]);
        break;
      }
      default:
        flashcards = [];
    }
  } catch (error) {
    console.error(`Failed to load flashcards for course ${courseId}:`, error);
    flashcards = [];
  }
  
  flashcardCache[cacheKey] = flashcards;
  return flashcards;
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
 * Determine course from section ID
 */
function getCourseFromSection(section: string): CourseId {
  // CPA sections
  if (['FAR', 'AUD', 'REG', 'BEC', 'BAR', 'ISC', 'TCP', 'PREP'].includes(section)) {
    return 'cpa';
  }
  // EA sections
  if (['SEE1', 'SEE2', 'SEE3'].includes(section)) {
    return 'ea';
  }
  // CMA sections
  if (['CMA1', 'CMA2'].includes(section)) {
    return 'cma';
  }
  // CIA sections
  if (['CIA1', 'CIA2', 'CIA3'].includes(section)) {
    return 'cia';
  }
  // CISA sections
  if (['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'].includes(section)) {
    return 'cisa';
  }
  // CFP sections
  if (section.startsWith('CFP-') || ['GEN', 'RET', 'TAX', 'INV', 'RISK', 'EST', 'PRO', 'PSY', 'CFP-PCR', 'CFP-GEN', 'CFP-RISK', 'CFP-INV', 'CFP-TAX', 'CFP-RET', 'CFP-EST', 'CFP-PSY'].includes(section)) {
    return 'cfp';
  }
  
  // Default to CPA
  return 'cpa';
}

/**
 * Clear the flashcard cache
 */
export function clearFlashcardCache(): void {
  Object.keys(flashcardCache).forEach(key => delete flashcardCache[key]);
}
