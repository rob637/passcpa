/**
 * EA SEE Part 1: Individuals - Questions Batch 3 (Q51-75)
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

export const SEE1_QUESTIONS_BATCH3: Question[] = [
  // ==========================================
  // SEE1-1: Preliminary Work and Taxpayer Data
  // ==========================================
  {
    id: 'see1-051',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Status',
    subtopic: 'Qualifying Surviving Spouse',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer\'s spouse died in 2023. The taxpayer has not remarried and maintains a home for a dependent child. For 2025, the taxpayer may file as:',
    options: [
      'Married Filing Jointly',
      'Qualifying Surviving Spouse',
      'Single',
      'Head of Household only'
    ],
    correctAnswer: 1,
    explanation: 'A taxpayer may file as Qualifying Surviving Spouse for 2 years after the year the spouse died, if they have not remarried and maintain a home for a dependent child. Since the spouse died in 2023, the taxpayer can use this status for 2024 and 2025.',
    reference: 'IRC §2(a); IRS Publication 501',
  },
  {
    id: 'see1-052',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Dependents',
    subtopic: 'Qualifying Relative',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For 2025, a qualifying relative must have gross income less than:',
    options: [
      '$4,400',
      '$4,700',
      '$5,050',
      'There is no income limit'
    ],
    correctAnswer: 2,
    explanation: 'For 2025, a qualifying relative must have gross income less than $5,050 (the exemption amount, adjusted for inflation). The taxpayer must provide more than half of the person\'s support, and the person cannot be a qualifying child of any taxpayer.',
    reference: 'IRC §152(d); IRS Publication 501',
  },
  {
    id: 'see1-053',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Requirements',
    subtopic: 'Self-Employment Income',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Self-employed individuals must file a return if their net self-employment income is at least:',
    options: [
      '$100',
      '$400',
      '$600',
      '$1,000'
    ],
    correctAnswer: 1,
    explanation: 'Individuals with net self-employment income of $400 or more must file a tax return regardless of their total gross income. This is because they must pay self-employment tax (Social Security and Medicare) on this income.',
    reference: 'IRC §6017; IRS Publication 334',
  },
  {
    id: 'see1-054',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Taxpayer Identification',
    subtopic: 'Adoption Taxpayer Identification Number',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'An Adoption Taxpayer Identification Number (ATIN) is used for:',
    options: [
      'Any adopted child',
      'A child placed in a household for legal adoption who cannot get an SSN before the return is due',
      'Foster children only',
      'International adoptions only'
    ],
    correctAnswer: 1,
    explanation: 'An ATIN is a temporary number issued to a child who has been placed for legal adoption but cannot obtain an SSN before the tax return is due. Once the adoption is finalized and an SSN is obtained, the ATIN is no longer used.',
    reference: 'IRS Publication 501',
  },

  // ==========================================
  // SEE1-2: Income and Assets
  // ==========================================
  {
    id: 'see1-055',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Unemployment Compensation',
    subtopic: 'Taxability',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Unemployment compensation is:',
    options: [
      'Fully excluded from gross income',
      'Fully taxable as ordinary income',
      'Taxed at capital gains rates',
      'Taxable only if exceeding $10,200'
    ],
    correctAnswer: 1,
    explanation: 'Unemployment compensation is fully taxable as ordinary income and must be reported on Form 1040. The temporary exclusion of up to $10,200 applied only to 2020 under the American Rescue Plan Act.',
    reference: 'IRC §85; IRS Publication 525',
  },
  {
    id: 'see1-056',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Prizes and Awards',
    subtopic: 'Taxability',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer wins a $25,000 automobile in a contest. What is the tax treatment?',
    options: [
      'The prize is not taxable',
      'The fair market value ($25,000) is included in gross income',
      'Only $10,000 is taxable after a standard exclusion',
      'The prize is taxed at 10%'
    ],
    correctAnswer: 1,
    explanation: 'Prizes and awards are generally included in gross income at their fair market value. Unless an exception applies (such as a qualified employee achievement award), the full $25,000 value of the automobile must be reported as income.',
    reference: 'IRC §74; IRS Publication 525',
  },
  {
    id: 'see1-057',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Life Insurance Proceeds',
    subtopic: 'Exclusion',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Life insurance proceeds received due to the death of the insured are generally:',
    options: [
      'Fully taxable as ordinary income',
      'Excluded from gross income',
      'Taxable as capital gains',
      'Taxable to the extent of investment earnings'
    ],
    correctAnswer: 1,
    explanation: 'Life insurance proceeds received by a beneficiary due to the death of the insured are generally excluded from gross income. However, interest earned on proceeds left with the insurance company is taxable.',
    reference: 'IRC §101; IRS Publication 525',
  },
  {
    id: 'see1-058',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Capital Gains',
    subtopic: 'Wash Sale Rule',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'On December 15, a taxpayer sells stock at a $3,000 loss. On January 5 of the following year, the taxpayer purchases substantially identical stock. What happens to the loss?',
    options: [
      'The loss is fully deductible in the year of sale',
      'The loss is disallowed and added to the basis of the new stock',
      'The loss is carried forward as a capital loss',
      'Half the loss is deductible currently'
    ],
    correctAnswer: 1,
    explanation: 'Under the wash sale rule, a loss is disallowed if substantially identical stock is purchased within 30 days before or after the sale. The disallowed loss is added to the basis of the replacement stock, deferring rather than eliminating the loss.',
    reference: 'IRC §1091; IRS Publication 550',
  },
  {
    id: 'see1-059',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Retirement Income',
    subtopic: 'Roth IRA Distributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Qualified distributions from a Roth IRA are:',
    options: [
      'Taxable as ordinary income',
      'Tax-free',
      'Taxed at capital gains rates',
      'Subject to a 10% penalty regardless of age'
    ],
    correctAnswer: 1,
    explanation: 'Qualified distributions from a Roth IRA are completely tax-free. To be qualified, the distribution must be made at least 5 years after the first contribution year AND the owner must be 59½, disabled, or the distribution must be for first-time home purchase (up to $10,000) or made to a beneficiary after death.',
    reference: 'IRC §408A; IRS Publication 590-B',
  },
  {
    id: 'see1-060',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Passive Income',
    subtopic: 'Passive Activity Rules',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Passive activity losses generally can offset:',
    options: [
      'Any type of income including wages',
      'Only passive activity income',
      'Investment income only',
      'Self-employment income only'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §469, passive activity losses can only offset passive activity income. Losses in excess of passive income are suspended and carried forward until there is passive income or the activity is disposed of in a fully taxable transaction.',
    reference: 'IRC §469; IRS Publication 925',
  },

  // ==========================================
  // SEE1-3: Deductions and Adjustments
  // ==========================================
  {
    id: 'see1-061',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Itemized Deductions',
    subtopic: 'Investment Interest',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Investment interest expense is deductible to the extent of:',
    options: [
      'Net investment income',
      '$10,000 per year',
      'Total interest paid',
      'Adjusted gross income'
    ],
    correctAnswer: 0,
    explanation: 'Investment interest expense (interest paid to purchase investment property) is limited to net investment income. Excess investment interest expense is carried forward indefinitely. Taxpayers can elect to treat qualified dividends as investment income to increase the limit.',
    reference: 'IRC §163(d); IRS Publication 550',
  },
  {
    id: 'see1-062',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Adjustments to Income',
    subtopic: 'Penalty on Early Withdrawal of Savings',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A penalty for early withdrawal of savings (such as a CD) is:',
    options: [
      'An itemized deduction',
      'An adjustment to income (above-the-line deduction)',
      'Not deductible',
      'A credit against tax'
    ],
    correctAnswer: 1,
    explanation: 'Penalties for early withdrawal of savings are deducted as an adjustment to income on Schedule 1 of Form 1040. This is reported in Box 2 of Form 1099-INT or Form 1099-OID.',
    reference: 'IRC §62(a)(9); IRS Publication 17',
  },
  {
    id: 'see1-063',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Adjustments to Income',
    subtopic: 'Archer MSA',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Contributions to an Archer Medical Savings Account (MSA) are:',
    options: [
      'No longer allowed for any taxpayer',
      'Deductible as an adjustment to income for eligible self-employed individuals',
      'Deductible only as an itemized deduction',
      'Available only to employees of large corporations'
    ],
    correctAnswer: 1,
    explanation: 'Although no new Archer MSAs can be established, existing accounts can continue to receive contributions. Self-employed individuals can deduct contributions as an adjustment to income. Archer MSAs were largely replaced by Health Savings Accounts (HSAs).',
    reference: 'IRC §220; IRS Publication 969',
  },
  {
    id: 'see1-064',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Itemized Deductions',
    subtopic: 'Non-Deductible Items',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following is NOT deductible as an itemized deduction under current law?',
    options: [
      'Mortgage interest on a primary residence',
      'State income taxes (up to $10,000)',
      'Unreimbursed employee business expenses',
      'Charitable contributions'
    ],
    correctAnswer: 2,
    explanation: 'The Tax Cuts and Jobs Act suspended the miscellaneous itemized deduction for unreimbursed employee business expenses (previously subject to 2% AGI floor) for 2018-2025. The other items remain deductible.',
    reference: 'IRC §67(g); IRS Publication 529',
  },
  {
    id: 'see1-065',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Itemized Deductions',
    subtopic: 'Charitable Contributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To claim a charitable deduction for a donation of property valued at more than $5,000, the taxpayer must:',
    options: [
      'Only keep a receipt',
      'Obtain a qualified appraisal and attach Form 8283',
      'Report it on Schedule A only',
      'No special requirements apply'
    ],
    correctAnswer: 1,
    explanation: 'For noncash charitable contributions exceeding $5,000 (except publicly traded securities), donors must obtain a qualified appraisal and attach Form 8283 (Noncash Charitable Contributions) to their return. For items over $500,000, the appraisal must be attached.',
    reference: 'IRC §170(f)(11); IRS Publication 561',
  },

  // ==========================================
  // SEE1-4: Taxation and Advice
  // ==========================================
  {
    id: 'see1-066',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Tax Computation',
    subtopic: 'Marginal Tax Rates',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'For 2025, the highest marginal tax rate for ordinary income is:',
    options: [
      '35%',
      '37%',
      '39.6%',
      '40%'
    ],
    correctAnswer: 1,
    explanation: 'Under the Tax Cuts and Jobs Act (through 2025), the highest marginal tax rate for ordinary income is 37%. This applies to taxable income exceeding certain thresholds ($626,350 for single filers in 2025).',
    reference: 'IRC §1; Rev. Proc. 2024-40',
  },
  {
    id: 'see1-067',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Self-Employment Tax',
    subtopic: 'Additional Medicare Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Additional Medicare Tax of 0.9% applies to:',
    options: [
      'All earned income',
      'Wages and self-employment income exceeding $200,000 ($250,000 MFJ)',
      'Investment income only',
      'Wages only, not self-employment income'
    ],
    correctAnswer: 1,
    explanation: 'The Additional Medicare Tax of 0.9% applies to wages and self-employment income that exceeds threshold amounts: $200,000 for single filers, $250,000 for married filing jointly, and $125,000 for married filing separately.',
    reference: 'IRC §3101(b)(2); IRS Publication 15',
  },
  {
    id: 'see1-068',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Tax Planning',
    subtopic: 'Section 1031 Exchange',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under current law, a Section 1031 like-kind exchange is available for:',
    options: [
      'Any type of property held for investment',
      'Real property held for business or investment purposes only',
      'Personal property such as vehicles and equipment',
      'Primary residences'
    ],
    correctAnswer: 1,
    explanation: 'The Tax Cuts and Jobs Act limited Section 1031 like-kind exchanges to real property (real estate) held for productive use in a trade or business or for investment. Personal property and primary residences do not qualify.',
    reference: 'IRC §1031; IRS Publication 544',
  },
  {
    id: 'see1-069',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Tax Computation',
    subtopic: 'Qualified Business Income Deduction',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The Qualified Business Income (QBI) deduction under Section 199A allows eligible taxpayers to deduct up to:',
    options: [
      '10% of qualified business income',
      '15% of qualified business income',
      '20% of qualified business income',
      '25% of qualified business income'
    ],
    correctAnswer: 2,
    explanation: 'The Section 199A QBI deduction allows eligible taxpayers with pass-through income (sole proprietorships, partnerships, S corporations) to deduct up to 20% of their qualified business income. Limitations apply based on income thresholds and specified service trades.',
    reference: 'IRC §199A; IRS Publication 535',
  },
  {
    id: 'see1-070',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Tax Planning',
    subtopic: 'Installment Sales',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An installment sale allows a taxpayer to:',
    options: [
      'Exclude all gain from gross income',
      'Defer recognition of gain as payments are received',
      'Convert ordinary income to capital gains',
      'Avoid self-employment tax on business sales'
    ],
    correctAnswer: 1,
    explanation: 'Under the installment method, gain on a sale is recognized proportionally as payments are received. This allows taxpayers to defer tax on the gain over time rather than recognizing it all in the year of sale.',
    reference: 'IRC §453; IRS Publication 537',
  },

  // ==========================================
  // SEE1-5: Credits
  // ==========================================
  {
    id: 'see1-071',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Adoption Credit',
    subtopic: 'Eligibility',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Adoption Credit is available for:',
    options: [
      'Only domestic adoptions',
      'Both domestic and international adoptions',
      'Only special needs adoptions',
      'Foster care arrangements only'
    ],
    correctAnswer: 1,
    explanation: 'The Adoption Credit is available for qualified adoption expenses paid for both domestic and international adoptions. The credit phases out at higher income levels and is nonrefundable. For special needs adoptions, the full credit can be claimed regardless of actual expenses.',
    reference: 'IRC §23; IRS Publication 968',
  },
  {
    id: 'see1-072',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Credit for Other Dependents',
    subtopic: 'Non-Child Dependents',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Credit for Other Dependents provides a credit of:',
    options: [
      '$500 per qualifying dependent who is not a qualifying child for the Child Tax Credit',
      '$1,000 per dependent',
      '$2,000 per dependent of any age',
      '$1,600 refundable per dependent'
    ],
    correctAnswer: 0,
    explanation: 'The Credit for Other Dependents is a $500 nonrefundable credit for dependents who don\'t qualify for the Child Tax Credit, such as children age 17 or older, dependent parents, or other qualifying relatives.',
    reference: 'IRC §24(h)(4); IRS Publication 972',
  },
  {
    id: 'see1-073',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Electric Vehicle Credit',
    subtopic: 'Clean Vehicle Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Clean Vehicle Credit for new electric vehicles under the Inflation Reduction Act is up to:',
    options: [
      '$2,500',
      '$5,000',
      '$7,500',
      '$10,000'
    ],
    correctAnswer: 2,
    explanation: 'Under the Inflation Reduction Act, the Clean Vehicle Credit for new qualified plug-in electric vehicles is up to $7,500 ($3,750 for the battery component + $3,750 for critical minerals). Income and price limits apply.',
    reference: 'IRC §30D; IRS Form 8936',
  },
  {
    id: 'see1-074',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Elderly or Disabled Credit',
    subtopic: 'Eligibility',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Credit for the Elderly or Disabled is available to individuals who are:',
    options: [
      'Age 65 or older only',
      'Age 65 or older, or under 65 and permanently and totally disabled',
      'Any age with a disability',
      'Age 70 or older only'
    ],
    correctAnswer: 1,
    explanation: 'The Credit for the Elderly or Disabled is available to taxpayers who are (1) age 65 or older, or (2) under 65 but retired on permanent and total disability with taxable disability income. Income limits apply.',
    reference: 'IRC §22; IRS Publication 524',
  },
  {
    id: 'see1-075',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'General Business Credit',
    subtopic: 'Work Opportunity Credit',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Work Opportunity Credit is available to employers who hire individuals from:',
    options: [
      'Any geographic area',
      'Targeted groups facing barriers to employment',
      'Only family members',
      'Only individuals under age 25'
    ],
    correctAnswer: 1,
    explanation: 'The Work Opportunity Tax Credit (WOTC) encourages employers to hire individuals from targeted groups facing barriers to employment, such as veterans, ex-felons, long-term unemployment recipients, and vocational rehabilitation referrals.',
    reference: 'IRC §51; IRS Form 5884',
  },
];
