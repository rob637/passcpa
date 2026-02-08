// Flashcard Types - Dedicated flashcard content types
// Supports definitions, formulas, mnemonics, and comparisons

import { ExamSection, AllExamSections } from '../../../types';

export type FlashcardType = 'definition' | 'formula' | 'mnemonic' | 'comparison' | 'concept' | 'rule';

export interface Flashcard {
  id: string;
  section: AllExamSections;
  type: FlashcardType;
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
  
  // 2026 Blueprint mapping
  blueprintTopic?: string;
  skillLevel?: 'Remembering and Understanding' | 'Application' | 'Analysis';
}

export interface FlashcardDeck {
  id: string;
  name: string;
  description: string;
  section: ExamSection;
  cards: Flashcard[];
  icon?: string;
}
