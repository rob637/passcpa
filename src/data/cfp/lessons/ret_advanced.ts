/**
 * CFP Domain 6: Retirement Savings and Income Planning
 * Advanced Retirement Lessons
 * 
 * These lessons cover SECURE 2.0, tax-efficient withdrawals, early retirement,
 * and working in retirement.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_RET6_LESSONS: CFPLesson[] = [
  {
    id: "CFP-RET-L021",
    domain: "CFP-RET",
    blueprintArea: "RET-5",
    title: "SECURE Act 2.0 and Legislative Updates",
    order: 21,
    duration: 50,
    objectives: [
      "Apply key provisions of SECURE Act 2.0",
      "Explain changes to RMD rules and age thresholds",
      "Evaluate new Roth options in employer plans",
      "Analyze emergency savings provisions"
    ],
    content: `
# SECURE Act 2.0 and Legislative Updates

SECURE 2.0 (2022) builds on the original SECURE Act (2019), implementing dozens of retirement planning changes. Understanding these provisions is essential for current practice.

---

## RMD Age Changes

### Evolution of RMD Age

| Birth Year Range | RMD Beginning Age |
|------------------|-------------------|
| Before 1951 | 70½ (old rule) |
| 1951-1959 | 73 (SECURE 2.0) |
| 1960 or later | 75 (effective 2033) |

### RMD Penalty Reduction

| Old Rule | New Rule (SECURE 2.0) |
|----------|----------------------|
| 50% penalty on missed RMD | 25% penalty (10% if corrected quickly) |

### Roth Accounts in Plans

| Before | After SECURE 2.0 |
|--------|------------------|
| Roth 401(k)/403(b) had RMDs | No RMDs from Roth employer accounts |
| Starting 2024, Roth 401(k)s align with Roth IRAs | |

---

## Enhanced Catch-Up Contributions

### Standard Catch-Up

| Plan Type | Regular Limit (2026) | Catch-Up (50+) |
|-----------|---------------------|----------------|
| 401(k)/403(b) | $24,500 | +$7,500 |
| IRA | $7,500 | +$1,000 |

### SECURE 2.0 "Super" Catch-Up (Ages 60-63)

Starting 2025:
- Ages 60-63 can contribute the greater of:
  - $10,000, or
  - 150% of the regular catch-up

| Age | Catch-Up Amount |
|-----|-----------------|
| 50-59 | $7,500 |
| 60-63 | ~$11,250 (150% × $7,500) |
| 64+ | Back to $7,500 |

### Mandatory Roth Catch-Ups for High Earners

Starting 2026, catch-up contributions for those earning >$145,000 must be designated Roth.

---

## New Account Types and Features

### Emergency Savings Accounts

| Feature | Detail |
|---------|--------|
| **What** | Retirement-plan-linked emergency savings |
| **Limit** | $2,500 per employee |
| **Contributions** | After-tax (Roth treatment) |
| **Withdrawals** | Tax-free, once per month, no penalty |

### 529-to-Roth Rollovers

| Requirement | Detail |
|-------------|--------|
| **Account age** | 529 must be open 15+ years |
| **Contribution age** | Funds must have been in 529 for 5+ years |
| **Annual limit** | Roth IRA contribution limit applies |
| **Lifetime limit** | $35,000 per beneficiary |

### Starter 401(k) Plans

| Feature | Detail |
|---------|--------|
| **What** | Simplified 401(k) for small employers |
| **Contribution limit** | IRA limit ($7,000 + catch-up) |
| **Employer match** | Not required |
| **Testing** | Exempt from ADP/ACP tests |

---

## Student Loan Payment Matching

### What It Is

Employers can make 401(k) matching contributions based on employee student loan payments.

### How It Works

| Action | Result |
|--------|--------|
| Employee pays $500/month to student loans | Employer matches |
| Employee doesn't contribute to 401(k) | Match still applies |
| Match formula | Same as regular 401(k) match |

This helps employees who can't save for retirement due to student loan burdens.

---

## Automatic Enrollment Expansion

### New Requirement (Effective 2025)

New 401(k) and 403(b) plans must include automatic enrollment:

| Provision | Requirement |
|-----------|-------------|
| **Initial rate** | 3-10% of pay |
| **Auto-escalation** | 1% per year until 10-15% |
| **Opt-out** | Employees can opt out at any time |

Exempted:
- Plans established before 2025
- Employers with <10 employees
- Churches and governmental plans

---

## Penalty-Free Withdrawals

### Expanded Exceptions

| Exception | Amount | New/Expanded |
|-----------|--------|--------------|
| **Domestic abuse victim** | Lesser of $10,000 or 50% of vested balance | New |
| **Terminal illness** | Any amount | Clarified |
| **Disaster** | $22,000 | Expanded |
| **Emergency personal expenses** | $1,000/year (can repay for reuse) | New |

### Emergency Expense Withdrawal

- One per year, up to $1,000
- Penalty-free
- Repay within 3 years to take another
- No repayment = standard income tax

---

## Key Takeaways

1. **RMD age rises** to 73 (2023) and 75 (2033)
2. **No RMDs** from Roth 401(k)/403(b) starting 2024
3. **Super catch-up** for ages 60-63 starting 2025
4. **529-to-Roth transfers** now possible with restrictions
5. **Student loan matching** helps debt-burdened savers

---

## Practice Questions

1. Under SECURE 2.0, a person born in 1962 must begin RMDs at age:
   - A) 70½
   - B) 72
   - C) 73
   - D) 75

   **Answer: D** - Those born in 1960 or later must begin RMDs at age 75.

2. The new "super" catch-up contribution for ages 60-63 is:
   - A) Double the standard catch-up
   - B) 150% of the standard catch-up
   - C) An unlimited amount
   - D) Equal to the standard catch-up

   **Answer: B** - Ages 60-63 can contribute the greater of $10,000 or 150% of the regular catch-up.
`,
    keyTerms: [
      { term: "SECURE 2.0", definition: "2022 legislation expanding retirement savings access and flexibility" },
      { term: "Super Catch-Up", definition: "Enhanced catch-up contributions for ages 60-63" },
      { term: "529-to-Roth Rollover", definition: "Ability to move unused 529 funds to beneficiary's Roth IRA" },
      { term: "Emergency Savings Account", definition: "Retirement-plan-linked savings for emergencies up to $2,500" }
    ],
    relatedQuestionIds: ["CFP-RET-B7-041", "CFP-RET-B7-042"]
  },
  {
    id: "CFP-RET-L022",
    domain: "CFP-RET",
    blueprintArea: "RET-3",
    title: "Tax-Efficient Retirement Income Strategies",
    order: 22,
    duration: 55,
    objectives: [
      "Optimize withdrawal sequencing across account types",
      "Apply tax bracket management strategies",
      "Evaluate Roth conversion opportunities in retirement",
      "Minimize impact on Social Security and Medicare"
    ],
    content: `
# Tax-Efficient Retirement Income Strategies

How you withdraw from retirement accounts matters as much as how you save. Strategic withdrawal sequencing can save hundreds of thousands in lifetime taxes.

---

## The Three Account Types

### Tax Treatment Comparison

| Account Type | Contributions | Growth | Withdrawals |
|--------------|---------------|--------|-------------|
| **Tax-Deferred** (Traditional IRA, 401k) | Pre-tax deduction | Tax-deferred | Taxed as ordinary income |
| **Tax-Free** (Roth IRA, Roth 401k) | After-tax | Tax-free | Tax-free (if qualified) |
| **Taxable** (Brokerage) | After-tax | Taxed annually | Capital gains on sale |

### Why Sequencing Matters

Withdrawing from the wrong account can:
- Push you into higher tax brackets
- Increase Medicare premiums (IRMAA)
- Increase Social Security taxation
- Trigger Net Investment Income Tax

---

## Traditional Withdrawal Sequence

### Conventional Wisdom

1. **Taxable accounts first** (use up low-basis assets)
2. **Tax-deferred accounts second** (delay RMDs)
3. **Tax-free (Roth) last** (maximize tax-free growth)

### Why This May Be Wrong

| Problem | Consequence |
|---------|-------------|
| Large tax-deferred balance at RMD age | Forced into higher brackets |
| Preserving Roth too long | May not use it; heirs benefit, not you |
| Ignoring Medicare/SS thresholds | Unnecessary Medicare surcharges |

---

## Dynamic Withdrawal Strategy

### The Better Approach

| Year Type | Strategy |
|-----------|----------|
| **Low-income years** (early retirement) | Roth conversions, realize capital gains |
| **Pre-RMD years** | Draw down taxable + strategic conversions |
| **RMD years** | Satisfy RMDs, minimize other taxable income |
| **High-income years** | Tap Roth accounts to avoid bracket creep |

### Bracket Management

| Federal Bracket (2026) | Income Range (MFJ) |
|------------------------|--------------------|
| 10% | $0 - $24,500 |
| 12% | $24,501 - $99,550 |
| 22% | $99,551 - $212,300 |
| 24% | $212,301 - $405,400 |

**Strategy**: Fill lower brackets with taxable income, use Roth for amounts that would push into higher brackets.

---

## Roth Conversions in Retirement

### When Conversions Make Sense

| If... | Then... |
|-------|---------|
| Early retirement with low income | Convert at low rates |
| Before Social Security starts | Avoid SS taxation |
| Before RMDs begin | Reduce future RMDs |
| Estate planning priority | Leave tax-free assets to heirs |

### Conversion Limits to Consider

- Stay below IRMAA thresholds
- Don't trigger Net Investment Income Tax
- Don't push into 32%+ brackets unnecessarily
- Consider state income tax impact

### Calculating "Room" for Conversion

| Item | Amount |
|------|--------|
| Standard deduction (MFJ) | $30,700 |
| Social Security (taxable portion) | $20,000 |
| Other income | $10,000 |
| Top of 12% bracket | $99,400 |
| "Room" in 12% bracket | $39,300 |

Convert up to $39,300 without entering 22% bracket.

---

## Social Security Taxation

### How Benefits Are Taxed

| Combined Income* | % of SS Taxable |
|------------------|-----------------|
| <$32,000 (MFJ) | 0% |
| $32,000-$44,000 | Up to 50% |
| >$44,000 | Up to 85% |

*Combined income = AGI + 50% of SS benefits + tax-exempt interest

### The Withdrawal Strategy Impact

| Withdrawal Source | Impact on SS Taxation |
|-------------------|----------------------|
| Taxable account | Capital gains add to combined income |
| Traditional IRA/401(k) | Adds to AGI |
| **Roth IRA** | **No impact on combined income** |

> **Key strategy**: Use Roth withdrawals to keep combined income below SS taxation thresholds.

---

## IRMAA (Medicare Premium Surcharge)

### What It Is

Income-Related Monthly Adjustment Amount adds to Medicare Part B and D premiums for higher earners.

### 2026 IRMAA Thresholds (Medicare premiums look back 2 years)

| Income (MAGI, MFJ) | Part B Monthly Premium |
|--------------------|------------------------|
| ≤$206,000 | $174.70 (standard) |
| $206,000-$258,000 | $244.60 |
| $258,000-$322,000 | $349.40 |
| $322,000-$386,000 | $454.20 |
| $386,000-$750,000 | $559.00 |
| >$750,000 | $594.00 |

### Strategy

- Manage income in year **two years before** Medicare enrollment
- Large Roth conversions before age 63 (before affecting Medicare premiums at 65)
- Use Roth distributions to stay below IRMAA thresholds

---

## Key Takeaways

1. **Sequence withdrawals** to minimize lifetime taxes, not just this year's
2. **Fill lower brackets** with taxable income; use Roth for overflow
3. **Convert to Roth** during low-income years before RMDs and SS
4. **Roth withdrawals** don't affect SS taxation or IRMAA
5. **Plan two years ahead** for Medicare premium management

---

## Practice Questions

1. A retired couple has $60,000 in Social Security benefits and wants to minimize taxation. They should primarily withdraw from:
   - A) Traditional IRA
   - B) Taxable brokerage account
   - C) Roth IRA
   - D) It doesn't matter

   **Answer: C** - Roth withdrawals don't add to combined income, minimizing Social Security taxation.

2. The BEST time to do large Roth conversions is typically:
   - A) While working at peak earnings
   - B) After RMDs begin
   - C) During early retirement before Social Security and RMDs
   - D) At age 75+

   **Answer: C** - Early retirement often has the lowest income, making conversions most tax-efficient.
`,
    keyTerms: [
      { term: "Withdrawal Sequencing", definition: "Order of drawing from different account types to minimize taxes" },
      { term: "Combined Income", definition: "AGI + 50% Social Security + tax-exempt interest for SS taxation" },
      { term: "IRMAA", definition: "Medicare premium surcharge for higher earners" },
      { term: "Bracket Management", definition: "Strategic income realization to stay within tax brackets" }
    ],
    relatedQuestionIds: ["CFP-RET-B7-043", "CFP-RET-B7-044"]
  },
  {
    id: "CFP-RET-L023",
    domain: "CFP-RET",
    blueprintArea: "RET-3",
    title: "Early Retirement Strategies",
    order: 23,
    duration: 50,
    objectives: [
      "Apply Rule of 55 and SEPP (72(t)) exceptions",
      "Evaluate bridge strategies to age 59½",
      "Calculate sustainable withdrawal rates for early retirees",
      "Plan healthcare coverage before Medicare eligibility"
    ],
    content: `
# Early Retirement Strategies

Retiring before 59½ requires careful planning to access retirement funds without penalties. Understanding the available exceptions is essential.

---

## Accessing Retirement Funds Early

### The 10% Early Withdrawal Penalty

Applies to most distributions from qualified plans and IRAs before age 59½.

### Key Exceptions

| Exception | 401(k)/403(b) | IRA |
|-----------|---------------|-----|
| Rule of 55 (separation from service) | ✅ | ❌ |
| SEPP/72(t) | ✅ | ✅ |
| Disability | ✅ | ✅ |
| Death | ✅ | ✅ |
| Medical expenses >7.5% AGI | ✅ | ✅ |
| First-time home ($10K) | ❌ | ✅ |
| Higher education expenses | ❌ | ✅ |

---

## Rule of 55

### What It Is

Penalty-free access to 401(k)/403(b) if you leave employment at age 55 or older.

### Requirements

| Requirement | Detail |
|-------------|--------|
| **Age** | 55 or older in year of separation |
| **Employment** | Separate from employer maintaining plan |
| **Which plan** | Only the plan at that employer |

### What Doesn't Qualify

- IRA funds (doesn't apply)
- Rolled-over funds from a previous employer
- If quit at 54, even if turn 55 same year

### SECURE 2.0 Update

Age lowered to 50 for public safety employees (police, firefighters, EMS).

---

## SEPP (Substantially Equal Periodic Payments) / 72(t)

### What It Is

Series of equal payments based on life expectancy that can start at any age.

### The Rules

| Requirement | Detail |
|-------------|--------|
| **Duration** | 5 years or until age 59½, whichever is LATER |
| **Frequency** | At least annual payments |
| **Modification** | If modified, retroactive 10% penalty applies |

### Three Calculation Methods

| Method | Payment Size | Complexity |
|--------|--------------|------------|
| **Required Minimum Distribution** | Lowest | Simplest |
| **Fixed Amortization** | Medium/High | Moderate |
| **Fixed Annuitization** | Medium/High | Moderate |

### Example: SEPP Calculation

| Factor | Value |
|--------|-------|
| IRA balance | $1,000,000 |
| Age | 50 |
| Life expectancy | 34.2 years |
| Interest rate (IRS approved) | 4% |
| **Fixed amortization payment** | ~$52,000/year |

### SEPP Risks

- Locked in for 5+ years
- Can't contribute, can't take extra
- Modification = retroactive penalty on all withdrawals

---

## Taxable Account Bridge Strategy

### The Concept

Use taxable investments to fund living expenses until age 59½, leaving retirement accounts intact.

### How It Works

| Years | Action |
|-------|--------|
| **Age 50-54** | Live on taxable account |
| **Age 55** | Rule of 55 unlocks 401(k) |
| **Age 59½** | All accounts accessible |

### Tax Efficiency

| Account | Tax Treatment |
|---------|---------------|
| Taxable (long-term gains) | 0%/15%/20% |
| Traditional IRA/401(k) | Ordinary income rates |

Low-income early retirees may owe 0% on capital gains.

---

## Roth Conversion Ladder

### The Strategy

1. Convert Traditional IRA to Roth each year
2. Wait 5 years (seasoning requirement)
3. Withdraw converted amounts penalty-free

### Timeline

| Year | Action |
|------|--------|
| Year 1 | Convert $50K Traditional → Roth |
| Year 2 | Convert $50K |
| Year 3 | Convert $50K |
| Year 4 | Convert $50K |
| Year 5 | Convert $50K |
| Year 6 | Withdraw Year 1 conversion ($50K) penalty-free |
| Year 7 | Withdraw Year 2 conversion... |

### Requirements

- Roth must be open 5+ years before any earnings withdrawal
- Each conversion has its own 5-year clock for penalty-free access

---

## Healthcare Bridge Strategies

### The Gap

Medicare begins at 65; early retirees need coverage for potentially 10+ years.

### Options

| Option | Pros | Cons |
|--------|------|------|
| **ACA Marketplace** | Income-based subsidies | Must manage income carefully |
| **COBRA** | Continue employer coverage | Expensive (full cost + 2%) |
| **Spouse coverage** | May be generous | Tied to spouse's employment |
| **Health sharing ministry** | Lower cost | Not true insurance |
| **Short-term plans** | Cheap | Limited coverage |

### ACA Subsidy Strategy

Keep MAGI below 400% of FPL for premium tax credits:
- 2026: ~$60,240 (single), ~$124,800 (family of 4)

**Strategy**: Use Roth withdrawals (not counted in MAGI) to stay below subsidy thresholds.

---

## Key Takeaways

1. **Rule of 55** unlocks 401(k) at separation from service at 55+
2. **SEPP/72(t)** allows any-age access with serious commitment
3. **Taxable accounts** bridge to 59½ at favorable rates
4. **Roth ladder** provides penalty-free access after 5-year seasoning
5. **Healthcare costs** are the biggest early retirement wildcard

---

## Practice Questions

1. A 52-year-old who retires and wants immediate access to her 401(k) should use:
   - A) Rule of 55
   - B) SEPP (72(t))
   - C) First-time homebuyer exception
   - D) Cannot access without penalty

   **Answer: B** - Rule of 55 requires age 55+ at separation; SEPP can start at any age (though with commitment).

2. The Roth conversion ladder requires how long before converted funds can be withdrawn penalty-free?
   - A) 1 year
   - B) 3 years
   - C) 5 years
   - D) Until age 59½

   **Answer: C** - Each conversion must season for 5 years before penalty-free withdrawal of converted principal.
`,
    keyTerms: [
      { term: "Rule of 55", definition: "Penalty-free 401(k) access at separation from service at age 55+" },
      { term: "SEPP", definition: "Substantially Equal Periodic Payments allowing penalty-free access at any age" },
      { term: "Roth Conversion Ladder", definition: "Strategy to access IRA funds penalty-free using 5-year seasoning" },
      { term: "Healthcare Bridge", definition: "Coverage strategy between retirement and Medicare eligibility" }
    ],
    relatedQuestionIds: ["CFP-RET-B7-045", "CFP-RET-B7-046"]
  },
  {
    id: "CFP-RET-L024",
    domain: "CFP-RET",
    blueprintArea: "RET-4",
    title: "Working in Retirement",
    order: 24,
    duration: 45,
    objectives: [
      "Apply Social Security earnings test rules",
      "Analyze impact of retirement work on benefits",
      "Evaluate encore career and phased retirement options",
      "Plan for continued retirement contributions"
    ],
    content: `
# Working in Retirement

Many retirees continue working for income, purpose, or both. Understanding how work affects retirement benefits is essential.

---

## Social Security Earnings Test

### What It Is

Reduction in Social Security benefits for those who work before Full Retirement Age (FRA).

### 2026 Limits

| Age | Limit | Penalty |
|-----|-------|---------|
| Under FRA all year | $23,400/year | $1 withheld per $2 over limit |
| Year reaching FRA | $59,520 (months before FRA) | $1 withheld per $3 over limit |
| At or after FRA | No limit | No reduction |

### Example: Early Retirement with Work Income

| Factor | Amount |
|--------|--------|
| Age | 63 |
| Earnings | $40,000 |
| Earnings limit (2026) | $23,400 |
| Excess earnings | $17,680 |
| Benefits withheld | $8,840 ($17,680 ÷ 2) |
| Annual SS benefit | $24,000 |
| Benefits received | $15,160 |

### Good News: Benefits Restored Later

Withheld benefits aren't lost forever:
- At FRA, benefits are recalculated
- Higher monthly benefit accounts for withheld months
- May "break even" within 12-15 years

---

## What Counts as "Earnings"?

### Counted

| Income Type | Counts? |
|-------------|---------|
| W-2 wages | ✅ |
| Self-employment income | ✅ |
| Bonus, commission | ✅ |

### Not Counted

| Income Type | Counts? |
|-------------|---------|
| Investment income | ❌ |
| Pension | ❌ |
| IRA/401(k) distributions | ❌ |
| Capital gains | ❌ |
| Rental income (passive) | ❌ |

---

## Impact on Social Security Benefits

### Delayed Retirement Credits

| Delay Beyond FRA | Increase per Year |
|------------------|-------------------|
| Each year to age 70 | 8% |
| Maximum increase (age 70) | 24-32% (depending on FRA) |

Working past FRA and delaying benefits provides both:
1. Delayed retirement credits (8%/year)
2. Potentially higher AIME from continued earnings

### Recalculated Benefits

Social Security uses highest 35 years of indexed earnings.
- Working in retirement may replace lower-earning early years
- Higher earnings = higher benefit calculation

---

## Medicare While Working

### Medicare as Secondary Payer

| Situation | Primary Payer |
|-----------|---------------|
| Employer with <20 employees | Medicare |
| Employer with 20+ employees | Employer plan |
| Self-employed | Medicare |

### Should You Delay Medicare?

| Scenario | Recommendation |
|----------|----------------|
| Good employer coverage (20+ employees) | May delay Part B (no late penalty) |
| Employer coverage is secondary | Enroll in Part B |
| Leaving job soon | Enroll in Part B within 8 months of leaving |

### HSA Considerations

| Situation | HSA Contribution Allowed? |
|-----------|--------------------------|
| Enrolled in Medicare Part A or B | ❌ No |
| Still on HDHP, not on Medicare | ✅ Yes |

Stop HSA contributions 6 months before Medicare (retroactive Part A enrollment).

---

## Continuing Retirement Contributions

### Can You Still Contribute?

| Account | While Working | Age Limits |
|---------|---------------|------------|
| 401(k)/403(b) | Yes, if employer offers | None |
| Traditional IRA | Yes (with earned income) | None (SECURE Act) |
| Roth IRA | Yes (income limits apply) | None |
| SEP-IRA | Yes (self-employed income) | None |

### RMDs While Working

| Situation | RMD Required? |
|-----------|---------------|
| Traditional IRA | Yes, at RMD age |
| Current employer 401(k) | No, if still working (5% exception) |
| Former employer 401(k) | Yes |
| Roth IRA | No |
| Roth 401(k) | No (SECURE 2.0) |

---

## Phased Retirement

### What It Is

Gradual transition from full-time work to full retirement.

### Employer Programs

| Feature | Description |
|---------|-------------|
| **Reduced hours** | Part-time schedule with pro-rated pay |
| **In-service distributions** | Access 401(k) while still working (62+) |
| **Mentoring role** | Knowledge transfer to younger workers |
| **Benefits continuation** | May maintain health coverage |

### Self-Directed Phased Retirement

| Strategy | How It Works |
|----------|--------------|
| **Contract/consultant** | Leave employer, return as independent |
| **Encore career** | New field with lower stress/hours |
| **Part-time W-2** | Reduced schedule at same or new employer |

---

## Key Takeaways

1. **Earnings test** reduces SS benefits before FRA (but increases later)
2. **Investment income** doesn't count against earnings test
3. **Delayed retirement credits** (8%/year) reward working past FRA
4. **Medicare enrollment** timing matters when employer coverage exists
5. **Stop HSA contributions** 6 months before Medicare enrollment

---

## Practice Questions

1. A 64-year-old who earns $50,000 and claims Social Security benefits will have benefits reduced by:
   - A) Nothing—there's no earnings test
   - B) ~$13,840 for the year
   - C) The full benefit amount
   - D) 50% of benefits

   **Answer: B** - Excess earnings: $50,000 - $23,400 = $26,600. Withheld: $26,600 ÷ 2 = $13,300.

2. A 67-year-old (past FRA) working and earning $100,000:
   - A) Has Social Security benefits reduced
   - B) Cannot claim Social Security
   - C) Has no earnings test reduction
   - D) Must delay claiming until age 70

   **Answer: C** - After FRA, there is no earnings test; work does not reduce benefits.
`,
    keyTerms: [
      { term: "Earnings Test", definition: "Reduction in Social Security benefits for those working before FRA" },
      { term: "Delayed Retirement Credits", definition: "8% annual increase for delaying Social Security past FRA" },
      { term: "Phased Retirement", definition: "Gradual transition from full-time work to full retirement" },
      { term: "In-Service Distribution", definition: "Accessing 401(k) while still employed (typically 59½ or 62+)" }
    ],
    relatedQuestionIds: ["CFP-RET-B7-047", "CFP-RET-B7-048"]
  },
  {
    id: "CFP-RET-L025",
    domain: "CFP-RET",
    blueprintArea: "RET-3",
    title: "Annuities in Retirement Income Planning",
    order: 25,
    duration: 50,
    objectives: [
      "Compare immediate vs. deferred annuity structures",
      "Evaluate income annuity features and guarantees",
      "Apply annuity taxation rules",
      "Determine appropriate annuity allocation in retirement"
    ],
    content: `
# Annuities in Retirement Income Planning

Annuities can provide guaranteed lifetime income. Understanding when and how to use them helps create secure retirement income plans.

---

## Types of Annuities for Income

### Overview

| Type | Purpose | Risk |
|------|---------|------|
| **Single Premium Immediate Annuity (SPIA)** | Immediate income | Longevity protection |
| **Deferred Income Annuity (DIA)** | Future income | Longevity protection |
| **Variable Annuity w/ GLWB** | Growth + guaranteed floor | Market + longevity |
| **Fixed Index Annuity** | Moderate growth + downside protection | Longevity |

---

## Single Premium Immediate Annuity (SPIA)

### How It Works

| Step | Action |
|------|--------|
| 1 | Pay lump sum to insurance company |
| 2 | Begin receiving lifetime monthly payments immediately |
| 3 | Payments continue until death (or term/period certain) |

### Payment Options

| Option | Description |
|--------|-------------|
| **Life only** | Highest payout; stops at death |
| **Life with period certain** | Guaranteed period (e.g., 10 years) even if death |
| **Joint and survivor** | Covers two lives; lower initial payout |
| **Life with cash refund** | Beneficiaries receive remaining premium at death |

### Payout Example (2026 rates, approximate)

| Premium | Age | Gender | Life-Only Monthly | 10-Year Certain |
|---------|-----|--------|-------------------|-----------------|
| $100,000 | 65 | Male | ~$570 | ~$540 |
| $100,000 | 70 | Female | ~$600 | ~$560 |

---

## Deferred Income Annuity (DIA/QLAC)

### What It Is

Pay premium now, receive income starting in the future (often 10-20 years later).

### Why Use It

| Benefit | Explanation |
|---------|-------------|
| **Longevity insurance** | Income if you live to 80, 85+ |
| **Lower cost** | "Mortality credits" from those who don't survive |
| **RMD reduction** | QLAC (Qualified Longevity Annuity Contract) reduces RMD base |

### QLAC Rules

| Rule | Detail |
|------|--------|
| **Maximum purchase** | $200,000 (SECURE 2.0) |
| **Account source** | IRA, 401(k), 403(b) |
| **RMD exclusion** | QLAC value excluded from RMD calculation |
| **Start date** | Can be as late as age 85 |

---

## Variable Annuity with GLWB

### What's a GLWB?

Guaranteed Lifetime Withdrawal Benefit—a rider providing guaranteed minimum income regardless of account performance.

### How It Works

| Component | Description |
|-----------|-------------|
| **Benefit base** | Notional value for calculating withdrawals (not cash value) |
| **Withdrawal rate** | Typically 4-6% of benefit base, guaranteed for life |
| **Step-ups** | Benefit base may increase if market performs well |
| **Fees** | 0.75-1.5% annually for rider plus fund expenses |

### Example

| Factor | Value |
|--------|-------|
| Premium invested | $500,000 |
| Benefit base (after step-ups) | $600,000 |
| Guaranteed withdrawal rate | 5% |
| Annual guaranteed income | $30,000 for life |
| Actual account value | May be higher or lower |

### Trade-Offs

| Pro | Con |
|-----|-----|
| Upside participation | High fees (1.5-3% all-in) |
| Downside protection | Complexity |
| Guaranteed floor | May underperform simple portfolio |

---

## Annuity Taxation

### Non-Qualified (After-Tax) Annuities

| Phase | Treatment |
|-------|-----------|
| **Accumulation** | Tax-deferred growth |
| **Withdrawal** | Gain comes out first (LIFO)—taxed as ordinary income |
| **Annuitization** | Exclusion ratio—each payment is part return of principal |

### Exclusion Ratio Example

| Factor | Value |
|--------|-------|
| Premium | $100,000 |
| Expected return (total payments) | $200,000 |
| Exclusion ratio | 50% ($100K ÷ $200K) |
| Monthly payment | $1,000 |
| Taxable portion | $500 |
| Tax-free return of principal | $500 |

### Qualified (IRA/401k) Annuities

All distributions are ordinary income (like any qualified plan distribution).

---

## How Much to Annuitize?

### The Annuity Puzzle

| Pro | Con |
|-----|-----|
| Longevity protection | Illiquidity |
| Guaranteed income | Inflation erosion |
| Reduces sequence risk | Loss of legacy at death |

### Rules of Thumb

| Guideline | Rationale |
|-----------|-----------|
| Cover essential expenses | Annuity income + SS ≥ needs |
| Annuitize 20-40% of portfolio | Balance guarantee and flexibility |
| Consider deferred annuity for longevity | QLAC or DIA at 10-20% |
| Don't over-annuitize | Keep liquidity for emergencies/legacy |

### When Annuities Make Sense

| Client Profile | Appropriate? |
|----------------|--------------|
| No pension, wants guaranteed income | ✅ Strong fit |
| Long life expectancy | ✅ Will "win" with longevity |
| High legacy priority | ⚠️ Consider guarantees/joint |
| Wealthy with ample assets | ❔ May not need guarantees |
| Poor health/short life expectancy | ❌ Unlikely to benefit |

---

## Key Takeaways

1. **SPIAs** provide immediate guaranteed income for life
2. **DIAs/QLACs** provide longevity insurance starting later
3. **Variable annuities with GLWB** offer market upside with income floor
4. **Exclusion ratio** determines tax treatment of non-qualified annuities
5. **Annuitize essential expenses**—don't over-commit liquidity

---

## Practice Questions

1. A client wants guaranteed income starting at age 80 to protect against longevity risk. The BEST product is:
   - A) Single Premium Immediate Annuity (SPIA)
   - B) Variable universal life
   - C) Deferred Income Annuity (DIA) or QLAC
   - D) Fixed deferred annuity

   **Answer: C** - DIAs and QLACs are designed for deferred income, ideal for longevity protection at advanced ages.

2. With a non-qualified annuity, withdrawals before annuitization are taxed:
   - A) As capital gains
   - B) Using the exclusion ratio
   - C) Gain first, as ordinary income (LIFO)
   - D) On a first-in, first-out basis

   **Answer: C** - Non-qualified annuity withdrawals use LIFO—taxable gain comes out before tax-free return of principal.
`,
    keyTerms: [
      { term: "SPIA", definition: "Single Premium Immediate Annuity providing immediate lifetime income" },
      { term: "DIA", definition: "Deferred Income Annuity starting payments in the future" },
      { term: "QLAC", definition: "Qualified Longevity Annuity Contract purchased in qualified accounts" },
      { term: "GLWB", definition: "Guaranteed Lifetime Withdrawal Benefit rider on variable annuities" },
      { term: "Exclusion Ratio", definition: "Tax-free portion of each annuity payment based on premium vs. return" }
    ],
    relatedQuestionIds: ["CFP-RET-B7-049", "CFP-RET-B7-050"]
  }
];
