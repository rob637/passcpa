/**
 * CFP Domain 4: Investment Planning
 * Area INV-1: Investment Theory and Concepts
 * 
 * These lessons cover fundamental investment theory including
 * risk/return, modern portfolio theory, and market efficiency.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_INV1_LESSONS: CFPLesson[] = [
  {
    id: "CFP-INV-L001",
    domain: "CFP-INV",
    blueprintArea: "INV-1",
    title: "Risk and Return Fundamentals",
    order: 1,
    duration: 50,
    objectives: [
      "Define and calculate various measures of investment return",
      "Distinguish between systematic and unsystematic risk",
      "Calculate standard deviation and coefficient of variation",
      "Apply the risk-return tradeoff in investment decisions"
    ],
    content: `
# Risk and Return Fundamentals

Understanding the relationship between risk and return is the foundation of all investment planning.

---

## Measures of Return

### Holding Period Return (HPR)

Total return over a specific time period.

$$\\text{HPR} = \\frac{\\text{Ending Value} - \\text{Beginning Value} + \\text{Income}}{\\text{Beginning Value}}$$

### Example

| Item | Value |
|------|-------|
| Purchase price | $100 |
| Sale price | $115 |
| Dividends received | $3 |

$$\\text{HPR} = \\frac{\\$115 - \\$100 + \\$3}{\\$100} = 18\\%$$

---

## Annualized Returns

### Arithmetic Mean Return

Simple average of periodic returns.

$$\\bar{R} = \\frac{R_1 + R_2 + ... + R_n}{n}$$

**Use**: Expected return calculations, comparing strategies.

### Geometric Mean Return (CAGR)

Compound annual growth rate—actual growth rate over time.

$$\\text{Geometric Mean} = \\left[(1+R_1)(1+R_2)...(1+R_n)\\right]^{1/n} - 1$$

**Use**: Actual historical performance, time-weighted returns.

### Key Difference

| Return Type | Best For |
|-------------|----------|
| Arithmetic | Forecasting expected returns |
| Geometric | Measuring actual performance |

Arithmetic mean is always ≥ geometric mean (except when all returns are equal).

---

## Example: Arithmetic vs. Geometric

| Year | Return | Value ($1,000 start) |
|------|--------|---------------------|
| 1 | +50% | $1,500 |
| 2 | -50% | $750 |

**Arithmetic mean**: (50% + -50%) / 2 = **0%**

**Geometric mean**: √(1.50 × 0.50) - 1 = √0.75 - 1 = **-13.4%**

The geometric mean reflects reality—you lost money!

---

## Real vs. Nominal Returns

### Fisher Equation

$$\\text{Real Return} ≈ \\text{Nominal Return} - \\text{Inflation Rate}$$

More precisely:

$$1 + R_{\\text{real}} = \\frac{1 + R_{\\text{nominal}}}{1 + \\text{Inflation}}$$

### Example

| Item | Rate |
|------|------|
| Nominal return | 8% |
| Inflation | 3% |

$$R_{\\text{real}} = \\frac{1.08}{1.03} - 1 = 4.85\\%$$

---

## Types of Investment Risk

### Systematic Risk (Market Risk)

**Cannot be diversified away.** Affects entire market.

| Type | Description |
|------|-------------|
| **Market risk** | Overall market movements |
| **Interest rate risk** | Rising rates hurt bond prices |
| **Inflation risk** | Purchasing power erosion |
| **Exchange rate risk** | Currency fluctuations |
| **Reinvestment risk** | Reinvesting at lower rates |

### Unsystematic Risk (Diversifiable Risk)

**Can be diversified away.** Specific to company/industry.

| Type | Description |
|------|-------------|
| **Business risk** | Company operations |
| **Financial risk** | Use of leverage |
| **Default risk** | Failure to pay obligations |
| **Liquidity risk** | Difficulty selling quickly |
| **Political risk** | Government actions |

---

## Measuring Risk: Standard Deviation

### Definition

Measures dispersion of returns around the mean.

$$\\sigma = \\sqrt{\\frac{\\sum(R_i - \\bar{R})^2}{n-1}}$$

### Interpretation

| Standard Deviation | Meaning |
|-------------------|---------|
| Low σ | Returns clustered near mean |
| High σ | Returns widely dispersed |

### Normal Distribution Rule

- 68% of returns within ±1σ
- 95% of returns within ±2σ
- 99% of returns within ±3σ

---

## Coefficient of Variation (CV)

Measures risk per unit of return.

$$\\text{CV} = \\frac{\\sigma}{\\bar{R}}$$

### When to Use

Comparing investments with different expected returns.

| Investment | Return | Std Dev | CV |
|------------|--------|---------|-----|
| A | 10% | 15% | 1.50 |
| B | 20% | 25% | 1.25 |

**Investment B** has better risk-adjusted return (lower CV).

---

## Risk-Return Tradeoff

### The Fundamental Principle

Higher expected returns require accepting higher risk.

| Asset Class | Historical Return | Historical Risk |
|-------------|-------------------|-----------------|
| T-Bills | ~3% | ~1% |
| Bonds | ~5% | ~6% |
| Large stocks | ~10% | ~15% |
| Small stocks | ~12% | ~20% |

### Implications for Planning

- Young clients: Can accept more risk (longer time horizon)
- Retirees: Generally need lower risk
- Risk capacity ≠ Risk tolerance

---

## Key Takeaways

1. **Geometric mean** reflects actual performance; arithmetic mean for forecasting
2. **Systematic risk** cannot be diversified; unsystematic risk can be
3. **Standard deviation** measures total volatility of returns
4. **Coefficient of variation** = risk per unit of return (lower is better)
5. **Higher returns require higher risk**—no free lunch in investing
    `,
    keyTakeaways: [
      "Geometric mean for actual performance; arithmetic for expected returns",
      "Systematic risk: Market-wide, cannot diversify (interest rate, inflation)",
      "Unsystematic risk: Company-specific, can diversify away",
      "Standard deviation measures dispersion; 68% within ±1σ, 95% within ±2σ",
      "CV = σ/return; lower CV = better risk-adjusted return"
    ],
    keyFormulas: [
      "HPR = (End - Begin + Income) / Begin",
      "Geometric Mean = [(1+R₁)(1+R₂)...(1+Rₙ)]^(1/n) - 1",
      "Real Return ≈ Nominal Return - Inflation",
      "CV = Standard Deviation / Expected Return"
    ],
    mnemonics: [
      "PRIME risks are systematic: Purchasing power, Reinvestment, Interest rate, Market, Exchange rate",
      "Geometric = Get the actual Growth"
    ],
    practiceProblems: [
      {
        question: "A stock returned +40% in Year 1 and -30% in Year 2. Calculate arithmetic and geometric mean returns.",
        answer: "Arithmetic: (40% + -30%) / 2 = 5%. Geometric: √(1.40 × 0.70) - 1 = √0.98 - 1 = -1.0%. The geometric mean shows you actually lost money."
      },
      {
        question: "Investment A has 12% return with 18% standard deviation. Investment B has 8% return with 10% standard deviation. Which has better risk-adjusted return?",
        answer: "CV(A) = 18%/12% = 1.50. CV(B) = 10%/8% = 1.25. Investment B has better risk-adjusted return (lower CV)."
      },
      {
        question: "Which risks can be reduced through diversification?",
        answer: "Unsystematic risks (business risk, financial risk, default risk, liquidity risk) can be diversified. Systematic risks (market, interest rate, inflation, reinvestment, exchange rate) cannot."
      }
    ],
    relatedLessons: ["CFP-INV-L002", "CFP-INV-L003", "CFP-GEN-L003"]
  },

  {
    id: "CFP-INV-L002",
    domain: "CFP-INV",
    blueprintArea: "INV-1",
    title: "Modern Portfolio Theory",
    order: 2,
    duration: 55,
    objectives: [
      "Explain the benefits of diversification",
      "Calculate portfolio expected return and standard deviation",
      "Interpret correlation and its impact on portfolio risk",
      "Identify the efficient frontier and optimal portfolios"
    ],
    content: `
# Modern Portfolio Theory

**Modern Portfolio Theory (MPT)**, developed by Harry Markowitz (1952), revolutionized investing by showing how to optimize the risk-return tradeoff through diversification.

---

## The Power of Diversification

### Key Insight

Combining assets with less-than-perfect correlation reduces portfolio risk **without sacrificing return**.

### Mathematical Foundation

Two assets with same return and same risk:
- Perfect correlation (+1): No risk reduction
- Zero correlation (0): Some risk reduction
- Negative correlation (-1): Maximum risk reduction

---

## Portfolio Expected Return

The weighted average of individual expected returns.

$$E(R_p) = w_1 E(R_1) + w_2 E(R_2) + ... + w_n E(R_n)$$

### Example: Two-Asset Portfolio

| Asset | Weight | Expected Return |
|-------|--------|-----------------|
| Stocks | 60% | 10% |
| Bonds | 40% | 5% |

$$E(R_p) = 0.60(10\\%) + 0.40(5\\%) = 8\\%$$

---

## Portfolio Risk (Standard Deviation)

### Two-Asset Formula

$$\\sigma_p = \\sqrt{w_1^2\\sigma_1^2 + w_2^2\\sigma_2^2 + 2w_1w_2\\sigma_1\\sigma_2\\rho_{1,2}}$$

Where:
- $w$ = weight
- $\\sigma$ = standard deviation
- $\\rho$ = correlation coefficient

### Key Takeaway

Portfolio risk depends on:
1. Individual asset risks (σ)
2. Weights (w)
3. **Correlation (ρ)** between assets

---

## Correlation Coefficient (ρ)

### Range and Interpretation

| ρ Value | Relationship |
|---------|--------------|
| +1.0 | Perfect positive (move together) |
| 0 | No relationship |
| -1.0 | Perfect negative (move opposite) |

### Impact on Diversification

| Correlation | Diversification Benefit |
|-------------|------------------------|
| ρ = +1 | None (just weighted average risk) |
| ρ < +1 | Some risk reduction |
| ρ = 0 | Good risk reduction |
| ρ < 0 | Maximum risk reduction |

---

## Example: Correlation Impact

| Given | Value |
|-------|-------|
| Stock σ | 20% |
| Bond σ | 8% |
| Stock weight | 60% |
| Bond weight | 40% |

### If ρ = +1.0 (Perfect Positive)

$$\\sigma_p = \\sqrt{0.36(0.04) + 0.16(0.0064) + 2(0.60)(0.40)(0.20)(0.08)(1.0)}$$
$$\\sigma_p = \\sqrt{0.0144 + 0.001024 + 0.00768} = \\sqrt{0.023104} = 15.2\\%$$

### If ρ = 0 (No Correlation)

$$\\sigma_p = \\sqrt{0.0144 + 0.001024 + 0} = \\sqrt{0.015424} = 12.4\\%$$

### If ρ = -1.0 (Perfect Negative)

$$\\sigma_p = \\sqrt{0.0144 + 0.001024 - 0.00768} = \\sqrt{0.007744} = 8.8\\%$$

**Lower correlation → Lower portfolio risk!**

---

## The Efficient Frontier

### Definition

The set of portfolios that offer the **highest expected return for each level of risk**.

### Characteristics

| Position | Description |
|----------|-------------|
| On frontier | Optimal—cannot get more return without more risk |
| Below frontier | Inefficient—can improve |
| Above frontier | Impossible |

### The Curve

Moving along the efficient frontier:
- Left (lower risk, lower return)
- Right (higher risk, higher return)

---

## Optimal Portfolio Selection

### Combining with Risk-Free Asset

When you add a risk-free asset, the efficient frontier becomes a straight line called the **Capital Market Line (CML)**.

### Tangent Portfolio

The point where CML touches the efficient frontier:
- Called the **market portfolio**
- Contains all risky assets in market-value weights
- Maximum Sharpe ratio

---

## Assumptions of MPT

### The Model Assumes

1. Investors are rational and risk-averse
2. Returns are normally distributed
3. Investors choose portfolios based on mean and variance only
4. Transaction costs and taxes are zero
5. All investors have same time horizon
6. Investors have homogeneous expectations

### Limitations

- Returns aren't always normally distributed (fat tails)
- Correlations change during crises (tend toward +1)
- Historical data may not predict future
- Ignores behavioral biases

---

## Practical Applications

### Asset Allocation

- Mix asset classes with low correlations
- International diversification
- Alternative investments (real estate, commodities)

### Rebalancing

- Maintain target weights
- Buy low, sell high automatically
- Control portfolio drift

---

## Key Takeaways

1. **Diversification** reduces risk when correlation < +1
2. **Portfolio return** = weighted average of asset returns
3. **Portfolio risk** depends on weights, individual risks, AND correlations
4. **Lower correlation** = greater diversification benefit
5. **Efficient frontier**: Maximum return for given risk level
    `,
    keyTakeaways: [
      "Diversification reduces risk when correlation is less than +1",
      "Portfolio return = weighted average of individual returns",
      "Portfolio risk depends on weights, individual σ, AND correlations",
      "Lower/negative correlation provides greater diversification benefit",
      "Efficient frontier: Best possible return for each risk level"
    ],
    keyFormulas: [
      "E(Rp) = w₁E(R₁) + w₂E(R₂)",
      "σp = √[w₁²σ₁² + w₂²σ₂² + 2w₁w₂σ₁σ₂ρ₁,₂]",
      "Correlation range: -1 to +1"
    ],
    mnemonics: [
      "MPT = Mix Properly Together (for diversification)",
      "Correlation +1 = Copied movement; -1 = Contrary movement"
    ],
    practiceProblems: [
      {
        question: "A portfolio has 50% stocks (σ = 18%) and 50% bonds (σ = 6%) with correlation of 0.2. What is portfolio standard deviation?",
        answer: "σp = √[0.25(0.0324) + 0.25(0.0036) + 2(0.5)(0.5)(0.18)(0.06)(0.2)] = √[0.0081 + 0.0009 + 0.00108] = √0.01008 = 10.04%"
      },
      {
        question: "If two assets have correlation of -1, what is the theoretical minimum portfolio risk?",
        answer: "With perfect negative correlation (-1), it's theoretically possible to create a zero-risk portfolio by choosing the right weights. This is why negative correlation provides maximum diversification."
      },
      {
        question: "Asset A returns 12%, Asset B returns 6%. A portfolio with 70% in A and 30% in B has expected return of?",
        answer: "E(Rp) = 0.70(12%) + 0.30(6%) = 8.4% + 1.8% = 10.2%"
      }
    ],
    relatedLessons: ["CFP-INV-L001", "CFP-INV-L003", "CFP-INV-L007"]
  },

  {
    id: "CFP-INV-L003",
    domain: "CFP-INV",
    blueprintArea: "INV-1",
    title: "Capital Asset Pricing Model (CAPM)",
    order: 3,
    duration: 50,
    objectives: [
      "Calculate expected return using CAPM",
      "Interpret beta and its implications",
      "Distinguish systematic from total risk",
      "Apply the Security Market Line concept"
    ],
    content: `
# Capital Asset Pricing Model (CAPM)

The **CAPM** determines the expected return of an asset based on its systematic risk (beta), not total risk.

---

## The CAPM Formula

$$E(R_i) = R_f + \\beta_i [E(R_m) - R_f]$$

Where:
- $E(R_i)$ = Expected return of the investment
- $R_f$ = Risk-free rate
- $\\beta_i$ = Beta of the investment
- $E(R_m)$ = Expected return of the market
- $[E(R_m) - R_f]$ = Market risk premium

---

## Understanding Beta (β)

### Definition

Beta measures sensitivity to market movements—**systematic risk**.

$$\\beta = \\frac{\\text{Cov}(R_i, R_m)}{\\text{Var}(R_m)}$$

### Interpretation

| Beta | Meaning | Example |
|------|---------|---------|
| β = 1.0 | Moves with market | Index fund |
| β > 1.0 | More volatile than market | Tech stocks |
| β < 1.0 | Less volatile than market | Utilities |
| β = 0 | No market sensitivity | T-Bills |
| β < 0 | Moves opposite to market | Gold (sometimes) |

---

## Beta Examples

| If Market Returns... | Stock with β = 1.5 | Stock with β = 0.6 |
|---------------------|-------------------|-------------------|
| +10% | +15% | +6% |
| -10% | -15% | -6% |
| 0% | 0% | 0% |

### Portfolio Beta

$$\\beta_p = w_1\\beta_1 + w_2\\beta_2 + ... + w_n\\beta_n$$

Weighted average of individual betas.

---

## CAPM Example

| Given | Value |
|-------|-------|
| Risk-free rate | 3% |
| Market return | 10% |
| Stock beta | 1.3 |

$$E(R) = 3\\% + 1.3(10\\% - 3\\%)$$
$$E(R) = 3\\% + 1.3(7\\%)$$
$$E(R) = 3\\% + 9.1\\% = 12.1\\%$$

---

## The Security Market Line (SML)

### Definition

A graph of CAPM showing the linear relationship between beta and expected return.

### Characteristics

| Point | Location |
|-------|----------|
| Y-intercept | Risk-free rate |
| Slope | Market risk premium |
| Market portfolio | β = 1, return = E(Rm) |

### Using SML for Valuation

| Position | Meaning | Action |
|----------|---------|--------|
| **Above SML** | Undervalued (high return for risk) | Buy |
| **On SML** | Fairly valued | Hold |
| **Below SML** | Overvalued (low return for risk) | Sell/Avoid |

---

## Alpha (α)

### Definition

The excess return above what CAPM predicts.

$$\\alpha = \\text{Actual Return} - \\text{Expected Return (from CAPM)}$$

### Interpretation

| Alpha | Meaning |
|-------|---------|
| α > 0 | Positive alpha—outperformed |
| α = 0 | Performed as expected |
| α < 0 | Negative alpha—underperformed |

### Example

Stock returned 14%, CAPM predicted 12.1%:
$$\\alpha = 14\\% - 12.1\\% = +1.9\\%$$

Positive alpha indicates good stock selection or timing.

---

## Total Risk vs. Systematic Risk

### Key Distinction

| Risk Type | Measure | Relevant For |
|-----------|---------|--------------|
| **Total risk** | Standard deviation (σ) | Undiversified investor |
| **Systematic risk** | Beta (β) | Diversified investor |

### CAPM Insight

The market only rewards **systematic risk**:
- Unsystematic risk can be diversified away (free)
- Only systematic risk earns risk premium

---

## CAPM Assumptions

1. Investors are rational and risk-averse
2. All investors have same time horizon
3. Can borrow/lend at risk-free rate
4. No transaction costs or taxes
5. All information is available to everyone
6. Assets are infinitely divisible

### Limitations

- Beta is based on historical data
- Risk-free rate assumption is imperfect
- Market portfolio is theoretical (cannot truly own all assets)
- Single-factor model may be too simple

---

## Applications in Financial Planning

### Portfolio Construction

- Use beta to target desired market sensitivity
- Combine high/low beta for desired risk level

### Performance Evaluation

- Compare returns to CAPM expectations
- Identify managers with positive alpha

### Asset Allocation

- Adjust beta through allocation changes
- Use leverage to increase beta if needed

---

## Key Takeaways

1. **CAPM**: E(R) = Rf + β(Rm - Rf)
2. **Beta** measures systematic risk (sensitivity to market)
3. **SML** graphs the risk-return relationship; above SML = undervalued
4. **Alpha** = actual return minus CAPM-expected return
5. **Only systematic risk** is rewarded—diversify away the rest
    `,
    keyTakeaways: [
      "CAPM: E(R) = Rf + β(Rm - Rf)",
      "Beta measures systematic risk (market sensitivity)",
      "β > 1 = more volatile than market; β < 1 = less volatile",
      "SML: Above line = undervalued; below = overvalued",
      "Alpha = actual return minus expected return (CAPM)"
    ],
    keyFormulas: [
      "E(Ri) = Rf + βi(Rm - Rf)",
      "Portfolio β = w₁β₁ + w₂β₂ + ... + wₙβₙ",
      "α = Actual Return - Expected Return",
      "Market Risk Premium = Rm - Rf"
    ],
    mnemonics: [
      "CAPM = Consider All Parts of the Market",
      "Beta = Bounce with the market (1=same, >1=more, <1=less)"
    ],
    practiceProblems: [
      {
        question: "Risk-free rate is 4%, market return is 11%, stock beta is 0.8. What is the expected return?",
        answer: "E(R) = 4% + 0.8(11% - 4%) = 4% + 0.8(7%) = 4% + 5.6% = 9.6%"
      },
      {
        question: "A stock with beta 1.2 has actual return of 15%. CAPM expected return was 13%. What is alpha?",
        answer: "α = 15% - 13% = +2%. Positive alpha indicates the stock outperformed expectations."
      },
      {
        question: "Portfolio has 40% in Stock A (β = 1.5) and 60% in Stock B (β = 0.7). What is portfolio beta?",
        answer: "βp = 0.40(1.5) + 0.60(0.7) = 0.60 + 0.42 = 1.02"
      }
    ],
    relatedLessons: ["CFP-INV-L001", "CFP-INV-L002", "CFP-INV-L004"]
  },

  {
    id: "CFP-INV-L004",
    domain: "CFP-INV",
    blueprintArea: "INV-1",
    title: "Market Efficiency and Behavioral Finance",
    order: 4,
    duration: 45,
    objectives: [
      "Explain the three forms of market efficiency",
      "Identify investment strategies implied by each form",
      "Recognize common behavioral biases",
      "Apply behavioral insights to financial planning"
    ],
    content: `
# Market Efficiency and Behavioral Finance

The **Efficient Market Hypothesis (EMH)** suggests prices reflect available information. **Behavioral finance** challenges this by exploring psychological biases.

---

## Efficient Market Hypothesis (EMH)

### Core Premise

Stock prices fully reflect all available information, making it impossible to consistently "beat the market."

### Three Forms of EMH

| Form | Information Reflected | Implication |
|------|----------------------|-------------|
| **Weak** | Past prices and trading volume | Technical analysis doesn't work |
| **Semi-strong** | All public information | Fundamental analysis doesn't work |
| **Strong** | All information (public + private) | Even insider info doesn't help |

---

## Investment Implications by EMH Form

### If Markets Are Weak-Form Efficient

| Analysis Type | Usefulness |
|---------------|------------|
| Technical analysis | **Useless** |
| Fundamental analysis | May work |
| Insider information | May work |

### If Markets Are Semi-Strong Efficient

| Analysis Type | Usefulness |
|---------------|------------|
| Technical analysis | Useless |
| Fundamental analysis | **Useless** |
| Insider information | May work |

### If Markets Are Strong-Form Efficient

| Analysis Type | Usefulness |
|---------------|------------|
| Technical analysis | Useless |
| Fundamental analysis | Useless |
| Insider information | **Useless** |

---

## Evidence and Anomalies

### Support for EMH

- Most active managers underperform indexes
- Information is incorporated quickly
- Past returns don't predict future returns reliably

### Challenges to EMH (Anomalies)

| Anomaly | Description |
|---------|-------------|
| **January effect** | Small stocks outperform in January |
| **Monday effect** | Lower returns on Mondays |
| **Small-firm effect** | Small caps outperform over time |
| **Value effect** | Value stocks outperform growth |
| **Momentum** | Recent winners continue winning short-term |

---

## Implications for Financial Planning

### If You Believe in EMH

- Use **index funds** (low-cost, market exposure)
- Focus on **asset allocation** not stock picking
- Minimize **costs and taxes**
- Accept market returns

### If You Believe in Inefficiency

- Active management may add value
- Security selection matters
- Factor investing (value, momentum) may work
- Market timing may be possible

---

## Behavioral Finance

### Key Premise

Investors are not always rational—psychological biases affect decisions.

### Categories of Biases

| Category | Description |
|----------|-------------|
| **Cognitive** | Errors in processing information |
| **Emotional** | Feelings driving decisions |

---

## Major Cognitive Biases

### Anchoring

Relying too heavily on first piece of information.

**Example**: "I bought at $50, so I won't sell until it gets back to $50."

### Confirmation Bias

Seeking information that confirms existing beliefs.

**Example**: Only reading positive news about stocks you own.

### Mental Accounting

Treating money differently based on its source.

**Example**: Willing to gamble with "house money" (gains) but not savings.

### Overconfidence

Overestimating one's own abilities.

**Example**: Believing you can consistently beat the market.

### Availability Bias

Overweighting easily recalled information (recent or dramatic).

**Example**: Fearing stocks after a crash, even if historically optimal.

### Recency Bias

Overweighting recent experience.

**Example**: Expecting recent trends to continue indefinitely.

---

## Major Emotional Biases

### Loss Aversion

Losses hurt more than equivalent gains feel good.

**Research**: Losses hurt about **2x** as much as gains please.

**Impact**: Hold losers too long, sell winners too soon.

### Endowment Effect

Overvaluing things you already own.

**Example**: Inherited stock feels more valuable than it is.

### Herding

Following the crowd.

**Example**: Buying at market tops, selling at bottoms.

### Regret Aversion

Fear of making decisions that might be wrong.

**Example**: Paralysis in making investment changes.

---

## Applying Behavioral Insights

### For Financial Planners

| Bias | Planning Strategy |
|------|-------------------|
| **Loss aversion** | Frame in terms of goals, not losses |
| **Overconfidence** | Show historical data, diversify |
| **Mental accounting** | View wealth holistically |
| **Herding** | Systematic rebalancing |
| **Anchoring** | Focus on fundamentals, not purchase price |

### Check-In Questions

- "Are you holding this because you believe in it—or because you bought it?"
- "Would you buy this today at current price?"

---

## Key Takeaways

1. **EMH forms**: Weak, Semi-strong, Strong—progressively more information reflected
2. **Weak form**: Technical analysis fails; **Semi-strong**: Fundamental analysis fails
3. **Anomalies** (January effect, small-firm) challenge EMH
4. **Behavioral biases**: Loss aversion, overconfidence, herding, anchoring
5. **Planners** should recognize biases and design guardrails
    `,
    keyTakeaways: [
      "EMH: Weak (past prices), Semi-strong (all public), Strong (all info)",
      "Technical analysis fails in weak form; fundamental fails in semi-strong",
      "Anomalies (January, small-firm, value) challenge EMH",
      "Key biases: Loss aversion (losses hurt 2x), overconfidence, herding",
      "Planners should identify biases and implement behavioral guardrails"
    ],
    keyFormulas: [
      "No formulas—conceptual material on market theory and behavior"
    ],
    mnemonics: [
      "EMH Levels: WeSH (Weak, Semi-strong, Strong = all Hearing everything)",
      "ALARM biases: Anchoring, Loss aversion, Availability, Recency, Mental accounting"
    ],
    practiceProblems: [
      {
        question: "If markets are semi-strong efficient, which analysis techniques can add value?",
        answer: "Only insider information could add value (but is illegal). Both technical analysis (past prices) and fundamental analysis (public info) are reflected in prices and cannot provide an edge."
      },
      {
        question: "A client refuses to sell a losing stock, saying 'It's not a loss until I sell.' What bias is this?",
        answer: "Loss aversion and mental accounting. The client is treating unrealized losses as fundamentally different from realized losses and avoiding the pain of making the loss 'real.'"
      },
      {
        question: "A client wants to invest heavily in a hot stock everyone is buying because 'it can't lose.' What biases are at play?",
        answer: "Herding (following the crowd), recency bias (assuming recent gains will continue), and possibly overconfidence (believing they're picking a winner)."
      }
    ],
    relatedLessons: ["CFP-INV-L003", "CFP-GEN-L001", "CFP-INV-L007"]
  }
];

export default CFP_INV1_LESSONS;
