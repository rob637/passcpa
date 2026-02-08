/**
 * CFP Investments Questions - Batch 10
 * Domain 4: Investment Planning (17% of exam)
 * 25 additional questions covering investment topics
 */

import { Question } from '../../../types';

export const CFP_INVESTMENTS_BATCH10_QUESTIONS: Question[] = [
  // INV-1: Investment Theory
  {
    id: 'CFP-INV-B10-001',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Efficient Frontier',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A portfolio on the efficient frontier represents:',
    options: [
      'A) Minimum return for each risk level',
      'B) Maximum expected return for a given level of risk, or minimum risk for a given return',
      'C) Average market performance',
      'D) Zero correlation investments'
    ],
    correctAnswer: 1,
    explanation: 'Efficient frontier: the set of optimal portfolios offering highest expected return for each level of risk (or lowest risk for each return). Portfolios below the frontier are suboptimal—can achieve better return at same risk or same return at lower risk. Modern Portfolio Theory uses the frontier to guide asset allocation decisions.'
  },
  {
    id: 'CFP-INV-B10-002',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Mean-Variance Optimization',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Mean-variance optimization (MVO) limitations include:',
    options: [
      'A) It always works perfectly',
      'B) Sensitivity to input estimates, assumption of normal returns, and tendency to produce concentrated portfolios',
      'C) It ignores return entirely',
      'D) Only works with bonds'
    ],
    correctAnswer: 1,
    explanation: 'MVO limitations: small changes in expected returns dramatically alter allocations (estimation error sensitivity), assumes normal distributions (ignores fat tails), produces extreme allocations, uses historical data that may not predict future, ignores transaction costs and taxes. Practitioners use constraints, Black-Litterman model, or robust optimization to address.'
  },
  {
    id: 'CFP-INV-B10-003',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Arbitrage Pricing Theory',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Arbitrage Pricing Theory (APT) differs from CAPM in that:',
    options: [
      'A) APT uses only beta',
      'B) APT allows multiple risk factors beyond market risk to explain returns',
      'C) APT is simpler',
      'D) APT focuses on individual stocks only'
    ],
    correctAnswer: 1,
    explanation: 'APT: expected return is a linear function of multiple macro factors (versus CAPM\'s single market factor). Factors might include: GDP growth, inflation, interest rate spreads, oil prices. APT doesn\'t specify the factors—they\'re empirically determined. It\'s more flexible but less prescriptive than CAPM. Both are based on no-arbitrage principles.'
  },
  // INV-2: Asset Classes
  {
    id: 'CFP-INV-B10-004',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Asset Classes',
    subtopic: 'Convertible Securities',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Convertible bonds offer investors:',
    options: [
      'A) Higher yields than regular bonds',
      'B) Downside protection like bonds with upside participation through conversion to equity',
      'C) Guaranteed principal return',
      'D) No interest payments'
    ],
    correctAnswer: 1,
    explanation: 'Convertibles: hybrid securities—bond with option to convert to stock. Downside: bond floor (value as straight bond if stock falls). Upside: participation if stock rises above conversion price. Trade-off: lower yield than comparable non-convertible bonds (you pay for the option). Good for balanced exposure, especially in volatile markets.'
  },
  {
    id: 'CFP-INV-B10-005',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Asset Classes',
    subtopic: 'Treasury STRIPS',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Treasury STRIPS are:',
    options: [
      'A) Inflation-protected securities',
      'B) Zero-coupon securities created by separating Treasury bond interest and principal payments',
      'C) Floating rate notes',
      'D) Municipal securities'
    ],
    correctAnswer: 1,
    explanation: 'STRIPS: Separate Trading of Registered Interest and Principal Securities. Treasury breaks apart a T-bond/note into individual cash flows (each coupon + principal = separate zero-coupon security). Benefits: known value at maturity, no reinvestment risk, useful for immunization. Drawback: phantom income taxed annually though no cash received—best in tax-deferred accounts.'
  },
  {
    id: 'CFP-INV-B10-006',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Asset Classes',
    subtopic: 'Master Limited Partnerships',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Master Limited Partnerships (MLPs) offer:',
    options: [
      'A) Simple tax reporting',
      'B) Pass-through income with high distributions, often from energy infrastructure, with complex K-1 tax reporting',
      'C) Guaranteed returns',
      'D) Short-term trading opportunities'
    ],
    correctAnswer: 1,
    explanation: 'MLPs: publicly traded partnerships (mostly energy/pipelines). Advantages: high distributions (often 6-8%), portions often return of capital (tax-deferred). Drawbacks: K-1 tax complexity, UBTI concerns in IRAs, concentrated sector exposure, distribution cuts possible. Distributions reduce basis—eventually creates taxable gain on sale or recapture.'
  },
  // INV-3: Analysis and Valuation
  {
    id: 'CFP-INV-B10-007',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Valuation',
    subtopic: 'Price-to-Book Ratio',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A low price-to-book ratio may indicate:',
    options: [
      'A) A growth stock',
      'B) A value stock that may be undervalued, or a company with fundamental problems',
      'C) High future earnings',
      'D) Technology sector'
    ],
    correctAnswer: 1,
    explanation: 'P/B = Market price / Book value per share. Low P/B: stock may be undervalued relative to assets OR company has problems (poor earnings, obsolete assets). High P/B: market expects above-book returns or intangible assets create value. Particularly relevant for financial and industrial companies. Less useful for service or tech companies with few tangible assets.'
  },
  {
    id: 'CFP-INV-B10-008',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Valuation',
    subtopic: 'Discounted Cash Flow',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A discounted cash flow (DCF) valuation requires:',
    options: [
      'A) Only historical data',
      'B) Projections of future free cash flows and an appropriate discount rate reflecting risk',
      'C) Comparable company multiples',
      'D) Dividend history only'
    ],
    correctAnswer: 1,
    explanation: 'DCF valuation: intrinsic value = PV of projected future free cash flows. Requires: FCF projections (typically 5-10 years), terminal value (perpetuity growth or exit multiple), and discount rate (WACC or required return). Highly sensitive to assumptions—small changes in growth or discount rate dramatically affect value. Theoretically sound but practically challenging.'
  },
  {
    id: 'CFP-INV-B10-009',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Analysis',
    subtopic: 'Interest Coverage Ratio',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The interest coverage ratio measures:',
    options: [
      'A) Total debt to equity',
      'B) A company\'s ability to pay interest on debt, calculated as EBIT divided by interest expense',
      'C) Profit margins only',
      'D) Asset turnover'
    ],
    correctAnswer: 1,
    explanation: 'Interest coverage = EBIT / Interest expense. Higher ratio = greater ability to meet interest obligations. Below 1.5: concerning. Above 3: generally comfortable. Important for: bond analysis, credit risk assessment, lending decisions. Low coverage increases default risk and may indicate excessive leverage or declining earnings.'
  },
  // INV-4: Portfolio Management
  {
    id: 'CFP-INV-B10-010',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Portfolio Management',
    subtopic: 'Tactical Asset Allocation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Tactical asset allocation involves:',
    options: [
      'A) Never deviating from targets',
      'B) Making short-term adjustments to asset class weights based on market outlook while maintaining a strategic baseline',
      'C) Constant trading',
      'D) Passive indexing only'
    ],
    correctAnswer: 1,
    explanation: 'Tactical allocation: temporary deviations from strategic (long-term) allocation to capitalize on perceived opportunities or avoid risks. Examples: overweighting stocks when undervalued, reducing bonds before expected rate increases. Balances active management with strategic discipline. Success depends on accurate market timing—often difficult to achieve consistently.'
  },
  {
    id: 'CFP-INV-B10-011',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Portfolio Management',
    subtopic: 'Correlation and Diversification',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Diversification benefits are greatest when:',
    options: [
      'A) All assets are perfectly correlated',
      'B) Assets have low or negative correlations, so losses in one may be offset by gains in another',
      'C) Only one asset class is used',
      'D) Portfolio is concentrated'
    ],
    correctAnswer: 1,
    explanation: 'Diversification reduces portfolio risk when assets don\'t move together. Optimal: low or negative correlation—when one zigs, another zags. Perfect correlation (+1): no diversification benefit. Negative correlation (-1): volatility reduction is dramatic. In practice, correlations often increase during crises when diversification is needed most.'
  },
  {
    id: 'CFP-INV-B10-012',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Portfolio Management',
    subtopic: 'Core-Satellite Approach',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A core-satellite investment approach:',
    options: [
      'A) Uses only active management',
      'B) Combines low-cost broad market index funds as the "core" with actively managed or specialized "satellite" positions',
      'C) Avoids diversification',
      'D) Is only for institutions'
    ],
    correctAnswer: 1,
    explanation: 'Core-satellite: Core (60-80%): broad market index funds for efficient, low-cost market exposure. Satellites (20-40%): active managers, sector tilts, alternatives, individual positions for potential alpha. Benefits: cost efficiency in core while allowing active bets where manager skill may add value. Balances index benefits with tactical opportunities.'
  },
  // INV-5: Trading and Reporting
  {
    id: 'CFP-INV-B10-013',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Trading',
    subtopic: 'Bid-Ask Spread',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The bid-ask spread represents:',
    options: [
      'A) Daily price change',
      'B) The transaction cost embedded in trading, being the difference between buying and selling prices',
      'C) Annual returns',
      'D) Dividend yield'
    ],
    correctAnswer: 1,
    explanation: 'Bid-ask spread: difference between highest price buyers offer (bid) and lowest price sellers accept (ask). It\'s an implicit transaction cost—buy at ask, sell at bid, lose the spread. Narrower spreads for liquid securities (large-cap stocks, Treasuries). Wider for illiquid (small-caps, some bonds, thinly traded). Matters especially for frequent trading.'
  },
  {
    id: 'CFP-INV-B10-014',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Reporting',
    subtopic: 'Global Investment Performance Standards',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Global Investment Performance Standards (GIPS) are:',
    options: [
      'A) Required by SEC',
      'B) Voluntary ethical standards for consistent and comparable performance reporting by investment firms',
      'C) Tax reporting requirements',
      'D) Only for mutual funds'
    ],
    correctAnswer: 1,
    explanation: 'GIPS: voluntary global standards promoting fair representation and full disclosure in performance reporting. Administered by CFA Institute. Requirements include: time-weighted returns, composites of all discretionary portfolios, specific disclosure standards, verification requirements. Claiming GIPS compliance signals commitment to transparent, comparable reporting.'
  },
  {
    id: 'CFP-INV-B10-015',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Trading',
    subtopic: 'Market Orders vs Limit Orders',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A limit order differs from a market order in that:',
    options: [
      'A) Limit orders always execute faster',
      'B) Limit orders specify maximum buy or minimum sell price, ensuring price but not execution',
      'C) Market orders are never used',
      'D) Limit orders cost more in commissions'
    ],
    correctAnswer: 1,
    explanation: 'Market order: executes immediately at best available price—certainty of execution, not price. Limit order: specifies price—buy limit (max price to pay) or sell limit (min price to accept). May not execute if price you want isn\'t reached. Use limits for: illiquid securities, volatile markets, specific entry/exit points. Markets for: immediate execution priority.'
  },
  // Additional Topics
  {
    id: 'CFP-INV-B10-016',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Systematic vs Unsystematic Risk',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Unsystematic (idiosyncratic) risk:',
    options: [
      'A) Cannot be reduced',
      'B) Is company or industry-specific risk that can be eliminated through diversification',
      'C) Affects all stocks equally',
      'D) Determines risk premium'
    ],
    correctAnswer: 1,
    explanation: 'Unsystematic/company-specific risk: factors unique to individual companies (management, products, competition). Diversifiable—holding more securities reduces this risk toward zero. Systematic/market risk: affects all securities (interest rates, recessions, inflation)—can\'t be diversified away. Investors are compensated only for systematic risk.'
  },
  {
    id: 'CFP-INV-B10-017',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Asset Classes',
    subtopic: 'High-Yield Bonds',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'High-yield (junk) bonds typically exhibit:',
    options: [
      'A) Very low volatility',
      'B) Higher yields compensating for greater default risk, with returns correlated more with equities than investment-grade bonds',
      'C) Guaranteed returns',
      'D) Government backing'
    ],
    correctAnswer: 1,
    explanation: 'High-yield bonds (below BBB-/Baa3): higher interest rates (spread over Treasuries) compensating for default risk. Behave more like stocks in stressed markets—correlations increase with equities. Can enhance returns but provide less diversification from stocks than investment-grade bonds. Defaults rise in recessions. Spread analysis helps assess relative value.'
  },
  {
    id: 'CFP-INV-B10-018',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Valuation',
    subtopic: 'Free Cash Flow',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Free cash flow (FCF) is important for valuation because:',
    options: [
      'A) It equals net income',
      'B) It represents cash available to pay creditors and shareholders after funding operations and capital expenditures',
      'C) It ignores working capital',
      'D) It\'s reported directly on income statements'
    ],
    correctAnswer: 1,
    explanation: 'FCF = Operating cash flow - Capital expenditures. It\'s the cash available for: dividends, share buybacks, debt repayment, acquisitions. Unlike earnings, FCF is harder to manipulate and represents actual cash generation. Positive FCF: company can reinvest, return capital, or pay down debt. Negative FCF: may need external financing. Key metric for DCF valuation.'
  },
  {
    id: 'CFP-INV-B10-019',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Portfolio Management',
    subtopic: 'Risk Parity',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Risk parity portfolio construction:',
    options: [
      'A) Weights assets equally',
      'B) Allocates so each asset class contributes equally to total portfolio risk, often resulting in higher bond allocations',
      'C) Maximizes returns regardless of risk',
      'D) Uses only stocks'
    ],
    correctAnswer: 1,
    explanation: 'Risk parity: balance portfolio by risk contribution, not dollar amount. Since stocks are more volatile than bonds, equal risk contribution requires more bonds. Often uses leverage on bonds to achieve desired return. Result: more diversified risk profile, potentially smoother returns. Popular after 2008 when stock-heavy portfolios suffered. Bridgewater\'s All Weather is famous example.'
  },
  {
    id: 'CFP-INV-B10-020',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Reporting',
    subtopic: 'After-Tax Returns',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'After-tax return reporting for mutual funds:',
    options: [
      'A) Is not required',
      'B) Shows returns after taxes on distributions and after taxes on distributions plus sale, using standardized assumptions',
      'C) Uses actual investor taxes',
      'D) Only for tax-exempt funds'
    ],
    correctAnswer: 1,
    explanation: 'SEC requires mutual funds to report: pre-tax returns, after-tax returns on distributions (assuming you hold), after-tax returns on distributions and sale (assuming you sell). Uses highest marginal tax rates. Helps compare tax efficiency across funds. Important because taxes are often largest cost for taxable investors—even beyond expense ratios.'
  },
  {
    id: 'CFP-INV-B10-021',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Behavioral Asset Pricing',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Behavioral finance challenges efficient market theory by:',
    options: [
      'A) Proving markets are always efficient',
      'B) Documenting systematic investor biases that create predictable mispricings the EMH should eliminate',
      'C) Ignoring all research',
      'D) Focusing only on technical analysis'
    ],
    correctAnswer: 1,
    explanation: 'Behavioral finance: investors aren\'t always rational—cognitive biases (overconfidence, loss aversion, herding) create predictable patterns. Anomalies (momentum, value, size effects) persist despite being known—suggesting limits to arbitrage. Doesn\'t mean markets are easily beaten, but challenges the pure EMH view. Practical implication: behavior management matters as much as portfolio optimization.'
  },
  {
    id: 'CFP-INV-B10-022',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Asset Classes',
    subtopic: 'Preferred Stock',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Preferred stock characteristics include:',
    options: [
      'A) Voting rights like common stock',
      'B) Fixed dividends with priority over common stock, but subordinate to bonds and usually without voting rights',
      'C) Guaranteed dividends',
      'D) Short-term maturity'
    ],
    correctAnswer: 1,
    explanation: 'Preferred stock: hybrid—fixed dividend like bonds, equity treatment for issuers. Priority over common for dividends and liquidation, but subordinate to all debt. Usually no voting rights. Cumulative: missed dividends accumulate. Callable often. Interest rate sensitive like bonds. Qualified dividends for individuals in taxable accounts.'
  },
  {
    id: 'CFP-INV-B10-023',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Analysis',
    subtopic: 'DuPont Analysis',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The DuPont analysis breaks ROE into:',
    options: [
      'A) Only profit margin',
      'B) Profit margin × Asset turnover × Financial leverage, showing how profitability, efficiency, and leverage contribute',
      'C) P/E and P/B ratios',
      'D) Growth and value factors'
    ],
    correctAnswer: 1,
    explanation: 'DuPont ROE decomposition: (Net Income/Sales) × (Sales/Assets) × (Assets/Equity). Shows whether high ROE comes from: operational profitability (margin), asset utilization (turnover), or leverage. Same ROE can result from very different business models. Helps identify sources of return and analyze quality of earnings.'
  },
  {
    id: 'CFP-INV-B10-024',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Portfolio Management',
    subtopic: 'Glide Path',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A target-date fund\'s glide path refers to:',
    options: [
      'A) Daily trading patterns',
      'B) The predetermined reduction in equity allocation as the target retirement date approaches',
      'C) Fee reductions over time',
      'D) Manager changes'
    ],
    correctAnswer: 1,
    explanation: 'Glide path: how asset allocation shifts over time in target-date funds. Typically reduces equities as retirement approaches (e.g., 90% stocks at 30 years out → 40% at retirement). "To" funds stop at target, "through" funds continue de-risking past retirement. Glide paths vary significantly between fund families—compare carefully.'
  },
  {
    id: 'CFP-INV-B10-025',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Trading',
    subtopic: 'Settlement',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Standard settlement for U.S. equity trades is:',
    options: [
      'A) Same day (T+0)',
      'B) T+1 (one business day after trade date)',
      'C) T+3 (three business days)',
      'D) One week after trade'
    ],
    correctAnswer: 1,
    explanation: 'U.S. equity settlement moved to T+1 in May 2024 (formerly T+2). Settlement = when ownership and cash actually transfer. T+1: trade Monday, settle Tuesday. Implications: need funds/securities available quickly, margin requirements, short selling rules. Corporate bonds: T+2. Government securities and some mutual funds: T+1 or same day.'
  }
];
