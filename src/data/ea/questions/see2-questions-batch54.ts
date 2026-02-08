/**
 * EA SEE Part 2: Businesses - Questions Batch 54 (Q631-660)
 * Complex business scenarios and calculations
 * 
 * Tax Year: 2024-2025
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH54: Question[] = [
  // SEE2-1: Business Taxation
  {
    id: 'see2-631',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Entity Conversion',
    subtopic: 'Partnership to Corporation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When a partnership incorporates under Section 351:',
    options: [
      'All partners must recognize gain',
      'The partnership recognizes gain on appreciated assets',
      'Partners generally receive tax-free treatment with carryover basis in stock',
      'Liabilities transferred always create boot'
    ],
    correctAnswer: 2,
    explanation: 'When partners transfer partnership interests or assets to a corporation under §351, they generally don\'t recognize gain if they control the corporation after the exchange. Stock basis equals basis of property transferred minus boot received plus gain recognized.',
    reference: 'IRC §351'
  },
  {
    id: 'see2-632',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Corporate Distributions',
    subtopic: 'Constructive Dividends',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which of the following would likely be treated as a constructive dividend to a shareholder?',
    options: [
      'Salary at fair market value',
      'Below-market interest loan from corporation to shareholder',
      'Reasonable rent paid to shareholder for leased property',
      'Dividend declared and paid pro rata'
    ],
    correctAnswer: 1,
    explanation: 'Below-market loans create constructive dividends equal to the foregone interest. Other examples include excessive compensation to relatives, personal expenses paid by corporation, and bargain purchases from the corporation.',
    reference: 'IRC §7872'
  },
  {
    id: 'see2-633',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'S Corporation',
    subtopic: 'Reasonable Compensation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A shareholder-employee of an S corporation who takes only $0 in salary and $200,000 in distributions:',
    options: [
      'Is correctly minimizing employment taxes',
      'May be subject to IRS recharacterization of distributions as wages',
      'Owes no self-employment tax on distributions',
      'Can deduct all distributions as business expenses'
    ],
    correctAnswer: 1,
    explanation: 'The IRS can recharacterize excessive distributions as wages subject to employment tax if the shareholder-employee provides services. Reasonable compensation must be paid for services rendered before distributions.',
    reference: 'Rev. Rul. 74-44'
  },
  {
    id: 'see2-634',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Partnership',
    subtopic: 'Special Allocations',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Special allocations of partnership income must have:',
    options: [
      'Unanimous partner consent only',
      'Substantial economic effect',
      'IRS advance approval',
      'Equal allocation of all items'
    ],
    correctAnswer: 1,
    explanation: 'Special allocations that differ from ownership percentages must have substantial economic effect (economic effect test + substantiality test) or be in accordance with partner\'s interest in the partnership.',
    reference: 'IRC §704(b)'
  },
  {
    id: 'see2-635',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Corporate Taxation',
    subtopic: 'Schedule M-1 Reconciliation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'On Schedule M-1, which item would be added to book income to arrive at taxable income?',
    options: [
      'Tax-exempt interest',
      'Federal income tax expense per books',
      'Depreciation in excess of book depreciation',
      'Life insurance proceeds on key employee'
    ],
    correctAnswer: 1,
    explanation: 'Federal income tax expense is deducted for books but not for tax. Schedule M-1 adds it back to book income. Tax-exempt items and excess depreciation would be subtractions. Life insurance proceeds are tax-free but also a book-tax difference.',
    reference: 'Schedule M-1 Instructions'
  },
  // SEE2-2: Business Tax Preparation
  {
    id: 'see2-636',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Cost Segregation',
    subtopic: 'Accelerated Depreciation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Cost segregation studies benefit taxpayers by:',
    options: [
      'Converting ordinary income to capital gain',
      'Reclassifying building components to shorter recovery periods',
      'Eliminating depreciation recapture',
      'Deferring income indefinitely'
    ],
    correctAnswer: 1,
    explanation: 'Cost segregation separates building components (electrical, plumbing, fixtures) from the building structure, allowing 5/7/15-year depreciation instead of 27.5/39-year. This accelerates deductions but increases recapture on sale.',
    reference: 'IRS Cost Segregation Audit Technique Guide'
  },
  {
    id: 'see2-637',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Depreciation',
    subtopic: 'ADS Requirements',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Alternative Depreciation System (ADS) must be used for:',
    options: [
      'All residential rental property',
      'Property used predominantly outside the U.S. and tax-exempt use property',
      '7-year property only',
      'Property with a cost over $1 million'
    ],
    correctAnswer: 1,
    explanation: 'ADS is required for: foreign use property, tax-exempt use property, tax-exempt bond financed property, and property for which the taxpayer elects ADS. ADS uses straight-line and longer recovery periods.',
    reference: 'IRC §168(g)'
  },
  {
    id: 'see2-638',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Bad Debts',
    subtopic: 'Business Bad Debt Deduction',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A business can deduct a bad debt using:',
    options: [
      'Only the specific charge-off method',
      'Either the specific charge-off method or reserve method',
      'Only the reserve method',
      'No deduction is allowed for bad debts'
    ],
    correctAnswer: 0,
    explanation: 'Only the specific charge-off method is allowed for tax purposes (accrual basis). When debt becomes worthless, deduct. Cash basis taxpayers generally cannot deduct bad debts for amounts never included in income. Reserve method is not allowed for tax.',
    reference: 'IRC §166'
  },
  {
    id: 'see2-639',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Domestic Production',
    subtopic: 'QPAI Calculation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Under Section 199A for pass-through businesses, which type of business does NOT qualify for the full 20% QBI deduction at high income levels?',
    options: [
      'Manufacturing',
      'Construction',
      'Accounting services',
      'Retail sales'
    ],
    correctAnswer: 2,
    explanation: 'Accounting is a Specified Service Trade or Business (SSTB). Above the threshold ($191,950 single/$383,900 MFJ for 2024), SSTBs phase out of QBI deduction eligibility. Manufacturing, construction, and retail are not SSTBs.',
    reference: 'IRC §199A(d)'
  },
  {
    id: 'see2-640',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Charitable Contributions',
    subtopic: 'Corporate Limit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A C corporation\'s charitable contribution deduction is limited to:',
    options: [
      '25% of taxable income',
      '10% of taxable income (computed without the deduction)',
      '60% of taxable income',
      'No limit for cash contributions'
    ],
    correctAnswer: 1,
    explanation: 'Corporate charitable contributions are limited to 10% of taxable income (computed before the deduction, NOL carryback, and capital loss carryback). Excess contributions carry forward 5 years.',
    reference: 'IRC §170(b)(2)'
  },
  {
    id: 'see2-641',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Employment Taxes',
    subtopic: 'Trust Fund Recovery Penalty',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The Trust Fund Recovery Penalty (IRC §6672) can be assessed against:',
    options: [
      'Only the corporate entity',
      'Responsible persons who willfully fail to remit withheld employment taxes',
      'All employees equally',
      'The IRS if it fails to collect timely'
    ],
    correctAnswer: 1,
    explanation: 'The TFRP equals 100% of the unpaid trust fund taxes (employee\'s share of FICA and income tax withheld). It applies to responsible persons (officers, directors, payroll managers) who willfully failed to collect or remit the taxes.',
    reference: 'IRC §6672'
  },
  {
    id: 'see2-642',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Fringe Benefits',
    subtopic: 'Accountable Plans',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under an accountable plan, employee expense reimbursements are:',
    options: [
      'Always included in employee wages',
      'Excluded from employee income if business connection, substantiation, and return of excess requirements are met',
      'Deductible by the employee on Schedule A',
      'Subject to self-employment tax'
    ],
    correctAnswer: 1,
    explanation: 'Accountable plan reimbursements are excluded from income if: (1) business connection, (2) adequate substantiation within reasonable time, (3) return of excess within reasonable time. Non-accountable plan reimbursements are wages.',
    reference: 'IRC §62(c)'
  },
  {
    id: 'see2-643',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Accrual Method',
    subtopic: 'All Events Test',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under the all events test for accrual method taxpayers, income is includible when:',
    options: [
      'Cash is received',
      'All events fixing the right to receive have occurred and amount can be determined with reasonable accuracy',
      'An invoice is sent',
      'The customer places an order'
    ],
    correctAnswer: 1,
    explanation: 'The all events test requires: (1) all events have occurred fixing the right to receive, (2) amount can be determined with reasonable accuracy, and (3) economic performance has occurred (for deductions). For income, earlier of performance or payment.',
    reference: 'Reg. §1.451-1(a)'
  },
  {
    id: 'see2-644',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Deferred Revenue',
    subtopic: 'Advance Payments',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Under Rev. Proc. 2004-34, advance payments for services can be:',
    options: [
      'Deferred indefinitely until services are performed',
      'Included in income in year received',
      'Deferred to the following tax year to the extent not included in book revenue',
      'Excluded from income entirely'
    ],
    correctAnswer: 2,
    explanation: 'Accrual method taxpayers can defer advance payments to the next year to the extent not included in book (financial) revenue. Must include in the earlier of when included in book revenue or the next tax year. No deferral beyond next year.',
    reference: 'Rev. Proc. 2004-34'
  },
  {
    id: 'see2-645',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Business Credits',
    subtopic: 'Disabled Access Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Disabled Access Credit (IRC §44) for small businesses is:',
    options: [
      '100% of qualified expenses',
      '50% of eligible expenses between $250 and $10,250',
      '25% of all disability expenses',
      '50% of first $100,000 in expenses'
    ],
    correctAnswer: 1,
    explanation: 'The Disabled Access Credit is 50% of eligible access expenditures between $250 and $10,250 (maximum credit $5,000). Available to businesses with gross receipts ≤ $1 million or ≤ 30 FTE employees.',
    reference: 'IRC §44'
  },
  // SEE2-3: Specialized Business Returns
  {
    id: 'see2-646',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'S Corporation',
    subtopic: 'QSUB Election',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A Qualified Subchapter S Subsidiary (QSUB) is:',
    options: [
      'A C corporation owned 80% by an S corporation',
      'A 100% owned subsidiary that is disregarded as separate from its S corp parent',
      'A partnership owned by an S corporation',
      'An LLC taxed as an S corporation'
    ],
    correctAnswer: 1,
    explanation: 'A QSUB is a 100% owned subsidiary of an S corp for which a QSUB election is made. The QSUB is disregarded for federal tax purposes; assets and liabilities are treated as those of the parent S corp.',
    reference: 'IRC §1361(b)(3)'
  },
  {
    id: 'see2-647',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Partnership',
    subtopic: 'Family Partnerships',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'In a family partnership, income allocated to a family member partner will be:',
    options: [
      'Always respected as allocated in agreement',
      'Reallocated if donor-partner\'s compensation for services is not reasonable',
      'Taxed entirely to the senior family member',
      'Exempt from self-employment tax'
    ],
    correctAnswer: 1,
    explanation: 'Family partnership allocations can be challenged if: donee\'s capital is not a material income-producing factor, or the donor is not compensated reasonably for services. IRS can reallocate to reflect true contribution.',
    reference: 'IRC §704(e)'
  },
  {
    id: 'see2-648',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Installment Sales',
    subtopic: 'Related Party Sales',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When depreciable property is sold to a related party on installment, gain is:',
    options: [
      'Deferred under normal installment rules',
      'Recognized entirely in year of sale (no installment method)',
      'Treated as tax-exempt income',
      'Recognized only when payments exceed basis'
    ],
    correctAnswer: 1,
    explanation: 'The installment method is not available for sales of depreciable property to related parties (§1239). All gain is recognized in the year of sale and treated as ordinary income (§1245/1250 recapture applies anyway).',
    reference: 'IRC §453(g)'
  },
  {
    id: 'see2-649',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Corporate Reorganization',
    subtopic: 'Type B Stock-for-Stock',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A Type B reorganization requires the acquiring corporation to use:',
    options: [
      'Cash or stock',
      'Solely voting stock',
      'Debt or stock',
      'Any combination of consideration'
    ],
    correctAnswer: 1,
    explanation: 'Type B reorganizations (stock-for-stock) require solely voting stock as consideration. Even a small amount of cash (boot) disqualifies the entire transaction. Target shareholders exchange stock for acquiring corporation stock.',
    reference: 'IRC §368(a)(1)(B)'
  },
  {
    id: 'see2-650',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Section 338 Election',
    subtopic: 'Deemed Asset Sale',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A Section 338(h)(10) election treats a stock sale as:',
    options: [
      'A nontaxable exchange',
      'An asset sale for both buyer and seller',
      'A dividend distribution',
      'A liquidation followed by reincorporation'
    ],
    correctAnswer: 1,
    explanation: 'Section 338(h)(10) election (available for S corps and subsidiaries) treats the stock sale as an asset sale. Seller recognizes gain/loss on deemed asset sale (usually favorable). Buyer gets stepped-up asset basis.',
    reference: 'IRC §338(h)(10)'
  },
  {
    id: 'see2-651',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'International',
    subtopic: 'BEAT',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The Base Erosion and Anti-Abuse Tax (BEAT) applies to corporations with:',
    options: [
      'Any foreign income',
      'Average gross receipts of $500 million+ and 3%+ base erosion percentage',
      'Foreign subsidiaries only',
      'Less than $100 million in revenue'
    ],
    correctAnswer: 1,
    explanation: 'BEAT applies to corporations with: (1) average gross receipts ≥ $500 million (over 3 years), (2) base erosion percentage ≥ 3% (2% for banks/securities dealers). It\'s a minimum tax on deductible payments to foreign affiliates.',
    reference: 'IRC §59A'
  },
  {
    id: 'see2-652',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Loss Limitations',
    subtopic: 'Ordering Rules',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which loss limitation applies first (before others)?',
    options: [
      'Passive activity loss limitations',
      'At-risk limitations',
      'Basis limitations',
      'Excess business loss limitation'
    ],
    correctAnswer: 2,
    explanation: 'Loss limitations apply in this order: (1) Basis, (2) At-risk, (3) Passive activity, (4) Excess business loss (§461(l)). Each limitation can create suspended losses that are tracked separately.',
    reference: 'IRC §465, §469, §461(l)'
  },
  {
    id: 'see2-653',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Form Changes',
    subtopic: 'Form 7203',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Form 7203 is used by S corporation shareholders to:',
    options: [
      'Report passive income',
      'Track stock and debt basis',
      'Elect S corporation status',
      'Report foreign income'
    ],
    correctAnswer: 1,
    explanation: 'Form 7203 (S Corporation Shareholder Stock and Debt Basis Limitations) is used to track and report stock and debt basis calculations. Required when claiming a loss, receiving a distribution, or disposing of stock.',
    reference: 'Form 7203 Instructions'
  },
  {
    id: 'see2-654',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Alternative Minimum Tax',
    subtopic: 'Corporate AMT',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The corporate alternative minimum tax under the Inflation Reduction Act applies to:',
    options: [
      'All C corporations',
      'Corporations with average annual adjusted financial statement income over $1 billion',
      'S corporations only',
      'Corporations with more than 500 employees'
    ],
    correctAnswer: 1,
    explanation: 'The IRA reinstated corporate AMT at 15% on adjusted financial statement income (AFSI) for corporations with average AFSI > $1 billion (3-year average). This is a book minimum tax, not the old AMT based on tax preferences.',
    reference: 'IRC §55 (as amended by IRA)'
  },
  {
    id: 'see2-655',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Estate Valuation',
    subtopic: 'Section 2032A Special Use',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Section 2032A allows estate tax valuation of qualified real property based on:',
    options: [
      'Fair market value on date of death',
      'Current use value rather than highest and best use',
      'Original purchase price',
      'Assessed property tax value'
    ],
    correctAnswer: 1,
    explanation: 'Section 2032A allows farms and closely-held business real property to be valued at current use (farming/business use) rather than highest and best use (development). Maximum reduction is $1.39 million (2024, indexed).',
    reference: 'IRC §2032A'
  },
  {
    id: 'see2-656',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-1',
    topic: 'Franchise Taxes',
    subtopic: 'State Requirements',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'State franchise taxes are generally:',
    options: [
      'Deductible as a business expense for federal tax purposes',
      'Never deductible',
      'Only deductible by S corporations',
      'Creditable against federal tax'
    ],
    correctAnswer: 0,
    explanation: 'State franchise taxes (privilege of doing business) are deductible as ordinary business expenses. State income taxes are also deductible. This differs from federal income taxes which are never deductible.',
    reference: 'IRC §164'
  },
  {
    id: 'see2-657',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Clean Energy Credits',
    subtopic: 'EV Commercial Vehicle Credit',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The commercial clean vehicle credit (IRC §45W) for electric vehicles used in business is:',
    options: [
      '10% of vehicle price',
      'The lesser of 15%/30% of vehicle price or incremental cost, up to $7,500/$40,000',
      '$7,500 flat regardless of vehicle type',
      '50% of fuel savings'
    ],
    correctAnswer: 1,
    explanation: 'The §45W credit is the lesser of: (1) 15% of basis (30% for no gasoline engine), or (2) incremental cost over comparable ICE vehicle. Cap is $7,500 for vehicles ≤ 14,000 lbs, $40,000 for heavier vehicles.',
    reference: 'IRC §45W'
  },
  {
    id: 'see2-658',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Controlled Groups',
    subtopic: 'Anti-Abuse Rules',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A controlled group of corporations must share:',
    options: [
      'All tax attributes equally',
      'The accumulated earnings credit, Section 179 limits, and tax brackets',
      'Only losses',
      'Nothing - each files independently'
    ],
    correctAnswer: 1,
    explanation: 'Controlled groups (parent-subsidiary or brother-sister) must share: Section 179 limit, accumulated earnings credit, AMT exemption (when applicable), and the benefits of graduated rates (pre-TCJA). Prevents companies from multiplying benefits.',
    reference: 'IRC §1561'
  },
  {
    id: 'see2-659',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Backup Withholding',
    subtopic: 'Form W-9',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Backup withholding is required when a payee:',
    options: [
      'Requests it',
      'Fails to provide or provides incorrect TIN',
      'Is a corporation',
      'Earns less than $600'
    ],
    correctAnswer: 1,
    explanation: 'Backup withholding (currently 24%) is required when: payee fails to provide TIN, IRS notifies of incorrect TIN, or payee fails to certify exemption from withholding. Form W-9 is used to request TIN and certification.',
    reference: 'IRC §3406'
  },
  {
    id: 'see2-660',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-3',
    topic: 'Digital Assets',
    subtopic: 'Broker Reporting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under new regulations, cryptocurrency brokers will be required to report transactions on:',
    options: [
      'Form 1099-MISC',
      'Form 1099-B (similar to stock transactions)',
      'Form 1099-K',
      'No reporting required'
    ],
    correctAnswer: 1,
    explanation: 'Infrastructure law requires crypto brokers to report dispositions on Form 1099-B or similar form, reporting proceeds and potentially cost basis. Reporting phases in starting 2025-2026 tax years.',
    reference: 'IRC §6045 (as amended)'
  }
];
