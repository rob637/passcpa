/**
 * CFP Questions Index
 * 
 * Central export and aggregation for all CFP exam prep questions.
 * Organized by domain to match blueprint areas.
 */

import { Question } from '../../../types';
import { CFP_GEN_QUESTIONS } from './gen_principles';
import { CFP_GEN_BATCH2_QUESTIONS } from './gen_principles_batch2';
import { GEN_PRINCIPLES_BATCH3 } from './gen_principles_batch3';
import { CFP_INV_QUESTIONS } from './investments';
import { CFP_INV_BATCH2_QUESTIONS } from './investments_batch2';
import { INVESTMENTS_BATCH3 } from './investments_batch3';
import { CFP_RET_QUESTIONS } from './retirement';
import { CFP_RET_BATCH2_QUESTIONS } from './retirement_batch2';
import { RETIREMENT_BATCH3 } from './retirement_batch3';
import { CFP_TAX_QUESTIONS } from './tax';
import { CFP_TAX_BATCH2_QUESTIONS } from './tax_batch2';
import { TAX_BATCH3 } from './tax_batch3';
import { CFP_ESTATE_QUESTIONS } from './estate';
import { ESTATE_BATCH2 } from './estate_batch2';
import { CFP_ESTATE_BATCH3_QUESTIONS } from './estate_batch3';
import { CFP_INSURANCE_QUESTIONS } from './insurance';
import { INSURANCE_BATCH2 } from './insurance_batch2';
import { CFP_RISK_BATCH2_QUESTIONS } from './risk_batch2';
import { CFP_PROFESSIONAL_QUESTIONS } from './professional';
import { CFP_PROFESSIONAL_BATCH2_QUESTIONS } from './professional_batch2';
import { CFP_PROFESSIONAL_BATCH3_QUESTIONS } from './professional_batch3';
import { CFP_PSYCHOLOGY_QUESTIONS } from './psychology';
import { CFP_PSYCHOLOGY_BATCH2_QUESTIONS } from './psychology_batch2';
import { CFP_TAX_BATCH4_QUESTIONS } from './tax_batch4';
import { CFP_INVESTMENTS_BATCH4_QUESTIONS } from './investments_batch4';
import { CFP_RETIREMENT_BATCH4_QUESTIONS } from './retirement_batch4';
import { CFP_INVESTMENTS_BATCH5_QUESTIONS } from './investments_batch5';
import { CFP_TAX_BATCH5_QUESTIONS } from './tax_batch5';
import { CFP_GEN_BATCH4_QUESTIONS } from './gen_principles_batch4';
import { CFP_ESTATE_BATCH4_QUESTIONS } from './estate_batch4';
import { CFP_RISK_BATCH3_QUESTIONS } from './risk_batch3';
import { CFP_RETIREMENT_BATCH5_QUESTIONS } from './retirement_batch5';
import { CFP_INVESTMENTS_BATCH6_QUESTIONS } from './investments_batch6';
import { CFP_TAX_BATCH6_QUESTIONS } from './tax_batch6';
import { CFP_PROFESSIONAL_BATCH4_QUESTIONS } from './professional_batch4';
import { CFP_PSYCHOLOGY_BATCH3_QUESTIONS } from './psychology_batch3';
import { CFP_ESTATE_BATCH5_QUESTIONS } from './estate_batch5';
import { CFP_RISK_BATCH4_QUESTIONS } from './risk_batch4';
import { CFP_GEN_BATCH5_QUESTIONS } from './gen_principles_batch5';

// Export individual question banks
export { CFP_GEN_QUESTIONS } from './gen_principles';
export { CFP_INV_QUESTIONS } from './investments';
export { CFP_RET_QUESTIONS } from './retirement';
export { CFP_TAX_QUESTIONS } from './tax';
export { CFP_ESTATE_QUESTIONS } from './estate';
export { CFP_INSURANCE_QUESTIONS } from './insurance';
export { CFP_PROFESSIONAL_QUESTIONS } from './professional';

// Union type for different question formats
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyQuestion = any; // Allow mixed question formats from different batches

// Aggregate all questions - use flexible type to accommodate different question formats
export const CFP_QUESTIONS_ALL: AnyQuestion[] = [
  ...CFP_PROFESSIONAL_QUESTIONS,
  ...CFP_PROFESSIONAL_BATCH2_QUESTIONS,
  ...CFP_PROFESSIONAL_BATCH3_QUESTIONS,
  ...CFP_PROFESSIONAL_BATCH4_QUESTIONS,
  ...CFP_PSYCHOLOGY_QUESTIONS,
  ...CFP_PSYCHOLOGY_BATCH2_QUESTIONS,
  ...CFP_PSYCHOLOGY_BATCH3_QUESTIONS,
  ...CFP_GEN_QUESTIONS,
  ...CFP_GEN_BATCH2_QUESTIONS,
  ...GEN_PRINCIPLES_BATCH3,
  ...CFP_GEN_BATCH4_QUESTIONS,
  ...CFP_GEN_BATCH5_QUESTIONS,
  ...CFP_INV_QUESTIONS,
  ...CFP_INV_BATCH2_QUESTIONS,
  ...INVESTMENTS_BATCH3,
  ...CFP_INVESTMENTS_BATCH4_QUESTIONS,
  ...CFP_INVESTMENTS_BATCH5_QUESTIONS,
  ...CFP_INVESTMENTS_BATCH6_QUESTIONS,
  ...CFP_RET_QUESTIONS,
  ...CFP_RET_BATCH2_QUESTIONS,
  ...RETIREMENT_BATCH3,
  ...CFP_RETIREMENT_BATCH4_QUESTIONS,
  ...CFP_RETIREMENT_BATCH5_QUESTIONS,
  ...CFP_TAX_QUESTIONS,
  ...CFP_TAX_BATCH2_QUESTIONS,
  ...TAX_BATCH3,
  ...CFP_TAX_BATCH4_QUESTIONS,
  ...CFP_TAX_BATCH5_QUESTIONS,
  ...CFP_TAX_BATCH6_QUESTIONS,
  ...CFP_ESTATE_QUESTIONS,
  ...ESTATE_BATCH2,
  ...CFP_ESTATE_BATCH3_QUESTIONS,
  ...CFP_ESTATE_BATCH4_QUESTIONS,
  ...CFP_ESTATE_BATCH5_QUESTIONS,
  ...CFP_INSURANCE_QUESTIONS,
  ...INSURANCE_BATCH2,
  ...CFP_RISK_BATCH2_QUESTIONS,
  ...CFP_RISK_BATCH3_QUESTIONS,
  ...CFP_RISK_BATCH4_QUESTIONS,
];

// Helper to get questions by specific section
export const getCFPQuestions = (sectionId: string): AnyQuestion[] => {
  switch (sectionId) {
    case 'CFP-PCR':
      return [...CFP_PROFESSIONAL_QUESTIONS, ...CFP_PROFESSIONAL_BATCH2_QUESTIONS, ...CFP_PROFESSIONAL_BATCH3_QUESTIONS, ...CFP_PROFESSIONAL_BATCH4_QUESTIONS];
    case 'CFP-GEN':
      return [...CFP_GEN_QUESTIONS, ...CFP_GEN_BATCH2_QUESTIONS, ...GEN_PRINCIPLES_BATCH3, ...CFP_GEN_BATCH4_QUESTIONS, ...CFP_GEN_BATCH5_QUESTIONS];
    case 'CFP-INV':
      return [...CFP_INV_QUESTIONS, ...CFP_INV_BATCH2_QUESTIONS, ...INVESTMENTS_BATCH3, ...CFP_INVESTMENTS_BATCH4_QUESTIONS, ...CFP_INVESTMENTS_BATCH5_QUESTIONS, ...CFP_INVESTMENTS_BATCH6_QUESTIONS];
    case 'CFP-RET':
      return [...CFP_RET_QUESTIONS, ...CFP_RET_BATCH2_QUESTIONS, ...RETIREMENT_BATCH3, ...CFP_RETIREMENT_BATCH4_QUESTIONS, ...CFP_RETIREMENT_BATCH5_QUESTIONS];
    case 'CFP-TAX':
      return [...CFP_TAX_QUESTIONS, ...CFP_TAX_BATCH2_QUESTIONS, ...TAX_BATCH3, ...CFP_TAX_BATCH4_QUESTIONS, ...CFP_TAX_BATCH5_QUESTIONS, ...CFP_TAX_BATCH6_QUESTIONS];
    case 'CFP-EST':
      return [...CFP_ESTATE_QUESTIONS, ...ESTATE_BATCH2, ...CFP_ESTATE_BATCH3_QUESTIONS, ...CFP_ESTATE_BATCH4_QUESTIONS, ...CFP_ESTATE_BATCH5_QUESTIONS] as AnyQuestion[];
    case 'CFP-RIS':
    case 'CFP-RISK':
      return [...CFP_INSURANCE_QUESTIONS, ...INSURANCE_BATCH2, ...CFP_RISK_BATCH2_QUESTIONS, ...CFP_RISK_BATCH3_QUESTIONS, ...CFP_RISK_BATCH4_QUESTIONS] as AnyQuestion[];
    case 'CFP-PSY':
      return [...CFP_PSYCHOLOGY_QUESTIONS, ...CFP_PSYCHOLOGY_BATCH2_QUESTIONS, ...CFP_PSYCHOLOGY_BATCH3_QUESTIONS];
    default:
      return [];
  }
};

// Get questions by blueprint area (e.g., 'RET-1', 'INV-2')
export const getCFPQuestionsByArea = (area: string): AnyQuestion[] => {
  return CFP_QUESTIONS_ALL.filter(q => q.blueprintArea === area);
};

// Get questions by difficulty (for Question type only)
export const getCFPQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Question[] => {
  return CFP_QUESTIONS_ALL.filter((q): q is Question => 
    'difficulty' in q && q.difficulty === difficulty
  );
};

// Statistics (dynamically calculated)
export const CFP_QUESTION_STATS = {
  total: CFP_QUESTIONS_ALL.length,
  byDomain: {
    'CFP-PRO': CFP_PROFESSIONAL_QUESTIONS.length + CFP_PROFESSIONAL_BATCH2_QUESTIONS.length + CFP_PROFESSIONAL_BATCH3_QUESTIONS.length + CFP_PROFESSIONAL_BATCH4_QUESTIONS.length,
    'CFP-GEN': CFP_GEN_QUESTIONS.length + CFP_GEN_BATCH2_QUESTIONS.length + GEN_PRINCIPLES_BATCH3.length + CFP_GEN_BATCH4_QUESTIONS.length + CFP_GEN_BATCH5_QUESTIONS.length,
    'CFP-INV': CFP_INV_QUESTIONS.length + CFP_INV_BATCH2_QUESTIONS.length + INVESTMENTS_BATCH3.length + CFP_INVESTMENTS_BATCH4_QUESTIONS.length + CFP_INVESTMENTS_BATCH5_QUESTIONS.length + CFP_INVESTMENTS_BATCH6_QUESTIONS.length,
    'CFP-RET': CFP_RET_QUESTIONS.length + CFP_RET_BATCH2_QUESTIONS.length + RETIREMENT_BATCH3.length + CFP_RETIREMENT_BATCH4_QUESTIONS.length + CFP_RETIREMENT_BATCH5_QUESTIONS.length,
    'CFP-TAX': CFP_TAX_QUESTIONS.length + CFP_TAX_BATCH2_QUESTIONS.length + TAX_BATCH3.length + CFP_TAX_BATCH4_QUESTIONS.length + CFP_TAX_BATCH5_QUESTIONS.length + CFP_TAX_BATCH6_QUESTIONS.length,
    'CFP-EST': CFP_ESTATE_QUESTIONS.length + ESTATE_BATCH2.length + CFP_ESTATE_BATCH3_QUESTIONS.length + CFP_ESTATE_BATCH4_QUESTIONS.length + CFP_ESTATE_BATCH5_QUESTIONS.length,
    'CFP-RIS': CFP_INSURANCE_QUESTIONS.length + INSURANCE_BATCH2.length + CFP_RISK_BATCH2_QUESTIONS.length + CFP_RISK_BATCH3_QUESTIONS.length + CFP_RISK_BATCH4_QUESTIONS.length,
    'CFP-PSY': CFP_PSYCHOLOGY_QUESTIONS.length + CFP_PSYCHOLOGY_BATCH2_QUESTIONS.length + CFP_PSYCHOLOGY_BATCH3_QUESTIONS.length,
  },
  byDifficulty: {
    easy: CFP_QUESTIONS_ALL.filter(q => 'difficulty' in q && q.difficulty === 'easy').length,
    medium: CFP_QUESTIONS_ALL.filter(q => 'difficulty' in q && q.difficulty === 'medium').length,
    hard: CFP_QUESTIONS_ALL.filter(q => 'difficulty' in q && q.difficulty === 'hard').length,
  }
};

export default CFP_QUESTIONS_ALL;
