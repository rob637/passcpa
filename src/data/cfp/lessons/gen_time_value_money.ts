/**
 * CFP Domain 2: General Principles of Financial Planning
 * Area GEN-3: Time Value of Money
 * 
 * These lessons cover TVM fundamentals, PV/FV calculations,
 * annuities, NPV, IRR, and loan amortization.
 * 
 * TVM represents ~30% of Domain 2 and is tested heavily on the exam.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_GEN3_LESSONS: CFPLesson[] = [
  {
    id: "CFP-GEN-L010",
    domain: "CFP-GEN",
    blueprintArea: "GEN-3",
    title: "Time Value of Money - Core Concepts",
    order: 10,
    duration: 45,
    objectives: [
      "Explain why money has time value",
      "Distinguish between simple and compound interest",
      "Calculate effective annual rate from nominal rates",
      "Apply the Rule of 72 for quick estimations",
      "Set up a financial calculator for TVM problems"
    ],
    content: `
# Time Value of Money - Core Concepts

The **Time Value of Money (TVM)** is arguably the most fundamental concept in financial planning. Every major financial decision involves comparing dollars across time.

---

## The Core Principle

> **A dollar today is worth more than a dollar tomorrow.**

Why? Three reasons:

1. **Opportunity Cost**: Money today can be invested to earn returns
2. **Inflation**: Purchasing power erodes over time
3. **Risk/Uncertainty**: Future payments are less certain

---

## Simple Interest vs. Compound Interest

### Simple Interest

Interest earned only on the **original principal**.

$$\\text{FV} = \\text{PV} \\times (1 + r \\times n)$$

**Example**: $10,000 at 5% simple interest for 3 years:
- Year 1: $10,000 × 0.05 = $500
- Year 2: $10,000 × 0.05 = $500
- Year 3: $10,000 × 0.05 = $500
- **Total Interest**: $1,500
- **FV**: $11,500

### Compound Interest

Interest earned on **principal PLUS accumulated interest**.

$$\\text{FV} = \\text{PV} \\times (1 + r)^n$$

**Example**: $10,000 at 5% compound interest for 3 years:
- Year 1: $10,000 × 1.05 = $10,500
- Year 2: $10,500 × 1.05 = $11,025
- Year 3: $11,025 × 1.05 = $11,576.25
- **Total Interest**: $1,576.25
- **FV**: $11,576.25

> **Key Insight**: Compounding produces **exponentially more growth** over time. This is why starting early matters so much.

---

## Compounding Frequency

Interest can compound at different frequencies:

| Frequency | Periods/Year (n) |
|-----------|------------------|
| Annually | 1 |
| Semi-annually | 2 |
| Quarterly | 4 |
| Monthly | 12 |
| Daily | 365 |
| Continuous | ∞ |

### Formula for Discrete Compounding

$$\\text{FV} = \\text{PV} \\times \\left(1 + \\frac{r}{m}\\right)^{m \\times t}$$

Where:
- r = annual nominal rate
- m = compounding periods per year
- t = number of years

### Example: $10,000 at 8% for 5 Years

| Frequency | Calculation | FV |
|-----------|------------|-----|
| Annual | $10,000 × (1.08)^5 | $14,693.28 |
| Quarterly | $10,000 × (1.02)^20 | $14,859.47 |
| Monthly | $10,000 × (1.00667)^60 | $14,898.46 |
| Daily | $10,000 × (1.000219)^1825 | $14,918.16 |

> **Takeaway**: More frequent compounding = slightly higher FV (but diminishing returns).

---

## Effective Annual Rate (EAR)

The **Effective Annual Rate** converts any nominal rate with compounding to an equivalent annual rate for comparison.

$$\\text{EAR} = \\left(1 + \\frac{r}{m}\\right)^m - 1$$

### Example: Credit Card at 18% APR (nominal) Compounding Monthly

$$\\text{EAR} = \\left(1 + \\frac{0.18}{12}\\right)^{12} - 1$$
$$\\text{EAR} = (1.015)^{12} - 1 = 1.1956 - 1 = 19.56\\%$$

> **Exam Tip**: When comparing loans or investments with different compounding, convert to EAR first.

---

## Real Rate of Return (Inflation-Adjusted)

The **Real Rate** removes the inflation impact from returns.

### Approximate Method (Simple)
$$\\text{Real Rate} \\approx \\text{Nominal Rate} - \\text{Inflation Rate}$$

### Exact Method (Fisher Equation)
$$\\text{Real Rate} = \\frac{1 + \\text{Nominal}}{1 + \\text{Inflation}} - 1$$

### Example: 8% Nominal Return, 3% Inflation

**Approximate**: 8% - 3% = 5%

**Exact**: (1.08 / 1.03) - 1 = 1.0485 - 1 = **4.85%**

> **When to Use Exact**: For precise calculations, especially over long periods. The difference compounds over time.

---

## The Rule of 72

A quick mental math shortcut to estimate **how long it takes to double money**.

$$\\text{Years to Double} \\approx \\frac{72}{\\text{Interest Rate}}$$

### Examples:

| Rate | Years to Double |
|------|-----------------|
| 4% | 72 ÷ 4 = 18 years |
| 6% | 72 ÷ 6 = 12 years |
| 8% | 72 ÷ 8 = 9 years |
| 10% | 72 ÷ 10 = 7.2 years |
| 12% | 72 ÷ 12 = 6 years |

**Reverse Application**: What rate doubles money in 10 years?
$$r = 72 \\div 10 = 7.2\\%$$

> **Exam Tip**: Use Rule of 72 for quick checks. If an MCQ shows 8% return over ~9 years, the ending value should be approximately double the starting value.

---

## The Five TVM Variables

Every TVM problem involves these five variables:

| Variable | Calculator Key | Description |
|----------|---------------|-------------|
| **N** | N | Number of periods |
| **I/Y** | I/Y or I/YR | Interest rate per period |
| **PV** | PV | Present Value |
| **PMT** | PMT | Payment amount |
| **FV** | FV | Future Value |

### The Rule: Know Any 4, Solve for the 5th

In every problem, you'll be given four variables and asked to find the unknown fifth.

---

## Financial Calculator Setup

### HP 10bII+ Initial Setup

1. Clear all: **[Orange] [C ALL]**
2. Set P/YR: **1 [Orange] [P/YR]** (for annual problems)
3. Set END mode: **[Orange] [BEG/END]** (should show no BEG indicator)

### TI BA II Plus Initial Setup

1. Clear TVM: **[2nd] [CLR TVM]**
2. Set P/Y: **[2nd] [P/Y] 1 [ENTER] [CE/C]** (for annual problems)
3. Set END mode: **[2nd] [BGN]** (should show END)

### Critical Setup Notes

- **P/Y (Payments per Year)**: Must match your problem's period
  - Annual payments: P/Y = 1
  - Monthly payments: P/Y = 12
- **BEGIN vs. END Mode**: 
  - END = Ordinary annuity (payments at period end)
  - BEGIN = Annuity due (payments at period start)

---

## The Sign Convention (Cash Flow)

**Most Common Student Error!**

| Direction | Sign |
|-----------|------|
| Cash OUTFLOW (you pay) | **Negative (-)** |
| Cash INFLOW (you receive) | **Positive (+)** |

### Example: You invest $10,000 today to receive $15,000 in 5 years

- PV = **-10,000** (cash out of your pocket today)
- FV = **+15,000** (cash into your pocket in the future)

> **Memory Aid**: If you're paying money out, it has a minus sign. If money is coming to you, it's positive.

---

## Common TVM Problem Types

| Problem Type | Given | Solve For |
|--------------|-------|-----------|
| Future value of lump sum | PV, I/Y, N | FV |
| Present value of lump sum | FV, I/Y, N | PV |
| Required savings (annuity) | FV, I/Y, N | PMT |
| Loan payment | PV, I/Y, N | PMT |
| Required return | PV, FV, N | I/Y |
| Time to goal | PV, FV, I/Y | N |

---

## Key Takeaways

1. **Compound interest grows exponentially** – the earlier you start, the better
2. **EAR** allows comparison across different compounding frequencies
3. **Real return** = Nominal return adjusted for inflation (use Fisher formula for precision)
4. **Rule of 72**: Quick estimate for doubling time
5. **Know your calculator**: Clear TVM, set P/Y, understand sign convention
    `,
    keyTakeaways: [
      "Compound interest: FV = PV × (1 + r)^n - exponential growth",
      "EAR enables comparison of rates with different compounding",
      "Real Rate = (1 + Nominal) / (1 + Inflation) - 1",
      "Rule of 72: Years to double ≈ 72 / rate",
      "Sign convention: outflows negative, inflows positive"
    ],
    keyFormulas: [
      "FV = PV × (1 + r)^n",
      "EAR = (1 + r/m)^m - 1",
      "Real Rate = (1 + Nominal) / (1 + Inflation) - 1",
      "Rule of 72: Years to Double ≈ 72 / Rate"
    ],
    mnemonics: [
      "5 TVM Keys: Never Invest Poor Money Fast (N, I/Y, PV, PMT, FV)",
      "Sign Convention: OUT = negative, IN = positive"
    ],
    practiceProblems: [
      {
        question: "A client invests $50,000 at 6% annual interest compounded monthly. What is the effective annual rate (EAR)?",
        answer: "EAR = (1 + 0.06/12)^12 - 1 = (1.005)^12 - 1 = 1.0617 - 1 = 6.17%"
      },
      {
        question: "Using the Rule of 72, approximately how long will it take to double $100,000 at 9% annual return?",
        answer: "72 ÷ 9 = 8 years (exactly calculated: 8.04 years)"
      },
      {
        question: "An investment earned 10% nominally while inflation was 4%. What was the real return?",
        answer: "Real Rate = (1.10 / 1.04) - 1 = 1.0577 - 1 = 5.77%"
      }
    ],
    relatedLessons: ["CFP-GEN-L011", "CFP-GEN-L012", "CFP-GEN-L023"]
  },

  {
    id: "CFP-GEN-L011",
    domain: "CFP-GEN",
    blueprintArea: "GEN-3",
    title: "Present Value Calculations",
    order: 11,
    duration: 50,
    objectives: [
      "Calculate present value of a single future sum",
      "Understand discounting as the reverse of compounding",
      "Compute present value of ordinary annuities",
      "Compute present value of annuities due",
      "Apply present value concepts to planning scenarios"
    ],
    content: `
# Present Value Calculations

**Present Value (PV)** answers the question: *"What is a future sum or stream of payments worth in today's dollars?"*

---

## Why Present Value Matters

Present value is used to:
- Determine how much to save today for a future goal
- Compare different investment options
- Value streams of income (pensions, Social Security, annuities)
- Calculate fair prices for bonds and other fixed income
- Evaluate whether a purchase is financially worthwhile

---

## Present Value of a Single Sum (Lump Sum)

### The Formula

$$\\text{PV} = \\frac{\\text{FV}}{(1 + r)^n}$$

Or equivalently:

$$\\text{PV} = \\text{FV} \\times (1 + r)^{-n}$$

### Calculator Approach

| Input | Value |
|-------|-------|
| N | Number of periods |
| I/Y | Interest rate per period |
| FV | Future value (positive) |
| PMT | 0 (no periodic payments) |
| **Solve for** | **PV** |

### Example 1: College Funding

**Question**: Your client wants to have $100,000 in 10 years for their child's college. If investments earn 7% annually, how much must they invest today?

**Calculator Inputs**:
- N = 10
- I/Y = 7
- FV = 100,000
- PMT = 0
- **Solve PV = -$50,834.93**

**Interpretation**: The client must invest $50,834.93 today to have $100,000 in 10 years at 7%.

### Example 2: Retirement Lump Sum Need

**Question**: A client will need $2,000,000 at retirement in 25 years. If they earn 8% annually, what is that worth today?

**Calculator Inputs**:
- N = 25
- I/Y = 8
- FV = 2,000,000
- PMT = 0
- **Solve PV = -$292,017.75**

---

## The Discount Rate

The interest rate in PV calculations is often called the **discount rate** because we're discounting future values back to present.

Choosing the discount rate depends on:
- **Market rates** for similar-risk investments
- **Required return** given the risk
- **Inflation expectations** (for real PV calculations)

> **Higher discount rate = Lower present value** (future dollars worth less today)

---

## Present Value of an Ordinary Annuity

An **annuity** is a series of equal payments at regular intervals.

**Ordinary Annuity**: Payments occur at the **END** of each period.

### The Formula

$$\\text{PV}_{\\text{Ordinary}} = \\text{PMT} \\times \\frac{1 - (1 + r)^{-n}}{r}$$

### Calculator Approach (END Mode)

| Input | Value |
|-------|-------|
| N | Number of payments |
| I/Y | Interest rate per period |
| PMT | Payment amount |
| FV | 0 (or any remaining value) |
| **Solve for** | **PV** |

### Example 3: Pension Valuation

**Question**: A client will receive $3,000 per month for 20 years from a pension starting at retirement. What is the present value of this pension at retirement, assuming 5% annual discount rate?

**Calculator Inputs** (monthly):
- N = 20 × 12 = 240
- I/Y = 5 ÷ 12 = 0.4167 (or set P/Y = 12, I/Y = 5)
- PMT = 3,000
- FV = 0
- **Solve PV = -$454,534.96**

**Interpretation**: The pension has a present value of approximately $454,535 at retirement date.

### Example 4: Car Loan Affordability

**Question**: A client can afford $500/month for a car loan. How much car can they finance if the rate is 6% annual for 5 years?

**Calculator Inputs** (monthly):
- N = 60
- I/Y = 6 ÷ 12 = 0.5
- PMT = -500 (outflow)
- FV = 0
- **Solve PV = $25,862.78**

---

## Present Value of an Annuity Due

**Annuity Due**: Payments occur at the **BEGINNING** of each period.

Common examples:
- Rent payments (due at start of month)
- Lease payments
- Insurance premiums

### The Formula

$$\\text{PV}_{\\text{Due}} = \\text{PV}_{\\text{Ordinary}} \\times (1 + r)$$

Or simply calculate in BEGIN mode on your calculator.

### Calculator Approach (BEGIN Mode)

Set calculator to BEGIN mode, then input same as ordinary annuity.

### Example 5: Lease Valuation

**Question**: An office lease requires payments of $2,500/month for 5 years, paid at the beginning of each month. What is the present value at 6%?

**Calculator Inputs** (BEGIN mode, monthly):
- N = 60
- I/Y = 0.5
- PMT = -2,500 (outflow)
- FV = 0
- **Solve PV = $129,964.50**

Compare to ordinary annuity (END mode): $129,313.88
The difference is approximately one month's interest on the PV.

---

## Choosing Between Ordinary and Due

| Situation | Type | Mode |
|-----------|------|------|
| Loan payments | Ordinary | END |
| Mortgage payments | Ordinary | END |
| Investment contributions at month-end | Ordinary | END |
| Rent payments | Annuity Due | BEGIN |
| Lease payments | Annuity Due | BEGIN |
| Benefits received at start of period | Annuity Due | BEGIN |
| Retirement income at start of month | Annuity Due | BEGIN |

---

## Present Value of a Perpetuity

A **perpetuity** is an infinite stream of equal payments.

$$\\text{PV}_{\\text{Perpetuity}} = \\frac{\\text{PMT}}{r}$$

### Example 6: Endowment

**Question**: A university wants to create an endowment to fund a $50,000 annual scholarship forever. If the endowment earns 5%, how much is needed?

$$\\text{PV} = \\frac{50,000}{0.05} = \\$1,000,000$$

---

## Growing Perpetuity

If payments grow at a constant rate g:

$$\\text{PV} = \\frac{\\text{PMT}}{r - g}$$

**Requirement**: r > g (otherwise PV is infinite)

---

## Key Takeaways

1. **PV = FV / (1 + r)^n** for single sums
2. Ordinary annuity: Payments at **END** of period (use END mode)
3. Annuity due: Payments at **BEGINNING** (use BEGIN mode or × (1 + r))
4. **Higher discount rate → Lower present value**
5. Perpetuity PV = PMT / r (infinite payment stream)
    `,
    keyTakeaways: [
      "PV = FV / (1 + r)^n for single sum discounting",
      "Ordinary annuity = END of period payments (default mode)",
      "Annuity due = BEGINNING of period payments (× 1+r adjustment)",
      "Higher discount rate produces lower present value",
      "Perpetuity PV = PMT / r (for infinite payments)"
    ],
    keyFormulas: [
      "PV of Lump Sum = FV / (1 + r)^n",
      "PV of Ordinary Annuity = PMT × [(1 - (1+r)^-n) / r]",
      "PV of Annuity Due = PV of Ordinary × (1 + r)",
      "PV of Perpetuity = PMT / r"
    ],
    practiceProblems: [
      {
        question: "A client wants to have $75,000 for a wedding in 4 years. If they can earn 5% annually, how much should they invest today?",
        answer: "PV = $75,000 / (1.05)^4 = $75,000 / 1.2155 = $61,705.19"
      },
      {
        question: "A client will receive an inheritance of $500/month for 15 years. At 6% discount rate, what is the present value (ordinary annuity)?",
        answer: "N=180, I/Y=0.5, PMT=500, FV=0 → PV = $59,371.51"
      },
      {
        question: "A foundation wants to provide $25,000 annually forever. At 4%, how much must the endowment be?",
        answer: "PV = $25,000 / 0.04 = $625,000"
      }
    ],
    relatedLessons: ["CFP-GEN-L010", "CFP-GEN-L012", "CFP-GEN-L013"]
  },

  {
    id: "CFP-GEN-L012",
    domain: "CFP-GEN",
    blueprintArea: "GEN-3",
    title: "Future Value Calculations",
    order: 12,
    duration: 50,
    objectives: [
      "Calculate future value of a single present sum",
      "Understand the power of compound growth over time",
      "Compute future value of ordinary annuities",
      "Compute future value of annuities due",
      "Apply future value to retirement and savings projections"
    ],
    content: `
# Future Value Calculations

**Future Value (FV)** answers the question: *"What will today's money or a series of payments be worth at some future date?"*

---

## Why Future Value Matters

Future value calculations are used to:
- Project retirement account balances
- Estimate college fund accumulation
- Set savings goals for major purchases
- Understand the impact of early vs. late savings
- Model portfolio growth scenarios

---

## Future Value of a Single Sum (Lump Sum)

### The Formula

$$\\text{FV} = \\text{PV} \\times (1 + r)^n$$

### Calculator Approach

| Input | Value |
|-------|-------|
| N | Number of periods |
| I/Y | Interest rate per period |
| PV | Present value (negative if outflow) |
| PMT | 0 (no periodic payments) |
| **Solve for** | **FV** |

### Example 1: Investment Growth

**Question**: A client invests $25,000 today. What will it be worth in 20 years at 8% annually?

**Calculator Inputs**:
- N = 20
- I/Y = 8
- PV = -25,000
- PMT = 0
- **Solve FV = $116,523.90**

**The Power of Time**: That's nearly 5× the original investment!

### Example 2: Comparing Start Times

**Question**: Compare investing $10,000 at age 25 vs. age 35, both at 7% until age 65.

**Age 25 Investor** (40 years):
- FV = $10,000 × (1.07)^40 = **$149,744.58**

**Age 35 Investor** (30 years):
- FV = $10,000 × (1.07)^30 = **$76,122.55**

**Insight**: The early investor has nearly **2× the ending value** from just 10 extra years!

---

## Future Value of an Ordinary Annuity

Regular contributions at the **END** of each period.

### The Formula

$$\\text{FV}_{\\text{Ordinary}} = \\text{PMT} \\times \\frac{(1 + r)^n - 1}{r}$$

### Calculator Approach (END Mode)

| Input | Value |
|-------|-------|
| N | Number of payments |
| I/Y | Interest rate per period |
| PV | 0 (or beginning balance) |
| PMT | Payment amount (negative if outflow) |
| **Solve for** | **FV** |

### Example 3: Monthly Retirement Savings

**Question**: A client saves $500/month for 30 years at 7% annual return. What's the ending balance?

**Calculator Inputs** (monthly):
- N = 360
- I/Y = 7 ÷ 12 = 0.5833
- PV = 0
- PMT = -500
- **Solve FV = $609,985.19**

**Insight**: Total contributions = $180,000. Growth = $429,985 (70% of total!)

### Example 4: Annual 401(k) Contributions

**Question**: A client contributes $24,500/year (2026 limit) to a 401(k) for 25 years at 8%. What's the balance?

**Calculator Inputs** (annual):
- N = 25
- I/Y = 8
- PV = 0
- PMT = -24,500
- **Solve FV = $1,791,095**

---

## Future Value of an Annuity Due

Contributions at the **BEGINNING** of each period.

### The Formula

$$\\text{FV}_{\\text{Due}} = \\text{FV}_{\\text{Ordinary}} \\times (1 + r)$$

### Calculator Approach (BEGIN Mode)

Set calculator to BEGIN mode, then input same as ordinary annuity.

### Example 5: Annual Investment at Year Start

**Question**: A client invests $6,000/year into a Roth IRA at the beginning of each year for 35 years at 9%. What's the FV?

**Calculator Inputs** (BEGIN mode):
- N = 35
- I/Y = 9
- PV = 0
- PMT = -6,000
- **Solve FV = $1,411,461.56**

Compare to ordinary (END mode): $1,294,917.94
Difference: $116,543 extra just from contributing at start of year!

---

## Combining Lump Sum and Annuity

Many real scenarios involve **both** a starting balance AND regular contributions.

### Example 6: Existing Savings Plus Contributions

**Question**: A client has $100,000 now and will add $10,000/year for 20 years at 7%. What's the ending balance?

**Calculator Inputs**:
- N = 20
- I/Y = 7
- PV = -100,000 (current balance)
- PMT = -10,000 (annual additions)
- **Solve FV = $796,754.57**

**Breakdown**:
- FV of $100,000 alone: $386,968
- FV of $10,000/yr alone: $409,787
- Combined: $796,755

---

## The Cost of Waiting

Illustrating why starting early matters:

### Scenario: Saving $500/month at 8% for 30 years

| Start Age | End Age | Total Contributions | Ending Balance |
|-----------|---------|--------------------:|---------------:|
| 25 | 55 | $180,000 | $745,179 |
| 30 | 60 | $180,000 | $745,179 |
| 25 | 65 | $240,000 | $1,745,501 |
| 35 | 65 | $180,000 | $745,179 |

Starting at 25 vs. 35 (same contributions, but 10 more years) → **$1 million more!**

### The "Cost" of a 10-Year Delay

If you delay 10 years but want the same outcome, you must:
- Save **2.23× as much per month** to catch up
- Or accept **less than half** the ending balance

---

## Inflation-Adjusted Future Value

To plan in **today's purchasing power**, discount the FV by inflation.

### Example 7: Real vs. Nominal FV

**Question**: A client will have $1,000,000 in 30 years. If inflation averages 3%, what's that worth in today's dollars?

$$\\text{Real FV} = \\frac{\\$1,000,000}{(1.03)^{30}} = \\frac{\\$1,000,000}{2.4273} = \\$412,000$$

**Insight**: That million dollars will only buy what $412,000 buys today.

---

## Key Takeaways

1. **FV = PV × (1 + r)^n** for single sums (exponential growth)
2. **Annuity due > Ordinary annuity** (one extra period of growth)
3. **Starting early is worth more than saving more later**
4. Combine lump sum + annuity for realistic projections
5. **Adjust for inflation** to understand real purchasing power
    `,
    keyTakeaways: [
      "FV = PV × (1 + r)^n for lump sum growth",
      "Annuity due (BEGIN) produces ~1 period more growth than ordinary",
      "Starting early beats saving more later (time is the most powerful variable)",
      "Combine lump sum + annuity for realistic projections",
      "Divide FV by (1 + inflation)^n for real purchasing power"
    ],
    keyFormulas: [
      "FV of Lump Sum = PV × (1 + r)^n",
      "FV of Ordinary Annuity = PMT × [((1+r)^n - 1) / r]",
      "FV of Annuity Due = FV of Ordinary × (1 + r)",
      "Real FV = Nominal FV / (1 + inflation)^n"
    ],
    practiceProblems: [
      {
        question: "A client invests $15,000 today at 6% for 25 years. What is the future value?",
        answer: "FV = $15,000 × (1.06)^25 = $15,000 × 4.2919 = $64,378.06"
      },
      {
        question: "A client saves $400/month for 20 years at 8% annual return. What is the ending balance?",
        answer: "N=240, I/Y=0.667, PV=0, PMT=-400 → FV = $235,725.58"
      },
      {
        question: "A client has $50,000 saved and adds $12,000/year for 15 years at 7%. What is the total?",
        answer: "N=15, I/Y=7, PV=-50,000, PMT=-12,000 → FV = $439,268.31"
      }
    ],
    relatedLessons: ["CFP-GEN-L010", "CFP-GEN-L011", "CFP-GEN-L013"]
  },

  {
    id: "CFP-GEN-L013",
    domain: "CFP-GEN",
    blueprintArea: "GEN-3",
    title: "Annuities - Ordinary and Due",
    order: 13,
    duration: 45,
    objectives: [
      "Distinguish between ordinary annuities and annuities due",
      "Identify which type applies to common financial scenarios",
      "Convert between ordinary and due calculations",
      "Apply annuity concepts to retirement and savings planning"
    ],
    content: `
# Annuities - Ordinary and Due

**Annuities** are streams of equal payments made at regular intervals. Understanding the timing of payments is crucial for accurate calculations.

---

## The Two Types of Annuities

### Ordinary Annuity (Annuity in Arrears)

Payments occur at the **END** of each period.

**Common Examples**:
- Loan payments (mortgage, auto loan)
- Bond coupon payments
- Investment contributions made at month-end
- Salary paid at end of pay period

### Annuity Due (Annuity in Advance)

Payments occur at the **BEGINNING** of each period.

**Common Examples**:
- Rent payments
- Lease payments
- Insurance premiums
- Retirement income (received at start of month)
- College tuition (paid at start of semester)

---

## Why the Timing Matters

### Example: $1,000/month for 30 years at 8%

| Type | Future Value |
|------|-------------|
| Ordinary Annuity (END mode) | $1,490,359 |
| Annuity Due (BEGIN mode) | **$1,500,296** |

**Difference**: $9,937 more with annuity due!

**Why?**: Each payment has one more period to compound when made at the beginning.

### The Relationship

$$\\text{Annuity Due} = \\text{Ordinary Annuity} \\times (1 + r)$$

This applies to both PV and FV calculations.

---

## Identifying Which Type to Use

### Decision Framework

Ask: **"When does the payment occur relative to the period?"**

| Timing | Type | Calculator Mode |
|--------|------|-----------------|
| End of month/year/period | Ordinary | END |
| Beginning of month/year/period | Due | BEGIN |

### Common Scenarios

| Scenario | Type | Why |
|----------|------|-----|
| Mortgage payments | Ordinary | Payments due at month-end |
| Car loan payments | Ordinary | Payments due at month-end |
| 401(k) contributions (paycheck deduction) | Ordinary | Contributions happen with paycheck |
| Rent/Lease payments | Due | Due at start of month |
| Insurance premiums | Due | Due at start of coverage period |
| Retirement withdrawals | Often Due | Income needed at start of month |
| Tuition payments | Due | Due at start of semester |

---

## Calculator Mode Settings

### HP 10bII+

- **Set END mode**: [Orange] [BEG/END] until display shows no "BEG"
- **Set BEGIN mode**: [Orange] [BEG/END] until display shows "BEG"

### TI BA II Plus

- **Set END mode**: [2nd] [BGN] → display should show "END"
- **Set BEGIN mode**: [2nd] [BGN] [2nd] [SET] → display shows "BGN"

> **Exam Tip**: Always verify your mode BEFORE solving. Wrong mode = wrong answer.

---

## Converting Between Types

If you calculate in the wrong mode, you can convert:

### Formula Conversion

$$\\text{Annuity Due} = \\text{Ordinary Annuity} \\times (1 + r)$$

### Example: You Calculated FV of Ordinary but Need Due

You calculated FV = $500,000 (ordinary) at 6%.

To get annuity due FV:
$$\\text{FV}_{\\text{Due}} = \\$500,000 \\times 1.06 = \\$530,000$$

---

## Practical Applications

### Application 1: Retirement Income Planning

**Question**: A retiree needs $5,000/month at the **beginning** of each month for 25 years. How much should they have at retirement to fund this at 5%?

**This is an annuity due** (income at start of month).

**Calculator (BEGIN mode)**:
- N = 300 (25 × 12)
- I/Y = 0.4167 (5 ÷ 12)
- PMT = 5,000
- FV = 0
- **Solve PV = -$859,242.21**

### Application 2: Lease vs. Purchase Analysis

**Question**: A car lease requires $450/month for 36 months (paid at month start). What is the present value of the lease at 6%?

**Calculator (BEGIN mode)**:
- N = 36
- I/Y = 0.5
- PMT = -450
- FV = 0
- **Solve PV = $14,777.95**

### Application 3: Savings Goal

**Question**: A client wants $200,000 in 18 years for their child's education. If they invest at month-end and earn 7%, what monthly payment is needed?

**This is ordinary annuity** (contributions at month-end).

**Calculator (END mode)**:
- N = 216
- I/Y = 0.5833
- PV = 0
- FV = 200,000
- **Solve PMT = -$476.21**

---

## Deferred Annuities

Sometimes payments **don't start immediately**.

### Example: Retirement Starting in 10 Years

**Question**: A client will receive $3,000/month (at month start) for 20 years, but payments don't begin for 10 years. At 6%, what's the present value today?

**Step 1**: Calculate PV at the START of payments (10 years from now)
- N = 240
- I/Y = 0.5
- PMT = 3,000
- FV = 0
- **PV (at year 10) = $420,124.58**

**Step 2**: Discount that value back 10 years
- N = 120
- I/Y = 0.5
- FV = 420,124.58
- PMT = 0
- **PV (today) = $231,408.19**

---

## Key Takeaways

1. **Ordinary annuity**: Payments at END; use END mode (most loans)
2. **Annuity due**: Payments at BEGINNING; use BEGIN mode (rent, leases, retirement income)
3. Annuity due always has **higher FV or PV** (one extra compounding period)
4. **Conversion**: Annuity Due = Ordinary × (1 + r)
5. **Always verify calculator mode** before solving!
    `,
    keyTakeaways: [
      "Ordinary annuity = END of period payments (loans, most contributions)",
      "Annuity due = BEGINNING of period (rent, leases, retirement income)",
      "Annuity Due = Ordinary × (1 + r) for both PV and FV",
      "Annuity due always produces higher values (extra compounding period)",
      "Always check your calculator mode (END vs. BEGIN) before computing"
    ],
    keyFormulas: [
      "Annuity Due = Ordinary Annuity × (1 + r)",
      "PV Annuity Due = PV Ordinary × (1 + r)",
      "FV Annuity Due = FV Ordinary × (1 + r)"
    ],
    mnemonics: [
      "BEGIN = Annuity Due (payments at Beginning)",
      "END = Ordinary Annuity (payments at End)",
      "Rent is Due at the start → Annuity Due"
    ],
    practiceProblems: [
      {
        question: "A client saves $600/month at month-end for 25 years at 7%. What's the FV? Is this ordinary or due?",
        answer: "Ordinary annuity (month-end = END mode). N=300, I/Y=0.5833, PV=0, PMT=-600 → FV = $508,348.59"
      },
      {
        question: "An office lease requires $3,000/month paid at the start of each month for 5 years. At 5% discount rate, what's the PV?",
        answer: "Annuity due (start of month = BEGIN mode). N=60, I/Y=0.4167, PMT=-3,000, FV=0 → PV = $159,495.65"
      },
      {
        question: "You calculated an ordinary annuity PV of $250,000 at 8%. What would the PV be if it were an annuity due?",
        answer: "PV Due = $250,000 × 1.08 = $270,000"
      }
    ],
    relatedLessons: ["CFP-GEN-L011", "CFP-GEN-L012", "CFP-GEN-L014"]
  },

  {
    id: "CFP-GEN-L014",
    domain: "CFP-GEN",
    blueprintArea: "GEN-3",
    title: "Uneven Cash Flows - NPV and IRR",
    order: 14,
    duration: 55,
    objectives: [
      "Calculate Net Present Value (NPV) for unequal cash flows",
      "Compute Internal Rate of Return (IRR)",
      "Apply NPV decision rules for investment selection",
      "Understand IRR limitations and when NPV is preferred"
    ],
    content: `
# Uneven Cash Flows - NPV and IRR

Real-world investments often have **irregular cash flows** that don't fit the constant annuity pattern. Net Present Value (NPV) and Internal Rate of Return (IRR) are the tools for these situations.

---

## Net Present Value (NPV)

### Definition

**NPV** is the sum of all cash flows (inflows and outflows) discounted to present value at a required rate of return.

### The Formula

$$\\text{NPV} = \\sum_{t=0}^{n} \\frac{CF_t}{(1+r)^t}$$

Or equivalently:

$$\\text{NPV} = -\\text{Initial Investment} + \\sum_{t=1}^{n} \\frac{CF_t}{(1+r)^t}$$

### Decision Rule

| NPV Result | Decision |
|------------|----------|
| **NPV > 0** | Accept the investment (adds value) |
| **NPV = 0** | Indifferent (earns exactly required return) |
| **NPV < 0** | Reject the investment (destroys value) |

---

## NPV Calculation - Manual

### Example 1: Investment Opportunity

**Investment**: $100,000 today
**Cash flows**: Year 1 = $30,000, Year 2 = $40,000, Year 3 = $50,000
**Required return**: 10%

**Step-by-Step**:

| Year | Cash Flow | Discount Factor | Present Value |
|------|-----------|-----------------|---------------|
| 0 | -$100,000 | 1.0000 | -$100,000.00 |
| 1 | +$30,000 | 0.9091 | +$27,272.73 |
| 2 | +$40,000 | 0.8264 | +$33,057.85 |
| 3 | +$50,000 | 0.7513 | +$37,565.74 |
| | | **NPV** | **-$2,103.68** |

**Decision**: NPV < 0, so **reject** this investment at 10% required return.

---

## NPV Calculation - Financial Calculator

### HP 10bII+

1. **Clear**: [Orange] [C ALL]
2. **Enter CF0** (initial investment): **-100000** [CF]
3. **Enter CF1**: **30000** [CF]
4. **Enter CF2**: **40000** [CF]
5. **Enter CF3**: **50000** [CF]
6. **Enter Rate**: **10** [I/YR]
7. **Calculate NPV**: [Orange] [NPV]
8. **Display**: -2,103.68

### TI BA II Plus

1. **Clear**: [CF] [2nd] [CLR Work]
2. **Enter CF0**: **-100000** [ENTER] [↓]
3. **Enter CF1**: **30000** [ENTER] [↓] [↓]
4. **Enter CF2**: **40000** [ENTER] [↓] [↓]
5. **Enter CF3**: **50000** [ENTER] [↓] [↓]
6. **Calculate**: [NPV] → enter I = **10** [ENTER] [↓] [CPT]
7. **Display**: -2,103.68

---

## Internal Rate of Return (IRR)

### Definition

**IRR** is the discount rate that makes NPV equal to zero. It represents the investment's actual rate of return.

### Decision Rule

| Result | Decision |
|--------|----------|
| **IRR > Required Return** | Accept |
| **IRR = Required Return** | Indifferent |
| **IRR < Required Return** | Reject |

---

## IRR Calculation

### Example 2: Same Investment

**Investment**: $100,000 today
**Cash flows**: Year 1 = $30,000, Year 2 = $40,000, Year 3 = $50,000

Using the same cash flow register from NPV:

### HP 10bII+
After entering cash flows: [Orange] [IRR/YR]
**Display**: 8.90%

### TI BA II Plus
After entering cash flows: [IRR] [CPT]
**Display**: 8.90%

**Interpretation**: This investment returns 8.90%. If required return is 10%, **reject** (IRR < required). This confirms the negative NPV.

---

## NPV vs. IRR When They Conflict

NPV and IRR usually agree, but can conflict when:

### 1. Mutually Exclusive Projects (Choosing One)

| Project | Initial Cost | Year 1 | Year 2 | NPV @ 10% | IRR |
|---------|-------------|--------|--------|-----------|-----|
| A | -$100,000 | $80,000 | $60,000 | $23,554 | 26.9% |
| B | -$50,000 | $35,000 | $35,000 | $10,744 | 25.7% |

**Conflict**: B has higher IRR but A has higher NPV.

**Rule**: When forced to choose, **use NPV**. It measures actual value creation.

### 2. Reinvestment Assumption

- **NPV assumes** cash flows reinvested at the discount rate (more realistic)
- **IRR assumes** cash flows reinvested at the IRR (often unrealistic)

### 3. Multiple IRRs

Non-conventional cash flows (signs change more than once) can have multiple IRRs. Use NPV instead.

---

## Serial (Two-Stage) Problems

### Example 3: Retirement Funding

**Situation**: 
- Client is age 40, wants $60,000/year (beginning of year) for 25 years starting at age 65
- Investments earn 7% before retirement, 5% during retirement
- What annual savings needed (end of year) from now to retirement?

**Step 1: Calculate amount needed at retirement (age 65)**

In BEGIN mode:
- N = 25
- I/Y = 5
- PMT = 60,000
- FV = 0
- **Solve PV = $887,449.10** (amount needed at day of retirement)

**Step 2: Calculate annual savings needed**

In END mode:
- N = 25 (years to retirement)
- I/Y = 7
- PV = 0
- FV = 887,449.10
- **Solve PMT = -$14,031.47**

**Answer**: Client must save $14,031.47/year for 25 years.

---

## Common CFP Exam Applications

### 1. Investment Selection
Choose between competing investments using NPV.

### 2. Business Valuation
NPV of projected cash flows = business value.

### 3. Retirement Planning
Two-stage calculation: accumulation phase → distribution phase.

### 4. Real Estate Analysis
NPV of rental income minus purchase price.

### 5. Pension Buyout Decision
NPV of pension payments vs. lump sum offer.

---

## Key Takeaways

1. **NPV** = Sum of discounted cash flows; positive NPV adds value
2. **IRR** = Rate where NPV = 0; compare to required return
3. When NPV and IRR conflict, **prefer NPV** (especially for mutually exclusive projects)
4. Use **cash flow register** on calculator for uneven cash flows
5. Serial problems require **two separate TVM calculations**
    `,
    keyTakeaways: [
      "NPV = sum of all cash flows discounted to present value",
      "NPV > 0 → Accept; NPV < 0 → Reject",
      "IRR = discount rate where NPV = 0",
      "When NPV and IRR conflict, prefer NPV (measures value added)",
      "Use cash flow register for uneven cash flows"
    ],
    keyFormulas: [
      "NPV = Σ [CFt / (1 + r)^t] from t=0 to n",
      "IRR: The rate r where NPV = 0",
      "NPV > 0 → Investment adds value",
      "IRR > Required Return → Accept investment"
    ],
    practiceProblems: [
      {
        question: "An investment costs $50,000 and produces Year 1 = $15,000, Year 2 = $20,000, Year 3 = $25,000. At 8% required return, should you invest?",
        answer: "NPV calculation: -50,000 + 15,000/1.08 + 20,000/1.08² + 25,000/1.08³ = -50,000 + 13,889 + 17,147 + 19,842 = +$878. NPV > 0, so accept."
      },
      {
        question: "The same investment has an IRR of 9.2%. If your required return is 10%, should you invest?",
        answer: "No. IRR (9.2%) < Required Return (10%), so reject. This confirms the NPV would be negative at 10%."
      }
    ],
    relatedLessons: ["CFP-GEN-L011", "CFP-GEN-L012", "CFP-RET-L001"]
  },

  {
    id: "CFP-GEN-L015",
    domain: "CFP-GEN",
    blueprintArea: "GEN-3",
    title: "Loan Amortization and Payment Calculations",
    order: 15,
    duration: 50,
    objectives: [
      "Calculate loan payments for various loan structures",
      "Understand amortization schedules and interest/principal split",
      "Evaluate refinancing decisions",
      "Compare APR to effective annual rate"
    ],
    content: `
# Loan Amortization and Payment Calculations

Understanding loan mechanics is essential for advising clients on mortgages, auto loans, student loans, and refinancing decisions.

---

## Basic Loan Payment Calculation

A loan payment is simply an **annuity** where you're solving for PMT.

### The Setup

| Variable | Description |
|----------|-------------|
| PV | Loan amount (positive) |
| N | Number of payment periods |
| I/Y | Interest rate per period |
| FV | 0 (fully amortized) or balloon amount |
| **Solve** | **PMT** (will be negative = outflow) |

### Example 1: Mortgage Payment

**Loan**: $400,000
**Rate**: 6.5% annual
**Term**: 30 years

**Calculator Inputs (monthly)**:
- N = 360
- I/Y = 6.5 ÷ 12 = 0.5417
- PV = 400,000
- FV = 0
- **Solve PMT = -$2,528.27**

---

## Understanding Amortization

Each payment has two components:
1. **Interest** = Outstanding Balance × Periodic Rate
2. **Principal** = Payment - Interest

### Early Payments: Mostly Interest

For the $400,000 mortgage above (first payment):

**Interest** = $400,000 × 0.065/12 = **$2,166.67**
**Principal** = $2,528.27 - $2,166.67 = **$361.60**

Over 85% of the first payment is interest!

### Later Payments: Mostly Principal

For payment #300 (after 25 years):
- Remaining balance ≈ $143,000
- Interest = $143,000 × 0.005417 ≈ **$775**
- Principal = $2,528.27 - $775 ≈ **$1,753**

---

## Amortization Schedule Excerpt

**$400,000 at 6.5% for 30 years**

| Payment # | Payment | Interest | Principal | Balance |
|-----------|---------|----------|-----------|---------|
| 1 | $2,528 | $2,167 | $361 | $399,639 |
| 2 | $2,528 | $2,165 | $363 | $399,276 |
| 12 | $2,528 | $2,146 | $382 | $395,548 |
| 60 | $2,528 | $2,017 | $511 | $370,206 |
| 120 | $2,528 | $1,817 | $711 | $332,199 |
| 180 | $2,528 | $1,530 | $998 | $280,212 |
| 240 | $2,528 | $1,120 | $1,408 | $203,876 |
| 300 | $2,528 | $524 | $2,004 | $94,116 |
| 360 | $2,528 | $13 | $2,515 | $0 |

---

## Solving for Other Variables

### Find the Loan Amount You Can Afford

**Question**: A client can afford $1,500/month. What mortgage can they afford at 6% for 30 years?

**Calculator Inputs**:
- N = 360
- I/Y = 0.5
- PMT = -1,500
- FV = 0
- **Solve PV = $250,187.30**

### Find the Rate on an Existing Loan

**Question**: A client pays $850/month on a $45,000 auto loan for 5 years. What's the rate?

**Calculator Inputs**:
- N = 60
- PV = 45,000
- PMT = -850
- FV = 0
- **Solve I/Y = 0.573% per month × 12 = 6.88% annually**

### Find How Long to Pay Off

**Question**: A client has a $15,000 credit card balance at 18% and can pay $500/month. How long to pay off?

**Calculator Inputs**:
- I/Y = 1.5 (18 ÷ 12)
- PV = 15,000
- PMT = -500
- FV = 0
- **Solve N = 38.6 months (about 3.2 years)**

---

## Remaining Balance After X Payments

**Method 1: Use Amortization Feature**
Many calculators have an AMORT function to show balance after specific payments.

**Method 2: Calculate Directly**

The remaining balance equals the present value of remaining payments.

**Question**: What's the balance on the $400,000 mortgage after 5 years (60 payments)?

**Calculator Inputs**:
- N = 300 (remaining payments)
- I/Y = 0.5417
- PMT = -2,528.27
- FV = 0
- **Solve PV = $370,206** (remaining balance)

---

## Extra Principal Payments

Making extra payments dramatically shortens loan term and saves interest.

### Example: $200 Extra Per Month

Original: $400,000 at 6.5% for 30 years → Payment = $2,528.27

With $200 extra: Total payment = $2,728.27

**Calculator Inputs**:
- I/Y = 0.5417
- PV = 400,000
- PMT = -2,728.27
- FV = 0
- **Solve N = 293 months (24.4 years)**

**Savings**:
- Time: 5.6 years earlier
- Interest: Original total = $910,179; New total = $799,304
- **Interest saved: $110,875**

---

## Refinancing Analysis

**Decision**: Should a client refinance?

### Key Factors:
1. **New payment** vs. old payment
2. **Closing costs** (typically 2-5% of loan)
3. **Break-even period** (time to recoup costs)
4. **Time remaining** in home

### Example: Refinancing Decision

**Current**: $350,000 remaining at 7%, 25 years left → $2,473/month
**New offer**: 5.5%, 25 years, $8,000 closing costs

**New Payment**:
- N = 300
- I/Y = 0.4583
- PV = 350,000
- FV = 0
- **PMT = $2,154/month**

**Monthly Savings**: $2,473 - $2,154 = $319
**Break-even**: $8,000 ÷ $319 = **25 months**

**Decision**: If staying 25+ months, refinance makes sense.

---

## APR vs. Effective Rate

### APR (Annual Percentage Rate)
Nominal rate that must be disclosed by lenders. Includes fees but quoted without compounding.

### Effective Interest Rate
True annual cost including compounding frequency.

$$\\text{Effective Rate} = \\left(1 + \\frac{APR}{m}\\right)^m - 1$$

### Example: 6% APR Compounded Monthly

$$\\text{Effective} = \\left(1 + \\frac{0.06}{12}\\right)^{12} - 1 = 6.17\\%$$

---

## Key Takeaways

1. **Loan payment** is an annuity; solve for PMT with known PV, N, I/Y
2. Early payments are **mostly interest**; later payments are mostly principal
3. **Extra payments** dramatically reduce total interest and loan term
4. **Break-even analysis** determines if refinancing makes sense
5. **Effective rate > APR** when compounding is more frequent than annual
    `,
    keyTakeaways: [
      "Loan payment = Annuity PMT with loan amount as PV",
      "Early payments are mostly interest; later mostly principal",
      "Extra principal payments dramatically reduce total interest",
      "Refinance break-even = Closing costs ÷ Monthly savings",
      "Effective Rate = (1 + APR/m)^m - 1"
    ],
    keyFormulas: [
      "Payment = PV × [r(1+r)^n] / [(1+r)^n - 1]",
      "Interest portion = Outstanding Balance × Periodic Rate",
      "Principal portion = Payment - Interest",
      "Effective Rate = (1 + r/m)^m - 1"
    ],
    practiceProblems: [
      {
        question: "A client has a $250,000 mortgage at 5.5% for 30 years. What is the monthly payment?",
        answer: "N=360, I/Y=0.4583, PV=250,000, FV=0 → PMT = $1,419.47"
      },
      {
        question: "A client's mortgage has 20 years remaining with a $1,800 payment at 6%. What is the current balance?",
        answer: "N=240, I/Y=0.5, PMT=-1,800, FV=0 → PV = $251,057"
      },
      {
        question: "Refinancing will reduce payments by $250/month with $6,000 in closing costs. What is the break-even period?",
        answer: "Break-even = $6,000 / $250 = 24 months (2 years)"
      }
    ],
    relatedLessons: ["CFP-GEN-L010", "CFP-GEN-L011", "CFP-GEN-L021"]
  }
];

export default CFP_GEN3_LESSONS;
