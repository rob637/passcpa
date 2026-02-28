/**
 * EA Flashcard Types
 * Special Enrollment Examination (SEE) flashcard content types
 */

import { EASection } from '../../../types';

export type EAFlashcardType = 'definition' | 'formula' | 'mnemonic' | 'comparison' | 'concept' | 'rule' | 'penalty' | 'threshold';

export interface EAFlashcard {
  id: string;
  section: EASection;
  type: EAFlashcardType;
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
  
  // IRS reference
  irsReference?: string;   // IRC section, Circular 230, IRM, etc.
}

export interface EAFlashcardDeck {
  id: string;
  name: string;
  description: string;
  section: EASection;
  cards: EAFlashcard[];
  totalCards: number;
  icon?: string;
}

// Re-export EASection for convenience
export type { EASection } from '../../../types';
