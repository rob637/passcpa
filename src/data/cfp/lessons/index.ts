/**
 * CFP Lessons Index
 * 
 * Central export file for all CFP exam prep lessons.
 * Organized by domain and blueprint area.
 */

// Domain 2: General Principles of Financial Planning (18%)
export { CFP_GEN1_LESSONS } from './gen_planning_process';
export { CFP_GEN2_LESSONS } from './gen_financial_statements';
export { CFP_GEN3_LESSONS } from './gen_time_value_money';
export { CFP_GEN4_LESSONS } from './gen_education_planning';
export { CFP_GEN5_LESSONS } from './gen_economic_debt';

// Domain 4: Investment Planning (11%)
export { CFP_INV1_LESSONS } from './inv_theory';
export { CFP_INV2_LESSONS } from './inv_vehicles';
export { CFP_INV3_LESSONS } from './inv_portfolio';

// Domain 5: Tax Planning (14%)
export { CFP_TAX1_LESSONS } from './tax_fundamentals';
export { CFP_TAX2_LESSONS } from './tax_strategies';
export { TAX_ADVANCED_LESSONS } from './tax_advanced';

// Domain 6: Retirement Savings and Income Planning (19%)
export { CFP_RET1_LESSONS } from './ret_needs_analysis';
export { CFP_RET2_LESSONS } from './ret_employer_plans';
export { CFP_RET3_LESSONS } from './ret_individual_plans';
export { CFP_RET4_LESSONS } from './ret_executive_plans';
export { CFP_RET5_LESSONS } from './ret_special_topics';

// Domain 7: Estate Planning (12%)
export { CFP_EST1_LESSONS } from './est_documents';
export { CFP_EST2_LESSONS } from './est_taxation';
export { CFP_EST3_LESSONS } from './est_transfers';

// Domain 3: Risk Management and Insurance Planning (12%)
export { CFP_RIS1_LESSONS } from './ris_fundamentals';
export { CFP_RIS2_LESSONS } from './ris_life_insurance';
export { CFP_RIS3_LESSONS } from './ris_health_disability';
export { CFP_RIS4_LESSONS } from './ris_property_liability';

// Domain 1: Professional Conduct and Regulation (15%)
export { CFP_PRO1_LESSONS } from './pro_standards';
export { CFP_PRO2_LESSONS } from './pro_regulations';
export { PRO_FIDUCIARY_LESSONS } from './pro_fiduciary';

// Domain 8: Psychology of Financial Planning (7%)
export { CFP_PSY_LESSONS } from './psy_behavioral_finance';

// Import all for combined array
import { CFP_GEN1_LESSONS } from './gen_planning_process';
import { CFP_GEN2_LESSONS } from './gen_financial_statements';
import { CFP_GEN3_LESSONS } from './gen_time_value_money';
import { CFP_GEN4_LESSONS } from './gen_education_planning';
import { CFP_GEN5_LESSONS } from './gen_economic_debt';
import { CFP_INV1_LESSONS } from './inv_theory';
import { CFP_INV2_LESSONS } from './inv_vehicles';
import { CFP_INV3_LESSONS } from './inv_portfolio';
import { CFP_TAX1_LESSONS } from './tax_fundamentals';
import { CFP_TAX2_LESSONS } from './tax_strategies';
import { TAX_ADVANCED_LESSONS } from './tax_advanced';
import { CFP_RET1_LESSONS } from './ret_needs_analysis';
import { CFP_RET2_LESSONS } from './ret_employer_plans';
import { CFP_RET3_LESSONS } from './ret_individual_plans';
import { CFP_RET4_LESSONS } from './ret_executive_plans';
import { CFP_RET5_LESSONS } from './ret_special_topics';
import { CFP_EST1_LESSONS } from './est_documents';
import { CFP_EST2_LESSONS } from './est_taxation';
import { CFP_EST3_LESSONS } from './est_transfers';
import { CFP_RIS1_LESSONS } from './ris_fundamentals';
import { CFP_RIS2_LESSONS } from './ris_life_insurance';
import { CFP_RIS3_LESSONS } from './ris_health_disability';
import { CFP_RIS4_LESSONS } from './ris_property_liability';
import { CFP_PRO1_LESSONS } from './pro_standards';
import { CFP_PRO2_LESSONS } from './pro_regulations';
import { PRO_FIDUCIARY_LESSONS } from './pro_fiduciary';
import { CFP_PSY_LESSONS } from './psy_behavioral_finance';

import { CFPLesson } from '../../../types/cfp';

/**
 * All CFP lessons combined into a single array
 * Sorted by domain and lesson order
 */
export const ALL_CFP_LESSONS: CFPLesson[] = [
  // Domain 2: General Principles (23 lessons)
  ...CFP_GEN1_LESSONS,
  ...CFP_GEN2_LESSONS,
  ...CFP_GEN3_LESSONS,
  ...CFP_GEN4_LESSONS,
  ...CFP_GEN5_LESSONS,
  
  // Domain 4: Investments (12 lessons)
  ...CFP_INV1_LESSONS,
  ...CFP_INV2_LESSONS,
  ...CFP_INV3_LESSONS,
  
  // Domain 5: Tax Planning (12 lessons)
  ...CFP_TAX1_LESSONS,
  ...CFP_TAX2_LESSONS,
  ...TAX_ADVANCED_LESSONS,
  
  // Domain 6: Retirement (20 lessons)
  ...CFP_RET1_LESSONS,
  ...CFP_RET2_LESSONS,
  ...CFP_RET3_LESSONS,
  ...CFP_RET4_LESSONS,
  ...CFP_RET5_LESSONS,
  
  // Domain 7: Estate Planning (12 lessons)
  ...CFP_EST1_LESSONS,
  ...CFP_EST2_LESSONS,
  ...CFP_EST3_LESSONS,
  
  // Domain 3: Risk Management and Insurance (13 lessons)
  ...CFP_RIS1_LESSONS,
  ...CFP_RIS2_LESSONS,
  ...CFP_RIS3_LESSONS,
  ...CFP_RIS4_LESSONS,
  
  // Domain 1: Professional Conduct and Regulation (12 lessons)
  ...CFP_PRO1_LESSONS,
  ...CFP_PRO2_LESSONS,
  ...PRO_FIDUCIARY_LESSONS,
  
  // Domain 8: Psychology of Financial Planning (5 lessons)
  ...CFP_PSY_LESSONS,
];

/**
 * Get lessons by domain
 */
export function getLessonsByDomain(domain: string): CFPLesson[] {
  return ALL_CFP_LESSONS.filter(lesson => lesson.domain === domain);
}

/**
 * Get lessons by blueprint area
 */
export function getLessonsByArea(area: string): CFPLesson[] {
  return ALL_CFP_LESSONS.filter(lesson => lesson.blueprintArea === area);
}

/**
 * Get a single lesson by ID
 */
export function getLessonById(id: string): CFPLesson | undefined {
  return ALL_CFP_LESSONS.find(lesson => lesson.id === id);
}

/**
 * Domain statistics
 */
export const CFP_DOMAIN_STATS = {
  'CFP-GEN': {
    name: 'General Principles of Financial Planning',
    examWeight: 18,
    lessonCount: CFP_GEN1_LESSONS.length + CFP_GEN2_LESSONS.length + 
                 CFP_GEN3_LESSONS.length + CFP_GEN4_LESSONS.length + 
                 CFP_GEN5_LESSONS.length,
    areas: ['GEN-1', 'GEN-2', 'GEN-3', 'GEN-4', 'GEN-5']
  },
  'CFP-INV': {
    name: 'Investment Planning',
    examWeight: 11,
    lessonCount: CFP_INV1_LESSONS.length + CFP_INV2_LESSONS.length + 
                 CFP_INV3_LESSONS.length,
    areas: ['INV-1', 'INV-2', 'INV-3']
  },
  'CFP-TAX': {
    name: 'Tax Planning',
    examWeight: 14,
    lessonCount: CFP_TAX1_LESSONS.length + CFP_TAX2_LESSONS.length + TAX_ADVANCED_LESSONS.length,
    areas: ['TAX-1', 'TAX-2']
  },
  'CFP-RET': {
    name: 'Retirement Savings and Income Planning',
    examWeight: 19,
    lessonCount: CFP_RET1_LESSONS.length + CFP_RET2_LESSONS.length + 
                 CFP_RET3_LESSONS.length + CFP_RET4_LESSONS.length + 
                 CFP_RET5_LESSONS.length,
    areas: ['RET-1', 'RET-2', 'RET-3', 'RET-4', 'RET-5']
  },
  'CFP-EST': {
    name: 'Estate Planning',
    examWeight: 12,
    lessonCount: CFP_EST1_LESSONS.length + CFP_EST2_LESSONS.length + 
                 CFP_EST3_LESSONS.length,
    areas: ['EST-1', 'EST-2', 'EST-3']
  },
  'CFP-RIS': {
    name: 'Risk Management and Insurance Planning',
    examWeight: 12,
    lessonCount: CFP_RIS1_LESSONS.length + CFP_RIS2_LESSONS.length + 
                 CFP_RIS3_LESSONS.length + CFP_RIS4_LESSONS.length,
    areas: ['RIS-1', 'RIS-2', 'RIS-3', 'RIS-4']
  },
  'CFP-PRO': {
    name: 'Professional Conduct and Regulation',
    examWeight: 15,
    lessonCount: CFP_PRO1_LESSONS.length + CFP_PRO2_LESSONS.length + PRO_FIDUCIARY_LESSONS.length,
    areas: ['PRO-1', 'PRO-2']
  },
  'CFP-PSY': {
    name: 'Psychology of Financial Planning',
    examWeight: 7,
    lessonCount: CFP_PSY_LESSONS.length,
    areas: ['PSY-1', 'PSY-2', 'PSY-3']
  }
};

/**
 * Total lesson count
 */
export const TOTAL_LESSON_COUNT = ALL_CFP_LESSONS.length;

export default ALL_CFP_LESSONS;
