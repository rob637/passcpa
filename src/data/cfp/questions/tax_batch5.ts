/**
 * CFP Tax Planning Questions - Batch 5
 * Domain 5: Tax Planning (14% of exam)
 * 25 additional questions covering income tax, deductions, credits, and strategies
 */

import { Question } from '../../../types';

export const CFP_TAX_BATCH5_QUESTIONS: Question[] = [
  // TAX-1: Income Tax Fundamentals
  {
    id: 'CFP-TAX-B5-001',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Gross vs. Taxable Income',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Taxable income is calculated as:',
    options: [
      'A) Gross income minus deductions minus exemptions',
      'B) Adjusted gross income minus the greater of standard or itemized deductions',
      'C) Gross income minus all expenses',
      'D) Total income with no adjustments'
    ],
    correctAnswer: 1,
    explanation: 'Taxable income = AGI minus deductions (greater of standard or itemized). Since 2018, personal exemptions are suspended under TCJA. AGI is calculated by subtracting above-the-line deductions from gross income.'
  },
  {
    id: 'CFP-TAX-B5-002',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Filing Status',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer whose spouse died in 2024 and who has a dependent child living with them may file as what status for 2025?',
    options: [
      'C) Qualifying Surviving Spouse',
      'B) Married Filing Jointly',
      'A) Single',
      'D) Head of Household',
    ],
    correctAnswer: 0,
    explanation: 'Qualifying Surviving Spouse status is available for 2 years following the year of the spouse\'s death (2025 and 2026 for a 2024 death), provided the taxpayer has not remarried and maintains a household for a dependent child. This status provides the same tax rates and standard deduction as Married Filing Jointly.'
  },
  {
    id: 'CFP-TAX-B5-003',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Capital Gains',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'For 2026, the maximum long-term capital gains rate for a taxpayer in the highest ordinary income bracket is:',
    options: [
      'B) 20%',
      'C) 23.8% (including NIIT)',
      'A) 15%',
      'D) 37%',
    ],
    correctAnswer: 1,
    explanation: 'High-income taxpayers pay 20% on long-term capital gains plus 3.8% Net Investment Income Tax (NIIT), for a total of 23.8%. NIIT applies to taxpayers with MAGI above $200,000 (single) or $250,000 (married filing jointly). Lower brackets pay 0% or 15% on long-term gains.'
  },
  {
    id: 'CFP-TAX-B5-004',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Ordinary vs. Capital',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Which of the following is taxed at ordinary income rates?',
    options: [
      'B) Qualified dividends',
      'C) Short-term capital gains',
      'A) Long-term capital gains from stock sales',
      'D) Gains on collectibles held over one year',
    ],
    correctAnswer: 1,
    explanation: 'Short-term capital gains (assets held one year or less) are taxed at ordinary income rates. Long-term capital gains and qualified dividends receive preferential rates (0%, 15%, or 20%). Collectibles held over one year are capped at 28% but not at ordinary rates.'
  },
  // TAX-2: Deductions and Credits
  {
    id: 'CFP-TAX-B5-005',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions',
    subtopic: 'Itemized Deductions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under current law, which of the following is NOT deductible as an itemized deduction?',
    options: [
      'C) Unreimbursed employee business expenses',
      'A) Home mortgage interest on acquisition debt up to $750,000',
      'B) State and local taxes up to $10,000',
      'D) Charitable contributions',
    ],
    correctAnswer: 0,
    explanation: 'The TCJA suspended the deduction for unreimbursed employee business expenses (2018-2025). Mortgage interest, SALT (capped at $10,000), and charitable contributions remain deductible for itemizers, though many taxpayers now take the larger standard deduction.'
  },
  {
    id: 'CFP-TAX-B5-006',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Credits',
    subtopic: 'Child Tax Credit',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The standard Child Tax Credit for 2026 is:',
    options: [
      'A) $1,000 per qualifying child',
      'C) $3,000 per qualifying child',
      'B) $2,000 per qualifying child',
      'D) $3,600 per qualifying child',
    ],
    correctAnswer: 2,
    explanation: 'The Child Tax Credit is $2,000 per qualifying child under age 17. Up to $1,700 is refundable as the Additional Child Tax Credit for taxpayers with earned income. The credit phases out for higher-income taxpayers ($200,000 single, $400,000 married filing jointly).'
  },
  {
    id: 'CFP-TAX-B5-007',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Credits',
    subtopic: 'Education Credits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer paid $4,000 in qualified tuition for their freshman child. The maximum American Opportunity Tax Credit is:',
    options: [
      'A) $1,000',
      'C) $2,500',
      'B) $2,000',
      'D) $4,000',
    ],
    correctAnswer: 1,
    explanation: 'The AOTC equals 100% of the first $2,000 + 25% of the next $2,000 = $2,000 + $500 = $2,500 maximum. It is available for the first 4 years of higher education. 40% ($1,000) is refundable. Income phase-outs apply ($80,000-$90,000 single, $160,000-$180,000 MFJ).'
  },
  {
    id: 'CFP-TAX-B5-008',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Credits',
    subtopic: 'Credits vs. Deductions',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'For a taxpayer in the 24% bracket, a $1,000 tax credit is worth the same as a:',
    options: [
      'B) $2,400 deduction',
      'A) $1,000 deduction',
      'C) $4,167 deduction',
      'D) $760 deduction',
    ],
    correctAnswer: 2,
    explanation: 'A credit reduces tax liability dollar-for-dollar, while a deduction reduces taxable income. To equal a $1,000 credit in the 24% bracket: Deduction needed = Credit ÷ Tax rate = $1,000 ÷ 0.24 = $4,167. Credits are generally more valuable than deductions.'
  },
  // TAX-3: Tax Strategies
  {
    id: 'CFP-TAX-B5-009',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Tax-Loss Harvesting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A taxpayer sells stock for a $10,000 loss. Within 25 days, they repurchase substantially identical securities. The result is:',
    options: [
      'B) The loss is disallowed under wash sale rules',
      'A) The loss is fully deductible',
      'C) Only 50% of the loss is deductible',
      'D) The loss carries forward indefinitely',
    ],
    correctAnswer: 0,
    explanation: 'The wash sale rule disallows losses when substantially identical securities are purchased within 30 days before or after the sale. The disallowed loss is added to the cost basis of the newly acquired shares. The 25-day repurchase falls within the 30-day window.'
  },
  {
    id: 'CFP-TAX-B5-010',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Bunching Deductions',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A taxpayer whose itemized deductions are slightly below the standard deduction each year might benefit from:',
    options: [
      'A) Always taking the standard deduction',
      'B) Bunching deductions into alternating years',
      'C) Ignoring itemized deductions entirely',
      'D) Filing Form 1040-EZ'
    ],
    correctAnswer: 1,
    explanation: 'Bunching involves accelerating two years of deductions into one year (e.g., making two years of charitable contributions in one year). This allows the taxpayer to itemize in bunched years and take the standard deduction in other years, maximizing total tax benefit over time.'
  },
  {
    id: 'CFP-TAX-B5-011',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Charitable Giving',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A taxpayer donates stock worth $50,000 with a cost basis of $10,000, held for 3 years. Assuming AGI and other limits are not exceeded, the tax benefit is:',
    options: [
      'B) Deduction of $50,000 and no capital gains tax',
      'A) Deduction of $10,000 (basis only)',
      'C) Deduction of $50,000 minus capital gains tax on $40,000',
      'D) No deduction allowed for appreciated property',
    ],
    correctAnswer: 0,
    explanation: 'Donating long-term appreciated securities provides a double tax benefit: a deduction for the fair market value ($50,000) AND avoidance of capital gains tax on the $40,000 appreciation. This is more tax-efficient than selling the stock and donating cash, which would trigger capital gains tax.'
  },
  {
    id: 'CFP-TAX-B5-012',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Qualified Opportunity Zones',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Capital gains invested in a Qualified Opportunity Zone Fund receive which tax benefit?',
    options: [
      'B) Deferral of gain recognition until 2026 or sale, plus potential basis step-up',
      'C) 50% exclusion of the gain',
      'A) Immediate elimination of the capital gain',
      'D) Conversion of short-term to long-term gain',
    ],
    correctAnswer: 0,
    explanation: 'Qualified Opportunity Zone investments provide: (1) deferral of original gain recognition until December 31, 2026 or earlier sale, (2) up to 10% basis step-up if held 5+ years, and (3) exclusion of new appreciation if held 10+ years. The original gain is not eliminated, just deferred.'
  },
  // TAX-4: Business Taxation
  {
    id: 'CFP-TAX-B5-013',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'QBI Deduction',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Qualified Business Income (QBI) deduction allows eligible taxpayers to deduct up to what percentage of qualified business income from pass-through entities?',
    options: [
      'C) 20%',
      'B) 15%',
      'A) 10%',
      'D) 25%',
    ],
    correctAnswer: 0,
    explanation: 'The Section 199A QBI deduction allows eligible taxpayers to deduct up to 20% of qualified business income from partnerships, S corporations, and sole proprietorships. The deduction is subject to taxable income limits, wage/capital limitations for higher-income taxpayers, and exclusions for specified services trades or businesses.'
  },
  {
    id: 'CFP-TAX-B5-014',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'Self-Employment Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A self-employed consultant has net self-employment income of $100,000. What is the approximate self-employment tax?',
    options: [
      'A) $7,650',
      'C) $15,300',
      'B) $14,130',
      'D) $12,400',
    ],
    correctAnswer: 2,
    explanation: 'Self-employment tax is 15.3% of net SE income (12.4% Social Security + 2.9% Medicare), but only 92.35% of net SE income is subject to the tax. $100,000 × 0.9235 × 0.153 = $14,130. The Social Security portion is capped at the wage base ($168,600 for 2024), but there is no cap on Medicare tax.'
  },
  {
    id: 'CFP-TAX-B5-015',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'Section 179',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Section 179 allows a business to:',
    options: [
      'C) Take double-declining balance depreciation',
      'A) Defer depreciation deductions to future years',
      'B) Immediately expense qualifying property instead of depreciating over time',
      'D) Avoid recapture on disposal of assets',
    ],
    correctAnswer: 2,
    explanation: 'Section 179 allows immediate expensing of qualifying business property (equipment, machinery, software) in the year placed in service, rather than depreciating over multiple years. This accelerates tax deductions. There are annual dollar limits and phase-outs for high amounts of property placed in service.'
  },
  // TAX-1: Additional Income Topics
  {
    id: 'CFP-TAX-B5-016',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'AMT',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Which is a common "preference item" that can trigger Alternative Minimum Tax (AMT)?',
    options: [
      'C) Long-term capital gains',
      'A) Qualified dividends',
      'B) Tax-exempt private activity bond interest',
      'D) Ordinary income',
    ],
    correctAnswer: 2,
    explanation: 'Interest from private activity municipal bonds (used to finance stadiums, airports, etc.) is tax-exempt for regular tax but is a preference item for AMT. Other AMT triggers include incentive stock option exercises, large state tax deductions, and depletion. The TCJA significantly reduced AMT exposure for most taxpayers by raising exemption amounts.'
  },
  {
    id: 'CFP-TAX-B5-017',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Passive Activity Rules',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Passive activity losses can generally be used to offset:',
    options: [
      'A) Wages and salaries',
      'B) Portfolio income (interest and dividends)',
      'C) Other passive income',
      'D) All forms of income without limitation'
    ],
    correctAnswer: 2,
    explanation: 'Passive activity loss rules limit the use of losses from passive activities (businesses without material participation, rental real estate) to offsetting passive income only. Excess passive losses are suspended and carried forward. Exceptions exist for real estate professionals and $25,000 for actively-participated rental real estate.'
  },
  {
    id: 'CFP-TAX-B5-018',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Net Investment Income Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The 3.8% Net Investment Income Tax applies to:',
    options: [
      'A) All investment income regardless of taxpayer income',
      'B) Investment income for taxpayers with MAGI above threshold ($200K single/$250K MFJ)',
      'C) Only capital gains, not interest or dividends',
      'D) Only taxpayers subject to AMT'
    ],
    correctAnswer: 1,
    explanation: 'The 3.8% NIIT applies to the lesser of net investment income or the amount by which MAGI exceeds $200,000 (single) or $250,000 (married filing jointly). Investment income includes interest, dividends, capital gains, rents, and royalties. It does not apply to tax-exempt income or distributions from retirement accounts.'
  },
  // TAX-2: Additional Credits
  {
    id: 'CFP-TAX-B5-019',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Credits',
    subtopic: 'Saver\'s Credit',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Retirement Savings Contributions Credit (Saver\'s Credit) is designed to:',
    options: [
      'B) Encourage low-and moderate-income earners to save for retirement',
      'C) Provide additional contributions to 401(k) plans',
      'A) Help high-income earners maximize retirement savings',
      'D) Replace employer matching contributions',
    ],
    correctAnswer: 0,
    explanation: 'The Saver\'s Credit provides low- and moderate-income taxpayers a credit of up to 50% of retirement contributions up to $2,000 ($4,000 for MFJ), for a maximum $1,000 credit ($2,000 MFJ). The percentage (50%, 20%, or 10%) depends on filing status and AGI. It phases out at relatively low income levels.'
  },
  {
    id: 'CFP-TAX-B5-020',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions',
    subtopic: 'Medical Expense Deduction',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Medical expenses are deductible to the extent they exceed what percentage of AGI?',
    options: [
      'B) 7.5%',
      'A) 2%',
      'C) 10%',
      'D) 12.5%',
    ],
    correctAnswer: 0,
    explanation: 'Unreimbursed medical expenses are deductible as an itemized deduction to the extent they exceed 7.5% of AGI. Only the amount above this threshold is deductible. This includes costs for diagnosis, treatment, and prevention of disease, as well as insurance premiums.'
  },
  // TAX-3: Additional Strategies
  {
    id: 'CFP-TAX-B5-021',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Installment Sales',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An installment sale allows a taxpayer to:',
    options: [
      'C) Convert capital gains to ordinary income',
      'B) Recognize gain proportionally as payments are received',
      'A) Eliminate capital gains entirely',
      'D) Defer all taxes until the final payment',
    ],
    correctAnswer: 1,
    explanation: 'Installment sales allow sellers to recognize gain proportionally as payments are received over time (so-called gross profit ratio × payment received = gain recognized). This spreads the tax liability over the installment period. Interest must also be charged on deferred payments. Ordinary income portions and depreciation recapture are recognized in year of sale.'
  },
  {
    id: 'CFP-TAX-B5-022',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Section 1031 Exchange',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A Section 1031 like-kind exchange now applies only to:',
    options: [
      'C) Personal property used in a trade or business',
      'B) Real property held for business or investment purposes',
      'A) All investment property',
      'D) Stocks, bonds, and securities',
    ],
    correctAnswer: 1,
    explanation: 'Since 2018, Section 1031 like-kind exchanges are limited to real property held for productive use in a trade or business or for investment. Personal property (equipment, vehicles) no longer qualifies. To fully defer gain, the replacement property value must equal or exceed the relinquished property value.'
  },
  {
    id: 'CFP-TAX-B5-023',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Donor-Advised Funds',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A donor-advised fund (DAF) is advantageous for charitable giving because:',
    options: [
      'B) The donor receives an immediate deduction but can recommend grants over time',
      'C) DAFs can only accept cash contributions',
      'A) Contributions are never tax-deductible',
      'D) DAFs must distribute all funds within one year',
    ],
    correctAnswer: 0,
    explanation: 'DAFs provide an immediate income tax deduction when contributed, but the donor can recommend grants to charities over many years. This allows for bunching deductions in high-income years while maintaining ongoing charitable support. DAFs accept appreciated securities, avoiding capital gains tax.'
  },
  // TAX-4: Additional Business Topics
  {
    id: 'CFP-TAX-B5-024',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'Entity Selection',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which entity type potentially offers both liability protection AND the 20% QBI deduction?',
    options: [
      'C) General Partnership',
      'A) C Corporation',
      'B) S Corporation',
      'D) Sole Proprietorship',
    ],
    correctAnswer: 2,
    explanation: 'S Corporations provide liability protection (as a corporation) while passing income through to shareholders, potentially qualifying for the 20% QBI deduction. C Corporations do not qualify for QBI (they pay corporate tax). Sole proprietors qualify for QBI but lack liability protection. General partnerships offer neither liability protection nor entity-level advantages.'
  },
  {
    id: 'CFP-TAX-B5-025',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'Reasonable Compensation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An S Corporation shareholder-employee must pay themselves reasonable compensation to:',
    options: [
      'A) Maximize the QBI deduction',
      'C) Qualify for maximum Social Security benefits',
      'B) Avoid IRS reclassification of distributions as wages subject to payroll taxes',
      'D) Reduce corporate-level taxation',
    ],
    correctAnswer: 2,
    explanation: 'The IRS requires S Corporation shareholder-employees to receive "reasonable compensation" for services rendered. Distributing profits without adequate wages is a tax avoidance strategy that can be challenged. Wages are subject to payroll taxes (FICA), while distributions are not. The IRS can reclassify distributions as wages and assess back taxes and penalties.'
  }
];
