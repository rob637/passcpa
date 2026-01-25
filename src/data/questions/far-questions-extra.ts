// FAR - Extra Question Bank (Sprint 5 Expansion)
// Additional 50 questions focusing on commonly tested areas

import { Question } from '../../types';

export const FAR_QUESTIONS_EXTRA: Question[] = [
  // ==========================================
  // REVENUE RECOGNITION (ASC 606)
  // ==========================================
  {
    id: 'far-rev-050',
    section: 'FAR',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'ASC 606 Five Steps',
    difficulty: 'medium',
    question: 'Under ASC 606, what is the first step in recognizing revenue?',
    options: [
      'Determine the transaction price',
      'Identify the contract with a customer',
      'Identify the performance obligations',
      'Allocate the transaction price',
    ],
    correctAnswer: 1,
    explanation:
      'The five-step model: 1) Identify contract, 2) Identify performance obligations, 3) Determine transaction price, 4) Allocate price to obligations, 5) Recognize revenue when obligations satisfied.',
    reference: 'ASC 606-10-25-1',
  },
  {
    id: 'far-rev-051',
    section: 'FAR',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'Performance Obligations',
    difficulty: 'hard',
    question: 'A performance obligation is satisfied over time if:',
    options: [
      'The customer receives and consumes benefits as the entity performs',
      'The contract spans multiple accounting periods',
      'The product is manufactured specifically for the customer',
      'Payment is received in installments',
    ],
    correctAnswer: 0,
    explanation:
      'Over-time recognition applies when: customer simultaneously receives/consumes benefits, entity creates/enhances asset customer controls, or entity creates asset with no alternative use and has enforceable right to payment.',
    reference: 'ASC 606-10-25-27',
  },
  {
    id: 'far-rev-052',
    section: 'FAR',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'Variable Consideration',
    difficulty: 'hard',
    question: 'Variable consideration should be estimated using:',
    options: [
      'The most likely amount only',
      'The expected value only',
      'Either expected value or most likely amount, whichever is more predictive',
      'Historical cost',
    ],
    correctAnswer: 2,
    explanation:
      'Variable consideration is estimated using either the expected value method (probability-weighted amounts) or most likely amount method, whichever better predicts the consideration entitled to.',
    reference: 'ASC 606-10-32-8',
  },
  {
    id: 'far-rev-053',
    section: 'FAR',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'Contract Modifications',
    difficulty: 'medium',
    question: 'A contract modification creating a separate contract occurs when:',
    options: [
      'Any change to the contract price',
      'Additional distinct goods/services at standalone selling prices',
      'Any extension of the contract term',
      'A change in payment terms',
    ],
    correctAnswer: 1,
    explanation:
      'A modification is a separate contract when it adds distinct goods/services and the price increase reflects their standalone selling prices. Otherwise, modification is treated as part of existing contract.',
    reference: 'ASC 606-10-25-12',
  },
  {
    id: 'far-rev-054',
    section: 'FAR',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'Contract Costs',
    difficulty: 'medium',
    question: 'Costs to obtain a contract should be capitalized if:',
    options: [
      'The costs are material',
      'The costs would not have been incurred if the contract was not obtained and are expected to be recovered',
      'The contract term exceeds one year',
      'Management elects capitalization',
    ],
    correctAnswer: 1,
    explanation:
      'Incremental costs of obtaining a contract are capitalized if expected to be recovered. A practical expedient allows immediate expense if amortization period would be one year or less.',
    reference: 'ASC 340-40-25-1',
  },

  // ==========================================
  // LEASES (ASC 842)
  // ==========================================
  {
    id: 'far-lease-050',
    section: 'FAR',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Lease Classification',
    difficulty: 'medium',
    question: 'A finance lease for a lessee is classified when:',
    options: [
      'Lease term is more than 50% of economic life',
      'Any of the five classification criteria are met',
      'The lease is non-cancelable',
      'The leased asset is real estate',
    ],
    correctAnswer: 1,
    explanation:
      'A lease is a finance lease if ANY of five criteria are met: transfer of ownership, purchase option reasonably certain, term ≥75% of life, PV of payments ≥90% of fair value, or specialized asset.',
    reference: 'ASC 842-10-25-2',
  },
  {
    id: 'far-lease-051',
    section: 'FAR',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Initial Measurement',
    difficulty: 'hard',
    question: 'The initial measurement of a right-of-use asset includes:',
    options: [
      'Lease payments only',
      'Lease liability plus initial direct costs and prepaid rent, minus lease incentives',
      'Fair value of the underlying asset',
      'Present value of variable lease payments',
    ],
    correctAnswer: 1,
    explanation:
      'ROU asset = Lease liability + Initial direct costs + Prepaid lease payments − Lease incentives received. Variable payments not based on an index are excluded from the initial measurement.',
    reference: 'ASC 842-20-30-5',
  },
  {
    id: 'far-lease-052',
    section: 'FAR',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Operating vs Finance',
    difficulty: 'medium',
    question: 'For an operating lease, the lessee recognizes:',
    options: [
      'Interest expense and amortization separately',
      'A single lease cost on a straight-line basis',
      'Variable rent only',
      'No expense until lease termination',
    ],
    correctAnswer: 1,
    explanation:
      'Operating leases recognize a single lease cost (combined interest and amortization) on a straight-line basis. Finance leases separately recognize interest expense (effective interest) and amortization.',
    reference: 'ASC 842-20-25-6',
  },
  {
    id: 'far-lease-053',
    section: 'FAR',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Short-term Leases',
    difficulty: 'easy',
    question: 'A short-term lease exemption applies to leases with a term of:',
    options: ['6 months or less', '12 months or less', '24 months or less', '36 months or less'],
    correctAnswer: 1,
    explanation:
      'Lessees may elect not to recognize lease assets/liabilities for short-term leases (12 months or less at commencement with no purchase option reasonably certain to exercise).',
    reference: 'ASC 842-20-25-2',
  },
  {
    id: 'far-lease-054',
    section: 'FAR',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Sale-Leaseback',
    difficulty: 'hard',
    question: 'For a sale-leaseback to be recognized as a sale, the transfer must:',
    options: [
      'Be at fair value',
      'Qualify as a sale under ASC 606',
      'Include a bargain purchase option',
      'Be to an unrelated party',
    ],
    correctAnswer: 1,
    explanation:
      "A sale-leaseback is recognized as a sale only if the transfer qualifies as a sale under ASC 606. If not, it's a failed sale-leaseback (financing arrangement).",
    reference: 'ASC 842-40-25-1',
  },

  // ==========================================
  // INCOME TAXES (ASC 740)
  // ==========================================
  {
    id: 'far-tax-050',
    section: 'FAR',
    topicId: 'far-taxes',
    topic: 'Income Taxes',
    subtopic: 'Deferred Taxes',
    difficulty: 'medium',
    question: 'A deferred tax liability arises from:',
    options: [
      'A permanent difference',
      'A temporary difference that will result in future taxable amounts',
      'A temporary difference that will result in future deductible amounts',
      'Net operating loss carryforwards',
    ],
    correctAnswer: 1,
    explanation:
      'DTLs arise from temporary differences that will result in future taxable amounts (book income > tax income now, reverse later). Examples: accelerated depreciation for tax, installment sales.',
    reference: 'ASC 740-10-25-20',
  },
  {
    id: 'far-tax-051',
    section: 'FAR',
    topicId: 'far-taxes',
    topic: 'Income Taxes',
    subtopic: 'Valuation Allowance',
    difficulty: 'hard',
    question: 'A valuation allowance is required for DTAs when:',
    options: [
      'The DTA exceeds $1 million',
      "It is more likely than not some portion won't be realized",
      'The company has any net operating losses',
      'The company operates in multiple jurisdictions',
    ],
    correctAnswer: 1,
    explanation:
      'A valuation allowance reduces DTAs to the amount that is more likely than not (>50%) to be realized. Judgment considers future taxable income, reversal of DTLs, tax planning strategies.',
    reference: 'ASC 740-10-30-5',
  },
  {
    id: 'far-tax-052',
    section: 'FAR',
    topicId: 'far-taxes',
    topic: 'Income Taxes',
    subtopic: 'Uncertain Tax Positions',
    difficulty: 'hard',
    question: 'Under ASC 740, a tax position is recognized if it is:',
    options: [
      'Probable to be sustained',
      'More likely than not to be sustained on examination',
      'Reasonably possible to be sustained',
      'Virtually certain to be sustained',
    ],
    correctAnswer: 1,
    explanation:
      'Recognition threshold: more likely than not (>50%) that the position will be sustained. Then measure at largest amount with >50% likelihood of being realized upon settlement.',
    reference: 'ASC 740-10-25-6',
  },
  {
    id: 'far-tax-053',
    section: 'FAR',
    topicId: 'far-taxes',
    topic: 'Income Taxes',
    subtopic: 'Rate Changes',
    difficulty: 'medium',
    question: 'When enacted tax rates change, deferred tax balances are:',
    options: [
      'Not adjusted',
      'Adjusted in the period of enactment with effect in income tax expense',
      'Adjusted retroactively',
      'Adjusted only at year end',
    ],
    correctAnswer: 1,
    explanation:
      'Deferred taxes are remeasured using newly enacted rates in the period the rate change is enacted. The effect is recognized in continuing operations, not as prior period adjustment.',
    reference: 'ASC 740-10-35-4',
  },
  {
    id: 'far-tax-054',
    section: 'FAR',
    topicId: 'far-taxes',
    topic: 'Income Taxes',
    subtopic: 'Permanent Differences',
    difficulty: 'easy',
    question: 'Which of the following is a permanent difference?',
    options: ['Depreciation', 'Warranty expense', 'Municipal bond interest', 'Prepaid rent'],
    correctAnswer: 2,
    explanation:
      'Municipal bond interest is a permanent difference—never taxable. Depreciation, warranties, and prepaid rent create temporary differences that reverse over time.',
    reference: 'ASC 740-10-25-2',
  },

  // ==========================================
  // STOCK COMPENSATION
  // ==========================================
  {
    id: 'far-stock-050',
    section: 'FAR',
    topicId: 'far-equity',
    topic: 'Stock Compensation',
    subtopic: 'Measurement',
    difficulty: 'medium',
    question: 'Stock options granted to employees are measured at:',
    options: [
      'Intrinsic value at grant date',
      'Fair value at grant date',
      'Fair value at vesting date',
      'Exercise price',
    ],
    correctAnswer: 1,
    explanation:
      'Under ASC 718, employee stock options are measured at fair value on the grant date. This amount is expensed over the requisite service period (usually the vesting period).',
    reference: 'ASC 718-10-30-2',
  },
  {
    id: 'far-stock-051',
    section: 'FAR',
    topicId: 'far-equity',
    topic: 'Stock Compensation',
    subtopic: 'Recognition',
    difficulty: 'medium',
    question: 'Compensation expense for graded vesting stock options should be recognized:',
    options: [
      'On the grant date',
      'On the vesting date',
      'Over the requisite service period using accelerated attribution or straight-line',
      'When options are exercised',
    ],
    correctAnswer: 2,
    explanation:
      'For graded vesting, each tranche can be treated separately (accelerated) or the entire award on straight-line basis. Either method recognized over requisite service period.',
    reference: 'ASC 718-10-35-8',
  },
  {
    id: 'far-stock-052',
    section: 'FAR',
    topicId: 'far-equity',
    topic: 'Stock Compensation',
    subtopic: 'Forfeitures',
    difficulty: 'hard',
    question: 'Under ASC 718, forfeitures of stock compensation can be:',
    options: [
      'Only estimated at grant date',
      'Only recognized when they occur',
      'Either estimated at grant date or recognized when they occur',
      'Ignored for accounting purposes',
    ],
    correctAnswer: 2,
    explanation:
      'Companies can elect to estimate forfeitures at grant date (and revise as needed) or account for forfeitures as they occur. The choice is an accounting policy election.',
    reference: 'ASC 718-10-35-3',
  },

  // ==========================================
  // CONSOLIDATIONS
  // ==========================================
  {
    id: 'far-cons-050',
    section: 'FAR',
    topicId: 'far-consolidation',
    topic: 'Consolidations',
    subtopic: 'Control Determination',
    difficulty: 'medium',
    question: 'Under GAAP, consolidation is required when a parent has:',
    options: [
      'More than 50% ownership',
      'A controlling financial interest',
      'Significant influence',
      'Any investment in another entity',
    ],
    correctAnswer: 1,
    explanation:
      'Consolidation is required when a parent has a controlling financial interest. For voting interest entities, this is typically >50% voting rights. VIEs have different criteria (primary beneficiary).',
    reference: 'ASC 810-10-15-8',
  },
  {
    id: 'far-cons-051',
    section: 'FAR',
    topicId: 'far-consolidation',
    topic: 'Consolidations',
    subtopic: 'Noncontrolling Interest',
    difficulty: 'medium',
    question: 'Noncontrolling interest (NCI) is presented in consolidated financial statements:',
    options: [
      'As a liability',
      'Between liabilities and equity',
      "Within equity, separate from parent's equity",
      'As a contra-asset',
    ],
    correctAnswer: 2,
    explanation:
      "NCI is presented in the equity section of the consolidated balance sheet, separately from the parent's equity. Net income is allocated between parent and NCI.",
    reference: 'ASC 810-10-45-16',
  },
  {
    id: 'far-cons-052',
    section: 'FAR',
    topicId: 'far-consolidation',
    topic: 'Consolidations',
    subtopic: 'Intercompany Eliminations',
    difficulty: 'hard',
    question: 'In consolidation, intercompany profit in ending inventory is:',
    options: [
      'Never eliminated',
      'Eliminated against the selling entity',
      'Eliminated from consolidated inventory and profit, allocated to NCI only in downstream sales',
      'Recognized as a deferred revenue',
    ],
    correctAnswer: 2,
    explanation:
      'Unrealized intercompany profit in ending inventory is eliminated. For downstream (parent to sub) sales, 100% is eliminated against parent. For upstream, NCI shares in the elimination.',
    reference: 'ASC 810-10-45-1',
  },
  {
    id: 'far-cons-053',
    section: 'FAR',
    topicId: 'far-consolidation',
    topic: 'Consolidations',
    subtopic: 'Acquisition Method',
    difficulty: 'hard',
    question: 'Under the acquisition method, identifiable assets and liabilities are recorded at:',
    options: [
      'Book value',
      'Fair value at acquisition date',
      'Historical cost of the acquiree',
      'The lower of cost or market',
    ],
    correctAnswer: 1,
    explanation:
      'The acquisition method requires recording identifiable assets acquired and liabilities assumed at fair value on the acquisition date. Goodwill is the excess of consideration over net fair value.',
    reference: 'ASC 805-20-30-1',
  },
  {
    id: 'far-cons-054',
    section: 'FAR',
    topicId: 'far-consolidation',
    topic: 'Consolidations',
    subtopic: 'Goodwill Impairment',
    difficulty: 'medium',
    question: 'Under the simplified goodwill impairment test:',
    options: [
      'Compare fair value of reporting unit to its carrying amount including goodwill',
      'Compare book value of goodwill to replacement cost',
      'Goodwill is amortized over 10 years',
      'Impairment is tested only when indicators exist',
    ],
    correctAnswer: 0,
    explanation:
      'The simplified (one-step) test compares fair value of reporting unit to carrying amount. Impairment is excess of carrying amount over fair value, limited to goodwill balance.',
    reference: 'ASC 350-20-35-3C',
  },

  // ==========================================
  // FINANCIAL INSTRUMENTS
  // ==========================================
  {
    id: 'far-fi-050',
    section: 'FAR',
    topicId: 'far-investments',
    topic: 'Financial Instruments',
    subtopic: 'Debt Securities',
    difficulty: 'medium',
    question: 'Trading securities are classified as:',
    options: [
      'Current assets only',
      'Non-current assets only',
      'Current or non-current based on management intent',
      'Current assets and measured at fair value through net income',
    ],
    correctAnswer: 3,
    explanation:
      'Trading securities are held for sale in the near term, classified as current assets, and measured at fair value with unrealized gains/losses in net income.',
    reference: 'ASC 320-10-25-1',
  },
  {
    id: 'far-fi-051',
    section: 'FAR',
    topicId: 'far-investments',
    topic: 'Financial Instruments',
    subtopic: 'Debt Securities',
    difficulty: 'hard',
    question: 'For available-for-sale debt securities, credit losses are:',
    options: [
      'Recognized in OCI',
      'Recognized in net income with a valuation allowance',
      'Not recognized until sale',
      'Recognized in retained earnings directly',
    ],
    correctAnswer: 1,
    explanation:
      'Under the CECL model, credit losses on AFS debt securities are recognized in net income through an allowance. Non-credit impairment remains in OCI.',
    reference: 'ASC 326-30-35-3',
  },
  {
    id: 'far-fi-052',
    section: 'FAR',
    topicId: 'far-investments',
    topic: 'Financial Instruments',
    subtopic: 'Equity Method',
    difficulty: 'medium',
    question: 'The equity method is used when an investor has:',
    options: [
      'Less than 20% ownership',
      'Significant influence (typically 20-50%)',
      'More than 50% ownership',
      'Any ownership in a public company',
    ],
    correctAnswer: 1,
    explanation:
      'The equity method applies when an investor has significant influence but not control. 20-50% ownership is presumed to indicate significant influence, but other factors matter.',
    reference: 'ASC 323-10-15-6',
  },
  {
    id: 'far-fi-053',
    section: 'FAR',
    topicId: 'far-investments',
    topic: 'Financial Instruments',
    subtopic: 'Fair Value Option',
    difficulty: 'medium',
    question: 'The fair value option under ASC 825:',
    options: [
      'Must be applied to all financial instruments',
      'Is irrevocable once elected for a specific instrument',
      'Can be changed each reporting period',
      'Applies only to derivatives',
    ],
    correctAnswer: 1,
    explanation:
      'The fair value option election is irrevocable and made at initial recognition (or upon certain events). Once elected for an instrument, it cannot be changed. Applied instrument by instrument.',
    reference: 'ASC 825-10-25-1',
  },

  // ==========================================
  // STATEMENT OF CASH FLOWS
  // ==========================================
  {
    id: 'far-cf-050',
    section: 'FAR',
    topicId: 'far-cashflows',
    topic: 'Statement of Cash Flows',
    subtopic: 'Operating Activities',
    difficulty: 'easy',
    question: 'Interest paid is classified as:',
    options: [
      'Operating activity',
      'Investing activity',
      'Financing activity',
      'Either operating or financing, by election',
    ],
    correctAnswer: 0,
    explanation:
      'Under US GAAP, interest paid is classified as operating activity. Under IFRS, it can be operating or financing. Interest received is also operating under US GAAP.',
    reference: 'ASC 230-10-45-17',
  },
  {
    id: 'far-cf-051',
    section: 'FAR',
    topicId: 'far-cashflows',
    topic: 'Statement of Cash Flows',
    subtopic: 'Investing Activities',
    difficulty: 'medium',
    question: 'Purchases of property, plant, and equipment are:',
    options: [
      'Operating activities',
      'Investing activities',
      'Financing activities',
      'Non-cash activities',
    ],
    correctAnswer: 1,
    explanation:
      'Purchases of PP&E are investing activities. Cash payments for acquiring long-lived productive assets are investing outflows. Sales of PP&E are investing inflows.',
    reference: 'ASC 230-10-45-13',
  },
  {
    id: 'far-cf-052',
    section: 'FAR',
    topicId: 'far-cashflows',
    topic: 'Statement of Cash Flows',
    subtopic: 'Financing Activities',
    difficulty: 'medium',
    question: 'Dividends paid are classified as:',
    options: [
      'Operating activities',
      'Investing activities',
      'Financing activities',
      'Supplemental disclosure only',
    ],
    correctAnswer: 2,
    explanation:
      'Dividends paid to shareholders are financing activities (outflows). Dividends received from investments are operating activities under US GAAP.',
    reference: 'ASC 230-10-45-15',
  },
  {
    id: 'far-cf-053',
    section: 'FAR',
    topicId: 'far-cashflows',
    topic: 'Statement of Cash Flows',
    subtopic: 'Non-cash Transactions',
    difficulty: 'medium',
    question: 'A building acquired by issuing stock should be:',
    options: [
      'Included in investing activities',
      'Included in financing activities',
      'Disclosed as a significant non-cash transaction',
      'Excluded from all disclosures',
    ],
    correctAnswer: 2,
    explanation:
      "Significant non-cash investing and financing activities must be disclosed separately, either in a schedule or narrative. They don't appear in the cash flow statement body.",
    reference: 'ASC 230-10-50-3',
  },

  // ==========================================
  // GOVERNMENT AND NFP
  // ==========================================
  {
    id: 'far-gov-050',
    section: 'FAR',
    topicId: 'far-government',
    topic: 'Government Accounting',
    subtopic: 'Fund Accounting',
    difficulty: 'medium',
    question: 'The General Fund is a type of:',
    options: ['Proprietary fund', 'Fiduciary fund', 'Governmental fund', 'Component unit'],
    correctAnswer: 2,
    explanation:
      'The General Fund is the primary governmental fund, accounting for all financial resources not required to be in another fund. Governmental funds use modified accrual.',
    reference: 'GASB Codification 1300',
  },
  {
    id: 'far-gov-051',
    section: 'FAR',
    topicId: 'far-government',
    topic: 'Government Accounting',
    subtopic: 'Measurement Focus',
    difficulty: 'hard',
    question: 'Governmental funds use what measurement focus?',
    options: [
      'Economic resources and accrual',
      'Current financial resources and modified accrual',
      'Cash basis',
      'Economic resources and modified accrual',
    ],
    correctAnswer: 1,
    explanation:
      'Governmental funds (General, Special Revenue, Capital Projects, Debt Service, Permanent) use current financial resources focus with modified accrual accounting.',
    reference: 'GASB Codification 1600',
  },
  {
    id: 'far-gov-052',
    section: 'FAR',
    topicId: 'far-nfp',
    topic: 'Not-for-Profit',
    subtopic: 'Net Asset Classes',
    difficulty: 'easy',
    question: 'NFP net assets are classified as:',
    options: [
      'Restricted and unrestricted',
      'Without donor restrictions and with donor restrictions',
      'Permanently restricted, temporarily restricted, and unrestricted',
      'Operating and non-operating',
    ],
    correctAnswer: 1,
    explanation:
      'Under ASU 2016-14, NFP net assets are classified as: with donor restrictions and without donor restrictions (replacing the three-category system).',
    reference: 'ASC 958-210-45-1',
  },
  {
    id: 'far-gov-053',
    section: 'FAR',
    topicId: 'far-nfp',
    topic: 'Not-for-Profit',
    subtopic: 'Contributions',
    difficulty: 'medium',
    question: 'A conditional contribution is recognized as revenue:',
    options: [
      'When received',
      'When the condition is substantially met',
      'Over the expected period of benefit',
      'Never, until the donor releases it',
    ],
    correctAnswer: 1,
    explanation:
      'Conditional contributions are recognized when the condition is substantially met. Before then, cash received is recorded as a refundable advance (liability).',
    reference: 'ASC 958-605-25-5A',
  },
];
