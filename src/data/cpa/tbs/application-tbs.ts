// Application-Based TBS with Integrated Research Skills
// Post-2024 CPA Evolution: Research is integrated into TBS, not standalone
// These TBS require candidates to APPLY authoritative guidance to solve scenarios

import { TBS, TBS_TYPES } from '../../../types';

export const APPLICATION_TBS: TBS[] = [
  // ==========================================
  // FAR - Applying Accounting Standards
  // ==========================================
  {
    id: 'far-applied-001',
    section: 'FAR',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Revenue Recognition - Contract Modification Analysis',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Revenue Recognition Application',
    blueprintArea: 'FAR-I',
    blueprintTopic: 'FAR-I-D-1',
    scenario: `
TechBuild Corp. entered into a contract with a customer to construct a specialized manufacturing facility for $5,000,000. The contract specifies that TechBuild will design and build the facility according to the customer's specifications.

Midway through construction, the customer requests a change order to add an additional production line, increasing the contract price by $800,000. The modification was approved and signed by both parties.

You have been asked to analyze whether this contract modification should be treated as a separate contract or as a modification of the existing contract under ASC 606.

Key Facts:
• Original contract: $5,000,000 for specialized facility
• Modification: Additional production line for $800,000
• The additional production line is distinct from the original facility
• The $800,000 price reflects the standalone selling price for similar work
• At modification date, 40% of original work is complete
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Based on ASC 606 guidance, how should TechBuild account for this contract modification?',
        options: [
          'As a separate contract because the additional goods are distinct and priced at standalone selling price',
          'As a modification of the existing contract using cumulative catch-up adjustment',
          'As a modification using prospective adjustment to remaining performance obligations',
          'As a termination of the old contract and creation of a new combined contract',
        ],
        correctAnswer: 0,
        explanation: 'Under ASC 606-10-25-12, a contract modification is accounted for as a separate contract when: (1) the scope increases due to addition of distinct goods/services, AND (2) the price increases by an amount that reflects the standalone selling price. Both criteria are met here.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'If the modification price of $800,000 was significantly below standalone selling price (e.g., $500,000), how would the accounting change?',
        options: [
          'Still account for as a separate contract',
          'Account for as part of existing contract using cumulative catch-up',
          'Account for prospectively from the modification date',
          'Depends on whether original goods are distinct from modification',
        ],
        correctAnswer: 3,
        explanation: 'When the price does not reflect standalone selling price, ASC 606-10-25-13 requires analyzing whether the remaining goods are distinct. If distinct, use prospective treatment; if not distinct, use cumulative catch-up.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'What is the total revenue TechBuild will recognize on the ORIGINAL contract (excluding the modification)?',
        correctAnswer: 5000000,
        tolerance: 0,
        explanation: 'Since the modification is treated as a separate contract, the original $5,000,000 contract continues to be accounted for independently.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which ASC topic provides the authoritative guidance for contract modifications?',
        options: [
          'ASC 606-10-25',
          'ASC 605-25',
          'ASC 842-10-25',
          'ASC 450-20',
        ],
        correctAnswer: 0,
        explanation: 'ASC 606-10-25 (specifically paragraphs 10-13) provides the guidance for accounting for contract modifications under the revenue recognition standard.',
      },
    ],
    hints: [
      'Consider the two criteria for separate contract treatment',
      'Distinct goods + standalone selling price = separate contract',
      'Apply the modification guidance systematically',
    ],
    references: ['ASC 606-10-25-10 through 25-13'],
  },
  {
    id: 'far-applied-002',
    section: 'FAR',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Lease Modification - Applying ASC 842',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Lease Modification Analysis',
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-C-3',
    scenario: `
Metro Retail Inc. has an existing operating lease for retail space with the following terms:
• Original lease term: 5 years (2 years remaining)
• Annual lease payments: $120,000
• Right-of-use asset balance: $215,000
• Lease liability balance: $220,000
• Lessee's incremental borrowing rate at modification: 6%

The landlord offers a modification:
• Extend the lease term by 3 years (total remaining: 5 years)
• Reduce annual payments to $100,000
• Add 2,000 square feet of adjacent space
• The additional space is priced at market rate ($50/sq ft = $100,000/year)

Determine how Metro should account for this modification under ASC 842.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'The addition of 2,000 square feet of space should be accounted for as:',
        options: [
          'Part of the modified lease because it is not a separate lease',
          'A separate lease because it grants an additional right-of-use at market rate',
          'A sublease from the original lessor',
          'A new contract replacing the original lease',
        ],
        correctAnswer: 1,
        explanation: 'Under ASC 842-10-25-8, a modification that adds the right to use an additional asset is accounted for as a separate lease if: (1) it increases the scope by adding the right to use additional underlying asset(s), AND (2) the consideration increases by an amount commensurate with standalone price. Both criteria are met here.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'For the extension of the original space (excluding the addition), Metro should:',
        options: [
          'Remeasure the lease liability using the revised payments and current rate',
          'Continue using the original lease liability without adjustment',
          'Derecognize the lease and record a new one',
          'Record the change as a gain or loss immediately',
        ],
        correctAnswer: 0,
        explanation: 'The extension and payment reduction for the original space is a modification that is not a separate lease. Under ASC 842-10-25-11, the lessee remeasures the lease liability using the revised payments and current discount rate.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the present value of the modified lease payments for the ORIGINAL space only (5 years × $100,000 at 6%). Use PV factor of 4.21236.',
        correctAnswer: 421236,
        tolerance: 100,
        explanation: '$100,000 × 4.21236 = $421,236. This is the new lease liability for the modified original lease.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What adjustment to the right-of-use asset is required for the modification of the original space? (New liability - Old liability)',
        correctAnswer: 201236,
        tolerance: 100,
        explanation: 'New liability ($421,236) - Old liability ($220,000) = $201,236 increase to ROU asset.',
      },
    ],
    hints: [
      'Separate the analysis: new space vs. modified original space',
      'New space at market rate = separate lease',
      'Original space modification = remeasurement',
    ],
    references: ['ASC 842-10-25-8 through 25-15'],
  },

  // ==========================================
  // AUD - Applying Auditing Standards
  // ==========================================
  {
    id: 'aud-applied-001',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Subsequent Events - Audit Response Analysis',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Subsequent Events Application',
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-V-B-1',
    scenario: `
You are the senior auditor on the audit of Franklin Manufacturing, Inc. The financial statements are dated December 31, Year 1. Your firm's audit report is expected to be dated February 15, Year 2.

The following events occurred after December 31, Year 1:

Event A (January 10, Year 2): A major customer representing 25% of receivables filed for bankruptcy. The customer had been experiencing financial difficulties throughout Year 1.

Event B (January 25, Year 2): A fire destroyed one of Franklin's warehouses. The warehouse and inventory were adequately insured. This warehouse was fully operational at year-end.

Event C (February 5, Year 2): Franklin's board approved a 2-for-1 stock split.

Event D (February 10, Year 2): A lawsuit was filed against Franklin for a product sold in November Year 1 that allegedly caused customer injury.

Apply AU-C 560 to determine the appropriate audit response and financial statement treatment.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Event A (customer bankruptcy) is a:',
        options: [
          'Type I subsequent event requiring adjustment to the financial statements',
          'Type II subsequent event requiring disclosure only',
          'Subsequent event requiring no action',
          'Event outside the subsequent event period',
        ],
        correctAnswer: 0,
        explanation: 'Under AU-C 560, Type I events provide additional evidence about conditions that existed at the balance sheet date. The customer\'s financial difficulties existed at 12/31, so the bankruptcy provides evidence the receivable was impaired at year-end. Adjustment required.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Event B (warehouse fire) is a:',
        options: [
          'Type I subsequent event requiring adjustment',
          'Type II subsequent event requiring disclosure only',
          'Event requiring no action because it is insured',
          'Event outside the auditor\'s responsibility',
        ],
        correctAnswer: 1,
        explanation: 'Type II events are conditions that arose after the balance sheet date. The fire occurred after year-end when the warehouse was operational. This is a Type II event - disclosure may be required if material, but no adjustment to 12/31 balances.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Event C (stock split) requires:',
        options: [
          'Retroactive adjustment to all per-share amounts',
          'Disclosure in notes only',
          'No action required',
          'Restatement of prior year financials',
        ],
        correctAnswer: 0,
        explanation: 'Stock splits approved before financial statement issuance require retroactive adjustment to all per-share amounts presented, per ASC 260. The auditor should verify this adjustment was made.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'For Event D (lawsuit filed), the auditor should:',
        options: [
          'Require accrual of the estimated loss',
          'Evaluate whether disclosure is needed as a Type II event',
          'Ignore because the lawsuit was filed after year-end',
          'Require adjustment to record a liability at 12/31',
        ],
        correctAnswer: 1,
        explanation: 'The lawsuit was filed after year-end for a product sold in Year 1. This is potentially a Type I event (condition existed at 12/31) or Type II depending on whether a loss was probable and estimable at year-end. Auditor should inquire with legal counsel and evaluate disclosure needs.',
      },
    ],
    hints: [
      'Type I = conditions existed at balance sheet date',
      'Type II = conditions arose after balance sheet date',
      'Consider what evidence each event provides about year-end conditions',
    ],
    references: ['AU-C 560', 'ASC 855'],
  },
  {
    id: 'aud-applied-002',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Related Party Transactions - Risk Assessment',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Related Party Audit Procedures',
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-C-1',
    scenario: `
During the audit of Apex Corp., you discover the following transactions:

1. Apex leases its headquarters building from Apex Properties LLC, which is owned by the CEO's spouse. Annual rent is $500,000.

2. Apex purchased $2 million of inventory from GlobalSource Inc. The CFO's brother owns 30% of GlobalSource.

3. Apex made a $1 million loan to a startup company. The startup's founder is on Apex's board of directors.

4. Apex sold equipment to Johnson Enterprises for $150,000. The CEO's college roommate is Johnson's CFO, but there is no ownership connection.

Management's related party disclosure lists only item #1. Apply AU-C 550 to determine appropriate audit responses.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which transactions meet the definition of "related party" under AU-C 550?',
        options: [
          'Items 1, 2, and 3 only',
          'Items 1, 2, 3, and 4',
          'Items 1 and 3 only',
          'All items are related party transactions',
        ],
        correctAnswer: 0,
        explanation: 'Under AU-C 550, related parties include entities under common control, management, or ownership. Item 1 (CEO spouse), Item 2 (CFO brother with significant ownership), and Item 3 (board member) are related parties. Item 4 is not - a personal friendship without ownership/control is not a related party relationship.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Management\'s incomplete disclosure of related parties indicates:',
        options: [
          'A potential material misstatement requiring further investigation',
          'Fraud has definitely occurred',
          'The audit should be terminated',
          'An immaterial omission that can be ignored',
        ],
        correctAnswer: 0,
        explanation: 'Incomplete related party disclosure is a potential material misstatement. The auditor should investigate why management omitted items 2 and 3, evaluate the risk of fraud, and determine appropriate disclosure requirements.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'For the building lease (Item 1), the auditor should primarily verify:',
        options: [
          'That the rent amount is at arm\'s length (comparable to market rates)',
          'That the CEO\'s spouse has proper title to the property',
          'That the building meets safety codes',
          'That rent payments were made on time',
        ],
        correctAnswer: 0,
        explanation: 'For related party transactions, AU-C 550 requires the auditor to evaluate whether the transaction is at arm\'s length. The primary concern is whether the $500,000 rent is comparable to market rates for similar properties.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The loan to the startup (Item 3) presents which primary audit risk?',
        options: [
          'Collectibility and appropriate valuation of the receivable',
          'Violation of banking regulations',
          'Tax deductibility of the loan',
          'Proper interest income recognition only',
        ],
        correctAnswer: 0,
        explanation: 'Loans to related parties, especially startups, present significant valuation risk. The auditor should evaluate collectibility, assess whether an allowance is needed, and consider whether the favorable terms indicate the substance differs from the form.',
      },
    ],
    hints: [
      'Related parties = control, ownership, or management relationships',
      'Personal friendships alone ≠ related party',
      'Focus on arm\'s length terms and proper disclosure',
    ],
    references: ['AU-C 550', 'ASC 850'],
  },

  // ==========================================
  // TCP - Applying Tax Law
  // ==========================================
  {
    id: 'tcp-applied-001',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'Like-Kind Exchange - Boot and Basis Calculation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Section 1031 Application',
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-B-1',
    scenario: `
Riverside Investments completed a like-kind exchange of real property under IRC §1031:

Relinquished Property:
• Fair Market Value: $800,000
• Adjusted Basis: $500,000
• Mortgage assumed by buyer: $150,000

Replacement Property:
• Fair Market Value: $900,000
• Mortgage assumed by Riverside: $200,000
• Cash paid by Riverside: $50,000

The exchange was completed through a qualified intermediary within the required timeframes.

Apply IRC §1031 to determine the tax consequences.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the realized gain on the exchange.',
        correctAnswer: 300000,
        tolerance: 0,
        explanation: 'Realized gain = Amount realized - Adjusted basis. Amount realized = FMV of property received ($900,000) + mortgage relief ($150,000) - mortgage assumed ($200,000) - cash paid ($50,000) = $800,000. Realized gain = $800,000 - $500,000 = $300,000.',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the "boot" received in this exchange.',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'Boot = net mortgage relief - cash paid. Mortgage relief ($150,000) - Mortgage assumed ($200,000) - Cash paid ($50,000) = -$100,000. Since net boot is negative (Riverside paid more than received), boot = $0.',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the recognized gain.',
        correctAnswer: 0,
        tolerance: 0,
        explanation: 'Recognized gain = lesser of realized gain ($300,000) or boot received ($0). Since boot is $0, recognized gain is $0.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the basis in the replacement property.',
        correctAnswer: 600000,
        tolerance: 0,
        explanation: 'Basis = FMV of replacement ($900,000) - Deferred gain ($300,000) = $600,000. Or: Old basis ($500,000) + Cash paid ($50,000) + Net mortgage increase ($50,000) = $600,000.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'If the exchange had not met the 45-day identification requirement, what would be the tax result?',
        options: [
          'The entire $300,000 gain would be recognized',
          'Only the boot would be recognized',
          'The transaction would be void',
          'A 10% penalty would apply',
        ],
        correctAnswer: 0,
        explanation: 'Failure to meet §1031 timing requirements (45-day identification, 180-day receipt) disqualifies the exchange. The transaction becomes a taxable sale, and the entire $300,000 realized gain would be recognized.',
      },
    ],
    hints: [
      'Boot = cash received + net mortgage relief',
      'Recognized gain = lesser of realized gain or boot',
      'Basis = FMV - deferred gain (or old basis + cash paid + net mortgage assumed)',
    ],
    references: ['IRC §1031', 'Treas. Reg. §1.1031'],
  },
  {
    id: 'tcp-applied-002',
    section: 'TCP',
    type: TBS_TYPES.CALCULATION,
    title: 'QBI Deduction - W-2 Wage Limitation',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Section 199A Application',
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-A-3',
    scenario: `
Sarah is a single taxpayer with the following income for 2025:

• Salary from employer: $50,000
• Schedule C consulting business:
  - Gross receipts: $400,000
  - Business expenses: $150,000
  - W-2 wages paid: $80,000
  - Qualified property (UBIA): $200,000

• Taxable income before QBI deduction: $280,000
• Threshold amount for single filers: $191,950
• Phase-in range: $191,950 - $241,950

The consulting business is NOT a specified service trade or business (SSTB).

Apply IRC §199A to calculate Sarah's QBI deduction.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the qualified business income (QBI) from the consulting business.',
        correctAnswer: 250000,
        tolerance: 0,
        explanation: 'QBI = Gross receipts ($400,000) - Business expenses ($150,000) = $250,000',
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the tentative QBI deduction (20% of QBI).',
        correctAnswer: 50000,
        tolerance: 0,
        explanation: '20% × $250,000 = $50,000',
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the W-2 wage limitation (greater of: 50% of W-2 wages OR 25% of W-2 wages + 2.5% of UBIA).',
        correctAnswer: 40000,
        tolerance: 0,
        explanation: 'Option 1: 50% × $80,000 = $40,000. Option 2: (25% × $80,000) + (2.5% × $200,000) = $20,000 + $5,000 = $25,000. Greater of the two = $40,000.',
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'What is Sarah\'s final QBI deduction (lesser of tentative deduction, wage limit, or 20% of taxable income)?',
        correctAnswer: 40000,
        tolerance: 0,
        explanation: 'Since taxable income exceeds the phase-in range, full W-2 limitation applies. QBI deduction = lesser of: (1) 20% of QBI ($50,000), (2) W-2 wage limit ($40,000), (3) 20% of taxable income ($56,000). The limit is $40,000.',
      },
    ],
    hints: [
      'Check if taxpayer is above/below/within the threshold range',
      'W-2 limit: greater of 50% wages OR 25% wages + 2.5% UBIA',
      'Final deduction: lesser of 20% QBI, wage limit, or 20% taxable income',
    ],
    references: ['IRC §199A', 'Treas. Reg. §1.199A'],
  },

  // ==========================================
  // BAR - Applying Analytical Standards
  // ==========================================
  {
    id: 'bar-applied-001',
    section: 'BAR',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Segment Reporting - Quantitative Thresholds',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Segment Reporting Application',
    blueprintArea: 'BAR-II',
    blueprintTopic: 'BAR-II-A-1',
    scenario: `
Consolidated Industries has identified five operating segments. Management needs to determine which segments require separate disclosure under ASC 280.

Segment Data (in thousands):
                    Revenue    Profit/Loss    Assets
Segment A           $45,000      $8,000      $35,000
Segment B           $30,000      $4,500      $25,000
Segment C           $15,000     ($2,000)     $20,000
Segment D            $8,000      $1,200      $15,000
Segment E            $2,000        $300       $5,000

Totals:            $100,000     $12,000     $100,000

For profit/loss test, use absolute values:
• Total profits: $14,000
• Total losses: $2,000
• Greater absolute value: $14,000

Apply ASC 280 quantitative thresholds.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which segments meet the 10% REVENUE threshold?',
        options: [
          'A, B, and C only',
          'A and B only',
          'A, B, C, and D',
          'All segments',
        ],
        correctAnswer: 0,
        explanation: '10% of $100,000 = $10,000. Segments with revenue ≥ $10,000: A ($45,000), B ($30,000), C ($15,000). D and E do not meet the revenue threshold.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Which segments meet the 10% PROFIT/LOSS threshold (using the greater of absolute profits or losses)?',
        options: [
          'A only',
          'A and B only',
          'A, B, and C',
          'A, B, C, and D',
        ],
        correctAnswer: 2,
        explanation: '10% of $14,000 (greater absolute value) = $1,400. Segments meeting threshold: A ($8,000), B ($4,500), C ($2,000 loss). D ($1,200) does not meet threshold.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Which segments meet the 10% ASSETS threshold?',
        options: [
          'A, B, and C only',
          'A and B only',
          'A, B, C, and D',
          'All segments',
        ],
        correctAnswer: 2,
        explanation: '10% of $100,000 = $10,000. Segments with assets ≥ $10,000: A ($35,000), B ($25,000), C ($20,000), D ($15,000). Only E ($5,000) does not meet the threshold.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which segments are reportable (meet ANY threshold)?',
        options: [
          'A, B, and C',
          'A, B, C, and D',
          'A and B only',
          'All five segments',
        ],
        correctAnswer: 1,
        explanation: 'A segment is reportable if it meets ANY of the three thresholds. A (all 3), B (all 3), C (all 3), D (assets only) are reportable. E meets no thresholds.',
      },
      {
        id: 'req-5',
        type: 'calculation',
        question: 'What percentage of total revenue is represented by reportable segments A, B, C, and D?',
        correctAnswer: 98,
        tolerance: 0,
        explanation: 'Reportable segment revenue: $45,000 + $30,000 + $15,000 + $8,000 = $98,000. Percentage: $98,000 / $100,000 = 98%. This exceeds the 75% threshold, so no additional segments need to be reported.',
      },
    ],
    hints: [
      'Test each threshold separately: revenue, profit/loss, assets',
      'For profit/loss, use greater of absolute profits or absolute losses',
      'A segment meeting ANY threshold is reportable',
      'Reportable segments must represent ≥ 75% of total revenue',
    ],
    references: ['ASC 280-10-50-12', 'ASC 280-10-50-15'],
  },
];

// Export - renamed from RESEARCH_TBS for backward compatibility
export const RESEARCH_TBS = APPLICATION_TBS;
export const APPLICATION_TBS_COUNT = APPLICATION_TBS.length;
