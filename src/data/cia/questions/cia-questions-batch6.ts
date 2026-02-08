/**
 * CIA Part 1-3: Additional MCQ Batch 6
 * 100 questions across all three parts
 * Certified Internal Auditor exam preparation
 */

import { Question } from '../../../types';

export const CIA_QUESTIONS_BATCH6: Question[] = [
  // ===========================================================================
  // CIA PART 1: ESSENTIALS OF INTERNAL AUDITING
  // ===========================================================================
  
  // Domain I: Foundations of Internal Auditing (40%)
  {
    id: 'CIA1-B6-001',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to the IIA Standards, what is the primary purpose of the Internal Audit Charter?',
    options: [
      'To define the audit methodology and procedures',
      'To establish the purpose, authority, and responsibility of internal audit',
      'To document the annual audit plan',
      'To outline staff qualifications and training requirements'
    ],
    correctAnswer: 1,
    explanation: 'The Internal Audit Charter is a formal document that defines the purpose, authority, and responsibility of the internal audit activity. It must be approved by senior management and the board.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Charter'
  },
  {
    id: 'CIA1-B6-002',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'An internal auditor discovers a material fraud involving senior management. According to the IIA Standards, what is the auditor\'s first responsibility?',
    options: [
      'Report immediately to law enforcement',
      'Quietly gather more evidence before taking action',
      'Communicate findings to those persons in the organization with authority to take action',
      'Resign from the engagement to avoid conflict'
    ],
    correctAnswer: 2,
    explanation: 'Standard 2060 requires the CAE to report periodically to senior management and the board on significant risk and control issues. When senior management is involved in fraud, the auditor must report to those with authority to take action, such as the audit committee or board.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Reporting and Monitoring'
  },
  {
    id: 'CIA1-B6-003',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which of the following is NOT a required element of the internal audit charter?',
    options: [
      'Nature of assurance services provided',
      'Authorization for unrestricted access to records and personnel',
      'Specific budget allocation for audit activities',
      'Organizational reporting lines'
    ],
    correctAnswer: 2,
    explanation: 'The Internal Audit Charter must define the purpose, authority, and responsibility, including access to records and reporting relationships. Budget allocation, while important, is not a required element of the charter itself.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Charter'
  },
  {
    id: 'CIA1-B6-004',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'What distinguishes internal auditing from external auditing?',
    options: [
      'Internal auditors cannot provide assurance services',
      'Internal auditors focus on operational improvement and risk management, not just financial statements',
      'Internal auditors have less access to company records',
      'Internal auditors report only to management, never to the board'
    ],
    correctAnswer: 1,
    explanation: 'Internal auditing serves the organization by focusing on operational efficiency, risk management, and governance, whereas external auditing primarily focuses on financial statement opinions. Internal auditors should report functionally to the board.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Definition and Purpose'
  },
  {
    id: 'CIA1-B6-005',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'According to the IIA Global Internal Audit Standards, mandatory guidance includes all of the following EXCEPT:',
    options: [
      'Core Principles for the Professional Practice of Internal Auditing',
      'Definition of Internal Auditing',
      'Implementation Guides',
      'Code of Ethics'
    ],
    correctAnswer: 2,
    explanation: 'Mandatory guidance includes the Core Principles, Definition, Code of Ethics, and Standards. Implementation Guides are recommended (supplemental) guidance, not mandatory.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'IPPF Framework'
  },
  
  // Domain II: Independence and Objectivity (15%)
  {
    id: 'CIA1-B6-006',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'An internal auditor previously worked as a purchasing manager. According to the IIA Standards, how long should the auditor wait before auditing the purchasing function?',
    options: [
      'Six months',
      'One year',
      'There is no specified time period; objectivity should be assessed',
      'Two years'
    ],
    correctAnswer: 2,
    explanation: 'The IIA Standards do not specify a particular waiting period. Instead, the CAE must ensure that objectivity is not impaired. Professional judgment should determine whether sufficient time has passed for the auditor to be objective.',
    topic: 'Independence and Objectivity',
    subtopic: 'Impairments'
  },
  {
    id: 'CIA1-B6-007',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'A CAE has been asked to take interim responsibility for the compliance function while a replacement is hired. What is the most appropriate action?',
    options: [
      'Refuse the assignment to maintain complete independence',
      'Accept the assignment and continue normal audit activities in that area',
      'Accept the assignment but disclose the impairment and arrange for oversight of subsequent audits',
      'Accept only if the period is less than 30 days'
    ],
    correctAnswer: 2,
    explanation: 'The CAE may accept operational duties temporarily but must disclose the impairment to the board and ensure that subsequent audits of that function have appropriate oversight to maintain objectivity.',
    topic: 'Independence and Objectivity',
    subtopic: 'Impairments'
  },
  {
    id: 'CIA1-B6-008',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which of the following best describes "organizational independence"?',
    options: [
      'The internal audit function reports to multiple departments',
      'Internal auditors can choose their own audit assignments',
      'The internal audit activity is positioned to fulfill responsibilities free from interference',
      'Internal auditors have no contact with auditees'
    ],
    correctAnswer: 2,
    explanation: 'Organizational independence means the internal audit activity is free from interference in determining scope, performing work, and communicating results. This is typically achieved through functional reporting to the board.',
    topic: 'Independence and Objectivity',
    subtopic: 'Organizational Independence'
  },
  {
    id: 'CIA1-B6-009',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'What is the difference between independence and objectivity?',
    options: [
      'Independence applies to individuals; objectivity applies to the function',
      'Independence is the freedom from conditions that threaten objectivity; objectivity is an unbiased mental attitude',
      'They are synonymous terms',
      'Objectivity is organizational; independence is individual'
    ],
    correctAnswer: 1,
    explanation: 'Independence refers to freedom from conditions that threaten the ability to perform impartially. Objectivity is the unbiased mental attitude that allows auditors to perform engagements with honest belief in their work product.',
    topic: 'Independence and Objectivity',
    subtopic: 'Definitions'
  },
  {
    id: 'CIA1-B6-010',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'If independence or objectivity is impaired, to whom must the impairment be disclosed?',
    options: [
      'Senior management only',
      'The board only',
      'Appropriate parties depending on the nature of the impairment',
      'No disclosure is required if safeguards are implemented'
    ],
    correctAnswer: 2,
    explanation: 'Disclosure must be made to appropriate parties depending on the nature of the impairment. Individual impairments are disclosed per organizational policy, while functional independence impairments must be disclosed to the board.',
    topic: 'Independence and Objectivity',
    subtopic: 'Disclosure'
  },

  // Domain III: Proficiency and Due Professional Care (15%)
  {
    id: 'CIA1-B6-011',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to the IIA Standards, which skills must all internal auditors possess?',
    options: [
      'Advanced IT security certifications',
      'Proficiency in applying internal auditing standards, procedures, and techniques',
      'CPA license',
      'Legal expertise for fraud investigations'
    ],
    correctAnswer: 1,
    explanation: 'All internal auditors must possess proficiency in applying internal auditing standards, procedures, and techniques. While IT, legal, and other specialized skills may be needed, they are not required of all auditors.',
    topic: 'Proficiency and Due Care',
    subtopic: 'Proficiency Requirements'
  },
  {
    id: 'CIA1-B6-012',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'Due professional care requires internal auditors to consider all of the following EXCEPT:',
    options: [
      'Extent of work needed to achieve engagement objectives',
      'Relative complexity, materiality, or significance of matters',
      'Guarantee that all significant risks and control weaknesses will be identified',
      'Probability of significant errors, fraud, or noncompliance'
    ],
    correctAnswer: 2,
    explanation: 'Due professional care does not imply infallibility or guarantee that all significant risks will be identified. It requires auditors to apply the care and skill expected of a reasonably prudent and competent internal auditor.',
    topic: 'Proficiency and Due Care',
    subtopic: 'Due Professional Care'
  },
  {
    id: 'CIA1-B6-013',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'What is the CAE\'s responsibility regarding proficiency?',
    options: [
      'Ensure each auditor possesses all skills needed for any engagement',
      'Obtain competent advice and assistance when audit staff lacks needed knowledge',
      'Hire only auditors with graduate degrees',
      'Limit audits to areas where staff has expertise'
    ],
    correctAnswer: 1,
    explanation: 'The CAE must obtain competent advice and assistance from external sources if internal audit staff lacks the required knowledge, skills, or competencies for part or all of an engagement.',
    topic: 'Proficiency and Due Care',
    subtopic: 'CAE Responsibilities'
  },
  
  // Domain IV: Quality Assurance and Improvement Program (10%)
  {
    id: 'CIA1-B6-014',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'According to the IIA Standards, how often must an internal quality assessment be performed?',
    options: [
      'Annually',
      'At least every five years',
      'Ongoing through continuous monitoring, plus periodic self-assessments',
      'Only when required by the board'
    ],
    correctAnswer: 2,
    explanation: 'Internal assessments must include ongoing monitoring of performance integrated into day-to-day supervision, review, and measurement, plus periodic self-assessments or assessments by persons with sufficient knowledge.',
    topic: 'Quality Assurance',
    subtopic: 'Internal Assessments'
  },
  {
    id: 'CIA1-B6-015',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'External quality assessments of the internal audit activity must be conducted at least every:',
    options: [
      'Year',
      'Three years',
      'Five years',
      'Seven years'
    ],
    correctAnswer: 2,
    explanation: 'External quality assessments must be conducted at least once every five years by a qualified, independent assessor or assessment team from outside the organization.',
    topic: 'Quality Assurance',
    subtopic: 'External Assessments'
  },
  {
    id: 'CIA1-B6-016',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When can an internal audit activity use the phrase "Conforms with the International Standards for the Professional Practice of Internal Auditing"?',
    options: [
      'Whenever the CAE believes conformance exists',
      'Only when supported by the results of the QAIP',
      'After completing any external assessment',
      'When approved by senior management'
    ],
    correctAnswer: 1,
    explanation: 'The phrase may be used only when results of the Quality Assurance and Improvement Program (QAIP) support conformance with the Code of Ethics and Standards.',
    topic: 'Quality Assurance',
    subtopic: 'Conformance Statements'
  },
  
  // Domain V: Governance, Risk Management, and Control (20%)
  {
    id: 'CIA1-B6-017',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to the IIA, internal audit\'s role in governance includes all of the following EXCEPT:',
    options: [
      'Assessing ethics-related programs and activities',
      'Making strategic decisions for the organization',
      'Evaluating design and effectiveness of ethics-related controls',
      'Reporting significant governance issues to the board'
    ],
    correctAnswer: 1,
    explanation: 'Internal audit assesses and promotes governance but does not make strategic decisions for the organization. That responsibility belongs to the board and senior management.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Governance'
  },
  {
    id: 'CIA1-B6-018',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When evaluating risk management processes, internal auditors should determine that:',
    options: [
      'The organization uses the COSO ERM framework exclusively',
      'All risks are eliminated from the organization',
      'Organizational objectives support and align with the organization\'s mission',
      'Risk tolerance is set at zero for all critical processes'
    ],
    correctAnswer: 2,
    explanation: 'Auditors should evaluate that organizational objectives support and align with the mission, significant risks are identified and assessed, appropriate risk responses are selected, and relevant information is captured and communicated.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Risk Management'
  },
  {
    id: 'CIA1-B6-019',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which of the following best describes the role of internal audit in an organization\'s risk management process?',
    options: [
      'Own and manage the organization\'s key risks',
      'Set risk appetite and tolerance levels',
      'Provide assurance on the effectiveness of risk management',
      'Design and implement risk mitigation strategies'
    ],
    correctAnswer: 2,
    explanation: 'Internal audit\'s primary role is to provide assurance that risk management processes are effective. Management owns and manages risks; the board sets risk appetite.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Risk Management'
  },
  {
    id: 'CIA1-B6-020',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Control effectiveness is best described as:',
    options: [
      'Whether the control exists and is documented',
      'Whether the control operates as designed to mitigate risk to an acceptable level',
      'Whether management believes the control is working',
      'Whether the control has been approved by the board'
    ],
    correctAnswer: 1,
    explanation: 'Control effectiveness means the control operates as designed and achieves the objective of mitigating risk to an acceptable level. Existence alone does not ensure effectiveness.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Control Concepts'
  },

  // ===========================================================================
  // CIA PART 2: PRACTICE OF INTERNAL AUDITING
  // ===========================================================================
  
  // Domain I: Managing the Internal Audit Activity (40%)
  {
    id: 'CIA2-B6-021',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'A risk-based audit plan is best described as:',
    options: [
      'A plan that covers all organizational areas equally',
      'A plan that prioritizes audit activities based on the organization\'s key risks',
      'A plan focused only on financial statement risks',
      'A plan developed exclusively by senior management'
    ],
    correctAnswer: 1,
    explanation: 'A risk-based audit plan prioritizes internal audit work based on an assessment of risk to ensure the highest-risk areas receive appropriate audit attention.',
    topic: 'Managing Internal Audit',
    subtopic: 'Risk-Based Planning'
  },
  {
    id: 'CIA2-B6-022',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'The CAE should develop policies and procedures to guide the internal audit activity. These policies should address all of the following EXCEPT:',
    options: [
      'Planning and risk assessment',
      'Staff performance evaluations',
      'Strategic direction of the company',
      'Supervision and review of audit work'
    ],
    correctAnswer: 2,
    explanation: 'Internal audit policies cover planning, supervision, documentation, communication, and performance management. Strategic direction is set by leadership, not internal audit.',
    topic: 'Managing Internal Audit',
    subtopic: 'Policies and Procedures'
  },
  {
    id: 'CIA2-B6-023',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'When communicating the internal audit plan, the CAE should:',
    options: [
      'Keep it confidential from management to maintain independence',
      'Communicate plans and resource requirements to senior management and the board for review and approval',
      'Share it only after all audits are completed',
      'Communicate only negative findings'
    ],
    correctAnswer: 1,
    explanation: 'The CAE must communicate the internal audit activity\'s plans and resource requirements, including significant interim changes, to senior management and the board for review and approval.',
    topic: 'Managing Internal Audit',
    subtopic: 'Communication'
  },
  {
    id: 'CIA2-B6-024',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'How should the CAE respond when the organization\'s risk assessment changes significantly mid-year?',
    options: [
      'Complete the original audit plan before making changes',
      'Adjust the audit plan to address significant emerging risks',
      'Wait until the next planning cycle',
      'Ignore changes unless directed by the board'
    ],
    correctAnswer: 1,
    explanation: 'The audit plan must be flexible to respond to changes in the organization\'s risk profile. Significant changes in risks should prompt revision of the audit plan.',
    topic: 'Managing Internal Audit',
    subtopic: 'Plan Flexibility'
  },
  {
    id: 'CIA2-B6-025',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Resource management for the internal audit activity includes:',
    options: [
      'Ensuring resources are sufficient to achieve the audit plan',
      'Maximizing the number of audits regardless of quality',
      'Using only in-house resources for all engagements',
      'Limiting audit scope to available resources'
    ],
    correctAnswer: 0,
    explanation: 'The CAE must ensure that internal audit resources are appropriate, sufficient, and effectively deployed to achieve the approved plan. If resources are insufficient, this should be communicated.',
    topic: 'Managing Internal Audit',
    subtopic: 'Resource Management'
  },

  // Domain II: Planning the Engagement (30%)
  {
    id: 'CIA2-B6-026',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'What is the primary purpose of a preliminary survey in an audit engagement?',
    options: [
      'To document final conclusions',
      'To familiarize the auditor with the activities and risks under review',
      'To test internal controls',
      'To write the audit report'
    ],
    correctAnswer: 1,
    explanation: 'The preliminary survey helps auditors become familiar with the auditee\'s activities, risks, and controls, forming the basis for the detailed audit program.',
    topic: 'Planning the Engagement',
    subtopic: 'Preliminary Survey'
  },
  {
    id: 'CIA2-B6-027',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Engagement objectives should:',
    options: [
      'Be established before understanding the risks of the activity',
      'Be determined after all testing is complete',
      'Reflect the results of a preliminary assessment of risks and controls',
      'Remain constant regardless of what is discovered during the engagement'
    ],
    correctAnswer: 2,
    explanation: 'Engagement objectives must reflect the results of the preliminary assessment of the risks associated with the activity under review. Objectives guide the rest of the engagement.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Objectives'
  },
  {
    id: 'CIA2-B6-028',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'The audit program should include:',
    options: [
      'Only the final report conclusions',
      'Procedures for identifying, analyzing, evaluating, and documenting information',
      'A list of past audit findings only',
      'Management\'s preferred testing approach'
    ],
    correctAnswer: 1,
    explanation: 'An audit program should establish procedures for identifying, analyzing, evaluating, and documenting information during the engagement. It guides audit work.',
    topic: 'Planning the Engagement',
    subtopic: 'Audit Program'
  },
  {
    id: 'CIA2-B6-029',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'When determining the scope of an engagement, the auditor should consider:',
    options: [
      'Only financial transactions',
      'Systems, records, personnel, and physical properties relevant to the objectives',
      'Areas specifically requested by management only',
      'Only IT systems'
    ],
    correctAnswer: 1,
    explanation: 'The engagement scope must be sufficient to achieve the objectives and includes consideration of systems, records, personnel, and physical properties relevant to the engagement.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Scope'
  },
  {
    id: 'CIA2-B6-030',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'An audit work program should be approved by:',
    options: [
      'The CEO',
      'The external auditors',
      'The CAE or designee before the work commences, with adjustments approved promptly',
      'No approval is needed for work programs'
    ],
    correctAnswer: 2,
    explanation: 'Work programs must be approved prior to their implementation, and any adjustments approved promptly. The CAE or designee should provide this approval.',
    topic: 'Planning the Engagement',
    subtopic: 'Work Program Approval'
  },

  // Domain III: Performing the Engagement (30%)
  {
    id: 'CIA2-B6-031',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Which of the following is the most reliable type of audit evidence?',
    options: [
      'Oral statements from management',
      'Inquiry responses from employees',
      'Documentary evidence obtained directly from independent external sources',
      'Internally generated reports approved by management'
    ],
    correctAnswer: 2,
    explanation: 'Evidence from independent external sources (like bank confirmations) is generally more reliable than internally generated information or oral statements.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Evidence'
  },
  {
    id: 'CIA2-B6-032',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Which sampling method provides the best basis for projecting sample results to the population?',
    options: [
      'Judgmental sampling',
      'Haphazard sampling',
      'Statistical (random) sampling',
      'Block sampling'
    ],
    correctAnswer: 2,
    explanation: 'Statistical sampling allows the auditor to quantify sampling risk and project results to the population with a measurable degree of confidence. Non-statistical methods do not provide this capability.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling'
  },
  {
    id: 'CIA2-B6-033',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Analytical procedures are most effective when:',
    options: [
      'Used as the only source of audit evidence',
      'Applied to detect plausible relationships that may indicate potential risks',
      'Performed only at the conclusion of an engagement',
      'Conducted by management without auditor involvement'
    ],
    correctAnswer: 1,
    explanation: 'Analytical procedures are used to evaluate information by developing expectations and comparing them to recorded amounts or ratios to identify potential risks or issues.',
    topic: 'Performing the Engagement',
    subtopic: 'Analytical Procedures'
  },
  {
    id: 'CIA2-B6-034',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Working papers should:',
    options: [
      'Be discarded after the audit report is issued',
      'Document information obtained and analyses made to support conclusions and recommendations',
      'Include only the findings management agrees with',
      'Be accessible to all employees'
    ],
    correctAnswer: 1,
    explanation: 'Working papers document the information obtained, analyses made, and conclusions drawn. They support audit conclusions and provide a record of the work performed.',
    topic: 'Performing the Engagement',
    subtopic: 'Working Papers'
  },
  {
    id: 'CIA2-B6-035',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'If an auditor suspects fraud during an engagement, what is the appropriate action?',
    options: [
      'Immediately confront the suspected employee',
      'Stop the audit and report findings to law enforcement',
      'Expand testing, document evidence, and communicate to appropriate levels of management or the board',
      'Include only confirmed fraud in the report'
    ],
    correctAnswer: 2,
    explanation: 'When fraud is suspected, the auditor should exercise due care to avoid alerting suspects, expand testing to gather sufficient evidence, and communicate findings to appropriate parties.',
    topic: 'Performing the Engagement',
    subtopic: 'Fraud'
  },
  {
    id: 'CIA2-B6-036',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'An observation from audit testing should be considered a finding when it reflects:',
    options: [
      'Any difference between expected and actual results',
      'A significant deviation from criteria representing a risk to the organization',
      'Personal opinions of the auditor',
      'Issues resolved before the audit is complete'
    ],
    correctAnswer: 1,
    explanation: 'A finding represents a significant deviation from criteria (condition vs. criteria) that represents a risk. Minor issues or resolved matters may not rise to the level of a reportable finding.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Findings'
  },
  {
    id: 'CIA2-B6-037',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'The elements of an audit observation (finding) typically include:',
    options: [
      'Condition, criteria, cause, and effect',
      'Who, what, when, and where',
      'Strength, weakness, opportunity, and threat',
      'Plan, do, check, and act'
    ],
    correctAnswer: 0,
    explanation: 'The four elements of an observation are: Condition (what exists), Criteria (what should exist), Cause (why it occurred), and Effect (impact/risk).',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Findings'
  },
  {
    id: 'CIA2-B6-038',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Engagement supervision should include:',
    options: [
      'Allowing staff to work independently without oversight',
      'Ensuring objectives are achieved, quality is assured, and staff is developed',
      'Only final review of completed work',
      'Supervision by external parties only'
    ],
    correctAnswer: 1,
    explanation: 'Supervision ensures engagement objectives are achieved, quality is maintained, staff are developed, and coaching is provided. It should occur throughout the engagement.',
    topic: 'Performing the Engagement',
    subtopic: 'Supervision'
  },
  {
    id: 'CIA2-B6-039',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'When using the work of an external service provider, the CAE retains responsibility for:',
    options: [
      'Nothing; the external provider assumes all responsibility',
      'Conclusions and opinions based on appropriate assurance',
      'Only the portions performed by internal staff',
      'Financial arrangements only'
    ],
    correctAnswer: 1,
    explanation: 'Even when using external service providers (co-sourcing or outsourcing), the CAE retains responsibility for maintaining effective oversight and ensuring conclusions are supported.',
    topic: 'Performing the Engagement',
    subtopic: 'External Service Providers'
  },
  {
    id: 'CIA2-B6-040',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Control self-assessments (CSA) are most valuable because they:',
    options: [
      'Replace the need for internal audits',
      'Transfer all control responsibility to management',
      'Engage those closest to risks in evaluating controls and identifying gaps',
      'Eliminate the need for documentation'
    ],
    correctAnswer: 2,
    explanation: 'CSA involves those closest to business processes in evaluating control adequacy. This provides valuable insight and increases risk awareness, though it does not replace internal audit\'s assurance role.',
    topic: 'Performing the Engagement',
    subtopic: 'Control Assessment'
  },

  // ===========================================================================
  // CIA PART 3: BUSINESS KNOWLEDGE FOR INTERNAL AUDITING
  // ===========================================================================
  
  // Domain I: Business Acumen (35%)
  {
    id: 'CIA3-B6-041',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Which financial statement best shows an organization\'s ability to generate cash?',
    options: [
      'Balance sheet',
      'Income statement',
      'Statement of cash flows',
      'Statement of retained earnings'
    ],
    correctAnswer: 2,
    explanation: 'The statement of cash flows shows cash inflows and outflows from operating, investing, and financing activities, revealing the organization\'s ability to generate and use cash.',
    topic: 'Business Acumen',
    subtopic: 'Financial Statements'
  },
  {
    id: 'CIA3-B6-042',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'A company has a current ratio of 2.5 and a quick ratio of 0.8. This most likely indicates:',
    options: [
      'Strong liquidity position',
      'High inventory levels relative to current liabilities',
      'Excellent cash management',
      'Low levels of current assets'
    ],
    correctAnswer: 1,
    explanation: 'A current ratio much higher than the quick ratio indicates that inventory is a large portion of current assets. The quick ratio excludes inventory, so this gap suggests high inventory levels.',
    topic: 'Business Acumen',
    subtopic: 'Ratio Analysis'
  },
  {
    id: 'CIA3-B6-043',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Net Present Value (NPV) is calculated by:',
    options: [
      'Adding all future cash flows without adjustment',
      'Discounting future cash flows to their present value and subtracting the initial investment',
      'Dividing total profit by initial investment',
      'Calculating the time to recover the initial investment'
    ],
    correctAnswer: 1,
    explanation: 'NPV discounts all future cash flows to their present value using a required rate of return, then subtracts the initial investment to determine value creation.',
    topic: 'Business Acumen',
    subtopic: 'Capital Budgeting'
  },
  {
    id: 'CIA3-B6-044',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Which of the following is NOT typically considered a fixed cost?',
    options: [
      'Rent',
      'Executive salaries',
      'Direct materials',
      'Property insurance'
    ],
    correctAnswer: 2,
    explanation: 'Direct materials are variable costs that change with production volume. Rent, executive salaries, and property insurance are typically fixed costs that remain constant regardless of production level.',
    topic: 'Business Acumen',
    subtopic: 'Cost Behavior'
  },
  {
    id: 'CIA3-B6-045',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The balanced scorecard approach to performance measurement includes which four perspectives?',
    options: [
      'Financial, Customer, Internal Process, Learning and Growth',
      'Revenues, Costs, Profits, Cash Flow',
      'Planning, Organizing, Leading, Controlling',
      'Prevention, Detection, Correction, Compensation'
    ],
    correctAnswer: 0,
    explanation: 'The balanced scorecard includes Financial, Customer, Internal Business Process, and Learning and Growth perspectives to provide a comprehensive view of organizational performance.',
    topic: 'Business Acumen',
    subtopic: 'Performance Measurement'
  },
  {
    id: 'CIA3-B6-046',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Supply chain management focuses on:',
    options: [
      'Employee relations only',
      'The flow of goods, services, finances, and information from raw materials to end customer',
      'Financial reporting requirements',
      'IT infrastructure only'
    ],
    correctAnswer: 1,
    explanation: 'Supply chain management encompasses all activities from sourcing raw materials to delivering products to customers, including the associated flows of information and finances.',
    topic: 'Business Acumen',
    subtopic: 'Supply Chain'
  },
  {
    id: 'CIA3-B6-047',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Organizational strategy can be categorized at three levels:',
    options: [
      'Executive, Management, and Staff',
      'Corporate, Business, and Functional',
      'Short-term, Medium-term, and Long-term',
      'Internal, External, and Hybrid'
    ],
    correctAnswer: 1,
    explanation: 'Strategy exists at three levels: Corporate (what businesses to be in), Business (how to compete in each business), and Functional (departmental strategies supporting business strategy).',
    topic: 'Business Acumen',
    subtopic: 'Strategy'
  },
  {
    id: 'CIA3-B6-048',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Which competitive strategy involves being the lowest cost producer in the industry?',
    options: [
      'Differentiation',
      'Cost leadership',
      'Focus',
      'Diversification'
    ],
    correctAnswer: 1,
    explanation: 'Cost leadership strategy involves becoming the lowest-cost producer in the industry, allowing the firm to earn profits even when prices are low or to undercut competitors.',
    topic: 'Business Acumen',
    subtopic: 'Competitive Strategy'
  },
  {
    id: 'CIA3-B6-049',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'An organization\'s mission statement should define:',
    options: [
      'Specific financial targets',
      'The fundamental purpose of the organization',
      'Annual budget allocations',
      'IT system requirements'
    ],
    correctAnswer: 1,
    explanation: 'A mission statement defines the organization\'s fundamental purpose - why it exists, what it does, and for whom. It guides strategic decisions and stakeholder understanding.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Planning'
  },
  {
    id: 'CIA3-B6-050',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Key Performance Indicators (KPIs) should be:',
    options: [
      'As numerous as possible to capture all aspects',
      'Focused on financial metrics only',
      'Aligned with organizational objectives and measurable',
      'Changed monthly to stay current'
    ],
    correctAnswer: 2,
    explanation: 'KPIs should be aligned with strategic objectives, measurable, and focused on what matters most. Too many KPIs dilute focus; they should be stable enough for trend analysis.',
    topic: 'Business Acumen',
    subtopic: 'Performance Measurement'
  },

  // Domain II: Information Security (25%)
  {
    id: 'CIA3-B6-051',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The CIA triad in information security refers to:',
    options: [
      'Certified Internal Auditor certification components',
      'Confidentiality, Integrity, and Availability',
      'Control, Implementation, and Assurance',
      'Compliance, Inspection, and Analysis'
    ],
    correctAnswer: 1,
    explanation: 'The CIA triad represents the three core principles of information security: Confidentiality (authorized access only), Integrity (accuracy/completeness), and Availability (accessible when needed).',
    topic: 'Information Security',
    subtopic: 'Security Fundamentals'
  },
  {
    id: 'CIA3-B6-052',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'A logical access control that requires something you know, something you have, and something you are is called:',
    options: [
      'Single-factor authentication',
      'Two-factor authentication',
      'Multi-factor authentication',
      'Biometric authentication'
    ],
    correctAnswer: 2,
    explanation: 'Multi-factor authentication requires multiple different types of authentication factors: knowledge (password), possession (token), and inherence (biometric). Three factors as described requires MFA.',
    topic: 'Information Security',
    subtopic: 'Access Control'
  },
  {
    id: 'CIA3-B6-053',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Encryption is primarily used to ensure:',
    options: [
      'Availability',
      'Confidentiality',
      'Audit trails',
      'Processing speed'
    ],
    correctAnswer: 1,
    explanation: 'Encryption protects confidentiality by converting data into an unreadable format that can only be read by those with the decryption key.',
    topic: 'Information Security',
    subtopic: 'Cryptography'
  },
  {
    id: 'CIA3-B6-054',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'A Business Continuity Plan (BCP) should address:',
    options: [
      'Only natural disasters',
      'IT systems recovery only',
      'Maintaining critical business functions during and after a disaster',
      'Annual financial planning'
    ],
    correctAnswer: 2,
    explanation: 'A BCP addresses how to maintain critical business functions during and after a disaster or disruption, including people, processes, and technology.',
    topic: 'Information Security',
    subtopic: 'Business Continuity'
  },
  {
    id: 'CIA3-B6-055',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The Recovery Time Objective (RTO) defines:',
    options: [
      'How much data loss is acceptable',
      'The maximum acceptable time to restore a system after disruption',
      'The frequency of backup procedures',
      'The cost of recovery operations'
    ],
    correctAnswer: 1,
    explanation: 'RTO is the maximum acceptable time that can elapse before service disruption severely impacts business operations. RPO (Recovery Point Objective) addresses data loss.',
    topic: 'Information Security',
    subtopic: 'Business Continuity'
  },
  {
    id: 'CIA3-B6-056',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Social engineering attacks primarily target:',
    options: [
      'Computer hardware',
      'Network infrastructure',
      'Human behavior and decision-making',
      'Database systems'
    ],
    correctAnswer: 2,
    explanation: 'Social engineering exploits human psychology rather than technical vulnerabilities, manipulating people into divulging confidential information or taking actions against security protocols.',
    topic: 'Information Security',
    subtopic: 'Security Threats'
  },
  {
    id: 'CIA3-B6-057',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'A firewall operates at which layer(s) of network architecture?',
    options: [
      'Physical layer only',
      'Application layer only',
      'Various layers depending on firewall type (packet filtering, stateful, application)',
      'Network cables and connectors'
    ],
    correctAnswer: 2,
    explanation: 'Firewalls can operate at different layers: packet-filtering at network layer, stateful inspection at transport layer, and application-level gateways at the application layer.',
    topic: 'Information Security',
    subtopic: 'Network Security'
  },
  {
    id: 'CIA3-B6-058',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Segregation of duties in IT environments should ensure:',
    options: [
      'All IT staff can perform all functions',
      'Developers have production access for efficiency',
      'Programming, operations, and security administration are separated',
      'The same person performs backups and restores'
    ],
    correctAnswer: 2,
    explanation: 'Segregation of duties separates incompatible functions: programming/development, computer operations, security administration, and data custodianship to prevent fraud and errors.',
    topic: 'Information Security',
    subtopic: 'IT Controls'
  },
  {
    id: 'CIA3-B6-059',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'An intrusion detection system (IDS) is designed to:',
    options: [
      'Prevent all attacks from occurring',
      'Detect and alert on suspicious activities or policy violations',
      'Encrypt network traffic',
      'Replace firewall functionality'
    ],
    correctAnswer: 1,
    explanation: 'An IDS monitors network traffic or system activities for malicious actions or policy violations and generates alerts. It detects but does not prevent attacks (IPS prevents).',
    topic: 'Information Security',
    subtopic: 'Security Monitoring'
  },
  {
    id: 'CIA3-B6-060',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Penetration testing differs from vulnerability scanning because:',
    options: [
      'They are the same thing',
      'Penetration testing is automated while vulnerability scanning is manual',
      'Penetration testing attempts to exploit vulnerabilities while scanning only identifies them',
      'Vulnerability scanning is more thorough'
    ],
    correctAnswer: 2,
    explanation: 'Vulnerability scanning identifies potential vulnerabilities automatically. Penetration testing goes further by actively attempting to exploit vulnerabilities to assess actual risk.',
    topic: 'Information Security',
    subtopic: 'Security Testing'
  },

  // Domain III: Information Technology (20%)
  {
    id: 'CIA3-B6-061',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Cloud computing offers which of the following primary benefits?',
    options: [
      'Complete elimination of security risks',
      'Scalability, cost efficiency, and accessibility',
      'Guaranteed 100% uptime',
      'No need for governance or oversight'
    ],
    correctAnswer: 1,
    explanation: 'Cloud computing provides scalability (expand/contract resources), cost efficiency (pay for what you use), and accessibility (access from anywhere). It still requires security and governance attention.',
    topic: 'Information Technology',
    subtopic: 'Cloud Computing'
  },
  {
    id: 'CIA3-B6-062',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'In a Software as a Service (SaaS) model, who is primarily responsible for application security?',
    options: [
      'The cloud service provider',
      'The customer organization only',
      'Shared responsibility, but provider manages application-level security',
      'No one; SaaS is inherently secure'
    ],
    correctAnswer: 2,
    explanation: 'In SaaS, the provider manages infrastructure and application security. The customer is responsible for user access, data, and business process controls. It\'s a shared responsibility model.',
    topic: 'Information Technology',
    subtopic: 'Cloud Computing'
  },
  {
    id: 'CIA3-B6-063',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Database management systems (DBMS) provide all of the following EXCEPT:',
    options: [
      'Data storage and retrieval',
      'Data integrity enforcement',
      'Automatic business process design',
      'Concurrent access control'
    ],
    correctAnswer: 2,
    explanation: 'DBMS provides storage, retrieval, integrity enforcement, security, and concurrent access control. Business process design is not a function of a DBMS.',
    topic: 'Information Technology',
    subtopic: 'Databases'
  },
  {
    id: 'CIA3-B6-064',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The System Development Life Cycle (SDLC) typically includes which phases?',
    options: [
      'Only coding and testing',
      'Planning, analysis, design, development, testing, implementation, maintenance',
      'Purchasing, installation, and retirement',
      'Marketing, sales, and customer support'
    ],
    correctAnswer: 1,
    explanation: 'The traditional SDLC includes planning, requirements analysis, design, development/coding, testing, implementation/deployment, and maintenance phases.',
    topic: 'Information Technology',
    subtopic: 'System Development'
  },
  {
    id: 'CIA3-B6-065',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Agile development methodology differs from traditional waterfall primarily because:',
    options: [
      'Agile has no planning or documentation',
      'Agile is iterative with frequent deliveries and continuous feedback',
      'Waterfall is faster',
      'Agile cannot be used for large projects'
    ],
    correctAnswer: 1,
    explanation: 'Agile emphasizes iterative development with short cycles (sprints), continuous stakeholder feedback, and adaptability to change. Waterfall is sequential with longer phases.',
    topic: 'Information Technology',
    subtopic: 'Development Methodologies'
  },
  {
    id: 'CIA3-B6-066',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Big data is characterized by the "3 Vs" which are:',
    options: [
      'Value, Vision, and Velocity',
      'Volume, Velocity, and Variety',
      'Verification, Validation, and Value',
      'Virtual, Visual, and Vital'
    ],
    correctAnswer: 1,
    explanation: 'Big data is characterized by Volume (large amounts), Velocity (speed of generation/processing), and Variety (diverse data types). Some frameworks add Veracity and Value.',
    topic: 'Information Technology',
    subtopic: 'Data Analytics'
  },
  {
    id: 'CIA3-B6-067',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Change management controls ensure that:',
    options: [
      'All changes are prevented',
      'Changes are authorized, tested, and implemented in a controlled manner',
      'Only emergency changes are processed',
      'Users can make changes directly to production'
    ],
    correctAnswer: 1,
    explanation: 'Change management controls ensure changes to IT systems are properly authorized, documented, tested, and implemented in a controlled way to minimize risk and disruption.',
    topic: 'Information Technology',
    subtopic: 'IT Controls'
  },
  {
    id: 'CIA3-B6-068',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Robotic Process Automation (RPA) is best suited for:',
    options: [
      'Creative and strategic decision-making',
      'Repetitive, rule-based tasks with structured data',
      'Complex negotiations with customers',
      'One-time unique processes'
    ],
    correctAnswer: 1,
    explanation: 'RPA excels at automating repetitive, rule-based tasks that use structured data and follow defined processes. It mimics human actions but is not suited for judgment or creativity.',
    topic: 'Information Technology',
    subtopic: 'Emerging Technology'
  },
  {
    id: 'CIA3-B6-069',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Application controls are designed to ensure:',
    options: [
      'Physical security of servers',
      'Accurate and complete processing of transactions within a specific application',
      'Network connectivity',
      'Staff scheduling'
    ],
    correctAnswer: 1,
    explanation: 'Application controls are specific to individual applications and ensure accurate, complete, and authorized processing of transactions. They include input, processing, and output controls.',
    topic: 'Information Technology',
    subtopic: 'IT Controls'
  },
  {
    id: 'CIA3-B6-070',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'When auditing IT outsourcing arrangements, the internal auditor should focus on:',
    options: [
      'Ignoring IT audit since the vendor is responsible',
      'Vendor governance, contract terms, SLAs, and right-to-audit clauses',
      'Only cost savings achieved',
      'Technical specifications only'
    ],
    correctAnswer: 1,
    explanation: 'Auditing IT outsourcing requires reviewing governance, contractual terms, service level agreements, security requirements, data protection, and ensuring right-to-audit clauses are included.',
    topic: 'Information Technology',
    subtopic: 'IT Governance'
  },

  // Domain III (continued) and Domain IV: Fraud (20%)
  {
    id: 'CIA3-B6-071',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'According to the fraud triangle, the three factors that lead to fraud are:',
    options: [
      'Money, opportunity, and greed',
      'Pressure, opportunity, and rationalization',
      'Access, motive, and means',
      'Planning, execution, and concealment'
    ],
    correctAnswer: 1,
    explanation: 'The fraud triangle consists of: Pressure/incentive (motivation to commit fraud), Opportunity (ability to commit fraud), and Rationalization (justifying the act).',
    topic: 'Fraud',
    subtopic: 'Fraud Triangle'
  },
  {
    id: 'CIA3-B6-072',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The most common method of detecting occupational fraud is through:',
    options: [
      'External audit',
      'Tips and complaints',
      'Internal audit',
      'Surveillance cameras'
    ],
    correctAnswer: 1,
    explanation: 'According to ACFE research, tips are consistently the most common way occupational fraud is detected. Organizations should maintain confidential reporting mechanisms.',
    topic: 'Fraud',
    subtopic: 'Fraud Detection'
  },
  {
    id: 'CIA3-B6-073',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Asset misappropriation schemes include all of the following EXCEPT:',
    options: [
      'Skimming cash receipts',
      'Theft of inventory',
      'Fraudulent financial reporting',
      'Billing schemes'
    ],
    correctAnswer: 2,
    explanation: 'Asset misappropriation involves theft of assets (cash, inventory). Fraudulent financial reporting is a separate category of fraud involving intentional misstatement of financials.',
    topic: 'Fraud',
    subtopic: 'Fraud Types'
  },
  {
    id: 'CIA3-B6-074',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Red flags indicating potential financial statement fraud include:',
    options: [
      'Stable revenue growth',
      'Strong internal controls',
      'Unusual related-party transactions and aggressive accounting estimates',
      'Conservative revenue recognition'
    ],
    correctAnswer: 2,
    explanation: 'Red flags include unusual related-party transactions, aggressive accounting, significant transactions near period end, unreasonable performance targets, and management override of controls.',
    topic: 'Fraud',
    subtopic: 'Fraud Indicators'
  },
  {
    id: 'CIA3-B6-075',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'When conducting a fraud investigation, the internal auditor should:',
    options: [
      'Immediately interrogate the suspect',
      'Maintain confidentiality and collect evidence carefully while coordinating with appropriate parties',
      'Inform all employees about the investigation',
      'Accept unsupported evidence from anonymous sources'
    ],
    correctAnswer: 1,
    explanation: 'Fraud investigations require confidentiality, proper evidence collection to preserve admissibility, and coordination with legal counsel, management, or law enforcement as appropriate.',
    topic: 'Fraud',
    subtopic: 'Fraud Investigation'
  },
  {
    id: 'CIA3-B6-076',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Benford\'s Law is used in fraud detection to:',
    options: [
      'Predict stock prices',
      'Identify unusual patterns in the distribution of leading digits in numerical data',
      'Calculate employee performance metrics',
      'Forecast revenue growth'
    ],
    correctAnswer: 1,
    explanation: 'Benford\'s Law describes the expected distribution of leading digits in naturally occurring numerical data. Significant deviation may indicate fabricated or manipulated data.',
    topic: 'Fraud',
    subtopic: 'Data Analytics'
  },
  {
    id: 'CIA3-B6-077',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Which control is most effective in preventing collusion?',
    options: [
      'Segregation of duties',
      'Mandatory vacations and job rotation',
      'Password controls',
      'Physical security'
    ],
    correctAnswer: 1,
    explanation: 'While segregation of duties prevents individual fraud, collusion can defeat it. Mandatory vacations and job rotation create opportunities to detect anomalies when different people perform tasks.',
    topic: 'Fraud',
    subtopic: 'Fraud Prevention'
  },
  {
    id: 'CIA3-B6-078',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The internal audit\'s role regarding fraud includes:',
    options: [
      'Conducting criminal prosecutions',
      'Evaluating fraud risks and assessing adequacy of anti-fraud controls',
      'Guaranteeing no fraud will occur',
      'Replacing law enforcement investigation'
    ],
    correctAnswer: 1,
    explanation: 'Internal audit evaluates fraud risks, assesses controls, and may investigate fraud when appropriate. Prosecutions are for legal authorities; internal audit provides assurance, not guarantees.',
    topic: 'Fraud',
    subtopic: 'Internal Audit Role'
  },
  {
    id: 'CIA3-B6-079',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'An effective whistleblower program should include:',
    options: [
      'No anonymity to ensure accountability',
      'Confidential reporting channels and protection against retaliation',
      'Reporting only to immediate supervisors',
      'Limiting reports to financial matters only'
    ],
    correctAnswer: 1,
    explanation: 'Effective whistleblower programs provide confidential or anonymous reporting channels, protection against retaliation, clear policies, and multiple reporting avenues.',
    topic: 'Fraud',
    subtopic: 'Fraud Prevention'
  },
  {
    id: 'CIA3-B6-080',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'When evidence of fraud implicates senior management, the CAE should:',
    options: [
      'Report to the implicated manager first',
      'Report findings to the board/audit committee and consider external resources',
      'Keep findings confidential indefinitely',
      'Dismiss the findings to avoid conflict'
    ],
    correctAnswer: 1,
    explanation: 'When senior management is implicated, the CAE must report to the board or audit committee and may need to engage external legal or investigative resources to ensure independence.',
    topic: 'Fraud',
    subtopic: 'Fraud Reporting'
  },

  // Additional Business Knowledge Questions
  {
    id: 'CIA3-B6-081',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Transfer pricing between international subsidiaries is most often scrutinized for:',
    options: [
      'Efficiency improvements',
      'Potential manipulation to shift profits to lower-tax jurisdictions',
      'Marketing effectiveness',
      'Employee compensation'
    ],
    correctAnswer: 1,
    explanation: 'Transfer pricing policies between related entities can be used to shift profits to jurisdictions with lower tax rates, making this a significant tax and regulatory concern.',
    topic: 'Business Acumen',
    subtopic: 'International Business'
  },
  {
    id: 'CIA3-B6-082',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The Sarbanes-Oxley Act Section 404 requires:',
    options: [
      'Auditor independence rules only',
      'Management assessment and auditor attestation of internal controls over financial reporting',
      'Only whistleblower protections',
      'Environmental compliance reporting'
    ],
    correctAnswer: 1,
    explanation: 'SOX 404 requires management to assess and report on internal control effectiveness and, for larger companies, requires external auditor attestation of management\'s assessment.',
    topic: 'Business Acumen',
    subtopic: 'Regulatory Compliance'
  },
  {
    id: 'CIA3-B6-083',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Economic Order Quantity (EOQ) model is used to determine:',
    options: [
      'The optimal number of employees',
      'The optimal order size to minimize total inventory costs',
      'The maximum production capacity',
      'The selling price of products'
    ],
    correctAnswer: 1,
    explanation: 'EOQ calculates the optimal order quantity that minimizes total inventory costs, balancing ordering costs (decrease with larger orders) and holding costs (increase with larger orders).',
    topic: 'Business Acumen',
    subtopic: 'Operations Management'
  },
  {
    id: 'CIA3-B6-084',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The debt-to-equity ratio measures:',
    options: [
      'Profitability',
      'Liquidity',
      'Financial leverage',
      'Operational efficiency'
    ],
    correctAnswer: 2,
    explanation: 'The debt-to-equity ratio (Total Debt / Total Equity) measures financial leverage—the extent to which the company is financed by debt versus equity. Higher ratios indicate more leverage.',
    topic: 'Business Acumen',
    subtopic: 'Financial Analysis'
  },
  {
    id: 'CIA3-B6-085',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Variance analysis compares actual results to:',
    options: [
      'Competitor performance only',
      'Budgeted or standard amounts to identify causes of differences',
      'Random benchmarks',
      'Historical results only'
    ],
    correctAnswer: 1,
    explanation: 'Variance analysis compares actual performance to budgets or standards, analyzing the causes of favorable and unfavorable variances to improve performance and planning.',
    topic: 'Business Acumen',
    subtopic: 'Performance Analysis'
  },
  {
    id: 'CIA3-B6-086',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Working capital management focuses on:',
    options: [
      'Long-term capital investments',
      'Managing current assets and current liabilities to ensure liquidity',
      'Stock market investments',
      'Mergers and acquisitions'
    ],
    correctAnswer: 1,
    explanation: 'Working capital management involves managing current assets (cash, receivables, inventory) and current liabilities to maintain adequate liquidity while minimizing costs.',
    topic: 'Business Acumen',
    subtopic: 'Financial Management'
  },
  {
    id: 'CIA3-B6-087',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'An organization\'s control environment includes:',
    options: [
      'Only written policies',
      'The attitudes, awareness, and actions of management regarding internal control',
      'Physical security equipment only',
      'IT infrastructure'
    ],
    correctAnswer: 1,
    explanation: 'Control environment is the foundation for all other internal control components, encompassing the tone at the top, organizational culture, values, and management\'s commitment to integrity.',
    topic: 'Business Acumen',
    subtopic: 'Internal Control'
  },
  {
    id: 'CIA3-B6-088',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'COSO ERM Framework identifies how many components of enterprise risk management?',
    options: [
      'Three',
      'Five',
      'Eight',
      'Ten'
    ],
    correctAnswer: 2,
    explanation: 'The COSO ERM Framework identifies eight interrelated components: Internal Environment, Objective Setting, Event Identification, Risk Assessment, Risk Response, Control Activities, Information and Communication, and Monitoring.',
    topic: 'Business Acumen',
    subtopic: 'Risk Management'
  },
  {
    id: 'CIA3-B6-089',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Enterprise Resource Planning (ERP) systems are designed to:',
    options: [
      'Replace all employees',
      'Integrate business processes and data across the organization in a unified system',
      'Handle only accounting functions',
      'Manage social media presence'
    ],
    correctAnswer: 1,
    explanation: 'ERP systems integrate core business processes (finance, operations, HR, supply chain) into a single unified system with a common database for consistent, real-time information.',
    topic: 'Information Technology',
    subtopic: 'Business Systems'
  },
  {
    id: 'CIA3-B6-090',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Zero-based budgeting requires:',
    options: [
      'Starting from last year\'s budget with minor adjustments',
      'Justifying all expenses from zero each budget period',
      'No budget at all',
      'Automatic approval of all prior allocations'
    ],
    correctAnswer: 1,
    explanation: 'Zero-based budgeting requires justifying every expense from scratch each budget period rather than simply adjusting prior budgets. This forces evaluation of all activities.',
    topic: 'Business Acumen',
    subtopic: 'Budgeting'
  },

  // Additional CIA Part 1 & 2 Questions
  {
    id: 'CIA1-B6-091',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to IIA guidance, internal auditing helps an organization:',
    options: [
      'Maximize profits above all else',
      'Accomplish its objectives through a systematic approach to evaluate and improve effectiveness of risk management, control, and governance',
      'Replace management decision-making',
      'Guarantee elimination of all risks'
    ],
    correctAnswer: 1,
    explanation: 'The IIA definition states internal auditing helps organizations accomplish objectives through systematic, disciplined evaluation and improvement of risk management, control, and governance.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Definition and Purpose'
  },
  {
    id: 'CIA2-B6-092',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Final audit communications should include all of the following EXCEPT:',
    options: [
      'Engagement objectives and scope',
      'Relevant conclusions and recommendations',
      'Detailed personal opinions about management competence',
      'Applicable conclusions, opinions, and action plans'
    ],
    correctAnswer: 2,
    explanation: 'Audit communications must be accurate, objective, and constructive. Personal opinions about management competence are inappropriate; focus should be on processes, risks, and controls.',
    topic: 'Communicating Results',
    subtopic: 'Report Content'
  },
  {
    id: 'CIA2-B6-093',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Monitoring progress on management action plans is primarily the responsibility of:',
    options: [
      'External auditors',
      'The internal audit activity',
      'The board of directors exclusively',
      'No one; it is optional'
    ],
    correctAnswer: 1,
    explanation: 'Internal audit should establish a follow-up process to monitor and ensure that management actions have been effectively implemented or that senior management has accepted the risk.',
    topic: 'Managing Internal Audit',
    subtopic: 'Follow-Up'
  },
  {
    id: 'CIA1-B6-094',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The internal audit activity should be free from interference in all of the following EXCEPT:',
    options: [
      'Determining the scope of engagements',
      'Performing work',
      'Communicating results',
      'Strategic business decisions'
    ],
    correctAnswer: 3,
    explanation: 'Internal audit should be free from interference in determining scope, performing work, and communicating results. Strategic business decisions are management\'s responsibility.',
    topic: 'Independence and Objectivity',
    subtopic: 'Organizational Independence'
  },
  {
    id: 'CIA2-B6-095',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'When an engagement\'s observations include significant matters affecting the organization, they should be communicated to:',
    options: [
      'Only the engagement client',
      'Senior management and/or the board',
      'All employees',
      'External regulators first'
    ],
    correctAnswer: 1,
    explanation: 'Significant matters affecting the organization, including strategic and operational issues, must be communicated to senior management and/or the board as appropriate.',
    topic: 'Communicating Results',
    subtopic: 'Significant Matters'
  },
  {
    id: 'CIA1-B6-096',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The IIA Code of Ethics includes both principles and rules of conduct. The rules of conduct describe:',
    options: [
      'General philosophical guidelines',
      'Specific behaviors expected of internal auditors',
      'Legal requirements only',
      'Suggestions that are optional'
    ],
    correctAnswer: 1,
    explanation: 'The IIA Code of Ethics includes four principles and corresponding rules of conduct that describe specific behaviors expected of internal auditors to uphold those principles.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics'
  },
  {
    id: 'CIA2-B6-097',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Data analytics in auditing can help auditors:',
    options: [
      'Replace professional judgment entirely',
      'Analyze entire populations and identify patterns and anomalies',
      'Eliminate the need for sampling',
      'Guarantee fraud detection'
    ],
    correctAnswer: 1,
    explanation: 'Data analytics enables auditors to analyze entire populations, identify patterns, trends, and anomalies that might indicate risk. However, it complements rather than replaces judgment.',
    topic: 'Performing the Engagement',
    subtopic: 'Data Analytics'
  },
  {
    id: 'CIA3-B6-098',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Corporate governance mechanisms include:',
    options: [
      'Only shareholder voting',
      'Board oversight, executive compensation, internal audit, and external audit',
      'Customer feedback surveys',
      'Marketing campaigns'
    ],
    correctAnswer: 1,
    explanation: 'Corporate governance mechanisms include various oversight functions: board of directors, audit committee, internal audit, external audit, executive compensation structures, and regulatory oversight.',
    topic: 'Business Acumen',
    subtopic: 'Governance'
  },
  {
    id: 'CIA2-B6-099',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'The CAE should share information and coordinate activities with:',
    options: [
      'No one to maintain complete independence',
      'Only the CEO',
      'Other internal and external providers of assurance and consulting services',
      'Competitors to benchmark practices'
    ],
    correctAnswer: 2,
    explanation: 'To ensure proper coverage and minimize duplication, the CAE should share information and coordinate activities with other internal and external assurance providers.',
    topic: 'Managing Internal Audit',
    subtopic: 'Coordination'
  },
  {
    id: 'CIA1-B6-100',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When the internal audit activity evaluates governance processes, it should evaluate improvements to:',
    options: [
      'Only IT governance',
      'Promoting appropriate ethics and values, ensuring effective performance management, and communicating risk and control information',
      'Only financial reporting processes',
      'Marketing strategies'
    ],
    correctAnswer: 1,
    explanation: 'Internal audit\'s governance evaluation should cover promoting ethics and values, ensuring accountability, communicating risk and control information, and coordinating activities among oversight groups.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Governance'
  },
];
