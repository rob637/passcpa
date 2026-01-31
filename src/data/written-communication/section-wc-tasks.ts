// Section-Specific Written Communication Tasks for CPA Exam
// Each section has targeted WC tasks aligned to their blueprint

import { WCTask } from '../../types';

// ==========================================================================
// AUD - Auditing and Attestation WC Tasks
// ==========================================================================
export const AUD_WC_TASKS: WCTask[] = [
  {
    id: 'wc_aud_001',
    section: 'AUD',
    type: 'written_communication',
    topic: 'Audit Opinion Modification',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-B-1',
    scenario: `You are the engagement partner for the audit of Riverside Manufacturing Inc. During the audit, your team discovered that the company's inventory valuation of $8.5 million (25% of total assets) could not be verified due to inadequate records. The company experienced a warehouse fire that destroyed inventory records, and management was unable to provide sufficient alternative documentation.

Additionally, management has refused to provide a representation letter, citing concerns about personal liability. The CEO stated, "We're not comfortable signing anything that could come back on us personally."

The CFO has asked you to explain what type of audit opinion will be issued and why.`,
    prompt: `Write a professional memo to the CFO of Riverside Manufacturing Inc. that:
1. Explains the impact of the scope limitation regarding inventory
2. Discusses the requirement for and importance of the management representation letter
3. Identifies the type of audit opinion that will be issued given these circumstances
4. Explains the consequences of each issue on the audit report`,
    hints: [
      'Consider the materiality of inventory (25% of assets)',
      'Review AU-C 705 regarding modifications to the opinion',
      'Remember the requirements of AU-C 580 on written representations',
      'Distinguish between qualified, adverse, and disclaimer opinions',
    ],
    references: [
      'AU-C 705: Modifications to the Opinion',
      'AU-C 580: Written Representations',
      'AU-C 501: Audit Evidence—Specific Considerations for Inventory',
    ],
  },
  {
    id: 'wc_aud_002',
    section: 'AUD',
    type: 'written_communication',
    topic: 'Internal Control Deficiencies',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-C-1',
    scenario: `You are the senior auditor on the engagement for Premier Financial Services, a public company. During testing of internal controls over financial reporting, you identified the following deficiencies:

1. The accounts payable clerk can create new vendors and process payments without supervisory approval
2. The company's month-end close process routinely takes 25 days, resulting in material adjusting entries in subsequent periods
3. IT administrator accounts share a generic password that hasn't been changed in two years
4. The CFO can post journal entries without a second approval for amounts under $50,000

Management believes these are minor issues that don't require immediate attention. The Audit Committee Chair has asked for your assessment.`,
    prompt: `Write a professional communication to the Audit Committee Chair of Premier Financial Services that:
1. Evaluates each deficiency and classifies it as a deficiency, significant deficiency, or material weakness
2. Explains the criteria used for classification
3. Discusses the required communications to the Audit Committee
4. Recommends remediation steps for the most critical issues`,
    hints: [
      'Consider the magnitude and likelihood of misstatement for each deficiency',
      'Review the definitions in AS 2201 for public company audits',
      'Segregation of duties and authorization controls are key',
      'Required communications differ by deficiency classification',
    ],
    references: [
      'AS 2201: An Audit of Internal Control Over Financial Reporting',
      'AU-C 265: Communicating Internal Control Related Matters',
      'COSO Framework: Control Activities Component',
    ],
  },
  {
    id: 'wc_aud_003',
    section: 'AUD',
    type: 'written_communication',
    topic: 'Going Concern Evaluation',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-C-1',
    scenario: `You are concluding the audit of TechVenture Startup Inc. for the year ended December 31. During your evaluation, you noted:

- The company has reported losses for the past three consecutive years ($2M, $3.5M, $4.8M)
- Current ratio has declined from 1.8 to 0.6 over two years
- The company is in default on a $10M line of credit, with the bank demanding repayment by March 31
- Key customer contracts representing 40% of revenue are up for renewal with uncertain outcomes
- Management has a plan to raise $15M in equity financing, with term sheets from two investors

Management asserts the financing will close by February 28, but you note the term sheets are non-binding and contain material conditions.`,
    prompt: `Write a professional memo to the engagement partner analyzing:
1. The conditions that raise substantial doubt about going concern
2. Management's plans and their adequacy to mitigate the doubt
3. Your assessment of whether substantial doubt is alleviated
4. The appropriate audit report modification if substantial doubt remains`,
    hints: [
      'Apply AU-C 570 going concern assessment framework',
      'Evaluate management plans with professional skepticism',
      'Consider whether plans are feasible and can be effectively implemented',
      'Non-binding financing commitments may not alleviate doubt',
    ],
    references: [
      'AU-C 570: The Auditor\'s Consideration of Going Concern',
      'AU-C 706: Emphasis-of-Matter and Other-Matter Paragraphs',
    ],
  },
  {
    id: 'wc_aud_004',
    section: 'AUD',
    type: 'written_communication',
    topic: 'Related Party Transactions',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-A-2',
    scenario: `During the audit of Consolidated Industries Corp., you discovered several related party transactions:

1. The company leases its headquarters building from a partnership owned by the CEO for $500,000 annually. A market rate analysis suggests comparable leases are $350,000-$400,000.

2. The company purchased $2M of raw materials from a supplier owned by a board member's spouse. These purchases were made without competitive bidding.

3. The CEO's brother was hired as a consultant for $180,000, but there's no documentation of services rendered.

4. A $5M loan was made to a company controlled by the CFO's brother at 2% interest (market rate is 7%).

Management disclosed items 1 and 2 in the footnotes but considers items 3 and 4 immaterial and not requiring disclosure.`,
    prompt: `Write a professional memo to management of Consolidated Industries Corp. addressing:
1. The audit requirements for related party transactions
2. Concerns about each identified transaction
3. Required disclosures under GAAP for these transactions
4. The effect on your audit opinion if proper disclosure is not made`,
    hints: [
      'Related party transactions may not be arm\'s length',
      'Disclosure is required regardless of whether terms are favorable',
      'Consider potential for fraud in related party transactions',
      'Evaluate whether transactions have substance',
    ],
    references: [
      'AU-C 550: Related Parties',
      'ASC 850: Related Party Disclosures',
    ],
  },
];

// ==========================================================================
// FAR - Financial Accounting and Reporting WC Tasks
// ==========================================================================
export const FAR_WC_TASKS: WCTask[] = [
  {
    id: 'wc_far_001',
    section: 'FAR',
    type: 'written_communication',
    topic: 'Revenue Recognition - ASC 606',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    scenario: `You are the controller at SoftServe Technologies Inc., a software company. Your company just signed a $5 million contract with Enterprise Corp that includes:

- Perpetual software license: $2M (standalone price $2.5M)
- 3-year post-contract support (PCS): $1.8M ($600K/year, standalone price $750K/year)
- Implementation services: $1.2M (standalone price $1M)

The implementation services require significant customization and are not distinct from the software. The software cannot function without the customization. Enterprise Corp paid $2M upfront, with the remainder due in equal annual installments.

The CFO wants to recognize $3.2M (software + implementation) immediately. She argues the software was delivered on Day 1.`,
    prompt: `Write a professional memo to the CFO of SoftServe Technologies addressing:
1. How to identify performance obligations in this contract under ASC 606
2. How to allocate the transaction price to each performance obligation
3. When revenue should be recognized for each component
4. Why the CFO's proposed treatment may not comply with GAAP`,
    hints: [
      'Apply the 5-step revenue recognition model',
      'Evaluate whether goods/services are distinct',
      'Consider the guidance on software plus customization',
      'Allocation should be based on relative standalone selling prices',
    ],
    references: [
      'ASC 606-10-25: Revenue from Contracts with Customers',
      'ASC 606-10-32: Allocating the Transaction Price',
    ],
  },
  {
    id: 'wc_far_002',
    section: 'FAR',
    type: 'written_communication',
    topic: 'Lease Classification',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-B-2',
    scenario: `Metro Transit Authority (a governmental entity) is evaluating a lease for 50 electric buses with the following terms:

- Lease term: 8 years
- Estimated economic life of buses: 12 years
- Monthly lease payment: $125,000 (first payment due at inception)
- Fair value of buses: $8.5 million
- Purchase option at end of lease: $850,000 (estimated fair value at that date: $1.2M)
- Lessee's incremental borrowing rate: 5%
- Present value of lease payments (at 5%): $9.8 million

The city's budget officer wants to classify this as a short-term lease to avoid balance sheet recognition.`,
    prompt: `Write a professional memo to the budget officer explaining:
1. The proper lease classification under GASB 87 (governmental accounting)
2. Analysis of each classification criterion
3. The required journal entries at lease inception
4. Why the proposed treatment is not appropriate`,
    hints: [
      'Review GASB 87 criteria for finance vs operating leases',
      'Compare to ASC 842 criteria for reference',
      'Governmental entities follow GASB, not FASB',
      '8-year term vs 12-year life is a key consideration',
    ],
    references: [
      'GASB 87: Leases',
      'GASB Concepts Statement No. 6',
    ],
  },
  {
    id: 'wc_far_003',
    section: 'FAR',
    type: 'written_communication',
    topic: 'Business Combination Accounting',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-1',
    scenario: `Mega Corp acquired 80% of Target Inc. on July 1 for $24 million cash. On that date, Target Inc.'s identifiable net assets had a book value of $20 million and fair value of $25 million. The difference relates to:
- Equipment: FV $22M, BV $18M (remaining life 4 years)
- Customer relationships: FV $3M (not previously recorded, 5-year life)

Target Inc.'s net income for the full year was $4 million (earned evenly throughout the year). Target declared and paid dividends of $1 million in December.

The CEO asks how much goodwill to record and whether the noncontrolling interest affects consolidated earnings.`,
    prompt: `Write a professional memo to the CEO of Mega Corp explaining:
1. The calculation of goodwill under the acquisition method
2. How to record the noncontrolling interest
3. The impact on consolidated net income for the year
4. Required disclosures for this business combination`,
    hints: [
      'Goodwill is calculated at the acquisition-date fair value level',
      'NCI can be measured at fair value or proportionate share',
      'Only post-acquisition results are consolidated',
      'Consider amortization of fair value adjustments',
    ],
    references: [
      'ASC 805: Business Combinations',
      'ASC 810: Consolidation',
    ],
  },
  {
    id: 'wc_far_004',
    section: 'FAR',
    type: 'written_communication',
    topic: 'Not-for-Profit Financial Reporting',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-A-1',
    scenario: `Community Health Foundation, a not-for-profit organization, received the following during the year:

1. A $500,000 grant restricted by the donor for cancer research (3-year period)
2. A $200,000 donation designated by the board for building improvements
3. A gift of securities worth $100,000, with no donor restrictions but given in response to an annual fundraising appeal
4. A pledge of $300,000 payable over 3 years, restricted to educational programs
5. Volunteer services valued at $75,000 from nurses providing free health screenings

The Executive Director wants to know how to classify these items and whether all can be recognized as revenue immediately.`,
    prompt: `Write a professional memo to the Executive Director explaining:
1. Classification of each item as with or without donor restrictions
2. When and how to recognize revenue for each item
3. How board designations differ from donor restrictions
4. Requirements for recognizing contributed services`,
    hints: [
      'Apply ASU 2016-14 net asset classification',
      'Board designations do not create donor restrictions',
      'Multi-year pledges require discounting',
      'Contributed services have specific recognition criteria',
    ],
    references: [
      'ASC 958: Not-for-Profit Entities',
      'ASU 2016-14: Presentation of Financial Statements',
    ],
  },
];

// ==========================================================================
// REG - Taxation and Regulation WC Tasks
// ==========================================================================
export const REG_WC_TASKS: WCTask[] = [
  {
    id: 'wc_reg_001',
    section: 'REG',
    type: 'written_communication',
    topic: 'Partnership Taxation',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-2',
    scenario: `ABC Partnership is a general partnership with three equal partners: Alex, Beth, and Carol. For the current year, the partnership reported:

- Ordinary business income: $300,000
- Long-term capital gain: $60,000
- Section 179 expense: $45,000
- Charitable contributions: $15,000
- Tax-exempt interest: $9,000
- Partner guaranteed payments: Alex $50,000, Beth $30,000

Alex contributed land with a basis of $40,000 and FMV of $100,000. Beth contributed cash of $75,000. Carol contributed services worth $75,000 for her partnership interest.

The partners want to understand their tax implications.`,
    prompt: `Write a professional memo to the partners of ABC Partnership explaining:
1. How partnership income flows through to each partner
2. The separately stated items and why they're reported separately
3. Each partner's basis in their partnership interest
4. The tax consequences of Carol's contribution of services`,
    hints: [
      'Partnerships are pass-through entities',
      'Guaranteed payments are deductible by partnership',
      'Services for partnership interest is taxable compensation',
      'Separately stated items retain their character',
    ],
    references: [
      'IRC Section 701-709: Partnerships',
      'IRC Section 721: Nonrecognition on Contributions',
      'IRC Section 707(c): Guaranteed Payments',
    ],
  },
  {
    id: 'wc_reg_002',
    section: 'REG',
    type: 'written_communication',
    topic: 'S Corporation Eligibility',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-B-1',
    scenario: `TechStart Inc. is a C corporation that wants to elect S corporation status. Currently:

- 95 shareholders, including:
  - 80 individual U.S. citizens
  - 5 resident aliens
  - 3 family trusts (all qualifying S corporation trusts)
  - 2 single-member LLCs owned by individuals
  - 5 shares owned by the company's retirement plan (401(k))
- One class of common stock (100,000 shares)
- Preferred stock option: Management wants to issue non-voting preferred stock to investors

The company made the election on February 20 and wants it effective January 1.`,
    prompt: `Write a professional memo to management of TechStart Inc. addressing:
1. Whether the company currently qualifies for S corporation status
2. The impact of each shareholder type on eligibility
3. Whether the proposed preferred stock would disqualify the company
4. Requirements for a valid S corporation election`,
    hints: [
      '100 shareholder limit (family members count as one)',
      'Shareholders must be individuals, estates, or certain trusts',
      'One class of stock requirement analysis',
      'Election timing requirements',
    ],
    references: [
      'IRC Section 1361: S Corporation Defined',
      'IRC Section 1362: Election; Revocation; Termination',
    ],
  },
  {
    id: 'wc_reg_003',
    section: 'REG',
    type: 'written_communication',
    topic: 'Individual Tax - Deductions',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'REG-I',
    blueprintTopic: 'REG-I-B-1',
    scenario: `Sarah, a single taxpayer with AGI of $180,000, asks about the following potential deductions:

1. $12,000 mortgage interest on her primary residence (mortgage: $600,000)
2. $15,000 in state and local taxes (SALT)
3. $8,000 charitable contribution to her church
4. $5,000 unreimbursed employee business expenses
5. $3,000 gambling losses (she had $2,000 in gambling winnings)
6. $25,000 contribution to her traditional IRA
7. Medical expenses of $20,000

Sarah wants to know if she should itemize and what the impact of various limitations might be.`,
    prompt: `Write a professional memo to Sarah explaining:
1. Which items are deductible and any applicable limitations
2. The impact of the $10,000 SALT cap
3. Whether itemizing or taking the standard deduction is better
4. The IRA contribution limitations based on her income`,
    hints: [
      'Compare total itemized deductions to standard deduction',
      'SALT is limited to $10,000',
      'Medical expenses subject to 7.5% AGI floor',
      'IRA deduction phases out with income',
    ],
    references: [
      'IRC Section 164: Taxes',
      'IRC Section 170: Charitable Contributions',
      'IRC Section 219: Retirement Savings',
    ],
  },
  {
    id: 'wc_reg_004',
    section: 'REG',
    type: 'written_communication',
    topic: 'Business Law - Agency',
    difficulty: 'easy',
    estimatedTime: 20,
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    scenario: `Modern Real Estate Corp. employs sales agents who show properties to potential buyers. One agent, Marcus, exceeded his authority when he:

1. Signed a purchase agreement on behalf of a client without written authorization
2. Accepted a $5,000 earnest money deposit
3. Promised the buyer that the company would pay for repairs up to $10,000
4. Told the buyer the house had a new roof (it was 15 years old)

The company did not authorize any of these actions. The buyer, who relied on Marcus's statements, now wants to hold the company liable.`,
    prompt: `Write a professional memo analyzing:
1. The creation and types of agency relationships
2. Marcus's actual and apparent authority
3. The company's potential liability for each of Marcus's actions
4. Steps the company should take to protect itself in the future`,
    hints: [
      'Consider actual vs. apparent vs. implied authority',
      'Principals can be bound by agent\'s apparent authority',
      'Analyze whether third party reasonably relied',
      'Consider agency disclosure requirements',
    ],
    references: [
      'Restatement (Third) of Agency',
      'Common Law Agency Principles',
    ],
  },
];

// ==========================================================================
// BAR - Business Analysis and Reporting WC Tasks
// ==========================================================================
export const BAR_WC_TASKS: WCTask[] = [
  {
    id: 'wc_bar_001',
    section: 'BAR',
    type: 'written_communication',
    topic: 'Financial Statement Analysis',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'BAR-IV',
    blueprintTopic: 'BAR-IV-A-1',
    scenario: `You are analyzing RetailMax Inc., a department store chain, for a potential investment. Key financial data:

Year 1 vs Year 2:
- Revenue: $500M → $525M
- Gross Margin: 35% → 32%
- Operating Margin: 8% → 4%
- Current Ratio: 1.8 → 1.2
- Inventory Turnover: 6.0 → 4.5
- Days Sales Outstanding: 30 → 45
- Debt-to-Equity: 0.8 → 1.4
- Interest Coverage: 8.0 → 3.5

Industry averages: Gross margin 33%, Operating margin 6%, Current ratio 1.5, Inventory turnover 5.5.`,
    prompt: `Write a professional investment analysis memo that:
1. Interprets the trend in each key metric
2. Identifies the most concerning issues
3. Discusses potential causes for the deterioration
4. Provides a recommendation on investment suitability`,
    hints: [
      'Focus on trends, not just individual ratios',
      'Consider interrelationships between metrics',
      'Declining margins with increasing debt is a red flag',
      'Compare to industry averages for context',
    ],
    references: [
      'Financial Statement Analysis',
      'DuPont Analysis Framework',
    ],
  },
  {
    id: 'wc_bar_002',
    section: 'BAR',
    type: 'written_communication',
    topic: 'Cost Accounting - Activity-Based Costing',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'BAR-III',
    blueprintTopic: 'BAR-III-B-1',
    scenario: `Precision Parts Manufacturing produces two products: Standard widgets and Premium widgets. Current traditional costing allocates $3M overhead based on direct labor hours:

Standard: 80,000 DLH, 50,000 units
Premium: 20,000 DLH, 5,000 units

An ABC analysis identified these cost pools:
- Machine setups: $800,000 (Standard: 100 setups, Premium: 400 setups)
- Quality inspections: $600,000 (Standard: 200 inspections, Premium: 800 inspections)
- Material handling: $900,000 (Standard: 1,000 moves, Premium: 4,000 moves)
- Machine operations: $700,000 (Standard: 40,000 MH, Premium: 10,000 MH)

Management is surprised that Premium widgets appear unprofitable under ABC.`,
    prompt: `Write a professional memo to management explaining:
1. Why traditional costing and ABC yield different product costs
2. The calculation of overhead allocated to each product under both methods
3. Why Premium widgets consume disproportionate overhead
4. Recommendations for product pricing or process improvements`,
    hints: [
      'Calculate overhead per unit under both methods',
      'Identify cost drivers that cause distortion',
      'High-variety, low-volume products often subsidize',
      'Consider strategic implications of true costs',
    ],
    references: [
      'Activity-Based Costing Concepts',
      'Cost Management Systems',
    ],
  },
];

// ==========================================================================
// ISC - Information Systems and Controls WC Tasks
// ==========================================================================
export const ISC_WC_TASKS: WCTask[] = [
  {
    id: 'wc_isc_001',
    section: 'ISC',
    type: 'written_communication',
    topic: 'Cybersecurity Risk Assessment',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-B-1',
    scenario: `You are the IT auditor for HealthFirst Insurance, which processes protected health information (PHI) for 2 million members. A recent vulnerability assessment found:

1. The patient portal uses outdated TLS 1.0 encryption
2. 40% of employees have not completed annual security training
3. Database backups are encrypted but encryption keys are stored on the same server
4. No penetration testing has been performed in 3 years
5. Third-party vendor access is not reviewed or terminated when contracts end
6. Multi-factor authentication is not required for remote access to PHI systems

The board wants to understand the cybersecurity risks and compliance implications.`,
    prompt: `Write a professional memo to the Board of Directors addressing:
1. The cybersecurity risks associated with each finding
2. Relevant regulatory compliance implications (HIPAA, state laws)
3. Prioritized recommendations for remediation
4. Suggested metrics to monitor cybersecurity posture`,
    hints: [
      'Consider HIPAA Security Rule requirements',
      'Encryption key management is critical',
      'Third-party risk management is essential',
      'Use risk-based prioritization',
    ],
    references: [
      'HIPAA Security Rule',
      'NIST Cybersecurity Framework',
      'CIS Controls',
    ],
  },
  {
    id: 'wc_isc_002',
    section: 'ISC',
    type: 'written_communication',
    topic: 'SOC Report Evaluation',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-A-1',
    scenario: `Your company uses CloudPayroll Corp. for payroll processing. You received their SOC 1 Type 2 report with the following notable items:

1. Report period: January 1 - September 30 (3 months before your fiscal year-end)
2. Opinion: Qualified due to one control not operating effectively
   - Control failure: User access reviews were not performed for 3 of 12 months
3. Complementary User Entity Controls (CUECs):
   - Client must perform independent bank reconciliations
   - Client must review and approve payroll reports before processing
4. Subservice organizations: CloudPayroll uses a third-party data center (carved-out method)

Your CFO asks whether this report provides sufficient assurance.`,
    prompt: `Write a professional memo to the CFO explaining:
1. The purpose and limitations of a SOC 1 Type 2 report
2. The significance of the qualified opinion
3. How the gap in report coverage affects reliance
4. Steps needed to address the CUECs and subservice organization gap`,
    hints: [
      'Consider the bridge period between report and year-end',
      'CUECs must be implemented by your organization',
      'Carved-out subservice organizations need separate consideration',
      'Qualified opinions require assessment of compensating controls',
    ],
    references: [
      'SSAE 18: Attestation Standards',
      'SOC 1 Reports (AICPA)',
    ],
  },
];

// ==========================================================================
// TCP - Tax Compliance and Planning WC Tasks
// ==========================================================================
export const TCP_WC_TASKS: WCTask[] = [
  {
    id: 'wc_tcp_001',
    section: 'TCP',
    type: 'written_communication',
    topic: 'Entity Selection',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-A-1',
    scenario: `Three physicians are forming a new medical practice. Expected first-year results:
- Net income: $900,000
- Each physician will take $200,000 salary
- They want to retain earnings for equipment purchases
- One physician will leave in 3 years and wants flexibility to sell her interest
- They're concerned about malpractice liability

Options under consideration:
1. General Partnership
2. S Corporation  
3. C Corporation
4. Limited Liability Company (LLC) taxed as partnership`,
    prompt: `Write a professional memo advising the physicians on:
1. The tax implications of each entity type
2. Liability protection differences
3. The impact on the exiting physician's sale
4. Your recommended entity structure and why`,
    hints: [
      'Consider self-employment tax on active partners',
      'C corps face double taxation on distributions',
      'S corps have basis and loss limitation rules',
      'LLC offers flexibility with liability protection',
    ],
    references: [
      'IRC Section 199A: QBI Deduction',
      'Entity Selection Considerations',
    ],
  },
  {
    id: 'wc_tcp_002',
    section: 'TCP',
    type: 'written_communication',
    topic: 'Estate Tax Planning',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'TCP-IV',
    blueprintTopic: 'TCP-IV-A-1',
    scenario: `Margaret, age 72, has the following estate:
- Primary residence: $1.5M
- Investment portfolio: $8M
- Family business interest (FLP): $6M
- Life insurance (death benefit): $2M
- IRA: $2M
Total: $19.5M

Her husband passed away last year with a $12.92M unused exemption (portability elected). Current exemption: $12.92M. Estate tax rate: 40%.

Margaret wants to:
1. Leave the business to her son (active in business)
2. Treat her daughter equally (not interested in business)
3. Minimize estate taxes
4. Maintain income during her lifetime`,
    prompt: `Write a professional memo outlining:
1. Current estate tax exposure and available exemptions
2. Recommended planning strategies to reduce estate taxes
3. How to achieve equitable treatment of both children
4. Considerations for the family business succession`,
    hints: [
      'DSUE allows using deceased spouse\'s unused exemption',
      'GRATs can transfer growth tax-free',
      'Life insurance can equalize inheritances',
      'Valuation discounts may apply to FLP interests',
    ],
    references: [
      'IRC Section 2010: Unified Credit',
      'IRC Section 2036: Transfers with Retained Interest',
      'Estate Planning Techniques',
    ],
  },
];

// ==========================================================================
// BEC - Business Environment and Concepts WC Tasks (through June 2026)
// ==========================================================================
export const BEC_WC_TASKS: WCTask[] = [
  {
    id: 'wc_bec_001',
    section: 'BEC',
    type: 'written_communication',
    topic: 'Operations Management',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'BEC-V',
    blueprintTopic: 'BEC-V-A-1',
    scenario: `QuickDeliver Logistics operates a regional distribution network. Management is evaluating process improvements:

Current State:
- Average order fulfillment time: 72 hours
- Order accuracy rate: 94%
- Warehouse utilization: 65%
- Employee overtime: 15% of labor hours
- Customer complaints: 8 per 1,000 orders

Proposed Improvements:
1. Implement barcode scanning: Cost $200K, projected to improve accuracy to 99%
2. Install automated conveyor system: Cost $500K, reduce fulfillment time by 40%
3. Implement demand forecasting software: Cost $150K, improve utilization to 85%

Budget constraint: $600K total`,
    prompt: `Write a professional memo to management analyzing:
1. Key performance metrics and their interrelationships
2. Cost-benefit analysis of each improvement option
3. Recommended prioritization within budget constraint
4. Expected impact on overall operational efficiency`,
    hints: [
      'Consider both financial and non-financial benefits',
      'Accuracy improvements reduce returns and complaints',
      'Time reduction may reduce overtime costs',
      'Use quantitative analysis where possible',
    ],
    references: [
      'Operations Management Concepts',
      'Cost-Benefit Analysis',
    ],
  },
  {
    id: 'wc_bec_002',
    section: 'BEC',
    type: 'written_communication',
    topic: 'Corporate Governance - Ethics',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'BEC-I',
    blueprintTopic: 'BEC-I-A-2',
    scenario: `You are an internal auditor at GlobalTech Industries. During a routine review, you discovered:

1. The CEO has a personal investment in a vendor that received $2M in contracts this year without competitive bidding
2. A board member's son was hired as VP of Marketing at above-market compensation
3. The company donated $500K to a political organization favored by the Chairman
4. Executive bonuses were calculated using non-GAAP metrics that excluded $5M in restructuring costs

The Audit Committee Chair has asked for your assessment.`,
    prompt: `Write a professional memo to the Audit Committee addressing:
1. The governance and ethical concerns with each item
2. Potential violations of regulations or best practices
3. Required disclosures for related party transactions
4. Recommendations for policy improvements`,
    hints: [
      'Consider SEC disclosure requirements',
      'Conflict of interest policies',
      'Executive compensation disclosure rules',
      'Board oversight responsibilities',
    ],
    references: [
      'SOX Requirements',
      'SEC Disclosure Rules',
      'Corporate Governance Best Practices',
    ],
  },
];

// Export all WC tasks by section
export const ALL_SECTION_WC_TASKS: WCTask[] = [
  ...AUD_WC_TASKS,
  ...FAR_WC_TASKS,
  ...REG_WC_TASKS,
  ...BAR_WC_TASKS,
  ...ISC_WC_TASKS,
  ...TCP_WC_TASKS,
  ...BEC_WC_TASKS,
];

export default ALL_SECTION_WC_TASKS;
