// CFP Question Bank Index — JSON-based
// Loads all CFP questions from consolidated JSON files in content/cfp/
// This replaces the 90+ batch imports with clean per-section JSON data

import type { Question } from '../../../types';
import { Difficulty, normalizeDifficulty } from '../../../types';

// Import consolidated JSON files (Vite handles JSON imports natively)
import estData from '../../../../content/cfp/CFP-EST/questions.json';
import genData from '../../../../content/cfp/CFP-GEN/questions.json';
import invData from '../../../../content/cfp/CFP-INV/questions.json';
import pcrData from '../../../../content/cfp/CFP-PCR/questions.json';
import psyData from '../../../../content/cfp/CFP-PSY/questions.json';
import retData from '../../../../content/cfp/CFP-RET/questions.json';
import riskData from '../../../../content/cfp/CFP-RISK/questions.json';
import taxData from '../../../../content/cfp/CFP-TAX/questions.json';

// Type for the JSON structure
interface QuestionFile {
  section: string;
  exportedAt: string;
  questions: Question[];
}

// Cast and extract questions arrays
const estQuestions = (estData as QuestionFile).questions;
const genQuestions = (genData as QuestionFile).questions;
const invQuestions = (invData as QuestionFile).questions;
const pcrQuestions = (pcrData as QuestionFile).questions;
const psyQuestions = (psyData as QuestionFile).questions;
const retQuestions = (retData as QuestionFile).questions;
const riskQuestions = (riskData as QuestionFile).questions;
const taxQuestions = (taxData as QuestionFile).questions;

// Section map for lookups
const sectionMap: Record<string, Question[]> = {
  'CFP-EST': estQuestions,
  'CFP-GEN': genQuestions,
  'CFP-INV': invQuestions,
  'CFP-PCR': pcrQuestions,
  'CFP-PSY': psyQuestions,
  'CFP-RET': retQuestions,
  'CFP-RISK': riskQuestions,
  'CFP-TAX': taxQuestions,
};

// Combined question bank (all sections)
export const CFP_QUESTIONS_ALL: Question[] = [
  ...pcrQuestions,
  ...psyQuestions,
  ...genQuestions,
  ...invQuestions,
  ...retQuestions,
  ...taxQuestions,
  ...estQuestions,
  ...riskQuestions,
];

// Legacy named exports for backward compatibility
export const CFP_GEN_QUESTIONS = genQuestions;
export const CFP_INV_QUESTIONS = invQuestions;
export const CFP_RET_QUESTIONS = retQuestions;
export const CFP_TAX_QUESTIONS = taxQuestions;
export const CFP_ESTATE_QUESTIONS = estQuestions;
export const CFP_INSURANCE_QUESTIONS = riskQuestions;
export const CFP_PROFESSIONAL_QUESTIONS = pcrQuestions;

// Helper to get questions by specific section
export const getCFPQuestions = (sectionId: string): Question[] => {
  return sectionMap[sectionId] ?? [];
};

// Get questions by blueprint area (e.g., 'RET-1', 'INV-2')
export const getCFPQuestionsByArea = (area: string): Question[] => {
  return CFP_QUESTIONS_ALL.filter(q => q.blueprintArea === area);
};

// Get questions by difficulty
export const getCFPQuestionsByDifficulty = (difficulty: Difficulty): Question[] => {
  const normalized = normalizeDifficulty(difficulty);
  return CFP_QUESTIONS_ALL.filter(q => normalizeDifficulty(q.difficulty) === normalized);
};

// Statistics (dynamically calculated from JSON data)
export const CFP_QUESTION_STATS = {
  total: CFP_QUESTIONS_ALL.length,
  byDomain: {
    'CFP-PCR': pcrQuestions.length,
    'CFP-GEN': genQuestions.length,
    'CFP-INV': invQuestions.length,
    'CFP-RET': retQuestions.length,
    'CFP-TAX': taxQuestions.length,
    'CFP-EST': estQuestions.length,
    'CFP-RISK': riskQuestions.length,
    'CFP-PSY': psyQuestions.length,
  },
  byDifficulty: {
    easy: CFP_QUESTIONS_ALL.filter(q => normalizeDifficulty(q.difficulty) === 'easy').length,
    medium: CFP_QUESTIONS_ALL.filter(q => normalizeDifficulty(q.difficulty) === 'medium').length,
    hard: CFP_QUESTIONS_ALL.filter(q => normalizeDifficulty(q.difficulty) === 'hard').length,
  },
};

export default CFP_QUESTIONS_ALL;
