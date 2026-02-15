/**
 * CFP Domain 6: Retirement Savings and Income Planning
 * Area RET-3: Individual Retirement Accounts
 * 
 * These lessons cover Traditional IRAs, Roth IRAs, SEP-IRAs,
 * SIMPLE IRAs, and IRA distribution rules.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_RET3_LESSONS: CFPLesson[] = [
  {
    id: "CFP-RET-L009",
    domain: "CFP-RET",
    blueprintArea: "RET-3",
    title: "Traditional IRA Rules and Strategies",
    order: 9,
    duration: 50,
    objectives: [
      "Explain Traditional IRA contribution eligibility",
      "Apply deduction phase-outs for active participants",
      "Calculate deductible and non-deductible contributions",
      "Identify distribution rules and required minimum distributions"
    ],
    content: `
# Traditional IRA Rules and Strategies

The **Traditional IRA** is a cornerstone of retirement planning, offering tax-deferred growth and potential tax deductions.

---

## Contribution Basics

### Eligibility

To contribute, must have **earned income** (or spouse must have earned income).

Earned income includes:
- Wages, salaries, tips
- Self-employment income
- Alimony (divorce decrees before 2019)

Does NOT include:
- Investment income, rental income
- Pension, Social Security
- Alimony (divorce decrees 2019+)

### Contribution Limits (2026)

| Age | Limit |
|-----|-------|
| Under 50 | $7,500 |
| 50+ | $7,500 + $1,000 = **$8,500** |

### No Age Limit

SECURE Act eliminated the age 70½ contribution prohibition. Can contribute at any age with earned income.

---

## Deductibility Rules

### Not an Active Participant in Employer Plan

**Full deduction allowed** regardless of income.

### Active Participant in Employer Plan

Deduction phases out based on MAGI:

**Single/HOH (2026)**:

| MAGI | Deduction |
|------|-----------|
| ≤ $79,000 | Full |
| $79,001 - $89,000 | Partial |
| > $89,000 | None |

**Married Filing Jointly (2026)**:

| MAGI | Deduction |
|------|-----------|
| ≤ $126,000 | Full |
| $126,001 - $146,000 | Partial |
| > $146,000 | None |

### Spousal IRA (Non-Working Spouse)

If one spouse works and other doesn't:

| MFJ MAGI | Non-Working Spouse Deduction |
|----------|—----------------------------|
| ≤ $236,000 | Full |
| $236,001 - $246,000 | Partial |
| > $246,000 | None |

---

## What is "Active Participant"?

Indicated by a checkmark in Box 13 of W-2.

Includes participation in:
- 401(k), 403(b), 457(b)
- Defined benefit pension
- SEP-IRA, SIMPLE IRA
- Profit sharing

> **Key Point**: Being *eligible* but not *contributing* still makes you an active participant if employer contributions are made for you.

---

## Non-Deductible Contributions

If income exceeds phase-out:
- Can still contribute $7,000/$8,000
- But contribution is **not tax-deductible**
- Must track basis on **Form 8606**
- Earnings still grow tax-deferred

### Why Track Basis?

At distribution:
- Portion from non-deductible contributions = tax-free
- Portion from earnings/deductible contributions = taxable
- Pro-rata rule applies across ALL traditional IRAs

---

## Distribution Rules

### Penalty-Free After Age 59½

Distributions taxed as ordinary income (except non-deductible basis).

### Early Withdrawal Penalty (Before 59½)

**10% penalty** plus ordinary income tax.

### Exceptions to 10% Penalty

| Exception | Details |
|-----------|---------|
| **Death** | To beneficiary |
| **Disability** | Total and permanent |
| **Medical expenses** | > 7.5% of AGI |
| **Health insurance** | If unemployed |
| **Higher education** | Qualified expenses |
| **First home** | Up to $10,000 lifetime |
| **72(t)** | Substantially equal payments |
| **IRS levy** | If IRS seizes |
| **Reservist** | Called to active duty 180+ days |
| **Birth/adoption** | Up to $5,000 (SECURE Act) |

---

## Required Minimum Distributions (RMDs)

### Starting Age

| Birth Year | RMD Starting Age |
|------------|------------------|
| Before 1951 | 72 |
| 1951-1959 | 73 |
| 1960+ | 75 |

### RMD Calculation

$$\\text{RMD} = \\frac{\\text{Dec 31 Prior Year Balance}}{\\text{Distribution Period (Uniform Table)}}$$

### Uniform Lifetime Table (Partial)

| Age | Distribution Period |
|-----|---------------------|
| 73 | 26.5 |
| 75 | 24.6 |
| 80 | 20.2 |
| 85 | 16.0 |
| 90 | 12.2 |

### Example

Age 75, December 31 balance = $500,000
$$\\text{RMD} = \\frac{\\$500,000}{24.6} = \\$20,325$$

### RMD Penalty

Failure to take RMD:
- **25% excise tax** on amount not taken (reduced from 50% by SECURE 2.0)
- Reduced to **10%** if corrected within 2 years

---

## IRA Aggregation Rule

For RMD purposes:
- **Aggregate** balances of all Traditional IRAs
- Calculate total RMD
- Can distribute from **any IRA** to satisfy

For Roth IRAs:
- Separate aggregation (different rules apply)

---

## Key Takeaways

1. **2026 limit**: $7,500 ($8,500 if 50+) with earned income
2. **Deduction phase-out**: Depends on active participant status and MAGI
3. **Non-deductible contributions**: Track basis on Form 8606
4. **RMDs start**: Age 73 (or 75 for those born 1960+)
5. **10% penalty exceptions**: Education, first home, disability, 72(t), more
    `,
    keyTakeaways: [
      "2026 contribution limit: $7,500 ($8,500 if 50+) - requires earned income",
      "Active participant: Deduction phases out at $79K-$89K single / $126K-$146K MFJ",
      "Non-deductible contributions: Track basis on Form 8606 for tax-free portion",
      "RMDs begin at 73 (75 for those born 1960+); RMD penalty is 25%",
      "10% penalty exceptions: Death, disability, education, first home, 72(t)"
    ],
    keyFormulas: [
      "IRA Limit (2026) = $7,500 (under 50) / $8,500 (50+)",
      "RMD = Dec 31 Prior Year Balance / Uniform Table Factor"
    ],
    mnemonics: [
      "Active Participant = Box 13 checked on W-2",
      "RMD age: 73 now, 75 later (SECURE 2.0)"
    ],
    practiceProblems: [
      {
        question: "A 52-year-old single taxpayer has a 401(k) at work and MAGI of $95,000. Can she deduct a Traditional IRA contribution?",
        answer: "No. As an active participant with MAGI above $89,000 (single), no deduction is allowed. She can make a non-deductible contribution."
      },
      {
        question: "A 75-year-old has a Traditional IRA balance of $400,000 on December 31. What is her RMD?",
        answer: "RMD = $400,000 / 24.6 = $16,260"
      },
      {
        question: "A 45-year-old takes a $30,000 IRA distribution for a child's college tuition. What are the tax consequences?",
        answer: "The $30,000 is taxable as ordinary income. The higher education exception waives the 10% penalty, but tax still applies."
      }
    ],
    relatedLessons: ["CFP-RET-L010", "CFP-RET-L011", "CFP-RET-L012"]
  },

  {
    id: "CFP-RET-L010",
    domain: "CFP-RET",
    blueprintArea: "RET-3",
    title: "Roth IRA Rules and Strategies",
    order: 10,
    duration: 55,
    objectives: [
      "Explain Roth IRA contribution eligibility and income limits",
      "Compare Roth vs. Traditional IRA benefits",
      "Apply the 5-year rules for qualified distributions",
      "Develop Roth conversion strategies"
    ],
    content: `
# Roth IRA Rules and Strategies

The **Roth IRA** offers tax-free growth and tax-free qualified distributions—often the most powerful retirement account.

---

## Contribution Basics

### Eligibility

Must have **earned income** AND income below limits.

### Contribution Limits (2026)

Same as Traditional IRA:
| Age | Limit |
|-----|-------|
| Under 50 | $7,500 |
| 50+ | **$8,500** |

### Combined Limit

Traditional + Roth combined cannot exceed $7,500/$8,500.

---

## Income Limits (2026)

Unlike Traditional IRA, Roth has **income limits for contributions**:

**Single/HOH**:
| MAGI | Contribution |
|------|--------------|
| < $150,000 | Full |
| $150,000 - $165,000 | Partial |
| > $165,000 | None |

**Married Filing Jointly**:
| MAGI | Contribution |
|------|--------------|
| < $236,000 | Full |
| $236,000 - $246,000 | Partial |
| > $246,000 | None |

---

## Tax Treatment

| Event | Traditional IRA | Roth IRA |
|-------|-----------------|----------|
| **Contribution** | Tax-deductible (if eligible) | Never deductible |
| **Growth** | Tax-deferred | Tax-free |
| **Qualified Distribution** | Fully taxable | **Tax-free** |
| **Non-qualified Distribution** | Taxable + penalty | Earnings taxable + penalty |

---

## Qualified Distributions (Tax-Free)

Must meet BOTH requirements:

### 1. 5-Year Rule

Account must be held **5 tax years** from first contribution.
- Starts January 1 of the contribution year
- Conversions have their own 5-year clock

### 2. Triggering Event

- Age **59½**, OR
- Death, OR
- Disability, OR
- First-time home purchase (up to $10,000)

---

## Distribution Ordering Rules

When you withdraw from a Roth IRA, money comes out in this order:

1. **Regular contributions** (always tax-free, penalty-free)
2. **Conversion amounts** (tax-free; penalty if under 59½ and within 5 years)
3. **Earnings** (taxable + penalty if not qualified)

### Why This Matters

You can always withdraw **contributions** tax-free and penalty-free at any time!

**Example**: Contributed $50,000 over the years, account now worth $75,000.
- First $50,000 withdrawn = tax-free, penalty-free
- Next $25,000 (earnings) = subject to rules

---

## Roth Conversions

### What Is a Conversion?

Moving money from Traditional IRA to Roth IRA.

### Tax Consequences

- **Pay taxes now** on converted amount
- Then **grows tax-free** forever
- **No income limits** for conversions

### 5-Year Rule for Conversions

Each conversion has its own 5-year holding period:
- If withdrawn before 5 years AND under 59½ = 10% penalty on conversion amount
- After 5 years OR after 59½ = no penalty

### When Conversions Make Sense

| Good Time to Convert | Why |
|---------------------|-----|
| Low-income year | Pay taxes at lower rate |
| Early retirement | Before SS, RMDs begin |
| Stock market drop | Convert more shares for same tax cost |
| Long time horizon | More years for tax-free growth |
| Expect higher future rates | Pay tax now at lower rates |

---

## Backdoor Roth IRA

### For High Earners Above Income Limits

1. Contribute to **non-deductible Traditional IRA** ($7,000)
2. Convert to **Roth IRA** immediately
3. Pay tax only on earnings (minimal if done quickly)

### Pro-Rata Rule Warning

If you have existing Traditional IRA balances:
- Conversion is taxed proportionally across ALL Traditional IRAs
- Cannot just convert the non-deductible portion

**Solution**: Roll Traditional IRA into 401(k) before backdoor conversion.

---

## Roth vs. Traditional: Decision Framework

### Choose Roth When:
- Current tax bracket is **LOWER** than expected retirement bracket
- **Long time horizon** for tax-free growth
- Want **tax diversification**
- Want to leave **tax-free inheritance**
- Want to avoid **RMDs**

### Choose Traditional When:
- Current tax bracket is **HIGHER** than expected retirement bracket
- Need the **deduction now**
- **Shorter time horizon**
- Will be in **lower bracket** in retirement

### The Math

If tax rates stay the same, Roth and Traditional produce the **same outcome**.

**Decision depends on**: Expected future tax rates vs. current rates.

---

## No RMDs for Roth IRAs

Original owner never has to take RMDs:
- Money can grow tax-free for entire lifetime
- Powerful for estate planning
- SECURE 2.0: Roth 401(k) RMDs also eliminated

---

## Key Takeaways

1. **2026 income limits**: $165,000 single / $246,000 MFJ for direct contributions
2. **5-year rule**: Account must be open 5+ years for qualified distribution
3. **Distribution order**: Contributions → Conversions → Earnings
4. **Backdoor Roth**: Non-deductible Traditional → convert to Roth (watch pro-rata rule)
5. **No RMDs**: Roth IRAs never require distributions for original owner
    `,
    keyTakeaways: [
      "Income limits (2026): Phase-out at $150K-$165K single / $236K-$246K MFJ",
      "5-year rule: Must hold 5 years + triggering event for tax-free earnings",
      "Distribution order: Contributions (tax-free) → Conversions → Earnings",
      "Backdoor Roth: Non-deductible Traditional + convert; beware pro-rata rule",
      "No RMDs for original owner; ideal for estate planning"
    ],
    keyFormulas: [
      "Roth Contribution Phase-Out (Single): $150,000 - $165,000 (2026)",
      "Roth Contribution Phase-Out (MFJ): $236,000 - $246,000 (2026)"
    ],
    mnemonics: [
      "Roth = Right Out Tax-free at the Horizon",
      "5-year rule: Five fingers to pull money (qualified)"
    ],
    practiceProblems: [
      {
        question: "A single taxpayer has MAGI of $175,000 in 2026. Can she contribute directly to a Roth IRA?",
        answer: "No. MAGI exceeds the $165,000 limit. She could do a backdoor Roth conversion instead."
      },
      {
        question: "A 50-year-old opened his first Roth IRA 3 years ago and wants to withdraw $10,000 (he contributed $8,000, so $2,000 is earnings). What are the tax consequences?",
        answer: "The $8,000 contribution comes out tax-free and penalty-free. The $2,000 in earnings is taxable and subject to 10% penalty (not 5 years, not 59½)."
      },
      {
        question: "A 62-year-old opened her Roth IRA 10 years ago. She withdraws $50,000. Tax consequences?",
        answer: "Fully tax-free and penalty-free. She meets both requirements: 5+ years and age 59½+."
      }
    ],
    relatedLessons: ["CFP-RET-L009", "CFP-RET-L011", "CFP-RET-L004"]
  },

  {
    id: "CFP-RET-L011",
    domain: "CFP-RET",
    blueprintArea: "RET-3",
    title: "SEP-IRA and SIMPLE IRA Plans",
    order: 11,
    duration: 45,
    objectives: [
      "Explain SEP-IRA eligibility and contribution calculations",
      "Describe SIMPLE IRA rules for small employers",
      "Compare SEP and SIMPLE plans",
      "Apply self-employment contribution calculations"
    ],
    content: `
# SEP-IRA and SIMPLE IRA Plans

These plans allow small businesses and self-employed individuals to establish retirement savings with minimal administrative burden.

---

## SEP-IRA (Simplified Employee Pension)

### Ideal For

- Self-employed individuals
- Small businesses with few employees
- Businesses with variable income

### Key Features

| Feature | Description |
|---------|-------------|
| **Contributions** | Employer only (no employee deferrals) |
| **Maximum** | 25% of compensation or $71,500 (2026) |
| **Deadline** | Tax return deadline (including extensions) |
| **Administration** | Minimal - just an IRA for each participant |
| **Vesting** | 100% immediate |

---

## SEP Contribution Calculations

### For Employees

$$\\text{Contribution} = \\text{Compensation} \\times 25\\%$$

Maximum: $71,500 (2026)
Maximum compensation considered: $360,000 (2026)

### For Self-Employed Individuals

More complex due to the "net self-employment income" calculation:

$$\\text{Contribution} = \\text{Net SE Income} \\times 20\\%$$

The 20% accounts for the circular calculation:
- You're deducting the contribution
- But contribution is based on income after deduction
- Net effective rate is 20%, not 25%

### Example: Self-Employed SEP

Net self-employment income (after SE tax deduction): $200,000
$$\\text{SEP Contribution} = \\$200,000 \\times 20\\% = \\$40,000$$

---

## SEP Eligibility Requirements

Employer must include employees who:
- Age **21+**
- Worked **3 of the last 5 years**
- Earned at least **$750** (2024)

> **Warning**: SEP is less attractive if you have many employees—you must contribute the same percentage for all eligible employees.

---

## SIMPLE IRA (Savings Incentive Match Plan)

### Ideal For

- Small employers (100 or fewer employees)
- Employers wanting employee deferrals
- Employers wanting lower contribution obligations

### Key Features

| Feature | Description |
|---------|-------------|
| **Eligibility** | Employers with ≤100 employees |
| **Contributions** | Employee deferrals + employer match |
| **Employee limit** | $17,000 ($20,500 if 50+) for 2026 |
| **Employer contribution** | Required (matching or non-elective) |
| **Other plans** | Cannot maintain with other qualified plans |

---

## SIMPLE IRA Contribution Limits (2026)

### Employee Deferrals

| Age | Limit |
|-----|-------|
| Under 50 | $17,000 |
| 50+ | $17,000 + $3,500 = **$20,500** |

### Employer Contribution (Required)

**Option 1: Matching**
- Match dollar-for-dollar up to **3%** of compensation
- Can reduce to 2% (for 2 of any 5 years)

**Option 2: Non-Elective**
- **2%** of compensation to all eligible employees
- Regardless of whether they contribute

---

## SIMPLE IRA Distribution Rules

### 2-Year Rule

If distributions taken within **first 2 years** of participation:
- 10% penalty becomes **25% penalty**
- After 2 years, standard 10% penalty applies (before 59½)

### Example Timeline

| Event | Date |
|-------|------|
| First SIMPLE contribution | January 2026 |
| 2-year penalty period ends | January 2028 |
| Distributions before January 2028 | 25% penalty |
| Distributions after January 2028 | 10% penalty (if under 59½) |

---

## SEP vs. SIMPLE Comparison

| Feature | SEP-IRA | SIMPLE IRA |
|---------|---------|------------|
| **Contributions** | Employer only | Employee + Employer |
| **Maximum** | 25% / $69,000 | $16,000 + match |
| **Employee eligibility** | 3 of 5 years, $750 | 2 years, $5,000 |
| **Employer size** | Any | ≤100 employees |
| **Deadline** | Tax return deadline | October 1 (for new plans) |
| **Early withdrawal penalty** | 10% | 25% (first 2 years) |
| **Flexibility** | More (discretionary) | Less (required match) |

---

## When to Choose Each

### Choose SEP When:
- Self-employed or few/no employees
- Want **flexibility** (skip contributions in bad years)
- Want **higher contribution limits**
- Variable income

### Choose SIMPLE When:
- Have employees who want to **contribute themselves**
- Want **lower employer obligation** (3% match vs. 25%)
- Prefer **predictable** employer costs
- Under 100 employees

---

## Solo 401(k) Alternative

For self-employed with no employees (other than spouse):

| Feature | Solo 401(k) |
|---------|------------|
| **Employee deferral** | $24,500 (+ $7,500 catch-up) |
| **Employer contribution** | 25% of compensation |
| **Total maximum** | $71,500 ($79,000 catch-up) |
| **Roth option** | Available |
| **Loans** | Permitted |

> **Often better than SEP** because of employee deferral component and Roth option.

---

## Key Takeaways

1. **SEP-IRA**: Employer contributions only; 25% of comp up to $71,500
2. **Self-employed SEP**: Effective rate is 20% of net SE income
3. **SIMPLE IRA**: Employee deferrals ($17,000) + employer match (3%)
4. **SIMPLE 2-year rule**: 25% penalty if withdrawn within first 2 years
5. **Solo 401(k)**: Often superior for self-employed with no employees
    `,
    keyTakeaways: [
      "SEP: Employer-only contributions, 25% of comp (20% for self-employed), $71.5K max",
      "SEP flexibility: Can vary/skip contributions; deadline = tax return deadline",
      "SIMPLE: Employee deferrals $17K + employer 3% match or 2% non-elective",
      "SIMPLE 2-year rule: 25% early withdrawal penalty for first 2 years",
      "Solo 401(k): Often better for solo practitioners (both deferral + employer)"
    ],
    keyFormulas: [
      "SEP (employees) = Compensation × 25%",
      "SEP (self-employed) = Net SE Income × 20%",
      "SIMPLE employee = $17,000 ($20,500 if 50+)",
      "SIMPLE employer match = 3% of compensation"
    ],
    practiceProblems: [
      {
        question: "A self-employed consultant has $300,000 in net self-employment income. What is the maximum SEP contribution?",
        answer: "$300,000 × 20% = $60,000. But maximum is $71,500, so full $60,000 is allowed."
      },
      {
        question: "An employee earning $80,000 participates in a SIMPLE IRA, contributing the maximum. The employer provides a 3% match. What is the total annual contribution?",
        answer: "Employee: $17,000. Employer match: $80,000 × 3% = $2,400. Total: $19,400."
      },
      {
        question: "A 45-year-old takes a $20,000 distribution from a SIMPLE IRA after 18 months of participation. What is the penalty?",
        answer: "25% penalty because distribution is within the first 2 years. Penalty = $20,000 × 25% = $5,000 (plus ordinary income tax)."
      }
    ],
    relatedLessons: ["CFP-RET-L009", "CFP-RET-L010", "CFP-RET-L005"]
  },

  {
    id: "CFP-RET-L012",
    domain: "CFP-RET",
    blueprintArea: "RET-3",
    title: "IRA Rollovers and Transfers",
    order: 12,
    duration: 45,
    objectives: [
      "Distinguish between direct transfers and rollovers",
      "Apply the 60-day rollover rule and exceptions",
      "Identify rollover eligibility between account types",
      "Avoid common rollover mistakes and tax traps"
    ],
    content: `
# IRA Rollovers and Transfers

Moving retirement assets between accounts is common—but the rules are complex and mistakes are costly.

---

## Transfers vs. Rollovers

### Direct Transfer (Trustee-to-Trustee)

| Feature | Description |
|---------|-------------|
| **Method** | Funds go directly between institutions |
| **Reporting** | No 1099-R taxable event |
| **Frequency** | **Unlimited** |
| **Withholding** | None |

**Always prefer direct transfer** when possible.

### Rollover (60-Day)

| Feature | Description |
|---------|-------------|
| **Method** | Check made to participant, who redeposits |
| **Deadline** | **60 days** to complete |
| **Reporting** | 1099-R issued; report on tax return |
| **Frequency** | One per 12 months (IRA-to-IRA) |
| **Withholding** | 20% on employer plans |

---

## One-Rollover-Per-Year Rule

### The Rule

Only **one IRA-to-IRA rollover** (60-day) per 12-month period.

### What Counts

- Rollover from Traditional IRA to another Traditional IRA
- Rollover from Roth IRA to another Roth IRA

### What Doesn't Count

- **Direct transfers** (unlimited)
- **Rollovers from employer plans** (401k to IRA)
- **Roth conversions** (Traditional to Roth)
- Rollover between different account types (SEP to Traditional)

### Violation Consequence

Second rollover = **taxable distribution + penalty** (if under 59½).

---

## 60-Day Rollover Rule

### Deadline

Must deposit funds within **60 days** of receipt.

### Late Penalty

If missed: Full distribution is taxable + 10% penalty (if applicable).

### Exceptions and Extensions

IRS may grant extension for:
- Financial institution error
- Disability
- Death in family
- Other valid reasons

**Self-certification**: IRS Revenue Procedure 2016-47 allows self-certification for certain late rollovers.

---

## Rollover Chart

What can roll to what:

| FROM → TO | Trad IRA | Roth IRA | 401(k) | 403(b) | 457(b) Gov't |
|-----------|----------|----------|--------|--------|--------------|
| **Trad IRA** | ✓ | ✓ (conversion) | ✓ | ✓ | ✓ |
| **Roth IRA** | ✗ | ✓ | ✗ | ✗ | ✗ |
| **401(k) Pre-Tax** | ✓ | ✓ (conversion) | ✓ | ✓ | ✓ |
| **401(k) Roth** | ✗ | ✓ | ✓ Roth | ✓ Roth | ✓ Roth |
| **403(b)** | ✓ | ✓ (conversion) | ✓ | ✓ | ✓ |
| **457(b) Gov't** | ✓ | ✓ (conversion) | ✓ | ✓ | ✓ |

### Key Points

- Roth IRAs can ONLY go to Roth IRAs
- **Non-governmental 457(b)** cannot roll to IRA
- Pre-tax to Roth = taxable conversion

---

## 20% Mandatory Withholding

### When It Applies

Distributions from **employer plans** (not IRAs) paid directly to participant.

### The Problem

To complete rollover, must make up the 20% from other funds.

### Example

$100,000 401(k) distribution:
- Receive check for $80,000 (20% withheld)
- To avoid tax on full amount, must deposit $100,000
- Must find $20,000 from other funds
- Withheld amount recovered at tax filing as refund

### Solution

Use **direct rollover** to avoid withholding entirely.

---

## Common Rollover Mistakes

### 1. Missing 60-Day Deadline

Even one day late = fully taxable distribution.

### 2. Multiple 60-Day Rollovers

Second IRA-to-IRA rollover in 12 months = taxable distribution.

### 3. Not Making Up Withholding

If you don't deposit full amount, shortfall is taxable.

### 4. Rolling Over Required Minimum Distribution

RMDs are **not eligible** for rollover. Must take RMD first.

### 5. Rolling Into Wrong Account Type

Rolling Roth to Traditional = excess contribution + penalties.

---

## Inherited IRA Rules

### Non-Spouse Beneficiary

- Cannot roll into own IRA
- Must take distributions (10-year rule for most beneficiaries)

### Spouse Beneficiary Options

1. **Treat as own IRA** (if sole beneficiary)
2. **Remain as beneficiary** (take distributions based on own life)
3. **Roll to own IRA**

---

## In-Plan Roth Conversions

### What It Is

Converting pre-tax 401(k) funds to Roth 401(k) within the same plan.

### Tax Consequences

Converted amount is taxable income (no 10% penalty).

### Benefit

Keeps money in 401(k) (better creditor protection in some states).

---

## Key Takeaways

1. **Direct transfer** preferred—unlimited, no tax reporting
2. **60-day rule**: Funds must be deposited within 60 days
3. **One per year**: Only one IRA-to-IRA 60-day rollover per 12 months
4. **20% withholding**: Applies to employer plan distributions (not direct)
5. **RMDs cannot be rolled over**—take distribution first, then roll excess
    `,
    keyTakeaways: [
      "Direct transfer: Unlimited, no 1099-R, no withholding - always prefer",
      "60-day rollover: Must deposit within 60 days; one per 12 months for IRAs",
      "20% withholding applies to employer plan checks - use direct rollover to avoid",
      "RMDs cannot be rolled over - satisfy RMD first, then roll the rest",
      "Roth can only roll to Roth; conversions create taxable income"
    ],
    keyFormulas: [
      "60-Day Deadline: Distribution date + 60 days",
      "One-per-year: Applies to IRA-to-IRA rollovers only"
    ],
    mnemonics: [
      "Direct = Do It (unlimited)",
      "60 Days = 2 months max to re-deposit"
    ],
    practiceProblems: [
      {
        question: "A client receives a $50,000 check from their 401(k) to roll to an IRA. How much was withheld and what must they deposit to avoid tax?",
        answer: "20% withheld = $10,000. Client received $40,000. Must deposit $50,000 into IRA (finding $10,000 elsewhere) to avoid tax on the full amount."
      },
      {
        question: "A client did a 60-day IRA rollover in March. In September, they want to do another 60-day IRA rollover. Is this permitted?",
        answer: "No. Only one IRA-to-IRA 60-day rollover per 12-month period. The September rollover would be treated as a taxable distribution."
      },
      {
        question: "A 74-year-old wants to roll their entire 401(k) to an IRA. Can they roll all of it?",
        answer: "No. They must first satisfy their RMD for the year compared to the 401(k). The RMD cannot be rolled over. Then they can roll the remaining balance."
      }
    ],
    relatedLessons: ["CFP-RET-L009", "CFP-RET-L010", "CFP-RET-L005"]
  }
];

export default CFP_RET3_LESSONS;
