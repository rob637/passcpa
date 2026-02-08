/**
 * CFP Domain 6: Retirement Savings and Income Planning
 * Area RET-1: Retirement Needs Analysis
 * 
 * These lessons cover retirement calculations, Social Security,
 * income replacement, and longevity planning.
 * 
 * Domain 6 is the HIGHEST WEIGHTED (19%) on the CFP exam.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_RET1_LESSONS: CFPLesson[] = [
  {
    id: "CFP-RET-L001",
    domain: "CFP-RET",
    blueprintArea: "RET-1",
    title: "Retirement Needs Analysis Fundamentals",
    order: 1,
    duration: 50,
    objectives: [
      "Apply income replacement methodology for retirement projections",
      "Calculate retirement capital needs using various approaches",
      "Account for inflation in retirement planning",
      "Adjust projections for different retirement dates and life expectancies"
    ],
    content: `
# Retirement Needs Analysis Fundamentals

Determining how much a client needs for retirement is the **cornerstone** of retirement planning.

---

## The Retirement Planning Process

### Step 1: Estimate Retirement Expenses
### Step 2: Identify Guaranteed Income Sources
### Step 3: Calculate the Gap (Shortfall)
### Step 4: Determine Capital Required
### Step 5: Calculate Required Savings

---

## Income Replacement Approach

### The Traditional Guideline

**Replace 70-80%** of pre-retirement income in retirement.

### Why Not 100%?

| Expense | Change in Retirement |
|---------|---------------------|
| FICA taxes (7.65%) | **Eliminated** |
| Retirement savings | **Eliminated** |
| Work-related costs | **Reduced** (commuting, clothes, lunch) |
| Mortgage | Often **paid off** |
| Children expenses | Typically **reduced** |
| Healthcare | Often **increases** |
| Travel/leisure | Often **increases** |

### Customizing the Percentage

| Client Situation | Replacement Rate |
|------------------|------------------|
| Frugal, mortgage-free, good health | 60-70% |
| Moderate lifestyle | 75-80% |
| Active lifestyle, high travel | 85-90% |
| Major healthcare needs | 90-100%+ |

---

## Expense-Based Approach (More Accurate)

### Method

Build retirement budget from actual expected expenses rather than replacement percentage.

### Categories to Estimate

| Category | Monthly | Annual |
|----------|---------|--------|
| **Essential Fixed** | | |
| Housing (mortgage/rent/taxes/insurance) | $____ | $____ |
| Utilities | $____ | $____ |
| Insurance (health/auto/life) | $____ | $____ |
| **Essential Variable** | | |
| Food/groceries | $____ | $____ |
| Transportation | $____ | $____ |
| Healthcare (copays, prescriptions) | $____ | $____ |
| **Discretionary** | | |
| Travel | $____ | $____ |
| Entertainment | $____ | $____ |
| Hobbies | $____ | $____ |
| Gifts | $____ | $____ |
| **TOTAL** | $____ | $____ |

---

## Inflation's Impact on Retirement

### The Purchasing Power Problem

At 3% inflation:
- $100,000 today = $74,409 purchasing power in 10 years
- $100,000 today = $55,368 purchasing power in 20 years
- $100,000 today = $41,199 purchasing power in 30 years

### Key Formulas

**Future expense needs (nominal)**:
$$\\text{Future Need} = \\text{Today's Need} \\times (1 + i)^n$$

**Example**: Client needs $80,000/year today. What will they need in 20 years at 3% inflation?
$$\\$80,000 \\times (1.03)^{20} = \\$144,489$$

---

## Capital Needs Analysis - Three Methods

### Method 1: Capital Preservation

Maintain principal; live off earnings only.

$$\\text{Capital Needed} = \\frac{\\text{Annual Income Need}}{\\text{Expected Return}}$$

**Example**: Need $50,000/year; expect 5% return.
$$\\frac{\\$50,000}{0.05} = \\$1,000,000$$

**Pros**: Never runs out; leaves inheritance
**Cons**: Requires very large portfolio

### Method 2: Capital Depletion (Annuity)

Draw down principal to $0 at life expectancy.

Use TVM calculation:
- N = years in retirement
- I/Y = real return (return - inflation)
- PMT = annual need
- FV = 0
- **Solve PV** = Capital needed

**Example**: Need $50,000/year for 30 years at 3% real return.
$$\\text{PV} = \\$50,000 \\times \\frac{1 - (1.03)^{-30}}{0.03} = \\$980,177$$

**Pros**: Smaller portfolio needed
**Cons**: Longevity risk (outliving money)

### Method 3: Capital Depletion with Buffer

Deplete to a reserve amount (not $0).

Use same TVM but with FV = reserve amount.

---

## Two-Stage TVM Retirement Problem

### The Classic CFP Exam Question

**Given**:
- Current age: 45
- Retirement age: 65 (20 years away)
- Life expectancy: 90 (25 years in retirement)
- Current annual expenses: $80,000
- Inflation: 3%
- Pre-retirement return: 7%
- Retirement return: 5%
- Current savings: $200,000

**Find**: Annual savings needed

### Step 1: Calculate First-Year Retirement Income Need

$$\\$80,000 \\times (1.03)^{20} = \\$144,489$$

### Step 2: Calculate Capital Needed at Retirement

For 25-year annuity at 5% (nominal, ignoring inflation for simplicity):
- N = 25
- I/Y = 5
- PMT = 144,489
- FV = 0
- **PV = $2,035,722** (needed at retirement)

### Step 3: Calculate FV of Current Savings

- N = 20
- I/Y = 7
- PV = -200,000
- PMT = 0
- **FV = $773,937** (what current savings will grow to)

### Step 4: Calculate Shortfall at Retirement

$$\\$2,035,722 - \\$773,937 = \\$1,261,785$$

### Step 5: Calculate Annual Savings Required

- N = 20
- I/Y = 7
- PV = 0
- FV = 1,261,785
- **PMT = $30,788** (annual savings needed)

---

## Sensitivity Analysis

Small changes in assumptions = big impact on results.

### Key Variables to Test

| Variable | Impact if Changed |
|----------|------------------|
| Retirement age | ±1 year = significant change |
| Life expectancy | Longer = more capital needed |
| Return assumptions | Lower = more savings needed |
| Inflation | Higher = more capital needed |
| Spending level | 10% cut = major savings reduction |

---

## Key Takeaways

1. **Income replacement**: 70-80% is a guideline; customize to client
2. **Expense budgeting** is more accurate than replacement percentages
3. **Inflation** compounds; $80K today ≠ $80K in 20 years
4. Two approaches: **Capital preservation** vs. **Capital depletion**
5. Two-stage TVM: Calculate retirement need → Calculate savings required
    `,
    keyTakeaways: [
      "Income replacement ratio: 70-80% is a starting point, customize to client",
      "Expense-based budgeting is more accurate than percentage replacement",
      "Inflation erodes purchasing power: $100K today < $100K in 20 years",
      "Capital preservation: Never depletes, requires larger portfolio",
      "Two-stage TVM: (1) Calculate capital needed, (2) Calculate savings required"
    ],
    keyFormulas: [
      "Future Need = Today's Need × (1 + inflation)^n",
      "Capital Preservation: Capital = Annual Need / Return Rate",
      "Capital Depletion: Use annuity PV formula with FV = 0"
    ],
    mnemonics: [
      "SLIDE into Retirement: Savings, Longevity, Inflation, Depletion, Expenses",
      "Two-Stage TVM: Work Backwards (retirement need first, then savings)"
    ],
    practiceProblems: [
      {
        question: "A client needs $60,000/year in today's dollars at retirement in 15 years. With 2.5% inflation, what is the first-year retirement income need?",
        answer: "$60,000 × (1.025)^15 = $60,000 × 1.4483 = $86,898"
      },
      {
        question: "A client wants to preserve capital and needs $45,000/year. Expected return is 4.5%. How much capital is needed?",
        answer: "Capital = $45,000 / 0.045 = $1,000,000"
      },
      {
        question: "A client needs $100,000/year for 30 years at 4% real return. Using capital depletion, how much is needed at retirement?",
        answer: "N=30, I/Y=4, PMT=100,000, FV=0 → PV = $1,729,203"
      }
    ],
    relatedLessons: ["CFP-RET-L002", "CFP-RET-L003", "CFP-GEN-L014"]
  },

  {
    id: "CFP-RET-L002",
    domain: "CFP-RET",
    blueprintArea: "RET-1",
    title: "Social Security Retirement Benefits",
    order: 2,
    duration: 55,
    objectives: [
      "Explain Social Security eligibility and benefit calculation",
      "Compare claiming ages and their impact on benefits",
      "Apply spousal, survivor, and divorced spouse benefits",
      "Develop Social Security claiming strategies"
    ],
    content: `
# Social Security Retirement Benefits

Social Security provides foundational retirement income for most Americans. Understanding its rules is **essential** for retirement planning.

---

## Eligibility Requirements

### Work Credits (Quarters of Coverage)

- Need **40 credits** (10 years of work) for retirement benefits
- Earn up to **4 credits per year**
- 2024: $1,730 in earnings = 1 credit

### Full Retirement Age (FRA)

| Birth Year | FRA |
|------------|-----|
| 1943-1954 | 66 |
| 1955 | 66 + 2 months |
| 1956 | 66 + 4 months |
| 1957 | 66 + 6 months |
| 1958 | 66 + 8 months |
| 1959 | 66 + 10 months |
| 1960+ | **67** |

---

## Benefit Calculation

### Step 1: Calculate AIME

**Average Indexed Monthly Earnings (AIME)**:
- Index each year's earnings to current wage levels
- Take highest 35 years of earnings
- Divide by 420 (35 × 12 months)

### Step 2: Apply PIA Formula

**Primary Insurance Amount (PIA)** uses bend points:

For 2024:
- **90%** of first $1,174 AIME, plus
- **32%** of AIME between $1,174 and $7,078, plus
- **15%** of AIME above $7,078

### Example: AIME = $8,000

$$\\text{PIA} = (0.90 \\times \\$1,174) + (0.32 \\times \\$5,904) + (0.15 \\times \\$922)$$
$$\\text{PIA} = \\$1,057 + \\$1,889 + \\$138 = \\$3,084$$

---

## Claiming Age Impact

### Early Retirement (Age 62)

- Benefits reduced by **5/9 of 1%** for each month before FRA (first 36 months)
- **5/12 of 1%** for each additional month beyond 36

| If FRA is 67... | Reduction at Age 62 |
|-----------------|---------------------|
| 60 months early | **30% reduction** |

### Delayed Retirement Credits (After FRA)

- Benefit increases **8% per year** until age 70
- Maximum 8 years of credits if FRA is 62 (but earliest claim is 62)
- **32% increase** if FRA is 66 and claim at 70
- **24% increase** if FRA is 67 and claim at 70

### Claiming Age Summary (FRA = 67)

| Claim Age | % of PIA |
|-----------|----------|
| 62 | 70% |
| 63 | 75% |
| 64 | 80% |
| 65 | 86.7% |
| 66 | 93.3% |
| 67 (FRA) | 100% |
| 68 | 108% |
| 69 | 116% |
| 70 | 124% |

---

## Spousal Benefits

### Eligibility
- Married at least **1 year**
- Spouse has filed for benefits (or deemed filing after 2015)

### Benefit Amount
- **Up to 50%** of spouse's PIA at spousal FRA
- Reduced if claimed before FRA
- **No delayed credits** after FRA

### Independent Benefit vs. Spousal

Social Security pays the **higher of**:
1. Worker's own benefit, OR
2. Spousal benefit

---

## Survivor Benefits

### Surviving Spouse

| Age | Benefit |
|-----|---------|
| FRA or later | 100% of deceased's benefit |
| Before FRA | Reduced (can claim as early as 60) |
| Disabled (50-59) | Reduced benefit |
| Caring for child under 16 | 75% regardless of age |

### Children

- Unmarried child under 18 (19 if in high school)
- Disabled child (disability before 22)
- Benefit: 75% of deceased's PIA

### Family Maximum

Total family benefits capped at **150-180%** of worker's PIA.

---

## Divorced Spouse Benefits

### Eligibility Requirements

1. Marriage lasted **10+ years**
2. Currently **unmarried** (or remarried after 60)
3. Age 62+
4. Ex-spouse is age 62+ (filed or not)

### Benefit

- Up to **50% of ex-spouse's PIA**
- Does NOT reduce ex-spouse's benefit
- Can claim independently if divorced 2+ years

### Survivor Benefits

Divorced spouse can receive survivor benefits if:
- Marriage lasted 10+ years
- Currently unmarried (or remarried after 60)

---

## Taxation of Benefits

### Up to 85% of Benefits May Be Taxable

Based on **Combined Income**:
$$\\text{Combined Income} = \\text{AGI} + \\text{Tax-Exempt Interest} + \\frac{1}{2} \\text{Social Security Benefits}$$

### Thresholds (2024)

| Filing Status | Combined Income | % Taxable |
|---------------|-----------------|-----------|
| Single | < $25,000 | 0% |
| Single | $25,000 - $34,000 | Up to 50% |
| Single | > $34,000 | Up to 85% |
| MFJ | < $32,000 | 0% |
| MFJ | $32,000 - $44,000 | Up to 50% |
| MFJ | > $44,000 | Up to 85% |

---

## Earnings Test (Before FRA)

If still working and claiming before FRA:

### Under FRA All Year
- $1 withheld for every $2 earned above **$22,320** (2024)

### Year Reaching FRA
- $1 withheld for every $3 earned above **$59,520** (2024)
- Only counts earnings before the month of FRA

### At or After FRA
- **NO earnings test** - work without reduction

> **Important**: Withheld benefits aren't lost; they're added back into your benefit calculation at FRA.

---

## Claiming Strategies

### Single Individual
- Break-even: Compare claiming at 62 vs. 70
- Break-even typically around age 80-82
- If health is poor, claim early; if healthy, delay

### Married Couples
- Coordinate claiming for maximum lifetime benefits
- Higher earner should often delay to maximize survivor benefit
- Lower earner may claim earlier

### File and Suspend (Limited)
- Largely eliminated after 2015
- Only those born before 1/2/1954 had grandfathering

---

## Key Takeaways

1. **40 credits** (10 years) for eligibility; 35 best years for calculation
2. **FRA is 67** for those born 1960+; claiming early = permanent reduction
3. **Delayed credits**: 8%/year increase until 70 (max 24-32% boost)
4. **Spousal**: Up to 50% of spouse's PIA; no delayed credits
5. **Divorced spouse**: 10-year marriage; can claim on ex without reducing their benefit
    `,
    keyTakeaways: [
      "Need 40 credits (10 years) for eligibility; benefit uses 35 highest-earning years",
      "FRA is age 67 for those born 1960+; claiming at 62 = 30% permanent reduction",
      "Delayed retirement credits: 8%/year until 70 (max 24% increase if FRA is 67)",
      "Spousal benefit: Up to 50% of spouse's PIA at FRA; no delayed credits",
      "Divorced spouse: 10-year marriage required; doesn't reduce ex-spouse's benefit"
    ],
    keyFormulas: [
      "PIA = 90% × first $1,174 + 32% × ($1,174-$7,078) + 15% × (above $7,078)",
      "Early reduction: 5/9 of 1% per month for first 36 months; 5/12 of 1% thereafter",
      "Delayed credits: 8% per year after FRA until 70",
      "Combined Income = AGI + Tax-exempt Interest + ½ SS Benefits"
    ],
    mnemonics: [
      "FRA 67 for '60 - both numbers have 6 and 7",
      "Spousal: 50% max, no delay benefit",
      "Divorced: Must be 10 (years married)"
    ],
    practiceProblems: [
      {
        question: "A client born in 1962 has FRA of 67 and PIA of $2,500. What is her benefit if she claims at age 62?",
        answer: "60 months early = 30% reduction. Benefit = $2,500 × 0.70 = $1,750/month."
      },
      {
        question: "Same client delays until 70. What is her benefit?",
        answer: "3 years past FRA = 24% increase. Benefit = $2,500 × 1.24 = $3,100/month."
      },
      {
        question: "A divorced spouse was married for 12 years. Her ex-husband has a PIA of $3,000. What is the maximum spousal benefit she can receive?",
        answer: "50% of ex-spouse's PIA = $3,000 × 0.50 = $1,500/month (at her FRA)."
      }
    ],
    relatedLessons: ["CFP-RET-L001", "CFP-RET-L003", "CFP-RET-L004"]
  },

  {
    id: "CFP-RET-L003",
    domain: "CFP-RET",
    blueprintArea: "RET-1",
    title: "Medicare and Healthcare in Retirement",
    order: 3,
    duration: 50,
    objectives: [
      "Explain Medicare eligibility and enrollment periods",
      "Compare Parts A, B, C, and D coverage",
      "Calculate Medicare premiums including IRMAA",
      "Evaluate Medigap and Medicare Advantage options"
    ],
    content: `
# Medicare and Healthcare in Retirement

Healthcare costs are often the **largest expense** in retirement. Understanding Medicare is essential.

---

## Medicare Eligibility

### Automatic Enrollment
- Age **65** if receiving Social Security
- End-Stage Renal Disease (ESRD) or ALS at any age
- Disability (after 24 months of SSDI)

### Initial Enrollment Period (IEP)

7-month window:
- 3 months before 65th birthday month
- Month of 65th birthday
- 3 months after 65th birthday month

> **Warning**: Late enrollment = permanent penalties!

---

## The Four Parts of Medicare

### Part A - Hospital Insurance

| Coverage | Details |
|----------|---------|
| **Inpatient hospital** | Semi-private room, meals, nursing |
| **Skilled nursing facility** | Days 1-20 fully covered; 21-100 with copay |
| **Home health care** | Part-time nursing, therapy |
| **Hospice care** | End-of-life care |

**Premium**: Free for most (40+ quarters of work)
**Deductible 2024**: $1,632 per benefit period

### Part B - Medical Insurance

| Coverage | Details |
|----------|---------|
| **Doctor visits** | Office visits, outpatient care |
| **Preventive services** | Screenings, vaccines |
| **Durable medical equipment** | Wheelchairs, walkers |
| **Outpatient procedures** | Surgery, therapy |

**Standard Premium 2024**: $174.70/month
**Deductible 2024**: $240/year
**Coinsurance**: 20% after deductible

### Part C - Medicare Advantage (MA)

Private insurance alternative combining A + B (often + D).

| Feature | Details |
|---------|---------|
| **Coverage** | All Part A & B benefits (often more) |
| **Network** | Usually HMO or PPO |
| **Premiums** | Often $0 beyond Part B premium |
| **Out-of-pocket max** | Required cap (unlike Original Medicare) |

### Part D - Prescription Drug Coverage

Standalone or included in Part C.

**Standard Benefit Structure 2024**:
- Deductible: $545
- Initial coverage: 25% coinsurance until $5,030
- Coverage gap (donut hole): 25% until $8,000 true OOP
- Catastrophic: 5% coinsurance (or small copays)

---

## IRMAA - Income-Related Adjustments

High-income beneficiaries pay more for Parts B and D.

### Part B Monthly IRMAA (2024)

| Single MAGI | Married MAGI | Part B Total |
|-------------|--------------|--------------|
| ≤ $103,000 | ≤ $206,000 | $174.70 |
| $103,001-$129,000 | $206,001-$258,000 | $244.60 |
| $129,001-$161,000 | $258,001-$322,000 | $349.40 |
| $161,001-$193,000 | $322,001-$386,000 | $454.20 |
| $193,001-$499,999 | $386,001-$749,999 | $559.00 |
| ≥ $500,000 | ≥ $750,000 | $594.00 |

**Based on**: Tax return from 2 years prior (2022 for 2024 premiums)

### Life-Changing Events

Can request new determination if:
- Retirement/reduction in work hours
- Death of spouse
- Divorce
- Loss of pension

---

## Medigap (Medicare Supplement) Policies

### Purpose
Covers gaps in Original Medicare (A + B):
- Part A/B deductibles
- Part B coinsurance (20%)
- Excess charges

### Standardized Plans

10 standardized plans (A, B, C, D, F, G, K, L, M, N):

| Plan | Most Popular | Key Coverage |
|------|--------------|--------------|
| **Plan G** | Most popular for new enrollees | All gaps except Part B deductible |
| **Plan N** | Lower premium option | Covers most; small copays |
| **Plan F** | Closed to new enrollees after 2020 | Covers everything |

### Enrollment Rules

- **Open Enrollment**: 6 months starting at 65 + Part B
- **Guaranteed Issue**: No health questions during open enrollment
- **After Open Enrollment**: Underwriting applies; can be denied

---

## Medicare Advantage vs. Original Medicare + Medigap

| Factor | Original + Medigap | Medicare Advantage |
|--------|-------------------|-------------------|
| **Premium** | Higher (Medigap + D) | Often $0 |
| **Network** | Any Medicare provider | Restricted network |
| **Out-of-pocket max** | None (unless Medigap) | Required ($7,550 max in 2024) |
| **Drug coverage** | Separate Part D | Usually included |
| **Extra benefits** | None | Dental, vision, hearing common |
| **Flexibility** | High | Lower |

---

## Healthcare Cost Planning

### Average Retirement Healthcare Costs

Fidelity estimate (2023): A 65-year-old couple retiring today needs approximately **$315,000** for healthcare in retirement (not including long-term care).

### Factors Affecting Costs

| Factor | Impact |
|--------|--------|
| **Early retirement** | Need bridge coverage until 65 |
| **IRMAA surcharges** | Can add $5,000+/year |
| **Long-term care** | Not covered by Medicare |
| **Dental/vision/hearing** | Limited Medicare coverage |

---

## Key Enrollment Periods

| Period | When | What You Can Do |
|--------|------|-----------------|
| **IEP** | 7 months around 65th birthday | Enroll in A, B, D, Medigap |
| **OEP** (Open) | Jan 1 - March 31 | Switch MA plans, drop MA for Original |
| **AEP** (Annual) | Oct 15 - Dec 7 | Switch MA, add/change Part D |
| **SEP** (Special) | Varies by situation | Triggered by qualifying event |

---

## Key Takeaways

1. **Part A**: Hospital (usually free); **Part B**: Medical ($174.70/mo)
2. **Medicare Advantage (C)**: Private alternative; network restrictions, often $0 extra
3. **IRMAA**: High-income surcharges based on MAGI 2 years prior
4. **Medigap Open Enrollment**: 6 months at 65 + Part B; guaranteed issue
5. **Healthcare costs**: ~$315,000 for couple, not including long-term care
    `,
    keyTakeaways: [
      "Part A (hospital) usually free; Part B (medical) $174.70/month standard",
      "Medicare Advantage (Part C) = private alternative with network restrictions",
      "IRMAA applies to high-income: based on MAGI from 2 years prior",
      "Medigap Open Enrollment: 6 months at age 65 + Part B; guaranteed issue",
      "Retirement healthcare estimate: ~$315,000/couple (not including LTC)"
    ],
    keyFormulas: [
      "IRMAA lookback = Current year - 2 (2024 uses 2022 MAGI)",
      "Part B standard = $174.70 (2024) + possible IRMAA",
      "Part A deductible = $1,632 per benefit period (2024)"
    ],
    mnemonics: [
      "Medicare ABCD: A=Hospital, B=Medical, C=Advantage, D=Drugs",
      "IRMAA = 2-year lookback (I Reviewed My AGI Again)"
    ],
    practiceProblems: [
      {
        question: "A single client had $150,000 MAGI in 2022. What is their 2024 Part B premium?",
        answer: "$150,000 is in the $129,001-$161,000 bracket. Part B premium = $349.40/month."
      },
      {
        question: "A client is turning 65 in June. When does their Initial Enrollment Period begin and end?",
        answer: "IEP: March 1 (3 months before) through September 30 (3 months after June)."
      },
      {
        question: "A client missed the Medigap Open Enrollment period. What are the consequences?",
        answer: "They can still apply, but insurers can use medical underwriting. They may be denied coverage or charged higher premiums based on health conditions."
      }
    ],
    relatedLessons: ["CFP-RET-L002", "CFP-RET-L004", "CFP-INS-L001"]
  },

  {
    id: "CFP-RET-L004",
    domain: "CFP-RET",
    blueprintArea: "RET-1",
    title: "Longevity Risk and Retirement Distribution Strategies",
    order: 4,
    duration: 50,
    objectives: [
      "Assess longevity risk in retirement planning",
      "Apply sustainable withdrawal rate strategies",
      "Sequence distributions for tax efficiency",
      "Manage sequence-of-returns risk"
    ],
    content: `
# Longevity Risk and Retirement Distribution Strategies

The biggest risk in retirement isn't market volatility—it's **running out of money**.

---

## Understanding Longevity Risk

### The Problem

People underestimate how long they'll live.

### Life Expectancy Statistics

| Gender | At Age 65 | % Living to 90 |
|--------|-----------|----------------|
| Male | 19.5 years (to 84.5) | 26% |
| Female | 21.9 years (to 86.9) | 38% |
| Couple (at least one) | 25 years | 50%+ |

### Planning Implication

Don't plan to life expectancy—plan to age **95** for singles or **longer** for couples.

---

## Sustainable Withdrawal Rates

### The 4% Rule (Bengen)

William Bengen's 1994 analysis:
- Withdraw **4% of initial portfolio** in year 1
- Increase by inflation each year
- Historically sustained 30-year retirements (using 50/50 stocks/bonds)

### Example

**Portfolio**: $1,000,000
**Year 1 withdrawal**: $1,000,000 × 4% = $40,000
**Year 2 (3% inflation)**: $40,000 × 1.03 = $41,200
**Year 3**: $41,200 × 1.03 = $42,436

### Criticisms of 4% Rule

| Issue | Concern |
|-------|---------|
| Historical returns may not repeat | Future returns may be lower |
| 30-year horizon | Many retirements exceed 30 years |
| Rigid withdrawals | Doesn't adapt to market conditions |
| Bond yields historically higher | Today's yields are lower |

### Updated Estimates

Many researchers now suggest **3.5% or lower** for 30+ year retirements in low-yield environments.

---

## Dynamic Withdrawal Strategies

### 1. Guardrails Approach (Guyton-Klinger)

Adjust withdrawals based on portfolio performance:
- If portfolio grows significantly → increase spending
- If portfolio drops significantly → decrease spending
- Sets "guardrails" that trigger adjustments

### 2. Required Minimum Distribution (RMD) Method

Withdraw using life expectancy factors:
- Each year, divide portfolio by remaining life expectancy
- Naturally adjusts—more in good years, less in bad
- Can't run out (mathematically)

### 3. Bucket Strategy

Segment portfolio by time horizon:
- **Bucket 1 (1-2 years)**: Cash/money market
- **Bucket 2 (3-7 years)**: Bonds/stable
- **Bucket 3 (8+ years)**: Stocks/growth

Refill Bucket 1 from Bucket 2; Bucket 2 from Bucket 3 when markets are up.

---

## Sequence-of-Returns Risk

### The Problem

**When** returns occur matters as much as **total** returns.

### Example: Same Average Returns, Different Outcomes

| Year | Portfolio A Returns | Portfolio B Returns |
|------|---------------------|---------------------|
| 1 | -15% | +20% |
| 2 | -10% | +15% |
| 3 | +10% | +10% |
| 4 | +15% | -10% |
| 5 | +20% | -15% |
| **Average** | 4% | 4% |

With $1 million and $50,000/year withdrawals:
- **Portfolio A** (bad early): Runs out sooner
- **Portfolio B** (good early): Lasts much longer

### Mitigation Strategies

1. **Reduce equity exposure** early in retirement (rising glide path)
2. **Cash buffer** (1-2 years expenses in cash)
3. **Flexible spending** in down years
4. **Guaranteed income** (annuities, pensions)
5. **Delay Social Security** (provides higher guaranteed income later)

---

## Tax-Efficient Distribution Sequencing

### Traditional Wisdom (May Not Be Optimal)

1. Taxable accounts first (stock brokerage)
2. Tax-deferred second (Traditional IRA/401k)
3. Tax-free last (Roth)

### Why Traditional Wisdom May Be Wrong

| Issue | Problem |
|-------|---------|
| RMDs at 73 | Large RMDs = high tax brackets |
| IRMAA | High income triggers Medicare surcharges |
| Roth growth | Letting Roth grow maximizes tax-free |
| Tax bracket management | May waste low bracket space |

### Optimized Strategy: Fill Tax Brackets

1. Withdraw from pre-tax to **fill lower tax brackets**
2. Use Roth for amounts that would push into higher brackets
3. Consider **Roth conversions** during low-income years
4. Maintain taxable for **capital gain harvesting** and liquidity

---

## Account Ordering Based on Tax Status

### Current Tax Environment

| If In... | Strategy |
|----------|----------|
| **Low bracket now, higher later** | Draw pre-tax now; protect Roth |
| **High bracket now, lower later** | Draw Roth/taxable; defer pre-tax |
| **Consistent brackets** | Balance based on legacy goals |

### Retiree Tax Planning Opportunities

- **Roth conversions** in early retirement (before SS and RMDs)
- **Capital gain harvesting** at 0% rate (up to $89,250 MFJ in 2024)
- **Qualified dividends** in low bracket years
- **Bunching deductions** (standard deduction years vs. itemizing)

---

## Guaranteed Income Floor

### Purpose

Cover essential expenses with guaranteed income:
- Social Security
- Pensions
- Income annuities

### Formula
$$\\text{Income Floor} = \\text{Essential Expenses}$$

If floor is insufficient:
- Single Premium Immediate Annuity (SPIA)
- Deferred Income Annuity (DIA)

---

## Key Takeaways

1. **Plan to age 95** (50%+ of couples see one spouse reach 90)
2. **4% rule** is a starting point; 3.5% may be safer today
3. **Sequence risk** is greatest early in retirement—protect early years
4. **Tax-efficient sequencing**: Don't blindly follow "taxable first"
5. **Guaranteed income floor**: Cover essentials with SS, pensions, annuities
    `,
    keyTakeaways: [
      "Plan for longevity: 50% of couples have one spouse living to 90+",
      "4% rule = $40,000/year per $1M; 3.5% may be safer currently",
      "Sequence risk: Poor early returns + withdrawals = rapid depletion",
      "Tax sequencing: Fill lower tax brackets strategically, not just 'taxable first'",
      "Cover essential expenses with guaranteed income (SS, pension, annuities)"
    ],
    keyFormulas: [
      "4% Rule: Year 1 = Portfolio × 4%; then adjust for inflation",
      "Safe Withdrawal = Portfolio × 3.5-4%",
      "Income Floor = Essential Expenses covered by guaranteed income"
    ],
    mnemonics: [
      "Sequence Risk: WORST early = Words End Retirement Savings Too",
      "Distribution Order: TaRF (Taxable, Retirement, Tax-Free... but optimize!)"
    ],
    practiceProblems: [
      {
        question: "A client has $1.5 million and wants a sustainable withdrawal. Using the 4% rule, what is year 1 withdrawal?",
        answer: "$1,500,000 × 4% = $60,000 in year 1"
      },
      {
        question: "After a 3% inflation year, what is year 2 withdrawal?",
        answer: "$60,000 × 1.03 = $61,800"
      },
      {
        question: "Why might a retiree in a low tax bracket convert Traditional IRA to Roth even if they need the money from taxable accounts?",
        answer: "Converting fills the low bracket with income taxed at low rates, avoiding higher RMD-driven taxes later. The Roth then grows tax-free and provides tax diversification."
      }
    ],
    relatedLessons: ["CFP-RET-L001", "CFP-RET-L002", "CFP-RET-L010"]
  }
];

export default CFP_RET1_LESSONS;
