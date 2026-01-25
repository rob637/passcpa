// CPA Exam Configuration - Updated for 2026 CPA Evolution Model
// Based on official AICPA Blueprints effective January 2026
// Tax sections (REG, TCP) will update July 1, 2026 for H.R. 1 provisions

// ============================================================================
// CPA EVOLUTION MODEL OVERVIEW
// - 3 Core Sections (mandatory): AUD, FAR, REG
// - 3 Discipline Sections (choose 1): BAR, ISC, TCP
// - 30-month window to pass all 4 sections (updated from 18 months)
// ============================================================================

import { ExamSection } from '../types';

export interface SectionConfig {
  id: ExamSection;
  name: string;
  shortName: string;
  type: 'core' | 'discipline' | 'strategy' | 'legacy';
  examLength: number;
  questionTypes: { mcq: number; tbs: number };
  mcqWeight: number;
  tbsWeight: number;
  color: string;
  icon: string;
  description: string;
  blueprintVersion: string;
  careerFit?: string[];
  pendingUpdate?: {
    effectiveDate: string;
    description: string;
  };
}

export const CPA_SECTIONS: Record<ExamSection, SectionConfig> = {
  // =========================================================================
  // STRATEGY SECTION (Universal)
  // =========================================================================
  PREP: {
    id: 'PREP',
    name: 'Exam Strategy & Preparation',
    shortName: 'PREP',
    type: 'strategy',
    examLength: 0,
    questionTypes: { mcq: 0, tbs: 0 },
    mcqWeight: 0,
    tbsWeight: 0,
    color: '#6366f1', // indigo
    icon: 'Compass',
    description: 'Master time management, scoring, and study strategies',
    blueprintVersion: 'Universal',
  },

  // =========================================================================
  // CORE SECTIONS (Required for all candidates)
  // =========================================================================
  AUD: {
    id: 'AUD',
    name: 'Auditing and Attestation',
    shortName: 'AUD',
    type: 'core',
    examLength: 4, // hours
    questionTypes: { mcq: 78, tbs: 7 },
    mcqWeight: 50, // % of score
    tbsWeight: 50,
    color: '#3b82f6', // blue
    icon: 'Search',
    description: 'Ethics, risk assessment, audit evidence, and reporting',
    blueprintVersion: '2026.1',
  },
  FAR: {
    id: 'FAR',
    name: 'Financial Accounting and Reporting',
    shortName: 'FAR',
    type: 'core',
    examLength: 4,
    questionTypes: { mcq: 50, tbs: 7 },
    mcqWeight: 50,
    tbsWeight: 50,
    color: '#22c55e', // green
    icon: 'Calculator',
    description: 'Financial reporting for for-profit, NFP, and governmental entities',
    blueprintVersion: '2026.1',
  },
  REG: {
    id: 'REG',
    name: 'Taxation and Regulation',
    shortName: 'REG',
    type: 'core',
    examLength: 4,
    questionTypes: { mcq: 72, tbs: 8 },
    mcqWeight: 50,
    tbsWeight: 50,
    color: '#f59e0b', // amber
    icon: 'Scale',
    description: 'Ethics, business law, and federal tax compliance',
    blueprintVersion: '2026.1',
    // H.R. 1 provisions become testable July 1, 2026
    pendingUpdate: {
      effectiveDate: '2026-07-01',
      description: 'H.R. 1 "One Big Beautiful Bill" Act provisions',
    },
  },

  // =========================================================================
  // DISCIPLINE SECTIONS (Choose one based on career path)
  // =========================================================================
  BAR: {
    id: 'BAR',
    name: 'Business Analysis and Reporting',
    shortName: 'BAR',
    type: 'discipline',
    examLength: 4,
    questionTypes: { mcq: 50, tbs: 7 },
    mcqWeight: 50,
    tbsWeight: 50,
    color: '#8b5cf6', // violet
    icon: 'TrendingUp',
    description: 'Technical accounting, state/local government, and data analytics',
    blueprintVersion: '2026.1',
    careerFit: ['Public Accounting', 'Corporate Finance', 'Government'],
  },
  ISC: {
    id: 'ISC',
    name: 'Information Systems and Controls',
    shortName: 'ISC',
    type: 'discipline',
    examLength: 4,
    questionTypes: { mcq: 82, tbs: 6 },
    mcqWeight: 60, // Highest MCQ weight of all sections
    tbsWeight: 40,
    color: '#06b6d4', // cyan
    icon: 'Shield',
    description: 'IT audit, data management, cybersecurity, and SOC engagements',
    blueprintVersion: '2026.1',
    careerFit: ['IT Audit', 'Cybersecurity', 'Risk Advisory'],
  },
  TCP: {
    id: 'TCP',
    name: 'Tax Compliance and Planning',
    shortName: 'TCP',
    type: 'discipline',
    examLength: 4,
    questionTypes: { mcq: 68, tbs: 7 },
    mcqWeight: 50,
    tbsWeight: 50,
    color: '#ec4899', // pink
    icon: 'FileText',
    description: 'Advanced individual and entity tax planning',
    blueprintVersion: '2026.1',
    careerFit: ['Tax Practice', 'Wealth Management', 'Corporate Tax'],
    // H.R. 1 provisions become testable July 1, 2026
    pendingUpdate: {
      effectiveDate: '2026-07-01',
      description: 'H.R. 1 "One Big Beautiful Bill" Act provisions',
    },
  },
  BEC: {
    id: 'BEC',
    name: 'Business Environment and Concepts',
    shortName: 'BEC',
    type: 'legacy',
    examLength: 0,
    questionTypes: { mcq: 0, tbs: 0 },
    mcqWeight: 0,
    tbsWeight: 0,
    color: '#9ca3af',
    icon: 'Briefcase',
    description: 'Retired section (replaced by Disciplines)',
    blueprintVersion: 'Legacy',
  },
};

export const STRATEGY_SECTIONS = ['PREP'];
export const CORE_SECTIONS = ['AUD', 'FAR', 'REG'];
export const DISCIPLINE_SECTIONS = ['BAR', 'ISC', 'TCP'];

// ============================================================================
// EXAM TIMING AND RULES
// ============================================================================

export const EXAM_RULES = {
  // Updated from 18 months to 30 months as of 2024
  passingWindowMonths: 30,
  passingScore: 75,
  sectionsRequired: 4, // 3 Core + 1 Discipline
  testingWindows: 'Continuous year-round testing',
  scoreRelease: 'Rolling release, typically 1-2 weeks after testing window',
};

// Point values for activities
export const POINT_VALUES = {
  mcq_easy: 1,
  mcq_medium: 2,
  mcq_hard: 3,
  tbs_basic: 5,
  tbs_complex: 10,
  lesson_short: 10, // < 30 min
  lesson_medium: 15, // 30-60 min
  lesson_long: 20, // > 60 min
  flashcard_review: 0.5,
  weak_area_multiplier: 1.5,
};

// Default daily goals by study intensity
export const DAILY_GOAL_PRESETS = [
  {
    id: 'light',
    name: 'Light',
    points: 30,
    time: '~1 hour/day',
    description: 'Steady progress for those with limited time',
    weeksToPass: 16,
  },
  {
    id: 'moderate',
    name: 'Moderate',
    points: 50,
    time: '~2 hours/day',
    description: 'Balanced approach for working professionals',
    weeksToPass: 10,
  },
  {
    id: 'intensive',
    name: 'Intensive',
    points: 80,
    time: '~3 hours/day',
    description: 'Accelerated pace for dedicated studying',
    weeksToPass: 6,
  },
  {
    id: 'full-time',
    name: 'Full-Time',
    points: 150,
    time: '~5+ hours/day',
    description: 'Maximum intensity for full-time candidates',
    weeksToPass: 4,
  },
];

// Question difficulty levels
export const DIFFICULTY_LEVELS = {
  easy: { label: 'Easy', value: 'easy', color: 'green', weight: 0.3, skillLevel: 'Remember/Understand' },
  medium: { label: 'Medium', value: 'medium', color: 'amber', weight: 0.5, skillLevel: 'Apply/Analyze' },
  hard: { label: 'Hard', value: 'hard', color: 'red', weight: 0.2, skillLevel: 'Evaluate/Create' },
};

// Passing score
export const PASSING_SCORE = 75;

// ============================================================================
// OFFICIAL AICPA EXAM BLUEPRINTS - 2026 CPA Evolution
// Structure: Area > Group > Topic > Representative Task
// ============================================================================

export const EXAM_BLUEPRINTS: Record<string, any> = {
  // =========================================================================
  // AUD - AUDITING AND ATTESTATION
  // =========================================================================
  AUD: {
    name: 'Auditing and Attestation',
    areas: [
      {
        id: 'AUD-I',
        name: 'Ethics, Professional Responsibilities, and General Principles',
        weightRange: [15, 25],
        groups: [
          {
            id: 'AUD-I-A',
            name: 'Nature and Scope of Engagements',
            topics: [
              { id: 'AUD-I-A-1', name: 'Overall objectives and limitations of an audit' },
              { id: 'AUD-I-A-2', name: 'Auditing standards hierarchy' },
              { id: 'AUD-I-A-3', name: 'Types of engagements and related standards' },
            ],
          },
          {
            id: 'AUD-I-B',
            name: 'Ethics, Independence, and Professional Conduct',
            topics: [
              { id: 'AUD-I-B-1', name: 'AICPA Code of Professional Conduct' },
              { id: 'AUD-I-B-2', name: 'Independence requirements' },
              { id: 'AUD-I-B-3', name: 'SEC and PCAOB independence rules' },
              { id: 'AUD-I-B-4', name: 'Conflicts of interest' },
            ],
          },
          {
            id: 'AUD-I-C',
            name: 'Communication with Management and Those Charged with Governance',
            topics: [
              { id: 'AUD-I-C-1', name: 'Engagement letters and terms' },
              { id: 'AUD-I-C-2', name: 'Required communications' },
            ],
          },
        ],
      },
      {
        id: 'AUD-II',
        name: 'Assessing Risk and Developing a Planned Response',
        weightRange: [25, 35],
        groups: [
          {
            id: 'AUD-II-A',
            name: 'Planning an Engagement',
            topics: [
              { id: 'AUD-II-A-1', name: 'Preliminary engagement activities' },
              { id: 'AUD-II-A-2', name: 'Materiality determination' },
              { id: 'AUD-II-A-3', name: 'Audit risk model' },
            ],
          },
          {
            id: 'AUD-II-B',
            name: 'Understanding the Entity and Its Environment',
            topics: [
              { id: 'AUD-II-B-1', name: 'Industry and regulatory factors' },
              { id: 'AUD-II-B-2', name: 'Business operations and strategy' },
              { id: 'AUD-II-B-3', name: 'Financial performance measures' },
            ],
          },
          {
            id: 'AUD-II-C',
            name: 'Understanding Internal Control',
            topics: [
              { id: 'AUD-II-C-1', name: 'Components of internal control' },
              { id: 'AUD-II-C-2', name: 'Evaluating design and implementation' },
              { id: 'AUD-II-C-3', name: 'IT general and application controls' },
            ],
          },
          {
            id: 'AUD-II-D',
            name: 'Assessing Risks of Material Misstatement',
            topics: [
              { id: 'AUD-II-D-1', name: 'Identifying and assessing RMM' },
              { id: 'AUD-II-D-2', name: 'Significant risks' },
              { id: 'AUD-II-D-3', name: 'Fraud risk factors' },
            ],
          },
        ],
      },
      {
        id: 'AUD-III',
        name: 'Performing Further Procedures and Obtaining Evidence',
        weightRange: [30, 40],
        groups: [
          {
            id: 'AUD-III-A',
            name: 'Understanding Sufficient Appropriate Audit Evidence',
            topics: [
              { id: 'AUD-III-A-1', name: 'Relevance and reliability' },
              { id: 'AUD-III-A-2', name: 'External confirmations' },
              { id: 'AUD-III-A-3', name: 'Analytical procedures' },
            ],
          },
          {
            id: 'AUD-III-B',
            name: 'Sampling',
            topics: [
              { id: 'AUD-III-B-1', name: 'Statistical vs non-statistical sampling' },
              { id: 'AUD-III-B-2', name: 'Sample design and selection' },
              { id: 'AUD-III-B-3', name: 'Evaluating sample results' },
            ],
          },
          {
            id: 'AUD-III-C',
            name: 'Specific Areas of Audit',
            topics: [
              { id: 'AUD-III-C-1', name: 'Accounting estimates' },
              { id: 'AUD-III-C-2', name: 'Related parties' },
              { id: 'AUD-III-C-3', name: 'Going concern evaluation' },
              { id: 'AUD-III-C-4', name: 'Subsequent events' },
            ],
          },
          {
            id: 'AUD-III-D',
            name: 'Using the Work of Others',
            topics: [
              { id: 'AUD-III-D-1', name: 'Internal auditors' },
              { id: 'AUD-III-D-2', name: 'Component auditors' },
              { id: 'AUD-III-D-3', name: 'Specialists and experts' },
            ],
          },
        ],
      },
      {
        id: 'AUD-IV',
        name: 'Forming Conclusions and Reporting',
        weightRange: [15, 25],
        groups: [
          {
            id: 'AUD-IV-A',
            name: 'Reports on Auditing Engagements',
            topics: [
              { id: 'AUD-IV-A-1', name: 'Unmodified opinion' },
              { id: 'AUD-IV-A-2', name: 'Modified opinions' },
              { id: 'AUD-IV-A-3', name: 'Emphasis of matter and other matter paragraphs' },
              { id: 'AUD-IV-A-4', name: 'Comparative financial statements' },
            ],
          },
          {
            id: 'AUD-IV-B',
            name: 'Reports on Attestation Engagements',
            topics: [
              { id: 'AUD-IV-B-1', name: 'Examination engagements' },
              { id: 'AUD-IV-B-2', name: 'Review engagements' },
              { id: 'AUD-IV-B-3', name: 'Agreed-upon procedures' },
            ],
          },
          {
            id: 'AUD-IV-C',
            name: 'Accounting and Review Service Engagements',
            topics: [
              { id: 'AUD-IV-C-1', name: 'Compilation engagements' },
              { id: 'AUD-IV-C-2', name: 'Review engagements' },
              { id: 'AUD-IV-C-3', name: 'Preparation engagements' },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // FAR - FINANCIAL ACCOUNTING AND REPORTING
  // =========================================================================
  FAR: {
    name: 'Financial Accounting and Reporting',
    areas: [
      {
        id: 'FAR-I',
        name: 'Conceptual Framework and Standard Setting',
        weightRange: [5, 15],
        groups: [
          {
            id: 'FAR-I-A',
            name: 'Financial Reporting Conceptual Framework',
            topics: [
              { id: 'FAR-I-A-1', name: 'FASB Conceptual Framework' },
              { id: 'FAR-I-A-2', name: 'Qualitative characteristics' },
              { id: 'FAR-I-A-3', name: 'Elements of financial statements' },
            ],
          },
          {
            id: 'FAR-I-B',
            name: 'Standard Setting Process',
            topics: [
              { id: 'FAR-I-B-1', name: 'FASB, GASB, and IASB' },
              { id: 'FAR-I-B-2', name: 'SEC reporting requirements' },
            ],
          },
        ],
      },
      {
        id: 'FAR-II',
        name: 'Financial Statement Accounts',
        weightRange: [30, 40],
        groups: [
          {
            id: 'FAR-II-A',
            name: 'Cash and Cash Equivalents',
            topics: [
              { id: 'FAR-II-A-1', name: 'Bank reconciliations' },
              { id: 'FAR-II-A-2', name: 'Restricted cash' },
            ],
          },
          {
            id: 'FAR-II-B',
            name: 'Receivables',
            topics: [
              { id: 'FAR-II-B-1', name: 'Accounts receivable' },
              { id: 'FAR-II-B-2', name: 'Allowance for credit losses (CECL)' },
              { id: 'FAR-II-B-3', name: 'Notes receivable' },
              { id: 'FAR-II-B-4', name: 'Factoring and pledging' },
            ],
          },
          {
            id: 'FAR-II-C',
            name: 'Inventory',
            topics: [
              { id: 'FAR-II-C-1', name: 'Cost flow assumptions (FIFO, LIFO, Weighted Avg)' },
              { id: 'FAR-II-C-2', name: 'Lower of cost or net realizable value' },
              { id: 'FAR-II-C-3', name: 'Dollar-value LIFO' },
            ],
          },
          {
            id: 'FAR-II-D',
            name: 'Property, Plant, and Equipment',
            topics: [
              { id: 'FAR-II-D-1', name: 'Acquisition and capitalization' },
              { id: 'FAR-II-D-2', name: 'Depreciation methods' },
              { id: 'FAR-II-D-3', name: 'Impairment' },
              { id: 'FAR-II-D-4', name: 'Disposals and exchanges' },
            ],
          },
          {
            id: 'FAR-II-E',
            name: 'Investments',
            topics: [
              { id: 'FAR-II-E-1', name: 'Debt securities classification' },
              { id: 'FAR-II-E-2', name: 'Equity securities' },
              { id: 'FAR-II-E-3', name: 'Equity method investments' },
              { id: 'FAR-II-E-4', name: 'Fair value measurement' },
            ],
          },
          {
            id: 'FAR-II-F',
            name: 'Intangibles and Goodwill',
            topics: [
              { id: 'FAR-II-F-1', name: 'Internally developed intangibles' },
              { id: 'FAR-II-F-2', name: 'Acquired intangibles' },
              { id: 'FAR-II-F-3', name: 'Goodwill impairment' },
            ],
          },
          {
            id: 'FAR-II-G',
            name: 'Payables and Accrued Liabilities',
            topics: [
              { id: 'FAR-II-G-1', name: 'Accounts payable' },
              { id: 'FAR-II-G-2', name: 'Accrued liabilities' },
              { id: 'FAR-II-G-3', name: 'Asset retirement obligations' },
            ],
          },
          {
            id: 'FAR-II-H',
            name: 'Long-term Debt',
            topics: [
              { id: 'FAR-II-H-1', name: 'Notes payable' },
              { id: 'FAR-II-H-2', name: 'Bonds payable' },
              { id: 'FAR-II-H-3', name: 'Debt modifications and extinguishments' },
            ],
          },
          {
            id: 'FAR-II-I',
            name: 'Stockholders Equity',
            topics: [
              { id: 'FAR-II-I-1', name: 'Issuance of stock' },
              { id: 'FAR-II-I-2', name: 'Treasury stock' },
              { id: 'FAR-II-I-3', name: 'Dividends' },
              { id: 'FAR-II-I-4', name: 'Stock compensation' },
            ],
          },
        ],
      },
      {
        id: 'FAR-III',
        name: 'Transactions',
        weightRange: [25, 35],
        groups: [
          {
            id: 'FAR-III-A',
            name: 'Revenue Recognition',
            topics: [
              { id: 'FAR-III-A-1', name: 'Five-step model (ASC 606)' },
              { id: 'FAR-III-A-2', name: 'Performance obligations' },
              { id: 'FAR-III-A-3', name: 'Variable consideration' },
              { id: 'FAR-III-A-4', name: 'Contract costs' },
            ],
          },
          {
            id: 'FAR-III-B',
            name: 'Leases',
            topics: [
              { id: 'FAR-III-B-1', name: 'Lease classification (ASC 842)' },
              { id: 'FAR-III-B-2', name: 'Lessee accounting' },
              { id: 'FAR-III-B-3', name: 'Lessor accounting' },
              { id: 'FAR-III-B-4', name: 'Sale-leaseback transactions' },
            ],
          },
          {
            id: 'FAR-III-C',
            name: 'Income Taxes',
            topics: [
              { id: 'FAR-III-C-1', name: 'Deferred tax assets and liabilities' },
              { id: 'FAR-III-C-2', name: 'Valuation allowance' },
              { id: 'FAR-III-C-3', name: 'Uncertain tax positions' },
            ],
          },
          {
            id: 'FAR-III-D',
            name: 'Pensions and Other Post-Employment Benefits',
            topics: [
              { id: 'FAR-III-D-1', name: 'Defined benefit plans' },
              { id: 'FAR-III-D-2', name: 'Pension expense components' },
              { id: 'FAR-III-D-3', name: 'OPEB' },
            ],
          },
          {
            id: 'FAR-III-E',
            name: 'Contingencies and Commitments',
            topics: [
              { id: 'FAR-III-E-1', name: 'Loss contingencies' },
              { id: 'FAR-III-E-2', name: 'Gain contingencies' },
              { id: 'FAR-III-E-3', name: 'Guarantees' },
            ],
          },
          {
            id: 'FAR-III-F',
            name: 'Earnings Per Share',
            topics: [
              { id: 'FAR-III-F-1', name: 'Basic EPS' },
              { id: 'FAR-III-F-2', name: 'Diluted EPS' },
              { id: 'FAR-III-F-3', name: 'Complex capital structures' },
            ],
          },
        ],
      },
      {
        id: 'FAR-IV',
        name: 'State and Local Government',
        weightRange: [10, 20],
        groups: [
          {
            id: 'FAR-IV-A',
            name: 'Governmental Accounting Concepts',
            topics: [
              { id: 'FAR-IV-A-1', name: 'Measurement focus and basis of accounting' },
              { id: 'FAR-IV-A-2', name: 'Fund accounting' },
              { id: 'FAR-IV-A-3', name: 'Budgetary accounting' },
            ],
          },
          {
            id: 'FAR-IV-B',
            name: 'Government-wide Financial Statements',
            topics: [
              { id: 'FAR-IV-B-1', name: 'Statement of Net Position' },
              { id: 'FAR-IV-B-2', name: 'Statement of Activities' },
            ],
          },
          {
            id: 'FAR-IV-C',
            name: 'Fund Financial Statements',
            topics: [
              { id: 'FAR-IV-C-1', name: 'Governmental funds' },
              { id: 'FAR-IV-C-2', name: 'Proprietary funds' },
              { id: 'FAR-IV-C-3', name: 'Fiduciary funds' },
            ],
          },
        ],
      },
      {
        id: 'FAR-V',
        name: 'Not-for-Profit Entities',
        weightRange: [5, 15],
        groups: [
          {
            id: 'FAR-V-A',
            name: 'NFP Financial Statements',
            topics: [
              { id: 'FAR-V-A-1', name: 'Statement of Financial Position' },
              { id: 'FAR-V-A-2', name: 'Statement of Activities' },
              { id: 'FAR-V-A-3', name: 'Statement of Cash Flows' },
            ],
          },
          {
            id: 'FAR-V-B',
            name: 'NFP Specific Topics',
            topics: [
              { id: 'FAR-V-B-1', name: 'Contributions and pledges' },
              { id: 'FAR-V-B-2', name: 'Net asset classifications' },
              { id: 'FAR-V-B-3', name: 'Split-interest agreements' },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // REG - TAXATION AND REGULATION
  // Note: H.R. 1 provisions testable July 1, 2026
  // =========================================================================
  REG: {
    name: 'Taxation and Regulation',
    areas: [
      {
        id: 'REG-I',
        name: 'Ethics, Professional Responsibilities, and Federal Tax Procedures',
        weightRange: [10, 20],
        groups: [
          {
            id: 'REG-I-A',
            name: 'Ethics and Responsibilities in Tax Practice',
            topics: [
              { id: 'REG-I-A-1', name: 'Treasury Circular 230' },
              { id: 'REG-I-A-2', name: 'AICPA SSTS' },
              { id: 'REG-I-A-3', name: 'Tax preparer penalties' },
            ],
          },
          {
            id: 'REG-I-B',
            name: 'Federal Tax Procedures',
            topics: [
              { id: 'REG-I-B-1', name: 'Filing requirements and deadlines' },
              { id: 'REG-I-B-2', name: 'Statute of limitations' },
              { id: 'REG-I-B-3', name: 'IRS audit process' },
              { id: 'REG-I-B-4', name: 'Taxpayer penalties' },
            ],
          },
        ],
      },
      {
        id: 'REG-II',
        name: 'Business Law',
        weightRange: [10, 20],
        groups: [
          {
            id: 'REG-II-A',
            name: 'Agency',
            topics: [
              { id: 'REG-II-A-1', name: 'Formation and authority of agents' },
              { id: 'REG-II-A-2', name: 'Duties and liabilities' },
            ],
          },
          {
            id: 'REG-II-B',
            name: 'Contracts',
            topics: [
              { id: 'REG-II-B-1', name: 'Formation and enforceability' },
              { id: 'REG-II-B-2', name: 'Performance and remedies' },
              { id: 'REG-II-B-3', name: 'Third-party rights' },
            ],
          },
          {
            id: 'REG-II-C',
            name: 'Business Structures',
            topics: [
              { id: 'REG-II-C-1', name: 'Sole proprietorships' },
              { id: 'REG-II-C-2', name: 'Partnerships' },
              { id: 'REG-II-C-3', name: 'Corporations' },
              { id: 'REG-II-C-4', name: 'LLCs' },
            ],
          },
          {
            id: 'REG-II-D',
            name: 'Debtor-Creditor Relationships',
            topics: [
              { id: 'REG-II-D-1', name: 'Secured transactions (UCC Article 9)' },
              { id: 'REG-II-D-2', name: 'Bankruptcy basics' },
            ],
          },
        ],
      },
      {
        id: 'REG-III',
        name: 'Federal Taxation of Individuals',
        weightRange: [22, 32],
        groups: [
          {
            id: 'REG-III-A',
            name: 'Gross Income',
            topics: [
              { id: 'REG-III-A-1', name: 'Inclusions in gross income' },
              { id: 'REG-III-A-2', name: 'Exclusions from gross income' },
              { id: 'REG-III-A-3', name: 'H.R.1: Tip income exclusion', hr1: true, effectiveDate: '2025-01-01' },
            ],
          },
          {
            id: 'REG-III-B',
            name: 'Deductions',
            topics: [
              { id: 'REG-III-B-1', name: 'Above-the-line deductions' },
              { id: 'REG-III-B-2', name: 'Standard vs itemized deductions' },
              { id: 'REG-III-B-3', name: 'Qualified business income (199A)' },
              { id: 'REG-III-B-4', name: 'H.R.1: State and local tax deduction', hr1: true, effectiveDate: '2025-01-01' },
            ],
          },
          {
            id: 'REG-III-C',
            name: 'Filing Status and Dependents',
            topics: [
              { id: 'REG-III-C-1', name: 'Filing status determination' },
              { id: 'REG-III-C-2', name: 'Qualifying child/relative tests' },
            ],
          },
          {
            id: 'REG-III-D',
            name: 'Tax Credits',
            topics: [
              { id: 'REG-III-D-1', name: 'Child tax credit' },
              { id: 'REG-III-D-2', name: 'Earned income credit' },
              { id: 'REG-III-D-3', name: 'Education credits' },
              { id: 'REG-III-D-4', name: 'H.R.1: Enhanced child tax credit', hr1: true, effectiveDate: '2025-01-01' },
            ],
          },
          {
            id: 'REG-III-E',
            name: 'Property Transactions',
            topics: [
              { id: 'REG-III-E-1', name: 'Basis determination' },
              { id: 'REG-III-E-2', name: 'Capital gains and losses' },
              { id: 'REG-III-E-3', name: 'Section 1231 assets' },
              { id: 'REG-III-E-4', name: 'Like-kind exchanges (Section 1031)' },
              { id: 'REG-III-E-5', name: 'Section 121 exclusion' },
            ],
          },
        ],
      },
      {
        id: 'REG-IV',
        name: 'Federal Taxation of Entities',
        weightRange: [23, 33],
        groups: [
          {
            id: 'REG-IV-A',
            name: 'C Corporations',
            topics: [
              { id: 'REG-IV-A-1', name: 'Formation and capitalization' },
              { id: 'REG-IV-A-2', name: 'Taxable income computation' },
              { id: 'REG-IV-A-3', name: 'Distributions' },
              { id: 'REG-IV-A-4', name: 'Accumulated earnings tax' },
              { id: 'REG-IV-A-5', name: 'Personal holding company tax' },
            ],
          },
          {
            id: 'REG-IV-B',
            name: 'S Corporations',
            topics: [
              { id: 'REG-IV-B-1', name: 'Eligibility and election' },
              { id: 'REG-IV-B-2', name: 'Shareholder basis' },
              { id: 'REG-IV-B-3', name: 'Built-in gains tax' },
              { id: 'REG-IV-B-4', name: 'Distributions and AAA' },
            ],
          },
          {
            id: 'REG-IV-C',
            name: 'Partnerships',
            topics: [
              { id: 'REG-IV-C-1', name: 'Formation and contributions' },
              { id: 'REG-IV-C-2', name: 'Partner basis calculations' },
              { id: 'REG-IV-C-3', name: 'Allocations and distributions' },
              { id: 'REG-IV-C-4', name: 'Sales and liquidations' },
            ],
          },
          {
            id: 'REG-IV-D',
            name: 'Trusts and Estates',
            topics: [
              { id: 'REG-IV-D-1', name: 'Fiduciary income tax' },
              { id: 'REG-IV-D-2', name: 'Distributable net income' },
              { id: 'REG-IV-D-3', name: 'Simple vs complex trusts' },
            ],
          },
          {
            id: 'REG-IV-E',
            name: 'Tax-Exempt Entities',
            topics: [
              { id: 'REG-IV-E-1', name: 'Section 501(c)(3) requirements' },
              { id: 'REG-IV-E-2', name: 'Unrelated business income' },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // BAR - BUSINESS ANALYSIS AND REPORTING
  // =========================================================================
  BAR: {
    name: 'Business Analysis and Reporting',
    areas: [
      {
        id: 'BAR-I',
        name: 'Business Combinations and Consolidations',
        weightRange: [15, 25],
        groups: [
          {
            id: 'BAR-I-A',
            name: 'Business Combinations',
            topics: [
              { id: 'BAR-I-A-1', name: 'Acquisition method' },
              { id: 'BAR-I-A-2', name: 'Measuring consideration transferred' },
              { id: 'BAR-I-A-3', name: 'Recognizing goodwill and bargain purchases' },
            ],
          },
          {
            id: 'BAR-I-B',
            name: 'Consolidated Financial Statements',
            topics: [
              { id: 'BAR-I-B-1', name: 'Consolidation procedures' },
              { id: 'BAR-I-B-2', name: 'Intercompany transactions' },
              { id: 'BAR-I-B-3', name: 'Noncontrolling interests' },
            ],
          },
          {
            id: 'BAR-I-C',
            name: 'Variable Interest Entities',
            topics: [
              { id: 'BAR-I-C-1', name: 'VIE identification' },
              { id: 'BAR-I-C-2', name: 'Primary beneficiary determination' },
            ],
          },
        ],
      },
      {
        id: 'BAR-II',
        name: 'Technical Accounting',
        weightRange: [25, 35],
        groups: [
          {
            id: 'BAR-II-A',
            name: 'Advanced Revenue Recognition',
            topics: [
              { id: 'BAR-II-A-1', name: 'Complex contract modifications' },
              { id: 'BAR-II-A-2', name: 'Principal vs agent considerations' },
              { id: 'BAR-II-A-3', name: 'Licenses of IP' },
            ],
          },
          {
            id: 'BAR-II-B',
            name: 'Advanced Lease Accounting',
            topics: [
              { id: 'BAR-II-B-1', name: 'Lease modifications' },
              { id: 'BAR-II-B-2', name: 'Subleases' },
              { id: 'BAR-II-B-3', name: 'Build-to-suit arrangements' },
            ],
          },
          {
            id: 'BAR-II-C',
            name: 'Derivatives and Hedging',
            topics: [
              { id: 'BAR-II-C-1', name: 'Derivative instruments' },
              { id: 'BAR-II-C-2', name: 'Hedge accounting' },
              { id: 'BAR-II-C-3', name: 'Fair value and cash flow hedges' },
            ],
          },
          {
            id: 'BAR-II-D',
            name: 'Foreign Currency',
            topics: [
              { id: 'BAR-II-D-1', name: 'Foreign currency transactions' },
              { id: 'BAR-II-D-2', name: 'Translation of foreign operations' },
              { id: 'BAR-II-D-3', name: 'Remeasurement' },
            ],
          },
        ],
      },
      {
        id: 'BAR-III',
        name: 'State and Local Government',
        weightRange: [20, 30],
        groups: [
          {
            id: 'BAR-III-A',
            name: 'Advanced Governmental Accounting',
            topics: [
              { id: 'BAR-III-A-1', name: 'Capital assets and infrastructure' },
              { id: 'BAR-III-A-2', name: 'Long-term liabilities' },
              { id: 'BAR-III-A-3', name: 'Pension and OPEB (GASB 68/75)' },
            ],
          },
          {
            id: 'BAR-III-B',
            name: 'Governmental Reporting',
            topics: [
              { id: 'BAR-III-B-1', name: 'CAFR/ACFR components' },
              { id: 'BAR-III-B-2', name: 'RSI and SI' },
              { id: 'BAR-III-B-3', name: 'Reconciliations' },
            ],
          },
        ],
      },
      {
        id: 'BAR-IV',
        name: 'Financial Statement Analysis and Planning',
        weightRange: [15, 25],
        groups: [
          {
            id: 'BAR-IV-A',
            name: 'Financial Analysis',
            topics: [
              { id: 'BAR-IV-A-1', name: 'Ratio analysis' },
              { id: 'BAR-IV-A-2', name: 'Trend analysis' },
              { id: 'BAR-IV-A-3', name: 'Prospective financial statements' },
            ],
          },
          {
            id: 'BAR-IV-B',
            name: 'Cost Accounting and Planning',
            topics: [
              { id: 'BAR-IV-B-1', name: 'Cost-volume-profit analysis' },
              { id: 'BAR-IV-B-2', name: 'Budgeting and forecasting' },
              { id: 'BAR-IV-B-3', name: 'Variance analysis' },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // ISC - INFORMATION SYSTEMS AND CONTROLS
  // =========================================================================
  ISC: {
    name: 'Information Systems and Controls',
    areas: [
      {
        id: 'ISC-I',
        name: 'Information Systems and Data Management',
        weightRange: [30, 40],
        groups: [
          {
            id: 'ISC-I-A',
            name: 'Databases and Data Management',
            topics: [
              { id: 'ISC-I-A-1', name: 'Database fundamentals' },
              { id: 'ISC-I-A-2', name: 'Data modeling' },
              { id: 'ISC-I-A-3', name: 'Data governance' },
            ],
          },
          {
            id: 'ISC-I-B',
            name: 'Systems Architecture',
            topics: [
              { id: 'ISC-I-B-1', name: 'Hardware and infrastructure' },
              { id: 'ISC-I-B-2', name: 'Cloud computing models' },
              { id: 'ISC-I-B-3', name: 'Network fundamentals' },
            ],
          },
          {
            id: 'ISC-I-C',
            name: 'IT Operations',
            topics: [
              { id: 'ISC-I-C-1', name: 'System lifecycle' },
              { id: 'ISC-I-C-2', name: 'Change management' },
              { id: 'ISC-I-C-3', name: 'Disaster recovery and BCP' },
            ],
          },
        ],
      },
      {
        id: 'ISC-II',
        name: 'Security, Confidentiality, and Privacy',
        weightRange: [25, 35],
        groups: [
          {
            id: 'ISC-II-A',
            name: 'Cybersecurity',
            topics: [
              { id: 'ISC-II-A-1', name: 'Threat landscape' },
              { id: 'ISC-II-A-2', name: 'Security controls' },
              { id: 'ISC-II-A-3', name: 'Encryption and authentication' },
            ],
          },
          {
            id: 'ISC-II-B',
            name: 'Access Controls',
            topics: [
              { id: 'ISC-II-B-1', name: 'Logical access controls' },
              { id: 'ISC-II-B-2', name: 'Physical access controls' },
              { id: 'ISC-II-B-3', name: 'Identity management' },
            ],
          },
          {
            id: 'ISC-II-C',
            name: 'Privacy',
            topics: [
              { id: 'ISC-II-C-1', name: 'Privacy principles' },
              { id: 'ISC-II-C-2', name: 'HIPAA requirements' },
              { id: 'ISC-II-C-3', name: 'Other privacy regulations' },
            ],
          },
        ],
      },
      {
        id: 'ISC-III',
        name: 'SOC Engagements',
        weightRange: [25, 35],
        groups: [
          {
            id: 'ISC-III-A',
            name: 'SOC 1 Engagements',
            topics: [
              { id: 'ISC-III-A-1', name: 'SOC 1 overview and scope' },
              { id: 'ISC-III-A-2', name: 'Type 1 vs Type 2 reports' },
              { id: 'ISC-III-A-3', name: 'Control objectives' },
            ],
          },
          {
            id: 'ISC-III-B',
            name: 'SOC 2 Engagements',
            topics: [
              { id: 'ISC-III-B-1', name: 'Trust services criteria' },
              { id: 'ISC-III-B-2', name: 'SOC 2 reports' },
            ],
          },
          {
            id: 'ISC-III-C',
            name: 'SOC 3 and SOC for Cybersecurity',
            topics: [
              { id: 'ISC-III-C-1', name: 'SOC 3 reports' },
              { id: 'ISC-III-C-2', name: 'Cybersecurity risk management' },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // TCP - TAX COMPLIANCE AND PLANNING
  // Note: Major H.R. 1 updates testable July 1, 2026
  // =========================================================================
  TCP: {
    name: 'Tax Compliance and Planning',
    areas: [
      {
        id: 'TCP-I',
        name: 'Individual Tax Planning',
        weightRange: [20, 30],
        groups: [
          {
            id: 'TCP-I-A',
            name: 'Income Planning',
            topics: [
              { id: 'TCP-I-A-1', name: 'Timing of income recognition' },
              { id: 'TCP-I-A-2', name: 'Income shifting strategies' },
              { id: 'TCP-I-A-3', name: 'H.R.1: New income exclusions', hr1: true, effectiveDate: '2025-01-01' },
            ],
          },
          {
            id: 'TCP-I-B',
            name: 'Deduction Planning',
            topics: [
              { id: 'TCP-I-B-1', name: 'Timing of deductions' },
              { id: 'TCP-I-B-2', name: 'Bunching strategies' },
              { id: 'TCP-I-B-3', name: 'H.R.1: Updated deduction limits', hr1: true, effectiveDate: '2025-01-01' },
            ],
          },
          {
            id: 'TCP-I-C',
            name: 'Investment Tax Planning',
            topics: [
              { id: 'TCP-I-C-1', name: 'Capital gains strategies' },
              { id: 'TCP-I-C-2', name: 'Qualified opportunity zones' },
              { id: 'TCP-I-C-3', name: 'Net investment income tax' },
            ],
          },
        ],
      },
      {
        id: 'TCP-II',
        name: 'Entity Tax Planning',
        weightRange: [30, 40],
        groups: [
          {
            id: 'TCP-II-A',
            name: 'Entity Selection',
            topics: [
              { id: 'TCP-II-A-1', name: 'Entity type comparison' },
              { id: 'TCP-II-A-2', name: 'Check-the-box regulations' },
              { id: 'TCP-II-A-3', name: 'State tax considerations' },
            ],
          },
          {
            id: 'TCP-II-B',
            name: 'Compensation and Benefits Planning',
            topics: [
              { id: 'TCP-II-B-1', name: 'Reasonable compensation' },
              { id: 'TCP-II-B-2', name: 'Retirement plan selection' },
              { id: 'TCP-II-B-3', name: 'Fringe benefits' },
            ],
          },
          {
            id: 'TCP-II-C',
            name: 'Multi-jurisdictional Tax Planning',
            topics: [
              { id: 'TCP-II-C-1', name: 'State nexus and apportionment' },
              { id: 'TCP-II-C-2', name: 'International tax basics' },
              { id: 'TCP-II-C-3', name: 'Transfer pricing concepts' },
            ],
          },
        ],
      },
      {
        id: 'TCP-III',
        name: 'Property Transactions',
        weightRange: [15, 25],
        groups: [
          {
            id: 'TCP-III-A',
            name: 'Advanced Property Transactions',
            topics: [
              { id: 'TCP-III-A-1', name: 'Installment sales' },
              { id: 'TCP-III-A-2', name: 'Related party transactions' },
              { id: 'TCP-III-A-3', name: 'Like-kind exchange planning' },
            ],
          },
          {
            id: 'TCP-III-B',
            name: 'Business Dispositions',
            topics: [
              { id: 'TCP-III-B-1', name: 'Stock vs asset sales' },
              { id: 'TCP-III-B-2', name: 'Section 338 elections' },
              { id: 'TCP-III-B-3', name: 'Corporate liquidations' },
            ],
          },
        ],
      },
      {
        id: 'TCP-IV',
        name: 'Gift and Estate Tax',
        weightRange: [10, 20],
        groups: [
          {
            id: 'TCP-IV-A',
            name: 'Gift Tax',
            topics: [
              { id: 'TCP-IV-A-1', name: 'Annual exclusion and lifetime exemption' },
              { id: 'TCP-IV-A-2', name: 'Gift-splitting' },
              { id: 'TCP-IV-A-3', name: 'Valuation discounts' },
            ],
          },
          {
            id: 'TCP-IV-B',
            name: 'Estate Tax',
            topics: [
              { id: 'TCP-IV-B-1', name: 'Estate valuation' },
              { id: 'TCP-IV-B-2', name: 'Deductions and credits' },
              { id: 'TCP-IV-B-3', name: 'Portability' },
            ],
          },
        ],
      },
    ],
  },
};

// ============================================================================
// H.R. 1 "ONE BIG BEAUTIFUL BILL" ACT PROVISIONS
// Testable July 1, 2026
// ============================================================================

export const HR1_PROVISIONS = {
  effectiveDate: '2026-07-01',
  priorLawSunset: '2026-06-30',
  keyChanges: [
    {
      id: 'hr1-tips',
      name: 'Tip Income Exclusion',
      description: 'Tips received by service workers are fully excluded from gross income',
      effectiveTaxYear: 2025,
      sections: ['REG', 'TCP'],
      topicIds: ['REG-III-A-3', 'TCP-I-A-3'],
    },
    {
      id: 'hr1-salt',
      name: 'State and Local Tax Deduction',
      description: 'SALT deduction cap increased from $10,000',
      effectiveTaxYear: 2025,
      sections: ['REG', 'TCP'],
      topicIds: ['REG-III-B-4', 'TCP-I-B-3'],
    },
    {
      id: 'hr1-child-credit',
      name: 'Enhanced Child Tax Credit',
      description: 'Increased child tax credit amounts and expanded eligibility',
      effectiveTaxYear: 2025,
      sections: ['REG', 'TCP'],
      topicIds: ['REG-III-D-4'],
    },
    {
      id: 'hr1-bonus-depreciation',
      name: 'Bonus Depreciation Extension',
      description: '100% bonus depreciation extended',
      effectiveTaxYear: 2025,
      sections: ['REG', 'TCP'],
      topicIds: [],
    },
  ],
};

// ============================================================================
// STUDY PLAN TEMPLATES
// ============================================================================

export const STUDY_PLAN_TEMPLATES = {
  REG_8_WEEK: {
    id: 'REG_8_WEEK',
    section: 'REG',
    name: '8-Week REG Plan',
    weeks: 8,
    hoursPerWeek: 20,
    description: 'Standard 8-week preparation for REG',
  },
  REG_12_WEEK: {
    id: 'REG_12_WEEK',
    section: 'REG',
    name: '12-Week REG Plan',
    weeks: 12,
    hoursPerWeek: 15,
    description: 'Comfortable 12-week preparation for REG',
  },
  FAR_10_WEEK: {
    id: 'FAR_10_WEEK',
    section: 'FAR',
    name: '10-Week FAR Plan',
    weeks: 10,
    hoursPerWeek: 20,
    description: 'Standard preparation for the largest section',
  },
  AUD_8_WEEK: {
    id: 'AUD_8_WEEK',
    section: 'AUD',
    name: '8-Week AUD Plan',
    weeks: 8,
    hoursPerWeek: 18,
    description: 'Standard 8-week preparation for AUD',
  },
};

// Score interpretation
export const SCORE_RANGES = {
  failing: { min: 0, max: 74, label: 'Needs More Preparation', color: 'red' },
  passing: { min: 75, max: 84, label: 'Passing', color: 'green' },
  strong: { min: 85, max: 94, label: 'Strong Performance', color: 'blue' },
  excellent: { min: 95, max: 100, label: 'Excellent', color: 'purple' },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all topics for a given section as a flat array
 * @param {string} sectionId - The section ID (e.g., 'AUD', 'FAR')
 * @returns {Array} Array of topic objects with full path information
 */
export const getAllTopicsForSection = (sectionId: ExamSection) => {
  const blueprint = EXAM_BLUEPRINTS[sectionId];
  if (!blueprint) return [];

  const topics: any[] = [];
  blueprint.areas.forEach((area: any) => {
    area.groups.forEach((group: any) => {
      group.topics.forEach((topic: any) => {
        topics.push({
          ...topic,
          areaId: area.id,
          areaName: area.name,
          groupId: group.id,
          groupName: group.name,
          sectionId,
          fullPath: `${area.name} > ${group.name} > ${topic.name}`,
        });
      });
    });
  });
  return topics;
};

/**
 * Get topic by ID
 * @param {string} topicId - The topic ID (e.g., 'AUD-II-A-1')
 * @returns {Object|null} Topic object with full path information
 */
export const getTopicById = (topicId: string) => {
  const sectionId = topicId.split('-')[0] as ExamSection;
  const topics = getAllTopicsForSection(sectionId);
  return topics.find((t) => t.id === topicId) || null;
};

/**
 * Check if a topic is affected by H.R. 1
 * @param {string} topicId - The topic ID
 * @returns {boolean}
 */
export const isHR1Topic = (topicId: string) => {
  return HR1_PROVISIONS.keyChanges.some((change) => change.topicIds.includes(topicId));
};

/**
 * Get progress summary by Blueprint area
 * @param {Object} userProgress - User's progress data by topic
 * @param {string} sectionId - The section ID
 * @returns {Array} Array of area progress summaries
 */
export const getProgressByArea = (userProgress: Record<string, any>, sectionId: ExamSection) => {
  const blueprint = EXAM_BLUEPRINTS[sectionId];
  if (!blueprint) return [];

  return blueprint.areas.map((area: any) => {
    let totalTopics = 0;
    let masteredTopics = 0;
    let totalQuestions = 0;
    let correctAnswers = 0;

    area.groups.forEach((group: any) => {
      group.topics.forEach((topic: any) => {
        totalTopics++;
        const progress = userProgress[topic.id];
        if (progress) {
          totalQuestions += progress.attempted || 0;
          correctAnswers += progress.correct || 0;
          if (progress.accuracy >= 80 && progress.attempted >= 5) {
            masteredTopics++;
          }
        }
      });
    });

    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const readiness = Math.round((masteredTopics / totalTopics) * 100);

    return {
      areaId: area.id,
      areaName: area.name,
      weightRange: area.weightRange,
      totalTopics,
      masteredTopics,
      totalQuestions,
      correctAnswers,
      accuracy,
      readiness,
    };
  });
};
