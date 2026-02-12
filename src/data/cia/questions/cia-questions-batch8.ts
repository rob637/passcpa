/**
 * CIA Part 1-3: Additional MCQ Batch 8
 * 100 questions across all three parts
 * Certified Internal Auditor exam preparation
 */

import { Question } from '../../../types';

export const CIA_QUESTIONS_BATCH8: Question[] = [
  // ===========================================================================
  // CIA PART 1: ESSENTIALS OF INTERNAL AUDITING
  // ===========================================================================
  
  {
    id: 'cia1-b8-001',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The IIA Standards are categorized into which two main types?',
    options: [
      'Technical and behavioral',
      'Attribute Standards and Performance Standards',
      'Mandatory and voluntary',
      'General and specific'
    ],
    correctAnswer: 1,
    explanation: 'The IIA Standards are divided into Attribute Standards (address characteristics of organizations and individuals) and Performance Standards (describe the nature of internal auditing and quality criteria).',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Standards Structure',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-002',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Implementation Standards apply to:',
    options: [
      'All engagements equally',
      'Specific engagement types (assurance or consulting)',
      'Only external assessments',
      'Quality assurance activities only'
    ],
    correctAnswer: 1,
    explanation: 'Implementation Standards expand upon the Attribute and Performance Standards by providing requirements applicable to specific types of engagements (assurance vs. consulting).',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Standards Structure',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-003',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'What is the primary benefit of the internal audit function reporting administratively to the CEO?',
    options: [
      'Increased budget allocation',
      'Direct access to senior management for resources and administrative matters',
      'Complete independence from all management',
      'Authority to implement recommendations'
    ],
    correctAnswer: 1,
    explanation: 'Administrative reporting to the CEO provides the internal audit function with stature and access to senior management for day-to-day administrative matters while maintaining functional reporting to the board.',
    topic: 'Independence and Objectivity',
    subtopic: 'Reporting Relationships',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-004',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An auditor discovers that their spouse has been awarded a contract in the area under audit. What should the auditor do?',
    options: [
      'Continue the audit but document the relationship',
      'Disclose the conflict and recuse from the engagement',
      'Ask the spouse to cancel the contract',
      'Complete the audit and disclose in the final report'
    ],
    correctAnswer: 1,
    explanation: 'Personal relationships that could impair objectivity must be disclosed, and the auditor should be removed from the engagement to maintain objectivity.',
    topic: 'Independence and Objectivity',
    subtopic: 'Impairments',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-005',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following best describes "assurance services"?',
    options: [
      'Advisory services at management\'s request',
      'Objective examination of evidence to provide independent assessment',
      'Services only for external stakeholders',
      'Compliance testing only'
    ],
    correctAnswer: 1,
    explanation: 'Assurance services involve objective examination of evidence for the purpose of providing an independent assessment on governance, risk management, and control processes.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Service Types',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-006',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Consulting services differ from assurance services primarily because:',
    options: [
      'They require less expertise',
      'The nature and scope are agreed with the engagement client',
      'They do not require independence',
      'They are always informal'
    ],
    correctAnswer: 1,
    explanation: 'Consulting services are advisory in nature, and their nature and scope are agreed upon with the engagement client, rather than determined by the auditor or standards.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Service Types',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-007',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The audit committee should meet privately with the CAE:',
    options: [
      'Never, to maintain confidentiality',
      'At least annually without management present',
      'Only when fraud is suspected',
      'Only during external quality assessments'
    ],
    correctAnswer: 1,
    explanation: 'To enhance independence and allow free discussion, the audit committee should meet privately with the CAE without management present at least annually.',
    topic: 'Independence and Objectivity',
    subtopic: 'Board Relationship',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-008',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Inherent risk is:',
    options: [
      'Risk after controls are applied',
      'The susceptibility of an area to material error absent any controls',
      'Risk of audit failure',
      'Eliminated risk'
    ],
    correctAnswer: 1,
    explanation: 'Inherent risk is the susceptibility of a process or area to significant risk or error in the absence of any controls. Residual risk is what remains after controls.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Risk Concepts',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-009',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Risk response strategies include all of the following EXCEPT:',
    options: [
      'Accept',
      'Avoid',
      'Eliminate completely',
      'Mitigate'
    ],
    correctAnswer: 2,
    explanation: 'Risk response strategies are: Accept (retain), Avoid (withdraw), Transfer (share), and Mitigate (reduce). Complete elimination is generally not possible.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Risk Response',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-010',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Detective controls are designed to:',
    options: [
      'Prevent unwanted events from occurring',
      'Identify and discover unwanted events after they have occurred',
      'Redirect behavior before events occur',
      'Compensate for other control weaknesses'
    ],
    correctAnswer: 1,
    explanation: 'Detective controls identify and discover unwanted events after they occur. Preventive controls stop events from happening; corrective controls fix identified issues.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Control Types',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-011',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The CAE should report periodically to senior management and the board on:',
    options: [
      'Only completed audit reports',
      'Purpose, authority, responsibility, and performance relative to plan',
      'Only budget variances',
      'Staff productivity metrics only'
    ],
    correctAnswer: 1,
    explanation: 'The CAE must report periodically on the internal audit activity\'s purpose, authority, responsibility, and performance relative to its plan, including significant risk and control issues.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Reporting',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-012',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Internal audit should assess whether IT governance:',
    options: [
      'Maximizes technology spending',
      'Supports the organization\'s strategies and objectives',
      'Uses only the latest technology',
      'Focuses only on security'
    ],
    correctAnswer: 1,
    explanation: 'Internal audit should assess whether IT governance sustains and supports the organization\'s strategies and objectives, not just technology aspects.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'IT Governance',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-013',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The integrity principle of the Code of Ethics requires internal auditors to:',
    options: [
      'Only report favorable findings',
      'Establish and exhibit honesty and trustworthiness',
      'Maximize organizational profits',
      'Follow management directives without question'
    ],
    correctAnswer: 1,
    explanation: 'The integrity principle requires internal auditors to perform their work with honesty, diligence, and responsibility, and not engage in activities that would discredit the profession.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-014',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Internal auditors must maintain confidentiality of information obtained during engagements EXCEPT when:',
    options: [
      'Management requests disclosure',
      'Disclosure is required by law, profession, or organization',
      'The information is publicly available',
      'External auditors request the information'
    ],
    correctAnswer: 1,
    explanation: 'Internal auditors must respect and protect information except when disclosure is required by legal, professional, or organizational requirements.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-015',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The competency principle of the Code of Ethics requires internal auditors to:',
    options: [
      'Accept any engagement assigned',
      'Apply knowledge, skills, and experience needed for their services',
      'Defer all technical matters to specialists',
      'Only work in their area of certification'
    ],
    correctAnswer: 1,
    explanation: 'The competency principle requires internal auditors to apply the knowledge, skills, and experience needed in the performance of internal audit services.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-016',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Quality assurance and improvement programs should include:',
    options: [
      'Only external assessments',
      'Both internal and external assessments',
      'Self-assessments only',
      'Assessments only when problems are identified'
    ],
    correctAnswer: 1,
    explanation: 'The QAIP must include both internal assessments (ongoing monitoring and periodic reviews) and external assessments (at least every five years).',
    topic: 'Quality Assurance',
    subtopic: 'QAIP Components',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-017',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Ongoing monitoring of internal audit performance typically includes:',
    options: [
      'Annual surveys only',
      'Day-to-day supervision, review policies, and feedback from clients',
      'External reviews only',
      'Budget comparisons only'
    ],
    correctAnswer: 1,
    explanation: 'Ongoing monitoring is built into routine policies and practices and includes supervision, work paper review, engagement closure, and client feedback.',
    topic: 'Quality Assurance',
    subtopic: 'Internal Assessments',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-018',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which element is NOT typically part of governance?',
    options: [
      'Accountability',
      'Transparency',
      'Market dominance',
      'Stakeholder relationships'
    ],
    correctAnswer: 2,
    explanation: 'Governance involves structures and processes for accountability, transparency, direction, and stakeholder relationships. Market dominance is a competitive strategy, not governance.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Governance Elements',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-019',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Enterprise risk management (ERM) integrates:',
    options: [
      'Only financial risks',
      'Risk management across the entire organization aligned with strategy',
      'Only operational risks',
      'Risk avoidance only'
    ],
    correctAnswer: 1,
    explanation: 'ERM is a holistic approach that integrates risk management across the entire organization, aligning risk management with strategy and performance.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'ERM',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-020',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The internal audit activity must evaluate the potential for fraud:',
    options: [
      'Only when specifically requested',
      'In every assurance engagement',
      'Only in financial audits',
      'Only after fraud is detected'
    ],
    correctAnswer: 1,
    explanation: 'Internal auditors must consider the probability of significant errors, fraud, or noncompliance when developing engagement objectives and throughout the engagement.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Fraud Considerations',
  reference: 'IIA Standards'
  },

  // ===========================================================================
  // CIA PART 2: PRACTICE OF INTERNAL AUDITING
  // ===========================================================================

  {
    id: 'cia2-b8-021',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The internal audit plan should be based primarily on:',
    options: [
      'Management requests',
      'Risk assessment',
      'Prior year\'s plan',
      'Available resources only'
    ],
    correctAnswer: 1,
    explanation: 'The internal audit plan must be based on a documented risk assessment that considers internal and external factors and stakeholder input.',
    topic: 'Managing Internal Audit',
    subtopic: 'Risk-Based Planning',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-022',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When the audit plan requires expertise not available internally, the CAE should:',
    options: [
      'Remove those areas from the plan',
      'Obtain competent advice and assistance from external sources',
      'Train existing staff quickly',
      'Delay the audit indefinitely'
    ],
    correctAnswer: 1,
    explanation: 'When internal expertise is lacking, the CAE must obtain competent external advice and assistance to ensure audit quality.',
    topic: 'Managing Internal Audit',
    subtopic: 'Resource Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-023',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Internal audit metrics used to measure performance should include:',
    options: [
      'Only time budgets',
      'Quantitative and qualitative measures aligned with audit objectives',
      'Number of findings only',
      'Staff headcount only'
    ],
    correctAnswer: 1,
    explanation: 'Performance metrics should include both quantitative (timeliness, coverage) and qualitative (impact, client satisfaction) measures aligned with audit objectives.',
    topic: 'Managing Internal Audit',
    subtopic: 'Performance Measurement',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-024',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Knowledge management within internal audit helps to:',
    options: [
      'Reduce documentation requirements',
      'Capture and share institutional knowledge and best practices',
      'Eliminate the need for training',
      'Reduce staff requirements'
    ],
    correctAnswer: 1,
    explanation: 'Knowledge management captures, organizes, and shares institutional knowledge, lessons learned, and best practices to improve efficiency and effectiveness.',
    topic: 'Managing Internal Audit',
    subtopic: 'Knowledge Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-025',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An effective preliminary survey should identify:',
    options: [
      'Final audit conclusions',
      'Key risks, controls, and areas of concern for focus',
      'Specific findings to report',
      'Staff disciplinary matters'
    ],
    correctAnswer: 1,
    explanation: 'The preliminary survey identifies key processes, risks, controls, and potential areas of concern that will guide detailed planning and work program development.',
    topic: 'Planning the Engagement',
    subtopic: 'Preliminary Survey',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-026',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Risk assessment at the engagement level should consider:',
    options: [
      'Only risks identified in the annual plan',
      'Current and emerging risks specific to the engagement area',
      'Only historical risks',
      'Risks identified by external auditors only'
    ],
    correctAnswer: 1,
    explanation: 'Engagement-level risk assessment should consider current conditions, emerging risks, and changes since the annual planning risk assessment.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Risk Assessment',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-027',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The work program should be:',
    options: [
      'Identical for all similar engagements',
      'Tailored to achieve the specific engagement objectives',
      'Developed after fieldwork is complete',
      'Optional for experienced auditors'
    ],
    correctAnswer: 1,
    explanation: 'Work programs should be customized to achieve specific engagement objectives, considering the particular risks and controls of the area under review.',
    topic: 'Planning the Engagement',
    subtopic: 'Work Program',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-028',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When determining sample size, auditors should consider:',
    options: [
      'Only time constraints',
      'Population characteristics, acceptable error rate, and confidence level',
      'Management preferences',
      'Prior year sample size only'
    ],
    correctAnswer: 1,
    explanation: 'Sample size determination considers population size and characteristics, expected error rate, tolerable error rate, and desired confidence level.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-029',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Stratified sampling divides the population into:',
    options: [
      'Random groups',
      'Subgroups with similar characteristics for more efficient testing',
      'Time periods',
      'Geographic regions only'
    ],
    correctAnswer: 1,
    explanation: 'Stratified sampling divides the population into homogeneous subgroups (strata) based on similar characteristics, allowing more efficient and representative sampling.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-030',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Computer-assisted audit techniques (CAATs) can be used to:',
    options: [
      'Replace all manual testing',
      'Analyze large volumes of data and identify anomalies efficiently',
      'Eliminate the need for sampling',
      'Guarantee error-free analysis'
    ],
    correctAnswer: 1,
    explanation: 'CAATs enable auditors to analyze entire populations, identify patterns and anomalies, and perform tests more efficiently than manual methods.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Technology',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-031',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Generalized audit software can perform all of the following EXCEPT:',
    options: [
      'Data extraction and manipulation',
      'Statistical sampling',
      'Making management decisions',
      'Exception testing'
    ],
    correctAnswer: 2,
    explanation: 'Audit software can extract, manipulate, analyze data, and perform statistical sampling. Making management decisions is a management function, not an audit software function.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Technology',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-032',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Working paper documentation should:',
    options: [
      'Include only final conclusions',
      'Support findings with sufficient, reliable, relevant, and useful information',
      'Be limited to electronic formats',
      'Exclude management responses'
    ],
    correctAnswer: 1,
    explanation: 'Working papers must document information that is sufficient, reliable, relevant, and useful to support engagement conclusions and recommendations.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-033',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Working paper retention requirements are typically based on:',
    options: [
      'Available storage space',
      'Organizational policies, legal requirements, and professional standards',
      'Auditor preference',
      'Management convenience'
    ],
    correctAnswer: 1,
    explanation: 'Retention policies consider organizational needs, legal and regulatory requirements, contractual obligations, and professional standards.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-034',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit evidence is reliable when it is:',
    options: [
      'Provided by management only',
      'Consistent, credible, and verifiable',
      'Available in large quantities',
      'Easy to obtain'
    ],
    correctAnswer: 1,
    explanation: 'Reliable evidence is consistent with other evidence, comes from credible sources, and can be verified or corroborated through independent means.',
    topic: 'Performing the Engagement',
    subtopic: 'Evidence Quality',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-035',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When audit evidence conflicts, the auditor should:',
    options: [
      'Use the most favorable evidence',
      'Perform additional procedures to resolve the discrepancy',
      'Ignore the conflicting evidence',
      'Report both as equally valid'
    ],
    correctAnswer: 1,
    explanation: 'Conflicting evidence requires additional procedures to understand the discrepancy and determine which evidence is accurate and reliable.',
    topic: 'Performing the Engagement',
    subtopic: 'Evidence Evaluation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-036',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Criteria for a well-developed finding include:',
    options: [
      'Condition only',
      'Condition, criteria, cause, and effect',
      'Recommendation only',
      'Opinion only'
    ],
    correctAnswer: 1,
    explanation: 'Complete findings include: Condition (what exists), Criteria (what should be), Cause (why the gap exists), and Effect (impact/risk).',
    topic: 'Communicating Results',
    subtopic: 'Developing Findings',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-037',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When communicating engagement results, "significance" refers to:',
    options: [
      'Only monetary amounts',
      'Relative importance based on impact to the organization and stakeholders',
      'Number of exceptions found',
      'Audit hours expended'
    ],
    correctAnswer: 1,
    explanation: 'Significance considers the relative importance of matters in context, including impact on organizational objectives, stakeholders, and risk exposure.',
    topic: 'Communicating Results',
    subtopic: 'Communication Content',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-038',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit reports should be issued:',
    options: [
      'Only at year-end',
      'In a timely manner that allows management to take appropriate action',
      'Only after all open items are resolved',
      'When convenient for the audit team'
    ],
    correctAnswer: 1,
    explanation: 'Timely communication is essential to allow management to take appropriate corrective action. Delays reduce the value of audit findings.',
    topic: 'Communicating Results',
    subtopic: 'Report Timeliness',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-039',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'If the CAE believes management has accepted a level of risk that may be unacceptable to the organization:',
    options: [
      'Accept management\'s decision without question',
      'Discuss the matter with senior management and possibly the board',
      'Include in the report and move on',
      'Refuse to issue the report'
    ],
    correctAnswer: 1,
    explanation: 'If the CAE concludes management has accepted unacceptable risk, the matter must be discussed with senior management. If not resolved, it should be escalated to the board.',
    topic: 'Communicating Results',
    subtopic: 'Risk Matters',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-040',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Follow-up procedures should verify that:',
    options: [
      'Management liked the recommendations',
      'Corrective actions have been effectively implemented',
      'No new issues have emerged',
      'The auditor\'s opinion was correct'
    ],
    correctAnswer: 1,
    explanation: 'Follow-up ensures management has taken effective action to address reported findings, or that senior management has accepted the risk of not taking action.',
    topic: 'Managing Internal Audit',
    subtopic: 'Follow-Up',
  reference: 'IIA Standards'
  },

  // ===========================================================================
  // CIA PART 3: BUSINESS KNOWLEDGE FOR INTERNAL AUDITING
  // ===========================================================================

  {
    id: 'cia3-b8-041',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The DuPont analysis breaks down Return on Equity (ROE) into:',
    options: [
      'Two components only',
      'Profit margin, asset turnover, and financial leverage',
      'Revenue and expenses',
      'Current and non-current ratios'
    ],
    correctAnswer: 1,
    explanation: 'DuPont analysis decomposes ROE into: Profit Margin (Net Income/Sales) × Asset Turnover (Sales/Assets) × Financial Leverage (Assets/Equity).',
    topic: 'Business Acumen',
    subtopic: 'Financial Analysis',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-042',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Free cash flow is calculated as:',
    options: [
      'Total revenue minus total expenses',
      'Operating cash flow minus capital expenditures',
      'Net income plus interest expense',
      'Cash plus marketable securities'
    ],
    correctAnswer: 1,
    explanation: 'Free cash flow equals operating cash flow minus capital expenditures (and sometimes changes in working capital). It represents cash available for distribution.',
    topic: 'Business Acumen',
    subtopic: 'Cash Flow Analysis',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-043',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The payback period measures:',
    options: [
      'Total return on investment',
      'Time required to recover the initial investment from cash flows',
      'Net present value',
      'Internal rate of return'
    ],
    correctAnswer: 1,
    explanation: 'Payback period calculates the time required to recover the initial investment from project cash flows. It is simple but ignores time value of money.',
    topic: 'Business Acumen',
    subtopic: 'Capital Budgeting',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-044',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Sensitivity analysis in financial planning is used to:',
    options: [
      'Ensure all stakeholders are satisfied',
      'Assess how changes in assumptions affect outcomes',
      'Guarantee accurate forecasts',
      'Eliminate all risks'
    ],
    correctAnswer: 1,
    explanation: 'Sensitivity analysis examines how changes in key assumptions (sales volume, costs, interest rates) affect projected outcomes, helping identify critical variables.',
    topic: 'Business Acumen',
    subtopic: 'Financial Planning',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-045',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Process mapping helps auditors to:',
    options: [
      'Skip detailed testing',
      'Understand workflows, identify controls, and locate inefficiencies',
      'Avoid interviews',
      'Complete audits faster regardless of quality'
    ],
    correctAnswer: 1,
    explanation: 'Process mapping visually documents workflows, helping auditors understand processes, identify control points, and locate potential inefficiencies or risks.',
    topic: 'Business Acumen',
    subtopic: 'Process Analysis',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-046',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Benchmarking involves:',
    options: [
      'Only internal comparisons',
      'Comparing processes and performance to best practices or peer organizations',
      'Setting arbitrary targets',
      'Ignoring industry standards'
    ],
    correctAnswer: 1,
    explanation: 'Benchmarking compares organizational processes, practices, and performance metrics against industry best practices or peer organizations to identify improvement opportunities.',
    topic: 'Business Acumen',
    subtopic: 'Performance Improvement',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-047',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Lean management principles focus on:',
    options: [
      'Maximizing inventory',
      'Eliminating waste while delivering value to customers',
      'Increasing complexity',
      'Reducing employee involvement'
    ],
    correctAnswer: 1,
    explanation: 'Lean principles focus on eliminating waste (non-value-added activities), continuous improvement, and maximizing value delivered to customers.',
    topic: 'Business Acumen',
    subtopic: 'Operations Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-048',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The primary purpose of treasury management is to:',
    options: [
      'Maximize short-term profits',
      'Manage liquidity, optimize cash, and manage financial risk',
      'Conduct internal audits',
      'Handle only accounts receivable'
    ],
    correctAnswer: 1,
    explanation: 'Treasury management handles liquidity management, cash optimization, investment of excess funds, debt management, and financial risk management.',
    topic: 'Business Acumen',
    subtopic: 'Financial Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-049',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A letter of credit is primarily used in:',
    options: [
      'Employee payroll',
      'International trade to guarantee payment',
      'Internal expense reporting',
      'Inventory counting'
    ],
    correctAnswer: 1,
    explanation: 'Letters of credit are bank guarantees used in international trade, ensuring sellers receive payment when specified conditions are met.',
    topic: 'Business Acumen',
    subtopic: 'International Business',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-050',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Asset management involves:',
    options: [
      'Only acquiring new assets',
      'The systematic approach to governance, development, maintenance, and disposal of assets',
      'Ignoring depreciation',
      'Only IT assets'
    ],
    correctAnswer: 1,
    explanation: 'Asset management is a systematic approach to acquiring, developing, operating, maintaining, upgrading, and disposing of assets cost-effectively.',
    topic: 'Business Acumen',
    subtopic: 'Asset Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-051',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Symmetric encryption uses:',
    options: [
      'Different keys for encryption and decryption',
      'The same key for encryption and decryption',
      'No keys',
      'Only public keys'
    ],
    correctAnswer: 1,
    explanation: 'Symmetric encryption uses the same key for both encryption and decryption. It is faster but requires secure key exchange. Asymmetric uses different keys.',
    topic: 'Information Security',
    subtopic: 'Cryptography',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-052',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Public Key Infrastructure (PKI) provides:',
    options: [
      'Only encryption services',
      'Digital certificates, authentication, and secure key management',
      'Physical access control',
      'Backup and recovery only'
    ],
    correctAnswer: 1,
    explanation: 'PKI provides digital certificates, authentication, encryption, and secure management of public/private key pairs, enabling secure electronic communications.',
    topic: 'Information Security',
    subtopic: 'Cryptography',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-053',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A Security Information and Event Management (SIEM) system:',
    options: [
      'Prevents all security breaches',
      'Aggregates and analyzes security log data to detect threats',
      'Replaces firewalls',
      'Eliminates the need for security policies'
    ],
    correctAnswer: 1,
    explanation: 'SIEM systems collect and analyze security log data from multiple sources in real-time, correlating events to detect threats and support incident response.',
    topic: 'Information Security',
    subtopic: 'Security Monitoring',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-054',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The NIST Cybersecurity Framework organizes activities into:',
    options: [
      'Three phases',
      'Five core functions: Identify, Protect, Detect, Respond, Recover',
      'Seven layers',
      'Two components'
    ],
    correctAnswer: 1,
    explanation: 'The NIST Cybersecurity Framework has five core functions: Identify, Protect, Detect, Respond, and Recover, providing a comprehensive approach to cybersecurity.',
    topic: 'Information Security',
    subtopic: 'Security Frameworks',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-055',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Defense in depth strategy means:',
    options: [
      'Relying on one strong control',
      'Implementing multiple layers of security controls',
      'Physical security only',
      'Perimeter security only'
    ],
    correctAnswer: 1,
    explanation: 'Defense in depth uses multiple, overlapping layers of security controls so that if one layer fails, others provide continued protection.',
    topic: 'Information Security',
    subtopic: 'Security Architecture',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-056',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Patch management is important because it:',
    options: [
      'Increases system complexity',
      'Addresses known vulnerabilities in software',
      'Slows system performance',
      'Only applies to operating systems'
    ],
    correctAnswer: 1,
    explanation: 'Patch management ensures that known vulnerabilities are addressed through timely updates to software, firmware, and operating systems.',
    topic: 'Information Security',
    subtopic: 'Vulnerability Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-057',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Identity and Access Management (IAM) encompasses:',
    options: [
      'Only password management',
      'User provisioning, authentication, authorization, and access governance',
      'Physical security only',
      'Network monitoring only'
    ],
    correctAnswer: 1,
    explanation: 'IAM manages the complete lifecycle of user identities: creation, authentication, authorization, access governance, and de-provisioning.',
    topic: 'Information Security',
    subtopic: 'Access Control',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-058',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A Business Impact Analysis (BIA) determines:',
    options: [
      'IT budget requirements',
      'The impact of disruptions on business functions to prioritize recovery',
      'Marketing effectiveness',
      'Employee satisfaction'
    ],
    correctAnswer: 1,
    explanation: 'A BIA identifies critical business functions, the impact of their disruption over time, and recovery priorities to inform continuity planning.',
    topic: 'Information Security',
    subtopic: 'Business Continuity',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-059',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The Recovery Point Objective (RPO) determines:',
    options: [
      'How quickly systems must be restored',
      'The maximum acceptable amount of data loss measured in time',
      'The cost of recovery',
      'The number of recovery sites needed'
    ],
    correctAnswer: 1,
    explanation: 'RPO defines the maximum tolerable period of data loss (e.g., 4 hours of data). It drives backup frequency and data replication strategies.',
    topic: 'Information Security',
    subtopic: 'Business Continuity',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-060',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Social media security risks include:',
    options: [
      'No risks if accounts are private',
      'Information disclosure, reputation damage, and phishing vectors',
      'Only spam messages',
      'Improved customer relations'
    ],
    correctAnswer: 1,
    explanation: 'Social media risks include inadvertent disclosure of sensitive information, reputation damage, social engineering attacks, and regulatory compliance issues.',
    topic: 'Information Security',
    subtopic: 'Emerging Risks',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-061',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Containerization in IT refers to:',
    options: [
      'Physical storage containers',
      'Packaging applications with their dependencies for consistent deployment',
      'Network segmentation',
      'Data archival'
    ],
    correctAnswer: 1,
    explanation: 'Containerization packages applications with their dependencies into containers, ensuring consistent behavior across different computing environments.',
    topic: 'Information Technology',
    subtopic: 'Infrastructure',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-062',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Microservices architecture differs from monolithic architecture because:',
    options: [
      'It uses smaller servers',
      'Applications are built as independently deployable services',
      'It reduces the need for testing',
      'It eliminates all dependencies'
    ],
    correctAnswer: 1,
    explanation: 'Microservices breaks applications into small, independently deployable services that communicate via APIs, offering flexibility and scalability.',
    topic: 'Information Technology',
    subtopic: 'System Architecture',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-063',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Data governance ensures:',
    options: [
      'Only data security',
      'Data quality, availability, integrity, and security through defined policies',
      'Data is deleted regularly',
      'Only IT manages data'
    ],
    correctAnswer: 1,
    explanation: 'Data governance establishes policies and processes to ensure data quality, availability, usability, integrity, and security across the organization.',
    topic: 'Information Technology',
    subtopic: 'Data Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-064',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Artificial Intelligence (AI) in auditing can be used for:',
    options: [
      'Replacing all human auditors',
      'Pattern recognition, anomaly detection, and natural language processing of documents',
      'Only financial calculations',
      'Eliminating the need for documentation'
    ],
    correctAnswer: 1,
    explanation: 'AI applications in auditing include analyzing large datasets for patterns, detecting anomalies, processing documents, and identifying risks.',
    topic: 'Information Technology',
    subtopic: 'Emerging Technology',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-065',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Service Level Agreements (SLAs) typically specify:',
    options: [
      'Only pricing',
      'Performance standards, availability, response times, and remedies for non-compliance',
      'Employee responsibilities',
      'Marketing requirements'
    ],
    correctAnswer: 1,
    explanation: 'SLAs define expected service levels including availability, performance, response times, responsibilities, and remedies or penalties for non-compliance.',
    topic: 'Information Technology',
    subtopic: 'Vendor Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-066',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'IT General Controls (ITGCs) include:',
    options: [
      'Only application-specific controls',
      'Access controls, change management, operations, and program development',
      'Only physical security',
      'Only disaster recovery'
    ],
    correctAnswer: 1,
    explanation: 'ITGCs apply to IT infrastructure broadly and include access security, change management, computer operations, program development, and backup/recovery.',
    topic: 'Information Technology',
    subtopic: 'IT Controls',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-067',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When evaluating vendor security, auditors should assess:',
    options: [
      'Only contract pricing',
      'Security controls, certifications (SOC reports), and contractual security requirements',
      'Only the vendor\'s financial stability',
      'Only physical location'
    ],
    correctAnswer: 1,
    explanation: 'Vendor security evaluation includes reviewing SOC reports, security certifications, contractual requirements, data protection practices, and incident response capabilities.',
    topic: 'Information Technology',
    subtopic: 'Vendor Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-068',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A Service Organization Control (SOC) 2 report addresses:',
    options: [
      'Financial statement controls only',
      'Security, availability, processing integrity, confidentiality, and privacy',
      'Only compliance requirements',
      'Only management practices'
    ],
    correctAnswer: 1,
    explanation: 'SOC 2 reports address the Trust Services Criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy of a service organization.',
    topic: 'Information Technology',
    subtopic: 'Third-Party Assurance',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-069',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The Internet of Things (IoT) creates security challenges because:',
    options: [
      'Devices are always secure by design',
      'Many devices have limited security capabilities and expand the attack surface',
      'IoT reduces network complexity',
      'All IoT standards are uniform'
    ],
    correctAnswer: 1,
    explanation: 'IoT devices often have limited processing power for security controls, use default credentials, and greatly expand the attack surface of networks.',
    topic: 'Information Technology',
    subtopic: 'Emerging Technology',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-070',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Shadow IT refers to:',
    options: [
      'IT departments working night shifts',
      'Technology used without formal IT department approval or oversight',
      'Backup IT systems',
      'Cloud computing'
    ],
    correctAnswer: 1,
    explanation: 'Shadow IT is technology (software, services, devices) used by employees without IT department approval, potentially creating security and compliance risks.',
    topic: 'Information Technology',
    subtopic: 'IT Risk',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-071',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Check tampering fraud involves:',
    options: [
      'Stealing cash from registers',
      'Altering or forging checks to misappropriate funds',
      'Creating fictitious customers',
      'Manipulating inventory records'
    ],
    correctAnswer: 1,
    explanation: 'Check tampering involves fraudulently altering payee names, amounts, or forging signatures on checks to divert funds.',
    topic: 'Fraud',
    subtopic: 'Asset Misappropriation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-072',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Channel stuffing is a type of fraud that involves:',
    options: [
      'Proper revenue recognition',
      'Inducing customers to buy excess inventory to inflate current period sales',
      'Conservative sales practices',
      'Inventory theft'
    ],
    correctAnswer: 1,
    explanation: 'Channel stuffing pressures or incentivizes distributors to accept more inventory than they can sell, artificially inflating current period revenue.',
    topic: 'Fraud',
    subtopic: 'Financial Statement Fraud',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-073',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Round-tripping in fraud involves:',
    options: [
      'Normal vendor payments',
      'Circular transactions where money flows out and returns as revenue',
      'Employee travel reimbursement',
      'Inventory cycle counting'
    ],
    correctAnswer: 1,
    explanation: 'Round-tripping creates fictitious revenue through circular transactions where funds paid out return disguised as revenue from different sources.',
    topic: 'Fraud',
    subtopic: 'Financial Statement Fraud',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-074',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When investigating suspected fraud, the chain of custody for evidence means:',
    options: [
      'Evidence can be handled by anyone',
      'Documenting who had control of evidence and when to ensure admissibility',
      'Evidence should be shared widely',
      'Only original documents matter'
    ],
    correctAnswer: 1,
    explanation: 'Chain of custody documents every person who handles evidence and when, ensuring integrity and potential admissibility if legal proceedings occur.',
    topic: 'Fraud',
    subtopic: 'Fraud Investigation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-075',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Conflicts of interest can lead to fraud when:',
    options: [
      'Employees have no personal interests',
      'Personal interests improperly influence business decisions',
      'All relationships are disclosed',
      'Policies are strictly followed'
    ],
    correctAnswer: 1,
    explanation: 'Conflicts of interest create fraud risk when personal interests (financial, relationship) improperly influence business decisions to personal benefit.',
    topic: 'Fraud',
    subtopic: 'Corruption',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-076',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Forensic data analysis in fraud investigations includes:',
    options: [
      'Only reviewing printed documents',
      'Recovering deleted data, analyzing metadata, and examining electronic evidence',
      'Only interviewing suspects',
      'Ignoring digital evidence'
    ],
    correctAnswer: 1,
    explanation: 'Forensic data analysis includes recovering deleted files, examining metadata, analyzing email, tracking electronic transactions, and preserving digital evidence.',
    topic: 'Fraud',
    subtopic: 'Fraud Investigation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-077',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Expense reimbursement fraud includes all of the following EXCEPT:',
    options: [
      'Submitting personal expenses as business',
      'Overstating expense amounts',
      'Submitting legitimate business receipts',
      'Creating fictitious expenses'
    ],
    correctAnswer: 2,
    explanation: 'Expense fraud includes fictitious expenses, overstated amounts, mischaracterized personal expenses, and duplicate submissions. Legitimate receipts are not fraud.',
    topic: 'Fraud',
    subtopic: 'Asset Misappropriation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-078',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Horizontal analysis for fraud detection compares:',
    options: [
      'Different companies',
      'Financial data across time periods to identify unusual trends',
      'Budget to actual only',
      'Different cost centers'
    ],
    correctAnswer: 1,
    explanation: 'Horizontal analysis examines changes in financial statement items over time, helping identify unusual trends or fluctuations that may indicate fraud.',
    topic: 'Fraud',
    subtopic: 'Data Analysis',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-079',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An anti-fraud program should include:',
    options: [
      'Only detection mechanisms',
      'Prevention, detection, and response components',
      'Only investigation procedures',
      'Only training programs'
    ],
    correctAnswer: 1,
    explanation: 'Comprehensive anti-fraud programs include prevention (culture, controls), detection (monitoring, reporting), and response (investigation, remediation) elements.',
    topic: 'Fraud',
    subtopic: 'Fraud Prevention',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-080',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'In conducting a fraud investigation interview, an auditor should:',
    options: [
      'Start with accusatory questions',
      'Prepare questions in advance, maintain a non-accusatory tone, and document responses',
      'Record without consent',
      'Interview in groups'
    ],
    correctAnswer: 1,
    explanation: 'Effective fraud interviews require preparation, professional demeanor, appropriate questioning techniques, proper documentation, and compliance with legal requirements.',
    topic: 'Fraud',
    subtopic: 'Fraud Investigation',
  reference: 'IIA Standards'
  },

  // Remaining questions
  {
    id: 'cia1-b8-081',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Soft controls include:',
    options: [
      'Only written policies',
      'Organizational culture, values, and ethical climate',
      'Access controls only',
      'Physical barriers'
    ],
    correctAnswer: 1,
    explanation: 'Soft controls are intangible controls including organizational culture, values, ethics, management style, and employee commitment that influence behavior.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Control Types',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-082',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Engagement risk includes:',
    options: [
      'Only detection risk',
      'Inherent risk, control risk, and detection risk',
      'Only inherent risk',
      'Only control risk'
    ],
    correctAnswer: 1,
    explanation: 'Engagement risk has three components: Inherent risk (susceptibility to error), Control risk (controls fail to prevent/detect), and Detection risk (auditor fails to detect).',
    topic: 'Planning the Engagement',
    subtopic: 'Risk Assessment',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-083',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Contract risk management includes evaluating:',
    options: [
      'Only pricing terms',
      'Terms and conditions, obligations, rights, and potential liabilities',
      'Only delivery schedules',
      'Only payment terms'
    ],
    correctAnswer: 1,
    explanation: 'Contract risk management evaluates all terms including performance obligations, rights, liabilities, termination clauses, and dispute resolution mechanisms.',
    topic: 'Business Acumen',
    subtopic: 'Contract Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-084',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The CAE should inform the board if there is an impairment to:',
    options: [
      'Budget only',
      'Independence or objectivity',
      'Staffing levels only',
      'Technology resources'
    ],
    correctAnswer: 1,
    explanation: 'Impairments to independence or objectivity must be disclosed to the board. The nature of the disclosure depends on the nature of the impairment.',
    topic: 'Independence and Objectivity',
    subtopic: 'Disclosure Requirements',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-085',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When audit scope is restricted after an engagement has begun, the auditor should:',
    options: [
      'Accept the restriction silently',
      'Communicate with the CAE and determine if the engagement can still meet its objectives',
      'Immediately cancel the engagement',
      'Ignore the restriction'
    ],
    correctAnswer: 1,
    explanation: 'Scope restrictions should be communicated, evaluated for impact on objectives, and potentially escalated to the CAE or board if they prevent achieving engagement objectives.',
    topic: 'Performing the Engagement',
    subtopic: 'Scope Changes',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-086',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Inventory valuation methods affect:',
    options: [
      'Only inventory counts',
      'Reported cost of goods sold and ending inventory values',
      'Only purchasing decisions',
      'Only warehouse layout'
    ],
    correctAnswer: 1,
    explanation: 'Inventory valuation methods (FIFO, LIFO, weighted average) affect cost of goods sold, gross profit, taxes, and balance sheet inventory values.',
    topic: 'Business Acumen',
    subtopic: 'Accounting',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-087',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The purpose of audit committee oversight of internal audit includes:',
    options: [
      'Directing all audit work',
      'Ensuring independence and assessing value provided',
      'Approving all audit findings',
      'Managing day-to-day operations'
    ],
    correctAnswer: 1,
    explanation: 'The audit committee provides oversight to ensure internal audit independence, adequate resources, and that it provides value. It does not direct daily operations.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Audit Committee',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-088',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Relying on the work of external auditors requires the CAE to evaluate:',
    options: [
      'Nothing; external audit work is always reliable',
      'Competence, independence, due care, and communication',
      'Only the external audit opinion',
      'Only the external audit fee'
    ],
    correctAnswer: 1,
    explanation: 'Before relying on external audit work, the CAE must evaluate their competence, independence, due professional care, scope, and communication of results.',
    topic: 'Managing Internal Audit',
    subtopic: 'External Coordination',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-089',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Regulatory compliance risk includes:',
    options: [
      'Only financial penalties',
      'Penalties, reputational damage, and operational restrictions',
      'Only legal costs',
      'Only audit costs'
    ],
    correctAnswer: 1,
    explanation: 'Regulatory compliance risk includes financial penalties, reputational harm, operational restrictions, loss of licenses, and potential criminal liability.',
    topic: 'Business Acumen',
    subtopic: 'Compliance',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-090',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Combined assurance models help organizations:',
    options: [
      'Reduce all assurance activities',
      'Optimize assurance coverage and reduce gaps and overlaps',
      'Eliminate internal audit',
      'Combine all assurance into one department'
    ],
    correctAnswer: 1,
    explanation: 'Combined assurance integrates and coordinates various assurance activities (internal audit, external audit, compliance, risk management) to optimize coverage and efficiency.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Assurance Coordination',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-091',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Interim reporting during long engagements helps to:',
    options: [
      'Delay the final report',
      'Communicate emerging issues for timely management action',
      'Reduce documentation requirements',
      'Avoid exit conferences'
    ],
    correctAnswer: 1,
    explanation: 'Interim reporting keeps management informed of significant issues as they emerge, allowing timely corrective action rather than waiting for the final report.',
    topic: 'Communicating Results',
    subtopic: 'Interim Reporting',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-092',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Privacy regulations like GDPR require organizations to:',
    options: [
      'Collect as much personal data as possible',
      'Protect personal data, ensure lawful processing, and respect data subject rights',
      'Share data freely across borders',
      'Keep data indefinitely'
    ],
    correctAnswer: 1,
    explanation: 'Privacy regulations require lawful data processing, appropriate security, data minimization, transparency, and respect for individual rights over their personal data.',
    topic: 'Information Security',
    subtopic: 'Privacy',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-093',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Key Risk Indicators (KRIs) are used to:',
    options: [
      'Replace risk assessments',
      'Provide early warning signals of increasing risk exposure',
      'Eliminate all risks',
      'Guarantee risk prevention'
    ],
    correctAnswer: 1,
    explanation: 'KRIs are metrics that provide early warning of increasing risk exposure, enabling proactive risk management before issues materialize.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Risk Monitoring',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-094',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Audit quality is best achieved through:',
    options: [
      'Reducing audit scope',
      'Proper planning, supervision, review, and adherence to standards',
      'Completing audits quickly',
      'Limiting findings'
    ],
    correctAnswer: 1,
    explanation: 'Audit quality requires proper planning, adequate resources, appropriate supervision and review, adherence to standards, and professional competence.',
    topic: 'Managing Internal Audit',
    subtopic: 'Quality',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-095',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Segregation of duties in the procurement process means:',
    options: [
      'One person handles everything',
      'Separating requisition, purchasing, receiving, and payment functions',
      'Only IT handles procurement',
      'Only finance approves purchases'
    ],
    correctAnswer: 1,
    explanation: 'Procurement segregation separates: requisitioning, vendor selection/purchasing, receiving goods, and processing payment to prevent fraud and errors.',
    topic: 'Business Acumen',
    subtopic: 'Internal Control',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-096',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The internal audit activity should review operations and programs to ascertain whether results are:',
    options: [
      'Maximizing profits',
      'Consistent with established objectives and goals',
      'Meeting external stakeholder expectations only',
      'Satisfying regulatory requirements only'
    ],
    correctAnswer: 1,
    explanation: 'Internal audit evaluates whether operations and programs achieve established objectives and goals, and whether they are implemented as intended.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Operational Auditing',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-097',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When management implements an action that differs from the recommendation, the auditor should:',
    options: [
      'Insist on the original recommendation',
      'Evaluate whether the alternative action adequately addresses the risk',
      'Ignore the difference',
      'Immediately escalate to the board'
    ],
    correctAnswer: 1,
    explanation: 'If management\'s alternative action adequately addresses the underlying risk, it may be acceptable. The focus should be on risk mitigation, not the specific recommendation.',
    topic: 'Managing Internal Audit',
    subtopic: 'Follow-Up',
  reference: 'IIA Standards'
  },
  {
    id: 'cia3-b8-098',
    courseId: 'cia',
    section: 'CIA3',
    blueprintArea: 'CIA3-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Due diligence in mergers and acquisitions should include:',
    options: [
      'Only financial review',
      'Financial, legal, operational, IT, environmental, and cultural assessment',
      'Only legal review',
      'Only synergy estimation'
    ],
    correctAnswer: 1,
    explanation: 'M&A due diligence encompasses financial, legal, tax, operational, IT, human resources, environmental, and cultural assessments to identify risks and value.',
    topic: 'Business Acumen',
    subtopic: 'Corporate Transactions',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b8-099',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The internal audit charter should be reviewed:',
    options: [
      'Only when required by law',
      'Periodically and presented for approval to senior management and the board',
      'Only when problems arise',
      'Every ten years'
    ],
    correctAnswer: 1,
    explanation: 'The CAE must periodically review the internal audit charter and present it to senior management and the board for approval.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Charter',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b8-100',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When an engagement identifies control deficiencies that also affect other areas, the CAE should:',
    options: [
      'Only report on the area audited',
      'Consider the broader organizational impact and expand communication as appropriate',
      'Wait until those areas are audited',
      'Ignore the broader implications'
    ],
    correctAnswer: 1,
    explanation: 'Significant findings that affect other areas should be considered more broadly, and communication should be expanded to appropriate stakeholders.',
    topic: 'Communicating Results',
    subtopic: 'Significant Matters',
  reference: 'IIA Standards'
  }
];
