/**
 * EA SEE Part 1: Individuals - Questions Batch 4 (Q76-100)
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

export const SEE1_QUESTIONS_BATCH4: Question[] = [
  // ==========================================
  // SEE1-2: Income and Assets
  // ==========================================
  {
    id: 'see1-076',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Capital Gains',
    subtopic: 'Net Capital Losses',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If a taxpayer has a net capital loss, the maximum amount that can be deducted against ordinary income is:',
    options: [
      '$1,000',
      '$3,000',
      '$5,000',
      'Unlimited'
    ],
    correctAnswer: 1,
    explanation: 'Net capital losses can offset ordinary income up to $3,000 per year ($1,500 if married filing separately). Any excess losses are carried forward to future years indefinitely.',
    reference: 'IRC §1211(b); IRS Publication 550',
  },
  {
    id: 'see1-077',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Rental Income',
    subtopic: 'Real Estate Professional',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'To qualify as a real estate professional and avoid passive activity loss limitations, a taxpayer must:',
    options: [
      'Own at least 3 rental properties',
      'Spend more than 750 hours and more than half of their work time in real estate activities',
      'Have rental income exceeding $100,000',
      'Be a licensed real estate agent'
    ],
    correctAnswer: 1,
    explanation: 'To qualify as a real estate professional, the taxpayer must (1) perform more than 750 hours of services in real property trades or businesses, and (2) spend more than half of their total work time in such activities. Material participation in each rental is also required.',
    reference: 'IRC §469(c)(7); IRS Publication 925',
  },
  {
    id: 'see1-078',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Retirement Income',
    subtopic: '401(k) Contributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For 2025, the maximum elective deferral to a 401(k) plan for an employee under age 50 is:',
    options: [
      '$20,500',
      '$22,500',
      '$23,000',
      '$23,500'
    ],
    correctAnswer: 3,
    explanation: 'For 2025, the maximum 401(k) elective deferral limit is $23,500. Employees age 50 or older can make an additional catch-up contribution of $7,500 for a total of $31,000.',
    reference: 'IRC §402(g); IRS Notice 2024-80',
  },
  {
    id: 'see1-079',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Scholarships',
    subtopic: 'Taxability',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Scholarship amounts used for which of the following are taxable?',
    options: [
      'Tuition and fees',
      'Books and supplies required for courses',
      'Room and board',
      'Equipment required for enrollment'
    ],
    correctAnswer: 2,
    explanation: 'Scholarship amounts used for tuition, fees, books, supplies, and equipment required for courses are tax-free. Amounts used for room and board, travel, or other expenses are taxable income to the recipient.',
    reference: 'IRC §117; IRS Publication 970',
  },
  {
    id: 'see1-080',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Bartering',
    subtopic: 'Fair Market Value',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'When goods or services are exchanged through bartering, the amount included in income is:',
    options: [
      'Zero, since no cash is received',
      'The fair market value of the goods or services received',
      'The cost basis of the goods given up',
      'Half the value of what was exchanged'
    ],
    correctAnswer: 1,
    explanation: 'Bartering results in taxable income equal to the fair market value of the goods or services received. Both parties to the exchange must report the FMV of what they received as income.',
    reference: 'IRC §61; IRS Publication 525',
  },

  // ==========================================
  // SEE1-3: Deductions and Adjustments
  // ==========================================
  {
    id: 'see1-081',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Adjustments to Income',
    subtopic: 'Jury Duty Pay',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'An employee who receives jury duty pay but remits it to their employer (because the employer paid full salary during jury service) may:',
    options: [
      'Exclude the jury duty pay from income entirely',
      'Deduct the remitted amount as an adjustment to income',
      'Claim it as an itemized deduction',
      'Take no deduction'
    ],
    correctAnswer: 1,
    explanation: 'When an employee turns over jury duty pay to an employer who paid full salary during jury service, the employee reports the jury pay as income but can deduct the amount remitted as an adjustment to income on Schedule 1.',
    reference: 'IRC §62(a)(13); IRS Publication 17',
  },
  {
    id: 'see1-082',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Itemized Deductions',
    subtopic: 'Medical Miles',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'For 2025, the standard mileage rate for medical purposes is approximately:',
    options: [
      '14 cents per mile',
      '21 cents per mile',
      '67 cents per mile',
      '70 cents per mile'
    ],
    correctAnswer: 1,
    explanation: 'The standard mileage rate for medical transportation is 21 cents per mile for 2025. This is much lower than the business rate (67 cents) because it only covers variable vehicle costs, not fixed costs.',
    reference: 'IRS Notice 2024-08',
  },
  {
    id: 'see1-083',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Adjustments to Income',
    subtopic: 'Alimony Paid (Pre-2019)',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For a divorce agreement executed in 2017 that has not been modified, alimony paid is:',
    options: [
      'Not deductible by the payer',
      'Deductible by the payer and taxable to the recipient',
      'Deductible by the payer but not taxable to the recipient',
      'Not deductible and not taxable'
    ],
    correctAnswer: 1,
    explanation: 'For divorce agreements executed before 2019 that have not been modified to adopt post-2018 rules, alimony remains deductible by the payer and is included in the income of the recipient under the pre-TCJA rules.',
    reference: 'IRC §215, §71 (pre-TCJA)',
  },
  {
    id: 'see1-084',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Itemized Deductions',
    subtopic: 'Points Paid',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Points paid to obtain a mortgage on a principal residence are generally:',
    options: [
      'Never deductible',
      'Deductible in full in the year paid if certain conditions are met',
      'Only deductible over the life of the loan',
      'Deductible as an adjustment to income'
    ],
    correctAnswer: 1,
    explanation: 'Points paid for a mortgage on a principal residence are generally deductible in full in the year paid if the loan is used to buy or build the main home, points are established practice in the area, and the points are not unusually high. Points on refinancing are amortized over the loan term.',
    reference: 'IRC §461; IRS Publication 936',
  },
  {
    id: 'see1-085',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Standard Deduction',
    subtopic: 'Additional for Elderly/Blind',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'For 2025, the additional standard deduction amount for a single taxpayer who is 65 or older is approximately:',
    options: [
      '$1,550',
      '$1,950',
      '$2,000',
      '$3,100'
    ],
    correctAnswer: 1,
    explanation: 'For 2025, the additional standard deduction for those 65+ or blind is approximately $1,950 for single/head of household filers and $1,550 for married filers. These amounts are added to the regular standard deduction.',
    reference: 'IRC §63(f); Rev. Proc. 2024-40',
  },

  // ==========================================
  // SEE1-4: Taxation and Advice
  // ==========================================
  {
    id: 'see1-086',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Alternative Minimum Tax',
    subtopic: 'Exemption Amounts',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The AMT exemption amount is:',
    options: [
      'A fixed amount that never changes',
      'Subject to phase-out at higher income levels',
      'Available only to married taxpayers',
      'Equal to the standard deduction'
    ],
    correctAnswer: 1,
    explanation: 'The AMT exemption amount phases out at higher income levels. For every $1 of alternative minimum taxable income above the threshold, the exemption is reduced by 25 cents until it is completely phased out.',
    reference: 'IRC §55(d); IRS Form 6251',
  },
  {
    id: 'see1-087',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Estimated Taxes',
    subtopic: 'Annualized Income Method',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A taxpayer with irregular income may use the annualized income installment method to:',
    options: [
      'Avoid filing estimated tax payments entirely',
      'Base each estimated payment on income earned through that period',
      'Pay all estimated taxes with the final return',
      'Reduce their total tax liability'
    ],
    correctAnswer: 1,
    explanation: 'The annualized income installment method allows taxpayers with uneven income (like seasonal businesses) to base each estimated payment on actual income earned through that quarter, potentially reducing or eliminating underpayment penalties.',
    reference: 'IRC §6654(d)(2); IRS Publication 505',
  },
  {
    id: 'see1-088',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Tax Planning',
    subtopic: 'Constructive Receipt',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under the doctrine of constructive receipt, income is taxable when:',
    options: [
      'Actually received in cash',
      'Credited to the taxpayer\'s account or made available without restriction',
      'Deposited in a bank account',
      'Received the following year'
    ],
    correctAnswer: 1,
    explanation: 'Under constructive receipt, income is taxable when it is credited to the taxpayer\'s account, set apart for them, or otherwise made available so they can draw on it. Income is not constructively received if substantial limitations exist.',
    reference: 'IRC §451; Treas. Reg. §1.451-2',
  },
  {
    id: 'see1-089',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Tax Computation',
    subtopic: 'Capital Gains Rates',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Long-term capital gains are taxed at which rates for most taxpayers?',
    options: [
      '10%, 15%, 25%',
      '0%, 15%, 20%',
      '12%, 22%, 24%',
      '15%, 25%, 35%'
    ],
    correctAnswer: 1,
    explanation: 'Long-term capital gains are taxed at preferential rates of 0%, 15%, or 20% depending on the taxpayer\'s taxable income bracket. High-income taxpayers may also owe the 3.8% Net Investment Income Tax.',
    reference: 'IRC §1(h); IRS Publication 550',
  },
  {
    id: 'see1-090',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Tax Planning',
    subtopic: 'Depreciation Recapture',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When depreciable real property is sold at a gain, depreciation claimed is recaptured at:',
    options: [
      'Ordinary income rates under Section 1245',
      'A maximum rate of 25% under Section 1250',
      'Capital gains rates with no recapture',
      'Self-employment tax rates'
    ],
    correctAnswer: 1,
    explanation: 'Unrecaptured Section 1250 gain (depreciation on real property) is taxed at a maximum rate of 25%. This is less favorable than long-term capital gains rates but more favorable than ordinary income rates.',
    reference: 'IRC §1(h)(1)(E); IRC §1250',
  },

  // ==========================================
  // SEE1-5: Credits (continued)
  // ==========================================
  {
    id: 'see1-091',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Earned Income Credit',
    subtopic: 'Investment Income Test',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For the Earned Income Credit, investment income includes all of the following EXCEPT:',
    options: [
      'Taxable interest',
      'Capital gains',
      'Wages from employment',
      'Dividends'
    ],
    correctAnswer: 2,
    explanation: 'Investment income for EIC purposes includes interest, dividends, capital gains, royalties, and net passive income. Wages are earned income, not investment income. If investment income exceeds the limit ($11,600 for 2025), the taxpayer is disqualified from the EIC.',
    reference: 'IRC §32(i); IRS Publication 596',
  },
  {
    id: 'see1-092',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'American Opportunity Credit',
    subtopic: 'Maximum Credit',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The maximum American Opportunity Tax Credit per eligible student is:',
    options: [
      '$1,500',
      '$2,000',
      '$2,500',
      '$4,000'
    ],
    correctAnswer: 2,
    explanation: 'The AOTC is worth up to $2,500 per eligible student (100% of first $2,000 + 25% of next $2,000 in qualified expenses). 40% of the credit (up to $1,000) is refundable.',
    reference: 'IRC §25A(i); IRS Publication 970',
  },
  {
    id: 'see1-093',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Child Tax Credit',
    subtopic: 'Phase-Out',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Child Tax Credit begins to phase out for married filing jointly taxpayers when modified AGI exceeds:',
    options: [
      '$150,000',
      '$200,000',
      '$400,000',
      '$500,000'
    ],
    correctAnswer: 2,
    explanation: 'Under current law, the Child Tax Credit phases out by $50 for each $1,000 of modified AGI exceeding $400,000 for married filing jointly ($200,000 for other filers).',
    reference: 'IRC §24(b); IRS Publication 972',
  },
  {
    id: 'see1-094',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Energy Efficient Home Improvement Credit',
    subtopic: 'Annual Limits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Energy Efficient Home Improvement Credit under the Inflation Reduction Act allows an annual credit of up to:',
    options: [
      '$500 lifetime',
      '$1,200 per year',
      '$2,000 per year',
      '$3,200 per year'
    ],
    correctAnswer: 3,
    explanation: 'The Energy Efficient Home Improvement Credit is 30% of costs with an annual limit of $1,200 for most improvements plus additional amounts for heat pumps (up to $2,000), making the total annual limit up to $3,200.',
    reference: 'IRC §25C; IRS Publication 5865',
  },

  // ==========================================
  // SEE1-6: Specialized Returns
  // ==========================================
  {
    id: 'see1-095',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Foreign Accounts',
    subtopic: 'FATCA',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 8938, Statement of Specified Foreign Financial Assets, must be filed by a single taxpayer living in the U.S. if foreign assets exceed:',
    options: [
      '$10,000 at any time',
      '$50,000 on the last day of the year or $75,000 at any time',
      '$100,000 at any time',
      '$200,000 on the last day of the year'
    ],
    correctAnswer: 1,
    explanation: 'U.S. taxpayers living in the U.S. must file Form 8938 if the value of specified foreign financial assets exceeds $50,000 on the last day of the year or $75,000 at any time during the year (higher thresholds apply to MFJ and those living abroad).',
    reference: 'IRC §6038D; IRS Form 8938 Instructions',
  },
  {
    id: 'see1-096',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Decedent Returns',
    subtopic: 'Final Return',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A final income tax return for a deceased taxpayer covers:',
    options: [
      'The entire calendar year of death',
      'Only the period from January 1 to the date of death',
      '12 months ending on the date of death',
      'The period from the last return filed to the date of death'
    ],
    correctAnswer: 1,
    explanation: 'The final income tax return for a deceased taxpayer covers the period from January 1 (or the beginning of the fiscal year) to the date of death. Income earned after death is reported by the estate or beneficiaries.',
    reference: 'IRC §443; IRS Publication 559',
  },
  {
    id: 'see1-097',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Amended Returns',
    subtopic: 'Carryback Claims',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To claim a refund from a net operating loss (NOL) carryback, a taxpayer should file:',
    options: [
      'Form 1040-X only',
      'Form 1045 for a quick refund or Form 1040-X',
      'Form 4868',
      'Form 843'
    ],
    correctAnswer: 1,
    explanation: 'Taxpayers can file Form 1045 (Application for Tentative Refund) within 12 months of the NOL year for a quick refund from a carryback. Alternatively, Form 1040-X can be filed within the normal statute of limitations period.',
    reference: 'IRC §172; IRS Form 1045',
  },
  {
    id: 'see1-098',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Extensions',
    subtopic: 'Filing Extension',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Form 4868 provides an automatic extension of time to file of:',
    options: [
      '2 months',
      '4 months',
      '6 months',
      '12 months'
    ],
    correctAnswer: 2,
    explanation: 'Form 4868 provides an automatic 6-month extension of time to file a federal income tax return (extending the due date from April 15 to October 15). This is an extension to FILE, not an extension to PAY—taxes are still due by the original deadline.',
    reference: 'IRC §6081; IRS Form 4868',
  },
  {
    id: 'see1-099',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Combat Zone',
    subtopic: 'Deadline Extensions',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Military members serving in a combat zone receive automatic extensions for filing returns of:',
    options: [
      '30 days after leaving the combat zone',
      '180 days after leaving the combat zone, plus any time remaining when they entered',
      '1 year after leaving the combat zone',
      'No extension is available'
    ],
    correctAnswer: 1,
    explanation: 'Military members in combat zones receive automatic extensions of at least 180 days after leaving the combat zone, plus any days remaining in the original filing period when they entered the zone.',
    reference: 'IRC §7508; IRS Publication 3',
  },
  {
    id: 'see1-100',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Disaster Relief',
    subtopic: 'Filing Extensions',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'When the IRS grants disaster relief, affected taxpayers typically receive:',
    options: [
      'A permanent waiver of all taxes',
      'Extended deadlines for filing and payment without penalties',
      'An automatic refund',
      'Reduced tax rates'
    ],
    correctAnswer: 1,
    explanation: 'When the IRS issues disaster relief guidance, affected taxpayers receive extended deadlines for filing returns, making payments, and performing other time-sensitive acts. Penalties and interest for the postponement period are waived.',
    reference: 'IRC §7508A; IRS Disaster Relief Announcements',
  },
];
