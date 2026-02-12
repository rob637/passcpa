/**
 * CISA Domain 4: Information Systems Operations and Business Resilience
 * Additional Questions - Batch 9
 * Focus on Operations, BCP/DRP, and Resilience
 */

import { Question } from '../../../types';

export const CISA4_QUESTIONS_BATCH9: Question[] = [
  {
    id: 'cisa4-210',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A DRP test that processes actual transactions through the backup site is called:',
    options: [
      'Tabletop exercise',
      'Parallel test',
      'Simulation test',
      'Walk-through'
    ],
    correctAnswer: 1,
    explanation: 'Parallel testing involves processing actual transactions through backup systems while production continues, verifying true recovery capability.',
    topic: 'Business Continuity',
    subtopic: 'DRP Testing'
  },
  {
    id: 'cisa4-211',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The FIRST step in developing a business continuity plan is:',
    options: [
      'Identifying recovery strategies',
      'Conducting a Business Impact Analysis',
      'Selecting backup sites',
      'Testing the plan'
    ],
    correctAnswer: 1,
    explanation: 'BIA identifies critical processes and their RTOs/RPOs, which drives all subsequent recovery strategy and planning decisions.',
    topic: 'Business Continuity',
    subtopic: 'BIA'
  },
  {
    id: 'cisa4-212',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which recovery site option provides the fastest recovery time?',
    options: [
      'Cold site',
      'Warm site',
      'Hot site',
      'Mobile site'
    ],
    correctAnswer: 2,
    explanation: 'Hot sites maintain fully operational duplicate systems with real-time data replication, enabling immediate failover.',
    topic: 'Business Continuity',
    subtopic: 'Recovery Sites'
  },
  {
    id: 'cisa4-213',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Mean Time Between Failures (MTBF) measures:',
    options: [
      'How long repairs take',
      'Average time a system operates before failing',
      'Recovery time objective',
      'Backup frequency'
    ],
    correctAnswer: 1,
    explanation: 'MTBF measures reliability by calculating the average time between system failures, used in availability calculations.',
    topic: 'Operations',
    subtopic: 'Reliability'
  },
  {
    id: 'cisa4-214',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An auditor reviewing incident response should verify that:',
    options: [
      'All incidents are closed within 24 hours',
      'Incidents are classified, escalated, and root cause analyzed',
      'Incidents are only reported to IT management',
      'Response plans are reviewed only after major incidents'
    ],
    correctAnswer: 1,
    explanation: 'Effective incident response requires proper classification, escalation procedures, and root cause analysis to prevent recurrence.',
    topic: 'Operations',
    subtopic: 'Incident Management'
  },
  {
    id: 'cisa4-215',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Job scheduling software is used to:',
    options: [
      'Hire IT personnel',
      'Automate and sequence batch processing tasks',
      'Schedule employee vacations',
      'Plan IT projects'
    ],
    correctAnswer: 1,
    explanation: 'Job scheduling automates the sequencing and execution of batch processes based on dependencies, timing, and resource availability.',
    topic: 'Operations',
    subtopic: 'Job Scheduling'
  },
  {
    id: 'cisa4-216',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When auditing data center environmental controls, the MOST critical factor is:',
    options: [
      'Carpet color',
      'HVAC capacity and redundancy',
      'Office furniture quality',
      'Number of windows'
    ],
    correctAnswer: 1,
    explanation: 'HVAC systems maintain proper temperature and humidity for equipment reliability. Inadequate cooling causes hardware failures.',
    topic: 'Operations',
    subtopic: 'Environmental Controls'
  },
  {
    id: 'cisa4-217',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The difference between incremental and differential backups is:',
    options: [
      'Incremental backs up all data each time',
      'Differential includes all changes since last full backup; incremental since last backup of any type',
      'They are identical',
      'Differential is faster to restore'
    ],
    correctAnswer: 1,
    explanation: 'Differential captures changes since last full backup (cumulative), while incremental captures only changes since last backup (any type).',
    topic: 'Operations',
    subtopic: 'Backup Strategies'
  },
  {
    id: 'cisa4-218',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An organization with RTO of 4 hours and RPO of 1 hour should use:',
    options: [
      'Weekly tape backups',
      'Real-time replication with automated failover',
      'Daily backups to offsite location',
      'Monthly archive backups'
    ],
    correctAnswer: 1,
    explanation: 'A 1-hour RPO requires near real-time data replication, and 4-hour RTO requires rapid recovery capabilities like automated failover.',
    topic: 'Business Continuity',
    subtopic: 'RTO/RPO'
  },
  {
    id: 'cisa4-219',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Problem management differs from incident management because problem management:',
    options: [
      'Handles individual incidents',
      'Focuses on finding and eliminating root causes',
      'Is performed by end users',
      'Has shorter resolution times'
    ],
    correctAnswer: 1,
    explanation: 'Incident management restores service; problem management identifies and eliminates root causes to prevent recurrence.',
    topic: 'Operations',
    subtopic: 'Problem Management'
  },
  {
    id: 'cisa4-220',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'During BCP testing, the MOST important metric to verify is:',
    options: [
      'Test report length',
      'Actual recovery time versus targeted RTO',
      'Number of participants',
      'Test budget spent'
    ],
    correctAnswer: 1,
    explanation: 'Comparing actual recovery time to RTO validates whether the plan can meet business requirements under real conditions.',
    topic: 'Business Continuity',
    subtopic: 'BCP Testing'
  },
  {
    id: 'cisa4-221',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Capacity management ensures that:',
    options: [
      'Building space is adequate',
      'IT resources meet current and future demand',
      'Staff are properly trained',
      'Backups are stored correctly'
    ],
    correctAnswer: 1,
    explanation: 'Capacity management monitors and forecasts resource utilization to ensure adequate capacity for current and projected needs.',
    topic: 'Operations',
    subtopic: 'Capacity Management'
  },
  {
    id: 'cisa4-222',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When reviewing operations, an auditor finds servers with 95%+ CPU utilization. This indicates:',
    options: [
      'Optimal performance',
      'Potential capacity issues requiring immediate attention',
      'Underutilization',
      'Normal weekend processing'
    ],
    correctAnswer: 1,
    explanation: 'Sustained high utilization (95%+) indicates capacity constraints that risk performance degradation or system failures.',
    topic: 'Operations',
    subtopic: 'Performance Monitoring'
  },
  {
    id: 'cisa4-223',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Service Level Agreements (SLAs) should specify:',
    options: [
      'Internal org chart',
      'Measurable service targets, responsibilities, and remedies',
      'Employee salaries',
      'Development methodologies'
    ],
    correctAnswer: 1,
    explanation: 'SLAs define measurable service levels, responsibilities of each party, and consequences/remedies for non-performance.',
    topic: 'Operations',
    subtopic: 'SLAs'
  },
  {
    id: 'cisa4-224',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A reciprocal agreement for disaster recovery has what PRIMARY disadvantage?',
    options: [
      'High cost',
      'Capacity constraints if both parties experience disaster simultaneously',
      'Complex implementation',
      'Regulatory prohibition'
    ],
    correctAnswer: 1,
    explanation: 'Reciprocal agreements may fail if both parties need capacity simultaneously, and excess capacity may not be available.',
    topic: 'Business Continuity',
    subtopic: 'Recovery Sites'
  },
  {
    id: 'cisa4-225',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Console security in data centers is important because:',
    options: [
      'Consoles are expensive',
      'Console access can bypass network security controls',
      'Consoles generate noise',
      'Consoles require air conditioning'
    ],
    correctAnswer: 1,
    explanation: 'Physical console access often has elevated privileges and bypasses network security controls, requiring strict access controls.',
    topic: 'Operations',
    subtopic: 'Physical Security'
  },
  {
    id: 'cisa4-226',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which UPS type provides the best power protection?',
    options: [
      'Standby UPS',
      'Online double-conversion UPS',
      'Line-interactive UPS',
      'Offline UPS'
    ],
    correctAnswer: 1,
    explanation: 'Online double-conversion UPS continuously converts power through battery, providing complete isolation from power anomalies.',
    topic: 'Operations',
    subtopic: 'Power Protection'
  },
  {
    id: 'cisa4-227',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Media sanitization ensures:',
    options: [
      'Media is physically clean',
      'Data cannot be recovered from decommissioned media',
      'Media is properly labeled',
      'Media is stored correctly'
    ],
    correctAnswer: 1,
    explanation: 'Media sanitization (clearing, purging, destroying) ensures data cannot be recovered when media is retired or repurposed.',
    topic: 'Operations',
    subtopic: 'Media Management'
  },
  {
    id: 'cisa4-228',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When auditing disaster recovery, the IS auditor should verify that the DRP:',
    options: [
      'Has never been tested',
      'Includes only IT systems, not business processes',
      'Has been tested, maintained, and updated regularly',
      'Is stored only at the primary site'
    ],
    correctAnswer: 2,
    explanation: 'Effective DRPs require regular testing to validate assumptions, ongoing maintenance, and updates when systems change.',
    topic: 'Business Continuity',
    subtopic: 'DRP Maintenance'
  },
  {
    id: 'cisa4-229',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Network Operations Center (NOC) primary function is:',
    options: [
      'Software development',
      'Monitoring and maintaining network infrastructure',
      'User training',
      'Project management'
    ],
    correctAnswer: 1,
    explanation: 'NOC provides continuous monitoring of network infrastructure, identifying and responding to issues to maintain availability.',
    topic: 'Operations',
    subtopic: 'NOC'
  },
  {
    id: 'cisa4-230',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Maximum Tolerable Downtime (MTD) determines:',
    options: [
      'The longest outage the business can survive without permanent damage',
      'How often backups should be taken',
      'Hardware warranty period',
      'SLA response time'
    ],
    correctAnswer: 0,
    explanation: 'MTD represents the maximum time a business process can be unavailable before causing unacceptable damage to the organization.',
    topic: 'Business Continuity',
    subtopic: 'MTD'
  },
  {
    id: 'cisa4-231',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Virtual tape library (VTL) technology:',
    options: [
      'Uses physical tape only',
      'Emulates tape on disk for faster backup/recovery',
      'Eliminates need for any backup',
      'Replaces all storage devices'
    ],
    correctAnswer: 1,
    explanation: 'VTL uses disk storage that appears as tape to backup software, providing faster backup/restore while maintaining tape compatibility.',
    topic: 'Operations',
    subtopic: 'Backup Technology'
  },
  {
    id: 'cisa4-232',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Crisis communication plans should include:',
    options: [
      'Only internal stakeholder contact',
      'Designated spokespersons, message templates, and multi-channel notification',
      'Technical recovery procedures only',
      'Employee vacation schedules'
    ],
    correctAnswer: 1,
    explanation: 'Crisis communication requires prepared spokespersons, pre-approved messages, and multiple notification channels for different audiences.',
    topic: 'Business Continuity',
    subtopic: 'Crisis Communication'
  },
  {
    id: 'cisa4-233',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Storage Area Network (SAN) provides:',
    options: [
      'User email',
      'High-speed, dedicated network for storage access',
      'Internet connectivity',
      'VPN access'
    ],
    correctAnswer: 1,
    explanation: 'SAN is a dedicated high-speed network connecting servers to storage devices, enabling centralized, high-performance data access.',
    topic: 'Operations',
    subtopic: 'Storage'
  },
  {
    id: 'cisa4-234',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When reviewing disaster recovery contracts, the auditor should ensure:',
    options: [
      'The vendor is local only',
      'Recovery capacity is guaranteed and tested with the vendor',
      'The contract has no termination clause',
      'Only annual payments are allowed'
    ],
    correctAnswer: 1,
    explanation: 'DR contracts should guarantee capacity, and organizations should test with the vendor to verify the contracted services work.',
    topic: 'Business Continuity',
    subtopic: 'DR Contracts'
  },
  {
    id: 'cisa4-235',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Change management documentation should be retained to:',
    options: [
      'Reduce storage costs',
      'Enable troubleshooting and demonstrate control',
      'Meet daily operational needs only',
      'Satisfy programmer preferences'
    ],
    correctAnswer: 1,
    explanation: 'Change documentation enables troubleshooting when issues arise and demonstrates proper change control for audit purposes.',
    topic: 'Operations',
    subtopic: 'Change Management'
  },
  {
    id: 'cisa4-236',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Cyber resilience differs from traditional security by focusing on:',
    options: [
      'Prevention only',
      'Ability to anticipate, withstand, recover from, and adapt to adverse conditions',
      'Perimeter defenses',
      'Compliance only'
    ],
    correctAnswer: 1,
    explanation: 'Cyber resilience encompasses prevention, detection, response, and recovery - assuming breaches will occur and planning accordingly.',
    topic: 'Business Continuity',
    subtopic: 'Cyber Resilience'
  },
  {
    id: 'cisa4-237',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Runbook automation:',
    options: [
      'Increases manual intervention',
      'Automates routine operational procedures to improve consistency',
      'Eliminates all documentation',
      'Replaces all IT staff'
    ],
    correctAnswer: 1,
    explanation: 'Runbook automation codifies routine procedures (like incident response steps) to ensure consistent execution and faster resolution.',
    topic: 'Operations',
    subtopic: 'Automation'
  },
  {
    id: 'cisa4-238',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Geographic dispersion of data centers provides protection against:',
    options: [
      'All cyber attacks',
      'Regional disasters affecting multiple nearby sites',
      'Data corruption',
      'User errors'
    ],
    correctAnswer: 1,
    explanation: 'Geographic dispersion ensures regional disasters (earthquakes, hurricanes) cannot simultaneously affect primary and recovery sites.',
    topic: 'Business Continuity',
    subtopic: 'Site Selection'
  },
  {
    id: 'cisa4-239',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'End-of-life (EOL) planning for IT assets includes:',
    options: [
      'Ignoring older systems',
      'Data migration, secure disposal, and replacement planning',
      'Continuing use indefinitely',
      'Only physical destruction'
    ],
    correctAnswer: 1,
    explanation: 'EOL planning ensures data is migrated, media is securely disposed, and replacement systems are ready before support ends.',
    topic: 'Operations',
    subtopic: 'Asset Lifecycle'
  },
  {
    id: 'cisa4-240',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A Business Continuity Program should be reviewed and updated:',
    options: [
      'Only after disasters occur',
      'Regularly and when significant changes occur',
      'Once at initial creation',
      'Every ten years'
    ],
    correctAnswer: 1,
    explanation: 'BCP requires regular review cycles plus updates when major changes (new systems, reorganization, new risks) occur.',
    topic: 'Business Continuity',
    subtopic: 'BCP Maintenance'
  }
];
