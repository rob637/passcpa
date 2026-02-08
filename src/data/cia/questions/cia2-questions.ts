/**
 * CIA Part 2: Practice of Internal Auditing
 * 100 questions | 2 hours | Scaled score 600/750 to pass
 * 
 * Domain I: Managing the Internal Audit Activity (20%)
 * Domain II: Planning the Engagement (20%)
 * Domain III: Performing the Engagement (40%)
 * Domain IV: Communicating Results and Monitoring Progress (20%)
 */

import { Question } from '../../../types';

export const CIA2_QUESTIONS: Question[] = [
  // ============================================================================
  // DOMAIN I: MANAGING THE INTERNAL AUDIT ACTIVITY (20%)
  // ============================================================================
  
  {
    id: 'CIA2-001',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Which of the following sampling methods gives every item in the population an equal chance of being selected?',
    options: [
      'Haphazard sampling',
      'Random sampling',
      'Judgmental sampling',
      'Block sampling'
    ],
    correctAnswer: 1,
    explanation: 'Random sampling is a statistical sampling method where every item in the population has an equal probability of selection. This allows for statistical projection of results.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Sampling'
  },
  {
    id: 'CIA2-002',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'During a risk assessment, an internal auditor identifies a risk that has a high potential impact but a very low likelihood of occurrence. The most appropriate response strategy would generally be to:',
    options: [
      'Avoid the risk',
      'Accept the risk',
      'Share/Insure the risk',
      'Control the risk'
    ],
    correctAnswer: 2,
    explanation: 'Risks with high impact but low likelihood (catastrophic risks) are typically best managed by sharing or transferring the risk, such as purchasing insurance.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk Assessment'
  },
  {
    id: 'CIA2-003',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Which of the following describes a key characteristic of a "preventive" control?',
    options: [
      'It detects errors after they have occurred',
      'It corrects errors that have been detected',
      'It promotes desirable actions',
      'It deters an undesirable event from occurring'
    ],
    correctAnswer: 3,
    explanation: 'Preventive controls are designed to stop an undesirable event (error or irregularity) from occurring in the first place (e.g., passwords, segregation of duties).',
    topic: 'Performing the Engagement',
    subtopic: 'Internal Controls'
  },
  {
    id: 'CIA2-004',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'The risk-based audit plan should be developed based on:',
    options: [
      'Management requests only',
      'Prior year audit plan only',
      'A risk assessment that considers input from management and the Board',
      'Available audit resources'
    ],
    correctAnswer: 2,
    explanation: 'Standard 2010 requires the CAE to establish a risk-based plan that considers input from senior management and the Board. The plan should prioritize internal audit activities based on risk.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Audit Planning'
  },
  {
    id: 'CIA2-005',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'The CAE must share information and coordinate activities with:',
    options: [
      'Only external auditors',
      'Only internal stakeholders',
      'Other internal and external providers of assurance and consulting services',
      'Only the Board'
    ],
    correctAnswer: 2,
    explanation: 'Standard 2050 requires coordination with other providers of assurance and consulting services to ensure proper coverage and minimize duplication of efforts.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Coordination'
  },
  {
    id: 'CIA2-006',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'When developing the annual audit plan, the CAE should consider all of the following EXCEPT:',
    options: [
      'Results of previous engagements',
      'Significant changes in the organization',
      'Personal preferences of audit staff',
      'Input from senior management'
    ],
    correctAnswer: 2,
    explanation: 'The audit plan should be based on risk assessment, organizational changes, prior results, and stakeholder input—not personal preferences of staff. Planning must be objective and risk-based.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Audit Planning'
  },
  {
    id: 'CIA2-007',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Internal audit resource allocation should be based primarily on:',
    options: [
      'Equal time for all auditable areas',
      'Risk assessments prioritizing higher-risk areas',
      'Management requests',
      'Prior year allocation'
    ],
    correctAnswer: 1,
    explanation: 'Resources should be allocated based on risk assessments. Higher-risk areas should receive more audit attention and resources to ensure adequate coverage of significant risks.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Resource Management'
  },
  {
    id: 'CIA2-008',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'The internal audit activity adds value to the organization when:',
    options: [
      'Findings are always negative',
      'It provides objective, relevant assurance and contributes to effectiveness of governance, risk, and control',
      'It replaces management\'s responsibilities',
      'Maximum number of findings are reported'
    ],
    correctAnswer: 1,
    explanation: 'Internal audit adds value by providing objective and relevant assurance and contributing to the effectiveness and efficiency of governance, risk management, and control processes.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Value of Internal Audit'
  },
  {
    id: 'CIA2-009',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'When an external service provider is used to perform internal audit services:',
    options: [
      'The CAE has no responsibility for the work',
      'The CAE must ensure the provider is competent and the work is properly supervised',
      'The external provider reports directly to the Board',
      'Independence is automatically impaired'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2070 states the CAE must ensure that external service providers are competent and properly supervised. The CAE retains responsibility for the internal audit activity.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'External Service Providers'
  },
  {
    id: 'CIA2-010',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'A significant deviation from the approved audit plan occurs when:',
    options: [
      'Any change is made to the plan',
      'Changes in staffing occur',
      'Major changes significantly affect the ability to achieve objectives',
      'Budget is exceeded by any amount'
    ],
    correctAnswer: 2,
    explanation: 'Significant deviations occur when changes significantly affect the ability to achieve audit objectives. These must be communicated to senior management and the Board.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Plan Management'
  },

  // ============================================================================
  // DOMAIN II: PLANNING THE ENGAGEMENT (20%)
  // ============================================================================

  {
    id: 'CIA2-011',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Engagement objectives should reflect:',
    options: [
      'Only management\'s concerns',
      'Risks related to the activity under review',
      'Prior year findings only',
      'Available time and resources'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2210 requires engagement objectives to reflect the results of a risk assessment. Objectives should address the probability of significant errors, fraud, noncompliance, and other exposures.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Objectives'
  },
  {
    id: 'CIA2-012',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'An engagement work program should include:',
    options: [
      'Only the budget',
      'Staff assignments only',
      'Procedures for identifying, analyzing, evaluating, and documenting information',
      'Reporting format only'
    ],
    correctAnswer: 2,
    explanation: 'Standard 2240 requires work programs to include procedures for identifying, analyzing, evaluating, and documenting information during the engagement.',
    topic: 'Planning the Engagement',
    subtopic: 'Work Programs'
  },
  {
    id: 'CIA2-013',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'The scope of an assurance engagement should include consideration of:',
    options: [
      'Systems, records, personnel, and physical properties only if suspected fraud',
      'Relevant systems, records, personnel, and physical properties',
      'Only financial systems',
      'Only automated controls'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2220 states the scope must include consideration of relevant systems, records, personnel, and physical properties, including those under control of third parties.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Scope'
  },
  {
    id: 'CIA2-014',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'A preliminary survey (engagement planning) should NOT:',
    options: [
      'Identify the key control objectives',
      'Review prior audit reports',
      'Finalize engagement conclusions',
      'Understand the process being audited'
    ],
    correctAnswer: 2,
    explanation: 'Preliminary survey is for planning purposes—understanding the area, identifying risks and controls, and developing objectives. Conclusions are developed during and after fieldwork, not during planning.',
    topic: 'Planning the Engagement',
    subtopic: 'Preliminary Survey'
  },
  {
    id: 'CIA2-015',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Process maps and flowcharts are used during engagement planning to:',
    options: [
      'Document audit findings',
      'Identify control points and understand the process flow',
      'Communicate results to management',
      'Replace work programs'
    ],
    correctAnswer: 1,
    explanation: 'Flowcharts help auditors understand process flow, identify control points and weaknesses, and develop effective audit procedures. They are planning and analytical tools.',
    topic: 'Planning the Engagement',
    subtopic: 'Process Analysis'
  },
  {
    id: 'CIA2-016',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'The engagement opening meeting typically includes discussion of:',
    options: [
      'Final conclusions',
      'Scope, objectives, timing, and resources',
      'Penalties for non-cooperation',
      'Personnel evaluations'
    ],
    correctAnswer: 1,
    explanation: 'The opening meeting typically covers engagement scope, objectives, timing, resources, and coordination with the auditee. It sets expectations and facilitates cooperation.',
    topic: 'Planning the Engagement',
    subtopic: 'Client Communication'
  },
  {
    id: 'CIA2-017',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Analytical procedures during planning help auditors:',
    options: [
      'Avoid testing completely',
      'Identify unusual relationships and potential risk areas',
      'Replace the need for a risk assessment',
      'Eliminate substantive testing'
    ],
    correctAnswer: 1,
    explanation: 'Analytical procedures help identify unusual fluctuations, trends, and relationships that may indicate higher risk areas requiring additional attention during the engagement.',
    topic: 'Planning the Engagement',
    subtopic: 'Analytical Review'
  },
  {
    id: 'CIA2-018',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'In planning an engagement, which factor most directly affects sample size?',
    options: [
      'Number of auditors assigned',
      'Time available for the engagement',
      'Acceptable level of sampling risk',
      'Prior year sample size'
    ],
    correctAnswer: 2,
    explanation: 'Sample size is primarily determined by the acceptable level of sampling risk—lower acceptable risk requires larger sample sizes. Time and staff are resource constraints, not sample size determinants.',
    topic: 'Planning the Engagement',
    subtopic: 'Sampling Planning'
  },
  {
    id: 'CIA2-019',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Resource allocation for an engagement should consider:',
    options: [
      'Only senior auditor availability',
      'Knowledge, skills, competencies, and other resources needed to achieve objectives',
      'Only budget constraints',
      'Only time limitations'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2230 requires auditors to determine appropriate resources based on the nature and complexity of the engagement, time constraints, and available resources.',
    topic: 'Planning the Engagement',
    subtopic: 'Resource Allocation'
  },
  {
    id: 'CIA2-020',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'An engagement work program must be:',
    options: [
      'Developed after fieldwork is complete',
      'Approved prior to implementation',
      'Developed by external auditors',
      'The same as prior year'
    ],
    correctAnswer: 1,
    explanation: 'Work programs must be approved before implementation and amended promptly if changes are required during the engagement. Approval ensures appropriate procedures are planned.',
    topic: 'Planning the Engagement',
    subtopic: 'Work Programs'
  },

  // ============================================================================
  // DOMAIN III: PERFORMING THE ENGAGEMENT (40%)
  // ============================================================================

  {
    id: 'CIA2-021',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Sufficient evidence is:',
    options: [
      'Any evidence gathered',
      'Evidence that is factual, adequate, and convincing',
      'The minimum evidence required',
      'Only documentary evidence'
    ],
    correctAnswer: 1,
    explanation: 'Sufficient evidence is factual, adequate, and convincing so that a prudent, informed person would reach the same conclusions as the auditor. Quantity alone is not sufficient.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Evidence'
  },
  {
    id: 'CIA2-022',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'Relevant evidence:',
    options: [
      'Is any evidence available',
      'Supports engagement observations and recommendations',
      'Has no relationship to objectives',
      'Must be documentary'
    ],
    correctAnswer: 1,
    explanation: 'Relevant evidence supports engagement observations and recommendations and has a logical, sensible relationship to the findings it supports.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Evidence'
  },
  {
    id: 'CIA2-023',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Which type of evidence is generally considered most reliable?',
    options: [
      'Oral representations from management',
      'Internally generated documents',
      'Evidence from independent external sources',
      'Photocopies of documents'
    ],
    correctAnswer: 2,
    explanation: 'Evidence from independent external sources (confirmations, external documents) is generally more reliable than internally generated evidence or oral representations.',
    topic: 'Performing the Engagement',
    subtopic: 'Evidence Reliability'
  },
  {
    id: 'CIA2-024',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Inquiry alone is:',
    options: [
      'Sufficient for all audit purposes',
      'The most reliable form of evidence',
      'Not sufficient evidence on its own',
      'Required for every engagement'
    ],
    correctAnswer: 2,
    explanation: 'Inquiry alone is rarely sufficient evidence. It should be corroborated with other procedures such as observation, inspection, or analysis.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Procedures'
  },
  {
    id: 'CIA2-025',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'Observation as an audit technique is used to:',
    options: [
      'Verify mathematical accuracy',
      'Witness activities as they occur',
      'Confirm balances with third parties',
      'Recalculate totals'
    ],
    correctAnswer: 1,
    explanation: 'Observation involves witnessing processes or activities as they occur. It provides evidence about the performance of a process or control at a point in time.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Procedures'
  },
  {
    id: 'CIA2-026',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Attribute sampling is most appropriate when the auditor wants to:',
    options: [
      'Estimate a dollar amount',
      'Test for a specific characteristic (e.g., compliance rate)',
      'Select a judgmental sample',
      'Perform trend analysis'
    ],
    correctAnswer: 1,
    explanation: 'Attribute sampling is used to estimate the rate of occurrence of a characteristic (attribute) in a population, such as the error rate or compliance rate.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling Techniques'
  },
  {
    id: 'CIA2-027',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Variables sampling is used to:',
    options: [
      'Test for presence of an attribute',
      'Estimate a numerical amount such as a dollar value',
      'Select a haphazard sample',
      'Test compliance with policies'
    ],
    correctAnswer: 1,
    explanation: 'Variables sampling estimates numerical characteristics of a population, such as the dollar value of accounts or inventory. It is used for substantive testing of amounts.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling Techniques'
  },
  {
    id: 'CIA2-028',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Non-statistical sampling is characterized by:',
    options: [
      'Mathematical determination of sample size and evaluation',
      'Use of auditor judgment throughout the sampling process',
      'Always producing unreliable results',
      'Being prohibited by the Standards'
    ],
    correctAnswer: 1,
    explanation: 'Non-statistical (judgmental) sampling relies on auditor judgment for sample selection, size, and evaluation. It is permissible but does not allow statistical projection of results.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling Techniques'
  },
  {
    id: 'CIA2-029',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'Working papers should include:',
    options: [
      'Only negative findings',
      'Documentation of information gathered, analyses performed, and conclusions reached',
      'Personal opinions about management',
      'Only information supporting observations'
    ],
    correctAnswer: 1,
    explanation: 'Working papers document the information gathered, analyses performed, and conclusions reached. They support the findings and recommendations in the engagement report.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation'
  },
  {
    id: 'CIA2-030',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'The primary purpose of engagement documentation is to:',
    options: [
      'Satisfy regulatory requirements',
      'Support engagement conclusions and demonstrate conformance with Standards',
      'Bill the client',
      'Evaluate auditor performance'
    ],
    correctAnswer: 1,
    explanation: 'Documentation provides the principal support for engagement results and confirms the engagement was conducted in conformance with the Standards.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation'
  },
  {
    id: 'CIA2-031',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Computer-assisted audit techniques (CAATs) can be used to:',
    options: [
      'Replace all manual procedures',
      'Test entire populations efficiently and perform data analysis',
      'Eliminate the need for work programs',
      'Avoid understanding the system'
    ],
    correctAnswer: 1,
    explanation: 'CAATs enable testing of large volumes of data, analyzing entire populations, and performing complex calculations efficiently. They enhance but do not replace professional judgment.',
    topic: 'Performing the Engagement',
    subtopic: 'Data Analytics'
  },
  {
    id: 'CIA2-032',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'When evaluating controls, an auditor should assess:',
    options: [
      'Only automated controls',
      'Whether controls are designed effectively and operating as intended',
      'Only controls that failed',
      'Management\'s opinion of controls'
    ],
    correctAnswer: 1,
    explanation: 'Control evaluation includes assessing design adequacy (will the control prevent/detect the risk if operating as designed) and operating effectiveness (is the control working as intended).',
    topic: 'Performing the Engagement',
    subtopic: 'Control Evaluation'
  },
  {
    id: 'CIA2-033',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'Engagement supervision includes:',
    options: [
      'Only reviewing final reports',
      'Ensuring objectives are achieved, quality is assured, and staff are developed',
      'Performing all procedures personally',
      'Delegating all responsibilities'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2340 requires supervision to ensure engagement objectives are achieved, quality is assured, and staff development occurs. Supervision is ongoing throughout the engagement.',
    topic: 'Performing the Engagement',
    subtopic: 'Supervision'
  },
  {
    id: 'CIA2-034',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'An observation consists of which elements?',
    options: [
      'Condition only',
      'Condition, criteria, cause, and effect',
      'Recommendations only',
      'Just criteria and condition'
    ],
    correctAnswer: 1,
    explanation: 'A well-developed finding includes: Condition (what is), Criteria (what should be), Cause (why it happened), and Effect (impact or potential impact).',
    topic: 'Performing the Engagement',
    subtopic: 'Observation Development'
  },
  {
    id: 'CIA2-035',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Before including a finding in the report, the auditor should:',
    options: [
      'Surprise management with the finding',
      'Discuss findings with appropriate levels of management',
      'Withhold information until report issuance',
      'Assume management is aware'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2440 requires discussing conclusions and recommendations with appropriate levels of management before issuing final communications. This ensures accuracy and buy-in.',
    topic: 'Performing the Engagement',
    subtopic: 'Finding Validation'
  },
  {
    id: 'CIA2-036',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'When evidence indicates potential fraud, the auditor should:',
    options: [
      'Complete the engagement without action',
      'Confront the suspected individual',
      'Immediately inform appropriate authorities within the organization',
      'Publish findings in the audit report'
    ],
    correctAnswer: 2,
    explanation: 'Suspected fraud should be reported to appropriate authorities within the organization. The CAE should assess escalation needs and consider notifying the Board if senior management is involved.',
    topic: 'Performing the Engagement',
    subtopic: 'Fraud Response'
  },
  {
    id: 'CIA2-037',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'Analytical procedures compare:',
    options: [
      'Auditors with each other',
      'Actual data to expected values or trends',
      'Only current year to prior year',
      'Client data to competitor data'
    ],
    correctAnswer: 1,
    explanation: 'Analytical procedures evaluate information by comparing actual data to expectations (budgets, prior periods, industry data, calculated amounts) to identify unusual patterns.',
    topic: 'Performing the Engagement',
    subtopic: 'Analytical Procedures'
  },
  {
    id: 'CIA2-038',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Tolerable error (precision) in sampling affects:',
    options: [
      'Nothing related to the sample',
      'The sample size required',
      'Only the reporting format',
      'The audit fee'
    ],
    correctAnswer: 1,
    explanation: 'Tolerable error (precision) inversely affects sample size—lower tolerable error requires larger sample sizes to achieve the desired confidence level.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling'
  },
  {
    id: 'CIA2-039',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Control testing is designed to:',
    options: [
      'Verify account balances',
      'Determine if controls are operating effectively',
      'Calculate sample sizes',
      'Replace supervision'
    ],
    correctAnswer: 1,
    explanation: 'Control testing (tests of controls) evaluates whether controls are operating effectively as designed. This differs from substantive testing which verifies amounts or details.',
    topic: 'Performing the Engagement',
    subtopic: 'Control Testing'
  },
  {
    id: 'CIA2-040',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'When completing work papers, tick marks should:',
    options: [
      'Not be explained',
      'Be explained in a legend',
      'Be standardized across all organizations',
      'Only be used for financial audits'
    ],
    correctAnswer: 1,
    explanation: 'Tick marks should be explained in a legend on the working paper or in a standardized index. Clear explanations ensure reviewers understand the procedures performed.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation'
  },

  // ============================================================================
  // DOMAIN IV: COMMUNICATING RESULTS AND MONITORING PROGRESS (20%)
  // ============================================================================

  {
    id: 'CIA2-041',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Communication of engagement results must include:',
    options: [
      'Only positive findings',
      'Objectives, scope, and conclusions at a minimum',
      'Only control weaknesses',
      'Recommendations only if requested'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2410 requires communications to include engagement objectives, scope, and conclusions, along with observations, recommendations, and action plans as appropriate.',
    topic: 'Communicating Results',
    subtopic: 'Report Content'
  },
  {
    id: 'CIA2-042',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'Engagement communications should be:',
    options: [
      'Lengthy and detailed',
      'Accurate, objective, clear, concise, constructive, complete, and timely',
      'Only in written format',
      'Limited to negative findings'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2420 requires communications to have these seven quality criteria to ensure effectiveness and usefulness to stakeholders.',
    topic: 'Communicating Results',
    subtopic: 'Communication Quality'
  },
  {
    id: 'CIA2-043',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'An overall opinion in an audit report:',
    options: [
      'Is always required',
      'May be provided when supported by sufficient results',
      'Should be avoided',
      'Can only be positive'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2450 states that when an overall opinion is issued, it must be supported by sufficient, reliable, relevant, and useful information. An overall opinion is not always required.',
    topic: 'Communicating Results',
    subtopic: 'Opinions'
  },
  {
    id: 'CIA2-044',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'When internal audit disagrees with management\'s decision not to correct a significant issue, the CAE should:',
    options: [
      'Accept management\'s decision',
      'Report the matter to the Board if unresolved with senior management',
      'Remove the finding from the report',
      'Close the issue without further action'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2600 requires the CAE to escalate to the Board when management accepts a level of risk that may be unacceptable to the organization.',
    topic: 'Communicating Results',
    subtopic: 'Escalation'
  },
  {
    id: 'CIA2-045',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Follow-up on engagement findings is:',
    options: [
      'Optional',
      'Required to ensure management actions have been effectively implemented',
      'Only needed for high-risk findings',
      'Management\'s sole responsibility'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2500 requires a follow-up process to monitor and ensure management actions have been effectively implemented or that management has accepted the risk of not taking action.',
    topic: 'Monitoring Progress',
    subtopic: 'Follow-up'
  },
  {
    id: 'CIA2-046',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'An exit conference is typically held to:',
    options: [
      'Begin fieldwork',
      'Discuss findings and obtain management responses before issuing the final report',
      'Plan the next audit',
      'Evaluate auditor performance'
    ],
    correctAnswer: 1,
    explanation: 'Exit conferences discuss preliminary findings, verify accuracy, obtain management perspectives and responses, and ensure no surprises in the final report.',
    topic: 'Communicating Results',
    subtopic: 'Client Communication'
  },
  {
    id: 'CIA2-047',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Management\'s response to engagement findings should include:',
    options: [
      'Nothing is required',
      'Action to be taken, responsible party, and target date',
      'Only agreement or disagreement',
      'Budget impact only'
    ],
    correctAnswer: 1,
    explanation: 'Management responses should include action plans with specific actions, responsible parties, and target completion dates. This enables effective follow-up.',
    topic: 'Communicating Results',
    subtopic: 'Management Response'
  },
  {
    id: 'CIA2-048',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'If a final communication contains an error, the CAE should:',
    options: [
      'Issue a correction to all original recipients',
      'Take no action if the error is minor',
      'Wait for someone to notice',
      'Recall all copies without explanation'
    ],
    correctAnswer: 0,
    explanation: 'Standard 2421 requires the CAE to communicate corrected information to all parties who received the original communication when errors or omissions are identified.',
    topic: 'Communicating Results',
    subtopic: 'Error Correction'
  },
  {
    id: 'CIA2-049',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'When scope limitations prevent completion of an engagement, the auditor should:',
    options: [
      'Complete the engagement without disclosure',
      'Disclose the limitation in the final communication',
      'Abandon the engagement without communication',
      'Report only on areas that were completed'
    ],
    correctAnswer: 1,
    explanation: 'Scope limitations must be disclosed in the final communication along with their potential impact. This ensures users understand the limitations of the conclusions.',
    topic: 'Communicating Results',
    subtopic: 'Scope Limitations'
  },
  {
    id: 'CIA2-050',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'Progress communications during an engagement are:',
    options: [
      'Never appropriate',
      'Appropriate for extended engagements to keep stakeholders informed',
      'Required for every engagement',
      'Only for consulting engagements'
    ],
    correctAnswer: 1,
    explanation: 'Progress communications may be appropriate for extended or complex engagements to keep stakeholders informed and identify issues early. They are not mandatory for every engagement.',
    topic: 'Communicating Results',
    subtopic: 'Interim Communications'
  },

  // Additional questions for comprehensive coverage

  {
    id: 'CIA2-051',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Benchmarking involves comparing:',
    options: [
      'Auditor performance only',
      'Organizational processes or performance with best practices or peers',
      'Only internal departments',
      'Current year to budget only'
    ],
    correctAnswer: 1,
    explanation: 'Benchmarking compares organizational processes, performance, or practices against best practices or peer organizations to identify improvement opportunities.',
    topic: 'Performing the Engagement',
    subtopic: 'Analytical Techniques'
  },
  {
    id: 'CIA2-052',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Stratified sampling is used when:',
    options: [
      'The population is homogeneous',
      'The population has distinct subgroups with different characteristics',
      'Random numbers are not available',
      'Sample size is unlimited'
    ],
    correctAnswer: 1,
    explanation: 'Stratified sampling divides the population into subgroups (strata) with similar characteristics, then samples each stratum. This improves efficiency when subpopulations have different risk levels.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling Techniques'
  },
  {
    id: 'CIA2-053',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Risk-based audit approach means:',
    options: [
      'Auditing only high-risk areas',
      'Focusing audit resources based on risk assessment',
      'Avoiding risky areas',
      'Equal coverage of all areas'
    ],
    correctAnswer: 1,
    explanation: 'Risk-based auditing prioritizes audit resources toward areas of highest risk, ensuring limited resources address the most significant risks to the organization.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Risk-Based Planning'
  },
  {
    id: 'CIA2-054',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'Control self-assessment (CSA) is:',
    options: [
      'An external audit technique',
      'A process where management and staff evaluate controls',
      'A compliance requirement',
      'Only for IT controls'
    ],
    correctAnswer: 1,
    explanation: 'CSA is a collaborative process where management and staff evaluate the adequacy of controls. Internal audit may facilitate but does not own the assessment.',
    topic: 'Performing the Engagement',
    subtopic: 'Control Assessment'
  },
  {
    id: 'CIA2-055',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Confirmation is an audit procedure that:',
    options: [
      'Only counts physical assets',
      'Obtains verification from external third parties',
      'Reviews internal documents',
      'Observes processes'
    ],
    correctAnswer: 1,
    explanation: 'Confirmation involves obtaining verification directly from external third parties (e.g., bank confirmations, accounts receivable confirmations). It provides reliable external evidence.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Procedures'
  },
  {
    id: 'CIA2-056',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'The concept of professional skepticism means:',
    options: [
      'Distrusting all management assertions',
      'Maintaining a questioning mind and critical assessment of evidence',
      'Refusing to accept any evidence',
      'Assuming fraud exists'
    ],
    correctAnswer: 1,
    explanation: 'Professional skepticism involves a questioning mind and critical assessment of audit evidence. It does not mean distrust but requires vigilance and evaluation of evidence reliability.',
    topic: 'Performing the Engagement',
    subtopic: 'Professional Judgment'
  },
  {
    id: 'CIA2-057',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Walk-through testing involves:',
    options: [
      'Physical inspection of facilities',
      'Tracing a transaction through the process from start to finish',
      'Only reviewing documentation',
      'Testing all transactions'
    ],
    correctAnswer: 1,
    explanation: 'Walk-through testing traces transactions through the process from initiation to completion to understand control flow, verify process understanding, and identify control points.',
    topic: 'Performing the Engagement',
    subtopic: 'Control Testing'
  },
  {
    id: 'CIA2-058',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'Materiality in auditing refers to:',
    options: [
      'Physical nature of evidence',
      'The significance of an amount or matter that could influence decisions',
      'The quantity of evidence',
      'Cost of audit procedures'
    ],
    correctAnswer: 1,
    explanation: 'Materiality is the significance of an amount, transaction, or discrepancy that could influence stakeholder decisions. It helps auditors focus on what matters most.',
    topic: 'Planning the Engagement',
    subtopic: 'Materiality'
  },
  {
    id: 'CIA2-059',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'A consulting engagement differs from an assurance engagement in that:',
    options: [
      'Standards do not apply to consulting',
      'Consulting does not add value',
      'Nature and scope are agreed upon with the client',
      'No documentation is required'
    ],
    correctAnswer: 2,
    explanation: 'In consulting engagements, the nature and scope are agreed upon with the engagement client. Assurance engagements have standardized scope based on risk assessment.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Types of Engagements'
  },
  {
    id: 'CIA2-060',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'When internal audit performs consulting and the engagement reveals control deficiencies:',
    options: [
      'The deficiencies should be ignored',
      'Significant control deficiencies should be communicated to management',
      'A separate assurance engagement is required',
      'The findings should only go to the client'
    ],
    correctAnswer: 1,
    explanation: 'When significant control deficiencies are identified during consulting, they must be communicated to management and potentially the Board, regardless of the engagement type.',
    topic: 'Communicating Results',
    subtopic: 'Consulting Findings'
  },
  {
    id: 'CIA2-061',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Retention of engagement records should consider:',
    options: [
      'Auditor preference only',
      'Legal, regulatory, and organizational requirements',
      'Storage space availability',
      'Client preference only'
    ],
    correctAnswer: 1,
    explanation: 'Record retention must comply with legal, regulatory, and organizational requirements. The CAE should establish retention policies consistent with these requirements.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation'
  },
  {
    id: 'CIA2-062',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'A root cause is:',
    options: [
      'A symptom of a problem',
      'The underlying reason for a control failure or deficiency',
      'The effect of a finding',
      'The recommendation'
    ],
    correctAnswer: 1,
    explanation: 'Root cause is the underlying reason or primary driver of a control failure or deficiency. Identifying root cause helps develop effective corrective actions.',
    topic: 'Performing the Engagement',
    subtopic: 'Observation Development'
  },
  {
    id: 'CIA2-063',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'When an auditor uses the work of an external expert:',
    options: [
      'The CAE has no responsibility for the work',
      'The CAE must assess the expert\'s competence and evaluate the adequacy of the work',
      'The expert becomes part of internal audit',
      'Standards do not apply'
    ],
    correctAnswer: 1,
    explanation: 'When using experts, the CAE must assess their competence, objectivity, and the adequacy of their work. The CAE retains responsibility for conclusions related to that work.',
    topic: 'Performing the Engagement',
    subtopic: 'Use of Experts'
  },
  {
    id: 'CIA2-064',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Continuous auditing is characterized by:',
    options: [
      'Annual audit cycles only',
      'Real-time or near real-time testing and monitoring using technology',
      'Eliminating audit planning',
      'Replacing all traditional auditing'
    ],
    correctAnswer: 1,
    explanation: 'Continuous auditing uses technology to perform testing and monitoring on a real-time or near real-time basis, enabling timely identification of exceptions and risks.',
    topic: 'Performing the Engagement',
    subtopic: 'Continuous Auditing'
  },
  {
    id: 'CIA2-065',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Engagement risk is the risk that:',
    options: [
      'The auditor will be sued',
      'The auditor provides an incorrect opinion or fails to identify significant issues',
      'The client disagrees with findings',
      'The budget is exceeded'
    ],
    correctAnswer: 1,
    explanation: 'Engagement risk is the risk that the auditor expresses an inappropriate opinion or fails to identify significant issues. It is managed through planning, testing, and quality review.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk Considerations'
  },
  {
    id: 'CIA2-066',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'Red flags in auditing are:',
    options: [
      'Required report formatting',
      'Indicators of potential fraud or problems',
      'Audit team seating assignments',
      'Mandatory checklists'
    ],
    correctAnswer: 1,
    explanation: 'Red flags are warning signs or indicators that may suggest fraud, errors, or control weaknesses. Auditors should be alert to these during fieldwork.',
    topic: 'Performing the Engagement',
    subtopic: 'Fraud Awareness'
  },
  {
    id: 'CIA2-067',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'When significant issues arise during an engagement that were not anticipated:',
    options: [
      'Ignore them if outside original scope',
      'Consider expanding scope and communicate changes as appropriate',
      'Complete only the original scope',
      'Stop the engagement immediately'
    ],
    correctAnswer: 1,
    explanation: 'Significant unexpected issues may require scope expansion. Changes to scope should be documented and communicated to stakeholders as appropriate.',
    topic: 'Performing the Engagement',
    subtopic: 'Scope Changes'
  },
  {
    id: 'CIA2-068',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'The reliability of evidence is affected by:',
    options: [
      'Only the source of evidence',
      'Source, nature (documentary vs. oral), and circumstances under which it was obtained',
      'Only whether it is electronic',
      'Only auditor preference'
    ],
    correctAnswer: 1,
    explanation: 'Evidence reliability is affected by its source (internal vs. external), nature (documentary vs. oral, original vs. copy), and the circumstances under which it was obtained.',
    topic: 'Performing the Engagement',
    subtopic: 'Evidence Evaluation'
  },
  {
    id: 'CIA2-069',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Recurring audits versus single audits:',
    options: [
      'Are exactly the same',
      'Recurring audits can leverage prior knowledge while remaining alert to changes',
      'Single audits are always more thorough',
      'Recurring audits do not require planning'
    ],
    correctAnswer: 1,
    explanation: 'Recurring audits can leverage prior engagement knowledge, permanent files, and prior findings. However, auditors must remain alert to changes and not become complacent.',
    topic: 'Planning the Engagement',
    subtopic: 'Prior Engagement Knowledge'
  },
  {
    id: 'CIA2-070',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'easy',
    question: 'An engagement budget:',
    options: [
      'Is not needed for internal audits',
      'Helps manage time and resources allocated to the engagement',
      'Must never be exceeded',
      'Is set by the Board'
    ],
    correctAnswer: 1,
    explanation: 'Engagement budgets help plan and manage time and resources. Variances from budget should be analyzed and communicated as part of project management.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Resource Management'
  },
];
