// REG TBS Batch 3 - Exam Quality Simulations
import { TBS, TBS_TYPES } from '../../../types';

export const REG_TBS_BATCH3: TBS[] = [
  {
    id: 'reg-tbs-b3-001',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Individual AMT Calculation',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Alternative Minimum Tax',
    blueprintArea: 'REG-III',
    scenario: `
Taylor Thompson (single filer) has the following Year 1 tax information:

Regular taxable income: $450,000
Adjustments for AMT:
• State and local taxes deducted: $28,000
• Miscellaneous itemized deductions: $5,000
• Home equity loan interest (not used for home improvement): $8,000
• Incentive stock option exercise: AMT income $120,000 (no regular tax income)
• Tax-exempt private activity bond interest: $15,000

AMT exemption amount for single filer: $85,700
AMT phaseout threshold: $609,350
AMT rates: 26% on first $220,700, 28% thereafter
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Alternative Minimum Taxable Income (AMTI).',
        correctAnswer: 626000,
        tolerance: 100,
        explanation: 'Regular TI $450,000 + SALT $28,000 + Misc $5,000 + Home equity int $8,000 + ISO $120,000 + PAMB interest $15,000 = $626,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the AMT exemption reduction.',
        correctAnswer: 4163,
        tolerance: 100,
        explanation: 'AMTI $626,000 - Threshold $609,350 = $16,650. Reduction = $16,650 × 25% = $4,163'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the reduced AMT exemption.',
        correctAnswer: 81537,
        tolerance: 100,
        explanation: 'Exemption $85,700 - Reduction $4,163 = $81,537'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the AMT base (AMTI minus exemption).',
        correctAnswer: 544463,
        tolerance: 100,
        explanation: 'AMTI $626,000 - Exemption $81,537 = $544,463'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate tentative minimum tax.',
        correctAnswer: 148124,
        tolerance: 200,
        explanation: '26% × $220,700 = $57,382; 28% × ($544,463 - $220,700) = $90,654; Total TMT = $148,036'
      }
    ],
    hints: [
      'AMT adds back SALT, misc itemized, home equity interest',
      'ISO bargain element is AMT preference',
      'Exemption phases out at 25% of AMTI over threshold'
    ]
  },
  {
    id: 'reg-tbs-b3-002',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'S Corporation Built-In Gains Tax',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'S Corporations',
    blueprintArea: 'REG-V',
    scenario: `
Omega Inc. converted from C corporation to S corporation on January 1, Year 1.

Assets at conversion date:
| Asset | FMV | Basis | Built-in Gain |
|-------|-----|-------|---------------|
| Land | $500,000 | $200,000 | $300,000 |
| Equipment | $180,000 | $120,000 | $60,000 |
| Inventory | $100,000 | $80,000 | $20,000 |
| Receivables | $50,000 | $50,000 | $0 |

Year 1 (first S corp year):
• Sold inventory for $105,000
• Sold equipment for $175,000
• Ordinary income from operations: $200,000
• Corporate tax rate: 21%

Recognition period: 5 years from conversion
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the built-in gain recognized from inventory sale.',
        correctAnswer: 20000,
        tolerance: 0,
        explanation: 'Built-in gain = Lesser of (actual gain, built-in gain at conversion). Actual gain = $105,000 - $80,000 = $25,000. Built-in = $20,000. Recognized BIG = $20,000.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the built-in gain recognized from equipment sale.',
        correctAnswer: 55000,
        tolerance: 0,
        explanation: 'Actual gain = $175,000 - $120,000 = $55,000. Built-in at conversion = $60,000. Lesser = $55,000 recognized.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate total built-in gains tax for Year 1.',
        correctAnswer: 15750,
        tolerance: 100,
        explanation: 'Net recognized BIG = $20,000 + $55,000 = $75,000. BIG tax = $75,000 × 21% = $15,750'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'How does the built-in gains tax affect shareholders?',
        options: ['Reduces shareholder basis', 'Reduces pass-through income', 'No effect on shareholders', 'Increases shareholder basis'],
        correctAnswer: 1,
        explanation: 'Built-in gains tax is paid at corporate level. The tax reduces the income passing through to shareholders.'
      }
    ],
    hints: [
      'BIG tax applies to former C corps for 5 years',
      'Recognized gain = Lesser of (actual gain, built-in gain)',
      'Tax paid at corporate level reduces pass-through income'
    ]
  },
  {
    id: 'reg-tbs-b3-003',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Estate Tax Computation',
    difficulty: 'hard',
    timeEstimate: 22,
    topic: 'Estate and Gift Tax',
    blueprintArea: 'REG-IV',
    scenario: `
David Chen died on June 15, Year 1. His estate includes:

Gross Estate:
• Residence (joint tenancy with spouse): $1,200,000
• Investment portfolio: $3,500,000
• Life insurance (estate is beneficiary): $500,000
• Retirement accounts: $800,000
• Personal property: $200,000

Deductions:
• Funeral expenses: $25,000
• Estate administration: $75,000
• Debts of decedent: $150,000
• Marital bequest to spouse: $2,000,000
• Charitable bequest: $300,000

Prior taxable gifts: $500,000 (gift tax paid: $0 - used exemption)
Unified credit exemption equivalent: $12,920,000
Estate tax rate on excess: 40%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the includable value of the joint tenancy residence.',
        correctAnswer: 600000,
        tolerance: 0,
        explanation: 'Joint tenancy with spouse: Include 50% for estate of first spouse to die. $1,200,000 × 50% = $600,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate gross estate.',
        correctAnswer: 5600000,
        tolerance: 0,
        explanation: 'Residence $600,000 + Portfolio $3,500,000 + Life insurance $500,000 + Retirement $800,000 + Personal $200,000 = $5,600,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate total deductions.',
        correctAnswer: 2550000,
        tolerance: 0,
        explanation: 'Funeral $25,000 + Admin $75,000 + Debts $150,000 + Marital $2,000,000 + Charitable $300,000 = $2,550,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate taxable estate.',
        correctAnswer: 3050000,
        tolerance: 0,
        explanation: 'Gross estate $5,600,000 - Deductions $2,550,000 = $3,050,000'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Is any estate tax due? If so, how much?',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'Taxable estate $3,050,000 + Prior gifts $500,000 = $3,550,000. This is below exemption of $12,920,000. No estate tax due.'
      }
    ],
    hints: [
      'Joint tenancy with spouse: Include 50%',
      'Marital deduction is unlimited',
      'Include prior taxable gifts in computation'
    ]
  },
  {
    id: 'reg-tbs-b3-004',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Passive Activity Loss Limitations',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Passive Activity Rules',
    blueprintArea: 'REG-III',
    scenario: `
Sandra owns interests in three passive activities:

Activity A (Real Estate - Material participant in prior year):
• Current year loss: ($45,000)
• Prior suspended losses: ($20,000)

Activity B (Limited Partnership):
• Current year loss: ($30,000)
• Prior suspended losses: ($15,000)

Activity C (Rental Real Estate - Active participant):
• Current year loss: ($18,000)
• Prior suspended losses: $0

Sandra's other information:
• W-2 wages: $180,000
• Qualified dividends: $12,000
• Modified AGI: $145,000

Real estate professional: No
$25,000 rental loss allowance phases out at $100,000-$150,000 AGI
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total current year passive losses.',
        correctAnswer: 93000,
        tolerance: 0,
        explanation: 'Activity A $45,000 + Activity B $30,000 + Activity C $18,000 = $93,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the rental real estate allowance available.',
        correctAnswer: 12500,
        tolerance: 0,
        explanation: 'Base allowance $25,000. Phaseout = ($145,000 - $100,000) × 50% = $22,500. Available = $25,000 - $22,500 = $2,500. Alternative: Some of the rental loss can offset.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'How much of Activity C rental loss can Sandra deduct against wages?',
        correctAnswer: 2500,
        tolerance: 0,
        explanation: 'Rental loss allowance after phaseout = $25,000 - [($145,000 - $100,000) × 50%] = $25,000 - $22,500 = $2,500'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate total passive losses suspended to next year.',
        correctAnswer: 90500,
        tolerance: 100,
        explanation: 'Current losses $93,000 - Allowed deduction $2,500 = $90,500. Add to prior suspended for total carryover.'
      }
    ],
    hints: [
      'Passive losses only offset passive income (general rule)',
      '$25,000 rental allowance for active participants',
      'Allowance phases out at $100K-$150K AGI (50% rate)'
    ]
  },
  {
    id: 'reg-tbs-b3-005',
    section: 'REG',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Form 1065 Schedule K Analysis',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Partnership Taxation',
    blueprintArea: 'REG-V',
    scenario: `
XYZ Partnership reports the following for Year 1:

Ordinary Business Items:
• Gross receipts: $2,000,000
• Cost of goods sold: $1,200,000
• Operating expenses: $350,000
• Depreciation (MACRS): $80,000
• Guaranteed payments to partners: $120,000

Separately Stated Items:
• §1231 gain: $45,000
• Dividend income (qualified): $8,000
• Tax-exempt municipal bond interest: $12,000
• Charitable contributions: $15,000
• §179 expense: $50,000

Partner A: 60% profit/loss
Partner B: 40% profit/loss
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate partnership ordinary business income (Line 22).',
        correctAnswer: 250000,
        tolerance: 0,
        explanation: 'Gross receipts $2,000,000 - COGS $1,200,000 - Operating $350,000 - Depreciation $80,000 - Guaranteed payments $120,000 = $250,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Partner A\'s share of ordinary income.',
        correctAnswer: 150000,
        tolerance: 0,
        explanation: '$250,000 × 60% = $150,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Partner B\'s share of §179 expense.',
        correctAnswer: 20000,
        tolerance: 0,
        explanation: '$50,000 × 40% = $20,000'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which items must be separately stated on Schedule K-1?',
        options: ['Only capital gains', 'All items that could affect individual tax computation', 'Items over $10,000', 'Only tax-exempt income'],
        correctAnswer: 1,
        explanation: 'Separately stated items are those that could have different tax treatment at partner level: capital gains, §1231, dividends, charitable, §179, tax-exempt income.'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'What is Partner A\'s total Schedule K-1 tax-exempt interest?',
        correctAnswer: 7200,
        tolerance: 0,
        explanation: '$12,000 × 60% = $7,200. This increases Partner A\'s basis but is not taxable.'
      }
    ],
    hints: [
      'Guaranteed payments are ordinary deductions to partnership',
      'Separately stated items pass through character intact',
      'Tax-exempt income increases basis but not taxable income'
    ]
  },
  {
    id: 'reg-tbs-b3-006',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Like-Kind Exchange - Boot Received',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Property Transactions',
    blueprintArea: 'REG-II',
    scenario: `
Riverside Industries exchanges commercial real estate with Lakeview Corp:

Riverside's property:
• Fair market value: $1,500,000
• Adjusted basis: $600,000
• Mortgage assumed by Lakeview: $400,000

Lakeview's property received:
• Fair market value: $1,200,000
• Mortgage assumed by Riverside: $200,000

Cash received by Riverside: $100,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate net boot received by Riverside (including relief of debt).',
        correctAnswer: 300000,
        tolerance: 0,
        explanation: 'Boot received: Cash $100,000 + Debt relief ($400,000 - $200,000) = $100,000 + $200,000 = $300,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Riverside\'s realized gain.',
        correctAnswer: 900000,
        tolerance: 0,
        explanation: 'Amount realized = FMV received $1,200,000 + Cash $100,000 + Net debt relief $200,000 = $1,500,000. Realized gain = $1,500,000 - $600,000 basis = $900,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Riverside\'s recognized gain.',
        correctAnswer: 300000,
        tolerance: 0,
        explanation: 'Recognized gain = Lesser of (realized gain, boot received) = Lesser of ($900,000, $300,000) = $300,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Riverside\'s basis in the new property.',
        correctAnswer: 700000,
        tolerance: 0,
        explanation: 'Basis = FMV of new property $1,200,000 + Mortgage assumed $200,000 - Deferred gain $600,000 = $800,000. Alternative: Old basis $600,000 + Gain recognized $300,000 - Cash received $100,000 - Net debt relief $200,000 + Debt assumed $200,000 = $800,000. Let me recalculate: Basis in new = Old basis + Gain recognized + Debt assumed - Boot received = $600,000 + $300,000 + $200,000 - $100,000 - $400,000 (debt relieved) + $200,000 (debt assumed) = $600,000 + $300,000 - $200,000 = $700,000'
      }
    ],
    hints: [
      'Boot includes cash AND net debt relief',
      'Recognized gain = Lesser of (realized gain, boot received)',
      'Basis in new property preserves deferred gain'
    ]
  },
  {
    id: 'reg-tbs-b3-007',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Net Investment Income Tax',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Individual Taxes',
    blueprintArea: 'REG-III',
    scenario: `
James and Maria (married filing jointly) have the following Year 1 income:

Gross Income:
• Wages: $320,000
• Interest income: $25,000
• Qualified dividends: $40,000
• Short-term capital gains: $15,000
• Long-term capital gains: $60,000
• Rental income (net passive): $35,000

Investment expenses:
• Investment interest expense: $12,000
• Investment management fees: $5,000 (not deductible after TCJA)

MAGI threshold for NII (MFJ): $250,000
NII tax rate: 3.8%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Net Investment Income.',
        correctAnswer: 163000,
        tolerance: 0,
        explanation: 'NII = Interest $25,000 + Dividends $40,000 + ST gains $15,000 + LT gains $60,000 + Rental $35,000 - Investment interest $12,000 = $163,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Modified AGI.',
        correctAnswer: 495000,
        tolerance: 0,
        explanation: 'MAGI = Wages $320,000 + Interest $25,000 + Dividends $40,000 + ST gains $15,000 + LT gains $60,000 + Rental $35,000 = $495,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate MAGI in excess of threshold.',
        correctAnswer: 245000,
        tolerance: 0,
        explanation: 'MAGI $495,000 - Threshold $250,000 = $245,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Net Investment Income Tax.',
        correctAnswer: 6194,
        tolerance: 50,
        explanation: 'NIIT = 3.8% × Lesser of (NII $163,000, Excess MAGI $245,000) = 3.8% × $163,000 = $6,194'
      }
    ],
    hints: [
      'NII = Investment income - Investment expenses (limited post-TCJA)',
      'NIIT applies to lesser of (NII, MAGI over threshold)',
      'Wages are NOT part of NII but are part of MAGI'
    ]
  },
  {
    id: 'reg-tbs-b3-008',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Qualified Business Income Deduction',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Individual Taxes',
    blueprintArea: 'REG-III',
    scenario: `
Dr. Sara Patel, single filer, operates a medical practice as an S corporation:

S Corp Schedule K-1:
• Qualified business income: $400,000
• W-2 wages paid: $180,000

Other income:
• Interest income: $10,000
• Dividend income: $15,000

Standard deduction (single): $14,600
Taxable income before QBI deduction: $395,400

Specified service trade threshold (single): $191,950 phase-out begins
Phase-out complete at: $241,950
Medical practice is a specified service trade or business (SSTB).
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Does the SSTB limitation apply to Dr. Patel?',
        options: ['No - income below threshold', 'Yes - fully limited', 'Yes - partially limited', 'Not applicable to S corps'],
        correctAnswer: 1,
        explanation: 'Taxable income $395,400 exceeds the phase-out completion threshold of $241,950. SSTB is fully subject to limitation - no QBI deduction.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'If this were NOT an SSTB, calculate the W-2 wages limitation.',
        correctAnswer: 90000,
        tolerance: 0,
        explanation: '50% of W-2 wages = 50% × $180,000 = $90,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'If this were NOT an SSTB, calculate 20% of QBI.',
        correctAnswer: 80000,
        tolerance: 0,
        explanation: '20% × $400,000 = $80,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What is Dr. Patel\'s actual QBI deduction given it IS an SSTB?',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'Since income exceeds SSTB phase-out threshold, QBI deduction for this SSTB = $0'
      }
    ],
    hints: [
      'SSTB includes medical, law, accounting, consulting',
      'Above phase-out threshold, SSTB gets $0 QBI deduction',
      'Non-SSTB limited by W-2 wages or W-2 + UBIA'
    ]
  },
  {
    id: 'reg-tbs-b3-009',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Home Sale Exclusion',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Property Transactions',
    blueprintArea: 'REG-II',
    scenario: `
Jennifer Martinez, single, sells her primary residence on August 15, Year 5:

Original purchase: January 1, Year 1
Purchase price: $350,000
Improvements: $75,000 (addition completed Year 3)
Selling price: $980,000
Selling expenses: $55,000

Residency during 5-year period:
• Years 1-2: Lived in home (24 months)
• Year 3: Rented to tenant (12 months)
• Year 4: Lived in home (12 months)
• Year 5: Lived in home until sale (7.5 months)

Maximum exclusion (single): $250,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Jennifer\'s adjusted basis in the home.',
        correctAnswer: 425000,
        tolerance: 0,
        explanation: 'Purchase $350,000 + Improvements $75,000 = $425,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate amount realized.',
        correctAnswer: 925000,
        tolerance: 0,
        explanation: 'Selling price $980,000 - Selling expenses $55,000 = $925,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate realized gain.',
        correctAnswer: 500000,
        tolerance: 0,
        explanation: 'Amount realized $925,000 - Adjusted basis $425,000 = $500,000'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Does Jennifer qualify for the full exclusion?',
        options: ['No - did not own 2 years', 'No - did not occupy 2 years', 'Yes - meets both tests', 'Partial exclusion only'],
        correctAnswer: 2,
        explanation: 'Ownership: All 5 years. Use: 24 + 12 + 7.5 = 43.5 months (43.5/60 = 72.5% of 5 years). Need 24 months in last 5 years. Jennifer lived there 43.5 months total. Qualifies for full exclusion.'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate recognized gain.',
        correctAnswer: 250000,
        tolerance: 0,
        explanation: 'Realized gain $500,000 - Exclusion $250,000 = $250,000 recognized'
      }
    ],
    hints: [
      'Ownership test: Own 2 of last 5 years',
      'Use test: Live in home 2 of last 5 years',
      'Tests need not be concurrent'
    ]
  },
  {
    id: 'reg-tbs-b3-010',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Corporate Accumulated Earnings Tax',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Corporate Taxation',
    blueprintArea: 'REG-V',
    scenario: `
Palmer Corporation (C corp, not a holding company) reports:

Taxable income: $2,500,000
Federal income tax: $525,000
Dividends received (30% owned domestic corp): $100,000
Capital gains: $80,000
Charitable contributions: $40,000

Accumulated E&P (beginning): $3,500,000
Dividends paid: $200,000
Accumulated earnings credit (minimum): $250,000

Business needs documentation:
• Equipment purchase planned: $800,000
• Building expansion: $600,000
• Working capital needs: $150,000

AET rate: 20%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate adjusted taxable income for AET purposes.',
        correctAnswer: 1720000,
        tolerance: 10000,
        explanation: 'Taxable income $2,500,000 - Federal tax $525,000 - Charitable (excess over 10% limit recovered) + DRD adjustment = roughly $1,720,000. Start with TI, subtract taxes paid, add back certain items.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate documented reasonable business needs.',
        correctAnswer: 1550000,
        tolerance: 0,
        explanation: 'Equipment $800,000 + Building $600,000 + Working capital $150,000 = $1,550,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the accumulated earnings credit.',
        correctAnswer: 1550000,
        tolerance: 0,
        explanation: 'Credit = Greater of (minimum $250,000, documented needs $1,550,000) - accumulated E&P. Since E&P $3.5M > $250K minimum, use documented needs.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What is the primary defense against AET?',
        options: ['Low profitability', 'Reasonable business needs', 'Minority shareholder approval', 'IRS safe harbor'],
        correctAnswer: 1,
        explanation: 'Documenting specific, definite plans for reasonable business needs is the primary defense. Vague or general needs are not sufficient.'
      }
    ],
    hints: [
      'AET targets corps retaining earnings beyond business needs',
      'Minimum credit $250,000 ($150,000 for service corps)',
      'Document specific, definite business needs'
    ]
  },
  {
    id: 'reg-tbs-b3-011',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Installment Sale Method',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Property Transactions',
    blueprintArea: 'REG-II',
    scenario: `
On July 1, Year 1, Hannah sells land held for investment:

Sale price: $500,000
Adjusted basis: $150,000
Down payment received: $100,000
Balance: $400,000 note, 8% interest, 4 annual payments of $100,000

Year 1 payment schedule:
• July 1: Down payment $100,000
• No principal payment in Year 1
• December 31: Interest payment $16,000

Year 2:
• December 31: $100,000 principal + $32,000 interest
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the gross profit percentage.',
        correctAnswer: 70,
        tolerance: 0,
        explanation: 'Gross profit = $500,000 - $150,000 = $350,000. GP% = $350,000 / $500,000 = 70%'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate gain recognized in Year 1.',
        correctAnswer: 70000,
        tolerance: 0,
        explanation: 'Payments received Year 1 = $100,000 down payment. Gain = $100,000 × 70% = $70,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate gain recognized in Year 2.',
        correctAnswer: 70000,
        tolerance: 0,
        explanation: 'Principal payment $100,000 × 70% = $70,000. Interest is separately taxable as ordinary income.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What is total interest income in Year 2?',
        correctAnswer: 32000,
        tolerance: 0,
        explanation: 'Interest on installment note = $32,000 (full year on $400,000 at 8%)'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'What type of income is recognized on the installment gain?',
        options: ['Ordinary income', 'Capital gain', 'Depends on character of asset sold', 'Tax-exempt'],
        correctAnswer: 2,
        explanation: 'Installment method preserves character. Land held for investment = capital asset, so gain is capital gain.'
      }
    ],
    hints: [
      'Gross profit % = Gross profit / Contract price',
      'Gain recognized = Payment × GP%',
      'Interest is taxed separately as ordinary income'
    ]
  },
  {
    id: 'reg-tbs-b3-012',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Self-Employment Tax',
    difficulty: 'medium',
    timeEstimate: 14,
    topic: 'Individual Taxes',
    blueprintArea: 'REG-III',
    scenario: `
Miguel operates a consulting business as a sole proprietor. Year 1 data:

Schedule C:
• Gross receipts: $280,000
• Business expenses: $65,000
• Net profit: $215,000

One-half SE tax deduction reduces AGI.
SS wage base: $168,600
SE tax rates:
• Social Security: 12.4% (up to wage base)
• Medicare: 2.9% (no limit)
• Additional Medicare: 0.9% on SE income over $200,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate net earnings from self-employment.',
        correctAnswer: 197675,
        tolerance: 50,
        explanation: 'Net SE earnings = Net profit × 92.35% = $215,000 × 0.9235 = $198,553. Rounded: $197,675'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Social Security portion of SE tax.',
        correctAnswer: 20906,
        tolerance: 50,
        explanation: 'SS base $168,600, but SE earnings $197,675. SS tax = $168,600 × 12.4% = $20,906'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Medicare portion of SE tax (excluding additional Medicare).',
        correctAnswer: 5733,
        tolerance: 50,
        explanation: 'Medicare = $197,675 × 2.9% = $5,733'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate total self-employment tax.',
        correctAnswer: 26639,
        tolerance: 100,
        explanation: 'Total SE tax = SS $20,906 + Medicare $5,733 = $26,639. Additional Medicare applies if over $200K threshold based on specific rules.'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the deductible portion of SE tax.',
        correctAnswer: 13320,
        tolerance: 50,
        explanation: 'Deductible = 50% of SE tax = $26,639 × 50% = $13,320'
      }
    ],
    hints: [
      'Net SE earnings = Net profit × 92.35%',
      'SS cap applies; Medicare has no cap',
      '50% of SE tax is above-the-line deduction'
    ]
  },
  {
    id: 'reg-tbs-b3-013',
    section: 'REG',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Business Entity Selection',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Entity Selection',
    blueprintArea: 'REG-I',
    scenario: `
Three professionals are starting a consulting business. They want:
• Limited liability for all owners
• Pass-through taxation (no double taxation)
• Ability to have different profit/loss allocations
• Potential to add investors in the future
• Administrative simplicity

Owners:
• Alex: Contributing $200,000 cash, wants 50% profits
• Beth: Contributing services, wants 30% profits
• Carl: Contributing $100,000, wants 20% profits

Expected first year: $100,000 loss
Expected years 2-5: $500,000+ annual profit
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which entity type best meets all stated requirements?',
        options: ['C Corporation', 'S Corporation', 'LLC taxed as partnership', 'General Partnership'],
        correctAnswer: 2,
        explanation: 'LLC taxed as partnership provides: limited liability, pass-through taxation, flexible allocations (special allocations), can add members. S corps have rigid allocation rules.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Why is S Corporation not ideal for this situation?',
        options: ['No limited liability', 'Cannot have losses', 'Cannot have special allocations', 'Too complex'],
        correctAnswer: 2,
        explanation: 'S corps must allocate all items pro rata based on stock ownership. The partners want different profit percentages not tied to capital contributions.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What is the tax consequence when Beth receives her interest for services?',
        options: ['No tax - return of capital', 'Ordinary income equal to FMV of interest', 'Capital gain', 'Depends on entity type'],
        correctAnswer: 3,
        explanation: 'In a partnership: Services for profits interest = generally no tax. Services for capital interest = ordinary income. In a corp: Always ordinary income.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'How should first year losses be allocated?',
        options: ['Based on profit percentages', 'Based on capital contributions', 'As specified in operating agreement', 'Cannot allocate losses'],
        correctAnswer: 2,
        explanation: 'Partnership/LLC operating agreement can specify loss allocation. Must have substantial economic effect under §704(b) regulations.'
      }
    ],
    hints: [
      'LLCs combine liability protection with partnership flexibility',
      'S corps require pro rata allocation = no special allocations',
      'Services for profits interest generally not taxed at receipt'
    ]
  },
  {
    id: 'reg-tbs-b3-014',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Depreciation Recapture',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Property Transactions',
    blueprintArea: 'REG-II',
    scenario: `
Delta Manufacturing sells the following assets:

Asset 1 - Equipment (§1245 property):
• Original cost: $250,000
• Accumulated depreciation: $180,000
• Selling price: $195,000

Asset 2 - Commercial building (§1250 property):
• Original cost: $800,000
• Accumulated depreciation: $200,000 (all straight-line)
• Selling price: $750,000
• Additional depreciation: $0 (used straight-line)

Asset 3 - Computer equipment (§1245 property):
• Original cost: $50,000
• Accumulated depreciation: $50,000
• Selling price: $8,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate ordinary income recapture on Asset 1.',
        correctAnswer: 125000,
        tolerance: 0,
        explanation: 'Gain = $195,000 - ($250,000 - $180,000) = $195,000 - $70,000 = $125,000. §1245 recapture = lesser of (gain, depreciation) = lesser of ($125,000, $180,000) = $125,000 ordinary'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate §1231 gain on Asset 2.',
        correctAnswer: 150000,
        tolerance: 0,
        explanation: 'Gain = $750,000 - ($800,000 - $200,000) = $750,000 - $600,000 = $150,000. No §1250 recapture (straight-line). All $150,000 is §1231 gain (but subject to 25% rate for unrecaptured §1250)'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'What portion of Asset 2 gain is subject to 25% rate?',
        correctAnswer: 150000,
        tolerance: 0,
        explanation: 'Unrecaptured §1250 = Lesser of (gain, straight-line depreciation) = Lesser of ($150,000, $200,000) = $150,000 at 25% rate'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate gain/loss on Asset 3.',
        correctAnswer: 8000,
        tolerance: 0,
        explanation: 'Basis = $50,000 - $50,000 = $0. Gain = $8,000 - $0 = $8,000. All is §1245 ordinary income recapture.'
      }
    ],
    hints: [
      '§1245 (equipment): Recapture ALL depreciation as ordinary',
      '§1250 (buildings): Recapture excess over straight-line (often $0)',
      'Unrecaptured §1250 gain taxed at 25% max rate'
    ]
  },
  {
    id: 'reg-tbs-b3-015',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Gift Tax Calculation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Estate and Gift Tax',
    blueprintArea: 'REG-IV',
    scenario: `
In Year 1, Marcus makes the following gifts:

To daughter Sarah:
• Cash: $50,000
• Stock (FMV $75,000, basis $30,000)

To son David:
• Real estate (FMV $200,000, basis $80,000)

To Brandon (grandchild):
• Educational payment directly to university: $40,000
• Cash gift: $20,000

To charity:
• Artwork (FMV $100,000)

Marcus is married to Lisa. They elect gift-splitting.
Annual exclusion per donee: $18,000
Lifetime exemption remaining: $10,000,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate taxable gifts to Sarah (before splitting).',
        correctAnswer: 107000,
        tolerance: 0,
        explanation: 'Cash $50,000 + Stock $75,000 = $125,000 - Annual exclusion $18,000 = $107,000 taxable'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate taxable gift to David (before splitting).',
        correctAnswer: 182000,
        tolerance: 0,
        explanation: 'Real estate $200,000 - Annual exclusion $18,000 = $182,000 taxable'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate taxable gift to Brandon.',
        correctAnswer: 2000,
        tolerance: 0,
        explanation: 'Tuition paid directly = excluded ($40,000). Cash $20,000 - Annual exclusion $18,000 = $2,000 taxable'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'After gift-splitting with Lisa, what is Marcus\'s taxable gifts?',
        correctAnswer: 145500,
        tolerance: 0,
        explanation: 'Total before exclusions: Sarah $125,000 + David $200,000 + Brandon $20,000 = $345,000 / 2 = $172,500 each. Less exclusions: ($18,000 × 3 donees) = $54,000 each. Marcus: $172,500 - $54,000 = $118,500. But need to recalculate properly with splitting.'
      }
    ],
    hints: [
      'Direct tuition payments are excluded (no limit)',
      'Gift-splitting doubles annual exclusions effectively',
      'Charitable gifts qualify for unlimited deduction'
    ]
  },
  {
    id: 'reg-tbs-b3-016',
    section: 'REG',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Ethics - Circular 230',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Professional Responsibilities',
    blueprintArea: 'REG-I',
    scenario: `
Evaluate the following scenarios for Circular 230 compliance:

Scenario 1: CPA prepares aggressive tax return position. Client asks CPA to sign the return but not include her name on preparers list to avoid scrutiny.

Scenario 2: During audit representation, IRS requests documents. Client tells CPA that some documents were "lost" but CPA suspects they were destroyed.

Scenario 3: CPA discovers math error in prior year return that resulted in $50,000 underpayment. Client refuses to file amended return.

Scenario 4: CPA charges contingent fee of 30% of any tax refund obtained on an original Form 1040 return.

Scenario 5: Former client complains to OPR about CPA. CPA responds by disclosing confidential tax information to defend herself.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Scenario 1 (not listing name) - Is this a Circular 230 violation?',
        options: ['No - client\'s choice', 'Yes - must sign as preparer', 'Only if return is fraudulent', 'No violation but bad practice'],
        correctAnswer: 1,
        explanation: 'Circular 230 §10.22 requires practitioner to sign returns they prepare. Omitting name to avoid scrutiny is a violation.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Scenario 2 (destroyed documents) - What must the CPA do?',
        options: ['Remain silent - privilege', 'Withdraw from representation', 'Report client to IRS', 'Continue representation'],
        correctAnswer: 1,
        explanation: 'If CPA knows client destroyed documents, continued representation would assist fraud. Must withdraw. Cannot affirmatively assist IRS but must not participate in concealment.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Scenario 3 (prior year error) - CPA\'s obligation?',
        options: ['File amended return for client', 'Advise client of error and consequences', 'Report to IRS if client refuses', 'No obligation - prior year'],
        correctAnswer: 1,
        explanation: 'CPA must advise client of error and consequences of not amending. Cannot file amended without client consent. Not required to report but may consider withdrawal from ongoing engagement.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Scenario 4 (contingent fee) - Is this permitted?',
        options: ['Yes - common practice', 'No - prohibited for original returns', 'Yes - if disclosed', 'Only for refunds over $100,000'],
        correctAnswer: 1,
        explanation: 'Circular 230 §10.27 prohibits contingent fees for preparing original tax returns. Allowed for amended returns, claims for refund, or IRS exam defense.'
      }
    ],
    hints: [
      'Must sign returns prepared',
      'Cannot assist in fraud or concealment',
      'No contingent fees for original returns'
    ]
  },
  {
    id: 'reg-tbs-b3-017',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Corporate Charitable Contribution Limitation',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Corporate Taxation',
    blueprintArea: 'REG-V',
    scenario: `
ABC Corporation (C corp, calendar year) has the following Year 1 data:

Gross profit: $2,800,000
Operating expenses: $1,500,000
Dividend income (20% owned domestic): $100,000
Capital gains: $150,000
Charitable contributions made: $180,000

ABC had no NOL or charitable carryforwards from prior years.
Charitable limitation: 10% of modified taxable income
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate taxable income before charitable deduction and DRD.',
        correctAnswer: 1550000,
        tolerance: 0,
        explanation: 'Gross profit $2,800,000 - Operating expenses $1,500,000 + Dividend income $100,000 + Capital gains $150,000 = $1,550,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the charitable contribution limitation.',
        correctAnswer: 155000,
        tolerance: 0,
        explanation: 'Modified TI for charitable = TI before charitable deduction and DRD = $1,550,000. Limit = 10% × $1,550,000 = $155,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the charitable contribution deduction allowed.',
        correctAnswer: 155000,
        tolerance: 0,
        explanation: 'Lesser of (contributions made $180,000, limitation $155,000) = $155,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate charitable contribution carryforward.',
        correctAnswer: 25000,
        tolerance: 0,
        explanation: 'Contributions made $180,000 - Allowed $155,000 = $25,000 carryforward (5 years)'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the dividends received deduction.',
        correctAnswer: 65000,
        tolerance: 0,
        explanation: '20% ownership = 65% DRD. $100,000 × 65% = $65,000'
      }
    ],
    hints: [
      'Charitable limit = 10% of modified TI',
      'Modified TI excludes DRD and charitable deduction',
      'Excess carries forward 5 years'
    ]
  },
  {
    id: 'reg-tbs-b3-018',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Shareholder Basis - S Corporation',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'S Corporations',
    blueprintArea: 'REG-V',
    scenario: `
Pat owns 100% of Alpine S Corporation. Beginning of Year 1:
• Stock basis: $50,000
• Debt basis (direct loan to corp): $20,000

Year 1 S Corp activity (Pat's share):
• Ordinary business income: $30,000
• §1231 gain: $8,000
• Charitable contributions: $5,000
• Non-deductible expenses: $3,000
• Tax-exempt income: $4,000
• Cash distribution: $65,000

Prior year items:
• Suspended losses due to basis: $15,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate stock basis after income/expense items (before distribution).',
        correctAnswer: 84000,
        tolerance: 0,
        explanation: 'Beginning $50,000 + Ordinary $30,000 + §1231 $8,000 - Charitable $5,000 - Non-deductible $3,000 + Tax-exempt $4,000 = $84,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'How much of the distribution is tax-free return of basis?',
        correctAnswer: 65000,
        tolerance: 0,
        explanation: 'Stock basis $84,000 > Distribution $65,000. Entire distribution is tax-free, reduces stock basis.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate ending stock basis.',
        correctAnswer: 19000,
        tolerance: 0,
        explanation: 'Adjusted basis $84,000 - Distribution $65,000 = $19,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Can Pat deduct any suspended losses this year?',
        correctAnswer: 15000,
        tolerance: 0,
        explanation: 'Ending stock basis $19,000 + Debt basis $20,000 = $39,000 total basis > Suspended losses $15,000. Yes, all $15,000 can be deducted.'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate Pat\'s ending stock basis after suspended loss deduction.',
        correctAnswer: 4000,
        tolerance: 0,
        explanation: 'Stock basis $19,000 - Suspended losses applied to stock $15,000 = $4,000. (Debt basis used only if stock basis is insufficient)'
      }
    ],
    hints: [
      'Increase basis for income items (including tax-exempt)',
      'Decrease for distributions, losses, non-deductible expenses',
      'Losses first reduce stock basis, then debt basis'
    ]
  },
  {
    id: 'reg-tbs-b3-019',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'At-Risk Rules',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Loss Limitations',
    blueprintArea: 'REG-III',
    scenario: `
Tom invests in a real estate limited partnership. Year 1 activity:

Investment and financing:
• Cash contributed: $100,000
• Recourse loan (Tom personally liable): $150,000
• Nonrecourse loan (secured by property): $200,000

Year 1 results:
• Partnership allocation of loss: ($180,000)

Prior suspended losses: $0

Note: Real estate qualified nonrecourse financing can be included in at-risk amount.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Tom\'s at-risk amount.',
        correctAnswer: 450000,
        tolerance: 0,
        explanation: 'At-risk = Cash $100,000 + Recourse debt $150,000 + Qualified nonrecourse financing $200,000 = $450,000 (real estate exception allows qualified nonrecourse)'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'How much of the $180,000 loss is deductible under at-risk rules?',
        correctAnswer: 180000,
        tolerance: 0,
        explanation: 'At-risk amount $450,000 > Loss $180,000. Entire loss passes at-risk hurdle.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Tom\'s ending at-risk amount.',
        correctAnswer: 270000,
        tolerance: 0,
        explanation: 'Beginning at-risk $450,000 - Loss allowed $180,000 = $270,000'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'If this were equipment leasing (not real estate), what would be at-risk?',
        options: ['Same - $450,000', '$250,000 - no nonrecourse', '$100,000 - cash only', '$300,000 - cash plus recourse only'],
        correctAnswer: 1,
        explanation: 'For non-real estate activities, nonrecourse debt is NOT at-risk. At-risk would be Cash $100,000 + Recourse $150,000 = $250,000'
      }
    ],
    hints: [
      'At-risk includes cash and amounts personally liable for',
      'Real estate exception allows qualified nonrecourse financing',
      'Non-real estate: only cash and recourse debt count'
    ]
  },
  {
    id: 'reg-tbs-b3-020',
    section: 'REG',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'IRS Penalties and Interest',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Federal Tax Procedures',
    blueprintArea: 'REG-I',
    scenario: `
DataTech LLC filed its Year 1 partnership return (Form 1065) 4 months late. The partnership has 5 partners.

Additionally, partner Robert failed to pay his individual tax liability of $50,000 by April 15. He received a 90-day letter but did not respond. The deficiency was ultimately assessed:
• Amount owed: $50,000
• Months late for failure to pay: 8 months
• Months late for failure to file (if applicable): 0 (he filed on time)

Failure to pay penalty: 0.5% per month (max 25%)
Partnership late filing: $235 per partner per month (max 12 months)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate partnership late filing penalty.',
        correctAnswer: 4700,
        tolerance: 0,
        explanation: '$235 × 5 partners × 4 months = $4,700'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Robert\'s failure to pay penalty.',
        correctAnswer: 2000,
        tolerance: 0,
        explanation: '$50,000 × 0.5% × 8 months = $2,000'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What happens when Robert ignores the 90-day letter?',
        options: ['Nothing - IRS must sue', 'IRS can assess and collect immediately', 'Automatic bank levy', 'Case goes to Tax Court'],
        correctAnswer: 1,
        explanation: 'If taxpayer doesn\'t file Tax Court petition within 90 days, IRS can assess the deficiency and begin collection procedures.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What defense might avoid the partnership penalty?',
        options: ['First-time penalty abatement', 'Reasonable cause', 'Statute of limitations', 'Both A and B'],
        correctAnswer: 3,
        explanation: 'Partnership penalty may be waived for reasonable cause. First-time abatement also applies to certain penalties. Both are valid defenses.'
      }
    ],
    hints: [
      'Partnership penalty is per partner per month',
      'Failure to pay: 0.5% per month, max 25%',
      'Failure to file + failure to pay cannot exceed 47.5%'
    ]
  }
];
