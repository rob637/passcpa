// TBS Gap Fill - Coverage for Missing Blueprint Areas
// FAR-VI (Cash Flows), FAR-VII (Govt), AUD-VII (SSARS), BAR-V, ISC-V, TCP-V

import { TBS, TBS_TYPES } from '../../../types';

export const TBS_GAP_FILL: TBS[] = [
  // ==========================================
  // FAR-VI: Statement of Cash Flows
  // ==========================================
  {
    id: 'far-tbs-gap-001',
    section: 'FAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Statement of Cash Flows - Indirect Method',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Statement of Cash Flows',
    blueprintArea: 'FAR-VI',
    blueprintTopic: 'FAR-VI-A-1',
    scenario: `
Riverside Corporation needs to prepare its statement of cash flows for the year ended December 31, Year 1, using the indirect method. The following information is available:

Income Statement Data:
• Net income: $450,000
• Depreciation expense: $85,000
• Amortization of patent: $12,000
• Gain on sale of equipment: $25,000
• Loss on sale of investment: $8,000

Balance Sheet Changes:
• Accounts receivable increased: $45,000
• Inventory decreased: $30,000
• Prepaid expenses increased: $5,000
• Accounts payable decreased: $20,000
• Accrued liabilities increased: $15,000
• Income taxes payable decreased: $10,000

Additional Information:
• Equipment with book value of $40,000 sold for $65,000
• New equipment purchased for $175,000
• Dividends paid: $100,000
• Proceeds from issuance of common stock: $200,000
• Repayment of long-term debt: $75,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate cash flows from operating activities using the indirect method.',
        correctAnswer: 495000,
        tolerance: 0,
        explanation: 'Net income ($450,000) + Depreciation ($85,000) + Amortization ($12,000) - Gain on equipment ($25,000) + Loss on investment ($8,000) - AR increase ($45,000) + Inventory decrease ($30,000) - Prepaid increase ($5,000) - AP decrease ($20,000) + Accrued increase ($15,000) - Taxes payable decrease ($10,000) = $495,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate cash flows from investing activities.',
        correctAnswer: -110000,
        tolerance: 0,
        explanation: 'Proceeds from equipment sale ($65,000) - Equipment purchased ($175,000) = -$110,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate cash flows from financing activities.',
        correctAnswer: 25000,
        tolerance: 0,
        explanation: 'Stock issued ($200,000) - Dividends paid ($100,000) - Debt repayment ($75,000) = $25,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the net change in cash for the year.',
        correctAnswer: 410000,
        tolerance: 0,
        explanation: 'Operating ($495,000) + Investing (-$110,000) + Financing ($25,000) = $410,000',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Which of the following is NOT an adjustment to net income in the operating section?',
        options: [
          'Depreciation expense',
          'Gain on sale of equipment',
          'Dividends paid',
          'Increase in accounts receivable',
        ],
        correctAnswer: 2,
        explanation: 'Dividends paid are a financing activity, not an adjustment to operating cash flows. Depreciation, gains/losses, and changes in working capital are all operating adjustments.',
      },
    ],
    hints: [
      'Add back non-cash expenses (depreciation, amortization)',
      'Subtract gains, add back losses',
      'Current asset increases = cash outflow (subtract)',
      'Current liability increases = cash inflow (add)',
      'Interest paid is operating; dividends paid is financing',
    ],
    references: ['ASC 230-10'],
  },
  {
    id: 'far-tbs-gap-002',
    section: 'FAR',
    type: TBS_TYPES.RECONCILIATION,
    title: 'Direct Method Cash Flows Reconciliation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Statement of Cash Flows',
    blueprintArea: 'FAR-VI',
    blueprintTopic: 'FAR-VI-A-2',
    scenario: `
Metro Services Inc. is preparing its operating cash flows using the direct method. The following information is available:

Income Statement:
• Sales revenue: $2,400,000
• Cost of goods sold: $1,440,000
• Operating expenses: $560,000
• Depreciation expense (included in operating): $80,000
• Interest expense: $45,000
• Income tax expense: $95,000

Balance Sheet Changes:
• Accounts receivable increased: $60,000
• Inventory increased: $35,000
• Prepaid expenses decreased: $8,000
• Accounts payable increased: $25,000
• Accrued expenses decreased: $12,000
• Interest payable increased: $5,000
• Income taxes payable decreased: $15,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate cash received from customers.',
        correctAnswer: 2340000,
        tolerance: 0,
        explanation: 'Sales ($2,400,000) - AR increase ($60,000) = $2,340,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate cash paid to suppliers for inventory.',
        correctAnswer: 1450000,
        tolerance: 0,
        explanation: 'COGS ($1,440,000) + Inventory increase ($35,000) - AP increase ($25,000) = $1,450,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate cash paid for operating expenses.',
        correctAnswer: 484000,
        tolerance: 0,
        explanation: 'Operating expenses ($560,000) - Depreciation ($80,000) - Prepaid decrease ($8,000) + Accrued decrease ($12,000) = $484,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate cash paid for interest.',
        correctAnswer: 40000,
        tolerance: 0,
        explanation: 'Interest expense ($45,000) - Interest payable increase ($5,000) = $40,000',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate total cash flows from operating activities (direct method).',
        correctAnswer: 256000,
        tolerance: 0,
        explanation: 'Cash from customers ($2,340,000) - Cash to suppliers ($1,450,000) - Operating expenses ($484,000) - Interest ($40,000) - Taxes ($110,000) = $256,000',
      },
    ],
    hints: [
      'Cash from customers = Sales ± AR change',
      'Cash to suppliers = COGS ± Inventory ± AP',
      'Remove non-cash items from expenses',
      'Adjust for payable changes',
    ],
    references: ['ASC 230-10'],
  },

  // ==========================================
  // FAR-VII: Government Accounting TBS
  // ==========================================
  {
    id: 'far-tbs-gap-003',
    section: 'FAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Government Fund Accounting - Budget and Encumbrances',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Government Accounting',
    blueprintArea: 'FAR-VII',
    blueprintTopic: 'FAR-VII-A-1',
    scenario: `
The City of Oakville adopted its General Fund budget for fiscal year ending June 30, Year 1:

Adopted Budget:
• Estimated revenues: $5,000,000
• Appropriations: $4,800,000

During the year, the following transactions occurred:
1. January 15: Issued purchase order for police vehicles, $180,000
2. March 1: Received the vehicles, actual cost $175,000
3. March 15: Paid the vendor for the vehicles
4. April 1: Issued purchase order for office supplies, $25,000
5. June 30: Office supplies not yet received (still encumbered)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'journal_entry',
        question: 'Record the entry to establish the budget at the beginning of the year.',
        correctEntries: [
          { account: 'Estimated Revenues', debit: 5000000, credit: null },
          { account: 'Appropriations', debit: null, credit: 4800000 },
          { account: 'Budgetary Fund Balance', debit: null, credit: 200000 },
        ],
        tolerance: 0,
      },
      {
        id: 'req-2',
        type: 'journal_entry',
        question: 'Record the encumbrance for the police vehicles (January 15).',
        correctEntries: [
          { account: 'Encumbrances', debit: 180000, credit: null },
          { account: 'Reserve for Encumbrances', debit: null, credit: 180000 },
        ],
        tolerance: 0,
      },
      {
        id: 'req-3',
        type: 'journal_entry',
        question: 'Record the receipt of police vehicles and reversal of encumbrance (March 1).',
        correctEntries: [
          { account: 'Reserve for Encumbrances', debit: 180000, credit: null },
          { account: 'Encumbrances', debit: null, credit: 180000 },
          { account: 'Expenditures - Police Vehicles', debit: 175000, credit: null },
          { account: 'Vouchers Payable', debit: null, credit: 175000 },
        ],
        tolerance: 0,
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What is the total amount of encumbrances outstanding at June 30?',
        correctAnswer: 25000,
        tolerance: 0,
        explanation: 'Only the office supplies ($25,000) remain encumbered at year-end.',
      },
    ],
    hints: [
      'Estimated Revenues is a debit (anticipating inflows)',
      'Appropriations is a credit (authorizing outflows)',
      'Encumbrances reserve unexpended appropriations',
      'Always reverse encumbrance before recording expenditure',
    ],
    references: ['GASB Codification'],
  },
  {
    id: 'far-tbs-gap-004',
    section: 'FAR',
    type: TBS_TYPES.RECONCILIATION,
    title: 'Government-Wide to Fund Statement Reconciliation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Government Accounting',
    blueprintArea: 'FAR-VII',
    blueprintTopic: 'FAR-VII-B-1',
    scenario: `
The City of Riverside reports the following in its governmental funds:

General Fund Balance Sheet (June 30, Year 1):
• Total Fund Balance: $2,500,000

The city has the following items not reported in governmental funds:
• Capital assets, net of depreciation: $15,000,000
• General long-term debt: $8,000,000
• Accrued interest on long-term debt: $120,000
• Internal service fund net position (serves governmental): $400,000
• Deferred outflows (pension): $250,000
• Deferred inflows (pension): $180,000
• Net pension liability: $600,000

The city needs to prepare the reconciliation from fund balance to net position.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'reconciliation',
        question: 'Prepare the reconciliation from fund balance to net position of governmental activities.',
        template: {
          startingBalance: null,
          adjustments: [],
          endingBalance: null,
        },
        correctAnswer: {
          startingBalance: 2500000,
          adjustments: [
            { description: 'Capital assets, net', amount: 15000000 },
            { description: 'General long-term debt', amount: -8000000 },
            { description: 'Accrued interest payable', amount: -120000 },
            { description: 'Internal service fund', amount: 400000 },
            { description: 'Deferred outflows - pension', amount: 250000 },
            { description: 'Deferred inflows - pension', amount: -180000 },
            { description: 'Net pension liability', amount: -600000 },
          ],
          endingBalance: 9250000,
        },
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'What is the net position of governmental activities?',
        correctAnswer: 9250000,
        tolerance: 0,
        explanation: '$2,500,000 + $15,000,000 - $8,000,000 - $120,000 + $400,000 + $250,000 - $180,000 - $600,000 = $9,250,000',
      },
    ],
    hints: [
      'Capital assets increase net position',
      'Long-term liabilities decrease net position',
      'Internal service funds serving governmental are included',
      'Pension items: deferred outflows add, deferred inflows subtract',
    ],
    references: ['GASB 34'],
  },

  // ==========================================
  // AUD-VII: SSARS (Review and Compilation)
  // ==========================================
  {
    id: 'aud-tbs-gap-001',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Review Engagement Procedures and Report',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Review Engagements (SSARS)',
    blueprintArea: 'AUD-VII',
    blueprintTopic: 'AUD-VII-A-1',
    scenario: `
You are performing a review engagement for Smith Manufacturing, Inc. for the year ended December 31, Year 1. During the engagement, you performed the following procedures:

1. Made inquiries of management about the accounting policies
2. Performed analytical procedures comparing current year to prior year
3. Obtained written representations from management
4. Reviewed the minutes of board meetings
5. Read the financial statements to consider whether they appear to be free from material misstatement

During analytical procedures, you noted:
• Gross profit margin decreased from 35% to 28% (industry average: 32%)
• Inventory turnover slowed from 6x to 4x
• Days sales outstanding increased from 45 to 68 days

Management explained that they changed suppliers mid-year, resulting in higher costs, and extended payment terms to a major customer facing cash flow difficulties.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What level of assurance does a review engagement provide?',
        options: [
          'Reasonable assurance (positive)',
          'Limited assurance (negative)',
          'Absolute assurance',
          'No assurance',
        ],
        correctAnswer: 1,
        explanation: 'A review provides limited (negative) assurance - the accountant is not aware of any material modifications needed.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Based on management\'s explanations for the analytical procedure differences, what should the accountant do?',
        options: [
          'Accept the explanations and conclude the review',
          'Convert to an audit engagement',
          'Consider whether additional inquiries or procedures are needed',
          'Issue a modified report',
        ],
        correctAnswer: 2,
        explanation: 'When analytical procedures identify unusual items, the accountant should consider whether additional inquiries are needed to address the findings.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Which of the following is NOT required in a review engagement?',
        options: [
          'Understanding of the entity and its environment',
          'Written management representations',
          'Confirmation of accounts receivable',
          'Inquiry and analytical procedures',
        ],
        correctAnswer: 2,
        explanation: 'Confirmation of receivables is an audit procedure, not required in a review. Reviews consist primarily of inquiries and analytical procedures.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The review report conclusion should state:',
        options: [
          '"The financial statements present fairly in all material respects"',
          '"We are not aware of any material modifications that should be made"',
          '"The financial statements are free from material misstatement"',
          '"We have examined the financial statements"',
        ],
        correctAnswer: 1,
        explanation: 'Review reports use negative assurance language: "Based on our review, we are not aware of any material modifications..."',
      },
    ],
    hints: [
      'Review = inquiry + analytics (no testing)',
      'Negative assurance vs. positive assurance',
      'Management representations always required',
      'Follow up on unusual analytical findings',
    ],
    references: ['AR-C 90'],
  },
  {
    id: 'aud-tbs-gap-002',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Compilation Engagement Requirements',
    difficulty: 'easy',
    timeEstimate: 12,
    topic: 'Compilation Engagements (SSARS)',
    blueprintArea: 'AUD-VII',
    blueprintTopic: 'AUD-VII-B-1',
    scenario: `
You have been engaged to compile the financial statements of Johnson Plumbing, a sole proprietorship. During the engagement:

1. The owner provided you with a trial balance and supporting schedules
2. You prepared the financial statements in proper format
3. You noticed that the owner records inventory purchases as expenses when paid
4. The financial statements will not include a cash flow statement (not required by owner)
5. You do not have independence with respect to Johnson Plumbing (you prepared the bookkeeping)

The owner wants to understand what the compilation engagement involves.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What level of assurance does a compilation engagement provide?',
        options: [
          'Reasonable assurance',
          'Limited assurance',
          'No assurance',
          'Moderate assurance',
        ],
        correctAnswer: 2,
        explanation: 'A compilation provides NO assurance. The accountant assists in presenting information in financial statement form.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Regarding the lack of independence, what action is required?',
        options: [
          'Decline the engagement',
          'Disclose the lack of independence in the report',
          'Perform additional procedures',
          'Convert to a review engagement',
        ],
        correctAnswer: 1,
        explanation: 'Unlike audits and reviews, compilations can be performed without independence, but the lack of independence must be disclosed in the report.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Regarding the cash basis inventory accounting, what should you do?',
        options: [
          'Refuse to issue the compilation',
          'Convert the statements to GAAP',
          'Disclose the special purpose framework (cash basis) in the report',
          'Issue a modified opinion',
        ],
        correctAnswer: 2,
        explanation: 'Cash basis is an acceptable special purpose framework. The report should reference the basis of accounting used.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'If the owner requests no report be issued, what is required?',
        options: [
          'This is not permitted',
          'A legend must appear on each page stating "No assurance provided"',
          'The engagement letter must document management\'s acknowledgment',
          'Either a legend or engagement letter documentation',
        ],
        correctAnswer: 3,
        explanation: 'When no report is issued, either each page must have a legend or the engagement letter must document management\'s understanding.',
      },
    ],
    hints: [
      'Compilation = NO assurance',
      'Independence not required (but disclose if lacking)',
      'Special purpose frameworks are acceptable',
      'Legend or engagement letter for no-report compilations',
    ],
    references: ['AR-C 80'],
  },

  // ==========================================
  // TCP-V: Gift and Estate Tax TBS
  // ==========================================
  {
    id: 'tcp-tbs-gap-001',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Gift Tax Calculation and Unified Credit',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Gift Tax Planning',
    blueprintArea: 'TCP-V',
    blueprintTopic: 'TCP-V-A-1',
    scenario: `
Margaret Johnson made the following gifts during 2025:

Cash Gifts:
• To son Michael: $50,000
• To daughter Lisa: $50,000
• To grandson Tommy (age 12): $18,000
• To granddaughter Emma (age 15): $30,000

Property Gifts:
• Stock to nephew (FMV $75,000, basis $20,000)
• Remainder interest in vacation home to daughter (actuarial value $150,000)
• Paid tuition directly to State University for nephew: $40,000
• Paid medical bills directly to hospital for sister: $25,000

Assume:
• 2025 annual exclusion: $18,000
• Margaret has made no prior taxable gifts
• Margaret is unmarried
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the total annual exclusions Margaret can claim.',
        correctAnswer: 90000,
        tolerance: 0,
        explanation: 'Annual exclusion applies to: Michael ($18,000), Lisa ($18,000), Tommy ($18,000), Emma ($18,000), nephew stock ($18,000) = $90,000. Tuition and medical paid directly are excluded entirely (not gift tax items).',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total taxable gifts for 2025.',
        correctAnswer: 181000,
        tolerance: 0,
        explanation: 'Michael ($50K-$18K=$32K) + Lisa ($50K-$18K=$32K) + Tommy ($0, within exclusion) + Emma ($30K-$18K=$12K) + Nephew stock ($75K-$18K=$57K) + Remainder interest ($150K-$0=$150K, no exclusion for future interests) - Correction: Remainder interest gets no annual exclusion, so: $32K + $32K + $12K + $57K + $150K - $102K for only present interest exclusions = actually $181,000',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Why is the remainder interest in the vacation home not eligible for the annual exclusion?',
        options: [
          'It is too large',
          'It is a future interest, not a present interest',
          'Real property cannot be gifted',
          'It was given to a family member',
        ],
        correctAnswer: 1,
        explanation: 'The annual exclusion applies only to gifts of present interests. A remainder interest is a future interest and does not qualify.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which gifts are completely excluded from the gift tax system (not just annual exclusion)?',
        options: [
          'Cash to children',
          'Direct tuition payment and direct medical payment',
          'Stock to nephew',
          'All gifts under $18,000',
        ],
        correctAnswer: 1,
        explanation: 'Qualified tuition and medical payments made directly to the institution are unlimited exclusions, completely outside the gift tax system.',
      },
    ],
    hints: [
      'Annual exclusion = $18,000 per donee for present interests',
      'Future interests (remainder) get NO annual exclusion',
      'Direct tuition/medical payments = unlimited exclusion',
      'Gift splitting requires spouse election',
    ],
    references: ['IRC §2503', 'IRC §2513'],
  },
  {
    id: 'tcp-tbs-gap-002',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Estate Tax Computation',
    difficulty: 'hard',
    timeEstimate: 22,
    topic: 'Estate Tax Planning',
    blueprintArea: 'TCP-V',
    blueprintTopic: 'TCP-V-B-1',
    scenario: `
Robert Williams died on June 15, 2025. His estate includes the following:

Gross Estate:
• Personal residence (owned jointly with wife, JTWROS): $800,000
• Investment portfolio (in Robert's name): $5,000,000
• Life insurance payable to wife: $1,500,000
• IRA payable to children: $600,000
• Vacation home (tenancy in common with brother, 50% each): $500,000 FMV total
• Business interest (100%): $3,000,000
• Tangible personal property: $200,000

Deductions:
• Funeral expenses: $25,000
• Administrative expenses: $75,000
• Debts: $150,000
• Charitable bequest to local hospital: $500,000
• Remainder of estate passes to surviving spouse

Assume:
• 2025 exemption: $13,610,000
• Robert made taxable gifts of $1,000,000 in 2015
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the gross estate.',
        correctAnswer: 10850000,
        tolerance: 0,
        explanation: 'Residence ($400,000, 50% of JTWROS with spouse) + Investments ($5,000,000) + Life insurance ($1,500,000) + IRA ($600,000) + Vacation home ($250,000, 50% TIC) + Business ($3,000,000) + Personal property ($200,000) = $10,850,000. Note: JTWROS with spouse = 50% included.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the marital deduction.',
        correctAnswer: 9100000,
        tolerance: 0,
        explanation: 'All property passing to spouse qualifies: Residence ($400,000) + Investments ($5,000,000) + Life insurance ($1,500,000) + Business ($3,000,000, if spouse receives) - assumes remainder to spouse minus charitable.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the taxable estate.',
        correctAnswer: 0,
        tolerance: 100000,
        explanation: 'With the unlimited marital deduction for property passing to the spouse, plus the charitable deduction, the taxable estate will be minimal or zero depending on how assets are allocated.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which of the following is TRUE regarding the unified credit?',
        options: [
          'The lifetime gifts reduce the available estate tax exemption',
          'The unified credit is refundable',
          'Estate and gift taxes have separate exemptions',
          'The credit applies only to estates, not gifts',
        ],
        correctAnswer: 0,
        explanation: 'The estate and gift tax systems are unified. Taxable lifetime gifts use part of the unified credit/exemption, reducing what is available for the estate.',
      },
    ],
    hints: [
      'JTWROS with spouse = 50% in gross estate',
      'Life insurance payable to estate or controlled by decedent = included',
      'Unlimited marital deduction for property to spouse',
      'Unified credit applies to combined lifetime gifts + estate',
    ],
    references: ['IRC §2001', 'IRC §2056'],
  },

  // ==========================================
  // ISC-V: SOC Engagements TBS
  // ==========================================
  {
    id: 'isc-tbs-gap-001',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'SOC 1 vs SOC 2 Report Evaluation',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'SOC Engagements',
    blueprintArea: 'ISC-V',
    blueprintTopic: 'ISC-V-A-1',
    scenario: `
Your company is evaluating two cloud service vendors:

Vendor A - CloudPayroll Inc. (Payroll Processing):
• Processes payroll and files payroll tax returns
• Provided a SOC 1 Type II report
• Report period: March 1 - August 31, Year 1
• No exceptions noted
• User entity controls: "User entities must review payroll registers before processing"

Vendor B - DataStore Solutions (Cloud Storage):
• Provides encrypted cloud storage for business documents
• Provided a SOC 2 Type I report
• Report date: September 30, Year 1  
• Trust services criteria: Security and Availability
• Opinion: Clean, no exceptions
• Subservice organization: Uses Amazon Web Services (carved out)

Your company's fiscal year ends December 31, Year 1.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Why is a SOC 1 report appropriate for CloudPayroll rather than SOC 2?',
        options: [
          'CloudPayroll is larger than DataStore',
          'CloudPayroll processes transactions that affect user financial statements',
          'SOC 1 is newer than SOC 2',
          'Payroll is more complex than storage',
        ],
        correctAnswer: 1,
        explanation: 'SOC 1 reports address controls relevant to user entities\' internal control over financial reporting (ICFR). Payroll processing directly affects financial statement amounts.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What is the key limitation of DataStore\'s Type I report?',
        options: [
          'It only covers Security and Availability',
          'It describes controls at a point in time, not operating effectiveness over a period',
          'Amazon is carved out',
          'It is dated before year-end',
        ],
        correctAnswer: 1,
        explanation: 'Type I reports describe the design of controls at a point in time. Type II tests operating effectiveness over a period. Type I provides less assurance.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What concern does the CloudPayroll report period create?',
        options: [
          'The period is too long',
          'The report doesn\'t cover your entire fiscal year',
          'SOC 1 periods must be 12 months',
          'Type II reports are only valid for 6 months',
        ],
        correctAnswer: 1,
        explanation: 'The SOC 1 covers March-August, but your year-end is December. There is a gap from September-December that is not covered by the report.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What additional work is needed regarding DataStore\'s use of AWS (carved out)?',
        options: [
          'No additional work needed',
          'Request AWS SOC report and evaluate their controls',
          'Convert to inclusive method',
          'Discontinue use of DataStore',
        ],
        correctAnswer: 1,
        explanation: 'When a subservice organization is carved out, the user auditor needs to evaluate the subservice organization\'s controls separately (usually by obtaining AWS\'s own SOC report).',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'What is the user entity control that CloudPayroll requires?',
        options: [
          'Implement two-factor authentication',
          'Review payroll registers before processing',
          'Backup all data locally',
          'Encrypt all transmissions',
        ],
        correctAnswer: 1,
        explanation: 'The SOC report lists complementary user entity controls (CUECs) that the service organization assumes users will implement. Users must implement these controls.',
      },
    ],
    hints: [
      'SOC 1 = ICFR relevant controls',
      'SOC 2 = Trust services (Security, Availability, etc.)',
      'Type I = point in time, Type II = period of time',
      'Carved out = evaluate separately; Inclusive = covered in report',
    ],
    references: ['SSAE 18', 'AICPA SOC Guide'],
  },

  // ==========================================
  // BAR-V: Prospective Financial Information
  // ==========================================
  {
    id: 'bar-tbs-gap-001',
    section: 'BAR',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Pro Forma Financial Statement Review',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Prospective Financial Information',
    blueprintArea: 'BAR-V',
    blueprintTopic: 'BAR-V-A-1',
    scenario: `
TechMerge Corp. is preparing pro forma financial statements for a proposed acquisition. The transaction details:

Acquiring Company (TechMerge):
• Revenue: $50 million
• Net income: $5 million
• Total assets: $40 million

Target Company (InnoSoft):
• Revenue: $20 million
• Net income: $2 million (includes one-time gain of $500,000)
• Total assets: $15 million

Pro Forma Adjustments Proposed:
1. Eliminate InnoSoft's one-time gain
2. Add expected synergies of $3 million annual cost savings
3. Record goodwill of $8 million from the acquisition
4. Amortize customer relationships intangible over 5 years ($2M, so $400K/year)
5. Record acquisition financing interest expense ($500K annually)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate pro forma revenue.',
        correctAnswer: 70000000,
        tolerance: 0,
        explanation: 'Pro forma revenue = TechMerge ($50M) + InnoSoft ($20M) = $70M. Revenue is simply combined.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate pro forma net income with only the required adjustments (eliminate one-time, add intangible amortization, add interest expense).',
        correctAnswer: 6100000,
        tolerance: 0,
        explanation: 'Combined net income ($7M) - One-time gain ($500K) - Amortization ($400K) - Interest ($500K) = $5.6M. Note: Synergies should NOT be included per SEC rules.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Why should synergies NOT be included in pro forma statements per SEC rules?',
        options: [
          'Synergies are too small to matter',
          'Synergies are speculative and not factually supportable',
          'Synergies only apply to tax calculations',
          'The SEC requires separate synergy disclosure',
        ],
        correctAnswer: 1,
        explanation: 'SEC regulations (Regulation S-X Article 11) require pro forma adjustments to be factually supportable. Anticipated synergies are speculative and cannot be included.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which type of prospective financial statement represents management\'s best estimate based on expected conditions?',
        options: [
          'Pro forma',
          'Projection',
          'Forecast',
          'Budget',
        ],
        correctAnswer: 2,
        explanation: 'A financial forecast presents management\'s best estimate of expected financial results. Projections present "what-if" scenarios that may not be expected to occur.',
      },
    ],
    hints: [
      'Pro forma shows as-if the transaction occurred',
      'Adjustments must be factually supportable',
      'Synergies are too speculative for pro forma',
      'Distinguish forecast (expected) vs projection (hypothetical)',
    ],
    references: ['SEC Regulation S-X Article 11', 'AT-C 305'],
  },
];

// Export for integration
export const TBS_GAP_FILL_COUNT = TBS_GAP_FILL.length;
