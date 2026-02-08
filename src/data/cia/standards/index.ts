/**
 * IIA Standards Reference - Complete Index
 * 
 * Comprehensive database of IIA International Standards for the
 * Professional Practice of Internal Auditing, Code of Ethics,
 * and Core Principles.
 */

import { ATTRIBUTE_STANDARDS, IIAStandard } from './attribute-standards';
import { PERFORMANCE_STANDARDS } from './performance-standards';
import { CODE_OF_ETHICS, CORE_PRINCIPLES, IPPF_FRAMEWORK, EthicsPrinciple, CorePrinciple, IPPFElement } from './code-of-ethics';

// ============================================================================
// Combined Standards Array
// ============================================================================

export const ALL_STANDARDS: IIAStandard[] = [
  ...ATTRIBUTE_STANDARDS,
  ...PERFORMANCE_STANDARDS,
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get a standard by its number (e.g., "1100", "2010")
 */
export function getStandardByNumber(number: string): IIAStandard | undefined {
  return ALL_STANDARDS.find(s => s.number === number);
}

/**
 * Get all standards in a category
 */
export function getStandardsByCategory(category: 'attribute' | 'performance'): IIAStandard[] {
  return ALL_STANDARDS.filter(s => s.category === category);
}

/**
 * Get all standards in a subcategory
 */
export function getStandardsBySubcategory(subcategory: string): IIAStandard[] {
  return ALL_STANDARDS.filter(s => s.subcategory === subcategory);
}

/**
 * Get related standards for a given standard
 */
export function getRelatedStandards(number: string): IIAStandard[] {
  const standard = getStandardByNumber(number);
  if (!standard) return [];
  return standard.relatedStandards
    .map(num => getStandardByNumber(num))
    .filter((s): s is IIAStandard => s !== undefined);
}

/**
 * Search standards by keyword
 */
export function searchStandards(keyword: string): IIAStandard[] {
  const lowerKeyword = keyword.toLowerCase();
  return ALL_STANDARDS.filter(s => 
    s.title.toLowerCase().includes(lowerKeyword) ||
    s.text.toLowerCase().includes(lowerKeyword) ||
    s.keyPoints.some(kp => kp.toLowerCase().includes(lowerKeyword)) ||
    s.examTips.some(et => et.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * Get high-weight exam standards (most commonly tested)
 */
export function getHighWeightStandards(): IIAStandard[] {
  return ALL_STANDARDS.filter(s => s.examWeight === 'high');
}

/**
 * Get standards by exam weight
 */
export function getStandardsByExamWeight(weight: 'high' | 'medium' | 'low'): IIAStandard[] {
  return ALL_STANDARDS.filter(s => s.examWeight === weight);
}

/**
 * Get Code of Ethics principle by name
 */
export function getEthicsPrinciple(name: 'Integrity' | 'Objectivity' | 'Confidentiality' | 'Competency'): EthicsPrinciple | undefined {
  return CODE_OF_ETHICS.find(e => e.name === name);
}

/**
 * Get Core Principle by number
 */
export function getCorePrinciple(number: number): CorePrinciple | undefined {
  return CORE_PRINCIPLES.find(cp => cp.number === number);
}

/**
 * Get mandatory IPPF elements
 */
export function getMandatoryIPPF(): IPPFElement[] {
  return IPPF_FRAMEWORK.filter(e => e.mandatory);
}

// ============================================================================
// Quick Reference Maps
// ============================================================================

/**
 * Standard number to title quick lookup
 */
export const STANDARD_TITLES: Record<string, string> = Object.fromEntries(
  ALL_STANDARDS.map(s => [s.number, s.title])
);

/**
 * Subcategory organization
 */
export const STANDARDS_BY_SUBCATEGORY: Record<string, IIAStandard[]> = {
  Charter: getStandardsBySubcategory('Charter'),
  Independence: getStandardsBySubcategory('Independence'),
  Proficiency: getStandardsBySubcategory('Proficiency'),
  QAIP: getStandardsBySubcategory('QAIP'),
  Managing: getStandardsBySubcategory('Managing'),
  'Nature of Work': getStandardsBySubcategory('Nature of Work'),
  Engagement: getStandardsBySubcategory('Engagement'),
  Communicating: getStandardsBySubcategory('Communicating'),
  Monitoring: getStandardsBySubcategory('Monitoring'),
};

// ============================================================================
// Study Aids
// ============================================================================

/**
 * Key standards summary for quick review
 */
export const KEY_STANDARDS_SUMMARY = {
  charter: {
    standards: ['1000', '1010'],
    keyMessage: 'Charter must be formally documented, approved by board, and reviewed periodically.',
  },
  independence: {
    standards: ['1100', '1110', '1111', '1112', '1120', '1130'],
    keyMessage: 'Independence is activity-level; objectivity is individual-level. Both require disclosure of impairments.',
  },
  proficiency: {
    standards: ['1200', '1210', '1220', '1230'],
    keyMessage: 'Auditors must have KSAs; due care doesn\'t guarantee finding everything; CPD is mandatory.',
  },
  qaip: {
    standards: ['1300', '1310', '1311', '1312', '1320', '1321', '1322'],
    keyMessage: 'Internal (ongoing + periodic) and external (every 5 years) assessments required.',
  },
  managing: {
    standards: ['2000', '2010', '2020', '2030', '2040', '2050', '2060', '2070'],
    keyMessage: 'CAE manages IA activity; risk-based planning; report to management AND board.',
  },
  natureOfWork: {
    standards: ['2100', '2110', '2120', '2130'],
    keyMessage: 'Evaluate and improve governance, risk management, and control processes.',
  },
  engagement: {
    standards: ['2200', '2201', '2210', '2220', '2230', '2240', '2300', '2310', '2320', '2330', '2340'],
    keyMessage: 'Plan each engagement; gather sufficient, reliable, relevant, useful information.',
  },
  communicating: {
    standards: ['2400', '2410', '2420', '2421', '2430', '2431', '2440', '2450'],
    keyMessage: 'Communications must be accurate, objective, clear, concise, constructive, complete, timely.',
  },
  monitoring: {
    standards: ['2500', '2600'],
    keyMessage: 'Follow up on findings; escalate unacceptable risk to board if unresolved.',
  },
};

/**
 * Commonly tested exam topics
 */
export const EXAM_HOT_TOPICS = [
  { topic: 'External Assessment Frequency', answer: 'At least every 5 years', standards: ['1312'] },
  { topic: 'QAIP Components', answer: 'Internal (ongoing + periodic) and External assessments', standards: ['1310', '1311', '1312'] },
  { topic: 'Dual Reporting', answer: 'Functional to board, administrative to management', standards: ['1110'] },
  { topic: 'Charter Approval', answer: 'Board gives final approval', standards: ['1000'] },
  { topic: 'Independence vs Objectivity', answer: 'Independence = activity level; Objectivity = individual level', standards: ['1100'] },
  { topic: 'Information Qualities', answer: 'Sufficient, reliable, relevant, useful', standards: ['2310'] },
  { topic: 'Communication Qualities', answer: 'Accurate, objective, clear, concise, constructive, complete, timely', standards: ['2420'] },
  { topic: 'Control Objectives', answer: 'Strategic objectives, information reliability, operations efficiency, asset safeguarding, compliance', standards: ['2130'] },
  { topic: 'Risk Management Criteria', answer: 'Objectives align with mission, risks identified, responses selected, information communicated', standards: ['2120'] },
  { topic: 'Annual Confirmation', answer: 'CAE confirms organizational independence to board annually', standards: ['1110'] },
];

// ============================================================================
// Exports
// ============================================================================

export {
  ATTRIBUTE_STANDARDS,
  PERFORMANCE_STANDARDS,
  CODE_OF_ETHICS,
  CORE_PRINCIPLES,
  IPPF_FRAMEWORK,
};

export type {
  IIAStandard,
  EthicsPrinciple,
  CorePrinciple,
  IPPFElement,
};

export default {
  ALL_STANDARDS,
  ATTRIBUTE_STANDARDS,
  PERFORMANCE_STANDARDS,
  CODE_OF_ETHICS,
  CORE_PRINCIPLES,
  IPPF_FRAMEWORK,
  getStandardByNumber,
  getStandardsByCategory,
  getStandardsBySubcategory,
  getRelatedStandards,
  searchStandards,
  getHighWeightStandards,
  getStandardsByExamWeight,
  getEthicsPrinciple,
  getCorePrinciple,
  getMandatoryIPPF,
  STANDARD_TITLES,
  STANDARDS_BY_SUBCATEGORY,
  KEY_STANDARDS_SUMMARY,
  EXAM_HOT_TOPICS,
};
