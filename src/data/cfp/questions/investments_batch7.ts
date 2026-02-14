/**
 * CFP Investment Questions - Batch 7
 * Domain 4: Investment Planning (17% of exam)
 * 25 additional questions covering advanced investment topics
 */

import { Question } from '../../../types';

export const CFP_INVESTMENTS_BATCH7_QUESTIONS: Question[] = [
  // INV-1: Advanced Theory and Analysis
  {
    id: 'cfp-inv-b7-001',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Jensen\'s Alpha',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Jensen\'s Alpha measures:',
    options: [
      'B) Risk-adjusted excess return above what CAPM predicts for the portfolio\'s beta',
      'A) Total portfolio return',
      'C) The correlation with the market',
      'D) Portfolio volatility',
    ],
    correctAnswer: 0,
    explanation: 'Jensen\'s Alpha = Actual return - [Risk-free rate + Beta × (Market return - Risk-free rate)]. Positive alpha indicates the manager added value beyond what beta exposure would predict. It\'s a key measure of manager skill, though persistence of alpha is debated.'
  },
  {
    id: 'cfp-inv-b7-003',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Correlation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Two assets with a correlation of -0.5:',
    options: [
      'A) Move in perfect opposite directions',
      'B) Have a moderate tendency to move in opposite directions, providing diversification benefits',
      'C) Move in the same direction always',
      'D) Have no relationship'
    ],
    correctAnswer: 1,
    explanation: 'Correlation of -0.5 indicates a moderate inverse relationship—when one asset rises, the other tends to fall, but not perfectly. This provides significant diversification benefits, reducing portfolio volatility. Correlations range from -1 (perfect inverse) to +1 (perfect positive), with 0 indicating no relationship.'
  },
  // INV-2: More Fixed Income
  {
    id: 'cfp-inv-b7-004',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Credit Spreads',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Widening credit spreads typically indicate:',
    options: [
      'B) Increasing concern about credit risk and potential defaults',
      'C) Lower bond prices for Treasuries',
      'A) Improving economic conditions',
      'D) Decreasing interest rate expectations',
    ],
    correctAnswer: 0,
    explanation: 'Credit spreads measure the yield difference between corporate bonds and Treasuries of similar maturity. Widening spreads indicate increasing risk aversion and credit concerns—investors demand more compensation for default risk. Spreads typically widen during recessions and financial stress, narrowing during expansions.'
  },
  {
    id: 'cfp-inv-b7-005',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Callable Bonds',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Callable bonds typically have:',
    options: [
      'B) Higher yields to compensate investors for call risk',
      'C) No relationship between callability and yield',
      'A) Lower yields than non-callable bonds because of added safety',
      'D) Fixed yields regardless of interest rate changes',
    ],
    correctAnswer: 0,
    explanation: 'Callable bonds offer higher yields because investors face reinvestment risk—the issuer can call (redeem) bonds when rates fall, forcing investors to reinvest at lower rates. The yield premium compensates for this disadvantage. Analysis should consider yield-to-call and yield-to-worst.'
  },
  {
    id: 'cfp-inv-b7-006',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Floating Rate Notes',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Floating rate notes (FRNs) have interest rate risk that is:',
    options: [
      'A) Higher than fixed-rate bonds',
      'C) The same as fixed-rate bonds',
      'B) Lower than fixed-rate bonds because coupons adjust with market rates',
      'D) Only present at maturity',
    ],
    correctAnswer: 2,
    explanation: 'FRNs have coupons that reset periodically (often quarterly) based on a reference rate like SOFR. This reset mechanism means prices stay near par regardless of rate movements, minimizing interest rate risk. FRNs maintain credit risk but are useful when rates are rising or expected to rise.'
  },
  // INV-3: More Equity Analysis
  {
    id: 'cfp-inv-b7-008',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Equity',
    subtopic: 'Return on Equity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company with ROE of 18%, payout ratio of 40%, and current earnings of $5 per share is expected to grow dividends at:',
    options: [
      'C) 7.2%',
      'A) 18%',
      'B) 10.8%',
      'D) 40%',
    ],
    correctAnswer: 2,
    explanation: 'Sustainable growth rate = ROE × (1 - Payout ratio) = 18% × (1 - 0.40) = 18% × 0.60 = 10.8%. This is the earnings/dividend growth rate sustainable without external financing. It\'s a key input for dividend discount models and assessing growth expectations.'
  },
  {
    id: 'cfp-inv-b7-009',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Equity',
    subtopic: 'Technical Analysis',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Technical analysis is based on the belief that:',
    options: [
      'B) Past price and volume patterns can predict future price movements',
      'A) Fundamental financial data determines value',
      'C) Markets are always efficient',
      'D) Only macroeconomic factors matter',
    ],
    correctAnswer: 0,
    explanation: 'Technical analysis studies historical price and volume data to identify patterns and trends that may predict future movements. It assumes market psychology creates repeating patterns. Critics cite weak-form market efficiency—past prices shouldn\'t predict future prices. Tools include moving averages, support/resistance, and chart patterns.'
  },
  // INV-4: More Options and Derivatives
  {
    id: 'cfp-inv-b7-010',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Options',
    subtopic: 'Vega',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Vega measures an option\'s sensitivity to:',
    options: [
      'A) Changes in the underlying stock price',
      'C) Time decay',
      'B) Changes in implied volatility',
      'D) Changes in interest rates',
    ],
    correctAnswer: 2,
    explanation: 'Vega measures how much an option\'s price changes for a 1% change in implied volatility. Higher volatility increases option values (more chance of profitable moves). Long options have positive vega (benefit from rising volatility); short options have negative vega. Vega is highest for at-the-money options.'
  },
  {
    id: 'cfp-inv-b7-011',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Options',
    subtopic: 'Long Straddle',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A long straddle strategy involves:',
    options: [
      'B) Buying both a call and put at the same strike and expiration, profiting from large price moves in either direction',
      'A) Selling both a call and put at the same strike',
      'C) Buying a call and selling a put',
      'D) Owning stock and selling calls',
    ],
    correctAnswer: 0,
    explanation: 'A long straddle buys an ATM call and ATM put with the same strike and expiration. It profits if the stock moves significantly in either direction beyond the combined premium cost. Maximum loss is the total premium paid. Used when expecting large moves but uncertain of direction (before earnings, FDA decisions, etc.).'
  },
  {
    id: 'cfp-inv-b7-012',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Options',
    subtopic: 'Put/Call Ratio',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A high put/call ratio is often interpreted as:',
    options: [
      'B) Bearish sentiment, though contrarians may view it as a buy signal',
      'A) Bullish sentiment',
      'C) Neutral sentiment',
      'D) Low volatility expectations',
    ],
    correctAnswer: 0,
    explanation: 'The put/call ratio measures put volume relative to call volume. High ratios indicate bearish sentiment (more puts = more hedging/betting on declines). Contrarians may view extreme bearishness as a buying opportunity (markets may be oversold). Low ratios signal complacency that may precede corrections.'
  },
  // INV-5: More Alternative Investments
  {
    id: 'cfp-inv-b7-013',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Alternatives',
    subtopic: 'Venture Capital',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Venture capital investments typically:',
    options: [
      'C) Are available to all investors',
      'B) Have high failure rates but potential for exceptional returns on successful investments',
      'A) Provide immediate liquidity and income',
      'D) Invest primarily in public companies',
    ],
    correctAnswer: 1,
    explanation: 'Venture capital invests in early-stage private companies with high growth potential. Most VC investments fail (a "power law" distribution where most returns come from few winners). Illiquidity, long holding periods (5-10+ years), high minimums, and accreditation requirements limit access. Diversification across many investments is essential.'
  },
  {
    id: 'cfp-inv-b7-014',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Alternatives',
    subtopic: 'Managed Futures',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Managed futures strategies:',
    options: [
      'C) Provide guaranteed returns',
      'B) Use futures and options to implement trend-following or other systematic strategies across multiple asset classes',
      'A) Only invest in agricultural commodities',
      'D) Are highly correlated with equity markets',
    ],
    correctAnswer: 1,
    explanation: 'Managed futures (CTAs) trade futures and options on commodities, currencies, interest rates, and equity indices using systematic strategies (often trend-following). They can go long or short and may provide positive returns in both up and down markets. Low correlation with traditional assets makes them diversifiers, especially in crises.'
  },
  {
    id: 'cfp-inv-b7-015',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Alternatives',
    subtopic: 'Structured Products',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Market-linked CDs and structured notes typically:',
    options: [
      'B) Offer some upside participation with principal protection or buffers, but with caps, credit risk, and complexity',
      'C) Have no fees or costs',
      'A) Guarantee full market participation with no downside',
      'D) Are fully liquid at any time',
    ],
    correctAnswer: 0,
    explanation: 'Structured products combine derivatives with fixed income to create custom risk/return profiles. They may offer principal protection with limited upside (caps), buffers against losses, or enhanced yields. Downsides include complexity, issuer credit risk, limited liquidity, embedded costs, and tax treatment that may be unfavorable.'
  },
  // INV-1: More Portfolio Management
  {
    id: 'cfp-inv-b7-016',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Portfolio Management',
    subtopic: 'Core-Satellite',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A core-satellite portfolio strategy:',
    options: [
      'C) Uses only active management',
      'A) Uses only passive investments',
      'B) Combines a passive core (index funds) with active or alternative satellites seeking alpha or targeted exposures',
      'D) Requires equal weighting across all holdings',
    ],
    correctAnswer: 2,
    explanation: 'Core-satellite allocates the majority (core) to low-cost passive funds for broad market exposure, while satellites are actively managed or alternative investments seeking alpha or specific factor exposures. This balances cost efficiency with opportunities for outperformance or diversification.'
  },
  {
    id: 'cfp-inv-b7-018',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Portfolio Management',
    subtopic: 'Mean-Variance Optimization',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Mean-variance optimization (MVO) in portfolio construction:',
    options: [
      'A) Always produces practical real-world portfolios',
      'B) Identifies portfolios with maximum return for given risk levels, but is sensitive to input assumptions',
      'C) Ignores correlations between assets',
      'D) Works only with two assets'
    ],
    correctAnswer: 1,
    explanation: 'MVO finds the efficient frontier—portfolios offering maximum return for each risk level. It uses expected returns, standard deviations, and correlations. Criticisms include sensitivity to inputs (small changes dramatically affect output), historical data limitations, and tendency toward concentrated portfolios. Constraints and resampling can address limitations.'
  },
  // Additional Topics
  {
    id: 'cfp-inv-b7-019',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'I-Bonds',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Series I Savings Bonds:',
    options: [
      'B) Provide inflation protection with a composite rate of fixed rate plus inflation adjustment',
      'A) Have unlimited purchase amounts',
      'C) Are freely tradeable on secondary markets',
      'D) Must be held to maturity',
    ],
    correctAnswer: 0,
    explanation: 'I-Bonds combine a fixed rate (set at purchase) with an inflation rate component (adjusted semi-annually). They\'re purchased through TreasuryDirect (up to $10,000/year electronically). Interest is tax-deferred and exempt from state/local tax. Early redemption penalty (3 months interest) after 1 year, full redemption after 5 years.'
  },
  {
    id: 'cfp-inv-b7-020',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Equity',
    subtopic: 'Stock Splits',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A 2-for-1 stock split affects shareholder wealth by:',
    options: [
      'B) Having no effect on total value—shares double but price halves',
      'A) Doubling the value of shares owned',
      'C) Reducing shares owned by half',
      'D) Creating a taxable event',
    ],
    correctAnswer: 0,
    explanation: 'Stock splits increase shares and reduce price proportionally, leaving total value unchanged. A 2-for-1 split doubles shares while halving price. Companies split to improve liquidity and marketability (lower prices seem more accessible). Splits are not taxable events. Reverse splits consolidate shares at higher prices.'
  },
  {
    id: 'cfp-inv-b7-021',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Analysis',
    subtopic: 'Dollar-Cost Averaging',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Dollar-cost averaging results in:',
    options: [
      'A) Buying more shares when prices are high',
      'B) Buying more shares when prices are low and fewer when high, potentially lowering average cost',
      'C) Guaranteed profits',
      'D) Higher returns than lump-sum investing always'
    ],
    correctAnswer: 1,
    explanation: 'DCA invests fixed amounts at regular intervals. When prices are low, more shares are purchased; when high, fewer shares. This may reduce average cost and provides discipline. Research shows lump-sum investing typically outperforms DCA (markets rise more often than fall), but DCA reduces regret risk and suits regular income.'
  },
  {
    id: 'cfp-inv-b7-022',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Analysis',
    subtopic: 'Value at Risk',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Value at Risk (VaR) of $100,000 at 95% confidence means:',
    options: [
      'A) Expected return is $100,000',
      'B) There is a 5% probability of losing more than $100,000 over the specified period',
      'C) Maximum possible loss is $100,000',
      'D) The portfolio is worth $100,000'
    ],
    correctAnswer: 1,
    explanation: 'VaR estimates the maximum expected loss over a specified time at a given confidence level. A 95% VaR of $100,000 means there\'s a 5% chance losses could exceed $100,000. VaR limitations include not measuring tail risk (how bad losses beyond VaR could be) and assumptions about normal distributions.'
  },
  {
    id: 'cfp-inv-b7-023',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Build America Bonds',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Build America Bonds (BABs) issued in 2009-2010:',
    options: [
      'B) Pay taxable interest but provided federal subsidies to municipal issuers',
      'C) Were issued by federal agencies only',
      'A) Are tax-exempt like traditional municipal bonds',
      'D) Are still being issued today',
    ],
    correctAnswer: 0,
    explanation: 'BABs were taxable municipal bonds issued under ARRA (2009-2010) where the federal government subsidized interest costs to municipalities. Unlike tax-exempt munis, BAB interest is fully taxable to investors but yields were higher. The program expired; existing BABs trade but new issuance stopped.'
  },
  {
    id: 'cfp-inv-b7-024',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Alternatives',
    subtopic: 'Infrastructure',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Infrastructure investments typically offer:',
    options: [
      'B) Relatively stable cash flows, inflation protection, and low correlation with traditional assets',
      'C) Daily liquidity when held directly',
      'A) High volatility and no income',
      'D) No regulatory risk',
    ],
    correctAnswer: 0,
    explanation: 'Infrastructure (utilities, toll roads, airports, pipelines) often provides stable, regulated cash flows tied to usage and inflation-adjustment provisions. Low correlation with stocks/bonds offers diversification. Direct infrastructure is illiquid with large minimums; publicly traded infrastructure REITs and MLPs provide more accessible exposure.'
  },
  {
    id: 'cfp-inv-b7-025',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Treynor Ratio',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The Treynor ratio differs from the Sharpe ratio by using:',
    options: [
      'A) Total return instead of excess return',
      'C) Only positive returns',
      'B) Beta (systematic risk) instead of standard deviation (total risk) in the denominator',
      'D) Maximum drawdown',
    ],
    correctAnswer: 2,
    explanation: 'Treynor ratio = (Portfolio return - Risk-free rate) / Beta. It measures excess return per unit of systematic risk (beta). Unlike Sharpe (which uses total risk/standard deviation), Treynor is more appropriate for well-diversified portfolios where unsystematic risk has been eliminated. Both measure risk-adjusted returns.'
  }
];
