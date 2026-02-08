# CFP Investment Planning Cheatsheet

## Domain Overview
- **Exam Weight**: ~17% of CFP Exam
- **Focus Areas**: Asset allocation, risk/return, MPT, security analysis, portfolio metrics, investment vehicles

---

## Risk Concepts

### Types of Risk

| Risk Type | Description | Diversifiable? |
|-----------|-------------|----------------|
| **Systematic** | Market-wide risk | No |
| **Unsystematic** | Company/industry specific | Yes |
| **Interest Rate** | Bond price sensitivity | Partially |
| **Reinvestment** | Coupon reinvestment rates | No |
| **Inflation** | Purchasing power erosion | No |
| **Currency** | Exchange rate fluctuations | Partially |
| **Liquidity** | Ability to sell quickly | Varies |
| **Credit/Default** | Issuer payment failure | Yes |
| **Political** | Government actions | Partially |

### Risk Measures

| Measure | Formula | What It Measures |
|---------|---------|------------------|
| **Standard Deviation** | σ = √[Σ(Ri - R̄)²/n] | Total volatility |
| **Beta** | β = Cov(Ri, Rm)/Var(Rm) | Systematic risk |
| **Coefficient of Variation** | CV = σ/R̄ | Risk per unit return |

**Beta Interpretation**:
- β = 1: Same volatility as market
- β > 1: More volatile than market
- β < 1: Less volatile than market
- β < 0: Moves opposite to market

---

## Modern Portfolio Theory (MPT)

### Key Concepts

| Term | Definition |
|------|------------|
| **Efficient Frontier** | Optimal portfolios offering highest return for given risk |
| **Optimal Portfolio** | Tangency point of CAL and efficient frontier |
| **Correlation** | -1 to +1; lower = better diversification |
| **Diversification** | Reduces unsystematic risk through asset combination |

### Correlation Effects
- **ρ = +1**: No diversification benefit
- **ρ = 0**: Moderate diversification
- **ρ = -1**: Maximum diversification (risk elimination possible)

### Portfolio Return
```
Rp = Σ(wi × Ri)
```
Where wi = weight, Ri = return of asset i

### Portfolio Standard Deviation (2 assets)
```
σp = √[w₁²σ₁² + w₂²σ₂² + 2w₁w₂ρ₁₂σ₁σ₂]
```

---

## Capital Asset Pricing Model (CAPM)

### Formula
```
E(Ri) = Rf + βi(Rm - Rf)
```
- E(Ri) = Expected return of asset
- Rf = Risk-free rate
- βi = Beta of asset
- Rm = Expected market return
- (Rm - Rf) = Market risk premium

### Security Market Line (SML)
- Plots expected return vs beta
- All properly priced securities lie on SML
- **Above SML**: Undervalued (buy)
- **Below SML**: Overvalued (sell)

### Capital Market Line (CML)
- Plots expected return vs standard deviation
- Only efficient portfolios lie on CML
- Uses total risk (σ), not just systematic risk (β)

---

## Performance Measures

### Risk-Adjusted Return Metrics

| Measure | Formula | Uses |
|---------|---------|------|
| **Sharpe Ratio** | (Rp - Rf)/σp | Total risk; compare portfolios |
| **Treynor Ratio** | (Rp - Rf)/βp | Systematic risk; well-diversified |
| **Jensen's Alpha** | Rp - [Rf + β(Rm - Rf)] | Excess return over CAPM |
| **Information Ratio** | (Rp - Rb)/Tracking Error | Active management skill |
| **Sortino Ratio** | (Rp - Rf)/Downside Deviation | Downside risk only |

### Key Distinctions
- **Sharpe vs Treynor**: Sharpe uses σ (total risk), Treynor uses β (systematic risk)
- **Alpha**: Positive = outperformed, Negative = underperformed
- **Tracking Error**: Standard deviation of excess returns vs benchmark

---

## Bond Fundamentals

### Bond Pricing Relationship
```
Bond Price = Σ[C/(1+r)ᵗ] + [FV/(1+r)ⁿ]
```

### Price/Yield Relationship
- **Inverse relationship**: Yields up → Prices down
- **Convexity**: Price increase > price decrease for equal yield change

### Duration

| Type | Description |
|------|-------------|
| **Macaulay Duration** | Weighted average time to receive cash flows |
| **Modified Duration** | Price sensitivity to yield changes |
| **Effective Duration** | Accounts for embedded options |

**Duration Formula**:
```
Modified Duration = Macaulay Duration / (1 + y/n)
Price Change ≈ -Duration × Δy × Price
```

### Duration Factors
- Longer maturity → Higher duration
- Lower coupon → Higher duration
- Lower yield → Higher duration
- Zero coupon = Macaulay duration equals maturity

### Convexity
- Measures curvature of price/yield relationship
- Higher convexity = more price appreciation in falling rates
- Positive for most bonds (more upside than downside)

### Bond Ratings

| Investment Grade | Speculative Grade |
|------------------|-------------------|
| S&P: AAA to BBB- | S&P: BB+ to D |
| Moody's: Aaa to Baa3 | Moody's: Ba1 to C |

---

## Yield Concepts

### Types of Yield

| Yield | Definition |
|-------|------------|
| **Coupon Rate** | Annual coupon / Par value |
| **Current Yield** | Annual coupon / Current price |
| **YTM** | Total return if held to maturity |
| **YTC** | Return if called at first call date |
| **YTW** | Lowest of YTM, YTC, etc. |
| **BEY** | Semi-annual rate × 2 |
| **Tax-Equivalent Yield** | Muni yield / (1 - tax rate) |

### Yield Curve Shapes

| Shape | Implication |
|-------|-------------|
| **Normal** | Economy expanding; higher long-term rates |
| **Inverted** | Recession signal; higher short-term rates |
| **Flat** | Economic transition |
| **Humped** | Uncertainty in medium term |

---

## Stock Valuation

### Dividend Discount Model (DDM)

**Constant Growth (Gordon Model)**:
```
P₀ = D₁ / (r - g)
```
- D₁ = Next year's dividend
- r = Required return
- g = Dividend growth rate
- **Requirement**: r > g

### Price Multiples

| Multiple | Formula | Use |
|----------|---------|-----|
| P/E | Price / EPS | Compare to industry/history |
| P/B | Price / Book Value | Asset-heavy industries |
| P/S | Price / Sales | Unprofitable companies |
| PEG | P/E / Growth Rate | Growth-adjusted valuation |

### Fundamental Analysis
- **Top-down**: Economy → Sector → Company
- **Bottom-up**: Start with individual company analysis

### Technical Analysis
- Studies price patterns and volume
- Support/resistance levels
- Moving averages, momentum indicators
- Criticisms: Not based on fundamentals, self-fulfilling

---

## Investment Vehicles

### Mutual Funds

| Type | Description |
|------|-------------|
| **Open-End** | Continuous issue/redemption at NAV |
| **Closed-End** | Fixed shares; trades at premium/discount |
| **Load** | Sales charge (front-end or back-end) |
| **No-Load** | No sales charge |

**Share Classes**:
- **A Shares**: Front-end load, lower expense ratio
- **B Shares**: Back-end load, converts to A
- **C Shares**: Level load, higher ongoing expenses

### Exchange-Traded Funds (ETFs)
- Trade intraday like stocks
- Generally lower expense ratios than mutual funds
- More tax-efficient (in-kind redemptions)
- Bid-ask spread consideration

### Fund Categories

| Category | Risk | Return Potential |
|----------|------|------------------|
| Money Market | Very Low | Low |
| Bond/Fixed Income | Low-Medium | Low-Medium |
| Balanced | Medium | Medium |
| Equity | High | High |
| Sector/Specialty | Very High | Very High |

---

## Investment Styles

### Equity Styles

| Style | Characteristics |
|-------|-----------------|
| **Value** | Low P/E, P/B; undervalued |
| **Growth** | High earnings growth; higher multiples |
| **Blend** | Combination of value and growth |
| **Large Cap** | >$10B market cap |
| **Mid Cap** | $2B-$10B market cap |
| **Small Cap** | <$2B market cap |

### Style Box (Morningstar)
```
         Value    Blend    Growth
Large    [1]      [2]      [3]
Mid      [4]      [5]      [6]
Small    [7]      [8]      [9]
```

---

## Options Basics

### Key Terms

| Term | Definition |
|------|------------|
| **Call** | Right to buy at strike price |
| **Put** | Right to sell at strike price |
| **Strike Price** | Exercise price |
| **Premium** | Cost of option |
| **In the Money** | Intrinsic value > 0 |
| **Out of the Money** | No intrinsic value |

### Option Value
```
Option Value = Intrinsic Value + Time Value
```

### Basic Strategies

| Strategy | Position | Outlook | Max Gain | Max Loss |
|----------|----------|---------|----------|----------|
| Long Call | Buy call | Bullish | Unlimited | Premium |
| Long Put | Buy put | Bearish | Strike - Premium | Premium |
| Covered Call | Stock + Sell call | Neutral/Mild bullish | Premium + (Strike - Cost) | Stock cost - Premium |
| Protective Put | Stock + Buy put | Bullish with protection | Unlimited - Premium | Stock cost - Strike + Premium |

---

## Alternative Investments

### Types

| Type | Characteristics |
|------|-----------------|
| **Real Estate** | Income + appreciation; illiquid |
| **REITs** | Liquid real estate exposure; 90% distribution |
| **Commodities** | Inflation hedge; no income |
| **Hedge Funds** | Various strategies; limited regulation |
| **Private Equity** | Illiquid; long lock-up periods |
| **Collectibles** | Tangible assets; no income; 28% LTCG rate |

### Due Diligence Considerations
- Liquidity constraints
- Valuation challenges
- Higher fees
- Manager risk
- Regulatory differences

---

## Portfolio Construction

### Asset Allocation Approaches

| Approach | Description |
|----------|-------------|
| **Strategic** | Long-term target allocation |
| **Tactical** | Short-term deviations from strategic |
| **Dynamic** | Adjusts with market conditions |
| **Constant Mix** | Rebalances to maintain targets |

### Monte Carlo Simulation
- Randomizes market scenarios
- Provides probability of success
- Shows range of outcomes
- Better than single-point estimates

### Rebalancing Triggers
- **Calendar**: Quarterly, annually
- **Threshold**: When allocation drifts by X%
- **Hybrid**: Combine calendar checks with thresholds

---

## Behavioral Finance

### Cognitive Biases

| Bias | Description |
|------|-------------|
| **Overconfidence** | Overestimating abilities |
| **Confirmation** | Seeking confirming information |
| **Anchoring** | Fixating on initial information |
| **Recency** | Overweighting recent events |
| **Hindsight** | Believing past was predictable |
| **Mental Accounting** | Treating money differently by source |
| **Herding** | Following the crowd |
| **Loss Aversion** | Pain of loss > pleasure of gain |
| **Status Quo** | Preference for current state |
| **Framing** | Decisions affected by presentation |

---

## Quick Numbers Reference

| Item | Value |
|------|-------|
| Rule of 72 | 72/r = years to double |
| S&P 500 Historical Return | ~10% nominal |
| Treasury Historical Return | ~3-4% |
| Inflation Historical Average | ~3% |
| Real Return | Nominal - Inflation |
| Equity Risk Premium | ~5-6% |
| Small Cap Premium | ~2% |

---

## Exam Tips

1. **Know the formulas**: Sharpe, Treynor, Alpha, CAPM, DDM
2. **Beta interpretation**: Relative to market (β=1)
3. **Duration applicability**: Bonds only; longer = more sensitive
4. **Correlation effects**: -1 best for diversification
5. **SML vs CML**: SML uses beta, CML uses standard deviation
6. **Option payoffs**: Draw diagrams; know max gain/loss
7. **ETF vs Mutual Fund**: Tax efficiency, trading, expenses
8. **Yield curve signals**: Inverted typically precedes recession
9. **Style boxes**: 3x3 grid (size vs value/growth)
10. **Behavioral biases**: Recognize and name common biases
