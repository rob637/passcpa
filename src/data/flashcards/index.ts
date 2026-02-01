// Flashcard Data - Central export for all dedicated flashcard content
// These supplement the question-based flashcards with dedicated study material

export * from './types';
export * from './definitions';
export * from './formulas';
export * from './mnemonics';

import { Flashcard } from './types';
import { ALL_DEFINITIONS } from './definitions';
import { ALL_FORMULAS } from './formulas';
import { ALL_MNEMONICS } from './mnemonics';

// Combined collection of all dedicated flashcards
export const ALL_DEDICATED_FLASHCARDS: Flashcard[] = [
  ...ALL_DEFINITIONS,
  ...ALL_FORMULAS,
  ...ALL_MNEMONICS,
];

// Get flashcards by section
export const getFlashcardsBySection = (section: string): Flashcard[] => {
  return ALL_DEDICATED_FLASHCARDS.filter(card => card.section === section);
};

// Get flashcards by type
export const getFlashcardsByType = (type: string): Flashcard[] => {
  return ALL_DEDICATED_FLASHCARDS.filter(card => card.type === type);
};

// Get flashcards by difficulty
export const getFlashcardsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Flashcard[] => {
  return ALL_DEDICATED_FLASHCARDS.filter(card => card.difficulty === difficulty);
};

// Get flashcards by blueprint area
export const getFlashcardsByBlueprintArea = (blueprintArea: string): Flashcard[] => {
  return ALL_DEDICATED_FLASHCARDS.filter(card => card.blueprintArea === blueprintArea);
};

// Statistics
export const getFlashcardStats = () => ({
  total: ALL_DEDICATED_FLASHCARDS.length,
  bySection: {
    FAR: getFlashcardsBySection('FAR').length,
    AUD: getFlashcardsBySection('AUD').length,
    REG: getFlashcardsBySection('REG').length,
    BAR: getFlashcardsBySection('BAR').length,
    ISC: getFlashcardsBySection('ISC').length,
    TCP: getFlashcardsBySection('TCP').length,
  },
  byType: {
    definition: getFlashcardsByType('definition').length,
    formula: getFlashcardsByType('formula').length,
    mnemonic: getFlashcardsByType('mnemonic').length,
    comparison: getFlashcardsByType('comparison').length,
    concept: getFlashcardsByType('concept').length,
    rule: getFlashcardsByType('rule').length,
  },
  byDifficulty: {
    easy: getFlashcardsByDifficulty('easy').length,
    medium: getFlashcardsByDifficulty('medium').length,
    hard: getFlashcardsByDifficulty('hard').length,
  },
});

export default ALL_DEDICATED_FLASHCARDS;
