/**
 * CISA Domain 1: Information Systems Auditing Process
 * Batch 4 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA1_QUESTIONS_BATCH4: Question[] = [
  {
    id: 'CISA1-063',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'The PRIMARY reason for planning IS audits is to:',
    options: [
      'Minimize audit costs',
      'Ensure audit objectives are achieved efficiently',
      'Satisfy management requirements',
      'Document audit procedures'
    ],
    correctAnswer: 1,
    explanation: 'Audit planning ensures that audit objectives are achievable and resources are used efficiently, focusing on the most significant risks.',
    topic: 'Audit Planning',
    subtopic: 'Planning Purpose'
  },
  {
    id: 'CISA1-064',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When developing an audit program, the FIRST step should be to:',
    options: [
      'Select audit tools',
      'Understand the area being audited and its risks',
      'Schedule interviews',
      'Draft the audit report'
    ],
    correctAnswer: 1,
    explanation: 'Before developing procedures, the auditor must understand the area being audited, its objectives, and associated risks.',
    topic: 'Audit Planning',
    subtopic: 'Audit Program Development'
  },
  {
    id: 'CISA1-065',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Risk ranking in audit planning helps:',
    options: [
      'Reduce audit staff',
      'Prioritize audit resources to high-risk areas',
      'Eliminate low-risk areas',
      'Satisfy regulatory requirements'
    ],
    correctAnswer: 1,
    explanation: 'Risk ranking prioritizes audit resources toward areas with the highest risk, ensuring the most significant risks receive appropriate attention.',
    topic: 'Audit Planning',
    subtopic: 'Risk Ranking'
  },
  {
    id: 'CISA1-066',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'An IS auditor should obtain authorization to perform the audit through:',
    options: [
      'Verbal agreement',
      'Formal engagement letter or audit charter',
      'Email confirmation',
      'Calendar invitation'
    ],
    correctAnswer: 1,
    explanation: 'A formal engagement letter or audit charter provides documented authorization, defining scope, objectives, and responsibilities.',
    topic: 'Audit Administration',
    subtopic: 'Authorization'
  },
  {
    id: 'CISA1-067',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When evaluating control effectiveness, an auditor should consider:',
    options: [
      'Only control design',
      'Both design and operating effectiveness',
      'Only cost of controls',
      'Only management opinion'
    ],
    correctAnswer: 1,
    explanation: 'Control evaluation considers both design (whether the control is capable of preventing/detecting issues) and operating effectiveness (whether it works consistently).',
    topic: 'Control Assessment',
    subtopic: 'Control Evaluation'
  },
  {
    id: 'CISA1-068',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Automated controls are generally preferred because they:',
    options: [
      'Are always more effective',
      'Operate consistently without human error',
      'Cost less to implement',
      'Require no monitoring'
    ],
    correctAnswer: 1,
    explanation: 'Automated controls operate consistently once properly implemented, eliminating variability from human factors.',
    topic: 'Control Assessment',
    subtopic: 'Automated Controls'
  },
  {
    id: 'CISA1-069',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Compensating controls are implemented when:',
    options: [
      'Primary controls are inadequate or impractical',
      'No risks exist',
      'Management requests them',
      'Auditors require them'
    ],
    correctAnswer: 0,
    explanation: 'Compensating controls are alternative controls implemented when primary controls are inadequate, impractical, or too costly.',
    topic: 'Control Assessment',
    subtopic: 'Compensating Controls'
  },
  {
    id: 'CISA1-070',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When testing controls, sample size should be determined by:',
    options: [
      'Available time only',
      'Population size, desired confidence level, and expected error rate',
      'Management preference',
      'Prior year sample size'
    ],
    correctAnswer: 1,
    explanation: 'Sample size depends on the population size, desired confidence level, tolerable error rate, and expected error rate.',
    topic: 'Sampling',
    subtopic: 'Sample Size'
  },
  {
    id: 'CISA1-071',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Judgmental sampling is most appropriate when:',
    options: [
      'Statistical conclusions are required',
      'The auditor needs to focus on specific high-risk items',
      'Population is uniform',
      'Large samples are needed'
    ],
    correctAnswer: 1,
    explanation: 'Judgmental sampling allows auditors to focus on specific items of interest, high-risk transactions, or unusual items.',
    topic: 'Sampling',
    subtopic: 'Judgmental Sampling'
  },
  {
    id: 'CISA1-072',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Discovery sampling is designed to:',
    options: [
      'Estimate error rates',
      'Find at least one error if the error rate exceeds a threshold',
      'Select random samples',
      'Test all items'
    ],
    correctAnswer: 1,
    explanation: 'Discovery sampling is designed to find at least one error if the error rate in the population exceeds a predefined threshold.',
    topic: 'Sampling',
    subtopic: 'Discovery Sampling'
  },
  {
    id: 'CISA1-073',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Generalized audit software (GAS) capabilities include:',
    options: [
      'Only report writing',
      'Data extraction, analysis, and testing',
      'Only data backup',
      'Only documentation'
    ],
    correctAnswer: 1,
    explanation: 'GAS provides data extraction, analysis, sampling, duplicate testing, gap analysis, and reporting capabilities.',
    topic: 'CAATs',
    subtopic: 'GAS'
  },
  {
    id: 'CISA1-074',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'When using CAATs, data integrity should be verified by:',
    options: [
      'Trusting the source system',
      'Comparing extracted data to known totals',
      'Using only recent data',
      'Limiting data volume'
    ],
    correctAnswer: 1,
    explanation: 'Data integrity verification includes comparing extracted data to known control totals, record counts, or other reliable sources.',
    topic: 'CAATs',
    subtopic: 'Data Integrity'
  },
  {
    id: 'CISA1-075',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Embedded audit modules are:',
    options: [
      'External tools',
      'Audit routines built into production applications',
      'Standalone programs',
      'Manual procedures'
    ],
    correctAnswer: 1,
    explanation: 'Embedded audit modules are audit routines programmed into production applications to capture transactions meeting specific criteria.',
    topic: 'CAATs',
    subtopic: 'Embedded Modules'
  },
  {
    id: 'CISA1-076',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When auditing system development, the MOST critical phase to review is:',
    options: [
      'Maintenance',
      'Requirements definition',
      'Coding',
      'Testing'
    ],
    correctAnswer: 1,
    explanation: 'Requirements definition is most critical because errors here propagate through all subsequent phases and are costly to correct later.',
    topic: 'SDLC Auditing',
    subtopic: 'Requirements'
  },
  {
    id: 'CISA1-077',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Post-implementation audits should assess:',
    options: [
      'Only technical functionality',
      'Whether objectives were achieved and lessons learned',
      'Only budget adherence',
      'Only schedule compliance'
    ],
    correctAnswer: 1,
    explanation: 'Post-implementation reviews assess whether project objectives were achieved, benefits realized, and lessons learned for future projects.',
    topic: 'SDLC Auditing',
    subtopic: 'Post-Implementation'
  },
  {
    id: 'CISA1-078',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'When reviewing access control lists, an auditor should verify:',
    options: [
      'Only the list format',
      'Access aligns with job responsibilities and least privilege',
      'Only administrator access',
      'Only external access'
    ],
    correctAnswer: 1,
    explanation: 'Access reviews verify that access permissions align with job responsibilities and follow the least privilege principle.',
    topic: 'Access Control Auditing',
    subtopic: 'Access Reviews'
  },
  {
    id: 'CISA1-079',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Review of terminated user accounts is important to ensure:',
    options: [
      'Accounts are renamed',
      'Access is disabled or removed timely',
      'Accounts are archived',
      'Licenses are reclaimed'
    ],
    correctAnswer: 1,
    explanation: 'Terminated user accounts should be disabled or removed promptly to prevent unauthorized access after employment ends.',
    topic: 'Access Control Auditing',
    subtopic: 'Termination'
  },
  {
    id: 'CISA1-080',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Network security auditing should include review of:',
    options: [
      'Only firewall rules',
      'Firewall configurations, network segmentation, and monitoring',
      'Only wireless access',
      'Only physical network'
    ],
    correctAnswer: 1,
    explanation: 'Network security auditing covers firewall rules, network segmentation, intrusion detection, remote access, wireless security, and monitoring.',
    topic: 'Network Auditing',
    subtopic: 'Network Security'
  },
  {
    id: 'CISA1-081',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'When auditing business continuity plans, the auditor should verify:',
    options: [
      'Only documentation existence',
      'Plans are current, complete, and tested',
      'Only executive approval',
      'Only IT recovery'
    ],
    correctAnswer: 1,
    explanation: 'BCP audit verifies plans are current, complete, aligned with business requirements, and tested to validate recovery capability.',
    topic: 'BCP Auditing',
    subtopic: 'BCP Review'
  },
  {
    id: 'CISA1-082',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'An audit of third-party providers should include:',
    options: [
      'Only contract review',
      'Contract terms, control assessments, and ongoing monitoring',
      'Only pricing review',
      'Only service delivery'
    ],
    correctAnswer: 1,
    explanation: 'Third-party audits cover contract terms, control assessments (or SOC reports), performance monitoring, and compliance with requirements.',
    topic: 'Third-Party Auditing',
    subtopic: 'Vendor Audit'
  },
  {
    id: 'CISA1-083',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Cloud computing audits should address:',
    options: [
      'Only physical data center',
      'Shared responsibility, data protection, and vendor controls',
      'Only network speed',
      'Only contract price'
    ],
    correctAnswer: 1,
    explanation: 'Cloud audits address shared responsibility model, data protection, access controls, compliance, and vendor control assessments.',
    topic: 'Cloud Auditing',
    subtopic: 'Cloud Assessment'
  },
  {
    id: 'CISA1-084',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Privacy audits should assess:',
    options: [
      'Only technical controls',
      'Data collection, use, protection, and compliance with regulations',
      'Only user consent',
      'Only data deletion'
    ],
    correctAnswer: 1,
    explanation: 'Privacy audits assess the entire data lifecycle: collection practices, use, protection measures, retention, and regulatory compliance.',
    topic: 'Privacy Auditing',
    subtopic: 'Privacy Assessment'
  },
  {
    id: 'CISA1-085',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Continuous auditing and continuous monitoring differ in that:',
    options: [
      'There is no difference',
      'Continuous monitoring is management\'s responsibility; continuous auditing is audit\'s',
      'Continuous auditing is more frequent',
      'Continuous monitoring requires more tools'
    ],
    correctAnswer: 1,
    explanation: 'Continuous monitoring is a management responsibility for ongoing control effectiveness; continuous auditing is the audit function\'s ongoing assessment.',
    topic: 'Continuous Auditing',
    subtopic: 'CA vs CM'
  },
  {
    id: 'CISA1-086',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Audit recommendations should be:',
    options: [
      'As detailed as possible',
      'Practical, actionable, and address the root cause',
      'Directed to specific individuals',
      'Limited to technical solutions'
    ],
    correctAnswer: 1,
    explanation: 'Recommendations should be practical, actionable, cost-effective, and address root causes rather than just symptoms.',
    topic: 'Audit Reporting',
    subtopic: 'Recommendations'
  },
  {
    id: 'CISA1-087',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Management response to audit findings should include:',
    options: [
      'Only acknowledgment',
      'Planned corrective actions, responsible parties, and target dates',
      'Only disagreement if applicable',
      'Only budget impact'
    ],
    correctAnswer: 1,
    explanation: 'Management responses should include specific corrective actions, responsible individuals, and target completion dates.',
    topic: 'Audit Reporting',
    subtopic: 'Management Response'
  },
  {
    id: 'CISA1-088',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When management disagrees with findings, the auditor should:',
    options: [
      'Remove the finding',
      'Document management\'s position and escalate if risk is significant',
      'Accept management\'s view',
      'Ignore the disagreement'
    ],
    correctAnswer: 1,
    explanation: 'When management disagrees, document their position and rationale. If risk is significant, escalate to appropriate levels.',
    topic: 'Audit Reporting',
    subtopic: 'Disagreements'
  },
  {
    id: 'CISA1-089',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Audit report distribution should be based on:',
    options: [
      'Auditor preference',
      'Need to know and organizational requirements',
      'Auditee request',
      'Maximum distribution'
    ],
    correctAnswer: 1,
    explanation: 'Report distribution follows the need-to-know principle, distributing to those who need the information for their responsibilities.',
    topic: 'Audit Reporting',
    subtopic: 'Distribution'
  },
  {
    id: 'CISA1-090',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'An audit conclusion should be based on:',
    options: [
      'Management assertions',
      'Sufficient, reliable evidence gathered during the audit',
      'Prior year conclusions',
      'Auditor assumptions'
    ],
    correctAnswer: 1,
    explanation: 'Audit conclusions must be supported by sufficient, reliable, and relevant evidence gathered through appropriate audit procedures.',
    topic: 'Audit Reporting',
    subtopic: 'Conclusions'
  },
  {
    id: 'CISA1-091',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Integrated audits combine:',
    options: [
      'Multiple auditees',
      'Financial, operational, and IT audit procedures',
      'Multiple audit firms',
      'Only IT procedures'
    ],
    correctAnswer: 1,
    explanation: 'Integrated audits combine financial, operational, compliance, and IT audit procedures into a unified approach.',
    topic: 'Audit Approach',
    subtopic: 'Integrated Auditing'
  },
  {
    id: 'CISA1-092',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Knowledge transfer at audit conclusion is important for:',
    options: [
      'Billing purposes',
      'Continuity and efficiency of future audits',
      'Staff evaluation',
      'Report approval'
    ],
    correctAnswer: 1,
    explanation: 'Knowledge transfer ensures understanding of the audit area, findings, and processes is retained for future audit engagements.',
    topic: 'Audit Administration',
    subtopic: 'Knowledge Transfer'
  },
];

export default CISA1_QUESTIONS_BATCH4;
