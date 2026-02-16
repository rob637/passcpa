// AUD TBS Batch 3 - Exam Quality Simulations
import { TBS, TBS_TYPES } from '../../../types';

export const AUD_TBS_BATCH3: TBS[] = [
  {
    id: 'aud-tbs-b3-001',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Internal Control Deficiency Classification',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Internal Control',
    blueprintArea: 'AUD-IV',
    scenario: `
You are evaluating internal control deficiencies identified during the audit of Magellan Industries:

Deficiency 1: The accounts payable clerk can both create vendors and process payments without supervisory approval. No compensating controls exist.

Deficiency 2: The company's IT department has only one programmer who has access to both development and production environments. Changes are not reviewed before implementation.

Deficiency 3: Physical inventory counts are performed annually, but count sheets are not pre-numbered, and there are no independent recounts performed.

Deficiency 4: Cash receipts are deposited weekly instead of daily. Average daily receipts are $15,000.

Deficiency 5: The CFO manually overrides posting dates on journal entries to shift revenue between periods. This was discovered but not corrected.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'How should Deficiency 1 (AP segregation) be classified?',
        options: ['Control deficiency', 'Significant deficiency', 'Material weakness', 'Not a deficiency'],
        correctAnswer: 2,
        explanation: 'Lack of segregation in AP without compensating controls allows unauthorized vendors and payments - high likelihood of material misstatement. Material weakness.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'How should Deficiency 2 (IT programmer access) be classified?',
        options: ['Control deficiency', 'Significant deficiency', 'Material weakness', 'Not a deficiency'],
        correctAnswer: 1,
        explanation: 'Single IT person with full access is a significant deficiency. While concerning, compensating application controls (logs) might reduce risk below material weakness level.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'How should Deficiency 5 (CFO override) be classified?',
        options: ['Control deficiency', 'Significant deficiency', 'Material weakness', 'Fraud indicator only'],
        correctAnswer: 2,
        explanation: 'Management override to manipulate revenue timing is a material weakness and potential fraud. Involves senior management circumventing controls.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'To whom must material weaknesses be communicated?',
        options: ['Management only', 'Board of directors only', 'Management and those charged with governance', 'SEC only'],
        correctAnswer: 2,
        explanation: 'Material weaknesses must be communicated in writing to management and those charged with governance (audit committee/board).'
      }
    ],
    hints: [
      'Material weakness: Reasonable possibility of material misstatement not being prevented/detected',
      'Significant deficiency: Less severe than material weakness but merits attention',
      'Management override is a fraud risk indicator'
    ]
  },
  {
    id: 'aud-tbs-b3-002',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Audit Report Modifications',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Audit Reports',
    blueprintArea: 'AUD-VI',
    scenario: `
You are the engagement partner reviewing the following situations for year-end audits:

Company A: The client refuses to allow confirmation of a material receivable from a related party. Alternative procedures were inconclusive. The receivable is 15% of total assets.

Company B: The company changed its depreciation method from accelerated to straight-line. The change is properly disclosed, and you agree it is preferable. Cumulative effect is material.

Company C: There is substantial doubt about the company's ability to continue as a going concern for 12 months. Management's plans are adequately disclosed in the notes.

Company D: You discovered that the prior year financial statements, audited by another firm, contained a material misstatement that affects current year comparatives. Management refuses to correct.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What opinion should be issued for Company A?',
        options: ['Unmodified', 'Qualified', 'Adverse', 'Disclaimer'],
        correctAnswer: 1,
        explanation: 'Scope limitation that is material but not pervasive requires qualified opinion. 15% is material but auditor could opine on remaining 85%.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What is required for Company B\'s report?',
        options: ['Qualified opinion', 'Unmodified with emphasis-of-matter paragraph', 'Adverse opinion', 'Add Other Matter paragraph'],
        correctAnswer: 1,
        explanation: 'A proper accounting change requires an unmodified opinion with emphasis-of-matter paragraph drawing attention to the change in accounting principle.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What modification is needed for Company C?',
        options: ['Qualified opinion', 'Adverse opinion', 'Disclaimer of opinion', 'Unmodified with emphasis-of-matter paragraph'],
        correctAnswer: 3,
        explanation: 'Going concern with adequate disclosure: Unmodified opinion with required emphasis-of-matter paragraph with heading "Substantial Doubt About Going Concern."'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What should the auditor do for Company D?',
        options: ['Issue unmodified opinion on current year only', 'Qualify opinion on current year', 'Include Other Matter paragraph describing the issue', 'Withdraw from the engagement'],
        correctAnswer: 2,
        explanation: 'When prior period financials are misstated and not corrected, add Other Matter paragraph. If material to current year, may also affect current opinion.'
      }
    ],
    hints: [
      'Scope limitation: Qualified or Disclaimer depending on materiality/pervasiveness',
      'Going concern: Emphasis-of-matter, not qualified (if adequately disclosed)',
      'Accounting change: Emphasis-of-matter for proper changes'
    ]
  },
  {
    id: 'aud-tbs-b3-003',
    section: 'AUD',
    type: TBS_TYPES.CALCULATION,
    title: 'Sampling - Variables Sampling (Mean-per-Unit)',
    difficulty: 'hard',
    timeEstimate: 22,
    topic: 'Audit Sampling',
    blueprintArea: 'AUD-III',
    scenario: `
You are auditing accounts receivable using mean-per-unit estimation.

Population data:
• Number of accounts: 2,000
• Recorded balance: $4,500,000

Sample results:
• Sample size: 100 accounts
• Sample mean (audited value): $2,180
• Sample standard deviation: $450

Confidence level: 95% (Z = 1.96)
Tolerable misstatement: $200,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate the estimated population value.',
        correctAnswer: 4360000,
        tolerance: 0,
        explanation: 'Population estimate = Sample mean × Population size = $2,180 × 2,000 = $4,360,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the standard error of the mean.',
        correctAnswer: 45,
        tolerance: 1,
        explanation: 'Standard error = Standard deviation / √Sample size = $450 / √100 = $45'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the precision (allowance for sampling risk) at 95% confidence.',
        correctAnswer: 176400,
        tolerance: 1000,
        explanation: 'Precision = Z × Standard error × Population size = 1.96 × $45 × 2,000 = $176,400'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'Calculate the projected misstatement.',
        correctAnswer: 140000,
        tolerance: 0,
        explanation: 'Projected misstatement = Recorded balance - Estimated value = $4,500,000 - $4,360,000 = $140,000'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Based on the results, can the auditor conclude the balance is materially correct?',
        options: ['Yes, projected misstatement is less than tolerable', 'No, need larger sample', 'Yes, precision is less than tolerable', 'Cannot determine'],
        correctAnswer: 0,
        explanation: 'Projected misstatement ($140,000) + Upper precision ($176,400) could exceed tolerable ($200,000). However, projected misstatement alone is less than tolerable. More analysis needed.'
      }
    ],
    hints: [
      'Point estimate = Sample mean × Population',
      'Precision = Z × Standard error × N',
      'Compare projected misstatement + precision to tolerable'
    ]
  },
  {
    id: 'aud-tbs-b3-004',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Risk Assessment - Fraud Risk Factors',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Risk Assessment',
    blueprintArea: 'AUD-II',
    scenario: `
During planning for NewTech Corp., you identify the following conditions:

1. Management compensation is heavily tied to aggressive revenue targets (80% of CEO bonus).

2. Complex revenue arrangements involving multiple performance obligations and significant estimates.

3. High employee turnover in the accounting department (3 controllers in 2 years).

4. The company is near debt covenant violation with only 5% cushion.

5. CFO frequently travels internationally for "business development" but expenses are not detailed.

6. Prior audit had no adjustments - clean history.

7. Industry is highly competitive with declining margins.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which item represents an "incentive/pressure" fraud risk factor?',
        options: ['Items 1 and 4', 'Items 2 and 3', 'Items 5 and 6', 'Items 3 and 7'],
        correctAnswer: 0,
        explanation: 'Incentive/Pressure: High bonus tied to targets (1) and debt covenant pressure (4) create motivation for fraud.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Which item represents an "opportunity" fraud risk factor?',
        options: ['Item 1 only', 'Items 2 and 3', 'Items 4 and 7', 'Item 6 only'],
        correctAnswer: 1,
        explanation: 'Opportunity: Complex accounting (2) allows manipulation. High turnover (3) weakens controls and institutional knowledge.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Revenue recognition should be presumed a fraud risk. Which procedures address this?',
        options: ['Confirm all receivables', 'Test journal entries and estimates', 'Review subsequent cash receipts', 'All of the above'],
        correctAnswer: 3,
        explanation: 'AU-C 240 requires presuming revenue recognition fraud risk. All listed procedures address different aspects of this risk.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What is the auditor\'s required response to identified fraud risk factors?',
        options: ['Withdraw from engagement', 'Design specific procedures to address the risks', 'Issue qualified opinion', 'Report to SEC immediately'],
        correctAnswer: 1,
        explanation: 'Auditor must design audit procedures responsive to identified fraud risk factors. This includes varying nature, timing, extent of procedures.'
      }
    ],
    hints: [
      'Fraud triangle: Incentive/Pressure, Opportunity, Rationalization',
      'Revenue recognition is a presumed fraud risk',
      'Design procedures responsive to specific fraud risks'
    ]
  },
  {
    id: 'aud-tbs-b3-005',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Substantive Procedures - Revenue',
    difficulty: 'medium',
    timeEstimate: 18,
    topic: 'Substantive Procedures',
    blueprintArea: 'AUD-III',
    scenario: `
You are designing substantive procedures for revenue recognition at TechServices Inc., a software company with:
- License sales: Upfront fee for perpetual license
- SaaS subscriptions: Monthly recurring charges
- Implementation services: Fixed-fee projects, average 3 months
- Maintenance contracts: 12-month terms

Key revenue recognition risks identified:
• Cut-off timing for year-end implementations
• Proper allocation of bundled arrangements
• Existence of side agreements that modify contract terms
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which procedure best addresses cut-off risk for implementation services?',
        options: ['Confirm revenue with all customers', 'Trace recorded revenue to signed contracts', 'Review project completion documentation around year-end', 'Recalculate revenue using percentage of completion'],
        correctAnswer: 2,
        explanation: 'Cut-off requires examining transactions near year-end. Review completion documentation (sign-offs, deliverables) to verify revenue recognized in correct period.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Which procedure best addresses bundled arrangement allocation?',
        options: ['Confirm total contract price with customers', 'Test standalone selling price determination and allocation calculations', 'Verify cash collections', 'Review credit memos issued after year-end'],
        correctAnswer: 1,
        explanation: 'Testing SSP determination and allocation calculations directly addresses whether bundled arrangements are properly allocated per ASC 606.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Which procedure best addresses side agreement risk?',
        options: ['Analytical procedures on revenue trends', 'Written confirmations requesting disclosure of any side agreements', 'Test deferred revenue balance', 'Review customer complaint files'],
        correctAnswer: 1,
        explanation: 'Direct confirmation asking customers about side letters, verbal agreements, or modifications helps detect unrecorded terms that affect revenue.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'For SaaS revenue, which assertion is most at risk?',
        options: ['Existence', 'Completeness', 'Accuracy', 'Cut-off'],
        correctAnswer: 3,
        explanation: 'SaaS revenue recognized over time creates cut-off risk - ensuring proper proration between periods. Accuracy in daily/monthly rev rec calculations.'
      }
    ],
    hints: [
      'Match procedures to specific assertions at risk',
      'Cut-off: Focus on transactions around year-end',
      'Bundled arrangements: Test allocation methodology'
    ]
  },
  {
    id: 'aud-tbs-b3-006',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Related Party Transactions',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Related Parties',
    blueprintArea: 'AUD-III',
    scenario: `
During the audit of Mercury Corp., you identify the following related party transactions:

1. Mercury leases its headquarters from a company owned by the CEO's brother. Annual rent: $500,000 (market rate estimated at $400,000).

2. Mercury purchased inventory from CEO's wife's company for $2,000,000. Terms: Net 60 (versus Net 30 for other vendors).

3. Mercury provides accounting services to a subsidiary at no charge. Estimated value: $150,000.

4. Mercury sold equipment to the CFO's investment partnership for $800,000 (book value: $600,000, fair value unknown).

5. A loan guarantee from the CEO personally backs the company's line of credit.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What is the primary audit concern with Transaction 1 (lease above market)?',
        options: ['Classification', 'Related party disclosure', 'Misappropriation of assets', 'Proper authorization'],
        correctAnswer: 2,
        explanation: 'Paying $100,000 above market rent to related party represents transfer of company assets to insider - potential misappropriation/self-dealing.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'For Transaction 4 (equipment sale), what procedure should the auditor perform?',
        options: ['Accept book value as reasonable', 'Obtain independent appraisal of fair value', 'Confirm with the partnership', 'Accept management representation'],
        correctAnswer: 1,
        explanation: 'Sale to related party at amount different from book value requires evidence of fair value. Independent appraisal provides objective evidence.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What disclosure is required for these related party transactions?',
        options: ['Disclose transaction amounts only', 'Disclose nature, amounts, terms, and balances', 'No disclosure if immaterial', 'Disclose only if unusual'],
        correctAnswer: 1,
        explanation: 'GAAP requires disclosure of nature of relationship, description of transactions, dollar amounts, and amounts due to/from related parties.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The loan guarantee (Transaction 5) should be evaluated for:',
        options: ['Only disclosure', 'Possible contingent liability', 'Off-balance-sheet arrangement', 'Both disclosure and GAAP compliance'],
        correctAnswer: 3,
        explanation: 'CEO guarantee is a related party transaction requiring disclosure. Also evaluate if it creates implicit variable interest or affects contingency accounting.'
      }
    ],
    hints: [
      'Related parties cannot be assumed to transact at arm\'s length',
      'Above-market terms may indicate self-dealing',
      'Comprehensive disclosure is required regardless of materiality for significant transactions'
    ]
  },
  {
    id: 'aud-tbs-b3-007',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Audit Evidence Quality',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Audit Evidence',
    blueprintArea: 'AUD-III',
    scenario: `
Rank the following types of evidence from most reliable to least reliable for testing existence of inventory:

A. Physical observation by auditor
B. Written confirmation from third-party warehouse
C. Client's perpetual inventory records
D. Verbal confirmation from warehouse manager
E. Invoice from supplier
F. Purchase order from client to supplier
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which is the MOST reliable evidence for inventory existence?',
        options: ['A - Physical observation', 'B - Third-party confirmation', 'C - Perpetual records', 'E - Supplier invoice'],
        correctAnswer: 0,
        explanation: 'Physical observation by auditor is direct evidence and most reliable for existence - auditor personally verifies item exists.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Rank B (third-party confirmation) vs C (client records):',
        options: ['B is more reliable', 'C is more reliable', 'Equally reliable', 'Neither is reliable'],
        correctAnswer: 0,
        explanation: 'External evidence (third-party confirmation) is more reliable than internal evidence (client records) due to independence.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Why is D (verbal confirmation) less reliable than B (written)?',
        options: ['Verbal is external', 'Written provides documentary evidence', 'No difference', 'Verbal is more direct'],
        correctAnswer: 1,
        explanation: 'Written evidence is more reliable because it creates documentary trail that can be reviewed and provides better support for audit conclusions.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Evidence E (supplier invoice) primarily supports which assertion?',
        options: ['Existence', 'Rights and obligations', 'Valuation', 'Both existence and valuation'],
        correctAnswer: 3,
        explanation: 'Supplier invoice shows goods were purchased (supports existence) and provides purchase price (supports valuation/cost).'
      }
    ],
    hints: [
      'Direct > Indirect evidence',
      'External > Internal evidence',
      'Written > Oral evidence',
      'Original > Copy'
    ]
  },
  {
    id: 'aud-tbs-b3-008',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Management Representations',
    difficulty: 'medium',
    timeEstimate: 14,
    topic: 'Management Representations',
    blueprintArea: 'AUD-V',
    scenario: `
You are finalizing the audit of Velocity Corp. When reviewing the management representation letter:

Issue 1: The CEO refuses to sign the representation letter, stating "My signature isn't necessary - you have our financial statements."

Issue 2: Management wants to add language limiting their representations to "their best knowledge" rather than explicit statements.

Issue 3: The CFO orally confirms all representations but has not yet returned the signed letter due to being out of office.

Issue 4: Management wants to exclude a representation about legal matters, stating their legal counsel already provided a separate letter.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'How should the auditor respond to Issue 1 (refusal to sign)?',
        options: ['Accept oral confirmation', 'Issue qualified opinion', 'Disclaim opinion and withdraw', 'Accept financial statement filing as implicit confirmation'],
        correctAnswer: 2,
        explanation: 'Refusal to provide required written representations is a scope limitation. The auditor should disclaim and consider withdrawal.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Is the "best knowledge" limitation (Issue 2) acceptable?',
        options: ['Yes, for all representations', 'Yes, only for certain representations', 'No, never acceptable', 'Only if documented'],
        correctAnswer: 1,
        explanation: 'Some representations can be limited to management knowledge (e.g., fraud affecting F/S). Others must be explicit (e.g., F/S fairly presented, ICFR effectiveness).'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Regarding Issue 3, when must the representation letter be signed?',
        options: ['Before year-end fieldwork', 'Before issuing audit report', 'Within 30 days of report date', 'Before filing financial statements'],
        correctAnswer: 1,
        explanation: 'The representation letter must be dated as of (and signed before) the audit report date. Auditor cannot issue report without signed letter.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Can management exclude the legal representation (Issue 4)?',
        options: ['Yes, if legal counsel letter is obtained', 'No, all required representations must be included', 'Yes, for immaterial matters', 'Only with audit committee approval'],
        correctAnswer: 1,
        explanation: 'Required representations cannot be replaced by other letters. Even with legal counsel letter, management must still represent related matters.'
      }
    ],
    hints: [
      'Representation letter is required audit evidence',
      'Must be signed and dated as of report date',
      'Refusal = Scope limitation → Disclaimer'
    ]
  },
  {
    id: 'aud-tbs-b3-009',
    section: 'AUD',
    type: TBS_TYPES.CALCULATION,
    title: 'Materiality - Planning and Performance',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Audit Planning',
    blueprintArea: 'AUD-II',
    scenario: `
You are planning the audit of Consolidated Industries. Financial data:

• Total assets: $85,000,000
• Total revenue: $120,000,000
• Net income before taxes: $8,500,000
• Total equity: $35,000,000
• Publicly traded issuer

Firm guidance:
• Materiality: 5% of income before taxes for profit companies
• Performance materiality: 60-80% of overall materiality
• Clearly trivial threshold: 3-5% of materiality
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate planning materiality using 5% of income before taxes.',
        correctAnswer: 425000,
        tolerance: 0,
        explanation: '5% × $8,500,000 = $425,000'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate performance materiality at 70% of planning materiality.',
        correctAnswer: 297500,
        tolerance: 0,
        explanation: '70% × $425,000 = $297,500'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate the clearly trivial threshold at 4% of materiality.',
        correctAnswer: 17000,
        tolerance: 0,
        explanation: '4% × $425,000 = $17,000'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Why is performance materiality set lower than overall materiality?',
        options: ['Required by GAAS', 'To reduce detection risk to acceptable level', 'To account for undetected misstatements', 'All of the above'],
        correctAnswer: 2,
        explanation: 'Performance materiality is set lower to account for possible undetected misstatements and aggregation of immaterial misstatements that could exceed overall materiality.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Misstatements below clearly trivial threshold:',
        options: ['Must be accumulated', 'Need not be accumulated', 'Must be communicated to management', 'Require disclosure'],
        correctAnswer: 1,
        explanation: 'Misstatements below the clearly trivial threshold need not be accumulated on the summary of audit differences.'
      }
    ],
    hints: [
      'Common bases: 5% pretax income, 0.5-1% revenue, 1% assets',
      'Performance materiality reduces risk of undetected aggregate misstatements',
      'Clearly trivial = clearly inconsequential'
    ]
  },
  {
    id: 'aud-tbs-b3-010',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Using the Work of a Specialist',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Using Specialists',
    blueprintArea: 'AUD-III',
    scenario: `
For the audit of Premier Real Estate Holdings, you engage specialists for:

Engagement A: External real estate appraiser to value investment properties ($45 million, 30% of assets).

Engagement B: Internal IT specialist (employee of audit firm) to test general IT controls.

Engagement C: Actuarial firm to evaluate pension liability assumptions.

Engagement D: Client's internal valuation team prepared fair value estimates reviewed by auditor.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'For external appraiser (Engagement A), the auditor must evaluate:',
        options: ['Only the valuation conclusion', 'Competence, capabilities, and objectivity', 'Nothing - can rely on licensed professional', 'Only if opinion is qualified'],
        correctAnswer: 1,
        explanation: 'AU-C 620 requires evaluating specialist\'s competence (knowledge/skill), capabilities (ability to perform), and objectivity (independence from client).'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The IT specialist (Engagement B) is considered:',
        options: ['Auditor\'s external specialist', 'Auditor\'s internal specialist', 'Management\'s specialist', 'Independent expert'],
        correctAnswer: 1,
        explanation: 'Firm employees are auditor\'s internal specialists. Their work is performed as audit procedures and subject to supervision.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Can the auditor reference the appraiser in an unmodified opinion?',
        options: ['Yes, to share responsibility', 'No, reference only in modified opinion', 'Yes, if appraiser consents', 'No, auditor takes sole responsibility'],
        correctAnswer: 3,
        explanation: 'In an unmodified report, auditor does not reference specialist - doing so might be misunderstood as qualification or division of responsibility.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'For client\'s internal valuation team (Engagement D), this is:',
        options: ['Auditor\'s specialist', 'Management\'s internal specialist', 'External specialist', 'Not a specialist situation'],
        correctAnswer: 1,
        explanation: 'Client employees performing estimates are management\'s specialists. Auditor evaluates their work as audit evidence, not as using a specialist.'
      }
    ],
    hints: [
      'Auditor specialist: Engaged by auditor to assist',
      'Management specialist: Engaged/employed by client',
      'No reference to specialist in unmodified opinion'
    ]
  },
  {
    id: 'aud-tbs-b3-011',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Confirmation Procedures',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Substantive Procedures',
    blueprintArea: 'AUD-III',
    scenario: `
You are evaluating confirmation procedures for Stellar Manufacturing:

Situation 1: 30 confirmations sent to customers. 20 returned confirmed, 5 returned with exceptions, 5 not returned.

Situation 2: A/R confirmation returned with customer's check attached showing payment received after year-end.

Situation 3: Customer confirms balance but notes dispute over $50,000 of charges they claim were unauthorized.

Situation 4: Bank confirmation returned showing client has $2.3 million loan not recorded in client's books.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'For the 5 non-responses (Situation 1), the auditor should:',
        options: ['Assume balance is correct', 'Send second requests only', 'Perform alternative procedures', 'Qualify the opinion'],
        correctAnswer: 2,
        explanation: 'Non-responses require alternative procedures such as examining subsequent receipts, shipping documents, or sales invoices.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Situation 2 (check enclosed) indicates:',
        options: ['No issue - receipt confirms balance existed', 'Potential subsequent event', 'Cut-off issue - investigate if recorded in correct period', 'Fraud risk'],
        correctAnswer: 0,
        explanation: 'Payment after year-end confirms the receivable existed at year-end. The check is excellent evidence supporting existence assertion.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'The disputed charges (Situation 3) require investigation of:',
        options: ['Revenue recognition accuracy', 'Allowance for doubtful accounts', 'Potential sales cut-off issue', 'All of the above'],
        correctAnswer: 3,
        explanation: 'Disputed amounts may indicate: unauthorized sales needing reversal, collectibility issues for allowance, or cut-off problems. Investigate all possibilities.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Situation 4 (unrecorded loan) is most likely indicative of:',
        options: ['Bank error', 'Fraud or material misstatement', 'Normal timing difference', 'Compensating balance arrangement'],
        correctAnswer: 1,
        explanation: 'Unrecorded $2.3 million loan is a significant potential misstatement. Could indicate management fraud to hide debt or error requiring immediate investigation.'
      }
    ],
    hints: [
      'Confirmations provide evidence about existence, not valuation',
      'Non-response requires alternative procedures',
      'Exceptions require investigation - may indicate misstatement'
    ]
  },
  {
    id: 'aud-tbs-b3-012',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Integrated Audit - ICFR Testing',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'ICFR',
    blueprintArea: 'AUD-IV',
    scenario: `
You are performing an integrated audit of a public company. Year 1 significant controls tested:

Control 1 - Revenue: Automated matching of shipments to invoices (100% automation).
• Prior year: Operating effectively
• Current year: No changes to control design

Control 2 - Purchasing: Manager approval of POs over $5,000 (manual).
• Prior year: Operating effectively  
• Current year: Manager turnover, new approver

Control 3 - Cash: Three-way match for disbursements (IT-dependent manual).
• Prior year: Operating effectively
• Current year: System upgrade in Q2

Control 4 - Inventory: Annual physical count with dual verification.
• Prior year: One exception noted (7% error rate)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'For Control 1 (automated matching), current year testing should:',
        options: ['Test as extensively as manual controls', 'Test IT general controls and small sample', 'No testing needed - automated', 'Only walkthrough required'],
        correctAnswer: 1,
        explanation: 'Automated controls: If IT general controls are effective and no control changes, test application control with smaller samples than manual controls.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Control 2\'s rotation of testing (manual control, unchanged design) allows:',
        options: ['No testing if tested last year', 'Test every third year with inquiry', 'Must test every year', 'Rotate detailed testing with inquiry'],
        correctAnswer: 2,
        explanation: 'Each year, some testing of operating effectiveness is required for each significant control. Manual controls cannot skip years entirely.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Control 3\'s system upgrade requires:',
        options: ['No impact - test as previously', 'Increased extent of testing', 'Test both old and new system', 'Assess change and retest control design'],
        correctAnswer: 3,
        explanation: 'System changes require evaluating impact on controls, testing new design, and potentially testing across both periods if change occurred mid-year.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Control 4\'s prior year exception means current year testing should:',
        options: ['Accept if this year error rate is lower', 'Increase sample size', 'Treat as deficiency without retesting', 'Evaluate if control has been remediated'],
        correctAnswer: 3,
        explanation: 'Prior year exceptions require evaluation of whether control was remediated. If fixed, test remediated control. If not, assess deficiency severity.'
      }
    ],
    hints: [
      'Automated controls: Test ITGCs, smaller samples for application controls',
      'Changes require reassessment of control design',
      'Prior deficiencies require evaluation of remediation'
    ]
  },
  {
    id: 'aud-tbs-b3-013',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Compliance Auditing - Government',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Government Auditing',
    blueprintArea: 'AUD-VI',
    scenario: `
You are auditing City Municipal Government under Government Auditing Standards (Yellow Book) and Single Audit requirements (Uniform Guidance).

• Total federal awards expended: $3,200,000
• Programs:
  - Housing Grant (CFDA 14.XXX): $1,800,000
  - Transportation Grant (CFDA 20.XXX): $900,000  
  - Education Grant (CFDA 84.XXX): $500,000
• Prior audit findings: Housing Grant had questioned costs of $75,000 (unresolved)
• Type A threshold applies

Single Audit threshold: $750,000
Type A program threshold: Greater of $750,000 or 3% of total federal awards
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Is a Single Audit required?',
        options: ['No - under $10 million threshold', 'Yes - exceeds $750,000 threshold', 'Only if material noncompliance exists', 'At the grantor\'s discretion'],
        correctAnswer: 1,
        explanation: 'Single Audit required when entity expends $750,000 or more in federal awards. City\'s $3.2 million exceeds threshold.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate the Type A program threshold.',
        correctAnswer: 750000,
        tolerance: 0,
        explanation: '3% of $3,200,000 = $96,000. Compared to $750,000 floor, use $750,000. Type A = programs ≥ $750,000.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Which programs are Type A major programs?',
        options: ['Housing only', 'Housing and Transportation', 'All three programs', 'Housing and Education'],
        correctAnswer: 1,
        explanation: 'Type A = ≥ $750,000. Housing ($1.8M) and Transportation ($900K) are Type A. Education ($500K) is Type B.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What effect do the prior audit unresolved findings have?',
        options: ['No effect - new year audit', 'Housing Grant is high risk', 'Must disclaim opinion', 'Report to federal oversight agency'],
        correctAnswer: 1,
        explanation: 'Prior audit findings (especially unresolved) are a risk criterion. Programs with prior findings are higher risk and more likely to require testing.'
      }
    ],
    hints: [
      'Single Audit threshold: $750,000 federal awards',
      'Type A: Larger programs, more likely to be audited',
      'Prior findings increase program risk assessment'
    ]
  },
  {
    id: 'aud-tbs-b3-014',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Auditor Independence',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Ethics and Independence',
    blueprintArea: 'AUD-I',
    scenario: `
Evaluate the following independence scenarios for Martin & Associates CPAs:

Scenario 1: Audit partner holds $5,000 in client stock through spouse's managed retirement fund where spouse does not control investments.

Scenario 2: Firm provides audit services and also prepared client's original accounting records and financial statements during the year.

Scenario 3: Former audit manager joined the client as controller 7 months after leaving the firm. She has not yet completed her first year at client.

Scenario 4: Firm's tax partner provides routine payroll tax services for the audit client.

Scenario 5: Audit fee for this client is 18% of firm's total revenues. Client threatens to switch auditors over a disagreement.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Scenario 1 (spouse\'s managed fund) - Independence impaired?',
        options: ['Yes - any stock ownership', 'No - if spouse does not control fund', 'Yes - covered member connection', 'Depends on stock amount'],
        correctAnswer: 1,
        explanation: 'Under AICPA rules, if spouse\'s retirement fund is not controlled by spouse (discretionary fund), investment does not impair independence.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Scenario 2 (bookkeeping services) - Independence for private company?',
        options: ['Always impaired', 'Permitted with safeguards and client responsibility', 'Permitted without restrictions', 'Only immaterial amounts allowed'],
        correctAnswer: 1,
        explanation: 'For non-public entities, bookkeeping permitted if client takes responsibility, management makes decisions, and auditor uses different personnel.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Scenario 3 (employment) - Independence consideration?',
        options: ['Impaired - immediate employment', 'One-year cooling off required', 'Evaluate position and procedures worked on', 'No issue - employee left firm'],
        correctAnswer: 2,
        explanation: 'Employment in key position at client requires evaluating if former member participated in current/prior year audit and nature of position.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Scenario 5 (18% of revenue, threat) represents:',
        options: ['No independence issue', 'Undue influence threat', 'Self-interest threat', 'Both undue influence and self-interest threats'],
        correctAnswer: 3,
        explanation: 'Large fee concentration (>15%) creates self-interest threat. Client pressure over disagreement creates undue influence threat.'
      }
    ],
    hints: [
      'AICPA vs SEC/PCAOB rules may differ',
      'Self-interest: Financial interest in client',
      'Undue influence: Client pressure affecting judgment'
    ]
  },
  {
    id: 'aud-tbs-b3-015',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Component Auditor and Group Audit',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Group Audits',
    blueprintArea: 'AUD-V',
    scenario: `
Global Industries has three subsidiaries audited by different firms:

• Parent (US): $500M revenue - Your firm
• Sub A (EU): $200M revenue - Local EU firm (30% of consolidated)
• Sub B (Asia): $120M revenue - Affiliate firm (18% of consolidated)
• Sub C (US): $80M revenue - Your firm (12% of consolidated)

Sub A has been audited by the EU firm for 10 years with no issues. Sub B's affiliate firm is new but follows your firm's methodology.

Group materiality: $4.5M
Significant component threshold: 15% of consolidated financials
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which subsidiaries are significant components?',
        options: ['Sub A only', 'Sub A and Sub B', 'All three', 'Sub A and Sub C'],
        correctAnswer: 1,
        explanation: 'Significant component threshold is 15%. Sub A (30%) and Sub B (18%) exceed threshold. Sub C (12%) is below.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What procedures are required for component auditors?',
        options: ['Accept their work without question', 'Evaluate competence and objectivity', 'Reperform all their work', 'Only review workpapers of significant components'],
        correctAnswer: 1,
        explanation: 'Group auditor must evaluate component auditor\'s competence, objectivity, and ability to meet ethical requirements before relying on their work.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'For Sub A (significant component), component materiality should be:',
        options: ['Same as group materiality ($4.5M)', 'Lower than group materiality', 'Based on Sub A\'s standalone financials', 'Not applicable - full audit required'],
        correctAnswer: 1,
        explanation: 'Component materiality for significant components should be lower than group materiality to provide sufficient evidence at group level.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Can the group auditor reference the component auditor in the group audit report?',
        options: ['Yes, to share responsibility', 'No, unless division of responsibility', 'Yes, if component is material', 'Only with component auditor consent'],
        correctAnswer: 1,
        explanation: 'Generally, no reference to component auditor. Division of responsibility (rare in US) might allow reference, but group auditor typically takes sole responsibility.'
      }
    ],
    hints: [
      'Group auditor responsible for entire audit',
      'Component materiality < Group materiality',
      'Evaluate component auditors before relying on work'
    ]
  },
  {
    id: 'aud-tbs-b3-016',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Auditor Communications',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Communication Requirements',
    blueprintArea: 'AUD-V',
    scenario: `
During the audit of McKenzie Corp. (public company), the following matters arise:

Matter 1: Disagreement with management over revenue recognition policy. Resolved after discussion - management accepted auditor's position.

Matter 2: Consultations with firm's national office regarding complex derivative accounting.

Matter 3: Discovery that CFO received undisclosed payments from a major vendor.

Matter 4: Uncorrected misstatements totaling $150,000 (materiality is $500,000).

Matter 5: Planned audit scope and timing overview.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Matter 1 (resolved disagreement) must be communicated to:',
        options: ['No one - issue is resolved', 'Management only', 'Those charged with governance', 'SEC'],
        correctAnswer: 2,
        explanation: 'Significant disagreements with management (even if resolved) must be communicated to those charged with governance (audit committee).'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Matter 2 (national office consultations) requires communication to:',
        options: ['No one', 'Those charged with governance', 'Management only', 'PCAOB'],
        correctAnswer: 1,
        explanation: 'Consultations with others (national office, peers) on difficult or contentious matters must be communicated to audit committee.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Matter 3 (CFO payments) requires:',
        options: ['Communication to management only', 'Direct communication to audit committee', 'Notification to legal counsel', 'Both B and C'],
        correctAnswer: 1,
        explanation: 'Suspected fraud involving senior management must be communicated directly to those charged with governance (audit committee), bypassing management.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Matter 4 (uncorrected immaterial misstatements) requires:',
        options: ['No communication needed - immaterial', 'Communication to those charged with governance', 'Qualified opinion', 'Management letter only'],
        correctAnswer: 1,
        explanation: 'All uncorrected misstatements (individually or aggregated) must be communicated to audit committee, even if immaterial.'
      }
    ],
    hints: [
      'Wider range of matters go to audit committee than management',
      'Fraud involving senior management → Direct to audit committee',
      'Required communications apply regardless of materiality'
    ]
  },
  {
    id: 'aud-tbs-b3-017',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Compilation and Review Services',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Attestation Services',
    blueprintArea: 'AUD-VI',
    scenario: `
Your firm provides the following non-audit services:

Engagement A: Prepare financial statements from client's trial balance. Client is knowledgeable and will review.

Engagement B: Review of interim financial statements for a privately held company seeking bank financing.

Engagement C: Agreed-upon procedures on client's sales commissions for management use only.

Engagement D: Client requests compilation with substantially all disclosures omitted.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Engagement A (compilation) requires the accountant to:',
        options: ['Verify accuracy of information', 'Issue compilation report', 'Obtain limited assurance', 'All of the above'],
        correctAnswer: 1,
        explanation: 'Compilation requires issuing a compilation report. No verification or assurance is provided - accountant assists with presenting financial statements.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Engagement B (review) requires procedures including:',
        options: ['Full audit procedures', 'Inquiry and analytical procedures', 'Confirmation of balances', 'Physical observation of inventory'],
        correctAnswer: 1,
        explanation: 'Review consists primarily of inquiry and analytical procedures - sufficient to provide limited assurance, not reasonable assurance.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Engagement C (agreed-upon procedures) - the report should:',
        options: ['Express an opinion', 'List procedures and findings only', 'Provide limited assurance', 'Provide negative assurance'],
        correctAnswer: 1,
        explanation: 'AUP report lists the specific procedures performed and factual findings. No assurance is expressed - users draw their own conclusions.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Engagement D (omitted disclosures compilation) is:',
        options: ['Not permitted', 'Permitted if clearly indicated in report', 'Permitted only for internal use', 'Permitted without restriction'],
        correctAnswer: 1,
        explanation: 'Compilation with substantially all disclosures omitted is permitted if (1) not intended to deceive and (2) departure clearly indicated in accountant\'s report.'
      }
    ],
    hints: [
      'Compilation: No assurance, present statements',
      'Review: Limited assurance via inquiry/analytics',
      'AUP: No assurance, report procedures and findings'
    ]
  },
  {
    id: 'aud-tbs-b3-018',
    section: 'AUD',
    type: TBS_TYPES.CALCULATION,
    title: 'Audit Adjustments Evaluation',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Evaluating Misstatements',
    blueprintArea: 'AUD-V',
    scenario: `
You have accumulated the following misstatements during the audit of Evergreen Corp.:

| Description | Overstatement (Understatement) |
|-------------|-------------------------------|
| Revenue cut-off error | $125,000 |
| Inventory obsolescence understated | ($85,000) |
| Accrued liabilities missed | ($45,000) |
| Depreciation calculation error | $35,000 |
| Prior year passed adjustment (reverses) | ($40,000) |
| Projected error from sampling | $95,000 |

Planning materiality: $200,000
Performance materiality: $150,000
Income before adjustment: $2,500,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate net uncorrected misstatement effect on income (before sampling projection).',
        correctAnswer: -10000,
        tolerance: 0,
        explanation: 'Revenue +$125K, Inventory -$85K, Accrued -$45K, Depreciation +$35K, Prior year -$40K = $125K - $85K - $45K + $35K - $40K = -$10K'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total misstatement including sampling projection.',
        correctAnswer: 85000,
        tolerance: 0,
        explanation: 'Known misstatements -$10K + Projected error $95K = $85K overstatement of income'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'The prior year passed adjustment is:',
        options: ['Excluded from current year evaluation', 'Included at full amount', 'Included at reversing amount', 'Only disclosed'],
        correctAnswer: 2,
        explanation: 'Prior year uncorrected misstatements that reverse in current year should be included in current year evaluation at their current year effect.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Given total potential misstatement of $85,000 and materiality of $200,000:',
        options: ['No adjustment required - issue unmodified opinion', 'Require correction - exceeds performance materiality', 'Request management correct - close to performance materiality', 'Qualify the opinion'],
        correctAnswer: 0,
        explanation: '$85K total is below both materiality ($200K) and performance materiality ($150K). Document misstatements and can issue unmodified opinion.'
      }
    ],
    hints: [
      'Consider net effect - overstatements and understatements offset',
      'Include projected misstatements from sampling',
      'Compare to both planning and performance materiality'
    ]
  },
  {
    id: 'aud-tbs-b3-019',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Service Organization Controls',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'IT Auditing',
    blueprintArea: 'AUD-IV',
    scenario: `
Your audit client, Regional Bank, uses several service organizations:

Service Org A: Loan processing - processes 100% of mortgage applications and maintains loan records.
• Provides SOC 1 Type II report
• Report period: Jan 1 - Oct 31 of audit year
• Opinion: Unqualified, one control exception noted

Service Org B: IT hosting - hosts core banking application
• Provides SOC 2 Type I report (Security and Availability)
• Report date: June 30 of audit year

Service Org C: Payroll processing - processes biweekly payroll
• No SOC report available
• Processes $15M annual payroll

Audit year-end: December 31
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'For Service Org A, the gap in coverage (Nov-Dec) requires:',
        options: ['Accept report as sufficient', 'Obtain bridge letter or perform additional procedures', 'Disclaim on related balances', 'Request new report'],
        correctAnswer: 1,
        explanation: 'Two-month gap requires either bridge letter from service org confirming no control changes, or additional procedures by auditor to cover gap period.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Service Org B provides Type I report. This means:',
        options: ['Controls tested for operating effectiveness', 'Controls examined at a point in time only', 'Opinion on user organization controls', 'Report on non-financial controls'],
        correctAnswer: 1,
        explanation: 'Type I reports describe controls and test design at a point in time. Type II reports test operating effectiveness over a period.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'For Service Org C (no SOC report), the auditor should:',
        options: ['Ignore - payroll is not significant', 'Perform procedures at the service organization', 'Qualify opinion for scope limitation', 'Rely on analytical procedures only'],
        correctAnswer: 1,
        explanation: 'Without SOC report, auditor must obtain evidence another way: procedures at service org, or substantive procedures on client\'s records that compensate.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The control exception in Service Org A\'s report requires the auditor to:',
        options: ['Automatic scope limitation', 'Evaluate effect on audit risk and respond', 'Report to client\'s audit committee', 'All of the above'],
        correctAnswer: 1,
        explanation: 'Control exceptions require evaluation of impact on related assertions and consideration of whether additional audit procedures are needed.'
      }
    ],
    hints: [
      'Type I: Design only; Type II: Design and effectiveness',
      'SOC 1: Financial reporting controls; SOC 2: Trust services',
      'Gaps in coverage period require additional procedures'
    ]
  },
  {
    id: 'aud-tbs-b3-020',
    section: 'AUD',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Inventory Audit Procedures',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Substantive Procedures',
    blueprintArea: 'AUD-III',
    scenario: `
You are planning inventory observation for Manufacturing Corp. with:
• 5 warehouse locations
• $45 million total inventory (25% of total assets)
• Perpetual inventory system with cycle counting
• Annual physical count scheduled December 15 (year-end December 31)

Prior year findings:
• 3% count-to-record difference rate
• Several obsolete items identified worth $800,000
• One location had inadequate segregation of duties

Product types include raw materials, work-in-process, and finished goods.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'For the 16-day gap between count and year-end, the auditor should:',
        options: ['Accept client rollforward', 'Test rollforward transactions', 'Require count on December 31', 'No additional procedures needed'],
        correctAnswer: 1,
        explanation: 'When count differs from year-end, auditor must test rollforward period transactions (receipts, shipments, adjustments) to verify year-end balance.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Given 5 locations and prior issues, observation planning should:',
        options: ['Observe all 5 locations', 'Sample 2 locations randomly', 'Focus on location with prior control issue', 'Observe only largest location'],
        correctAnswer: 0,
        explanation: 'With inventory at 25% of assets and prior issues including control weaknesses, all material locations should be observed.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'During observation, auditor\'s role is to:',
        options: ['Count all inventory', 'Observe client counting and perform test counts', 'Supervise client count team', 'Review count sheets only'],
        correctAnswer: 1,
        explanation: 'Auditor observes client\'s count procedures and performs independent test counts (selections from records to floor and floor to records).'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The $800,000 prior year obsolescence requires:',
        options: ['Accept current year as clean', 'Enhanced procedures for LCM/NRV evaluation', 'Reduce reliance on management estimates', 'All of the above'],
        correctAnswer: 1,
        explanation: 'Prior obsolescence findings indicate ongoing risk. Enhanced procedures for slow-moving inventory analysis and LCM/NRV testing are appropriate.'
      }
    ],
    hints: [
      'Observation required for material inventory',
      'Test counts: Records → Floor AND Floor → Records',
      'Prior issues inform current year risk assessment'
    ]
  }
];
