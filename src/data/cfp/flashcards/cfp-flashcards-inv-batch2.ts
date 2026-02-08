/**
 * CFP Flashcards - Investment Planning Batch 2
 * 60 additional flashcards for Investment domain
 */

import { Flashcard } from './index';

export const CFP_FLASHCARDS_INV_BATCH2: Flashcard[] = [
  {
    id: 'FC-INV-011',
    domain: 'INV',
    category: 'Asset Classes',
    front: 'What are the MAJOR ASSET CLASSES?',
    back: 'Major Asset Classes:\n• EQUITIES: Stocks, equity funds\n• FIXED INCOME: Bonds, CDs, treasuries\n• CASH EQUIVALENTS: Money market, T-bills\n• REAL ESTATE: Property, REITs\n• COMMODITIES: Gold, oil, agriculture\n• ALTERNATIVES: Hedge funds, PE, crypto\n\nEach has different risk/return profiles',
    difficulty: 'easy',
    tags: ['asset-classes', 'basics', 'allocation']
  },
  {
    id: 'FC-INV-012',
    domain: 'INV',
    category: 'Asset Classes',
    front: 'What is the EQUITY RISK PREMIUM?',
    back: 'Equity Risk Premium (ERP):\n• Extra return expected from stocks over risk-free rate\n• Historical: ~5-7% annually\n• Compensation for equity volatility\n\nExpected Return = Risk-Free Rate + ERP\n\nHigher ERP = More attractive stocks\nVaries with market conditions',
    difficulty: 'medium',
    tags: ['equity', 'premium', 'risk-free']
  },
  {
    id: 'FC-INV-013',
    domain: 'INV',
    category: 'Modern Portfolio Theory',
    front: 'What is MODERN PORTFOLIO THEORY (MPT)?',
    back: 'Modern Portfolio Theory (Markowitz):\n• Diversification reduces portfolio risk\n• Investors are risk-averse\n• Optimal portfolios on efficient frontier\n\nKey Concepts:\n• Expected return\n• Standard deviation (risk)\n• Correlation between assets\n• Risk-free rate\n\nGoal: Maximum return for given risk level',
    difficulty: 'medium',
    tags: ['mpt', 'markowitz', 'portfolio']
  },
  {
    id: 'FC-INV-014',
    domain: 'INV',
    category: 'Modern Portfolio Theory',
    front: 'What is the EFFICIENT FRONTIER?',
    back: 'Efficient Frontier:\n• Curve of optimal portfolios\n• Maximum return for each risk level\n• Portfolios below are sub-optimal\n• Cannot achieve above without more risk\n\nMoving along frontier:\n• Right = Higher risk, higher return\n• Left = Lower risk, lower return\n\nAll rational investors choose frontier portfolios',
    difficulty: 'medium',
    tags: ['efficient-frontier', 'mpt', 'optimal']
  },
  {
    id: 'FC-INV-015',
    domain: 'INV',
    category: 'Risk Measures',
    front: 'What is STANDARD DEVIATION in investing?',
    back: 'Standard Deviation (σ):\n• Measures dispersion of returns\n• Higher σ = Higher volatility/risk\n• Most common risk measure\n\nDistribution:\n• 68% within ±1 σ\n• 95% within ±2 σ\n• 99.7% within ±3 σ\n\nMeasures TOTAL risk (systematic + unsystematic)',
    difficulty: 'medium',
    tags: ['standard-deviation', 'risk', 'volatility']
  },
  {
    id: 'FC-INV-016',
    domain: 'INV',
    category: 'Risk Measures',
    front: 'What is BETA?',
    back: 'Beta (β):\n• Measures systematic (market) risk\n• Sensitivity to market movements\n\nInterpretation:\n• β = 1.0: Moves with market\n• β > 1.0: More volatile than market\n• β < 1.0: Less volatile than market\n• β < 0: Moves opposite to market\n\nBeta of market = 1.0\nCannot diversify away systematic risk',
    difficulty: 'medium',
    tags: ['beta', 'systematic', 'risk']
  },
  {
    id: 'FC-INV-017',
    domain: 'INV',
    category: 'Risk Measures',
    front: 'What is ALPHA?',
    back: 'Alpha (α):\n• Excess return over expected (CAPM)\n• Measures manager skill\n\nPositive Alpha:\n• Outperformed risk-adjusted benchmark\n• "Beat the market"\n\nNegative Alpha:\n• Underperformed\n\nFormula: Actual Return - [Rf + β(Rm - Rf)]\n\nAfter fees, most funds have negative alpha',
    difficulty: 'medium',
    tags: ['alpha', 'performance', 'manager']
  },
  {
    id: 'FC-INV-018',
    domain: 'INV',
    category: 'Risk Measures',
    front: 'What is the SHARPE RATIO?',
    back: 'Sharpe Ratio:\n• Risk-adjusted return measure\n• Return per unit of TOTAL risk\n\nFormula: (Rp - Rf) / σp\n\nWhere:\n• Rp = Portfolio return\n• Rf = Risk-free rate\n• σp = Standard deviation\n\nHigher = Better risk-adjusted performance\nCompare investments with different risks',
    difficulty: 'medium',
    tags: ['sharpe', 'ratio', 'risk-adjusted']
  },
  {
    id: 'FC-INV-019',
    domain: 'INV',
    category: 'Risk Measures',
    front: 'What is the TREYNOR RATIO?',
    back: 'Treynor Ratio:\n• Risk-adjusted return measure\n• Return per unit of SYSTEMATIC risk\n\nFormula: (Rp - Rf) / βp\n\nDifference from Sharpe:\n• Uses beta not standard deviation\n• Best for diversified portfolios\n• Measures only market risk\n\nHigher = Better systematic risk-adjusted return',
    difficulty: 'medium',
    tags: ['treynor', 'ratio', 'systematic']
  },
  {
    id: 'FC-INV-020',
    domain: 'INV',
    category: 'Risk Measures',
    front: 'What is JENSEN\'S ALPHA?',
    back: 'Jensen\'s Alpha:\n• Absolute measure of performance vs CAPM\n• Risk-adjusted excess return\n\nFormula: αp = Rp - [Rf + βp(Rm - Rf)]\n\nPositive: Outperformed CAPM expectation\nNegative: Underperformed\n\nDirectly measures value added by manager\nStatistically test if significantly different from 0',
    difficulty: 'hard',
    tags: ['jensens', 'alpha', 'capm']
  },
  {
    id: 'FC-INV-021',
    domain: 'INV',
    category: 'CAPM',
    front: 'What is the CAPITAL ASSET PRICING MODEL (CAPM)?',
    back: 'CAPM:\n• Calculates required return based on risk\n\nFormula: E(Ri) = Rf + βi(Rm - Rf)\n\nWhere:\n• E(Ri) = Expected return\n• Rf = Risk-free rate\n• βi = Beta of asset\n• Rm = Market return\n• (Rm - Rf) = Market risk premium\n\nOnly systematic risk is compensated',
    difficulty: 'medium',
    tags: ['capm', 'required-return', 'beta']
  },
  {
    id: 'FC-INV-022',
    domain: 'INV',
    category: 'CAPM',
    front: 'What is the SECURITY MARKET LINE (SML)?',
    back: 'Security Market Line:\n• Graphical representation of CAPM\n• X-axis: Beta\n• Y-axis: Expected return\n• Y-intercept: Risk-free rate\n• Slope: Market risk premium\n\nPoints above SML: Undervalued\nPoints below SML: Overvalued\nOn line: Fairly valued',
    difficulty: 'medium',
    tags: ['sml', 'capm', 'valuation']
  },
  {
    id: 'FC-INV-023',
    domain: 'INV',
    category: 'CAPM',
    front: 'What is the CAPITAL MARKET LINE (CML)?',
    back: 'Capital Market Line:\n• Combines risk-free asset with market portfolio\n• X-axis: Standard deviation (total risk)\n• Y-axis: Expected return\n\nDifference from SML:\n• CML uses standard deviation\n• SML uses beta\n• CML only for efficient portfolios\n\nSlope = Sharpe ratio of market portfolio',
    difficulty: 'hard',
    tags: ['cml', 'capm', 'efficient']
  },
  {
    id: 'FC-INV-024',
    domain: 'INV',
    category: 'Diversification',
    front: 'What is SYSTEMATIC vs UNSYSTEMATIC risk?',
    back: 'SYSTEMATIC (Market) Risk:\n• Affects entire market\n• Cannot diversify away\n• Examples: Interest rates, inflation, recession\n• Measured by beta\n\nUNSYSTEMATIC (Specific) Risk:\n• Affects individual security\n• CAN diversify away\n• Examples: Management, labor strikes, lawsuits\n\nTotal Risk = Systematic + Unsystematic',
    difficulty: 'medium',
    tags: ['systematic', 'unsystematic', 'diversification']
  },
  {
    id: 'FC-INV-025',
    domain: 'INV',
    category: 'Diversification',
    front: 'What is CORRELATION and its role in diversification?',
    back: 'Correlation Coefficient (ρ):\n• Measures how assets move together\n• Range: -1 to +1\n\nInterpretation:\n• +1: Perfect positive (no diversification)\n• 0: No relationship\n• -1: Perfect negative (max diversification)\n\nDiversification benefits increase as correlation decreases\nIdeal: Low or negative correlation',
    difficulty: 'medium',
    tags: ['correlation', 'diversification', 'portfolio']
  },
  {
    id: 'FC-INV-026',
    domain: 'INV',
    category: 'Diversification',
    front: 'How many stocks needed for ADEQUATE DIVERSIFICATION?',
    back: 'Diversification Research:\n• 15-20 stocks eliminates ~90% unsystematic risk\n• 30+ stocks for further reduction\n• Diminishing returns after 40-50\n\nImportant factors:\n• Low correlation between holdings\n• Different sectors/industries\n• Various market caps\n• Geographic diversification\n\nCannot eliminate systematic risk',
    difficulty: 'medium',
    tags: ['diversification', 'stocks', 'portfolio']
  },
  {
    id: 'FC-INV-027',
    domain: 'INV',
    category: 'Bond Concepts',
    front: 'What is BOND DURATION?',
    back: 'Duration:\n• Weighted average time to receive cash flows\n• Measures price sensitivity to interest rates\n\nMacaulay Duration:\n• Expressed in years\n\nModified Duration:\n• Price sensitivity measure\n• % price change for 1% rate change\n\nHigher duration = Greater interest rate risk\nZero-coupon has highest duration = maturity',
    difficulty: 'medium',
    tags: ['duration', 'bonds', 'interest-rate']
  },
  {
    id: 'FC-INV-028',
    domain: 'INV',
    category: 'Bond Concepts',
    front: 'What is BOND CONVEXITY?',
    back: 'Convexity:\n• Measures curvature in price-yield relationship\n• Duration only approximates (linear)\n• Convexity captures non-linear portion\n\nBenefits of Positive Convexity:\n• Price rises MORE than duration predicts when rates fall\n• Price falls LESS than duration predicts when rates rise\n\nCallable bonds have negative convexity',
    difficulty: 'hard',
    tags: ['convexity', 'bonds', 'duration']
  },
  {
    id: 'FC-INV-029',
    domain: 'INV',
    category: 'Bond Concepts',
    front: 'What is the YIELD CURVE?',
    back: 'Yield Curve:\n• Graph of yields across maturities\n• Same credit quality (usually Treasuries)\n\nShapes:\n• NORMAL: Upward sloping (short < long)\n• INVERTED: Downward sloping (short > long)\n• FLAT: Similar rates across maturities\n\nInverted curve historically predicts recession\nSteep curve: Expect rate increases',
    difficulty: 'medium',
    tags: ['yield-curve', 'bonds', 'interest-rates']
  },
  {
    id: 'FC-INV-030',
    domain: 'INV',
    category: 'Bond Concepts',
    front: 'What are BOND RATING categories?',
    back: 'Bond Ratings:\n\nINVESTMENT GRADE:\n• AAA/Aaa: Highest quality\n• AA/Aa: High quality\n• A/A: Upper medium\n• BBB/Baa: Medium grade\n\nSPECULATIVE (Junk):\n• BB/Ba: Speculative\n• B/B: Highly speculative\n• CCC-C: Substantial risk\n• D: Default\n\nS&P/Fitch use letters; Moody\'s uses Aa1 format',
    difficulty: 'medium',
    tags: ['ratings', 'bonds', 'credit']
  },
  {
    id: 'FC-INV-031',
    domain: 'INV',
    category: 'Bond Types',
    front: 'What are TYPES of corporate bonds?',
    back: 'Corporate Bond Types:\n• SECURED: Backed by collateral\n  - Mortgage bonds (real estate)\n  - Equipment trust (equipment)\n• UNSECURED (Debentures): General credit\n• SUBORDINATED: Junior to other debt\n• CONVERTIBLE: Convert to stock\n• CALLABLE: Issuer can redeem early\n• PUTABLE: Holder can sell back',
    difficulty: 'medium',
    tags: ['bonds', 'corporate', 'types']
  },
  {
    id: 'FC-INV-032',
    domain: 'INV',
    category: 'Bond Types',
    front: 'What are MUNICIPAL BOND types?',
    back: 'Municipal Bonds:\n\nGENERAL OBLIGATION (GO):\n• Backed by taxing power\n• Full faith and credit\n\nREVENUE BONDS:\n• Backed by specific project revenue\n• Higher risk, higher yield\n\nBoth:\n• Federal tax-exempt\n• State tax-exempt (if in-state)\n• May trigger AMT (private activity)',
    difficulty: 'medium',
    tags: ['municipal', 'bonds', 'types']
  },
  {
    id: 'FC-INV-033',
    domain: 'INV',
    category: 'Bond Types',
    front: 'What are TREASURY securities?',
    back: 'Treasury Securities:\n\nT-BILLS:\n• <1 year maturity\n• Sold at discount, no coupon\n\nT-NOTES:\n• 2-10 year maturity\n• Semiannual coupons\n\nT-BONDS:\n• 20-30 year maturity\n• Semiannual coupons\n\nTIPS:\n• Inflation-protected\n• Principal adjusts with CPI\n\nAll: Federal tax, state tax-exempt',
    difficulty: 'medium',
    tags: ['treasuries', 'bills', 'notes']
  },
  {
    id: 'FC-INV-034',
    domain: 'INV',
    category: 'Stock Valuation',
    front: 'What is the DIVIDEND DISCOUNT MODEL (DDM)?',
    back: 'Dividend Discount Model:\n• Stock value = PV of future dividends\n\nGORDON GROWTH MODEL:\nP₀ = D₁ / (r - g)\n\nWhere:\n• D₁ = Next year\'s dividend\n• r = Required return\n• g = Dividend growth rate\n\nAssumptions:\n• Constant growth forever\n• r > g\n• Dividends paid',
    difficulty: 'medium',
    tags: ['ddm', 'valuation', 'gordon']
  },
  {
    id: 'FC-INV-035',
    domain: 'INV',
    category: 'Stock Valuation',
    front: 'What is the P/E RATIO?',
    back: 'Price-to-Earnings Ratio:\n• P/E = Price per Share / Earnings per Share\n\nTypes:\n• TRAILING P/E: Past 12 months earnings\n• FORWARD P/E: Projected earnings\n\nInterpretation:\n• High P/E: Growth expectations or overvalued\n• Low P/E: Value or problems\n\nCompare to industry and historical averages',
    difficulty: 'easy',
    tags: ['pe-ratio', 'valuation', 'stocks']
  },
  {
    id: 'FC-INV-036',
    domain: 'INV',
    category: 'Stock Valuation',
    front: 'What is PRICE-TO-BOOK ratio?',
    back: 'Price-to-Book Ratio:\n• P/B = Market Price / Book Value per Share\n• Book Value = Assets - Liabilities\n\nInterpretation:\n• P/B < 1: Trading below book value\n• P/B > 1: Premium to book value\n\nBest for:\n• Financial companies\n• Asset-heavy industries\n\nLimitation: Ignores intangibles',
    difficulty: 'medium',
    tags: ['price-to-book', 'valuation', 'ratio']
  },
  {
    id: 'FC-INV-037',
    domain: 'INV',
    category: 'Stock Valuation',
    front: 'What is DISCOUNTED CASH FLOW (DCF) valuation?',
    back: 'Discounted Cash Flow:\n• Value = PV of future free cash flows\n\nSteps:\n1. Project future cash flows\n2. Estimate terminal value\n3. Discount to present value\n4. Sum = Intrinsic value\n\nDiscount Rate: WACC or required return\n\nAdvantage: Doesn\'t require dividends\nChallenge: Many assumptions',
    difficulty: 'hard',
    tags: ['dcf', 'valuation', 'cash-flow']
  },
  {
    id: 'FC-INV-038',
    domain: 'INV',
    category: 'Investment Styles',
    front: 'What is VALUE vs GROWTH investing?',
    back: 'VALUE INVESTING:\n• Buy undervalued stocks\n• Low P/E, P/B ratios\n• Higher dividend yields\n• Margin of safety focus\n\nGROWTH INVESTING:\n• Buy stocks with high growth potential\n• Higher P/E, P/B ratios\n• Reinvest earnings\n• Future earnings focus\n\nValue tends to outperform long-term',
    difficulty: 'medium',
    tags: ['value', 'growth', 'style']
  },
  {
    id: 'FC-INV-039',
    domain: 'INV',
    category: 'Investment Styles',
    front: 'What is MARKET CAP classification?',
    back: 'Market Capitalization:\n• Market Cap = Price × Shares Outstanding\n\nCategories:\n• MEGA CAP: >$200B\n• LARGE CAP: $10B-$200B\n• MID CAP: $2B-$10B\n• SMALL CAP: $300M-$2B\n• MICRO CAP: $50M-$300M\n\nSmaller = Higher risk, higher potential return\nSize premium exists historically',
    difficulty: 'easy',
    tags: ['market-cap', 'size', 'classification']
  },
  {
    id: 'FC-INV-040',
    domain: 'INV',
    category: 'Investment Vehicles',
    front: 'Compare OPEN-END vs CLOSED-END funds',
    back: 'OPEN-END (Mutual Funds):\n• Continuously issue/redeem shares\n• Trade at NAV\n• Priced end of day\n• Unlimited shares\n\nCLOSED-END:\n• Fixed number of shares\n• Trade on exchange\n• Can trade at premium or discount to NAV\n• Intraday pricing\n• May use leverage',
    difficulty: 'medium',
    tags: ['open-end', 'closed-end', 'funds']
  },
  {
    id: 'FC-INV-041',
    domain: 'INV',
    category: 'Investment Vehicles',
    front: 'What are ETF advantages over mutual funds?',
    back: 'ETF Advantages:\n• Tax efficiency (in-kind creation/redemption)\n• Lower expense ratios\n• Intraday trading\n• Transparency (holdings disclosed daily)\n• No minimum investment\n• Can short, use limit orders\n\nDisadvantages:\n• Trading commissions\n• Bid-ask spreads\n• Premium/discount to NAV',
    difficulty: 'medium',
    tags: ['etf', 'advantages', 'comparison']
  },
  {
    id: 'FC-INV-042',
    domain: 'INV',
    category: 'Investment Vehicles',
    front: 'What is a UNIT INVESTMENT TRUST (UIT)?',
    back: 'Unit Investment Trust:\n• Fixed portfolio of securities\n• No active management\n• Termination date\n• Self-liquidating\n• Redeemable at NAV\n• Low expenses\n\nTypes:\n• Equity UITs\n• Bond UITs\n\nCompare to ETF: Similar but not traded, has maturity',
    difficulty: 'medium',
    tags: ['uit', 'trust', 'fixed']
  },
  {
    id: 'FC-INV-043',
    domain: 'INV',
    category: 'Investment Vehicles',
    front: 'What is a REIT?',
    back: 'Real Estate Investment Trust:\n• Owns/operates income-producing real estate\n• Trade on exchanges like stocks\n• Must distribute 90% taxable income\n• Pass-through taxation\n\nTypes:\n• EQUITY REITs: Own property\n• MORTGAGE REITs: Own mortgages\n• HYBRID: Both\n\nCorrelation: Low with stocks, bonds',
    difficulty: 'medium',
    tags: ['reit', 'real-estate', 'trust']
  },
  {
    id: 'FC-INV-044',
    domain: 'INV',
    category: 'Options',
    front: 'What are basic CALL and PUT options?',
    back: 'OPTIONS:\n\nCALL OPTION:\n• Right to BUY at strike price\n• Bullish on underlying\n• Buy call: Max loss = premium\n• Sell call: Max loss = unlimited\n\nPUT OPTION:\n• Right to SELL at strike price\n• Bearish on underlying\n• Buy put: Max loss = premium\n• Sell put: Max loss = strike - premium',
    difficulty: 'medium',
    tags: ['options', 'call', 'put']
  },
  {
    id: 'FC-INV-045',
    domain: 'INV',
    category: 'Options',
    front: 'What is COVERED CALL strategy?',
    back: 'Covered Call:\n• Own stock + Sell call option\n\nGoals:\n• Generate income (premium)\n• Slight downside protection\n• Exit strategy\n\nRisk/Reward:\n• Limited upside (capped at strike)\n• Downside risk remains (less premium)\n• Best for neutral to slightly bullish\n\nNot speculative - income oriented',
    difficulty: 'medium',
    tags: ['covered-call', 'options', 'strategy']
  },
  {
    id: 'FC-INV-046',
    domain: 'INV',
    category: 'Options',
    front: 'What is PROTECTIVE PUT strategy?',
    back: 'Protective Put:\n• Own stock + Buy put option\n• Portfolio insurance\n\nGoals:\n• Limit downside risk\n• Maintain upside potential\n• Like buying insurance\n\nCost: Premium paid\n• Reduces overall return\n• Floor on losses\n\nBest: Uncertain market, want to hold position',
    difficulty: 'medium',
    tags: ['protective-put', 'options', 'hedging']
  },
  {
    id: 'FC-INV-047',
    domain: 'INV',
    category: 'Options',
    front: 'What is INTRINSIC vs TIME VALUE?',
    back: 'Option Value:\n\nINTRINSIC VALUE:\n• In-the-money amount\n• Call: Stock price - Strike price\n• Put: Strike price - Stock price\n• Cannot be negative\n\nTIME VALUE:\n• Premium - Intrinsic value\n• Based on time remaining\n• Decays as expiration approaches\n• Theta measures decay rate\n\nTotal Premium = Intrinsic + Time Value',
    difficulty: 'medium',
    tags: ['intrinsic', 'time-value', 'options']
  },
  {
    id: 'FC-INV-048',
    domain: 'INV',
    category: 'Portfolio Management',
    front: 'What is STRATEGIC vs TACTICAL asset allocation?',
    back: 'STRATEGIC (LONG-TERM):\n• Base policy allocation\n• Set based on goals, risk, horizon\n• Rebalance to maintain\n• Buy and hold approach\n\nTACTICAL (SHORT-TERM):\n• Deviations from strategic\n• Exploit market opportunities\n• Active approach\n• Ranges around strategic weights\n\nCore-satellite combines both',
    difficulty: 'medium',
    tags: ['allocation', 'strategic', 'tactical']
  },
  {
    id: 'FC-INV-049',
    domain: 'INV',
    category: 'Portfolio Management',
    front: 'What is REBALANCING and why is it important?',
    back: 'Rebalancing:\n• Restoring portfolio to target allocation\n• After market movements cause drift\n\nMethods:\n• Calendar: Periodic (quarterly, annually)\n• Threshold: When deviation exceeds %\n\nBenefits:\n• Maintains risk level\n• Forces "sell high, buy low"\n• Discipline\n\nCosts: Taxes, transaction costs',
    difficulty: 'medium',
    tags: ['rebalancing', 'portfolio', 'management']
  },
  {
    id: 'FC-INV-050',
    domain: 'INV',
    category: 'Portfolio Management',
    front: 'What is DOLLAR COST AVERAGING?',
    back: 'Dollar Cost Averaging (DCA):\n• Invest fixed amounts at regular intervals\n• Regardless of market price\n\nBenefits:\n• Buy more shares when prices low\n• Average cost less than average price\n• Reduces timing risk\n• Systematic investing\n\nBest for: Periodic contributions (401k)\nVs. Lump sum: Lump sum often outperforms',
    difficulty: 'easy',
    tags: ['dca', 'investing', 'systematic']
  },
  {
    id: 'FC-INV-051',
    domain: 'INV',
    category: 'Behavioral Finance',
    front: 'What is LOSS AVERSION?',
    back: 'Loss Aversion:\n• Losses hurt ~2x more than equivalent gains feel good\n• Asymmetric utility function\n• Kahneman & Tversky\n\nConsequences:\n• Hold losers too long\n• Sell winners too early\n• Risk-averse for gains\n• Risk-seeking to avoid losses\n\nRemedy: Use systematic rules, ignore emotions',
    difficulty: 'medium',
    tags: ['loss-aversion', 'behavioral', 'bias']
  },
  {
    id: 'FC-INV-052',
    domain: 'INV',
    category: 'Behavioral Finance',
    front: 'What is OVERCONFIDENCE bias?',
    back: 'Overconfidence Bias:\n• Overestimate own abilities/knowledge\n• Believe you can beat the market\n\nManifestations:\n• Excessive trading\n• Under-diversification\n• Ignoring contrary evidence\n• Taking too much risk\n\nRemedy:\n• Track record analysis\n• Consider index funds\n• Seek contrary opinions',
    difficulty: 'medium',
    tags: ['overconfidence', 'behavioral', 'bias']
  },
  {
    id: 'FC-INV-053',
    domain: 'INV',
    category: 'Behavioral Finance',
    front: 'What is ANCHORING bias?',
    back: 'Anchoring Bias:\n• Fixating on initial value/information\n• Adjustments from anchor insufficient\n\nExamples:\n• Purchase price as reference\n• 52-week high/low\n• Analyst price targets\n\nConsequences:\n• Hold based on cost basis (irrelevant)\n• Slow to update views\n\nRemedy: Focus on current value, fundamentals',
    difficulty: 'medium',
    tags: ['anchoring', 'behavioral', 'bias']
  },
  {
    id: 'FC-INV-054',
    domain: 'INV',
    category: 'Behavioral Finance',
    front: 'What is HERDING behavior?',
    back: 'Herding:\n• Following the crowd\n• Social proof influence\n• Fear of missing out (FOMO)\n\nConsequences:\n• Buying at tops\n• Selling at bottoms\n• Momentum extremes\n• Bubbles and crashes\n\nRemedy:\n• Contrarian analysis\n• Valuation discipline\n• Long-term perspective',
    difficulty: 'medium',
    tags: ['herding', 'behavioral', 'bias']
  },
  {
    id: 'FC-INV-055',
    domain: 'INV',
    category: 'Market Efficiency',
    front: 'What is EFFICIENT MARKET HYPOTHESIS (EMH)?',
    back: 'Efficient Market Hypothesis:\n• Prices reflect all available information\n• Cannot consistently beat market\n\nForms:\n• WEAK: Past prices reflected\n• SEMI-STRONG: All public info reflected\n• STRONG: All info (including private)\n\nImplications: Passive investing, index funds\nCriticism: Bubbles, anomalies exist',
    difficulty: 'medium',
    tags: ['emh', 'efficiency', 'market']
  },
  {
    id: 'FC-INV-056',
    domain: 'INV',
    category: 'Market Efficiency',
    front: 'What are MARKET ANOMALIES?',
    back: 'Market Anomalies:\n• Persistent patterns inconsistent with EMH\n\nExamples:\n• SIZE EFFECT: Small caps outperform\n• VALUE EFFECT: Low P/B outperforms\n• MOMENTUM: Winners keep winning\n• JANUARY EFFECT: Small cap January gains\n• WEEKDAY EFFECT: Monday returns lower\n\nDebate: Real alpha or risk factors?',
    difficulty: 'hard',
    tags: ['anomalies', 'emh', 'factors']
  },
  {
    id: 'FC-INV-057',
    domain: 'INV',
    category: 'Alternative Investments',
    front: 'What are HEDGE FUND characteristics?',
    back: 'Hedge Funds:\n• Alternative investment vehicle\n• Various strategies (long/short, arbitrage)\n• Accredited investors only\n• Limited liquidity (lock-ups)\n• 2 and 20 fee structure\n• Less regulated\n• Absolute return focus\n\nStrategies:\n• Long/short equity\n• Market neutral\n• Global macro\n• Event-driven',
    difficulty: 'hard',
    tags: ['hedge-fund', 'alternative', 'strategies']
  },
  {
    id: 'FC-INV-058',
    domain: 'INV',
    category: 'Alternative Investments',
    front: 'What is PRIVATE EQUITY?',
    back: 'Private Equity:\n• Investment in private companies\n• Long holding periods (5-10 years)\n• Illiquid\n• J-curve returns\n\nTypes:\n• BUYOUTS: Acquire mature companies\n• VENTURE CAPITAL: Early-stage companies\n• GROWTH EQUITY: Expansion capital\n\nFees: 2% management, 20% carry\nMinimum: Typically $250K+',
    difficulty: 'hard',
    tags: ['private-equity', 'alternative', 'investments']
  },
  {
    id: 'FC-INV-059',
    domain: 'INV',
    category: 'Fixed Income',
    front: 'What BOND RISKS should investors know?',
    back: 'Bond Risks:\n• INTEREST RATE: Prices fall when rates rise\n• CREDIT/DEFAULT: Issuer may not pay\n• REINVESTMENT: Lower rates on reinvestment\n• INFLATION: Purchasing power erosion\n• CALL: Called before maturity\n• LIQUIDITY: Hard to sell\n• CURRENCY: Foreign bond exposure\n\nDuration helps quantify interest rate risk',
    difficulty: 'medium',
    tags: ['bonds', 'risks', 'fixed-income']
  },
  {
    id: 'FC-INV-060',
    domain: 'INV',
    category: 'Equity',
    front: 'What is a STOCK SPLIT and REVERSE SPLIT?',
    back: 'STOCK SPLIT:\n• Increases shares, reduces price proportionally\n• Example: 2-for-1 doubles shares, halves price\n• No change in value\n• Improves liquidity, accessibility\n\nREVERSE SPLIT:\n• Reduces shares, increases price\n• Example: 1-for-10 reduces shares by 90%\n• Often to meet listing requirements\n• May signal trouble',
    difficulty: 'easy',
    tags: ['split', 'stocks', 'shares']
  },
  {
    id: 'FC-INV-061',
    domain: 'INV',
    category: 'Performance',
    front: 'What is TIME-WEIGHTED vs DOLLAR-WEIGHTED return?',
    back: 'TIME-WEIGHTED RETURN (TWR):\n• Eliminates cash flow effects\n• Standard for measuring managers\n• Geometric linking of sub-periods\n• Ignores client deposits/withdrawals\n\nDOLLAR-WEIGHTED (IRR):\n• Considers timing of cash flows\n• Reflects investor experience\n• Personal rate of return\n\nUse TWR to evaluate managers',
    difficulty: 'hard',
    tags: ['return', 'time-weighted', 'dollar-weighted']
  },
  {
    id: 'FC-INV-062',
    domain: 'INV',
    category: 'Performance',
    front: 'What is INFORMATION RATIO?',
    back: 'Information Ratio:\n• Active return per unit of tracking error\n• Measures consistency of outperformance\n\nFormula: (Rp - Rb) / Tracking Error\n\nWhere:\n• Rp = Portfolio return\n• Rb = Benchmark return\n• Tracking Error = Std dev of difference\n\nHigher = Better active management\nTypically: 0.5 good, 1.0 excellent',
    difficulty: 'hard',
    tags: ['information-ratio', 'performance', 'active']
  },
  {
    id: 'FC-INV-063',
    domain: 'INV',
    category: 'Performance',
    front: 'What is SORTINO RATIO?',
    back: 'Sortino Ratio:\n• Modified Sharpe ratio\n• Only penalizes downside deviation\n\nFormula: (Rp - Target) / Downside Deviation\n\nDifference from Sharpe:\n• Sharpe uses total volatility\n• Sortino only uses bad volatility\n• Better for asymmetric returns\n\nHigher = Better risk-adjusted downside performance',
    difficulty: 'hard',
    tags: ['sortino', 'downside', 'ratio']
  },
  {
    id: 'FC-INV-064',
    domain: 'INV',
    category: 'Regulation',
    front: 'What is a PROSPECTUS?',
    back: 'Prospectus:\n• Legal document describing investment\n• Required for securities offerings\n• Contains:\n  - Investment objectives\n  - Risks\n  - Fees and expenses\n  - Management info\n  - Historical performance\n• Must receive before or with purchase\n• Summary prospectus allowed for funds',
    difficulty: 'easy',
    tags: ['prospectus', 'regulation', 'disclosure']
  },
  {
    id: 'FC-INV-065',
    domain: 'INV',
    category: 'Regulation',
    front: 'What is FINRA\'s role?',
    back: 'FINRA (Financial Industry Regulatory Authority):\n• Self-regulatory organization\n• Oversees broker-dealers\n• Writes and enforces rules\n• Licenses reps (Series exams)\n• Arbitration disputes\n• NOT a government agency\n\nKey rules:\n• Suitability\n• Best execution\n• Know your customer',
    difficulty: 'medium',
    tags: ['finra', 'regulation', 'sro']
  },
  {
    id: 'FC-INV-066',
    domain: 'INV',
    category: 'Order Types',
    front: 'What are LIMIT vs MARKET orders?',
    back: 'MARKET ORDER:\n• Execute immediately at current price\n• Guaranteed execution\n• No price guarantee\n• Best for liquid securities\n\nLIMIT ORDER:\n• Execute only at specified price or better\n• Price guarantee\n• No execution guarantee\n• May be partially filled\n\nBuy limit: At or below\nSell limit: At or above',
    difficulty: 'easy',
    tags: ['orders', 'market', 'limit']
  },
  {
    id: 'FC-INV-067',
    domain: 'INV',
    category: 'Order Types',
    front: 'What is a STOP-LOSS order?',
    back: 'Stop-Loss Order:\n• Becomes market order when trigger hit\n• Limit potential losses\n\nSell Stop: Below current price\n• Protects long position\n\nBuy Stop: Above current price\n• Protects short position\n\nSTOP-LIMIT:\n• Becomes limit order at trigger\n• Price guarantee but may not fill\n\nRisk: Gap through stop price',
    difficulty: 'medium',
    tags: ['stop-loss', 'orders', 'protection']
  },
  {
    id: 'FC-INV-068',
    domain: 'INV',
    category: 'Margin',
    front: 'What is MARGIN trading?',
    back: 'Margin Trading:\n• Borrow to buy securities\n• Leverage increases returns and losses\n\nRegulation T:\n• Initial margin: 50% cash\n• Maintenance: 25-30% equity\n\nMARGIN CALL:\n• Triggered when equity falls below maintenance\n• Must deposit cash or sell securities\n\nRisk: Losses can exceed investment',
    difficulty: 'medium',
    tags: ['margin', 'leverage', 'trading']
  },
  {
    id: 'FC-INV-069',
    domain: 'INV',
    category: 'Technical Analysis',
    front: 'What are SUPPORT and RESISTANCE levels?',
    back: 'SUPPORT:\n• Price floor where buying increases\n• Demand exceeds supply\n• Bounce expected\n• Break below is bearish\n\nRESISTANCE:\n• Price ceiling where selling increases\n• Supply exceeds demand\n• Pullback expected\n• Break above is bullish\n\nPrior support becomes resistance and vice versa',
    difficulty: 'medium',
    tags: ['support', 'resistance', 'technical']
  },
  {
    id: 'FC-INV-070',
    domain: 'INV',
    category: 'Technical Analysis',
    front: 'What are MOVING AVERAGES?',
    back: 'Moving Averages:\n• Smooth price data over time\n• Identify trends\n\nSIMPLE (SMA): Equal weight\nEXPONENTIAL (EMA): More weight to recent\n\nCommon periods: 50, 100, 200 day\n\nSignals:\n• GOLDEN CROSS: 50 crosses above 200 (bullish)\n• DEATH CROSS: 50 crosses below 200 (bearish)\n\nLagging indicator',
    difficulty: 'medium',
    tags: ['moving-average', 'technical', 'trend']
  },
];
