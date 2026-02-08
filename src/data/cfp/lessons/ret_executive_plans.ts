/**
 * CFP Domain 6: Retirement Savings and Income Planning
 * Area RET-4: Executive and Non-Qualified Plans
 * 
 * These lessons cover non-qualified deferred compensation,
 * stock options, RSUs, and executive compensation.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_RET4_LESSONS: CFPLesson[] = [
  {
    id: "CFP-RET-L013",
    domain: "CFP-RET",
    blueprintArea: "RET-4",
    title: "Non-Qualified Deferred Compensation Plans",
    order: 13,
    duration: 50,
    objectives: [
      "Distinguish qualified from non-qualified plans",
      "Explain Section 409A requirements",
      "Identify NQDC risks and planning considerations",
      "Apply SERP and Top Hat plan concepts"
    ],
    content: `
# Non-Qualified Deferred Compensation Plans

**Non-qualified deferred compensation (NQDC)** plans allow executives to defer income beyond qualified plan limits—but with significant risks.

---

## Qualified vs. Non-Qualified Plans

| Feature | Qualified Plans | NQDC Plans |
|---------|-----------------|------------|
| **ERISA coverage** | Yes | Limited |
| **Tax deduction timing** | When contributed | When paid to employee |
| **Contribution limits** | Statutory limits | None |
| **Discrimination testing** | Required | Not required |
| **Vesting rules** | 3-7 years max | Any schedule |
| **Creditor protection** | Protected | **NOT protected** |
| **Employer deduction** | When contributed | When included in income |

---

## Why Employers Use NQDC

### For Executives

- Defer income beyond 401(k)/$69,000 limits
- Tax benefits if expecting lower future bracket
- Attractive retention tool

### For Employers

- No cost until payment (deduction timing matches income)
- Can discriminate (only for select executives)
- "Golden handcuffs" for retention

---

## The Fundamental Risk: Unsecured Promise

### You Are a General Creditor

NQDC is an **unsecured promise** to pay in the future.

If employer is insolvent:
- Executives stand in line with other creditors
- Not protected like qualified plan assets
- May receive pennies on the dollar (or nothing)

### The "Constructive Receipt" Trade-off

To avoid current taxation:
- Funds cannot be in a trust for the employee's exclusive benefit
- Must be subject to employer's creditors
- You're trading security for tax deferral

---

## Section 409A Requirements

After Enron collapse, Congress enacted Section 409A (2004):

### Mandatory Rules

| Requirement | Description |
|-------------|-------------|
| **Election timing** | Deferral elections before year income is earned |
| **Distribution triggers** | Limited to 6 events |
| **Acceleration** | Generally prohibited |
| **Funding** | Cannot be secured in offshore trust |

### Six Permitted Distribution Events

1. **Separation from service**
2. **Disability**
3. **Death**
4. **Change in ownership/control**
5. **Unforeseeable emergency**
6. **Specified date or fixed schedule**

---

## 409A Violation Penalties

If plan fails to comply:

| Consequence | Amount |
|-------------|--------|
| **Immediate income inclusion** | All vested deferrals |
| **Income tax** | At ordinary rates |
| **Additional tax** | **20%** penalty |
| **Interest** | On underpayment from deferral year |

> **Severe penalties** make 409A compliance critical.

---

## Types of NQDC Arrangements

### SERP (Supplemental Executive Retirement Plan)

- Employer-funded only
- Provides additional retirement benefits
- Often formula-based (like DB plan)
- Common: 60% of final pay minus qualified plan benefits

### Excess Benefit Plan

- Makes up for qualified plan limits
- Provides benefit that would have accrued absent 401(a) limits
- Exempt from most ERISA requirements

### Top Hat Plan

- Unfunded, non-qualified plan
- For select management or highly compensated
- Subject to limited ERISA (reporting/disclosure)

### Elective Deferral Plan

- Executive chooses to defer salary/bonus
- Pre-tax deferral into NQDC
- Separate from qualified plan contributions

---

## Planning Considerations

### When NQDC Makes Sense

| Situation | Why |
|-----------|-----|
| **Very high income now** | Lower tax rate expected later |
| **Strong employer** | Low bankruptcy risk |
| **Retirement timing certain** | Know when you need funds |
| **Long tenure expected** | Will reach vesting |

### When to Limit NQDC

| Situation | Why |
|-----------|-----|
| **Employer financial concerns** | Risk of losing deferrals |
| **Similar current vs. future tax rate** | Limited benefit |
| **Uncertain tenure** | May forfeit if leaving early |
| **Need liquidity** | Funds are locked up |

---

## Rabbi Trust

### What It Is

An irrevocable trust to hold NQDC assets, BUT:
- Assets remain subject to **employer's creditors** in bankruptcy
- Provides protection against corporate changes (mergers, management changes)
- Does NOT protect against employer insolvency

### Why "Rabbi" Trust?

First IRS ruling was for a synagogue rabbi's deferred compensation.

### Benefit to Executive

- Funds can't be used for other purposes
- Protects against employer "changing its mind"
- But still at risk if employer becomes insolvent

---

## Tax Treatment Summary

### For Employee

| Event | Tax Treatment |
|-------|---------------|
| **Deferral** | Not taxed when earned |
| **Growth** | Not taxed until distributed |
| **Distribution** | Ordinary income when received |
| **FICA** | When no longer subject to substantial risk of forfeiture |

### For Employer

| Event | Tax Treatment |
|-------|---------------|
| **Accrual** | No deduction when promised |
| **Distribution** | Deduction when employee includes in income |

---

## Key Takeaways

1. **NQDC = unsecured promise**; you're a general creditor
2. **Section 409A**: Strict rules for elections, distributions, penalties
3. **20% penalty** for 409A violations plus interest
4. **6 distribution events**: Separation, disability, death, change in control, emergency, scheduled
5. **Rabbi trusts** protect against management change, NOT employer bankruptcy
    `,
    keyTakeaways: [
      "NQDC = unsecured promise to pay; executive is a general creditor",
      "Section 409A: Election timing, 6 distribution events, severe penalties",
      "409A violation: Immediate income + 20% penalty + interest from deferral year",
      "Rabbi trust: Protects against management changes, NOT insolvency",
      "FICA taxed when vested; income tax when distributed"
    ],
    keyFormulas: [
      "409A Penalty = Immediate income + 20% + Interest",
      "SERP Benefit = Target % of Final Pay - Qualified Plan Benefits"
    ],
    mnemonics: [
      "409A = 4-0-9-A: Four letters spelling DOOM if violated (20% penalty)",
      "Rabbi Trust: Religious protection (from humans), not divine (from bankruptcy)"
    ],
    practiceProblems: [
      {
        question: "An executive deferred $500,000 into a non-qualified plan. The employer goes bankrupt. What happens?",
        answer: "The executive is a general unsecured creditor and stands in line with other creditors. They may receive only a fraction of the deferred amount, or nothing."
      },
      {
        question: "An NQDC plan allows executives to withdraw funds anytime they want. What is the tax consequence?",
        answer: "This violates Section 409A. All vested amounts are immediately taxable plus a 20% penalty plus interest from the year of deferral."
      },
      {
        question: "What does a rabbi trust protect against?",
        answer: "A rabbi trust protects against employer's change of heart or management changes (funds are set aside), but does NOT protect against employer insolvency—assets remain subject to employer's creditors."
      }
    ],
    relatedLessons: ["CFP-RET-L014", "CFP-RET-L005", "CFP-TAX-L005"]
  },

  {
    id: "CFP-RET-L014",
    domain: "CFP-RET",
    blueprintArea: "RET-4",
    title: "Stock Options and Equity Compensation",
    order: 14,
    duration: 55,
    objectives: [
      "Compare incentive stock options (ISOs) to non-qualified options (NQSOs)",
      "Calculate tax consequences of stock option exercises",
      "Explain restricted stock and RSU taxation",
      "Develop exercise and holding strategies"
    ],
    content: `
# Stock Options and Equity Compensation

Equity compensation aligns employee interests with shareholders and can create significant wealth—but with complex tax considerations.

---

## Stock Options Basics

### What Is a Stock Option?

The right to purchase company stock at a fixed price (grant price/exercise price) for a specified period.

| Term | Definition |
|------|------------|
| **Grant date** | When option is awarded |
| **Exercise price** | Price to buy the stock |
| **Vesting** | When option becomes exercisable |
| **Expiration** | When option expires (typically 10 years) |
| **Intrinsic value** | Current price - Exercise price |

---

## Two Types of Stock Options

| Feature | NQSO | ISO |
|---------|------|-----|
| **Full name** | Non-Qualified Stock Option | Incentive Stock Option |
| **Tax at grant** | None | None |
| **Tax at exercise** | Ordinary income on spread | **No regular tax** (AMT preference) |
| **Tax at sale** | Capital gains on appreciation after exercise | Capital gains (if qualified) |
| **Employer deduction** | Yes (at exercise) | No |
| **$100K annual limit** | No | Yes |
| **Holding period for LTCG** | 1 year from exercise | 2 years from grant AND 1 year from exercise |

---

## NQSO Tax Treatment

### At Exercise

**Ordinary income** = Fair Market Value - Exercise Price

$$\\text{Spread} = \\text{FMV} - \\text{Exercise Price}$$

This is added to W-2 income.

### At Sale

**Capital gain/loss** = Sale Price - FMV at exercise

| Holding Period | Tax Rate |
|----------------|----------|
| ≤ 1 year | Short-term (ordinary) |
| > 1 year | Long-term capital gains |

### Example: NQSO

| Event | Price | Tax Consequence |
|-------|-------|-----------------|
| Grant | $10 exercise | None |
| Exercise (FMV = $50) | Buy at $10 | $40 ordinary income per share |
| Sell (price = $70) | | $20 capital gain per share |

---

## ISO Tax Treatment

### At Exercise

- **No regular income tax** on spread
- **AMT preference item** (spread may trigger AMT)

### At Sale (Qualified)

To qualify for favorable treatment:
1. Hold **2+ years from grant date**
2. Hold **1+ year from exercise date**

If qualified: **All gain is long-term capital gain** (from exercise price).

### Disqualifying Disposition

If sold before holding periods met:
- Spread at exercise becomes **ordinary income**
- Remaining gain is capital gain
- Similar to NQSO treatment

### Example: ISO (Qualified)

| Event | Price | Tax Consequence |
|-------|-------|-----------------|
| Grant | $10 exercise | None |
| Exercise (FMV = $50) | Buy at $10 | AMT preference: $40/share |
| Sell 2+ years later (price = $80) | | $70 LTCG per share ($80 - $10) |

### Example: ISO (Disqualifying Disposition)

Same facts, but sold 6 months after exercise:
- $40/share ordinary income (spread at exercise)
- $30/share short-term capital gain ($80 - $50)

---

## $100,000 ISO Limit

ISOs that first become exercisable in any year cannot exceed **$100,000** in value (based on grant date price).

Excess is treated as NQSOs.

---

## AMT Planning for ISOs

### The Problem

Exercising ISOs creates an **AMT preference item** equal to the spread.

Large exercises can trigger massive AMT liability—without any cash to pay it!

### Strategies

| Strategy | Description |
|----------|-------------|
| **Spread exercises** | Don't exercise all in one year |
| **Same-year sale** | Disqualifying disposition avoids AMT |
| **Model AMT impact** | Calculate before exercising |
| **Exercise at low spread** | Minimize AMT preference |

---

## Restricted Stock and RSUs

### Restricted Stock

Actual shares granted with restrictions (vesting).

| Event | Tax Consequence |
|-------|-----------------|
| Grant | None (unless 83(b) election) |
| Vesting | FMV less amount paid = ordinary income |
| Sale | Capital gain/loss from FMV at vesting |

### Section 83(b) Election

Can elect to pay tax at **grant** instead of vesting:
- Pay tax on lower value
- Future appreciation is capital gain
- Must file within **30 days of grant**
- **Risk**: Forfeit shares = no tax refund

### RSUs (Restricted Stock Units)

Promise to deliver shares upon vesting.

| Event | Tax Consequence |
|-------|-----------------|
| Grant | None |
| Vesting | FMV = ordinary income |
| Sale | Capital gain/loss from FMV at vesting |

No 83(b) election available for RSUs (no property until vesting).

---

## ESPP (Employee Stock Purchase Plan)

### Qualified ESPP

- Purchase price: up to **15% discount** from lower of grant or purchase price
- Holding periods: 2 years from grant, 1 year from purchase
- Discount taxed as ordinary income (at sale)
- Appreciation is capital gain

### Tax Treatment

| If Qualifying Disposition | Tax |
|--------------------------|-----|
| Discount | Ordinary income |
| Appreciation | Capital gain |

| If Disqualifying Disposition | Tax |
|------------------------------|-----|
| Spread at purchase | Ordinary income |
| Additional gain | Capital gain |

---

## Key Takeaways

1. **NQSOs**: Spread taxed as ordinary income at exercise; employer gets deduction
2. **ISOs**: No regular tax at exercise (AMT preference); LTCG if holding periods met
3. **ISO holding periods**: 2 years from grant AND 1 year from exercise
4. **83(b) election**: Pay tax at restricted stock grant; 30-day deadline
5. **RSUs**: Taxed as ordinary income at vesting; no 83(b) available
    `,
    keyTakeaways: [
      "NQSOs: Spread is ordinary income at exercise; employer deduction",
      "ISOs: No regular tax at exercise (AMT preference); LTCG if qualified",
      "ISO holding: 2 years from grant + 1 year from exercise for LTCG",
      "83(b) election for restricted stock: Tax at grant, file within 30 days",
      "RSUs: Taxed at vesting as ordinary income; no 83(b) election"
    ],
    keyFormulas: [
      "NQSO Spread = FMV at exercise - Exercise Price (ordinary income)",
      "ISO Qualified Gain = Sale Price - Exercise Price (all LTCG)",
      "$100K ISO limit: Based on grant date FMV × exercise price"
    ],
    mnemonics: [
      "ISO Holding: 2-1 (2 years from grant, 1 year from exercise)",
      "83(b) = 30 days (or you've 86'd your chance)"
    ],
    practiceProblems: [
      {
        question: "An employee exercises NQSOs: 1,000 shares at $20 exercise price when FMV is $50. What is the ordinary income?",
        answer: "Spread = ($50 - $20) × 1,000 = $30,000 ordinary income"
      },
      {
        question: "Same employee sells one year later at $60/share. What is the capital gain?",
        answer: "Capital gain = ($60 - $50) × 1,000 = $10,000 long-term capital gain"
      },
      {
        question: "An employee receives restricted stock worth $100,000 at grant. At vesting (3 years later), it's worth $300,000. If they did NOT make an 83(b) election, what is the tax consequence at vesting?",
        answer: "$300,000 ordinary income at vesting. An 83(b) election would have made only $100,000 ordinary income at grant, with $200,000 treated as capital gain at sale."
      }
    ],
    relatedLessons: ["CFP-RET-L013", "CFP-TAX-L003", "CFP-INV-L001"]
  },

  {
    id: "CFP-RET-L015",
    domain: "CFP-RET",
    blueprintArea: "RET-4",
    title: "Retirement Planning for Business Owners",
    order: 15,
    duration: 50,
    objectives: [
      "Compare retirement plan options for business owners",
      "Calculate maximum contributions for self-employed",
      "Design plans to maximize owner vs. employee contributions",
      "Apply plan selection criteria based on business goals"
    ],
    content: `
# Retirement Planning for Business Owners

Business owners have unique retirement planning opportunities—and challenges—compared to employees.

---

## Plan Selection Framework

### Key Considerations

| Factor | Question |
|--------|----------|
| **Number of employees** | Just owner? With employees? |
| **Cash flow** | Predictable or variable? |
| **Owner age** | Younger (more time) or older (catch up)? |
| **Contribution goals** | Maximize for owner or include employees? |
| **Administrative burden** | Want simplicity or flexibility? |

---

## Plan Options Comparison

| Plan | Max Employer | Max Employee | Admin Burden | Best For |
|------|--------------|--------------|--------------|----------|
| **SEP-IRA** | 25% (20% SE) | None | Low | Variable income, few employees |
| **SIMPLE IRA** | 3% match | $16,000 | Low | Small employers, want employee contributions |
| **Solo 401(k)** | 25% | $23,000 | Medium | Solo practitioners |
| **Regular 401(k)** | 25% | $23,000 | Higher | Larger businesses |
| **Traditional DB** | Actuarial | None | Highest | Older owners, stable income |
| **Cash Balance** | Actuarial | None | High | Professionals wanting high contributions |

---

## Solo 401(k) Deep Dive

### Who Can Use It?

Self-employed with **no employees** (except spouse).

### Contribution Limits (2024)

| Type | Maximum |
|------|---------|
| **Employee deferral** | $23,000 ($30,500 if 50+) |
| **Employer contribution** | 20% of net SE income |
| **Total** | $69,000 ($76,500 if 50+) |

### Example

| Income | Employee Deferral | Employer (20%) | Total |
|--------|-------------------|----------------|-------|
| $100,000 | $23,000 | $20,000 | $43,000 |
| $200,000 | $23,000 | $40,000 | $63,000 |
| $345,000+ | $23,000 | $69,000 | $69,000 (max) |

### Solo 401(k) Advantages

- **Roth option** available
- **Loans** permitted
- Can contribute more than SEP at lower incomes
- Spousal employment = doubled contributions

---

## SEP vs. Solo 401(k)

### At What Income Does Solo 401(k) Contribute More?

Solo 401(k) beats SEP when you can contribute **employee deferrals + employer contribution** > SEP limit.

| Net SE Income | SEP (20%) | Solo 401(k) | Advantage |
|---------------|-----------|-------------|-----------|
| $50,000 | $10,000 | $33,000 ($23K + $10K) | Solo +$23,000 |
| $100,000 | $20,000 | $43,000 | Solo +$23,000 |
| $200,000 | $40,000 | $63,000 | Solo +$23,000 |
| $345,000+ | $69,000 | $69,000 | Equal |

> **Solo 401(k) is almost always better** for solo practitioners with income under ~$345,000.

---

## Defined Benefit Plans for Owners

### When DB Plans Shine

| Situation | Why DB Works |
|-----------|--------------|
| **Age 50+** | More years to retirement = higher contributions |
| **High stable income** | Can afford actuarially required contributions |
| **Want large deductions** | DB limits exceed DC limits |
| **Few/no employees** | Coverage costs minimal |

### Maximum Benefit (2024)

Annual benefit cannot exceed:
- **$275,000/year** lifetime annuity starting at 62, OR
- 100% of average highest 3-year compensation

### Contribution Calculation

Actuary determines contribution needed to fund promised benefit:
- Older owner = larger annual contribution needed
- Younger owner = smaller contributions (more years to fund)

### Example

| Age | Target Benefit | Approximate Annual Contribution |
|-----|----------------|--------------------------------|
| 45 | $200,000/yr | ~$50,000-$70,000 |
| 55 | $200,000/yr | ~$120,000-$180,000 |
| 60 | $200,000/yr | ~$200,000+ |

---

## Cash Balance Plans

### The Hybrid Approach

Combines features of DB and DC:
- Legally a **defined benefit** plan
- Looks like a **defined contribution** plan (individual accounts)

### Contribution Structure

- **Pay credit**: % of salary added annually (e.g., 10-25%)
- **Interest credit**: Guaranteed return (e.g., 5%)

### Advantages for Owners

- Higher contributions than 401(k) limits allow
- Can be combined with 401(k)
- More predictable than traditional DB

---

## Plan Aggregation Rules

### Combined DB + 401(k)

Can have both:
- DB plan provides guaranteed benefit
- 401(k) provides employee deferrals
- Combined limits apply

### Employee Coverage Rules

If you have employees, contribution levels must be similar across covered employees:

| Plan Type | Rule |
|-----------|------|
| **SEP** | Same % for all eligible employees |
| **SIMPLE** | Match applies to all |
| **401(k)** | Discrimination testing required |
| **DB** | Must cover required employees |

---

## Owner Strategy by Age

### Young Owner (Under 40)

- Start with **Solo 401(k)** or **SEP**
- Build base with tax-deferred growth
- Time is the advantage

### Middle-Age Owner (40-55)

- **Solo 401(k)** for most
- Consider **DB add-on** if income high
- Roth contributions for tax diversification

### Older Owner (55+)

- **Defined Benefit** becomes powerful
- Larger contributions allowed
- Catch-up provisions in DC plans
- Consider **cash balance** for flexibility

---

## Key Takeaways

1. **Solo 401(k)** usually beats SEP for self-employed under $345K income
2. **Defined Benefit** allows largest contributions, especially for older owners
3. **Cash Balance** plans = hybrid with DB contribution levels, DC appearance
4. Employees must generally be covered at similar rates as owner
5. **Can combine** DB + 401(k) for maximum contributions
    `,
    keyTakeaways: [
      "Solo 401(k) beats SEP for most self-employed (employee deferral advantage)",
      "Defined benefit allows largest contributions, especially for older owners",
      "Cash balance = DB rules, DC appearance; high contributions possible",
      "Must cover eligible employees at similar contribution rates",
      "Combine DB + 401(k) for maximum contributions and flexibility"
    ],
    keyFormulas: [
      "Solo 401(k) Employee = $23,000 ($30,500 if 50+)",
      "Solo 401(k) Employer = 20% of Net SE Income",
      "SEP (Self-Employed) = 20% of Net SE Income",
      "DB Max Benefit = $275,000/year or 100% of 3-year average"
    ],
    practiceProblems: [
      {
        question: "A 45-year-old solo consultant has $150,000 net SE income. Compare maximum SEP vs. Solo 401(k) contributions (under 50, so no catch-up).",
        answer: "SEP: $150,000 × 20% = $30,000. Solo 401(k): $23,000 (employee) + $30,000 (employer 20%) = $53,000. Solo 401(k) allows $23,000 more."
      },
      {
        question: "A 58-year-old physician wants to maximize retirement contributions. What plan type allows the largest contribution?",
        answer: "A defined benefit plan. At age 58, the actuary can calculate contributions potentially exceeding $200,000/year to fund the maximum benefit by retirement."
      },
      {
        question: "A business owner has a Solo 401(k). They hire a full-time employee. What happens?",
        answer: "They can no longer use a Solo 401(k). They must convert to a regular 401(k) with proper employee coverage and discrimination testing."
      }
    ],
    relatedLessons: ["CFP-RET-L011", "CFP-RET-L007", "CFP-RET-L005"]
  },

  {
    id: "CFP-RET-L016",
    domain: "CFP-RET",
    blueprintArea: "RET-4",
    title: "Retirement Plan Distribution Strategies",
    order: 16,
    duration: 50,
    objectives: [
      "Apply RMD rules across account types",
      "Develop tax-efficient distribution sequencing",
      "Evaluate 72(t) substantially equal periodic payments",
      "Plan for qualified charitable distributions"
    ],
    content: `
# Retirement Plan Distribution Strategies

How and when you take distributions can significantly impact after-tax retirement income.

---

## RMD Fundamentals

### Which Accounts Have RMDs?

| Account Type | RMDs Required? |
|--------------|----------------|
| Traditional IRA | Yes |
| SEP-IRA | Yes |
| SIMPLE IRA | Yes |
| 401(k), 403(b), 457(b) | Yes (unless still working) |
| **Roth IRA** | **No** (for original owner) |
| Roth 401(k) | No (SECURE 2.0; can roll to Roth IRA) |
| Inherited IRAs | Yes (different rules) |

### RMD Starting Age

| Birth Year | RMD Begins |
|------------|------------|
| Before 1951 | 72 |
| 1951-1959 | 73 |
| 1960+ | 75 |

### First-Year RMD Choice

First RMD can be delayed until April 1 of the year **following** the year you turn RMD age.
- But you'll have **two RMDs** in year 2 (potentially pushing into higher bracket)

---

## RMD Aggregation Rules

### Traditional IRAs

- Calculate RMD separately for each account
- Aggregate all RMDs
- Satisfy from **any Traditional IRA** (or combination)

### 401(k) Plans

- Each plan's RMD must be taken from **that plan**
- Cannot aggregate across 401(k)s

### 403(b) Plans

- Can aggregate like IRAs
- Take from any 403(b) account

---

## Tax-Efficient Distribution Sequencing

### The Goal

Minimize lifetime taxes, not just current-year taxes.

### Common Ordering (Not Always Optimal)

1. Taxable accounts (brokerage)
2. Tax-deferred (Traditional IRA, 401(k))
3. Tax-free (Roth)

### Why This May Not Be Optimal

| Issue | Problem |
|-------|---------|
| **Wasted low brackets** | Early years may have low income |
| **Large RMDs later** | Tax-deferred grows, creates large RMDs |
| **IRMAA surcharges** | High income triggers Medicare premiums |
| **Social Security taxation** | High income triggers 85% SS taxation |

### Optimized Approach

**Fill tax brackets strategically**:
1. Take income to "fill" current bracket
2. Consider Roth conversions during low-income years
3. Delay Social Security to allow more conversions
4. Use Roth for "spike" years (large expenses)

---

## Roth Conversion Strategies

### The Opportunity

Convert Traditional IRA to Roth during low-income years:
- Pre-Social Security
- Pre-RMD
- Market downturns (convert more shares for same tax)

### Example: Early Retirement Conversion

| Year | Traditional IRA | Roth Conversion | Tax |
|------|-----------------|-----------------|-----|
| Age 62 | $800,000 | $50,000 | ~$5,500 (12%) |
| Age 63 | $750,000 | $50,000 | ~$5,500 |
| Age 64 | $700,000 | $50,000 | ~$5,500 |
| Age 65+ | $650,000 | (smaller RMDs) | Lower |

**Result**: Reduced future RMDs + tax-free Roth growth

### Bracket Boundaries to Know (2024)

| MFJ Bracket | Top of Bracket |
|-------------|----------------|
| 10% | $23,200 |
| 12% | $94,300 |
| 22% | $201,050 |
| 24% | $383,900 |

---

## 72(t) Substantially Equal Periodic Payments (SEPP)

### What It Is

Exception to 10% early withdrawal penalty for regular distributions.

### Requirements

1. **At least 5 years** OR until age 59½ (whichever is longer)
2. Use one of three IRS-approved methods
3. **Cannot modify** schedule (or penalties apply retroactively)

### Three Methods

| Method | Calculation | Flexibility |
|--------|-------------|-------------|
| **Life expectancy** | Balance / Life expectancy | Recalculate annually |
| **Amortization** | Fixed payment (amortized) | Fixed; highest payment |
| **Annuitization** | Based on annuity factor | Fixed; similar to amortization |

### Example

IRA Balance: $500,000, Age: 50, Life expectancy: 34.2 years

**Life Expectancy Method**:
$$\\text{Year 1} = \\$500,000 / 34.2 = \\$14,620$$

**Amortization** (at 5%):
$$\\text{Annual} = \\$500,000 \\times \\frac{0.05}{1-(1.05)^{-34.2}} \\approx \\$30,000$$

### Modification Penalty

If you modify before the later of 5 years or 59½:
- **10% penalty applies retroactively** to all distributions
- Plus interest

---

## Qualified Charitable Distributions (QCDs)

### What It Is

Direct transfer from IRA to charity (not through you).

### Requirements

| Requirement | Detail |
|-------------|--------|
| **Age** | 70½ or older |
| **Amount** | Up to $105,000/year (2024) |
| **Account** | Traditional IRA only |
| **Recipient** | Qualified 501(c)(3) charity |

### Tax Benefits

- **Not included in income** (unlike regular distribution)
- **Satisfies RMD** (counts toward requirement)
- Benefit even if taking standard deduction

### Example

| Without QCD | With QCD |
|-------------|----------|
| $30,000 RMD → income | $30,000 QCD → not income |
| $12,000 charitable deduction | No deduction (already excluded) |
| Net taxable reduction: $12,000 | Net taxable reduction: $30,000 |

**QCD is effectively better** for those who take standard deduction.

---

## Key Takeaways

1. **RMD age**: 73 now, 75 for those born 1960+
2. **Aggregate IRAs** for RMDs; 401(k)s must distribute from each plan
3. **Roth conversions**: Optimal during low-income years (early retirement)
4. **72(t) SEPP**: Avoid 10% penalty with 5-year commitment; can't modify
5. **QCD**: Age 70½+, up to $105K, excludes from income AND counts as RMD
    `,
    keyTakeaways: [
      "RMD starts at 73 (75 for 1960+); first year can delay to April 1 following",
      "IRAs aggregate for RMDs (distribute from any); 401(k)s do not aggregate",
      "Roth conversions: Fill low brackets in early retirement before SS/RMDs",
      "72(t) SEPP: 5 years or until 59½ (longer); modification = retroactive penalty",
      "QCD at 70½+: Up to $105K excluded from income; counts toward RMD"
    ],
    keyFormulas: [
      "RMD = Dec 31 Prior Year Balance / Uniform Table Factor",
      "72(t) Life Expectancy = Balance / Life Expectancy Factor",
      "QCD Limit (2024) = $105,000"
    ],
    mnemonics: [
      "RMD: 73-75 (SECURE 2.0)",
      "QCD: 70½ = Send to Charity Directly"
    ],
    practiceProblems: [
      {
        question: "A 74-year-old takes the standard deduction and wants to give $20,000 to charity. They have an $800,000 IRA. Should they do a QCD?",
        answer: "Yes! A QCD excludes $20,000 from income (no charitable deduction needed). A regular distribution of $20,000 would be income, and the donation wouldn't help since they take the standard deduction. QCD saves taxes."
      },
      {
        question: "A 52-year-old starts 72(t) payments from their IRA. When can they modify or stop the payments without penalty?",
        answer: "The later of 5 years or age 59½. They start at 52, so 5 years = age 57. But 59½ is later, so they cannot modify until age 59½ (7.5 years of payments)."
      },
      {
        question: "A retiree has three IRAs worth $200K, $300K, and $500K. Their RMD factor is 25. What is the total RMD and can they take it from one account?",
        answer: "Total RMD = ($200K + $300K + $500K) / 25 = $1,000,000 / 25 = $40,000. Yes, they can take the entire $40,000 from any one IRA or any combination."
      }
    ],
    relatedLessons: ["CFP-RET-L004", "CFP-RET-L009", "CFP-RET-L010"]
  }
];

export default CFP_RET4_LESSONS;
