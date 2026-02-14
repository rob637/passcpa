/**
 * CFP Calculator Practice Problems
 * 
 * Financial calculator drills for HP 12C and TI BA II Plus
 * Essential for CFP exam success - must be able to solve quickly
 */

export interface CalculatorProblem {
  id: string;
  category: 'TVM' | 'NPV' | 'IRR' | 'Bond' | 'Loan' | 'Retirement' | 'Statistics';
  difficulty: 'basic' | 'intermediate' | 'advanced';
  problem: string;
  setup: string; // Initial context or assumptions
  answer: string;
  answerValue: number;
  tolerance: number; // Acceptable variance for answer
  hp12c: {
    keystrokes: string[];
    display: string;
  };
  baiiPlus: {
    keystrokes: string[];
    display: string;
  };
  explanation: string;
  commonMistakes: string[];
  relatedConcepts: string[];
}

export interface CalculatorDrill {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // seconds
  problems: CalculatorProblem[];
}

// ============================================
// TIME VALUE OF MONEY (TVM) PROBLEMS
// ============================================

export const TVM_PROBLEMS: CalculatorProblem[] = [
  {
    id: 'CALC-TVM-001',
    category: 'TVM',
    difficulty: 'basic',
    problem: 'Calculate the future value of $10,000 invested at 7% for 10 years, compounded annually.',
    setup: 'Single lump sum investment',
    answer: '$19,671.51',
    answerValue: 19671.51,
    tolerance: 1,
    hp12c: {
      keystrokes: ['10000 [CHS] [PV]', '7 [i]', '10 [n]', '[FV]'],
      display: '19,671.51'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '10000 [+/-] [PV]', '7 [I/Y]', '10 [N]', '[CPT] [FV]'],
      display: 'FV = 19,671.51'
    },
    explanation: 'FV = PV × (1 + i)^n = $10,000 × (1.07)^10 = $19,671.51',
    commonMistakes: ['Forgetting to make PV negative', 'Using wrong number of periods'],
    relatedConcepts: ['Compound interest', 'Rule of 72']
  },
  {
    id: 'CALC-TVM-002',
    category: 'TVM',
    difficulty: 'basic',
    problem: 'How much must you invest today at 6% to have $50,000 in 15 years?',
    setup: 'Find present value of future goal',
    answer: '$20,862.67',
    answerValue: 20862.67,
    tolerance: 1,
    hp12c: {
      keystrokes: ['50000 [FV]', '6 [i]', '15 [n]', '[PV]'],
      display: '-20,862.67'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '50000 [FV]', '6 [I/Y]', '15 [N]', '[CPT] [PV]'],
      display: 'PV = -20,862.67'
    },
    explanation: 'PV = FV / (1 + i)^n = $50,000 / (1.06)^15 = $20,862.67',
    commonMistakes: ['Sign convention - PV will be negative (outflow)', 'Confusing PV and FV inputs'],
    relatedConcepts: ['Discounting', 'Present value']
  },
  {
    id: 'CALC-TVM-003',
    category: 'TVM',
    difficulty: 'intermediate',
    problem: 'What annual rate of return is needed to double your money in 9 years?',
    setup: 'Solve for interest rate',
    answer: '8.01%',
    answerValue: 8.01,
    tolerance: 0.1,
    hp12c: {
      keystrokes: ['1 [CHS] [PV]', '2 [FV]', '9 [n]', '[i]'],
      display: '8.01'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '1 [+/-] [PV]', '2 [FV]', '9 [N]', '[CPT] [I/Y]'],
      display: 'I/Y = 8.01'
    },
    explanation: 'i = (FV/PV)^(1/n) - 1 = (2/1)^(1/9) - 1 = 8.01%. Compare to Rule of 72: 72/9 = 8%',
    commonMistakes: ['Using same sign for PV and FV', 'Forgetting Rule of 72 as a quick check'],
    relatedConcepts: ['Rule of 72', 'Compound annual growth rate (CAGR)']
  },
  {
    id: 'CALC-TVM-004',
    category: 'TVM',
    difficulty: 'intermediate',
    problem: 'How many years to grow $25,000 to $100,000 at 8% annual return?',
    setup: 'Solve for time period',
    answer: '18.01 years',
    answerValue: 18.01,
    tolerance: 0.1,
    hp12c: {
      keystrokes: ['25000 [CHS] [PV]', '100000 [FV]', '8 [i]', '[n]'],
      display: '18.01'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '25000 [+/-] [PV]', '100000 [FV]', '8 [I/Y]', '[CPT] [N]'],
      display: 'N = 18.01'
    },
    explanation: 'n = ln(FV/PV) / ln(1+i) = ln(4) / ln(1.08) = 18.01 years',
    commonMistakes: ['Sign convention errors', 'Rule of 72 check: 72/8 = 9 years to double, need to quadruple'],
    relatedConcepts: ['Logarithmic solutions', 'Rule of 72 application']
  },
  {
    id: 'CALC-TVM-005',
    category: 'TVM',
    difficulty: 'intermediate',
    problem: 'A client invests $5,000 annually at year-end for 20 years at 6%. What is the future value?',
    setup: 'Ordinary annuity (end-of-period payments)',
    answer: '$183,927.96',
    answerValue: 183927.96,
    tolerance: 1,
    hp12c: {
      keystrokes: ['[g] [END]', '5000 [CHS] [PMT]', '6 [i]', '20 [n]', '[FV]'],
      display: '183,927.96'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '[2nd] [BGN] [2nd] [SET] (until END shows)', '5000 [+/-] [PMT]', '6 [I/Y]', '20 [N]', '[CPT] [FV]'],
      display: 'FV = 183,927.96'
    },
    explanation: 'FV = PMT × [((1+i)^n - 1) / i] = $5,000 × [((1.06)^20 - 1) / 0.06]',
    commonMistakes: ['Using BGN mode when should use END', 'Forgetting to clear prior calculations'],
    relatedConcepts: ['Annuity', 'Systematic investing', 'Dollar cost averaging']
  },
  {
    id: 'CALC-TVM-006',
    category: 'TVM',
    difficulty: 'advanced',
    problem: 'Same as above, but payments made at beginning of each year. What is the FV?',
    setup: 'Annuity due (beginning-of-period payments)',
    answer: '$194,963.64',
    answerValue: 194963.64,
    tolerance: 1,
    hp12c: {
      keystrokes: ['[g] [BEG]', '5000 [CHS] [PMT]', '6 [i]', '20 [n]', '[FV]'],
      display: '194,963.64'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '[2nd] [BGN] [2nd] [SET] (until BGN shows)', '5000 [+/-] [PMT]', '6 [I/Y]', '20 [N]', '[CPT] [FV]'],
      display: 'FV = 194,963.64'
    },
    explanation: 'Annuity due FV = Ordinary annuity FV × (1 + i) = $183,927.96 × 1.06 = $194,963.64',
    commonMistakes: ['Not switching to BGN mode', 'Forgetting to switch back to END after'],
    relatedConcepts: ['Annuity due vs ordinary annuity', 'Lease payments', 'Insurance premiums']
  },
  {
    id: 'CALC-TVM-007',
    category: 'TVM',
    difficulty: 'advanced',
    problem: 'Client needs $1 million at retirement in 25 years. With 7% return, how much monthly savings needed?',
    setup: 'Solve for PMT with monthly compounding',
    answer: '$1,234.32/month',
    answerValue: 1234.32,
    tolerance: 1,
    hp12c: {
      keystrokes: ['1000000 [FV]', '0 [PV]', '7 [ENTER] 12 [÷] [i]', '25 [ENTER] 12 [×] [n]', '[PMT]'],
      display: '-1,234.32'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '1000000 [FV]', '0 [PV]', '7 [÷] 12 [=] [I/Y]', '25 [×] 12 [=] [N]', '[CPT] [PMT]'],
      display: 'PMT = -1,234.32'
    },
    explanation: 'Monthly rate = 7%/12 = 0.5833%, Periods = 25×12 = 300. Solve for PMT.',
    commonMistakes: ['Forgetting to divide rate by 12', 'Forgetting to multiply years by 12', 'P/Y settings on BAII'],
    relatedConcepts: ['Retirement planning', 'Systematic savings', 'Compounding frequency']
  }
];

// ============================================
// LOAN AMORTIZATION PROBLEMS
// ============================================

export const LOAN_PROBLEMS: CalculatorProblem[] = [
  {
    id: 'CALC-LOAN-001',
    category: 'Loan',
    difficulty: 'basic',
    problem: 'Calculate monthly payment on $300,000 mortgage at 6.5% for 30 years.',
    setup: 'Fixed-rate amortizing loan',
    answer: '$1,896.20/month',
    answerValue: 1896.20,
    tolerance: 1,
    hp12c: {
      keystrokes: ['300000 [PV]', '6.5 [ENTER] 12 [÷] [i]', '30 [ENTER] 12 [×] [n]', '0 [FV]', '[PMT]'],
      display: '-1,896.20'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '300000 [PV]', '6.5 [÷] 12 [=] [I/Y]', '360 [N]', '0 [FV]', '[CPT] [PMT]'],
      display: 'PMT = -1,896.20'
    },
    explanation: 'Monthly rate = 6.5%/12, Periods = 360, PV = loan amount, solve for PMT',
    commonMistakes: ['Using annual rate instead of monthly', 'P/Y confusion on BA II Plus'],
    relatedConcepts: ['Mortgage calculations', 'Amortization', 'PITI']
  },
  {
    id: 'CALC-LOAN-002',
    category: 'Loan',
    difficulty: 'intermediate',
    problem: 'For the $300,000 mortgage at 6.5%/30 years, how much principal is paid in year 1?',
    setup: 'Amortization schedule - principal portion',
    answer: '$3,163.56',
    answerValue: 3163.56,
    tolerance: 5,
    hp12c: {
      keystrokes: ['(First calculate PMT as above)', '1 [f] [AMORT]', '[x⇔y]'],
      display: '(principal portion) 3,163.56'
    },
    baiiPlus: {
      keystrokes: ['(First calculate PMT)', '[2nd] [AMORT]', 'P1 = 1, P2 = 12 [ENTER]', '[↓]', '[↓]'],
      display: 'PRN = -3,163.56'
    },
    explanation: 'In early years, most of payment goes to interest. Use AMORT function for exact split.',
    commonMistakes: ['Confusing principal and interest portions', 'Not setting correct period range'],
    relatedConcepts: ['Amortization schedules', 'Interest deduction', 'Mortgage acceleration']
  },
  {
    id: 'CALC-LOAN-003',
    category: 'Loan',
    difficulty: 'intermediate',
    problem: 'Client has $250,000 mortgage at 5%, 25 years remaining, $1,461.89 payment. What is the loan balance after 5 more years?',
    setup: 'Remaining balance calculation',
    answer: '$207,168.25',
    answerValue: 207168.25,
    tolerance: 10,
    hp12c: {
      keystrokes: ['250000 [PV]', '5 [ENTER] 12 [÷] [i]', '1461.89 [CHS] [PMT]', '60 [n]', '[FV]'],
      display: '-207,168.25'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '250000 [PV]', '5 [÷] 12 [=] [I/Y]', '1461.89 [+/-] [PMT]', '60 [N]', '[CPT] [FV]'],
      display: 'FV = -207,168.25'
    },
    explanation: 'Set up original loan terms, then compute FV after 60 payments (5 years)',
    commonMistakes: ['Confusing remaining term with payment period', 'Sign errors'],
    relatedConcepts: ['Refinancing analysis', 'Home equity', 'Break-even calculations']
  },
  {
    id: 'CALC-LOAN-004',
    category: 'Loan',
    difficulty: 'advanced',
    problem: 'Car loan: $35,000 at 4.9% for 60 months. What is total interest paid?',
    setup: 'Calculate total interest over loan life',
    answer: '$4,530.60',
    answerValue: 4530.60,
    tolerance: 5,
    hp12c: {
      keystrokes: ['35000 [PV]', '4.9 [ENTER] 12 [÷] [i]', '60 [n]', '0 [FV]', '[PMT]', '60 [×] 35000 [-]'],
      display: '(1) PMT = -658.84, (2) Total interest = 4,530.60'
    },
    baiiPlus: {
      keystrokes: ['(Calculate PMT = 658.84)', 'PMT × 60 - 35000 = 4,530.60'],
      display: 'Total interest = 4,530.60'
    },
    explanation: 'Total payments = $658.84 × 60 = $39,530.40. Interest = $39,530.40 - $35,000 = $4,530.60',
    commonMistakes: ['Forgetting to subtract principal', 'Rounding PMT before final calculation'],
    relatedConcepts: ['Cost of borrowing', 'Loan comparisons', 'APR vs interest cost']
  }
];

// ============================================
// BOND VALUATION PROBLEMS
// ============================================

export const BOND_PROBLEMS: CalculatorProblem[] = [
  {
    id: 'CALC-BOND-001',
    category: 'Bond',
    difficulty: 'intermediate',
    problem: 'Calculate the price of a $1,000 bond with 6% coupon, 10 years to maturity, if market rate is 7%.',
    setup: 'Bond priced at discount (coupon < market rate)',
    answer: '$929.76',
    answerValue: 929.76,
    tolerance: 1,
    hp12c: {
      keystrokes: ['1000 [FV]', '30 [PMT]', '3.5 [i]', '20 [n]', '[PV]'],
      display: '-929.76'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '1000 [FV]', '30 [PMT]', '3.5 [I/Y]', '20 [N]', '[CPT] [PV]'],
      display: 'PV = -929.76'
    },
    explanation: 'Semi-annual: PMT = $60/2 = $30, i = 7%/2 = 3.5%, n = 10×2 = 20. Bond sells at discount because coupon < market rate.',
    commonMistakes: ['Forgetting semi-annual convention', 'Using annual rate/coupon instead of semi-annual'],
    relatedConcepts: ['Bond pricing', 'Premium vs discount bonds', 'YTM']
  },
  {
    id: 'CALC-BOND-002',
    category: 'Bond',
    difficulty: 'intermediate',
    problem: 'A bond sells for $1,050, has 8% coupon, 5 years to maturity. What is the YTM?',
    setup: 'Bond priced at premium, solve for YTM',
    answer: '6.87%',
    answerValue: 6.87,
    tolerance: 0.1,
    hp12c: {
      keystrokes: ['1050 [CHS] [PV]', '1000 [FV]', '40 [PMT]', '10 [n]', '[i]', '2 [×]'],
      display: '(i) 3.435 → YTM = 6.87%'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '1050 [+/-] [PV]', '1000 [FV]', '40 [PMT]', '10 [N]', '[CPT] [I/Y]', '[×] 2 [=]'],
      display: 'I/Y = 3.435 → YTM = 6.87%'
    },
    explanation: 'Semi-annual: PV = -1050, FV = 1000, PMT = 40 (80/2), n = 10. Solve for i, then double for annual YTM.',
    commonMistakes: ['Forgetting to double the semi-annual rate', 'Sign errors on PV'],
    relatedConcepts: ['Yield to maturity', 'Bond yield calculations', 'Current yield vs YTM']
  },
  {
    id: 'CALC-BOND-003',
    category: 'Bond',
    difficulty: 'advanced',
    problem: 'A zero-coupon bond matures in 15 years at $1,000. If YTM is 5%, what is the current price?',
    setup: 'Zero-coupon bond valuation',
    answer: '$481.02',
    answerValue: 481.02,
    tolerance: 1,
    hp12c: {
      keystrokes: ['1000 [FV]', '0 [PMT]', '2.5 [i]', '30 [n]', '[PV]'],
      display: '-481.02'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '1000 [FV]', '0 [PMT]', '2.5 [I/Y]', '30 [N]', '[CPT] [PV]'],
      display: 'PV = -481.02'
    },
    explanation: 'Zero-coupon: PMT = 0. Semi-annual: i = 5%/2 = 2.5%, n = 15×2 = 30. PV = 1000/(1.025)^30',
    commonMistakes: ['Forgetting zeros still use semi-annual convention', 'Phantom interest taxation issue'],
    relatedConcepts: ['Zero-coupon bonds', 'OID rules', 'Phantom income']
  }
];

// ============================================
// RETIREMENT PLANNING CALCULATIONS
// ============================================

export const RETIREMENT_PROBLEMS: CalculatorProblem[] = [
  {
    id: 'CALC-RET-001',
    category: 'Retirement',
    difficulty: 'intermediate',
    problem: 'Client needs $80,000/year for 25 years in retirement. At 5% return, how much is needed at retirement?',
    setup: 'Capital needs analysis - PV of retirement income',
    answer: '$1,127,515.82',
    answerValue: 1127515.82,
    tolerance: 100,
    hp12c: {
      keystrokes: ['[g] [END]', '80000 [CHS] [PMT]', '5 [i]', '25 [n]', '0 [FV]', '[PV]'],
      display: '1,127,515.82'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '80000 [+/-] [PMT]', '5 [I/Y]', '25 [N]', '0 [FV]', '[CPT] [PV]'],
      display: 'PV = 1,127,515.82'
    },
    explanation: 'This is the PV of an ordinary annuity. The result is positive because it represents value received.',
    commonMistakes: ['Confusing with FV calculation', 'Not accounting for inflation in real analysis'],
    relatedConcepts: ['Capital needs analysis', '4% rule', 'Retirement income planning']
  },
  {
    id: 'CALC-RET-002',
    category: 'Retirement',
    difficulty: 'advanced',
    problem: 'Client has $500,000 at retirement. At 6% return, how much can be withdrawn annually for 30 years?',
    setup: 'Sustainable withdrawal calculation',
    answer: '$36,324.05/year',
    answerValue: 36324.05,
    tolerance: 10,
    hp12c: {
      keystrokes: ['500000 [CHS] [PV]', '6 [i]', '30 [n]', '0 [FV]', '[PMT]'],
      display: '36,324.05'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '500000 [+/-] [PV]', '6 [I/Y]', '30 [N]', '0 [FV]', '[CPT] [PMT]'],
      display: 'PMT = 36,324.05'
    },
    explanation: 'Amortizing $500,000 over 30 years at 6% = $36,324.05/year or 7.26% withdrawal rate.',
    commonMistakes: ['Not zero-ing FV', 'Confusing with interest-only calculation'],
    relatedConcepts: ['Withdrawal rate', 'Sequence of returns risk', 'Monte Carlo simulation']
  },
  {
    id: 'CALC-RET-003',
    category: 'Retirement',
    difficulty: 'advanced',
    problem: 'Client age 35 has $100,000, saves $1,000/month, wants to retire at 60 with $2,000,000. What return is needed?',
    setup: 'Required rate of return calculation',
    answer: '6.47% annual',
    answerValue: 6.47,
    tolerance: 0.1,
    hp12c: {
      keystrokes: ['100000 [CHS] [PV]', '1000 [CHS] [PMT]', '2000000 [FV]', '300 [n]', '[i]', '12 [×]'],
      display: '(i) 0.539 → Annual = 6.47%'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [CLR TVM]', '100000 [+/-] [PV]', '1000 [+/-] [PMT]', '2000000 [FV]', '300 [N]', '[CPT] [I/Y]', '[×] 12 [=]'],
      display: 'I/Y = 0.539 → Annual = 6.47%'
    },
    explanation: 'Monthly periods: n = 25×12 = 300. Result is monthly rate; multiply by 12 for annual.',
    commonMistakes: ['Forgetting to annualize monthly rate', 'Sign errors on PV and PMT'],
    relatedConcepts: ['Retirement projections', 'Goal feasibility', 'Asset allocation implications']
  }
];

// ============================================
// NPV AND IRR PROBLEMS
// ============================================

export const NPV_IRR_PROBLEMS: CalculatorProblem[] = [
  {
    id: 'CALC-NPV-001',
    category: 'NPV',
    difficulty: 'advanced',
    problem: 'Investment: -$50,000 initial, then $15,000 annually for 5 years. At 8% discount rate, what is NPV?',
    setup: 'Net Present Value of uneven cash flows',
    answer: '$9,890.65',
    answerValue: 9890.65,
    tolerance: 10,
    hp12c: {
      keystrokes: ['[f] [FIN]', '50000 [CHS] [g] [CFo]', '15000 [g] [CFj]', '5 [g] [Nj]', '8 [i]', '[f] [NPV]'],
      display: '9,890.65'
    },
    baiiPlus: {
      keystrokes: ['[CF]', '50000 [+/-] [ENTER] [↓]', '15000 [ENTER] [↓]', '5 [ENTER] [↓]', '[NPV]', '8 [ENTER] [↓]', '[CPT]'],
      display: 'NPV = 9,890.65'
    },
    explanation: 'NPV = -50,000 + 15,000/1.08 + 15,000/1.08² + ... + 15,000/1.08⁵ = $9,890.65',
    commonMistakes: ['Entering CF0 as positive', 'Forgetting frequency for repeating cash flows'],
    relatedConcepts: ['Capital budgeting', 'Investment decision rules', 'NPV vs IRR']
  },
  {
    id: 'CALC-IRR-001',
    category: 'IRR',
    difficulty: 'advanced',
    problem: 'Same investment: -$50,000, then $15,000/year for 5 years. What is the IRR?',
    setup: 'Internal Rate of Return calculation',
    answer: '15.24%',
    answerValue: 15.24,
    tolerance: 0.1,
    hp12c: {
      keystrokes: ['[f] [FIN]', '50000 [CHS] [g] [CFo]', '15000 [g] [CFj]', '5 [g] [Nj]', '[f] [IRR]'],
      display: '15.24'
    },
    baiiPlus: {
      keystrokes: ['[CF]', '50000 [+/-] [ENTER] [↓]', '15000 [ENTER] [↓]', '5 [ENTER] [↓]', '[IRR]', '[CPT]'],
      display: 'IRR = 15.24'
    },
    explanation: 'IRR is the discount rate that makes NPV = 0. At 15.24%, PV of inflows equals $50,000.',
    commonMistakes: ['Confusing IRR with simple return', 'Multiple IRR problem with alternating cash flows'],
    relatedConcepts: ['Hurdle rate', 'IRR vs NPV conflicts', 'Modified IRR']
  },
  {
    id: 'CALC-NPV-002',
    category: 'NPV',
    difficulty: 'advanced',
    problem: 'Client considering rental property: -$200,000, Year 1: $15,000, Year 2: $16,000, Year 3: $17,000, Year 4: $18,000, Year 5: $220,000 (includes sale). At 7%, what is NPV?',
    setup: 'Uneven cash flows with terminal value',
    answer: '$26,997.32',
    answerValue: 26997.32,
    tolerance: 50,
    hp12c: {
      keystrokes: ['[f] [FIN]', '200000 [CHS] [g] [CFo]', '15000 [g] [CFj]', '16000 [g] [CFj]', '17000 [g] [CFj]', '18000 [g] [CFj]', '220000 [g] [CFj]', '7 [i]', '[f] [NPV]'],
      display: '26,997.32'
    },
    baiiPlus: {
      keystrokes: ['[CF]', '200000 [+/-] [ENTER] [↓]', '15000 [ENTER] [↓] [↓]', '16000 [ENTER] [↓] [↓]', '17000 [ENTER] [↓] [↓]', '18000 [ENTER] [↓] [↓]', '220000 [ENTER] [↓]', '[NPV]', '7 [ENTER] [↓]', '[CPT]'],
      display: 'NPV = 26,997.32'
    },
    explanation: 'Positive NPV indicates investment exceeds 7% hurdle rate. Each cash flow entered individually when they vary.',
    commonMistakes: ['Forgetting to include sale proceeds', 'Using wrong frequency for individual cash flows'],
    relatedConcepts: ['Real estate analysis', 'Holding period return', 'Cap rate']
  }
];

// ============================================
// STATISTICS FOR INVESTMENT ANALYSIS
// ============================================

export const STATISTICS_PROBLEMS: CalculatorProblem[] = [
  {
    id: 'CALC-STAT-001',
    category: 'Statistics',
    difficulty: 'intermediate',
    problem: 'Portfolio returns: Year 1: 12%, Year 2: -8%, Year 3: 15%, Year 4: 6%, Year 5: 10%. What is the arithmetic mean?',
    setup: 'Calculate average return',
    answer: '7.00%',
    answerValue: 7.00,
    tolerance: 0.1,
    hp12c: {
      keystrokes: ['12 [Σ+]', '8 [CHS] [Σ+]', '15 [Σ+]', '6 [Σ+]', '10 [Σ+]', '[g] [x̄]'],
      display: '7.00'
    },
    baiiPlus: {
      keystrokes: ['[2nd] [DATA]', '[2nd] [CLR Work]', '12 [ENTER] [↓] [↓]', '8 [+/-] [ENTER] [↓] [↓]', '15 [ENTER] [↓] [↓]', '6 [ENTER] [↓] [↓]', '10 [ENTER]', '[STAT]', '[↓]'],
      display: 'x̄ = 7.00'
    },
    explanation: 'Arithmetic mean = (12 + (-8) + 15 + 6 + 10) / 5 = 35 / 5 = 7.00%',
    commonMistakes: ['Using geometric mean formula instead', 'Forgetting negative sign on losses'],
    relatedConcepts: ['Arithmetic vs geometric mean', 'Expected return', 'Risk measures']
  },
  {
    id: 'CALC-STAT-002',
    category: 'Statistics',
    difficulty: 'advanced',
    problem: 'Same returns (12%, -8%, 15%, 6%, 10%). What is the sample standard deviation?',
    setup: 'Calculate portfolio volatility',
    answer: '9.00%',
    answerValue: 9.00,
    tolerance: 0.1,
    hp12c: {
      keystrokes: ['(Enter data as above)', '[g] [s]'],
      display: '9.00'
    },
    baiiPlus: {
      keystrokes: ['(Enter data as above)', '[STAT]', '[↓] [↓] [↓]'],
      display: 'Sx = 9.00'
    },
    explanation: 'Sample SD calculation: Mean = 7%. Deviations: 5, -15, 8, -1, 3. Squared: 25+225+64+1+9=324. Variance = 324/4 = 81. SD = √81 = 9.00%. Higher SD = higher risk.',
    commonMistakes: ['Using population SD (n) instead of sample SD (n-1)', 'Confusing variance with standard deviation'],
    relatedConcepts: ['Risk measurement', 'Sharpe ratio', 'Normal distribution', 'Variance']
  }
];

// ============================================
// TIMED DRILLS
// ============================================

export const CALCULATOR_DRILLS: CalculatorDrill[] = [
  {
    id: 'DRILL-TVM-BASIC',
    title: 'TVM Fundamentals',
    description: 'Master the 5 TVM keys: N, I/Y, PV, PMT, FV',
    timeLimit: 600, // 10 minutes
    problems: [TVM_PROBLEMS[0], TVM_PROBLEMS[1], TVM_PROBLEMS[4], LOAN_PROBLEMS[0]]
  },
  {
    id: 'DRILL-TVM-ADVANCED',
    title: 'Advanced TVM',
    description: 'Annuities due, monthly compounding, solving for rate and time',
    timeLimit: 900, // 15 minutes
    problems: [TVM_PROBLEMS[2], TVM_PROBLEMS[3], TVM_PROBLEMS[5], TVM_PROBLEMS[6]]
  },
  {
    id: 'DRILL-BONDS',
    title: 'Bond Calculations',
    description: 'Bond pricing, YTM, zero-coupon bonds',
    timeLimit: 600,
    problems: BOND_PROBLEMS
  },
  {
    id: 'DRILL-RETIREMENT',
    title: 'Retirement Calculations',
    description: 'Capital needs, withdrawal rates, required returns',
    timeLimit: 600,
    problems: RETIREMENT_PROBLEMS
  },
  {
    id: 'DRILL-COMPREHENSIVE',
    title: 'Comprehensive Calculator Exam',
    description: 'Mixed problems covering all calculator operations',
    timeLimit: 1200, // 20 minutes
    problems: [
      TVM_PROBLEMS[6],
      LOAN_PROBLEMS[1],
      BOND_PROBLEMS[1],
      RETIREMENT_PROBLEMS[0],
      NPV_IRR_PROBLEMS[0],
      STATISTICS_PROBLEMS[0]
    ]
  }
];

// Combine all problems for export
export const ALL_CALCULATOR_PROBLEMS: CalculatorProblem[] = [
  ...TVM_PROBLEMS,
  ...LOAN_PROBLEMS,
  ...BOND_PROBLEMS,
  ...RETIREMENT_PROBLEMS,
  ...NPV_IRR_PROBLEMS,
  ...STATISTICS_PROBLEMS
];

export default {
  TVM_PROBLEMS,
  LOAN_PROBLEMS,
  BOND_PROBLEMS,
  RETIREMENT_PROBLEMS,
  NPV_IRR_PROBLEMS,
  STATISTICS_PROBLEMS,
  CALCULATOR_DRILLS,
  ALL_CALCULATOR_PROBLEMS
};
