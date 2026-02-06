/**
 * CMA Questions Index
 * 
 * Exports all CMA question batches with helper functions
 * 
 * Part 1: Financial Planning, Performance, and Analytics
 * - CMA1-A: External Financial Reporting (15%)
 * - CMA1-B: Planning, Budgeting, and Forecasting (20%)
 * - CMA1-C: Performance Management (20%)
 * - CMA1-D: Cost Management (15%)
 * - CMA1-E: Internal Controls (15%)
 * - CMA1-F: Technology and Analytics (15%)
 * 
 * Part 2: Strategic Financial Management
 * - CMA2-A: Financial Statement Analysis (20%)
 * - CMA2-B: Corporate Finance (20%)
 * - CMA2-C: Decision Analysis (25%)
 * - CMA2-D: Risk Management (10%)
 * - CMA2-E: Investment Decisions (10%)
 * - CMA2-F: Professional Ethics (15%)
 */

// Part 1 Questions
import { CMA1A_QUESTIONS_BATCH1 } from './cma1a-questions-batch1';
import { CMA1A_QUESTIONS_BATCH2 } from './cma1a-questions-batch2';
import { CMA1B_QUESTIONS_BATCH1 } from './cma1b-questions-batch1';
import { CMA1B_QUESTIONS_BATCH2 } from './cma1b-questions-batch2';
import { CMA1C_QUESTIONS_BATCH1 } from './cma1c-questions-batch1';
import { CMA1C_QUESTIONS_BATCH2 } from './cma1c-questions-batch2';
import { CMA1D_QUESTIONS_BATCH1 } from './cma1d-questions-batch1';
import { CMA1D_QUESTIONS_BATCH2 } from './cma1d-questions-batch2';
import { CMA1E_QUESTIONS_BATCH1 } from './cma1e-questions-batch1';
import { CMA1E_QUESTIONS_BATCH2 } from './cma1e-questions-batch2';
import { CMA1F_QUESTIONS_BATCH1 } from './cma1f-questions-batch1';
import { CMA1F_QUESTIONS_BATCH2 } from './cma1f-questions-batch2';

// Part 2 Questions
import { CMA2A_QUESTIONS_BATCH1 } from './cma2a-questions-batch1';
import { CMA2A_QUESTIONS_BATCH2 } from './cma2a-questions-batch2';
import { CMA2B_QUESTIONS_BATCH1 } from './cma2b-questions-batch1';
import { CMA2B_QUESTIONS_BATCH2 } from './cma2b-questions-batch2';
import { CMA2C_QUESTIONS_BATCH1 } from './cma2c-questions-batch1';
import { CMA2C_QUESTIONS_BATCH2 } from './cma2c-questions-batch2';
import { CMA2D_QUESTIONS_BATCH1 } from './cma2d-questions-batch1';
import { CMA2D_QUESTIONS_BATCH2 } from './cma2d-questions-batch2';
import { CMA2E_QUESTIONS_BATCH1 } from './cma2e-questions-batch1';
import { CMA2E_QUESTIONS_BATCH2 } from './cma2e-questions-batch2';
import { CMA2F_QUESTIONS_BATCH1 } from './cma2f-questions-batch1';
import { CMA2F_QUESTIONS_BATCH2 } from './cma2f-questions-batch2';

// Calculation Problems (computational practice)
import { CMA1_CALCULATION_PROBLEMS } from './cma1-calculation-problems';
import { CMA2_CALCULATION_PROBLEMS } from './cma2-calculation-problems';
import { CMA1_BULK_QUESTIONS } from './cma1-bulk-questions';
import { CMA2_BULK_QUESTIONS } from './cma2-bulk-questions';

// Re-export individual batches
export {
  CMA1A_QUESTIONS_BATCH1,
  CMA1A_QUESTIONS_BATCH2,
  CMA1B_QUESTIONS_BATCH1,
  CMA1B_QUESTIONS_BATCH2,
  CMA1C_QUESTIONS_BATCH1,
  CMA1C_QUESTIONS_BATCH2,
  CMA1D_QUESTIONS_BATCH1,
  CMA1D_QUESTIONS_BATCH2,
  CMA1E_QUESTIONS_BATCH1,
  CMA1E_QUESTIONS_BATCH2,
  CMA1F_QUESTIONS_BATCH1,
  CMA1F_QUESTIONS_BATCH2,
  CMA2A_QUESTIONS_BATCH1,
  CMA2A_QUESTIONS_BATCH2,
  CMA2B_QUESTIONS_BATCH1,
  CMA2B_QUESTIONS_BATCH2,
  CMA2C_QUESTIONS_BATCH1,
  CMA2C_QUESTIONS_BATCH2,
  CMA2D_QUESTIONS_BATCH1,
  CMA2D_QUESTIONS_BATCH2,
  CMA2E_QUESTIONS_BATCH1,
  CMA2E_QUESTIONS_BATCH2,
  CMA2F_QUESTIONS_BATCH1,
  CMA2F_QUESTIONS_BATCH2,
  CMA1_CALCULATION_PROBLEMS,
  CMA2_CALCULATION_PROBLEMS,
};

// Combined by blueprint area
export const CMA1A_ALL = [...CMA1A_QUESTIONS_BATCH1, ...CMA1A_QUESTIONS_BATCH2];
export const CMA1B_ALL = [...CMA1B_QUESTIONS_BATCH1, ...CMA1B_QUESTIONS_BATCH2];
export const CMA1C_ALL = [...CMA1C_QUESTIONS_BATCH1, ...CMA1C_QUESTIONS_BATCH2];
export const CMA1D_ALL = [...CMA1D_QUESTIONS_BATCH1, ...CMA1D_QUESTIONS_BATCH2];
export const CMA1E_ALL = [...CMA1E_QUESTIONS_BATCH1, ...CMA1E_QUESTIONS_BATCH2];
export const CMA1F_ALL = [...CMA1F_QUESTIONS_BATCH1, ...CMA1F_QUESTIONS_BATCH2];
export const CMA2A_ALL = [...CMA2A_QUESTIONS_BATCH1, ...CMA2A_QUESTIONS_BATCH2];
export const CMA2B_ALL = [...CMA2B_QUESTIONS_BATCH1, ...CMA2B_QUESTIONS_BATCH2];
export const CMA2C_ALL = [...CMA2C_QUESTIONS_BATCH1, ...CMA2C_QUESTIONS_BATCH2];
export const CMA2D_ALL = [...CMA2D_QUESTIONS_BATCH1, ...CMA2D_QUESTIONS_BATCH2];
export const CMA2E_ALL = [...CMA2E_QUESTIONS_BATCH1, ...CMA2E_QUESTIONS_BATCH2];
export const CMA2F_ALL = [...CMA2F_QUESTIONS_BATCH1, ...CMA2F_QUESTIONS_BATCH2];

// Combined question arrays by part
export const CMA_PART1_QUESTIONS = [
  ...CMA1A_ALL,
  ...CMA1B_ALL,
  ...CMA1C_ALL,
  ...CMA1D_ALL,
  ...CMA1E_ALL,
  ...CMA1F_ALL,
  ...CMA1_CALCULATION_PROBLEMS,
  ...CMA1_BULK_QUESTIONS,
];

export const CMA_PART2_QUESTIONS = [
  ...CMA2A_ALL,
  ...CMA2B_ALL,
  ...CMA2C_ALL,
  ...CMA2D_ALL,
  ...CMA2E_ALL,
  ...CMA2F_ALL,
  ...CMA2_CALCULATION_PROBLEMS,
  ...CMA2_BULK_QUESTIONS,
];

// All CMA questions combined
export const CMA_ALL_QUESTIONS = [
  ...CMA_PART1_QUESTIONS,
  ...CMA_PART2_QUESTIONS,
];

// ==========================================
// Helper Functions
// ==========================================

/**
 * Get all questions for a specific section
 */
export function getQuestionsBySection(section: 'CMA1' | 'CMA2') {
  return section === 'CMA1' ? CMA_PART1_QUESTIONS : CMA_PART2_QUESTIONS;
}

/**
 * Get all questions for a specific blueprint area
 */
export function getQuestionsByBlueprintArea(blueprintArea: string) {
  return CMA_ALL_QUESTIONS.filter(q => q.blueprintArea === blueprintArea);
}

/**
 * Get questions by difficulty level
 */
export function getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard') {
  return CMA_ALL_QUESTIONS.filter(q => q.difficulty === difficulty);
}

/**
 * Get questions by topic
 */
export function getQuestionsByTopic(topic: string) {
  return CMA_ALL_QUESTIONS.filter(q => 
    q.topic.toLowerCase().includes(topic.toLowerCase())
  );
}

/**
 * Get a random subset of questions
 */
export function getRandomQuestions(count: number, section?: 'CMA1' | 'CMA2') {
  const pool = section ? getQuestionsBySection(section) : CMA_ALL_QUESTIONS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, pool.length));
}

/**
 * Get question counts by section and blueprint area
 */
export function getQuestionStats() {
  const stats = {
    total: CMA_ALL_QUESTIONS.length,
    part1: {
      total: CMA_PART1_QUESTIONS.length,
      byArea: {
        'CMA1-A': CMA1A_ALL.length,
        'CMA1-B': CMA1B_ALL.length,
        'CMA1-C': CMA1C_ALL.length,
        'CMA1-D': CMA1D_ALL.length,
        'CMA1-E': CMA1E_ALL.length,
        'CMA1-F': CMA1F_ALL.length,
      },
    },
    part2: {
      total: CMA_PART2_QUESTIONS.length,
      byArea: {
        'CMA2-A': CMA2A_ALL.length,
        'CMA2-B': CMA2B_ALL.length,
        'CMA2-C': CMA2C_ALL.length,
        'CMA2-D': CMA2D_ALL.length,
        'CMA2-E': CMA2E_ALL.length,
        'CMA2-F': CMA2F_ALL.length,
      },
    },
    byDifficulty: {
      easy: CMA_ALL_QUESTIONS.filter(q => q.difficulty === 'easy').length,
      medium: CMA_ALL_QUESTIONS.filter(q => q.difficulty === 'medium').length,
      hard: CMA_ALL_QUESTIONS.filter(q => q.difficulty === 'hard').length,
    },
  };
  return stats;
}

/**
 * Create a practice exam with weighted question distribution
 */
export function createPracticeExam(
  part: 'CMA1' | 'CMA2',
  questionCount: number = 100
) {
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

  const examQuestions = [];

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
