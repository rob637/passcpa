/**
 * CFP Domain 6: Retirement Savings and Income Planning
 * Area RET-2: Employer-Sponsored Retirement Plans
 * 
 * These lessons cover 401(k)s, 403(b)s, 457 plans, profit sharing,
 * defined benefit pensions, and ERISA rules.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_RET2_LESSONS: CFPLesson[] = [
  {
    id: "CFP-RET-L005",
    domain: "CFP-RET",
    blueprintArea: "RET-2",
    title: "401(k) Plans - Features and Rules",
    order: 5,
    duration: 55,
    objectives: [
      "Explain 401(k) contribution limits and catch-up provisions",
      "Compare traditional and Roth 401(k) contributions",
      "Apply vesting schedules and employer matching",
      "Identify distribution rules and penalties"
    ],
    content: `
# 401(k) Plans - Features and Rules

The **401(k)** is the most common employer-sponsored retirement plan, named after the Internal Revenue Code section that created it.

---

## 401(k) Plan Basics

### Key Features

| Feature | Description |
|---------|-------------|
| **Employer Type** | For-profit companies |
| **Contribution Source** | Employee deferrals + employer contributions |
| **Tax Treatment** | Pre-tax (traditional) or after-tax (Roth) |
| **Investment Control** | Employee selects from plan options |

---

## Contribution Limits (2024)

### Employee Elective Deferrals

| Category | Limit |
|----------|-------|
| **Under age 50** | $23,000 |
| **Age 50+** (catch-up) | $23,000 + $7,500 = **$30,500** |

### Total Annual Addition (415 Limit)

The **combined** employee + employer contribution limit:

| Year | Limit |
|------|-------|
| 2024 | $69,000 ($76,500 with catch-up) |

Includes:
- Employee deferrals
- Employer matching
- Employer profit sharing
- NOT including catch-up contributions

### SECURE 2.0 Enhanced Catch-Up (2025+)

Ages 60-63 will get **higher catch-up** ($10,000 or 150% of regular catch-up).

---

## Traditional vs. Roth 401(k)

| Feature | Traditional 401(k) | Roth 401(k) |
|---------|-------------------|-------------|
| **Contribution tax** | Pre-tax (deductible) | After-tax (no deduction) |
| **Growth** | Tax-deferred | Tax-deferred |
| **Distributions** | Taxable | Tax-free (if qualified) |
| **RMDs** | Required at 73 | Required (but can roll to Roth IRA) |
| **Best if** | Higher bracket now | Lower bracket now or same/higher later |

### Roth 401(k) Qualified Distribution

Tax-free if:
1. Account held **5 years** from first contribution, AND
2. Age **59½**, death, or disability

---

## Employer Contributions

### Matching Contributions

Common formulas:
- 50% match on first 6% = 3% employer contribution
- 100% match on first 3%, 50% on next 2% = 4% employer contribution
- Dollar-for-dollar up to 4%

### Safe Harbor 401(k)

Avoids non-discrimination testing by providing:
- **Basic**: 3% of compensation to all eligible employees, OR
- **Enhanced match**: 100% on first 3% + 50% on next 2% (4% total)

Safe harbor contributions must be **immediately vested**.

### Profit Sharing

- Discretionary employer contribution
- Can be up to 25% of eligible payroll
- Subject to non-discrimination testing

---

## Vesting Schedules

### Employee Contributions
Always **100% vested immediately**.

### Employer Contributions

Two permitted schedules:

| Type | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | Year 6 |
|------|--------|--------|--------|--------|--------|--------|
| **Cliff** | 0% | 0% | 100% | 100% | 100% | 100% |
| **Graded** | 0% | 20% | 40% | 60% | 80% | 100% |

**Safe harbor contributions**: 100% immediate vesting required.

---

## Distribution Rules

### Triggering Events

Must have a distributable event:
- **Separation from service** (any age)
- **Age 59½** (while still employed)
- **Disability**
- **Death**
- **Plan termination**
- **Hardship** (special rules)

### Early Distribution Penalty

Distributions before 59½:
- **Ordinary income tax** on traditional contributions/earnings
- **10% early withdrawal penalty** (with exceptions)

### Exceptions to 10% Penalty

| Exception | Description |
|-----------|-------------|
| **Age 55** | Separation from service in year turning 55+ |
| **Disability** | Unable to engage in gainful activity |
| **Death** | To beneficiary after death |
| **QDRO** | Qualified domestic relations order |
| **Medical expenses** | Exceeding 7.5% of AGI |
| **72(t)** | Substantially equal periodic payments |

---

## Loans from 401(k)

### Loan Limits

- **Lesser of**: 50% of vested balance OR $50,000
- Maximum $50,000 reduced by highest loan balance in prior 12 months

### Repayment

- Must repay within **5 years** (longer for home purchase)
- Level amortization, at least quarterly payments
- **Default** = deemed distribution (taxable + penalty if under 59½)

---

## Required Minimum Distributions

### RMD Starting Age

- Age **73** (SECURE 2.0 for those turning 72 after 2022)
- Age **75** starting in 2033

### Still-Working Exception

No RMDs if:
- Still employed by sponsoring employer, AND
- Not a 5%+ owner

### RMD Calculation

$$\\text{RMD} = \\frac{\\text{Account Balance (Dec 31 prior year)}}{\\text{Life Expectancy Factor}}$$

---

## SECURE 2.0 Updates

| Change | Detail |
|--------|--------|
| **RMD age** | 73 (2023-2032), 75 (2033+) |
| **Roth employer contributions** | Now allowed |
| **Roth 401(k) RMDs** | Eliminated (can stay in account) |
| **Student loan match** | Employer can match student loan payments |
| **Emergency savings** | Sidecar accounts permitted |

---

## Key Takeaways

1. **2024 limits**: $23,000 employee ($30,500 with catch-up); $69,000 total
2. **Roth 401(k)**: After-tax in, tax-free out (if qualified)
3. **Age 55 rule**: Penalty-free withdrawals at separation after 55
4. **Safe harbor**: 3% non-elective or 4% match, immediately vested
5. **RMDs start**: Age 73 (75 in 2033)
    `,
    keyTakeaways: [
      "2024 employee deferral: $23,000 ($30,500 age 50+); total limit $69,000",
      "Traditional = pre-tax in, taxable out; Roth = after-tax in, tax-free out",
      "Age 55 separation rule: No 10% penalty if leave job in year turning 55+",
      "Safe harbor avoids testing: 3% non-elective or 4% enhanced match, 100% vested",
      "RMDs begin at 73 (SECURE 2.0); age 75 starting in 2033"
    ],
    keyFormulas: [
      "2024 Employee Deferral = $23,000 (+ $7,500 catch-up if 50+)",
      "2024 Total Annual Addition (415 Limit) = $69,000",
      "Max Loan = Lesser of 50% of vested balance or $50,000"
    ],
    mnemonics: [
      "401k = 4 types: Traditional, Roth, Match, Profit Sharing",
      "Age 55: Fifty-Five = Free From (penalty)"
    ],
    practiceProblems: [
      {
        question: "A 52-year-old wants to maximize their 401(k) in 2024. What is the maximum employee contribution?",
        answer: "$23,000 + $7,500 catch-up = $30,500"
      },
      {
        question: "An employee is 60% vested in employer contributions of $50,000. They leave the company. How much of employer contributions do they receive?",
        answer: "$50,000 × 60% = $30,000. They forfeit the remaining $20,000."
      },
      {
        question: "A 54-year-old leaves their job and takes a 401(k) distribution. Is there a 10% penalty?",
        answer: "Yes, unless they turn 55 in the year of separation. At 54, the age 55 rule doesn't apply, so the 10% penalty applies."
      }
    ],
    relatedLessons: ["CFP-RET-L006", "CFP-RET-L007", "CFP-RET-L010"]
  },

  {
    id: "CFP-RET-L006",
    domain: "CFP-RET",
    blueprintArea: "RET-2",
    title: "403(b) and 457 Plans",
    order: 6,
    duration: 45,
    objectives: [
      "Distinguish 403(b) plans from 401(k) plans",
      "Explain 457(b) governmental vs. non-governmental differences",
      "Apply special catch-up provisions",
      "Coordinate multiple employer plan contributions"
    ],
    content: `
# 403(b) and 457 Plans

These plans serve specific employer types with unique rules that differ from traditional 401(k)s.

---

## 403(b) Plans - Tax-Sheltered Annuities

### Eligible Employers

- **Public schools** (K-12 and higher education)
- **Tax-exempt 501(c)(3) organizations** (hospitals, charities)
- **Churches** and religious organizations

### Contribution Limits (2024)

Same as 401(k):
- **Under 50**: $23,000
- **Age 50+**: $23,000 + $7,500 = $30,500
- **Total annual addition**: $69,000 (including employer)

---

## 403(b) Special Catch-Up Provisions

### 15-Year of Service Catch-Up

Employees with **15+ years of service** with same employer:
- Additional **$3,000/year**
- Lifetime maximum: **$15,000**
- Must be used BEFORE age 50 catch-up

**Order of catch-ups**:
1. 15-year catch-up (if eligible): $3,000
2. Age 50 catch-up: $7,500
3. **Maximum possible**: $23,000 + $3,000 + $7,500 = $33,500

### Requirements for 15-Year Catch-Up

- 15+ years of service with SAME employer
- Prior contributions averaged less than $5,000/year
- Limited to making up for prior under-contributions

---

## 403(b) Investment Options

### Limited to Three Types

1. **Annuities** (from insurance companies)
2. **Mutual funds** (custodial accounts)
3. **Church retirement accounts** (for churches only)

> **Note**: Individual stocks NOT permitted in 403(b) plans.

---

## 457(b) Plans

### Two Types

| Feature | Governmental 457(b) | Non-Governmental 457(b) |
|---------|---------------------|------------------------|
| **Employers** | State/local government | Tax-exempt organizations |
| **Tax treatment** | Same as 401(k)/403(b) | Deferred compensation |
| **Rollover** | To IRA, 401(k), etc. | ONLY to another 457(b) |
| **Creditor protection** | Protected | NOT protected (employer's asset) |
| **Early withdrawal penalty** | None (no 10% penalty!) | None |

---

## 457(b) Contribution Limits (2024)

### Standard Limit
- **Under 50**: $23,000
- **Age 50+ catch-up**: $23,000 + $7,500 = $30,500

### Special 3-Year Catch-Up

In the **3 years before normal retirement age**:
- Can contribute up to **double the limit**
- 2024: Up to $46,000
- **OR** use age 50 catch-up (cannot use both)

---

## Key 457(b) Advantage: No Early Withdrawal Penalty

| Plan Type | Separation Before 59½ |
|-----------|----------------------|
| 401(k) | 10% penalty (unless exception) |
| 403(b) | 10% penalty (unless exception) |
| **Governmental 457(b)** | **NO 10% penalty ever** |

This makes 457(b) plans excellent for early retirees!

---

## Coordinating Multiple Plans

### 401(k) and 457(b)

Can contribute to BOTH with **separate limits**:

**Example (2024 under 50)**:
- 401(k): $23,000
- 457(b): $23,000
- **Total**: $46,000

### 403(b) and 457(b)

Can contribute to BOTH:
- 403(b): $23,000
- 457(b): $23,000
- **Total**: $46,000

### 401(k) and 403(b)

Share one limit (controlled group rules):
- Combined maximum: $23,000
- Cannot contribute $23,000 to each

---

## 403(b) vs. 401(k) Comparison

| Feature | 403(b) | 401(k) |
|---------|--------|--------|
| **Employers** | Non-profits, schools | For-profit |
| **Investment options** | Annuities, mutual funds | Broader options |
| **15-year catch-up** | Yes | No |
| **ERISA coverage** | Often exempt | Required |
| **Age 55 rule** | Modified (public safety) | Yes |

---

## Governmental 457(b) vs. 401(k)

| Feature | Governmental 457(b) | 401(k) |
|---------|---------------------|--------|
| **Early withdrawal penalty** | None | 10% (with exceptions) |
| **3-year catch-up** | Yes (double limit) | No |
| **Age 55 separation rule** | N/A (no penalty anyway) | Yes |
| **Loan provisions** | Similar | Similar |

---

## Key Takeaways

1. **403(b)**: For non-profits/schools; 15-year catch-up available
2. **457(b) governmental**: NO 10% early withdrawal penalty
3. **457(b) non-governmental**: Not rollover eligible to IRA; not creditor protected
4. **Dual contribution**: 401(k)/403(b) + 457(b) = separate limits ($46,000 total if under 50)
5. **3-year catch-up**: 457(b) allows double limit in final 3 years
    `,
    keyTakeaways: [
      "403(b): Schools/non-profits with 15-year catch-up option (+$3,000)",
      "Governmental 457(b): NO 10% early withdrawal penalty - ideal for early retirees",
      "Non-governmental 457(b): Not protected from creditors; limited rollover",
      "Can contribute to both 403(b)/401(k) AND 457(b) - separate limits",
      "457(b) 3-year catch-up: Double the limit ($46,000) in final 3 years before retirement"
    ],
    keyFormulas: [
      "403(b) Max with all catch-ups = $23,000 + $3,000 + $7,500 = $33,500",
      "457(b) 3-year catch-up = $23,000 × 2 = $46,000 (2024)",
      "Dual 401k/403b + 457 = $23,000 + $23,000 = $46,000 (if under 50)"
    ],
    practiceProblems: [
      {
        question: "A 55-year-old teacher has worked for the same school for 20 years with average contributions of $4,000/year. What is her maximum 403(b) contribution in 2024?",
        answer: "Eligible for 15-year catch-up ($3,000) AND age 50 catch-up ($7,500). Maximum = $23,000 + $3,000 + $7,500 = $33,500."
      },
      {
        question: "A city employee retires at age 50 and takes a distribution from their governmental 457(b). Is there a penalty?",
        answer: "No. Governmental 457(b) plans have NO 10% early withdrawal penalty regardless of age."
      },
      {
        question: "A hospital employee has both a 403(b) and 457(b). What is the maximum combined contribution if under 50?",
        answer: "$23,000 (403b) + $23,000 (457b) = $46,000 total. They have separate limits."
      }
    ],
    relatedLessons: ["CFP-RET-L005", "CFP-RET-L007", "CFP-RET-L008"]
  },

  {
    id: "CFP-RET-L007",
    domain: "CFP-RET",
    blueprintArea: "RET-2",
    title: "Defined Benefit Pension Plans",
    order: 7,
    duration: 50,
    objectives: [
      "Explain how defined benefit pensions work",
      "Calculate pension benefits using common formulas",
      "Evaluate lump sum vs. annuity pension options",
      "Understand PBGC protection limits"
    ],
    content: `
# Defined Benefit Pension Plans

**Defined Benefit (DB) plans** provide a guaranteed lifetime income based on a formula, rather than account balance.

---

## DB Plan Fundamentals

### Key Characteristics

| Feature | Description |
|---------|-------------|
| **Benefit promise** | Guaranteed monthly income in retirement |
| **Investment risk** | Borne by **employer** |
| **Longevity risk** | Borne by **employer** |
| **Funding** | Employer contributes actuarially required amounts |
| **Portability** | Limited (benefits based on tenure) |

---

## Common Benefit Formulas

### Flat Dollar Formula

$$\\text{Annual Benefit} = \\text{Years of Service} \\times \\text{Dollar Amount}$$

**Example**: $75/year × 30 years = $2,250/month

### Career Average Formula

$$\\text{Benefit} = \\text{Years of Service} \\times \\text{Multiplier} \\times \\text{Career Average Salary}$$

**Example**: 30 years × 1.5% × $60,000 = $27,000/year

### Final Average Formula (Most Common)

$$\\text{Benefit} = \\text{Years of Service} \\times \\text{Multiplier} \\times \\text{Final Average Salary}$$

Final average = typically highest 3-5 years

**Example**: 30 years × 1.5% × $100,000 = $45,000/year

---

## Normal Retirement Age

Typically **age 65** or when age + years of service = 80-85 ("Rule of 80/85").

### Early Retirement

Most plans allow retirement before normal age with **reduced benefits**:
- Common reduction: 3-6% per year before normal retirement

**Example**: Normal benefit $3,000/month at 65; retiring at 60 with 5% reduction/year:
$$\\$3,000 \\times (1 - 0.25) = \\$2,250/\\text{month}$$

---

## Vesting

### ERISA Requirements

| Schedule | Year 3 | Year 4 | Year 5 | Year 6 | Year 7 |
|----------|--------|--------|--------|--------|--------|
| **Cliff** | 0% | 0% | 100% | 100% | 100% |
| **Graded** | 20% | 40% | 60% | 80% | 100% |

If terminated before vesting, participant forfeits all accrued benefits.

---

## Lump Sum vs. Annuity Decision

### The Choice

Many DB plans offer:
1. **Lifetime annuity** (guaranteed monthly payments), OR
2. **Lump sum** (present value of future payments)

### Factors Favoring Lump Sum

| Factor | Explanation |
|--------|-------------|
| **Poor health/short life expectancy** | Annuity may not pay long enough |
| **Investment confidence** | Believe you can outperform |
| **Legacy goals** | Want to leave money to heirs |
| **Concern about employer solvency** | PBGC limits may reduce benefit |
| **Flexibility needs** | Need variable access |

### Factors Favoring Annuity

| Factor | Explanation |
|--------|-------------|
| **Good health/longevity** | Will receive payments longer |
| **Guaranteed income need** | Covers essential expenses |
| **Spouse needs survivor benefit** | Annuity can include joint life |
| **Investment risk aversion** | Don't want market exposure |
| **Discipline concerns** | Won't overspend lump sum |

---

## Joint and Survivor Annuities

### ERISA Requirement

If married, default is **Qualified Joint and Survivor Annuity (QJSA)**:
- At least 50% of benefit continues to surviving spouse
- Spouse must consent to waive

### Common Options

| Option | While Both Alive | After First Death |
|--------|------------------|-------------------|
| **Single Life** | 100% | $0 |
| **50% J&S** | ~88% of single life | 50% to survivor |
| **75% J&S** | ~82% of single life | 75% to survivor |
| **100% J&S** | ~76% of single life | 100% to survivor |

---

## Pension Benefit Guaranty Corporation (PBGC)

### What PBGC Does

- Insures private-sector defined benefit plans
- Pays benefits if plan terminates with insufficient assets
- Funded by premiums from covered plans

### 2024 Maximum Insured Benefit

At age 65: **$7,107.95/month** ($85,295/year)

| Retirement Age | Maximum Annual Benefit |
|----------------|----------------------|
| 65 | $85,295 |
| 62 | $61,413 |
| 60 | $55,442 |
| 55 | $38,383 |

### What's NOT Covered

- Benefits exceeding PBGC limits
- Plans less than 5 years old
- Health and welfare benefits
- Non-qualified supplemental plans

---

## Cash Balance Plans (Hybrid)

### How They Work

- **Looks like** a defined contribution plan (individual account)
- **Is actually** a defined benefit plan (employer bears risk)
- Account grows with:
  - **Pay credits** (% of salary)
  - **Interest credits** (guaranteed rate)

### Example

- 5% pay credit on $100,000 salary = $5,000/year
- 4% interest credit on balance

### Conversion Controversy

Many traditional DB plans converted to cash balance in 1990s-2000s:
- Older workers sometimes saw reduced benefits
- "Wear-away" periods where benefits didn't grow

---

## Key Takeaways

1. **DB formula**: Years × Multiplier × Final Average Salary (commonly)
2. **Employer bears** all investment and longevity risk
3. **Lump sum vs. annuity**: Consider health, spouse, legacy, confidence
4. **PBGC maximum**: ~$85,295/year at 65 (2024); less for early retirement
5. **Cash balance**: Hybrid that looks like DC but is legally DB
    `,
    keyTakeaways: [
      "DB formula: Years × Multiplier × Final Average Salary (typical)",
      "Employer bears investment and longevity risk in DB plans",
      "Lump sum suits short life expectancy, legacy goals, investment confidence",
      "Annuity suits long life expectancy, guaranteed income needs, risk aversion",
      "PBGC insures up to ~$85,295/year (2024) at age 65"
    ],
    keyFormulas: [
      "Final Average Benefit = Years × Multiplier × Avg Highest 3-5 Years",
      "Career Average = Years × Multiplier × Career Average Salary",
      "Early Retirement Reduction: Typically 3-6% per year before NRA"
    ],
    practiceProblems: [
      {
        question: "An employee has 25 years of service with a 1.5% multiplier and final average salary of $80,000. What is the annual pension benefit?",
        answer: "25 × 1.5% × $80,000 = 25 × 0.015 × $80,000 = $30,000/year ($2,500/month)"
      },
      {
        question: "The same employee retires 3 years early with a 5% per year reduction. What is the reduced benefit?",
        answer: "$30,000 × (1 - 0.15) = $30,000 × 0.85 = $25,500/year"
      },
      {
        question: "A pension plan is terminated when a participant's accrued benefit is $7,500/month. What does PBGC guarantee?",
        answer: "PBGC maximum in 2024 is ~$7,108/month at 65. The participant would receive only $7,108, losing ~$392/month."
      }
    ],
    relatedLessons: ["CFP-RET-L005", "CFP-RET-L008", "CFP-RET-L001"]
  },

  {
    id: "CFP-RET-L008",
    domain: "CFP-RET",
    blueprintArea: "RET-2",
    title: "Profit Sharing and Stock Bonus Plans",
    order: 8,
    duration: 40,
    objectives: [
      "Explain profit sharing plan features and contribution rules",
      "Distinguish ESOPs from other stock bonus plans",
      "Apply contribution allocation methods",
      "Identify ESOP-specific tax benefits"
    ],
    content: `
# Profit Sharing and Stock Bonus Plans

These employer-funded plans provide flexible retirement benefits without employee contribution requirements.

---

## Profit Sharing Plans

### Key Features

| Feature | Description |
|---------|-------------|
| **Contributions** | 100% employer-funded |
| **Discretionary** | Amount can vary year to year |
| **Maximum** | 25% of eligible payroll |
| **Individual maximum** | Lesser of 100% compensation or $69,000 (2024) |

### Flexibility Advantage

- Employer can adjust contributions based on profits
- Can skip contributions in lean years
- No fixed formula required

---

## Allocation Methods

### Pro-Rata (Most Common)

Same percentage of compensation to all participants.

**Example**: $100,000 profit sharing pool; total eligible compensation = $500,000
- Allocation rate = $100,000 / $500,000 = 20%
- Employee earning $75,000 receives: $75,000 × 20% = $15,000

### New Comparability (Age-Weighted)

Allocates more to older, higher-paid employees.
- Must pass non-discrimination testing
- Allows small business owners to receive larger allocations
- Based on actuarial equivalence

### Integrated with Social Security

Permits higher contribution % above the Social Security taxable wage base.
- "Permitted disparity" rules
- Recognizes that employer pays no FICA above wage base

---

## Stock Bonus Plans

### Key Features

- Similar to profit sharing but **contributions made in company stock**
- Benefits distributed in company stock
- Participant bears stock price risk

### Advantages

| To Employer | To Employee |
|-------------|-------------|
| Cash flow benefit (pay in stock) | Potential stock appreciation |
| Creates employee ownership culture | Voting rights on stock |
| No cash outlay required | May get stock at favorable price |

### Disadvantages

- Concentration risk for employees
- Stock volatility affects retirement security
- Company can fail (see: Enron)

---

## Employee Stock Ownership Plans (ESOPs)

### What Makes ESOPs Special

| Feature | Description |
|---------|-------------|
| **Leveraged** | Can borrow to buy company stock |
| **Mandatory stock investment** | Must invest primarily in employer stock |
| **Put option** | Employees can sell stock back to company |
| **Tax benefits** | Unique benefits for C-corporation shareholders |

### How Leveraged ESOPs Work

1. ESOP borrows money to buy company stock
2. Company makes contributions to ESOP to repay loan
3. Stock allocated to employee accounts as loan is repaid
4. Creates ownership stake for employees over time

---

## ESOP Tax Advantages

### For C-Corporation Selling Shareholders

**Section 1042 Rollover**:
- Sell 30%+ of company to ESOP
- Reinvest in qualified replacement property
- **Defer capital gains indefinitely**

Requirements:
- Stock held 3+ years
- Must be C-corporation
- Seller cannot participate as employee afterwards

### For the Company

- Contributions to ESOP are tax-deductible
- Dividends on ESOP stock may be deductible
- S-corporations: ESOP-owned portion is tax-exempt

### S-Corporation ESOPs

- ESOP ownership passes through tax-free
- 100% ESOP-owned S-corps pay NO federal income tax
- Regulatory scrutiny has increased

---

## Diversification Rights

### ESOP Participants

After age 55 and 10 years of participation:
- Can diversify up to **25% of account** (years 1-5 of period)
- Up to **50%** in final year of diversification period

This protects employees from concentration risk.

---

## Comparison: Profit Sharing vs. ESOP

| Feature | Profit Sharing | ESOP |
|---------|---------------|------|
| **Investment** | Diversified | Company stock |
| **Leverage** | No | Yes (can borrow) |
| **Employer deduction** | Contribution | Contribution + dividends |
| **1042 rollover** | No | Yes (C-corps) |
| **Risk** | Diversified | Concentrated |

---

## Key Takeaways

1. **Profit sharing**: Flexible employer contributions up to 25% of payroll
2. **Allocation methods**: Pro-rata, age-weighted, integrated
3. **ESOPs** can borrow to buy stock; unique tax benefits
4. **Section 1042**: C-corp shareholders can defer gains when selling to ESOP
5. **Diversification**: Required for ESOP participants 55+ with 10 years
    `,
    keyTakeaways: [
      "Profit sharing: 100% employer-funded, discretionary, up to 25% of payroll",
      "Allocation methods: Pro-rata, age-weighted/new comparability, SS-integrated",
      "ESOPs: Can leverage (borrow), must invest in employer stock",
      "Section 1042: C-corp sellers can defer capital gains into replacement property",
      "ESOP diversification: 25% after age 55 + 10 years; 50% in final year"
    ],
    keyFormulas: [
      "Profit Sharing Maximum: 25% of eligible payroll",
      "Individual Maximum: Lesser of 100% of comp or $69,000 (2024)",
      "Pro-rata allocation = Total Contribution / Total Compensation × Individual Comp"
    ],
    practiceProblems: [
      {
        question: "A company has $1,000,000 in total eligible compensation. What is the maximum profit sharing contribution?",
        answer: "$1,000,000 × 25% = $250,000"
      },
      {
        question: "A C-corporation shareholder sells 40% of their stock to an ESOP. What are the requirements for Section 1042 treatment?",
        answer: "Must sell at least 30% (met), stock held 3+ years, reinvest in qualified replacement property, seller cannot be an employee post-sale."
      },
      {
        question: "An ESOP participant is 57 with 12 years of participation. What percentage can they diversify?",
        answer: "Age 55+ and 10+ years: Can diversify up to 25% of account (in years 1-5 of the diversification period)."
      }
    ],
    relatedLessons: ["CFP-RET-L005", "CFP-RET-L007", "CFP-RET-L009"]
  }
];

export default CFP_RET2_LESSONS;
