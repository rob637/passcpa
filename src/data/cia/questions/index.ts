// Question Bank Index — JSON-based
// Loads all CIA questions from clean JSON files in content/cia/
// This replaces the batch import mess with consolidated enhanced JSON data

import type { Question } from '../../../types';
import { Difficulty, normalizeDifficulty } from '../../../types';

// Import the consolidated JSON files (Vite handles JSON imports natively)
import cia1Data from '../../../../content/cia/cia1/questions.json';
import cia2Data from '../../../../content/cia/cia2/questions.json';
import cia3Data from '../../../../content/cia/cia3/questions.json';

// Type for the JSON structure
interface QuestionFile {
  section: string;
  exportedAt: string;
  questions: Question[];
}

// Cast and extract questions arrays
const cia1Questions = (cia1Data as QuestionFile).questions;
const cia2Questions = (cia2Data as QuestionFile).questions;
const cia3Questions = (cia3Data as QuestionFile).questions;

// Export section question banks (primary names)
export const ALL_CIA1_QUESTIONS: Question[] = cia1Questions;
export const ALL_CIA2_QUESTIONS: Question[] = cia2Questions;
export const ALL_CIA3_QUESTIONS: Question[] = cia3Questions;

// Legacy exports for backward compatibility (used by questionService)
export const CIA1_QUESTIONS = cia1Questions;
export const CIA2_QUESTIONS = cia2Questions;
export const CIA3_QUESTIONS = cia3Questions;

// Combined question bank (all sections)
export const CIA_ALL_QUESTIONS: Question[] = [
  ...ALL_CIA1_QUESTIONS,
  ...ALL_CIA2_QUESTIONS,
  ...ALL_CIA3_QUESTIONS,
];

// Get questions by section
export const getQuestionsBySection = (section: string): Question[] => {
  switch (section) {
    case 'CIA1': return ALL_CIA1_QUESTIONS;
    case 'CIA2': return ALL_CIA2_QUESTIONS;
    case 'CIA3': return ALL_CIA3_QUESTIONS;
    default: return [];
  }
};

// Get questions by topic
export const getQuestionsByTopic = (topicId: string): Question[] => {
  return CIA_ALL_QUESTIONS.filter((q) => q.topicId === topicId || q.topic === topicId);
};

// Get questions by difficulty (handles normalized difficulty matching)
export const getQuestionsByDifficulty = (difficulty: Difficulty): Question[] => {
  const normalized = normalizeDifficulty(difficulty);
  return CIA_ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === normalized);
};
