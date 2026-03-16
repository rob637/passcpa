// Question Bank Index — JSON-based
// Loads all CISA questions from clean JSON files in content/cisa/
// This replaces the old TypeScript imports with consolidated enhanced JSON data

import type { Question } from '../../../types';
import { CISASection, Difficulty, normalizeDifficulty } from '../../../types';

// Import the consolidated JSON files (Vite handles JSON imports natively)
import cisa1Data from '../../../../content/cisa/cisa1/questions.json';
import cisa2Data from '../../../../content/cisa/cisa2/questions.json';
import cisa3Data from '../../../../content/cisa/cisa3/questions.json';
import cisa4Data from '../../../../content/cisa/cisa4/questions.json';
import cisa5Data from '../../../../content/cisa/cisa5/questions.json';

// Type for the JSON structure
interface QuestionFile {
  section: string;
  exportedAt: string;
  questions: Question[];
}

// Cast and extract questions arrays
const cisa1Questions = (cisa1Data as QuestionFile).questions;
const cisa2Questions = (cisa2Data as QuestionFile).questions;
const cisa3Questions = (cisa3Data as QuestionFile).questions;
const cisa4Questions = (cisa4Data as QuestionFile).questions;
const cisa5Questions = (cisa5Data as QuestionFile).questions;

// Export section question banks (backward-compatible names)
export const CISA1_QUESTIONS = cisa1Questions;
export const CISA2_QUESTIONS = cisa2Questions;
export const CISA3_QUESTIONS = cisa3Questions;
export const CISA4_QUESTIONS = cisa4Questions;
export const CISA5_QUESTIONS = cisa5Questions;

// Combined question bank (all domains)
export const CISA_QUESTIONS: Question[] = [
  ...CISA1_QUESTIONS,
  ...CISA2_QUESTIONS,
  ...CISA3_QUESTIONS,
  ...CISA4_QUESTIONS,
  ...CISA5_QUESTIONS,
];

// Get questions by section
export const getQuestionsBySection = (section: CISASection): Question[] => {
  switch (section) {
    case 'CISA1': return CISA1_QUESTIONS;
    case 'CISA2': return CISA2_QUESTIONS;
    case 'CISA3': return CISA3_QUESTIONS;
    case 'CISA4': return CISA4_QUESTIONS;
    case 'CISA5': return CISA5_QUESTIONS;
    default: return [];
  }
};

// Get questions by topic
export const getQuestionsByTopic = (topicId: string): Question[] => {
  return CISA_QUESTIONS.filter((q) => q.topicId === topicId || q.topic === topicId);
};

// Get questions by difficulty (handles normalized difficulty matching)
export const getQuestionsByDifficulty = (difficulty: Difficulty): Question[] => {
  const normalized = normalizeDifficulty(difficulty);
  return CISA_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === normalized);
};

export default CISA_QUESTIONS;
