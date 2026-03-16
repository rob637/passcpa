// Flashcard Index — JSON-based
// Loads flashcards from the consolidated JSON file in content/cia/flashcards.json

import flashcardData from '../../../../content/cia/flashcards.json';

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
export const CIA_FLASHCARDS = allFlashcards;
export const ALL_CIA_FLASHCARDS = allFlashcards;

// Section-specific exports
export const CIA1_FLASHCARDS = allFlashcards.filter(f => f.section === 'CIA1');
export const CIA2_FLASHCARDS = allFlashcards.filter(f => f.section === 'CIA2');
export const CIA3_FLASHCARDS = allFlashcards.filter(f => f.section === 'CIA3');

// Type exports
export type { Flashcard };

// Default export
export default allFlashcards;
