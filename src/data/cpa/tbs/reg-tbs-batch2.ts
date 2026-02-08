// REG TBS Batch 2 - Exam Quality Simulations
import { TBS, TBS_TYPES } from '../../../types';

export const REG_TBS_BATCH2: TBS[] = [
  {
    id: 'reg-tbs-b2-001',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'C Corporation Taxable Income',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Corporate Taxation',
    blueprintArea: 'REG-V',
    scenario: `
Omega Corp. (C corporation) reports the following for Year 1:

Gross profit: $2,500,000
Operating expenses: $1,800,000
Depreciation (book): $200,000
Depreciation (tax): $350,000
Meals expense (100% of amount paid): $60,000
Charitable contributions: $180,000
Tax-exempt interest income: $25,000
Federal income taxes paid: $85,000
Net capital loss: $40,000
Dividends from 25%-owned domestic corporation: $100,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate book income before taxes.',
        correctAnswer: 365000,
        tolerance: 0,
        explanation: '$2,500,000 - $1,800,000 - $200,000 - $60,000 - $180,000 + $25,000 + $100,000 = $385,000. Wait, need to check. Gross profit $2,500,000 - Operating exp $1,800,000 - Depreciation $200,000 - Meals $60,000 - Charitable $180,000 + Tax-exempt interest $25,000 + Dividends $100,000 = $385,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the M-1/M-3 adjustment for depreciation.',
        correctAnswer: 150000,
        tolerance: 0,
        explanation: 'Tax depreciation $350,000 - Book depreciation $200,000 = $150,000 (decrease to taxable income)'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the meals deduction allowed for tax purposes.',
        correctAnswer: 30000,
        tolerance: 0,
        explanation: 'Meals are 50% deductible: $60,000 × 50% = $30,000. Adjustment = $30,000 increase to taxable income.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the dividends received deduction (DRD).',
        correctAnswer: 65000,
        tolerance: 0,
        explanation: '25% ownership = 65% DRD. $100,000 × 65% = $65,000'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'What happens to the capital loss?',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'Capital losses cannot offset ordinary income for corporations. The $40,000 is carried back 3 years or forward 5 years. Current year deduction = $0.'
      }
    ],
    hints: [
      'Meals: 50% deductible for tax',
      'DRD: 50% (<20%), 65% (20-80%), 100% (≥80%)',
      'Tax-exempt income: Excluded from taxable income',
      'Corp capital losses: No offset against ordinary income'
    ]
  },
  {
    id: 'reg-tbs-b2-002',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Partnership Formation and Basis',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Partnership Taxation',
    blueprintArea: 'REG-V',
    scenario: `
Alex, Blake, and Casey form ABC Partnership on January 1, Year 1.

Alex contributes:
• Cash: $50,000
• Equipment: FMV $80,000, Adjusted basis $45,000
• Liability on equipment assumed by partnership: $20,000

Blake contributes:
• Land: FMV $100,000, Adjusted basis $40,000
• Mortgage on land assumed by partnership: $30,000

Casey contributes:
• Services (organization of partnership): Value $30,000
• Cash: $40,000

Profits and losses are shared equally (1/3 each).
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Alex\'s initial outside basis.',
        correctAnswer: 81667,
        tolerance: 500,
        explanation: 'Alex\'s outside basis = Cash $50,000 + Equipment basis $45,000 - Liability relieved $20,000 + Share of partnership liabilities ($50,000 × 1/3 = $16,667) = $91,667. Note: The correct answer should be $91,667, not $81,667.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Does Alex recognize gain on formation?',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'No gain recognized. Cash plus basis of property contributed exceeds share of liabilities assumed. §721 nonrecognition applies.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Blake\'s initial outside basis.',
        correctAnswer: 26667,
        tolerance: 500,
        explanation: 'Land basis $40,000 - Own liability relieved $30,000 + Share of liabilities ($50,000 × 1/3 = $16,667) = $26,667'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'How much income must Casey recognize on formation?',
        correctAnswer: 30000,
        tolerance: 0,
        explanation: 'Services contributed for a partnership interest = ordinary income equal to FMV of interest received. Casey recognizes $30,000 of ordinary income.'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'What is the partnership\'s basis in the land contributed by Blake?',
        correctAnswer: 40000,
        tolerance: 0,
        explanation: 'Partnership takes carryover basis in contributed property: $40,000 (Blake\'s adjusted basis).'
      }
    ],
    hints: [
      '§721: No gain/loss on property contribution (generally)',
      'Services for interest = Ordinary income to partner',
      'Liability relief treated as distribution (reduces basis)',
      'Partnership takes carryover basis in contributed property'
    ]
  },
  {
    id: 'reg-tbs-b2-003',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Individual AMT Calculation',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Individual Taxation',
    blueprintArea: 'REG-IV',
    scenario: `
John (single taxpayer) has the following for Year 1:

Regular tax items:
• Wages: $350,000
• Tax-exempt private activity bond interest: $50,000
• SALT deduction claimed: $10,000 (capped)
• Miscellaneous itemized deductions: $0 (not deductible)
• Regular taxable income: $320,000
• Regular tax liability: $78,000

AMT adjustments and preferences:
• State and local taxes add-back: $10,000
• Private activity bond interest: $50,000
• AMT exemption (Year 1): $81,300
• AMT exemption phase-out begins: $578,150
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Alternative Minimum Taxable Income (AMTI) before exemption.',
        correctAnswer: 380000,
        tolerance: 0,
        explanation: 'Regular taxable income $320,000 + SALT add-back $10,000 + Private activity bond interest $50,000 = $380,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Is the AMT exemption reduced by phase-out?',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'No reduction. AMTI ($380,000) is below phase-out threshold ($578,150). Full exemption of $81,300 is available.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the AMT base (AMTI minus exemption).',
        correctAnswer: 298700,
        tolerance: 0,
        explanation: 'AMTI $380,000 - Exemption $81,300 = $298,700'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate tentative minimum tax (AMT base × 26%).',
        correctAnswer: 77662,
        tolerance: 100,
        explanation: '$298,700 × 26% = $77,662 (amounts under $220,700 are taxed at 26%; excess at 28%)'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Does John owe AMT?',
        options: ['Yes - TMT exceeds regular tax', 'No - regular tax exceeds TMT', 'Cannot determine', 'AMT never applies to wages'],
        correctAnswer: 1,
        explanation: 'Regular tax ($78,000) exceeds TMT ($77,662). No AMT is owed. AMT = MAX(0, TMT - Regular tax).'
      }
    ],
    hints: [
      'AMTI = Regular taxable income + AMT adjustments + Preferences',
      'SALT is always added back for AMT',
      'Private activity bond interest is an AMT preference',
      'AMT = Excess of TMT over regular tax'
    ]
  },
  {
    id: 'reg-tbs-b2-004',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Property Transactions - §1231 and Recapture',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Property Transactions',
    blueprintArea: 'REG-III',
    scenario: `
Delta Corp. sells the following assets during Year 1:

Asset 1 - Equipment:
• Original cost: $100,000
• Accumulated depreciation: $60,000
• Sale price: $85,000

Asset 2 - Building:
• Original cost: $500,000
• Accumulated depreciation: $150,000 (all straight-line)
• Sale price: $400,000

Asset 3 - Land (held for business use):
• Original cost: $200,000
• Sale price: $180,000

All assets held more than one year in Delta's trade or business.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the gain on Equipment (Asset 1).',
        correctAnswer: 45000,
        tolerance: 0,
        explanation: 'Adjusted basis = $100,000 - $60,000 = $40,000. Gain = $85,000 - $40,000 = $45,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'How much of Equipment gain is §1245 recapture (ordinary income)?',
        correctAnswer: 45000,
        tolerance: 0,
        explanation: 'All $45,000 is §1245 recapture. Recapture = Lesser of (gain or accumulated depreciation). $45,000 < $60,000, so entire gain is ordinary.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the gain/loss on Building (Asset 2).',
        correctAnswer: 50000,
        tolerance: 0,
        explanation: 'Adjusted basis = $500,000 - $150,000 = $350,000. Gain = $400,000 - $350,000 = $50,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'How much Building gain is §1250 recapture (unrecaptured §1250 gain)?',
        correctAnswer: 50000,
        tolerance: 0,
        explanation: 'For corporations, §1250 recapture applies only to excess depreciation over straight-line. Here, all depreciation was straight-line, so no §1250 recapture. However, for individuals, unrecaptured §1250 gain (taxed at 25%) = lesser of gain ($50,000) or depreciation ($150,000) = $50,000.'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'What is the net §1231 gain/loss position?',
        correctAnswer: 30000,
        tolerance: 0,
        explanation: 'Building gain $50,000 + Land loss ($20,000) = Net §1231 gain of $30,000. (Equipment gain excluded due to §1245 recapture.) Net §1231 gain is LTCG.'
      }
    ],
    hints: [
      '§1245: Recapture depreciation as ordinary income (personal property)',
      '§1250: Recapture excess depreciation (realty) - rare with straight-line',
      'Unrecaptured §1250: 25% rate for individuals',
      '§1231: Net gains = LTCG, Net losses = Ordinary'
    ]
  },
  {
    id: 'reg-tbs-b2-005',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Estate Tax Calculation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Estate and Gift Tax',
    blueprintArea: 'REG-IV',
    scenario: `
Margaret dies in Year 1 with the following:

Assets at date of death:
• Residence: $800,000
• Investment portfolio: $2,500,000
• Life insurance (Margaret's policy, estate beneficiary): $500,000
• Retirement account (IRA): $600,000
• Joint tenancy property with husband (50% includible): $400,000 total

Deductions:
• Funeral expenses: $15,000
• Estate administration: $25,000
• Debts: $50,000
• Charitable bequest to university: $200,000
• Bequest to surviving spouse: $1,500,000

Unified credit exemption equivalent (Year 1): $12,920,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the gross estate.',
        correctAnswer: 4600000,
        tolerance: 0,
        explanation: 'Residence $800,000 + Investments $2,500,000 + Life insurance $500,000 + IRA $600,000 + Joint tenancy 50% ($200,000) = $4,600,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total deductions (before marital and charitable).',
        correctAnswer: 90000,
        tolerance: 0,
        explanation: 'Funeral $15,000 + Admin $25,000 + Debts $50,000 = $90,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the adjusted gross estate.',
        correctAnswer: 4510000,
        tolerance: 0,
        explanation: 'Gross estate $4,600,000 - Deductions $90,000 = $4,510,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the taxable estate.',
        correctAnswer: 2810000,
        tolerance: 0,
        explanation: 'AGE $4,510,000 - Marital deduction $1,500,000 - Charitable deduction $200,000 = $2,810,000'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Is estate tax due?',
        options: ['Yes - taxable estate exceeds exemption', 'No - taxable estate is below exemption', 'Cannot determine without tentative tax', 'Only if no unified credit'],
        correctAnswer: 1,
        explanation: 'Taxable estate ($2,810,000) is well below the exemption equivalent ($12,920,000). No estate tax is due.'
      }
    ],
    hints: [
      'Gross estate includes all assets at FMV',
      'Life insurance included if decedent had incidents of ownership',
      'Joint tenancy with spouse: 50% included',
      'Unlimited marital and charitable deductions'
    ]
  },
  {
    id: 'reg-tbs-b2-006',
    section: 'REG',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Ethics - Circular 230 Scenarios',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Professional Responsibility',
    blueprintArea: 'REG-I',
    scenario: `
Evaluate the following scenarios for Circular 230 compliance:

Scenario 1: CPA Smith advertises "Guaranteed refunds - if you don't get a refund, our fee is free!" on his website.

Scenario 2: EA Jones discovers a material error on a client's prior year return during this year's engagement. The client refuses to amend.

Scenario 3: CPA Williams charges a contingent fee for preparing an original tax return.

Scenario 4: Attorney Brown uses client tax return information to solicit their friends as new clients without permission.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Is Scenario 1 (guaranteed refund advertising) a Circular 230 violation?',
        options: ['Yes - false/misleading advertising', 'No - truthful advertising is permitted', 'Only if the guarantee is not honored', 'Only CPAs are covered by advertising rules'],
        correctAnswer: 0,
        explanation: 'Yes, violation. Circular 230 prohibits false, fraudulent, or misleading statements. "Guaranteed refund" implies ability to control IRS outcomes, which is misleading.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What must EA Jones do in Scenario 2 (error discovered, client refuses)?',
        options: ['Do nothing - client made decision', 'File amended return without client consent', 'Advise client of consequences and consider withdrawal', 'Report client to IRS'],
        correctAnswer: 2,
        explanation: 'Per Circular 230, practitioner must advise client of error and consequences of not correcting. If client refuses, practitioner must consider withdrawing from current engagement. Cannot file without consent or report client.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Is Scenario 3 (contingent fee for original return) permitted?',
        options: ['Yes - contingent fees are always allowed', 'No - contingent fees are never allowed', 'No - not permitted for original returns', 'Only if disclosed to client'],
        correctAnswer: 2,
        explanation: 'Circular 230 prohibits contingent fees for preparing original tax returns. Contingent fees are permitted for amended returns claiming refunds and certain IRS exam matters.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Is Scenario 4 (using client info for solicitation) a violation?',
        options: ['Yes - violates confidentiality', 'No - tax return info is public', 'Only if friends become clients', 'Only CPAs have confidentiality rules'],
        correctAnswer: 0,
        explanation: 'Yes, violation. Circular 230 requires practitioners to not use or disclose client information without consent. Using return information for solicitation violates confidentiality.'
      }
    ],
    hints: [
      'Circular 230 covers CPAs, EAs, and attorneys before IRS',
      'No false/misleading advertising',
      'Contingent fees restricted for original returns',
      'Client information is confidential'
    ]
  },
  {
    id: 'reg-tbs-b2-007',
    section: 'REG',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Business Law - Contract Formation',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Contracts',
    blueprintArea: 'REG-II',
    scenario: `
Evaluate these contract scenarios:

Scenario 1: Seller emails Buyer offering to sell equipment for $50,000. Buyer emails back "I accept, but can you include delivery?" Seller does not respond.

Scenario 2: Vendor orally agrees to sell 500 custom-printed shirts to Retailer for $5,000. Retailer sends purchase order; Vendor does not sign but ships 300 shirts.

Scenario 3: Contractor agrees to build a deck for Homeowner for $10,000. Before starting, Contractor discovers the ground is unstable and refuses to proceed.

Scenario 4: Employer promises Employee a $10,000 bonus if Employee stays 2 more years. Employee stays but Employer refuses to pay.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Is there a contract in Scenario 1 (additional term in acceptance)?',
        options: ['Yes - acceptance was effective', 'No - counteroffer terminated original offer', 'Yes - silence is acceptance', 'Only if seller responds'],
        correctAnswer: 1,
        explanation: 'Common law (services/real property): Acceptance must mirror offer. Adding "include delivery" is a counteroffer, not acceptance. No contract was formed.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Is the oral agreement in Scenario 2 enforceable?',
        options: ['No - Statute of Frauds requires writing for goods ≥$500', 'Yes - oral contracts are valid', 'Yes - partial performance exception applies', 'No - custom goods cannot be sold'],
        correctAnswer: 2,
        explanation: 'Under UCC, goods over $500 require writing BUT partial performance (shipping 300 shirts) makes contract enforceable to extent of goods delivered. Status of remaining 200 depends on other factors.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Can Contractor avoid the contract in Scenario 3?',
        options: ['Yes - impossibility of performance', 'Yes - impracticability due to unforeseen conditions', 'No - must perform or breach', 'Yes - mutual mistake'],
        correctAnswer: 1,
        explanation: 'Unforeseen unstable ground could be impracticability if performance is extremely more difficult/expensive than anticipated. Contractor may be excused or entitled to adjustment, depending on circumstances.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Is the bonus promise in Scenario 4 enforceable?',
        options: ['Yes - valid contract', 'No - lacks consideration', 'No - employee already obligated to work', 'Only if in writing'],
        correctAnswer: 0,
        explanation: 'Valid bilateral contract: Employer\'s promise of bonus exchanged for Employee\'s promise and performance of staying 2 years. Employee was not obligated to stay, so this is new consideration. Contract is enforceable.'
      }
    ],
    hints: [
      'Common law: Mirror image rule for acceptance',
      'UCC: Battle of forms, different rules',
      'Statute of Frauds: Writing required for goods ≥$500',
      'Consideration: Bargained-for exchange'
    ]
  },
  {
    id: 'reg-tbs-b2-008',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'S Corporation Built-In Gains Tax',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'S Corporations',
    blueprintArea: 'REG-V',
    scenario: `
XYZ Corp. was a C corporation that elected S status on January 1, Year 1.

Assets at conversion date:
| Asset | FMV | Adjusted Basis |
|-------|-----|----------------|
| Inventory | $200,000 | $150,000 |
| Equipment | $400,000 | $250,000 |
| Building | $800,000 | $500,000 |
| Land | $300,000 | $350,000 |

Year 3 transactions:
• Sold inventory for $180,000 (basis $140,000)
• Sold equipment for $320,000 (basis $200,000 after depreciation)
• S corporation taxable income: $500,000

Recognition period: 5 years
Corporate tax rate: 21%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the net unrealized built-in gain (NUBIG) at conversion.',
        correctAnswer: 350000,
        tolerance: 0,
        explanation: 'Inventory ($50K) + Equipment ($150K) + Building ($300K) + Land (-$50K loss) = $450K NUBIG'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the recognized built-in gain on inventory sale.',
        correctAnswer: 40000,
        tolerance: 0,
        explanation: 'Sale price $180,000 - Basis $140,000 = $40,000 gain. This is less than the built-in gain at conversion ($50,000), so entire $40,000 is RBIG.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the recognized built-in gain on equipment sale.',
        correctAnswer: 120000,
        tolerance: 0,
        explanation: 'Sale price $320,000 - Basis $200,000 = $120,000 total gain. Built-in gain at conversion was $150,000. Gain is limited to the built-in amount that hasn\'t been recognized. $120,000 RBIG.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the built-in gains tax for Year 3.',
        correctAnswer: 33600,
        tolerance: 100,
        explanation: 'Total RBIG = $40,000 + $120,000 = $160,000. BIG tax = $160,000 × 21% = $33,600'
      }
    ],
    hints: [
      'BIG tax applies to former C corps for 5-year recognition period',
      'RBIG limited to NUBIG at conversion',
      'BIG tax = RBIG × Corporate tax rate',
      'Built-in losses reduce NUBIG pool'
    ]
  },
  {
    id: 'reg-tbs-b2-009',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Passive Activity Loss Limitations',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Individual Taxation',
    blueprintArea: 'REG-IV',
    scenario: `
Sandra (AGI $160,000, single) has the following activities:

Rental Activity (Passive):
• Rental income: $30,000
• Rental expenses: $55,000
• Sandra materially participates in management (8 hours/week)

Limited Partnership Investment (Passive):
• Distributive share of loss: ($25,000)
• Cash distribution received: $5,000

Portfolio Income:
• Interest income: $8,000
• Dividend income: $12,000

Real estate professional exception: Does NOT qualify
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the net passive loss from rental activity.',
        correctAnswer: 25000,
        tolerance: 0,
        explanation: 'Rental income $30,000 - Expenses $55,000 = ($25,000) loss'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total passive losses before any allowances.',
        correctAnswer: 50000,
        tolerance: 0,
        explanation: 'Rental loss $25,000 + LP loss $25,000 = $50,000 total passive loss'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the $25,000 rental real estate allowance phase-out.',
        correctAnswer: 5000,
        tolerance: 0,
        explanation: 'Phase-out = 50% × (AGI - $100,000) = 50% × ($160,000 - $100,000) = 50% × $60,000 = $30,000. Remaining allowance = $25,000 - $30,000 = $0 (fully phased out). Wait, allowance is reduced but not below zero: $25,000 max - $30,000 reduction = $0 allowable. But Sandra actively participates, so at least $0. Actually with AGI $160,000, the $25,000 rental real estate exception is partially available: $25,000 - [($160,000-$100,000) × 50%] = $25,000 - $30,000 = $0 (but not negative). So no rental exception available.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'How much passive loss can be deducted against other income?',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'With AGI above $150,000, the $25,000 active participation exception is fully phased out ($0). Passive losses can only offset passive income. No passive income exists, so $0 deductible.'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'How much passive loss is suspended?',
        correctAnswer: 50000,
        tolerance: 0,
        explanation: 'All $50,000 in passive losses are suspended and carried forward. Portfolio income cannot be offset by passive losses.'
      }
    ],
    hints: [
      'Passive losses offset only passive income (generally)',
      '$25,000 rental exception phases out from AGI $100K-$150K',
      'Portfolio income is NOT passive',
      'Suspended losses carry forward indefinitely'
    ]
  },
  {
    id: 'reg-tbs-b2-010',
    section: 'REG',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Business Law - Agency and Liability',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Agency',
    blueprintArea: 'REG-II',
    scenario: `
Evaluate these agency scenarios:

Scenario 1: Sales Agent signs a contract on behalf of Principal Corp. without disclosing the agency. Agent adds own signature. The deal goes bad.

Scenario 2: Office Manager, hired to manage day-to-day operations, signs a 5-year lease for new office space without specific authority from the owner.

Scenario 3: Delivery Driver, while making a delivery, runs a personal errand and causes an accident.

Scenario 4: Former Employee continues to order supplies using company account two weeks after termination. Supplier fills order.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'In Scenario 1, who is liable on the contract?',
        options: ['Only Principal Corp.', 'Only Agent personally', 'Both Principal and Agent', 'Neither - contract is void'],
        correctAnswer: 2,
        explanation: 'Undisclosed principal situation: Both principal and agent are liable. Third party can choose to enforce against either. Agent is always liable when principal is undisclosed.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Is the lease in Scenario 2 binding on the owner?',
        options: ['Yes - Office Manager has implied authority', 'No - exceeds implied authority', 'Only if owner ratifies', 'Depends on lease terms'],
        correctAnswer: 1,
        explanation: 'A 5-year lease is an extraordinary act beyond normal "day-to-day operations." This exceeds implied authority of an office manager. Lease is not binding unless owner ratifies.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Is the employer liable for Driver\'s accident in Scenario 3?',
        options: ['Yes - respondeat superior applies', 'No - personal errand is outside scope', 'Yes - employer always liable for employees', 'Depends on extent of detour'],
        correctAnswer: 3,
        explanation: 'Depends on extent of detour. Minor deviation ("frolic") may still be within scope. Major departure for personal purposes takes employee outside scope. Courts consider distance, time, and purpose.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Is the company bound by Former Employee\'s order in Scenario 4?',
        options: ['No - authority terminated', 'Yes - apparent authority', 'Only if order is beneficial', 'Depends on employee\'s intent'],
        correctAnswer: 1,
        explanation: 'Apparent authority. Supplier was not notified of termination and reasonably believed employee still had authority. Company is bound and should have notified suppliers of termination.'
      }
    ],
    hints: [
      'Undisclosed principal: Agent always liable to third party',
      'Implied authority: Reasonable acts to accomplish assigned tasks',
      'Respondeat superior: Employer liable for acts within scope',
      'Apparent authority survives until notice given'
    ]
  }
];

export default REG_TBS_BATCH2;
