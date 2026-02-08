/**
 * CFP Domain 4: Investment Planning
 * Additional Investment Lessons
 * 
 * These lessons expand coverage of options strategies, international investing,
 * factor investing, and specialized investment topics.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_INV4_LESSONS: CFPLesson[] = [
  {
    id: "CFP-INV-L013",
    domain: "CFP-INV",
    blueprintArea: "INV-3",
    title: "Options Strategies for Client Portfolios",
    order: 13,
    duration: 55,
    objectives: [
      "Explain basic options terminology and concepts",
      "Analyze covered call and protective put strategies",
      "Evaluate when options strategies are appropriate for clients",
      "Calculate breakeven points and maximum gain/loss scenarios"
    ],
    content: `
# Options Strategies for Client Portfolios

Options can enhance returns, generate income, or provide downside protection. Understanding these strategies helps advisors serve sophisticated clients.

---

## Options Fundamentals Review

### Key Terms

| Term | Definition |
|------|------------|
| **Call Option** | Right (not obligation) to BUY at strike price |
| **Put Option** | Right (not obligation) to SELL at strike price |
| **Strike Price** | Price at which option can be exercised |
| **Premium** | Price paid for the option |
| **Expiration** | Date option expires |
| **In the Money** | Has intrinsic value if exercised now |
| **Out of the Money** | No intrinsic value currently |

### Option Buyer vs. Seller

| | Buyer (Long) | Seller (Short/Writer) |
|---|-------------|----------------------|
| **Pays/Receives** | Pays premium | Receives premium |
| **Rights/Obligations** | Has right | Has obligation |
| **Max Gain** | Unlimited (calls) or strike minus premium (puts) | Premium received |
| **Max Loss** | Premium paid | Potentially unlimited (naked calls) |

---

## Covered Call Strategy

### What It Is

Owning stock AND selling a call option against it.

### Mechanics

- **Own**: 100 shares of XYZ at $50
- **Sell**: 1 call with $55 strike, receive $2 premium
- **Result**: If stock stays below $55, keep premium ($200)
- **If called**: Sell shares at $55, keep premium → effective sale at $57

### Profit/Loss Diagram

\`\`\`
Profit
  |         _______________
  |        /
  | ______/
  |      Strike
  |-------|---------|------- Stock Price
         50       55
\`\`\`

### When to Use

✅ **Appropriate**:
- Neutral to slightly bullish outlook
- Client comfortable with limited upside
- Want income from existing position
- Reduce cost basis

❌ **Inappropriate**:
- Very bullish (giving up upside)
- High conviction on significant appreciation

### Breakeven and Max Values

| Metric | Calculation |
|--------|-------------|
| **Breakeven** | Stock purchase price - premium received |
| **Max Gain** | Strike price - purchase price + premium |
| **Max Loss** | Purchase price - premium (stock goes to $0) |

---

## Protective Put Strategy

### What It Is

Owning stock AND buying a put option for downside protection. Like buying insurance.

### Mechanics

- **Own**: 100 shares of XYZ at $50
- **Buy**: 1 put with $45 strike, pay $1.50 premium
- **Result**: Floor on losses at $45, minus premium cost

### Profit/Loss Diagram

\`\`\`
Profit
  |            /
  |           /
  |_________/
  |       Strike
  |---------|---------- Stock Price
           45
\`\`\`

### When to Use

✅ **Appropriate**:
- Want to protect gains
- Concerned about short-term downside
- Can't or won't sell stock (tax reasons, restrictions)

❌ **Inappropriate**:
- Long-term holding (cost of repeated puts adds up)
- No significant gains to protect
- Premium cost exceeds risk tolerance

### Cost Considerations

| Scenario | Annualized Put Cost |
|----------|---------------------|
| Deep out-of-the-money | Lower, but less protection |
| At-the-money | Higher, more protection |
| Longer duration | Higher total, lower per-month |

---

## Collar Strategy

### What It Is

Combines covered call + protective put. "Costless" hedge.

### Mechanics

- **Own**: 100 shares of XYZ at $50
- **Buy**: Put with $45 strike, pay $1.50
- **Sell**: Call with $55 strike, receive $1.50
- **Net cost**: $0 (premiums offset)

### Outcome

- Downside protected below $45
- Upside capped at $55
- No out-of-pocket cost

### When to Use

✅ **Appropriate**:
- Protecting concentrated position
- Pre-IPO or restricted stock
- Nearing liquidity event
- Want certainty within range

---

## Cash-Secured Put

### What It Is

Selling a put while holding cash to buy the stock if assigned.

### Mechanics

- **Sell**: Put with $45 strike, receive $2 premium
- **Hold**: $4,500 cash (or margin capacity)
- **If assigned**: Buy shares at $45 (effective cost: $43)
- **If not assigned**: Keep $200 premium

### When to Use

✅ **Appropriate**:
- Want to buy stock at lower price
- Willing to own the stock
- Looking for income while waiting

### Risk

If stock drops significantly (e.g., to $30), you're obligated to buy at $45 even though market is $30.

---

## Suitability Considerations

### Client Factors

| Factor | Consideration |
|--------|---------------|
| **Sophistication** | Options require understanding—not for novices |
| **Risk tolerance** | Writers can lose significantly |
| **Investment objective** | Income, growth, or protection? |
| **Tax situation** | Options have complex tax treatment |
| **Time commitment** | Positions need monitoring |

### When Options Are Generally Inappropriate

- Clients who don't understand the risks
- Low net worth relative to position size
- Need for liquidity
- Long-term buy-and-hold strategy (costs erode returns)

### Regulatory Requirements

- Options Agreement required before trading
- Special disclosures (OCC Options Disclosure Document)
- Suitability review for approval levels

---

## Key Takeaways

1. **Covered calls** generate income but cap upside
2. **Protective puts** provide insurance at a cost
3. **Collars** create floor and ceiling at low/no cost
4. **Cash-secured puts** let you get paid to wait for entry price
5. **Options require sophistication**—not appropriate for all clients

---

## Practice Questions

1. A client owns 500 shares of stock at $60 and sells 5 covered calls with a $65 strike, receiving $2 per share. What is their maximum gain?
   - A) $2 per share ($1,000 total)
   - B) $5 per share ($2,500 total)
   - C) $7 per share ($3,500 total)
   - D) Unlimited

   **Answer: C** - Max gain = (Strike - Purchase Price) + Premium = ($65 - $60) + $2 = $7/share = $3,500.

2. A protective put is MOST appropriate for a client who:
   - A) Wants to generate income from their portfolio
   - B) Has significant unrealized gains and is concerned about short-term downside
   - C) Believes the stock will appreciate significantly
   - D) Is seeking maximum upside participation

   **Answer: B** - Protective puts protect gains at a premium cost. They sacrifice some upside but provide a floor.
`,
    keyTerms: [
      { term: "Covered Call", definition: "Owning stock while selling a call option against it to generate income" },
      { term: "Protective Put", definition: "Buying a put option to protect an existing stock position from downside" },
      { term: "Collar", definition: "Combining covered call and protective put to create a range of outcomes" },
      { term: "Strike Price", definition: "The price at which an option can be exercised" }
    ],
    relatedQuestionIds: ["CFP-INV-B7-001", "CFP-INV-B7-002"]
  },
  {
    id: "CFP-INV-L014",
    domain: "CFP-INV",
    blueprintArea: "INV-2",
    title: "International and Emerging Market Investing",
    order: 14,
    duration: 50,
    objectives: [
      "Explain the benefits and risks of international diversification",
      "Distinguish between developed and emerging markets",
      "Analyze currency risk and hedging considerations",
      "Evaluate international investment vehicles"
    ],
    content: `
# International and Emerging Market Investing

Global diversification can enhance returns and reduce risk. Understanding international markets helps advisors build better portfolios.

---

## The Case for International Investing

### Diversification Benefits

| Benefit | Explanation |
|---------|-------------|
| **Reduced correlation** | Markets don't move in perfect sync |
| **Broader opportunity set** | ~50% of global market cap is outside U.S. |
| **Economic cycle diversification** | Different countries at different cycle stages |
| **Currency diversification** | Hedge against dollar weakness |

### Historical Evidence

- International diversification has historically reduced portfolio volatility
- Benefits vary by time period
- Correlations have increased during crises ("correlation goes to 1 when you need it least")

---

## Market Classifications

### MSCI Classification System

| Classification | Characteristics | Examples |
|----------------|-----------------|----------|
| **Developed** | High income, liquid markets, strong regulation | US, UK, Japan, Germany, Australia |
| **Emerging** | Middle income, developing markets, higher growth potential | China, Brazil, India, Mexico, Taiwan |
| **Frontier** | Smaller, less liquid, higher risk | Vietnam, Nigeria, Bangladesh |

### Key Indices

| Index | Coverage |
|-------|----------|
| **MSCI EAFE** | Developed markets excluding US and Canada |
| **MSCI Emerging Markets** | ~25 emerging market countries |
| **MSCI ACWI** | All Country World Index (developed + emerging) |
| **MSCI World** | Developed markets only (including US) |

---

## Risks of International Investing

### Currency Risk

| Scenario | Impact on US Investor |
|----------|----------------------|
| Foreign currency strengthens vs. USD | Returns enhanced |
| Foreign currency weakens vs. USD | Returns diminished |

**Example**: You invest in European stocks that return 10%. If the euro falls 5% vs. dollar, your return is only ~5% in dollar terms.

### Hedging Currency Risk

| Approach | Consideration |
|----------|---------------|
| **Unhedged** | Accept currency as part of diversification |
| **Fully hedged** | Eliminate currency impact (has cost) |
| **Partially hedged** | Middle ground |

> **Research insight**: Long-term investors often benefit from unhedged positions; short-term, hedging reduces volatility.

### Political and Regulatory Risk

- Government instability
- Nationalization of assets
- Capital controls
- Changing tax treaties

### Liquidity Risk

- Smaller markets may have wider bid-ask spreads
- Some positions harder to exit
- Trading hours differ

### Information Risk

- Accounting standards may differ
- Less regulatory oversight
- Language barriers
- Less analyst coverage

---

## Emerging Markets Deep Dive

### Opportunity

| Factor | Developed | Emerging |
|--------|-----------|----------|
| GDP Growth | 1-3% | 4-7% |
| Demographic dividend | Aging populations | Younger, growing workforces |
| Urbanization | Mature | Ongoing |
| Consumer growth | Slower | Faster |

### Risks Specific to EM

- Higher volatility (often 1.5-2x developed markets)
- Corporate governance concerns
- Currency volatility
- Geopolitical risk (tariffs, sanctions)

### Key EM Considerations

| Country | Economic Focus | Specific Risks |
|---------|---------------|----------------|
| **China** | Manufacturing, technology | Government intervention, trade tensions |
| **India** | Services, demographics | Infrastructure, bureaucracy |
| **Brazil** | Commodities, agriculture | Political instability, currency |
| **Taiwan** | Semiconductors | Geopolitical (China relations) |

---

## International Investment Vehicles

### Vehicle Comparison

| Vehicle | Advantages | Disadvantages |
|---------|------------|---------------|
| **Mutual funds** | Professional management, diversification | Fees, less tax efficient |
| **ETFs** | Tax efficient, low cost, tradeable | Bid-ask spreads, some are niche |
| **ADRs** | Trade in US dollars, US exchanges | Single-company risk, fees |
| **Direct foreign purchase** | Most control | Currency conversion, tax complexity |

### ADR Levels

| Level | Description |
|-------|-------------|
| **Sponsored I** | OTC, minimal SEC requirements |
| **Sponsored II** | Listed on US exchange, more disclosure |
| **Sponsored III** | Full SEC registration, can raise capital |
| **Unsponsored** | Created by depositary bank without company involvement |

---

## Portfolio Allocation Considerations

### How Much International?

| Approach | Allocation |
|----------|------------|
| **Market-cap weighted** | ~40-50% international |
| **Home bias moderate** | 20-30% international |
| **Risk-parity** | Varies by volatility |

### Common Allocations

- Most target-date funds: 30-40% international
- Research suggests: at least 20% for diversification benefit

### Implementation

| Strategy | Best For |
|----------|----------|
| **Broad index** | Core international exposure at low cost |
| **Regional funds** | Specific country/region views |
| **Active EM** | Potential for outperformance (debatable) |

---

## Key Takeaways

1. **International diversification** reduces portfolio risk over time
2. **Currency exposure** is a double-edged sword—adds risk and opportunity
3. **Emerging markets** offer higher growth but significantly higher volatility
4. **ETFs and mutual funds** are the most practical vehicles for most clients
5. **~20-40% international** is typical for well-diversified portfolios

---

## Practice Questions

1. A client is concerned that their international fund underperformed the local market index. The MOST likely explanation is:
   - A) The fund manager made poor stock selections
   - B) Currency depreciation against the US dollar reduced returns
   - C) International markets are always riskier
   - D) The fund had high fees

   **Answer: B** - Currency impact is the most common reason for divergence between local returns and US dollar returns.

2. Which investment vehicle provides the easiest access to a diversified emerging markets portfolio for a typical US investor?
   - A) Direct purchase of foreign stocks
   - B) An emerging markets ETF
   - C) ADRs of individual companies
   - D) Foreign currency accounts

   **Answer: B** - An EM ETF provides broad, diversified exposure with low cost and high liquidity.
`,
    keyTerms: [
      { term: "Currency Risk", definition: "Risk that exchange rate changes will reduce investment returns" },
      { term: "MSCI EAFE", definition: "Index of developed markets in Europe, Australasia, and Far East" },
      { term: "Emerging Markets", definition: "Countries with developing economies and financial markets, higher growth potential and risk" },
      { term: "ADR", definition: "American Depositary Receipt—foreign shares traded on US exchanges" }
    ],
    relatedQuestionIds: ["CFP-INV-B7-003", "CFP-INV-B7-004"]
  },
  {
    id: "CFP-INV-L015",
    domain: "CFP-INV",
    blueprintArea: "INV-2",
    title: "Real Assets: Real Estate and Commodities",
    order: 15,
    duration: 50,
    objectives: [
      "Explain the role of real assets in a diversified portfolio",
      "Compare direct and indirect real estate investments",
      "Analyze REIT structures and tax implications",
      "Evaluate commodity investment approaches"
    ],
    content: `
# Real Assets: Real Estate and Commodities

Real assets provide inflation protection and diversification benefits. This lesson covers how to incorporate them into client portfolios.

---

## What Are Real Assets?

### Definition

Tangible assets with intrinsic value based on physical properties:
- Real estate
- Commodities (gold, oil, agricultural products)
- Infrastructure
- Natural resources
- Collectibles

### Investment Rationale

| Benefit | Explanation |
|---------|-------------|
| **Inflation hedge** | Real assets often rise with inflation |
| **Diversification** | Low correlation to stocks and bonds |
| **Income potential** | Real estate, farmland, timberland |
| **Tangibility** | Physical backing provides floor value |

---

## Real Estate Investments

### Direct vs. Indirect Ownership

| Approach | Advantages | Disadvantages |
|----------|------------|---------------|
| **Direct (own property)** | Control, leverage, tax benefits | Illiquidity, management burden, concentration |
| **REITs** | Liquidity, diversification, no management | Market volatility, no direct control |
| **Private funds** | Professional management, diversification | Illiquidity, high minimums, fees |
| **Crowdfunding** | Lower minimums, access | Platform risk, illiquidity |

### Types of Real Estate Investments

| Category | Examples | Characteristics |
|----------|----------|-----------------|
| **Residential** | Single-family, multi-family | Tenant-focused, local markets |
| **Commercial** | Office, retail | Longer leases, economic sensitivity |
| **Industrial** | Warehouses, logistics | E-commerce growth driver |
| **Healthcare** | Senior housing, medical offices | Demographic tailwinds |
| **Data centers** | Cloud infrastructure | High growth, technology exposure |

---

## REITs (Real Estate Investment Trusts)

### Structure Requirements

To qualify as a REIT:
- Invest at least 75% of assets in real estate
- Derive at least 75% of income from real estate
- Distribute at least 90% of taxable income as dividends
- Have at least 100 shareholders
- No more than 50% owned by 5 or fewer individuals

### Tax Treatment

| REIT Level | Taxation |
|------------|----------|
| **REIT entity** | Pays no corporate tax on distributed income |
| **Investor dividends** | Ordinary income (not qualified dividends) |
| **20% QBI deduction** | REIT dividends eligible for Section 199A deduction |

### Types of REITs

| Type | Description |
|------|-------------|
| **Equity REITs** | Own and operate properties (most common) |
| **Mortgage REITs** | Invest in mortgages and mortgage-backed securities |
| **Hybrid REITs** | Combination of equity and mortgage |

### REIT Allocation Considerations

- Typical allocation: 5-15% of portfolio
- Provide income (higher yields than S&P 500)
- Different risk/return than direct ownership
- Correlate more with stocks in short term

---

## Commodities

### Types of Commodities

| Category | Examples |
|----------|----------|
| **Energy** | Crude oil, natural gas |
| **Precious metals** | Gold, silver, platinum |
| **Industrial metals** | Copper, aluminum |
| **Agriculture** | Corn, wheat, soybeans, cattle |

### Investment Approaches

| Method | Description | Considerations |
|--------|-------------|----------------|
| **Physical** | Own the actual commodity (gold bars) | Storage, insurance, no income |
| **Futures** | Contracts for future delivery | Contango/backwardation, roll costs |
| **ETFs** | Track commodity indices | Convenience, but may not track perfectly |
| **Commodity stocks** | Energy, mining companies | Company risk added to commodity exposure |
| **Mutual funds** | Active commodity strategies | Fees, manager risk |

### Contango and Backwardation

| Term | Definition | Impact on Returns |
|------|------------|-------------------|
| **Contango** | Futures price > spot price | Negative roll yield (most common) |
| **Backwardation** | Futures price < spot price | Positive roll yield |

> **Important**: Long-term commodity futures returns have been disappointing due to persistent contango. Physical exposure or equities may be better.

---

## Gold as Portfolio Insurance

### The Case for Gold

| Argument | Evidence |
|----------|----------|
| **Crisis hedge** | Tends to rise during market stress |
| **Currency hedge** | Protects against dollar weakness |
| **Inflation hedge** | Maintains purchasing power (historically) |
| **Uncorrelated** | Low correlation to stocks and bonds |

### Counter-Arguments

| Concern | Explanation |
|---------|-------------|
| **No income** | Gold produces no dividends or interest |
| **Storage costs** | Physical gold has holding costs |
| **Volatility** | Can be quite volatile |
| **Opportunity cost** | Cash in gold isn't earning returns elsewhere |

### How Much Gold?

- Typical allocation: 2-10% (if included at all)
- Often via ETF (GLD, IAU) or physical
- Can be tactical or strategic

---

## Portfolio Integration

### Real Asset Allocation Framework

| Risk Profile | Real Estate | Commodities | Total Real Assets |
|--------------|-------------|-------------|-------------------|
| Conservative | 5-10% | 0-5% | 5-10% |
| Moderate | 10-15% | 5-10% | 15-20% |
| Aggressive | 10-20% | 5-10% | 15-25% |

### Implementation Tips

1. Use REITs for liquid real estate exposure
2. Consider gold for crisis protection (small allocation)
3. Be cautious with commodity futures (roll costs erode returns)
4. Commodity producers (energy/mining stocks) offer alternative exposure
5. Real assets are most valuable in inflationary environments

---

## Key Takeaways

1. **Real assets** provide inflation protection and diversification
2. **REITs** are the most accessible way to add real estate to portfolios
3. **REIT dividends** are taxed as ordinary income (consider in IRA)
4. **Commodity futures** face headwinds from contango
5. **Gold** can serve as portfolio insurance in small allocations

---

## Practice Questions

1. A client wants real estate exposure but needs liquidity. The BEST recommendation is:
   - A) Purchase rental property
   - B) Invest in a public REIT or REIT ETF
   - C) Invest in a private real estate fund
   - D) Purchase a vacation property

   **Answer: B** - Public REITs trade on exchanges like stocks, providing daily liquidity.

2. The primary tax advantage of REIT structure is:
   - A) REIT dividends are tax-free to investors
   - B) REITs pay no entity-level tax if they distribute 90%+ of income
   - C) REIT gains are taxed at long-term capital gains rates
   - D) REITs can deduct depreciation indefinitely

   **Answer: B** - REITs avoid corporate tax by distributing taxable income, but investors pay ordinary income tax on dividends.
`,
    keyTerms: [
      { term: "REIT", definition: "Real Estate Investment Trust—company that owns income-producing real estate" },
      { term: "Contango", definition: "Futures price above spot price, creating negative roll yield" },
      { term: "Real Assets", definition: "Tangible assets like real estate and commodities with intrinsic value" },
      { term: "Section 199A", definition: "Tax provision allowing 20% deduction on qualified REIT dividends" }
    ],
    relatedQuestionIds: ["CFP-INV-B7-005", "CFP-INV-B7-006"]
  },
  {
    id: "CFP-INV-L016",
    domain: "CFP-INV",
    blueprintArea: "INV-1",
    title: "Factor Investing and Smart Beta",
    order: 16,
    duration: 45,
    objectives: [
      "Explain common equity factors and their historical premiums",
      "Distinguish between traditional indexing and factor-based investing",
      "Evaluate smart beta strategies for client portfolios",
      "Understand factor timing and cyclicality"
    ],
    content: `
# Factor Investing and Smart Beta

Factor investing targets specific characteristics that have historically driven returns. Understanding factors helps advisors position portfolios for long-term success.

---

## What Are Factors?

### Definition

Factors are characteristics of stocks (or other securities) that explain differences in returns across securities.

### The Evolution

| Era | Approach |
|-----|----------|
| **1960s** | CAPM: Market beta is the only factor |
| **1990s** | Fama-French: Add size and value factors |
| **2000s** | Carhart: Add momentum factor |
| **2010s** | Multi-factor explosion: profitability, investment, volatility |

---

## Major Equity Factors

### The "Big Five" (or Six) Factors

| Factor | Definition | Historical Premium |
|--------|------------|-------------------|
| **Market** | Stocks vs. risk-free rate | ~6-8% annually |
| **Size (Small)** | Small caps vs. large caps | ~2-3% annually |
| **Value** | Cheap vs. expensive stocks (P/B, P/E) | ~3-4% annually |
| **Momentum** | Recent winners vs. losers | ~4-5% annually |
| **Quality/Profitability** | Profitable vs. unprofitable firms | ~3-4% annually |
| **Low Volatility** | Low-vol stocks vs. high-vol | ~2-3% annually |

### Factor Definitions

| Factor | Typical Metrics |
|--------|-----------------|
| **Value** | Low P/B, P/E, P/CF; high dividend yield |
| **Size** | Market capitalization (smaller = more exposure) |
| **Momentum** | 12-1 month returns (recent performance) |
| **Quality** | ROE, earnings stability, low debt |
| **Low Volatility** | Standard deviation, beta |

> **Important**: Historical premiums are averages. Factors can underperform for years at a time.

---

## Smart Beta Strategies

### What Is Smart Beta?

Indexes that weight holdings based on factors rather than market cap.

| Approach | Weighting Method |
|----------|------------------|
| **Traditional index** | Market capitalization |
| **Equal weight** | Same weight to all stocks |
| **Value-weighted** | Weight by value metrics |
| **Momentum-weighted** | Weight by recent performance |
| **Multi-factor** | Combine multiple factors |

### Smart Beta vs. Active vs. Passive

| Feature | Passive Index | Smart Beta | Active |
|---------|---------------|------------|--------|
| Rules-based | Yes | Yes | No |
| Factor exposure | Market only | Targeted factors | Manager judgment |
| Fees | Lowest | Low-moderate | Highest |
| Turnover | Low | Moderate | Varies |

---

## Applying Factors in Practice

### Single-Factor vs. Multi-Factor

| Approach | Pros | Cons |
|----------|------|------|
| **Single-factor** | Pure exposure, easy to understand | High tracking error, factor timing risk |
| **Multi-factor** | Diversified factor exposure, smoother ride | Diluted premium, harder to evaluate |

### Implementation Vehicles

| Vehicle | Example |
|---------|---------|
| **ETFs** | iShares Value Factor ETF, Vanguard Value |
| **Mutual funds** | DFA Small Cap Value |
| **Separate accounts** | Custom factor tilts |

### Factor Cyclicality

| Factor | Tends to Perform Well | Tends to Underperform |
|--------|----------------------|----------------------|
| **Value** | Early recovery, rising rates | Late cycle, low rates |
| **Momentum** | Trending markets | Market reversals |
| **Small cap** | Early recovery | Late cycle, recessions |
| **Quality** | Uncertainty, late cycle | Strong risk-on rallies |
| **Low volatility** | Market downturns | Strong bull markets |

> **Warning**: Factor timing is extremely difficult. Most advisors should use factors strategically (long-term), not tactically.

---

## Evaluating Factor Strategies

### Questions to Ask

1. **Is the premium real?** (Backed by academic research across time/markets?)
2. **Is it persistent?** (Works in different periods?)
3. **Is it pervasive?** (Works across asset classes/geographies?)
4. **Is it investable?** (Can be captured after costs?)
5. **Is it intuitive?** (Makes economic sense?)

### Red Flags

- Factor discovered through data mining
- Premium disappears after publication
- High turnover erodes returns
- Fees consume the premium

---

## Practical Portfolio Applications

### Core-Satellite with Factors

- **Core**: Broad market index (60-70%)
- **Satellite**: Factor tilts (30-40%)
  - Value + momentum (diversifying factors)
  - Small cap value
  - Quality defensive

### Factor Tilts by Life Stage

| Client Profile | Factor Emphasis |
|----------------|-----------------|
| Young accumulating | Small cap, value (higher risk, higher expected return) |
| Near retirement | Quality, low volatility (preservation) |
| Retirement | Dividend, quality (income and stability) |

---

## Key Takeaways

1. **Factors explain** why some stocks outperform others over time
2. **Value, size, momentum, quality** are the most researched factors
3. **Factors are cyclical**—they don't outperform every year
4. **Multi-factor** approaches smooth the ride
5. **Costs matter**—factor premiums can be small; keep fees low

---

## Practice Questions

1. A factor strategy that buys stocks with strong recent price performance is targeting:
   - A) Value factor
   - B) Size factor
   - C) Momentum factor
   - D) Quality factor

   **Answer: C** - Momentum strategies buy recent winners and sell recent losers.

2. Which statement about factor investing is MOST accurate?
   - A) Value always outperforms growth
   - B) Factor premiums are guaranteed but small
   - C) Factors are cyclical and can underperform for extended periods
   - D) Smart beta eliminates all market risk

   **Answer: C** - Factor premiums are averages over long periods; any factor can underperform for years.
`,
    keyTerms: [
      { term: "Factor", definition: "Characteristic that explains return differences across securities" },
      { term: "Smart Beta", definition: "Index strategies that weight based on factors rather than market cap" },
      { term: "Value Premium", definition: "Historical tendency for cheap stocks to outperform expensive stocks" },
      { term: "Momentum", definition: "Factor based on recent price performance continuing" }
    ],
    relatedQuestionIds: ["CFP-INV-B7-007", "CFP-INV-B7-008"]
  },
  {
    id: "CFP-INV-L017",
    domain: "CFP-INV",
    blueprintArea: "INV-3",
    title: "ESG and Sustainable Investing",
    order: 17,
    duration: 45,
    objectives: [
      "Define ESG criteria and sustainable investing approaches",
      "Distinguish between exclusionary, inclusionary, and impact investing",
      "Evaluate ESG performance claims and greenwashing concerns",
      "Incorporate client values into investment recommendations"
    ],
    content: `
# ESG and Sustainable Investing

Environmental, Social, and Governance (ESG) investing integrates non-financial factors into investment decisions. Understanding ESG helps advisors serve values-aligned clients.

---

## What Is ESG?

### The Three Pillars

| Pillar | Factors Considered |
|--------|--------------------|
| **Environmental** | Carbon emissions, renewable energy, waste, water usage, deforestation |
| **Social** | Labor practices, diversity, community relations, supply chain, data privacy |
| **Governance** | Board composition, executive pay, shareholder rights, ethics, transparency |

### Why ESG Matters

| Stakeholder | Interest |
|-------------|----------|
| **Investors** | Risk management, values alignment, long-term performance |
| **Companies** | Access to capital, reputation, employee attraction |
| **Society** | Sustainable business practices, reduced externalities |

---

## Sustainable Investing Approaches

### Spectrum of Strategies

| Approach | Description | Example |
|----------|-------------|---------|
| **Exclusionary** | Screen out "sin stocks" | No tobacco, weapons, fossil fuels |
| **Best-in-class** | Own ESG leaders in each sector | Highest-rated energy company even if fossil fuel |
| **ESG integration** | Factor ESG into fundamental analysis | Material ESG risks affect valuation |
| **Thematic** | Focus on specific sustainability themes | Clean energy, water, gender diversity |
| **Impact investing** | Seek measurable social/environmental outcomes | Community development, microfinance |

### Integration vs. Exclusion

| Approach | Pros | Cons |
|----------|------|------|
| **Exclusion** | Clear values alignment, simple | Reduces diversification, may not drive change |
| **ESG integration** | Risk-focused, broader universe | May still own controversial companies |
| **Impact** | Measurable outcomes | Often illiquid, lower return expectations |

---

## ESG Performance Debate

### Arguments FOR ESG

| Claim | Evidence |
|-------|----------|
| Risk reduction | Companies with good ESG less prone to scandals, lawsuits |
| Long-term outperformance | Some studies show ESG leaders outperform |
| Downside protection | ESG funds may fall less in downturns |

### Arguments AGAINST ESG

| Concern | Evidence |
|---------|----------|
| Reduced diversification | Excluding sectors reduces opportunity |
| No consistent alpha | Mixed evidence on outperformance |
| Definition inconsistency | ESG ratings vary wildly between providers |
| Greenwashing | Funds may claim ESG without substance |

### What the Data Shows

- Short-term: Mixed results, highly dependent on period
- Long-term: Modest evidence of risk-adjusted benefit
- Trend: Increasing capital flows may support ESG valuations

> **Practical advice**: Don't promise ESG will outperform; position it as values alignment + risk management.

---

## ESG Data and Ratings

### Rating Providers

| Provider | Approach |
|----------|----------|
| **MSCI** | Proprietary research, letter grades (AAA-CCC) |
| **Sustainalytics** | Risk-based ratings (lower = better) |
| **Bloomberg** | Disclosure-based scores |
| **CDP** | Climate-focused assessments |

### The Ratings Disagreement Problem

| Comparison | Correlation |
|------------|-------------|
| Credit ratings (S&P vs. Moody's) | ~0.90 |
| ESG ratings (MSCI vs. Sustainalytics) | ~0.50 |

Companies rated highly by one provider may be middling by another. Different methodologies, different weightings.

### Due Diligence Questions

1. What is the fund's ESG methodology?
2. Which controversies trigger exclusion?
3. How are ratings determined?
4. Is the fund just marketing or substantively different?

---

## Greenwashing Concerns

### What Is Greenwashing?

Making misleading claims about environmental responsibility to attract ESG-conscious investors.

### Red Flags

| Warning Sign | Example |
|--------------|---------|
| Vague claims | "Sustainable" without definition |
| Token ESG | Minor tilt marketed as major commitment |
| Controversial holdings | "ESG fund" holding oil majors |
| No engagement | Passive ownership without using voting power |

### SEC Oversight

- Increased scrutiny of ESG fund names and claims
- Proposed rules requiring disclosure of ESG strategy
- Enforcement against misleading marketing

---

## Incorporating Client Values

### Discovery Questions

- "Are there industries you want to avoid owning?"
- "How important is it that your investments align with your values?"
- "Would you accept lower returns for better alignment?"
- "What causes or issues matter most to you?"

### Solutions by Priority

| Client Priority | Implementation |
|-----------------|----------------|
| **Strict avoidance** | Exclusionary screens, SMA |
| **Values + returns** | ESG-integrated funds, best-in-class |
| **Impact focus** | Community investment, impact funds |
| **Low-cost priority** | ESG index funds |

### Managing Expectations

- Explain trade-offs clearly
- Document values-based constraints
- Review holdings to confirm alignment
- Update as client values evolve

---

## Key Takeaways

1. **ESG** considers environmental, social, and governance factors
2. **Multiple approaches** from exclusion to impact investing
3. **Performance is debated**—position as risk management + values, not alpha source
4. **Ratings disagree**—do your own due diligence
5. **Avoid greenwashing**—ensure substance behind claims

---

## Practice Questions

1. A client wants to invest only in companies addressing climate change. The MOST appropriate strategy is:
   - A) Exclusionary screening
   - B) Best-in-class ESG
   - C) Thematic investing (clean energy/climate focus)
   - D) Broad market indexing

   **Answer: C** - Thematic investing targets specific sustainability themes like climate solutions.

2. The PRIMARY concern with ESG ratings is:
   - A) They are all essentially the same
   - B) They only measure environmental factors
   - C) Different providers produce significantly different ratings for the same company
   - D) They are updated too frequently

   **Answer: C** - ESG ratings have low correlation across providers due to different methodologies.
`,
    keyTerms: [
      { term: "ESG", definition: "Environmental, Social, and Governance factors in investment analysis" },
      { term: "Impact Investing", definition: "Investing with intention to generate measurable social/environmental outcomes" },
      { term: "Greenwashing", definition: "Misleading claims about environmental responsibility" },
      { term: "Exclusionary Screening", definition: "Removing companies or sectors based on specific criteria" }
    ],
    relatedQuestionIds: ["CFP-INV-B7-009", "CFP-INV-B7-010"]
  },
  {
    id: "CFP-INV-L018",
    domain: "CFP-INV",
    blueprintArea: "INV-3",
    title: "Behavioral Investing and Client Psychology",
    order: 18,
    duration: 45,
    objectives: [
      "Apply behavioral finance insights to prevent common investor mistakes",
      "Design portfolios that clients can stick with through volatility",
      "Recognize emotional decision-making and appropriate interventions",
      "Build investment processes that counter behavioral biases"
    ],
    content: `
# Behavioral Investing and Client Psychology

Understanding how psychology affects investment decisions helps advisors build portfolios clients can maintain and avoid costly mistakes.

---

## The Behavior Gap

### What Is It?

The difference between investment returns and investor returns due to poor timing decisions.

| Measure | Historical Average (Equity Funds) |
|---------|----------------------------------|
| Fund return | ~10% |
| Investor return | ~6-7% |
| **Behavior gap** | **~3-4% annually** |

### Why Does It Happen?

- Buying after gains (chasing performance)
- Selling after losses (panic)
- Switching funds at wrong times
- Timing entry and exit poorly

> **Key insight**: The advisor's primary job is often helping clients avoid destroying returns through behavioral mistakes.

---

## Common Behavioral Mistakes in Investing

### Loss Aversion

| Bias | Impact |
|------|--------|
| **Definition** | Losses hurt ~2x more than gains feel good |
| **Result** | Sell winners early, hold losers too long; avoid risk even when appropriate |

**Intervention**: Frame discussions in terms of goals, not gains/losses. Use time-weighted returns over short-term marks.

### Recency Bias

| Bias | Impact |
|------|--------|
| **Definition** | Overweight recent experience |
| **Result** | Project recent returns forward; fear after crashes, greed after rallies |

**Intervention**: Show long-term historical patterns. "Where were we 5 years ago?"

### Anchoring

| Bias | Impact |
|------|--------|
| **Definition** | Over-rely on first piece of information |
| **Result** | "I won't sell until it gets back to $X" (original price) |

**Intervention**: Focus on forward-looking prospects, not purchase price.

### Herding

| Bias | Impact |
|------|--------|
| **Definition** | Follow the crowd |
| **Result** | Buy at tops (everyone's buying), sell at bottoms (everyone's selling) |

**Intervention**: Establish investment policy in calm times. Refer to it in chaos.

### Overconfidence

| Bias | Impact |
|------|--------|
| **Definition** | Overestimate skill, underestimate risk |
| **Result** | Excessive trading, concentrated positions, leverage |

**Intervention**: Track prediction accuracy. Compare to benchmarks.

---

## Building Behaviorally-Robust Portfolios

### Design Principles

| Principle | Application |
|-----------|-------------|
| **Simplicity** | Fewer holdings to track = less temptation to tinker |
| **Broad diversification** | Reduces regret from missing "winners" |
| **Appropriate risk** | If client will panic at 30% drawdown, reduce equity |
| **Automatic rebalancing** | Removes emotional decision from process |
| **Cash buffer** | Emergency fund prevents forced selling |

### The "Sleeping Point" Test

Ask: "What allocation would let you sleep through a 40% market drop without calling me?"

If the answer is 50% stocks, don't put them in 80%.

### Buckets for Behavioral Comfort

| Bucket | Purpose | Investments |
|--------|---------|-------------|
| **Short-term (0-2 years)** | Stability | Cash, short-term bonds |
| **Medium-term (3-7 years)** | Moderate growth | Balanced funds, bonds |
| **Long-term (7+ years)** | Growth | Equities |

Clients can see that near-term needs are safe, reducing panic about long-term volatility.

---

## Interventions During Volatility

### Pre-Commitment

During calm markets, discuss:
- "What will you do when markets drop 20%?"
- "Let's write down our agreed strategy for downturns"
- "Here's the playbook for the next crash"

### During Crisis

| Don't | Do |
|-------|------|
| "Don't worry about it" | "I understand this is stressful" |
| "Markets always recover" | "Let's look at your specific plan" |
| Ignore the client | Proactive outreach—don't wait for their panicked call |
| Discuss abstract markets | Focus on their specific goals |

### The Power of Stories

"Remember 2008? Clients who stayed invested saw their portfolios fully recover. Those who sold locked in losses."

---

## Process Over Prediction

### Investment Policy Statement

- Document risk tolerance, goals, and strategy
- Reference it during emotional moments
- Makes decisions systematic, not reactive

### Scheduled Rebalancing

- Removes "should I do something?" question
- Forces buy-low, sell-high behavior
- Pick a schedule and stick to it (annual, semi-annual)

### Automatic Contributions

- Dollar-cost averaging removes timing decision
- Automaticity eliminates procrastination
- "Set it and forget it" prevents overthinking

---

## Key Takeaways

1. **The behavior gap** costs investors 3-4% annually on average
2. **Loss aversion, recency, anchoring, herding** are the biggest risks
3. **Build portfolios for behavioral reality**, not theoretical maximization
4. **Pre-commitment** during calm times prepares clients for storms
5. **Process beats prediction**—systematic approaches protect against emotion

---

## Practice Questions

1. A client panics during a market correction and wants to sell everything. The BEST initial response is to:
   - A) Explain that markets always recover
   - B) Acknowledge their concern and review their personal financial plan together
   - C) Recommend they wait 30 days before making changes
   - D) Show them historical market charts

   **Answer: B** - Start with empathy, then ground the conversation in their specific situation—not abstract market arguments.

2. The "behavior gap" in investing refers to:
   - A) The difference between expected and actual fund expenses
   - B) The gap between fund returns and investor returns due to poor timing
   - C) The tracking error of index funds
   - D) The difference between nominal and real returns

   **Answer: B** - Investors consistently earn less than the funds they own due to behavioral mistakes.
`,
    keyTerms: [
      { term: "Behavior Gap", definition: "Difference between investment returns and investor returns due to poor timing" },
      { term: "Loss Aversion", definition: "Tendency to feel losses more intensely than equivalent gains" },
      { term: "Recency Bias", definition: "Overweighting recent experience when making predictions" },
      { term: "Pre-Commitment", definition: "Agreeing to a course of action before facing emotional decisions" }
    ],
    relatedQuestionIds: ["CFP-INV-B7-011", "CFP-INV-B7-012"]
  }
];
