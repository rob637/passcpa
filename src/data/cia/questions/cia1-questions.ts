/**
 * CIA Part 1: Essentials of Internal Auditing
 * 125 questions | 2.5 hours | Scaled score 600/750 to pass
 * 
 * Domain I: Foundations of Internal Auditing (40%)
 * Domain II: Independence and Objectivity (15%)
 * Domain III: Proficiency and Due Professional Care (15%)
 * Domain IV: Quality Assurance and Improvement Program (10%)
 * Domain V: Governance, Risk Management, and Control (20%)
 */

import { Question } from '../../../types';

export const CIA1_QUESTIONS: Question[] = [
  // ============================================================================
  // DOMAIN I: FOUNDATIONS OF INTERNAL AUDITING (40%)
  // ============================================================================
  
  {
    id: 'CIA1-001',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to the IIA Code of Ethics, which of the following principles requires internal auditors to disclose all material facts known to them that, if not disclosed, may distort the reporting of activities under review?',
    options: [
      'Integrity',
      'Objectivity',
      'Confidentiality',
      'Competency'
    ],
    correctAnswer: 1,
    explanation: 'Objectivity requires internal auditors to disclose all material facts known to them that, if not disclosed, may distort the reporting of activities under review. Integrity establishes trust. Confidentiality requires prudent use of information. Competency involves knowledge and skills.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics'
  },
  {
    id: 'CIA1-002',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'Which of the following best describes the difference between assurance services and consulting services provided by internal audit?',
    options: [
      'Assurance services involve 2 parties, while consulting involves 3 parties',
      'Assurance services are customer-driven, while consulting services are auditor-driven',
      'Assurance services involve 3 parties (auditee, auditor, user), while consulting involves 2 parties (customer, auditor)',
      'There is no fundamental difference in the structure of the engagement'
    ],
    correctAnswer: 2,
    explanation: 'Assurance services typically involve three parties: the person/group directly involved with the process (process owner/auditee), the person making the assessment (auditor), and the person using the assessment (user). Consulting services generally involve two parties: the customer and the internal auditor.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Charter'
  },
  {
    id: 'CIA1-003',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Organizational independence is effectively achieved when the chief audit executive (CAE) reports functionally to whom?',
    options: [
      'The CEO',
      'The Board or Audit Committee',
      'The CFO',
      'Legal Counsel'
    ],
    correctAnswer: 1,
    explanation: 'To maintain organizational independence, the CAE should report functionally to the Board (or Audit Committee) and administratively to Senior Management (e.g., CEO). Functional reporting includes approval of the charter, risk assessment, and audit plan.',
    topic: 'Independence and Objectivity',
    subtopic: 'Organizational Independence'
  },
  {
    id: 'CIA1-004',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'According to the IIA definition, internal auditing is an independent, objective assurance and consulting activity designed to:',
    options: [
      'Detect fraud and errors in financial statements',
      'Add value and improve an organization\'s operations',
      'Replace external audit functions',
      'Ensure regulatory compliance only'
    ],
    correctAnswer: 1,
    explanation: 'The IIA definition states that internal auditing is designed to add value and improve an organization\'s operations. It helps an organization accomplish its objectives by bringing a systematic, disciplined approach to evaluate and improve the effectiveness of risk management, control, and governance processes.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Definition of Internal Auditing'
  },
  {
    id: 'CIA1-005',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The Mission of Internal Audit as stated in the IPPF is to:',
    options: [
      'Provide reasonable assurance on financial statements',
      'Enhance and protect organizational value by providing risk-based and objective assurance, advice, and insight',
      'Ensure compliance with all laws and regulations',
      'Identify and prevent all instances of fraud'
    ],
    correctAnswer: 1,
    explanation: 'The Mission of Internal Audit states: "To enhance and protect organizational value by providing risk-based and objective assurance, advice, and insight." This mission is a key component of the IPPF and guides internal audit activities.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Mission of Internal Audit'
  },
  {
    id: 'CIA1-006',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which Core Principle of Internal Auditing relates to demonstrating competence and applying knowledge, skills, and experience?',
    options: [
      'Demonstrates integrity',
      'Is objective and free from undue influence',
      'Applies a systematic and disciplined approach',
      'Is appropriately positioned and adequately resourced'
    ],
    correctAnswer: 2,
    explanation: 'The Core Principle "Applies a systematic and disciplined approach" encompasses demonstrating competence and applying knowledge, skills, and experience. Competent internal auditors use professional judgment in performing their work.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles'
  },
  {
    id: 'CIA1-007',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'The four principles of the IIA Code of Ethics are:',
    options: [
      'Honesty, Fairness, Competency, Objectivity',
      'Integrity, Objectivity, Confidentiality, Competency',
      'Independence, Professional Care, Integrity, Objectivity',
      'Truth, Fairness, Due Care, Independence'
    ],
    correctAnswer: 1,
    explanation: 'The IIA Code of Ethics includes four Principles: Integrity, Objectivity, Confidentiality, and Competency. Internal auditors are expected to apply and uphold these principles in their conduct and practice.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics'
  },
  {
    id: 'CIA1-008',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'An internal auditor discovers that a close friend is the subject of an upcoming fraud investigation. According to the Code of Ethics, the auditor should:',
    options: [
      'Proceed with the engagement but avoid direct interaction',
      'Disclose the relationship to supervision and recuse from the engagement',
      'Complete the engagement but have another auditor review the work',
      'Inform the friend about the upcoming investigation'
    ],
    correctAnswer: 1,
    explanation: 'Objectivity requires auditors to disclose relationships that could impair their impartiality. The auditor should disclose the relationship to their supervisor and recuse themselves from the engagement. Informing the friend would violate confidentiality.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics'
  },
  {
    id: 'CIA1-009',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The internal audit charter should be approved by:',
    options: [
      'The CEO',
      'The CFO',
      'The Board',
      'Senior Management'
    ],
    correctAnswer: 2,
    explanation: 'The internal audit charter must be approved by the Board. This establishes the internal audit activity\'s authority, access, and scope. Board approval reinforces organizational independence.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Internal Audit Charter'
  },
  {
    id: 'CIA1-010',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which of the following is a mandatory element of the International Professional Practices Framework (IPPF)?',
    options: [
      'Implementation Guides',
      'Practice Guides',
      'Core Principles for Internal Auditing',
      'Supplemental Guidance'
    ],
    correctAnswer: 2,
    explanation: 'The IPPF mandatory elements include: Mission, Core Principles, Definition of Internal Auditing, Code of Ethics, and the Standards. Implementation Guides and Practice Guides are recommended guidance.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'IPPF Framework'
  },
  {
    id: 'CIA1-011',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'According to the Standards, internal audit\'s purpose is to promote and evaluate:',
    options: [
      'Financial statement accuracy',
      'Management performance',
      'The improvement of governance, risk management, and control processes',
      'External audit quality'
    ],
    correctAnswer: 2,
    explanation: 'Standard 2100 states that internal audit evaluates and contributes to the improvement of governance, risk management, and control processes using a systematic and disciplined approach.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Nature of Work'
  },
  {
    id: 'CIA1-012',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When internal audit proposes changes to the audit charter, what is the proper sequence of events?',
    options: [
      'CAE implements changes, then informs the Board',
      'CAE proposes changes to management, management approves, CAE informs Board',
      'CAE discusses with management, presents to the Board for approval',
      'Board directs changes, CAE implements them'
    ],
    correctAnswer: 2,
    explanation: 'Changes to the audit charter should be discussed with management and then presented to the Board for approval. The Board has final approval authority over the charter to ensure organizational independence is maintained.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Internal Audit Charter'
  },
  {
    id: 'CIA1-013',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which of the following best describes the relationship between internal auditing and risk management?',
    options: [
      'Internal audit is responsible for implementing risk management',
      'Internal audit should evaluate and recommend improvements to risk management processes',
      'Internal audit should replace the risk management function',
      'Internal audit has no role in risk management'
    ],
    correctAnswer: 1,
    explanation: 'Internal audit\'s role is to evaluate the effectiveness of risk management processes and recommend improvements. Management owns risk management; internal audit provides assurance. Taking ownership of risk management would impair independence.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Risk Management Role'
  },
  {
    id: 'CIA1-014',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'The primary purpose of the internal audit charter is to:',
    options: [
      'Define the audit budget',
      'Establish audit authority, responsibility, and purpose',
      'List all areas to be audited',
      'Document audit procedures'
    ],
    correctAnswer: 1,
    explanation: 'The internal audit charter is a formal document that defines the internal audit activity\'s purpose, authority, and responsibility. It establishes the internal audit activity\'s position within the organization.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Internal Audit Charter'
  },
  {
    id: 'CIA1-015',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to the IIA, which type of internal audit service involves examining evidence to provide an assessment?',
    options: [
      'Advisory services',
      'Assurance services',
      'Facilitation services',
      'Training services'
    ],
    correctAnswer: 1,
    explanation: 'Assurance services involve examining evidence to provide an independent assessment on governance, risk management, and control processes. Consulting services are advisory in nature and agreed upon with the client.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Nature of Work'
  },

  // ============================================================================
  // DOMAIN II: INDEPENDENCE AND OBJECTIVITY (15%)
  // ============================================================================

  {
    id: 'CIA1-016',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which of the following activities would most likely impair an internal auditor\'s objectivity?',
    options: [
      'Providing advice on control design for a new system',
      'Reviewing operations previously performed by the auditor one year ago',
      'Participating on a committee that recommends standards for control of assets',
      'Reviewing a budget prepared by the department manager'
    ],
    correctAnswer: 1,
    explanation: 'Reviewing operations the auditor previously performed (self-review threat) impairs objectivity. IIA Standard 1130.A1 states internal auditors should not audit operations for which they had responsibility within the past year.',
    topic: 'Independence and Objectivity',
    subtopic: 'Impairments to Objectivity'
  },
  {
    id: 'CIA1-017',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'The CAE reports administratively to the CEO and functionally to the Audit Committee. If the CEO pressures the CAE to exclude a significant finding from the audit report, the CAE should:',
    options: [
      'Comply with the CEO\'s request to maintain the working relationship',
      'Exclude the finding but document the pressure in workpapers',
      'Report the interference to the Audit Committee',
      'Resign from the position'
    ],
    correctAnswer: 2,
    explanation: 'Management interference with internal audit is an impairment to independence. The CAE should report this to the Audit Committee, which has functional oversight of internal audit. This protects organizational independence.',
    topic: 'Independence and Objectivity',
    subtopic: 'Organizational Independence'
  },
  {
    id: 'CIA1-018',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'An internal auditor is offered a gift by an auditee after completing an engagement. The auditor should:',
    options: [
      'Accept the gift if it has minimal value',
      'Decline the gift to preserve objectivity',
      'Accept the gift and disclose it to management',
      'Accept the gift if it is given to all auditors'
    ],
    correctAnswer: 1,
    explanation: 'Internal auditors should decline gifts that could impair or be presumed to impair their professional judgment. Even gifts of minimal value can create an appearance of impaired objectivity.',
    topic: 'Independence and Objectivity',
    subtopic: 'Individual Objectivity'
  },
  {
    id: 'CIA1-019',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Organizational independence means:',
    options: [
      'Each auditor works alone without supervision',
      'Internal audit is free from interference in determining scope and communicating results',
      'Internal audit operates as an external firm',
      'The CAE reports only to the CEO'
    ],
    correctAnswer: 1,
    explanation: 'Organizational independence is achieved when the CAE reports to a level within the organization that allows the internal audit activity to fulfill its responsibilities free from interference in determining scope, performing work, and communicating results.',
    topic: 'Independence and Objectivity',
    subtopic: 'Organizational Independence'
  },
  {
    id: 'CIA1-020',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'An internal auditor has been asked to provide consulting services to a department where the auditor\'s spouse is the manager. According to the Standards, the auditor should:',
    options: [
      'Accept the engagement with enhanced supervision',
      'Decline the engagement due to impairment to objectivity',
      'Accept if the spouse does not directly benefit',
      'Accept only if the engagement is low risk'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1130 states auditors must refrain from assessing specific operations for which they were previously responsible. Close personal relationships, such as with a spouse, create an impairment that cannot be managed through supervision alone.',
    topic: 'Independence and Objectivity',
    subtopic: 'Impairments to Objectivity'
  },
  {
    id: 'CIA1-021',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Functional reporting of the CAE to the Board includes which of the following?',
    options: [
      'Daily supervision of audit staff',
      'Approval of audit plan and budget',
      'Administrative matters only',
      'Performance evaluations of audit staff'
    ],
    correctAnswer: 1,
    explanation: 'Functional reporting to the Board includes: approval of audit charter, risk-based audit plan, and budget; appointment and removal of CAE; and receiving communications from the CAE on internal audit activities and results.',
    topic: 'Independence and Objectivity',
    subtopic: 'Organizational Independence'
  },
  {
    id: 'CIA1-022',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'If internal audit is asked to assume responsibility for a business process, the CAE should:',
    options: [
      'Accept the responsibility to add value to the organization',
      'Decline, as this would impair independence',
      'Accept temporarily during a transition period only',
      'Accept if the Board approves'
    ],
    correctAnswer: 1,
    explanation: 'Internal audit should not assume management responsibilities, as this impairs independence and objectivity. Internal audit cannot objectively assess operations for which it has responsibility.',
    topic: 'Independence and Objectivity',
    subtopic: 'Impairments to Independence'
  },
  {
    id: 'CIA1-023',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Objectivity is:',
    options: [
      'An organizational attribute',
      'An individual auditor attribute related to unbiased mental attitude',
      'Synonymous with independence',
      'Required only for assurance engagements'
    ],
    correctAnswer: 1,
    explanation: 'Objectivity is an unbiased mental attitude that allows internal auditors to perform engagements without bias. It is an individual attribute, while independence is an organizational attribute.',
    topic: 'Independence and Objectivity',
    subtopic: 'Individual Objectivity'
  },

  // ============================================================================
  // DOMAIN III: PROFICIENCY AND DUE PROFESSIONAL CARE (15%)
  // ============================================================================

  {
    id: 'CIA1-024',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Due professional care requires internal auditors to consider all of the following EXCEPT:',
    options: [
      'The relative complexity and materiality of matters to which assurance procedures are applied',
      'The probability of significant errors or irregularities',
      'Guaranteeing that all risks have been identified',
      'The adequacy and effectiveness of governance, risk management, and control'
    ],
    correctAnswer: 2,
    explanation: 'Due professional care does not imply infallibility or guarantee that all risks, controls issues, or irregularities will be identified. Auditors should exercise reasonable care consistent with professional standards.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Due Professional Care'
  },
  {
    id: 'CIA1-025',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Internal auditors must possess what level of proficiency with regard to IT?',
    options: [
      'Expert level for all IT matters',
      'No IT knowledge is required',
      'Sufficient knowledge to identify indicators of IT risks',
      'Only basic computer skills'
    ],
    correctAnswer: 2,
    explanation: 'Internal auditors should have sufficient knowledge of key IT risks and controls and available technology-based audit techniques. They need not be IT experts but must understand IT well enough to identify potential risks.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Proficiency'
  },
  {
    id: 'CIA1-026',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The CAE must ensure the internal audit activity collectively possesses or obtains knowledge needed to evaluate:',
    options: [
      'Only financial operations',
      'Risks and controls related to IT and other specialized areas',
      'External audit procedures',
      'Competitor operations'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1210 states that internal auditors must collectively possess or obtain knowledge, skills, and competencies needed to perform responsibilities, including fraud risks, IT risks, and other specialized areas.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Proficiency'
  },
  {
    id: 'CIA1-027',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When internal auditors lack expertise needed for an engagement, the CAE should:',
    options: [
      'Decline the engagement',
      'Obtain competent advice and assistance from qualified sources',
      'Limit the scope to areas of expertise',
      'Train the auditors before proceeding'
    ],
    correctAnswer: 1,
    explanation: 'When internal auditors lack sufficient knowledge or experience, the CAE should obtain competent advice and assistance. This may include using external service providers or internal subject matter experts.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Using External Resources'
  },
  {
    id: 'CIA1-028',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Continuing professional development (CPD) is required because:',
    options: [
      'It is mandated by all employers',
      'It helps auditors maintain and enhance their professional competencies',
      'It is optional for experienced auditors',
      'It replaces on-the-job training'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1230 requires internal auditors to enhance their knowledge, skills, and competencies through continuing professional development. This ensures they remain current with industry developments and techniques.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Continuing Professional Development'
  },
  {
    id: 'CIA1-029',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Internal auditors must have sufficient knowledge to evaluate fraud risk. This means:',
    options: [
      'They must be fraud examiners',
      'They should be able to identify indicators that fraud may have occurred',
      'They must investigate all suspected fraud',
      'They only need to report fraud if discovered accidentally'
    ],
    correctAnswer: 1,
    explanation: 'Internal auditors should have sufficient knowledge to identify indicators of fraud, but they are not expected to have expertise similar to fraud specialists. They should be alert to situations indicating fraud may have occurred.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Fraud Knowledge'
  },
  {
    id: 'CIA1-030',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'In exercising due professional care during an assurance engagement, internal auditors should consider:',
    options: [
      'Cost considerations alone',
      'The needs of management only',
      'The nature and extent of work needed to achieve engagement objectives',
      'Time constraints as the primary factor'
    ],
    correctAnswer: 2,
    explanation: 'Due professional care requires considering the nature and extent of work needed to achieve engagement objectives, relative complexity and materiality of matters, and adequacy of governance, risk management, and control.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Due Professional Care'
  },

  // ============================================================================
  // DOMAIN IV: QUALITY ASSURANCE AND IMPROVEMENT PROGRAM (10%)
  // ============================================================================

  {
    id: 'CIA1-031',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'A Quality Assurance and Improvement Program (QAIP) must include:',
    options: [
      'External assessments only',
      'Internal assessments only',
      'Both internal and external assessments',
      'Self-assessments by auditors only'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1310 requires the QAIP to include both internal and external assessments. Internal assessments include ongoing monitoring and periodic self-assessments. External assessments must be conducted at least once every 5 years.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'QAIP Requirements'
  },
  {
    id: 'CIA1-032',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'How often must external assessments of the internal audit activity be conducted?',
    options: [
      'Annually',
      'Every three years',
      'At least once every five years',
      'Only when deficiencies are suspected'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1312 requires external assessments to be conducted at least once every five years by a qualified, independent assessor or assessment team from outside the organization.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'External Assessments'
  },
  {
    id: 'CIA1-033',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The primary purpose of ongoing monitoring as part of the QAIP is to:',
    options: [
      'Replace external assessments',
      'Provide continuous oversight of internal audit performance',
      'Satisfy regulatory requirements only',
      'Reduce audit costs'
    ],
    correctAnswer: 1,
    explanation: 'Ongoing monitoring provides continuous oversight through routine quality activities such as supervision, checklists, feedback surveys, and engagement reviews. This is an integral part of day-to-day audit management.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'Internal Assessments'
  },
  {
    id: 'CIA1-034',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'An external assessment of the internal audit activity may be performed by:',
    options: [
      'Internal auditors from another department',
      'Audit committee members',
      'A qualified independent assessor from outside the organization',
      'The organization\'s external auditors exclusively'
    ],
    correctAnswer: 2,
    explanation: 'External assessments must be conducted by a qualified, independent assessor or team from outside the organization. This person must be competent in professional practices and the external assessment process.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'External Assessments'
  },
  {
    id: 'CIA1-035',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The CAE must communicate QAIP results to:',
    options: [
      'Audit staff only',
      'External auditors only',
      'Senior management and the Board',
      'Regulatory bodies'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1320 requires the CAE to communicate results of the QAIP to senior management and the Board, including scope and frequency of assessments, qualifications of assessors, conclusions, and corrective actions.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'Reporting on Quality'
  },
  {
    id: 'CIA1-036',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'When can internal audit use the phrase "Conforms with the IIA Standards"?',
    options: [
      'When the CAE believes they conform',
      'When supported by results of the QAIP',
      'When external auditors agree',
      'When no significant findings exist'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1321 states that the CAE may state the internal audit activity conforms with the Standards only when supported by the results of the QAIP. This includes results of both internal and external assessments.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'Conformance Reporting'
  },

  // ============================================================================
  // DOMAIN V: GOVERNANCE, RISK MANAGEMENT, AND CONTROL (20%)
  // ============================================================================

  {
    id: 'CIA1-037',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Corporate governance refers to:',
    options: [
      'Government regulations affecting corporations',
      'The combination of processes and structures used by the board to direct and manage the organization',
      'The relationship between the organization and external auditors',
      'The company\'s strategic planning process'
    ],
    correctAnswer: 1,
    explanation: 'Governance is the combination of processes and structures implemented by the board to inform, direct, manage, and monitor the activities of the organization toward achievement of its objectives.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Corporate Governance'
  },
  {
    id: 'CIA1-038',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Risk is defined as:',
    options: [
      'Something that has already occurred',
      'The possibility of an event occurring that will have an impact on achievement of objectives',
      'An internal control weakness',
      'A compliance violation'
    ],
    correctAnswer: 1,
    explanation: 'Risk is the possibility of an event occurring that will have an impact on the achievement of objectives. Risk is measured in terms of impact and likelihood.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Concepts'
  },
  {
    id: 'CIA1-039',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The COSO Internal Control Framework includes how many components?',
    options: [
      'Three',
      'Four',
      'Five',
      'Six'
    ],
    correctAnswer: 2,
    explanation: 'The COSO Internal Control Framework includes five interrelated components: Control Environment, Risk Assessment, Control Activities, Information and Communication, and Monitoring Activities.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Internal Control Frameworks'
  },
  {
    id: 'CIA1-040',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'Which COSO component is considered the foundation for all other internal control components?',
    options: [
      'Risk Assessment',
      'Control Activities',
      'Control Environment',
      'Monitoring'
    ],
    correctAnswer: 2,
    explanation: 'Control Environment is the foundation for all other components. It sets the tone of the organization, influences control consciousness, and includes integrity, ethical values, management philosophy, operating style, and competence.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Internal Control Frameworks'
  },
  {
    id: 'CIA1-041',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Risk appetite differs from risk tolerance in that risk appetite:',
    options: [
      'Focuses on specific risks while tolerance is overall',
      'Is the broad amount of risk an organization accepts to achieve objectives, while tolerance is acceptable variation',
      'Is a quantitative measure while tolerance is qualitative',
      'There is no difference; the terms are interchangeable'
    ],
    correctAnswer: 1,
    explanation: 'Risk appetite is the broad-based amount of risk an organization is willing to accept in pursuit of its mission. Risk tolerance is the acceptable level of variation relative to achievement of a specific objective.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Concepts'
  },
  {
    id: 'CIA1-042',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Preventive controls are designed to:',
    options: [
      'Detect errors after they occur',
      'Correct errors after they are detected',
      'Deter undesirable events from occurring',
      'Monitor ongoing activities'
    ],
    correctAnswer: 2,
    explanation: 'Preventive controls are proactive controls designed to deter or prevent undesirable events from occurring. Examples include segregation of duties, approvals, and access controls.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Control Types'
  },
  {
    id: 'CIA1-043',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to the Three Lines Model, the second line provides:',
    options: [
      'Direct control over business operations',
      'Expertise, support, monitoring and challenge on risk-related matters',
      'Independent assurance on governance, risk, and control',
      'External validation of internal controls'
    ],
    correctAnswer: 1,
    explanation: 'The second line (e.g., risk management, compliance, quality) provides expertise, support, monitoring, and challenge on risk-related matters. They assist the first line but do not own the risks.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Three Lines Model'
  },
  {
    id: 'CIA1-044',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'Internal audit\'s role in ERM (Enterprise Risk Management) is to:',
    options: [
      'Own and manage the ERM process',
      'Provide assurance on the effectiveness of risk management',
      'Set risk appetite and tolerance',
      'Make risk treatment decisions'
    ],
    correctAnswer: 1,
    explanation: 'Internal audit provides assurance on the effectiveness of risk management processes. It should not own risks or make risk treatment decisions, as this would impair its independence. Management owns ERM.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Management'
  },
  {
    id: 'CIA1-045',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Residual risk is:',
    options: [
      'Risk that remains after management takes action to reduce impact or likelihood',
      'Risk that has been completely eliminated',
      'Risk that has not been identified',
      'The same as inherent risk'
    ],
    correctAnswer: 0,
    explanation: 'Residual risk is the risk remaining after management takes action to reduce the impact and/or likelihood of an adverse event. Inherent risk is the risk before any controls are applied.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Concepts'
  },
  {
    id: 'CIA1-046',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Detective controls are designed to:',
    options: [
      'Prevent errors from occurring',
      'Identify errors or irregularities after they have occurred',
      'Correct errors immediately',
      'Replace preventive controls'
    ],
    correctAnswer: 1,
    explanation: 'Detective controls identify errors or irregularities after they have occurred. Examples include reconciliations, reviews, audits, and exception reports.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Control Types'
  },
  {
    id: 'CIA1-047',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The board\'s governance responsibilities include all of the following EXCEPT:',
    options: [
      'Establishing the tone at the top',
      'Overseeing risk management',
      'Performing daily operational activities',
      'Holding management accountable'
    ],
    correctAnswer: 2,
    explanation: 'The board provides oversight and governance but does not perform daily operational activities. Management is responsible for operations; the board provides direction and monitors performance.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Corporate Governance'
  },
  {
    id: 'CIA1-048',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When management has accepted a level of risk that the CAE believes is unacceptable to the organization, the CAE should:',
    options: [
      'Accept management\'s decision and close the issue',
      'Document the disagreement and continue with subsequent audits',
      'Discuss the matter with senior management and if not resolved, with the Board',
      'Report the issue to external regulators'
    ],
    correctAnswer: 2,
    explanation: 'Standard 2600 states that if the CAE believes management has accepted a level of risk that may be unacceptable, the CAE must discuss the matter with senior management. If not resolved, it should be communicated to the Board.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Acceptance'
  },
  {
    id: 'CIA1-049',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Segregation of duties is an example of which type of control?',
    options: [
      'Detective control',
      'Corrective control',
      'Preventive control',
      'Compensating control'
    ],
    correctAnswer: 2,
    explanation: 'Segregation of duties is a preventive control that prevents a single person from having control over all aspects of a transaction, reducing opportunities for error or fraud.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Control Types'
  },
  {
    id: 'CIA1-050',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Risk responses include all of the following EXCEPT:',
    options: [
      'Accept',
      'Avoid',
      'Ignore',
      'Mitigate'
    ],
    correctAnswer: 2,
    explanation: 'Risk responses include: Accept (retain), Avoid (eliminate), Mitigate (reduce likelihood/impact), and Transfer (share or insure). "Ignore" is not a valid risk response; risks must be consciously addressed.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Response'
  },

  // Additional questions for comprehensive coverage

  {
    id: 'CIA1-051',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to the Standards, the internal audit activity must assess and make recommendations for improving governance processes for:',
    options: [
      'Ethics and values only',
      'IT controls only',
      'Ethics and values, performance management, accountability, and communicating risk and control information',
      'Financial reporting only'
    ],
    correctAnswer: 2,
    explanation: 'Standard 2110 states internal audit must evaluate governance related to: ethics and values, performance management and accountability, communicating risk and control information, and coordination among oversight entities.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Governance Assessment'
  },
  {
    id: 'CIA1-052',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'An internal auditor identifies a significant control deficiency during a consulting engagement. The auditor should:',
    options: [
      'Ignore it since it was a consulting engagement',
      'Report only to the department being consulted',
      'Communicate the finding to management and consider reporting to the Board',
      'Open a separate assurance engagement to validate the finding'
    ],
    correctAnswer: 2,
    explanation: 'Standard 2440 states that when significant control deficiencies are discovered, whether in assurance or consulting engagements, they must be communicated to senior management and the Board.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Consulting vs Assurance'
  },
  {
    id: 'CIA1-053',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The IIA Standard on communicating results requires that communications:',
    options: [
      'Present only negative findings',
      'Be accurate, objective, clear, concise, constructive, complete, and timely',
      'Always follow a standard template',
      'Be limited to control weaknesses only'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2420 requires communications to be accurate, objective, clear, concise, constructive, complete, and timely. These quality criteria ensure effectiveness of audit communications.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Communication Standards'
  },
  {
    id: 'CIA1-054',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Which element of the IPPF is mandatory?',
    options: [
      'Position papers',
      'Practice advisories',
      'The Standards',
      'Practice guides'
    ],
    correctAnswer: 2,
    explanation: 'Mandatory guidance includes: the Mission, Core Principles, Definition, Code of Ethics, and the Standards. Practice advisories, position papers, and practice guides are recommended guidance.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'IPPF Framework'
  },
  {
    id: 'CIA1-055',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'If an internal auditor discovers evidence of illegal activity during an engagement, the auditor should:',
    options: [
      'Immediately contact law enforcement',
      'Report the matter to appropriate parties within the organization',
      'Confront the individuals involved',
      'Complete the engagement without taking action'
    ],
    correctAnswer: 1,
    explanation: 'The auditor should report evidence of illegal activity to appropriate parties within the organization, typically management and the Board. Legal requirements for reporting to external parties should be followed as applicable.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Reporting Irregularities'
  },
  {
    id: 'CIA1-056',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'What is the relationship between inherent risk and residual risk?',
    options: [
      'They are the same concept',
      'Residual risk = Inherent risk minus effect of controls',
      'Inherent risk is always lower than residual risk',
      'They measure different types of events'
    ],
    correctAnswer: 1,
    explanation: 'Residual risk equals inherent risk minus the effect of controls. Inherent risk is the risk before controls; residual risk remains after controls are applied. Effective controls reduce inherent risk to an acceptable residual level.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Concepts'
  },
  {
    id: 'CIA1-057',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Internal auditors providing assurance over areas where they previously provided consulting services must:',
    options: [
      'Never provide such assurance',
      'Wait one year before providing assurance',
      'Document the nature of consulting and ensure objectivity is not impaired',
      'Obtain Board approval'
    ],
    correctAnswer: 2,
    explanation: 'Auditors may provide assurance over areas where they previously consulted, but they must document the nature of consulting provided and ensure objectivity is not impaired. Prior consulting alone does not necessarily impair objectivity.',
    topic: 'Independence and Objectivity',
    subtopic: 'Consulting and Assurance'
  },
  {
    id: 'CIA1-058',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Confidentiality in the Code of Ethics means internal auditors:',
    options: [
      'Never share any information',
      'Should be prudent in the use and protection of information',
      'Can share information only with management',
      'Must encrypt all documents'
    ],
    correctAnswer: 1,
    explanation: 'Confidentiality requires internal auditors to be prudent in the use and protection of information acquired in the course of their duties. They shall not use information for personal gain or in a manner contrary to law or organizational ethics.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics'
  },
  {
    id: 'CIA1-059',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'The CAE must periodically review the internal audit charter and present it to:',
    options: [
      'External auditors for approval',
      'Senior management and the Board for approval',
      'All employees for awareness',
      'Regulatory authorities'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1000 requires the CAE to periodically review the internal audit charter and present it to senior management and the Board for approval. This ensures the charter remains current and reflects the activity\'s mandate.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Internal Audit Charter'
  },
  {
    id: 'CIA1-060',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'A control that relies on management review of exception reports is classified as:',
    options: [
      'Preventive control',
      'Detective control',
      'Directive control',
      'Corrective control'
    ],
    correctAnswer: 1,
    explanation: 'Exception reports and management reviews are detective controls because they identify errors or irregularities after they occur rather than preventing them from happening.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Control Types'
  },
  {
    id: 'CIA1-061',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to the Three Lines Model, internal audit:',
    options: [
      'Is the first line of defense',
      'Provides the second line of defense with management',
      'Provides independent assurance as the third line',
      'Is external to the model'
    ],
    correctAnswer: 2,
    explanation: 'In the Three Lines Model, internal audit provides independent assurance as the third line. The first line is management/operational areas; the second line is risk management and compliance functions.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Three Lines Model'
  },
  {
    id: 'CIA1-062',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Risk treatment strategies include all of the following EXCEPT:',
    options: [
      'Sharing risk through insurance',
      'Avoiding the activity causing the risk',
      'Transferring risk to third parties',
      'Hiding risk from stakeholders'
    ],
    correctAnswer: 3,
    explanation: 'Valid risk treatment strategies include: Accept (retain), Avoid, Mitigate (reduce), Share/Transfer. Hiding risk from stakeholders is not a valid strategy and violates governance principles.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Response'
  },
  {
    id: 'CIA1-063',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When internal audit resources are insufficient to complete the audit plan, the CAE should:',
    options: [
      'Complete only the engagements staff can handle',
      'Report the impact on the plan to senior management and the Board',
      'Extend the deadline for completing the plan',
      'Reduce testing without disclosing the reduction'
    ],
    correctAnswer: 1,
    explanation: 'The CAE must communicate the impact of resource limitations to senior management and the Board. This allows them to understand the risks of incomplete audit coverage and take appropriate action.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Resource Management'
  },
  {
    id: 'CIA1-064',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Tone at the top refers to:',
    options: [
      'Volume of speaking by executives',
      'Management\'s commitment to ethics and integrity',
      'Communication style of the CEO',
      'Position of the CAE in the organization'
    ],
    correctAnswer: 1,
    explanation: 'Tone at the top refers to management\'s commitment to ethics, integrity, and compliance. It is demonstrated through actions and communications of the board and senior management and is fundamental to the control environment.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Control Environment'
  },
  {
    id: 'CIA1-065',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'A self-assessment with independent validation is:',
    options: [
      'A type of internal assessment for the QAIP',
      'A type of external assessment for the QAIP',
      'Not recognized as a valid assessment method',
      'Required annually'
    ],
    correctAnswer: 1,
    explanation: 'A self-assessment with independent validation may be accepted as an external assessment under Standard 1312. The external validating party must be qualified and independent from the organization.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'External Assessments'
  },
  {
    id: 'CIA1-066',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'The purpose of the internal audit charter is NOT to:',
    options: [
      'Define internal audit\'s purpose',
      'Establish internal audit\'s authority',
      'Describe specific audit procedures',
      'Establish internal audit\'s responsibility'
    ],
    correctAnswer: 2,
    explanation: 'The internal audit charter defines purpose, authority, and responsibility but does not describe specific audit procedures. Procedures are addressed in audit methodology and engagement work programs.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Internal Audit Charter'
  },
  {
    id: 'CIA1-067',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'An internal auditor transferred from operations three months ago. The auditor is now assigned to audit the operations department. This would:',
    options: [
      'Be acceptable if the auditor has no current interest in the department',
      'Be an impairment to objectivity under the one-year rule',
      'Be acceptable with enhanced supervision',
      'Require Board approval'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1130.A1 states that auditors should not audit operations for which they were previously responsible within the past year. Three months is within the one-year period, so this creates an impairment.',
    topic: 'Independence and Objectivity',
    subtopic: 'Impairments to Objectivity'
  },
  {
    id: 'CIA1-068',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which statement about inherent limitations of internal control is TRUE?',
    options: [
      'Controls can eliminate all risks',
      'Controls can be circumvented by collusion',
      'Perfect controls exist for every risk',
      'Cost of controls is not relevant'
    ],
    correctAnswer: 1,
    explanation: 'Inherent limitations include: management override, collusion, human judgment and error, and cost-benefit considerations. No control system can eliminate all risks, and collusion can defeat segregation of duties.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Control Limitations'
  },
  {
    id: 'CIA1-069',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'The IIA Standards are organized into:',
    options: [
      'Attribute Standards and Performance Standards',
      'General Standards and Fieldwork Standards',
      'Audit Standards and Reporting Standards',
      'Ethics Standards and Technical Standards'
    ],
    correctAnswer: 0,
    explanation: 'The IIA Standards are organized into Attribute Standards (address organizational and individual characteristics) and Performance Standards (describe the nature of internal auditing activities).',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'IIA Standards'
  },
  {
    id: 'CIA1-070',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'When evaluating governance, internal auditors should assess whether:',
    options: [
      'The organization is profitable',
      'Decisions are made transparently and accountability is clear',
      'Competitors are effectively managed',
      'All employees are properly compensated'
    ],
    correctAnswer: 1,
    explanation: 'Governance assessment includes evaluating whether decisions are transparent, accountability is clear, and effective oversight exists. It focuses on structures and processes, not profitability or compensation.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Corporate Governance'
  },
];
