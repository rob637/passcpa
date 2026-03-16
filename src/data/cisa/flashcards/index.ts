// Flashcard Index — JSON-based
// Loads flashcards from the consolidated JSON file in content/cisa/flashcards.json

import flashcardData from '../../../../content/cisa/flashcards.json';

// Type for the JSON structure
interface Flashcard {
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
  tags?: string[];
  reference?: string;
}

interface FlashcardFile {
  $schema?: string;
  courseId: string;
  exportedAt: string;
  flashcards: Flashcard[];
}

// Cast and extract flashcards array
const allFlashcards = (flashcardData as unknown as FlashcardFile).flashcards;

// Export all flashcards
export const CISA_FLASHCARDS = allFlashcards;
export const allCisaFlashcards = allFlashcards;

// Section-specific exports (CISA has 5 domains)
export const CISA1_FLASHCARDS = allFlashcards.filter(f => f.section === 'CISA1');
export const CISA2_FLASHCARDS = allFlashcards.filter(f => f.section === 'CISA2');
export const CISA3_FLASHCARDS = allFlashcards.filter(f => f.section === 'CISA3');
export const CISA4_FLASHCARDS = allFlashcards.filter(f => f.section === 'CISA4');
export const CISA5_FLASHCARDS = allFlashcards.filter(f => f.section === 'CISA5');

// Type exports
export type { Flashcard };

// Default export
export default allFlashcards;
