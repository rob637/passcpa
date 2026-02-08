/**
 * CMA Study Materials Index
 * 
 * Aggregate exports for all study materials including:
 * - Formula Sheets (comprehensive reference)
 * - Cheat Sheets (exam-day quick reference)
 * - Glossary (searchable key terms)
 * - Study Guides (comprehensive learning resources)
 */

// Formula Sheets
export { CMA1_FORMULA_SHEET, CMA1_QUICK_REFERENCE } from './cma1-formula-sheet';
export type { Formula, FormulaCategory } from './cma1-formula-sheet';
export { CMA2_FORMULA_SHEET, CMA2_QUICK_REFERENCE } from './cma2-formula-sheet';

// Cheat Sheets
export {
  ALL_CMA1_CHEAT_SHEETS,
  ALL_CMA2_CHEAT_SHEETS,
  ALL_CMA_CHEAT_SHEETS,
  CMA1_CHEAT_SHEET_CVP,
  CMA1_CHEAT_SHEET_VARIANCE,
  CMA1_CHEAT_SHEET_PERFORMANCE,
  CMA1_CHEAT_SHEET_BUDGETING,
  CMA2_CHEAT_SHEET_TVM,
  CMA2_CHEAT_SHEET_CAPITAL_BUDGETING,
  CMA2_CHEAT_SHEET_COST_OF_CAPITAL,
  CMA2_CHEAT_SHEET_RATIOS,
  CMA2_CHEAT_SHEET_RISK,
  CMA1_CHEAT_SHEET_INTERNAL_CONTROLS,
  CMA1_CHEAT_SHEET_EXTERNAL_REPORTING,
  CMA1_CHEAT_SHEET_TECHNOLOGY,
  CMA2_CHEAT_SHEET_ETHICS,
} from './cma-cheat-sheets';
export type { CheatSheet, CheatSheetSection, CheatSheetItem } from './cma-cheat-sheets';

// Glossary
export { CMA_GLOSSARY, searchGlossary, getTermsByCategory, getTermsByBlueprintArea } from './cma-glossary';
export type { GlossaryTerm } from './cma-glossary';

// Study Guides
export { CMA1_STUDY_GUIDE } from './cma1-study-guide';
export { CMA2_STUDY_GUIDE } from './cma2-study-guide';
export type { StudyGuide, StudyGuideSection, StudyGuideTopic, StudyPlanWeek } from './cma1-study-guide';
