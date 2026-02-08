/**
 * CISA Domain 1: Information Systems Auditing Process
 * Batch 8 - 30 Additional MCQs
 * Advanced exam-style questions
 */

import { Question } from '../../../types';

export const CISA1_QUESTIONS_BATCH8: Question[] = [
  {
    id: 'CISA1-173',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'An IS auditor discovers that the audit client has implemented a compensating control for an identified weakness. The auditor should FIRST:',
    options: [
      'Accept the compensating control as adequate',
      'Evaluate the design and operating effectiveness of the compensating control',
      'Report the original weakness as unresolved',
      'Recommend implementation of the primary control'
    ],
    correctAnswer: 1,
    explanation: 'The auditor must evaluate whether the compensating control effectively mitigates the risk before accepting it as adequate.',
    topic: 'Audit Execution',
    subtopic: 'Compensating Controls'
  },
  {
    id: 'CISA1-174',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'When using Computer Assisted Audit Techniques (CAATs), which of the following is MOST important to ensure?',
    options: [
      'The software is from a reputable vendor',
      'The integrity of the data being analyzed',
      'The auditor has programming experience',
      'The client approves all queries in advance'
    ],
    correctAnswer: 1,
    explanation: 'Data integrity is paramount when using CAATs. If the data has been manipulated or is incomplete, audit conclusions will be invalid.',
    topic: 'CAATs',
    subtopic: 'Data Integrity'
  },
  {
    id: 'CISA1-175',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'An IS auditor is reviewing an organization\'s risk assessment methodology. Which of the following findings would be MOST concerning?',
    options: [
      'Risk assessments are performed annually',
      'Qualitative and quantitative methods are both used',
      'Risk owners are not formally identified',
      'Residual risk is documented after controls'
    ],
    correctAnswer: 2,
    explanation: 'Without formal risk owners, there is no accountability for risk treatment decisions and ongoing monitoring.',
    topic: 'Risk Assessment',
    subtopic: 'Risk Ownership'
  },
  {
    id: 'CISA1-176',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'The PRIMARY reason for an IS auditor to maintain professional skepticism is to:',
    options: [
      'Demonstrate expertise to the audit committee',
      'Identify fraud and irregularities',
      'Avoid being misled by false or incomplete evidence',
      'Complete the audit within budget'
    ],
    correctAnswer: 2,
    explanation: 'Professional skepticism helps the auditor critically assess evidence and avoid being misled by assertions that may be false or incomplete.',
    topic: 'Professional Standards',
    subtopic: 'Professional Skepticism'
  },
  {
    id: 'CISA1-177',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'An IS auditor notes that management has accepted a significant IT risk without implementing controls. What should the auditor do FIRST?',
    options: [
      'Report to the audit committee immediately',
      'Verify that the risk acceptance follows organizational risk appetite and governance',
      'Recommend that management implement controls',
      'Document the finding and close it'
    ],
    correctAnswer: 1,
    explanation: 'Risk acceptance is valid if within risk appetite and properly authorized. The auditor should first verify proper governance before escalating.',
    topic: 'Risk Management',
    subtopic: 'Risk Acceptance'
  },
  {
    id: 'CISA1-178',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Which sampling method is MOST appropriate when the IS auditor wants to ensure representation of all significant transaction types?',
    options: [
      'Random sampling',
      'Stratified sampling',
      'Haphazard sampling',
      'Block sampling'
    ],
    correctAnswer: 1,
    explanation: 'Stratified sampling divides the population into subgroups (strata) ensuring each significant type is represented in the sample.',
    topic: 'Sampling',
    subtopic: 'Stratified Sampling'
  },
  {
    id: 'CISA1-179',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'During a continuous auditing engagement, the IS auditor detects an anomaly that requires immediate investigation. The BEST approach is to:',
    options: [
      'Wait until the next scheduled audit to investigate',
      'Alert management immediately and follow the escalation protocol',
      'Document it in the annual audit report',
      'Increase the sample size for the next period'
    ],
    correctAnswer: 1,
    explanation: 'Continuous auditing is designed to detect anomalies in near real-time. Timely escalation is critical for effective response.',
    topic: 'Continuous Auditing',
    subtopic: 'Anomaly Response'
  },
  {
    id: 'CISA1-180',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'An IS auditor discovers that IT personnel have been asked to perform self-assessments of controls they operate. This situation represents:',
    options: [
      'An efficient use of resources',
      'A control design weakness due to lack of independence',
      'Best practice for control self-assessment',
      'Adequate for low-risk controls only'
    ],
    correctAnswer: 1,
    explanation: 'Self-assessment by those who operate controls lacks independence and objectivity, which is a fundamental control design weakness.',
    topic: 'Control Assessment',
    subtopic: 'Independence'
  },
  {
    id: 'CISA1-181',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When evaluating the reliability of audit evidence obtained from a third-party service organization, the IS auditor should PRIMARILY consider:',
    options: [
      'The reputation of the service organization',
      'The scope and findings of the SOC report',
      'The length of the business relationship',
      'The client\'s satisfaction with the service'
    ],
    correctAnswer: 1,
    explanation: 'A SOC (Service Organization Control) report provides independent attestation about controls at the service organization, which is the most reliable evidence.',
    topic: 'Audit Evidence',
    subtopic: 'Third-Party Evidence'
  },
  {
    id: 'CISA1-182',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'The IS auditor is asked to provide consulting services on a new system implementation. Before accepting, the auditor should FIRST consider:',
    options: [
      'Whether the fee is sufficient',
      'The potential impact on future audit independence',
      'The technical complexity of the project',
      'The availability of audit staff'
    ],
    correctAnswer: 1,
    explanation: 'Consulting on design or implementation could impair independence for future audits of that system. This must be evaluated first.',
    topic: 'Professional Standards',
    subtopic: 'Independence and Consulting'
  },
  {
    id: 'CISA1-183',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'An IS auditor discovers that an organization\'s IT control framework is based on COBIT but has been significantly customized. The auditor should:',
    options: [
      'Insist on full COBIT compliance',
      'Evaluate whether customizations are appropriate for the organization\'s context',
      'Report non-compliance with COBIT',
      'Recommend adopting a different framework'
    ],
    correctAnswer: 1,
    explanation: 'Frameworks like COBIT are meant to be tailored. The auditor should assess whether customizations appropriately address organizational needs and risks.',
    topic: 'IT Governance',
    subtopic: 'Framework Customization'
  },
  {
    id: 'CISA1-184',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'When documenting audit workpapers, which of the following is MOST important?',
    options: [
      'Using standardized templates for all audits',
      'Sufficient detail to allow an experienced auditor to understand the work performed',
      'Minimizing paper usage by summarizing findings',
      'Including all data extracts regardless of relevance'
    ],
    correctAnswer: 1,
    explanation: 'Workpapers must contain sufficient detail so that an experienced auditor not involved in the audit can understand the work performed and conclusions reached.',
    topic: 'Audit Documentation',
    subtopic: 'Workpaper Standards'
  },
  {
    id: 'CISA1-185',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'An IS auditor identifies that an automated control was operating effectively for 10 of 12 months. For this finding, the auditor should:',
    options: [
      'Report the control as operating effectively',
      'Report a control deficiency for the two-month gap',
      'Extrapolate that the control was likely effective all year',
      'Ignore the gap since majority of the year was effective'
    ],
    correctAnswer: 1,
    explanation: 'Control gaps represent periods when the control was not effective, creating risk exposure that must be reported regardless of overall performance.',
    topic: 'Control Testing',
    subtopic: 'Control Gaps'
  },
  {
    id: 'CISA1-186',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'The PRIMARY purpose of an audit charter is to:',
    options: [
      'Define the audit methodology',
      'Establish the authority, responsibility, and accountability of the audit function',
      'List the audits to be performed annually',
      'Specify the qualifications of audit staff'
    ],
    correctAnswer: 1,
    explanation: 'The audit charter establishes the formal authority, responsibility, and accountability of the internal audit function within the organization.',
    topic: 'Audit Standards',
    subtopic: 'Audit Charter'
  },
  {
    id: 'CISA1-187',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When the IS auditor disagrees with management\'s response to an audit finding, the BEST course of action is to:',
    options: [
      'Accept management\'s response and close the finding',
      'Document the disagreement and escalate to appropriate governance',
      'Remove the finding from the report',
      'Delay the report until agreement is reached'
    ],
    correctAnswer: 1,
    explanation: 'Disagreements should be documented and escalated through governance channels (e.g., audit committee) while maintaining the integrity of the audit report.',
    topic: 'Audit Reporting',
    subtopic: 'Disagreements'
  },
  {
    id: 'CISA1-188',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Before relying on work performed by another auditor, an IS auditor should:',
    options: [
      'Assume the work is accurate if from a reputable firm',
      'Evaluate the competence, objectivity, and due professional care of that auditor',
      'Perform the same tests to verify conclusions',
      'Obtain written confirmation of findings'
    ],
    correctAnswer: 1,
    explanation: 'The IS auditor must assess whether the other auditor has the competence, objectivity, and applied due professional care before relying on their work.',
    topic: 'Professional Standards',
    subtopic: 'Reliance on Other Auditors'
  },
  {
    id: 'CISA1-189',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'An organization has implemented automated continuous monitoring of IT controls. This would PRIMARILY impact the IS auditor\'s work by:',
    options: [
      'Eliminating the need for periodic audits',
      'Enabling a shift toward continuous auditing with reduced substantive testing',
      'Requiring the auditor to learn programming',
      'Increasing the frequency of audit reports'
    ],
    correctAnswer: 1,
    explanation: 'Continuous monitoring enables the auditor to leverage automated evidence, potentially shifting to continuous auditing and reducing substantive procedures.',
    topic: 'Continuous Auditing',
    subtopic: 'Continuous Monitoring'
  },
  {
    id: 'CISA1-190',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'The IS auditor is planning an audit of a cloud-based application. Which of the following is MOST important to include in the audit scope?',
    options: [
      'Physical security of the cloud provider\'s data center',
      'The organization\'s responsibilities under the shared responsibility model',
      'Network infrastructure of the cloud provider',
      'Financial viability of the cloud vendor'
    ],
    correctAnswer: 1,
    explanation: 'Under the shared responsibility model, the organization retains responsibilities for certain controls. The audit should focus on what the organization controls.',
    topic: 'Cloud Auditing',
    subtopic: 'Shared Responsibility'
  },
  {
    id: 'CISA1-191',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'An IS auditor notes that key controls are monitored by the first line of defense. For governance to be effective, the auditor should also verify:',
    options: [
      'Management periodically self-certifies control effectiveness',
      'A second line function provides independent oversight of those controls',
      'External auditors review all key controls annually',
      'The board directly reviews control monitoring results'
    ],
    correctAnswer: 1,
    explanation: 'The Three Lines Model requires second line functions (risk, compliance) to provide oversight of first line controls, ensuring independence and challenge.',
    topic: 'IT Governance',
    subtopic: 'Three Lines Model'
  },
  {
    id: 'CISA1-192',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'During fieldwork, an IS auditor discovers evidence of potential fraud. The FIRST action should be to:',
    options: [
      'Confront the suspected individual',
      'Inform the audit committee',
      'Consult with the chief audit executive or appropriate authority',
      'Complete the audit before taking action'
    ],
    correctAnswer: 2,
    explanation: 'Fraud indications should be reported to appropriate authority (CAE or equivalent) who will determine the proper course of action including any investigation.',
    topic: 'Fraud Detection',
    subtopic: 'Fraud Response'
  },
  {
    id: 'CISA1-193',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When assessing IT general controls (ITGCs), the IS auditor should understand that ITGCs:',
    options: [
      'Only apply to financial reporting systems',
      'Support the effective operation of application controls',
      'Are less important than application controls',
      'Can be tested independently without considering applications'
    ],
    correctAnswer: 1,
    explanation: 'ITGCs create the environment in which application controls operate. Weak ITGCs can undermine the effectiveness of application controls.',
    topic: 'IT General Controls',
    subtopic: 'ITGC Purpose'
  },
  {
    id: 'CISA1-194',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'An IS auditor is testing logical access controls. Which of the following tests would provide the MOST assurance?',
    options: [
      'Reviewing the access control policy',
      'Interviewing the security administrator',
      'Examining system configurations and testing access with sample users',
      'Reviewing access request forms'
    ],
    correctAnswer: 2,
    explanation: 'Direct examination and testing provides the strongest evidence of actual control operation, not just design or intent.',
    topic: 'Control Testing',
    subtopic: 'Test of Controls'
  },
  {
    id: 'CISA1-195',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'The IS auditor discovers that management has not remediated a finding from two years ago citing budget constraints. The auditor should:',
    options: [
      'Accept the explanation and close the finding',
      'Reassess the risk and report the aging finding with updated context',
      'Exclude it from the current report since it was previously reported',
      'Recommend outsourcing the remediation'
    ],
    correctAnswer: 1,
    explanation: 'Aging findings with ongoing risk should be reassessed and reported with updated context. Budget constraints do not eliminate the risk.',
    topic: 'Follow-Up',
    subtopic: 'Aging Findings'
  },
  {
    id: 'CISA1-196',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Audit planning should be risk-based primarily to ensure:',
    options: [
      'Compliance with audit standards',
      'Audit resources are focused on the highest risk areas',
      'All IT systems are audited equally',
      'Auditors maintain technical skills'
    ],
    correctAnswer: 1,
    explanation: 'Risk-based planning ensures limited audit resources are directed toward areas with the highest risk, maximizing audit value.',
    topic: 'Audit Planning',
    subtopic: 'Risk-Based Planning'
  },
  {
    id: 'CISA1-197',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'An organization uses agile development with frequent releases. The IS auditor should recommend:',
    options: [
      'Reverting to waterfall methodology for better control',
      'Integrating audit activities into the agile process through continuous auditing',
      'Auditing only major releases',
      'Waiting until the end of each sprint for comprehensive review'
    ],
    correctAnswer: 1,
    explanation: 'Agile environments require auditing approaches that match the pace of development, such as integrated or continuous auditing.',
    topic: 'Agile Auditing',
    subtopic: 'Continuous Auditing in Agile'
  },
  {
    id: 'CISA1-198',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'The BEST way for an IS auditor to verify management assertions about automated controls is to:',
    options: [
      'Obtain written representations from management',
      'Perform independent testing of the automated control',
      'Review system documentation',
      'Interview the control owner'
    ],
    correctAnswer: 1,
    explanation: 'Independent testing provides direct evidence of control operation, which is more reliable than management assertions or documentation.',
    topic: 'Audit Evidence',
    subtopic: 'Testing Automated Controls'
  },
  {
    id: 'CISA1-199',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'An IS auditor is asked to participate in a system acquisition project from inception. The MOST appropriate role for the auditor is:',
    options: [
      'Project manager',
      'Decision maker on vendor selection',
      'Independent advisor providing control recommendations',
      'Technical architect'
    ],
    correctAnswer: 2,
    explanation: 'The auditor can provide valuable input on controls while maintaining independence by serving as an advisor rather than a decision maker.',
    topic: 'Consulting Role',
    subtopic: 'Advisory in Projects'
  },
  {
    id: 'CISA1-200',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Quality assurance and improvement programs for internal audit are required to:',
    options: [
      'Ensure audit reports are approved by management',
      'Evaluate conformance with standards and promote continuous improvement',
      'Reduce audit costs',
      'Increase audit coverage'
    ],
    correctAnswer: 1,
    explanation: 'QAIP programs evaluate whether the audit function conforms to professional standards and identify opportunities for improvement.',
    topic: 'Quality Assurance',
    subtopic: 'QAIP'
  },
  {
    id: 'CISA1-201',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When an IS auditor identifies that a key control relies heavily on one individual, this finding relates to:',
    options: [
      'Control effectiveness',
      'Key person dependency risk',
      'Segregation of duties',
      'Audit sampling error'
    ],
    correctAnswer: 1,
    explanation: 'Key person dependency creates sustainability risk if that individual is unavailable. This is a design weakness in the control environment.',
    topic: 'Control Assessment',
    subtopic: 'Key Person Dependency'
  },
  {
    id: 'CISA1-202',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'An IS auditor notes that a control is described differently in the policy and procedure documents. The auditor should FIRST:',
    options: [
      'Report an inconsistency finding',
      'Determine how the control actually operates in practice',
      'Recommend updating the policy',
      'Test based on the policy description'
    ],
    correctAnswer: 1,
    explanation: 'The auditor should determine actual practice before concluding. Documentation inconsistency is a concern, but actual operation matters most.',
    topic: 'Control Testing',
    subtopic: 'Documentation vs. Practice'
  }
];
