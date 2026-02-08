/**
 * CFP Investment Questions - Batch 11
 * Domain 4: Investment Planning (17% of exam)
 * 25 additional questions covering investment planning topics
 */

import { Question } from '../../../types';

export const CFP_INVESTMENTS_BATCH11_QUESTIONS: Question[] = [
  // INV-1: Investment Concepts
  {
    id: 'CFP-INV-B11-001',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Concepts',
    subtopic: 'Information Ratio',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The information ratio measures:',
    options: [
      'A) Total return only',
      'B) Active return relative to tracking error, showing how much excess return is generated per unit of active risk',
      'C) Absolute risk',
      'D) Market correlation'
    ],
    correctAnswer: 1,
    explanation: 'Information ratio = (Portfolio return - Benchmark return) / Tracking error. Higher is better—more excess return per unit of active risk taken. Used for evaluating active managers against their benchmark. Unlike Sharpe (uses total risk), IR isolates active management skill. IR > 0.5 considered good; > 1.0 excellent.'
  },
  {
    id: 'CFP-INV-B11-002',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Concepts',
    subtopic: 'Holding Period Return',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Holding Period Return (HPR) is calculated as:',
    options: [
      'A) Only price change',
      'B) (Ending value - Beginning value + Income) / Beginning value, capturing total return over the period',
      'C) Annualized return only',
      'D) Risk-adjusted return'
    ],
    correctAnswer: 1,
    explanation: 'HPR = (Ending value - Beginning value + Income) / Beginning value. Total return over any holding period. Includes: price appreciation/depreciation, dividends, interest. Not annualized—if held 6 months, HPR is 6-month return. To compare different periods, must annualize. Simple but fundamental return calculation.'
  },
  {
    id: 'CFP-INV-B11-003',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Concepts',
    subtopic: 'Geometric vs Arithmetic',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When reporting historical investment performance:',
    options: [
      'A) Arithmetic mean is always used',
      'B) Geometric mean should be used as it accounts for compounding and shows actual growth experience',
      'C) Both are identical',
      'D) Neither is meaningful'
    ],
    correctAnswer: 1,
    explanation: 'Geometric mean: compound growth rate. If you had $100, geometric mean shows actual ending value. Arithmetic mean overstates—doesn\'t account for volatility drag. Example: +50%, -50% → arithmetic mean = 0%, but geometric mean = -13.4% (actual result: $75). Use geometric for historical performance, arithmetic for forecasting expected returns.'
  },
  // INV-2: Asset Types
  {
    id: 'CFP-INV-B11-004',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Asset Types',
    subtopic: 'Covered Calls',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Writing covered calls on owned stock:',
    options: [
      'A) Eliminates all downside risk',
      'B) Generates income but limits upside potential because shares may be called away at the strike price',
      'C) Requires margin',
      'D) Increases volatility exposure'
    ],
    correctAnswer: 1,
    explanation: 'Covered call: own stock, sell call option against it. Receive premium income (lowers cost basis). Trade-off: if stock rises above strike, shares called away—miss upside beyond that. Downside: still exposed to decline minus premium received. Best in: flat or slightly bullish markets, when willing to sell at strike. Income strategy, not growth.'
  },
  {
    id: 'CFP-INV-B11-005',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Asset Types',
    subtopic: 'Protective Put',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A protective put strategy:',
    options: [
      'A) Generates income',
      'B) Limits downside loss while maintaining upside potential, acting as portfolio insurance',
      'C) Requires selling stock',
      'D) Increases risk substantially'
    ],
    correctAnswer: 1,
    explanation: 'Protective put: own stock, buy put option. Creates floor—maximum loss = stock price - strike + premium paid. Keep all upside above purchase cost + premium. Like insurance: pay premium for protection. Cost is the premium (reduces return if market doesn\'t decline). Useful for concentrated positions or before uncertain events.'
  },
  {
    id: 'CFP-INV-B11-006',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Asset Types',
    subtopic: 'Zero-Coupon Bonds',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Zero-coupon bonds:',
    options: [
      'A) Pay interest annually',
      'B) Are sold at a discount and mature at face value, with phantom income taxed annually for taxable accounts',
      'C) Have no interest rate risk',
      'D) Are only issued by corporations'
    ],
    correctAnswer: 1,
    explanation: 'Zero-coupon: no periodic interest. Bought at discount (e.g., $600), matures at par ($1,000). Return = difference over time. Tax: imputed interest taxed annually even though no cash received (phantom income). Best in tax-deferred accounts. Higher duration/interest rate sensitivity than coupon bonds of same maturity. Good for matching specific future liabilities.'
  },
  // INV-3: Portfolio Management
  {
    id: 'CFP-INV-B11-007',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Management',
    subtopic: 'Core-Satellite',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A core-satellite portfolio approach:',
    options: [
      'A) Uses only active management',
      'B) Combines a low-cost indexed core with actively managed or alternative satellites seeking outperformance',
      'C) Uses only one asset class',
      'D) Avoids diversification'
    ],
    correctAnswer: 1,
    explanation: 'Core-satellite: index funds in core (70-80%—low cost, market exposure) + active/alternative satellites (20-30%—seeking alpha). Core provides: market return, diversification, low cost. Satellites may add: potential outperformance, tactical tilts, alternatives. Balances passive efficiency with active opportunities. Manage cost/expectations for satellite portion.'
  },
  {
    id: 'CFP-INV-B11-008',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Management',
    subtopic: 'Factor Investing',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Factor investing targets exposure to:',
    options: [
      'A) Only market beta',
      'B) Specific characteristics associated with returns, such as value, momentum, quality, or low volatility',
      'C) Individual stocks only',
      'D) Sector allocation'
    ],
    correctAnswer: 1,
    explanation: 'Factor investing: target specific return drivers beyond market beta. Common factors: value (cheap stocks), momentum (recent winners), quality (profitable, stable), low volatility (less volatile stocks), size (small cap). Academic research shows factor premiums over time. Can implement via smart beta ETFs. Factors can underperform for extended periods—requires patience.'
  },
  {
    id: 'CFP-INV-B11-009',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Management',
    subtopic: 'Risk Parity',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A risk parity portfolio allocates based on:',
    options: [
      'A) Equal dollar amounts',
      'B) Equal risk contribution from each asset class, often using leverage on lower-volatility assets',
      'C) Maximum returns',
      'D) Minimum volatility'
    ],
    correctAnswer: 1,
    explanation: 'Risk parity: allocate so each asset class contributes equally to portfolio risk. Traditional 60/40: stocks dominate risk (~90%). Risk parity: overweight bonds (lower vol), may use leverage. Pros: better diversification of risk sources. Cons: leverage costs, interest rate sensitivity, complexity. Popularized by Bridgewater\'s All Weather. Research both approach for understanding.'
  },
  // INV-4: Valuation
  {
    id: 'CFP-INV-B11-010',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Valuation',
    subtopic: 'Enterprise Value',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Enterprise Value (EV) is calculated as:',
    options: [
      'A) Market cap only',
      'B) Market cap plus debt minus cash, representing the total value to acquire the entire business',
      'C) Book value of equity',
      'D) Net income times P/E'
    ],
    correctAnswer: 1,
    explanation: 'EV = Market cap + Total debt - Cash. Acquirer pays for equity, assumes debt, gets cash. More complete valuation than market cap—reflects capital structure. EV/EBITDA: common valuation metric for comparing companies with different leverage. Lower EV/EBITDA may signal value. Use with other metrics for complete analysis.'
  },
  {
    id: 'CFP-INV-B11-011',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Valuation',
    subtopic: 'PEG Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The PEG ratio adjusts P/E by:',
    options: [
      'A) Dividing by dividend yield',
      'B) Dividing by expected earnings growth rate to assess value relative to growth prospects',
      'C) Multiplying by book value',
      'D) Subtracting debt'
    ],
    correctAnswer: 1,
    explanation: 'PEG = P/E ÷ Expected earnings growth rate. Adjusts for growth—high P/E may be justified if growth is high. PEG < 1: potentially undervalued relative to growth. PEG > 1: may be overvalued. Limitations: growth assumptions may be wrong, doesn\'t work for low/negative growth. Complement with other analysis. Peter Lynch popularized this metric.'
  },
  {
    id: 'CFP-INV-B11-012',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Valuation',
    subtopic: 'Free Cash Flow Yield',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Free cash flow yield is a useful valuation metric because:',
    options: [
      'A) It ignores capital expenditures',
      'B) It shows cash available to investors relative to price, which is harder to manipulate than earnings',
      'C) It only measures dividends',
      'D) It uses book value'
    ],
    correctAnswer: 1,
    explanation: 'FCF Yield = Free cash flow / Market cap (or price). Higher is better—more cash per dollar invested. FCF = Operating cash flow - CapEx. Advantages over earnings: cash is real, harder to manipulate with accounting. Low FCF yield may indicate overvaluation or high reinvestment. Compare within industries—capital intensity varies.'
  },
  // INV-5: Investment Vehicles
  {
    id: 'CFP-INV-B11-013',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Investment Vehicles',
    subtopic: 'Interval Funds',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Interval funds differ from open-end mutual funds in that:',
    options: [
      'A) They trade on exchanges',
      'B) They only allow redemptions at specified intervals, allowing investment in less liquid assets',
      'C) They have no fees',
      'D) They\'re only for institutions'
    ],
    correctAnswer: 1,
    explanation: 'Interval funds: closed-end structure but registered under 1940 Act. Quarterly/semi-annual redemption windows (typically 5-25% of shares). Can invest in illiquid assets (private credit, real estate) without daily liquidity pressure. Lower liquidity than mutual funds. May offer higher yields from illiquidity premium. Understand redemption limits before investing.'
  },
  {
    id: 'CFP-INV-B11-014',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Investment Vehicles',
    subtopic: 'Fund of Funds',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A fund of funds invests in:',
    options: [
      'A) Individual stocks only',
      'B) Other investment funds, providing diversification across managers but adding an additional layer of fees',
      'C) Bonds only',
      'D) Real estate directly'
    ],
    correctAnswer: 1,
    explanation: 'Fund of funds: invests in underlying funds rather than securities. Benefits: instant diversification, professional manager selection, access to otherwise inaccessible funds. Drawbacks: double layer of fees (fund + underlying), tax inefficiency, may overdiversify. Common in: hedge funds, target-date funds, some alternatives. Evaluate fees carefully.'
  },
  {
    id: 'CFP-INV-B11-015',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Investment Vehicles',
    subtopic: 'Buffer ETFs',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Defined outcome or buffer ETFs:',
    options: [
      'A) Guarantee returns',
      'B) Use options to provide downside protection up to a buffer level while capping upside gains',
      'C) Track the market exactly',
      'D) Have no expense ratio'
    ],
    correctAnswer: 1,
    explanation: 'Buffer ETFs: use options to provide defined outcomes. Example: 10% downside buffer (protected against first 10% loss), capped upside (e.g., 15%). Outcome period typically 1 year. Trade-off: pay for protection with upside cap. Entry timing matters—buffer/cap reset based on entry point. Growing product category for risk-averse investors wanting equity exposure.'
  },
  // Additional Topics
  {
    id: 'CFP-INV-B11-016',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Concepts',
    subtopic: 'Convexity',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Bond convexity describes:',
    options: [
      'A) Linear price changes',
      'B) The curvature of the price-yield relationship, where positive convexity means prices rise more than duration predicts when yields fall',
      'C) Credit risk only',
      'D) Maturity date changes'
    ],
    correctAnswer: 1,
    explanation: 'Convexity: second derivative of price-yield relationship. Duration is linear approximation—convexity is the curve. Positive convexity: price rises more when rates fall than it falls when rates rise. Greater convexity = better for investor. Callable bonds have negative convexity at low rates. More important for larger rate changes. Adds precision to duration analysis.'
  },
  {
    id: 'CFP-INV-B11-017',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Asset Types',
    subtopic: 'Preferred Stock',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Preferred stock has characteristics of both stocks and bonds because:',
    options: [
      'A) It trades on options exchanges',
      'B) It pays fixed dividends like bonds but represents equity ownership with no maturity date',
      'C) It\'s convertible always',
      'D) It has voting rights'
    ],
    correctAnswer: 1,
    explanation: 'Preferred stock: hybrid security. Bond-like: fixed dividend rate, priority over common, prices sensitive to interest rates. Stock-like: equity on balance sheet, no maturity (usually), dividends not guaranteed. Usually no voting rights. Types: cumulative, convertible, callable. Qualified dividend treatment possible. Higher yield than common, less appreciation potential.'
  },
  {
    id: 'CFP-INV-B11-018',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Management',
    subtopic: 'Monte Carlo in Investing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Monte Carlo simulation for portfolio planning:',
    options: [
      'A) Uses only historical returns',
      'B) Runs thousands of random market scenarios to estimate probability of meeting financial goals',
      'C) Guarantees outcomes',
      'D) Ignores volatility'
    ],
    correctAnswer: 1,
    explanation: 'Monte Carlo: simulates thousands of possible future paths using randomized returns based on assumed distributions. Shows probability of success—e.g., 85% chance of not running out of money. Better than deterministic projections—incorporates uncertainty. Limitations: assumptions matter, false precision, may not capture extreme events. Tool for understanding range of outcomes.'
  },
  {
    id: 'CFP-INV-B11-019',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Valuation',
    subtopic: 'Relative Valuation',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Relative valuation compares a stock\'s metrics to:',
    options: [
      'A) Its own intrinsic value only',
      'B) Industry peers, sector averages, or historical norms to assess whether it appears cheap or expensive',
      'C) Bond yields only',
      'D) GDP growth'
    ],
    correctAnswer: 1,
    explanation: 'Relative valuation: compare to peers, sector, history, or market. Common metrics: P/E, P/B, P/S, EV/EBITDA. Lower than peers may indicate: value opportunity, or lower quality/growth. Advantages: simple, widely used. Limitations: entire sector could be over/undervalued, doesn\'t determine intrinsic value. Complement with absolute valuation methods.'
  },
  {
    id: 'CFP-INV-B11-020',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Investment Vehicles',
    subtopic: 'ETF Creation/Redemption',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The creation/redemption mechanism in ETFs:',
    options: [
      'A) Only affects mutual funds',
      'B) Allows authorized participants to arbitrage price differences, keeping ETF prices close to NAV and providing tax efficiency',
      'C) Creates taxable events daily',
      'D) Is available to all investors'
    ],
    correctAnswer: 1,
    explanation: 'Creation/redemption: APs (large institutions) can exchange ETF shares for underlying securities (in-kind). Arbitrage mechanism: if ETF trades at premium, APs create shares; at discount, they redeem. Keeps price near NAV. Tax efficiency: in-kind redemptions avoid selling securities (no capital gains). Key ETF advantage over mutual funds. Retail investors buy/sell on exchange.'
  },
  {
    id: 'CFP-INV-B11-021',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Concepts',
    subtopic: 'Maximum Drawdown',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Maximum drawdown measures:',
    options: [
      'A) Average loss only',
      'B) The largest peak-to-trough decline before a new peak, indicating worst-case loss experience',
      'C) Standard deviation',
      'D) Beta coefficient'
    ],
    correctAnswer: 1,
    explanation: 'Maximum drawdown: largest percentage decline from peak to subsequent trough. Shows: How much you could have lost at the worst time. Important for: risk-averse investors, retirees, understanding strategy risk. S&P 500: ~50% max drawdown in 2007-2009. Recovery time matters too. More intuitive risk measure than standard deviation for many clients.'
  },
  {
    id: 'CFP-INV-B11-022',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Asset Types',
    subtopic: 'Structured Notes',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Structured notes combine:',
    options: [
      'A) Only stocks and bonds',
      'B) A debt instrument with embedded derivatives to create customized risk-return profiles',
      'C) Two stocks only',
      'D) Mutual funds'
    ],
    correctAnswer: 1,
    explanation: 'Structured notes: debt obligation + derivatives. Examples: principal-protected notes, equity-linked notes, barrier notes. Can create: downside protection, enhanced yield, leveraged exposure. Risks: issuer credit risk, complexity, illiquidity, high fees, may have caps/barriers. Often sold by banks. Understand payoff structure fully—not simple investments.'
  },
  {
    id: 'CFP-INV-B11-023',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Portfolio Management',
    subtopic: 'Currency Hedging',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Currency hedging in international portfolios:',
    options: [
      'A) Always increases returns',
      'B) Reduces currency fluctuation impact but doesn\'t eliminate it and has costs, with varying effects over different periods',
      'C) Is required by law',
      'D) Only applies to bonds'
    ],
    correctAnswer: 1,
    explanation: 'Currency hedging: reduces impact of exchange rate movements on returns. Methods: forward contracts, currency ETFs. Considerations: costs (interest rate differentials, transaction costs), perfect hedging difficult, may reduce diversification benefit. Short-term: currency adds volatility. Long-term: may mean-revert. Partial hedging common. Bond portfolios often hedged; equities debatable.'
  },
  {
    id: 'CFP-INV-B11-024',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Valuation',
    subtopic: 'Sum of the Parts',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Sum-of-the-parts valuation is useful for:',
    options: [
      'A) Single-product companies',
      'B) Conglomerates or companies with distinct business segments that may be undervalued as a whole',
      'C) Startups only',
      'D) Municipal bonds'
    ],
    correctAnswer: 1,
    explanation: 'Sum-of-the-parts (SOTP): value each business segment separately, then sum. Used for: conglomerates, companies with diverse segments, potential breakup targets. May reveal: conglomerate discount (whole worth less than parts), hidden value. Apply appropriate valuation method to each segment. If SOTP > market cap, may be undervalued or breakup candidate.'
  },
  {
    id: 'CFP-INV-B11-025',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Investment Vehicles',
    subtopic: 'Tax-Managed Funds',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Tax-managed mutual funds and ETFs:',
    options: [
      'A) Eliminate all taxes',
      'B) Employ strategies to minimize taxable distributions through loss harvesting, low turnover, and avoiding short-term gains',
      'C) Are only for retirement accounts',
      'D) Have higher turnover'
    ],
    correctAnswer: 1,
    explanation: 'Tax-managed funds: optimize after-tax returns. Strategies: harvest losses to offset gains, minimize turnover (reduce realization), avoid short-term gains (higher tax rates), consider tax lots when selling. Best for taxable accounts—no benefit in tax-deferred. Compare after-tax returns, not just pre-tax. May slightly underperform pre-tax but outperform after-tax.'
  }
];
