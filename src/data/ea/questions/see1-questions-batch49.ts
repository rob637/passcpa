/**
 * EA SEE Part 1: Individuals - Questions Batch 49 (Q601-630)
 * Focus: Complex scenarios and current topics
 * 
 * Tax Year: 2024-2025
 */

import { Question } from '../../../types';

export const SEE1_QUESTIONS_BATCH49: Question[] = [
  // SEE1-1: Preliminary Work
  {
    id: 'see1-601',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Return Processing',
    subtopic: 'Taxpayer Identification',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An adopted child placed in the home before receiving an SSN can be claimed using:',
    options: [
      'The adoptive parents\' SSN',
      'An Adoption Taxpayer Identification Number (ATIN)',
      'An ITIN',
      'An EIN'
    ],
    correctAnswer: 1,
    explanation: 'An ATIN (Adoption Taxpayer Identification Number) is a temporary number for a child who is in the process of adoption and an SSN cannot yet be obtained. It allows the adoptive parent to claim the child as a dependent.',
    reference: 'W-7A Instructions'
  },
  {
    id: 'see1-602',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Requirements',
    subtopic: 'Self-Employment Threshold',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Self-employed individuals must file a return if net self-employment income is at least:',
    options: [
      '$200',
      '$400',
      '$600',
      '$1,000'
    ],
    correctAnswer: 1,
    explanation: 'A return must be filed if net self-employment earnings are $400 or more, regardless of other income or filing thresholds. This is because SE tax may be due even if no income tax is owed.',
    reference: 'IRC §1402'
  },
  {
    id: 'see1-603',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Dependents',
    subtopic: 'Support Test',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When calculating whether a child provides more than half of their own support, which item is NOT included in total support?',
    options: [
      'Fair rental value of lodging provided by parents',
      'Scholarships received by the child',
      'Food and clothing paid by the child',
      'Medical and dental care paid by the child'
    ],
    correctAnswer: 1,
    explanation: 'Scholarships are excluded from the support computation for a qualifying child. For qualifying relatives, scholarships are included. Fair rental value of lodging, food, clothing, medical care, and other necessities are all included in total support.',
    reference: 'Pub. 501'
  },
  {
    id: 'see1-604',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Due Diligence',
    subtopic: 'Preparer Requirements',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Paid preparers must complete due diligence requirements (Form 8867) for which credits?',
    options: [
      'EITC only',
      'EITC, CTC, ACTC, AOTC, and HOH status',
      'All refundable credits',
      'All credits exceeding $1,000'
    ],
    correctAnswer: 1,
    explanation: 'Preparers must complete due diligence for EITC, CTC/ACTC, AOTC, and Head of Household filing status. Failure to meet requirements can result in $635 penalty per failure (2024). Form 8867 documents the due diligence performed.',
    reference: 'IRC §6695(g)'
  },
  {
    id: 'see1-605',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Electronic Filing',
    subtopic: 'Mandatory E-file',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'A tax return preparer must e-file if they reasonably expect to file more than how many returns?',
    options: [
      '5 returns',
      '10 returns',
      '50 returns',
      '100 returns'
    ],
    correctAnswer: 1,
    explanation: 'Tax return preparers who reasonably expect to file more than 10 returns during the calendar year must e-file all returns (reduced from 11 in prior years). This includes all types of returns covered by the e-file mandate.',
    reference: 'IRC §6011(e)'
  },
  // SEE1-2: Income
  {
    id: 'see1-606',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Stock Compensation',
    subtopic: 'ISOs vs. NQSOs',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When incentive stock options (ISOs) are exercised:',
    options: [
      'The spread is ordinary income in the year of exercise',
      'No regular tax event occurs, but the spread is an AMT preference',
      'The spread is capital gain',
      'Tax is deferred until stock sale with no AMT adjustment'
    ],
    correctAnswer: 1,
    explanation: 'ISO exercise creates no regular tax event at exercise. However, the spread (FMV minus exercise price) is an AMT adjustment. Upon qualifying sale (2+ years from grant, 1+ year from exercise), all gain is capital gain.',
    reference: 'IRC §422'
  },
  {
    id: 'see1-607',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Prizes and Awards',
    subtopic: 'Employee Achievement Awards',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An employee achievement award (length of service or safety) is excludable from income up to:',
    options: [
      '$400 for non-qualified plans',
      '$1,600 for qualified plans',
      '$400 non-qualified/$1,600 qualified',
      'Any amount if tangible personal property'
    ],
    correctAnswer: 2,
    explanation: 'Employee achievement awards are excludable up to $400 for non-qualified plans and $1,600 for qualified plans. The award must be tangible personal property (not cash, gift cards, vacations) for length of service (5+ years) or safety.',
    reference: 'IRC §74(c)'
  },
  {
    id: 'see1-608',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Alimony',
    subtopic: 'Pre-2019 vs Post-2018 Rules',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For divorce agreements executed after December 31, 2018:',
    options: [
      'Alimony is deductible by the payer and taxable to the recipient',
      'Alimony is neither deductible nor taxable',
      'Child support is deductible but alimony is not',
      'Alimony is taxable to both parties'
    ],
    correctAnswer: 1,
    explanation: 'For divorces finalized after 2018, alimony is neither deductible by the payer nor included in the recipient\'s income. Pre-2019 divorce agreements retain the old rules unless modified to adopt new rules.',
    reference: 'IRC §71 (as amended by TCJA)'
  },
  {
    id: 'see1-609',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Discharge of Student Loans',
    subtopic: 'Exclusion Rules',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Through 2025, discharged student loan debt is:',
    options: [
      'Always taxable income',
      'Excluded from income if discharged under certain programs',
      'Deductible on Schedule A',
      'Only excluded if in bankruptcy'
    ],
    correctAnswer: 1,
    explanation: 'ARPA and subsequent legislation exclude student loan forgiveness from income through 2025. This includes PSLF, income-driven repayment forgiveness, and certain other qualifying discharges. After 2025, only certain forgiveness is excluded.',
    reference: 'IRC §108(f)(5)'
  },
  {
    id: 'see1-610',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Hobby Income',
    subtopic: 'Loss Limitations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer engages in an activity without a profit motive (hobby). Related expenses:',
    options: [
      'Are fully deductible against hobby income',
      'Are deductible only to the extent of hobby income as itemized deductions',
      'Are not deductible under TCJA (through 2025)',
      'Can create an NOL if they exceed income'
    ],
    correctAnswer: 2,
    explanation: 'Under TCJA (2018-2025), hobby expenses are not deductible at all as miscellaneous itemized deductions are suspended. Hobby income is still fully taxable. This creates asymmetry: report income, deduct nothing.',
    reference: 'IRC §183'
  },
  // SEE1-3: Deductions and Credits
  {
    id: 'see1-611',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Mortgage Interest',
    subtopic: 'Acquisition Debt Limits',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'For mortgages taken out after December 15, 2017, interest is deductible on acquisition debt up to:',
    options: [
      '$500,000 ($250,000 MFS)',
      '$750,000 ($375,000 MFS)',
      '$1,000,000 ($500,000 MFS)',
      'Unlimited on primary residence only'
    ],
    correctAnswer: 1,
    explanation: 'TCJA lowered the acquisition debt limit to $750,000 ($375,000 MFS) for mortgages after 12/15/2017. Pre-existing mortgages retain the $1M limit. Home equity debt interest is no longer deductible unless used for home improvement.',
    reference: 'IRC §163(h)(3)'
  },
  {
    id: 'see1-612',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'QBI Deduction',
    subtopic: 'Section 199A',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The qualified business income deduction (Section 199A) allows a deduction of up to:',
    options: [
      '10% of QBI',
      '15% of QBI',
      '20% of QBI',
      '25% of QBI'
    ],
    correctAnswer: 2,
    explanation: 'Section 199A allows a deduction of up to 20% of qualified business income from pass-through entities and sole proprietorships. The deduction is subject to W-2 wage and capital limitations for higher-income taxpayers.',
    reference: 'IRC §199A'
  },
  {
    id: 'see1-613',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'IRA Deduction',
    subtopic: 'Active Participant Rules',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A taxpayer with AGI of $90,000 who is an active participant in an employer retirement plan:',
    options: [
      'Cannot make any IRA contribution',
      'Can make a deductible IRA contribution (single filer 2024)',
      'Has partially phased-out deduction (single filer 2024)',
      'Can make only a Roth contribution'
    ],
    correctAnswer: 2,
    explanation: 'For 2024, single active participants phase out traditional IRA deduction between $77,000-$87,000 AGI. At $90,000, the deduction is fully phased out. Nondeductible traditional or Roth contributions (with higher limits) may still be possible.',
    reference: 'IRC §219'
  },
  {
    id: 'see1-614',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Electric Vehicle Credit',
    subtopic: 'Clean Vehicle Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Clean Vehicle Credit (IRC §30D) for new electric vehicles in 2024 is:',
    options: [
      '$2,500 base plus $417 per kWh',
      'Up to $7,500 based on critical mineral and battery components',
      '$10,000 regardless of vehicle specifications',
      'Only available for vehicles under $40,000'
    ],
    correctAnswer: 1,
    explanation: 'The Clean Vehicle Credit provides up to $7,500: $3,750 for meeting critical mineral requirements and $3,750 for battery component requirements. Income limits and MSRP caps apply. The vehicle must be final assembled in North America.',
    reference: 'IRC §30D (as amended by IRA)'
  },
  {
    id: 'see1-615',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Saver\'s Credit',
    subtopic: 'Retirement Savings Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Saver\'s Credit (Retirement Savings Contribution Credit) is available for contributions to:',
    options: [
      'Only traditional IRAs',
      'Only employer retirement plans',
      'Traditional IRA, Roth IRA, or employer plans',
      'Only ABLE accounts'
    ],
    correctAnswer: 2,
    explanation: 'The Saver\'s Credit applies to contributions to traditional IRAs, Roth IRAs, 401(k)s, 403(b)s, SIMPLE IRAs, SEPs, and governmental 457 plans. The credit is 50%, 20%, or 10% of up to $2,000 depending on AGI.',
    reference: 'IRC §25B'
  },
  // SEE1-4: Taxation
  {
    id: 'see1-616',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Section 1231',
    subtopic: 'Business Property Gains',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Net Section 1231 gains are treated as:',
    options: [
      'Ordinary income',
      'Short-term capital gains',
      'Long-term capital gains (subject to recapture lookback)',
      'Tax-exempt income'
    ],
    correctAnswer: 2,
    explanation: 'Net Section 1231 gains are treated as LTCG. However, net 1231 gains are recharacterized as ordinary income to the extent of unrecaptured net 1231 losses from the prior 5 years. Net 1231 losses are ordinary.',
    reference: 'IRC §1231'
  },
  {
    id: 'see1-617',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Depreciation Recapture',
    subtopic: 'Section 1245 Property',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Gain on sale of Section 1245 property is treated as ordinary income to the extent of:',
    options: [
      'All accumulated depreciation',
      'Straight-line depreciation only',
      'The lesser of gain or depreciation',
      'Depreciation in excess of straight-line'
    ],
    correctAnswer: 2,
    explanation: 'Section 1245 recaptures gain as ordinary income to the extent of all depreciation taken (not just excess over straight-line). The recapture cannot exceed the gain realized. Any remaining gain may be Section 1231 gain.',
    reference: 'IRC §1245'
  },
  {
    id: 'see1-618',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Capital Loss',
    subtopic: 'Carryover Rules',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Capital losses in excess of capital gains plus $3,000 ($1,500 MFS):',
    options: [
      'Are lost and cannot be used',
      'Carry forward indefinitely retaining their character',
      'Carry back 2 years, forward 5 years',
      'Convert to ordinary loss deductions'
    ],
    correctAnswer: 1,
    explanation: 'Excess capital losses carry forward indefinitely, retaining their short-term or long-term character. They can offset future capital gains and up to $3,000 of ordinary income per year until fully used.',
    reference: 'IRC §1212'
  },
  {
    id: 'see1-619',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Home Sale Exclusion',
    subtopic: 'Section 121',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To qualify for the full $500,000 (MFJ) home sale exclusion, the taxpayer must:',
    options: [
      'Own the home for 5 years',
      'Use the home as principal residence for 3 of last 5 years',
      'Own and use as principal residence for 2 of last 5 years',
      'Have purchased the home at least 3 years ago'
    ],
    correctAnswer: 2,
    explanation: 'The Section 121 exclusion requires ownership and use as a principal residence for 2 of the 5 years before sale. The $250,000 ($500,000 MFJ) exclusion can be used once every 2 years.',
    reference: 'IRC §121'
  },
  {
    id: 'see1-620',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Installment Sales',
    subtopic: 'Gross Profit Percentage',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An installment sale has a gross profit of $40,000 on a $100,000 sale price. The gross profit percentage is:',
    options: [
      '25%',
      '40%',
      '60%',
      '100%'
    ],
    correctAnswer: 1,
    explanation: 'Gross profit percentage = Gross profit / Contract price. Here: $40,000 / $100,000 = 40%. Apply this percentage to each principal payment to determine the gain recognized. Interest is taxed separately.',
    reference: 'IRC §453'
  },
  // SEE1-5: Advising
  {
    id: 'see1-621',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Estimated Tax',
    subtopic: 'Annualized Income Method',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A taxpayer with uneven income throughout the year can reduce estimated tax penalties using:',
    options: [
      'Form 2210 Schedule AI (Annualized Income Installment Method)',
      'Form 1040-ES only',
      'Form 4868 extension',
      'Prior year safe harbor only'
    ],
    correctAnswer: 0,
    explanation: 'Schedule AI of Form 2210 uses the annualized income method to calculate required estimated payments based on income earned in each period. This helps taxpayers with seasonal or uneven income avoid underpayment penalties.',
    reference: 'IRC §6654(d)(2)'
  },
  {
    id: 'see1-622',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Education Planning',
    subtopic: 'Coverdell ESA',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Coverdell Education Savings Account contributions are limited to how much per beneficiary per year?',
    options: [
      '$500',
      '$2,000',
      '$5,000',
      '$6,000'
    ],
    correctAnswer: 1,
    explanation: 'Coverdell ESA contributions are limited to $2,000 per beneficiary per year (from all contributors). Contributions phase out at higher income levels. Funds can be used for elementary/secondary or higher education.',
    reference: 'IRC §530'
  },
  {
    id: 'see1-623',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'ABLE Accounts',
    subtopic: '529A Plans',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'ABLE accounts allow tax-advantaged savings for individuals with disabilities that began before age:',
    options: [
      '18',
      '22',
      '26',
      '65'
    ],
    correctAnswer: 2,
    explanation: 'ABLE accounts are available to individuals with disabilities that began before age 26 (increased from 22 by SECURE 2.0). Annual contributions are generally limited to the gift tax exclusion ($18,000 in 2024).',
    reference: 'IRC §529A'
  },
  {
    id: 'see1-624',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Gift Planning',
    subtopic: 'Gift Splitting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A married couple can use gift splitting to treat a gift from one spouse as:',
    options: [
      'Two gifts, one from each spouse',
      'A gift from the wealthier spouse only',
      'A tax-free transfer regardless of amount',
      'An advance on the unified credit'
    ],
    correctAnswer: 0,
    explanation: 'Gift splitting allows a gift from one spouse to be treated as if each spouse made half. Both spouses must consent (typically on Form 709). This doubles the annual exclusion to $36,000 (2024) for one donee.',
    reference: 'IRC §2513'
  },
  {
    id: 'see1-625',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Disaster Planning',
    subtopic: 'Casualty Loss Rules',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Personal casualty losses under TCJA (2018-2025) are deductible only if:',
    options: [
      'Total losses exceed $100',
      'Attributable to a federally declared disaster',
      'Insurance does not cover the loss',
      'The taxpayer itemizes deductions'
    ],
    correctAnswer: 1,
    explanation: 'Personal casualty and theft losses are deductible only if attributable to a federally declared disaster (2018-2025). The $100 floor per event and 10% of AGI floor still apply. Personal casualty gains can offset losses.',
    reference: 'IRC §165(h)(5)'
  },
  // SEE1-6: Specialized Returns
  {
    id: 'see1-626',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Foreign Tax Credit',
    subtopic: 'FTC vs. Deduction',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A taxpayer with $1,500 in foreign taxes paid should generally:',
    options: [
      'Always deduct foreign taxes on Schedule A',
      'Claim the credit without Form 1116 if exemption requirements are met',
      'Claim no benefit until foreign taxes exceed $10,000',
      'Split between credit and deduction'
    ],
    correctAnswer: 1,
    explanation: 'Taxpayers with $300 or less ($600 MFJ) in creditable foreign taxes from passive income can claim the credit without Form 1116. For $1,500, Form 1116 is required. Credits are generally more beneficial than deductions.',
    reference: 'IRC §901'
  },
  {
    id: 'see1-627',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'U.S. Possession Income',
    subtopic: 'Puerto Rico',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A bona fide resident of Puerto Rico for the entire year:',
    options: [
      'Files only a Puerto Rico return; no U.S. federal return required',
      'Must file Form 1040 reporting worldwide income',
      'Excludes Puerto Rico sourced income on Form 1040 but files to report U.S. source income',
      'Is exempt from all federal taxes'
    ],
    correctAnswer: 2,
    explanation: 'Bona fide Puerto Rico residents exclude PR-source income from U.S. federal tax but must file Form 1040 to report any U.S.-source income. Federal employees must pay U.S. tax on federal wages even if PR residents.',
    reference: 'Pub. 570'
  },
  {
    id: 'see1-628',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Decedent Returns',
    subtopic: 'Final Return',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A decedent\'s final Form 1040 includes income:',
    options: [
      'For the entire year regardless of date of death',
      'Only from January 1 to date of death',
      'Income in respect of a decedent (IRD)',
      'Only income actually received before death'
    ],
    correctAnswer: 1,
    explanation: 'The final 1040 includes income from January 1 to date of death. For cash-basis taxpayers, this means income actually or constructively received through date of death. IRD is reported by the estate or beneficiary, not on the final return.',
    reference: 'Pub. 559'
  },
  {
    id: 'see1-629',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Trust and Estate',
    subtopic: 'Simple vs Complex Trust',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A simple trust differs from a complex trust in that a simple trust:',
    options: [
      'Pays income tax at the trust level',
      'Must distribute all income currently and cannot distribute corpus',
      'Can accumulate income indefinitely',
      'Has no beneficiaries'
    ],
    correctAnswer: 1,
    explanation: 'A simple trust must distribute all income currently (no accumulation), makes no distributions of corpus, and makes no charitable distributions. Income taxed to beneficiaries via K-1. Complex trusts can accumulate income or distribute principal.',
    reference: 'IRC §651'
  },
  {
    id: 'see1-630',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Passive Activities',
    subtopic: 'Real Estate Professionals',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A real estate professional can treat rental real estate activities as non-passive if:',
    options: [
      'They own any rental property',
      'More than half of personal services and 750+ hours are in real property trades/businesses',
      'They file Schedule E',
      'Rental income exceeds $50,000'
    ],
    correctAnswer: 1,
    explanation: 'Real estate professional status requires: (1) more than 50% of personal services in real property trades/businesses, and (2) more than 750 hours in such activities. Each rental activity must also meet material participation.',
    reference: 'IRC §469(c)(7)'
  }
];
