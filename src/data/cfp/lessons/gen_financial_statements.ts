/**
 * CFP Domain 2: General Principles of Financial Planning
 * Area GEN-2: Financial Statements and Cash Flow
 * 
 * These lessons cover personal financial statements, ratios,
 * and cash flow analysis.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_GEN2_LESSONS: CFPLesson[] = [
  {
    id: "CFP-GEN-L006",
    domain: "CFP-GEN",
    blueprintArea: "GEN-2",
    title: "Personal Financial Statements - Balance Sheet",
    order: 6,
    duration: 45,
    objectives: [
      "Construct a personal balance sheet from client data",
      "Classify assets as liquid, investment, or personal use",
      "Distinguish current from long-term liabilities",
      "Calculate net worth and interpret its meaning",
      "Apply balance sheet ratios to assess financial health"
    ],
    content: `
# Personal Financial Statements - Balance Sheet

The **personal balance sheet** (also called a Statement of Financial Position) provides a snapshot of a client's **net worth** at a specific point in time.

---

## The Balance Sheet Equation

$$\\text{Net Worth} = \\text{Total Assets} - \\text{Total Liabilities}$$

This is the fundamental equation. A positive net worth means assets exceed liabilities. A negative net worth indicates insolvency.

---

## Asset Classification

Assets are typically categorized by **liquidity** and **purpose**:

### 1. Liquid Assets (Cash & Cash Equivalents)

**Definition**: Assets that can be converted to cash quickly with minimal loss of value.

| Asset | Liquidity Level |
|-------|-----------------|
| Checking accounts | Immediate |
| Savings accounts | Immediate |
| Money market accounts | Immediate |
| Certificates of deposit* | Near-immediate (penalty may apply) |
| Savings bonds | Immediate (after 12-month holding) |
| Cash value of life insurance | Moderate (loan or surrender) |

*CDs may be classified as investments if terms are long.

### 2. Investment Assets

**Definition**: Assets held for growth, income, or future goals.

| Asset | Special Considerations |
|-------|----------------------|
| Taxable brokerage | Fair market value; consider cost basis |
| 401(k), 403(b), 457 | Pre-tax value; taxes due on withdrawal |
| Traditional IRA | Pre-tax value; taxes/penalties on early withdrawal |
| Roth IRA | After-tax; earnings tax-free if qualified |
| Annuities | Surrender charges may apply |
| Rental real estate | Equity = FMV - Mortgage |
| Business interests | Valuation may be complex |
| Stock options | Include only vested; value = spread if in-the-money |
| Cryptocurrency | Fair market value; high volatility |

### 3. Personal Use Assets

**Definition**: Assets used for living, not typically sold to fund retirement.

| Asset | Valuation Notes |
|-------|-----------------|
| Primary residence | Market value minus mortgage = equity |
| Vehicles | Depreciated value (KBB, NADA) |
| Furniture/household | Often excluded or minimal value |
| Jewelry/art/collectibles | Appraisal value; insurance value may differ |

> **Exam Tip**: Investment real estate (rental property) is an investment asset. Personal residence is a personal use asset. The classification affects financial ratio calculations.

---

## Liability Classification

Liabilities are classified by **when they're due**:

### Current Liabilities (Due Within 12 Months)

| Liability | Considerations |
|-----------|---------------|
| Credit card balances | Full balance owed |
| Medical bills | Outstanding balances |
| Income taxes owed | Including estimated tax payments due |
| Student loan payments (current portion) | 12 months of payments |
| Mortgage payments (current portion) | 12 months of principal |
| Personal loan payments (current portion) | 12 months of payments |

### Long-Term Liabilities (Due Beyond 12 Months)

| Liability | Considerations |
|-----------|---------------|
| Mortgage balance | Remaining principal after current portion |
| HELOC balance | Outstanding draw |
| Student loans | Total remaining beyond current portion |
| Auto loans | Remaining principal |
| 401(k) loans | Remaining balance |
| Personal loans | Remaining balance |

---

## Constructing a Balance Sheet

### Sample Personal Balance Sheet

**The Johnson Family - December 31, 2025**

| **ASSETS** | **Amount** |
|------------|------------|
| **Liquid Assets** | |
| Checking Account | $8,500 |
| Savings Account | $25,000 |
| Money Market | $12,000 |
| **Subtotal Liquid** | **$45,500** |
| | |
| **Investment Assets** | |
| 401(k) - John | $425,000 |
| 401(k) - Sarah | $180,000 |
| Roth IRA - John | $85,000 |
| Taxable Brokerage | $120,000 |
| 529 Plan - Child 1 | $45,000 |
| 529 Plan - Child 2 | $28,000 |
| **Subtotal Investments** | **$883,000** |
| | |
| **Personal Use Assets** | |
| Primary Residence | $650,000 |
| Vehicles (2) | $45,000 |
| Personal Property | $30,000 |
| **Subtotal Personal** | **$725,000** |
| | |
| **TOTAL ASSETS** | **$1,653,500** |

| **LIABILITIES** | **Amount** |
|-----------------|------------|
| **Current Liabilities** | |
| Credit Card Balance | $4,200 |
| Medical Bills | $1,800 |
| **Subtotal Current** | **$6,000** |
| | |
| **Long-Term Liabilities** | |
| Mortgage Balance | $380,000 |
| Auto Loan | $18,000 |
| Student Loans | $42,000 |
| **Subtotal Long-Term** | **$440,000** |
| | |
| **TOTAL LIABILITIES** | **$446,000** |

| **NET WORTH** | **$1,207,500** |

---

## Balance Sheet Ratios

Financial ratios help assess financial health relative to benchmarks.

### 1. Current Ratio (Liquidity)

$$\\text{Current Ratio} = \\frac{\\text{Liquid Assets}}{\\text{Current Liabilities}}$$

**Example**: $45,500 ÷ $6,000 = **7.58**

**Interpretation**: 
- ≥ 1.0: Can cover current obligations
- 2.0+: Healthy liquidity position
- 7.58: Excellent; may be holding excess cash

### 2. Debt-to-Asset Ratio (Leverage)

$$\\text{Debt-to-Asset Ratio} = \\frac{\\text{Total Liabilities}}{\\text{Total Assets}}$$

**Example**: $446,000 ÷ $1,653,500 = **0.27 or 27%**

**Interpretation**:
- < 0.50 (50%): Generally healthy
- > 0.50: Higher leverage, potential risk
- 27%: Conservative debt level

### 3. Solvency Ratio

$$\\text{Solvency Ratio} = \\frac{\\text{Net Worth}}{\\text{Total Assets}}$$

**Example**: $1,207,500 ÷ $1,653,500 = **0.73 or 73%**

**Interpretation**:
- Higher is better (more equity, less debt)
- 73%: Strong solvency position

### 4. Investment Assets Ratio

$$\\text{Investment Assets Ratio} = \\frac{\\text{Investment Assets}}{\\text{Total Assets}}$$

**Example**: $883,000 ÷ $1,653,500 = **0.53 or 53%**

**Interpretation**:
- Higher indicates more wealth-building capacity
- Personal use assets don't generate returns
- 53%: Good allocation toward growth

---

## Fair Market Value Considerations

| Asset Type | Valuation Approach |
|------------|-------------------|
| Primary residence | Recent comparable sales, Zillow/Redfin estimate, appraisal |
| Investments | Current market value from statements |
| Retirement accounts | Current balance (note pre-tax status) |
| Business interests | Independent valuation, book value, or formula |
| Collectibles | Recent appraisal |
| Vehicles | Kelley Blue Book, NADA |

> **Warning**: Pre-tax accounts (401k, Traditional IRA) show **gross** value. Net value after taxes is less. Some planners apply a tax discount (e.g., 25% haircut) for a conservative view.

---

## Key Takeaways

1. **Net Worth = Assets - Liabilities** (fundamental equation)
2. Assets classified as **liquid, investment, or personal use**
3. Liabilities classified as **current** (< 12 months) or **long-term**
4. **Ratios assess health**: Current ratio, debt-to-asset, solvency, investment assets
5. Use **fair market value** for all assets; note pre-tax status of retirement accounts
    `,
    keyTakeaways: [
      "Net Worth = Total Assets - Total Liabilities",
      "Assets: Liquid (cash) → Investment (growth) → Personal Use (lifestyle)",
      "Liabilities: Current (< 12 months) → Long-term (> 12 months)",
      "Key ratios: Current ratio, debt-to-asset, solvency, investment assets ratio",
      "Pre-tax retirement accounts need tax haircut for true net value"
    ],
    keyFormulas: [
      "Net Worth = Total Assets - Total Liabilities",
      "Current Ratio = Liquid Assets / Current Liabilities",
      "Debt-to-Asset Ratio = Total Liabilities / Total Assets",
      "Solvency Ratio = Net Worth / Total Assets",
      "Investment Assets Ratio = Investment Assets / Total Assets"
    ],
    practiceProblems: [
      {
        question: "A client has liquid assets of $30,000, current liabilities of $15,000, and total liabilities of $250,000 against total assets of $800,000. Calculate the current ratio and debt-to-asset ratio.",
        answer: "Current Ratio = $30,000 / $15,000 = 2.0 (healthy). Debt-to-Asset = $250,000 / $800,000 = 31.25% (manageable leverage)."
      },
      {
        question: "Should a client's primary residence be classified as an investment asset or personal use asset?",
        answer: "Personal use asset. It is not held primarily for growth/income and is not typically liquidated to fund retirement. Rental property WOULD be an investment asset."
      }
    ],
    relatedLessons: ["CFP-GEN-L002", "CFP-GEN-L007", "CFP-GEN-L008"]
  },

  {
    id: "CFP-GEN-L007",
    domain: "CFP-GEN",
    blueprintArea: "GEN-2",
    title: "Personal Financial Statements - Income Statement",
    order: 7,
    duration: 40,
    objectives: [
      "Construct a personal income statement (cash flow statement)",
      "Categorize income sources appropriately",
      "Distinguish fixed, variable, and discretionary expenses",
      "Calculate savings rate and cash flow surplus/deficit",
      "Identify opportunities for increased savings"
    ],
    content: `
# Personal Financial Statements - Income Statement

The **personal income statement** (also called Statement of Cash Flows or Cash Flow Statement) tracks **income and expenses over a period of time** (monthly or annually) to determine cash flow surplus or deficit.

---

## The Cash Flow Equation

$$\\text{Cash Flow} = \\text{Total Income} - \\text{Total Expenses}$$

- **Positive cash flow**: Income exceeds expenses (savings opportunity)
- **Negative cash flow**: Expenses exceed income (debt accumulation or asset drawdown)

---

## Income Categories

### Employment Income

| Source | Tax Treatment |
|--------|---------------|
| Salary/Wages | Ordinary income |
| Bonuses | Ordinary income |
| Commissions | Ordinary income |
| Overtime | Ordinary income |
| Tips | Ordinary income |
| Stock compensation (when vested/exercised) | Varies by type |

**Best Practice**: Use **gross income** before taxes and deductions for income, then show taxes as an expense.

### Self-Employment Income

| Source | Considerations |
|--------|----------------|
| Schedule C net income | After business expenses |
| K-1 distributions | May include ordinary income and capital gains |
| Guaranteed payments | Partnerships |
| Rental income | Net of property expenses |

### Investment Income

| Source | Tax Treatment |
|--------|---------------|
| Interest | Ordinary income (some municipal is tax-exempt) |
| Dividends - Qualified | Preferential capital gains rates |
| Dividends - Non-qualified | Ordinary income |
| Capital gains | Short-term = ordinary; Long-term = preferential |
| Rental net income | Ordinary (may have passive loss limits) |

### Transfer/Other Income

| Source | Tax Treatment |
|--------|---------------|
| Social Security | 0-85% taxable depending on income |
| Pension | Fully or partially taxable |
| Annuity payments | Exclusion ratio applies |
| Alimony received | Taxable if divorce before 2019; not taxable if after |
| Child support received | Not taxable |
| Gifts/Inheritance received | Generally not taxable income |

---

## Expense Categories

### Fixed Expenses

**Definition**: Costs that remain constant month-to-month regardless of behavior.

| Category | Examples |
|----------|----------|
| Housing | Mortgage/rent, property taxes, HOA |
| Insurance | Auto, home, life, health, disability |
| Debt payments | Minimum loan payments |
| Childcare | Daycare, private school tuition |
| Subscriptions | Gym, streaming (if committed) |

### Variable Expenses

**Definition**: Costs that fluctuate based on usage or behavior.

| Category | Examples |
|----------|----------|
| Utilities | Electric, gas, water (usage-based) |
| Food | Groceries, dining out |
| Transportation | Gas, maintenance, public transit |
| Healthcare | Copays, prescriptions, dental |
| Clothing | Personal, children |

### Discretionary Expenses

**Definition**: Wants rather than needs; easiest to cut if necessary.

| Category | Examples |
|----------|----------|
| Entertainment | Movies, concerts, hobbies |
| Travel | Vacations, weekend trips |
| Dining out | Restaurants, takeout |
| Gifts | Holidays, birthdays |
| Personal care | Spa, salon, non-essential |

> **Key Insight**: The line between variable and discretionary is blurry. What matters is identifying expenses that **can be reduced** if savings goals aren't being met.

---

### Tax Expenses

Include all taxes paid:
- Federal income tax (withholding + estimated payments)
- State income tax
- FICA (Social Security + Medicare)
- Property taxes (if not in housing)
- Other (sales tax is usually embedded in expenses)

---

## Constructing an Income Statement

### Sample Annual Income Statement

**The Johnson Family - Year Ended December 31, 2025**

| **INCOME** | **Annual** | **Monthly** |
|------------|------------|-------------|
| John's Salary (Gross) | $165,000 | $13,750 |
| Sarah's Salary (Gross) | $95,000 | $7,917 |
| Bonus - John | $15,000 | $1,250 |
| Interest Income | $1,800 | $150 |
| Dividend Income | $4,200 | $350 |
| **TOTAL INCOME** | **$281,000** | **$23,417** |

| **EXPENSES** | **Annual** | **Monthly** |
|--------------|------------|-------------|
| **Taxes** | | |
| Federal Income Tax | $42,000 | $3,500 |
| State Income Tax | $12,000 | $1,000 |
| FICA (Social Security/Medicare) | $16,000 | $1,333 |
| **Subtotal Taxes** | **$70,000** | **$5,833** |
| | | |
| **Fixed Expenses** | | |
| Mortgage (P&I) | $28,800 | $2,400 |
| Property Taxes | $8,400 | $700 |
| Homeowners Insurance | $2,400 | $200 |
| Auto Insurance | $3,000 | $250 |
| Health Insurance (employee portion) | $6,000 | $500 |
| Life Insurance | $1,800 | $150 |
| Childcare | $18,000 | $1,500 |
| **Subtotal Fixed** | **$68,400** | **$5,700** |
| | | |
| **Variable Expenses** | | |
| Utilities | $4,800 | $400 |
| Groceries | $12,000 | $1,000 |
| Gas/Transportation | $6,000 | $500 |
| Healthcare (copays, Rx) | $2,400 | $200 |
| Clothing | $3,600 | $300 |
| **Subtotal Variable** | **$28,800** | **$2,400** |
| | | |
| **Discretionary Expenses** | | |
| Dining Out | $7,200 | $600 |
| Entertainment | $4,800 | $400 |
| Vacation | $8,000 | $667 |
| Gifts/Donations | $6,000 | $500 |
| Miscellaneous | $4,800 | $400 |
| **Subtotal Discretionary** | **$30,800** | **$2,567** |
| | | |
| **TOTAL EXPENSES** | **$198,000** | **$16,500** |

| **CASH FLOW SURPLUS** | **$83,000** | **$6,917** |

---

## Savings Rate Calculation

The **savings rate** measures what percentage of income is being saved.

$$\\text{Savings Rate} = \\frac{\\text{Income} - \\text{Expenses}}{\\text{Gross Income}} = \\frac{\\text{Cash Flow Surplus}}{\\text{Gross Income}}$$

**Example**: $83,000 ÷ $281,000 = **29.5%**

### Savings Rate Benchmarks

| Savings Rate | Assessment |
|--------------|------------|
| < 10% | Insufficient for most goals |
| 10-15% | Minimum for retirement |
| 15-20% | Good for retirement + other goals |
| 20-25% | Excellent; aggressive wealth building |
| 25%+ | Outstanding; early retirement possible |

> **Note**: Include employer retirement contributions in savings rate (the Johnson example might have additional 401(k) contributions not shown as "expenses").

---

## Identifying Savings Opportunities

When cash flow is negative or insufficient:

### Step 1: Analyze Discretionary Spending
- Can dining out be reduced?
- Is the vacation budget flexible?
- Are subscriptions being used?

### Step 2: Challenge Variable Expenses
- Can utility usage be reduced?
- Is there a cheaper grocery option?
- Can transportation costs be lowered?

### Step 3: Review Fixed Expenses (Harder but Higher Impact)
- Can you refinance the mortgage?
- Is there a cheaper insurance option?
- Can you downsize housing?

### Step 4: Increase Income
- Negotiate raise or promotion
- Side income or freelancing
- Spouse returning to work/increasing hours

---

## Key Takeaways

1. **Cash Flow = Income - Expenses** (indicates saving or spending)
2. Expenses are **Fixed** (stable), **Variable** (fluctuating), or **Discretionary** (optional)
3. **Savings rate** = Cash Flow ÷ Gross Income (target 15-20%+)
4. To increase savings: reduce discretionary → variable → fixed → increase income
5. Include **taxes as an expense** for complete picture
    `,
    keyTakeaways: [
      "Cash Flow = Total Income - Total Expenses",
      "Expenses: Fixed (stable) → Variable (fluctuating) → Discretionary (cuttable)",
      "Savings Rate = Cash Flow Surplus / Gross Income (target 15-20%+)",
      "Increase savings by cutting discretionary first, then variable, then fixed",
      "Include taxes as an expense category for complete cash flow"
    ],
    keyFormulas: [
      "Cash Flow = Total Income - Total Expenses",
      "Savings Rate = (Income - Expenses) / Gross Income"
    ],
    practiceProblems: [
      {
        question: "A client has gross income of $150,000 and total expenses (including taxes) of $125,000. What is their savings rate?",
        answer: "Savings Rate = ($150,000 - $125,000) / $150,000 = $25,000 / $150,000 = 16.67%. This is adequate for basic retirement but may not fund all goals."
      },
      {
        question: "A client needs to reduce expenses by $500/month to meet savings goals. Which category should they target first?",
        answer: "Discretionary expenses (dining, entertainment, subscriptions) should be reviewed first as they have the least impact on quality of life. Then variable, then fixed."
      }
    ],
    relatedLessons: ["CFP-GEN-L006", "CFP-GEN-L008", "CFP-GEN-L009"]
  },

  {
    id: "CFP-GEN-L008",
    domain: "CFP-GEN",
    blueprintArea: "GEN-2",
    title: "Financial Ratios and Benchmarks",
    order: 8,
    duration: 35,
    objectives: [
      "Calculate and interpret key personal financial ratios",
      "Apply benchmark standards to assess client financial health",
      "Identify red flags and areas requiring attention",
      "Use ratios to prioritize planning recommendations"
    ],
    content: `
# Financial Ratios and Benchmarks

Financial ratios transform raw numbers into **meaningful insights** about a client's financial health. Compare ratios to **benchmarks** to identify strengths, weaknesses, and priorities.

---

## Liquidity Ratios

### 1. Emergency Fund Ratio

$$\\text{Emergency Fund Ratio} = \\frac{\\text{Liquid Assets}}{\\text{Monthly Expenses}}$$

**Interpretation**: How many months of expenses could be covered by liquid reserves?

| Result | Assessment | Recommendation |
|--------|------------|----------------|
| < 3 months | Inadequate | Prioritize building emergency fund |
| 3-6 months | Standard benchmark | Adequate for most situations |
| 6-12 months | Enhanced | Appropriate for variable income, self-employed |
| > 12 months | Excess | May be too conservative; opportunity cost |

**Example**: Liquid assets $45,000 ÷ Monthly expenses $7,500 = **6 months** ✓

### 2. Current Ratio

$$\\text{Current Ratio} = \\frac{\\text{Liquid Assets}}{\\text{Current Liabilities}}$$

**Interpretation**: Ability to pay short-term obligations.

| Result | Assessment |
|--------|------------|
| < 1.0 | Cannot cover current obligations without selling assets |
| 1.0-2.0 | Adequate |
| > 2.0 | Strong liquidity |

---

## Debt Ratios

### 3. Housing Expense Ratio (Front-End Ratio)

$$\\text{Housing Ratio} = \\frac{\\text{Monthly Housing Costs}}{\\text{Gross Monthly Income}}$$

**Housing Costs Include**: Mortgage P&I, property taxes, homeowners insurance, HOA fees (PITI).

| Result | Assessment |
|--------|------------|
| ≤ 28% | Conventional mortgage guideline |
| 28-33% | Acceptable with strong credit/reserves |
| > 33% | May be housing-burdened |

**Example**: Housing $3,300 ÷ Gross income $23,417 = **14.1%** ✓ (Well under limit)

### 4. Total Debt Service Ratio (Back-End Ratio)

$$\\text{Debt Service Ratio} = \\frac{\\text{Total Monthly Debt Payments}}{\\text{Gross Monthly Income}}$$

**Debt Payments Include**: Housing + auto + student loans + credit cards + other loans.

| Result | Assessment |
|--------|------------|
| ≤ 36% | Conventional mortgage guideline |
| 36-43% | May qualify for FHA/VA with compensating factors |
| > 43% | Generally too much debt |

**Example**: Total debt payments $4,500 ÷ Gross income $23,417 = **19.2%** ✓

### 5. Debt-to-Asset Ratio

$$\\text{Debt-to-Asset Ratio} = \\frac{\\text{Total Liabilities}}{\\text{Total Assets}}$$

| Result | Assessment |
|--------|------------|
| < 35% | Conservative |
| 35-50% | Moderate leverage |
| > 50% | High leverage; potential vulnerability |

### 6. Consumer Debt Ratio

$$\\text{Consumer Debt Ratio} = \\frac{\\text{Consumer Debt (non-mortgage)}}{\\text{Annual Net Income}}$$

**Consumer Debt Includes**: Credit cards, auto loans, personal loans, student loans.

| Result | Assessment |
|--------|------------|
| < 15% | Manageable |
| 15-20% | Approaching concern |
| > 20% | May indicate debt problem |

---

## Savings and Investment Ratios

### 7. Savings Ratio

$$\\text{Savings Ratio} = \\frac{\\text{Annual Savings}}{\\text{Annual Gross Income}}$$

| Result | Assessment |
|--------|------------|
| < 10% | Likely insufficient for retirement |
| 10-15% | Minimum for retirement only |
| 15-20% | Good for multiple goals |
| > 20% | Excellent; accelerated wealth building |

### 8. Investment Assets to Net Worth Ratio

$$\\text{Investment Assets Ratio} = \\frac{\\text{Investment Assets}}{\\text{Net Worth}}$$

| Result | Assessment |
|--------|------------|
| < 40% | Heavy in personal use assets (home, vehicles) |
| 40-60% | Balanced |
| > 60% | Strong investment orientation |

**Why It Matters**: Investment assets grow and fund retirement; personal use assets typically don't.

---

## Net Worth Benchmarks by Age

A common rule of thumb (The "Millionaire Next Door" formula):

$$\\text{Target Net Worth} = \\frac{\\text{Age × Pre-tax Income}}{10}$$

| Age | Income | Target Net Worth |
|-----|--------|-----------------|
| 30 | $80,000 | $240,000 |
| 40 | $120,000 | $480,000 |
| 50 | $150,000 | $750,000 |
| 60 | $180,000 | $1,080,000 |

**Caveat**: This is a rough guideline. Actual needs depend on goals, lifestyle, pension income, etc.

---

## Ratio Summary Dashboard

### Healthy Client Profile

| Ratio | Target | Client | Status |
|-------|--------|--------|--------|
| Emergency Fund | 3-6 months | 6.0 mo | ✅ |
| Current Ratio | > 1.0 | 7.6 | ✅ |
| Housing Ratio | ≤ 28% | 14% | ✅ |
| Debt Service Ratio | ≤ 36% | 19% | ✅ |
| Debt-to-Assets | < 50% | 27% | ✅ |
| Savings Rate | ≥ 15% | 30% | ✅ |
| Investment Assets | ≥ 40% | 53% | ✅ |

---

## Red Flags Requiring Attention

| Red Flag | Threshold | Concern |
|----------|-----------|---------|
| Emergency fund < 3 months | Immediate | Job loss = crisis |
| Housing ratio > 35% | High | House-poor; limited flexibility |
| Debt service > 43% | Critical | Vulnerability to income disruption |
| Consumer debt ratio > 20% | High | Possible debt spiral |
| Savings rate < 5% | Critical | Not building wealth |
| Negative net worth | Critical | Insolvency risk |

---

## Using Ratios in Planning

### Prioritization Example

A client has:
- Emergency fund: 1.5 months 🔴
- Housing ratio: 32% 🟡
- Savings rate: 8% 🟡
- Consumer debt ratio: 25% 🔴

**Recommended Priority**:
1. Build emergency fund to 3 months (immediate priority)
2. Attack consumer debt aggressively (debt paydown)
3. Increase savings rate once debts under control
4. Housing ratio is high but manageable; long-term consideration

---

## Key Takeaways

1. **Emergency fund ratio** of 3-6 months is the baseline for financial security
2. **Housing ≤ 28%** and **total debt ≤ 36%** are standard lending guidelines
3. **Savings rate of 15%+** is needed for most retirement goals
4. **Investment assets should dominate** net worth for wealth-building
5. Use ratios to **prioritize recommendations** - fix red flags first
    `,
    keyTakeaways: [
      "Emergency fund ratio: 3-6 months of expenses in liquid reserves",
      "Housing ratio ≤ 28%; Total debt service ≤ 36% (standard benchmarks)",
      "Savings rate of 15-20%+ needed for solid retirement planning",
      "Investment assets should be majority of net worth for growth",
      "Red flags (low emergency fund, high debt ratios) take priority"
    ],
    keyFormulas: [
      "Emergency Fund Ratio = Liquid Assets / Monthly Expenses",
      "Housing Ratio = Monthly Housing Costs / Gross Monthly Income",
      "Debt Service Ratio = Total Debt Payments / Gross Monthly Income",
      "Savings Ratio = Annual Savings / Gross Annual Income",
      "Target Net Worth = (Age × Income) / 10"
    ],
    practiceProblems: [
      {
        question: "A 45-year-old client earns $200,000 annually. According to the Millionaire Next Door formula, what is their target net worth?",
        answer: "Target = (45 × $200,000) / 10 = $9,000,000 / 10 = $900,000"
      },
      {
        question: "A client has housing costs of $2,800/month and gross monthly income of $8,000. Is this within guidelines?",
        answer: "Housing Ratio = $2,800 / $8,000 = 35%. This exceeds the 28% conventional guideline and even the 33% stretch guideline. The client may be 'house-poor.'"
      }
    ],
    relatedLessons: ["CFP-GEN-L006", "CFP-GEN-L007", "CFP-GEN-L021"]
  },

  {
    id: "CFP-GEN-L009",
    domain: "CFP-GEN",
    blueprintArea: "GEN-2",
    title: "Cash Flow Management and Budgeting",
    order: 9,
    duration: 30,
    objectives: [
      "Implement effective budgeting strategies for clients",
      "Apply the 'pay yourself first' methodology",
      "Help clients track and categorize expenses",
      "Develop strategies for irregular income situations"
    ],
    content: `
# Cash Flow Management and Budgeting

Converting financial analysis into **action** requires effective cash flow management strategies. This lesson covers practical techniques to help clients optimize their savings and spending.

---

## Budgeting Philosophies

### 1. Traditional Budgeting (Line-Item)

**Approach**: Assign specific dollar amounts to each expense category.

| Pros | Cons |
|------|------|
| Detailed control | Time-consuming |
| Know exactly where money goes | Requires ongoing tracking |
| Good for problem identification | Can feel restrictive |

**Best For**: Clients who want maximum control, those with spending issues.

### 2. Pay Yourself First (Reverse Budgeting)

**Approach**: Automate savings FIRST, then spend what remains freely.

$$\\text{Income} - \\text{Savings} = \\text{Available for Spending}$$

| Pros | Cons |
|------|------|
| Ensures savings goals are met | Less awareness of spending |
| Less daily tracking needed | May overspend remaining |
| Psychologically easier | Requires discipline on remainder |

**Best For**: Disciplined clients who reliably hit savings targets; busy professionals.

### 3. 50/30/20 Rule

**Approach**: Allocate after-tax income to three buckets:

| Category | Percentage | Description |
|----------|------------|-------------|
| **Needs** | 50% | Housing, food, utilities, transportation, insurance |
| **Wants** | 30% | Entertainment, dining out, hobbies, non-essentials |
| **Savings** | 20% | Retirement, debt paydown, emergency fund |

**Example** (After-tax income $8,000/month):
- Needs: $4,000
- Wants: $2,400
- Savings: $1,600

**Best For**: Simple framework for clients who need a starting point.

---

## Implementing Pay Yourself First

### Step 1: Calculate Required Savings

Based on goals, determine monthly savings needed:
- Retirement: $1,500/month
- Emergency fund: $500/month (temporary)
- 529 plans: $600/month
- **Total: $2,600/month**

### Step 2: Automate Transfers

Set up automatic transfers on payday:
- 401(k) contributions via payroll deduction
- IRA contributions monthly (2nd day after payday)
- 529 contributions monthly (2nd day after payday)
- Emergency fund to savings account

> **Key**: Money moved before you see it is money you won't spend.

### Step 3: Spend the Rest Guilt-Free

What remains after savings = spending allowance. No need to track every purchase if savings targets are met.

---

## Expense Tracking Methods

### Manual Tracking
- Spreadsheet updated weekly
- Paper notebook
- Envelope system (cash-based)

### Digital Tools
- Mint, YNAB, Quicken, Personal Capital
- Bank/credit card categorization
- Automatic import and categorization

### Recommended Approach
Track for 60-90 days to establish baseline, then reduce to quarterly reviews if using "Pay Yourself First."

---

## Strategies for Irregular Income

Self-employed, commissioned, and seasonal workers face cash flow challenges.

### Strategy 1: Baseline Budget

1. Calculate **minimum monthly income** you can reliably expect
2. Budget all NEEDS on this minimum
3. Save all excess from good months
4. Draw from savings during lean months

### Strategy 2: Income Smoothing

1. All income goes into a separate "income holding" account
2. Transfer fixed amount to checking monthly (your "salary")
3. Build buffer in holding account for lean months

### Strategy 3: Quarterly Savings Targets

Instead of monthly savings goals:
- Set quarterly savings minimums
- Catch up in strong months if weak months occur
- Annual reconciliation of savings progress

---

## Building and Maintaining an Emergency Fund

### Target Size

| Situation | Target |
|-----------|--------|
| Dual-income, stable jobs | 3 months expenses |
| Single income | 6 months expenses |
| Self-employed/irregular income | 6-12 months expenses |
| High-risk industry | 6-12 months expenses |

### Where to Hold Emergency Fund

| Option | Pros | Cons |
|--------|------|------|
| High-yield savings account | Liquid, FDIC insured, earns interest | Lower yield than investments |
| Money market account | Liquid, may have check-writing | Slightly lower liquidity |
| Short-term bond fund | Higher yield potential | Not FDIC insured, minor volatility |
| Roth IRA contributions | Contributions accessible penalty-free | Reduces retirement savings |

**Most clients**: High-yield savings account is ideal balance of accessibility and returns.

### Emergency Fund Rules

1. **Use ONLY for true emergencies** (job loss, medical crisis, major repair)
2. **Replenish immediately** after any use
3. **Don't invest aggressively** – stability matters more than growth
4. **Keep separate** from regular checking (out of sight, out of mind)

---

## Common Cash Flow Problems and Solutions

| Problem | Solution |
|---------|----------|
| "Money disappears" | Track expenses for 90 days; identify leaks |
| Spending before saving | Automate savings on payday |
| Lifestyle creep | Automatically increase savings with raises |
| Irregular income stress | Build income buffer; baseline budget |
| Credit card dependency | Build emergency fund; cut up cards |
| Couple disagreements | Agree on joint budget; each gets "allowance" |

---

## Key Takeaways

1. **Pay Yourself First**: Automate savings before spending
2. **50/30/20**: Simple framework (Needs/Wants/Savings)
3. Track expenses to identify issues, then simplify
4. **Emergency fund**: 3-6 months in high-yield savings
5. Irregular income requires **income smoothing** strategies
    `,
    keyTakeaways: [
      "Pay Yourself First: Automate savings on payday before spending",
      "50/30/20 Rule: Needs (50%) / Wants (30%) / Savings (20%)",
      "Track expenses for 60-90 days to establish baseline",
      "Emergency fund: 3-6 months expenses in liquid, stable account",
      "Irregular income: Use income smoothing or baseline budget approach"
    ],
    practiceProblems: [
      {
        question: "A self-employed client has highly variable monthly income ranging from $4,000 to $15,000. Which budgeting approach is most appropriate?",
        answer: "Income Smoothing: All income goes to a holding account, then a fixed 'salary' is transferred monthly to checking. This creates stability and builds a buffer for lean months."
      },
      {
        question: "Using the 50/30/20 rule, how should a client with $6,000/month after-tax income allocate their funds?",
        answer: "Needs: $3,000 (50%); Wants: $1,800 (30%); Savings: $1,200 (20%)"
      }
    ],
    relatedLessons: ["CFP-GEN-L007", "CFP-GEN-L008", "CFP-GEN-L022"]
  }
];

export default CFP_GEN2_LESSONS;
