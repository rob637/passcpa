/**
 * CISA Domain 1: Information Systems Auditing Process
 * Batch 2 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA1_QUESTIONS_BATCH2: Question[] = [
  {
    id: 'CISA1-003',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Which of the following BEST describes the purpose of an IS audit charter?',
    options: [
      'To define the audit schedule for the year',
      'To establish the authority, responsibility, and accountability of the IS audit function',
      'To document specific audit procedures',
      'To identify all systems to be audited'
    ],
    correctAnswer: 1,
    explanation: 'The IS audit charter establishes the authority, responsibility, and accountability of the IS audit function. It provides the mandate for the audit function and should be approved by senior management.',
    topic: 'IS Audit Standards and Guidelines',
    subtopic: 'Audit Charter'
  },
  {
    id: 'CISA1-004',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When developing a risk-based audit plan, which factor should receive the HIGHEST priority?',
    options: [
      'Management requests',
      'Previous audit findings',
      'Business criticality and risk exposure',
      'Available audit resources'
    ],
    correctAnswer: 2,
    explanation: 'A risk-based audit approach prioritizes areas based on business criticality and risk exposure. While other factors are considered, risk should drive audit planning to ensure resources focus on highest-impact areas.',
    topic: 'Risk-Based Audit Planning',
    subtopic: 'Risk Assessment'
  },
  {
    id: 'CISA1-005',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Which type of audit evidence is considered MOST reliable?',
    options: [
      'Oral representations from management',
      'Internally generated reports reviewed by management',
      'External confirmations received directly by the auditor',
      'System-generated reports provided by IT staff'
    ],
    correctAnswer: 2,
    explanation: 'External confirmations received directly by the auditor are most reliable because they come from independent third parties and are received directly without potential manipulation.',
    topic: 'Audit Evidence',
    subtopic: 'Evidence Reliability'
  },
  {
    id: 'CISA1-006',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'An IS auditor discovers that a critical control is not operating effectively. The FIRST action should be to:',
    options: [
      'Report to the audit committee',
      'Determine the business impact',
      'Recommend immediate remediation',
      'Document the finding in the audit report'
    ],
    correctAnswer: 1,
    explanation: 'Before escalating or recommending remediation, the auditor should first assess the business impact of the control failure to understand the significance and urgency of the issue.',
    topic: 'Audit Execution',
    subtopic: 'Control Evaluation'
  },
  {
    id: 'CISA1-007',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Which sampling method is MOST appropriate when testing for compliance with a control that should operate 100% of the time?',
    options: [
      'Variable sampling',
      'Attribute sampling',
      'Discovery sampling',
      'Stratified sampling'
    ],
    correctAnswer: 2,
    explanation: 'Discovery sampling is designed to detect at least one exception if the exception rate exceeds a specified threshold. It is most appropriate when even one control failure is significant.',
    topic: 'Audit Sampling',
    subtopic: 'Sampling Methods'
  },
  {
    id: 'CISA1-008',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'The PRIMARY purpose of documenting audit work is to:',
    options: [
      'Comply with professional standards',
      'Provide evidence supporting audit conclusions',
      'Create a training resource for new auditors',
      'Satisfy regulatory requirements'
    ],
    correctAnswer: 1,
    explanation: 'The primary purpose of audit documentation is to provide sufficient evidence to support the audit conclusions and opinions. While compliance is important, evidence support is the fundamental purpose.',
    topic: 'Audit Documentation',
    subtopic: 'Working Papers'
  },
  {
    id: 'CISA1-009',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When an IS auditor identifies a material weakness, notification to the audit committee should occur:',
    options: [
      'After the final report is issued',
      'Only if management fails to remediate',
      'In a timely manner before the final report',
      'At the next scheduled audit committee meeting'
    ],
    correctAnswer: 2,
    explanation: 'Material weaknesses should be communicated to the audit committee in a timely manner, not delayed until the final report or next meeting. Prompt notification enables appropriate governance oversight.',
    topic: 'Audit Reporting',
    subtopic: 'Communication'
  },
  {
    id: 'CISA1-010',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Which of the following BEST ensures auditor independence?',
    options: [
      'Rotating audit staff annually',
      'Functional reporting to the audit committee',
      'Using external auditors exclusively',
      'Having IT management approve the audit plan'
    ],
    correctAnswer: 1,
    explanation: 'Functional reporting to the audit committee (rather than to IT or operational management) best ensures auditor independence by providing direct access to governance oversight.',
    topic: 'Professional Ethics',
    subtopic: 'Independence'
  },
  {
    id: 'CISA1-011',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'Computer-assisted audit techniques (CAATs) are MOST valuable for:',
    options: [
      'Replacing the need for manual testing',
      'Analyzing large volumes of data efficiently',
      'Eliminating the need for sampling',
      'Automating the entire audit process'
    ],
    correctAnswer: 1,
    explanation: 'CAATs are most valuable for efficiently analyzing large volumes of data that would be impractical to review manually. They supplement but do not replace professional judgment.',
    topic: 'Audit Tools and Techniques',
    subtopic: 'CAATs'
  },
  {
    id: 'CISA1-012',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When using generalized audit software (GAS), the GREATEST risk is:',
    options: [
      'Incomplete data extraction',
      'Software licensing violations',
      'Relying on data from an unreliable source',
      'Excessive processing time'
    ],
    correctAnswer: 2,
    explanation: 'The greatest risk when using GAS is relying on data from an unreliable source. If the source data lacks integrity, all analysis results will be flawed regardless of the tool\'s capabilities.',
    topic: 'Audit Tools and Techniques',
    subtopic: 'Data Analytics'
  },
  {
    id: 'CISA1-013',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'An IS auditor reviewing a previous audit\'s working papers should PRIMARILY be concerned with:',
    options: [
      'The format and organization of documentation',
      'Whether findings were closed',
      'Changes in the control environment since the last audit',
      'The qualifications of the previous auditor'
    ],
    correctAnswer: 2,
    explanation: 'When reviewing prior working papers, the auditor should primarily assess changes in the control environment that may affect current audit scope and approach.',
    topic: 'Audit Planning',
    subtopic: 'Prior Audit Review'
  },
  {
    id: 'CISA1-014',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'The PRIMARY purpose of an audit program is to:',
    options: [
      'Document the audit methodology',
      'Guide the auditor in gathering evidence',
      'Satisfy quality assurance requirements',
      'Provide a checklist for management review'
    ],
    correctAnswer: 1,
    explanation: 'An audit program provides detailed procedures to guide the auditor in gathering sufficient appropriate evidence to achieve audit objectives.',
    topic: 'Audit Planning',
    subtopic: 'Audit Program'
  },
  {
    id: 'CISA1-015',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When an auditee disagrees with an audit finding, the IS auditor should FIRST:',
    options: [
      'Escalate to the audit committee',
      'Remove the finding from the report',
      'Review the evidence and discuss with the auditee',
      'Include management\'s response in the report'
    ],
    correctAnswer: 2,
    explanation: 'When disagreement occurs, the auditor should first review the evidence and discuss with the auditee to ensure factual accuracy. This may resolve the disagreement or clarify the issue.',
    topic: 'Audit Reporting',
    subtopic: 'Disagreements'
  },
  {
    id: 'CISA1-016',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'Which of the following is the BEST indicator of an effective IS audit function?',
    options: [
      'Number of audits completed per year',
      'Percentage of recommendations implemented',
      'Low cost per audit hour',
      'Number of findings per audit'
    ],
    correctAnswer: 1,
    explanation: 'The percentage of recommendations implemented indicates that audit findings result in actual improvements, demonstrating the audit function\'s effectiveness in driving positive change.',
    topic: 'Audit Quality',
    subtopic: 'Performance Metrics'
  },
  {
    id: 'CISA1-017',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Continuous auditing is BEST described as:',
    options: [
      'Auditing without interruption throughout the year',
      'Using automated tools to gather audit evidence on an ongoing basis',
      'Performing audits more frequently',
      'Real-time reporting of all transactions'
    ],
    correctAnswer: 1,
    explanation: 'Continuous auditing uses automated tools and techniques to gather audit evidence and perform testing on an ongoing basis, enabling more timely identification of issues.',
    topic: 'Continuous Auditing',
    subtopic: 'Definition'
  },
  {
    id: 'CISA1-018',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Which control is MOST important to verify when auditing an organization\'s use of cloud services?',
    options: [
      'Physical security at the cloud provider',
      'Right-to-audit clause in the contract',
      'Cloud provider\'s financial stability',
      'Encryption algorithms used'
    ],
    correctAnswer: 1,
    explanation: 'The right-to-audit clause is most important because it enables the organization to verify the cloud provider\'s controls. Without this, the organization cannot adequately assess third-party risk.',
    topic: 'Third-Party Audits',
    subtopic: 'Cloud Auditing'
  },
  {
    id: 'CISA1-019',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'When performing a compliance audit, the auditor\'s PRIMARY focus should be on:',
    options: [
      'Operational efficiency',
      'Adherence to laws, regulations, and policies',
      'Financial statement accuracy',
      'System performance metrics'
    ],
    correctAnswer: 1,
    explanation: 'A compliance audit focuses on determining whether the organization adheres to applicable laws, regulations, contractual requirements, and internal policies.',
    topic: 'Types of Audits',
    subtopic: 'Compliance Audit'
  },
  {
    id: 'CISA1-020',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'The ISACA Code of Professional Ethics requires IS auditors to:',
    options: [
      'Report all findings to regulatory authorities',
      'Maintain confidentiality of information obtained during audits',
      'Accept only audits within their area of expertise',
      'Refuse audits where management is uncooperative'
    ],
    correctAnswer: 1,
    explanation: 'The ISACA Code requires IS auditors to maintain confidentiality of information obtained during audits, using it only for legitimate audit purposes and protecting it from unauthorized disclosure.',
    topic: 'Professional Ethics',
    subtopic: 'ISACA Code'
  },
  {
    id: 'CISA1-021',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'An IS auditor discovers potential fraud during an audit. The FIRST action should be to:',
    options: [
      'Confront the suspected employee',
      'Report to law enforcement',
      'Notify appropriate management and seek guidance',
      'Expand testing to determine the full extent'
    ],
    correctAnswer: 2,
    explanation: 'When fraud is suspected, the auditor should first notify appropriate management (or the audit committee if management is involved) and seek guidance on next steps, including whether to involve specialists.',
    topic: 'Fraud Detection',
    subtopic: 'Fraud Response'
  },
  {
    id: 'CISA1-022',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'Which of the following provides the BEST evidence that a control is operating effectively?',
    options: [
      'Management assertion',
      'Policy documentation',
      'Observation of the control in operation',
      'Interview with control owner'
    ],
    correctAnswer: 2,
    explanation: 'Observation of the control in operation provides direct evidence of operating effectiveness. Policies and assertions indicate design but not necessarily operation.',
    topic: 'Audit Evidence',
    subtopic: 'Operating Effectiveness'
  },
  {
    id: 'CISA1-023',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'The PRIMARY reason for using statistical sampling in an IS audit is to:',
    options: [
      'Reduce audit time and cost',
      'Provide a mathematically based conclusion about the population',
      'Eliminate the need for professional judgment',
      'Ensure all transactions are tested'
    ],
    correctAnswer: 1,
    explanation: 'Statistical sampling allows the auditor to draw mathematically based conclusions about an entire population from a sample, with known confidence levels and precision.',
    topic: 'Audit Sampling',
    subtopic: 'Statistical Sampling'
  },
  {
    id: 'CISA1-024',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When auditing a data center, which observation would be of GREATEST concern?',
    options: [
      'Raised floor height is below recommended standards',
      'Operators can access multiple system consoles',
      'Visitors must be escorted at all times',
      'Environmental controls are monitored 24/7'
    ],
    correctAnswer: 1,
    explanation: 'Operators having access to multiple system consoles raises segregation of duties concerns and increases the risk of unauthorized actions or fraud.',
    topic: 'Physical Security Audit',
    subtopic: 'Data Center'
  },
  {
    id: 'CISA1-025',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'The maturity of an IT process is BEST assessed using:',
    options: [
      'Compliance testing',
      'Capability maturity models',
      'Penetration testing',
      'Financial analysis'
    ],
    correctAnswer: 1,
    explanation: 'Capability maturity models (like CMMI or COBIT maturity assessments) provide structured frameworks for assessing and benchmarking IT process maturity levels.',
    topic: 'Maturity Assessment',
    subtopic: 'Capability Models'
  },
  {
    id: 'CISA1-026',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'An audit trail is PRIMARILY used to:',
    options: [
      'Prevent unauthorized access',
      'Provide accountability and enable reconstruction of events',
      'Encrypt sensitive transactions',
      'Improve system performance'
    ],
    correctAnswer: 1,
    explanation: 'An audit trail provides accountability by recording who did what and when, enabling reconstruction of events for investigation, compliance, or troubleshooting purposes.',
    topic: 'Audit Trails',
    subtopic: 'Purpose'
  },
  {
    id: 'CISA1-027',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When evaluating IT governance, an IS auditor should PRIMARILY assess:',
    options: [
      'Technical specifications of systems',
      'Alignment of IT with business objectives',
      'Number of IT staff certifications',
      'IT department budget utilization'
    ],
    correctAnswer: 1,
    explanation: 'IT governance focuses on ensuring that IT supports and enables business objectives. The auditor should primarily assess this alignment rather than technical or operational details.',
    topic: 'IT Governance',
    subtopic: 'Assessment'
  },
  {
    id: 'CISA1-028',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'Which document should an IS auditor review FIRST when beginning an audit?',
    options: [
      'System documentation',
      'Previous audit reports',
      'Organization chart',
      'Audit charter and scope'
    ],
    correctAnswer: 3,
    explanation: 'The audit charter and scope define the authority, objectives, and boundaries of the audit. This should be reviewed first to understand the mandate before examining other materials.',
    topic: 'Audit Planning',
    subtopic: 'Initial Review'
  },
  {
    id: 'CISA1-029',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'The difference between inherent risk and residual risk is:',
    options: [
      'The cost of implementing controls',
      'The effectiveness of controls in place',
      'The time required for risk mitigation',
      'The likelihood of risk occurrence'
    ],
    correctAnswer: 1,
    explanation: 'Residual risk is what remains after controls are applied. The difference between inherent and residual risk represents the risk reduction achieved through control effectiveness.',
    topic: 'Risk Assessment',
    subtopic: 'Risk Types'
  },
  {
    id: 'CISA1-030',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When an organization outsources IT operations, audit responsibility for those operations:',
    options: [
      'Transfers completely to the service provider',
      'Remains with the organization',
      'Is shared equally between parties',
      'Is eliminated by the outsourcing contract'
    ],
    correctAnswer: 1,
    explanation: 'Audit responsibility remains with the organization regardless of outsourcing. The organization must ensure adequate oversight and assurance over outsourced operations.',
    topic: 'Third-Party Audits',
    subtopic: 'Outsourcing'
  },
  {
    id: 'CISA1-031',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'A SOC 2 Type II report differs from a Type I report primarily because it:',
    options: [
      'Covers a broader scope of controls',
      'Includes testing of operating effectiveness over a period',
      'Is prepared by a different type of auditor',
      'Addresses different trust service criteria'
    ],
    correctAnswer: 1,
    explanation: 'A SOC 2 Type II report includes testing of control operating effectiveness over a period of time (typically 6-12 months), while Type I only assesses design at a point in time.',
    topic: 'Third-Party Assurance',
    subtopic: 'SOC Reports'
  },
  {
    id: 'CISA1-032',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'The PRIMARY objective of follow-up procedures after an audit is to:',
    options: [
      'Verify that management has taken corrective action',
      'Perform additional testing',
      'Update audit documentation',
      'Schedule the next audit'
    ],
    correctAnswer: 0,
    explanation: 'Follow-up procedures primarily verify that management has implemented corrective actions to address audit findings and that the actions are effective.',
    topic: 'Follow-up',
    subtopic: 'Verification'
  },
];

export default CISA1_QUESTIONS_BATCH2;
