/**
 * CFP Tax Questions - Batch 10
 * Domain 5: Tax Planning (14% of exam)
 * 25 additional questions covering tax planning topics
 */

import { Question } from '../../../types';

export const CFP_TAX_BATCH10_QUESTIONS: Question[] = [
  // TAX-1: Income Tax Fundamentals
  {
    id: 'CFP-TAX-B10-001',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Tax Home',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For travel expense deduction purposes, a taxpayer\'s "tax home" is:',
    options: [
      'A) Where they live',
      'B) The area of their regular place of business, regardless of where their personal residence is located',
      'C) Their state of residence',
      'D) Where they pay the most taxes'
    ],
    correctAnswer: 1,
    explanation: 'Tax home: your regular place of business (main work location), not necessarily where you live. Travel expenses are deductible when away from tax home overnight for business. If no regular place of business, tax home may be personal residence. Transient workers may have no tax home, making travel expenses non-deductible.'
  },
  {
    id: 'CFP-TAX-B10-002',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Dependent Care FSA',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A Dependent Care FSA allows employees to:',
    options: [
      'A) Save for future childcare',
      'B) Set aside pre-tax dollars for qualifying dependent care expenses enabling work, up to $5,000 annually',
      'C) Cover healthcare costs',
      'D) Fund children\'s education'
    ],
    correctAnswer: 1,
    explanation: 'Dependent Care FSA: pre-tax contribution for care of qualifying persons (child under 13, disabled spouse/dependent) enabling work. Max: $5,000/year ($2,500 MFS). Use-it-or-lose-it (some employers allow grace period or carryover up to $500). Reduces AGI. Coordinates with child care credit—can\'t use same expenses for both.'
  },
  {
    id: 'CFP-TAX-B10-003',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Above-the-Line Deductions',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Above-the-line deductions are valuable because they:',
    options: [
      'A) Only benefit itemizers',
      'B) Reduce adjusted gross income, which affects eligibility for various credits and deductions regardless of itemizing',
      'C) Are unlimited in amount',
      'D) Are refundable'
    ],
    correctAnswer: 1,
    explanation: 'Above-the-line (ATL) deductions reduce AGI—beneficial even if you take standard deduction. Lower AGI affects: IRA contribution deductibility, child tax credit, education credits, student loan interest deduction, Social Security taxation, ACA subsidy eligibility. Examples: IRA contributions, student loan interest, self-employed health insurance, HSA contributions.'
  },
  // TAX-2: Deductions and Credits
  {
    id: 'CFP-TAX-B10-004',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions',
    subtopic: 'Charitable Contributions Limits',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Charitable cash contributions to public charities are generally limited to:',
    options: [
      'A) 20% of AGI',
      'B) 60% of AGI, with unused amounts carrying forward for up to five years',
      'C) 100% of AGI',
      'D) $250 per organization'
    ],
    correctAnswer: 1,
    explanation: 'Charitable deduction limits depend on charity type and gift type. Public charities—cash: 60% of AGI; appreciated property: 30% (or 50% at basis). Private foundations: lower limits (30% cash, 20% property). Excess carries forward 5 years. Must itemize to deduct. Substantiation requirements increase with gift size ($250+ requires acknowledgment).'
  },
  {
    id: 'CFP-TAX-B10-005',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Credits',
    subtopic: 'American Opportunity Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The American Opportunity Tax Credit:',
    options: [
      'A) Has no income limits',
      'B) Provides up to $2,500 per student for the first four years of college, with 40% refundable',
      'C) Is only for graduate school',
      'D) Requires full-time enrollment'
    ],
    correctAnswer: 1,
    explanation: 'AOTC: 100% of first $2,000 + 25% of next $2,000 = max $2,500. First four years of college only. 40% ($1,000) refundable. Half-time enrollment minimum. Income phaseout: $80K-$90K single, $160K-$180K MFJ. Qualified expenses: tuition, fees, books, supplies. Better than Lifetime Learning Credit for most undergraduates.'
  },
  {
    id: 'CFP-TAX-B10-006',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Credits',
    subtopic: 'Adoption Credit',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The adoption tax credit:',
    options: [
      'A) Is unlimited',
      'B) Provides a nonrefundable credit for qualified adoption expenses up to $15,950 (2023), with special rules for special needs adoptions',
      'C) Applies only to international adoptions',
      'D) Requires itemizing'
    ],
    correctAnswer: 1,
    explanation: 'Adoption credit: max $15,950 (2023) for qualified expenses. Special needs: credit available regardless of actual expenses. Income phaseout applies. Non-refundable but carries forward 5 years. Domestic adoption: year expenses paid or child placed. International: year finalized. Employer adoption assistance exclusion has same limit (coordinate).'
  },
  // TAX-3: Investment Taxation
  {
    id: 'CFP-TAX-B10-007',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Investment Tax',
    subtopic: 'Bond Premium Amortization',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When a taxable bond is purchased at a premium:',
    options: [
      'A) The premium is deductible at sale',
      'B) Taxpayers may elect to amortize the premium annually, reducing interest income and basis',
      'C) No adjustment is needed',
      'D) Premium increases at maturity'
    ],
    correctAnswer: 1,
    explanation: 'Bond premium (cost > par): can elect to amortize annually. Reduces interest income (prefer for taxable bonds) and reduces basis. Tax-exempt bond premium must be amortized (no election) with basis reduction but no deduction. Method: yield-to-maturity or constant yield. Without amortization, lose premium as capital loss at maturity. Election is permanent.'
  },
  {
    id: 'CFP-TAX-B10-008',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Investment Tax',
    subtopic: 'Market Discount Bonds',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Market discount on a bond (purchased below par but above OID) results in:',
    options: [
      'A) Tax-free gains',
      'B) Ordinary income on the discount portion when sold or redeemed, unless an election to accrue is made',
      'C) Capital loss at maturity',
      'D) No tax consequences'
    ],
    correctAnswer: 1,
    explanation: 'Market discount: buy existing bond below adjusted issue price. At sale/maturity, accrued market discount is ordinary income (not capital gain). Can elect to include discount annually instead. If not elected, interest expense allocable to market discount bonds may be deferred. Differs from OID which accrues to original buyer. Complex rules—track carefully.'
  },
  {
    id: 'CFP-TAX-B10-009',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Investment Tax',
    subtopic: 'PFIC',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A Passive Foreign Investment Company (PFIC) creates tax issues because:',
    options: [
      'A) Income is tax-free',
      'B) Excess distributions and gains face punitive tax treatment with interest charges unless special elections are made',
      'C) Only dividends are taxed',
      'D) It qualifies for lower rates'
    ],
    correctAnswer: 1,
    explanation: 'PFIC: foreign corporation with passive income/assets. Default: "excess distribution" regime—gains and excess distributions taxed at top ordinary rates plus interest (as if earned ratably over holding period). QEF election: include share of income annually to avoid. Mark-to-market election: include annual gains. Foreign mutual funds often PFICs. Complex reporting (Form 8621).'
  },
  // TAX-4: Business Taxation
  {
    id: 'CFP-TAX-B10-010',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'LLC Taxation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A single-member LLC is taxed by default as:',
    options: [
      'A) A corporation',
      'B) A disregarded entity (Schedule C for individual owners), though it can elect corporate treatment',
      'C) A partnership',
      'D) A tax-exempt entity'
    ],
    correctAnswer: 1,
    explanation: 'LLC tax classification (check-the-box): Single-member: disregarded entity—reported on owner\'s return (Schedule C if individual). Multi-member: partnership. Either can elect corporate (C or S) treatment. LLC provides liability protection regardless of tax classification. Flexibility to choose tax treatment is an LLC advantage.'
  },
  {
    id: 'CFP-TAX-B10-011',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'Estimated Tax Payments',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Self-employed individuals must make estimated tax payments to avoid penalties if they expect to owe:',
    options: [
      'A) Any tax',
      'B) At least $1,000 after subtracting withholding and credits, unless safe harbor exceptions apply',
      'C) $500 or more',
      'D) Nothing if they file on time'
    ],
    correctAnswer: 1,
    explanation: 'Estimated tax required if expecting to owe $1,000+ after withholding/credits. Safe harbors: pay 100% of prior year tax (110% if AGI > $150K) or 90% of current year tax. Quarterly: April 15, June 15, September 15, January 15. Penalties for underpayment. Self-employed must cover both income tax and self-employment tax. Withholding from other sources counts.'
  },
  {
    id: 'CFP-TAX-B10-012',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'Meals and Entertainment',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Under current law, entertainment expenses for business purposes are:',
    options: [
      'A) 50% deductible',
      'B) Generally not deductible after TCJA, though business meals remain 50% deductible',
      'C) Fully deductible',
      'D) 100% deductible for employees'
    ],
    correctAnswer: 1,
    explanation: 'Post-TCJA: entertainment expenses not deductible (golf, theater, sporting events—even with business discussion). Business meals: 50% deductible if directly related/associated with business. Temporarily 100% for restaurant meals (2021-2022) expired. Meals at entertainment events can be deducted if separated and reasonable. Important distinction in record-keeping.'
  },
  // TAX-5: Estate and Gift Tax
  {
    id: 'CFP-TAX-B10-013',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Estate/Gift Tax',
    subtopic: 'Alternate Valuation Date',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The alternate valuation date for estate tax purposes:',
    options: [
      'A) Is always required',
      'B) Allows valuation six months after death if it reduces both the gross estate value and estate tax liability',
      'C) Is 12 months after death',
      'D) Only applies to real property'
    ],
    correctAnswer: 1,
    explanation: 'IRC 2032: elect to value estate assets 6 months after death (or earlier disposition date). Only available if it reduces BOTH estate value and estate tax. Benefit: if assets declined in value, pay tax on lower value. Downside: beneficiaries get lower stepped-up basis. Must be elected by executor. Evaluate trade-off between estate tax savings and income tax basis.'
  },
  {
    id: 'CFP-TAX-B10-014',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Estate/Gift Tax',
    subtopic: 'QTIP Trust',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A Qualified Terminable Interest Property (QTIP) trust:',
    options: [
      'A) Gives spouse full control',
      'B) Qualifies for the marital deduction while allowing the first spouse to control ultimate distribution to remaindermen',
      'C) Avoids all estate taxes',
      'D) Is revocable'
    ],
    correctAnswer: 1,
    explanation: 'QTIP: spouse gets all income at least annually, trust assets in spouse\'s estate at death, but first-to-die controls who receives remainder. Marital deduction available with QTIP election. Uses: blended families (income to surviving spouse, remainder to first spouse\'s children), protect from new spouse, manage assets for spouse. Common estate planning tool.'
  },
  {
    id: 'CFP-TAX-B10-015',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Estate/Gift Tax',
    subtopic: 'Gift Tax Return Filing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A gift tax return (Form 709) is required when:',
    options: [
      'A) Any gift is made',
      'B) Gifts to any individual exceed the annual exclusion, gifts are made to non-citizen spouse, or certain trust/split gifts are made',
      'C) Only if tax is due',
      'D) Never for married couples'
    ],
    correctAnswer: 1,
    explanation: 'Form 709 required: gifts exceeding annual exclusion per donee, gifts to non-citizen spouse (even if under limit), gift splitting election, gifts of future interests, generation-skipping gifts. Not required: qualified tuition/medical payments, gifts within annual exclusion to citizens. Due April 15 (extensions available). File even if no tax due.'
  },
  // Additional Topics
  {
    id: 'CFP-TAX-B10-016',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Claim of Right Doctrine',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The claim of right doctrine establishes that:',
    options: [
      'A) Only actual ownership triggers tax',
      'B) Income received under claim of right is taxable when received, even if later returned or found not to belong to taxpayer',
      'C) Claims are never taxable',
      'D) Rights must be proven first'
    ],
    correctAnswer: 1,
    explanation: 'Claim of right: if you receive income under a claim you\'re entitled to it (without restriction), it\'s taxable in year received—even if later returned. If later repaid: deduction in repayment year, or if over $3,000, special Section 1341 relief (deduct or credit, whichever is better). Prevents deferral through disputed income claims.'
  },
  {
    id: 'CFP-TAX-B10-017',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions',
    subtopic: 'Qualified Business Income Limitations',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'For non-SSTB businesses above the income threshold, the QBI deduction is limited to the greater of:',
    options: [
      'A) 20% of QBI only',
      'B) 50% of W-2 wages or 25% of W-2 wages plus 2.5% of qualified property',
      'C) 10% of business income',
      'D) $10,000 per taxpayer'
    ],
    correctAnswer: 1,
    explanation: 'QBI deduction limitations above threshold ($191,950 single/$383,900 MFJ): for non-SSTBs, limited to greater of 50% of W-2 wages OR 25% of W-2 wages + 2.5% of qualified property (unadjusted basis of depreciable property). Phases in between thresholds. Capital-intensive businesses use property; labor-intensive use wages. Complex planning for business structure.'
  },
  {
    id: 'CFP-TAX-B10-018',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Investment Tax',
    subtopic: 'Section 1244 Stock',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Section 1244 small business stock allows:',
    options: [
      'A) Tax-free sales',
      'B) Losses on qualifying stock to be deducted as ordinary losses up to $50,000 ($100,000 MFJ) rather than capital losses',
      'C) Deferral of gains',
      'D) Step-up in basis'
    ],
    correctAnswer: 1,
    explanation: 'Section 1244: losses on qualifying small business stock treated as ordinary losses (deductible against ordinary income) up to $50K single/$100K MFJ annually. Excess is capital loss. Requirements: issued directly by domestic small corporation for money/property, total capital ≤ $1M at issuance. No special treatment for gains. Valuable for startup investors.'
  },
  {
    id: 'CFP-TAX-B10-019',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'Self-Employment Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Self-employment tax applies to net self-employment income and:',
    options: [
      'A) Is fully deductible',
      'B) Equals 15.3% on first $168,600 (2024) of net earnings, with 2.9% on excess, and half is an above-the-line deduction',
      'C) Has no limit',
      'D) Only applies to Schedule C filers'
    ],
    correctAnswer: 1,
    explanation: 'SE tax: covers Social Security (12.4%) + Medicare (2.9%) for self-employed. Social Security portion: wages + SE income up to cap ($168,600 in 2024). Medicare: no cap, plus 0.9% additional Medicare tax on high earners. Calculated on 92.35% of net SE income. Half of SE tax is above-the-line deduction. Partners and LLC members also pay.'
  },
  {
    id: 'CFP-TAX-B10-020',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Estate/Gift Tax',
    subtopic: 'Income in Respect of Decedent',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Income in respect of a decedent (IRD) is:',
    options: [
      'A) Included in estate but not taxed to beneficiaries',
      'B) Income the decedent earned but didn\'t receive, which is both included in the estate and taxable as income to the recipient',
      'C) Exempt from all taxes',
      'D) Only retirement account distributions'
    ],
    correctAnswer: 1,
    explanation: 'IRD: income decedent earned but didn\'t receive before death (unpaid salary, retirement accounts, installment sale payments). Double taxation: included in estate value AND taxable as income when received by beneficiary. No stepped-up basis. Partial relief: beneficiary can deduct estate tax attributable to IRD (Section 691(c) deduction). IRA distributions are IRD.'
  },
  {
    id: 'CFP-TAX-B10-021',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Income Tax',
    subtopic: 'Social Security Taxation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Social Security benefits become taxable when:',
    options: [
      'A) You reach age 65',
      'B) Combined income (AGI + tax-exempt interest + 50% of SS benefits) exceeds base amounts, with up to 85% taxable',
      'C) Benefits exceed $25,000',
      'D) All benefits are always taxable'
    ],
    correctAnswer: 1,
    explanation: 'SS taxation based on "provisional income": AGI + tax-exempt interest + 50% of benefits. Thresholds: single $25K-$34K (up to 50% taxable), above $34K (up to 85%); MFJ $32K-$44K (50%), above $44K (85%). Planning: manage income to stay below thresholds. Roth conversions, timing of IRA withdrawals, municipal bonds affect taxation.'
  },
  {
    id: 'CFP-TAX-B10-022',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Credits',
    subtopic: 'Foreign Tax Credit',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The foreign tax credit:',
    options: [
      'A) Is always preferable to a deduction',
      'B) Offsets U.S. tax on foreign-source income but is limited to U.S. tax attributable to that income, with excess carrying forward',
      'C) Has no limitations',
      'D) Only applies to businesses'
    ],
    correctAnswer: 1,
    explanation: 'Foreign tax credit prevents double taxation of foreign income. Limit: U.S. tax × (Foreign source income / Total income). If foreign tax exceeds limit, excess carries forward 10 years/back 1 year. Generally better than deduction. Separate limits for passive/general income categories. Simple method available for small amounts of qualified foreign taxes.'
  },
  {
    id: 'CFP-TAX-B10-023',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Investment Tax',
    subtopic: 'Qualified Small Business Stock',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Qualified Small Business Stock (Section 1202) exclusion:',
    options: [
      'A) Is 50% of gains',
      'B) Allows 100% exclusion of gains (acquired after 9/27/2010) up to $10M or 10× basis, on stock held 5+ years',
      'C) Has no holding period',
      'D) Applies to any stock'
    ],
    correctAnswer: 1,
    explanation: 'Section 1202 QSBS: stock in qualified C corp, held 5+ years, acquired at original issuance. 100% gain exclusion (post-9/27/2010; earlier acquisitions 50-75%). Limit: greater of $10M or 10× adjusted basis. Corporation must be domestic, under $50M assets at issuance, active business (not services, banking, etc.). Powerful incentive for startup founders and investors.'
  },
  {
    id: 'CFP-TAX-B10-024',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Tax',
    subtopic: 'Hobby Loss Rules',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If an activity is classified as a hobby rather than a business:',
    options: [
      'A) All expenses are deductible',
      'B) Income is taxable but expenses cannot offset other income and are limited to hobby income',
      'C) Neither income nor expenses affect taxes',
      'D) Losses carry forward indefinitely'
    ],
    correctAnswer: 1,
    explanation: 'Hobby classification: income is taxable, but post-TCJA hobby expenses aren\'t deductible at all (previously limited to hobby income as misc itemized). Business intent factors: profit motive, time/effort, expertise, success history, income compared to losses, expectation of appreciation. Presumption of business if profitable 3 of 5 years (2 of 7 for horses).'
  },
  {
    id: 'CFP-TAX-B10-025',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-5',
    topic: 'Estate/Gift Tax',
    subtopic: 'Crummey Powers',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Crummey powers in an irrevocable trust:',
    options: [
      'A) Reduce the trust value',
      'B) Give beneficiaries a temporary right to withdraw contributions, converting gifts to present interests qualifying for annual exclusion',
      'C) Allow grantor to revoke the trust',
      'D) Increase estate taxes'
    ],
    correctAnswer: 1,
    explanation: 'Crummey powers: beneficiary has limited time (typically 30 days) to withdraw contributed amount. This makes gift a present interest (qualifies for annual exclusion) rather than future interest. Without Crummey power, gifts to irrevocable trusts would use lifetime exemption. Power usually lapses unused. Commonly used in ILITs for premium payments. Named after Crummey v. Commissioner.'
  }
];
