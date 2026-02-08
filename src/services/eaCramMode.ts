/**
 * EA Cram Mode Service
 * 
 * Intensive last-minute study mode for IRS SEE exam featuring:
 * - High-yield topics by exam weight
 * - Essential tax concepts and forms
 * - Key terminology flashcards
 * - Rapid-fire practice questions
 * - 3-5 day study plan per part
 * 
 * Based on IRS SEE Content Outline 2025-2026
 */

import { EASectionId } from '../courses/ea/config';

// Types
export interface CramTopic {
  id: string;
  part: EASectionId;
  domain: string;
  title: string;
  priority: 'critical' | 'high' | 'medium';
  estimatedMinutes: number;
  keyPoints: string[];
  mnemonics?: string[];
  irsFormsRefs?: string[];
  commonQuestions: string[];
}

export interface CramFormula {
  id: string;
  name: string;
  part: EASectionId;
  formula: string;
  description: string;
  example: string;
  examTip: string;
}

export interface CramDay {
  day: number;
  title: string;
  focusDomains: string[];
  topics: string[]; // Topic IDs
  formulas: string[];
  practiceQuestions: number;
  estimatedHours: number;
}

export interface CramState {
  part: EASectionId;
  currentDay: number;
  startDate: Date | null;
  completedTopics: string[];
  formulasReviewed: string[];
  questionsAnswered: number;
  correctAnswers: number;
  isActive: boolean;
}

// High-yield EA topics organized by part
export const EA_CRAM_TOPICS: CramTopic[] = [
  // ============================================================================
  // SEE1 - INDIVIDUALS (100 questions, 3.5 hours)
  // ============================================================================
  
  // Domain SEE1-2: Income and Assets (20%)
  {
    id: 'cram-see1-001',
    part: 'SEE1',
    domain: 'SEE1-2',
    title: 'Gross Income Inclusions',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'Wages, salaries, tips - always taxable',
      'Interest income - taxable when received or credited',
      'Dividend income - qualified vs ordinary treatment',
      'Social Security benefits - up to 85% taxable',
      'Unemployment compensation - fully taxable',
      'Self-employment income - Schedule C or C-EZ',
    ],
    mnemonics: ['WIDSUS = Wages, Interest, Dividends, Social Security, Unemployment, Self-employment'],
    irsFormsRefs: ['Form 1040', 'Schedule B', 'Schedule C', 'SSA-1099'],
    commonQuestions: [
      'What percentage of Social Security benefits is taxable?',
      'How is qualified dividend income taxed?',
      'When is interest income recognized?',
    ],
  },
  {
    id: 'cram-see1-002',
    part: 'SEE1',
    domain: 'SEE1-2',
    title: 'Capital Gains and Losses',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Short-term: held ≤1 year, taxed as ordinary income',
      'Long-term: held >1 year, preferential rates (0%, 15%, 20%)',
      'Netting process: ST gains vs ST losses, LT gains vs LT losses',
      '$3,000 net capital loss limit against ordinary income',
      'Unused losses carry forward indefinitely',
      'Wash sale rule: 30 days before/after',
    ],
    mnemonics: ['STOLT = Short Term Or Long Term (>1 year = LT)'],
    irsFormsRefs: ['Schedule D', 'Form 8949'],
    commonQuestions: [
      'What is the holding period for long-term capital gains?',
      'How much capital loss can offset ordinary income?',
      'What is the wash sale rule period?',
    ],
  },
  {
    id: 'cram-see1-003',
    part: 'SEE1',
    domain: 'SEE1-3',
    title: 'Above-the-Line Deductions',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'Traditional IRA contributions (up to limits)',
      'Student loan interest ($2,500 max)',
      'Health Savings Account (HSA) contributions',
      'Self-employment tax deduction (50%)',
      'Self-employed health insurance premiums',
      'Alimony paid (pre-2019 agreements only)',
    ],
    mnemonics: ['ISSSHA = IRA, Student loans, SEP, Self-emp tax, Health, Alimony'],
    irsFormsRefs: ['Schedule 1', 'Form 8889'],
    commonQuestions: [
      'What is the limit for student loan interest deduction?',
      'Are self-employment taxes fully deductible?',
      'Which alimony payments are deductible?',
    ],
  },
  {
    id: 'cram-see1-004',
    part: 'SEE1',
    domain: 'SEE1-3',
    title: 'Itemized Deductions',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Medical expenses >7.5% of AGI',
      'SALT (State/Local taxes) capped at $10,000',
      'Mortgage interest on acquisition debt up to $750K',
      'Charitable contributions (limits vary by type)',
      'Casualty/theft losses only for federally declared disasters',
    ],
    mnemonics: ['MSMCC = Medical, SALT, Mortgage, Charitable, Casualty'],
    irsFormsRefs: ['Schedule A'],
    commonQuestions: [
      'What is the SALT deduction limit?',
      'What is the AGI threshold for medical expenses?',
      'What is the mortgage acquisition debt limit?',
    ],
  },
  {
    id: 'cram-see1-005',
    part: 'SEE1',
    domain: 'SEE1-4',
    title: 'Tax Credits for Individuals',
    priority: 'high',
    estimatedMinutes: 25,
    keyPoints: [
      'Child Tax Credit: $2,000 per qualifying child, refundable portion',
      'Earned Income Credit (EIC): refundable, income limits',
      'Child and Dependent Care Credit: up to $3,000/$6,000',
      'American Opportunity Credit: education, up to $2,500',
      'Lifetime Learning Credit: education, up to $2,000',
      'Saver\'s Credit: retirement contributions',
    ],
    mnemonics: ['CECALS = Child, EIC, Care, American Opp, Lifetime, Savers'],
    irsFormsRefs: ['Schedule 3', 'Schedule 8812', 'Form 2441', 'Form 8863'],
    commonQuestions: [
      'Which credits are refundable?',
      'What is the maximum Child Tax Credit?',
      'Can AOTC and LLC be claimed in the same year?',
    ],
  },
  
  // SEE1 Filing Status
  {
    id: 'cram-see1-006',
    part: 'SEE1',
    domain: 'SEE1-1',
    title: 'Filing Status and Requirements',
    priority: 'high',
    estimatedMinutes: 15,
    keyPoints: [
      'Single, MFJ, MFS, HOH, QSS',
      'HOH requires: unmarried, >50% household costs, qualifying person',
      'MFJ vs MFS: usually MFJ is more beneficial',
      'Filing thresholds based on age, status, dependency',
      'Dependents may need to file if unearned income > threshold',
    ],
    mnemonics: ['SMHQQ = Single, Married (J/S), HOH, QSS'],
    irsFormsRefs: ['Form 1040'],
    commonQuestions: [
      'What qualifies someone for Head of Household?',
      'When might MFS be beneficial?',
      'What are the HOH household cost requirements?',
    ],
  },
  
  // ============================================================================
  // SEE2 - BUSINESSES (100 questions, 3.5 hours)
  // ============================================================================
  
  // Domain SEE2-2: Business Financial Information (38.8%)
  {
    id: 'cram-see2-001',
    part: 'SEE2',
    domain: 'SEE2-2',
    title: 'Business Income and Expenses',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Cash vs accrual accounting methods',
      'Ordinary and necessary business expenses',
      'Section 199A QBI deduction (20%)',
      'Depreciation: MACRS, Section 179, Bonus',
      'Section 179 limits and phaseouts',
      'Net Operating Loss (NOL) rules',
    ],
    mnemonics: ['QBI = Qualified Business Income (20%)'],
    irsFormsRefs: ['Schedule C', 'Form 4562', 'Form 8995'],
    commonQuestions: [
      'What is the Section 199A deduction limit?',
      'When can cash method be used?',
      'What is the Section 179 expense limit?',
    ],
  },
  {
    id: 'cram-see2-002',
    part: 'SEE2',
    domain: 'SEE2-2',
    title: 'Depreciation and Amortization',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'MACRS: 3, 5, 7, 10, 15, 20, 27.5, 39 year classes',
      '5-year: computers, autos; 7-year: furniture, equipment',
      '27.5 years: residential rental; 39 years: commercial',
      'Section 179: immediate expense election',
      'Bonus depreciation: 60% (2024), declining annually',
      'Listed property rules for mixed-use assets',
    ],
    mnemonics: ['5-7-27-39 = Computers, Furniture, Residential, Commercial'],
    irsFormsRefs: ['Form 4562'],
    commonQuestions: [
      'What is the MACRS life for office furniture?',
      'What is the recovery period for residential rental property?',
      'Can Section 179 create a loss?',
    ],
  },
  {
    id: 'cram-see2-003',
    part: 'SEE2',
    domain: 'SEE2-1',
    title: 'Entity Selection and Characteristics',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Sole proprietorship: Schedule C, SE tax on all profits',
      'Partnership: Form 1065, K-1s, pass-through',
      'S Corporation: Form 1120-S, reasonable salary requirement',
      'C Corporation: Form 1120, double taxation',
      'LLC: default classification depends on members',
    ],
    mnemonics: ['SPSLC = Sole Prop, Partnership, S Corp, LLC, C Corp'],
    irsFormsRefs: ['Schedule C', 'Form 1065', 'Form 1120-S', 'Form 1120'],
    commonQuestions: [
      'What form does a partnership file?',
      'How is an S corp shareholder-employee compensated?',
      'What is double taxation?',
    ],
  },
  {
    id: 'cram-see2-004',
    part: 'SEE2',
    domain: 'SEE2-1',
    title: 'Partnership Taxation',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'No entity-level tax (pass-through)',
      'Partner\'s basis: contributions + income - distributions - losses',
      'Guaranteed payments: salary-like, deductible by partnership',
      'Special allocations must have substantial economic effect',
      'At-risk and passive loss rules apply',
    ],
    irsFormsRefs: ['Form 1065', 'Schedule K-1'],
    commonQuestions: [
      'How does partnership income flow to partners?',
      'What is the treatment of guaranteed payments?',
      'How is a partner\'s basis calculated?',
    ],
  },
  {
    id: 'cram-see2-005',
    part: 'SEE2',
    domain: 'SEE2-2',
    title: 'Employment Taxes',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'FICA: Social Security (6.2%) + Medicare (1.45%)',
      'Social Security wage base limit (adjusted annually)',
      'Additional Medicare tax: 0.9% over $200K/$250K',
      'Self-employment tax: 15.3% (on 92.35% of net)',
      'FUTA: 6% on first $7,000 (with credits)',
    ],
    mnemonics: ['FICA = Federal Insurance Contributions Act'],
    irsFormsRefs: ['Form 941', 'Schedule SE', 'Form 940'],
    commonQuestions: [
      'What is the self-employment tax rate?',
      'What is the Social Security wage base?',
      'When does additional Medicare tax apply?',
    ],
  },
  
  // ============================================================================
  // SEE3 - REPRESENTATION (100 questions, 3.5 hours)
  // ============================================================================
  
  // Domain SEE3-2: Circular 230 (17.6%) - CRITICAL
  {
    id: 'cram-see3-001',
    part: 'SEE3',
    domain: 'SEE3-2',
    title: 'Circular 230 Requirements',
    priority: 'critical',
    estimatedMinutes: 30,
    keyPoints: [
      'Who may practice: attorneys, CPAs, EAs, others with limited rights',
      'Due diligence: must verify client information',
      'Conflict of interest rules and disclosure requirements',
      'Written advice standards',
      'Advertising and solicitation rules',
      'Continuing education requirements for EAs',
    ],
    mnemonics: ['DWCAW = Due diligence, Written advice, Conflict, Advertising, Who may practice'],
    irsFormsRefs: ['Circular 230'],
    commonQuestions: [
      'Who is authorized to practice before the IRS?',
      'What due diligence is required?',
      'What are the CE requirements for EAs?',
    ],
  },
  {
    id: 'cram-see3-002',
    part: 'SEE3',
    domain: 'SEE3-2',
    title: 'Practitioner Penalties (Circular 230)',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'Censure: public/private reprimand',
      'Suspension: temporary practice prohibition',
      'Disbarment: permanent practice prohibition',
      'Monetary penalty: up to 100% of income from practice',
      'Incompetence and disreputable conduct defined',
    ],
    mnemonics: ['CSDM = Censure, Suspension, Disbarment, Monetary'],
    irsFormsRefs: ['Circular 230'],
    commonQuestions: [
      'What is disreputable conduct?',
      'What penalties can the OPR impose?',
      'When can a practitioner be suspended?',
    ],
  },
  {
    id: 'cram-see3-003',
    part: 'SEE3',
    domain: 'SEE3-1',
    title: 'IRS Notices and Procedures',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'CP2000: underreporter notice (30-day response)',
      'Notice of Deficiency (90-day letter): petition Tax Court',
      'Collection Due Process (CDP): 30 days to appeal',
      'Statute of limitations: generally 3 years, 6 for substantial omission',
      'Power of Attorney (Form 2848) for representation',
    ],
    irsFormsRefs: ['Form 2848', 'Form 8821'],
    commonQuestions: [
      'What is the response period for a Notice of Deficiency?',
      'What is the general statute of limitations?',
      'What form authorizes IRS representation?',
    ],
  },
  {
    id: 'cram-see3-004',
    part: 'SEE3',
    domain: 'SEE3-3',
    title: 'Collection Alternatives',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Installment Agreement: monthly payments if can\'t pay in full',
      'Currently Not Collectible (CNC): temporary hardship status',
      'Offer in Compromise (OIC): settle for less than full amount',
      'Innocent Spouse Relief: relief from joint liability',
      'Injured Spouse: refund protection',
    ],
    mnemonics: ['IOICI = Installment, OIC, Injured/Innocent spouse, CNC'],
    irsFormsRefs: ['Form 9465', 'Form 656', 'Form 8857', 'Form 8379'],
    commonQuestions: [
      'What are the criteria for an OIC?',
      'What is the difference between innocent and injured spouse?',
      'When is CNC status appropriate?',
    ],
  },
  {
    id: 'cram-see3-005',
    part: 'SEE3',
    domain: 'SEE3-3',
    title: 'Audit and Appeals',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Correspondence, office, field audit types',
      'Appeals conference: 30 days from exam report',
      'IRS Independent Office of Appeals',
      'Burden of proof generally on taxpayer',
      'Tax Court petition: 90 days from Notice of Deficiency',
    ],
    irsFormsRefs: ['Form 870', 'Form 12203'],
    commonQuestions: [
      'What types of audits does the IRS conduct?',
      'How long to petition Tax Court?',
      'Who has the burden of proof in an audit?',
    ],
  },
];

// Essential formulas and calculations for EA exam
export const EA_CRAM_FORMULAS: CramFormula[] = [
  {
    id: 'formula-001',
    name: 'Self-Employment Tax',
    part: 'SEE1',
    formula: 'SE Tax = Net SE Income × 92.35% × 15.3%',
    description: 'Self-employment tax on sole proprietors and partners',
    example: 'If net SE income is $100,000: $100,000 × 0.9235 × 0.153 = $14,130',
    examTip: 'Remember: 92.35% is the adjustment, 15.3% is the combined rate',
  },
  {
    id: 'formula-002',
    name: 'Taxable Social Security',
    part: 'SEE1',
    formula: 'Provisional Income = AGI + 50% of SS + Tax-exempt interest',
    description: 'Determines how much Social Security is taxable (up to 85%)',
    example: 'Use thresholds: $25K/$32K (single), $32K/$44K (MFJ)',
    examTip: 'Maximum taxable is 85%, never 100%',
  },
  {
    id: 'formula-003',
    name: 'Net Capital Loss Limit',
    part: 'SEE1',
    formula: 'Max ordinary income offset = $3,000 ($1,500 MFS)',
    description: 'Annual limit on capital losses against ordinary income',
    example: '$10,000 net loss: deduct $3,000, carry forward $7,000',
    examTip: 'Unlimited carryforward, no carryback for individuals',
  },
  {
    id: 'formula-004',
    name: 'MACRS Depreciation',
    part: 'SEE2',
    formula: 'Annual Depr = Cost × MACRS % × (1 - Salvage Value)',
    description: 'Accelerated depreciation for business assets',
    example: '5-year asset: 20%, 32%, 19.2%, 11.52%, 11.52%, 5.76%',
    examTip: 'Half-year convention usually applies',
  },
  {
    id: 'formula-005',
    name: 'QBI Deduction',
    part: 'SEE2',
    formula: 'QBI Deduction = Lesser of: 20% of QBI OR 20% of Taxable Income',
    description: 'Section 199A deduction for qualified business income',
    example: '$200,000 QBI, $180,000 TI: $36,000 deduction (20% of $180K)',
    examTip: 'W-2 wage and property limitations apply above thresholds',
  },
  {
    id: 'formula-006',
    name: 'Penalty for Failure to File',
    part: 'SEE3',
    formula: '5% per month, max 25% (+ fraud penalty if applicable)',
    description: 'Penalty for not filing a tax return on time',
    example: '3 months late on $10,000 tax: $10,000 × 15% = $1,500',
    examTip: 'Failure to pay is 0.5% per month, max 25%',
  },
  {
    id: 'formula-007',
    name: 'Accuracy-Related Penalty',
    part: 'SEE3',
    formula: '20% of the underpayment',
    description: 'Penalty for negligence or substantial understatement',
    example: '$5,000 understatement: $1,000 penalty',
    examTip: 'Substantial = greater of $5,000 or 10% of correct tax',
  },
];

// 5-day cram study plans by part
export const EA_CRAM_PLANS: Record<EASectionId, CramDay[]> = {
  SEE1: [
    {
      day: 1,
      title: 'Income Types & Filing Status',
      focusDomains: ['SEE1-1', 'SEE1-2'],
      topics: ['cram-see1-001', 'cram-see1-006'],
      formulas: ['formula-002'],
      practiceQuestions: 30,
      estimatedHours: 3,
    },
    {
      day: 2,
      title: 'Capital Gains & Deductions',
      focusDomains: ['SEE1-2', 'SEE1-3'],
      topics: ['cram-see1-002', 'cram-see1-003', 'cram-see1-004'],
      formulas: ['formula-003'],
      practiceQuestions: 35,
      estimatedHours: 3.5,
    },
    {
      day: 3,
      title: 'Credits & Self-Employment',
      focusDomains: ['SEE1-3', 'SEE1-4'],
      topics: ['cram-see1-005'],
      formulas: ['formula-001'],
      practiceQuestions: 30,
      estimatedHours: 3,
    },
    {
      day: 4,
      title: 'Full Practice Simulation',
      focusDomains: ['SEE1-1', 'SEE1-2', 'SEE1-3', 'SEE1-4'],
      topics: [],
      formulas: [],
      practiceQuestions: 100,
      estimatedHours: 3.5,
    },
    {
      day: 5,
      title: 'Weak Area Review & Final Prep',
      focusDomains: [],
      topics: [],
      formulas: ['formula-001', 'formula-002', 'formula-003'],
      practiceQuestions: 50,
      estimatedHours: 2.5,
    },
  ],
  SEE2: [
    {
      day: 1,
      title: 'Entity Types & Selection',
      focusDomains: ['SEE2-1'],
      topics: ['cram-see2-003', 'cram-see2-004'],
      formulas: [],
      practiceQuestions: 30,
      estimatedHours: 3,
    },
    {
      day: 2,
      title: 'Business Income & Expenses',
      focusDomains: ['SEE2-2'],
      topics: ['cram-see2-001', 'cram-see2-005'],
      formulas: ['formula-005'],
      practiceQuestions: 35,
      estimatedHours: 3.5,
    },
    {
      day: 3,
      title: 'Depreciation Deep Dive',
      focusDomains: ['SEE2-2'],
      topics: ['cram-see2-002'],
      formulas: ['formula-004'],
      practiceQuestions: 30,
      estimatedHours: 3,
    },
    {
      day: 4,
      title: 'Full Practice Simulation',
      focusDomains: ['SEE2-1', 'SEE2-2', 'SEE2-3'],
      topics: [],
      formulas: [],
      practiceQuestions: 100,
      estimatedHours: 3.5,
    },
    {
      day: 5,
      title: 'Weak Area Review & Final Prep',
      focusDomains: [],
      topics: [],
      formulas: ['formula-004', 'formula-005'],
      practiceQuestions: 50,
      estimatedHours: 2.5,
    },
  ],
  SEE3: [
    {
      day: 1,
      title: 'Circular 230 Essentials',
      focusDomains: ['SEE3-2'],
      topics: ['cram-see3-001', 'cram-see3-002'],
      formulas: [],
      practiceQuestions: 30,
      estimatedHours: 3,
    },
    {
      day: 2,
      title: 'IRS Procedures & Notices',
      focusDomains: ['SEE3-1'],
      topics: ['cram-see3-003'],
      formulas: ['formula-006', 'formula-007'],
      practiceQuestions: 35,
      estimatedHours: 3.5,
    },
    {
      day: 3,
      title: 'Collection & Appeals',
      focusDomains: ['SEE3-3'],
      topics: ['cram-see3-004', 'cram-see3-005'],
      formulas: [],
      practiceQuestions: 30,
      estimatedHours: 3,
    },
    {
      day: 4,
      title: 'Full Practice Simulation',
      focusDomains: ['SEE3-1', 'SEE3-2', 'SEE3-3', 'SEE3-4'],
      topics: [],
      formulas: [],
      practiceQuestions: 100,
      estimatedHours: 3.5,
    },
    {
      day: 5,
      title: 'Circular 230 Review & Final Prep',
      focusDomains: ['SEE3-2'],
      topics: ['cram-see3-001', 'cram-see3-002'],
      formulas: ['formula-006', 'formula-007'],
      practiceQuestions: 50,
      estimatedHours: 2.5,
    },
  ],
};

// Storage and state management
const STORAGE_KEY = 'ea-cram-state';

let cramState: CramState = {
  part: 'SEE1',
  currentDay: 1,
  startDate: null,
  completedTopics: [],
  formulasReviewed: [],
  questionsAnswered: 0,
  correctAnswers: 0,
  isActive: false,
};

/**
 * Initialize cram mode for a specific part
 */
export function initializeCramMode(part: EASectionId): CramState {
  cramState = {
    part,
    currentDay: 1,
    startDate: new Date(),
    completedTopics: [],
    formulasReviewed: [],
    questionsAnswered: 0,
    correctAnswers: 0,
    isActive: true,
  };
  saveCramState();
  return cramState;
}

/**
 * Get current cram state
 */
export function getCramState(): CramState {
  return cramState;
}

/**
 * Load cram state from localStorage
 */
export function loadCramState(): CramState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.startDate) {
        parsed.startDate = new Date(parsed.startDate);
      }
      cramState = parsed;
      return cramState;
    }
  } catch (e) {
    console.error('Error loading cram state:', e);
  }
  return null;
}

/**
 * Save cram state to localStorage
 */
function saveCramState(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cramState));
  } catch (e) {
    console.error('Error saving cram state:', e);
  }
}

/**
 * Get today's plan
 */
export function getTodaysPlan(): CramDay | null {
  if (!cramState.isActive) return null;
  const plan = EA_CRAM_PLANS[cramState.part];
  return plan[cramState.currentDay - 1] || null;
}

/**
 * Get topics for today
 */
export function getTodaysTopics(): CramTopic[] {
  const plan = getTodaysPlan();
  if (!plan) return [];
  return EA_CRAM_TOPICS.filter(t => plan.topics.includes(t.id));
}

/**
 * Get formulas for today
 */
export function getTodaysFormulas(): CramFormula[] {
  const plan = getTodaysPlan();
  if (!plan) return [];
  return EA_CRAM_FORMULAS.filter(f => plan.formulas.includes(f.id));
}

/**
 * Mark a topic as completed
 */
export function completeTopic(topicId: string): void {
  if (!cramState.completedTopics.includes(topicId)) {
    cramState.completedTopics.push(topicId);
    saveCramState();
  }
}

/**
 * Mark a formula as reviewed
 */
export function reviewFormula(formulaId: string): void {
  if (!cramState.formulasReviewed.includes(formulaId)) {
    cramState.formulasReviewed.push(formulaId);
    saveCramState();
  }
}

/**
 * Record practice question result
 */
export function recordCramQuestion(isCorrect: boolean): void {
  cramState.questionsAnswered++;
  if (isCorrect) {
    cramState.correctAnswers++;
  }
  saveCramState();
}

/**
 * Advance to next day
 */
export function advanceToNextDay(): boolean {
  const plan = EA_CRAM_PLANS[cramState.part];
  if (cramState.currentDay < plan.length) {
    cramState.currentDay++;
    saveCramState();
    return true;
  }
  return false; // Already at last day
}

/**
 * Get progress percentage for current day
 */
export function getDayProgress(): number {
  const plan = getTodaysPlan();
  if (!plan) return 0;
  
  const topicsTotal = plan.topics.length;
  const formulasTotal = plan.formulas.length;
  const questionsTotal = plan.practiceQuestions;
  
  const topicsCompleted = cramState.completedTopics.filter(t => plan.topics.includes(t)).length;
  const formulasCompleted = cramState.formulasReviewed.filter(f => plan.formulas.includes(f)).length;
  const questionsCompleted = Math.min(cramState.questionsAnswered, questionsTotal);
  
  const topicsWeight = 30;
  const formulasWeight = 20;
  const questionsWeight = 50;
  
  let progress = 0;
  if (topicsTotal > 0) progress += (topicsCompleted / topicsTotal) * topicsWeight;
  else progress += topicsWeight; // No topics = full credit
  
  if (formulasTotal > 0) progress += (formulasCompleted / formulasTotal) * formulasWeight;
  else progress += formulasWeight;
  
  progress += (questionsCompleted / questionsTotal) * questionsWeight;
  
  return Math.round(progress);
}

/**
 * Get overall cram progress
 */
export function getOverallProgress(): {
  daysCompleted: number;
  totalDays: number;
  topicsCompleted: number;
  totalTopics: number;
  accuracy: number;
  readyForExam: boolean;
} {
  const plan = EA_CRAM_PLANS[cramState.part];
  const totalDays = plan.length;
  const daysCompleted = cramState.currentDay - 1;
  
  const topicsForPart = EA_CRAM_TOPICS.filter(t => t.part === cramState.part);
  const totalTopics = topicsForPart.length;
  const topicsCompleted = cramState.completedTopics.filter(
    id => topicsForPart.some(t => t.id === id)
  ).length;
  
  const accuracy = cramState.questionsAnswered > 0 
    ? Math.round((cramState.correctAnswers / cramState.questionsAnswered) * 100)
    : 0;
  
  // Ready if completed most topics and accuracy is good
  const readyForExam = topicsCompleted >= totalTopics * 0.8 && accuracy >= 70;
  
  return {
    daysCompleted,
    totalDays,
    topicsCompleted,
    totalTopics,
    accuracy,
    readyForExam,
  };
}

/**
 * Get all critical topics for quick review
 */
export function getCriticalTopics(part: EASectionId): CramTopic[] {
  return EA_CRAM_TOPICS.filter(t => t.part === part && t.priority === 'critical');
}

/**
 * Get all formulas for a part
 */
export function getFormulasForPart(part: EASectionId): CramFormula[] {
  return EA_CRAM_FORMULAS.filter(f => f.part === part);
}

/**
 * End cram mode
 */
export function endCramMode(): { accuracy: number; topicsCompleted: number } {
  const result = {
    accuracy: cramState.questionsAnswered > 0
      ? Math.round((cramState.correctAnswers / cramState.questionsAnswered) * 100)
      : 0,
    topicsCompleted: cramState.completedTopics.length,
  };
  
  cramState = {
    part: 'SEE1',
    currentDay: 1,
    startDate: null,
    completedTopics: [],
    formulasReviewed: [],
    questionsAnswered: 0,
    correctAnswers: 0,
    isActive: false,
  };
  
  localStorage.removeItem(STORAGE_KEY);
  
  return result;
}

// Initialize on module load
loadCramState();
