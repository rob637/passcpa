/**
 * CPA Study Materials Index
 * Exports all study guides and formula sheets
 */

// Study Guides
export { FAR_STUDY_GUIDE, type CPAStudyGuide, type BlueprintArea, type TopicDetail, type StudyWeek } from './far-study-guide';
export { AUD_STUDY_GUIDE } from './aud-study-guide';
export { REG_STUDY_GUIDE } from './reg-study-guide';
export { BAR_STUDY_GUIDE } from './bar-study-guide';

// Formula Sheet
export { 
  CPA_FORMULA_SHEET, 
  getFormulasBySection, 
  getAllFormulas, 
  searchFormulas,
  type FormulaCategory,
  type Formula 
} from './cpa-formula-sheet';

// Convenience collections
export const CPA_STUDY_GUIDES = {
  FAR: 'far-study-guide',
  AUD: 'aud-study-guide',
  REG: 'reg-study-guide',
  BAR: 'bar-study-guide',
} as const;

export const CPA_SECTIONS = ['FAR', 'AUD', 'REG', 'BAR'] as const;
export type CPASection = typeof CPA_SECTIONS[number];
