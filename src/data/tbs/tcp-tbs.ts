// TCP - Tax Compliance and Planning TBS
// Task-Based Simulations for TCP Section
// Covers: Individual Tax, Entity Tax, Property Transactions, Gift & Estate Tax

import { TBS, TBS_TYPES } from '../../types';

export const TCP_TBS: TBS[] = [
  // =========================================================================
  // AREA I: Individual Tax Planning (20-30%)
  // =========================================================================
  {
    id: 'tcp-tbs-001',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Individual Income Tax - Comprehensive Calculation',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Individual Income Tax',
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-I-A-1',
    scenario: `
John and Mary Thompson are married filing jointly for 2024. They have the following information:

Income:
• John's W-2 wages: $185,000
• Mary's W-2 wages: $95,000
• Interest income from savings: $3,500
• Qualified dividends: $12,000
• Capital gain from stock sale (held 18 months): $25,000
• Rental property income (net): $8,000
• Traditional IRA distribution: $15,000 (John, age 62)

Adjustments to Income:
• John's 401(k) contribution: $23,000
• Mary's 401(k) contribution: $15,000
• Health Savings Account (HSA) contribution: $8,300 (family)
• Self-employment health insurance: $0
• Student loan interest: $2,500

Itemized Deductions:
• State income taxes paid: $18,000
• Property taxes: $14,000
• Home mortgage interest: $22,000
• Charitable contributions (cash): $15,000

Tax Information:
• Dependents: 2 qualifying children (ages 8 and 12)
• Child tax credit income phaseout begins at $400,000 MFJ
• Standard deduction MFJ 2024: $29,200
• SALT cap: $10,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total gross income.',
        correctAnswer: 343500,
        tolerance: 0,
        explanation: 'Gross income = Wages ($185,000 + $95,000) + Interest ($3,500) + Dividends ($12,000) + Capital gains ($25,000) + Rental ($8,000) + IRA distribution ($15,000) = $343,500',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total adjustments to income (above-the-line deductions).',
        correctAnswer: 48800,
        tolerance: 0,
        explanation: 'Adjustments = 401(k) John ($23,000) + 401(k) Mary ($15,000) + HSA ($8,300) + Student loan interest ($2,500) = $48,800. Note: 401(k) contributions reduce W-2, but for this calculation we include them.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Adjusted Gross Income (AGI).',
        correctAnswer: 294700,
        tolerance: 0,
        explanation: 'AGI = Gross Income ($343,500) - Adjustments ($48,800) = $294,700',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate total allowable itemized deductions.',
        correctAnswer: 47000,
        tolerance: 0,
        explanation: 'SALT is capped at $10,000, so Itemized = SALT cap ($10,000) + Mortgage interest ($22,000) + Charitable ($15,000) = $47,000',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Should the Thompsons itemize or take the standard deduction?',
        options: [
          'Standard deduction ($29,200) - higher benefit',
          'Itemize ($47,000) - higher benefit',
          'Either option results in the same tax',
          'Cannot determine without more information',
        ],
        correctAnswer: 1,
        explanation: 'Itemized deductions ($47,000) exceed the standard deduction ($29,200), so they should itemize.',
      },
      {
        id: 'req-6',
        type: 'calculation',
        question: 'Calculate taxable income.',
        correctAnswer: 247700,
        tolerance: 0,
        explanation: 'Taxable income = AGI ($294,700) - Itemized deductions ($47,000) = $247,700',
      },
      {
        id: 'req-7',
        type: 'calculation',
        question: 'Calculate the Child Tax Credit (before any other credits).',
        correctAnswer: 4000,
        tolerance: 0,
        explanation: 'Full CTC = $2,000 × 2 children = $4,000. AGI ($294,700) is below the $400,000 phaseout threshold for MFJ, so no reduction.',
      },
    ],
    hints: [
      'The SALT deduction (state + property tax) is capped at $10,000',
      '401(k) contributions are pre-tax and reduce gross income',
      'Compare itemized deductions to standard deduction to determine which is beneficial',
    ],
    references: ['IRC §1', 'IRC §62', 'IRC §63', 'IRC §24'],
  },
  {
    id: 'tcp-tbs-002',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Passive Activity Losses and At-Risk Rules',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Passive Activities',
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-I-B-2',
    scenario: `
Sarah Martinez (single, AGI: $125,000 before rental activities) has investments in three rental real estate activities. Sarah actively participates in Activities A and B but does not participate in Activity C.

Activity A - Apartment Building:
• At-risk amount at start of year: $50,000
• Current year income: $8,000

Activity B - Office Building:
• At-risk amount at start of year: $75,000
• Current year loss: ($32,000)
• Nonrecourse debt (qualified): $40,000

Activity C - Limited Partnership Interest:
• At-risk amount at start of year: $15,000
• Current year loss: ($22,000)

Additional Information:
• Sarah's modified AGI (for passive loss purposes): $125,000
• Passive activity loss allowance phases out from $100,000 to $150,000 MAGI
• Special $25,000 allowance for active participation in rental real estate
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Sarah\'s net passive income/loss before at-risk limitations.',
        correctAnswer: -46000,
        tolerance: 0,
        explanation: 'Net passive = Activity A ($8,000) + Activity B (-$32,000) + Activity C (-$22,000) = -$46,000 loss',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'What is the at-risk limitation for Activity C?',
        correctAnswer: 15000,
        tolerance: 0,
        explanation: 'Activity C loss is limited to the at-risk amount of $15,000. The remaining $7,000 ($22,000 - $15,000) is suspended.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the loss deductible under the at-risk rules (before passive loss rules).',
        correctAnswer: 39000,
        tolerance: 0,
        explanation: 'Deductible loss = Activity A income ($8,000) + Activity B loss (-$32,000, fully at-risk) + Activity C loss (-$15,000, limited) = Net loss of $39,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the reduced $25,000 special allowance for Sarah.',
        correctAnswer: 12500,
        tolerance: 0,
        explanation: 'Phaseout = ($125,000 - $100,000) × 50% = $12,500 reduction. Allowance = $25,000 - $12,500 = $12,500',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'What is the maximum rental loss Sarah can deduct against ordinary income?',
        correctAnswer: 12500,
        tolerance: 0,
        explanation: 'Sarah actively participates in A and B, so she can use the special allowance. Maximum deductible = $12,500 (reduced allowance). Remaining losses are suspended.',
      },
      {
        id: 'req-6',
        type: 'multiple_choice',
        question: 'Why is Activity C NOT eligible for the $25,000 special allowance?',
        options: [
          'The loss exceeds $25,000',
          'Sarah does not actively participate in Activity C',
          'Activity C has nonrecourse debt',
          'Activity C is not rental real estate',
        ],
        correctAnswer: 1,
        explanation: 'The $25,000 special allowance requires active participation. Sarah does not actively participate in Activity C (LP interest), so it\'s treated as a regular passive activity.',
      },
    ],
    hints: [
      'Apply at-risk rules FIRST, then passive activity loss rules',
      'Active participation has a lower threshold than material participation',
      'The $25,000 allowance is reduced by 50% of MAGI over $100,000',
    ],
    references: ['IRC §465', 'IRC §469', 'Reg. §1.469-1T'],
  },

  // =========================================================================
  // AREA II: Entity Tax Planning (30-40%)
  // =========================================================================
  {
    id: 'tcp-tbs-003',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'S Corporation Shareholder Basis Calculation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'S Corporation Taxation',
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-A-2',
    scenario: `
David is a 50% shareholder in TechSolutions, Inc., an S corporation. His stock basis at January 1, 2024, was $85,000. He has no debt basis.

2024 S Corporation Activities (100% share, David's share is 50%):
• Ordinary business income: $180,000
• Tax-exempt interest income: $10,000
• Section 1231 gain: $20,000
• Charitable contributions: $8,000
• Non-deductible expenses (50% meals): $4,000
• Distributions to shareholders: $160,000

Loans:
• On March 1, David loaned $30,000 to the S corporation
• S corp repaid $10,000 of the loan on November 1
• Interest of $2,000 was paid on the loan (included in ordinary income above)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate David\'s share of ordinary business income.',
        correctAnswer: 90000,
        tolerance: 0,
        explanation: 'David\'s 50% share of ordinary income = $180,000 × 50% = $90,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate David\'s total separately stated items that INCREASE basis.',
        correctAnswer: 15000,
        tolerance: 0,
        explanation: 'Increases = Tax-exempt interest ($10,000 × 50% = $5,000) + Section 1231 gain ($20,000 × 50% = $10,000) = $15,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate David\'s total items that DECREASE basis (excluding distributions).',
        correctAnswer: 6000,
        tolerance: 0,
        explanation: 'Decreases = Charitable ($8,000 × 50% = $4,000) + Non-deductible expenses ($4,000 × 50% = $2,000) = $6,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate David\'s stock basis BEFORE distributions.',
        correctAnswer: 184000,
        tolerance: 0,
        explanation: 'Basis before distributions = Beginning ($85,000) + Ordinary income ($90,000) + Increases ($15,000) - Decreases ($6,000) = $184,000',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate David\'s share of distributions.',
        correctAnswer: 80000,
        tolerance: 0,
        explanation: 'Distributions = $160,000 × 50% = $80,000',
      },
      {
        id: 'req-6',
        type: 'calculation',
        question: 'Calculate David\'s ending stock basis at December 31, 2024.',
        correctAnswer: 104000,
        tolerance: 0,
        explanation: 'Ending stock basis = Basis before distributions ($184,000) - Distributions ($80,000) = $104,000',
      },
      {
        id: 'req-7',
        type: 'calculation',
        question: 'Calculate David\'s ending debt basis from the shareholder loan.',
        correctAnswer: 20000,
        tolerance: 0,
        explanation: 'Debt basis = Original loan ($30,000) - Repayment ($10,000) = $20,000. Note: Income/losses don\'t reduce debt basis until stock basis reaches zero.',
      },
    ],
    hints: [
      'S corporation income/losses flow through to shareholders pro rata',
      'Order of basis adjustments: Increase for income first, then decrease for distributions, then decrease for losses',
      'Debt basis comes from direct shareholder loans to the S corp, not guaranteed loans',
    ],
    references: ['IRC §1366', 'IRC §1367', 'IRC §1368'],
  },
  {
    id: 'tcp-tbs-004',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Partnership Liquidating Distribution',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Partnership Taxation',
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-B-3',
    scenario: `
ABC Partnership has three equal partners: Amy, Bob, and Chris. The partnership is liquidating, with the following balance sheet immediately before liquidation:

Assets (Tax Basis / FMV):
• Cash: $90,000 / $90,000
• Accounts Receivable: $0 / $30,000 (cash basis partnership)
• Inventory: $45,000 / $60,000
• Land: $75,000 / $150,000
• Total: $210,000 / $330,000

Liabilities:
• Accounts Payable: $30,000

Partners' Outside Basis:
• Amy: $65,000
• Bob: $65,000
• Chris: $50,000

Liquidation Plan:
Each partner will receive 1/3 of the cash and one of the following:
• Amy receives: All A/R
• Bob receives: All Inventory
• Chris receives: All Land

Liabilities are allocated equally and assumed by each partner.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'What is each partner\'s share of liabilities to be assumed?',
        correctAnswer: 10000,
        tolerance: 0,
        explanation: 'Each partner assumes $30,000 ÷ 3 = $10,000 of liabilities',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'What is each partner\'s share of cash distribution?',
        correctAnswer: 30000,
        tolerance: 0,
        explanation: 'Each partner receives $90,000 ÷ 3 = $30,000 cash',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Amy\'s outside basis immediately before receiving property (after liability assumption and cash).',
        correctAnswer: 45000,
        tolerance: 0,
        explanation: 'Amy\'s adjusted basis = Beginning ($65,000) + Liability assumed ($10,000) - Cash received ($30,000) = $45,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What is Amy\'s basis in the Accounts Receivable received?',
        correctAnswer: 45000,
        tolerance: 0,
        explanation: 'In a liquidating distribution, the partner\'s remaining outside basis becomes the basis of property received. Amy\'s A/R basis = $45,000 (her remaining outside basis).',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate Chris\'s outside basis immediately before receiving the land.',
        correctAnswer: 30000,
        tolerance: 0,
        explanation: 'Chris\'s adjusted basis = Beginning ($50,000) + Liability ($10,000) - Cash ($30,000) = $30,000',
      },
      {
        id: 'req-6',
        type: 'calculation',
        question: 'What is Chris\'s basis in the land received?',
        correctAnswer: 30000,
        tolerance: 0,
        explanation: 'Chris\'s land basis = $30,000 (his remaining outside basis). Note: The partnership\'s basis was $75,000, but Chris takes a substituted basis equal to his outside basis.',
      },
      {
        id: 'req-7',
        type: 'multiple_choice',
        question: 'If Chris later sells the land for $150,000 (FMV), what is his recognized gain?',
        options: [
          '$75,000',
          '$120,000',
          '$150,000',
          'No gain recognized',
        ],
        correctAnswer: 1,
        explanation: 'Chris\'s gain = FMV ($150,000) - His basis ($30,000) = $120,000. The built-in gain that existed in the partnership is now recognized when Chris sells.',
      },
    ],
    hints: [
      'In liquidating distributions, outside basis becomes the basis of property received',
      'Cash is always distributed at face value; basis absorbs any difference',
      'Hot assets (A/R, inventory) may trigger ordinary income recognition',
    ],
    references: ['IRC §731', 'IRC §732', 'IRC §751'],
  },
  {
    id: 'tcp-tbs-005',
    section: 'TCP',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Entity Selection Analysis',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Entity Selection',
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-C-1',
    scenario: `
Dr. Elena Rodriguez is starting a new medical practice. She anticipates the following:
• Year 1 net profit: $180,000
• Year 2 net profit: $280,000
• Year 3+ net profit: $400,000+
• She will be the only owner initially
• Plans to add 2 partner physicians in Year 3
• Will need business losses to offset other income initially if practice struggles
• Wants flexibility for future ownership transfers
• Concerned about malpractice liability
• State: California (which taxes S corps 1.5% on net income)
• 2024 self-employment tax: 15.3% on first $168,600, 2.9% on amounts above

Consider these entity options:
A. Sole Proprietorship
B. Single-member LLC (disregarded)
C. S Corporation
D. C Corporation
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which entity provides the BEST liability protection for Dr. Rodriguez?',
        options: [
          'Sole Proprietorship',
          'Single-member LLC or S Corp or C Corp (all provide similar protection)',
          'C Corporation provides the most protection',
          'None provide protection for medical malpractice',
        ],
        correctAnswer: 1,
        explanation: 'LLCs, S Corps, and C Corps all provide liability protection (limited liability). However, professional liability (malpractice) may still attach personally regardless of entity.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the approximate self-employment tax on Year 1 net profit of $180,000 as a sole proprietor.',
        correctAnswer: 24579,
        tolerance: 500,
        explanation: 'SE tax base = $180,000 × 92.35% = $166,230. SE tax = $166,230 × 15.3% ≈ $25,433 (all under wage base). Slight variation based on exact calculations.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'If the practice has a $50,000 loss in Year 1, which entity allows the loss to flow through to offset Dr. Rodriguez\'s other income?',
        options: [
          'C Corporation only',
          'S Corporation and LLC (disregarded) only',
          'S Corporation, LLC, and Sole Proprietorship',
          'None - business losses cannot offset personal income',
        ],
        correctAnswer: 2,
        explanation: 'Pass-through entities (S Corp, LLC, Sole Prop) allow losses to flow through to the owner\'s personal return, subject to basis, at-risk, and passive loss limitations.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'For Year 3 when profits reach $400,000, which entity structure minimizes self-employment/payroll taxes?',
        options: [
          'Sole Proprietorship',
          'Single-member LLC (disregarded)',
          'S Corporation with reasonable salary',
          'C Corporation',
        ],
        correctAnswer: 2,
        explanation: 'S Corp allows splitting income between salary (subject to FICA) and distributions (not subject). A reasonable salary might be $200,000, with $200,000 as distributions.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'When Dr. Rodriguez adds partners in Year 3, which transition is simplest?',
        options: [
          'Sole Prop to Partnership',
          'Single-member LLC to multi-member LLC',
          'S Corp to Partnership',
          'C Corp to S Corp',
        ],
        correctAnswer: 1,
        explanation: 'A single-member LLC can simply add members and automatically becomes a multi-member LLC (partnership for tax). S Corp must issue new shares; C Corp conversion is complex.',
      },
      {
        id: 'req-6',
        type: 'multiple_choice',
        question: 'The California S corp tax (1.5% of net income) in Year 3 would be approximately:',
        options: [
          '$2,700',
          '$4,200',
          '$6,000',
          '$0 - only federal taxes apply',
        ],
        correctAnswer: 2,
        explanation: 'California S corp tax = $400,000 × 1.5% = $6,000 minimum tax (or $800, whichever is greater).',
      },
    ],
    hints: [
      'Self-employment tax applies to all sole proprietor/LLC income',
      'S Corp allows salary/distribution split to reduce SE tax',
      'Consider both current and future needs in entity selection',
    ],
    references: ['IRC §1361-1379', 'IRC §701-761', 'State Tax Considerations'],
  },

  // =========================================================================
  // AREA III: Property Transactions (15-25%)
  // =========================================================================
  {
    id: 'tcp-tbs-006',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Section 1031 Like-Kind Exchange',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Like-Kind Exchanges',
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-A-1',
    scenario: `
Greenfield Investments owns a commercial office building that it wants to exchange for a larger property. The exchange details are:

Relinquished Property (Office Building):
• Fair Market Value: $2,500,000
• Adjusted Basis: $1,400,000
• Mortgage assumed by buyer: $800,000
• Owned and used for investment

Replacement Property (Shopping Center):
• Fair Market Value: $3,200,000
• Cash paid by Greenfield: $100,000
• New mortgage assumed by Greenfield: $1,500,000

Exchange Structure:
• Uses a Qualified Intermediary
• 45-day identification met
• 180-day exchange period met
• Boot received: Cash of $100,000 from buyer at closing
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the total realized gain on the exchange.',
        correctAnswer: 1100000,
        tolerance: 0,
        explanation: 'Realized gain = FMV received ($2,500,000) - Adjusted basis ($1,400,000) = $1,100,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the net boot received (mortgage relief less mortgage assumed and cash paid).',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'Net boot = Mortgage relief ($800,000) + Cash received ($100,000) - New mortgage ($1,500,000) - Cash paid ($100,000) = -$700,000. Negative boot = $0 (excess paid is basis increase).',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the recognized gain.',
        correctAnswer: 100000,
        tolerance: 0,
        explanation: 'Cash boot received = $100,000. Recognized gain = lesser of (1) realized gain ($1,100,000) or (2) boot received ($100,000) = $100,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the deferred gain.',
        correctAnswer: 1000000,
        tolerance: 0,
        explanation: 'Deferred gain = Realized gain ($1,100,000) - Recognized gain ($100,000) = $1,000,000',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the basis of the replacement property (shopping center).',
        correctAnswer: 2100000,
        tolerance: 0,
        explanation: 'Basis of replacement = FMV of replacement ($3,200,000) - Deferred gain ($1,000,000) = $2,200,000. OR: Old basis ($1,400,000) + Cash paid ($100,000) + New mortgage ($1,500,000) + Recognized gain ($100,000) - Mortgage relief ($800,000) - Cash boot ($100,000) = $2,200,000',
      },
      {
        id: 'req-6',
        type: 'multiple_choice',
        question: 'If Greenfield had received NO cash boot, what would be the recognized gain?',
        options: [
          '$1,100,000',
          '$700,000',
          '$100,000',
          '$0',
        ],
        correctAnswer: 3,
        explanation: 'With no cash boot and net mortgage boot of zero or negative (paid more than relieved), recognized gain = $0. All gain would be deferred.',
      },
    ],
    hints: [
      'Boot = cash + net debt relief (mortgage relieved minus mortgage assumed)',
      'Recognized gain = lesser of realized gain or boot received',
      'Replacement basis preserves deferred gain for future recognition',
    ],
    references: ['IRC §1031', 'Reg. §1.1031'],
  },
  {
    id: 'tcp-tbs-007',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Section 1245 and 1250 Depreciation Recapture',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Depreciation Recapture',
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-B-2',
    scenario: `
Industrial Equipment Corp. sells the following assets during the current year:

Asset 1 - Manufacturing Equipment (Section 1245 property):
• Original cost: $500,000
• Accumulated depreciation: $350,000
• Adjusted basis: $150,000
• Selling price: $280,000

Asset 2 - Factory Building (Section 1250 property, nonresidential):
• Original cost: $1,200,000
• Accumulated depreciation (straight-line): $400,000
• Adjusted basis: $800,000
• Selling price: $1,500,000

Asset 3 - Residential Rental Property (Section 1250 property):
• Original cost: $600,000
• Accumulated depreciation: $180,000
• Adjusted basis: $420,000
• Selling price: $750,000

Note: All assets held more than one year. Unrecaptured Section 1250 gain is taxed at 25%.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the total gain on the manufacturing equipment sale.',
        correctAnswer: 130000,
        tolerance: 0,
        explanation: 'Gain = Selling price ($280,000) - Adjusted basis ($150,000) = $130,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'How much of the equipment gain is Section 1245 ordinary income recapture?',
        correctAnswer: 130000,
        tolerance: 0,
        explanation: 'Section 1245 recaptures the lesser of (1) gain ($130,000) or (2) depreciation taken ($350,000). All $130,000 is ordinary income.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the total gain on the factory building sale.',
        correctAnswer: 700000,
        tolerance: 0,
        explanation: 'Gain = Selling price ($1,500,000) - Adjusted basis ($800,000) = $700,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'How much is unrecaptured Section 1250 gain on the factory (taxed at 25%)?',
        correctAnswer: 400000,
        tolerance: 0,
        explanation: 'Unrecaptured 1250 = lesser of (1) gain ($700,000) or (2) straight-line depreciation ($400,000) = $400,000',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'How much of the factory gain is taxed as long-term capital gain (at 15%/20%)?',
        correctAnswer: 300000,
        tolerance: 0,
        explanation: 'LTCG portion = Total gain ($700,000) - Unrecaptured 1250 ($400,000) = $300,000',
      },
      {
        id: 'req-6',
        type: 'calculation',
        question: 'Calculate the unrecaptured Section 1250 gain on the residential rental property.',
        correctAnswer: 180000,
        tolerance: 0,
        explanation: 'Total gain = $750,000 - $420,000 = $330,000. Unrecaptured 1250 = lesser of gain ($330,000) or depreciation ($180,000) = $180,000',
      },
    ],
    hints: [
      'Section 1245 recaptures ALL depreciation as ordinary income (up to the gain)',
      'Section 1250 real property recaptures only depreciation in excess of straight-line as ordinary income',
      'Unrecaptured Section 1250 (straight-line depreciation on real property) is taxed at 25% max rate',
    ],
    references: ['IRC §1245', 'IRC §1250', 'IRC §1(h)'],
  },

  // =========================================================================
  // AREA IV: Gift and Estate Tax (10-20%)
  // =========================================================================
  {
    id: 'tcp-tbs-008',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Gift Tax Calculation',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Gift Tax',
    blueprintArea: 'TCP-IV',
    blueprintTopic: 'TCP-IV-A-1',
    scenario: `
Robert and Susan Wilson (married) make the following gifts during 2024:

Gifts to their son, Michael:
• Cash: $100,000 (from Robert)
• Stock (FMV): $80,000 (from Susan)
• Robert's adjusted basis in stock he gave: N/A
• Susan's adjusted basis in stock: $30,000

Gifts to their daughter, Jennifer:
• Cash: $50,000 (Robert)
• Cash: $50,000 (Susan)

Gifts to their grandson's 529 education account:
• $85,000 (from Robert, electing 5-year spread)

Gifts to charity (qualified):
• $25,000 cash (Susan)

Gift Tax Information (2024):
• Annual exclusion: $18,000 per donee
• Lifetime exemption: $13,610,000
• The Wilsons have not used any lifetime exemption previously
• They elect gift-splitting for all gifts
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Robert\'s total gifts before exclusions.',
        correctAnswer: 235000,
        tolerance: 0,
        explanation: 'Robert\'s gifts = Cash to Michael ($100,000) + Cash to Jennifer ($50,000) + 529 ($85,000) = $235,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Susan\'s total gifts before exclusions.',
        correctAnswer: 155000,
        tolerance: 0,
        explanation: 'Susan\'s gifts = Stock to Michael ($80,000) + Cash to Jennifer ($50,000) + Charity ($25,000) = $155,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'With gift-splitting, what is each spouse\'s gift to Michael (combined cash and stock)?',
        correctAnswer: 90000,
        tolerance: 0,
        explanation: 'Combined gifts to Michael = $100,000 + $80,000 = $180,000. Split = $90,000 each.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'How much of Robert\'s 529 gift is included in 2024 (with 5-year election)?',
        correctAnswer: 17000,
        tolerance: 0,
        explanation: '5-year spread: $85,000 ÷ 5 = $17,000 per year included in 2024',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate Robert\'s taxable gifts for 2024 (after exclusions, gift-splitting, and 5-year spread).',
        correctAnswer: 141000,
        tolerance: 1000,
        explanation: 'Robert\'s gifts with split = Michael ($90,000) + Jennifer ($50,000) + 529 ($17,000 for 2024) = $157,000. Exclusions = 3 donees × $18,000 = $54,000. Taxable = $157,000 - $54,000 = $103,000 (approximate - depends on exact gift-split allocation)',
      },
      {
        id: 'req-6',
        type: 'multiple_choice',
        question: 'Susan\'s $25,000 gift to charity results in what gift tax consequence?',
        options: [
          'Uses $7,000 of lifetime exemption (excess over $18,000)',
          'Fully deductible - no gift tax consequence',
          'Taxable gift of $25,000',
          'Uses annual exclusion of $18,000',
        ],
        correctAnswer: 1,
        explanation: 'Charitable gifts qualify for an unlimited gift tax deduction. Susan owes no gift tax on the $25,000 charity gift.',
      },
    ],
    hints: [
      'Gift-splitting allows spouses to treat gifts as if each made half',
      '529 contributions can be spread over 5 years for gift tax purposes',
      'Charitable gifts get an unlimited gift tax deduction',
    ],
    references: ['IRC §2503', 'IRC §2513', 'IRC §2522'],
  },
  {
    id: 'tcp-tbs-009',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Estate Tax and Portability',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Estate Tax',
    blueprintArea: 'TCP-IV',
    blueprintTopic: 'TCP-IV-B-2',
    scenario: `
Margaret Thompson died on June 15, 2024. Her husband William died in 2022 with a DSUE (Deceased Spousal Unused Exclusion) of $5,000,000 that was properly elected.

Margaret's Gross Estate:
• Personal residence: $2,500,000
• Investment portfolio: $8,000,000
• Retirement accounts (IRA): $3,500,000
• Life insurance (policy owned by Margaret): $2,000,000
• Personal property: $500,000

Deductions and Adjustments:
• Mortgage on residence: $400,000
• Funeral expenses: $50,000
• Estate administration expenses: $150,000
• Charitable bequest to university: $1,000,000
• Bequest to surviving brother: $1,000,000
• Remaining estate to children

Estate Tax Information (2024):
• Basic exclusion amount: $13,610,000
• Portability: DSUE from William: $5,000,000
• Estate tax rate (over exemption): 40%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Margaret\'s gross estate.',
        correctAnswer: 16500000,
        tolerance: 0,
        explanation: 'Gross estate = Residence ($2,500,000) + Investments ($8,000,000) + IRA ($3,500,000) + Life insurance ($2,000,000) + Personal property ($500,000) = $16,500,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total deductions (debts, expenses, charitable).',
        correctAnswer: 1600000,
        tolerance: 0,
        explanation: 'Deductions = Mortgage ($400,000) + Funeral ($50,000) + Admin ($150,000) + Charitable ($1,000,000) = $1,600,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the taxable estate.',
        correctAnswer: 14900000,
        tolerance: 0,
        explanation: 'Taxable estate = Gross estate ($16,500,000) - Deductions ($1,600,000) = $14,900,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Margaret\'s applicable exclusion amount (including DSUE portability).',
        correctAnswer: 18610000,
        tolerance: 0,
        explanation: 'Applicable exclusion = Basic exclusion ($13,610,000) + DSUE ($5,000,000) = $18,610,000',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the estate tax payable.',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'Taxable estate ($14,900,000) is less than applicable exclusion ($18,610,000). Estate tax = $0',
      },
      {
        id: 'req-6',
        type: 'multiple_choice',
        question: 'If Margaret had NOT elected portability from William\'s estate, what would be the estate tax?',
        options: [
          '$0',
          '$516,000',
          '$1,160,000',
          '$5,960,000',
        ],
        correctAnswer: 1,
        explanation: 'Without DSUE, exclusion = $13,610,000. Taxable amount = $14,900,000 - $13,610,000 = $1,290,000. Tax = $1,290,000 × 40% = $516,000',
      },
    ],
    hints: [
      'Portability allows surviving spouse to use deceased spouse\'s unused exclusion',
      'DSUE must be elected on a timely filed estate tax return (even if no tax due)',
      'Life insurance is included in estate if decedent had incidents of ownership',
    ],
    references: ['IRC §2010', 'IRC §2056', 'IRC §2001'],
  },
  {
    id: 'tcp-tbs-010',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Generation-Skipping Transfer Tax',
    difficulty: 'hard',
    timeEstimate: 15,
    topic: 'Generation-Skipping Transfer Tax',
    blueprintArea: 'TCP-IV',
    blueprintTopic: 'TCP-IV-C-1',
    scenario: `
Wealthy industrialist George Henderson (age 78) wants to transfer assets to his family. His family structure:
• Son: Thomas (age 50)
• Grandson: James (age 25) - Thomas's son
• Granddaughter: Emma (age 22) - Thomas's daughter

George's proposed transfers for 2024:
1. Direct gift to James: $500,000
2. Direct gift to Emma: $300,000
3. Trust for benefit of James (GSTT purposes): $2,000,000
4. Direct gift to Thomas: $100,000

GST Tax Information (2024):
• GST exemption: $13,610,000
• GST tax rate: 40%
• Annual exclusion: $18,000
• George has not used any GST exemption previously
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'What is the total value of generation-skipping transfers (to skip persons)?',
        correctAnswer: 2800000,
        tolerance: 0,
        explanation: 'GST transfers = Gift to James ($500,000) + Gift to Emma ($300,000) + Trust for James ($2,000,000) = $2,800,000. Thomas is not a skip person.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate taxable direct skips after annual exclusions.',
        correctAnswer: 2764000,
        tolerance: 0,
        explanation: 'Taxable = James gift ($500,000 - $18,000) + Emma gift ($300,000 - $18,000) + Trust ($2,000,000) = $482,000 + $282,000 + $2,000,000 = $2,764,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'How much GST exemption should George allocate to the transfers?',
        correctAnswer: 2764000,
        tolerance: 0,
        explanation: 'George should allocate $2,764,000 of his $13,610,000 GST exemption to avoid GST tax on these transfers.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'If George does NOT allocate GST exemption to the trust, what is the GST tax on the $2,000,000 trust?',
        correctAnswer: 800000,
        tolerance: 0,
        explanation: 'GST tax = $2,000,000 × 40% = $800,000 (if no exemption allocated)',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Which transfer is NOT a generation-skipping transfer?',
        options: [
          'Gift to James ($500,000)',
          'Gift to Emma ($300,000)',
          'Trust for James ($2,000,000)',
          'Gift to Thomas ($100,000)',
        ],
        correctAnswer: 3,
        explanation: 'Thomas is George\'s son (only one generation below). He is not a "skip person." Only transfers to grandchildren (2+ generations below) are generation-skipping.',
      },
      {
        id: 'req-6',
        type: 'calculation',
        question: 'How much GST exemption remains after allocating to these transfers?',
        correctAnswer: 10846000,
        tolerance: 0,
        explanation: 'Remaining = $13,610,000 - $2,764,000 = $10,846,000',
      },
    ],
    hints: [
      'Skip persons are generally 2+ generations below the transferor',
      'Direct skips include outright gifts and trusts for skip persons',
      'GST exemption can be allocated to avoid the 40% GST tax',
    ],
    references: ['IRC §2601', 'IRC §2611', 'IRC §2631'],
  },
];

export default TCP_TBS;
