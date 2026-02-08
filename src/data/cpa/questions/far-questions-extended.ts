// FAR - Extended Question Bank
// Additional 200+ questions for comprehensive CPA exam preparation

import { Question } from '../../../types';

export const FAR_QUESTIONS_EXTENDED: Question[] = [
  // ==========================================
  // REVENUE RECOGNITION (ASC 606)
  // ==========================================
  {
    id: 'far-ext-rev-001',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'Five-Step Model',
    difficulty: 'medium',
    question: 'Under ASC 606, the five steps of revenue recognition are performed in which order?',
    options: [
      'Identify performance obligations → Identify contract → Determine price → Recognize revenue → Allocate price',
      'Determine price → Identify contract → Allocate price → Identify performance obligations → Recognize revenue',
      'Identify contract → Identify performance obligations → Determine price → Allocate price → Recognize revenue',
      'Recognize revenue → Identify contract → Identify performance obligations → Determine price → Allocate price'
    ],
    correctAnswer: 2,
    explanation:
      'ASC 606 five-step model: (1) Identify the contract with customer, (2) Identify performance obligations, (3) Determine transaction price, (4) Allocate transaction price, (5) Recognize revenue when/as performance obligations are satisfied.',
    reference: 'ASC 606-10-05',
  },
  {
    id: 'far-ext-rev-002',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'Performance Obligations',
    difficulty: 'hard',
    question:
      'A software company sells a software license ($800) with 2 years of technical support ($200). These are deemed to be distinct. Using relative standalone selling prices (license $900, support $300 total), how much revenue is recognized at contract inception?',
    options: [
      '$750',
      '$800',
      '$667',
      '$900'
    ],
    correctAnswer: 0,
    explanation:
      'Total SSP = $900 + $300 = $1,200. Contract price = $1,000. License allocation = $1,000 × ($900/$1,200) = $750 recognized at inception. Support = $250 recognized over 2 years.',
    reference: 'ASC 606-10-32',
  },
  {
    id: 'far-ext-rev-003',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'Variable Consideration',
    difficulty: 'hard',
    question:
      'A company sells goods for $100,000 with a right of return. Based on history, 5% of sales are returned. Using the expected value method, what revenue is recognized?',
    options: ['$95,000', '$100,000', '$97,500', '$90,000'],
    correctAnswer: 0,
    explanation:
      'Variable consideration (expected returns) reduces revenue. Revenue = $100,000 × 95% = $95,000. A refund liability of $5,000 is recorded. An asset is recorded for expected returned goods.',
    reference: 'ASC 606-10-32-5',
  },
  {
    id: 'far-ext-rev-004',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'Over Time Recognition',
    difficulty: 'medium',
    question: 'Revenue is recognized over time if which criterion is met?',
    options: [
      'Payment terms exceed 12 months',
      'The asset has an alternative use to the seller',
      'Customer receives and consumes benefits simultaneously',
      'The contract contains variable consideration'
    ],
    correctAnswer: 2,
    explanation:
      'Revenue is recognized over time if: (1) customer simultaneously receives/consumes benefits, (2) entity creates/enhances asset controlled by customer, or (3) asset has no alternative use and entity has right to payment. Otherwise, recognize at a point in time.',
    reference: 'ASC 606-10-25-27',
  },
  {
    id: 'far-ext-rev-005',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    subtopic: 'Contract Modifications',
    difficulty: 'hard',
    question:
      'A contract modification adds distinct goods at standalone selling price. This modification is treated as:',
    options: [
      'A separate contract',
      'A termination of the old contract and creation of new contract',
      'A prospective adjustment to the existing contract',
      'A cumulative catch-up adjustment'
    ],
    correctAnswer: 0,
    explanation:
      'If a modification adds distinct goods at standalone selling price, it is accounted for as a separate contract. No adjustment to existing contract revenue.',
    reference: 'ASC 606-10-25-12',
  },

  // ==========================================
  // LEASES (ASC 842)
  // ==========================================
  {
    id: 'far-ext-lease-001',
    section: 'FAR',
    blueprintArea: 'FAR-IV',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Classification',
    difficulty: 'medium',
    question: 'Under ASC 842, a lease is classified as a finance lease if:',
    options: [
      "The lease term is at least 50% of the asset's economic life",
      'Any of the five criteria are met',
      'Ownership transfers to lessee at end of lease term',
      'Present value of lease payments is at least 75% of fair value'
    ],
    correctAnswer: 1,
    explanation:
      'Finance lease criteria (any one triggers finance lease): (1) ownership transfer, (2) purchase option reasonably certain, (3) lease term ≥ 75% of economic life, (4) PV payments ≥ 90% of FV, (5) specialized asset.',
    reference: 'ASC 842-10-25-2',
  },
  {
    id: 'far-ext-lease-002',
    section: 'FAR',
    blueprintArea: 'FAR-IV',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Lessee Accounting',
    difficulty: 'hard',
    question:
      'A lessee enters a 5-year lease with annual payments of $10,000 at year-end. The incremental borrowing rate is 6%. PV factor for ordinary annuity = 4.2124. What is the initial right-of-use asset?',
    options: [
      '$42,124',
      '$50,000',
      '$47,170',
      '$40,000'
    ],
    correctAnswer: 0,
    explanation:
      'ROU asset = PV of lease payments = $10,000 × 4.2124 = $42,124. The lease liability is also $42,124 initially (assuming no initial direct costs, prepaid rent, or lease incentives).',
    reference: 'ASC 842-20-30-1',
  },
  {
    id: 'far-ext-lease-003',
    section: 'FAR',
    blueprintArea: 'FAR-IV',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Lessee Accounting',
    difficulty: 'hard',
    question: 'For an operating lease, the lessee recognizes on the income statement:',
    options: [
      'A single lease expense on a straight-line basis',
      'Interest expense and amortization expense separately',
      'Only cash payments as rent expense',
      'Depreciation expense only'
    ],
    correctAnswer: 0,
    explanation:
      'Operating lease lessees recognize a single lease expense typically on a straight-line basis (unless another systematic basis is more representative). The expense combines interest on liability and amortization of ROU asset.',
    reference: 'ASC 842-20-25-6',
  },
  {
    id: 'far-ext-lease-004',
    section: 'FAR',
    blueprintArea: 'FAR-IV',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Lessor Accounting',
    difficulty: 'medium',
    question:
      'A lessor classifies a lease as a sales-type lease. At lease commencement, the lessor recognizes:',
    options: [
      'Lease receivable and deferred profit',
      'Rental income over the lease term',
      'Lease receivable only',
      'Net investment in lease and selling profit/loss'
    ],
    correctAnswer: 3,
    explanation:
      'For sales-type leases, the lessor derecognizes the asset, records a net investment in lease (receivable + unguaranteed residual), and recognizes selling profit or loss at commencement.',
    reference: 'ASC 842-30-25-1',
  },
  {
    id: 'far-ext-lease-005',
    section: 'FAR',
    blueprintArea: 'FAR-IV',
    topicId: 'far-leases',
    topic: 'Leases',
    subtopic: 'Sale-Leaseback',
    difficulty: 'hard',
    question:
      'In a sale-leaseback qualifying as a sale under ASC 606, the seller-lessee recognizes:',
    options: [
      'Gain proportionate to the rights transferred',
      'No gain - defer until lease ends',
      'Full gain on sale immediately',
      'Financing transaction only'
    ],
    correctAnswer: 0,
    explanation:
      'If the transfer qualifies as a sale, the seller-lessee recognizes gain/loss only for the amount relating to rights transferred. Gain on the retained portion (leaseback) is not recognized.',
    reference: 'ASC 842-40-25',
  },

  // ==========================================
  // FINANCIAL INSTRUMENTS
  // ==========================================
  {
    id: 'far-fi-001',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    topicId: 'far-investments',
    topic: 'Financial Instruments',
    subtopic: 'Debt Securities',
    difficulty: 'medium',
    question:
      'A company purchases bonds intending to hold them to collect contractual cash flows. How are these classified?',
    options: [
      'Trading securities',
      'Available-for-sale securities',
      'Fair value through profit or loss',
      'Held-to-maturity securities'
    ],
    correctAnswer: 3,
    explanation:
      'Debt securities held with intent and ability to hold to maturity are classified as held-to-maturity. They are carried at amortized cost with no unrealized gains/losses recognized.',
    reference: 'ASC 320-10-25',
  },
  {
    id: 'far-fi-002',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    topicId: 'far-investments',
    topic: 'Financial Instruments',
    subtopic: 'Debt Securities',
    difficulty: 'hard',
    question: 'Available-for-sale debt securities are measured at:',
    options: [
      'Amortized cost',
      'Fair value with changes in OCI',
      'Lower of cost or market',
      'Fair value with changes in net income'
    ],
    correctAnswer: 1,
    explanation:
      'AFS debt securities are measured at fair value. Unrealized holding gains/losses are reported in OCI (accumulated OCI in equity) until sold, when they are reclassified to earnings.',
    reference: 'ASC 320-10-35',
  },
  {
    id: 'far-fi-003',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    topicId: 'far-investments',
    topic: 'Financial Instruments',
    subtopic: 'Equity Investments',
    difficulty: 'medium',
    question:
      'Under ASC 321, equity investments without readily determinable fair values can be measured at:',
    options: [
      'Cost only',
      'Fair value only',
      'Lower of cost or market',
      'Cost minus impairment, plus/minus observable price changes'
    ],
    correctAnswer: 3,
    explanation:
      'ASC 321 provides a practical expedient: equity investments without RDFV can be measured at cost minus impairment, adjusted for observable price changes from orderly transactions in identical or similar investments.',
    reference: 'ASC 321-10-35-2',
  },
  {
    id: 'far-fi-004',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    topicId: 'far-investments',
    topic: 'Financial Instruments',
    subtopic: 'Equity Method',
    difficulty: 'hard',
    question:
      'An investor owns 30% of an investee acquired for $500,000. The investee reports net income of $100,000 and pays dividends of $40,000. What is the investment balance at year-end?',
    options: [
      '$518,000',
      '$512,000',
      '$530,000',
      '$500,000'
    ],
    correctAnswer: 0,
    explanation:
      'Equity method: Beginning balance + share of income - share of dividends. $500,000 + ($100,000 × 30%) - ($40,000 × 30%) = $500,000 + $30,000 - $12,000 = $518,000.',
    reference: 'ASC 323-10-35',
  },
  {
    id: 'far-fi-005',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    topicId: 'far-investments',
    topic: 'Financial Instruments',
    subtopic: 'Impairment',
    difficulty: 'hard',
    question: 'Under ASC 326 (CECL), expected credit losses on held-to-maturity securities are:',
    options: [
      'Recognized only when incurred',
      'Reported in OCI',
      'Recognized as an allowance reducing amortized cost',
      'Not applicable to HTM securities'
    ],
    correctAnswer: 2,
    explanation:
      'ASC 326 requires recognition of lifetime expected credit losses as an allowance (contra-asset) against amortized cost for HTM securities. Credit loss expense affects current earnings.',
    reference: 'ASC 326-20-30',
  },

  // ==========================================
  // INVENTORY
  // ==========================================
  {
    id: 'far-ext-inv-001',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    topicId: 'far-inventory',
    topic: 'Inventory',
    subtopic: 'Cost Flow Assumptions',
    difficulty: 'medium',
    question:
      'During a period of rising prices, which inventory method results in the highest net income?',
    options: [
      'LIFO',
      'FIFO',
      'Weighted average',
      'Specific identification'
    ],
    correctAnswer: 1,
    explanation:
      'FIFO (first-in, first-out) allocates older, lower costs to COGS, resulting in lower COGS and higher net income during inflation. LIFO results in higher COGS and lower net income.',
    reference: 'ASC 330-10-30',
  },
  {
    id: 'far-ext-inv-002',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    topicId: 'far-inventory',
    topic: 'Inventory',
    subtopic: 'Lower of Cost or NRV',
    difficulty: 'medium',
    question:
      'Inventory with cost of $50,000 has a net realizable value of $45,000. What is the journal entry?',
    options: [
      'Debit Loss on Inventory $5,000; Credit Inventory $5,000',
      'Debit COGS $5,000; Credit Allowance for Inventory $5,000',
      'No entry required',
      'Debit Inventory Expense $5,000; Credit Cash $5,000',
    ],
    correctAnswer: 0,
    explanation:
      'Inventory must be written down to lower of cost or NRV. The $5,000 loss is recognized immediately. Entry: Debit Loss (or COGS) $5,000; Credit Inventory (or Allowance) $5,000.',
    reference: 'ASC 330-10-35-1B',
  },
  {
    id: 'far-ext-inv-003',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    topicId: 'far-inventory',
    topic: 'Inventory',
    subtopic: 'Retail Method',
    difficulty: 'hard',
    question:
      'A retailer uses the conventional retail method. Which items are included in the cost-to-retail ratio calculation?',
    options: [
      'Beginning inventory, purchases, and markdowns',
      'Purchases, markups, and markdowns',
      'Beginning inventory, purchases, and net markups',
      'Beginning inventory, purchases, net markups, and net markdowns'
    ],
    correctAnswer: 2,
    explanation:
      'Conventional (LCM) retail method includes beginning inventory at cost/retail plus purchases and net markups in the cost ratio. Markdowns are excluded from ratio (only deducted from goods available at retail).',
    reference: 'ASC 330-10-30-8',
  },
  {
    id: 'far-ext-inv-004',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    topicId: 'far-inventory',
    topic: 'Inventory',
    subtopic: 'Dollar-Value LIFO',
    difficulty: 'hard',
    question:
      'A company uses dollar-value LIFO. The base year inventory was $100,000. Current year inventory at current prices is $132,000 and the price index is 1.10. What is the LIFO layer added in the current year?',
    options: ['$32,000', '$20,000', '$22,000', '$12,000'],
    correctAnswer: 2,
    explanation:
      'Current inventory at base-year prices: $132,000 ÷ 1.10 = $120,000. Layer added at base = $120,000 - $100,000 = $20,000. Layer at current prices = $20,000 × 1.10 = $22,000.',
    reference: 'ASC 330-10-30',
  },
  {
    id: 'far-ext-inv-005',
    section: 'FAR',
    blueprintArea: 'FAR-II',
    topicId: 'far-inventory',
    topic: 'Inventory',
    subtopic: 'Consignment',
    difficulty: 'easy',
    question: 'Goods on consignment are included in the inventory of:',
    options: [
      'The consignee (holder of goods)',
      'Neither - consigned goods are expensed',
      'Both consignor and consignee',
      'The consignor (owner of goods)'
    ],
    correctAnswer: 3,
    explanation:
      'Consigned goods remain the property of the consignor until sold. The consignor includes them in inventory. The consignee does not own the goods and does not include them in inventory.',
    reference: 'ASC 330-10-30',
  },

  // ==========================================
  // FIXED ASSETS AND DEPRECIATION
  // ==========================================
  {
    id: 'far-ext-fa-001',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    topicId: 'far-ppe',
    topic: 'Fixed Assets',
    subtopic: 'Capitalization',
    difficulty: 'medium',
    question:
      'Which of the following costs should be capitalized for equipment purchased and installed?',
    options: [
      'Annual maintenance costs',
      'Property taxes after the asset is in use',
      'Installation and testing costs',
      'Insurance after the asset is in use'
    ],
    correctAnswer: 2,
    explanation:
      'Capitalizable costs for equipment include purchase price, freight, installation, testing, and any costs necessary to bring the asset to its intended use. Operating costs after the asset is ready are expensed.',
    reference: 'ASC 360-10-30',
  },
  {
    id: 'far-ext-fa-002',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    topicId: 'far-ppe',
    topic: 'Fixed Assets',
    subtopic: 'Depreciation',
    difficulty: 'medium',
    question:
      'Equipment costs $100,000 with $10,000 salvage value and 10-year life. Using double-declining balance, what is Year 1 depreciation?',
    options: [
      '$9,000',
      '$18,000',
      '$20,000',
      '$10,000'
    ],
    correctAnswer: 2,
    explanation:
      'DDB rate = 2 × (1/10) = 20%. Year 1 depreciation = $100,000 × 20% = $20,000. Note: Salvage value is ignored in DDB calculation until book value approaches salvage.',
    reference: 'ASC 360-10-35',
  },
  {
    id: 'far-ext-fa-003',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    topicId: 'far-ppe',
    topic: 'Fixed Assets',
    subtopic: 'Impairment',
    difficulty: 'hard',
    question:
      'An asset with carrying value of $500,000 has undiscounted future cash flows of $450,000 and fair value of $400,000. What impairment loss is recognized?',
    options: [
      '$0 - no impairment',
      '$50,000',
      '$100,000',
      '$450,000'
    ],
    correctAnswer: 2,
    explanation:
      'Step 1: Recoverability test - undiscounted cash flows ($450,000) < carrying value ($500,000), so impairment exists. Step 2: Measure loss = carrying value - fair value = $500,000 - $400,000 = $100,000.',
    reference: 'ASC 360-10-35-17',
  },
  {
    id: 'far-fa-004',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    topicId: 'far-ppe',
    topic: 'Fixed Assets',
    subtopic: 'Asset Retirement Obligations',
    difficulty: 'hard',
    question:
      'A company installs equipment with a legal obligation to remove it in 10 years at an estimated cost of $50,000. The credit-adjusted risk-free rate is 6%. The PV factor is 0.5584. What is the initial ARO liability?',
    options: [
      '$5,000',
      '$50,000',
      '$30,000',
      '$27,920'
    ],
    correctAnswer: 3,
    explanation:
      'Initial ARO = PV of future removal cost = $50,000 × 0.5584 = $27,920. The asset is also increased by $27,920. Each year, accretion expense increases the liability.',
    reference: 'ASC 410-20-25',
  },
  {
    id: 'far-fa-005',
    section: 'FAR',
    blueprintArea: 'FAR-III',
    topicId: 'far-ppe',
    topic: 'Fixed Assets',
    subtopic: 'Nonmonetary Exchanges',
    difficulty: 'hard',
    question:
      'In a nonmonetary exchange with commercial substance, the asset received is recorded at:',
    options: [
      'Book value of asset given up',
      'Lower of cost or fair value',
      'Fair value of asset received (or given up if more clearly evident)',
      'Average of book value and fair value'
    ],
    correctAnswer: 2,
    explanation:
      'When an exchange has commercial substance, the asset received is recorded at fair value (usually of asset given up). Gain or loss equals FV of asset given up minus book value of asset given up.',
    reference: 'ASC 845-10-30',
  },

  // ==========================================
  // INTANGIBLE ASSETS
  // ==========================================
  {
    id: 'far-ext-int-001',
    section: 'FAR',
    blueprintArea: 'FAR-I',
    topicId: 'far-intangibles',
    topic: 'Intangible Assets',
    subtopic: 'Goodwill',
    difficulty: 'medium',
    question: 'How is goodwill tested for impairment under ASC 350?',
    options: [
      'Compared to undiscounted cash flows annually',
      'Reporting unit fair value compared to carrying amount',
      'Written down systematically over 10 years',
      'Compared to original purchase price'
    ],
    correctAnswer: 1,
    explanation:
      'Goodwill is tested at the reporting unit level. If the carrying amount exceeds fair value, impairment equals the excess (limited to goodwill balance). Companies may first assess qualitative factors.',
    reference: 'ASC 350-20-35',
  },
  {
    id: 'far-ext-int-002',
    section: 'FAR',
    blueprintArea: 'FAR-I',
    topicId: 'far-intangibles',
    topic: 'Intangible Assets',
    subtopic: 'Research and Development',
    difficulty: 'easy',
    question: 'Under U.S. GAAP, research and development costs are:',
    options: [
      'Capitalized and amortized over useful life',
      'Capitalized only if technological feasibility is achieved',
      'Expensed as incurred',
      'Deferred until product is sold'
    ],
    correctAnswer: 2,
    explanation:
      'R&D costs are expensed as incurred under U.S. GAAP. Exception: Software development costs are capitalized after technological feasibility is established.',
    reference: 'ASC 730-10-25',
  },
  {
    id: 'far-ext-int-003',
    section: 'FAR',
    blueprintArea: 'FAR-I',
    topicId: 'far-intangibles',
    topic: 'Intangible Assets',
    subtopic: 'Software Development',
    difficulty: 'hard',
    question:
      'Costs incurred to develop software for sale to others after technological feasibility are:',
    options: [
      'Expensed as R&D',
      'Deferred and recognized when software is sold',
      'Capitalized only if expected revenues exceed costs',
      'Capitalized and amortized based on greater of revenue ratio or straight-line'
    ],
    correctAnswer: 3,
    explanation:
      'After technological feasibility (working model or detailed program design), costs are capitalized. Amortization is greater of (1) revenue ratio or (2) straight-line over remaining economic life. Subject to NRV ceiling.',
    reference: 'ASC 985-20',
  },
  {
    id: 'far-ext-int-004',
    section: 'FAR',
    blueprintArea: 'FAR-I',
    topicId: 'far-intangibles',
    topic: 'Intangible Assets',
    subtopic: 'Internally Developed Intangibles',
    difficulty: 'medium',
    question: 'A company internally develops a patent. Legal fees to obtain the patent are:',
    options: [
      'Expensed as incurred',
      'Capitalized as part of patent cost',
      'Reported as a reduction of equity',
      'Deferred and amortized separately',
    ],
    correctAnswer: 1,
    explanation:
      "Legal fees to obtain a patent (registration, documentation) are capitalized as part of the patent's cost. However, internal R&D costs to develop the underlying invention are expensed.",
    reference: 'ASC 350-30-25',
  },
  {
    id: 'far-ext-int-005',
    section: 'FAR',
    blueprintArea: 'FAR-I',
    topicId: 'far-intangibles',
    topic: 'Intangible Assets',
    subtopic: 'Finite-Life Intangibles',
    difficulty: 'medium',
    question: 'An acquired customer list has a useful life of 8 years. It should be:',
    options: [
      'Tested for impairment annually but not amortized',
      'Amortized over 15 years maximum',
      'Written off immediately',
      'Amortized over 8 years and tested for impairment when indicators exist'
    ],
    correctAnswer: 3,
    explanation:
      'Finite-life intangibles are amortized over their useful lives (here 8 years). They are tested for impairment when events indicate carrying value may not be recoverable (not annually like goodwill).',
    reference: 'ASC 350-30-35',
  },

  // ==========================================
  // LIABILITIES
  // ==========================================
  {
    id: 'far-ext-liab-001',
    section: 'FAR',
    blueprintArea: 'FAR-IV',
    topicId: 'far-liabilities',
    topic: 'Liabilities',
    subtopic: 'Contingencies',
    difficulty: 'medium',
    question: 'A loss contingency should be accrued when the loss is:',
    options: [
      'Possible and reasonably estimable',
      'Probable and reasonably estimable',
      'Remote and reasonably estimable',
      'Probable regardless of estimability'
    ],
    correctAnswer: 1,
    explanation:
      'Under ASC 450, a loss contingency is accrued when (1) it is probable that a liability has been incurred and (2) the amount can be reasonably estimated. Both conditions must be met.',
    reference: 'ASC 450-20-25',
  },
  {
    id: 'far-ext-liab-002',
    section: 'FAR',
    blueprintArea: 'FAR-IV',
    topicId: 'far-liabilities',
    topic: 'Liabilities',
    subtopic: 'Warranties',
    difficulty: 'hard',
    question:
      'A company sells products with 2-year warranties. Sales are $1,000,000 and estimated warranty costs are 3% of sales. Actual warranty repairs in Year 1 were $15,000. What is the warranty liability at year-end?',
    options: [
      '$30,000',
      '$15,000',
      '$10,000',
      '$45,000'
    ],
    correctAnswer: 1,
    explanation:
      'Warranty expense accrued = $1,000,000 × 3% = $30,000. Actual repairs reduce liability by $15,000. Ending liability = $30,000 - $15,000 = $15,000.',
    reference: 'ASC 460-10-25',
  },
  {
    id: 'far-ext-liab-003',
    section: 'FAR',
    blueprintArea: 'FAR-IV',
    topicId: 'far-liabilities',
    topic: 'Liabilities',
    subtopic: 'Bonds Payable',
    difficulty: 'hard',
    question: 'A $100,000, 10% bond is issued at 103 when market rate is 9%. The premium is:',
    options: [
      'Amortized to decrease interest expense',
      'Amortized to increase interest expense',
      'Reported as a separate liability',
      'Recognized as revenue at issuance'
    ],
    correctAnswer: 0,
    explanation:
      "Bond premium (issued above face) is amortized over the bond's life, reducing interest expense each period. Effective interest = carrying value × market rate. Cash interest = face × stated rate.",
    reference: 'ASC 835-30-35',
  },
  {
    id: 'far-ext-liab-004',
    section: 'FAR',
    blueprintArea: 'FAR-IV',
    topicId: 'far-liabilities',
    topic: 'Liabilities',
    subtopic: 'Troubled Debt',
    difficulty: 'hard',
    question:
      'In a troubled debt restructuring, a debtor settles a $500,000 debt by transferring land with FMV of $400,000 and book value of $350,000. What gain does the debtor recognize?',
    options: [
      '$100,000 gain on debt restructuring; $50,000 gain on asset separately',
      '$100,000 gain on debt restructuring only',
      '$150,000 total gain',
      '$50,000 gain on asset transfer only'
    ],
    correctAnswer: 0,
    explanation:
      'Two separate gains: (1) Gain on asset disposal = $400,000 FMV - $350,000 BV = $50,000. (2) Gain on debt restructuring = $500,000 debt - $400,000 FMV of asset = $100,000.',
    reference: 'ASC 470-60',
  },
  {
    id: 'far-ext-liab-005',
    section: 'FAR',
    blueprintArea: 'FAR-IV',
    topicId: 'far-liabilities',
    topic: 'Liabilities',
    subtopic: 'Deferred Revenue',
    difficulty: 'easy',
    question:
      'A company receives $12,000 on January 1 for a 12-month service contract. What is the liability balance on March 31?',
    options: [
      '$12,000',
      '$3,000',
      '$0',
      '$9,000'
    ],
    correctAnswer: 3,
    explanation:
      'Monthly revenue = $12,000 ÷ 12 = $1,000. After 3 months (Jan-Mar), $3,000 is earned and $9,000 remains as deferred revenue (liability).',
    reference: 'ASC 606-10-45',
  },

  // ==========================================
  // EQUITY
  // ==========================================
  {
    id: 'far-ext-eq-001',
    section: 'FAR',
    blueprintArea: 'FAR-V',
    topicId: 'far-equity',
    topic: 'Equity',
    subtopic: 'Treasury Stock',
    difficulty: 'medium',
    question:
      'A company reacquires 1,000 shares at $50/share using the cost method. The par value is $10. The treasury stock is reported at:',
    options: [
      '$10,000 (par value)',
      '$40,000 (cost minus par)',
      '$50,000 (cost)',
      '$0 (treasury stock is retired)'
    ],
    correctAnswer: 2,
    explanation:
      "Under the cost method, treasury stock is recorded at reacquisition cost ($50,000). It is reported as a deduction from total stockholders' equity.",
    reference: 'ASC 505-30-30',
  },
  {
    id: 'far-ext-eq-002',
    section: 'FAR',
    blueprintArea: 'FAR-V',
    topicId: 'far-equity',
    topic: 'Equity',
    subtopic: 'Stock Dividends',
    difficulty: 'hard',
    question:
      'A company declares a 5% stock dividend when 100,000 shares are outstanding, market price is $30, and par value is $1. What amount is transferred to common stock?',
    options: [
      '$150,000',
      '$145,000',
      '$5,000',
      '$50,000'
    ],
    correctAnswer: 2,
    explanation:
      'Small stock dividend (< 20-25%): Record at FMV. New shares = 100,000 × 5% = 5,000. Transfer to common stock at par = 5,000 × $1 = $5,000. APIC increases by ($30-$1) × 5,000 = $145,000.',
    reference: 'ASC 505-20-30',
  },
  {
    id: 'far-ext-eq-003',
    section: 'FAR',
    blueprintArea: 'FAR-V',
    topicId: 'far-equity',
    topic: 'Equity',
    subtopic: 'Stock Compensation',
    difficulty: 'hard',
    question:
      'A company grants 10,000 options with fair value of $5 each. They vest over 4 years (cliff vesting). What is Year 1 compensation expense?',
    options: [
      '$12,500',
      '$50,000',
      '$0',
      '$25,000'
    ],
    correctAnswer: 0,
    explanation:
      'Total compensation = 10,000 × $5 = $50,000. Recognized over 4-year service period. Year 1 expense = $50,000 ÷ 4 = $12,500.',
    reference: 'ASC 718-10-35',
  },
  {
    id: 'far-ext-eq-004',
    section: 'FAR',
    blueprintArea: 'FAR-V',
    topicId: 'far-equity',
    topic: 'Equity',
    subtopic: 'EPS',
    difficulty: 'hard',
    question:
      'Net income is $1,000,000. Preferred dividends are $100,000. Weighted-average common shares are 200,000, and 50,000 dilutive shares exist from stock options. What is diluted EPS?',
    options: ['$4.50',
      '$5.00',
      '$4.00',
      '$3.60'],
    correctAnswer: 3,
    explanation:
      'Diluted EPS numerator = $1,000,000 - $100,000 = $900,000 (same as basic for options). Denominator = 200,000 + 50,000 = 250,000. Diluted EPS = $900,000 ÷ 250,000 = $3.60.',
    reference: 'ASC 260-10-45',
  },
  {
    id: 'far-ext-eq-005',
    section: 'FAR',
    blueprintArea: 'FAR-V',
    topicId: 'far-equity',
    topic: 'Equity',
    subtopic: 'Retained Earnings',
    difficulty: 'easy',
    question: 'Which of the following does NOT affect retained earnings?',
    options: [
      'Net income',
      'Unrealized gains on AFS securities',
      'Prior period adjustments',
      'Cash dividends declared'
    ],
    correctAnswer: 1,
    explanation:
      'Unrealized gains/losses on AFS securities are reported in OCI (accumulated OCI), not retained earnings. Net income, dividends, and prior period adjustments directly affect retained earnings.',
    reference: 'ASC 320-10-35, ASC 220-10-45',
  },

  // ==========================================
  // CASH FLOW STATEMENT
  // ==========================================
  {
    id: 'far-ext-cf-001',
    section: 'FAR',
    blueprintArea: 'FAR-I',
    topicId: 'far-cash-flows',
    topic: 'Statement of Cash Flows',
    subtopic: 'Operating Activities',
    difficulty: 'medium',
    question:
      'Under the indirect method, which adjustment is made for a gain on sale of equipment?',
    options: [
      'Subtracted from net income',
      'Added to net income',
      'Reported in investing activities only',
      'Reported in financing activities'
    ],
    correctAnswer: 0,
    explanation:
      'Gains on sale of equipment are subtracted from net income in operating activities because: (1) they are non-operating, and (2) the full cash proceeds are reported in investing activities.',
    reference: 'ASC 230-10-45',
  },
  {
    id: 'far-ext-cf-002',
    section: 'FAR',
    blueprintArea: 'FAR-I',
    topicId: 'far-cash-flows',
    topic: 'Statement of Cash Flows',
    subtopic: 'Investing Activities',
    difficulty: 'easy',
    question: 'Which of the following is an investing activity?',
    options: [
      'Payment of dividends',
      'Proceeds from issuing bonds',
      'Interest paid on debt',
      'Purchase of equipment'
    ],
    correctAnswer: 3,
    explanation:
      'Purchase of equipment (long-lived assets) is an investing activity. Dividends and bond proceeds are financing. Interest paid is operating (U.S. GAAP).',
    reference: 'ASC 230-10-45-13',
  },
  {
    id: 'far-ext-cf-003',
    section: 'FAR',
    blueprintArea: 'FAR-I',
    topicId: 'far-cash-flows',
    topic: 'Statement of Cash Flows',
    subtopic: 'Financing Activities',
    difficulty: 'easy',
    question: 'Which of the following is a financing activity?',
    options: [
      'Interest received on investments',
      'Payment to suppliers',
      'Collection of accounts receivable',
      'Purchase of treasury stock'
    ],
    correctAnswer: 3,
    explanation:
      'Purchase of treasury stock is a financing activity (transaction with owners). Interest received and collections/payments are operating activities.',
    reference: 'ASC 230-10-45-15',
  },
  {
    id: 'far-ext-cf-004',
    section: 'FAR',
    blueprintArea: 'FAR-I',
    topicId: 'far-cash-flows',
    topic: 'Statement of Cash Flows',
    subtopic: 'Non-Cash Activities',
    difficulty: 'medium',
    question:
      'A company issues stock to acquire land. How is this reported on the statement of cash flows?',
    options: [
      'Investing cash outflow',
      'Financing cash inflow and investing cash outflow',
      'Disclosed in supplemental schedule (non-cash)',
      'Not reported',
    ],
    correctAnswer: 2,
    explanation:
      'Non-cash investing and financing activities (like exchanging stock for assets) are disclosed in a supplemental schedule or notes, not within the body of the cash flow statement.',
    reference: 'ASC 230-10-50',
  },
  {
    id: 'far-ext-cf-005',
    section: 'FAR',
    blueprintArea: 'FAR-I',
    topicId: 'far-cash-flows',
    topic: 'Statement of Cash Flows',
    subtopic: 'Operating - Indirect',
    difficulty: 'hard',
    question:
      "A company's net income is $50,000. Depreciation is $10,000. Accounts receivable increased $5,000. Accounts payable decreased $3,000. What is cash from operating activities?",
    options: ['$68,000',
      '$58,000',
      '$42,000',
      '$52,000'],
    correctAnswer: 3,
    explanation:
      'Cash from operations = $50,000 + $10,000 (add depreciation) - $5,000 (subtract A/R increase) - $3,000 (subtract A/P decrease) = $52,000.',
    reference: 'ASC 230-10-45-28',
  },

  // ==========================================
  // GOVERNMENT AND NFP ACCOUNTING
  // ==========================================
  {
    id: 'far-ext-gov-001',
    section: 'FAR',
    blueprintArea: 'FAR-VI',
    topicId: 'far-government',
    topic: 'Government Accounting',
    subtopic: 'Fund Accounting',
    difficulty: 'medium',
    question: 'The General Fund uses which measurement focus and basis of accounting?',
    options: [
      'Economic resources, accrual',
      'Current financial resources, accrual',
      'Current financial resources, modified accrual',
      'Economic resources, modified accrual'
    ],
    correctAnswer: 2,
    explanation:
      'Governmental funds (including General Fund) use current financial resources measurement focus and modified accrual basis. Government-wide statements use economic resources/accrual.',
    reference: 'GASB Statement 34',
  },
  {
    id: 'far-ext-gov-002',
    section: 'FAR',
    blueprintArea: 'FAR-VI',
    topicId: 'far-government',
    topic: 'Government Accounting',
    subtopic: 'Fund Types',
    difficulty: 'medium',
    question: 'Which fund type would account for a toll bridge financed by user fees?',
    options: [
      'General Fund',
      'Special Revenue Fund',
      'Enterprise Fund',
      'Capital Projects Fund'
    ],
    correctAnswer: 2,
    explanation:
      'Enterprise funds (proprietary funds) account for activities financed primarily through user charges (like toll bridges, utilities, airports). They operate like businesses.',
    reference: 'GASB Statement 34',
  },
  {
    id: 'far-ext-gov-003',
    section: 'FAR',
    blueprintArea: 'FAR-VI',
    topicId: 'far-government',
    topic: 'Government Accounting',
    subtopic: 'Modified Accrual',
    difficulty: 'hard',
    question: 'Under modified accrual, revenues are recognized when:',
    options: ['Earned',
      'Measurable and available',
      'Collected',
      'Budgeted'],
    correctAnswer: 1,
    explanation:
      'Under modified accrual basis, revenues are recognized when measurable (amount determinable) and available (collectible within current period or soon enough to pay current liabilities, typically 60 days).',
    reference: 'GASB Statement 33',
  },
  {
    id: 'far-ext-gov-004',
    section: 'FAR',
    blueprintArea: 'FAR-VI',
    topicId: 'far-government',
    topic: 'Government Accounting',
    subtopic: 'Encumbrances',
    difficulty: 'hard',
    question: 'When a purchase order is issued by a governmental fund, the entry is:',
    options: [
      'Debit Encumbrances; Credit Reserve for Encumbrances',
      'Debit Expenditures; Credit Vouchers Payable',
      'Debit Supplies; Credit Cash',
      'No entry until goods received'
    ],
    correctAnswer: 0,
    explanation:
      'Encumbrance accounting reserves budget for outstanding commitments. Entry: Debit Encumbrances (budgetary account); Credit Reserve/Fund Balance-Encumbrances. Reversed when goods received.',
    reference: 'GASB Statement 54',
  },
  {
    id: 'far-ext-gov-005',
    section: 'FAR',
    blueprintArea: 'FAR-VI',
    topicId: 'far-government',
    topic: 'Government Accounting',
    subtopic: 'Government-Wide Statements',
    difficulty: 'medium',
    question: 'Government-wide financial statements include:',
    options: [
      'Statement of Cash Flows and Income Statement',
      'Balance Sheet and Statement of Revenues, Expenditures, and Changes in Fund Balance',
      'Statement of Net Position and Statement of Activities',
      'Budgetary Comparison Schedule'
    ],
    correctAnswer: 2,
    explanation:
      'Government-wide statements (full accrual basis) include Statement of Net Position (like balance sheet) and Statement of Activities (like income statement). Fund statements are separate.',
    reference: 'GASB Statement 34',
  },

  // ==========================================
  // NOT-FOR-PROFIT ACCOUNTING
  // ==========================================
  {
    id: 'far-ext-nfp-001',
    section: 'FAR',
    blueprintArea: 'FAR-VI',
    topicId: 'far-nfp',
    topic: 'Not-for-Profit',
    subtopic: 'Net Asset Classifications',
    difficulty: 'medium',
    question: 'Under ASC 958, net assets of NFPs are classified as:',
    options: [
      'Without donor restrictions and with donor restrictions',
      'Unrestricted, temporarily restricted, permanently restricted',
      'Operating, investing, and financing',
      'Current and noncurrent'
    ],
    correctAnswer: 0,
    explanation:
      'ASU 2016-14 simplified classifications to two: net assets without donor restrictions and net assets with donor restrictions (combining former temp and permanent categories).',
    reference: 'ASC 958-210-45',
  },
  {
    id: 'far-ext-nfp-002',
    section: 'FAR',
    blueprintArea: 'FAR-VI',
    topicId: 'far-nfp',
    topic: 'Not-for-Profit',
    subtopic: 'Contributions',
    difficulty: 'hard',
    question:
      'A donor gives $100,000 stipulating that only the earnings may be used for scholarships. This is reported as:',
    options: [
      'Revenue without donor restrictions',
      'Revenue with donor restrictions (time)',
      'Deferred revenue',
      'Revenue with donor restrictions (purpose and perpetual)'
    ],
    correctAnswer: 3,
    explanation:
      'This is an endowment with perpetual restriction on principal and purpose restriction on earnings (scholarships). Reported as revenue with donor restrictions.',
    reference: 'ASC 958-605-25',
  },
  {
    id: 'far-ext-nfp-003',
    section: 'FAR',
    blueprintArea: 'FAR-VI',
    topicId: 'far-nfp',
    topic: 'Not-for-Profit',
    subtopic: 'Contributions',
    difficulty: 'medium',
    question: 'When a time restriction on a contribution is met, the NFP:',
    options: [
      'Reclassifies from restricted to unrestricted net assets',
      'Recognizes revenue at that time',
      'Returns the contribution',
      'Records a deferred inflow'
    ],
    correctAnswer: 0,
    explanation:
      'When restrictions are satisfied (time passes or purpose fulfilled), net assets are reclassified from with donor restrictions to without donor restrictions. This is shown as "Net assets released from restrictions."',
    reference: 'ASC 958-205-45',
  },
  {
    id: 'far-ext-nfp-004',
    section: 'FAR',
    blueprintArea: 'FAR-VI',
    topicId: 'far-nfp',
    topic: 'Not-for-Profit',
    subtopic: 'Functional Expenses',
    difficulty: 'medium',
    question: 'NFPs must present expenses by:',
    options: [
      'Natural classification only',
      'Functional classification only',
      'Neither - expenses shown in total only',
      'Both natural and functional classifications'
    ],
    correctAnswer: 3,
    explanation:
      'ASU 2016-14 requires NFPs to present expenses by both function (program services, management, fundraising) and nature (salaries, rent, etc.) either on the face of statements or in notes.',
    reference: 'ASC 958-720-45',
  },
  {
    id: 'far-ext-nfp-005',
    section: 'FAR',
    blueprintArea: 'FAR-VI',
    topicId: 'far-nfp',
    topic: 'Not-for-Profit',
    subtopic: 'Contributed Services',
    difficulty: 'hard',
    question: 'Contributed services are recognized as revenue if they:',
    options: [
      'Have any fair value',
      'Exceed $5,000 in value',
      'Are provided by licensed professionals only',
      'Create or enhance nonfinancial assets or require specialized skills'
    ],
    correctAnswer: 3,
    explanation:
      'Contributed services are recognized if they: (1) create or enhance nonfinancial assets, or (2) require specialized skills, are provided by persons with those skills, and would typically need to be purchased.',
    reference: 'ASC 958-605-25-16',
  },
];

export default FAR_QUESTIONS_EXTENDED;
