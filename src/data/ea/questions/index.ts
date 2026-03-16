// Question Bank Index — JSON-based
// Loads all EA questions from clean JSON files in content/ea/
// This replaces the 170+ line import mess with consolidated enhanced JSON data

import type { Question } from '../../../types';
import { EASection, Difficulty, normalizeDifficulty } from '../../../types';

// Import the consolidated JSON files (Vite handles JSON imports natively)
import see1Data from '../../../../content/ea/see1/questions.json';
import see2Data from '../../../../content/ea/see2/questions.json';
import see3Data from '../../../../content/ea/see3/questions.json';

// Type for the JSON structure
interface QuestionFile {
  section: string;
  exportedAt: string;
  questions: Question[];
}

// Cast and extract questions arrays
const see1Questions = (see1Data as QuestionFile).questions;
const see2Questions = (see2Data as QuestionFile).questions;
const see3Questions = (see3Data as QuestionFile).questions;

// Export section question banks (same names as before for backward compatibility)
export const SEE1_ALL = see1Questions;
export const SEE2_ALL = see2Questions;
export const SEE3_ALL = see3Questions;

// Combined question bank (all sections)
export const EA_ALL_QUESTIONS: Question[] = [
  ...SEE1_ALL,
  ...SEE2_ALL,
  ...SEE3_ALL,
];

// Question counts for reference
export const EA_QUESTION_COUNTS = {
  SEE1: SEE1_ALL.length,
  SEE2: SEE2_ALL.length,
  SEE3: SEE3_ALL.length,
  Total: EA_ALL_QUESTIONS.length,
};

// Get questions by section
export const getQuestionsBySection = (section: EASection): Question[] => {
  switch (section) {
    case 'SEE1': return SEE1_ALL;
    case 'SEE2': return SEE2_ALL;
    case 'SEE3': return SEE3_ALL;
    default: return [];
  }
};

// Get questions by topic
export const getQuestionsByTopic = (topicId: string): Question[] => {
  return EA_ALL_QUESTIONS.filter((q) => q.topicId === topicId || q.topic === topicId);
};

// Get questions by difficulty (handles normalized difficulty matching)
export const getQuestionsByDifficulty = (difficulty: Difficulty): Question[] => {
  const normalized = normalizeDifficulty(difficulty);
  return EA_ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === normalized);
};

// Get random questions
export const getRandomQuestions = (count: number, section: EASection | null = null): Question[] => {
  const pool = section ? getQuestionsBySection(section) : EA_ALL_QUESTIONS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get question statistics
export const getQuestionStats = () => {
  return {
    total: EA_ALL_QUESTIONS.length,
    bySection: {
      SEE1: SEE1_ALL.length,
      SEE2: SEE2_ALL.length,
      SEE3: SEE3_ALL.length,
    },
    byDifficulty: {
      easy: EA_ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === 'easy').length,
      medium: EA_ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === 'medium').length,
      hard: EA_ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === 'hard').length,
    },
    topics: [...new Set(EA_ALL_QUESTIONS.map((q) => q.topic))].length,
  };
};

export default EA_ALL_QUESTIONS;
