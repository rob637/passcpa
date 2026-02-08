/**
 * EA SEE Part 1: Individuals - Questions Batch 45 (Q501-520)
 * Domain 5: Advising the Individual Taxpayer (NEW)
 * 
 * Tax Year: 2024-2025
 */

import { Question } from '../../../types';

export const SEE1_QUESTIONS_BATCH45: Question[] = [
  {
    id: 'see1-501',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Tax Planning',
    subtopic: 'Income Timing Strategies',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A self-employed taxpayer expects significantly higher income next year. Which strategy would you advise AGAINST for the current tax year?',
    options: [
      'Accelerating deductible expenses into the current year',
      'Deferring income to the next year when possible',
      'Maximizing retirement contributions in the current year',
      'Accelerating income recognition to the current year'
    ],
    correctAnswer: 3,
    explanation: 'If income is expected to be higher next year (pushing into higher brackets), you should AVOID accelerating income to the current year. Instead, defer income and accelerate deductions to balance tax liability across years.',
    reference: 'Tax Planning Principles'
  },
  {
    id: 'see1-502',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Retirement Planning',
    subtopic: 'Traditional vs Roth IRA',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A 30-year-old taxpayer in the 22% bracket expects to be in the 35% bracket at retirement. Which retirement vehicle provides the best tax advantage?',
    options: [
      'Traditional IRA for the current deduction',
      'Roth IRA for tax-free growth and withdrawals',
      'Non-deductible Traditional IRA',
      'Taxable brokerage account'
    ],
    correctAnswer: 1,
    explanation: 'When expecting to be in a HIGHER tax bracket at retirement, a Roth IRA is advantageous. Pay taxes now at 22% rather than at retirement at 35%. The tax-free growth and qualified withdrawals provide significant long-term benefits.',
    reference: 'IRC §408A'
  },
  {
    id: 'see1-503',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Education Tax Benefits',
    subtopic: 'AOC vs LLC',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A parent has a college freshman with $10,000 in tuition. Which education credit should you recommend first?',
    options: [
      'Lifetime Learning Credit for the full amount',
      'American Opportunity Tax Credit',
      'Tuition and Fees Deduction',
      'Education Savings Bond Exclusion'
    ],
    correctAnswer: 1,
    explanation: 'The American Opportunity Tax Credit (up to $2,500, 40% refundable) should be claimed first for undergraduates. It\'s more valuable than the LLC ($2,000 max, non-refundable) and covers first 4 years of college.',
    reference: 'IRC §25A'
  },
  {
    id: 'see1-504',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Health Savings Accounts',
    subtopic: 'HSA Triple Tax Advantage',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The "triple tax advantage" of Health Savings Accounts refers to:',
    options: [
      'Deductible contributions, tax-free growth, tax-free qualified withdrawals',
      'No income limit, no age limit, no contribution limit',
      'Federal, state, and local tax deductions',
      'Tax deduction, tax credit, and penalty waiver'
    ],
    correctAnswer: 0,
    explanation: 'HSAs provide a triple tax benefit: (1) contributions are deductible, (2) earnings grow tax-free, and (3) qualified medical withdrawals are tax-free. This makes HSAs one of the most tax-advantaged savings vehicles available.',
    reference: 'IRC §223'
  },
  {
    id: 'see1-505',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Health Savings Accounts',
    subtopic: 'HSA Contribution Limits',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For 2024, what is the HSA contribution limit for family coverage for a taxpayer under age 55?',
    options: [
      '$4,150',
      '$7,300',
      '$8,300',
      '$8,050'
    ],
    correctAnswer: 2,
    explanation: 'For 2024, the HSA contribution limit for family coverage is $8,300 ($4,150 for self-only). Those 55+ can add a $1,000 catch-up contribution.',
    reference: 'Rev. Proc. 2023-23'
  },
  {
    id: 'see1-506',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Penalty Avoidance',
    subtopic: 'Estimated Tax Safe Harbor',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer with $200,000 AGI last year wants to avoid underpayment penalties. The safe harbor requires paying at least:',
    options: [
      '90% of current year tax liability',
      '100% of prior year tax liability',
      '110% of prior year tax liability',
      '120% of prior year tax liability'
    ],
    correctAnswer: 2,
    explanation: 'High income taxpayers (AGI > $150,000, or $75,000 MFS) must pay 110% of prior year tax liability for the safe harbor, not the regular 100%. Alternatively, they can pay 90% of current year tax.',
    reference: 'IRC §6654(d)(1)(C)'
  },
  {
    id: 'see1-507',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Tax Planning',
    subtopic: 'Bunching Deductions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer\'s itemized deductions are slightly below the standard deduction each year. What strategy should you recommend?',
    options: [
      'Always take the standard deduction',
      'Bunch deductions by timing expenses to alternate years',
      'Stop making charitable contributions',
      'File an amended return for prior years'
    ],
    correctAnswer: 1,
    explanation: 'Bunching deductions involves timing discretionary expenses (like charitable contributions and medical expenses) into alternate years to exceed the standard deduction threshold. This maximizes the tax benefit of itemizing in some years.',
    reference: 'Tax Planning Strategies'
  },
  {
    id: 'see1-508',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Tax Planning',
    subtopic: 'Capital Gains Harvesting',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A married couple in the 0% capital gains bracket has unrealized gains of $50,000. What should you advise?',
    options: [
      'Hold investments to defer all taxes',
      'Sell enough to harvest gains taxed at 0% and reset basis',
      'Convert all to municipal bonds',
      'Gift the shares to charity immediately'
    ],
    correctAnswer: 1,
    explanation: 'When in the 0% capital gains bracket (taxable income up to $94,050 MFJ in 2024), it\'s advantageous to realize gains tax-free. This "gain harvesting" resets the cost basis to current market value, reducing future tax on appreciation.',
    reference: 'IRC §1(h)'
  },
  {
    id: 'see1-509',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Retirement Planning',
    subtopic: 'Required Minimum Distributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client is turning 73 in 2024. When must they take their first required minimum distribution?',
    options: [
      'By December 31, 2024',
      'By April 1, 2025',
      'By April 15, 2025',
      'By December 31, 2025'
    ],
    correctAnswer: 1,
    explanation: 'Under SECURE 2.0, the RMD age is 73 for those born 1951-1959. The first RMD can be delayed until April 1 of the year following the year the owner turns 73. However, delaying means taking two RMDs in the second year.',
    reference: 'IRC §401(a)(9); SECURE 2.0 Act'
  },
  {
    id: 'see1-510',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Education Tax Benefits',
    subtopic: '529 Plan Strategies',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'What is the maximum gift tax exclusion amount that can be contributed to a 529 plan using 5-year gift tax averaging in 2024?',
    options: [
      '$18,000 per beneficiary',
      '$36,000 per beneficiary',
      '$90,000 per beneficiary',
      '$180,000 per beneficiary'
    ],
    correctAnswer: 2,
    explanation: 'You can front-load 529 contributions using 5-year gift tax averaging: 5 × $18,000 (2024 annual exclusion) = $90,000 per grandparent or parent. A married couple can contribute $180,000 together with gift-splitting.',
    reference: 'IRC §529(c)(2)(B)'
  },
  {
    id: 'see1-511',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Penalty Avoidance',
    subtopic: 'Early Distribution Exceptions',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Which early distribution from an IRA is exempt from the 10% penalty but NOT penalty-free from a 401(k)?',
    options: [
      'Disability',
      'Medical expenses exceeding 7.5% of AGI',
      'First-time homebuyer (up to $10,000)',
      'Death of account owner'
    ],
    correctAnswer: 2,
    explanation: 'The first-time homebuyer exception ($10,000 lifetime) applies only to IRAs, not 401(k)s. Disability, excess medical expenses, and death apply to both IRAs and qualified plans.',
    reference: 'IRC §72(t)(2)'
  },
  {
    id: 'see1-512',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Tax Planning',
    subtopic: 'Roth Conversion Strategies',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When is a Roth IRA conversion MOST advantageous?',
    options: [
      'In years of unusually high income',
      'In years of unusually low income or losses',
      'Immediately before retirement',
      'After age 73 when RMDs begin'
    ],
    correctAnswer: 1,
    explanation: 'Roth conversions are most advantageous in low-income years when the marginal tax rate is lower than expected future rates. Examples include sabbaticals, temporary unemployment, or early retirement before Social Security begins.',
    reference: 'IRC §408A(d)(3)'
  },
  {
    id: 'see1-513',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Health Savings Accounts',
    subtopic: 'HSA Eligibility',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following disqualifies a taxpayer from contributing to an HSA?',
    options: [
      'Having a high-deductible health plan (HDHP)',
      'Being enrolled in Medicare',
      'Being under age 65',
      'Having an employer contribution to the HSA'
    ],
    correctAnswer: 1,
    explanation: 'Medicare enrollment disqualifies you from making HSA contributions. You can still use existing HSA funds for qualified expenses, but once you enroll in any Medicare coverage, new contributions are prohibited.',
    reference: 'IRC §223(b)(7)'
  },
  {
    id: 'see1-514',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Retirement Planning',
    subtopic: 'Self-Employed Retirement Plans',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A self-employed consultant earns $150,000 net self-employment income. What is the maximum SEP-IRA contribution?',
    options: [
      '$22,500',
      '$30,000',
      '$37,500',
      '$27,868'
    ],
    correctAnswer: 3,
    explanation: 'SEP-IRA max is 25% of net SE income after SE tax adjustment: $150,000 × 0.9235 = $138,525 adjusted; $138,525 × 20% effective rate = $27,705 (calculation varies slightly by method). The effective rate is ~20% because you must reduce by the deductible portion of SE tax.',
    reference: 'IRC §404(a)(8); §408(k)'
  },
  {
    id: 'see1-515',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Tax Planning',
    subtopic: 'Qualified Charitable Distributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A 75-year-old with a large IRA wants to donate $10,000 to charity. What is the most tax-efficient method?',
    options: [
      'Take an IRA distribution and donate cash',
      'Make a Qualified Charitable Distribution (QCD) directly to charity',
      'Donate appreciated stock from a brokerage account',
      'Use a donor-advised fund'
    ],
    correctAnswer: 1,
    explanation: 'A Qualified Charitable Distribution (QCD) allows IRA owners 70½+ to donate up to $105,000 directly to charity. The distribution is excluded from income (better than a deduction) and satisfies RMD requirements.',
    reference: 'IRC §408(d)(8); SECURE 2.0'
  },
  {
    id: 'see1-516',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Penalty Avoidance',
    subtopic: 'Excess IRA Contribution',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer contributed $8,000 to a Roth IRA but income limits allowed only $4,000. How should the excess be corrected to avoid penalties?',
    options: [
      'File an amended return for the prior year',
      'Withdraw the excess plus earnings before the tax filing deadline (including extensions)',
      'Wait until the following year to recharacterize',
      'Pay the 6% excise tax and leave the funds'
    ],
    correctAnswer: 1,
    explanation: 'Excess contributions can be withdrawn with allocable earnings by the tax filing deadline (including extensions) to avoid the 6% annual penalty. The earnings are taxable and may be subject to the 10% early withdrawal penalty.',
    reference: 'IRC §4973'
  },
  {
    id: 'see1-517',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Tax Planning',
    subtopic: 'Net Investment Income Tax Planning',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A taxpayer has MAGI of $250,000 (MFJ threshold) and $30,000 of net investment income. What strategies can reduce the 3.8% NIIT?',
    options: [
      'Only reducing MAGI below the threshold',
      'Reducing either MAGI below the threshold or reducing NII',
      'The NIIT cannot be reduced through planning',
      'Converting investments to municipal bonds only'
    ],
    correctAnswer: 1,
    explanation: 'NIIT is 3.8% on the LESSER of NII or excess MAGI over threshold. Reducing either helps: lower MAGI (retirement contributions, HSA) or reduce NII (tax-exempt bonds, installment sales, passive activity grouping).',
    reference: 'IRC §1411'
  },
  {
    id: 'see1-518',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Education Tax Benefits',
    subtopic: 'Student Loan Interest',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The maximum student loan interest deduction is:',
    options: [
      '$1,000',
      '$2,500',
      '$4,000',
      'Unlimited'
    ],
    correctAnswer: 1,
    explanation: 'The student loan interest deduction is limited to $2,500 per year. It\'s an above-the-line deduction (adjustment to income) that phases out at higher income levels. No itemizing required.',
    reference: 'IRC §221'
  },
  {
    id: 'see1-519',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Retirement Planning',
    subtopic: 'Backdoor Roth IRA',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A high-income taxpayer wants to fund a Roth IRA but exceeds the income limits. What approach should be recommended?',
    options: [
      'Contribute to a Traditional IRA (non-deductible) then convert to Roth',
      'It is not possible to fund any type of IRA above income limits',
      'Use a SEP-IRA instead',
      'Wait until income decreases'
    ],
    correctAnswer: 0,
    explanation: 'The "backdoor Roth" strategy involves contributing to a non-deductible Traditional IRA, then converting to Roth. There are no income limits on Traditional IRA contributions (just deductibility) or Roth conversions. The pro-rata rule applies if you have other Traditional IRA balances.',
    reference: 'IRC §408A(c)(3)(B)'
  },
  {
    id: 'see1-520',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Tax Planning',
    subtopic: 'AMT Planning',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A taxpayer is deep into AMT territory. Which deduction provides NO benefit under AMT?',
    options: [
      'Charitable contributions',
      'State and local taxes',
      'Mortgage interest on acquisition debt',
      'Medical expenses over 7.5% of AGI'
    ],
    correctAnswer: 1,
    explanation: 'State and local taxes (SALT) are NOT deductible under AMT. If deep in AMT, bunching SALT or accelerating payment provides no benefit. Charitable contributions, mortgage interest on acquisition debt, and medical expenses remain deductible for AMT.',
    reference: 'IRC §56(b)(1)(A)'
  }
];
