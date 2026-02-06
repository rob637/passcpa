import { Question } from '../../../types';
import { CFP_GEN_QUESTIONS } from './gen_principles';
import { CFP_INV_QUESTIONS } from './investments';

// Aggregate all questions
export const CFP_QUESTIONS_ALL = [
  ...CFP_GEN_QUESTIONS,
  ...CFP_INV_QUESTIONS,
  // ... imports for other domains would go here
];

// Helper to get questions by specific ID pattern or section
export const getCFPQuestions = (sectionId: string): Question[] => {
  // If requesting a specific domain (e.g., CFP-GEN), filter for it
  if (sectionId === 'CFP-GEN') return CFP_GEN_QUESTIONS;
  if (sectionId === 'CFP-INV') return CFP_INV_QUESTIONS;
  
  // Return all for general queries if needed, or empty default
  return [];
};
