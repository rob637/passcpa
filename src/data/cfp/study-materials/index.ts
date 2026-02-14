/**
 * CFP Study Materials Index
 * Exports all study guides and formula sheets
 */

// Study Guide
export { 
  CFP_COMPREHENSIVE_GUIDE, 
  type CFPStudyGuide, 
  type CFPDomain, 
  type TopicArea,
  type ExamFormat 
} from './cfp-study-guide';

// Formula Sheet
export { 
  CFP_FORMULA_SHEET, 
  getFormulasByDomain, 
  getAllCFPFormulas, 
  searchCFPFormulas,
  type CFPFormulaCategory,
  type CFPFormula 
} from './cfp-formula-sheet';

// Convenience exports
export const CFP_DOMAINS = [
  'GEN',   // General Principles
  'RISK',  // Risk Management & Insurance
  'INV',   // Investment Planning
  'TAX',   // Tax Planning
  'RET',   // Retirement Planning
  'EST',   // Estate Planning
  'PSY',   // Psychology of Financial Planning
] as const;

export type CFPDomainCode = typeof CFP_DOMAINS[number];
