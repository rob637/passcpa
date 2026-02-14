/**
 * SEE Part 2: Businesses - Comprehensive Study Guide
 * 
 * This guide covers all 3 domains of the SEE Part 2 exam with:
 * - Domain overviews and weight information
 * - Key concepts and common exam traps
 * - Memory aids and mnemonics
 * - Practice strategies
 * 
 * Updated for Tax Year 2024-2025
 */

export const SEE2_STUDY_GUIDE = {
  section: 'SEE2',
  title: 'SEE Part 2: Businesses - Complete Study Guide',
  version: '2024-2025',
  examInfo: {
    totalQuestions: 100,
    scoredQuestions: 85,
    pretestQuestions: 15,
    timeAllowed: '3.5 hours (210 minutes)',
    passingScore: '105 (scaled score, approximately 70%)',
    examFormat: 'Computer-based, multiple choice',
  },
  
  domains: [
    {
      id: 'SEE2-1',
      name: 'Business Entities and Considerations',
      weight: '35.3%',
      estimatedQuestions: 30,
      overview: 'The largest domain covers entity types, formation, selection, and basis rules for all business forms.',
      
      keyTopics: [
        {
          topic: 'Sole Proprietorships',
          concepts: [
            'Schedule C (or C-EZ) reporting',
            'No separate legal entity from owner',
            'All income flows to Form 1040',
            'Self-employment tax on net profit',
            'Unlimited personal liability',
          ],
          examTips: [
            'Schedule C filer must attach Schedule SE',
            'Home office: simplified is $5/sq ft, max 300 sq ft ($1,500)',
          ],
        },
        {
          topic: 'Partnerships',
          concepts: [
            'Form 1065 (informational return only)',
            'Schedule K-1 for each partner',
            'Pass-through taxation',
            'Guaranteed payments (ordinary income, SE tax)',
            'Partnership agreement governs allocations',
            'Special allocations must have substantial economic effect',
          ],
          examTips: [
            'MNEMONIC: "GIST" for partnership income items - Guaranteed payments, Interest income, Separately stated items, Trade/business income',
            'Form 1065 due March 15 (calendar year)',
            'Partners cannot be employees of partnership',
          ],
        },
        {
          topic: 'C Corporations',
          concepts: [
            'Form 1120 filing',
            'Flat 21% tax rate under TCJA',
            'Double taxation: corporate + dividend to shareholders',
            'No pass-through of losses',
            'Accumulated earnings tax: 20% on excess accumulation',
            'Personal holding company rules',
          ],
          examTips: [
            'Form 1120 due April 15 (calendar year corporations)',
            'Dividends received deduction: 50%, 65%, or 100% depending on ownership',
            'Charitable contribution limit: 10% of taxable income',
          ],
        },
        {
          topic: 'S Corporations',
          concepts: [
            'Form 1120-S filing',
            'Pass-through taxation like partnership',
            'Limitations: 100 shareholders, one class of stock, eligible shareholders only',
            'Form 2553 election (2 months 15 days rule)',
            'Reasonable compensation requirement',
            'AAA (Accumulated Adjustments Account) tracking',
          ],
          examTips: [
            'MNEMONIC: "S corp FACTS" - Family counts as one, Allowed shareholders limited, Corporation/partnership can\'t own, Trust restrictions, Single class stock',
            'EXAM TRAP: Salaries too low? IRS recharacterizes distributions as wages',
            'Built-in gains tax for C-to-S conversions',
          ],
        },
        {
          topic: 'Limited Liability Companies',
          concepts: [
            'Default classification rules (check-the-box)',
            'Single-member LLC: disregarded entity (Schedule C or E)',
            'Multi-member LLC: default is partnership',
            'Can elect corporation treatment',
          ],
          examTips: [
            'LLC is a legal structure, not a tax classification',
            'Form 8832 for entity classification election',
          ],
        },
        {
          topic: 'Basis Calculations',
          concepts: [
            'Partner basis: Start with contribution, add income, subtract distributions and losses',
            'S corp shareholder basis: Similar but no debt basis (use loan basis separately)',
            'Stock basis vs. debt basis for S corps',
            'At-risk limitations',
            'Passive activity loss limitations',
          ],
          examTips: [
            'MNEMONIC for partnership basis: "ACID" - Add income, Contributions; Subtract Income tax items (losses), Distributions',
            'EXAM TRAP: S corp shareholders need debt basis FROM SHAREHOLDER, not from third parties',
            'Order matters: basis before at-risk before passive',
          ],
        },
      ],
      
      practiceStrategy: 'Master the differences between entity types. Focus on S corp vs. partnership differences, especially basis rules.',
    },
    
    {
      id: 'SEE2-2',
      name: 'Business Tax Preparation',
      weight: '43.5%',
      estimatedQuestions: 37,
      overview: 'The largest domain covering accounting methods, income, expenses, depreciation, employment taxes, and credits.',
      
      keyTopics: [
        {
          topic: 'Accounting Methods',
          concepts: [
            'Cash method: income when received, expense when paid',
            'Accrual method: income when earned, expense when incurred',
            'Hybrid methods',
            '$30 million gross receipts test for cash method',
            'Inventory: FIFO, LIFO, average cost',
          ],
          examTips: [
            'Under TCJA, small businesses (<$30M average receipts) can use cash method',
            'Tax shelters and certain corporations must use accrual',
            'Form 3115 for accounting method changes',
          ],
        },
        {
          topic: 'Business Income',
          concepts: [
            'Constructive receipt doctrine',
            'Claim of right doctrine',
            'Tax benefit rule',
            'Installment sale method (IRC §453)',
            'Like-kind exchanges (IRC §1031) - real property only',
          ],
          examTips: [
            'Installment method: Gross profit ratio × payment received',
            'EXAM TRAP: 1031 only applies to real property after TCJA',
            'Dealer property excluded from installment method',
          ],
        },
        {
          topic: 'Cost of Goods Sold',
          concepts: [
            'Beginning inventory + Purchases - Ending inventory = COGS',
            'Uniform capitalization (UNICAP) rules (IRC §263A)',
            'Direct materials, direct labor, and overhead',
            'Small business exception for retailers/wholesalers',
          ],
          examTips: [
            'UNICAP applicable to manufacturers and resellers with >$30M gross receipts',
            'Must include portion of indirect costs in inventory',
          ],
        },
        {
          topic: 'Business Expenses',
          concepts: [
            'Ordinary and necessary test',
            'Reasonable compensation',
            'Meals: 50% deductible (100% for 2021-2022 expired)',
            'Entertainment: NOT deductible post-TCJA',
            'Business gifts: $25 per person limit',
            'Start-up costs: $5,000 immediate + 180-month amortization',
            'Organizational costs: Same $5,000 + amortization',
          ],
          examTips: [
            'EXAM TRAP: Entertainment (tickets, golf) is 0% deductible',
            'Start-up immediate deduction phases out dollar-for-dollar above $50,000',
          ],
        },
        {
          topic: 'Depreciation and Amortization',
          concepts: [
            'MACRS recovery periods: 3, 5, 7, 15, 20, 27.5, 39 years',
            'Section 179: $1,220,000 limit (2024), phases out at $3,050,000',
            'Bonus depreciation: 60% for 2024, phasing out',
            'Listed property (>50% business use requirement)',
            'Luxury auto limits',
            'IRC §197 intangibles: 15-year amortization',
          ],
          examTips: [
            'MNEMONIC for MACRS lives: "3-5-7-15-27.5-39" - computers/autos(5), furniture(7), improvements(15/39), residential(27.5), commercial(39)',
            '§197: Goodwill, customer lists, covenants not to compete, franchises',
            'EXAM TRAP: Mid-quarter convention if >40% placed in service in Q4',
          ],
        },
        {
          topic: 'Employment Taxes',
          concepts: [
            'FICA: 6.2% OASDI (up to $168,600) + 1.45% Medicare',
            'Additional Medicare: 0.9% on wages >$200,000/$250,000',
            'FUTA: 6.0% on first $7,000 (credit reduces to 0.6%)',
            'Deposit schedules: Monthly vs. semi-weekly',
            'Forms 940 (FUTA), 941 (quarterly), 944 (annual)',
          ],
          examTips: [
            'Employer and employee each pay 7.65% (6.2% + 1.45%)',
            'FUTA: Only EMPLOYER pays, not employee',
            'Know the $100,000 next-day deposit rule',
          ],
        },
        {
          topic: 'Estimated Tax Payments',
          concepts: [
            'Corporations: 100% of current year or annualized method',
            'Large corporations (>$1M prior year tax): No prior-year safe harbor after Q1',
            'Due dates: 4/15, 6/15, 9/15, 12/15 (calendar year)',
          ],
          examTips: [
            'No 100% prior year option for large corps after first quarter',
          ],
        },
        {
          topic: 'Business Credits',
          concepts: [
            'General business credit (Form 3800)',
            'R&D credit (§41) - up to $250,000 against payroll tax for startups',
            'Work Opportunity Tax Credit (§51)',
            'Disabled access credit (§44)',
            'Small employer health insurance credit (§45R)',
          ],
          examTips: [
            'General business credit carryback 1 year, forward 20 years',
            'R&D credit can offset AMT for small businesses',
          ],
        },
      ],
      
      practiceStrategy: 'Master depreciation rules (§179, bonus, MACRS). Know the employment tax rates and deposit rules. Practice expense deductibility scenarios.',
    },
    
    {
      id: 'SEE2-3',
      name: 'Specialized Returns and Taxpayers',
      weight: '21.2%',
      estimatedQuestions: 18,
      overview: 'Covers farming, trusts and estates, tax-exempt organizations, retirement plans, and passive activities.',
      
      keyTopics: [
        {
          topic: 'Farm Income and Expenses',
          concepts: [
            'Schedule F for farm income',
            'Cash method allowed regardless of gross receipts',
            'Crop insurance proceeds: can defer one year',
            'Farm averaging (Schedule J): Spread income over 3 prior years',
            'Net operating loss: 2-year carryback for farming losses',
          ],
          examTips: [
            'Farm income qualifies for special NOL carryback under TCJA',
            'Farmers can use 2/3 income rule for estimated taxes',
          ],
        },
        {
          topic: 'Trusts and Estates',
          concepts: [
            'Form 1041 for income reporting',
            'Distributable Net Income (DNI) concept',
            'Simple vs. complex trusts',
            'Income distribution deduction',
            'Fiduciary duty and tax elections',
          ],
          examTips: [
            'Simple trusts: Must distribute all income currently, no charitable deductions, no corpus distributions',
            'DNI is the ceiling on beneficiary taxation and trust deduction',
          ],
        },
        {
          topic: 'Tax-Exempt Organizations',
          concepts: [
            'Form 990 series (990, 990-EZ, 990-N, 990-PF)',
            'Unrelated Business Taxable Income (UBTI)',
            'Private foundations vs. public charities',
            'Form 1023/1024 for exemption application',
          ],
          examTips: [
            'UBTI taxed at regular corporate rates',
            'Investment income generally not UBTI',
            'Private foundations face stricter rules',
          ],
        },
        {
          topic: 'Retirement Plans',
          concepts: [
            'SEP-IRA: 25% of compensation, max $69,000 (2024)',
            'SIMPLE IRA: $16,000 employee + 3% match or 2% non-elective',
            'Solo 401(k): $23,000 employee + 25% employer side',
            'Qualified plan requirements: all employees, non-discrimination',
          ],
          examTips: [
            'SEP is employer-only contribution; SIMPLE has employee deferrals',
            'Self-employed: calculate SE net income × 0.9235 × 20% for SEP',
          ],
        },
        {
          topic: 'Passive Activities',
          concepts: [
            'Definition: trade/business with no material participation',
            'Rental activities: generally passive regardless of participation',
            'Real estate professional exception',
            'Passive losses offset passive income only',
            '$25,000 rental loss allowance (phases out $100,000-$150,000 AGI)',
          ],
          examTips: [
            'MNEMONIC: "500 Hours" - easiest material participation test',
            'Real estate pro: 750+ hours AND majority of personal services in RE',
            'Grouped activities can be treated as single for material participation',
          ],
        },
      ],
      
      practiceStrategy: 'Focus on passive activity rules and retirement plan limits. These are heavily tested. Know the 7 material participation tests.',
    },
  ],
  
  examStrategies: {
    timeManagement: [
      'Budget 2 minutes per question on average',
      'Mark calculation-heavy questions for later review',
      'Don\'t get stuck on entity comparison questions',
    ],
    answerTechniques: [
      'For depreciation, identify property class first',
      'For entity questions, consider tax AND non-tax factors',
      'Watch for "current year" vs. "carryover" distinctions',
    ],
    commonMistakes: [
      'Confusing S corp and partnership basis rules',
      'Forgetting meals are 50% (not 100%) after 2022',
      'Not knowing entertainment is fully disallowed',
      'Missing the difference between §179 and bonus depreciation',
    ],
  },
  
  studySchedule: {
    week1: 'Sole proprietorships, partnerships (Entity basics)',
    week2: 'C corporations, S corporations (Entity comparison)',
    week3: 'Accounting methods, income recognition',
    week4: 'Expenses, COGS, start-up costs',
    week5: 'Depreciation: MACRS, §179, bonus',
    week6: 'Employment taxes, estimated payments, credits',
    week7: 'Retirement plans, passive activities',
    week8: 'Specialized returns, review, practice exams',
  },
};
