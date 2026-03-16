// CMA Question Bank Index — JSON-based
// Loads all CMA questions from consolidated JSON files in content/cma/
// Replaces 70+ TypeScript batch imports with 2 clean JSON imports

import type { Question } from '../../../types';
import { Difficulty, normalizeDifficulty } from '../../../types';

// Import the consolidated JSON files (Vite handles JSON imports natively)
import cma1Data from '../../../../content/cma/cma1/questions.json';
import cma2Data from '../../../../content/cma/cma2/questions.json';

// Type for the JSON structure
interface QuestionFile {
  section: string;
  exportedAt: string;
  questions: Question[];
}

// Cast and extract questions arrays
const cma1Questions = (cma1Data as QuestionFile).questions;
const cma2Questions = (cma2Data as QuestionFile).questions;

// Section question banks
export const CMA_PART1_QUESTIONS: Question[] = cma1Questions;
export const CMA_PART2_QUESTIONS: Question[] = cma2Questions;

// All CMA questions combined
export const CMA_ALL_QUESTIONS: Question[] = [
  ...CMA_PART1_QUESTIONS,
  ...CMA_PART2_QUESTIONS,
];

// ==========================================
// Helper Functions
// ==========================================

/**
 * Get all questions for a specific section
 */
export function getQuestionsBySection(section: 'CMA1' | 'CMA2'): Question[] {
  return section === 'CMA1' ? CMA_PART1_QUESTIONS : CMA_PART2_QUESTIONS;
}

/**
 * Get all questions for a specific blueprint area
 */
export function getQuestionsByBlueprintArea(blueprintArea: string): Question[] {
  return CMA_ALL_QUESTIONS.filter(q => q.blueprintArea === blueprintArea);
}

/**
 * Get questions by difficulty level (handles normalized difficulty matching)
 */
export function getQuestionsByDifficulty(difficulty: Difficulty): Question[] {
  const normalized = normalizeDifficulty(difficulty);
  return CMA_ALL_QUESTIONS.filter(q => normalizeDifficulty(q.difficulty) === normalized);
}

/**
 * Get questions by topic
 */
export function getQuestionsByTopic(topic: string): Question[] {
  return CMA_ALL_QUESTIONS.filter(q =>
    q.topic.toLowerCase().includes(topic.toLowerCase())
  );
}

/**
 * Get a random subset of questions
 */
export function getRandomQuestions(count: number, section?: 'CMA1' | 'CMA2'): Question[] {
  const pool = section ? getQuestionsBySection(section) : CMA_ALL_QUESTIONS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, pool.length));
}

/**
 * Get question counts by section and blueprint area
 */
export function getQuestionStats() {
  return {
    total: CMA_ALL_QUESTIONS.length,
    part1: {
      total: CMA_PART1_QUESTIONS.length,
      byArea: {
        'CMA1-A': CMA_PART1_QUESTIONS.filter(q => q.blueprintArea === 'CMA1-A').length,
        'CMA1-B': CMA_PART1_QUESTIONS.filter(q => q.blueprintArea === 'CMA1-B').length,
        'CMA1-C': CMA_PART1_QUESTIONS.filter(q => q.blueprintArea === 'CMA1-C').length,
        'CMA1-D': CMA_PART1_QUESTIONS.filter(q => q.blueprintArea === 'CMA1-D').length,
        'CMA1-E': CMA_PART1_QUESTIONS.filter(q => q.blueprintArea === 'CMA1-E').length,
        'CMA1-F': CMA_PART1_QUESTIONS.filter(q => q.blueprintArea === 'CMA1-F').length,
      },
    },
    part2: {
      total: CMA_PART2_QUESTIONS.length,
      byArea: {
        'CMA2-A': CMA_PART2_QUESTIONS.filter(q => q.blueprintArea === 'CMA2-A').length,
        'CMA2-B': CMA_PART2_QUESTIONS.filter(q => q.blueprintArea === 'CMA2-B').length,
        'CMA2-C': CMA_PART2_QUESTIONS.filter(q => q.blueprintArea === 'CMA2-C').length,
        'CMA2-D': CMA_PART2_QUESTIONS.filter(q => q.blueprintArea === 'CMA2-D').length,
        'CMA2-E': CMA_PART2_QUESTIONS.filter(q => q.blueprintArea === 'CMA2-E').length,
        'CMA2-F': CMA_PART2_QUESTIONS.filter(q => q.blueprintArea === 'CMA2-F').length,
      },
    },
    byDifficulty: {
      easy: CMA_ALL_QUESTIONS.filter(q => normalizeDifficulty(q.difficulty) === 'easy').length,
      medium: CMA_ALL_QUESTIONS.filter(q => normalizeDifficulty(q.difficulty) === 'medium').length,
      hard: CMA_ALL_QUESTIONS.filter(q => normalizeDifficulty(q.difficulty) === 'hard').length,
    },
  };
}

/**
 * Create a practice exam with weighted question distribution
 */
export function createPracticeExam(
  part: 'CMA1' | 'CMA2',
  questionCount: number = 100
): Question[] {
  const weights = part === 'CMA1'
    ? {
        'CMA1-A': 0.15, // External Financial Reporting
        'CMA1-B': 0.20, // Planning, Budgeting, Forecasting
        'CMA1-C': 0.20, // Performance Management
        'CMA1-D': 0.15, // Cost Management
        'CMA1-E': 0.15, // Internal Controls
        'CMA1-F': 0.15, // Technology and Analytics
      }
    : {
        'CMA2-A': 0.20, // Financial Statement Analysis
        'CMA2-B': 0.20, // Corporate Finance
        'CMA2-C': 0.25, // Decision Analysis
        'CMA2-D': 0.10, // Risk Management
        'CMA2-E': 0.10, // Investment Decisions
        'CMA2-F': 0.15, // Professional Ethics
      };

  const examQuestions: Question[] = [];

  for (const [area, weight] of Object.entries(weights)) {
    const areaQuestions = getQuestionsByBlueprintArea(area);
    const targetCount = Math.round(questionCount * weight);
    const shuffled = [...areaQuestions].sort(() => Math.random() - 0.5);
    examQuestions.push(...shuffled.slice(0, Math.min(targetCount, shuffled.length)));
  }

  // Shuffle final exam
  return examQuestions.sort(() => Math.random() - 0.5).slice(0, questionCount);
}

// Default export
export default CMA_ALL_QUESTIONS;
