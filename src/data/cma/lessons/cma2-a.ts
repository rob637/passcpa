/**
 * CMA Part 2, Section A: Financial Statement Analysis
 * Weight: 20% of Part 2 Exam
 * 
 * Topics covered:
 * - Basic financial statement analysis
 * - Financial ratios
 * - Profitability analysis
 * - Special issues
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 */

import { Lesson } from '../../../types';

export const cma2ALessons: Lesson[] = [
  // ============================================================================
  // CMA2-A: FINANCIAL STATEMENT ANALYSIS (Lessons 1-10)
  // ============================================================================
  
  {
    id: 'CMA2-A-001',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Financial Statement Analysis Framework',
    description: 'Understand the objectives and tools of financial statement analysis',
    order: 1,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Analysis objectives', 'Horizontal analysis', 'Vertical analysis', 'Common-size statements'],
    blueprintArea: 'CMA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Financial statement analysis converts raw numbers into insights. CMAs use these techniques to assess company performance, evaluate creditworthiness, compare competitors, and identify trends. This is foundational for all strategic financial decisions.",
        },
        {
          title: 'Objectives of Financial Analysis',
          type: 'text',
          content: "**Who analyzes and why:**\n\n**Investors:** Assess value, growth potential, risk\n**Creditors:** Evaluate ability to repay, collateral\n**Management:** Monitor performance, plan improvements\n**Suppliers:** Assess creditworthiness\n**Employees:** Evaluate job security, negotiate compensation\n**Regulators:** Ensure compliance, protect stakeholders\n\n**The same statements serve different purposes!**",
        },
        {
          title: 'Horizontal Analysis',
          type: 'text',
          content: "**Definition:**\nComparing financial data across time periods.\n\n**Trend analysis:**\n• Dollar change = Current Year - Base Year\n• Percent change = (Current - Base) / Base × 100\n\n**Example:**\nRevenue 2025: $1,200,000\nRevenue 2024: $1,000,000\n\nDollar change: $200,000\nPercent change: ($200,000 / $1,000,000) × 100 = **20% growth**\n\n**Use for:** Identifying trends, growth patterns, anomalies",
        },
        {
          title: 'Vertical Analysis',
          type: 'text',
          content: "**Definition:**\nExpressing each line item as a percentage of a base amount within the same period.\n\n**Income Statement:** Base = Revenue (100%)\n• Gross profit as % of revenue\n• Operating expenses as % of revenue\n• Net income as % of revenue\n\n**Balance Sheet:** Base = Total Assets (100%)\n• Each asset as % of total assets\n• Each liability/equity as % of total assets\n\n**Use for:** Understanding structure, comparisons across company sizes",
        },
        {
          title: '🧠 Memory Aid: H vs. V Analysis',
          type: 'callout',
          content: "**\"H = Horizon (time), V = View (structure)\"**\n\n**H**orizontal = Across time (Year 1 → Year 2 → Year 3)\n**V**ertical = Within one period (line items as % of base)\n\n**Common-size statements use vertical analysis - makes comparison easy regardless of company size!**",
        },
        {
          title: 'Common-Size Financial Statements',
          type: 'table',
          headers: ['Item', 'Company A ($M)', 'Company A %', 'Company B ($M)', 'Company B %'],
          rows: [
            ['Revenue', '$500', '100%', '$2,000', '100%'],
            ['COGS', '$300', '60%', '$1,400', '70%'],
            ['Gross Profit', '$200', '40%', '$600', '30%'],
            ['Operating Exp', '$100', '20%', '$300', '15%'],
            ['Net Income', '$60', '12%', '$180', '9%'],
          ],
        },
        {
          title: 'Analysis Interpretation',
          type: 'text',
          content: "**From the table above:**\n\nCompany A (smaller) vs. Company B (4× larger):\n• A has higher gross margin (40% vs. 30%)\n• A has lower operating efficiency (20% vs. 15%)\n• A has higher net profit margin (12% vs. 9%)\n\n**Insight:** Company A is more profitable per dollar of sales despite being smaller. Its premium pricing or cost structure outweighs the efficiency gains of Company B's scale.\n\n**Common-size allows apple-to-apples comparison!**",
        },
        {
          title: 'Limitations of Financial Analysis',
          type: 'text',
          content: "**Key cautions:**\n\n• **Historical data:** Past performance ≠ future results\n• **Accounting methods:** Different policies distort comparisons\n• **Window dressing:** Companies may manage period-end numbers\n• **Industry differences:** Cross-industry comparison limited\n• **Non-financial factors:** Don't capture culture, innovation, risk\n• **Single point in time:** Balance sheet is a snapshot\n\n**Analysis provides insights, not answers!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Horizontal analysis compares across time periods",
            "Vertical analysis expresses items as % of base in same period",
            "Common-size statements enable comparison regardless of size",
            "Income statement base = Revenue; Balance sheet base = Total Assets",
            "Different users analyze for different purposes",
            "Analysis has limitations - accounting methods, historical bias",
            "Combine multiple techniques for comprehensive understanding",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-A-002',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Liquidity Ratios',
    description: 'Measure short-term solvency and ability to meet current obligations',
    order: 2,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Current ratio', 'Quick ratio', 'Cash ratio', 'Working capital'],
    blueprintArea: 'CMA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Can the company pay its bills? Liquidity ratios answer this critical question. CMAs monitor these ratios to prevent cash crises, negotiate with creditors, and ensure operations continue smoothly. Running out of cash kills otherwise healthy companies!",
        },
        {
          title: 'Current Ratio',
          type: 'text',
          content: "**Formula:**\nCurrent Ratio = Current Assets / Current Liabilities\n\n**Interpretation:**\n• Measures ability to pay short-term obligations\n• Higher = more liquidity cushion\n• Generally, > 1.0 means more assets than liabilities\n\n**Example:**\nCurrent Assets: $500,000\nCurrent Liabilities: $250,000\nCurrent Ratio: $500,000 / $250,000 = **2.0**\n\n**For every $1 of current debt, there's $2 of current assets.**",
        },
        {
          title: 'Quick Ratio (Acid Test)',
          type: 'text',
          content: "**Formula:**\nQuick Ratio = (Cash + Marketable Securities + Receivables) / Current Liabilities\n\n**OR:** (Current Assets - Inventory - Prepaids) / Current Liabilities\n\n**Why exclude inventory?**\n• Inventory may be slow to convert to cash\n• May need to sell at discount\n• More conservative measure\n\n**Example:**\nCash: $100,000, AR: $150,000, Inventory: $200,000, CL: $250,000\nQuick Ratio: ($100,000 + $150,000) / $250,000 = **1.0**",
        },
        {
          title: 'Cash Ratio',
          type: 'text',
          content: "**Formula:**\nCash Ratio = (Cash + Marketable Securities) / Current Liabilities\n\n**Most conservative liquidity measure:**\n• Only includes most liquid assets\n• Excludes receivables (collection risk)\n• Worst-case scenario measure\n\n**Example:**\nCash: $100,000, CL: $250,000\nCash Ratio: $100,000 / $250,000 = **0.4**\n\n**Industry norms vary widely!**",
        },
        {
          title: '🧠 Memory Aid: Liquidity Ratios',
          type: 'callout',
          content: "**\"CQC\" - From broad to narrow:**\n\n**C**urrent = ALL current assets (broadest)\n**Q**uick = Current minus inventory/prepaids (tighter)\n**C**ash = Only cash and marketable securities (tightest)\n\n**As you go down, you get more conservative!**",
        },
        {
          title: 'Working Capital',
          type: 'text',
          content: "**Formula:**\nWorking Capital = Current Assets - Current Liabilities\n\n**This is a dollar amount, not a ratio!**\n\n**What it means:**\n• Positive WC: Assets exceed liabilities (cushion)\n• Negative WC: Liabilities exceed assets (risk)\n• The \"buffer\" for operations\n\n**Example:**\nCurrent Assets: $500,000\nCurrent Liabilities: $250,000\nWorking Capital: **$250,000**",
        },
        {
          title: 'Interpreting Liquidity',
          type: 'table',
          headers: ['Ratio', 'Low Value Indicates', 'High Value Indicates'],
          rows: [
            ['Current', 'May struggle to pay bills', 'Excess assets (inefficient?)'],
            ['Quick', 'Dependent on inventory sales', 'Strong cash position'],
            ['Cash', 'Limited immediate liquidity', 'Strong crisis buffer'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Industry Differences',
          type: 'warning',
          content: "**\"Good\" ratios vary by industry!**\n\n**High inventory businesses (retail):**\n• Lower quick ratio is normal\n• Focus on inventory turnover\n\n**Service businesses:**\n• Little inventory\n• Quick ratio ≈ Current ratio\n\n**Subscription businesses:**\n• Deferred revenue inflates current liabilities\n• May have low current ratio but strong cash flows\n\n**Always compare to industry peers!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Current Ratio = Current Assets / Current Liabilities (broadest)",
            "Quick Ratio excludes inventory (more conservative)",
            "Cash Ratio includes only cash/securities (most conservative)",
            "Working Capital is a dollar amount, not a ratio",
            "Higher liquidity = more cushion but potentially inefficient",
            "Industry norms vary significantly",
            "Low liquidity can kill profitable companies",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-A-003',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Activity Ratios',
    description: 'Measure operational efficiency and asset utilization',
    order: 3,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Inventory turnover', 'Receivables turnover', 'Payables turnover', 'Asset turnover'],
    blueprintArea: 'CMA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "How efficiently does the company use its assets? Activity ratios answer this. CMAs use these to identify slow-moving inventory, collection problems, and underutilized assets. Improvement here directly boosts ROI and cash flow!",
        },
        {
          title: 'Inventory Turnover',
          type: 'text',
          content: "**Formula:**\nInventory Turnover = Cost of Goods Sold / Average Inventory\n\n**Days in Inventory:**\n365 / Inventory Turnover\n\n**Example:**\nCOGS: $600,000\nAverage Inventory: $100,000\nTurnover: $600,000 / $100,000 = **6.0 times**\nDays: 365 / 6 = **61 days**\n\n**Interpretation:** Inventory sells and is replaced 6 times per year (every 61 days).",
        },
        {
          title: 'Receivables Turnover',
          type: 'text',
          content: "**Formula:**\nReceivables Turnover = Net Credit Sales / Average Accounts Receivable\n\n**Days Sales Outstanding (DSO):**\n365 / Receivables Turnover\n\n**Example:**\nCredit Sales: $1,000,000\nAverage AR: $125,000\nTurnover: $1,000,000 / $125,000 = **8.0 times**\nDSO: 365 / 8 = **46 days**\n\n**Interpretation:** Customers pay every 46 days on average.",
        },
        {
          title: 'Payables Turnover',
          type: 'text',
          content: "**Formula:**\nPayables Turnover = Purchases (or COGS) / Average Accounts Payable\n\n**Days Payable Outstanding (DPO):**\n365 / Payables Turnover\n\n**Example:**\nPurchases: $500,000\nAverage AP: $50,000\nTurnover: $500,000 / $50,000 = **10.0 times**\nDPO: 365 / 10 = **37 days**\n\n**Interpretation:** Company pays suppliers every 37 days on average.",
        },
        {
          title: '🧠 Memory Aid: Cash Conversion Cycle',
          type: 'callout',
          content: "**CCC = DIO + DSO - DPO**\n\n**D**ays **I**nventory **O**utstanding (how long to sell)\n+ **D**ays **S**ales **O**utstanding (how long to collect)\n- **D**ays **P**ayable **O**utstanding (how long to pay suppliers)\n= **C**ash **C**onversion **C**ycle\n\n**Lower CCC = Better!** (Cash tied up for fewer days)\n\n**Example:** 61 + 46 - 37 = 70 days CCC",
        },
        {
          title: 'Asset Turnover Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'Measures'],
          rows: [
            ['Total Asset Turnover', 'Sales / Average Total Assets', 'Overall asset efficiency'],
            ['Fixed Asset Turnover', 'Sales / Average Fixed Assets', 'PP&E utilization'],
            ['Working Capital Turnover', 'Sales / Average Working Capital', 'Operating efficiency'],
          ],
        },
        {
          title: 'Total Asset Turnover Example',
          type: 'text',
          content: "**Formula:**\nTotal Asset Turnover = Sales / Average Total Assets\n\n**Example:**\nSales: $2,000,000\nAverage Total Assets: $1,000,000\nTurnover: $2,000,000 / $1,000,000 = **2.0 times**\n\n**Interpretation:** Each dollar of assets generates $2 of sales.\n\n**This is the \"Asset Turnover\" in DuPont analysis!**\nROI = Profit Margin × Asset Turnover",
        },
        {
          title: '⚠️ Exam Trap: Average vs. Ending',
          type: 'warning',
          content: "**Use AVERAGE for balance sheet items in activity ratios!**\n\n**Why?**\n• Income statement covers a period\n• Balance sheet is a point in time\n• Average better matches flow to stock\n\n**Average = (Beginning + Ending) / 2**\n\n**If problem only gives ending balance:**\n• Use that (state your assumption)\n• Some exam questions give only ending",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Activity ratios measure how efficiently assets are used",
            "Inventory Turnover = COGS / Avg Inventory",
            "Receivables Turnover = Credit Sales / Avg AR",
            "Payables Turnover = Purchases / Avg AP",
            "CCC = DIO + DSO - DPO (lower is better)",
            "Asset Turnover = Sales / Avg Assets (DuPont component)",
            "Use AVERAGE balance sheet values",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-A-004',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Leverage Ratios',
    description: 'Analyze capital structure and long-term solvency',
    order: 4,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Debt ratio', 'Debt-to-equity', 'Interest coverage', 'Leverage'],
    blueprintArea: 'CMA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "How much debt is too much? Leverage ratios answer this critical capital structure question. CMAs use these to assess financial risk, evaluate financing options, and ensure debt covenants are met. Excessive leverage has destroyed many companies!",
        },
        {
          title: 'Debt Ratio',
          type: 'text',
          content: "**Formula:**\nDebt Ratio = Total Liabilities / Total Assets\n\n**Interpretation:**\n• What portion of assets is financed by debt?\n• Higher ratio = more financial leverage/risk\n• 50% means half of assets funded by debt\n\n**Example:**\nTotal Liabilities: $400,000\nTotal Assets: $1,000,000\nDebt Ratio: $400,000 / $1,000,000 = **40%**\n\n**60% is financed by equity**",
        },
        {
          title: 'Debt-to-Equity Ratio',
          type: 'text',
          content: "**Formula:**\nDebt-to-Equity = Total Liabilities / Total Equity\n\n**Alternative (long-term only):**\nLong-term Debt / Total Equity\n\n**Example:**\nTotal Liabilities: $400,000\nTotal Equity: $600,000\nD/E Ratio: $400,000 / $600,000 = **0.67** (or 67%)\n\n**Interpretation:** For every $1 of equity, there's $0.67 of debt.\n\n**D/E > 1.0 means more debt than equity!**",
        },
        {
          title: '🧠 Memory Aid: Debt vs. D/E',
          type: 'callout',
          content: "**Same numerator, different denominator!**\n\n**Debt Ratio:** Liabilities / **Assets** (% of assets financed by debt)\n**D/E Ratio:** Liabilities / **Equity** (debt relative to equity)\n\n**Converting between them:**\nIf Debt Ratio = 40%, then D/E = 40/60 = 0.67\nIf D/E = 1.0, then Debt Ratio = 50%\n\n**(Assets = Liabilities + Equity, so they're mathematically related)**",
        },
        {
          title: 'Interest Coverage Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'Interpretation'],
          rows: [
            ['Times Interest Earned', 'EBIT / Interest Expense', 'How many times can we pay interest?'],
            ['Cash Coverage', '(EBIT + Depreciation) / Interest', 'Cash available for interest'],
            ['Fixed Charge Coverage', '(EBIT + Lease) / (Interest + Lease)', 'Including lease obligations'],
          ],
        },
        {
          title: 'Times Interest Earned Example',
          type: 'text',
          content: "**Formula:**\nTIE = EBIT / Interest Expense\n\n**Example:**\nEBIT: $500,000\nInterest Expense: $100,000\nTIE: $500,000 / $100,000 = **5.0 times**\n\n**Interpretation:** Earnings cover interest 5 times over.\n\n**Rule of thumb:**\n• TIE < 1.5: Danger zone\n• TIE 2-3: Adequate\n• TIE > 5: Strong coverage\n\n**Debt covenants often require minimum TIE!**",
        },
        {
          title: 'Equity Multiplier',
          type: 'text',
          content: "**Formula:**\nEquity Multiplier = Total Assets / Total Equity\n\n**Example:**\nTotal Assets: $1,000,000\nTotal Equity: $600,000\nEquity Multiplier: $1,000,000 / $600,000 = **1.67**\n\n**Interpretation:**\n• For every $1 of equity, assets are $1.67\n• The difference is debt financing\n• Higher multiplier = more leverage\n\n**Used in DuPont extended formula:**\nROE = Profit Margin × Asset Turnover × Equity Multiplier",
        },
        {
          title: '⚠️ Exam Trap: Operating vs. Finance Leases',
          type: 'warning',
          content: "**Under ASC 842, most leases are on balance sheet!**\n\n**This affects leverage ratios:**\n• Lease liabilities increase total liabilities\n• Right-of-use assets increase total assets\n• Debt ratios may increase\n\n**Compare carefully when:**\n• Analyzing pre- vs. post-ASC 842 data\n• Comparing companies that adopted differently\n• Evaluating debt covenants",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Debt Ratio = Total Liabilities / Total Assets",
            "D/E Ratio = Total Liabilities / Total Equity (D/E > 1.0 = more debt than equity)",
            "TIE = EBIT / Interest (how many times earnings cover interest)",
            "Equity Multiplier = Assets / Equity (DuPont component)",
            "Higher leverage = higher risk but potentially higher ROE",
            "Debt covenants often impose leverage limits",
            "Lease accounting (ASC 842) affects leverage ratios",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-A-005',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Profitability Ratios',
    description: 'Measure ability to generate profits from operations and investments',
    order: 5,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Profit margins', 'ROA', 'ROE', 'DuPont analysis'],
    blueprintArea: 'CMA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Are we making money? Profitability ratios are the ultimate test of business success. CMAs track these to evaluate strategy effectiveness, compare to competitors, and identify improvement areas. Investors and lenders focus heavily on these metrics.",
        },
        {
          title: 'Profit Margin Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'Measures'],
          rows: [
            ['Gross Margin', '(Revenue - COGS) / Revenue', 'Production/sourcing efficiency'],
            ['Operating Margin', 'Operating Income / Revenue', 'Operating efficiency'],
            ['Net Profit Margin', 'Net Income / Revenue', 'Overall profitability'],
            ['EBITDA Margin', 'EBITDA / Revenue', 'Cash-oriented profitability'],
          ],
        },
        {
          title: 'Margin Analysis Example',
          type: 'text',
          content: "**Income Statement:**\nRevenue: $1,000,000\nCOGS: $600,000 → Gross Profit: $400,000\nOperating Expenses: $250,000 → Operating Income: $150,000\nInterest: $20,000, Taxes: $32,500 → Net Income: $97,500\n\n**Margins:**\n• Gross Margin: $400,000 / $1,000,000 = **40%**\n• Operating Margin: $150,000 / $1,000,000 = **15%**\n• Net Profit Margin: $97,500 / $1,000,000 = **9.75%**\n\n**Trend these over time and benchmark against competitors!**",
        },
        {
          title: 'Return on Assets (ROA)',
          type: 'text',
          content: "**Formula:**\nROA = Net Income / Average Total Assets\n\n**Alternative (operating):**\nROA = EBIT(1-t) / Average Total Assets\n\n**Example:**\nNet Income: $97,500\nAverage Total Assets: $750,000\nROA: $97,500 / $750,000 = **13%**\n\n**Interpretation:** Each dollar of assets generates $0.13 of profit.\n\n**DuPont breakdown:**\nROA = Net Profit Margin × Asset Turnover\n13% = 9.75% × 1.33",
        },
        {
          title: 'Return on Equity (ROE)',
          type: 'text',
          content: "**Formula:**\nROE = Net Income / Average Shareholders' Equity\n\n**Example:**\nNet Income: $97,500\nAverage Equity: $450,000\nROE: $97,500 / $450,000 = **21.7%**\n\n**Interpretation:** Each dollar of equity generates $0.217 of profit.\n\n**Why ROE > ROA?**\nFinancial leverage! Borrowing allows more assets per dollar of equity.",
        },
        {
          title: '🧠 Memory Aid: DuPont Analysis',
          type: 'callout',
          content: "**3-Part DuPont for ROE:**\n\nROE = Profit Margin × Asset Turnover × Equity Multiplier\n\n**\"How profitable?\" × \"How efficient?\" × \"How leveraged?\"**\n\n**Example:**\nROE = 9.75% × 1.33 × 1.67 = 21.7% ✓\n\nThis shows THREE ways to improve ROE:\n1. Better margins (operations)\n2. Better turnover (efficiency)\n3. More leverage (risk!)",
        },
        {
          title: 'Return on Invested Capital (ROIC)',
          type: 'text',
          content: "**Formula:**\nROIC = NOPAT / Invested Capital\n\n**Where:**\n• NOPAT = EBIT × (1 - Tax Rate)\n• Invested Capital = Equity + Debt - Cash\n\n**Why ROIC?**\n• Measures operating performance\n• Excludes financing effects (interest)\n• Comparable across capital structures\n\n**Compare ROIC to WACC:**\n• ROIC > WACC → Creating value\n• ROIC < WACC → Destroying value",
        },
        {
          title: '⚠️ Exam Trap: Which Numerator?',
          type: 'warning',
          content: "**Match numerator to denominator!**\n\n**Net Income** → Use with Equity (ROE)\n(Net income is after interest = belongs to shareholders)\n\n**EBIT or NOPAT** → Use with Total Assets or Invested Capital\n(Pre-interest = belongs to all capital providers)\n\n**Mixing these creates apples-to-oranges comparisons!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Gross Margin measures production efficiency",
            "Operating Margin measures operational efficiency",
            "Net Profit Margin is bottom-line profitability",
            "ROA = Net Income / Avg Assets (or NOPAT / Assets)",
            "ROE = Net Income / Avg Equity",
            "DuPont: ROE = Margin × Turnover × Leverage",
            "ROIC compared to WACC indicates value creation",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-A-006',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Market Value Ratios',
    description: 'Analyze stock performance and market valuation metrics',
    order: 6,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['EPS', 'P/E ratio', 'Book value', 'Dividend ratios'],
    blueprintArea: 'CMA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "How does the market value the company? Market ratios connect financial performance to stock price. CMAs use these to evaluate compensation plans (stock options), communicate with investors, and assess relative valuation for M&A analysis.",
        },
        {
          title: 'Earnings Per Share (EPS)',
          type: 'text',
          content: "**Basic EPS:**\n(Net Income - Preferred Dividends) / Weighted Average Common Shares\n\n**Example:**\nNet Income: $1,000,000\nPreferred Dividends: $50,000\nWeighted Avg Shares: 200,000\nBasic EPS: ($1,000,000 - $50,000) / 200,000 = **$4.75**\n\n**Diluted EPS:**\nAccounts for potential shares (options, convertibles)\nAlways ≤ Basic EPS (dilution reduces EPS)",
        },
        {
          title: 'Price-to-Earnings (P/E) Ratio',
          type: 'text',
          content: "**Formula:**\nP/E = Stock Price / EPS\n\n**Example:**\nStock Price: $57.00\nEPS: $4.75\nP/E: $57.00 / $4.75 = **12.0x**\n\n**Interpretation:**\n• Investors pay $12 for each $1 of earnings\n• Higher P/E = higher growth expectations\n• Compare to industry average and historical\n\n**Trailing P/E:** Using last 12 months EPS\n**Forward P/E:** Using next 12 months estimated EPS",
        },
        {
          title: 'Book Value Per Share',
          type: 'text',
          content: "**Formula:**\nBook Value Per Share = (Total Equity - Preferred Equity) / Common Shares Outstanding\n\n**Example:**\nCommon Equity: $2,000,000\nShares Outstanding: 200,000\nBVPS: $2,000,000 / 200,000 = **$10.00**\n\n**Price-to-Book (P/B):**\nStock Price / BVPS = $57 / $10 = **5.7x**\n\n**P/B > 1:** Market values company above book value (intangibles, growth)\n**P/B < 1:** May indicate undervaluation or problems",
        },
        {
          title: '🧠 Memory Aid: P/E Interpretation',
          type: 'callout',
          content: "**\"GRRR\" - Higher P/E means:**\n\n**G**rowth expected to be higher\n**R**isk perceived to be lower\n**R**equired return is lower\n**R**eturn on equity is higher\n\n**But watch out:** Could also mean stock is overvalued!\n\n**Always ask: \"Is the P/E justified by fundamentals?\"**",
        },
        {
          title: 'Dividend Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'Interpretation'],
          rows: [
            ['Dividend Payout', 'Dividends / Net Income', 'What % of earnings paid as dividends'],
            ['Dividend Yield', 'Dividend Per Share / Stock Price', 'Income return to shareholders'],
            ['Retention Ratio', '1 - Payout Ratio', 'What % reinvested in business'],
          ],
        },
        {
          title: 'Dividend Metrics Example',
          type: 'text',
          content: "**Given:**\n• Net Income: $950,000\n• Dividends Paid: $285,000\n• Stock Price: $57.00\n• Shares Outstanding: 200,000\n\n**Calculations:**\nDPS: $285,000 / 200,000 = **$1.425**\n\nDividend Yield: $1.425 / $57.00 = **2.5%**\n\nPayout Ratio: $285,000 / $950,000 = **30%**\n\nRetention Ratio: 1 - 30% = **70%**\n\n**Company retains 70% for reinvestment!**",
        },
        {
          title: '⚠️ Exam Trap: Weighted Average Shares',
          type: 'warning',
          content: "**For EPS, use WEIGHTED AVERAGE shares!**\n\n**Example:**\nJan 1: 100,000 shares outstanding\nJuly 1: Issued 20,000 shares\nDec 31: Year end\n\nWeighted Average:\n100,000 × (12/12) + 20,000 × (6/12)\n= 100,000 + 10,000 = **110,000 shares**\n\n**Stock splits/dividends are applied retroactively!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Basic EPS = (Net Income - Preferred Div) / Weighted Avg Shares",
            "P/E = Price / EPS (higher = higher growth expectations)",
            "Book Value Per Share = Common Equity / Shares",
            "P/B > 1 indicates market premium over book value",
            "Dividend Yield = DPS / Price (income return)",
            "Payout Ratio + Retention Ratio = 100%",
            "Use weighted average shares for EPS calculations",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-A-007',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Cash Flow Analysis',
    description: 'Analyze cash flows and assess cash generation capability',
    order: 7,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Operating cash flow', 'Free cash flow', 'Cash flow ratios', 'Quality of earnings'],
    blueprintArea: 'CMA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Cash is king. Profitable companies can fail if they run out of cash. Cash flow analysis reveals whether earnings are backed by real cash and whether the company can fund operations, investments, and debt payments. CMAs must go beyond accrual earnings to understand cash reality.",
        },
        {
          title: 'Cash Flow Statement Structure',
          type: 'text',
          content: "**Three Sections:**\n\n**Operating Activities (CFO):**\nCash from core business operations\n\n**Investing Activities (CFI):**\nCash for/from long-term assets\n(CapEx, acquisitions, asset sales)\n\n**Financing Activities (CFF):**\nCash from/to capital providers\n(Debt, equity, dividends)\n\n**Net Change = CFO + CFI + CFF**\n\n**Healthy pattern:** +CFO, -CFI, +/- CFF",
        },
        {
          title: 'Free Cash Flow',
          type: 'text',
          content: "**Free Cash Flow to Firm (FCFF):**\nCFO - Capital Expenditures\n\n**Or from EBIT:**\nEBIT(1-t) + D&A - CapEx - Δ Working Capital\n\n**Free Cash Flow to Equity (FCFE):**\nFCFF - Interest(1-t) - Principal Payments + New Borrowing\n\n**What FCF means:**\nCash available after maintaining/growing operations\nCan be used for dividends, debt paydown, buybacks, acquisitions",
        },
        {
          title: '🧠 Memory Aid: FCF Uses',
          type: 'callout',
          content: "**\"DRAB\"** - What to do with Free Cash Flow:\n\n**D**ividends to shareholders\n**R**epay debt\n**A**cquisitions/investments\n**B**uybacks (share repurchases)\n\n**FCF is what's left after keeping the business running!**",
        },
        {
          title: 'Cash Flow Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'Measures'],
          rows: [
            ['Operating Cash Ratio', 'CFO / Current Liabilities', 'Cash coverage of short-term debt'],
            ['Cash Flow to Debt', 'CFO / Total Debt', 'Cash debt coverage'],
            ['Cash Return on Assets', 'CFO / Average Total Assets', 'Cash productivity of assets'],
            ['CapEx Ratio', 'CFO / CapEx', 'Ability to fund investment from operations'],
          ],
        },
        {
          title: 'Quality of Earnings',
          type: 'text',
          content: "**Does cash flow support reported earnings?**\n\n**CFO / Net Income Ratio:**\n• Ratio > 1: Cash exceeds accrual earnings (positive)\n• Ratio ≈ 1: Cash matches earnings (normal)\n• Ratio < 1: Earnings not backed by cash (caution)\n\n**Warning signs:**\n• Growing gap between CFO and Net Income\n• Receivables growing faster than sales\n• Inventory building faster than COGS\n• Aggressive revenue recognition\n\n**Accrual earnings can be manipulated; cash is harder to fake!**",
        },
        {
          title: 'Cash Burn Rate',
          type: 'text',
          content: "**For loss-making companies:**\n\n**Monthly Burn Rate:**\nNegative CFO / 12 months\n\n**Cash Runway:**\nCash & Equivalents / Monthly Burn Rate\n\n**Example:**\nCash: $10,000,000\nAnnual CFO: -$6,000,000\nMonthly Burn: $500,000\nRunway: $10,000,000 / $500,000 = **20 months**\n\n**Company has 20 months before cash runs out (without additional funding)**",
        },
        {
          title: '⚠️ Exam Trap: Indirect Method Adjustments',
          type: 'warning',
          content: "**CFO indirect method starts with Net Income, then adjusts:**\n\n**Add back:** Non-cash expenses (depreciation, amortization)\n**Subtract:** Non-cash gains (gain on sale)\n**Add/Subtract:** Working capital changes\n\n**Working capital changes:**\n• Increase in CA (except cash) → SUBTRACT\n• Decrease in CA → ADD\n• Increase in CL → ADD\n• Decrease in CL → SUBTRACT\n\n**Remember: Changes in assets move OPPOSITE to cash!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CFO = Cash from operations (core business)",
            "FCF = CFO - CapEx (cash after maintaining assets)",
            "Healthy pattern: Positive CFO, negative CFI",
            "CFO/Net Income > 1 indicates high-quality earnings",
            "Warning: Earnings growing faster than cash",
            "Burn rate and runway critical for unprofitable companies",
            "Working capital increases consume cash",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-A-008',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Comprehensive Ratio Analysis',
    description: 'Integrate ratios for complete company analysis using DuPont and other frameworks',
    order: 8,
    duration: 50,
    difficulty: 'advanced',
    topics: ['DuPont analysis', 'Sustainable growth', 'Ratio integration', 'Analytical framework'],
    blueprintArea: 'CMA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Individual ratios tell part of the story. CMAs must integrate ratios into a cohesive analysis that explains WHY performance is what it is and WHAT can be done about it. This is where analytical thinking adds real value!",
        },
        {
          title: 'Extended DuPont Analysis',
          type: 'text',
          content: "**5-Factor DuPont Model:**\n\nROE = (Net Income/EBT) × (EBT/EBIT) × (EBIT/Sales) × (Sales/Assets) × (Assets/Equity)\n\n**Components:**\n1. Tax Burden (NI/EBT)\n2. Interest Burden (EBT/EBIT)\n3. Operating Margin (EBIT/Sales)\n4. Asset Turnover (Sales/Assets)\n5. Equity Multiplier (Assets/Equity)\n\n**This decomposes ROE into tax, financing, operations, efficiency, and leverage!**",
        },
        {
          title: 'DuPont Decomposition Example',
          type: 'table',
          headers: ['Component', 'Company A', 'Company B', 'Impact'],
          rows: [
            ['Net Profit Margin', '8%', '6%', 'A more profitable'],
            ['Asset Turnover', '1.5×', '2.0×', 'B more efficient'],
            ['Equity Multiplier', '2.0×', '2.5×', 'B more leveraged'],
            ['ROE', '24%', '30%', 'B wins overall'],
          ],
        },
        {
          title: 'Sustainable Growth Rate',
          type: 'text',
          content: "**Formula:**\nSGR = ROE × Retention Ratio\n\n**OR expanded:**\nSGR = (Profit Margin × Asset Turnover × Equity Multiplier) × (1 - Payout Ratio)\n\n**What it measures:**\nMaximum growth rate maintainable without:\n• Issuing new equity\n• Changing capital structure\n• Changing financial policies\n\n**Example:**\nROE: 20%, Retention: 60%\nSGR: 20% × 60% = **12%**\n\n*Company can grow 12% while maintaining current leverage*",
        },
        {
          title: '🧠 Memory Aid: SGR',
          type: 'callout',
          content: "**\"SGR = How fast can we grow internally?\"**\n\nSGR = ROE × Retention Rate\n\n**To grow FASTER than SGR:**\n• Improve profitability (increase ROE)\n• Retain more earnings (decrease dividends)\n• Increase leverage (risky!)\n• Issue new equity (dilution!)\n\n**Actual Growth > SGR → Something has to give!**",
        },
        {
          title: 'Integrated Analysis Framework',
          type: 'text',
          content: "**Step 1: Start with ROE**\nHow much return are shareholders earning?\n\n**Step 2: DuPont decomposition**\nIs it from margins, efficiency, or leverage?\n\n**Step 3: Drill into components**\n• Low margin → Analyze gross vs. operating margin\n• Low turnover → Check inventory, receivables, fixed assets\n• High leverage → Review debt ratios, coverage\n\n**Step 4: Cash flow reality check**\nDoes CFO support earnings?\n\n**Step 5: Forward-looking assessment**\nSustainable? Improving or deteriorating?",
        },
        {
          title: 'Common Patterns',
          type: 'table',
          headers: ['Pattern', 'Characteristics', 'Interpretation'],
          rows: [
            ['Growth Company', 'High margins, high reinvestment, low/no dividends', 'Focus on market share, may burn cash'],
            ['Mature Value', 'Moderate margins, high dividends, stable', 'Cash cow, steady returns'],
            ['Turnaround', 'Deteriorating ratios, negative trends', 'Needs strategic change'],
            ['Leveraged Buyout', 'High debt, low margins post-interest', 'Focus on debt paydown'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Extended DuPont breaks ROE into 5 factors",
            "SGR = ROE × Retention Rate (max sustainable growth)",
            "Growing faster than SGR requires policy changes",
            "Integrate ratios - don't analyze in isolation",
            "Cash flow is the reality check for accrual ratios",
            "Look for patterns that indicate company type/stage",
            "Trend analysis matters as much as point-in-time",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-A-009',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Earnings Quality and Manipulation',
    description: 'Identify earnings manipulation and assess quality of reported results',
    order: 9,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Earnings quality', 'Red flags', 'Accrual analysis', 'Forensic indicators'],
    blueprintArea: 'CMA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Reported earnings can be aggressive, conservative, or fraudulent. CMAs must assess earnings quality to avoid being misled and to ensure their own company's reporting is appropriate. Detecting manipulation early can save careers and companies!",
        },
        {
          title: 'Dimensions of Earnings Quality',
          type: 'text',
          content: "**High-quality earnings are:**\n\n**Sustainable:** Will continue into future\n**Cash-backed:** CFO supports accrual earnings\n**Conservative:** Not relying on aggressive estimates\n**Transparent:** Clear disclosure of methods\n**GAAP-compliant:** Not pushing boundaries\n\n**Low-quality earnings:**\n• One-time items\n• Aggressive accounting\n• Growing accruals\n• Complex transactions",
        },
        {
          title: 'Revenue Recognition Red Flags',
          type: 'table',
          headers: ['Red Flag', 'What It May Indicate'],
          rows: [
            ['Revenue growing faster than cash collections', 'Aggressive recognition, stuffing channels'],
            ['Unusual fourth-quarter spikes', 'Pulling sales forward to meet targets'],
            ['Bill-and-hold or consignment issues', 'Revenue before economic transfer'],
            ['Significant related-party sales', 'Non-arm\'s-length transactions'],
            ['Returns increasing after quarter-end', 'Channel stuffing reversing'],
          ],
        },
        {
          title: 'Accrual Analysis',
          type: 'text',
          content: "**Total Accruals:**\n(Change in Non-Cash Current Assets - Change in Current Liabilities - Depreciation) / Average Total Assets\n\n**Interpretation:**\n• High positive accruals → Earnings > Cash (caution)\n• Negative accruals → Cash > Earnings (conservative)\n\n**Accruals ratio trend:**\nIncreasing accruals over time is a warning sign!\n\n**Beneish M-Score and other models use accruals as key input.**",
        },
        {
          title: '🧠 Memory Aid: Manipulation Red Flags',
          type: 'callout',
          content: "**\"RECIPE\"** for spotting manipulation:\n\n**R**ecurring \"one-time\" items\n**E**stimates that seem too favorable\n**C**ash flow diverging from earnings\n**I**nventory growing faster than sales\n**P**olicy changes that boost income\n**E**xecutive departures (especially CFO/Controller)\n\n**Multiple flags together = higher concern!**",
        },
        {
          title: 'Expense Manipulation',
          type: 'text',
          content: "**Common techniques:**\n\n**Capitalizing expenses:**\n• R&D, software development, marketing\n• Delays expense recognition\n\n**Extending useful lives:**\n• Reduces depreciation/amortization\n• Assets may be overvalued\n\n**Understating reserves:**\n• Bad debts, warranties, litigation\n• Inflates current earnings\n\n**Cookie jar reserves:**\n• Over-reserve in good years\n• Release in bad years\n\n**Compare policies to peers and historical practice!**",
        },
        {
          title: 'Cash Flow Reality Check',
          type: 'text',
          content: "**CFO to NI Comparison:**\n\nConsistently CFO >> NI: Conservative accounting\nConsistently CFO << NI: Aggressive accounting\n\n**Growing gap over time:**\nEarnings quality is deteriorating\n\n**Specific checks:**\n• Receivables growing faster than revenue\n• Inventory growing faster than COGS\n• Payables declining while activity stable\n• Deferred revenue declining\n\n**Cash doesn't lie - accruals can!**",
        },
        {
          title: '⚠️ Exam Trap: Aggressive ≠ Fraud',
          type: 'warning',
          content: "**Three levels of accounting:**\n\n**Conservative:** Cautious estimates, earlier expense recognition\n\n**Aggressive:** Optimistic estimates, push GAAP limits\n(Still within GAAP - just at the edge)\n\n**Fraudulent:** Violates GAAP, intent to deceive\n\n**Aggressive accounting is not illegal, but:**\n• May indicate future problems\n• Can become fraud if taken further\n• Often reverses in future periods",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Quality earnings are sustainable, cash-backed, conservative",
            "Compare CFO to Net Income - divergence is a red flag",
            "Watch for receivables/inventory growing faster than sales",
            "Rising accruals over time indicates declining quality",
            "\"One-time\" charges that recur are not one-time",
            "Aggressive accounting isn't fraud but warrants caution",
            "Multiple red flags together increase concern",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-A-010',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Analytical Procedures in Practice',
    description: 'Apply financial analysis techniques to real-world situations',
    order: 10,
    duration: 45,
    difficulty: 'advanced',
    topics: ['Benchmarking', 'Trend analysis', 'Cross-sectional analysis', 'Limitations'],
    blueprintArea: 'CMA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Analysis without context is meaningless. CMAs must know how to benchmark against peers, analyze trends, and understand the limitations of ratio analysis. This lesson connects theory to practice - how to actually USE these tools.",
        },
        {
          title: 'Benchmarking Approaches',
          type: 'text',
          content: "**Internal benchmarking:**\n• Prior periods (horizontal/trend analysis)\n• Budget vs. actual\n• Division vs. division\n\n**External benchmarking:**\n• Industry averages\n• Direct competitors\n• Best-in-class performers\n\n**Sources of benchmarks:**\n• Industry associations\n• Financial databases (S&P, Moody's)\n• Analysts' reports\n• Company filings (peer comparison)",
        },
        {
          title: 'Trend Analysis Best Practices',
          type: 'table',
          headers: ['Practice', 'Why It Matters'],
          rows: [
            ['Use 3-5 years minimum', 'Identify patterns, not noise'],
            ['Watch for inflection points', 'Strategy/environment changes'],
            ['Normalize for one-time items', 'See sustainable performance'],
            ['Consider economic cycles', 'Separate macro from company-specific'],
            ['Project forward cautiously', 'Past ≠ future'],
          ],
        },
        {
          title: 'Cross-Sectional Analysis',
          type: 'text',
          content: "**Comparing companies at same point in time:**\n\n**Select comparable companies:**\n• Same industry\n• Similar size\n• Similar business model\n• Similar geography\n\n**Adjust for differences:**\n• Accounting policies\n• Fiscal year-ends\n• Capital structure\n• Growth stage\n\n**Use common-size statements to neutralize size differences!**",
        },
        {
          title: '🧠 Memory Aid: Analysis Framework',
          type: 'callout',
          content: "**\"SCRIBE\"** - Complete analysis approach:\n\n**S**tructure (vertical analysis)\n**C**hange (horizontal analysis)\n**R**atios (comprehensive set)\n**I**ndustry comparison (benchmark)\n**B**usiness context (qualitative)\n**E**xpectations (forward-looking)\n\n**Don't skip any step!**",
        },
        {
          title: 'Limitations of Ratio Analysis',
          type: 'text',
          content: "**Key limitations:**\n\n**Accounting differences:**\n• LIFO vs. FIFO inventory\n• Depreciation methods\n• Operating vs. finance leases\n\n**Comparability issues:**\n• Conglomerates hard to classify\n• Different fiscal years\n• International standards vary\n\n**Backward-looking:**\n• Past may not predict future\n• Misses qualitative factors\n\n**Point-in-time issues:**\n• Balance sheet is a snapshot\n• Window dressing possible",
        },
        {
          title: 'Practical Analysis Tips',
          type: 'text',
          content: "**Don't:**\n• Rely on single ratios\n• Ignore industry context\n• Forget cash flow analysis\n• Accept numbers without verification\n• Ignore qualitative factors\n\n**Do:**\n• Use multiple ratios together\n• Analyze trends over time\n• Compare to relevant peers\n• Read footnotes and MD&A\n• Consider business strategy\n• Question unusual items\n• Follow up on red flags",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Benchmark internally (trend) and externally (peers)",
            "Use 3-5 years for trend analysis",
            "Select truly comparable companies for external benchmarks",
            "Adjust for accounting policy differences",
            "Limitations: backward-looking, accounting differences, window dressing",
            "Combine quantitative ratios with qualitative understanding",
            "SCRIBE: Structure, Change, Ratios, Industry, Business, Expectations",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCMA2ALessons = () => cma2ALessons;
export const getCMA2ALessonById = (id: string) => cma2ALessons.find(lesson => lesson.id === id);
export const getCMA2ALessonCount = () => cma2ALessons.length;

export default cma2ALessons;
