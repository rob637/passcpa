/**
 * CFP Domain 5: Tax Planning
 * Area TAX-2: Tax Planning Strategies
 * 
 * These lessons cover tax planning strategies including
 * business taxes, education credits, and tax credits.
 */

import type { Lesson } from '../../../types';

export const CFP_TAX2_LESSONS: Lesson[] = [
  {
    id: 'CFP-TAX-L005',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    title: 'Business Entity Taxation',
    description: 'Compare tax treatment of different business entities and evaluate entity selection for tax efficiency.',
    order: 5,
    duration: 55,
    difficulty: 'intermediate',
    topics: [
      'Compare tax treatment of different business entities',
      'Calculate self-employment tax',
      'Apply the qualified business income deduction',
      'Evaluate entity selection for tax efficiency'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Understanding how different business entities are taxed is essential for advising business owner clients.'
        },
        {
          title: 'Business Entity Overview',
          type: 'table',
          headers: ['Entity', 'Taxation Level', 'Self-Employment Tax', 'Liability Protection'],
          rows: [
            ['**Sole proprietorship**', 'Individual (Schedule C)', 'Yes', 'None'],
            ['**Partnership**', 'Pass-through (K-1)', 'Active partners: Yes', 'General: None; Limited: Yes'],
            ['**LLC**', 'Flexible (default pass-through)', 'Depends', 'Yes'],
            ['**S Corporation**', 'Pass-through (K-1)', 'On wages only', 'Yes'],
            ['**C Corporation**', 'Double (entity + dividend)', 'No (wages subject to FICA)', 'Yes']
          ]
        },
        {
          title: 'Sole Proprietorship Taxation',
          type: 'table',
          headers: ['Item', 'Treatment'],
          rows: [
            ['Business income', 'Schedule C → Form 1040'],
            ['Losses', 'Offset other income'],
            ['Self-employment tax', '15.3% on net earnings'],
            ['Health insurance', 'Above-the-line deduction']
          ]
        },
        {
          title: 'SE Tax Calculation',
          type: 'callout',
          content: 'SE Tax = Net SE Income × 92.35% × 15.3%. Half of SE tax is deductible above the line.'
        },
        {
          title: 'Partnership - Pass-Through Taxation',
          type: 'table',
          headers: ['Event', 'Tax Treatment'],
          rows: [
            ['Formation', 'Generally tax-free'],
            ['Operating income', 'Passes to partners (K-1)'],
            ['Guaranteed payments', 'Ordinary income to recipient'],
            ['Distributions', 'Generally tax-free (basis adjustment)'],
            ['Sale of interest', 'Capital gain on appreciation']
          ]
        },
        {
          title: 'Partner\'s Basis',
          type: 'table',
          headers: ['Increases', 'Decreases'],
          rows: [
            ['Contributions', 'Distributions'],
            ['Share of income', 'Share of losses'],
            ['Share of liabilities', 'Liability reductions']
          ]
        },
        {
          title: 'S Corporation Requirements',
          type: 'table',
          headers: ['Requirement', 'Limit'],
          rows: [
            ['Shareholders', '100 maximum'],
            ['Shareholder type', 'Individuals, estates, certain trusts'],
            ['Stock classes', 'One class only'],
            ['Citizenship', 'US residents/citizens only']
          ]
        },
        {
          title: 'S Corp Key Tax Benefit',
          type: 'table',
          headers: ['Item', 'Taxation'],
          rows: [
            ['Reasonable salary', 'Subject to FICA/payroll'],
            ['Pass-through income', 'NOT subject to SE tax']
          ]
        },
        {
          title: 'S Corp Example',
          type: 'example',
          content: 'S Corp earns $200,000. Owner takes $80,000 salary (subject to FICA 15.3%) and $120,000 distribution (no SE/FICA tax). Savings: $120,000 × 15.3% = $18,360 in SE tax avoided.'
        },
        {
          title: 'Reasonable Compensation Warning',
          type: 'warning',
          content: 'IRS scrutinizes low salaries. Compensation must be reasonable for services performed. Penalties apply if compensation appears artificially low.'
        },
        {
          title: 'C Corporation - Double Taxation',
          type: 'table',
          headers: ['Level', 'Tax'],
          rows: [
            ['Corporate income', '21% flat rate'],
            ['Shareholder dividend', '0-23.8% (qualified)']
          ]
        },
        {
          title: 'Double Tax Effect Example',
          type: 'example',
          content: 'Corporate profit: $100,000 | Corporate tax (21%): ($21,000) | After-tax to distribute: $79,000 | Dividend tax (20%): ($15,800) | Net to shareholder: $63,200 | Effective rate: 36.8%'
        },
        {
          title: 'When C Corp Makes Sense',
          type: 'table',
          headers: ['Situation', 'Why'],
          rows: [
            ['Retain earnings', '21% rate lower than individual rates'],
            ['Reinvest in business', 'Defer dividend tax'],
            ['Many shareholders', 'No S Corp restrictions'],
            ['Foreign ownership', 'S Corp not available']
          ]
        },
        {
          title: 'QBI Deduction Overview',
          type: 'text',
          content: 'Section 199A allows up to 20% deduction on qualified business income from pass-through entities. QBI Deduction = 20% × QBI.'
        },
        {
          title: 'QBI Limitations (High Income)',
          type: 'table',
          headers: ['Filing Status', 'Threshold', 'Phase-out Complete'],
          rows: [
            ['Single', '$191,950', '$241,950'],
            ['MFJ', '$383,900', '$483,900']
          ]
        },
        {
          title: 'QBI Above Threshold Limits',
          type: 'table',
          headers: ['Limit Type', 'Formula'],
          rows: [
            ['**W-2 wages limit**', 'Greater of: 50% of W-2 wages OR 25% of wages + 2.5% of qualified property'],
            ['**SSTB limit**', 'Specified service trades phase out entirely']
          ]
        },
        {
          title: 'Specified Service Trades or Businesses (SSTBs)',
          type: 'table',
          headers: ['SSTB (Limited)', 'Non-SSTB (Not Limited)'],
          rows: [
            ['Accounting', 'Engineering'],
            ['Law', 'Architecture'],
            ['Financial services', 'Manufacturing'],
            ['Consulting', 'Construction'],
            ['Health', 'Real estate'],
            ['Athletics', '']
          ]
        },
        {
          title: 'SSTB Warning',
          type: 'warning',
          content: 'SSTBs completely lose QBI deduction above phase-out threshold.'
        },
        {
          title: 'Entity Selection Factors - Tax',
          type: 'table',
          headers: ['Factor', 'Best Entity'],
          rows: [
            ['Minimize SE tax', 'S Corp'],
            ['Retain earnings at low rate', 'C Corp'],
            ['Maximum flexibility', 'LLC (choose taxation)'],
            ['QBI deduction', 'Pass-through'],
            ['Loss utilization', 'Pass-through']
          ]
        },
        {
          title: 'Entity Selection Factors - Non-Tax',
          type: 'table',
          headers: ['Factor', 'Consideration'],
          rows: [
            ['Liability protection', 'Corp or LLC'],
            ['Simplicity', 'Sole prop'],
            ['Raising capital', 'C Corp'],
            ['State taxes', 'Vary by entity']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Sole prop: Simple but full SE tax exposure (15.3%)',
            'S Corp: Save SE tax on distributions; must pay reasonable wages',
            'C Corp: 21% entity tax + dividend tax; good for retained earnings',
            'QBI deduction: 20% of pass-through income (limits at high income)',
            'SSTBs (law, accounting, health) lose QBI deduction above threshold'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-TAX-L006',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    title: 'Education Tax Benefits',
    description: 'Compare education tax credits and deductions and coordinate benefits to maximize tax savings.',
    order: 6,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      'Compare education tax credits and deductions',
      'Apply AOTC and LLC requirements',
      'Coordinate education benefits to maximize tax savings',
      'Evaluate 529 plan taxation and benefits'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Multiple tax benefits exist for education expenses. Understanding their requirements and coordination is key.'
        },
        {
          title: 'American Opportunity Tax Credit (AOTC)',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['**Maximum credit**', '$2,500/student'],
            ['**Calculation**', '100% of first $2,000 + 25% of next $2,000'],
            ['**Refundable**', '40% ($1,000 max)'],
            ['**Years available**', 'First 4 years of post-secondary'],
            ['**Enrollment**', 'At least half-time'],
            ['**Felony drug conviction**', 'Disqualifies']
          ]
        },
        {
          title: 'AOTC Income Phase-out (2024)',
          type: 'table',
          headers: ['Filing Status', 'Phase-out Range'],
          rows: [
            ['Single', '$80,000-$90,000'],
            ['MFJ', '$160,000-$180,000']
          ]
        },
        {
          title: 'Lifetime Learning Credit (LLC)',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['**Maximum credit**', '$2,000/return (not per student)'],
            ['**Calculation**', '20% of first $10,000 expenses'],
            ['**Refundable**', 'No'],
            ['**Years available**', 'Unlimited'],
            ['**Enrollment**', 'At least one course'],
            ['**Graduate school**', 'Eligible']
          ]
        },
        {
          title: 'LLC Income Phase-out (2024)',
          type: 'table',
          headers: ['Filing Status', 'Phase-out Range'],
          rows: [
            ['Single', '$80,000-$90,000'],
            ['MFJ', '$160,000-$180,000']
          ]
        },
        {
          title: 'AOTC vs. LLC Comparison',
          type: 'table',
          headers: ['Feature', 'AOTC', 'LLC'],
          rows: [
            ['Max credit', '$2,500/student', '$2,000/return'],
            ['Partially refundable', 'Yes (40%)', 'No'],
            ['Years of school', 'First 4', 'Unlimited'],
            ['Enrollment', 'Half-time+', 'Any amount'],
            ['Graduate school', 'No', 'Yes'],
            ['Per student', 'Yes', 'No (per return)']
          ]
        },
        {
          title: 'When to Use Each',
          type: 'table',
          headers: ['Situation', 'Best Choice'],
          rows: [
            ['Undergraduate, years 1-4', 'AOTC'],
            ['Graduate school', 'LLC'],
            ['Part-time student', 'LLC'],
            ['5th+ year undergrad', 'LLC'],
            ['Low tax liability', 'AOTC (refundable)']
          ]
        },
        {
          title: 'Qualified Education Expenses',
          type: 'table',
          headers: ['Expense', 'AOTC', 'LLC'],
          rows: [
            ['Tuition', 'Yes', 'Yes'],
            ['Fees', 'Yes', 'Yes'],
            ['Books/supplies', 'Yes', 'Yes (if required)'],
            ['Equipment', 'Yes', 'Yes (if required)'],
            ['Room and board', 'No', 'No']
          ]
        },
        {
          title: 'Expense Adjustments',
          type: 'callout',
          content: 'Must reduce expenses by: Tax-free scholarships, Tax-free 529/Coverdell distributions, Other tax-free educational assistance.'
        },
        {
          title: '529 Plan Tax Treatment',
          type: 'table',
          headers: ['Event', 'Federal Tax', 'State Tax'],
          rows: [
            ['Contribution', 'No deduction', 'Many states allow'],
            ['Growth', 'Tax-deferred', 'Tax-deferred'],
            ['Qualified distribution', 'Tax-free', 'Tax-free'],
            ['Non-qualified distribution', 'Earnings taxed + 10% penalty', 'Varies']
          ]
        },
        {
          title: '529 Qualified Expenses',
          type: 'table',
          headers: ['Expense', 'Qualified?'],
          rows: [
            ['Tuition (any level)', 'Yes'],
            ['K-12 tuition', 'Yes ($10,000/year max)'],
            ['Room and board', 'Yes (if at least half-time)'],
            ['Books and supplies', 'Yes'],
            ['Computer and internet', 'Yes'],
            ['Student loan repayment', 'Yes ($10,000 lifetime)']
          ]
        },
        {
          title: '529 Superfunding',
          type: 'callout',
          content: 'Can contribute 5 years of annual exclusion at once: $95,000 single / $190,000 married (2026). Must not give additional gifts to beneficiary for 5 years.'
        },
        {
          title: 'Coverdell ESA Features',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Annual contribution limit', '$2,000/beneficiary'],
            ['Tax treatment', 'Tax-free growth and distributions'],
            ['Expenses', 'K-12 and higher education'],
            ['Age limit', 'Must use by age 30'],
            ['Income phase-out', '$95K-$110K single / $190K-$220K MFJ']
          ]
        },
        {
          title: '529 vs. Coverdell',
          type: 'table',
          headers: ['Feature', '529', 'Coverdell'],
          rows: [
            ['Contribution limit', 'Unlimited (gift tax may apply)', '$2,000/year'],
            ['K-12', 'Yes ($10K tuition)', 'Yes (any expense)'],
            ['State deduction', 'Often', 'No'],
            ['Income limits', 'None', 'Yes']
          ]
        },
        {
          title: 'Coordination Rules - No Double-Dipping',
          type: 'warning',
          content: 'Same expenses cannot qualify for multiple benefits: Credit AND 529 distribution on same expense, Credit AND employer educational assistance on same expense.'
        },
        {
          title: 'Strategy: Allocate Expenses',
          type: 'table',
          headers: ['Source', 'Expense Allocation'],
          rows: [
            ['First $4,000', 'Pay out-of-pocket → claim AOTC'],
            ['Additional', '529 distribution → tax-free'],
            ['Graduate school', '529 or LLC']
          ]
        },
        {
          title: 'Coordination Example',
          type: 'example',
          content: 'Student has $15,000 expenses: $4,000 paid from savings → $2,500 AOTC credit | $11,000 from 529 → tax-free distribution. Total tax benefit: $2,500 credit + tax-free 529.'
        },
        {
          title: 'Student Loan Interest Deduction',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Maximum deduction', '$2,500'],
            ['Type', 'Above-the-line'],
            ['Income phase-out (2024)', '$75K-$90K single / $155K-$185K MFJ'],
            ['Loan requirements', 'Qualified education loans']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'AOTC: $2,500/student, 4 years undergrad, 40% refundable',
            'LLC: $2,000/return, unlimited years, grad school OK',
            '529: Tax-free growth, qualified distributions; K-12 ($10K) + higher ed',
            'Don\'t double-dip: Same expenses can\'t get credit + 529 + other benefits',
            'Strategy: Use taxable funds for credit, 529 for remaining expenses'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-TAX-L007',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    title: 'Tax Credits and Deductions',
    description: 'Distinguish refundable from non-refundable credits and maximize available deductions and credits.',
    order: 7,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Distinguish refundable from non-refundable credits',
      'Apply child-related tax credits and phase-outs',
      'Utilize retirement savings and other tax credits',
      'Maximize available deductions and credits'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Tax credits provide dollar-for-dollar tax reduction—more valuable than deductions of equal amount.'
        },
        {
          title: 'Refundable vs. Non-Refundable Credits',
          type: 'table',
          headers: ['Type', 'Can Exceed Tax Liability?'],
          rows: [
            ['**Refundable**', 'Yes—excess becomes refund'],
            ['**Non-refundable**', 'No—reduces tax to $0 only']
          ]
        },
        {
          title: 'Common Credits by Type',
          type: 'table',
          headers: ['Refundable', 'Non-Refundable'],
          rows: [
            ['Earned Income Credit', 'Child and dependent care credit'],
            ['Child Tax Credit (partially)', 'Lifetime Learning Credit'],
            ['AOTC (40%)', 'Foreign tax credit'],
            ['Premium Tax Credit', 'Adoption credit'],
            ['', 'Retirement savings credit']
          ]
        },
        {
          title: 'Child Tax Credit (CTC) - 2024 Rules',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Credit amount', '$2,000/qualifying child'],
            ['Refundable portion', 'Up to $1,700'],
            ['Child age limit', 'Under 17'],
            ['SSN requirement', 'Child must have SSN']
          ]
        },
        {
          title: 'CTC Income Phase-out',
          type: 'table',
          headers: ['Filing Status', 'Phase-out Begins'],
          rows: [
            ['MFJ', '$400,000'],
            ['Single/HOH', '$200,000']
          ]
        },
        {
          title: 'CTC Phase-out Rule',
          type: 'callout',
          content: 'Credit reduces by $50 per $1,000 over threshold. Other Dependents Credit: $500/qualifying relative or older dependent (non-refundable, same phase-out).'
        },
        {
          title: 'Child and Dependent Care Credit',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Maximum expenses', '$3,000 (1 child) / $6,000 (2+ children)'],
            ['Credit percentage', '20-35% based on income'],
            ['Refundable', 'No']
          ]
        },
        {
          title: 'Dependent Care Credit by AGI',
          type: 'table',
          headers: ['AGI', 'Credit Percentage'],
          rows: [
            ['$0-$15,000', '35%'],
            ['$15,001-$43,000', 'Phases down'],
            ['$43,001+', '20%']
          ]
        },
        {
          title: 'Maximum Dependent Care Credit',
          type: 'callout',
          content: '1 child: $3,000 × 35% = $1,050 (max). 2+ children: $6,000 × 35% = $2,100 (max). At 20% (most taxpayers): $600 / $1,200.'
        },
        {
          title: 'Earned Income Credit (EIC)',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Refundable', 'Fully'],
            ['Phase-in', 'Credit increases with earnings'],
            ['Maximum (2024, 3+ children)', '~$7,830'],
            ['Investment income limit', '$11,600']
          ]
        },
        {
          title: 'Maximum EIC by Children (2024)',
          type: 'table',
          headers: ['Children', 'Maximum Credit', 'Max Income (MFJ)'],
          rows: [
            ['0', '~$632', '~$17,600'],
            ['1', '~$4,213', '~$51,500'],
            ['2', '~$6,960', '~$57,400'],
            ['3+', '~$7,830', '~$61,600']
          ]
        },
        {
          title: 'EIC Key Requirements',
          type: 'list',
          items: [
            'Must have earned income',
            'Valid SSN for taxpayer, spouse, children',
            'Cannot be dependent of another',
            'Investment income limit applies'
          ]
        },
        {
          title: 'Saver\'s Credit',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Credit rate', '10%, 20%, or 50% of contributions'],
            ['Maximum contribution qualifying', '$2,000/person ($4,000 MFJ)'],
            ['Maximum credit', '$1,000/person ($2,000 MFJ)'],
            ['Refundable', 'No']
          ]
        },
        {
          title: 'Saver\'s Credit Rate by Income (2024 MFJ)',
          type: 'table',
          headers: ['AGI', 'Credit Rate'],
          rows: [
            ['$0-$46,000', '50%'],
            ['$46,001-$50,000', '20%'],
            ['$50,001-$76,500', '10%'],
            ['$76,501+', '0%']
          ]
        },
        {
          title: 'Eligible Contributions for Saver\'s Credit',
          type: 'list',
          items: [
            'Traditional/Roth IRA',
            '401(k), 403(b), 457',
            'SIMPLE, SEP',
            'ABLE accounts'
          ]
        },
        {
          title: 'Adoption Credit (2024)',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Maximum credit', '$16,810'],
            ['Expenses', 'Court costs, attorney fees, travel'],
            ['Special needs child', 'Full credit regardless of expenses'],
            ['Refundable', 'No'],
            ['Income phase-out', 'Begins: $252,150 / Complete: $292,150']
          ]
        },
        {
          title: 'Premium Tax Credit',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Purpose', 'Subsidize marketplace premiums'],
            ['Calculation', 'Benchmark - Expected contribution'],
            ['Refundable', 'Yes'],
            ['Reconciled', 'On tax return']
          ]
        },
        {
          title: 'Premium Tax Credit Eligibility',
          type: 'list',
          items: [
            'Income 100-400% FPL (expanded temporarily)',
            'Not eligible for employer coverage or Medicare',
            'Enrolled through Marketplace'
          ]
        },
        {
          title: 'Foreign Tax Credit',
          type: 'table',
          headers: ['Feature', 'Detail'],
          rows: [
            ['Purpose', 'Avoid double taxation'],
            ['Limit', 'US tax on foreign source income'],
            ['Carryback/forward', '1 year back, 10 years forward'],
            ['Form', '1116 (or simplified method)']
          ]
        },
        {
          title: 'Credit Planning Strategies',
          type: 'list',
          items: [
            'Time income: Stay below phase-out thresholds',
            'Maximize contributions: Saver\'s credit',
            'Claim all dependents: CTC, ODC',
            'Track all expenses: Dependent care, adoption',
            'Coordinate benefits: Don\'t double-dip'
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Credits > Deductions: Dollar-for-dollar vs. marginal rate',
            'Refundable credits create refund if exceeding tax (EIC, partial CTC, AOTC)',
            'Child Tax Credit: $2,000/child under 17; $1,700 refundable; high phase-out',
            'Saver\'s Credit: 10-50% of up to $2,000 contributions if income qualifies',
            'EIC: Largest refundable credit for low-income workers with children'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-TAX-L008',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    title: 'Tax Planning Strategies and Timing',
    description: 'Apply income shifting and timing strategies and develop year-end tax planning approaches.',
    order: 8,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Apply income shifting and timing strategies',
      'Evaluate bunching strategies for deductions',
      'Integrate tax planning with financial planning',
      'Develop year-end tax planning approaches'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Effective tax planning involves timing income and deductions to minimize lifetime taxes.'
        },
        {
          title: 'Core Tax Planning Strategies',
          type: 'table',
          headers: ['Strategy', 'Description'],
          rows: [
            ['**Deferral**', 'Postpone income to later years'],
            ['**Acceleration**', 'Recognize income in current year'],
            ['**Shifting**', 'Move income to lower-bracket taxpayer'],
            ['**Conversion**', 'Change income character (ordinary → capital)']
          ]
        },
        {
          title: 'Income Deferral Strategies',
          type: 'table',
          headers: ['Strategy', 'How It Works'],
          rows: [
            ['Maximize 401(k)/IRA', 'Reduce current AGI'],
            ['Defer bonuses', 'Receive in January vs. December'],
            ['Installment sales', 'Spread gain over multiple years'],
            ['Defer Roth conversions', 'Wait for low-income year'],
            ['Like-kind exchanges', 'Defer gain on real estate']
          ]
        },
        {
          title: 'When to Accelerate Income',
          type: 'table',
          headers: ['Situation', 'Why Accelerate'],
          rows: [
            ['Currently low tax bracket', 'Lock in lower rates'],
            ['Expecting higher rates', 'Pay now at lower rate'],
            ['Expiring NOL', 'Use losses before they expire'],
            ['Roth conversions', 'During low-income retirement years']
          ]
        },
        {
          title: 'Bunching Strategy',
          type: 'callout',
          content: 'Alternate years to exceed standard deduction threshold. Concentrate deductible expenses in alternating years to maximize tax benefit.'
        },
        {
          title: 'Bunching Example',
          type: 'example',
          content: 'Year 1: Natural itemized $11,000, prepay $8,000 = $19,000 itemized. Year 2: Natural itemized $11,000 reduced by $8,000 = Standard ($15,350). Without bunching: Standard both years = $30,700. With bunching: $19,000 + $15,350 = $34,350. Extra deduction: $4,400.'
        },
        {
          title: 'What Can Be Bunched',
          type: 'table',
          headers: ['Deductible', 'Timing Flexibility'],
          rows: [
            ['Charitable contributions', 'Prepay or DAF'],
            ['Property taxes', 'December vs. January'],
            ['Medical expenses', 'Procedure timing'],
            ['State estimated payments', 'Q4 in December']
          ]
        },
        {
          title: 'Donor Advised Fund (DAF) Strategy',
          type: 'text',
          content: 'How it works: 1) Contribute lump sum to DAF in high-income year. 2) Get full deduction in contribution year. 3) Distribute to charities over time. 4) Growth is tax-free.'
        },
        {
          title: 'DAF Example',
          type: 'example',
          content: 'Goal: Give $10,000/year to charity. Traditional: $10,000 deduction annually (may not exceed standard). DAF: Contribute $50,000 in Year 1, distribute $10,000/year. Year 1: $50,000 deduction (exceeds standard by $35,400). Years 2-5: Standard deduction.'
        },
        {
          title: 'DAF Benefits',
          type: 'list',
          items: [
            'Large deduction in high-income year',
            'Continued charitable giving',
            'Investment growth tax-free'
          ]
        },
        {
          title: 'Income Shifting Between Family Members',
          type: 'table',
          headers: ['Method', 'Consideration'],
          rows: [
            ['Employ family members', 'Must be reasonable compensation'],
            ['Gift income-producing assets', 'Kiddie tax rules apply'],
            ['Family limited partnerships', 'Valuation discounts'],
            ['Trusts', 'Complex rules, irrevocable']
          ]
        },
        {
          title: 'Kiddie Tax',
          type: 'warning',
          content: 'Unearned income of children taxed at parent\'s rate. Applies to children under 19 (or under 24 if student). 2024: First $1,300 tax-free, next $1,300 at child\'s rate. Excess at parent\'s rate.'
        },
        {
          title: 'Character Conversion Strategies',
          type: 'table',
          headers: ['Strategy', 'Effect'],
          rows: [
            ['**Hold investments >1 year**', 'LTCG vs. ordinary'],
            ['**Qualified dividends**', '60+ day holding for preferential rate'],
            ['**Section 1202 stock**', 'Up to 100% exclusion on QSBS'],
            ['**Installment sale**', 'Spread ordinary into capital'],
            ['**Charitable remainder trusts**', 'Convert appreciated assets']
          ]
        },
        {
          title: 'Year-End Tax Planning Checklist - Before December 31',
          type: 'table',
          headers: ['Action', 'Purpose'],
          rows: [
            ['Maximize retirement contributions', 'Reduce AGI'],
            ['Tax-loss harvesting', 'Offset gains'],
            ['Bunch deductions (if beneficial)', 'Exceed standard'],
            ['Make charitable gifts', 'Deduction + appreciated asset strategy'],
            ['Required distributions', 'RMDs if required'],
            ['HSA contributions', 'Above-the-line deduction'],
            ['Review estimated taxes', 'Avoid penalty'],
            ['Roth conversions', 'If in low bracket']
          ]
        },
        {
          title: 'Year-End Checklist for Business Owners',
          type: 'table',
          headers: ['Action', 'Purpose'],
          rows: [
            ['Bonus depreciation', 'Accelerate equipment deductions'],
            ['Defer income', 'If expecting lower future rate'],
            ['Accelerate expenses', 'Prepay deductible items'],
            ['Review entity structure', 'S Corp salary, QBI optimization']
          ]
        },
        {
          title: 'Multi-Year Tax Planning',
          type: 'table',
          headers: ['Short-Term View', 'Long-Term View'],
          rows: [
            ['Minimize this year\'s tax', 'Minimize lifetime taxes'],
            ['Defer everything', 'Strategic recognition'],
            ['Ignore future rates', 'Consider rate changes']
          ]
        },
        {
          title: 'Roth Conversion Example',
          type: 'example',
          content: 'Early retirement (low income): Convert $50K/year, fill 12% bracket. Later (with RMDs + SS): No conversion, would be 24% bracket. Net effect: Pay 12% now, avoid 24%+ later.'
        },
        {
          title: 'Integration with Financial Planning',
          type: 'table',
          headers: ['Financial Goal', 'Tax Consideration'],
          rows: [
            ['Retirement', 'Traditional vs. Roth, RMDs'],
            ['Education', '529 vs. AOTC coordination'],
            ['Estate', 'Stepped-up basis, lifetime giving'],
            ['Insurance', 'Premium tax credit, LTCI'],
            ['Investments', 'Location, loss harvesting']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Defer income when expecting lower future rates; accelerate when opposite',
            'Bunch deductions in alternating years to exceed standard threshold',
            'DAF enables large deduction now with charitable giving over time',
            'Character conversion: Hold >1 year for LTCG; qualified dividends require 60 days',
            'Year-end checklist: Retirement contributions, tax-loss harvest, RMDs, Roth conversions'
          ]
        }
      ]
    }
  }
];

export default CFP_TAX2_LESSONS;
