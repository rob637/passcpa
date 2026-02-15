/**
 * CFP Domain 5: Tax Planning
 * Additional Tax Lessons
 * 
 * These lessons expand coverage of charitable giving, estate/gift tax integration,
 * advanced investment taxation, and small business tax planning.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_TAX4_LESSONS: CFPLesson[] = [
  {
    id: "CFP-TAX-L013",
    domain: "CFP-TAX",
    blueprintArea: "TAX-3",
    title: "Charitable Giving Strategies",
    order: 13,
    duration: 55,
    objectives: [
      "Apply tax-efficient charitable giving strategies",
      "Compare donor-advised funds, private foundations, and direct giving",
      "Analyze charitable remainder and lead trusts",
      "Maximize charitable deductions within AGI limitations"
    ],
    content: `
# Charitable Giving Strategies

Strategic charitable giving maximizes both tax benefits and charitable impact. Understanding the options helps advisors create optimal giving plans.

---

## Charitable Giving Basics

### Tax Benefits

| Benefit | Description |
|---------|-------------|
| **Income tax deduction** | Itemized deduction (subject to AGI limits) |
| **Avoid capital gains** | Donate appreciated property at FMV, no gain recognition |
| **Estate tax deduction** | Unlimited charitable estate deduction |
| **Income exclusion** | QCDs from IRAs excluded from income for 70½+ |

### AGI Limitations on Charitable Deductions

| Donation Type | To Public Charity | To Private Foundation |
|---------------|-------------------|----------------------|
| **Cash** | 60% of AGI | 30% of AGI |
| **Long-term appreciated property** | 30% of AGI | 20% of AGI |
| **Short-term capital gain property** | 50% of AGI (basis only) | Basis only |

Unused deductions carry forward for 5 years.

---

## Gift of Appreciated Property

### The Power of the Strategy

| Scenario | Sell Then Give Cash | Give Property Directly |
|----------|--------------------|-----------------------|
| FMV of stock | $100,000 | $100,000 |
| Cost basis | $20,000 | $20,000 |
| Capital gains tax (20%+3.8%) | $19,040 | $0 |
| Available for charity | $80,960 | $100,000 |
| Additional tax benefit | None | Avoid $19,040 tax |

### Requirements

- Must be long-term capital gain property (held > 1 year)
- Deductible at fair market value
- 30% of AGI limit (not 60% like cash)
- Must be publicly traded or have qualified appraisal

### What to Give

✅ **Good candidates**:
- Highly appreciated stock
- Mutual fund shares with low basis
- Long-held real estate

❌ **Less ideal**:
- Property at basis (no advantage over cash)
- Depreciated property (take loss, give cash instead)
- Short-term holdings (deduction limited to basis)

---

## Donor-Advised Funds (DAFs)

### What They Are

Charitable giving account sponsored by a public charity where donors:
1. Contribute assets (immediate deduction)
2. Advise grants to qualified charities over time
3. Investments grow tax-free

### Advantages

| Benefit | Explanation |
|---------|-------------|
| **Immediate deduction** | Full FMV deduction in year of contribution |
| **Grant over time** | Recommend grants to charities when ready |
| **Administrative ease** | One receipt, no annual requirements |
| **Privacy** | Can give anonymously to charities |
| **Appreciated property** | Accept a wide range of assets |
| **Tax-free growth** | Assets grow until granted |

### Comparison to Private Foundation

| Factor | DAF | Private Foundation |
|--------|-----|-------------------|
| **Startup cost** | None | $10K+ legal fees |
| **Minimum contribution** | Often $5K-25K | Typically $250K+ |
| **Annual filing** | None | 990-PF required |
| **Payout requirement** | None | 5% annually |
| **Deduction limit** | 60%/30% of AGI | 30%/20% of AGI |
| **Control** | Advisory only | Full governance |
| **Excise taxes** | None | 1.39% on net investment income |

> **Best for**: Clients wanting simplicity, who don't need a family legacy structure.

---

## Charitable Remainder Trusts (CRTs)

### How They Work

1. Donor transfers assets to irrevocable trust
2. Trust pays income stream to donor (or beneficiary) for life or term
3. Remainder goes to charity
4. Partial income tax deduction at contribution

### Two Types

| Type | Annual Payment |
|------|---------------|
| **Charitable Remainder Annuity Trust (CRAT)** | Fixed dollar amount (at least 5% of initial value) |
| **Charitable Remainder Unitrust (CRUT)** | Fixed percentage of trust value (revalued annually) |

### Benefits

- Partial income tax deduction (PV of remainder)
- Avoid immediate capital gains on contributed assets
- Income stream for life or up to 20 years
- Asset goes to charity at termination

### CRT Example

| Item | Amount |
|------|--------|
| Contribution | $500,000 highly appreciated stock |
| Basis | $50,000 |
| CRT payout rate | 5% per year |
| Estimated life | 20 years |
| Present value of remainder | ~$185,000 |
| Income tax deduction | ~$185,000 |
| Capital gains avoided at contribution | ~$90,000 (20%+3.8% on $450,000) |

### Requirements

- Minimum 5% payout (maximum ~50%)
- Remainder must be at least 10% of initial contribution
- Irrevocable trust

---

## Charitable Lead Trusts (CLTs)

### How They Work

The opposite of CRTs:
1. Donor transfers assets to trust
2. Trust pays charity for a term
3. Remainder goes back to donor (or heirs)
4. Gift/estate tax savings (not income tax deduction)

### Types

| Type | Use |
|------|-----|
| **Grantor CLT** | Income tax deduction, taxed on trust income |
| **Non-Grantor CLT** | No income deduction, no tax on trust income |
| | Estate planning tool—remainder passes at reduced value |

### Primary Use

Estate/wealth transfer planning:
- Freeze value of assets passed to heirs
- Satisfy charitable intent during donor's life
- Reduce gift/estate tax on transferred assets

---

## Qualified Charitable Distributions (QCDs)

### What They Are

Direct transfers from IRA to charity (not DAF) for taxpayers 70½ or older.

### Benefits

| Benefit | Explanation |
|---------|-------------|
| **Excluded from income** | Up to $105,000 (2024, indexed) not counted as gross income |
| **Satisfies RMD** | Counts toward Required Minimum Distribution |
| **No itemization needed** | Benefits even standard deduction users |
| **Lower AGI** | Reduces Medicare premiums, SS taxation, etc. |

### Requirements

- Must be 70½ or older
- Direct transfer to qualified charity (not DAF)
- Regular IRA (not SEP or SIMPLE while contributions ongoing)
- No benefit received (quid pro quo)

### QCD vs. Regular Distribution + Donation

| Scenario | Regular Distribution | QCD |
|----------|---------------------|-----|
| Distribution | $10,000 income | $0 income |
| Donation | $10,000 deduction (if itemizing) | No deduction needed |
| Net effect (itemizer) | Wash | Same |
| Net effect (standard deduction) | $10,000 taxable, no deduction | $0 taxable |

> **Key insight**: QCDs are especially valuable for clients who don't itemize.

---

## Key Takeaways

1. **Donate appreciated property** to avoid capital gains and get FMV deduction
2. **Donor-advised funds** offer simplicity and flexibility for most clients
3. **CRTs** provide income stream with partial deduction and capital gains deferral
4. **CLTs** are estate planning tools that benefit charity during term
5. **QCDs** are powerful for IRA owners who don't itemize

---

## Practice Questions

1. A client holds $50,000 of stock with a $10,000 basis. To maximize charitable impact, they should:
   - A) Sell the stock, pay tax, and donate the proceeds
   - B) Donate the stock directly to charity
   - C) Donate cash and keep the stock
   - D) Wait until they can donate appreciated real estate

   **Answer: B** - Donating appreciated stock avoids $40,000 of capital gains while still deducting the full $50,000 FMV.

2. The PRIMARY advantage of a Qualified Charitable Distribution (QCD) for a client who takes the standard deduction is:
   - A) Higher deduction limit than regular donations
   - B) Distribution is excluded from income entirely, reducing AGI and taxes
   - C) The ability to give to donor-advised funds
   - D) It provides an estate tax deduction

   **Answer: B** - QCDs exclude the distribution from income, benefiting even those who don't itemize.
`,
    keyTerms: [
      { term: "Donor-Advised Fund", definition: "Charitable giving account with immediate deduction and flexible granting" },
      { term: "Charitable Remainder Trust", definition: "Trust paying income to donor with remainder to charity" },
      { term: "Charitable Lead Trust", definition: "Trust paying charity first with remainder to donor/heirs" },
      { term: "QCD", definition: "Qualified Charitable Distribution from IRA directly to charity" }
    ],
    relatedQuestionIds: ["CFP-TAX-B7-013", "CFP-TAX-B7-014"]
  },
  {
    id: "CFP-TAX-L014",
    domain: "CFP-TAX",
    blueprintArea: "TAX-3",
    title: "Estate and Gift Tax Integration",
    order: 14,
    duration: 50,
    objectives: [
      "Explain the unified transfer tax system",
      "Calculate gift tax implications and exemption usage",
      "Integrate income and transfer tax planning",
      "Apply basis step-up and carryover basis rules"
    ],
    content: `
# Estate and Gift Tax Integration

Income, gift, and estate taxes interact in complex ways. Understanding these connections enables integrated planning.

---

## The Unified Transfer Tax System

### How Gift and Estate Taxes Relate

| Component | Explanation |
|-----------|-------------|
| **Unified credit** | Single lifetime exemption for gifts + estate (~$7.0M in 2026 - TCJA sunset) |
| **Gift tax return** | Tracks taxable gifts reducing available exemption |
| **Estate tax return** | Uses remaining exemption after lifetime gifts |
| **Cumulative system** | Gifts reduce estate exemption dollar-for-dollar |

### Annual Exclusion vs. Lifetime Exemption

| Type | Amount (2026) | Impact |
|------|---------------|--------|
| **Annual exclusion** | $19,000/recipient | No exemption used, no return required |
| **Lifetime exemption** | ~$7.0 million | Gifts above annual exclusion reduce this |

### Gift Tax Return (Form 709)

Required when:
- Gifts to any one person exceed annual exclusion
- Gifts to non-citizen spouses exceed special limit ($190,000)
- Gift-splitting elected with spouse
- Gifts of future interests (no annual exclusion)

---

## Strategic Use of Lifetime Exemption

### Gift Now vs. Give at Death

| Consideration | Lifetime Gift | Bequest at Death |
|---------------|---------------|------------------|
| **Uses exemption** | Yes | Yes |
| **Appreciation after transfer** | Out of estate | In estate |
| **Basis** | Carryover (donor's basis) | Step-up to FMV |
| **Control** | Lost | Retained until death |

### When Gifting Makes Sense

✅ **Gift during life**:
- Asset has high growth potential
- Donor has excess exemption
- Asset has high basis (little step-up lost)
- Estate is clearly taxable

❌ **Wait to pass at death**:
- Asset has low basis (lose step-up)
- Estate won't be taxable
- Donor may need assets
- Asset is hard to value (discount planning)

---

## Basis: Step-Up vs. Carryover

### At Death: Step-Up in Basis

| Scenario | Basis |
|----------|-------|
| Decedent's basis | $100,000 |
| FMV at death | $500,000 |
| Heir's new basis | $500,000 (stepped up) |
| If heir sells at $500,000 | $0 gain |

### Lifetime Gift: Carryover Basis

| Scenario | Basis |
|----------|-------|
| Donor's basis | $100,000 |
| FMV at gift | $500,000 |
| Donee's basis | $100,000 (carryover) |
| If donee sells at $500,000 | $400,000 gain |

### The Strategic Calculation

Is gift tax savings > lost step-up benefit?

| Factor | Analysis |
|--------|----------|
| Estate tax rate | 40% |
| Capital gains rate | 23.8% (20% + 3.8% NIIT) |
| Built-in gain | $400,000 |
| Tax on gain if sold | $95,200 |
| Estate tax on $500,000 | $200,000 |
| Net savings from gifting | $104,800 |

> **Rule of thumb**: If estate is taxable, gift high-growth assets; if not taxable, hold for step-up.

---

## Income Tax Planning Around Transfers

### Grantor Trusts

| Characteristic | Advantage |
|----------------|-----------|
| Grantor pays income tax | Trust assets grow without tax reduction |
| Assets not included in estate (with proper design) | Best of both worlds |
| "Defective" for income tax, not estate | Intentionally Defective Grantor Trust (IDGT) |

### Sale to Grantor Trust

| Transaction | Tax Consequence |
|-------------|-----------------|
| Sale to IDGT | No income tax (sale to self for income purposes) |
| Note received | Installment payments or balloon |
| Appreciation above interest | Passes to trust beneficiaries |

This is an advanced wealth transfer technique beyond CFP scope but tested for awareness.

---

## Generation-Skipping Transfer (GST) Tax

### What It Is

40% tax on transfers to skip persons (typically grandchildren or those 37.5+ years younger).

### Why It Exists

Prevent wealthy families from avoiding estate tax at each generation.

### GST Exemption

- Equal to estate exemption (~$13.6M in 2024)
- Separate from estate exemption (applies specifically to skip transfers)
- Once used, cannot be restored

### Three Types of GST Transfers

| Type | Example |
|------|---------|
| **Direct skip** | Gift directly to grandchild |
| **Taxable distribution** | Trust distribution to grandchild |
| **Taxable termination** | Child dies, grandchild becomes beneficiary |

---

## Portability of Estate Exemption

### What Is Portability?

Surviving spouse can use deceased spouse's unused exemption (DSUE).

### Requirements

- File estate tax return for deceased spouse (even if no tax due)
- Elect portability on Form 706
- Applies only to federal estate tax (not GST)

### Example

| Scenario | Without Portability | With Portability |
|----------|--------------------|--------------------|
| Husband dies with $8M estate | Uses $8M of exemption | Same |
| Wife's exemption | ~$13.6M | ~$13.6M + $5.6M unused = ~$19.2M |
| Wife's estate at death | $30M | $30M |
| Taxable estate | $16.4M | $10.8M |
| Estate tax savings | — | ~$2.24M |

---

## Key Takeaways

1. **Gift and estate taxes are unified**—gifts reduce available estate exemption
2. **Annual exclusion gifts** don't use lifetime exemption
3. **Basis rules differ**: step-up at death, carryover for gifts
4. **Don't give away low-basis assets** if estate won't be taxable
5. **File for portability** to preserve deceased spouse's exemption

---

## Practice Questions

1. A client gifts stock worth $100,000 with a basis of $20,000 to their child. The child's basis is:
   - A) $100,000 (fair market value)
   - B) $20,000 (carryover basis)
   - C) $60,000 (average)
   - D) $0

   **Answer: B** - Gifts have carryover basis (donor's basis passes to donee).

2. Portability of exemption allows:
   - A) Exemption to pass from parents to children
   - B) Surviving spouses to use the deceased spouse's unused exemption
   - C) GST exemption to be transferred between spouses
   - D) Charitable bequests to carry forward

   **Answer: B** - Portability allows surviving spouse to add deceased spouse's unused exemption to their own.
`,
    keyTerms: [
      { term: "Unified Credit", definition: "Combined lifetime exemption for gift and estate taxes" },
      { term: "Carryover Basis", definition: "Recipient takes donor's basis for lifetime gifts" },
      { term: "Step-Up in Basis", definition: "Basis adjusted to FMV at date of death" },
      { term: "Portability", definition: "Surviving spouse's use of deceased spouse's unused exemption" },
      { term: "GST Tax", definition: "Tax on transfers skipping a generation" }
    ],
    relatedQuestionIds: ["CFP-TAX-B7-015", "CFP-TAX-B7-016"]
  },
  {
    id: "CFP-TAX-L015",
    domain: "CFP-TAX",
    blueprintArea: "TAX-2",
    title: "Investment Tax Planning",
    order: 15,
    duration: 50,
    objectives: [
      "Apply tax-efficient investment strategies",
      "Analyze tax-loss harvesting and wash sale rules",
      "Evaluate asset location across account types",
      "Understand tax treatment of various investment types"
    ],
    content: `
# Investment Tax Planning

Tax-efficient investing can add significant value. Understanding how investment decisions affect taxes helps maximize after-tax returns.

---

## Tax Treatment of Investment Income

### Income Types

| Type | Tax Rate | Examples |
|------|----------|----------|
| **Qualified dividends** | 0%/15%/20% | Most US stock dividends |
| **Ordinary dividends** | Ordinary income rates | REITs, some foreign dividends |
| **Interest income** | Ordinary income rates | Bonds, CDs, savings |
| **Long-term capital gains** | 0%/15%/20% | Assets held > 1 year |
| **Short-term capital gains** | Ordinary income rates | Assets held ≤ 1 year |
| **Municipal bond interest** | Tax-exempt (federal) | Muni bonds |

### Qualified Dividend Requirements

- Paid by US corporation or qualified foreign corporation
- Held for more than 60 days during 121-day window
- Not generated by hedging positions

---

## Tax-Loss Harvesting

### What It Is

Selling investments at a loss to offset gains, reduce taxes, and reinvest in similar (not identical) securities.

### How It Works

| Step | Action |
|------|--------|
| 1 | Identify position with unrealized loss |
| 2 | Sell the position, realize loss |
| 3 | Use loss to offset gains (and up to $3,000 ordinary income) |
| 4 | Reinvest in similar but not "substantially identical" security |

### Loss Harvesting Example

| Item | Amount |
|------|--------|
| Realized long-term gains | $50,000 |
| Tax at 23.8% | $11,900 |
| Harvested losses | ($30,000) |
| Net gains | $20,000 |
| Tax at 23.8% | $4,760 |
| **Tax savings** | **$7,140** |

### Wash Sale Rule

| Rule | Detail |
|------|--------|
| **What triggers** | Buy "substantially identical" security 30 days before or after sale |
| **Consequence** | Loss is disallowed; added to replacement security's basis |
| **Applies to** | Stocks, bonds, options; across accounts (including spouse, IRA) |

### What's "Substantially Identical"?

| Allowed (Not Identical) | Not Allowed (Identical) |
|------------------------|------------------------|
| Switch S&P 500 ETF providers | Repurchase same ETF |
| Switch total market to large cap | Same fund in different account |
| Switch individual stock to sector ETF | Options on same stock |
| Tesla to EV sector ETF | Tesla to Tesla |

---

## Asset Location Strategy

### The Concept

Place investments in the account type that provides the best after-tax result.

### General Guidelines

| Asset Type | Best Location | Reason |
|------------|---------------|--------|
| **Taxable bonds** | Tax-advantaged (IRA, 401k) | Interest taxed as ordinary income |
| **REITs** | Tax-advantaged | Dividends are ordinary income |
| **High-yield bonds** | Tax-advantaged | High ordinary income |
| **Growth stocks** | Taxable | Low current income, potential step-up |
| **Tax-managed equity** | Taxable | Already tax-efficient |
| **Municipal bonds** | Taxable | Already tax-exempt |
| **Foreign stocks** | Taxable (sometimes) | Foreign tax credit available |

### The Trade-Off

| Account | Tax on Growth | Tax on Withdrawal |
|---------|---------------|-------------------|
| Taxable | Annual (dividends, gains) | Only on realized gains |
| Traditional IRA | Deferred | Ordinary income rates |
| Roth IRA | Never | Tax-free |

### Asset Location Priority

1. Max tax-deferred contribution limits
2. Place tax-inefficient assets in tax-advantaged accounts
3. Place tax-efficient assets in taxable accounts
4. Use Roth for highest expected growth (if available)

---

## Tax-Efficient Fund Selection

### What Makes a Fund Tax-Efficient?

| Factor | Tax-Efficient | Tax-Inefficient |
|--------|---------------|-----------------|
| **Turnover** | Low (<20%) | High (>100%) |
| **Capital gains distributions** | Minimal | Significant annual distributions |
| **Dividends** | Qualified | Ordinary |
| **Structure** | ETF (in-kind redemptions) | Mutual fund (cash redemptions) |

### Why ETFs Are Often More Tax-Efficient

| Feature | ETF | Mutual Fund |
|---------|-----|-------------|
| Redemption mechanism | In-kind (shares to APs) | Cash (forces sales) |
| Capital gains distributions | Rare | Common |
| Tax lot control | Available | Available |

### Index vs. Active

| Type | Typical Turnover | Tax Efficiency |
|------|------------------|----------------|
| Index funds | 3-10% | High |
| Actively managed | 50-200%+ | Lower |
| Tax-managed funds | Varies | Designed for efficiency |

---

## Capital Gains Management

### Timing Strategies

| Strategy | Application |
|----------|-------------|
| **Defer realization** | Hold appreciated assets to delay tax |
| **0% bracket harvesting** | Realize gains when in 0% LTCG bracket |
| **Lot selection** | Choose highest-basis lots when selling |
| **Offset gains** | Match realized gains with losses |

### 0% Long-Term Capital Gains Bracket

In 2024, 0% rate applies to LTCG if taxable income is under ~$47,000 (single) or ~$94,000 (married).

**Strategy**: Retirees in low-income years can realize gains tax-free, resetting basis.

### Holding Period Matters

| Holding Period | Treatment |
|----------------|-----------|
| > 1 year | Long-term (0/15/20%) |
| ≤ 1 year | Short-term (ordinary rates up to 37%) |

Holding just one extra day can save 17%+ in taxes.

---

## Key Takeaways

1. **Asset location** can add 0.5%+ per year in after-tax returns
2. **Tax-loss harvesting** reduces current taxes (beware wash sales)
3. **Qualified dividends and LTCG** are taxed at favorable rates
4. **ETFs** are generally more tax-efficient than mutual funds
5. **Harvest gains in 0% bracket** years when possible

---

## Practice Questions

1. A client sells an S&P 500 ETF at a loss and immediately buys a total stock market ETF. Under wash sale rules, this trade is:
   - A) Disallowed; loss is suspended
   - B) Allowed; total stock market is not "substantially identical" to S&P 500
   - C) Requires IRS ruling
   - D) Only allowed in retirement accounts

   **Answer: B** - While similar, total stock market and S&P 500 are different indexes and generally not considered substantially identical.

2. The BEST location for a high-yield bond fund is:
   - A) Taxable brokerage account
   - B) Roth IRA
   - C) Traditional IRA or 401(k)
   - D) It doesn't matter

   **Answer: C** - High-yield bonds produce ordinary income; sheltering in tax-deferred accounts is most efficient. Roth is valuable but limited—save it for high-growth assets.
`,
    keyTerms: [
      { term: "Tax-Loss Harvesting", definition: "Selling investments at a loss to offset gains and reduce taxes" },
      { term: "Wash Sale Rule", definition: "Disallows loss if substantially identical security bought within 30 days" },
      { term: "Asset Location", definition: "Placing investments in account types that optimize after-tax returns" },
      { term: "Qualified Dividend", definition: "Dividend eligible for preferential capital gains tax rates" }
    ],
    relatedQuestionIds: ["CFP-TAX-B7-017", "CFP-TAX-B7-018"]
  },
  {
    id: "CFP-TAX-L016",
    domain: "CFP-TAX",
    blueprintArea: "TAX-2",
    title: "Property Transactions: Section 1031 and Installment Sales",
    order: 16,
    duration: 50,
    objectives: [
      "Apply Section 1031 like-kind exchange rules",
      "Analyze installment sale tax treatment",
      "Evaluate Section 121 primary residence exclusion",
      "Navigate related party transaction rules"
    ],
    content: `
# Property Transactions: Section 1031 and Installment Sales

Real estate transactions have unique tax rules that can defer or reduce taxes. Understanding these provisions is essential for clients with property.

---

## Section 1031 Like-Kind Exchanges

### What Is It?

Exchange of "like-kind" business or investment property with deferral of gain recognition.

### Basic Requirements

| Requirement | Detail |
|-------------|--------|
| **Qualified property** | Real property held for business or investment |
| **Like-kind** | Real property for real property (broad definition) |
| **No personal use property** | Principal residence doesn't qualify |
| **Held for business/investment** | Both relinquished and replacement property |

### What's "Like-Kind" for Real Estate?

| Exchange | Like-Kind? |
|----------|------------|
| Office building → Apartment | ✅ Yes |
| Raw land → Commercial building | ✅ Yes |
| US real estate → Foreign real estate | ❌ No |
| Real property → Personal property | ❌ No |
| Vacation home (personal use) → Rental | ❌ No (unless rental use established) |

### Timeline Requirements

| Deadline | Requirement |
|----------|-------------|
| **45 days** | Identify replacement property in writing |
| **180 days** | Close on replacement property |
| **Both deadlines are strict** | No extensions (even for reasonable cause) |

### Identification Rules

| Rule | Description |
|------|-------------|
| **Three-property rule** | Identify up to 3 properties regardless of value |
| **200% rule** | Identify any number if total FMV ≤ 200% of relinquished |
| **95% rule** | Identify any amount but must acquire 95% of value identified |

Most taxpayers use the three-property rule for simplicity.

---

## Boot and Gain Recognition

### What Is Boot?

Non-like-kind property received in exchange (cash, debt relief, other property).

### Boot Triggers Gain

| Boot Type | Amount |
|-----------|--------|
| Cash received | Taxable |
| Net debt relief | Taxable |
| Non-qualified property | Taxable |

### Example

| Item | Amount |
|------|--------|
| Relinquished property FMV | $500,000 |
| Mortgage on relinquished | $200,000 |
| Replacement property FMV | $450,000 |
| Mortgage on replacement | $150,000 |
| Cash received | $50,000 |
| Net debt relief | $50,000 ($200K - $150K) |
| **Total boot** | **$100,000** |
| Recognized gain | $100,000 (or actual gain if less) |

### Basis in Replacement Property

Basis = FMV of replacement - deferred gain

If you defer $200,000 of gain on a $500,000 replacement, your basis is $300,000.

---

## Installment Sales

### What Is It?

Sale where at least one payment is received after the year of sale, allowing gain recognition as payments are received.

### The Installment Method

| Component | Calculation |
|-----------|-------------|
| **Gross profit** | Sale price - adjusted basis |
| **Gross profit ratio** | Gross profit ÷ sale price |
| **Gain recognized per payment** | Payment × gross profit ratio |

### Example

| Item | Amount |
|------|--------|
| Sale price | $500,000 |
| Adjusted basis | $200,000 |
| Gross profit | $300,000 |
| Gross profit ratio | 60% |
| Down payment | $100,000 |
| Gain recognized on down payment | $60,000 (60% × $100K) |

### When Installment Sale Is Useful

- Seller wants to defer taxes over time
- Buyer can't pay full price upfront
- Spreading income avoids higher tax brackets

### Limitations

| Situation | Rule |
|-----------|------|
| **Depreciation recapture** | Recognized in year of sale (not deferred) |
| **Inventory/dealer property** | Installment method not available |
| **Related parties** | Special rules and potential acceleration |
| **Interest requirement** | Must charge adequate interest (AFR minimum) |

---

## Section 121 Primary Residence Exclusion

### The Exclusion

| Filing Status | Exclusion Amount |
|---------------|------------------|
| Single | $250,000 |
| Married filing jointly | $500,000 |

### Requirements

| Requirement | Detail |
|-------------|--------|
| **Ownership test** | Own for 2 of last 5 years |
| **Use test** | Live in as primary residence 2 of last 5 years |
| **Frequency** | Can use exclusion only once every 2 years |

### Partial Exclusion

Available if full requirements not met due to:
- Job change (work-related move)
- Health reasons
- Unforeseen circumstances

Exclusion is prorated based on time met vs. required.

### Combining with 1031

Cannot combine Section 121 and Section 1031 on same property (121 for residence portion, 1031 for rental portion requires separation).

---

## Net Investment Income Tax (NIIT) Impact

### What It Is

3.8% surtax on investment income for higher earners.

### Thresholds

| Filing Status | Threshold |
|---------------|-----------|
| Single | $200,000 |
| Married filing jointly | $250,000 |
| Married filing separately | $125,000 |

### Applies To

- Capital gains (including from property sales)
- Interest, dividends, rental income
- Does NOT apply to active business income

### Planning Implications

- Large gain may trigger NIIT
- Installment sales may keep AGI below threshold
- 1031 exchanges defer NIIT as well as regular capital gains tax

---

## Key Takeaways

1. **Section 1031** defers gain on business/investment real estate exchanges
2. **45/180 day deadlines** are strict—no extensions
3. **Boot is taxable**—minimize cash and net debt relief
4. **Installment sales** spread gain recognition over payment period
5. **Section 121** excludes $250K/$500K of primary residence gain

---

## Practice Questions

1. A taxpayer sells investment property for $600,000 with a $150,000 basis. They identify replacement property within 45 days and close within 180 days. The replacement property costs $550,000 with no mortgage. Boot received is:
   - A) $0
   - B) $50,000
   - C) $150,000
   - D) $450,000

   **Answer: B** - The difference between relinquished ($600K) and replacement ($550K) is $50K boot (cash retained).

2. Under the installment method, depreciation recapture is:
   - A) Deferred like other gains
   - B) Recognized in full in the year of sale
   - C) Not applicable to installment sales
   - D) Recognized only when full payment is received

   **Answer: B** - Depreciation recapture (Section 1250) is recognized in the year of sale; it cannot be deferred via installment method.
`,
    keyTerms: [
      { term: "Section 1031 Exchange", definition: "Like-kind exchange of investment real property with gain deferral" },
      { term: "Boot", definition: "Non-like-kind property received in exchange that triggers gain recognition" },
      { term: "Installment Sale", definition: "Sale with payments over time allowing proportional gain recognition" },
      { term: "Section 121 Exclusion", definition: "$250K/$500K exclusion on primary residence sale" }
    ],
    relatedQuestionIds: ["CFP-TAX-B7-019", "CFP-TAX-B7-020"]
  },
  {
    id: "CFP-TAX-L017",
    domain: "CFP-TAX",
    blueprintArea: "TAX-3",
    title: "Small Business Tax Planning",
    order: 17,
    duration: 50,
    objectives: [
      "Apply retirement plan options for small business owners",
      "Analyze Section 199A QBI deduction strategies",
      "Evaluate S-Corp reasonable compensation requirements",
      "Plan for succession and sale tax implications"
    ],
    content: `
# Small Business Tax Planning

Small business owners have unique tax planning opportunities. Understanding these strategies helps advisors serve entrepreneurs effectively.

---

## Retirement Plans for Business Owners

### Plan Comparison

| Plan | Max Contribution (2026) | Best For |
|------|------------------------|----------|
| **SEP-IRA** | 25% of comp, up to $71,500 | Simple setup, fluctuating income |
| **SIMPLE IRA** | $17,000 + 3% match | Small employer, employee participation |
| **Solo 401(k)** | $24,500 + 25% of comp, up to $71,500 | Self-employed, maximize contributions |
| **Defined Benefit** | Actuarially determined (can exceed $200K) | High income, older owners |

### SEP-IRA

| Feature | Detail |
|---------|--------|
| **Contribution** | Employer only (25% of compensation) |
| **Deadline** | Tax filing deadline including extensions |
| **Employees** | Must cover all eligible employees at same % |
| **Admin** | Minimal paperwork |

### Solo 401(k)

| Feature | Detail |
|---------|--------|
| **Employee deferral** | $24,500 ($32,000 if 50+) |
| **Employer profit sharing** | Up to 25% of compensation |
| **Total** | Up to $71,500 ($79,000 if 50+) |
| **Roth option** | Available |
| **Loans** | Available |

> **Key advantage**: Solo 401(k) often allows higher contributions than SEP for same income due to employee deferral component.

### Defined Benefit Plans

| Feature | Detail |
|---------|--------|
| **Contribution** | Based on promised benefit at retirement |
| **Deduction** | Often $100,000+ per year for older owners |
| **Complexity** | Requires actuary, annual compliance |
| **Best for** | High earners age 50+ with stable income |

---

## Section 199A QBI Deduction Strategies

### The Basics

20% deduction on Qualified Business Income from pass-through entities (sole proprietorships, partnerships, S-corps).

### Limitations

| Income Level | Limitation |
|--------------|------------|
| Below threshold ($182,100 single/$364,200 MFJ) | Full 20% deduction |
| Phase-in range | W-2 wage/property limits begin |
| Above phase-in | Limited to 50% of W-2 wages OR 25% wages + 2.5% property |

### Specified Service Businesses (SSTB)

| SSTB Industries | Non-SSTB Safe |
|-----------------|---------------|
| Law, medical, accounting | Engineering, architecture |
| Consulting | Manufacturing |
| Financial services | Real estate, construction |
| Athletics, performing arts | Retail, wholesale |

SSTBs: Deduction phases out entirely above income thresholds.

### Planning Strategies

| Strategy | Application |
|----------|-------------|
| **Income smoothing** | Keep income below thresholds if near |
| **W-2 wage strategy** | Ensure adequate wages for high earners |
| **Separating businesses** | Carve out non-SSTB activities |
| **Retirement contributions** | Reduce AGI to stay under thresholds |

---

## S-Corporation Compensation Planning

### Reasonable Compensation Requirement

S-Corp shareholder-employees must receive "reasonable compensation" before taking distributions.

### Why It Matters

| Payment Type | Subject to FICA? | Subject to Income Tax? |
|--------------|------------------|----------------------|
| W-2 wages | Yes (15.3% combined) | Yes |
| Distributions | No | Yes |

### IRS Scrutiny

The IRS examines:
- Industry compensation surveys
- Time spent in business
- Comparable positions
- Business revenue and profitability
- Distribution/salary ratio

### Common Mistake

| Scenario | Risk |
|----------|------|
| Owner pays $30K salary, takes $300K distributions | IRS reclassifies distributions as wages |
| Penalty | Back FICA taxes + penalties + interest |

### Safe Approach

- Document compensation analysis
- Pay reasonable salary based on comparable positions
- Take distributions after adequate wages

---

## Business Sale and Exit Planning

### Sale Structures

| Structure | Seller Benefit | Buyer Benefit |
|-----------|---------------|---------------|
| **Asset sale** | Capital gains (mostly) | Basis step-up, depreciation |
| **Stock sale** | Capital gains | Simpler transaction |
| **Installment sale** | Defer gain | Finance purchase price |

### Asset Allocation in Asset Sales

| Allocated To | Seller Tax Treatment |
|--------------|---------------------|
| Inventory | Ordinary income |
| Equipment (to extent of depreciation) | Ordinary income (recapture) |
| Equipment (above recapture) | Capital gain |
| Goodwill/intangibles | Capital gain |
| Covenant not to compete | Ordinary income |

### Installment Sales for Business

Can spread gain over payment period:
- Allows seller to recognize income gradually
- May keep seller in lower brackets
- Interest must be charged on deferred payments

### 1202 QSBS Exclusion

| Provision | Detail |
|-----------|--------|
| **What** | Excludes 100% of gain on qualified small business stock |
| **Requirements** | C-Corp, held 5+ years, acquired at original issuance |
| **Limit** | Greater of $10M or 10× basis |
| **Eligible businesses** | Active trade or business (not services, finance, hospitality) |

---

## Key Takeaways

1. **Solo 401(k)** often beats SEP-IRA for maximizing contributions
2. **Defined benefit plans** allow massive deductions for older, high-income owners
3. **QBI deduction** requires careful income threshold management
4. **S-Corp reasonable compensation** must be documented and defensible
5. **Asset sales** allow basis step-up for buyers; stock sales are simpler

---

## Practice Questions

1. A 55-year-old self-employed consultant earns $400,000. To maximize current-year retirement contributions, the BEST plan is likely:
   - A) SEP-IRA
   - B) SIMPLE IRA
   - C) Solo 401(k)
   - D) Defined benefit plan combined with 401(k)

   **Answer: D** - At high income with desire to maximize tax deferral, a defined benefit plan (potentially $100K+) plus 401(k) provides the largest contributions.

2. An S-Corp owner takes $50,000 salary and $250,000 in distributions. The IRS is MOST likely to:
   - A) Accept the allocation as reported
   - B) Reclassify some distributions as wages subject to FICA
   - C) Apply the 3.8% NIIT to all distributions
   - D) Deny the QBI deduction

   **Answer: B** - The salary-to-distribution ratio suggests inadequate reasonable compensation; IRS may reclassify distributions as wages.
`,
    keyTerms: [
      { term: "Solo 401(k)", definition: "Retirement plan for self-employed with employee and employer contributions" },
      { term: "SEP-IRA", definition: "Simplified Employee Pension with employer-only contributions" },
      { term: "Reasonable Compensation", definition: "Required salary for S-Corp shareholder-employees" },
      { term: "QSBS", definition: "Qualified Small Business Stock with potential 100% gain exclusion" }
    ],
    relatedQuestionIds: ["CFP-TAX-B7-021", "CFP-TAX-B7-022"]
  },
  {
    id: "CFP-TAX-L018",
    domain: "CFP-TAX",
    blueprintArea: "TAX-1",
    title: "Year-End and Multi-Year Tax Planning",
    order: 18,
    duration: 45,
    objectives: [
      "Apply income timing and acceleration strategies",
      "Analyze multi-year tax projections",
      "Evaluate tax law change planning",
      "Integrate life events into tax planning"
    ],
    content: `
# Year-End and Multi-Year Tax Planning

Proactive tax planning throughout the year—not just at tax time—maximizes savings. Multi-year perspective reveals opportunities invisible in single-year planning.

---

## The Multi-Year Mindset

### Why Single-Year Planning Falls Short

| Single-Year Focus | Multi-Year Opportunity |
|-------------------|----------------------|
| "Minimize this year's tax" | "Minimize lifetime tax" |
| Defer income automatically | Sometimes accelerate income |
| Maximize deductions now | Sometimes defer deductions |

### When to Accelerate Income

| Situation | Strategy |
|-----------|----------|
| Expect higher rates next year | Recognize income now |
| Tax law sunset (TCJA 2026?) | Accelerate before rates rise |
| Low-income year | Realize gains at favorable rates |
| Using up NOL/capital losses | Offset income while losses available |

### When to Defer Income

| Situation | Strategy |
|-----------|----------|
| High-income year | Defer to lower-income future year |
| Approaching retirement | Push income to lower-bracket years |
| Large one-time gain | Spread via installment sale |

---

## Year-End Checklist

### Income Timing

| Action | Deadline |
|--------|----------|
| Defer/accelerate billing (self-employed) | Year-end |
| Defer bonus if employer allows | December 31 |
| Realize capital gains/losses | December 31 settlement |
| Complete Roth conversions | December 31 |

### Deduction Timing

| Action | Deadline |
|--------|----------|
| Prepay state taxes (SALT limit consideration) | December 31 |
| Charitable contributions | December 31 |
| Bunch itemized deductions | Alternate years |
| Pay medical expenses | December 31 |

### Retirement Contributions

| Type | Deadline |
|------|----------|
| 401(k) elective deferrals | December 31 |
| IRA contributions | April 15 of following year |
| SEP-IRA contributions | Tax filing deadline + extensions |

---

## Bunching and Standard Deduction Optimization

### The Strategy

Concentrate deductible expenses in alternating years to exceed standard deduction threshold.

### Example

| | Year 1 | Year 2 |
|---|--------|--------|
| **Without Bunching** | | |
| Itemized deductions | $20,000 | $20,000 |
| Standard deduction | $29,200 | $29,200 |
| Benefit | Standard | Standard |
| Total 2-year benefit | $58,400 | |
| **With Bunching** | | |
| Itemized deductions | $35,000 | $5,000 |
| Standard deduction | N/A | $29,200 |
| Benefit | Itemized | Standard |
| Total 2-year benefit | $64,200 | |
| **Additional benefit** | **$5,800** | |

### What to Bunch

| Item | Bunchable? |
|------|-----------|
| Charitable donations | ✅ (use DAF for flexibility) |
| State/local taxes | Limited (SALT cap $10,000) |
| Property taxes | Limited (SALT cap) |
| Medical expenses | Somewhat (if near 7.5% threshold) |
| Mortgage interest | No (pay as required) |

---

## Roth Conversion Planning

### Annual Conversion Analysis

Each year, evaluate converting traditional IRA to Roth:

| Factor | Analysis |
|--------|----------|
| Current bracket | How much "room" before next bracket? |
| Future rates | Will rates be higher? |
| RMD avoidance | Reduce future required distributions |
| Estate planning | Leave tax-free inheritance |

### Bracket Filling

| Bracket | 2026 MFJ Threshold |
|---------|-------------------|
| 12% | Up to $98,500 |
| 22% | Up to $210,000 |
| 24% | Up to $400,000 |
| 32% | Up to $509,000 |

**Strategy**: Convert enough to "fill" current bracket without jumping to next.

### Multi-Year Conversion Planning

| Approach | Best For |
|----------|----------|
| Convert entire IRA quickly | Young, low-income phase |
| Gradual annual conversions | Retire early, before SS/RMDs |
| Bracket-filling | Stay within tax-efficient zone |
| None | Already in high bracket, expect lower future rates |

---

## Planning for Tax Law Changes

### Current Sunset Concerns (TCJA 2025/2026)

| Provision | Current | After Sunset |
|-----------|---------|--------------|
| Top bracket | 37% | 39.6% |
| Standard deduction | $29,200 (MFJ) | ~$13,000 |
| Child tax credit | $2,000 | $1,000 |
| QBI deduction | 20% | Eliminated |
| Estate exemption | ~$13.6M | ~$7M |

### Strategic Responses

| Strategy | Rationale |
|----------|-----------|
| Accelerate Roth conversions | Lock in lower rates |
| Gift before sunset | Use large exemption |
| Accelerate income | If expecting higher rates |
| Defer deductions | Save for when more valuable |

> **Caution**: Laws can change; don't over-optimize for uncertain future.

---

## Life Event Tax Planning

### Major Life Events Checklist

| Event | Tax Considerations |
|-------|-------------------|
| **Marriage** | Withholding update, filing status, SS benefits |
| **Divorce** | Alimony, QDROs, residence sale, filing status |
| **New child** | Credits, withholding, 529 plans |
| **Job change** | 401(k) rollover, moving expenses (no longer deductible) |
| **Home purchase** | Mortgage interest, property taxes, points |
| **Retirement** | RMDs, SS claiming, Roth conversions, Medicare premiums |
| **Inheritance** | Step-up in basis, IRD, estate settlement |
| **Death of spouse** | Filing status, survivor options, portability election |

---

## Key Takeaways

1. **Multi-year planning** often finds opportunities single-year misses
2. **Bunching deductions** optimizes standard vs. itemized choice
3. **Bracket-filling** Roth conversions can reduce lifetime taxes
4. **Tax law sunsets** create planning urgency
5. **Life events** trigger important tax planning opportunities

---

## Practice Questions

1. A married couple normally has $22,000 in annual charitable giving. To optimize tax benefits, they should consider:
   - A) Continuing annual $22,000 donations
   - B) Donating $66,000 every third year (bunching with DAF)
   - C) Stopping charitable giving entirely
   - D) Only giving when in the highest bracket

   **Answer: B** - Bunching $66K in one year exceeds the standard deduction, allowing itemization; take standard deduction in other years.

2. A client retiring in 2025 with $1M in traditional IRA and minimal other income should consider:
   - A) Converting the entire IRA to Roth immediately
   - B) Gradual Roth conversions over multiple years to fill lower brackets
   - C) Leaving all funds in traditional IRA for RMDs
   - D) Converting only after reaching age 73

   **Answer: B** - Gradual conversions during low-income early retirement years minimize tax while shifting assets to tax-free Roth.
`,
    keyTerms: [
      { term: "Bunching", definition: "Concentrating deductible expenses in alternating years to exceed standard deduction" },
      { term: "Bracket Filling", definition: "Converting or realizing income up to the top of current tax bracket" },
      { term: "TCJA Sunset", definition: "Scheduled expiration of Tax Cuts and Jobs Act provisions after 2025" },
      { term: "Multi-Year Planning", definition: "Tax strategy considering multiple years rather than single year optimization" }
    ],
    relatedQuestionIds: ["CFP-TAX-B7-023", "CFP-TAX-B7-024"]
  }
];
