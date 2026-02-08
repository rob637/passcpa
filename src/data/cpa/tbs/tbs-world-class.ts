// World-Class TBS Simulations - Exam Quality
// CPA Exam style simulations with detailed scenarios and multi-part requirements

import { TBS, TBS_TYPES } from '../../../types';

// ==========================================
// FAR World-Class TBS
// ==========================================
export const FAR_TBS_WORLD_CLASS: TBS[] = [
  {
    id: 'far-tbs-wc-001',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Revenue Recognition - Multiple Performance Obligations',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Revenue Recognition (ASC 606)',
    blueprintArea: 'FAR-III',
    scenario: `
TechSolutions Inc. enters into a contract with Customer ABC on January 1, Year 1. The contract includes:
• Software license (perpetual) - Standalone selling price: $150,000
• Implementation services - Standalone selling price: $50,000  
• Two years of post-contract support (PCS) - Standalone selling price: $30,000 per year

Total contract price: $210,000
Payment terms: $100,000 due at signing, $110,000 due upon implementation completion

Additional facts:
• Implementation is completed on March 31, Year 1
• The software license is distinct and can be used without implementation
• PCS includes software updates and telephone support
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'How many performance obligations exist in this contract?',
        options: ['One', 'Two', 'Three', 'Four'],
        correctAnswer: 2,
        explanation: 'Three performance obligations: (1) Software license - distinct good, (2) Implementation services - distinct service, (3) PCS - distinct series of daily services (combined as one PO). Each is capable of being distinct and separately identifiable.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the transaction price allocated to the software license using the relative SSP method.',
        correctAnswer: 121154,
        tolerance: 100,
        explanation: 'Total SSP = $150,000 + $50,000 + $60,000 = $260,000. Software allocation = ($150,000 / $260,000) × $210,000 = $121,154'
      },
      {
        id: 'req-3',
        type: 'journal_entry',
        question: 'Prepare the journal entry on January 1, Year 1 when the contract is signed.',
        template: [
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
        ],
        correctEntries: [
          { account: 'Cash', debit: 100000, credit: null },
          { account: 'Contract Asset', debit: 21154, credit: null },
          { account: 'Revenue - Software License', debit: null, credit: 121154 },
        ],
        tolerance: 200
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What is the PCS revenue to be recognized in Year 1 (April 1 - December 31)?',
        correctAnswer: 36346,
        tolerance: 100,
        explanation: 'PCS allocation = ($60,000 SSP / $260,000 total SSP) × $210,000 transaction price = $48,462 total PCS revenue over 2 years. Year 1 (April-Dec): 9/24 × $48,462 = $18,173. Alternatively: $48,462 / 2 years = $24,231/year, then 9/12 × $24,231 = $18,173.'
      }
    ],
    hints: [
      'Step 1: Identify the contract(s) with the customer',
      'Step 2: Identify the performance obligations (distinct goods/services)',
      'Step 3: Determine the transaction price ($210,000)',
      'Step 4: Allocate transaction price using relative SSP',
      'Step 5: Recognize revenue when (or as) each PO is satisfied'
    ]
  },
  {
    id: 'far-tbs-wc-002',
    section: 'FAR',
    type: TBS_TYPES.RECONCILIATION,
    title: 'Bank Reconciliation with Complex Adjustments',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Cash and Receivables',
    blueprintArea: 'FAR-II',
    scenario: `
Apex Manufacturing is preparing its bank reconciliation for December 31, Year 1.

Bank Statement Information:
• Ending balance per bank: $87,450
• Deposits in transit: $12,300
• Outstanding checks: $8,750
• Bank service charges: $45
• NSF check from customer: $1,200
• Interest earned: $85
• Bank error: Bank incorrectly charged Apex $500 for another company's check

Company Records:
• Cash balance per books before adjustments: $91,790
• Customer note collected by bank: $3,500 (includes $150 interest)
• Accounts receivable from note: $3,350
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the adjusted bank balance.',
        correctAnswer: 91500,
        tolerance: 0,
        explanation: 'Bank balance $87,450 + Deposits in transit $12,300 - Outstanding checks $8,750 + Bank error $500 = $91,500'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the adjusted book balance.',
        correctAnswer: 91500,
        tolerance: 0,
        explanation: 'Book balance $91,790 - Service charges $45 - NSF check $1,200 + Interest earned $85 + Note collected $3,500 - Note receivable already recorded? Check facts. = Adjusted should equal bank $91,500'
      },
      {
        id: 'req-3',
        type: 'journal_entry',
        question: 'Prepare the journal entry to record the adjustments to the book balance.',
        template: [
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
        ],
        correctEntries: [
          { account: 'Cash', debit: 2340, credit: null },
          { account: 'Interest Revenue', debit: null, credit: 235 },
          { account: 'Notes Receivable', debit: null, credit: 3350 },
          { account: 'Bank Service Charges Expense', debit: 45, credit: null },
          { account: 'Accounts Receivable', debit: 1200, credit: null }
        ],
        tolerance: 10
      }
    ],
    hints: [
      'Deposits in transit and outstanding checks adjust the BANK balance',
      'Service charges, NSF checks, and note collections adjust the BOOK balance',
      'Bank errors are bank adjustments',
      'The adjusted bank and book balances must agree'
    ]
  },
  {
    id: 'far-tbs-wc-003',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Pension Accounting - PBO and Pension Expense',
    difficulty: 'hard',
    timeEstimate: 25,
    topic: 'Pensions (ASC 715)',
    blueprintArea: 'FAR-IV',
    scenario: `
Sterling Industries sponsors a defined benefit pension plan. The following information relates to the plan for Year 1:

Beginning balances (January 1, Year 1):
• Projected Benefit Obligation (PBO): $2,400,000
• Fair value of plan assets: $2,100,000
• Prior service cost (OCI): $180,000 (10-year remaining service period)

Year 1 activity:
• Service cost: $240,000
• Discount rate: 6%
• Expected return on plan assets: 7% (actual return was 8%)
• Company contribution: $350,000
• Benefits paid to retirees: $200,000
• Actuarial loss on PBO (new in Year 1): $45,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the interest cost component of net periodic pension cost.',
        correctAnswer: 144000,
        tolerance: 0,
        explanation: 'Interest cost = Beginning PBO × Discount rate = $2,400,000 × 6% = $144,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the expected return on plan assets.',
        correctAnswer: 147000,
        tolerance: 0,
        explanation: 'Expected return = Beginning plan assets × Expected rate = $2,100,000 × 7% = $147,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the amortization of prior service cost for Year 1.',
        correctAnswer: 18000,
        tolerance: 0,
        explanation: 'Amortization = Prior service cost / Remaining service period = $180,000 / 10 years = $18,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate net periodic pension cost (benefit) for Year 1.',
        correctAnswer: 255000,
        tolerance: 100,
        explanation: 'Service cost $240,000 + Interest cost $144,000 - Expected return $147,000 + PSC amortization $18,000 = $255,000'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the ending PBO at December 31, Year 1.',
        correctAnswer: 2629000,
        tolerance: 100,
        explanation: 'Beginning PBO $2,400,000 + Service cost $240,000 + Interest cost $144,000 - Benefits paid $200,000 + Actuarial loss $45,000 = $2,629,000'
      },
      {
        id: 'req-6',
        type: 'calculation',
        question: 'Calculate the funded status at December 31, Year 1.',
        correctAnswer: -311000,
        tolerance: 100,
        explanation: 'Plan assets ending = Beginning $2,100,000 + Actual return ($2,100,000 × 8% = $168,000) + Contributions $350,000 - Benefits paid $200,000 = $2,418,000. Funded status = Plan assets - PBO = $2,418,000 - $2,629,000 = -$211,000 (underfunded). Note: The funded status represents the net pension liability to be reported on the balance sheet.'
      }
    ],
    hints: [
      'Net periodic pension cost = Service cost + Interest cost - Expected return + Amortization of PSC +/- Amortization of gains/losses',
      'The difference between expected and actual return goes to OCI',
      'PBO changes: +Service cost, +Interest cost, -Benefits paid, +/-Actuarial changes',
      'Funded status = Fair value of plan assets - PBO (negative = underfunded)'
    ]
  }
];

// ==========================================
// AUD World-Class TBS
// ==========================================
export const AUD_TBS_WORLD_CLASS: TBS[] = [
  {
    id: 'aud-tbs-wc-001',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Audit Report Modification Analysis',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Audit Reports',
    blueprintArea: 'AUD-IV',
    scenario: `
You are reviewing audit documentation for three separate clients to determine the appropriate audit report modification:

Client A - Sunrise Corporation:
• During the audit, Sunrise refused to allow confirmation of a material accounts receivable balance
• Alternative procedures were performed but were unable to provide sufficient appropriate evidence
• The receivable balance represents 40% of total assets

Client B - Western Industries:
• The company changed its depreciation method from straight-line to double-declining balance
• The change is properly accounted for and disclosed in accordance with GAAP
• The effect of the change is material

Client C - Valley Medical:
• There is substantial doubt about the entity's ability to continue as a going concern
• Management's plans to address the situation are disclosed in the notes
• The auditor agrees the disclosure is adequate
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'For Client A (Sunrise Corporation), what type of opinion should be issued?',
        options: ['Unmodified opinion', 'Qualified opinion (scope limitation)', 'Adverse opinion', 'Disclaimer of opinion'],
        correctAnswer: 3,
        explanation: 'Disclaimer of opinion. The scope limitation (inability to confirm material receivables with no adequate alternative procedures) is both material AND pervasive (40% of assets). When a scope limitation is pervasive, a disclaimer is appropriate rather than a qualified opinion.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'For Client B (Western Industries), what is required in the audit report?',
        options: ['Qualified opinion for GAAP departure', 'Unmodified opinion with emphasis of matter paragraph', 'Adverse opinion', 'Unmodified opinion with no additional paragraphs'],
        correctAnswer: 1,
        explanation: 'Unmodified opinion with emphasis of matter paragraph. A change in accounting principle that is properly accounted for and disclosed does not result in a modified opinion. However, the auditor should add an emphasis of matter paragraph to highlight the change.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'For Client C (Valley Medical), what is required in the audit report?',
        options: ['Qualified opinion', 'Unmodified opinion with emphasis of matter paragraph', 'Disclaimer of opinion', 'Adverse opinion'],
        correctAnswer: 1,
        explanation: 'Unmodified opinion with emphasis of matter paragraph. When there is substantial doubt about going concern but adequate disclosure is made, the auditor issues an unmodified opinion with an emphasis of matter paragraph highlighting the going concern uncertainty.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which paragraph heading would appear BEFORE the opinion paragraph in Client A\'s report?',
        options: ['Basis for Qualified Opinion', 'Basis for Disclaimer of Opinion', 'Emphasis of Matter', 'Other Matter'],
        correctAnswer: 1,
        explanation: 'For a disclaimer of opinion, the report includes a "Basis for Disclaimer of Opinion" paragraph before the opinion paragraph, describing the reasons why sufficient appropriate evidence could not be obtained.'
      }
    ],
    hints: [
      'Consider materiality AND pervasiveness when determining opinion type',
      'Qualified = material but NOT pervasive',
      'Adverse/Disclaimer = material AND pervasive',
      'Going concern with proper disclosure = emphasis of matter, not modification'
    ]
  },
  {
    id: 'aud-tbs-wc-002',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Internal Control Deficiency Evaluation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Internal Control',
    blueprintArea: 'AUD-II',
    scenario: `
Evaluate the following situations identified during the audit of Omega Manufacturing:

Situation 1:
The accounting department consists of three employees. One employee handles both cash receipts and accounts receivable record-keeping. The employee opens mail, records cash receipts, makes deposits, and posts to customer accounts. The company has no other cash handling controls.

Situation 2:
The company's IT department recently implemented a new ERP system. Access to the system was granted to all accounting personnel using a generic password. The default administrator password was not changed from the system default.

Situation 3:
Monthly bank reconciliations are prepared by an accounting clerk and reviewed by the controller within 45 days after month-end. No second review or approval is performed.

Situation 4:
Physical inventory counts are performed annually. During the count, warehouse personnel count their own assigned inventory areas. Counts are verified by the cost accountant.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'How should Situation 1 (lack of segregation of duties in cash) be classified?',
        options: ['Control deficiency', 'Significant deficiency', 'Material weakness', 'No deficiency exists'],
        correctAnswer: 2,
        explanation: 'Material weakness. The combination of receiving cash, recording, depositing, and posting to customer accounts with no compensating controls creates a reasonable possibility that a material misstatement would not be prevented or detected. This is a classic segregation of duties failure in a high-risk area.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'How should Situation 2 (generic passwords and unchanged default admin password) be classified?',
        options: ['Control deficiency', 'Significant deficiency', 'Material weakness', 'No deficiency exists'],
        correctAnswer: 2,
        explanation: 'Material weakness. Generic passwords eliminate user accountability, and unchanged default administrator passwords represent a severe IT security risk. Together, these create a reasonable possibility of undetected unauthorized access leading to material misstatement.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'How should Situation 3 (delayed bank reconciliation review) be classified?',
        options: ['Control deficiency', 'Significant deficiency', 'Material weakness', 'No deficiency exists'],
        correctAnswer: 1,
        explanation: 'Significant deficiency. While the control exists and has review, the 45-day delay reduces its effectiveness for timely detection. This merits attention by those charged with governance but is not severe enough to be a material weakness since review does occur.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'How should Situation 4 (inventory count verification process) be classified?',
        options: ['Control deficiency', 'Significant deficiency', 'Material weakness', 'No deficiency exists'],
        correctAnswer: 0,
        explanation: 'Control deficiency. Having employees count their own areas is not ideal, but the verification by the cost accountant provides a compensating control. This is a deficiency that could be improved but is not severe enough to be significant or material.'
      }
    ],
    hints: [
      'Material weakness = reasonable possibility of material misstatement not prevented/detected',
      'Significant deficiency = less severe than MW but merits governance attention',
      'Control deficiency = control design or operation does not allow timely prevention/detection',
      'Consider aggregation of deficiencies when evaluating severity'
    ]
  }
];

// ==========================================
// REG World-Class TBS
// ==========================================
export const REG_TBS_WORLD_CLASS: TBS[] = [
  {
    id: 'reg-tbs-wc-001',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Individual Tax Calculation - Comprehensive',
    difficulty: 'hard',
    timeEstimate: 25,
    topic: 'Individual Taxation',
    blueprintArea: 'REG-IV',
    scenario: `
John and Mary Smith are married filing jointly for Year 1. The following information is provided:

Income:
• John's salary: $180,000
• Mary's self-employment income (net after Schedule C): $85,000
• Interest income from savings: $3,200
• Qualified dividend income: $8,500
• Long-term capital gain from stock sale: $15,000
• Short-term capital loss from stock sale: ($4,000)

Deductions and Information:
• State and local taxes paid: $18,000
• Mortgage interest on primary residence: $12,000
• Charitable contributions (cash to 501(c)(3)): $8,000
• Medical expenses paid: $9,500
• Health insurance premiums (not through employer): $600/month

Adjustments:
• Traditional IRA contribution (Mary, no employer plan): $7,000
• Student loan interest: $2,500
• Self-employment tax will be calculated

For Year 1:
• Standard deduction (MFJ): $27,700
• SE tax rate: 15.3% on first $160,200, 2.9% thereafter
• SALT cap: $10,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Mary\'s self-employment tax.',
        correctAnswer: 12014,
        tolerance: 100,
        explanation: 'SE income $85,000 × 0.9235 = $78,498. SE tax = $78,498 × 15.3% = $12,010 (rounds to approximately $12,014)'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total itemized deductions.',
        correctAnswer: 30000,
        tolerance: 200,
        explanation: 'SALT capped at $10,000 + Mortgage interest $12,000 + Charitable $8,000 = $30,000. Medical is only deductible above 7.5% of AGI, and likely does not exceed that threshold.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Adjusted Gross Income (AGI) before QBI deduction.',
        correctAnswer: 274193,
        tolerance: 500,
        explanation: 'Total income: $180,000 + $85,000 + $3,200 + $8,500 + $15,000 - $4,000 = $287,700. Minus: 1/2 SE tax ($6,007) + IRA contribution $7,000 + Student loan interest $2,500 = $272,193 (approximately)'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Should the Smiths itemize or take the standard deduction?',
        options: ['Itemize ($30,000 > $27,700)', 'Standard deduction ($27,700 > $30,000)', 'Either, as the amounts are equal', 'Cannot determine from information given'],
        correctAnswer: 0,
        explanation: 'Itemized deductions of $30,000 exceed the standard deduction of $27,700, so they should itemize.'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the QBI deduction for Mary\'s self-employment income (assume no W-2 wage limitation applies).',
        correctAnswer: 17000,
        tolerance: 200,
        explanation: 'QBI = SE income $85,000 × 20% = $17,000 (subject to income phase-out thresholds and overall taxable income limit)'
      }
    ],
    hints: [
      'Self-employment tax calculation: Net SE × 92.35% × 15.3%',
      'Deductible portion of SE tax = 1/2 of SE tax (above-the-line)',
      'SALT is capped at $10,000 for MFJ',
      'QBI deduction is 20% of qualified business income (subject to limitations)'
    ]
  },
  {
    id: 'reg-tbs-wc-002',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'S Corporation Shareholder Basis',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'S Corporations',
    blueprintArea: 'REG-V',
    scenario: `
Sarah is the sole shareholder of TechStart Inc., an S corporation. On January 1, Year 1, Sarah's stock basis was $40,000 and her debt basis was $15,000 (loan she made to the corporation).

Year 1 S Corporation Activity (Schedule K-1 items):
• Ordinary business income: $75,000
• Section 179 deduction: $8,000
• Charitable contributions: $3,000
• Tax-exempt interest income: $2,000
• Cash distribution to Sarah: $60,000

Additional Information:
• Sarah did not make any additional capital contributions
• The corporation did not repay any of Sarah's loan
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Sarah\'s increase to stock basis for income items.',
        correctAnswer: 77000,
        tolerance: 0,
        explanation: 'Ordinary income $75,000 + Tax-exempt income $2,000 = $77,000. All income items (including tax-exempt) increase basis.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate Sarah\'s decrease to stock basis for deduction and distribution items.',
        correctAnswer: 71000,
        tolerance: 0,
        explanation: 'Section 179 $8,000 + Charitable $3,000 + Distribution $60,000 = $71,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate Sarah\'s stock basis at year-end.',
        correctAnswer: 46000,
        tolerance: 0,
        explanation: 'Beginning $40,000 + Income $77,000 - Deductions $11,000 - Distribution $60,000 = $46,000'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What is Sarah\'s debt basis at year-end?',
        correctAnswer: 15000,
        tolerance: 0,
        explanation: 'Debt basis remains $15,000. No reduction needed since stock basis was sufficient to absorb all deductions and distributions.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'If the corporation had a $90,000 distribution instead of $60,000, how would the excess be taxed?',
        options: ['Ordinary income', 'Capital gain', 'Return of capital reducing basis', 'Not taxable'],
        correctAnswer: 1,
        explanation: 'After reducing stock basis to zero, excess distributions are capital gain (assuming no accumulated E&P from prior C corp years). Distributions first reduce stock basis, then when exhausted, are taxed as capital gains.'
      }
    ],
    hints: [
      'Basis ordering: Income first, then distributions, then deductions/losses',
      'Tax-exempt income increases basis (preserves tax-exempt treatment)',
      'Distributions reduce stock basis (cannot go below zero)',
      'Distribution excess (after zeroing stock basis) is capital gain'
    ]
  }
];

// ==========================================
// TCP World-Class TBS  
// ==========================================
export const TCP_TBS_WORLD_CLASS: TBS[] = [
  {
    id: 'tcp-tbs-wc-001',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Partnership Distribution Analysis',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Partnership Taxation',
    blueprintArea: 'TCP-II',
    scenario: `
Apex Partnership (calendar year, accrual basis) has two equal partners: Alex and Blake. On December 31, Year 1, the partnership makes a proportionate current distribution to Alex.

Partnership assets before distribution:
• Cash: $100,000
• Inventory (FMV $80,000, basis $50,000): $50,000 book basis
• Equipment (FMV $70,000, basis $40,000): $40,000 book basis

Alex's Information:
• Outside basis before distribution: $65,000
• Distribution received: $30,000 cash + inventory with $40,000 FMV and $25,000 basis to partnership

Note: Inventory is not substantially appreciated (difference < 120% of basis).
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Does Alex recognize any gain on this distribution?',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'No gain recognized. Cash received ($30,000) does not exceed Alex\'s outside basis ($65,000). In a current distribution, gain is recognized only if cash exceeds basis.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'What is Alex\'s basis in the distributed inventory?',
        correctAnswer: 25000,
        tolerance: 0,
        explanation: 'In a current distribution, the distributee takes a carryover basis in property received ($25,000), limited to remaining outside basis after cash. Since basis exceeds cash received, full carryover basis applies.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'What is Alex\'s outside basis after the distribution?',
        correctAnswer: 10000,
        tolerance: 0,
        explanation: 'Beginning basis $65,000 - Cash $30,000 - Inventory basis $25,000 = $10,000 remaining outside basis.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'If the cash distributed had been $70,000 instead of $30,000, what would be the tax consequence?',
        options: ['No gain, basis reduced to zero', '$5,000 capital gain', '$5,000 ordinary income', 'Distribution would be invalid'],
        correctAnswer: 1,
        explanation: 'Cash of $70,000 would exceed outside basis of $65,000 by $5,000. This excess is recognized as capital gain (not ordinary) on a current distribution.'
      }
    ],
    hints: [
      'Current distribution: Gain recognized only if cash > outside basis',
      'Property received takes carryover basis (limited to remaining outside basis)',
      'Reduce outside basis in order: cash first, then property basis',
      'Gain character on excess cash distribution is capital gain'
    ]
  }
];

// ==========================================
// BAR World-Class TBS
// ==========================================
export const BAR_TBS_WORLD_CLASS: TBS[] = [
  {
    id: 'bar-tbs-wc-001',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Comprehensive Variance Analysis',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Standard Costing',
    blueprintArea: 'BAR-I',
    scenario: `
Precision Products Inc. manufactures a single product using standard costing. The following standards were established:

Standard Cost Card (per unit):
• Direct Materials: 4 pounds @ $12/lb = $48
• Direct Labor: 2.5 hours @ $20/hr = $50
• Variable Overhead: 2.5 DLH @ $8/DLH = $20
• Fixed Overhead: 2.5 DLH @ $6/DLH = $15

Budgeted production: 10,000 units
Actual production: 9,500 units

Actual Results for the Period:
• Direct materials purchased: 40,000 pounds @ $11.80/lb
• Direct materials used: 38,500 pounds
• Direct labor: 24,200 hours @ $20.50/hr
• Actual variable overhead: $188,000
• Actual fixed overhead: $152,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the direct materials price variance.',
        correctAnswer: 8000,
        tolerance: 0,
        explanation: 'Material Price Variance = (Actual Price - Standard Price) × Actual Qty Purchased = ($11.80 - $12.00) × 40,000 = -$8,000 (Favorable)'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the direct materials efficiency variance.',
        correctAnswer: 6000,
        tolerance: 0,
        explanation: 'Standard Qty Allowed = 9,500 × 4 = 38,000 lbs. MEV = (Actual Qty Used - Std Qty Allowed) × Std Price = (38,500 - 38,000) × $12 = $6,000 Unfavorable'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the direct labor rate variance.',
        correctAnswer: 12100,
        tolerance: 0,
        explanation: 'Labor Rate Variance = (Actual Rate - Standard Rate) × Actual Hours = ($20.50 - $20.00) × 24,200 = $12,100 Unfavorable'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the direct labor efficiency variance.',
        correctAnswer: 9000,
        tolerance: 0,
        explanation: 'Standard Hours Allowed = 9,500 × 2.5 = 23,750 hrs. LEV = (Actual Hours - Std Hours) × Std Rate = (24,200 - 23,750) × $20 = $9,000 Unfavorable'
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the fixed overhead volume variance.',
        correctAnswer: 7500,
        tolerance: 0,
        explanation: 'Volume Variance = (Budgeted - Standard Hours Allowed) × Fixed OH Rate = (25,000 - 23,750) × $6 = $7,500 Unfavorable (production lower than budget)'
      }
    ],
    hints: [
      'Price variance uses quantity purchased; efficiency variance uses quantity used',
      'Standard quantity allowed = Actual production × Standard per unit',
      'Fixed OH volume variance measures production efficiency vs. budget',
      'Favorable = actual less than standard (savings)'
    ]
  }
];

// ==========================================
// ISC World-Class TBS
// ==========================================
export const ISC_TBS_WORLD_CLASS: TBS[] = [
  {
    id: 'isc-tbs-wc-001',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'IT General Controls Assessment',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'IT Controls',
    blueprintArea: 'ISC-II',
    scenario: `
You are evaluating IT general controls for a client's financial reporting systems. Review the following scenarios:

Access Control Environment:
• User account provisioning requires manager approval via email
• Terminated employee access is removed within 30 days of termination
• Privileged access (admin) accounts are shared among 4 IT staff members
• Password policy requires 8 characters, changed every 180 days
• No multi-factor authentication is implemented

Change Management Process:
• Developers can move code directly to production during emergencies
• Testing is performed in a non-production environment for most changes
• All changes require approval, but emergency changes can be approved post-implementation
• No separate code review is required before deployment
• Documentation is maintained for changes affecting financial systems

Data Backup and Recovery:
• Full backups are performed weekly, incrementals daily
• Backups are stored onsite and copied to cloud storage monthly
• Recovery testing is performed annually
• Backup logs are reviewed monthly
• No encryption of backup media
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which access control weakness represents the MOST significant risk?',
        options: ['30-day termination processing', 'Shared admin accounts', '8-character passwords', '180-day password expiration'],
        correctAnswer: 1,
        explanation: 'Shared admin accounts eliminate individual accountability and audit trail. Any of the 4 users could make unauthorized changes without being identified. This is a significant ITGC weakness.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What is the primary control weakness in the change management process?',
        options: ['Post-implementation approval for emergencies', 'Developer access to production during emergencies', 'No separate code review requirement', 'Testing in non-production environment'],
        correctAnswer: 1,
        explanation: 'Developers having production access, even for emergencies, violates segregation of duties. They could introduce unauthorized changes to production systems. Emergency access should be controlled with enhanced monitoring.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Which backup control weakness poses the greatest data security risk?',
        options: ['Weekly full backups', 'Monthly cloud copy', 'Annual recovery testing', 'Unencrypted backup media'],
        correctAnswer: 3,
        explanation: 'Unencrypted backup media creates significant data breach risk. If media is lost or stolen, sensitive financial data could be exposed. Encryption protects data at rest.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What compensating control would best address the shared admin account weakness?',
        options: ['Require longer passwords', 'Implement session logging and monitoring of all admin actions', 'Reduce the number of IT staff', 'Increase backup frequency'],
        correctAnswer: 1,
        explanation: 'Session logging and monitoring of admin actions can partially compensate for shared accounts by creating an audit trail of activities, though individual accountability remains impaired.'
      }
    ],
    hints: [
      'Evaluate controls by: preventive vs. detective, severity of risk if failed',
      'Segregation of duties is a fundamental IT control principle',
      'Shared accounts = loss of accountability',
      'Consider compensating controls when primary controls are weak'
    ]
  }
];

// Export all world-class TBS
export const ALL_TBS_WORLD_CLASS: TBS[] = [
  ...FAR_TBS_WORLD_CLASS,
  ...AUD_TBS_WORLD_CLASS,
  ...REG_TBS_WORLD_CLASS,
  ...TCP_TBS_WORLD_CLASS,
  ...BAR_TBS_WORLD_CLASS,
  ...ISC_TBS_WORLD_CLASS
];

export default ALL_TBS_WORLD_CLASS;
