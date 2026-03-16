// Question Bank Index — JSON-based
// Loads all CPA questions from clean JSON files in content/cpa/
// This replaces the 365-line import mess with the consolidated enhanced JSON data

import type { Question } from '../../../types';
import { ExamSection, Difficulty, normalizeDifficulty } from '../../../types';

// Import the consolidated JSON files (Vite handles JSON imports natively)
import farData from '../../../../content/cpa/far/questions.json';
import audData from '../../../../content/cpa/aud/questions.json';
import regData from '../../../../content/cpa/reg/questions.json';
import barData from '../../../../content/cpa/bar/questions.json';
import iscData from '../../../../content/cpa/isc/questions.json';
import tcpData from '../../../../content/cpa/tcp/questions.json';

// Type for the JSON structure
interface QuestionFile {
  section: string;
  exportedAt: string;
  questions: Question[];
}

// Cast and extract questions arrays
const farQuestions = (farData as QuestionFile).questions;
const audQuestions = (audData as QuestionFile).questions;
const regQuestions = (regData as QuestionFile).questions;
const barQuestions = (barData as QuestionFile).questions;
const iscQuestions = (iscData as QuestionFile).questions;
const tcpQuestions = (tcpData as QuestionFile).questions;

// Export section question banks (same names as before for backward compatibility)
export const FAR_ALL = farQuestions;
export const AUD_ALL = audQuestions;
export const REG_ALL = regQuestions;
export const BAR_ALL = barQuestions;
export const ISC_ALL = iscQuestions;
export const TCP_ALL = tcpQuestions;

// Legacy exports for backward compatibility (point to the same arrays)
export const FAR_QUESTIONS = farQuestions;
export const AUD_QUESTIONS = audQuestions;
export const REG_QUESTIONS = regQuestions;
export const BAR_QUESTIONS = barQuestions;
export const ISC_QUESTIONS = iscQuestions;
export const TCP_QUESTIONS = tcpQuestions;

// Combined question bank (all sections)
export const ALL_QUESTIONS: Question[] = [
  ...FAR_ALL,
  ...AUD_ALL,
  ...REG_ALL,
  ...BAR_ALL,
  ...ISC_ALL,
  ...TCP_ALL,
];

// Get questions by section
export const getQuestionsBySection = (section: ExamSection): Question[] => {
  switch (section) {
    case 'FAR': return FAR_ALL;
    case 'AUD': return AUD_ALL;
    case 'REG': return REG_ALL;
    case 'BAR': return BAR_ALL;
    case 'ISC': return ISC_ALL;
    case 'TCP': return TCP_ALL;
    default: return [];
  }
};

// Get questions by topic
export const getQuestionsByTopic = (topicId: string): Question[] => {
  return ALL_QUESTIONS.filter((q) => q.topicId === topicId || q.topic === topicId);
};

// Get questions by difficulty (handles normalized difficulty matching)
export const getQuestionsByDifficulty = (difficulty: Difficulty): Question[] => {
  const normalized = normalizeDifficulty(difficulty);
  return ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === normalized);
};

// Get random questions
export const getRandomQuestions = (count: number, section: ExamSection | null = null): Question[] => {
  const pool = section ? getQuestionsBySection(section) : ALL_QUESTIONS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get question statistics
export const getQuestionStats = () => {
  return {
    total: ALL_QUESTIONS.length,
    bySection: {
      FAR: FAR_ALL.length,
      AUD: AUD_ALL.length,
      REG: REG_ALL.length,
      BAR: BAR_ALL.length,
      ISC: ISC_ALL.length,
      TCP: TCP_ALL.length,
    },
    byDifficulty: {
      easy: ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === 'easy').length,
      medium: ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === 'medium').length,
      hard: ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === 'hard').length,
    },
    topics: [...new Set(ALL_QUESTIONS.map((q) => q.topic))].length,
  };
};

export default ALL_QUESTIONS;
