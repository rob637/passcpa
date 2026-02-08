/**
 * CFP Investments Questions - Batch 12
 * Domain 3: Investment Planning (17% of exam)
 * 25 additional questions
 */

import { Question } from '../../../types';

export const CFP_INVESTMENTS_BATCH12_QUESTIONS: Question[] = [
  // INV-1: Investment Concepts
  {
    id: 'CFP-INV-B12-001',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Concepts',
    subtopic: 'Tracking Error',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Tracking error measures:',
    options: [
      'A) Total portfolio risk',
      'B) The standard deviation of the difference between fund returns and benchmark returns over time',
      'C) Market volatility',
      'D) Trading costs'
    ],
    correctAnswer: 1,
    explanation: 'Tracking error: measures how closely fund follows benchmark. Low tracking error: closely tracks (index funds aim for low). High tracking error: deviates significantly (active managers). Calculated: standard deviation of return difference over time. Sources: sampling, costs, cash drag, timing. For indexers: lower is better. Active: higher indicates manager is taking different positions.'
  },
  {
    id: 'CFP-INV-B12-002',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Concepts',
    subtopic: 'Sortino Ratio',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The Sortino ratio differs from the Sharpe ratio by:',
    options: [
      'A) Using total return',
      'B) Using downside deviation instead of standard deviation, focusing only on returns below target',
      'C) Ignoring risk-free rate',
      'D) Measuring beta'
    ],
    correctAnswer: 1,
    explanation: 'Sortino ratio: (Return - Target) / Downside Deviation. Unlike Sharpe: only penalizes downside volatility. Upside volatility is good—Sortino doesn\'t penalize it. Better for: asymmetric return distributions, when clients care about downside more than volatility generally. Higher is better. Target often risk-free rate or 0%. More intuitive for many investors—downside is what hurts.'
  },
  {
    id: 'CFP-INV-B12-003',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Concepts',
    subtopic: 'Mean Reversion',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Mean reversion in financial markets suggests:',
    options: [
      'A) Markets always go up',
      'B) Extreme performance tends to be followed by performance closer to long-term averages',
      'C) Returns are random',
      'D) Diversification is unnecessary'
    ],
    correctAnswer: 1,
    explanation: 'Mean reversion: extreme deviations tend to correct toward long-term average. Implications: top-performing funds may underperform, beaten-down assets may recover. Basis for: value investing, rebalancing benefits, contrarian strategies. Not guaranteed: some trends persist. Time horizon matters—mean reversion more reliable over longer periods. Supporting rationale for disciplined rebalancing.'
  },
  // INV-2: Securities
  {
    id: 'CFP-INV-B12-004',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Securities',
    subtopic: 'Mortgage-Backed Securities',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Prepayment risk in mortgage-backed securities refers to:',
    options: [
      'A) Default risk',
      'B) Homeowners paying mortgages early when rates fall, reducing expected interest income and returning principal sooner',
      'C) Inflation risk',
      'D) Currency risk'
    ],
    correctAnswer: 1,
    explanation: 'Prepayment risk: homeowners refinance when rates drop. MBS holder gets principal back early—must reinvest at lower rates. Return of principal, not loss. Affects: duration (contracts when rates fall), yield. CMOs allocate prepayment risk differently across tranches. Extension risk: opposite—rates rise, prepayments slow, duration extends. MBS have negative convexity—worst of both worlds.'
  },
  {
    id: 'CFP-INV-B12-005',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Securities',
    subtopic: 'ADRs and GDRs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'American Depositary Receipts (ADRs) allow U.S. investors to:',
    options: [
      'A) Trade only on foreign exchanges',
      'B) Buy shares of foreign companies trading on U.S. exchanges in U.S. dollars, simplifying international investing',
      'C) Avoid all foreign taxes',
      'D) Get guaranteed returns'
    ],
    correctAnswer: 1,
    explanation: 'ADRs: foreign company shares held by depositary bank, certificates trade on U.S. exchanges. Benefits: U.S. dollar pricing, familiar trading, U.S. settlement. Still subject to: currency risk, foreign withholding taxes (some), country risk. Types: Level I (OTC), Level II/III (exchange listed). GDRs: similar concept for European markets. Convenient international diversification vehicle.'
  },
  {
    id: 'CFP-INV-B12-006',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Securities',
    subtopic: 'Municipal Bond Types',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Revenue bonds differ from general obligation bonds in that:',
    options: [
      'A) Revenue bonds are riskier always',
      'B) Revenue bonds are backed by specific project income, while GO bonds are backed by issuer\'s full taxing power',
      'C) Only GO bonds are tax-exempt',
      'D) Revenue bonds can\'t default'
    ],
    correctAnswer: 1,
    explanation: 'General Obligation (GO) bonds: backed by full faith, credit, and taxing power of issuer. Revenue bonds: backed only by specific revenue source (tolls, utility payments, etc.). GO generally safer—can raise taxes. Revenue: assess the project economics. Both typically tax-exempt. Revenue may have higher yields due to narrower backing. Due diligence differs for each type.'
  },
  // INV-3: Portfolio Management
  {
    id: 'CFP-INV-B12-007',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Management',
    subtopic: 'Factor Tilts',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Factor-based investing with tilts toward value, size, or momentum:',
    options: [
      'A) Guarantees outperformance',
      'B) Seeks to capture documented risk premiums, accepting periods of underperformance, based on academic research',
      'C) Eliminates all risk',
      'D) Only works for institutions'
    ],
    correctAnswer: 1,
    explanation: 'Factor investing: target documented premiums—value, size, momentum, quality, low volatility. Based on academic research (Fama-French, others). Premiums: not guaranteed, can underperform for extended periods. Implementation: factor funds, smart beta ETFs, stock selection. Requires: discipline through underperformance, diversification across factors. Different from market-cap indexing or traditional active.'
  },
  {
    id: 'CFP-INV-B12-008',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Management',
    subtopic: 'Rebalancing Triggers',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Threshold rebalancing (rebalancing when allocation deviates by a set percentage):',
    options: [
      'A) Is always inferior to calendar rebalancing',
      'B) Responds to actual allocation drift and may be more tax-efficient than fixed calendar rebalancing',
      'C) Ignores market movements',
      'D) Requires daily monitoring'
    ],
    correctAnswer: 1,
    explanation: 'Threshold rebalancing: rebalance when allocation drifts X% (e.g., 5% absolute or 25% relative). Benefits: responds to actual drift, may trade less in stable markets, captures mean reversion when triggered. Comparison to calendar: potentially fewer trades, more responsive. Considerations: monitoring required, execution logistics. Hybrid approach common: review periodically, rebalance if thresholds exceeded.'
  },
  {
    id: 'CFP-INV-B12-009',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Management',
    subtopic: 'Transition Management',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When transitioning a portfolio from one strategy to another, key considerations include:',
    options: [
      'A) Immediate full liquidation always',
      'B) Tax implications, transaction costs, market impact, and timing of exposure changes',
      'C) Ignoring embedded gains',
      'D) Speed over all else'
    ],
    correctAnswer: 1,
    explanation: 'Portfolio transition: moving from current to target allocation. Considerations: embedded gains/losses (tax-loss harvest vs. wash sales), transaction costs (commissions, spreads, impact), exposure gaps (maintain market exposure during transition), opportunity cost. Strategies: staged transition, in-kind transfers, tax-loss pairing. For large portfolios: may use transition manager. Plan carefully—rushed transitions costly.'
  },
  // INV-4: Taxation
  {
    id: 'CFP-INV-B12-010',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Taxation',
    subtopic: 'Net Investment Income Tax',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The 3.8% Net Investment Income Tax applies to:',
    options: [
      'A) All investment income',
      'B) Investment income for individuals above MAGI thresholds ($200K single, $250K married), on lesser of NII or excess MAGI',
      'C) Only capital gains',
      'D) All income above $200K'
    ],
    correctAnswer: 1,
    explanation: 'NIIT: 3.8% surtax on investment income (interest, dividends, capital gains, rents, royalties, passive income). Applies when: MAGI > $200K (single) or $250K (MFJ). Tax on lesser of: net investment income OR excess MAGI over threshold. Not indexed for inflation. Planning: reduce MAGI, time income recognition, use tax-exempt investments. Adds to regular income tax and capital gains tax.'
  },
  {
    id: 'CFP-INV-B12-011',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Taxation',
    subtopic: 'Bond Premium Amortization',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When a taxable bond is purchased at a premium:',
    options: [
      'A) Premium is a capital loss at maturity',
      'B) Premium can be amortized annually to reduce interest income, with basis reduction, or basis maintained for capital loss at maturity',
      'C) No tax implications',
      'D) Premium is immediately deductible'
    ],
    correctAnswer: 1,
    explanation: 'Bond premium amortization (taxable bonds): can elect to amortize annually—reduces interest income, reduces basis. Alternative: don\'t amortize, take capital loss at maturity/sale. Tax-exempt bonds: must amortize (no choice), reduces basis. Constant yield method typically used. Election affects: current income, future gain/loss. Decision factors: marginal rates now vs. later, holding period expectations.'
  },
  {
    id: 'CFP-INV-B12-012',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Taxation',
    subtopic: 'Foreign Tax Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Foreign tax paid on international investments can be:',
    options: [
      'A) Not recovered',
      'B) Claimed as a tax credit or itemized deduction, with credit usually providing greater benefit',
      'C) Only used in non-retirement accounts',
      'D) Automatically refunded'
    ],
    correctAnswer: 1,
    explanation: 'Foreign tax credit: reduces U.S. tax dollar-for-dollar (subject to limitations). Itemized deduction: reduces taxable income only. Credit generally better (direct tax reduction vs. tax times marginal rate). Limitation: can\'t exceed U.S. tax on foreign income. For small amounts (<$600 married filing jointly): may not need Form 1116. International funds provide 1099 with foreign tax paid. Credit usually preferred.'
  },
  // Additional Topics
  {
    id: 'CFP-INV-B12-013',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Concepts',
    subtopic: 'Liquidity Risk',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Liquidity risk in investments refers to:',
    options: [
      'A) Risk of total loss',
      'B) Difficulty selling an investment quickly at fair value, potentially requiring price concession',
      'C) Interest rate changes',
      'D) Currency fluctuations'
    ],
    correctAnswer: 1,
    explanation: 'Liquidity risk: can\'t sell quickly without price impact. Examples: real estate, private equity, small-cap stocks in volume, some bonds. Manifests as: wide bid-ask spreads, time to sell, forced selling at discount. Planning: match liquidity to needs, liquidity premium expected in less liquid assets. Matters most when need cash unexpectedly. Core holdings should be liquid.'
  },
  {
    id: 'CFP-INV-B12-014',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Securities',
    subtopic: 'Index Funds Selection',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'When selecting index funds, key comparison factors include:',
    options: [
      'A) Past performance only',
      'B) Expense ratio, tracking difference, index methodology, and tax efficiency',
      'C) Fund company reputation only',
      'D) Minimum investment only'
    ],
    correctAnswer: 1,
    explanation: 'Index fund selection: expense ratio (lower is better, directly impacts return), tracking difference (actual return vs. index, not just error), index methodology (what\'s included, how weighted), tax efficiency (turnover, qualified dividends). Also: fund size, bid-ask spread (for ETFs), securities lending income. Small differences compound significantly over time. Not all index funds are equal.'
  },
  {
    id: 'CFP-INV-B12-015',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Management',
    subtopic: 'Glide Paths',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A glide path in target-date funds describes:',
    options: [
      'A) Performance trajectory',
      'B) The predetermined transition from growth-oriented to conservative allocation as the target date approaches',
      'C) Fee reduction schedule',
      'D) Dividend reinvestment'
    ],
    correctAnswer: 1,
    explanation: 'Glide path: planned asset allocation change over time. Target-date funds: reduce equity, increase bonds as retirement approaches. "To" retirement: reaches most conservative at target date. "Through" retirement: continues adjusting past target. Compare glide paths—significant differences between fund families. Consider: risk at target date, post-retirement allocation. Not one-size-fits-all—evaluate if appropriate.'
  },
  {
    id: 'CFP-INV-B12-016',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Taxation',
    subtopic: 'Charitable Stock Gifts',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Donating appreciated stock held long-term to charity provides:',
    options: [
      'A) No tax benefit',
      'B) Deduction for fair market value while avoiding capital gains tax on appreciation',
      'C) Only cost basis deduction',
      'D) Capital gains tax deduction'
    ],
    correctAnswer: 1,
    explanation: 'Charitable gifts of appreciated stock: deduct FMV (up to 30% AGI for public charities), no capital gains tax on appreciation. Better than selling and donating cash—avoids tax on gain. Requirements: held >1 year, donated to qualifying charity. For depreciated stock: sell, take loss, donate cash. Donor-advised funds accept stock. Often most tax-efficient way to give for those with appreciated holdings.'
  },
  {
    id: 'CFP-INV-B12-017',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Concepts',
    subtopic: 'Value at Risk',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Value at Risk (VaR) expresses:',
    options: [
      'A) Maximum possible loss',
      'B) The maximum loss expected at a given confidence level over a specified time period under normal conditions',
      'C) Average daily loss',
      'D) Total portfolio value'
    ],
    correctAnswer: 1,
    explanation: 'VaR: answers "What\'s the most I can lose at X% confidence?" Example: 95% 1-day VaR of $10K means 95% of days, won\'t lose more than $10K. Doesn\'t measure: tail risk (the 5% worst), maximum possible loss. Methods: historical, parametric, Monte Carlo. Limitations: assumes normal conditions, understates tail risk. Useful but not comprehensive risk measure. Often supplemented with stress testing.'
  },
  {
    id: 'CFP-INV-B12-018',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Securities',
    subtopic: 'REIT Investment',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Real Estate Investment Trusts (REITs) must:',
    options: [
      'A) Invest only in residential property',
      'B) Distribute at least 90% of taxable income to shareholders, with income taxed as ordinary income to recipients',
      'C) Be privately held',
      'D) Hold properties for 10+ years'
    ],
    correctAnswer: 1,
    explanation: 'REIT requirements: 90% distribution of taxable income, 75%+ of assets in real estate, 75%+ gross income from real estate. Tax: no corporate tax if requirements met (pass-through), dividends mostly ordinary income (some may be capital gains or return of capital). QBI deduction may apply post-TCJA. Types: equity (own property), mortgage (own loans), hybrid. Publicly traded or private.'
  },
  {
    id: 'CFP-INV-B12-019',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Management',
    subtopic: 'Concentrated Positions',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Strategies for managing concentrated stock positions include:',
    options: [
      'A) Only holding indefinitely',
      'B) Staged selling, exchange funds, collars, charitable donations, and qualified opportunity zone reinvestment',
      'C) Immediate full liquidation always',
      'D) Ignoring concentration'
    ],
    correctAnswer: 1,
    explanation: 'Concentrated position strategies: staged selling (spread gains over years), hedging (collars—buy puts, sell calls), exchange funds (contribute stock, get diversified exposure), charitable giving (QCDs, CRTs), qualified opportunity zones (reinvest gains, defer/reduce tax), borrowing against (no sale trigger). Each has trade-offs: costs, complexity, tax impact, restrictions. Match to specific situation and goals.'
  },
  {
    id: 'CFP-INV-B12-020',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Taxation',
    subtopic: 'Constructive Sales',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Constructive sale rules prevent investors from:',
    options: [
      'A) All hedging strategies',
      'B) Deferring gain recognition while eliminating substantially all risk through offsetting positions',
      'C) Charitable giving',
      'D) Portfolio rebalancing'
    ],
    correctAnswer: 1,
    explanation: 'Constructive sale (Section 1259): if you eliminate substantially all risk while keeping position, treated as sale for tax purposes. Triggers: short against the box (now covered), certain collars (too tight), forward contracts locking in price. Purpose: prevent permanent tax deferral on gains while locking in economics. Planning: ensure hedges don\'t cross line—sufficient risk remains. Consult tax advisor for complex situations.'
  },
  {
    id: 'CFP-INV-B12-021',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Concepts',
    subtopic: 'Time Diversification',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The concept of "time diversification" in investing:',
    options: [
      'A) Is universally accepted',
      'B) Suggests long holding periods reduce risk, but is debated as cumulative dollar risk may still increase',
      'C) Applies only to bonds',
      'D) Guarantees positive returns'
    ],
    correctAnswer: 1,
    explanation: 'Time diversification: idea that longer horizons reduce risk (variance of annualized returns decreases). Debate: true for return rates, but absolute dollar risk may increase (larger portfolio at risk longer). Implications: argument for stocks in long-term portfolios. Critics: dollar amount at risk grows over time. Both perspectives have merit. Practical: longer horizons can tolerate more volatility, but isn\'t riskless.'
  },
  {
    id: 'CFP-INV-B12-022',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Securities',
    subtopic: 'Bond Ratings',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Investment grade bonds are rated:',
    options: [
      'A) B or above',
      'B) BBB- or Baa3 and above, indicating lower risk of default compared to high-yield bonds',
      'C) Only AAA',
      'D) C or above'
    ],
    correctAnswer: 1,
    explanation: 'Investment grade: BBB-/Baa3 or higher. High-yield (junk): BB+/Ba1 and below. Rating agencies: S&P, Moody\'s, Fitch. Investment grade: lower default risk, lower yields. High-yield: higher default risk, higher yields. Many institutional investors: restricted to investment grade. Crossover: "fallen angels" (downgraded to HY), "rising stars" (upgraded to IG). Ratings not perfect—do due diligence.'
  },
  {
    id: 'CFP-INV-B12-023',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Management',
    subtopic: 'Liability Matching',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Liability-driven investing (LDI) focuses on:',
    options: [
      'A) Maximizing returns',
      'B) Structuring assets to match the timing and amount of known future liabilities, reducing mismatch risk',
      'C) All equity portfolios',
      'D) Ignoring time horizons'
    ],
    correctAnswer: 1,
    explanation: 'LDI: match assets to liabilities—duration, timing, amount. Common for: pensions, annuities, known future obligations. Techniques: immunization (match duration), cash flow matching, dedicated portfolios. Reduces: interest rate mismatch risk, reinvestment risk. Trade-off: may sacrifice return for certainty. Individual application: retirement income, education funding, known future expenses. Security over maximization.'
  },
  {
    id: 'CFP-INV-B12-024',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Taxation',
    subtopic: 'In-Kind Distributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In-kind distributions of securities from a retirement account:',
    options: [
      'A) Are never permitted',
      'B) Are taxable based on fair market value at distribution, with that value becoming new cost basis',
      'C) Are always tax-free',
      'D) Carry over original basis'
    ],
    correctAnswer: 1,
    explanation: 'In-kind distribution: receive securities instead of cash from IRA/401(k). Tax: FMV at distribution is ordinary income (same as cash withdrawal). New basis: FMV at distribution date. Future appreciation from new basis. Uses: want to keep specific holding, NUA transaction for employer stock. Not generally advantageous vs. cash unless specific strategy (like NUA). Same tax rules apply.'
  },
  {
    id: 'CFP-INV-B12-025',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Concepts',
    subtopic: 'Market Efficiency',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Efficient Market Hypothesis in its semi-strong form suggests:',
    options: [
      'A) Markets are perfectly predictable',
      'B) Stock prices reflect all publicly available information, making fundamental analysis unable to consistently generate excess returns',
      'C) Only technical analysis works',
      'D) Insider information is useless'
    ],
    correctAnswer: 1,
    explanation: 'Semi-strong EMH: prices reflect all public information. Implications: fundamental analysis can\'t consistently beat market—information already in price. Weak form: technical analysis doesn\'t work (past prices reflected). Strong form: even insider info reflected (empirically false). Debate continues: markets generally efficient, but anomalies exist. Practical: hard to beat market consistently, low-cost indexing often sensible.'
  }
];
