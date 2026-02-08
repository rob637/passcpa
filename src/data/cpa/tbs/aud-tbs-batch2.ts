// AUD TBS Batch 2 - Exam Quality Simulations
import { TBS, TBS_TYPES } from '../../../types';

export const AUD_TBS_BATCH2: TBS[] = [
  {
    id: 'aud-tbs-b2-001',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Subsequent Events Evaluation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Subsequent Events',
    blueprintArea: 'AUD-III',
    scenario: `
You are reviewing subsequent events for Pinnacle Corp. (December 31, Year 1 year-end). The audit report date is February 28, Year 2.

Event 1: On January 15, Year 2, a fire destroyed a warehouse containing $2 million in inventory. Insurance coverage is $1.5 million.

Event 2: On February 10, Year 2, a major customer filed for bankruptcy. The customer had a $800,000 receivable at year-end. Evidence indicates the customer was having financial difficulties throughout Year 1.

Event 3: On March 5, Year 2, the company announced a 2-for-1 stock split.

Event 4: On February 20, Year 2, the company settled a lawsuit that was pending at year-end for $600,000. The company had accrued $400,000.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'How should Event 1 (warehouse fire) be treated?',
        options: ['Adjust the Year 1 financial statements', 'Disclose in notes only', 'No action required', 'Issue qualified opinion'],
        correctAnswer: 1,
        explanation: 'Type 2 subsequent event - conditions arose after balance sheet date. Disclose but do not adjust. The fire occurred in Year 2, not Year 1.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'How should Event 2 (customer bankruptcy) be treated?',
        options: ['Adjust the Year 1 financial statements', 'Disclose in notes only', 'No action required', 'Issue disclaimer'],
        correctAnswer: 0,
        explanation: 'Type 1 subsequent event - provides evidence of conditions at year-end. The receivable was impaired at December 31. Adjust the allowance for doubtful accounts.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Event 3 (stock split announced March 5) occurred after the report date. What is the auditor\'s responsibility?',
        options: ['No responsibility - occurred after report date', 'Dual-date the report', 'Revise the audit report', 'Withdraw from engagement'],
        correctAnswer: 0,
        explanation: 'The auditor has no responsibility for events after the audit report date unless the auditor becomes aware of facts that existed at the report date. Stock split after report date requires no action.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'How should Event 4 (lawsuit settlement) be treated?',
        options: ['Adjust the Year 1 financial statements', 'Disclose settlement amount only', 'No action required', 'Issue adverse opinion'],
        correctAnswer: 0,
        explanation: 'Type 1 subsequent event - settlement provides evidence of the obligation at year-end. Adjust the accrual from $400,000 to $600,000.'
      }
    ],
    hints: [
      'Type 1: Conditions existed at balance sheet date → ADJUST',
      'Type 2: Conditions arose after balance sheet date → DISCLOSE only',
      'After report date: No responsibility unless facts existed at report date'
    ]
  },
  {
    id: 'aud-tbs-b2-002',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Analytical Procedures - Reasonableness Testing',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Substantive Procedures',
    blueprintArea: 'AUD-III',
    scenario: `
You are performing analytical procedures on Apex Manufacturing's Year 1 payroll expense. 

Prior Year Data:
• Employees: 250
• Average annual salary: $65,000
• Total payroll expense: $16,250,000

Current Year Data:
• Employees: 275 (10% increase)
• 4% annual raise given to all employees
• Total payroll expense per client: $19,200,000

Industry Data:
• Average salary increase: 3-5%
• Employee growth rate for similar companies: 5-8%
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the expected current year average salary.',
        correctAnswer: 67600,
        tolerance: 100,
        explanation: 'Prior year $65,000 × 1.04 (4% raise) = $67,600'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the expected current year total payroll expense.',
        correctAnswer: 18590000,
        tolerance: 50000,
        explanation: '275 employees × $67,600 = $18,590,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the difference between recorded and expected payroll.',
        correctAnswer: 610000,
        tolerance: 50000,
        explanation: '$19,200,000 recorded - $18,590,000 expected = $610,000 difference'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What is the most appropriate auditor response to this difference?',
        options: ['Accept the balance as reasonable', 'Inquire of management and investigate', 'Issue a qualified opinion', 'Perform no additional work'],
        correctAnswer: 1,
        explanation: 'A $610,000 (3.3%) difference exceeds typical threshold for investigation. The auditor should inquire about bonuses, overtime, new hires at higher salaries, or other factors.'
      }
    ],
    hints: [
      'Develop expectation using prior year data and known changes',
      'Compare expectation to recorded amount',
      'Investigate significant differences beyond threshold'
    ]
  },
  {
    id: 'aud-tbs-b2-003',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Audit Sampling - Attribute Testing',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Audit Sampling',
    blueprintArea: 'AUD-III',
    scenario: `
You are testing the operating effectiveness of controls over purchase order approvals. 

Population: 5,000 purchase orders in Year 1
Control: All POs over $1,000 require manager approval

Sampling parameters:
• Expected deviation rate: 1%
• Tolerable deviation rate: 5%
• Risk of overreliance: 5%

Sample results (using AICPA audit sampling tables):
• Required sample size: 93
• Sample selected: 93 purchase orders
• Deviations found: 3 (missing approval signatures)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the sample deviation rate.',
        correctAnswer: 3.23,
        tolerance: 0.1,
        explanation: '3 deviations / 93 sample items = 3.23%'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Based on the sample results, can the auditor conclude the control is operating effectively?',
        options: ['Yes - deviation rate is below tolerable rate', 'No - deviation rate equals tolerable rate', 'No - cannot conclude without statistical evaluation', 'Yes - 3 deviations is immaterial'],
        correctAnswer: 0,
        explanation: 'The sample deviation rate (3.23%) is below the tolerable rate (5%). Using sampling tables, 3 deviations in a sample of 93 supports a conclusion that the control is operating effectively at the 5% risk level.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'If 5 deviations were found, what would be the appropriate conclusion?',
        options: ['Control is operating effectively', 'Control is not operating effectively', 'Expand sample size and retest', 'Issue adverse opinion on ICFR'],
        correctAnswer: 1,
        explanation: '5 deviations / 93 = 5.4% exceeds the 5% tolerable rate. The auditor cannot rely on the control and must modify the audit approach (more substantive testing).'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What is the primary risk associated with setting a high tolerable deviation rate?',
        options: ['Audit will be inefficient', 'May conclude control is effective when it is not', 'May conclude control is ineffective when it is', 'Sample size will be too large'],
        correctAnswer: 1,
        explanation: 'Higher tolerable deviation rate = smaller sample = higher risk of overreliance (concluding effective when actually not effective). This is beta risk or risk of assessing control risk too low.'
      }
    ],
    hints: [
      'Sample deviation rate = Deviations / Sample size',
      'Compare achieved upper deviation rate to tolerable rate',
      'Risk of overreliance affects ability to rely on controls'
    ]
  },
  {
    id: 'aud-tbs-b2-004',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Going Concern Evaluation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Going Concern',
    blueprintArea: 'AUD-IV',
    scenario: `
You are evaluating going concern for Metro Industries (December 31, Year 1 year-end).

Financial Indicators:
• Current ratio: 0.6
• Quick ratio: 0.3
• Net loss for 3 consecutive years
• Negative cash flow from operations: $(2.5 million)
• Working capital deficit: $4 million
• Debt covenant violation: Debt-to-equity exceeded maximum

Operating Indicators:
• Lost major customer (20% of revenue)
• Difficulty retaining key employees
• Key patent expires in 6 months

Management's Plans:
• Negotiate covenant waiver with bank (in progress)
• New customer contracts under negotiation
• Cost reduction plan to save $1.5 million
• Owner willing to contribute $500,000 capital
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Is there substantial doubt about Metro\'s ability to continue as a going concern?',
        options: ['Yes - multiple indicators present', 'No - management has plans', 'Cannot determine without more information', 'Only if loan is called'],
        correctAnswer: 0,
        explanation: 'Substantial doubt exists. Negative trends in liquidity, profitability, and operations combined with covenant violation and lost customer create substantial doubt. Management plans must be evaluated for their ability to mitigate.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'How should the auditor evaluate management\'s plans?',
        options: ['Accept management representations', 'Evaluate feasibility and likely effectiveness', 'Ignore plans - focus only on conditions', 'Require written guarantee'],
        correctAnswer: 1,
        explanation: 'The auditor must evaluate management\'s plans considering: (1) likelihood actions will be implemented, (2) expected effect on conditions and events. Plans must be probable and achievable within 12 months.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'If substantial doubt is NOT alleviated by management\'s plans, what disclosure is required?',
        options: ['No disclosure needed', 'Conditions only in management\'s notes', 'Conditions, management plans, and possible effects on financial statements', 'Auditor must not issue report'],
        correctAnswer: 2,
        explanation: 'If substantial doubt remains, management must disclose: principal conditions and events, possible effects, management\'s plans, and that entity may not continue as going concern.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What type of audit report is appropriate if proper disclosure is made?',
        options: ['Unmodified with emphasis of matter paragraph', 'Qualified opinion', 'Adverse opinion', 'Disclaimer of opinion'],
        correctAnswer: 0,
        explanation: 'When substantial doubt exists and management provides adequate disclosure, issue unmodified opinion with an emphasis of matter paragraph drawing attention to the going concern note.'
      }
    ],
    hints: [
      'Evaluate conditions/events, then management plans',
      'Plans must be probable and effective within 12 months',
      'Proper disclosure = emphasis of matter (not modification)'
    ]
  },
  {
    id: 'aud-tbs-b2-005',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Group Audit - Component Auditors',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Group Audits',
    blueprintArea: 'AUD-III',
    scenario: `
You are the group engagement partner for Global Holdings (consolidated financial statements).

Group structure:
• Parent: Global Holdings (audited by your firm)
• Subsidiary A: 80% owned, 45% of group revenue (audited by Firm X)
• Subsidiary B: 100% owned, 35% of group revenue (audited by Firm Y)
• Subsidiary C: 70% owned, 20% of group revenue (audited by your firm)

Issues identified:
• Firm X is in a jurisdiction with different auditing standards
• Firm Y has no prior experience with the client
• Firm Y issued a qualified opinion due to scope limitation
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What must the group engagement partner evaluate regarding Firm X?',
        options: ['Accept Firm X work automatically', 'Evaluate competence, ethical requirements, and whether differences in standards affect group audit', 'Require Firm X to re-audit under US standards', 'Withdraw from engagement'],
        correctAnswer: 1,
        explanation: 'The group engagement partner must evaluate whether the component auditor understands and will comply with ethical requirements, evaluate competence, and determine if differences in auditing standards materially affect the group audit.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'How should the group auditor address Firm Y\'s qualified opinion?',
        options: ['Ignore since it applies to component only', 'Evaluate impact on group financial statements', 'Automatically issue qualified group opinion', 'Remove Firm Y from engagement'],
        correctAnswer: 1,
        explanation: 'The group auditor must evaluate whether the scope limitation affects the group financial statements. Given Subsidiary B is 35% of group revenue, this is likely material and may require modification of the group audit opinion.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Can the group engagement partner reference the component auditor\'s work in the group audit report?',
        options: ['Yes, always permitted', 'Yes, if assuming responsibility', 'No, not permitted under US GAAS', 'Yes, but only for disclaimers'],
        correctAnswer: 2,
        explanation: 'Under US GAAS, the group engagement partner cannot make reference to component auditors as a basis for dividing responsibility. The group engagement partner takes sole responsibility. (Note: International standards differ.)'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What is the minimum involvement required for the group engagement partner?',
        options: ['Sign the consolidated report only', 'Perform audit procedures on parent and consolidation', 'Audit all significant components personally', 'Review component auditors\' reports only'],
        correctAnswer: 1,
        explanation: 'The group engagement partner must be involved in the work on financial information of components that are significant due to individual financial significance or significant risk, and must perform consolidation procedures.'
      }
    ],
    hints: [
      'Group engagement partner takes responsibility for entire audit',
      'Cannot divide responsibility under US GAAS',
      'Evaluate impact of component issues on group F/S'
    ]
  },
  {
    id: 'aud-tbs-b2-006',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Quality Management and Engagement Review',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Quality Control',
    blueprintArea: 'AUD-I',
    scenario: `
Review the following scenarios related to engagement quality control:

Scenario A: Senior accountant notices partner's close friendship with client CFO. They frequently golf together and partner's son works at the client.

Scenario B: Engagement partner was rotated after 5 years per firm policy. The new partner discovers issues with prior year's revenue testing.

Scenario C: Manager disagrees with partner's conclusion on a significant accounting estimate. Partner overrules manager without documentation.

Scenario D: EQR partner is assigned 2 days before report release date due to scheduling conflicts.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What threat is present in Scenario A?',
        options: ['Self-review threat', 'Familiarity threat', 'Advocacy threat', 'Self-interest threat'],
        correctAnswer: 1,
        explanation: 'Familiarity threat exists due to close personal relationship between partner and client management. This may impair objectivity and skepticism. The employment of partner\'s son adds complexity.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'In Scenario B, what is the new partner\'s responsibility regarding prior year issues?',
        options: ['Ignore - not on prior engagement', 'Evaluate impact on current year opening balances and comparatives', 'Reissue prior year audit report', 'Report predecessor to regulatory body'],
        correctAnswer: 1,
        explanation: 'The new partner must evaluate whether prior year issues affect current year opening balances, comparative financial statements, or indicate control weaknesses that persist.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What is wrong with the situation in Scenario C?',
        options: ['Manager cannot disagree with partner', 'Disagreements must be documented and resolved per firm policy', 'Partner is always correct on estimates', 'Nothing - partner has final authority'],
        correctAnswer: 1,
        explanation: 'Differences of opinion must be documented and resolved according to firm policy. Simply overruling without documentation violates quality control standards and undermines the consultation process.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What is the concern with Scenario D (late EQR assignment)?',
        options: ['EQR is optional', 'Insufficient time for meaningful review', 'EQR can be done after report release', 'No concern - timing is discretionary'],
        correctAnswer: 1,
        explanation: 'Engagement Quality Review must be completed BEFORE report release. Two days is insufficient for meaningful review of significant judgments. This undermines the quality review purpose.'
      }
    ],
    hints: [
      'Familiarity = close relationships that may impair objectivity',
      'Quality control requires documentation of disagreements',
      'EQR must be timely and thorough before report release'
    ]
  },
  {
    id: 'aud-tbs-b2-007',
    section: 'AUD',
    type: TBS_TYPES.CALCULATION,
    title: 'Materiality Determination',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Audit Planning',
    blueprintArea: 'AUD-II',
    scenario: `
You are determining materiality for Precision Manufacturing:

Financial Data (Year 1):
• Total assets: $50,000,000
• Total revenues: $75,000,000
• Pretax income from continuing operations: $4,500,000
• Net income: $3,500,000
• Total equity: $25,000,000

Company is a manufacturer with stable earnings. This is the third year of the audit engagement.

Common materiality benchmarks:
• 5% of pretax income
• 0.5% of revenue
• 0.5% of total assets
• 1% of equity
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate materiality using 5% of pretax income.',
        correctAnswer: 225000,
        tolerance: 0,
        explanation: '$4,500,000 × 5% = $225,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate materiality using 0.5% of revenue.',
        correctAnswer: 375000,
        tolerance: 0,
        explanation: '$75,000,000 × 0.5% = $375,000'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Which benchmark is most appropriate for this stable, profit-oriented manufacturer?',
        options: ['Total assets', 'Revenue', 'Pretax income', 'Equity'],
        correctAnswer: 2,
        explanation: 'For a stable, profit-oriented company, pretax income from continuing operations is typically the most appropriate benchmark. Users are focused on profitability.'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate performance materiality at 75% of overall materiality (using pretax income benchmark).',
        correctAnswer: 168750,
        tolerance: 100,
        explanation: '$225,000 × 75% = $168,750'
      }
    ],
    hints: [
      'Profitability benchmarks for profit-oriented entities',
      'Revenue or assets for volatile earnings',
      'Performance materiality < planning materiality'
    ]
  },
  {
    id: 'aud-tbs-b2-008',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Fraud Risk Assessment',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Fraud',
    blueprintArea: 'AUD-II',
    scenario: `
Evaluate fraud risk factors for TechGrowth Inc.:

Incentive/Pressure:
• CEO compensation tied 80% to stock price
• Company needs to meet debt covenants
• Competitor recently went public at high valuation

Opportunity:
• Significant transactions with related parties
• Complex revenue recognition (software + services)
• Limited IT controls over journal entries
• CFO has authority to post adjusting entries without approval

Rationalization:
• Management frequently overrides controls
• Aggressive accounting positions taken historically
• "Everyone does it" culture among sales team
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which revenue recognition scheme poses the highest fraud risk?',
        options: ['Channel stuffing', 'Bill and hold', 'Premature recognition of multi-element arrangements', 'Fictitious sales'],
        correctAnswer: 2,
        explanation: 'Given software + services bundling, improper allocation of transaction price to recognize revenue early on software (delivered) vs. services (over time) is the most relevant scheme. This exploits ASC 606 complexity.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The CFO\'s ability to post unsupervised entries represents which type of fraud risk?',
        options: ['Incentive', 'Pressure', 'Opportunity', 'Rationalization'],
        correctAnswer: 2,
        explanation: 'Opportunity - the ability to commit fraud without detection. Lack of controls over journal entries allows manipulation of financial results.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What is the auditor\'s required response to identified fraud risks?',
        options: ['Report immediately to SEC', 'Design specific audit procedures to address risks', 'Withdraw from engagement', 'Limit audit scope'],
        correctAnswer: 1,
        explanation: 'The auditor must design and perform audit procedures specifically responsive to the identified fraud risks. This includes procedures that are less predictable and address management override.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Revenue recognition contains a presumption of fraud risk. Can this be rebutted?',
        options: ['No - it must always be treated as significant risk', 'Yes - if strong controls exist', 'Yes - but auditor must document the basis for rebuttal', 'No presumption exists'],
        correctAnswer: 2,
        explanation: 'The presumption can be rebutted in rare circumstances, but the auditor must document the basis. In this case, given the risk factors present and complex revenue, rebuttal would be inappropriate.'
      }
    ],
    hints: [
      'Fraud triangle: Incentive/Pressure + Opportunity + Rationalization',
      'Revenue recognition is a presumed fraud risk',
      'Management override is always a significant risk'
    ]
  },
  {
    id: 'aud-tbs-b2-009',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Written Representations Evaluation',
    difficulty: 'medium',
    timeEstimate: 14,
    topic: 'Representations',
    blueprintArea: 'AUD-III',
    scenario: `
Review the draft management representation letter for quality issues:

Draft representation letter excerpts:
1. "The financial statements are fairly presented in accordance with GAAP as we understand it."

2. "We have disclosed all related party transactions that we are aware of."

3. "All minutes of board meetings through December 31 have been provided."

4. "There are no material litigation matters except as disclosed."

5. "Our internal controls are adequate."

The letter is dated February 10, Year 2 (audit report date is February 28, Year 2).
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What is wrong with representation #1 (GAAP "as we understand it")?',
        options: ['Nothing - this is acceptable language', 'Too broad - should specify accounting standards', 'Adds inappropriate qualifier - should be unconditional', 'Should reference auditing standards'],
        correctAnswer: 2,
        explanation: 'The phrase "as we understand it" is a qualifier that undermines the representation. Management representations should be unconditional. They are either GAAP or not.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What is the problem with the letter date?',
        options: ['Cannot be before report date', 'Should be dated as of balance sheet date', 'Must be dated same as or after report date', 'Date is acceptable'],
        correctAnswer: 2,
        explanation: 'The representation letter must be dated the same date as or after the audit report date. A letter dated February 10 for a February 28 report is unacceptable - it should be dated February 28.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Representation #3 (minutes through December 31) is incomplete. Why?',
        options: ['Should include all historical minutes', 'Should cover period through representation letter date', 'Should only cover audit period', 'This representation is not required'],
        correctAnswer: 1,
        explanation: 'Minutes should be provided through the representation letter date (report date), not just year-end. Board meetings in January and February are relevant to subsequent events.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'If management refuses to provide a required representation, what should the auditor do?',
        options: ['Issue unmodified opinion anyway', 'Issue qualified or disclaimer of opinion', 'Accept verbal representation instead', 'Complete audit without representation'],
        correctAnswer: 1,
        explanation: 'Refusal to provide a required written representation is a scope limitation. The auditor should issue qualified opinion or disclaimer, depending on materiality and pervasiveness.'
      }
    ],
    hints: [
      'Representations must be unconditional (no qualifiers)',
      'Date must be same as or after audit report date',
      'Coverage extends through the representation date'
    ]
  },
  {
    id: 'aud-tbs-b2-010',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Communications with Governance',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Communications',
    blueprintArea: 'AUD-IV',
    scenario: `
Identify which items must be communicated to those charged with governance (audit committee):

Item 1: Planned audit scope and timing
Item 2: Significant findings from the audit
Item 3: Uncorrected misstatements accumulated during audit ($15,000 total, materiality $200,000)
Item 4: Significant deficiencies in internal control
Item 5: Management consulting on accounting principles
Item 6: All control deficiencies noted
Item 7: Difficulties encountered in performing audit
Item 8: Disagreements with management, resolved
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which items are REQUIRED to be communicated in writing?',
        options: ['Items 1, 2, 3, 4', 'Items 3, 4, 8 only', 'Items 3 and 4 only', 'All items'],
        correctAnswer: 2,
        explanation: 'Required to be in writing: significant deficiencies and material weaknesses (Item 4), and uncorrected misstatements (Item 3). Other items may be oral or written.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Is Item 6 (all control deficiencies) required to be communicated?',
        options: ['Yes - all deficiencies must be communicated to governance', 'No - only significant deficiencies and material weaknesses', 'Yes - but only orally', 'Only if management requests'],
        correctAnswer: 1,
        explanation: 'Only significant deficiencies and material weaknesses must be communicated to governance. Other deficiencies may be communicated to management but are not required for governance.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Must Item 8 (resolved disagreements) be communicated?',
        options: ['No - only unresolved disagreements', 'Yes - all disagreements must be communicated', 'Only if material to financial statements', 'At auditor\'s discretion'],
        correctAnswer: 1,
        explanation: 'The auditor should communicate significant disagreements with management, whether or not they were satisfactorily resolved. This helps governance understand significant issues.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'When must communication to governance be made?',
        options: ['Within 60 days after report date', 'Before the audit begins only', 'On a timely basis during and at conclusion of audit', 'Only at conclusion of audit'],
        correctAnswer: 2,
        explanation: 'Communications should be made on a timely basis - some matters (like planned scope) early in engagement, others (like findings) at conclusion. The goal is to allow governance to act on information.'
      }
    ],
    hints: [
      'Written communication required: SD/MW and uncorrected misstatements',
      'Governance communication covers both responsibilities and findings',
      'Timeliness enables governance to take appropriate action'
    ]
  }
];

export default AUD_TBS_BATCH2;
