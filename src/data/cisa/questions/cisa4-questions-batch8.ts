/**
 * CISA Domain 4: IS Operations and Business Resilience
 * Batch 8 - 30 Additional MCQs
 * Advanced exam-style questions
 */

import { Question } from '../../../types';

export const CISA4_QUESTIONS_BATCH8: Question[] = [
  {
    id: 'CISA4-173',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'The MOST important factor when determining RTO for a critical business process is:',
    options: [
      'Technology recovery capability',
      'Maximum tolerable downtime before unacceptable business impact',
      'Available IT budget',
      'Vendor support response time'
    ],
    correctAnswer: 1,
    explanation: 'RTO should be based on the maximum tolerable downtime before the business impact becomes unacceptable.',
    topic: 'Business Continuity',
    subtopic: 'RTO Determination'
  },
  {
    id: 'CISA4-174',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Hot site is characterized by:',
    options: [
      'Empty facility with power and cooling',
      'Fully equipped and operational recovery site',
      'Mobile recovery trailer',
      'Cloud-only backup'
    ],
    correctAnswer: 1,
    explanation: 'A hot site is a fully equipped and operational recovery site that can assume operations quickly.',
    topic: 'Disaster Recovery',
    subtopic: 'Recovery Sites'
  },
  {
    id: 'CISA4-175',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'An IS auditor discovers that DR tests are performed annually. The auditor should be MOST concerned if:',
    options: [
      'Tests are scheduled in advance',
      'All critical systems are not included in testing',
      'External vendors participate',
      'Test results are documented'
    ],
    correctAnswer: 1,
    explanation: 'If critical systems are excluded from DR testing, there is no assurance they can be recovered when needed.',
    topic: 'Disaster Recovery',
    subtopic: 'DR Testing'
  },
  {
    id: 'CISA4-176',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Incident response procedures should include:',
    options: [
      'Only technical team contacts',
      'Detection, containment, eradication, recovery, and lessons learned',
      'Automatic resolution without investigation',
      'External reporting only for major breaches'
    ],
    correctAnswer: 1,
    explanation: 'Incident response should follow a structured process including detection, containment, eradication, recovery, and lessons learned.',
    topic: 'Incident Management',
    subtopic: 'Incident Response Process'
  },
  {
    id: 'CISA4-177',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'When evaluating backup procedures, the IS auditor should be MOST concerned if:',
    options: [
      'Backups are encrypted',
      'Backup restoration is never tested',
      'Backups are stored offsite',
      'Different media types are used'
    ],
    correctAnswer: 1,
    explanation: 'If restoration is never tested, there is no assurance that backups can actually be restored when needed.',
    topic: 'Data Management',
    subtopic: 'Backup Verification'
  },
  {
    id: 'CISA4-178',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Change management should ensure all changes are:',
    options: [
      'Approved by developers only',
      'Requested, analyzed, approved, tested, and documented',
      'Implemented immediately without testing',
      'Limited to emergency situations'
    ],
    correctAnswer: 1,
    explanation: 'Change management ensures changes are properly requested, analyzed, approved, tested, and documented.',
    topic: 'Change Management',
    subtopic: 'Change Control'
  },
  {
    id: 'CISA4-179',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'An organization uses a third party for IT operations. The PRIMARY control to ensure data protection is:',
    options: [
      'Vendor reputation',
      'Contractual provisions with security requirements and right-to-audit',
      'Cost negotiations',
      'Reference calls'
    ],
    correctAnswer: 1,
    explanation: 'Contractual provisions establish enforceable security requirements and audit rights for third-party operations.',
    topic: 'Third-Party Management',
    subtopic: 'Contractual Controls'
  },
  {
    id: 'CISA4-180',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Problem management differs from incident management in that problem management:',
    options: [
      'Focuses on immediate service restoration',
      'Investigates root causes to prevent recurrence',
      'Handles only major incidents',
      'Is performed by help desk only'
    ],
    correctAnswer: 1,
    explanation: 'Problem management focuses on identifying root causes and implementing solutions to prevent incident recurrence.',
    topic: 'Service Management',
    subtopic: 'Problem Management'
  },
  {
    id: 'CISA4-181',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'The GREATEST risk with database replication for disaster recovery is:',
    options: [
      'Network bandwidth requirements',
      'Corrupted data being replicated to the recovery site',
      'Hardware costs',
      'Configuration complexity'
    ],
    correctAnswer: 1,
    explanation: 'Replication can propagate corrupted or erroneous data to the recovery site, making both sites unusable.',
    topic: 'Disaster Recovery',
    subtopic: 'Data Replication Risks'
  },
  {
    id: 'CISA4-182',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Capacity management should ensure:',
    options: [
      'Maximum utilization at all times',
      'Resources are available to meet current and future demands',
      'Minimum hardware purchases',
      'Reduced IT headcount'
    ],
    correctAnswer: 1,
    explanation: 'Capacity management ensures resources are adequate for current and anticipated future demands.',
    topic: 'Service Management',
    subtopic: 'Capacity Management'
  },
  {
    id: 'CISA4-183',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'When reviewing network operations, the IS auditor should be MOST concerned if:',
    options: [
      'Network diagrams are maintained',
      'Network monitoring alerts are not reviewed or actioned',
      'Redundant links exist',
      'Traffic is encrypted'
    ],
    correctAnswer: 1,
    explanation: 'Unreviewed alerts mean security and availability issues may not be detected or addressed timely.',
    topic: 'Network Operations',
    subtopic: 'Monitoring'
  },
  {
    id: 'CISA4-184',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'The purpose of a business impact analysis (BIA) is to:',
    options: [
      'Select disaster recovery technology',
      'Identify critical processes and the impact of disruption',
      'Create backup schedules',
      'Test disaster recovery plans'
    ],
    correctAnswer: 1,
    explanation: 'A BIA identifies critical business processes and assesses the impact of their disruption over time.',
    topic: 'Business Continuity',
    subtopic: 'BIA Purpose'
  },
  {
    id: 'CISA4-185',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'An organization relies heavily on one cloud provider. The PRIMARY risk is:',
    options: [
      'Reduced costs',
      'Vendor lock-in and concentration risk',
      'Simplified management',
      'Better integration'
    ],
    correctAnswer: 1,
    explanation: 'Single cloud dependency creates vendor lock-in and concentration risk if the provider experiences issues.',
    topic: 'Cloud Operations',
    subtopic: 'Vendor Concentration'
  },
  {
    id: 'CISA4-186',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Scheduled maintenance windows should be:',
    options: [
      'Avoided entirely',
      'Planned with business stakeholders and communicated in advance',
      'Performed without notice to test resilience',
      'Limited to overnight hours only'
    ],
    correctAnswer: 1,
    explanation: 'Maintenance windows should be planned with business input and communicated to minimize impact.',
    topic: 'Operations Management',
    subtopic: 'Maintenance Planning'
  },
  {
    id: 'CISA4-187',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'The IS auditor discovers that the organization has no plan to recover from ransomware. This indicates:',
    options: [
      'Adequate reliance on prevention controls',
      'Insufficient cyber resilience planning',
      'Confidence in existing backups',
      'Low ransomware risk'
    ],
    correctAnswer: 1,
    explanation: 'Lack of ransomware recovery planning indicates insufficient cyber resilience given the prevalence of ransomware threats.',
    topic: 'Cyber Resilience',
    subtopic: 'Ransomware Planning'
  },
  {
    id: 'CISA4-188',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'SLA monitoring should include:',
    options: [
      'Only annual reviews',
      'Regular measurement and reporting against defined metrics',
      'Informal discussions with vendors',
      'Customer satisfaction surveys only'
    ],
    correctAnswer: 1,
    explanation: 'SLA monitoring requires regular measurement and reporting against defined service level metrics.',
    topic: 'Service Management',
    subtopic: 'SLA Monitoring'
  },
  {
    id: 'CISA4-189',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'When evaluating job scheduling, the IS auditor should verify that:',
    options: [
      'Jobs are scheduled manually',
      'Failed jobs are detected, logged, and resolved with appropriate escalation',
      'All jobs run overnight',
      'Job schedules are not documented'
    ],
    correctAnswer: 1,
    explanation: 'Job scheduling control includes detection, logging, and resolution of failed jobs with appropriate escalation.',
    topic: 'Operations Management',
    subtopic: 'Job Scheduling'
  },
  {
    id: 'CISA4-190',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'The 3-2-1 backup rule recommends:',
    options: [
      'Three copies on two media with one offsite',
      'Three backup jobs daily',
      'Two-year retention minimum',
      'One backup server per department'
    ],
    correctAnswer: 0,
    explanation: 'The 3-2-1 rule: three copies of data on two different media types with one copy offsite.',
    topic: 'Data Management',
    subtopic: 'Backup Strategy'
  },
  {
    id: 'CISA4-191',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'An IS auditor notes that the BCP was last reviewed two years ago. The MAIN concern is:',
    options: [
      'Reduced staff training',
      'The plan may not reflect current business processes and technology',
      'Increased documentation burden',
      'Budget constraints'
    ],
    correctAnswer: 1,
    explanation: 'BCPs must be regularly reviewed to reflect current business processes, technology, and organizational changes.',
    topic: 'Business Continuity',
    subtopic: 'BCP Maintenance'
  },
  {
    id: 'CISA4-192',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'End-of-life (EOL) software should be:',
    options: [
      'Continued without concern',
      'Identified, risk assessed, and addressed through upgrade or compensating controls',
      'Immediately removed from production',
      'Ignored until budget is available'
    ],
    correctAnswer: 1,
    explanation: 'EOL software should be identified, risk assessed, and addressed through upgrade, replacement, or compensating controls.',
    topic: 'Asset Management',
    subtopic: 'End-of-Life Management'
  },
  {
    id: 'CISA4-193',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Crisis communication during an incident should:',
    options: [
      'Be delayed until full resolution',
      'Be coordinated through designated spokespersons with consistent messaging',
      'Include all technical details',
      'Be handled by whoever is available'
    ],
    correctAnswer: 1,
    explanation: 'Crisis communication requires designated spokespersons with consistent, appropriate messaging.',
    topic: 'Incident Management',
    subtopic: 'Crisis Communication'
  },
  {
    id: 'CISA4-194',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Help desk performance should be measured by:',
    options: [
      'Number of tickets created',
      'Resolution time, first-call resolution rate, and customer satisfaction',
      'Number of staff employed',
      'Hours of operation only'
    ],
    correctAnswer: 1,
    explanation: 'Help desk metrics should include resolution time, first-call resolution rate, and customer satisfaction.',
    topic: 'Service Management',
    subtopic: 'Help Desk Metrics'
  },
  {
    id: 'CISA4-195',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'When assessing data center physical security, the IS auditor should be MOST concerned if:',
    options: [
      'Visitors are logged and escorted',
      'Former employees still have active access badges',
      'Access requires badge and PIN',
      'Cameras record entry points'
    ],
    correctAnswer: 1,
    explanation: 'Former employees with active access creates immediate unauthorized access risk.',
    topic: 'Physical Security',
    subtopic: 'Access Control'
  },
  {
    id: 'CISA4-196',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'The purpose of configuration item (CI) records is to:',
    options: [
      'Track software licenses only',
      'Maintain accurate information about IT assets and their relationships',
      'Document user requests',
      'Store backup media location'
    ],
    correctAnswer: 1,
    explanation: 'CI records maintain accurate information about IT assets, configurations, and their relationships.',
    topic: 'Configuration Management',
    subtopic: 'CMDB'
  },
  {
    id: 'CISA4-197',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'An organization has RPO of 4 hours. This means:',
    options: [
      'Systems must be recovered within 4 hours',
      'Maximum 4 hours of data loss is acceptable',
      'Backups run every 4 hours',
      'Incidents must be resolved in 4 hours'
    ],
    correctAnswer: 1,
    explanation: 'RPO (Recovery Point Objective) defines the maximum acceptable data loss, measured in time.',
    topic: 'Business Continuity',
    subtopic: 'RPO'
  },
  {
    id: 'CISA4-198',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Operations runbooks should include:',
    options: [
      'Only emergency procedures',
      'Step-by-step procedures for routine and exception handling',
      'Developer notes',
      'Financial information'
    ],
    correctAnswer: 1,
    explanation: 'Runbooks document step-by-step procedures for routine operations and exception handling.',
    topic: 'Operations Management',
    subtopic: 'Runbooks'
  },
  {
    id: 'CISA4-199',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'When cloud services are used for disaster recovery, the IS auditor should verify:',
    options: [
      'Cloud costs are minimized',
      'Recovery procedures are tested and data can be accessed as needed',
      'Cloud provider has more data centers',
      'Cloud subscription is annual'
    ],
    correctAnswer: 1,
    explanation: 'Cloud-based DR must be tested to verify recoverability and data accessibility.',
    topic: 'Cloud Operations',
    subtopic: 'Cloud DR'
  },
  {
    id: 'CISA4-200',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Batch processing controls should include:',
    options: [
      'Real-time validation only',
      'Input/output reconciliation and completeness checks',
      'Manual verification of each record',
      'User presence during processing'
    ],
    correctAnswer: 1,
    explanation: 'Batch controls include reconciliation of input to output and completeness checks.',
    topic: 'Operations Controls',
    subtopic: 'Batch Controls'
  },
  {
    id: 'CISA4-201',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Environmental controls for data centers should include:',
    options: [
      'Windows for natural lighting',
      'Temperature monitoring, fire suppression, and water detection',
      'Minimal redundancy to reduce costs',
      'Open access for maintenance'
    ],
    correctAnswer: 1,
    explanation: 'Environmental controls protect against temperature, fire, and water threats to equipment.',
    topic: 'Physical Security',
    subtopic: 'Environmental Controls'
  },
  {
    id: 'CISA4-202',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Incident lessons learned should:',
    options: [
      'Be kept confidential from all staff',
      'Be used to improve processes and prevent similar incidents',
      'Focus only on blame assignment',
      'Be documented and filed without action'
    ],
    correctAnswer: 1,
    explanation: 'Lessons learned should drive process improvements to prevent recurrence of similar incidents.',
    topic: 'Incident Management',
    subtopic: 'Lessons Learned'
  }
];
