// Flashcard Data - Central export for all dedicated flashcard content
// These supplement the question-based flashcards with dedicated study material

export * from './types';
export * from './definitions';
export * from './formulas';
export * from './mnemonics';
export * from './expanded-definitions';
export * from './expanded-formulas';
export * from './expanded-rules';

import { Flashcard } from './types';
import { ALL_DEFINITIONS } from './definitions';
import { ALL_FORMULAS } from './formulas';
import { ALL_MNEMONICS } from './mnemonics';
import { ALL_EXPANDED_DEFINITIONS } from './expanded-definitions';
import { ALL_EXPANDED_FORMULAS } from './expanded-formulas';
import { ALL_RULES_AND_LIMITS } from './expanded-rules';

// CPA Section Batch Flashcards
import { FAR_BATCH2_FLASHCARDS } from './far-batch2';
import { AUD_BATCH2_FLASHCARDS } from './aud-batch2';
import { REG_BATCH2_FLASHCARDS } from './reg-batch2';

// 2024+ CPA Evolution Discipline Flashcards (World-Class Sprint)
import { TCP_FLASHCARDS } from './tcp-flashcards';
import { BAR_FLASHCARDS } from './bar-flashcards';
import { ISC_FLASHCARDS } from './isc-flashcards';
// World-class sprint flashcards for core sections
import { FAR_WORLD_CLASS_FLASHCARDS, AUD_WORLD_CLASS_FLASHCARDS, REG_WORLD_CLASS_FLASHCARDS } from './flashcards-world-class';
// Sprint Batch 3 flashcards (10 per section)
import { ALL_BATCH3_FLASHCARDS } from './flashcards-batch3';

// EA Flashcards - Import and adapt for unified system
import { ALL_EA_FLASHCARDS } from '../../ea/flashcards';

// CMA Flashcards - Import and adapt for unified system
import { ALL_CMA_FLASHCARDS } from '../../cma/flashcards';

// Convert EA flashcards to main format (types are compatible)
const EA_FLASHCARDS_ADAPTED: Flashcard[] = ALL_EA_FLASHCARDS.map(card => ({
  id: card.id,
  section: card.section as unknown as Flashcard['section'], // SEE1/SEE2/SEE3
  type: (card.type === 'penalty' || card.type === 'threshold' ? 'rule' : card.type) as Flashcard['type'],
  topic: card.topic,
  subtopic: card.subtopic,
  blueprintArea: card.blueprintArea,
  front: card.front,
  back: card.back,
  example: card.example,
  formula: card.formula,
  mnemonic: card.mnemonic,
  comparison: card.comparison,
  difficulty: card.difficulty,
  tags: card.tags,
  reference: card.reference || card.irsReference,
}));

// Convert CMA flashcards to main format (types are compatible)
const CMA_FLASHCARDS_ADAPTED: Flashcard[] = ALL_CMA_FLASHCARDS.map(card => ({
  id: card.id,
  section: card.section as unknown as Flashcard['section'], // CMA1/CMA2
  type: card.type as Flashcard['type'],
  topic: card.topic,
  subtopic: card.subtopic,
  blueprintArea: card.blueprintArea,
  front: card.front,
  back: card.back,
  example: card.example,
  formula: card.formula,
  mnemonic: card.mnemonic,
  comparison: card.comparison,
  difficulty: card.difficulty,
  tags: card.tags,
  reference: card.reference || card.imaReference,
}));

// Combined collection of all dedicated flashcards (CPA + EA + CMA)
export const ALL_DEDICATED_FLASHCARDS: Flashcard[] = [
  ...ALL_DEFINITIONS,
  ...ALL_FORMULAS,
  ...ALL_MNEMONICS,
  ...ALL_EXPANDED_DEFINITIONS,
  ...ALL_EXPANDED_FORMULAS,
  ...ALL_RULES_AND_LIMITS,
  ...FAR_BATCH2_FLASHCARDS,
  ...AUD_BATCH2_FLASHCARDS,
  ...REG_BATCH2_FLASHCARDS,
  ...TCP_FLASHCARDS,
  ...BAR_FLASHCARDS,
  ...ISC_FLASHCARDS,
  ...FAR_WORLD_CLASS_FLASHCARDS,
  ...AUD_WORLD_CLASS_FLASHCARDS,
  ...REG_WORLD_CLASS_FLASHCARDS,
  ...ALL_BATCH3_FLASHCARDS,
  ...EA_FLASHCARDS_ADAPTED,
  ...CMA_FLASHCARDS_ADAPTED,
];

// CPA-only flashcards (for backward compatibility)
export const CPA_FLASHCARDS: Flashcard[] = [
  ...ALL_DEFINITIONS,
  ...ALL_FORMULAS,
  ...ALL_MNEMONICS,
  ...ALL_EXPANDED_DEFINITIONS,
  ...ALL_EXPANDED_FORMULAS,
  ...ALL_RULES_AND_LIMITS,
  ...FAR_BATCH2_FLASHCARDS,
  ...AUD_BATCH2_FLASHCARDS,
  ...REG_BATCH2_FLASHCARDS,
  ...TCP_FLASHCARDS,
  ...BAR_FLASHCARDS,
  ...ISC_FLASHCARDS,
  ...FAR_WORLD_CLASS_FLASHCARDS,
  ...AUD_WORLD_CLASS_FLASHCARDS,
  ...REG_WORLD_CLASS_FLASHCARDS,
  ...ALL_BATCH3_FLASHCARDS,
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
    // CPA Sections
    FAR: getFlashcardsBySection('FAR').length,
    AUD: getFlashcardsBySection('AUD').length,
    REG: getFlashcardsBySection('REG').length,
    BAR: getFlashcardsBySection('BAR').length,
    ISC: getFlashcardsBySection('ISC').length,
    TCP: getFlashcardsBySection('TCP').length,
    // EA Sections
    SEE1: getFlashcardsBySection('SEE1').length,
    SEE2: getFlashcardsBySection('SEE2').length,
    SEE3: getFlashcardsBySection('SEE3').length,
    // CMA Sections
    CMA1: getFlashcardsBySection('CMA1').length,
    CMA2: getFlashcardsBySection('CMA2').length,
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

// EA-specific helper
export const getEAFlashcards = (): Flashcard[] => {
  return [...getFlashcardsBySection('SEE1'), ...getFlashcardsBySection('SEE2'), ...getFlashcardsBySection('SEE3')];
};

// CMA-specific helper
export const getCMAFlashcards = (): Flashcard[] => {
  return [...getFlashcardsBySection('CMA1'), ...getFlashcardsBySection('CMA2')];
};

export default ALL_DEDICATED_FLASHCARDS;
