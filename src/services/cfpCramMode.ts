/**
 * CFP Final Week Cram Mode
 * 
 * Condensed, high-yield review content for the last week before the exam.
 * Focuses on most-tested concepts, common traps, and critical formulas.
 */

export interface CramTopic {
  id: string;
  domain: string;
  title: string;
  priority: 'critical' | 'high' | 'medium';
  estimatedMinutes: number;
  keyPoints: string[];
  commonMistakes: string[];
  memoryTip?: string;
}

export interface CramFormula {
  id: string;
  domain: string;
  name: string;
  formula: string;
  variables: Record<string, string>;
  example: string;
  whenToUse: string;
}

export interface CramDay {
  day: number;
  title: string;
  focusDomains: string[];
  topics: string[];
  formulaCount: number;
  practiceQuestions: number;
  estimatedHours: number;
}

// High-yield topics organized by domain
export const CFP_CRAM_TOPICS: CramTopic[] = [
  // RETIREMENT - 19% of exam
  {
    id: 'cram-ret-001',
    domain: 'RET',
    title: 'Social Security Claiming Strategies',
    priority: 'critical',
    estimatedMinutes: 15,
    keyPoints: [
      'FRA is 67 for those born 1960+',
      'Early claiming (62) reduces benefits by 30%',
      'Delayed claiming (70) increases by 32% (8%/year)',
      'Spousal benefit = 50% of higher earner PIA',
      'Survivor benefit = 100% of deceased benefit',
      'Earnings test applies before FRA: $1 withheld for every $2 earned over $22,320'
    ],
    commonMistakes: [
      'Forgetting spousal benefit requires higher earner to file',
      'Not considering taxes on SS benefits (up to 85% taxable)',
      'Ignoring breakeven analysis for delayed claiming'
    ],
    memoryTip: 'Remember "67-30-32": FRA 67, early penalty 30%, delay bonus 32%'
  },
  {
    id: 'cram-ret-002',
    domain: 'RET',
    title: 'RMD Rules',
    priority: 'critical',
    estimatedMinutes: 10,
    keyPoints: [
      'RMDs begin at age 73 (SECURE 2.0)',
      'First RMD deadline: April 1 of year after turning 73',
      'Subsequent RMDs due December 31',
      'Penalty for missed RMD: 25% (reduced from 50%)',
      'Roth IRAs: No RMDs during owner lifetime',
      'Inherited IRAs: 10-year rule for most beneficiaries'
    ],
    commonMistakes: [
      'Delaying first RMD doubles tax in year 2',
      'Forgetting Roth 401(k) required RMDs (eliminate by rolling to Roth IRA)',
      'Not aggregating IRAs for RMD calculation'
    ],
    memoryTip: 'SECURE raised age to 73, penalty to 25%'
  },
  {
    id: 'cram-ret-003',
    domain: 'RET',
    title: 'Retirement Plan Contribution Limits',
    priority: 'high',
    estimatedMinutes: 8,
    keyPoints: [
      '401(k)/403(b) employee: $24,500 (2026)',
      'Catch-up (50+): $7,500 additional; $11,250 if 60-63 (SECURE 2.0)',
      'IRA: $7,500 (2026), catch-up $1,000',
      'Total 401(k) limit: $71,500 (all sources)',
      'SIMPLE IRA: $17,000, catch-up $3,500',
      'SEP-IRA: 25% comp up to $71,500'
    ],
    commonMistakes: [
      'Exceeding 25% limit on SEP-IRA for self-employed',
      'Aggregation of 401(k) contributions across employers'
    ],
    memoryTip: '24.5-7.5-71.5: Employee $24.5K, IRA $7.5K, total $71.5K'
  },
  
  // TAX - 14% of exam
  {
    id: 'cram-tax-001',
    domain: 'TAX',
    title: 'Capital Gains Taxation',
    priority: 'critical',
    estimatedMinutes: 12,
    keyPoints: [
      'LTCG rates: 0%, 15%, 20% based on taxable income',
      'STCG taxed as ordinary income',
      'Holding period: >1 year = long-term',
      '3.8% NIIT on higher earners ($250K MFJ)',
      'Wash sale: 30 days before/after',
      'Step-up in basis at death eliminates gains'
    ],
    commonMistakes: [
      'Confusing 0% LTCG bracket—still applies to taxable income',
      'Missing wash sale period (61-day window)',
      'Forgetting carryover basis on gifts vs step-up'
    ],
    memoryTip: '0-15-20 plus 3.8 NIIT for the wealthy'
  },
  {
    id: 'cram-tax-002',
    domain: 'TAX',
    title: 'Tax Loss Harvesting',
    priority: 'high',
    estimatedMinutes: 8,
    keyPoints: [
      'Losses offset gains of same type first',
      'Then offset opposite type',
      'Net losses offset up to $3,000 ordinary income',
      'Excess carries forward indefinitely',
      'Wash sale: Cannot buy substantially identical security within 30 days'
    ],
    commonMistakes: [
      'Buying same security in IRA triggers wash sale',
      'Not tracking carryforward losses for future years'
    ]
  },
  {
    id: 'cram-tax-003',
    domain: 'TAX',
    title: 'Roth Conversion Analysis',
    priority: 'high',
    estimatedMinutes: 10,
    keyPoints: [
      'Entire conversion is taxable income (if pre-tax)',
      'No 10% penalty regardless of age',
      'Best in low-income years',
      '5-year rule for converted amounts (penalty-free)',
      'Consider marginal bracket vs future expectations',
      'Good strategy: "Fill the bracket"'
    ],
    commonMistakes: [
      'Converting too much—pushes into higher bracket',
      'Not having cash to pay tax (using IRA funds reduces benefit)',
      'Ignoring Medicare IRMAA impact'
    ]
  },
  
  // ESTATE - 12% of exam
  {
    id: 'cram-est-001',
    domain: 'EST',
    title: 'Gift & Estate Tax Basics',
    priority: 'critical',
    estimatedMinutes: 12,
    keyPoints: [
      'Unified credit exemption: $7.0M (2026, TCJA sunset effective)',
      'Annual exclusion: $19,000 per recipient',
      'Gift splitting doubles to $38,000',
      'Unlimited marital deduction (US citizen spouse)',
      'Unlimited educational/medical (direct pay)',
      'Estate tax rate: 40% on excess',
      'Anti-clawback protects pre-2026 gifts'
    ],
    commonMistakes: [
      'Confusing annual exclusion with lifetime exemption',
      'Not recognizing TCJA sunset impact on planning',
      'Missing direct-pay tuition exclusion'
    ],
    memoryTip: '7.0M exemption, 19K annual, 40% rate'
  },
  {
    id: 'cram-est-002',
    domain: 'EST',
    title: 'Trust Types',
    priority: 'high',
    estimatedMinutes: 15,
    keyPoints: [
      'Revocable living trust: Avoids probate, no tax benefit',
      'Irrevocable trust: Removes assets from estate',
      'ILIT: Keeps life insurance out of estate',
      'GRAT: Transfer appreciation, grantor retains annuity',
      'QPRT: Residence at discount, must survive term',
      'CRT: Income + charitable deduction'
    ],
    commonMistakes: [
      'Thinking revocable trust reduces estate taxes',
      'Forgetting 3-year rule for transferred life insurance',
      'Not funding the trust after creation'
    ]
  },
  
  // INVESTMENT - 11% of exam
  {
    id: 'cram-inv-001',
    domain: 'INV',
    title: 'Risk Measures',
    priority: 'critical',
    estimatedMinutes: 10,
    keyPoints: [
      'Standard deviation: Total volatility',
      'Beta: Systematic/market risk',
      'Alpha: Excess return vs benchmark',
      'Sharpe ratio: (Return - Rf) / Std Dev',
      'Treynor ratio: (Return - Rf) / Beta',
      'R-squared: % of returns explained by market'
    ],
    commonMistakes: [
      'Using Treynor when R² is low (use Sharpe instead)',
      'Confusing alpha and beta',
      'Forgetting beta of 1 = market risk'
    ],
    memoryTip: 'Sharpe for total risk, Treynor for systematic risk'
  },
  {
    id: 'cram-inv-002',
    domain: 'INV',
    title: 'Bond Concepts',
    priority: 'high',
    estimatedMinutes: 12,
    keyPoints: [
      'Duration: % price change for 1% rate change',
      'Longer duration = more interest rate risk',
      'Convexity: Duration change as rates change',
      'YTM assumes reinvestment at same rate',
      'Current yield = Annual coupon / Price',
      'Bond prices and yields move inversely'
    ],
    commonMistakes: [
      'Ignoring reinvestment risk with long bonds',
      'Not understanding modified vs Macaulay duration'
    ]
  },
  
  // RISK MANAGEMENT - 12% of exam
  {
    id: 'cram-risk-001',
    domain: 'RISK',
    title: 'Life Insurance',
    priority: 'critical',
    estimatedMinutes: 12,
    keyPoints: [
      'Term: Temporary coverage, no cash value',
      'Whole Life: Permanent, guaranteed cash value',
      'Universal Life: Flexible premiums, credited interest',
      'VUL: Investment subaccounts, more risk',
      'Transfer for value: Makes death benefit taxable',
      'MEC: 7-pay test, loses FIFO treatment'
    ],
    commonMistakes: [
      'Not recognizing MEC consequences',
      'Forgetting grantor trust exception to transfer for value',
      'Misunderstanding policy loan taxation (non-MEC)'
    ]
  },
  {
    id: 'cram-risk-002',
    domain: 'RISK',
    title: 'Disability Insurance',
    priority: 'high',
    estimatedMinutes: 8,
    keyPoints: [
      'Own occupation: Best definition',
      'Any occupation: Most restrictive',
      'Elimination period: Waiting period (deductible)',
      'Benefit period: How long benefits last',
      'Employer-paid premiums: Benefits taxable',
      'Employee-paid: Benefits tax-free'
    ],
    commonMistakes: [
      'Not understanding taxation based on who pays premiums',
      'Confusing elimination period with benefit period'
    ]
  },
  
  // GENERAL PRINCIPLES - 18% of exam
  {
    id: 'cram-gen-001',
    domain: 'GEN',
    title: 'Time Value of Money',
    priority: 'critical',
    estimatedMinutes: 15,
    keyPoints: [
      'PV = FV / (1 + r)^n',
      'Annuity: Equal payments at regular intervals',
      'Ordinary annuity: End of period',
      'Annuity due: Beginning of period (multiply by 1+r)',
      'NPV > 0 = accept the investment',
      'IRR = rate where NPV = 0'
    ],
    commonMistakes: [
      'Using wrong mode (BEGIN vs END)',
      'Not converting rates to match periods',
      'Forgetting sign convention on cash flows'
    ]
  },
  {
    id: 'cram-gen-002',
    domain: 'GEN',
    title: 'Education Funding',
    priority: 'high',
    estimatedMinutes: 10,
    keyPoints: [
      '529 Plan: Tax-free growth for education',
      'Coverdell ESA: $2,000/year limit, K-12 or college',
      'UGMA/UTMA: Child\'s asset (bad for financial aid)',
      'Series EE/I bonds: Tax-free for education with income limits',
      'FAFSA: Parent 529 = 5.64%, child assets = 20%'
    ],
    commonMistakes: [
      'Forgetting 529 can now fund K-12 ($10K limit)',
      'Grandparent 529 distribution counted as student income',
      'UGMA/UTMA irrevocability at age of majority'
    ]
  },
  
  // PROFESSIONAL CONDUCT - 15% of exam
  {
    id: 'cram-pro-001',
    domain: 'PRO',
    title: 'Fiduciary Duties',
    priority: 'critical',
    estimatedMinutes: 10,
    keyPoints: [
      'Duty of Loyalty: Client interests first',
      'Duty of Care: Competence and diligence',
      'Both duties are ALWAYS required',
      'Conflicts must be disclosed and managed',
      'Cannot be waived by client agreement',
      'Applies to all CFP® services, not just financial planning'
    ],
    commonMistakes: [
      'Thinking disclosure alone cures conflicts',
      'Believing suitability standard acceptable for CFPs',
      'Not recognizing when fiduciary duty applies'
    ]
  },
  {
    id: 'cram-pro-002',
    domain: 'PRO',
    title: 'Practice Standards',
    priority: 'high',
    estimatedMinutes: 8,
    keyPoints: [
      '7-step process (Code of Ethics)',
      'Written agreement required for financial planning',
      'Scope defined clearly upfront',
      'Material changes must be communicated',
      'Reasonable basis for recommendations',
      'Document, document, document'
    ],
    commonMistakes: [
      'Not understanding when "financial planning" triggers requirements',
      'Failing to update recommendations as circumstances change'
    ]
  }
];

// Critical formulas for exam
export const CFP_CRAM_FORMULAS: CramFormula[] = [
  // Time Value of Money
  {
    id: 'formula-001',
    domain: 'GEN',
    name: 'Present Value (Single Sum)',
    formula: 'PV = FV / (1 + r)^n',
    variables: {
      'PV': 'Present Value',
      'FV': 'Future Value',
      'r': 'Rate per period (decimal)',
      'n': 'Number of periods'
    },
    example: 'PV of $10,000 in 5 years at 6%: PV = $10,000 / (1.06)^5 = $7,473',
    whenToUse: 'Finding today\'s value of a future lump sum'
  },
  {
    id: 'formula-002',
    domain: 'GEN',
    name: 'Future Value (Single Sum)',
    formula: 'FV = PV × (1 + r)^n',
    variables: {
      'FV': 'Future Value',
      'PV': 'Present Value',
      'r': 'Rate per period',
      'n': 'Number of periods'
    },
    example: 'FV of $5,000 at 8% for 10 years: FV = $5,000 × (1.08)^10 = $10,795',
    whenToUse: 'Finding future value of current lump sum'
  },
  {
    id: 'formula-003',
    domain: 'GEN',
    name: 'Rule of 72',
    formula: 'Years to double = 72 / Annual Rate',
    variables: {
      'Years': 'Time to double investment',
      'Rate': 'Annual return (as whole number)'
    },
    example: 'At 8% return: 72 / 8 = 9 years to double',
    whenToUse: 'Quick estimate of doubling time'
  },
  
  // Investment Metrics
  {
    id: 'formula-004',
    domain: 'INV',
    name: 'Sharpe Ratio',
    formula: 'Sharpe = (Rp - Rf) / σp',
    variables: {
      'Rp': 'Portfolio return',
      'Rf': 'Risk-free rate',
      'σp': 'Portfolio standard deviation'
    },
    example: 'Return 12%, Rf 3%, StdDev 15%: Sharpe = (12-3)/15 = 0.60',
    whenToUse: 'Compare risk-adjusted returns using total risk'
  },
  {
    id: 'formula-005',
    domain: 'INV',
    name: 'Treynor Ratio',
    formula: 'Treynor = (Rp - Rf) / βp',
    variables: {
      'Rp': 'Portfolio return',
      'Rf': 'Risk-free rate',
      'βp': 'Portfolio beta'
    },
    example: 'Return 12%, Rf 3%, Beta 1.2: Treynor = (12-3)/1.2 = 7.5',
    whenToUse: 'Compare risk-adjusted returns using systematic risk (only when well-diversified)'
  },
  {
    id: 'formula-006',
    domain: 'INV',
    name: 'Alpha (Jensen\'s)',
    formula: 'α = Rp - [Rf + β(Rm - Rf)]',
    variables: {
      'α': 'Alpha (excess return)',
      'Rp': 'Portfolio return',
      'Rf': 'Risk-free rate',
      'β': 'Portfolio beta',
      'Rm': 'Market return'
    },
    example: 'Return 15%, Rf 3%, Beta 1.2, Market 10%: α = 15 - [3 + 1.2(10-3)] = 3.6%',
    whenToUse: 'Measure excess return relative to expected (CAPM) return'
  },
  {
    id: 'formula-007',
    domain: 'INV',
    name: 'Duration Price Change',
    formula: 'ΔPrice ≈ -Duration × ΔYield × Price',
    variables: {
      'Duration': 'Modified duration',
      'ΔYield': 'Change in yield (decimal)',
      'Price': 'Current bond price'
    },
    example: 'Duration 7, 1% rate increase, $1,000 bond: ΔPrice = -7 × 0.01 × 1000 = -$70',
    whenToUse: 'Estimate bond price change for interest rate changes'
  },
  
  // Retirement
  {
    id: 'formula-008',
    domain: 'RET',
    name: 'Capital Needs at Retirement',
    formula: 'Capital = Annual Need / Safe Withdrawal Rate',
    variables: {
      'Capital': 'Required nest egg',
      'Annual Need': 'Annual retirement income',
      'Safe Withdrawal Rate': 'Typically 4%'
    },
    example: 'Need $80,000/year at 4%: Capital = $80,000 / 0.04 = $2,000,000',
    whenToUse: 'Calculate retirement savings target'
  },
  {
    id: 'formula-009',
    domain: 'RET',
    name: 'RMD Calculation',
    formula: 'RMD = Account Balance (Dec 31) / Life Expectancy Factor',
    variables: {
      'RMD': 'Required Minimum Distribution',
      'Balance': 'Prior year-end balance',
      'Factor': 'IRS Uniform Lifetime Table factor'
    },
    example: 'Balance $500,000, age 75 (factor 24.6): RMD = $500,000 / 24.6 = $20,325',
    whenToUse: 'Calculate annual required distribution'
  },
  
  // Tax
  {
    id: 'formula-010',
    domain: 'TAX',
    name: 'After-Tax Return',
    formula: 'After-Tax Return = Pre-Tax Return × (1 - Tax Rate)',
    variables: {
      'After-Tax': 'Net return after taxes',
      'Pre-Tax': 'Gross return',
      'Tax Rate': 'Marginal tax rate (decimal)'
    },
    example: '6% return, 24% bracket: After-tax = 6% × (1 - 0.24) = 4.56%',
    whenToUse: 'Compare taxable vs tax-free investments'
  },
  {
    id: 'formula-011',
    domain: 'TAX',
    name: 'Tax-Equivalent Yield',
    formula: 'TEY = Municipal Yield / (1 - Tax Rate)',
    variables: {
      'TEY': 'Tax-equivalent yield',
      'Municipal': 'Tax-free bond yield',
      'Tax Rate': 'Marginal rate (decimal)'
    },
    example: '3% muni, 32% bracket: TEY = 3% / (1 - 0.32) = 4.41% equivalent',
    whenToUse: 'Compare muni bond to taxable bond'
  },
  
  // Insurance
  {
    id: 'formula-012',
    domain: 'RISK',
    name: 'Human Life Value',
    formula: 'HLV = Annual Income × Present Value Factor',
    variables: {
      'HLV': 'Human Life Value (insurance need)',
      'Income': 'Annual earnings to replace',
      'PV Factor': 'Based on working years remaining and rate'
    },
    example: '$100,000 income, 25 years, 5%: PV factor ~14.09, HLV = $1,409,000',
    whenToUse: 'Calculate life insurance needs—income replacement method'
  },
  {
    id: 'formula-013',
    domain: 'RISK',
    name: 'Capital Retention (Life Insurance)',
    formula: 'Capital = Annual Need / Rate of Return',
    variables: {
      'Capital': 'Insurance amount needed',
      'Annual Need': 'Income to replace',
      'Rate': 'Assumed investment return'
    },
    example: 'Replace $80,000/year at 5%: Capital = $80,000 / 0.05 = $1,600,000',
    whenToUse: 'Capital retention approach to insurance needs'
  }
];

// 7-Day Study Plan
export const CFP_CRAM_SCHEDULE: CramDay[] = [
  {
    day: 1,
    title: 'Retirement Planning Deep Dive',
    focusDomains: ['RET'],
    topics: ['cram-ret-001', 'cram-ret-002', 'cram-ret-003'],
    formulaCount: 3,
    practiceQuestions: 40,
    estimatedHours: 4
  },
  {
    day: 2,
    title: 'Tax & Investment Planning',
    focusDomains: ['TAX', 'INV'],
    topics: ['cram-tax-001', 'cram-tax-002', 'cram-tax-003', 'cram-inv-001', 'cram-inv-002'],
    formulaCount: 4,
    practiceQuestions: 40,
    estimatedHours: 4
  },
  {
    day: 3,
    title: 'Estate Planning & Trusts',
    focusDomains: ['EST'],
    topics: ['cram-est-001', 'cram-est-002'],
    formulaCount: 2,
    practiceQuestions: 35,
    estimatedHours: 4
  },
  {
    day: 4,
    title: 'Risk Management & Insurance',
    focusDomains: ['RISK'],
    topics: ['cram-risk-001', 'cram-risk-002'],
    formulaCount: 2,
    practiceQuestions: 35,
    estimatedHours: 4
  },
  {
    day: 5,
    title: 'General Principles & Professional Conduct',
    focusDomains: ['GEN', 'PRO'],
    topics: ['cram-gen-001', 'cram-gen-002', 'cram-pro-001', 'cram-pro-002'],
    formulaCount: 3,
    practiceQuestions: 40,
    estimatedHours: 4
  },
  {
    day: 6,
    title: 'Full Mock Exam & Review',
    focusDomains: ['ALL'],
    topics: [],
    formulaCount: 0,
    practiceQuestions: 170,
    estimatedHours: 6
  },
  {
    day: 7,
    title: 'Light Review & Rest',
    focusDomains: ['ALL'],
    topics: [],
    formulaCount: 13,
    practiceQuestions: 0,
    estimatedHours: 2
  }
];

// Quick reference cards for exam day
export const CFP_EXAM_DAY_REMINDERS = {
  timing: [
    '170 questions in 3 hours = 64 seconds per question',
    'Don\'t spend more than 2 minutes on any question',
    'Flag and move on, come back if time permits',
    'Optional break at question 85'
  ],
  mentalChecklist: [
    'Read the QUESTION first, then the scenario',
    'Eliminate obviously wrong answers',
    'Watch for absolutes: always, never, only',
    '"Best" means compare all options',
    'Trust your first instinct unless proven wrong'
  ],
  commonTraps: [
    'LTCG 0% rate still requires taxable income analysis',
    'RMDs begin at 73, not 70.5 or 72',
    'Spousal benefit requires PRIMARY earner to file',
    'Step-up in basis at death—NOT for IRAs (IRD)',
    '3-year rule on transferred life insurance',
    'Wash sale = 30 days BEFORE and after'
  ],
  keyNumbers: [
    '$7.0M estate exemption (2026, TCJA sunset)',
    '$19,000 annual gift exclusion',
    '$24,500 401(k) contribution limit',
    '$7,500 IRA contribution limit',
    '$71,500 total 401(k) limit',
    'Age 73 for RMDs',
    'Age 67 for full retirement age'
  ]
};

interface CramSessionState {
  currentDay: number;
  completedTopics: string[];
  formulasReviewed: string[];
  questionsAnswered: number;
  startDate: Date | null;
  examDate: Date | null;
}

let cramState: CramSessionState = {
  currentDay: 1,
  completedTopics: [],
  formulasReviewed: [],
  questionsAnswered: 0,
  startDate: null,
  examDate: null
};

/**
 * Initialize cram mode with exam date
 */
export function startCramMode(examDate: Date): CramSessionState {
  const today = new Date();
  const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  cramState = {
    currentDay: Math.max(1, 8 - daysUntilExam),
    completedTopics: [],
    formulasReviewed: [],
    questionsAnswered: 0,
    startDate: today,
    examDate
  };
  
  saveState();
  return cramState;
}

/**
 * Get today's study plan
 */
export function getTodaysStudyPlan(): Omit<CramDay, 'topics'> & { topics: CramTopic[]; formulas: CramFormula[] } {
  const day = CFP_CRAM_SCHEDULE[cramState.currentDay - 1] || CFP_CRAM_SCHEDULE[0];
  
  const topics = day.topics.map(id => 
    CFP_CRAM_TOPICS.find(t => t.id === id)
  ).filter((t): t is CramTopic => t !== undefined);
  
  const formulas = day.focusDomains[0] === 'ALL'
    ? CFP_CRAM_FORMULAS
    : CFP_CRAM_FORMULAS.filter(f => day.focusDomains.includes(f.domain));
  
  return {
    ...day,
    topics,
    formulas
  };
}

/**
 * Mark a topic as completed
 */
export function completeTopic(topicId: string): void {
  if (!cramState.completedTopics.includes(topicId)) {
    cramState.completedTopics.push(topicId);
    saveState();
  }
}

/**
 * Mark formula as reviewed
 */
export function reviewFormula(formulaId: string): void {
  if (!cramState.formulasReviewed.includes(formulaId)) {
    cramState.formulasReviewed.push(formulaId);
    saveState();
  }
}

/**
 * Record practice questions completed
 */
export function recordPracticeQuestions(count: number): void {
  cramState.questionsAnswered += count;
  saveState();
}

/**
 * Advance to next day
 */
export function advanceDay(): void {
  if (cramState.currentDay < 7) {
    cramState.currentDay++;
    saveState();
  }
}

/**
 * Get overall cram progress
 */
export function getCramProgress(): {
  currentDay: number;
  daysRemaining: number;
  topicsCompleted: number;
  totalTopics: number;
  formulasReviewed: number;
  totalFormulas: number;
  questionsAnswered: number;
  percentComplete: number;
  isOnTrack: boolean;
} {
  const totalTopics = CFP_CRAM_TOPICS.length;
  const totalFormulas = CFP_CRAM_FORMULAS.length;
  
  const daysRemaining = cramState.examDate
    ? Math.ceil((cramState.examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 7; 
  
  const expectedProgress = ((7 - daysRemaining) / 7) * 100;
  const actualProgress = ((cramState.completedTopics.length / totalTopics) * 50) +
    ((cramState.formulasReviewed.length / totalFormulas) * 30) +
    (Math.min(cramState.questionsAnswered / 350, 1) * 20);
  
  return {
    currentDay: cramState.currentDay,
    daysRemaining,
    topicsCompleted: cramState.completedTopics.length,
    totalTopics,
    formulasReviewed: cramState.formulasReviewed.length,
    totalFormulas,
    questionsAnswered: cramState.questionsAnswered,
    percentComplete: actualProgress,
    isOnTrack: actualProgress >= expectedProgress - 10
  };
}

/**
 * Get all critical topics (priority = 'critical')
 */
export function getCriticalTopics(): CramTopic[] {
  return CFP_CRAM_TOPICS.filter(t => t.priority === 'critical');
}

/**
 * Get topics by domain
 */
export function getTopicsByDomain(domain: string): CramTopic[] {
  return CFP_CRAM_TOPICS.filter(t => t.domain === domain);
}

/**
 * Get formulas by domain
 */
export function getFormulasByDomain(domain: string): CramFormula[] {
  return CFP_CRAM_FORMULAS.filter(f => f.domain === domain);
}

/**
 * Generate printable cheat sheet
 */
export function generateCheatSheet(): string {
  let sheet = '# CFP EXAM CHEAT SHEET\n\n';
  
  sheet += '## KEY NUMBERS TO KNOW\n';
  CFP_EXAM_DAY_REMINDERS.keyNumbers.forEach(n => {
    sheet += `- ${n}\n`;
  });
  
  sheet += '\n## FORMULAS\n';
  CFP_CRAM_FORMULAS.forEach(f => {
    sheet += `\n### ${f.name}\n`;
    sheet += `${f.formula}\n`;
    sheet += `*When to use: ${f.whenToUse}*\n`;
  });
  
  sheet += '\n## COMMON TRAPS\n';
  CFP_EXAM_DAY_REMINDERS.commonTraps.forEach(t => {
    sheet += `- ⚠️ ${t}\n`;
  });
  
  sheet += '\n## EXAM DAY TIMING\n';
  CFP_EXAM_DAY_REMINDERS.timing.forEach(t => {
    sheet += `- ${t}\n`;
  });
  
  return sheet;
}

/**
 * Get state
 */
export function getCramState(): CramSessionState {
  return { ...cramState };
}

/**
 * Reset cram mode
 */
export function resetCramMode(): void {
  cramState = {
    currentDay: 1,
    completedTopics: [],
    formulasReviewed: [],
    questionsAnswered: 0,
    startDate: null,
    examDate: null
  };
  saveState();
}

// Persistence
function saveState(): void {
  localStorage.setItem('cfp-cram-mode', JSON.stringify(cramState));
}

export function loadCramState(): void {
  const saved = localStorage.getItem('cfp-cram-mode');
  if (saved) {
    try {
      cramState = JSON.parse(saved);
    } catch {
      resetCramMode();
    }
  }
}

export default {
  CFP_CRAM_TOPICS,
  CFP_CRAM_FORMULAS,
  CFP_CRAM_SCHEDULE,
  CFP_EXAM_DAY_REMINDERS,
  startCramMode,
  getTodaysStudyPlan,
  completeTopic,
  reviewFormula,
  recordPracticeQuestions,
  advanceDay,
  getCramProgress,
  getCriticalTopics,
  getTopicsByDomain,
  getFormulasByDomain,
  generateCheatSheet,
  getCramState,
  resetCramMode,
  loadCramState
};
