/**
 * CMA Flashcard Types
 * Certified Management Accountant (CMA) flashcard content types
 */

import { CMASection } from '../../../types';

export type CMAFlashcardType = 'definition' | 'formula' | 'mnemonic' | 'comparison' | 'concept' | 'rule' | 'ratio' | 'calculation';

export interface CMAFlashcard {
  id: string;
  section: CMASection;
  type: CMAFlashcardType;
  topic: string;
  subtopic?: string;
  blueprintArea?: string;
  
  // Card content
  front: string;           // Question/term/prompt
  back: string;            // Answer/definition/explanation
  
  // Optional enhanced content
  example?: string;        // Real-world example
  formula?: string;        // For formula cards
  mnemonic?: string;       // Memory aid
  comparison?: {           // For comparison cards
    itemA: string;
    itemB: string;
    differences: string[];
  };
  
  // Metadata
  difficulty: 'easy' | 'medium' | 'hard';
  tags?: string[];
  reference?: string;
  
  // CMA-specific references
  imaReference?: string;   // IMA guidance reference
}

export interface CMAFlashcardDeck {
  id: string;
  name: string;
  description: string;
  section: CMASection;
  cards: CMAFlashcard[];
  totalCards: number;
  icon?: string;
}

// Re-export CMASection for convenience
export type { CMASection } from '../../../types';
