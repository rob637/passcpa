/**
 * CFP Domain 5: Tax Planning
 * Area TAX-1: Tax Fundamentals
 * 
 * These lessons cover fundamental tax concepts including
 * filing status, income categories, and deductions.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_TAX1_LESSONS: CFPLesson[] = [
  {
    id: "CFP-TAX-L001",
    domain: "CFP-TAX",
    blueprintArea: "TAX-1",
    title: "Income Tax Fundamentals",
    order: 1,
    duration: 50,
    objectives: [
      "Calculate taxable income through the tax formula",
      "Distinguish above-the-line and below-the-line deductions",
      "Compare filing status options and implications",
      "Apply marginal vs. effective tax rate concepts"
    ],
    content: `
# Income Tax Fundamentals

Understanding the structure of income tax is essential for effective tax planning.

---

## The Tax Formula

### From Gross Income to Tax

| Step | Component |
|------|-----------|
| **Gross Income** | All income from all sources |
| Less: **Above-the-line deductions** | Adjustments to income |
| = **Adjusted Gross Income (AGI)** | Key threshold figure |
| Less: **Standard or itemized deductions** | Larger of the two |
| Less: **Qualified business income (QBI) deduction** | Up to 20% of QBI |
| = **Taxable Income** | Amount subject to tax |
| × **Tax rates** | Progressive brackets |
| = **Tax liability** | Before credits |
| Less: **Tax credits** | Dollar-for-dollar reduction |
| = **Taxes due (or refund)** | Final amount |

---

## Gross Income

### What's Included

| Taxable | Examples |
|---------|----------|
| Wages and salaries | Employment income |
| Interest | Bank accounts, bonds |
| Dividends | Qualified and ordinary |
| Business income | Self-employment, partnerships |
| Capital gains | Sales of property |
| Retirement distributions | IRA, 401(k), pensions |
| Rental income | Net rental receipts |
| Alimony received | Pre-2019 divorces only |

### What's Excluded

| Excluded | Examples |
|----------|----------|
| Municipal bond interest | Tax-exempt |
| Life insurance proceeds | Death benefits |
| Gifts and inheritances | To recipient |
| Roth IRA distributions | If qualified |
| Health insurance (employer) | Fringe benefit |
| Child support | Received payments |

---

## Above-the-Line Deductions

### Reduce AGI Directly

| Deduction | Limit |
|-----------|-------|
| Traditional IRA contributions | $7,000 ($8,000 if 50+) |
| HSA contributions | $4,150 individual, $8,300 family |
| Self-employment tax (50%) | Half of SE tax |
| Student loan interest | $2,500 |
| Educator expenses | $300 |
| Alimony paid | Pre-2019 divorces |

### Why AGI Matters

Many tax benefits phase out based on AGI:
- Child tax credit
- IRA deduction limits
- Education credits
- Medicare premium surcharges (IRMAA)

---

## Standard vs. Itemized Deductions

### Standard Deduction (2024)

| Filing Status | Amount |
|---------------|--------|
| Single | $14,600 |
| MFJ | $29,200 |
| MFS | $14,600 |
| HOH | $21,900 |
| Additional (65+/blind) | $1,550 (single), $1,550 (MFJ per person) |

### Common Itemized Deductions

| Deduction | Limit/Rule |
|-----------|------------|
| State and local taxes (SALT) | $10,000 cap |
| Mortgage interest | $750K debt limit |
| Charitable contributions | 60% AGI (cash), 30% (appreciated) |
| Medical expenses | Exceeding 7.5% AGI |

### Decision Rule

Itemize if: **Total itemized > Standard deduction**

---

## Filing Status

### Five Filing Statuses

| Status | Requirements | Generally Best For |
|--------|--------------|-------------------|
| **Single** | Unmarried, no dependents | Singles |
| **MFJ** | Married, file together | Most married couples |
| **MFS** | Married, file separately | Liability separation, income-driven loans |
| **HOH** | Unmarried + qualifying person | Single parents |
| **QSS** | Spouse died within 2 years + dependent child | Surviving spouses |

### HOH Requirements

1. Unmarried (or considered unmarried)
2. Pay more than half household costs
3. Qualifying person lived with you more than half year

---

## Tax Brackets (2024)

### Married Filing Jointly

| Rate | Income Range |
|------|-------------|
| 10% | $0 - $23,200 |
| 12% | $23,201 - $94,300 |
| 22% | $94,301 - $201,050 |
| 24% | $201,051 - $383,900 |
| 32% | $383,901 - $487,450 |
| 35% | $487,451 - $731,200 |
| 37% | $731,201+ |

### Single

| Rate | Income Range |
|------|-------------|
| 10% | $0 - $11,600 |
| 12% | $11,601 - $47,150 |
| 22% | $47,151 - $100,525 |
| 24% | $100,526 - $191,950 |
| 32% | $191,951 - $243,725 |
| 35% | $243,726 - $609,350 |
| 37% | $609,351+ |

---

## Marginal vs. Effective Tax Rate

### Marginal Rate

Rate on the **next dollar** of income.

### Effective Rate

Average rate on **all income**.

$$\\text{Effective Rate} = \\frac{\\text{Total Tax}}{\\text{Taxable Income}}$$

### Example

Single filer with $100,000 taxable income:
- 10% on first $11,600 = $1,160
- 12% on next $35,550 = $4,266
- 22% on next $53,375 = $11,743
- 24% on remaining $11,475 = $2,754

**Total**: $19,923  
**Marginal rate**: 24%  
**Effective rate**: 19.9%

---

## Tax Credits vs. Deductions

### Key Difference

| Type | Impact |
|------|--------|
| **Deduction** | Reduces taxable income |
| **Credit** | Reduces tax dollar-for-dollar |

### Example

$1,000 deduction in 22% bracket = **$220** tax savings  
$1,000 credit = **$1,000** tax savings

**Credits are more valuable!**

### Refundable vs. Non-refundable

| Credit Type | Can Exceed Tax Liability? |
|-------------|--------------------------|
| **Refundable** | Yes (creates refund) |
| **Non-refundable** | No (reduces to $0 only) |

---

## Key Takeaways

1. **Tax formula**: Gross income → AGI → taxable income → tax
2. **Above-the-line** deductions reduce AGI; below-the-line reduce taxable income
3. **Standard vs. itemized**: Use whichever is greater
4. **Marginal rate**: Rate on next dollar; **Effective rate**: Average rate
5. **Credits > Deductions**: $1 credit = $1 tax reduction
    `,
    keyTakeaways: [
      "Tax formula: Gross income → AGI → taxable income → tax liability - credits",
      "Above-the-line deductions reduce AGI (important threshold)",
      "Standard vs. itemized: Use larger amount",
      "Marginal = rate on next dollar; Effective = average rate",
      "Credits are more valuable than deductions (dollar-for-dollar)"
    ],
    keyFormulas: [
      "Taxable Income = AGI - Greater of (Standard or Itemized) - QBI",
      "Effective Tax Rate = Total Tax / Taxable Income",
      "Value of Deduction = Deduction × Marginal Rate"
    ],
    mnemonics: [
      "AGI = Adjusted = Above-the-line",
      "Credits are COOL (Cut Off Overall Liability)"
    ],
    practiceProblems: [
      {
        question: "A single filer has $120,000 AGI, $18,000 itemized deductions, and no QBI. What is taxable income and should they itemize?",
        answer: "Yes, itemize ($18,000 > $14,600 standard). Taxable income = $120,000 - $18,000 = $102,000."
      },
      {
        question: "A married couple in the 24% bracket can either take a $5,000 deduction or a $1,000 credit. Which saves more tax?",
        answer: "$5,000 deduction × 24% = $1,200 tax savings. $1,000 credit = $1,000 tax savings. The deduction saves more in this case."
      },
      {
        question: "What is the 2024 SALT deduction limit, and who does it most impact?",
        answer: "$10,000 cap on state and local taxes (income + property). Most impacts high-income taxpayers in high-tax states who previously deducted $20,000+ in SALT."
      }
    ],
    relatedLessons: ["CFP-TAX-L002", "CFP-TAX-L003", "CFP-GEN-L002"]
  },

  {
    id: "CFP-TAX-L002",
    domain: "CFP-TAX",
    blueprintArea: "TAX-1",
    title: "Types of Income and Special Rules",
    order: 2,
    duration: 50,
    objectives: [
      "Distinguish ordinary income from capital gains",
      "Apply qualified dividend and capital gains rates",
      "Calculate passive activity loss limitations",
      "Identify tax treatment of various income types"
    ],
    content: `
# Types of Income and Special Rules

Different types of income receive different tax treatment. Understanding these distinctions is crucial for tax planning.

---

## Three Income Categories

### Summary

| Category | Tax Rate | Can Offset |
|----------|----------|-----------|
| **Ordinary income** | Progressive (10-37%) | With ordinary losses |
| **Capital gains/losses** | 0%, 15%, 20% (long-term) | With capital losses |
| **Passive income/losses** | Ordinary rates | With passive losses only |

---

## Ordinary Income

### What's Taxed as Ordinary

| Source | Tax Treatment |
|--------|---------------|
| Wages and salaries | Ordinary |
| Self-employment income | Ordinary + SE tax |
| Interest (most) | Ordinary |
| Short-term capital gains | Ordinary |
| Ordinary dividends | Ordinary |
| Retirement plan distributions | Ordinary |
| Rental income (net) | Ordinary (often passive) |

---

## Capital Gains and Losses

### Holding Period Rules

| Holding Period | Tax Treatment |
|----------------|---------------|
| **Short-term** (≤1 year) | Ordinary income rates |
| **Long-term** (>1 year) | Preferential rates |

### Long-Term Capital Gains Rates (2024)

| Filing Status | 0% Rate | 15% Rate | 20% Rate |
|---------------|---------|----------|----------|
| Single | $0-$47,025 | $47,026-$518,900 | $518,901+ |
| MFJ | $0-$94,050 | $94,051-$583,750 | $583,751+ |

### Net Investment Income Tax (NIIT)

Additional **3.8%** on investment income if MAGI exceeds:
- $250,000 (MFJ)
- $200,000 (Single)

Maximum LTCG rate: **23.8%** (20% + 3.8%)

---

## Capital Loss Rules

### Netting Process

1. Net short-term gains and losses
2. Net long-term gains and losses
3. Net the two results together

### Annual Deduction Limit

- Can offset unlimited capital gains
- Can offset **$3,000** of ordinary income per year
- Excess carries forward indefinitely

### Example

| Type | Amount |
|------|--------|
| Short-term gain | $5,000 |
| Short-term loss | ($8,000) |
| Long-term gain | $10,000 |
| Long-term loss | ($2,000) |

Net ST: -$3,000  
Net LT: +$8,000  
**Overall**: +$5,000 net long-term gain

---

## Qualified Dividends

### Requirements

| Requirement | Detail |
|-------------|--------|
| Holding period | 60+ days during 121-day window |
| Qualified source | US corporation or qualified foreign |
| Not excluded | Not money market funds or certain preferred |

### Tax Rate

Same as long-term capital gains (0%, 15%, 20%)

### Ordinary Dividends

Don't meet requirements → taxed at ordinary rates

---

## Interest Income

### Different Treatment

| Type | Tax Treatment |
|------|---------------|
| Bank interest | Fully taxable (ordinary) |
| Corporate bonds | Fully taxable (ordinary) |
| Treasury bonds | Federal tax, exempt from state |
| Municipal bonds | Exempt from federal, may be exempt from state |
| Private activity bonds | May be subject to AMT |

---

## Passive Activity Rules

### What's Passive

| Activity | Passive? |
|----------|----------|
| Rental real estate | Generally yes (exceptions exist) |
| Limited partnership | Yes |
| Business without material participation | Yes |
| Portfolio income | No (not passive) |

### Loss Limitations

| Rule | Description |
|------|-------------|
| Passive losses offset passive income only | Cannot offset wages or portfolio income |
| Suspended losses carry forward | Until future passive income or disposition |
| Full release at disposition | Suspended losses allowed when you sell |

### Real Estate Professional Exception

Can treat rental income as non-passive if:
- More than 750 hours in real estate activities
- More than half of working time in real estate
- Material participation in each rental activity

---

## $25,000 Rental Loss Exception

### Allows Active Participants

| Income (MAGI) | Allowed Rental Loss |
|---------------|---------------------|
| $100,000 or less | $25,000 |
| $100,001-$150,000 | Phases out $1 per $2 |
| $150,001+ | $0 |

### Requirements

- Active participation (approve tenants, expenses)
- Own at least 10% of property
- Not passive investor

---

## At-Risk Rules

### Limit Losses

Can only deduct losses to the extent of:
- Cash invested
- Property basis
- Borrowed amounts for which you're personally liable

### Cannot Deduct

Losses from non-recourse loans (unless qualified real estate).

---

## Key Takeaways

1. **Ordinary income**: 10-37%; includes wages, interest, ST gains
2. **LTCG/qualified dividends**: 0%, 15%, 20% (+ 3.8% NIIT if applicable)
3. **Capital losses**: Offset gains first, then $3,000 ordinary income
4. **Passive losses**: Only offset passive income (suspended otherwise)
5. **$25,000 rental exception**: Phases out between $100K-$150K MAGI
    `,
    keyTakeaways: [
      "Ordinary income: 10-37% (wages, interest, short-term gains)",
      "LTCG/qualified dividends: 0%, 15%, 20% based on income thresholds",
      "NIIT adds 3.8% on investment income above $250K MFJ/$200K single",
      "Capital losses offset gains first, then $3,000 ordinary income, rest carries forward",
      "Passive losses offset passive income only; $25K rental exception phases out $100K-$150K"
    ],
    keyFormulas: [
      "Max LTCG rate = 20% + 3.8% NIIT = 23.8%",
      "Annual capital loss deduction = Unlimited gains + $3,000 ordinary",
      "$25K rental phase-out: ($MAGI - $100K) × 50%"
    ],
    mnemonics: [
      "LTCG rates: 0-15-20 (like a volume dial)",
      "PAL = Passive Activity Loss (can only offset other PAL)"
    ],
    practiceProblems: [
      {
        question: "An investor has $15,000 short-term gain and $22,000 long-term loss. What is the tax result?",
        answer: "Net: $15,000 - $22,000 = -$7,000 net long-term loss. Use $3,000 to offset ordinary income. Carry forward $4,000 long-term loss to future years."
      },
      {
        question: "A taxpayer has $8,000 passive loss from a rental and $50,000 salary. MAGI is $120,000. How much rental loss can they deduct?",
        answer: "$25,000 rental exception phases out: ($120,000 - $100,000) × 50% = $10,000 reduction. Allowed: $25,000 - $10,000 = $15,000. Since loss is only $8,000, they can deduct all $8,000."
      },
      {
        question: "A single taxpayer has $60,000 taxable income including $10,000 qualified dividends. What rate applies to the dividends?",
        answer: "0% rate applies. The 0% rate for single filers covers income up to $47,025, and the remaining taxable income determines where dividends fall. At $60,000, all dividends are in the 0% bracket (they're stacked on top of ordinary income, filling the lower brackets first)."
      }
    ],
    relatedLessons: ["CFP-TAX-L001", "CFP-TAX-L003", "CFP-INV-L011"]
  },

  {
    id: "CFP-TAX-L003",
    domain: "CFP-TAX",
    blueprintArea: "TAX-1",
    title: "Capital Gains Tax Planning",
    order: 3,
    duration: 50,
    objectives: [
      "Apply capital gains taxation to investment decisions",
      "Calculate cost basis using different methods",
      "Evaluate wash sale and related party rules",
      "Implement tax-efficient gain/loss harvesting"
    ],
    content: `
# Capital Gains Tax Planning

Strategic management of capital gains and losses can significantly reduce lifetime tax burden.

---

## Capital Gains Review

### Tax Rates (2024)

| Type | Rate |
|------|------|
| Short-term (<1 year) | Ordinary income rates (10-37%) |
| Long-term (>1 year) | 0%, 15%, or 20% |
| Collectibles (art, coins) | 28% maximum |
| Section 1202 QSBS | Up to 100% excluded |
| Unrecaptured 1250 (depreciation) | 25% |

### Net Investment Income Tax

+3.8% on investment income if MAGI exceeds:
- $250,000 (MFJ)
- $200,000 (Single)

---

## Cost Basis Rules

### Basic Formula

$$\\text{Gain/Loss} = \\text{Amount Realized} - \\text{Adjusted Basis}$$

### Determining Basis

| Acquisition | Basis |
|-------------|-------|
| Purchased | Cost + transaction fees |
| Gift | Donor's basis (dual basis rule for losses) |
| Inheritance | Fair market value at date of death |
| Stock split | Original basis spread across shares |
| Reinvested dividends | Amount reinvested |

### Gift Basis Rules

| Situation | Basis Used |
|-----------|------------|
| FMV > Donor's basis at gift | Donor's basis (carryover) |
| FMV < Donor's basis, sold at gain | Donor's basis |
| FMV < Donor's basis, sold at loss | FMV at gift date |
| FMV < Donor's basis, sold between | No gain or loss |

---

## Inherited Property: Step-Up in Basis

### Rule

Inherited property receives basis equal to **FMV at date of death**.

### Example

| Item | Amount |
|------|--------|
| Decedent's basis | $50,000 |
| FMV at death | $200,000 |
| Heir's basis | $200,000 |
| If sold for $210,000 | $10,000 gain (not $160,000) |

### Planning Implication

- Don't sell appreciated assets before death if leaving to heirs
- Consider gifting assets with LOSS (no step-up for losses)
- Low-basis assets ideal to hold until death

---

## Wash Sale Rule

### The Rule

Cannot deduct loss if you purchase **substantially identical** security within **30 days before or after** the sale.

### What Triggers Wash Sale

| Action | Wash Sale? |
|--------|------------|
| Buy same stock within 30 days | Yes |
| Buy in IRA within 30 days | Yes |
| Spouse buys same stock | Yes |
| Buy similar but not identical ETF | Usually no |
| Buy different sector stock | No |

### Consequence

- Loss is **disallowed** (not permanently lost)
- Disallowed loss **added to new shares' basis**
- Holding period of old shares tacks on

---

## Substantially Identical

### Is It Identical?

| Scenario | Substantially Identical? |
|----------|-------------------------|
| Same company's stock | Yes |
| Same mutual fund | Yes |
| S&P 500 fund → different S&P 500 fund | Usually yes |
| S&P 500 fund → Total Market fund | Usually no |
| Stock → option on same stock | Yes |
| Bonds of same issuer | Depends on terms |

---

## Tax-Gain Harvesting

### The Strategy

Realize gains when in **low or 0% bracket**.

### When to Consider

| Situation | Why |
|-----------|-----|
| Early retirement (low income year) | 0% LTCG rate |
| Year with large loss | Offset gains with losses |
| Rebalancing needed | Reset cost basis higher |
| Before expected rate increase | Lock in lower rates |

### Example

Retired couple with $80,000 taxable income (MFJ):
- 0% LTCG threshold: $94,050
- Can realize $14,050 in LTCG at 0% rate

---

## Tax-Loss Harvesting

### The Strategy

Realize losses to:
1. Offset capital gains
2. Offset $3,000 ordinary income
3. Carry forward excess

### Best Practices

| Practice | Why |
|----------|-----|
| **Avoid wash sales** | Keep 31+ day gap |
| **Use similar replacement** | Stay invested in market |
| **Harvest throughout year** | Don't wait until December |
| **Consider ST vs LT** | Match character when possible |
| **Document everything** | Track for carryforward |

---

## Netting Order

### How Gains and Losses Offset

1. Short-term gains vs. short-term losses
2. Long-term gains vs. long-term losses (by rate bracket)
3. Net short-term vs. net long-term

### Character Matters

| If Net Result Is... | Tax Treatment |
|--------------------|---------------|
| Net short-term gain | Ordinary rates |
| Net long-term gain | Preferential rates |
| Net short-term loss | Offsets LTCG first, then $3K ordinary |
| Net long-term loss | Offsets STCG first, then $3K ordinary |

---

## Section 121: Home Sale Exclusion

### Requirements

| Requirement | Detail |
|-------------|--------|
| Ownership test | Owned 2 of last 5 years |
| Use test | Lived in 2 of last 5 years |
| Frequency | Once per 2 years |

### Exclusion Amount

| Filing Status | Maximum Exclusion |
|---------------|-------------------|
| Single | $250,000 |
| MFJ | $500,000 |

### Partial Exclusion

If requirements not fully met due to work, health, or unforeseen circumstances:
- Pro-rata portion of exclusion may apply

---

## Key Takeaways

1. **Hold >1 year** for preferential LTCG rates (0%, 15%, 20%)
2. **Inherited property**: Step-up to FMV at death (huge benefit)
3. **Wash sale**: 30-day window, substantially identical; loss added to basis
4. **Tax-gain harvest** in 0% bracket years; **tax-loss harvest** to offset gains
5. **Home sale**: $250K/$500K exclusion if owned and lived 2 of 5 years
    `,
    keyTakeaways: [
      "Hold >1 year for LTCG rates (0%, 15%, 20%); collectibles max 28%",
      "Inherited property: Step-up to FMV at death; don't sell appreciated assets before death",
      "Wash sale: 30-day window; loss disallowed but added to new basis",
      "Tax-gain harvest in 0% years; tax-loss harvest to offset gains + $3K income",
      "Home sale exclusion: $250K/$500K if owned/lived 2 of 5 years"
    ],
    keyFormulas: [
      "Gain = Amount Realized - Adjusted Basis",
      "Gift basis: Carryover for gains, FMV at gift for losses",
      "Section 121: $250K single / $500K MFJ exclusion"
    ],
    mnemonics: [
      "Wash Sale = Wait 31 days (can't wash away loss immediately)",
      "Step-Up at Death = SUDdenly tax-free appreciation"
    ],
    practiceProblems: [
      {
        question: "A mother gives stock worth $60,000 (basis $100,000) to her daughter. Daughter sells for $55,000. What is the result?",
        answer: "Gift of loss property: For loss purposes, use FMV at gift ($60,000). Loss = $55,000 - $60,000 = $5,000 loss. (Donor's $100,000 basis is irrelevant for calculating loss.)"
      },
      {
        question: "An investor sells stock for $10,000 loss and buys the same stock in their IRA 15 days later. What happens?",
        answer: "Wash sale. The $10,000 loss is disallowed. Since it's in an IRA, the loss is permanently lost (can't add to IRA basis like taxable account)."
      },
      {
        question: "A married couple has $80,000 ordinary income and $30,000 LTCG. How much of the gain is taxed at 0%?",
        answer: "MFJ 0% threshold is $94,050. Ordinary income fills $80,000. Remaining 0% space = $94,050 - $80,000 = $14,050 of LTCG at 0%. Remaining $15,950 at 15%."
      }
    ],
    relatedLessons: ["CFP-TAX-L002", "CFP-TAX-L001", "CFP-INV-L011"]
  },

  {
    id: "CFP-TAX-L004",
    domain: "CFP-TAX",
    blueprintArea: "TAX-1",
    title: "Alternative Minimum Tax (AMT)",
    order: 4,
    duration: 45,
    objectives: [
      "Explain the AMT calculation process",
      "Identify common AMT preference items and adjustments",
      "Calculate AMT liability",
      "Apply AMT planning strategies"
    ],
    content: `
# Alternative Minimum Tax (AMT)

The **AMT** is a parallel tax system designed to ensure high-income taxpayers pay at least a minimum amount of tax.

---

## Why AMT Exists

### Original Purpose

Prevent wealthy taxpayers from using deductions and preferences to pay little or no tax.

### Current Reality

After TCJA (2017), far fewer taxpayers are subject to AMT:
- Higher exemptions
- SALT cap reduces a major preference
- Still impacts high-income, high-ISO exercise, etc.

---

## AMT Calculation

### The Formula

| Step | Calculation |
|------|-------------|
| 1. Start with taxable income | Regular taxable income |
| 2. Add back AMT adjustments | Disallowed deductions |
| 3. Add AMT preference items | Tax benefits not allowed for AMT |
| = **AMTI** | Alternative Minimum Taxable Income |
| 4. Subtract exemption | Phases out at high income |
| = **AMT base** | Amount subject to AMT rates |
| 5. Apply AMT rates | 26% and 28% |
| = **Tentative Minimum Tax** | Before comparing |
| 6. Pay greater of TMT or regular tax | Only pay AMT if TMT > regular |

---

## AMT Exemption (2024)

| Filing Status | Exemption | Phase-out Begins | Phase-out Complete |
|---------------|-----------|------------------|-------------------|
| Single | $85,700 | $609,350 | $952,150 |
| MFJ | $133,300 | $1,218,700 | $1,751,900 |
| MFS | $66,650 | $609,350 | $876,575 |

### Phase-out Rate

Exemption reduced by **25 cents per dollar** over threshold.

---

## AMT Rates

| Rate | AMTI Range (2024) |
|------|-------------------|
| **26%** | Up to $220,700 (MFJ) / $110,350 (others) |
| **28%** | Above those amounts |

---

## AMT Adjustments

### Added Back to Regular Taxable Income

| Adjustment | AMT Treatment |
|------------|---------------|
| State and local taxes (SALT) | Not deductible for AMT |
| Miscellaneous itemized (pre-TCJA) | Not deductible |
| Standard deduction | Not allowed for AMT |
| Personal exemptions (pre-TCJA) | Not allowed |
| Medical expenses | 7.5% floor still applies |
| Home equity interest (non-acquisition) | Not deductible |

### SALT Is Key

Even with $10,000 cap, adding back SALT is often the largest AMT adjustment.

---

## AMT Preference Items

### Items That Increase AMTI

| Preference | AMT Treatment |
|------------|---------------|
| **ISO spread** | Spread at exercise is preference |
| Private activity bond interest | Taxable for AMT |
| Percentage depletion excess | Added back |
| Pre-1987 accelerated depreciation | Adjusted |
| Certain intangible drilling costs | Adjusted |

### ISO Exercise: Major Trigger

| Event | Regular Tax | AMT |
|-------|-------------|-----|
| ISO exercise | No tax | Spread = preference |
| Sale (qualified) | LTCG on full gain | Credit for prior AMT |

---

## Example: AMT Calculation

| Item | Amount |
|------|--------|
| Regular taxable income | $200,000 |
| State income tax | $12,000 |
| ISO exercise spread | $80,000 |
| **AMTI** | $200,000 + $12,000 + $80,000 = $292,000 |
| Less: Exemption (MFJ) | ($133,300) |
| **AMT base** | $158,700 |
| AMT (26% × $158,700) | $41,262 |
| Regular tax (assume) | $35,000 |
| **AMT owed** | $41,262 - $35,000 = $6,262 |

---

## AMT Credit

### How It Works

AMT paid due to **timing differences** (like ISOs) creates a credit:
- Used against regular tax in future years
- When regular tax > TMT
- Carries forward indefinitely

### Timing vs. Permanent

| Type | Creates Credit? |
|------|-----------------|
| ISO exercise (timing) | Yes |
| SALT deduction (permanent) | No |
| Private activity bonds | Depends |

---

## AMT Planning Strategies

### Before Year-End

| Strategy | Action |
|----------|--------|
| **Defer ISO exercise** | Spread across years |
| **Calculate AMT exposure** | Before making decisions |
| **Bunch deductions** | If near AMT threshold |
| **Consider SALT timing** | Property tax payments |

### For ISOs

| Strategy | Purpose |
|----------|---------|
| Model scenarios | Know AMT impact before exercising |
| Same-year sale | Disqualifying disposition avoids AMT |
| Multi-year exercise | Stay below AMT threshold |
| Set aside cash | For AMT payment |

---

## Key Takeaways

1. **AMT** = Parallel system; pay greater of AMT or regular tax
2. **AMTI** = Regular taxable income + adjustments + preferences
3. **Main triggers**: ISO exercise, SALT (though capped), private activity bonds
4. **Exemption phases out** at 25% rate over threshold
5. **AMT credit**: Recovers timing-related AMT when regular tax exceeds TMT
    `,
    keyTakeaways: [
      "AMT = Pay greater of tentative minimum tax or regular tax",
      "AMTI = Taxable income + adjustments (SALT) + preferences (ISOs)",
      "Main triggers: ISO exercise spread, SALT, private activity bond interest",
      "Exemption phases out at 25 cents per dollar above threshold",
      "AMT credit for timing items (ISOs); recovered when regular tax > TMT"
    ],
    keyFormulas: [
      "AMTI = Taxable Income + Adjustments + Preferences",
      "AMT = (AMTI - Exemption) × 26%/28%",
      "Pay: MAX(Regular Tax, Tentative Minimum Tax)"
    ],
    mnemonics: [
      "AMT = Always More Tax (when it applies)",
      "ISO AMT: Spread at exercise = Preference (until credit recovered)"
    ],
    practiceProblems: [
      {
        question: "A taxpayer exercises ISOs with $50,000 spread. How does this affect AMT?",
        answer: "The $50,000 spread is an AMT preference item added to AMTI. No regular tax at exercise, but AMT may be triggered. If AMT is paid, an AMT credit is created for recovery in future years."
      },
      {
        question: "A married couple has $150,000 taxable income and $15,000 SALT deduction (before cap). What's their likely AMT adjustment?",
        answer: "SALT is capped at $10,000 for regular tax. For AMT, even the $10,000 is added back. AMT adjustment for SALT = $10,000."
      },
      {
        question: "Why don't as many taxpayers owe AMT after TCJA?",
        answer: "TCJA (2017) significantly increased AMT exemptions and the SALT cap reduced a major preference item. Higher regular tax deduction limits also mean fewer people reach AMT threshold."
      }
    ],
    relatedLessons: ["CFP-TAX-L001", "CFP-RET-L014", "CFP-TAX-L003"]
  }
];

export default CFP_TAX1_LESSONS;
