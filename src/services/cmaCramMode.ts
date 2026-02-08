/**
 * CMA Cram Mode Service
 * 
 * Intensive last-minute study mode for IMA CMA exam featuring:
 * - High-yield topics by exam weight
 * - Essential formulas and frameworks
 * - Key terminology flashcards
 * - Rapid-fire practice questions
 * - 3-5 day study plan per part
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 */

import { CMASectionId } from './cmaAdaptiveEngine';

// Types
export interface CramTopic {
  id: string;
  part: CMASectionId;
  domain: string;
  title: string;
  priority: 'critical' | 'high' | 'medium';
  estimatedMinutes: number;
  keyPoints: string[];
  mnemonics?: string[];
  formulas?: string[];
  commonQuestions: string[];
}

export interface CramFormula {
  id: string;
  name: string;
  part: CMASectionId;
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
  part: CMASectionId;
  currentDay: number;
  startDate: Date | null;
  completedTopics: string[];
  formulasReviewed: string[];
  questionsAnswered: number;
  correctAnswers: number;
  isActive: boolean;
}

// High-yield CMA topics organized by part
export const CMA_CRAM_TOPICS: CramTopic[] = [
  // ============================================================================
  // CMA1 - FINANCIAL PLANNING, PERFORMANCE, AND ANALYTICS
  // ============================================================================
  
  // Domain CMA1-B: Planning, Budgeting, and Forecasting (20%)
  {
    id: 'cram-cma1-001',
    part: 'CMA1',
    domain: 'CMA1-B',
    title: 'Master Budgeting Process',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Sales budget is the starting point for master budget',
      'Production budget = Desired ending + Sales - Beginning inventory',
      'Direct materials budget = Production needs + Desired ending - Beginning',
      'Cash budget shows timing of cash receipts and disbursements',
      'Pro forma financial statements are the endpoint',
    ],
    mnemonics: ['SPDLC = Sales → Production → Direct Materials → Labor → Cash'],
    formulas: ['Production = Sales + Ending - Beginning'],
    commonQuestions: [
      'Which budget is prepared first?',
      'How is the production budget calculated?',
      'What are the components of a cash budget?',
    ],
  },
  {
    id: 'cram-cma1-002',
    part: 'CMA1',
    domain: 'CMA1-B',
    title: 'Forecasting Techniques',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Quantitative: regression, time series, moving average',
      'Qualitative: Delphi, market research, expert opinion',
      'Regression analysis: Y = a + bX',
      'High-low method for variable/fixed cost separation',
      'Learning curve: labor time decreases with experience',
    ],
    formulas: ['High-Low Variable Rate = (High Cost - Low Cost) / (High Activity - Low Activity)'],
    commonQuestions: [
      'When is regression analysis appropriate?',
      'How does the high-low method work?',
      'What is the learning curve effect?',
    ],
  },
  
  // Domain CMA1-C: Performance Management (20%)
  {
    id: 'cram-cma1-003',
    part: 'CMA1',
    domain: 'CMA1-C',
    title: 'Variance Analysis',
    priority: 'critical',
    estimatedMinutes: 30,
    keyPoints: [
      'Material variance: Price + Quantity',
      'Labor variance: Rate + Efficiency',
      'Overhead variance: Spending + Efficiency + Volume',
      'Favorable = actual < standard; Unfavorable = actual > standard',
      'For revenue, favorable = actual > standard',
    ],
    mnemonics: ['MRLP = Material (P+Q), Rate+Efficiency, Labor, Overhead (S+E+V)'],
    formulas: [
      'Price Variance = (AP - SP) × AQ',
      'Quantity Variance = (AQ - SQ) × SP',
    ],
    commonQuestions: [
      'What causes a favorable material price variance?',
      'How is labor efficiency variance calculated?',
      'What is overhead volume variance?',
    ],
  },
  {
    id: 'cram-cma1-004',
    part: 'CMA1',
    domain: 'CMA1-C',
    title: 'Balanced Scorecard',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Four perspectives: Financial, Customer, Internal Process, Learning & Growth',
      'Financial: ROI, EVA, residual income',
      'Customer: satisfaction, retention, market share',
      'Internal: cycle time, quality, cost efficiency',
      'Learning: employee skills, innovation, IT capabilities',
    ],
    mnemonics: ['FCIL = Financial, Customer, Internal, Learning'],
    commonQuestions: [
      'What are the four BSC perspectives?',
      'Which perspective focuses on employee training?',
      'What measures might appear in the customer perspective?',
    ],
  },
  
  // Domain CMA1-D: Cost Management (15%)
  {
    id: 'cram-cma1-005',
    part: 'CMA1',
    domain: 'CMA1-D',
    title: 'Costing Systems',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Job order costing: unique products, tracks by job',
      'Process costing: homogeneous products, tracks by department',
      'ABC: allocates overhead based on cost drivers',
      'Standard costing: predetermined costs for control',
      'Variable costing: only variable costs in product cost',
    ],
    mnemonics: ['JAPAS = Job, ABC, Process, Actual, Standard'],
    commonQuestions: [
      'When is job order costing appropriate?',
      'How does ABC differ from traditional allocation?',
      'What is included in product cost under variable costing?',
    ],
  },
  {
    id: 'cram-cma1-006',
    part: 'CMA1',
    domain: 'CMA1-D',
    title: 'Process Costing and Equivalent Units',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Equivalent units = physical units × % complete',
      'FIFO: separates beginning WIP from current period',
      'Weighted average: combines beginning WIP with current',
      'Cost per equivalent unit = Total costs / Equivalent units',
      'Transferred out + Ending WIP = Total to account for',
    ],
    formulas: ['EU (FIFO) = Units started and completed + Ending WIP × %'],
    commonQuestions: [
      'How are equivalent units calculated?',
      'What is the difference between FIFO and weighted average?',
      'How is cost per equivalent unit used?',
    ],
  },
  
  // Domain CMA1-E: Internal Controls (15%)
  {
    id: 'cram-cma1-007',
    part: 'CMA1',
    domain: 'CMA1-E',
    title: 'COSO Internal Control Framework',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Five components: Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring',
      'Control environment is the foundation',
      '17 principles underlie the components',
      'Objectives: Operations, Reporting, Compliance',
      'Reasonable assurance, not absolute',
    ],
    mnemonics: ['CRIME = Control env, Risk, Info & Comm, Monitoring, control activitiEs'],
    commonQuestions: [
      'What are the five COSO components?',
      'What is the foundation of internal control?',
      'What level of assurance does internal control provide?',
    ],
  },
  
  // ============================================================================
  // CMA2 - STRATEGIC FINANCIAL MANAGEMENT
  // ============================================================================
  
  // Domain CMA2-A: Financial Statement Analysis (20%)
  {
    id: 'cram-cma2-001',
    part: 'CMA2',
    domain: 'CMA2-A',
    title: 'Financial Ratios',
    priority: 'critical',
    estimatedMinutes: 30,
    keyPoints: [
      'Liquidity: Current ratio, Quick ratio, Cash ratio',
      'Leverage: Debt-to-equity, Interest coverage',
      'Profitability: ROA, ROE, Gross margin, Net margin',
      'Activity: Inventory turnover, A/R turnover, Asset turnover',
      'DuPont: ROE = Profit margin × Asset turnover × Equity multiplier',
    ],
    mnemonics: ['LLPA = Liquidity, Leverage, Profitability, Activity'],
    formulas: [
      'Current Ratio = Current Assets / Current Liabilities',
      'ROE = Net Income / Shareholders Equity',
      'DuPont ROE = (NI/Sales) × (Sales/Assets) × (Assets/Equity)',
    ],
    commonQuestions: [
      'How is the quick ratio different from current ratio?',
      'What does DuPont analysis reveal?',
      'Which ratios measure profitability?',
    ],
  },
  
  // Domain CMA2-B: Corporate Finance (20%)
  {
    id: 'cram-cma2-002',
    part: 'CMA2',
    domain: 'CMA2-B',
    title: 'Cost of Capital (WACC)',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'WACC = Wd × Rd × (1-T) + We × Re + Wp × Rp',
      'Cost of debt: after-tax rate (interest × (1-tax rate))',
      'Cost of equity: CAPM (Rf + β(Rm - Rf)) or dividend growth',
      'Market value weights, not book value',
      'WACC is the hurdle rate for capital budgeting',
    ],
    formulas: [
      'WACC = (E/V)×Re + (D/V)×Rd×(1-T)',
      'CAPM: Re = Rf + β(Rm - Rf)',
    ],
    commonQuestions: [
      'Why is cost of debt adjusted for taxes?',
      'How is cost of equity calculated?',
      'What weights should be used in WACC?',
    ],
  },
  {
    id: 'cram-cma2-003',
    part: 'CMA2',
    domain: 'CMA2-B',
    title: 'Working Capital Management',
    priority: 'high',
    estimatedMinutes: 20,
    keyPoints: [
      'Cash conversion cycle = DSO + DIO - DPO',
      'EOQ minimizes total inventory costs',
      'Trade credit: 2/10 net 30 = 2% discount if pay in 10 days',
      'Cost of forgoing discount: (Discount/(1-Discount)) × (365/(Full-Discount))',
      'Aggressive policy: more short-term debt, higher return/risk',
    ],
    formulas: [
      'EOQ = √(2DS/H)',
      'Cash Cycle = Inventory Days + Receivable Days - Payable Days',
    ],
    commonQuestions: [
      'What is the cash conversion cycle?',
      'How is EOQ calculated?',
      'What is the cost of forgoing a cash discount?',
    ],
  },
  
  // Domain CMA2-C: Decision Analysis (25%)
  {
    id: 'cram-cma2-004',
    part: 'CMA2',
    domain: 'CMA2-C',
    title: 'Cost-Volume-Profit (CVP) Analysis',
    priority: 'critical',
    estimatedMinutes: 30,
    keyPoints: [
      'Contribution margin = Sales - Variable costs',
      'CM ratio = Contribution margin / Sales',
      'Breakeven units = Fixed costs / CM per unit',
      'Target profit: (Fixed + Target profit) / CM per unit',
      'Operating leverage = CM / Operating income',
    ],
    mnemonics: ['CM = S - VC; BE = FC / CM'],
    formulas: [
      'Breakeven Units = Fixed Costs / (Price - Variable Cost)',
      'Breakeven Sales = Fixed Costs / CM Ratio',
      'DOS = Operating Income / Contribution Margin',
    ],
    commonQuestions: [
      'How is breakeven calculated?',
      'What is contribution margin ratio?',
      'What does degree of operating leverage indicate?',
    ],
  },
  {
    id: 'cram-cma2-005',
    part: 'CMA2',
    domain: 'CMA2-C',
    title: 'Marginal Analysis (Make/Buy, Special Order)',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'Relevant costs: differ between alternatives, future costs',
      'Sunk costs: not relevant',
      'Opportunity costs: relevant',
      'Make vs buy: compare incremental costs, consider qualitative factors',
      'Special order: accept if price > incremental cost (if excess capacity)',
    ],
    mnemonics: ['FIDO = Future, Incremental, Differ between Options'],
    commonQuestions: [
      'What makes a cost relevant?',
      'Are sunk costs relevant?',
      'When should a special order be accepted?',
    ],
  },
  
  // Domain CMA2-E: Investment Decisions (10%)
  {
    id: 'cram-cma2-006',
    part: 'CMA2',
    domain: 'CMA2-E',
    title: 'Capital Budgeting Methods',
    priority: 'critical',
    estimatedMinutes: 25,
    keyPoints: [
      'NPV: PV of inflows - PV of outflows (accept if > 0)',
      'IRR: discount rate where NPV = 0 (accept if > WACC)',
      'Payback: time to recover investment (ignores time value)',
      'Discounted payback: time to recover using PV cash flows',
      'Profitability Index = PV of inflows / Investment (accept if > 1)',
    ],
    mnemonics: ['NIPP = NPV, IRR, Payback, PI'],
    formulas: [
      'NPV = Σ CFt / (1+r)^t - Initial Investment',
      'PI = PV of Cash Flows / Initial Investment',
    ],
    commonQuestions: [
      'Which capital budgeting method is preferred?',
      'What is the IRR decision rule?',
      'What are the limitations of payback period?',
    ],
  },
  
  // Domain CMA2-F: Professional Ethics (15%)
  {
    id: 'cram-cma2-007',
    part: 'CMA2',
    domain: 'CMA2-F',
    title: 'IMA Statement of Ethical Professional Practice',
    priority: 'critical',
    estimatedMinutes: 20,
    keyPoints: [
      'Four principles: Honesty, Fairness, Objectivity, Responsibility',
      'Four standards: Competence, Confidentiality, Integrity, Credibility',
      'Competence: develop and maintain skills',
      'Confidentiality: protect sensitive information',
      'Resolution process: discuss with supervisor, follow policies',
    ],
    mnemonics: ['CCIC = Competence, Confidentiality, Integrity, Credibility'],
    commonQuestions: [
      'What are the four IMA standards?',
      'What does the Confidentiality standard require?',
      'What should be done when ethical conflict arises?',
    ],
  },
];

// Essential formulas and calculations for CMA exam
export const CMA_CRAM_FORMULAS: CramFormula[] = [
  {
    id: 'formula-001',
    name: 'Contribution Margin',
    part: 'CMA2',
    formula: 'CM = Sales - Variable Costs',
    description: 'Amount available to cover fixed costs and profit',
    example: 'Sales $100, VC $60: CM = $100 - $60 = $40',
    examTip: 'CM per unit is critical for breakeven calculations',
  },
  {
    id: 'formula-002',
    name: 'Breakeven Point',
    part: 'CMA2',
    formula: 'BE Units = Fixed Costs / CM per Unit; BE $ = FC / CM Ratio',
    description: 'Volume where revenue equals total costs',
    example: 'FC $100K, CM $20/unit: BE = 100,000/20 = 5,000 units',
    examTip: 'For target profit, add target profit to fixed costs in numerator',
  },
  {
    id: 'formula-003',
    name: 'Material Price Variance',
    part: 'CMA1',
    formula: 'MPV = (Actual Price - Standard Price) × Actual Quantity',
    description: 'Measures price difference from standard',
    example: 'AP $2.10, SP $2.00, AQ 1,000: MPV = $0.10 × 1,000 = $100 U',
    examTip: 'Negative result = Favorable; Positive = Unfavorable',
  },
  {
    id: 'formula-004',
    name: 'Material Quantity Variance',
    part: 'CMA1',
    formula: 'MQV = (Actual Quantity - Standard Quantity) × Standard Price',
    description: 'Measures efficiency in material usage',
    example: 'AQ 1,050, SQ 1,000, SP $2: MQV = 50 × $2 = $100 U',
    examTip: 'Uses Standard Price to isolate quantity effect',
  },
  {
    id: 'formula-005',
    name: 'WACC',
    part: 'CMA2',
    formula: 'WACC = (E/V) × Re + (D/V) × Rd × (1-T)',
    description: 'Weighted average cost of capital',
    example: 'E=60%, D=40%, Re=12%, Rd=6%, T=25%: WACC = 0.6×12% + 0.4×6%×0.75 = 9%',
    examTip: 'Use market value weights; only debt has tax shield',
  },
  {
    id: 'formula-006',
    name: 'NPV',
    part: 'CMA2',
    formula: 'NPV = Σ [CFt / (1+r)^t] - Initial Investment',
    description: 'Present value of future cash flows minus investment',
    example: 'Investment $10K, CF $3K/yr for 5 yrs, r=10%: Calculate PV of annuity',
    examTip: 'Accept if NPV > 0; NPV is most theoretically correct method',
  },
  {
    id: 'formula-007',
    name: 'EOQ',
    part: 'CMA2',
    formula: 'EOQ = √(2DS/H)',
    description: 'Economic order quantity minimizing total inventory cost',
    example: 'D=10,000, S=$50/order, H=$2/unit: EOQ = √(2×10,000×50/2) = 707 units',
    examTip: 'D=demand, S=order cost, H=holding cost per unit',
  },
  {
    id: 'formula-008',
    name: 'DuPont Analysis',
    part: 'CMA2',
    formula: 'ROE = Profit Margin × Asset Turnover × Equity Multiplier',
    description: 'Breaks down ROE into three components',
    example: 'PM 5%, AT 2×, EM 2×: ROE = 5% × 2 × 2 = 20%',
    examTip: 'Helps identify which driver affects ROE most',
  },
];

// 5-day cram study plans by part
export const CMA_CRAM_PLANS: Record<CMASectionId, CramDay[]> = {
  CMA1: [
    {
      day: 1,
      title: 'Budgeting & Forecasting',
      focusDomains: ['CMA1-B'],
      topics: ['cram-cma1-001', 'cram-cma1-002'],
      formulas: [],
      practiceQuestions: 30,
      estimatedHours: 3,
    },
    {
      day: 2,
      title: 'Performance Management & Variances',
      focusDomains: ['CMA1-C'],
      topics: ['cram-cma1-003', 'cram-cma1-004'],
      formulas: ['formula-003', 'formula-004'],
      practiceQuestions: 35,
      estimatedHours: 3.5,
    },
    {
      day: 3,
      title: 'Cost Management & Costing Systems',
      focusDomains: ['CMA1-D'],
      topics: ['cram-cma1-005', 'cram-cma1-006'],
      formulas: [],
      practiceQuestions: 30,
      estimatedHours: 3,
    },
    {
      day: 4,
      title: 'Internal Controls & Full Simulation',
      focusDomains: ['CMA1-E', 'CMA1-A', 'CMA1-F'],
      topics: ['cram-cma1-007'],
      formulas: [],
      practiceQuestions: 100,
      estimatedHours: 4,
    },
    {
      day: 5,
      title: 'Weak Area Review & Final Prep',
      focusDomains: [],
      topics: [],
      formulas: ['formula-003', 'formula-004'],
      practiceQuestions: 50,
      estimatedHours: 2.5,
    },
  ],
  CMA2: [
    {
      day: 1,
      title: 'Financial Statement Analysis',
      focusDomains: ['CMA2-A'],
      topics: ['cram-cma2-001'],
      formulas: ['formula-008'],
      practiceQuestions: 30,
      estimatedHours: 3,
    },
    {
      day: 2,
      title: 'Corporate Finance & WACC',
      focusDomains: ['CMA2-B'],
      topics: ['cram-cma2-002', 'cram-cma2-003'],
      formulas: ['formula-005', 'formula-007'],
      practiceQuestions: 35,
      estimatedHours: 3.5,
    },
    {
      day: 3,
      title: 'CVP & Marginal Analysis',
      focusDomains: ['CMA2-C'],
      topics: ['cram-cma2-004', 'cram-cma2-005'],
      formulas: ['formula-001', 'formula-002'],
      practiceQuestions: 40,
      estimatedHours: 4,
    },
    {
      day: 4,
      title: 'Capital Budgeting & Ethics',
      focusDomains: ['CMA2-E', 'CMA2-F', 'CMA2-D'],
      topics: ['cram-cma2-006', 'cram-cma2-007'],
      formulas: ['formula-006'],
      practiceQuestions: 100,
      estimatedHours: 4,
    },
    {
      day: 5,
      title: 'Decision Analysis Review & Final Prep',
      focusDomains: ['CMA2-C'],
      topics: ['cram-cma2-004', 'cram-cma2-005'],
      formulas: ['formula-001', 'formula-002', 'formula-005', 'formula-006'],
      practiceQuestions: 50,
      estimatedHours: 2.5,
    },
  ],
};

// Storage and state management
const STORAGE_KEY = 'cma-cram-state';

let cramState: CramState = {
  part: 'CMA1',
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
export function initializeCramMode(part: CMASectionId): CramState {
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
    console.error('Error loading CMA cram state:', e);
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
    console.error('Error saving CMA cram state:', e);
  }
}

/**
 * Get today's plan
 */
export function getTodaysPlan(): CramDay | null {
  if (!cramState.isActive) return null;
  const plan = CMA_CRAM_PLANS[cramState.part];
  return plan[cramState.currentDay - 1] || null;
}

/**
 * Get topics for today
 */
export function getTodaysTopics(): CramTopic[] {
  const plan = getTodaysPlan();
  if (!plan) return [];
  return CMA_CRAM_TOPICS.filter(t => plan.topics.includes(t.id));
}

/**
 * Get formulas for today
 */
export function getTodaysFormulas(): CramFormula[] {
  const plan = getTodaysPlan();
  if (!plan) return [];
  return CMA_CRAM_FORMULAS.filter(f => plan.formulas.includes(f.id));
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
  const plan = CMA_CRAM_PLANS[cramState.part];
  if (cramState.currentDay < plan.length) {
    cramState.currentDay++;
    saveCramState();
    return true;
  }
  return false;
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
  else progress += topicsWeight;
  
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
  const plan = CMA_CRAM_PLANS[cramState.part];
  const totalDays = plan.length;
  const daysCompleted = cramState.currentDay - 1;
  
  const topicsForPart = CMA_CRAM_TOPICS.filter(t => t.part === cramState.part);
  const totalTopics = topicsForPart.length;
  const topicsCompleted = cramState.completedTopics.filter(
    id => topicsForPart.some(t => t.id === id)
  ).length;
  
  const accuracy = cramState.questionsAnswered > 0
    ? Math.round((cramState.correctAnswers / cramState.questionsAnswered) * 100)
    : 0;
  
  const readyForExam = topicsCompleted >= totalTopics * 0.8 && accuracy >= 72;
  
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
export function getCriticalTopics(part: CMASectionId): CramTopic[] {
  return CMA_CRAM_TOPICS.filter(t => t.part === part && t.priority === 'critical');
}

/**
 * Get all formulas for a part
 */
export function getFormulasForPart(part: CMASectionId): CramFormula[] {
  return CMA_CRAM_FORMULAS.filter(f => f.part === part);
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
    part: 'CMA1',
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
