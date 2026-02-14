/**
 * EA Study Materials Index
 * Exports all EA study guides and formula sheets
 */

export { SEE1_STUDY_GUIDE, type EAStudyGuide, type EADomain, type TopicDetail, type ExamFormat, type StudyWeek } from './see1-study-guide';
export { SEE2_STUDY_GUIDE } from './see2-study-guide';
export { SEE3_STUDY_GUIDE } from './see3-study-guide';
export { EA_FORMULA_SHEET, EA_QUICK_REFERENCE, type EAFormula, type EAFormulaCategory } from './ea-formula-sheet';

// All EA study guides
export const EA_STUDY_GUIDES = {
  SEE1: () => import('./see1-study-guide').then(m => m.SEE1_STUDY_GUIDE),
  SEE2: () => import('./see2-study-guide').then(m => m.SEE2_STUDY_GUIDE),
  SEE3: () => import('./see3-study-guide').then(m => m.SEE3_STUDY_GUIDE),
};
