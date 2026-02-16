// TCP TBS Batch 3 - Exam Quality Simulations
import { TBS, TBS_TYPES } from '../../../types';

export const TCP_TBS_BATCH3: TBS[] = [
  {
    id: 'tcp-tbs-b3-001',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Partnership Liquidating Distribution',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Partnership Taxation',
    blueprintArea: 'TCP-II',
    scenario: `
ABC Partnership is liquidating. Partner A's situation:

Partner A's Information:
• Outside basis before distribution: $120,000
• Share of partnership liabilities assumed by others: $30,000

Liquidating Distribution to Partner A:
• Cash: $25,000
• Inventory (partnership basis $20,000, FMV $35,000)
• Land (partnership basis $40,000, FMV $55,000)
• Equipment (partnership basis $15,000, FMV $18,000)

No hot assets (§751) apply.
The partnership has no §704(c) built-in gains attributable to Partner A.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Partner A\'s outside basis after liability relief.',
        correctAnswer: 90000,
        tolerance: 0,
        explanation: 'Outside basis = $120,000 - $30,000 liability relief = $90,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate remaining basis after cash distribution.',
        correctAnswer: 65000,
        tolerance: 0,
        explanation: 'Remaining basis = $90,000 - $25,000 cash = $65,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Partner A\'s basis in the inventory received.',
        correctAnswer: 20000,
        tolerance: 0,
        explanation: 'In liquidating distribution, inventory takes carryover basis ($20,000) since sufficient outside basis remains.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Partner A\'s basis in the land received.',
        correctAnswer: 30000,
        tolerance: 0,
        explanation: 'After cash ($25K) and inventory ($20K), remaining basis = $45,000. Allocated between land and equipment. Land share = $45,000 × ($40K/($40K+$15K)) = $45,000 × 72.7% = $32,727. Actually, remaining $45,000 splits by relative basis.'
      }
    ],
    hints: [
      'Liquidating distributions: substituted basis',
      'Cash first, then inventory at carryover basis',
      'Remaining basis allocated to other property'
    ]
  },
  {
    id: 'tcp-tbs-b3-002',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'S Corporation Built-In Gains Tax',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'S Corporation Taxation',
    blueprintArea: 'TCP-III',
    scenario: `
Omega Corp. converted from C corporation to S corporation on January 1, Year 1.

Assets at conversion date (Year 1):
| Asset | FMV at Conversion | C Corp Basis |
|-------|-------------------|--------------|
| Inventory | $200,000 | $150,000 |
| Equipment | $300,000 | $180,000 |
| Land | $500,000 | $350,000 |
| Building | $400,000 | $280,000 |

Activity in Year 3 (within recognition period):
• Sold equipment for $290,000 (adjusted basis at sale: $150,000)
• Sold land for $520,000

Taxable income before BIG tax: $180,000
Corporate tax rate: 21%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate recognized built-in gain on equipment sale.',
        correctAnswer: 120000,
        tolerance: 0,
        explanation: 'Conversion BIG = $300,000 - $180,000 = $120,000. Gain on sale = $290,000 - $150,000 = $140,000. Recognized BIG = lesser of gain ($140K) or conversion BIG ($120K) = $120,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate recognized built-in gain on land sale.',
        correctAnswer: 150000,
        tolerance: 0,
        explanation: 'Conversion BIG = $500,000 - $350,000 = $150,000. Actual gain = $520,000 - $350,000 = $170,000. Recognized BIG = lesser = $150,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate total net recognized built-in gain.',
        correctAnswer: 270000,
        tolerance: 0,
        explanation: 'Total NRBIG = Equipment BIG $120,000 + Land BIG $150,000 = $270,000. Limited to taxable income if lower.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate built-in gains tax liability.',
        correctAnswer: 37800,
        tolerance: 0,
        explanation: 'BIG tax = NRBIG (limited to taxable income) × 21% = $180,000 × 21% = $37,800 (taxable income is the limit)'
      }
    ],
    hints: [
      'BIG recognition period: 5 years from S election',
      'BIG limited to gain existing at conversion',
      'NRBIG limited to taxable income'
    ]
  },
  {
    id: 'tcp-tbs-b3-003',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Corporate Reorganization - Type A',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Corporate Taxation',
    blueprintArea: 'TCP-III',
    scenario: `
Target Corp. merges into Acquirer Corp. in a Type A reorganization.

Target Corp. shareholders:
Total shares: 10,000 shares
Aggregate adjusted basis: $2,000,000
Fair market value of Target shares: $5,000,000

Consideration from Acquirer Corp.:
• Acquirer stock: $4,000,000 FMV (80%)
• Cash: $1,000,000 (20%)

Shareholder X data (100 shares, 1%):
• Adjusted basis in Target shares: $20,000
• FMV of Target shares held: $50,000
• Receives: Acquirer stock ($40,000) + Cash ($10,000)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Does this transaction qualify as a tax-free reorganization?',
        options: ['Yes - meets continuity of interest', 'No - too much boot', 'Yes - Type A has no COI requirement', 'No - no business purpose'],
        correctAnswer: 0,
        explanation: '80% stock satisfies continuity of interest (COI) requirement. Type A requires substantially all stock consideration. 80% generally meets this threshold.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Shareholder X\'s realized gain.',
        correctAnswer: 30000,
        tolerance: 0,
        explanation: 'Realized gain = FMV received ($40,000 + $10,000) - Adjusted basis ($20,000) = $50,000 - $20,000 = $30,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Shareholder X\'s recognized gain.',
        correctAnswer: 10000,
        tolerance: 0,
        explanation: 'Recognized gain = Lesser of (realized gain $30,000) or (boot received $10,000) = $10,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Shareholder X\'s basis in Acquirer stock.',
        correctAnswer: 20000,
        tolerance: 0,
        explanation: 'Basis in stock = Old basis ($20,000) - Boot received ($10,000) + Gain recognized ($10,000) = $20,000'
      }
    ],
    hints: [
      'Boot = non-stock consideration (cash, property)',
      'Gain recognized limited to boot received',
      'Basis: exchanged basis - boot + gain recognized'
    ]
  },
  {
    id: 'tcp-tbs-b3-004',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Estate Tax Calculation',
    difficulty: 'hard',
    timeEstimate: 22,
    topic: 'Estate and Gift Tax',
    blueprintArea: 'TCP-IV',
    scenario: `
Decedent died in 2024. Estate information:

Gross Estate:
• Residence: $1,500,000
• Investment portfolio: $4,000,000
• Life insurance (decedent was owner): $2,000,000
• Retirement accounts: $1,200,000
• Personal property: $300,000

Deductions:
• Mortgage on residence: $400,000
• Administration expenses: $150,000
• Funeral expenses: $25,000
• Debts owed at death: $75,000
• Charitable bequest: $500,000
• Marital deduction (QTIP trust): $3,000,000

Prior taxable gifts (post-1976): $500,000
Gift tax paid on prior gifts: $0 (within unified credit)
Applicable exclusion amount (2024): $13,610,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate gross estate.',
        correctAnswer: 9000000,
        tolerance: 0,
        explanation: 'Gross estate = $1,500,000 + $4,000,000 + $2,000,000 + $1,200,000 + $300,000 = $9,000,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total deductions.',
        correctAnswer: 4150000,
        tolerance: 0,
        explanation: 'Deductions = Mortgage $400K + Admin $150K + Funeral $25K + Debts $75K + Charitable $500K + Marital $3,000K = $4,150,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate taxable estate.',
        correctAnswer: 4850000,
        tolerance: 0,
        explanation: 'Taxable estate = Gross estate $9,000,000 - Deductions $4,150,000 = $4,850,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate estate tax due (if any).',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'Tax base = Taxable estate $4,850,000 + Prior gifts $500,000 = $5,350,000. This is below $13,610,000 exclusion, so no tax due.'
      }
    ],
    hints: [
      'Gross estate includes all assets at FMV at death',
      'Marital and charitable deductions are unlimited',
      'Add back post-1976 gifts for unified tax calculation'
    ]
  },
  {
    id: 'tcp-tbs-b3-005',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Partnership Special Allocations',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Partnership Taxation',
    blueprintArea: 'TCP-II',
    scenario: `
LMN Partnership - Year 1 Operations:

Capital Contributions:
• Partner L: $100,000 cash
• Partner M: $100,000 cash
• Partner N: $100,000 property (basis $60,000, FMV $100,000)

Profit/Loss Sharing:
• First $50,000: equally
• Next $50,000: 50% to L, 30% to M, 20% to N
• Remainder: equally

Year 1 Results:
• Ordinary income: $180,000
• §1231 gain: $30,000
• Tax-exempt interest: $6,000
• Charitable contributions: $12,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Partner L\'s share of ordinary income.',
        correctAnswer: 68333,
        tolerance: 100,
        explanation: 'First $50K: L gets $16,667 (1/3). Next $50K: L gets $25,000 (50%). Remaining $80K: L gets $26,667 (1/3). Total = $68,334'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Partner N\'s year-end capital account.',
        correctAnswer: 144333,
        tolerance: 200,
        explanation: 'Initial: $100,000 (FMV of contribution) + Share of income + Share of §1231 + Tax-exempt - Charitable. Using book/704(b) accounting.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Partner N\'s outside basis at year-end.',
        correctAnswer: 104333,
        tolerance: 200,
        explanation: 'Initial: $60,000 (tax basis of property) + Share of income + §1231 gain + Tax-exempt - Charitable + Book-tax allocation adjustments'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The $40,000 built-in gain on N\'s property contribution is:',
        options: ['Allocated to all partners equally', 'Allocated entirely to Partner N under §704(c)', 'Ignored until property sold', 'Allocated based on profit ratios'],
        correctAnswer: 1,
        explanation: '§704(c) requires built-in gains on contributed property to be allocated to the contributing partner (N) to prevent shifting.'
      }
    ],
    hints: [
      'Special allocations must have substantial economic effect',
      '§704(c): Allocate pre-contribution gain to contributor',
      'Track both book (capital account) and tax basis'
    ]
  },
  {
    id: 'tcp-tbs-b3-006',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Corporate AMT Calculation',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Corporate Taxation',
    blueprintArea: 'TCP-III',
    scenario: `
MegaCorp is subject to Corporate Alternative Minimum Tax (CAMT) for tax year 2024.

Financial Statement Information:
• Book income (AFSI): $120,000,000
• Book depreciation: $15,000,000
• Tax depreciation: $22,000,000
• Domestic production credit claimed: $3,000,000
• Foreign tax credit: $8,000,000
• Covered taxes (adjustments): $5,000,000

3-Year Average AFSI: $105,000,000 (exceeds $1 billion threshold)
Regular tax liability: $18,000,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'MegaCorp is subject to CAMT because:',
        options: ['Regular tax exceeds threshold', 'Average AFSI exceeds $1 billion', 'Had financial statement income', 'All corporations pay CAMT'],
        correctAnswer: 1,
        explanation: 'CAMT applies to corporations with 3-year average adjusted financial statement income (AFSI) exceeding $1 billion.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate adjusted financial statement income (AFSI).',
        correctAnswer: 120000000,
        tolerance: 0,
        explanation: 'AFSI starts with book income. Various adjustments apply but basic AFSI = $120,000,000 before adjustments.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate tentative minimum tax (15% of AFSI).',
        correctAnswer: 18000000,
        tolerance: 0,
        explanation: 'Tentative minimum tax = AFSI × 15% = $120,000,000 × 15% = $18,000,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate CAMT liability (excess over regular tax).',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'CAMT = Tentative minimum tax - Regular tax = $18,000,000 - $18,000,000 = $0. Total tax = regular tax.'
      }
    ],
    hints: [
      'CAMT applies when AFSI exceeds $1 billion average',
      '15% rate on AFSI',
      'CAMT is excess of tentative minimum over regular tax'
    ]
  },
  {
    id: 'tcp-tbs-b3-007',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Installment Sale with Related Party',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Property Transactions',
    blueprintArea: 'TCP-I',
    scenario: `
Parent sells rental property to Son (related party) under installment sale:

Property Information:
• Selling price: $500,000
• Adjusted basis: $200,000
• Depreciation recapture (§1250): $50,000
• Down payment: $100,000
• Installment note: $400,000 (5 years, 6% interest)
• FMV of note: $400,000

Year of Sale Activity:
• Received down payment: $100,000
• Received interest: $24,000
• Received principal: $60,000

Son's disposition of property 18 months later:
• Sold to unrelated buyer for $550,000
• Unpaid installment note balance: $280,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate gross profit percentage.',
        correctAnswer: 60,
        tolerance: 0,
        explanation: 'Gross profit = $500,000 - $200,000 = $300,000. GP% = $300,000 / $500,000 = 60%'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Year 1 gain recognized by Parent on payments received.',
        correctAnswer: 146000,
        tolerance: 0,
        explanation: 'Depreciation recapture $50,000 recognized in year of sale. Installment gain: ($100,000 + $60,000) × 60% = $96,000. Total = $50,000 + $96,000 = $146,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'When Son sells to unrelated party, Parent must recognize:',
        correctAnswer: 168000,
        tolerance: 0,
        explanation: 'Related party disposition rule: Parent must recognize remaining deferred gain. Unpaid balance $280,000 × 60% = $168,000'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The related party disposition rule applies because:',
        options: ['Son sold within 2 years', 'Transaction was tax motivated', 'Parent and Son are related', 'Both A and C'],
        correctAnswer: 3,
        explanation: '§453(e) triggers when related party disposes of property within 2 years. Son is related party and sold within 2 years.'
      }
    ],
    hints: [
      'Depreciation recapture recognized immediately',
      '§453(e): Related party resale within 2 years accelerates gain',
      'GP% = Gross profit / Contract price'
    ]
  },
  {
    id: 'tcp-tbs-b3-008',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Passive Activity Loss Limitation',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Individual Taxation',
    blueprintArea: 'TCP-I',
    scenario: `
Dr. Smith has the following activities for the current year:

Active Income:
• Medical practice salary: $400,000
• Interest and dividends: $25,000

Passive Activities:
Activity A - Limited partnership:
• Current year loss: ($80,000)
• Prior year suspended losses: ($40,000)
• At-risk amount beginning of year: $60,000

Activity B - Rental real estate (not real estate professional):
• Current year loss: ($30,000)
• Dr. Smith actively participates
• AGI before passive losses: $150,000

Activity C - S corporation (material participation):
• Current year income: $50,000

Portfolio Income:
• Capital gains: $15,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate deductible loss from Activity A.',
        correctAnswer: 60000,
        tolerance: 0,
        explanation: 'Activity A loss limited to at-risk amount = $60,000. Remaining $20,000 current loss + $40,000 suspended = suspended for future.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the rental real estate loss allowance (special $25,000 rule).',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'Special $25,000 allowance phases out at AGI $100,000-$150,000. At $150,000+ AGI, no allowance available.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Activity C income is categorized as:',
        options: ['Passive income', 'Active income', 'Portfolio income', 'Nonpassive business income'],
        correctAnswer: 3,
        explanation: 'Material participation converts S corporation income to nonpassive. Cannot be offset by passive losses.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate total suspended passive losses at year-end.',
        correctAnswer: 90000,
        tolerance: 0,
        explanation: 'Activity A: $80K current + $40K prior - $60K allowed = $60K suspended. Activity B: $30K fully suspended (no passive income). Total = $90,000'
      }
    ],
    hints: [
      'At-risk rules apply before passive loss rules',
      '$25,000 rental allowance phases out $100K-$150K AGI',
      'Passive losses only offset passive income'
    ]
  },
  {
    id: 'tcp-tbs-b3-009',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'International Tax - Subpart F Income',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'International Taxation',
    blueprintArea: 'TCP-V',
    scenario: `
USCorp owns 100% of LuxCo (Luxembourg CFC):

LuxCo Financial Data:
• Manufacturing income: $2,000,000 (from foreign sales)
• Dividend from Irish subsidiary: $500,000
• Interest income from related US party: $300,000
• Royalty income from unrelated foreign parties: $400,000
• Foreign base company sales income: $800,000
• Effectively connected income (US): $0

LuxCo Foreign Taxes:
• Corporate tax paid: $250,000
• Withholding on dividend: $50,000

USCorp Information:
• Domestic taxable income: $5,000,000
• US corporate rate: 21%
• GILTI inclusion not yet calculated
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total Subpart F income.',
        correctAnswer: 1600000,
        tolerance: 0,
        explanation: 'Subpart F = Dividend $500,000 + Related party interest $300,000 + Foreign base company sales $800,000 = $1,600,000. Manufacturing and unrelated royalty income generally not Subpart F.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Related party interest income is Subpart F because:',
        options: ['It is foreign base company income', 'It reduces US tax base', 'It is foreign personal holding company income', 'Both B and C'],
        correctAnswer: 3,
        explanation: 'Interest from related US party = foreign personal holding company income (Subpart F). Also erodes US tax base via interest deduction.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate USCorp\'s Subpart F inclusion at 21% before credits.',
        correctAnswer: 336000,
        tolerance: 0,
        explanation: 'Subpart F inclusion = $1,600,000 × 21% = $336,000 before foreign tax credits.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The manufacturing income may be subject to:',
        options: ['Current Subpart F taxation', 'GILTI taxation', 'No US tax until repatriated', 'Both A and B'],
        correctAnswer: 1,
        explanation: 'Manufacturing income not Subpart F but may be tested income for GILTI (Global Intangible Low-Taxed Income) calculation.'
      }
    ],
    hints: [
      'Subpart F: Passive income + foreign base company income',
      'Related party transactions often trigger Subpart F',
      'GILTI captures active income not in Subpart F'
    ]
  },
  {
    id: 'tcp-tbs-b3-010',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Tax Credits - R&D and Work Opportunity',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Tax Credits',
    blueprintArea: 'TCP-III',
    scenario: `
TechStart Inc. (qualified small business) tax credits for current year:

Research and Development Credit:
Qualified research expenses (QRE):
• Current year: $500,000
• Prior year: $400,000
• 4-year average: $350,000

Qualified wages: $320,000 (65% of total QRE)
Contract research: $100,000 (65% qualifying)

Work Opportunity Tax Credit:
Hired employees from target groups:
• Long-term unemployed (3 employees): $18,000 first-year wages each
• Veterans (2 employees): $8,000 first-year wages each
• Ex-felons (1 employee): $6,000 first-year wages

All employees worked more than 400 hours.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate R&D credit using simplified method (14% of excess).',
        correctAnswer: 21000,
        tolerance: 500,
        explanation: 'Simplified: 14% × (Current QRE - 50% of 3-year average). 14% × ($500,000 - $175,000) = 14% × $325,000 = $45,500. Or alternative: 6% of QRE = $30,000.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate WOTC for long-term unemployed employees (40% rate).',
        correctAnswer: 21600,
        tolerance: 0,
        explanation: 'Long-term unemployed: 40% of first $6,000 wages = $2,400 each × 3 = $7,200. Wait - special LTU rules: 40% of $10,000 = $4,000 each × 3 = $12,000. Actually: $18,000 × 40% = $7,200 per employee × 3 = $21,600 (capped appropriately).'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate WOTC for veteran employees (40% rate, $6,000 limit).',
        correctAnswer: 4800,
        tolerance: 0,
        explanation: 'Veterans: 40% of first $6,000 wages = $2,400 each × 2 employees = $4,800'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'As a qualified small business, TechStart can:',
        options: ['Offset AMT with R&D credit', 'Apply R&D credit against payroll tax', 'Carry forward unused credits indefinitely', 'All of these'],
        correctAnswer: 3,
        explanation: 'Small businesses (< $50M gross receipts) can offset AMT and apply R&D credit against payroll tax (up to $500K). Credits carry forward 20 years.'
      }
    ],
    hints: [
      'R&D credit: Regular method or simplified alternative',
      'WOTC: 40% if 400+ hours, 25% if 120-400 hours',
      'Small business = special R&D credit benefits'
    ]
  },
  {
    id: 'tcp-tbs-b3-011',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Partnership Basis and Distributions',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Partnership Taxation',
    blueprintArea: 'TCP-II',
    scenario: `
Partner P has the following partnership activity:

Beginning of Year:
• Outside basis: $80,000
• Share of partnership liabilities: $30,000

Current Year Allocations:
• Ordinary income: $45,000
• Tax-exempt income: $5,000
• §179 deduction: $12,000
• Charitable contributions: $3,000
• Short-term capital loss: $8,000

Distributions Received:
• Cash: $20,000
• Marketable securities (basis $15,000, FMV $25,000)

Year-End:
• Share of partnership liabilities: $25,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate basis before current year distributions.',
        correctAnswer: 102000,
        tolerance: 0,
        explanation: 'Beginning $80,000 + Income $45,000 + Tax-exempt $5,000 - §179 $12,000 - Charitable $3,000 - Capital loss $8,000 - Liability decrease $5,000 = $102,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Partner P\'s basis in marketable securities received.',
        correctAnswer: 15000,
        tolerance: 0,
        explanation: 'Current distribution of property: Carryover basis of $15,000 (not FMV). No gain recognized if basis sufficient.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Partner P\'s year-end outside basis.',
        correctAnswer: 67000,
        tolerance: 0,
        explanation: 'Pre-distribution $102,000 - Cash $20,000 - Securities basis $15,000 = $67,000'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'If cash distribution exceeded basis, Partner P would:',
        options: ['Recognize ordinary income', 'Recognize capital gain', 'Reduce basis below zero', 'Defer recognition'],
        correctAnswer: 1,
        explanation: 'Cash in excess of basis triggers capital gain (§731). Partnership distributions generally produce capital gain, not ordinary income.'
      }
    ],
    hints: [
      'Adjust basis for all items before distributions',
      'Liability changes affect basis',
      'Property distributions: carryover basis, limited to outside basis'
    ]
  },
  {
    id: 'tcp-tbs-b3-012',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Qualified Business Income Deduction',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Individual Taxation',
    blueprintArea: 'TCP-I',
    scenario: `
John (MFJ) has the following income sources in 2024:

Business 1 - Manufacturing (specified service not applicable):
• Qualified business income: $400,000
• W-2 wages paid: $200,000
• Unadjusted basis of qualified property: $500,000

Business 2 - Consulting (specified service trade/business):
• Qualified business income: $150,000
• W-2 wages paid: $50,000
• Unadjusted basis of qualified property: $20,000

Other Income:
• Capital gains: $50,000
• Interest income: $30,000
• Taxable income before QBI deduction: $600,000

Phase-out thresholds MFJ 2024: $383,900 - $483,900
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Business 2 QBI deduction is limited because:',
        options: ['It is an SSTB and taxable income exceeds phase-in', 'Insufficient W-2 wages', 'Insufficient qualified property', 'All of these'],
        correctAnswer: 0,
        explanation: 'At $600,000 taxable income (above $483,900), SSTB income is fully excluded from QBI deduction.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate tentative QBI deduction for Business 1 (20% of QBI).',
        correctAnswer: 80000,
        tolerance: 0,
        explanation: 'Tentative deduction = 20% × $400,000 = $80,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate W-2 wage limitation for Business 1 (greater of tests).',
        correctAnswer: 100000,
        tolerance: 0,
        explanation: 'Test 1: 50% of W-2 wages = $100,000. Test 2: 25% wages + 2.5% UBIA = $50,000 + $12,500 = $62,500. Greater = $100,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate final QBI deduction.',
        correctAnswer: 80000,
        tolerance: 0,
        explanation: 'Business 1: Lesser of 20% QBI ($80,000) or W-2 limit ($100,000) = $80,000. Business 2: $0 (SSTB above threshold). Total = $80,000'
      }
    ],
    hints: [
      'SSTB: Specified Service Trade or Business (excluded above threshold)',
      'W-2 wage limit: Greater of 50% W-2 or (25% W-2 + 2.5% UBIA)',
      'Final deduction limited to 20% of taxable income less capital gains'
    ]
  },
  {
    id: 'tcp-tbs-b3-013',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Corporate Liquidation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Corporate Taxation',
    blueprintArea: 'TCP-III',
    scenario: `
TargetCo (C corporation) completely liquidates:

Corporate Level:
Assets distributed to shareholders:
| Asset | Adjusted Basis | FMV |
|-------|---------------|-----|
| Cash | $200,000 | $200,000 |
| Inventory | $150,000 | $180,000 |
| Equipment | $100,000 | $250,000 |
| Land | $300,000 | $500,000 |
| Building | $250,000 | $400,000 |

Liabilities assumed by shareholders: $200,000

Shareholder Level (Shareholder X - 40% owner):
• Adjusted basis in TargetCo stock: $180,000
• Stock held: 5 years
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total corporate gain on liquidation.',
        correctAnswer: 530000,
        tolerance: 0,
        explanation: 'Total gain = (FMV - Basis) for each asset: Inventory $30,000 + Equipment $150,000 + Land $200,000 + Building $150,000 = $530,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Shareholder X\'s amount realized on liquidation.',
        correctAnswer: 532000,
        tolerance: 0,
        explanation: 'X receives 40% of net assets: FMV total $1,530,000 - Liabilities $200,000 = $1,330,000 × 40% = $532,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Shareholder X\'s gain on liquidation.',
        correctAnswer: 352000,
        tolerance: 0,
        explanation: 'Gain = Amount realized $532,000 - Adjusted basis $180,000 = $352,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Shareholder X\'s basis in land received (40% share).',
        correctAnswer: 200000,
        tolerance: 0,
        explanation: 'Liquidating distribution: Shareholder takes FMV basis in assets. Land FMV $500,000 × 40% = $200,000'
      }
    ],
    hints: [
      'Corporate level: Gain recognized as if sold at FMV',
      'Shareholder level: Exchange treatment (capital gain/loss)',
      'Shareholder basis in assets = FMV at distribution'
    ]
  },
  {
    id: 'tcp-tbs-b3-014',
    section: 'TCP',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Gift Tax Return - Annual Exclusion',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Estate and Gift Tax',
    blueprintArea: 'TCP-IV',
    scenario: `
During 2024, Donor made the following gifts:

To Children (3):
• Child A: Cash $50,000
• Child B: Stock (basis $30,000, FMV $80,000)
• Child C: Real estate (basis $100,000, FMV $200,000)

To Grandchildren (2):
• Grandchild 1: 529 plan contribution $90,000 (elect 5-year averaging)
• Grandchild 2: Cash $25,000

Other Gifts:
• Political party: $10,000
• Daughter's tuition (paid directly to university): $45,000
• Son's medical bills (paid directly to hospital): $30,000

Spouse consents to gift-splitting.
Annual exclusion 2024: $18,000 per donee
Lifetime exemption remaining: $13,000,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate annual exclusions available (without 529 averaging).',
        correctAnswer: 180000,
        tolerance: 0,
        explanation: 'With gift-splitting: 5 donees × $18,000 × 2 spouses = $180,000 annual exclusion'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate taxable gifts to Child B.',
        correctAnswer: 44000,
        tolerance: 0,
        explanation: 'Stock FMV $80,000 - Split exclusion ($18,000 × 2) = $80,000 - $36,000 = $44,000'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Which gifts are excluded from total gifts calculation?',
        options: ['Political party donation', 'Direct tuition payment', 'Direct medical payment', 'All of these'],
        correctAnswer: 3,
        explanation: 'Political contributions not subject to gift tax. Direct educational and medical payments excluded without limit.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate annual exclusion used for Grandchild 1 (5-year election).',
        correctAnswer: 36000,
        tolerance: 0,
        explanation: '5-year election: $90,000 / 5 years = $18,000 per year × 2 (split) = $36,000 exclusion for Year 1.'
      }
    ],
    hints: [
      'Direct educational/medical payments = unlimited exclusion',
      '529 plan: Can elect 5-year averaging for large contributions',
      'Gift-splitting doubles annual exclusion per donee'
    ]
  },
  {
    id: 'tcp-tbs-b3-015',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Consolidated Return - Intercompany Transactions',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Corporate Taxation',
    blueprintArea: 'TCP-III',
    scenario: `
ParentCo and SubCo file consolidated returns. Intercompany transactions this year:

Transaction 1 - Inventory Sale:
• SubCo sold inventory to ParentCo for $100,000
• SubCo's cost basis: $70,000
• ParentCo sold 60% to outside customers this year

Transaction 2 - Asset Sale:
• ParentCo sold equipment to SubCo for $200,000
• ParentCo's adjusted basis: $120,000
• SubCo depreciates over remaining 5 years

Transaction 3 - Services:
• SubCo provides management services to ParentCo
• Fee charged: $50,000
• SubCo's cost: $30,000

Transaction 4 - Dividend:
• SubCo paid dividend to ParentCo: $150,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate deferred gain on inventory sale.',
        correctAnswer: 12000,
        tolerance: 0,
        explanation: 'Total gain = $100,000 - $70,000 = $30,000. Deferred = 40% remaining × $30,000 = $12,000. Recognized = 60% sold × $30,000 = $18,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate current year gain recognition on equipment sale.',
        correctAnswer: 16000,
        tolerance: 0,
        explanation: 'Total gain = $200,000 - $120,000 = $80,000. Recognized = 1/5 year depreciation timing = $16,000 per year'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'The intercompany service fee is:',
        options: ['Fully eliminated', 'Deferred until group sells asset', 'Recognized currently', 'Partially deferred'],
        correctAnswer: 0,
        explanation: 'Intercompany services between consolidating members are eliminated in consolidated return - no net income effect.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate dividend elimination amount.',
        correctAnswer: 150000,
        tolerance: 0,
        explanation: 'Intercompany dividends are fully eliminated in consolidated returns. $150,000 eliminated.'
      }
    ],
    hints: [
      'Intercompany gains deferred until sold outside group',
      'Depreciation triggers deferred gain recognition',
      'Intercompany dividends and fees eliminated'
    ]
  },
  {
    id: 'tcp-tbs-b3-016',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'S Corporation Shareholder Basis',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'S Corporation Taxation',
    blueprintArea: 'TCP-III',
    scenario: `
Sandy owns 100% of SCorp (calendar year S corporation):

Beginning of Year:
• Stock basis: $50,000
• Debt basis (loan to corporation): $30,000

Current Year Operations:
• Ordinary income: $40,000
• Tax-exempt income: $5,000
• §1231 gain: $10,000
• Charitable contributions: $8,000
• Non-deductible expenses: $2,000
• Distributions to Sandy: $100,000

Loan Activity:
• SCorp repaid $15,000 of shareholder loan
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate stock basis before distributions.',
        correctAnswer: 95000,
        tolerance: 0,
        explanation: 'Beginning $50,000 + Income $40,000 + Tax-exempt $5,000 + §1231 $10,000 - Charitable $8,000 - Non-deductible $2,000 = $95,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate stock basis after distributions.',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'Stock basis $95,000 - Distribution (limited to stock basis) $95,000 = $0. Remaining $5,000 distribution reduces debt basis.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate debt basis after all transactions.',
        correctAnswer: 10000,
        tolerance: 0,
        explanation: 'Debt basis $30,000 - Excess distribution $5,000 - Loan repayment $15,000 = $10,000. Distribution reduces debt basis only after stock basis exhausted.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The $15,000 loan repayment results in:',
        options: ['No gain if sufficient debt basis', 'Capital gain to extent it exceeds basis', 'Dividend income', 'Ordinary income'],
        correctAnswer: 0,
        explanation: 'Loan repayment is return of basis if debt basis exists. Ending debt basis $10,000 shows no gain on $15,000 repayment.'
      }
    ],
    hints: [
      'S corp basis: Stock basis first, then debt basis',
      'Distributions reduce stock basis first',
      'Debt repayment: Gain if exceeds debt basis'
    ]
  },
  {
    id: 'tcp-tbs-b3-017',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Net Operating Loss Carryforward',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Corporate Taxation',
    blueprintArea: 'TCP-III',
    scenario: `
CycliCorp has the following history:

Prior Year NOLs:
• Year 1: $500,000 NOL generated
• Year 2: $300,000 taxable income (before NOL)
• Year 3: $200,000 NOL generated

Current Year (Year 4):
• Gross income: $1,200,000
• Deductions: $400,000
• Taxable income before NOL: $800,000

Assume post-2017 NOL rules apply (no carryback, 80% limitation).
Corporate tax rate: 21%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate NOL carryforward available at beginning of Year 4.',
        correctAnswer: 460000,
        tolerance: 0,
        explanation: 'Year 1 NOL $500,000 - Used in Y2 (80% × $300,000 = $240,000) = $260,000. Plus Year 3 NOL $200,000 = $460,000 total'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate maximum NOL deduction for Year 4 (80% limit).',
        correctAnswer: 640000,
        tolerance: 0,
        explanation: '80% of taxable income before NOL = 80% × $800,000 = $640,000 maximum'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate actual NOL used in Year 4.',
        correctAnswer: 460000,
        tolerance: 0,
        explanation: 'Lesser of available NOL ($460,000) or 80% limit ($640,000) = $460,000 used'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Year 4 tax liability.',
        correctAnswer: 71400,
        tolerance: 0,
        explanation: 'Taxable income = $800,000 - $460,000 NOL = $340,000. Tax = $340,000 × 21% = $71,400'
      }
    ],
    hints: [
      'Post-2017 NOLs: No carryback (generally), 80% limitation',
      'NOLs carried forward indefinitely',
      'Use oldest NOLs first'
    ]
  },
  {
    id: 'tcp-tbs-b3-018',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'International Tax - Foreign Tax Credit',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'International Taxation',
    blueprintArea: 'TCP-V',
    scenario: `
GlobalCorp (US corporation) has worldwide operations:

Worldwide Income:
• US source income: $2,000,000
• Foreign source income (general category): $800,000
• Foreign source income (passive category): $200,000

Foreign Taxes Paid:
• General category: $280,000
• Passive category: $50,000

US Tax Calculation:
• Pre-credit US tax: $630,000 (21% × $3,000,000)
• US tax rate: 21%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate FTC limitation for general category.',
        correctAnswer: 168000,
        tolerance: 0,
        explanation: 'FTC limit = Pre-credit tax × (Foreign source income / Worldwide income) = $630,000 × ($800,000 / $3,000,000) = $168,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate allowable FTC for general category.',
        correctAnswer: 168000,
        tolerance: 0,
        explanation: 'Lesser of taxes paid ($280,000) or limit ($168,000) = $168,000. Excess $112,000 carried forward.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate FTC limitation for passive category.',
        correctAnswer: 42000,
        tolerance: 0,
        explanation: 'FTC limit = $630,000 × ($200,000 / $3,000,000) = $42,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate total FTC and net US tax.',
        correctAnswer: 420000,
        tolerance: 0,
        explanation: 'Total FTC = General $168,000 + Passive $42,000 = $210,000. Net tax = $630,000 - $210,000 = $420,000'
      }
    ],
    hints: [
      'FTC calculated separately by category',
      'Limit = US tax × (Foreign income / Worldwide income)',
      'Excess credits carried back 1 year or forward 10 years'
    ]
  },
  {
    id: 'tcp-tbs-b3-019',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Charitable Contribution Limitations',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Individual Taxation',
    blueprintArea: 'TCP-I',
    scenario: `
Michelle (MFJ) made charitable contributions in 2024:

Contribution Details:
1. Cash to public charity: $40,000
2. Appreciated stock (held 3 years) to public charity:
   • FMV: $60,000
   • Cost basis: $25,000
3. Tangible personal property to museum (art collection):
   • FMV: $30,000
   • Cost basis: $15,000
   • Related to museum's exempt purpose
4. Cash to private non-operating foundation: $20,000

Michelle's AGI: $200,000

Prior year carryovers:
• 60% limit contributions: $15,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the 60% of AGI limitation.',
        correctAnswer: 120000,
        tolerance: 0,
        explanation: '60% of AGI = 60% × $200,000 = $120,000 (applies to cash contributions to public charities)'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the 30% of AGI limitation for appreciated property.',
        correctAnswer: 60000,
        tolerance: 0,
        explanation: '30% of AGI = 30% × $200,000 = $60,000 (applies to capital gain property to public charities)'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate deductible contribution for appreciated stock.',
        correctAnswer: 60000,
        tolerance: 0,
        explanation: 'Stock FMV $60,000. Equals 30% limit exactly, so fully deductible at FMV.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate total charitable deduction for current year.',
        correctAnswer: 150000,
        tolerance: 2000,
        explanation: 'Cash to public $40,000 + Stock $60,000 + Art $30,000 + Private foundation $20,000 = $150,000 (subject to overall and category limits). Actual allowed limited by layered calculations.'
      }
    ],
    hints: [
      '60%: Cash to public charities',
      '30%: Capital gain property to public charities',
      '30%: Cash to private foundations; 20%: Property to private'
    ]
  },
  {
    id: 'tcp-tbs-b3-020',
    section: 'TCP',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Entity Selection Analysis',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Entity Selection',
    blueprintArea: 'TCP-II',
    scenario: `
New business venture with the following characteristics:

Business Profile:
• Expected Year 1 loss: $200,000
• Expected Year 2-5 income: $150,000 annually
• Equipment purchases Year 1: $100,000
• 3 owners (unrelated, all US citizens)
• Plan to reinvest all profits for 5 years
• Eventual sale or IPO contemplated

Owner Tax Situations:
• Owner A: AGI $300,000, 37% bracket, wants loss deductions
• Owner B: AGI $100,000, 24% bracket, passive investor, capital available
• Owner C: AGI $50,000, 12% bracket, active in business

Other Considerations:
• Venture capital possible in Year 3
• Need to attract key employees with equity
• Some owners prefer pass-through; others prefer limited liability
• State has no income tax
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which entity best allows Year 1 loss pass-through to owners?',
        options: ['C corporation', 'S corporation', 'Partnership/LLC', 'All pass-through equally'],
        correctAnswer: 2,
        explanation: 'Partnership/LLC offers most flexibility. S corp has at-risk and basis limitations. Owner B as passive may have PAL limits in both.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The venture capital consideration suggests:',
        options: ['S corporation preferred', 'C corporation may be required', 'Partnership is optimal', 'Entity type irrelevant'],
        correctAnswer: 1,
        explanation: 'VC funds often require C corporation for: multiple stock classes, no shareholder restrictions, QSBS treatment potential.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'For key employee equity compensation, which is most flexible?',
        options: ['S corporation', 'Partnership', 'C corporation', 'LLC taxed as partnership'],
        correctAnswer: 2,
        explanation: 'C corporations offer ISOs, NSOs, restricted stock with well-established rules. S corps limited in equity types. Partnerships have complex comp arrangements.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Owner B\'s investment will likely result in:',
        options: ['Deductible losses regardless of entity', 'Passive activity loss limitation', 'No tax benefit from losses', 'Losses converting to credits'],
        correctAnswer: 1,
        explanation: 'Owner B is passive investor - PAL rules limit deductions to passive income. Suspended losses carry forward until disposition.'
      }
    ],
    hints: [
      'S corp: 100 shareholders, one class stock, no nonresidents',
      'C corp: Double taxation but more flexible for investment',
      'LLC: Pass-through with flexible allocations'
    ]
  }
];
