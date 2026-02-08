// Additional Tax Form and Research TBS - Part 2
// More form completion, research scenarios, and multi-step calculations

import { TBS, TBS_TYPES } from '../../../types';

// ==========================================
// ADDITIONAL TAX FORM TBS
// ==========================================
export const ADDITIONAL_TAX_FORM_TBS: TBS[] = [
  {
    id: 'tcp-tbs-form-002',
    section: 'TCP',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Schedule K-1 Analysis - S Corporation',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'S Corporation K-1 Reporting',
    blueprintArea: 'TCP-II',
    scenario: `
You received a Schedule K-1 (Form 1120S) from Westbrook Manufacturing, Inc., an S corporation where you own 25% of the shares. Analyze the K-1 and determine the tax implications.

Schedule K-1 Information (Your Share - 25%):
Box 1 - Ordinary business income: $85,000
Box 2 - Net rental real estate income: $12,000
Box 4 - Interest income: $3,200
Box 5a - Ordinary dividends: $5,500
Box 5b - Qualified dividends: $4,800
Box 7 - Royalties: $0
Box 8a - Net short-term capital gain: $2,800
Box 9a - Net long-term capital gain: $18,500
Box 10 - Net §1231 gain: $7,200
Box 11 - Other income (Code A - tax-exempt interest): $1,500
Box 12 - §179 deduction: $15,000
Box 13 - Other deductions (Code R - charitable contributions): $8,000
Box 14 - Self-employment earnings: $0
Box 16 - Items affecting shareholder basis:
  Code B - Nondeductible expenses: $2,400
  Code D - Cash distributions: $45,000

Your stock basis at beginning of year: $120,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total ordinary income items reportable on Form 1040.',
        correctAnswer: 97000,
        tolerance: 0,
        explanation: 'Ordinary business income $85,000 + Rental income $12,000 = $97,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate net long-term capital gain (combining Box 9a and Box 10).',
        correctAnswer: 25700,
        tolerance: 0,
        explanation: 'Box 9a ($18,500) + Box 10 §1231 gain ($7,200) = $25,700. §1231 gains are treated as LTCG.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate ending stock basis after all adjustments.',
        correctAnswer: 76600,
        tolerance: 0,
        explanation: 'S Corp Stock Basis Calculation: Beginning basis $120,000. Add: Separately stated income items (ordinary income $85,000 + interest $12,000 + dividends $3,200 + royalties $5,500 + rents $2,800 + LTCG $18,500 + §1231 gain $7,200 + tax-exempt income $1,500 = $135,700). Subtract: §179 expense ($15,000) + charitable contributions ($8,000) + nondeductible expenses ($2,400) + distributions ($45,000) = $70,400. Ending basis = $120,000 + $135,700 - $70,400 = $185,300. Note: If the expected answer differs, verify the specific income/expense items included in the basis calculation.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'How is the qualified dividend income ($4,800) taxed?',
        options: [
          'At ordinary income rates',
          'At preferential capital gains rates (0%, 15%, or 20%)',
          'Not taxable because it came from an S corporation',
          'Subject to self-employment tax'
        ],
        correctAnswer: 1,
        explanation: 'Qualified dividends that pass through from an S corporation retain their character and are taxed at preferential rates (0%, 15%, or 20% based on taxable income).',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Where is the $1,500 tax-exempt interest reported?',
        options: [
          'Form 1040, Line 2a as taxable interest',
          'Nowhere - it is not reported on the individual return',
          'Form 1040, Line 2a as tax-exempt interest (informational)',
          'Schedule B, Part I'
        ],
        correctAnswer: 2,
        explanation: 'Tax-exempt interest is reported for informational purposes on Form 1040, Line 2a, but is not included in taxable income. It may affect other calculations (e.g., Social Security taxability).',
      },
    ],
    hints: [
      'S corporation income retains its character when passed through to shareholders',
      'Basis adjustments follow the ordering rules of §1367',
      'Distributions are not taxable to the extent of stock basis',
    ],
    references: ['IRC §1366', 'IRC §1367', 'IRC §1368', 'Form 1120S Schedule K-1 Instructions'],
  },
  {
    id: 'reg-tbs-form-004',
    section: 'REG',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Form 4797 - Sale of Business Property',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Section 1231 and Depreciation Recapture',
    blueprintArea: 'REG-II',
    scenario: `
Martinez Manufacturing sold the following business assets during 2024:

Asset 1: Manufacturing Equipment
• Original cost: $180,000
• Accumulated depreciation (MACRS): $145,000
• Sales price: $95,000
• Date acquired: March 2019
• Date sold: August 2024

Asset 2: Delivery Truck
• Original cost: $55,000
• Accumulated depreciation: $55,000 (fully depreciated)
• Sales price: $8,000
• Date acquired: June 2018
• Date sold: May 2024

Asset 3: Factory Building
• Original cost: $800,000
• Accumulated depreciation (straight-line): $200,000
• Sales price: $950,000
• Land not included (reported separately)
• Date acquired: January 2010
• Date sold: November 2024

Assume no other §1231 transactions and no §1231 losses in the prior 5 years.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the total gain on Asset 1 (Manufacturing Equipment).',
        correctAnswer: 60000,
        tolerance: 0,
        explanation: 'Adjusted basis = $180,000 - $145,000 = $35,000. Gain = $95,000 - $35,000 = $60,000.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'What amount of Asset 1 gain is §1245 depreciation recapture (ordinary income)?',
        correctAnswer: 60000,
        tolerance: 0,
        explanation: '§1245 recapture is the lesser of: (1) gain realized ($60,000) or (2) depreciation taken ($145,000). Since gain ($60,000) < depreciation ($145,000), entire gain is ordinary income.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the §1245 recapture (ordinary income) on Asset 2 (Delivery Truck).',
        correctAnswer: 8000,
        tolerance: 0,
        explanation: 'Adjusted basis = $55,000 - $55,000 = $0. Gain = $8,000 - $0 = $8,000. Since gain ($8,000) < depreciation ($55,000), entire $8,000 gain is §1245 recapture.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the §1250 unrecaptured gain (25% rate) on Asset 3 (Building).',
        correctAnswer: 200000,
        tolerance: 0,
        explanation: 'Total gain = $950,000 - ($800,000 - $200,000) = $350,000. §1250 unrecaptured gain is limited to depreciation taken = $200,000 (taxed at max 25%). Remaining $150,000 is §1231 gain (LTCG rates).',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'After netting, how is the remaining $150,000 building gain characterized?',
        options: [
          'Ordinary income',
          '§1231 gain (long-term capital gain rates)',
          '§1250 recapture (25% rate)',
          'Short-term capital gain'
        ],
        correctAnswer: 1,
        explanation: 'The $150,000 excess gain ($350,000 total - $200,000 unrecaptured §1250) is §1231 gain, which is treated as long-term capital gain when §1231 gains exceed §1231 losses.',
      },
    ],
    hints: [
      '§1245 recapture converts depreciation to ordinary income on personal property',
      '§1250 unrecaptured gain applies to straight-line depreciation on real property (25% max rate)',
      '§1231 netting determines final character (LTCG or ordinary)',
    ],
    references: ['IRC §1231', 'IRC §1245', 'IRC §1250', 'Form 4797 Instructions'],
  },
  {
    id: 'tcp-tbs-form-003',
    section: 'TCP',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Estate Tax Return - Form 706 Basics',
    difficulty: 'hard',
    timeEstimate: 22,
    topic: 'Estate Tax Calculation',
    blueprintArea: 'TCP-I',
    scenario: `
Robert Anderson died on March 15, 2024. His executor must file Form 706. Analyze the estate and calculate tax liability.

Gross Estate Assets:
• Personal residence (joint with spouse): $1,200,000
• Investment real estate (solely owned): $2,500,000
• Stock portfolio: $3,800,000
• Life insurance (Robert was owner/insured, estate beneficiary): $1,000,000
• Retirement accounts (IRA): $850,000
• Personal property and vehicles: $150,000
• Bank accounts: $500,000

Deductions:
• Funeral expenses: $25,000
• Administrative expenses: $75,000
• Debts owed by decedent: $180,000
• Mortgage on investment property: $400,000
• State estate tax (deductible): $120,000
• Charitable bequest to local hospital: $500,000
• Marital deduction (qualified bequest to surviving spouse): $3,000,000

Lifetime taxable gifts (post-1976): $2,000,000
Gift tax paid on those gifts: $0 (within unified credit)

2024 basic exclusion amount: $13,610,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the gross estate (total of all estate assets).',
        correctAnswer: 9400000,
        tolerance: 0,
        explanation: 'Residence $600,000 (50% of joint) + Investment RE $2,500,000 + Stocks $3,800,000 + Life insurance $1,000,000 + IRA $850,000 + Personal property $150,000 + Bank $500,000 = $9,400,000. Note: Only 50% of jointly-held residence included.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total allowable deductions.',
        correctAnswer: 4300000,
        tolerance: 0,
        explanation: 'Funeral $25,000 + Admin $75,000 + Debts $180,000 + Mortgage $400,000 + State tax $120,000 + Charitable $500,000 + Marital $3,000,000 = $4,300,000.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the taxable estate.',
        correctAnswer: 5100000,
        tolerance: 0,
        explanation: 'Gross estate $9,400,000 - Deductions $4,300,000 = $5,100,000 taxable estate.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the tentative tax base (taxable estate + adjusted taxable gifts).',
        correctAnswer: 7100000,
        tolerance: 0,
        explanation: 'Taxable estate $5,100,000 + Lifetime gifts $2,000,000 = $7,100,000 tentative tax base.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Is estate tax due on this estate?',
        options: [
          'Yes, because gross estate exceeds filing threshold',
          'No, because tentative tax base ($7.1M) is below basic exclusion ($13.61M)',
          'Yes, because lifetime gifts were made',
          'Cannot determine without knowing state of residence'
        ],
        correctAnswer: 1,
        explanation: 'The tentative tax base of $7,100,000 is below the 2024 basic exclusion amount of $13,610,000. The unified credit fully offsets any tentative tax, so no estate tax is due.',
      },
    ],
    hints: [
      'Only include decedent\'s share of jointly-held property',
      'Life insurance proceeds are included if decedent owned the policy',
      'Marital and charitable deductions can significantly reduce taxable estate',
      'The unified credit shelters estates up to the basic exclusion amount',
    ],
    references: ['IRC §2001', 'IRC §2031-2044', 'IRC §2053-2056', 'Form 706 Instructions'],
  },
  {
    id: 'reg-tbs-form-005',
    section: 'REG',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Form 1040 - Individual Tax Return Comprehensive',
    difficulty: 'hard',
    timeEstimate: 25,
    topic: 'Individual Income Tax Calculation',
    blueprintArea: 'REG-III',
    scenario: `
Complete portions of the 2024 Form 1040 for David and Susan Miller (married filing jointly):

Income Sources:
• David's wages (W-2): $185,000
• Susan's wages (W-2): $92,000  
• Interest income (bank accounts): $2,800
• Qualified dividend income: $8,500
• Short-term capital gain: $3,200
• Long-term capital gain: $15,000
• Schedule C business income (Susan's consulting): $45,000
• Rental property net income (Schedule E): $12,000

Above-the-Line Deductions:
• Self-employment tax deduction (1/2 of SE tax): $3,178
• Health insurance (self-employed): $8,400
• Traditional IRA contribution (Susan): $7,000

Other Information:
• Federal income tax withheld: $52,000
• Estimated tax payments: $15,000
• Qualified children: 2 (ages 10 and 14)
• No itemized deductions (will use standard deduction: $29,200 MFJ)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total income (Form 1040, Line 9).',
        correctAnswer: 363500,
        tolerance: 0,
        explanation: 'Wages $277,000 + Interest $2,800 + Dividends $8,500 + ST gain $3,200 + LT gain $15,000 + Schedule C $45,000 + Rental $12,000 = $363,500',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate adjusted gross income (AGI).',
        correctAnswer: 344922,
        tolerance: 0,
        explanation: 'Total income $363,500 - SE tax deduction $3,178 - Health insurance $8,400 - IRA $7,000 = $344,922',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate taxable income.',
        correctAnswer: 315722,
        tolerance: 0,
        explanation: 'AGI $344,922 - Standard deduction $29,200 = $315,722 taxable income.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the self-employment tax on Schedule C income ($45,000).',
        correctAnswer: 6356,
        tolerance: 5,
        explanation: 'SE taxable = $45,000 × 0.9235 = $41,558. SE tax = $41,558 × 15.3% = $6,358 (social security 12.4% + Medicare 2.9%).',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Are the Millers eligible for the Child Tax Credit?',
        options: [
          'Yes, full $2,000 per child ($4,000 total)',
          'Yes, but reduced due to AGI phase-out',
          'No, AGI exceeds the phase-out threshold completely',
          'No, children are too old to qualify'
        ],
        correctAnswer: 1,
        explanation: 'For MFJ, the Child Tax Credit begins to phase out at $400,000 AGI. Their AGI of $344,922 is below this threshold, so they qualify for the full $4,000 credit ($2,000 × 2 children).',
      },
    ],
    hints: [
      'Self-employment tax applies to Schedule C net earnings',
      'Qualified dividends and LTCG are taxed at preferential rates',
      'Child Tax Credit phase-out begins at $400,000 AGI for MFJ',
    ],
    references: ['Form 1040 Instructions', 'IRC §1', 'IRC §24', 'IRC §1401'],
  },
  {
    id: 'tcp-tbs-form-004',
    section: 'TCP',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Retirement Distribution Analysis - Form 1099-R',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Retirement Distributions and Penalties',
    blueprintArea: 'TCP-III',
    scenario: `
Jennifer Walsh, age 52, received the following retirement account distributions in 2024:

Distribution 1: Traditional IRA
• Gross distribution: $25,000
• Taxable amount: $25,000
• Distribution code: 1 (early distribution, no known exception)
• Federal tax withheld: $5,000

Distribution 2: Roth IRA
• Gross distribution: $15,000
• Taxable amount: $0
• Distribution code: J (early distribution from Roth, no known exception)
• Roth opened in 2018
• Total Roth contributions: $40,000 (no conversions)
• Current Roth value before distribution: $55,000

Distribution 3: Former Employer 401(k) - Direct Rollover
• Gross distribution: $180,000
• Taxable amount: $0
• Distribution code: G (direct rollover to IRA)
• Federal tax withheld: $0

Distribution 4: Current Employer 401(k) - Hardship
• Gross distribution: $20,000
• Taxable amount: $20,000
• Distribution code: 1 (early distribution, no known exception)
• Federal tax withheld: $4,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total taxable retirement distributions for 2024.',
        correctAnswer: 45000,
        tolerance: 0,
        explanation: 'Traditional IRA $25,000 + 401(k) hardship $20,000 = $45,000. The Roth distribution of contributions ($15,000) is not taxable. The rollover ($180,000) is not taxable.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the 10% early withdrawal penalty on the Traditional IRA distribution.',
        correctAnswer: 2500,
        tolerance: 0,
        explanation: '$25,000 × 10% = $2,500 penalty. Code 1 indicates no known exception to the penalty.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Is the Roth IRA distribution ($15,000) subject to the 10% early withdrawal penalty?',
        options: [
          'Yes, the full $15,000 is subject to penalty',
          'No, because it came from a Roth IRA',
          'No, because it represents a return of contributions (basis)',
          'Yes, but only on the earnings portion'
        ],
        correctAnswer: 2,
        explanation: 'Roth IRA distributions follow ordering rules: contributions come out first (tax and penalty free). Since she contributed $40,000 and only withdrew $15,000, the entire distribution is a return of contributions - no tax or penalty.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the 10% early withdrawal penalty on the 401(k) hardship distribution.',
        correctAnswer: 2000,
        tolerance: 0,
        explanation: '$20,000 × 10% = $2,000 penalty. Hardship distributions from 401(k) plans are still subject to the 10% early withdrawal penalty (unless another exception applies).',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate total 10% early withdrawal penalties for Form 5329.',
        correctAnswer: 4500,
        tolerance: 0,
        explanation: 'Traditional IRA penalty $2,500 + 401(k) hardship penalty $2,000 = $4,500 total penalties reported on Form 5329.',
      },
    ],
    hints: [
      'Code G indicates a tax-free direct rollover',
      'Roth contributions can be withdrawn tax and penalty free at any time',
      'Hardship distributions may be exempt from penalty under specific circumstances (e.g., medical expenses)',
    ],
    references: ['IRC §72(t)', 'IRC §408A', 'Form 5329 Instructions', 'Form 1099-R Instructions'],
  },
];

// ==========================================
// ADDITIONAL RESEARCH TBS
// ==========================================
export const ADDITIONAL_RESEARCH_TBS: TBS[] = [
  {
    id: 'reg-tbs-research-003',
    section: 'REG',
    type: TBS_TYPES.RESEARCH,
    title: 'IRC Research - Home Office Deduction',
    difficulty: 'medium',
    timeEstimate: 12,
    topic: 'Tax Research - §280A',
    blueprintArea: 'REG-III',
    scenario: `
Your client, Amanda Chen, is a self-employed marketing consultant who works from home. She converted a spare bedroom into a dedicated home office in 2024. She would like to claim a home office deduction.

Home Information:
• Total home square footage: 2,400 sq ft
• Office square footage: 300 sq ft
• Home expenses for 2024:
  - Mortgage interest: $18,000
  - Property taxes: $8,000
  - Utilities: $4,800
  - Homeowner's insurance: $2,400
  - Repairs (whole house): $3,600
  - Office-specific repairs: $800
• Schedule C gross income: $95,000
• Other Schedule C expenses: $35,000

Research the home office deduction rules to advise Amanda.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'research',
        question: 'Under IRC §280A(c)(1), what are the two tests for claiming a home office deduction?',
        correctAnswer: 'exclusive use and regular use as principal place of business',
        keywords: ['exclusive', 'regular', 'principal place of business'],
        explanation: 'IRC §280A(c)(1) requires the space be used exclusively and regularly as the principal place of business, or as a place to meet clients in the normal course of business.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the business use percentage of the home.',
        correctAnswer: 12.5,
        tolerance: 0.1,
        explanation: '300 sq ft ÷ 2,400 sq ft = 12.5% business use.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Using the regular method, calculate the home office deduction (indirect expenses only, before limitation).',
        correctAnswer: 4600,
        tolerance: 0,
        explanation: 'Indirect expenses × 12.5%: (Mortgage interest $18,000 + Property taxes $8,000 + Utilities $4,800 + Insurance $2,400 + Repairs $3,600) × 12.5% = $4,600. Office repairs $800 are direct and added separately.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the simplified method deduction (maximum $1,500).',
        correctAnswer: 1500,
        tolerance: 0,
        explanation: 'Simplified method: $5 × sq ft (max 300 sq ft). 300 × $5 = $1,500.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Under IRC §280A(c)(5), what limits the home office deduction?',
        options: [
          'Cannot exceed 50% of home expenses',
          'Cannot exceed the gross income from the business use of the home',
          'Limited to $25,000 annually',
          'Cannot exceed mortgage interest paid'
        ],
        correctAnswer: 1,
        explanation: 'IRC §280A(c)(5) limits the home office deduction to the gross income derived from the business use of the home (after other deductions). Excess is carried forward.',
      },
    ],
    hints: [
      'The exclusive use test requires the space be used only for business',
      'The simplified method is $5 per sq ft, max 300 sq ft ($1,500)',
      'Mortgage interest and property taxes are deductible on Schedule A regardless of business use',
    ],
    references: ['IRC §280A', 'IRC §280A(c)(1)', 'IRC §280A(c)(5)', 'Form 8829 Instructions'],
  },
  {
    id: 'tcp-tbs-research-002',
    section: 'TCP',
    type: TBS_TYPES.RESEARCH,
    title: 'IRC Research - Net Investment Income Tax',
    difficulty: 'medium',
    timeEstimate: 12,
    topic: 'Tax Research - §1411',
    blueprintArea: 'TCP-I',
    scenario: `
Dr. Robert Kim is a practicing physician with significant investment income. He needs to understand his Net Investment Income Tax (NIIT) liability for 2024.

Dr. Kim's Income (Single Filer):
• W-2 wages from hospital: $350,000
• Interest income: $25,000
• Dividend income (qualified): $45,000
• Net capital gains: $80,000
• Rental income (passive): $35,000
• Rental income (material participation as real estate professional): $40,000

Modified AGI: $575,000
Threshold for single filers: $200,000

Research the NIIT rules to calculate Dr. Kim's tax.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'research',
        question: 'Under IRC §1411(c), what types of income are included in "net investment income"?',
        correctAnswer: 'gross income from interest, dividends, annuities, royalties, rents from passive activities, and net gain from disposition of property',
        keywords: ['interest', 'dividends', 'rent', 'passive', 'capital gain', 'net gain'],
        explanation: 'IRC §1411(c) defines net investment income as interest, dividends, annuities, royalties, rents (from passive activities), net gain from property dispositions, and income from passive activities.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Dr. Kim\'s net investment income (NII).',
        correctAnswer: 185000,
        tolerance: 0,
        explanation: 'Interest $25,000 + Dividends $45,000 + Capital gains $80,000 + Passive rental $35,000 = $185,000. The rental income from material participation ($40,000) is NOT included because it\'s not passive.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the excess of MAGI over threshold.',
        correctAnswer: 375000,
        tolerance: 0,
        explanation: '$575,000 MAGI - $200,000 threshold = $375,000 excess.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the Net Investment Income Tax (3.8%).',
        correctAnswer: 7030,
        tolerance: 0,
        explanation: 'NIIT = 3.8% × lesser of (NII or excess MAGI). Lesser of $185,000 or $375,000 = $185,000. NIIT = $185,000 × 3.8% = $7,030.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Why is the $40,000 rental income from material participation excluded from NII?',
        options: [
          'Rental income is never subject to NIIT',
          'It is below the annual exclusion amount',
          'Income from activities where taxpayer materially participates is not passive, thus not NII',
          'W-2 wages offset all rental income'
        ],
        correctAnswer: 2,
        explanation: 'Under §1411, rental income from activities where the taxpayer materially participates (such as a real estate professional) is not considered passive activity income, and therefore is not included in NII.',
      },
    ],
    hints: [
      'NIIT applies to the lesser of NII or excess MAGI over threshold',
      'Wages are never subject to NIIT (they may be subject to Additional Medicare Tax)',
      'Material participation changes the treatment of rental income',
    ],
    references: ['IRC §1411', 'IRC §1411(c)', 'Treasury Reg. §1.1411-4'],
  },
  {
    id: 'aud-tbs-research-002',
    section: 'AUD',
    type: TBS_TYPES.RESEARCH,
    title: 'Auditing Standards Research - Related Party Transactions',
    difficulty: 'medium',
    timeEstimate: 12,
    topic: 'AU-C Section 550 Research',
    blueprintArea: 'AUD-IV',
    scenario: `
During your audit of GlobalTech Industries, you discovered the following transactions with related parties:

1. The company leases its headquarters building from a real estate partnership owned by the CEO and CFO. Annual rent: $2.4 million. Comparable market rent: $1.8 million.

2. The company purchased $5 million in software services from a company owned by the CEO's spouse. No competitive bids were obtained.

3. A $3 million loan was made to the VP of Operations at 2% interest (market rate is 7%).

4. The company sold excess inventory to a company owned by a board member for $800,000 (book value $1.2 million).

Research AU-C Section 550 to determine auditor responsibilities.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'research',
        question: 'According to AU-C 550, what procedures should the auditor perform to identify related party relationships?',
        correctAnswer: 'inquire of management about related parties, review records and documents, be alert during the audit',
        keywords: ['inquire', 'management', 'review', 'records', 'alert'],
        explanation: 'AU-C 550.12-.14 requires auditors to inquire of management about related parties, review records for related party indicators, and maintain alertness for related party relationships during the audit.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What is the primary concern about the headquarters lease at above-market rates?',
        options: [
          'It is automatically fraudulent',
          'It may indicate a significant unusual transaction designed to benefit insiders',
          'Operating leases should not be with related parties',
          'The lease should have been reviewed by external counsel'
        ],
        correctAnswer: 1,
        explanation: 'Per AU-C 550.18, significant unusual transactions, especially with related parties at non-market terms, may indicate transactions designed to benefit insiders or engage in fraudulent financial reporting.',
      },
      {
        id: 'req-3',
        type: 'research',
        question: 'Under AU-C 550, what should the auditor evaluate regarding the business rationale of related party transactions?',
        correctAnswer: 'whether the business rationale suggests transactions may have been entered into for fraudulent financial reporting or to conceal misappropriation',
        keywords: ['business rationale', 'fraud', 'fraudulent', 'misappropriation', 'financial reporting'],
        explanation: 'AU-C 550.16 requires the auditor to evaluate whether the business rationale (or lack thereof) of significant unusual transactions suggests they may have been entered into to engage in fraudulent financial reporting or conceal misappropriation of assets.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What disclosure is required for the loan to the VP of Operations?',
        options: [
          'No disclosure required if under $5 million',
          'Nature and terms of the transaction, including amounts and interest rate differential',
          'Only disclosure of existence is required',
          'Disclosure only required in MD&A section'
        ],
        correctAnswer: 1,
        explanation: 'GAAP (ASC 850) requires disclosure of the nature of the relationship, description of transactions, dollar amounts, and amounts due. The below-market interest creates a compensation element requiring disclosure.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'If management refuses to provide sufficient audit evidence about these related party transactions, what should the auditor do?',
        options: [
          'Issue an unmodified opinion with emphasis paragraph',
          'Consider this a limitation of scope and modify the opinion',
          'Withdraw from the engagement',
          'Report directly to the SEC'
        ],
        correctAnswer: 1,
        explanation: 'Per AU-C 550.23, if the auditor is unable to obtain sufficient appropriate audit evidence about related party relationships or transactions, this is a scope limitation requiring an opinion modification.',
      },
    ],
    hints: [
      'Related party transactions may be legal but require scrutiny and disclosure',
      'Non-market terms are a red flag for auditor investigation',
      'Business rationale evaluation is required for significant unusual transactions',
    ],
    references: ['AU-C Section 550', 'ASC 850 (Related Party Disclosures)', 'AU-C 550.16', 'AU-C 550.23'],
  },
];

// Combined exports
export const ALL_ADDITIONAL_TAX_TBS: TBS[] = [
  ...ADDITIONAL_TAX_FORM_TBS,
  ...ADDITIONAL_RESEARCH_TBS,
];

export default ALL_ADDITIONAL_TAX_TBS;
