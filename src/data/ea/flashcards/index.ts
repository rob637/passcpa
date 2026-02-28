// Flashcard Index — JSON-based
// Loads flashcards from the consolidated JSON file in content/ea/flashcards.json

import flashcardData from '../../../../content/ea/flashcards.json';

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
export const EA_FLASHCARDS = allFlashcards;
export const ALL_EA_FLASHCARDS = allFlashcards;

// Section-specific exports (EA uses SEE1, SEE2, SEE3)
export const SEE1_FLASHCARDS = allFlashcards.filter(f => f.section === 'SEE1');
export const SEE2_FLASHCARDS = allFlashcards.filter(f => f.section === 'SEE2');
export const SEE3_FLASHCARDS = allFlashcards.filter(f => f.section === 'SEE3');

// Type exports
export type { Flashcard };

// Default export
export default allFlashcards;
