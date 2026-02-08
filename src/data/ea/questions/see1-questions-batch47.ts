/**
 * EA SEE Part 1: Individuals - Questions Batch 47 (Q541-570)
 * Mixed Blueprint Areas for comprehensive coverage
 * 
 * Tax Year: 2024-2025
 */

import { Question } from '../../../types';

export const SEE1_QUESTIONS_BATCH47: Question[] = [
  // SEE1-1: Preliminary Work and Taxpayer Data
  {
    id: 'see1-541',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Requirements',
    subtopic: 'Gross Income Thresholds',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For 2024, a single taxpayer under age 65 must file a return if gross income exceeds:',
    options: [
      '$12,550',
      '$13,850',
      '$14,600',
      '$15,700'
    ],
    correctAnswer: 2,
    explanation: 'For 2024, the filing threshold for a single taxpayer under 65 is $14,600 (standard deduction amount). This threshold equals the standard deduction since taxable income would otherwise be zero or less.',
    reference: 'Pub. 501'
  },
  {
    id: 'see1-542',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Filing Status',
    subtopic: 'Head of Household',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which requirement is NOT necessary to qualify for head of household filing status?',
    options: [
      'Being unmarried at end of year (or considered unmarried)',
      'Paying more than half the cost of keeping up a home',
      'Having a qualifying person live with you for more than half the year',
      'Being a U.S. citizen for the entire year'
    ],
    correctAnswer: 3,
    explanation: 'U.S. citizenship is not a requirement for HOH status. The requirements are: (1) unmarried or considered unmarried, (2) paid more than half the cost of maintaining a home, and (3) a qualifying person lived with you for more than half the year (parents can live elsewhere).',
    reference: 'Pub. 501'
  },
  {
    id: 'see1-543',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Dependents',
    subtopic: 'Qualifying Child Tests',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A 25-year-old who is a full-time student can be claimed as a qualifying child if:',
    options: [
      'Never - the age limit for qualifying child is always 24',
      'Only if the child provides more than half of their own support',
      'If the child is permanently and totally disabled',
      'If the child earned less than $5,050 during the year'
    ],
    correctAnswer: 2,
    explanation: 'There is no age limit for a qualifying child if the child is permanently and totally disabled. Otherwise, the child must be under 19 (or under 24 if a full-time student). The $5,050 gross income test applies only to qualifying relatives.',
    reference: 'IRC §152(c)(3)'
  },
  {
    id: 'see1-544',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Taxpayer Identification',
    subtopic: 'ITIN Requirements',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'An ITIN (Individual Taxpayer Identification Number) is issued to:',
    options: [
      'Any taxpayer who requests one',
      'Foreign nationals who have a federal tax filing requirement but are not eligible for an SSN',
      'U.S. citizens working abroad',
      'Taxpayers who lost their Social Security card'
    ],
    correctAnswer: 1,
    explanation: 'ITINs are issued to individuals who have a federal tax filing or reporting requirement but are not eligible for a Social Security Number. This includes nonresident aliens, resident aliens, and their dependents who cannot get an SSN.',
    reference: 'W-7 Instructions'
  },
  {
    id: 'see1-545',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-1',
    topic: 'Due Dates',
    subtopic: 'Extension Rules',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Form 4868 provides an automatic extension of time to file for how many months?',
    options: [
      '2 months',
      '4 months',
      '6 months',
      '12 months'
    ],
    correctAnswer: 2,
    explanation: 'Form 4868 grants an automatic 6-month extension to file (from April 15 to October 15). However, this is only an extension to file, not to pay. Interest and penalties still apply to unpaid tax after the original due date.',
    reference: 'Form 4868 Instructions'
  },
  // SEE1-2: Income and Assets
  {
    id: 'see1-546',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Wages and Compensation',
    subtopic: 'Fringe Benefits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which employer-provided fringe benefit is taxable to the employee?',
    options: [
      'Health insurance premiums',
      'Dependent care assistance up to $5,000',
      'Personal use of a company car',
      'Qualified transportation benefits up to $315/month'
    ],
    correctAnswer: 2,
    explanation: 'Personal use of a company car is a taxable fringe benefit. The employer must include the fair market value of personal use in the employee\'s W-2. Health insurance, qualified dependent care up to limits, and qualified transportation benefits are excludable.',
    reference: 'Pub. 15-B'
  },
  {
    id: 'see1-547',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Interest Income',
    subtopic: 'Series I Bonds',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Interest on Series I savings bonds:',
    options: [
      'Must be reported annually as it accrues',
      'Is always tax-free',
      'Can be deferred until the bond is redeemed or matures',
      'Is subject to state income tax'
    ],
    correctAnswer: 2,
    explanation: 'Taxpayers can choose to defer reporting Series I bond interest until redemption or final maturity (up to 30 years). Interest is exempt from state and local taxes. The election to report annually applies to all savings bonds owned.',
    reference: 'Pub. 550'
  },
  {
    id: 'see1-548',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Dividend Income',
    subtopic: 'Qualified Dividends',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'To qualify for the lower tax rates on qualified dividends, the shareholder must hold the stock for more than:',
    options: [
      '60 days during the 121-day period around the ex-dividend date',
      '90 days during the 181-day period around the ex-dividend date',
      '45 days during the 91-day period around the ex-dividend date',
      '30 days before the record date'
    ],
    correctAnswer: 0,
    explanation: 'For common stock, the holding period requirement is more than 60 days during the 121-day period beginning 60 days before the ex-dividend date. Preferred stock dividends require more than 90 days during a 181-day period.',
    reference: 'IRC §1(h)(11)(B)'
  },
  {
    id: 'see1-549',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Capital Gains',
    subtopic: 'Holding Period',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'To qualify for long-term capital gain treatment, an asset must be held for:',
    options: [
      'Exactly 12 months',
      'More than 12 months',
      '6 months or more',
      '18 months or more'
    ],
    correctAnswer: 1,
    explanation: 'Long-term capital gain treatment requires holding the asset for more than 12 months. The holding period begins the day after acquisition and includes the day of sale. Exactly 12 months is short-term.',
    reference: 'IRC §1222'
  },
  {
    id: 'see1-550',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-2',
    topic: 'Rental Income',
    subtopic: 'Schedule E Reporting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer rents out their vacation home for 30 days and uses it personally for 20 days. How is rental income treated?',
    options: [
      'All rental income is taxable; all expenses are deductible',
      'Rental income is taxable; expenses are allocated between rental and personal use',
      'The entire activity is treated as personal use; no Schedule E reporting',
      'Rental income is excluded under the 14-day rental rule'
    ],
    correctAnswer: 1,
    explanation: 'When a residence is rented for 15 or more days AND personal use exceeds the greater of 14 days or 10% of rental days, it\'s a personal residence. Expenses must be allocated, and rental deductions cannot exceed rental income (no loss allowed).',
    reference: 'IRC §280A'
  },
  // SEE1-3: Deductions and Credits
  {
    id: 'see1-551',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Adjustments to Income',
    subtopic: 'HSA Contributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For 2024, what is the maximum HSA contribution for an individual with self-only HDHP coverage who is age 55?',
    options: [
      '$4,150',
      '$5,150',
      '$8,300',
      '$9,300'
    ],
    correctAnswer: 1,
    explanation: 'For 2024, the self-only HSA limit is $4,150. Taxpayers age 55 or older can make an additional $1,000 catch-up contribution, for a total of $5,150. Family coverage limit is $8,300 plus the $1,000 catch-up.',
    reference: 'Rev. Proc. 2023-23'
  },
  {
    id: 'see1-552',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Adjustments to Income',
    subtopic: 'Student Loan Interest',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'The maximum student loan interest deduction is:',
    options: [
      '$1,500',
      '$2,000',
      '$2,500',
      '$4,000'
    ],
    correctAnswer: 2,
    explanation: 'The student loan interest deduction is limited to $2,500 annually. It\'s an above-the-line deduction (adjustment to income) that phases out at higher income levels. The loan must have been taken out solely to pay qualified education expenses.',
    reference: 'IRC §221'
  },
  {
    id: 'see1-553',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Itemized Deductions',
    subtopic: 'Medical Expenses',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Medical expenses are deductible to the extent they exceed what percentage of AGI?',
    options: [
      '5.0%',
      '7.5%',
      '10.0%',
      '2.0%'
    ],
    correctAnswer: 1,
    explanation: 'Medical expenses are deductible only to the extent they exceed 7.5% of AGI. This threshold applies for all taxpayers. Medical expenses include payments for diagnosis, cure, treatment, or prevention of disease.',
    reference: 'IRC §213(a)'
  },
  {
    id: 'see1-554',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Itemized Deductions',
    subtopic: 'SALT Limitation',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The maximum deduction for state and local taxes (SALT) on Schedule A is:',
    options: [
      '$5,000 for all filers',
      '$10,000 ($5,000 MFS)',
      '$15,000 for MFJ',
      'Unlimited if itemizing'
    ],
    correctAnswer: 1,
    explanation: 'TCJA limits the SALT deduction to $10,000 ($5,000 for MFS) through 2025. This includes state and local income taxes (or sales taxes if elected), real property taxes, and personal property taxes. Foreign property taxes are not deductible.',
    reference: 'IRC §164(b)(6)'
  },
  {
    id: 'see1-555',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-3',
    topic: 'Tax Credits',
    subtopic: 'Child Tax Credit',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'For 2024, what is the maximum Child Tax Credit per qualifying child, and what portion is refundable?',
    options: [
      '$2,000 credit; up to $1,700 refundable (ACTC)',
      '$3,000 credit; fully refundable',
      '$2,500 credit; up to $1,500 refundable',
      '$3,600 credit; up to $1,400 refundable'
    ],
    correctAnswer: 0,
    explanation: 'For 2024, the CTC is $2,000 per qualifying child under 17. The Additional Child Tax Credit (refundable portion) is up to $1,700. The credit phases out starting at $200,000 AGI ($400,000 MFJ).',
    reference: 'IRC §24'
  },
  // SEE1-4: Taxation
  {
    id: 'see1-556',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Tax Computation',
    subtopic: 'Tax Rate Brackets',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'For 2024, what is the top marginal tax rate for ordinary income?',
    options: [
      '35%',
      '37%',
      '39.6%',
      '40.8%'
    ],
    correctAnswer: 1,
    explanation: 'The top marginal rate under TCJA is 37%, applying to taxable income above $609,350 for single filers ($731,200 MFJ) for 2024. This rate is scheduled through 2025 unless extended.',
    reference: 'IRC §1'
  },
  {
    id: 'see1-557',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Alternative Minimum Tax',
    subtopic: 'AMT Exemption',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'For 2024, what is the AMT exemption amount for a married filing jointly taxpayer?',
    options: [
      '$85,700',
      '$126,500',
      '$133,300',
      '$159,100'
    ],
    correctAnswer: 2,
    explanation: 'The 2024 AMT exemption for MFJ is $133,300. The exemption phases out at 25 cents per dollar of AMTI above $1,218,700 (MFJ). The exemption is fully eliminated when AMTI reaches $1,751,900 for MFJ.',
    reference: 'IRC §55(d); Rev. Proc. 2023-34'
  },
  {
    id: 'see1-558',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Self-Employment Tax',
    subtopic: 'SE Tax Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The self-employment tax rate for 2024 is:',
    options: [
      '12.4% on all net SE income',
      '15.3% on the first $168,600 of net SE income',
      '15.3% on 92.35% of net SE income, with Social Security portion capped at $168,600',
      '12.4% plus unlimited 2.9% Medicare'
    ],
    correctAnswer: 2,
    explanation: 'SE tax is 15.3% (12.4% SS + 2.9% Medicare) on 92.35% of net SE earnings. The Social Security portion is capped at the wage base ($168,600 for 2024). Medicare has no cap, plus an additional 0.9% on earnings above $200,000.',
    reference: 'IRC §1401'
  },
  {
    id: 'see1-559',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Net Investment Income Tax',
    subtopic: 'NIIT Threshold',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The 3.8% Net Investment Income Tax applies to individuals with MAGI above:',
    options: [
      '$125,000 single, $250,000 MFJ',
      '$200,000 single, $250,000 MFJ',
      '$200,000 single, $400,000 MFJ',
      '$250,000 single, $500,000 MFJ'
    ],
    correctAnswer: 1,
    explanation: 'The 3.8% NIIT applies to the lesser of net investment income or the excess of MAGI over $200,000 (single/HOH) or $250,000 (MFJ). These thresholds are not indexed for inflation.',
    reference: 'IRC §1411'
  },
  {
    id: 'see1-560',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-4',
    topic: 'Estimated Tax',
    subtopic: 'Safe Harbor Rules',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To avoid an estimated tax penalty, a taxpayer with prior year AGI over $150,000 must pay at least:',
    options: [
      '90% of current year tax',
      '100% of prior year tax',
      '110% of prior year tax',
      'Either 100% of current year or 110% of prior year tax'
    ],
    correctAnswer: 2,
    explanation: 'For taxpayers with prior year AGI over $150,000 ($75,000 MFS), the safe harbor is 110% of prior year tax liability. For those at or below this threshold, 100% of prior year tax is sufficient.',
    reference: 'IRC §6654(d)(1)(C)'
  },
  // SEE1-5: Advising the Individual Taxpayer
  {
    id: 'see1-561',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Tax Planning',
    subtopic: 'Bunching Deductions',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'The "bunching" strategy for itemized deductions is most effective when:',
    options: [
      'A taxpayer\'s items deductions are consistently well above the standard deduction',
      'A taxpayer\'s items deductions are slightly above or below the standard deduction',
      'A taxpayer has primarily state tax deductions',
      'A taxpayer only has mortgage interest'
    ],
    correctAnswer: 1,
    explanation: 'Bunching is most effective when deductions hover around the standard deduction threshold. By concentrating deductible expenses (like charitable contributions) in alternating years, taxpayers can itemize in some years and take the standard deduction in others.',
    reference: 'Tax Planning Strategies'
  },
  {
    id: 'see1-562',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Retirement Planning',
    subtopic: 'Traditional vs. Roth IRA',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A Roth IRA is generally more advantageous than a traditional IRA when the taxpayer expects:',
    options: [
      'To be in a lower tax bracket in retirement',
      'To be in a higher tax bracket in retirement',
      'To withdraw funds before age 59½',
      'Income limitations prevent Roth contributions'
    ],
    correctAnswer: 1,
    explanation: 'Roth IRAs are advantageous when the taxpayer expects higher tax rates in retirement since qualified withdrawals are tax-free. If tax rates will be lower in retirement, traditional IRAs provide more benefit through current deductions.',
    reference: 'Pub. 590-A'
  },
  {
    id: 'see1-563',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Education Planning',
    subtopic: '529 Plan Benefits',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Qualified distributions from a 529 education savings plan are:',
    options: [
      'Fully taxable at the beneficiary\'s rate',
      'Tax-free if used for qualified education expenses',
      'Subject to a 10% early withdrawal penalty regardless of use',
      'Deductible on the federal return'
    ],
    correctAnswer: 1,
    explanation: '529 plan distributions are tax-free when used for qualified education expenses including tuition, room and board, books, and up to $10,000/year for K-12 tuition. Non-qualified distributions are taxable and subject to a 10% penalty on earnings.',
    reference: 'IRC §529'
  },
  {
    id: 'see1-564',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Health Savings Accounts',
    subtopic: 'HSA Eligibility',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To contribute to an HSA, a taxpayer must meet all of the following requirements EXCEPT:',
    options: [
      'Be covered by a high-deductible health plan (HDHP)',
      'Have no other health coverage (with certain exceptions)',
      'Not be enrolled in Medicare',
      'Be age 59½ or older'
    ],
    correctAnswer: 3,
    explanation: 'There is no minimum age for HSA eligibility. Requirements include: (1) coverage under an HDHP, (2) no other health coverage, (3) not enrolled in Medicare, and (4) cannot be claimed as a dependent. In fact, those 55+ can make catch-up contributions.',
    reference: 'IRC §223'
  },
  {
    id: 'see1-565',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-5',
    topic: 'Penalty Avoidance',
    subtopic: 'Early Withdrawal Penalties',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which of the following is NOT an exception to the 10% early withdrawal penalty for traditional IRA distributions before age 59½?',
    options: [
      'Substantially equal periodic payments (SEPP)',
      'First-time home purchase (up to $10,000 lifetime)',
      'Higher education expenses for taxpayer, spouse, or dependents',
      'Purchase of a new vehicle for work commuting'
    ],
    correctAnswer: 3,
    explanation: 'Vehicle purchases are not an exception. Penalty exceptions include: death, disability, SEPP, medical expenses exceeding 7.5% AGI, health insurance premiums while unemployed, higher education, and first-time home purchase (up to $10,000).',
    reference: 'IRC §72(t)'
  },
  // SEE1-6: Specialized Returns
  {
    id: 'see1-566',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Foreign Income',
    subtopic: 'FBAR Requirements',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A U.S. person must file an FBAR (FinCEN Form 114) if the aggregate value of foreign financial accounts exceeds what amount during the calendar year?',
    options: [
      '$10,000',
      '$50,000',
      '$100,000',
      '$200,000'
    ],
    correctAnswer: 0,
    explanation: 'FBAR is required when the aggregate value of all foreign financial accounts exceeds $10,000 at any time during the calendar year. The FBAR is filed electronically with FinCEN, not with the tax return, by April 15 (with automatic extension to October 15).',
    reference: '31 CFR §1010.350'
  },
  {
    id: 'see1-567',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Nonresident Aliens',
    subtopic: 'Tax Treaty Benefits',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A nonresident alien claiming tax treaty benefits must file:',
    options: [
      'Form 1040',
      'Form 1040-NR with Form 8833',
      'Only Form W-8BEN',
      'Form 1040-SR'
    ],
    correctAnswer: 1,
    explanation: 'Nonresident aliens file Form 1040-NR. When claiming treaty benefits that override U.S. tax law, Form 8833 (Treaty-Based Return Position Disclosure) must be attached. W-8BEN is for withholding, not tax return filing.',
    reference: 'Form 1040-NR Instructions'
  },
  {
    id: 'see1-568',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Estate and Gift',
    subtopic: 'Gift Tax Exclusion',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'For 2024, the annual gift tax exclusion is:',
    options: [
      '$16,000 per donee',
      '$17,000 per donee',
      '$18,000 per donee',
      '$19,000 per donee'
    ],
    correctAnswer: 2,
    explanation: 'The 2024 annual gift tax exclusion is $18,000 per donee ($36,000 for split gifts by married couples). Gifts within the exclusion require no gift tax return. The exclusion is indexed for inflation in $1,000 increments.',
    reference: 'IRC §2503(b); Rev. Proc. 2023-34'
  },
  {
    id: 'see1-569',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Expatriation',
    subtopic: 'Covered Expatriate Rules',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A "covered expatriate" subject to the exit tax is a U.S. citizen who meets any of the following tests EXCEPT:',
    options: [
      'Average annual net income tax liability exceeding $201,000 for the prior 5 years',
      'Net worth of $2 million or more on the expatriation date',
      'Failure to certify 5-year tax compliance',
      'Having been a U.S. citizen for less than 5 years'
    ],
    correctAnswer: 3,
    explanation: 'Covered expatriate tests are: (1) average income tax > $201,000 (2024) for prior 5 years, (2) net worth ≥ $2 million, or (3) failure to certify tax compliance for prior 5 years. Length of citizenship is not a determining factor for these tests.',
    reference: 'IRC §877A'
  },
  {
    id: 'see1-570',
    courseId: 'ea',
    section: 'SEE1',
    blueprintArea: 'SEE1-6',
    topic: 'Amended Returns',
    subtopic: 'Carryback Claims',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An amended return to carry back a net operating loss (NOL) from 2024 can generally be carried back:',
    options: [
      '2 years',
      '3 years',
      '5 years',
      'NOLs cannot be carried back under current law (forward only)'
    ],
    correctAnswer: 3,
    explanation: 'Under TCJA (as amended), NOLs arising in tax years after 2020 generally cannot be carried back and can only be carried forward indefinitely. Carryforwards are limited to 80% of taxable income. Farming losses have special 2-year carryback rules.',
    reference: 'IRC §172'
  }
];
