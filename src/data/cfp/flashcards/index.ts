// Flashcard Index — JSON-based
// Loads flashcards from the consolidated JSON file in content/cfp/flashcards.json

import flashcardData from '../../../../content/cfp/flashcards.json';

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
export const CFP_FLASHCARDS = allFlashcards;
export const ALL_CFP_FLASHCARDS = allFlashcards;

// Section-specific exports (CFP has 8 domains)
export const CFP_GEN_FLASHCARDS = allFlashcards.filter(f => f.section === 'CFP-GEN' || f.blueprintArea === 'CFP-GEN');
export const CFP_RET_FLASHCARDS = allFlashcards.filter(f => f.section === 'CFP-RET' || f.blueprintArea === 'CFP-RET');
export const CFP_TAX_FLASHCARDS = allFlashcards.filter(f => f.section === 'CFP-TAX' || f.blueprintArea === 'CFP-TAX');
export const CFP_INV_FLASHCARDS = allFlashcards.filter(f => f.section === 'CFP-INV' || f.blueprintArea === 'CFP-INV');
export const CFP_RISK_FLASHCARDS = allFlashcards.filter(f => f.section === 'CFP-RISK' || f.blueprintArea === 'CFP-RISK');
export const CFP_EST_FLASHCARDS = allFlashcards.filter(f => f.section === 'CFP-EST' || f.blueprintArea === 'CFP-EST');
export const CFP_PRO_FLASHCARDS = allFlashcards.filter(f => f.section === 'CFP-PRO' || f.blueprintArea === 'CFP-PRO');
export const CFP_PSY_FLASHCARDS = allFlashcards.filter(f => f.section === 'CFP-PSY' || f.blueprintArea === 'CFP-PSY');

// Type exports
export type { Flashcard };

// Default export
export default allFlashcards;
