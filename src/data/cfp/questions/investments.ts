/**
 * CFP Investment Questions
 * Domain 4: Investment Planning (11% of exam)
 * 
 * High-quality, scenario-based questions aligned with CFP exam standards.
 * Coverage: INV-1 through INV-3 blueprint areas
 */

import { Question } from '../../../types';

export const CFP_INV_QUESTIONS: Question[] = [
  // ============================================
  // INV-1: Investment Theory & Risk
  // ============================================
  {
    id: 'CFP-INV-001',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Analysis',
    subtopic: 'CAPM',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "An investor holds a portfolio with a Beta of 1.2. The market return is expected to be 10%, and the risk-free rate is 2%. According to CAPM, what is the required rate of return for this portfolio?",
    options: [
      "A) 11.6%",
      "B) 10.0%",
      "C) 12.0%",
      "D) 14.0%"
    ],
    correctAnswer: 0,
    explanation: "**Correct Answer: A (11.6%)**\n\n**CAPM Formula:** Ri = Rf + β × (Rm - Rf)\n\n**Calculation:**\n- Rf = 2%\n- Rm = 10%\n- Risk Premium = (10% - 2%) = 8%\n- Beta = 1.2\n\nRi = 2% + 1.2 × 8% = 2% + 9.6% = **11.6%**"
  },
  {
    id: 'CFP-INV-002',
    courseId: 'cfp',
    section: 'CFP-INV',
    courseId: 'cfp',
    blueprintArea: 'INV-1',
    question: "Which of the following risks cannot be diversified away?",
    options: [
      "A) Business Risk",
      "B) Financial Risk",
      "C) Systematic Risk",
      "D) Liquidity Risk"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C.** Systematic risk (Market Risk) is inherent to the entire market or economy (e.g., inflation, interest rate changes, war). It cannot be eliminated through diversification.\n\n**Incorrect Options:**\n* **A, B, D:** These are examples of Unsystematic Risk (idiosyncratic), which applies to specific companies or sectors and CAN be mitigated by holding a diverse portfolio.",
    topic: "Risk Management",
    subtopic: "Systematic Risk",
    difficulty: "easy"
    skillLevel: 'Remembering and Understanding',
  },
  {
    id: 'CFP-INV-003',
    courseId: 'cfp',
    section: 'CFP-INV',
    courseId: 'cfp',
    blueprintArea: 'INV-1',
    question: "A bond has a duration of 7 years. If interest rates rise by 1%, what is the expected approximate change in the bond's price?",
    options: [
      "A) Increase by 1%",
      "B) Decrease by 1%",
      "C) Increase by 7%",
      "D) Decrease by 7%"
    ],
    correctAnswer: 3,
    explanation: "**Correct Answer: D.** Duration measures a bond's sensitivity to interest rate changes. The relationship is inverse: if rates rise, prices fall. \n\nFormula: `% Price Change ≈ -Duration * ΔYield`.\nChange ≈ -7 * (+1%) = -7%.",
    topic: "Bond Analysis",
    subtopic: "Duration",
    difficulty: "medium"
    skillLevel: 'Application',
  },
  {
    id: 'CFP-INV-004',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Portfolio Theory',
    subtopic: 'Correlation',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: "Which of the following best describes the correlation coefficient of +1.0?",
    options: [
      "A) Assets move in exactly opposite directions.",
      "B) Assets have no relationship.",
      "C) Assets move in perfect lockstep (same direction, same magnitude relative to volatility).",
      "D) Assets provide maximum diversification benefit."
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C.** A correlation of +1.0 indicates a perfect positive linear relationship. \n\n**Significance:** Adding an asset with +1.0 correlation to a portfolio provides NO diversification benefit (other than weighted average return changes). Diversification benefits arise from correlations less than +1.0 (optimally -1.0)."
  },
  // ============================================
  // Additional INV-1 Questions
  // ============================================
  {
    id: 'CFP-INV-005',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Risk Measurement',
    subtopic: 'Standard Deviation vs Beta',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: "Stock A has a standard deviation of 25% and a beta of 0.8. Stock B has a standard deviation of 18% and a beta of 1.3. Which statement is MOST accurate?",
    options: [
      "A) Stock A has higher total risk and higher systematic risk",
      "B) Stock A has higher total risk but lower systematic risk",
      "C) Stock B has higher total risk and higher systematic risk",
      "D) Both stocks have equal risk when properly diversified"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**Analysis:**\n- **Standard deviation** measures TOTAL risk (systematic + unsystematic)\n- **Beta** measures only SYSTEMATIC risk (market-related)\n\n**Comparison:**\n- Stock A: Higher total risk (25% vs 18%), lower systematic risk (0.8 vs 1.3)\n- Stock B: Lower total risk, higher systematic risk\n\n**Implication:** Stock A has more unsystematic (diversifiable) risk. In a well-diversified portfolio, Stock B would contribute more to portfolio risk due to higher beta."
  },
  {
    id: 'CFP-INV-006',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Behavioral Finance',
    subtopic: 'Cognitive Biases',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "An investor refuses to sell a stock that has declined 40% from purchase price, saying 'I'll sell when I get back to even.' This behavior BEST exemplifies which cognitive bias?",
    options: [
      "A) Confirmation bias",
      "B) Loss aversion / disposition effect",
      "C) Recency bias",
      "D) Overconfidence"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Loss aversion / Disposition effect)**\n\nThe disposition effect is the tendency to:\n- Sell winners too early (to lock in gains)\n- Hold losers too long (to avoid realizing losses)\n\nThis stems from **loss aversion** - losses feel roughly 2x as painful as equivalent gains feel good. \"Getting back to even\" is a reference point that creates irrational holding behavior.\n\n**Why other answers are wrong:**\n- **A) Confirmation bias:** Seeking information that confirms existing beliefs\n- **C) Recency bias:** Overweighting recent events\n- **D) Overconfidence:** Overestimating one's abilities"
  },
  {
    id: 'CFP-INV-007',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Market Efficiency',
    subtopic: 'EMH Forms',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: "If markets are semi-strong form efficient, which investment strategy would NOT be expected to generate excess risk-adjusted returns?",
    options: [
      "A) Trading on insider information",
      "B) Fundamental analysis of public financial statements",
      "C) Technical analysis of price and volume patterns",
      "D) Both B and C"
    ],
    correctAnswer: 3,
    explanation: "**Correct Answer: D (Both B and C)**\n\n**Semi-Strong Form Efficiency:**\nPrices reflect ALL publicly available information, including:\n- Historical price data (makes technical analysis ineffective)\n- Public financial statements (makes fundamental analysis ineffective)\n\n**What could still work:** Only non-public (insider) information could generate excess returns.\n\n**EMH Hierarchy:**\n- Weak form: Prices reflect past prices → Technical analysis fails\n- Semi-strong: Prices reflect all public info → Fundamental analysis also fails\n- Strong: Prices reflect ALL info → Even insider trading fails"
  },
  {
    id: 'CFP-INV-008',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Modern Portfolio Theory',
    subtopic: 'Efficient Frontier',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "Portfolio X lies on the efficient frontier with expected return of 9% and standard deviation of 12%. Portfolio Y has expected return of 8% and standard deviation of 14%. What can be concluded?",
    options: [
      "A) Portfolio Y is inefficient because it has lower return and higher risk",
      "B) Portfolio Y may still be optimal for a highly risk-averse investor",
      "C) Portfolio X dominates Portfolio Y for all investors",
      "D) Both A and C are correct"
    ],
    correctAnswer: 3,
    explanation: "**Correct Answer: D (Both A and C)**\n\n**Dominance Principle:**\nPortfolio X **dominates** Portfolio Y because X offers:\n- Higher return (9% > 8%) AND\n- Lower risk (12% < 14%)\n\nNo rational investor would choose Y when X is available. This makes Y **inefficient** by definition - it's not on the efficient frontier.\n\n**Why B is wrong:**\nEven a risk-averse investor would prefer X. Risk aversion means wanting more return per unit of risk - X delivers this better than Y.\n\n**Key concept:** Portfolios below/right of the efficient frontier are dominated and should never be chosen."
  },
  // ============================================
  // INV-2: Investment Vehicles
  // ============================================
  {
    id: 'CFP-INV-009',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Bond Pricing',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "A 10-year corporate bond has a 5% coupon (paid annually) and a yield to maturity of 4%. The bond has a face value of $1,000. What is its approximate current price?",
    options: [
      "A) $1,081",
      "B) $1,000",
      "C) $926",
      "D) $1,162"
    ],
    correctAnswer: 0,
    explanation: "**Correct Answer: A ($1,081)**\n\n**Bond Pricing:**\nWhen coupon rate (5%) > YTM (4%), bond trades at a **premium**.\n\n**Calculation:**\nPV = Σ(Coupon/(1+YTM)^t) + Face/(1+YTM)^n\n\nPV = $50 × PVIFA(4%, 10) + $1,000 × PVIF(4%, 10)\nPV = $50 × 8.1109 + $1,000 × 0.6756\nPV = $405.55 + $675.60 = **$1,081.15**\n\n**Why other answers are wrong:**\n- **B)** Par value only when coupon = YTM\n- **C)** Discount price (would occur if YTM > coupon)\n- **D)** Overstated premium"
  },
  {
    id: 'CFP-INV-010',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Bond Risks',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: "Which investor faces the GREATEST reinvestment rate risk?",
    options: [
      "A) Investor holding a 10-year zero-coupon bond",
      "B) Investor holding a 10-year bond with 8% coupon in a falling rate environment",
      "C) Investor holding a 30-year Treasury STRIP",
      "D) Investor in a stable value fund"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**Reinvestment Rate Risk:**\nThe risk that coupon payments will be reinvested at lower rates than the original yield.\n\n**Analysis:**\n- **A & C) Zero-coupon bonds:** No reinvestment risk - there are no coupons to reinvest\n- **B) High coupon bond + falling rates:** MAXIMUM reinvestment risk\n  - Must reinvest 8% coupons at new lower rates\n  - Reduces effective yield\n- **D) Stable value fund:** Designed to minimize interest rate volatility\n\n**Key insight:** Higher coupon + longer maturity + falling rates = greatest reinvestment risk."
  },
  {
    id: 'CFP-INV-011',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Equity Securities',
    subtopic: 'Stock Valuation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "XYZ Corp currently pays a $2.00 dividend, expected to grow at 15% for 3 years, then 4% perpetually. Required return is 10%. What is the approximate intrinsic value using a two-stage DDM?",
    options: [
      "A) $38.50",
      "B) $45.80",
      "C) $52.30",
      "D) $33.33"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B ($45.80)**\n\n**Two-Stage DDM Calculation:**\n\n**Stage 1 - High Growth (Years 1-3):**\n- D1 = $2.00 × 1.15 = $2.30\n- D2 = $2.30 × 1.15 = $2.645\n- D3 = $2.645 × 1.15 = $3.042\n\nPV of Stage 1 = $2.30/1.10 + $2.645/1.10² + $3.042/1.10³\n= $2.09 + $2.19 + $2.29 = $6.57\n\n**Stage 2 - Terminal Value (Year 3):**\n- D4 = $3.042 × 1.04 = $3.164\n- Terminal Value at Year 3 = $3.164 / (0.10 - 0.04) = $52.73\n- PV of Terminal = $52.73 / 1.10³ = $39.62\n\n**Total Value:** $6.57 + $39.62 = **$46.19 ≈ $45.80**"
  },
  {
    id: 'CFP-INV-012',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Mutual Funds',
    subtopic: 'Fund Structure',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: "Which statement about Exchange-Traded Funds (ETFs) versus open-end mutual funds is CORRECT?",
    options: [
      "A) ETFs always have lower expense ratios than comparable mutual funds",
      "B) ETF investors buy and sell at NAV calculated at end of day",
      "C) ETFs generally have better tax efficiency due to in-kind redemptions",
      "D) Mutual funds can be traded throughout the day on exchanges"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C**\n\n**ETF Tax Efficiency:**\nETFs use an \"in-kind\" creation/redemption process with authorized participants. When shares are redeemed, the ETF delivers securities (not cash), avoiding recognition of embedded capital gains.\n\n**Result:** ETF investors rarely receive taxable capital gain distributions.\n\n**Why other answers are wrong:**\n- **A)** Generally true, but not ALWAYS (some specialized ETFs have high fees)\n- **B)** Reversed - ETFs trade intraday at market prices; mutual funds trade at end-of-day NAV\n- **D)** Reversed - ETFs trade intraday; mutual funds settle at NAV"
  },
  {
    id: 'CFP-INV-013',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Alternative Investments',
    subtopic: 'Hedge Fund Strategies',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "A hedge fund manager uses a market-neutral strategy with equal long and short equity positions. Which risk is this strategy primarily designed to eliminate?",
    options: [
      "A) Interest rate risk",
      "B) Currency risk",
      "C) Market (beta) risk",
      "D) Liquidity risk"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (Market/Beta risk)**\n\n**Market-Neutral Strategy:**\n- Equal dollar amounts long and short\n- Net market exposure ≈ zero (beta ≈ 0)\n- Returns come from security selection (alpha), not market direction\n\n**Example:**\n- $10M long positions (stocks expected to outperform)\n- $10M short positions (stocks expected to underperform)\n- If market rises 10%: longs gain ~10%, shorts lose ~10% → net ~0\n- Profit comes from long stocks beating short stocks\n\n**Why other answers are wrong:**\n- **A, B)** Not directly addressed by equity long/short\n- **D)** May actually increase liquidity risk (short positions)"
  },
  {
    id: 'CFP-INV-014',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Derivatives',
    subtopic: 'Options Strategies',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "An investor owns 500 shares of ABC stock at $80/share. She sells 5 covered call contracts with a strike of $85 for a premium of $3/share. At expiration, ABC trades at $92. What is her total profit on the combined position?",
    options: [
      "A) $4,000",
      "B) $6,500",
      "C) $2,500",
      "D) $4,500"
    ],
    correctAnswer: 0,
    explanation: "**Correct Answer: A ($4,000)**\n\n**Covered Call Analysis:**\nWhen stock finishes above strike, shares are called away at strike price.\n\n**Calculation:**\n1. Stock profit: ($85 - $80) × 500 = $2,500\n   - Capped at strike price, not $92\n2. Premium received: $3 × 500 = $1,500\n3. **Total profit: $2,500 + $1,500 = $4,000**\n\n**What she gave up:**\n- Additional gain if held: ($92 - $85) × 500 = $3,500\n- But she kept the $1,500 premium\n\n**Covered call tradeoff:** Limited upside in exchange for premium income."
  },
  // ============================================
  // INV-3: Portfolio Management
  // ============================================
  {
    id: 'CFP-INV-015',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Asset Allocation',
    subtopic: 'Strategic vs Tactical',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: "Which statement BEST describes the difference between strategic and tactical asset allocation?",
    options: [
      "A) Strategic allocation changes monthly; tactical allocation is fixed for life",
      "B) Strategic allocation sets long-term targets; tactical makes short-term adjustments based on market conditions",
      "C) Tactical allocation is for conservative investors; strategic is for aggressive investors",
      "D) There is no meaningful difference between the two approaches"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**Strategic Asset Allocation:**\n- Long-term, policy-driven target allocation\n- Based on investor's risk tolerance, time horizon, goals\n- Rebalanced periodically to maintain targets\n- Example: 60% stocks / 40% bonds\n\n**Tactical Asset Allocation:**\n- Short-term deviations from strategic targets\n- Based on market outlook, valuations, economic conditions\n- Active attempt to add value through timing\n- Example: Temporarily 70% stocks when market is undervalued"
  },
  {
    id: 'CFP-INV-016',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Performance Measurement',
    subtopic: 'Risk-Adjusted Returns',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "Fund A has a return of 14%, standard deviation of 20%, and beta of 1.1. Fund B has a return of 11%, standard deviation of 12%, and beta of 0.8. Risk-free rate is 3%. Which fund has the superior Sharpe ratio?",
    options: [
      "A) Fund A (Sharpe = 0.55)",
      "B) Fund B (Sharpe = 0.67)",
      "C) They have equal Sharpe ratios",
      "D) Cannot be determined without knowing market return"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Fund B, Sharpe = 0.67)**\n\n**Sharpe Ratio Formula:** (Rp - Rf) / σp\n\n**Fund A:**\n(14% - 3%) / 20% = 11% / 20% = **0.55**\n\n**Fund B:**\n(11% - 3%) / 12% = 8% / 12% = **0.67**\n\n**Interpretation:**\nFund B provides more excess return per unit of total risk. Despite lower absolute return, it's more efficient.\n\n**Note:** Sharpe uses standard deviation (total risk). Beta is not needed for Sharpe ratio - that's for Treynor ratio."
  },
  {
    id: 'CFP-INV-017',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Performance Measurement',
    subtopic: 'Alpha',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "A portfolio has a beta of 1.2 and achieved a return of 15%. The market returned 10% and the risk-free rate was 2%. What is the portfolio's Jensen's Alpha?",
    options: [
      "A) 3.0%",
      "B) 5.0%",
      "C) 3.4%",
      "D) 1.4%"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (3.4%)**\n\n**Jensen's Alpha Formula:**\nα = Rp - [Rf + β × (Rm - Rf)]\n\n**Step 1 - Calculate Expected Return (CAPM):**\nExpected = 2% + 1.2 × (10% - 2%)\nExpected = 2% + 1.2 × 8% = 2% + 9.6% = 11.6%\n\n**Step 2 - Calculate Alpha:**\nα = 15% - 11.6% = **3.4%**\n\n**Interpretation:**\nThe portfolio outperformed its risk-adjusted expected return by 3.4%. This represents the value added (or subtracted) by active management."
  },
  {
    id: 'CFP-INV-018',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Rebalancing',
    subtopic: 'Rebalancing Strategies',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: "A client's portfolio has drifted from the target of 60/40 stocks/bonds to 70/30. Which rebalancing approach would result in the LOWEST transaction costs over time?",
    options: [
      "A) Calendar rebalancing (monthly)",
      "B) Threshold rebalancing (5% corridor)",
      "C) Never rebalancing",
      "D) Daily rebalancing"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Threshold/Corridor rebalancing)**\n\n**Rebalancing Trade-offs:**\n\n**Calendar Rebalancing (A, D):**\n- Fixed schedule regardless of drift\n- May trade when unnecessary (small drift)\n- Frequent rebalancing = more transaction costs\n\n**Threshold Rebalancing (B):**\n- Trade only when allocation drifts beyond corridor (e.g., ±5%)\n- Avoids unnecessary trades during stable periods\n- Evidence shows this balances risk control with cost efficiency\n\n**Never Rebalancing (C):**\n- Zero transaction costs, but...\n- Portfolio drift increases risk (stocks may become 80%+)\n- Not a valid long-term strategy\n\n**Optimal:** 5-10% corridor rebalancing minimizes trading costs while maintaining risk profile."
  },
  {
    id: 'CFP-INV-019',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Policy Statement',
    subtopic: 'IPS Components',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: "Which of the following is typically NOT included in an Investment Policy Statement (IPS)?",
    options: [
      "A) Return objectives and risk tolerance",
      "B) Specific stock and bond recommendations",
      "C) Time horizon and liquidity needs",
      "D) Rebalancing guidelines and constraints"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Specific recommendations)**\n\n**IPS Purpose:**\nThe IPS is a **governance document** establishing investment guidelines, not a menu of specific investments.\n\n**Typically INCLUDED:**\n- Return objectives (absolute or relative)\n- Risk tolerance/capacity\n- Time horizon\n- Liquidity requirements\n- Tax considerations\n- Legal/regulatory constraints\n- Unique circumstances\n- Permitted/prohibited asset classes\n- Rebalancing policy\n- Benchmarks\n\n**NOT included:**\n- Specific securities (\"buy XYZ stock\")\n- Market timing recommendations\n- Short-term trading decisions\n\nImplementation decisions come AFTER IPS is established."
  },
  {
    id: 'CFP-INV-020',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Asset Location',
    subtopic: 'Tax-Efficient Placement',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: "A client has both taxable and tax-deferred accounts. Which asset placement strategy is generally MOST tax-efficient?",
    options: [
      "A) Place bonds in taxable accounts; stocks in tax-deferred accounts",
      "B) Place all assets equally across both account types",
      "C) Place bonds and REITs in tax-deferred accounts; stocks in taxable accounts",
      "D) Place high-growth stocks in tax-deferred accounts"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C**\n\n**Asset Location Principles:**\n\n**Tax-Deferred Accounts (Traditional IRA, 401k):**\n- Place tax-inefficient assets:\n  - Bonds (interest taxed as ordinary income)\n  - REITs (dividends taxed at ordinary rates)\n  - High-turnover funds (frequent distributions)\n\n**Taxable Accounts:**\n- Place tax-efficient assets:\n  - Stocks (qualified dividends at 0-20% rates)\n  - Index funds (low turnover, fewer distributions)\n  - Muni bonds (tax-exempt interest)\n\n**Why C is best:**\n- Shelters high-tax income (bond interest, REIT dividends)\n- Stocks in taxable get favorable LTCG/qualified dividend rates\n- Stocks also get step-up in basis at death\n\n**Why D is wrong:**\n- Stocks' favorable tax treatment is wasted in tax-deferred accounts"
  },
  {
    id: 'CFP-INV-021',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Modern Portfolio Theory',
    subtopic: 'Efficient Frontier',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "A portfolio with 8% expected return and 12% standard deviation lies on the efficient frontier. Another portfolio has 8% return and 15% standard deviation. Which statement is correct?",
    options: [
      "A) Both portfolios are efficient",
      "B) The second portfolio dominates the first",
      "C) The first portfolio dominates the second",
      "D) Neither portfolio is efficient"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (First portfolio dominates)**\n\n**Dominance Principle:**\nFor the same return, prefer lower risk (standard deviation).\n\n**Analysis:**\n| Portfolio | Return | Risk |\n|-----------|--------|------|\n| First | 8% | 12% |\n| Second | 8% | 15% |\n\n- Same return → compare risk\n- 12% < 15% → First is superior\n\n**Efficient Frontier:**\n- Contains all non-dominated portfolios\n- Maximum return for each risk level\n- Minimum risk for each return level\n\n**The second portfolio is inefficient** because a rational investor would never choose higher risk for the same return."
  },
  {
    id: 'CFP-INV-022',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Duration and Interest Rate Risk',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "A bond has a modified duration of 6.5 years. If interest rates rise by 0.75%, the bond's price will approximately:",
    options: [
      "A) Increase by 4.875%",
      "B) Decrease by 4.875%",
      "C) Increase by 6.5%",
      "D) Decrease by 0.75%"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Decrease by 4.875%)**\n\n**Duration Price Change Formula:**\n$$\\Delta P \\approx -D_{mod} \\times \\Delta y$$\n\n**Calculation:**\n- $\\Delta P \\approx -6.5 \\times 0.75\\%$\n- $\\Delta P \\approx -4.875\\%$\n\n**Key Concepts:**\n- Duration measures interest rate sensitivity\n- Negative relationship: rates ↑, price ↓\n- Modified duration gives % change per 1% rate change\n- This is an approximation (convexity adds precision)\n\n**Implications:**\n- Higher duration = more interest rate risk\n- To reduce rate risk: shorten duration\n- To increase rate risk: lengthen duration"
  },
  {
    id: 'CFP-INV-023',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Investment Vehicles',
    subtopic: 'ETFs vs Mutual Funds',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: "Which is a key advantage of ETFs over traditional mutual funds?",
    options: [
      "A) ETFs always have lower expense ratios",
      "B) ETFs can be traded intraday at market prices",
      "C) ETFs are actively managed while mutual funds are passive",
      "D) ETFs have no capital gains distributions"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Intraday trading at market prices)**\n\n**ETF vs Mutual Fund Comparison:**\n\n| Feature | ETF | Mutual Fund |\n|---------|-----|-------------|\n| Trading | Intraday | End of day NAV |\n| Minimum | 1 share | Often $1,000+ |\n| Tax efficiency | Higher | Lower |\n| Expense ratios | Often lower | Varies |\n\n**Why B is correct:**\n- ETFs trade like stocks throughout the day\n- Mutual funds only at 4 PM NAV\n- Allows limit orders, stop losses\n\n**Why others are wrong:**\n- A) Not always true (some MFs are cheaper)\n- C) Both can be active or passive\n- D) ETFs can have distributions (just fewer due to structure)"
  },
  {
    id: 'CFP-INV-024',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Performance Measurement',
    subtopic: 'Risk-Adjusted Returns',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: "Fund A has a Sharpe ratio of 0.85 and Fund B has a Sharpe ratio of 0.65. If both funds have the same expected return, what can you conclude?",
    options: [
      "A) Fund A took more risk to achieve the same return",
      "B) Fund B is the better choice for risk-averse investors",
      "C) Fund A achieved better risk-adjusted returns",
      "D) The funds have equal risk-adjusted performance"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (Fund A has better risk-adjusted returns)**\n\n**Sharpe Ratio:**\n$$Sharpe = \\frac{R_p - R_f}{\\sigma_p}$$\n\n**Interpretation:**\n- Higher Sharpe = more return per unit of risk\n- 0.85 > 0.65 → Fund A is superior\n\n**If returns are equal:**\n- Same numerator (R_p - R_f)\n- Different Sharpe → different denominators\n- Higher Sharpe means **lower risk** (smaller σ)\n\n**Conclusion:**\n- Fund A achieved the same return with **less risk**\n- Fund A is objectively better by this measure\n- Risk-averse investors should prefer Fund A (not B)"
  },
  {
    id: 'CFP-INV-025',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Strategies',
    subtopic: 'Dollar-Cost Averaging',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "An investor invests $1,000 monthly into a fund. The share prices over 4 months are $50, $40, $25, and $40. What is their average cost per share?",
    options: [
      "A) $35.71",
      "B) $36.36",
      "C) $38.75",
      "D) $40.00"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B ($36.36)**\n\n**Dollar-Cost Averaging Calculation:**\n\n| Month | Investment | Price | Shares |\n|-------|------------|-------|---------|\n| 1 | $1,000 | $50 | 20.00 |\n| 2 | $1,000 | $40 | 25.00 |\n| 3 | $1,000 | $25 | 40.00 |\n| 4 | $1,000 | $40 | 25.00 |\n| **Total** | **$4,000** | | **110.00** |\n\n**Average Cost Per Share:**\n$$\\frac{\\$4,000}{110 shares} = \\$36.36$$\n\n**Note:** Simple average price = ($50+$40+$25+$40)/4 = $38.75\nDCA average ($36.36) < simple average ($38.75)\n\n**DCA buys more shares when prices are low**, reducing average cost."
  },
  // ============================================
  // Additional INV Questions (026-045)
  // ============================================
  {
    id: 'CFP-INV-026',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Efficient Frontier',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: "A portfolio lying on the efficient frontier represents:",
    options: [
      "A) Maximum return regardless of risk",
      "B) Minimum risk regardless of return",
      "C) Maximum return for a given level of risk",
      "D) Zero correlation between assets"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C**\n\n**Efficient Frontier Concept:**\n\nThe efficient frontier is the set of portfolios that:\n- Offer the highest expected return for a given level of risk\n- Offer the lowest risk for a given expected return\n\n**Key Properties:**\n- Portfolios BELOW the frontier are suboptimal\n- No portfolios exist ABOVE the frontier\n- All points on the frontier are 'efficient'\n\n**Why other answers are wrong:**\n- **A)** Risk always matters - ignoring it isn't efficient\n- **B)** Returns matter too - minimum risk ignores return optimization\n- **D)** Zero correlation helps but isn't what defines the frontier"
  },
  {
    id: 'CFP-INV-027',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Duration',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "A bond has a modified duration of 7.5 years. If interest rates rise by 0.50%, approximately how much will the bond's price decline?",
    options: [
      "A) 0.50%",
      "B) 3.75%",
      "C) 7.50%",
      "D) 15.00%"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (3.75%)**\n\n**Duration Price Change Formula:**\n$$\\Delta P \\approx -D_{mod} \\times \\Delta y$$\n\n**Calculation:**\n- Modified Duration = 7.5\n- Rate Change = +0.50% = +0.005\n- Price Change ≈ -7.5 × 0.50% = **-3.75%**\n\n**Key Concepts:**\n- Duration measures interest rate sensitivity\n- Negative relationship: rates up → prices down\n- This is an approximation (convexity adjusts for larger moves)"
  },
  {
    id: 'CFP-INV-028',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Alpha',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: "Fund X has an alpha of -2%. This indicates that:",
    options: [
      "A) The fund's beta is negative",
      "B) The fund underperformed its risk-adjusted benchmark by 2%",
      "C) The fund had a 2% return",
      "D) The fund took 2% less risk than the market"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**Jensen's Alpha:**\n$$\\alpha = R_p - [R_f + \\beta(R_m - R_f)]$$\n\n**Interpretation:**\n- Positive Alpha = outperformed (manager added value)\n- Negative Alpha = underperformed (manager detracted value)\n- Alpha of -2% means the fund returned 2% LESS than expected given its risk\n\n**Example:**\n- If CAPM predicted 10% return for the fund's risk level\n- But fund returned 8%\n- Alpha = 8% - 10% = -2%\n\n**Why other answers are wrong:**\n- **A)** Alpha and beta are independent measures\n- **C)** Alpha is relative performance, not absolute return\n- **D)** Alpha measures return, not risk-taking"
  },
  {
    id: 'CFP-INV-029',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Yield Curve',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: "An inverted yield curve typically signals:",
    options: [
      "A) Expectations of higher inflation",
      "B) Expectations of economic recession",
      "C) Expectations of Fed rate increases",
      "D) Expectations of rising stock prices"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**Yield Curve Shapes:**\n- **Normal (upward):** Long rates > Short rates (healthy economy)\n- **Flat:** Long rates ≈ Short rates (transition period)\n- **Inverted:** Short rates > Long rates (recession signal)\n\n**Why Inverted Curves Predict Recession:**\n1. Investors expect future rate CUTS (economy weakening)\n2. Flight to safety in long-term bonds pushes long yields down\n3. Short rates stay high due to current Fed policy\n\n**Historical Accuracy:**\nInverted yield curves have preceded every U.S. recession since 1955 with only one false positive.\n\n**Why other answers are wrong:**\n- **A)** Higher inflation → steeper curve, not inverted\n- **C)** Rate hikes would raise short AND long rates\n- **D)** Recession signals usually mean falling stock prices"
  },
  {
    id: 'CFP-INV-030',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Vehicles',
    subtopic: 'ETFs vs Mutual Funds',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: "Which is a key advantage of ETFs over traditional open-end mutual funds?",
    options: [
      "A) ETFs never have expense ratios",
      "B) ETFs can be traded intraday at market prices",
      "C) ETFs always outperform mutual funds",
      "D) ETFs cannot hold international securities"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**ETF Advantages:**\n- Trade throughout the day like stocks\n- Known price at time of purchase\n- Lower expense ratios (typically)\n- More tax-efficient (in-kind redemptions)\n\n**Mutual Fund Characteristics:**\n- Priced once daily at NAV\n- Orders executed at end-of-day price\n- May generate more capital gains distributions\n\n**Why other answers are wrong:**\n- **A)** ETFs DO have expense ratios (just often lower)\n- **C)** No guarantee of outperformance\n- **D)** ETFs can absolutely hold international securities"
  },
  {
    id: 'CFP-INV-031',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Correlation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "Two assets have a correlation coefficient of -0.70. During portfolio construction, this implies:",
    options: [
      "A) The assets will always move in opposite directions",
      "B) Combining them offers significant diversification benefits",
      "C) The assets have the same expected return",
      "D) The portfolio will have no risk"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**Correlation Interpretation:**\n- +1.0 = Perfect positive (move together)\n- 0 = No relationship\n- -1.0 = Perfect negative (move opposite)\n\n**At -0.70:**\n- Strong negative correlation\n- When one zigs, the other often zags\n- Combining reduces portfolio volatility\n\n**Diversification Benefit:**\n$$\\sigma_{portfolio}^2 = w_1^2\\sigma_1^2 + w_2^2\\sigma_2^2 + 2w_1w_2\\sigma_1\\sigma_2\\rho_{12}$$\n\nNegative correlation (ρ) reduces the portfolio variance term.\n\n**Why other answers are wrong:**\n- **A)** -0.70 is not -1.0; movements aren't always opposite\n- **C)** Correlation doesn't imply equal returns\n- **D)** Risk is reduced, not eliminated"
  },
  {
    id: 'CFP-INV-032',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Bond Pricing',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "A 10-year, 6% coupon bond is currently trading at $950. The bond's yield to maturity is:",
    options: [
      "A) Less than 6%",
      "B) Equal to 6%",
      "C) Greater than 6%",
      "D) Cannot be determined"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (Greater than 6%)**\n\n**Bond Price vs. YTM Relationship:**\n- Price < Par (discount) → YTM > Coupon Rate\n- Price = Par → YTM = Coupon Rate\n- Price > Par (premium) → YTM < Coupon Rate\n\n**This Bond:**\n- Par = $1,000 (assumed)\n- Price = $950 (discount)\n- Coupon Rate = 6%\n- Therefore: YTM > 6%\n\n**Intuition:**\nBuyer pays $950 but receives $1,000 at maturity PLUS 6% coupons. Extra $50 gain boosts total return above 6%."
  },
  {
    id: 'CFP-INV-033',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Standard Deviation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: "If a portfolio has an expected return of 10% and a standard deviation of 15%, approximately what percentage of returns will fall between -5% and 25%?",
    options: [
      "A) 50%",
      "B) 68%",
      "C) 95%",
      "D) 99%"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (68%)**\n\n**Normal Distribution Rules:**\n- 68% within ±1 standard deviation\n- 95% within ±2 standard deviations\n- 99.7% within ±3 standard deviations\n\n**This Portfolio:**\n- Mean = 10%\n- Std Dev = 15%\n- 1 SD below: 10% - 15% = -5%\n- 1 SD above: 10% + 15% = 25%\n- Range: -5% to 25% = ±1 standard deviation\n\n**Answer:** Approximately **68%** of returns fall in this range."
  },
  {
    id: 'CFP-INV-034',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Vehicles',
    subtopic: 'REITs',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: "To qualify as a REIT, a company must distribute what percentage of its taxable income to shareholders?",
    options: [
      "A) 50%",
      "B) 75%",
      "C) 90%",
      "D) 100%"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (90%)**\n\n**REIT Requirements:**\n- Distribute at least **90%** of taxable income as dividends\n- At least 75% of assets in real estate, cash, or government securities\n- At least 75% of gross income from real estate sources\n- Have at least 100 shareholders\n- No more than 50% owned by 5 or fewer individuals\n\n**Tax Treatment:**\n- REIT pays no corporate tax on distributed income\n- Shareholders taxed at ordinary income rates on most dividends\n- Qualified dividend treatment NOT typically available\n\n**Why 90%?**\nCongress wanted REITs to be pass-through vehicles for real estate income, similar to mutual funds."
  },
  {
    id: 'CFP-INV-035',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Performance Measurement',
    subtopic: 'Treynor Ratio',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "Portfolio A has an expected return of 12%, beta of 1.5, and the risk-free rate is 3%. What is Portfolio A's Treynor ratio?",
    options: [
      "A) 0.06",
      "B) 0.08",
      "C) 6.0",
      "D) 8.0"
    ],
    correctAnswer: 0,
    explanation: "**Correct Answer: A (0.06 or 6%)**\n\n**Treynor Ratio Formula:**\n$$T = \\frac{R_p - R_f}{\\beta_p}$$\n\n**Calculation:**\n- Return = 12%\n- Risk-free = 3%\n- Beta = 1.5\n\n$$T = \\frac{12\\% - 3\\%}{1.5} = \\frac{9\\%}{1.5} = 6\\% = 0.06$$\n\n**Treynor vs. Sharpe:**\n- Treynor: Uses beta (systematic risk)\n- Sharpe: Uses standard deviation (total risk)\n- Use Treynor for diversified portfolios"
  },
  {
    id: 'CFP-INV-036',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Convexity',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "Why do bond investors prefer higher convexity (all else equal)?",
    options: [
      "A) Higher convexity means higher coupon payments",
      "B) Higher convexity means less interest rate sensitivity",
      "C) Higher convexity means price gains when rates fall exceed losses when rates rise",
      "D) Higher convexity guarantees higher yields"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C**\n\n**Convexity Benefit:**\nConvexity measures the curvature of the price-yield relationship:\n\n**When Rates FALL:**\n- Duration predicts a price increase\n- Convexity adds EXTRA gain (curve bends upward)\n\n**When Rates RISE:**\n- Duration predicts a price decrease\n- Convexity reduces the loss (curve bends less steeply)\n\n**Result:**\nPositive convexity = asymmetric returns in investor's favor\n\n**Example:**\nFor a given duration, higher convexity means:\n- +1% rate change → +5.5% price change\n- -1% rate change → -4.5% price change\n\n**Why other answers are wrong:**\n- **A)** Convexity isn't related to coupon payments\n- **B)** Duration drives sensitivity; convexity is secondary\n- **D)** No yield guarantee from convexity"
  },
  {
    id: 'CFP-INV-037',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Strategies',
    subtopic: 'Asset Allocation',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: "Studies on portfolio returns suggest that the largest contributor to long-term performance is:",
    options: [
      "A) Security selection",
      "B) Market timing",
      "C) Asset allocation",
      "D) Active trading"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (Asset Allocation)**\n\n**Brinson Study Findings:**\nThe landmark Brinson, Hood, and Beebower study found:\n- Asset allocation explains ~90% of portfolio return variability\n- Security selection explains ~5%\n- Market timing explains ~2%\n\n**Implications:**\n- The mix of stocks, bonds, real estate matters most\n- Picking individual securities matters less than asset class decisions\n- Trying to time the market typically fails\n\n**For Financial Planning:**\n- Focus on appropriate allocation for client's goals/risk tolerance\n- Rebalancing maintains target allocation\n- Don't overemphasize stock picking"
  },
  {
    id: 'CFP-INV-038',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Beta',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: "A stock with a beta of 0.5 would be expected to:",
    options: [
      "A) Decline 10% when the market declines 5%",
      "B) Decline 5% when the market declines 10%",
      "C) Remain unchanged regardless of market movements",
      "D) Always outperform the market"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**Beta Interpretation:**\n- Beta = 1.0: Moves with the market\n- Beta > 1.0: Amplifies market movements\n- Beta < 1.0: Dampens market movements\n- Beta = 0.5: Half as volatile as market\n\n**Calculation:**\nMarket decline = -10%\nStock movement = Beta × Market movement\nStock decline = 0.5 × (-10%) = **-5%**\n\n**Why other answers are wrong:**\n- **A)** Would require beta of 2.0\n- **C)** Would require beta of 0\n- **D)** Beta doesn't predict outperformance"
  },
  {
    id: 'CFP-INV-039',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Credit Risk',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: "The spread between corporate bond yields and Treasury yields is primarily compensation for:",
    options: [
      "A) Interest rate risk",
      "B) Inflation risk",
      "C) Credit (default) risk",
      "D) Reinvestment risk"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (Credit/Default Risk)**\n\n**Yield Spread Components:**\nCorporate yield = Treasury yield + Credit spread + Liquidity premium\n\n**Credit Spread:**\n- Compensation for default risk\n- Higher for lower-rated bonds\n- AAA spread: ~0.50%\n- BBB spread: ~1.50%\n- High-yield: 3%+\n\n**Why Treasuries have lower yields:**\n- Backed by U.S. government\n- Considered 'risk-free' for credit purposes\n\n**Why other answers are wrong:**\n- **A)** Both corporates and Treasuries have interest rate risk\n- **B)** Both affected by inflation equally\n- **D)** Both have reinvestment risk"
  },
  {
    id: 'CFP-INV-040',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Vehicles',
    subtopic: 'Options',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "An investor buys a call option with a strike price of $50 for a premium of $3. At expiration, the stock is trading at $58. What is the investor's profit per share?",
    options: [
      "A) $3",
      "B) $5",
      "C) $8",
      "D) $11"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B ($5)**\n\n**Call Option Profit Calculation:**\n\n**Given:**\n- Strike Price: $50\n- Premium Paid: $3\n- Stock Price at Expiration: $58\n\n**Step 1: Intrinsic Value**\n= Stock Price - Strike Price\n= $58 - $50 = $8\n\n**Step 2: Net Profit**\n= Intrinsic Value - Premium Paid\n= $8 - $3 = **$5 profit**\n\n**Breakeven:** $50 + $3 = $53\nStock at $58 > $53 breakeven → Profitable\n\n**Why other answers are wrong:**\n- **A)** That's the premium, not profit\n- **C)** Doesn't subtract the premium paid\n- **D)** Incorrect calculation"
  },
  {
    id: 'CFP-INV-041',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Coefficient of Variation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "Investment A has an expected return of 8% with standard deviation of 12%. Investment B has expected return of 12% with standard deviation of 20%. Which has better risk-adjusted performance?",
    options: [
      "A) Investment A (CV = 1.50)",
      "B) Investment B (CV = 1.67)",
      "C) They are equal",
      "D) Cannot be determined without beta"
    ],
    correctAnswer: 0,
    explanation: "**Correct Answer: A (Investment A)**\n\n**Coefficient of Variation (CV):**\n$$CV = \\frac{\\sigma}{\\mu} = \\frac{\\text{Standard Deviation}}{\\text{Expected Return}}$$\n\n**Calculations:**\n- Investment A: CV = 12%/8% = **1.50**\n- Investment B: CV = 20%/12% = **1.67**\n\n**Interpretation:**\n- Lower CV = less risk per unit of return\n- A takes 1.50 units of risk per 1 unit of return\n- B takes 1.67 units of risk per 1 unit of return\n- **A is more efficient**\n\n**When to use CV:**\nComparing investments with different return levels (like here)."
  },
  {
    id: 'CFP-INV-042',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Fixed Income',
    subtopic: 'Duration vs. Maturity',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: "Two bonds have the same maturity and yield. Bond A is a zero-coupon bond and Bond B pays a 5% annual coupon. Which has longer duration?",
    options: [
      "A) Bond A (zero-coupon)",
      "B) Bond B (coupon bond)",
      "C) They have the same duration",
      "D) Depends on credit rating"
    ],
    correctAnswer: 0,
    explanation: "**Correct Answer: A (Zero-coupon bond)**\n\n**Duration Principle:**\nDuration measures the weighted-average time to receive cash flows.\n\n**Zero-Coupon Bond:**\n- All cash flow at maturity\n- Duration = Maturity\n- 10-year zero → Duration = 10 years\n\n**Coupon Bond:**\n- Cash flows throughout (coupons + principal)\n- Duration < Maturity\n- 10-year 5% coupon → Duration ≈ 8 years\n\n**Why zeros have longer duration:**\nNo interim cash flows to 'pull forward' the weighted average.\n\n**Implication:**\nZero-coupon bonds are MORE sensitive to interest rate changes."
  },
  {
    id: 'CFP-INV-043',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Strategies',
    subtopic: 'Rebalancing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "A client's target allocation is 60/40 stocks/bonds. After a year, stocks rose and bonds fell, creating a 70/30 split. Rebalancing would involve:",
    options: [
      "A) Buying more stocks, selling bonds",
      "B) Selling stocks, buying bonds",
      "C) Selling both stocks and bonds",
      "D) No action needed"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Sell stocks, buy bonds)**\n\n**Rebalancing Logic:**\n\n**Current State:**\n- Stocks: 70% (overweight by 10%)\n- Bonds: 30% (underweight by 10%)\n\n**Target State:**\n- Stocks: 60%\n- Bonds: 40%\n\n**Action Required:**\n- Sell stocks (reduce from 70% to 60%)\n- Buy bonds (increase from 30% to 40%)\n\n**Rebalancing Benefits:**\n- Maintains target risk level\n- Forces 'buy low, sell high' behavior\n- Keeps portfolio aligned with goals\n\n**Methods:**\n- Calendar-based (quarterly, annually)\n- Threshold-based (when allocation drifts 5%+)"
  },
  {
    id: 'CFP-INV-044',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'R-Squared',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: "A mutual fund has an R-squared of 0.95 relative to the S&P 500. This means:",
    options: [
      "A) The fund has returned 95% of the S&P 500's return",
      "B) 95% of the fund's movements can be explained by the S&P 500",
      "C) The fund will outperform the S&P 500 95% of the time",
      "D) The fund holds 95% of the stocks in the S&P 500"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**R-Squared (R²) Definition:**\nMeasures how much of a fund's movements are explained by its benchmark.\n\n**Interpretation:**\n- R² = 1.00 (100%): Moves perfectly with benchmark\n- R² = 0.95 (95%): 95% explained by S&P 500\n- R² = 0.50: Only half explained by benchmark\n\n**Implications:**\n- High R² (>0.85): Index-like, beta is meaningful\n- Low R² (<0.70): Less benchmark-dependent, alpha matters more\n\n**For Fund Selection:**\nIf R² is high, why pay active management fees? Consider index fund.\n\n**Why other answers are wrong:**\n- **A)** R² isn't about return percentage\n- **C)** Doesn't predict outperformance\n- **D)** Doesn't indicate holdings"
  },
  {
    id: 'CFP-INV-045',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Strategies',
    subtopic: 'Tax-Loss Harvesting',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "An investor sells Stock X at a $10,000 loss for tax-loss harvesting and immediately buys Stock Y in the same sector. What is the primary tax consideration?",
    options: [
      "A) The wash sale rule applies since both are in the same sector",
      "B) The loss is deductible because the securities are not substantially identical",
      "C) Only $3,000 of the loss can be deducted",
      "D) The loss cannot be used due to constructive sale rules"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**Wash Sale Rule:**\nDisallows loss if you buy a 'substantially identical' security within 30 days before/after the sale.\n\n**Substantially Identical:**\n- Same stock or security = wash sale\n- Different company in same sector ≠ wash sale\n- Same sector ETF might be okay, but same-index ETF could be challenged\n\n**Example:**\n- Sell Apple at a loss ✗\n- Buy Apple back within 30 days = Wash sale\n- Buy Microsoft instead = Allowed (not identical)\n\n**Tax-Loss Harvesting Strategy:**\n1. Sell losing position\n2. Buy similar (not identical) replacement\n3. Maintain market exposure\n4. Claim the loss\n\n**Why other answers are wrong:**\n- **A)** Same sector doesn't trigger wash sale\n- **C)** $3,000 limit is for net losses offsetting ordinary income\n- **D)** Constructive sale applies to appreciated positions, not losses"
  },

  // ============================================
  // ADDITIONAL INVESTMENT QUESTIONS (46-75)
  // ============================================
  {
    id: 'CFP-INV-046',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Investment Vehicles',
    subtopic: 'REITs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "Which characteristic distinguishes REITs from other investment types for tax purposes?",
    options: [
      "A) REIT dividends are taxed at qualified dividend rates",
      "B) REITs must distribute at least 90% of taxable income to shareholders",
      "C) REIT capital gains are tax-deferred",
      "D) REIT losses can offset ordinary income"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**REIT Requirements:**\n- Distribute at least 90% of taxable income\n- At least 75% of assets in real estate\n- At least 75% of income from real estate sources\n- Minimum 100 shareholders\n\n**Tax Treatment:**\n- Most dividends taxed as ordinary income\n- QBI deduction may apply (up to 20%)\n- Pass-through of capital gains possible\n\n**Why other answers are wrong:**\n- **A)** Most REIT dividends are ordinary income\n- **C)** No special capital gains deferral\n- **D)** Passive loss rules still apply"
  },
  {
    id: 'CFP-INV-047',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Portfolio Risk',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "Two assets have the same expected return. Asset A has a standard deviation of 15% and Asset B has 20%. Their correlation is -0.3. A portfolio combining them equally would have:",
    options: [
      "A) A standard deviation of 17.5%",
      "B) A standard deviation less than 15%",
      "C) A standard deviation between 15% and 20%",
      "D) The same standard deviation as Asset A"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Less than 15%)**\n\n**Portfolio Standard Deviation with Negative Correlation:**\n\nWhen correlation is negative, diversification benefit is ENHANCED. The portfolio variance formula shows that with negative correlation (ρ = -0.3), the combined risk can be LOWER than the lowest-risk individual asset.\n\n**Why other answers are wrong:**\n- **A)** Simple average ignores diversification\n- **C)** Negative correlation can reduce below lowest\n- **D)** Diversification reduces below individual asset"
  },
  {
    id: 'CFP-INV-048',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Investment Vehicles',
    subtopic: 'ETF Tax Efficiency',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "ETFs are generally more tax-efficient than mutual funds primarily because of:",
    options: [
      "A) Lower expense ratios",
      "B) Intraday trading capability",
      "C) In-kind redemption of shares",
      "D) Better diversification"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (In-kind redemption)**\n\n**ETF Tax Efficiency Mechanism:**\n- When investors redeem, ETF delivers actual securities (in-kind)\n- No sale = no capital gains realization inside fund\n- Low-basis shares transferred out, increasing remaining basis\n- Fewer taxable distributions to remaining shareholders\n\n**Mutual Fund Problem:**\n- Redemptions require selling securities for cash\n- Sales trigger capital gains inside fund\n- Gains distributed to all shareholders\n\n**Why other answers are wrong:**\n- **A)** Expense ratios affect returns, not tax efficiency\n- **B)** Trading flexibility doesn't affect fund's tax situation\n- **D)** Diversification is similar between structures"
  },
  {
    id: 'CFP-INV-049',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Treynor Ratio',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "The Treynor ratio differs from the Sharpe ratio in that it uses:",
    options: [
      "A) Gross return instead of excess return",
      "B) Beta instead of standard deviation",
      "C) Alpha instead of excess return",
      "D) R-squared instead of standard deviation"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Beta)**\n\n**Treynor Ratio = (Rp - Rf) / βp**\n\n**Sharpe Ratio = (Rp - Rf) / σp**\n\n**Key Difference:**\n- Treynor: Reward per unit of SYSTEMATIC risk (beta)\n- Sharpe: Reward per unit of TOTAL risk (std deviation)\n\n**When to Use:**\n- Treynor: Well-diversified portfolios\n- Sharpe: Undiversified portfolios or total portfolio evaluation\n\n**Why other answers are wrong:**\n- **A)** Both use excess return (Rp - Rf)\n- **C)** Alpha is output, not denominator\n- **D)** R-squared measures correlation, not risk"
  },
  {
    id: 'CFP-INV-050',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Strategies',
    subtopic: 'Dollar-Cost Averaging',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: "Dollar-cost averaging is MOST beneficial when:",
    options: [
      "A) Markets are consistently rising",
      "B) Markets are volatile with no clear trend",
      "C) Markets are consistently falling",
      "D) Markets are stable with low volatility"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Volatile markets)**\n\n**Dollar-Cost Averaging Benefit:**\n- Fixed amount buys more shares when prices low\n- Fixed amount buys fewer shares when prices high\n- Average cost per share < average price per share\n\n**Works best with volatility:**\n- More opportunities to buy at various prices\n- Greater benefit from 'buying more when cheap'\n\n**Why other answers are wrong:**\n- **A)** Lump sum better in rising markets\n- **C)** Though you buy more shares, value keeps dropping\n- **D)** Less variation means less DCA benefit"
  },
  {
    id: 'CFP-INV-051',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Investment Vehicles',
    subtopic: 'Preferred Stock',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: "Which statement about preferred stock is CORRECT?",
    options: [
      "A) Preferred dividends are always tax-deductible by the corporation",
      "B) Preferred shareholders have voting rights superior to common shareholders",
      "C) Preferred stock typically has priority over common stock for dividends and liquidation",
      "D) Preferred stock prices are immune to interest rate changes"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C**\n\n**Preferred Stock Characteristics:**\n- Fixed dividend (like bonds)\n- Priority over common for dividends\n- Priority over common in liquidation\n- Generally no voting rights\n- Subordinate to bonds/debt\n\n**Why other answers are wrong:**\n- **A)** Dividends are not tax-deductible\n- **B)** Preferreds typically have NO voting rights\n- **D)** Very sensitive to interest rate changes"
  },
  {
    id: 'CFP-INV-052',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Efficient Market Hypothesis',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: "The semi-strong form of the Efficient Market Hypothesis suggests that:",
    options: [
      "A) Only insider information can be used to beat the market",
      "B) Technical analysis can identify mispriced securities",
      "C) Fundamental analysis cannot consistently generate excess returns",
      "D) All information, including insider, is reflected in prices"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C**\n\n**EMH Forms:**\n- **Weak:** Prices reflect all PAST market data\n- **Semi-strong:** Prices reflect all PUBLIC information\n- **Strong:** Prices reflect ALL information including insider\n\n**Semi-Strong Implications:**\n- New public info immediately incorporated\n- Cannot profit from financial statements, news, etc.\n\n**Why other answers are wrong:**\n- **A)** That's strong form\n- **B)** Technical analysis defeated at weak form\n- **D)** That's strong form"
  },
  {
    id: 'CFP-INV-053',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Strategies',
    subtopic: 'Core-Satellite',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "A core-satellite investment approach typically involves:",
    options: [
      "A) 100% actively managed funds",
      "B) Index funds for the core with active funds or alternatives for satellites",
      "C) Concentrating holdings in a few high-conviction stocks",
      "D) Equal allocation across all asset classes"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**Core-Satellite Strategy:**\n- **Core (60-80%):** Low-cost index funds for market exposure\n- **Satellites (20-40%):** Active managers, alternatives, sector bets\n\n**Benefits:**\n- Reduced overall costs\n- Market-like returns from core\n- Potential alpha from satellites\n\n**Why other answers are wrong:**\n- **A)** Core should be passive/indexed\n- **C)** That's concentration, not diversified core\n- **D)** Equal weight is different strategy"
  },
  {
    id: 'CFP-INV-054',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Investment Vehicles',
    subtopic: 'Bond Ratings',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: "A bond rated Ba1/BB+ by Moody's/S&P is classified as:",
    options: [
      "A) Investment grade",
      "B) High yield (junk)",
      "C) Government guaranteed",
      "D) Money market eligible"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (High yield)**\n\n**Rating Scale:**\n- **Investment Grade:** Moody's Baa3 or higher, S&P BBB- or higher\n- **High Yield (Junk):** Below investment grade\n\n**Ba1/BB+ is one notch below investment grade:**\n- Still considered speculative\n- Higher default risk\n- Higher yield to compensate\n\n**Why other answers are wrong:**\n- **A)** Investment grade starts at Baa3/BBB-\n- **C)** Government securities are typically AAA\n- **D)** Money market requires highest ratings"
  },
  {
    id: 'CFP-INV-055',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Duration Matching',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "An investor has a liability due in 7 years. To immunize against interest rate risk, they should:",
    options: [
      "A) Buy a 7-year zero-coupon bond",
      "B) Buy bonds with duration shorter than 7 years",
      "C) Buy the highest yielding bonds available",
      "D) Create a bond ladder with maturities every year"
    ],
    correctAnswer: 0,
    explanation: "**Correct Answer: A (7-year zero)**\n\n**Immunization Strategy:**\n- Match portfolio duration to liability duration\n- Zero-coupon bond duration = maturity\n- Perfect match eliminates reinvestment and price risk\n\n**Why 7-year zero is optimal:**\n- Duration exactly 7 years\n- No reinvestment risk\n- Value at 7 years = face value\n\n**Why other answers are wrong:**\n- **B)** Duration mismatch creates risk\n- **C)** Yield doesn't match liability timing\n- **D)** Ladder provides liquidity, not immunization"
  },
  {
    id: 'CFP-INV-056',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Strategies',
    subtopic: 'Asset Location',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "For tax-efficient asset location, which asset is BEST placed in a tax-deferred account?",
    options: [
      "A) Municipal bonds",
      "B) Growth stocks held long-term",
      "C) Taxable bond funds",
      "D) Tax-managed equity funds"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (Taxable bond funds)**\n\n**Asset Location Principles:**\n- Tax-deferred: Assets with high ordinary income (taxable bonds, REITs)\n- Taxable: Tax-efficient assets (muni bonds, growth stocks)\n- Roth: Highest growth potential assets\n\n**Taxable bonds in tax-deferred:**\n- Interest taxed at ordinary rates if taxable\n- Defer that taxation in IRA/401k\n\n**Why other answers are wrong:**\n- **A)** Munis are already tax-exempt\n- **B)** Growth stocks get LTCG rates\n- **D)** Tax-managed designed for taxable accounts"
  },
  {
    id: 'CFP-INV-057',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Investment Vehicles',
    subtopic: 'Options',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "An investor owns 100 shares of XYZ at $50 and sells a covered call with a $55 strike for $3 premium. If the stock rises to $60 and is called away, total profit is:",
    options: [
      "A) $500",
      "B) $800",
      "C) $1,300",
      "D) $1,000"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B ($800)**\n\n**Covered Call Calculation:**\n1. Stock gain: $55 - $50 = $5 × 100 = $500\n2. Premium received: $3 × 100 = $300\n3. Total profit: $500 + $300 = $800\n\n**Key Point:**\n- Stock called away at $55 strike\n- Miss additional $500 gain ($60 - $55)\n- But keep $300 premium\n\n**Why other answers are wrong:**\n- **A)** Stock gain only, forgot premium\n- **C)** Would be gain if sold at $60 + premium\n- **D)** Stock gain to $60, but forgot strike cap"
  },
  {
    id: 'CFP-INV-058',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Information Ratio',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "A portfolio has an expected return of 12%, benchmark return of 10%, and tracking error of 4%. What is the Information Ratio?",
    options: [
      "A) 0.30",
      "B) 0.50",
      "C) 3.00",
      "D) 2.00"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (0.50)**\n\n**Information Ratio Formula:**\nIR = (Rp - Rb) / Tracking Error\nIR = (12% - 10%) / 4%\nIR = 2% / 4%\nIR = 0.50\n\n**Interpretation:**\n- Measures excess return per unit of active risk\n- Higher IR = better active management\n- IR > 0.5 is generally considered good\n\n**Why other answers are wrong:**\n- **A)** Calculation error\n- **C)** Inverted the formula\n- **D)** Wrong calculation"
  },
  {
    id: 'CFP-INV-059',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Strategies',
    subtopic: 'Liability-Driven Investing',
    difficulty: 'hard',
    skillLevel: 'Remembering',
    question: "Liability-Driven Investing (LDI) is MOST appropriate for:",
    options: [
      "A) Young investors with long time horizons",
      "B) Pension funds with defined benefit obligations",
      "C) Aggressive growth portfolios",
      "D) Day traders"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Pension funds)**\n\n**LDI Purpose:**\n- Match assets to future liabilities\n- Reduce funded status volatility\n- Hedge interest rate risk of liabilities\n- Common for DB pensions, insurance companies\n\n**Why other answers are wrong:**\n- **A)** Young investors focus on growth\n- **C)** Growth strategies ignore liability structure\n- **D)** Day trading has no defined liabilities"
  },
  {
    id: 'CFP-INV-060',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Investment Vehicles',
    subtopic: 'Annuities',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "What is the primary tax advantage of a non-qualified variable annuity?",
    options: [
      "A) Tax-deductible contributions",
      "B) Tax-free withdrawals",
      "C) Tax-deferred growth",
      "D) Capital gains treatment on withdrawal"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (Tax-deferred growth)**\n\n**Non-Qualified Annuity Taxation:**\n- Contributions: After-tax (no deduction)\n- Growth: Tax-deferred\n- Withdrawals: Earnings taxed as ordinary income (LIFO)\n- Penalty: 10% on earnings before 59½\n\n**Why other answers are wrong:**\n- **A)** Only qualified annuities may be deductible\n- **B)** Earnings ARE taxable at withdrawal\n- **D)** Earnings taxed as ordinary income"
  },
  {
    id: 'CFP-INV-061',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Convexity',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "A bond with positive convexity will:",
    options: [
      "A) Lose more value when rates rise than predicted by duration",
      "B) Gain more value when rates fall and lose less when rates rise than predicted by duration",
      "C) Have returns unaffected by interest rate changes",
      "D) Always underperform bonds with negative convexity"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**Convexity Benefit:**\n- Duration predicts LINEAR price change\n- Convexity captures CURVATURE\n- Positive convexity = favorable asymmetry\n\n**Effect:**\n- Rates fall: Price rises MORE than duration predicts\n- Rates rise: Price falls LESS than duration predicts\n\n**Why other answers are wrong:**\n- **A)** Positive convexity means LESS loss when rates rise\n- **C)** All bonds are affected by rates\n- **D)** Positive convexity is generally favorable"
  },
  {
    id: 'CFP-INV-062',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Strategies',
    subtopic: 'Factor Investing',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: "Which is NOT a commonly recognized factor in factor-based investing?",
    options: [
      "A) Value (low price-to-book)",
      "B) Momentum (recent winners)",
      "C) Industry (sector classification)",
      "D) Size (small-cap premium)"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (Industry is not a factor)**\n\n**Common Investment Factors:**\n- **Value:** Low P/B, P/E stocks outperform\n- **Size:** Small-cap stocks outperform large-cap\n- **Momentum:** Recent winners continue short-term\n- **Quality:** High profitability, low leverage\n- **Low Volatility:** Risk-adjusted outperformance\n\n**Industry/Sector:**\n- A classification, not a factor\n- No persistent premium from being in specific sector\n\n**Why other answers are wrong:**\n- **A, B, D)** All are well-documented factors"
  },
  {
    id: 'CFP-INV-063',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Investment Vehicles',
    subtopic: 'Hedge Funds',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: "Which characteristic is typical of hedge funds?",
    options: [
      "A) Daily liquidity like mutual funds",
      "B) Strict SEC registration requirements",
      "C) 2% management fee and 20% performance fee",
      "D) Available to all retail investors"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (2 and 20 fee structure)**\n\n**Hedge Fund Characteristics:**\n- 2% annual management fee\n- 20% performance fee (incentive)\n- High-water mark provisions\n- Lock-up periods (limited liquidity)\n- Accredited/qualified investors only\n\n**Why other answers are wrong:**\n- **A)** Lock-ups of 1+ years are common\n- **B)** Many use exemptions from full SEC registration\n- **D)** Restricted to accredited/qualified purchasers"
  },
  {
    id: 'CFP-INV-064',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Security Market Line',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "A security plotting ABOVE the Security Market Line is:",
    options: [
      "A) Overvalued and should be sold",
      "B) Undervalued and should be bought",
      "C) Fairly valued",
      "D) High risk with low return"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Undervalued)**\n\n**Security Market Line:**\n- Plots expected return vs. beta\n- Points ON line = fairly priced\n- Points ABOVE = positive alpha (undervalued)\n- Points BELOW = negative alpha (overvalued)\n\n**Above the line:**\n- Higher return than expected for its beta\n- Buy—will appreciate toward fair value\n\n**Why other answers are wrong:**\n- **A)** Above SML = undervalued\n- **C)** On the line = fairly valued\n- **D)** Above means high return for its risk level"
  },
  {
    id: 'CFP-INV-065',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Strategies',
    subtopic: 'Sector Rotation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "During an economic recession, which sector typically outperforms?",
    options: [
      "A) Technology",
      "B) Consumer discretionary",
      "C) Consumer staples",
      "D) Industrials"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (Consumer staples)**\n\n**Sector Performance by Economic Cycle:**\n- **Recession:** Defensive sectors (staples, utilities, healthcare)\n- **Recovery:** Cyclical sectors (financials, industrials)\n- **Expansion:** Growth sectors (technology, consumer discretionary)\n\n**Consumer Staples in Recession:**\n- Essential goods (food, household products)\n- Inelastic demand\n- Stable cash flows\n\n**Why other answers are wrong:**\n- **A)** Tech is growth-sensitive\n- **B)** Discretionary spending cut in recession\n- **D)** Industrials tied to economic activity"
  },
  {
    id: 'CFP-INV-066',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Investment Vehicles',
    subtopic: 'Closed-End Funds',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: "A closed-end fund trading at a 10% discount to NAV means:",
    options: [
      "A) The fund has lost 10% this year",
      "B) The market price is 10% below the value of underlying assets",
      "C) Management fees are 10%",
      "D) The fund is leveraged at 10%"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**Closed-End Fund Pricing:**\n- Fixed number of shares\n- Trades on exchange like a stock\n- Price determined by supply/demand\n- Can trade at premium or discount to NAV\n\n**10% Discount:**\n- NAV = $100, Market price = $90\n- Buy $100 of assets for $90\n\n**Why other answers are wrong:**\n- **A)** Discount isn't about past performance\n- **C)** Discount isn't about fees\n- **D)** Leverage is separate from discount"
  },
  {
    id: 'CFP-INV-067',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Risk Measures',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: "Which risk measure is MOST appropriate for evaluating downside risk specifically?",
    options: [
      "A) Standard deviation",
      "B) Beta",
      "C) Sortino ratio",
      "D) Sharpe ratio"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (Sortino ratio)**\n\n**Sortino Ratio:**\n- Like Sharpe, but only penalizes DOWNSIDE deviation\n- Ignores upside volatility (which investors like)\n- Better for asymmetric return distributions\n\n**Formula:**\nSortino = (Rp - Rf) / Downside Deviation\n\n**Why other answers are wrong:**\n- **A)** Std dev includes upside and downside\n- **B)** Beta measures market sensitivity\n- **D)** Sharpe uses total volatility"
  },
  {
    id: 'CFP-INV-068',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Strategies',
    subtopic: 'Value Averaging',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "Value averaging differs from dollar-cost averaging in that:",
    options: [
      "A) Value averaging invests a fixed dollar amount each period",
      "B) Value averaging adjusts investment amount to hit target portfolio value",
      "C) Value averaging only invests when prices are low",
      "D) Value averaging is more suitable for passive investors"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**Value Averaging:**\n- Target specific portfolio value each period\n- Invest more when portfolio underperforms\n- Invest less when portfolio exceeds target\n- Variable contribution amounts\n\n**Dollar-Cost Averaging:**\n- Fixed dollar amount each period\n- Simpler to implement\n- No selling required\n\n**Why other answers are wrong:**\n- **A)** That's DCA\n- **C)** May invest any time, but amount varies\n- **D)** Value averaging requires more active management"
  },
  {
    id: 'CFP-INV-069',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Investment Vehicles',
    subtopic: 'Unit Investment Trust',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: "A Unit Investment Trust (UIT) differs from a mutual fund primarily because:",
    options: [
      "A) UITs are actively managed",
      "B) UITs have a fixed portfolio that is not traded",
      "C) UITs cannot hold bonds",
      "D) UITs trade on exchanges at market prices"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Fixed portfolio)**\n\n**UIT Characteristics:**\n- Fixed, unmanaged portfolio\n- Created for specific term\n- No ongoing portfolio changes\n- Pass-through of income/gains\n- Self-liquidating at termination\n\n**vs. Mutual Funds:**\n- Mutual funds actively trade holdings\n- No termination date\n- NAV-priced daily\n\n**Why other answers are wrong:**\n- **A)** UITs are PASSIVELY managed\n- **C)** UITs often hold bonds\n- **D)** That describes closed-end funds or ETFs"
  },
  {
    id: 'CFP-INV-070',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'Behavioral Finance',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: "An investor holds a losing stock too long, hoping to 'get back to even.' This describes:",
    options: [
      "A) Confirmation bias",
      "B) Anchoring",
      "C) Loss aversion",
      "D) Herding"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C (Loss aversion)**\n\n**Loss Aversion:**\n- Losses feel ~2x worse than equivalent gains feel good\n- Leads to holding losers too long\n- Leads to selling winners too soon\n- 'Disposition effect'\n\n**Why other answers are wrong:**\n- **A)** Confirmation bias = seeking info that confirms beliefs\n- **B)** Anchoring = fixating on specific number\n- **D)** Herding = following the crowd"
  },
  {
    id: 'CFP-INV-071',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Strategies',
    subtopic: 'Concentrated Stock',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "An executive has 80% of net worth in company stock. The BEST first step to reduce concentration is:",
    options: [
      "A) Sell all shares immediately",
      "B) Establish a 10b5-1 trading plan",
      "C) Convert to short-term trading",
      "D) Buy more stock to average down"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (10b5-1 plan)**\n\n**10b5-1 Trading Plan:**\n- Predetermined formula for sales\n- Provides affirmative defense against insider trading\n- Can sell during blackout periods\n- Systematic diversification over time\n\n**Why other answers are wrong:**\n- **A)** May trigger insider trading concerns\n- **C)** Executives often restricted from short-term trading\n- **D)** Increases concentration risk"
  },
  {
    id: 'CFP-INV-072',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Investment Vehicles',
    subtopic: 'TIPS',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "Treasury Inflation-Protected Securities (TIPS) adjust for inflation by:",
    options: [
      "A) Increasing the coupon rate when inflation rises",
      "B) Adjusting the principal value based on CPI",
      "C) Paying a variable floating rate",
      "D) Reducing duration when inflation increases"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B**\n\n**TIPS Inflation Protection:**\n- Principal adjusts with CPI-U\n- Fixed coupon rate applied to adjusted principal\n- At maturity, receive greater of adjusted or original principal\n\n**Example:**\n- $1,000 TIPS, 2% coupon, 3% inflation\n- Year 1: Principal = $1,030, Coupon = $20.60\n\n**Why other answers are wrong:**\n- **A)** Coupon rate stays fixed; principal adjusts\n- **C)** Floating rate is different structure\n- **D)** Duration not directly affected by inflation"
  },
  {
    id: 'CFP-INV-073',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-1',
    topic: 'Investment Theory',
    subtopic: 'CAPM',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: "The risk-free rate is 3%, market return is 10%, and a stock has a beta of 1.4. What is the expected return per CAPM?",
    options: [
      "A) 10.0%",
      "B) 12.8%",
      "C) 14.0%",
      "D) 17.0%"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (12.8%)**\n\n**CAPM Formula:**\nE(R) = Rf + β(Rm - Rf)\nE(R) = 3% + 1.4(10% - 3%)\nE(R) = 3% + 1.4(7%)\nE(R) = 3% + 9.8%\nE(R) = 12.8%\n\n**Why other answers are wrong:**\n- **A)** That would be market return (β=1)\n- **C)** Would be 1.4 × 10% (wrong formula)\n- **D)** Would be 3% + 1.4 × 10% (wrong formula)"
  },
  {
    id: 'CFP-INV-074',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-3',
    topic: 'Investment Strategies',
    subtopic: 'Tax-Advantaged',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: "Which investment generates 'phantom income' that is taxable but provides no cash?",
    options: [
      "A) Municipal bonds",
      "B) Zero-coupon bonds",
      "C) Dividend-paying stocks",
      "D) Index funds"
    ],
    correctAnswer: 1,
    explanation: "**Correct Answer: B (Zero-coupon bonds)**\n\n**Zero-Coupon Bond Taxation:**\n- No annual interest payments received\n- But imputed interest taxed annually\n- 'Phantom income' - tax without cash flow\n- Original issue discount (OID) accrues each year\n\n**Solution:**\n- Hold zeros in tax-advantaged accounts\n- Or use muni zeros (tax-exempt)\n\n**Why other answers are wrong:**\n- **A)** Muni interest is tax-exempt\n- **C)** Dividends provide cash\n- **D)** Index funds typically have distributions"
  },
  {
    id: 'CFP-INV-075',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    topic: 'Investment Vehicles',
    subtopic: 'Private Equity',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: "Private equity investments typically require:",
    options: [
      "A) Daily liquidity provisions",
      "B) Public market registration",
      "C) Multi-year capital commitments with capital calls",
      "D) Investments of $1,000 or more"
    ],
    correctAnswer: 2,
    explanation: "**Correct Answer: C**\n\n**Private Equity Characteristics:**\n- Fund life: 10-12 years typical\n- Capital commitment: Pledge upfront\n- Capital calls: Drawn as needed\n- Distributions: When investments sold\n- J-curve effect: Early years negative\n\n**Investor Requirements:**\n- Accredited/qualified investor status\n- High minimums ($250K-$1M+)\n- Illiquidity tolerance\n\n**Why other answers are wrong:**\n- **A)** Very illiquid\n- **B)** Private—not registered publicly\n- **D)** Minimums are much higher"
  }
];

export default CFP_INV_QUESTIONS;
