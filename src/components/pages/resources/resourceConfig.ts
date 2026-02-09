/**
 * Resource Configuration
 * 
 * Centralized configuration for all study resources across all courses.
 * Each resource type (cheatsheet, study-guide, formula-sheet, mnemonic) 
 * is mapped to its actual data and display configuration.
 */

import { CourseId } from '../../../types/course';
import { LucideIcon, ScrollText, BookOpen, Calculator, Brain, FileText } from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ResourceType = 'cheatsheet' | 'study-guide' | 'formula-sheet' | 'mnemonic' | 'reference';

export interface ResourceItem {
  id: string;
  type: ResourceType;
  title: string;
  description: string;
  section?: string;
  /** Loader function to fetch the actual content */
  loadContent?: () => Promise<unknown>;
  /** For markdown-based content like cheatsheets */
  markdownFile?: string;
}

export interface ResourceCategory {
  type: ResourceType;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  colorLight: string;
  colorDark: string;
  items: ResourceItem[];
}

export interface CourseResourceConfig {
  courseId: CourseId;
  categories: ResourceCategory[];
  /** Optional exam overview info */
  examOverview?: {
    title: string;
    description: string;
    format: string;
    duration: string;
    sections: number;
  };
}

// ============================================================================
// RESOURCE TYPE METADATA
// ============================================================================

export const RESOURCE_TYPE_META: Record<ResourceType, { icon: LucideIcon; label: string; description: string }> = {
  'cheatsheet': { icon: ScrollText, label: 'Cheatsheets', description: 'Quick reference guides for key topics' },
  'study-guide': { icon: BookOpen, label: 'Study Guides', description: 'Comprehensive study materials with study plans' },
  'formula-sheet': { icon: Calculator, label: 'Formula Sheets', description: 'Essential formulas and calculations' },
  'mnemonic': { icon: Brain, label: 'Mnemonics', description: 'Memory aids to help you remember key concepts' },
  'reference': { icon: FileText, label: 'Quick References', description: 'Tables, deadlines, and quick lookups' },
};

// ============================================================================
// CPA RESOURCES
// ============================================================================

const CPA_RESOURCES: CourseResourceConfig = {
  courseId: 'cpa',
  examOverview: {
    title: 'CPA Exam Overview',
    description: 'The Uniform CPA Examination tests candidates on professional competencies for entry-level CPAs.',
    format: '4 sections: FAR, AUD, REG, plus 1 Discipline (BAR, ISC, or TCP)',
    duration: '4 hours per section',
    sections: 4,
  },
  categories: [
    {
      type: 'cheatsheet',
      title: 'Cheatsheets',
      description: 'Quick reference guides for all CPA sections',
      icon: ScrollText,
      color: 'emerald-600',
      colorLight: 'emerald-50',
      colorDark: 'emerald-900/30',
      items: [
        { id: 'cpa-cs-far', type: 'cheatsheet', title: 'FAR Cheatsheet', description: 'Financial statements, leases, EPS, governmental accounting', section: 'FAR', markdownFile: 'far-cheatsheet.md' },
        { id: 'cpa-cs-aud', type: 'cheatsheet', title: 'AUD Cheatsheet', description: 'Audit procedures, evidence, reports, ethics', section: 'AUD', markdownFile: 'aud-cheatsheet.md' },
        { id: 'cpa-cs-reg', type: 'cheatsheet', title: 'REG Cheatsheet', description: 'Individual tax, business, ethics', section: 'REG', markdownFile: 'reg-cheatsheet.md' },
        { id: 'cpa-cs-bar', type: 'cheatsheet', title: 'BAR Cheatsheet', description: 'Analysis and reporting, government, NFP', section: 'BAR', markdownFile: 'bar-cheatsheet.md' },
      ],
    },
    {
      type: 'study-guide',
      title: 'Study Guides',
      description: 'Comprehensive guides with blueprints and study plans',
      icon: BookOpen,
      color: 'blue-600',
      colorLight: 'blue-50',
      colorDark: 'blue-900/30',
      items: [
        { id: 'cpa-sg-far', type: 'study-guide', title: 'FAR Study Guide', description: '4 blueprint areas, 8-week study plan', section: 'FAR' },
        { id: 'cpa-sg-aud', type: 'study-guide', title: 'AUD Study Guide', description: 'Ethics, risk assessment, procedures, reporting', section: 'AUD' },
        { id: 'cpa-sg-reg', type: 'study-guide', title: 'REG Study Guide', description: 'Individual tax, entities, property, ethics', section: 'REG' },
        { id: 'cpa-sg-bar', type: 'study-guide', title: 'BAR Study Guide', description: 'Financial analysis, consolidations, government', section: 'BAR' },
      ],
    },
    {
      type: 'formula-sheet',
      title: 'Formula Sheets',
      description: 'Essential formulas for calculations',
      icon: Calculator,
      color: 'purple-600',
      colorLight: 'purple-50',
      colorDark: 'purple-900/30',
      items: [
        { id: 'cpa-fs-all', type: 'formula-sheet', title: 'CPA Formula Sheet', description: 'Ratios, EPS, depreciation, CVP, bonds, tax calculations' },
      ],
    },
    {
      type: 'mnemonic',
      title: 'Mnemonics',
      description: 'Memory aids for key concepts',
      icon: Brain,
      color: 'amber-600',
      colorLight: 'amber-50',
      colorDark: 'amber-900/30',
      items: [
        { id: 'cpa-mn-far', type: 'mnemonic', title: 'FAR Mnemonics', description: 'CLIP-P, I-DART, DAD GALL, OWNES', section: 'FAR' },
        { id: 'cpa-mn-aud', type: 'mnemonic', title: 'AUD Mnemonics', description: 'CRIME, HAPIE, SCRIPTED, OCEAN', section: 'AUD' },
        { id: 'cpa-mn-reg', type: 'mnemonic', title: 'REG Mnemonics', description: 'HIP MAGIC, MACRS tables', section: 'REG' },
        { id: 'cpa-mn-bar', type: 'mnemonic', title: 'BAR Mnemonics', description: 'Combined analysis and reporting aids', section: 'BAR' },
      ],
    },
  ],
};

// ============================================================================
// EA RESOURCES
// ============================================================================

const EA_RESOURCES: CourseResourceConfig = {
  courseId: 'ea',
  examOverview: {
    title: 'EA Exam Overview',
    description: 'The IRS Special Enrollment Examination (SEE) tests competency in tax representation.',
    format: '3 parts: Individuals, Businesses, Representation',
    duration: '3.5 hours per part',
    sections: 3,
  },
  categories: [
    {
      type: 'cheatsheet',
      title: 'Cheatsheets',
      description: 'Quick reference for all SEE parts',
      icon: ScrollText,
      color: 'emerald-600',
      colorLight: 'emerald-50',
      colorDark: 'emerald-900/30',
      items: [
        { id: 'ea-cs-see1', type: 'cheatsheet', title: 'SEE1 Cheatsheet', description: 'Individual taxation: income, deductions, credits', section: 'SEE1' },
        { id: 'ea-cs-see2', type: 'cheatsheet', title: 'SEE2 Cheatsheet', description: 'Business taxation: entities, depreciation, basis', section: 'SEE2' },
        { id: 'ea-cs-see3', type: 'cheatsheet', title: 'SEE3 Cheatsheet', description: 'Representation: Circular 230, procedures, ethics', section: 'SEE3' },
      ],
    },
    {
      type: 'study-guide',
      title: 'Study Guides',
      description: 'Comprehensive guides with study plans',
      icon: BookOpen,
      color: 'blue-600',
      colorLight: 'blue-50',
      colorDark: 'blue-900/30',
      items: [
        { id: 'ea-sg-see1', type: 'study-guide', title: 'SEE1 Study Guide', description: 'Individual taxation: 5 domains, 8-week plan', section: 'SEE1' },
        { id: 'ea-sg-see2', type: 'study-guide', title: 'SEE2 Study Guide', description: 'Business taxation: 6 domains, entity types', section: 'SEE2' },
        { id: 'ea-sg-see3', type: 'study-guide', title: 'SEE3 Study Guide', description: 'Representation: Circular 230, penalties, ethics', section: 'SEE3' },
      ],
    },
    {
      type: 'formula-sheet',
      title: 'Formula Sheets',
      description: 'Tax formulas and calculations',
      icon: Calculator,
      color: 'purple-600',
      colorLight: 'purple-50',
      colorDark: 'purple-900/30',
      items: [
        { id: 'ea-fs-all', type: 'formula-sheet', title: 'EA Formula Sheet', description: 'Income, SE tax, depreciation, penalties, credits, retirement' },
      ],
    },
    {
      type: 'mnemonic',
      title: 'Mnemonics',
      description: 'Memory aids for tax concepts',
      icon: Brain,
      color: 'amber-600',
      colorLight: 'amber-50',
      colorDark: 'amber-900/30',
      items: [
        { id: 'ea-mn-see1', type: 'mnemonic', title: 'SEE1 Mnemonics', description: 'Dependent tests, filing status, AGI', section: 'SEE1' },
        { id: 'ea-mn-see2', type: 'mnemonic', title: 'SEE2 Mnemonics', description: 'Entity basis, depreciation, QBI', section: 'SEE2' },
        { id: 'ea-mn-see3', type: 'mnemonic', title: 'SEE3 Mnemonics', description: 'Circular 230, penalties, POAs', section: 'SEE3' },
      ],
    },
    {
      type: 'reference',
      title: 'Quick References',
      description: 'Tables and quick lookups',
      icon: FileText,
      color: 'cyan-600',
      colorLight: 'cyan-50',
      colorDark: 'cyan-900/30',
      items: [
        { id: 'ea-ref-forms', type: 'reference', title: 'IRS Form Guide', description: 'Quick reference for common tax forms' },
        { id: 'ea-ref-penalties', type: 'reference', title: 'Penalty Tables', description: 'Taxpayer and preparer penalty amounts' },
        { id: 'ea-ref-deadlines', type: 'reference', title: 'Due Date Guide', description: 'Filing and extension deadlines by entity' },
      ],
    },
  ],
};

// ============================================================================
// CMA RESOURCES
// ============================================================================

const CMA_RESOURCES: CourseResourceConfig = {
  courseId: 'cma',
  examOverview: {
    title: 'CMA Exam Overview',
    description: 'The CMA exam tests competency in management accounting and financial strategy.',
    format: '2 parts: Financial Planning & Analysis, Strategic Financial Management',
    duration: '4 hours per part (including essays)',
    sections: 2,
  },
  categories: [
    {
      type: 'cheatsheet',
      title: 'Cheatsheets',
      description: 'Quick reference for both parts',
      icon: ScrollText,
      color: 'emerald-600',
      colorLight: 'emerald-50',
      colorDark: 'emerald-900/30',
      items: [
        { id: 'cma-cs-p1', type: 'cheatsheet', title: 'Part 1 Cheatsheet', description: 'Budgeting, performance management, cost accounting', section: 'CMA1' },
        { id: 'cma-cs-p2', type: 'cheatsheet', title: 'Part 2 Cheatsheet', description: 'Financial management, decision analysis, ethics', section: 'CMA2' },
      ],
    },
    {
      type: 'study-guide',
      title: 'Study Guides',
      description: 'Comprehensive guides with study plans',
      icon: BookOpen,
      color: 'blue-600',
      colorLight: 'blue-50',
      colorDark: 'blue-900/30',
      items: [
        { id: 'cma-sg-p1', type: 'study-guide', title: 'Part 1 Study Guide', description: 'Financial planning, budgeting, cost management', section: 'CMA1' },
        { id: 'cma-sg-p2', type: 'study-guide', title: 'Part 2 Study Guide', description: 'Corporate finance, decision analysis, ethics', section: 'CMA2' },
      ],
    },
    {
      type: 'formula-sheet',
      title: 'Formula Sheets',
      description: 'Essential formulas for calculations',
      icon: Calculator,
      color: 'purple-600',
      colorLight: 'purple-50',
      colorDark: 'purple-900/30',
      items: [
        { id: 'cma-fs-p1', type: 'formula-sheet', title: 'Part 1 Formulas', description: 'CVP, variances, ratios, budgeting', section: 'CMA1' },
        { id: 'cma-fs-p2', type: 'formula-sheet', title: 'Part 2 Formulas', description: 'TVM, WACC, NPV, capital budgeting', section: 'CMA2' },
      ],
    },
    {
      type: 'mnemonic',
      title: 'Mnemonics',
      description: 'Memory aids for key concepts',
      icon: Brain,
      color: 'amber-600',
      colorLight: 'amber-50',
      colorDark: 'amber-900/30',
      items: [
        { id: 'cma-mn-var', type: 'mnemonic', title: 'Variance Mnemonics', description: 'AQ-SQ, AP-SP variance analysis', section: 'CMA1' },
        { id: 'cma-mn-ratio', type: 'mnemonic', title: 'Ratio Mnemonics', description: 'Liquidity, profitability, leverage', section: 'CMA2' },
      ],
    },
  ],
};

// ============================================================================
// CIA RESOURCES
// ============================================================================

const CIA_RESOURCES: CourseResourceConfig = {
  courseId: 'cia',
  examOverview: {
    title: 'CIA Exam Overview',
    description: 'The CIA exam tests competency in internal auditing for IIA certification.',
    format: '3 parts: Essentials, Practice, Business Knowledge',
    duration: '2-2.5 hours per part',
    sections: 3,
  },
  categories: [
    {
      type: 'cheatsheet',
      title: 'Cheatsheets',
      description: 'Quick reference for all CIA parts',
      icon: ScrollText,
      color: 'emerald-600',
      colorLight: 'emerald-50',
      colorDark: 'emerald-900/30',
      items: [
        { id: 'cia-cs-p1', type: 'cheatsheet', title: 'Part 1 Cheatsheet', description: 'Internal audit fundamentals, standards', section: 'CIA1' },
        { id: 'cia-cs-p2', type: 'cheatsheet', title: 'Part 2 Cheatsheet', description: 'Managing the IA activity', section: 'CIA2' },
        { id: 'cia-cs-p3', type: 'cheatsheet', title: 'Part 3 Cheatsheet', description: 'Business knowledge for IA', section: 'CIA3' },
      ],
    },
    {
      type: 'study-guide',
      title: 'Study Guides',
      description: 'Comprehensive guides with IIA standards',
      icon: BookOpen,
      color: 'blue-600',
      colorLight: 'blue-50',
      colorDark: 'blue-900/30',
      items: [
        { id: 'cia-sg-p1', type: 'study-guide', title: 'Part 1 Study Guide', description: 'IIA Standards, independence, governance', section: 'CIA1' },
        { id: 'cia-sg-p2', type: 'study-guide', title: 'Part 2 Study Guide', description: 'Audit planning, supervision, communication', section: 'CIA2' },
        { id: 'cia-sg-p3', type: 'study-guide', title: 'Part 3 Study Guide', description: 'IT, business processes, financial management', section: 'CIA3' },
      ],
    },
    {
      type: 'formula-sheet',
      title: 'Formula Sheets',
      description: 'Sampling, risk, financial ratios',
      icon: Calculator,
      color: 'purple-600',
      colorLight: 'purple-50',
      colorDark: 'purple-900/30',
      items: [
        { id: 'cia-fs-all', type: 'formula-sheet', title: 'CIA Formula Sheet', description: 'Sampling, risk assessment, DuPont, IT metrics, NPV/IRR' },
      ],
    },
    {
      type: 'mnemonic',
      title: 'Mnemonics',
      description: 'Memory aids for audit concepts',
      icon: Brain,
      color: 'amber-600',
      colorLight: 'amber-50',
      colorDark: 'amber-900/30',
      items: [
        { id: 'cia-mn-3lines', type: 'mnemonic', title: 'Three Lines Model', description: 'Governance, management, IA roles', section: 'CIA1' },
        { id: 'cia-mn-qaip', type: 'mnemonic', title: 'QAIP Framework', description: 'Quality assurance assessments', section: 'CIA2' },
        { id: 'cia-mn-fraud', type: 'mnemonic', title: 'Fraud Triangle', description: 'Opportunity, rationalization, pressure', section: 'CIA3' },
      ],
    },
  ],
};

// ============================================================================
// CFP RESOURCES
// ============================================================================

const CFP_RESOURCES: CourseResourceConfig = {
  courseId: 'cfp',
  examOverview: {
    title: 'CFP Exam Overview',
    description: 'The CFP exam tests competency in comprehensive financial planning.',
    format: '7 domains across financial planning',
    duration: '6 hours (2 sessions)',
    sections: 7,
  },
  categories: [
    {
      type: 'cheatsheet',
      title: 'Cheatsheets',
      description: 'Quick reference for all domains',
      icon: ScrollText,
      color: 'emerald-600',
      colorLight: 'emerald-50',
      colorDark: 'emerald-900/30',
      items: [
        { id: 'cfp-cs-gpp', type: 'cheatsheet', title: 'General Principles', description: 'Ethics, fiduciary duty, practice standards', section: 'GPP' },
        { id: 'cfp-cs-ris', type: 'cheatsheet', title: 'Risk & Insurance', description: 'Life, health, disability, liability', section: 'RIS' },
        { id: 'cfp-cs-inv', type: 'cheatsheet', title: 'Investment Planning', description: 'Asset allocation, portfolio theory', section: 'INV' },
        { id: 'cfp-cs-tax', type: 'cheatsheet', title: 'Tax Planning', description: 'Income, deductions, credits, strategies', section: 'TAX' },
        { id: 'cfp-cs-ret', type: 'cheatsheet', title: 'Retirement Planning', description: 'Qualified plans, Social Security', section: 'RET' },
        { id: 'cfp-cs-est', type: 'cheatsheet', title: 'Estate Planning', description: 'Trusts, transfers, tax strategies', section: 'EST' },
        { id: 'cfp-cs-psy', type: 'cheatsheet', title: 'Psychology of Planning', description: 'Behavioral finance, communication', section: 'PSY' },
      ],
    },
    {
      type: 'study-guide',
      title: 'Study Guides',
      description: 'Comprehensive guides with study plans',
      icon: BookOpen,
      color: 'blue-600',
      colorLight: 'blue-50',
      colorDark: 'blue-900/30',
      items: [
        { id: 'cfp-sg-all', type: 'study-guide', title: 'CFP Comprehensive Guide', description: 'All 7 domains: General, Risk, Investment, Tax, Retirement, Estate, Psychology' },
      ],
    },
    {
      type: 'formula-sheet',
      title: 'Formula Sheets',
      description: 'TVM, investment, retirement formulas',
      icon: Calculator,
      color: 'purple-600',
      colorLight: 'purple-50',
      colorDark: 'purple-900/30',
      items: [
        { id: 'cfp-fs-all', type: 'formula-sheet', title: 'CFP Formula Sheet', description: 'TVM, risk-adjusted returns, retirement, estate, tax' },
      ],
    },
    {
      type: 'mnemonic',
      title: 'Mnemonics',
      description: 'Memory aids for financial planning',
      icon: Brain,
      color: 'amber-600',
      colorLight: 'amber-50',
      colorDark: 'amber-900/30',
      items: [
        { id: 'cfp-mn-secure', type: 'mnemonic', title: 'SECURE 2.0', description: 'Key provisions and age requirements', section: 'RET' },
        { id: 'cfp-mn-ethics', type: 'mnemonic', title: 'CFP Ethics Code', description: 'ACT FAIR - duties to clients', section: 'GPP' },
        { id: 'cfp-mn-trusts', type: 'mnemonic', title: 'Trust Types', description: 'GRAT, GRUT, ILIT, QPRT essentials', section: 'EST' },
      ],
    },
  ],
};

// ============================================================================
// CISA RESOURCES
// ============================================================================

const CISA_RESOURCES: CourseResourceConfig = {
  courseId: 'cisa',
  examOverview: {
    title: 'CISA Exam Overview',
    description: 'The CISA exam tests competency in IS auditing from ISACA.',
    format: '5 domains across IS audit',
    duration: '4 hours (240 minutes)',
    sections: 5,
  },
  categories: [
    {
      type: 'cheatsheet',
      title: 'Cheatsheets',
      description: 'Quick reference for all domains',
      icon: ScrollText,
      color: 'emerald-600',
      colorLight: 'emerald-50',
      colorDark: 'emerald-900/30',
      items: [
        { id: 'cisa-cs-d1', type: 'cheatsheet', title: 'Domain 1 Cheatsheet', description: 'IS Audit Process', section: 'CISA1' },
        { id: 'cisa-cs-d2', type: 'cheatsheet', title: 'Domain 2 Cheatsheet', description: 'IT Governance', section: 'CISA2' },
        { id: 'cisa-cs-d3', type: 'cheatsheet', title: 'Domain 3 Cheatsheet', description: 'IS Acquisition & Development', section: 'CISA3' },
        { id: 'cisa-cs-d4', type: 'cheatsheet', title: 'Domain 4 Cheatsheet', description: 'IS Operations & Resilience', section: 'CISA4' },
        { id: 'cisa-cs-d5', type: 'cheatsheet', title: 'Domain 5 Cheatsheet', description: 'Protection of Information Assets', section: 'CISA5' },
      ],
    },
    {
      type: 'formula-sheet',
      title: 'Formula Sheets',
      description: 'IT audit metrics and calculations',
      icon: Calculator,
      color: 'purple-600',
      colorLight: 'purple-50',
      colorDark: 'purple-900/30',
      items: [
        { id: 'cisa-fs-all', type: 'formula-sheet', title: 'CISA Formula Sheet', description: 'ALE/SLE, RTO/RPO, SDLC metrics, availability, security' },
      ],
    },
    {
      type: 'mnemonic',
      title: 'Mnemonics',
      description: 'Memory aids for IS audit',
      icon: Brain,
      color: 'amber-600',
      colorLight: 'amber-50',
      colorDark: 'amber-900/30',
      items: [
        { id: 'cisa-mn-cobit', type: 'mnemonic', title: 'COBIT 2019', description: 'Governance system and design factors', section: 'CISA2' },
        { id: 'cisa-mn-sdlc', type: 'mnemonic', title: 'SDLC Phases', description: 'Planning through maintenance', section: 'CISA3' },
        { id: 'cisa-mn-bcp', type: 'mnemonic', title: 'BCP/DRP', description: 'RTO, RPO, MTPD key metrics', section: 'CISA4' },
        { id: 'cisa-mn-crypto', type: 'mnemonic', title: 'Cryptography', description: 'Symmetric vs asymmetric, key lengths', section: 'CISA5' },
      ],
    },
  ],
};

// ============================================================================
// EXPORT ALL CONFIGS
// ============================================================================

export const COURSE_RESOURCE_CONFIG: Record<CourseId, CourseResourceConfig> = {
  cpa: CPA_RESOURCES,
  ea: EA_RESOURCES,
  cma: CMA_RESOURCES,
  cia: CIA_RESOURCES,
  cfp: CFP_RESOURCES,
  cisa: CISA_RESOURCES,
};

export function getResourceConfig(courseId: CourseId): CourseResourceConfig {
  return COURSE_RESOURCE_CONFIG[courseId];
}

export function getResourceCategory(courseId: CourseId, type: ResourceType): ResourceCategory | undefined {
  const config = COURSE_RESOURCE_CONFIG[courseId];
  return config?.categories.find(c => c.type === type);
}

export function getResourceItem(courseId: CourseId, type: ResourceType, itemId: string): ResourceItem | undefined {
  const config = COURSE_RESOURCE_CONFIG[courseId];
  const category = config?.categories.find(c => c.type === type);
  return category?.items.find(i => i.id === itemId);
}
