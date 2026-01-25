// AUD - Extended Question Bank
// Additional 150+ questions for comprehensive CPA exam preparation

import { Question } from '../../types';

export const AUD_QUESTIONS_EXTENDED: Question[] = [
  // ==========================================
  // AUDIT PLANNING
  // ==========================================
  {
    id: 'aud-plan-001',
    section: 'AUD',
    topicId: 'aud-planning',
    topic: 'Audit Planning',
    subtopic: 'Audit Risk Model',
    difficulty: 'medium',
    question:
      'The audit risk model is expressed as: AR = IR × CR × DR. If audit risk is set at 5%, inherent risk is 80%, and control risk is 50%, what is the acceptable detection risk?',
    options: ['6.25%', '12.5%', '20%', '50%'],
    correctAnswer: 1,
    explanation: 'DR = AR ÷ (IR × CR) = 0.05 ÷ (0.80 × 0.50) = 0.05 ÷ 0.40 = 0.125 = 12.5%',
    reference: 'AU-C 200',
  },
  {
    id: 'aud-plan-002',
    section: 'AUD',
    topicId: 'aud-planning',
    topic: 'Audit Planning',
    subtopic: 'Materiality',
    difficulty: 'hard',
    question: 'Performance materiality is set:',
    options: [
      'Equal to overall materiality',
      'Higher than overall materiality',
      'Lower than overall materiality',
      'At the discretion of the client',
    ],
    correctAnswer: 2,
    explanation:
      'Performance materiality is set lower than overall materiality to reduce the risk that undetected and uncorrected misstatements aggregate to an amount exceeding overall materiality.',
    reference: 'AU-C 320.09',
  },
  {
    id: 'aud-plan-003',
    section: 'AUD',
    topicId: 'aud-planning',
    topic: 'Audit Planning',
    subtopic: 'Risk Assessment',
    difficulty: 'medium',
    question:
      'Which of the following is a significant risk that requires special audit consideration?',
    options: [
      'Routine transactions',
      'Management override of controls',
      'Automated controls',
      'Immaterial account balances',
    ],
    correctAnswer: 1,
    explanation:
      'Management override of controls is always presumed to be a significant risk because management can circumvent even well-designed controls. Revenue recognition fraud is also presumed.',
    reference: 'AU-C 240.31',
  },
  {
    id: 'aud-plan-004',
    section: 'AUD',
    topicId: 'aud-planning',
    topic: 'Audit Planning',
    subtopic: 'Understanding the Entity',
    difficulty: 'easy',
    question: "Understanding an entity's internal control is required:",
    options: [
      'Only for integrated audits',
      'Only when the auditor plans to rely on controls',
      'In every audit',
      'Only for publicly traded companies',
    ],
    correctAnswer: 2,
    explanation:
      'In every audit, the auditor must obtain an understanding of internal control relevant to the audit. This understanding is used for risk assessment, regardless of whether controls will be tested.',
    reference: 'AU-C 315.12',
  },
  {
    id: 'aud-plan-005',
    section: 'AUD',
    topicId: 'aud-planning',
    topic: 'Audit Planning',
    subtopic: 'Engagement Letters',
    difficulty: 'easy',
    question: 'An engagement letter should be agreed upon:',
    options: [
      'After fieldwork begins',
      'Before the audit starts',
      'At the conclusion of the audit',
      'Only for new clients',
    ],
    correctAnswer: 1,
    explanation:
      'The engagement letter should be agreed upon before the audit commences. It establishes terms, scope, responsibilities, and objectives. Required for all audits, even recurring engagements (though may update existing letter).',
    reference: 'AU-C 210.09',
  },

  // ==========================================
  // INTERNAL CONTROL
  // ==========================================
  {
    id: 'aud-ext-ic-001',
    section: 'AUD',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'COSO Components',
    difficulty: 'medium',
    question:
      'The COSO framework includes five components of internal control. Which is NOT one of them?',
    options: [
      'Control environment',
      'Risk assessment',
      'External verification',
      'Monitoring activities',
    ],
    correctAnswer: 2,
    explanation:
      'COSO components: Control Environment, Risk Assessment, Control Activities, Information & Communication, and Monitoring Activities. External verification is not a component.',
    reference: 'AU-C 315',
  },
  {
    id: 'aud-ext-ic-002',
    section: 'AUD',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'Control Environment',
    difficulty: 'medium',
    question:
      'The control environment sets the tone of an organization. Which factor is part of the control environment?',
    options: [
      'Physical safeguards over assets',
      'Commitment to competence',
      'Authorization procedures',
      'Reconciliation of accounts',
    ],
    correctAnswer: 1,
    explanation:
      'Control environment factors include: integrity and ethical values, commitment to competence, board/audit committee participation, management philosophy, organizational structure, HR policies, and authority assignment.',
    reference: 'AU-C 315.A77',
  },
  {
    id: 'aud-ext-ic-003',
    section: 'AUD',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'Types of Controls',
    difficulty: 'hard',
    question: 'A control that operates before an error occurs is classified as:',
    options: [
      'Detective control',
      'Corrective control',
      'Preventive control',
      'Compensating control',
    ],
    correctAnswer: 2,
    explanation:
      'Preventive controls stop errors before they occur (e.g., segregation of duties, authorization). Detective controls identify errors after they occur (e.g., reconciliations). Corrective controls fix errors.',
    reference: 'AU-C 315',
  },
  {
    id: 'aud-ext-ic-004',
    section: 'AUD',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'Deficiencies',
    difficulty: 'hard',
    question: 'A significant deficiency in internal control is:',
    options: [
      'Less severe than a material weakness',
      'More severe than a material weakness',
      'The same as a material weakness',
      'Not required to be communicated',
    ],
    correctAnswer: 0,
    explanation:
      'A significant deficiency is less severe than a material weakness but important enough to merit attention. Both must be communicated in writing to those charged with governance. Material weaknesses must also go to management.',
    reference: 'AU-C 265.07',
  },
  {
    id: 'aud-ext-ic-005',
    section: 'AUD',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'Documentation',
    difficulty: 'medium',
    question:
      'Which method of documenting internal control provides the most detailed information about document flow?',
    options: ['Narrative', 'Flowchart', 'Internal control questionnaire', 'Risk matrix'],
    correctAnswer: 1,
    explanation:
      'Flowcharts provide visual representation of document and information flow through the system. Narratives describe processes in writing. Questionnaires use yes/no questions.',
    reference: 'AU-C 315',
  },

  // ==========================================
  // AUDIT EVIDENCE
  // ==========================================
  {
    id: 'aud-ev-001',
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Appropriateness',
    difficulty: 'medium',
    question: 'Evidence obtained directly by the auditor is:',
    options: [
      'Less reliable than client-prepared evidence',
      'More reliable than evidence from third parties',
      'Equally reliable as management representations',
      'More reliable than client-prepared evidence',
    ],
    correctAnswer: 3,
    explanation:
      'Evidence hierarchy (most to least reliable): (1) auditor direct knowledge, (2) external sources independent of client, (3) internal evidence with strong controls, (4) internal evidence with weak controls.',
    reference: 'AU-C 500.A31',
  },
  {
    id: 'aud-ev-002',
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Procedures',
    difficulty: 'easy',
    question: 'Which audit procedure involves examining records or documents?',
    options: ['Inquiry', 'Observation', 'Inspection', 'Recalculation'],
    correctAnswer: 2,
    explanation:
      'Inspection involves examining records, documents, or tangible assets. Inquiry involves seeking information from knowledgeable persons. Observation involves watching a process. Recalculation involves checking mathematical accuracy.',
    reference: 'AU-C 500.A14',
  },
  {
    id: 'aud-ev-003',
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Confirmations',
    difficulty: 'hard',
    question: 'A positive confirmation request:',
    options: [
      'Asks the recipient to respond only if they disagree',
      'Asks the recipient to respond in all cases',
      'Is sent directly by the client',
      'Requires no follow-up',
    ],
    correctAnswer: 1,
    explanation:
      'Positive confirmation requests a reply whether the recipient agrees or disagrees. Negative confirmation requests reply only if recipient disagrees. Positive provides more reliable evidence but requires follow-up on non-responses.',
    reference: 'AU-C 505.A2',
  },
  {
    id: 'aud-ev-004',
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Analytical Procedures',
    difficulty: 'medium',
    question:
      'Analytical procedures are required to be performed during which phases of the audit?',
    options: [
      'Planning only',
      'Planning and overall review',
      'Planning, substantive testing, and overall review',
      'Substantive testing only',
    ],
    correctAnswer: 1,
    explanation:
      'Analytical procedures are required during (1) planning (to understand entity and identify risks) and (2) overall review near audit conclusion. Using them as substantive procedures is optional.',
    reference: 'AU-C 520',
  },
  {
    id: 'aud-ev-005',
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Management Representations',
    difficulty: 'medium',
    question: 'If management refuses to provide a representation letter:',
    options: [
      'The auditor may still issue an unmodified opinion',
      'The auditor should disclaim an opinion',
      'The representation letter is not required',
      'The auditor should issue an adverse opinion',
    ],
    correctAnswer: 1,
    explanation:
      "A representation letter is required in every audit. Management's refusal to provide it is a scope limitation. The auditor should disclaim an opinion or withdraw from the engagement.",
    reference: 'AU-C 580.26',
  },

  // ==========================================
  // SAMPLING
  // ==========================================
  {
    id: 'aud-ext-samp-001',
    section: 'AUD',
    topicId: 'aud-sampling',
    topic: 'Audit Sampling',
    subtopic: 'Sampling Risk',
    difficulty: 'hard',
    question: 'The risk of assessing control risk too low is a:',
    options: [
      'Risk of incorrect rejection',
      'Risk of incorrect acceptance',
      'Non-sampling risk',
      'Detection risk',
    ],
    correctAnswer: 1,
    explanation:
      "Risk of incorrect acceptance (Type II error): The risk that the sample supports the conclusion that control is effective when it actually is not. This is the auditor's main concern in tests of controls.",
    reference: 'AU-C 530.A1',
  },
  {
    id: 'aud-ext-samp-002',
    section: 'AUD',
    topicId: 'aud-sampling',
    topic: 'Audit Sampling',
    subtopic: 'Attribute Sampling',
    difficulty: 'medium',
    question: 'Attribute sampling is used primarily for:',
    options: [
      'Tests of details of balances',
      'Tests of controls',
      'Analytical procedures',
      'Substantive tests of transactions',
    ],
    correctAnswer: 1,
    explanation:
      'Attribute sampling tests the rate of deviation from a prescribed control. It is used for tests of controls. Variables sampling estimates monetary amounts for substantive testing.',
    reference: 'AU-C 530',
  },
  {
    id: 'aud-ext-samp-003',
    section: 'AUD',
    topicId: 'aud-sampling',
    topic: 'Audit Sampling',
    subtopic: 'Sample Size',
    difficulty: 'hard',
    question: 'Increasing the tolerable rate of deviation will:',
    options: [
      'Increase sample size',
      'Decrease sample size',
      'Not affect sample size',
      'Require 100% testing',
    ],
    correctAnswer: 1,
    explanation:
      'Tolerable deviation rate has an inverse relationship with sample size. Higher tolerable rate = auditor accepts more errors = smaller sample needed. Lower tolerable rate = larger sample needed.',
    reference: 'AU-C 530.A9',
  },
  {
    id: 'aud-ext-samp-004',
    section: 'AUD',
    topicId: 'aud-sampling',
    topic: 'Audit Sampling',
    subtopic: 'Variables Sampling',
    difficulty: 'hard',
    question: 'Monetary unit sampling (MUS) is biased toward:',
    options: [
      'Understatement errors',
      'Overstatement errors',
      'All errors equally',
      'Small dollar items',
    ],
    correctAnswer: 1,
    explanation:
      'MUS selects individual dollars, giving larger items greater chance of selection. It is biased toward detecting overstatement errors. Zero and negative balances may require special consideration.',
    reference: 'AU-C 530',
  },
  {
    id: 'aud-ext-samp-005',
    section: 'AUD',
    topicId: 'aud-sampling',
    topic: 'Audit Sampling',
    subtopic: 'Evaluation',
    difficulty: 'medium',
    question: 'When evaluating sample results, the auditor should project:',
    options: [
      'Only known misstatements',
      'Known misstatements plus likely misstatements to the population',
      'All possible misstatements in the population',
      'Only misstatements above materiality',
    ],
    correctAnswer: 1,
    explanation:
      'The auditor projects the sample results to the population to estimate total misstatement. This includes known (found) misstatements plus likely (projected) misstatements, considered against tolerable misstatement.',
    reference: 'AU-C 530.14',
  },

  // ==========================================
  // AUDIT REPORTS
  // ==========================================
  {
    id: 'aud-ext-rep-001',
    section: 'AUD',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    subtopic: 'Standard Report',
    difficulty: 'easy',
    question: 'In an unmodified audit report, the auditor expresses:',
    options: ['Absolute assurance', 'Limited assurance', 'Reasonable assurance', 'No assurance'],
    correctAnswer: 2,
    explanation:
      'An audit provides reasonable assurance (not absolute) that financial statements are free from material misstatement. Reasonable assurance is a high level of assurance.',
    reference: 'AU-C 700.11',
  },
  {
    id: 'aud-ext-rep-002',
    section: 'AUD',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    subtopic: 'Modified Opinions',
    difficulty: 'hard',
    question: 'An adverse opinion is issued when:',
    options: [
      'The auditor cannot obtain sufficient evidence',
      'Misstatements are material but not pervasive',
      'Misstatements are material and pervasive',
      'The client restricts the scope',
    ],
    correctAnswer: 2,
    explanation:
      'Adverse opinion = material AND pervasive misstatement (financial statements do not present fairly). Qualified = material but not pervasive. Disclaimer = cannot obtain evidence (scope limitation) that is material and pervasive.',
    reference: 'AU-C 705',
  },
  {
    id: 'aud-ext-rep-003',
    section: 'AUD',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    subtopic: 'Emphasis of Matter',
    difficulty: 'medium',
    question: 'An Emphasis of Matter paragraph is added to highlight:',
    options: [
      'A material misstatement',
      'A scope limitation',
      'A matter appropriately presented but fundamental to users',
      "Management's refusal to provide representations",
    ],
    correctAnswer: 2,
    explanation:
      'Emphasis of Matter paragraphs draw attention to matters appropriately presented/disclosed that are fundamental to understanding the financial statements (e.g., going concern, related party transactions).',
    reference: 'AU-C 706',
  },
  {
    id: 'aud-ext-rep-004',
    section: 'AUD',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    subtopic: 'Other Matters',
    difficulty: 'medium',
    question: 'A KAM (Key Audit Matter) is required in audit reports for:',
    options: [
      'All entities',
      'Public companies only (PCAOB)',
      'Private companies only',
      'Government entities only',
    ],
    correctAnswer: 1,
    explanation:
      'PCAOB requires communication of Critical Audit Matters (CAMs) for audits of public companies. AICPA standards allow KAMs but do not require them for non-issuers.',
    reference: 'AS 3101, AU-C 701',
  },
  {
    id: 'aud-ext-rep-005',
    section: 'AUD',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    subtopic: 'Going Concern',
    difficulty: 'hard',
    question:
      "When substantial doubt about going concern exists and management's plans adequately mitigate the doubt:",
    options: [
      'No modification to the report is necessary',
      'Emphasis of Matter paragraph is required',
      'Qualified opinion is required',
      'Adverse opinion is required',
    ],
    correctAnswer: 0,
    explanation:
      "If management's plans adequately mitigate substantial doubt about going concern, no going concern conclusion is reached and no modification is required. If doubt remains, disclose and add EOM paragraph.",
    reference: 'AU-C 570',
  },

  // ==========================================
  // PROFESSIONAL RESPONSIBILITIES
  // ==========================================
  {
    id: 'aud-pr-001',
    section: 'AUD',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    subtopic: 'Independence',
    difficulty: 'medium',
    question: 'Which of the following impairs independence under AICPA rules?',
    options: [
      'Owning an immaterial indirect investment in an attest client',
      'Owning a direct financial interest in an attest client',
      'Performing tax services for an attest client',
      'Providing bookkeeping services with management oversight',
    ],
    correctAnswer: 1,
    explanation:
      'Any direct financial interest in an attest client impairs independence, regardless of materiality. Immaterial indirect investments and non-attest services with proper safeguards may be permitted.',
    reference: 'ET 1.210',
  },
  {
    id: 'aud-pr-002',
    section: 'AUD',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    subtopic: 'Confidentiality',
    difficulty: 'easy',
    question: 'A CPA may disclose confidential client information without consent when:',
    options: [
      'Responding to a valid subpoena',
      'A potential client requests references',
      'Seeking to gain a new client',
      'Negotiating with a competitor',
    ],
    correctAnswer: 0,
    explanation:
      'Disclosure without consent is permitted in limited situations: response to subpoena/court order, peer review, ethics investigation, or as required by law/professional standards.',
    reference: 'ET 1.700',
  },
  {
    id: 'aud-pr-003',
    section: 'AUD',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    subtopic: 'Due Care',
    difficulty: 'medium',
    question: 'Due professional care requires the auditor to:',
    options: [
      'Guarantee the financial statements are correct',
      'Exercise professional skepticism',
      'Verify every transaction',
      'Detect all fraud',
    ],
    correctAnswer: 1,
    explanation:
      'Due care requires competence, diligence, and professional skepticism. Auditors cannot guarantee correctness, verify all transactions, or detect all fraud. Reasonable assurance is the standard.',
    reference: 'AU-C 200.17',
  },
  {
    id: 'aud-pr-004',
    section: 'AUD',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    subtopic: 'Fraud',
    difficulty: 'hard',
    question:
      'When an auditor discovers fraud, communication to those charged with governance is required:',
    options: [
      'Only if the fraud is material',
      'For all fraud involving management',
      'Only if requested by the client',
      'Only for fraud over $10,000',
    ],
    correctAnswer: 1,
    explanation:
      'All fraud involving senior management must be communicated to those charged with governance, regardless of materiality. Other fraud is communicated unless clearly inconsequential.',
    reference: 'AU-C 240.40',
  },
  {
    id: 'aud-pr-005',
    section: 'AUD',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    subtopic: 'Quality Control',
    difficulty: 'medium',
    question: 'An engagement quality control review is required for:',
    options: [
      'All audit engagements',
      'Audits of public companies',
      'Engagements selected by the firm',
      'Non-public company audits only',
    ],
    correctAnswer: 1,
    explanation:
      'PCAOB requires an engagement quality review (EQR) for all audits of issuers. AICPA standards require it for engagements meeting firm criteria (firms establish policies for when required).',
    reference: 'AS 1220, QM 1',
  },

  // ==========================================
  // OTHER ENGAGEMENTS
  // ==========================================
  {
    id: 'aud-oth-001',
    section: 'AUD',
    topicId: 'aud-other',
    topic: 'Other Engagements',
    subtopic: 'Reviews',
    difficulty: 'medium',
    question: 'In a review engagement, the accountant provides:',
    options: ['Reasonable assurance', 'Limited assurance', 'No assurance', 'Absolute assurance'],
    correctAnswer: 1,
    explanation:
      'A review provides limited (moderate) assurance, expressed as "not aware of any material modifications." It consists primarily of inquiry and analytical procedures, not detailed testing.',
    reference: 'AR-C 90',
  },
  {
    id: 'aud-oth-002',
    section: 'AUD',
    topicId: 'aud-other',
    topic: 'Other Engagements',
    subtopic: 'Compilations',
    difficulty: 'easy',
    question: 'In a compilation engagement, the accountant:',
    options: [
      'Provides reasonable assurance',
      'Provides limited assurance',
      'Does not express an opinion or provide assurance',
      'Issues an unmodified opinion',
    ],
    correctAnswer: 2,
    explanation:
      'Compilation provides no assurance. The accountant assists in presenting financial statements in proper form but does not verify accuracy. The report states no opinion is expressed.',
    reference: 'AR-C 80',
  },
  {
    id: 'aud-oth-003',
    section: 'AUD',
    topicId: 'aud-other',
    topic: 'Other Engagements',
    subtopic: 'Agreed-Upon Procedures',
    difficulty: 'medium',
    question: 'An agreed-upon procedures engagement results in:',
    options: [
      'An opinion on the financial statements',
      'A report listing findings based on procedures performed',
      'Limited assurance on specified elements',
      'An examination report',
    ],
    correctAnswer: 1,
    explanation:
      'AUP engagements result in a report of findings/results from specified procedures agreed upon by specified parties. No opinion or assurance is provided. Users draw their own conclusions.',
    reference: 'AT-C 215',
  },
  {
    id: 'aud-oth-004',
    section: 'AUD',
    topicId: 'aud-other',
    topic: 'Other Engagements',
    subtopic: 'SOC Reports',
    difficulty: 'hard',
    question: 'A SOC 1 Type 2 report covers:',
    options: [
      'Controls at a service organization relevant to security',
      "Controls relevant to user entities' ICFR, including operating effectiveness",
      "Controls relevant to user entities' ICFR, design only",
      'Controls related to privacy principles',
    ],
    correctAnswer: 1,
    explanation:
      'SOC 1 relates to ICFR of user entities. Type 2 includes description of system, suitability of design, AND operating effectiveness over a period. Type 1 is design only at a point in time.',
    reference: 'AT-C 320',
  },
  {
    id: 'aud-oth-005',
    section: 'AUD',
    topicId: 'aud-other',
    topic: 'Other Engagements',
    subtopic: 'Prospective Financial Statements',
    difficulty: 'hard',
    question: 'An examination of a financial forecast results in:',
    options: [
      'Reasonable assurance that assumptions are appropriate',
      'Reasonable assurance that results will be achieved',
      'Limited assurance on assumptions',
      'Compilation without assurance',
    ],
    correctAnswer: 0,
    explanation:
      'Examination of prospective financial statements provides reasonable assurance that assumptions are reasonable and the presentation conforms to guidelines. No assurance that forecasted results will be achieved.',
    reference: 'AT-C 305',
  },

  // ==========================================
  // ADDITIONAL AUDIT QUESTIONS
  // ==========================================
  {
    id: 'aud-ext-add-001',
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Substantive Procedures',
    difficulty: 'hard',
    question:
      'Which direction of testing addresses the completeness assertion for accounts payable?',
    options: [
      'From recorded payables to supporting documents',
      'From receiving reports to recorded payables',
      'From cash disbursements journal to payables',
      'From general ledger to subsidiary ledger',
    ],
    correctAnswer: 1,
    explanation:
      'Completeness testing goes from source to records. For payables, trace from receiving reports (source) to recorded payables to ensure all received goods are recorded. Existence goes records to source.',
    reference: 'AU-C 500',
  },
  {
    id: 'aud-ext-add-002',
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Inventory',
    difficulty: 'medium',
    question: 'The primary purpose of observing inventory count is to:',
    options: [
      'Verify the mathematical accuracy of inventory sheets',
      'Identify obsolete inventory',
      'Evaluate whether procedures provide reliable count',
      'Count 100% of inventory items',
    ],
    correctAnswer: 2,
    explanation:
      "Inventory observation evaluates whether the client's count procedures are being followed and are adequate to produce a reliable count. The auditor tests counts but does not count all inventory.",
    reference: 'AU-C 501.04',
  },
  {
    id: 'aud-ext-add-003',
    section: 'AUD',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    subtopic: 'Comparative Financial Statements',
    difficulty: 'hard',
    question:
      'If prior period financial statements were audited by a predecessor auditor whose report is not reissued, the current auditor should:',
    options: [
      'Express an opinion on both years',
      "Include an Other Matter paragraph referring to predecessor's report",
      'Disclaim on the prior year',
      'Refuse to present comparative statements',
    ],
    correctAnswer: 1,
    explanation:
      'When predecessor report is not reissued, the current auditor includes an Other Matter paragraph indicating: the prior period was audited by another auditor, the date and type of opinion, and any modification reasons.',
    reference: 'AU-C 700.A41',
  },
  {
    id: 'aud-ext-add-004',
    section: 'AUD',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'IT Controls',
    difficulty: 'hard',
    question: 'General IT controls include all EXCEPT:',
    options: [
      'Program change controls',
      'Access controls',
      'Validation checks in applications',
      'Computer operations controls',
    ],
    correctAnswer: 2,
    explanation:
      'General controls are pervasive controls affecting all applications (access, change management, operations, backup). Application controls are specific to individual programs (validation checks, edit controls, calculations).',
    reference: 'AU-C 315.A113',
  },
  {
    id: 'aud-ext-add-005',
    section: 'AUD',
    topicId: 'aud-planning',
    topic: 'Audit Planning',
    subtopic: 'Related Parties',
    difficulty: 'medium',
    question: 'When significant related party transactions exist:',
    options: [
      'The auditor must always modify the opinion',
      'The auditor should obtain understanding of the transactions and evaluate disclosure',
      'Related parties must be eliminated',
      'An emphasis of matter paragraph is always required',
    ],
    correctAnswer: 1,
    explanation:
      'The auditor must understand related party relationships and transactions, evaluate whether properly accounted for and disclosed, and assess fraud risk. Not all related party situations require modified opinions.',
    reference: 'AU-C 550',
  },
  {
    id: 'aud-ext-add-006',
    section: 'AUD',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    subtopic: 'Subsequent Events',
    difficulty: 'hard',
    question: 'Type 2 subsequent events are events that:',
    options: [
      'Existed at the balance sheet date',
      'Occurred after the balance sheet date but before report release',
      'Require adjustment to the financial statements',
      'Provide evidence about conditions at balance sheet date',
    ],
    correctAnswer: 1,
    explanation:
      'Type 2 events occur after balance sheet date (conditions did not exist at that date). They require disclosure but not adjustment. Type 1 events provide evidence of conditions at balance sheet date and require adjustment.',
    reference: 'AU-C 560',
  },
];

export default AUD_QUESTIONS_EXTENDED;
