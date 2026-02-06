/**
 * CMA Part 1, Section A: External Financial Reporting Decisions
 * Weight: 15% of Part 1 Exam
 * 
 * Topics covered:
 * - Financial statements
 * - Recognition, measurement, valuation, and disclosure
 * - FASB Accounting Standards Codification
 * - SEC filings
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 * Effective January 2025
 */

import { Lesson } from '../../../types';

export const cma1ALessons: Lesson[] = [
  // ============================================================================
  // CMA1-A: EXTERNAL FINANCIAL REPORTING DECISIONS (Lessons 1-8)
  // ============================================================================
  
  {
    id: 'CMA1-A-001',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Financial Statements Overview',
    description: 'Master the purpose, components, and interrelationships of the primary financial statements',
    order: 1,
    duration: 50,
    difficulty: 'beginner',
    topics: ['Balance sheet', 'Income statement', 'Statement of cash flows', 'Statement of changes in equity'],
    blueprintArea: 'CMA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "As a CMA, you'll prepare, analyze, and use financial statements for strategic decision-making. Understanding how statements connect and what story they tell is FUNDAMENTAL to every aspect of your role - from budgeting to performance evaluation to investor relations.",
        },
        {
          title: 'The Four Primary Financial Statements',
          type: 'table',
          headers: ['Statement', 'What It Shows', 'Time Frame', 'Key Question Answered'],
          rows: [
            ['Balance Sheet', 'Financial position (A = L + E)', 'Point in time', 'What do we own and owe?'],
            ['Income Statement', 'Financial performance (R - E = NI)', 'Period of time', 'Did we make money?'],
            ['Statement of Cash Flows', 'Cash inflows and outflows', 'Period of time', 'Where did cash come from and go?'],
            ['Statement of Changes in Equity', 'Changes in ownership interests', 'Period of time', 'How did equity change?'],
          ],
        },
        {
          title: '🧠 Memory Aid: The Financial Statement Cycle',
          type: 'callout',
          content: "**\"BICE\"** - How statements flow together:\n\n**B**alance Sheet (beginning) → \n**I**ncome Statement (period activity) → \n**C**ash Flow Statement (cash reconciliation) → \n**E**quity Statement (ownership changes) → \n**B**alance Sheet (ending)\n\nNet income flows from Income Statement to Retained Earnings. Cash flows to the Balance Sheet cash account.",
        },
        {
          title: 'Balance Sheet (Statement of Financial Position)',
          type: 'text',
          content: "**The Fundamental Equation:**\nAssets = Liabilities + Stockholders' Equity\n\n**Asset Classification:**\n• **Current Assets:** Cash, receivables, inventory, prepaid expenses (converted to cash within 1 year)\n• **Non-current Assets:** PP&E, intangibles, long-term investments\n\n**Liability Classification:**\n• **Current Liabilities:** Payables, accrued expenses, current portion of LT debt (due within 1 year)\n• **Non-current Liabilities:** Long-term debt, deferred taxes, pension obligations\n\n**Stockholders' Equity:**\n• Contributed capital (common stock, APIC)\n• Retained earnings\n• Accumulated other comprehensive income (AOCI)\n• Treasury stock (contra-equity)",
        },
        {
          title: 'Income Statement',
          type: 'text',
          content: "**Single-Step Format:**\nTotal Revenues - Total Expenses = Net Income\n\n**Multi-Step Format (More Common):**\n```\nNet Sales\n- Cost of Goods Sold\n= Gross Profit\n- Operating Expenses\n= Operating Income\n± Other Income/Expenses\n= Income Before Tax\n- Income Tax Expense\n= Net Income from Continuing Operations\n± Discontinued Operations (net of tax)\n= Net Income\n```\n\n**Key Subtotals:**\n• Gross Profit Margin = Gross Profit / Net Sales\n• Operating Margin = Operating Income / Net Sales\n• Net Profit Margin = Net Income / Net Sales",
        },
        {
          title: 'Statement of Cash Flows',
          type: 'text',
          content: "**Three Sections:**\n\n**Operating Activities:**\n• Cash from core business operations\n• Start with net income, adjust for non-cash items\n• Changes in working capital accounts\n\n**Investing Activities:**\n• Capital expenditures (PP&E purchases)\n• Investments in securities\n• Proceeds from asset sales\n\n**Financing Activities:**\n• Borrowing and repaying debt\n• Issuing and repurchasing stock\n• Dividend payments\n\n**The Reconciliation:**\nBeginning Cash + Operating + Investing + Financing = Ending Cash",
        },
        {
          title: '⚠️ Exam Trap: Direct vs. Indirect Method',
          type: 'warning',
          content: "**The CMA heavily tests the INDIRECT METHOD for operating cash flows!**\n\n**Start with Net Income, then adjust:**\n• ADD back non-cash expenses (depreciation, amortization)\n• ADD/SUBTRACT gains/losses on asset sales\n• ADJUST for changes in current assets and liabilities\n\n**Rule of thumb:**\n• Current asset INCREASE = cash DECREASE (subtract)\n• Current liability INCREASE = cash INCREASE (add)\n\n**Example:** AR increased $10,000 → Subtract $10,000 (sold on credit, no cash yet)",
        },
        {
          title: 'Statement of Stockholders\' Equity',
          type: 'text',
          content: "**Components Reconciled:**\n• Common Stock\n• Additional Paid-in Capital\n• Retained Earnings\n• Accumulated Other Comprehensive Income\n• Treasury Stock\n\n**Common Transactions:**\n• Net income → Increases retained earnings\n• Dividends declared → Decreases retained earnings\n• Stock issuance → Increases common stock and APIC\n• Stock repurchase → Increases treasury stock (reduces equity)\n• OCI items → Change AOCI directly (bypass income statement)",
        },
        {
          title: 'Articulation: How Statements Connect',
          type: 'list',
          content: [
            "Net Income from Income Statement → Retained Earnings (SE Statement) → Balance Sheet",
            "Ending Cash from Cash Flow Statement → Cash on Balance Sheet",
            "Dividends declared → Reduces Retained Earnings",
            "PP&E purchases (Investing CF) → Increases PP&E on Balance Sheet",
            "Debt issuance (Financing CF) → Increases Liabilities on Balance Sheet",
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Four statements: Balance Sheet, Income Statement, Cash Flows, Changes in Equity",
            "Balance Sheet shows position at a point in time; others show changes over a period",
            "Assets = Liabilities + Equity (always balances)",
            "Cash flow statement uses indirect method most often (start with net income)",
            "Increase in current assets = cash outflow; increase in current liabilities = cash inflow",
            "Statements articulate - net income flows to retained earnings to balance sheet",
            "Multi-step income statement shows gross profit and operating income subtotals",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-A-002',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Revenue Recognition (ASC 606)',
    description: 'Apply the five-step model for recognizing revenue from contracts with customers',
    order: 2,
    duration: 60,
    difficulty: 'intermediate',
    topics: ['Five-step model', 'Performance obligations', 'Transaction price', 'Variable consideration'],
    blueprintArea: 'CMA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Revenue is THE most important line on the income statement! As a CMA, you'll help structure deals, determine when to recognize revenue, and ensure compliance. Misapplying ASC 606 leads to restatements, SEC enforcement, and career-ending mistakes.",
        },
        {
          title: 'The Core Principle',
          type: 'text',
          content: "**ASC 606 Core Principle:**\nRecognize revenue to depict the transfer of promised goods or services to customers in an amount that reflects the consideration the entity expects to be entitled to in exchange for those goods or services.\n\n**Translation:** Recognize revenue when you've EARNED it by delivering what you promised, for the amount you expect to collect.",
        },
        {
          title: '🧠 Memory Aid: The Five Steps',
          type: 'callout',
          content: "**\"I PROMISE TO DELIVER VALUE\"**\n\n**Step 1:** **I**dentify the contract\n**Step 2:** **P**erformance obligations identified\n**Step 3:** **T**ransaction price determined\n**Step 4:** **A**llocate price to obligations\n**Step 5:** **R**ecognize revenue when satisfied\n\nOr simply: **IPTAR** - Identify, PO, Transaction, Allocate, Recognize",
        },
        {
          title: 'Step 1: Identify the Contract',
          type: 'text',
          content: "**A contract exists when ALL criteria are met:**\n\n1. **Approval:** Parties have approved the contract\n2. **Rights:** Each party's rights are identified\n3. **Payment terms:** Payment terms are identified\n4. **Commercial substance:** The contract has commercial substance\n5. **Collectibility:** Collection of consideration is probable\n\n**No contract?** No revenue recognition until criteria are met. Consider whether it's a deposit/liability.",
        },
        {
          title: 'Step 2: Identify Performance Obligations',
          type: 'text',
          content: "**Performance Obligation:** A promise to transfer a distinct good or service.\n\n**Distinct if BOTH are met:**\n1. **Capable of being distinct:** Customer can benefit from it on its own (or with readily available resources)\n2. **Distinct within the contract:** Promise is separately identifiable from other promises\n\n**Examples:**\n• Software license + 1 year of updates = 2 POs (if updates are distinct)\n• Equipment sale + installation = 1 PO (if installation is highly integrated)\n• Product warranty = Separate PO if provides service beyond assurance",
        },
        {
          title: 'Step 3: Determine Transaction Price',
          type: 'text',
          content: "**Transaction Price:** The amount the entity expects to receive in exchange for transferring goods/services.\n\n**Consider these factors:**\n\n• **Variable consideration:** Discounts, rebates, refunds, bonuses\n  - Use Expected Value (probability-weighted) OR Most Likely Amount\n  - Apply **constraint:** Include only amounts NOT subject to significant reversal\n\n• **Significant financing component:** Present value if payment timing > 1 year\n\n• **Non-cash consideration:** Measure at fair value\n\n• **Consideration payable to customer:** Reduce transaction price (rebates, coupons)",
        },
        {
          title: '⚠️ Exam Trap: Variable Consideration Constraint',
          type: 'warning',
          content: "**The constraint is HEAVILY tested!**\n\nVariable consideration is only included to the extent it is **HIGHLY PROBABLE** that a significant reversal will NOT occur.\n\n**Factors indicating potential reversal:**\n• Highly susceptible to factors outside entity's control\n• Long time before uncertainty resolved\n• Limited experience with similar contracts\n• Practice of offering concessions\n• Broad range of possible outcomes\n\n**Example:** $1M contract with $200K bonus if delivered early. Only include bonus if highly probable you'll earn it.",
        },
        {
          title: 'Step 4: Allocate Transaction Price',
          type: 'text',
          content: "**Allocate based on Relative Standalone Selling Prices (SSP)**\n\n**How to determine SSP:**\n1. **Observable price:** Price when sold separately (best evidence)\n2. **Adjusted market assessment:** What would market pay?\n3. **Expected cost plus margin:** Your cost + reasonable margin\n4. **Residual approach:** Only if SSP highly variable or uncertain\n\n**Formula:**\nAllocated Amount = (SSP of PO / Total SSP of all POs) × Transaction Price",
        },
        {
          title: 'Step 5: Recognize Revenue',
          type: 'text',
          content: "**Recognize when (or as) performance obligation is satisfied**\n\n**Over Time Recognition (if ANY criterion met):**\n1. Customer simultaneously receives and consumes benefits\n2. Entity's performance creates/enhances an asset customer controls\n3. Entity's performance creates an asset with no alternative use AND entity has enforceable right to payment\n\n**Point in Time (if not over time):**\nRecognize when control transfers to customer.\n\n**Indicators of control transfer:**\n• Entity has present right to payment\n• Customer has legal title\n• Physical possession transferred\n• Customer has significant risks and rewards of ownership\n• Customer has accepted the asset",
        },
        {
          title: 'Measuring Progress (Over Time)',
          type: 'table',
          headers: ['Method', 'Basis', 'When to Use'],
          rows: [
            ['Output Methods', 'Results achieved (units delivered, milestones, surveys)', 'When output directly measures value to customer'],
            ['Input Methods', 'Efforts expended (costs incurred, labor hours, time elapsed)', 'When inputs correlate with transfer of control'],
            ['Cost-to-Cost', 'Costs incurred / Total estimated costs', 'Most common for long-term contracts'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ASC 606 uses a 5-step model: Identify contract, POs, price, allocate, recognize",
            "Performance obligation is distinct if customer can benefit alone AND separately identifiable",
            "Variable consideration constrained to highly probable amounts",
            "Allocate transaction price using relative standalone selling prices",
            "Recognize over time if customer receives benefit continuously",
            "Cost-to-cost is most common method for measuring progress",
            "Control transfer indicators determine point-in-time recognition",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-A-003',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Inventory Valuation Methods',
    description: 'Compare FIFO, LIFO, weighted average, and understand their financial statement impacts',
    order: 3,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['FIFO', 'LIFO', 'Weighted average', 'Lower of cost or NRV'],
    blueprintArea: 'CMA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Inventory is often a company's LARGEST current asset. Your choice of valuation method directly impacts reported profits, taxes paid, and performance metrics. CMAs must understand these effects to advise on inventory policies and analyze competitor financials.",
        },
        {
          title: 'Inventory Cost Flow Assumptions',
          type: 'table',
          headers: ['Method', 'Description', 'Ending Inventory', 'COGS'],
          rows: [
            ['FIFO', 'First costs In are First costs Out', 'Reflects recent costs', 'Reflects older costs'],
            ['LIFO', 'Last costs In are First costs Out', 'Reflects older costs', 'Reflects recent costs'],
            ['Weighted Average', 'Average of all costs', 'Average cost', 'Average cost'],
            ['Specific Identification', 'Actual cost of each unit', 'Actual costs', 'Actual costs'],
          ],
        },
        {
          title: '🧠 Memory Aid: Rising Prices Effect',
          type: 'callout',
          content: "**\"LIFO = Lower Income, Lower Inventory, Lower Taxes\"**\n\nIn periods of RISING prices:\n• **LIFO:** Higher COGS → Lower Net Income → Lower Taxes\n• **FIFO:** Lower COGS → Higher Net Income → Higher Taxes\n\n**Balance Sheet:**\n• **LIFO:** Understated inventory (old costs)\n• **FIFO:** Current inventory values (recent costs)",
        },
        {
          title: 'FIFO (First-In, First-Out)',
          type: 'text',
          content: "**Concept:** Oldest inventory costs flow to COGS first.\n\n**Advantages:**\n• Ending inventory reflects current replacement costs\n• Matches physical flow for most businesses\n• Permitted under GAAP AND IFRS\n\n**Disadvantages:**\n• During inflation: higher income = higher taxes\n• May not match current costs with current revenues\n\n**Example:**\nPurchases: 100 @ $10, then 100 @ $12\nSold: 150 units\nCOGS = (100 × $10) + (50 × $12) = $1,600\nEnding Inventory = 50 × $12 = $600",
        },
        {
          title: 'LIFO (Last-In, First-Out)',
          type: 'text',
          content: "**Concept:** Newest inventory costs flow to COGS first.\n\n**Advantages:**\n• Better matching of current costs with revenues\n• Tax savings during inflation (higher COGS = lower taxable income)\n\n**Disadvantages:**\n• Inventory on B/S can be severely understated (old \"layers\")\n• NOT permitted under IFRS\n• LIFO conformity rule: If used for tax, must use for GAAP\n\n**Example:**\nPurchases: 100 @ $10, then 100 @ $12\nSold: 150 units\nCOGS = (100 × $12) + (50 × $10) = $1,700\nEnding Inventory = 50 × $10 = $500",
        },
        {
          title: '⚠️ Exam Trap: LIFO Liquidation',
          type: 'warning',
          content: "**LIFO Liquidation occurs when units sold > units purchased**\n\nThis dips into OLD, low-cost inventory layers, causing:\n• Artificially LOW COGS\n• Artificially HIGH income\n• HIGHER taxes\n\n**The opposite of why companies use LIFO!**\n\n**Exam question pattern:** \"Company using LIFO experienced unexpected sales surge...\" → Watch for LIFO liquidation effects.",
        },
        {
          title: 'Weighted Average Cost',
          type: 'text',
          content: "**Concept:** All units have the same average cost.\n\n**Calculation:**\nWeighted Average Cost = Total Cost of Goods Available / Total Units Available\n\n**Two variations:**\n• **Periodic:** One average calculated at period end\n• **Moving Average:** New average after each purchase\n\n**Example (Periodic):**\nPurchases: 100 @ $10 + 100 @ $12 = $2,200\nUnits available: 200\nAverage cost: $2,200 / 200 = $11/unit\nCOGS (150 sold): 150 × $11 = $1,650\nEnding Inventory: 50 × $11 = $550",
        },
        {
          title: 'Lower of Cost or Net Realizable Value',
          type: 'text',
          content: "**GAAP Requirement:** Inventory must be written down if NRV falls below cost.\n\n**Net Realizable Value (NRV) =** Estimated selling price - Costs to complete and sell\n\n**The test (for non-LIFO inventory):**\n• Compare Cost vs. NRV\n• Report at the LOWER amount\n• Write-down recognized as loss in COGS\n\n**For LIFO/Retail Method:**\nUse Lower of Cost or Market (LCM)\n• Market = Replacement cost (with ceiling and floor)\n• Ceiling = NRV\n• Floor = NRV - Normal profit margin",
        },
        {
          title: 'Comparison Summary',
          type: 'table',
          headers: ['Factor', 'FIFO', 'LIFO', 'Weighted Avg'],
          rows: [
            ['Rising prices: COGS', 'Lowest', 'Highest', 'Middle'],
            ['Rising prices: Net Income', 'Highest', 'Lowest', 'Middle'],
            ['Rising prices: Inventory', 'Highest', 'Lowest', 'Middle'],
            ['Rising prices: Taxes', 'Highest', 'Lowest', 'Middle'],
            ['Physical flow match', 'Usually yes', 'Rarely', 'No'],
            ['IFRS permitted', 'Yes', 'No', 'Yes'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "FIFO: oldest costs to COGS, ending inventory reflects recent costs",
            "LIFO: newest costs to COGS, tax advantage in inflation (US GAAP only)",
            "Weighted average: smooths cost fluctuations",
            "LIFO liquidation causes artificially high income - watch for this trap",
            "Lower of cost or NRV required for inventory valuation",
            "LIFO requires conformity: tax and book must match",
            "IFRS prohibits LIFO - important for multinational comparisons",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-A-004',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Long-Lived Assets and Depreciation',
    description: 'Master capitalization, depreciation methods, and impairment of PP&E and intangibles',
    order: 4,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Capitalization', 'Depreciation methods', 'Impairment', 'Intangible assets'],
    blueprintArea: 'CMA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Capital expenditures are often a company's largest investments. CMAs make capitalization decisions, choose depreciation methods affecting reported income, and test for impairment. These decisions directly impact performance metrics and capital budgeting analysis.",
        },
        {
          title: 'Capitalize vs. Expense Decision',
          type: 'text',
          content: "**Capitalize (add to asset) when:**\n• Expenditure provides future economic benefit\n• Extends useful life OR increases productivity\n• Initial acquisition or construction costs\n\n**Expense immediately when:**\n• Maintains current operating capacity\n• Repairs and routine maintenance\n• Does not extend life or add value\n\n**Capitalized Costs for PP&E:**\n• Purchase price (less discounts)\n• Import duties and non-refundable taxes\n• Directly attributable costs to bring asset to intended use\n• Site preparation, delivery, installation, testing\n• Professional fees (architects, legal for construction)",
        },
        {
          title: '🧠 Memory Aid: Capitalization Test',
          type: 'callout',
          content: "**\"FUEL\"** - Capitalize if it provides:\n\n**F**uture economic benefit\n**U**seful life extended\n**E**fficiency or capacity increased\n**L**egal requirement for operation\n\nIf it just maintains existing capacity → EXPENSE IT",
        },
        {
          title: 'Depreciation Methods',
          type: 'table',
          headers: ['Method', 'Formula', 'Pattern', 'Best For'],
          rows: [
            ['Straight-Line', '(Cost - Salvage) / Useful Life', 'Equal amounts each year', 'Assets with even usage'],
            ['Double-Declining Balance', '(2 / Life) × Book Value', 'Higher early, lower later', 'Assets losing value quickly'],
            ['Units of Production', '((Cost - Salvage) / Total Units) × Units Used', 'Based on actual usage', 'Manufacturing equipment'],
            ['Sum-of-Years-Digits', '(Remaining Life / SYD) × (Cost - Salvage)', 'Accelerated', 'Rapid obsolescence'],
          ],
        },
        {
          title: 'Straight-Line Depreciation',
          type: 'text',
          content: "**Formula:**\nAnnual Depreciation = (Cost - Salvage Value) / Useful Life\n\n**Example:**\nMachine cost: $100,000\nSalvage value: $10,000\nUseful life: 5 years\n\nAnnual depreciation = ($100,000 - $10,000) / 5 = $18,000/year\n\n**Advantages:**\n• Simple to calculate\n• Consistent expense each period\n• Matches assets with even usage patterns",
        },
        {
          title: 'Double-Declining Balance (DDB)',
          type: 'text',
          content: "**Formula:**\nDepreciation = (2 / Useful Life) × Beginning Book Value\n\n**Key Rules:**\n• IGNORE salvage value in calculation (but never depreciate below salvage)\n• Switch to straight-line when it gives higher depreciation\n\n**Example (Year 1):**\nCost: $100,000, Life: 5 years, Salvage: $10,000\nRate: 2/5 = 40%\nYear 1: $100,000 × 40% = $40,000\nYear 2: $60,000 × 40% = $24,000\nYear 3: $36,000 × 40% = $14,400\n(Continue until book value = salvage value)",
        },
        {
          title: '⚠️ Exam Trap: Partial Year Depreciation',
          type: 'warning',
          content: "**Watch for assets acquired mid-year!**\n\n**Common conventions:**\n• **Half-year:** 6 months depreciation in year of acquisition\n• **Full-month:** Depreciation from month placed in service\n• **Nearest month:** Round to nearest whole month\n\n**Example:** Asset purchased October 1, straight-line $12,000/year\n• Full year: $12,000\n• Half-year: $6,000\n• Full-month: $12,000 × 3/12 = $3,000",
        },
        {
          title: 'Impairment of Long-Lived Assets',
          type: 'text',
          content: "**Two-Step Test (GAAP):**\n\n**Step 1: Recoverability Test**\nIs carrying value > undiscounted future cash flows?\n• If YES → Asset is impaired, go to Step 2\n• If NO → No impairment\n\n**Step 2: Measurement**\nImpairment Loss = Carrying Value - Fair Value\n\n**When to test:**\n• Significant decrease in market value\n• Adverse change in use or physical condition\n• Adverse change in legal or business climate\n• Operating losses or negative cash flows\n\n**Impairment losses are NOT reversible under GAAP!**",
        },
        {
          title: 'Intangible Assets',
          type: 'text',
          content: "**Identifiable intangibles:** Patents, copyrights, trademarks, franchises, customer lists\n\n**Finite life intangibles:**\n• Amortize over useful life (straight-line typical)\n• Subject to impairment testing\n• Examples: Patents (legal life 20 years), copyrights\n\n**Indefinite life intangibles:**\n• NO amortization\n• Annual impairment test required\n• Example: Trademarks (can be renewed indefinitely)\n\n**Goodwill:**\n• Excess of purchase price over fair value of net assets acquired\n• NOT amortizable\n• Annual impairment test at reporting unit level",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Capitalize costs providing future benefit; expense maintenance",
            "Straight-line: equal annual amounts, most common method",
            "DDB: ignore salvage in calculation, accelerated pattern",
            "Partial year depreciation - watch for mid-year purchases",
            "Impairment: two-step test using undiscounted then fair value",
            "Impairment losses cannot be reversed under GAAP",
            "Indefinite-life intangibles and goodwill are NOT amortized",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-A-005',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Leases (ASC 842)',
    description: 'Apply the new lease accounting standard for lessees and lessors',
    order: 5,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Finance lease', 'Operating lease', 'Right-of-use asset', 'Lease liability'],
    blueprintArea: 'CMA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "ASC 842 brought nearly all leases onto the balance sheet, significantly impacting debt ratios, EBITDA, and performance metrics. CMAs must understand lease classification, measurement, and the strategic implications of lease vs. buy decisions.",
        },
        {
          title: 'Core Principle of ASC 842',
          type: 'text',
          content: "**Lessee Recognition:**\nVirtually ALL leases create a Right-of-Use (ROU) Asset and a Lease Liability on the balance sheet.\n\n**Exception:** Short-term leases (≤12 months, no purchase option reasonably certain to exercise) may be expensed straight-line.\n\n**Major Change from Old Rules:**\nPreviously, operating leases were \"off-balance sheet.\" Now they're ON the balance sheet, affecting leverage ratios.",
        },
        {
          title: '🧠 Memory Aid: Finance vs. Operating Lease',
          type: 'callout',
          content: "**\"OWNES\"** - Any ONE criterion = Finance Lease:\n\n**O**wnership transfers at end of lease\n**W**ritten purchase option reasonably certain to exercise\n**N**inety percent (≥90%) of fair value is present value of payments\n**E**conomic life: Lease term is ≥75% of remaining economic life\n**S**pecialized: Asset is specialized with no alternative use to lessor\n\nNone of these? → **Operating Lease**",
        },
        {
          title: 'Lessee Accounting: Initial Measurement',
          type: 'text',
          content: "**Lease Liability =** Present value of lease payments\n\n**Lease payments include:**\n• Fixed payments (less any lease incentives)\n• Variable payments based on index or rate\n• Exercise price of purchase option (if reasonably certain)\n• Penalties for termination (if lease term reflects termination)\n• Residual value guarantees\n\n**ROU Asset =** Lease liability\n+ Initial direct costs\n+ Prepaid lease payments\n- Lease incentives received\n\n**Discount Rate:**\n• Rate implicit in the lease (if readily determinable)\n• Lessee's incremental borrowing rate (if implicit rate not known)",
        },
        {
          title: 'Lessee Accounting: Finance Lease',
          type: 'text',
          content: "**Subsequent Measurement:**\n\n**ROU Asset:**\n• Amortize (typically straight-line over lease term)\n• Test for impairment\n\n**Lease Liability:**\n• Reduce by payments made\n• Increase by interest accrual (effective interest method)\n\n**Income Statement Impact:**\n• Amortization expense (separate line)\n• Interest expense (separate line)\n• **Front-loaded expense pattern** (like owning the asset)",
        },
        {
          title: 'Lessee Accounting: Operating Lease',
          type: 'text',
          content: "**Subsequent Measurement:**\n\n**ROU Asset:**\n• Calculated as a \"plug\" to achieve straight-line lease expense\n• Not separately amortized\n\n**Lease Liability:**\n• Reduce by payments made\n• Increase by interest accrual\n\n**Income Statement Impact:**\n• Single \"lease expense\" (straight-line over lease term)\n• Shown within operating expenses\n• **Even expense pattern** (like renting)",
        },
        {
          title: '⚠️ Exam Trap: Interest Pattern',
          type: 'warning',
          content: "**Both lease types use effective interest on the liability!**\n\nBut total expense pattern differs:\n\n**Finance Lease:**\n• High interest early (larger liability balance)\n• Steady amortization\n• Total expense = Interest + Amortization\n• **Result: Higher expense in early years**\n\n**Operating Lease:**\n• Interest is front-loaded\n• BUT ROU Asset reduction balances it out\n• **Result: Straight-line TOTAL expense**",
        },
        {
          title: 'Comparison: Finance vs. Operating Lease',
          type: 'table',
          headers: ['Feature', 'Finance Lease', 'Operating Lease'],
          rows: [
            ['Balance Sheet', 'ROU Asset + Liability', 'ROU Asset + Liability'],
            ['ROU Amortization', 'Straight-line (typically)', 'Plug amount'],
            ['Interest Pattern', 'Front-loaded', 'Front-loaded'],
            ['Total Expense Pattern', 'Front-loaded', 'Straight-line'],
            ['Cash Flow Statement', 'Principal in Financing, Interest in Operating', 'All in Operating'],
            ['EBITDA Impact', 'Depreciation & interest excluded', 'Lease expense excluded before add-back'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ASC 842: Nearly all leases go on balance sheet as ROU Asset and Lease Liability",
            "OWNES criteria (any one) = Finance Lease; none = Operating Lease",
            "Lease liability = PV of lease payments at implicit rate or IBR",
            "ROU Asset = Liability + Initial costs + Prepayments - Incentives",
            "Finance lease: front-loaded total expense (interest + amortization)",
            "Operating lease: straight-line total expense",
            "Short-term lease exception (≤12 months) allows off-balance sheet treatment",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-A-006',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Income Taxes (ASC 740)',
    description: 'Understand deferred tax assets, liabilities, and valuation allowances',
    order: 6,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Deferred tax assets', 'Deferred tax liabilities', 'Temporary differences', 'Valuation allowance'],
    blueprintArea: 'CMA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Income tax accounting affects net income, effective tax rates, and balance sheet presentation. CMAs must understand why book and tax income differ, how to calculate deferred taxes, and when a valuation allowance is required. Tax provision work is a key CMA competency.",
        },
        {
          title: 'Book vs. Tax Differences',
          type: 'text',
          content: "**Why do book and tax income differ?**\nGAAP and tax law have different objectives:\n• GAAP: Match revenues and expenses, fair presentation\n• Tax: Generate revenue for government, encourage certain behaviors\n\n**Two types of differences:**\n\n**Temporary Differences:**\n• Will reverse in future periods\n• Create deferred tax assets or liabilities\n• Example: Accelerated depreciation for tax\n\n**Permanent Differences:**\n• Will NEVER reverse\n• Affect effective tax rate only\n• Example: Municipal bond interest (book income, never taxed)",
        },
        {
          title: '🧠 Memory Aid: DTL vs. DTA',
          type: 'callout',
          content: "**\"Future Tax Bill\"** approach:\n\n**Deferred Tax LIABILITY (DTL):**\n• You owe ADDITIONAL taxes in the future\n• Book income > Tax income NOW\n• Example: Depreciation faster for tax than book\n\n**Deferred Tax ASSET (DTA):**\n• You'll pay LESS taxes in the future\n• Tax income > Book income NOW\n• Example: Warranty expense accrued on books, deducted when paid for tax",
        },
        {
          title: 'Calculating Deferred Taxes',
          type: 'text',
          content: "**The Balance Sheet Approach (ASC 740):**\n\n**Step 1:** Identify temporary differences (book vs. tax basis of assets/liabilities)\n\n**Step 2:** Classify as future taxable or deductible amounts\n\n**Step 3:** Apply enacted tax rate\n\n**Formula:**\nDeferred Tax = Temporary Difference × Tax Rate\n\n**Example:**\nEquipment: Book basis $80,000, Tax basis $60,000\nDifference: $20,000 (will be taxable in future as less depreciation available)\nTax rate: 21%\nDTL = $20,000 × 21% = $4,200",
        },
        {
          title: 'Common Temporary Differences',
          type: 'table',
          headers: ['Item', 'Creates', 'Reason'],
          rows: [
            ['Accelerated tax depreciation', 'DTL', 'Lower tax basis → future taxable amount'],
            ['Warranty expense (accrued)', 'DTA', 'Deducted when paid for tax'],
            ['Bad debt expense (allowance)', 'DTA', 'Deducted when written off for tax'],
            ['Prepaid rent (received)', 'DTA', 'Taxed when received, book income later'],
            ['Installment sales', 'DTL', 'Book revenue now, taxed when collected'],
            ['Unrealized gains on investments', 'DTL', 'Book income now, taxed when sold'],
          ],
        },
        {
          title: 'Valuation Allowance',
          type: 'text',
          content: "**When Required:**\nReduce DTA by a valuation allowance if it is **more likely than not** (>50% probability) that some or all of the DTA will NOT be realized.\n\n**Evidence to Consider:**\n\n**Negative (suggesting need for allowance):**\n• History of operating losses\n• Losses expected in future\n• Carryforwards expiring unused\n\n**Positive (may avoid allowance):**\n• Existing taxable temporary differences reversing\n• Future taxable income from existing contracts\n• Tax planning strategies available\n\n**Journal Entry:**\nDr. Income Tax Expense (or OCI)\n  Cr. Valuation Allowance (contra to DTA)",
        },
        {
          title: '⚠️ Exam Trap: Rate Changes',
          type: 'warning',
          content: "**Deferred taxes are measured at ENACTED future rates!**\n\nIf tax rates change:\n• Remeasure ALL deferred taxes at new rate\n• Recognize adjustment in income tax expense\n\n**Example:**\nDTL of $10,000 at 35% rate\nNew rate enacted: 21%\nNew DTL = ($10,000 / 0.35) × 0.21 = $6,000\nBenefit recognized: $4,000 reduction in tax expense\n\n**Watch for:** Questions with \"enacted\" vs. \"proposed\" rates - only ENACTED matters!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Temporary differences reverse; permanent differences never do",
            "DTL = future taxable amount (book > tax now)",
            "DTA = future deductible amount (tax > book now)",
            "Use balance sheet approach: compare book and tax basis",
            "Valuation allowance if more-likely-than-not DTA won't be realized",
            "Use ENACTED tax rates for measurement",
            "Rate changes require remeasurement through income tax expense",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-A-007',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Stockholders\' Equity Transactions',
    description: 'Account for stock issuances, treasury stock, dividends, and stock splits',
    order: 7,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Stock issuance', 'Treasury stock', 'Dividends', 'Stock splits'],
    blueprintArea: 'CMA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "CMAs advise on capital structure decisions, dividend policies, and stock compensation. Understanding equity transactions is essential for financial analysis, EPS calculations, and communicating with investors about capital allocation strategies.",
        },
        {
          title: 'Components of Stockholders\' Equity',
          type: 'text',
          content: "**Contributed Capital:**\n• **Common Stock:** Par value × shares issued\n• **Preferred Stock:** Par value × shares issued\n• **Additional Paid-in Capital (APIC):** Amount received above par\n\n**Earned Capital:**\n• **Retained Earnings:** Cumulative net income less dividends\n\n**Other:**\n• **Accumulated Other Comprehensive Income (AOCI):** OCI items not in net income\n• **Treasury Stock:** Cost of repurchased shares (contra-equity)",
        },
        {
          title: 'Stock Issuance',
          type: 'text',
          content: "**Issuance at par:**\nDr. Cash (par × shares)\n  Cr. Common Stock (par × shares)\n\n**Issuance above par:**\nDr. Cash (issue price × shares)\n  Cr. Common Stock (par × shares)\n  Cr. APIC - Common Stock (excess)\n\n**Example:**\nIssue 1,000 shares, $1 par, at $15 per share\nDr. Cash $15,000\n  Cr. Common Stock $1,000\n  Cr. APIC $14,000\n\n**No-par stock:** All proceeds to Common Stock (or designate stated value)",
        },
        {
          title: 'Treasury Stock: Cost Method',
          type: 'text',
          content: "**Cost Method (most common):**\n\n**Acquisition:**\nDr. Treasury Stock (cost)\n  Cr. Cash\n\n**Reissuance above cost:**\nDr. Cash\n  Cr. Treasury Stock (cost)\n  Cr. APIC - Treasury Stock (gain)\n\n**Reissuance below cost:**\nDr. Cash\nDr. APIC - Treasury Stock (to extent available)\nDr. Retained Earnings (if APIC exhausted)\n  Cr. Treasury Stock (cost)\n\n**Key:** Never recognize gain/loss on own stock transactions!",
        },
        {
          title: '🧠 Memory Aid: Dividend Dates',
          type: 'callout',
          content: "**\"DERP\"** - Four key dividend dates:\n\n**D**eclaration Date - Board declares dividend (liability created)\n**E**x-dividend Date - Stock trades without dividend (set by exchange)\n**R**ecord Date - Shareholders on record receive dividend\n**P**ayment Date - Cash actually paid\n\n**Journal entries only on Declaration and Payment dates!**",
        },
        {
          title: 'Cash Dividends',
          type: 'text',
          content: "**Declaration Date:**\nDr. Retained Earnings (or Dividends Declared)\n  Cr. Dividends Payable\n\n**Payment Date:**\nDr. Dividends Payable\n  Cr. Cash\n\n**Dividend Calculation:**\nTotal Dividend = Dividend per share × Shares outstanding\n\n**Watch for preferred dividends:**\n• Cumulative preferred: Must pay ALL past and current before common\n• Non-cumulative: Only current year's dividends required\n• Participating: May share in additional dividends with common",
        },
        {
          title: 'Stock Dividends vs. Stock Splits',
          type: 'table',
          headers: ['Feature', 'Stock Dividend', 'Stock Split'],
          rows: [
            ['What happens', 'New shares issued to existing holders', 'Each share becomes multiple shares'],
            ['Par value', 'Stays the same', 'Reduced proportionally'],
            ['Total equity', 'No change', 'No change'],
            ['Journal entry', 'Yes (small vs. large treatment)', 'Memo entry only'],
            ['Retained earnings', 'Decreases', 'No change'],
          ],
        },
        {
          title: 'Stock Dividend Accounting',
          type: 'text',
          content: "**Small Stock Dividend (< 20-25%):**\nDr. Retained Earnings (FMV × new shares)\n  Cr. Common Stock (par × new shares)\n  Cr. APIC (excess of FMV over par)\n\n**Large Stock Dividend (≥ 20-25%):**\nDr. Retained Earnings (par × new shares)\n  Cr. Common Stock (par × new shares)\n\n**Example (Small):**\n10% dividend on 10,000 shares, $1 par, $25 FMV\nNew shares: 1,000\nDr. Retained Earnings $25,000\n  Cr. Common Stock $1,000\n  Cr. APIC $24,000",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Stock issuance: Common Stock at par, excess to APIC",
            "Treasury stock reduces total equity (contra-equity account)",
            "Cost method: Record treasury stock at acquisition cost",
            "No gains/losses recognized on treasury stock transactions",
            "Dividend dates: Declaration (liability), Payment (cash outflow)",
            "Small stock dividends: FMV transferred from Retained Earnings",
            "Stock splits: Memo entry only, par value decreases proportionally",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-A-008',
    courseId: 'cma',
    section: 'CMA1',
    title: 'SEC Reporting and FASB Framework',
    description: 'Understand SEC filing requirements and the FASB conceptual framework',
    order: 8,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['10-K', '10-Q', '8-K', 'Conceptual framework', 'GAAP hierarchy'],
    blueprintArea: 'CMA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "CMAs working for public companies must understand SEC filing requirements and deadlines. The FASB conceptual framework guides accounting policy choices when specific standards don't address an issue. This knowledge is essential for financial reporting leadership roles.",
        },
        {
          title: 'Major SEC Filings',
          type: 'table',
          headers: ['Form', 'Purpose', 'Deadline', 'Key Contents'],
          rows: [
            ['10-K', 'Annual report', '60-90 days after FYE', 'Audited financials, MD&A, risk factors'],
            ['10-Q', 'Quarterly report', '40-45 days after quarter', 'Reviewed financials, MD&A updates'],
            ['8-K', 'Current report', '4 business days', 'Material events (M&A, officer changes)'],
            ['Proxy Statement', 'Shareholder meeting', 'Before annual meeting', 'Compensation, governance, voting items'],
            ['S-1', 'IPO registration', 'Before going public', 'Full business and financial disclosure'],
          ],
        },
        {
          title: 'Filer Categories and Deadlines',
          type: 'text',
          content: "**Large Accelerated Filer:** Public float ≥ $700M\n• 10-K: 60 days\n• 10-Q: 40 days\n\n**Accelerated Filer:** Public float $75M - $700M\n• 10-K: 75 days\n• 10-Q: 40 days\n\n**Non-accelerated Filer:** Public float < $75M\n• 10-K: 90 days\n• 10-Q: 45 days\n\n**Public float = market value of shares held by non-affiliates**",
        },
        {
          title: 'FASB Conceptual Framework',
          type: 'text',
          content: "**Purpose:** Guides development of accounting standards and helps resolve issues not addressed by specific standards.\n\n**Objective of Financial Reporting:**\nProvide information useful to existing and potential investors, lenders, and other creditors in making decisions about providing resources.\n\n**Primary Users:** Investors and creditors (capital providers)",
        },
        {
          title: 'Qualitative Characteristics',
          type: 'text',
          content: "**Fundamental Characteristics:**\n\n**Relevance:**\n• Predictive value - helps predict future\n• Confirmatory value - confirms past predictions\n• Materiality - could influence decisions\n\n**Faithful Representation:**\n• Complete - all necessary information\n• Neutral - unbiased\n• Free from error - no mistakes in process\n\n**Enhancing Characteristics:**\n• Comparability (across companies)\n• Verifiability (others can agree)\n• Timeliness (available when needed)\n• Understandability (clear presentation)",
        },
        {
          title: '🧠 Memory Aid: Faithful Representation',
          type: 'callout',
          content: "**\"CNF\"** - Faithful Representation requires:\n\n**C**omplete - Nothing missing that could affect decisions\n**N**eutral - No bias toward particular outcome  \n**F**ree from error - Process was carefully applied\n\n**Note:** \"Free from error\" doesn't mean perfectly accurate - estimates are allowed!",
        },
        {
          title: 'GAAP Hierarchy',
          type: 'text',
          content: "**When specific guidance exists:**\n\n**Category A (Authoritative):**\n• FASB Accounting Standards Codification (ASC)\n• SEC rules and interpretive releases (for SEC registrants)\n\n**When no specific guidance:**\n• Consider similar transactions in the Codification\n• Apply conceptual framework\n• May consider non-authoritative guidance (AICPA, IFRS)\n\n**The Codification is the single source of authoritative GAAP!**",
        },
        {
          title: 'Elements of Financial Statements',
          type: 'table',
          headers: ['Element', 'Definition', 'Examples'],
          rows: [
            ['Assets', 'Probable future economic benefits controlled by entity', 'Cash, receivables, equipment'],
            ['Liabilities', 'Probable future sacrifices from past transactions', 'Payables, debt, deferred revenue'],
            ['Equity', 'Residual interest (A - L)', 'Common stock, retained earnings'],
            ['Revenues', 'Inflows from delivering goods/services', 'Sales, service revenue, interest income'],
            ['Expenses', 'Outflows from delivering goods/services', 'COGS, wages, depreciation'],
            ['Gains', 'Increases in equity from peripheral transactions', 'Gain on sale of equipment'],
            ['Losses', 'Decreases in equity from peripheral transactions', 'Loss on lawsuit'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "10-K (annual), 10-Q (quarterly), 8-K (current events) are key SEC filings",
            "Filing deadlines depend on filer category (based on public float)",
            "Conceptual framework: Relevance and Faithful Representation are fundamental",
            "Faithful Representation = Complete, Neutral, Free from Error",
            "FASB ASC is the single source of authoritative GAAP",
            "Conceptual framework used when specific guidance doesn't exist",
            "Five elements: Assets, Liabilities, Equity, Revenues, Expenses (plus Gains/Losses)",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCMA1ALessons = () => cma1ALessons;
export const getCMA1ALessonById = (id: string) => cma1ALessons.find(lesson => lesson.id === id);
export const getCMA1ALessonCount = () => cma1ALessons.length;

export default cma1ALessons;
