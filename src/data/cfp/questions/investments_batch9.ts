/**
 * CFP Investments Questions - Batch 9
 * Domain 4: Investment Planning (17% of exam)
 * 25 additional questions covering investment topics
 */

import { Question } from '../../../types';

export const CFP_INVESTMENTS_BATCH9_QUESTIONS: Question[] = [
  // INV-1: Investment Theory
  {
    id: 'CFP-INV-B9-001',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Behavioral Finance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The disposition effect causes investors to:',
    options: [
      'A) Hold concentrated positions',
      'B) Sell winning investments too quickly while holding losing investments too long',
      'C) Buy only domestic securities',
      'D) Ignore dividends'
    ],
    correctAnswer: 1,
    explanation: 'The disposition effect combines loss aversion and mental accounting: gains are realized quickly ("lock in profits") while losses are held hoping for recovery ("it\'s not a loss until I sell"). This leads to suboptimal tax outcomes (harvesting gains, not losses) and poor portfolio decisions.'
  },
  {
    id: 'CFP-INV-B9-002',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Risk-Free Rate',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The risk-free rate used in investment analysis typically refers to:',
    options: [
      'A) Corporate bond yields',
      'B) The return on short-term U.S. Treasury securities, representing return with minimal default and inflation risk',
      'C) S&P 500 returns',
      'D) Bank savings rates'
    ],
    correctAnswer: 1,
    explanation: 'The risk-free rate is the theoretical return of an investment with zero risk. U.S. Treasury bills (or similar government securities) are used as proxies—minimal default risk (full faith and credit) and short maturities minimize inflation/interest rate risk. It anchors the expected return calculation for risky assets.'
  },
  {
    id: 'CFP-INV-B9-003',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Market Anomalies',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Market anomalies that challenge efficient market hypothesis include:',
    options: [
      'A) Only random pricing',
      'B) The January effect, momentum, value premium, and small-cap premium that persist despite being documented',
      'C) Perfect market efficiency',
      'D) No price patterns'
    ],
    correctAnswer: 1,
    explanation: 'Anomalies are patterns inconsistent with pure market efficiency: January effect (small stocks outperform in January), momentum (recent winners continue winning short-term), value premium (high book-to-market outperforms), size premium (small caps outperform long-term). Debate continues whether these represent risk premiums or true inefficiencies.'
  },
  // INV-2: Portfolio Theory
  {
    id: 'CFP-INV-B9-004',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Portfolio Theory',
    subtopic: 'Capital Market Line',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The Capital Market Line (CML) represents:',
    options: [
      'A) All possible portfolios',
      'B) The risk-return trade-off for efficient portfolios that combine the risk-free asset with the market portfolio',
      'C) Only stock investments',
      'D) Individual security prices'
    ],
    correctAnswer: 1,
    explanation: 'The CML plots expected return vs. total risk (standard deviation) for combinations of the risk-free asset and market portfolio. It\'s the most efficient set of portfolios—any point below the line is suboptimal. Slope = (Market Return - Risk-Free Rate) / Market Std Dev = Sharpe Ratio of market portfolio.'
  },
  {
    id: 'CFP-INV-B9-005',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Portfolio Theory',
    subtopic: 'Security Market Line',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The Security Market Line (SML) differs from the CML in that it:',
    options: [
      'A) Uses total risk',
      'B) Plots expected return vs. beta (systematic risk), showing the required return for any security based on its market risk',
      'C) Only applies to portfolios',
      'D) Ignores the risk-free rate'
    ],
    correctAnswer: 1,
    explanation: 'SML uses beta (systematic risk), not total risk. It plots individual securities and portfolios: Expected Return = Risk-Free + β(Market Risk Premium). Securities above the SML are undervalued (return exceeds what beta implies); below are overvalued. CAPM generates the SML relationship.'
  },
  {
    id: 'CFP-INV-B9-006',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Portfolio Theory',
    subtopic: 'Tracking Error',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Tracking error measures:',
    options: [
      'A) Total portfolio return',
      'B) The standard deviation of the difference between portfolio returns and benchmark returns',
      'C) Average market return',
      'D) Individual stock volatility'
    ],
    correctAnswer: 1,
    explanation: 'Tracking error quantifies how closely a portfolio follows its benchmark. High tracking error = significant deviation (active management). Low tracking error = close benchmark replication (index funds). Index funds target very low tracking error; active managers accept higher tracking error seeking alpha.'
  },
  // INV-3: Asset Classes
  {
    id: 'CFP-INV-B9-007',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Asset Classes',
    subtopic: 'TIPS',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Treasury Inflation-Protected Securities (TIPS) provide:',
    options: [
      'A) Tax-free returns',
      'B) Principal adjusted for inflation (CPI), with fixed coupon rate applied to the adjusted principal',
      'C) Higher yields than nominal Treasuries',
      'D) Variable interest rates'
    ],
    correctAnswer: 1,
    explanation: 'TIPS principal adjusts with CPI—both up (inflation) and down (deflation, with floor at original principal). The coupon is fixed but applied to adjusted principal, so payments increase with inflation. Provides real return certainty. Taxation includes phantom income on principal adjustments even before maturity.'
  },
  {
    id: 'CFP-INV-B9-008',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Asset Classes',
    subtopic: 'Private Equity',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Private equity investments typically:',
    options: [
      'A) Trade on public exchanges',
      'B) Involve owning shares in private companies, have multi-year lockups, and are suitable only for accredited investors',
      'C) Guarantee returns',
      'D) Are highly liquid'
    ],
    correctAnswer: 1,
    explanation: 'Private equity: investing in non-public companies. Structures include buyouts (acquiring existing companies), venture capital (early-stage), growth equity, and distressed investments. Characteristics: illiquid (10+ year lockups typical), high minimums, limited to accredited/qualified investors, capital calls, potential high returns with substantial risk.'
  },
  {
    id: 'CFP-INV-B9-009',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Asset Classes',
    subtopic: 'Convertible Securities',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Convertible bonds offer investors:',
    options: [
      'A) Only interest income',
      'B) Bond income with the option to convert to a fixed number of common shares, participating in stock appreciation',
      'C) Guaranteed conversion profits',
      'D) Higher yields than regular bonds'
    ],
    correctAnswer: 1,
    explanation: 'Convertibles are hybrid securities: bond features (coupon, maturity, priority in bankruptcy) plus equity option (convert to stock at set ratio). They typically yield less than straight bonds—investors pay for conversion privilege. Performance is bond-like when stock is low, equity-like when stock exceeds conversion price.'
  },
  // INV-4: Investment Strategies
  {
    id: 'CFP-INV-B9-010',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Strategies',
    subtopic: 'Tactical Asset Allocation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Tactical asset allocation differs from strategic allocation by:',
    options: [
      'A) Never changing the portfolio',
      'B) Making short-term adjustments to asset weights based on market conditions while maintaining long-term strategic targets',
      'C) Only investing in bonds',
      'D) Ignoring risk tolerance'
    ],
    correctAnswer: 1,
    explanation: 'Strategic allocation sets long-term targets based on goals and risk tolerance. Tactical makes temporary deviations—overweighting/underweighting based on perceived opportunities or risks. Example: reducing equity exposure if markets seem overvalued. Success requires skill in timing; many advisers stick to strategic-only.'
  },
  {
    id: 'CFP-INV-B9-011',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Strategies',
    subtopic: 'Bond Immunization',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Bond portfolio immunization involves:',
    options: [
      'A) Avoiding bonds entirely',
      'B) Matching portfolio duration to the investment horizon, protecting against interest rate changes affecting funds needed at a specific future date',
      'C) Only buying short-term bonds',
      'D) Maximizing yield'
    ],
    correctAnswer: 1,
    explanation: 'Immunization matches duration to time horizon. If rates rise, price losses are offset by higher reinvestment returns; if rates fall, lower reinvestment is offset by price gains. The portfolio value at horizon is preserved regardless of rate changes. Requires periodic rebalancing as duration shifts with time and rate changes.'
  },
  {
    id: 'CFP-INV-B9-012',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Strategies',
    subtopic: 'Direct Indexing',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Direct indexing offers advantages including:',
    options: [
      'A) Lower costs than ETFs',
      'B) Owning individual securities allows tax-loss harvesting on specific positions and customization of the index',
      'C) Guaranteed outperformance',
      'D) Simple implementation'
    ],
    correctAnswer: 1,
    explanation: 'Direct indexing: owning the underlying stocks rather than a fund. Benefits: harvest losses on individual positions throughout the year, customize exclusions (ESG, concentrated positions), potentially avoid embedded gains in funds. Drawbacks: complexity, higher costs (trading, management), typically requires significant portfolio ($100K+).'
  },
  // INV-5: Performance Measurement
  {
    id: 'CFP-INV-B9-013',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Performance',
    subtopic: 'Jensen\'s Alpha',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Jensen\'s alpha measures:',
    options: [
      'A) Total return only',
      'B) The excess return earned above what CAPM predicts given the portfolio\'s beta—positive alpha indicates outperformance',
      'C) Portfolio risk',
      'D) Market return'
    ],
    correctAnswer: 1,
    explanation: 'Alpha = Actual Return - [Risk-Free + β(Market Return - Risk-Free)]. It measures return above CAPM\'s expected return for the risk taken. Positive alpha = manager added value beyond market exposure. However, alpha can be negative (underperformance). Unlike Sharpe/Treynor, alpha is an absolute measure, not a ratio.'
  },
  {
    id: 'CFP-INV-B9-014',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Performance',
    subtopic: 'Sortino Ratio',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The Sortino ratio differs from the Sharpe ratio by:',
    options: [
      'A) Using total volatility',
      'B) Only penalizing downside volatility below a target return, rather than all volatility',
      'C) Ignoring returns',
      'D) Using beta instead of standard deviation'
    ],
    correctAnswer: 1,
    explanation: 'Sortino ratio = (Return - Target) / Downside Deviation. Unlike Sharpe (which penalizes all volatility), Sortino only penalizes downside volatility—upside "volatility" is good! This better reflects investor concerns about losses. Higher Sortino indicates better risk-adjusted returns when risk is measured as downside only.'
  },
  {
    id: 'CFP-INV-B9-015',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Performance',
    subtopic: 'Attribution Analysis',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Performance attribution analysis decomposes returns into:',
    options: [
      'A) Gains and losses only',
      'B) Components like asset allocation decisions, security selection, and interaction effects relative to a benchmark',
      'C) Total return only',
      'D) Calendar year results'
    ],
    correctAnswer: 1,
    explanation: 'Attribution identifies return sources: asset allocation effect (sector weights vs. benchmark), security selection effect (individual security picks within sectors), and interaction (combined effect). This helps evaluate whether manager skill is in allocation or selection, and which decisions added or subtracted value.'
  },
  // Additional Topics
  {
    id: 'CFP-INV-B9-016',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Mean Reversion',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Mean reversion in investments suggests that:',
    options: [
      'A) Prices always go up',
      'B) Returns and prices tend to return toward their long-term average over time',
      'C) Markets are always efficient',
      'D) Diversification doesn\'t work'
    ],
    correctAnswer: 1,
    explanation: 'Mean reversion: extremes tend to normalize over time. High P/E ratios suggest lower future returns; low valuations suggest higher returns. This underlies contrarian strategies. It doesn\'t mean timing is easy—deviation from mean can persist for years. Also applies to individual securities, sectors, and even volatility.'
  },
  {
    id: 'CFP-INV-B9-017',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Portfolio Theory',
    subtopic: 'Correlation Over Time',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Asset class correlations during market crises often:',
    options: [
      'A) Decrease, improving diversification',
      'B) Increase, as investors sell risky assets indiscriminately, reducing diversification benefits when most needed',
      'C) Remain constant',
      'D) Become negative'
    ],
    correctAnswer: 1,
    explanation: 'Correlation instability is crucial for planning: correlations measured in normal times may increase during crises. "Flight to quality" means risky assets decline together while safe havens rise. This reduces diversification precisely when it\'s most needed. Stress testing should assume higher crisis correlations.'
  },
  {
    id: 'CFP-INV-B9-018',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Asset Classes',
    subtopic: 'Agency Bonds',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Agency bonds issued by government-sponsored enterprises (GSEs) like Fannie Mae:',
    options: [
      'A) Are guaranteed by the U.S. government',
      'B) Have implicit government backing but are not explicitly guaranteed, offering slightly higher yields than Treasuries',
      'C) Are tax-exempt',
      'D) Have no credit risk'
    ],
    correctAnswer: 1,
    explanation: 'GSE bonds (Fannie Mae, Freddie Mac, Federal Home Loan Banks) have implicit—not explicit—government backing. During 2008 crisis, government did support GSEs. They typically yield slightly more than Treasuries due to the technical lack of guarantee. Some agency securities (Government National Mortgage Association) are explicitly backed.'
  },
  {
    id: 'CFP-INV-B9-019',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Strategies',
    subtopic: 'Dividend Capture',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A dividend capture strategy attempts to:',
    options: [
      'A) Avoid dividends',
      'B) Buy stocks before ex-dividend date to receive dividends, then sell shortly after, collecting dividends across multiple positions',
      'C) Hold stocks for years',
      'D) Invest only in bonds'
    ],
    correctAnswer: 1,
    explanation: 'Dividend capture: buy before ex-dividend, sell after. Theoretically, stock price drops by dividend amount on ex-date, so profit comes from the price not falling by the full amount. High transaction costs, tax implications (short-term vs. qualified dividends), and price volatility make this strategy difficult to execute profitably.'
  },
  {
    id: 'CFP-INV-B9-020',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Performance',
    subtopic: 'Time vs Dollar Weighting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Time-weighted return is preferred over dollar-weighted for manager evaluation because it:',
    options: [
      'A) Always produces higher returns',
      'B) Eliminates the impact of client cash flows, which are outside the manager\'s control',
      'C) Is simpler to calculate',
      'D) Includes all client contributions'
    ],
    correctAnswer: 1,
    explanation: 'Time-weighted: geometrically links sub-period returns, neutralizing cash flow timing. Dollar-weighted (IRR) includes cash flow timing effects. A manager receiving large inflows before a down period would show lower dollar-weighted returns despite the same investment skill. GIPS standards require time-weighted for performance reporting.'
  },
  {
    id: 'CFP-INV-B9-021',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Monte Carlo Simulation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Monte Carlo simulation in investment planning:',
    options: [
      'A) Predicts exact future returns',
      'B) Generates thousands of random scenarios based on assumed return and volatility parameters to estimate probability of outcomes',
      'C) Eliminates investment risk',
      'D) Is only for gambling analysis'
    ],
    correctAnswer: 1,
    explanation: 'Monte Carlo runs thousands of simulations with randomized returns within assumed parameters. Instead of a single deterministic projection, it produces a probability distribution of outcomes (e.g., 85% probability of not running out of money). It captures return sequence risk and helps stress-test plans, though results depend on input assumptions.'
  },
  {
    id: 'CFP-INV-B9-022',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Portfolio Theory',
    subtopic: 'Factor Investing',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Factor investing strategies target:',
    options: [
      'A) Maximum diversification only',
      'B) Specific characteristics (value, momentum, size, quality, low volatility) historically associated with excess returns',
      'C) Individual stock picking',
      'D) Market timing'
    ],
    correctAnswer: 1,
    explanation: 'Factors are characteristics explaining returns beyond market exposure. Common factors: value (cheap vs. expensive), size (small vs. large), momentum (recent performance), quality (profitability, low leverage), low volatility. Factor investing systematically tilts toward these characteristics, often through smart beta funds. Premiums aren\'t guaranteed and may underperform for extended periods.'
  },
  {
    id: 'CFP-INV-B9-023',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Asset Classes',
    subtopic: 'Structured Products',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Structured investment products typically:',
    options: [
      'A) Are simple to understand',
      'B) Combine derivatives with bonds to create customized payoffs, often with principal protection but capped upside',
      'C) Guarantee full market returns',
      'D) Have no fees'
    ],
    correctAnswer: 1,
    explanation: 'Structured products package derivatives with traditional securities for specific payoffs: principal protection, enhanced income, leveraged returns. Common types: equity-linked notes, structured CDs, principal-protected notes. Complexity, embedded costs, issuer credit risk, illiquidity, and cap on returns are concerns. Suitable only for investors understanding the trade-offs.'
  },
  {
    id: 'CFP-INV-B9-024',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Strategies',
    subtopic: 'Constant Proportion',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Constant proportion portfolio insurance (CPPI) strategy:',
    options: [
      'A) Keeps fixed asset allocation',
      'B) Increases equity exposure as the portfolio rises above a floor value and decreases when approaching the floor',
      'C) Always maintains 50/50 allocation',
      'D) Ignores market movements'
    ],
    correctAnswer: 1,
    explanation: 'CPPI: Cushion = Portfolio Value - Floor. Equity exposure = Multiplier × Cushion. As portfolio grows above floor, equity allocation increases; as it approaches floor, allocation decreases to protect principal. It\'s a dynamic strategy providing downside protection with upside participation. Can underperform in volatile, range-bound markets.'
  },
  {
    id: 'CFP-INV-B9-025',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Performance',
    subtopic: 'Drawdown Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Maximum drawdown analysis measures:',
    options: [
      'A) Average annual return',
      'B) The largest peak-to-trough decline before a new peak, indicating worst-case loss experience',
      'C) Standard deviation',
      'D) Beta'
    ],
    correctAnswer: 1,
    explanation: 'Maximum drawdown: the worst decline from any peak to subsequent trough. A portfolio hitting $100K, declining to $60K = 40% max drawdown. It captures what investors actually experience—the pain of watching portfolios decline. Particularly important for retirees taking distributions (sequence risk). Lower max drawdown suggests more consistent returns.'
  }
];
