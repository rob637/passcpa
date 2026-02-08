/**
 * CFP Investment Planning Questions - Batch 4
 * Focus on INV-4 (Derivatives/Alternatives) and INV-5 (Performance/Tax) - undertested areas
 * Adding 25 questions to improve coverage
 */

import { Question } from '../../../types';

export const CFP_INVESTMENTS_BATCH4_QUESTIONS: Question[] = [
  // INV-4: Derivatives & Alternative Investments
  {
    id: 'CFP-INV-B4-001',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Options Basics',
    subtopic: 'Call Options',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A call option gives the holder the right to:',
    options: [
      'A) Sell the underlying asset at the strike price',
      'B) Buy the underlying asset at the strike price',
      'C) Receive dividends from the underlying stock',
      'D) Exchange one security for another'
    ],
    correctAnswer: 1,
    explanation: 'A call option gives the holder (buyer) the RIGHT to BUY the underlying asset at the strike price on or before expiration. The call seller (writer) has the OBLIGATION to sell if the option is exercised. Puts give the right to sell.'
  },
  {
    id: 'CFP-INV-B4-002',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Options Strategies',
    subtopic: 'Covered Calls',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An investor owns 100 shares of XYZ at $50 and writes a covered call with a $55 strike for $3 premium. What is the maximum profit?',
    options: [
      'A) $300',
      'B) $500',
      'C) $800',
      'D) Unlimited'
    ],
    correctAnswer: 2,
    explanation: 'Maximum profit = stock appreciation to strike + premium = ($55 - $50) × 100 + $300 = $500 + $300 = $800. Above $55, the stock is called away. The call writer sacrifices unlimited upside for immediate premium income.'
  },
  {
    id: 'CFP-INV-B4-003',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Options Strategies',
    subtopic: 'Protective Puts',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'What is the strategic purpose of a protective put?',
    options: [
      'A) Generate income from an existing position',
      'B) Speculate on price decline',
      'C) Limit downside risk while preserving upside potential',
      'D) Create a leveraged long position'
    ],
    correctAnswer: 2,
    explanation: 'A protective put (put + stock) acts as portfolio insurance. The put limits losses below the strike price while allowing unlimited upside (minus the premium cost). It\'s the opposite of covered calls, which generate income but cap upside.'
  },
  {
    id: 'CFP-INV-B4-004',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Options Valuation',
    subtopic: 'Time Value',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A $100 stock has an $95 call trading at $12. What is the time value of the option?',
    options: [
      'A) $5',
      'B) $7',
      'C) $12',
      'D) $0'
    ],
    correctAnswer: 1,
    explanation: 'Option value = intrinsic value + time value. Intrinsic value of the call = MAX(stock price - strike, 0) = MAX($100 - $95, 0) = $5. Premium = $12. Time value = $12 - $5 = $7. Time value decays as expiration approaches (theta decay).'
  },
  {
    id: 'CFP-INV-B4-005',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Futures Contracts',
    subtopic: 'Margin Requirements',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'How does margin in futures differ from margin in equities?',
    options: [
      'A) Futures margin is a loan; equity margin is a deposit',
      'B) Futures margin is a performance bond; equity margin is a partial payment',
      'C) Futures margin is always higher than equity margin',
      'D) There is no margin in futures trading'
    ],
    correctAnswer: 1,
    explanation: 'Futures margin is a good-faith deposit (performance bond) to ensure both parties perform, typically 5-15% of contract value. Equity margin is a partial payment (loan) where the broker lends money to buy securities—typically 50% initial margin under Regulation T.'
  },
  {
    id: 'CFP-INV-B4-006',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Hedge Funds',
    subtopic: 'Fee Structure',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'What is the typical "2 and 20" fee structure in hedge funds?',
    options: [
      'A) 2% entry fee and 20% exit fee',
      'B) 2% management fee and 20% performance fee',
      'C) 2% annual fee paid quarterly, 20% paid annually',
      'D) 2% of gains, 20% of assets'
    ],
    correctAnswer: 1,
    explanation: '"2 and 20" refers to a 2% annual management fee on assets under management PLUS a 20% performance fee (incentive fee) on profits above a hurdle rate. This fee structure aligns manager incentives with performance but has been criticized for being expensive.'
  },
  {
    id: 'CFP-INV-B4-007',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Private Equity',
    subtopic: 'J-Curve Effect',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'What causes the "J-curve" in private equity fund returns?',
    options: [
      'A) Regulatory requirements for return reporting',
      'B) Early management fees and write-downs before investments mature',
      'C) Tax timing differences',
      'D) Currency fluctuations'
    ],
    correctAnswer: 1,
    explanation: 'The J-curve describes the typical pattern where PE funds show negative returns in early years (due to fees and investment write-downs) before turning positive as investments mature and are realized at gains. Investors must understand this illiquidity pattern.'
  },
  {
    id: 'CFP-INV-B4-008',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Real Estate Investment',
    subtopic: 'REITs',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'What percentage of income must a REIT distribute to shareholders to maintain its tax-advantaged status?',
    options: [
      'A) 50%',
      'B) 75%',
      'C) 90%',
      'D) 100%'
    ],
    correctAnswer: 2,
    explanation: 'REITs must distribute at least 90% of taxable income to shareholders annually to avoid corporate-level taxation. Most REITs distribute close to 100%. Dividends are generally taxed as ordinary income (qualified dividend treatment does not apply).'
  },
  {
    id: 'CFP-INV-B4-009',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Commodities',
    subtopic: 'Contango vs Backwardation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A commodity futures market is in "contango" when:',
    options: [
      'A) Spot prices exceed futures prices',
      'B) Futures prices exceed spot prices',
      'C) Prices are stable over time',
      'D) Supply exceeds demand'
    ],
    correctAnswer: 1,
    explanation: 'Contango occurs when futures prices are higher than spot prices (upward-sloping curve), typically due to storage costs. Backwardation is the opposite (downward-sloping). Contango creates negative "roll yield" for long futures investors who must sell low and buy high when rolling contracts.'
  },
  {
    id: 'CFP-INV-B4-010',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Options Greeks',
    subtopic: 'Delta',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'An at-the-money call option typically has a delta of approximately:',
    options: [
      'A) 0',
      'B) 0.25',
      'C) 0.50',
      'D) 1.00'
    ],
    correctAnswer: 2,
    explanation: 'Delta measures the option price change per $1 change in the underlying. At-the-money calls have delta near 0.50 (50% chance of expiring in-the-money). Deep in-the-money → delta approaches 1.0. Deep out-of-the-money → delta approaches 0.'
  },
  {
    id: 'CFP-INV-B4-011',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Alternative Investments',
    subtopic: 'Accredited Investor',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which qualifies as an accredited investor under SEC rules?',
    options: [
      'A) Income over $100,000 for each of the past two years',
      'B) Net worth over $1 million excluding primary residence',
      'C) Net worth over $1 million including primary residence',
      'D) 5 years of investment experience'
    ],
    correctAnswer: 1,
    explanation: 'Accredited investor status requires: (1) income over $200,000 annually ($300,000 joint) for past 2 years with expectation of same, OR (2) net worth over $1 million excluding primary residence. Recent changes added professional certifications (Series 65, etc.) as qualification pathways.'
  },
  {
    id: 'CFP-INV-B4-012',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Structured Products',
    subtopic: 'Principal Protected Notes',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'What is the primary risk of a principal-protected note (PPN)?',
    options: [
      'A) Market risk from the reference asset',
      'B) Credit risk of the issuing institution',
      'C) Interest rate risk',
      'D) Currency risk'
    ],
    correctAnswer: 1,
    explanation: 'PPNs promise return of principal, but this guarantee is only as good as the issuer. Investors bear credit risk of the issuing bank. During the 2008 crisis, Lehman Brothers PPNs became worthless despite "principal protection." There is also opportunity cost and complexity risk.'
  },
  // INV-5: Investment Performance & Tax Efficiency
  {
    id: 'CFP-INV-B4-013',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Performance Measurement',
    subtopic: 'Time-Weighted Return',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Why is time-weighted return (TWR) preferred for evaluating investment manager performance?',
    options: [
      'A) It is simpler to calculate than dollar-weighted return',
      'B) It eliminates the impact of cash flows controlled by the investor',
      'C) It always produces higher returns',
      'D) It is required by the IRS'
    ],
    correctAnswer: 1,
    explanation: 'TWR removes the effect of external cash flows (deposits/withdrawals) that the manager does not control. This allows fair comparison between managers. Dollar-weighted return (IRR) reflects the investor\'s experience but is affected by timing of cash flows.'
  },
  {
    id: 'CFP-INV-B4-014',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Risk-Adjusted Performance',
    subtopic: 'Sharpe Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A portfolio has a return of 12%, risk-free rate is 2%, and standard deviation is 20%. What is the Sharpe ratio?',
    options: [
      'A) 0.10',
      'B) 0.50',
      'C) 0.60',
      'D) 1.00'
    ],
    correctAnswer: 1,
    explanation: 'Sharpe ratio = (Portfolio return - Risk-free rate) / Standard deviation = (12% - 2%) / 20% = 10% / 20% = 0.50. Higher Sharpe ratios indicate better risk-adjusted returns. A Sharpe ratio over 1.0 is generally considered good.'
  },
  {
    id: 'CFP-INV-B4-015',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Risk-Adjusted Performance',
    subtopic: 'Treynor Ratio',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The Treynor ratio differs from the Sharpe ratio by using which risk measure?',
    options: [
      'A) Standard deviation',
      'B) Beta (systematic risk)',
      'C) Semi-variance',
      'D) Maximum drawdown'
    ],
    correctAnswer: 1,
    explanation: 'Treynor ratio = (Return - Rf) / Beta. It uses beta (systematic risk) rather than standard deviation (total risk). Treynor is appropriate for well-diversified portfolios where unsystematic risk has been eliminated, leaving only market risk.'
  },
  {
    id: 'CFP-INV-B4-016',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Alpha',
    subtopic: 'Jensen\'s Alpha',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A portfolio with beta of 1.2, actual return of 15%, when the risk-free rate is 3% and market return is 10%, has an alpha of:',
    options: [
      'A) 0%',
      'B) 2%',
      'C) 3.6%',
      'D) 5%'
    ],
    correctAnswer: 2,
    explanation: 'Jensen\'s Alpha = Actual Return - [Rf + β(Rm - Rf)] = 15% - [3% + 1.2(10% - 3%)] = 15% - [3% + 8.4%] = 15% - 11.4% = 3.6%. Positive alpha indicates outperformance relative to CAPM-expected return.'
  },
  {
    id: 'CFP-INV-B4-017',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Tax-Loss Harvesting',
    subtopic: 'Strategy Benefits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'What is the primary benefit of tax-loss harvesting?',
    options: [
      'A) Eliminating investment losses permanently',
      'B) Converting ordinary income to capital gains',
      'C) Deferring capital gains taxes through loss offsets',
      'D) Increasing investment returns before tax'
    ],
    correctAnswer: 2,
    explanation: 'Tax-loss harvesting realizes losses to offset current gains, deferring taxes. The investor maintains market exposure by purchasing similar (not identical) securities. While losses are eventually recaptured through lower basis, deferral has time-value benefits.'
  },
  {
    id: 'CFP-INV-B4-018',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Asset Location',
    subtopic: 'Tax-Efficient Placement',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'Which asset type is generally BEST held in a taxable account rather than a tax-advantaged account?',
    options: [
      'A) High-turnover actively managed funds',
      'B) REITs',
      'C) Tax-managed index funds',
      'D) Taxable bonds'
    ],
    correctAnswer: 2,
    explanation: 'Tax-managed index funds are designed for taxable accounts—low turnover, tax-loss harvesting, avoiding short-term gains. Tax-inefficient assets (high turnover funds, REITs, taxable bonds) should go in tax-advantaged accounts where gains and dividends are sheltered.'
  },
  {
    id: 'CFP-INV-B4-019',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Benchmark Selection',
    subtopic: 'Appropriate Benchmarks',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'What is the most appropriate benchmark for a small-cap value fund?',
    options: [
      'A) S&P 500',
      'B) Russell 2000 Value',
      'C) MSCI EAFE',
      'D) Barclays Aggregate Bond Index'
    ],
    correctAnswer: 1,
    explanation: 'Benchmarks should match the investment\'s style and market cap. Russell 2000 Value tracks small-cap value stocks, matching the fund\'s strategy. S&P 500 is large-cap blend, MSCI EAFE is international developed, Barclays Aggregate is bonds—all inappropriate comparisons.'
  },
  {
    id: 'CFP-INV-B4-020',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Information Ratio',
    subtopic: 'Active Management Skill',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The information ratio measures:',
    options: [
      'A) Absolute return relative to cash',
      'B) Return per unit of total risk',
      'C) Active return relative to tracking error',
      'D) Return relative to maximum drawdown'
    ],
    correctAnswer: 2,
    explanation: 'Information Ratio = (Portfolio Return - Benchmark Return) / Tracking Error. It measures active return per unit of active risk (tracking error). Higher IR indicates more consistent alpha generation. An IR above 0.50 is generally considered good for active managers.'
  },
  {
    id: 'CFP-INV-B4-021',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Tax Efficiency',
    subtopic: 'ETF vs Mutual Fund',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Why are ETFs generally more tax-efficient than mutual funds?',
    options: [
      'A) ETFs pay no management fees',
      'B) ETF in-kind creation/redemption minimizes capital gains distributions',
      'C) ETFs invest only in tax-exempt securities',
      'D) ETF shareholders receive only qualified dividends'
    ],
    correctAnswer: 1,
    explanation: 'ETFs use in-kind creation/redemption with authorized participants, allowing them to transfer low-basis shares out of the fund without triggering taxable gains. Mutual funds must sell securities to meet redemptions, creating capital gains distributions to all shareholders.'
  },
  {
    id: 'CFP-INV-B4-022',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Performance Attribution',
    subtopic: 'Sources of Return',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Performance attribution analysis decomposes returns into which components?',
    options: [
      'A) Past returns vs. future returns',
      'B) Allocation, selection, and interaction effects',
      'C) Growth vs. value factors',
      'D) Domestic vs. international sources'
    ],
    correctAnswer: 1,
    explanation: 'Performance attribution breaks down active return into: (1) allocation effect (over/underweighting sectors), (2) selection effect (stock picks within sectors), and (3) interaction effect (combination of allocation and selection decisions). This identifies sources of relative performance.'
  },
  {
    id: 'CFP-INV-B4-023',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'After-Tax Returns',
    subtopic: 'Pre-Liquidation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'What does "after-tax return (pre-liquidation)" represent in mutual fund reporting?',
    options: [
      'A) Return after capital gains distributions but before selling shares',
      'B) Return after all taxes including sale of shares',
      'C) Return before any tax considerations',
      'D) Return after dividend taxes only'
    ],
    correctAnswer: 0,
    explanation: 'Pre-liquidation after-tax return reflects the impact of taxable distributions (dividends, capital gains) while still holding the investment. Post-liquidation return also includes the tax impact of selling shares. SEC requires mutual funds to report both.'
  },
  {
    id: 'CFP-INV-B4-024',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Tax Lot Selection',
    subtopic: 'Specific Identification',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which cost basis method typically results in the lowest current capital gains tax when selling appreciated securities?',
    options: [
      'A) FIFO (First-In, First-Out)',
      'B) LIFO (Last-In, First-Out)',
      'C) Average cost',
      'D) Specific identification (highest cost lots)'
    ],
    correctAnswer: 3,
    explanation: 'Specific identification allows selling the highest-cost lots first, minimizing current gain (or maximizing loss). FIFO sells oldest (often lowest-cost) shares first. LIFO is not allowed for securities. Average cost is available for mutual funds but not optimal for tax management.'
  },
  {
    id: 'CFP-INV-B4-025',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Tracking Error',
    subtopic: 'Index Fund Quality',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For an index fund, a lower tracking error indicates:',
    options: [
      'A) Better risk-adjusted returns',
      'B) More closely replicates the benchmark',
      'C) Higher potential for outperformance',
      'D) Lower expense ratio'
    ],
    correctAnswer: 1,
    explanation: 'Tracking error measures the standard deviation of the difference between fund and benchmark returns. For index funds, lower is better—it means the fund closely tracks its benchmark. Active funds expect higher tracking error from their active bets.'
  }
];

export default CFP_INVESTMENTS_BATCH4_QUESTIONS;
