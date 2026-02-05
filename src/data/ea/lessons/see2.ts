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
    blueprintArea: 'SEE2-4',
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
    blueprintArea: 'SEE2-4',
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
    blueprintArea: 'SEE2-4',
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
    blueprintArea: 'SEE2-4',
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
    blueprintArea: 'SEE2-4',
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
    blueprintArea: 'SEE2-4',
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
    blueprintArea: 'SEE2-4',
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
    blueprintArea: 'SEE2-5',
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
    blueprintArea: 'SEE2-5',
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
];

// Export section lessons
export const getSEE2Lessons = () => eaPart2Lessons;
export const getSEE2LessonById = (id: string) => eaPart2Lessons.find(l => l.id === id);
export const getSEE2LessonCount = () => eaPart2Lessons.length;
