// AUD - Auditing and Attestation Questions
// Comprehensive question bank for CPA exam preparation

import { Question } from '../../types';

export const AUD_QUESTIONS: Question[] = [
  // ==========================================
  // AREA 1: Ethics, Independence, and Professional Responsibilities
  // ==========================================

  {
    id: 'aud-eth-001',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-ethics',
    topic: 'Ethics and Independence',
    subtopic: 'AICPA Code of Conduct',
    difficulty: 'medium',
    question:
      'Under the AICPA Code of Professional Conduct, which of the following would impair independence?',
    options: [
      'Providing tax preparation services to an attest client',
      'Owning an immaterial direct financial interest in an attest client',
      'Having a close relative employed by the client in a non-key position',
      'Providing consulting services unrelated to internal control',
    ],
    correctAnswer: 1,
    explanation:
      'Any direct financial interest, regardless of materiality, impairs independence. Indirect financial interests are evaluated for materiality. Tax services and certain consulting services are generally permitted.',
    reference: 'AICPA Code of Conduct ET 1.210',
  },
  {
    id: 'aud-eth-002',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-ethics',
    topic: 'Ethics and Independence',
    subtopic: 'AICPA Code of Conduct',
    difficulty: 'hard',
    question: 'A "covered member" for independence purposes includes all of the following EXCEPT:',
    options: [
      'An individual on the attest engagement team',
      'Any partner in any office of the firm',
      'A partner in the office where the lead attest partner practices',
      'An individual in a position to influence the attest engagement'
    ],
    correctAnswer: 1,
    explanation:
      'Covered members include: engagement team, those who influence the engagement, partners in the engagement office, and the firm itself. Not all partners firm-wide are covered members.',
    reference: 'AICPA Code of Conduct ET 0.400.12',
  },
  {
    id: 'aud-eth-003',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-ethics',
    topic: 'Ethics and Independence',
    subtopic: 'SEC Independence',
    difficulty: 'hard',
    question: 'Under SEC rules, audit partner rotation is required every:',
    options: [
      '3 years',
      '10 years',
      '5 years',
      '7 years'
    ],
    correctAnswer: 2,
    explanation:
      'SEC rules require rotation of the lead audit partner and the concurring review partner every 5 years, with a 5-year cooling off period before returning to that role.',
    reference: 'SEC Regulation S-X Rule 2-01(c)(6)',
  },
  {
    id: 'aud-eth-004',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-ethics',
    topic: 'Ethics and Independence',
    subtopic: 'Prohibited Services',
    difficulty: 'medium',
    question: 'Which of the following services is prohibited for auditors of SEC registrants?',
    options: [
      'Tax compliance services',
      'Tax planning advice',
      'Due diligence services for potential acquisitions',
      'Bookkeeping services'
    ],
    correctAnswer: 3,
    explanation:
      'SOX prohibits bookkeeping, financial information systems design, appraisal services, internal audit outsourcing, management functions, HR services, broker-dealer services, and certain legal services.',
    reference: 'SOX Section 201',
  },
  {
    id: 'aud-eth-005',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-ethics',
    topic: 'Ethics and Independence',
    subtopic: 'Integrity and Objectivity',
    difficulty: 'easy',
    question: 'The integrity principle of the AICPA Code requires CPAs to:',
    options: [
      'Never make errors in professional work',
      'Be honest and candid within confidentiality constraints',
      'Always follow client instructions',
      'Maintain minimum continuing education requirements',
    ],
    correctAnswer: 1,
    explanation:
      'Integrity requires honesty and candidness, not subordinating judgment to others, and not knowingly misrepresenting facts or being associated with misleading information.',
    reference: 'AICPA Code of Conduct ET 1.100',
  },

  // ==========================================
  // AREA 2: Risk Assessment and Planning
  // ==========================================

  {
    id: 'aud-risk-001',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-planning',
    topic: 'Audit Planning and Risk Assessment',
    subtopic: 'Audit Risk Model',
    difficulty: 'medium',
    question: 'The audit risk model is expressed as:',
    options: [
      'AR = IR × CR × DR',
      'AR = (IR + CR) × DR',
      'AR = IR × CR / DR',
      'AR = IR + CR + DR'
    ],
    correctAnswer: 0,
    explanation:
      'Audit Risk = Inherent Risk × Control Risk × Detection Risk. The auditor sets acceptable AR, assesses IR and CR, then determines DR to achieve the desired AR level.',
    reference: 'AU-C 200.A42',
  },
  {
    id: 'aud-risk-002',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-planning',
    topic: 'Audit Planning and Risk Assessment',
    subtopic: 'Risk Assessment',
    difficulty: 'hard',
    question: 'When inherent risk and control risk are assessed as high, the auditor should:',
    options: [
      'Set detection risk at a low level',
      'Withdraw from the engagement',
      'Set detection risk at a high level',
      'Rely primarily on tests of controls'
    ],
    correctAnswer: 0,
    explanation:
      'When IR and CR are high, the risk of material misstatement (RMM) is high. To maintain acceptable audit risk, detection risk must be set low, requiring more extensive substantive procedures.',
    reference: 'AU-C 315.A142',
  },
  {
    id: 'aud-risk-003',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-planning',
    topic: 'Audit Planning and Risk Assessment',
    subtopic: 'Materiality',
    difficulty: 'medium',
    question: 'Performance materiality is set at an amount:',
    options: [
      'Equal to overall materiality',
      'Less than overall materiality',
      'Greater than overall materiality',
      'Determined by management'
    ],
    correctAnswer: 1,
    explanation:
      'Performance materiality is set below overall materiality to reduce the risk that the aggregate of uncorrected and undetected misstatements exceeds overall materiality.',
    reference: 'AU-C 320.09',
  },
  {
    id: 'aud-risk-004',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-planning',
    topic: 'Audit Planning and Risk Assessment',
    subtopic: 'Understanding the Entity',
    difficulty: 'medium',
    question: "Understanding the entity's internal control is required primarily to:",
    options: [
      'Express an opinion on internal control',
      'Prepare the financial statements',
      'Identify and assess risks of material misstatement',
      'Determine if the entity should be audited'
    ],
    correctAnswer: 2,
    explanation:
      'The auditor obtains an understanding of internal control to identify types of potential misstatements, factors affecting RMM, and to design appropriate audit procedures.',
    reference: 'AU-C 315.12',
  },
  {
    id: 'aud-risk-005',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-planning',
    topic: 'Audit Planning and Risk Assessment',
    subtopic: 'Fraud Risk',
    difficulty: 'hard',
    question:
      'The auditor should presume that risks of material misstatement due to fraud exist in:',
    options: ['All account balances', 'Revenue recognition', 'Cash and investments', 'Inventory'],
    correctAnswer: 1,
    explanation:
      'AU-C 240 requires auditors to presume fraud risk in revenue recognition. The auditor should also always consider management override of controls as a fraud risk.',
    reference: 'AU-C 240.27',
  },
  {
    id: 'aud-risk-006',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-planning',
    topic: 'Audit Planning and Risk Assessment',
    subtopic: 'Analytical Procedures',
    difficulty: 'medium',
    question: 'Analytical procedures are required during which phases of the audit?',
    options: [
      'Planning only',
      'Planning and final review',
      'Substantive testing only',
      'All phases of the audit',
    ],
    correctAnswer: 1,
    explanation:
      'Analytical procedures are required during planning (risk assessment) and final review (overall conclusion). They are optional but useful during substantive testing.',
    reference: 'AU-C 520.06',
  },

  // ==========================================
  // AREA 3: Internal Control
  // ==========================================

  {
    id: 'aud-ic-001',
    section: 'AUD',
    blueprintArea: 'AUD-III',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'COSO Framework',
    difficulty: 'medium',
    question: 'The COSO Internal Control Framework includes how many components?',
    options: [
      'Six',
      'Four',
      'Three',
      'Five'
    ],
    correctAnswer: 3,
    explanation:
      'COSO has five components: (1) Control Environment, (2) Risk Assessment, (3) Control Activities, (4) Information and Communication, and (5) Monitoring Activities.',
    reference: 'COSO Internal Control - Integrated Framework',
  },
  {
    id: 'aud-ic-002',
    section: 'AUD',
    blueprintArea: 'AUD-III',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'COSO Framework',
    difficulty: 'hard',
    question: 'Which COSO component sets the foundation for all other components?',
    options: ['Risk Assessment', 'Control Activities', 'Control Environment', 'Monitoring'],
    correctAnswer: 2,
    explanation:
      'The Control Environment (tone at the top) is the foundation - it includes integrity, ethical values, management philosophy, organizational structure, and commitment to competence.',
    reference: 'COSO Framework - Control Environment',
  },
  {
    id: 'aud-ic-003',
    section: 'AUD',
    blueprintArea: 'AUD-III',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'Tests of Controls',
    difficulty: 'medium',
    question: 'Tests of controls are performed when the auditor:',
    options: [
      'Issues a disclaimer of opinion',
      'Assesses control risk at maximum',
      'Performs only substantive procedures',
      'Plans to rely on the operating effectiveness of controls'
    ],
    correctAnswer: 3,
    explanation:
      'Tests of controls are required when the auditor plans to rely on controls to reduce substantive testing, or when substantive procedures alone cannot provide sufficient evidence.',
    reference: 'AU-C 330.08',
  },
  {
    id: 'aud-ic-004',
    section: 'AUD',
    blueprintArea: 'AUD-III',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'Control Deficiencies',
    difficulty: 'hard',
    question: 'A significant deficiency is:',
    options: [
      'A deficiency, or combination, that is less severe than a material weakness but important enough to merit attention',
      'Any control deficiency',
      'A deficiency that results in a material misstatement',
      'The same as a material weakness'
    ],
    correctAnswer: 0,
    explanation:
      'A significant deficiency is important enough to merit attention by those charged with governance but is less severe than a material weakness. Material weakness = reasonable possibility of material misstatement not prevented/detected.',
    reference: 'AU-C 265.07',
  },
  {
    id: 'aud-ic-005',
    section: 'AUD',
    blueprintArea: 'AUD-III',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'Communication',
    difficulty: 'medium',
    question: 'The auditor must communicate in writing to management:',
    options: [
      'All control deficiencies identified',
      'Significant deficiencies and material weaknesses',
      'Only material weaknesses',
      'Control deficiencies only if requested by management'
    ],
    correctAnswer: 1,
    explanation:
      'The auditor must communicate in writing significant deficiencies and material weaknesses to those charged with governance. Other deficiencies may be communicated orally.',
    reference: 'AU-C 265.11',
  },

  // ==========================================
  // AREA 4: Evidence and Procedures
  // ==========================================

  {
    id: 'aud-evid-001',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Sufficiency and Appropriateness',
    difficulty: 'medium',
    question: 'The appropriateness of audit evidence relates to:',
    options: [
      'The quantity of evidence',
      'The timing of obtaining evidence',
      'The cost of obtaining evidence',
      'The relevance and reliability of evidence'
    ],
    correctAnswer: 3,
    explanation:
      'Appropriateness measures the quality of evidence - its relevance to the assertion being tested and its reliability. Sufficiency measures the quantity of evidence.',
    reference: 'AU-C 500.06',
  },
  {
    id: 'aud-evid-002',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Reliability',
    difficulty: 'medium',
    question: 'Which of the following sources of evidence is generally most reliable?',
    options: [
      'Oral representations from management',
      'Documents received directly from independent third parties',
      'Documents generated internally by the client',
      'Computations made by the auditor'
    ],
    correctAnswer: 1,
    explanation:
      'External evidence from independent third parties (confirmations, bank statements) is generally more reliable than internal documents or oral representations.',
    reference: 'AU-C 500.A31',
  },
  {
    id: 'aud-evid-003',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Audit Procedures',
    difficulty: 'easy',
    question: 'Inspection of tangible assets provides evidence primarily about:',
    options: ['Rights and obligations', 'Valuation', 'Existence', 'Completeness'],
    correctAnswer: 2,
    explanation:
      'Physical inspection confirms existence - that the asset is physically present. It does not confirm ownership (rights), value, or completeness.',
    reference: 'AU-C 500.A14',
  },
  {
    id: 'aud-evid-004',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Confirmations',
    difficulty: 'medium',
    question: 'A positive confirmation requests the recipient to:',
    options: [
      'Respond only if they disagree with the stated amount',
      'Respond in all cases',
      'Contact the auditor by phone',
      'Provide copies of documents',
    ],
    correctAnswer: 1,
    explanation:
      'Positive confirmations request a response in all cases, agreeing or disagreeing. Negative confirmations request a response only if the recipient disagrees.',
    reference: 'AU-C 505.A6',
  },
  {
    id: 'aud-evid-005',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Substantive Procedures',
    difficulty: 'hard',
    question: 'Substantive procedures must be performed for:',
    options: [
      'Only high-risk areas',
      'Only material account balances',
      'Only when tests of controls are not performed',
      'All relevant assertions for each material class of transactions, account balance, and disclosure'
    ],
    correctAnswer: 3,
    explanation:
      'Regardless of assessed risk or reliance on controls, substantive procedures are required for all relevant assertions for material transaction classes, balances, and disclosures.',
    reference: 'AU-C 330.18',
  },

  // ==========================================
  // AREA 5: Sampling
  // ==========================================

  {
    id: 'aud-samp-001',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-sampling',
    topic: 'Audit Sampling',
    subtopic: 'Sampling Risk',
    difficulty: 'medium',
    question: 'The risk of assessing control risk too low is a:',
    options: [
      'Risk of incorrect acceptance',
      'Risk of incorrect rejection',
      'Risk affecting audit efficiency',
      'Risk affecting audit effectiveness'
    ],
    correctAnswer: 3,
    explanation:
      'Assessing control risk too low (concluding controls are effective when they are not) affects audit effectiveness - it could lead to failing to detect material misstatements.',
    reference: 'AU-C 530.05',
  },
  {
    id: 'aud-samp-002',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-sampling',
    topic: 'Audit Sampling',
    subtopic: 'Sample Size',
    difficulty: 'hard',
    question: 'As the tolerable rate of deviation decreases, the required sample size:',
    options: [
      'Depends on the population size',
      'Decreases',
      'Remains unchanged',
      'Increases'
    ],
    correctAnswer: 3,
    explanation:
      'A lower tolerable deviation rate requires a larger sample to provide confidence that the actual rate does not exceed the tolerable rate.',
    reference: 'AU-C 530.A11',
  },
  {
    id: 'aud-samp-003',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-sampling',
    topic: 'Audit Sampling',
    subtopic: 'Selection Methods',
    difficulty: 'medium',
    question:
      'Which sampling method gives every item in the population an equal chance of selection?',
    options: ['Block sampling', 'Haphazard sampling', 'Random sampling', 'Judgmental sampling'],
    correctAnswer: 2,
    explanation:
      'Random sampling provides every item an equal probability of selection. Block sampling selects contiguous items; haphazard has no structured selection; judgmental is non-statistical.',
    reference: 'AU-C 530.A13',
  },

  // ==========================================
  // AREA 6: Completing the Audit
  // ==========================================

  {
    id: 'aud-se-001',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-completing',
    topic: 'Completing the Audit',
    subtopic: 'Subsequent Events',
    difficulty: 'medium',
    question: 'Type I subsequent events require:',
    options: [
      'Disclosure only',
      'No action',
      'Adjustment to the financial statements',
      'A modified opinion'
    ],
    correctAnswer: 2,
    explanation:
      'Type I subsequent events provide evidence of conditions existing at the balance sheet date. They require adjustment. Type II events (conditions arising after) require disclosure only.',
    reference: 'AU-C 560.09',
  },
  {
    id: 'aud-se-002',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-completing',
    topic: 'Completing the Audit',
    subtopic: 'Management Representations',
    difficulty: 'medium',
    question: 'The management representation letter is dated:',
    options: [
      'As of the balance sheet date',
      "As of the date the auditor's report is dated",
      'As of the date fieldwork begins',
      'As of the date of the engagement letter',
    ],
    correctAnswer: 1,
    explanation:
      "The representation letter is dated as of the date of the auditor's report (the last day of fieldwork). It covers the period through that date.",
    reference: 'AU-C 580.14',
  },
  {
    id: 'aud-se-003',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-completing',
    topic: 'Completing the Audit',
    subtopic: 'Communication with Governance',
    difficulty: 'hard',
    question: 'Which of the following must be communicated to those charged with governance?',
    options: [
      'All adjusting journal entries',
      'Significant findings from the audit',
      'Detailed audit procedures performed',
      'Names of all staff on the engagement',
    ],
    correctAnswer: 1,
    explanation:
      "Required communications include: auditor's responsibilities, planned scope/timing, significant findings, significant difficulties, disagreements with management, and other matters.",
    reference: 'AU-C 260.12',
  },
  {
    id: 'aud-se-004',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-completing',
    topic: 'Completing the Audit',
    subtopic: 'Documentation',
    difficulty: 'medium',
    question:
      'Audit documentation should be assembled within how many days after the report release date?',
    options: [
      '60 days',
      '45 days',
      '90 days',
      '30 days'
    ],
    correctAnswer: 0,
    explanation:
      'The audit documentation must be assembled in a final file within 60 days after the report release date. After assembly, no deletions are permitted.',
    reference: 'AU-C 230.14',
  },

  // ==========================================
  // AREA 7: Audit Reports
  // ==========================================

  {
    id: 'aud-rep-001',
    section: 'AUD',
    blueprintArea: 'AUD-IV',
    topicId: 'aud-reporting',
    topic: 'Audit Reports',
    subtopic: 'Unmodified Opinion',
    difficulty: 'easy',
    question: 'An unmodified (clean) opinion states that the financial statements:',
    options: [
      'Are guaranteed to be accurate',
      'Are presented fairly in all material respects in accordance with the applicable framework',
      'Contain no errors or misstatements',
      'Have been verified by the auditor',
    ],
    correctAnswer: 1,
    explanation:
      'An unmodified opinion states the financial statements are presented fairly, in all material respects, in accordance with the applicable financial reporting framework (e.g., U.S. GAAP).',
    reference: 'AU-C 700.35',
  },
  {
    id: 'aud-rep-002',
    section: 'AUD',
    blueprintArea: 'AUD-IV',
    topicId: 'aud-reporting',
    topic: 'Audit Reports',
    subtopic: 'Modified Opinions',
    difficulty: 'hard',
    question: 'A qualified opinion is appropriate when:',
    options: [
      'The auditor cannot form an opinion',
      'Misstatements are material and pervasive',
      'The entity is not a going concern',
      'Misstatements are material but not pervasive'
    ],
    correctAnswer: 3,
    explanation:
      'Qualified opinion: material but not pervasive misstatements or scope limitations. Adverse: material AND pervasive misstatements. Disclaimer: material AND pervasive scope limitations.',
    reference: 'AU-C 705.07',
  },
  {
    id: 'aud-rep-003',
    section: 'AUD',
    blueprintArea: 'AUD-IV',
    topicId: 'aud-reporting',
    topic: 'Audit Reports',
    subtopic: 'Modified Opinions',
    difficulty: 'medium',
    question: 'When is an adverse opinion appropriate?',
    options: [
      'When the auditor cannot obtain sufficient evidence',
      'When there is substantial doubt about going concern',
      'When there is a scope limitation',
      'When misstatements are material and pervasive'
    ],
    correctAnswer: 3,
    explanation:
      'An adverse opinion is issued when misstatements are both material AND pervasive to the financial statements - they are so significant that the statements are misleading.',
    reference: 'AU-C 705.08',
  },
  {
    id: 'aud-rep-004',
    section: 'AUD',
    blueprintArea: 'AUD-IV',
    topicId: 'aud-reporting',
    topic: 'Audit Reports',
    subtopic: 'Emphasis of Matter',
    difficulty: 'medium',
    question: 'An Emphasis of Matter paragraph is added when:',
    options: [
      'The auditor wants to draw attention to a matter appropriately presented in the financial statements',
      'The auditor wants to modify the opinion',
      'There is a scope limitation',
      'The financial statements depart from GAAP'
    ],
    correctAnswer: 0,
    explanation:
      'Emphasis of Matter draws attention to matters properly presented (e.g., significant uncertainty, subsequent event). It does not modify the opinion. Other Matter relates to non-FS matters.',
    reference: 'AU-C 706.06',
  },
  {
    id: 'aud-rep-005',
    section: 'AUD',
    blueprintArea: 'AUD-IV',
    topicId: 'aud-reporting',
    topic: 'Audit Reports',
    subtopic: 'Going Concern',
    difficulty: 'hard',
    question:
      'When there is substantial doubt about going concern but disclosure is adequate, the auditor:',
    options: [
      'Issues an adverse opinion',
      'Issues an unmodified opinion with an Emphasis of Matter paragraph',
      'Issues a qualified opinion',
      'Disclaims an opinion'
    ],
    correctAnswer: 1,
    explanation:
      'If going concern disclosure is adequate, an unmodified opinion is issued with an Emphasis of Matter (or separate section for SAS 134) drawing attention to the going concern uncertainty.',
    reference: 'AU-C 570.22',
  },

  // ==========================================
  // AREA 8: Other Engagements
  // ==========================================

  {
    id: 'aud-other-001',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-other',
    topic: 'Other Engagements',
    subtopic: 'Review Engagements',
    difficulty: 'medium',
    question: 'A review provides what level of assurance?',
    options: [
      'Limited assurance (moderate)',
      'Reasonable assurance (high)',
      'No assurance',
      'Absolute assurance'
    ],
    correctAnswer: 0,
    explanation:
      'A review provides limited (moderate) assurance - less than an audit (reasonable/high) but more than a compilation (no assurance). The conclusion is negative form.',
    reference: 'AR-C 90.04',
  },
  {
    id: 'aud-other-002',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-other',
    topic: 'Other Engagements',
    subtopic: 'Review Engagements',
    difficulty: 'hard',
    question: 'The report on a review engagement expresses:',
    options: [
      'A conclusion that nothing came to attention indicating statements are not fairly presented',
      'An opinion that financial statements are fairly presented',
      'A guarantee of the accuracy of the financial statements',
      'Assurance that internal controls are effective'
    ],
    correctAnswer: 0,
    explanation:
      'Review reports express negative assurance - "nothing came to our attention" rather than positive assurance that statements are fairly presented.',
    reference: 'AR-C 90.36',
  },
  {
    id: 'aud-other-003',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-other',
    topic: 'Other Engagements',
    subtopic: 'Compilation Engagements',
    difficulty: 'medium',
    question: 'In a compilation engagement, the accountant:',
    options: [
      'Assists management in presenting financial statements without obtaining assurance',
      'Performs inquiry and analytical procedures',
      'Obtains reasonable assurance',
      'Tests internal controls'
    ],
    correctAnswer: 0,
    explanation:
      'A compilation involves assisting management in presenting financial information without obtaining assurance. No procedures are performed to verify accuracy.',
    reference: 'AR-C 80.04',
  },
  {
    id: 'aud-other-004',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-other',
    topic: 'Other Engagements',
    subtopic: 'Agreed-Upon Procedures',
    difficulty: 'medium',
    question: 'An agreed-upon procedures (AUP) engagement results in:',
    options: [
      'An opinion on the financial statements',
      'A conclusion about subject matter',
      'A report of findings without a conclusion or opinion',
      'A compilation report',
    ],
    correctAnswer: 2,
    explanation:
      'AUP engagements report the specific procedures performed and findings. No opinion or conclusion is expressed - users draw their own conclusions from the findings.',
    reference: 'AT-C 215.04',
  },
  {
    id: 'aud-other-005',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-other',
    topic: 'Other Engagements',
    subtopic: 'SOC Reports',
    difficulty: 'hard',
    question: 'A SOC 1 report is primarily intended for:',
    options: [
      'User entities and their auditors to evaluate controls affecting financial reporting',
      'The general public',
      'Evaluating cybersecurity',
      'Regulatory compliance only'
    ],
    correctAnswer: 0,
    explanation:
      "SOC 1 reports address controls at a service organization relevant to user entities' internal control over financial reporting. SOC 2 covers security, availability, confidentiality, etc.",
    reference: 'AT-C 320',
  },

  // Additional Questions
  {
    id: 'aud-rp-001',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Related Parties',
    difficulty: 'hard',
    question: 'Audit procedures for related party transactions should include:',
    options: [
      "Accepting management's representations without corroboration",
      'Relying solely on inquiry of management',
      'Ignoring immaterial related party transactions',
      "Evaluating the business purpose and whether terms are equivalent to arm's length"
    ],
    correctAnswer: 3,
    explanation:
      "The auditor should evaluate the business rationale and whether transactions are at arm's length terms. Special procedures apply due to increased fraud risk.",
    reference: 'AU-C 550.19',
  },
  {
    id: 'aud-rp-002',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-planning',
    topic: 'Audit Planning and Risk Assessment',
    subtopic: 'Using the Work of Others',
    difficulty: 'medium',
    question: 'Before using the work of internal auditors, the external auditor must evaluate:',
    options: [
      'The objectivity, competence, and work of the internal auditors',
      "Only the internal audit department's budget",
      'Whether internal auditors are CPAs',
      'Only whether the audit committee approves'
    ],
    correctAnswer: 0,
    explanation:
      'The external auditor evaluates the objectivity, technical competence, and systematic approach of internal auditors before using their work.',
    reference: 'AU-C 610.11',
  },
  {
    id: 'aud-rp-003',
    section: 'AUD',
    blueprintArea: 'AUD-III',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'IT Controls',
    difficulty: 'hard',
    question: 'General IT controls include all of the following EXCEPT:',
    options: [
      'Program change controls',
      'Input validation checks on specific transactions',
      'Computer operations controls',
      'Access security controls'
    ],
    correctAnswer: 1,
    explanation:
      'General IT controls (ITGCs) are pervasive: access security, change management, computer operations, and backup/recovery. Input validation is an application control, specific to a transaction type.',
    reference: 'AU-C 315.A115',
  },
  {
    id: 'aud-rp-004',
    section: 'AUD',
    blueprintArea: 'AUD-IV',
    topicId: 'aud-reporting',
    topic: 'Audit Reports',
    subtopic: 'Comparative Statements',
    difficulty: 'medium',
    question:
      "When a predecessor auditor's report is not reissued with comparative statements, the successor auditor:",
    options: [
      'Must audit the prior period',
      "Makes reference to the predecessor's audit in an Other Matter paragraph",
      'Issues an adverse opinion on comparative statements',
      'Declines the engagement',
    ],
    correctAnswer: 1,
    explanation:
      "If the predecessor's report is not reissued, the successor includes an Other Matter paragraph describing: that prior period was audited by another auditor, date of their report, opinion type, and reasons for modification if any.",
    reference: 'AU-C 700.56',
  },
];

export default AUD_QUESTIONS;
