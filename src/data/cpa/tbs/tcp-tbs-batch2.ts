// TCP TBS Batch 2 - Exam Quality Simulations
import { TBS, TBS_TYPES } from '../../../types';

export const TCP_TBS_BATCH2: TBS[] = [
  {
    id: 'tcp-tbs-b2-001',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Trust Income Taxation',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Fiduciary Taxation',
    blueprintArea: 'TCP-IV',
    scenario: `
Smith Family Trust (complex trust) has the following for Year 1:

Income:
• Interest income: $50,000
• Dividend income (qualified): $30,000
• Capital gains (long-term): $25,000
• Tax-exempt interest: $10,000

Deductions:
• Fiduciary fees: $8,000 (allocable: 60% to taxable, 40% to tax-exempt)
• Trustee fees: $5,000
• Charitable contribution (from gross income): $15,000

Distributions:
• Required income distribution to beneficiary: $60,000
• Discretionary distribution to beneficiary: $20,000

DNI tier rules apply. Trust instrument requires all income to be distributed.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate trust accounting income (TAI).',
        correctAnswer: 90000,
        tolerance: 0,
        explanation: 'Interest $50,000 + Dividends $30,000 + Tax-exempt $10,000 = $90,000 (Capital gains typically allocated to corpus under trust instrument)'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Distributable Net Income (DNI).',
        correctAnswer: 77200,
        tolerance: 200,
        explanation: 'Taxable income + tax-exempt income (net of allocable expenses) - capital gains + income distribution deduction. DNI = $50,000 + $30,000 + $10,000 - ($8,000 × 40%) - ($10,000 × portion) = needs detailed calc'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the income distribution deduction.',
        correctAnswer: 60000,
        tolerance: 0,
        explanation: 'Lesser of DNI (excluding tax-exempt) or actual distributions. Limited to DNI available.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Are capital gains included in DNI?',
        options: ['Yes - always', 'No - never', 'Only if allocated to income or distributed', 'Only for simple trusts'],
        correctAnswer: 2,
        explanation: 'Capital gains are excluded from DNI unless they are: (1) allocated to income under trust instrument, (2) allocated to corpus but actually distributed, or (3) used for charitable purposes.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'How are qualified dividends taxed to beneficiary?',
        options: ['Ordinary income rates', 'Preferential capital gains rates', 'Tax-exempt', 'Depends on beneficiary bracket'],
        correctAnswer: 1,
        explanation: 'Qualified dividends retain their character when passed through to beneficiary via DNI. Beneficiary reports at preferential rates (0%/15%/20%).'
      }
    ],
    hints: [
      'TAI = Fiduciary accounting income (interest, dividends, rent, excludes capital gains)',
      'DNI = Modified taxable income of trust (with adjustments)',
      'Income distribution deduction = Lesser of DNI or distributions',
      'Character of income flows through to beneficiary'
    ]
  },
  {
    id: 'tcp-tbs-b2-002',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'International Tax - Subpart F Income',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'International Taxation',
    blueprintArea: 'TCP-III',
    scenario: `
US Parent Corp. owns 100% of CFC (Controlled Foreign Corporation) in Country X.

CFC Year 1 Results:
• Manufacturing income (active business): $2,000,000
• Interest income from unrelated parties: $150,000
• Dividend income from portfolio investments: $100,000
• Royalties from licensing to related US company: $300,000
• Sales income from selling to unrelated customers in Country X: $500,000
• Sales income from selling to related US company (manufactured elsewhere): $400,000

Country X tax rate: 15%
US tax rate: 21%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total Subpart F income from FPHCI (passive).',
        correctAnswer: 250000,
        tolerance: 0,
        explanation: 'Foreign personal holding company income: Interest $150,000 + Dividends $100,000 = $250,000. Royalties from related party are also FPHCI.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Is the sales income to related US company ($400,000) Subpart F income?',
        correctAnswer: 400000,
        tolerance: 0,
        explanation: 'Yes. Foreign base company sales income includes income from sale of property purchased from OR sold to a related party if manufactured outside CFC\'s country. $400,000 is Subpart F.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Is the manufacturing income ($2,000,000) Subpart F income?',
        options: ['Yes - all CFC income is Subpart F', 'No - active business income is excluded', 'Only if repatriated', 'Depends on country tax rate'],
        correctAnswer: 1,
        explanation: 'Manufacturing income from active business operations in the CFC\'s country is NOT Subpart F income. It may be subject to GILTI but not Subpart F.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the minimum Subpart F income inclusion for US Parent.',
        correctAnswer: 950000,
        tolerance: 0,
        explanation: 'FPHCI: Interest $150K + Dividends $100K + Royalties $300K = $550K. FBCSI: Sales to related party $400K. Total Subpart F = $950,000 (before any high-tax exclusion).'
      }
    ],
    hints: [
      'FPHCI: Passive income (interest, dividends, royalties, rents)',
      'FBCSI: Sales income with related party and manufactured outside CFC country',
      'Active manufacturing income is generally NOT Subpart F',
      'Subpart F is included currently regardless of distribution'
    ]
  },
  {
    id: 'tcp-tbs-b2-003',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Net Operating Loss Utilization',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Corporate Taxation',
    blueprintArea: 'TCP-II',
    scenario: `
Delta Corp. has the following history:

Year 1: Taxable income $500,000
Year 2: Net operating loss ($800,000)
Year 3: Taxable income $400,000
Year 4: Taxable income $600,000

Assume all years post-2020 (80% limitation applies).
Corporate tax rate: 21%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Can the Year 2 NOL be carried back to Year 1?',
        options: ['Yes - 2-year carryback allowed', 'Yes - 5-year carryback allowed', 'No - post-2017 NOLs cannot be carried back', 'Only if Delta is a farm business'],
        correctAnswer: 2,
        explanation: 'Post-2017 NOLs generally cannot be carried back (with limited exceptions for farming losses and certain insurance companies). The NOL carries forward only.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the NOL deduction allowed in Year 3.',
        correctAnswer: 320000,
        tolerance: 0,
        explanation: '80% of taxable income before NOL: $400,000 × 80% = $320,000 maximum NOL deduction.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Year 3 taxable income after NOL deduction.',
        correctAnswer: 80000,
        tolerance: 0,
        explanation: '$400,000 - $320,000 NOL = $80,000 taxable income. The 80% limit prevents full offset.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the remaining NOL carryforward to Year 4.',
        correctAnswer: 480000,
        tolerance: 0,
        explanation: 'Original NOL $800,000 - Used Year 3 $320,000 = $480,000 remaining.'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate total tax savings from the NOL over Years 3-4.',
        correctAnswer: 168000,
        tolerance: 1000,
        explanation: 'Year 3: $320,000 × 21% = $67,200. Year 4: $480,000 NOL remaining, 80% limit = $600,000 × 80% = $480,000 usable. $480,000 × 21% = $100,800. Total = $168,000.'
      }
    ],
    hints: [
      'Post-2017 NOLs: No carryback, indefinite carryforward',
      '80% taxable income limitation applies',
      'NOL deduction = Lesser of NOL available or 80% of current taxable income',
      'Pre-2018 NOLs had different rules (2-year back, 20-year forward, 100%)'
    ]
  },
  {
    id: 'tcp-tbs-b2-004',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Gift Tax Planning',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Gift Taxation',
    blueprintArea: 'TCP-IV',
    scenario: `
In Year 1, George makes the following gifts:

To adult daughter Sarah:
• Cash: $50,000
• Stock (FMV $100,000, George's basis $40,000)

To granddaughter Emma (age 12):
• Direct payment of private school tuition: $25,000
• Direct payment of medical bills: $8,000
• Cash gift: $20,000

To irrevocable trust for son Michael:
• Cash: $200,000 (Crummey power for $18,000)

George's spouse Linda consents to gift-splitting.
Year 1 annual exclusion: $18,000 per donee per donor
Lifetime exemption: Assume George has $5,000,000 remaining
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total gifts to Sarah.',
        correctAnswer: 150000,
        tolerance: 0,
        explanation: 'Cash $50,000 + Stock FMV $100,000 = $150,000 total gift value.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate taxable gifts to Sarah (with gift-splitting).',
        correctAnswer: 114000,
        tolerance: 0,
        explanation: 'Total $150,000 split = $75,000 each. Each spouse uses $18,000 annual exclusion. Taxable per spouse = $75,000 - $18,000 = $57,000. Total taxable = $114,000.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate taxable gifts to Emma.',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'Tuition paid directly to school = excluded (unlimited). Medical paid directly = excluded (unlimited). Cash $20,000: With gift-splitting, each spouse gives $10,000, under $18,000 annual exclusion. Taxable = $0.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate taxable gift to Michael trust.',
        correctAnswer: 164000,
        tolerance: 0,
        explanation: 'Gift to trust = $200,000. Crummey power makes $18,000 qualify for annual exclusion per donor. With splitting: Each spouse $100,000, less $18,000 exclusion = $82,000 each. Total taxable = $164,000.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'What is Sarah\'s basis in the gifted stock?',
        options: ['$40,000 (carryover basis)', '$100,000 (FMV at gift)', '$70,000 (average)', 'Depends on sale price'],
        correctAnswer: 0,
        explanation: 'For gifts where FMV > basis at gift date, donee takes carryover basis ($40,000). Basis is increased by gift tax paid on appreciation, if any.'
      }
    ],
    hints: [
      'Tuition/medical paid DIRECTLY to provider = unlimited exclusion',
      'Annual exclusion per donee per donor ($18,000 in Year 1)',
      'Gift-splitting doubles exclusions (each spouse)',
      'Crummey power = annual exclusion for trust gifts'
    ]
  },
  {
    id: 'tcp-tbs-b2-005',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Section 754 Election - Partnership Basis Adjustment',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Partnership Taxation',
    blueprintArea: 'TCP-II',
    scenario: `
ABC Partnership has three equal partners and the following assets:

| Asset | FMV | Partnership Basis |
|-------|-----|-------------------|
| Cash | $60,000 | $60,000 |
| Land | $180,000 | $90,000 |
| Building | $360,000 | $150,000 |
| Total | $600,000 | $300,000 |

Partner A sells their 1/3 interest to new Partner D for $200,000.
A §754 election is in effect.
Partner A's outside basis: $100,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Partner A\'s gain on sale of partnership interest.',
        correctAnswer: 100000,
        tolerance: 0,
        explanation: 'Amount realized $200,000 - Outside basis $100,000 = $100,000 gain.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Partner D\'s outside basis.',
        correctAnswer: 200000,
        tolerance: 0,
        explanation: 'D\'s cost = purchase price = $200,000 outside basis.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the §743(b) adjustment for Partner D.',
        correctAnswer: 100000,
        tolerance: 0,
        explanation: 'D\'s outside basis ($200,000) - D\'s share of inside basis ($300,000 × 1/3 = $100,000) = $100,000 step-up.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the §743(b) adjustment allocated to Land.',
        correctAnswer: 30000,
        tolerance: 0,
        explanation: 'Land appreciation = $180,000 - $90,000 = $90,000. D\'s share = $90,000 × 1/3 = $30,000 adjustment to Land.'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the §743(b) adjustment allocated to Building.',
        correctAnswer: 70000,
        tolerance: 0,
        explanation: 'Building appreciation = $360,000 - $150,000 = $210,000. D\'s share = $210,000 × 1/3 = $70,000 adjustment to Building.'
      }
    ],
    hints: [
      '§754 election allows inside basis adjustment on transfers',
      '§743(b) adjustment = Outside basis - Share of inside basis',
      'Allocate adjustment to assets based on relative appreciation',
      'Adjustment is personal to the transferee partner'
    ]
  },
  {
    id: 'tcp-tbs-b2-006',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Qualified Small Business Stock (§1202)',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Individual Taxation',
    blueprintArea: 'TCP-I',
    scenario: `
Jennifer acquired stock in TechStart Inc. (C corporation) on January 15, Year 1:
• Acquisition: Original issue from corporation
• Purchase price: $500,000
• TechStart's gross assets at all times: Under $50 million

Jennifer sells the stock on March 20, Year 6:
• Sale price: $3,000,000
• Corporation was active business (technology) throughout holding period

Jennifer's other capital gains: $200,000 (LTCG from other sales)
Jennifer's taxable income: $450,000 (single)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the gain on sale.',
        correctAnswer: 2500000,
        tolerance: 0,
        explanation: 'Sale price $3,000,000 - Basis $500,000 = $2,500,000 gain.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Is the stock Qualified Small Business Stock (QSBS)?',
        options: ['Yes - meets all requirements', 'No - not held long enough', 'No - gross assets too high', 'Cannot determine'],
        correctAnswer: 0,
        explanation: 'QSBS requirements met: (1) C corporation, (2) acquired at original issuance, (3) gross assets < $50M, (4) active business, (5) held > 5 years (Jan Y1 to Mar Y6 = 5+ years).'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the maximum §1202 exclusion.',
        correctAnswer: 2500000,
        tolerance: 0,
        explanation: 'For stock acquired after 9/27/2010, exclusion = 100% of gain (up to greater of $10M or 10× basis). Maximum = $10M or $5M (10 × $500K). Gain of $2.5M is fully excludable.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Jennifer\'s taxable QSBS gain.',
        correctAnswer: 0,
        tolerance: 0,
        explanation: '100% exclusion applies. $2,500,000 × 100% = $2,500,000 excluded. Taxable = $0.'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate federal tax on the QSBS sale (ignoring other income).',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'No federal tax on excluded QSBS gain. The 100% exclusion results in $0 tax. (Note: Some states do not conform.)'
      }
    ],
    hints: [
      'QSBS: C corp, < $50M assets, original issue, active business, 5+ year hold',
      '100% exclusion for stock acquired after 9/27/2010',
      'Exclusion limit: Greater of $10M or 10× adjusted basis',
      '7% AMT preference eliminated for 100% exclusion stock'
    ]
  },
  {
    id: 'tcp-tbs-b2-007',
    section: 'TCP',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Entity Selection Comparison',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Entity Selection',
    blueprintArea: 'TCP-II',
    scenario: `
Client is starting a consulting business expecting:
• Year 1 net income: $200,000
• Self-employment tax concerns
• Plans to retain 50% of profits for growth
• Two equal 50% owners (both high-income)
• May seek venture capital in 3-5 years

Consider: Sole proprietorship, Partnership (LLC), S Corporation, C Corporation
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which entity best addresses self-employment tax concerns?',
        options: ['Sole proprietorship', 'Partnership', 'S Corporation', 'C Corporation'],
        correctAnswer: 2,
        explanation: 'S Corporation. Owner-employees receive salary (subject to FICA) and distributions (not subject to SE/FICA). "Reasonable compensation" is required, but remaining profits escape SE tax.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Which entity has the biggest disadvantage for retaining profits?',
        options: ['Sole proprietorship - taxed twice', 'Partnership - no entity-level tax', 'S Corporation - phantom income to owners', 'C Corporation - accumulated earnings tax risk'],
        correctAnswer: 2,
        explanation: 'S Corporation (and partnership). Pass-through entities tax owners on income whether distributed or not ("phantom income"). Retained profits still increase owner taxable income.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Which entity is most attractive for venture capital investment?',
        options: ['Sole proprietorship', 'Partnership', 'S Corporation', 'C Corporation'],
        correctAnswer: 3,
        explanation: 'C Corporation. VCs prefer C corps: (1) no pass-through income to tax-exempt investors, (2) can issue preferred stock, (3) easier path to IPO, (4) familiar structure.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What is the recommended initial structure?',
        options: ['Start as S Corp, convert to C Corp for VC', 'Start as C Corp from day one', 'Start as LLC taxed as partnership', 'Sole proprietorship for simplicity'],
        correctAnswer: 0,
        explanation: 'S Corp initially provides self-employment tax savings. Converting to C Corp before VC investment is straightforward. This approach optimizes early tax savings while maintaining flexibility.'
      }
    ],
    hints: [
      'SE tax: Sole prop and partnership = all income; S corp = wages only',
      'Retained earnings: Pass-throughs have phantom income issue',
      'VC investment: C corps strongly preferred',
      'Conversion: S to C is easy; C to S may trigger BIG tax'
    ]
  },
  {
    id: 'tcp-tbs-b2-008',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Charitable Remainder Trust Planning',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Estate Planning',
    blueprintArea: 'TCP-IV',
    scenario: `
Margaret (age 68) transfers appreciated stock to a Charitable Remainder Unitrust (CRUT):

Transfer:
• Stock FMV: $1,000,000
• Margaret's basis: $200,000

CRUT Terms:
• 6% annual payout to Margaret for life
• Remainder to charity at death
• §7520 rate: 4%

IRS factor for 6% CRUT, age 68: 0.35 (35% present value of remainder)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the charitable deduction for the transfer.',
        correctAnswer: 350000,
        tolerance: 0,
        explanation: 'FMV × PV factor = $1,000,000 × 0.35 = $350,000 charitable deduction.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the first year unitrust payment.',
        correctAnswer: 60000,
        tolerance: 0,
        explanation: 'FMV × payout rate = $1,000,000 × 6% = $60,000 (Year 1, assuming no change in trust value).'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'When Margaret transfers the stock to the trust, does she recognize gain?',
        options: ['Yes - $800,000 immediate gain', 'No - gain deferred until payments received', 'Partial recognition', 'Depends on charity status'],
        correctAnswer: 1,
        explanation: 'No immediate gain recognition. The gain ($800,000) is deferred and recognized proportionally as Margaret receives unitrust payments. The trust can sell the stock without triggering tax.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'How are unitrust payments taxed to Margaret?',
        options: ['All ordinary income', 'All capital gain', 'Four-tier system based on trust income', 'Tax-free return of principal'],
        correctAnswer: 2,
        explanation: 'Four-tier system: (1) Ordinary income first, (2) Capital gains, (3) Other income, (4) Return of principal. Payments carry out income in tier order.'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'If the trust sells the stock for $1,000,000, what is the trust\'s capital gain?',
        correctAnswer: 800000,
        tolerance: 0,
        explanation: 'Trust takes carryover basis ($200,000). Sale at $1,000,000 = $800,000 LTCG. The gain remains in the trust (tax-exempt entity) and is passed out to Margaret under the four-tier rules.'
      }
    ],
    hints: [
      'CRT = Tax-exempt trust (no tax on sale of appreciated assets)',
      'Deduction = FMV × PV factor for remainder interest',
      'Four-tier taxation: Ordinary → Capital gain → Other → Principal',
      'CRUT payout varies with trust value; CRAT is fixed'
    ]
  },
  {
    id: 'tcp-tbs-b2-009',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Installment Sale Reporting',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Property Transactions',
    blueprintArea: 'TCP-I',
    scenario: `
Robert sells investment land under an installment sale:

Sale Details:
• Sale price: $500,000
• Robert's adjusted basis: $200,000
• Selling expenses: $20,000
• Down payment received: $100,000
• Note receivable: $400,000 (8% interest, 4 annual payments)

Year 1: Received down payment + first installment of $100,000 (plus $32,000 interest)
Year 2: Received second installment of $100,000 (plus $24,000 interest)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the gross profit.',
        correctAnswer: 280000,
        tolerance: 0,
        explanation: 'Sale price $500,000 - Basis $200,000 - Selling expenses $20,000 = $280,000 gross profit.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the gross profit ratio.',
        correctAnswer: 56,
        tolerance: 1,
        explanation: 'Gross profit / Contract price = $280,000 / $500,000 = 56%'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Year 1 recognized gain.',
        correctAnswer: 112000,
        tolerance: 0,
        explanation: 'Payments received × GP ratio = ($100,000 + $100,000) × 56% = $112,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Year 1 interest income.',
        correctAnswer: 32000,
        tolerance: 0,
        explanation: 'Interest is reported separately from installment gain: $32,000 ordinary interest income.'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate Year 2 recognized gain.',
        correctAnswer: 56000,
        tolerance: 0,
        explanation: 'Year 2 principal payment $100,000 × 56% = $56,000 capital gain.'
      }
    ],
    hints: [
      'Gross profit = Sale price - Adjusted basis - Selling costs',
      'GP ratio = Gross profit / Contract price',
      'Each payment: Principal × GP ratio = Recognized gain',
      'Interest is ordinary income, separate from installment gain'
    ]
  },
  {
    id: 'tcp-tbs-b2-010',
    section: 'TCP',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Tax Penalty Avoidance',
    difficulty: 'medium',
    timeEstimate: 14,
    topic: 'Tax Compliance',
    blueprintArea: 'TCP-II',
    scenario: `
Review these client situations for potential penalties:

Client A: Individual estimated $50,000 tax liability. Prior year tax was $15,000. Client pays $15,000 in estimated taxes throughout year.

Client B: S Corporation fails to file Form 1120-S by March 15 (no extension). Files on June 1. Has 4 shareholders.

Client C: Corporation underpays estimated taxes by $100,000 for the year. The underpayment was due to a casualty loss that occurred in Q4.

Client D: Individual takes aggressive position on return that has 30% likelihood of success. No disclosure made.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Does Client A owe an underpayment penalty?',
        options: ['Yes - underpaid significantly', 'No - met 100% of prior year safe harbor', 'No - met 90% of current year', 'Depends on AGI'],
        correctAnswer: 1,
        explanation: 'No penalty. Client paid 100% of prior year tax ($15,000). This meets the safe harbor. (If prior year AGI > $150,000, need 110% of prior year.)'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Client B\'s late filing penalty for S Corporation.',
        correctAnswer: 2720,
        tolerance: 100,
        explanation: 'Penalty = $220 per shareholder per month (or fraction). 4 shareholders × $220 × 3 months (Mar 16-Jun 1 = ~2.5 months rounded up) = approximately $2,640-$2,860.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Can Client C use the annualized income method to reduce penalty?',
        options: ['Yes - if income was lower in early quarters', 'No - annualization never reduces penalty', 'Only if casualty was FEMA-declared', 'Only partnerships can use annualization'],
        correctAnswer: 0,
        explanation: 'Yes. If the casualty loss occurred in Q4, taxable income was higher in earlier quarters. Annualized income installment method may reduce or eliminate the underpayment penalty.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What penalty exposure does Client D have?',
        options: ['Accuracy-related penalty (20%)', 'Fraud penalty (75%)', 'No penalty - position is arguable', 'Negligence penalty only'],
        correctAnswer: 0,
        explanation: 'Accuracy-related penalty (20%) for substantial understatement. A 30% likelihood position does not meet "substantial authority" (generally 40%+) threshold. Disclosure with reasonable basis could avoid penalty.'
      }
    ],
    hints: [
      'Individual safe harbors: 90% current year OR 100%/110% prior year',
      'S Corp late filing: $220/shareholder/month',
      'Annualized income method helps when income bunches late',
      'Substantial authority (~40%) avoids penalty; reasonable basis (20%) with disclosure'
    ]
  }
];

export default TCP_TBS_BATCH2;
