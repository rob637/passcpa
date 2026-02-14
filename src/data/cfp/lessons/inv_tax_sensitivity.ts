/**
 * CFP Domain 4: Investment Planning
 * Blueprint Area INV-4: Tax Sensitivity in Investments
 *
 * Covers asset location strategies, tax-efficient fund placement,
 * municipal bonds vs. taxable bonds, capital gains management,
 * and wash sale rules.
 */

import type { Lesson } from '../../../types';

export const CFP_INV_TAX_SENSITIVITY_LESSONS: Lesson[] = [
  {
    id: "CFP-INV-L019",
    section: 'CFP-INV',
    blueprintArea: "INV-4",
    title: "Asset Location Strategies",
    order: 19,
    duration: 45,
    description: 'Differentiate asset location from asset allocation. Apply tax-efficient placement of investments across account types',
    difficulty: 'medium' as const,
    courseId: 'cfp',
    topics: [
      'Differentiate asset location from asset allocation',
      'Identify tax characteristics of different account types',
      'Apply tax-efficient placement of investments across account types',
      'Analyze the impact of asset location on after-tax returns',
    ],
    content: { sections: [], markdown: `
# Asset Location Strategies

Asset location — deciding **which** investments go in **which** account types — is one of the most impactful yet underappreciated tools for improving after-tax returns.

---

## Asset Location vs. Asset Allocation

| Concept | Definition | Focus |
|---------|-----------|-------|
| **Asset Allocation** | What mix of asset classes to hold (stocks, bonds, alternatives) | Risk/return profile |
| **Asset Location** | Which account type to place each asset class in | Tax efficiency |

> **Key Insight:** Two portfolios with identical asset allocations can produce meaningfully different after-tax returns depending on asset location.

---

## Account Type Tax Characteristics

### Tax-Deferred Accounts (Traditional IRA, 401(k))

- **Contributions:** Pre-tax (deductible)
- **Growth:** Tax-deferred — no annual tax on dividends, interest, or capital gains
- **Distributions:** Taxed as ordinary income
- **Best for:** Assets that generate ordinary income (bonds, REITs, actively managed funds)

### Tax-Free Accounts (Roth IRA, Roth 401(k))

- **Contributions:** After-tax (not deductible)
- **Growth:** Tax-free
- **Distributions:** Tax-free (if qualified)
- **Best for:** Highest-growth assets (small cap, emerging markets, aggressive growth)

### Taxable Accounts (Brokerage)

- **Contributions:** After-tax
- **Growth:** Taxed annually on dividends, interest, and realized gains
- **Distributions:** Subject to capital gains rates on appreciation
- **Best for:** Tax-efficient assets (index funds, ETFs, tax-managed funds, municipal bonds)

---

## The Asset Location Framework

### General Rules

| Asset Type | Best Account | Reason |
|-----------|-------------|--------|
| **Taxable bonds** | Tax-deferred | Interest taxed as ordinary income |
| **REITs** | Tax-deferred | Dividends mostly ordinary income, no LTCG benefit |
| **Actively managed funds** | Tax-deferred | Frequent trading → short-term gains |
| **High-growth stocks** | Roth | Max benefit from tax-free growth |
| **Small cap / Emerging markets** | Roth | Highest expected growth |
| **Index funds / ETFs** | Taxable | Low turnover, tax-efficient |
| **Municipal bonds** | Taxable | Already tax-exempt |
| **Tax-managed funds** | Taxable | Designed for tax efficiency |

### Priority Matrix

1. **Place tax-inefficient assets in tax-advantaged accounts first**
2. **Place highest-growth assets in Roth accounts**
3. **Place remaining tax-efficient assets in taxable accounts**

---

## Measuring the Impact

### After-Tax Return Comparison

**Example:** \$100,000 bond fund earning 5% annually, 32% marginal tax rate, 20-year horizon.

| Location | Annual Tax Drag | After 20 Years |
|----------|-----------------|---------------|
| Taxable account | 1.6%/year | ~\$180,611 after tax |
| Tax-deferred (Traditional IRA) | 0% during growth | ~\$198,789 after tax on withdrawal |
| Tax-free (Roth) | 0% ever | ~\$265,330 |

> Research suggests optimal asset location can add **0.25% to 0.75%** per year in after-tax returns — meaningful over decades.

---

## Practical Considerations

### When Asset Location Gets Complicated

- **Limited tax-advantaged space:** Most clients have more taxable assets than tax-advantaged — perfect location may not be achievable
- **Rebalancing constraints:** Harder to rebalance across account types without tax consequences
- **Withdrawal sequencing:** Location decisions should align with retirement withdrawal strategy
- **Client simplicity:** Some clients prefer identical allocations across accounts for ease of understanding

### Common Mistakes

1. Holding municipal bonds in retirement accounts (wastes tax-exempt status)
2. Holding REITs in taxable accounts (dividends taxed as ordinary income)
3. Ignoring asset location entirely (most common mistake)
4. Over-optimizing at the expense of simplicity

---

## Key Takeaways

- Asset location is the tax-aware complement to asset allocation
- Tax-inefficient assets (bonds, REITs) belong in tax-deferred accounts
- Highest-growth assets belong in Roth accounts
- Tax-efficient assets (index funds, munis) belong in taxable accounts
- The benefit compounds significantly over long time horizons
` },
  },
  {
    id: "CFP-INV-L020",
    section: 'CFP-INV',
    blueprintArea: "INV-4",
    title: "Tax-Efficient Fund Selection and Placement",
    order: 20,
    duration: 40,
    description: 'Compare tax efficiency across fund types. Evaluate ETF tax advantages over mutual funds',
    difficulty: 'medium' as const,
    courseId: 'cfp',
    topics: [
      'Compare tax efficiency across fund types',
      'Evaluate ETF tax advantages over mutual funds',
      'Explain the impact of portfolio turnover on tax efficiency',
      'Identify strategies for minimizing embedded capital gains',
    ],
    content: { sections: [], markdown: `
# Tax-Efficient Fund Selection and Placement

Not all investment funds are created equal when it comes to taxes. Understanding the tax characteristics of different fund structures helps advisors build more tax-efficient portfolios.

---

## Fund Tax Efficiency Spectrum

From **most** to **least** tax-efficient:

1. **Tax-managed index funds** — Actively harvest losses, minimize distributions
2. **Broad market ETFs** — In-kind creation/redemption eliminates most capital gains
3. **Traditional index mutual funds** — Low turnover but can have embedded gains
4. **Factor / Smart beta ETFs** — Moderate turnover for rebalancing
5. **Actively managed equity funds** — High turnover → frequent taxable distributions
6. **Bond funds** — Interest taxed as ordinary income
7. **REITs** — Dividends mostly non-qualified ordinary income

---

## Why ETFs Are More Tax-Efficient

### The In-Kind Creation/Redemption Mechanism

When investors sell mutual fund shares, the fund must sell underlying securities to raise cash → potential capital gains distributed to ALL shareholders.

ETFs avoid this through **authorized participant (AP)** transactions:

| Event | Mutual Fund | ETF |
|-------|------------|-----|
| Investor sells | Fund sells securities for cash | AP exchanges shares on secondary market |
| Capital gains created? | Yes — distributed to all holders | No — in-kind redemption avoids realization |
| Tax event for other holders? | Yes (year-end distribution) | No |

> **Result:** Many ETFs have gone years — even decades — without distributing a capital gain.

### Additional ETF Tax Advantages

- **Heartbeat trades:** APs can selectively redeem low-basis shares, purging embedded gains
- **Investor control:** You choose when to sell, controlling the timing of gain recognition
- **No surprise distributions:** Unlike mutual funds that distribute gains in December

---

## Portfolio Turnover and Tax Impact

### Turnover Rate

The percentage of a fund's holdings replaced annually.

| Turnover Rate | Tax Efficiency | Typical Fund Type |
|--------------|----------------|------------------|
| < 10% | Excellent | Index funds, buy-and-hold ETFs |
| 10–30% | Good | Enhanced index, low-turnover active |
| 30–70% | Moderate | Typical active equity funds |
| 70–100% | Poor | High-conviction active managers |
| > 100% | Very poor | Tactical, momentum strategies |

### Tax Cost Ratio

Morningstar's **tax cost ratio** measures the percentage of return surrendered to taxes annually.

- **Index funds:** ~0.3% tax cost ratio
- **Actively managed:** ~1.0–1.5% tax cost ratio
- **Difference:** 0.7–1.2% annually — compounding drag over time

---

## Embedded Capital Gains

### The Hidden Tax Trap

A fund with large unrealized gains poses a risk to new investors:

- **New investor buys in** → The fund already holds appreciated securities
- **Fund sells those securities** → Capital gains distributed to ALL current shareholders
- **New investor pays tax** on gains they never personally enjoyed

### How to Check

- **Capital gains overhang:** (Unrealized gains / Total assets) × 100
- A fund with 30% overhang could distribute up to 30% of NAV as gains
- Check fund prospectus or Morningstar for this data

### Avoiding the Trap

1. **Buy ETFs** — In-kind redemption mechanism avoids embedded gain buildup
2. **Check before buying** — Review capital gains overhang before year-end purchases
3. **Use new funds** — Newer funds have less embedded gain
4. **Harvest first** — If switching funds, harvest losses in the old fund before buying

---

## Tax-Managed Fund Strategies

Tax-managed funds actively pursue tax efficiency:

| Strategy | How It Works |
|----------|-------------|
| **Tax-loss harvesting** | Selling losing positions to offset gains |
| **Specific lot identification** | Selling highest-basis shares first |
| **Avoiding short-term gains** | Holding positions > 1 year before selling |
| **Minimizing distributions** | Retaining gains within the fund |
| **Dividend management** | Investing in low-dividend stocks |

### Popular Tax-Managed Options

- Vanguard Tax-Managed funds
- Dimensional Fund Advisors (DFA) tax-managed series
- Parametric custom indexing (direct indexing)

---

## Direct Indexing

The ultimate tax-efficient approach for high-net-worth clients:

- **Own individual stocks** that replicate an index (rather than a fund)
- **Harvest losses** at the individual security level — far more opportunities
- **Customize exclusions** (ESG screens, concentrated stock positions)
- **Typical minimums:** \$100,000–\$250,000
- **Tax alpha:** Can generate 1–2% additional after-tax return vs. index funds

---

## Key Takeaways

- ETFs are structurally more tax-efficient than mutual funds due to in-kind redemptions
- Portfolio turnover is a primary driver of tax drag
- Check for embedded capital gains before buying mutual funds, especially late in the year
- Tax-managed funds and direct indexing provide the greatest tax efficiency for taxable accounts
- Tax efficiency matters most in taxable accounts — less relevant in IRAs/401(k)s
` },
  },
  {
    id: "CFP-INV-L021",
    section: 'CFP-INV',
    blueprintArea: "INV-4",
    title: "Municipal Bonds vs. Taxable Bonds",
    order: 21,
    duration: 45,
    description: 'Calculate taxable equivalent yield for municipal bonds. Determine when municipal bonds are preferable to taxable bonds',
    difficulty: 'medium' as const,
    courseId: 'cfp',
    topics: [
      'Calculate taxable equivalent yield for municipal bonds',
      'Determine when municipal bonds are preferable to taxable bonds',
      'Explain AMT implications for private activity bonds',
      'Differentiate general obligation bonds from revenue bonds',
    ],
    content: { sections: [], markdown: `
# Municipal Bonds vs. Taxable Bonds

The choice between municipal and taxable bonds is one of the most common tax-sensitive investment decisions, and getting it right can significantly improve a client's after-tax income.

---

## Municipal Bond Tax Treatment

### Federal Tax Exemption

- Interest from municipal bonds is **exempt from federal income tax**
- This applies to bonds issued by states, cities, counties, and their agencies
- Capital gains on municipal bonds **are** taxable

### State Tax Exemption

- **In-state bonds:** Usually exempt from state AND federal income tax (triple tax-free if also exempt from local tax)
- **Out-of-state bonds:** Exempt from federal tax but usually subject to state income tax
- **Exceptions:** Some states (e.g., Utah, Indiana) tax all municipal bond interest

### Types of Municipal Bonds

| Type | Backing | Risk Level | Key Feature |
|------|---------|-----------|-------------|
| **General Obligation (GO)** | Full faith and credit of issuer | Lower | Backed by taxing authority |
| **Revenue Bonds** | Specific project revenue | Higher | Backed by tolls, fees, utility payments |
| **Private Activity Bonds** | Private enterprise use | Varies | May trigger AMT |
| **Build America Bonds** | Federal subsidy | Varies | Taxable munis with federal credit |

---

## Taxable Equivalent Yield (TEY)

### The Core Formula

$$TEY = \\frac{\\text{Municipal Yield}}{1 - \\text{Marginal Tax Rate}}$$

### Federal Only Example

- Municipal bond yield: 3.5%
- Marginal federal tax rate: 32%

$$TEY = \\frac{0.035}{1 - 0.32} = \\frac{0.035}{0.68} = 5.15\\%$$

> A taxable bond must yield **at least 5.15%** to match the 3.5% municipal bond for this investor.

### Combined Federal + State

$$TEY = \\frac{\\text{Municipal Yield}}{1 - (\\text{Federal Rate} + \\text{State Rate} \\times (1 - \\text{Federal Rate}))}$$

**Example:** 3.5% muni, 32% federal, 5% state:

$$TEY = \\frac{0.035}{1 - (0.32 + 0.05 \\times 0.68)} = \\frac{0.035}{1 - 0.354} = \\frac{0.035}{0.646} = 5.42\\%$$

---

## Decision Framework: When to Choose Munis

### Munis Are Usually Better When:

1. **Client is in high marginal tax bracket** (32%+)
2. **Client is in a high-income-tax state** (CA, NY, NJ, OR)
3. **Bonds are held in taxable accounts** (not IRAs)
4. **Client is subject to the 3.8% Net Investment Income Tax** (NIIT)
5. **Client values stable, predictable tax-free income**

### Taxable Bonds Are Usually Better When:

1. **Client is in a low tax bracket** (10–12%)
2. **Bonds are held in tax-advantaged accounts** (IRA, 401(k))
3. **Client is in a state with no income tax** (FL, TX, NV, WA, WY)
4. **Taxable bond yields are substantially higher** (wide spread)
5. **Client needs specific bond characteristics** (TIPS, corporates, high yield)

### Breakeven Tax Rate

The marginal rate at which muni and taxable bonds produce equal after-tax income:

$$\\text{Breakeven Rate} = 1 - \\frac{\\text{Municipal Yield}}{\\text{Taxable Yield}}$$

**Example:** Muni yielding 3.5%, Treasury yielding 5.0%:

$$\\text{Breakeven} = 1 - \\frac{3.5}{5.0} = 1 - 0.70 = 30\\%$$

> Investors with marginal rates **above 30%** should prefer the muni.

---

## AMT Implications

### Private Activity Bonds

- Interest from **private activity municipal bonds** is a preference item for the Alternative Minimum Tax (AMT)
- Examples: airport bonds, housing bonds, student loan bonds, industrial development bonds
- Clients subject to AMT should **avoid** or limit private activity bonds
- Check the bond's tax status before purchasing

### Post-TCJA AMT Landscape

- The Tax Cuts and Jobs Act (2017) raised AMT exemptions significantly
- Fewer taxpayers are subject to AMT (down from ~5 million to ~200,000)
- But high-income clients in high-tax states may still trigger AMT

---

## Credit Quality Considerations

### Municipal Bond Credit Tiers

| Rating | Examples | Typical Spread Over AAA |
|--------|---------|------------------------|
| AAA | Top-tier GO bonds, state-backed | Baseline |
| AA | Most GO bonds, well-backed revenue | +10–30 bps |
| A | Smaller issuers, solid revenue bonds | +30–60 bps |
| BBB | Investment-grade floor, some revenue bonds | +60–120 bps |
| Below BBB | High-yield munis, distressed issuers | +150–400 bps |

### Historical Default Rates

- Municipal bonds have **much lower** default rates than corporate bonds of equivalent rating
- 10-year cumulative default rate: ~0.10% (investment grade munis) vs. ~2.3% (investment grade corporates)

---

## Municipal Bond Strategies

| Strategy | Application |
|----------|------------|
| **Laddering** | Build a ladder of maturities for predictable cash flow |
| **Barbell** | Combine short and long maturities for yield and liquidity |
| **State-specific** | Focus on in-state bonds for triple tax-free income |
| **National diversified** | Broader diversification at the cost of state tax exemption |
| **High-yield munis** | Higher yields with elevated credit risk |

---

## Key Takeaways

- Calculate TEY to compare muni vs. taxable bonds — never compare nominal yields
- Higher marginal tax rates make munis more attractive
- In-state munis can provide triple tax-free income
- Never hold munis in tax-deferred accounts — wastes the tax exemption
- Watch for AMT risk with private activity bonds
- Municipal bonds have historically low default rates
` },
  },
  {
    id: "CFP-INV-L022",
    section: 'CFP-INV',
    blueprintArea: "INV-4",
    title: "Capital Gains Management Strategies",
    order: 22,
    duration: 50,
    description: 'Distinguish short-term from long-term capital gains treatment. Apply tax-loss harvesting strategies to offset gains',
    difficulty: 'medium' as const,
    courseId: 'cfp',
    topics: [
      'Distinguish short-term from long-term capital gains treatment',
      'Apply tax-loss harvesting strategies to offset gains',
      'Evaluate specific identification and lot selection methods',
      'Explain the net investment income tax (NIIT) and its impact',
    ],
    content: { sections: [], markdown: `
# Capital Gains Management Strategies

Effective capital gains management is essential for maximizing after-tax investment returns. This lesson covers the key strategies and rules every CFP professional needs to know.

---

## Capital Gains Tax Framework

### Short-Term vs. Long-Term

| Holding Period | Classification | Tax Rate |
|---------------|---------------|----------|
| ≤ 1 year | Short-term capital gain | Ordinary income rates (10–37%) |
| > 1 year | Long-term capital gain | Preferential rates (0%, 15%, or 20%) |

### 2024 Long-Term Capital Gains Rates

| Filing Status | 0% Rate | 15% Rate | 20% Rate |
|--------------|---------|----------|----------|
| Single | Up to \$47,025 | \$47,026–\$518,900 | Over \$518,900 |
| MFJ | Up to \$94,050 | \$94,051–\$583,750 | Over \$583,750 |

### Net Investment Income Tax (NIIT)

- **Additional 3.8%** on investment income for high earners
- **Threshold:** \$200,000 (single), \$250,000 (MFJ) of MAGI
- **Applies to:** Capital gains, dividends, interest, rental income, passive income
- **Effective top rate:** 20% + 3.8% = **23.8%** on long-term capital gains

---

## Tax-Loss Harvesting

### How It Works

1. **Identify** investments with unrealized losses
2. **Sell** the losing position to realize the loss
3. **Use the loss** to offset capital gains (and up to \$3,000 of ordinary income)
4. **Reinvest** proceeds in a similar (but not substantially identical) investment

### Loss Offset Rules

| Loss Type | Can Offset | Priority |
|-----------|-----------|----------|
| Short-term losses | Short-term gains first, then long-term gains | Most valuable — offsets higher-taxed income |
| Long-term losses | Long-term gains first, then short-term gains | Less valuable — offsets lower-taxed income |
| Net capital losses | Up to \$3,000 ordinary income per year | Excess carries forward indefinitely |

### Netting Process

1. **Net short-term gains against short-term losses**
2. **Net long-term gains against long-term losses**
3. **Net the results against each other**
4. **If net loss remains:** Deduct up to \$3,000 against ordinary income
5. **Any excess:** Carries forward to future years

---

## The Wash Sale Rule

### Definition

The IRS disallows a capital loss if you purchase a **substantially identical** security within **30 days before or after** the sale (61-day window).

### What Triggers a Wash Sale

- Buying the same stock within the 61-day window
- Buying a call option on the same stock
- Acquiring the stock in your IRA or spouse's account
- Buying through a contract or partnership

### What Does NOT Trigger a Wash Sale

- Buying a different stock in the same industry (e.g., sell Coca-Cola, buy PepsiCo)
- Buying a different index fund tracking a different index (e.g., sell S&P 500 fund, buy Total Market fund)
- Buying the same bond with a different maturity or coupon
- Waiting 31+ days to repurchase

### Consequences

- **Disallowed loss** is added to the basis of the replacement shares
- **Holding period** of the original shares carries over to the replacement shares
- The loss is **deferred**, not permanently lost

---

## Cost Basis and Lot Selection Methods

### Available Methods

| Method | How It Works | Best For |
|--------|-------------|----------|
| **FIFO (First In, First Out)** | Oldest shares sold first | Default method; simple |
| **Specific Identification** | You choose which lots to sell | Maximum tax control |
| **Average Cost** | Average basis of all shares | Mutual fund default; simplest math |
| **LIFO (Last In, First Out)** | Newest shares sold first | Rarely used; may trigger short-term gains |
| **Highest Cost** | Highest-basis shares sold first | Minimizes current gains |
| **Lowest Cost** | Lowest-basis shares sold first | Maximizes current gains (for tax-gain harvesting) |

### Specific Identification Strategy

**Most tax-efficient method for active management:**

1. **To minimize taxes:** Sell highest-basis lots (smallest gain or largest loss)
2. **To realize long-term gains:** Select lots held > 1 year (preferential rate)
3. **To harvest losses:** Select lots with losses, being mindful of wash sale rules
4. **Documentation:** Must identify specific lots with broker at time of sale

### Average Cost Rules

- Available only for mutual fund shares and securities in DRIPs
- Once elected, must use for all shares of that fund going forward (unless you revoke in writing)
- Calculates: Total cost basis ÷ Total shares = Average basis per share

---

## Tax-Gain Harvesting

### When It Makes Sense

- Client is in the **0% long-term capital gains bracket** (taxable income below threshold)
- Deliberately realize gains to **"reset" cost basis** at no tax cost
- Particularly valuable in **low-income years** (sabbatical, early retirement, gap year)

### Example

- Client MFJ with \$80,000 taxable income (below \$94,050 threshold)
- Has \$14,050 of room in the 0% bracket
- Sells stock with \$14,050 of long-term gain → **\$0 tax**
- Repurchases immediately (no wash sale rule for gains)
- New cost basis is \$14,050 higher → reduces future tax liability

---

## Advanced Strategies

### Charitable Giving of Appreciated Stock

- **Donate highly appreciated shares** (held > 1 year) directly to charity
- **Deduction** = fair market value of shares
- **Avoids** recognizing any capital gain
- **Most tax-efficient** way to make charitable gifts

### Opportunity Zone Investing

- Invest capital gains into a Qualified Opportunity Zone Fund
- **Deferral:** Original gain deferred until 2026 or sale
- **Exclusion:** If held 10+ years, gain on OZ investment is excluded
- **TCJA provision:** Original basis step-up benefits expired in 2021

### Installment Sales

- Spread recognition of gain over multiple tax years
- Useful for large, concentrated positions or real estate
- Cannot be used for publicly traded securities

---

## Key Takeaways

- Prefer long-term gains (> 1 year) for preferential tax rates
- Tax-loss harvest regularly, especially in volatile markets
- Respect the 31-day wash sale window — use similar but not identical replacements
- Use specific identification for maximum tax control over lot selection
- Consider tax-gain harvesting in low-income years (0% bracket)
- The 3.8% NIIT effectively raises the top capital gains rate to 23.8%
` },
  },
  {
    id: "CFP-INV-L023",
    section: 'CFP-INV',
    blueprintArea: "INV-4",
    title: "Wash Sale Rules and Tax-Efficient Rebalancing",
    order: 23,
    duration: 40,
    description: 'Apply wash sale rules in portfolio management scenarios. Implement tax-efficient rebalancing techniques',
    difficulty: 'hard' as const,
    courseId: 'cfp',
    topics: [
      'Apply wash sale rules in portfolio management scenarios',
      'Implement tax-efficient rebalancing techniques',
      'Evaluate the interaction between wash sales and retirement accounts',
      'Develop year-end tax planning strategies for investment portfolios',
    ],
    content: { sections: [], markdown: `
# Wash Sale Rules and Tax-Efficient Rebalancing

The wash sale rule is one of the most commonly tested topics on the CFP exam. This lesson provides deep coverage of the rule and practical strategies for tax-efficient portfolio management.

---

## The Wash Sale Rule — Deep Dive

### The 61-Day Window

\`\`\`
         30 days          SALE          30 days
    ◄──────────────►    DATE    ◄──────────────►
    No substantially    ████    No substantially
    identical purchase          identical purchase
\`\`\`

If you buy substantially identical securities during this window, the loss is **disallowed**.

### "Substantially Identical" — What Qualifies

| Substantially Identical? | Example | Wash Sale? |
|-------------------------|---------|-----------|
| Same exact security | Sell AAPL, buy AAPL | **Yes** |
| Same mutual fund | Sell Vanguard 500, buy Vanguard 500 | **Yes** |
| Convertible security | Sell XYZ stock, buy XYZ convertible bond | **Yes** |
| Option on same stock | Sell XYZ stock, buy XYZ call option | **Yes** |
| Same security in spouse's account | Sell in your account, buy in spouse's account | **Yes** |
| Same security in your IRA | Sell in brokerage, buy in your IRA | **Yes** (and loss permanently lost) |

### What IS Allowed (Not Substantially Identical)

| Action | Example | Wash Sale? |
|--------|---------|-----------|
| Different company, same industry | Sell Exxon, buy Chevron | **No** |
| Different index fund | Sell S&P 500 ETF, buy Total Stock Market ETF | **No** |
| Different bond, same issuer/type | Sell 5-year Treasury, buy 10-year Treasury | **No** |
| Same stock after 31+ days | Sell AAPL, wait 31 days, buy AAPL | **No** |
| Mutual fund vs. ETF (different index) | Sell S&P 500 mutual fund, buy Russell 1000 ETF | **No** |

### The IRA Trap

> **Critical:** If you sell a security at a loss in a taxable account and buy it within 30 days in an IRA (or Roth IRA), the loss is **permanently disallowed** — it does not get added to the IRA's basis.

This is the most punitive version of the wash sale rule and a frequent exam question.

---

## Basis and Holding Period Adjustments

### When a Wash Sale Occurs

1. **Disallowed loss** → Added to the cost basis of the replacement shares
2. **Holding period** → Carries over from original shares to replacement shares

### Example

| Event | Details |
|-------|---------|
| Original purchase | 100 shares at \$50 = \$5,000 basis |
| Sell at loss | 100 shares at \$40 = \$4,000 proceeds → \$1,000 loss |
| Buy within 30 days | 100 shares at \$42 = \$4,200 cost |
| Wash sale adjustment | Loss (\$1,000) added to new basis |
| **Adjusted basis** | **\$4,200 + \$1,000 = \$5,200** |

The \$1,000 loss is **deferred**, not lost permanently (except for IRA purchases). When you eventually sell the replacement shares (without triggering another wash sale), the higher basis will reduce your gain or increase your loss.

---

## Tax-Efficient Rebalancing

### The Challenge

Rebalancing requires selling winners and buying losers — but selling winners triggers capital gains.

### Tax-Efficient Rebalancing Strategies

#### 1. Use New Cash Flow

- Direct new contributions to underweight asset classes
- Redirect dividends and interest to underweight positions
- **Tax impact:** None — no sales required

#### 2. Rebalance in Tax-Advantaged Accounts First

- Perform most rebalancing within IRAs and 401(k)s
- No tax consequences regardless of gains
- **Tax impact:** None

#### 3. Tax-Loss Harvesting During Rebalancing

- When selling overweight positions, prioritize lots with losses
- Use losses to offset any necessary gain-producing sales
- **Tax impact:** Net neutral or tax benefit

#### 4. Charitable Giving Rebalance

- Donate appreciated overweight assets to charity
- No capital gains recognized
- Receive fair market value deduction
- Use cash to purchase underweight assets

#### 5. Threshold-Based Rebalancing

- Only rebalance when allocations drift beyond a set threshold (e.g., ±5%)
- Reduces frequency of taxable events
- Research shows comparable returns to calendar rebalancing

#### 6. Asset Location-Aware Rebalancing

- Hold tax-efficient assets in taxable accounts (easier to rebalance tax-free)
- Hold tax-inefficient assets in tax-advantaged accounts (free rebalancing)

---

## Year-End Tax Planning Checklist

### October–December Actions

| Action | Purpose |
|--------|---------|
| **Review realized gains YTD** | Know where you stand before year-end |
| **Harvest losses** to offset gains | Reduce tax liability |
| **Check mutual fund distribution estimates** | Avoid buying before large distributions |
| **Evaluate tax-gain harvesting** | If in 0% bracket, realize gains at no cost |
| **Review wash sale exposures** | Ensure 31-day window clears before year-end |
| **Consider Roth conversions** | If income is low, convert at lower rates |
| **Maximize retirement contributions** | 401(k) deadline is Dec 31; IRA is April 15 |
| **Charitable giving** | Donate appreciated stock before Dec 31 |
| **Check holding periods** | Avoid selling winners before they qualify as long-term |

### The December Mutual Fund Trap

- Mutual funds distribute capital gains in November/December
- **Buying just before** a distribution means you receive the distribution (taxable) and your NAV drops
- **Wait until after** the ex-distribution date to purchase
- This does not apply to ETFs (which rarely distribute gains)

---

## Practice Scenarios

### Scenario 1: Basic Wash Sale

Client sells 200 shares of Fund XYZ at a \$3,000 loss on November 15. On December 1, she buys 200 shares of Fund XYZ.

**Result:** Wash sale — \$3,000 loss disallowed. Added to new basis.

### Scenario 2: Partial Wash Sale

Client sells 200 shares of ABC at a \$3,000 loss. Within 30 days, buys only 100 shares of ABC.

**Result:** Partial wash sale — \$1,500 loss disallowed (proportional to 100 of 200 shares repurchased). \$1,500 loss is allowed.

### Scenario 3: IRA Purchase

Client sells stock in brokerage at a \$5,000 loss. Within 30 days, buys the same stock in her Roth IRA.

**Result:** \$5,000 loss **permanently disallowed** — does not adjust IRA basis.

---

## Key Takeaways

- The wash sale window is 61 days (30 before + sale date + 30 after)
- Substantially identical includes same security in spouse/IRA/Roth accounts
- The IRA wash sale trap causes permanent loss disallowance
- Disallowed losses are deferred (added to replacement share basis), not lost
- Use new cash flow and tax-advantaged accounts for most rebalancing
- Year-end tax planning should begin in October
- Avoid buying mutual funds right before capital gains distributions
` },
  },
];
