/**
 * CFP Formula Quick Reference
 * Interactive reference sheets with calculator keystrokes
 */

export interface Formula {
  id: string;
  name: string;
  category: FormulaCategory;
  formula: string;
  variables: { symbol: string; meaning: string }[];
  example: {
    problem: string;
    values: { symbol: string; value: string }[];
    solution: string;
    answer: string;
  };
  hp12c: string[];
  baiiPlus: string[];
  tips: string[];
  relatedTopics: string[];
}

export type FormulaCategory = 
  | 'TVM'
  | 'Retirement'
  | 'Investment'
  | 'Tax'
  | 'Insurance'
  | 'Estate'
  | 'Ratios';

export const CFP_FORMULAS: Formula[] = [
  // ============================================
  // Time Value of Money (TVM)
  // ============================================
  {
    id: 'TVM-001',
    name: 'Future Value (Lump Sum)',
    category: 'TVM',
    formula: 'FV = PV × (1 + r)^n',
    variables: [
      { symbol: 'FV', meaning: 'Future Value' },
      { symbol: 'PV', meaning: 'Present Value (initial investment)' },
      { symbol: 'r', meaning: 'Interest rate per period (decimal)' },
      { symbol: 'n', meaning: 'Number of periods' }
    ],
    example: {
      problem: 'How much will $10,000 grow to in 5 years at 8% annual interest?',
      values: [
        { symbol: 'PV', value: '$10,000' },
        { symbol: 'r', value: '8% = 0.08' },
        { symbol: 'n', value: '5 years' }
      ],
      solution: 'FV = $10,000 × (1.08)^5 = $10,000 × 1.4693',
      answer: '$14,693.28'
    },
    hp12c: [
      '10000 [CHS] [PV]',
      '8 [i]',
      '5 [n]',
      '0 [PMT]',
      '[FV] → 14,693.28'
    ],
    baiiPlus: [
      '[2nd] [CLR TVM]',
      '10000 [+/-] [PV]',
      '8 [I/Y]',
      '5 [N]',
      '0 [PMT]',
      '[CPT] [FV] → 14,693.28'
    ],
    tips: [
      'Always clear TVM registers before starting',
      'PV is entered as negative (cash outflow)',
      'For monthly compounding, divide rate by 12 and multiply n by 12'
    ],
    relatedTopics: ['Compound Interest', 'Rule of 72', 'Investment Growth']
  },
  {
    id: 'TVM-002',
    name: 'Present Value (Lump Sum)',
    category: 'TVM',
    formula: 'PV = FV / (1 + r)^n',
    variables: [
      { symbol: 'PV', meaning: 'Present Value' },
      { symbol: 'FV', meaning: 'Future Value needed' },
      { symbol: 'r', meaning: 'Discount rate per period' },
      { symbol: 'n', meaning: 'Number of periods' }
    ],
    example: {
      problem: 'How much to invest today to have $50,000 in 10 years at 6%?',
      values: [
        { symbol: 'FV', value: '$50,000' },
        { symbol: 'r', value: '6% = 0.06' },
        { symbol: 'n', value: '10 years' }
      ],
      solution: 'PV = $50,000 / (1.06)^10 = $50,000 / 1.7908',
      answer: '$27,919.74'
    },
    hp12c: [
      '50000 [FV]',
      '6 [i]',
      '10 [n]',
      '0 [PMT]',
      '[PV] → -27,919.74'
    ],
    baiiPlus: [
      '[2nd] [CLR TVM]',
      '50000 [FV]',
      '6 [I/Y]',
      '10 [N]',
      '0 [PMT]',
      '[CPT] [PV] → -27,919.74'
    ],
    tips: [
      'Result is negative because it represents cash outflow (investment)',
      'Used for education funding, retirement needs, goal planning',
      'Higher discount rate = lower present value needed'
    ],
    relatedTopics: ['Discounting', 'Education Planning', 'Retirement Needs']
  },
  {
    id: 'TVM-003',
    name: 'Future Value of Annuity (Ordinary)',
    category: 'TVM',
    formula: 'FV = PMT × [((1 + r)^n - 1) / r]',
    variables: [
      { symbol: 'FV', meaning: 'Future Value of all payments' },
      { symbol: 'PMT', meaning: 'Payment amount per period' },
      { symbol: 'r', meaning: 'Interest rate per period' },
      { symbol: 'n', meaning: 'Number of payments' }
    ],
    example: {
      problem: 'Save $500/month for 30 years at 7% annual (monthly compounding). What is the total?',
      values: [
        { symbol: 'PMT', value: '$500' },
        { symbol: 'r', value: '7%/12 = 0.5833%' },
        { symbol: 'n', value: '30 × 12 = 360' }
      ],
      solution: 'FV = $500 × [((1.005833)^360 - 1) / 0.005833]',
      answer: '$606,438.81'
    },
    hp12c: [
      '[g] [END]',
      '500 [CHS] [PMT]',
      '7 [g] [12÷] → 0.5833 [i]',
      '30 [g] [12×] → 360 [n]',
      '0 [PV]',
      '[FV] → 606,438.81'
    ],
    baiiPlus: [
      '[2nd] [CLR TVM]',
      '[2nd] [BGN] → END',
      '500 [+/-] [PMT]',
      '7 [÷] 12 [=] [I/Y]',
      '360 [N]',
      '0 [PV]',
      '[CPT] [FV] → 606,438.81'
    ],
    tips: [
      'Ordinary annuity: payments at END of period',
      'For annuity due (beginning), multiply result by (1+r)',
      'This is the core 401(k)/IRA accumulation formula'
    ],
    relatedTopics: ['401(k) Planning', 'Systematic Investing', 'Retirement Accumulation']
  },
  {
    id: 'TVM-004',
    name: 'Present Value of Annuity (Ordinary)',
    category: 'TVM',
    formula: 'PV = PMT × [(1 - (1 + r)^-n) / r]',
    variables: [
      { symbol: 'PV', meaning: 'Present Value (amount needed today)' },
      { symbol: 'PMT', meaning: 'Payment amount per period' },
      { symbol: 'r', meaning: 'Interest rate per period' },
      { symbol: 'n', meaning: 'Number of payments' }
    ],
    example: {
      problem: 'How much is needed to fund $4,000/month for 25 years at 5%?',
      values: [
        { symbol: 'PMT', value: '$4,000' },
        { symbol: 'r', value: '5%/12 = 0.4167%' },
        { symbol: 'n', value: '25 × 12 = 300' }
      ],
      solution: 'PV = $4,000 × [(1 - (1.004167)^-300) / 0.004167]',
      answer: '$681,998.52'
    },
    hp12c: [
      '[g] [END]',
      '4000 [PMT]',
      '5 [g] [12÷] [i]',
      '25 [g] [12×] [n]',
      '0 [FV]',
      '[PV] → -681,998.52'
    ],
    baiiPlus: [
      '[2nd] [CLR TVM]',
      '4000 [PMT]',
      '5 [÷] 12 [=] [I/Y]',
      '300 [N]',
      '0 [FV]',
      '[CPT] [PV] → -681,998.52'
    ],
    tips: [
      'This is the retirement DISTRIBUTION calculation',
      'Negative PV = the nest egg needed',
      'Don\'t forget to adjust for inflation in retirement'
    ],
    relatedTopics: ['Retirement Distribution', 'Pension Valuation', 'Annuity Pricing']
  },
  {
    id: 'TVM-005',
    name: 'Rule of 72',
    category: 'TVM',
    formula: 'Years to Double = 72 / Interest Rate',
    variables: [
      { symbol: '72', meaning: 'Constant' },
      { symbol: 'r', meaning: 'Annual interest rate (as whole number)' }
    ],
    example: {
      problem: 'How long to double money at 9% annual return?',
      values: [
        { symbol: 'r', value: '9%' }
      ],
      solution: 'Years = 72 / 9',
      answer: '8 years'
    },
    hp12c: ['72 [ENTER] 9 [÷] → 8'],
    baiiPlus: ['72 [÷] 9 [=] → 8'],
    tips: [
      'Quick mental math shortcut',
      'Also works in reverse: Rate = 72 / Years',
      'Most accurate between 6-10% rates'
    ],
    relatedTopics: ['Compound Growth', 'Investment Planning', 'Quick Calculations']
  },
  {
    id: 'TVM-006',
    name: 'Net Present Value (NPV)',
    category: 'TVM',
    formula: 'NPV = Σ [CFt / (1+r)^t] - Initial Investment',
    variables: [
      { symbol: 'CFt', meaning: 'Cash flow at time t' },
      { symbol: 'r', meaning: 'Discount rate' },
      { symbol: 't', meaning: 'Time period' }
    ],
    example: {
      problem: 'Invest $10,000 for cash flows of $3,000, $4,000, $5,000 over 3 years at 10%',
      values: [
        { symbol: 'CF0', value: '-$10,000' },
        { symbol: 'CF1', value: '$3,000' },
        { symbol: 'CF2', value: '$4,000' },
        { symbol: 'CF3', value: '$5,000' }
      ],
      solution: 'NPV = -10,000 + 3,000/1.1 + 4,000/1.21 + 5,000/1.331',
      answer: '$302.78 (positive = accept)'
    },
    hp12c: [
      '10000 [CHS] [g] [CF0]',
      '3000 [g] [CFj]',
      '4000 [g] [CFj]',
      '5000 [g] [CFj]',
      '10 [i]',
      '[f] [NPV] → 302.78'
    ],
    baiiPlus: [
      '[CF] [2nd] [CLR Work]',
      '10000 [+/-] [ENTER] [↓]',
      '3000 [ENTER] [↓] [↓]',
      '4000 [ENTER] [↓] [↓]',
      '5000 [ENTER] [↓]',
      '[NPV] 10 [ENTER] [↓] [CPT] → 302.78'
    ],
    tips: [
      'NPV > 0: Accept the investment',
      'NPV < 0: Reject the investment',
      'NPV = 0: Indifferent (earns exactly required return)'
    ],
    relatedTopics: ['Capital Budgeting', 'Investment Analysis', 'IRR']
  },

  // ============================================
  // Retirement Formulas
  // ============================================
  {
    id: 'RET-001',
    name: 'Capital Needs Analysis (Basic)',
    category: 'Retirement',
    formula: 'Required Portfolio = Annual Need / Withdrawal Rate',
    variables: [
      { symbol: 'Portfolio', meaning: 'Amount needed at retirement' },
      { symbol: 'Annual Need', meaning: 'Yearly income required' },
      { symbol: 'Withdrawal Rate', meaning: 'Safe withdrawal rate (typically 4%)' }
    ],
    example: {
      problem: 'Need $80,000/year in retirement. How much is required at 4% withdrawal rate?',
      values: [
        { symbol: 'Annual Need', value: '$80,000' },
        { symbol: 'Withdrawal Rate', value: '4% = 0.04' }
      ],
      solution: 'Portfolio = $80,000 / 0.04',
      answer: '$2,000,000'
    },
    hp12c: ['80000 [ENTER] .04 [÷] → 2,000,000'],
    baiiPlus: ['80000 [÷] .04 [=] → 2,000,000'],
    tips: [
      '4% rule assumes 30-year retirement',
      'Adjust for Social Security and pensions',
      'Consider 3-3.5% for early retirees or conservative planning'
    ],
    relatedTopics: ['4% Rule', 'Retirement Planning', 'Safe Withdrawal Rate']
  },
  {
    id: 'RET-002',
    name: 'Inflation-Adjusted Future Need',
    category: 'Retirement',
    formula: 'Future Need = Current Need × (1 + inflation)^years',
    variables: [
      { symbol: 'Future Need', meaning: 'Amount needed in future dollars' },
      { symbol: 'Current Need', meaning: 'Amount needed in today\'s dollars' },
      { symbol: 'inflation', meaning: 'Expected annual inflation rate' },
      { symbol: 'years', meaning: 'Years until retirement' }
    ],
    example: {
      problem: 'Need $60,000 today. What is equivalent in 20 years at 3% inflation?',
      values: [
        { symbol: 'Current Need', value: '$60,000' },
        { symbol: 'inflation', value: '3%' },
        { symbol: 'years', value: '20' }
      ],
      solution: 'Future Need = $60,000 × (1.03)^20',
      answer: '$108,366.67'
    },
    hp12c: [
      '60000 [PV]',
      '3 [i]',
      '20 [n]',
      '0 [PMT]',
      '[FV] → 108,366.67'
    ],
    baiiPlus: [
      '60000 [+/-] [PV]',
      '3 [I/Y]',
      '20 [N]',
      '0 [PMT]',
      '[CPT] [FV] → 108,366.67'
    ],
    tips: [
      'Always inflate retirement needs to future dollars',
      'Historical inflation averages 3% (use 2.5-3.5%)',
      'Healthcare typically inflates faster than general CPI'
    ],
    relatedTopics: ['Inflation', 'Purchasing Power', 'Real vs Nominal Returns']
  },
  {
    id: 'RET-003',
    name: '72(t) SEPP Calculation (Amortization Method)',
    category: 'Retirement',
    formula: 'Annual Payment = Account Balance × Amortization Factor',
    variables: [
      { symbol: 'Payment', meaning: 'Annual distribution (penalty-free)' },
      { symbol: 'Balance', meaning: 'IRA/retirement account balance' },
      { symbol: 'Factor', meaning: 'Based on life expectancy and interest rate' }
    ],
    example: {
      problem: 'Age 50, $500,000 IRA, single life expectancy 34.2 years, 5% rate',
      values: [
        { symbol: 'Balance', value: '$500,000' },
        { symbol: 'n', value: '34.2 years' },
        { symbol: 'r', value: '5%' }
      ],
      solution: 'Calculate PV annuity factor, then divide balance',
      answer: 'Approximately $29,927/year'
    },
    hp12c: [
      '500000 [CHS] [PV]',
      '5 [i]',
      '34.2 [n]',
      '0 [FV]',
      '[PMT] → 29,927'
    ],
    baiiPlus: [
      '500000 [+/-] [PV]',
      '5 [I/Y]',
      '34.2 [N]',
      '0 [FV]',
      '[CPT] [PMT] → 29,927'
    ],
    tips: [
      'Must continue for 5 years OR until age 59½ (whichever is later)',
      'Avoid 10% early withdrawal penalty',
      'Three methods: Required Minimum, Fixed Amortization, Fixed Annuitization'
    ],
    relatedTopics: ['Early Retirement', 'IRA Distributions', 'Penalty Avoidance']
  },

  // ============================================
  // Investment Formulas
  // ============================================
  {
    id: 'INV-001',
    name: 'Holding Period Return',
    category: 'Investment',
    formula: 'HPR = (Ending Value - Beginning Value + Income) / Beginning Value',
    variables: [
      { symbol: 'HPR', meaning: 'Holding Period Return (decimal)' },
      { symbol: 'Ending', meaning: 'Value at end of period' },
      { symbol: 'Beginning', meaning: 'Value at start of period' },
      { symbol: 'Income', meaning: 'Dividends or interest received' }
    ],
    example: {
      problem: 'Buy stock at $50, sell at $58, received $2 dividend. What is HPR?',
      values: [
        { symbol: 'Beginning', value: '$50' },
        { symbol: 'Ending', value: '$58' },
        { symbol: 'Income', value: '$2' }
      ],
      solution: 'HPR = ($58 - $50 + $2) / $50 = $10 / $50',
      answer: '20%'
    },
    hp12c: ['58 [ENTER] 50 [-] 2 [+] 50 [÷] → 0.20'],
    baiiPlus: ['( 58 [-] 50 [+] 2 ) [÷] 50 [=] → 0.20'],
    tips: [
      'Does not account for time (annualize separately)',
      'Include all cash flows: dividends, interest, distributions',
      'Basis for calculating total return'
    ],
    relatedTopics: ['Total Return', 'Performance Measurement', 'Capital Gains']
  },
  {
    id: 'INV-002',
    name: 'Standard Deviation',
    category: 'Investment',
    formula: 'σ = √[Σ(xi - x̄)² / (n-1)]',
    variables: [
      { symbol: 'σ', meaning: 'Standard deviation' },
      { symbol: 'xi', meaning: 'Individual return' },
      { symbol: 'x̄', meaning: 'Mean return' },
      { symbol: 'n', meaning: 'Number of observations' }
    ],
    example: {
      problem: 'Returns: 10%, 15%, 5%, 12%, 8%. Calculate standard deviation.',
      values: [
        { symbol: 'Returns', value: '10%, 15%, 5%, 12%, 8%' },
        { symbol: 'Mean', value: '10%' }
      ],
      solution: 'Variance = [(0)² + (5)² + (-5)² + (2)² + (-2)²] / 4 = 14.5',
      answer: 'σ = √14.5 = 3.81%'
    },
    hp12c: [
      '10 [Σ+]',
      '15 [Σ+]',
      '5 [Σ+]',
      '12 [Σ+]',
      '8 [Σ+]',
      '[g] [s] → 3.81'
    ],
    baiiPlus: [
      '[2nd] [DATA] [2nd] [CLR Work]',
      '10 [ENTER] [↓] [↓]',
      '15 [ENTER] [↓] [↓]',
      '5 [ENTER] [↓] [↓]',
      '12 [ENTER] [↓] [↓]',
      '8 [ENTER]',
      '[2nd] [STAT] [↓] → Sx = 3.81'
    ],
    tips: [
      'Measures volatility/risk',
      '68% of returns fall within ±1 SD of mean',
      '95% of returns fall within ±2 SD of mean'
    ],
    relatedTopics: ['Risk Measurement', 'Normal Distribution', 'Volatility']
  },
  {
    id: 'INV-003',
    name: 'Beta',
    category: 'Investment',
    formula: 'β = Covariance(stock, market) / Variance(market)',
    variables: [
      { symbol: 'β', meaning: 'Beta coefficient' },
      { symbol: 'Cov', meaning: 'Covariance of stock with market' },
      { symbol: 'Var', meaning: 'Variance of market returns' }
    ],
    example: {
      problem: 'Stock has covariance of 0.0024 with market. Market variance is 0.0016.',
      values: [
        { symbol: 'Covariance', value: '0.0024' },
        { symbol: 'Market Variance', value: '0.0016' }
      ],
      solution: 'β = 0.0024 / 0.0016',
      answer: 'β = 1.5 (50% more volatile than market)'
    },
    hp12c: ['.0024 [ENTER] .0016 [÷] → 1.5'],
    baiiPlus: ['.0024 [÷] .0016 [=] → 1.5'],
    tips: [
      'β = 1: Moves with market',
      'β > 1: More volatile than market',
      'β < 1: Less volatile than market',
      'β < 0: Moves opposite to market (rare)'
    ],
    relatedTopics: ['Systematic Risk', 'CAPM', 'Market Risk']
  },
  {
    id: 'INV-004',
    name: 'Sharpe Ratio',
    category: 'Investment',
    formula: 'Sharpe = (Rp - Rf) / σp',
    variables: [
      { symbol: 'Sharpe', meaning: 'Sharpe Ratio' },
      { symbol: 'Rp', meaning: 'Portfolio return' },
      { symbol: 'Rf', meaning: 'Risk-free rate' },
      { symbol: 'σp', meaning: 'Portfolio standard deviation' }
    ],
    example: {
      problem: 'Portfolio returned 12%, T-bills 3%, portfolio SD is 15%.',
      values: [
        { symbol: 'Rp', value: '12%' },
        { symbol: 'Rf', value: '3%' },
        { symbol: 'σp', value: '15%' }
      ],
      solution: 'Sharpe = (12% - 3%) / 15% = 9% / 15%',
      answer: 'Sharpe = 0.60'
    },
    hp12c: ['12 [ENTER] 3 [-] 15 [÷] → 0.60'],
    baiiPlus: ['( 12 [-] 3 ) [÷] 15 [=] → 0.60'],
    tips: [
      'Higher is better (more return per unit of risk)',
      'Sharpe > 1 is considered good',
      'Uses total risk (standard deviation)',
      'Compare portfolios with similar time periods'
    ],
    relatedTopics: ['Risk-Adjusted Return', 'Portfolio Comparison', 'Performance']
  },
  {
    id: 'INV-005',
    name: 'CAPM (Expected Return)',
    category: 'Investment',
    formula: 'E(R) = Rf + β × (Rm - Rf)',
    variables: [
      { symbol: 'E(R)', meaning: 'Expected return' },
      { symbol: 'Rf', meaning: 'Risk-free rate' },
      { symbol: 'β', meaning: 'Beta of security' },
      { symbol: 'Rm', meaning: 'Expected market return' },
      { symbol: '(Rm - Rf)', meaning: 'Market risk premium' }
    ],
    example: {
      problem: 'Risk-free 3%, expected market 10%, stock beta 1.2. What is expected return?',
      values: [
        { symbol: 'Rf', value: '3%' },
        { symbol: 'Rm', value: '10%' },
        { symbol: 'β', value: '1.2' }
      ],
      solution: 'E(R) = 3% + 1.2 × (10% - 3%) = 3% + 1.2 × 7%',
      answer: '11.4%'
    },
    hp12c: ['10 [ENTER] 3 [-] 1.2 [×] 3 [+] → 11.4'],
    baiiPlus: ['( 10 [-] 3 ) [×] 1.2 [+] 3 [=] → 11.4'],
    tips: [
      'Core model for required return based on systematic risk',
      'Market risk premium typically assumed at 5-7%',
      'Used for stock valuation and capital budgeting'
    ],
    relatedTopics: ['Beta', 'Required Return', 'Security Market Line']
  },
  {
    id: 'INV-006',
    name: 'Bond Duration (Macaulay)',
    category: 'Investment',
    formula: 'Duration = Σ[t × PV(CFt)] / Bond Price',
    variables: [
      { symbol: 'Duration', meaning: 'Weighted average time to receive cash flows' },
      { symbol: 't', meaning: 'Time period' },
      { symbol: 'PV(CFt)', meaning: 'Present value of cash flow at time t' }
    ],
    example: {
      problem: '5-year bond, 6% coupon, 5% YTM, $1,000 par. Duration ≈?',
      values: [
        { symbol: 'Coupon', value: '6% ($60/year)' },
        { symbol: 'YTM', value: '5%' },
        { symbol: 'Maturity', value: '5 years' }
      ],
      solution: 'Sum of (year × PV of that year\'s CF) / bond price',
      answer: 'Duration ≈ 4.47 years'
    },
    hp12c: ['Complex - use financial calculator duration function or spreadsheet'],
    baiiPlus: ['[2nd] [BOND] to enter bond data, duration not directly calculated'],
    tips: [
      'Duration approximates % price change for 1% yield change',
      'Zero coupon bond: Duration = Maturity',
      'Higher coupon = Lower duration',
      'Longer maturity = Higher duration'
    ],
    relatedTopics: ['Interest Rate Risk', 'Bond Price Sensitivity', 'Immunization']
  },

  // ============================================
  // Tax Formulas
  // ============================================
  {
    id: 'TAX-001',
    name: 'After-Tax Return',
    category: 'Tax',
    formula: 'After-Tax Return = Pre-Tax Return × (1 - Tax Rate)',
    variables: [
      { symbol: 'After-Tax', meaning: 'Net return after taxes' },
      { symbol: 'Pre-Tax', meaning: 'Gross return before taxes' },
      { symbol: 'Tax Rate', meaning: 'Marginal tax rate on investment income' }
    ],
    example: {
      problem: 'Taxable bond yields 5%. Investor in 32% bracket. After-tax yield?',
      values: [
        { symbol: 'Pre-Tax', value: '5%' },
        { symbol: 'Tax Rate', value: '32%' }
      ],
      solution: 'After-Tax = 5% × (1 - 0.32) = 5% × 0.68',
      answer: '3.4%'
    },
    hp12c: ['5 [ENTER] 1 [ENTER] .32 [-] [×] → 3.4'],
    baiiPlus: ['5 [×] ( 1 [-] .32 ) [=] → 3.4'],
    tips: [
      'Compare taxable vs. tax-exempt bonds',
      'Use marginal rate for additional investments',
      'Consider state taxes in high-tax states'
    ],
    relatedTopics: ['Tax-Equivalent Yield', 'Municipal Bonds', 'Tax Efficiency']
  },
  {
    id: 'TAX-002',
    name: 'Tax-Equivalent Yield',
    category: 'Tax',
    formula: 'TEY = Municipal Yield / (1 - Tax Rate)',
    variables: [
      { symbol: 'TEY', meaning: 'Tax-Equivalent Yield' },
      { symbol: 'Muni Yield', meaning: 'Tax-exempt municipal bond yield' },
      { symbol: 'Tax Rate', meaning: 'Marginal tax rate' }
    ],
    example: {
      problem: 'Muni yields 3.5%. Investor in 35% bracket. Tax-equivalent yield?',
      values: [
        { symbol: 'Muni Yield', value: '3.5%' },
        { symbol: 'Tax Rate', value: '35%' }
      ],
      solution: 'TEY = 3.5% / (1 - 0.35) = 3.5% / 0.65',
      answer: '5.38%'
    },
    hp12c: ['3.5 [ENTER] 1 [ENTER] .35 [-] [÷] → 5.38'],
    baiiPlus: ['3.5 [÷] ( 1 [-] .35 ) [=] → 5.38'],
    tips: [
      'If taxable bond yields < TEY, prefer municipal',
      'Higher tax bracket = more benefit from munis',
      'Include state tax if muni is from your state'
    ],
    relatedTopics: ['Municipal Bonds', 'Tax Planning', 'Fixed Income']
  },
  {
    id: 'TAX-003',
    name: 'Capital Gain/Loss',
    category: 'Tax',
    formula: 'Gain/Loss = Sale Price - Adjusted Basis',
    variables: [
      { symbol: 'Gain/Loss', meaning: 'Taxable gain or deductible loss' },
      { symbol: 'Sale Price', meaning: 'Amount realized (net of commissions)' },
      { symbol: 'Adjusted Basis', meaning: 'Original cost + improvements - depreciation' }
    ],
    example: {
      problem: 'Bought stock for $10,000, sold for $15,000 after 2 years.',
      values: [
        { symbol: 'Sale Price', value: '$15,000' },
        { symbol: 'Adjusted Basis', value: '$10,000' },
        { symbol: 'Holding Period', value: '2 years (LTCG)' }
      ],
      solution: 'Gain = $15,000 - $10,000',
      answer: '$5,000 LTCG (taxed at 0/15/20%)'
    },
    hp12c: ['15000 [ENTER] 10000 [-] → 5,000'],
    baiiPlus: ['15000 [-] 10000 [=] → 5,000'],
    tips: [
      'STCG (<1 year): Ordinary income rates',
      'LTCG (>1 year): 0%, 15%, or 20% depending on income',
      'Net losses limited to $3,000/year against ordinary income'
    ],
    relatedTopics: ['Tax-Loss Harvesting', 'Basis', 'Holding Period']
  },

  // ============================================
  // Insurance Formulas
  // ============================================
  {
    id: 'INS-001',
    name: 'Human Life Value',
    category: 'Insurance',
    formula: 'HLV = Annual Earnings × Years to Retirement × Adjustment Factor',
    variables: [
      { symbol: 'HLV', meaning: 'Human Life Value' },
      { symbol: 'Earnings', meaning: 'Annual income' },
      { symbol: 'Years', meaning: 'Working years remaining' },
      { symbol: 'Factor', meaning: 'Adjustment for growth, inflation, consumption' }
    ],
    example: {
      problem: '$100,000 salary, 30 years to retirement, using present value approach at 5%',
      values: [
        { symbol: 'Earnings', value: '$100,000' },
        { symbol: 'Years', value: '30' },
        { symbol: 'Rate', value: '5%' }
      ],
      solution: 'PV of annuity: $100,000 × PV factor for 30 years at 5%',
      answer: 'Approximately $1,537,245'
    },
    hp12c: [
      '100000 [PMT]',
      '5 [i]',
      '30 [n]',
      '0 [FV]',
      '[PV] → -1,537,245'
    ],
    baiiPlus: [
      '100000 [PMT]',
      '5 [I/Y]',
      '30 [N]',
      '0 [FV]',
      '[CPT] [PV] → -1,537,245'
    ],
    tips: [
      'Adjust for taxes (use after-tax income)',
      'Subtract personal consumption (30-40%)',
      'Add value of benefits, future raises',
      'Consider inflation adjustment'
    ],
    relatedTopics: ['Life Insurance Needs', 'Income Replacement', 'Survivor Needs']
  },
  {
    id: 'INS-002',
    name: 'Coinsurance Penalty',
    category: 'Insurance',
    formula: 'Payment = (Coverage / Required Coverage) × Loss - Deductible',
    variables: [
      { symbol: 'Payment', meaning: 'Amount insurance will pay' },
      { symbol: 'Coverage', meaning: 'Actual insurance carried' },
      { symbol: 'Required', meaning: 'Coinsurance % × Property Value' },
      { symbol: 'Loss', meaning: 'Amount of damage' }
    ],
    example: {
      problem: '$500,000 building, 80% coinsurance, only $300,000 coverage. $100,000 loss.',
      values: [
        { symbol: 'Property Value', value: '$500,000' },
        { symbol: 'Required (80%)', value: '$400,000' },
        { symbol: 'Actual Coverage', value: '$300,000' },
        { symbol: 'Loss', value: '$100,000' }
      ],
      solution: 'Payment = ($300,000 / $400,000) × $100,000 = 75% × $100,000',
      answer: '$75,000 (insured pays $25,000)'
    },
    hp12c: ['300000 [ENTER] 400000 [÷] 100000 [×] → 75,000'],
    baiiPlus: ['300000 [÷] 400000 [×] 100000 [=] → 75,000'],
    tips: [
      'Coinsurance penalizes underinsurance',
      'Must carry at least 80% (or stated %) of value',
      'Applies to commercial property, not homeowners'
    ],
    relatedTopics: ['Property Insurance', 'Commercial Coverage', 'Valuation']
  },

  // ============================================
  // Ratios
  // ============================================
  {
    id: 'RAT-001',
    name: 'Emergency Fund Ratio',
    category: 'Ratios',
    formula: 'Emergency Ratio = Liquid Assets / Monthly Expenses',
    variables: [
      { symbol: 'Ratio', meaning: 'Number of months of expenses covered' },
      { symbol: 'Liquid Assets', meaning: 'Cash, savings, money market' },
      { symbol: 'Monthly Expenses', meaning: 'Regular monthly spending' }
    ],
    example: {
      problem: 'Client has $24,000 in savings, $4,000/month expenses.',
      values: [
        { symbol: 'Liquid Assets', value: '$24,000' },
        { symbol: 'Monthly Expenses', value: '$4,000' }
      ],
      solution: 'Ratio = $24,000 / $4,000',
      answer: '6 months (meets 3-6 month guideline)'
    },
    hp12c: ['24000 [ENTER] 4000 [÷] → 6'],
    baiiPlus: ['24000 [÷] 4000 [=] → 6'],
    tips: [
      'Target: 3-6 months for stable income',
      'Target: 6-12 months for variable income',
      'Exclude retirement accounts from liquid assets'
    ],
    relatedTopics: ['Emergency Fund', 'Liquidity', 'Cash Reserves']
  },
  {
    id: 'RAT-002',
    name: 'Debt-to-Income Ratio (Housing)',
    category: 'Ratios',
    formula: 'Housing Ratio = PITI / Gross Monthly Income',
    variables: [
      { symbol: 'Housing Ratio', meaning: 'Front-end ratio' },
      { symbol: 'PITI', meaning: 'Principal, Interest, Taxes, Insurance' },
      { symbol: 'Gross Income', meaning: 'Monthly income before taxes' }
    ],
    example: {
      problem: 'Monthly income $10,000. PITI payment $2,500.',
      values: [
        { symbol: 'PITI', value: '$2,500' },
        { symbol: 'Gross Income', value: '$10,000' }
      ],
      solution: 'Ratio = $2,500 / $10,000',
      answer: '25% (meets ≤28% guideline)'
    },
    hp12c: ['2500 [ENTER] 10000 [÷] → 0.25'],
    baiiPlus: ['2500 [÷] 10000 [=] → 0.25'],
    tips: [
      'Conventional guideline: ≤28%',
      'FHA allows up to 31%',
      'Combined with back-end ratio for qualification'
    ],
    relatedTopics: ['Mortgage Qualification', 'Debt Management', 'Housing']
  },
  {
    id: 'RAT-003',
    name: 'Total Debt-to-Income Ratio',
    category: 'Ratios',
    formula: 'Total Ratio = (PITI + All Debt Payments) / Gross Monthly Income',
    variables: [
      { symbol: 'Total Ratio', meaning: 'Back-end ratio' },
      { symbol: 'PITI', meaning: 'Housing payment' },
      { symbol: 'All Debt', meaning: 'Car, student loans, credit cards, etc.' },
      { symbol: 'Gross Income', meaning: 'Monthly income before taxes' }
    ],
    example: {
      problem: 'Income $10,000. PITI $2,500, car $400, student loans $300.',
      values: [
        { symbol: 'Total Debt', value: '$3,200' },
        { symbol: 'Gross Income', value: '$10,000' }
      ],
      solution: 'Ratio = $3,200 / $10,000',
      answer: '32% (meets ≤36% guideline)'
    },
    hp12c: ['3200 [ENTER] 10000 [÷] → 0.32'],
    baiiPlus: ['3200 [÷] 10000 [=] → 0.32'],
    tips: [
      'Conventional guideline: ≤36%',
      'FHA allows up to 43%',
      'Higher ratios may require compensating factors'
    ],
    relatedTopics: ['Mortgage Qualification', 'Debt Ratios', 'Credit']
  },
  {
    id: 'RAT-004',
    name: 'Savings Rate',
    category: 'Ratios',
    formula: 'Savings Rate = Total Savings / Gross Income',
    variables: [
      { symbol: 'Savings Rate', meaning: 'Percentage of income saved' },
      { symbol: 'Total Savings', meaning: 'All savings: 401k, IRA, taxable, etc.' },
      { symbol: 'Gross Income', meaning: 'Total income before taxes' }
    ],
    example: {
      problem: '$150,000 income. Saves $20,000 to 401(k), $6,000 IRA, $4,000 taxable.',
      values: [
        { symbol: 'Total Savings', value: '$30,000' },
        { symbol: 'Gross Income', value: '$150,000' }
      ],
      solution: 'Rate = $30,000 / $150,000',
      answer: '20% (exceeds 15% target)'
    },
    hp12c: ['30000 [ENTER] 150000 [÷] → 0.20'],
    baiiPlus: ['30000 [÷] 150000 [=] → 0.20'],
    tips: [
      'Target: 15-20% for adequate retirement',
      'Include employer match in calculations',
      'Higher rate needed if starting late'
    ],
    relatedTopics: ['Retirement Planning', 'Cash Flow', 'Financial Health']
  }
];

export const FORMULA_CATEGORIES: { id: FormulaCategory; name: string; icon: string }[] = [
  { id: 'TVM', name: 'Time Value of Money', icon: '⏱️' },
  { id: 'Retirement', name: 'Retirement Planning', icon: '🏖️' },
  { id: 'Investment', name: 'Investment Analysis', icon: '📈' },
  { id: 'Tax', name: 'Tax Planning', icon: '📋' },
  { id: 'Insurance', name: 'Risk Management', icon: '🛡️' },
  { id: 'Estate', name: 'Estate Planning', icon: '🏛️' },
  { id: 'Ratios', name: 'Financial Ratios', icon: '📊' }
];

export default CFP_FORMULAS;
