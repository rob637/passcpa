// Flashcard Index — JSON-based
// Loads flashcards from the consolidated JSON file in content/cma/flashcards.json

import flashcardData from '../../../../content/cma/flashcards.json';

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
  imaReference?: string;
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
export const CMA_FLASHCARDS = allFlashcards;
export const ALL_CMA_FLASHCARDS = allFlashcards;

// Section-specific exports
export const CMA1_FLASHCARDS = allFlashcards.filter(f => f.section === 'CMA1');
export const CMA2_FLASHCARDS = allFlashcards.filter(f => f.section === 'CMA2');

// Type exports
export type { Flashcard };

// Default export
export default allFlashcards;
