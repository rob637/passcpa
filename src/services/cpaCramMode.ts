/**
 * CPA Cram Mode Service
 * 
 * Intensive last-minute study mode for CPA exam featuring:
 * - High-yield topics by blueprint area
 * - Essential formulas and ratios
 * - Key concepts flashcards
 * - Rapid-fire practice questions
 * - 3-5 day study plan per section
 * 
 * Based on AICPA CPA Exam Blueprint (2025-2026)
 */

import type { CPASectionId } from '../courses/cpa';

// Types
export interface CPACramTopic {
  id: string;
  section: CPASectionId;
  blueprintArea: string;
  title: string;
  priority: 'critical' | 'high' | 'medium';
  estimatedMinutes: number;
  keyPoints: string[];
  mnemonics?: string[];
  examTips?: string[];
  commonQuestions: string[];
}

export interface CPACramFormula {
  id: string;
  name: string;
  section: CPASectionId;
  formula: string;
  description: string;
  example: string;
  examTip: string;
}

export interface CPACramDay {
  day: number;
  title: string;
  focusAreas: string[];
  topics: string[]; // Topic IDs
  formulas: string[];
  practiceQuestions: number;
  estimatedHours: number;
}

export interface CPACramState {
  section: CPASectionId;
  currentDay: number;
  startDate: Date | null;
  completedTopics: string[];
  formulasReviewed: string[];
  questionsAnswered: number;
  correctAnswers: number;
  isActive: boolean;
}

// =============================================================================
// HIGH-YIELD CPA CRAM TOPICS
// =============================================================================

export const CPA_CRAM_TOPICS: CPACramTopic[] = [
  // ===========================================================================
  // FAR - Financial Accounting and Reporting
  // ===========================================================================
  
  // FAR-I: Conceptual Framework (5-15%)
  {
    id: 'cram-far-001',
    section: 'FAR',
    blueprintArea: 'FAR-I',
    title: 'GAAP Hierarchy & FASB Framework',
    priority: 'high',
    estimatedMinutes: 15,
    keyPoints: [
      'FASB ASC is the single source of authoritative GAAP',
      'FASB Concepts Statements are non-authoritative guidance',
      'Qualitative characteristics: relevance, faithful representation',
      'Enhancing characteristics: comparability, verifiability, timeliness, understandability',
      'Recognition requires: definition, measurability, relevance, reliability',
    ],
    mnemonics: ['GAAP = Generally Accepted Accounting Principles (US-only)'],
    examTips: ['Know the difference between FASB ASC (authoritative) and Concepts Statements (non-authoritative)'],
    commonQuestions: [
      'What is the primary qualitative characteristic of financial information?',
      'Which standards are considered Level A GAAP?',
    ],
  },
  {
    id: 'cram-far-002',
    section: 'FAR',
    blueprintArea: 'FAR-I',
    title: 'Fair Value Measurement (ASC 820)',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'Fair value = exit price in orderly transaction',
      'Level 1: Quoted prices in active markets (most reliable)',
      'Level 2: Observable inputs other than Level 1',
      'Level 3: Unobservable inputs (least reliable)',
      'Use highest and best use for nonfinancial assets',
    ],
    mnemonics: ['Levels: 1=Quoted, 2=Observable, 3=Unobservable (QOU)'],
    examTips: ['Level 3 requires most disclosure; watch for fair value hierarchy questions'],
    commonQuestions: [
      'Which level of the fair value hierarchy is most reliable?',
      'What inputs are used for Level 2 measurements?',
    ],
  },
  
  // FAR-II: Select Financial Statement Accounts (30-40%)
  {
    id: 'cram-far-003',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    title: 'Receivables & CECL Model (ASC 326)',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'CECL = Current Expected Credit Loss (forward-looking)',
      'Recognize expected losses over life of receivable at inception',
      'Consider historical data, current conditions, reasonable forecasts',
      'Applies to trade receivables, loans, held-to-maturity securities',
      'Allowance account credited; bad debt expense debited',
    ],
    examTips: ['CECL replaced incurred loss model — know the conceptual difference'],
    commonQuestions: [
      'When is credit loss recognized under CECL?',
      'What types of assets are subject to CECL?',
    ],
  },
  {
    id: 'cram-far-004',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    title: 'Inventory Methods (FIFO, LIFO, Weighted Average)',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'FIFO: First costs out → lower COGS in rising prices → higher income',
      'LIFO: Last costs out → higher COGS in rising prices → lower income',
      'Weighted Average: Smooths costs over period',
      'LIFO liquidation creates older layer costs flowing to COGS',
      'Lower of cost or NRV (FIFO) or market (LIFO)',
    ],
    mnemonics: ['Rising prices: LIFO = Lower income, FIFO = Fat income'],
    examTips: ['LIFO requires LIFO reserve disclosure; watch for liquidation questions'],
    commonQuestions: [
      'What is the effect of LIFO liquidation on income?',
      'How does FIFO affect ending inventory in rising prices?',
    ],
  },
  {
    id: 'cram-far-005',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    title: 'Fixed Assets & Depreciation',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'Capitalize costs to get asset ready for intended use',
      'Depreciation methods: straight-line, declining balance, units of production',
      'Impairment test (2-step): recoverability test, then fair value write-down',
      'Derecognition: remove cost and accumulated depreciation',
      'Asset retirement obligations (ARO) at present value',
    ],
    examTips: ['Impairment loss = carrying value minus fair value (not recoverable amount)'],
    commonQuestions: [
      'What costs are capitalized for property, plant, and equipment?',
      'How is impairment loss calculated?',
    ],
  },
  {
    id: 'cram-far-006',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    title: 'Investments in Debt & Equity Securities',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Held-to-maturity (HTM): amortized cost, debt only',
      'Available-for-sale (AFS): fair value, unrealized in OCI',
      'Trading: fair value, unrealized in income',
      'Equity method: >20% significant influence, adjust for % of NI and dividends',
      'Consolidation: >50% control, eliminate intercompany transactions',
    ],
    mnemonics: ['HTM = Hold to Maturity, AFS = Adjusts through OCI, Trading = Through income'],
    examTips: ['Know when to use equity method vs consolidation; watch for control indicators'],
    commonQuestions: [
      'Where are unrealized gains on AFS securities reported?',
      'When is the equity method required?',
    ],
  },
  
  // FAR-III: Select Transactions (25-35%)
  {
    id: 'cram-far-007',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    title: 'Revenue Recognition (ASC 606)',
    priority: 'critical',
    estimatedMinutes: 30,
    keyPoints: [
      'Step 1: Identify the contract',
      'Step 2: Identify performance obligations',
      'Step 3: Determine transaction price',
      'Step 4: Allocate transaction price',
      'Step 5: Recognize revenue when (or as) obligations satisfied',
      'Point in time vs over time recognition',
      'Variable consideration: constrained estimate',
    ],
    mnemonics: ['IDATA = Identify, Determine, Allocate, Transfer (when to recognize)'],
    examTips: ['Most tested topic — know the 5 steps cold'],
    commonQuestions: [
      'When is revenue recognized over time?',
      'How is variable consideration estimated?',
      'What are the criteria for identifying separate performance obligations?',
    ],
  },
  {
    id: 'cram-far-008',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    title: 'Leases (ASC 842)',
    priority: 'critical',
    estimatedMinutes: 30,
    keyPoints: [
      'Lessee: ROU asset + lease liability for all leases >12 months',
      'Finance lease: transfer of ownership, BPO, major part of life, PV ≥ substantially all',
      'Operating lease: all others, straight-line expense',
      'Lessor: sales-type, direct financing, operating',
      'Initial direct costs: capitalize for operating, expense for sales-type',
    ],
    mnemonics: ['OWNS IT = Ownership transfer, Written purchase option, 75% life, 90% value'],
    examTips: ['Focus on lessee accounting — most commonly tested'],
    commonQuestions: [
      'How is a finance lease different from operating lease?',
      'What is recognized at lease commencement?',
    ],
  },
  {
    id: 'cram-far-009',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    title: 'Income Taxes (ASC 740)',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Current tax expense = taxes payable this period',
      'Deferred tax = future tax effects of temporary differences',
      'DTA = deductible temporary differences (future deduction)',
      'DTL = taxable temporary differences (future taxable amount)',
      'Valuation allowance: more likely than not DTA won\'t be realized',
    ],
    mnemonics: ['DTL: Defer Tax Later (pay more later). DTA: Defer Tax Asset (save later)'],
    examTips: ['Always use enacted rates; watch for rate changes'],
    commonQuestions: [
      'When is a valuation allowance required?',
      'How does depreciation timing affect deferred taxes?',
    ],
  },
  {
    id: 'cram-far-010',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    title: 'Statement of Cash Flows',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'Operating: net income + adjustments (indirect method)',
      'Investing: PP&E, investments, acquisitions',
      'Financing: debt, equity, dividends',
      'Noncash: supplemental disclosure (stock for land, etc.)',
      'Interest and dividends received: operating; dividends paid: financing',
    ],
    mnemonics: ['OIF = Operating, Investing, Financing'],
    examTips: ['Master the indirect method adjustments'],
    commonQuestions: [
      'Where is depreciation shown on cash flow statement?',
      'Is purchase of equipment operating or investing?',
    ],
  },
  
  // FAR-IV: State and Local Governments (10-20%)
  {
    id: 'cram-far-011',
    section: 'FAR',
    blueprintArea: 'FAR-IV',
    title: 'Government Accounting Fundamentals',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Government-wide: accrual basis, economic resources focus',
      'Governmental funds: modified accrual, current financial resources focus',
      'Revenue recognized when measurable and available (60 days)',
      'Expenditures recognized when liability incurred',
      'Fund types: General, Special Revenue, Debt Service, Capital Projects, Permanent',
    ],
    mnemonics: ['GRASPP = Governmental, Revenues Available, Specific, Private-Purpose, Pension'],
    examTips: ['Know the difference between government-wide and fund statements'],
    commonQuestions: [
      'What is the measurement focus for governmental funds?',
      'When is revenue recognized in modified accrual?',
    ],
  },
  {
    id: 'cram-far-012',
    section: 'FAR',
    blueprintArea: 'FAR-IV',
    title: 'Fund Accounting',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Governmental funds: general, special revenue, debt service, capital projects, permanent',
      'Proprietary funds: enterprise (external), internal service (internal)',
      'Fiduciary funds: pension, investment, private-purpose trust, custodial',
      'Encumbrance accounting for budgetary control',
      'GASB 34 reporting model',
    ],
    examTips: ['Fiduciary funds are NOT included in government-wide statements'],
    commonQuestions: [
      'Which funds use full accrual accounting?',
      'What is an encumbrance?',
    ],
  },
  
  // FAR-V: Not-for-Profit (5-15%)
  {
    id: 'cram-far-013',
    section: 'FAR',
    blueprintArea: 'FAR-V',
    title: 'NFP Accounting Essentials',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Net asset classes: without donor restrictions, with donor restrictions',
      'Contributions recognized at fair value when received',
      'Conditional contributions: recognize when conditions met',
      'Pledges: unconditional = receivable, conditional = disclose only',
      'Statement of Activities: shows change in net assets',
    ],
    mnemonics: ['WDR = With Donor Restrictions (new terminology)'],
    examTips: ['Focus on contribution recognition and net asset classification'],
    commonQuestions: [
      'How are conditional contributions recorded?',
      'What are the net asset classifications for NFPs?',
    ],
  },

  // ===========================================================================
  // AUD - Auditing and Attestation
  // ===========================================================================
  
  {
    id: 'cram-aud-001',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    title: 'Independence & Ethics',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'Independence in fact AND appearance required',
      'Threats: self-review, advocacy, familiarity, intimidation, self-interest',
      'Safeguards: reduce threats to acceptable level',
      'Direct financial interest: always impairs independence',
      'Immediate family direct interest: also impairs',
    ],
    mnemonics: ['SAILS = Self-review, Advocacy, Intimidation, self-interest, famiLiarity, Safeguards'],
    examTips: ['Know which relationships impair independence'],
    commonQuestions: [
      'What is the difference between independence in fact and appearance?',
      'When does a financial interest impair independence?',
    ],
  },
  {
    id: 'cram-aud-002',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    title: 'Risk Assessment & Planning',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Audit risk = inherent risk × control risk × detection risk',
      'Materiality: smallest misstatement that would influence decision',
      'Performance materiality: lower than overall materiality',
      'Understanding entity and environment (AU-C 315)',
      'Assess risk of material misstatement (RMM) at assertion level',
    ],
    mnemonics: ['AR = IR × CR × DR'],
    examTips: ['Detection risk is the only one auditor can control directly'],
    commonQuestions: [
      'How does the auditor respond to high control risk?',
      'What factors affect materiality?',
    ],
  },
  {
    id: 'cram-aud-003',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    title: 'Internal Control Assessment',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'COSO components: control environment, risk assessment, control activities, info & communication, monitoring',
      'Control environment is the foundation',
      'Segregation of duties: authorization, custody, recording',
      'Walkthroughs: trace transaction through system',
      'Control deficiency vs significant deficiency vs material weakness',
    ],
    mnemonics: ['CRIME = Control environment, Risk assessment, Info & communication, Monitoring, control activitiEs'],
    examTips: ['Know the COSO components cold'],
    commonQuestions: [
      'What is the most important COSO component?',
      'What distinguishes a material weakness from a significant deficiency?',
    ],
  },
  {
    id: 'cram-aud-004',
    section: 'AUD',
    blueprintArea: 'AUD-III',
    title: 'Audit Evidence & Procedures',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Sufficient = quantity; appropriate = quality (relevance + reliability)',
      'Procedures: inspection, observation, inquiry, confirmation, recalculation, reperformance, analytical',
      'External evidence more reliable than internal',
      'Written evidence more reliable than oral',
      'Direct evidence more reliable than derived',
    ],
    mnemonics: ['IOI CRAP = Inspection, Observation, Inquiry, Confirmation, Recalculation, Analytical, rePerformance'],
    examTips: ['Know the reliability hierarchy'],
    commonQuestions: [
      'What makes audit evidence appropriate?',
      'Which evidence is most reliable?',
    ],
  },
  {
    id: 'cram-aud-005',
    section: 'AUD',
    blueprintArea: 'AUD-III',
    title: 'Audit Sampling',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Statistical vs nonstatistical sampling — both valid',
      'Attribute sampling: test of controls (deviation rate)',
      'Variables sampling: substantive testing (dollar amounts)',
      'Sample risk: risk conclusions wrong due to sample',
      'Tolerable rate and expected rate determine sample size',
    ],
    examTips: ['Higher confidence level = larger sample size'],
    commonQuestions: [
      'What type of sampling is used for tests of controls?',
      'How does tolerable misstatement affect sample size?',
    ],
  },
  {
    id: 'cram-aud-006',
    section: 'AUD',
    blueprintArea: 'AUD-IV',
    title: 'Audit Reports',
    priority: 'critical',
    estimatedMinutes: 30,
    keyPoints: [
      'Unmodified: FS fairly presented, no material misstatement',
      'Qualified: except for material but not pervasive',
      'Adverse: material AND pervasive misstatement',
      'Disclaimer: unable to obtain sufficient evidence (scope limitation)',
      'Emphasis of matter: after opinion, no modification to opinion',
    ],
    mnemonics: ['QUAD = Qualified, Unmodified, Adverse, Disclaimer'],
    examTips: ['Material AND pervasive = adverse; material only = qualified'],
    commonQuestions: [
      'When is a qualified opinion appropriate?',
      'What is an emphasis of matter paragraph?',
    ],
  },
  
  // ===========================================================================
  // REG - Regulation
  // ===========================================================================
  
  {
    id: 'cram-reg-001',
    section: 'REG',
    blueprintArea: 'REG-I',
    title: 'Circular 230 & Tax Practice',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'Circular 230: governs practice before IRS',
      'Due diligence: must verify client information',
      'Written advice: must be reasonable, no reliance on unreasonable assumptions',
      'Conflicts of interest: disclosure and consent required',
      'Penalties: censure, suspension, disbarment, monetary penalty',
    ],
    examTips: ['Know the practitioner duties and penalties'],
    commonQuestions: [
      'What are the requirements for written tax advice?',
      'When is a conflict of interest waivable?',
    ],
  },
  {
    id: 'cram-reg-002',
    section: 'REG',
    blueprintArea: 'REG-II',
    title: 'Contracts & Agency',
    priority: 'high',
    estimatedMinutes: 25,
    keyPoints: [
      'Contract formation: offer, acceptance, consideration, capacity, legality',
      'Statute of Frauds: land, guaranty, marriage, year+, goods ≥$500',
      'Agency: agent binds principal within scope of authority',
      'Actual authority: express or implied',
      'Apparent authority: principal\'s manifestations to third party',
    ],
    mnemonics: ['MYLEGS = Marriage, Year, Land, Executor, Goods, Surety (Statute of Frauds)'],
    examTips: ['Oral contracts can be valid unless Statute of Frauds applies'],
    commonQuestions: [
      'What contracts must be in writing?',
      'When does apparent authority bind the principal?',
    ],
  },
  {
    id: 'cram-reg-003',
    section: 'REG',
    blueprintArea: 'REG-II',
    title: 'Secured Transactions (UCC Article 9)',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Attachment: agreement, value, rights in collateral',
      'Perfection: filing financing statement, possession, control',
      'Priority: first to file or perfect wins (PMSI exceptions)',
      'PMSI in inventory: must perfect before delivery and notify',
      'PMSI in equipment: perfect within 20 days',
    ],
    mnemonics: ['AVR = Agreement, Value, Rights (attachment)'],
    examTips: ['Know PMSI priority rules — heavily tested'],
    commonQuestions: [
      'What gives a PMSI super-priority?',
      'When is a security interest perfected?',
    ],
  },
  {
    id: 'cram-reg-004',
    section: 'REG',
    blueprintArea: 'REG-III',
    title: 'Individual Tax: Filing Status & Dependents',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'Filing statuses: Single, MFJ, MFS, HOH, QSS',
      'HOH: unmarried, pay ≥50% household costs, qualifying person',
      'Qualifying child: age, residency, support, relationship (CARS)',
      'Qualifying relative: gross income <$4,700, support ≥50%, not QC',
      'Tie-breaker rules: parent > residence > AGI',
    ],
    mnemonics: ['CARS = Close relative, Age, Residency, Support (qualifying child)'],
    examTips: ['HOH has more favorable rates than single'],
    commonQuestions: [
      'What are the requirements for HOH status?',
      'Who can be a qualifying child?',
    ],
  },
  {
    id: 'cram-reg-005',
    section: 'REG',
    blueprintArea: 'REG-III',
    title: 'Individual Tax: Income & Deductions',
    priority: 'critical',
    estimatedMinutes: 30,
    keyPoints: [
      'Gross income = all income from whatever source derived',
      'Exclusions: gifts, life insurance proceeds, municipal bond interest',
      'Above-the-line deductions: business expenses, student loan interest, HSA',
      'Itemized: SALT ($10K cap), mortgage interest, charity, medical >7.5% AGI',
      'Standard deduction 2026: $15,000 single, $30,000 MFJ (projected)',
    ],
    examTips: ['Watch for phaseouts and AGI thresholds'],
    commonQuestions: [
      'What income is excludable from gross income?',
      'What is the SALT deduction limit?',
    ],
  },
  {
    id: 'cram-reg-006',
    section: 'REG',
    blueprintArea: 'REG-IV',
    title: 'Entity Taxation: Partnerships',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Pass-through entity: no entity-level tax',
      'Partner basis: contributions + income - distributions - losses',
      'Specially allocated items: guaranteed payments, built-in gain',
      '704(d): loss limited to partner basis',
      'Partner capital accounts vs outside basis',
    ],
    examTips: ['Track partner basis through transactions — heavily tested'],
    commonQuestions: [
      'How is partner basis calculated?',
      'What is a guaranteed payment?',
    ],
  },
  {
    id: 'cram-reg-007',
    section: 'REG',
    blueprintArea: 'REG-IV',
    title: 'Entity Taxation: S Corporations',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Pass-through: no double taxation',
      'Eligibility: ≤100 shareholders, one class stock, domestic, eligible shareholders',
      'Shareholder basis: contributions + income - distributions - losses',
      'AAA: accumulated adjustments account (tracks pass-through)',
      'Built-in gains tax: C-to-S conversion, 5-year recognition period',
    ],
    examTips: ['AAA can go negative; basis cannot'],
    commonQuestions: [
      'What are the S corporation eligibility requirements?',
      'How are distributions to S corp shareholders taxed?',
    ],
  },
  {
    id: 'cram-reg-008',
    section: 'REG',
    blueprintArea: 'REG-IV',
    title: 'Entity Taxation: C Corporations',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Double taxation: corporate tax + shareholder dividend tax',
      'Flat 21% corporate rate',
      'Dividends received deduction: 50%/65%/100% based on ownership',
      'NOL: limited to 80% of taxable income, indefinite carryforward',
      'Accumulated earnings tax: penalty for unreasonable accumulation',
    ],
    examTips: ['Watch for E&P calculations and dividend distributions'],
    commonQuestions: [
      'What is the dividends received deduction?',
      'How are NOLs applied under current law?',
    ],
  },

  // ===========================================================================
  // DISCIPLINE SECTIONS (BAR, ISC, TCP)
  // ===========================================================================
  
  // BAR - Business Analysis and Reporting
  {
    id: 'cram-bar-001',
    section: 'BAR',
    blueprintArea: 'BAR-I',
    title: 'Financial Statement Analysis',
    priority: 'critical',
    estimatedMinutes: 30,
    keyPoints: [
      'Liquidity ratios: current ratio, quick ratio, cash ratio',
      'Activity ratios: inventory turnover, receivables turnover, asset turnover',
      'Leverage ratios: debt-to-equity, times interest earned',
      'Profitability ratios: ROA, ROE, profit margin',
      'DuPont analysis: ROE = Margin × Turnover × Leverage',
    ],
    mnemonics: ['DuPont ROE = Net Margin × Asset Turnover × Equity Multiplier'],
    examTips: ['Know how to calculate and interpret all key ratios'],
    commonQuestions: [
      'How is the quick ratio different from current ratio?',
      'What does the DuPont analysis reveal?',
    ],
  },
  {
    id: 'cram-bar-002',
    section: 'BAR',
    blueprintArea: 'BAR-II',
    title: 'Budgeting & Forecasting',
    priority: 'high',
    estimatedMinutes: 25,
    keyPoints: [
      'Master budget: operating + financial budgets',
      'Flexible budget: adjusts for actual activity level',
      'Variance analysis: price vs quantity/efficiency variances',
      'Pro forma statements: projected financial statements',
      'Forecast methods: regression, trend analysis, moving average',
    ],
    examTips: ['Understand favorable vs unfavorable variances'],
    commonQuestions: [
      'What is a flexible budget?',
      'How are variances calculated and analyzed?',
    ],
  },
  {
    id: 'cram-bar-003',
    section: 'BAR',
    blueprintArea: 'BAR-III',
    title: 'Cost Accounting Fundamentals',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Job order vs process costing',
      'Variable vs absorption costing',
      'Contribution margin: sales - variable costs',
      'Break-even: FC / CM per unit or FC / CM ratio',
      'Target profit: (FC + target profit) / CM per unit',
    ],
    mnemonics: ['Break-even = Fixed Costs ÷ Contribution Margin'],
    examTips: ['Absorption costing required for GAAP; variable for internal'],
    commonQuestions: [
      'What is the difference between variable and absorption costing?',
      'How is break-even point calculated?',
    ],
  },

  // ISC - Information Systems and Controls
  {
    id: 'cram-isc-001',
    section: 'ISC',
    blueprintArea: 'ISC-I',
    title: 'IT General Controls',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Access controls: authentication, authorization, accountability',
      'Change management: testing, approval, documentation',
      'Disaster recovery: RTO (time), RPO (data loss tolerance)',
      'Program development: SDLC phases',
      'Physical security: biometrics, card access, environmental controls',
    ],
    mnemonics: ['AAA = Authentication, Authorization, Accountability'],
    examTips: ['ITGC supports application controls'],
    commonQuestions: [
      'What is the difference between authentication and authorization?',
      'What is RTO vs RPO?',
    ],
  },
  {
    id: 'cram-isc-002',
    section: 'ISC',
    blueprintArea: 'ISC-II',
    title: 'Data Analytics & Technology',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Data governance: policies, standards, quality, stewardship',
      'ETL: Extract, Transform, Load (data warehousing)',
      'Descriptive vs predictive vs prescriptive analytics',
      'Cloud models: IaaS, PaaS, SaaS',
      'Blockchain basics: distributed ledger, immutability',
    ],
    examTips: ['Focus on how technology affects internal controls'],
    commonQuestions: [
      'What are the differences between IaaS, PaaS, and SaaS?',
      'What is ETL in data warehousing?',
    ],
  },
  {
    id: 'cram-isc-003',
    section: 'ISC',
    blueprintArea: 'ISC-III',
    title: 'Cybersecurity & Risk',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'CIA triad: Confidentiality, Integrity, Availability',
      'Encryption: symmetric (AES) vs asymmetric (RSA, public/private keys)',
      'Common threats: phishing, malware, ransomware, social engineering',
      'Controls: firewalls, IDS/IPS, DLP, SIEM',
      'SOC reports: SOC 1 (ICFR), SOC 2 (security), SOC 3 (general use)',
    ],
    mnemonics: ['CIA = Confidentiality, Integrity, Availability'],
    examTips: ['Know SOC report types and when each is appropriate'],
    commonQuestions: [
      'What is the difference between SOC 1 and SOC 2?',
      'What is symmetric vs asymmetric encryption?',
    ],
  },

  // TCP - Tax Compliance and Planning
  {
    id: 'cram-tcp-001',
    section: 'TCP',
    blueprintArea: 'TCP-I',
    title: 'Estate & Gift Tax',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Unified credit: $13.61M exclusion (2024), $14.06M (2025 projected)',
      'Annual exclusion: $18,000/donee (2024)',
      'Gift tax calculation: total gifts - exclusions - deductions',
      'Estate inclusion: gross estate at FMV at death',
      'Marital deduction: unlimited transfers between spouses',
    ],
    examTips: ['Know gross estate inclusions and valuation'],
    commonQuestions: [
      'What is included in the gross estate?',
      'How does the annual exclusion work?',
    ],
  },
  {
    id: 'cram-tcp-002',
    section: 'TCP',
    blueprintArea: 'TCP-II',
    title: 'Tax Planning Strategies',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Income timing: accelerate deductions, defer income',
      'Income shifting: to lower-bracket family members',
      'Tax-advantaged accounts: 401(k), IRA, HSA, 529',
      'Entity selection: tax implications of form',
      'Passive activity loss rules: material participation, at-risk',
    ],
    examTips: ['Focus on entity choice tax implications'],
    commonQuestions: [
      'What are the tax advantages of an S corporation vs C corporation?',
      'How do passive activity loss rules work?',
    ],
  },
  {
    id: 'cram-tcp-003',
    section: 'TCP',
    blueprintArea: 'TCP-III',
    title: 'Multi-Jurisdictional Tax',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Nexus: physical presence vs economic nexus (Wayfair)',
      'Apportionment: property, payroll, sales factors',
      'Foreign tax credit: limit = US tax × foreign source income / total income',
      'Subpart F income: CFC anti-deferral rules',
      'GILTI: global intangible low-taxed income',
    ],
    examTips: ['Know foreign tax credit limitation calculation'],
    commonQuestions: [
      'What is economic nexus after Wayfair?',
      'How is the foreign tax credit calculated?',
    ],
  },
];

// =============================================================================
// CPA CRAM FORMULAS
// =============================================================================

export const CPA_CRAM_FORMULAS: CPACramFormula[] = [
  // FAR Formulas
  {
    id: 'formula-far-001',
    name: 'Straight-Line Depreciation',
    section: 'FAR',
    formula: '(Cost - Salvage Value) / Useful Life',
    description: 'Calculates annual depreciation expense on straight-line basis',
    example: 'Asset cost $100,000, salvage $10,000, life 10 years = ($100,000 - $10,000) / 10 = $9,000/year',
    examTip: 'Most common method — memorize this formula',
  },
  {
    id: 'formula-far-002',
    name: 'Double Declining Balance',
    section: 'FAR',
    formula: '(2 / Useful Life) × Book Value at Beginning of Year',
    description: 'Accelerated depreciation method, ignore salvage until switch to straight-line',
    example: '10-year life = 20% rate; Year 1: $100,000 × 20% = $20,000',
    examTip: 'Don\'t subtract salvage value initially; watch for impairment',
  },
  {
    id: 'formula-far-003',
    name: 'Bond Premium/Discount Amortization (Effective Interest)',
    section: 'FAR',
    formula: 'Interest Expense = Carrying Value × Market Rate; Cash Paid = Face × Stated Rate; Difference = Amortization',
    description: 'Effective interest method for bond amortization',
    example: '$100,000 bond at 6% stated, 5% market, CV $104,000: Interest Exp = $5,200, Cash = $6,000, Amort = $800',
    examTip: 'Market rate × carrying value = interest expense',
  },
  {
    id: 'formula-far-004',
    name: 'Inventory Turnover',
    section: 'FAR',
    formula: 'COGS / Average Inventory',
    description: 'Measures how quickly inventory is sold',
    example: 'COGS $500,000, Avg Inventory $100,000 = 5.0 times',
    examTip: 'Higher turnover = more efficient inventory management',
  },
  {
    id: 'formula-far-005',
    name: 'Receivables Turnover',
    section: 'FAR',
    formula: 'Net Credit Sales / Average Accounts Receivable',
    description: 'Measures collection efficiency',
    example: 'Sales $1M, Avg A/R $200,000 = 5.0 times; Days = 365/5 = 73 days',
    examTip: 'Higher turnover = faster collection',
  },
  {
    id: 'formula-far-006',
    name: 'Current Ratio',
    section: 'FAR',
    formula: 'Current Assets / Current Liabilities',
    description: 'Measures short-term liquidity',
    example: 'CA $500,000, CL $250,000 = 2.0',
    examTip: 'Generally, 2.0 or higher is healthy',
  },
  {
    id: 'formula-far-007',
    name: 'Quick (Acid-Test) Ratio',
    section: 'FAR',
    formula: '(Cash + Marketable Securities + Receivables) / Current Liabilities',
    description: 'Stringent liquidity test excluding inventory',
    example: 'Quick assets $300,000, CL $250,000 = 1.2',
    examTip: 'Excludes inventory and prepaid expenses',
  },
  
  // AUD Formulas
  {
    id: 'formula-aud-001',
    name: 'Audit Risk Model',
    section: 'AUD',
    formula: 'AR = IR × CR × DR',
    description: 'Audit Risk = Inherent Risk × Control Risk × Detection Risk',
    example: 'To achieve 5% AR with IR=60% and CR=50%: DR = 0.05/(0.60 × 0.50) = 16.7%',
    examTip: 'Detection risk is the only one the auditor controls',
  },
  {
    id: 'formula-aud-002',
    name: 'Sample Size (Attribute)',
    section: 'AUD',
    formula: 'Larger sample when: higher confidence, lower tolerable rate, higher expected rate',
    description: 'Factors affecting sample size in tests of controls',
    example: '95% confidence vs 90% = larger sample; 5% tolerable vs 10% = larger sample',
    examTip: 'Population size rarely affects sample size significantly',
  },
  
  // REG Formulas
  {
    id: 'formula-reg-001',
    name: 'Self-Employment Tax',
    section: 'REG',
    formula: '92.35% of SE Income × 15.3% (12.4% SS + 2.9% Medicare)',
    description: 'Calculated on 92.35% of net self-employment income',
    example: 'SE income $100,000: $100,000 × 0.9235 × 0.153 = $14,130 SE tax',
    examTip: '50% of SE tax is above-the-line deduction',
  },
  {
    id: 'formula-reg-002',
    name: 'Partner Basis',
    section: 'REG',
    formula: 'Contributions + Share of Income + Share of Debt - Distributions - Share of Loss',
    description: 'Outside basis in partnership interest',
    example: 'Contribution $50,000 + Income $20,000 - Distribution $10,000 = $60,000 basis',
    examTip: 'Basis cannot go negative; limits loss deduction',
  },
  {
    id: 'formula-reg-003',
    name: 'S Corp Shareholder Basis',
    section: 'REG',
    formula: 'Initial Investment + Income - Distributions - Losses (in order)',
    description: 'Tracks S corp shareholder basis, reduced in specific order',
    example: 'Stock $50,000 + Income $30,000 - Nondeductible $5,000 - Distribution $20,000 = $55,000',
    examTip: 'Order: Income → Nondeductible expenses → Distributions → Losses → Deductions',
  },
  {
    id: 'formula-reg-004',
    name: 'Net Operating Loss (NOL)',
    section: 'REG',
    formula: 'NOL Deduction = 80% of Taxable Income (indefinite carryforward)',
    description: 'Current NOL rules under TCJA',
    example: 'Taxable income $100,000, NOL available $150,000: Deduct $80,000 (80%)',
    examTip: 'No carryback for NOLs after 2020 (except farming)',
  },
  
  // BAR Formulas
  {
    id: 'formula-bar-001',
    name: 'Break-Even Point (Units)',
    section: 'BAR',
    formula: 'Fixed Costs / Contribution Margin per Unit',
    description: 'Number of units to sell to cover all costs',
    example: 'FC $100,000, CM $25/unit = 4,000 units to break even',
    examTip: 'Add target profit to numerator for target volume',
  },
  {
    id: 'formula-bar-002',
    name: 'Break-Even Point (Dollars)',
    section: 'BAR',
    formula: 'Fixed Costs / Contribution Margin Ratio',
    description: 'Sales dollars needed to break even',
    example: 'FC $100,000, CM ratio 40% = $250,000 sales to break even',
    examTip: 'CM ratio = (Sales - Variable Costs) / Sales',
  },
  {
    id: 'formula-bar-003',
    name: 'Return on Equity (DuPont)',
    section: 'BAR',
    formula: 'ROE = (Net Income/Sales) × (Sales/Assets) × (Assets/Equity)',
    description: 'Three-lever DuPont analysis of ROE',
    example: 'Profit margin 10% × Asset turnover 1.5 × Equity multiplier 2.0 = 30% ROE',
    examTip: 'Decomposes ROE into profitability, efficiency, leverage',
  },
  {
    id: 'formula-bar-004',
    name: 'Variance Analysis',
    section: 'BAR',
    formula: 'Price Variance = (Actual Price - Standard Price) × Actual Qty; Qty Variance = (Actual Qty - Standard Qty) × Standard Price',
    description: 'Breaks total variance into price and quantity components',
    example: 'Actual: 1,000 units @ $11. Standard: 950 units @ $10. Price = ($11-$10)×1,000 = $1,000 U',
    examTip: 'Price variance uses actual quantity; quantity variance uses standard price',
  },
];

// =============================================================================
// CPA CRAM PLANS (3-5 days per section)
// =============================================================================

export const CPA_CRAM_PLANS: Record<CPASectionId, CPACramDay[]> = {
  FAR: [
    {
      day: 1,
      title: 'Core Accounting Standards',
      focusAreas: ['FAR-I', 'FAR-II'],
      topics: ['cram-far-001', 'cram-far-002', 'cram-far-003', 'cram-far-004'],
      formulas: ['formula-far-001', 'formula-far-002', 'formula-far-003'],
      practiceQuestions: 40,
      estimatedHours: 4,
    },
    {
      day: 2,
      title: 'Investments & Liabilities',
      focusAreas: ['FAR-II', 'FAR-III'],
      topics: ['cram-far-005', 'cram-far-006', 'cram-far-007'],
      formulas: ['formula-far-004', 'formula-far-005'],
      practiceQuestions: 40,
      estimatedHours: 4,
    },
    {
      day: 3,
      title: 'Revenue, Leases & Tax',
      focusAreas: ['FAR-III'],
      topics: ['cram-far-008', 'cram-far-009', 'cram-far-010'],
      formulas: ['formula-far-006', 'formula-far-007'],
      practiceQuestions: 40,
      estimatedHours: 4,
    },
    {
      day: 4,
      title: 'Government & NFP',
      focusAreas: ['FAR-IV', 'FAR-V'],
      topics: ['cram-far-011', 'cram-far-012', 'cram-far-013'],
      formulas: [],
      practiceQuestions: 40,
      estimatedHours: 4,
    },
    {
      day: 5,
      title: 'Final Review & Practice Exam',
      focusAreas: ['FAR-I', 'FAR-II', 'FAR-III', 'FAR-IV', 'FAR-V'],
      topics: [],
      formulas: ['formula-far-001', 'formula-far-002', 'formula-far-003', 'formula-far-004', 'formula-far-005', 'formula-far-006', 'formula-far-007'],
      practiceQuestions: 66,
      estimatedHours: 5,
    },
  ],
  AUD: [
    {
      day: 1,
      title: 'Ethics & Risk Assessment',
      focusAreas: ['AUD-I', 'AUD-II'],
      topics: ['cram-aud-001', 'cram-aud-002', 'cram-aud-003'],
      formulas: ['formula-aud-001'],
      practiceQuestions: 40,
      estimatedHours: 4,
    },
    {
      day: 2,
      title: 'Evidence & Sampling',
      focusAreas: ['AUD-III'],
      topics: ['cram-aud-004', 'cram-aud-005'],
      formulas: ['formula-aud-002'],
      practiceQuestions: 40,
      estimatedHours: 4,
    },
    {
      day: 3,
      title: 'Reporting & Conclusions',
      focusAreas: ['AUD-IV'],
      topics: ['cram-aud-006'],
      formulas: [],
      practiceQuestions: 40,
      estimatedHours: 4,
    },
    {
      day: 4,
      title: 'Final Review & Practice Exam',
      focusAreas: ['AUD-I', 'AUD-II', 'AUD-III', 'AUD-IV'],
      topics: [],
      formulas: ['formula-aud-001', 'formula-aud-002'],
      practiceQuestions: 72,
      estimatedHours: 5,
    },
  ],
  REG: [
    {
      day: 1,
      title: 'Ethics & Business Law',
      focusAreas: ['REG-I', 'REG-II'],
      topics: ['cram-reg-001', 'cram-reg-002', 'cram-reg-003'],
      formulas: [],
      practiceQuestions: 40,
      estimatedHours: 4,
    },
    {
      day: 2,
      title: 'Individual Taxation',
      focusAreas: ['REG-III'],
      topics: ['cram-reg-004', 'cram-reg-005'],
      formulas: ['formula-reg-001'],
      practiceQuestions: 40,
      estimatedHours: 4,
    },
    {
      day: 3,
      title: 'Entity Taxation',
      focusAreas: ['REG-IV'],
      topics: ['cram-reg-006', 'cram-reg-007', 'cram-reg-008'],
      formulas: ['formula-reg-002', 'formula-reg-003', 'formula-reg-004'],
      practiceQuestions: 40,
      estimatedHours: 4,
    },
    {
      day: 4,
      title: 'Final Review & Practice Exam',
      focusAreas: ['REG-I', 'REG-II', 'REG-III', 'REG-IV'],
      topics: [],
      formulas: ['formula-reg-001', 'formula-reg-002', 'formula-reg-003', 'formula-reg-004'],
      practiceQuestions: 72,
      estimatedHours: 5,
    },
  ],
  BAR: [
    {
      day: 1,
      title: 'Financial Analysis & Ratios',
      focusAreas: ['BAR-I'],
      topics: ['cram-bar-001'],
      formulas: ['formula-bar-003'],
      practiceQuestions: 35,
      estimatedHours: 4,
    },
    {
      day: 2,
      title: 'Budgeting & Cost Accounting',
      focusAreas: ['BAR-II', 'BAR-III'],
      topics: ['cram-bar-002', 'cram-bar-003'],
      formulas: ['formula-bar-001', 'formula-bar-002', 'formula-bar-004'],
      practiceQuestions: 35,
      estimatedHours: 4,
    },
    {
      day: 3,
      title: 'Final Review & Practice Exam',
      focusAreas: ['BAR-I', 'BAR-II', 'BAR-III'],
      topics: [],
      formulas: ['formula-bar-001', 'formula-bar-002', 'formula-bar-003', 'formula-bar-004'],
      practiceQuestions: 50,
      estimatedHours: 4,
    },
  ],
  ISC: [
    {
      day: 1,
      title: 'IT Controls & Security',
      focusAreas: ['ISC-I', 'ISC-III'],
      topics: ['cram-isc-001', 'cram-isc-003'],
      formulas: [],
      practiceQuestions: 35,
      estimatedHours: 4,
    },
    {
      day: 2,
      title: 'Data & Technology',
      focusAreas: ['ISC-II'],
      topics: ['cram-isc-002'],
      formulas: [],
      practiceQuestions: 35,
      estimatedHours: 4,
    },
    {
      day: 3,
      title: 'Final Review & Practice Exam',
      focusAreas: ['ISC-I', 'ISC-II', 'ISC-III'],
      topics: [],
      formulas: [],
      practiceQuestions: 50,
      estimatedHours: 4,
    },
  ],
  TCP: [
    {
      day: 1,
      title: 'Estate, Gift & Planning',
      focusAreas: ['TCP-I', 'TCP-II'],
      topics: ['cram-tcp-001', 'cram-tcp-002'],
      formulas: [],
      practiceQuestions: 35,
      estimatedHours: 4,
    },
    {
      day: 2,
      title: 'Multi-Jurisdictional & Advanced',
      focusAreas: ['TCP-III'],
      topics: ['cram-tcp-003'],
      formulas: [],
      practiceQuestions: 35,
      estimatedHours: 4,
    },
    {
      day: 3,
      title: 'Final Review & Practice Exam',
      focusAreas: ['TCP-I', 'TCP-II', 'TCP-III'],
      topics: [],
      formulas: [],
      practiceQuestions: 50,
      estimatedHours: 4,
    },
  ],
};

// =============================================================================
// STATE MANAGEMENT
// =============================================================================

const STORAGE_KEY = 'cpa-cram-state';

let cramState: CPACramState = {
  section: 'FAR',
  currentDay: 1,
  startDate: null,
  completedTopics: [],
  formulasReviewed: [],
  questionsAnswered: 0,
  correctAnswers: 0,
  isActive: false,
};

/**
 * Initialize cram mode for a specific CPA section
 */
export function initializeCramMode(section: CPASectionId): CPACramState {
  cramState = {
    section,
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
export function getCramState(): CPACramState {
  return cramState;
}

/**
 * Load cram state from localStorage
 */
export function loadCramState(): CPACramState | null {
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
    console.error('Error loading CPA cram state:', e);
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
    console.error('Error saving CPA cram state:', e);
  }
}

/**
 * Get today's cram plan
 */
export function getTodaysPlan(): CPACramDay | null {
  if (!cramState.isActive) return null;
  const plan = CPA_CRAM_PLANS[cramState.section];
  return plan[cramState.currentDay - 1] || null;
}

/**
 * Get topics for today
 */
export function getTodaysTopics(): CPACramTopic[] {
  const plan = getTodaysPlan();
  if (!plan) return [];
  return CPA_CRAM_TOPICS.filter(t => plan.topics.includes(t.id));
}

/**
 * Get formulas for today
 */
export function getTodaysFormulas(): CPACramFormula[] {
  const plan = getTodaysPlan();
  if (!plan) return [];
  return CPA_CRAM_FORMULAS.filter(f => plan.formulas.includes(f.id));
}

/**
 * Get all topics for a section
 */
export function getTopicsForSection(section: CPASectionId): CPACramTopic[] {
  return CPA_CRAM_TOPICS.filter(t => t.section === section);
}

/**
 * Get critical topics for a section (for quick review)
 */
export function getCriticalTopics(section: CPASectionId): CPACramTopic[] {
  return CPA_CRAM_TOPICS.filter(t => t.section === section && t.priority === 'critical');
}

/**
 * Get all formulas for a section
 */
export function getFormulasForSection(section: CPASectionId): CPACramFormula[] {
  return CPA_CRAM_FORMULAS.filter(f => f.section === section);
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
  const plan = CPA_CRAM_PLANS[cramState.section];
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
  else progress += topicsWeight; // No topics today = full credit
  
  if (formulasTotal > 0) progress += (formulasCompleted / formulasTotal) * formulasWeight;
  else progress += formulasWeight; // No formulas today = full credit
  
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
  const plan = CPA_CRAM_PLANS[cramState.section];
  const totalDays = plan.length;
  const daysCompleted = cramState.currentDay - 1;
  
  const topicsForSection = CPA_CRAM_TOPICS.filter(t => t.section === cramState.section);
  const totalTopics = topicsForSection.length;
  const topicsCompleted = cramState.completedTopics.filter(
    id => topicsForSection.some(t => t.id === id)
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
 * Reset cram mode
 */
export function resetCramMode(): void {
  cramState = {
    section: 'FAR',
    currentDay: 1,
    startDate: null,
    completedTopics: [],
    formulasReviewed: [],
    questionsAnswered: 0,
    correctAnswers: 0,
    isActive: false,
  };
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * End cram mode and return results
 */
export function endCramMode(): { accuracy: number; topicsCompleted: number; formulasReviewed: number } {
  const result = {
    accuracy: cramState.questionsAnswered > 0
      ? Math.round((cramState.correctAnswers / cramState.questionsAnswered) * 100)
      : 0,
    topicsCompleted: cramState.completedTopics.length,
    formulasReviewed: cramState.formulasReviewed.length,
  };
  
  resetCramMode();
  
  return result;
}

// Initialize on module load
loadCramState();
