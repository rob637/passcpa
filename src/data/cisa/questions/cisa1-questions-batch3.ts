/**
 * CISA Domain 1: Information Systems Auditing Process
 * Batch 3 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA1_QUESTIONS_BATCH3: Question[] = [
  {
    id: 'CISA1-033',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When an IS auditor discovers fraud during an audit, the FIRST action should be to:',
    options: [
      'Confront the suspected individual',
      'Inform appropriate management and determine next steps',
      'Complete the audit without disclosure',
      'Contact law enforcement immediately'
    ],
    correctAnswer: 1,
    explanation: 'When fraud is discovered, the auditor should inform appropriate management to determine next steps, as the organization must decide how to proceed with investigation.',
    topic: 'Fraud',
    subtopic: 'Fraud Response'
  },
  {
    id: 'CISA1-034',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'The PRIMARY purpose of an audit trail is to:',
    options: [
      'Improve system performance',
      'Provide accountability and enable reconstruction of events',
      'Reduce storage requirements',
      'Speed up processing'
    ],
    correctAnswer: 1,
    explanation: 'Audit trails provide accountability by recording who did what and when, enabling reconstruction of events for investigation or compliance purposes.',
    topic: 'Audit Trail',
    subtopic: 'Purpose'
  },
  {
    id: 'CISA1-035',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Which type of audit opinion indicates material departures from standards?',
    options: [
      'Unqualified opinion',
      'Qualified opinion',
      'Unmodified opinion',
      'Clean opinion'
    ],
    correctAnswer: 1,
    explanation: 'A qualified opinion indicates material departures from standards or scope limitations, but the overall financial statements are fairly presented.',
    topic: 'Audit Reporting',
    subtopic: 'Audit Opinions'
  },
  {
    id: 'CISA1-036',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'An adverse audit opinion is issued when:',
    options: [
      'Minor issues exist',
      'Material misstatements are pervasive',
      'The auditor cannot obtain evidence',
      'Controls are adequate'
    ],
    correctAnswer: 1,
    explanation: 'An adverse opinion is issued when material misstatements are so pervasive that the financial statements as a whole are not fairly presented.',
    topic: 'Audit Reporting',
    subtopic: 'Adverse Opinion'
  },
  {
    id: 'CISA1-037',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Continuous auditing provides:',
    options: [
      'Less frequent audits',
      'Real-time or near real-time assurance',
      'Reduced audit coverage',
      'Annual assessments only'
    ],
    correctAnswer: 1,
    explanation: 'Continuous auditing uses automated tools to provide real-time or near real-time assurance on controls and transactions.',
    topic: 'Audit Techniques',
    subtopic: 'Continuous Auditing'
  },
  {
    id: 'CISA1-038',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Integrated test facility (ITF) involves:',
    options: [
      'Testing in a separate environment',
      'Embedding test data in live production systems',
      'Manual testing only',
      'Testing only historical data'
    ],
    correctAnswer: 1,
    explanation: 'ITF creates a fictitious entity within the production system to process test transactions alongside live data, testing actual processing.',
    topic: 'Audit Techniques',
    subtopic: 'ITF'
  },
  {
    id: 'CISA1-039',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Parallel simulation involves:',
    options: [
      'Running two systems simultaneously',
      'Using auditor-controlled software to reprocess data',
      'Testing backup systems',
      'Comparing two vendors'
    ],
    correctAnswer: 1,
    explanation: 'Parallel simulation uses auditor-controlled software to reprocess actual data and compare results to production output, verifying processing accuracy.',
    topic: 'Audit Techniques',
    subtopic: 'Parallel Simulation'
  },
  {
    id: 'CISA1-040',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Snapshot technique captures:',
    options: [
      'Only error transactions',
      'Selected transactions at key processing points',
      'All transactions continuously',
      'Only completed transactions'
    ],
    correctAnswer: 1,
    explanation: 'Snapshot technique captures selected transactions at predetermined points during processing to verify that intermediate steps are performed correctly.',
    topic: 'Audit Techniques',
    subtopic: 'Snapshot'
  },
  {
    id: 'CISA1-041',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'When planning an audit of a service organization, an IS auditor should:',
    options: [
      'Ignore the service organization',
      'Obtain and review the SOC report',
      'Audit only internal systems',
      'Assume controls are adequate'
    ],
    correctAnswer: 1,
    explanation: 'When auditing organizations using service providers, the auditor should obtain and review SOC reports to understand controls at the service organization.',
    topic: 'Service Organizations',
    subtopic: 'SOC Reports'
  },
  {
    id: 'CISA1-042',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'SOC 1 reports focus on:',
    options: [
      'Security and availability',
      'Controls relevant to financial reporting',
      'All operational controls',
      'Privacy controls only'
    ],
    correctAnswer: 1,
    explanation: 'SOC 1 reports focus on controls at a service organization that are relevant to user entities\' internal control over financial reporting.',
    topic: 'Service Organizations',
    subtopic: 'SOC 1'
  },
  {
    id: 'CISA1-043',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'SOC 2 reports address:',
    options: [
      'Financial statement controls only',
      'Trust Services Criteria (security, availability, processing integrity, confidentiality, privacy)',
      'Only availability',
      'Only security'
    ],
    correctAnswer: 1,
    explanation: 'SOC 2 reports address controls related to the Trust Services Criteria: security, availability, processing integrity, confidentiality, and privacy.',
    topic: 'Service Organizations',
    subtopic: 'SOC 2'
  },
  {
    id: 'CISA1-044',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Type II SOC reports differ from Type I in that they:',
    options: [
      'Are shorter',
      'Cover design and operating effectiveness over a period',
      'Cover only control design',
      'Are less detailed'
    ],
    correctAnswer: 1,
    explanation: 'Type II reports cover both control design and operating effectiveness over a period of time, while Type I covers only design at a point in time.',
    topic: 'Service Organizations',
    subtopic: 'SOC Report Types'
  },
  {
    id: 'CISA1-045',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When evaluating IT general controls, an IS auditor should focus on:',
    options: [
      'Individual transaction controls',
      'Controls over IT environment, change management, access, and operations',
      'Business process controls',
      'Financial controls only'
    ],
    correctAnswer: 1,
    explanation: 'IT general controls cover the IT environment, including change management, logical access, computer operations, and program development.',
    topic: 'IT Controls',
    subtopic: 'IT General Controls'
  },
  {
    id: 'CISA1-046',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Application controls are designed to ensure:',
    options: [
      'IT infrastructure reliability',
      'Completeness, accuracy, and authorization of transactions',
      'Physical security',
      'Network performance'
    ],
    correctAnswer: 1,
    explanation: 'Application controls ensure that transactions are complete, accurate, authorized, and properly processed within specific applications.',
    topic: 'IT Controls',
    subtopic: 'Application Controls'
  },
  {
    id: 'CISA1-047',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Input controls verify:',
    options: [
      'Output accuracy',
      'Data is accurate, complete, and authorized before processing',
      'Processing speed',
      'Storage capacity'
    ],
    correctAnswer: 1,
    explanation: 'Input controls verify that data entering a system is accurate, complete, and authorized, preventing garbage-in-garbage-out scenarios.',
    topic: 'Application Controls',
    subtopic: 'Input Controls'
  },
  {
    id: 'CISA1-048',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Processing controls ensure:',
    options: [
      'Input accuracy',
      'Data is processed correctly according to specifications',
      'Output distribution',
      'User training'
    ],
    correctAnswer: 1,
    explanation: 'Processing controls ensure that data is processed correctly and completely according to program specifications and business rules.',
    topic: 'Application Controls',
    subtopic: 'Processing Controls'
  },
  {
    id: 'CISA1-049',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Hash totals are used to:',
    options: [
      'Encrypt data',
      'Detect unauthorized changes or loss of records',
      'Speed processing',
      'Compress data'
    ],
    correctAnswer: 1,
    explanation: 'Hash totals (sums of non-financial fields like account numbers) detect unauthorized changes or loss of records during transmission or processing.',
    topic: 'Application Controls',
    subtopic: 'Hash Totals'
  },
  {
    id: 'CISA1-050',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Limit checks verify that:',
    options: [
      'All fields are completed',
      'Values fall within acceptable ranges',
      'Data is numeric',
      'Records are unique'
    ],
    correctAnswer: 1,
    explanation: 'Limit checks (range checks) verify that entered values fall within predefined acceptable limits, catching unreasonable entries.',
    topic: 'Application Controls',
    subtopic: 'Validation Controls'
  },
  {
    id: 'CISA1-051',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Check digits detect errors in:',
    options: [
      'Amounts',
      'Identification numbers like account numbers',
      'Dates',
      'Names'
    ],
    correctAnswer: 1,
    explanation: 'Check digits are computed values added to identification numbers that detect transposition or transcription errors in data entry.',
    topic: 'Application Controls',
    subtopic: 'Check Digits'
  },
  {
    id: 'CISA1-052',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'The MOST reliable audit evidence is obtained from:',
    options: [
      'Inquiry of auditee personnel',
      'Direct observation and independent confirmation',
      'Management representations',
      'Prior year audit results'
    ],
    correctAnswer: 1,
    explanation: 'Direct observation and independent external confirmation provide the most reliable evidence because they are not dependent on auditee statements.',
    topic: 'Audit Evidence',
    subtopic: 'Evidence Reliability'
  },
  {
    id: 'CISA1-053',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Audit working papers should be:',
    options: [
      'Discarded after the audit',
      'Retained according to policy and protected appropriately',
      'Shared publicly',
      'Given to the auditee'
    ],
    correctAnswer: 1,
    explanation: 'Working papers should be retained according to organizational policy and regulatory requirements, and protected to maintain confidentiality.',
    topic: 'Audit Documentation',
    subtopic: 'Working Papers'
  },
  {
    id: 'CISA1-054',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Materiality in IS auditing considers:',
    options: [
      'Only financial amounts',
      'Quantitative and qualitative factors affecting significance',
      'Only technical issues',
      'Audit budget only'
    ],
    correctAnswer: 1,
    explanation: 'Materiality considers both quantitative (financial impact) and qualitative factors (regulatory, reputational) when determining significance.',
    topic: 'Audit Planning',
    subtopic: 'Materiality'
  },
  {
    id: 'CISA1-055',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Inherent risk represents the risk that:',
    options: [
      'Controls will fail',
      'Errors exist before considering controls',
      'Auditor will miss errors',
      'Management will override controls'
    ],
    correctAnswer: 1,
    explanation: 'Inherent risk is the susceptibility of an area to material misstatement before considering internal controls. It exists due to the nature of the process.',
    topic: 'Risk Assessment',
    subtopic: 'Inherent Risk'
  },
  {
    id: 'CISA1-056',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Control risk represents the risk that:',
    options: [
      'Controls will prevent errors',
      'Controls will not prevent or detect material misstatements',
      'Errors do not exist',
      'Auditors detect all errors'
    ],
    correctAnswer: 1,
    explanation: 'Control risk is the risk that internal controls will not prevent or detect material misstatements in a timely manner.',
    topic: 'Risk Assessment',
    subtopic: 'Control Risk'
  },
  {
    id: 'CISA1-057',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Detection risk is the risk that:',
    options: [
      'Controls will fail',
      'Audit procedures will not detect material misstatements',
      'Errors exist',
      'Management commits fraud'
    ],
    correctAnswer: 1,
    explanation: 'Detection risk is the risk that the auditor\'s procedures will not detect material misstatements that exist in assertions.',
    topic: 'Risk Assessment',
    subtopic: 'Detection Risk'
  },
  {
    id: 'CISA1-058',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'An IS auditor\'s competence is demonstrated through:',
    options: [
      'Length of employment',
      'Professional certifications, education, and experience',
      'Management position',
      'Number of audits performed'
    ],
    correctAnswer: 1,
    explanation: 'Auditor competence is demonstrated through professional certifications (CISA), relevant education, technical training, and practical experience.',
    topic: 'Professional Standards',
    subtopic: 'Competence'
  },
  {
    id: 'CISA1-059',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Professional skepticism requires an auditor to:',
    options: [
      'Trust all management statements',
      'Question assumptions and critically evaluate evidence',
      'Assume fraud exists',
      'Accept prior year conclusions'
    ],
    correctAnswer: 1,
    explanation: 'Professional skepticism means questioning assumptions, critically evaluating evidence, and maintaining an attitude of doubt without assuming dishonesty.',
    topic: 'Professional Standards',
    subtopic: 'Skepticism'
  },
  {
    id: 'CISA1-060',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Quality assurance for the audit function should include:',
    options: [
      'Only supervisory review',
      'Internal reviews and external quality assessments',
      'Only external assessments',
      'Review by the auditee'
    ],
    correctAnswer: 1,
    explanation: 'Quality assurance should include ongoing internal reviews of audit work and periodic external quality assessments as required by standards.',
    topic: 'Professional Standards',
    subtopic: 'Quality Assurance'
  },
  {
    id: 'CISA1-061',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'The PRIMARY reason for documenting audit procedures is to:',
    options: [
      'Satisfy regulatory requirements',
      'Provide evidence of work performed and support conclusions',
      'Create work for staff',
      'Impress management'
    ],
    correctAnswer: 1,
    explanation: 'Documentation provides evidence that procedures were performed appropriately and supports the conclusions reached in the audit report.',
    topic: 'Audit Documentation',
    subtopic: 'Purpose'
  },
  {
    id: 'CISA1-062',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Audit follow-up ensures that:',
    options: [
      'Audits are completed on time',
      'Management has implemented corrective actions',
      'Staff are properly trained',
      'Reports are distributed'
    ],
    correctAnswer: 1,
    explanation: 'Audit follow-up verifies that management has implemented corrective actions in response to audit findings within agreed timeframes.',
    topic: 'Audit Process',
    subtopic: 'Follow-up'
  },
];

export default CISA1_QUESTIONS_BATCH3;
