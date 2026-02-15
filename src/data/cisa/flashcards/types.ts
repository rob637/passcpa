/**
 * CISA Flashcard Types
 * Simple interface for CISA certification flashcards
 */

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category?: string;
  tags: string[];
  // Additional properties used by flashcard files
  section?: string;
  type?: string;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}
