// AUD - Extra Question Bank (Sprint 5 Expansion)
// Additional 50 questions focusing on commonly tested areas

import { Question } from '../../types';

export const AUD_QUESTIONS_EXTRA: Question[] = [
  // ==========================================
  // AUDIT EVIDENCE
  // ==========================================
  {
    id: 'aud-evid-050',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Sufficient Appropriate Evidence',
    difficulty: 'medium',
    question:
      'Which of the following types of audit evidence is generally considered most reliable?',
    options: [
      'Oral representations from management',
      'Internally generated documents',
      'External confirmations received directly by the auditor',
      'Pre-numbered documents from the client',
    ],
    correctAnswer: 2,
    explanation:
      'External confirmations received directly by the auditor are generally most reliable because they are generated externally and transmitted directly to the auditor, minimizing the opportunity for manipulation.',
    reference: 'AU-C 500.A31',
  },
  {
    id: 'aud-evid-051',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Analytical Procedures',
    difficulty: 'medium',
    question: 'Analytical procedures are required during which phases of an audit?',
    options: [
      'Planning phase only',
      'Testing phase only',
      'Planning and overall review phases',
      'All three phases: planning, testing, and review',
    ],
    correctAnswer: 2,
    explanation:
      'Analytical procedures are required during planning (risk assessment) and during the overall review phase. They are optional during the testing phase as a substantive procedure.',
    reference: 'AU-C 520.06',
  },
  {
    id: 'aud-evid-052',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Confirmations',
    difficulty: 'hard',
    question:
      'When using negative confirmations for accounts receivable, which condition is NOT required?',
    options: [
      'The assessed risk of material misstatement is low',
      'A large number of small balances is involved',
      'The auditor has no reason to believe respondents will disregard requests',
      'Management has provided written authorization for confirmations',
    ],
    correctAnswer: 3,
    explanation:
      'Written management authorization is not a condition for using negative confirmations. The three conditions are: low RMM, large number of small balances, and no reason to believe respondents will disregard requests.',
    reference: 'AU-C 505.15',
  },
  {
    id: 'aud-evid-053',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Sampling',
    difficulty: 'medium',
    question: 'Sampling risk is the risk that:',
    options: [
      'The auditor fails to recognize errors in the sample',
      'The sample is not representative of the population',
      "The auditor's conclusion based on a sample differs from the conclusion if the entire population were tested",
      'The client has manipulated the sample items',
    ],
    correctAnswer: 2,
    explanation:
      "Sampling risk is the risk that the auditor's conclusion based on a sample may differ from the conclusion if the entire population were subjected to the same audit procedure.",
    reference: 'AU-C 530.05',
  },
  {
    id: 'aud-evid-054',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Sampling',
    difficulty: 'hard',
    question: 'In attribute sampling, which factor would result in a larger sample size?',
    options: [
      'Higher tolerable rate of deviation',
      'Lower expected population deviation rate',
      'Lower risk of overreliance',
      'Higher risk of overreliance',
    ],
    correctAnswer: 2,
    explanation:
      'A lower risk of overreliance (requiring more confidence) leads to a larger sample size. Higher tolerable rate, lower expected deviation, and higher risk of overreliance all decrease sample size.',
    reference: 'AU-C 530.A11',
  },

  // ==========================================
  // INTERNAL CONTROL
  // ==========================================
  {
    id: 'aud-ic-050',
    section: 'AUD',
    blueprintArea: 'AUD-III',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'COSO Framework',
    difficulty: 'medium',
    question:
      'The COSO Internal Control Framework includes five components. Which is NOT one of them?',
    options: [
      'Control environment',
      'Risk assessment',
      'Audit committee oversight',
      'Monitoring activities',
    ],
    correctAnswer: 2,
    explanation:
      'The five COSO components are: Control Environment, Risk Assessment, Control Activities, Information and Communication, and Monitoring Activities. Audit committee oversight is part of control environment, not a separate component.',
    reference: 'COSO Framework',
  },
  {
    id: 'aud-ic-051',
    section: 'AUD',
    blueprintArea: 'AUD-III',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'Control Activities',
    difficulty: 'easy',
    question: 'Segregation of duties requires separating all of the following EXCEPT:',
    options: [
      'Authorization of transactions',
      'Recording of transactions',
      'Custody of related assets',
      'Preparation of financial statements',
    ],
    correctAnswer: 3,
    explanation:
      'The three key functions to segregate are: authorization, recording/accounting, and custody. Financial statement preparation is a higher-level accounting function, not a custody or authorization function.',
    reference: 'AU-C 315.A81',
  },
  {
    id: 'aud-ic-052',
    section: 'AUD',
    blueprintArea: 'AUD-III',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'IT Controls',
    difficulty: 'hard',
    question: 'General IT controls include all of the following EXCEPT:',
    options: [
      'Program change controls',
      'Access security controls',
      'Input validation checks',
      'Computer operations controls',
    ],
    correctAnswer: 2,
    explanation:
      'Input validation checks are application controls, not general IT controls. General IT controls include: program development, program changes, access security, and computer operations.',
    reference: 'AU-C 315.A102',
  },
  {
    id: 'aud-ic-053',
    section: 'AUD',
    blueprintArea: 'AUD-III',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'Tests of Controls',
    difficulty: 'medium',
    question:
      'An auditor decides to increase the assessed level of control risk. The auditor should:',
    options: [
      'Increase tests of controls',
      'Increase substantive procedures',
      'Issue a qualified opinion',
      'Withdraw from the engagement',
    ],
    correctAnswer: 1,
    explanation:
      'When control risk is assessed higher, the auditor must reduce detection risk by increasing substantive procedures. This maintains the planned level of audit risk.',
    reference: 'AU-C 330.07',
  },
  {
    id: 'aud-ic-054',
    section: 'AUD',
    blueprintArea: 'AUD-III',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    subtopic: 'Deficiencies',
    difficulty: 'hard',
    question: 'A significant deficiency is:',
    options: [
      'A deficiency that results in a material misstatement',
      'A deficiency less severe than a material weakness but important enough to merit attention',
      'Any deficiency in design or operation of controls',
      'A deficiency that must be reported to regulators',
    ],
    correctAnswer: 1,
    explanation:
      'A significant deficiency is a deficiency, or combination of deficiencies, that is less severe than a material weakness but important enough to merit attention by those charged with governance.',
    reference: 'AU-C 265.07',
  },

  // ==========================================
  // AUDIT REPORTS
  // ==========================================
  {
    id: 'aud-rep-050',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    subtopic: 'Unmodified Opinion',
    difficulty: 'easy',
    question: 'An unmodified audit opinion indicates that:',
    options: [
      'The financial statements are fraud-free',
      'The financial statements are presented fairly in all material respects',
      'The company is financially healthy',
      'All transactions were verified by the auditor',
    ],
    correctAnswer: 1,
    explanation:
      'An unmodified opinion states the financial statements are presented fairly, in all material respects, in accordance with the applicable framework. It does not guarantee absence of fraud or financial health.',
    reference: 'AU-C 700.35',
  },
  {
    id: 'aud-rep-051',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    subtopic: 'Modified Opinions',
    difficulty: 'medium',
    question: 'An auditor should issue a qualified opinion when:',
    options: [
      'Misstatements are pervasive to the financial statements',
      'Misstatements are material but not pervasive',
      'The auditor is unable to obtain sufficient evidence and effects could be pervasive',
      'There are significant deficiencies in internal control',
    ],
    correctAnswer: 1,
    explanation:
      'A qualified opinion is issued when misstatements are material but not pervasive, or when the auditor cannot obtain sufficient evidence but possible effects are not pervasive. Pervasive issues lead to adverse or disclaimer.',
    reference: 'AU-C 705.08',
  },
  {
    id: 'aud-rep-052',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    subtopic: 'Modified Opinions',
    difficulty: 'hard',
    question:
      'When management refuses to provide a required representation letter, the auditor should:',
    options: [
      'Issue a qualified opinion',
      'Issue an adverse opinion',
      'Disclaim an opinion',
      'Issue an unmodified opinion with emphasis of matter',
    ],
    correctAnswer: 2,
    explanation:
      'Refusal to provide required written representations is a scope limitation significant enough to disclaim an opinion. The representation letter is required for every audit.',
    reference: 'AU-C 580.20',
  },
  {
    id: 'aud-rep-053',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    subtopic: 'Going Concern',
    difficulty: 'medium',
    question:
      'When substantial doubt exists about going concern but adequate disclosure is made, the auditor should:',
    options: [
      'Issue a qualified opinion',
      'Issue an unmodified opinion with emphasis-of-matter paragraph',
      'Issue an adverse opinion',
      'Disclaim an opinion',
    ],
    correctAnswer: 1,
    explanation:
      'When going concern uncertainty exists with adequate disclosure, the auditor issues an unmodified opinion with an emphasis-of-matter paragraph drawing attention to the going concern note.',
    reference: 'AU-C 570.19',
  },
  {
    id: 'aud-rep-054',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    subtopic: 'Comparative Statements',
    difficulty: 'medium',
    question:
      'When the prior period statements were audited by a predecessor auditor whose report is not reissued, the current auditor should:',
    options: [
      'Reaudit the prior period',
      'Include an other-matter paragraph describing the situation',
      'Issue a disclaimer on the prior period',
      'Omit reference to the prior period',
    ],
    correctAnswer: 1,
    explanation:
      "When the predecessor's report is not reissued, the current auditor includes an other-matter paragraph indicating the prior period was audited by another auditor, the type of opinion, and if modified, the reasons.",
    reference: 'AU-C 700.A61',
  },

  // ==========================================
  // FRAUD
  // ==========================================
  {
    id: 'aud-fraud-050',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-fraud',
    topic: 'Fraud',
    subtopic: 'Fraud Risk Factors',
    difficulty: 'medium',
    question: 'The fraud triangle consists of:',
    options: [
      'Motive, means, and opportunity',
      'Incentive, opportunity, and rationalization',
      'Planning, execution, and concealment',
      'Detection, investigation, and reporting',
    ],
    correctAnswer: 1,
    explanation:
      'The fraud triangle identifies three conditions present when fraud occurs: Incentive/Pressure (motive), Opportunity (weak controls), and Rationalization (attitude). All three are typically present.',
    reference: 'AU-C 240.A1',
  },
  {
    id: 'aud-fraud-051',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-fraud',
    topic: 'Fraud',
    subtopic: 'Auditor Responsibility',
    difficulty: 'hard',
    question: 'Which statement about auditor responsibility for fraud is correct?',
    options: [
      'The auditor must detect all fraud',
      'The auditor has the same responsibility for material misstatements whether caused by fraud or error',
      'The auditor has greater responsibility for detecting management fraud than employee fraud',
      'The auditor is not responsible for preventing fraud',
    ],
    correctAnswer: 1,
    explanation:
      'The auditor has the same responsibility for obtaining reasonable assurance about material misstatements, whether caused by fraud or error. Detection is harder for fraud due to concealment.',
    reference: 'AU-C 240.05',
  },
  {
    id: 'aud-fraud-052',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-fraud',
    topic: 'Fraud',
    subtopic: 'Required Procedures',
    difficulty: 'medium',
    question: 'Which fraud-related risk is always presumed to exist?',
    options: [
      'Risk of material misstatement in cash',
      'Risk of management override of controls',
      'Risk of employee embezzlement',
      'Risk of vendor kickbacks',
    ],
    correctAnswer: 1,
    explanation:
      'Risk of material misstatement due to management override of controls is always presumed because management is in a unique position to perpetrate fraud by overriding otherwise effective controls.',
    reference: 'AU-C 240.31',
  },
  {
    id: 'aud-fraud-053',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-fraud',
    topic: 'Fraud',
    subtopic: 'Communication',
    difficulty: 'easy',
    question:
      'When fraud is detected that involves senior management, the auditor should communicate the matter to:',
    options: [
      'Lower level management',
      'Those charged with governance',
      'Law enforcement',
      'The SEC',
    ],
    correctAnswer: 1,
    explanation:
      'Fraud involving senior management should be communicated to those charged with governance (e.g., audit committee). External reporting to law enforcement or regulators is generally not required unless legally mandated.',
    reference: 'AU-C 240.40',
  },

  // ==========================================
  // PROFESSIONAL RESPONSIBILITIES
  // ==========================================
  {
    id: 'aud-prof-050',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    subtopic: 'Engagement Letters',
    difficulty: 'easy',
    question: 'An engagement letter is required for:',
    options: [
      'New clients only',
      'Each audit engagement',
      'Only when requested by the client',
      'Public companies only',
    ],
    correctAnswer: 1,
    explanation:
      'An engagement letter documenting the terms of the audit engagement is required for each audit engagement. It establishes the responsibilities of both the auditor and management.',
    reference: 'AU-C 210.09',
  },
  {
    id: 'aud-prof-051',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    subtopic: 'Quality Control',
    difficulty: 'medium',
    question: 'An engagement quality control review is required for:',
    options: [
      'All audit engagements',
      'Audits of public companies and certain high-risk engagements',
      'Only first-year audits',
      'Audits where the opinion is modified',
    ],
    correctAnswer: 1,
    explanation:
      'PCAOB standards require engagement quality review for all public company audits. AICPA standards require it for certain engagements as defined by firm policy (typically public companies and high-risk).',
    reference: 'QC 10.38',
  },
  {
    id: 'aud-prof-052',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    subtopic: 'Working Papers',
    difficulty: 'medium',
    question:
      'Audit documentation should be sufficient to enable an experienced auditor, having no previous connection with the audit, to understand:',
    options: [
      'The exact procedures performed only',
      'The nature, timing, and extent of procedures; evidence obtained; and conclusions reached',
      'Only the conclusions reached',
      "The client's entire business operations",
    ],
    correctAnswer: 1,
    explanation:
      'Documentation should enable an experienced auditor to understand the nature, timing, and extent of procedures performed, evidence obtained, and conclusions reached.',
    reference: 'AU-C 230.08',
  },
  {
    id: 'aud-prof-053',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    subtopic: 'Subsequent Events',
    difficulty: 'hard',
    question:
      'For subsequent events discovered after the audit report date but before issuance, the auditor should:',
    options: [
      'Take no action since the report is already dated',
      'Evaluate whether adjustment or disclosure is needed and extend procedures to the new date',
      'Issue a separate report on the subsequent event',
      'Withdraw from the engagement',
    ],
    correctAnswer: 1,
    explanation:
      'Events discovered after the report date but before issuance require the auditor to discuss with management, determine if financial statements need revision, and extend subsequent events procedures to the new date.',
    reference: 'AU-C 560.12',
  },
  {
    id: 'aud-prof-054',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    subtopic: 'Communication',
    difficulty: 'medium',
    question: 'Required communications with those charged with governance include all EXCEPT:',
    options: [
      'Planned scope and timing of the audit',
      'Significant audit findings',
      'Client management salary information',
      'Auditor independence',
    ],
    correctAnswer: 2,
    explanation:
      'Required communications include: planned scope and timing, significant findings (including difficulties), and auditor independence. Detailed management compensation is not a required audit communication.',
    reference: 'AU-C 260.12',
  },

  // ==========================================
  // SPECIAL TOPICS
  // ==========================================
  {
    id: 'aud-spec-050',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-special',
    topic: 'Special Considerations',
    subtopic: 'Group Audits',
    difficulty: 'hard',
    question: 'In a group audit, the group engagement partner is responsible for:',
    options: [
      'Only the work performed by the group engagement team',
      'The direction, supervision, and performance of the group audit, including work of component auditors',
      'Delegating all responsibility to component auditors',
      'Auditing only the parent company',
    ],
    correctAnswer: 1,
    explanation:
      'The group engagement partner is responsible for the direction, supervision, and performance of the entire group audit engagement, including overseeing and evaluating work of component auditors.',
    reference: 'AU-C 600.11',
  },
  {
    id: 'aud-spec-051',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-special',
    topic: 'Special Considerations',
    subtopic: 'Related Parties',
    difficulty: 'medium',
    question: 'Related party transactions require:',
    options: [
      'No special consideration',
      'Identification and risk assessment but not disclosure',
      'Identification, evaluation of accounting treatment, and appropriate disclosure',
      'Automatic rejection by the auditor',
    ],
    correctAnswer: 2,
    explanation:
      'The auditor must identify related parties, understand their relationships and transactions, assess risks, evaluate accounting treatment, and determine if appropriate disclosure is made.',
    reference: 'AU-C 550.12',
  },
  {
    id: 'aud-spec-052',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-special',
    topic: 'Special Considerations',
    subtopic: 'Estimates',
    difficulty: 'hard',
    question: "When evaluating management's point estimate, the auditor should:",
    options: [
      "Accept the estimate if it falls within the auditor's range",
      "Require management to use the auditor's point estimate",
      'Consider whether the estimate is reasonable and indicators of possible management bias',
      'Always use a specialist to evaluate estimates',
    ],
    correctAnswer: 2,
    explanation:
      "The auditor evaluates whether management's estimate is reasonable and whether indicators of possible management bias exist. Even estimates within a range may indicate bias if consistently at one end.",
    reference: 'AU-C 540.17',
  },
  {
    id: 'aud-spec-053',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-special',
    topic: 'Special Considerations',
    subtopic: 'Using Specialists',
    difficulty: 'medium',
    question: "When using an auditor's specialist, the auditor should:",
    options: [
      "Accept the specialist's findings without evaluation",
      "Evaluate the specialist's competence, capabilities, and objectivity",
      "Disclose the specialist's name in the audit report",
      'Have the specialist sign the audit report',
    ],
    correctAnswer: 1,
    explanation:
      "The auditor must evaluate the specialist's competence, capabilities, and objectivity, and assess whether the work is adequate for audit purposes. Reference to specialist is generally not made in the report.",
    reference: 'AU-C 620.09',
  },
  {
    id: 'aud-spec-054',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-special',
    topic: 'Special Considerations',
    subtopic: 'Service Organizations',
    difficulty: 'hard',
    question: 'A Type 2 SOC 1 report differs from a Type 1 report because it:',
    options: [
      'Covers a shorter time period',
      'Includes testing of operating effectiveness of controls over a period',
      'Does not include a description of controls',
      'Is less detailed',
    ],
    correctAnswer: 1,
    explanation:
      'A Type 2 report includes both the description and design of controls (like Type 1) AND tests of operating effectiveness over a period of time (typically 6-12 months).',
    reference: 'AU-C 402.A17',
  },

  // ==========================================
  // ADDITIONAL EVIDENCE QUESTIONS
  // ==========================================
  {
    id: 'aud-evid-055',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'External Confirmations',
    difficulty: 'medium',
    question:
      'Management refuses to allow the auditor to send accounts receivable confirmations. The auditor should:',
    options: [
      "Accept management's refusal and perform alternative procedures",
      'Evaluate the refusal, inquire about reasons, and consider implications for risk assessment',
      'Immediately withdraw from the engagement',
      'Issue an adverse opinion',
    ],
    correctAnswer: 1,
    explanation:
      'The auditor should inquire about reasons for refusal, evaluate validity of reasons, consider implications for risk assessment, perform alternative procedures, and if unable to obtain sufficient evidence, consider report implications.',
    reference: 'AU-C 505.08',
  },
  {
    id: 'aud-evid-056',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Inventory Observation',
    difficulty: 'easy',
    question: 'The primary reason for observing inventory counts is to:',
    options: [
      'Detect obsolete inventory',
      'Verify the existence of inventory',
      'Determine inventory value',
      'Test cutoff procedures',
    ],
    correctAnswer: 1,
    explanation:
      'The primary purpose of inventory observation is to obtain evidence about the existence assertion. While observation may also provide some evidence about condition, valuation requires additional procedures.',
    reference: 'AU-C 501.04',
  },
  {
    id: 'aud-evid-057',
    section: 'AUD',
    blueprintArea: 'AUD-II',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    subtopic: 'Substantive Procedures',
    difficulty: 'medium',
    question: 'Dual-purpose tests allow the auditor to:',
    options: [
      'Test two different account balances simultaneously',
      'Test controls and substantive matters from the same transaction',
      'Use two different sampling methods',
      'Obtain evidence from two different sources',
    ],
    correctAnswer: 1,
    explanation:
      'Dual-purpose tests allow testing both the operating effectiveness of a control and the substantive aspects of a transaction using the same sample, improving efficiency.',
    reference: 'AU-C 330.A31',
  },

  // ==========================================
  // SSARS AND SSAE
  // ==========================================
  {
    id: 'aud-ssars-050',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-other',
    topic: 'Other Services',
    subtopic: 'Compilation',
    difficulty: 'easy',
    question: 'In a compilation engagement, the accountant:',
    options: [
      'Provides limited assurance',
      'Provides reasonable assurance',
      'Provides no assurance',
      'Provides negative assurance',
    ],
    correctAnswer: 2,
    explanation:
      'In a compilation, the accountant assists management in presenting financial statements without providing any assurance. The accountant is required to read the statements for obvious material misstatements.',
    reference: 'SSARS AR-C 80.04',
  },
  {
    id: 'aud-ssars-051',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-other',
    topic: 'Other Services',
    subtopic: 'Review',
    difficulty: 'medium',
    question: 'A review engagement provides:',
    options: ['No assurance', 'Limited assurance', 'Reasonable assurance', 'Absolute assurance'],
    correctAnswer: 1,
    explanation:
      'A review provides limited assurance (negative assurance) that no material modifications are needed. It primarily involves analytical procedures and inquiries, not the detailed testing of an audit.',
    reference: 'SSARS AR-C 90.05',
  },
  {
    id: 'aud-ssars-052',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-other',
    topic: 'Other Services',
    subtopic: 'Agreed-Upon Procedures',
    difficulty: 'medium',
    question: 'In an agreed-upon procedures engagement:',
    options: [
      'The auditor determines appropriate procedures',
      'The engaging party specifies the procedures',
      'The auditor provides assurance on the subject matter',
      'GAAS must be followed',
    ],
    correctAnswer: 1,
    explanation:
      'In agreed-upon procedures, the engaging party and often the responsible party specify the procedures. The practitioner reports findings without providing assurance on the subject matter.',
    reference: 'SSAE AT-C 215.09',
  },
  {
    id: 'aud-ssars-053',
    section: 'AUD',
    blueprintArea: 'AUD-I',
    topicId: 'aud-other',
    topic: 'Other Services',
    subtopic: 'Preparation',
    difficulty: 'easy',
    question: 'A preparation engagement differs from a compilation because:',
    options: [
      'No report is required in a preparation engagement',
      'Independence is required for preparation',
      'Preparation provides more assurance',
      'Preparation requires analytical procedures',
    ],
    correctAnswer: 0,
    explanation:
      "In a preparation engagement, no report is issued by the accountant. A legend is required on each page stating no assurance is provided. Compilations require an accountant's report.",
    reference: 'SSARS AR-C 70.06',
  },
];
