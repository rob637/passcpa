/**
 * CFP Domain 2: General Principles of Financial Planning
 * Area GEN-4: Education Planning
 * 
 * These lessons cover 529 plans, Coverdell ESAs, 
 * education tax benefits, and financial aid considerations.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_GEN4_LESSONS: CFPLesson[] = [
  {
    id: "CFP-GEN-L016",
    domain: "CFP-GEN",
    blueprintArea: "GEN-4",
    title: "529 Plans - Qualified Tuition Programs",
    order: 16,
    duration: 50,
    objectives: [
      "Explain the two types of 529 plans",
      "Summarize contribution limits and gift tax treatment",
      "Identify qualified education expenses",
      "Apply 529 distribution rules and penalties",
      "Discuss investment options and fee structures"
    ],
    content: `
# 529 Plans - Qualified Tuition Programs

**529 Plans** are state-sponsored, tax-advantaged savings accounts designed to encourage saving for future education costs.

---

## Two Types of 529 Plans

### 1. 529 College Savings Plans

The **most common type** - works like an investment account.

| Feature | Description |
|---------|-------------|
| Contributions | Cash only, invested in mutual fund-like options |
| Control | Account owner controls investments and distributions |
| Use | Any eligible institution nationwide |
| Growth | Tax-deferred; tax-free if used for qualified expenses |

### 2. Prepaid Tuition Plans

Allows purchasing **future tuition at today's prices**.

| Feature | Description |
|---------|-------------|
| Contributions | Purchase tuition credits/units |
| Guarantee | Covers future tuition regardless of increases |
| Use | Usually limited to participating schools (often in-state) |
| Status | Declining - fewer states offer them |

> **Exam Tip**: Most questions focus on 529 College Savings Plans. Know both types exist.

---

## Key Tax Benefits

### Federal Tax Treatment

| Benefit | Description |
|---------|-------------|
| **No federal deduction** | Contributions are NOT federally tax-deductible |
| **Tax-deferred growth** | Earnings grow without annual taxation |
| **Tax-free withdrawals** | For qualified education expenses |
| **Gift tax exclusion** | Contributions qualify for annual exclusion |

### State Tax Treatment

Many states offer **state income tax deductions** for contributions:
- Deduction limited to in-state plans for some states
- Some states offer deduction for any plan
- Varies widely - know the client's state

---

## Contribution Rules

### No Federal Limit - But...

There's no annual federal contribution limit, but:

| Consideration | Details |
|---------------|---------|
| **Gift tax** | Contributions over $18,000/year (2024) per beneficiary use lifetime exclusion |
| **State limits** | Aggregate limits typically $300,000-$550,000 per beneficiary |
| **Income limits** | NONE - anyone can contribute regardless of income |

### Super-Funding (5-Year Election)

Contributors can make a **lump sum contribution** and spread it over 5 years for gift tax purposes.

**2024 Example**:
- Maximum super-fund amount: $18,000 × 5 = **$90,000**
- Married couple splitting gifts: $36,000 × 5 = **$180,000**

**Rules**:
- Must file Form 709 each year
- Contributor must survive 5 years or excess reverts to estate
- No additional gifts to that beneficiary during 5-year period

---

## SECURE 2.0 Act: 529 to Roth IRA Rollover

**Effective 2024**: Unused 529 funds can be rolled to a **Roth IRA** for the beneficiary.

### Requirements

| Requirement | Detail |
|-------------|--------|
| Account age | 529 must be open 15+ years |
| Contribution age | Contributions from last 5 years excluded |
| Annual limit | Subject to Roth IRA contribution limit ($7,000 in 2024) |
| Lifetime limit | $35,000 maximum rollover per beneficiary |
| Income test | Beneficiary must have earned income |

---

## Qualified Education Expenses

### Higher Education (Tax-Free Qualified)

- **Tuition and fees** - Required for enrollment
- **Room and board** - If enrolled at least half-time
- **Books and supplies** - Required for courses
- **Computers and equipment** - Required for enrollment
- **Special needs services** - For special needs beneficiaries
- **Student loan repayment** - Up to $10,000 lifetime (SECURE Act)

### K-12 Tuition (Limited)

- Up to **$10,000 per year** per beneficiary
- **Tuition only** - not books, supplies, or room

### Apprenticeship Programs

Registered apprenticeship programs now qualify for:
- Fees, books, supplies, equipment

---

## Non-Qualified Distributions

If funds used for **non-qualified expenses**:

| Component | Tax Treatment |
|-----------|---------------|
| **Contributions** | Return tax-free (already taxed) |
| **Earnings** | Taxed as ordinary income + 10% penalty |

### Penalty Waivers

The 10% penalty is waived if:
- Beneficiary receives tax-free scholarship (to extent of scholarship)
- Beneficiary attends U.S. military academy
- Beneficiary dies or becomes disabled
- Beneficiary receives qualifying employer education assistance

---

## Investment Options

### Typical Options

| Type | Description |
|------|-------------|
| **Age-based** | Automatically becomes more conservative as child ages |
| **Risk-based** | Choose aggressive, moderate, or conservative |
| **Static/Individual** | Choose specific funds (stocks, bonds, etc.) |

### Investment Changes

- **Limit**: Can change investment strategy **twice per year**
- Can change anytime when **changing beneficiaries**

---

## Account Ownership and Control

### Owner vs. Beneficiary

| Role | Rights |
|------|--------|
| **Account Owner** | Contributes, controls investments, requests distributions, can change beneficiary |
| **Beneficiary** | Person whose education expenses are paid; no control rights |

### Changing Beneficiaries

Can change to another **member of the family** without tax consequences:
- Siblings, children, parents, grandparents
- First cousins, aunts, uncles
- In-laws of the above
- Spouse of the beneficiary

---

## Financial Aid Impact

### FAFSA Treatment

| Owner Type | EFC Impact |
|------------|------------|
| Parent-owned | Counted as parental asset (5.64% maximum) |
| Student-owned | Counted as student asset (higher impact) |
| Grandparent-owned | Previously distributions as untaxed income (now simplified) |

**FAFSA Simplification Act (2024)**: Grandparent-owned 529s no longer count against student aid.

---

## Key Takeaways

1. **529 College Savings Plans** = investment accounts with tax-free growth for education
2. **No federal deduction**, but many states offer deductions
3. **Super-funding**: Up to 5 years of gifts at once ($90,000 single/$180,000 married)
4. **SECURE 2.0**: Unused funds can roll to Roth IRA ($35,000 lifetime limit)
5. Non-qualified withdrawals: **Earnings taxed + 10% penalty**
    `,
    keyTakeaways: [
      "Two types: College Savings Plans (most common) and Prepaid Tuition Plans",
      "No federal deduction; tax-deferred growth; tax-free for qualified expenses",
      "Super-funding: 5-year gift election allows $90,000 lump sum (2024)",
      "SECURE 2.0: Roll unused 529 to Roth IRA ($35,000 lifetime limit)",
      "Non-qualified: Earnings taxed as ordinary income + 10% penalty"
    ],
    keyFormulas: [
      "Super-fund limit = Annual gift exclusion × 5",
      "Non-qualified penalty = 10% on earnings portion only"
    ],
    mnemonics: [
      "529 = 5 to 9 (think K-5 through college)",
      "SECURE 2.0 Roth Rollover: 15 years, $35K limit, 5-year lookback"
    ],
    practiceProblems: [
      {
        question: "A grandparent wants to super-fund a 529 for their grandchild in 2024. If married and splitting gifts with spouse, what is the maximum lump sum contribution?",
        answer: "$36,000 × 5 = $180,000. Must file Form 709 for 5 years and survive the period."
      },
      {
        question: "A client withdraws $30,000 from a 529 ($20,000 contributions, $10,000 earnings) for non-qualified expenses. What is the tax impact?",
        answer: "The $20,000 of contributions is tax-free. The $10,000 of earnings is taxed as ordinary income plus a 10% penalty ($1,000)."
      },
      {
        question: "Under SECURE 2.0, what are the requirements to roll 529 funds to a Roth IRA?",
        answer: "529 must be open 15+ years, contributions from last 5 years excluded, annual limit is Roth contribution limit ($7,000), lifetime limit is $35,000."
      }
    ],
    relatedLessons: ["CFP-GEN-L017", "CFP-GEN-L018", "CFP-TAX-L010"]
  },

  {
    id: "CFP-GEN-L017",
    domain: "CFP-GEN",
    blueprintArea: "GEN-4",
    title: "Coverdell ESAs and Education Savings Bonds",
    order: 17,
    duration: 40,
    objectives: [
      "Explain Coverdell ESA contribution limits and income restrictions",
      "Compare Coverdell ESAs to 529 plans",
      "Describe Series EE and Series I bond education exclusions",
      "Apply coordination rules between education tax benefits"
    ],
    content: `
# Coverdell ESAs and Education Savings Bonds

Beyond 529 plans, Coverdell ESAs and certain savings bonds offer additional tax-advantaged education savings options.

---

## Coverdell Education Savings Accounts (ESAs)

### Overview

Coverdell ESAs (formerly Education IRAs) provide tax-free growth for education expenses.

| Feature | Detail |
|---------|--------|
| Annual contribution limit | **$2,000** per beneficiary |
| Contribution deadline | April 15 of following year |
| Income limits | Phase-out applies (see below) |
| Age limit | Beneficiary must be under 18 (exceptions for special needs) |
| Distribution deadline | Funds must be used by age 30 |

### Income Phase-Out (2024)

| Filing Status | Full Contribution | Phase-Out | No Contribution |
|---------------|-------------------|-----------|-----------------|
| Single/HOH | < $95,000 | $95,000 - $110,000 | > $110,000 |
| MFJ | < $190,000 | $190,000 - $220,000 | > $220,000 |

---

## Coverdell vs. 529 Comparison

| Feature | Coverdell ESA | 529 Plan |
|---------|---------------|----------|
| Annual contribution limit | $2,000 | No limit (gift tax applies) |
| Income limits | Yes (phase-out) | **None** |
| Age restrictions | Under 18 to contribute, 30 to use | **None** |
| K-12 expenses | Broad (tuition, books, supplies, uniforms) | **Tuition only** ($10,000 max) |
| Investment options | Self-directed (any investment) | Limited to plan options |
| State tax deduction | **No** | Often yes |

### Key Advantage of Coverdell
**Broader K-12 qualified expenses** - not just tuition, but also:
- Books and supplies
- Tutoring
- Uniforms
- Transportation
- Computer equipment

---

## Distribution Rules

### Qualified Education Expenses (Tax-Free)

**Higher Education**:
- Same as 529: tuition, fees, books, room & board, computer

**Elementary/Secondary (K-12)**:
- Tuition, fees, books, supplies
- Academic tutoring
- Room and board (if away from home)
- Uniforms
- Transportation
- Extended day programs

### Non-Qualified Distributions

Same as 529:
- Contributions return tax-free
- Earnings taxed as ordinary income + **10% penalty**

### Coordination with 529

Can contribute to **both** Coverdell and 529 in same year for same beneficiary, but:
- Total education tax benefits cannot exceed actual qualified expenses
- Expenses used for Coverdell can't also be used for 529 or AOTC/LLC

---

## Series EE and Series I Savings Bonds

### Education Tax Exclusion

Interest from EE and I bonds can be **tax-free** if used for qualified higher education expenses.

### Requirements

| Requirement | Detail |
|-------------|--------|
| Bond issuance | Must be issued **after 1989** |
| Owner age | Owner must be **at least 24** at issuance |
| Ownership | Owner or co-owner must be taxpayer, spouse, or dependent |
| Qualified expenses | Tuition and REQUIRED fees at eligible institution |
| Registration | Cannot be in child's name |

### Income Limits (2024)

| Filing Status | Full Exclusion | Phase-Out | No Exclusion |
|---------------|----------------|-----------|--------------|
| Single/HOH | < $96,800 | $96,800 - $111,800 | > $111,800 |
| MFJ | < $145,200 | $145,200 - $175,200 | > $175,200 |

### Calculation

If expenses < bond proceeds:
$$\\text{Excludable Interest} = \\text{Interest} \\times \\frac{\\text{Qualified Expenses}}{\\text{Bond Proceeds}}$$

### Example

**Bond redemption**: $15,000 (principal) + $3,000 (interest) = $18,000
**Qualified expenses**: $12,000

$$\\text{Excludable Interest} = \\$3,000 \\times \\frac{\\$12,000}{\\$18,000} = \\$2,000$$

**Tax-free interest**: $2,000
**Taxable interest**: $1,000

---

## Coordination Rules

### Same Year Contributions

Can fund multiple accounts for same beneficiary:
- 529 Plan
- Coverdell ESA
- UTMA/UGMA
- Trust accounts

### Same Expenses Cannot Be Double-Used

An expense can only qualify for **ONE** tax benefit:
- 529 tax-free distribution, OR
- Coverdell tax-free distribution, OR
- AOTC/LLC tax credit, OR
- Qualified scholarship

**Strategy**: Use some expenses for tax credits (AOTC/LLC) and others for 529/Coverdell.

---

## Key Takeaways

1. **Coverdell ESA**: $2,000 annual limit, income phase-out, age restrictions
2. **Coverdell advantage**: Broader K-12 expenses than 529 tuition-only limit
3. **Savings bonds**: Tax-free interest for education if requirements met
4. **Bond age rule**: Owner must be 24+ at issuance
5. **No double-dipping**: Same expense cannot qualify for multiple benefits
    `,
    keyTakeaways: [
      "Coverdell: $2,000/year limit, income phase-out, must use by age 30",
      "Coverdell K-12: Broader expenses (books, tutoring) vs. 529 tuition-only",
      "Savings bonds education exclusion: Owner must be 24+ at issuance",
      "Bonds must be in parent/taxpayer name, not child's name",
      "Same expense cannot be used for both 529/Coverdell AND education credits"
    ],
    keyFormulas: [
      "Coverdell: $2,000 max per beneficiary per year",
      "Bond exclusion = Interest × (Qualified Expenses / Total Proceeds)"
    ],
    practiceProblems: [
      {
        question: "A couple with $200,000 MAGI wants to contribute to a Coverdell for their child. What is the maximum contribution?",
        answer: "The $200,000 MAGI is in the phase-out range ($190,000-$220,000), so partial contribution is allowed. Contribution limit = $2,000 × [($220,000 - $200,000) / $30,000] = $1,333."
      },
      {
        question: "Parents redeem $25,000 in Series EE bonds ($20,000 principal + $5,000 interest) for $15,000 of qualifying tuition. How much interest is tax-free?",
        answer: "Excludable = $5,000 × ($15,000 / $25,000) = $3,000 tax-free; $2,000 taxable."
      }
    ],
    relatedLessons: ["CFP-GEN-L016", "CFP-GEN-L018", "CFP-TAX-L010"]
  },

  {
    id: "CFP-GEN-L018",
    domain: "CFP-GEN",
    blueprintArea: "GEN-4",
    title: "Education Tax Credits and Deductions",
    order: 18,
    duration: 45,
    objectives: [
      "Compare American Opportunity Tax Credit to Lifetime Learning Credit",
      "Apply income phase-outs for education credits",
      "Explain student loan interest deduction rules",
      "Coordinate tax benefits with 529 and Coverdell distributions"
    ],
    content: `
# Education Tax Credits and Deductions

Education tax credits provide dollar-for-dollar reductions in tax liability, often more valuable than deductions.

---

## American Opportunity Tax Credit (AOTC)

### Overview

The **most valuable** education tax credit for undergraduates.

| Feature | Detail |
|---------|--------|
| Maximum credit | **$2,500 per student per year** |
| Calculation | 100% of first $2,000 + 25% of next $2,000 |
| Refundable portion | **40% ($1,000) is refundable** |
| Eligibility period | **First 4 years** of post-secondary education |
| Enrollment | At least **half-time** |
| Felony drug conviction | **Disqualifies** |

### Qualified Expenses (AOTC)

- Tuition and required fees
- Course materials (books, supplies, equipment)
- **NOT**: Room and board, transportation, insurance

### Income Phase-Out (2024)

| Filing Status | Full Credit | Phase-Out | No Credit |
|---------------|-------------|-----------|-----------|
| Single/HOH | < $80,000 | $80,000 - $90,000 | > $90,000 |
| MFJ | < $160,000 | $160,000 - $180,000 | > $180,000 |

---

## Lifetime Learning Credit (LLC)

### Overview

Broader eligibility than AOTC, but smaller benefit.

| Feature | Detail |
|---------|--------|
| Maximum credit | **$2,000 per tax return** (not per student) |
| Calculation | 20% of first $10,000 in expenses |
| Refundable | **No** - non-refundable credit |
| Eligibility period | **Unlimited** - any year, any number of years |
| Enrollment | **Any enrollment** - even one course |
| Felony drug conviction | **No restriction** |

### Qualified Expenses (LLC)

- Tuition and required fees
- Course materials if required to be purchased from institution
- **NOT**: Books purchased elsewhere, room and board

### Income Phase-Out (2024)

| Filing Status | Full Credit | Phase-Out | No Credit |
|---------------|-------------|-----------|-----------|
| Single/HOH | < $80,000 | $80,000 - $90,000 | > $90,000 |
| MFJ | < $160,000 | $160,000 - $180,000 | > $180,000 |

---

## AOTC vs. LLC Comparison

| Feature | AOTC | LLC |
|---------|------|-----|
| Maximum | $2,500/student | $2,000/return |
| Refundable | Yes (40%) | No |
| Years available | 4 years only | Unlimited |
| Enrollment | Half-time minimum | Even one course |
| Professional degrees | No (undergrad only) | **Yes** |
| Graduate school | No | **Yes** |

> **Strategy**: Use AOTC for first 4 years of college; switch to LLC for 5th year or graduate school if needed.

---

## Choosing the Right Credit

**Choose AOTC when**:
- First 4 years of undergraduate
- The student has no felony drug conviction
- Need refundable credit (low tax liability)

**Choose LLC when**:
- Graduate school or professional degree
- 5th year of undergraduate
- Less than half-time enrollment
- Taking courses for job skills (not degree)

---

## Student Loan Interest Deduction

### Overview

**Above-the-line deduction** (reduces AGI regardless of itemizing).

| Feature | Detail |
|---------|--------|
| Maximum deduction | **$2,500 per year** |
| Loan type | Any qualified education loan |
| Interest only | Cannot deduct principal |
| Dependency | Cannot claim if claimed as dependent |

### Income Phase-Out (2024)

| Filing Status | Full Deduction | Phase-Out | No Deduction |
|---------------|----------------|-----------|--------------|
| Single/HOH | < $75,000 | $75,000 - $90,000 | > $90,000 |
| MFJ | < $155,000 | $155,000 - $185,000 | > $185,000 |

### Qualified Loans

- Federal student loans
- Private student loans
- Loans from any lender for qualified education expenses

**NOT Qualified**:
- Loans from relatives
- Employer plan loans
- Loans from qualified retirement plans

---

## Coordination with 529/Coverdell

### The Key Rule

**You cannot double-dip**: Expenses used for tax-free distributions CANNOT also be used for education credits.

### Optimal Strategy

For a student with $15,000 in tuition and $5,000 in books:

**Option A: All 529**
- Withdraw $20,000 tax-free from 529
- No education credits

**Option B: Split (Usually Better)**
- Withdraw $16,000 from 529 for room/board and remaining tuition
- Pay $4,000 of tuition out-of-pocket (or taxable 529)
- Claim AOTC: 100% × $2,000 + 25% × $2,000 = **$2,500 credit**

**Net Benefit**: $2,500 credit > tax avoided on $4,000 of 529 earnings

---

## Employer-Provided Education Assistance

### Section 127 Exclusion

| Feature | Detail |
|---------|--------|
| Maximum exclusion | **$5,250 per year** |
| Courses | Any education (doesn't need to be job-related) |
| Undergraduate and graduate | Both qualify |
| Student loans | Can be used for student loan repayment (through 2025) |

---

## Key Takeaways

1. **AOTC**: $2,500/student, 40% refundable, first 4 undergraduate years
2. **LLC**: $2,000/return, non-refundable, unlimited years, includes graduate
3. **Student loan interest**: Up to $2,500 deduction, above-the-line
4. **No double-dipping**: Separate expenses for 529/Coverdell vs. credits
5. **Employer education**: $5,250 tax-free per year
    `,
    keyTakeaways: [
      "AOTC: $2,500/student, 40% refundable, first 4 undergrad years only",
      "LLC: $2,000/return, non-refundable, any year, any enrollment level",
      "Student loan interest: Up to $2,500 above-the-line deduction",
      "Can't use same expenses for both 529 AND education credits",
      "Employer education assistance: $5,250 tax-free exclusion"
    ],
    keyFormulas: [
      "AOTC = 100% × first $2,000 + 25% × next $2,000 = max $2,500",
      "LLC = 20% × first $10,000 = max $2,000",
      "Refundable AOTC portion = 40% × credit (max $1,000)"
    ],
    mnemonics: [
      "AOTC = American = First 4 is the OPPORTUNITY",
      "LLC = Lifetime = LEARNING for LIFE (unlimited years)"
    ],
    practiceProblems: [
      {
        question: "A student in their second year of college has $6,000 in qualified expenses. What is their maximum AOTC?",
        answer: "AOTC = 100% × $2,000 + 25% × $4,000 = $2,000 + $1,000 = $2,500 (maximum credit)."
      },
      {
        question: "A graduate student has $10,000 in tuition. What is the maximum education credit available?",
        answer: "AOTC is not available for graduate students. LLC = 20% × $10,000 = $2,000 maximum."
      },
      {
        question: "A client pays $25,000 for their child's freshman year. They use a 529 for $21,000 and pay $4,000 out of pocket. Can they claim AOTC?",
        answer: "Yes, they can claim AOTC on the $4,000 paid out of pocket (not from 529). Full AOTC of $2,500 is available if $4,000+ is paid directly."
      }
    ],
    relatedLessons: ["CFP-GEN-L016", "CFP-GEN-L017", "CFP-TAX-L010"]
  },

  {
    id: "CFP-GEN-L019",
    domain: "CFP-GEN",
    blueprintArea: "GEN-4",
    title: "Financial Aid and Student Loan Strategies",
    order: 19,
    duration: 45,
    objectives: [
      "Explain FAFSA methodology and Expected Family Contribution",
      "Distinguish between asset treatment for different account types",
      "Compare federal and private student loan options",
      "Develop strategies to maximize financial aid eligibility"
    ],
    content: `
# Financial Aid and Student Loan Strategies

Understanding financial aid can help families maximize eligibility and minimize education costs.

---

## FAFSA Overview

The **Free Application for Federal Student Aid (FAFSA)** determines eligibility for:
- Federal grants (Pell Grant, FSEOG)
- Federal student loans (Direct)
- Work-study programs
- Many state and institutional aid programs

### FAFSA Simplification Act (Effective 2024-25)

Major changes include:
- New **Student Aid Index (SAI)** replaces EFC
- Reduced questions (108 → 36)
- Simplified needs test for more families
- Grandparent-owned 529s no longer counted as student income

---

## Student Aid Index (SAI) Calculation

### Parent Income Assessment

| Parent AGI Component | Treatment |
|---------------------|-----------|
| Total income | Starting point |
| Minus: Allowances | Income protection, employment expense, taxes |
| Adjusted Available Income (AAI) | Subject to 22%-47% contribution rate |

### Parent Asset Assessment

| Asset Type | Assessment Rate |
|------------|-----------------|
| Parent assets above asset protection | **Up to 5.64%** per year |
| Asset protection allowance | Based on age ($0 for younger parents) |

### Student Income Assessment

| Student Income | Treatment |
|----------------|-----------|
| Income protection | ~$9,410 (2024-25) |
| Income above protection | **50%** assessed |

### Student Asset Assessment

| Asset Type | Assessment Rate |
|------------|-----------------|
| All student assets | **20%** per year |

---

## Asset Treatment by Account Type

### Parental Assets (5.64% Maximum)

- **Parent-owned 529 plans** (student is beneficiary)
- **Cash, checking, savings**
- **Investment accounts** (non-retirement)
- **Real estate** (excluding primary home)
- **Business equity** (if >100 employees)

### Student Assets (20%)

- **Student-owned 529 plans**
- **UTMA/UGMA custodial accounts** (student is owner at majority)
- **Student savings/checking**
- **Student investments**

### Excluded Assets

- **Retirement accounts** (401k, IRA, Roth IRA, pensions)
- **Primary residence equity**
- **Cash value of life insurance**
- **Personal property** (cars, furniture)
- **Small business equity** (<100 employees, family-owned)

---

## Impact Analysis Example

**Client Situation**: 
- Parent-owned 529: $100,000
- UTMA in student's name: $50,000

**Financial Aid Impact**:
- 529 impact: $100,000 × 5.64% = **$5,640** expected contribution
- UTMA impact: $50,000 × 20% = **$10,000** expected contribution

> **Key Insight**: UTMA nearly **doubles** the financial aid impact despite being half the value!

---

## Federal Student Loan Types

### Direct Subsidized Loans

| Feature | Detail |
|---------|--------|
| Eligibility | Demonstrated financial need |
| Interest accrual | Government pays interest during school |
| Annual limits | $3,500 (Fr), $4,500 (So), $5,500 (Jr/Sr) |
| Aggregate limit | $23,000 (dependent undergraduate) |

### Direct Unsubsidized Loans

| Feature | Detail |
|---------|--------|
| Eligibility | No need requirement |
| Interest accrual | Student responsible from disbursement |
| Annual limits | Same base + additional amounts |
| Aggregate limit | $31,000 (dependent undergraduate) |

### Parent PLUS Loans

| Feature | Detail |
|---------|--------|
| Eligibility | Parent of dependent student, no adverse credit |
| Amount | Up to cost of attendance minus other aid |
| Interest | Higher rate than student loans |
| Repayment | Parent is responsible (cannot transfer) |

---

## Financial Aid Strategies

### 1. Asset Positioning

**Before FAFSA filing**:
- Reduce cash in student's name
- Pay down debt with liquid assets
- Max out parent retirement contributions (excluded)
- Consider prepaying non-education expenses

### 2. Timing Income

- Defer bonuses if possible
- Realize capital gains in non-FAFSA years
- Control income recognition where possible

### 3. Use Parent-Owned 529s

- Counts as parent asset (5.64%) not student (20%)
- Qualified distributions don't count as income

### 4. FAFSA Filing Timing

- File early (October 1 for following fall)
- Use prior-prior year tax data
- Submit corrections promptly if situation changes

---

## Private Student Loans

### When to Consider

- After exhausting federal options
- If federal limits don't meet needs
- If credit-worthy with low rates available

### Key Differences from Federal

| Feature | Federal | Private |
|---------|---------|---------|
| Interest rates | Set by law (fixed) | Based on credit (often variable) |
| Income-driven repayment | Yes | Rarely |
| Public Service Forgiveness | Yes | No |
| Death/disability discharge | Yes | Varies |
| Cosigner release | N/A | Sometimes available |

---

## Key Takeaways

1. **Parent assets**: 5.64% max assessment; **Student assets**: 20% assessment
2. **UTMA disadvantage**: Counted as student asset (4× worse for aid)
3. **Retirement accounts**: Excluded from FAFSA
4. **FAFSA Simplification**: Grandparent 529s no longer hurt aid
5. **Federal loans first**: Better protections than private loans
    `,
    keyTakeaways: [
      "Parent assets assessed at 5.64% max; student assets at 20%",
      "UTMA counts as student asset - significant financial aid disadvantage",
      "Retirement accounts and primary residence excluded from FAFSA",
      "FAFSA Simplification 2024: Grandparent 529s no longer count against aid",
      "Always exhaust federal student loans before private loans"
    ],
    keyFormulas: [
      "Parent asset impact = Asset × 5.64%",
      "Student asset impact = Asset × 20%",
      "Student income above protection: 50% assessed"
    ],
    practiceProblems: [
      {
        question: "A student has $20,000 in an UTMA account. How much does this reduce their financial aid eligibility annually?",
        answer: "UTMA is a student asset. Impact = $20,000 × 20% = $4,000 per year."
      },
      {
        question: "A client has $80,000 to save for their child's college. For financial aid purposes, is a 529 or UTMA better?",
        answer: "Parent-owned 529 is much better. 529 impact = $80,000 × 5.64% = $4,512/year. UTMA impact = $80,000 × 20% = $16,000/year."
      },
      {
        question: "List three asset types excluded from FAFSA consideration.",
        answer: "1) Retirement accounts (401k, IRA), 2) Primary residence equity, 3) Cash value life insurance."
      }
    ],
    relatedLessons: ["CFP-GEN-L016", "CFP-GEN-L018", "CFP-GEN-L021"]
  }
];

export default CFP_GEN4_LESSONS;
