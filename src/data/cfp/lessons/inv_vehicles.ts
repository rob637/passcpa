/**
 * CFP Domain 4: Investment Planning
 * Area INV-2: Investment Vehicles
 * 
 * These lessons cover bonds, stocks, mutual funds, ETFs,
 * and alternative investments.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_INV2_LESSONS: CFPLesson[] = [
  {
    id: "CFP-INV-L005",
    domain: "CFP-INV",
    blueprintArea: "INV-2",
    title: "Fixed Income Securities",
    order: 5,
    duration: 55,
    objectives: [
      "Calculate bond pricing, yield to maturity, and current yield",
      "Explain the inverse relationship between prices and yields",
      "Compare different types of bonds and their characteristics",
      "Assess interest rate risk using duration"
    ],
    content: `
# Fixed Income Securities

Understanding bonds is essential for building diversified portfolios and managing interest rate risk.

---

## Bond Fundamentals

### Key Terms

| Term | Definition |
|------|------------|
| **Par (Face) Value** | Amount paid at maturity (typically $1,000) |
| **Coupon Rate** | Annual interest as % of par |
| **Coupon Payment** | Dollar amount paid periodically |
| **Maturity** | Date when principal is returned |
| **Yield to Maturity (YTM)** | Total return if held to maturity |

---

## Bond Pricing

### The Inverse Relationship

**When interest rates rise, bond prices fall (and vice versa).**

| Market Rate vs. Coupon | Bond Price | Name |
|-----------------------|------------|------|
| Market rate > Coupon | Below par | **Discount** |
| Market rate = Coupon | At par | **Par** |
| Market rate < Coupon | Above par | **Premium** |

### Bond Price Formula

$$\\text{Price} = \\sum_{t=1}^{n} \\frac{C}{(1+r)^t} + \\frac{FV}{(1+r)^n}$$

Where:
- C = Coupon payment
- r = Market interest rate (per period)
- n = Number of periods
- FV = Face value

---

## Yield Measures

### Current Yield

Simple income return:

$$\\text{Current Yield} = \\frac{\\text{Annual Coupon}}{\\text{Current Price}}$$

**Example**: $60 coupon / $950 price = 6.32%

### Yield to Maturity (YTM)

Total return if held to maturity, including:
- Coupon payments
- Reinvestment of coupons
- Gain/loss from price vs. par

### Yield to Call (YTC)

If bond is callable, calculate yield to first call date.

**Use lower of YTM or YTC** for premium bonds.

---

## Example: Yield Calculations

| Bond Details | Value |
|--------------|-------|
| Par value | $1,000 |
| Coupon rate | 5% |
| Current price | $920 |
| Years to maturity | 10 |

**Current Yield**: $50 / $920 = **5.43%**

**YTM**: Approximately **5.9%** (includes $80 gain over 10 years)

---

## Types of Bonds

### By Issuer

| Type | Characteristics | Tax Treatment |
|------|-----------------|---------------|
| **Treasury** | Backed by US government; safest | Exempt from state/local tax |
| **Agency** | GSEs (Fannie, Freddie) | Usually taxable |
| **Municipal** | State/local governments | Federal tax-exempt* |
| **Corporate** | Companies | Fully taxable |

*Some munis subject to AMT.

### Treasury Securities

| Security | Maturity | Features |
|----------|----------|----------|
| T-Bills | ≤ 1 year | Discount securities, no coupon |
| T-Notes | 2-10 years | Semi-annual coupon |
| T-Bonds | 10-30 years | Semi-annual coupon |
| TIPS | Various | Inflation-adjusted principal |
| I-Bonds | 30 years | Inflation + fixed rate |

---

## Municipal Bonds

### Tax-Equivalent Yield

For comparing munis to taxable bonds:

$$\\text{TEY} = \\frac{\\text{Muni Yield}}{1 - \\text{Tax Rate}}$$

### Example

Muni yields 3%, investor in 32% bracket:

$$\\text{TEY} = \\frac{3\\%}{1 - 0.32} = \\frac{3\\%}{0.68} = 4.41\\%$$

Need taxable bond to yield >4.41% to beat muni.

---

## Corporate Bonds

### Credit Ratings

| Rating (S&P/Moody's) | Category | Risk |
|---------------------|----------|------|
| AAA/Aaa to BBB/Baa | Investment grade | Lower risk |
| BB/Ba and below | High yield ("junk") | Higher risk/return |

### Types

| Type | Feature |
|------|---------|
| **Secured** | Backed by specific assets |
| **Unsecured (Debenture)** | Backed by creditworthiness |
| **Convertible** | Can convert to stock |
| **Callable** | Issuer can redeem early |
| **Zero-coupon** | No periodic payments; deep discount |

---

## Interest Rate Risk: Duration

### What Is Duration?

Weighted average time to receive cash flows—measures **sensitivity to rate changes**.

$$\\text{Price Change} \\approx -\\text{Duration} \\times \\Delta\\text{Interest Rate}$$

### Duration Rules

| Factor | Duration Impact |
|--------|----------------|
| Longer maturity | Higher duration |
| Lower coupon | Higher duration |
| Lower yield | Higher duration |

### Example

Bond has duration of 7 years. Rates rise 1%:

$$\\text{Price Change} \\approx -7 \\times 1\\% = -7\\%$$

---

## Zero-Coupon Bonds

### Characteristics

| Feature | Description |
|---------|-------------|
| Coupon | None |
| Purchase price | Deep discount |
| Return | All from price appreciation |
| Duration | Equals maturity (no interim payments) |
| Taxation | Phantom income (OID taxed annually) |

### Use Cases

- Goal funding (known future date)
- IRAs (avoid phantom income issue)
- Maximum interest rate sensitivity

---

## Key Takeaways

1. **Bond prices and yields move inversely**
2. **Premium** = coupon > market rate; **Discount** = coupon < market rate
3. **Tax-equivalent yield** = Muni yield / (1 - tax rate)
4. **Duration** measures price sensitivity; longer maturity/lower coupon = higher duration
5. **Zero-coupon bonds** have duration equal to maturity; taxed on phantom income
    `,
    keyTakeaways: [
      "Bond prices and interest rates move inversely",
      "Premium: coupon > market; Discount: coupon < market",
      "Tax-equivalent yield = Muni yield / (1 - tax rate)",
      "Duration measures rate sensitivity; price change ≈ -Duration × Δrate",
      "Zero-coupon duration = maturity; phantom income taxed annually"
    ],
    keyFormulas: [
      "Current Yield = Annual Coupon / Current Price",
      "Tax-Equivalent Yield = Muni Yield / (1 - Tax Rate)",
      "Price Change ≈ -Duration × ΔInterest Rate"
    ],
    mnemonics: [
      "Rates UP, Prices DOWN (like a seesaw)",
      "Duration = Danger to rates (higher duration = more danger)"
    ],
    practiceProblems: [
      {
        question: "A muni bond yields 4%. An investor is in the 35% tax bracket. What taxable yield would be equivalent?",
        answer: "TEY = 4% / (1 - 0.35) = 4% / 0.65 = 6.15%. The investor needs a taxable bond yielding more than 6.15% to beat the muni."
      },
      {
        question: "A bond has duration of 5 years. If rates rise 2%, what is the approximate price change?",
        answer: "Price change ≈ -5 × 2% = -10%. The bond price would fall approximately 10%."
      },
      {
        question: "A $1,000 par bond pays 6% coupon and trades at $1,100. What is the current yield?",
        answer: "Current yield = $60 / $1,100 = 5.45%. Note: This is a premium bond because price > par."
      }
    ],
    relatedLessons: ["CFP-INV-L006", "CFP-INV-L001", "CFP-TAX-L005"]
  },

  {
    id: "CFP-INV-L006",
    domain: "CFP-INV",
    blueprintArea: "INV-2",
    title: "Equity Securities",
    order: 6,
    duration: 50,
    objectives: [
      "Distinguish between common and preferred stock",
      "Calculate dividend yield and dividend growth valuation",
      "Compare growth vs. value investing styles",
      "Evaluate equity using fundamental metrics"
    ],
    content: `
# Equity Securities

Equity represents ownership in a company, offering potential for growth and income through dividends.

---

## Common Stock

### Ownership Rights

| Right | Description |
|-------|-------------|
| **Voting** | Elect board, approve major decisions |
| **Dividends** | Share of profits (not guaranteed) |
| **Residual claim** | Last in line in bankruptcy |
| **Limited liability** | Can only lose investment amount |
| **Preemptive rights** | Right to maintain ownership % |

### Returns Come From

1. **Price appreciation** (capital gains)
2. **Dividends** (income)

---

## Preferred Stock

### Hybrid Characteristics

| Feature | More Like |
|---------|-----------|
| Fixed dividend | Bonds |
| Price sensitivity to rates | Bonds |
| No maturity date | Stocks |
| Residual claim (after bonds) | Stocks |

### Types of Preferred

| Type | Feature |
|------|---------|
| **Cumulative** | Missed dividends must be paid before common |
| **Non-cumulative** | Missed dividends are lost |
| **Convertible** | Can convert to common stock |
| **Callable** | Issuer can redeem |
| **Participating** | Shares in extra profits |

---

## Valuation: Dividend Discount Model

### Constant Growth Model (Gordon Model)

$$P_0 = \\frac{D_1}{r - g}$$

Where:
- $P_0$ = Current stock price
- $D_1$ = Next year's dividend
- $r$ = Required return
- $g$ = Dividend growth rate

**Requirement**: r > g

### Example

| Given | Value |
|-------|-------|
| Current dividend (D₀) | $2.00 |
| Growth rate (g) | 5% |
| Required return (r) | 10% |

$$D_1 = \\$2.00 \\times 1.05 = \\$2.10$$
$$P_0 = \\frac{\\$2.10}{0.10 - 0.05} = \\$42.00$$

---

## Dividend Yield

Simple income return from dividends:

$$\\text{Dividend Yield} = \\frac{\\text{Annual Dividend}}{\\text{Stock Price}}$$

### Example

$3 annual dividend / $60 stock price = **5%**

---

## Growth vs. Value Investing

### Value Stocks

| Characteristic | Description |
|----------------|-------------|
| **P/E ratio** | Low |
| **P/B ratio** | Low |
| **Dividend yield** | Higher |
| **Growth** | Slower |
| **Perception** | "Cheap" or out of favor |

### Growth Stocks

| Characteristic | Description |
|----------------|-------------|
| **P/E ratio** | High |
| **P/B ratio** | High |
| **Dividend yield** | Lower or none |
| **Growth** | Faster earnings growth |
| **Perception** | Premium for growth potential |

### Historical Performance

- Value tends to outperform over very long periods
- Growth tends to outperform during bull markets
- Neither consistently wins—diversify across both

---

## Key Valuation Metrics

### Price-to-Earnings (P/E) Ratio

$$\\text{P/E} = \\frac{\\text{Price per Share}}{\\text{Earnings per Share}}$$

| P/E | Interpretation |
|-----|----------------|
| High | Market expects growth (or overvalued) |
| Low | Out of favor (or undervalued) |

### Price-to-Book (P/B) Ratio

$$\\text{P/B} = \\frac{\\text{Price per Share}}{\\text{Book Value per Share}}$$

| P/B | Interpretation |
|-----|----------------|
| < 1 | Trading below asset value |
| > 1 | Market values growth/intangibles |

### PEG Ratio

$$\\text{PEG} = \\frac{\\text{P/E}}{\\text{Earnings Growth Rate}}$$

| PEG | Interpretation |
|-----|----------------|
| < 1 | May be undervalued |
| > 1 | May be overvalued |

---

## Market Capitalization

| Category | Market Cap |
|----------|-----------|
| **Large-cap** | > $10 billion |
| **Mid-cap** | $2-10 billion |
| **Small-cap** | $300M-$2 billion |
| **Micro-cap** | < $300 million |

### Risk/Return by Size

- Small-cap: Higher historical returns, higher volatility
- Large-cap: Lower returns, more stability

---

## Stock Splits and Dividends

### Stock Split

| Type | Effect |
|------|--------|
| 2-for-1 | Double shares, halve price |
| 3-for-1 | Triple shares, third price |

**Total value unchanged**—just more shares at lower price.

### Reverse Split

| Type | Effect |
|------|--------|
| 1-for-10 | Tenth the shares, 10x price |

Often used by troubled companies to meet exchange minimums.

### Stock Dividends

Distribution of additional shares instead of cash.

- 10% stock dividend = 10 shares become 11
- Similar to small split in effect

---

## Key Takeaways

1. **Common stock**: Voting rights, residual claim, dividends not guaranteed
2. **Preferred stock**: Fixed dividend priority, rate-sensitive like bonds
3. **Gordon Model**: P₀ = D₁ / (r - g) for constant-growth valuation
4. **Value**: Low P/E, high yield; **Growth**: High P/E, low/no yield
5. **Small-cap**: Higher risk and return; **Large-cap**: More stability
    `,
    keyTakeaways: [
      "Common stock: Voting, residual claim, variable dividends",
      "Preferred: Fixed dividends, priority over common, rate-sensitive",
      "Gordon Model: P₀ = D₁ / (r - g); requires r > g",
      "Value = low P/E, high yield; Growth = high P/E, reinvests earnings",
      "Small-cap = higher risk/return; large-cap = more stability"
    ],
    keyFormulas: [
      "Gordon Model: P₀ = D₁ / (r - g)",
      "Dividend Yield = Annual Dividend / Price",
      "P/E = Price / EPS",
      "PEG = P/E / Growth Rate"
    ],
    mnemonics: [
      "Gordon Growth: Dividend / (Required - Growth)",
      "Value = Victory for the patient; Growth = Glamour (and higher P/E)"
    ],
    practiceProblems: [
      {
        question: "A stock pays $3 dividend, growing 4% annually. Required return is 9%. What is the intrinsic value?",
        answer: "D₁ = $3 × 1.04 = $3.12. P₀ = $3.12 / (0.09 - 0.04) = $3.12 / 0.05 = $62.40"
      },
      {
        question: "A stock trades at $80 with EPS of $4. The industry P/E is 25. Is the stock over or undervalued relative to peers?",
        answer: "Stock P/E = $80 / $4 = 20. Industry P/E = 25. Stock is undervalued relative to peers (lower P/E)."
      },
      {
        question: "How does a 3-for-1 stock split affect an investor with 100 shares at $90?",
        answer: "After split: 300 shares at $30 each. Total value unchanged at $9,000."
      }
    ],
    relatedLessons: ["CFP-INV-L005", "CFP-INV-L007", "CFP-TAX-L003"]
  },

  {
    id: "CFP-INV-L007",
    domain: "CFP-INV",
    blueprintArea: "INV-2",
    title: "Investment Companies: Mutual Funds and ETFs",
    order: 7,
    duration: 50,
    objectives: [
      "Compare mutual fund structures and share classes",
      "Distinguish open-end funds from closed-end funds and ETFs",
      "Evaluate funds using expense ratios and turnover",
      "Apply tax-efficiency considerations to fund selection"
    ],
    content: `
# Investment Companies: Mutual Funds and ETFs

Investment companies pool investor money for professional management and diversification.

---

## Types of Investment Companies

### Open-End Funds (Mutual Funds)

| Feature | Description |
|---------|-------------|
| Pricing | NAV calculated daily |
| Shares | Created/redeemed at NAV |
| Trading | Through fund company |
| Liquidity | Guaranteed at NAV |

### Closed-End Funds

| Feature | Description |
|---------|-------------|
| Pricing | Market price (may differ from NAV) |
| Shares | Fixed number; trade on exchange |
| Trading | Like stocks (throughout day) |
| Premium/Discount | Can trade above or below NAV |

### ETFs (Exchange-Traded Funds)

| Feature | Description |
|---------|-------------|
| Pricing | Intraday market price |
| Shares | Trade on exchange |
| Creation/Redemption | Authorized participants (in-kind) |
| Tax efficiency | Generally more tax-efficient |

---

## Net Asset Value (NAV)

$$\\text{NAV} = \\frac{\\text{Total Assets} - \\text{Liabilities}}{\\text{Shares Outstanding}}$$

### When Calculated

| Fund Type | NAV Timing |
|-----------|------------|
| Mutual fund | 4:00 PM ET daily |
| ETF | Continuous (trades at market) |
| Closed-end | Reference; may not match price |

---

## Mutual Fund Share Classes

| Class | Sales Charge | 12b-1 Fee | Best For |
|-------|--------------|-----------|----------|
| **A shares** | Front-end (3-5%) | Low (0.25%) | Large, long-term investments |
| **B shares** | Back-end (CDSC) | High (1%) | Phased out (now rare) |
| **C shares** | Level load (1%) | High (1%) | Short-term (1-3 years) |
| **Institutional** | None | None/Low | Large institutional investors |
| **No-load** | None | Max 0.25% | Direct investors |

### Breakpoints (A Shares)

Volume discounts on front-end loads:
- Larger purchases = lower sales charge
- Rights of accumulation: Include existing holdings
- Letter of intent: Commit to future purchases

---

## Expense Ratio

Annual operating expenses as % of assets.

$$\\text{Expense Ratio} = \\frac{\\text{Total Annual Expenses}}{\\text{Average Net Assets}}$$

| Type | Typical Expense Ratio |
|------|----------------------|
| Index fund | 0.03-0.20% |
| Active equity | 0.50-1.50% |
| Active bond | 0.30-0.80% |

### Impact of Expenses

| Initial Investment | Expense Ratio | Value After 30 Years (7% gross) |
|-------------------|---------------|--------------------------------|
| $100,000 | 0.10% | $738,000 |
| $100,000 | 1.00% | $574,000 |
| **Difference** | | **$164,000** |

---

## Portfolio Turnover

Percentage of holdings traded annually.

| Turnover | Style | Tax Impact |
|----------|-------|------------|
| Low (<20%) | Buy and hold | More tax-efficient |
| Medium (20-100%) | Active | Moderate distributions |
| High (>100%) | Very active | More taxable distributions |

---

## ETFs vs. Mutual Funds

### Similarities

- Professional management
- Diversification
- Variety of strategies

### Key Differences

| Feature | Mutual Fund | ETF |
|---------|-------------|-----|
| **Trading** | End of day at NAV | Intraday at market price |
| **Minimum investment** | Often $1,000+ | Price of one share |
| **Tax efficiency** | Lower (cash redemptions) | Higher (in-kind redemptions) |
| **Costs** | Expense ratio + loads | Expense ratio + commissions |
| **Transparency** | Disclose quarterly | Most disclose daily |

### ETF Tax Efficiency

Why ETFs are more tax-efficient:
1. **In-kind creation/redemption**: No selling = no capital gains
2. **Authorized participants** handle exchanges
3. **Lower turnover** in index-tracking ETFs

---

## Types of Funds by Strategy

### By Asset Class

| Type | Focus |
|------|-------|
| Equity | Stocks |
| Fixed income | Bonds |
| Money market | Short-term instruments |
| Balanced/Hybrid | Mix of stocks and bonds |

### By Style

| Type | Description |
|------|-------------|
| Growth | Companies with high growth |
| Value | Undervalued companies |
| Blend | Mix of growth and value |

### By Objective

| Type | Goal |
|------|------|
| Index | Match benchmark |
| Active | Beat benchmark |
| Target-date | Adjust allocation by date |
| Sector | Focus on one industry |

---

## Evaluating Funds

### Key Metrics

| Metric | What It Measures |
|--------|------------------|
| **Expense ratio** | Annual cost |
| **Turnover** | Trading activity |
| **Alpha** | Risk-adjusted outperformance |
| **Sharpe ratio** | Return per unit of total risk |
| **R-squared** | How closely tracks benchmark |
| **Standard deviation** | Volatility |

---

## Key Takeaways

1. **Open-end** = NAV at 4 PM; **Closed-end** = exchange-traded, premium/discount
2. **ETFs** trade intraday, generally more tax-efficient than mutual funds
3. **A shares**: Front load, best for large/long-term; **C shares**: level load, short-term
4. **Expense ratios** compound significantly over time—lower is usually better
5. **High turnover** = more taxable distributions
    `,
    keyTakeaways: [
      "Open-end (mutual fund): NAV daily; Closed-end: trades at premium/discount",
      "ETFs: Intraday trading, more tax-efficient (in-kind redemptions)",
      "A shares: Front load, long-term; C shares: Level load, short-term",
      "Expense ratios compound—0.10% vs 1.00% can mean $164K difference over 30 years",
      "Higher turnover = more taxable capital gain distributions"
    ],
    keyFormulas: [
      "NAV = (Total Assets - Liabilities) / Shares Outstanding",
      "Expense Ratio = Annual Expenses / Average Net Assets"
    ],
    mnemonics: [
      "A shares = A lot of money upfront (front load)",
      "ETF = Efficient Tax Features"
    ],
    practiceProblems: [
      {
        question: "A fund has $500 million in assets, $5 million in liabilities, and 20 million shares. What is the NAV?",
        answer: "NAV = ($500M - $5M) / 20M = $495M / 20M = $24.75 per share"
      },
      {
        question: "An investor plans to invest $50,000 for 10 years. Should they choose A shares (5% front load, 0.25% annual) or C shares (1% annual level load)?",
        answer: "A shares: 5% × $50K = $2,500 upfront cost + 10 years × 0.25% annual cost. C shares: 10 years × 1% annual = 10% total load equivalent. For 10+ years, A shares are typically better."
      },
      {
        question: "Why are ETFs generally more tax-efficient than mutual funds?",
        answer: "ETFs use in-kind redemptions—authorized participants exchange baskets of securities rather than cash. This avoids selling shares and triggering capital gains that would be distributed to shareholders."
      }
    ],
    relatedLessons: ["CFP-INV-L005", "CFP-INV-L006", "CFP-INV-L008"]
  },

  {
    id: "CFP-INV-L008",
    domain: "CFP-INV",
    blueprintArea: "INV-2",
    title: "Alternative Investments and Derivatives",
    order: 8,
    duration: 50,
    objectives: [
      "Describe characteristics of alternative investments",
      "Explain option basics: calls, puts, and strategies",
      "Evaluate REITs and their tax treatment",
      "Assess suitability of alternatives for client portfolios"
    ],
    content: `
# Alternative Investments and Derivatives

Alternatives can enhance diversification and returns but require understanding their unique risks.

---

## What Are Alternative Investments?

### Characteristics

| Feature | Description |
|---------|-------------|
| **Liquidity** | Often limited |
| **Correlation** | Lower to traditional assets |
| **Transparency** | Less regulated |
| **Complexity** | Often harder to value |
| **Fees** | Generally higher |

### Common Types

- Real estate (REITs, direct)
- Commodities
- Hedge funds
- Private equity
- Collectibles
- Cryptocurrencies

---

## Real Estate Investment Trusts (REITs)

### Structure

| Requirement | Detail |
|-------------|--------|
| Income distribution | 90%+ of taxable income |
| Asset composition | 75%+ in real estate |
| Income sources | 75%+ from real estate |
| Shares | Widely held (100+ shareholders) |

### Types of REITs

| Type | Invests In |
|------|-----------|
| **Equity REITs** | Properties (offices, apartments, retail) |
| **Mortgage REITs** | Real estate loans |
| **Hybrid REITs** | Both properties and mortgages |

### Tax Treatment

| Distribution Type | Tax to Shareholder |
|-------------------|-------------------|
| Ordinary income | Ordinary rates (may get 20% QBI deduction) |
| Capital gains | Capital gains rates |
| Return of capital | Reduces basis (tax-deferred) |

---

## Commodities

### Investment Methods

| Method | Description |
|--------|-------------|
| **Physical** | Actual commodity (gold bars) |
| **Futures** | Contracts for future delivery |
| **ETFs** | Funds tracking commodity prices |
| **Stocks** | Companies in commodity industries |

### Common Commodities

- Precious metals (gold, silver)
- Energy (oil, natural gas)
- Agriculture (corn, wheat)
- Industrial metals (copper)

### Characteristics

| Feature | Commodity |
|---------|-----------|
| Income | None (no dividends/interest) |
| Storage costs | For physical |
| Inflation hedge | Often yes |
| Correlation | Low to stocks/bonds |

---

## Options Basics

### Call Options

**Right to BUY** at strike price.

| Position | Outlook | Max Gain | Max Loss |
|----------|---------|----------|----------|
| **Buy call** | Bullish | Unlimited | Premium paid |
| **Sell call** | Neutral/Bearish | Premium received | Unlimited |

### Put Options

**Right to SELL** at strike price.

| Position | Outlook | Max Gain | Max Loss |
|----------|---------|----------|----------|
| **Buy put** | Bearish | Strike - premium | Premium paid |
| **Sell put** | Bullish | Premium received | Strike - premium |

---

## Option Value Components

### Intrinsic Value

| Call | Put |
|------|-----|
| Stock Price - Strike (if positive) | Strike - Stock Price (if positive) |

### Time Value

Premium above intrinsic value:

$$\\text{Time Value} = \\text{Premium} - \\text{Intrinsic Value}$$

### Option Status

| Status | Call | Put |
|--------|------|-----|
| **In-the-money** | Stock > Strike | Stock < Strike |
| **At-the-money** | Stock = Strike | Stock = Strike |
| **Out-of-the-money** | Stock < Strike | Stock > Strike |

---

## Common Option Strategies

### Covered Call

Own stock + sell call:
- Generate income from premium
- Limit upside (stock called away if above strike)
- Reduce downside slightly (premium offsets loss)

**Best for**: Income generation, willing to sell at strike

### Protective Put

Own stock + buy put:
- Insurance against price decline
- Keep unlimited upside
- Cost = premium paid

**Best for**: Protecting gains, worried about downside

### Collar

Own stock + sell call + buy put:
- Floor and ceiling on returns
- Reduced cost (call premium funds put)
- Limited upside and downside

**Best for**: Concentrated stock positions

---

## Hedge Funds

### Characteristics

| Feature | Description |
|---------|-------------|
| **Investors** | Accredited/qualified only |
| **Regulation** | Limited (private placement) |
| **Liquidity** | Often limited (lock-up periods) |
| **Fees** | "2 and 20" (2% management, 20% performance) |
| **Strategies** | Long/short, arbitrage, macro, etc. |

### Common Strategies

| Strategy | Description |
|----------|-------------|
| **Long/Short** | Long undervalued, short overvalued |
| **Market Neutral** | Equal long/short exposure |
| **Global Macro** | Bets on economic trends |
| **Event-Driven** | Mergers, bankruptcies, restructuring |
| **Distressed** | Troubled company securities |

---

## Private Equity

### Types

| Type | Description |
|------|-------------|
| **Venture capital** | Early-stage companies |
| **Leveraged buyout (LBO)** | Acquire using debt |
| **Growth equity** | Established but growing companies |
| **Mezzanine** | Subordinated debt/preferred |

### Characteristics

| Feature | Consideration |
|---------|---------------|
| Return potential | High (20%+) |
| Liquidity | 7-10 year lock-up typical |
| Minimums | $250K+ typically |
| J-curve | Negative returns early (fees, investments) |

---

## Key Takeaways

1. **Alternatives** offer diversification but are less liquid and more complex
2. **REITs** must distribute 90%+ income; may qualify for 20% QBI deduction
3. **Call** = right to buy; **Put** = right to sell
4. **Covered call** = own stock + sell call (income generation)
5. **Protective put** = own stock + buy put (insurance)
    `,
    keyTakeaways: [
      "Alternatives: Lower correlation, less liquid, higher fees, more complex",
      "REITs: 90%+ distribution required; dividends may get 20% QBI deduction",
      "Call = right to buy (bullish); Put = right to sell (bearish)",
      "Covered call: Own stock + sell call = income, limited upside",
      "Protective put: Own stock + buy put = insurance against decline"
    ],
    keyFormulas: [
      "Call Intrinsic Value = MAX(Stock - Strike, 0)",
      "Put Intrinsic Value = MAX(Strike - Stock, 0)",
      "Time Value = Premium - Intrinsic Value"
    ],
    mnemonics: [
      "CALL up, PUT down (call = buy/bullish, put = sell/bearish)",
      "Covered Call = Collect premium, Cap upside"
    ],
    practiceProblems: [
      {
        question: "A call option has strike $50, stock is at $55, premium is $8. What is intrinsic and time value?",
        answer: "Intrinsic = $55 - $50 = $5. Time value = $8 - $5 = $3. The option is in-the-money by $5."
      },
      {
        question: "An investor owns 100 shares at $60 and sells a call with $65 strike for $3 premium. What happens if stock goes to $70?",
        answer: "The call is exercised; investor sells at $65. Total received: $65 + $3 premium = $68 per share. Miss out on $70 - $68 = $2 of additional upside."
      },
      {
        question: "A REIT pays $4 per share in distributions. How is this typically taxed?",
        answer: "Most REIT distributions are ordinary income (taxed at ordinary rates). However, non-capital gain, non-qualified dividend portions may qualify for the 20% QBI deduction under Section 199A. Some may be return of capital (tax-deferred, reduces basis)."
      }
    ],
    relatedLessons: ["CFP-INV-L005", "CFP-INV-L006", "CFP-TAX-L003"]
  }
];

export default CFP_INV2_LESSONS;
