export const CFP_INV_LESSONS = [
  {
    id: "CFP-L-INV-001",
    title: "Modern Portfolio Theory & CAPM",
    section: "CFP-INV",
    content: `
# Modern Portfolio Theory (MPT)

Modern Portfolio Theory, introduced by Harry Markowitz, revolutionized investing by quantifying the benefits of diversification.

## Core Concepts

### 1. The Efficient Frontier
- A set of optimal portfolios that offer the highest expected return for a defined level of risk.
- Portfolios **below** the frontier are sub-optimal (too much risk for the return).
- Portfolios **above** the frontier are impossible (without leverage).

### 2. Systematic vs. Unsystematic Risk
- **Systematic Risk (Market Risk):** Cannot be diversified away. (e.g., Inflation, War, Interest Rates). Measured by **Beta**.
- **Unsystematic Risk (Company Risk):** Can be eliminated by holding different assets. (e.g., CEO dies, product recall).
- **Total Risk:** Measured by **Standard Deviation**.

## Capital Asset Pricing Model (CAPM)
CAPM describes the relationship between systematic risk and expected return.

$$ E(Ri) = Rf + \beta_i (Rm - Rf) $$

Where:
- $E(Ri)$: Expected Return of investment $i$
- $Rf$: Risk-free rate (usually 10-year Treasury)
- $\beta_i$: Beta of investment $i$
- $Rm$: Expected Market Return
- $(Rm - Rf)$: Market Risk Premium

### Example Calculation
If the Risk-Free rate is 3%, the Market Return is 10%, and a stock has a Beta of 1.5:

$$ E(R) = 3\% + 1.5(10\% - 3\%) $$
$$ E(R) = 3\% + 1.5(7\%) $$
$$ E(R) = 3\% + 10.5\% = 13.5\% $$

The stock *should* return 13.5% to compensate for its risk. If it's only expected to return 10%, it is **overvalued** (alpha is negative).
    `
  }
];
