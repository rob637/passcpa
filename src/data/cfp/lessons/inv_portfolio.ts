/**
 * CFP Domain 4: Investment Planning
 * Area INV-3: Portfolio Management
 * 
 * These lessons cover asset allocation, performance measurement,
 * portfolio construction, and rebalancing strategies.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_INV3_LESSONS: CFPLesson[] = [
  {
    id: "CFP-INV-L009",
    domain: "CFP-INV",
    blueprintArea: "INV-3",
    title: "Asset Allocation Strategies",
    order: 9,
    duration: 50,
    objectives: [
      "Compare strategic and tactical asset allocation",
      "Determine appropriate allocation based on client factors",
      "Apply core-satellite portfolio construction",
      "Integrate risk capacity with risk tolerance"
    ],
    content: `
# Asset Allocation Strategies

**Asset allocation** is the most important investment decision—research suggests it explains 90%+ of portfolio return variation.

---

## Why Asset Allocation Matters

### The Brinson Study

Famous research (Brinson, Hood, Beebower) found:
- **~94%** of return variation explained by asset allocation
- Market timing: ~2%
- Security selection: ~4%

### Implication

Get the asset mix right first—stock picking and timing are secondary.

---

## Strategic Asset Allocation

### Definition

Long-term, policy-driven allocation based on:
- Goals and time horizon
- Risk tolerance
- Risk capacity
- Expected returns

### Characteristics

| Feature | Description |
|---------|-------------|
| Time horizon | Long-term (5+ years) |
| Changes | Infrequent (rebalance to targets) |
| Based on | Client's financial plan |
| Goal | Optimal risk-return for objectives |

### Example: Target Allocation

| Client Type | Stocks | Bonds | Cash |
|-------------|--------|-------|------|
| Aggressive | 80% | 15% | 5% |
| Moderate | 60% | 35% | 5% |
| Conservative | 30% | 55% | 15% |

---

## Tactical Asset Allocation

### Definition

Short-term deviations from strategic targets to exploit market opportunities.

### Characteristics

| Feature | Description |
|---------|-------------|
| Time horizon | Short-term (months to 1-2 years) |
| Changes | Frequent based on market views |
| Based on | Market valuations, economic outlook |
| Risk | May underperform if wrong |

### Example

Strategic: 60/40 stocks/bonds
Tactical: Move to 70/30 if stocks appear undervalued

---

## Dynamic Asset Allocation

### Definition

Systematic adjustment based on rules or formulas.

### Examples

| Method | How It Works |
|--------|--------------|
| **Constant-mix** | Rebalance to fixed percentages |
| **Constant proportion** | Maintain fixed dollar amount in each |
| **CPPI** | Floor + multiplier approach |

### CPPI (Constant Proportion Portfolio Insurance)

$$\\text{Stock Investment} = \\text{Multiplier} \\times (\\text{Portfolio Value} - \\text{Floor})$$

Increases equity when portfolio rises; decreases when it falls.

---

## Factors Affecting Asset Allocation

### Risk Tolerance

Willingness to accept volatility:
- Psychological comfort with losses
- Measured through questionnaires
- Can change with experience

### Risk Capacity

Ability to take risk:
- Time horizon
- Income stability
- Wealth level
- Liquidity needs

### Key Distinction

| Factor | Question |
|--------|----------|
| Tolerance | How do you **feel** about risk? |
| Capacity | How much risk can you **afford**? |

**Capacity should override tolerance** when they conflict.

---

## Example: Tolerance vs. Capacity

| Client | Tolerance | Capacity | Resolution |
|--------|-----------|----------|------------|
| Young professional | Low | High | Educate; lean toward capacity |
| Retiree with pension | High | Moderate | Constrain to capacity |
| Wealthy, low income | High | High | Can follow preference |
| High earner, no savings | Low | Low | Conservative appropriate |

---

## Core-Satellite Approach

### Structure

| Component | Allocation | Strategy |
|-----------|------------|----------|
| **Core** | 60-80% | Index/passive, low-cost |
| **Satellite** | 20-40% | Active, alternatives, tactical |

### Benefits

- Low-cost base (core)
- Potential for outperformance (satellite)
- Tax efficiency in core
- Flexibility in satellite

---

## Life-Cycle (Target-Date) Allocation

### Concept

Allocation changes over time—more aggressive when young, conservative near retirement.

### Glide Path

| Age | Stocks | Bonds |
|-----|--------|-------|
| 25 | 90% | 10% |
| 40 | 80% | 20% |
| 55 | 65% | 35% |
| 65 | 50% | 50% |
| 75 | 35% | 65% |

### "To" vs. "Through" Retirement

| Approach | At Retirement | After Retirement |
|----------|---------------|------------------|
| **To** | Most conservative | Stays level |
| **Through** | Continues adjusting | Gets more conservative |

---

## Client-Specific Considerations

### High Net Worth

- Consider tax location (where to hold what)
- Concentrated stock positions
- Alternative investments

### Retirees

- Sequence of returns risk
- Income needs
- Healthcare costs

### Young Accumulators

- Time to recover from losses
- Human capital as "bond-like" asset
- Behavioral coaching important

---

## Key Takeaways

1. **Asset allocation** explains ~94% of return variation—most important decision
2. **Strategic allocation**: Long-term policy; **Tactical**: Short-term adjustments
3. **Risk capacity** (ability) should override **risk tolerance** (willingness)
4. **Core-satellite**: Low-cost index core + active/alternative satellite
5. **Target-date** funds: Allocation changes ("glides") toward retirement
    `,
    keyTakeaways: [
      "Asset allocation explains ~94% of return variation",
      "Strategic = long-term policy; Tactical = short-term deviations",
      "Risk capacity (ability) should override tolerance (willingness) when they conflict",
      "Core-satellite: Index core (60-80%) + active satellite (20-40%)",
      "Target-date glide path: More stocks young, more bonds near retirement"
    ],
    keyFormulas: [
      "CPPI: Stock Investment = Multiplier × (Portfolio - Floor)",
      "Simple age-based: Bonds % ≈ Age (rough rule of thumb)"
    ],
    mnemonics: [
      "AAA: Asset Allocation is Almost All that matters",
      "Capacity > Tolerance (Can you afford it? trumps Do you want it?)"
    ],
    practiceProblems: [
      {
        question: "A 35-year-old has high risk tolerance but just started saving with $10,000. What allocation approach?",
        answer: "Despite high tolerance, capacity is limited by low wealth. Use moderate-aggressive allocation (70-80% stocks) but emphasize consistent saving. Time horizon supports equity tilt, but discuss need for emergency fund first."
      },
      {
        question: "What is core-satellite investing?",
        answer: "Core (60-80%) uses low-cost index funds for broad market exposure. Satellite (20-40%) uses actively managed funds, alternatives, or tactical positions to seek outperformance. Combines low costs with potential for alpha."
      },
      {
        question: "A target-date 2030 fund for a 60-year-old is denominated 'through' retirement. What does this mean?",
        answer: "The fund continues to adjust allocation after the target date, becoming more conservative through retirement. A 'to' fund would reach its most conservative allocation at retirement and stay level."
      }
    ],
    relatedLessons: ["CFP-INV-L002", "CFP-INV-L010", "CFP-GEN-L001"]
  },

  {
    id: "CFP-INV-L010",
    domain: "CFP-INV",
    blueprintArea: "INV-3",
    title: "Portfolio Performance Measurement",
    order: 10,
    duration: 55,
    objectives: [
      "Calculate and interpret Sharpe, Treynor, and Jensen's alpha",
      "Compare time-weighted and dollar-weighted returns",
      "Select appropriate benchmarks for evaluation",
      "Apply risk-adjusted performance measures"
    ],
    content: `
# Portfolio Performance Measurement

Evaluating investment performance requires more than just returns—we must consider the risk taken.

---

## Why Risk-Adjusted Returns Matter

### The Problem

| Fund | Return | Standard Deviation |
|------|--------|--------------------|
| A | 12% | 8% |
| B | 14% | 20% |

Which is better? B has higher return but much more risk.

### Risk-Adjusted Perspective

Fund A earned 1.5% return per unit of risk (12/8)
Fund B earned 0.7% return per unit of risk (14/20)

**Fund A is more efficient.**

---

## Sharpe Ratio

### Formula

$$\\text{Sharpe Ratio} = \\frac{R_p - R_f}{\\sigma_p}$$

Where:
- $R_p$ = Portfolio return
- $R_f$ = Risk-free rate
- $\\sigma_p$ = Portfolio standard deviation

### Interpretation

| Sharpe | Meaning |
|--------|---------|
| > 1.0 | Good |
| > 2.0 | Very good |
| > 3.0 | Excellent |
| < 0 | Underperformed risk-free rate |

### When to Use

- Comparing portfolios
- Undiversified investors (total risk matters)
- Evaluating the entire portfolio

---

## Treynor Ratio

### Formula

$$\\text{Treynor Ratio} = \\frac{R_p - R_f}{\\beta_p}$$

Where:
- $\\beta_p$ = Portfolio beta

### Difference from Sharpe

| Measure | Risk Used | Best For |
|---------|-----------|----------|
| Sharpe | Standard deviation (total risk) | Total portfolio |
| Treynor | Beta (systematic risk) | Diversified portfolio segment |

### When to Use

- Evaluating a portion of overall portfolio
- Comparing diversified funds
- When unsystematic risk is diversified away

---

## Jensen's Alpha

### Formula

$$\\alpha = R_p - [R_f + \\beta_p(R_m - R_f)]$$

Or simply:
$$\\alpha = \\text{Actual Return} - \\text{CAPM Expected Return}$$

### Interpretation

| Alpha | Meaning |
|-------|---------|
| > 0 | Beat risk-adjusted expectations |
| = 0 | Met expectations |
| < 0 | Underperformed expectations |

### When to Use

- Evaluating manager skill
- Determining if fees are justified
- Comparing active managers

---

## Example: All Three Measures

| Given | Value |
|-------|-------|
| Portfolio return | 12% |
| Risk-free rate | 3% |
| Portfolio std dev | 15% |
| Portfolio beta | 1.1 |
| Market return | 10% |

**Sharpe Ratio**:
$$\\frac{12\\% - 3\\%}{15\\%} = \\frac{9\\%}{15\\%} = 0.60$$

**Treynor Ratio**:
$$\\frac{12\\% - 3\\%}{1.1} = \\frac{9\\%}{1.1} = 8.18$$

**Jensen's Alpha**:
Expected = 3% + 1.1(10% - 3%) = 3% + 7.7% = 10.7%
$$\\alpha = 12\\% - 10.7\\% = +1.3\\%$$

---

## Information Ratio

### Formula

$$\\text{Information Ratio} = \\frac{R_p - R_b}{\\text{Tracking Error}}$$

Where:
- $R_b$ = Benchmark return
- Tracking Error = Std dev of (portfolio - benchmark)

### Interpretation

Measures excess return **per unit of active risk**.

| IR | Meaning |
|----|---------|
| > 0.5 | Good active management |
| > 1.0 | Very good |

---

## Time-Weighted vs. Dollar-Weighted Returns

### Time-Weighted Return (TWR)

- Eliminates impact of cash flows
- Geometric linking of sub-period returns
- **Best for evaluating managers** (they don't control flows)

### Dollar-Weighted Return (DWR)

- Also called Money-Weighted Return (MWR)
- Based on IRR of cash flows
- **Best for evaluating investor's experience**

### Example

| Period | Return | Investment |
|--------|--------|------------|
| Year 1 | +20% | $100,000 |
| Year 2 | -10% | Add $100,000 |

**TWR**: (1.20)(0.90) - 1 = **8%**

**DWR**: Closer to **-10%** (more money during losing period)

---

## Benchmark Selection

### Characteristics of Good Benchmarks

| Feature | Description |
|---------|-------------|
| **Unambiguous** | Clearly defined holdings |
| **Investable** | Can actually replicate |
| **Measurable** | Performance calculable |
| **Appropriate** | Matches investment style |
| **Specified in advance** | Not selected after the fact |

### Common Benchmarks

| Asset Class | Common Benchmarks |
|-------------|------------------|
| US Large Cap | S&P 500, Russell 1000 |
| US Small Cap | Russell 2000 |
| International | MSCI EAFE, MSCI ACWI ex-US |
| Bonds | Bloomberg Aggregate |
| Balanced | 60% S&P 500 / 40% Bloomberg Agg |

---

## Key Takeaways

1. **Sharpe ratio**: Excess return per unit of **total risk** (σ)
2. **Treynor ratio**: Excess return per unit of **systematic risk** (β)
3. **Jensen's alpha**: Return above CAPM expectation (manager skill)
4. **TWR**: Evaluates manager (ignores cash flows)
5. **DWR**: Evaluates investor experience (includes cash flow timing)
    `,
    keyTakeaways: [
      "Sharpe = (Rp - Rf) / σp; uses total risk, best for whole portfolio",
      "Treynor = (Rp - Rf) / βp; uses systematic risk, for diversified portfolios",
      "Jensen's alpha = Actual - CAPM expected; measures manager skill",
      "TWR for manager evaluation (ignores flows); DWR for investor experience",
      "Good benchmark: Unambiguous, investable, appropriate, specified in advance"
    ],
    keyFormulas: [
      "Sharpe Ratio = (Rp - Rf) / σp",
      "Treynor Ratio = (Rp - Rf) / βp",
      "Jensen's Alpha = Rp - [Rf + β(Rm - Rf)]",
      "Information Ratio = (Rp - Rb) / Tracking Error"
    ],
    mnemonics: [
      "Sharpe = Standard deviation; Treynor = sysTematic (beta)",
      "TWR = Time tells the manager's Tale; DWR = Dollars tell Your story"
    ],
    practiceProblems: [
      {
        question: "A fund returned 15% with 20% standard deviation. Risk-free rate is 4%. What is the Sharpe ratio?",
        answer: "Sharpe = (15% - 4%) / 20% = 11% / 20% = 0.55"
      },
      {
        question: "A manager returned 14% (beta 1.2) when market returned 10%. Risk-free rate is 3%. What is Jensen's alpha?",
        answer: "Expected = 3% + 1.2(10% - 3%) = 3% + 8.4% = 11.4%. Alpha = 14% - 11.4% = +2.6%"
      },
      {
        question: "An investor added $50,000 right before a 20% decline. Would TWR or DWR show worse performance?",
        answer: "DWR (dollar-weighted return) would show worse performance because it weights more money during the losing period. TWR treats each period equally regardless of cash flows."
      }
    ],
    relatedLessons: ["CFP-INV-L001", "CFP-INV-L003", "CFP-INV-L009"]
  },

  {
    id: "CFP-INV-L011",
    domain: "CFP-INV",
    blueprintArea: "INV-3",
    title: "Portfolio Rebalancing and Tax Management",
    order: 11,
    duration: 50,
    objectives: [
      "Compare rebalancing strategies and triggers",
      "Apply tax-loss harvesting techniques",
      "Optimize asset location across account types",
      "Balance tax efficiency with portfolio management"
    ],
    content: `
# Portfolio Rebalancing and Tax Management

Rebalancing maintains target risk levels while managing tax implications efficiently.

---

## Why Rebalance?

### Drift Example

| Asset | Target | Start | After 1 Year |
|-------|--------|-------|--------------|
| Stocks | 60% | $60,000 | $78,000 (65%) |
| Bonds | 40% | $40,000 | $42,000 (35%) |
| **Total** | 100% | $100,000 | $120,000 |

Without rebalancing, portfolio becomes riskier over time as stocks outperform.

### Benefits of Rebalancing

| Benefit | Description |
|---------|-------------|
| **Risk control** | Maintain target risk level |
| **Discipline** | Forces buy low, sell high |
| **Systematic** | Removes emotion from decisions |

---

## Rebalancing Methods

### Calendar Rebalancing

| Frequency | Pros | Cons |
|-----------|------|------|
| Quarterly | Catches drift early | More transactions |
| Semi-annual | Balance of monitoring | May miss large swings |
| Annual | Fewer transactions | May experience significant drift |

### Threshold (Percentage) Rebalancing

Rebalance when allocation drifts beyond target by set amount.

| Threshold | Description |
|-----------|-------------|
| Absolute (5%) | Rebalance if 60% target becomes 55% or 65% |
| Relative (25%) | Rebalance if 60% × 25% = 15% range (51-69%) |

### Hybrid Approach

Check at calendar dates, but only act if threshold exceeded.

---

## Rebalancing Trade-offs

### Costs of Rebalancing

| Cost | Description |
|------|-------------|
| Transaction costs | Commissions, spreads |
| Taxes | Capital gains on sales |
| Time/Effort | Monitoring and execution |

### Costs of NOT Rebalancing

| Cost | Description |
|------|-------------|
| Risk drift | Portfolio becomes too aggressive/conservative |
| Behavioral | Chasing performance |
| Goal misalignment | Risk may not match objectives |

---

## Tax-Efficient Rebalancing

### Methods to Reduce Tax Impact

| Method | How It Works |
|--------|--------------|
| **Use new contributions** | Direct new money to underweight assets |
| **Redirect dividends** | Reinvest in underweight positions |
| **Rebalance in tax-advantaged** | Sell in IRA/401(k) where gains aren't taxed |
| **Tax-loss harvesting** | Offset gains with losses |

---

## Tax-Loss Harvesting

### The Strategy

Sell investments at a loss to:
1. Offset capital gains
2. Offset up to $3,000 ordinary income
3. Carry forward excess losses

### Rules to Follow

| Rule | Requirement |
|------|-------------|
| **Wash sale rule** | Cannot repurchase same or "substantially identical" security within 30 days (before or after) |
| **Short vs. long** | Match character when possible (ST loss offsets ST gain first) |
| **Carryforward** | Unused losses carry forward indefinitely |

### Example

| Event | Amount |
|-------|--------|
| Sell Stock A for $5,000 loss | -$5,000 |
| Buy similar (not identical) Stock B | (to stay invested) |
| Offset gains | -$5,000 from gains |
| Unused? | Offset $3,000 income, carry rest |

---

## Asset Location

### The Concept

Place investments in the most tax-efficient account type.

### General Guidelines

| Investment Type | Best Location | Why |
|-----------------|---------------|-----|
| **Taxable bonds** | Tax-deferred (IRA, 401k) | Interest = ordinary income |
| **REITs** | Tax-deferred | Dividends = ordinary income |
| **High-turnover funds** | Tax-deferred | Frequent cap gains |
| **Growth stocks** | Taxable | LTCG, step-up at death |
| **Muni bonds** | Taxable | Already tax-exempt |
| **Index funds** | Taxable | Tax-efficient already |

### Why It Matters

Same investments, different locations = different after-tax returns.

---

## Asset Location Example

| Investment | Pre-Tax Return | Tax-Deferred | Taxable (35% rate) |
|------------|----------------|--------------|-------------------|
| Bonds (5%) | 5% | 5% | 3.25% |
| Stocks (8%) | 8% | 8% | ~6.5%* |

*Assuming qualified dividends and LTCG rates.

**Bonds lose more to taxes** → put in tax-deferred accounts.

---

## Wash Sale Rule Details

### What Triggers Wash Sale

| Scenario | Wash Sale? |
|----------|------------|
| Sell stock, buy same stock within 30 days | Yes |
| Sell stock, buy in IRA within 30 days | Yes |
| Sell stock, buy similar (not identical) ETF | Usually No |
| Sell mutual fund, buy ETF tracking different index | No |

### Consequence

- Loss is **disallowed** for current year
- Loss is **added to cost basis** of replacement shares
- Not lost forever—just deferred

---

## Practical Considerations

### For Rebalancing

1. Use new contributions first
2. Rebalance in tax-advantaged accounts
3. Consider tax-loss harvesting opportunities
4. Annual or threshold-based is usually sufficient

### For Tax Efficiency

1. Consider asset location when building portfolio
2. Don't let tax tail wag investment dog
3. Index funds and ETFs are inherently more tax-efficient
4. Municipal bonds in taxable, taxable bonds in IRA

---

## Key Takeaways

1. **Rebalancing** maintains target risk; calendar or threshold triggers
2. **Rebalance in tax-advantaged** accounts to avoid capital gains
3. **Tax-loss harvesting**: Sell losers to offset gains; avoid wash sale (30 days)
4. **Asset location**: Tax-inefficient (bonds, REITs) in IRA; tax-efficient (growth) in taxable
5. **Wash sale**: Loss disallowed if repurchase within 30 days (added to basis)
    `,
    keyTakeaways: [
      "Rebalancing maintains target risk; use calendar, threshold, or hybrid triggers",
      "Rebalance in tax-advantaged accounts first to avoid taxable gains",
      "Tax-loss harvesting: Offset gains, $3,000 income; avoid wash sale (30 days)",
      "Asset location: Bonds/REITs in IRA; growth stocks/munis in taxable",
      "Wash sale loss isn't lost—added to replacement shares' basis"
    ],
    keyFormulas: [
      "Threshold Rebalance: If |Actual - Target| > threshold, rebalance",
      "Capital loss offset: Gains first, then $3,000 ordinary income, then carryforward"
    ],
    mnemonics: [
      "Wash Sale = Wait 31 days (30-day window, must wait longer)",
      "Asset Location: Poor tax treatment → IRA; Good tax treatment → Taxable"
    ],
    practiceProblems: [
      {
        question: "An investor sells Fund A at a $10,000 loss and buys substantially identical Fund B three weeks later. What happens?",
        answer: "Wash sale rule triggered. The $10,000 loss is disallowed this year but added to Fund B's cost basis. When Fund B is eventually sold, the higher basis will result in a lower gain (or larger loss)."
      },
      {
        question: "A client has an IRA and taxable account. Where should they hold REITs and municipal bonds?",
        answer: "REITs in IRA (dividends are ordinary income, benefit from tax deferral). Municipal bonds in taxable (already tax-exempt, no benefit from IRA)."
      },
      {
        question: "An investor has $3,000 in capital gains and $8,000 in capital losses. What is the tax impact?",
        answer: "$8,000 loss - $3,000 gain = $5,000 net loss. Use $3,000 to offset ordinary income (max). Carry forward $2,000 to future years."
      }
    ],
    relatedLessons: ["CFP-INV-L009", "CFP-TAX-L003", "CFP-INV-L007"]
  },

  {
    id: "CFP-INV-L012",
    domain: "CFP-INV",
    blueprintArea: "INV-3",
    title: "Investment Policy and Suitability",
    order: 12,
    duration: 45,
    objectives: [
      "Draft an investment policy statement",
      "Apply suitability analysis to investment recommendations",
      "Integrate client circumstances into portfolio design",
      "Monitor and update investment strategies"
    ],
    content: `
# Investment Policy and Suitability

An **Investment Policy Statement (IPS)** provides the roadmap for managing a portfolio based on client needs and circumstances.

---

## Investment Policy Statement (IPS)

### Purpose

| Function | Description |
|----------|-------------|
| **Communication** | Aligns client and advisor expectations |
| **Discipline** | Prevents emotional reactions |
| **Documentation** | Record of agreed-upon approach |
| **Benchmark** | Basis for evaluating performance |

---

## IPS Components

### Client Information

| Element | Details |
|---------|---------|
| **Goals** | Retirement, education, home purchase |
| **Time horizon** | When funds needed |
| **Risk tolerance** | Willingness to accept volatility |
| **Risk capacity** | Ability to endure losses |
| **Liquidity needs** | Emergency fund, near-term expenses |
| **Tax situation** | Bracket, account types |
| **Legal constraints** | ERISA, trust restrictions |
| **Unique circumstances** | Concentrated stock, ESG preferences |

### Investment Guidelines

| Element | Details |
|---------|---------|
| **Target allocation** | % stocks, bonds, alternatives |
| **Allowable ranges** | Min/max for each asset class |
| **Rebalancing triggers** | Calendar, threshold, hybrid |
| **Benchmark** | Performance comparison standard |
| **Permitted investments** | Asset classes, vehicle types |
| **Prohibited investments** | Derivatives, illiquid, etc. |

---

## Return Objectives

### Determining Required Return

| Factor | Consideration |
|--------|---------------|
| **Spending needs** | Annual withdrawals required |
| **Inflation** | Maintain purchasing power |
| **Taxes** | Pre-tax vs. after-tax needs |
| **Growth** | Wealth accumulation goals |

### Example Calculation

| Factor | Amount |
|--------|--------|
| Annual spending | $80,000 |
| Portfolio value | $2,000,000 |
| Required nominal return | 4% |
| Inflation assumption | 2.5% |
| Required real return | ~1.5% |

---

## Risk Objectives

### Specifying Risk

| Measure | How to State |
|---------|--------------|
| **Standard deviation** | "Portfolio volatility should not exceed 12%" |
| **Maximum drawdown** | "Should not lose more than 15% in any year" |
| **Shortfall risk** | "90% confidence of meeting spending needs" |

### Matching Risk Capacity

| Factor | Lower Capacity | Higher Capacity |
|--------|---------------|-----------------|
| Time horizon | Short | Long |
| Wealth level | Low | High |
| Income stability | Variable | Stable |
| Insurance needs | High | Well-covered |

---

## Suitability Framework

### Key Factors to Assess

| Factor | Questions |
|--------|-----------|
| **Investment experience** | What has client owned before? |
| **Knowledge level** | Does client understand risks? |
| **Financial situation** | Net worth, income, expenses |
| **Investment objectives** | Growth, income, preservation |
| **Time horizon** | Short, intermediate, long-term |
| **Risk tolerance** | Questionnaire results, conversations |
| **Liquidity needs** | When might money be needed? |

### Red Flags for Suitability

| Issue | Concern |
|-------|---------|
| High risk for elderly investor | May not recover from losses |
| Concentrated position | Lack of diversification |
| Illiquid investments with short horizon | May not be able to access funds |
| Complex products for inexperienced | May not understand risks |

---

## Monitoring and Review

### Periodic Review Schedule

| Frequency | Focus |
|-----------|-------|
| **Quarterly** | Performance, rebalancing needs |
| **Annually** | Full IPS review, life changes |
| **Ad hoc** | Major life events (marriage, job change) |

### When to Update IPS

| Trigger | Potential Changes |
|---------|-------------------|
| Change in goals | Update objectives |
| Major life event | Reassess risk capacity |
| Market conditions | May need rebalancing |
| Time horizon shift | Adjust allocation |
| Regulatory changes | Update constraints |

---

## Documenting Recommendations

### Best Practices

| Practice | Purpose |
|----------|---------|
| **Written rationale** | Explain why suitable |
| **Alternative options** | Show considerations |
| **Risk disclosures** | Document understanding |
| **Client acknowledgment** | Signatures on IPS |
| **Ongoing notes** | Record discussions |

### Sample Documentation

"Based on client's 20-year time horizon, moderate risk tolerance, and $2M portfolio, we recommend a 65% equity/35% fixed income allocation. This aligns with client's goal of 5% real return and ability to withstand 20% drawdown without impacting retirement timeline."

---

## Fiduciary Considerations

### Standard of Care

| Standard | Requirement |
|----------|-------------|
| **Suitability** | Reasonable basis, right for the client |
| **Fiduciary** | Best interest, ongoing duty |
| **Prudent investor** | Care, skill, caution |

### CFP Board Standards

CFP® professionals must:
- Act in client's best interest
- Provide advice that is suitable given client circumstances
- Disclose conflicts of interest
- Document recommendations

---

## Key Takeaways

1. **IPS** documents goals, constraints, allocation, and monitoring procedures
2. **Return objective** considers spending, inflation, taxes, growth goals
3. **Risk objective** matches risk capacity with tolerance; capacity rules
4. **Suitability** requires matching recommendations to client circumstances
5. **Review regularly** and update for life changes, market conditions
    `,
    keyTakeaways: [
      "IPS documents goals, risk tolerance, allocation, and review procedures",
      "Return objective: Spending + inflation + taxes + growth",
      "Risk objective: Match capacity (ability) with tolerance; capacity rules",
      "Suitability: Match investments to time horizon, experience, financial situation",
      "Review IPS annually and after major life events"
    ],
    keyFormulas: [
      "Required Return = (Spending / Portfolio) + Inflation + Taxes",
      "Rule of thumb: Max drawdown tolerance ≈ 2 × portfolio standard deviation"
    ],
    practiceProblems: [
      {
        question: "A retiree with $1.5M needs $60,000 annually. Inflation is 2.5%. What is the required nominal return?",
        answer: "Spending rate = $60,000 / $1,500,000 = 4%. Add inflation = 4% + 2.5% = 6.5% required nominal return (before taxes)."
      },
      {
        question: "What should trigger a review and potential update to an IPS?",
        answer: "Major life events (marriage, divorce, inheritance, job loss), significant market changes affecting allocation, changes in client goals or time horizon, reaching key milestones, or regulatory/tax law changes."
      },
      {
        question: "A client says they have high risk tolerance but gets anxious when markets drop 5%. What should the advisor do?",
        answer: "Recognize the disconnect between stated and revealed preferences. Educate about historical volatility, potentially reduce allocation to align with actual (revealed) tolerance, or implement strategies to reduce portfolio volatility (bonds, diversification)."
      }
    ],
    relatedLessons: ["CFP-INV-L009", "CFP-INV-L010", "CFP-GEN-L001"]
  }
];

export default CFP_INV3_LESSONS;
