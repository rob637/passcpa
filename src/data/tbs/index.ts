// Task-Based Simulation (TBS) Question Bank
// CPA Exam simulations for all sections

import { TBS, TBS_TYPES, ExamSection, TBSType } from '../../types';
// ADDITIONAL_TBS is exported from additional-tbs but merged into section arrays below
import { /* ADDITIONAL_TBS, */ FAR_TBS_2, REG_TBS_2, AUD_TBS_2, BEC_TBS_2 } from './additional-tbs';
// New 2024 exam sections - native TBS content
import { BAR_TBS } from './bar-tbs';
import { ISC_TBS } from './isc-tbs';
import { TCP_TBS } from './tcp-tbs';

// ==========================================
// FAR - FINANCIAL ACCOUNTING TBS
// ==========================================
export const FAR_TBS: TBS[] = [
  {
    id: 'far-tbs-001',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Lease Classification and Initial Recognition',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Leases (ASC 842)',
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-C-2',
    scenario: `
Riverside Corp. enters into a 7-year equipment lease on January 1, Year 1. The following information is available:

• Fair value of equipment: $500,000
• Annual lease payment: $95,000 (due at end of each year)
• Implicit rate in lease: 6% (known to lessee)
• Lessee's incremental borrowing rate: 8%
• Useful life of equipment: 8 years
• No transfer of ownership or purchase option
• The equipment is not specialized

Present value factors at 6% for 7 periods:
• PV of ordinary annuity: 5.58238
• PV of $1: 0.66506
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'How should Riverside classify this lease?',
        options: ['Finance lease', 'Operating lease'],
        correctAnswer: 0,
        explanation:
          'This is a FINANCE lease. Testing the OWNES criteria: The lease term (7 years) is 87.5% of the useful life (8 years), which exceeds the 75% threshold. Additionally, the PV of lease payments ($95,000 × 5.58238 = $530,326) exceeds 100% of fair value. Either criterion alone would qualify this as a finance lease.',
      },
      {
        id: 'req-2',
        type: 'journal_entry',
        question: 'Prepare the journal entry to record the lease at inception (January 1, Year 1).',
        template: [
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
        ],
        correctEntries: [
          { account: 'Right-of-Use Asset', debit: 500000, credit: null },
          { account: 'Lease Liability', debit: null, credit: 500000 },
        ],
        tolerance: 5, // Allow small rounding differences
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the interest expense for Year 1.',
        correctAnswer: 30000,
        tolerance: 5,
        explanation: '$500,000 × 6% = $30,000',
      },
      {
        id: 'req-4',
        type: 'journal_entry',
        question: 'Prepare the journal entry for the first lease payment (December 31, Year 1).',
        template: [
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
        ],
        correctEntries: [
          { account: 'Interest Expense', debit: 30000, credit: null },
          { account: 'Lease Liability', debit: 65000, credit: null },
          { account: 'Cash', debit: null, credit: 95000 },
        ],
        tolerance: 5,
      },
    ],
    hints: [
      '🔑 FINANCE LEASE TEST (OWNES - any ONE = Finance):',
      '• Ownership transfers at lease end',
      '• Written bargain purchase option',
      '• Nearly all useful life (≥75%)',
      '• Essentially all fair value (≥90% of PV payments)',
      '• Specialized asset with no alternative use',
      '',
      '📊 KEY FORMULAS:',
      '• ROU Asset = Lease Liability = PV of lease payments',
      '• Use implicit rate if known; else use incremental borrowing rate',
      '• Interest Expense = Beginning Liability × Rate',
      '• Principal Reduction = Payment − Interest Expense',
    ],
    references: ['ASC 842-10-25', 'ASC 842-20-25-1'],
  },
  {
    id: 'far-tbs-002',
    section: 'FAR',
    type: TBS_TYPES.RECONCILIATION,
    title: 'Bank Reconciliation with Adjusting Entries',
    difficulty: 'medium',
    timeEstimate: 12,
    topic: 'Cash and Cash Equivalents',
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    scenario: `
Delta Company is preparing its bank reconciliation for November 30, Year 1. The following information is available:

Balance per bank statement: $45,780
Balance per company books: $43,030

Additional information:
1. Deposit in transit: $8,500
2. Outstanding checks:
   - Check #1542: $3,200
   - Check #1545: $2,100
   - Check #1548: $1,850
3. Bank service charge: $75
4. NSF check from customer (J. Smith): $1,200
5. Bank collected a note receivable: $5,000 principal + $250 interest
6. Error: Check #1540 for supplies was recorded as $540 but cleared the bank at $450
7. Interest earned on account: $35
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'reconciliation',
        question: 'Complete the bank reconciliation.',
        template: {
          bankSection: {
            startingBalance: null,
            additions: [],
            deductions: [],
            adjustedBalance: null,
          },
          bookSection: {
            startingBalance: null,
            additions: [],
            deductions: [],
            adjustedBalance: null,
          },
        },
        correctAnswer: {
          bankSection: {
            startingBalance: 45780,
            additions: [{ description: 'Deposit in transit', amount: 8500 }],
            deductions: [
              { description: 'Outstanding check #1542', amount: 3200 },
              { description: 'Outstanding check #1545', amount: 2100 },
              { description: 'Outstanding check #1548', amount: 1850 },
            ],
            adjustedBalance: 47130,
          },
          bookSection: {
            startingBalance: 43030,
            additions: [
              { description: 'Note collected by bank', amount: 5250 },
              { description: 'Error correction (check #1540)', amount: 90 },
              { description: 'Interest earned', amount: 35 },
            ],
            deductions: [
              { description: 'Bank service charge', amount: 75 },
              { description: 'NSF check - J. Smith', amount: 1200 },
            ],
            adjustedBalance: 47130,
          },
        },
      },
      {
        id: 'req-2',
        type: 'journal_entry',
        question: 'Prepare the adjusting journal entries for the books.',
        template: [
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
        ],
        correctEntries: [
          // Entry 1: Note collection
          { account: 'Cash', debit: 5250, credit: null },
          { account: 'Notes Receivable', debit: null, credit: 5000 },
          { account: 'Interest Revenue', debit: null, credit: 250 },
          // Entry 2: Service charge
          { account: 'Bank Service Charges Expense', debit: 75, credit: null },
          { account: 'Cash', debit: null, credit: 75 },
          // Entry 3: NSF check
          { account: 'Accounts Receivable - J. Smith', debit: 1200, credit: null },
          { account: 'Cash', debit: null, credit: 1200 },
          // Entry 4: Error correction
          { account: 'Cash', debit: 90, credit: null },
          { account: 'Supplies', debit: null, credit: 90 },
          // Entry 5: Interest earned
          { account: 'Cash', debit: 35, credit: null },
          { account: 'Interest Revenue', debit: null, credit: 35 },
        ],
        multipleEntriesAllowed: true,
      },
    ],
    hints: [
      'Only items that affect the book balance require adjusting entries',
      'Outstanding checks and deposits in transit adjust the bank balance only',
      'The adjusted balances should be equal when the reconciliation is complete',
    ],
    references: ['Bank Reconciliation Procedures'],
  },
  {
    id: 'far-tbs-003',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Revenue Recognition - Multiple Performance Obligations',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Revenue (ASC 606)',
    blueprintArea: 'FAR-IV',
    blueprintTopic: 'FAR-IV-A-1',
    scenario: `
TechSolutions Inc. enters into a contract with a customer on January 1, Year 1 for the following:

1. Software license (perpetual): Standalone selling price $80,000
2. Installation services: Standalone selling price $15,000
3. Two years of post-contract support (PCS): Standalone selling price $30,000 ($15,000/year)
4. Training (one-time): Standalone selling price $5,000

Total contract price: $120,000

Additional information:
• The software is delivered and functional on January 15, Year 1
• Installation is completed on January 20, Year 1
• Training is provided on February 1, Year 1
• PCS is provided evenly over 2 years beginning January 15, Year 1
• All items are distinct performance obligations
• Payment is due 50% at signing, 50% upon software delivery
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation_table',
        question: 'Allocate the transaction price to each performance obligation.',
        template: [
          { obligation: 'Software License', ssp: '', allocation: '' },
          { obligation: 'Installation', ssp: '', allocation: '' },
          { obligation: 'PCS (2 years)', ssp: '', allocation: '' },
          { obligation: 'Training', ssp: '', allocation: '' },
          { obligation: 'Total', ssp: '', allocation: '' },
        ],
        correctAnswer: [
          { obligation: 'Software License', ssp: 80000, allocation: 73846 },
          { obligation: 'Installation', ssp: 15000, allocation: 13846 },
          { obligation: 'PCS (2 years)', ssp: 30000, allocation: 27692 },
          { obligation: 'Training', ssp: 5000, allocation: 4615 },
          { obligation: 'Total', ssp: 130000, allocation: 120000 },
        ],
        tolerance: 1,
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'How much revenue should TechSolutions recognize in Year 1?',
        correctAnswer: 106153,
        tolerance: 10,
        explanation:
          'Software ($73,846) + Installation ($13,846) + Training ($4,615) + PCS Year 1 ($13,846) = $106,153',
      },
      {
        id: 'req-3',
        type: 'journal_entry',
        question: 'Prepare the journal entry when the software is delivered (January 15, Year 1).',
        correctEntries: [
          { account: 'Cash', debit: 60000, credit: null },
          { account: 'Accounts Receivable', debit: 60000, credit: null },
          { account: 'Revenue - Software', debit: null, credit: 73846 },
          { account: 'Deferred Revenue', debit: null, credit: 46154 },
        ],
        tolerance: 5,
      },
    ],
    hints: [
      'Allocate transaction price based on relative standalone selling prices',
      'Each distinct performance obligation is a separate unit of account',
      'Point-in-time recognition for software, installation, training; over-time for PCS',
    ],
    references: ['ASC 606-10-32-28', 'ASC 606-10-25-19'],
  },
  {
    id: 'far-tbs-004',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Bond Issuance and Interest (Effective Interest Method)',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Long-Term Liabilities',
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-B-1',
    scenario: `
On January 1, Year 1, Quantum Corp. issues $1,000,000 face value bonds with the following terms:

• Stated interest rate: 6% (paid semiannually on June 30 and December 31)
• Market interest rate at issuance: 8%
• Maturity: 5 years
• Issue price: $918,891

Present value factors at 4% for 10 periods:
• PV of ordinary annuity: 8.11090
• PV of $1: 0.67556
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'journal_entry',
        question: 'Prepare the journal entry to record the bond issuance on January 1, Year 1.',
        correctEntries: [
          { account: 'Cash', debit: 918891, credit: null },
          { account: 'Discount on Bonds Payable', debit: 81109, credit: null },
          { account: 'Bonds Payable', debit: null, credit: 1000000 },
        ],
        tolerance: 5,
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the interest expense for the first semiannual period.',
        correctAnswer: 36756,
        tolerance: 5,
        explanation: '$918,891 × 4% = $36,756 (using effective interest rate)',
      },
      {
        id: 'req-3',
        type: 'journal_entry',
        question: 'Prepare the journal entry for the first interest payment on June 30, Year 1.',
        correctEntries: [
          { account: 'Interest Expense', debit: 36756, credit: null },
          { account: 'Discount on Bonds Payable', debit: null, credit: 6756 },
          { account: 'Cash', debit: null, credit: 30000 },
        ],
        tolerance: 5,
      },
      {
        id: 'req-4',
        type: 'calculation',
        question:
          'What is the carrying value of the bonds immediately after the first interest payment?',
        correctAnswer: 925647,
        tolerance: 5,
        explanation: '$918,891 + $6,756 amortization = $925,647',
      },
      {
        id: 'req-5',
        type: 'amortization_table',
        question: 'Complete the first 3 periods of the bond amortization schedule.',
        template: [
          { period: 1, interestExpense: '', cashPayment: '', amortization: '', carryingValue: '' },
          { period: 2, interestExpense: '', cashPayment: '', amortization: '', carryingValue: '' },
          { period: 3, interestExpense: '', cashPayment: '', amortization: '', carryingValue: '' },
        ],
        correctAnswer: [
          {
            period: 1,
            interestExpense: 36756,
            cashPayment: 30000,
            amortization: 6756,
            carryingValue: 925647,
          },
          {
            period: 2,
            interestExpense: 37026,
            cashPayment: 30000,
            amortization: 7026,
            carryingValue: 932673,
          },
          {
            period: 3,
            interestExpense: 37307,
            cashPayment: 30000,
            amortization: 7307,
            carryingValue: 939980,
          },
        ],
        tolerance: 5,
      },
    ],
    hints: [
      'Bonds issued at a discount when market rate > stated rate',
      'Interest expense = Carrying value × Market rate ÷ 2',
      'Cash payment = Face value × Stated rate ÷ 2',
      'Amortization = Interest expense - Cash payment',
    ],
    references: ['ASC 835-30'],
  },
  {
    id: 'far-tbs-005',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Income Tax Provision (ASC 740)',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Income Taxes',
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-D-1',
    scenario: `
Nexus Industries reports the following for Year 1:

Pretax financial income: $500,000

Book-tax differences:
1. Depreciation: Book $40,000; Tax $65,000
2. Warranty expense: Book $30,000; Tax (cash paid) $18,000
3. Municipal bond interest revenue: $15,000 (book and tax)
4. Prepaid rent received: $0 book revenue; $24,000 taxable
5. Fines and penalties expense: $8,000 (not deductible)

Additional information:
• Tax rate: 21%
• Beginning DTL balance: $12,000
• Beginning DTA balance: $5,000
• All temporary differences originated in Year 1 or prior
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate taxable income for Year 1.',
        correctAnswer: 504000,
        tolerance: 0,
        explanation:
          'Start with pretax book income: $500,000. Adjustments: (1) Depreciation: Tax has $25,000 MORE deduction, so SUBTRACT $25,000. (2) Warranty: Tax has $12,000 LESS deduction (only $18k cash paid vs $30k expense), so ADD $12,000. (3) Municipal interest: Permanent exclusion, SUBTRACT $15,000. (4) Prepaid rent: Taxable when received, ADD $24,000. (5) Fines: Not deductible, ADD BACK $8,000. Taxable income = $500,000 - $25,000 + $12,000 - $15,000 + $24,000 + $8,000 = $504,000',
      },
      {
        id: 'req-2',
        type: 'classification_table',
        question:
          'Classify each difference as temporary or permanent, and if temporary, as DTA or DTL.',
        template: [
          { item: 'Depreciation', classification: '', type: '' },
          { item: 'Warranty', classification: '', type: '' },
          { item: 'Municipal interest', classification: '', type: '' },
          { item: 'Prepaid rent', classification: '', type: '' },
          { item: 'Fines', classification: '', type: '' },
        ],
        correctAnswer: [
          { item: 'Depreciation', classification: 'Temporary', type: 'DTL' },
          { item: 'Warranty', classification: 'Temporary', type: 'DTA' },
          { item: 'Municipal interest', classification: 'Permanent', type: 'N/A' },
          { item: 'Prepaid rent', classification: 'Temporary', type: 'DTA' },
          { item: 'Fines', classification: 'Permanent', type: 'N/A' },
        ],
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the current income tax payable.',
        correctAnswer: 105840,
        tolerance: 5,
        explanation: 'Taxable income ($504,000) × 21% = $105,840',
      },
      {
        id: 'req-4',
        type: 'journal_entry',
        question: 'Prepare the journal entry to record income tax expense for Year 1.',
        correctEntries: [
          { account: 'Income Tax Expense', debit: 101535, credit: null },
          { account: 'Deferred Tax Asset', debit: 7560, credit: null },
          { account: 'Deferred Tax Liability', debit: null, credit: 3255 },
          { account: 'Income Tax Payable', debit: null, credit: 105840 },
        ],
        tolerance: 100,
        multipleEntriesAllowed: true,
      },
    ],
    hints: [
      'Permanent differences never reverse - they affect only current taxes',
      'Temporary differences create deferred tax assets or liabilities',
      'DTA: Future deductible amounts; DTL: Future taxable amounts',
      'Total tax expense = Current + Deferred',
    ],
    references: ['ASC 740-10-25', 'ASC 740-10-30'],
  },
  {
    id: 'far-tbs-006',
    section: 'FAR',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Government Fund Financial Statement Analysis',
    difficulty: 'hard',
    timeEstimate: 15,
    topic: 'Governmental Accounting',
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-A-1',
    scenario: `
Review the following excerpts from the City of Riverside's financial statements and related notes for the fiscal year ended June 30, Year 1.

GENERAL FUND - BALANCE SHEET (Partial)
Assets:
  Cash and investments: $2,450,000
  Property taxes receivable: $380,000
  Due from other funds: $125,000
  Total Assets: $2,955,000

Liabilities:
  Accounts payable: $245,000
  Due to other funds: $85,000
  Total Liabilities: $330,000

Fund Balances:
  Nonspendable: $50,000
  Restricted: $425,000
  Committed: $600,000
  Assigned: $350,000
  Unassigned: $1,200,000
  Total Fund Balances: $2,625,000

Note 3: The restricted fund balance represents resources restricted by state law for street maintenance. The committed fund balance was established by City Council resolution for capital projects. The nonspendable amount represents inventory.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which measurement focus does the General Fund use?',
        options: [
          'Economic resources',
          'Current financial resources',
          'Cash basis',
          'Accrual basis',
        ],
        correctAnswer: 1,
        explanation: 'Governmental funds use the current financial resources measurement focus.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The total fund balance that is available for any purpose is:',
        options: ['$2,625,000', '$1,550,000', '$1,200,000', '$2,150,000'],
        correctAnswer: 2,
        explanation:
          'Only the unassigned fund balance ($1,200,000) is available for any purpose. Assigned is earmarked but not restricted.',
      },
      {
        id: 'req-3',
        type: 'true_false',
        question:
          'The restricted fund balance can be spent by a simple majority vote of City Council.',
        correctAnswer: false,
        explanation:
          'Restricted fund balance constraints are imposed by external parties or legislation, not by the government itself.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question:
          'If the City needed to spend $500,000 on an emergency that was not budgeted, what is the maximum amount that could come from unrestricted sources?',
        correctAnswer: 2150000,
        tolerance: 0,
        explanation:
          'Unrestricted = Committed + Assigned + Unassigned = $600,000 + $350,000 + $1,200,000 = $2,150,000',
      },
    ],
    hints: [
      'Governmental funds report fund balance in five categories per GASB 54',
      'The hierarchy of constraints: Nonspendable → Restricted → Committed → Assigned → Unassigned',
      'Only unassigned can be used for any purpose; committed requires formal Council action to change',
    ],
    references: ['GASB 54', 'GASB 34'],
  },
  // More FAR TBS...
];

// ==========================================
// REG - TAXATION TBS
// ==========================================
export const REG_TBS: TBS[] = [
  {
    id: 'reg-tbs-001',
    section: 'REG',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Individual Tax Return - Schedule C',
    difficulty: 'medium',
    timeEstimate: 18,
    topic: 'Individual Taxation',
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-2',
    scenario: `
Marcus Chen is a self-employed consultant (SSN: 412-XX-1234). He operates his business as a sole proprietorship called "Chen Consulting." For Year 1, his records show:

Gross receipts: $185,000
Returns and allowances: $2,500

Expenses:
- Office rent: $18,000
- Utilities: $3,600
- Professional development: $2,400
- Business insurance: $4,800
- Office supplies: $1,850
- Business meals (with clients): $4,000
- Computer equipment purchased: $3,200 (Section 179)
- Professional subscriptions: $1,200
- Travel (100% business): $8,500
- Health insurance (self): $9,600

Additional info:
- Business use of home: Not claimed
- Vehicle expenses: Uses standard mileage rate
- Business miles driven: 12,000 miles (IRS rate: $0.67/mile)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'form_field',
        question: 'Complete the following Schedule C fields:',
        fields: [
          { line: 'Line 1 - Gross receipts', correctAnswer: 185000 },
          { line: 'Line 2 - Returns and allowances', correctAnswer: 2500 },
          { line: 'Line 3 - Net receipts (Line 1 - Line 2)', correctAnswer: 182500 },
          { line: 'Line 7 - Gross income', correctAnswer: 182500 },
        ],
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the total deductible business meals expense.',
        correctAnswer: 2000,
        tolerance: 0,
        explanation: 'Business meals are 50% deductible: $4,000 × 50% = $2,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the vehicle expense deduction using the standard mileage rate.',
        correctAnswer: 8040,
        tolerance: 0,
        explanation: '12,000 miles × $0.67 = $8,040',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate total expenses (before Section 179).',
        correctAnswer: 50390,
        tolerance: 10,
        explanation:
          '$18,000 + $3,600 + $2,400 + $4,800 + $1,850 + $2,000 + $1,200 + $8,500 + $8,040 = $50,390',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the net profit from the business (Schedule C, Line 31).',
        correctAnswer: 128910,
        tolerance: 10,
        explanation: '$182,500 - $50,390 - $3,200 (Sec 179) = $128,910',
      },
      {
        id: 'req-6',
        type: 'calculation',
        question:
          'Calculate the self-employment tax (15.3% on 92.35% of net earnings, up to SS limit).',
        correctAnswer: 18196,
        tolerance: 50,
        explanation: '$128,910 × 92.35% × 15.3% = $18,196',
      },
    ],
    hints: [
      'Business meals are limited to 50% deductibility',
      'Section 179 allows immediate expensing of qualifying equipment',
      'Self-employment tax is calculated on 92.35% of net self-employment income',
      'Health insurance premiums for self-employed individuals are an adjustment to income, not a Schedule C deduction',
    ],
    references: ['IRC Section 162', 'IRC Section 179', 'IRC Section 1402'],
  },
  {
    id: 'reg-tbs-002',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'Partnership Basis and Distributions',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Partnership Taxation',
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    scenario: `
Jamie is a 30% partner in JKL Partnership. At the beginning of Year 1, Jamie's outside basis in the partnership was $85,000. During Year 1, the following occurred:

Partnership Operations:
- Ordinary income: $200,000
- Tax-exempt interest income: $10,000
- Charitable contributions: $6,000
- Section 1231 gain: $15,000
- Guaranteed payment to Jamie: $40,000

Distributions to Jamie:
- Cash distribution (March): $25,000
- Property distribution (September):
  - FMV: $30,000
  - Partnership's basis: $22,000

Partnership Liabilities:
- Beginning recourse liabilities: $100,000 (Jamie's share: $30,000)
- Ending recourse liabilities: $120,000 (Jamie's share: $36,000)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: "Calculate Jamie's share of ordinary income.",
        correctAnswer: 60000,
        tolerance: 0,
        explanation: '$200,000 × 30% = $60,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question:
          "Calculate Jamie's share of separately stated items (excluding guaranteed payment).",
        correctAnswer: 5700,
        tolerance: 0,
        explanation:
          'Tax-exempt: $3,000 + Charitable (reduces basis): -$1,800 + Sec 1231: $4,500 = $5,700',
      },
      {
        id: 'req-3',
        type: 'basis_schedule',
        question: "Complete Jamie's basis schedule for Year 1.",
        template: [
          { description: 'Beginning basis', amount: '' },
          { description: 'Share of ordinary income', amount: '' },
          { description: 'Share of tax-exempt income', amount: '' },
          { description: 'Share of Section 1231 gain', amount: '' },
          { description: 'Increase in share of liabilities', amount: '' },
          { description: 'Guaranteed payment', amount: '' },
          { description: 'Share of charitable contributions', amount: '' },
          { description: 'Cash distribution', amount: '' },
          { description: 'Property distribution (basis)', amount: '' },
          { description: 'Ending basis', amount: '' },
        ],
        correctAnswer: [
          { description: 'Beginning basis', amount: 85000 },
          { description: 'Share of ordinary income', amount: 60000 },
          { description: 'Share of tax-exempt income', amount: 3000 },
          { description: 'Share of Section 1231 gain', amount: 4500 },
          { description: 'Increase in share of liabilities', amount: 6000 },
          { description: 'Guaranteed payment', amount: 0 },
          { description: 'Share of charitable contributions', amount: -1800 },
          { description: 'Cash distribution', amount: -25000 },
          { description: 'Property distribution (basis)', amount: -22000 },
          { description: 'Ending basis', amount: 109700 },
        ],
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: "What is Jamie's basis in the property received in the distribution?",
        options: ['$30,000 (FMV)', '$22,000 (carryover basis)', '$25,000', '$0'],
        correctAnswer: 1,
        explanation:
          'In a non-liquidating distribution, the partner takes carryover basis in distributed property, limited to outside basis.',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question:
          "What is Jamie's total income reported from the partnership on his personal return?",
        correctAnswer: 104500,
        tolerance: 0,
        explanation:
          'Ordinary income $60,000 + Guaranteed payment $40,000 + Sec 1231 $4,500 = $104,500 (tax-exempt not included in taxable income)',
      },
    ],
    hints: [
      'Guaranteed payments do not affect basis - they are fully deducted by partnership and income to partner',
      'Tax-exempt income increases basis but is not taxable',
      'Charitable contributions reduce basis and are separately stated',
      "Property distributions reduce basis by the property's basis, not FMV",
    ],
    references: ['IRC Section 705', 'IRC Section 731', 'IRC Section 732'],
  },
  {
    id: 'reg-tbs-003',
    section: 'REG',
    type: TBS_TYPES.CALCULATION,
    title: 'S Corporation Stock Basis',
    difficulty: 'hard',
    timeEstimate: 15,
    topic: 'S Corporation Taxation',
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-B-1',
    scenario: `
Taylor owns 100% of Taylor Corp., an S corporation. At the beginning of Year 1, Taylor's stock basis was $50,000 and debt basis (shareholder loan) was $20,000.

Year 1 S Corporation Activity:
- Ordinary business income: $75,000
- Tax-exempt interest: $5,000
- Section 1231 loss: ($12,000)
- Charitable contributions: $3,000
- Non-deductible expenses (50% meals): $2,000
- Distribution to Taylor: $90,000

Year 2 S Corporation Activity:
- Ordinary business income: $40,000
- Distribution to Taylor: $15,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'basis_schedule',
        question: "Calculate Taylor's stock and debt basis at the end of Year 1.",
        correctAnswer: {
          stockBasis: {
            beginning: 50000,
            ordinaryIncome: 75000,
            taxExempt: 5000,
            sec1231Loss: -12000,
            charitable: -3000,
            nondeductible: -2000,
            distribution: -90000,
            ending: 23000,
          },
          debtBasis: {
            beginning: 20000,
            restoredFromIncome: 0,
            reducedByLoss: 0,
            ending: 20000,
          },
        },
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'How much of the $90,000 distribution is taxable as capital gain?',
        correctAnswer: 0,
        tolerance: 0,
        explanation:
          'Stock basis before distribution = $113,000. Distribution does not exceed basis, so no capital gain.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: "What is Taylor's stock basis at the end of Year 2?",
        correctAnswer: 48000,
        tolerance: 0,
        explanation: '$23,000 + $40,000 income - $15,000 distribution = $48,000',
      },
    ],
    hints: [
      'Stock basis is adjusted in a specific order: income/gains, then deductions/losses, then distributions',
      'Losses cannot reduce stock basis below zero; excess may reduce debt basis',
      'Debt basis must be restored before stock basis can increase from restored debt basis',
    ],
    references: ['IRC Section 1367', 'IRC Section 1368'],
  },
  {
    id: 'reg-tbs-004',
    section: 'REG',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Corporate Tax Return - Form 1120 Calculations',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Corporate Taxation',
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-C-1',
    scenario: `
Vertex Corporation (a C corporation) reports the following for Year 1:

Income:
- Gross sales: $2,500,000
- Cost of goods sold: $1,400,000
- Dividend income (from 25% owned domestic corp): $80,000
- Interest income: $15,000
- Gain on sale of equipment (Sec 1231): $35,000

Expenses:
- Officers' compensation: $350,000
- Salaries and wages: $280,000
- Repairs and maintenance: $45,000
- Bad debts: $12,000
- Rent: $96,000
- Taxes and licenses: $38,000
- Interest expense: $22,000
- Depreciation: $125,000
- Advertising: $65,000
- Employee benefits: $48,000
- Charitable contributions: $50,000
- Meals (business): $20,000
- Federal income tax payments: $85,000

Prior year NOL carryforward: $40,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate gross profit (Line 3 of Form 1120).',
        correctAnswer: 1100000,
        tolerance: 0,
        explanation: '$2,500,000 - $1,400,000 = $1,100,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total income (Line 11 of Form 1120).',
        correctAnswer: 1230000,
        tolerance: 0,
        explanation: '$1,100,000 + $80,000 + $15,000 + $35,000 = $1,230,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the dividends received deduction (DRD).',
        correctAnswer: 52000,
        tolerance: 0,
        explanation: '65% DRD for 20-79% ownership: $80,000 × 65% = $52,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate total deductions (before charitable, DRD, and NOL).',
        correctAnswer: 1091000,
        tolerance: 100,
        explanation:
          'Officers ($350,000) + Salaries ($280,000) + Repairs ($45,000) + Bad debts ($12,000) + Rent ($96,000) + Taxes ($38,000) + Interest ($22,000) + Depreciation ($125,000) + Advertising ($65,000) + Benefits ($48,000) + Meals 50% ($10,000) = $1,091,000. Note: Federal taxes ($85,000) are NOT deductible.',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question:
          'Calculate the charitable contribution deduction limit (10% of taxable income before charitable, DRD, and NOL).',
        correctAnswer: 13900,
        tolerance: 100,
        explanation: '($1,230,000 - $1,091,000) × 10% = $13,900',
      },
      {
        id: 'req-6',
        type: 'calculation',
        question: 'Calculate taxable income.',
        correctAnswer: 33100,
        tolerance: 100,
        explanation:
          '$1,230,000 - $1,091,000 - $13,900 (charitable) - $52,000 (DRD) - $40,000 (NOL) = $33,100',
      },
      {
        id: 'req-7',
        type: 'calculation',
        question: 'Calculate the federal income tax liability (21% rate).',
        correctAnswer: 6951,
        tolerance: 50,
        explanation: '$33,100 × 21% = $6,951',
      },
    ],
    hints: [
      'Federal income taxes paid are never deductible',
      'Business meals are 50% deductible',
      'Charitable contributions limited to 10% of taxable income before charitable, DRD, and NOL',
      'DRD percentage depends on ownership: <20% = 50%, 20-79% = 65%, 80%+ = 100%',
      'Apply deductions in order: regular deductions, then charitable (limited), then DRD, then NOL',
    ],
    references: ['IRC Section 243', 'IRC Section 170', 'IRC Section 11'],
  },
  // More REG TBS...
];

// ==========================================
// AUD - AUDITING TBS
// ==========================================
export const AUD_TBS: TBS[] = [
  {
    id: 'aud-tbs-001',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Audit Report Modifications',
    difficulty: 'hard',
    timeEstimate: 15,
    topic: 'Audit Reports',
    blueprintArea: 'AUD-VI',
    blueprintTopic: 'AUD-VI-B-1',
    scenario: `
You are reviewing the following independent situations for year-end audits. For each situation, determine the appropriate audit report modification.

SITUATION 1:
Omega Corp. changed its depreciation method from declining balance to straight-line. The change is properly disclosed in the notes to the financial statements and the auditor concurs with the change.

SITUATION 2:
Beta Inc. has litigation pending that could result in a loss of $5 million. The possible loss is properly disclosed in the notes. Total assets are $20 million and net income is $800,000.

SITUATION 3:
Gamma LLC refused to allow the auditor to observe the physical inventory count. Inventory is $2 million of $15 million in total assets.

SITUATION 4:
Delta Corp. uses an accounting method for revenue recognition that does not comply with GAAP. The effect is material but not pervasive.

SITUATION 5:
The auditor discovered significant related party transactions that were not disclosed anywhere in the financial statements. The transactions are material.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'matching',
        question: 'Match each situation with the appropriate audit report outcome.',
        items: ['Situation 1', 'Situation 2', 'Situation 3', 'Situation 4', 'Situation 5'],
        options: [
          'Unmodified opinion',
          'Unmodified with Emphasis of Matter paragraph',
          'Qualified opinion - scope limitation',
          'Qualified opinion - departure from GAAP',
          'Adverse opinion',
          'Disclaimer of opinion',
        ],
        correctAnswers: [
          { item: 'Situation 1', answer: 'Unmodified with Emphasis of Matter paragraph' },
          { item: 'Situation 2', answer: 'Unmodified with Emphasis of Matter paragraph' },
          { item: 'Situation 3', answer: 'Qualified opinion - scope limitation' },
          { item: 'Situation 4', answer: 'Qualified opinion - departure from GAAP' },
          { item: 'Situation 5', answer: 'Qualified opinion - departure from GAAP' },
        ],
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question:
          'For Situation 3, what would cause the opinion to change from qualified to a disclaimer?',
        options: [
          'If inventory was material and pervasive',
          'If management provided a written representation about inventory',
          'If the auditor was able to perform alternative procedures',
          'If inventory was immaterial',
        ],
        correctAnswer: 0,
        explanation:
          'A scope limitation that is both material AND pervasive results in a disclaimer of opinion.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question:
          'For Situation 5, if the undisclosed related party transactions were pervasive, what opinion would be issued?',
        options: [
          'Qualified opinion',
          'Adverse opinion',
          'Disclaimer of opinion',
          'Unmodified with Other Matter paragraph',
        ],
        correctAnswer: 1,
        explanation:
          'A departure from GAAP that is material AND pervasive results in an adverse opinion.',
      },
    ],
    hints: [
      "Emphasis of Matter: matter appropriately presented but fundamental to users' understanding",
      'Qualified: material but not pervasive (either scope limitation OR GAAP departure)',
      'Adverse: GAAP departure that is material AND pervasive',
      'Disclaimer: scope limitation that is material AND pervasive',
    ],
    references: ['AU-C 705', 'AU-C 706'],
  },
  {
    id: 'aud-tbs-002',
    section: 'AUD',
    type: TBS_TYPES.CALCULATION,
    title: 'Audit Sampling Calculations',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Audit Sampling',
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-B-1',
    scenario: `
You are planning the audit of accounts receivable for Stellar Manufacturing. The following information is available:

Population:
- Total accounts receivable: $4,500,000
- Number of customer accounts: 2,400
- Book value of sampled items: $450,000

Sampling parameters:
- Desired confidence level: 95%
- Tolerable misstatement: $180,000
- Expected misstatement: $45,000
- Reliability factor for 0 errors at 95%: 3.00
- Reliability factor for 1 error at 95%: 4.75

Sample results:
- 60 items tested
- Audited value of sample: $441,000
- Book value of sample: $450,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the sample misstatement (difference between book and audited value).',
        correctAnswer: 9000,
        tolerance: 0,
        explanation: '$450,000 - $441,000 = $9,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the projected misstatement using ratio estimation.',
        correctAnswer: 90000,
        tolerance: 100,
        explanation: '($9,000 / $450,000) × $4,500,000 = $90,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the basic precision (allowance for sampling risk) assuming no errors.',
        correctAnswer: 225000,
        tolerance: 1000,
        explanation: '($4,500,000 / 60) × 3.00 = $225,000',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question:
          'Based on your calculations, should the auditor accept the book value of accounts receivable?',
        options: [
          'Yes, because projected misstatement is less than tolerable misstatement',
          'No, because projected misstatement plus allowance exceeds tolerable misstatement',
          'Yes, because sample misstatement is immaterial',
          'Cannot determine without additional testing',
        ],
        correctAnswer: 1,
        explanation:
          'Upper limit = $90,000 projected + $225,000 allowance = $315,000, which exceeds $180,000 tolerable misstatement.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'What action should the auditor take?',
        options: [
          'Issue a qualified opinion',
          'Request management adjust the balance and/or perform additional procedures',
          'Issue an adverse opinion',
          'Accept the balance as stated',
        ],
        correctAnswer: 1,
        explanation:
          'When projected misstatement exceeds tolerable, the auditor should request adjustment and/or expand testing.',
      },
    ],
    hints: [
      'Projected misstatement = (Sample misstatement / Sample book value) × Population book value',
      'Basic precision = (Population / Sample size) × Reliability factor',
      'Upper limit of misstatement = Projected misstatement + Allowance for sampling risk',
      'Accept if upper limit ≤ tolerable misstatement',
    ],
    references: ['AU-C 530'],
  },
  {
    id: 'aud-tbs-003',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Internal Control Deficiency Evaluation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Internal Control',
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-B-1',
    scenario: `
During the audit of Precision Parts Inc., you identified the following internal control issues:

DEFICIENCY A:
The accounts payable clerk can create new vendors in the master file and also process payments. There is no independent review of new vendor additions. Last year, a fictitious vendor was discovered, resulting in $35,000 in fraudulent payments.

DEFICIENCY B:
Bank reconciliations are prepared by the cashier who handles cash receipts. The reconciliations are reviewed by the controller monthly, but the review is not documented.

DEFICIENCY C:
The company does not have a formal policy requiring management to review and approve journal entries over $5,000. The CFO informally reviews most large entries.

DEFICIENCY D:
Physical inventory counts are performed annually, but the count teams do not include anyone independent of the warehouse function. Variances between book and physical have averaged 2% of inventory value ($8,000 on $400,000 inventory).

DEFICIENCY E:
The company recently implemented a new ERP system. User access rights were migrated from the old system without review. Several former employees still have active access credentials.

Additional Information:
- Total revenues: $12,000,000
- Total assets: $8,000,000
- Net income: $600,000
- Materiality: $120,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'classification',
        question:
          'Classify each deficiency as a Control Deficiency (CD), Significant Deficiency (SD), or Material Weakness (MW).',
        items: ['Deficiency A', 'Deficiency B', 'Deficiency C', 'Deficiency D', 'Deficiency E'],
        options: ['Control Deficiency', 'Significant Deficiency', 'Material Weakness'],
        correctAnswers: [
          { item: 'Deficiency A', answer: 'Material Weakness' },
          { item: 'Deficiency B', answer: 'Significant Deficiency' },
          { item: 'Deficiency C', answer: 'Significant Deficiency' },
          { item: 'Deficiency D', answer: 'Control Deficiency' },
          { item: 'Deficiency E', answer: 'Material Weakness' },
        ],
      },
      {
        id: 'req-2',
        type: 'multiple_select',
        question:
          'Which deficiencies must be communicated in writing to those charged with governance?',
        options: ['Deficiency A', 'Deficiency B', 'Deficiency C', 'Deficiency D', 'Deficiency E'],
        correctAnswers: ['Deficiency A', 'Deficiency B', 'Deficiency C', 'Deficiency E'],
        explanation:
          'Significant deficiencies and material weaknesses must be communicated in writing to those charged with governance.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question:
          'What is the key factor that elevates Deficiency A from significant deficiency to material weakness?',
        options: [
          'The segregation of duties issue',
          'The actual fraud that occurred',
          'The dollar amount of $35,000',
          'The lack of independent review',
        ],
        correctAnswer: 1,
        explanation:
          'The actual occurrence of fraud indicates the control failure resulted in a misstatement, making this a material weakness.',
      },
      {
        id: 'req-4',
        type: 'short_answer',
        question: 'For Deficiency B, what compensating control exists, and why is it insufficient?',
        keyPoints: [
          'Controller review is a compensating control',
          'Lack of documentation of review',
          'Cannot verify review was performed',
          'Preparer should not perform reconciliation',
        ],
      },
    ],
    hints: [
      'Material Weakness: reasonable possibility of material misstatement not prevented/detected',
      'Significant Deficiency: less severe than MW but important enough to merit attention',
      'Consider both likelihood and magnitude when evaluating severity',
      'Prior control failures (actual misstatements) are strong indicators of material weakness',
    ],
    references: ['AU-C 265', 'PCAOB AS 2201'],
  },
  // More AUD TBS...
];

// ==========================================
// BEC - BUSINESS TBS
// ==========================================
export const BEC_TBS: TBS[] = [
  {
    id: 'bec-tbs-001',
    section: 'BEC',
    type: TBS_TYPES.CALCULATION,
    title: 'Capital Budgeting Analysis',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Financial Management',
    scenario: `
Apex Manufacturing is considering purchasing new automated equipment. The following information is available:

Initial Investment:
- Equipment cost: $500,000
- Installation costs: $50,000
- Training costs: $25,000
- Increase in working capital: $30,000

Annual Operating Data (Years 1-5):
- Annual revenue increase: $280,000
- Annual operating cost savings: $85,000
- Annual maintenance: $35,000
- Annual depreciation (straight-line): $110,000

Other Information:
- Tax rate: 25%
- Required rate of return: 12%
- Salvage value at end of Year 5: $50,000 (taxable)
- Working capital recovered at end of Year 5

Present Value Factors at 12%:
Year 1: 0.8929  Year 2: 0.7972  Year 3: 0.7118  Year 4: 0.6355  Year 5: 0.5674
PV of annuity, 5 years: 3.6048
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the total initial investment (Year 0 cash outflow).',
        correctAnswer: 605000,
        tolerance: 0,
        explanation: '$500,000 + $50,000 + $25,000 + $30,000 = $605,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the annual after-tax operating cash flow (Years 1-5).',
        correctAnswer: 275000,
        tolerance: 100,
        explanation:
          'Revenue increase + Cost savings - Maintenance = $330,000. After-tax: $330,000 × (1-0.25) + $110,000 × 0.25 = $247,500 + $27,500 = $275,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the terminal year (Year 5) total after-tax cash flow.',
        correctAnswer: 342500,
        tolerance: 100,
        explanation:
          'Operating CF $275,000 + Salvage after-tax ($50,000 × 0.75) + WC recovery $30,000 = $342,500',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the Net Present Value (NPV) of the project.',
        correctAnswer: 424620,
        tolerance: 1000,
        explanation:
          'Years 1-4 operating CF: $275,000 each. Year 5 total CF: $275,000 + $37,500 (salvage after-tax) + $30,000 (WC) = $342,500. NPV = -$605,000 + ($275,000 × 0.8929) + ($275,000 × 0.7972) + ($275,000 × 0.7118) + ($275,000 × 0.6355) + ($342,500 × 0.5674) = -$605,000 + $245,548 + $219,230 + $195,745 + $174,763 + $194,334 = $424,620',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Should Apex accept this project based on NPV analysis?',
        options: [
          'Yes, because NPV is positive',
          'No, because NPV is negative',
          'Indifferent, because NPV is zero',
          'Cannot determine without IRR',
        ],
        correctAnswer: 0,
        explanation: 'Accept projects with positive NPV as they add value to the firm.',
      },
      {
        id: 'req-6',
        type: 'calculation',
        question: 'Calculate the payback period (ignore time value of money).',
        correctAnswer: 2.2,
        tolerance: 0.1,
        explanation: '$605,000 ÷ $275,000 = 2.2 years',
      },
    ],
    hints: [
      'Initial investment includes all costs to get the asset ready for use plus working capital',
      'After-tax cash flow = (Revenue - Cash expenses) × (1 - tax rate) + (Depreciation × tax rate)',
      'The depreciation tax shield adds to cash flow even though depreciation is non-cash',
      'Terminal cash flow includes salvage (net of tax) and working capital recovery',
    ],
    references: ['Capital Budgeting', 'Time Value of Money'],
  },
  {
    id: 'bec-tbs-002',
    section: 'BEC',
    type: TBS_TYPES.CALCULATION,
    title: 'Cost-Volume-Profit Analysis',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Cost Accounting',
    scenario: `
Summit Products manufactures a single product. The following information is available:

Current Operations:
- Selling price per unit: $80
- Variable cost per unit: $48
- Fixed costs: $240,000
- Current sales volume: 10,000 units

Proposed Changes:
Management is considering the following independent alternatives:

Alternative A: Increase advertising by $30,000, expecting a 15% increase in unit sales.

Alternative B: Decrease selling price by 10%, expecting a 25% increase in unit sales.

Alternative C: Automate production, increasing fixed costs by $60,000 but reducing variable costs to $40 per unit. Sales volume expected to remain the same.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the current contribution margin per unit.',
        correctAnswer: 32,
        tolerance: 0,
        explanation: '$80 - $48 = $32',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the current break-even point in units.',
        correctAnswer: 7500,
        tolerance: 0,
        explanation: '$240,000 ÷ $32 = 7,500 units',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate current operating income.',
        correctAnswer: 80000,
        tolerance: 0,
        explanation: '(10,000 × $32) - $240,000 = $80,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate operating income under Alternative A.',
        correctAnswer: 98000,
        tolerance: 0,
        explanation:
          'Units = 10,000 × 1.15 = 11,500. CM/unit = $32. Total CM = 11,500 × $32 = $368,000. Fixed costs = $240,000 + $30,000 = $270,000. Operating income = $368,000 - $270,000 = $98,000',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate operating income under Alternative B.',
        correctAnswer: 60000,
        tolerance: 0,
        explanation:
          'New SP = $72, New CM = $24, Units = 12,500. OI = (12,500 × $24) - $240,000 = $60,000',
      },
      {
        id: 'req-6',
        type: 'calculation',
        question: 'Calculate operating income under Alternative C.',
        correctAnswer: 100000,
        tolerance: 0,
        explanation: 'New CM = $40, New FC = $300,000. OI = (10,000 × $40) - $300,000 = $100,000',
      },
      {
        id: 'req-7',
        type: 'multiple_choice',
        question: 'Which alternative should management choose to maximize operating income?',
        options: ['Current operations', 'Alternative A', 'Alternative B', 'Alternative C'],
        correctAnswer: 3,
        explanation: 'Alternative C provides the highest operating income at $100,000.',
      },
    ],
    hints: [
      'Contribution margin = Selling price - Variable cost per unit',
      'Break-even point = Fixed costs ÷ Contribution margin per unit',
      'Operating income = Total contribution margin - Fixed costs',
      'Evaluate each alternative independently against current operations',
    ],
    references: ['CVP Analysis', 'Break-Even Analysis'],
  },
  {
    id: 'bec-tbs-003',
    section: 'BEC',
    type: TBS_TYPES.WRITTEN_COMMUNICATION,
    title: 'Internal Control Memo',
    difficulty: 'medium',
    timeEstimate: 25,
    topic: 'Corporate Governance',
    scenario: `
You are a senior accountant at a mid-sized manufacturing company. The CFO has asked you to write a memo to the Board of Directors explaining the company's internal control framework and recent improvements made to address prior audit findings.

Background:
- The company implemented COSO 2013 framework last year
- Prior year audit identified weaknesses in IT general controls
- New ERP system was implemented 6 months ago
- Segregation of duties has been enhanced in the cash disbursement cycle

Write a professional memo addressing:
1. Overview of the COSO framework components
2. How the recent improvements address the framework
3. Ongoing monitoring activities
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'written_response',
        question:
          'Write a professional memo (approximately 300-400 words) addressing the points above.',
        rubric: {
          content: {
            weight: 40,
            criteria: [
              'Correctly identifies all 5 COSO components',
              'Explains how improvements address control environment and control activities',
              'Discusses monitoring activities appropriately',
            ],
          },
          organization: {
            weight: 30,
            criteria: [
              'Proper memo format with To, From, Date, Subject',
              'Clear introduction, body, and conclusion',
              'Logical flow of ideas',
            ],
          },
          writing: {
            weight: 30,
            criteria: [
              'Professional tone appropriate for Board communication',
              'Clear and concise language',
              'Proper grammar and spelling',
            ],
          },
        },
        sampleResponse: `
MEMO

TO: Board of Directors
FROM: [Senior Accountant]
DATE: [Current Date]
RE: Internal Control Framework and Recent Improvements

I am writing to provide an overview of our internal control framework and the improvements implemented to address prior audit findings.

COSO Framework Overview

Our company has adopted the COSO 2013 Internal Control - Integrated Framework, which consists of five interrelated components:

1. Control Environment - The foundation that establishes the tone at the top and influences control consciousness
2. Risk Assessment - The process of identifying and analyzing risks to achieving objectives
3. Control Activities - Policies and procedures that help ensure management directives are carried out
4. Information and Communication - Systems that support the identification and exchange of information
5. Monitoring Activities - Processes that assess the quality of internal control over time

Improvements Addressing Prior Findings

To address the IT general control weaknesses identified in the prior audit, we implemented a new ERP system with enhanced security features including role-based access controls, automated segregation of duties enforcement, and comprehensive audit trails.

Additionally, we strengthened segregation of duties in the cash disbursement cycle by implementing a three-way match requirement and separating vendor master file maintenance from payment processing functions.

Ongoing Monitoring

Management performs ongoing monitoring through daily reconciliations, monthly management reviews, and quarterly control self-assessments. Internal audit conducts periodic testing of key controls, and we maintain open communication with our external auditors.

Please contact me if you have any questions regarding our internal control framework.
        `,
      },
    ],
    hints: [
      'Use proper business memo format',
      'Be specific about COSO components (Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring)',
      'Connect the improvements directly to the framework',
      'Maintain professional tone appropriate for Board-level communication',
    ],
    references: ['COSO Internal Control Framework 2013', 'SOX Section 404'],
  },
  // More BEC TBS...
];

// Combine all TBS (original + additional)
export const FAR_TBS_ALL: TBS[] = [...FAR_TBS, ...FAR_TBS_2];
export const REG_TBS_ALL: TBS[] = [...REG_TBS, ...REG_TBS_2];
export const AUD_TBS_ALL: TBS[] = [...AUD_TBS, ...AUD_TBS_2];
export const BEC_TBS_ALL: TBS[] = [...BEC_TBS, ...BEC_TBS_2];

// New 2024 CPA exam sections with NATIVE TBS content
export const BAR_TBS_ALL: TBS[] = [...BAR_TBS]; // Business Analysis & Reporting - 10 native TBS
export const ISC_TBS_ALL: TBS[] = [...ISC_TBS]; // Information Systems & Controls - 8 native TBS  
export const TCP_TBS_ALL: TBS[] = [...TCP_TBS]; // Tax Compliance & Planning - 10 native TBS

export const ALL_TBS: TBS[] = [...FAR_TBS_ALL, ...REG_TBS_ALL, ...AUD_TBS_ALL, ...BEC_TBS_ALL, ...BAR_TBS_ALL, ...ISC_TBS_ALL, ...TCP_TBS_ALL];

// Helper functions
export const getTBSBySection = (section: ExamSection) => {
  switch (section) {
    case 'FAR':
      return FAR_TBS_ALL;
    case 'REG':
      return REG_TBS_ALL;
    case 'AUD':
      return AUD_TBS_ALL;
    case 'BEC':
      return BEC_TBS_ALL;
    case 'BAR':
      return BAR_TBS_ALL;
    case 'ISC':
      return ISC_TBS_ALL;
    case 'TCP':
      return TCP_TBS_ALL;
    default:
      return FAR_TBS_ALL; // Default to FAR instead of empty
  }
};

export const getTBSByType = (type: TBSType) => ALL_TBS.filter((tbs) => tbs.type === type);

export const getTBSById = (id: string) => ALL_TBS.find((tbs) => tbs.id === id);

export const getTBSStats = () => ({
  total: ALL_TBS.length,
  bySection: {
    FAR: FAR_TBS_ALL.length,
    REG: REG_TBS_ALL.length,
    AUD: AUD_TBS_ALL.length,
    BEC: BEC_TBS_ALL.length,
  },
  byType: Object.values(TBS_TYPES).reduce((acc: Record<string, number>, type) => {
    acc[type] = ALL_TBS.filter((tbs) => tbs.type === type).length;
    return acc;
  }, {}),
  byDifficulty: {
    easy: ALL_TBS.filter((t) => t.difficulty === 'easy').length,
    medium: ALL_TBS.filter((t) => t.difficulty === 'medium').length,
    hard: ALL_TBS.filter((t) => t.difficulty === 'hard').length,
  },
});

export default ALL_TBS;
