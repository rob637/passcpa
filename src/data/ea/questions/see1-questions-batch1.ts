/**
 * EA SEE Part 1: Individuals - Questions Batch 1 (Q1-25)
 * 
 * Blueprint Areas:
 * - SEE1-1: Preliminary Work and Taxpayer Data (15-20%)
 * - SEE1-2: Income and Assets (20-25%)
 * - SEE1-3: Deductions and Adjustments (20-25%)
 * - SEE1-4: Taxation and Advice (15-20%)
 * - SEE1-5: Credits (15-20%)
 * - SEE1-6: Specialized Returns (10-15%)
 */

import { Question } from '../../../types';

export const SEE1_QUESTIONS_BATCH1: Question[] = [
  // ==========================================
  // SEE1-1: Preliminary Work and Taxpayer Data
  // ==========================================
  {
    id: 'see1-001',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Requirements',
    subtopic: 'Who Must File',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'For 2025, a single taxpayer under age 65 must file a federal income tax return if their gross income is at least:',
    options: [
      '$13,850',
      '$14,600',
      '$15,700',
      '$27,700'
    ],
    correctAnswer: 1,
    explanation: 'For 2025, a single taxpayer under age 65 must file if gross income is at least $14,600, which equals the standard deduction for single filers. This threshold is adjusted annually for inflation.',
    reference: 'IRC §6012; IRS Publication 501',
  },
  {
    id: 'see1-002',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Status',
    subtopic: 'Head of Household',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Maria is unmarried and pays more than half the cost of maintaining a home for her 19-year-old son who is a full-time college student and has no income. What is Maria\'s filing status?',
    options: [
      'Single',
      'Head of Household',
      'Qualifying Surviving Spouse',
      'Married Filing Separately'
    ],
    correctAnswer: 1,
    explanation: 'Maria qualifies for Head of Household status because she is unmarried, pays more than half the cost of maintaining a home, and her son is a qualifying child (under 24 and a full-time student). The son lives in the home and Maria can claim him as a dependent.',
    reference: 'IRC §2(b); IRS Publication 501',
  },
  {
    id: 'see1-003',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Dependents',
    subtopic: 'Qualifying Child Tests',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following is NOT a requirement for a child to be claimed as a qualifying child?',
    options: [
      'The child must be younger than the taxpayer',
      'The child must have the same principal residence as the taxpayer for more than half the year',
      'The child must provide more than half of their own support',
      'The child must be under age 19, or under 24 if a full-time student'
    ],
    correctAnswer: 2,
    explanation: 'For qualifying child status, the CHILD must NOT provide more than half of their own support (the support test). The taxpayer providing support is a requirement for qualifying RELATIVES, not qualifying children. Options A, B, and D are actual requirements.',
    reference: 'IRC §152(c); IRS Publication 501',
  },
  {
    id: 'see1-004',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Taxpayer Identification',
    subtopic: 'ITIN',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'An Individual Taxpayer Identification Number (ITIN) is issued to:',
    options: [
      'U.S. citizens who have lost their Social Security card',
      'Individuals who are not eligible for a Social Security Number but need to file a tax return',
      'Employers for payroll tax purposes',
      'Tax preparers for identification purposes'
    ],
    correctAnswer: 1,
    explanation: 'ITINs are issued by the IRS to individuals who are required to have a U.S. taxpayer identification number but who are not eligible to obtain a Social Security Number (SSN) from the Social Security Administration. This includes nonresident aliens and resident aliens.',
    reference: 'IRS Publication 1915',
  },
  {
    id: 'see1-005',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Status',
    subtopic: 'Married Filing Jointly',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'John and Lisa were married on December 31, 2025. For tax year 2025, they may file as:',
    options: [
      'Single only, since they were married on the last day of the year',
      'Married Filing Jointly or Married Filing Separately',
      'Head of Household',
      'Single or Married Filing Separately'
    ],
    correctAnswer: 1,
    explanation: 'Marital status is determined as of the last day of the tax year. Since John and Lisa were legally married on December 31, 2025, they are considered married for the entire year and can file as Married Filing Jointly or Married Filing Separately.',
    reference: 'IRC §7703; IRS Publication 501',
  },

  // ==========================================
  // SEE1-2: Income and Assets
  // ==========================================
  {
    id: 'see1-006',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Wages and Compensation',
    subtopic: 'Form W-2',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which box on Form W-2 shows the total federal income tax withheld from an employee\'s wages?',
    options: [
      'Box 1',
      'Box 2',
      'Box 3',
      'Box 4'
    ],
    correctAnswer: 1,
    explanation: 'Box 2 of Form W-2 shows the total federal income tax withheld from the employee\'s wages. Box 1 shows wages, tips, and other compensation. Box 3 shows Social Security wages, and Box 4 shows Social Security tax withheld.',
    reference: 'Form W-2 Instructions',
  },
  {
    id: 'see1-007',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Interest Income',
    subtopic: 'Tax-Exempt Interest',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Sarah received $500 in interest from municipal bonds and $300 in interest from a savings account. How much interest income must Sarah report on her federal tax return?',
    options: [
      '$0',
      '$300',
      '$500',
      '$800'
    ],
    correctAnswer: 1,
    explanation: 'Municipal bond interest is generally exempt from federal income tax. Only the $300 in interest from the savings account is taxable and must be reported. The $500 in municipal bond interest is reported on the return but is not included in taxable income.',
    reference: 'IRC §103; IRS Publication 550',
  },
  {
    id: 'see1-008',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Dividend Income',
    subtopic: 'Qualified Dividends',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Qualified dividends are taxed at:',
    options: [
      'Ordinary income tax rates',
      'Preferential capital gains rates (0%, 15%, or 20%)',
      'A flat 28% rate',
      'Self-employment tax rates'
    ],
    correctAnswer: 1,
    explanation: 'Qualified dividends are taxed at preferential long-term capital gains rates of 0%, 15%, or 20%, depending on the taxpayer\'s taxable income. To be qualified, dividends must be paid by a U.S. corporation or qualified foreign corporation, and the holding period requirement must be met.',
    reference: 'IRC §1(h)(11); IRS Publication 550',
  },
  {
    id: 'see1-009',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Capital Gains',
    subtopic: 'Holding Period',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'To qualify for long-term capital gains treatment, an asset must be held for:',
    options: [
      'At least 6 months',
      'More than 12 months',
      'At least 18 months',
      'More than 24 months'
    ],
    correctAnswer: 1,
    explanation: 'To qualify for long-term capital gains treatment, an asset must be held for MORE than 12 months (not 12 months exactly). Assets held for 12 months or less are considered short-term and taxed at ordinary income rates.',
    reference: 'IRC §1222; IRS Publication 544',
  },
  {
    id: 'see1-010',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Retirement Income',
    subtopic: 'Traditional IRA Distributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Tom, age 58, takes a $10,000 distribution from his traditional IRA. He has made no nondeductible contributions. What is the tax consequence?',
    options: [
      '$10,000 is taxable as ordinary income plus a 10% early withdrawal penalty',
      '$10,000 is tax-free',
      '$10,000 is taxed at capital gains rates',
      '$10,000 is taxable as ordinary income with no penalty'
    ],
    correctAnswer: 0,
    explanation: 'Distributions from a traditional IRA funded with deductible contributions are fully taxable as ordinary income. Since Tom is under age 59½, he also owes a 10% early withdrawal penalty ($1,000) unless an exception applies.',
    reference: 'IRC §72(t); IRS Publication 590-B',
  },

  // ==========================================
  // SEE1-3: Deductions and Adjustments
  // ==========================================
  {
    id: 'see1-011',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Standard Deduction',
    subtopic: 'Standard vs. Itemized',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'For 2025, the standard deduction for a married couple filing jointly is:',
    options: [
      '$14,600',
      '$21,900',
      '$29,200',
      '$30,000'
    ],
    correctAnswer: 2,
    explanation: 'For 2025, the standard deduction for married filing jointly is $29,200. This is double the single filer amount of $14,600. Taxpayers age 65 or older or blind receive an additional standard deduction amount.',
    reference: 'IRC §63(c); Rev. Proc. 2024-40',
  },
  {
    id: 'see1-012',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Adjustments to Income',
    subtopic: 'Student Loan Interest',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Lisa paid $3,500 in student loan interest during 2025. Her modified AGI is below the phase-out threshold. What is the maximum amount she can deduct as an adjustment to income?',
    options: [
      '$1,000',
      '$2,500',
      '$3,500',
      '$4,000'
    ],
    correctAnswer: 1,
    explanation: 'The student loan interest deduction is limited to $2,500 per year, regardless of the amount actually paid. This is an "above-the-line" deduction (adjustment to income), so taxpayers can claim it even if they don\'t itemize.',
    reference: 'IRC §221; IRS Publication 970',
  },
  {
    id: 'see1-013',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Itemized Deductions',
    subtopic: 'Medical Expenses',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Mark has an AGI of $80,000 and paid $8,000 in unreimbursed medical expenses. What amount can he deduct as an itemized deduction?',
    options: [
      '$0',
      '$2,000',
      '$6,000',
      '$8,000'
    ],
    correctAnswer: 1,
    explanation: 'Medical expenses are deductible only to the extent they exceed 7.5% of AGI. 7.5% of $80,000 = $6,000. Since Mark paid $8,000, he can deduct $8,000 - $6,000 = $2,000 as an itemized deduction.',
    reference: 'IRC §213; IRS Publication 502',
  },
  {
    id: 'see1-014',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Itemized Deductions',
    subtopic: 'State and Local Taxes',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'What is the maximum amount of state and local taxes (SALT) that can be deducted as an itemized deduction?',
    options: [
      '$5,000',
      '$10,000',
      '$15,000',
      'There is no limit'
    ],
    correctAnswer: 1,
    explanation: 'The Tax Cuts and Jobs Act (TCJA) limits the deduction for state and local taxes (including income taxes, property taxes, and sales taxes) to $10,000 ($5,000 if married filing separately). This limitation applies through 2025.',
    reference: 'IRC §164(b)(6); IRS Publication 17',
  },
  {
    id: 'see1-015',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Adjustments to Income',
    subtopic: 'Health Savings Account',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For 2025, what is the maximum HSA contribution for an individual with self-only HDHP coverage who is under age 55?',
    options: [
      '$3,850',
      '$4,150',
      '$4,300',
      '$8,550'
    ],
    correctAnswer: 2,
    explanation: 'For 2025, the maximum HSA contribution for self-only coverage is $4,300. For family coverage, the limit is $8,550. Individuals age 55 or older can make an additional $1,000 catch-up contribution.',
    reference: 'IRC §223; Rev. Proc. 2024-25',
  },

  // ==========================================
  // SEE1-4: Taxation and Advice
  // ==========================================
  {
    id: 'see1-016',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Self-Employment Tax',
    subtopic: 'Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A self-employed individual has net self-employment income of $50,000. What is the self-employment tax rate applied to this income?',
    options: [
      '7.65%',
      '12.4%',
      '15.3%',
      '92.35% × 15.3%'
    ],
    correctAnswer: 3,
    explanation: 'Self-employment tax is 15.3% (12.4% Social Security + 2.9% Medicare), but it\'s applied to 92.35% of net self-employment earnings. This adjustment accounts for the fact that employees only pay half of FICA while employers pay the other half.',
    reference: 'IRC §1401; IRS Publication 334',
  },
  {
    id: 'see1-017',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Alternative Minimum Tax',
    subtopic: 'AMT Basics',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Which of the following is NOT an adjustment or preference item for Alternative Minimum Tax (AMT) purposes?',
    options: [
      'State and local income taxes',
      'Charitable contributions',
      'Incentive stock option exercise spread',
      'Private activity bond interest'
    ],
    correctAnswer: 1,
    explanation: 'Charitable contributions are deductible for both regular tax and AMT purposes and are not an adjustment or preference item. State and local taxes, ISO exercise spreads, and private activity bond interest are all AMT adjustments or preferences.',
    reference: 'IRC §56-59; IRS Publication 556',
  },
  {
    id: 'see1-018',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Estimated Tax',
    subtopic: 'Penalty Avoidance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To avoid an estimated tax penalty, a taxpayer must pay in at least:',
    options: [
      '80% of the current year\'s tax liability',
      '90% of the current year\'s tax or 100% of the prior year\'s tax',
      '100% of the current year\'s tax liability',
      '110% of the prior year\'s tax for all taxpayers'
    ],
    correctAnswer: 1,
    explanation: 'To avoid estimated tax penalties, taxpayers must pay the lesser of 90% of the current year\'s tax liability OR 100% of the prior year\'s tax (110% if prior year AGI exceeded $150,000). This is the "safe harbor" rule.',
    reference: 'IRC §6654; IRS Publication 505',
  },
  {
    id: 'see1-019',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Tax Computation',
    subtopic: 'Net Investment Income Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Net Investment Income Tax (NIIT) is:',
    options: [
      '3.8% on all investment income regardless of AGI',
      '3.8% on the lesser of net investment income or MAGI exceeding threshold',
      '2.9% on all passive income',
      '15% on qualified dividends'
    ],
    correctAnswer: 1,
    explanation: 'The NIIT is 3.8% imposed on the lesser of net investment income OR the amount by which MAGI exceeds the threshold ($200,000 for single filers, $250,000 for married filing jointly). It applies to interest, dividends, capital gains, and passive income.',
    reference: 'IRC §1411; IRS Publication 559',
  },
  {
    id: 'see1-020',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Tax Planning',
    subtopic: 'Roth Conversion',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When a taxpayer converts a traditional IRA to a Roth IRA, what is the tax consequence?',
    options: [
      'The conversion is tax-free if completed within 60 days',
      'The converted amount is taxable as ordinary income in the year of conversion',
      'The converted amount is taxed at capital gains rates',
      'The conversion triggers a 10% early withdrawal penalty'
    ],
    correctAnswer: 1,
    explanation: 'When converting from a traditional IRA to a Roth IRA, the converted amount (minus any nondeductible contributions) is included in taxable income as ordinary income. The 10% early withdrawal penalty does NOT apply to conversions.',
    reference: 'IRC §408A; IRS Publication 590-A',
  },

  // ==========================================
  // SEE1-5: Credits
  // ==========================================
  {
    id: 'see1-021',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Child Tax Credit',
    subtopic: 'Eligibility',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For 2025, the maximum Child Tax Credit for a qualifying child under age 17 is:',
    options: [
      '$1,000',
      '$1,600',
      '$2,000',
      '$3,600'
    ],
    correctAnswer: 2,
    explanation: 'For 2025, the Child Tax Credit is $2,000 per qualifying child under age 17. Up to $1,700 of this credit is refundable as the Additional Child Tax Credit. The credit phases out for higher-income taxpayers.',
    reference: 'IRC §24; IRS Publication 972',
  },
  {
    id: 'see1-022',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Earned Income Credit',
    subtopic: 'Qualifying Requirements',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following would disqualify a taxpayer from claiming the Earned Income Credit?',
    options: [
      'Having wage income of $15,000',
      'Having investment income exceeding $11,600 for 2025',
      'Being a U.S. citizen',
      'Having a Social Security Number valid for employment'
    ],
    correctAnswer: 1,
    explanation: 'For 2025, a taxpayer is disqualified from the Earned Income Credit if their investment income exceeds $11,600. Investment income includes interest, dividends, capital gains, and passive income. The other options do not disqualify a taxpayer.',
    reference: 'IRC §32; IRS Publication 596',
  },
  {
    id: 'see1-023',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Education Credits',
    subtopic: 'American Opportunity Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The American Opportunity Tax Credit can be claimed for:',
    options: [
      'The first 4 years of post-secondary education only',
      'Any year of higher education including graduate school',
      'Only the first 2 years of college',
      'Only students attending half-time or more'
    ],
    correctAnswer: 0,
    explanation: 'The American Opportunity Tax Credit (AOTC) is available only for the first 4 years of post-secondary education. The student must be pursuing a degree and enrolled at least half-time. Graduate students are not eligible for AOTC but may qualify for the Lifetime Learning Credit.',
    reference: 'IRC §25A; IRS Publication 970',
  },
  {
    id: 'see1-024',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Retirement Savings Credit',
    subtopic: 'Saver\'s Credit',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Retirement Savings Contributions Credit (Saver\'s Credit) is a:',
    options: [
      'Refundable credit available to all taxpayers',
      'Nonrefundable credit for low-to-moderate income taxpayers',
      'Credit that reduces retirement account contributions',
      'Credit only for self-employed individuals'
    ],
    correctAnswer: 1,
    explanation: 'The Saver\'s Credit is a nonrefundable credit designed to encourage low-to-moderate income workers to save for retirement. The credit rate (10%, 20%, or 50%) depends on filing status and AGI. It applies to contributions to IRAs, 401(k)s, and similar plans.',
    reference: 'IRC §25B; IRS Publication 590-A',
  },

  // ==========================================
  // SEE1-6: Specialized Returns
  // ==========================================
  {
    id: 'see1-025',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Amended Returns',
    subtopic: 'Form 1040-X',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'To amend a previously filed individual income tax return, a taxpayer should file:',
    options: [
      'A new Form 1040 with "AMENDED" written at the top',
      'Form 1040-X',
      'Form 1099-MISC',
      'Form 843'
    ],
    correctAnswer: 1,
    explanation: 'Form 1040-X, Amended U.S. Individual Income Tax Return, is used to correct errors or make changes to a previously filed Form 1040. It must generally be filed within 3 years from the original filing date or 2 years from the date the tax was paid.',
    reference: 'IRC §6511; IRS Publication 17',
  },
];
