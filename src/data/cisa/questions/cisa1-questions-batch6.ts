/**
 * CISA Domain 1: Information Systems Auditing Process
 * Batch 6 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA1_QUESTIONS_BATCH6: Question[] = [
  {
    id: 'cisa1-123',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When auditing a complex IT environment, the MOST important first step is:',
    options: [
      'Reviewing previous audit reports',
      'Understanding the business context and IT strategy',
      'Testing system controls',
      'Interviewing IT management'
    ],
    correctAnswer: 1,
    explanation: 'Understanding business context and IT strategy is foundational to designing an effective audit approach.',
    topic: 'Audit Planning',
    subtopic: 'Context Understanding'
  },
  {
    id: 'cisa1-124',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Compensating controls are appropriate when:',
    options: [
      'Primary controls are too expensive',
      'Primary controls cannot be fully implemented and alternative controls reduce risk',
      'Auditors require them',
      'No other options exist'
    ],
    correctAnswer: 1,
    explanation: 'Compensating controls provide alternative risk reduction when primary controls cannot be fully implemented.',
    topic: 'Control Assessment',
    subtopic: 'Compensating Controls'
  },
  {
    id: 'cisa1-125',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Detective controls primarily:',
    options: [
      'Prevent issues',
      'Identify issues that have occurred',
      'Correct issues',
      'Deter issues'
    ],
    correctAnswer: 1,
    explanation: 'Detective controls identify issues that have already occurred, enabling timely response.',
    topic: 'Control Assessment',
    subtopic: 'Control Types'
  },
  {
    id: 'cisa1-126',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Control self-assessment (CSA) programs:',
    options: [
      'Replace internal audit',
      'Supplement audit by engaging management in control evaluation',
      'Are conducted only by auditors',
      'Eliminate audit testing'
    ],
    correctAnswer: 1,
    explanation: 'CSA supplements internal audit by engaging management in evaluating their own control environment.',
    topic: 'Audit Techniques',
    subtopic: 'CSA'
  },
  {
    id: 'cisa1-127',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'When evaluating third-party audit reports:',
    options: [
      'Accept all findings',
      'Assess scope, timing, and relevance to identified risks',
      'Ignore if recent',
      'Use only for compliance'
    ],
    correctAnswer: 1,
    explanation: 'Evaluate third-party reports for scope coverage, timing, and relevance to your specific risk concerns.',
    topic: 'Audit Evidence',
    subtopic: 'Third-Party Reports'
  },
  {
    id: 'cisa1-128',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Bridge letters from service organizations:',
    options: [
      'Replace SOC reports',
      'Cover the gap between SOC report period and current date',
      'Are not acceptable',
      'Are issued by auditors'
    ],
    correctAnswer: 1,
    explanation: 'Bridge letters from service organizations cover the period between SOC report date and current date.',
    topic: 'Audit Evidence',
    subtopic: 'Bridge Letters'
  },
  {
    id: 'cisa1-129',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Confirmations as audit evidence:',
    options: [
      'Are only for financial audits',
      'Provide independent verification from external parties',
      'Are less reliable than internal documents',
      'Cannot be used for IT audits'
    ],
    correctAnswer: 1,
    explanation: 'Confirmations provide high-quality evidence through independent verification from external parties.',
    topic: 'Audit Evidence',
    subtopic: 'Confirmations'
  },
  {
    id: 'cisa1-130',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit trail evidence should demonstrate:',
    options: [
      'Only who accessed data',
      'Complete transaction history including who, what, when, and where',
      'Only error conditions',
      'Only security events'
    ],
    correctAnswer: 1,
    explanation: 'Audit trails should provide complete history including who performed actions, what was done, when, and from where.',
    topic: 'Audit Evidence',
    subtopic: 'Audit Trails'
  },
  {
    id: 'cisa1-131',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'When auditing IT governance:',
    options: [
      'Focus only on technology',
      'Evaluate alignment between IT and business objectives',
      'Skip board involvement',
      'Only review IT policies'
    ],
    correctAnswer: 1,
    explanation: 'IT governance audits should evaluate alignment between IT objectives and business strategy.',
    topic: 'IT Governance Audit',
    subtopic: 'Governance Assessment'
  },
  {
    id: 'cisa1-132',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Auditing cloud service providers requires:',
    options: [
      'Same approach as on-premises',
      'Understanding shared responsibility and leveraging third-party assurance',
      'Direct control testing only',
      'Ignoring provider controls'
    ],
    correctAnswer: 1,
    explanation: 'Cloud audits require understanding shared responsibility models and leveraging available third-party assurance.',
    topic: 'Cloud Audit',
    subtopic: 'Cloud Approach'
  },
  {
    id: 'cisa1-133',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit of IT project management should include:',
    options: [
      'Only technical delivery',
      'Governance, methodology, scope control, and benefits realization',
      'Only budget adherence',
      'Only timeline review'
    ],
    correctAnswer: 1,
    explanation: 'Project audits should cover governance, methodology adherence, scope control, and benefits realization.',
    topic: 'Project Audit',
    subtopic: 'Project Management'
  },
  {
    id: 'cisa1-134',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'When management proposes to accept a risk:',
    options: [
      'Auditor must reject',
      'Auditor validates understanding of risk and appropriate authorization level',
      'Auditor ignores the finding',
      'Finding is automatically closed'
    ],
    correctAnswer: 1,
    explanation: 'Auditors should validate that management understands the risk and that acceptance is authorized appropriately.',
    topic: 'Risk Assessment',
    subtopic: 'Risk Acceptance'
  },
  {
    id: 'cisa1-135',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Auditor judgment in determining materiality considers:',
    options: [
      'Only financial impact',
      'Quantitative and qualitative factors including reputational risk',
      'Only regulatory requirements',
      'Only management preferences'
    ],
    correctAnswer: 1,
    explanation: 'Materiality considers both quantitative impacts and qualitative factors including reputational and regulatory risk.',
    topic: 'Audit Materiality',
    subtopic: 'Materiality Judgment'
  },
  {
    id: 'cisa1-137',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Presenting audit results to the audit committee:',
    options: [
      'Should include all technical details',
      'Should focus on key risks, significant findings, and management response',
      'Should avoid negative information',
      'Should be identical to the full report'
    ],
    correctAnswer: 1,
    explanation: 'Committee presentations should focus on key risks, significant findings, and management responses.',
    topic: 'Audit Reporting',
    subtopic: 'Committee Reporting'
  },
  {
    id: 'cisa1-138',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Continuous auditing techniques:',
    options: [
      'Replace periodic audits',
      'Enable ongoing monitoring and more timely identification of issues',
      'Require no human oversight',
      'Are only for financial audits'
    ],
    correctAnswer: 1,
    explanation: 'Continuous auditing enables ongoing monitoring and earlier identification of control issues.',
    topic: 'Continuous Auditing',
    subtopic: 'Ongoing Monitoring'
  },
  {
    id: 'cisa1-139',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Automated audit tools should be:',
    options: [
      'Used without validation',
      'Validated for accuracy and appropriateness for the audit objective',
      'Eliminated to reduce risk',
      'Used only by IT auditors'
    ],
    correctAnswer: 1,
    explanation: 'Automated tools should be validated to ensure accuracy and appropriateness for audit objectives.',
    topic: 'Audit Tools',
    subtopic: 'Tool Validation'
  },
  {
    id: 'cisa1-140',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit evidence relevance means:',
    options: [
      'Any information is acceptable',
      'Evidence relates directly to the audit objective',
      'More is always better',
      'Only recent evidence counts'
    ],
    correctAnswer: 1,
    explanation: 'Relevant evidence directly relates to and supports conclusions about the specific audit objective.',
    topic: 'Audit Evidence',
    subtopic: 'Relevance'
  },
  {
    id: 'cisa1-141',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When the auditor encounters management obstruction:',
    options: [
      'Abandon the audit',
      'Document the obstruction and escalate appropriately',
      'Work around it',
      'Accept limited scope'
    ],
    correctAnswer: 1,
    explanation: 'Obstruction should be documented and escalated to appropriate levels including audit committee if necessary.',
    topic: 'Audit Conduct',
    subtopic: 'Obstruction'
  },
  {
    id: 'cisa1-142',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Audit resource allocation should prioritize:',
    options: [
      'Equal time for all areas',
      'Higher risk areas with greater potential impact',
      'Management preferences',
      'Areas with prior findings'
    ],
    correctAnswer: 1,
    explanation: 'Resources should be allocated based on risk, with more effort on higher-risk areas.',
    topic: 'Audit Planning',
    subtopic: 'Resource Allocation'
  },
  {
    id: 'cisa1-143',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Cross-referencing in audit workpapers:',
    options: [
      'Is optional',
      'Links evidence to conclusions and supports report assertions',
      'Creates redundancy',
      'Is only for complex audits'
    ],
    correctAnswer: 1,
    explanation: 'Cross-referencing links evidence to conclusions, supporting reviewability and report assertions.',
    topic: 'Audit Documentation',
    subtopic: 'Cross-Referencing'
  },
  {
    id: 'cisa1-144',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Audit universe maintenance should:',
    options: [
      'Be static year to year',
      'Reflect organizational changes and emerging risks',
      'Only include IT systems',
      'Exclude cloud services'
    ],
    correctAnswer: 1,
    explanation: 'The audit universe should be updated to reflect organizational changes, new systems, and emerging risks.',
    topic: 'Audit Planning',
    subtopic: 'Audit Universe'
  },
  {
    id: 'cisa1-145',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit risk assessment should consider:',
    options: [
      'Only inherent risk',
      'Inherent risk, control risk, and detection risk',
      'Only control risk',
      'Only detection risk'
    ],
    correctAnswer: 1,
    explanation: 'Audit risk considers inherent risk, control risk, and detection risk to determine appropriate procedures.',
    topic: 'Risk Assessment',
    subtopic: 'Audit Risk'
  },
  {
    id: 'cisa1-146',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Audit issue aging reports help:',
    options: [
      'Only track dates',
      'Identify overdue remediation and enable escalation',
      'Calculate fines',
      'Determine audit frequency'
    ],
    correctAnswer: 1,
    explanation: 'Aging reports identify overdue items, enabling appropriate escalation and management attention.',
    topic: 'Audit Follow-up',
    subtopic: 'Issue Aging'
  },
  {
    id: 'cisa1-147',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The auditor\'s opinion should be:',
    options: [
      'Always positive',
      'Supported by sufficient appropriate evidence',
      'Based on management views',
      'Identical to prior audits'
    ],
    correctAnswer: 1,
    explanation: 'Audit opinions must be supported by sufficient appropriate evidence gathered during the audit.',
    topic: 'Audit Reporting',
    subtopic: 'Audit Opinion'
  },
  {
    id: 'cisa1-148',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit team briefings should cover:',
    options: [
      'Only audit objectives',
      'Background, objectives, risks, approach, and timeline',
      'Only timeline',
      'Only prior findings'
    ],
    correctAnswer: 1,
    explanation: 'Team briefings should cover background, objectives, key risks, audit approach, and timeline.',
    topic: 'Audit Execution',
    subtopic: 'Team Briefings'
  },
  {
    id: 'cisa1-149',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Walkthroughs as an audit technique:',
    options: [
      'Replace all testing',
      'Help understand processes and identify control points',
      'Are only for initial audits',
      'Are not evidence'
    ],
    correctAnswer: 1,
    explanation: 'Walkthroughs help auditors understand processes, identify controls, and verify process documentation.',
    topic: 'Audit Techniques',
    subtopic: 'Walkthroughs'
  },
  {
    id: 'cisa1-150',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Inquiry alone as audit evidence:',
    options: [
      'Is sufficient for all conclusions',
      'Should be corroborated with other evidence types',
      'Is the most reliable',
      'Replaces observation'
    ],
    correctAnswer: 1,
    explanation: 'Inquiry should be corroborated with other evidence types for reliable conclusions.',
    topic: 'Audit Evidence',
    subtopic: 'Inquiry Corroboration'
  },
  {
    id: 'cisa1-151',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Professional skepticism requires auditors to:',
    options: [
      'Trust all management representations',
      'Critically assess evidence and remain alert for misrepresentation',
      'Assume fraud exists',
      'Question only financial data'
    ],
    correctAnswer: 1,
    explanation: 'Professional skepticism means critically assessing evidence and remaining alert to potential misrepresentation.',
    topic: 'Professional Standards',
    subtopic: 'Skepticism'
  },
  {
    id: 'cisa1-152',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit work program modifications:',
    options: [
      'Are not allowed',
      'Should be documented with justification',
      'Do not require approval',
      'Indicate poor planning'
    ],
    correctAnswer: 1,
    explanation: 'Program modifications may be necessary and should be documented with appropriate justification.',
    topic: 'Audit Execution',
    subtopic: 'Program Modifications'
  },
];

export default CISA1_QUESTIONS_BATCH6;
