// Additional Task-Based Simulations - Part 2
// More comprehensive TBS for all sections

import { TBS, TBS_TYPES } from '../../../types';

// ==========================================
// MORE FAR TBS
// ==========================================
export const FAR_TBS_2: TBS[] = [
  {
    id: 'far-tbs-007',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Stock-Based Compensation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Equity (ASC 718)',
    scenario: `
On January 1, Year 1, TechStart Inc. grants 10,000 stock options to employees with the following terms:

• Exercise price: $25 per share (equal to market price on grant date)
• Vesting: 4-year cliff vesting (100% vests on December 31, Year 4)
• Expiration: 10 years from grant date
• Fair value per option (Black-Scholes): $8

Additional information:
• Expected forfeitures at grant date: 20%
• Actual forfeitures during Year 1: 5% of options
• No change in forfeiture estimate
• Company has a December 31 fiscal year-end
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the total compensation cost to be recognized over the service period.',
        correctAnswer: 64000,
        tolerance: 0,
        explanation: '10,000 options × $8 fair value × 80% (1 - 20% forfeiture) = $64,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the compensation expense for Year 1.',
        correctAnswer: 16000,
        tolerance: 0,
        explanation: '$64,000 ÷ 4 years = $16,000 per year',
      },
      {
        id: 'req-3',
        type: 'journal_entry',
        question: 'Prepare the journal entry at December 31, Year 1.',
        correctEntries: [
          { account: 'Compensation Expense', debit: 16000, credit: null },
          { account: 'Additional Paid-in Capital - Stock Options', debit: null, credit: 16000 },
        ],
        tolerance: 0,
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question:
          'If at the end of Year 2, the company revises its forfeiture estimate to 25%, what is the cumulative compensation expense through Year 2?',
        options: ['$32,000', '$30,000', '$31,500', '$28,000'],
        correctAnswer: 1,
        explanation:
          'Revised total = 10,000 × $8 × 75% = $60,000. Through Year 2 (2/4 vested) = $30,000.',
      },
    ],
    hints: [
      'Use cliff vesting - expense recognized ratably over entire service period',
      'Estimate forfeitures at grant date and adjust when estimates change',
      'Compensation cost = Options expected to vest × Fair value per option',
    ],
    references: ['ASC 718-10-30', 'ASC 718-10-35'],
  },
  {
    id: 'far-tbs-008',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Earnings Per Share Calculation',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'EPS (ASC 260)',
    scenario: `
Maxwell Corporation reports the following for Year 1:

Net income: $2,400,000
Preferred dividends declared: $200,000 (non-cumulative)
Common shares outstanding January 1: 800,000

Stock transactions during Year 1:
• April 1: Issued 120,000 shares
• July 1: 10% stock dividend
• October 1: Repurchased 50,000 shares as treasury stock

Potentially dilutive securities:
• Convertible bonds: $1,000,000 face value, 6% interest, convertible into 80,000 common shares. Tax rate: 25%
• Stock options: 100,000 options, exercise price $20. Average market price: $25
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the weighted-average common shares outstanding for basic EPS.',
        correctAnswer: 962500,
        tolerance: 100,
        explanation:
          '(800,000 × 12/12 × 1.10) + (120,000 × 9/12 × 1.10) + (50,000 × -3/12) = 880,000 + 99,000 - 12,500 = 966,500 shares. Note: The stock dividend (1.10) applies retroactively to all shares.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Basic EPS.',
        correctAnswer: 2.29,
        tolerance: 0.05,
        explanation: '($2,400,000 - $200,000) ÷ Weighted shares',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question:
          'Calculate the incremental shares from stock options using the treasury stock method.',
        correctAnswer: 20000,
        tolerance: 0,
        explanation:
          '100,000 - (100,000 × $20 ÷ $25) = 100,000 - 80,000 = 20,000 incremental shares',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Are the convertible bonds dilutive?',
        options: [
          'Yes, because the incremental EPS is less than basic EPS',
          'No, because the incremental EPS exceeds basic EPS',
          'Yes, because all convertible securities are dilutive',
          'Cannot determine without additional information',
        ],
        correctAnswer: 0,
        explanation:
          'Calculate incremental EPS: ($60,000 × 0.75) ÷ 80,000 = $0.56. If this is less than basic EPS, bonds are dilutive.',
      },
    ],
    hints: [
      'Stock dividends and splits are applied retroactively to all prior periods',
      'Treasury stock method: Incremental shares = Options - (Options × Exercise price ÷ Market price)',
      'Test each potentially dilutive security separately for dilution',
    ],
    references: ['ASC 260-10-45', 'ASC 260-10-55'],
  },
  {
    id: 'far-tbs-009',
    section: 'FAR',
    type: TBS_TYPES.RECONCILIATION,
    title: 'Statement of Cash Flows - Indirect Method',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Statement of Cash Flows',
    scenario: `
Prepare the operating activities section of the statement of cash flows using the indirect method.

Apex Company - Comparative Data:

                              Year 1        Year 0      Change
Net Income                    $450,000
Depreciation Expense          $85,000
Amortization Expense          $12,000
Loss on Sale of Equipment     $8,000
Gain on Sale of Investment    $15,000

Account Balances:
Accounts Receivable           $280,000     $320,000    ($40,000)
Inventory                     $195,000     $165,000    $30,000
Prepaid Expenses              $24,000      $18,000     $6,000
Accounts Payable              $142,000     $128,000    $14,000
Accrued Liabilities           $68,000      $85,000     ($17,000)
Income Tax Payable            $35,000      $28,000     $7,000
Deferred Tax Liability        $52,000      $45,000     $7,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'reconciliation',
        question: 'Complete the operating activities section.',
        template: {
          netIncome: null,
          adjustments: [],
          changesInAssets: [],
          changesInLiabilities: [],
          netCashFromOperating: null,
        },
        correctAnswer: {
          netIncome: 450000,
          adjustments: [
            { description: 'Depreciation', amount: 85000 },
            { description: 'Amortization', amount: 12000 },
            { description: 'Loss on sale of equipment', amount: 8000 },
            { description: 'Gain on sale of investment', amount: -15000 },
            { description: 'Deferred tax liability increase', amount: 7000 },
          ],
          changesInAssets: [
            { description: 'Decrease in accounts receivable', amount: 40000 },
            { description: 'Increase in inventory', amount: -30000 },
            { description: 'Increase in prepaid expenses', amount: -6000 },
          ],
          changesInLiabilities: [
            { description: 'Increase in accounts payable', amount: 14000 },
            { description: 'Decrease in accrued liabilities', amount: -17000 },
            { description: 'Increase in income tax payable', amount: 7000 },
          ],
          netCashFromOperating: 555000,
        },
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'What is net cash provided by operating activities?',
        correctAnswer: 555000,
        tolerance: 1000,
        explanation:
          '$450,000 + $85,000 + $12,000 + $8,000 - $15,000 + $7,000 + $40,000 - $30,000 - $6,000 + $14,000 - $17,000 + $7,000 = $555,000',
      },
    ],
    hints: [
      'Add back non-cash expenses (depreciation, amortization)',
      'Add losses and subtract gains',
      'Decrease in current assets = add; Increase in current assets = subtract',
      'Increase in current liabilities = add; Decrease in current liabilities = subtract',
    ],
    references: ['ASC 230-10-45'],
  },
];

// ==========================================
// MORE REG TBS
// ==========================================
export const REG_TBS_2: TBS[] = [
  {
    id: 'reg-tbs-005',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Estate Tax Calculation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Estate and Gift Tax',
    scenario: `
David Morrison passed away on March 15, Year 1. His estate consists of:

Gross Estate:
• Personal residence (joint with spouse): $1,200,000
• Investment portfolio (individually owned): $3,500,000
• Life insurance (estate is beneficiary): $500,000
• Retirement accounts (spouse is beneficiary): $800,000
• Business interest (S corporation): $2,000,000
• Personal property: $300,000

Deductions:
• Funeral expenses: $25,000
• Administrative expenses: $75,000
• Debts: $150,000
• Charitable bequest: $200,000
• Bequest to surviving spouse: $2,500,000

Additional information:
• Lifetime taxable gifts made: $1,000,000
• Gift taxes paid on lifetime gifts: $0 (used unified credit)
• Applicable exclusion amount for Year 1: $12,920,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the gross estate.',
        correctAnswer: 7700000,
        tolerance: 0,
        explanation:
          'Residence (1/2 for joint) + Portfolio + Insurance + Retirement + Business + Personal = $600,000 + $3,500,000 + $500,000 + $800,000 + $2,000,000 + $300,000 = $7,700,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate allowable deductions from the gross estate.',
        correctAnswer: 2950000,
        tolerance: 0,
        explanation: '$25,000 + $75,000 + $150,000 + $200,000 + $2,500,000 = $2,950,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the taxable estate.',
        correctAnswer: 4750000,
        tolerance: 0,
        explanation: '$7,700,000 - $2,950,000 = $4,750,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the tentative tax base (taxable estate + adjusted taxable gifts).',
        correctAnswer: 5750000,
        tolerance: 0,
        explanation: '$4,750,000 + $1,000,000 = $5,750,000',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Is there any estate tax due?',
        options: [
          'Yes, because the tentative tax base exceeds the exclusion amount',
          'No, because the tentative tax base is less than the applicable exclusion',
          'Yes, but it can be deferred using installment payments',
          'Cannot determine without calculating the tentative tax',
        ],
        correctAnswer: 1,
        explanation:
          'The tentative tax base ($5,750,000) is less than the applicable exclusion ($12,920,000), so no estate tax is due.',
      },
    ],
    hints: [
      'Joint property with spouse: include only 50% (assuming equal contribution)',
      'Life insurance included if estate is beneficiary or decedent had incidents of ownership',
      'Unlimited marital deduction for qualifying property passing to spouse',
      'Add back taxable gifts to calculate tentative tax base',
    ],
    references: ['IRC Section 2001', 'IRC Section 2031', 'IRC Section 2056'],
  },
  {
    id: 'reg-tbs-006',
    section: 'REG',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Like-Kind Exchange (Section 1031)',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Property Transactions',
    scenario: `
Reynolds Properties LLC exchanges commercial real estate with the following details:

Relinquished Property:
• Fair market value: $800,000
• Adjusted basis: $450,000
• Mortgage assumed by other party: $200,000

Replacement Property:
• Fair market value: $900,000
• Cash paid by Reynolds: $50,000
• New mortgage assumed by Reynolds: $250,000

The exchange qualifies under Section 1031.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the realized gain.',
        correctAnswer: 350000,
        tolerance: 0,
        explanation:
          'Realized gain = Amount realized - Adjusted basis. Amount realized = FMV of property received ($800,000) + Mortgage relief ($200,000) = $1,000,000. Boot analysis: Boot received = $200,000 mortgage relief. Boot paid = $50,000 cash + $250,000 mortgage assumed = $300,000. Net boot = $200,000 - $300,000 = ($100,000) boot paid (no boot received). Realized gain = $800,000 FMV received - $450,000 adjusted basis = $350,000.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the boot received (if any).',
        correctAnswer: 0,
        tolerance: 0,
        explanation:
          'Boot received = Mortgage relief - Cash paid - Mortgage assumed = $200,000 - $50,000 - $250,000 = ($100,000). Since negative, no boot received.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the recognized gain.',
        correctAnswer: 0,
        tolerance: 0,
        explanation:
          'Recognized gain = Lesser of (realized gain, boot received). Since no boot received, no gain recognized.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the basis in the replacement property.',
        correctAnswer: 550000,
        tolerance: 0,
        explanation:
          'Basis = FMV of new property - Deferred gain = $900,000 - $350,000 = $550,000. Or: Old basis + boot paid - boot received + gain recognized = $450,000 + $100,000 + $0 = $550,000.',
      },
    ],
    hints: [
      'Like-kind exchanges defer gain; they do not exclude it',
      'Boot received triggers recognition to the extent of realized gain',
      'Mortgage relief is boot received; mortgage assumption is boot paid',
      'Net boot = mortgage relief - cash paid - mortgage assumed',
    ],
    references: ['IRC Section 1031', 'Reg. 1.1031(d)-2'],
  },
  {
    id: 'reg-tbs-007',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Qualified Business Income Deduction (Section 199A)',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Individual Taxation',
    scenario: `
Sarah operates a marketing consulting business as a sole proprietorship. For Year 1:

Business Information:
• Qualified business income (QBI): $400,000
• W-2 wages paid by business: $120,000
• Unadjusted basis of qualified property: $50,000

Individual Tax Return:
• Taxable income (before QBI deduction): $375,000
• Filing status: Single

Marketing consulting is a specified service trade or business (SSTB).

Year 1 thresholds for single filers:
• Phase-out begins: $182,100
• Phase-out ends: $232,100
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question:
          'Because this is an SSTB and taxable income exceeds the threshold, what limitation applies?',
        options: [
          'No QBI deduction is allowed',
          'The deduction is fully allowed',
          'The deduction is partially phased out',
          'Only the W-2 wage limitation applies',
        ],
        correctAnswer: 0,
        explanation:
          'For SSTBs, when taxable income exceeds the upper threshold ($232,100 for single), no QBI deduction is allowed.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'If this were NOT an SSTB, calculate the tentative QBI deduction (20% of QBI).',
        correctAnswer: 80000,
        tolerance: 0,
        explanation: '$400,000 × 20% = $80,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'If this were NOT an SSTB, calculate the W-2 wage limit (50% of W-2 wages).',
        correctAnswer: 60000,
        tolerance: 0,
        explanation: '$120,000 × 50% = $60,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question:
          'If this were NOT an SSTB, calculate the alternative W-2/property limit (25% wages + 2.5% UBIA).',
        correctAnswer: 31250,
        tolerance: 0,
        explanation: '($120,000 × 25%) + ($50,000 × 2.5%) = $30,000 + $1,250 = $31,250',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question:
          'If this were NOT an SSTB, what would be the QBI deduction (limited by taxable income)?',
        correctAnswer: 60000,
        tolerance: 0,
        explanation:
          'Lesser of: (1) $80,000 tentative, (2) Greater of $60,000 or $31,250 = $60,000, (3) $375,000 × 20% = $75,000. Answer = $60,000 (W-2 wage limit applies).',
      },
    ],
    hints: [
      'SSTBs get no deduction when income exceeds the upper threshold',
      'Non-SSTBs still face W-2 wage/property limitations above threshold',
      'QBI deduction cannot exceed 20% of taxable income (before QBI deduction)',
      'Two W-2 tests: 50% of W-2 wages OR 25% of W-2 wages + 2.5% of UBIA',
    ],
    references: ['IRC Section 199A', 'Reg. 1.199A-1'],
  },
  // ==========================================
  // REG BUSINESS LAW TBS (REG-I & REG-II)
  // ==========================================
  {
    id: 'reg-tbs-010',
    section: 'REG',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Contract Formation and Enforceability',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Contract Law',
    blueprintArea: 'REG-I',
    blueprintTopic: 'REG-I-A-1',
    scenario: `
You are advising clients on various contract-related issues. Review each scenario and determine the contract law implications.

SCENARIO A - OFFER AND ACCEPTANCE:
On Monday, Seller emails Buyer: "I'll sell you my car for $15,000. Let me know by Friday." On Wednesday, Seller sells the car to Third Party for $16,000. On Thursday, Buyer emails "I accept your offer."

SCENARIO B - CONSIDERATION:
Parent promises to pay $50,000 to Adult Child "because you have been such a good child over the years." Parent later refuses to pay.

SCENARIO C - STATUTE OF FRAUDS:
Landlord and Tenant orally agree to a 2-year commercial lease at $3,000/month. Tenant moves in and pays 6 months' rent. Landlord then tries to evict Tenant, claiming no valid lease exists.

SCENARIO D - CAPACITY:
A 17-year-old purchases a $3,000 laptop for college on credit. After turning 18, the now-adult makes three monthly payments before deciding to return the laptop and void the contract.

SCENARIO E - MUTUAL MISTAKE:
Seller and Buyer agree to sell "the painting in the attic" for $500. Both believe it's a reproduction. The painting turns out to be an original worth $50,000.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'In Scenario A, is there an enforceable contract between Seller and Buyer?',
        options: [
          'Yes, because Buyer accepted within the time specified',
          'No, because Seller revoked the offer by selling to Third Party',
          'Yes, because the offer was irrevocable until Friday',
          'No, because email is not a valid medium for acceptance',
        ],
        correctAnswer: 1,
        explanation: 'An offer can be revoked any time before acceptance, even if a time limit was stated (unless consideration was paid for an option). Selling to Third Party was an effective revocation.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'In Scenario B, is Parent\'s promise enforceable?',
        options: [
          'Yes, promissory estoppel applies',
          'Yes, moral consideration is sufficient',
          'No, past consideration is no consideration',
          'No, but only because the promise was gratuitous',
        ],
        correctAnswer: 2,
        explanation: 'Past consideration (being a good child in the past) is not valid consideration. A promise based on past events lacks the bargained-for exchange required for enforceability.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'In Scenario C, can Tenant enforce the oral lease?',
        options: [
          'No, leases over 1 year must be in writing',
          'Yes, partial performance can satisfy Statute of Frauds',
          'No, because landlord is the party to be charged',
          'Yes, but only for the 6 months already paid',
        ],
        correctAnswer: 1,
        explanation: 'While the Statute of Frauds requires leases over 1 year to be in writing, part performance (taking possession and paying rent) can satisfy the statute in many jurisdictions.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'In Scenario D, can the adult void the contract?',
        options: [
          'Yes, minors can void contracts even after reaching majority',
          'No, ratification occurred through continued payments after age 18',
          'Yes, but only if the laptop is returned unused',
          'No, because laptops for college are necessities',
        ],
        correctAnswer: 1,
        explanation: 'Making payments after reaching the age of majority constitutes ratification of the contract. The right to disaffirm was waived through affirmative conduct.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'In Scenario E, what remedy is available?',
        options: [
          'Seller can rescind due to mutual mistake',
          'Buyer can keep the painting at the agreed price',
          'The contract is void and must be unwound',
          'Seller can demand reformation to fair value',
        ],
        correctAnswer: 0,
        explanation: 'Mutual mistake as to a basic assumption (the painting\'s authenticity) allows the adversely affected party to rescind. Seller can void the contract and recover the painting.',
      },
    ],
    hints: [
      'Offers can be revoked before acceptance unless option contract exists',
      'Past consideration is NOT valid consideration',
      'Statute of Frauds: MYLEGS (Marriage, Year+, Land, Executor, Goods $500+, Surety)',
      'Minors can disaffirm contracts, but ratification after 18 waives that right',
    ],
    references: ['Restatement (Second) of Contracts', 'UCC Article 2', 'Statute of Frauds'],
  },
  {
    id: 'reg-tbs-011',
    section: 'REG',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Agency Law and Employment Relationships',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Agency Law',
    blueprintArea: 'REG-I',
    blueprintTopic: 'REG-I-B-1',
    scenario: `
Review the following agency and employment scenarios:

SCENARIO A - ACTUAL VS. APPARENT AUTHORITY:
ABC Corp hires Sales Agent with written authority to sell products up to $10,000. Without ABC's knowledge, Sales Agent tells Customer that she can approve deals up to $50,000. Customer, relying on this, signs a $40,000 purchase order.

SCENARIO B - INDEPENDENT CONTRACTOR VS. EMPLOYEE:
Tech Consultant works for StartupCo. She uses her own laptop, sets her own hours, works for multiple clients, and invoices monthly. StartupCo provides office space when needed but doesn't supervise her methods.

SCENARIO C - RESPONDEAT SUPERIOR:
Delivery Driver, while on an approved delivery route for Employer, detours to pick up personal dry cleaning. While parked at the dry cleaner, Driver negligently backs into Pedestrian.

SCENARIO D - DISCLOSED VS. UNDISCLOSED PRINCIPAL:
Purchasing Agent buys supplies for Manufacturing Co., but doesn't reveal who she represents. Agent signs the contract in her own name. Seller later learns Manufacturing Co. was the principal.

SCENARIO E - DUTY OF LOYALTY:
CFO of PublicCo learns that the company plans to acquire LandCo at a premium. Before the announcement, CFO personally buys LandCo shares.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'In Scenario A, is ABC Corp bound by the $40,000 contract?',
        options: [
          'No, because Sales Agent exceeded actual authority',
          'Yes, because Sales Agent had apparent authority',
          'No, because Customer should have verified authority',
          'Yes, because ratification is automatic',
        ],
        correctAnswer: 1,
        explanation: 'Apparent authority exists when a principal\'s conduct leads a third party to reasonably believe the agent has authority. ABC created apparent authority by allowing Sales Agent to represent herself as having deal authority.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'In Scenario B, how should Tech Consultant be classified?',
        options: [
          'Employee, because she uses StartupCo office space',
          'Independent contractor, based on the factors described',
          'Employee, because she works regularly for StartupCo',
          'Cannot determine without a written agreement',
        ],
        correctAnswer: 1,
        explanation: 'Key independent contractor factors present: own equipment, sets own hours, multiple clients, control over methods. The occasional office use is not determinative.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'In Scenario C, is Employer liable for Pedestrian\'s injuries?',
        options: [
          'Yes, the detour was a minor frolic',
          'No, the personal errand was outside scope of employment',
          'Yes, because driving was within the job duties',
          'No, because the vehicle was parked, not in operation',
        ],
        correctAnswer: 1,
        explanation: 'A substantial deviation for personal purposes (frolic) takes the employee outside the scope of employment. The personal dry cleaning errand was not within the authorized activities.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'In Scenario D, who can Seller hold liable on the contract?',
        options: [
          'Only Manufacturing Co. (the principal)',
          'Only Purchasing Agent (who signed)',
          'Either Manufacturing Co. or Purchasing Agent',
          'Neither, because the contract is void',
        ],
        correctAnswer: 2,
        explanation: 'With an undisclosed principal, the third party can hold either the agent (who signed) or the principal (once discovered) liable. The third party must elect and can only recover once.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'In Scenario E, what duties did CFO breach?',
        options: [
          'Duty of care only',
          'Duty of loyalty and prohibition on insider trading',
          'No duties breached if CFO made a profit',
          'Only securities laws, not fiduciary duties',
        ],
        correctAnswer: 1,
        explanation: 'CFO breached the fiduciary duty of loyalty by trading on material non-public information. This also violates securities laws (insider trading under Rule 10b-5).',
      },
    ],
    hints: [
      'Apparent authority protects third parties who reasonably rely on appearance of authority',
      'Independent contractor factors: control, tools, multiple clients, method of payment',
      'Respondeat superior: employer liable for torts within scope of employment',
      'Undisclosed principal: third party can sue agent or principal once discovered',
    ],
    references: ['Restatement (Third) of Agency', 'IRC Section 3121', 'Securities Exchange Act'],
  },
  {
    id: 'reg-tbs-012',
    section: 'REG',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Business Entity Formation and Liability',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Business Structures',
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-A-1',
    scenario: `
Review the following scenarios regarding business entity formation and liability:

SCENARIO A - PARTNERSHIP FORMATION:
Alex and Blake agree to "go into business together selling crafts." They don't file any documents with the state. They split profits 50/50. Blake orders $50,000 of inventory from Vendor on credit. Vendor now wants payment.

SCENARIO B - LIMITED PARTNER LIABILITY:
Chris is a limited partner in Deluxe LP. The partnership agreement restricts Chris to a passive investment role. Chris attends weekly management meetings, approves the annual budget, and frequently advises the general partner on operations. The partnership defaults on a loan.

SCENARIO C - LLC PIERCING THE VEIL:
Dana forms a single-member LLC but never opens a separate bank account. Dana pays personal expenses from business receipts and doesn't maintain meeting minutes. When the LLC can't pay a $100,000 judgment, Creditor sues Dana personally.

SCENARIO D - CORPORATION FORMATION:
Three incorporators file articles of incorporation with the state, which acknowledges receipt. Before the certificate of incorporation is issued, they sign a contract to lease office space for "NewCorp, Inc." The state then rejects the filing due to a name conflict.

SCENARIO E - S CORP ELECTION:
A newly formed corporation with two shareholders (both U.S. citizens) wants S status. They file Form 2553 on March 1 for a calendar-year election, and the corporation began operations January 15.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'In Scenario A, what type of entity exists and who is liable to Vendor?',
        options: [
          'No entity; Alex and Blake individually liable',
          'General partnership; both Alex and Blake jointly liable',
          'General partnership; only Blake liable (made the order)',
          'Limited partnership; Blake is general partner only',
        ],
        correctAnswer: 1,
        explanation: 'A general partnership forms automatically when two or more persons carry on a business for profit. No filing required. All general partners are jointly and severally liable for partnership debts.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'In Scenario B, can Chris be held personally liable for the loan?',
        options: [
          'No, limited partners are never personally liable',
          'Yes, Chris participated in management losing limited liability',
          'No, unless Chris guaranteed the loan',
          'Yes, but only to the extent of capital contribution',
        ],
        correctAnswer: 1,
        explanation: 'Under RULPA and ULPA, limited partners who participate in control of the business may lose their limited liability protection. Chris\'s active management participation likely crossed this line.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'In Scenario C, will the court likely pierce the LLC veil?',
        options: [
          'No, LLCs cannot be pierced',
          'Yes, due to failure to observe formalities and commingling',
          'No, single-member LLCs don\'t require formalities',
          'Yes, but only if fraud is proven',
        ],
        correctAnswer: 1,
        explanation: 'Courts may pierce the LLC veil when there is: (1) commingling of funds, (2) failure to maintain entity formalities, (3) undercapitalization, or (4) use of entity to perpetrate fraud or injustice.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'In Scenario D, who is liable on the office lease?',
        options: [
          'NewCorp, Inc. as a de facto corporation',
          'The three incorporators personally, jointly and severally',
          'No one; the lease is void without a valid corporation',
          'Only the incorporator who signed the lease',
        ],
        correctAnswer: 1,
        explanation: 'Since the incorporation was never completed (filing rejected), no corporation exists. Those acting on behalf of a non-existent corporation are personally liable as promoters.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'In Scenario E, is the S election valid?',
        options: [
          'Yes, filed within 2.5 months of formation',
          'No, should have been filed by February 15',
          'Yes, effective for the following tax year',
          'No, must wait until next year to file',
        ],
        correctAnswer: 0,
        explanation: 'Form 2553 must be filed by the 15th day of the 3rd month (2.5 months) from the earlier of when the S election is to take effect or when the corporation first has assets. March 1 is within 2.5 months of January 15.',
      },
    ],
    hints: [
      'General partnership = automatic formation when carrying on business for profit',
      'Limited partners lose protection if they participate in control',
      'Piercing veil factors: commingling, undercapitalization, formalities, fraud',
      'S election: File within 2.5 months of beginning of tax year (or business start)',
    ],
    references: ['RUPA', 'RULPA', 'RULLCA', 'IRC Section 1362'],
  },
  {
    id: 'reg-tbs-013',
    section: 'REG',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'UCC Article 2 - Sales Transactions',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Uniform Commercial Code',
    blueprintArea: 'REG-I',
    blueprintTopic: 'REG-I-C-1',
    scenario: `
Review the following sales transaction scenarios under UCC Article 2:

SCENARIO A - STATUTE OF FRAUDS:
Manufacturer (merchant) sends Retailer (merchant) a signed purchase order for 1,000 widgets at $500 each. Retailer receives it, reads it, but doesn't respond for 15 days. Manufacturer ships the widgets; Retailer refuses delivery.

SCENARIO B - BATTLE OF THE FORMS:
Buyer sends a purchase order for equipment at $10,000, with arbitration clause. Seller responds with acknowledgment at $10,000, but adds "all disputes to be litigated in Seller's state." Both forms reference the equipment. Buyer accepts delivery.

SCENARIO C - RISK OF LOSS:
FedParts (merchant seller) agrees to sell auto parts to AutoShop (buyer). Terms: "F.O.B. Seller's warehouse." FedParts loads goods onto carrier. During transit, the goods are destroyed in a truck accident.

SCENARIO D - WARRANTIES:
Hardware Store sells a lawn mower. Store's sign says "AS-IS - NO WARRANTIES." Salesperson tells customer, "This mower will easily cut grass up to 12 inches tall." Customer buys; mower can only handle grass up to 6 inches.

SCENARIO E - PERFECT TENDER RULE:
Furniture Co. delivers 100 chairs to Restaurant. Upon inspection, Restaurant finds 3 chairs have minor scratches that don't affect use. Restaurant rejects the entire shipment.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'In Scenario A, is Retailer bound by the contract?',
        options: [
          'No, Retailer never signed anything',
          'Yes, under the merchant\'s exception (failed to object within 10 days)',
          'No, the Statute of Frauds requires Retailer\'s signature',
          'Yes, but only for half the quantity',
        ],
        correctAnswer: 1,
        explanation: 'Under UCC 2-201(2), between merchants, a written confirmation satisfies the Statute of Frauds unless the recipient objects in writing within 10 days. Retailer\'s 15-day silence bound them.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'In Scenario B, which dispute resolution term governs?',
        options: [
          'Arbitration (Buyer\'s term)',
          'Litigation in Seller\'s state',
          'Neither; UCC gap-filler applies',
          'Whichever party filed suit first',
        ],
        correctAnswer: 2,
        explanation: 'Under UCC 2-207, when both parties are merchants and terms conflict, the conflicting terms "knock out" and UCC default rules apply. Neither arbitration nor specific venue governs.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'In Scenario C, who bears the risk of loss for the destroyed goods?',
        options: [
          'FedParts (seller), because goods were damaged',
          'AutoShop (buyer), because risk passed at shipment (F.O.B. origin)',
          'The carrier, because damage occurred in transit',
          'Shared equally between buyer and seller',
        ],
        correctAnswer: 1,
        explanation: 'F.O.B. seller\'s warehouse (F.O.B. origin) means risk of loss passes when seller delivers goods to the carrier. Buyer bears the loss for damage during transit.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'In Scenario D, can the customer recover for breach of warranty?',
        options: [
          'No, the AS-IS disclaimer eliminated all warranties',
          'Yes, express warranty (oral statement) cannot be disclaimed',
          'No, oral statements don\'t create warranties',
          'Yes, but only under implied warranty of merchantability',
        ],
        correctAnswer: 1,
        explanation: 'The salesperson\'s specific statement about performance ("cuts 12-inch grass") created an express warranty. Express warranties cannot be disclaimed, even with AS-IS language.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'In Scenario E, is Restaurant\'s rejection of all 100 chairs proper?',
        options: [
          'Yes, perfect tender rule allows rejection for any defect',
          'No, must accept conforming goods and reject only defective ones',
          'No, minor scratches don\'t justify rejection',
          'Yes, but only if done within reasonable time',
        ],
        correctAnswer: 0,
        explanation: 'Under UCC 2-601, the perfect tender rule allows buyer to reject the whole shipment if goods or tender fail to conform in any respect. Even minor defects justify rejection.',
      },
    ],
    hints: [
      'Merchant\'s exception: written confirmation binds if no objection in 10 days',
      'Battle of forms: conflicting terms knock out; UCC fills gaps',
      'F.O.B. origin = risk passes at shipment; F.O.B. destination = risk at delivery',
      'Express warranties cannot be disclaimed (unlike implied warranties)',
    ],
    references: ['UCC 2-201', 'UCC 2-207', 'UCC 2-509', 'UCC 2-313', 'UCC 2-601'],
  },
  {
    id: 'reg-tbs-014',
    section: 'REG',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Debtor-Creditor Relationships and Bankruptcy',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Debtor-Creditor Law',
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-B-1',
    scenario: `
Review the following debtor-creditor and bankruptcy scenarios:

SCENARIO A - SECURED TRANSACTIONS:
Bank takes a security interest in Retailer's inventory. Bank properly files a financing statement. Later, Retailer borrows from Finance Co., granting a security interest in the same inventory. Finance Co. files 30 days later. Retailer defaults on both loans.

SCENARIO B - SURETYSHIP:
Guarantor signs a guarantee for Debtor's $100,000 loan from Bank. Debtor and Bank later agree to extend the loan term by one year and increase the interest rate. Guarantor is not notified. Debtor defaults.

SCENARIO C - BANKRUPTCY FILING:
Individual files Chapter 7 bankruptcy with the following assets:
• Primary residence: $300,000 value, $280,000 mortgage
• Car: $8,000 value, $6,000 loan
• Checking account: $2,500
• Retirement account (401k): $150,000
• Personal belongings: $5,000

SCENARIO D - PREFERENTIAL TRANSFER:
30 days before filing Chapter 7, Debtor repaid a $10,000 personal loan from his mother-in-law. The loan was unsecured and had been outstanding for 2 years.

SCENARIO E - DISCHARGE:
Debtor completes Chapter 7 proceedings. Outstanding debts include:
• Credit card debt: $25,000
• Student loans: $40,000
• Income taxes (3 years old): $15,000
• Child support arrears: $12,000
• Personal injury judgment (drunk driving): $100,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'In Scenario A, who has priority in the inventory?',
        options: [
          'Bank, because it filed first (first in time, first in right)',
          'Finance Co., because it has a purchase-money security interest',
          'Both share pro-rata based on loan amounts',
          'Bank, but only for inventory present when it filed',
        ],
        correctAnswer: 0,
        explanation: 'Under UCC Article 9, when two secured parties have perfected security interests in the same collateral, priority goes to the first to file or perfect. Bank filed first.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'In Scenario B, what is the effect on Guarantor\'s obligation?',
        options: [
          'Guarantor remains fully liable for $100,000',
          'Guarantor is completely discharged',
          'Guarantor is liable only for the original terms',
          'Guarantor is liable but can seek contribution',
        ],
        correctAnswer: 1,
        explanation: 'Material modification of the underlying debt without the surety\'s consent discharges the surety. Extending term and increasing interest rate are material modifications.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'In Scenario C, which asset is fully exempt from the bankruptcy estate?',
        options: [
          'Primary residence equity ($20,000)',
          'Car equity ($2,000)',
          'Retirement account (401k) - $150,000',
          'All assets are partially exempt',
        ],
        correctAnswer: 2,
        explanation: 'ERISA-qualified retirement accounts (401k, IRA to limits) are fully exempt from bankruptcy under federal law. The 401k cannot be touched by creditors.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'In Scenario D, can the trustee recover the payment to mother-in-law?',
        options: [
          'No, family payments are protected',
          'Yes, preferential transfer to insider within 1 year lookback',
          'No, because the loan was legitimate',
          'Yes, but only if mother-in-law received more than creditors',
        ],
        correctAnswer: 1,
        explanation: 'Payments to insiders (relatives by marriage qualify) can be avoided if made within 1 year of filing and on account of an antecedent debt. The 30-day payment is within the 1-year insider lookback.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'In Scenario E, which debts will NOT be discharged?',
        options: [
          'Credit card debt only',
          'Student loans, child support, and DUI judgment',
          'Student loans, taxes, child support, and DUI judgment',
          'All debts except credit cards',
        ],
        correctAnswer: 2,
        explanation: 'Non-dischargeable debts include: student loans (absent hardship), recent taxes (generally within 3 years), domestic support obligations, and debts for willful/malicious injury (DUI causing injury).',
      },
    ],
    hints: [
      'UCC 9: First to file or perfect has priority (exceptions for PMSIs)',
      'Suretyship: Material modification without consent = discharge',
      'Bankruptcy exemptions: Homestead, retirement accounts, tools of trade',
      'Preferential transfers: 90 days general, 1 year for insiders',
    ],
    references: ['UCC Article 9', 'Bankruptcy Code 11 USC', '11 USC 547', '11 USC 523'],
  },
];

// ==========================================
// MORE AUD TBS
// ==========================================
export const AUD_TBS_2: TBS[] = [
  {
    id: 'aud-tbs-004',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Subsequent Events Analysis',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Completing the Audit',
    scenario: `
You are reviewing subsequent events for Vanguard Manufacturing. The audit report date is February 28, Year 2. The financial statements are for the year ended December 31, Year 1.

EVENT A: On January 15, Year 2, a customer filed for bankruptcy. The customer owed Vanguard $250,000 at year-end. Based on the filing, Vanguard expects to collect only $50,000.

EVENT B: On February 10, Year 2, Vanguard's warehouse was damaged by fire. Uninsured losses totaled $800,000.

EVENT C: On February 20, Year 2, Vanguard settled a lawsuit that was pending at year-end. The settlement of $400,000 was within the range disclosed in the financial statements.

EVENT D: On March 5, Year 2, after the audit report date but before issuance, Vanguard announced a major acquisition that would double the company's size.

EVENT E: At December 31, Year 1, Vanguard had a contingent liability from litigation. On February 25, Year 2, the court ruled in Vanguard's favor, dismissing the case.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'classification',
        question: 'Classify each event as Type I (Recognized) or Type II (Non-recognized).',
        items: ['Event A', 'Event B', 'Event C', 'Event D', 'Event E'],
        options: ['Type I - Adjust F/S', 'Type II - Disclose Only', 'No Action Required'],
        correctAnswers: [
          { item: 'Event A', answer: 'Type I - Adjust F/S' },
          { item: 'Event B', answer: 'Type II - Disclose Only' },
          { item: 'Event C', answer: 'Type I - Adjust F/S' },
          { item: 'Event D', answer: 'Type II - Disclose Only' },
          { item: 'Event E', answer: 'Type I - Adjust F/S' },
        ],
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'For Event A, what journal entry should Vanguard record?',
        options: [
          'Debit Bad Debt Expense $200,000; Credit Accounts Receivable $200,000',
          'Debit Bad Debt Expense $200,000; Credit Allowance for Doubtful Accounts $200,000',
          'No entry; disclosure only',
          'Debit Loss on Receivable $250,000; Credit Accounts Receivable $250,000',
        ],
        correctAnswer: 1,
        explanation:
          'The bankruptcy provides evidence of conditions existing at year-end. Increase allowance by $200,000 ($250,000 - $50,000 expected recovery).',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: "What is the auditor's responsibility for Event D?",
        options: [
          'Require adjustment to the financial statements',
          'Expand audit procedures to evaluate the acquisition',
          'No responsibility - occurred after report date',
          'Evaluate whether disclosure is needed as a subsequent event',
        ],
        correctAnswer: 3,
        explanation:
          'Events occurring between report date and issuance that require disclosure should be evaluated. Major acquisitions may warrant note disclosure.',
      },
    ],
    hints: [
      'Type I: Conditions existed at balance sheet date; recognize in F/S',
      'Type II: Conditions arose after balance sheet date; disclose if material',
      'Customer bankruptcy usually indicates condition existed at year-end',
      'Fire/natural disasters after year-end are typically Type II',
    ],
    references: ['AU-C 560', 'ASC 855'],
  },
  {
    id: 'aud-tbs-005',
    section: 'AUD',
    type: TBS_TYPES.CALCULATION,
    title: 'Materiality Calculations',
    difficulty: 'medium',
    timeEstimate: 12,
    topic: 'Audit Planning',
    scenario: `
You are planning the audit of Meridian Corp. The following financial information is available:

Income Statement (Year 1):
• Total revenues: $45,000,000
• Gross profit: $18,000,000
• Income before taxes: $4,200,000
• Net income: $3,150,000

Balance Sheet:
• Total assets: $38,000,000
• Total equity: $15,000,000

Company characteristics:
• Publicly traded company
• Stable earnings history
• No debt covenants requiring specific ratio calculations
• Industry average net profit margin: 6%

Firm policy benchmarks:
• Revenue: 0.5% - 1%
• Total assets: 0.5% - 1%
• Net income: 3% - 5%
• Equity: 1% - 2%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate overall materiality using 5% of net income.',
        correctAnswer: 157500,
        tolerance: 100,
        explanation: '$3,150,000 × 5% = $157,500',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate overall materiality using 0.5% of revenue.',
        correctAnswer: 225000,
        tolerance: 100,
        explanation: '$45,000,000 × 0.5% = $225,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question:
          'If overall materiality is set at $200,000, calculate performance materiality at 75%.',
        correctAnswer: 150000,
        tolerance: 0,
        explanation: '$200,000 × 75% = $150,000',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What is the most appropriate benchmark for this company?',
        options: [
          'Total revenues - because it is the largest number',
          'Net income - because users focus on profitability',
          'Total assets - because it represents the resource base',
          'Equity - because it represents residual value',
        ],
        correctAnswer: 1,
        explanation:
          'For a stable, profitable company, net income is typically the most appropriate benchmark as it reflects what users focus on.',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question:
          'If the threshold for clearly trivial misstatements is 5% of overall materiality ($200,000), what is the threshold?',
        correctAnswer: 10000,
        tolerance: 0,
        explanation: '$200,000 × 5% = $10,000',
      },
    ],
    hints: [
      '📊 MATERIALITY FORMULAS:',
      '• Overall Materiality = Benchmark × Percentage',
      '• Performance Materiality = Overall Materiality × 50-75%',
      '• Clearly Trivial = Overall Materiality × 3-5%',
      '',
      '📌 COMMON BENCHMARKS:',
      '• Net Income: 3-5% (stable, profitable companies)',
      '• Revenue: 0.5-1% (for-profit entities)',
      '• Total Assets: 0.5-1% (asset-based businesses)',
      '• Equity: 1-2% (alternative for non-profits)',
      '',
      '💡 TIPS:',
      '• Choose benchmark based on what users focus on',
      '• Profitable companies → use Net Income',
      '• Net Income × 5% = most common starting point',
    ],
    references: ['AU-C 320', 'AU-C 450'],
  },
  {
    id: 'aud-tbs-006',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Analytical Procedures and Ratio Analysis',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Substantive Procedures',
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-C-1',
    scenario: `
You are performing analytical procedures for Cascade Industries as part of the Year 2 audit. The following comparative financial data is available:

                              Year 2          Year 1          Industry Avg
Revenue                    $12,500,000     $11,200,000          N/A
Cost of Goods Sold          $7,875,000      $6,720,000          N/A
Gross Profit                $4,625,000      $4,480,000          N/A
Operating Expenses          $3,100,000      $2,800,000          N/A
Net Income                  $1,525,000      $1,680,000          N/A

Accounts Receivable         $2,350,000      $1,568,000          N/A
Inventory                   $1,890,000      $1,400,000          N/A
Total Assets               $15,000,000     $12,800,000          N/A

Key Ratios:
Gross Profit Margin            37.0%           40.0%          38.0%
Days Sales Outstanding           69              51              45
Inventory Turnover               4.2             4.8             5.2
Current Ratio                    1.8             2.1             2.0

Your expectations based on industry trends were:
• Revenue increase of 8-10%
• Gross profit margin of 39-41%
• DSO of 45-50 days
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which ratio presents the most significant audit concern requiring investigation?',
        options: [
          'Gross profit margin - declined 3 percentage points',
          'Days sales outstanding - increased from 51 to 69 days',
          'Inventory turnover - decreased from 4.8 to 4.2',
          'Current ratio - decreased from 2.1 to 1.8',
        ],
        correctAnswer: 1,
        explanation: 'DSO increased by 35% (18 days) and is now 24 days above industry average. This significant deterioration in collections could indicate revenue recognition issues, collectibility problems, or fictitious receivables.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The gross profit margin decline from 40% to 37% could indicate:',
        options: [
          'Improved purchasing efficiency',
          'Possible inventory obsolescence not recorded',
          'Understated sales returns and allowances',
          'Both B and C are possible concerns',
        ],
        correctAnswer: 3,
        explanation: 'A declining gross profit margin could indicate unrecorded inventory write-downs or understated sales returns. Both require additional audit procedures.',
      },
      {
        id: 'req-3',
        type: 'classification',
        question: 'For each finding, identify the most appropriate follow-up procedure:',
        items: ['DSO increased significantly', 'Gross margin declined', 'Inventory turnover slowed'],
        options: ['Test AR aging and subsequent collections', 'Review inventory for obsolescence', 'Analyze pricing and cost trends', 'All are appropriate responses'],
        correctAnswers: [
          { item: 'DSO increased significantly', answer: 'Test AR aging and subsequent collections' },
          { item: 'Gross margin declined', answer: 'Analyze pricing and cost trends' },
          { item: 'Inventory turnover slowed', answer: 'Review inventory for obsolescence' },
        ],
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'When management explains DSO increased due to "extended payment terms for key customers," the auditor should:',
        options: [
          'Accept the explanation and document it',
          'Corroborate by reviewing sales contracts and customer correspondence',
          'Reduce the scope of receivables testing',
          'Issue a qualified opinion for the collectibility concern',
        ],
        correctAnswer: 1,
        explanation: 'Management explanations should be corroborated with evidence. Review contracts for modified terms and test subsequent collections to verify collectibility.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'If revenue increased 11.6% but the expectation was 8-10%, this suggests:',
        options: [
          'No concern - higher revenue is always positive',
          'Possible overstatement requiring cutoff and existence testing',
          'The expectation was too conservative',
          'Management is effective at growing the business',
        ],
        correctAnswer: 1,
        explanation: 'Revenue exceeding expectations, combined with deteriorating DSO, raises concerns about revenue recognition (cutoff) and existence of recorded sales.',
      },
    ],
    hints: [
      'DSO Formula: (Accounts Receivable / Revenue) × 365',
      'Significant changes from prior year AND industry require investigation',
      'Corroborate all management explanations with evidence',
      'Multiple ratios moving adversely may indicate related issues',
    ],
    references: ['AU-C 520', 'AU-C 315', 'AU-C 330'],
  },
  {
    id: 'aud-tbs-007',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Audit Evidence Evaluation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Audit Evidence',
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-A-1',
    scenario: `
You are evaluating audit evidence obtained during the audit of Pinnacle Corporation. For each situation, determine the sufficiency and appropriateness of the evidence.

SITUATION A - CASH CONFIRMATION
The auditor sent positive confirmations to all banks where Pinnacle has accounts. Results:
• Sent: 5 confirmations
• Returned and agreed: 3
• Returned with differences (timing): 1
• Not returned: 1 (balance $2.3 million)

SITUATION B - ACCOUNTS RECEIVABLE
For a sample of 40 receivables totaling $800,000:
• Customer confirmations returned agreeing: 28
• Customers who did not respond: 8 (totaling $180,000)
• Confirmations returned with differences: 4 (totaling $45,000)
For non-responses, the auditor examined subsequent cash receipts.

SITUATION C - INVENTORY OBSERVATION
The auditor observed the physical inventory count at the main warehouse (70% of inventory value). Due to timing, the auditor was unable to observe the count at a remote location (30% of inventory).

SITUATION D - RELATED PARTY TRANSACTIONS
Management provided a representation letter stating there are no related party transactions. The auditor did not perform additional procedures.

SITUATION E - LEGAL CONTINGENCIES
The client's legal counsel responded to the audit inquiry but refused to provide any specific information about pending litigation, citing attorney-client privilege.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'For Situation A (non-responding bank), what should the auditor do?',
        options: [
          'Accept the internal records as sufficient evidence',
          'Send a second confirmation request',
          'Perform alternative procedures such as examining bank statements',
          'Qualify the audit opinion for scope limitation',
        ],
        correctAnswer: 2,
        explanation: 'For bank confirmations, non-responses require follow-up. If a second request is unanswered, alternative procedures (examining bank statements, testing reconciling items) should be performed before considering scope limitations.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'For Situation B, the examination of subsequent cash receipts for non-responding customers:',
        options: [
          'Is not an acceptable alternative procedure',
          'Provides evidence about existence but not accuracy of amounts',
          'Provides sufficient evidence about existence and valuation',
          'Should only be used if management refuses to cooperate',
        ],
        correctAnswer: 2,
        explanation: 'Subsequent cash receipts provide strong evidence of both existence (customer paid) and valuation (amount collected matches recorded amount). This is an appropriate alternative procedure for non-responses.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'For Situation C (unobserved inventory at remote location), the auditor should:',
        options: [
          'Accept management representations about the remote inventory',
          'Perform alternative procedures or observe on an alternative date',
          'Immediately withdraw from the engagement',
          'Issue an adverse opinion',
        ],
        correctAnswer: 1,
        explanation: 'If inventory is material and the auditor cannot observe, alternative procedures include observing on another date (with rollforward/rollback) or having another auditor observe. A scope limitation may result only if alternatives are not feasible.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'For Situation D (related party reliance on management representations only):',
        options: [
          'Management representations are sufficient for related parties',
          'This is a deficiency - additional procedures should be performed',
          'Related party procedures are optional',
          'The auditor should resign due to management dishonesty',
        ],
        correctAnswer: 1,
        explanation: 'AU-C 550 requires procedures beyond inquiry and management representations for related parties. The auditor should review board minutes, contracts, and make inquiries of others with knowledge.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'For Situation E (attorney refusing to respond):',
        options: [
          'This is normal and acceptable',
          'The auditor should consider a scope limitation',
          'Management representations about litigation are sufficient',
          'The auditor should subpoena the attorney',
        ],
        correctAnswer: 1,
        explanation: 'Attorney refusal to respond to audit inquiries about litigation is a scope limitation. The auditor cannot rely solely on management representations for legal contingencies.',
      },
    ],
    hints: [
      'External evidence is generally more reliable than internal evidence',
      'Management representations alone are rarely sufficient for significant matters',
      'Scope limitations may require a qualified opinion or disclaimer',
      'Alternative procedures must provide equivalent level of assurance',
    ],
    references: ['AU-C 500', 'AU-C 501', 'AU-C 505', 'AU-C 550', 'AU-C 501'],
  },
  {
    id: 'aud-tbs-008',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Risk Assessment and Audit Response',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Risk Assessment',
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-C-1',
    scenario: `
You are performing risk assessment for Quantum Tech Corp, a rapidly growing technology company. Based on your understanding of the entity, you have identified the following factors:

ENTITY-LEVEL FACTORS:
• New CFO hired 6 months ago (third CFO in 2 years)
• Company going through IPO process - significant pressure to meet earnings targets
• Complex revenue recognition due to multiple-element arrangements
• Management compensation heavily tied to stock price performance

ACCOUNT-LEVEL FACTORS:
Account               Balance      Prior Misstatements    Complexity
Revenue              $85M         Material adjustment     High
Accounts Receivable  $18M         None                    Low
Stock Compensation   $4M          Material weakness       High
Capitalized Software $12M         Prior audit finding     Medium
Inventory            $8M          None                    Low

CONTROL OBSERVATIONS:
• IT general controls have not been tested in prior year
• Revenue recognition policy was recently changed
• Journal entry review process is informal
• No internal audit function
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'classification',
        question: 'Classify each account as Higher Risk or Lower Risk of material misstatement:',
        items: ['Revenue', 'Accounts Receivable', 'Stock Compensation', 'Capitalized Software', 'Inventory'],
        options: ['Higher Risk', 'Lower Risk'],
        correctAnswers: [
          { item: 'Revenue', answer: 'Higher Risk' },
          { item: 'Accounts Receivable', answer: 'Lower Risk' },
          { item: 'Stock Compensation', answer: 'Higher Risk' },
          { item: 'Capitalized Software', answer: 'Higher Risk' },
          { item: 'Inventory', answer: 'Lower Risk' },
        ],
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Which factor creates the HIGHEST fraud risk?',
        options: [
          'New CFO hired recently',
          'IPO pressure combined with management compensation tied to stock price',
          'Complex revenue recognition',
          'No internal audit function',
        ],
        correctAnswer: 1,
        explanation: 'The fraud triangle requires incentive, opportunity, and rationalization. IPO pressure plus stock-based compensation creates strong financial incentive for management to misstate earnings.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'For revenue (identified as a significant risk), the auditor should:',
        options: [
          'Reduce testing since there was a prior material adjustment',
          'Perform substantive procedures addressing the specific risks',
          'Rely primarily on controls testing',
          'Consider withdrawing from the engagement',
        ],
        correctAnswer: 1,
        explanation: 'For significant risks, AU-C 330 requires substantive procedures specifically responsive to the assessed risk. Control testing alone is never sufficient for significant risks.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The lack of IT general controls testing in the prior year means:',
        options: [
          'The current year auditor can rely on prior year testing',
          'IT general controls must be tested before relying on any automated controls',
          'The auditor should only perform substantive procedures',
          'This is not a significant concern for a technology company',
        ],
        correctAnswer: 1,
        explanation: 'Before relying on application controls, IT general controls (access, change management, operations) must be tested. Prior year testing cannot be relied upon for current year controls.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'The informal journal entry review process indicates:',
        options: [
          'A control deficiency requiring evaluation',
          'A significant deficiency to be communicated to governance',
          'An acceptable process for a smaller company',
          'No concern if entries appear reasonable',
        ],
        correctAnswer: 0,
        explanation: 'An informal journal entry review process represents a control deficiency. Journal entry review is a key control for fraud prevention. The severity depends on compensating controls.',
      },
    ],
    hints: [
      'Fraud risk factors: Incentive, Opportunity, Rationalization (the fraud triangle)',
      'Significant risks require substantive procedures - cannot rely on controls alone',
      'Prior misstatements indicate increased risk in current period',
      'IPO situations create high pressure on management',
    ],
    references: ['AU-C 315', 'AU-C 330', 'AU-C 240', 'AU-C 265'],
  },
  {
    id: 'aud-tbs-009',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Independence and Ethics Evaluation',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Professional Responsibilities',
    blueprintArea: 'AUD-I',
    blueprintTopic: 'AUD-I-B-1',
    scenario: `
You are the ethics partner at Anderson & Associates CPAs. Evaluate the following independence situations for your firm's audit clients:

SITUATION A - Financial Interest
Staff auditor Sarah owns 50 shares of Gamma Corp (an audit client) that she inherited last month. The shares are worth $1,200. Sarah is not on the Gamma audit team.

SITUATION B - Employment Relationship
Partner Tom's daughter accepted a position as Senior Accountant at Delta Industries, an audit client. The position reports to the CFO. Tom is not involved in the Delta audit.

SITUATION C - Non-Audit Services
For Epsilon Corp (a public company audit client), the firm is asked to design and implement a new accounting information system. The client will make all management decisions.

SITUATION D - Business Relationship
The firm entered into a joint venture with Zeta Corp (an audit client) to develop audit software. The firm has a 30% interest in the venture.

SITUATION E - Former Employment
Manager Jessica joined the firm 6 months ago. Before joining, she was the Controller at Theta Industries, which the firm audits. Jessica has not been assigned to the Theta audit.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'For Situation A (staff auditor inherited shares), independence is:',
        options: [
          'Impaired because any ownership of audit client stock is prohibited',
          'Not impaired because Sarah is not on the engagement team',
          'Impaired unless Sarah sells the shares within 30 days',
          'Not impaired because the amount is immaterial',
        ],
        correctAnswer: 2,
        explanation: 'Under AICPA rules, unsolicited financial interests (like inheritance) must be disposed of as soon as practicable. A reasonable period (typically 30 days) is allowed for disposition.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'For Situation B (partner\'s daughter as Senior Accountant), independence is:',
        options: [
          'Impaired - close family members cannot work for audit clients',
          'Not impaired because Tom is not on the audit',
          'Impaired because the daughter is in an accounting role',
          'Not impaired if she does not report to a partner on the engagement',
        ],
        correctAnswer: 2,
        explanation: 'A partner\'s immediate family member in an accounting role at an audit client impairs independence, even if the partner is not on the engagement, because the family member could influence the financial statements.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'For Situation C (designing accounting system for public client), independence is:',
        options: [
          'Not impaired if client makes all management decisions',
          'Impaired - this is a prohibited non-audit service for public companies',
          'Not impaired if pre-approved by the audit committee',
          'Impaired only if the system records financial transactions',
        ],
        correctAnswer: 1,
        explanation: 'For SEC registrants (public companies), designing and implementing accounting information systems is prohibited regardless of client approval or management decision-making.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'For Situation D (joint venture with audit client), independence is:',
        options: [
          'Impaired - this is a prohibited business relationship',
          'Not impaired if the joint venture is immaterial to the firm',
          'Not impaired because developing audit software is related to attest services',
          'Impaired only if the venture is profitable',
        ],
        correctAnswer: 0,
        explanation: 'A joint venture with an audit client constitutes a prohibited business relationship that impairs independence regardless of materiality or purpose.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'For Situation E (former Controller now at firm), independence is:',
        options: [
          'Impaired for any period Jessica was Controller',
          'Not impaired if Jessica is not on the engagement and has no influence',
          'Impaired for one year cooling-off period',
          'Not impaired because Jessica is a manager, not a partner',
        ],
        correctAnswer: 1,
        explanation: 'Former employees of audit clients can work on the audit if they: (1) have no remaining connection to the client, (2) are not in a position to influence the audit, and (3) amounts previously subject to their work are not significant to current audit.',
      },
    ],
    hints: [
      'Financial interests: Direct ownership always impairs; inherited must be disposed promptly',
      'Employment: Immediate family in accounting roles impairs independence',
      'Public companies have stricter rules under PCAOB and SEC regulations',
      'Business relationships (joint ventures, loans) generally impair independence',
    ],
    references: ['AICPA Code of Professional Conduct', 'SEC Rule 2-01', 'PCAOB Ethics Rules'],
  },
  {
    id: 'aud-tbs-010',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Audit Report Modifications',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Reporting',
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-V-B-1',
    scenario: `
You are reviewing the following situations to determine the appropriate audit report modification:

SITUATION A - Inventory Scope Limitation
You were engaged to audit XYZ Corp after year-end. The company did not have adequate records to allow you to apply alternative procedures to verify the existence and condition of inventory ($4 million). Total assets are $30 million. Inventory is material.

SITUATION B - Going Concern Doubt
ABC Company has recurring losses and negative operating cash flows. Management's plans include securing a new line of credit (letter of intent obtained) and cost reductions. You believe substantial doubt about going concern exists and disclosures are adequate.

SITUATION C - Departure from GAAP
DEF Corp uses a revenue recognition method that does not conform to ASC 606. The effect is material but not pervasive. Management refuses to change.

SITUATION D - Emphasis of Matter
GHI Industries is involved in significant litigation disclosed in the notes. The outcome is uncertain but properly disclosed. No departure from GAAP exists.

SITUATION E - Inconsistency
JKL Corp changed from LIFO to FIFO for inventory valuation this year. The change is properly disclosed and justified. Prior year financial statements were not restated.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'classification',
        question: 'Match each situation with the appropriate report modification:',
        items: ['Situation A - Inventory scope', 'Situation B - Going concern', 'Situation C - GAAP departure', 'Situation D - Litigation', 'Situation E - Accounting change'],
        options: ['Qualified Opinion', 'Adverse Opinion', 'Disclaimer of Opinion', 'Unmodified with Emphasis', 'Unmodified with Other Matter'],
        correctAnswers: [
          { item: 'Situation A - Inventory scope', answer: 'Qualified Opinion' },
          { item: 'Situation B - Going concern', answer: 'Unmodified with Emphasis' },
          { item: 'Situation C - GAAP departure', answer: 'Qualified Opinion' },
          { item: 'Situation D - Litigation', answer: 'Unmodified with Emphasis' },
          { item: 'Situation E - Accounting change', answer: 'Unmodified with Emphasis' },
        ],
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'For Situation A, if inventory were pervasive (60% of assets), the appropriate opinion would be:',
        options: [
          'Qualified opinion',
          'Adverse opinion',
          'Disclaimer of opinion',
          'Unmodified opinion with emphasis paragraph',
        ],
        correctAnswer: 2,
        explanation: 'A scope limitation that is both material and pervasive requires a disclaimer of opinion because the auditor cannot express an opinion on the financial statements as a whole.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'For Situation B, the going concern paragraph should be placed:',
        options: [
          'Before the opinion paragraph',
          'After the opinion paragraph in an Emphasis of Matter section',
          'In the Basis for Opinion paragraph',
          'In a separate report attached to the audit report',
        ],
        correctAnswer: 1,
        explanation: 'Going concern emphasis paragraphs are placed after the opinion paragraph and include a heading such as "Material Uncertainty Related to Going Concern" or "Emphasis of Matter."',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'For Situation C, if the GAAP departure were both material and pervasive, the appropriate opinion would be:',
        options: [
          'Qualified opinion',
          'Adverse opinion',
          'Disclaimer of opinion',
          'Unmodified with emphasis paragraph',
        ],
        correctAnswer: 1,
        explanation: 'A material and pervasive departure from GAAP requires an adverse opinion because the financial statements do not present fairly in accordance with the applicable framework.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Which situation would NOT require any modification to the standard unmodified report?',
        options: [
          'Situation B - Going concern',
          'Situation D - Litigation (if properly disclosed)',
          'Situation E - Accounting change',
          'None - all require some form of modification or emphasis',
        ],
        correctAnswer: 3,
        explanation: 'All five situations require some modification: going concern, material uncertainty, and consistency changes require emphasis paragraphs; GAAP departures and scope limitations require modified opinions.',
      },
    ],
    hints: [
      'Material but not pervasive = Qualified; Material and pervasive = Adverse/Disclaimer',
      'Scope limitation pervasive = Disclaimer; GAAP departure pervasive = Adverse',
      'Going concern, litigation uncertainty, and accounting changes = Emphasis paragraph',
      'Emphasis paragraphs do not modify the opinion - still unmodified',
    ],
    references: ['AU-C 705', 'AU-C 706', 'AU-C 570', 'AU-C 708'],
  },
];

// ==========================================
// MORE BEC TBS
// ==========================================
export const BEC_TBS_2: TBS[] = [
  {
    id: 'bec-tbs-004',
    section: 'BEC',
    type: TBS_TYPES.CALCULATION,
    title: 'Variance Analysis',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Cost Accounting',
    scenario: `
Precision Manufacturing uses a standard cost system. The following standards were set for Product X:

Direct Materials:
• Standard quantity: 3 pounds per unit
• Standard price: $8 per pound

Direct Labor:
• Standard hours: 2 hours per unit
• Standard rate: $22 per hour

Actual results for October (1,000 units produced):

Direct Materials:
• Actual quantity purchased and used: 3,200 pounds
• Actual price: $7.50 per pound

Direct Labor:
• Actual hours worked: 2,150 hours
• Actual rate: $23 per hour
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the direct materials price variance.',
        correctAnswer: -1600,
        tolerance: 0,
        explanation:
          '(Actual price - Standard price) × Actual quantity = ($7.50 - $8.00) × 3,200 = -$1,600 Favorable',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the direct materials quantity variance.',
        correctAnswer: 1600,
        tolerance: 0,
        explanation:
          '(Actual quantity - Standard quantity) × Standard price = (3,200 - 3,000) × $8 = $1,600 Unfavorable',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the direct labor rate variance.',
        correctAnswer: 2150,
        tolerance: 0,
        explanation:
          '(Actual rate - Standard rate) × Actual hours = ($23 - $22) × 2,150 = $2,150 Unfavorable',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the direct labor efficiency variance.',
        correctAnswer: 3300,
        tolerance: 0,
        explanation:
          '(Actual hours - Standard hours) × Standard rate = (2,150 - 2,000) × $22 = $3,300 Unfavorable',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'The favorable materials price variance most likely indicates:',
        options: [
          'Efficient use of materials',
          'Lower quality materials purchased',
          'Good negotiation with suppliers',
          'Both B and C are possible',
        ],
        correctAnswer: 3,
        explanation:
          'A favorable price variance could result from effective purchasing or from buying lower quality materials at a lower cost.',
      },
    ],
    hints: [
      'Price/Rate variances isolate the price component by using actual quantity/hours',
      'Quantity/Efficiency variances isolate the usage component by using standard price/rate',
      'Favorable = actual cost less than standard (negative variance)',
      'Unfavorable = actual cost more than standard (positive variance)',
    ],
    references: ['Standard Costing', 'Variance Analysis'],
  },
  {
    id: 'bec-tbs-005',
    section: 'BEC',
    type: TBS_TYPES.CALCULATION,
    title: 'WACC and Capital Structure',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Financial Management',
    scenario: `
Titan Industries is evaluating its capital structure. Current market data:

Equity:
• Common shares outstanding: 5,000,000
• Current stock price: $40
• Expected dividend (next year): $2.40
• Dividend growth rate: 4%
• Beta: 1.25

Debt:
• Bonds outstanding: $50,000,000 face value
• Current bond price: 105% of face value
• Coupon rate: 6%
• Yield to maturity: 5%

Market data:
• Risk-free rate: 3%
• Market risk premium: 6%
• Corporate tax rate: 25%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the market value of equity.',
        correctAnswer: 200000000,
        tolerance: 0,
        explanation: '5,000,000 shares × $40 = $200,000,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the market value of debt.',
        correctAnswer: 52500000,
        tolerance: 0,
        explanation: '$50,000,000 × 105% = $52,500,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the cost of equity using CAPM.',
        correctAnswer: 10.5,
        tolerance: 0.1,
        explanation: 'Re = Rf + β(Rm - Rf) = 3% + 1.25(6%) = 3% + 7.5% = 10.5%',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the cost of equity using the dividend growth model.',
        correctAnswer: 10,
        tolerance: 0.1,
        explanation: 'Re = (D1/P0) + g = ($2.40/$40) + 4% = 6% + 4% = 10%',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the after-tax cost of debt.',
        correctAnswer: 3.75,
        tolerance: 0.1,
        explanation: 'After-tax Rd = YTM × (1 - T) = 5% × (1 - 0.25) = 3.75%',
      },
      {
        id: 'req-6',
        type: 'calculation',
        question: 'Calculate WACC using CAPM cost of equity (10.5%).',
        correctAnswer: 9.13,
        tolerance: 0.1,
        explanation:
          'WACC = (E/V × Re) + (D/V × Rd × (1-T)) = (200/252.5 × 10.5%) + (52.5/252.5 × 3.75%) = 8.32% + 0.78% = 9.10%',
      },
    ],
    hints: [
      'Market values should be used, not book values',
      'Cost of debt is after-tax because interest is tax-deductible',
      'CAPM: Re = Rf + β(Market risk premium)',
      'Dividend growth: Re = (D1/P0) + g',
    ],
    references: ['Cost of Capital', 'CAPM', 'Dividend Discount Model'],
  },
];

// ==========================================
// RESEARCH TBS - GUARANTEED POINTS!
// ==========================================
export const RESEARCH_TBS: TBS[] = [
  {
    id: 'far-tbs-010',
    section: 'FAR',
    type: TBS_TYPES.RESEARCH,
    title: 'Research: Revenue Recognition Timing',
    difficulty: 'medium',
    timeEstimate: 12,
    topic: 'ASC 606 - Revenue Recognition',
    blueprintArea: 'FAR-IV',
    blueprintTopic: 'FAR-IV-A-1',
    scenario: `
Your client, SoftTech Solutions Inc., sells software licenses bundled with 24-month customer support. The CFO is unsure whether revenue should be recognized at a point in time or over time.

The client has provided the following facts:
• Software license provides functional intellectual property
• Customer support is a distinct performance obligation
• Customer obtains control of software upon download
• Support services are provided evenly over 24 months

The CFO asks: "What does the authoritative literature say about when to recognize revenue over time versus at a point in time?"

Using the FASB Accounting Standards Codification (ASC), locate the relevant guidance.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'research',
        question: 'Which ASC section defines the criteria for recognizing revenue over time?',
        searchTerms: ['revenue', 'over time', 'performance obligation', 'satisfied'],
        correctCitation: 'ASC 606-10-25-27',
        acceptableAnswers: ['606-10-25-27', 'ASC 606-10-25-27', '606-10-25-27 through 29'],
        explanation: 'ASC 606-10-25-27 states that an entity transfers control of a good or service over time if ONE of three criteria is met: (1) customer simultaneously receives and consumes benefits, (2) entity\'s performance creates or enhances an asset the customer controls, or (3) entity\'s performance does not create an asset with alternative use and entity has enforceable right to payment.',
      },
      {
        id: 'req-2',
        type: 'research',
        question: 'Which ASC paragraph addresses when control transfers "at a point in time"?',
        searchTerms: ['point in time', 'control', 'transferred', 'revenue'],
        correctCitation: 'ASC 606-10-25-30',
        acceptableAnswers: ['606-10-25-30', 'ASC 606-10-25-30'],
        explanation: 'ASC 606-10-25-30 states that if a performance obligation is not satisfied over time, an entity satisfies the performance obligation at a point in time, determining when the customer obtains control.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Based on the authoritative guidance, how should SoftTech recognize revenue for the software license?',
        options: [
          'Over 24 months, as the support is provided',
          'At a point in time, when the software is downloaded',
          '50% at download, 50% over support period',
          'Only after 24-month support period ends',
        ],
        correctAnswer: 1,
        explanation: 'Per ASC 606-10-25-30, control of functional IP (the software license) transfers at a point in time when the customer can use and benefit from the software. Support is a separate performance obligation recognized over time.',
      },
    ],
    hints: [
      '🔍 RESEARCH TBS STRATEGY:',
      '• Start with the master glossary or topic table of contents',
      '• Use key phrases from the question as search terms',
      '• Revenue recognition guidance is in ASC 606',
      '• Look for "transfer of control" and "performance obligation"',
      '',
      '📖 NAVIGATION TIP:',
      '• ASC 606-10-25 covers Recognition',
      '• Paragraphs 27-29 = Over time criteria',
      '• Paragraph 30+ = Point in time criteria',
    ],
    references: ['ASC 606-10-25-27', 'ASC 606-10-25-30', 'ASC 606-10-55-54'],
  },
  {
    id: 'reg-tbs-008',
    section: 'REG',
    type: TBS_TYPES.RESEARCH,
    title: 'Research: Section 199A Qualified Business Income',
    difficulty: 'medium',
    timeEstimate: 12,
    topic: 'QBI Deduction - IRC Section 199A',
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-B-4',
    scenario: `
Your client, Dr. Sarah Chen, is a physician who operates her medical practice as an S corporation. She has taxable income of $450,000 and her share of the S corporation's qualified business income (QBI) is $320,000.

Dr. Chen's tax preparer told her she might not qualify for the full Section 199A deduction because she is in a "specified service trade or business" (SSTB). She is confused about what constitutes an SSTB and the income limitations that apply.

Using the Internal Revenue Code and Treasury Regulations, locate the relevant guidance.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'research',
        question: 'Which IRC section defines "specified service trade or business" (SSTB)?',
        searchTerms: ['specified service', 'trade or business', '199A', 'health'],
        correctCitation: 'IRC Section 199A(d)(2)',
        acceptableAnswers: ['199A(d)(2)', 'IRC 199A(d)(2)', 'Section 199A(d)(2)', '199A(d)(2)(A)'],
        explanation: 'IRC Section 199A(d)(2) defines SSTB as any trade or business involving the performance of services in health, law, accounting, actuarial science, performing arts, consulting, athletics, financial services, brokerage services, or any trade where the principal asset is the reputation or skill of employees.',
      },
      {
        id: 'req-2',
        type: 'research',
        question: 'What are the taxable income thresholds where SSTB limitations begin for married filing jointly?',
        searchTerms: ['threshold', '199A', 'married', 'phase-out', 'taxable income'],
        correctCitation: 'IRC Section 199A(d)(3)',
        acceptableAnswers: ['199A(d)(3)', 'IRC 199A(d)(3)', 'Treas. Reg. 1.199A-5'],
        explanation: 'IRC Section 199A(d)(3) establishes the threshold amounts. For MFJ, the threshold is $364,200 (2024, indexed for inflation) with a $100,000 phase-out range. For single filers, $182,100 with $50,000 phase-out.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Based on the facts, what is the maximum Section 199A deduction Dr. Chen can claim if the SSTB completely disqualifies her? (Note: Taxable income of $450,000 exceeds the threshold plus phase-out range)',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'Since Dr. Chen\'s taxable income ($450,000) exceeds the single filer threshold ($182,100) plus phase-out range ($50,000) = $232,100, and she operates an SSTB (health services), her QBI deduction is completely phased out to $0.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which of the following activities is NOT classified as an SSTB under Section 199A?',
        options: [
          'Law firm',
          'Accounting practice',
          'Architecture firm',
          'Medical practice',
        ],
        correctAnswer: 2,
        explanation: 'Architecture and engineering are specifically EXCLUDED from the definition of SSTB under IRC 199A(d)(2)(B), making them eligible for the QBI deduction regardless of income.',
      },
    ],
    hints: [
      '🔍 TAX RESEARCH STRATEGY:',
      '• IRC Section 199A is the primary source for QBI deduction',
      '• Look in subsection (d) for SSTB definitions',
      '• Treasury Regulations (1.199A-5) provide additional guidance',
      '',
      '📖 KEY TERMS TO SEARCH:',
      '• "specified service trade or business"',
      '• "threshold amount"',
      '• "health, law, accounting"',
    ],
    references: ['IRC 199A(d)(2)', 'IRC 199A(d)(3)', 'Treas. Reg. 1.199A-5'],
  },
  {
    id: 'aud-tbs-011',
    section: 'AUD',
    type: TBS_TYPES.RESEARCH,
    title: 'Research: Subsequent Events Procedures',
    difficulty: 'medium',
    timeEstimate: 12,
    topic: 'Subsequent Events - AU-C 560',
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-V-B-1',
    scenario: `
You are the senior auditor on the engagement for Precision Manufacturing Inc. The audit report date is February 15, Year 2, covering the year ended December 31, Year 1.

On February 20, Year 2 (after the report date but before the financial statements were issued), you learned that the company's largest customer filed for bankruptcy. This customer represented 35% of accounts receivable at year-end.

The engagement partner asks you to research the authoritative auditing standards to determine:
1. What type of subsequent event this represents
2. What the auditor's responsibilities are for events occurring after the report date

Using the AICPA Professional Standards (AU-C sections), locate the relevant guidance.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'research',
        question: 'Which AU-C section addresses the auditor\'s responsibilities for subsequent events?',
        searchTerms: ['subsequent events', 'report date', 'events after'],
        correctCitation: 'AU-C Section 560',
        acceptableAnswers: ['AU-C 560', 'AU-C Section 560', 'AU-C 560.01'],
        explanation: 'AU-C Section 560, "Subsequent Events and Subsequently Discovered Facts," addresses the auditor\'s responsibilities relating to subsequent events in an audit of financial statements.',
      },
      {
        id: 'req-2',
        type: 'research',
        question: 'Which paragraph defines the period between the financial statement date and the date of the auditor\'s report?',
        searchTerms: ['subsequent events period', 'financial statement date', 'report date'],
        correctCitation: 'AU-C Section 560.06',
        acceptableAnswers: ['AU-C 560.06', 'AU-C Section 560.06', '560.06'],
        explanation: 'AU-C 560.06 defines "subsequent events" as events occurring between the date of the financial statements and the date of the auditor\'s report.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What type of subsequent event does the customer bankruptcy represent?',
        options: [
          'Type I - Recognized subsequent event (requires adjustment)',
          'Type II - Nonrecognized subsequent event (requires disclosure only)',
          'Subsequently discovered fact',
          'Not a subsequent event - outside the relevant period',
        ],
        correctAnswer: 2,
        explanation: 'Since the event occurred AFTER the report date (Feb 15) but before issuance, this is a "subsequently discovered fact" per AU-C 560.14, not a subsequent event. The bankruptcy provides NEW information about conditions that did not exist at the balance sheet date.',
      },
      {
        id: 'req-4',
        type: 'research',
        question: 'Which paragraph describes the auditor\'s responsibility when facts become known after the report date but before issuance?',
        searchTerms: ['after the date of the auditor\'s report', 'before issuance', 'subsequently discovered'],
        correctCitation: 'AU-C Section 560.14',
        acceptableAnswers: ['AU-C 560.14', 'AU-C Section 560.14', '560.14-.17'],
        explanation: 'AU-C 560.14 requires the auditor to discuss the matter with management and determine whether the financial statements need revision when facts become known after the report date but before issuance.',
      },
    ],
    hints: [
      '🔍 AUDIT RESEARCH STRATEGY:',
      '• AU-C 560 covers subsequent events',
      '• Key distinction: BEFORE vs. AFTER report date',
      '• Type I = Conditions existed at B/S date (adjust)',
      '• Type II = Conditions arose after B/S date (disclose)',
      '',
      '📖 SEARCH TIPS:',
      '• Use "subsequent event" as primary search term',
      '• Look for "date of the auditor\'s report"',
      '• Check paragraph .14 for post-report date events',
    ],
    references: ['AU-C 560.06', 'AU-C 560.10', 'AU-C 560.14'],
  },
];

// ==========================================
// WRITTEN COMMUNICATION TBS
// ==========================================
export const WRITTEN_COMM_TBS: TBS[] = [
  {
    id: 'aud-tbs-013',
    section: 'AUD',
    type: TBS_TYPES.WRITTEN_COMMUNICATION,
    title: 'Written Communication: Internal Control Deficiency Memo',
    difficulty: 'medium',
    timeEstimate: 20,
    topic: 'Communication with Those Charged with Governance',
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-VI-A-2',
    scenario: `
You are the senior auditor for GlobalTech Industries, a publicly traded company. During your audit of the year ended December 31, Year 1, you identified the following internal control deficiency:

DEFICIENCY IDENTIFIED:
The accounts payable department has only two employees. One employee handles vendor setup, invoice processing, AND check preparation. The second employee only reviews checks over $10,000. There is no segregation of duties for transactions under $10,000, which represent 85% of all transactions by volume.

During testing, you identified three instances where fictitious vendors were created and paid, totaling $47,000. The fraud was committed by the accounts payable employee who was subsequently terminated.

ADDITIONAL INFORMATION:
• Company materiality: $500,000
• Total accounts payable transactions: 15,000 per year
• Average transaction: $3,200
• This is the first year you have audited this client

Your manager has asked you to draft a written communication to those charged with governance regarding this matter.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'written_response',
        question: 'Draft a professional memo to the Audit Committee communicating this deficiency. Your response should include: (1) description of the deficiency, (2) classification as significant deficiency or material weakness, (3) potential consequences, and (4) recommendations.',
        rubric: {
          criteria: [
            {
              name: 'Professional Format',
              maxPoints: 5,
              description: 'Proper memo format with To, From, Date, Subject; professional tone',
            },
            {
              name: 'Deficiency Description',
              maxPoints: 10,
              description: 'Clear description of the lack of segregation of duties and the transactions affected',
            },
            {
              name: 'Classification Justification',
              maxPoints: 15,
              description: 'Correctly identifies as material weakness because fraud actually occurred; explains the severity',
            },
            {
              name: 'Consequences Explained',
              maxPoints: 10,
              description: 'Discusses risk of undetected fraud, financial statement misstatement, reputational harm',
            },
            {
              name: 'Recommendations',
              maxPoints: 10,
              description: 'Provides actionable recommendations: segregate duties, independent review, vendor master file controls',
            },
          ],
          totalPoints: 50,
          passingScore: 35,
        },
        sampleResponse: `TO: Audit Committee, GlobalTech Industries
FROM: [Auditor Name], CPA
DATE: February 15, Year 2
RE: Communication of Material Weakness in Internal Control

We have audited the financial statements of GlobalTech Industries for the year ended December 31, Year 1. In accordance with AU-C Section 265, we are required to communicate in writing any significant deficiencies or material weaknesses identified during our audit.

MATERIAL WEAKNESS IDENTIFIED:

Description:
During our audit, we identified a material weakness in internal control over the accounts payable function. The company employs only two individuals in accounts payable, with one employee responsible for vendor setup, invoice processing, and check preparation for all transactions under $10,000. This lack of segregation of duties affects 85% of all transactions by volume.

Classification:
We have classified this as a material weakness rather than a significant deficiency because the control deficiency resulted in actual fraud. Our testing identified three instances of fictitious vendor payments totaling $47,000. A material weakness exists when there is a reasonable possibility that a material misstatement will not be prevented or detected on a timely basis.

Consequences:
This deficiency resulted in:
• Direct financial loss of $47,000
• Potential for additional undetected fraud
• Risk of material misstatement in accounts payable and cash
• Reputational harm and employee trust concerns

Recommendations:
We recommend the following corrective actions:
1. Segregate vendor master file maintenance from payment processing
2. Implement independent review for ALL disbursements, regardless of amount
3. Require dual approval for new vendor additions
4. Conduct periodic vendor master file reviews to identify duplicate or suspicious vendors
5. Consider implementing positive pay or other banking controls

This communication is intended solely for the information and use of management and those charged with governance and is not intended to be used by anyone other than these specified parties.`,
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Under AU-C 265, when must significant deficiencies and material weaknesses be communicated in writing?',
        options: [
          'Within 30 days of detection',
          'Within 60 days of the report date',
          'By the report release date or no later than 60 days after report release',
          'Immediately upon detection',
        ],
        correctAnswer: 2,
        explanation: 'AU-C 265.13 requires that significant deficiencies and material weaknesses be communicated in writing to those charged with governance on a timely basis, no later than 60 days following the report release date.',
      },
    ],
    hints: [
      '✍️ WRITTEN COMMUNICATION TIPS:',
      '• Use professional memo format (To, From, Date, Subject)',
      '• Be clear and concise - avoid jargon',
      '• Support classification with specific facts',
      '• Include actionable recommendations',
      '',
      '📋 KEY ELEMENTS:',
      '• Material weakness vs. significant deficiency',
      '• MW = reasonable possibility of material misstatement not prevented/detected',
      '• Actual fraud occurrence typically = MW',
    ],
    references: ['AU-C 265', 'AU-C 260', 'PCAOB AS 1305'],
  },
  {
    id: 'reg-tbs-009',
    section: 'REG',
    type: TBS_TYPES.WRITTEN_COMMUNICATION,
    title: 'Written Communication: Tax Position Memo',
    difficulty: 'medium',
    timeEstimate: 18,
    topic: 'Tax Research and Communication',
    blueprintArea: 'REG-V',
    blueprintTopic: 'REG-V-A-1',
    scenario: `
Your client, Evergreen Manufacturing LLC, is considering classifying several workers as independent contractors rather than employees. The CFO has asked for your professional opinion on the tax implications and risks.

FACTS:
• 12 workers perform assembly line work at the company's facility
• Workers use company-provided equipment and tools
• Company sets their schedules (8 AM - 5 PM, Monday-Friday)
• Workers are paid hourly ($28/hour) with no benefits
• Workers have been classified as contractors for 3 years
• Total payments to these workers: $1,200,000 annually
• Company currently issues 1099-NEC forms

The CFO states: "We've always done it this way and never had a problem. Can you give us something in writing about whether we should be concerned?"
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'written_response',
        question: 'Draft a professional memo to the CFO addressing the worker classification issue. Include: (1) analysis of the worker classification factors, (2) your conclusion on proper classification, (3) potential tax consequences of misclassification, and (4) recommendations.',
        rubric: {
          criteria: [
            {
              name: 'Professional Format',
              maxPoints: 5,
              description: 'Proper memo format; professional, objective tone',
            },
            {
              name: 'Factor Analysis',
              maxPoints: 15,
              description: 'Discusses behavioral control, financial control, and relationship type factors per IRS guidance',
            },
            {
              name: 'Correct Conclusion',
              maxPoints: 10,
              description: 'Concludes workers are likely employees based on facts; explains reasoning',
            },
            {
              name: 'Tax Consequences',
              maxPoints: 10,
              description: 'Discusses back employment taxes, penalties, interest, potential fraud penalties',
            },
            {
              name: 'Recommendations',
              maxPoints: 10,
              description: 'Provides clear path forward: reclassify, voluntary classification settlement program, or Section 530 relief',
            },
          ],
          totalPoints: 50,
          passingScore: 35,
        },
        sampleResponse: `TO: CFO, Evergreen Manufacturing LLC
FROM: [Tax Advisor Name], CPA
DATE: [Current Date]
RE: Worker Classification Analysis - Independent Contractor vs. Employee

EXECUTIVE SUMMARY:
Based on our analysis of the relevant facts and IRS guidance, the 12 workers currently classified as independent contractors likely meet the criteria for employee status under federal tax law. We recommend immediate action to mitigate potential tax liabilities and penalties.

ANALYSIS OF CLASSIFICATION FACTORS:

The IRS uses a three-factor test to determine worker classification:

1. Behavioral Control (Strongly suggests EMPLOYEE):
   • Workers perform duties at company facility
   • Company sets specific work hours (8 AM - 5 PM)
   • Work is assembly line, implying company controls methods

2. Financial Control (Strongly suggests EMPLOYEE):
   • Company provides all equipment and tools
   • Workers paid hourly (not by project)
   • No opportunity for profit/loss typically associated with contractors

3. Relationship Type (Suggests EMPLOYEE):
   • Work is ongoing (3+ years)
   • Workers perform core business function (assembly)
   • No written contractor agreement mentioned

CONCLUSION:
Based on the preponderance of factors, these workers should be classified as EMPLOYEES for federal tax purposes.

POTENTIAL TAX CONSEQUENCES OF MISCLASSIFICATION:

If the IRS reclassifies these workers, Evergreen may be liable for:
• Unpaid FICA taxes: ~$91,800/year ($1.2M × 7.65%)
• Federal income tax withholding (estimated): $168,000/year
• Penalties: Up to 100% of taxes due (3% + 20% + 40% + trust fund recovery)
• Interest: Currently ~8% on unpaid amounts
• Three-year exposure: Potentially $600,000+

RECOMMENDATIONS:

1. IMMEDIATE: Consult with employment tax counsel
2. Consider IRS Voluntary Classification Settlement Program (VCSP)
   - Pay 10% of one year's employment tax liability
   - Avoid penalties and interest
   - Prospective reclassification only
3. If VCSP not viable, evaluate Section 530 safe harbor relief
4. Reclassify workers as employees going forward
5. Retain documentation of good faith reliance

This memorandum is based on facts presented and current law. Tax positions should be evaluated periodically as facts or law change.`,
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What is the employer\'s share of FICA taxes that would be owed if these workers are reclassified as employees?',
        options: [
          '6.2% (Social Security only)',
          '7.65% (Social Security + Medicare)',
          '15.3% (Both employer and employee share)',
          '1.45% (Medicare only)',
        ],
        correctAnswer: 1,
        explanation: 'The employer\'s share of FICA is 7.65% (6.2% Social Security + 1.45% Medicare). If workers are reclassified, the employer owes this amount on all compensation paid.',
      },
    ],
    hints: [
      '✍️ TAX MEMO WRITING TIPS:',
      '• State conclusion early (executive summary)',
      '• Apply facts to law systematically',
      '• Quantify potential exposure',
      '• Provide actionable recommendations',
      '',
      '📋 WORKER CLASSIFICATION:',
      '• Behavioral Control = Who controls HOW work is done',
      '• Financial Control = Business aspects (expenses, profit opportunity)',
      '• Relationship Type = Benefits, permanence, key activity',
    ],
    references: ['IRC Section 3121', 'Rev. Rul. 87-41', 'IRS Publication 15-A'],
  },
];

// ==========================================
// EASY DIFFICULTY TBS - Entry Level
// ==========================================
export const EASY_TBS: TBS[] = [
  {
    id: 'far-tbs-011',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Basic Adjusting Entries',
    difficulty: 'easy',
    timeEstimate: 8,
    topic: 'Adjusting Entries',
    blueprintArea: 'FAR-I',
    blueprintTopic: 'FAR-I-A-1',
    scenario: `
You are preparing year-end adjusting entries for SimpleStart Company (December 31, Year 1).

SITUATION A: On September 1, Year 1, the company paid $12,000 for a one-year insurance policy. The entire amount was recorded as Prepaid Insurance.

SITUATION B: The company has a $100,000 note payable with 6% annual interest. Interest is paid annually on March 1. No interest has been recorded since the last payment.

SITUATION C: On December 15, Year 1, the company received $6,000 for services to be performed in January Year 2. The full amount was recorded as Service Revenue.

SITUATION D: Employees earned $8,500 in wages during the last week of December that will be paid on January 5, Year 2.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'For Situation A, what is the insurance expense for Year 1?',
        correctAnswer: 4000,
        tolerance: 0,
        explanation: '$12,000 × (4 months ÷ 12 months) = $4,000. September through December = 4 months of coverage used.',
      },
      {
        id: 'req-2',
        type: 'journal_entry',
        question: 'Prepare the adjusting entry for Situation A.',
        correctEntries: [
          { account: 'Insurance Expense', debit: 4000, credit: null },
          { account: 'Prepaid Insurance', debit: null, credit: 4000 },
        ],
        tolerance: 0,
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'For Situation B, what is the accrued interest at December 31?',
        correctAnswer: 5000,
        tolerance: 0,
        explanation: '$100,000 × 6% × (10 months ÷ 12 months) = $5,000. Interest accrues from March 1 through December 31.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'For Situation C, what adjusting entry is needed?',
        options: [
          'Debit Service Revenue $6,000; Credit Unearned Revenue $6,000',
          'Debit Unearned Revenue $6,000; Credit Service Revenue $6,000',
          'No entry needed - revenue was earned',
          'Debit Cash $6,000; Credit Service Revenue $6,000',
        ],
        correctAnswer: 0,
        explanation: 'Revenue was recorded but not earned. It must be deferred until January when services are performed.',
      },
      {
        id: 'req-5',
        type: 'journal_entry',
        question: 'Prepare the adjusting entry for Situation D (accrued wages).',
        correctEntries: [
          { account: 'Wages Expense', debit: 8500, credit: null },
          { account: 'Wages Payable', debit: null, credit: 8500 },
        ],
        tolerance: 0,
      },
    ],
    hints: [
      'Prepaid items: Expense the portion that has been used',
      'Accrued interest = Principal × Rate × Time',
      'Unearned revenue: Defer revenue not yet earned',
      'Accrued expenses: Record expenses incurred but not yet paid',
    ],
    references: ['ASC 250-10'],
  },
  {
    id: 'far-tbs-012',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Depreciation Methods Comparison',
    difficulty: 'easy',
    timeEstimate: 10,
    topic: 'Depreciation',
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    scenario: `
QuickGrow Company purchased equipment on January 1, Year 1:
• Cost: $50,000
• Salvage value: $5,000
• Useful life: 5 years
• Estimated total units of production: 90,000 units
• Actual units produced Year 1: 22,000 units

Calculate depreciation expense for Year 1 under each method.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Year 1 depreciation using the straight-line method.',
        correctAnswer: 9000,
        tolerance: 0,
        explanation: '($50,000 - $5,000) ÷ 5 years = $9,000 per year',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Year 1 depreciation using double-declining balance.',
        correctAnswer: 20000,
        tolerance: 0,
        explanation: '$50,000 × (2 ÷ 5) = $50,000 × 40% = $20,000. Note: Salvage not used in DDB calculation.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Year 1 depreciation using units of production.',
        correctAnswer: 11000,
        tolerance: 0,
        explanation: '($50,000 - $5,000) ÷ 90,000 units × 22,000 units = $0.50 × 22,000 = $11,000',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which method results in the HIGHEST net income for Year 1?',
        options: [
          'Straight-line ($9,000 depreciation)',
          'Double-declining balance ($20,000 depreciation)',
          'Units of production ($11,000 depreciation)',
          'All methods result in the same net income',
        ],
        correctAnswer: 0,
        explanation: 'Lower depreciation = higher net income. Straight-line has the lowest Year 1 depreciation.',
      },
    ],
    hints: [
      'Straight-line: (Cost - Salvage) ÷ Life',
      'DDB: Book Value × (2 ÷ Life) - ignore salvage until the end',
      'Units: (Cost - Salvage) ÷ Total Units × Units This Period',
    ],
    references: ['ASC 360-10-35'],
  },
  {
    id: 'reg-tbs-015',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Individual Tax Deductions - Standard vs. Itemized',
    difficulty: 'easy',
    timeEstimate: 10,
    topic: 'Individual Taxation',
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    scenario: `
John and Mary Smith (married filing jointly) have the following information for Year 1:

Income:
• John's W-2 wages: $95,000
• Mary's W-2 wages: $65,000
• Interest income: $2,000

Potential Itemized Deductions:
• State and local taxes (SALT): $18,000 (note: limited to $10,000)
• Home mortgage interest: $12,000
• Charitable contributions: $3,500
• Medical expenses: $6,500 (AGI threshold is 7.5%)

The standard deduction for MFJ in Year 1 is $27,700.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the Smiths\' Adjusted Gross Income (AGI).',
        correctAnswer: 162000,
        tolerance: 0,
        explanation: '$95,000 + $65,000 + $2,000 = $162,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the allowable SALT deduction.',
        correctAnswer: 10000,
        tolerance: 0,
        explanation: 'SALT is limited to $10,000 even though they paid $18,000.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the deductible medical expenses (if any).',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'AGI threshold = $162,000 × 7.5% = $12,150. Medical expenses of $6,500 do not exceed this floor.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate total itemized deductions.',
        correctAnswer: 25500,
        tolerance: 0,
        explanation: 'SALT ($10,000) + Mortgage Interest ($12,000) + Charitable ($3,500) + Medical ($0) = $25,500',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Should the Smiths itemize or take the standard deduction?',
        options: [
          'Itemize - $25,500 exceeds the standard deduction',
          'Standard deduction - $27,700 exceeds itemized deductions',
          'Either option results in the same taxable income',
          'They must itemize because they own a home',
        ],
        correctAnswer: 1,
        explanation: 'Standard deduction ($27,700) > Itemized deductions ($25,500). They should take the standard deduction.',
      },
    ],
    hints: [
      'SALT deduction is capped at $10,000 (MFJ)',
      'Medical expenses must exceed 7.5% of AGI to be deductible',
      'Choose whichever is greater: standard or itemized',
    ],
    references: ['IRC Section 63', 'IRC Section 164', 'IRC Section 213'],
  },
  {
    id: 'aud-tbs-014',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Basic Audit Procedures Matching',
    difficulty: 'easy',
    timeEstimate: 8,
    topic: 'Audit Procedures',
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-B-1',
    scenario: `
Match each audit procedure with the primary assertion it tests and the account it would be applied to.

AUDIT PROCEDURES:
A. Send confirmation letters to customers
B. Observe the client counting inventory
C. Trace recorded sales to shipping documents
D. Vouch recorded purchases to vendor invoices
E. Perform cutoff testing near year-end
F. Review subsequent cash receipts
G. Inspect fixed asset additions
H. Recalculate depreciation expense
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'classification',
        question: 'Match each procedure to its PRIMARY assertion:',
        items: ['Confirmation to customers', 'Inventory observation', 'Trace sales to shipping docs', 'Subsequent cash receipts test'],
        options: ['Existence', 'Completeness', 'Valuation', 'Cutoff'],
        correctAnswers: [
          { item: 'Confirmation to customers', answer: 'Existence' },
          { item: 'Inventory observation', answer: 'Existence' },
          { item: 'Trace sales to shipping docs', answer: 'Existence' },
          { item: 'Subsequent cash receipts test', answer: 'Valuation' },
        ],
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Which procedure BEST tests completeness of accounts payable?',
        options: [
          'Confirm balances with vendors',
          'Vouch recorded payables to invoices',
          'Search for unrecorded liabilities (review subsequent disbursements)',
          'Recalculate the payables balance',
        ],
        correctAnswer: 2,
        explanation: 'Completeness is tested by looking for items that SHOULD be recorded but might be missing. Searching subsequent disbursements finds payables that existed at year-end but were not recorded.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Vouching from the general ledger to source documents primarily tests:',
        options: [
          'Completeness - finding unrecorded transactions',
          'Existence - verifying recorded transactions occurred',
          'Presentation - proper disclosure',
          'Rights and obligations',
        ],
        correctAnswer: 1,
        explanation: 'Vouching goes FROM the records TO supporting evidence, testing whether recorded items actually exist.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Tracing from source documents to the general ledger primarily tests:',
        options: [
          'Existence - verifying recorded transactions occurred',
          'Completeness - finding unrecorded transactions',
          'Accuracy - mathematical correctness',
          'Valuation - proper amounts',
        ],
        correctAnswer: 1,
        explanation: 'Tracing goes FROM source documents TO the records, testing whether transactions that occurred were actually recorded (completeness).',
      },
    ],
    hints: [
      'Vouching: Records → Source docs = Tests Existence',
      'Tracing: Source docs → Records = Tests Completeness',
      'Confirmations test Existence (the customer confirms they owe the money)',
      'Cutoff testing ensures transactions are in the correct period',
    ],
    references: ['AU-C 500', 'AU-C 505', 'AU-C 501'],
  },
  {
    id: 'aud-tbs-015',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Understanding the Audit Report',
    difficulty: 'easy',
    timeEstimate: 8,
    topic: 'Audit Reports',
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-V-A-1',
    scenario: `
Review the following excerpts from audit reports and identify the type of opinion and any modifications:

REPORT A:
"In our opinion, the financial statements referred to above present fairly, in all material respects, the financial position of ABC Company..."

REPORT B:
"In our opinion, except for the effects of not recording depreciation as discussed in the Basis for Qualified Opinion paragraph, the financial statements present fairly..."

REPORT C:
"Because of the significance of the matter described in the Basis for Disclaimer of Opinion paragraph, we were unable to obtain sufficient appropriate audit evidence..."

REPORT D:
"In our opinion, because of the significance of the matter discussed in the Basis for Adverse Opinion paragraph, the financial statements do not present fairly..."
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'classification',
        question: 'Classify each report excerpt:',
        items: ['Report A', 'Report B', 'Report C', 'Report D'],
        options: ['Unmodified Opinion', 'Qualified Opinion', 'Adverse Opinion', 'Disclaimer of Opinion'],
        correctAnswers: [
          { item: 'Report A', answer: 'Unmodified Opinion' },
          { item: 'Report B', answer: 'Qualified Opinion' },
          { item: 'Report C', answer: 'Disclaimer of Opinion' },
          { item: 'Report D', answer: 'Adverse Opinion' },
        ],
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Report B (Qualified Opinion) uses what key phrase?',
        options: [
          '"present fairly in all material respects"',
          '"except for the effects of"',
          '"do not present fairly"',
          '"we were unable to obtain"',
        ],
        correctAnswer: 1,
        explanation: 'A qualified opinion uses "except for" language - meaning the statements are fairly presented EXCEPT for a specific matter.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What caused Report C (Disclaimer)?',
        options: [
          'A material departure from GAAP',
          'A scope limitation preventing sufficient evidence',
          'A going concern issue',
          'Related party transactions',
        ],
        correctAnswer: 1,
        explanation: '"Unable to obtain sufficient appropriate audit evidence" indicates a scope limitation so severe the auditor cannot express an opinion.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which opinion is MOST severe (indicates the worst problem)?',
        options: [
          'Qualified Opinion',
          'Adverse Opinion',
          'Disclaimer of Opinion',
          'All modified opinions are equally severe',
        ],
        correctAnswer: 1,
        explanation: 'Adverse opinion states the financial statements DO NOT present fairly - this is the most severe opinion indicating material and pervasive misstatement.',
      },
    ],
    hints: [
      'Unmodified = "presents fairly" (clean opinion)',
      'Qualified = "except for" (one specific issue)',
      'Adverse = "do not present fairly" (statements are wrong)',
      'Disclaimer = "unable to" (no opinion at all)',
    ],
    references: ['AU-C 700', 'AU-C 705', 'AU-C 706'],
  },
  {
    id: 'isc-tbs-011',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'IT General Controls Basics',
    difficulty: 'easy',
    timeEstimate: 10,
    topic: 'IT Controls',
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-A-1',
    scenario: `
You are reviewing IT General Controls (ITGCs) for a client. Classify each control into the appropriate ITGC category.

CONTROLS TO CLASSIFY:
A. Passwords must be at least 8 characters with complexity requirements
B. All program changes must be approved before moving to production
C. Daily backup of all data to an offsite location
D. Segregation of duties between developers and those who deploy code
E. Firewall rules reviewed and updated quarterly
F. Terminated employees have access removed within 24 hours
G. Disaster recovery plan tested annually
H. New users require manager approval before access is granted
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'classification',
        question: 'Classify each control into an ITGC category:',
        items: ['Password complexity', 'Program change approval', 'Daily backups', 'Developer segregation of duties'],
        options: ['Access Controls', 'Change Management', 'Computer Operations', 'Program Development'],
        correctAnswers: [
          { item: 'Password complexity', answer: 'Access Controls' },
          { item: 'Program change approval', answer: 'Change Management' },
          { item: 'Daily backups', answer: 'Computer Operations' },
          { item: 'Developer segregation of duties', answer: 'Change Management' },
        ],
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Controls F and H (user provisioning and deprovisioning) belong to which category?',
        options: [
          'Access Controls',
          'Change Management',
          'Computer Operations',
          'Physical Security',
        ],
        correctAnswer: 0,
        explanation: 'User provisioning (adding) and deprovisioning (removing) are Access Controls - they determine WHO can access systems.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Control G (disaster recovery testing) is important because:',
        options: [
          'It prevents unauthorized access',
          'It ensures changes are properly approved',
          'It validates the organization can recover from disruptions',
          'It encrypts sensitive data',
        ],
        correctAnswer: 2,
        explanation: 'Disaster recovery testing (part of Computer Operations/Business Continuity) validates the organization can recover systems and data after a disruption.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'If ITGCs are weak, what impact does this have on the audit?',
        options: [
          'No impact - ITGCs are optional',
          'The auditor cannot rely on automated application controls',
          'Only affects the IT audit, not financial statement audit',
          'The audit must be delayed until controls are fixed',
        ],
        correctAnswer: 1,
        explanation: 'Weak ITGCs mean the auditor cannot trust that automated controls (like system calculations) are working properly, requiring more substantive testing.',
      },
    ],
    hints: [
      'Access Controls: WHO can access (passwords, user provisioning)',
      'Change Management: HOW changes are controlled (approvals, testing)',
      'Computer Operations: Daily operations (backups, job scheduling, DR)',
      'Program Development: Building new systems (SDLC)',
    ],
    references: ['COSO Framework', 'COBIT', 'AU-C 315'],
  },
  {
    id: 'tcp-tbs-011',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Basic Corporate Tax Calculation',
    difficulty: 'easy',
    timeEstimate: 10,
    topic: 'Corporate Taxation',
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-A-1',
    scenario: `
SimpleCorp Inc. is a C corporation with the following Year 1 information:

Income:
• Gross receipts from sales: $2,000,000
• Cost of goods sold: $1,200,000
• Interest income from corporate bonds: $15,000
• Dividend income from 25%-owned domestic corporation: $40,000

Deductions:
• Officer salaries: $250,000
• Other salaries: $180,000
• Rent expense: $60,000
• Depreciation: $45,000
• Interest expense: $12,000
• Charitable contributions: $35,000 (made in cash)

The corporate tax rate is 21%.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate gross profit.',
        correctAnswer: 800000,
        tolerance: 0,
        explanation: 'Gross receipts ($2,000,000) - COGS ($1,200,000) = $800,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total income before deductions.',
        correctAnswer: 855000,
        tolerance: 0,
        explanation: 'Gross profit ($800,000) + Interest ($15,000) + Dividends ($40,000) = $855,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the dividends received deduction (DRD). Hint: 25%-owned = 65% DRD.',
        correctAnswer: 26000,
        tolerance: 0,
        explanation: '$40,000 × 65% = $26,000. Corporations owning 20%-50% receive a 65% DRD.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate total deductions (include DRD but before charitable limitation check).',
        correctAnswer: 608000,
        tolerance: 0,
        explanation: 'Salaries ($430,000) + Rent ($60,000) + Depreciation ($45,000) + Interest ($12,000) + Charitable ($35,000) + DRD ($26,000) = $608,000',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate taxable income.',
        correctAnswer: 247000,
        tolerance: 0,
        explanation: 'Total income ($855,000) - Total deductions ($608,000) = $247,000',
      },
    ],
    hints: [
      'DRD: <20% ownership = 50%, 20-80% ownership = 65%, >80% ownership = 100%',
      'Charitable contribution limit for corps = 10% of taxable income (before DRD and charitable)',
      'Corporate tax rate is flat 21%',
    ],
    references: ['IRC Section 243', 'IRC Section 170', 'IRC Section 11'],
  },
  {
    id: 'bar-tbs-011',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Basic Variance Analysis',
    difficulty: 'easy',
    timeEstimate: 10,
    topic: 'Cost Accounting',
    blueprintArea: 'BAR-I',
    blueprintTopic: 'BAR-I-B-1',
    scenario: `
QuickMake Company produces widgets and uses standard costing. The standards for one widget are:

Direct Materials: 2 pounds at $5 per pound = $10
Direct Labor: 0.5 hours at $20 per hour = $10

Actual results for October (produced 1,000 widgets):

Direct Materials:
• Purchased and used: 2,100 pounds
• Actual cost: $9,975 ($4.75 per pound)

Direct Labor:
• Actual hours: 520 hours
• Actual cost: $10,920 ($21 per hour)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the materials price variance.',
        correctAnswer: -525,
        tolerance: 0,
        explanation: '(Actual Price - Standard Price) × Actual Qty = ($4.75 - $5.00) × 2,100 = -$525 (Favorable)',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the materials quantity variance.',
        correctAnswer: 500,
        tolerance: 0,
        explanation: '(Actual Qty - Standard Qty) × Standard Price = (2,100 - 2,000) × $5 = $500 (Unfavorable)',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the labor rate variance.',
        correctAnswer: 520,
        tolerance: 0,
        explanation: '(Actual Rate - Standard Rate) × Actual Hours = ($21 - $20) × 520 = $520 (Unfavorable)',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the labor efficiency variance.',
        correctAnswer: 400,
        tolerance: 0,
        explanation: '(Actual Hours - Standard Hours) × Standard Rate = (520 - 500) × $20 = $400 (Unfavorable)',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'The favorable materials price variance could indicate:',
        options: [
          'Workers were more efficient',
          'Lower quality materials were purchased',
          'More materials were used than expected',
          'The standard was set too high',
        ],
        correctAnswer: 1,
        explanation: 'A favorable price variance means the company paid less than expected. This could mean good purchasing, but also might indicate lower quality materials.',
      },
    ],
    hints: [
      'Price/Rate variance: Isolate the PRICE by using Actual Quantity',
      'Quantity/Efficiency variance: Isolate the QUANTITY by using Standard Price',
      'Favorable (F) = Less than standard = GOOD for costs',
      'Unfavorable (U) = More than standard = BAD for costs',
    ],
    references: ['Standard Cost Accounting', 'Variance Analysis'],
  },
];

// ==========================================
// FAR NFP/GOVERNMENT TBS
// ==========================================
export const FAR_NFP_GOVT_TBS: TBS[] = [
  {
    id: 'far-tbs-013',
    section: 'FAR',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Government Fund Accounting Basics',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Governmental Accounting',
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-A-1',
    scenario: `
City of Riverside has the following transactions during the fiscal year. Classify each transaction to the appropriate fund type.

TRANSACTIONS:
A. Received $5,000,000 in property tax revenue for general operations
B. Issued $10,000,000 in bonds to build a new city hall
C. Collected $800,000 in water and sewer fees from residents
D. Received $1,200,000 restricted grant for road improvements
E. Made principal and interest payments on outstanding general obligation bonds
F. Received pension contributions from employees to be invested
G. Paid salaries to police officers and firefighters
H. Collected parking meter fees designated for downtown improvements
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'classification',
        question: 'Classify each transaction to the appropriate fund:',
        items: ['Property tax revenue', 'Bond issuance for city hall', 'Water/sewer fees', 'Grant for roads'],
        options: ['General Fund', 'Capital Projects Fund', 'Enterprise Fund', 'Special Revenue Fund'],
        correctAnswers: [
          { item: 'Property tax revenue', answer: 'General Fund' },
          { item: 'Bond issuance for city hall', answer: 'Capital Projects Fund' },
          { item: 'Water/sewer fees', answer: 'Enterprise Fund' },
          { item: 'Grant for roads', answer: 'Special Revenue Fund' },
        ],
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Transaction E (debt service payments) would be recorded in which fund?',
        options: [
          'General Fund',
          'Debt Service Fund',
          'Capital Projects Fund',
          'Enterprise Fund',
        ],
        correctAnswer: 1,
        explanation: 'The Debt Service Fund accounts for financial resources used for principal and interest payments on general long-term debt.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Transaction F (pension contributions) would be recorded in which fund type?',
        options: [
          'Governmental Fund',
          'Proprietary Fund',
          'Fiduciary Fund (Pension Trust)',
          'Special Revenue Fund',
        ],
        correctAnswer: 2,
        explanation: 'Pension plans are recorded in Fiduciary Funds (Pension Trust Funds) because the government holds these assets in a trustee capacity for employees.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which characteristic distinguishes Enterprise Funds from other governmental funds?',
        options: [
          'They use modified accrual accounting',
          'They charge fees for services like a business',
          'They can only be used for capital projects',
          'They require a balanced budget',
        ],
        correctAnswer: 1,
        explanation: 'Enterprise Funds account for activities that charge fees similar to private businesses (utilities, airports, parking). They use full accrual accounting.',
      },
    ],
    hints: [
      'General Fund: General operations funded by taxes',
      'Special Revenue Fund: Revenue legally restricted for specific purposes',
      'Capital Projects Fund: Major construction projects',
      'Enterprise Fund: Business-type activities that charge fees',
      'Fiduciary Funds: Assets held in trust for others (pensions)',
    ],
    references: ['GASB Statement 34', 'GASB Statement 54'],
  },
  {
    id: 'far-tbs-014',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Not-for-Profit Revenue Recognition',
    difficulty: 'medium',
    timeEstimate: 12,
    topic: 'Not-for-Profit Accounting',
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-B-1',
    scenario: `
Helping Hands, a not-for-profit organization, has the following transactions:

A. Received an unconditional pledge of $100,000 to be paid over 5 years ($20,000 per year). The appropriate discount rate is 5%.

B. Received a $50,000 donation with donor stipulation that it be used for the new building campaign (a board-designated fund also exists for this purpose).

C. Received a $25,000 grant that requires the organization to provide tutoring services to 500 students. As of year-end, 300 students have been tutored.

D. Received donated legal services valued at $15,000. The attorney would have been paid for these services if not donated.

E. A volunteer helped at the annual fundraiser. Her regular job pays $25/hour and she volunteered for 10 hours.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'How should Transaction A (multi-year pledge) be recorded?',
        options: [
          'Record $100,000 as contribution revenue when pledge is received',
          'Record $20,000 per year as cash is received',
          'Record present value of $100,000 as contribution revenue, recognize interest over time',
          'Do not record until all cash is received',
        ],
        correctAnswer: 2,
        explanation: 'Multi-year unconditional pledges are recorded at present value when received. The discount is accreted to interest revenue over the pledge period.',
      },
      {
        id: 'req-2',
        type: 'classification',
        question: 'Classify Transaction B ($50,000 for building campaign) to the correct net asset class:',
        items: ['$50,000 building donation'],
        options: ['Without Donor Restrictions', 'With Donor Restrictions'],
        correctAnswers: [
          { item: '$50,000 building donation', answer: 'With Donor Restrictions' },
        ],
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'For Transaction C, how much revenue should be recognized at year-end?',
        correctAnswer: 15000,
        tolerance: 0,
        explanation: 'Conditional contribution based on barrier (tutoring 500 students). Revenue recognized as barrier is overcome: $25,000 × (300/500) = $15,000',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Should Transaction D (donated legal services) be recorded as revenue?',
        options: [
          'No - services can never be recorded as contributions',
          'Yes - specialized services that would otherwise be purchased are recorded',
          'Only if the attorney provides documentation',
          'Only if the amount exceeds $10,000',
        ],
        correctAnswer: 1,
        explanation: 'Donated services are recorded if they (1) create or enhance non-financial assets, or (2) require specialized skills, would be purchased if not donated, and are provided by those possessing those skills.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Should Transaction E (fundraiser volunteer) be recorded?',
        options: [
          'Yes - record $250 as contributed services and expense',
          'No - general volunteer services do not meet recognition criteria',
          'Yes - all volunteer hours must be tracked and reported',
          'Only if the volunteer is a professional fundraiser',
        ],
        correctAnswer: 1,
        explanation: 'General volunteer services (not creating assets, not specialized skills) are not recorded. The volunteer at a fundraiser does not meet the criteria for contributed service recognition.',
      },
    ],
    hints: [
      'Unconditional pledges: Record immediately at present value',
      'Conditional pledges: Record when conditions (barriers) are met',
      'Donor restrictions ≠ Board designations (donor vs. internal)',
      'Contributed services: Must be specialized AND would be purchased',
    ],
    references: ['ASC 958-605', 'ASC 958-310'],
  },
  {
    id: 'far-tbs-015',
    section: 'FAR',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Government-Wide vs. Fund Financial Statements',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Governmental Reporting',
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-A-2',
    scenario: `
You are reviewing the financial statements of the City of Maplewood. The city has prepared both government-wide and fund financial statements.

Consider the following items and determine the appropriate treatment:

A. Capital assets (infrastructure - roads and bridges): $50,000,000
B. General obligation bonds payable: $30,000,000
C. Property tax revenue: $12,000,000
D. Purchase of police vehicles: $500,000
E. Depreciation on government buildings: $2,000,000
F. Long-term compensated absences liability: $800,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'classification',
        question: 'For each item, determine if it appears on Government-Wide Statements:',
        items: ['Capital assets', 'GO bonds payable', 'Depreciation expense', 'Compensated absences liability'],
        options: ['Yes - Included', 'No - Excluded'],
        correctAnswers: [
          { item: 'Capital assets', answer: 'Yes - Included' },
          { item: 'GO bonds payable', answer: 'Yes - Included' },
          { item: 'Depreciation expense', answer: 'Yes - Included' },
          { item: 'Compensated absences liability', answer: 'Yes - Included' },
        ],
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'In the General Fund (governmental fund statements), how are capital assets recorded?',
        options: [
          'As assets on the balance sheet with accumulated depreciation',
          'As expenditures when purchased, not as assets',
          'At fair value each year',
          'Only if they exceed $1 million',
        ],
        correctAnswer: 1,
        explanation: 'Governmental funds use modified accrual. Capital assets are recorded as expenditures when purchased and do NOT appear on the fund balance sheet.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What measurement focus do government-wide statements use?',
        options: [
          'Current financial resources focus',
          'Economic resources focus (full accrual)',
          'Cash basis',
          'Modified cash basis',
        ],
        correctAnswer: 1,
        explanation: 'Government-wide statements use economic resources measurement focus and full accrual accounting - similar to commercial accounting.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'When bond proceeds are received, governmental funds record:',
        options: [
          'A liability for bonds payable',
          'An "other financing source"',
          'Revenue from financing activities',
          'No entry until the money is spent',
        ],
        correctAnswer: 1,
        explanation: 'Bond proceeds are reported as "Other Financing Sources" in governmental funds, not as liabilities (long-term debt is not recorded in fund statements).',
      },
    ],
    hints: [
      'Government-wide = Full accrual (like a business)',
      'Governmental funds = Modified accrual (current resources focus)',
      'Long-term assets and liabilities: Government-wide only',
      'Capital outlay = Expenditure in funds, Asset on government-wide',
    ],
    references: ['GASB Statement 34', 'GASB Statement 63'],
  },
];

// Export all additional TBS
export const ADDITIONAL_TBS = [...FAR_TBS_2, ...REG_TBS_2, ...AUD_TBS_2, ...BEC_TBS_2, ...RESEARCH_TBS, ...WRITTEN_COMM_TBS, ...EASY_TBS, ...FAR_NFP_GOVT_TBS];

export default ADDITIONAL_TBS;
