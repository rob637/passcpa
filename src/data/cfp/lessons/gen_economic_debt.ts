/**
 * CFP Domain 2: General Principles of Financial Planning
 * Area GEN-5: Economic Concepts and Debt Management
 * 
 * These lessons cover economic fundamentals, consumer debt strategies,
 * emergency funds, and financial calculator mastery.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_GEN5_LESSONS: CFPLesson[] = [
  {
    id: "CFP-GEN-L020",
    domain: "CFP-GEN",
    blueprintArea: "GEN-5",
    title: "Economic Concepts for Financial Planners",
    order: 20,
    duration: 45,
    objectives: [
      "Explain the business cycle and its phases",
      "Describe monetary and fiscal policy tools",
      "Interpret key economic indicators",
      "Apply economic concepts to financial planning decisions"
    ],
    content: `
# Economic Concepts for Financial Planners

Understanding economic fundamentals helps planners anticipate market conditions and advise clients appropriately.

---

## The Business Cycle

The economy moves through predictable phases:

### Four Phases

| Phase | Characteristics | Investment Implications |
|-------|-----------------|------------------------|
| **Expansion** | Rising GDP, employment, consumer spending | Stocks tend to perform well |
| **Peak** | Maximum economic output, potential overheating | Consider reducing risk |
| **Contraction (Recession)** | Declining GDP, rising unemployment | Defensive positioning |
| **Trough** | Economic bottom, signs of recovery | Opportunity to increase equity exposure |

### Key Definitions

- **Recession**: Two consecutive quarters of negative GDP growth (informal definition)
- **Depression**: Severe, prolonged recession (>10% GDP decline or >3 years)
- **Recovery**: Period from trough to previous peak

---

## Monetary Policy - The Federal Reserve

The **Federal Reserve (Fed)** controls money supply and interest rates.

### Fed's Dual Mandate

1. **Maximum employment** (full employment)
2. **Price stability** (low, stable inflation - target 2%)

### Key Tools

| Tool | How It Works | Effect |
|------|--------------|--------|
| **Federal Funds Rate** | Rate banks charge each other overnight | Primary tool; affects all rates |
| **Open Market Operations** | Buy/sell Treasury securities | Increases/decreases money supply |
| **Reserve Requirements** | Required reserves banks must hold | Affects lending capacity |
| **Discount Rate** | Rate Fed charges banks for loans | Emergency lending facility |
| **Quantitative Easing (QE)** | Large-scale asset purchases | Expands money supply dramatically |

### Policy Stances

| Stance | Goal | Actions |
|--------|------|---------|
| **Expansionary** (Dovish) | Stimulate economy | Lower rates, buy securities |
| **Contractionary** (Hawkish) | Fight inflation | Raise rates, sell securities |

---

## Fiscal Policy - Congress & President

**Fiscal policy** involves government spending and taxation.

### Expansionary Fiscal Policy
- Increase government spending
- Reduce taxes
- **Goal**: Stimulate economic growth

### Contractionary Fiscal Policy
- Decrease government spending
- Increase taxes
- **Goal**: Cool overheating economy, reduce deficits

### Deficit vs. Debt
- **Deficit**: Annual shortfall (spending > revenue)
- **Debt**: Accumulated deficits over time

---

## Key Economic Indicators

### Leading Indicators (Predict Future)

| Indicator | What It Signals |
|-----------|-----------------|
| Stock prices (S&P 500) | Market expectations |
| Building permits | Future construction |
| Consumer expectations | Future spending |
| Average weekly hours worked | Labor demand |
| Yield curve | Interest rate expectations |

### Coincident Indicators (Current State)

| Indicator | What It Shows |
|-----------|---------------|
| GDP | Current economic output |
| Employment | Current labor market |
| Personal income | Current purchasing power |
| Industrial production | Current manufacturing |

### Lagging Indicators (Confirm Trends)

| Indicator | What It Confirms |
|-----------|------------------|
| Unemployment rate | Employment trends |
| CPI (inflation) | Price trends |
| Prime rate | Interest rate trends |
| Consumer credit | Spending patterns |

---

## Inflation and Interest Rates

### Types of Inflation

| Type | Cause |
|------|-------|
| **Demand-pull** | Too much money chasing too few goods |
| **Cost-push** | Increased production costs passed to consumers |
| **Wage-push** | Rising wages increase costs and prices |

### Key Measures

| Measure | Description |
|---------|-------------|
| **CPI** | Consumer Price Index - urban consumer basket |
| **Core CPI** | Excludes food and energy (volatile) |
| **PPI** | Producer Price Index - wholesale prices |
| **PCE** | Personal Consumption Expenditures (Fed's preferred) |

### Yield Curve

The relationship between interest rates and bond maturities:

| Shape | Meaning |
|-------|---------|
| **Normal (Upward)** | Long rates > short rates; healthy economy expected |
| **Inverted** | Short rates > long rates; recession predictor |
| **Flat** | Equal rates; economic uncertainty |

---

## Economic Concepts Applied to Planning

### Asset Allocation Implications

| Economic Phase | Stocks | Bonds | Cash |
|----------------|--------|-------|------|
| Early Expansion | Overweight | Underweight | Neutral |
| Late Expansion | Neutral | Neutral | Increase |
| Recession | Underweight | Overweight | Increase |
| Recovery | Overweight | Underweight | Decrease |

### Interest Rate Impact

| If Rates Rise... | Impact |
|------------------|--------|
| Bond prices | Fall |
| Mortgage costs | Increase |
| Savings rates | Increase |
| Stock valuations | Generally decline |

### Inflation Planning

| Inflation Environment | Consider |
|----------------------|----------|
| High/Rising | TIPS, commodities, real estate, I-Bonds |
| Low/Stable | Longer-duration bonds, growth stocks |

---

## Key Takeaways

1. **Business cycle**: Expansion → Peak → Contraction → Trough
2. **Fed's tools**: Federal funds rate, open market operations
3. **Leading indicators** (predict): Stock prices, building permits, yield curve
4. **Inverted yield curve**: Historical recession predictor
5. **Rising rates**: Bad for bonds, mixed for stocks, good for savers
    `,
    keyTakeaways: [
      "Business cycle: Expansion → Peak → Contraction → Trough → repeat",
      "Fed controls monetary policy through interest rates and money supply",
      "Leading indicators predict; coincident measure; lagging confirm",
      "Inverted yield curve historically predicts recessions",
      "Inflation erodes purchasing power - plan with real returns"
    ],
    keyFormulas: [
      "Real Return = Nominal Return - Inflation (approximate)",
      "Real Return = (1 + Nominal) / (1 + Inflation) - 1 (exact)"
    ],
    mnemonics: [
      "Business Cycle: Every Police Captain Takes Patrol (Expansion, Peak, Contraction, Trough)",
      "Fed's job: Full employment + Stable prices"
    ],
    practiceProblems: [
      {
        question: "The yield curve just inverted. What does this typically signal and how might a planner respond?",
        answer: "An inverted yield curve often signals a coming recession. A planner might reduce equity exposure, increase bond allocation and cash reserves, and ensure emergency funds are adequate."
      },
      {
        question: "The Fed announces a 0.50% rate increase. What is the immediate impact on existing bond prices?",
        answer: "Existing bond prices will fall. When interest rates rise, existing bonds with lower rates become less valuable compared to new bonds issued at higher rates."
      }
    ],
    relatedLessons: ["CFP-GEN-L021", "CFP-INV-L001", "CFP-INV-L010"]
  },

  {
    id: "CFP-GEN-L021",
    domain: "CFP-GEN",
    blueprintArea: "GEN-5",
    title: "Consumer Debt Management Strategies",
    order: 21,
    duration: 45,
    objectives: [
      "Distinguish between debt payoff strategies",
      "Calculate the cost of minimum payments",
      "Evaluate balance transfer and consolidation options",
      "Apply credit score factors to financial planning"
    ],
    content: `
# Consumer Debt Management Strategies

Effective debt management is fundamental to financial health and a common focus of financial planning engagements.

---

## Types of Consumer Debt

### Secured Debt
Backed by collateral that can be repossessed.

| Type | Typical Rate | Collateral |
|------|--------------|------------|
| Mortgage | 6-8% | Home |
| Auto loan | 5-10% | Vehicle |
| Home equity loan/HELOC | 7-10% | Home equity |

### Unsecured Debt
Not backed by collateral; higher rates due to increased risk.

| Type | Typical Rate |
|------|--------------|
| Credit cards | 15-25% |
| Personal loans | 8-15% |
| Student loans (federal) | 5-8% |
| Student loans (private) | 6-12% |
| Medical debt | 0-10% |

---

## Debt Payoff Strategies

### 1. Debt Avalanche (Highest Interest First)

**Method**: Pay minimums on all debts, put extra money toward **highest rate** debt first.

| Pros | Cons |
|------|------|
| Mathematically optimal | Slow early wins |
| Saves most interest | May feel discouraging |
| Fastest to debt-free | - |

### 2. Debt Snowball (Smallest Balance First)

**Method**: Pay minimums on all debts, put extra money toward **smallest balance** first.

| Pros | Cons |
|------|------|
| Quick psychological wins | Not mathematically optimal |
| Builds momentum | May pay more total interest |
| Reduces number of payments faster | - |

### Example Comparison

**Client has**:
- Card A: $5,000 at 22%
- Card B: $2,000 at 15%
- Card C: $8,000 at 18%

**Extra payment**: $300/month above minimums

| Strategy | Order | Total Interest |
|----------|-------|----------------|
| **Avalanche** | A → C → B | Lowest |
| **Snowball** | B → A → C | Higher, but faster wins |

> **Planner's Role**: Both work. Choose based on client personality. Some need quick wins (snowball); others optimize math (avalanche).

---

## The Cost of Minimum Payments

### Credit Card Example

**Balance**: $10,000
**Rate**: 20% APR
**Minimum payment**: 2% of balance (at least $25)

| Payment Strategy | Time to Payoff | Total Interest |
|------------------|---------------|----------------|
| Minimum only | 30+ years | $19,000+ |
| $300/month fixed | 44 months | $3,137 |
| $500/month fixed | 24 months | $1,759 |

> **Key Insight**: Minimum payments can result in paying **twice the original balance** in interest!

---

## Balance Transfer Strategies

### How It Works
Transfer high-rate balances to a new card with 0% intro APR (typically 12-21 months).

### Considerations

| Factor | Detail |
|--------|--------|
| Transfer fee | Usually 3-5% of transferred amount |
| Intro period | 0% for 12-21 months |
| Regular APR | Kicks in after intro (often 18-25%) |
| Credit impact | New account may temporarily lower score |

### Break-Even Analysis

**Transfer $10,000 at 20% APR → 0% card with 3% fee**

**Monthly interest saved**: $10,000 × 20%/12 = $167/month
**Transfer fee**: $10,000 × 3% = $300

**Break-even**: $300 / $167 = **1.8 months**

If paying off within intro period, transfer saves money.

---

## Debt Consolidation Options

### Personal Loan Consolidation

| Pros | Cons |
|------|------|
| Fixed rate and payment | May extend payment term |
| Single monthly payment | Won't help if behavior unchanged |
| Often lower rate than cards | Fees may apply |

### Home Equity Options

| Type | Rate | Risk |
|------|------|------|
| **Home Equity Loan** | Lower fixed rate | Home is collateral |
| **HELOC** | Lower variable rate | Home is collateral |
| **Cash-out Refinance** | Mortgage rate | Increases mortgage |

> **Warning**: Converting unsecured debt to secured debt (home) risks losing the home if payments aren't made.

---

## Credit Scores and Financial Planning

### FICO Score Factors

| Factor | Weight | Optimization |
|--------|--------|--------------|
| **Payment history** | 35% | Pay on time, always |
| **Credit utilization** | 30% | Keep below 30%, ideally <10% |
| **Length of credit history** | 15% | Keep old accounts open |
| **Credit mix** | 10% | Have various account types |
| **New credit** | 10% | Limit new applications |

### Credit Score Ranges

| Range | Rating |
|-------|--------|
| 800-850 | Exceptional |
| 740-799 | Very Good |
| 670-739 | Good |
| 580-669 | Fair |
| 300-579 | Poor |

---

## Good Debt vs. Bad Debt

### Generally "Good" Debt
- **Mortgage**: Builds equity, often appreciates
- **Student loans**: Investment in earning potential
- **Business loans**: For income-producing assets

### Generally "Bad" Debt
- **Credit cards**: High rates, depreciating purchases
- **Payday loans**: Extremely high rates
- **Auto loans on depreciating vehicles**: Lose value immediately

> **Reality**: Any debt becomes "bad" if it's unaffordable or prevents achieving financial goals.

---

## Key Takeaways

1. **Avalanche**: Pay highest rate first (optimal mathematically)
2. **Snowball**: Pay smallest balance first (optimal psychologically)
3. **Balance transfers**: Worth it if paying off during intro period
4. **Credit utilization**: Keep below 30% for best score impact
5. **Minimum payments**: Can result in paying 2× the original balance
    `,
    keyTakeaways: [
      "Debt avalanche (highest rate) saves most money; snowball (smallest balance) provides quick wins",
      "Minimum payments can result in paying 2× the original balance in interest",
      "Balance transfers work if debt is paid off during 0% intro period",
      "Credit utilization (30% of FICO) should stay below 30%",
      "Payment history (35% of FICO) is the single biggest score factor"
    ],
    keyFormulas: [
      "Monthly interest = Balance × (APR / 12)",
      "Transfer break-even = Fee / Monthly interest saved"
    ],
    practiceProblems: [
      {
        question: "A client has $15,000 in credit card debt at 21%. If they only make the 2% minimum payment, approximately how much will they pay in total?",
        answer: "With minimum-only payments at 21%, they would likely pay close to $45,000 total (3× the balance) over 25-30+ years."
      },
      {
        question: "A client is considering a balance transfer. Current: $8,000 at 22%. New card: 0% for 18 months with 4% fee. Should they transfer?",
        answer: "Fee = $8,000 × 4% = $320. Monthly savings = $8,000 × 22%/12 = $147. Break-even = 320/147 = 2.2 months. If they can pay it off in 18 months, YES - they'd save roughly $2,320 in interest minus the $320 fee = $2,000 net savings."
      }
    ],
    relatedLessons: ["CFP-GEN-L009", "CFP-GEN-L015", "CFP-GEN-L022"]
  },

  {
    id: "CFP-GEN-L022",
    domain: "CFP-GEN",
    blueprintArea: "GEN-5",
    title: "Emergency Funds and Liquidity Planning",
    order: 22,
    duration: 35,
    objectives: [
      "Calculate appropriate emergency fund amounts",
      "Recommend liquidity strategies for different client situations",
      "Compare emergency fund savings vehicles",
      "Balance emergency funds with other financial goals"
    ],
    content: `
# Emergency Funds and Liquidity Planning

An adequate emergency fund is the **foundation** of financial security. Without it, any financial plan is vulnerable.

---

## Why Emergency Funds Matter

### Purpose
Cover unexpected expenses and income disruption without:
- Liquidating investments (potentially at a loss)
- Taking on high-interest debt
- Derailing long-term financial plans

### Common Emergency Uses
- Job loss / income reduction
- Medical expenses
- Major home repairs
- Car repairs / replacement
- Unplanned travel (family emergency)

---

## How Much Is Enough?

### General Guideline

| Situation | Recommended Reserve |
|-----------|---------------------|
| Dual-income, stable jobs | **3 months** of expenses |
| Single income or variable income | **6 months** of expenses |
| Self-employed or unstable field | **9-12 months** of expenses |
| Near retirement or health issues | **12+ months** of expenses |

### Calculating the Target

**Formula**: Monthly Essential Expenses × Months Needed

**Essential Expenses Include**:
- Housing (mortgage/rent, utilities, insurance)
- Food
- Transportation
- Healthcare premiums/costs
- Minimum debt payments
- Insurance premiums

**Do NOT Include**:
- Discretionary spending
- Investment contributions
- Gifts/entertainment
- Non-critical subscriptions

### Example Calculation

**Client monthly essentials**:
- Housing: $2,500
- Food: $600
- Transportation: $400
- Healthcare: $300
- Insurance: $200
- Minimum debts: $500
- **Total**: $4,500/month

**Single income earner → 6 months**: $4,500 × 6 = **$27,000 target**

---

## Where to Keep Emergency Funds

### Primary: High-Yield Savings Account (HYSA)

| Feature | Benefit |
|---------|---------|
| FDIC insured | Protected up to $250,000 |
| Immediate access | 1-2 day transfers |
| Competitive yield | Currently 4-5% APY |
| No market risk | Principal protected |

### Secondary Options

| Vehicle | Pros | Cons |
|---------|------|------|
| **Money Market Account** | Slightly higher yields, check-writing | May have minimum balance |
| **I-Bonds** | Inflation-protected, tax-deferred | 1-year lock-up, $10K annual limit |
| **Roth IRA Contributions** | Dual purpose (retirement if unused) | Contributions only (not earnings) |
| **HELOC** | Access to large amounts | Must qualify, uses home as collateral |

### What to Avoid for Emergency Funds

- Stocks/mutual funds (market risk)
- CDs with penalties (liquidity issue)
- Physical cash (no growth, theft risk)
- Investments with long settlement

---

## Tiered Emergency Fund Strategy

For larger emergency funds, consider tiers:

### Tier 1: Immediate Access (1-2 months)
- High-yield savings account
- Checking account buffer

### Tier 2: Near-Term Access (2-4 months)
- Money market funds
- I-Bonds (after 1-year holding period)

### Tier 3: Extended Reserve (4+ months)
- Short-term Treasury funds
- Roth IRA contributions (as last resort)

---

## Special Situations

### Dual-Income Couples

May need less if:
- Both jobs are stable
- Either income covers essential expenses
- Good disability insurance

Consider reducing to 3-4 months if other safety nets exist.

### High-Net-Worth Clients

May satisfy emergency reserve through:
- Taxable brokerage (margin availability)
- Cash value life insurance loans
- HELOC established but unused

### Retirees

Need larger cash reserves because:
- No earned income to rebuild
- Sequence of returns risk
- Healthcare costs unpredictable

**Recommendation**: 1-2 years in cash/short-term bonds.

---

## Building the Fund

### Strategies to Fund

| Strategy | How It Works |
|----------|--------------|
| **Automate transfers** | Set up recurring transfers to savings |
| **Tax refunds** | Direct lump sums to emergency fund |
| **Windfalls** | Bonuses, gifts, inheritances |
| **Expense reduction** | Cut discretionary spending temporarily |
| **Side income** | Dedicate extra earnings to fund |

### Priority Order

1. **One month's expenses first** (minimum safety net)
2. **Then full target** (3-6+ months)
3. **Only then** focus on other goals

> **Exception**: Always capture employer 401(k) match even while building emergency fund.

---

## Balancing Competing Priorities

### Common Question: "Should I pay debt or build emergency fund?"

**Answer**: Do both strategically.

1. Build **$1,000-$2,000** immediate cushion first
2. Pay any extremely high-interest debt (>20%)
3. Continue building toward **1 month's expenses**
4. Resume debt payoff (avalanche method)
5. Complete **full emergency target** (3-6 months)

---

## Key Takeaways

1. Emergency funds prevent derailing financial plans during crises
2. **3-6 months** for most; more for self-employed, single income, retirees
3. **HYSA** is the ideal vehicle: FDIC insured, liquid, earning yield
4. Calculate based on **essential expenses only**, not total spending
5. Build **$1,000 cushion first**, then complete full target
    `,
    keyTakeaways: [
      "Emergency fund = 3-6 months of essential expenses (more for volatility)",
      "High-yield savings accounts: Best balance of safety, liquidity, and yield",
      "Calculate on essentials only: housing, food, transport, healthcare, debt minimums",
      "Build $1,000 minimum cushion first, then complete full target",
      "Tiered approach: Immediate access (1-2 mo) + near-term (2-4 mo) + extended"
    ],
    keyFormulas: [
      "Emergency Fund Target = Monthly Essential Expenses × Months Needed",
      "Single income/variable: 6+ months",
      "Dual stable income: 3 months minimum"
    ],
    practiceProblems: [
      {
        question: "A single-income family has $5,500/month in essential expenses. What is their recommended emergency fund target?",
        answer: "For single income: 6 months minimum. Target = $5,500 × 6 = $33,000."
      },
      {
        question: "A client has $50,000 in a brokerage account and asks if that counts as their emergency fund. What should you advise?",
        answer: "No. A brokerage account has market risk - the value could drop significantly right when they need it most. Emergency funds should be in FDIC-insured accounts (HYSA) without market risk."
      }
    ],
    relatedLessons: ["CFP-GEN-L009", "CFP-GEN-L008", "CFP-GEN-L021"]
  },

  {
    id: "CFP-GEN-L023",
    domain: "CFP-GEN",
    blueprintArea: "GEN-5",
    title: "Financial Calculator Mastery",
    order: 23,
    duration: 55,
    objectives: [
      "Set up and use HP 10bII+ and TI BA II Plus calculators",
      "Solve complex multi-step TVM problems",
      "Master uneven cash flow functions for NPV and IRR",
      "Avoid common calculator errors on the CFP exam"
    ],
    content: `
# Financial Calculator Mastery

Calculator proficiency is **critical** for CFP exam success. Mastering these tools ensures you solve problems quickly and accurately.

---

## Approved CFP Exam Calculators

The CFP Board allows ONLY:
- **HP 10bII+** (blue)
- **TI BA II Plus** (or Professional)

You may bring **two calculators** to the exam (recommended: same type, fresh batteries).

---

## Initial Setup - HP 10bII+

### Essential Settings

1. **Clear All Memory**
   - Press: **[Orange] [C ALL]**

2. **Set Payments Per Year (P/YR)**
   - For annual problems: **1 [Orange] [P/YR]**
   - For monthly problems: **12 [Orange] [P/YR]**

3. **Set END/BEGIN Mode**
   - Default is END (ordinary annuity)
   - To switch: **[Orange] [BEG/END]**
   - "BEG" appears when in BEGIN mode

4. **Display Precision**
   - For 4 decimal places: **[Orange] [DISP] 4**

---

## Initial Setup - TI BA II Plus

### Essential Settings

1. **Clear TVM Memory**
   - Press: **[2nd] [CLR TVM]**

2. **Set Payments Per Year (P/Y)**
   - Press: **[2nd] [P/Y]**
   - Enter: **1** (for annual) or **12** (for monthly)
   - Press: **[ENTER]**
   - Press: **[CE/C]** to exit

3. **Set END/BEGIN Mode**
   - Press: **[2nd] [BGN]**
   - If it shows "BGN", press **[2nd] [SET]** to toggle to END
   - Press: **[CE/C]** to exit

4. **Display Precision**
   - **[2nd] [FORMAT]** → enter desired decimals → **[ENTER]**

---

## The Sign Convention (Critical!)

### The Rule

| Cash Direction | Sign |
|----------------|------|
| **Cash going OUT** (you pay) | **NEGATIVE (-)** |
| **Cash coming IN** (you receive) | **POSITIVE (+)** |

### Common Scenarios

| Situation | PV | PMT | FV |
|-----------|----|----|-----|
| Saving for future | Negative (outflow) | Negative (outflow) | Positive (result) |
| Loan (borrower view) | Positive (receive) | Negative (pay) | 0 |
| Annuity purchase | Negative (pay) | Positive (receive) | 0 |

---

## Basic TVM Problem Types

### Type 1: Future Value of a Lump Sum

**Problem**: $10,000 invested at 6% for 15 years?

| Key | Input |
|-----|-------|
| N | 15 |
| I/Y | 6 |
| PV | -10,000 |
| PMT | 0 |
| **Solve FV** | **23,965.58** |

### Type 2: Present Value of an Annuity

**Problem**: What should you pay today for $1,000/month for 10 years at 5%?

| Key | Input |
|-----|-------|
| N | 120 (10 × 12) |
| I/Y | 0.4167 (5 ÷ 12) |
| PMT | 1,000 |
| FV | 0 |
| **Solve PV** | **-94,281.12** |

### Type 3: Payment Calculation

**Problem**: $300,000 mortgage at 6.5% for 30 years. Monthly payment?

| Key | Input |
|-----|-------|
| N | 360 |
| I/Y | 0.5417 (6.5 ÷ 12) |
| PV | 300,000 |
| FV | 0 |
| **Solve PMT** | **-1,896.20** |

### Type 4: Solving for Interest Rate

**Problem**: Invest $50,000, receive $100,000 in 12 years. What rate?

| Key | Input |
|-----|-------|
| N | 12 |
| PV | -50,000 |
| PMT | 0 |
| FV | 100,000 |
| **Solve I/Y** | **5.95%** |

### Type 5: Solving for Time

**Problem**: $500/month at 8% to reach $200,000. How many months?

| Key | Input |
|-----|-------|
| I/Y | 0.6667 (8 ÷ 12) |
| PV | 0 |
| PMT | -500 |
| FV | 200,000 |
| **Solve N** | **199.27 months** |

---

## Uneven Cash Flows (NPV/IRR)

### HP 10bII+

1. **Clear**: [Orange] [C ALL]
2. **Enter CF0**: amount [CFj]
3. **Enter CF1**: amount [CFj]
4. Repeat for each cash flow
5. **For NPV**: rate [I/YR], then [Orange] [NPV]
6. **For IRR**: [Orange] [IRR/YR]

### TI BA II Plus

1. **Enter CF Mode**: [CF]
2. **Clear**: [2nd] [CLR Work]
3. **CF0**: enter value, [ENTER], [↓]
4. **C01**: enter value, [ENTER], [↓]
5. **F01** (frequency): usually 1, [ENTER], [↓]
6. Continue for all cash flows
7. **For NPV**: [NPV], enter I, [ENTER], [↓], [CPT]
8. **For IRR**: [IRR], [CPT]

### Example: NPV Calculation

**Investment**: -$100,000 today
**Cash flows**: Year 1 = $30,000, Year 2 = $40,000, Year 3 = $50,000
**Required return**: 10%

| Entry | Value |
|-------|-------|
| CF0 | -100,000 |
| CF1 | 30,000 |
| CF2 | 40,000 |
| CF3 | 50,000 |
| I | 10% |
| **NPV** | **-$2,103.68** |

---

## Common Exam Pitfalls

### 1. Wrong P/Y Setting

**Problem**: You set P/Y = 12 for a monthly problem, then forget to change it back.

**Fix**: Always check P/Y before each new problem or set to 1 and adjust I/Y manually.

### 2. Wrong Mode (END vs. BEGIN)

**Problem**: Calculating lease in END mode instead of BEGIN.

**Fix**: Read the problem carefully for "beginning" or "end" of period.

### 3. Forgetting the Sign Convention

**Problem**: All positive numbers give nonsensical answers.

**Fix**: Cash out = negative; Cash in = positive.

### 4. Not Clearing Previous Values

**Problem**: Old PMT value carries into new problem.

**Fix**: Clear TVM memory between problems.

### 5. Annual vs. Monthly Confusion

**Problem**: Using annual rate with monthly periods.

**Fix**: Always match:
- Monthly payments → Monthly rate (annual ÷ 12)
- Annual payments → Annual rate

---

## Serial (Two-Stage) Problem Approach

### Example: Retirement Funding

**Stage 1** (Accumulation): Save $X/year at 8% for 25 years.
**Stage 2** (Distribution): Need $50,000/year for 20 years at 5%.

### Solve Backwards

**Step 1**: How much needed at retirement?
- N = 20, I/Y = 5, PMT = 50,000, FV = 0
- **PV = $623,110.52**

**Step 2**: How much to save annually?
- N = 25, I/Y = 8, PV = 0, FV = 623,110.52
- **PMT = $8,527.35**

---

## Key Takeaways

1. **Know your calculator cold** - practice until it's automatic
2. **Clear memory** between problems
3. **Sign convention**: Outflows negative, inflows positive
4. **Match periods**: Monthly payments = monthly rate
5. **Serial problems**: Work backwards from the goal
    `,
    keyTakeaways: [
      "CFP exam allows HP 10bII+ and TI BA II Plus only",
      "Clear TVM memory between problems; check P/Y and BEGIN/END mode",
      "Sign convention: OUTFLOWS = negative, INFLOWS = positive",
      "Match time periods: monthly payments require monthly rate (annual ÷ 12)",
      "Serial problems: Work backwards from future need to today's requirement"
    ],
    keyFormulas: [
      "5 TVM Variables: N, I/Y, PV, PMT, FV",
      "Monthly rate = Annual rate ÷ 12",
      "Monthly periods = Years × 12"
    ],
    mnemonics: [
      "Never Invest Poor Money Fast (N, I/Y, PV, PMT, FV)",
      "OUT is Negative, IN is Positive"
    ],
    practiceProblems: [
      {
        question: "A client invests $5,000/year (end of year) at 7% for 20 years. What is the future value?",
        answer: "N=20, I/Y=7, PV=0, PMT=-5,000, solve FV = $204,977.10"
      },
      {
        question: "A client needs $1 million at retirement. They have 30 years and expect 8%. How much must they invest today (lump sum)?",
        answer: "N=30, I/Y=8, PMT=0, FV=1,000,000, solve PV = -$99,377.33 (need $99,377 today)"
      },
      {
        question: "An investment costs $75,000 and produces: Y1=$20,000, Y2=$25,000, Y3=$30,000, Y4=$20,000. At 9%, what is the NPV?",
        answer: "CF0=-75,000, CF1=20,000, CF2=25,000, CF3=30,000, CF4=20,000, I=9 → NPV = $3,784.88 (positive, so accept)"
      }
    ],
    relatedLessons: ["CFP-GEN-L010", "CFP-GEN-L014", "CFP-GEN-L011"]
  }
];

export default CFP_GEN5_LESSONS;
