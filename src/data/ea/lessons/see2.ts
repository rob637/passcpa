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
