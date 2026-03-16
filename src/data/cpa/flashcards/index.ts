// Flashcard Index — JSON-based
// Loads flashcards from the consolidated JSON file in content/cpa/flashcards.json

import type { Flashcard as ServiceFlashcard } from '../../../services/flashcardService';
import flashcardData from '../../../../content/cpa/flashcards.json';

// Re-export types for backward compatibility
export type { ServiceFlashcard as Flashcard };
export type FlashcardType = 'definition' | 'formula' | 'mnemonic' | 'comparison' | 'concept' | 'rule';

// Type for the JSON structure
interface FlashcardFile {
  $schema?: string;
  courseId: string;
  exportedAt: string;
  flashcards: ServiceFlashcard[];
}

// Cast and extract flashcards array
const allFlashcards = (flashcardData as unknown as FlashcardFile).flashcards;

// Export all flashcards
export const CPA_FLASHCARDS = allFlashcards;
export const ALL_DEDICATED_FLASHCARDS = allFlashcards;

// Legacy exports for backward compatibility
export const ALL_DEFINITIONS = allFlashcards.filter(f => f.type === 'definition');
export const ALL_FORMULAS = allFlashcards.filter(f => f.type === 'formula');
export const ALL_MNEMONICS = allFlashcards.filter(f => f.type === 'mnemonic');

// Section-specific exports
export const FAR_FLASHCARDS = allFlashcards.filter(f => f.section === 'FAR');
export const AUD_FLASHCARDS = allFlashcards.filter(f => f.section === 'AUD');
export const REG_FLASHCARDS = allFlashcards.filter(f => f.section === 'REG');
export const BAR_FLASHCARDS = allFlashcards.filter(f => f.section === 'BAR');
export const ISC_FLASHCARDS = allFlashcards.filter(f => f.section === 'ISC');
export const TCP_FLASHCARDS = allFlashcards.filter(f => f.section === 'TCP');

// Default export
export default allFlashcards;
