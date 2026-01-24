// Comprehensive CPA Exam Lesson Content
// Structured lessons for all exam sections

export const LESSONS = {
  // ==========================================
  // FAR - FINANCIAL ACCOUNTING AND REPORTING
  // ==========================================
  far: [
    {
      id: 'far-001',
      section: 'FAR',
      title: 'The FASB Conceptual Framework',
      description:
        'Understanding the foundation of US GAAP - objectives, qualitative characteristics, elements, and assumptions.',
      order: 1,
      duration: 45,
      difficulty: 'beginner',
      topics: ['Conceptual Framework', 'GAAP Hierarchy', 'Qualitative Characteristics'],
      content: {
        sections: [
          {
            title: 'Introduction',
            type: 'text',
            content: `The FASB Conceptual Framework provides the foundation for all US GAAP accounting standards. Understanding this framework is essential for interpreting standards and making accounting judgments when specific guidance is not available.`,
          },
          {
            title: 'Objectives of Financial Reporting',
            type: 'text',
            content: `The primary objective is to provide financial information useful to existing and potential investors, lenders, and other creditors in making decisions about providing resources to the entity. Financial statements should provide information about:

• Economic resources (assets)
• Claims against those resources (liabilities and equity)  
• Changes in resources and claims (revenues, expenses, gains, losses)
• Management's stewardship of resources`,
          },
          {
            title: 'Qualitative Characteristics',
            type: 'list',
            content: [
              {
                term: 'Relevance',
                definition:
                  'Information that is capable of making a difference in decisions. It should have predictive value, confirmatory value, or both.',
              },
              {
                term: 'Faithful Representation',
                definition:
                  'Information that is complete, neutral, and free from error. Replaces the old concept of "reliability."',
              },
              {
                term: 'Comparability',
                definition: 'Enables users to identify similarities and differences between items.',
              },
              {
                term: 'Verifiability',
                definition:
                  'Different knowledgeable observers could reach consensus that information faithfully represents what it purports to represent.',
              },
              {
                term: 'Timeliness',
                definition:
                  'Information available to decision-makers in time to be capable of influencing their decisions.',
              },
              {
                term: 'Understandability',
                definition:
                  'Classifying, characterizing, and presenting information clearly and concisely.',
              },
            ],
          },
          {
            title: 'Elements of Financial Statements',
            type: 'table',
            headers: ['Element', 'Definition'],
            rows: [
              [
                'Assets',
                'Probable future economic benefits obtained or controlled by the entity as a result of past transactions',
              ],
              [
                'Liabilities',
                'Probable future sacrifices of economic benefits arising from present obligations',
              ],
              ['Equity', 'Residual interest in assets after deducting liabilities'],
              ['Revenues', 'Inflows from delivering goods/services (core operations)'],
              ['Expenses', 'Outflows from delivering goods/services (core operations)'],
              ['Gains', 'Increases in equity from peripheral transactions'],
              ['Losses', 'Decreases in equity from peripheral transactions'],
            ],
          },
          {
            title: 'Key Assumptions',
            type: 'text',
            content: `**Going Concern**: Assumes the entity will continue operating indefinitely (unless evidence suggests otherwise).

**Economic Entity**: The business is separate from its owners and other entities.

**Monetary Unit**: Financial statements are expressed in terms of a monetary unit (USD), and the purchasing power is stable.

**Periodicity**: The life of an entity can be divided into artificial time periods for reporting purposes.`,
          },
          {
            title: 'Key Takeaways',
            type: 'summary',
            content: [
              'Relevance and Faithful Representation are the fundamental qualitative characteristics',
              "The Conceptual Framework provides guidance when specific standards don't exist",
              'Assets must have probable future economic benefits from past transactions',
              'The going concern assumption underlies most GAAP accounting treatments',
            ],
          },
        ],
        quiz: [
          {
            question: 'Which is a fundamental qualitative characteristic?',
            options: ['Comparability', 'Relevance', 'Timeliness', 'Understandability'],
            correct: 1,
          },
          {
            question: 'What replaces "reliability" in the current framework?',
            options: ['Relevance', 'Verifiability', 'Faithful Representation', 'Neutrality'],
            correct: 2,
          },
        ],
      },
    },
    {
      id: 'far-002',
      section: 'FAR',
      title: 'Financial Statements Presentation',
      description:
        'Master the balance sheet, income statement, statement of changes in equity, and comprehensive income.',
      order: 2,
      duration: 60,
      difficulty: 'beginner',
      topics: ['Balance Sheet', 'Income Statement', 'Comprehensive Income'],
      content: {
        sections: [
          {
            title: 'Overview',
            type: 'text',
            content: `A complete set of financial statements includes: (1) Balance Sheet, (2) Income Statement, (3) Statement of Comprehensive Income, (4) Statement of Changes in Equity, (5) Statement of Cash Flows, and (6) Notes to Financial Statements.`,
          },
          {
            title: 'Balance Sheet Classifications',
            type: 'list',
            content: [
              {
                term: 'Current Assets',
                definition:
                  'Expected to be converted to cash or used within one year or operating cycle',
              },
              {
                term: 'Non-Current Assets',
                definition: 'PP&E, intangibles, long-term investments',
              },
              {
                term: 'Current Liabilities',
                definition: 'Obligations due within one year or operating cycle',
              },
              {
                term: 'Non-Current Liabilities',
                definition: 'Long-term debt, deferred taxes, pension obligations',
              },
            ],
          },
          {
            title: 'Income Statement Formats',
            type: 'text',
            content: `**Single-Step Format**: Groups all revenues together and all expenses together, showing one step to net income.

**Multi-Step Format**: Shows intermediate measures like gross profit, operating income, and income before tax. Required for SEC registrants.

Income from continuing operations is shown separately from discontinued operations.`,
          },
          {
            title: 'Other Comprehensive Income (OCI)',
            type: 'text',
            content: `OCI includes revenues, expenses, gains, and losses that bypass net income under GAAP:

• **Unrealized gains/losses on AFS securities** (debt securities only after ASU 2016-01)
• **Foreign currency translation adjustments**
• **Pension/OPEB prior service cost and actuarial gains/losses**
• **Unrealized gains/losses on cash flow hedges**

OCI can be presented in a single continuous statement or a separate statement following the income statement.`,
          },
        ],
      },
    },
    {
      id: 'far-003',
      section: 'FAR',
      title: 'Revenue Recognition (ASC 606)',
      description: 'The five-step model for revenue recognition that applies to all industries.',
      order: 3,
      duration: 90,
      difficulty: 'intermediate',
      topics: ['ASC 606', 'Performance Obligations', 'Variable Consideration'],
      content: {
        sections: [
          {
            title: 'The Five-Step Model',
            type: 'list',
            content: [
              { term: 'Step 1', definition: 'Identify the contract with a customer' },
              {
                term: 'Step 2',
                definition: 'Identify the performance obligations in the contract',
              },
              { term: 'Step 3', definition: 'Determine the transaction price' },
              {
                term: 'Step 4',
                definition: 'Allocate the transaction price to performance obligations',
              },
              {
                term: 'Step 5',
                definition:
                  'Recognize revenue when (or as) each performance obligation is satisfied',
              },
            ],
          },
          {
            title: 'Step 1: Identify the Contract',
            type: 'text',
            content: `A contract exists when:
• Both parties have approved the contract
• Rights of each party can be identified
• Payment terms can be identified
• Contract has commercial substance
• Collection is probable

Contracts can be written, oral, or implied by customary business practices.`,
          },
          {
            title: 'Step 2: Performance Obligations',
            type: 'text',
            content: `A performance obligation is a promise to transfer a distinct good or service. A good/service is distinct if:

1. **Capable of being distinct**: Customer can benefit from it on its own or with readily available resources
2. **Distinct within the contract**: Promise is separately identifiable from other promises

Examples: Products, services, licenses, construction, rights to use assets.`,
          },
          {
            title: 'Step 3: Transaction Price',
            type: 'text',
            content: `The transaction price is the amount of consideration expected to be received. Consider:

• **Variable consideration**: Estimate using expected value or most likely amount
• **Constraining estimates**: Include only amounts where reversal is not probable
• **Significant financing component**: Adjust for time value if >1 year
• **Non-cash consideration**: Measure at fair value
• **Consideration payable to customer**: Reduces transaction price`,
          },
          {
            title: 'Step 4: Allocate Transaction Price',
            type: 'text',
            content: `Allocate based on relative standalone selling prices. Determine standalone prices using:

1. **Observable prices** (if sold separately)
2. **Adjusted market assessment** (competitor prices)
3. **Expected cost plus margin**
4. **Residual approach** (limited circumstances)

Variable consideration may be allocated to one performance obligation if it relates specifically to that obligation.`,
          },
          {
            title: 'Step 5: Recognize Revenue',
            type: 'text',
            content: `Revenue is recognized when control transfers to the customer. Control can transfer:

**Over time** if any of these criteria are met:
• Customer receives and consumes benefits simultaneously
• Entity's performance creates/enhances an asset the customer controls
• Entity's performance doesn't create an asset with alternative use, and entity has right to payment for performance to date

**At a point in time** - use indicators like:
• Entity has right to payment
• Customer has legal title
• Physical possession transferred
• Risks and rewards transferred
• Customer has accepted the asset`,
          },
        ],
      },
    },
    {
      id: 'far-004',
      section: 'FAR',
      title: 'Leases (ASC 842)',
      description:
        'Understanding the new lease standard - identification, classification, and accounting.',
      order: 4,
      duration: 75,
      difficulty: 'intermediate',
      topics: ['Lease Classification', 'Right-of-Use Assets', 'Lease Liabilities'],
      content: {
        sections: [
          {
            title: 'Key Changes Under ASC 842',
            type: 'text',
            content: `ASC 842 requires lessees to recognize nearly all leases on the balance sheet as right-of-use (ROU) assets and lease liabilities. The only exception is short-term leases (≤12 months).

For lessees, leases are classified as either finance leases or operating leases.`,
          },
          {
            title: 'Lease Classification - Finance vs. Operating',
            type: 'text',
            content: `A lease is a **Finance Lease** if ANY of these criteria are met:
1. Transfers ownership at end of lease
2. Contains a bargain purchase option
3. Lease term is ≥75% of asset's economic life
4. Present value of payments ≥90% of fair value
5. Asset is specialized with no alternative use to lessor

Otherwise, it's an **Operating Lease**.

The 75% and 90% "bright lines" are not in the standard but are commonly used in practice.`,
          },
          {
            title: 'Lessee Accounting - Initial Recognition',
            type: 'text',
            content: `**Right-of-Use Asset** includes:
• Lease liability (present value of payments)
• Payments made at or before commencement
• Initial direct costs
• Less: lease incentives received

**Lease Liability** equals the present value of:
• Fixed payments
• Variable payments based on index/rate
• Amounts probable to be paid under residual value guarantees
• Purchase option price (if reasonably certain)
• Termination penalties (if reasonably certain)`,
          },
          {
            title: 'Lessee Accounting - Subsequent Measurement',
            type: 'table',
            headers: ['', 'Finance Lease', 'Operating Lease'],
            rows: [
              [
                'ROU Asset',
                'Amortize over shorter of lease term or useful life',
                'Amortize so total expense is straight-line',
              ],
              ['Lease Liability', 'Effective interest method', 'Effective interest method'],
              [
                'Income Statement',
                'Amortization + Interest (front-loaded)',
                'Single lease expense (straight-line)',
              ],
            ],
          },
        ],
      },
    },
    {
      id: 'far-005',
      section: 'FAR',
      title: 'Income Taxes (ASC 740)',
      description: 'Deferred taxes, valuation allowances, and uncertain tax positions.',
      order: 5,
      duration: 90,
      difficulty: 'advanced',
      topics: ['Deferred Taxes', 'Temporary Differences', 'Valuation Allowance'],
      content: {
        sections: [
          {
            title: 'Overview of ASC 740',
            type: 'text',
            content: `ASC 740 requires recognition of current and deferred taxes. Deferred taxes arise from temporary differences between book and tax basis of assets and liabilities.

**Current Tax Expense** = Taxes payable/receivable per tax return
**Deferred Tax Expense** = Change in deferred tax assets/liabilities`,
          },
          {
            title: 'Temporary vs. Permanent Differences',
            type: 'text',
            content: `**Temporary Differences** reverse over time:
• Depreciation (MACRS vs. straight-line)
• Warranty expense (accrued vs. paid)
• Bad debt expense (accrued vs. direct write-off)
• Prepaid rent (deducted when paid vs. when earned)

**Permanent Differences** never reverse:
• Municipal bond interest (tax-exempt income)
• Meals entertainment (50% limitation)
• Fines and penalties
• Life insurance on key employees`,
          },
          {
            title: 'Deferred Tax Assets and Liabilities',
            type: 'text',
            content: `**Deferred Tax Liability (DTL)**: Arises when:
• Book income > Taxable income (will pay more tax later)
• Book basis of asset > Tax basis
• Book basis of liability < Tax basis

**Deferred Tax Asset (DTA)**: Arises when:
• Book income < Taxable income (will pay less tax later)
• Book basis of asset < Tax basis
• Book basis of liability > Tax basis

Formula: Temporary Difference × Enacted Tax Rate`,
          },
          {
            title: 'Valuation Allowance',
            type: 'text',
            content: `A valuation allowance reduces DTAs to the amount that is **"more likely than not"** (>50%) to be realized.

Consider:
• Future reversals of existing DTLs
• Future taxable income (excluding reversals)
• Tax planning strategies
• History of losses and ability to use carryforwards`,
          },
          {
            title: 'Rate Changes',
            type: 'text',
            content: `Deferred taxes are measured using enacted tax rates expected to apply when differences reverse. When rates change:

1. Remeasure all DTAs and DTLs at the new rate
2. Recognize the adjustment in income tax expense
3. The effect is recognized entirely in the period of enactment`,
          },
        ],
      },
    },
  ],

  // ==========================================
  // AUD - AUDITING AND ATTESTATION
  // ==========================================
  aud: [
    {
      id: 'aud-001',
      section: 'AUD',
      title: 'Ethics and Independence',
      description:
        'AICPA Code of Professional Conduct, SEC independence rules, and threats to independence.',
      order: 1,
      duration: 60,
      difficulty: 'beginner',
      topics: ['AICPA Code', 'Independence', 'Ethical Principles'],
      content: {
        sections: [
          {
            title: 'Overview',
            type: 'text',
            content: `The AICPA Code of Professional Conduct establishes ethical standards for CPAs. The code uses a conceptual framework approach, requiring CPAs to identify, evaluate, and address threats to compliance with the rules.`,
          },
          {
            title: 'Ethical Principles',
            type: 'list',
            content: [
              {
                term: 'Responsibilities',
                definition: 'Exercise sensitive professional and moral judgment',
              },
              {
                term: 'Public Interest',
                definition: 'Serve the public interest, honor public trust',
              },
              { term: 'Integrity', definition: 'Perform duties with highest sense of integrity' },
              {
                term: 'Objectivity and Independence',
                definition: 'Maintain objectivity and be free of conflicts',
              },
              {
                term: 'Due Care',
                definition: 'Observe technical and ethical standards, improve competence',
              },
              {
                term: 'Scope and Nature of Services',
                definition: "Observe the Code's rules when providing services",
              },
            ],
          },
          {
            title: 'Independence in Fact vs. Appearance',
            type: 'text',
            content: `**Independence in Fact**: Actual state of mind - objectivity and lack of bias

**Independence in Appearance**: Perception by reasonable third parties that independence exists

Both are required. Even if a CPA is unbiased, appearance of bias impairs independence.`,
          },
          {
            title: 'Threats to Independence',
            type: 'list',
            content: [
              {
                term: 'Self-Interest Threat',
                definition: 'Financial or other interest that could bias judgment',
              },
              { term: 'Self-Review Threat', definition: 'Reviewing your own previous work' },
              { term: 'Advocacy Threat', definition: "Promoting a client's position" },
              { term: 'Familiarity Threat', definition: 'Close relationship leading to sympathy' },
              { term: 'Undue Influence Threat', definition: 'Pressure from client or others' },
            ],
          },
        ],
      },
    },
    {
      id: 'aud-002',
      section: 'AUD',
      title: 'Audit Risk and Materiality',
      description: 'Understanding audit risk model, components of risk, and setting materiality.',
      order: 2,
      duration: 75,
      difficulty: 'intermediate',
      topics: ['Audit Risk Model', 'Inherent Risk', 'Control Risk', 'Detection Risk'],
      content: {
        sections: [
          {
            title: 'The Audit Risk Model',
            type: 'text',
            content: `**Audit Risk (AR)** = Inherent Risk (IR) × Control Risk (CR) × Detection Risk (DR)

**Audit Risk**: The risk that the auditor expresses an inappropriate opinion when financial statements are materially misstated.

The auditor sets acceptable AR (typically low, like 5%), assesses IR and CR, then determines DR.`,
          },
          {
            title: 'Risk Components',
            type: 'list',
            content: [
              {
                term: 'Inherent Risk',
                definition:
                  'Risk that an assertion is misstated, before considering internal controls. Factors: complexity, estimation, susceptibility to theft.',
              },
              {
                term: 'Control Risk',
                definition:
                  "Risk that internal controls won't prevent or detect a misstatement. Assessed through understanding and testing controls.",
              },
              {
                term: 'Detection Risk',
                definition:
                  "Risk that audit procedures won't detect a material misstatement. The only risk directly controlled by the auditor.",
              },
            ],
          },
          {
            title: 'Risk of Material Misstatement',
            type: 'text',
            content: `**RMM = IR × CR**

This is the risk that exists independent of the audit. The auditor assesses RMM to determine the nature, timing, and extent of substantive procedures.

High RMM → Low DR needed → More substantive testing
Low RMM → Higher DR acceptable → Less substantive testing`,
          },
          {
            title: 'Materiality',
            type: 'text',
            content: `**Overall Materiality**: Amount that would influence decisions of financial statement users

**Performance Materiality**: Set below overall materiality to reduce the probability that uncorrected + undetected misstatements exceed overall materiality

**Tolerable Misstatement**: Performance materiality applied to specific accounts

Common benchmarks:
• 5% of pre-tax income (profit-oriented)
• 0.5-1% of revenues
• 0.5-1% of total assets
• 1-2% of equity`,
          },
        ],
      },
    },
    {
      id: 'aud-003',
      section: 'AUD',
      title: 'Internal Control - COSO Framework',
      description:
        'The five components of internal control and their relationship to financial reporting.',
      order: 3,
      duration: 60,
      difficulty: 'intermediate',
      topics: ['COSO Framework', 'Control Environment', 'Control Activities'],
      content: {
        sections: [
          {
            title: 'COSO Framework Overview',
            type: 'text',
            content: `The Committee of Sponsoring Organizations (COSO) framework defines internal control as a process designed to provide reasonable assurance regarding:
• Effectiveness and efficiency of operations
• Reliability of financial reporting
• Compliance with applicable laws and regulations`,
          },
          {
            title: 'Five Components of Internal Control',
            type: 'list',
            content: [
              {
                term: '1. Control Environment',
                definition:
                  'The foundation - sets tone at the top. Includes integrity, ethics, management philosophy, organizational structure, assignment of authority, and HR policies.',
              },
              {
                term: '2. Risk Assessment',
                definition:
                  'Process for identifying and responding to business risks. Includes change management.',
              },
              {
                term: '3. Control Activities',
                definition:
                  'Policies and procedures ensuring management directives are carried out. Includes authorizations, verifications, reconciliations, segregation of duties.',
              },
              {
                term: '4. Information & Communication',
                definition:
                  'Systems to capture and communicate relevant information. Includes both internal and external communication.',
              },
              {
                term: '5. Monitoring',
                definition:
                  'Ongoing and separate evaluations of internal control effectiveness. Self-assessments, internal audit, supervisor reviews.',
              },
            ],
          },
          {
            title: 'Control Environment Elements',
            type: 'text',
            content: `The control environment is the MOST IMPORTANT component because it influences all others:

• Commitment to integrity and ethical values
• Board oversight and independence
• Management philosophy and operating style
• Organizational structure
• Assignment of authority and responsibility
• HR policies (hiring, training, compensation)
• Accountability`,
          },
        ],
      },
    },
    {
      id: 'aud-004',
      section: 'AUD',
      title: 'Audit Evidence and Procedures',
      description:
        'Types of audit evidence, sufficiency and appropriateness, and audit procedures.',
      order: 4,
      duration: 60,
      difficulty: 'intermediate',
      topics: ['Audit Evidence', 'Assertions', 'Audit Procedures'],
      content: {
        sections: [
          {
            title: 'Sufficiency and Appropriateness',
            type: 'text',
            content: `**Sufficiency** = Quantity of evidence (how much)
• Affected by risk assessment and quality of evidence

**Appropriateness** = Quality of evidence (relevance + reliability)
• Relevance: Does it relate to the assertion being tested?
• Reliability: Can the evidence be trusted?`,
          },
          {
            title: 'Reliability of Evidence',
            type: 'text',
            content: `More reliable evidence comes from:
• Independent external sources (vs. internal)
• Effective internal controls (vs. weak controls)
• Direct observation by auditor (vs. inquiry)
• Original documents (vs. copies)
• Written form (vs. oral)

External confirmations, physical inspection, and recalculation are generally more reliable than inquiry.`,
          },
          {
            title: 'Management Assertions - Classes of Transactions',
            type: 'list',
            content: [
              { term: 'Occurrence', definition: 'Transactions actually occurred' },
              { term: 'Completeness', definition: 'All transactions are recorded' },
              { term: 'Authorization', definition: 'Transactions were properly approved' },
              { term: 'Accuracy', definition: 'Amounts are correct' },
              { term: 'Cutoff', definition: 'Recorded in the correct period' },
              { term: 'Classification', definition: 'Recorded in proper accounts' },
            ],
          },
          {
            title: 'Management Assertions - Account Balances',
            type: 'list',
            content: [
              { term: 'Existence', definition: 'Assets, liabilities, equity exist' },
              {
                term: 'Rights and Obligations',
                definition: 'Entity owns/controls assets; liabilities are obligations',
              },
              { term: 'Completeness', definition: 'All items that should be recorded are' },
              { term: 'Valuation and Allocation', definition: 'Recorded at appropriate amounts' },
            ],
          },
          {
            title: 'Types of Audit Procedures',
            type: 'list',
            content: [
              { term: 'Inspection', definition: 'Examining records/documents or physical assets' },
              { term: 'Observation', definition: 'Watching a process or procedure' },
              {
                term: 'External Confirmation',
                definition: 'Obtaining response from third parties',
              },
              { term: 'Recalculation', definition: 'Checking mathematical accuracy' },
              { term: 'Reperformance', definition: 'Independently executing procedures/controls' },
              {
                term: 'Analytical Procedures',
                definition: 'Evaluating data using plausible relationships',
              },
              { term: 'Inquiry', definition: 'Seeking information from knowledgeable parties' },
            ],
          },
        ],
      },
    },
    {
      id: 'aud-005',
      section: 'AUD',
      title: 'Audit Reports',
      description: 'Understanding audit report types, modifications, and report language.',
      order: 5,
      duration: 60,
      difficulty: 'intermediate',
      topics: ['Unmodified Opinion', 'Modified Opinions', 'Report Elements'],
      content: {
        sections: [
          {
            title: 'Unmodified Opinion',
            type: 'text',
            content: `An unmodified (clean) opinion is issued when:
• Sufficient appropriate audit evidence has been obtained
• Financial statements are presented fairly in all material respects
• In accordance with the applicable financial reporting framework

The opinion states: "In our opinion, the financial statements...present fairly, in all material respects..."`,
          },
          {
            title: 'Types of Modified Opinions',
            type: 'table',
            headers: ['Opinion', 'When Issued'],
            rows: [
              [
                'Qualified',
                'Material but NOT pervasive misstatement, OR scope limitation that is material but not pervasive',
              ],
              ['Adverse', 'Material AND pervasive misstatement'],
              [
                'Disclaimer',
                'Material AND pervasive scope limitation (unable to obtain sufficient evidence)',
              ],
            ],
          },
          {
            title: 'Emphasis of Matter vs. Other Matter',
            type: 'text',
            content: `**Emphasis of Matter Paragraph**: Draws attention to a matter appropriately presented in the financial statements that is fundamental to users\' understanding
• Going concern uncertainty
• Significant related party transactions
• Important subsequent events
• Major catastrophe

**Other Matter Paragraph**: Draws attention to matters NOT presented in the financial statements
• Predecessor auditor reference
• Supplementary information
• Restriction on distribution`,
          },
          {
            title: 'Standard Report Elements',
            type: 'list',
            content: [
              { term: 'Title', definition: '"Independent Auditor\'s Report"' },
              {
                term: 'Addressee',
                definition: 'Those charged with governance (board, shareholders)',
              },
              {
                term: 'Opinion Section',
                definition: 'First section - identifies F/S and states opinion',
              },
              {
                term: 'Basis for Opinion',
                definition: 'Conducted in accordance with GAAS, independence, sufficient evidence',
              },
              {
                term: 'Responsibilities of Management',
                definition: 'Preparation of F/S, internal control, going concern',
              },
              {
                term: "Auditor's Responsibilities",
                definition:
                  'Reasonable assurance, professional judgment, internal control understanding',
              },
              { term: 'Signature', definition: "Firm's name" },
              { term: 'City and State', definition: 'Office location' },
              { term: 'Date', definition: 'Last day of fieldwork' },
            ],
          },
        ],
      },
    },
  ],

  // ==========================================
  // REG - REGULATION
  // ==========================================
  reg: [
    {
      id: 'reg-001',
      section: 'REG',
      title: 'Individual Taxation - Gross Income',
      description: 'What is included in and excluded from gross income for individuals.',
      order: 1,
      duration: 75,
      difficulty: 'intermediate',
      topics: ['Gross Income', 'Exclusions', 'AGI'],
      content: {
        sections: [
          {
            title: 'Gross Income Defined',
            type: 'text',
            content: `IRC §61: Gross income means all income from whatever source derived, including (but not limited to):
• Compensation for services
• Gross income from business
• Gains from property transactions
• Interest, dividends, rents, royalties
• Alimony (pre-2019 divorces)
• Income from discharge of indebtedness
• Distributive share from partnerships/S corps`,
          },
          {
            title: 'Common Inclusions',
            type: 'list',
            content: [
              {
                term: 'Wages & Salaries',
                definition: 'All compensation for services, including bonuses, tips, commissions',
              },
              {
                term: 'Interest Income',
                definition: 'Bank interest, bond interest (except municipal)',
              },
              {
                term: 'Dividend Income',
                definition: 'Qualified dividends taxed at capital gains rates',
              },
              { term: 'Self-Employment Income', definition: 'Net earnings from business' },
              { term: 'Rental Income', definition: 'Gross rents less allowable expenses' },
              {
                term: 'Gains from Sale of Property',
                definition: 'Amount realized minus adjusted basis',
              },
              {
                term: 'Gambling Winnings',
                definition: 'All gambling income (losses deductible only to extent of winnings)',
              },
            ],
          },
          {
            title: 'Common Exclusions from Gross Income',
            type: 'list',
            content: [
              {
                term: 'Municipal Bond Interest',
                definition: 'Interest from state/local government bonds',
              },
              {
                term: 'Life Insurance Proceeds',
                definition: 'Death benefits received by beneficiary (with exceptions)',
              },
              {
                term: 'Gifts and Inheritances',
                definition:
                  'Property received by gift/bequest (income from such property is taxable)',
              },
              {
                term: "Workers' Compensation",
                definition: 'Benefits for work-related injury/sickness',
              },
              {
                term: 'Qualified Scholarships',
                definition: 'Amounts used for tuition and required fees',
              },
              {
                term: 'Employer Health Insurance',
                definition: 'Premiums paid by employer for employee coverage',
              },
              {
                term: 'Certain Fringe Benefits',
                definition:
                  'De minimis, working condition, qualified transportation (limits apply)',
              },
            ],
          },
          {
            title: 'Adjusted Gross Income (AGI)',
            type: 'text',
            content: `AGI = Gross Income − Above-the-Line Deductions

Common above-the-line deductions:
• Educator expenses (up to $300)
• Self-employment tax (50% of SE tax)
• Self-employed health insurance
• IRA contributions (if eligible)
• Student loan interest (up to $2,500)
• HSA contributions
• Alimony paid (pre-2019 divorces)

AGI is important because many deductions and credits are limited based on AGI.`,
          },
        ],
      },
    },
    {
      id: 'reg-002',
      section: 'REG',
      title: 'Individual Taxation - Deductions',
      description: 'Standard deduction, itemized deductions, and QBI deduction.',
      order: 2,
      duration: 60,
      difficulty: 'intermediate',
      topics: ['Standard Deduction', 'Itemized Deductions', 'QBI Deduction'],
      content: {
        sections: [
          {
            title: 'Standard vs. Itemized Deductions',
            type: 'text',
            content: `Taxpayers choose the greater of standard deduction or itemized deductions.

**2024 Standard Deduction:**
• Single: $14,600
• MFJ: $29,200
• MFS: $14,600
• HOH: $21,900

Additional amounts for blind/65+.`,
          },
          {
            title: 'Itemized Deductions (Schedule A)',
            type: 'list',
            content: [
              { term: 'Medical Expenses', definition: 'Exceeding 7.5% of AGI' },
              {
                term: 'State & Local Taxes (SALT)',
                definition: 'Capped at $10,000 ($5,000 MFS) - includes income/property taxes',
              },
              {
                term: 'Home Mortgage Interest',
                definition: 'On up to $750,000 of acquisition debt',
              },
              {
                term: 'Charitable Contributions',
                definition: 'Cash up to 60% AGI; capital gain property up to 30%',
              },
              {
                term: 'Casualty Losses',
                definition: 'Only from federally declared disasters, exceeding 10% AGI + $100',
              },
            ],
          },
          {
            title: 'Qualified Business Income (QBI) Deduction',
            type: 'text',
            content: `IRC §199A allows a deduction up to 20% of qualified business income from:
• Sole proprietorships
• Partnerships
• S corporations
• Some trusts and estates

**Limitations for high earners:**
• W-2 wage limitation
• W-2 wages + capital limitation
• Specified service trade or business (SSTB) exclusion

**Threshold (2024):** $191,950 single / $383,900 MFJ - below threshold, full deduction allowed.`,
          },
        ],
      },
    },
    {
      id: 'reg-003',
      section: 'REG',
      title: 'Business Entities - Partnerships',
      description: 'Formation, operations, distributions, and termination of partnerships.',
      order: 3,
      duration: 90,
      difficulty: 'advanced',
      topics: ['Partnership Formation', 'Basis', 'Distributions'],
      content: {
        sections: [
          {
            title: 'Partnership Characteristics',
            type: 'text',
            content: `Partnerships are pass-through entities - income is taxed to partners, not the partnership.

The partnership files Form 1065 (information return) and issues Schedule K-1 to each partner showing their share of income, deductions, credits, etc.`,
          },
          {
            title: 'Formation - Contributing Property',
            type: 'text',
            content: `IRC §721: No gain/loss is recognized when property is contributed to a partnership in exchange for a partnership interest.

**Partner's basis in partnership interest:**
= Adjusted basis of property contributed
+ Gain recognized (if any)
+ Share of partnership liabilities
− Liabilities assumed by partnership

**Partnership's basis in contributed property:**
= Partner's adjusted basis (carryover basis)

Exception: Gain recognized if partnership would be an investment company.`,
          },
          {
            title: "Partner's Outside Basis",
            type: 'text',
            content: `Outside basis = Partner's tax basis in partnership interest

**Increases:**
• Additional contributions
• Share of partnership income
• Share of tax-exempt income
• Increase in share of liabilities

**Decreases:**
• Distributions received
• Share of partnership losses
• Share of nondeductible expenses
• Decrease in share of liabilities

Cannot go below zero (excess loss suspended).`,
          },
          {
            title: 'Distributions',
            type: 'text',
            content: `**Current Distributions (non-liquidating):**
• Generally no gain/loss to partner or partnership
• Reduce partner's outside basis
• Gain recognized only if cash exceeds outside basis

**Liquidating Distributions:**
• Partner's entire interest is terminated
• Gain: Cash received > outside basis
• Loss: Only cash + certain "hot" assets received, and basis exceeds FMV

**Hot Assets:** Unrealized receivables and substantially appreciated inventory`,
          },
        ],
      },
    },
    {
      id: 'reg-004',
      section: 'REG',
      title: 'Business Entities - S Corporations',
      description: 'S corporation election, operations, and shareholder taxation.',
      order: 4,
      duration: 75,
      difficulty: 'advanced',
      topics: ['S Corp Election', 'Shareholder Basis', 'Built-in Gains'],
      content: {
        sections: [
          {
            title: 'S Corporation Requirements',
            type: 'list',
            content: [
              { term: 'Domestic Corporation', definition: 'Must be formed in the US' },
              {
                term: 'Eligible Shareholders',
                definition:
                  'Individuals, estates, certain trusts, tax-exempt organizations - NO C corps, partnerships, or nonresident aliens',
              },
              {
                term: '100 Shareholders Max',
                definition: 'Family members can elect to be treated as one shareholder',
              },
              {
                term: 'One Class of Stock',
                definition:
                  'Differences in voting rights OK, but economic rights must be identical',
              },
              {
                term: 'Calendar Year',
                definition: 'Generally required unless business purpose shown',
              },
            ],
          },
          {
            title: 'S Corporation Election',
            type: 'text',
            content: `File Form 2553 with IRS:
• By 15th day of 3rd month of tax year (for current year), OR
• Anytime during preceding tax year

All shareholders must consent. Election is effective until terminated.

**Termination:**
• Revocation (>50% consent)
• Ceasing to meet requirements
• Passive investment income for 3 consecutive years (if E&P exists)`,
          },
          {
            title: 'Shareholder Stock Basis',
            type: 'text',
            content: `**Increases:**
• Additional stock contributions
• Share of income (ordinary and separately stated)
• Share of tax-exempt income

**Decreases (in order):**
1. Distributions (but not below zero)
2. Nondeductible, noncapital expenses
3. Non-separately computed loss
4. Separately stated loss items

Unlike partnerships, S corp shareholders do NOT increase basis for entity-level debt.`,
          },
          {
            title: 'Built-in Gains Tax',
            type: 'text',
            content: `When a C corporation converts to S status, a corporate-level tax may apply to built-in gains recognized during the recognition period.

**Recognition Period:** 5 years from conversion date

**Built-in Gain:** FMV at conversion date − adjusted basis at conversion date

Tax rate: 21% (corporate rate)

This prevents using S election to escape corporate-level tax on appreciated assets.`,
          },
        ],
      },
    },
    {
      id: 'reg-005',
      section: 'REG',
      title: 'Ethics and Responsibilities',
      description: 'Circular 230, preparer penalties, and tax practice standards.',
      order: 5,
      duration: 45,
      difficulty: 'beginner',
      topics: ['Circular 230', 'Preparer Penalties', 'Due Diligence'],
      content: {
        sections: [
          {
            title: 'Circular 230 Overview',
            type: 'text',
            content: `Treasury Circular 230 governs practice before the IRS. It applies to:
• CPAs
• Attorneys
• Enrolled Agents
• Enrolled Actuaries
• Other authorized practitioners

Covers duties and restrictions on practice, including fees, solicitation, and competence.`,
          },
          {
            title: 'Due Diligence Requirements',
            type: 'text',
            content: `Practitioners must exercise due diligence in:
• Preparing and filing documents
• Determining correctness of representations
• Knowing when reliance on client information is reasonable

**Reasonable Basis Standard:** Positions must have a reasonable basis (realistic possibility of success).

**Substantial Authority:** Higher standard for tax shelter items.`,
          },
          {
            title: 'Preparer Penalties',
            type: 'table',
            headers: ['Penalty', 'Amount', 'Standard'],
            rows: [
              ['Unreasonable Position', '$1,000 or 50% of fee', 'Substantial authority required'],
              ['Willful/Reckless', '$5,000 or 75% of fee', 'Willful or reckless disregard'],
              ['Failure to Sign', '$50 per return', 'Max $27,000/year'],
              ['Failure to Provide Copy', '$50 per return', 'Max $27,000/year'],
              ['EITC Due Diligence', '$560 per failure', 'Form 8867 requirements'],
            ],
          },
          {
            title: 'Taxpayer Penalties',
            type: 'list',
            content: [
              { term: 'Failure to File', definition: '5% per month, max 25%' },
              { term: 'Failure to Pay', definition: '0.5% per month, max 25%' },
              {
                term: 'Accuracy-Related',
                definition:
                  '20% of underpayment (negligence, substantial understatement, valuation)',
              },
              { term: 'Fraud', definition: '75% of underpayment' },
            ],
          },
        ],
      },
    },
  ],

  // ==========================================
  // BEC - BUSINESS ENVIRONMENT AND CONCEPTS
  // ==========================================
  bec: [
    {
      id: 'bec-001',
      section: 'BEC',
      title: 'Corporate Governance',
      description: 'Board responsibilities, committees, and SOX requirements.',
      order: 1,
      duration: 45,
      difficulty: 'beginner',
      topics: ['Board of Directors', 'Audit Committee', 'SOX'],
      content: {
        sections: [
          {
            title: 'Board of Directors Responsibilities',
            type: 'list',
            content: [
              {
                term: 'Strategic Direction',
                definition: 'Set mission, vision, and overall strategy',
              },
              {
                term: 'Management Oversight',
                definition: 'Hire, evaluate, and compensate executives',
              },
              { term: 'Risk Oversight', definition: 'Ensure appropriate risk management' },
              {
                term: 'Financial Oversight',
                definition: 'Review and approve financial statements',
              },
              {
                term: 'Shareholder Representation',
                definition: 'Act in best interest of shareholders',
              },
            ],
          },
          {
            title: 'Key Committees',
            type: 'text',
            content: `**Audit Committee:**
• Oversees financial reporting and disclosure
• Responsible for external auditor relationship
• Monitors internal control over financial reporting
• SOX requires all members be independent

**Compensation Committee:**
• Sets executive compensation
• Reviews compensation policies
• Should be independent

**Nominating Committee:**
• Identifies board candidates
• Oversees board composition and succession`,
          },
          {
            title: 'Sarbanes-Oxley Key Provisions',
            type: 'list',
            content: [
              {
                term: 'Section 302',
                definition: 'CEO/CFO must certify accuracy of financial statements',
              },
              {
                term: 'Section 404',
                definition:
                  'Management assessment of internal control; auditor attestation (large companies)',
              },
              {
                term: 'Section 301',
                definition: 'Audit committee requirements - independence, financial expert',
              },
              { term: 'Section 802', definition: 'Criminal penalties for document destruction' },
              { term: 'Section 906', definition: 'Criminal penalties for false certifications' },
            ],
          },
        ],
      },
    },
    {
      id: 'bec-002',
      section: 'BEC',
      title: 'Economic Concepts',
      description: 'Supply and demand, market structures, and macroeconomic indicators.',
      order: 2,
      duration: 60,
      difficulty: 'intermediate',
      topics: ['Supply & Demand', 'Market Structures', 'Business Cycles'],
      content: {
        sections: [
          {
            title: 'Supply and Demand',
            type: 'text',
            content: `**Law of Demand:** Price ↑ → Quantity Demanded ↓ (inverse relationship)

**Law of Supply:** Price ↑ → Quantity Supplied ↑ (direct relationship)

**Equilibrium:** Where supply and demand curves intersect

**Price Elasticity of Demand:**
Ed = % Change in Quantity / % Change in Price
• |Ed| > 1: Elastic (responsive to price)
• |Ed| < 1: Inelastic (unresponsive)
• |Ed| = 1: Unitary elastic`,
          },
          {
            title: 'Market Structures',
            type: 'table',
            headers: ['Structure', 'Firms', 'Product', 'Entry'],
            rows: [
              ['Perfect Competition', 'Many', 'Homogeneous', 'Free'],
              ['Monopolistic Competition', 'Many', 'Differentiated', 'Free'],
              ['Oligopoly', 'Few', 'Can be either', 'Barriers'],
              ['Monopoly', 'One', 'Unique', 'Blocked'],
            ],
          },
          {
            title: 'Business Cycle Phases',
            type: 'list',
            content: [
              {
                term: 'Expansion',
                definition: 'GDP grows, unemployment falls, investment increases',
              },
              { term: 'Peak', definition: 'Maximum economic output, low unemployment' },
              { term: 'Contraction/Recession', definition: 'GDP declines, unemployment rises' },
              { term: 'Trough', definition: 'Bottom of cycle, economy begins recovery' },
            ],
          },
        ],
      },
    },
    {
      id: 'bec-003',
      section: 'BEC',
      title: 'Financial Management',
      description: 'Time value of money, capital budgeting, and working capital management.',
      order: 3,
      duration: 90,
      difficulty: 'intermediate',
      topics: ['Time Value', 'Capital Budgeting', 'Working Capital'],
      content: {
        sections: [
          {
            title: 'Time Value of Money',
            type: 'text',
            content: `**Present Value:** PV = FV / (1 + r)^n

**Future Value:** FV = PV × (1 + r)^n

**Annuity:** Series of equal payments at regular intervals
• Ordinary annuity: Payments at END of period
• Annuity due: Payments at BEGINNING of period

**Perpetuity:** PV = Payment / r`,
          },
          {
            title: 'Capital Budgeting Methods',
            type: 'list',
            content: [
              {
                term: 'Net Present Value (NPV)',
                definition: 'PV of inflows - PV of outflows. Accept if positive. Best method.',
              },
              {
                term: 'Internal Rate of Return (IRR)',
                definition: 'Rate where NPV = 0. Accept if > cost of capital.',
              },
              {
                term: 'Payback Period',
                definition:
                  'Time to recover initial investment. Ignores time value and cash flows after payback.',
              },
              {
                term: 'Profitability Index',
                definition: 'PV of inflows / PV of outflows. Accept if > 1.',
              },
            ],
          },
          {
            title: 'Cost of Capital',
            type: 'text',
            content: `**WACC = (E/V × Re) + (D/V × Rd × (1-T))**

Where:
• E = Market value of equity
• D = Market value of debt
• V = E + D
• Re = Cost of equity
• Rd = Cost of debt
• T = Tax rate

**Cost of Equity (CAPM):**
Re = Rf + β(Rm - Rf)
• Rf = Risk-free rate
• β = Beta (systematic risk)
• Rm = Expected market return`,
          },
          {
            title: 'Working Capital Management',
            type: 'text',
            content: `**Working Capital = Current Assets - Current Liabilities**

**Cash Conversion Cycle:**
= Days Inventory Outstanding (DIO)
+ Days Sales Outstanding (DSO)
- Days Payables Outstanding (DPO)

Goal: Minimize CCC to reduce financing needs

**Current Ratio:** Current Assets / Current Liabilities
**Quick Ratio:** (Cash + Receivables) / Current Liabilities`,
          },
        ],
      },
    },
  ],
};

// Helper function to get all lessons
export const getAllLessons = () => {
  return [...LESSONS.far, ...LESSONS.aud, ...LESSONS.reg, ...LESSONS.bec];
};

// Get lessons by section
export const getLessonsBySection = (section) => {
  return LESSONS[section.toLowerCase()] || [];
};

// Get lesson by ID
export const getLessonById = (lessonId) => {
  const allLessons = getAllLessons();
  return allLessons.find((lesson) => lesson.id === lessonId);
};

// Get lesson stats
export const getLessonStats = () => {
  return {
    total: getAllLessons().length,
    bySection: {
      FAR: LESSONS.far.length,
      AUD: LESSONS.aud.length,
      REG: LESSONS.reg.length,
      BEC: LESSONS.bec.length,
    },
  };
};

export default LESSONS;
