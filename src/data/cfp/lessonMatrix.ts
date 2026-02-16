/**
 * VoraPrep CFP® Lesson Matrix
 * Certified Financial Planner™ Certification Examination - 2026 Curriculum
 * 
 * This matrix maps all CFP lessons to the 8 Principal Knowledge Domains
 * as defined by the CFP Board's exam content outline.
 * 
 * EXAM STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  Format:         Computer-based, single session                            │
 * │  Duration:       5.5 hours (includes breaks)                               │
 * │  Questions:      170 total (85 stand-alone + 85 case-based)               │
 * │  Case Studies:   17 cases with 6-8 questions each                         │
 * │  Passing Score:  Scaled (approximately 65-70% correct)                     │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * TESTING WINDOWS: March, July, November (3x per year)
 * 
 * PRINCIPAL KNOWLEDGE DOMAINS:
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  Domain 1: Professional Conduct and Regulation           │  8%             │
 * │  Domain 2: General Principles of Financial Planning      │  15%            │
 * │  Domain 3: Risk Management and Insurance Planning        │  11%            │
 * │  Domain 4: Investment Planning                           │  17%            │
 * │  Domain 5: Tax Planning                                  │  14%            │
 * │  Domain 6: Retirement Savings and Income Planning        │  18%            │
 * │  Domain 7: Estate Planning                               │  10%            │
 * │  Domain 8: Psychology of Financial Planning              │  7%             │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * Last Updated: February 2026
 */

export type CFPDomain = 
  | 'CFP-PCR'   // Professional Conduct and Regulation
  | 'CFP-GEN'   // General Principles
  | 'CFP-RISK'  // Risk Management and Insurance
  | 'CFP-INV'   // Investment Planning
  | 'CFP-TAX'   // Tax Planning
  | 'CFP-RET'   // Retirement Savings and Income
  | 'CFP-EST'   // Estate Planning
  | 'CFP-PSY';  // Psychology of Financial Planning

export interface CFPBlueprintArea {
  areaId: string;
  areaName: string;
  weight: string;
  topicCount: number;
}

export interface CFPLessonMatrixEntry {
  lessonId: string;
  domain: CFPDomain;
  title: string;
  blueprintArea: CFPBlueprintArea;
  topics: string[];
  duration: number; // minutes
  order: number;
  /** Contains TVM calculations requiring financial calculator */
  tvmRequired?: boolean;
  /** Cross-references to related lessons */
  relatedLessons?: string[];
  /** Key formulas covered in this lesson */
  keyFormulas?: string[];
  /** Mnemonics for memorization */
  mnemonics?: string[];
}

// ============================================================================
// BLUEPRINT AREAS BY DOMAIN
// ============================================================================

export const CFP_BLUEPRINT_AREAS: Record<CFPDomain, CFPBlueprintArea[]> = {
  'CFP-PCR': [
    { areaId: 'PCR-1', areaName: 'CFP Board Code of Ethics and Standards of Conduct', weight: '35%', topicCount: 5 },
    { areaId: 'PCR-2', areaName: 'CFP Board Procedural Rules', weight: '15%', topicCount: 3 },
    { areaId: 'PCR-3', areaName: 'Fiduciary and Regulatory Requirements', weight: '30%', topicCount: 4 },
    { areaId: 'PCR-4', areaName: 'Practice Standards for Financial Planning', weight: '20%', topicCount: 3 },
  ],
  'CFP-GEN': [
    { areaId: 'GEN-1', areaName: 'Financial Planning Process', weight: '20%', topicCount: 5 },
    { areaId: 'GEN-2', areaName: 'Financial Statements and Cash Flow', weight: '20%', topicCount: 4 },
    { areaId: 'GEN-3', areaName: 'Time Value of Money', weight: '30%', topicCount: 6 },
    { areaId: 'GEN-4', areaName: 'Education Planning', weight: '15%', topicCount: 4 },
    { areaId: 'GEN-5', areaName: 'Economic Concepts and Debt Management', weight: '15%', topicCount: 4 },
  ],
  'CFP-RISK': [
    { areaId: 'RISK-1', areaName: 'Risk Management Principles', weight: '10%', topicCount: 3 },
    { areaId: 'RISK-2', areaName: 'Life Insurance', weight: '30%', topicCount: 6 },
    { areaId: 'RISK-3', areaName: 'Health, Disability, and Long-Term Care', weight: '25%', topicCount: 5 },
    { areaId: 'RISK-4', areaName: 'Property and Liability Insurance', weight: '20%', topicCount: 4 },
    { areaId: 'RISK-5', areaName: 'Annuities and Business Insurance', weight: '15%', topicCount: 3 },
  ],
  'CFP-INV': [
    { areaId: 'INV-1', areaName: 'Investment Theory and Portfolio Management', weight: '30%', topicCount: 6 },
    { areaId: 'INV-2', areaName: 'Security Analysis', weight: '25%', topicCount: 5 },
    { areaId: 'INV-3', areaName: 'Fixed Income Analysis', weight: '20%', topicCount: 4 },
    { areaId: 'INV-4', areaName: 'Derivatives and Alternative Investments', weight: '15%', topicCount: 4 },
    { areaId: 'INV-5', areaName: 'Portfolio Performance and Tax Efficiency', weight: '10%', topicCount: 3 },
  ],
  'CFP-TAX': [
    { areaId: 'TAX-1', areaName: 'Individual Income Tax Fundamentals', weight: '35%', topicCount: 6 },
    { areaId: 'TAX-2', areaName: 'Deductions, Credits, and AMT', weight: '25%', topicCount: 5 },
    { areaId: 'TAX-3', areaName: 'Capital Gains and Investment Taxation', weight: '20%', topicCount: 4 },
    { areaId: 'TAX-4', areaName: 'Charitable and Gift Tax Planning', weight: '20%', topicCount: 4 },
  ],
  'CFP-RET': [
    { areaId: 'RET-1', areaName: 'Retirement Needs Analysis', weight: '15%', topicCount: 3 },
    { areaId: 'RET-2', areaName: 'Social Security and Medicare', weight: '20%', topicCount: 4 },
    { areaId: 'RET-3', areaName: 'Employer-Sponsored Retirement Plans', weight: '25%', topicCount: 6 },
    { areaId: 'RET-4', areaName: 'Individual Retirement Accounts', weight: '20%', topicCount: 4 },
    { areaId: 'RET-5', areaName: 'Distribution Planning and Strategies', weight: '20%', topicCount: 5 },
  ],
  'CFP-EST': [
    { areaId: 'EST-1', areaName: 'Estate Planning Documents', weight: '25%', topicCount: 4 },
    { areaId: 'EST-2', areaName: 'Trusts and Wealth Transfer', weight: '35%', topicCount: 6 },
    { areaId: 'EST-3', areaName: 'Estate, Gift, and GST Taxation', weight: '25%', topicCount: 4 },
    { areaId: 'EST-4', areaName: 'Charitable Estate Planning', weight: '15%', topicCount: 3 },
  ],
  'CFP-PSY': [
    { areaId: 'PSY-1', areaName: 'Client Communication and Counseling', weight: '40%', topicCount: 4 },
    { areaId: 'PSY-2', areaName: 'Behavioral Finance', weight: '40%', topicCount: 5 },
    { areaId: 'PSY-3', areaName: 'Crisis and Special Circumstances', weight: '20%', topicCount: 3 },
  ],
};

// ============================================================================
// DOMAIN 2: GENERAL PRINCIPLES OF FINANCIAL PLANNING (15%)
// ============================================================================

export const CFP_GEN_LESSONS: CFPLessonMatrixEntry[] = [
  // GEN-1: Financial Planning Process (5 lessons)
  {
    lessonId: 'CFP-GEN-L001',
    domain: 'CFP-GEN',
    title: 'The 7-Step Financial Planning Process',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][0],
    topics: [
      'Understanding client circumstances',
      'Identifying and selecting goals',
      'Analyzing current course of action',
      'Developing recommendations',
      'Presenting recommendations',
      'Implementing recommendations',
      'Monitoring progress'
    ],
    duration: 45,
    order: 1,
    mnemonics: ['U-I-A-D-P-I-M: "Under Intense Analysis, Decisions Propel Implementation Momentum"'],
    relatedLessons: ['CFP-GEN-L002', 'CFP-PCR-L006']
  },
  {
    lessonId: 'CFP-GEN-L002',
    domain: 'CFP-GEN',
    title: 'Client Data Gathering - Quantitative Information',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][0],
    topics: [
      'Asset and liability inventory',
      'Income sources and amounts',
      'Insurance coverage inventory',
      'Tax documents and returns',
      'Employee benefits statements',
      'Estate planning documents'
    ],
    duration: 40,
    order: 2,
    relatedLessons: ['CFP-GEN-L003', 'CFP-GEN-L004']
  },
  {
    lessonId: 'CFP-GEN-L003',
    domain: 'CFP-GEN',
    title: 'Client Data Gathering - Qualitative Information',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][0],
    topics: [
      'Goals and objectives',
      'Risk tolerance assessment',
      'Time horizons',
      'Values and attitudes about money',
      'Family dynamics and circumstances',
      'Health status and expectations'
    ],
    duration: 35,
    order: 3,
    relatedLessons: ['CFP-GEN-L002', 'CFP-PSY-L001']
  },
  {
    lessonId: 'CFP-GEN-L004',
    domain: 'CFP-GEN',
    title: 'SMART Goals and Priority Setting',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][0],
    topics: [
      'Specific goals definition',
      'Measurable outcomes',
      'Achievable vs. aspirational',
      'Relevant to client values',
      'Time-bound deadlines',
      'Prioritizing competing goals'
    ],
    duration: 30,
    order: 4,
    mnemonics: ['SMART: Specific, Measurable, Achievable, Relevant, Time-bound']
  },
  {
    lessonId: 'CFP-GEN-L005',
    domain: 'CFP-GEN',
    title: 'Scope of Engagement and Client Agreement',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][0],
    topics: [
      'Defining scope of services',
      'Written engagement agreements',
      'Fee disclosure requirements',
      'Termination provisions',
      'Client responsibilities'
    ],
    duration: 25,
    order: 5,
    relatedLessons: ['CFP-PCR-L001', 'CFP-PCR-L007']
  },

  // GEN-2: Financial Statements and Cash Flow (4 lessons)
  {
    lessonId: 'CFP-GEN-L006',
    domain: 'CFP-GEN',
    title: 'Personal Financial Statements - Balance Sheet',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][1],
    topics: [
      'Assets: liquid, investment, personal use',
      'Liabilities: current vs. long-term',
      'Net worth calculation',
      'Balance sheet analysis ratios',
      'Solvency and liquidity assessment'
    ],
    duration: 45,
    order: 6,
    keyFormulas: [
      'Net Worth = Total Assets - Total Liabilities',
      'Current Ratio = Liquid Assets / Current Liabilities',
      'Debt-to-Asset Ratio = Total Liabilities / Total Assets'
    ]
  },
  {
    lessonId: 'CFP-GEN-L007',
    domain: 'CFP-GEN',
    title: 'Personal Financial Statements - Income Statement',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][1],
    topics: [
      'Income categories',
      'Fixed vs. variable expenses',
      'Discretionary vs. non-discretionary',
      'Savings rate calculation',
      'Cash flow surplus/deficit analysis'
    ],
    duration: 40,
    order: 7,
    keyFormulas: [
      'Savings Rate = (Income - Expenses) / Gross Income',
      'Cash Flow = Total Income - Total Expenses'
    ]
  },
  {
    lessonId: 'CFP-GEN-L008',
    domain: 'CFP-GEN',
    title: 'Financial Ratios and Benchmarks',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][1],
    topics: [
      'Emergency fund ratio (3-6 months)',
      'Housing ratio (≤28% of gross)',
      'Total debt service ratio (≤36%)',
      'Savings ratio benchmarks',
      'Investment assets ratio',
      'Solvency ratio'
    ],
    duration: 35,
    order: 8,
    keyFormulas: [
      'Emergency Fund Ratio = Liquid Assets / Monthly Expenses',
      'Housing Ratio = Monthly Housing Costs / Gross Monthly Income',
      'Debt Service Ratio = Total Monthly Debt Payments / Gross Monthly Income'
    ]
  },
  {
    lessonId: 'CFP-GEN-L009',
    domain: 'CFP-GEN',
    title: 'Cash Flow Management and Budgeting',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][1],
    topics: [
      'Creating a budget framework',
      'Pay yourself first strategy',
      'Tracking expenses',
      'Automating savings',
      'Adjusting for irregular income',
      'Emergency fund strategies'
    ],
    duration: 30,
    order: 9,
    relatedLessons: ['CFP-GEN-L017']
  },

  // GEN-3: Time Value of Money (6 lessons)
  {
    lessonId: 'CFP-GEN-L010',
    domain: 'CFP-GEN',
    title: 'Time Value of Money - Core Concepts',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][2],
    topics: [
      'Why money has time value',
      'Simple vs. compound interest',
      'Compounding frequency effects',
      'Real vs. nominal rates',
      'Rule of 72',
      'Financial calculator basics'
    ],
    duration: 45,
    order: 10,
    tvmRequired: true,
    keyFormulas: [
      'FV = PV × (1 + r)^n',
      'Real Rate ≈ ((1 + Nominal) / (1 + Inflation)) - 1',
      'Rule of 72: Years to Double ≈ 72 / Interest Rate'
    ],
    mnemonics: ['The 5 TVM keys: N, I/Y, PV, PMT, FV']
  },
  {
    lessonId: 'CFP-GEN-L011',
    domain: 'CFP-GEN',
    title: 'Present Value Calculations',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][2],
    topics: [
      'Single sum present value',
      'Discounting future cash flows',
      'Present value of annuities',
      'PV of annuity due vs. ordinary',
      'Present value applications'
    ],
    duration: 50,
    order: 11,
    tvmRequired: true,
    keyFormulas: [
      'PV = FV / (1 + r)^n',
      'PV of Ordinary Annuity = PMT × [(1 - (1 + r)^-n) / r]',
      'PV of Annuity Due = PV of Ordinary Annuity × (1 + r)'
    ]
  },
  {
    lessonId: 'CFP-GEN-L012',
    domain: 'CFP-GEN',
    title: 'Future Value Calculations',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][2],
    topics: [
      'Single sum future value',
      'Compounding periods',
      'Future value of annuities',
      'FV of annuity due vs. ordinary',
      'Retirement accumulation modeling'
    ],
    duration: 50,
    order: 12,
    tvmRequired: true,
    keyFormulas: [
      'FV = PV × (1 + r)^n',
      'FV of Ordinary Annuity = PMT × [((1 + r)^n - 1) / r]',
      'FV of Annuity Due = FV of Ordinary Annuity × (1 + r)'
    ]
  },
  {
    lessonId: 'CFP-GEN-L013',
    domain: 'CFP-GEN',
    title: 'Annuities - Ordinary and Due',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][2],
    topics: [
      'Ordinary annuity (end-of-period)',
      'Annuity due (beginning-of-period)',
      'When to use each type',
      'Converting between types',
      'Perpetuities'
    ],
    duration: 45,
    order: 13,
    tvmRequired: true,
    keyFormulas: [
      'Annuity Due = Ordinary Annuity × (1 + r)',
      'PV of Perpetuity = PMT / r'
    ],
    mnemonics: ['BEGIN mode = Annuity Due (payments at Beginning)', 'END mode = Ordinary Annuity (payments at End)']
  },
  {
    lessonId: 'CFP-GEN-L014',
    domain: 'CFP-GEN',
    title: 'Uneven Cash Flows - NPV and IRR',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][2],
    topics: [
      'Net Present Value (NPV)',
      'Internal Rate of Return (IRR)',
      'NPV vs. IRR decision rules',
      'Uneven cash flow entry',
      'Investment selection using NPV',
      'Limitations of IRR'
    ],
    duration: 55,
    order: 14,
    tvmRequired: true,
    keyFormulas: [
      'NPV = Σ [CFt / (1 + r)^t] - Initial Investment',
      'IRR: Rate where NPV = 0'
    ]
  },
  {
    lessonId: 'CFP-GEN-L015',
    domain: 'CFP-GEN',
    title: 'Loan Amortization and Payment Calculations',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][2],
    topics: [
      'Loan payment calculation',
      'Amortization schedules',
      'Interest vs. principal portions',
      'Balloon payments',
      'Refinancing analysis',
      'APR vs. effective rate'
    ],
    duration: 50,
    order: 15,
    tvmRequired: true,
    keyFormulas: [
      'Monthly Payment = PV × [r(1 + r)^n] / [(1 + r)^n - 1]',
      'Effective Annual Rate = (1 + r/n)^n - 1'
    ]
  },

  // GEN-4: Education Planning (4 lessons)
  {
    lessonId: 'CFP-GEN-L016',
    domain: 'CFP-GEN',
    title: 'Education Planning Overview and Cost Projections',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][3],
    topics: [
      'Current education costs',
      'Education inflation rates (historically 5-7%)',
      'Public vs. private institutions',
      'In-state vs. out-of-state',
      'Projecting future costs',
      'Financial aid considerations'
    ],
    duration: 40,
    order: 16,
    tvmRequired: true,
    relatedLessons: ['CFP-GEN-L017', 'CFP-GEN-L018']
  },
  {
    lessonId: 'CFP-GEN-L017',
    domain: 'CFP-GEN',
    title: '529 Plans - Qualified Tuition Programs',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][3],
    topics: [
      'State-sponsored 529 savings plans',
      'Prepaid tuition plans',
      'Contribution limits and gift tax',
      '5-year gift tax averaging',
      'Qualified education expenses',
      'Non-qualified withdrawal penalties',
      'SECURE Act changes (K-12, apprenticeships)',
      'Rollovers to Roth IRA (SECURE 2.0)'
    ],
    duration: 50,
    order: 17,
    keyFormulas: [
      'Maximum 5-Year Gift: $19,000 × 5 = $95,000 per beneficiary (2026)',
      'Non-Qualified Penalty: 10% on earnings + ordinary income tax'
    ]
  },
  {
    lessonId: 'CFP-GEN-L018',
    domain: 'CFP-GEN',
    title: 'Coverdell ESAs and Other Education Savings',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][3],
    topics: [
      'Coverdell ESA contribution limits ($2,000)',
      'Income phaseouts for Coverdell',
      'Eligible expenses (K-12 included)',
      'UGMA/UTMA accounts',
      'Series EE/I savings bonds',
      'Comparison of education vehicles'
    ],
    duration: 40,
    order: 18,
    relatedLessons: ['CFP-GEN-L017', 'CFP-GEN-L019']
  },
  {
    lessonId: 'CFP-GEN-L019',
    domain: 'CFP-GEN',
    title: 'Education Tax Benefits and Credits',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][3],
    topics: [
      'American Opportunity Tax Credit (AOTC)',
      'Lifetime Learning Credit (LLC)',
      'AOTC vs. LLC comparison',
      'Student loan interest deduction',
      'Coordination with 529 plans',
      'Income phaseouts'
    ],
    duration: 45,
    order: 19,
    keyFormulas: [
      'AOTC: Up to $2,500/student (40% refundable = $1,000)',
      'LLC: 20% of first $10,000 = up to $2,000 (non-refundable)'
    ],
    relatedLessons: ['CFP-TAX-L007']
  },

  // GEN-5: Economic Concepts and Debt Management (4 lessons)
  {
    lessonId: 'CFP-GEN-L020',
    domain: 'CFP-GEN',
    title: 'Economic Concepts for Financial Planning',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][4],
    topics: [
      'Business cycles and indicators',
      'Inflation and purchasing power',
      'Interest rate environment',
      'Yield curve analysis',
      'Federal Reserve monetary policy',
      'Impact on financial planning'
    ],
    duration: 40,
    order: 20,
    relatedLessons: ['CFP-INV-L003']
  },
  {
    lessonId: 'CFP-GEN-L021',
    domain: 'CFP-GEN',
    title: 'Debt Management Strategies',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][4],
    topics: [
      'Good debt vs. bad debt',
      'Debt avalanche method',
      'Debt snowball method',
      'Debt consolidation options',
      'Balance transfer strategies',
      'When to pay off debt vs. invest'
    ],
    duration: 40,
    order: 21,
    mnemonics: [
      'Avalanche = Attack highest APR first (mathematically optimal)',
      'Snowball = Start with smallest balance (psychologically motivating)'
    ]
  },
  {
    lessonId: 'CFP-GEN-L022',
    domain: 'CFP-GEN',
    title: 'Emergency Fund and Liquidity Planning',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][4],
    topics: [
      'Emergency fund sizing (3-6 months)',
      'Factors affecting fund size',
      'Where to hold emergency funds',
      'FDIC/NCUA insurance limits',
      'Liquidity hierarchy',
      'Lines of credit as backup'
    ],
    duration: 30,
    order: 22,
    keyFormulas: [
      'Emergency Fund Target = Monthly Expenses × 3 to 6'
    ]
  },
  {
    lessonId: 'CFP-GEN-L023',
    domain: 'CFP-GEN',
    title: 'Financial Calculator Mastery',
    blueprintArea: CFP_BLUEPRINT_AREAS['CFP-GEN'][4],
    topics: [
      'HP 10bII+ or Texas Instruments BA II Plus',
      'Setting up: P/Y, C/Y, BEGIN/END',
      'Clearing the calculator',
      'Common TVM problem patterns',
      'Serial calculations',
      'Common calculator errors'
    ],
    duration: 60,
    order: 23,
    tvmRequired: true,
    mnemonics: [
      '2nd CLR TVM before every problem',
      'Cash outflows are negative, inflows are positive',
      'Check P/Y matches your rate period'
    ]
  },
];

// ============================================================================
// EXPORTS
// ============================================================================

export const CFP_LESSON_MATRIX: CFPLessonMatrixEntry[] = [
  ...CFP_GEN_LESSONS,
  // Additional domain lessons will be added here
];

// Helper functions
export const getLessonsByDomain = (domain: CFPDomain): CFPLessonMatrixEntry[] => {
  return CFP_LESSON_MATRIX.filter(lesson => lesson.domain === domain);
};

export const getLessonById = (lessonId: string): CFPLessonMatrixEntry | undefined => {
  return CFP_LESSON_MATRIX.find(lesson => lesson.lessonId === lessonId);
};

export const getTVMRequiredLessons = (): CFPLessonMatrixEntry[] => {
  return CFP_LESSON_MATRIX.filter(lesson => lesson.tvmRequired);
};

export const getDomainWeight = (domain: CFPDomain): string => {
  const weights: Record<CFPDomain, string> = {
    'CFP-PCR': '8%',
    'CFP-GEN': '15%',
    'CFP-RISK': '11%',
    'CFP-INV': '17%',
    'CFP-TAX': '14%',
    'CFP-RET': '18%',
    'CFP-EST': '10%',
    'CFP-PSY': '7%',
  };
  return weights[domain];
};
