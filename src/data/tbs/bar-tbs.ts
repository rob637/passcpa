// BAR - Business Analysis and Reporting TBS
// Task-Based Simulations for BAR Section
// Covers: Business Combinations, Technical Accounting, Government Accounting, Financial Analysis

import { TBS, TBS_TYPES } from '../../types';

export const BAR_TBS: TBS[] = [
  // =========================================================================
  // AREA I: Business Combinations and Consolidations (15-25%)
  // =========================================================================
  {
    id: 'bar-tbs-001',
    section: 'BAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Business Combination - Acquisition Method',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Business Combinations',
    blueprintArea: 'BAR-I',
    blueprintTopic: 'BAR-I-A-1',
    scenario: `
Alpha Corp. acquires 100% of Beta Inc. on January 1, Year 1. The following information is available at the acquisition date:

• Cash paid by Alpha: $2,500,000
• Fair value of Alpha stock issued (100,000 shares at $15/share): $1,500,000
• Contingent consideration (fair value at acquisition date): $200,000
• Direct acquisition costs paid by Alpha: $75,000

Beta Inc.'s balance sheet at acquisition date (book values):
• Cash: $300,000
• Accounts Receivable: $450,000
• Inventory: $600,000
• Equipment (net): $1,200,000
• Total Assets: $2,550,000
• Accounts Payable: $350,000
• Long-term Debt: $800,000
• Common Stock: $500,000
• Retained Earnings: $900,000
• Total Liabilities & Equity: $2,550,000

Fair value adjustments:
• Inventory fair value: $650,000
• Equipment fair value: $1,400,000
• Customer relationships (identifiable intangible, not previously recorded): $300,000
• In-process R&D (identifiable intangible): $150,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the total consideration transferred in this business combination.',
        correctAnswer: 4200000,
        tolerance: 0,
        explanation: 'Total consideration = Cash ($2,500,000) + Stock ($1,500,000) + Contingent consideration ($200,000) = $4,200,000. Direct acquisition costs are expensed, not included in consideration.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the fair value of identifiable net assets acquired.',
        correctAnswer: 2900000,
        tolerance: 0,
        explanation: 'Fair value of net assets = Cash ($300,000) + AR ($450,000) + Inventory ($650,000) + Equipment ($1,400,000) + Customer relationships ($300,000) + R&D ($150,000) - AP ($350,000) - Debt ($800,000) = $2,900,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the goodwill recognized in this acquisition.',
        correctAnswer: 1300000,
        tolerance: 0,
        explanation: 'Goodwill = Consideration ($4,200,000) - Fair value of net assets ($2,900,000) = $1,300,000',
      },
      {
        id: 'req-4',
        type: 'journal_entry',
        question: 'Prepare the journal entry to record the acquisition on Alpha\'s books.',
        template: [
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
        ],
        correctEntries: [
          { account: 'Cash', debit: 300000, credit: null },
          { account: 'Accounts Receivable', debit: 450000, credit: null },
          { account: 'Inventory', debit: 650000, credit: null },
          { account: 'Equipment', debit: 1400000, credit: null },
          { account: 'Customer Relationships', debit: 300000, credit: null },
          { account: 'In-Process R&D', debit: 150000, credit: null },
          { account: 'Goodwill', debit: 1300000, credit: null },
          { account: 'Accounts Payable', debit: null, credit: 350000 },
          { account: 'Long-term Debt', debit: null, credit: 800000 },
          { account: 'Cash', debit: null, credit: 2500000 },
          { account: 'Common Stock', debit: null, credit: 1500000 },
          { account: 'Contingent Consideration Liability', debit: null, credit: 200000 },
        ],
        tolerance: 0,
      },
      {
        id: 'req-5',
        type: 'journal_entry',
        question: 'Prepare the journal entry to record the direct acquisition costs.',
        template: [
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
        ],
        correctEntries: [
          { account: 'Acquisition Expense', debit: 75000, credit: null },
          { account: 'Cash', debit: null, credit: 75000 },
        ],
        tolerance: 0,
      },
    ],
    hints: [
      'Under ASC 805, direct acquisition costs are EXPENSED, not capitalized',
      'Include ALL forms of consideration: cash, stock, and contingent consideration',
      'Identifiable intangibles (customer relationships, R&D) are recognized at fair value even if not on acquiree\'s books',
    ],
    references: ['ASC 805-10-25', 'ASC 805-20-25', 'ASC 805-30'],
  },
  {
    id: 'bar-tbs-002',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Consolidated Financial Statements - Intercompany Eliminations',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Consolidated Financial Statements',
    blueprintArea: 'BAR-I',
    blueprintTopic: 'BAR-I-B-2',
    scenario: `
Parent Corp. owns 80% of Sub Inc. (acquired at book value, no goodwill). The following intercompany transactions occurred during Year 1:

1. Parent sold inventory to Sub for $500,000. Parent's cost was $350,000. Sub still holds 40% of this inventory at year-end.

2. Sub sold land to Parent for $300,000. Sub's cost was $220,000.

3. Parent made management fee charges to Sub of $120,000 during the year.

4. Sub declared dividends of $100,000 during the year.

5. At year-end, Sub owes Parent $85,000 for inventory purchases.

Year-end trial balances (before consolidation adjustments):

Parent Corp:
• Sales: $4,000,000
• Cost of Sales: $2,400,000
• Management Fee Income: $120,000
• Dividend Income: $80,000
• Investment in Sub: $800,000

Sub Inc:
• Sales: $2,500,000
• Cost of Sales: $1,600,000
• Management Fee Expense: $120,000
• Gain on Sale of Land: $80,000
• Dividends Declared: $100,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the unrealized profit in ending inventory that must be eliminated.',
        correctAnswer: 60000,
        tolerance: 0,
        explanation: 'Unrealized profit = ($500,000 - $350,000) × 40% = $150,000 × 40% = $60,000. This represents the markup still in Sub\'s inventory.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the intercompany sales to be eliminated.',
        correctAnswer: 500000,
        tolerance: 0,
        explanation: 'All intercompany sales ($500,000) must be eliminated against the corresponding cost of sales.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the gain on land sale to be eliminated.',
        correctAnswer: 80000,
        tolerance: 0,
        explanation: 'The entire gain ($300,000 - $220,000 = $80,000) on the intercompany land sale must be eliminated.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the noncontrolling interest share of Sub\'s adjusted net income.',
        correctAnswer: 26000,
        tolerance: 100,
        explanation: 'Sub\'s adjusted net income = Sales ($2,500,000) - Cost of Sales ($1,600,000) - Mgmt Fee ($120,000) - Unrealized land gain ($80,000) = $700,000 - $80,000 = $620,000. NCI share = $620,000 × 20% + adjustment for downstream profit = varies based on transaction direction. If downstream (Parent to Sub), the unrealized inventory profit stays with Parent.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Which intercompany elimination affects consolidated Cost of Goods Sold?',
        options: [
          'Management fee elimination only',
          'Inventory sale and unrealized profit eliminations',
          'Land sale elimination only',
          'Dividend elimination only',
        ],
        correctAnswer: 1,
        explanation: 'The inventory sale elimination reduces both Sales and COGS. The unrealized profit in ending inventory increases consolidated COGS (reduces gross profit).',
      },
    ],
    hints: [
      'Intercompany sales eliminate 100% regardless of ownership percentage',
      'For downstream sales (parent to sub), unrealized profit is attributed 100% to parent',
      'For upstream sales (sub to parent), unrealized profit is allocated between parent and NCI',
    ],
    references: ['ASC 810-10-45', 'Intercompany Elimination Procedures'],
  },
  {
    id: 'bar-tbs-003',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Noncontrolling Interest Calculation',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Noncontrolling Interests',
    blueprintArea: 'BAR-I',
    blueprintTopic: 'BAR-I-B-3',
    scenario: `
On January 1, Year 1, Parent Corp. acquired 75% of Subsidiary Inc. for $1,500,000 when Subsidiary's identifiable net assets had a fair value of $1,800,000.

Information at acquisition:
• Book value of Subsidiary's net assets: $1,600,000
• Fair value of Subsidiary's net assets: $1,800,000
• Fair value of NCI at acquisition: $500,000

Year 1 activity for Subsidiary:
• Net income: $400,000
• Dividends declared: $100,000
• Other comprehensive income (unrealized gains): $50,000

No impairment of goodwill occurred during Year 1.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the goodwill at the acquisition date using the full goodwill method.',
        correctAnswer: 200000,
        tolerance: 0,
        explanation: 'Full goodwill = (Consideration paid + Fair value of NCI) - Fair value of net assets = ($1,500,000 + $500,000) - $1,800,000 = $200,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the NCI share of net income for Year 1.',
        correctAnswer: 100000,
        tolerance: 0,
        explanation: 'NCI share of net income = $400,000 × 25% = $100,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the NCI share of dividends for Year 1.',
        correctAnswer: 25000,
        tolerance: 0,
        explanation: 'NCI share of dividends = $100,000 × 25% = $25,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the ending NCI balance in equity at December 31, Year 1.',
        correctAnswer: 587500,
        tolerance: 0,
        explanation: 'Ending NCI = Beginning NCI ($500,000) + NCI share of net income ($100,000) - NCI share of dividends ($25,000) + NCI share of OCI ($50,000 × 25% = $12,500) = $587,500',
      },
    ],
    hints: [
      'Under full goodwill method, NCI is initially recorded at fair value',
      'NCI balance changes by its share of subsidiary\'s comprehensive income and dividends',
      'Remember to include OCI items in the NCI calculation',
    ],
    references: ['ASC 810-10-45-16', 'ASC 810-10-45-18'],
  },

  // =========================================================================
  // AREA II: Technical Accounting (25-35%)
  // =========================================================================
  {
    id: 'bar-tbs-004',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Derivatives and Fair Value Hedge Accounting',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Derivatives and Hedging',
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-C-2',
    scenario: `
On October 1, Year 1, Delta Corp. holds inventory with a carrying value of $2,000,000 and a fair value of $2,000,000. To hedge against a potential decline in value, Delta enters into a forward contract to sell the inventory on March 31, Year 2.

Forward contract details:
• Notional amount: $2,000,000
• Forward price: $2,000,000
• Delta designates this as a fair value hedge of inventory
• The hedge is highly effective

Fair value changes:
• December 31, Year 1:
  - Inventory fair value: $1,920,000
  - Forward contract fair value: $75,000 asset

• March 31, Year 2:
  - Inventory fair value: $1,850,000
  - Forward contract fair value: $150,000 asset
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the loss on hedged inventory to be recognized at December 31, Year 1.',
        correctAnswer: 80000,
        tolerance: 0,
        explanation: 'Loss on inventory = $2,000,000 - $1,920,000 = $80,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the gain on the forward contract at December 31, Year 1.',
        correctAnswer: 75000,
        tolerance: 0,
        explanation: 'Gain on forward = $75,000 - $0 = $75,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the net income effect from the hedge at December 31, Year 1.',
        correctAnswer: -5000,
        tolerance: 0,
        explanation: 'Net income effect = Gain on forward ($75,000) - Loss on inventory ($80,000) = -$5,000 (net loss)',
      },
      {
        id: 'req-4',
        type: 'journal_entry',
        question: 'Prepare the journal entry to record the forward contract gain and inventory adjustment at December 31, Year 1.',
        template: [
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
        ],
        correctEntries: [
          { account: 'Forward Contract Asset', debit: 75000, credit: null },
          { account: 'Gain on Forward Contract', debit: null, credit: 75000 },
          { account: 'Loss on Inventory', debit: 80000, credit: null },
          { account: 'Inventory', debit: null, credit: 80000 },
        ],
        tolerance: 0,
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'In a fair value hedge, where are gains and losses on the hedging instrument recognized?',
        options: [
          'Other comprehensive income',
          'Current period earnings',
          'Deferred on the balance sheet',
          'Directly in equity',
        ],
        correctAnswer: 1,
        explanation: 'In a fair value hedge, gains/losses on both the hedging instrument AND the hedged item are recognized in current earnings.',
      },
    ],
    hints: [
      'Fair value hedge: Both hedging instrument and hedged item gains/losses go to earnings',
      'Cash flow hedge: Hedging instrument gains/losses go to OCI',
      'The goal is to offset volatility in earnings from the hedged item',
    ],
    references: ['ASC 815-20', 'ASC 815-25'],
  },
  {
    id: 'bar-tbs-005',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Foreign Currency Translation vs Remeasurement',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Foreign Currency',
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-D-2',
    scenario: `
US Parent has a wholly-owned subsidiary, Euro Sub, located in Germany. Euro Sub's functional currency is the Euro (€).

Euro Sub's December 31, Year 1 trial balance (in Euros):
• Cash: €500,000
• Accounts Receivable: €800,000
• Inventory (at cost): €600,000
• Equipment (net): €2,000,000
• Accounts Payable: €400,000
• Long-term Debt: €1,200,000
• Common Stock: €1,000,000
• Retained Earnings (1/1): €700,000
• Sales Revenue: €3,500,000
• Cost of Goods Sold: €2,100,000
• Depreciation Expense: €200,000
• Other Expenses: €600,000

Exchange rates:
• January 1, Year 1 (historical rate when equipment acquired): $1.10/€
• Average rate for Year 1: $1.15/€
• December 31, Year 1: $1.20/€
• Rate when common stock issued: $1.05/€
• Rate when beginning RE was earned (weighted average historical): $1.08/€
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Using the current rate method (translation), calculate translated Cash in USD.',
        correctAnswer: 600000,
        tolerance: 0,
        explanation: 'Cash is a monetary asset, translated at current rate: €500,000 × $1.20 = $600,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Using the current rate method, calculate translated Equipment (net) in USD.',
        correctAnswer: 2400000,
        tolerance: 0,
        explanation: 'Under current rate method (translation), ALL assets use current rate: €2,000,000 × $1.20 = $2,400,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Using the current rate method, calculate translated Sales Revenue in USD.',
        correctAnswer: 4025000,
        tolerance: 0,
        explanation: 'Revenue uses average rate: €3,500,000 × $1.15 = $4,025,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate Euro Sub\'s net income in Euros.',
        correctAnswer: 600000,
        tolerance: 0,
        explanation: 'Net income = Revenue (€3,500,000) - COGS (€2,100,000) - Depreciation (€200,000) - Other (€600,000) = €600,000',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Under the current rate method (translation), where is the translation adjustment reported?',
        options: [
          'In net income as a foreign exchange gain/loss',
          'In other comprehensive income (accumulated OCI)',
          'Directly in retained earnings',
          'As a separate liability',
        ],
        correctAnswer: 1,
        explanation: 'Translation adjustments under the current rate method are reported in OCI and accumulated in the cumulative translation adjustment (CTA) in equity.',
      },
    ],
    hints: [
      'Translation (current rate method): Assets/Liabilities at current rate, Revenues/Expenses at average rate, Equity at historical rates',
      'Remeasurement (temporal method): Monetary items at current, Non-monetary at historical',
      'Translation adjustment goes to OCI; Remeasurement gain/loss goes to income',
    ],
    references: ['ASC 830-10', 'ASC 830-30'],
  },

  // =========================================================================
  // AREA III: State and Local Government (20-30%)
  // =========================================================================
  {
    id: 'bar-tbs-006',
    section: 'BAR',
    type: TBS_TYPES.JOURNAL_ENTRY,
    title: 'Governmental Capital Assets and Infrastructure',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Governmental Accounting - Capital Assets',
    blueprintArea: 'BAR-III',
    blueprintTopic: 'BAR-III-A-1',
    scenario: `
City of Springfield engages in the following capital asset transactions during the fiscal year:

1. Purchased a new fire truck for $450,000 cash from the General Fund.

2. Constructed a new road segment using General Fund resources:
   • Direct construction costs: $2,800,000
   • Interest during construction: $150,000 (capitalized under modified approach)
   • Engineering and design: $250,000

3. Received a donated park from a local developer:
   • Estimated fair value of land: $800,000
   • Estimated fair value of improvements: $200,000

4. The city uses the modified approach for infrastructure assets. The road network meets the condition assessment requirements.

5. Depreciation for the year on governmental capital assets (excluding infrastructure under modified approach): $385,000

The city has separate governmental funds and government-wide financial statements.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'journal_entry',
        question: 'Prepare the General Fund journal entry to record the fire truck purchase.',
        template: [
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
        ],
        correctEntries: [
          { account: 'Expenditures - Capital Outlay', debit: 450000, credit: null },
          { account: 'Cash', debit: null, credit: 450000 },
        ],
        tolerance: 0,
      },
      {
        id: 'req-2',
        type: 'journal_entry',
        question: 'Prepare the government-wide journal entry to record the fire truck purchase.',
        template: [
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
        ],
        correctEntries: [
          { account: 'Equipment - Fire Truck', debit: 450000, credit: null },
          { account: 'Cash', debit: null, credit: 450000 },
        ],
        tolerance: 0,
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the total cost of the constructed road to be capitalized at the government-wide level.',
        correctAnswer: 3200000,
        tolerance: 0,
        explanation: 'Total road cost = Construction ($2,800,000) + Interest ($150,000) + Engineering ($250,000) = $3,200,000',
      },
      {
        id: 'req-4',
        type: 'journal_entry',
        question: 'Prepare the government-wide journal entry to record the donated park.',
        template: [
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
          { account: '', debit: '', credit: '' },
        ],
        correctEntries: [
          { account: 'Land', debit: 800000, credit: null },
          { account: 'Infrastructure - Park Improvements', debit: 200000, credit: null },
          { account: 'Program Revenue - Capital Contributions', debit: null, credit: 1000000 },
        ],
        tolerance: 0,
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Under the modified approach for infrastructure, which statement is correct?',
        options: [
          'Depreciation is required on all infrastructure',
          'Infrastructure must be depreciated but can use any method',
          'Depreciation is NOT required if the government commits to maintain condition levels',
          'The modified approach only applies to donated infrastructure',
        ],
        correctAnswer: 2,
        explanation: 'Under the modified approach (GASB 34), governments can elect NOT to depreciate infrastructure if they: (1) manage using an asset management system, (2) perform condition assessments, and (3) demonstrate that infrastructure is maintained at or above the established condition level.',
      },
    ],
    hints: [
      'General Fund uses modified accrual - capital expenditures recorded as expenditures',
      'Government-wide uses full accrual - capital assets are capitalized',
      'Donated assets are recorded at acquisition value (fair value)',
    ],
    references: ['GASB 34', 'GASB 72'],
  },
  {
    id: 'bar-tbs-007',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Pension Accounting (GASB 68)',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Governmental Pensions',
    blueprintArea: 'BAR-III',
    blueprintTopic: 'BAR-III-A-3',
    scenario: `
The City of Riverside participates in a cost-sharing multiple-employer defined benefit pension plan. The following information is available for fiscal year ending June 30, Year 1:

Plan-wide information:
• Total pension liability (all employers): $500,000,000
• Plan fiduciary net position: $420,000,000
• Net pension liability (all employers): $80,000,000
• City's proportionate share: 2.5%

City of Riverside's pension information:
• Beginning net pension liability (city's share): $1,800,000
• Pension expense for the year: $650,000
• Contributions to the plan: $575,000
• City's ending net pension liability: (to be calculated)

Deferred outflows/inflows related to pensions:
• Beginning deferred outflows: $250,000
• Beginning deferred inflows: $180,000
• Changes in assumptions (deferred outflow): $85,000
• Difference between expected/actual experience (deferred inflow): $45,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the City\'s ending net pension liability (its proportionate share).',
        correctAnswer: 2000000,
        tolerance: 0,
        explanation: 'City\'s proportionate share of NPL = $80,000,000 × 2.5% = $2,000,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the change in net pension liability for the year.',
        correctAnswer: 200000,
        tolerance: 0,
        explanation: 'Change in NPL = Ending ($2,000,000) - Beginning ($1,800,000) = $200,000 increase',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the ending deferred outflows of resources related to pensions.',
        correctAnswer: 335000,
        tolerance: 0,
        explanation: 'Ending deferred outflows = Beginning ($250,000) + Changes in assumptions ($85,000) = $335,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the ending deferred inflows of resources related to pensions.',
        correctAnswer: 225000,
        tolerance: 0,
        explanation: 'Ending deferred inflows = Beginning ($180,000) + Experience difference ($45,000) = $225,000',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'In governmental financial statements, pension expense is recognized:',
        options: [
          'Only in the proprietary fund statements',
          'Only in the government-wide statements',
          'In both governmental fund and government-wide statements',
          'In government-wide statements and proprietary funds, but not governmental funds',
        ],
        correctAnswer: 3,
        explanation: 'Pension expense is recognized in government-wide statements (full accrual) and proprietary fund statements. Governmental funds use modified accrual and recognize pension expenditures based on amounts due and payable.',
      },
    ],
    hints: [
      'Net pension liability = Total pension liability - Plan fiduciary net position',
      'Proportionate share is based on employer contributions relative to total contributions',
      'Deferred outflows/inflows are amortized to pension expense over time',
    ],
    references: ['GASB 68', 'GASB 71'],
  },

  // =========================================================================
  // AREA IV: Financial Statement Analysis and Planning (15-25%)
  // =========================================================================
  {
    id: 'bar-tbs-008',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Comprehensive Financial Ratio Analysis',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Financial Analysis',
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-A-1',
    scenario: `
Apex Industries presents the following financial data for Year 1:

Balance Sheet (December 31, Year 1):
• Cash: $150,000
• Accounts Receivable (net): $400,000
• Inventory: $500,000
• Prepaid Expenses: $50,000
• Property, Plant & Equipment (net): $2,000,000
• Total Assets: $3,100,000

• Accounts Payable: $300,000
• Accrued Liabilities: $100,000
• Current Portion of Long-term Debt: $100,000
• Long-term Debt: $800,000
• Common Stock: $1,000,000
• Retained Earnings: $800,000
• Total Liabilities & Equity: $3,100,000

Income Statement (Year 1):
• Net Sales: $4,500,000
• Cost of Goods Sold: $2,700,000
• Gross Profit: $1,800,000
• Operating Expenses: $1,200,000
• Interest Expense: $72,000
• Income Tax Expense: $158,400
• Net Income: $369,600

Additional Information:
• Average accounts receivable: $380,000
• Average inventory: $450,000
• Average total assets: $2,900,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the current ratio.',
        correctAnswer: 2.2,
        tolerance: 0.1,
        explanation: 'Current ratio = Current assets / Current liabilities = ($150,000 + $400,000 + $500,000 + $50,000) / ($300,000 + $100,000 + $100,000) = $1,100,000 / $500,000 = 2.2',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the quick ratio (acid-test ratio).',
        correctAnswer: 1.1,
        tolerance: 0.1,
        explanation: 'Quick ratio = (Cash + Receivables) / Current liabilities = ($150,000 + $400,000) / $500,000 = 1.1',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate accounts receivable turnover.',
        correctAnswer: 11.84,
        tolerance: 0.1,
        explanation: 'AR turnover = Net sales / Average AR = $4,500,000 / $380,000 = 11.84 times',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate inventory turnover.',
        correctAnswer: 6.0,
        tolerance: 0.1,
        explanation: 'Inventory turnover = COGS / Average inventory = $2,700,000 / $450,000 = 6.0 times',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate return on assets (ROA).',
        correctAnswer: 12.74,
        tolerance: 0.2,
        explanation: 'ROA = Net income / Average total assets = $369,600 / $2,900,000 = 12.74%',
      },
      {
        id: 'req-6',
        type: 'calculation',
        question: 'Calculate the debt-to-equity ratio.',
        correctAnswer: 0.72,
        tolerance: 0.02,
        explanation: 'Debt-to-equity = Total liabilities / Total equity = ($300,000 + $100,000 + $100,000 + $800,000) / ($1,000,000 + $800,000) = $1,300,000 / $1,800,000 = 0.72',
      },
    ],
    hints: [
      'Current assets include cash, receivables, inventory, and prepaids',
      'Quick ratio excludes inventory and prepaids',
      'Use average balances for turnover and ROA calculations when available',
    ],
    references: ['Financial Statement Analysis', 'Ratio Analysis'],
  },
  {
    id: 'bar-tbs-009',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Cost-Volume-Profit Analysis',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Cost Accounting and Planning',
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-B-1',
    scenario: `
Precision Manufacturing produces a single product with the following cost structure:

• Selling price per unit: $85
• Variable manufacturing cost per unit: $35
• Variable selling expense per unit: $10
• Fixed manufacturing overhead: $300,000 per year
• Fixed selling and administrative: $150,000 per year

The company's current sales volume is 15,000 units per year.

Management is considering several alternatives:
1. Increase advertising by $50,000 to boost sales by 3,000 units
2. Reduce selling price by $5 per unit, expecting a 25% increase in unit sales
3. Outsource production, eliminating variable manufacturing and fixed manufacturing overhead, but increasing variable cost to $50 per unit
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the contribution margin per unit.',
        correctAnswer: 40,
        tolerance: 0,
        explanation: 'Contribution margin = Selling price - Variable costs = $85 - $35 - $10 = $40 per unit',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the break-even point in units.',
        correctAnswer: 11250,
        tolerance: 0,
        explanation: 'Break-even units = Total fixed costs / CM per unit = ($300,000 + $150,000) / $40 = 11,250 units',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate current operating income.',
        correctAnswer: 150000,
        tolerance: 0,
        explanation: 'Operating income = (Units × CM per unit) - Fixed costs = (15,000 × $40) - $450,000 = $600,000 - $450,000 = $150,000',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate operating income under Alternative 1 (additional advertising).',
        correctAnswer: 220000,
        tolerance: 0,
        explanation: 'Alternative 1: New units = 18,000. Operating income = (18,000 × $40) - $450,000 - $50,000 = $720,000 - $500,000 = $220,000',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate operating income under Alternative 2 (price reduction).',
        correctAnswer: 206250,
        tolerance: 0,
        explanation: 'Alternative 2: New price = $80, New CM = $35. New units = 15,000 × 1.25 = 18,750. Operating income = (18,750 × $35) - $450,000 = $656,250 - $450,000 = $206,250',
      },
      {
        id: 'req-6',
        type: 'multiple_choice',
        question: 'Which alternative provides the highest operating income?',
        options: [
          'Current plan ($150,000)',
          'Alternative 1 - Advertising ($220,000)',
          'Alternative 2 - Price reduction ($206,250)',
          'Alternative 3 - Outsourcing',
        ],
        correctAnswer: 1,
        explanation: 'Alternative 1 (advertising) provides the highest operating income at $220,000.',
      },
    ],
    hints: [
      'Contribution margin = Revenue - ALL variable costs',
      'Break-even: Total contribution = Total fixed costs',
      'Consider incremental analysis for decision-making',
    ],
    references: ['Cost-Volume-Profit Analysis', 'Managerial Accounting'],
  },
  {
    id: 'bar-tbs-010',
    section: 'BAR',
    type: TBS_TYPES.CALCULATION,
    title: 'Variance Analysis - Manufacturing',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Variance Analysis',
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-B-3',
    scenario: `
Standard Manufacturing uses a standard cost system. The following standards were established for direct materials and direct labor:

Direct Materials:
• Standard quantity: 3 pounds per unit
• Standard price: $8 per pound

Direct Labor:
• Standard hours: 2 hours per unit
• Standard rate: $22 per hour

Actual results for March (5,000 units produced):
Direct Materials:
• Pounds purchased and used: 16,000 pounds
• Actual price paid: $7.50 per pound
• Actual total cost: $120,000

Direct Labor:
• Actual hours worked: 10,500 hours
• Actual rate paid: $23 per hour
• Actual total cost: $241,500

Variable Manufacturing Overhead:
• Standard rate: $6 per direct labor hour
• Actual variable overhead: $64,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the direct materials price variance.',
        correctAnswer: 8000,
        tolerance: 0,
        explanation: 'Price variance = (SP - AP) × AQ = ($8 - $7.50) × 16,000 = $0.50 × 16,000 = $8,000 Favorable',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the direct materials quantity variance.',
        correctAnswer: 8000,
        tolerance: 0,
        explanation: 'Quantity variance = (SQ - AQ) × SP = (15,000 - 16,000) × $8 = -1,000 × $8 = $8,000 Unfavorable (use absolute value)',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the direct labor rate variance.',
        correctAnswer: 10500,
        tolerance: 0,
        explanation: 'Rate variance = (SR - AR) × AH = ($22 - $23) × 10,500 = -$1 × 10,500 = $10,500 Unfavorable',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the direct labor efficiency variance.',
        correctAnswer: 11000,
        tolerance: 0,
        explanation: 'Efficiency variance = (SH - AH) × SR = (10,000 - 10,500) × $22 = -500 × $22 = $11,000 Unfavorable',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'Calculate the variable overhead efficiency variance.',
        correctAnswer: 3000,
        tolerance: 0,
        explanation: 'VOH efficiency variance = (SH - AH) × Standard VOH rate = (10,000 - 10,500) × $6 = -500 × $6 = $3,000 Unfavorable',
      },
      {
        id: 'req-6',
        type: 'multiple_choice',
        question: 'The materials price variance is favorable. What is the most likely cause?',
        options: [
          'Workers used more material than standard',
          'Purchasing obtained a better price than expected',
          'More units were produced than planned',
          'The standard price was set too low',
        ],
        correctAnswer: 1,
        explanation: 'A favorable price variance means actual price < standard price, likely due to better purchasing negotiations, bulk discounts, or market conditions.',
      },
    ],
    hints: [
      'Standard quantity for actual production = Standard per unit × Units produced',
      'Standard hours for actual production = Standard per unit × Units produced',
      'Favorable variance: Actual < Standard cost',
    ],
    references: ['Standard Costing', 'Variance Analysis'],
  },
];

export default BAR_TBS;
