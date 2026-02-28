/**
 * CFP Domain 2: General Principles of Financial Planning
 * Area GEN-5: Economic Concepts and Debt Management
 * 
 * These lessons cover economic fundamentals, consumer debt strategies,
 * emergency funds, and financial calculator mastery.
 */

import type { Lesson } from '../../../types';

export const CFP_GEN5_LESSONS: Lesson[] = [
  {
    id: 'CFP-GEN-L020',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'Economic Concepts for Financial Planners',
    description: 'Explain the business cycle and its phases, monetary and fiscal policy, and key economic indicators',
    order: 20,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Business Cycle', 'Monetary Policy', 'Fiscal Policy', 'Economic Indicators', 'Inflation', 'Yield Curve'],
    blueprintArea: 'GEN-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Understanding economic fundamentals helps planners anticipate market conditions and advise clients appropriately. Economic concepts inform asset allocation decisions, interest rate expectations, and inflation protection strategies."
        },
        {
          title: 'The Business Cycle',
          type: 'text',
          content: "The economy moves through predictable phases. Understanding where we are in the cycle helps inform investment and planning decisions."
        },
        {
          title: 'Four Phases of the Business Cycle',
          type: 'table',
          headers: ['Phase', 'Characteristics', 'Investment Implications'],
          rows: [
            ['**Expansion**', 'Rising GDP, employment, consumer spending', 'Stocks tend to perform well'],
            ['**Peak**', 'Maximum economic output, potential overheating', 'Consider reducing risk'],
            ['**Contraction (Recession)**', 'Declining GDP, rising unemployment', 'Defensive positioning'],
            ['**Trough**', 'Economic bottom, signs of recovery', 'Opportunity to increase equity exposure']
          ]
        },
        {
          title: 'Key Business Cycle Definitions',
          type: 'list',
          content: [
            { term: 'Recession', definition: 'Two consecutive quarters of negative GDP growth (informal definition)' },
            { term: 'Depression', definition: 'Severe, prolonged recession (>10% GDP decline or >3 years)' },
            { term: 'Recovery', definition: 'Period from trough to previous peak' }
          ]
        },
        {
          title: '🧠 Memory Aid: Business Cycle Phases',
          type: 'callout',
          content: "**E**very **P**olice **C**aptain **T**akes Patrol → **E**xpansion, **P**eak, **C**ontraction, **T**rough"
        },
        {
          title: 'Monetary Policy - The Federal Reserve',
          type: 'text',
          content: "The **Federal Reserve (Fed)** controls money supply and interest rates. Understanding Fed actions is critical for anticipating interest rate changes and market reactions."
        },
        {
          title: "Fed's Dual Mandate",
          type: 'text',
          content: "The Fed has two primary objectives:\n\n1. **Maximum employment** (full employment)\n2. **Price stability** (low, stable inflation - target 2%)"
        },
        {
          title: 'Federal Reserve Policy Tools',
          type: 'table',
          headers: ['Tool', 'How It Works', 'Effect'],
          rows: [
            ['**Federal Funds Rate**', 'Rate banks charge each other overnight', 'Primary tool; affects all rates'],
            ['**Open Market Operations**', 'Buy/sell Treasury securities', 'Increases/decreases money supply'],
            ['**Reserve Requirements**', 'Required reserves banks must hold', 'Affects lending capacity'],
            ['**Discount Rate**', 'Rate Fed charges banks for loans', 'Emergency lending facility'],
            ['**Quantitative Easing (QE)**', 'Large-scale asset purchases', 'Expands money supply dramatically']
          ]
        },
        {
          title: 'Policy Stances',
          type: 'table',
          headers: ['Stance', 'Goal', 'Actions'],
          rows: [
            ['**Expansionary** (Dovish)', 'Stimulate economy', 'Lower rates, buy securities'],
            ['**Contractionary** (Hawkish)', 'Fight inflation', 'Raise rates, sell securities']
          ]
        },
        {
          title: 'Fiscal Policy - Congress & President',
          type: 'text',
          content: "**Fiscal policy** involves government spending and taxation, controlled by elected officials rather than the Fed."
        },
        {
          title: 'Fiscal Policy Types',
          type: 'list',
          content: [
            { term: 'Expansionary Fiscal Policy', definition: 'Increase government spending, reduce taxes. Goal: Stimulate economic growth' },
            { term: 'Contractionary Fiscal Policy', definition: 'Decrease government spending, increase taxes. Goal: Cool overheating economy, reduce deficits' },
            { term: 'Deficit', definition: 'Annual shortfall (spending > revenue)' },
            { term: 'Debt', definition: 'Accumulated deficits over time' }
          ]
        },
        {
          title: 'Key Economic Indicators',
          type: 'text',
          content: "Economic indicators fall into three categories based on their timing relative to economic activity."
        },
        {
          title: 'Leading Indicators (Predict Future)',
          type: 'table',
          headers: ['Indicator', 'What It Signals'],
          rows: [
            ['Stock prices (S&P 500)', 'Market expectations'],
            ['Building permits', 'Future construction'],
            ['Consumer expectations', 'Future spending'],
            ['Average weekly hours worked', 'Labor demand'],
            ['Yield curve', 'Interest rate expectations']
          ]
        },
        {
          title: 'Coincident Indicators (Current State)',
          type: 'table',
          headers: ['Indicator', 'What It Shows'],
          rows: [
            ['GDP', 'Current economic output'],
            ['Employment', 'Current labor market'],
            ['Personal income', 'Current purchasing power'],
            ['Industrial production', 'Current manufacturing']
          ]
        },
        {
          title: 'Lagging Indicators (Confirm Trends)',
          type: 'table',
          headers: ['Indicator', 'What It Confirms'],
          rows: [
            ['Unemployment rate', 'Employment trends'],
            ['CPI (inflation)', 'Price trends'],
            ['Prime rate', 'Interest rate trends'],
            ['Consumer credit', 'Spending patterns']
          ]
        },
        {
          title: 'Inflation and Interest Rates',
          type: 'text',
          content: "Inflation erodes purchasing power over time. Understanding inflation types and measures is essential for planning real (after-inflation) returns."
        },
        {
          title: 'Types of Inflation',
          type: 'table',
          headers: ['Type', 'Cause'],
          rows: [
            ['**Demand-pull**', 'Too much money chasing too few goods'],
            ['**Cost-push**', 'Increased production costs passed to consumers'],
            ['**Wage-push**', 'Rising wages increase costs and prices']
          ]
        },
        {
          title: 'Inflation Measures',
          type: 'table',
          headers: ['Measure', 'Description'],
          rows: [
            ['**CPI**', 'Consumer Price Index - urban consumer basket'],
            ['**Core CPI**', 'Excludes food and energy (volatile)'],
            ['**PPI**', 'Producer Price Index - wholesale prices'],
            ['**PCE**', "Personal Consumption Expenditures (Fed's preferred)"]
          ]
        },
        {
          title: 'The Yield Curve',
          type: 'text',
          content: "The yield curve shows the relationship between interest rates and bond maturities. Its shape has significant predictive value."
        },
        {
          title: 'Yield Curve Shapes',
          type: 'table',
          headers: ['Shape', 'Meaning'],
          rows: [
            ['**Normal (Upward)**', 'Long rates > short rates; healthy economy expected'],
            ['**Inverted**', 'Short rates > long rates; recession predictor'],
            ['**Flat**', 'Equal rates; economic uncertainty']
          ]
        },
        {
          title: '⚠️ Exam Alert: Inverted Yield Curve',
          type: 'warning',
          content: "An **inverted yield curve** is a historically reliable recession predictor. Know this for the exam: when short-term rates exceed long-term rates, it often signals economic contraction ahead."
        },
        {
          title: 'Economic Concepts Applied to Planning',
          type: 'text',
          content: "Understanding economic phases helps planners make asset allocation recommendations and set client expectations."
        },
        {
          title: 'Asset Allocation by Economic Phase',
          type: 'table',
          headers: ['Economic Phase', 'Stocks', 'Bonds', 'Cash'],
          rows: [
            ['Early Expansion', 'Overweight', 'Underweight', 'Neutral'],
            ['Late Expansion', 'Neutral', 'Neutral', 'Increase'],
            ['Recession', 'Underweight', 'Overweight', 'Increase'],
            ['Recovery', 'Overweight', 'Underweight', 'Decrease']
          ]
        },
        {
          title: 'Interest Rate Impact',
          type: 'table',
          headers: ['If Rates Rise...', 'Impact'],
          rows: [
            ['Bond prices', 'Fall'],
            ['Mortgage costs', 'Increase'],
            ['Savings rates', 'Increase'],
            ['Stock valuations', 'Generally decline']
          ]
        },
        {
          title: 'Inflation Planning Strategies',
          type: 'table',
          headers: ['Inflation Environment', 'Consider'],
          rows: [
            ['High/Rising', 'TIPS, commodities, real estate, I-Bonds'],
            ['Low/Stable', 'Longer-duration bonds, growth stocks']
          ]
        },
        {
          title: '📊 Real Return Formulas',
          type: 'example',
          content: "**Approximate Method:**\n$$\\text{Real Return} = \\text{Nominal Return} - \\text{Inflation}$$\n\n**Exact Method:**\n$$\\text{Real Return} = \\frac{1 + \\text{Nominal}}{1 + \\text{Inflation}} - 1$$"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Business cycle: Expansion → Peak → Contraction → Trough → repeat',
            'Fed controls monetary policy through interest rates and money supply',
            'Leading indicators predict; coincident measure; lagging confirm',
            'Inverted yield curve historically predicts recessions',
            'Rising rates: Bad for bonds, mixed for stocks, good for savers',
            'Inflation erodes purchasing power - plan with real returns'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L021',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'Consumer Debt Management Strategies',
    description: 'Distinguish between debt payoff strategies and apply credit score factors to financial planning',
    order: 21,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Debt Management', 'Credit Scores', 'Balance Transfers', 'Debt Consolidation', 'FICO Score'],
    blueprintArea: 'GEN-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Effective debt management is fundamental to financial health and a common focus of financial planning engagements. Helping clients understand and prioritize debt repayment can dramatically improve their financial outcomes."
        },
        {
          title: 'Types of Consumer Debt',
          type: 'text',
          content: "Consumer debt falls into two major categories based on whether collateral is required."
        },
        {
          title: 'Secured Debt',
          type: 'text',
          content: "Secured debt is backed by collateral that can be repossessed if payments aren't made."
        },
        {
          title: 'Common Secured Debt Types',
          type: 'table',
          headers: ['Type', 'Typical Rate', 'Collateral'],
          rows: [
            ['Mortgage', '6-8%', 'Home'],
            ['Auto loan', '5-10%', 'Vehicle'],
            ['Home equity loan/HELOC', '7-10%', 'Home equity']
          ]
        },
        {
          title: 'Unsecured Debt',
          type: 'text',
          content: "Unsecured debt is not backed by collateral, resulting in higher rates due to increased lender risk."
        },
        {
          title: 'Common Unsecured Debt Types',
          type: 'table',
          headers: ['Type', 'Typical Rate'],
          rows: [
            ['Credit cards', '15-25%'],
            ['Personal loans', '8-15%'],
            ['Student loans (federal)', '5-8%'],
            ['Student loans (private)', '6-12%'],
            ['Medical debt', '0-10%']
          ]
        },
        {
          title: 'Debt Payoff Strategies',
          type: 'text',
          content: "Two primary strategies exist for prioritizing debt payoff. Both work - the right choice depends on client psychology."
        },
        {
          title: '1. Debt Avalanche (Highest Interest First)',
          type: 'text',
          content: "**Method**: Pay minimums on all debts, put extra money toward **highest rate** debt first."
        },
        {
          title: 'Debt Avalanche Pros and Cons',
          type: 'table',
          headers: ['Pros', 'Cons'],
          rows: [
            ['Mathematically optimal', 'Slow early wins'],
            ['Saves most interest', 'May feel discouraging'],
            ['Fastest to debt-free', '-']
          ]
        },
        {
          title: '2. Debt Snowball (Smallest Balance First)',
          type: 'text',
          content: "**Method**: Pay minimums on all debts, put extra money toward **smallest balance** debt first."
        },
        {
          title: 'Debt Snowball Pros and Cons',
          type: 'table',
          headers: ['Pros', 'Cons'],
          rows: [
            ['Quick psychological wins', 'Not mathematically optimal'],
            ['Builds momentum', 'May pay more total interest'],
            ['Reduces number of payments faster', '-']
          ]
        },
        {
          title: '📊 Strategy Comparison Example',
          type: 'example',
          content: "**Client has:**\n- Card A: $5,000 at 22%\n- Card B: $2,000 at 15%\n- Card C: $8,000 at 18%\n\n**Extra payment:** $300/month above minimums\n\n| Strategy | Order | Total Interest |\n|----------|-------|----------------|\n| **Avalanche** | A → C → B | Lowest |\n| **Snowball** | B → A → C | Higher, but faster wins |\n\n**Planner's Role:** Both work. Choose based on client personality. Some need quick wins (snowball); others optimize math (avalanche)."
        },
        {
          title: 'The Cost of Minimum Payments',
          type: 'text',
          content: "Minimum payments can dramatically extend payoff time and multiply total interest paid."
        },
        {
          title: '📊 Credit Card Minimum Payment Example',
          type: 'example',
          content: "**Balance:** $10,000\n**Rate:** 20% APR\n**Minimum payment:** 2% of balance (at least $25)\n\n| Payment Strategy | Time to Payoff | Total Interest |\n|------------------|---------------|----------------|\n| Minimum only | 30+ years | $19,000+ |\n| $300/month fixed | 44 months | $3,137 |\n| $500/month fixed | 24 months | $1,759 |"
        },
        {
          title: '⚠️ Minimum Payment Warning',
          type: 'warning',
          content: "Minimum payments can result in paying **twice the original balance** in interest! Always show clients the true cost of minimum-only payments."
        },
        {
          title: 'Balance Transfer Strategies',
          type: 'text',
          content: "Balance transfers move high-rate debt to a new card with 0% intro APR (typically 12-21 months)."
        },
        {
          title: 'Balance Transfer Considerations',
          type: 'table',
          headers: ['Factor', 'Detail'],
          rows: [
            ['Transfer fee', 'Usually 3-5% of transferred amount'],
            ['Intro period', '0% for 12-21 months'],
            ['Regular APR', 'Kicks in after intro (often 18-25%)'],
            ['Credit impact', 'New account may temporarily lower score']
          ]
        },
        {
          title: '📊 Balance Transfer Break-Even Analysis',
          type: 'example',
          content: "**Transfer $10,000 at 20% APR → 0% card with 3% fee**\n\n**Monthly interest saved:** $10,000 × 20%/12 = $167/month\n**Transfer fee:** $10,000 × 3% = $300\n\n**Break-even:** $300 / $167 = **1.8 months**\n\nIf paying off within intro period, transfer saves money."
        },
        {
          title: 'Debt Consolidation Options',
          type: 'text',
          content: "Consolidation combines multiple debts into a single payment, potentially at a lower rate."
        },
        {
          title: 'Personal Loan Consolidation',
          type: 'table',
          headers: ['Pros', 'Cons'],
          rows: [
            ['Fixed rate and payment', 'May extend payment term'],
            ['Single monthly payment', "Won't help if behavior unchanged"],
            ['Often lower rate than cards', 'Fees may apply']
          ]
        },
        {
          title: 'Home Equity Options',
          type: 'table',
          headers: ['Type', 'Rate', 'Risk'],
          rows: [
            ['**Home Equity Loan**', 'Lower fixed rate', 'Home is collateral'],
            ['**HELOC**', 'Lower variable rate', 'Home is collateral'],
            ['**Cash-out Refinance**', 'Mortgage rate', 'Increases mortgage']
          ]
        },
        {
          title: '⚠️ Home Equity Warning',
          type: 'warning',
          content: "Converting unsecured debt to secured debt (using home equity) risks losing the home if payments aren't made. Use this strategy cautiously."
        },
        {
          title: 'Credit Scores and Financial Planning',
          type: 'text',
          content: "FICO scores range from 300-850 and affect loan rates, insurance premiums, and rental applications."
        },
        {
          title: 'FICO Score Factors',
          type: 'table',
          headers: ['Factor', 'Weight', 'Optimization'],
          rows: [
            ['**Payment history**', '35%', 'Pay on time, always'],
            ['**Credit utilization**', '30%', 'Keep below 30%, ideally <10%'],
            ['**Length of credit history**', '15%', 'Keep old accounts open'],
            ['**Credit mix**', '10%', 'Have various account types'],
            ['**New credit**', '10%', 'Limit new applications']
          ]
        },
        {
          title: '🧠 Memory Aid: FICO Factors',
          type: 'callout',
          content: "**35-30-15-10-10**: Payment history is most important (35%), followed by utilization (30%). Together they're 65% of your score!"
        },
        {
          title: 'Credit Score Ranges',
          type: 'table',
          headers: ['Range', 'Rating'],
          rows: [
            ['800-850', 'Exceptional'],
            ['740-799', 'Very Good'],
            ['670-739', 'Good'],
            ['580-669', 'Fair'],
            ['300-579', 'Poor']
          ]
        },
        {
          title: 'Good Debt vs. Bad Debt',
          type: 'text',
          content: "While the \"good debt vs. bad debt\" framework is useful, remember that any debt becomes \"bad\" if it's unaffordable or prevents achieving financial goals."
        },
        {
          title: 'Generally \"Good\" Debt',
          type: 'list',
          content: [
            { term: 'Mortgage', definition: 'Builds equity, often appreciates' },
            { term: 'Student loans', definition: 'Investment in earning potential' },
            { term: 'Business loans', definition: 'For income-producing assets' }
          ]
        },
        {
          title: 'Generally \"Bad\" Debt',
          type: 'list',
          content: [
            { term: 'Credit cards', definition: 'High rates, depreciating purchases' },
            { term: 'Payday loans', definition: 'Extremely high rates' },
            { term: 'Auto loans on depreciating vehicles', definition: 'Lose value immediately' }
          ]
        },
        {
          title: '📊 Key Formulas',
          type: 'example',
          content: "**Monthly Interest:**\n$$\\text{Monthly Interest} = \\text{Balance} \\times \\frac{\\text{APR}}{12}$$\n\n**Transfer Break-Even:**\n$$\\text{Break-even Months} = \\frac{\\text{Transfer Fee}}{\\text{Monthly Interest Saved}}$$"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Debt avalanche (highest rate) saves most money; snowball (smallest balance) provides quick wins',
            'Minimum payments can result in paying 2× the original balance in interest',
            'Balance transfers work if debt is paid off during 0% intro period',
            'Credit utilization (30% of FICO) should stay below 30%',
            'Payment history (35% of FICO) is the single biggest score factor'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L022',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'Emergency Funds and Liquidity Planning',
    description: 'Calculate appropriate emergency fund amounts and recommend liquidity strategies for different client situations',
    order: 22,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Emergency Funds', 'Liquidity Planning', 'Savings Vehicles', 'Cash Reserves'],
    blueprintArea: 'GEN-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "An adequate emergency fund is the **foundation** of financial security. Without it, any financial plan is vulnerable to unexpected expenses derailing long-term goals."
        },
        {
          title: 'Purpose of Emergency Funds',
          type: 'text',
          content: "Emergency funds cover unexpected expenses and income disruption without:\n\n- Liquidating investments (potentially at a loss)\n- Taking on high-interest debt\n- Derailing long-term financial plans"
        },
        {
          title: 'Common Emergency Uses',
          type: 'text',
          content: "- Job loss / income reduction\n- Medical expenses\n- Major home repairs\n- Car repairs / replacement\n- Unplanned travel (family emergency)"
        },
        {
          title: 'How Much Is Enough?',
          type: 'text',
          content: "The appropriate emergency fund size depends on income stability and personal circumstances."
        },
        {
          title: 'Emergency Fund Guidelines by Situation',
          type: 'table',
          headers: ['Situation', 'Recommended Reserve'],
          rows: [
            ['Dual-income, stable jobs', '**3 months** of expenses'],
            ['Single income or variable income', '**6 months** of expenses'],
            ['Self-employed or unstable field', '**9-12 months** of expenses'],
            ['Near retirement or health issues', '**12+ months** of expenses']
          ]
        },
        {
          title: '📊 Calculating the Target',
          type: 'example',
          content: "**Formula:** Monthly Essential Expenses × Months Needed\n\n**Essential Expenses Include:**\n- Housing (mortgage/rent, utilities, insurance)\n- Food\n- Transportation\n- Healthcare premiums/costs\n- Minimum debt payments\n- Insurance premiums\n\n**Do NOT Include:**\n- Discretionary spending\n- Investment contributions\n- Gifts/entertainment\n- Non-critical subscriptions"
        },
        {
          title: '📊 Example Calculation',
          type: 'example',
          content: "**Client monthly essentials:**\n- Housing: $2,500\n- Food: $600\n- Transportation: $400\n- Healthcare: $300\n- Insurance: $200\n- Minimum debts: $500\n- **Total:** $4,500/month\n\n**Single income earner → 6 months:** $4,500 × 6 = **$27,000 target**"
        },
        {
          title: 'Where to Keep Emergency Funds',
          type: 'text',
          content: "The ideal vehicle balances safety, liquidity, and yield."
        },
        {
          title: 'Primary: High-Yield Savings Account (HYSA)',
          type: 'table',
          headers: ['Feature', 'Benefit'],
          rows: [
            ['FDIC insured', 'Protected up to $250,000'],
            ['Immediate access', '1-2 day transfers'],
            ['Competitive yield', 'Currently 4-5% APY'],
            ['No market risk', 'Principal protected']
          ]
        },
        {
          title: 'Secondary Options',
          type: 'table',
          headers: ['Vehicle', 'Pros', 'Cons'],
          rows: [
            ['**Money Market Account**', 'Slightly higher yields, check-writing', 'May have minimum balance'],
            ['**I-Bonds**', 'Inflation-protected, tax-deferred', '1-year lock-up, $10K annual limit'],
            ['**Roth IRA Contributions**', 'Dual purpose (retirement if unused)', 'Contributions only (not earnings)'],
            ['**HELOC**', 'Access to large amounts', 'Must qualify, uses home as collateral']
          ]
        },
        {
          title: '⚠️ What to Avoid for Emergency Funds',
          type: 'warning',
          content: "**Never use these for emergency funds:**\n- Stocks/mutual funds (market risk)\n- CDs with penalties (liquidity issue)\n- Physical cash (no growth, theft risk)\n- Investments with long settlement"
        },
        {
          title: 'Tiered Emergency Fund Strategy',
          type: 'text',
          content: "For larger emergency funds, consider a tiered approach to optimize both liquidity and yield."
        },
        {
          title: 'Three-Tier Structure',
          type: 'list',
          content: [
            { term: 'Tier 1: Immediate Access (1-2 months)', definition: 'High-yield savings account, checking account buffer' },
            { term: 'Tier 2: Near-Term Access (2-4 months)', definition: 'Money market funds, I-Bonds (after 1-year holding period)' },
            { term: 'Tier 3: Extended Reserve (4+ months)', definition: 'Short-term Treasury funds, Roth IRA contributions (as last resort)' }
          ]
        },
        {
          title: 'Special Situations',
          type: 'text',
          content: "Different client situations require different emergency fund approaches."
        },
        {
          title: 'Dual-Income Couples',
          type: 'text',
          content: "May need less if:\n- Both jobs are stable\n- Either income covers essential expenses\n- Good disability insurance\n\nConsider reducing to 3-4 months if other safety nets exist."
        },
        {
          title: 'High-Net-Worth Clients',
          type: 'text',
          content: "May satisfy emergency reserve through:\n- Taxable brokerage (margin availability)\n- Cash value life insurance loans\n- HELOC established but unused"
        },
        {
          title: 'Retirees',
          type: 'text',
          content: "Need larger cash reserves because:\n- No earned income to rebuild\n- Sequence of returns risk\n- Healthcare costs unpredictable\n\n**Recommendation:** 1-2 years in cash/short-term bonds."
        },
        {
          title: 'Building the Fund',
          type: 'text',
          content: "Multiple strategies can help clients build their emergency fund more quickly."
        },
        {
          title: 'Funding Strategies',
          type: 'table',
          headers: ['Strategy', 'How It Works'],
          rows: [
            ['**Automate transfers**', 'Set up recurring transfers to savings'],
            ['**Tax refunds**', 'Direct lump sums to emergency fund'],
            ['**Windfalls**', 'Bonuses, gifts, inheritances'],
            ['**Expense reduction**', 'Cut discretionary spending temporarily'],
            ['**Side income**', 'Dedicate extra earnings to fund']
          ]
        },
        {
          title: 'Priority Order',
          type: 'text',
          content: "1. **One month's expenses first** (minimum safety net)\n2. **Then full target** (3-6+ months)\n3. **Only then** focus on other goals"
        },
        {
          title: '⚠️ 401(k) Match Exception',
          type: 'warning',
          content: "Always capture employer 401(k) match even while building emergency fund. Free money shouldn't be left on the table."
        },
        {
          title: 'Balancing Competing Priorities',
          type: 'text',
          content: "**Common Question:** \"Should I pay debt or build emergency fund?\"\n\n**Answer:** Do both strategically."
        },
        {
          title: 'Debt vs. Emergency Fund Priority Order',
          type: 'text',
          content: "1. Build **$1,000-$2,000** immediate cushion first\n2. Pay any extremely high-interest debt (>20%)\n3. Continue building toward **1 month's expenses**\n4. Resume debt payoff (avalanche method)\n5. Complete **full emergency target** (3-6 months)"
        },
        {
          title: '📊 Key Formula',
          type: 'example',
          content: "$$\\text{Emergency Fund Target} = \\text{Monthly Essential Expenses} \\times \\text{Months Needed}$$\n\n- **Single income/variable:** 6+ months\n- **Dual stable income:** 3 months minimum"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Emergency fund = 3-6 months of essential expenses (more for volatility)',
            'High-yield savings accounts: Best balance of safety, liquidity, and yield',
            'Calculate on essentials only: housing, food, transport, healthcare, debt minimums',
            'Build $1,000 minimum cushion first, then complete full target',
            'Tiered approach: Immediate access (1-2 mo) + near-term (2-4 mo) + extended'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-GEN-L023',
    courseId: 'cfp',
    section: 'CFP-GEN',
    title: 'Financial Calculator Mastery',
    description: 'Set up and use HP 10bII+ and TI BA II Plus calculators to solve complex TVM problems',
    order: 23,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Financial Calculator', 'TVM', 'NPV', 'IRR', 'HP 10bII+', 'TI BA II Plus'],
    blueprintArea: 'GEN-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Calculator proficiency is **critical** for CFP exam success. Mastering these tools ensures you solve problems quickly and accurately. You'll face dozens of TVM problems on exam day."
        },
        {
          title: 'Approved CFP Exam Calculators',
          type: 'text',
          content: "The CFP Board allows ONLY:\n- **HP 10bII+** (blue)\n- **TI BA II Plus** (or Professional)\n\nYou may bring **two calculators** to the exam (recommended: same type, fresh batteries)."
        },
        {
          title: 'Initial Setup - HP 10bII+',
          type: 'text',
          content: "Setting up your calculator correctly before each problem set is essential."
        },
        {
          title: 'HP 10bII+ Essential Settings',
          type: 'list',
          content: [
            { term: 'Clear All Memory', definition: 'Press: [Orange] [C ALL]' },
            { term: 'Set Payments Per Year (P/YR)', definition: 'For annual problems: 1 [Orange] [P/YR]. For monthly: 12 [Orange] [P/YR]' },
            { term: 'Set END/BEGIN Mode', definition: 'Default is END (ordinary annuity). To switch: [Orange] [BEG/END]. \"BEG\" appears when in BEGIN mode' },
            { term: 'Display Precision', definition: 'For 4 decimal places: [Orange] [DISP] 4' }
          ]
        },
        {
          title: 'Initial Setup - TI BA II Plus',
          type: 'text',
          content: "The TI requires a few more steps to configure properly."
        },
        {
          title: 'TI BA II Plus Essential Settings',
          type: 'list',
          content: [
            { term: 'Clear TVM Memory', definition: 'Press: [2nd] [CLR TVM]' },
            { term: 'Set Payments Per Year (P/Y)', definition: 'Press: [2nd] [P/Y], Enter: 1 (annual) or 12 (monthly), Press: [ENTER], then [CE/C] to exit' },
            { term: 'Set END/BEGIN Mode', definition: 'Press: [2nd] [BGN]. If it shows \"BGN\", press [2nd] [SET] to toggle to END. Press [CE/C] to exit' },
            { term: 'Display Precision', definition: '[2nd] [FORMAT] → enter desired decimals → [ENTER]' }
          ]
        },
        {
          title: '⚠️ The Sign Convention (Critical!)',
          type: 'warning',
          content: "This is the #1 source of calculator errors!\n\n| Cash Direction | Sign |\n|----------------|------|\n| **Cash going OUT** (you pay) | **NEGATIVE (-)** |\n| **Cash coming IN** (you receive) | **POSITIVE (+)** |"
        },
        {
          title: 'Sign Convention by Scenario',
          type: 'table',
          headers: ['Situation', 'PV', 'PMT', 'FV'],
          rows: [
            ['Saving for future', 'Negative (outflow)', 'Negative (outflow)', 'Positive (result)'],
            ['Loan (borrower view)', 'Positive (receive)', 'Negative (pay)', '0'],
            ['Annuity purchase', 'Negative (pay)', 'Positive (receive)', '0']
          ]
        },
        {
          title: '🧠 Memory Aid: Sign Convention',
          type: 'callout',
          content: "**OUT is Negative, IN is Positive** — If money leaves your pocket, it's negative."
        },
        {
          title: 'Basic TVM Problem Types',
          type: 'text',
          content: "Master these five fundamental TVM problem types."
        },
        {
          title: '📊 Type 1: Future Value of a Lump Sum',
          type: 'example',
          content: "**Problem:** $10,000 invested at 6% for 15 years?\n\n| Key | Input |\n|-----|-------|\n| N | 15 |\n| I/Y | 6 |\n| PV | -10,000 |\n| PMT | 0 |\n| **Solve FV** | **23,965.58** |"
        },
        {
          title: '📊 Type 2: Present Value of an Annuity',
          type: 'example',
          content: "**Problem:** What should you pay today for $1,000/month for 10 years at 5%?\n\n| Key | Input |\n|-----|-------|\n| N | 120 (10 × 12) |\n| I/Y | 0.4167 (5 ÷ 12) |\n| PMT | 1,000 |\n| FV | 0 |\n| **Solve PV** | **-94,281.12** |"
        },
        {
          title: '📊 Type 3: Payment Calculation',
          type: 'example',
          content: "**Problem:** $300,000 mortgage at 6.5% for 30 years. Monthly payment?\n\n| Key | Input |\n|-----|-------|\n| N | 360 |\n| I/Y | 0.5417 (6.5 ÷ 12) |\n| PV | 300,000 |\n| FV | 0 |\n| **Solve PMT** | **-1,896.20** |"
        },
        {
          title: '📊 Type 4: Solving for Interest Rate',
          type: 'example',
          content: "**Problem:** Invest $50,000, receive $100,000 in 12 years. What rate?\n\n| Key | Input |\n|-----|-------|\n| N | 12 |\n| PV | -50,000 |\n| PMT | 0 |\n| FV | 100,000 |\n| **Solve I/Y** | **5.95%** |"
        },
        {
          title: '📊 Type 5: Solving for Time',
          type: 'example',
          content: "**Problem:** $500/month at 8% to reach $200,000. How many months?\n\n| Key | Input |\n|-----|-------|\n| I/Y | 0.6667 (8 ÷ 12) |\n| PV | 0 |\n| PMT | -500 |\n| FV | 200,000 |\n| **Solve N** | **199.27 months** |"
        },
        {
          title: 'Uneven Cash Flows (NPV/IRR)',
          type: 'text',
          content: "Many real-world investments have uneven cash flows. Both calculators have dedicated functions for NPV and IRR."
        },
        {
          title: 'HP 10bII+ Cash Flow Entry',
          type: 'text',
          content: "1. **Clear:** [Orange] [C ALL]\n2. **Enter CF0:** amount [CFj]\n3. **Enter CF1:** amount [CFj]\n4. Repeat for each cash flow\n5. **For NPV:** rate [I/YR], then [Orange] [NPV]\n6. **For IRR:** [Orange] [IRR/YR]"
        },
        {
          title: 'TI BA II Plus Cash Flow Entry',
          type: 'text',
          content: "1. **Enter CF Mode:** [CF]\n2. **Clear:** [2nd] [CLR Work]\n3. **CF0:** enter value, [ENTER], [↓]\n4. **C01:** enter value, [ENTER], [↓]\n5. **F01** (frequency): usually 1, [ENTER], [↓]\n6. Continue for all cash flows\n7. **For NPV:** [NPV], enter I, [ENTER], [↓], [CPT]\n8. **For IRR:** [IRR], [CPT]"
        },
        {
          title: '📊 NPV Calculation Example',
          type: 'example',
          content: "**Investment:** -$100,000 today\n**Cash flows:** Year 1 = $30,000, Year 2 = $40,000, Year 3 = $50,000\n**Required return:** 10%\n\n| Entry | Value |\n|-------|-------|\n| CF0 | -100,000 |\n| CF1 | 30,000 |\n| CF2 | 40,000 |\n| CF3 | 50,000 |\n| I | 10% |\n| **NPV** | **-$2,103.68** |\n\nNegative NPV → Reject the investment"
        },
        {
          title: 'Common Exam Pitfalls',
          type: 'text',
          content: "Avoid these frequent calculator mistakes on exam day."
        },
        {
          title: '⚠️ Pitfall 1: Wrong P/Y Setting',
          type: 'warning',
          content: "**Problem:** You set P/Y = 12 for a monthly problem, then forget to change it back.\n\n**Fix:** Always check P/Y before each new problem or set to 1 and adjust I/Y manually."
        },
        {
          title: '⚠️ Pitfall 2: Wrong Mode (END vs. BEGIN)',
          type: 'warning',
          content: "**Problem:** Calculating lease in END mode instead of BEGIN.\n\n**Fix:** Read the problem carefully for \"beginning\" or \"end\" of period."
        },
        {
          title: '⚠️ Pitfall 3: Forgetting the Sign Convention',
          type: 'warning',
          content: "**Problem:** All positive numbers give nonsensical answers.\n\n**Fix:** Cash out = negative; Cash in = positive."
        },
        {
          title: '⚠️ Pitfall 4: Not Clearing Previous Values',
          type: 'warning',
          content: "**Problem:** Old PMT value carries into new problem.\n\n**Fix:** Clear TVM memory between problems."
        },
        {
          title: '⚠️ Pitfall 5: Annual vs. Monthly Confusion',
          type: 'warning',
          content: "**Problem:** Using annual rate with monthly periods.\n\n**Fix:** Always match:\n- Monthly payments → Monthly rate (annual ÷ 12)\n- Annual payments → Annual rate"
        },
        {
          title: 'Serial (Two-Stage) Problem Approach',
          type: 'text',
          content: "Many CFP exam problems involve two stages (e.g., accumulation then distribution). Work backwards from the goal."
        },
        {
          title: '📊 Serial Problem Example: Retirement Funding',
          type: 'example',
          content: "**Stage 1** (Accumulation): Save $X/year at 8% for 25 years.\n**Stage 2** (Distribution): Need $50,000/year for 20 years at 5%.\n\n**Solve Backwards:**\n\n**Step 1:** How much needed at retirement?\n- N = 20, I/Y = 5, PMT = 50,000, FV = 0\n- **PV = $623,110.52**\n\n**Step 2:** How much to save annually?\n- N = 25, I/Y = 8, PV = 0, FV = 623,110.52\n- **PMT = $8,527.35**"
        },
        {
          title: '🧠 Memory Aid: TVM Variables',
          type: 'callout',
          content: "**N**ever **I**nvest **P**oor **M**oney **F**ast → **N**, **I**/Y, **P**V, P**M**T, **F**V"
        },
        {
          title: '📊 Key Formulas',
          type: 'example',
          content: "**5 TVM Variables:** N, I/Y, PV, PMT, FV\n\n**Monthly rate:** $\\text{Monthly Rate} = \\frac{\\text{Annual Rate}}{12}$\n\n**Monthly periods:** $\\text{Monthly Periods} = \\text{Years} \\times 12$"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'CFP exam allows HP 10bII+ and TI BA II Plus only',
            'Clear TVM memory between problems; check P/Y and BEGIN/END mode',
            'Sign convention: OUTFLOWS = negative, INFLOWS = positive',
            'Match time periods: monthly payments require monthly rate (annual ÷ 12)',
            'Serial problems: Work backwards from future need to today\'s requirement',
            'Know your calculator cold - practice until it\'s automatic'
          ]
        }
      ]
    }
  }
];

export default CFP_GEN5_LESSONS;
