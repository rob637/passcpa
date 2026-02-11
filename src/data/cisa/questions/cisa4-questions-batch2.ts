/**
 * CISA Domain 4: Information Systems Operations and Business Resilience
 * Batch 2 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA4_QUESTIONS_BATCH2: Question[] = [
  {
    id: 'CISA4-003',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'The PRIMARY purpose of IT operations management is to:',
    options: [
      'Develop new applications',
      'Ensure reliable delivery of IT services',
      'Reduce IT staff',
      'Approve IT projects'
    ],
    correctAnswer: 1,
    explanation: 'IT operations management ensures reliable, consistent delivery of IT services that meet business requirements and service level agreements.',
    topic: 'IT Operations',
    subtopic: 'Operations Management'
  },
  {
    id: 'CISA4-004',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Job scheduling controls are important to ensure:',
    options: [
      'Staff are properly trained',
      'Batch processes run in the correct sequence',
      'Hardware is up to date',
      'Users have proper access'
    ],
    correctAnswer: 1,
    explanation: 'Job scheduling controls ensure batch processes run in the correct sequence, at appropriate times, with proper dependencies maintained.',
    topic: 'IT Operations',
    subtopic: 'Job Scheduling'
  },
  {
    id: 'CISA4-005',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'When reviewing data center operations, an IS auditor should be MOST concerned if:',
    options: [
      'Operators follow documented procedures',
      'Console logs are reviewed regularly',
      'Operators have unlimited system access',
      'Backup schedules are automated'
    ],
    correctAnswer: 2,
    explanation: 'Operators with unlimited system access can bypass controls and make unauthorized changes. Access should be limited to what is necessary for operations.',
    topic: 'Data Center',
    subtopic: 'Access Control'
  },
  {
    id: 'CISA4-006',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Problem management differs from incident management in that it:',
    options: [
      'Focuses on quick restoration of service',
      'Identifies and addresses root causes',
      'Only involves operations staff',
      'Does not require documentation'
    ],
    correctAnswer: 1,
    explanation: 'Problem management focuses on identifying root causes and preventing recurrence, while incident management focuses on quick service restoration.',
    topic: 'IT Service Management',
    subtopic: 'Problem Management'
  },
  {
    id: 'CISA4-007',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Incident management primarily aims to:',
    options: [
      'Identify root causes',
      'Restore normal service operation as quickly as possible',
      'Prevent all future incidents',
      'Implement permanent solutions'
    ],
    correctAnswer: 1,
    explanation: 'Incident management aims to restore normal service operation as quickly as possible, minimizing impact on business operations.',
    topic: 'IT Service Management',
    subtopic: 'Incident Management'
  },
  {
    id: 'CISA4-008',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'The PRIMARY purpose of capacity management is to:',
    options: [
      'Reduce costs',
      'Ensure IT resources meet current and future needs',
      'Limit user access',
      'Document system configurations'
    ],
    correctAnswer: 1,
    explanation: 'Capacity management ensures IT infrastructure has adequate capacity to meet current demands and planned future growth.',
    topic: 'IT Operations',
    subtopic: 'Capacity Management'
  },
  {
    id: 'CISA4-009',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Monitoring of system resources is important because it:',
    options: [
      'Replaces the need for backups',
      'Enables proactive identification of potential issues',
      'Eliminates security threats',
      'Reduces documentation requirements'
    ],
    correctAnswer: 1,
    explanation: 'Resource monitoring enables proactive identification of potential issues before they impact service, allowing preventive action.',
    topic: 'IT Operations',
    subtopic: 'Monitoring'
  },
  {
    id: 'CISA4-010',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'The purpose of a help desk is to:',
    options: [
      'Develop applications',
      'Provide single point of contact for user support',
      'Manage IT projects',
      'Perform security audits'
    ],
    correctAnswer: 1,
    explanation: 'The help desk provides a single point of contact for users to report issues, request services, and receive support.',
    topic: 'IT Service Management',
    subtopic: 'Service Desk'
  },
  {
    id: 'CISA4-011',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Backup types that only copy data changed since the last full backup are called:',
    options: [
      'Full backups',
      'Incremental or differential backups',
      'Mirror backups',
      'Archive backups'
    ],
    correctAnswer: 1,
    explanation: 'Incremental and differential backups only copy data changed since the last full backup (differential) or last backup of any type (incremental), reducing backup time.',
    topic: 'Data Management',
    subtopic: 'Backup Types'
  },
  {
    id: 'CISA4-012',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'The MOST important factor when storing backup media offsite is:',
    options: [
      'Cost of the storage facility',
      'Environmental protection and accessibility',
      'Distance from the primary data center',
      'Size of the storage area'
    ],
    correctAnswer: 1,
    explanation: 'Offsite storage must provide environmental protection (temperature, humidity, fire protection) and timely accessibility to meet recovery objectives.',
    topic: 'Data Management',
    subtopic: 'Offsite Storage'
  },
  {
    id: 'CISA4-013',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Backup testing should verify that:',
    options: [
      'Backups complete on schedule',
      'Data can be successfully restored',
      'Backup media is inexpensive',
      'Backups are automated'
    ],
    correctAnswer: 1,
    explanation: 'Backup testing must verify that data can be successfully restored. A backup that cannot be restored is useless for recovery purposes.',
    topic: 'Data Management',
    subtopic: 'Backup Testing'
  },
  {
    id: 'CISA4-014',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Data retention policies should be based on:',
    options: [
      'Available storage capacity',
      'Legal, regulatory, and business requirements',
      'IT preferences',
      'Backup software capabilities'
    ],
    correctAnswer: 1,
    explanation: 'Data retention policies must consider legal, regulatory, and business requirements to ensure data is kept long enough but not longer than necessary.',
    topic: 'Data Management',
    subtopic: 'Data Retention'
  },
  {
    id: 'CISA4-015',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Environmental controls in a data center include:',
    options: [
      'Only fire suppression',
      'HVAC, fire suppression, and humidity control',
      'Only access controls',
      'Only backup power'
    ],
    correctAnswer: 1,
    explanation: 'Data center environmental controls include HVAC for cooling, fire suppression systems, humidity control, and water detection to protect equipment.',
    topic: 'Data Center',
    subtopic: 'Environmental Controls'
  },
  {
    id: 'CISA4-016',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'An uninterruptible power supply (UPS) provides:',
    options: [
      'Long-term backup power',
      'Short-term power to bridge until generator starts',
      'Power for the entire building',
      'Cooling for servers'
    ],
    correctAnswer: 1,
    explanation: 'A UPS provides short-term battery backup power to bridge the gap until a generator can start and take over during a power outage.',
    topic: 'Data Center',
    subtopic: 'Power Management'
  },
  {
    id: 'CISA4-017',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Physical access to the data center should be:',
    options: [
      'Open to all IT staff',
      'Restricted and logged',
      'Available to management only',
      'Controlled by developers'
    ],
    correctAnswer: 1,
    explanation: 'Data center physical access should be restricted to authorized personnel, logged for accountability, and regularly reviewed.',
    topic: 'Data Center',
    subtopic: 'Physical Security'
  },
  {
    id: 'CISA4-018',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Network monitoring tools are used to:',
    options: [
      'Develop applications',
      'Detect and diagnose network issues',
      'Replace firewalls',
      'Store user data'
    ],
    correctAnswer: 1,
    explanation: 'Network monitoring tools detect network issues, measure performance, and help diagnose problems to maintain network availability and performance.',
    topic: 'Network Operations',
    subtopic: 'Monitoring'
  },
  {
    id: 'CISA4-019',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'When reviewing IT asset management, an IS auditor should be MOST concerned if:',
    options: [
      'Assets are tagged with identifiers',
      'There is no complete inventory of IT assets',
      'Depreciation schedules are followed',
      'Assets are disposed of when obsolete'
    ],
    correctAnswer: 1,
    explanation: 'Without a complete inventory, the organization cannot properly manage, secure, or account for all IT assets, increasing risk of loss and security gaps.',
    topic: 'IT Operations',
    subtopic: 'Asset Management'
  },
  {
    id: 'CISA4-020',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'End-of-life hardware should be:',
    options: [
      'Disposed of immediately',
      'Properly sanitized before disposal or reuse',
      'Stored indefinitely',
      'Given to employees'
    ],
    correctAnswer: 1,
    explanation: 'End-of-life hardware must be properly sanitized to remove all data before disposal or reuse to prevent unauthorized data disclosure.',
    topic: 'IT Operations',
    subtopic: 'Asset Disposal'
  },
  {
    id: 'CISA4-021',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'A business continuity plan should be:',
    options: [
      'Developed by IT only',
      'Organization-wide and business-driven',
      'Focused on IT recovery only',
      'Kept confidential from employees'
    ],
    correctAnswer: 1,
    explanation: 'Business continuity planning is an organization-wide effort driven by business requirements, not just IT. It addresses all critical business functions.',
    topic: 'Business Continuity',
    subtopic: 'BCP Scope'
  },
  {
    id: 'CISA4-022',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'The FIRST step in business continuity planning is:',
    options: [
      'Developing recovery procedures',
      'Conducting a business impact analysis',
      'Purchasing recovery infrastructure',
      'Training staff'
    ],
    correctAnswer: 1,
    explanation: 'BIA is the first step as it identifies critical functions and acceptable downtime, which drives all subsequent planning and investment decisions.',
    topic: 'Business Continuity',
    subtopic: 'BIA'
  },
  {
    id: 'CISA4-023',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Crisis communication plans should include:',
    options: [
      'Technical recovery procedures',
      'Designated spokespersons and message templates',
      'Backup locations only',
      'IT vendor contacts only'
    ],
    correctAnswer: 1,
    explanation: 'Crisis communication plans should designate spokespersons, provide message templates, and establish procedures for communicating with stakeholders during a crisis.',
    topic: 'Business Continuity',
    subtopic: 'Crisis Communication'
  },
  {
    id: 'CISA4-024',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'A tabletop disaster recovery exercise:',
    options: [
      'Fully tests all recovery capabilities',
      'Walks through scenarios without actually recovering systems',
      'Is only for IT staff',
      'Replaces the need for full tests'
    ],
    correctAnswer: 1,
    explanation: 'Tabletop exercises walk through disaster scenarios in a discussion format without actually recovering systems, testing plan completeness and team coordination.',
    topic: 'Disaster Recovery',
    subtopic: 'DR Testing'
  },
  {
    id: 'CISA4-025',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'The PRIMARY objective of disaster recovery planning is to:',
    options: [
      'Prevent all disasters',
      'Minimize business impact and enable timely recovery',
      'Eliminate the need for backups',
      'Reduce IT costs'
    ],
    correctAnswer: 1,
    explanation: 'Disaster recovery planning aims to minimize business impact when disasters occur and enable timely recovery of critical IT systems.',
    topic: 'Disaster Recovery',
    subtopic: 'DR Objectives'
  },
  {
    id: 'CISA4-026',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'A cold site provides:',
    options: [
      'Fully operational systems',
      'Basic infrastructure requiring significant setup time',
      'Real-time data replication',
      'Immediate switchover capability'
    ],
    correctAnswer: 1,
    explanation: 'A cold site provides basic infrastructure (space, power, connectivity) but requires significant time to install equipment and restore systems.',
    topic: 'Disaster Recovery',
    subtopic: 'Recovery Sites'
  },
  {
    id: 'CISA4-027',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'A warm site provides:',
    options: [
      'No infrastructure',
      'Partial equipment and connectivity with moderate setup time',
      'Immediate failover',
      'Only backup storage'
    ],
    correctAnswer: 1,
    explanation: 'A warm site has partial equipment and connectivity already in place, requiring moderate time to become fully operational.',
    topic: 'Disaster Recovery',
    subtopic: 'Recovery Sites'
  },
  {
    id: 'CISA4-028',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Data replication provides protection by:',
    options: [
      'Encrypting data',
      'Maintaining copies of data at alternate locations',
      'Compressing storage',
      'Automating backups'
    ],
    correctAnswer: 1,
    explanation: 'Data replication maintains copies of data at alternate locations, providing protection against data loss at the primary site and enabling faster recovery.',
    topic: 'Disaster Recovery',
    subtopic: 'Data Replication'
  },
  {
    id: 'CISA4-029',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Virtualization in disaster recovery provides benefits including:',
    options: [
      'Elimination of hardware requirements',
      'Faster recovery through hardware independence',
      'Reduced need for testing',
      'Permanent data protection'
    ],
    correctAnswer: 1,
    explanation: 'Virtualization enables faster recovery by abstracting systems from specific hardware, allowing recovery on different physical equipment.',
    topic: 'Disaster Recovery',
    subtopic: 'Virtualization'
  },
  {
    id: 'CISA4-030',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Cloud computing disaster recovery advantages include:',
    options: [
      'Elimination of all costs',
      'Scalable resources and geographic distribution',
      'No need for planning',
      'Automatic compliance'
    ],
    correctAnswer: 1,
    explanation: 'Cloud DR offers scalable resources, geographic distribution, and pay-as-you-use pricing, reducing the cost of maintaining standby infrastructure.',
    topic: 'Disaster Recovery',
    subtopic: 'Cloud DR'
  },
  {
    id: 'CISA4-031',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'When reviewing business continuity plans, an IS auditor should be MOST concerned if:',
    options: [
      'Plans are tested annually',
      'Plans do not address all critical business functions',
      'Plans are documented electronically',
      'IT is involved in planning'
    ],
    correctAnswer: 1,
    explanation: 'BCP that does not address all critical business functions leaves the organization vulnerable. All critical functions must have continuity provisions.',
    topic: 'Business Continuity',
    subtopic: 'BCP Review'
  },
  {
    id: 'CISA4-032',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Lessons learned from DR tests should be:',
    options: [
      'Kept confidential',
      'Used to improve plans and procedures',
      'Shared only with management',
      'Discarded after the test'
    ],
    correctAnswer: 1,
    explanation: 'Lessons learned from DR tests should be documented and used to improve plans, procedures, and address gaps identified during testing.',
    topic: 'Disaster Recovery',
    subtopic: 'Continuous Improvement'
  },
];

export default CISA4_QUESTIONS_BATCH2;
