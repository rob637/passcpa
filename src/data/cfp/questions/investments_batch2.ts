/**
 * CFP Investment Questions - Batch 2
 * Domain 4: Investment Planning (11% of exam)
 * 
 * Additional questions covering portfolio theory, asset classes,
 * security analysis, and investment vehicles.
 */

import { Question } from '../../../types';

export const CFP_INV_BATCH2_QUESTIONS: Question[] = [
  // ============================================
  // Portfolio Theory & Modern Portfolio Theory
  // ============================================
  {
    id: 'cfp-inv-b2-001',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Portfolio Theory',
    subtopic: 'Efficient Frontier',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `According to Modern Portfolio Theory, which statement BEST describes an efficient portfolio?`,
    options: [
      'B) A portfolio that maximizes return for a given level of risk',
      'D) A portfolio with only large-cap stocks',
      'A) A portfolio with the highest possible return',
      'C) A portfolio with zero systematic risk',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B (Maximizes return for a given level of risk)**

An efficient portfolio offers the maximum expected return for a given level of risk, or minimum risk for a given expected return. These portfolios lie on the efficient frontier.

**Why other answers are wrong:**
- **A)** Highest return ignores risk; not necessarily efficient
- **C)** Zero systematic risk is not the definition of efficiency
- **D)** Asset composition doesn't define efficiency`
  },
  {
    id: 'cfp-inv-b2-002',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Portfolio Theory',
    subtopic: 'Diversification',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A portfolio has two equally weighted assets with individual standard deviations of 20% each and a correlation of 0.40. What is the portfolio's standard deviation?`,
    options: [
      'D) 10.0%',
      'B) 16.7%',
      'A) 20.0%',
      'C) 14.0%',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (16.7%)**

**Two-Asset Portfolio Standard Deviation:**
σp = √(w₁²σ₁² + w₂²σ₂² + 2w₁w₂σ₁σ₂ρ₁₂)

σp = √(.5² × .20² + .5² × .20² + 2 × .5 × .5 × .20 × .20 × .40)
σp = √(.01 + .01 + .008)
σp = √.028 = 16.7%

Diversification reduced risk from 20% to 16.7% because correlation < 1.

**Why other answers are wrong:**
- **A) 20.0%:** Would require perfect correlation (ρ = 1)
- **C) 14.0%:** Uses incorrect formula
- **D) 10.0%:** Would require negative correlation`
  },
  {
    id: 'cfp-inv-b2-003',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Portfolio Theory',
    subtopic: 'Beta and Systematic Risk',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `A stock has a beta of 1.3. If the market declines by 8%, approximately how much would the stock be expected to decline, assuming no company-specific factors?`,
    options: [
      'A) 6.2%',
      'D) 9.3%',
      'B) 8.0%',
      'C) 10.4%',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (10.4%)**

**Beta Relationship:**
Expected stock movement = Beta × Market movement
Expected decline = 1.3 × 8% = 10.4%

Beta measures systematic risk relative to the market. A beta > 1 indicates higher sensitivity to market movements.

**Why other answers are wrong:**
- **A) 6.2%:** Would be a beta of 0.77
- **B) 8.0%:** Would be a beta of 1.0
- **D) 9.3%:** Calculation error`
  },
  {
    id: 'cfp-inv-b2-004',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Portfolio Theory',
    subtopic: 'Capital Asset Pricing Model',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `Using CAPM, calculate the expected return for a security with a beta of 1.2, given a risk-free rate of 4% and an expected market return of 10%.`,
    options: [
      'D) 14.4%',
      'A) 10.0%',
      'B) 11.2%',
      'C) 12.0%',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B (11.2%)**

**CAPM Formula:**
E(R) = Rf + β(Rm - Rf)
E(R) = 4% + 1.2(10% - 4%)
E(R) = 4% + 1.2(6%)
E(R) = 4% + 7.2%
E(R) = 11.2%

**Why other answers are wrong:**
- **A) 10.0%:** Market return, not the security's expected return
- **C) 12.0%:** Uses beta × market return without risk-free rate
- **D) 14.4%:** Uses beta × market return incorrectly`
  },
  {
    id: 'cfp-inv-b2-005',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Portfolio Theory',
    subtopic: 'Alpha',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `A fund has an actual return of 14%, beta of 1.1, with a risk-free rate of 3% and market return of 11%. What is the fund's alpha?`,
    options: [
      'D) -1.0%',
      'A) 3.0%',
      'B) 2.2%',
      'C) 0.8%',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B (2.2%)**

**Alpha Calculation:**
Alpha = Actual Return - CAPM Expected Return
Expected Return = 3% + 1.1(11% - 3%) = 3% + 8.8% = 11.8%
Alpha = 14% - 11.8% = 2.2%

Positive alpha indicates outperformance relative to risk-adjusted expectations.

**Why other answers are wrong:**
- **A) 3.0%:** Simple difference from market return
- **C) 0.8%:** Calculation error
- **D) -1.0%:** Uses wrong formula`
  },
  // ============================================
  // Fixed Income Securities
  // ============================================
  {
    id: 'cfp-inv-b2-006',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Bond Pricing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `A bond has a $1,000 par value, 5% coupon rate, 10 years to maturity, and a current yield to maturity of 6%. The bond is trading at:`,
    options: [
      'A) Par value',
      'B) A premium',
      'D) Cannot be determined',
      'C) A discount',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (A discount)**

When YTM > Coupon Rate, the bond trades at a discount.
- Coupon rate: 5%
- YTM: 6%
- Since 6% > 5%, the bond trades below par (discount)

Investors require a lower price to achieve the higher market rate.

**Why other answers are wrong:**
- **A)** Par requires YTM = Coupon Rate
- **B)** Premium requires YTM < Coupon Rate
- **D)** Sufficient information provided`
  },
  {
    id: 'cfp-inv-b2-007',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Duration',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `A bond portfolio has a duration of 6.5 years and a current value of $500,000. If interest rates increase by 0.75%, what is the approximate change in portfolio value?`,
    options: [
      'A) Decrease of $24,375',
      'B) Increase of $24,375',
      'D) Decrease of $3,750',
      'C) Decrease of $32,500',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: A (Decrease of $24,375)**

**Duration Formula:**
ΔValue ≈ -Duration × Δr × Current Value
ΔValue = -6.5 × 0.0075 × $500,000
ΔValue = -$24,375

When rates rise, bond prices fall. Duration quantifies this inverse relationship.

**Why other answers are wrong:**
- **B)** Wrong direction; rates up means prices down
- **C)** Uses Δr of 1.0%
- **D)** Uses Δr of 0.1%`
  },
  {
    id: 'cfp-inv-b2-008',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Yield Spread',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Which statement about credit spreads is CORRECT?`,
    options: [
      'B) Higher credit spreads indicate lower default risk',
      'D) Credit spreads widen during times of financial stress',
      'A) Credit spreads typically narrow during recessions',
      'C) Investment-grade bonds have spreads near zero',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: D (Credit spreads widen during times of financial stress)**

During economic stress or recessions:
- Investors demand higher premiums for credit risk
- Flight to quality increases Treasury demand
- Corporate bond yields rise relative to Treasuries
- Result: Credit spreads widen

**Why other answers are wrong:**
- **A)** Spreads widen in recessions, not narrow
- **B)** Higher spreads = higher perceived default risk
- **C)** Even AAA-rated bonds have some spread above Treasuries`
  },
  {
    id: 'cfp-inv-b2-009',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Municipal Bonds',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `An investor in the 32% federal tax bracket is comparing a municipal bond yielding 3.5% to a taxable corporate bond. What taxable equivalent yield does the municipal bond offer?`,
    options: [
      'B) 5.15%',
      'D) 2.38%',
      'A) 4.62%',
      'C) 4.38%',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B (5.15%)**

**Taxable Equivalent Yield:**
TEY = Municipal Yield / (1 - Tax Rate)
TEY = 3.5% / (1 - 0.32)
TEY = 3.5% / 0.68
TEY = 5.15%

The investor would need a 5.15% taxable yield to match the 3.5% municipal yield.

**Why other answers are wrong:**
- **A) 4.62%:** Uses wrong tax rate
- **C) 4.38%:** Calculation error
- **D) 2.38%:** Uses muni yield × (1 - tax rate)`
  },
  {
    id: 'cfp-inv-b2-010',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Bond Risks',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Which risk is MOST relevant for an investor who plans to hold a Treasury bond until maturity?`,
    options: [
      'D) Inflation risk',
      'B) Interest rate risk',
      'A) Default risk',
      'C) Reinvestment risk',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: D (Inflation risk)**

For a hold-to-maturity investor in Treasury bonds:
- **Default risk:** Minimal for Treasuries
- **Interest rate risk:** Eliminated if holding to maturity
- **Reinvestment risk:** Applies to coupon reinvestment but secondary
- **Inflation risk:** Primary concern - fixed payments lose purchasing power

**Why other answers are wrong:**
- **A)** Treasuries are essentially default-free
- **B)** Holding to maturity eliminates interest rate risk
- **C)** Present but less impactful than inflation`
  },
  // ============================================
  // Equity Securities
  // ============================================
  {
    id: 'cfp-inv-b2-011',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Equity Securities',
    subtopic: 'Dividend Discount Model',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `A stock pays a current dividend of $2.40, which is expected to grow at 4% indefinitely. If the required return is 10%, what is the stock's intrinsic value using the Gordon Growth Model?`,
    options: [
      'D) $48.00',
      'B) $24.00',
      'A) $40.00',
      'C) $41.60',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C ($41.60)**

**Gordon Growth Model:**
P = D₁ / (r - g)
Where D₁ = D₀ × (1 + g) = $2.40 × 1.04 = $2.496

P = $2.496 / (0.10 - 0.04)
P = $2.496 / 0.06
P = $41.60

**Why other answers are wrong:**
- **A) $40.00:** Uses D₀ instead of D₁
- **B) $24.00:** Uses wrong formula
- **D) $48.00:** Calculation error`
  },
  {
    id: 'cfp-inv-b2-012',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Equity Securities',
    subtopic: 'P/E Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: `Company A has a P/E ratio of 18 and earnings per share of $4.50. Company B is in the same industry with a P/E ratio of 22. If an analyst believes Company A should trade at the industry P/E, what is the implied value per share?`,
    options: [
      'D) $108.00',
      'A) $81.00',
      'B) $99.00',
      'C) $90.00',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B ($99.00)**

**Relative Valuation:**
If Company A should trade at industry P/E of 22:
Implied Price = EPS × Industry P/E
Implied Price = $4.50 × 22 = $99.00

Current price = $4.50 × 18 = $81.00, suggesting undervaluation.

**Why other answers are wrong:**
- **A) $81.00:** Current price using Company A's P/E
- **C) $90.00:** Incorrect P/E used
- **D) $108.00:** Calculation error`
  },
  {
    id: 'cfp-inv-b2-013',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Equity Securities',
    subtopic: 'Growth vs Value',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: `Which characteristic is MOST associated with value stocks compared to growth stocks?`,
    options: [
      'D) Higher expected earnings growth',
      'A) Higher P/E ratios',
      'B) Lower dividend yields',
      'C) Trading below intrinsic value estimates',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Trading below intrinsic value estimates)**

**Value Stock Characteristics:**
- Lower P/E, P/B ratios
- Higher dividend yields
- Trading below intrinsic value
- Often in mature industries

**Growth Stock Characteristics:**
- Higher P/E ratios
- Low or no dividends (reinvesting earnings)
- High expected earnings growth

**Why other answers are wrong:**
- **A, B, D)** These describe growth stocks, not value stocks`
  },
  {
    id: 'cfp-inv-b2-014',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Equity Securities',
    subtopic: 'Stock Splits',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: `An investor owns 400 shares of a stock trading at $90. After a 3-for-1 stock split, what will they own?`,
    options: [
      'A) 400 shares at $30',
      'D) 133 shares at $270',
      'B) 1,200 shares at $30',
      'C) 1,200 shares at $90',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B (1,200 shares at $30)**

**3-for-1 Stock Split:**
- Shares multiply by 3: 400 × 3 = 1,200 shares
- Price divides by 3: $90 / 3 = $30 per share
- Total value unchanged: $36,000

Stock splits don't change total value, just the number of shares and price per share.

**Why other answers are wrong:**
- **A)** Only adjusts price, not shares
- **C)** Doesn't adjust price
- **D)** Describes a reverse split`
  },
  {
    id: 'cfp-inv-b2-015',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Equity Securities',
    subtopic: 'Market Efficiency',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Under the semi-strong form of market efficiency, which investment strategy would NOT be expected to generate excess returns?`,
    options: [
      'A) Trading based on insider information',
      'B) Fundamental analysis of financial statements',
      'D) Both B and C',
      'C) Technical analysis of price patterns',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: D (Both B and C)**

**Semi-Strong Form Efficiency:**
Prices reflect all publicly available information, including:
- Historical prices (technical analysis)
- Financial statements (fundamental analysis)

Neither strategy beats the market if semi-strong efficiency holds.

Only insider information (strong form) could provide an edge.

**Why other answers are wrong:**
- **A)** Insider info can still generate returns (but is illegal)
- **B, C)** Both are ruled out under semi-strong efficiency`
  },
  // ============================================
  // Investment Vehicles
  // ============================================
  {
    id: 'cfp-inv-b2-016',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Vehicles',
    subtopic: 'Mutual Funds',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Which statement about mutual fund share classes is CORRECT?`,
    options: [
      'B) Class B shares have front-end loads but no back-end loads',
      'A) Class A shares typically have the highest ongoing expenses',
      'D) All share classes have identical total costs over any time period',
      'C) Class C shares typically have level loads and higher annual expenses',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Class C shares have level loads and higher annual expenses)**

**Share Class Characteristics:**
- **Class A:** Front-end load, lower ongoing expenses (better for long-term)
- **Class B:** Back-end load (CDSC), higher 12b-1 fees, converts to A
- **Class C:** Level load (1% or so), higher ongoing expenses (better for short-term)

**Why other answers are wrong:**
- **A)** Class A typically has lowest ongoing expenses
- **B)** Class B has back-end loads, not front-end
- **D)** Total costs vary significantly by holding period`
  },
  {
    id: 'cfp-inv-b2-017',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Vehicles',
    subtopic: 'ETFs',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Which is an advantage of ETFs over traditional mutual funds?`,
    options: [
      'B) ETFs can be traded throughout the day at market prices',
      'A) ETFs are always actively managed',
      'D) ETFs must distribute capital gains annually',
      'C) ETFs have higher expense ratios',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B (ETFs can be traded throughout the day)**

**ETF Advantages:**
- Intraday trading at market prices
- Generally lower expense ratios
- Tax efficiency (in-kind redemptions)
- Transparency (holdings disclosed daily)

**Why other answers are wrong:**
- **A)** Most ETFs are passively managed (index tracking)
- **C)** ETFs typically have lower expense ratios
- **D)** ETFs are more tax-efficient, with fewer distributions`
  },
  {
    id: 'cfp-inv-b2-018',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Vehicles',
    subtopic: 'REITs',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `To qualify as a REIT, which requirement must be met?`,
    options: [
      'D) Be privately held',
      'B) Distribute at least 90% of taxable income to shareholders',
      'A) At least 50% of assets in real estate',
      'C) Have fewer than 100 shareholders',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B (Distribute at least 90% of taxable income)**

**REIT Requirements:**
- 90% of taxable income distributed as dividends
- 75% of assets in real estate
- At least 100 shareholders
- No more than 50% held by 5 or fewer individuals
- 75% of gross income from real estate activities

**Why other answers are wrong:**
- **A)** 75% asset test, not 50%
- **C)** Must have at least 100 shareholders
- **D)** REITs are typically publicly traded`
  },
  {
    id: 'cfp-inv-b2-019',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Vehicles',
    subtopic: 'Options',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `An investor buys a call option for $4 with a strike price of $50. The stock is currently $48. At expiration, the stock is trading at $58. What is the investor's profit per share?`,
    options: [
      'D) $6',
      'B) $4',
      'A) $8',
      'C) $10',
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B ($4 profit)**

**Call Option Profit Calculation:**
- Intrinsic Value at Expiration: $58 - $50 = $8
- Premium Paid: $4
- Net Profit: $8 - $4 = $4 per share

The option is in-the-money by $8, minus the $4 cost = $4 profit.

**Why other answers are wrong:**
- **A) $8:** Ignores premium paid
- **C) $10:** Wrong calculation
- **D) $6:** Calculation error`
  },
  {
    id: 'cfp-inv-b2-020',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-4',
    topic: 'Investment Vehicles',
    subtopic: 'Annuities',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Which statement about variable annuities is CORRECT?`,
    options: [
      'B) Investment risk is borne by the insurance company',
      'D) All gains are tax-free if held for 10+ years',
      'A) Returns are fixed and guaranteed',
      'C) Withdrawals before 59½ may incur a 10% penalty',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Withdrawals before 59½ may incur 10% penalty)**

**Variable Annuity Features:**
- Investment subaccounts (like mutual funds)
- Investment risk borne by owner, not insurer
- Tax-deferred growth
- 10% early withdrawal penalty before 59½
- Ordinary income tax on earnings (no capital gains treatment)

**Why other answers are wrong:**
- **A)** Variable means returns fluctuate with subaccounts
- **B)** Owner bears investment risk
- **D)** Gains are taxed as ordinary income, not tax-free`
  },
  // ============================================
  // Performance Measurement
  // ============================================
  {
    id: 'cfp-inv-b2-021',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Performance Measurement',
    subtopic: 'Sharpe Ratio',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `Portfolio A has a return of 12%, standard deviation of 18%, and the risk-free rate is 3%. What is the Sharpe ratio?`,
    options: [
      'D) 1.00',
      'B) 0.67',
      'A) 0.50',
      'C) 0.75',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: A (0.50)**

**Sharpe Ratio Formula:**
Sharpe = (Portfolio Return - Risk-Free Rate) / Standard Deviation
Sharpe = (12% - 3%) / 18%
Sharpe = 9% / 18%
Sharpe = 0.50

Higher Sharpe ratios indicate better risk-adjusted performance.

**Why other answers are wrong:**
- Other values result from calculation errors`
  },
  {
    id: 'cfp-inv-b2-022',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Performance Measurement',
    subtopic: 'Treynor Ratio',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: `A portfolio has a return of 11%, beta of 0.8, and the risk-free rate is 2%. What is the Treynor ratio?`,
    options: [
      'A) 0.1125',
      'D) 11.25',
      'B) 0.0900',
      'C) 13.75',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: A (0.1125 or 11.25%)**

**Treynor Ratio Formula:**
Treynor = (Portfolio Return - Risk-Free Rate) / Beta
Treynor = (11% - 2%) / 0.8
Treynor = 9% / 0.8
Treynor = 0.1125 or 11.25%

Treynor measures excess return per unit of systematic risk (beta).

**Why other answers are wrong:**
- **B)** Uses wrong formula
- **C, D)** These show the percentage form; A is correct in decimal form`
  },
  {
    id: 'cfp-inv-b2-023',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Performance Measurement',
    subtopic: 'Benchmark Comparison',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: `Which benchmark would be MOST appropriate for evaluating a small-cap value mutual fund?`,
    options: [
      'D) Bloomberg Aggregate Bond Index',
      'A) S&P 500 Index',
      'B) Russell 2000 Value Index',
      'C) MSCI EAFE Index',
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: B (Russell 2000 Value Index)**

Appropriate benchmarks match:
- Asset class (equity vs. fixed income)
- Market cap (large, mid, small)
- Style (growth vs. value)
- Geography (domestic vs. international)

Russell 2000 Value is the standard benchmark for US small-cap value strategies.

**Why other answers are wrong:**
- **A)** Large-cap benchmark
- **C)** International developed markets
- **D)** Fixed income benchmark`
  },
  {
    id: 'cfp-inv-b2-024',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Performance Measurement',
    subtopic: 'Dollar vs Time-Weighted',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: `When evaluating a portfolio manager's skill versus a client's actual investment experience, which measures should be used respectively?`,
    options: [
      'B) Time-weighted for manager; dollar-weighted for client',
      'A) Dollar-weighted for manager; time-weighted for client',
      'D) Dollar-weighted for both',
      'C) Time-weighted for both',
    ],
    correctAnswer: 0,
    explanation: `**Correct Answer: B (Time-weighted for manager; dollar-weighted for client)**

**Time-Weighted Return:**
- Eliminates impact of cash flows
- Shows pure investment performance
- Best for evaluating managers (they don't control deposits/withdrawals)

**Dollar-Weighted Return (IRR):**
- Incorporates timing of cash flows
- Shows actual investor experience
- Reflects client's return based on when they invested

**Why other answers are wrong:**
- Other combinations incorrectly assign the metrics`
  },
  {
    id: 'cfp-inv-b2-025',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-5',
    topic: 'Performance Measurement',
    subtopic: 'Risk Metrics',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: `Standard deviation measures which type of risk?`,
    options: [
      'A) Only systematic risk',
      'B) Only unsystematic risk',
      'D) Neither systematic nor unsystematic risk',
      'C) Total risk (systematic + unsystematic)',
    ],
    correctAnswer: 3,
    explanation: `**Correct Answer: C (Total risk)**

**Standard Deviation:**
- Measures total variability of returns
- Includes both systematic (market) and unsystematic (company-specific) risk
- Used in Sharpe ratio calculation

**Beta:**
- Measures only systematic risk
- Used in Treynor ratio and CAPM

**Why other answers are wrong:**
- **A, B)** Standard deviation captures both types
- **D)** It definitely measures risk`
  }
];

export default CFP_INV_BATCH2_QUESTIONS;
