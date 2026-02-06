/**
 * EA Flashcards - Central Export and Utilities
 * 
 * Provides access to all EA flashcard decks with helper functions
 * for filtering by section, type, topic, and difficulty.
 */

import { EAFlashcard, EAFlashcardDeck, EAFlashcardType, EASection } from './types';

// SEE1 - Individuals
import { SEE1_DEFINITIONS } from './see1-definitions';
import { SEE1_FORMULAS } from './see1-formulas';
import { SEE1_MNEMONICS } from './see1-mnemonics';

// SEE2 - Businesses
import { SEE2_DEFINITIONS } from './see2-definitions';
import { SEE2_FORMULAS } from './see2-formulas';
import { SEE2_MNEMONICS } from './see2-mnemonics';

// SEE3 - Representation
import { SEE3_DEFINITIONS } from './see3-definitions';
import { SEE3_FORMULAS } from './see3-formulas';
import { SEE3_MNEMONICS } from './see3-mnemonics';

import { EXPANSION_FLASHCARDS } from './expansion';

// ============================================
// Combined Flashcard Arrays by Section
// ============================================

export const SEE1_FLASHCARDS: EAFlashcard[] = [
  ...SEE1_DEFINITIONS,
  ...SEE1_FORMULAS,
  ...SEE1_MNEMONICS,
  ...EXPANSION_FLASHCARDS.filter(c => c.section === 'SEE1'),
];

export const SEE2_FLASHCARDS: EAFlashcard[] = [
  ...SEE2_DEFINITIONS,
  ...SEE2_FORMULAS,
  ...SEE2_MNEMONICS,
  ...EXPANSION_FLASHCARDS.filter(c => c.section === 'SEE2'),
];

export const SEE3_FLASHCARDS: EAFlashcard[] = [
  ...SEE3_DEFINITIONS,
  ...SEE3_FORMULAS,
  ...SEE3_MNEMONICS,
  ...EXPANSION_FLASHCARDS.filter(c => c.section === 'SEE3'),
];

// ============================================
// All Flashcards Combined
// ============================================

export const ALL_EA_FLASHCARDS: EAFlashcard[] = [
  ...SEE1_FLASHCARDS,
  ...SEE2_FLASHCARDS,
  ...SEE3_FLASHCARDS,
];

// ============================================
// Pre-built Decks
// ============================================

export const EA_FLASHCARD_DECKS: EAFlashcardDeck[] = [
  // SEE1 Decks
  {
    id: 'see1-definitions',
    name: 'SEE1: Key Definitions',
    description: 'Essential terms and concepts for Individual Taxation',
    section: 'SEE1',
    cards: SEE1_DEFINITIONS,
    totalCards: SEE1_DEFINITIONS.length,
  },
  {
    id: 'see1-formulas',
    name: 'SEE1: Formulas & Calculations',
    description: 'Tax calculation formulas for individuals',
    section: 'SEE1',
    cards: SEE1_FORMULAS,
    totalCards: SEE1_FORMULAS.length,
  },
  {
    id: 'see1-mnemonics',
    name: 'SEE1: Memory Aids',
    description: 'Mnemonics and memory tricks for Individual Taxation',
    section: 'SEE1',
    cards: SEE1_MNEMONICS,
    totalCards: SEE1_MNEMONICS.length,
  },
  {
    id: 'see1-all',
    name: 'SEE1: Complete Deck',
    description: 'All Individual Taxation flashcards',
    section: 'SEE1',
    cards: SEE1_FLASHCARDS,
    totalCards: SEE1_FLASHCARDS.length,
  },
  // SEE2 Decks
  {
    id: 'see2-definitions',
    name: 'SEE2: Key Definitions',
    description: 'Essential terms and concepts for Business Taxation',
    section: 'SEE2',
    cards: SEE2_DEFINITIONS,
    totalCards: SEE2_DEFINITIONS.length,
  },
  {
    id: 'see2-formulas',
    name: 'SEE2: Formulas & Calculations',
    description: 'Business tax calculation formulas',
    section: 'SEE2',
    cards: SEE2_FORMULAS,
    totalCards: SEE2_FORMULAS.length,
  },
  {
    id: 'see2-mnemonics',
    name: 'SEE2: Memory Aids',
    description: 'Mnemonics and memory tricks for Business Taxation',
    section: 'SEE2',
    cards: SEE2_MNEMONICS,
    totalCards: SEE2_MNEMONICS.length,
  },
  {
    id: 'see2-all',
    name: 'SEE2: Complete Deck',
    description: 'All Business Taxation flashcards',
    section: 'SEE2',
    cards: SEE2_FLASHCARDS,
    totalCards: SEE2_FLASHCARDS.length,
  },
  // SEE3 Decks
  {
    id: 'see3-definitions',
    name: 'SEE3: Key Definitions',
    description: 'Essential terms and concepts for Representation',
    section: 'SEE3',
    cards: SEE3_DEFINITIONS,
    totalCards: SEE3_DEFINITIONS.length,
  },
  {
    id: 'see3-formulas',
    name: 'SEE3: Formulas & Calculations',
    description: 'Penalty and procedural calculations',
    section: 'SEE3',
    cards: SEE3_FORMULAS,
    totalCards: SEE3_FORMULAS.length,
  },
  {
    id: 'see3-mnemonics',
    name: 'SEE3: Memory Aids',
    description: 'Mnemonics for ethics, practice, and procedures',
    section: 'SEE3',
    cards: SEE3_MNEMONICS,
    totalCards: SEE3_MNEMONICS.length,
  },
  {
    id: 'see3-all',
    name: 'SEE3: Complete Deck',
    description: 'All Representation flashcards',
    section: 'SEE3',
    cards: SEE3_FLASHCARDS,
    totalCards: SEE3_FLASHCARDS.length,
  },
  // Master deck
  {
    id: 'ea-all',
    name: 'EA: Complete Study Deck',
    description: 'All EA flashcards across all sections',
    section: 'SEE1', // Default section, contains all
    cards: ALL_EA_FLASHCARDS,
    totalCards: ALL_EA_FLASHCARDS.length,
  },
];

// ============================================
// Helper Functions
// ============================================

/**
 * Get flashcards by section
 */
export function getFlashcardsBySection(section: EASection): EAFlashcard[] {
  return ALL_EA_FLASHCARDS.filter(card => card.section === section);
}

/**
 * Get flashcards by type
 */
export function getFlashcardsByType(type: EAFlashcardType): EAFlashcard[] {
  return ALL_EA_FLASHCARDS.filter(card => card.type === type);
}

/**
 * Get flashcards by section and type
 */
export function getFlashcardsBySectionAndType(
  section: EASection,
  type: EAFlashcardType
): EAFlashcard[] {
  return ALL_EA_FLASHCARDS.filter(
    card => card.section === section && card.type === type
  );
}

/**
 * Get flashcards by topic
 */
export function getFlashcardsByTopic(topic: string): EAFlashcard[] {
  return ALL_EA_FLASHCARDS.filter(
    card => card.topic.toLowerCase().includes(topic.toLowerCase())
  );
}

/**
 * Get flashcards by difficulty
 */
export function getFlashcardsByDifficulty(
  difficulty: 'easy' | 'medium' | 'hard'
): EAFlashcard[] {
  return ALL_EA_FLASHCARDS.filter(card => card.difficulty === difficulty);
}

/**
 * Get flashcards by blueprint area
 */
export function getFlashcardsByBlueprintArea(blueprintArea: string): EAFlashcard[] {
  return ALL_EA_FLASHCARDS.filter(card => card.blueprintArea === blueprintArea);
}

/**
 * Get a random selection of flashcards
 */
export function getRandomFlashcards(
  count: number,
  section?: EASection
): EAFlashcard[] {
  const source = section
    ? getFlashcardsBySection(section)
    : ALL_EA_FLASHCARDS;
  
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get flashcard deck by ID
 */
export function getDeckById(deckId: string): EAFlashcardDeck | undefined {
  return EA_FLASHCARD_DECKS.find(deck => deck.id === deckId);
}

/**
 * Get all decks for a section
 */
export function getDecksBySection(section: EASection): EAFlashcardDeck[] {
  return EA_FLASHCARD_DECKS.filter(
    deck => deck.section === section || deck.id === 'ea-all'
  );
}

/**
 * Get flashcard statistics
 */
export function getFlashcardStats() {
  return {
    total: ALL_EA_FLASHCARDS.length,
    bySection: {
      SEE1: SEE1_FLASHCARDS.length,
      SEE2: SEE2_FLASHCARDS.length,
      SEE3: SEE3_FLASHCARDS.length,
    },
    byType: {
      definition: ALL_EA_FLASHCARDS.filter(c => c.type === 'definition').length,
      formula: ALL_EA_FLASHCARDS.filter(c => c.type === 'formula').length,
      mnemonic: ALL_EA_FLASHCARDS.filter(c => c.type === 'mnemonic').length,
      comparison: ALL_EA_FLASHCARDS.filter(c => c.type === 'comparison').length,
      concept: ALL_EA_FLASHCARDS.filter(c => c.type === 'concept').length,
      rule: ALL_EA_FLASHCARDS.filter(c => c.type === 'rule').length,
      penalty: ALL_EA_FLASHCARDS.filter(c => c.type === 'penalty').length,
      threshold: ALL_EA_FLASHCARDS.filter(c => c.type === 'threshold').length,
    },
    byDifficulty: {
      easy: ALL_EA_FLASHCARDS.filter(c => c.difficulty === 'easy').length,
      medium: ALL_EA_FLASHCARDS.filter(c => c.difficulty === 'medium').length,
      hard: ALL_EA_FLASHCARDS.filter(c => c.difficulty === 'hard').length,
    },
  };
}

// ============================================
// Re-exports
// ============================================

export * from './types';
export { SEE1_DEFINITIONS, SEE1_FORMULAS, SEE1_MNEMONICS };
export { SEE2_DEFINITIONS, SEE2_FORMULAS, SEE2_MNEMONICS };
export { SEE3_DEFINITIONS, SEE3_FORMULAS, SEE3_MNEMONICS };
