// FAR - Financial Accounting and Reporting Questions
// Comprehensive question bank for CPA exam preparation

import { Question } from '../../../types';

export const FAR_QUESTIONS: Question[] = [
  // ==========================================
  // AREA 1: Conceptual Framework & Standards
  // ==========================================

  {
    id: 'far-cf-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-framework',
    topic: 'Conceptual Framework',
    subtopic: 'Qualitative Characteristics',
    difficulty: 'medium',
    skillLevel: 'Application',
    question:
      'Under the FASB Conceptual Framework, which qualitative characteristic is most important for decision-useful information?',
    options: [
      'Comparability',
      'Timeliness',
      'Verifiability',
      'Relevance and faithful representation',
    ],
    correctAnswer: 3,
    explanation:
      'Relevance and faithful representation are the fundamental qualitative characteristics. Comparability, verifiability, timeliness, and understandability are enhancing characteristics.',
    reference: 'FASB Concepts Statement No. 8',
  },
  {
    id: 'far-cf-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-framework',
    topic: 'Conceptual Framework',
    subtopic: 'Elements',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question:
      'According to the FASB Conceptual Framework, which of the following is the residual interest in the assets after deducting liabilities?',
    options: ['Revenue', 'Comprehensive income', 'Equity', 'Gains'],
    correctAnswer: 2,
    explanation:
      'Equity (or net assets for NFPs) is defined as the residual interest in the assets of an entity that remains after deducting its liabilities.',
    reference: 'FASB Concepts Statement No. 6',
  },
  {
    id: 'far-cf-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-framework',
    topic: 'Conceptual Framework',
    subtopic: 'Recognition',
    difficulty: 'medium',
    skillLevel: 'Application',
    question:
      'An item should be recognized in financial statements when it meets the definition of an element and:',
    options: [
      'Is measurable with sufficient reliability',
      'Is material to the financial statements',
      'Can be measured reliably',
      'Has been approved by management',
    ],
    correctAnswer: 0,
    explanation:
      'Recognition requires meeting the definition of an element AND being measurable with sufficient reliability. Materiality and management approval are not recognition criteria.',
    reference: 'FASB Concepts Statement No. 5',
  },

  // ==========================================
  // AREA 2: Financial Statement Presentation
  // ==========================================

  {
    id: 'far-fs-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-financial-statements',
    topic: 'Financial Statements',
    subtopic: 'Balance Sheet',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following would be classified as a current liability?',
    options: [
      'Deferred tax liability expected to reverse in 2 years',
      'Bonds payable due in 6 months with no refinancing arrangement',
      'Bonds payable due in 18 months that will be refinanced with long-term debt before the balance sheet date',
      'A note payable due in 13 months',
    ],
    correctAnswer: 1,
    explanation:
      'Bonds due in 6 months with no refinancing arrangement must be classified as current. If refinancing occurs before the balance sheet date, it can be classified as non-current.',
    reference: 'ASC 470-10-45',
  },
  {
    id: 'far-fs-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-financial-statements',
    topic: 'Financial Statements',
    subtopic: 'Income Statement',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A company sells its only manufacturing division. This should be reported as:',
    options: [
      'Part of continuing operations',
      'Discontinued operations, net of tax',
      'An extraordinary item',
      'An unusual item in other income',
    ],
    correctAnswer: 1,
    explanation:
      'Disposal of a component that represents a strategic shift (like an entire division) is reported as discontinued operations, separate from continuing operations, net of tax.',
    reference: 'ASC 205-20',
  },
  {
    id: 'far-fs-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-financial-statements',
    topic: 'Financial Statements',
    subtopic: 'Comprehensive Income',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following is included in other comprehensive income (OCI)?',
    options: [
      'Realized gains on available-for-sale debt securities',
      'Foreign currency translation adjustments',
      'Impairment losses on goodwill',
      'Unrealized holding gains on trading securities',
    ],
    correctAnswer: 1,
    explanation:
      'OCI includes: unrealized gains/losses on AFS debt securities, foreign currency translation adjustments, pension adjustments, and cash flow hedge gains/losses. Trading securities gains go to net income.',
    reference: 'ASC 220-10-45',
  },
  {
    id: 'far-fs-004',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-financial-statements',
    topic: 'Financial Statements',
    subtopic: 'Statement of Cash Flows',
    difficulty: 'medium',
    skillLevel: 'Application',
    question:
      'Under the indirect method, which adjustment is made to reconcile net income to operating cash flows?',
    options: [
      'Add decreases in inventory',
      'Subtract depreciation expense',
      'Add increases in accounts payable and subtract depreciation',
      'Add increases in accounts receivable',
    ],
    correctAnswer: 0,
    explanation:
      'Decreases in current assets (like inventory) are added; increases in current assets are subtracted. Depreciation is added back. Increases in current liabilities are added.',
    reference: 'ASC 230-10-45',
  },
  {
    id: 'far-fs-005',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-financial-statements',
    topic: 'Financial Statements',
    subtopic: 'Statement of Cash Flows',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Interest paid is classified as which type of cash flow under U.S. GAAP?',
    options: [
      "Either operating or financing at company's election",
      'Operating activity',
      'Investing activity',
      'Financing activity',
    ],
    correctAnswer: 1,
    explanation:
      'Under U.S. GAAP, interest paid is classified as an operating activity. Under IFRS, companies may classify it as operating or financing.',
    reference: 'ASC 230-10-45-17',
  },

  // ==========================================
  // AREA 3: Cash and Receivables
  // ==========================================

  {
    id: 'far-rec-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-receivables',
    topic: 'Receivables',
    subtopic: 'Bad Debt Estimation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question:
      'Under the current expected credit loss (CECL) model, an allowance for credit losses is based on:',
    options: [
      'Historical loss experience only',
      'Expected credit losses over the life of the asset',
      'Probable and estimable losses',
      'Only incurred losses',
    ],
    correctAnswer: 1,
    explanation:
      'CECL requires recognition of expected credit losses over the contractual life of the asset from day one, not just incurred losses. It considers historical data, current conditions, and reasonable forecasts.',
    reference: 'ASC 326-20',
  },
  {
    id: 'far-rec-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-receivables',
    topic: 'Receivables',
    subtopic: 'Factoring',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When receivables are factored without recourse, the transferor:',
    options: [
      'Removes the receivables and recognizes a gain or loss',
      'Reports a contingent liability',
      'Records a financing arrangement',
      'Retains the receivables on the balance sheet',
    ],
    correctAnswer: 0,
    explanation:
      'Factoring without recourse transfers risks to the factor. If control is surrendered, the transaction is a sale - receivables are removed and gain/loss recognized.',
    reference: 'ASC 860-10',
  },
  {
    id: 'far-rec-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-receivables',
    topic: 'Receivables',
    subtopic: 'Notes Receivable',
    difficulty: 'medium',
    skillLevel: 'Application',
    question:
      'A company receives a $100,000, 3-year, non-interest-bearing note. If the market rate is 8%, the note should be recorded at:',
    options: [
      'Present value of $100,000 at 8% for 3 years',
      '$100,000 less estimated bad debts',
      'Face value less a contra account',
      '$100,000',
    ],
    correctAnswer: 0,
    explanation:
      "Non-interest-bearing notes are recorded at present value, with the discount amortized as interest income over the note's life.",
    reference: 'ASC 835-30',
  },

  // ==========================================
  // AREA 4: Inventory
  // ==========================================

  {
    id: 'far-inv-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-II',
    topicId: 'far-inventory',
    topic: 'Inventory',
    subtopic: 'Cost Flow Methods',
    difficulty: 'medium',
    skillLevel: 'Application',
    question:
      'During a period of rising prices, which inventory method results in the highest net income?',
    options: [
      'Weighted average',
      'Specific identification',
      'FIFO',
      'LIFO',
    ],
    correctAnswer: 2,
    explanation:
      'FIFO results in the highest net income during rising prices because older (lower) costs are expensed, leaving higher-valued inventory on the balance sheet.',
    reference: 'ASC 330-10-30',
  },
  {
    id: 'far-inv-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-II',
    topicId: 'far-inventory',
    topic: 'Inventory',
    subtopic: 'Lower of Cost or NRV',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under ASC 330, inventory should be measured at:',
    options: [
      'Lower of cost or market',
      'Lower of cost or net realizable value',
      'Historical cost only',
      'Fair value',
    ],
    correctAnswer: 1,
    explanation:
      'Under the 2015 FASB simplification (for non-LIFO inventory), inventory is measured at the lower of cost or net realizable value (NRV = selling price less costs to complete and sell).',
    reference: 'ASC 330-10-35-1B',
  },
  {
    id: 'far-inv-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-II',
    topicId: 'far-inventory',
    topic: 'Inventory',
    subtopic: 'LIFO',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A company using LIFO liquidates a layer from 5 years ago. This results in:',
    options: [
      'A restatement of prior periods',
      'Lower gross profit due to higher COGS',
      'Higher gross profit due to lower (older) costs flowing through COGS',
      'No effect on gross profit',
    ],
    correctAnswer: 2,
    explanation:
      'LIFO liquidation occurs when units sold exceed units purchased. Old, lower costs are matched against current revenues, artificially inflating gross profit.',
    reference: 'ASC 330-10-35-4',
  },
  {
    id: 'far-inv-004',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-II',
    topicId: 'far-inventory',
    topic: 'Inventory',
    subtopic: 'Dollar-Value LIFO',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question:
      'Under dollar-value LIFO, the ending inventory at base-year prices is $200,000, beginning inventory at base-year prices was $180,000, and the current-year price index is 1.10. The LIFO layer added this year is:',
    options: [
      '$22,000',
      '$20,000',
      '$18,182',
      '$220,000',
    ],
    correctAnswer: 0,
    explanation:
      'LIFO layer added = ($200,000 - $180,000) × 1.10 = $20,000 × 1.10 = $22,000. The layer is valued at current year prices.',
    reference: 'ASC 330-10-30',
  },

  // ==========================================
  // AREA 5: PP&E and Depreciation
  // ==========================================

  {
    id: 'far-ppe-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-III',
    topicId: 'far-ppe',
    topic: 'Property, Plant & Equipment',
    subtopic: 'Capitalization',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following costs should be capitalized as part of equipment cost?',
    options: [
      'Annual maintenance costs',
      'Testing costs before placing equipment in service',
      'Repairs after equipment is in use',
      'Insurance during the first year of use',
    ],
    correctAnswer: 1,
    explanation:
      'Costs to bring an asset to its intended use are capitalized, including purchase price, freight, installation, and testing. Maintenance, insurance during operations, and repairs are expensed.',
    reference: 'ASC 360-10-30-1',
  },
  {
    id: 'far-ppe-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-III',
    topicId: 'far-ppe',
    topic: 'Property, Plant & Equipment',
    subtopic: 'Interest Capitalization',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Interest costs are capitalized when:',
    options: [
      'Any debt is outstanding',
      'The company chooses to capitalize as an accounting policy',
      "Assets are being constructed for the company's own use and expenditures and interest costs are being incurred",
      'Assets are purchased for immediate use',
    ],
    correctAnswer: 2,
    explanation:
      'Interest capitalization is required (not optional) for assets constructed for own use when (1) expenditures are being incurred, (2) construction activities are occurring, and (3) interest is being incurred.',
    reference: 'ASC 835-20-15',
  },
  {
    id: 'far-ppe-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-III',
    topicId: 'far-ppe',
    topic: 'Property, Plant & Equipment',
    subtopic: 'Depreciation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question:
      'Using double-declining balance, an asset with $100,000 cost, $10,000 salvage value, and 5-year life has Year 1 depreciation of:',
    options: [
      '$20,000',
      '$18,000',
      '$40,000',
      '$36,000',
    ],
    correctAnswer: 2,
    explanation:
      'DDB rate = 2 × (1/5) = 40%. Year 1 depreciation = $100,000 × 40% = $40,000. Note: salvage value is ignored in the calculation but limits total depreciation.',
    reference: 'ASC 360-10-35',
  },
  {
    id: 'far-ppe-004',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-III',
    topicId: 'far-ppe',
    topic: 'Property, Plant & Equipment',
    subtopic: 'Impairment',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question:
      'An asset with carrying value $500,000, undiscounted future cash flows $450,000, and fair value $400,000 should be:',
    options: [
      'Written down to $350,000',
      'Written down to $400,000',
      'Written down to $450,000',
      'Not impaired',
    ],
    correctAnswer: 1,
    explanation:
      'Step 1: Recoverability test - compare carrying value ($500,000) to undiscounted cash flows ($450,000). Since CV > UCF, impairment exists. Step 2: Measure impairment as CV - FV = $500,000 - $400,000 = $100,000 loss.',
    reference: 'ASC 360-10-35-17',
  },

  // ==========================================
  // AREA 6: Intangibles and Goodwill
  // ==========================================

  {
    id: 'far-int-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-intangibles',
    topic: 'Intangible Assets',
    subtopic: 'Recognition',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Research and development costs are generally:',
    options: [
      'Capitalized as incurred',
      'Expensed as incurred',
      'Capitalized if successful',
      'Deferred and amortized',
    ],
    correctAnswer: 1,
    explanation:
      'Under U.S. GAAP, R&D costs are expensed as incurred. Certain software development costs may be capitalized after technological feasibility.',
    reference: 'ASC 730-10-25-1',
  },
  {
    id: 'far-int-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-intangibles',
    topic: 'Intangible Assets',
    subtopic: 'Goodwill Impairment',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Under the simplified goodwill impairment test, impairment is measured as:',
    options: [
      'Carrying amount of goodwill minus implied fair value of goodwill',
      'Book value minus market capitalization',
      'Fair value of goodwill minus carrying amount',
      'Carrying amount of reporting unit minus fair value of reporting unit, not to exceed goodwill'
    ],
    correctAnswer: 3,
    explanation:
      'Under the simplified approach (post-2017), impairment = carrying amount of reporting unit - fair value of reporting unit, limited to the carrying amount of goodwill (cannot go below zero).',
    reference: 'ASC 350-20-35-8C',
  },
  {
    id: 'far-int-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-intangibles',
    topic: 'Intangible Assets',
    subtopic: 'Software Costs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Costs of computer software developed for sale are expensed until:',
    options: [
      'A working model is completed',
      'Technological feasibility is established',
      'The product is released',
      'Revenue exceeds costs',
    ],
    correctAnswer: 1,
    explanation:
      'Software development costs are expensed until technological feasibility is established (e.g., completion of a detailed program design or working model). After that, costs are capitalized.',
    reference: 'ASC 985-20-25-1',
  },

  // ==========================================
  // AREA 7: Investments
  // ==========================================

  {
    id: 'far-invest-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-III',
    topicId: 'far-investments',
    topic: 'Investments',
    subtopic: 'Classification',
    difficulty: 'medium',
    skillLevel: 'Application',
    question:
      "A company owns 35% of another company's voting stock. This investment should be accounted for using:",
    options: [
      'Equity method',
      'Consolidation',
      'Cost method',
      'Fair value method',
    ],
    correctAnswer: 0,
    explanation:
      'Ownership of 20-50% creates a presumption of significant influence, requiring the equity method. The investor records its share of investee income/loss and adjusts the carrying value.',
    reference: 'ASC 323-10-15-6',
  },
  {
    id: 'far-invest-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-III',
    topicId: 'far-investments',
    topic: 'Investments',
    subtopic: 'Equity Method',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: "Under the equity method, an investor's carrying amount is increased by:",
    options: [
      'Amortization of excess purchase price',
      'Share of investee net income',
      'Unrealized intercompany profits',
      'Dividends received',
    ],
    correctAnswer: 1,
    explanation:
      'Under equity method: Investment increased by share of investee income, decreased by dividends received and share of losses. Excess cost amortization also reduces the investment.',
    reference: 'ASC 323-10-35-4',
  },
  {
    id: 'far-invest-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-III',
    topicId: 'far-investments',
    topic: 'Investments',
    subtopic: 'Debt Securities',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Available-for-sale (AFS) debt securities are reported at:',
    options: [
      'Lower of cost or market',
      'Amortized cost',
      'Fair value with unrealized gains/losses in net income',
      'Fair value with unrealized gains/losses in OCI',
    ],
    correctAnswer: 3,
    explanation:
      'AFS debt securities are reported at fair value. Unrealized holding gains/losses are reported in OCI (not net income) until realized.',
    reference: 'ASC 320-10-35-1',
  },
  {
    id: 'far-invest-004',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-III',
    topicId: 'far-investments',
    topic: 'Investments',
    subtopic: 'Held-to-Maturity',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Held-to-maturity debt securities are reported at:',
    options: [
      'Fair value',
      'Amortized cost',
      'Lower of cost or fair value',
      'Original cost',
    ],
    correctAnswer: 1,
    explanation:
      'HTM securities are reported at amortized cost because the company intends and is able to hold them to maturity, making fair value fluctuations irrelevant.',
    reference: 'ASC 320-10-35-1',
  },

  // ==========================================
  // AREA 8: Revenue Recognition (ASC 606)
  // ==========================================

  {
    id: 'far-rev-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-II',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'Five-Step Model',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The first step in ASC 606 revenue recognition is to:',
    options: [
      'Identify performance obligations',
      'Identify the contract with the customer',
      'Allocate the transaction price',
      'Determine the transaction price',
    ],
    correctAnswer: 1,
    explanation:
      'The 5 steps are: (1) Identify contract, (2) Identify performance obligations, (3) Determine transaction price, (4) Allocate price to obligations, (5) Recognize revenue when obligations are satisfied.',
    reference: 'ASC 606-10-25-1',
  },
  {
    id: 'far-rev-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-II',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'Performance Obligations',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A performance obligation is satisfied over time if:',
    options: [
      'The customer receives and consumes benefits as the entity performs',
      'Payment is received in installments',
      'The customer has title to the goods',
      'The contract is for more than one year',
    ],
    correctAnswer: 0,
    explanation:
      "A performance obligation is satisfied over time if: (1) customer receives/consumes benefits as performed, (2) entity's performance creates/enhances customer-controlled asset, or (3) no alternative use exists and entity has right to payment.",
    reference: 'ASC 606-10-25-27',
  },
  {
    id: 'far-rev-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-II',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'Variable Consideration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Variable consideration should be estimated using:',
    options: [
      'The minimum possible amount',
      'The maximum possible amount',
      'Fair value of the consideration',
      'Expected value or most likely amount, whichever is more predictive',
    ],
    correctAnswer: 3,
    explanation:
      'Variable consideration is estimated using either the expected value (probability-weighted amounts) or the most likely amount, whichever method better predicts the consideration.',
    reference: 'ASC 606-10-32-8',
  },
  {
    id: 'far-rev-004',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-II',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'Contract Costs',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Incremental costs of obtaining a contract (like sales commissions) should be:',
    options: [
      'Always expensed immediately',
      'Deferred indefinitely',
      'Included in cost of goods sold',
      'Capitalized if expected to be recovered, then amortized',
    ],
    correctAnswer: 3,
    explanation:
      'Incremental costs of obtaining a contract are capitalized if the entity expects to recover them. They are amortized consistent with the transfer of goods/services to which they relate.',
    reference: 'ASC 340-40-25-1',
  },

  // ==========================================
  // AREA 9: Leases (ASC 842)
  // ==========================================

  {
    id: 'far-lease-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-IV',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Lessee Classification',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A lease is classified as a finance lease if:',
    options: [
      'The lessee has the right to cancel at any time',
      'Ownership transfers to the lessee or a purchase option is reasonably certain to be exercised',
      "The lease term is at least 50% of the asset's economic life",
      'Lease payments are variable',
    ],
    correctAnswer: 1,
    explanation:
      'Finance lease criteria include: ownership transfer, purchase option reasonably certain, lease term is major part of economic life, PV equals substantially all of FV, or specialized nature.',
    reference: 'ASC 842-10-25-2',
  },
  {
    id: 'far-lease-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-IV',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Lessee Accounting',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'For an operating lease, the lessee records:',
    options: [
      'No asset or liability',
      'A right-of-use asset and lease liability, with front-loaded interest expense',
      'Only rent expense as paid',
      'A right-of-use asset and lease liability, with straight-line lease expense',
    ],
    correctAnswer: 3,
    explanation:
      'Under ASC 842, operating leases are recorded with a right-of-use asset and lease liability. Total lease expense is recognized on a straight-line basis (unlike finance leases which have front-loaded interest).',
    reference: 'ASC 842-20-25-6',
  },
  {
    id: 'far-lease-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-IV',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Initial Measurement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The lease liability is initially measured at:',
    options: [
      'Fair value of the leased asset',
      'Present value of lease payments using the rate implicit in the lease (or IBR)',
      'Total undiscounted lease payments',
      'Sum of the lease payments plus residual value',
    ],
    correctAnswer: 1,
    explanation:
      "Lease liability = PV of lease payments using the rate implicit in the lease. If that rate cannot be determined, use the lessee's incremental borrowing rate.",
    reference: 'ASC 842-20-30-1',
  },
  {
    id: 'far-lease-004',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-IV',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Lessor Accounting',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A lessor classifies a lease as a sales-type lease when:',
    options: [
      'The lease payments are variable',
      'The lease term is less than one year',
      'Any one of the five finance lease criteria is met AND collectibility is probable',
      'The asset has a residual value guarantee',
    ],
    correctAnswer: 2,
    explanation:
      'For lessors, a sales-type lease requires meeting at least one of the five criteria (same as finance lease criteria) AND collectibility of lease payments must be probable.',
    reference: 'ASC 842-10-25-3',
  },

  // ==========================================
  // AREA 10: Liabilities
  // ==========================================

  {
    id: 'far-liab-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-IV',
    topicId: 'far-liabilities',
    topic: 'Liabilities',
    subtopic: 'Bonds',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A bond issued at a premium will have:',
    options: [
      'No stated rate',
      'A stated rate higher than the market rate',
      'A stated rate equal to the market rate',
      'A stated rate lower than the market rate',
    ],
    correctAnswer: 1,
    explanation:
      'A bond is issued at a premium when its stated (coupon) rate exceeds the market rate at issuance. Investors pay more than face value to obtain the higher interest payments.',
    reference: 'ASC 835-30',
  },
  {
    id: 'far-liab-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-IV',
    topicId: 'far-liabilities',
    topic: 'Liabilities',
    subtopic: 'Bonds',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question:
      'Under the effective interest method, interest expense on a bond issued at a discount will:',
    options: [
      'Remain constant over the life of the bond',
      'Increase over the life of the bond',
      'Equal the cash interest paid',
      'Decrease over the life of the bond',
    ],
    correctAnswer: 1,
    explanation:
      'For bonds issued at a discount, carrying value increases as discount is amortized. Interest expense = Carrying value × Effective rate, so interest expense increases each period.',
    reference: 'ASC 835-30-35-2',
  },
  {
    id: 'far-liab-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-IV',
    topicId: 'far-liabilities',
    topic: 'Liabilities',
    subtopic: 'Contingencies',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A loss contingency is accrued when:',
    options: [
      'The loss is possible and estimable',
      'The loss is probable and reasonably estimable',
      'A lawsuit is filed',
      'The loss is remote',
    ],
    correctAnswer: 1,
    explanation:
      'Under ASC 450, a loss contingency is accrued when (1) it is probable that a loss has been incurred, and (2) the amount can be reasonably estimated. If only possible, disclose in notes.',
    reference: 'ASC 450-20-25-2',
  },
  {
    id: 'far-liab-004',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-IV',
    topicId: 'far-liabilities',
    topic: 'Liabilities',
    subtopic: 'Asset Retirement Obligations',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An asset retirement obligation (ARO) is initially measured at:',
    options: [
      'Fair value (present value of expected cash flows)',
      'Amount to be paid at retirement',
      'Cost to remove the asset currently',
      'Expected cash flows, undiscounted',
    ],
    correctAnswer: 0,
    explanation:
      'AROs are initially recorded at fair value, which is typically the present value of expected cash flows needed to settle the obligation. An equal amount is capitalized to the related asset.',
    reference: 'ASC 410-20-25-4',
  },

  // ==========================================
  // AREA 11: Income Taxes
  // ==========================================

  {
    id: 'far-tax-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-income-tax',
    topic: 'Income Taxes',
    subtopic: 'Deferred Taxes',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A deferred tax liability arises from:',
    options: [
      'Taxable temporary differences',
      'Operating loss carryforwards',
      'Deductible temporary differences',
      'Permanent differences',
    ],
    correctAnswer: 0,
    explanation:
      'Deferred tax liabilities arise from taxable temporary differences - situations where taxable income will be higher than book income in future periods (e.g., accelerated tax depreciation).',
    reference: 'ASC 740-10-25-20',
  },
  {
    id: 'far-tax-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-income-tax',
    topic: 'Income Taxes',
    subtopic: 'Deferred Taxes',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question:
      'Equipment with book basis $60,000 and tax basis $40,000 will create at a 21% tax rate:',
    options: [
      'Deferred tax liability of $20,000',
      'Deferred tax asset of $4,200',
      'Deferred tax liability of $4,200',
      'Deferred tax asset of $20,000',
    ],
    correctAnswer: 2,
    explanation:
      'Book basis > Tax basis means more depreciation has been taken for tax purposes. This creates a taxable temporary difference and DTL = ($60,000 - $40,000) × 21% = $4,200.',
    reference: 'ASC 740-10-25',
  },
  {
    id: 'far-tax-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-income-tax',
    topic: 'Income Taxes',
    subtopic: 'Valuation Allowance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A valuation allowance for deferred tax assets is required when:',
    options: [
      'It is more likely than not that some or all of the DTA will not be realized',
      'Tax rates are expected to decrease',
      'Any uncertainty exists about realization',
      'The company has an NOL carryforward',
    ],
    correctAnswer: 0,
    explanation:
      'A valuation allowance reduces DTAs to the amount that is more likely than not (>50% probability) to be realized based on available evidence.',
    reference: 'ASC 740-10-30-5',
  },
  {
    id: 'far-tax-004',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-I',
    topicId: 'far-income-tax',
    topic: 'Income Taxes',
    subtopic: 'Uncertain Tax Positions',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Under ASC 740-10, a tax position is recognized only if:',
    options: [
      'It is more likely than not to be sustained upon examination',
      'The company has received a private letter ruling',
      'It is certain to be sustained',
      'It is probably going to be challenged',
    ],
    correctAnswer: 0,
    explanation:
      'A tax position is recognized only if it is more likely than not (>50% probability) to be sustained upon examination by tax authorities based on technical merits.',
    reference: 'ASC 740-10-25-6',
  },

  // ==========================================
  // AREA 12: Stockholders\' Equity
  // ==========================================

  {
    id: 'far-eq-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-V',
    topicId: 'far-equity',
    topic: "Stockholders' Equity",
    subtopic: 'Treasury Stock',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under the cost method, treasury stock is recorded at:',
    options: [
      'Fair value at year-end',
      'Original issue price',
      'Purchase price paid to reacquire the shares',
      'Par value',
    ],
    correctAnswer: 2,
    explanation:
      "Under the cost method, treasury stock is recorded at the price paid to reacquire the shares and reported as a reduction of total stockholders' equity.",
    reference: 'ASC 505-30-30',
  },
  {
    id: 'far-eq-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-V',
    topicId: 'far-equity',
    topic: "Stockholders' Equity",
    subtopic: 'Stock Dividends',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A small stock dividend (less than 20-25% of outstanding shares) is recorded at:',
    options: [
      'Book value of shares issued',
      'Par value of shares issued',
      'No entry required',
      'Fair market value of shares issued',
    ],
    correctAnswer: 3,
    explanation:
      'Small stock dividends are recorded at fair market value. Retained earnings is debited; common stock (par) and APIC are credited. Large dividends (>25%) use par value.',
    reference: 'ASC 505-20-30-3',
  },
  {
    id: 'far-eq-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-V',
    topicId: 'far-equity',
    topic: "Stockholders' Equity",
    subtopic: 'Stock Compensation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Stock options granted to employees are measured at:',
    options: [
      'Par value of underlying shares',
      'Fair value at grant date',
      'Fair value at exercise date',
      'Intrinsic value at grant date',
    ],
    correctAnswer: 1,
    explanation:
      'Under ASC 718, share-based payments to employees are measured at grant-date fair value, typically using an option pricing model like Black-Scholes.',
    reference: 'ASC 718-10-30-2',
  },
  {
    id: 'far-eq-004',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-V',
    topicId: 'far-equity',
    topic: "Stockholders' Equity",
    subtopic: 'EPS',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Diluted EPS includes the effect of:',
    options: [
      'Only securities that would increase EPS',
      'All outstanding securities',
      'Securities that are dilutive (would decrease EPS)',
      'All potentially dilutive securities',
    ],
    correctAnswer: 2,
    explanation:
      'Diluted EPS includes securities that are dilutive - those that would decrease EPS if converted/exercised. Antidilutive securities are excluded from the calculation.',
    reference: 'ASC 260-10-45-17',
  },

  // ==========================================
  // AREA 13: Consolidations
  // ==========================================

  {
    id: 'far-con-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-V',
    topicId: 'far-consolidation',
    topic: 'Consolidations',
    subtopic: 'Control',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A parent company must consolidate a subsidiary when it has:',
    options: [
      'A written agreement to consolidate',
      'Controlling financial interest',
      'Significant influence (20-50%)',
      'Any ownership interest',
    ],
    correctAnswer: 1,
    explanation:
      'Consolidation is required when a parent has a controlling financial interest, typically through majority voting ownership or variable interest entity (VIE) control.',
    reference: 'ASC 810-10-15-8',
  },
  {
    id: 'far-con-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-V',
    topicId: 'far-consolidation',
    topic: 'Consolidations',
    subtopic: 'Eliminations',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question:
      'Intercompany profit on inventory sold downstream (parent to sub) and remaining in ending inventory is eliminated against:',
    options: [
      "Subsidiary's retained earnings",
      'Both controlling and noncontrolling interest proportionally',
      'Noncontrolling interest',
      "The selling entity (parent's retained earnings)",
    ],
    correctAnswer: 3,
    explanation:
      'Downstream intercompany profits are eliminated entirely against the parent (selling entity). Upstream profits are eliminated against NCI and controlling interest proportionally.',
    reference: 'ASC 810-10-45-1',
  },
  {
    id: 'far-con-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-V',
    topicId: 'far-consolidation',
    topic: 'Consolidations',
    subtopic: 'Noncontrolling Interest',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Noncontrolling interest (NCI) is presented in the consolidated balance sheet:',
    options: [
      'As a contra-equity account',
      "As a component of stockholders' equity",
      'Between liabilities and equity',
      'As a liability',
    ],
    correctAnswer: 1,
    explanation:
      "Under ASC 810, NCI is presented as a separate component of equity in the consolidated balance sheet, distinct from parent's equity but within total equity.",
    reference: 'ASC 810-10-45-16',
  },

  // ==========================================
  // AREA 14: Government Accounting
  // ==========================================

  {
    id: 'far-gov-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-VI',
    topicId: 'far-government',
    topic: 'Governmental Accounting',
    subtopic: 'Fund Types',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The General Fund is an example of which fund type?',
    options: ['Fiduciary fund', 'Agency fund', 'Proprietary fund', 'Governmental fund'],
    correctAnswer: 3,
    explanation:
      'The General Fund is a governmental fund. Governmental funds include: General, Special Revenue, Capital Projects, Debt Service, and Permanent Funds.',
    reference: 'GASB Statement No. 34',
  },
  {
    id: 'far-gov-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-VI',
    topicId: 'far-government',
    topic: 'Governmental Accounting',
    subtopic: 'Measurement Focus',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Governmental funds use which measurement focus and basis of accounting?',
    options: [
      'Cash basis only',
      'Economic resources and modified accrual basis',
      'Economic resources and accrual basis',
      'Current financial resources and modified accrual basis',
    ],
    correctAnswer: 3,
    explanation:
      'Governmental funds use current financial resources measurement focus and modified accrual basis. Proprietary funds use economic resources and full accrual basis.',
    reference: 'GASB Statement No. 34',
  },
  {
    id: 'far-gov-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-VI',
    topicId: 'far-government',
    topic: 'Governmental Accounting',
    subtopic: 'Modified Accrual',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under modified accrual, revenues are recognized when:',
    options: [
      'Earned and available',
      'Measurable and available',
      'Earned only',
      'Cash is received',
    ],
    correctAnswer: 1,
    explanation:
      'Under modified accrual, revenues are recognized when measurable and available. Available means collectible within the current period or soon enough to pay current liabilities (typically 60 days).',
    reference: 'GASB Statement No. 33',
  },
  {
    id: 'far-gov-004',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-VI',
    topicId: 'far-government',
    topic: 'Governmental Accounting',
    subtopic: 'Fund Balance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question:
      'Fund balance that can only be used for specific purposes established by external parties is classified as:',
    options: [
      'Nonspendable',
      'Committed',
      'Assigned',
      'Restricted',
    ],
    correctAnswer: 3,
    explanation:
      "Restricted fund balance is limited by external parties (grantors, creditors, laws). Committed is limited by government's highest decision-making authority. Assigned is intended for specific purposes.",
    reference: 'GASB Statement No. 54',
  },

  // ==========================================
  // AREA 15: Not-for-Profit Accounting
  // ==========================================

  {
    id: 'far-nfp-001',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-VI',
    topicId: 'far-nfp',
    topic: 'Not-for-Profit Accounting',
    subtopic: 'Net Assets',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'NFP financial statements classify net assets into:',
    options: [
      'Four categories based on liquidity',
      'Three categories: unrestricted, temporarily restricted, permanently restricted',
      'One category: general net assets',
      'Two categories: with donor restrictions and without donor restrictions',
    ],
    correctAnswer: 3,
    explanation:
      'Under ASU 2016-14, NFPs classify net assets into two categories: (1) with donor restrictions and (2) without donor restrictions.',
    reference: 'ASC 958-210-45-1',
  },
  {
    id: 'far-nfp-002',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-VI',
    topicId: 'far-nfp',
    topic: 'Not-for-Profit Accounting',
    subtopic: 'Contributions',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An unconditional promise to give should be recognized:',
    options: [
      'When the promise is made, at present value if due in more than one year',
      'When cash is received',
      'At the end of the fiscal year',
      'Only if legally enforceable',
    ],
    correctAnswer: 0,
    explanation:
      'Unconditional promises to give are recognized as contribution revenue when made. If due in more than one year, they are recorded at present value.',
    reference: 'ASC 958-605-25-2',
  },
  {
    id: 'far-nfp-003',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-VI',
    topicId: 'far-nfp',
    topic: 'Not-for-Profit Accounting',
    subtopic: 'Contributions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Donated services are recognized as contribution revenue only if they:',
    options: [
      'Exceed $5,000 in value',
      'Have any value to the organization',
      'Create or enhance nonfinancial assets, or require specialized skills and would be purchased if not donated',
      'Are provided by professionals',
    ],
    correctAnswer: 2,
    explanation:
      'Donated services are recognized only if they: (1) create or enhance nonfinancial assets, or (2) require specialized skills, are provided by someone with those skills, and would typically be purchased if not donated.',
    reference: 'ASC 958-605-25-16',
  },
  {
    id: 'far-nfp-004',
    section: 'FAR',
    courseId: 'cpa',
    blueprintArea: 'FAR-VI',
    topicId: 'far-nfp',
    topic: 'Not-for-Profit Accounting',
    subtopic: 'Functional Expenses',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'NFPs must present expenses by:',
    options: [
      'Both functional and natural classification',
      'Functional classification only',
      'Natural classification only',
      "Either functional or natural, at management's discretion",
    ],
    correctAnswer: 0,
    explanation:
      'NFPs must present expenses by both functional classification (program vs. support) and natural classification (salaries, rent, etc.), either on the face of the statements or in the notes.',
    reference: 'ASC 958-720-45-1',
  },
];

export default FAR_QUESTIONS;
