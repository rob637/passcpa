/**
 * CFP Domain 5: Tax Planning
 * Area TAX-2: Tax Planning Strategies
 * 
 * These lessons cover tax planning strategies including
 * business taxes, education credits, and tax credits.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_TAX2_LESSONS: CFPLesson[] = [
  {
    id: "CFP-TAX-L005",
    domain: "CFP-TAX",
    blueprintArea: "TAX-2",
    title: "Business Entity Taxation",
    order: 5,
    duration: 55,
    objectives: [
      "Compare tax treatment of different business entities",
      "Calculate self-employment tax",
      "Apply the qualified business income deduction",
      "Evaluate entity selection for tax efficiency"
    ],
    content: `
# Business Entity Taxation

Understanding how different business entities are taxed is essential for advising business owner clients.

---

## Business Entity Overview

| Entity | Taxation Level | Self-Employment Tax | Liability Protection |
|--------|----------------|--------------------|--------------------|
| **Sole proprietorship** | Individual (Schedule C) | Yes | None |
| **Partnership** | Pass-through (K-1) | Active partners: Yes | General: None; Limited: Yes |
| **LLC** | Flexible (default pass-through) | Depends | Yes |
| **S Corporation** | Pass-through (K-1) | On wages only | Yes |
| **C Corporation** | Double (entity + dividend) | No (wages subject to FICA) | Yes |

---

## Sole Proprietorship

### Taxation

| Item | Treatment |
|------|-----------|
| Business income | Schedule C → Form 1040 |
| Losses | Offset other income |
| Self-employment tax | 15.3% on net earnings |
| Health insurance | Above-the-line deduction |

### SE Tax Calculation

$$\\text{SE Tax} = \\text{Net SE Income} \\times 92.35\\% \\times 15.3\\%$$

**Half of SE tax** is deductible above the line.

---

## Partnership

### Pass-Through Taxation

| Event | Tax Treatment |
|-------|---------------|
| Formation | Generally tax-free |
| Operating income | Passes to partners (K-1) |
| Guaranteed payments | Ordinary income to recipient |
| Distributions | Generally tax-free (basis adjustment) |
| Sale of interest | Capital gain on appreciation |

### Partner's Basis

| Increases | Decreases |
|-----------|-----------|
| Contributions | Distributions |
| Share of income | Share of losses |
| Share of liabilities | Liability reductions |

---

## S Corporation

### Requirements

| Requirement | Limit |
|-------------|-------|
| Shareholders | 100 maximum |
| Shareholder type | Individuals, estates, certain trusts |
| Stock classes | One class only |
| Citizenship | US residents/citizens only |

### Key Tax Benefit

| Item | Taxation |
|------|----------|
| Reasonable salary | Subject to FICA/payroll |
| Pass-through income | NOT subject to SE tax |

### Example

S Corp earns $200,000. Owner takes:
- $80,000 salary → Subject to FICA (7.65% × 2 = 15.3%)
- $120,000 distribution → No SE/FICA tax

**Savings**: $120,000 × 15.3% = $18,360 in SE tax avoided

### Reasonable Compensation

IRS scrutinizes low salaries:
- Must be reasonable for services performed
- Penalties if compensation appears artificially low

---

## C Corporation

### Double Taxation

| Level | Tax |
|-------|-----|
| Corporate income | 21% flat rate |
| Shareholder dividend | 0-23.8% (qualified) |

### Example: Double Tax Effect

| Step | Amount |
|------|--------|
| Corporate profit | $100,000 |
| Corporate tax (21%) | ($21,000) |
| After-tax to distribute | $79,000 |
| Dividend tax (20%) | ($15,800) |
| Net to shareholder | $63,200 |
| **Effective rate** | 36.8% |

### When C Corp Makes Sense

| Situation | Why |
|-----------|-----|
| Retain earnings | 21% rate lower than individual rates |
| Reinvest in business | Defer dividend tax |
| Many shareholders | No S Corp restrictions |
| Foreign ownership | S Corp not available |

---

## Qualified Business Income (QBI) Deduction

### Section 199A Overview

Allows up to **20% deduction** on qualified business income from pass-through entities.

### Calculation

$$\\text{QBI Deduction} = 20\\% \\times \\text{QBI}$$

### Limitations (High Income)

| Filing Status | Threshold | Phase-out Complete |
|---------------|-----------|-------------------|
| Single | $191,950 | $241,950 |
| MFJ | $383,900 | $483,900 |

### Above Threshold Limits

| Limit Type | Formula |
|------------|---------|
| **W-2 wages limit** | Greater of: 50% of W-2 wages OR 25% of wages + 2.5% of qualified property |
| **SSTB limit** | Specified service trades phase out entirely |

### Specified Service Trades or Businesses (SSTBs)

| SSTB (Limited) | Non-SSTB (Not Limited) |
|----------------|------------------------|
| Accounting | Engineering |
| Law | Architecture |
| Financial services | Manufacturing |
| Consulting | Construction |
| Health | Real estate |
| Athletics | |

SSTBs completely lose QBI deduction above phase-out threshold.

---

## Entity Selection Factors

### Tax Considerations

| Factor | Best Entity |
|--------|-------------|
| Minimize SE tax | S Corp |
| Retain earnings at low rate | C Corp |
| Maximum flexibility | LLC (choose taxation) |
| QBI deduction | Pass-through |
| Loss utilization | Pass-through |

### Non-Tax Factors

| Factor | Consideration |
|--------|---------------|
| Liability protection | Corp or LLC |
| Simplicity | Sole prop |
| Raising capital | C Corp |
| State taxes | Vary by entity |

---

## Key Takeaways

1. **Sole prop**: Simple but full SE tax exposure (15.3%)
2. **S Corp**: Save SE tax on distributions; must pay reasonable wages
3. **C Corp**: 21% entity tax + dividend tax; good for retained earnings
4. **QBI deduction**: 20% of pass-through income (limits at high income)
5. **SSTBs** (law, accounting, health) lose QBI deduction above threshold
    `,
    keyTakeaways: [
      "Sole prop: Schedule C, 15.3% SE tax on all net income",
      "S Corp: Wages = FICA; distributions = no SE tax (reasonable comp required)",
      "C Corp: 21% entity tax + shareholder dividend tax (potential double taxation)",
      "QBI deduction: 20% of pass-through income; high-income limits apply",
      "SSTBs (law, accounting, consulting, health) phase out of QBI entirely"
    ],
    keyFormulas: [
      "SE Tax = Net SE Income × 92.35% × 15.3%",
      "QBI Deduction = MIN(20% of QBI, limits if applicable)",
      "W-2 Limit = Greater of (50% W-2 wages) or (25% wages + 2.5% property)"
    ],
    mnemonics: [
      "S Corp = Save on SE tax (on distributions)",
      "SSTB = Services Subject To Being reduced (QBI phase-out)"
    ],
    practiceProblems: [
      {
        question: "A sole proprietor has $100,000 net Schedule C income. What is their SE tax?",
        answer: "SE Tax = $100,000 × 92.35% × 15.3% = $14,130. Half ($7,065) is deductible above the line."
      },
      {
        question: "An S Corp owner takes $60,000 salary and $90,000 K-1 distribution. How much is subject to payroll tax?",
        answer: "Only the $60,000 salary is subject to FICA (15.3% total). The $90,000 distribution is not subject to SE tax—this is the S Corp advantage."
      },
      {
        question: "A married attorney (SSTB) has $500,000 QBI. Can they take the QBI deduction?",
        answer: "No. At $500,000, they are above the $483,900 full phase-out threshold for MFJ. SSTBs receive no QBI deduction above this limit."
      }
    ],
    relatedLessons: ["CFP-TAX-L001", "CFP-RET-L015", "CFP-TAX-L002"]
  },

  {
    id: "CFP-TAX-L006",
    domain: "CFP-TAX",
    blueprintArea: "TAX-2",
    title: "Education Tax Benefits",
    order: 6,
    duration: 45,
    objectives: [
      "Compare education tax credits and deductions",
      "Apply AOTC and LLC requirements",
      "Coordinate education benefits to maximize tax savings",
      "Evaluate 529 plan taxation and benefits"
    ],
    content: `
# Education Tax Benefits

Multiple tax benefits exist for education expenses. Understanding their requirements and coordination is key.

---

## Education Tax Credits

### American Opportunity Tax Credit (AOTC)

| Feature | Detail |
|---------|--------|
| **Maximum credit** | $2,500/student |
| **Calculation** | 100% of first $2,000 + 25% of next $2,000 |
| **Refundable** | 40% ($1,000 max) |
| **Years available** | First 4 years of post-secondary |
| **Enrollment** | At least half-time |
| **Felony drug conviction** | Disqualifies |

### AOTC Income Phase-out (2024)

| Filing Status | Phase-out Range |
|---------------|-----------------|
| Single | $80,000-$90,000 |
| MFJ | $160,000-$180,000 |

### Lifetime Learning Credit (LLC)

| Feature | Detail |
|---------|--------|
| **Maximum credit** | $2,000/return (not per student) |
| **Calculation** | 20% of first $10,000 expenses |
| **Refundable** | No |
| **Years available** | Unlimited |
| **Enrollment** | At least one course |
| **Graduate school** | Eligible |

### LLC Income Phase-out (2024)

| Filing Status | Phase-out Range |
|---------------|-----------------|
| Single | $80,000-$90,000 |
| MFJ | $160,000-$180,000 |

---

## AOTC vs. LLC Comparison

| Feature | AOTC | LLC |
|---------|------|-----|
| Max credit | $2,500/student | $2,000/return |
| Partially refundable | Yes (40%) | No |
| Years of school | First 4 | Unlimited |
| Enrollment | Half-time+ | Any amount |
| Graduate school | No | Yes |
| Per student | Yes | No (per return) |

### When to Use Each

| Situation | Best Choice |
|-----------|-------------|
| Undergraduate, years 1-4 | AOTC |
| Graduate school | LLC |
| Part-time student | LLC |
| 5th+ year undergrad | LLC |
| Low tax liability | AOTC (refundable) |

---

## Qualified Education Expenses

### Eligible Expenses

| Expense | AOTC | LLC |
|---------|------|-----|
| Tuition | Yes | Yes |
| Fees | Yes | Yes |
| Books/supplies | Yes | Yes (if required) |
| Equipment | Yes | Yes (if required) |
| Room and board | No | No |

### Adjustments

Must reduce expenses by:
- Tax-free scholarships
- Tax-free 529/Coverdell distributions
- Other tax-free educational assistance

---

## 529 Plans

### Tax Treatment

| Event | Federal Tax | State Tax |
|-------|-------------|-----------|
| Contribution | No deduction | Many states allow |
| Growth | Tax-deferred | Tax-deferred |
| Qualified distribution | Tax-free | Tax-free |
| Non-qualified distribution | Earnings taxed + 10% penalty | Varies |

### Qualified Expenses

| Expense | Qualified? |
|---------|-----------|
| Tuition (any level) | Yes |
| K-12 tuition | Yes ($10,000/year max) |
| Room and board | Yes (if at least half-time) |
| Books and supplies | Yes |
| Computer and internet | Yes |
| Student loan repayment | Yes ($10,000 lifetime) |

### Superfunding

Can contribute 5 years of annual exclusion at once:
- $90,000 single / $180,000 married (2024)
- Must not give additional gifts to beneficiary for 5 years

---

## Coverdell Education Savings Account

### Features

| Feature | Detail |
|---------|--------|
| Annual contribution limit | $2,000/beneficiary |
| Tax treatment | Tax-free growth and distributions |
| Expenses | K-12 and higher education |
| Age limit | Must use by age 30 |
| Income phase-out | $95K-$110K single / $190K-$220K MFJ |

### 529 vs. Coverdell

| Feature | 529 | Coverdell |
|---------|-----|-----------|
| Contribution limit | Unlimited (gift tax may apply) | $2,000/year |
| K-12 | Yes ($10K tuition) | Yes (any expense) |
| State deduction | Often | No |
| Income limits | None | Yes |

---

## Coordination Rules

### Cannot Double-Dip

Same expenses cannot qualify for multiple benefits:
- Credit AND 529 distribution on same expense
- Credit AND employer educational assistance on same expense

### Strategy: Allocate Expenses

| Source | Expense Allocation |
|--------|-------------------|
| First $4,000 | Pay out-of-pocket → claim AOTC |
| Additional | 529 distribution → tax-free |
| Graduate school | 529 or LLC |

### Example

Student has $15,000 expenses:
- $4,000 paid from savings → $2,500 AOTC
- $11,000 from 529 → tax-free distribution
- **Total tax benefit**: $2,500 credit + tax-free 529

---

## Student Loan Interest Deduction

### Features

| Feature | Detail |
|---------|--------|
| Maximum deduction | $2,500 |
| Type | Above-the-line |
| Income phase-out (2024) | $75K-$90K single / $155K-$185K MFJ |
| Loan requirements | Qualified education loans |

---

## Key Takeaways

1. **AOTC**: $2,500/student, 4 years undergrad, 40% refundable
2. **LLC**: $2,000/return, unlimited years, grad school OK
3. **529**: Tax-free growth, qualified distributions; K-12 ($10K) + higher ed
4. **Don't double-dip**: Same expenses can't get credit + 529 + other benefits
5. **Strategy**: Use taxable funds for credit, 529 for remaining expenses
    `,
    keyTakeaways: [
      "AOTC: $2,500/student, first 4 years, 40% refundable, half-time+",
      "LLC: $2,000/return, unlimited years, any enrollment, grad school OK",
      "529: No federal deduction, tax-free qualified distributions, K-12 + higher ed",
      "Cannot double-dip: Same expense can't qualify for multiple benefits",
      "Strategy: Pay $4K from taxable (AOTC), rest from 529 (tax-free)"
    ],
    keyFormulas: [
      "AOTC = 100% × first $2,000 + 25% × next $2,000 = $2,500 max",
      "LLC = 20% × first $10,000 expenses = $2,000 max",
      "529 K-12 limit = $10,000/year tuition"
    ],
    mnemonics: [
      "AOTC = Awesome Opportunity for The College-bound (4 years, refundable)",
      "LLC = Lifelong Learning Credit (graduate school OK)"
    ],
    practiceProblems: [
      {
        question: "A junior in college has $12,000 tuition. Parents have a 529 with ample funds. How should expenses be allocated?",
        answer: "Pay $4,000 from taxable funds → Claim AOTC ($2,500 credit). Distribute $8,000 from 529 → Tax-free. Cannot use 529 for the $4,000 AOTC expenses."
      },
      {
        question: "A graduate student has $8,000 tuition. Can they use AOTC?",
        answer: "No. AOTC is only for the first four years of post-secondary education. Graduate students can use LLC (20% × $8,000 = $1,600 credit) or 529 distributions."
      },
      {
        question: "A parent wants to fund a 529 with $90,000 at once. What are the gift tax implications?",
        answer: "They can use superfunding: Treat as 5-year gift ($90,000 ÷ 5 = $18,000/year). No gift tax if they elect on Form 709 and make no additional gifts to that beneficiary for 5 years."
      }
    ],
    relatedLessons: ["CFP-GEN-L004", "CFP-TAX-L001", "CFP-TAX-L007"]
  },

  {
    id: "CFP-TAX-L007",
    domain: "CFP-TAX",
    blueprintArea: "TAX-2",
    title: "Tax Credits and Deductions",
    order: 7,
    duration: 50,
    objectives: [
      "Distinguish refundable from non-refundable credits",
      "Apply child-related tax credits and phase-outs",
      "Utilize retirement savings and other tax credits",
      "Maximize available deductions and credits"
    ],
    content: `
# Tax Credits and Deductions

Tax credits provide dollar-for-dollar tax reduction—more valuable than deductions of equal amount.

---

## Refundable vs. Non-Refundable Credits

### Key Difference

| Type | Can Exceed Tax Liability? |
|------|--------------------------|
| **Refundable** | Yes—excess becomes refund |
| **Non-refundable** | No—reduces tax to $0 only |

### Common Credits by Type

| Refundable | Non-Refundable |
|------------|----------------|
| Earned Income Credit | Child and dependent care credit |
| Child Tax Credit (partially) | Lifetime Learning Credit |
| AOTC (40%) | Foreign tax credit |
| Premium Tax Credit | Adoption credit |
| | Retirement savings credit |

---

## Child Tax Credit (CTC)

### 2024 Rules

| Feature | Detail |
|---------|--------|
| Credit amount | $2,000/qualifying child |
| Refundable portion | Up to $1,700 |
| Child age limit | Under 17 |
| SSN requirement | Child must have SSN |

### Income Phase-out

| Filing Status | Phase-out Begins |
|---------------|------------------|
| MFJ | $400,000 |
| Single/HOH | $200,000 |

Credit reduces by $50 per $1,000 over threshold.

### Other Dependents Credit

$500/qualifying relative or older dependent (non-refundable, same phase-out).

---

## Child and Dependent Care Credit

### For Working Parents

| Feature | Detail |
|---------|--------|
| Maximum expenses | $3,000 (1 child) / $6,000 (2+ children) |
| Credit percentage | 20-35% based on income |
| Refundable | No |

### Expense Limits

| AGI | Credit Percentage |
|-----|-------------------|
| $0-$15,000 | 35% |
| $15,001-$43,000 | Phases down |
| $43,001+ | 20% |

### Maximum Credit

- 1 child: $3,000 × 35% = $1,050 (max)
- 2+ children: $6,000 × 35% = $2,100 (max)
- At 20% (most taxpayers): $600 / $1,200

---

## Earned Income Credit (EIC)

### For Low-to-Moderate Income Workers

| Feature | Detail |
|---------|--------|
| Refundable | Fully |
| Phase-in | Credit increases with earnings |
| Maximum (2024, 3+ children) | ~$7,830 |
| Investment income limit | $11,600 |

### Maximum EIC by Children (2024 approximate)

| Children | Maximum Credit | Max Income (MFJ) |
|----------|----------------|------------------|
| 0 | ~$632 | ~$17,600 |
| 1 | ~$4,213 | ~$51,500 |
| 2 | ~$6,960 | ~$57,400 |
| 3+ | ~$7,830 | ~$61,600 |

### Key Requirements

- Must have earned income
- Valid SSN for taxpayer, spouse, children
- Cannot be dependent of another
- Investment income limit

---

## Saver's Credit (Retirement Savings Credit)

### For Low-to-Moderate Income Retirement Savers

| Feature | Detail |
|---------|--------|
| Credit rate | 10%, 20%, or 50% of contributions |
| Maximum contribution qualifying | $2,000/person ($4,000 MFJ) |
| Maximum credit | $1,000/person ($2,000 MFJ) |
| Refundable | No |

### Credit Rate by Income (2024 MFJ)

| AGI | Credit Rate |
|-----|-------------|
| $0-$46,000 | 50% |
| $46,001-$50,000 | 20% |
| $50,001-$76,500 | 10% |
| $76,501+ | 0% |

### Eligible Contributions

- Traditional/Roth IRA
- 401(k), 403(b), 457
- SIMPLE, SEP
- ABLE accounts

---

## Adoption Credit

### For Adoption Expenses

| Feature | Detail (2024) |
|---------|---------------|
| Maximum credit | $16,810 |
| Expenses | Court costs, attorney fees, travel |
| Special needs child | Full credit regardless of expenses |
| Refundable | No |

### Income Phase-out (2024)

Begins: $252,150
Complete: $292,150

---

## Premium Tax Credit

### For Health Insurance Marketplace

| Feature | Detail |
|---------|--------|
| Purpose | Subsidize marketplace premiums |
| Calculation | Benchmark - Expected contribution |
| Refundable | Yes |
| Reconciled | On tax return |

### Who Qualifies

- Income 100-400% FPL (expanded temporarily)
- Not eligible for employer coverage or Medicare
- Enrolled through Marketplace

---

## Foreign Tax Credit

### For Taxes Paid to Foreign Governments

| Feature | Detail |
|---------|--------|
| Purpose | Avoid double taxation |
| Limit | US tax on foreign source income |
| Carryback/forward | 1 year back, 10 years forward |
| Form | 1116 (or simplified method) |

### Alternative: Deduction

Can deduct foreign taxes instead—usually credit is better.

---

## Planning with Credits

### Strategies

| Strategy | Application |
|----------|-------------|
| **Time income** | Stay below phase-out thresholds |
| **Maximize contributions** | Saver's credit |
| **Claim all dependents** | CTC, ODC |
| **Track all expenses** | Dependent care, adoption |
| **Coordinate benefits** | Don't double-dip |

---

## Key Takeaways

1. **Credits > Deductions**: Dollar-for-dollar vs. marginal rate
2. **Refundable credits** create refund if exceeding tax (EIC, partial CTC, AOTC)
3. **Child Tax Credit**: $2,000/child under 17; $1,700 refundable; high phase-out
4. **Saver's Credit**: 10-50% of up to $2,000 contributions if income qualifies
5. **EIC**: Largest refundable credit for low-income workers with children
    `,
    keyTakeaways: [
      "Credits reduce tax dollar-for-dollar; deductions only at marginal rate",
      "Refundable credits (EIC, partial CTC, AOTC) can create refunds",
      "CTC: $2,000/child under 17; $1,700 refundable; $400K phase-out (MFJ)",
      "Saver's Credit: 10-50% of up to $2,000 retirement contributions",
      "EIC: Up to ~$7,830 for low-income workers with 3+ children"
    ],
    keyFormulas: [
      "CTC = $2,000/child - ($50 per $1,000 over threshold)",
      "Saver's Credit = Credit Rate × MIN(Contributions, $2,000)",
      "Child Care Credit = Expenses × 20-35% (max $3K/$6K)"
    ],
    mnemonics: [
      "EIC = Earn Income, Claim credit (must have earned income)",
      "Saver's = Save and get credit (double benefit)"
    ],
    practiceProblems: [
      {
        question: "A married couple with AGI $420,000 has two children under 17. What is their CTC?",
        answer: "Over threshold by $20,000 ($420K - $400K). Reduction = 20 × $50 = $1,000. Original: 2 × $2,000 = $4,000. Final CTC = $4,000 - $1,000 = $3,000."
      },
      {
        question: "A single filer with $40,000 AGI contributes $3,000 to her 401(k). What is her Saver's Credit?",
        answer: "At $40,000 single, rate is 20% (between $23,001-$25,000 threshold). Credit = 20% × $2,000 (max) = $400."
      },
      {
        question: "What is the key difference between the AOTC and other education credits?",
        answer: "AOTC is 40% refundable (up to $1,000). LLC is non-refundable. AOTC can create a refund even if tax liability is zero; LLC cannot."
      }
    ],
    relatedLessons: ["CFP-TAX-L001", "CFP-TAX-L006", "CFP-RET-L005"]
  },

  {
    id: "CFP-TAX-L008",
    domain: "CFP-TAX",
    blueprintArea: "TAX-2",
    title: "Tax Planning Strategies and Timing",
    order: 8,
    duration: 50,
    objectives: [
      "Apply income shifting and timing strategies",
      "Evaluate bunching strategies for deductions",
      "Integrate tax planning with financial planning",
      "Develop year-end tax planning approaches"
    ],
    content: `
# Tax Planning Strategies and Timing

Effective tax planning involves timing income and deductions to minimize lifetime taxes.

---

## Core Tax Planning Strategies

### The Fundamentals

| Strategy | Description |
|----------|-------------|
| **Deferral** | Postpone income to later years |
| **Acceleration** | Recognize income in current year |
| **Shifting** | Move income to lower-bracket taxpayer |
| **Conversion** | Change income character (ordinary → capital) |

---

## Income Timing

### Deferral Strategies

| Strategy | How It Works |
|----------|--------------|
| Maximize 401(k)/IRA | Reduce current AGI |
| Defer bonuses | Receive in January vs. December |
| Installment sales | Spread gain over multiple years |
| Defer Roth conversions | Wait for low-income year |
| Like-kind exchanges | Defer gain on real estate |

### When to Accelerate Income

| Situation | Why Accelerate |
|-----------|----------------|
| Currently low tax bracket | Lock in lower rates |
| Expecting higher rates | Pay now at lower rate |
| Expiring NOL | Use losses before they expire |
| Roth conversions | During low-income retirement years |

---

## Deduction Timing

### Bunching Strategy

Alternate years to exceed standard deduction threshold.

### Example

| Year | Natural Itemized | Strategy | Result |
|------|-----------------|----------|--------|
| 2024 | $11,000 | Prepay $8,000 to 2024 | $19,000 itemized |
| 2025 | $11,000 | Reduce by $8,000 | Standard ($14,600) |

**Without bunching**: Standard deduction both years = $29,200 total
**With bunching**: $19,000 + $14,600 = $33,600 total

**Extra deduction**: $4,400

### What Can Be Bunched

| Deductible | Timing Flexibility |
|------------|-------------------|
| Charitable contributions | Prepay or DAF |
| Property taxes | December vs. January |
| Medical expenses | Procedure timing |
| State estimated payments | Q4 in December |

---

## Donor Advised Fund (DAF) Strategy

### How It Works

1. Contribute lump sum to DAF in high-income year
2. Get full deduction in contribution year
3. Distribute to charities over time
4. Growth is tax-free

### Example

Goal: Give $10,000/year to charity

**Traditional**: $10,000 deduction annually (may not exceed standard)

**DAF**: Contribute $50,000 in Year 1, distribute $10,000/year
- Year 1: $50,000 deduction (exceeds standard by $35,400)
- Years 2-5: Standard deduction

### Benefits

- Large deduction in high-income year
- Continued charitable giving
- Investment growth tax-free

---

## Income Shifting

### Between Family Members

| Method | Consideration |
|--------|---------------|
| Employ family members | Must be reasonable compensation |
| Gift income-producing assets | Kiddie tax rules apply |
| Family limited partnerships | Valuation discounts |
| Trusts | Complex rules, irrevocable |

### Kiddie Tax

Unearned income of children taxed at parent's rate:
- Applies to children under 19 (or under 24 if student)
- 2024: First $1,300 tax-free, next $1,300 at child's rate
- Excess at parent's rate

---

## Character Conversion

### Strategies

| Strategy | Effect |
|----------|--------|
| **Hold investments >1 year** | LTCG vs. ordinary |
| **Qualified dividends** | 60+ day holding for preferential rate |
| **Section 1202 stock** | Up to 100% exclusion on QSBS |
| **Installment sale** | Spread ordinary into capital |
| **Charitable remainder trusts** | Convert appreciated assets |

---

## Year-End Tax Planning Checklist

### Before December 31

| Action | Purpose |
|--------|---------|
| Maximize retirement contributions | Reduce AGI |
| Tax-loss harvesting | Offset gains |
| Bunch deductions (if beneficial) | Exceed standard |
| Make charitable gifts | Deduction + appreciated asset strategy |
| Required distributions | RMDs if required |
| HSA contributions | Above-the-line deduction |
| Review estimated taxes | Avoid penalty |
| Roth conversions | If in low bracket |

### For Business Owners

| Action | Purpose |
|--------|---------|
| Bonus depreciation | Accelerate equipment deductions |
| Defer income | If expecting lower future rate |
| Accelerate expenses | Prepay deductible items |
| Review entity structure | S Corp salary, QBI optimization |

---

## Multi-Year Tax Planning

### Consider Lifetime Taxes

| Short-Term View | Long-Term View |
|-----------------|----------------|
| Minimize this year's tax | Minimize lifetime taxes |
| Defer everything | Strategic recognition |
| Ignore future rates | Consider rate changes |

### Example: Roth Conversion

| Year | Action | Impact |
|------|--------|--------|
| Early retirement (low income) | Convert $50K/year | Fill 12% bracket |
| Later (with RMDs + SS) | No conversion | Would be 24% bracket |
| **Net effect** | Pay 12% now | Avoid 24%+ later |

---

## Integration with Financial Planning

### Tax Planning Touchpoints

| Financial Goal | Tax Consideration |
|----------------|-------------------|
| Retirement | Traditional vs. Roth, RMDs |
| Education | 529 vs. AOTC coordination |
| Estate | Stepped-up basis, lifetime giving |
| Insurance | Premium tax credit, LTCI |
| Investments | Location, loss harvesting |

---

## Key Takeaways

1. **Defer** income when expecting lower future rates; **accelerate** when opposite
2. **Bunch** deductions in alternating years to exceed standard threshold
3. **DAF** enables large deduction now with charitable giving over time
4. **Character conversion**: Hold >1 year for LTCG; qualified dividends require 60 days
5. **Year-end checklist**: Retirement contributions, tax-loss harvest, RMDs, Roth conversions
    `,
    keyTakeaways: [
      "Defer income expecting lower rates; accelerate expecting higher rates",
      "Bunch deductions in alternating years to exceed standard deduction",
      "DAF: Large deduction now, distribute to charities over time",
      "Convert character: Hold >1 year for LTCG; 60+ days for qualified dividends",
      "Year-end: Max retirement, tax-loss harvest, charitable gifts, Roth conversions"
    ],
    keyFormulas: [
      "Bunching benefit = Itemized Year 1 + Standard Year 2 - (Standard × 2)",
      "Tax savings = Shifted Income × (Higher Rate - Lower Rate)"
    ],
    mnemonics: [
      "TAX = Timing, Amount, and eXception planning",
      "DAF = Donate All Funds (now), Distribute At leisure (later)"
    ],
    practiceProblems: [
      {
        question: "A couple normally has $12,000 in itemized deductions annually. The standard deduction is $29,200 MFJ. How can bunching help?",
        answer: "Bunch two years: $24,000 in Year 1 (prepay charity, property tax). Year 1: itemize $24,000 (loses to standard). This doesn't help. Alternative: Give to DAF to make Year 1 exceed $29,200. With $12K + $20K DAF = $32K, itemize in Year 1, standard in Year 2. Benefit: $32K + $29.2K = $61.2K vs. 2 × $29.2K = $58.4K. Extra: $2,800."
      },
      {
        question: "A retiree is 62 with no earned income and $40,000 from investments. Should they do a Roth conversion?",
        answer: "Yes, likely. At $40,000 income, they're in a low bracket (12%). Converting IRA to Roth now at 12% may avoid higher rates later when Social Security begins and RMDs add income. Fill up the 12% bracket with conversions."
      },
      {
        question: "What is the kiddie tax, and when does it apply?",
        answer: "Kiddie tax taxes a child's unearned income above $2,600 (2024) at the parent's marginal rate. Applies to children under 19, or under 24 if full-time student. Limits benefit of shifting investment income to children."
      }
    ],
    relatedLessons: ["CFP-TAX-L001", "CFP-TAX-L003", "CFP-RET-L016"]
  }
];

export default CFP_TAX2_LESSONS;
