/**
 * CFP Item Sets
 * Short scenarios (1-2 paragraphs) with 3-4 linked questions
 * Matches actual CFP exam format
 */

import { CFPQuestion } from '../../../types';

export interface ItemSet {
  id: string;
  title: string;
  courseId: 'cfp';
  domain: string;
  scenario: string;
  questions: CFPQuestion[];
}

export const CFP_ITEM_SETS: ItemSet[] = [
  // ============================================
  // Item Set 1: Social Security Claiming
  // ============================================
  {
    id: 'IS-001',
    title: 'The Hendersons: Social Security Strategy',
    courseId: 'cfp',
    domain: 'RET',
    scenario: `Robert Henderson (62) and Susan Henderson (60) are planning their Social Security claiming strategy. Robert's PIA at Full Retirement Age (67) is $2,800/month. Susan's PIA is $1,400/month, but she would qualify for a spousal benefit of $1,400 based on Robert's record. Robert is in good health with a family history of longevity (parents lived to 90+). Susan has some health concerns. They have $1.2 million in retirement savings and Robert plans to continue consulting part-time through age 67. Their monthly expenses are $6,500.`,
    questions: [
      {
        id: 'IS-001-Q1',
        text: 'If Robert claims at 62 instead of 67, his benefit will be reduced by approximately:',
        options: [
          { id: 'A', text: '25% ($2,100/month)' },
          { id: 'B', text: '30% ($1,960/month)' },
          { id: 'C', text: '35% ($1,820/month)' },
          { id: 'D', text: '40% ($1,680/month)' }
        ],
        correctOptionId: 'B',
        explanation: 'Early claiming reduces benefits by 5/9 of 1% per month for the first 36 months early, plus 5/12 of 1% for additional months. At 62 (60 months early): First 36 months = 20%, next 24 months = 10%, total reduction = 30%. $2,800 × 0.70 = $1,960/month.',
        courseId: 'cfp',
        blueprintArea: 'RET-3',
        skillLevel: 'Application' as const
      },
      {
        id: 'IS-001-Q2',
        text: 'Given Robert\'s longevity expectations and continued earnings, the OPTIMAL claiming strategy is:',
        options: [
          { id: 'A', text: 'Both claim at 62 to maximize early income' },
          { id: 'B', text: 'Robert delays to 70, Susan claims at 62' },
          { id: 'C', text: 'Robert claims at 67, Susan claims spousal at 67' },
          { id: 'D', text: 'Susan claims at 62, Robert at 70 for maximum survivor benefit' }
        ],
        correctOptionId: 'D',
        explanation: 'Given Robert\'s excellent health and longevity expectations, delaying to 70 maximizes his benefit (32% increase to $3,696) AND maximizes Susan\'s survivor benefit. Since Susan has health concerns, claiming her own benefit early makes sense. When Robert dies, Susan will step up to his higher benefit.',
        courseId: 'cfp',
        blueprintArea: 'RET-3',
        skillLevel: 'Evaluation' as const
      },
      {
        id: 'IS-001-Q3',
        text: 'If Robert continues consulting and earns $60,000 in 2026 while claiming at 62, his Social Security benefit will be:',
        options: [
          { id: 'A', text: 'Fully paid since he\'s past age 62' },
          { id: 'B', text: 'Reduced by $1 for every $2 over the earnings limit' },
          { id: 'C', text: 'Completely suspended until he stops working' },
          { id: 'D', text: 'Taxed at 85% but fully paid' }
        ],
        correctOptionId: 'B',
        explanation: 'Before Full Retirement Age, the earnings test reduces benefits by $1 for every $2 earned above the annual limit ($23,400 in 2026). Excess earnings: $60,000 - $23,400 = $36,600. Benefit reduction: $36,600 / 2 = $18,300/year = $1,525/month. This would eliminate most or all of his $1,960 monthly benefit.',
        courseId: 'cfp',
        blueprintArea: 'RET-3',
        skillLevel: 'Application' as const
      },
      {
        id: 'IS-001-Q4',
        text: 'What is Susan\'s maximum spousal benefit if she waits until her FRA (67) to claim?',
        options: [
          { id: 'A', text: '50% of Robert\'s PIA = $1,400' },
          { id: 'B', text: '50% of Robert\'s age-70 benefit = $1,848' },
          { id: 'C', text: 'Her own PIA of $1,400' },
          { id: 'D', text: '100% of Robert\'s benefit as survivor' }
        ],
        correctOptionId: 'A',
        explanation: 'Spousal benefits are always based on 50% of the worker\'s PIA, NOT their actual benefit. Even if Robert delays to 70 and receives $3,696, Susan\'s spousal benefit is capped at 50% of his PIA ($2,800 × 50% = $1,400). Robert\'s delayed credits only increase HIS benefit and the eventual SURVIVOR benefit.',
        courseId: 'cfp',
        blueprintArea: 'RET-3',
        skillLevel: 'Analysis' as const
      }
    ]
  },

  // ============================================
  // Item Set 2: Roth Conversion Analysis
  // ============================================
  {
    id: 'IS-002',
    title: 'Dr. Patel: Roth Conversion Decision',
    courseId: 'cfp',
    domain: 'TAX',
    scenario: `Dr. Aisha Patel (58) is a physician who recently reduced her practice to part-time, dropping her income from $400,000 to $120,000. She has a traditional IRA worth $1.8 million and a Roth IRA worth $200,000. She plans to return to full-time practice in 3 years when her youngest graduates college, projecting income will return to $350,000+. Her current marginal tax bracket is 24%, but she expects to be in the 35% bracket when working full-time and 32% in retirement. She has $75,000 in taxable savings available.`,
    questions: [
      {
        id: 'IS-002-Q1',
        text: 'The primary tax advantage of converting to Roth during this lower-income period is:',
        options: [
          { id: 'A', text: 'Avoiding the 10% early withdrawal penalty' },
          { id: 'B', text: 'Paying tax at 24% now vs. 32% in retirement' },
          { id: 'C', text: 'Eliminating Required Minimum Distributions' },
          { id: 'D', text: 'All of the above' }
        ],
        correctOptionId: 'B',
        explanation: 'While all benefits exist, the PRIMARY advantage is the rate arbitrage: paying 24% tax now instead of 32% later on the same dollars. The 10% penalty doesn\'t apply to conversions at any age. RMD elimination is a benefit but secondary to the 8 percentage point tax savings.',
        courseId: 'cfp',
        blueprintArea: 'TAX-2',
        skillLevel: 'Analysis' as const
      },
      {
        id: 'IS-002-Q2',
        text: 'How much can Dr. Patel convert and stay within the 24% bracket (2026 MFJ top of 24% bracket: $394,600)?',
        options: [
          { id: 'A', text: 'Approximately $163,900' },
          { id: 'B', text: 'Approximately $274,600' },
          { id: 'C', text: 'Approximately $230,000' },
          { id: 'D', text: 'No additional conversion without jumping brackets' }
        ],
        correctOptionId: 'B',
        explanation: 'Current income: $120,000. Top of 24% bracket: $394,600. Room for conversion: $394,600 - $120,000 = $274,600. She could convert up to approximately $275,000 and stay entirely within the 24% bracket, making this an opportune window.',
        courseId: 'cfp',
        blueprintArea: 'TAX-2',
        skillLevel: 'Application' as const
      },
      {
        id: 'IS-002-Q3',
        text: 'If Dr. Patel converts $200,000, the federal tax liability on the conversion is approximately:',
        options: [
          { id: 'A', text: '$48,000' },
          { id: 'B', text: '$44,000' },
          { id: 'C', text: '$64,000' },
          { id: 'D', text: '$70,000' }
        ],
        correctOptionId: 'A',
        explanation: 'The $200,000 conversion is fully within the 24% bracket since her income ($120,000) plus conversion ($200,000) = $320,000, which is below the bracket threshold ($394,600). Tax = $200,000 × 24% = $48,000. She should use outside funds ($75,000 available) to pay, not IRA funds.',
        courseId: 'cfp',
        blueprintArea: 'TAX-2',
        skillLevel: 'Application' as const
      },
      {
        id: 'IS-002-Q4',
        text: 'A key risk of doing large Roth conversions in this period is:',
        options: [
          { id: 'A', text: 'IRMAA surcharges on Medicare premiums' },
          { id: 'B', text: 'The 5-year holding rule for conversions' },
          { id: 'C', text: 'Loss of tax deduction for Roth contributions' },
          { id: 'D', text: 'Triggering the Net Investment Income Tax' }
        ],
        correctOptionId: 'A',
        explanation: 'IRMAA (Income-Related Monthly Adjustment Amount) increases Medicare premiums for high earners. At age 58, Dr. Patel will be on Medicare soon. A $200K+ income spike could increase her Part B and Part D premiums by thousands per year for 2 years (2-year lookback). The conversion should be sized to consider IRMAA thresholds.',
        courseId: 'cfp',
        blueprintArea: 'TAX-2',
        skillLevel: 'Evaluation' as const
      }
    ]
  },

  // ============================================
  // Item Set 3: Estate Liquidity
  // ============================================
  {
    id: 'IS-003',
    title: 'The Chen Estate: Liquidity Planning',
    courseId: 'cfp',
    domain: 'EST',
    scenario: `William Chen (72) passed away leaving an estate of $18 million. His assets include: a family business (S-Corp) valued at $12 million with basis of $800,000; primary residence ($2 million); investment accounts ($2.5 million); and life insurance ($1.5 million with his wife as beneficiary). His wife Linda (68) is the primary beneficiary of everything except the business, which goes equally to their three adult children. The estate tax exemption is $7.0 million (2026 - TCJA sunset). Linda used $3 million of her own exemption previously for lifetime gifts.`,
    questions: [
      {
        id: 'IS-003-Q1',
        text: 'What is the approximate federal estate tax due on William\'s estate?',
        options: [
          { id: 'A', text: '$0 due to portability' },
          { id: 'B', text: '$2,400,000' },
          { id: 'C', text: '$3,200,000' },
          { id: 'D', text: '$4,000,000' }
        ],
        correctOptionId: 'C',
        explanation: 'Taxable estate = $18M. Marital deduction applies only to assets passing to Linda (residence $2M + investments $2.5M). Business ($12M) to children is taxable. Life insurance to Linda qualifies for marital deduction. With the 2026 TCJA sunset, exemption is $7.0M per person. Taxable amount subject to estate tax after exemption: Estate tax on business transfer to children ~$12M - $7.0M exemption = $5M taxable at 40% = ~$2,000,000. Plus additional estate complexity. Total estate tax approximately $3.2M.',
        courseId: 'cfp',
        blueprintArea: 'EST-4',
        skillLevel: 'Application' as const
      },
      {
        id: 'IS-003-Q2',
        text: 'The estate faces a significant liquidity problem because:',
        options: [
          { id: 'A', text: 'Life insurance proceeds are taxable income' },
          { id: 'B', text: 'The major asset (business) is illiquid and taxes are due in 9 months' },
          { id: 'C', text: 'Investment accounts are in retirement plans with 10% penalty' },
          { id: 'D', text: 'The residence cannot be sold' }
        ],
        correctOptionId: 'B',
        explanation: 'The $12M business cannot easily be sold or liquidated in 9 months to pay estate taxes. The life insurance ($1.5M) goes to Linda (not estate), and investment accounts ($2.5M) may be needed for Linda\'s support. This is the classic "land rich, cash poor" estate problem requiring planning.',
        courseId: 'cfp',
        blueprintArea: 'EST-4',
        skillLevel: 'Analysis' as const
      },
      {
        id: 'IS-003-Q3',
        text: 'What IRS provision might help defer estate taxes on the business?',
        options: [
          { id: 'A', text: 'IRC §6166 installment payment of estate tax' },
          { id: 'B', text: 'IRC §303 stock redemption' },
          { id: 'C', text: 'IRC §2032A special use valuation' },
          { id: 'D', text: 'All of the above could apply' }
        ],
        correctOptionId: 'A',
        explanation: 'IRC §6166 allows estates with closely-held business interests exceeding 35% of the adjusted gross estate to pay estate tax in installments over up to 14 years (4-year deferral + 10-year payment). The business is 67% of the estate, easily qualifying. §303 helps with redemptions to pay taxes; §2032A is for family farms/real property.',
        courseId: 'cfp',
        blueprintArea: 'EST-4',
        skillLevel: 'Remembering and Understanding' as const
      },
      {
        id: 'IS-003-Q4',
        text: 'How could William have BETTER planned for this liquidity need?',
        options: [
          { id: 'A', text: 'Own life insurance in an ILIT to provide tax-free estate liquidity' },
          { id: 'B', text: 'Gift business interests annually to reduce estate size' },
          { id: 'C', text: 'Establish a buy-sell agreement funded with life insurance' },
          { id: 'D', text: 'All of the above' }
        ],
        correctOptionId: 'D',
        explanation: 'All strategies would help: (1) ILIT-owned life insurance provides estate liquidity without being included in the taxable estate; (2) Annual gifts of business interests (with valuation discounts) reduce the estate; (3) Buy-sell funded by insurance provides liquidity AND establishes value. Comprehensive planning uses multiple strategies.',
        courseId: 'cfp',
        blueprintArea: 'EST-3',
        skillLevel: 'Evaluation' as const
      }
    ]
  },

  // ============================================
  // Item Set 4: Disability Insurance Gap
  // ============================================
  {
    id: 'IS-004',
    title: 'Marcus Williams: Disability Coverage Analysis',
    courseId: 'cfp',
    domain: 'RISK',
    scenario: `Marcus Williams (42) is a self-employed financial analyst earning $180,000 annually. He has an individual disability policy from 5 years ago with a $6,000/month benefit, 90-day elimination period, own-occupation definition, and benefits to age 65. His current monthly expenses are $9,500, including $2,200 mortgage, $1,500 for his children's activities, and $800 in debt payments. His spouse Amanda works part-time earning $35,000. They have $40,000 in emergency savings and $425,000 in retirement accounts.`,
    questions: [
      {
        id: 'IS-004-Q1',
        text: 'Marcus\'s current disability income gap is:',
        options: [
          { id: 'A', text: 'No gap - $6,000/month covers basic needs' },
          { id: 'B', text: '$3,500/month shortfall' },
          { id: 'C', text: '$500/month shortfall after spouse income' },
          { id: 'D', text: '$6,417/month shortfall' }
        ],
        correctOptionId: 'C',
        explanation: 'Monthly need: $9,500. Disability benefit: $6,000. Spouse income: $35,000/12 = $2,917/month net (assume ~$2,500 after taxes). Total income: $6,000 + $2,500 = $8,500. Gap: $9,500 - $8,500 = ~$1,000, or closer to $500 with expense adjustments. The family can likely manage with minor lifestyle changes.',
        courseId: 'cfp',
        blueprintArea: 'RISK-3',
        skillLevel: 'Application' as const
      },
      {
        id: 'IS-004-Q2',
        text: 'The "own-occupation" definition in Marcus\'s policy means:',
        options: [
          { id: 'A', text: 'He must be unable to work at any occupation' },
          { id: 'B', text: 'He receives benefits if unable to work as a financial analyst specifically' },
          { id: 'C', text: 'He can only receive benefits if self-employed' },
          { id: 'D', text: 'Benefits are reduced by Social Security disability' }
        ],
        correctOptionId: 'B',
        explanation: 'True own-occupation means Marcus is disabled if he cannot perform the material duties of HIS specific occupation (financial analyst), even if he could work in another capacity. This is the most favorable definition. He could theoretically teach or do something else and still collect full benefits if he cannot analyze finances.',
        courseId: 'cfp',
        blueprintArea: 'RISK-3',
        skillLevel: 'Remembering and Understanding' as const
      },
      {
        id: 'IS-004-Q3',
        text: 'If Marcus becomes disabled, his 90-day elimination period means:',
        options: [
          { id: 'A', text: 'He receives reduced benefits for the first 90 days' },
          { id: 'B', text: 'He receives no benefits until after 90 days of disability' },
          { id: 'C', text: 'His policy terminates after 90 days' },
          { id: 'D', text: 'He must wait 90 days before filing a claim' }
        ],
        correctOptionId: 'B',
        explanation: 'The elimination period is a waiting period (like a deductible measured in time). Marcus receives $0 for the first 90 days. Cost during elimination: 3 months × $9,500 = $28,500. His $40,000 emergency fund covers this with room to spare. After 90 days, benefits begin.',
        courseId: 'cfp',
        blueprintArea: 'RISK-3',
        skillLevel: 'Remembering and Understanding' as const
      },
      {
        id: 'IS-004-Q4',
        text: 'Given his income increase since purchasing the policy, Marcus should consider:',
        options: [
          { id: 'A', text: 'Dropping the policy since he has adequate savings' },
          { id: 'B', text: 'Exercising a guaranteed insurability rider for additional coverage' },
          { id: 'C', text: 'Switching to a group policy for higher limits' },
          { id: 'D', text: 'Converting to a short-term disability policy' }
        ],
        correctOptionId: 'B',
        explanation: 'His income has grown from possibly $144,000 (when $6,000 = 50% coverage) to $180,000. If his policy has a guaranteed insurability rider, he can add coverage without new underwriting—valuable since 5 years have passed and health may have changed. He should increase to ~$7,500-$9,000/month (50-60% of income) if permitted.',
        courseId: 'cfp',
        blueprintArea: 'RISK-3',
        skillLevel: 'Evaluation' as const
      }
    ]
  },

  // ============================================
  // Item Set 5: Education Funding
  // ============================================
  {
    id: 'IS-005',
    title: 'The Garcias: College Funding Strategy',
    courseId: 'cfp',
    domain: 'GEN',
    scenario: `Maria and Carlos Garcia have twins Sofia and Diego (age 8). They want to fund 4 years at a public university, currently costing $28,000/year including room and board. They assume 5% annual education inflation and a 6% investment return. They have started a 529 plan with $15,000 and can save $500/month. The parents' AGI is $165,000, and they want to understand financial aid implications.`,
    questions: [
      {
        id: 'IS-005-Q1',
        text: 'At age 18 with 5% education inflation, the projected first-year cost is approximately:',
        options: [
          { id: 'A', text: '$42,000' },
          { id: 'B', text: '$46,000' },
          { id: 'C', text: '$52,000' },
          { id: 'D', text: '$58,000' }
        ],
        correctOptionId: 'B',
        explanation: 'FV = $28,000 × (1.05)^10 = $28,000 × 1.6289 = $45,609, approximately $46,000. Over 4 years of college with continued inflation, total cost will be even higher. Year 1: $46K, Year 2: $48K, Year 3: $51K, Year 4: $53K = approximately $198,000 per child.',
        courseId: 'cfp',
        blueprintArea: 'GEN-4',
        skillLevel: 'Application' as const
      },
      {
        id: 'IS-005-Q2',
        text: 'With $15,000 now and $500/month for 10 years at 6%, the projected 529 balance is approximately:',
        options: [
          { id: 'A', text: '$85,000' },
          { id: 'B', text: '$109,000' },
          { id: 'C', text: '$125,000' },
          { id: 'D', text: '$145,000' }
        ],
        correctOptionId: 'B',
        explanation: 'Two components: (1) Current $15,000 growing: $15,000 × (1.06)^10 = $26,863. (2) Monthly $500 for 120 months: FV of annuity at 0.5%/month = $500 × [((1.005)^120 - 1) / 0.005] = $81,940. Total: $26,863 + $81,940 = $108,803, approximately $109,000.',
        courseId: 'cfp',
        blueprintArea: 'GEN-4',
        skillLevel: 'Application' as const
      },
      {
        id: 'IS-005-Q3',
        text: 'If the 529 plan is parent-owned, how is it treated for FAFSA purposes?',
        options: [
          { id: 'A', text: 'Not reported as an asset' },
          { id: 'B', text: 'Counted as a parent asset at 5.64% rate' },
          { id: 'C', text: 'Counted as a student asset at 20% rate' },
          { id: 'D', text: 'Reduces eligibility dollar-for-dollar' }
        ],
        correctOptionId: 'B',
        explanation: 'Parent-owned 529s are reported as parent assets and assessed at a maximum 5.64% toward Expected Family Contribution (EFC). A $100,000 529 reduces aid eligibility by approximately $5,640. This is much more favorable than student assets (20%) or student income (50%).',
        courseId: 'cfp',
        blueprintArea: 'GEN-4',
        skillLevel: 'Remembering and Understanding' as const
      },
      {
        id: 'IS-005-Q4',
        text: 'With twins starting college the same year, the Garcias should consider:',
        options: [
          { id: 'A', text: 'Having grandparents own separate 529s for each child' },
          { id: 'B', text: 'Requesting increased financial aid due to multiple students enrolled' },
          { id: 'C', text: 'Splitting the 529 between both children' },
          { id: 'D', text: 'Both B and C' }
        ],
        correctOptionId: 'D',
        explanation: 'Two strategies help: (1) FAFSA calculates EFC differently when multiple children attend—the parent contribution is split, potentially providing more aid. (2) 529 funds should be strategically allocated between twins. One large 529 can be used for either child. The FAFSA Simplification Act changed grandparent 529 treatment favorably (no longer counted as student income).',
        courseId: 'cfp',
        blueprintArea: 'GEN-4',
        skillLevel: 'Evaluation' as const
      }
    ]
  },

  // ============================================
  // Item Set 6: Investment Risk Assessment
  // ============================================
  {
    id: 'IS-006',
    title: 'The Nguyens: Portfolio Risk Review',
    courseId: 'cfp',
    domain: 'INV',
    scenario: `Tom Nguyen (55) and Lisa Nguyen (52) are reviewing their portfolio allocation before Tom's planned retirement at 62. Their current portfolio is $850,000: 70% large-cap growth stocks, 15% international stocks, 10% high-yield bonds, and 5% cash. The portfolio's beta is 1.15 and standard deviation is 18%. They need $60,000/year from the portfolio starting at retirement. Tom says he can "handle volatility" but Lisa worries about losing money right before retirement.`,
    questions: [
      {
        id: 'IS-006-Q1',
        text: 'The portfolio beta of 1.15 indicates:',
        options: [
          { id: 'A', text: 'The portfolio will return 15% more than the market annually' },
          { id: 'B', text: 'The portfolio has 15% less risk than the market' },
          { id: 'C', text: 'The portfolio is expected to move 15% more than the market in either direction' },
          { id: 'D', text: 'The portfolio has 1.15% systematic risk' }
        ],
        correctOptionId: 'C',
        explanation: 'Beta measures systematic (market) risk. A beta of 1.15 means the portfolio is expected to move 115% of the market\'s movement. If the market drops 10%, this portfolio would be expected to drop approximately 11.5%. This amplifies both gains and losses relative to the market.',
        courseId: 'cfp',
        blueprintArea: 'INV-2',
        skillLevel: 'Remembering and Understanding' as const
      },
      {
        id: 'IS-006-Q2',
        text: 'With an 18% standard deviation and normal distribution, there is approximately a 95% probability that annual returns will fall within:',
        options: [
          { id: 'A', text: '-18% to +18%' },
          { id: 'B', text: '-36% to +36%' },
          { id: 'C', text: '-28% to +44% (assuming 8% expected return)' },
          { id: 'D', text: '0% to +36%' }
        ],
        correctOptionId: 'C',
        explanation: '95% of outcomes fall within ±2 standard deviations. Assuming an 8% expected return: Lower bound = 8% - 36% = -28%. Upper bound = 8% + 36% = +44%. This means in a very bad year, the $850,000 portfolio could lose approximately $238,000—potentially dropping to $612,000.',
        courseId: 'cfp',
        blueprintArea: 'INV-2',
        skillLevel: 'Application' as const
      },
      {
        id: 'IS-006-Q3',
        text: 'Lisa\'s concern about losing money before retirement reflects:',
        options: [
          { id: 'A', text: 'Irrational behavior that should be ignored' },
          { id: 'B', text: 'Valid sequence-of-returns risk with a 7-year horizon' },
          { id: 'C', text: 'Excessive risk aversion' },
          { id: 'D', text: 'Misunderstanding of standard deviation' }
        ],
        correctOptionId: 'B',
        explanation: 'Sequence-of-returns risk is highest in the years immediately before and after retirement. Poor returns early in retirement (or just before) have a disproportionate negative impact on portfolio longevity. Lisa\'s concern is valid—a 28% loss 2 years before retirement would be devastating. This calls for gradual de-risking.',
        courseId: 'cfp',
        blueprintArea: 'INV-2',
        skillLevel: 'Analysis' as const
      },
      {
        id: 'IS-006-Q4',
        text: 'An appropriate recommendation for the Nguyens would be:',
        options: [
          { id: 'A', text: 'Increase equity allocation to grow the portfolio faster' },
          { id: 'B', text: 'Shift to a 50/50 stock/bond allocation immediately' },
          { id: 'C', text: 'Create a bond/cash bucket to cover 3-5 years of withdrawals while maintaining growth assets' },
          { id: 'D', text: 'Move entirely to annuities for guaranteed income' }
        ],
        correctOptionId: 'C',
        explanation: 'A bucket strategy addresses sequence risk by: (1) Setting aside 3-5 years\' expenses ($180K-$300K) in bonds/cash—safe from market volatility; (2) Maintaining equity allocation for growth to combat inflation. This balances Lisa\'s safety concerns with long-term growth needs for a potentially 30+ year retirement.',
        courseId: 'cfp',
        blueprintArea: 'INV-3',
        skillLevel: 'Evaluation' as const
      }
    ]
  }
];

export default CFP_ITEM_SETS;
