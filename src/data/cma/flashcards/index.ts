/**
 * CMA Flashcards - Central Export and Utilities
 * 
 * Provides access to all CMA flashcard decks with helper functions
 * for filtering by section, type, topic, and difficulty.
 */

import { CMAFlashcard, CMAFlashcardDeck, CMAFlashcardType, CMASection } from './types';

// CMA1 - Financial Planning, Performance, and Analytics
import { CMA1_DEFINITIONS } from './cma1-definitions';
import { CMA1_FORMULAS } from './cma1-formulas';
import { CMA1_MNEMONICS } from './cma1-mnemonics';

// CMA2 - Strategic Financial Management
import { CMA2_DEFINITIONS } from './cma2-definitions';
import { CMA2_FORMULAS } from './cma2-formulas';
import { CMA2_MNEMONICS } from './cma2-mnemonics';

// ============================================
// Combined Flashcard Arrays by Section
// ============================================

export const CMA1_FLASHCARDS: CMAFlashcard[] = [
  ...CMA1_DEFINITIONS,
  ...CMA1_FORMULAS,
  ...CMA1_MNEMONICS,
];

export const CMA2_FLASHCARDS: CMAFlashcard[] = [
  ...CMA2_DEFINITIONS,
  ...CMA2_FORMULAS,
  ...CMA2_MNEMONICS,
];

// ============================================
// All Flashcards Combined
// ============================================

export const ALL_CMA_FLASHCARDS: CMAFlashcard[] = [
  ...CMA1_FLASHCARDS,
  ...CMA2_FLASHCARDS,
];

// ============================================
// Pre-built Decks
// ============================================

export const CMA_FLASHCARD_DECKS: CMAFlashcardDeck[] = [
  // CMA1 Decks
  {
    id: 'cma1-definitions',
    name: 'CMA Part 1: Key Definitions',
    description: 'Essential terms and concepts for Financial Planning, Performance, and Analytics',
    section: 'CMA1',
    cards: CMA1_DEFINITIONS,
    totalCards: CMA1_DEFINITIONS.length,
  },
  {
    id: 'cma1-formulas',
    name: 'CMA Part 1: Formulas & Calculations',
    description: 'Key formulas for budgeting, variances, and performance measurement',
    section: 'CMA1',
    cards: CMA1_FORMULAS,
    totalCards: CMA1_FORMULAS.length,
  },
  {
    id: 'cma1-mnemonics',
    name: 'CMA Part 1: Memory Aids',
    description: 'Mnemonics and memory tricks for Part 1 concepts',
    section: 'CMA1',
    cards: CMA1_MNEMONICS,
    totalCards: CMA1_MNEMONICS.length,
  },
  {
    id: 'cma1-all',
    name: 'CMA Part 1: Complete Deck',
    description: 'All Financial Planning, Performance, and Analytics flashcards',
    section: 'CMA1',
    cards: CMA1_FLASHCARDS,
    totalCards: CMA1_FLASHCARDS.length,
  },
  // CMA2 Decks
  {
    id: 'cma2-definitions',
    name: 'CMA Part 2: Key Definitions',
    description: 'Essential terms and concepts for Strategic Financial Management',
    section: 'CMA2',
    cards: CMA2_DEFINITIONS,
    totalCards: CMA2_DEFINITIONS.length,
  },
  {
    id: 'cma2-formulas',
    name: 'CMA Part 2: Formulas & Calculations',
    description: 'Key formulas for ratios, capital budgeting, and corporate finance',
    section: 'CMA2',
    cards: CMA2_FORMULAS,
    totalCards: CMA2_FORMULAS.length,
  },
  {
    id: 'cma2-mnemonics',
    name: 'CMA Part 2: Memory Aids',
    description: 'Mnemonics and memory tricks for Part 2 concepts',
    section: 'CMA2',
    cards: CMA2_MNEMONICS,
    totalCards: CMA2_MNEMONICS.length,
  },
  {
    id: 'cma2-all',
    name: 'CMA Part 2: Complete Deck',
    description: 'All Strategic Financial Management flashcards',
    section: 'CMA2',
    cards: CMA2_FLASHCARDS,
    totalCards: CMA2_FLASHCARDS.length,
  },
  // Combined Deck
  {
    id: 'cma-all',
    name: 'CMA: All Parts',
    description: 'Complete CMA exam flashcard collection',
    section: 'CMA1', // Default section for combined deck
    cards: ALL_CMA_FLASHCARDS,
    totalCards: ALL_CMA_FLASHCARDS.length,
  },
];

// ============================================
// Helper Functions
// ============================================

/**
 * Get flashcards filtered by section
 */
export function getCMAFlashcardsBySection(section: CMASection): CMAFlashcard[] {
  return ALL_CMA_FLASHCARDS.filter(card => card.section === section);
}

/**
 * Get flashcards filtered by type
 */
export function getCMAFlashcardsByType(type: CMAFlashcardType): CMAFlashcard[] {
  return ALL_CMA_FLASHCARDS.filter(card => card.type === type);
}

/**
 * Get flashcards filtered by section and type
 */
export function getCMAFlashcardsBySectionAndType(
  section: CMASection,
  type: CMAFlashcardType
): CMAFlashcard[] {
  return ALL_CMA_FLASHCARDS.filter(
    card => card.section === section && card.type === type
  );
}

/**
 * Get flashcards filtered by difficulty
 */
export function getCMAFlashcardsByDifficulty(
  difficulty: 'easy' | 'medium' | 'hard'
): CMAFlashcard[] {
  return ALL_CMA_FLASHCARDS.filter(card => card.difficulty === difficulty);
}

/**
 * Get flashcards filtered by topic
 */
export function getCMAFlashcardsByTopic(topic: string): CMAFlashcard[] {
  const lowerTopic = topic.toLowerCase();
  return ALL_CMA_FLASHCARDS.filter(
    card => card.topic.toLowerCase().includes(lowerTopic) ||
            (card.subtopic && card.subtopic.toLowerCase().includes(lowerTopic))
  );
}

/**
 * Get flashcards filtered by blueprint area
 */
export function getCMAFlashcardsByBlueprintArea(blueprintArea: string): CMAFlashcard[] {
  return ALL_CMA_FLASHCARDS.filter(card => card.blueprintArea === blueprintArea);
}

/**
 * Get flashcards filtered by tag
 */
export function getCMAFlashcardsByTag(tag: string): CMAFlashcard[] {
  const lowerTag = tag.toLowerCase();
  return ALL_CMA_FLASHCARDS.filter(
    card => card.tags?.some(t => t.toLowerCase().includes(lowerTag))
  );
}

/**
 * Get a random subset of flashcards
 */
export function getRandomCMAFlashcards(count: number, section?: CMASection): CMAFlashcard[] {
  const source = section ? getCMAFlashcardsBySection(section) : ALL_CMA_FLASHCARDS;
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get flashcard deck by ID
 */
export function getCMAFlashcardDeck(deckId: string): CMAFlashcardDeck | undefined {
  return CMA_FLASHCARD_DECKS.find(deck => deck.id === deckId);
}

/**
 * Get all decks for a section
 */
export function getCMADecksBySection(section: CMASection): CMAFlashcardDeck[] {
  return CMA_FLASHCARD_DECKS.filter(deck => deck.section === section);
}

/**
 * Search flashcards by query
 */
export function searchCMAFlashcards(query: string): CMAFlashcard[] {
  const lowerQuery = query.toLowerCase();
  return ALL_CMA_FLASHCARDS.filter(
    card =>
      card.front.toLowerCase().includes(lowerQuery) ||
      card.back.toLowerCase().includes(lowerQuery) ||
      card.topic.toLowerCase().includes(lowerQuery) ||
      (card.subtopic && card.subtopic.toLowerCase().includes(lowerQuery)) ||
      (card.mnemonic && card.mnemonic.toLowerCase().includes(lowerQuery)) ||
      (card.formula && card.formula.toLowerCase().includes(lowerQuery)) ||
      (card.tags && card.tags.some(t => t.toLowerCase().includes(lowerQuery)))
  );
}

// ============================================
// Statistics
// ============================================

export const CMA_FLASHCARD_STATS = {
  totalCards: ALL_CMA_FLASHCARDS.length,
  cma1Cards: CMA1_FLASHCARDS.length,
  cma2Cards: CMA2_FLASHCARDS.length,
  byType: {
    definitions: ALL_CMA_FLASHCARDS.filter(c => c.type === 'definition').length,
    formulas: ALL_CMA_FLASHCARDS.filter(c => c.type === 'formula').length,
    mnemonics: ALL_CMA_FLASHCARDS.filter(c => c.type === 'mnemonic').length,
  },
  byDifficulty: {
    easy: ALL_CMA_FLASHCARDS.filter(c => c.difficulty === 'easy').length,
    medium: ALL_CMA_FLASHCARDS.filter(c => c.difficulty === 'medium').length,
    hard: ALL_CMA_FLASHCARDS.filter(c => c.difficulty === 'hard').length,
  },
  totalDecks: CMA_FLASHCARD_DECKS.length,
};

// Re-export types
export type { CMAFlashcard, CMAFlashcardDeck, CMAFlashcardType, CMASection };
