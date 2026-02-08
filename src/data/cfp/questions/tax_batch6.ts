/**
 * CFP Tax Questions - Batch 6
 * Domain 5: Tax Planning (14% of exam)
 * 25 additional questions covering advanced tax topics
 */

import { Question } from '../../../types';

export const CFP_TAX_BATCH6_QUESTIONS: Question[] = [
  // TAX-1: Advanced Fundamentals
  {
    id: 'CFP-TAX-B6-001',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'AMT',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Common adjustments that may trigger Alternative Minimum Tax (AMT) include:',
    options: [
      'A) Standard deduction and charitable contributions',
      'B) State and local taxes, ISO exercise bargain element, and certain interest deductions',
      'C) 401(k) contributions and HSA contributions',
      'D) Social Security benefits and pension income'
    ],
    correctAnswer: 1,
    explanation: 'AMT adds back certain "preference items" including state and local tax deductions, the spread on ISO exercise, certain mortgage interest, and investment interest. TCJA reduced AMT impact by increasing exemption amounts and limiting SALT deductions to $10,000, which reduced the AMT preference.'
  },
  {
    id: 'CFP-TAX-B6-002',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Kiddie Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under the "kiddie tax" rules, a 17-year-old dependent child\'s unearned income above $2,500 (2024) is taxed at:',
    options: [
      'A) The child\'s own tax rate',
      'B) A flat 15% rate',
      'C) The parents\' marginal tax rate',
      'D) Zero—unearned income is not taxable for minors'
    ],
    correctAnswer: 2,
    explanation: 'The kiddie tax applies to children under 19 (or under 24 if full-time students). Unearned income above the threshold is taxed at the parents\' marginal rate. This prevents shifting investment income to children to take advantage of their lower tax brackets. Applies to interest, dividends, capital gains, etc.'
  },
  {
    id: 'CFP-TAX-B6-003',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'NIIT',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The 3.8% Net Investment Income Tax (NIIT) applies to:',
    options: [
      'A) All investment income regardless of income level',
      'B) Investment income exceeding $250,000 (MFJ) of MAGI',
      'C) The lesser of net investment income or MAGI exceeding the threshold',
      'D) Only dividend and interest income'
    ],
    correctAnswer: 2,
    explanation: 'NIIT is 3.8% on the lesser of: (1) net investment income (interest, dividends, capital gains, rents, royalties, passive income) OR (2) MAGI exceeding $250,000 (MFJ), $200,000 (single). Strategies include timing income, maximizing deductions, and shifting income to non-investment sources when possible.'
  },
  // TAX-2: Advanced Deductions and Credits
  {
    id: 'CFP-TAX-B6-004',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions and Credits',
    subtopic: 'Charitable Remainder Trust',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A charitable remainder trust (CRT) provides donors with:',
    options: [
      'A) An immediate full deduction for the property donated',
      'B) Income stream for life or years, charitable deduction for remainder interest, and avoidance of capital gains on appreciated property',
      'C) No current-year tax benefits',
      'D) A stepped-up basis in trust assets'
    ],
    correctAnswer: 1,
    explanation: 'CRTs allow donors to transfer appreciated assets, receive an income stream, get a partial charitable deduction (PV of remainder), and avoid immediate capital gains tax. The trust is tax-exempt, but distributions to the donor are taxed based on trust income (WIFO ordering rules).'
  },
  {
    id: 'CFP-TAX-B6-005',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions and Credits',
    subtopic: 'Donor-Advised Fund',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A donor-advised fund (DAF) allows:',
    options: [
      'A) Tax deduction when grants are made to charity',
      'B) Immediate tax deduction upon contribution with flexibility on grant timing',
      'C) Only cash contributions',
      'D) Tax deductions exceeding the value of contributions'
    ],
    correctAnswer: 1,
    explanation: 'DAFs provide an immediate tax deduction when funds are contributed (cash or appreciated securities). The donor then recommends grants to charities over time. This separates the tax benefit from the charitable timing, useful for bunching deductions or having a high-income year.'
  },
  {
    id: 'CFP-TAX-B6-006',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions and Credits',
    subtopic: 'Casualty Loss',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Personal casualty losses under current law are deductible only if:',
    options: [
      'A) They exceed $100 per event',
      'B) The loss is from a federally declared disaster area',
      'C) The loss exceeds 10% of AGI',
      'D) The property was insured'
    ],
    correctAnswer: 1,
    explanation: 'TCJA suspended personal casualty loss deductions except for losses from federally declared disasters. Qualified disaster losses are deductible subject to the $100 per-event floor and 10% of AGI threshold. Business casualty losses remain fully deductible. It\'s critical to check if an area qualifies.'
  },
  // TAX-3: Advanced Planning Strategies
  {
    id: 'CFP-TAX-B6-007',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Installment Sales',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An installment sale allows a seller to:',
    options: [
      'A) Defer all gain indefinitely',
      'B) Spread the recognition of gain over the payment period as payments are received',
      'C) Convert capital gains to ordinary income',
      'D) Avoid interest income on the deferred balance'
    ],
    correctAnswer: 1,
    explanation: 'Installment sales spread gain recognition over the payment period using the gross profit percentage applied to each payment. This defers taxes but requires interest charges on the deferred balance. Depreciation recapture and inventory are ineligible. Related party sales have special rules.'
  },
  {
    id: 'CFP-TAX-B6-008',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Like-Kind Exchanges',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under §1031, like-kind exchanges are currently available for:',
    options: [
      'A) Any business or investment property',
      'B) Real property held for business or investment only',
      'C) Personal property including vehicles and equipment',
      'D) Stocks, bonds, and partnership interests'
    ],
    correctAnswer: 1,
    explanation: 'TCJA limited §1031 to real property only, eliminating like-kind treatment for personal property. Real estate held for business or investment qualifies for tax deferral. The 45-day identification and 180-day closing deadlines must be followed. Boot received triggers gain recognition.'
  },
  {
    id: 'CFP-TAX-B6-009',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Opportunity Zones',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Qualified Opportunity Zone investments offer:',
    options: [
      'A) Immediate tax deduction for the investment amount',
      'B) Capital gains deferral, and potential exclusion of gains on the OZ investment if held 10+ years',
      'C) Guaranteed returns in distressed communities',
      'D) No holding period requirements'
    ],
    correctAnswer: 1,
    explanation: 'Investing capital gains in a Qualified Opportunity Fund defers the original gain until 2026 or sale. If held 10+ years, gains on the QOF investment itself are excluded from income. The basis step-up benefits previously available for 5/7-year holdings have expired. Only capital gains qualify.'
  },
  // TAX-4: Business Taxation
  {
    id: 'CFP-TAX-B6-010',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Taxation',
    subtopic: 'S Corporation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An S corporation must meet all of the following requirements EXCEPT:',
    options: [
      'A) 100 or fewer shareholders',
      'B) Only one class of stock',
      'C) All shareholders must be U.S. citizens or residents',
      'D) Minimum of $1 million in revenue'
    ],
    correctAnswer: 3,
    explanation: 'S corps must have 100 or fewer shareholders (certain family members counted as one), one class of stock, domestic corporation, eligible shareholders (individuals, certain trusts, estates—not partnerships or corporations). There is no revenue requirement. S election avoids double taxation at the entity level.'
  },
  {
    id: 'CFP-TAX-B6-011',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Taxation',
    subtopic: 'Self-Employment Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Self-employment income is subject to:',
    options: [
      'A) Only the 12.4% Social Security portion',
      'B) 15.3% SE tax (12.4% OASDI + 2.9% Medicare) on 92.35% of net earnings',
      'C) A flat 10% tax regardless of income level',
      'D) No additional tax beyond regular income tax'
    ],
    correctAnswer: 1,
    explanation: 'Self-employed individuals pay 15.3% SE tax (equivalent to both employer and employee FICA shares) on 92.35% of net self-employment income. Social Security applies up to the wage base ($168,600 in 2024); Medicare has no cap plus 0.9% surtax on high earners. Half of SE tax is deductible for income tax purposes.'
  },
  {
    id: 'CFP-TAX-B6-012',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Taxation',
    subtopic: 'Section 199A',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The qualified business income (QBI) deduction is limited for specified service trades or businesses (SSTBs) when:',
    options: [
      'A) Taxable income exceeds $182,100 (single) or $364,200 (MFJ) for 2024',
      'B) The business has more than 10 employees',
      'C) The business operates in multiple states',
      'D) The owner works fewer than 1,000 hours annually'
    ],
    correctAnswer: 0,
    explanation: 'SSTBs (health, law, accounting, performing arts, consulting, financial services, etc.) face QBI deduction limitations when taxable income exceeds thresholds. Above these limits, the deduction phases out and is eliminated at higher incomes. Non-SSTBs face W-2 wage and property limitations instead.'
  },
  // TAX-1: More Fundamentals
  {
    id: 'CFP-TAX-B6-013',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Estimated Taxes',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To avoid an underpayment penalty, taxpayers must pay the lesser of:',
    options: [
      'A) 100% of current year tax or 80% of prior year',
      'B) 90% of current year tax or 100% of prior year tax (110% if prior year AGI exceeded $150,000)',
      'C) 85% of current year tax',
      'D) 50% of current year tax'
    ],
    correctAnswer: 1,
    explanation: 'Safe harbor requires paying 90% of current year liability OR 100% of prior year liability. Higher income taxpayers (AGI over $150,000 prior year) must pay 110% of prior year. Payments can be made via withholding or quarterly estimates. Withholding is treated as paid ratably throughout the year.'
  },
  {
    id: 'CFP-TAX-B6-014',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Tax Bracket Management',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A married couple in the 22% bracket with $50,000 of room before the 24% bracket should consider:',
    options: [
      'A) Accelerating all income possible into the current year',
      'B) Converting Traditional IRA funds to Roth up to the bracket limit to "fill the bracket"',
      'C) Deferring all income to future years',
      'D) Making no changes—bracket management provides minimal benefit'
    ],
    correctAnswer: 1,
    explanation: '"Filling the bracket" involves recognizing income (Roth conversions, capital gains, etc.) up to the top of a favorable bracket. If income will be higher in future years, paying 22% now on Roth conversions may be better than 24%+ later. This is especially valuable if tax rates are expected to increase.'
  },
  {
    id: 'CFP-TAX-B6-015',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-1',
    topic: 'Tax Fundamentals',
    subtopic: 'Tax Return Filing',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The standard filing deadline for individual tax returns is:',
    options: [
      'A) March 15',
      'B) April 15 (or next business day)',
      'C) June 15',
      'D) October 15'
    ],
    correctAnswer: 1,
    explanation: 'Individual returns (Form 1040) are due April 15 (or the next business day if it falls on a weekend or holiday). An automatic 6-month extension to October 15 is available by filing Form 4868. Extensions are for filing, not payment—taxes owed are due April 15 to avoid penalties and interest.'
  },
  // TAX-2: Credits Focus
  {
    id: 'CFP-TAX-B6-016',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions and Credits',
    subtopic: 'Adoption Credit',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The adoption credit allows qualified adoption expenses to:',
    options: [
      'A) Reduce AGI',
      'B) Reduce tax liability dollar-for-dollar up to a maximum amount',
      'C) Generate a refund even with no tax liability',
      'D) Only be claimed for international adoptions'
    ],
    correctAnswer: 1,
    explanation: 'The adoption credit offsets tax liability dollar-for-dollar for qualified expenses up to $16,810 (2024). It\'s nonrefundable (no refund if credit exceeds tax) but any unused credit carries forward 5 years. Income phaseout applies. The credit applies to domestic, international, and special needs adoptions.'
  },
  {
    id: 'CFP-TAX-B6-017',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions and Credits',
    subtopic: 'Energy Credits',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The residential clean energy credit for solar installations provides:',
    options: [
      'A) A deduction from gross income',
      'B) A credit equal to 30% of qualified costs with no annual cap',
      'C) A maximum credit of $5,000 per year',
      'D) Credit only for battery storage systems'
    ],
    correctAnswer: 1,
    explanation: 'The residential clean energy credit is 30% of costs for solar panels, solar water heaters, wind energy, geothermal, fuel cells, and battery storage through 2032 (phasing down thereafter). There\'s no annual cap, and unused credits carry forward. The credit is nonrefundable.'
  },
  {
    id: 'CFP-TAX-B6-018',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-2',
    topic: 'Deductions and Credits',
    subtopic: 'Premium Tax Credit',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A taxpayer receiving advanced Premium Tax Credits (APTC) who has higher income than projected at year-end:',
    options: [
      'A) Owes no additional tax',
      'B) May have to repay some or all of the excess credits',
      'C) Receives additional credits',
      'D) Automatically qualifies for Medicaid'
    ],
    correctAnswer: 1,
    explanation: 'APTC is based on projected income. If actual income is higher, some or all of the credit may have to be repaid on the tax return (with repayment caps for certain income levels). If income is lower, the taxpayer may receive additional credit. Self-employed individuals should monitor income carefully.'
  },
  // TAX-3: More Strategies
  {
    id: 'CFP-TAX-B6-019',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Bunching Deductions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The "bunching" strategy is most effective when:',
    options: [
      'A) A taxpayer always itemizes',
      'B) A taxpayer is near the standard deduction threshold and can time deductible expenses',
      'C) A taxpayer\'s income is constant each year',
      'D) Only charitable deductions are involved'
    ],
    correctAnswer: 1,
    explanation: 'Bunching concentrates deductible expenses into alternate years to exceed the standard deduction in bunching years while taking the standard deduction in other years. This is most valuable for those near the standard deduction threshold, applied to charitable contributions, medical expenses, or state taxes.'
  },
  {
    id: 'CFP-TAX-B6-020',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Qualified Small Business Stock',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Section 1202 qualified small business stock (QSBS) exclusion allows:',
    options: [
      'A) 50% exclusion on any stock sale',
      'B) Up to 100% exclusion of gain (max $10M or 10× basis) if held 5+ years',
      'C) Deferral of gain until a subsequent sale',
      'D) Conversion of capital gains to ordinary income'
    ],
    correctAnswer: 1,
    explanation: 'QSBS allows exclusion of up to 100% of gain (the greater of $10 million or 10× adjusted basis) on stock acquired at original issuance from qualifying C corporations with <$50M gross assets, held for 5+ years. This is one of the most valuable tax benefits for founders and early investors.'
  },
  {
    id: 'CFP-TAX-B6-021',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-3',
    topic: 'Tax Strategies',
    subtopic: 'Backup Withholding',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Backup withholding at 24% applies when:',
    options: [
      'A) All interest and dividend payments',
      'B) The taxpayer fails to provide a correct TIN or has underreported income',
      'C) Wages exceed $100,000',
      'D) The taxpayer requests it'
    ],
    correctAnswer: 1,
    explanation: 'Backup withholding at 24% applies to interest, dividends, and certain other payments when the payee fails to provide a correct TIN, the IRS notifies the payer of incorrect TIN, or there\'s certified underreporting. It\'s not voluntary but can be credited against tax liability on the return.'
  },
  // TAX-4: More Business
  {
    id: 'CFP-TAX-B6-022',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Taxation',
    subtopic: 'Home Office',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The simplified home office deduction allows self-employed taxpayers to deduct:',
    options: [
      'A) All home expenses proportionally',
      'B) $5 per square foot, up to 300 square feet ($1,500 maximum)',
      'C) A flat $500 regardless of office size',
      'D) Only if they work from home full-time'
    ],
    correctAnswer: 1,
    explanation: 'The simplified method allows $5/sq ft up to 300 sq ft = $1,500 maximum deduction. Regular method tracks actual expenses (mortgage interest, utilities, depreciation) allocated by office percentage. Both require exclusive and regular use. Employees cannot deduct home office under TCJA (through 2025).'
  },
  {
    id: 'CFP-TAX-B6-023',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Taxation',
    subtopic: 'Reasonable Compensation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An S corporation owner-employee must pay "reasonable compensation" because:',
    options: [
      'A) It maximizes tax savings',
      'B) Salary is subject to employment taxes while distributions are not',
      'C) The IRS requires equal salary and distributions',
      'D) S corps cannot pay distributions'
    ],
    correctAnswer: 1,
    explanation: 'S corp owners can receive both salary (subject to payroll taxes) and distributions (not subject to payroll tax). The IRS requires reasonable compensation before taking distributions to prevent avoiding FICA taxes. What\'s "reasonable" depends on industry, role, company performance, and comparable wages.'
  },
  {
    id: 'CFP-TAX-B6-024',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Taxation',
    subtopic: 'Hobby Loss',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An activity is presumed to be a for-profit business (not a hobby) if it shows profit in:',
    options: [
      'A) 1 of the past 3 years',
      'B) 3 of the past 5 years (2 of 7 for horse activities)',
      'C) Every year since inception',
      'D) Any single year of operation'
    ],
    correctAnswer: 1,
    explanation: 'The safe harbor presumes profit motive if the activity is profitable 3 of 5 years (2 of 7 for horses). Without profit motive, hobby expenses are not deductible. Nine factors determine profit intent: manner of operation, expertise, time invested, income/assets, success record, history, and personal pleasure element.'
  },
  {
    id: 'CFP-TAX-B6-025',
    courseId: 'cfp',
    section: 'CFP-TAX',
    blueprintArea: 'TAX-4',
    topic: 'Business Taxation',
    subtopic: 'Passive Activity',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A taxpayer with passive losses from rental real estate can deduct up to $25,000 of losses if:',
    options: [
      'A) They are real estate professionals',
      'B) They actively participate in rental activities and have AGI under $100,000 (phaseout to $150,000)',
      'C) They materially participate for 500+ hours',
      'D) The property is their primary residence'
    ],
    correctAnswer: 1,
    explanation: 'Active participation (lower standard than material participation) in rental real estate allows up to $25,000 of losses against non-passive income. This phases out between $100K-$150K AGI. Real estate professionals meeting 750-hour rules can treat rentals as non-passive. Otherwise, passive losses offset only passive income.'
  }
];
