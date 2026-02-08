/**
 * CFP Investment Questions - Batch 8
 * Domain 4: Investment Planning (17% of exam)
 * 25 additional questions covering advanced investment topics
 */

import { Question } from '../../../types';

export const CFP_INVESTMENTS_BATCH8_QUESTIONS: Question[] = [
  // INV-1: Investment Theory
  {
    id: 'CFP-INV-B8-001',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Efficient Frontier',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A portfolio on the efficient frontier:',
    options: [
      'A) Has the lowest possible risk',
      'B) Offers the highest expected return for a given level of risk, or lowest risk for a given return',
      'C) Contains only stocks',
      'D) Is always the optimal choice for all investors'
    ],
    correctAnswer: 1,
    explanation: 'The efficient frontier represents portfolios with optimal risk-return trade-offs. Moving along it requires accepting more risk for more return. Portfolios below the frontier are suboptimal (higher risk for same return). The specific point chosen depends on investor risk tolerance.'
  },
  {
    id: 'CFP-INV-B8-002',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Information Ratio',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The Information Ratio measures:',
    options: [
      'A) Total portfolio return',
      'B) Active return (alpha) divided by tracking error, indicating skill-adjusted performance relative to benchmark',
      'C) Portfolio volatility',
      'D) Interest rate sensitivity'
    ],
    correctAnswer: 1,
    explanation: 'Information Ratio = Alpha ÷ Tracking Error. It measures how consistently a manager generates excess returns relative to their benchmark. Higher is better—it shows more return per unit of active risk taken. Useful for evaluating active managers.'
  },
  {
    id: 'CFP-INV-B8-003',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Factor Investing',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Factor investing focuses on:',
    options: [
      'A) Randomly selecting stocks',
      'B) Targeting specific characteristics like value, momentum, quality, or size that have historically driven returns',
      'C) Only government bonds',
      'D) Avoiding diversification'
    ],
    correctAnswer: 1,
    explanation: 'Factor investing targets return drivers beyond market beta. Common factors include value (cheap stocks), momentum (recent winners), quality (profitable companies), and size (small caps). Factors can be combined in multi-factor strategies. Smart beta ETFs often implement factor tilts.'
  },
  // INV-2: Asset Classes
  {
    id: 'CFP-INV-B8-004',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Municipal Bond Yield',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A municipal bond yields 3.5%. For an investor in the 32% federal tax bracket, the taxable equivalent yield is approximately:',
    options: [
      'A) 3.5%',
      'B) 5.15%',
      'C) 4.62%',
      'D) 2.38%'
    ],
    correctAnswer: 1,
    explanation: 'Taxable Equivalent Yield = Tax-Free Yield ÷ (1 - Tax Rate) = 3.5% ÷ (1 - 0.32) = 3.5% ÷ 0.68 = 5.15%. This helps compare munis to taxable bonds. The higher the tax bracket, the more attractive municipal bonds become.'
  },
  {
    id: 'CFP-INV-B8-005',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Floating Rate Notes',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Floating rate notes (FRNs) have:',
    options: [
      'A) Fixed interest payments',
      'B) Interest payments that adjust periodically based on a reference rate, reducing interest rate risk',
      'C) No credit risk',
      'D) Longer durations than fixed-rate bonds'
    ],
    correctAnswer: 1,
    explanation: 'FRNs have coupons tied to reference rates (like SOFR) plus a spread. As rates rise, coupons increase, keeping prices stable. This gives them very low duration (interest rate sensitivity). They maintain credit risk based on issuer quality but hedge rate risk.'
  },
  {
    id: 'CFP-INV-B8-006',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Equities',
    subtopic: 'Dividend Yield vs Total Return',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Total return on a stock includes:',
    options: [
      'A) Only price appreciation',
      'B) Both price appreciation and dividend income',
      'C) Only dividends',
      'D) Only capital gains distributions'
    ],
    correctAnswer: 1,
    explanation: 'Total return = Capital Appreciation + Dividend Yield. Focusing only on price changes ignores income—historically about 40% of equity returns have come from dividends. Total return is the appropriate measure for evaluating investment performance.'
  },
  // INV-3: Portfolio Construction
  {
    id: 'CFP-INV-B8-007',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Construction',
    subtopic: 'Core-Satellite',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A core-satellite portfolio strategy:',
    options: [
      'A) Uses only active management',
      'B) Combines passive core holdings for market exposure with active satellite positions for alpha potential',
      'C) Invests only in large caps',
      'D) Eliminates diversification'
    ],
    correctAnswer: 1,
    explanation: 'Core-satellite uses low-cost index funds for the "core" (broad market exposure) and active or specialized investments for "satellites" (seeking alpha in smaller allocations). This balances cost efficiency with potential outperformance while maintaining overall portfolio discipline.'
  },
  {
    id: 'CFP-INV-B8-008',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Construction',
    subtopic: 'Rebalancing',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'The primary purpose of portfolio rebalancing is to:',
    options: [
      'A) Maximize returns',
      'B) Maintain target risk levels by selling appreciated assets and buying underperformers',
      'C) Time the market',
      'D) Minimize taxes'
    ],
    correctAnswer: 1,
    explanation: 'Rebalancing restores target allocations after market movements change portfolio composition. Without rebalancing, portfolios drift toward riskier assets during bull markets. It enforces buy-low/sell-high discipline. Frequency involves trade-offs between precision and transaction costs/taxes.'
  },
  {
    id: 'CFP-INV-B8-009',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Construction',
    subtopic: 'Tax-Loss Harvesting',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When implementing tax-loss harvesting, the wash sale rule:',
    options: [
      'A) Allows immediate repurchase of identical securities',
      'B) Disallows the loss deduction if substantially identical securities are purchased within 30 days before or after the sale',
      'C) Only applies to gains',
      'D) Does not apply to ETFs'
    ],
    correctAnswer: 1,
    explanation: 'The wash sale rule prevents claiming losses when repurchasing substantially identical securities within the 61-day window (30 days before through 30 days after). The disallowed loss is added to the new position\'s basis. Investors often use similar (but not identical) funds to maintain exposure while harvesting.'
  },
  // INV-4: Analysis
  {
    id: 'CFP-INV-B8-010',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Security Analysis',
    subtopic: 'PEG Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The PEG ratio (Price/Earnings to Growth) is calculated by:',
    options: [
      'A) P/E ratio × Growth rate',
      'B) P/E ratio ÷ Earnings growth rate, with lower values suggesting better value relative to growth',
      'C) Price ÷ Earnings growth',
      'D) Growth rate ÷ P/E ratio'
    ],
    correctAnswer: 1,
    explanation: 'PEG = (P/E Ratio) ÷ (Earnings Growth Rate). A stock with P/E of 20 and 20% growth has PEG of 1.0. PEG below 1 may suggest undervaluation relative to growth; above 1 may indicate overvaluation. It adjusts for the fact that high-growth stocks deserve higher P/E ratios.'
  },
  {
    id: 'CFP-INV-B8-011',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Security Analysis',
    subtopic: 'Dividend Discount Model',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Using the constant growth dividend discount model, a stock paying a $2 dividend, growing at 5%, with a required return of 10% is worth:',
    options: [
      'A) $20',
      'B) $40',
      'C) $42',
      'D) $50'
    ],
    correctAnswer: 2,
    explanation: 'Gordon Growth Model: Value = D₁ ÷ (r - g) = D₀(1+g) ÷ (r - g) = $2(1.05) ÷ (0.10 - 0.05) = $2.10 ÷ 0.05 = $42. The model requires growth rate less than required return and assumes constant perpetual growth.'
  },
  {
    id: 'CFP-INV-B8-012',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Security Analysis',
    subtopic: 'Free Cash Flow',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Free cash flow (FCF) represents:',
    options: [
      'A) Revenue minus expenses',
      'B) Cash generated after operating expenses and capital expenditures, available for distribution or reinvestment',
      'C) Total cash on the balance sheet',
      'D) Net income only'
    ],
    correctAnswer: 1,
    explanation: 'FCF = Operating Cash Flow - Capital Expenditures. It represents discretionary cash available for dividends, debt repayment, share buybacks, or reinvestment. Strong FCF indicates financial flexibility. It\'s often preferred over earnings because it\'s harder to manipulate.'
  },
  // INV-5: Risk Management
  {
    id: 'CFP-INV-B8-013',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Risk Management',
    subtopic: 'Downside Capture',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A fund with a downside capture ratio of 70% means:',
    options: [
      'A) It loses 70% in down markets',
      'B) When the benchmark declines, the fund captures only 70% of the loss on average',
      'C) It has 70% of its assets in defensive stocks',
      'D) Downside risk is eliminated 70% of the time'
    ],
    correctAnswer: 1,
    explanation: 'Downside capture below 100% indicates the fund loses less than the benchmark in down markets (defensive). A 70% downside capture means if the benchmark loses 10%, the fund loses only 7% on average. Combined with upside capture, it shows asymmetric performance characteristics.'
  },
  {
    id: 'CFP-INV-B8-014',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Risk Management',
    subtopic: 'Maximum Drawdown',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Maximum drawdown measures:',
    options: [
      'A) Average annual losses',
      'B) The largest peak-to-trough decline in portfolio value over a period',
      'C) Standard deviation',
      'D) Beta'
    ],
    correctAnswer: 1,
    explanation: 'Maximum drawdown is the worst decline from a peak to subsequent trough before a new peak is reached. It captures the worst-case experience an investor would have faced. For example, -50% drawdown means the portfolio lost half its value at the worst point.'
  },
  {
    id: 'CFP-INV-B8-015',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Risk Management',
    subtopic: 'Conditional VaR',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Conditional Value at Risk (CVaR), also called Expected Shortfall:',
    options: [
      'A) Is the same as VaR',
      'B) Measures the expected loss given that the VaR threshold has been exceeded',
      'C) Ignores tail risk',
      'D) Only applies to options'
    ],
    correctAnswer: 1,
    explanation: 'CVaR (Expected Shortfall) answers "If we exceed VaR, how bad could it get?" While 95% VaR might be -5%, CVaR asks what the average loss is in that worst 5% of cases. It captures tail risk better than VaR alone. For example, CVaR might show expected loss of -8% when VaR is breached.'
  },
  // Additional Topics
  {
    id: 'CFP-INV-B8-016',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Behavioral Finance',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The disposition effect causes investors to:',
    options: [
      'A) Buy only index funds',
      'B) Sell winners too early and hold losers too long to avoid realizing losses',
      'C) Take excessive risks',
      'D) Over-diversify'
    ],
    correctAnswer: 1,
    explanation: 'The disposition effect is the tendency to sell appreciated investments quickly (locking in gains) while holding losing positions (hoping to avoid realizing losses). This is tax-inefficient (realizing gains triggers taxes, losses create deductions) and can hurt returns by cutting winners and riding losers.'
  },
  {
    id: 'CFP-INV-B8-017',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Alternative Investments',
    subtopic: 'Hedge Fund Strategies',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A long/short equity hedge fund:',
    options: [
      'A) Only buys stocks',
      'B) Takes both long positions (expecting appreciation) and short positions (expecting decline) to profit from stock selection in either direction',
      'C) Invests only in bonds',
      'D) Uses no leverage'
    ],
    correctAnswer: 1,
    explanation: 'Long/short funds buy undervalued stocks and short overvalued ones. This can profit in any market direction from the manager\'s stock-picking skill. Net exposure (longs minus shorts) can vary. The approach aims to generate alpha while reducing market risk compared to long-only strategies.'
  },
  {
    id: 'CFP-INV-B8-018',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Construction',
    subtopic: 'Target Date Funds',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Target date funds are designed to:',
    options: [
      'A) Guarantee returns by the target date',
      'B) Automatically shift from aggressive to conservative allocations as the target retirement date approaches',
      'C) Provide fixed income only',
      'D) Avoid international investments'
    ],
    correctAnswer: 1,
    explanation: 'Target date funds use a "glide path" that starts equity-heavy and gradually shifts toward bonds/cash as retirement approaches. They provide automatic rebalancing and risk adjustment, making them simple "set and forget" options. The allocation at retirement and beyond (the "landing point") varies by provider.'
  },
  {
    id: 'CFP-INV-B8-019',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Security Analysis',
    subtopic: 'EBITDA',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is useful for:',
    options: [
      'A) Calculating taxes owed',
      'B) Comparing profitability across companies with different capital structures and accounting policies',
      'C) Measuring cash on hand',
      'D) Determining dividend payments'
    ],
    correctAnswer: 1,
    explanation: 'EBITDA strips out financing decisions (interest), tax situations (which vary), and non-cash charges (depreciation/amortization). This allows comparison of operating profitability across companies regardless of debt levels or accounting choices. However, it ignores real capital needs and shouldn\'t replace cash flow analysis.'
  },
  {
    id: 'CFP-INV-B8-020',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Risk Management',
    subtopic: 'Currency Hedging',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Currency hedging in international investing:',
    options: [
      'A) Eliminates all foreign investment risk',
      'B) Reduces or eliminates exchange rate fluctuations that can affect returns from foreign investments',
      'C) Guarantees higher returns',
      'D) Is only used for emerging markets'
    ],
    correctAnswer: 1,
    explanation: 'Currency hedging uses forwards or futures to neutralize exchange rate movements. A U.S. investor owning European stocks would otherwise see returns affected by EUR/USD changes. Hedging focuses returns on the underlying investments. Whether to hedge is a strategic choice—currencies can hurt or help returns.'
  },
  {
    id: 'CFP-INV-B8-021',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Arbitrage Pricing Theory',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Arbitrage Pricing Theory (APT) differs from CAPM in that:',
    options: [
      'A) APT uses only one factor (market risk)',
      'B) APT allows multiple risk factors beyond market beta to explain returns',
      'C) APT doesn\'t consider risk',
      'D) CAPM is more complex'
    ],
    correctAnswer: 1,
    explanation: 'APT uses multiple factors (like inflation, industrial production, interest rates) rather than CAPM\'s single market factor. It doesn\'t specify which factors—they\'re empirically determined. APT is more flexible but less prescriptive than CAPM. Factor models bridge the two approaches.'
  },
  {
    id: 'CFP-INV-B8-022',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'TIPS',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Treasury Inflation-Protected Securities (TIPS) provide:',
    options: [
      'A) Fixed nominal payments',
      'B) Principal that adjusts with CPI, providing protection against inflation while maintaining Treasury credit quality',
      'C) No interest payments',
      'D) Negative real returns always'
    ],
    correctAnswer: 1,
    explanation: 'TIPS adjust principal semi-annually based on CPI changes. Interest payments are calculated on the adjusted principal, so both principal and income keep pace with inflation. This provides real return certainty (current yield minus expected inflation). At maturity, you receive the greater of adjusted or original principal.'
  },
  {
    id: 'CFP-INV-B8-023',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Construction',
    subtopic: 'Dollar-Cost Averaging',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Dollar-cost averaging involves:',
    options: [
      'A) Investing a lump sum immediately',
      'B) Investing fixed amounts at regular intervals, buying more shares when prices are low and fewer when high',
      'C) Only buying at market lows',
      'D) Timing the market'
    ],
    correctAnswer: 1,
    explanation: 'DCA spreads purchases over time with fixed dollar amounts, naturally buying more shares at lower prices. It reduces timing risk and provides psychological comfort. While lump-sum investing historically outperforms (more time in market), DCA suits regular payroll investing and reduces regret risk.'
  },
  {
    id: 'CFP-INV-B8-024',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Security Analysis',
    subtopic: 'Debt-to-Equity Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company with a debt-to-equity ratio of 1.5:',
    options: [
      'A) Has no debt',
      'B) Has $1.50 of debt for every $1.00 of equity, indicating significant leverage',
      'C) Is underleveraged',
      'D) Has equal debt and equity'
    ],
    correctAnswer: 1,
    explanation: 'D/E of 1.5 means 60% debt financing, 40% equity (debt is 1.5× equity). Higher D/E increases financial risk—interest must be paid regardless of earnings. Appropriate leverage varies by industry. Utilities often have high D/E (stable cash flows); tech companies often lower D/E.'
  },
  {
    id: 'CFP-INV-B8-025',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Risk Management',
    subtopic: 'Fixed Income Duration',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A bond portfolio with duration of 7 years will:',
    options: [
      'A) Mature in 7 years',
      'B) Decline approximately 7% in value if interest rates rise 1%',
      'C) Always outperform shorter duration bonds',
      'D) Have no interest rate risk'
    ],
    correctAnswer: 1,
    explanation: 'Duration estimates price sensitivity to rate changes. A duration of 7 means approximately 7% price change for each 1% rate change (inverse relationship). If rates rise 1%, prices fall ≈7%; if rates fall 1%, prices rise ≈7%. Longer duration = more interest rate risk but often higher yields.'
  }
];
