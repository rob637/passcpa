/**
 * CIA Glossary Index
 * 
 * Comprehensive reference of 155+ official IIA and internal audit terms
 * Organized by category with search and filtering capabilities
 */

import { CIA_GLOSSARY, GlossaryTerm } from './glossary-core';
import { GLOSSARY_EXTENDED } from './glossary-extended';

// ============================================================================
// Combined Glossary
// ============================================================================

export const ALL_GLOSSARY_TERMS: GlossaryTerm[] = [
  ...CIA_GLOSSARY,
  ...GLOSSARY_EXTENDED,
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get a term by its ID
 */
export function getTermById(id: string): GlossaryTerm | undefined {
  return ALL_GLOSSARY_TERMS.find(t => t.id === id);
}

/**
 * Search glossary by keyword (searches term and definition)
 */
export function searchGlossary(keyword: string): GlossaryTerm[] {
  const lowerKeyword = keyword.toLowerCase();
  return ALL_GLOSSARY_TERMS.filter(t =>
    t.term.toLowerCase().includes(lowerKeyword) ||
    t.definition.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * Get terms by category
 */
export function getTermsByCategory(category: GlossaryTerm['category']): GlossaryTerm[] {
  return ALL_GLOSSARY_TERMS.filter(t => t.category === category);
}

/**
 * Get terms by exam part
 */
export function getTermsByExamPart(part: 'CIA1' | 'CIA2' | 'CIA3'): GlossaryTerm[] {
  return ALL_GLOSSARY_TERMS.filter(t => t.examPart?.includes(part));
}

/**
 * Get high-relevance terms
 */
export function getHighRelevanceTerms(): GlossaryTerm[] {
  return ALL_GLOSSARY_TERMS.filter(t => t.examRelevance === 'high');
}

/**
 * Get terms by exam relevance
 */
export function getTermsByRelevance(relevance: 'high' | 'medium' | 'low'): GlossaryTerm[] {
  return ALL_GLOSSARY_TERMS.filter(t => t.examRelevance === relevance);
}

/**
 * Get related terms for a given term
 */
export function getRelatedTerms(id: string): GlossaryTerm[] {
  const term = getTermById(id);
  if (!term || !term.relatedTerms) return [];
  return term.relatedTerms
    .map(relatedId => getTermById(relatedId))
    .filter((t): t is GlossaryTerm => t !== undefined);
}

/**
 * Get alphabetically sorted terms
 */
export function getAlphabeticalTerms(): GlossaryTerm[] {
  return [...ALL_GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term));
}

/**
 * Get terms grouped by first letter
 */
export function getTermsByLetter(): Record<string, GlossaryTerm[]> {
  const sorted = getAlphabeticalTerms();
  const grouped: Record<string, GlossaryTerm[]> = {};
  
  sorted.forEach(term => {
    const firstLetter = term.term[0].toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(term);
  });
  
  return grouped;
}

// ============================================================================
// Quick Reference
// ============================================================================

/**
 * Category counts
 */
export const CATEGORY_COUNTS: Record<string, number> = {
  core: getTermsByCategory('core').length,
  standards: getTermsByCategory('standards').length,
  risk: getTermsByCategory('risk').length,
  control: getTermsByCategory('control').length,
  governance: getTermsByCategory('governance').length,
  audit_process: getTermsByCategory('audit_process').length,
  it_audit: getTermsByCategory('it_audit').length,
  fraud: getTermsByCategory('fraud').length,
  ethics: getTermsByCategory('ethics').length,
  quality: getTermsByCategory('quality').length,
  financial: getTermsByCategory('financial').length,
  business: getTermsByCategory('business').length,
};

/**
 * Exam part counts
 */
export const EXAM_PART_COUNTS = {
  CIA1: getTermsByExamPart('CIA1').length,
  CIA2: getTermsByExamPart('CIA2').length,
  CIA3: getTermsByExamPart('CIA3').length,
};

/**
 * Total term count
 */
export const TOTAL_TERMS = ALL_GLOSSARY_TERMS.length;

// ============================================================================
// Key Terms for Each Exam Part
// ============================================================================

export const KEY_TERMS_BY_PART = {
  CIA1: [
    'internal-auditing',
    'independence',
    'objectivity',
    'internal-audit-charter',
    'ippf',
    'code-of-ethics',
    'qaip',
    'governance',
    'risk-management',
    'control',
    'three-lines-model',
    'fraud',
    'due-professional-care',
    'proficiency',
  ],
  CIA2: [
    'engagement',
    'risk-based-audit-plan',
    'engagement-objectives',
    'engagement-scope',
    'audit-evidence',
    'working-papers',
    'audit-finding',
    'criteria',
    'condition',
    'cause',
    'effect',
    'sampling',
    'analytical-procedures',
    'follow-up',
  ],
  CIA3: [
    'it-governance',
    'cobit',
    'it-general-controls',
    'cybersecurity',
    'business-continuity',
    'financial-statements',
    'ratio-analysis',
    'balanced-scorecard',
    'kpi',
    'kri',
    'data-analytics',
    'cloud-computing',
    'sox',
  ],
};

// ============================================================================
// Study Aids
// ============================================================================

/**
 * Commonly confused terms
 */
export const COMMONLY_CONFUSED_TERMS = [
  {
    terms: ['independence', 'objectivity'],
    clarification: 'Independence is freedom from conditions threatening the IA ACTIVITY; Objectivity is an unbiased mental attitude of the INDIVIDUAL auditor.',
  },
  {
    terms: ['assurance-services', 'consulting-services'],
    clarification: 'Assurance is independent assessment for third parties; Consulting is advisory services with scope agreed with client.',
  },
  {
    terms: ['internal-assessment', 'external-assessment'],
    clarification: 'Internal includes ongoing monitoring + periodic self-assessment; External is conducted by qualified outside parties every 5 years.',
  },
  {
    terms: ['inherent-risk', 'residual-risk'],
    clarification: 'Inherent is risk before controls; Residual is risk remaining after controls are applied.',
  },
  {
    terms: ['risk-appetite', 'risk-tolerance'],
    clarification: 'Appetite is overall risk willingness; Tolerance is acceptable variation in performance.',
  },
  {
    terms: ['preventive-controls', 'detective-controls'],
    clarification: 'Preventive deter events from occurring; Detective identify events after they happen.',
  },
  {
    terms: ['it-general-controls', 'it-application-controls'],
    clarification: 'ITGCs relate to IT environment as a whole; Application controls pertain to specific applications.',
  },
  {
    terms: ['continuous-auditing', 'continuous-monitoring'],
    clarification: 'Continuous auditing is an internal audit approach; Continuous monitoring is a management responsibility.',
  },
];

/**
 * Acronyms reference
 */
export const ACRONYMS = {
  CAE: 'Chief Audit Executive',
  IA: 'Internal Audit',
  IPPF: 'International Professional Practices Framework',
  QAIP: 'Quality Assurance and Improvement Program',
  GRC: 'Governance, Risk, and Control',
  COSO: 'Committee of Sponsoring Organizations',
  ERM: 'Enterprise Risk Management',
  COBIT: 'Control Objectives for Information and Related Technology',
  ITGC: 'IT General Controls',
  ITAC: 'IT Application Controls',
  SOX: 'Sarbanes-Oxley Act',
  KPI: 'Key Performance Indicator',
  KRI: 'Key Risk Indicator',
  BCP: 'Business Continuity Planning',
  DRP: 'Disaster Recovery Planning',
  RPO: 'Recovery Point Objective',
  RTO: 'Recovery Time Objective',
  SDLC: 'System Development Life Cycle',
  CSA: 'Control Self-Assessment',
  CAATs: 'Computer-Assisted Audit Techniques',
  IDS: 'Intrusion Detection System',
  ROI: 'Return on Investment',
  ROE: 'Return on Equity',
  ROA: 'Return on Assets',
  SWOT: 'Strengths, Weaknesses, Opportunities, Threats',
  ICFR: 'Internal Controls Over Financial Reporting',
  CSR: 'Corporate Social Responsibility',
};

// ============================================================================
// Exports
// ============================================================================

export {
  CIA_GLOSSARY,
  GLOSSARY_EXTENDED,
};

export type { GlossaryTerm };

export default {
  ALL_GLOSSARY_TERMS,
  CIA_GLOSSARY,
  GLOSSARY_EXTENDED,
  getTermById,
  searchGlossary,
  getTermsByCategory,
  getTermsByExamPart,
  getHighRelevanceTerms,
  getTermsByRelevance,
  getRelatedTerms,
  getAlphabeticalTerms,
  getTermsByLetter,
  CATEGORY_COUNTS,
  EXAM_PART_COUNTS,
  TOTAL_TERMS,
  KEY_TERMS_BY_PART,
  COMMONLY_CONFUSED_TERMS,
  ACRONYMS,
};
