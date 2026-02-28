/**
 * EA Part 2: Businesses - Lesson Content
 * Special Enrollment Examination (SEE)
 * 
 * Complete lesson content for Part 2 covering:
 * - Business entities and formations
 * - Business income and expenses
 * - Partnerships and S corporations
 * - C corporations
 * - Specialized returns
 * - Retirement plans
 * 
 * Based on IRS SEE Content Outline
 * Tax law as of December 31, 2024
 */

import { Lesson } from '../../../types';

export const eaPart2Lessons: Lesson[] = [
  // ============================================================================
  // SEE2-1: BUSINESS ENTITIES, TAXPAYER DATA (Lessons 1-12)
  // ============================================================================
  
  {
    id: 'SEE2-001',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Entity Classification and Selection',
    description: 'Understand the different business entity types and their tax implications',
    order: 1,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Sole proprietorship', 'Partnership', 'S corp', 'C corp', 'LLC'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Entity selection is one of the most important decisions a business makes! The choice affects taxes, liability, operations, and exit strategies. As an EA, you'll help clients evaluate and sometimes change their entity structure.",
        },
        {
          title: 'Entity Comparison Chart',
          type: 'table',
          headers: ['Feature', 'Sole Prop', 'Partnership', 'S Corp', 'C Corp'],
          rows: [
            ['Formation', 'Automatic', 'Agreement', 'State + IRS election', 'State filing'],
            ['Owners', '1', '2+', '1-100', 'Unlimited'],
            ['Liability protection', 'None', 'None (GP)', 'Yes', 'Yes'],
            ['Pass-through taxation', 'Yes', 'Yes', 'Yes', 'No (double tax)'],
            ['Self-employment tax', 'All profit', 'Partners\' share', 'Wages only', 'N/A'],
            ['Tax form', 'Sch C', 'Form 1065', 'Form 1120-S', 'Form 1120'],
          ],
        },
        {
          title: 'Sole Proprietorship',
          type: 'text',
          content: "**Simplest form - you ARE the business**\n\n**Characteristics:**\n• No separate entity for tax purposes\n• Report income/expenses on Schedule C\n• Owner is personally liable for all debts\n• Self-employment tax on net profit\n\n**Formed:** Automatically when you start doing business alone\n\n**Common for:** Freelancers, consultants, small retailers",
        },
        {
          title: 'Partnership',
          type: 'text',
          content: "**Two+ persons carrying on business as co-owners**\n\n**Types:**\n• General Partnership (GP) - all partners have management rights and liability\n• Limited Partnership (LP) - at least one GP, limited partners have limited liability\n• Limited Liability Partnership (LLP) - professional services, protects from other partners' malpractice\n\n**Tax Treatment:**\n• Entity files Form 1065 (informational)\n• Income/loss passes through to partners via K-1\n• Partners pay tax on their share, even if not distributed\n• No entity-level tax (pass-through)",
        },
        {
          title: 'S Corporation',
          type: 'text',
          content: "**Corporation that elects pass-through taxation**\n\n**Requirements (Eligibility Rules):**\n• Domestic corporation\n• ≤100 shareholders (family members count as one)\n• Only one class of stock (voting differences allowed)\n• Shareholders must be individuals, estates, certain trusts\n• No nonresident alien shareholders\n• Not a bank, insurance company, or DISC\n\n**File Form 2553** to elect S status (by March 15 for calendar year)\n\n**Advantages:**\n• Pass-through taxation (no double tax)\n• Limit SE tax to reasonable compensation\n• Liability protection",
        },
        {
          title: 'C Corporation',
          type: 'text',
          content: "**Traditional corporation with entity-level taxation**\n\n**Characteristics:**\n• Separate legal and tax entity\n• Corporate tax rate: 21% (flat rate)\n• Double taxation: corporate tax + dividend tax\n• Unlimited shareholders, any stock structure\n\n**When C Corp makes sense:**\n• Planning to go public\n• Need flexible stock structures\n• Reinvesting profits (21% rate lower than individual rates)\n• Qualified small business stock exclusion (Section 1202)",
        },
        {
          title: 'LLC Tax Classification',
          type: 'text',
          content: "**LLCs are \"check-the-box\" entities**\n\n**Default Classification:**\n• Single-member LLC = Disregarded (sole proprietorship)\n• Multi-member LLC = Partnership\n\n**Can Elect:**\n• Corporation (then S election if desired)\n• Must file Form 8832 to change classification\n\n**Key:** LLC is a state law concept; IRS looks at tax classification!",
        },
        {
          title: '🧠 Memory Aid: Entity Selection',
          type: 'callout',
          content: "**\"SPICE\"** factors for entity choice:\n\n**S**elf-employment tax minimization\n**P**ass-through vs. entity-level taxation\n**I**nvestors and ownership structure needs\n**C**omplexity tolerance (filings, formalities)\n**E**xit strategy (sale, IPO, succession)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sole proprietorship = simplest, but no liability protection",
            "Partnership = pass-through for 2+ owners, report on Form 1065",
            "S corporation = pass-through with liability protection, strict rules",
            "C corporation = double taxation but maximum flexibility",
            "LLC is a state law creature - tax classification is separate",
            "Form 8832 changes LLC tax classification",
            "Form 2553 elects S corporation status",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-002',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Schedule C: Reporting Business Income',
    description: 'Master the proper reporting of sole proprietorship income and expenses',
    order: 2,
    duration: 50,
    difficulty: 'beginner',
    topics: ['Gross receipts', 'COGS', 'Business expenses', 'Home office'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Schedule C is one of the most common business forms you'll prepare. Understanding what income to report, what expenses are deductible, and how to calculate net profit is essential for every tax practitioner.",
        },
        {
          title: 'Schedule C Structure',
          type: 'text',
          content: "**Part I - Income:**\n• Gross receipts or sales\n• Returns and allowances\n• Cost of goods sold\n• = Gross profit\n• + Other income\n• = Gross income\n\n**Part II - Expenses:**\n• Advertising, car expenses, depreciation\n• Insurance, interest, legal/professional\n• Rent, repairs, supplies, utilities, wages\n• Other expenses (attach explanation)\n\n**Bottom Line:**\nGross income - Total expenses = Net profit (or loss)",
        },
        {
          title: 'Gross Receipts',
          type: 'text',
          content: "**Include ALL income from business:**\n\n• Cash received\n• Checks received\n• Credit card payments\n• Bartering (fair market value)\n• Cancelled debt (if business debt)\n• Kickbacks and rebates\n\n**Report when constructively received:**\nIf amount is available to you, it's income - even if you haven't deposited it yet.",
        },
        {
          title: 'Cost of Goods Sold',
          type: 'text',
          content: "**For businesses that sell products:**\n\n**Calculation:**\nBeginning inventory\n+ Purchases\n+ Labor costs (direct)\n+ Materials and supplies\n+ Other costs\n= Cost of goods available for sale\n- Ending inventory\n= **Cost of Goods Sold**\n\n**Inventory methods:**\n• FIFO (First-In, First-Out)\n• LIFO (Last-In, First-Out) - election required\n• Average cost\n• Specific identification",
        },
        {
          title: 'Common Deductible Business Expenses',
          type: 'table',
          headers: ['Expense Category', 'Examples', 'Notes'],
          rows: [
            ['Advertising', 'Ads, business cards, website', 'Fully deductible'],
            ['Car and truck', 'Actual expenses or standard mileage', '67¢/mile (2024)'],
            ['Depreciation', 'Equipment, vehicles, improvements', 'Form 4562'],
            ['Insurance', 'Liability, property, malpractice', 'Not health insurance here'],
            ['Legal/professional', 'Accountant, attorney, consultants', 'Business-related'],
            ['Office expense', 'Supplies, software, postage', 'Ordinary/necessary'],
            ['Rent', 'Office, equipment', 'Not home office here'],
            ['Utilities', 'Phone, internet, electricity', 'Business portion'],
          ],
        },
        {
          title: 'Home Office Deduction',
          type: 'text',
          content: "**Two methods:**\n\n**1. Simplified Method:**\n• $5 per square foot\n• Maximum 300 sq ft\n• Maximum deduction: $1,500\n• No depreciation, no carryover\n\n**2. Regular Method:**\n• Calculate business % of home (sq ft or rooms)\n• Actual expenses × business %\n• Include mortgage interest, taxes, insurance, utilities, depreciation\n• Can create home office carryover\n\n**Exclusive and Regular Use Required:**\nArea must be used exclusively and regularly for business (daycare and storage have exceptions).",
        },
        {
          title: '⚠️ Exam Trap: Self-Employment Tax',
          type: 'warning',
          content: "**Net Profit from Schedule C is Subject to Self-Employment Tax!**\n\n• Social Security: 12.4% on first $168,600 (2024)\n• Medicare: 2.9% on all earnings\n• Additional Medicare: 0.9% over $200K ($250K MFJ)\n\n**Deductible:** 50% of SE tax is above-the-line deduction\n\n**Key:** This is separate from income tax - clients often forget about SE tax!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Report all gross receipts when constructively received",
            "COGS available for businesses selling products",
            "Expenses must be ordinary and necessary",
            "Home office: simplified ($5/sq ft max $1,500) or regular method",
            "Net profit subject to self-employment tax (15.3%)",
            "50% of SE tax is deductible above-the-line",
            "Standard mileage rate 67¢/mile for 2024",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-003',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Accounting Methods and Tax Years',
    description: 'Understand cash vs. accrual accounting and permitted tax years',
    order: 3,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Cash method', 'Accrual method', 'Fiscal year', 'Tax year changes'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Accounting method determines WHEN income and expenses are recognized. Tax year determines the 12-month period for reporting. Getting these wrong can cause major problems with the IRS.",
        },
        {
          title: 'Cash vs. Accrual Method',
          type: 'table',
          headers: ['Feature', 'Cash Method', 'Accrual Method'],
          rows: [
            ['Income recognized', 'When received', 'When earned'],
            ['Expenses deducted', 'When paid', 'When incurred'],
            ['Inventory required?', 'Generally no', 'Yes (if applicable)'],
            ['Who can use?', 'Most small businesses', 'Required for some'],
            ['Simplicity', 'Simpler', 'More complex'],
          ],
        },
        {
          title: 'Cash Method Details',
          type: 'text',
          content: "**Income Recognition:**\n• When actually or constructively received\n• Constructive receipt = available to you without restriction\n• Checks count when received, not when deposited\n\n**Expense Deduction:**\n• When paid (check mailed counts as paid)\n• Credit card charges deductible when charged\n• Prepaid expenses: may require capitalization if > 12 months\n\n**Who Must Use Accrual:**\n• C corporations with > $30 million gross receipts (3-year avg)\n• Tax shelters\n• Businesses with inventory (exceptions for small taxpayers)",
        },
        {
          title: 'Accrual Method Details',
          type: 'text',
          content: "**Income Recognition - All Events Test:**\n• All events have occurred to fix the right to receive\n• Amount can be determined with reasonable accuracy\n• Economic performance has occurred (usually)\n\n**Economic Performance:**\n• Services/property provided TO you: as performed/provided\n• Services/property provided BY you: as you perform/provide\n• Use of property: as used\n\n**Expense Deduction:**\n• Must meet all events test AND economic performance\n• Some exceptions for recurring items",
        },
        {
          title: 'Tax Years',
          type: 'text',
          content: "**Calendar Year:** January 1 - December 31\n**Fiscal Year:** Any 12-consecutive-month period ending on last day of a month (not December)\n**52-53 Week Year:** Ends same day of week closest to month end\n\n**Who MUST use Calendar Year:**\n• Individuals (unless proper books)\n• S corporations (unless business purpose)\n• Personal service corporations (unless business purpose)\n• Partnerships with individual partners (matching requirement)",
        },
        {
          title: 'Changing Accounting Method',
          type: 'text',
          content: "**Generally requires IRS approval:**\n\n**Form 3115:** Application for Change in Accounting Method\n\n**Automatic approval** available for many changes\n\n**Section 481(a) Adjustment:**\n• Prevents double-counting or skipping income/deductions\n• Positive adjustment (increased income): spread over 4 years\n• Negative adjustment: take in year of change\n\n**Must have specific permission to use method originally - can't just start using different method!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Cash method: income when received, expenses when paid",
            "Accrual method: income when earned, expenses when incurred",
            "Most small businesses can use cash method",
            "Large C corps (>$30M receipts) must use accrual",
            "Calendar year is January 1 - December 31",
            "Form 3115 required to change accounting method",
            "Section 481(a) adjustment prevents duplication or omission",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-004',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Business Deductions: General Rules',
    description: 'Master the requirements for deducting business expenses',
    order: 4,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Ordinary and necessary', 'Capital expenses', 'Start-up costs'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Not everything a business pays for is deductible! Knowing the difference between current deductions, capital expenditures, and non-deductible items is fundamental to tax practice.",
        },
        {
          title: 'The Ordinary and Necessary Test',
          type: 'text',
          content: "**Section 162: Trade or Business Expenses**\n\nTo be deductible, an expense must be:\n\n**1. Ordinary:**\n• Common and accepted in your type of business\n• Not necessarily frequent - just normal for industry\n\n**2. Necessary:**\n• Helpful and appropriate for business\n• Need not be indispensable\n\n**3. Paid or incurred during the tax year**\n\n**4. Connected to your trade or business**\n\n**Key:** Both tests must be met!",
        },
        {
          title: 'Capital vs. Current Expenses',
          type: 'table',
          headers: ['Capital (Must Capitalize)', 'Current (Deductible Now)'],
          rows: [
            ['Buying equipment or building', 'Repairs and maintenance'],
            ['Improvements that add value', 'Small tools and supplies'],
            ['Extending useful life', 'Regular maintenance'],
            ['Adapting to new use', 'Incidental repairs'],
            ['Starting a new business', 'Operating an existing business'],
          ],
        },
        {
          title: 'Start-Up Costs',
          type: 'text',
          content: "**What are Start-Up Costs?**\nCosts incurred before business begins that would be deductible if incurred in an existing business.\n\n**Examples:**\n• Market surveys\n• Training employees\n• Travel to secure suppliers/customers\n• Professional fees (accounting, legal setup)\n\n**Treatment:**\n• Deduct first $5,000 in year business begins\n• $5,000 reduced dollar-for-dollar if costs exceed $50,000\n• Remainder amortized over 180 months\n\n**Organizational Costs:** Same treatment for partnership/corporate formation costs.",
        },
        {
          title: 'Non-Deductible Expenses',
          type: 'list',
          content: [
            "Federal income tax payments",
            "Penalties and fines to government",
            "Bribes and kickbacks (illegal payments)",
            "Political contributions",
            "Lobbying expenses (with exceptions)",
            "Personal living expenses",
            "Capital expenditures (unless depreciated/amortized)",
            "Expenses not related to business",
          ],
        },
        {
          title: '⚠️ Exam Trap: Meals and Entertainment',
          type: 'warning',
          content: "**Current Rules (Post-TCJA):**\n\n**Business Meals:** 50% deductible\n• Must be directly related to business\n• Not lavish or extravagant\n• Taxpayer or employee present\n\n**Entertainment:** 0% deductible\n• Golf, concerts, sporting events = NOT deductible\n• Even if business is discussed\n\n**Exception:** Food/beverage provided separately from entertainment may still be 50% deductible.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Expenses must be ordinary AND necessary to be deductible",
            "Capital expenditures must be depreciated/amortized",
            "Start-up costs: $5,000 immediate, rest amortized 180 months",
            "Federal taxes and penalties are not deductible",
            "Business meals: 50% deductible",
            "Entertainment expenses: NOT deductible (post-TCJA)",
            "Personal expenses never deductible",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-005',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Depreciation Fundamentals',
    description: 'Understand MACRS depreciation methods and conventions',
    order: 5,
    duration: 60,
    difficulty: 'intermediate',
    topics: ['MACRS', 'Recovery periods', 'Conventions', 'Listed property'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Depreciation is how businesses recover the cost of capital assets over time. MACRS rules determine how much deduction you get each year. This is heavily tested on the SEE!",
        },
        {
          title: 'MACRS Recovery Periods',
          type: 'table',
          headers: ['Property Class', 'Examples', 'Recovery Period'],
          rows: [
            ['3-year', 'Tractor units, race horses', '3 years'],
            ['5-year', 'Computers, vehicles, office equipment', '5 years'],
            ['7-year', 'Office furniture, most machinery', '7 years'],
            ['15-year', 'Land improvements, fencing, roads', '15 years'],
            ['27.5-year', 'Residential rental property', '27.5 years'],
            ['39-year', 'Nonresidential real property', '39 years'],
          ],
        },
        {
          title: 'MACRS Methods',
          type: 'text',
          content: "**Personal Property (3, 5, 7, 10, 15, 20-year):**\n• 200% declining balance (default for most)\n• Switch to straight-line when beneficial\n\n**Real Property:**\n• Straight-line only\n• 27.5 years for residential rental\n• 39 years for nonresidential\n\n**Alternative Depreciation System (ADS):**\n• Straight-line over longer periods\n• Required for some property (tax-exempt use, etc.)\n• May elect for any property",
        },
        {
          title: 'Depreciation Conventions',
          type: 'table',
          headers: ['Convention', 'When Used', 'Effect'],
          rows: [
            ['Half-Year', 'Default for personal property', 'Half-year depreciation in first and last year'],
            ['Mid-Quarter', 'If >40% placed in service in Q4', 'Depreciation based on quarter placed in service'],
            ['Mid-Month', 'Real property only', 'Depreciation based on month placed in service'],
          ],
        },
        {
          title: '🧠 Memory Aid: Vehicle Depreciation Limits',
          type: 'callout',
          content: "**Luxury Auto Limits (2024):**\n\n**Passenger Vehicles (not SUVs over 6,000 lbs GVW):**\n• Year 1: $12,200 (or $20,200 with bonus)\n• Year 2: $19,500\n• Year 3: $11,700\n• Year 4+: $6,960 per year\n\n**SUVs/Trucks over 6,000 lbs:**\n• No luxury limits (but watch listed property rules)\n• Section 179 limited to $30,500",
        },
        {
          title: 'Listed Property',
          type: 'text',
          content: "**What is Listed Property:**\n• Passenger vehicles\n• Entertainment/recreation property\n• Computers (unless used exclusively at regular business establishment)\n\n**Special Requirements:**\n• Must keep records of business/personal use\n• Business use > 50% required for MACRS/Section 179\n• If business use drops to ≤ 50%, must recapture excess depreciation\n\n**Employees:** Must be for convenience of employer and required as condition of employment to claim depreciation.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "MACRS is the standard depreciation method",
            "Computers and vehicles are 5-year property",
            "Office furniture is 7-year property",
            "Real property: 27.5 years residential, 39 years nonresidential",
            "Half-year convention is default; mid-quarter if Q4 > 40%",
            "Luxury auto limits cap depreciation on expensive vehicles",
            "Listed property requires business use records",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-006',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Section 179 and Bonus Depreciation',
    description: 'Master the accelerated cost recovery methods',
    order: 6,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Section 179', 'Bonus depreciation', 'Limits', 'Phase-out'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Section 179 and bonus depreciation allow immediate deduction of asset costs! Understanding when to use each and the interplay between them is essential for tax planning.",
        },
        {
          title: 'Section 179 Overview (2024)',
          type: 'text',
          content: "**What is Section 179?**\nAn election to expense (deduct immediately) the cost of qualifying property instead of depreciating over time.\n\n**2024 Limits:**\n• Maximum deduction: $1,220,000\n• Phase-out threshold: $3,050,000\n• Completely phased out: $4,270,000\n\n**The phase-out:**\nSection 179 limit reduced dollar-for-dollar by amount of qualifying property placed in service over $3,050,000.",
        },
        {
          title: 'Section 179 Qualifying Property',
          type: 'list',
          content: [
            "Tangible personal property (machinery, equipment)",
            "Off-the-shelf computer software",
            "Qualified improvement property (roof, HVAC, fire protection, security)",
            "Certain real property (qualified retail, restaurant, leasehold improvements)",
            "Property used predominantly (>50%) for business",
            "Property purchased (not inherited or gifted)",
          ],
        },
        {
          title: 'Section 179 Limitations',
          type: 'text',
          content: "**Cannot exceed:**\n1. Cost of qualifying property\n2. Taxable income from all active trades/businesses\n\n**Income Limitation:**\nCannot create or increase a net operating loss\n\n**Exception:** Unused Section 179 carries forward indefinitely\n\n**SUVs:** Limited to $30,500 (2024) for vehicles over 6,000 lbs GVW",
        },
        {
          title: 'Bonus Depreciation',
          type: 'text',
          content: "**What is Bonus Depreciation?**\nAutomatic first-year depreciation for qualifying property. Unlike Section 179, it's not an election (though can elect out).\n\n**2024 Rate:** 60% (phasing down)\n• 2023: 80%\n• 2024: 60%\n• 2025: 40%\n• 2026: 20%\n• 2027: 0%\n\n**After bonus:** Remaining basis depreciated under MACRS",
        },
        {
          title: 'Bonus Depreciation Rules',
          type: 'table',
          headers: ['Feature', 'Section 179', 'Bonus Depreciation'],
          rows: [
            ['Election required?', 'Yes - taxpayer elects', 'Automatic (can elect out)'],
            ['Property limit', 'Dollar limit with phase-out', 'No limit'],
            ['Income limitation?', 'Yes - cannot exceed business income', 'No - can create NOL'],
            ['Original use required?', 'No - used property OK', 'No - used OK (since TCJA)'],
            ['Passenger vehicle limit?', 'Yes', 'Yes'],
            ['Real property?', 'Limited categories', '15-year property and shorter'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Order of Application',
          type: 'warning',
          content: "**When applying depreciation methods:**\n\n1. **Section 179** first (if elected)\n2. **Bonus Depreciation** on remaining basis\n3. **MACRS** on remaining basis after 1 and 2\n\n**Example:**\n• $100,000 equipment placed in service\n• Elect $40,000 Section 179\n• Bonus on remaining $60,000 × 60% = $36,000\n• MACRS on remaining $24,000",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Section 179 limit: $1,220,000 (2024), phase-out begins at $3,050,000",
            "Section 179 limited to business income - cannot create NOL",
            "Bonus depreciation: 60% for 2024 (phasing down to 0% by 2027)",
            "Bonus can create or increase NOL",
            "SUV Section 179 limit: $30,500",
            "Apply Section 179 first, then bonus, then MACRS",
            "Both can apply to same asset in correct order",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE2-2: BUSINESS FINANCIAL INFORMATION - Continued (Lessons 7-12)
  // ============================================================================

  {
    id: 'SEE2-007',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Inventory Accounting',
    description: 'Master inventory methods and cost of goods sold calculations',
    order: 7,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['FIFO', 'LIFO', 'COGS', 'Lower of cost or market'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Inventory accounting directly affects taxable income! The method chosen can significantly impact taxes in periods of changing prices. Understanding these methods is essential for business clients.",
        },
        {
          title: 'When Inventory Required',
          type: 'text',
          content: "**Inventory required when:**\n• Selling merchandise\n• Manufacturing goods\n\n**Small Business Exception:**\n• Average annual gross receipts ≤ $29 million (2024)\n• Can treat inventory as non-incidental materials/supplies\n• Deduct when used or consumed\n\n**If inventory required:** Must use accrual method for purchases and sales",
        },
        {
          title: 'Inventory Methods',
          type: 'table',
          headers: ['Method', 'Description', 'Effect in Rising Prices'],
          rows: [
            ['FIFO', 'First-In, First-Out', 'Lower COGS, higher income, higher tax'],
            ['LIFO', 'Last-In, First-Out', 'Higher COGS, lower income, lower tax'],
            ['Specific ID', 'Track each item', 'Varies by items sold'],
            ['Average Cost', 'Weighted average of all', 'Middle ground'],
          ],
        },
        {
          title: 'LIFO Special Rules',
          type: 'text',
          content: "**LIFO Election:**\n• Once elected, generally cannot change without IRS approval\n• Must use for financial statements if used for tax (conformity rule)\n• May produce lower tax in rising price environment\n\n**LIFO Reserve:**\nDifference between FIFO and LIFO inventory values. Can be significant!\n\n**LIFO Recapture:**\nIf converting from C corp to S corp, must recapture LIFO reserve into income (over 4 years).",
        },
        {
          title: 'Lower of Cost or Market (LCM)',
          type: 'text',
          content: "**Can value inventory at lower of cost or market:**\n\n**Market = Replacement Cost**\nBut limited to:\n• Ceiling: Net realizable value (selling price minus disposal costs)\n• Floor: NRV minus normal profit margin\n\n**Cannot use with LIFO!**\n\n**Used for:** Damaged, obsolete, or slow-moving inventory",
        },
        {
          title: 'COGS Calculation',
          type: 'text',
          content: "**Cost of Goods Sold:**\n\nBeginning Inventory\n+ Purchases\n+ Direct Labor (manufacturing)\n+ Other Costs (freight-in, allocation of overhead)\n= Cost of Goods Available for Sale\n- Ending Inventory\n= **Cost of Goods Sold**\n\n**Note:** COGS is an offset to gross receipts, not a deduction.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Inventory required for businesses selling merchandise",
            "Small business exception: ≤ $29 million average gross receipts",
            "FIFO = lower COGS in rising prices (higher tax)",
            "LIFO = higher COGS in rising prices (lower tax)",
            "LIFO conformity rule: must use for financial statements",
            "LCM can write down damaged/obsolete inventory",
            "LIFO recapture required on C-to-S conversion",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-008',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Business Interest Expense Limitation',
    description: 'Understand Section 163(j) business interest limitation',
    order: 8,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Section 163(j)', 'ATI', 'Carryforward', 'Small business exception'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "TCJA limited business interest deductions! Large businesses can only deduct interest up to a percentage of income. Understanding these rules is critical for business clients with significant debt.",
        },
        {
          title: 'Section 163(j) Overview',
          type: 'text',
          content: "**Limitation Rule:**\nBusiness interest expense deduction limited to:\n\n**30% of Adjusted Taxable Income (ATI)**\nPlus: Business interest income\nPlus: Floor plan financing interest\n\n**Excess is not lost** - carries forward indefinitely",
        },
        {
          title: 'Calculating ATI',
          type: 'text',
          content: "**Adjusted Taxable Income (ATI):**\n\nTaxable income\n+ Business interest expense\n+ Net operating loss deduction\n+ Section 199A deduction (QBI)\n+ Depreciation, amortization, depletion (for years before 2022)\n\n**Note:** Starting 2022, depreciation, amortization, and depletion are NOT added back. This reduced ATI for many businesses!",
        },
        {
          title: 'Small Business Exception',
          type: 'text',
          content: "**Exempt from limitation:**\n\nBusinesses with average annual gross receipts ≤ $29 million (2024) for prior 3 years.\n\n**What this means:**\n• Can deduct all business interest\n• No ATI calculation required\n• Same threshold as other small business simplifications\n\n**Test applied at entity level** (aggregation rules may apply)",
        },
        {
          title: 'Excluded Businesses',
          type: 'list',
          content: [
            "Real property trades or businesses (by election)",
            "Farming businesses (by election)",
            "Certain utilities",
            "Small businesses (< $29 million gross receipts)",
            "Note: Electing out requires using ADS depreciation for real property!",
          ],
        },
        {
          title: 'Carryforward Rules',
          type: 'text',
          content: "**Disallowed Interest:**\n• Carries forward indefinitely\n• Used when ATI allows\n• No expiration\n\n**Pass-through Entities:**\n• Limitation applied at entity level\n• Excess carryforward stays with entity\n• Only allowed interest passes to owners\n\n**Corporations:**\n• Carryforward travels with corporation",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Business interest limited to 30% of ATI",
            "Small business exception: ≤ $29 million average gross receipts",
            "Starting 2022, depreciation not added back to ATI",
            "Real property and farming businesses can elect out",
            "Electing out requires ADS depreciation",
            "Disallowed interest carries forward indefinitely",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-009',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Section 1231, 1245, and 1250 Property',
    description: 'Master the depreciation recapture and Section 1231 netting rules',
    order: 9,
    duration: 60,
    difficulty: 'advanced',
    topics: ['Section 1231', 'Section 1245', 'Section 1250', 'Recapture'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When businesses sell assets, the character of gain matters! Section 1231 provides capital gain treatment for gains but ordinary loss for losses - the best of both worlds. But watch for recapture!",
        },
        {
          title: 'Section 1231 Property',
          type: 'text',
          content: "**Section 1231 Property Includes:**\n\n• Depreciable business property held > 1 year\n• Real property used in trade or business held > 1 year\n• Timber, coal, and domestic iron ore\n• Livestock held for draft, breeding, dairy, or sporting\n• Unharvested crops\n\n**NOT Section 1231:**\n• Inventory\n• Property held for sale to customers\n• Copyrights, artistic compositions (by creator)",
        },
        {
          title: 'Section 1231 Netting Rules',
          type: 'text',
          content: "**The Best of Both Worlds:**\n\nStep 1: Net all 1231 gains and losses\n\n**If Net Gain:**\nTreated as long-term capital gain (up to 20% rate)\n\n**If Net Loss:**\nTreated as ordinary loss (fully deductible against ordinary income)\n\n**5-Year Lookback:**\nNet 1231 gain is ordinary income to extent of unrecaptured net 1231 losses from prior 5 years.",
        },
        {
          title: 'Section 1245 Recapture',
          type: 'text',
          content: "**Applies to Personal Property:**\n\n• Machinery, equipment, vehicles\n• Office furniture\n• Other tangible personal property\n\n**Recapture Rule:**\nGain is ordinary income to extent of ALL depreciation taken.\n\n**Example:**\n• Machinery: $100,000 cost, $60,000 depreciation\n• Adjusted basis: $40,000\n• Sold for $85,000\n• Gain: $45,000\n• Section 1245 recapture: $45,000 (all ordinary)\n• If sold for $110,000: $60,000 ordinary, $10,000 Section 1231 gain",
        },
        {
          title: 'Section 1250 Recapture',
          type: 'text',
          content: "**Applies to Real Property:**\n\n• Buildings\n• Structural components\n\n**Historical Rule:**\nRecapture excess of accelerated over straight-line depreciation as ordinary income.\n\n**Current Reality:**\nSince 1987, real property must use straight-line, so usually NO Section 1250 recapture.\n\n**Unrecaptured Section 1250 Gain:**\nThe straight-line depreciation on real property is taxed at maximum 25% rate (not 15%/20% capital gain rate).",
        },
        {
          title: 'Unrecaptured Section 1250 Gain',
          type: 'table',
          headers: ['Component', 'Tax Rate', 'Character'],
          rows: [
            ['Section 1250 recapture', 'Ordinary rates', 'Ordinary income'],
            ['Unrecaptured 1250 gain', '25% maximum', 'Capital gain'],
            ['Remaining 1231 gain', '0%/15%/20%', 'Long-term capital gain'],
          ],
        },
        {
          title: '🧠 Memory Aid: Recapture Order',
          type: 'callout',
          content: "**For business asset sales:**\n\n1. **Section 1245** - All depreciation on personal property = ordinary\n2. **Section 1250** - Excess depreciation on real property = ordinary (rare now)\n3. **Unrecaptured 1250** - Straight-line depreciation on real = 25% cap gain\n4. **Section 1231** - Remaining gain = LTCG; Net loss = ordinary",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Section 1231: Net gain = capital gain; Net loss = ordinary loss",
            "5-year lookback converts current gain to ordinary",
            "Section 1245: Personal property, all depreciation recaptured as ordinary",
            "Section 1250: Real property, excess depreciation recaptured (rare now)",
            "Unrecaptured 1250 gain: 25% maximum rate",
            "Order: 1245 recapture → 1250 recapture → Unrecaptured 1250 → 1231",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-010',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Net Operating Losses',
    description: 'Understand NOL calculation and carryforward rules',
    order: 10,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['NOL calculation', 'Carryforward', '80% limitation', 'Farming exception'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "NOLs let businesses offset future income with current losses! Understanding the current rules (post-TCJA, as modified) is essential for tax planning when businesses have loss years.",
        },
        {
          title: 'What is an NOL?',
          type: 'text',
          content: "**Net Operating Loss:**\nWhen business deductions exceed business income.\n\n**For Individuals:**\nNOL = Negative taxable income after certain modifications:\n• Add back personal exemptions\n• Add back non-business deductions exceeding non-business income\n• Add back NOL deduction from other years\n• Add back capital losses exceeding capital gains\n\n**Corporations:**\nSimpler calculation - negative taxable income without DRD limitation modifications.",
        },
        {
          title: 'Current NOL Rules (Post-TCJA)',
          type: 'text',
          content: "**For NOLs arising after 2020:**\n\n• **No carryback** (general rule)\n• **Unlimited carryforward**\n• **80% limitation**: Can only offset 80% of taxable income in carryforward year\n\n**Exception - Farming Losses:**\n• Can carry back 2 years\n• 80% limitation still applies in carryforward years\n\n**Exception - Certain Insurance Companies:**\nDifferent rules apply",
        },
        {
          title: 'Using NOL Carryforwards',
          type: 'text',
          content: "**Ordering:**\n• Oldest NOL used first (FIFO)\n• Apply to 80% of modified taxable income\n• Remainder carries forward\n\n**Example:**\n• 2024 taxable income (before NOL): $100,000\n• NOL carryforward available: $150,000\n• Maximum NOL deduction: $80,000 (80% × $100,000)\n• Taxable income after NOL: $20,000\n• Remaining NOL carryforward: $70,000",
        },
        {
          title: 'NOL for Pass-Through Entities',
          type: 'text',
          content: "**Partnerships and S Corporations:**\nNo entity-level NOL. Losses pass through to owners and may create NOL on their individual returns.\n\n**Limitations apply at owner level:**\n• Basis limitations\n• At-risk limitations\n• Passive activity loss rules\n• Excess business loss limitation\n\n**Only after passing all these can loss become part of individual's NOL.**",
        },
        {
          title: 'Excess Business Loss Limitation',
          type: 'text',
          content: "**Section 461(l):**\n\nFor non-corporate taxpayers, business losses limited to:\n• Business income PLUS\n• $305,000 (single) / $610,000 (MFJ) for 2024\n\n**Excess becomes:**\nNOL carryforward (subject to 80% rule)\n\n**Applies AFTER:**\nBasis, at-risk, and passive activity rules\n\n**In effect through 2028** (unless extended)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "NOLs carry forward indefinitely (no carryback for most)",
            "80% limitation: Can only offset 80% of income",
            "Farming losses can carry back 2 years",
            "Oldest NOLs used first (FIFO)",
            "Pass-through losses flow to owners and may create individual NOL",
            "Excess business loss limitation: $305K/$610K (2024)",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-011',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Loss Limitation Rules',
    description: 'Master at-risk rules and passive activity loss limitations',
    order: 11,
    duration: 60,
    difficulty: 'advanced',
    topics: ['At-risk rules', 'Passive activity losses', 'Material participation'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Not all business losses are immediately deductible! Understanding the hierarchy of loss limitations ensures correct reporting and helps clients plan to use their losses effectively.",
        },
        {
          title: 'Loss Limitation Hierarchy',
          type: 'text',
          content: "**Order of Application:**\n\n1. **Basis Limitation** - Can't deduct more than basis\n2. **At-Risk Limitation** - Only amounts at risk\n3. **Passive Activity Loss Rules** - Only against passive income\n4. **Excess Business Loss** - $305K/$610K cap\n\n**Each limitation applied in order!**\nLoss failing any level is suspended until that barrier clears.",
        },
        {
          title: 'At-Risk Rules (Section 465)',
          type: 'text',
          content: "**Amount At Risk Includes:**\n• Cash contributed\n• Adjusted basis of property contributed\n• Amounts borrowed for which personally liable\n• Amounts borrowed secured by property in activity\n\n**NOT At Risk:**\n• Nonrecourse debt (with real estate exception)\n• Amounts protected against loss\n• Amounts borrowed from related parties\n\n**Losses limited to amount at risk.** Excess suspended until more at risk.",
        },
        {
          title: 'Passive Activity Loss Rules',
          type: 'text',
          content: "**General Rule:**\nPassive losses can only offset passive income.\n\n**What is Passive Activity?**\n• Any trade or business in which taxpayer doesn't materially participate\n• Any rental activity (with exceptions)\n\n**Material Participation:**\nMust meet one of seven tests (most common: 500 hours during year)\n\n**Suspended losses:**\n• Carry forward\n• Released when activity disposed of in fully taxable transaction",
        },
        {
          title: 'Material Participation Tests',
          type: 'table',
          headers: ['Test #', 'Requirement'],
          rows: [
            ['1', 'More than 500 hours during the year'],
            ['2', 'Substantially all participation in the activity'],
            ['3', 'More than 100 hours and at least as much as anyone else'],
            ['4', 'Significant participation in multiple activities totaling 500+ hours'],
            ['5', 'Material participation in any 5 of prior 10 years'],
            ['6', 'Personal service activity - any 3 prior years'],
            ['7', 'Regular, continuous, substantial involvement (facts & circumstances)'],
          ],
        },
        {
          title: 'Real Estate Professionals Exception',
          type: 'text',
          content: "**Rental activities are NOT automatically passive if:**\n\n• More than 50% of personal services in real property trades/businesses\n• More than 750 hours in real property trades/businesses\n• Materially participates in rental activities\n\n**Result:** Rental losses can offset non-passive income!\n\n**Warning:** Must meet ALL requirements. Heavily audited by IRS.",
        },
        {
          title: '$25,000 Rental Loss Allowance',
          type: 'text',
          content: "**Active Participation Exception:**\n\nUp to $25,000 of rental losses can offset non-passive income if:\n• Actively participate (own 10%+, participate in management)\n• Not a limited partner\n\n**Phase-out:**\n• Begins at $100,000 MAGI\n• Fully phased out at $150,000\n• Reduced $1 for every $2 over $100,000\n\n**Example:**\n$125,000 MAGI = $12,500 allowance",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Loss limitations apply in order: Basis → At-Risk → PAL → EBL",
            "At-risk: Must be personally liable or have basis in property",
            "Passive = no material participation (500 hours is key test)",
            "Passive losses only offset passive income",
            "$25,000 active rental exception (phases out $100K-$150K MAGI)",
            "Real estate professionals can treat rentals as non-passive",
            "Suspended losses released on fully taxable disposition",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-012',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Qualified Business Income Deduction',
    description: 'Master Section 199A pass-through deduction',
    order: 12,
    duration: 65,
    difficulty: 'advanced',
    topics: ['Section 199A', 'QBI', 'SSTB', 'W-2 wages limitation'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Section 199A provides up to a 20% deduction for pass-through business income! This is a major tax benefit for sole proprietors, partners, and S corporation shareholders. Know the rules!",
        },
        {
          title: 'Basic Deduction',
          type: 'text',
          content: "**Section 199A Deduction:**\n\n**20% of Qualified Business Income (QBI)**\n\nFrom:\n• Sole proprietorships\n• Partnerships\n• S corporations\n• REITs (qualified dividends)\n• PTPs (publicly traded partnerships)\n\n**Below-the-line deduction** (reduces taxable income, not AGI)",
        },
        {
          title: 'QBI Definition',
          type: 'text',
          content: "**Qualified Business Income:**\nNet amount of qualified items from a qualified trade or business.\n\n**Includes:**\n• Ordinary income/loss\n• Section 1231 gain/loss\n\n**Does NOT Include:**\n• Capital gains and losses\n• Dividends and interest (unless banking)\n• Guaranteed payments to partners\n• Reasonable compensation (S corp)\n• Investment income\n• Wage income",
        },
        {
          title: 'Threshold Amounts (2024)',
          type: 'table',
          headers: ['Filing Status', 'Threshold', 'Phase-out Complete'],
          rows: [
            ['Single/MFS', '$191,950', '$241,950'],
            ['MFJ', '$383,900', '$483,900'],
            ['HOH', '$191,950', '$241,950'],
          ],
        },
        {
          title: 'Below Threshold',
          type: 'text',
          content: "**If taxable income ≤ threshold:**\n\n• 20% of QBI from each business\n• No W-2 wages or property limitations\n• SSTB status doesn't matter\n• No additional calculations required\n\n**Plus:** 20% of qualified REIT dividends and PTP income\n\n**Limited to:** 20% of (taxable income minus net capital gain)",
        },
        {
          title: 'Above Threshold - Limitations',
          type: 'text',
          content: "**Two Limitations Apply:**\n\n**1. W-2 Wage/Property Limit:**\nDeduction limited to greater of:\n• 50% of W-2 wages paid by business, OR\n• 25% of W-2 wages + 2.5% of UBIA of qualified property\n\n**2. SSTB Limitation:**\nSpecified Service Trades or Businesses:\n• Deduction phases out between threshold and threshold + $50K (single) / $100K (MFJ)\n• Completely disallowed above phase-out\n\n**SSTB includes:** Health, law, accounting, consulting, financial services, performing arts, athletics, etc.",
        },
        {
          title: 'SSTB List',
          type: 'list',
          content: [
            "Health (doctors, dentists, nurses, physical therapists)",
            "Law (attorneys, paralegals)",
            "Accounting (CPAs, bookkeepers)",
            "Actuarial science",
            "Performing arts (musicians, actors)",
            "Consulting (unless in manufacturing, etc.)",
            "Athletics (players, coaches)",
            "Financial services (investment advice, etc.)",
            "Brokerage services",
            "Any business where principal asset is reputation/skill of owners",
          ],
        },
        {
          title: '⚠️ SSTB Exclusions',
          type: 'warning',
          content: "**NOT an SSTB:**\n• Architecture\n• Engineering\n• Real estate agents/brokers\n• Insurance agents\n• Banking\n\n**Key Distinction:**\nConsulting where the product is something other than advice (e.g., manufacturing consultant who provides production plans) may not be SSTB.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "20% deduction for qualified business income from pass-throughs",
            "Below threshold: No W-2 wages or SSTB limitations",
            "Above threshold: W-2 wages/property limitation applies",
            "SSTB: Deduction phases out and is disallowed above threshold",
            "Limited to 20% of (taxable income minus net capital gains)",
            "Reasonable compensation and guaranteed payments excluded from QBI",
            "Expires after 2025 unless extended (TCJA sunset)",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE2-3: PASS-THROUGH ENTITIES (Lessons 13-30)
  // ============================================================================

  {
    id: 'SEE2-013',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Partnership Taxation Fundamentals',
    description: 'Master the basics of partnership formation, operations, and reporting',
    order: 13,
    duration: 60,
    difficulty: 'intermediate',
    topics: ['Form 1065', 'Schedule K-1', 'Partner basis', 'Distributions'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Partnerships are the most flexible business entities but have complex tax rules! Understanding formation, operations, basis, and distributions is tested extensively on the SEE.",
        },
        {
          title: 'Partnership Fundamentals',
          type: 'text',
          content: "**What is a Partnership for Tax Purposes?**\nTwo or more persons carrying on a trade or business as co-owners.\n\n**Key Principle:** Aggregate Theory (mostly)\n• Partnership is a conduit for income\n• Partners pay tax, not the partnership\n• Items flow through to partners\n\n**Filing:**\n• Form 1065 (information return)\n• Schedule K-1 to each partner\n• Due March 15 (calendar year)",
        },
        {
          title: 'Formation: Contributing Property',
          type: 'text',
          content: "**General Rule (Section 721):**\nNo gain or loss recognized when contributing property to a partnership in exchange for a partnership interest.\n\n**Partner's Initial Basis:**\nBasis in property contributed + cash contributed\n\n**Partnership's Basis in Contributed Property:**\nCarryover basis from contributing partner\n\n**Exception - Gain Recognized:**\n• Services in exchange for capital interest (ordinary income)\n• Investment partnership with appreciated securities",
        },
        {
          title: 'Partner Basis',
          type: 'text',
          content: "**Initial Basis:**\nCash + adjusted basis of property contributed\n\n**Increases:**\n• Additional contributions\n• Distributive share of income (including tax-exempt)\n• Increase in share of liabilities\n\n**Decreases:**\n• Distributions received\n• Distributive share of losses\n• Decrease in share of liabilities\n• Nondeductible non-capital expenditures\n\n**Cannot Go Below Zero:** Losses suspended if no basis",
        },
        {
          title: 'Partnership Liabilities and Basis',
          type: 'text',
          content: "**Recourse Liabilities:**\n• Partner bears economic risk of loss\n• Allocated to partner who would pay if partnership couldn't\n• Usually general partners\n\n**Nonrecourse Liabilities:**\n• No partner bears economic risk\n• Allocated based on profit-sharing ratios (generally)\n• Includes minimum gain allocations\n\n**Effect:** Increase in share of liabilities = deemed cash contribution (increases basis)",
        },
        {
          title: 'Distributive Share',
          type: 'text',
          content: "**Partnership Agreement Controls** (if substantial economic effect)\n\n**What Flows Through to Partners:**\n• Ordinary income/loss from operations\n• Capital gains and losses (separately stated)\n• Section 1231 gains/losses\n• Charitable contributions\n• Section 179 deduction\n• Investment interest expense\n• Tax-exempt income\n• Many other items\n\n**Timing:** Partners report in year partnership's tax year ends (not when received)",
        },
        {
          title: '⚠️ Guaranteed Payments',
          type: 'warning',
          content: "**Guaranteed Payments:**\nPayments to a partner for services or capital use without regard to partnership income.\n\n**Treatment:**\n• Deductible by partnership (like wages)\n• Ordinary income to partner\n• Partner includes in year of partnership's year-end\n• Subject to self-employment tax\n\n**Note:** NOT included in basis calculations until flowed through on K-1!",
        },
        {
          title: 'Partnership Distributions',
          type: 'text',
          content: "**Current Distributions:**\n• Not taxable if within basis\n• Reduce partner's basis\n• Cash exceeding basis = gain\n• Property received = carryover basis\n\n**Liquidating Distributions:**\n• May trigger gain or loss\n• Gain only if cash > basis\n• Loss only if distribution is only cash, inventory, unrealized receivables\n\n**Special Rule:** Distribution of property generally keeps carryover basis (limited to partner's remaining basis)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Partnerships are pass-through - partners pay tax on their share",
            "Formation: generally no gain/loss on property contribution",
            "Partner basis: starts with contribution, adjusts for income/loss/distributions",
            "Share of liabilities increases/decreases basis",
            "Guaranteed payments: ordinary income to partner, deductible by partnership",
            "Current distributions: not taxable unless cash exceeds basis",
            "Losses limited to partner's basis (cannot go below zero)",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-014',
    courseId: 'ea',
    section: 'SEE2',
    title: 'S Corporation Fundamentals',
    description: 'Understand S corporation election, requirements, and taxation',
    order: 14,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['S election', 'Shareholder requirements', 'Built-in gains', 'Reasonable compensation'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "S corporations offer the best of both worlds: corporate liability protection with pass-through taxation. But strict rules govern eligibility and operations. Get this wrong and the election terminates!",
        },
        {
          title: 'S Corporation Requirements',
          type: 'table',
          headers: ['Requirement', 'Details'],
          rows: [
            ['Domestic corporation', 'Cannot be foreign'],
            ['Shareholders', 'Maximum 100 (family counts as 1)'],
            ['Shareholder types', 'Individuals, estates, certain trusts only'],
            ['No NRAs', 'No nonresident alien shareholders'],
            ['One class of stock', 'Only common (voting differences OK)'],
            ['Not ineligible corp', 'Not bank, insurance, DISC, etc.'],
          ],
        },
        {
          title: 'Making the S Election',
          type: 'text',
          content: "**Form 2553: Election by a Small Business Corporation**\n\n**Timing:**\n• By March 15 for existing corporation (calendar year)\n• Any time in preceding year\n• Within 2 months 15 days of formation (new corp)\n\n**All shareholders must consent**\n\n**Late Election Relief:**\n• Available if reasonable cause\n• Must file within 3 years 75 days of intended effective date",
        },
        {
          title: 'Shareholder Basis',
          type: 'text',
          content: "**Initial Basis:**\nCost of stock + cash/property contributed\n\n**Increases:**\n• Additional capital contributions\n• Distributive share of income (including tax-exempt)\n\n**Decreases:**\n• Distributions\n• Distributive share of losses\n• Nondeductible/non-capital expenses\n\n**IMPORTANT Difference from Partnerships:**\n• Shareholder loans increase debt basis (separate from stock basis)\n• Can deduct losses against stock AND debt basis\n• But S corp liabilities don't increase stock basis!",
        },
        {
          title: '⚠️ Exam Trap: S Corp vs Partnership Basis',
          type: 'warning',
          content: "**The Critical Difference:**\n\n**Partnership:** Liabilities (recourse and nonrecourse) increase partner's basis\n\n**S Corporation:** Corporate liabilities do NOT increase shareholder basis\n\n**Only shareholder loans to the corporation increase debt basis!**\n\nThis is a commonly tested distinction!",
        },
        {
          title: 'Reasonable Compensation Requirement',
          type: 'text',
          content: "**Why It Matters:**\nShareholders who provide services MUST receive reasonable compensation.\n\n**The Game:** Pay low salary = less employment tax\n\n**IRS Attack:** If compensation is too low:\n• Reclassify distributions as wages\n• Assess back employment taxes, penalties, interest\n\n**Factors for \"Reasonable\":**\n• Comparable wages in similar businesses\n• Training and experience\n• Duties and responsibilities\n• Time devoted",
        },
        {
          title: 'Built-In Gains Tax',
          type: 'text',
          content: "**Applies to C corps converting to S corps:**\n\nIf corporation held appreciated assets when it elected S status:\n• Tax at 21% on net recognized built-in gains\n• Recognition period: 5 years after S election\n• Only applies to pre-election appreciation\n\n**Limitation:** Cannot exceed taxable income if S corp the entire year\n\n**Planning:** Wait 5 years before selling appreciated assets, or elect S status when values are low.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "S corp requires ≤100 shareholders, one class of stock, domestic",
            "No nonresident aliens or ineligible entity shareholders",
            "File Form 2553 by March 15 for calendar year corp",
            "Corporate liabilities do NOT increase shareholder basis",
            "Shareholder-employees must receive reasonable compensation",
            "Built-in gains tax applies 5 years after C-to-S conversion",
            "Losses limited to stock basis + shareholder loan basis",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-015',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Partnership Distributions',
    description: 'Master the rules for partnership distributions to partners',
    order: 15,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Current distributions', 'Liquidating distributions', 'Property distributions'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Partnership distributions are complex! Understanding when gain is recognized and how basis is affected is crucial for advising partners on tax consequences of receiving cash or property.",
        },
        {
          title: 'Current vs. Liquidating Distributions',
          type: 'table',
          headers: ['Feature', 'Current Distribution', 'Liquidating Distribution'],
          rows: [
            ['Purpose', 'Operating distribution', 'Partner exits partnership'],
            ['Money gain', 'Yes, if cash > basis', 'Yes, if cash > basis'],
            ['Property gain', 'Generally no', 'Generally no'],
            ['Loss recognized', 'Never', 'Only in certain cases'],
            ['Basis transfer', 'Carryover (limited)', 'Substituted'],
          ],
        },
        {
          title: 'Money Distributions',
          type: 'text',
          content: "**Cash Distributions:**\n\n• Reduce partner's basis dollar for dollar\n• If cash exceeds basis = capital gain\n• No loss on cash distribution alone\n\n**Marketable Securities:**\nGenerally treated as money (with some exceptions)\n\n**Example:**\n• Partner basis: $10,000\n• Cash distributed: $15,000\n• Result: $5,000 capital gain\n• New basis: $0",
        },
        {
          title: 'Property Distributions',
          type: 'text',
          content: "**General Rule - No Gain or Loss:**\n\n**Partner's Basis in Property:**\n• Current distribution: Lesser of partnership's basis OR partner's remaining outside basis\n• Liquidating distribution: Equal to remaining outside basis (substituted)\n\n**Partnership's Basis:**\nGoes to partner (subject to limitations)\n\n**No gain to partner** unless cash + marketable securities > basis",
        },
        {
          title: 'Hot Assets - Section 751',
          type: 'text',
          content: "**Section 751(b) applies when:**\nDistribution causes shift in hot assets between partners.\n\n**Hot Assets:**\n• Unrealized receivables (A/R, recapture)\n• Inventory items\n\n**Effect:**\nPortion of distribution treated as a taxable exchange between partner and partnership.\n\n**Creates ordinary income/loss**, not capital.",
        },
        {
          title: 'Liquidating Distributions',
          type: 'text',
          content: "**Partner's Interest Terminates:**\n\n**Loss Recognition:**\nOnly if:\n• Only cash, inventory, and unrealized receivables distributed\n• Partner's basis exceeds FMV of distribution\n\n**Basis in Property:**\nSubstituted basis = partner's outside basis reduced by cash\n\n**Allocation if Multiple Properties:**\n• First to unrealized receivables and inventory (at partnership basis)\n• Remaining basis to other assets (may require allocation adjustments)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Cash > basis = capital gain",
            "Property distributions: generally no gain to partner",
            "Current distribution: property takes lesser of carryover or remaining basis",
            "Liquidating distribution: substituted basis",
            "Section 751 hot assets can create ordinary income",
            "Loss only on liquidating distribution of cash/inventory/receivables",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-016',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Schedule K-1 Partnership Items',
    description: 'Understand the partner\'s Schedule K-1 and separately stated items',
    order: 16,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Form K-1', 'Separately stated items', 'Partner reporting'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The K-1 is the roadmap for partner reporting! Understanding what each item means and how it flows to the partner's return is essential for preparing both partnership and partner returns.",
        },
        {
          title: 'Why Items Are Separately Stated',
          type: 'text',
          content: "**Character Preservation:**\nItems are separately stated if the tax treatment depends on the partner's individual circumstances.\n\n**Examples:**\n• Capital gains (may have different rates, or capital losses to offset)\n• Charitable contributions (subject to partner's AGI limitations)\n• Section 179 deduction (subject to partner's income limitation)\n• Investment interest (subject to partner's investment income)\n\n**Ordinary business income:** Items that don't require separate treatment are netted together.",
        },
        {
          title: 'Key K-1 Items',
          type: 'table',
          headers: ['Box', 'Item', 'Partner Treatment'],
          rows: [
            ['Box 1', 'Ordinary business income/loss', 'Schedule E, may affect SE tax'],
            ['Box 4', 'Guaranteed payments', 'Ordinary income, subject to SE tax'],
            ['Box 8-9', 'Capital gains/losses', 'Schedule D'],
            ['Box 10', 'Section 1231 gain/loss', 'Form 4797'],
            ['Box 13', 'Charitable contributions', 'Schedule A (if itemizing)'],
            ['Box 14', 'Self-employment earnings', 'Schedule SE'],
            ['Box 15', 'Credits', 'Various forms'],
            ['Box 18-20', 'Tax-exempt income, distributions, other', 'Various'],
          ],
        },
        {
          title: 'Self-Employment Income',
          type: 'text',
          content: "**General Partners:**\n• Ordinary income from Box 1 subject to SE tax\n• Guaranteed payments subject to SE tax\n• Unless rental or passive activity\n\n**Limited Partners:**\n• Generally NOT subject to SE tax (no material participation)\n• Guaranteed payments for services ARE subject to SE tax\n\n**Box 14 tells the story:**\nShows partner's share of self-employment earnings for Schedule SE.",
        },
        {
          title: 'Basis Adjustments from K-1',
          type: 'text',
          content: "**Increase Basis:**\n• Ordinary income (Box 1)\n• Capital gains (Box 8-9)\n• Tax-exempt income (Box 18)\n• Increase in partner's share of liabilities\n\n**Decrease Basis:**\n• Distributions (Box 19)\n• Losses/deductions (various boxes)\n• Decrease in share of liabilities\n• Nondeductible expenses (Box 18)\n\n**Partner must track outside basis!** Not reported on K-1.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Separately stated items preserve character at partner level",
            "Ordinary business income/loss flows to Schedule E",
            "Guaranteed payments are always ordinary income",
            "General partners: ordinary income usually subject to SE tax",
            "Limited partners: generally exempt from SE tax (except guaranteed payments)",
            "Partner must track outside basis (not shown on K-1)",
            "Box 18-20: tax-exempt income, distributions, other items to track",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-017',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Family Partnerships',
    description: 'Understand special rules for family partnerships',
    order: 17,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Family partnerships', 'Capital as income factor', 'Reasonable compensation'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The IRS scrutinizes family partnerships because they can be used to shift income to lower-bracket family members. Understanding the special rules ensures legitimate family partnerships are respected.",
        },
        {
          title: 'General Rules',
          type: 'text',
          content: "**When Family Member Recognized as Partner:**\n\n• Capital is a material income-producing factor, AND\n• Family member is actual owner of partnership interest\n\n**OR**\n\n• Family member performs services as partner\n• Provides capital or skills materially important",
        },
        {
          title: 'Capital as Material Factor',
          type: 'text',
          content: "**Capital IS Material Factor:**\n• Manufacturing\n• Retail\n• Requiring substantial inventory\n• Requiring substantial equipment\n\n**Capital is NOT Material Factor:**\n• Service businesses (law, medicine, accounting)\n• Where income comes primarily from services\n\n**If capital isn't material:** Family member must actually perform services to be recognized as partner.",
        },
        {
          title: 'Allocation Rules',
          type: 'text',
          content: "**Donor Must Be Reasonably Compensated:**\n\nBefore allocating income to donee:\n• Donor partner must receive reasonable compensation for services\n• Remaining income allocated based on capital\n\n**Example:**\n• Partnership income: $200,000\n• Donor's reasonable compensation for services: $80,000\n• Remaining $120,000 allocated based on capital ownership",
        },
        {
          title: 'Gift of Partnership Interest',
          type: 'text',
          content: "**Donee's Basis:**\n• Carryover basis from donor (gift basis rules)\n• Includes share of partnership liabilities\n\n**Gift Tax Implications:**\n• FMV of interest may exceed basis\n• Valuation discounts may apply\n\n**Income Allocation:**\n• Must follow reasonable compensation rules\n• Cannot shift more income than donee's capital would generate",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Family partnerships face special scrutiny",
            "Capital must be material income factor, or family member must perform services",
            "Donor must receive reasonable compensation for services first",
            "Remaining income allocated based on capital",
            "Gift of partnership interest: donee gets carryover basis",
            "Service businesses: harder to include non-working family members",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-018',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Sale of Partnership Interest',
    description: 'Master the tax treatment of selling a partnership interest',
    order: 18,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Gain/loss on sale', 'Hot assets', 'Section 754 election'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Selling a partnership interest is more complex than selling stock! Hot assets can convert capital gain to ordinary income, and the resulting basis issues affect both buyer and remaining partners.",
        },
        {
          title: 'General Rule',
          type: 'text',
          content: "**Sale of Partnership Interest:**\n• Generally produces capital gain or loss\n• Gain = Amount realized - Outside basis\n• Long-term if held more than one year\n\n**Amount Realized Includes:**\n• Cash and property received\n• PLUS: Share of partnership liabilities transferred to buyer\n\n**Outside Basis Includes:**\n• Adjusted basis\n• PLUS: Selling partner's share of liabilities (about to be reduced)",
        },
        {
          title: 'Section 751 - Hot Assets',
          type: 'text',
          content: "**Hot Assets Portion is ORDINARY:**\n\n**Hot Assets:**\n• Unrealized receivables\n• Inventory items (substantially appreciated)\n\n**Effect:**\nPartner must recognize ordinary income to extent gain attributable to hot assets.\n\n**Example:**\n• Total gain: $100,000\n• Portion attributable to hot assets: $30,000\n• Ordinary income: $30,000\n• Capital gain: $70,000",
        },
        {
          title: 'Unrealized Receivables',
          type: 'list',
          content: [
            "Accounts receivable (cash method partnership)",
            "Section 1245 recapture potential",
            "Section 1250 recapture potential",
            "Rights to payment for services or goods not yet recognized",
            "Mining property recapture",
            "Other ordinary income property",
          ],
        },
        {
          title: 'Section 754 Election',
          type: 'text',
          content: "**Optional Basis Adjustment:**\n\nIf partnership makes Section 754 election:\n• Buyer gets special basis adjustment (Section 743)\n• Adjusts buyer's share of inside basis to match outside basis\n\n**Why it matters:**\nWithout 754 election, buyer's share of partnership basis may differ from what they paid.\n\n**Once made:** Election applies to all future transfers (or until revoked).\n\n**Mandatory 754:** Required if substantial built-in loss (>$250,000)",
        },
        {
          title: 'Example: 754 Election Impact',
          type: 'example',
          content: "**Without 754 Election:**\n• Buyer pays $100,000 for 1/3 interest\n• Partnership has $150,000 in assets (inside basis)\n• Buyer's share of inside basis: $50,000\n• Mismatch: $50,000\n\n**With 754 Election:**\n• Buyer gets $50,000 step-up (Section 743(b))\n• Buyer's share of inside basis now equals what they paid\n• No gain on later sale if values stay same",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sale of partnership interest: generally capital gain/loss",
            "Amount realized includes buyer's assumption of liabilities",
            "Section 751 hot assets create ordinary income",
            "Hot assets: unrealized receivables, substantially appreciated inventory",
            "Section 754 election adjusts buyer's inside basis",
            "754 election is partnership-wide and continuing",
            "Mandatory if partnership has substantial built-in loss",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-019',
    courseId: 'ea',
    section: 'SEE2',
    title: 'S Corporation Distributions and AAA',
    description: 'Master distributions from S corporations and accumulated adjustments account',
    order: 19,
    duration: 55,
    difficulty: 'advanced',
    topics: ['AAA', 'Distributions', 'Prior C corp E&P'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "S corporation distributions are generally tax-free! But if the S corp has accumulated earnings from C corp years, the analysis gets complicated. Understanding AAA is essential.",
        },
        {
          title: 'Simple Case: No C Corp History',
          type: 'text',
          content: "**S corporations with NO accumulated E&P:**\n\nDistributions are treated as:\n1. Return of basis (tax-free) - reduces stock basis\n2. Gain (when distributions exceed basis) - capital gain\n\n**Example:**\n• Shareholder basis: $50,000\n• Distribution: $30,000\n• Result: Tax-free, new basis = $20,000",
        },
        {
          title: 'Accumulated Adjustments Account (AAA)',
          type: 'text',
          content: "**What is AAA?**\nCorporate-level account tracking items that would affect shareholder basis.\n\n**Increases:**\n• Income items (not tax-exempt)\n• Separately stated income\n\n**Decreases:**\n• Loss/deduction items\n• Nondeductible expenses (not related to tax-exempt income)\n• Distributions\n\n**AAA can go negative** from losses (but distributions don't reduce AAA below zero).",
        },
        {
          title: 'S Corporations WITH Accumulated E&P',
          type: 'text',
          content: "**Distribution Ordering:**\n\n1. First: From AAA (tax-free return of S corp earnings)\n2. Then: From accumulated E&P (taxable dividend)\n3. Then: From remaining AAA/basis (tax-free)\n4. Finally: Excess over basis = capital gain\n\n**Why it matters:**\nOld E&P from C corp years can create taxable dividends!\n\n**Election available:** Treat distribution as from E&P first (rare, but useful if shareholder has capital losses to offset).",
        },
        {
          title: 'Comparison: AAA vs. Basis',
          type: 'table',
          headers: ['Feature', 'AAA', 'Shareholder Basis'],
          rows: [
            ['Purpose', 'Track accumulated S corp earnings', 'Track shareholder investment'],
            ['Tax-exempt income', 'Does NOT increase', 'Increases'],
            ['Distributions', 'Cannot go below zero from distributions', 'Can go to zero'],
            ['Losses', 'Can go negative', 'Cannot go below zero'],
            ['Tracked by', 'Corporation', 'Shareholder'],
          ],
        },
        {
          title: 'Other Tracked Accounts',
          type: 'text',
          content: "**OAA (Other Adjustments Account):**\n• Tax-exempt income\n• Related nondeductible expenses\n• Distributed only after AAA and E&P\n\n**PTI (Previously Taxed Income):**\n• Pre-1983 S corporation earnings\n• Rarely encountered now\n\n**Accumulated E&P:**\n• From prior C corporation years\n• Never increased by S corp operations",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "No E&P = simple: distributions reduce basis, then capital gain",
            "With E&P: AAA first (tax-free), then E&P (dividend), then basis",
            "AAA tracks S corp earnings at corporate level",
            "AAA can go negative from losses",
            "Distributions cannot reduce AAA below zero",
            "Tax-exempt income increases basis but not AAA (increases OAA)",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-020',
    courseId: 'ea',
    section: 'SEE2',
    title: 'S Corporation Termination',
    description: 'Understand events that terminate S corporation election',
    order: 20,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Termination events', 'Effective date', 'Re-election'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Losing S corporation status can be costly! Understanding termination events helps prevent inadvertent terminations and plan for controlled conversions when appropriate.",
        },
        {
          title: 'Termination Events',
          type: 'list',
          content: [
            "Voluntary revocation by shareholders",
            "Excess passive investment income (3 consecutive years with C corp E&P)",
            "Ineligible shareholder (NRA, corporation, certain trusts)",
            "More than 100 shareholders",
            "Creation of second class of stock",
            "Becoming ineligible corporation type",
          ],
        },
        {
          title: 'Voluntary Revocation',
          type: 'text',
          content: "**How to Revoke:**\nWritten consent by shareholders holding > 50% of shares.\n\n**Effective Date:**\n• On or before 15th day of 3rd month = effective January 1\n• After = effective following year\n• Can specify future effective date\n\n**Example:**\n• Revocation filed March 10, 2024 → Effective January 1, 2024\n• Revocation filed March 20, 2024 → Effective January 1, 2025",
        },
        {
          title: 'Passive Investment Income Termination',
          type: 'text',
          content: "**Three Consecutive Years Rule:**\n\nIf for 3+ consecutive years:\n• S corp has accumulated C corp E&P, AND\n• Passive investment income > 25% of gross receipts\n\n**Result:** S election terminates at start of year 4.\n\n**Passive Investment Income:**\n• Royalties, rents, dividends, interest\n• NOT: Gains from active business\n\n**Also:** Corporate-level tax on excess passive income if E&P exists.",
        },
        {
          title: 'Inadvertent Termination Relief',
          type: 'text',
          content: "**IRS Can Waive Termination If:**\n\n• Termination was inadvertent\n• Steps taken to correct (within reasonable time)\n• Corporation and shareholders agree to IRS terms\n\n**Common inadvertent terminations:**\n• Stock transferred to ineligible shareholder\n• Debt instrument treated as second class of stock\n• Missing Form 2553\n\n**Apply for relief:** Private letter ruling request",
        },
        {
          title: 'Re-Election After Termination',
          type: 'text',
          content: "**5-Year Waiting Period:**\n\nAfter termination, cannot re-elect S status for 5 years without IRS consent.\n\n**Exceptions:**\n• IRS can waive waiting period\n• Common if termination was inadvertent and quickly corrected\n• Change of control may make waiver easier\n\n**Plan ahead:** If contemplating conversion, consider timing and consequences.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Revocation requires > 50% shareholder consent",
            "Timing of revocation affects effective date",
            "Passive income can terminate election (3 years with E&P)",
            "Ineligible shareholders cause immediate termination",
            "Inadvertent termination relief available through IRS",
            "5-year waiting period before re-election",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE2-3: PASS-THROUGH ENTITIES - Continued (Lessons 21-30)
  // ============================================================================

  {
    id: 'SEE2-021',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Guaranteed Payments',
    description: 'Understand payments to partners for services and capital use',
    order: 21,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Guaranteed payments', 'Partner services', 'Capital use'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Guaranteed payments are a unique hybrid - compensation to partners that doesn't depend on partnership profit. Understanding their treatment for both the partnership and partner is essential!",
        },
        {
          title: 'What Are Guaranteed Payments?',
          type: 'text',
          content: "**Definition:**\nPayments to a partner for services or use of capital determined without regard to partnership income.\n\n**Key Characteristics:**\n• Fixed amount (not dependent on profits)\n• Paid for services or capital use\n• Partner is NOT treated as employee\n• Taxable in partner's tax year that includes partnership year-end\n\n**Common Examples:**\n• Monthly management fee to managing partner\n• Interest-like return on partner's capital account",
        },
        {
          title: 'Tax Treatment',
          type: 'table',
          headers: ['Party', 'Treatment'],
          rows: [
            ['Partnership', 'Deduction (reduces ordinary income)'],
            ['Partner', 'Ordinary income (reported on K-1)'],
            ['Self-employment', 'Subject to SE tax'],
            ['Withholding', 'None - no W-2 issued'],
          ],
        },
        {
          title: 'Partnership Calculation',
          type: 'text',
          content: "**Order of Operations:**\n\n1. Calculate partnership income/loss BEFORE guaranteed payments\n2. Deduct guaranteed payments\n3. Remaining income/loss allocated per agreement\n\n**Example:**\nPartnership has $100,000 income before guaranteed payments.\nPartner A receives $30,000 guaranteed payment.\n• Partnership ordinary income: $70,000 (to allocate)\n• Partner A also includes $30,000 guaranteed payment\n• Total allocated: $100,000",
        },
        {
          title: '⚠️ Guaranteed Payment vs. Distribution',
          type: 'warning',
          content: "**Don't confuse them!**\n\n**Guaranteed Payment:**\n• Fixed, regardless of profit\n• Deductible by partnership\n• Ordinary income to recipient\n• Subject to SE tax\n\n**Distribution:**\n• Share of profits (variable)\n• Not deductible\n• Generally not taxable (return of basis)\n• Not subject to SE tax\n\n**Exam frequently tests this distinction!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Guaranteed payments: fixed amount for services/capital",
            "Deductible by partnership, ordinary income to partner",
            "Subject to self-employment tax",
            "Reported on Schedule K-1",
            "Partner is NOT an employee - no W-2",
            "Distributions are different: not deductible, not income",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-022',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Partnership Liabilities and Basis',
    description: 'Understand how partnership debt affects partner basis',
    order: 22,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Recourse debt', 'Nonrecourse debt', 'Liability allocation'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Partnership liabilities increase partner basis! This is a major advantage of partnerships over S corps. Understanding recourse vs. nonrecourse allocation rules is essential for SEE success.",
        },
        {
          title: 'Why Liabilities Matter',
          type: 'text',
          content: "**Liabilities increase partner basis:**\n\n• More basis = ability to deduct more losses\n• Distributions in excess of basis = capital gain\n• At-risk rules affected by liability type\n\n**Key partnership advantage:**\nUnlike S corps, partnership debt CAN increase basis.",
        },
        {
          title: 'Recourse vs. Nonrecourse',
          type: 'table',
          headers: ['Type', 'Definition', 'Allocation'],
          rows: [
            ['Recourse', 'Partner bears economic risk of loss', 'To partner(s) who bear risk'],
            ['Nonrecourse', 'No partner bears economic risk', 'Generally by profit-sharing %'],
            ['Qualified nonrecourse', 'Real estate financing from unrelated parties', 'At-risk and allocated by profit %'],
          ],
        },
        {
          title: 'Economic Risk of Loss',
          type: 'text',
          content: "**Constructive Liquidation Test:**\n\nTo determine who bears economic risk:\n1. Assume all assets become worthless\n2. Partnership liquidates\n3. Who must pay creditors?\n\n**Risk bearers:**\n• Partners with personal liability (general partners)\n• Partners who guarantee debt\n• Partners with capital contributions subject to loss\n\n**Limited partners:** Usually no economic risk on general liabilities",
        },
        {
          title: 'Allocation Examples',
          type: 'text',
          content: "**Recourse Debt Example:**\nTwo general partners, 50/50, jointly liable on $100K loan.\n• Each partner: $50,000 basis increase\n\n**Nonrecourse Debt Example:**\nPartnership borrows $200K (nonrecourse secured by equipment).\n• Allocated by profit-sharing ratios\n• 60/40 split: Partner A = $120K, Partner B = $80K\n\n**Mixed:** If partner guarantees portion, that portion is recourse to them.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Partnership liabilities increase partner basis",
            "Recourse debt: allocated to partners bearing economic risk",
            "Nonrecourse debt: allocated by profit-sharing percentage",
            "Qualified nonrecourse: at-risk for real estate debt",
            "This is a major advantage over S corporations",
            "Guarantee of debt = economic risk = recourse to guarantor",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-023',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Partnership Special Allocations',
    description: 'Understand substantive economic effect requirements',
    order: 23,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Special allocations', 'Substantial economic effect', 'Capital accounts'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Partnerships have flexibility to allocate items disproportionately! But the IRS has rules to prevent tax-motivated allocations with no economic substance. Understand when special allocations work.",
        },
        {
          title: 'What Are Special Allocations?',
          type: 'text',
          content: "**Definition:**\nAllocations of specific items (income, deduction, credit) in ratios different from general profit/loss sharing.\n\n**Examples:**\n• Depreciation allocated to high-bracket partner\n• Capital gains allocated to partner with losses\n• Rental income allocated differently than other income\n\n**Requirement:** Must have substantial economic effect!",
        },
        {
          title: 'Substantial Economic Effect',
          type: 'text',
          content: "**Two-Part Test:**\n\n**1. Economic Effect (allocations must affect economics):**\n• Capital accounts maintained per regulations\n• Liquidating distributions follow capital accounts\n• Deficit restoration obligation OR qualified income offset\n\n**2. Substantiality (cannot be tax-motivated only):**\n• Must be reasonable possibility allocation will substantially affect dollar amounts apart from tax consequences\n• Test at time allocation becomes part of agreement",
        },
        {
          title: 'Safe Harbor Rules',
          type: 'text',
          content: "**Primary Safe Harbor:**\n\n1. Capital accounts maintained properly\n2. On liquidation, partner receives positive capital or nothing\n3. Partner with deficit must restore it OR\n   - Qualified income offset (future income offsets deficit)\n\n**If safe harbor met:** IRS respects the allocation.\n\n**If not met:** Reallocate according to partner's interest in the partnership.",
        },
        {
          title: 'Allocations That Fail',
          type: 'text',
          content: "**Shifting Allocations:**\nAllocations that shift tax consequences among partners with no business purpose.\n\n**Transitory Allocations:**\n• Allocation in Year 1 followed by offsetting allocation in Year 2\n• Net economic effect is zero\n• Only purpose is tax reduction\n\n**Example of failure:**\nAllocate $100K depreciation to Partner A in Year 1.\nAllocate $100K gain to Partner A in Year 5 when property sold.\nNet economic effect = zero. Fails substantiality.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Special allocations allow different ratios for different items",
            "Must have substantial economic effect",
            "Capital accounts must follow special rules",
            "Liquidating distributions must follow capital accounts",
            "Tax-only allocations will be reallocated by IRS",
            "Shifting and transitory allocations fail substantiality",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-024',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Partnership Hot Assets',
    description: 'Understand ordinary income treatment on partnership interest sales',
    order: 24,
    duration: 45,
    difficulty: 'advanced',
    topics: ['Hot assets', 'Section 751', 'Unrealized receivables', 'Inventory'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When a partnership interest is sold, not all gain is capital gain! Hot assets cause ordinary income recognition. This is heavily tested on SEE. Know Section 751!",
        },
        {
          title: 'What Are Hot Assets?',
          type: 'text',
          content: "**Section 751 Assets:**\n\n**1. Unrealized Receivables:**\n• Accounts receivable (cash method)\n• Recapture (Section 1245/1250)\n• Rights to payment for services/goods\n\n**2. Inventory Items:**\n• Regular inventory\n• Property held primarily for sale\n• Property that would NOT be capital asset if sold\n\n**Why \"Hot\":**\nConvert capital gain to ordinary income!",
        },
        {
          title: 'Sale of Partnership Interest',
          type: 'text',
          content: "**General Rule:**\nPartnership interest is capital asset → capital gain/loss on sale.\n\n**Exception - Section 751:**\nPortion of gain attributable to hot assets = ordinary income.\n\n**Calculation:**\n1. Determine FMV of selling partner's share of hot assets\n2. Compare to basis in those assets\n3. Difference = ordinary income\n4. Remaining gain/loss = capital",
        },
        {
          title: 'Example Calculation',
          type: 'example',
          content: "**Facts:**\n• Partner A sells 25% interest for $100,000\n• A's outside basis: $60,000\n• Total gain: $40,000\n• Partnership unrealized receivables: $80,000 (FMV)\n• A's basis in receivables: $0 (cash method)\n\n**Section 751 Analysis:**\n• A's share of receivables: $20,000 (25%)\n• A's basis: $0\n• Ordinary income: $20,000\n\n• Remaining gain: $40,000 - $20,000 = $20,000\n• Character: Capital gain\n\n**Result:** $20,000 ordinary + $20,000 capital gain",
        },
        {
          title: 'Section 751(b) Distributions',
          type: 'text',
          content: "**Disproportionate Distributions:**\n\nIf distribution shifts hot assets between partners:\n• Partner receiving more than share of hot assets → ordinary income\n• Treated as disguised sale\n\n**Example:**\nPartner receives all inventory, other partners receive cash.\nExcess inventory distributed = ordinary income to recipient.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Hot assets: unrealized receivables and inventory",
            "Section 751 converts capital gain to ordinary income",
            "Must calculate ordinary income portion separately",
            "Recapture items are unrealized receivables",
            "Disproportionate distributions also trigger 751",
            "Remaining gain after hot assets = capital gain",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-025',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Partnership Terminations',
    description: 'Understand when a partnership terminates for tax purposes',
    order: 25,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Technical termination', 'Partnership continuation', 'Merger'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "A partnership terminates for tax purposes under specific circumstances. Understanding these rules helps plan ownership changes and avoid unintended consequences.",
        },
        {
          title: 'When Partnership Terminates',
          type: 'text',
          content: "**Current Rule (post-TCJA):**\n\nA partnership terminates when:\n\n1. No part of business continues to be carried on in a partnership, OR\n\n2. Partnership merges or consolidates\n\n**What no longer causes termination:**\n• Sale or exchange of 50%+ of interests within 12 months (old rule repealed by TCJA)",
        },
        {
          title: 'Termination vs. Continuation',
          type: 'table',
          headers: ['Event', 'Terminates?', 'Notes'],
          rows: [
            ['Operations cease', 'Yes', 'No more business activity'],
            ['50%+ ownership change', 'No', 'TCJA eliminated this rule'],
            ['1 partner remains', 'Yes', 'Need 2+ partners'],
            ['Merger into another partnership', 'Yes', 'Terminating partnership'],
            ['Conversion to LLC', 'Generally no', 'If same members, continues'],
          ],
        },
        {
          title: 'Merger Rules',
          type: 'text',
          content: "**Which Partnership Continues?**\n\n• The resulting partnership is treated as continuation of:\n  - The partnership whose partners own > 50% of resulting partnership\n\n• Other merging partnerships terminate\n\n**Example:**\nPartnership A merges into Partnership B.\nIf A's partners own 60% of B afterward, A continues, B terminates.\nIf B's partners own 60%, B continues, A terminates.",
        },
        {
          title: 'Division of Partnership',
          type: 'text',
          content: "**When Partnership Divides:**\n\n• Resulting partnership that has continuing partner interests continues the prior partnership\n\n• New partnership treated as newly formed\n\n**Considerations:**\n• Basis and holding periods may carry over\n• May need new EIN for new partnership\n• Section 704(c) considerations",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Partnership terminates when business ceases or only 1 partner",
            "50%+ ownership change NO longer causes termination (TCJA)",
            "Merger: partnership with > 50% continuing partners survives",
            "Other merging partnerships terminate",
            "Conversion to LLC generally is not a termination",
            "Division creates one continuing and one new partnership",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-026',
    courseId: 'ea',
    section: 'SEE2',
    title: 'S Corporation Shareholder Basis',
    description: 'Master the calculation of S corp shareholder stock basis',
    order: 26,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Stock basis', 'Debt basis', 'Distributions', 'Loss limitations'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "S corporation basis rules determine if losses are deductible and distributions are taxable. Unlike partnerships, S corp debt does NOT increase basis unless the shareholder lends money directly!",
        },
        {
          title: 'Stock Basis Formula',
          type: 'text',
          content: "**Annual Calculation:**\n\nStarting Basis\n+ Income items (ordinary and separately stated)\n+ Tax-exempt income\n- Nondeductible expenses\n- Distributions\n- Losses and deductions (limited to basis)\n= Ending Basis\n\n**Order matters!**\nDistributions reduce basis before losses.",
        },
        {
          title: 'Key Differences from Partnerships',
          type: 'table',
          headers: ['Item', 'Partnership', 'S Corporation'],
          rows: [
            ['Entity debt increases basis?', 'Yes (share of liabilities)', 'NO'],
            ['What increases basis?', 'Contributions + income + liabilities', 'Contributions + income + direct loans'],
            ['Debt basis exists?', 'No (built into outside basis)', 'Yes (separate calculation)'],
            ['Distributions reduce basis', 'After income', 'Before losses'],
          ],
        },
        {
          title: 'Debt Basis',
          type: 'text',
          content: "**S Corp Debt Basis:**\n\nShareholder gets basis for debt ONLY if:\n• Shareholder personally loans money to S corp\n• NOT loans from banks guaranteed by shareholder\n• NOT loans from related parties\n\n**Debt basis used:**\n• After stock basis exhausted\n• For losses only (not distributions)\n\n**Restoration:**\nWhen income exceeds losses, debt basis restored first, then stock basis increases.",
        },
        {
          title: 'Loss Limitation Ordering',
          type: 'text',
          content: "**Three Hurdles:**\n\n1. **Stock and Debt Basis Limitation**\n   - First against stock basis\n   - Then against debt basis\n\n2. **At-Risk Limitation**\n   - Amount shareholder can actually lose\n\n3. **Passive Activity Loss Rules**\n   - If passive, limited to passive income\n\n**Suspended losses carry forward indefinitely (until basis available or disposition).**",
        },
        {
          title: '⚠️ Exam Trap: Guaranteed Loans',
          type: 'warning',
          content: "**Guaranteeing corporate debt does NOT create basis!**\n\n**Common mistake:**\nS corp borrows $100K from bank.\nShareholder personally guarantees the loan.\nShareholder thinks they have $100K basis.\n\n**Reality:**\nNo basis from guarantee.\nMust actually advance funds to create debt basis.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "S corp basis from: contributions + income + direct loans",
            "Entity-level debt does NOT increase shareholder basis",
            "Debt basis only from actual loans to corporation",
            "Distributions reduce basis before losses",
            "Guarantees do NOT create basis",
            "Losses limited to stock + debt basis (then at-risk, then PAL)",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-027',
    courseId: 'ea',
    section: 'SEE2',
    title: 'S Corporation Built-In Gains Tax',
    description: 'Understand the BIG tax on C to S conversions',
    order: 27,
    duration: 45,
    difficulty: 'advanced',
    topics: ['Built-in gains', 'Recognition period', 'C to S conversion'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The BIG tax prevents C corps from converting to S status to avoid corporate-level tax on appreciated assets. Understanding this tax is critical for entity conversion planning!",
        },
        {
          title: 'What is BIG Tax?',
          type: 'text',
          content: "**Built-In Gains Tax:**\n\nCorporate-level tax (21%) on gains that existed when:\n• C corp converted to S corp, OR\n• S corp acquired C corp assets (certain transactions)\n\n**Purpose:**\nPrevent avoidance of corporate-level tax by converting to S status before selling appreciated assets.",
        },
        {
          title: 'Recognition Period',
          type: 'text',
          content: "**5-Year Recognition Period:**\n\nBIG tax applies to gains recognized within 5 years of S election.\n\n**After 5 years:**\nNo BIG tax - gains pass through tax-free to shareholders.\n\n**Planning opportunity:**\nWait 5 years after S election before selling highly appreciated C corp assets.",
        },
        {
          title: 'Calculating BIG Tax',
          type: 'table',
          headers: ['Step', 'Action'],
          rows: [
            ['1', 'Identify built-in gain (FMV - basis at conversion)'],
            ['2', 'Determine gain recognized during year'],
            ['3', 'Net built-in gain = lesser of recognized or remaining built-in'],
            ['4', 'Tax = 21% × net recognized built-in gain'],
            ['5', 'Reduce by net operating losses carried from C corp years'],
          ],
        },
        {
          title: 'Example',
          type: 'example',
          content: "**Facts:**\n• C corp converts to S corp on 1/1/2024\n• Asset A: Basis $50K, FMV $200K at conversion\n• Built-in gain: $150K\n• Year 2 (within recognition period): Sell for $220K\n\n**Analysis:**\n• Recognized gain: $170K ($220K - $50K)\n• Built-in gain at conversion: $150K\n• BIG tax applies to: $150K (lesser of recognized or built-in)\n• BIG tax: $150K × 21% = $31,500\n\n**Additional $20K gain passes through tax-free at corporate level.**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "BIG tax: 21% on gains that existed at C to S conversion",
            "Recognition period: 5 years from S election",
            "Only applies to gains recognized within recognition period",
            "Limited to built-in gain amount at conversion",
            "C corp NOLs can offset BIG tax",
            "After 5 years, no BIG tax exposure",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-028',
    courseId: 'ea',
    section: 'SEE2',
    title: 'S Corporation Passive Income Tax',
    description: 'Understand the excess passive income tax and termination risk',
    order: 28,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Excess passive income', 'LIFO recapture', '3-year termination'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "S corps with C corp history face a passive income tax if they hold too much investment income! Worse, 3 consecutive years can terminate the S election. Know when this applies!",
        },
        {
          title: 'When Does This Apply?',
          type: 'text',
          content: "**Two Requirements:**\n\n1. S corp has accumulated E&P from C corp years\n   (E&P = Earnings & Profits - retained earnings from C corp)\n\n2. Passive investment income > 25% of gross receipts\n\n**If BOTH present:**\n• Corporate-level tax on excess passive income\n• 3 consecutive years = S election terminates!",
        },
        {
          title: 'Passive Investment Income',
          type: 'list',
          content: [
            "Royalties",
            "Rents (unless active real estate business)",
            "Dividends",
            "Interest (not from trade or business)",
            "Annuities",
            "Gains from stocks and securities sales",
          ],
        },
        {
          title: 'Tax Calculation',
          type: 'text',
          content: "**Excess Net Passive Income:**\n\n(Net Passive Income) × (Passive Income - 25% of Gross Receipts) ÷ Passive Investment Income\n\n**Tax Rate:** 21%\n\n**Limitation:**\nCannot exceed taxable income for the year.\n\n**Pass-through effect:**\nAmount taxed at corporate level reduces shareholder pass-through.",
        },
        {
          title: '⚠️ Three-Year Termination Rule',
          type: 'warning',
          content: "**If for 3 consecutive years:**\n• S corp has C corp E&P, AND\n• Passive income > 25% of gross receipts\n\n**Consequence:**\nS election terminates as of first day of 4th year.\n\n**Solution:**\n• Distribute C corp E&P (taxable dividend)\n• Increase active business income\n• Watch passive income levels carefully!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Tax applies only if S corp has C corp E&P",
            "Passive income must exceed 25% of gross receipts",
            "Tax rate: 21% on excess net passive income",
            "3 consecutive years = S election terminates",
            "Solution: distribute C corp E&P as dividend",
            "Newly formed S corps don't have E&P (not applicable)",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-029',
    courseId: 'ea',
    section: 'SEE2',
    title: 'S Corporation Compensation Issues',
    description: 'Understand reasonable compensation requirements for S corp owners',
    order: 29,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Reasonable compensation', 'Payroll tax avoidance', 'IRS scrutiny'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "S corp owners who actively work must receive reasonable compensation! The IRS aggressively challenges low or zero salaries to avoid payroll taxes. This is an audit hot spot.",
        },
        {
          title: 'The Issue',
          type: 'text',
          content: "**Why owners underpay themselves:**\n\n• Distributions avoid payroll tax (15.3%)\n• Salary subject to payroll tax\n• Temptation: Take all income as distributions\n\n**IRS Response:**\n• Require \"reasonable compensation\"\n• Recharacterize distributions as wages\n• Assess payroll taxes + penalties + interest",
        },
        {
          title: 'What is Reasonable Compensation?',
          type: 'text',
          content: "**Factors IRS Considers:**\n\n• Training and experience\n• Duties and responsibilities\n• Time devoted to business\n• Comparable salaries in similar businesses\n• Compensation agreements with non-shareholders\n• Use of corporate profits for personal expenses\n• Business economic history",
        },
        {
          title: 'Compensation Guidelines',
          type: 'table',
          headers: ['Situation', 'Guidance'],
          rows: [
            ['Working owner', 'Must receive reasonable salary'],
            ['Passive investor', 'May take distributions only'],
            ['Part-time involvement', 'Proportionate salary required'],
            ['Multiple businesses', 'Salary from each where services rendered'],
            ['No revenue yet', 'May defer salary initially'],
          ],
        },
        {
          title: 'Consequences of Underpayment',
          type: 'text',
          content: "**If IRS recharacterizes distributions as wages:**\n\n• Back payroll taxes (employer + employee portions)\n• Failure to deposit penalties\n• Interest from original due dates\n• Potential accuracy-related penalties (20%)\n• Trust fund recovery penalty on responsible persons\n\n**Example:**\n$100K recharacterized × 15.3% = $15,300 payroll taxes\nPlus penalties and interest!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Active S corp owners must receive reasonable compensation",
            "Cannot pay zero salary and take all distributions",
            "IRS compares to what similar businesses pay",
            "Distributions in excess of salary are fine",
            "Recharacterization = back payroll taxes + penalties",
            "Document compensation decisions",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-030',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Choosing Business Entity Type',
    description: 'Compare entity types and understand the selection factors',
    order: 30,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Entity comparison', 'Tax factors', 'Non-tax factors'],
    blueprintArea: 'SEE2-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Choosing the right entity type is one of the most important business decisions! Tax implications, liability protection, and operational flexibility all depend on this choice.",
        },
        {
          title: 'Entity Comparison Overview',
          type: 'table',
          headers: ['Feature', 'C Corp', 'S Corp', 'Partnership/LLC', 'Sole Prop'],
          rows: [
            ['Entity-level tax', 'Yes (21%)', 'No', 'No', 'No'],
            ['SE tax on income', 'No (wages taxed)', 'No (distributions)', 'Yes (generally)', 'Yes'],
            ['Loss pass-through', 'No', 'Yes', 'Yes', 'Yes'],
            ['Liability protection', 'Yes', 'Yes', 'Yes (LLC)', 'No'],
            ['Ownership restrictions', 'None', 'Yes', 'None', 'N/A'],
            ['Fringe benefits', 'Deductible', 'Limited', 'Limited', 'Limited'],
          ],
        },
        {
          title: 'When to Choose C Corporation',
          type: 'list',
          content: [
            "Planning to go public or seek venture capital",
            "Retain significant earnings (21% rate < individual rates)",
            "Significant fringe benefit needs (> 2% owners)",
            "Foreign shareholders",
            "More than 100 shareholders",
            "Multiple classes of stock needed",
          ],
        },
        {
          title: 'When to Choose S Corporation',
          type: 'list',
          content: [
            "Avoid double taxation",
            "Pass through losses to shareholders",
            "Reduce self-employment tax (distributions not subject)",
            "Fewer than 100 shareholders",
            "All shareholders are U.S. individuals or certain trusts",
            "Single class of stock acceptable",
          ],
        },
        {
          title: 'When to Choose Partnership/LLC',
          type: 'list',
          content: [
            "Maximum flexibility in allocations",
            "Debt basis benefit important",
            "Special allocations needed",
            "More than 100 owners",
            "Foreign owners",
            "Corporate owners",
            "Multiple classes of interests needed",
          ],
        },
        {
          title: 'QBI Deduction Consideration',
          type: 'text',
          content: "**Section 199A - 20% QBI Deduction:**\n\n• Available for pass-through entities (S corps, partnerships, sole props)\n• NOT available for C corporations\n• Phase-outs for specified service businesses (SSTB)\n• Income limitations apply\n\n**Can make pass-through more attractive than C corp in some cases!**\n\nEffective rate on pass-through: 37% × 80% = 29.6% vs. 21% + shareholder tax",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "C corp: Entity-level tax, best for retention or public companies",
            "S corp: Pass-through, reduces SE tax, ownership restrictions",
            "Partnership/LLC: Maximum flexibility, debt basis, no owner limits",
            "QBI deduction: 20% for pass-throughs, not C corps",
            "Consider both tax and non-tax factors",
            "Entity choice can be changed (with tax consequences)",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE2-4: C CORPORATIONS (Lessons 31-45)
  // ============================================================================

  {
    id: 'SEE2-031',
    courseId: 'ea',
    section: 'SEE2',
    title: 'C Corporation Formation and Income',
    description: 'Understand corporate formation, income recognition, and tax rates',
    order: 31,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Section 351', 'Corporate income', 'Flat tax rate'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "C corporations are the traditional corporate form with entity-level taxation. Understanding formation rules and the 21% flat rate is essential for tax planning and SEE success.",
        },
        {
          title: 'Corporate Tax Rate',
          type: 'text',
          content: "**Flat 21% Rate on Taxable Income**\n\nThe TCJA replaced graduated rates with a single 21% rate.\n\n**Key Points:**\n• No personal service corporation penalty rate\n• No accumulated earnings tax rate change\n• Alternative minimum tax eliminated for corps\n\n**Double Taxation:**\nCorporate income taxed at 21%\n+ Dividends taxed to shareholders at 0%/15%/20%\n= Effective combined rate can exceed 35%",
        },
        {
          title: 'Section 351: Tax-Free Formation',
          type: 'text',
          content: "**Requirements for Nonrecognition:**\n\n1. **Transfer of property** (not services)\n2. **Solely in exchange for stock**\n3. **Transferors control corporation immediately after** (≥80%)\n\n**Control:** 80% of voting AND 80% of each class of nonvoting\n\n**Result if met:**\n• No gain/loss to transferors\n• Corporation takes carryover basis\n• Stock basis = basis of property transferred (minus boot + gain recognized)",
        },
        {
          title: 'Exceptions to Section 351',
          type: 'text',
          content: "**Boot Received:**\nIf cash or property other than stock is received:\n• Gain recognized to extent of boot (not loss)\n• Gain character depends on property transferred\n\n**Services:**\n• Stock for services = ordinary income to recipient\n• The service provider doesn't count toward 80% control test\n\n**Liability Assumption:**\nGenerally doesn't trigger gain unless:\n• Tax avoidance purpose, or\n• Liabilities exceed basis of ALL transferred property",
        },
        {
          title: 'Corporate Income Recognition',
          type: 'text',
          content: "**Gross Income = Same as individuals (generally):**\n• Business income\n• Investment income\n• Gains from property sales\n• Other income\n\n**Special Corporate Items:**\n• Dividends received deduction (DRD)\n• No preferential capital gains rates\n• No above-the-line deductions\n• Different charitable contribution limits\n\n**Taxable Income:**\nGross income - Deductions = Taxable Income\nTaxable Income × 21% = Tax",
        },
        {
          title: 'Dividends Received Deduction',
          type: 'table',
          headers: ['Ownership', 'DRD Percentage', 'Limitation'],
          rows: [
            ['< 20%', '50%', 'Cannot exceed 50% of taxable income'],
            ['20% - 80%', '65%', 'Cannot exceed 65% of taxable income'],
            ['≥ 80%', '100%', 'No limitation'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "C corporations taxed at flat 21% rate",
            "Section 351 allows tax-free formation with 80% control",
            "Boot received triggers gain recognition",
            "Stock for services = immediate ordinary income",
            "DRD: 50%, 65%, or 100% based on ownership percentage",
            "No preferential capital gains rates for corporations",
            "AMT eliminated for corporations under TCJA",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-032',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Corporate Distributions and Dividends',
    description: 'Understand the rules for corporate distributions to shareholders',
    order: 32,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['E&P', 'Dividend vs return of capital', 'Constructive dividends'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Whether a corporate distribution is a taxable dividend, return of capital, or capital gain depends on Earnings & Profits (E&P). This is a crucial concept for C corporation taxation.",
        },
        {
          title: 'E&P Overview',
          type: 'text',
          content: "**Earnings & Profits (E&P):**\nA tax concept measuring a corporation's ability to pay dividends.\n\n**Similar to retained earnings but NOT identical:**\n• Starts with taxable income\n• Add back tax-exempt income\n• Add back certain timing differences\n• Subtract federal income tax paid\n• Subtract non-deductible/non-capital expenses\n\n**Two types:**\n• Current E&P (this year's earnings)\n• Accumulated E&P (prior years' cumulative)",
        },
        {
          title: 'Distribution Ordering Rules',
          type: 'text',
          content: "**How to Characterize a Distribution:**\n\n**Step 1:** First from CURRENT E&P (pro-rata if multiple distributions)\n→ Dividend\n\n**Step 2:** Then from ACCUMULATED E&P\n→ Dividend\n\n**Step 3:** Return of capital (reduces stock basis)\n→ Not taxable\n\n**Step 4:** After basis reduced to zero\n→ Capital gain\n\n**Key:** Current E&P is allocated pro-rata to all distributions; accumulated is chronological.",
        },
        {
          title: 'Example: Distribution Characterization',
          type: 'example',
          content: "**Facts:**\n• Current E&P: $30,000\n• Accumulated E&P: $20,000\n• Total distribution: $75,000\n• Shareholder basis: $10,000\n\n**Analysis:**\n• Dividend (current E&P): $30,000\n• Dividend (accumulated E&P): $20,000\n• Return of capital (reduces basis): $10,000\n• Capital gain (excess): $15,000\n\n**After distribution:**\nShareholder basis = $0",
        },
        {
          title: 'Constructive Dividends',
          type: 'text',
          content: "**What are Constructive Dividends?**\nDistributions disguised as something else:\n\n**Common Examples:**\n• Below-market rent on corporate property to shareholder\n• Above-market compensation to shareholder-employees\n• Personal expenses paid by corporation\n• Loans to shareholders with no repayment intent\n• Bargain sales of property to shareholders\n\n**Tax Treatment:**\n• Dividend to shareholder (current + accumulated E&P)\n• Often nondeductible to corporation\n• Double whammy!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "E&P measures dividend-paying capacity",
            "Distributions first from current E&P (pro-rata)",
            "Then from accumulated E&P (chronological)",
            "After E&P exhausted: return of capital, then capital gain",
            "Constructive dividends can arise from disguised benefits",
            "Qualified dividends taxed at preferential rates to shareholders",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-033',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Stock Redemptions',
    description: 'Understand when redemptions qualify for sale or exchange treatment',
    order: 33,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Section 302', 'Attribution rules', 'Sale treatment'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Stock redemptions can be treated as a sale (capital gain) or as a dividend (ordinary income). Understanding the tests for sale treatment can save shareholders significant taxes!",
        },
        {
          title: 'Redemption Basics',
          type: 'text',
          content: "**Stock Redemption:**\nCorporation buys back (redeems) its own stock from a shareholder.\n\n**Two Possible Treatments:**\n\n**Sale Treatment (preferred):**\n• Shareholder recognizes capital gain/loss\n• Amount realized minus basis = gain/loss\n• Basis is recovered\n\n**Dividend Treatment:**\n• Entire amount is dividend (to extent of E&P)\n• No basis recovery\n• Ordinary income (qualified dividend rates may apply)",
        },
        {
          title: 'Section 302 Tests for Sale Treatment',
          type: 'table',
          headers: ['Test', 'Requirement'],
          rows: [
            ['Not essentially equivalent to dividend', 'Meaningful reduction in voting power (subjective)'],
            ['Substantially disproportionate', '< 50% voting power AND < 80% of pre-redemption ownership'],
            ['Complete termination', 'All shares redeemed (family attribution can be waived)'],
            ['Partial liquidation (corporate)', 'Part of business contracted/terminated'],
          ],
        },
        {
          title: 'Attribution Rules',
          type: 'text',
          content: "**Constructive Ownership (Section 318):**\n\nShares owned by others are attributed to taxpayer:\n\n**Family Attribution:**\n• Spouse, children, grandchildren, parents\n• NOT siblings!\n\n**Entity Attribution:**\n• Shareholder owns 50%+ of entity → attributed proportionally from entity\n• Entity attributed ownership from 50%+ shareholders\n\n**Option Attribution:**\n• Option to acquire → treated as owner",
        },
        {
          title: 'Waiver of Family Attribution',
          type: 'text',
          content: "**Available for Complete Terminations:**\n\nFamily attribution can be waived if:\n• All stock actually owned is redeemed\n• No interest in corporation (other than creditor) for 10 years\n• Does not acquire interest within 10 years (other than by bequest)\n• Files agreement to notify IRS if reacquisition\n\n**Result:** Can treat as complete termination even though family members still own stock.",
        },
        {
          title: '⚠️ Exam Trap: Attribution Matters!',
          type: 'warning',
          content: "**Always check attribution:**\n\n**Example:**\n• Father owns 60%, Son owns 40%\n• Father is redeemed completely\n• Father is attributed Son's 40%\n• Without waiver: NOT complete termination!\n• Still owns 40% constructively\n\n**Solution:** Waive family attribution if available.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sale treatment = capital gain/loss with basis recovery",
            "Dividend treatment = ordinary income, no basis recovery",
            "Must meet Section 302 test for sale treatment",
            "Attribution rules affect ownership percentage analysis",
            "Family attribution: spouse, children, grandchildren, parents",
            "Complete termination can waive family attribution",
            "Substantially disproportionate: < 80% of previous percentage",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-034',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Corporate Liquidations',
    description: 'Understand the tax consequences of liquidating a corporation',
    order: 34,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Section 331', 'Section 332', 'Section 336'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Liquidating a corporation has significant tax consequences for both the corporation and shareholders. Understanding these rules is essential for planning and executing exit strategies.",
        },
        {
          title: 'General Rule: Section 331',
          type: 'text',
          content: "**Shareholder Treatment (Non-Corporate):**\n\n• Amounts received treated as payment for stock\n• Gain/loss = Amount received - Stock basis\n• Character: Capital gain/loss\n\n**Corporation Treatment (Section 336):**\n• Corporation recognizes gain/loss on distribution\n• As if property sold at FMV\n• Subject to depreciation recapture rules",
        },
        {
          title: 'Exception: Section 332',
          type: 'text',
          content: "**Parent-Subsidiary Liquidations:**\n\nIf parent owns 80%+ of subsidiary:\n\n**Parent (Shareholder):**\n• NO gain or loss recognized\n• Takes carryover basis in assets\n• Inherits subsidiary's tax attributes (NOLs, E&P)\n\n**Subsidiary (Corporation):**\n• Generally NO gain or loss recognized (Section 337)\n\n**Requirements:**\n• 80% ownership (voting + value)\n• Complete liquidation\n• Complete within 3 years or single plan",
        },
        {
          title: 'Shareholder Basis in Property',
          type: 'table',
          headers: ['Situation', 'Shareholder Basis'],
          rows: [
            ['Section 331 (non-parent)', 'FMV at distribution'],
            ['Section 332 (parent)', 'Carryover from subsidiary'],
            ['Minority shareholder in 332', 'FMV (treated as Section 331)'],
          ],
        },
        {
          title: 'Loss Limitations',
          type: 'text',
          content: "**Losses NOT Recognized by Liquidating Corp:**\n\n• Distributions to related persons (> 50%)\n• Property distributed acquired in Section 351/contribution within 5 years with tax avoidance purpose\n• Property subject to liability exceeding basis\n\n**Anti-Stuffing Rules:**\nPrevent contributions of loss property shortly before liquidation.",
        },
        {
          title: 'Planning Considerations',
          type: 'text',
          content: "**Before Liquidating:**\n\n• Distribute appreciated property: Corporate-level gain + shareholder gain\n• Built-in losses may be limited\n• Consider S election before liquidation to avoid double tax on appreciation\n• Parent-subsidiary liquidations (332) can defer gain\n• E&P and tax attributes transfer to parent in 332\n\n**Timing:** All distributions within same taxable year if possible.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Section 331: Shareholders recognize capital gain/loss on liquidation",
            "Section 336: Corporation recognizes gain/loss on distribution",
            "Section 332: Tax-free for 80%+ parent, carryover basis",
            "Section 337: Subsidiary doesn't recognize gain/loss when liquidating into parent",
            "Loss limitations apply to related party distributions",
            "Minority shareholders always use Section 331 treatment",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-035',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Accumulated Earnings Tax',
    description: 'Understand the penalty tax on excess corporate accumulations',
    order: 35,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['AET', 'Reasonable needs', 'Accumulated earnings credit'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The accumulated earnings tax is a penalty tax designed to prevent C corporations from avoiding shareholder-level tax by accumulating earnings instead of distributing dividends.",
        },
        {
          title: 'AET Basics',
          type: 'text',
          content: "**Tax Rate:** 20% (same as top dividend rate)\n\n**Applies to:**\n• C corporations (not S corps)\n• That accumulate earnings beyond reasonable business needs\n• With intent to avoid shareholder-level tax\n\n**Tax Base:**\nAccumulated taxable income = Taxable income (with adjustments) - Dividends Paid Deduction - Accumulated Earnings Credit",
        },
        {
          title: 'Accumulated Earnings Credit',
          type: 'text',
          content: "**Minimum Credit:**\n• $250,000 (most corporations)\n• $150,000 (personal service corporations)\n\n**What it allows:**\nCorporation can accumulate up to credit amount without AET, even without specific plans.\n\n**Reasonable Needs Above Credit:**\nMust be justified by specific, definite, and feasible plans.",
        },
        {
          title: 'Reasonable Business Needs',
          type: 'list',
          content: [
            "Business expansion and plant acquisition",
            "Debt retirement",
            "Working capital needs",
            "Acquiring another business",
            "Self-insurance reserves",
            "Realistic contingency needs",
            "Investment in subsidiaries",
            "Product liability reserves",
          ],
        },
        {
          title: 'NOT Reasonable Business Needs',
          type: 'list',
          content: [
            "Loans to shareholders",
            "Personal investments unrelated to business",
            "Vague or indefinite plans",
            "Already adequate working capital",
            "Accumulations for purposes already funded",
            "Investments in property not used in business",
          ],
        },
        {
          title: 'Avoiding AET',
          type: 'text',
          content: "**Best Practices:**\n\n• Document specific plans for retained earnings\n• Corporate minutes should reflect decisions\n• Pay reasonable dividends\n• Maintain records of business needs\n• Consider S election\n\n**Documentation is key!**\nIRS burden to prove tax avoidance purpose, but shifts to corporation with specific evidence.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "AET: 20% penalty on excess accumulated earnings",
            "Minimum credit: $250,000 ($150,000 for PSCs)",
            "Must document specific, definite, feasible plans",
            "Loans to shareholders suggest tax avoidance",
            "S corporations exempt from AET",
            "Dividends paid reduce exposure",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-036',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Personal Holding Company Tax',
    description: 'Understand the PHC penalty tax and how to avoid it',
    order: 36,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['PHC', 'PHC income', '20% tax'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The PHC tax is another penalty tax on C corporations! It targets closely-held corporations that are primarily investment vehicles. Understanding the tests helps avoid this 20% penalty.",
        },
        {
          title: 'PHC Definition',
          type: 'text',
          content: "**Two-Part Test:**\n\n**1. Stock Ownership Test:**\n• More than 50% of stock owned by 5 or fewer individuals\n• At any time during last half of year\n• Apply attribution rules\n\n**2. Income Test:**\n• PHC income is 60%+ of adjusted ordinary gross income\n\n**Both tests must be met** for PHC status.",
        },
        {
          title: 'PHC Income',
          type: 'list',
          content: [
            "Dividends, interest, royalties, annuities",
            "Rents (if < 50% of AOGI, subject to 10% test)",
            "Mineral, oil, gas royalties (with exceptions)",
            "Copyright royalties (with exceptions)",
            "Personal service contracts (named person)",
            "Amounts from estates/trusts",
          ],
        },
        {
          title: 'Rent Exception',
          type: 'text',
          content: "**Rents are NOT PHC Income if:**\n\n• Rents are 50%+ of adjusted ordinary gross income, AND\n• Other PHC income (dividends, etc.) is ≤ 10% of ordinary gross income, OR\n  - Dividends paid equal or exceed other PHC income minus 10%\n\n**Why it matters:**\nReal estate corporations can often avoid PHC if primarily rental company.",
        },
        {
          title: 'PHC Tax',
          type: 'text',
          content: "**Tax Rate:** 20%\n\n**Tax Base:**\nUndistributed PHC Income = Taxable income (adjusted) - Federal income tax - Dividends paid\n\n**How to Avoid Tax:**\n• Distribute all PHC income as dividends\n• Consent dividends (shareholder agreement without cash)\n• Deficiency dividends (after IRS determination)\n\n**Automatic if tests met** - no intent requirement unlike AET.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "PHC: 5 or fewer individuals own > 50% AND PHC income ≥ 60% of AOGI",
            "PHC Tax: 20% on undistributed PHC income",
            "PHC Income: Passive income (dividends, interest, royalties, etc.)",
            "Rent exception: 50%+ rental income may avoid PHC status",
            "Avoid by paying dividends on PHC income",
            "No intent required (unlike AET)",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-037',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Related Party Transactions',
    description: 'Understand special rules for related party transactions',
    order: 37,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Section 267', 'Related parties', 'Loss disallowance'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Transactions between related parties get extra scrutiny! Loss disallowance, expense deferral, and ordinary income treatment are common consequences. Know the related party rules!",
        },
        {
          title: 'Who Are Related Parties?',
          type: 'list',
          content: [
            "Family members (siblings, spouse, ancestors, lineal descendants)",
            "Individual and corporation (> 50% ownership directly/indirectly)",
            "Two corporations in same controlled group",
            "Grantor and fiduciary of trust",
            "Fiduciaries of two trusts with same grantor",
            "Corporation and partnership with > 50% common ownership",
            "Two partnerships with > 50% common ownership",
          ],
        },
        {
          title: 'Section 267(a)(1): Loss Disallowance',
          type: 'text',
          content: "**Losses on Sale to Related Party:**\n\nLoss is disallowed when selling property to related party.\n\n**What happens to the loss?**\nBuyer can use it to reduce gain on later sale to unrelated party.\n\n**Example:**\n• Seller's basis: $10,000\n• Sale to related party: $6,000\n• Loss disallowed: $4,000\n• Buyer's basis: $6,000 (cost)\n• Buyer later sells for $12,000\n• Buyer's gain: $2,000 ($6,000 reduced by $4,000 disallowed loss)",
        },
        {
          title: 'Section 267(a)(2): Expense Deferral',
          type: 'text',
          content: "**Accrual-Cash Matching:**\n\nWhen accrual-method payer owes cash-method payee:\n\n• Payer cannot deduct until payee includes in income\n• Prevents timing mismatch\n\n**Example:**\n• Corp (accrual) accrues $10,000 salary to owner (cash)\n• Owner doesn't receive until next year\n• Corp cannot deduct until owner receives payment",
        },
        {
          title: 'Section 1239: Ordinary Income',
          type: 'text',
          content: "**Gain on Depreciable Property:**\n\nSale of depreciable property to related party = ordinary income (not capital gain).\n\n**Why?**\nPrevents converting ordinary depreciation deductions to capital gain.\n\n**Example:**\n• Sell building to controlled corporation\n• Corporation will depreciate\n• Seller's gain is ordinary income",
        },
        {
          title: 'Controlled Group Rules',
          type: 'text',
          content: "**Section 1563: Brother-Sister Controlled Group:**\n\n• 5 or fewer persons own 80%+ of each corporation\n• Same persons own > 50% of each (counting only identical ownership)\n\n**Parent-Subsidiary Controlled Group:**\n• Parent owns 80%+ of subsidiary\n\n**Effect:**\n• Share single $250,000 accumulated earnings credit\n• Share tax brackets (less relevant with flat rate)\n• Related party rules apply between members",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Related parties: family, > 50% ownership, controlled groups",
            "Section 267(a)(1): Loss disallowed on sale to related party",
            "Disallowed loss can offset buyer's later gain",
            "Section 267(a)(2): Accrual deduction deferred until payee includes",
            "Section 1239: Gain on depreciable property to related party = ordinary",
            "Controlled groups share certain tax attributes",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-038',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Corporate Reorganizations Overview',
    description: 'Understand tax-free reorganization types and requirements',
    order: 38,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Type A', 'Type B', 'Type C', 'Type D reorganizations'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Corporate reorganizations can be structured to defer gain recognition. Understanding the alphabet soup of reorg types helps clients make tax-efficient business combination decisions!",
        },
        {
          title: 'What is a Reorganization?',
          type: 'text',
          content: "**Tax-free reorganization allows:**\n\n• Combining or dividing corporations\n• Changing corporate structure\n• Without immediate tax recognition\n\n**Key principle:**\nContinuity - shareholders/business continues in modified form.\n\n**Types:** A, B, C, D, E, F, G (the alphabet types)",
        },
        {
          title: 'Reorganization Types',
          type: 'table',
          headers: ['Type', 'Description', 'Key Requirements'],
          rows: [
            ['Type A', 'Statutory merger/consolidation', 'State law merger'],
            ['Type B', 'Stock for stock', 'Solely voting stock, 80% control'],
            ['Type C', 'Stock for assets', 'Substantially all assets'],
            ['Type D', 'Transfer to controlled corp', 'Acquisitive or divisive'],
            ['Type E', 'Recapitalization', 'Change in capital structure'],
            ['Type F', 'Mere change in form', 'Name, state, or form change'],
            ['Type G', 'Bankruptcy reorganization', 'Under bankruptcy code'],
          ],
        },
        {
          title: 'Common Requirements',
          type: 'text',
          content: "**Continuity of Interest (COI):**\n• Target shareholders must receive substantial equity stake in acquiring corp\n• Generally 40%+ value in stock\n\n**Continuity of Business Enterprise (COBE):**\n• Acquiring corp continues target's historic business OR\n• Uses significant portion of target's assets\n\n**Business Purpose:**\n• Valid business reason beyond tax avoidance",
        },
        {
          title: 'Tax Consequences',
          type: 'text',
          content: "**If Qualifies as Reorganization:**\n\n**Shareholders:**\n• No gain/loss on exchange of stock for stock\n• Boot (cash/property) triggers gain to extent received\n• Substituted basis in new stock\n\n**Corporations:**\n• No gain/loss to acquiring corp on issuance of stock\n• Target's basis carries over to acquiring corp\n• Tax attributes (NOLs, E&P) may transfer with limitations",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Reorganizations allow tax-free corporate combinations",
            "Type A: statutory merger under state law",
            "Type B: stock for stock (solely voting stock)",
            "Type C: stock for substantially all assets",
            "Must meet COI and COBE requirements",
            "Boot triggers gain recognition to shareholders",
            "Tax attributes may transfer with limitations",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-039',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Corporate Tax Credits',
    description: 'Understand major business tax credits available to corporations',
    order: 39,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Research credit', 'Work opportunity credit', 'General business credit'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Business tax credits directly reduce tax liability dollar-for-dollar! Understanding available credits helps businesses maximize tax savings.",
        },
        {
          title: 'General Business Credit',
          type: 'text',
          content: "**Umbrella Credit (Form 3800):**\n\nCombines multiple business credits into one:\n• Investment credit\n• Work opportunity credit\n• Research credit\n• Small employer health insurance credit\n• Disabled access credit\n• And many more!\n\n**Limitation:**\nNet income tax - greater of TMT or 25% of net regular tax over $25,000",
        },
        {
          title: 'Research & Development Credit',
          type: 'text',
          content: "**Section 41 Credit:**\n\n**Regular Credit:**\n• 20% of qualified research expenses (QRE) over base amount\n\n**Alternative Simplified Credit:**\n• 14% of QRE over 50% of average prior 3-year QRE\n\n**Qualified Research:**\n• Technological in nature\n• Intended to develop new or improved products\n• Substantially all activities are experimentation\n• Not adaptation, surveys, or routine testing",
        },
        {
          title: 'Work Opportunity Tax Credit',
          type: 'table',
          headers: ['Target Group', 'Maximum Credit', 'Notes'],
          rows: [
            ['Long-term family assistance', '$9,000', '40% of $10K 1st year + $10K 2nd year'],
            ['Veterans', 'Up to $9,600', 'Varies by unemployment period'],
            ['SNAP recipients', '$2,400', '40% of $6,000 first-year wages'],
            ['Ex-felons', '$2,400', '40% of $6,000 first-year wages'],
            ['Summer youth employees', '$1,200', '40% of $3,000 wages'],
          ],
        },
        {
          title: 'Small Employer Health Insurance Credit',
          type: 'text',
          content: "**Section 45R Credit:**\n\n**Maximum Credit:**\n• 50% of premiums paid (25% for tax-exempt employers)\n\n**Eligibility:**\n• Fewer than 25 FTE employees\n• Average wages < $58,000 (indexed)\n• Pays at least 50% of employee premiums\n• Purchased through SHOP Marketplace\n\n**Phase-out:** Reduced for 11-24 employees and higher wages",
        },
        {
          title: 'Disabled Access Credit',
          type: 'text',
          content: "**Section 44 Credit:**\n\n**Amount:** 50% of eligible expenditures\n**Range:** $250 - $10,250 (max credit $5,000)\n\n**Who Qualifies:**\n• Small business (< $1M gross receipts OR < 31 employees)\n\n**Eligible Expenditures:**\n• Removing barriers for disabled\n• Providing interpreters\n• Acquiring adaptive equipment\n• Producing accessible formats",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Business credits combine on Form 3800",
            "R&D Credit: 20% of qualified research over base",
            "WOTC: Credits for hiring targeted groups",
            "Small employer health credit: up to 50% of premiums",
            "Carryback 1 year, carryforward 20 years",
            "Credits directly reduce tax dollar-for-dollar",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-040',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Corporate Alternative Minimum Tax',
    description: 'Understand the corporate AMT for large corporations',
    order: 40,
    duration: 45,
    difficulty: 'advanced',
    topics: ['CAMT', 'Book income', 'Applicable corporations'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Inflation Reduction Act brought back corporate AMT! Large corporations now face a minimum 15% tax on adjusted financial statement income. Know when this applies!",
        },
        {
          title: 'Corporate AMT (CAMT)',
          type: 'text',
          content: "**Effective for tax years beginning after 12/31/2022:**\n\n**Rate:** 15% minimum tax\n\n**Base:** Adjusted Financial Statement Income (AFSI)\n\n**Applies to:** Applicable corporations meeting the average annual income test\n\n**Different from prior AMT** - this is based on book income, not taxable income adjustments.",
        },
        {
          title: 'Who is an Applicable Corporation?',
          type: 'text',
          content: "**Average Annual Adjusted Financial Statement Income:**\n\n• > $1 billion over 3 prior tax years (general test)\n• > $100 million for U.S. members of foreign-parented groups (if foreign parent group > $1 billion)\n\n**Once you're in, hard to get out:**\nMust stay below thresholds for extended period.\n\n**Excluding:**\n• S corporations\n• RICs and REITs\n• Private equity and partnership income",
        },
        {
          title: 'CAMT Calculation',
          type: 'text',
          content: "**Step 1:** Start with financial statement income\n\n**Step 2:** Make adjustments:\n• Adjustment for depreciation (tax vs. book)\n• Partner's distributive share of partnership income\n• Certain pension-related items\n\n**Step 3:** Apply 15% rate\n\n**Step 4:** Reduce by general business credits (up to 75%)\n\n**Step 5:** CAMT = excess of tentative minimum tax over regular tax",
        },
        {
          title: 'CAMT Credit',
          type: 'text',
          content: "**Carryforward Credit:**\n\nIf CAMT paid exceeds regular tax in future year:\n• Credit available against regular tax\n• Carries forward indefinitely\n• Reduces regular tax to extent it exceeds CAMT\n\n**Result:**\nCAMT is essentially timing - prepayment of taxes that would eventually be due.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CAMT: 15% minimum tax on adjusted book income",
            "Applies to corporations with > $1 billion average income",
            "$100 million threshold for U.S. subs of foreign groups",
            "Based on financial statement income (not taxable income)",
            "General business credits can offset up to 75%",
            "CAMT paid creates credit for future years",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-041',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Corporate Tax Return Filing',
    description: 'Understand Form 1120 requirements and due dates',
    order: 41,
    duration: 40,
    difficulty: 'beginner',
    topics: ['Form 1120', 'Due dates', 'Extensions', 'Schedules'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Knowing when and how to file corporate returns is fundamental for tax practice. Miss a deadline and face penalties. Know the rules!",
        },
        {
          title: 'Form 1120 Due Dates',
          type: 'table',
          headers: ['Calendar Year', 'Fiscal Year', 'Extension'],
          rows: [
            ['April 15', '15th day of 4th month after year-end', '6 months'],
            ['With extension: October 15', '15th day of 10th month after year-end', 'File Form 7004'],
          ],
        },
        {
          title: 'Required Schedules',
          type: 'text',
          content: "**Common Form 1120 Schedules:**\n\n• **Schedule C:** Dividends and Special Deductions\n• **Schedule J:** Tax Computation\n• **Schedule K:** Shareholders and Ownership\n• **Schedule L:** Balance Sheet\n• **Schedule M-1:** Reconciliation of Book/Tax Income\n• **Schedule M-2:** Analysis of Unappropriated Retained Earnings\n• **Schedule M-3:** Required if total assets ≥ $10 million",
        },
        {
          title: 'Estimated Tax',
          type: 'text',
          content: "**Quarterly Payments Required:**\n\n**Due Dates:** 15th of 4th, 6th, 9th, and 12th months\n\n**Amount:** Expected tax - credits\n\n**Safe Harbor:**\n• 100% of prior year tax (large corps: 100% current year required)\n\n**Large Corporations (> $1M taxable income in any of prior 3 years):**\n• Cannot use prior year safe harbor after first quarter\n• Must pay based on current year estimate",
        },
        {
          title: 'Penalties',
          type: 'text',
          content: "**Failure to File:** 5% per month (max 25%)\n\n**Failure to Pay:** 0.5% per month (max 25%)\n\n**Combined maximum:** 47.5% (22.5% FTF + 25% FTP)\n\n**Estimated Tax Underpayment:**\n• No penalty if tax owed < $500\n• Or meet safe harbor\n\n**Accuracy-Related Penalty:** 20% for negligence or substantial understatement",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "C corp returns due 15th of 4th month after year-end",
            "6-month extension available (Form 7004)",
            "Schedule M-3 required if assets ≥ $10 million",
            "Quarterly estimated tax payments required",
            "Large corps limited in prior year safe harbor",
            "Failure to file penalty: 5%/month up to 25%",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-042',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Dividends Received Deduction',
    description: 'Understand the DRD for corporate shareholders',
    order: 42,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['DRD percentages', 'Ownership thresholds', 'Taxable income limitation'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When a corporation receives dividends from another corporation, triple taxation would occur without relief. The Dividends Received Deduction (DRD) mitigates this by allowing a partial or full deduction!",
        },
        {
          title: 'DRD Percentages',
          type: 'table',
          headers: ['Ownership %', 'DRD %', 'Effective Tax Rate'],
          rows: [
            ['< 20%', '50%', '10.5%'],
            ['20% - 79%', '65%', '7.35%'],
            ['80%+', '100%', '0%'],
          ],
        },
        {
          title: 'Taxable Income Limitation',
          type: 'text',
          content: "**DRD is limited to percentage of taxable income:**\n\n**The limitation:**\n• 50% DRD limited to 50% of taxable income\n• 65% DRD limited to 65% of taxable income\n\n**Exception - no limitation if:**\nDRD creates or increases a net operating loss.\n\n**Example:**\nIf taking full DRD pushes company into a loss position, take full DRD without limitation.",
        },
        {
          title: 'Non-Qualifying Dividends',
          type: 'list',
          content: [
            "Dividends from tax-exempt corporations",
            "Dividends on debt-financed portfolio stock",
            "Dividends from foreign corporations (generally)",
            "Dividends from real estate investment trusts",
            "Dividends considered 'extraordinary'",
            "Stock held less than 46 days",
          ],
        },
        {
          title: 'Holding Period Requirement',
          type: 'text',
          content: "**Must hold stock more than 45 days:**\n\nDuring 91-day period beginning 45 days before ex-dividend date.\n\n**For preferred stock with dividends attributable to > 366 days:**\n• Must hold more than 90 days\n• During 181-day period\n\n**Purpose:** Prevent dividend stripping (buy stock for dividend, sell immediately).",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "DRD prevents triple taxation of intercorporate dividends",
            "50% DRD for < 20% ownership",
            "65% DRD for 20-79% ownership",
            "100% DRD for 80%+ ownership (affiliated group)",
            "Limited to % of taxable income (unless creates NOL)",
            "Must hold stock more than 45 days (generally)",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-043',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Corporate Charitable Contributions',
    description: 'Understand charitable deduction rules for corporations',
    order: 43,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['10% limitation', 'Property contributions', 'Carryover'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Corporate charitable contributions are limited to 10% of taxable income! Understanding the calculation, special rules for property, and carryover provisions is essential.",
        },
        {
          title: 'Basic Deduction Limit',
          type: 'text',
          content: "**10% of Taxable Income:**\n\n**Calculated BEFORE:**\n• Charitable contribution deduction\n• DRD (dividends received deduction)\n• NOL carryback\n• Capital loss carryback\n\n**Excess contributions:**\nCarryforward 5 years (FIFO).\n\n**No carryback for charitable contributions.**",
        },
        {
          title: 'Accrual Method Election',
          type: 'text',
          content: "**Unique to C Corporations:**\n\nAccrual-method corporation can elect to deduct contribution in year authorized by board of directors if:\n\n• Authorized by board during tax year\n• Actually paid by 15th day of 4th month after year-end\n\n**Attach statement to return claiming election.**\n\n**Practical benefit:** Deduct in year 1, pay in year 2.",
        },
        {
          title: 'Property Contributions',
          type: 'table',
          headers: ['Property Type', 'Deduction Amount'],
          rows: [
            ['Ordinary income property', 'Cost basis (generally)'],
            ['Long-term capital gain property', 'FMV (generally)'],
            ['Inventory to qualified charity', 'Basis + 50% of appreciation (max 2× basis)'],
            ['Scientific equipment to universities', 'Basis + 50% of appreciation'],
          ],
        },
        {
          title: 'Enhanced Deduction for Inventory',
          type: 'text',
          content: "**Qualified contributions of inventory:**\n\n**Eligible property:**\n• Food inventory (all taxpayers)\n• Other inventory to certain charities serving ill, needy, infants\n\n**Deduction:**\nLesser of:\n• Basis + 50% of appreciation, OR\n• 2 × basis\n\n**Must be used for charitable purpose (not resale)**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Corporate charitable deduction limited to 10% of modified TI",
            "Excess carries forward 5 years",
            "Accrual corps can elect to deduct if paid by 3½ months after year-end",
            "Ordinary income property: basis deduction",
            "LTCG property: FMV deduction (generally)",
            "Enhanced deduction for inventory to qualified charities",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-044',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Corporate Capital Losses',
    description: 'Understand capital loss treatment for corporations',
    order: 44,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Capital loss carryback', 'Carryforward', 'No offset against ordinary'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Corporate capital losses are treated very differently than individual capital losses! No offset against ordinary income, but carryback is available. Know the differences!",
        },
        {
          title: 'Corporate vs. Individual Capital Losses',
          type: 'table',
          headers: ['Feature', 'Corporation', 'Individual'],
          rows: [
            ['Offset ordinary income?', 'No', 'Yes ($3,000/year)'],
            ['Carryback', '3 years', 'None'],
            ['Carryforward', '5 years', 'Indefinite'],
            ['Character on carryback', 'Short-term', 'Retains character'],
          ],
        },
        {
          title: 'Carryback/Carryforward Rules',
          type: 'text',
          content: "**Net Capital Loss Carryback:**\n• Carry back 3 years first\n• Then forward 5 years\n• Treated as short-term capital loss in carryover year\n\n**Order:** Oldest year first (FIFO)\n\n**Cannot create or increase NOL** in carryback year - limited to capital gains in that year.\n\n**Expires after 5-year carryforward** - not indefinite like individual.",
        },
        {
          title: 'Example',
          type: 'example',
          content: "**Year 6: Net capital loss of $50,000**\n\n**Carryback order:**\n• Year 3: Had $10,000 capital gain → Absorb $10,000\n• Year 4: Had $5,000 capital gain → Absorb $5,000\n• Year 5: Had $0 capital gain → Absorb $0\n• Remaining: $35,000 carries forward\n\n**Carryforward:**\n• Years 7-11: Use against any capital gains\n• If unused by Year 11 → Lost forever",
        },
        {
          title: 'Planning Considerations',
          type: 'text',
          content: "**Managing Capital Losses:**\n\n• Time capital gains to match capital loss years\n• Consider installment sales to spread gains\n• Watch 5-year expiration on carryforwards\n• Related party sales: no loss allowed (Section 267)\n• Wash sale rules apply to corporations\n\n**Cannot use capital losses against ordinary income** - this is a major planning consideration!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Corporate capital losses cannot offset ordinary income",
            "Carryback 3 years, carryforward 5 years",
            "All carryovers treated as short-term",
            "Expires if not used within carryover period",
            "Different from individuals (who get $3K ordinary offset)",
            "Time gains to absorb loss carryovers before expiration",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-045',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Corporate NOL Rules',
    description: 'Understand the corporate net operating loss deduction',
    order: 45,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['NOL deduction', '80% limitation', 'Carryforward'],
    blueprintArea: 'SEE2-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Corporate NOLs can provide valuable future tax savings! Understanding the TCJA changes (no carryback, 80% limit) is essential for corporate tax planning.",
        },
        {
          title: 'Current NOL Rules (Post-TCJA)',
          type: 'text',
          content: "**For NOLs arising in tax years beginning after 12/31/2020:**\n\n**No carryback** (with limited exceptions)\n\n**Indefinite carryforward**\n\n**80% limitation:**\n• NOL deduction limited to 80% of taxable income\n• 20% of income always taxed\n\n**Exception:** Farming and insurance companies have special rules.",
        },
        {
          title: 'NOL Calculation',
          type: 'text',
          content: "**Corporate NOL =**\nTaxable income if it's negative (a loss)\n\n**No adjustments needed** like individuals (no personal exemptions, etc.)\n\n**Deduction in carryforward year:**\nLesser of:\n• Available NOL carryforward, OR\n• 80% of taxable income (pre-NOL deduction)",
        },
        {
          title: 'Example Calculation',
          type: 'example',
          content: "**Year 1:** Corporation has $500,000 NOL\n**Year 2:** Taxable income (before NOL) = $400,000\n\n**NOL Deduction Calculation:**\n• Maximum allowed: 80% × $400,000 = $320,000\n• Available NOL: $500,000\n• Deduction: $320,000 (limited to 80%)\n\n**Year 2 Result:**\n• Taxable income: $400,000 - $320,000 = $80,000\n• Tax (21%): $16,800\n\n**Remaining NOL carryforward:** $180,000",
        },
        {
          title: 'Section 382 Limitations',
          type: 'text',
          content: "**Ownership Change Limitation:**\n\nIf > 50% ownership change in 3-year period:\n\n• Annual NOL use limited to:\n  - Value of loss corporation × long-term tax-exempt rate\n\n**Purpose:** Prevent trafficking in NOLs.\n\n**Example:**\n• Loss corp value: $1,000,000\n• Long-term rate: 5%\n• Annual limit: $50,000 NOL per year\n\n**Planning:** Structure acquisitions to avoid/minimize 382 limitations.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Post-TCJA: No carryback (generally), indefinite carryforward",
            "80% limitation: only deduct 80% of taxable income",
            "Always pay tax on at least 20% of income (if any)",
            "Section 382: ownership change limits annual NOL use",
            "Farming and insurance have special rules",
            "Pre-2018 NOLs may have different rules (CARES Act exceptions)",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE2-5: SPECIALIZED RETURNS (Lessons 46-55)
  // ============================================================================

  {
    id: 'SEE2-046',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Employment Taxes',
    description: 'Master payroll tax responsibilities and reporting requirements',
    order: 46,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['FICA', 'FUTA', 'Withholding', 'Deposit requirements'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Employment taxes are trust fund taxes - the IRS takes them very seriously! Failure to pay can result in the Trust Fund Recovery Penalty against responsible individuals. Know these rules!",
        },
        {
          title: 'FICA Tax Rates (2024)',
          type: 'table',
          headers: ['Component', 'Employee Rate', 'Employer Rate', 'Wage Base'],
          rows: [
            ['Social Security', '6.2%', '6.2%', '$168,600'],
            ['Medicare', '1.45%', '1.45%', 'No limit'],
            ['Additional Medicare', '0.9%', 'None', '>$200K ($250K MFJ)'],
            ['Total FICA', '7.65%+', '7.65%', 'Varies'],
          ],
        },
        {
          title: 'FUTA Tax',
          type: 'text',
          content: "**Federal Unemployment Tax:**\n\n• Rate: 6.0% (0.6% after credit for state tax)\n• Wage base: First $7,000 per employee per year\n• Employer-only tax (not withheld from employee)\n\n**State credit:** Up to 5.4% for paying state unemployment tax\n\n**Filing:** Form 940 (annual)",
        },
        {
          title: 'Deposit Requirements',
          type: 'text',
          content: "**Lookback Period:** Prior 12 months (July 1 - June 30)\n\n**Monthly Depositor:**\n• Taxes ≤ $50,000 in lookback period\n• Deposit by 15th of following month\n\n**Semiweekly Depositor:**\n• Taxes > $50,000 in lookback period\n• Wednesday/Thursday paydays → Deposit by following Wednesday\n• Friday/Saturday/Sunday/Monday/Tuesday paydays → Deposit by following Friday\n\n**$100,000 Next-Day Rule:**\nIf accumulated taxes ≥ $100,000, deposit by next banking day",
        },
        {
          title: 'Employment Tax Forms',
          type: 'table',
          headers: ['Form', 'Purpose', 'Frequency'],
          rows: [
            ['Form 941', 'Quarterly payroll tax return', 'Quarterly'],
            ['Form 944', 'Annual payroll (<$1,000)', 'Annual'],
            ['Form 940', 'FUTA tax return', 'Annual'],
            ['Form W-2', 'Wage statement to employees', 'Annual by Jan 31'],
            ['Form W-3', 'Transmittal of W-2s to SSA', 'Annual by Jan 31'],
          ],
        },
        {
          title: '⚠️ Trust Fund Recovery Penalty',
          type: 'warning',
          content: "**The 100% Penalty:**\n\nIf employment taxes are not paid, the IRS can assess a penalty equal to 100% of the trust fund taxes (employee withholding) against any \"responsible person\" who:\n\n• Had duty to collect/pay taxes, AND\n• Willfully failed to do so\n\n**Responsible persons may include:**\n• Officers\n• Directors\n• Employees with check-signing authority\n• Bookkeepers\n• EVEN tax professionals in some cases!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "FICA: 6.2% Social Security + 1.45% Medicare (each party)",
            "Social Security wage base: $168,600 (2024)",
            "Additional 0.9% Medicare on wages over $200K ($250K MFJ)",
            "FUTA: 6.0% on first $7,000 (0.6% after credit)",
            "Deposit frequency based on lookback period liability",
            "$100,000 rule: next banking day deposit",
            "Trust fund recovery penalty is 100% and personal!",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-047',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Retirement Plans for Businesses',
    description: 'Understand qualified retirement plan options for businesses',
    order: 47,
    duration: 60,
    difficulty: 'advanced',
    topics: ['SEP IRA', 'SIMPLE IRA', '401(k)', 'Defined benefit plans'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Retirement plans are a major tax planning tool for business owners! Choosing the right plan can save clients substantial taxes while building retirement security. Know the options!",
        },
        {
          title: 'Plan Comparison',
          type: 'table',
          headers: ['Plan Type', '2024 Contribution Limit', 'Best For'],
          rows: [
            ['SEP IRA', '25% of comp (max $69,000)', 'Self-employed, simple setup'],
            ['SIMPLE IRA', '$16,000 + match', 'Small employers (<100 employees)'],
            ['401(k)', '$23,000 + employer (total $69,000)', 'Larger employers, complex'],
            ['Defined Benefit', 'Actuarially determined', 'High income, wants maximum deduction'],
          ],
        },
        {
          title: 'SEP IRA',
          type: 'text',
          content: "**Simplified Employee Pension:**\n\n**Contribution Limits (2024):**\n• 25% of compensation OR\n• $69,000 maximum\n• Self-employed: 20% of net SE income\n\n**Key Features:**\n• Employer contributions only (no employee salary deferral)\n• Must cover all eligible employees (21+, 3 of last 5 years)\n• Setup deadline: tax return due date (inc. extensions)\n• Simple paperwork (Form 5305-SEP)\n• Contributions can vary year to year",
        },
        {
          title: 'SIMPLE IRA',
          type: 'text',
          content: "**Savings Incentive Match Plan for Employees:**\n\n**Contribution Limits (2024):**\n• Employee: $16,000 ($19,500 if 50+)\n• Employer: 2% nonelective OR 3% match\n\n**Eligibility:**\n• Employer with ≤100 employees\n• Cannot have any other qualified plan\n\n**Key Features:**\n• Must be established by October 1\n• Employee salary deferrals\n• Lower administrative costs than 401(k)\n• 25% early withdrawal penalty (first 2 years)",
        },
        {
          title: '401(k) Plans',
          type: 'text',
          content: "**2024 Limits:**\n• Employee elective deferrals: $23,000 ($30,500 if 50+)\n• Total additions (employee + employer): $69,000 ($76,500 if 50+)\n\n**Key Features:**\n• Allows employee salary deferrals + employer contributions\n• Can be traditional or Roth 401(k)\n• Required discrimination testing (ADP/ACP)\n• Safe harbor options avoid testing\n• Can include loan and hardship provisions\n\n**Solo 401(k):** Business owner with no employees (or only spouse)",
        },
        {
          title: 'Defined Benefit Plans',
          type: 'text',
          content: "**Formula determines benefit at retirement:**\n\nExample: 1.5% × years of service × final average salary\n\n**Contribution:** Whatever actuarially required to fund benefit\n\n**Advantages:**\n• Can shelter more income than any other plan\n• Particularly beneficial for older, high-earning owners\n\n**Disadvantages:**\n• Complex and expensive to administer\n• Funding requirements are mandatory\n• Must cover eligible employees with same formula",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SEP IRA: Up to $69,000, simple, employer contribution only",
            "SIMPLE IRA: Employee deferrals + employer match, ≤100 employees",
            "401(k): Maximum flexibility, higher limits, more complex",
            "Solo 401(k): For self-employed with no employees (except spouse)",
            "Defined benefit: Promise a benefit, contribute what's needed",
            "Contribution deadline: SEP can be set up through return due date",
            "All reduce taxable income dollar-for-dollar",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-048',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Worker Classification',
    description: 'Distinguish between employees and independent contractors',
    order: 48,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Employee vs IC', 'Common law test', 'Form SS-8'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Worker misclassification is a major IRS enforcement priority! Getting it wrong means back taxes, penalties, and potential personal liability. Know the tests!",
        },
        {
          title: 'Why Classification Matters',
          type: 'text',
          content: "**If Worker is Employee:**\n• Employer withholds income tax\n• Employer pays 7.65% FICA\n• Employee pays 7.65% FICA\n• Employer provides W-2\n\n**If Worker is Independent Contractor:**\n• No withholding\n• Worker pays full 15.3% SE tax\n• Worker receives Form 1099-NEC\n• Worker responsible for estimated taxes",
        },
        {
          title: 'Common Law Test',
          type: 'text',
          content: "**Three Categories of Evidence:**\n\n**1. Behavioral Control:**\n• Does business direct how work is done?\n• Training provided?\n• Instructions given?\n\n**2. Financial Control:**\n• Who invests in equipment?\n• Reimbursed expenses?\n• Opportunity for profit/loss?\n\n**3. Relationship Type:**\n• Written contracts?\n• Benefits provided?\n• Permanency of relationship?",
        },
        {
          title: 'Employee Indicators',
          type: 'list',
          content: [
            "Business sets work hours and location",
            "Business provides tools and equipment",
            "Worker receives training",
            "Work done at business's premises",
            "Paid by hour, week, or salary (not by job)",
            "Business provides benefits",
            "Long-term, continuing relationship",
            "Cannot subcontract the work",
          ],
        },
        {
          title: 'Independent Contractor Indicators',
          type: 'list',
          content: [
            "Controls how, when, and where to work",
            "Provides own tools and equipment",
            "Can work for multiple businesses",
            "Paid by the project/job",
            "Has investment in own business",
            "Can make profit or suffer loss",
            "Invoices for services",
            "Can hire assistants/subcontractors",
          ],
        },
        {
          title: 'Section 530 Relief',
          type: 'text',
          content: "**Safe Harbor for Misclassification:**\n\nEmployer may avoid employment tax if:\n• Reasonable basis for treating worker as IC\n  - IRS audit, court case, industry practice\n• Consistent treatment of similar workers\n• Filed all required 1099s\n\n**Form SS-8:** Request IRS determination of worker status (takes months).",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Three factors: behavioral, financial, relationship",
            "Control is key - more control = more likely employee",
            "No single factor is determinative",
            "Section 530 provides relief if reasonable basis",
            "Must file 1099-NEC for ICs paid $600+",
            "Misclassification: back taxes + interest + penalties",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-049',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Tax-Exempt Organizations',
    description: 'Understand 501(c)(3) and other exempt organizations',
    order: 49,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['501(c)(3)', 'Exempt purposes', 'Form 990', 'UBIT'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Tax-exempt organizations must follow strict rules to maintain their status! Understanding formation, reporting, and the limits of tax exemption helps serve nonprofit clients.",
        },
        {
          title: 'Types of Exempt Organizations',
          type: 'table',
          headers: ['Code Section', 'Type', 'Contributions Deductible?'],
          rows: [
            ['501(c)(3)', 'Charitable, religious, educational', 'Yes'],
            ['501(c)(4)', 'Social welfare organizations', 'No'],
            ['501(c)(6)', 'Business leagues, chambers', 'No'],
            ['501(c)(7)', 'Social and recreational clubs', 'No'],
            ['501(c)(19)', 'Veterans organizations', 'Sometimes'],
          ],
        },
        {
          title: '501(c)(3) Requirements',
          type: 'text',
          content: "**Exempt Purposes:**\n• Charitable\n• Religious\n• Educational\n• Scientific\n• Literary\n• Testing for public safety\n• Amateur athletic competition\n• Prevention of cruelty to children/animals\n\n**Organizational and Operational Tests:**\n• Articles must limit purposes to exempt activities\n• Must primarily engage in exempt activities\n• No private inurement to insiders",
        },
        {
          title: 'Private Foundation vs. Public Charity',
          type: 'text',
          content: "**Public Charity:**\n• Broadly supported by public\n• Meets public support tests\n• Fewer restrictions\n\n**Private Foundation:**\n• Funded by single source (family, company)\n• Subject to excise taxes on investment income\n• Must distribute 5% of assets annually\n• Restrictions on self-dealing\n• Default classification if tests not met",
        },
        {
          title: 'Form 990 Filing',
          type: 'table',
          headers: ['Gross Receipts', 'Total Assets', 'Form Required'],
          rows: [
            ['< $50,000', 'Any', 'Form 990-N (e-Postcard)'],
            ['$50,000 - $200,000', '< $500,000', 'Form 990-EZ'],
            ['> $200,000 OR', '> $500,000', 'Form 990 (full)'],
            ['Private foundation', 'Any', 'Form 990-PF'],
          ],
        },
        {
          title: 'Unrelated Business Income Tax (UBIT)',
          type: 'text',
          content: "**Taxable if all three:**\n\n1. Trade or business\n2. Regularly carried on\n3. Not substantially related to exempt purpose\n\n**Common UBIT triggers:**\n• Advertising revenue (publications)\n• Rental of debt-financed property\n• Services beyond exempt purpose\n\n**Exclusions:**\n• Dividends, interest, royalties\n• Volunteer labor\n• Convenience of members (colleges)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "501(c)(3): tax-exempt AND tax-deductible contributions",
            "Must meet organizational and operational tests",
            "No private inurement to insiders",
            "Form 990 required annually (with exceptions)",
            "UBIT: unrelated business income is taxable",
            "Private foundations have additional restrictions",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-050',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Fringe Benefits',
    description: 'Understand excludable and taxable fringe benefits',
    order: 50,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Excludable fringes', 'Working condition', 'De minimis'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Fringe benefits can be excluded from income if they meet specific requirements! Understanding the rules helps employers provide tax-efficient compensation.",
        },
        {
          title: 'Major Excludable Fringe Benefits',
          type: 'table',
          headers: ['Benefit', 'Exclusion', 'Key Limits'],
          rows: [
            ['Health insurance', 'Unlimited', 'Employer-paid premiums excluded'],
            ['Group term life', '$50,000 coverage', 'Excess taxable using Table I rates'],
            ['Dependent care', '$5,000/year', 'FSA or employer plan'],
            ['Educational assistance', '$5,250/year', 'Must be job-related or program'],
            ['Qualified transportation', '$315/month (2024)', 'Parking or transit'],
            ['Employee discounts', 'Gross profit %', 'On employer products/services'],
          ],
        },
        {
          title: 'Working Condition Fringe',
          type: 'text',
          content: "**Excluded if:**\nEmployee could have deducted cost as business expense if paid themselves.\n\n**Examples:**\n• Company car for business use\n• Professional subscriptions/dues\n• Business travel expenses\n• Job-related education\n\n**Must track/substantiate business use!**\nPersonal use is taxable.",
        },
        {
          title: 'De Minimis Fringe',
          type: 'text',
          content: "**So small, accounting is impractical:**\n\n**Examples (excluded):**\n• Occasional coffee, donuts, soft drinks\n• Holiday gifts (not cash)\n• Occasional personal use of copier\n• Employee parties/picnics\n• Flowers for illness/family death\n\n**NOT excluded:**\n• Cash or cash equivalents\n• Season tickets\n• Regularly provided meals\n• Gym memberships (generally)",
        },
        {
          title: 'No-Additional-Cost Service',
          type: 'text',
          content: "**Excluded if:**\n\n• Employer incurs no substantial additional cost\n• Service normally offered to customers\n• Employee works in line of business offering service\n\n**Examples:**\n• Free standby airline seats for airline employees\n• Free hotel rooms for hotel employees\n• Free phone service for telecom employees\n\n**Must not displace paying customers!**",
        },
        {
          title: 'Transportation Benefits',
          type: 'text',
          content: "**2024 Monthly Limits:**\n\n• Transit passes: $315\n• Qualified parking: $315\n• Bicycle commuting: NOT currently excludable (suspended)\n\n**Can combine transit and parking (total $630/month)**\n\n**Note:** Employer deduction for parking limited - may not be fully deductible.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Health insurance: fully excludable (employer-paid)",
            "Group term life: first $50K excluded",
            "Working condition fringe: would be deductible if employee paid",
            "De minimis: too small to account for",
            "Transportation: $315/month transit and parking",
            "Cash is almost never excludable!",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-051',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Business Use of Home',
    description: 'Understand the home office deduction for businesses',
    order: 51,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Regular and exclusive use', 'Principal place of business', 'Simplified method'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Home office deductions are available for self-employed but not employees (after TCJA)! Understanding the requirements helps clients maximize legitimate deductions.",
        },
        {
          title: 'Who Can Claim?',
          type: 'text',
          content: "**Post-TCJA Rules:**\n\n**Can claim:**\n• Self-employed individuals\n• Partners in partnerships\n• Independent contractors\n\n**Cannot claim (2018-2025):**\n• W-2 employees (even if work from home required)\n\n**Exception:** Employees may deduct if reimbursed under accountable plan.",
        },
        {
          title: 'Requirements',
          type: 'text',
          content: "**Two Tests (must meet BOTH):**\n\n**1. Regular and Exclusive Use:**\n• Used regularly (not occasionally)\n• Used exclusively for business\n• Exception: Storage of inventory/product samples\n• Exception: Day care facilities\n\n**2. Principal Place of Business OR:**\n• Place to meet clients/customers\n• Separate structure used for business",
        },
        {
          title: 'Principal Place of Business Test',
          type: 'text',
          content: "**Most important activities:**\nWhere are the most important activities done?\n\n**Time spent:**\nHow much time spent there vs. other locations?\n\n**Administrative/Management:**\nIf used for substantial administrative/management activities and no other fixed location, qualifies.\n\n**Example:** Plumber runs business from home office (paperwork, scheduling) even though work done at customer sites.",
        },
        {
          title: 'Calculation Methods',
          type: 'table',
          headers: ['Method', 'How It Works', 'Maximum'],
          rows: [
            ['Regular method', 'Actual expenses × business %', 'Limited to business income'],
            ['Simplified method', '$5 × square feet', '$1,500 (300 sq ft max)'],
          ],
        },
        {
          title: 'Deductible Expenses (Regular Method)',
          type: 'text',
          content: "**Direct expenses (100%):**\n• Painting office only\n• Repairs to office\n\n**Indirect expenses (prorated):**\n• Mortgage interest/rent\n• Utilities\n• Insurance\n• Repairs to whole house\n• Depreciation (portion)\n\n**Limitation:** Cannot create a loss (carryover unused).\n\n**Depreciation recapture** when home sold (Section 1250).",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Self-employed only (employees suspended 2018-2025)",
            "Regular AND exclusive use required",
            "Principal place of business test",
            "Simplified: $5/sq ft, max $1,500",
            "Cannot create loss from home office",
            "Depreciation claimed may be recaptured on sale",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-052',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Rental Real Estate',
    description: 'Understand rental income reporting and deductions',
    order: 52,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Schedule E', 'Depreciation', 'Passive activity rules'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Rental real estate is a common investment with unique tax rules! Understanding depreciation, the $25K exception, and repair regulations helps clients maximize benefits.",
        },
        {
          title: 'Reporting Rental Income',
          type: 'text',
          content: "**Schedule E (Form 1040):**\n\n**Income includes:**\n• Rent payments\n• Advance rent (taxed when received)\n• Security deposits forfeited\n• Lease cancellation payments\n• Property/services in lieu of rent\n\n**NOT income:**\n• Security deposits (if refundable)\n• Tenant improvements in lieu of rent (usually not)",
        },
        {
          title: 'Common Deductions',
          type: 'table',
          headers: ['Deduction', 'Notes'],
          rows: [
            ['Mortgage interest', '100% if rental only'],
            ['Property taxes', 'Real estate taxes'],
            ['Depreciation', '27.5 years residential'],
            ['Repairs', 'Deduct currently; improvements capitalize'],
            ['Insurance', 'Landlord policy'],
            ['Utilities (if paid)', 'Common in some situations'],
            ['Management fees', 'Property manager'],
          ],
        },
        {
          title: 'Depreciation',
          type: 'text',
          content: "**Residential Rental:**\n• 27.5 years straight-line\n• Mid-month convention\n\n**Commercial Rental:**\n• 39 years straight-line\n• Mid-month convention\n\n**Land is NOT depreciable!**\nMust allocate basis between land and building.\n\n**Cost segregation:** May accelerate depreciation by separately depreciating components (5, 7, 15 year property).",
        },
        {
          title: '$25,000 Allowance',
          type: 'text',
          content: "**Rental Real Estate Exception to PAL:**\n\nUp to $25,000 rental losses allowed against nonpassive income if:\n\n• Actively participate (10%+ ownership, management decisions)\n• AGI ≤ $100,000 (full allowance)\n• Phase-out: $100,000 - $150,000 AGI\n• Eliminated at $150,000 AGI\n\n**Active participation ≠ material participation**\nLower bar - just make management decisions.",
        },
        {
          title: 'Real Estate Professional',
          type: 'text',
          content: "**If Qualify:**\nRental activities treated as nonpassive (no PAL limitation).\n\n**Requirements:**\n• 750+ hours in real property trades/businesses\n• More than half of personal services in real property\n• Materially participate in each rental activity (or elect to group)\n\n**Common professions:** Developers, real estate agents, property managers.\n\n**Must pass BOTH tests each year!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Report on Schedule E (not Schedule C)",
            "Residential depreciation: 27.5 years straight-line",
            "$25,000 rental loss allowance (active participation)",
            "Phase-out: $100K-$150K AGI",
            "RE professional: no PAL limitation",
            "Repairs deductible; improvements capitalized",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-053',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Business Vehicle Expenses',
    description: 'Understand vehicle deduction methods and substantiation',
    order: 53,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Standard mileage', 'Actual expenses', 'Luxury auto limits'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Vehicle expenses are among the most common business deductions - and audit targets! Proper substantiation and choosing between methods can save thousands.",
        },
        {
          title: 'Two Methods',
          type: 'table',
          headers: ['Method', 'How It Works', 'When to Use'],
          rows: [
            ['Standard Mileage', '67¢/mile (2024) × business miles', 'Simple, lower-cost vehicle'],
            ['Actual Expenses', 'Track all costs × business %', 'Expensive vehicle, high expenses'],
          ],
        },
        {
          title: 'Standard Mileage Rate',
          type: 'text',
          content: "**2024 Rates:**\n• Business: 67 cents/mile\n• Medical/moving: 21 cents/mile\n• Charitable: 14 cents/mile\n\n**Restrictions:**\n• Must use in first year vehicle placed in service to use later\n• Cannot use for 5+ vehicles simultaneously\n• Cannot claim depreciation, Section 179, or bonus\n• Can add parking and tolls\n\n**Includes:** Gas, insurance, repairs, depreciation",
        },
        {
          title: 'Actual Expense Method',
          type: 'text',
          content: "**Deductible Expenses:**\n• Gas and oil\n• Insurance\n• Repairs and maintenance\n• Tires\n• Registration fees\n• Lease payments\n• Depreciation (owned vehicles)\n• Interest (self-employed only)\n\n**Multiply total by business use %:**\nBusiness miles ÷ Total miles = Business %\n\n**Must keep mileage log regardless of method!**",
        },
        {
          title: 'Luxury Auto Limits (2024)',
          type: 'table',
          headers: ['Year', 'Regular Limit', 'Bonus Eligible'],
          rows: [
            ['Year 1', '$12,200', '$20,200'],
            ['Year 2', '$19,500', '$19,500'],
            ['Year 3', '$11,700', '$11,700'],
            ['Year 4+', '$6,960', '$6,960'],
          ],
        },
        {
          title: 'Substantiation Requirements',
          type: 'text',
          content: "**Must Record (contemporaneously):**\n\n• Date of trip\n• Destination\n• Business purpose\n• Mileage\n\n**For each business use!**\n\n**Best practice:** App or logbook maintained daily/weekly.\n\n**Reconstruction:** IRS may accept reasonable reconstruction, but more difficult in audit.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Two methods: standard mileage (67¢) or actual expenses",
            "Must use standard mileage in first year for later option",
            "Luxury limits reduce depreciation on expensive vehicles",
            "Keep contemporaneous mileage log",
            "Record: date, destination, purpose, miles",
            "Audit hot spot - documentation is critical",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-054',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Business Travel and Meals',
    description: 'Understand deductibility rules for business travel and meals',
    order: 54,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Away from home', 'Meal deductions', 'Per diem'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Travel and meal expenses are common deductions with specific requirements! Understanding 'away from home,' meal limits, and substantiation rules is essential for business clients.",
        },
        {
          title: 'Travel Expenses',
          type: 'text',
          content: "**Deductible when 'away from home':**\n\n**Away from home means:**\n• Travel that requires sleep or rest to meet work demands\n• Away from tax home overnight\n\n**Tax home:**\n• Where you conduct business (not where you live)\n• If multiple locations, main place of business\n\n**Deductible:** Transport, lodging, meals (50%), tips, laundry",
        },
        {
          title: 'Meal Deductions',
          type: 'table',
          headers: ['Type of Meal', 'Deduction %', 'Notes'],
          rows: [
            ['Business meals', '50%', 'With business discussion'],
            ['Employee meals (convenience)', '50%', 'De minimis exception'],
            ['Entertainment', '0%', 'No deduction post-TCJA'],
            ['Client entertainment', '0%', 'Even if separate meal stated'],
          ],
        },
        {
          title: 'Business Meal Requirements',
          type: 'text',
          content: "**Deductible at 50% if:**\n\n• Not lavish or extravagant\n• Taxpayer (or employee) present\n• Business discussion during, before, or after\n• Expenses properly substantiated\n\n**Must document:**\n• Amount\n• Date and place\n• Business purpose\n• Business relationship\n\n**Entertainment:** Meals during entertainment may be deductible if separately stated.",
        },
        {
          title: 'Per Diem Method',
          type: 'text',
          content: "**Simplified Substantiation:**\n\nIRS allows per diem rates instead of tracking actual expenses.\n\n**Lodging + M&IE:** Federal rates by location\n**M&IE Only:** $59-$79 per day (2024, location varies)\n\n**High-Low Method:**\n• High cost localities: $319/day\n• All other: $225/day\n\n**Still must substantiate:** Time, place, business purpose.",
        },
        {
          title: '⚠️ Mixed Business/Personal Travel',
          type: 'warning',
          content: "**Domestic Travel:**\n• If primarily business, transport fully deductible\n• Allocate lodging/meals between business and personal days\n\n**Foreign Travel:**\n• Must allocate transport if > 7 days OR > 25% personal\n• Exception: No personal control over trip planning\n\n**Personal vacation days are not deductible!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Travel deductible if away from home overnight",
            "Meals: 50% deductible with business discussion",
            "Entertainment: 0% (no deduction post-TCJA)",
            "Per diem simplifies substantiation",
            "Must document: amount, date, place, purpose, relationship",
            "Mixed trips: allocate between business/personal",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-055',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Section 1244 Stock Loss',
    description: 'Understand ordinary loss treatment for small business stock',
    order: 55,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Section 1244', 'Ordinary loss', 'Qualification requirements'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Section 1244 allows ordinary loss treatment (instead of capital loss) for worthless small business stock. This can save significant taxes by offsetting ordinary income!",
        },
        {
          title: 'Benefit of Section 1244',
          type: 'text',
          content: "**Normal stock loss:** Capital loss\n• Limited to $3,000/year offset against ordinary income\n\n**Section 1244 stock loss:** Ordinary loss\n• Fully deductible against ordinary income\n• Up to $50,000 ($100,000 MFJ) per year\n• Excess treated as capital loss\n\n**Big difference in tax savings!**",
        },
        {
          title: 'Qualification Requirements',
          type: 'list',
          content: [
            "Stock of domestic corporation",
            "Issued for money or property (not services or stock)",
            "Corporation had $1 million or less paid-in capital at issuance",
            "Corporation derived 50%+ of gross receipts from active business",
            "Stock held by individual or partnership",
            "Original owner (not purchased in secondary market)",
          ],
        },
        {
          title: 'Annual Loss Limits',
          type: 'table',
          headers: ['Filing Status', 'Max Ordinary Loss', 'Excess Treatment'],
          rows: [
            ['Single', '$50,000', 'Capital loss'],
            ['MFJ', '$100,000', 'Capital loss'],
            ['MFS', '$50,000', 'Capital loss'],
          ],
        },
        {
          title: 'Planning Considerations',
          type: 'text',
          content: "**Maximize Section 1244 benefits:**\n\n• Keep capitalization under $1 million when issuing stock\n• Issue stock only for cash or property\n• Don't pay for stock with services\n• Maintain documentation of qualification\n• Original shareholders keep stock (not sell/gift)\n\n**No election required** - if requirements met, treatment is automatic.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Section 1244: ordinary loss on small business stock loss",
            "Max: $50,000 ($100,000 MFJ) ordinary loss per year",
            "Must be original shareholder",
            "Corporation must meet capitalization/income tests",
            "No election required - automatic if qualified",
            "Excess over limit is capital loss",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-056',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Qualified Small Business Stock',
    description: 'Understand the Section 1202 gain exclusion',
    order: 56,
    duration: 45,
    difficulty: 'advanced',
    topics: ['Section 1202', 'QSBS', 'Gain exclusion'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Section 1202 excludes up to 100% of gain on qualified small business stock held 5+ years! This can mean ZERO federal tax on millions in gains. Huge planning opportunity!",
        },
        {
          title: 'Exclusion Percentage',
          type: 'table',
          headers: ['Stock Acquired', 'Exclusion'],
          rows: [
            ['After September 27, 2010', '100%'],
            ['February 18, 2009 - September 27, 2010', '75%'],
            ['Before February 18, 2009', '50%'],
          ],
        },
        {
          title: 'Requirements for QSBS',
          type: 'list',
          content: [
            "Domestic C corporation (not S corp)",
            "Gross assets ≤ $50 million (at issuance and immediately after)",
            "Acquired at original issuance",
            "Held more than 5 years",
            "80%+ of assets used in active business",
            "Not in excluded business (services, banking, hotels, etc.)",
          ],
        },
        {
          title: 'Excluded Businesses',
          type: 'text',
          content: "**Cannot be QSBS if primarily engaged in:**\n\n• Health, law, engineering, accounting, consulting\n• Athletics, financial services, brokerage\n• Any business where reputation/skill of employees is principal asset\n• Banking, insurance, leasing, investing\n• Farming\n• Hotels, motels, restaurants\n• Extractive industries",
        },
        {
          title: 'Exclusion Limitations',
          type: 'text',
          content: "**Per Issuer, Per Year:**\n\nGreater of:\n• $10 million gain, OR\n• 10× adjusted basis of stock\n\n**Example:**\nBasis $1 million, gain $15 million.\nExclusion: Greater of $10M or $10M (10 × $1M) = $10M\nRemaining $5M taxed at capital gains rate.",
        },
        {
          title: 'Planning Tips',
          type: 'text',
          content: "**Maximize QSBS benefits:**\n\n• Start as C corp (or convert to C early)\n• Monitor $50M asset limit\n• Document business activities (avoid excluded)\n• Hold stock 5+ years before sale\n• Issue stock to multiple shareholders (each gets $10M exclusion)\n• Consider gifting to family members before sale\n\n**Estate planning:** Transferred stock retains QSBS character.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "100% gain exclusion for QSBS acquired after 9/27/2010",
            "Must hold 5+ years",
            "Corporation: ≤ $50M assets, active business",
            "Limit: Greater of $10M or 10× basis per issuer",
            "Excludes service businesses",
            "Massive tax savings opportunity!",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-057',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Hobby Loss Rules',
    description: 'Distinguish between business activities and hobbies',
    order: 57,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Profit motive', 'Section 183', 'Nine-factor test'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Hobby losses are NOT deductible! The IRS scrutinizes activities with consistent losses to determine if they're really businesses or hobbies. Know how to prove profit motive.",
        },
        {
          title: 'Business vs. Hobby',
          type: 'text',
          content: "**Business:**\n• Activity engaged in for profit\n• Losses deductible against other income\n\n**Hobby:**\n• Activity NOT engaged for profit\n• Losses NOT deductible\n• Income still taxable (but no offsetting deductions post-TCJA)\n\n**Key:** Must have genuine profit motive.",
        },
        {
          title: 'Safe Harbor: Presumption of Profit',
          type: 'text',
          content: "**Activity presumed for profit if:**\n\n**General Rule:**\nProfit in 3 of last 5 years (including current year)\n\n**Horse Racing/Breeding:**\nProfit in 2 of last 7 years\n\n**Effect:**\nIRS bears burden of proving NOT for profit.\n\n**Election (Section 183(e)):**\nDelay determination until after 5th year (or 7th for horses).",
        },
        {
          title: 'Nine-Factor Test',
          type: 'list',
          content: [
            "Manner in which activity conducted (businesslike?)",
            "Expertise of taxpayer or advisors",
            "Time and effort expended",
            "Expectation that assets may appreciate",
            "Success in similar activities",
            "History of income or losses",
            "Amount of occasional profits",
            "Financial status of taxpayer",
            "Elements of personal pleasure or recreation",
          ],
        },
        {
          title: 'Post-TCJA Treatment',
          type: 'text',
          content: "**If Characterized as Hobby:**\n\n**Income:** Still fully taxable as other income\n\n**Expenses:** NOT deductible!\n• Before TCJA: Limited deduction as misc. itemized deduction\n• After TCJA: No deduction at all (2018-2025)\n\n**Result:** Worst possible outcome - tax on income with no deductions.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Hobby losses not deductible (post-TCJA: no deductions at all)",
            "Safe harbor: profit in 3 of 5 years",
            "Nine factors determine profit motive",
            "No single factor is determinative",
            "Keep records to prove businesslike operation",
            "Hobby income is still taxable!",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-058',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Like-Kind Exchanges',
    description: 'Understand Section 1031 exchanges for real property',
    order: 58,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Section 1031', 'Qualified intermediary', 'Boot', 'Basis rules'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Section 1031 allows complete deferral of gain on real property exchanges! This powerful tool lets investors grow wealth tax-free. After TCJA, only real property qualifies.",
        },
        {
          title: 'Current Law (Post-TCJA)',
          type: 'text',
          content: "**Only REAL PROPERTY qualifies:**\n\n• Commercial buildings\n• Apartments/rental houses\n• Land\n• Office buildings\n• Industrial property\n\n**No longer qualifies:**\n• Personal property (equipment, vehicles)\n• Artwork, collectibles\n• Livestock\n• Inventory",
        },
        {
          title: 'Requirements',
          type: 'list',
          content: [
            "Both properties held for investment or business use",
            "Properties are like-kind (real property for real property)",
            "Must identify replacement within 45 days",
            "Must close within 180 days (or tax return due date if earlier)",
            "Qualified intermediary holds proceeds",
            "Cannot receive cash or other property before exchange",
          ],
        },
        {
          title: 'Timeline',
          type: 'text',
          content: "**Day 0:** Close on relinquished property (sale)\n\n**Day 45:** Deadline to identify replacement properties\n• Can identify up to 3 properties (any value), OR\n• Any number if total FMV ≤ 200% of relinquished\n\n**Day 180:** Deadline to close on replacement property\n• Or tax return due date, whichever is earlier\n• Get extension if needed!",
        },
        {
          title: 'Boot and Basis',
          type: 'text',
          content: "**Boot = Taxable:**\n• Cash received in exchange\n• Property other than real estate\n• Debt relief in excess of debt assumed\n\n**Gain recognized = Lesser of:**\n• Realized gain, or\n• Boot received\n\n**Basis in new property:**\nFMV of new property - deferred gain\n\n**Example:**\nExchange $500K property (basis $200K) for $500K property.\nDeferred gain: $300K\nNew basis: $500K - $300K = $200K (carryover)",
        },
        {
          title: 'Qualified Intermediary',
          type: 'text',
          content: "**Why needed:**\nCannot receive cash directly.\n\n**QI holds:**\n• Sale proceeds from relinquished property\n• Transfers to seller of replacement property\n\n**QI cannot be:**\n• Related party\n• Agent (attorney, CPA, broker in last 2 years)\n\n**Must use QI before closing on sale!**\nCannot fix afterward.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Only real property qualifies (post-TCJA)",
            "Must identify replacement within 45 days",
            "Must close within 180 days",
            "Boot (cash/debt relief) is taxable",
            "Basis in new property = FMV minus deferred gain",
            "Must use qualified intermediary",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-059',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Installment Sales',
    description: 'Understand tax-deferred payment arrangements',
    order: 59,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Section 453', 'Gross profit ratio', 'Related party sales'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Installment sales spread gain recognition over the payment period! This defers tax and can keep taxpayers in lower brackets. Know when this method applies.",
        },
        {
          title: 'What is an Installment Sale?',
          type: 'text',
          content: "**Definition:**\nSale where at least one payment received after year of sale.\n\n**Default Method:**\nApplies automatically unless elected out.\n\n**Effect:**\nProportionate gain recognized as payments received.",
        },
        {
          title: 'Ineligible Property',
          type: 'list',
          content: [
            "Inventory (cannot use installment method)",
            "Publicly traded stocks and securities",
            "Dealer dispositions (ordinary course of business)",
            "Depreciation recapture (all recognized in year 1)",
          ],
        },
        {
          title: 'Gross Profit Ratio Calculation',
          type: 'text',
          content: "**Gross Profit Ratio:**\nGross Profit ÷ Contract Price\n\n**Where:**\nGross Profit = Selling Price - Adjusted Basis\nContract Price = Selling Price - Existing Mortgage Assumed (if any)\n\n**Each Payment:**\nPayment × Gross Profit Ratio = Taxable Gain\n\n**Interest:** Reported separately as ordinary income.",
        },
        {
          title: 'Example',
          type: 'example',
          content: "**Facts:**\n• Selling price: $100,000\n• Adjusted basis: $40,000\n• Down payment: $20,000\n• Balance: $80,000 over 4 years\n\n**Calculation:**\n• Gross profit: $100,000 - $40,000 = $60,000\n• Contract price: $100,000\n• Gross profit ratio: 60%\n\n**Year 1 gain:**\n$20,000 × 60% = $12,000 taxable",
        },
        {
          title: 'Related Party Rules',
          type: 'text',
          content: "**If buyer is related party:**\n\nIf buyer resells within 2 years, seller accelerates remaining gain.\n\n**Related parties:**\n• Spouse, children, grandchildren, parents\n• Controlled corporations/partnerships\n• Trusts\n\n**Exceptions:**\n• Sale of marketable securities\n• Involuntary conversion\n• Sale after death of original seller",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "At least one payment after year of sale",
            "Gain recognized proportionately as payments received",
            "Gross profit ratio = Gross profit ÷ Contract price",
            "Depreciation recapture recognized in year 1",
            "Cannot use for inventory or publicly traded stock",
            "Related party resale within 2 years accelerates gain",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-060',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Self-Employment Tax',
    description: 'Understand SE tax calculation and payment',
    order: 60,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Schedule SE', 'SE tax rate', 'Deduction for employer portion'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Self-employed individuals pay BOTH employer and employee portions of Social Security and Medicare! Understanding SE tax helps clients budget and claim proper deductions.",
        },
        {
          title: 'SE Tax Rates',
          type: 'table',
          headers: ['Component', 'Rate', 'Wage Base (2024)'],
          rows: [
            ['Social Security', '12.4%', '$168,600'],
            ['Medicare', '2.9%', 'No limit'],
            ['Additional Medicare', '0.9%', 'Over $200K ($250K MFJ)'],
            ['Total SE Tax', '15.3%+', 'Varies'],
          ],
        },
        {
          title: 'SE Tax Calculation',
          type: 'text',
          content: "**Step 1:** Calculate net self-employment income\n\n**Step 2:** Multiply by 92.35% (equivalent to employer deduction)\n\n**Step 3:** Apply rates:\n• 12.4% on first $168,600\n• 2.9% on all SE income\n• 0.9% additional Medicare on income over threshold\n\n**Deduction:**\n50% of SE tax is deductible (Schedule 1, Line 15).",
        },
        {
          title: 'Example Calculation',
          type: 'example',
          content: "**Net SE Income:** $100,000\n\n**Step 1:** $100,000 × 92.35% = $92,350\n\n**Step 2:** SE Tax\n• Social Security: $92,350 × 12.4% = $11,451\n• Medicare: $92,350 × 2.9% = $2,678\n• Total: $14,129\n\n**Step 3:** Deduction\n• $14,129 × 50% = $7,065 (above-the-line deduction)",
        },
        {
          title: 'What Income is Subject to SE Tax?',
          type: 'text',
          content: "**Subject to SE Tax:**\n• Schedule C net profit\n• General partner's share of partnership income\n• Director fees (non-employee)\n• Self-employment consulting income\n\n**NOT Subject to SE Tax:**\n• Limited partner distributive share (generally)\n• S corporation distributions\n• Rental income (generally)\n• Dividends/interest\n• Capital gains",
        },
        {
          title: 'Additional Medicare Tax',
          type: 'text',
          content: "**0.9% Additional Tax:**\n\nApplies when SE income plus wages exceed:\n• Single/HOH: $200,000\n• MFJ: $250,000\n• MFS: $125,000\n\n**Not split between employer/employee** - all paid by taxpayer.\n\n**No above-the-line deduction** for additional Medicare tax.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SE tax = 15.3% (12.4% SS + 2.9% Medicare)",
            "Calculate on 92.35% of net SE income",
            "50% of SE tax is above-the-line deduction",
            "SS portion limited to wage base ($168,600 in 2024)",
            "Additional 0.9% Medicare over $200K/$250K",
            "S corp distributions avoid SE tax (with reasonable salary)",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-061',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Estimated Tax for Self-Employed',
    description: 'Understand estimated tax requirements for business owners',
    order: 61,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Quarterly payments', 'Safe harbors', 'Form 1040-ES'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Self-employed individuals must make quarterly estimated tax payments! No employer withholds for them. Understanding the rules prevents penalties.",
        },
        {
          title: 'Who Must Pay?',
          type: 'text',
          content: "**Required if expecting to owe $1,000+ when filing return:**\n\n• Self-employed individuals\n• Partners (for SE tax and income tax)\n• S corporation shareholders (for distributions)\n• Investors with significant income\n\n**No requirement if:**\n• Prior year tax = $0\n• U.S. citizen/resident entire year\n• Prior year was 12-month year",
        },
        {
          title: 'Due Dates',
          type: 'table',
          headers: ['Payment Period', 'Due Date'],
          rows: [
            ['Jan 1 - Mar 31', 'April 15'],
            ['Apr 1 - May 31', 'June 15'],
            ['Jun 1 - Aug 31', 'September 15'],
            ['Sep 1 - Dec 31', 'January 15'],
          ],
        },
        {
          title: 'Safe Harbor Rules',
          type: 'text',
          content: "**No penalty if pay either:**\n\n**Option 1:** 90% of current year tax\n\n**Option 2:** 100% of prior year tax\n• If prior year AGI > $150,000 ($75,000 MFS): 110%\n\n**Most use prior year safe harbor** - it's predictable!\n\n**Requirement:** Prior year was 12 months with tax liability.",
        },
        {
          title: 'Payment Options',
          type: 'text',
          content: "**How to Pay:**\n\n• IRS Direct Pay (free, bank account)\n• EFTPS (free, enrollment required)\n• Credit/debit card (fees apply)\n• Mail check with voucher (Form 1040-ES)\n\n**Increase Withholding:**\nIf spouse works, increase W-4 withholding to cover estimate.\n\n**Withholding treated as paid evenly through year!**",
        },
        {
          title: 'Annualized Income Method',
          type: 'text',
          content: "**For Seasonal/Variable Income:**\n\nIf income not evenly distributed, can annualize each quarter.\n\n**Form 2210, Schedule AI** required.\n\n**Benefit:** May reduce early quarter payments.\n\n**Example:** Retail business makes 60% of income in Q4.\nCan pay lower estimates in Q1-Q3, larger in Q4.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Required if expecting to owe $1,000+",
            "Due: April 15, June 15, September 15, January 15",
            "Safe harbor: 100% of prior year (110% if AGI > $150K)",
            "Form 1040-ES for mailed payments",
            "Can increase W-4 withholding instead",
            "Annualized method for seasonal income",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE2-062',
    courseId: 'ea',
    section: 'SEE2',
    title: 'Business Tax Compliance',
    description: 'Understand information returns and compliance requirements',
    order: 62,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Information returns', '1099 reporting', 'Backup withholding'],
    blueprintArea: 'SEE2-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Businesses must file information returns reporting payments to others! Miss a deadline or file incorrectly, and penalties add up fast. Know the requirements!",
        },
        {
          title: 'Common Information Returns',
          type: 'table',
          headers: ['Form', 'Reports', 'Threshold'],
          rows: [
            ['1099-NEC', 'Nonemployee compensation', '$600+'],
            ['1099-MISC', 'Rents, royalties, other', '$600+ (varies)'],
            ['1099-INT', 'Interest payments', '$10+'],
            ['1099-DIV', 'Dividends', '$10+'],
            ['1099-K', 'Payment card/third party network', '$600+ (new threshold)'],
            ['W-2', 'Wages to employees', 'Any amount'],
          ],
        },
        {
          title: '1099-NEC Requirements',
          type: 'text',
          content: "**File if paying:**\n• $600+ to non-employee for services\n• Attorneys (any amount for legal services)\n\n**Due Dates:**\n• To recipient: January 31\n• To IRS: January 31\n\n**Must file for:**\n• Independent contractors\n• Self-employed individuals\n• Partnerships (but not corporations generally)",
        },
        {
          title: 'TIN/W-9 Requirements',
          type: 'text',
          content: "**Request W-9 before payment:**\n\n• Get payee's name and TIN (SSN or EIN)\n• Certify not subject to backup withholding\n\n**If payee refuses or provides incorrect TIN:**\n• Backup withholding required: 24%\n• Deduct from payments, deposit with IRS\n• Report on Form 945",
        },
        {
          title: 'Penalties for Late/Incorrect Filings',
          type: 'table',
          headers: ['If Corrected Within', 'Penalty Per Return (2024)'],
          rows: [
            ['30 days', '$60'],
            ['By August 1', '$120'],
            ['After August 1', '$310'],
            ['Intentional disregard', '$630 minimum'],
          ],
        },
        {
          title: 'Electronic Filing',
          type: 'text',
          content: "**E-filing Required if:**\n• 10 or more information returns (aggregate)\n\n**Benefits:**\n• Faster processing\n• Fewer errors\n• Extended correction period\n\n**FIRE System:** IRS online filing for 1099s\n\n**Third-party services available:** Many payroll and accounting services file automatically.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "1099-NEC due January 31 to IRS and recipients",
            "Get W-9 before making payments",
            "Backup withhold 24% if no TIN provided",
            "Penalties: $60-$630 per late/incorrect return",
            "E-file required for 10+ returns",
            "Corporations generally exempt from 1099 (except attorneys)",
          ],
        },
      ],
    },
  },
];

// Export section lessons
export const getSEE2Lessons = () => eaPart2Lessons;
export const getSEE2LessonById = (id: string) => eaPart2Lessons.find(l => l.id === id);
export const getSEE2LessonCount = () => eaPart2Lessons.length;
