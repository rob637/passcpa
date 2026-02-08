/**
 * CFP Investment Questions - Batch 5
 * Domain 4: Investment Planning (17% of exam)
 * 25 additional questions covering portfolio management, fixed income, and alternatives
 */

import { Question } from '../../../types';

export const CFP_INVESTMENTS_BATCH5_QUESTIONS: Question[] = [
  // INV-1: Investment Theory
  {
    id: 'CFP-INV-B5-001',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Efficient Market Hypothesis',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the semi-strong form of the Efficient Market Hypothesis (EMH), which investment strategy would be LEAST likely to generate excess returns?',
    options: [
      'A) Technical analysis using price charts',
      'B) Fundamental analysis of financial statements',
      'C) Insider trading using nonpublic information',
      'D) Both A and B'
    ],
    correctAnswer: 3,
    explanation: 'Semi-strong EMH states that stock prices reflect all publicly available information. This means both technical analysis (which uses historical prices) and fundamental analysis (which uses public financial data) cannot consistently generate excess returns. Only insider trading using nonpublic information could theoretically beat the market, but it is illegal.'
  },
  {
    id: 'CFP-INV-B5-002',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Modern Portfolio Theory',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'According to Modern Portfolio Theory, which factor primarily determines the risk-return characteristics of a well-diversified portfolio?',
    options: [
      'A) Individual security selection',
      'B) Market timing decisions',
      'C) Asset allocation',
      'D) Security trading frequency'
    ],
    correctAnswer: 2,
    explanation: 'Studies show that asset allocation explains approximately 90% of a portfolio\'s return variability over time. In a well-diversified portfolio, unsystematic risk is minimized, leaving systematic (market) risk as the primary driver of portfolio performance. Individual security selection matters far less than the overall asset mix.'
  },
  {
    id: 'CFP-INV-B5-003',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Beta',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A stock has a beta of 1.4. If the market rises 10%, this stock would be expected to:',
    options: [
      'A) Rise 10%',
      'B) Rise 14%',
      'C) Rise 4%',
      'D) Rise 11.4%'
    ],
    correctAnswer: 1,
    explanation: 'Beta measures a stock\'s sensitivity to market movements. A beta of 1.4 means the stock is expected to move 1.4 times the market movement. Market up 10% × 1.4 beta = 14% expected stock increase. Stocks with beta > 1 are more volatile than the market; beta < 1 are less volatile.'
  },
  {
    id: 'CFP-INV-B5-004',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Standard Deviation',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Standard deviation in investment analysis measures:',
    options: [
      'A) Only downside risk',
      'B) Total volatility of returns from the mean',
      'C) The correlation between two assets',
      'D) Expected return of an asset'
    ],
    correctAnswer: 1,
    explanation: 'Standard deviation measures the dispersion of returns around the mean—both above and below. It represents total risk (volatility). A higher standard deviation indicates greater variability in returns. Unlike semi-variance or downside deviation, it treats upside and downside deviations equally.'
  },
  // INV-2: Fixed Income
  {
    id: 'CFP-INV-B5-005',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Duration',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A bond portfolio has a duration of 6 years. If interest rates rise by 1%, the portfolio value would be expected to:',
    options: [
      'A) Decrease by 6%',
      'B) Decrease by 1%',
      'C) Increase by 6%',
      'D) Remain unchanged'
    ],
    correctAnswer: 0,
    explanation: 'Duration measures a bond\'s price sensitivity to interest rate changes. A duration of 6 means approximately a 6% price change for each 1% change in rates. Bond prices move inversely to interest rates, so a 1% rate increase causes approximately a 6% decrease in value. This is known as the modified duration approximation.'
  },
  {
    id: 'CFP-INV-B5-006',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Yield Curve',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'An inverted yield curve typically signals:',
    options: [
      'A) Strong economic growth ahead',
      'B) Potential recession and economic slowdown',
      'C) Rising inflation expectations',
      'D) No meaningful economic prediction'
    ],
    correctAnswer: 1,
    explanation: 'An inverted yield curve occurs when short-term rates exceed long-term rates. This has historically been a reliable predictor of economic recession, typically occurring 6-24 months before a downturn. It suggests investors expect rates to fall in the future due to economic weakening.'
  },
  {
    id: 'CFP-INV-B5-007',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Bond Pricing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A $1,000 par value bond with a 5% coupon is trading at $1,050. The bond is trading:',
    options: [
      'A) At par',
      'B) At a premium because market rates are lower than 5%',
      'C) At a discount because market rates are higher than 5%',
      'D) At a premium because market rates are higher than 5%'
    ],
    correctAnswer: 1,
    explanation: 'When a bond trades above par value, it trades at a premium. This occurs when the coupon rate exceeds current market rates for similar bonds. Investors pay more for the higher coupon payments. Conversely, bonds trade at a discount when market rates exceed the coupon rate.'
  },
  {
    id: 'CFP-INV-B5-008',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Bond Types',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which type of bond adjusts its principal value based on inflation?',
    options: [
      'A) Zero-coupon bond',
      'B) Callable bond',
      'C) Treasury Inflation-Protected Securities (TIPS)',
      'D) Convertible bond'
    ],
    correctAnswer: 2,
    explanation: 'TIPS are U.S. Treasury securities whose principal adjusts based on changes in the Consumer Price Index (CPI). The coupon rate is fixed, but applied to the inflation-adjusted principal, providing protection against inflation. At maturity, investors receive the greater of the original or adjusted principal.'
  },
  // INV-3: Equity
  {
    id: 'CFP-INV-B5-009',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Equity',
    subtopic: 'Stock Valuation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A stock pays a $2 annual dividend expected to grow at 5% indefinitely. The required return is 12%. Using the constant growth dividend discount model, the intrinsic value is:',
    options: [
      'A) $16.67',
      'B) $28.57',
      'C) $30.00',
      'D) $40.00'
    ],
    correctAnswer: 2,
    explanation: 'The Gordon Growth Model (constant growth DDM) values a stock as: D₁ / (r - g) where D₁ is next year\'s dividend. D₁ = $2 × 1.05 = $2.10. Value = $2.10 / (0.12 - 0.05) = $2.10 / 0.07 = $30.00. The model requires r > g for a positive value.'
  },
  {
    id: 'CFP-INV-B5-010',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Equity',
    subtopic: 'P/E Ratio',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A stock trades at $80 per share and has earnings per share of $4. Its P/E ratio is:',
    options: [
      'A) 5',
      'B) 15',
      'C) 20',
      'D) 320'
    ],
    correctAnswer: 2,
    explanation: 'P/E ratio = Price per share / Earnings per share = $80 / $4 = 20. This means investors are willing to pay $20 for each $1 of earnings. A higher P/E may indicate growth expectations or overvaluation; a lower P/E may suggest value opportunity or concerns about future earnings.'
  },
  {
    id: 'CFP-INV-B5-011',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Equity',
    subtopic: 'Growth vs. Value',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Value stocks are typically characterized by:',
    options: [
      'A) High P/E ratios and rapid earnings growth',
      'B) Low P/E ratios and high dividend yields',
      'C) No earnings and high growth potential',
      'D) High beta and high volatility'
    ],
    correctAnswer: 1,
    explanation: 'Value stocks typically have low P/E ratios, low price-to-book ratios, and higher dividend yields. They are often mature companies trading below their intrinsic value. Growth stocks, conversely, have high P/E ratios reflecting expectations of rapid earnings growth, often with low or no dividends.'
  },
  // INV-4: Options and Derivatives
  {
    id: 'CFP-INV-B5-012',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Options',
    subtopic: 'Call Options',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An investor buys a call option with a $50 strike price for a $3 premium. At expiration, the stock is at $58. The investor\'s profit is:',
    options: [
      'A) $3',
      'B) $5',
      'C) $8',
      'D) $11'
    ],
    correctAnswer: 1,
    explanation: 'Call option profit = Intrinsic value - Premium paid. Intrinsic value = Stock price - Strike price = $58 - $50 = $8. Profit = $8 - $3 premium = $5 per share. The breakeven price is $53 ($50 strike + $3 premium). Max loss is limited to the premium paid.'
  },
  {
    id: 'CFP-INV-B5-013',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Options',
    subtopic: 'Covered Call',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'An investor owns 100 shares of XYZ at $45 and writes a covered call with a $50 strike for a $2 premium. The maximum profit potential is:',
    options: [
      'A) $2 per share',
      'B) $5 per share',
      'C) $7 per share',
      'D) Unlimited'
    ],
    correctAnswer: 2,
    explanation: 'Covered call maximum profit = (Strike - Stock purchase price) + Premium = ($50 - $45) + $2 = $7 per share. If the stock rises above $50, shares are called away at $50. The premium provides income and limited downside protection but caps upside at $7 per share.'
  },
  {
    id: 'CFP-INV-B5-014',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Options',
    subtopic: 'Protective Put',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A protective put strategy is used to:',
    options: [
      'A) Generate income on existing stock positions',
      'B) Limit downside risk while maintaining upside potential',
      'C) Profit from a decline in stock prices',
      'D) Reduce the cost basis of stock positions'
    ],
    correctAnswer: 1,
    explanation: 'A protective put (also called a married put) involves buying a put option on stock you own. This creates a floor price equal to the strike price, limiting downside losses while allowing unlimited upside potential minus the premium cost. It\'s like buying insurance on your stock position.'
  },
  // INV-5: Alternative Investments
  {
    id: 'CFP-INV-B5-015',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Alternative Investments',
    subtopic: 'REITs',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'For a REIT to maintain its tax-advantaged status, it must distribute at least what percentage of taxable income as dividends?',
    options: [
      'A) 50%',
      'B) 75%',
      'C) 90%',
      'D) 100%'
    ],
    correctAnswer: 2,
    explanation: 'REITs must distribute at least 90% of taxable income as dividends to shareholders. This allows REITs to avoid corporate-level taxation, passing income directly to investors. Additionally, at least 75% of assets must be in real estate, and 75% of income must come from real estate-related sources.'
  },
  {
    id: 'CFP-INV-B5-016',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Alternative Investments',
    subtopic: 'Hedge Funds',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Hedge funds differ from mutual funds primarily in that hedge funds:',
    options: [
      'A) Are available to all investors regardless of income',
      'B) Are more liquid with daily redemption rights',
      'C) Can use leverage, short selling, and derivatives more freely',
      'D) Must be registered with the SEC and provide daily pricing'
    ],
    correctAnswer: 2,
    explanation: 'Hedge funds have fewer regulatory restrictions than mutual funds, allowing them to employ strategies like short selling, leverage, derivatives, and concentrated positions. They are typically available only to accredited investors and have longer lock-up periods with limited liquidity. They are not required to register with the SEC under the same rules as mutual funds.'
  },
  {
    id: 'CFP-INV-B5-017',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Alternative Investments',
    subtopic: 'Commodities',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Adding commodities to a stock and bond portfolio may benefit investors primarily because commodities:',
    options: [
      'A) Always provide positive returns',
      'B) Have low or negative correlation with stocks and bonds',
      'C) Are guaranteed to outperform during recessions',
      'D) Have no storage or rollover costs'
    ],
    correctAnswer: 1,
    explanation: 'Commodities historically have low or negative correlation with traditional stock and bond portfolios. This diversification benefit can reduce overall portfolio volatility without necessarily sacrificing returns. Commodities may also provide inflation protection as their prices often rise with inflation.'
  },
  // INV-1: Additional Theory
  {
    id: 'CFP-INV-B5-018',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Sharpe Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Fund A has a return of 12%, standard deviation of 15%, and the risk-free rate is 3%. What is Fund A\'s Sharpe ratio?',
    options: [
      'A) 0.60',
      'B) 0.80',
      'C) 1.00',
      'D) 1.25'
    ],
    correctAnswer: 0,
    explanation: 'Sharpe ratio = (Return - Risk-free rate) / Standard deviation = (12% - 3%) / 15% = 9% / 15% = 0.60. The Sharpe ratio measures risk-adjusted return—higher is better. It indicates 0.60% excess return per unit of risk taken. Compare to benchmark or similar funds.'
  },
  {
    id: 'CFP-INV-B5-019',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Alpha',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A positive alpha indicates that a portfolio manager:',
    options: [
      'A) Took more risk than the benchmark',
      'B) Generated returns above what was expected given the risk taken',
      'C) Has a beta greater than 1.0',
      'D) Underperformed on a risk-adjusted basis'
    ],
    correctAnswer: 1,
    explanation: 'Alpha measures the excess return of an investment relative to its expected return based on beta (systematic risk). Positive alpha means the manager added value beyond what was expected for the level of market risk taken. Alpha is a key measure of manager skill.'
  },
  {
    id: 'CFP-INV-B5-020',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Capital Asset Pricing Model',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Using CAPM: Risk-free rate is 4%, expected market return is 10%, and a stock\'s beta is 1.5. What is the stock\'s expected return?',
    options: [
      'A) 10%',
      'B) 13%',
      'C) 15%',
      'D) 19%'
    ],
    correctAnswer: 1,
    explanation: 'CAPM: Expected Return = Risk-free rate + Beta × (Market return - Risk-free rate). Expected Return = 4% + 1.5 × (10% - 4%) = 4% + 1.5 × 6% = 4% + 9% = 13%. CAPM determines the theoretically appropriate required return given systematic risk (beta).'
  },
  // INV-2: Additional Fixed Income
  {
    id: 'CFP-INV-B5-021',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Reinvestment Risk',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which bond has the HIGHEST reinvestment risk?',
    options: [
      'A) A zero-coupon bond maturing in 10 years',
      'B) A 10-year bond with a 8% coupon',
      'C) A 5-year bond with a 4% coupon',
      'D) A 10-year bond with a 5% coupon'
    ],
    correctAnswer: 1,
    explanation: 'Reinvestment risk is the risk that coupon payments will be reinvested at lower rates. Higher coupons = more cash flow to reinvest = more reinvestment risk. The 8% coupon bond generates the most cash flow to reinvest. Zero-coupon bonds have no reinvestment risk because there are no interim payments.'
  },
  {
    id: 'CFP-INV-B5-022',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Callable Bonds',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Callable bonds typically offer higher coupon rates than non-callable bonds because:',
    options: [
      'A) They have longer maturities',
      'B) Investors bear call risk and demand compensation',
      'C) They have higher credit risk',
      'D) They are always issued at a discount'
    ],
    correctAnswer: 1,
    explanation: 'Callable bonds give the issuer the right to redeem the bond before maturity, usually when rates fall. This benefits issuers but hurts investors who must reinvest at lower rates. To compensate investors for this call risk, callable bonds offer higher coupon rates than comparable non-callable bonds.'
  },
  {
    id: 'CFP-INV-B5-023',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Bond Laddering',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A bond ladder strategy involves:',
    options: [
      'A) Concentrating all investments in long-term bonds',
      'B) Buying bonds with staggered maturity dates',
      'C) Investing only in zero-coupon bonds',
      'D) Frequent trading of bonds based on interest rate predictions'
    ],
    correctAnswer: 1,
    explanation: 'A bond ladder spreads investments across bonds with different maturity dates (e.g., 1, 2, 3, 4, 5 years). As each bond matures, proceeds are reinvested at the longest maturity. This balances reinvestment risk, provides regular liquidity, and averages interest rate exposure over time.'
  },
  // INV-3: Additional Equity
  {
    id: 'CFP-INV-B5-024',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Equity',
    subtopic: 'Small Cap Effect',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The "small-cap effect" refers to the historical tendency for:',
    options: [
      'A) Large-cap stocks to outperform small-cap stocks',
      'B) Small-cap stocks to provide higher long-term returns with higher volatility',
      'C) Small-cap stocks to be less risky than large-cap stocks',
      'D) Both size categories to perform identically over time'
    ],
    correctAnswer: 1,
    explanation: 'The small-cap effect describes the historical observation that small-capitalization stocks have tended to outperform large-cap stocks over long periods, though with significantly higher volatility. This is one of the Fama-French factors explaining stock returns beyond market beta alone.'
  },
  {
    id: 'CFP-INV-B5-025',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Equity',
    subtopic: 'International Investing',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'An investor holding international stocks unhedged is exposed to:',
    options: [
      'A) Only stock market risk',
      'B) Only currency risk',
      'C) Both stock market risk and currency risk',
      'D) Neither stock market risk nor currency risk'
    ],
    correctAnswer: 2,
    explanation: 'Unhedged international investments expose investors to both the performance of foreign stocks AND changes in currency exchange rates. A strong foreign market can still result in losses for a US investor if the foreign currency weakens against the dollar. Hedging can reduce currency risk but adds cost.'
  }
];
