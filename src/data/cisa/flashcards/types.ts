/**
 * CISA Flashcard Types
 * Simple interface for CISA certification flashcards
 */

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  tags: string[];
}
