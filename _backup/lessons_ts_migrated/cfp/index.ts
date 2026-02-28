/**
 * CFP Lessons Index
 * 
 * Central export file for all CFP exam prep lessons.
 * All lessons are now in standard Lesson format with structured sections.
 * Organized by domain and blueprint area.
 */

import type { Lesson } from '../../../types';

// Domain 2: General Principles of Financial Planning (18%)
import { CFP_GEN1_LESSONS } from './gen_planning_process';
import { CFP_GEN2_LESSONS } from './gen_financial_statements';
import { CFP_GEN3_LESSONS } from './gen_time_value_money';
import { CFP_GEN4_LESSONS } from './gen_education_planning';
import { CFP_GEN5_LESSONS } from './gen_economic_debt';

// Domain 4: Investment Planning (11%)
import { CFP_INV1_LESSONS } from './inv_theory';
import { CFP_INV2_LESSONS } from './inv_vehicles';
import { CFP_INV3_LESSONS } from './inv_portfolio';
import { CFP_INV4_LESSONS } from './inv_advanced';
import { CFP_INV_TAX_SENSITIVITY_LESSONS } from './inv_tax_sensitivity';

// Domain 5: Tax Planning (14%)
import { CFP_TAX1_LESSONS } from './tax_fundamentals';
import { CFP_TAX2_LESSONS } from './tax_strategies';
import { TAX_ADVANCED_LESSONS } from './tax_advanced';
import { CFP_TAX4_LESSONS } from './tax_planning';

// Domain 6: Retirement Savings and Income Planning (19%)
import { CFP_RET1_LESSONS } from './ret_needs_analysis';
import { CFP_RET2_LESSONS } from './ret_employer_plans';
import { CFP_RET3_LESSONS } from './ret_individual_plans';
import { CFP_RET4_LESSONS } from './ret_executive_plans';
import { CFP_RET5_LESSONS } from './ret_special_topics';
import { CFP_RET6_LESSONS } from './ret_advanced';

// Domain 7: Estate Planning (12%)
import { CFP_EST1_LESSONS } from './est_documents';
import { CFP_EST2_LESSONS } from './est_taxation';
import { CFP_EST3_LESSONS } from './est_transfers';
import { CFP_EST4_LESSONS } from './est_advanced';

// Domain 3: Risk Management and Insurance Planning (12%)
import { CFP_RIS1_LESSONS } from './ris_fundamentals';
import { CFP_RIS2_LESSONS } from './ris_life_insurance';
import { CFP_RIS3_LESSONS } from './ris_health_disability';
import { CFP_RIS4_LESSONS } from './ris_property_liability';

// Domain 1: Professional Conduct and Regulation (15%)
import { CFP_PRO1_LESSONS } from './pro_standards';
import { CFP_PRO2_LESSONS } from './pro_regulations';
import { PRO_FIDUCIARY_LESSONS } from './pro_fiduciary';

// Domain 8: Psychology of Financial Planning (7%)
import { CFP_PSY_LESSONS } from './psy_behavioral_finance';
import { CFP_PSY2_LESSONS } from './psy_client_counseling';

// Re-export all individual lesson arrays
export { CFP_GEN1_LESSONS, CFP_GEN2_LESSONS, CFP_GEN3_LESSONS, CFP_GEN4_LESSONS, CFP_GEN5_LESSONS };
export { CFP_INV1_LESSONS, CFP_INV2_LESSONS, CFP_INV3_LESSONS, CFP_INV4_LESSONS, CFP_INV_TAX_SENSITIVITY_LESSONS };
export { CFP_TAX1_LESSONS, CFP_TAX2_LESSONS, TAX_ADVANCED_LESSONS, CFP_TAX4_LESSONS };
export { CFP_RET1_LESSONS, CFP_RET2_LESSONS, CFP_RET3_LESSONS, CFP_RET4_LESSONS, CFP_RET5_LESSONS, CFP_RET6_LESSONS };
export { CFP_EST1_LESSONS, CFP_EST2_LESSONS, CFP_EST3_LESSONS, CFP_EST4_LESSONS };
export { CFP_RIS1_LESSONS, CFP_RIS2_LESSONS, CFP_RIS3_LESSONS, CFP_RIS4_LESSONS };
export { CFP_PRO1_LESSONS, CFP_PRO2_LESSONS, PRO_FIDUCIARY_LESSONS };
export { CFP_PSY_LESSONS, CFP_PSY2_LESSONS };

/**
 * All CFP lessons combined in standard Lesson format
 * This is used by the courseDataLoader for consistent lesson handling
 */
export const ALL_CFP_LESSONS: Lesson[] = [
  // Domain 2: General Principles (23 lessons)
  ...CFP_GEN1_LESSONS,
  ...CFP_GEN2_LESSONS,
  ...CFP_GEN3_LESSONS,
  ...CFP_GEN4_LESSONS,
  ...CFP_GEN5_LESSONS,
  
  // Domain 4: Investments (18 lessons)
  ...CFP_INV1_LESSONS,
  ...CFP_INV2_LESSONS,
  ...CFP_INV3_LESSONS,
  ...CFP_INV4_LESSONS,
  ...CFP_INV_TAX_SENSITIVITY_LESSONS,
  
  // Domain 5: Tax Planning (18 lessons)
  ...CFP_TAX1_LESSONS,
  ...CFP_TAX2_LESSONS,
  ...TAX_ADVANCED_LESSONS,
  ...CFP_TAX4_LESSONS,
  
  // Domain 6: Retirement (25 lessons)
  ...CFP_RET1_LESSONS,
  ...CFP_RET2_LESSONS,
  ...CFP_RET3_LESSONS,
  ...CFP_RET4_LESSONS,
  ...CFP_RET5_LESSONS,
  ...CFP_RET6_LESSONS,
  
  // Domain 7: Estate Planning (16 lessons)
  ...CFP_EST1_LESSONS,
  ...CFP_EST2_LESSONS,
  ...CFP_EST3_LESSONS,
  ...CFP_EST4_LESSONS,
  
  // Domain 3: Risk Management and Insurance (13 lessons)
  ...CFP_RIS1_LESSONS,
  ...CFP_RIS2_LESSONS,
  ...CFP_RIS3_LESSONS,
  ...CFP_RIS4_LESSONS,
  
  // Domain 1: Professional Conduct and Regulation (12 lessons)
  ...CFP_PRO1_LESSONS,
  ...CFP_PRO2_LESSONS,
  ...PRO_FIDUCIARY_LESSONS,
  
  // Domain 8: Psychology of Financial Planning (10 lessons)
  ...CFP_PSY_LESSONS,
  ...CFP_PSY2_LESSONS,
];

/**
 * Get lessons by section (formerly domain)
 */
export function getLessonsByDomain(section: string): Lesson[] {
  return ALL_CFP_LESSONS.filter(lesson => lesson.section === section);
}

/**
 * Get lessons by blueprint area
 */
export function getLessonsByArea(area: string): Lesson[] {
  return ALL_CFP_LESSONS.filter(lesson => lesson.blueprintArea === area);
}

/**
 * Get a single lesson by ID
 */
export function getLessonById(id: string): Lesson | undefined {
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
                 CFP_INV3_LESSONS.length + CFP_INV_TAX_SENSITIVITY_LESSONS.length,
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
  'CFP-RISK': {
    name: 'Risk Management and Insurance Planning',
    examWeight: 12,
    lessonCount: CFP_RIS1_LESSONS.length + CFP_RIS2_LESSONS.length + 
                 CFP_RIS3_LESSONS.length + CFP_RIS4_LESSONS.length,
    areas: ['RIS-1', 'RIS-2', 'RIS-3', 'RIS-4']
  },
  'CFP-PCR': {
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
