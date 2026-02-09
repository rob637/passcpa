/**
 * Study Resources Utility
 * 
 * Aggregates study materials, cheatsheets, mnemonics, and quick references
 * for each course. Used by ExamGuide to display available resources.
 */

import { CourseId } from '../types/course';

export interface StudyResource {
  id: string;
  type: 'cheatsheet' | 'study-guide' | 'formula-sheet' | 'mnemonic' | 'reference';
  title: string;
  description: string;
  section?: string;
  topics?: string[];
  route?: string;
}

export interface CourseStudyResources {
  cheatsheets: StudyResource[];
  studyGuides: StudyResource[];
  formulaSheets: StudyResource[];
  mnemonics: StudyResource[];
  references: StudyResource[];
}

// CPA Resources
const CPA_RESOURCES: CourseStudyResources = {
  cheatsheets: [
    { id: 'cpa-cs-far', type: 'cheatsheet', title: 'FAR Cheatsheet', description: 'Financial statements, leases, equity, government', section: 'FAR' },
    { id: 'cpa-cs-aud', type: 'cheatsheet', title: 'AUD Cheatsheet', description: 'Audit procedures, evidence, reports, ethics', section: 'AUD' },
    { id: 'cpa-cs-reg', type: 'cheatsheet', title: 'REG Cheatsheet', description: 'Individual, business, and ethics taxation', section: 'REG' },
    { id: 'cpa-cs-bar', type: 'cheatsheet', title: 'BAR Cheatsheet', description: 'Analysis and reporting, combined topics', section: 'BAR' },
  ],
  studyGuides: [
    { id: 'cpa-sg-far', type: 'study-guide', title: 'FAR Study Guide', description: 'Financial Accounting & Reporting: 4 blueprint areas, 8-week study plan', section: 'FAR' },
    { id: 'cpa-sg-aud', type: 'study-guide', title: 'AUD Study Guide', description: 'Auditing & Attestation: Ethics, risk assessment, procedures, reporting', section: 'AUD' },
    { id: 'cpa-sg-reg', type: 'study-guide', title: 'REG Study Guide', description: 'Taxation & Regulation: Individual tax, entities, property, ethics', section: 'REG' },
    { id: 'cpa-sg-bar', type: 'study-guide', title: 'BAR Study Guide', description: 'Business Analysis & Reporting: Financial analysis, consolidations, government, NFP', section: 'BAR' },
  ],
  formulaSheets: [
    { id: 'cpa-fs-all', type: 'formula-sheet', title: 'CPA Formula Sheet', description: 'Comprehensive formulas: ratios, EPS, depreciation, CVP, bonds, tax calculations' },
  ],
  mnemonics: [
    { id: 'cpa-mn-far', type: 'mnemonic', title: 'FAR Mnemonics', description: 'CLIP-P, I-DART, DAD GALL, OWNES, and more', section: 'FAR' },
    { id: 'cpa-mn-aud', type: 'mnemonic', title: 'AUD Mnemonics', description: 'CRIME, HAPIE, SCRIPTED, OCEAN for audit', section: 'AUD' },
    { id: 'cpa-mn-reg', type: 'mnemonic', title: 'REG Mnemonics', description: 'HIP MAGIC, LIFO/FIFO, MACRS tables', section: 'REG' },
    { id: 'cpa-mn-bar', type: 'mnemonic', title: 'BAR Mnemonics', description: 'Combined analysis and reporting memory aids', section: 'BAR' },
  ],
  references: [],
};

// CMA Resources
const CMA_RESOURCES: CourseStudyResources = {
  cheatsheets: [
    { id: 'cma-cs-p1', type: 'cheatsheet', title: 'Part 1 Cheatsheet', description: 'Budgeting, performance management, cost accounting', section: 'CMA1' },
    { id: 'cma-cs-p2', type: 'cheatsheet', title: 'Part 2 Cheatsheet', description: 'Financial management, decision analysis, ethics', section: 'CMA2' },
  ],
  studyGuides: [
    { id: 'cma-sg-p1', type: 'study-guide', title: 'Part 1 Study Guide', description: 'Comprehensive guide with study plans and tips', section: 'CMA1' },
    { id: 'cma-sg-p2', type: 'study-guide', title: 'Part 2 Study Guide', description: 'Complete Part 2 preparation guide', section: 'CMA2' },
  ],
  formulaSheets: [
    { id: 'cma-fs-p1', type: 'formula-sheet', title: 'Part 1 Formulas', description: 'CVP, variances, ratios, budgeting formulas', section: 'CMA1' },
    { id: 'cma-fs-p2', type: 'formula-sheet', title: 'Part 2 Formulas', description: 'TVM, WACC, NPV, capital budgeting formulas', section: 'CMA2' },
  ],
  mnemonics: [
    { id: 'cma-mn-var', type: 'mnemonic', title: 'Variance Mnemonics', description: 'AQ-SQ, AP-SP variance analysis', section: 'CMA1' },
    { id: 'cma-mn-ratio', type: 'mnemonic', title: 'Ratio Mnemonics', description: 'Liquidity, profitability, leverage ratios', section: 'CMA2' },
  ],
  references: [],
};

// EA Resources
const EA_RESOURCES: CourseStudyResources = {
  cheatsheets: [
    { id: 'ea-cs-see1', type: 'cheatsheet', title: 'SEE1 Cheatsheet', description: 'Individual taxation: income, deductions, credits', section: 'SEE1' },
    { id: 'ea-cs-see2', type: 'cheatsheet', title: 'SEE2 Cheatsheet', description: 'Business taxation: entities, depreciation, basis', section: 'SEE2' },
    { id: 'ea-cs-see3', type: 'cheatsheet', title: 'SEE3 Cheatsheet', description: 'Representation: Circular 230, procedures, ethics', section: 'SEE3' },
  ],
  studyGuides: [
    { id: 'ea-sg-see1', type: 'study-guide', title: 'SEE1 Study Guide', description: 'Individual Taxation: income, deductions, credits, 5 domains, 8-week study plan', section: 'SEE1' },
    { id: 'ea-sg-see2', type: 'study-guide', title: 'SEE2 Study Guide', description: 'Business Taxation: entities, depreciation, employment taxes, 6 domains', section: 'SEE2' },
    { id: 'ea-sg-see3', type: 'study-guide', title: 'SEE3 Study Guide', description: 'Representation: Circular 230, penalties, IRS procedures, ethics', section: 'SEE3' },
  ],
  formulaSheets: [
    { id: 'ea-fs-all', type: 'formula-sheet', title: 'EA Formula Sheet', description: 'Tax formulas: income, SE tax, depreciation, penalties, statutes, credits, retirement' },
  ],
  mnemonics: [
    { id: 'ea-mn-dep', type: 'mnemonic', title: 'Dependent Tests', description: 'CARES for qualifying child, SUPORT for relative', section: 'SEE1' },
    { id: 'ea-mn-basis', type: 'mnemonic', title: 'Basis Mnemonics', description: 'Inside/outside basis for partnerships and S-corps', section: 'SEE2' },
    { id: 'ea-mn-c230', type: 'mnemonic', title: 'Circular 230', description: 'PRACTITIONER duties and restrictions', section: 'SEE3' },
  ],
  references: [
    { id: 'ea-ref-forms', type: 'reference', title: 'IRS Form Guide', description: 'Quick reference for common tax forms' },
    { id: 'ea-ref-penalties', type: 'reference', title: 'Penalty Tables', description: 'Taxpayer and preparer penalty amounts' },
    { id: 'ea-ref-deadlines', type: 'reference', title: 'Due Date Guide', description: 'Filing and extension deadlines by entity type' },
  ],
};

// CIA Resources
const CIA_RESOURCES: CourseStudyResources = {
  cheatsheets: [
    { id: 'cia-cs-p1', type: 'cheatsheet', title: 'Part 1 Cheatsheet', description: 'Internal audit fundamentals and standards', section: 'CIA1' },
    { id: 'cia-cs-p2', type: 'cheatsheet', title: 'Part 2 Cheatsheet', description: 'Managing the internal audit activity', section: 'CIA2' },
    { id: 'cia-cs-p3', type: 'cheatsheet', title: 'Part 3 Cheatsheet', description: 'Business knowledge for internal auditing', section: 'CIA3' },
  ],
  studyGuides: [
    { id: 'cia-sg-p1', type: 'study-guide', title: 'Part 1 Study Guide', description: 'IIA Standards, independence, governance', section: 'CIA1' },
    { id: 'cia-sg-p2', type: 'study-guide', title: 'Part 2 Study Guide', description: 'Audit planning, supervision, communication', section: 'CIA2' },
    { id: 'cia-sg-p3', type: 'study-guide', title: 'Part 3 Study Guide', description: 'IT, business processes, financial management', section: 'CIA3' },
  ],
  formulaSheets: [
    { id: 'cia-fs-all', type: 'formula-sheet', title: 'CIA Formula Sheet', description: 'Sampling, risk assessment, financial ratios, DuPont, IT metrics, NPV/IRR' },
  ],
  mnemonics: [
    { id: 'cia-mn-3lines', type: 'mnemonic', title: 'Three Lines Model', description: 'Governance, management, internal audit roles', section: 'CIA1' },
    { id: 'cia-mn-qaip', type: 'mnemonic', title: 'QAIP Framework', description: 'Quality assurance internal/external assessments', section: 'CIA2' },
    { id: 'cia-mn-fraud', type: 'mnemonic', title: 'Fraud Triangle', description: 'Opportunity, rationalization, pressure', section: 'CIA3' },
  ],
  references: [],
};

// CFP Resources
const CFP_RESOURCES: CourseStudyResources = {
  cheatsheets: [
    { id: 'cfp-cs-gpp', type: 'cheatsheet', title: 'General Principles', description: 'Ethics, fiduciary duty, practice standards', section: 'GPP' },
    { id: 'cfp-cs-ris', type: 'cheatsheet', title: 'Risk & Insurance', description: 'Life, health, disability, liability coverage', section: 'RIS' },
    { id: 'cfp-cs-inv', type: 'cheatsheet', title: 'Investment Planning', description: 'Asset allocation, strategies, portfolio theory', section: 'INV' },
    { id: 'cfp-cs-tax', type: 'cheatsheet', title: 'Tax Planning', description: 'Income, deductions, credits, strategies', section: 'TAX' },
    { id: 'cfp-cs-ret', type: 'cheatsheet', title: 'Retirement Planning', description: 'Qualified plans, Social Security, distributions', section: 'RET' },
    { id: 'cfp-cs-est', type: 'cheatsheet', title: 'Estate Planning', description: 'Trusts, transfers, tax planning strategies', section: 'EST' },
    { id: 'cfp-cs-psy', type: 'cheatsheet', title: 'Psychology of Planning', description: 'Behavioral finance, client communication', section: 'PSY' },
  ],
  studyGuides: [
    { id: 'cfp-sg-all', type: 'study-guide', title: 'CFP Comprehensive Guide', description: 'All 7 domains: General, Risk, Investment, Tax, Retirement, Estate, Psychology' },
  ],
  formulaSheets: [
    { id: 'cfp-fs-all', type: 'formula-sheet', title: 'CFP Formula Sheet', description: 'TVM, investment, risk-adjusted returns, retirement, estate, tax formulas' },
  ],
  mnemonics: [
    { id: 'cfp-mn-secure', type: 'mnemonic', title: 'SECURE 2.0', description: 'Key provisions and age requirements', section: 'RET' },
    { id: 'cfp-mn-ethics', type: 'mnemonic', title: 'CFP Ethics Code', description: 'ACT FAIR - duties to clients and profession', section: 'GPP' },
    { id: 'cfp-mn-trusts', type: 'mnemonic', title: 'Trust Types', description: 'GRAT, GRUT, ILIT, QPRT essentials', section: 'EST' },
  ],
  references: [],
};

// CISA Resources
const CISA_RESOURCES: CourseStudyResources = {
  cheatsheets: [
    { id: 'cisa-cs-d1', type: 'cheatsheet', title: 'Domain 1 Cheatsheet', description: 'IS Audit Process fundamentals', section: 'CISA1' },
    { id: 'cisa-cs-d2', type: 'cheatsheet', title: 'Domain 2 Cheatsheet', description: 'Governance and management of IT', section: 'CISA2' },
    { id: 'cisa-cs-d3', type: 'cheatsheet', title: 'Domain 3 Cheatsheet', description: 'IS acquisition and development', section: 'CISA3' },
    { id: 'cisa-cs-d4', type: 'cheatsheet', title: 'Domain 4 Cheatsheet', description: 'IS operations and resilience', section: 'CISA4' },
    { id: 'cisa-cs-d5', type: 'cheatsheet', title: 'Domain 5 Cheatsheet', description: 'Protection of information assets', section: 'CISA5' },
  ],
  studyGuides: [
    { id: 'cisa-sg-d1', type: 'study-guide', title: 'Domain 1 Guide', description: 'Complete IS audit process guide', section: 'CISA1' },
    { id: 'cisa-sg-d2', type: 'study-guide', title: 'Domain 2 Guide', description: 'IT governance best practices', section: 'CISA2' },
    { id: 'cisa-sg-d3', type: 'study-guide', title: 'Domain 3 Guide', description: 'SDLC and project management', section: 'CISA3' },
    { id: 'cisa-sg-d4', type: 'study-guide', title: 'Domain 4 Guide', description: 'Operations, BCP, and DRP', section: 'CISA4' },
    { id: 'cisa-sg-d5', type: 'study-guide', title: 'Domain 5 Guide', description: 'Security controls and cryptography', section: 'CISA5' },
  ],
  formulaSheets: [
    { id: 'cisa-fs-all', type: 'formula-sheet', title: 'CISA Formula Sheet', description: 'Audit sampling, risk (ALE/SLE), availability, RTO/RPO, SDLC metrics, security' },
  ],
  mnemonics: [
    { id: 'cisa-mn-cobit', type: 'mnemonic', title: 'COBIT 2019', description: 'Governance system and design factors', section: 'CISA2' },
    { id: 'cisa-mn-sdlc', type: 'mnemonic', title: 'SDLC Phases', description: 'Planning through maintenance phases', section: 'CISA3' },
    { id: 'cisa-mn-bcp', type: 'mnemonic', title: 'BCP/DRP', description: 'RTO, RPO, MTPD key metrics', section: 'CISA4' },
    { id: 'cisa-mn-crypto', type: 'mnemonic', title: 'Cryptography', description: 'Symmetric vs asymmetric, key lengths', section: 'CISA5' },
  ],
  references: [],
};

// Resource map by course
const COURSE_RESOURCES: Record<CourseId, CourseStudyResources> = {
  cpa: CPA_RESOURCES,
  cma: CMA_RESOURCES,
  ea: EA_RESOURCES,
  cia: CIA_RESOURCES,
  cfp: CFP_RESOURCES,
  cisa: CISA_RESOURCES,
};

/**
 * Get study resources for a specific course
 */
export function getStudyResources(courseId: CourseId): CourseStudyResources {
  return COURSE_RESOURCES[courseId] || {
    cheatsheets: [],
    studyGuides: [],
    formulaSheets: [],
    mnemonics: [],
    references: [],
  };
}

/**
 * Get all resources flattened for a course
 */
export function getAllResources(courseId: CourseId): StudyResource[] {
  const resources = getStudyResources(courseId);
  return [
    ...resources.cheatsheets,
    ...resources.studyGuides,
    ...resources.formulaSheets,
    ...resources.mnemonics,
    ...resources.references,
  ];
}

/**
 * Get resource count summary for a course
 */
export function getResourceCounts(courseId: CourseId): Record<string, number> {
  const resources = getStudyResources(courseId);
  return {
    cheatsheets: resources.cheatsheets.length,
    studyGuides: resources.studyGuides.length,
    formulaSheets: resources.formulaSheets.length,
    mnemonics: resources.mnemonics.length,
    references: resources.references.length,
    total: getAllResources(courseId).length,
  };
}
