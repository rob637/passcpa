/**
 * CISA Domain 4: Information Systems Operations and Business Resilience
 * Batch 3 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA4_QUESTIONS_BATCH3: Question[] = [
  {
    id: 'CISA4-033',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Maximum tolerable downtime (MTD) determines:',
    options: [
      'The backup frequency',
      'The longest period a function can be unavailable without unacceptable impact',
      'The recovery site type',
      'The testing schedule'
    ],
    correctAnswer: 1,
    explanation: 'MTD is the maximum time a business function can be disrupted before the impact becomes unacceptable, driving RTO requirements.',
    topic: 'Business Continuity',
    subtopic: 'MTD'
  },
  {
    id: 'CISA4-034',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Work recovery time (WRT) represents:',
    options: [
      'Time to restore systems',
      'Time to verify and resume business processes after system restoration',
      'Total downtime',
      'Backup duration'
    ],
    correctAnswer: 1,
    explanation: 'WRT is the time needed to verify systems are working correctly and resume business processes after technical systems are restored.',
    topic: 'Business Continuity',
    subtopic: 'WRT'
  },
  {
    id: 'CISA4-035',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'IT service continuity management ensures:',
    options: [
      'Zero downtime always',
      'IT services can be recovered within business requirements',
      'No disasters occur',
      'Lowest cost operations'
    ],
    correctAnswer: 1,
    explanation: 'IT service continuity management ensures IT services can be recovered within agreed timeframes to support business continuity requirements.',
    topic: 'Business Continuity',
    subtopic: 'ITSCM'
  },
  {
    id: 'CISA4-036',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Reciprocal agreements for disaster recovery have a key weakness:',
    options: [
      'High cost',
      'Each party may not have capacity when both are affected',
      'Legal complexity',
      'Geographic distance'
    ],
    correctAnswer: 1,
    explanation: 'Reciprocal agreements assume one organization can host another during disaster, but both may be affected simultaneously or capacity may not exist.',
    topic: 'Disaster Recovery',
    subtopic: 'Reciprocal Agreements'
  },
  {
    id: 'CISA4-037',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Cloud-based disaster recovery offers:',
    options: [
      'Guaranteed uptime',
      'Cost-effective scalable recovery infrastructure',
      'No planning required',
      'Automatic compliance'
    ],
    correctAnswer: 1,
    explanation: 'Cloud DR offers cost-effective, scalable recovery infrastructure without maintaining dedicated standby hardware, though planning is still required.',
    topic: 'Disaster Recovery',
    subtopic: 'Cloud DR'
  },
  {
    id: 'CISA4-038',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Database journaling supports recovery by:',
    options: [
      'Encrypting all data',
      'Recording all changes to enable point-in-time recovery',
      'Compressing data',
      'Archiving old data'
    ],
    correctAnswer: 1,
    explanation: 'Database journaling records all changes (before and after images), enabling recovery to any point in time by replaying or reversing transactions.',
    topic: 'Data Recovery',
    subtopic: 'Journaling'
  },
  {
    id: 'CISA4-039',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Synchronous replication differs from asynchronous in that:',
    options: [
      'It is less reliable',
      'Writes are confirmed at both sites before acknowledgment',
      'It uses less bandwidth',
      'Recovery is slower'
    ],
    correctAnswer: 1,
    explanation: 'Synchronous replication confirms writes at both primary and secondary sites before acknowledging, ensuring zero data loss but adding latency.',
    topic: 'Data Recovery',
    subtopic: 'Replication'
  },
  {
    id: 'CISA4-040',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Storage area networks (SANs) provide:',
    options: [
      'Only local storage',
      'Centralized, high-performance block-level storage',
      'Only backup storage',
      'Only archival storage'
    ],
    correctAnswer: 1,
    explanation: 'SANs provide centralized, high-performance block-level storage that can be shared across servers, with features like snapshots and replication.',
    topic: 'Data Center',
    subtopic: 'Storage'
  },
  {
    id: 'CISA4-041',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'RAID levels provide:',
    options: [
      'Only backup',
      'Data protection through redundancy and/or improved performance',
      'Only encryption',
      'Only compression'
    ],
    correctAnswer: 1,
    explanation: 'RAID (Redundant Array of Independent Disks) provides data protection through disk redundancy and/or improved I/O performance depending on level.',
    topic: 'Data Center',
    subtopic: 'RAID'
  },
  {
    id: 'CISA4-042',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'High availability clustering provides:',
    options: [
      'Data encryption',
      'Automatic failover to minimize downtime',
      'Improved network speed',
      'Reduced costs'
    ],
    correctAnswer: 1,
    explanation: 'High availability clustering uses multiple servers with automatic failover, minimizing downtime if a server fails.',
    topic: 'IT Operations',
    subtopic: 'High Availability'
  },
  {
    id: 'CISA4-043',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Load balancing distributes:',
    options: [
      'Only backup traffic',
      'Traffic across multiple servers for performance and availability',
      'Only administrative functions',
      'Only security functions'
    ],
    correctAnswer: 1,
    explanation: 'Load balancing distributes network traffic across multiple servers to improve performance, availability, and prevent any single server from being overwhelmed.',
    topic: 'IT Operations',
    subtopic: 'Load Balancing'
  },
  {
    id: 'CISA4-044',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Event logging should capture:',
    options: [
      'Only errors',
      'Significant events including access, changes, and exceptions',
      'Only security events',
      'Only performance data'
    ],
    correctAnswer: 1,
    explanation: 'Logging should capture significant events including user access, configuration changes, errors, and security events for troubleshooting and accountability.',
    topic: 'IT Operations',
    subtopic: 'Logging'
  },
  {
    id: 'CISA4-045',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Security Information and Event Management (SIEM) provides:',
    options: [
      'Only log storage',
      'Real-time analysis, correlation, and alerting on security events',
      'Only compliance reporting',
      'Only backup'
    ],
    correctAnswer: 1,
    explanation: 'SIEM aggregates logs from multiple sources, correlates events to detect threats, provides real-time alerting, and supports investigation.',
    topic: 'Security Operations',
    subtopic: 'SIEM'
  },
  {
    id: 'CISA4-046',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Network operations center (NOC) is responsible for:',
    options: [
      'Only help desk functions',
      'Monitoring and managing network infrastructure',
      'Only security functions',
      'Only development'
    ],
    correctAnswer: 1,
    explanation: 'The NOC monitors and manages network infrastructure, identifying and resolving issues to maintain network availability and performance.',
    topic: 'Network Operations',
    subtopic: 'NOC'
  },
  {
    id: 'CISA4-047',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Security operations center (SOC) focuses on:',
    options: [
      'Network performance only',
      'Detecting, analyzing, and responding to security threats',
      'Only compliance',
      'Only help desk'
    ],
    correctAnswer: 1,
    explanation: 'The SOC monitors for security threats, analyzes events, and coordinates incident response to protect the organization.',
    topic: 'Security Operations',
    subtopic: 'SOC'
  },
  {
    id: 'CISA4-048',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Runbooks document:',
    options: [
      'Only emergency procedures',
      'Routine operational procedures for common tasks and issues',
      'Only security policies',
      'Only training materials'
    ],
    correctAnswer: 1,
    explanation: 'Runbooks document step-by-step procedures for routine operational tasks and common issue resolution, ensuring consistent operations.',
    topic: 'IT Operations',
    subtopic: 'Runbooks'
  },
  {
    id: 'CISA4-049',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Operating system hardening includes:',
    options: [
      'Only patching',
      'Removing unnecessary services, applying patches, and secure configuration',
      'Only antivirus installation',
      'Only password policies'
    ],
    correctAnswer: 1,
    explanation: 'OS hardening includes removing unnecessary services, applying patches, disabling default accounts, and applying secure configuration settings.',
    topic: 'System Security',
    subtopic: 'Hardening'
  },
  {
    id: 'CISA4-050',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Baseline configurations provide:',
    options: [
      'Maximum flexibility',
      'Standard secure configurations for consistent deployment',
      'No security',
      'Only performance settings'
    ],
    correctAnswer: 1,
    explanation: 'Baseline configurations define standard secure settings for systems, ensuring consistent, compliant deployment across the environment.',
    topic: 'System Security',
    subtopic: 'Baselines'
  },
  {
    id: 'CISA4-051',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Privileged access management (PAM) controls:',
    options: [
      'Only user passwords',
      'Access to high-privilege accounts and systems',
      'Only network access',
      'Only physical access'
    ],
    correctAnswer: 1,
    explanation: 'PAM controls access to privileged accounts (admin, root) through features like password vaulting, session recording, and just-in-time access.',
    topic: 'Access Control',
    subtopic: 'PAM'
  },
  {
    id: 'CISA4-052',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Print server controls should address:',
    options: [
      'Only paper usage',
      'Unauthorized access to sensitive documents',
      'Only printer maintenance',
      'Only ink levels'
    ],
    correctAnswer: 1,
    explanation: 'Print controls should prevent unauthorized access to sensitive documents through features like secure print release and logging.',
    topic: 'IT Operations',
    subtopic: 'Print Security'
  },
  {
    id: 'CISA4-053',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Media sanitization ensures:',
    options: [
      'Media is clean',
      'Data on storage media cannot be recovered',
      'Media works properly',
      'Media is labeled'
    ],
    correctAnswer: 1,
    explanation: 'Media sanitization removes data so it cannot be recovered, using methods appropriate to data sensitivity (clearing, purging, or destroying).',
    topic: 'Data Management',
    subtopic: 'Media Sanitization'
  },
  {
    id: 'CISA4-054',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Cryptographic key management includes:',
    options: [
      'Only key creation',
      'Generation, storage, distribution, rotation, and destruction',
      'Only password management',
      'Only backup'
    ],
    correctAnswer: 1,
    explanation: 'Key management covers the entire key lifecycle: generation, secure storage, distribution, rotation, archival, and secure destruction.',
    topic: 'Data Security',
    subtopic: 'Key Management'
  },
  {
    id: 'CISA4-055',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Hardware security modules (HSMs) provide:',
    options: [
      'Only physical security',
      'Secure cryptographic processing and key storage',
      'Only network security',
      'Only backup'
    ],
    correctAnswer: 1,
    explanation: 'HSMs are tamper-resistant devices that perform cryptographic operations and securely store cryptographic keys.',
    topic: 'Data Security',
    subtopic: 'HSM'
  },
  {
    id: 'CISA4-056',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Automated provisioning of resources:',
    options: [
      'Increases errors',
      'Improves consistency and reduces deployment time',
      'Requires more staff',
      'Is less secure'
    ],
    correctAnswer: 1,
    explanation: 'Automated provisioning improves consistency by using predefined templates, reduces deployment time, and decreases human errors.',
    topic: 'IT Operations',
    subtopic: 'Automation'
  },
  {
    id: 'CISA4-057',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Site assessments for disaster recovery should consider:',
    options: [
      'Only distance from primary site',
      'Geographic risks, accessibility, security, and infrastructure',
      'Only cost',
      'Only available vendors'
    ],
    correctAnswer: 1,
    explanation: 'DR site assessments should consider geographic risks, accessibility during disasters, physical security, infrastructure capacity, and regional threats.',
    topic: 'Disaster Recovery',
    subtopic: 'Site Selection'
  },
  {
    id: 'CISA4-058',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Crisis management differs from incident management in that it:',
    options: [
      'Handles routine incidents',
      'Addresses organization-threatening events requiring executive involvement',
      'Is handled by IT only',
      'Does not require planning'
    ],
    correctAnswer: 1,
    explanation: 'Crisis management handles major events that threaten the organization\'s survival, requiring executive leadership and strategic decision-making.',
    topic: 'Business Continuity',
    subtopic: 'Crisis Management'
  },
  {
    id: 'CISA4-059',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Emergency response procedures should be:',
    options: [
      'Complex and detailed',
      'Clear, simple, and regularly tested',
      'Known only to management',
      'Updated only after incidents'
    ],
    correctAnswer: 1,
    explanation: 'Emergency procedures should be clear, simple to follow under stress, and regularly tested to ensure effectiveness.',
    topic: 'Business Continuity',
    subtopic: 'Emergency Response'
  },
  {
    id: 'CISA4-060',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'The PRIMARY goal of business continuity testing is to:',
    options: [
      'Satisfy auditors',
      'Verify plans work and identify gaps for improvement',
      'Train new staff',
      'Update documentation'
    ],
    correctAnswer: 1,
    explanation: 'BC testing primarily verifies that plans work as expected, identifies gaps and weaknesses, and validates that objectives can be met.',
    topic: 'Business Continuity',
    subtopic: 'BC Testing'
  },
  {
    id: 'CISA4-061',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Service level monitoring should:',
    options: [
      'Occur only during problems',
      'Be continuous with reporting against SLA targets',
      'Be performed annually',
      'Focus only on availability'
    ],
    correctAnswer: 1,
    explanation: 'Service level monitoring should be continuous, measuring actual performance against SLA targets and reporting on compliance.',
    topic: 'IT Service Management',
    subtopic: 'SLA Monitoring'
  },
  {
    id: 'CISA4-062',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Mean time between failures (MTBF) measures:',
    options: [
      'Time to repair',
      'Average time a system operates before failing',
      'Time to detect failures',
      'Maintenance frequency'
    ],
    correctAnswer: 1,
    explanation: 'MTBF measures the average time a system or component operates before experiencing a failure, indicating reliability.',
    topic: 'IT Operations',
    subtopic: 'Reliability Metrics'
  },
];

export default CISA4_QUESTIONS_BATCH3;
