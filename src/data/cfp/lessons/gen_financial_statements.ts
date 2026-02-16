/**
 * CFP Domain 2: General Principles of Financial Planning
 * Area GEN-2: Financial Statements and Cash Flow
 * 
 * These lessons cover personal financial statements, ratios,
 * and cash flow analysis.
 */

import type { Lesson } from '../../../types';

export const CFP_GEN2_LESSONS: Lesson[] = [
  {
    id: 'CFP-GEN-L006',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    title: 'Personal Financial Statements - Balance Sheet',
    description: 'Construct and analyze personal balance sheets to assess client net worth and financial health',
    order: 6,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Balance Sheet', 'Net Worth', 'Asset Classification', 'Liability Classification', 'Financial Ratios'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'The personal balance sheet (also called a Statement of Financial Position) provides a snapshot of a client\'s **net worth** at a specific point in time. Understanding how to construct and interpret balance sheets is fundamental to financial planning.'
        },
        {
          title: 'The Balance Sheet Equation',
          type: 'text',
          content: 'The fundamental equation:\n\n$$\\text{Net Worth} = \\text{Total Assets} - \\text{Total Liabilities}$$\n\nA positive net worth means assets exceed liabilities. A negative net worth indicates insolvency.'
        },
        {
          title: 'Asset Classification',
          type: 'text',
          content: 'Assets are typically categorized by **liquidity** and **purpose**:\n\n**1. Liquid Assets (Cash & Cash Equivalents)**\nAssets that can be converted to cash quickly with minimal loss of value.\n\n**2. Investment Assets**\nAssets held for growth, income, or future goals.\n\n**3. Personal Use Assets**\nAssets used for living, not typically sold to fund retirement.'
        },
        {
          title: 'Liquid Assets',
          type: 'table',
          headers: ['Asset', 'Liquidity Level'],
          rows: [
            ['Checking accounts', 'Immediate'],
            ['Savings accounts', 'Immediate'],
            ['Money market accounts', 'Immediate'],
            ['Certificates of deposit*', 'Near-immediate (penalty may apply)'],
            ['Savings bonds', 'Immediate (after 12-month holding)'],
            ['Cash value of life insurance', 'Moderate (loan or surrender)']
          ]
        },
        {
          title: 'Investment Assets',
          type: 'table',
          headers: ['Asset', 'Special Considerations'],
          rows: [
            ['Taxable brokerage', 'Fair market value; consider cost basis'],
            ['401(k), 403(b), 457', 'Pre-tax value; taxes due on withdrawal'],
            ['Traditional IRA', 'Pre-tax value; taxes/penalties on early withdrawal'],
            ['Roth IRA', 'After-tax; earnings tax-free if qualified'],
            ['Annuities', 'Surrender charges may apply'],
            ['Rental real estate', 'Equity = FMV - Mortgage'],
            ['Business interests', 'Valuation may be complex'],
            ['Stock options', 'Include only vested; value = spread if in-the-money'],
            ['Cryptocurrency', 'Fair market value; high volatility']
          ]
        },
        {
          title: 'Personal Use Assets',
          type: 'table',
          headers: ['Asset', 'Valuation Notes'],
          rows: [
            ['Primary residence', 'Market value minus mortgage = equity'],
            ['Vehicles', 'Depreciated value (KBB, NADA)'],
            ['Furniture/household', 'Often excluded or minimal value'],
            ['Jewelry/art/collectibles', 'Appraisal value; insurance value may differ']
          ]
        },
        {
          title: '⚠️ Exam Tip: Asset Classification',
          type: 'warning',
          content: 'Investment real estate (rental property) is an investment asset. Personal residence is a personal use asset. The classification affects financial ratio calculations.'
        },
        {
          title: 'Liability Classification',
          type: 'text',
          content: 'Liabilities are classified by **when they\'re due**:\n\n**Current Liabilities**: Due within 12 months\n**Long-Term Liabilities**: Due beyond 12 months'
        },
        {
          title: 'Current Liabilities (Due Within 12 Months)',
          type: 'table',
          headers: ['Liability', 'Considerations'],
          rows: [
            ['Credit card balances', 'Full balance owed'],
            ['Medical bills', 'Outstanding balances'],
            ['Income taxes owed', 'Including estimated tax payments due'],
            ['Student loan payments (current portion)', '12 months of payments'],
            ['Mortgage payments (current portion)', '12 months of principal'],
            ['Personal loan payments (current portion)', '12 months of payments']
          ]
        },
        {
          title: 'Long-Term Liabilities (Due Beyond 12 Months)',
          type: 'table',
          headers: ['Liability', 'Considerations'],
          rows: [
            ['Mortgage balance', 'Remaining principal after current portion'],
            ['HELOC balance', 'Outstanding draw'],
            ['Student loans', 'Total remaining beyond current portion'],
            ['Auto loans', 'Remaining principal'],
            ['401(k) loans', 'Remaining balance'],
            ['Personal loans', 'Remaining balance']
          ]
        },
        {
          title: '📊 Sample Personal Balance Sheet',
          type: 'example',
          content: '**The Johnson Family - December 31, 2025**\n\n**ASSETS**\n\n*Liquid Assets:*\n- Checking Account: $8,500\n- Savings Account: $25,000\n- Money Market: $12,000\n- **Subtotal Liquid: $45,500**\n\n*Investment Assets:*\n- 401(k) - John: $425,000\n- 401(k) - Sarah: $180,000\n- Roth IRA - John: $85,000\n- Taxable Brokerage: $120,000\n- 529 Plan - Child 1: $45,000\n- 529 Plan - Child 2: $28,000\n- **Subtotal Investments: $883,000**\n\n*Personal Use Assets:*\n- Primary Residence: $650,000\n- Vehicles (2): $45,000\n- Personal Property: $30,000\n- **Subtotal Personal: $725,000**\n\n**TOTAL ASSETS: $1,653,500**\n\n**LIABILITIES**\n\n*Current Liabilities:*\n- Credit Card Balance: $4,200\n- Medical Bills: $1,800\n- **Subtotal Current: $6,000**\n\n*Long-Term Liabilities:*\n- Mortgage Balance: $380,000\n- Auto Loan: $18,000\n- Student Loans: $42,000\n- **Subtotal Long-Term: $440,000**\n\n**TOTAL LIABILITIES: $446,000**\n\n**NET WORTH: $1,207,500**'
        },
        {
          title: 'Balance Sheet Ratios',
          type: 'text',
          content: 'Financial ratios help assess financial health relative to benchmarks.'
        },
        {
          title: '1. Current Ratio (Liquidity)',
          type: 'text',
          content: '$$\\text{Current Ratio} = \\frac{\\text{Liquid Assets}}{\\text{Current Liabilities}}$$\n\n**Example**: $45,500 ÷ $6,000 = **7.58**\n\n**Interpretation**:\n- ≥ 1.0: Can cover current obligations\n- 2.0+: Healthy liquidity position\n- 7.58: Excellent; may be holding excess cash'
        },
        {
          title: '2. Debt-to-Asset Ratio (Leverage)',
          type: 'text',
          content: '$$\\text{Debt-to-Asset Ratio} = \\frac{\\text{Total Liabilities}}{\\text{Total Assets}}$$\n\n**Example**: $446,000 ÷ $1,653,500 = **0.27 or 27%**\n\n**Interpretation**:\n- < 0.50 (50%): Generally healthy\n- > 0.50: Higher leverage, potential risk\n- 27%: Conservative debt level'
        },
        {
          title: '3. Solvency Ratio',
          type: 'text',
          content: '$$\\text{Solvency Ratio} = \\frac{\\text{Net Worth}}{\\text{Total Assets}}$$\n\n**Example**: $1,207,500 ÷ $1,653,500 = **0.73 or 73%**\n\n**Interpretation**:\n- Higher is better (more equity, less debt)\n- 73%: Strong solvency position'
        },
        {
          title: '4. Investment Assets Ratio',
          type: 'text',
          content: '$$\\text{Investment Assets Ratio} = \\frac{\\text{Investment Assets}}{\\text{Total Assets}}$$\n\n**Example**: $883,000 ÷ $1,653,500 = **0.53 or 53%**\n\n**Interpretation**:\n- Higher indicates more wealth-building capacity\n- Personal use assets don\'t generate returns\n- 53%: Good allocation toward growth'
        },
        {
          title: 'Fair Market Value Considerations',
          type: 'table',
          headers: ['Asset Type', 'Valuation Approach'],
          rows: [
            ['Primary residence', 'Recent comparable sales, Zillow/Redfin estimate, appraisal'],
            ['Investments', 'Current market value from statements'],
            ['Retirement accounts', 'Current balance (note pre-tax status)'],
            ['Business interests', 'Independent valuation, book value, or formula'],
            ['Collectibles', 'Recent appraisal'],
            ['Vehicles', 'Kelley Blue Book, NADA']
          ]
        },
        {
          title: '⚠️ Pre-Tax Account Warning',
          type: 'warning',
          content: 'Pre-tax accounts (401k, Traditional IRA) show **gross** value. Net value after taxes is less. Some planners apply a tax discount (e.g., 25% haircut) for a conservative view.'
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            '**Net Worth = Assets - Liabilities** (fundamental equation)',
            'Assets classified as **liquid, investment, or personal use**',
            'Liabilities classified as **current** (< 12 months) or **long-term**',
            '**Ratios assess health**: Current ratio, debt-to-asset, solvency, investment assets',
            'Use **fair market value** for all assets; note pre-tax status of retirement accounts'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L007',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    title: 'Personal Financial Statements - Income Statement',
    description: 'Construct a personal income statement and analyze cash flow to determine savings capacity',
    order: 7,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Income Statement', 'Cash Flow', 'Expense Categories', 'Savings Rate', 'Income Sources'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'The personal income statement (also called Statement of Cash Flows or Cash Flow Statement) tracks **income and expenses over a period of time** (monthly or annually) to determine cash flow surplus or deficit. This is essential for understanding whether a client is building wealth or accumulating debt.'
        },
        {
          title: 'The Cash Flow Equation',
          type: 'text',
          content: '$$\\text{Cash Flow} = \\text{Total Income} - \\text{Total Expenses}$$\n\n- **Positive cash flow**: Income exceeds expenses (savings opportunity)\n- **Negative cash flow**: Expenses exceed income (debt accumulation or asset drawdown)'
        },
        {
          title: 'Income Categories',
          type: 'text',
          content: 'Income is categorized by source for proper tax planning and analysis.'
        },
        {
          title: 'Employment Income',
          type: 'table',
          headers: ['Source', 'Tax Treatment'],
          rows: [
            ['Salary/Wages', 'Ordinary income'],
            ['Bonuses', 'Ordinary income'],
            ['Commissions', 'Ordinary income'],
            ['Overtime', 'Ordinary income'],
            ['Tips', 'Ordinary income'],
            ['Stock compensation (when vested/exercised)', 'Varies by type']
          ]
        },
        {
          title: '🧠 Best Practice: Gross vs. Net Income',
          type: 'callout',
          content: 'Use **gross income** before taxes and deductions for income, then show taxes as an expense. This gives a complete picture of where money goes.'
        },
        {
          title: 'Self-Employment Income',
          type: 'table',
          headers: ['Source', 'Considerations'],
          rows: [
            ['Schedule C net income', 'After business expenses'],
            ['K-1 distributions', 'May include ordinary income and capital gains'],
            ['Guaranteed payments', 'Partnerships'],
            ['Rental income', 'Net of property expenses']
          ]
        },
        {
          title: 'Investment Income',
          type: 'table',
          headers: ['Source', 'Tax Treatment'],
          rows: [
            ['Interest', 'Ordinary income (some municipal is tax-exempt)'],
            ['Dividends - Qualified', 'Preferential capital gains rates'],
            ['Dividends - Non-qualified', 'Ordinary income'],
            ['Capital gains', 'Short-term = ordinary; Long-term = preferential'],
            ['Rental net income', 'Ordinary (may have passive loss limits)']
          ]
        },
        {
          title: 'Transfer/Other Income',
          type: 'table',
          headers: ['Source', 'Tax Treatment'],
          rows: [
            ['Social Security', '0-85% taxable depending on income'],
            ['Pension', 'Fully or partially taxable'],
            ['Annuity payments', 'Exclusion ratio applies'],
            ['Alimony received', 'Taxable if divorce before 2019; not taxable if after'],
            ['Child support received', 'Not taxable'],
            ['Gifts/Inheritance received', 'Generally not taxable income']
          ]
        },
        {
          title: 'Expense Categories',
          type: 'text',
          content: 'Expenses are categorized by flexibility and necessity.'
        },
        {
          title: 'Fixed Expenses',
          type: 'list',
          content: [
            { term: 'Definition', definition: 'Costs that remain constant month-to-month regardless of behavior' },
            { term: 'Housing', definition: 'Mortgage/rent, property taxes, HOA' },
            { term: 'Insurance', definition: 'Auto, home, life, health, disability' },
            { term: 'Debt payments', definition: 'Minimum loan payments' },
            { term: 'Childcare', definition: 'Daycare, private school tuition' },
            { term: 'Subscriptions', definition: 'Gym, streaming (if committed)' }
          ]
        },
        {
          title: 'Variable Expenses',
          type: 'list',
          content: [
            { term: 'Definition', definition: 'Costs that fluctuate based on usage or behavior' },
            { term: 'Utilities', definition: 'Electric, gas, water (usage-based)' },
            { term: 'Food', definition: 'Groceries, dining out' },
            { term: 'Transportation', definition: 'Gas, maintenance, public transit' },
            { term: 'Healthcare', definition: 'Copays, prescriptions, dental' },
            { term: 'Clothing', definition: 'Personal, children' }
          ]
        },
        {
          title: 'Discretionary Expenses',
          type: 'list',
          content: [
            { term: 'Definition', definition: 'Wants rather than needs; easiest to cut if necessary' },
            { term: 'Entertainment', definition: 'Movies, concerts, hobbies' },
            { term: 'Travel', definition: 'Vacations, weekend trips' },
            { term: 'Dining out', definition: 'Restaurants, takeout' },
            { term: 'Gifts', definition: 'Holidays, birthdays' },
            { term: 'Personal care', definition: 'Spa, salon, non-essential' }
          ]
        },
        {
          title: 'Key Insight',
          type: 'callout',
          content: 'The line between variable and discretionary is blurry. What matters is identifying expenses that **can be reduced** if savings goals aren\'t being met.'
        },
        {
          title: 'Tax Expenses',
          type: 'text',
          content: 'Include all taxes paid:\n- Federal income tax (withholding + estimated payments)\n- State income tax\n- FICA (Social Security + Medicare)\n- Property taxes (if not in housing)\n- Other (sales tax is usually embedded in expenses)'
        },
        {
          title: '📊 Sample Annual Income Statement',
          type: 'example',
          content: '**The Johnson Family - Year Ended December 31, 2025**\n\n**INCOME**\n| Category | Annual | Monthly |\n|----------|--------|--------|\n| John\'s Salary (Gross) | $165,000 | $13,750 |\n| Sarah\'s Salary (Gross) | $95,000 | $7,917 |\n| Bonus - John | $15,000 | $1,250 |\n| Interest Income | $1,800 | $150 |\n| Dividend Income | $4,200 | $350 |\n| **TOTAL INCOME** | **$281,000** | **$23,417** |\n\n**EXPENSES**\n| Category | Annual | Monthly |\n|----------|--------|--------|\n| **Taxes** | | |\n| Federal Income Tax | $42,000 | $3,500 |\n| State Income Tax | $12,000 | $1,000 |\n| FICA | $16,000 | $1,333 |\n| **Subtotal Taxes** | **$70,000** | **$5,833** |\n| **Fixed Expenses** | | |\n| Mortgage (P&I) | $28,800 | $2,400 |\n| Property Taxes | $8,400 | $700 |\n| Insurance (all) | $13,200 | $1,100 |\n| Childcare | $18,000 | $1,500 |\n| **Subtotal Fixed** | **$68,400** | **$5,700** |\n| **Variable Expenses** | | |\n| Utilities, Food, Transport, Healthcare, Clothing | $28,800 | $2,400 |\n| **Discretionary** | | |\n| Dining, Entertainment, Travel, Gifts, Misc | $30,800 | $2,567 |\n| **TOTAL EXPENSES** | **$198,000** | **$16,500** |\n\n**CASH FLOW SURPLUS: $83,000 ($6,917/month)**'
        },
        {
          title: 'Savings Rate Calculation',
          type: 'text',
          content: 'The **savings rate** measures what percentage of income is being saved.\n\n$$\\text{Savings Rate} = \\frac{\\text{Income} - \\text{Expenses}}{\\text{Gross Income}} = \\frac{\\text{Cash Flow Surplus}}{\\text{Gross Income}}$$\n\n**Example**: $83,000 ÷ $281,000 = **29.5%**'
        },
        {
          title: 'Savings Rate Benchmarks',
          type: 'table',
          headers: ['Savings Rate', 'Assessment'],
          rows: [
            ['< 10%', 'Insufficient for most goals'],
            ['10-15%', 'Minimum for retirement'],
            ['15-20%', 'Good for retirement + other goals'],
            ['20-25%', 'Excellent; aggressive wealth building'],
            ['25%+', 'Outstanding; early retirement possible']
          ]
        },
        {
          title: '🧠 Employer Contributions',
          type: 'callout',
          content: 'Include employer retirement contributions in savings rate calculations (the Johnson example might have additional 401(k) contributions not shown as "expenses").'
        },
        {
          title: 'Identifying Savings Opportunities',
          type: 'text',
          content: 'When cash flow is negative or insufficient:\n\n**Step 1: Analyze Discretionary Spending**\n- Can dining out be reduced?\n- Is the vacation budget flexible?\n- Are subscriptions being used?\n\n**Step 2: Challenge Variable Expenses**\n- Can utility usage be reduced?\n- Is there a cheaper grocery option?\n- Can transportation costs be lowered?\n\n**Step 3: Review Fixed Expenses (Harder but Higher Impact)**\n- Can you refinance the mortgage?\n- Is there a cheaper insurance option?\n- Can you downsize housing?\n\n**Step 4: Increase Income**\n- Negotiate raise or promotion\n- Side income or freelancing\n- Spouse returning to work/increasing hours'
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            '**Cash Flow = Income - Expenses** (indicates saving or spending)',
            'Expenses are **Fixed** (stable), **Variable** (fluctuating), or **Discretionary** (optional)',
            '**Savings rate** = Cash Flow ÷ Gross Income (target 15-20%+)',
            'To increase savings: reduce discretionary → variable → fixed → increase income',
            'Include **taxes as an expense** for complete picture'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L008',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    title: 'Financial Ratios and Benchmarks',
    description: 'Calculate and interpret key personal financial ratios to assess client financial health',
    order: 8,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Financial Ratios', 'Emergency Fund', 'Debt Ratios', 'Savings Ratios', 'Benchmarks'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Financial ratios transform raw numbers into **meaningful insights** about a client\'s financial health. Comparing ratios to **benchmarks** helps identify strengths, weaknesses, and priorities for planning recommendations.'
        },
        {
          title: 'Liquidity Ratios',
          type: 'text',
          content: 'Liquidity ratios measure the ability to meet short-term obligations and weather financial emergencies.'
        },
        {
          title: '1. Emergency Fund Ratio',
          type: 'text',
          content: '$$\\text{Emergency Fund Ratio} = \\frac{\\text{Liquid Assets}}{\\text{Monthly Expenses}}$$\n\n**Interpretation**: How many months of expenses could be covered by liquid reserves?\n\n**Example**: Liquid assets $45,000 ÷ Monthly expenses $7,500 = **6 months** ✓'
        },
        {
          title: 'Emergency Fund Benchmarks',
          type: 'table',
          headers: ['Result', 'Assessment', 'Recommendation'],
          rows: [
            ['< 3 months', 'Inadequate', 'Prioritize building emergency fund'],
            ['3-6 months', 'Standard benchmark', 'Adequate for most situations'],
            ['6-12 months', 'Enhanced', 'Appropriate for variable income, self-employed'],
            ['> 12 months', 'Excess', 'May be too conservative; opportunity cost']
          ]
        },
        {
          title: '2. Current Ratio',
          type: 'text',
          content: '$$\\text{Current Ratio} = \\frac{\\text{Liquid Assets}}{\\text{Current Liabilities}}$$\n\n**Interpretation**: Ability to pay short-term obligations.'
        },
        {
          title: 'Current Ratio Benchmarks',
          type: 'table',
          headers: ['Result', 'Assessment'],
          rows: [
            ['< 1.0', 'Cannot cover current obligations without selling assets'],
            ['1.0-2.0', 'Adequate'],
            ['> 2.0', 'Strong liquidity']
          ]
        },
        {
          title: 'Debt Ratios',
          type: 'text',
          content: 'Debt ratios measure leverage and ability to service debt obligations.'
        },
        {
          title: '3. Housing Expense Ratio (Front-End Ratio)',
          type: 'text',
          content: '$$\\text{Housing Ratio} = \\frac{\\text{Monthly Housing Costs}}{\\text{Gross Monthly Income}}$$\n\n**Housing Costs Include**: Mortgage P&I, property taxes, homeowners insurance, HOA fees (PITI).\n\n**Example**: Housing $3,300 ÷ Gross income $23,417 = **14.1%** ✓ (Well under limit)'
        },
        {
          title: 'Housing Ratio Benchmarks',
          type: 'table',
          headers: ['Result', 'Assessment'],
          rows: [
            ['≤ 28%', 'Conventional mortgage guideline'],
            ['28-33%', 'Acceptable with strong credit/reserves'],
            ['> 33%', 'May be housing-burdened']
          ]
        },
        {
          title: '4. Total Debt Service Ratio (Back-End Ratio)',
          type: 'text',
          content: '$$\\text{Debt Service Ratio} = \\frac{\\text{Total Monthly Debt Payments}}{\\text{Gross Monthly Income}}$$\n\n**Debt Payments Include**: Housing + auto + student loans + credit cards + other loans.\n\n**Example**: Total debt payments $4,500 ÷ Gross income $23,417 = **19.2%** ✓'
        },
        {
          title: 'Debt Service Ratio Benchmarks',
          type: 'table',
          headers: ['Result', 'Assessment'],
          rows: [
            ['≤ 36%', 'Conventional mortgage guideline'],
            ['36-43%', 'May qualify for FHA/VA with compensating factors'],
            ['> 43%', 'Generally too much debt']
          ]
        },
        {
          title: '5. Debt-to-Asset Ratio',
          type: 'text',
          content: '$$\\text{Debt-to-Asset Ratio} = \\frac{\\text{Total Liabilities}}{\\text{Total Assets}}$$'
        },
        {
          title: 'Debt-to-Asset Benchmarks',
          type: 'table',
          headers: ['Result', 'Assessment'],
          rows: [
            ['< 35%', 'Conservative'],
            ['35-50%', 'Moderate leverage'],
            ['> 50%', 'High leverage; potential vulnerability']
          ]
        },
        {
          title: '6. Consumer Debt Ratio',
          type: 'text',
          content: '$$\\text{Consumer Debt Ratio} = \\frac{\\text{Consumer Debt (non-mortgage)}}{\\text{Annual Net Income}}$$\n\n**Consumer Debt Includes**: Credit cards, auto loans, personal loans, student loans.'
        },
        {
          title: 'Consumer Debt Ratio Benchmarks',
          type: 'table',
          headers: ['Result', 'Assessment'],
          rows: [
            ['< 15%', 'Manageable'],
            ['15-20%', 'Approaching concern'],
            ['> 20%', 'May indicate debt problem']
          ]
        },
        {
          title: 'Savings and Investment Ratios',
          type: 'text',
          content: 'These ratios measure wealth-building capacity and progress.'
        },
        {
          title: '7. Savings Ratio',
          type: 'text',
          content: '$$\\text{Savings Ratio} = \\frac{\\text{Annual Savings}}{\\text{Annual Gross Income}}$$'
        },
        {
          title: 'Savings Ratio Benchmarks',
          type: 'table',
          headers: ['Result', 'Assessment'],
          rows: [
            ['< 10%', 'Likely insufficient for retirement'],
            ['10-15%', 'Minimum for retirement only'],
            ['15-20%', 'Good for multiple goals'],
            ['> 20%', 'Excellent; accelerated wealth building']
          ]
        },
        {
          title: '8. Investment Assets to Net Worth Ratio',
          type: 'text',
          content: '$$\\text{Investment Assets Ratio} = \\frac{\\text{Investment Assets}}{\\text{Net Worth}}$$\n\n**Why It Matters**: Investment assets grow and fund retirement; personal use assets typically don\'t.'
        },
        {
          title: 'Investment Assets Ratio Benchmarks',
          type: 'table',
          headers: ['Result', 'Assessment'],
          rows: [
            ['< 40%', 'Heavy in personal use assets (home, vehicles)'],
            ['40-60%', 'Balanced'],
            ['> 60%', 'Strong investment orientation']
          ]
        },
        {
          title: '🧠 Net Worth Benchmarks by Age',
          type: 'callout',
          content: 'The "Millionaire Next Door" formula provides a rough guideline:\n\n$$\\text{Target Net Worth} = \\frac{\\text{Age × Pre-tax Income}}{10}$$\n\n**Examples**:\n- Age 30, $80k income → $240,000\n- Age 40, $120k income → $480,000\n- Age 50, $150k income → $750,000\n- Age 60, $180k income → $1,080,000\n\n**Caveat**: This is a rough guideline. Actual needs depend on goals, lifestyle, pension income, etc.'
        },
        {
          title: '📊 Ratio Summary Dashboard Example',
          type: 'example',
          content: '**Healthy Client Profile**\n\n| Ratio | Target | Client | Status |\n|-------|--------|--------|--------|\n| Emergency Fund | 3-6 months | 6.0 mo | ✅ |\n| Current Ratio | > 1.0 | 7.6 | ✅ |\n| Housing Ratio | ≤ 28% | 14% | ✅ |\n| Debt Service Ratio | ≤ 36% | 19% | ✅ |\n| Debt-to-Assets | < 50% | 27% | ✅ |\n| Savings Rate | ≥ 15% | 30% | ✅ |\n| Investment Assets | ≥ 40% | 53% | ✅ |'
        },
        {
          title: '⚠️ Red Flags Requiring Attention',
          type: 'warning',
          content: '**Critical thresholds to watch:**\n\n- Emergency fund < 3 months → Job loss = crisis\n- Housing ratio > 35% → House-poor; limited flexibility\n- Debt service > 43% → Vulnerability to income disruption\n- Consumer debt ratio > 20% → Possible debt spiral\n- Savings rate < 5% → Not building wealth\n- Negative net worth → Insolvency risk'
        },
        {
          title: '📊 Using Ratios for Prioritization',
          type: 'example',
          content: '**Prioritization Example**\n\nA client has:\n- Emergency fund: 1.5 months 🔴\n- Housing ratio: 32% 🟡\n- Savings rate: 8% 🟡\n- Consumer debt ratio: 25% 🔴\n\n**Recommended Priority**:\n1. Build emergency fund to 3 months (immediate priority)\n2. Attack consumer debt aggressively (debt paydown)\n3. Increase savings rate once debts under control\n4. Housing ratio is high but manageable; long-term consideration'
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            '**Emergency fund ratio** of 3-6 months is the baseline for financial security',
            '**Housing ≤ 28%** and **total debt ≤ 36%** are standard lending guidelines',
            '**Savings rate of 15%+** is needed for most retirement goals',
            '**Investment assets should dominate** net worth for wealth-building',
            'Use ratios to **prioritize recommendations** - fix red flags first'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L009',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    title: 'Cash Flow Management and Budgeting',
    description: 'Implement effective budgeting strategies and cash flow management techniques for clients',
    order: 9,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Budgeting', 'Pay Yourself First', 'Emergency Fund', 'Expense Tracking', 'Irregular Income'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Converting financial analysis into **action** requires effective cash flow management strategies. This lesson covers practical techniques to help clients optimize their savings and spending.'
        },
        {
          title: 'Budgeting Philosophies',
          type: 'text',
          content: 'There are several approaches to budgeting, each with advantages for different client situations.'
        },
        {
          title: '1. Traditional Budgeting (Line-Item)',
          type: 'text',
          content: '**Approach**: Assign specific dollar amounts to each expense category.\n\n**Pros**:\n- Detailed control\n- Know exactly where money goes\n- Good for problem identification\n\n**Cons**:\n- Time-consuming\n- Requires ongoing tracking\n- Can feel restrictive\n\n**Best For**: Clients who want maximum control, those with spending issues.'
        },
        {
          title: '2. Pay Yourself First (Reverse Budgeting)',
          type: 'text',
          content: '**Approach**: Automate savings FIRST, then spend what remains freely.\n\n$$\\text{Income} - \\text{Savings} = \\text{Available for Spending}$$\n\n**Pros**:\n- Ensures savings goals are met\n- Less daily tracking needed\n- Psychologically easier\n\n**Cons**:\n- Less awareness of spending\n- May overspend remaining\n- Requires discipline on remainder\n\n**Best For**: Disciplined clients who reliably hit savings targets; busy professionals.'
        },
        {
          title: '3. The 50/30/20 Rule',
          type: 'table',
          headers: ['Category', 'Percentage', 'Description'],
          rows: [
            ['Needs', '50%', 'Housing, food, utilities, transportation, insurance'],
            ['Wants', '30%', 'Entertainment, dining out, hobbies, non-essentials'],
            ['Savings', '20%', 'Retirement, debt paydown, emergency fund']
          ]
        },
        {
          title: '📊 50/30/20 Example',
          type: 'example',
          content: '**After-tax income $8,000/month**:\n- Needs: $4,000 (50%)\n- Wants: $2,400 (30%)\n- Savings: $1,600 (20%)\n\n**Best For**: Simple framework for clients who need a starting point.'
        },
        {
          title: 'Implementing Pay Yourself First',
          type: 'text',
          content: '**Step 1: Calculate Required Savings**\nBased on goals, determine monthly savings needed:\n- Retirement: $1,500/month\n- Emergency fund: $500/month (temporary)\n- 529 plans: $600/month\n- **Total: $2,600/month**\n\n**Step 2: Automate Transfers**\nSet up automatic transfers on payday:\n- 401(k) contributions via payroll deduction\n- IRA contributions monthly (2nd day after payday)\n- 529 contributions monthly (2nd day after payday)\n- Emergency fund to savings account\n\n**Step 3: Spend the Rest Guilt-Free**\nWhat remains after savings = spending allowance. No need to track every purchase if savings targets are met.'
        },
        {
          title: '🧠 Key to Success',
          type: 'callout',
          content: 'Money moved before you see it is money you won\'t spend. Automate savings on payday to ensure goals are met before spending begins.'
        },
        {
          title: 'Expense Tracking Methods',
          type: 'text',
          content: '**Manual Tracking**\n- Spreadsheet updated weekly\n- Paper notebook\n- Envelope system (cash-based)\n\n**Digital Tools**\n- Mint, YNAB, Quicken, Personal Capital\n- Bank/credit card categorization\n- Automatic import and categorization\n\n**Recommended Approach**: Track for 60-90 days to establish baseline, then reduce to quarterly reviews if using "Pay Yourself First."'
        },
        {
          title: 'Strategies for Irregular Income',
          type: 'text',
          content: 'Self-employed, commissioned, and seasonal workers face unique cash flow challenges.'
        },
        {
          title: 'Strategy 1: Baseline Budget',
          type: 'text',
          content: '1. Calculate **minimum monthly income** you can reliably expect\n2. Budget all NEEDS on this minimum\n3. Save all excess from good months\n4. Draw from savings during lean months'
        },
        {
          title: 'Strategy 2: Income Smoothing',
          type: 'text',
          content: '1. All income goes into a separate "income holding" account\n2. Transfer fixed amount to checking monthly (your "salary")\n3. Build buffer in holding account for lean months'
        },
        {
          title: 'Strategy 3: Quarterly Savings Targets',
          type: 'text',
          content: 'Instead of monthly savings goals:\n- Set quarterly savings minimums\n- Catch up in strong months if weak months occur\n- Annual reconciliation of savings progress'
        },
        {
          title: 'Building and Maintaining an Emergency Fund',
          type: 'text',
          content: '**Target Size by Situation**:'
        },
        {
          title: 'Emergency Fund Targets',
          type: 'table',
          headers: ['Situation', 'Target'],
          rows: [
            ['Dual-income, stable jobs', '3 months expenses'],
            ['Single income', '6 months expenses'],
            ['Self-employed/irregular income', '6-12 months expenses'],
            ['High-risk industry', '6-12 months expenses']
          ]
        },
        {
          title: 'Where to Hold Emergency Fund',
          type: 'table',
          headers: ['Option', 'Pros', 'Cons'],
          rows: [
            ['High-yield savings account', 'Liquid, FDIC insured, earns interest', 'Lower yield than investments'],
            ['Money market account', 'Liquid, may have check-writing', 'Slightly lower liquidity'],
            ['Short-term bond fund', 'Higher yield potential', 'Not FDIC insured, minor volatility'],
            ['Roth IRA contributions', 'Contributions accessible penalty-free', 'Reduces retirement savings']
          ]
        },
        {
          title: '🧠 Best Option',
          type: 'callout',
          content: 'For most clients, a **high-yield savings account** is the ideal balance of accessibility and returns for emergency funds.'
        },
        {
          title: '⚠️ Emergency Fund Rules',
          type: 'warning',
          content: '1. **Use ONLY for true emergencies** (job loss, medical crisis, major repair)\n2. **Replenish immediately** after any use\n3. **Don\'t invest aggressively** – stability matters more than growth\n4. **Keep separate** from regular checking (out of sight, out of mind)'
        },
        {
          title: 'Common Cash Flow Problems and Solutions',
          type: 'table',
          headers: ['Problem', 'Solution'],
          rows: [
            ['"Money disappears"', 'Track expenses for 90 days; identify leaks'],
            ['Spending before saving', 'Automate savings on payday'],
            ['Lifestyle creep', 'Automatically increase savings with raises'],
            ['Irregular income stress', 'Build income buffer; baseline budget'],
            ['Credit card dependency', 'Build emergency fund; cut up cards'],
            ['Couple disagreements', 'Agree on joint budget; each gets "allowance"']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            '**Pay Yourself First**: Automate savings on payday before spending',
            '**50/30/20 Rule**: Needs (50%) / Wants (30%) / Savings (20%)',
            'Track expenses for 60-90 days to establish baseline',
            '**Emergency fund**: 3-6 months expenses in liquid, stable account',
            '**Irregular income**: Use income smoothing or baseline budget approach'
          ]
        }
      ]
    }
  }
];

export default CFP_GEN2_LESSONS;
