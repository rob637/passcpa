/**
 * CISA Domain 4: IS Operations and Business Resilience - Flashcards Batch 2
 * Additional flashcards covering advanced topics
 */

import { Flashcard } from './types';

export const cisa4FlashcardsBatch2: Flashcard[] = [
  // Business Continuity Advanced


  {
    id: 'CISA4-FC-034',
    front: 'What is MTPD (Maximum Tolerable Period of Disruption)?',
    back: 'Maximum time before disruption causes unacceptable damage to the organization. Sets the outer limit for RTO.',
    category: 'Business Continuity',
    tags: ['MTPD', 'disruption', 'CISA4'],
  },

  {
    id: 'CISA4-FC-036',
    front: 'What should a BIA identify?',
    back: 'Critical processes, dependencies, impact over time (financial, operational, reputational), RTO, RPO, and resource requirements.',
    category: 'Business Continuity',
    tags: ['BIA', 'components', 'CISA4'],
  },
  
  // Disaster Recovery
  {
    id: 'CISA4-FC-037',
    front: 'What is a hot site?',
    back: 'Fully equipped operational facility with current data that can take over quickly (minutes to hours).',
    category: 'Disaster Recovery',
    tags: ['hot site', 'recovery', 'CISA4'],
  },
  {
    id: 'CISA4-FC-038',
    front: 'What is a warm site?',
    back: 'Facility with infrastructure but requiring data restoration and some configuration (hours to days recovery).',
    category: 'Disaster Recovery',
    tags: ['warm site', 'recovery', 'CISA4'],
  },
  {
    id: 'CISA4-FC-039',
    front: 'What is a cold site?',
    back: 'Basic facility (power, cooling, space) requiring full equipment installation (days to weeks recovery).',
    category: 'Disaster Recovery',
    tags: ['cold site', 'recovery', 'CISA4'],
  },
  {
    id: 'CISA4-FC-040',
    front: 'What are the types of DR tests?',
    back: 'Checklist review, Tabletop/walkthrough, Simulation, Parallel test, Full interruption test (most to least disruptive).',
    category: 'Disaster Recovery',
    tags: ['DR testing', 'tests', 'CISA4'],
  },
  {
    id: 'CISA4-FC-041',
    front: 'What is the most important outcome of DR testing?',
    back: 'Identifying gaps and improving the plan. Testing should validate assumptions and identify needed improvements.',
    category: 'Disaster Recovery',
    tags: ['DR testing', 'outcomes', 'CISA4'],
  },
  
  // Backup and Recovery
  {
    id: 'CISA4-FC-042',
    front: 'What is the 3-2-1 backup rule?',
    back: 'Keep 3 copies of data on 2 different media types with 1 copy offsite.',
    category: 'Backup',
    tags: ['3-2-1', 'backup', 'CISA4'],
  },
  {
    id: 'CISA4-FC-043',
    front: 'What is a full backup?',
    back: 'Complete copy of all data. Takes longest but simplest to restore.',
    category: 'Backup',
    tags: ['full backup', 'types', 'CISA4'],
  },
  {
    id: 'CISA4-FC-044',
    front: 'What is an incremental backup?',
    back: 'Only data changed since last backup of any type. Fastest but requires all backups in sequence to restore.',
    category: 'Backup',
    tags: ['incremental', 'backup', 'CISA4'],
  },
  {
    id: 'CISA4-FC-045',
    front: 'What is a differential backup?',
    back: 'Data changed since last full backup. Faster than full, simpler restore than incremental.',
    category: 'Backup',
    tags: ['differential', 'backup', 'CISA4'],
  },
  {
    id: 'CISA4-FC-046',
    front: 'Why is backup restoration testing essential?',
    back: 'Backups without tested restoration are unreliable - must verify data can actually be recovered when needed.',
    category: 'Backup',
    tags: ['restoration', 'testing', 'CISA4'],
  },
  
  // Incident Management
  {
    id: 'CISA4-FC-047',
    front: 'What are the phases of incident response?',
    back: 'Preparation, Detection/Analysis, Containment, Eradication, Recovery, Post-Incident Activity/Lessons Learned.',
    category: 'Incident Management',
    tags: ['incident response', 'phases', 'CISA4'],
  },

  {
    id: 'CISA4-FC-049',
    front: 'What should incident documentation include?',
    back: 'Timeline, actions taken, evidence preserved, personnel involved, impact, root cause, and lessons learned.',
    category: 'Incident Management',
    tags: ['documentation', 'incident', 'CISA4'],
  },

  
  // IT Operations
  {
    id: 'CISA4-FC-051',
    front: 'What is a runbook?',
    back: 'Documented procedures for routine operations and common problems - step-by-step operational instructions.',
    category: 'Operations',
    tags: ['runbook', 'procedures', 'CISA4'],
  },

  {
    id: 'CISA4-FC-053',
    front: 'What should job scheduling controls include?',
    back: 'Authorization of schedule changes, error detection/notification, restart procedures, and audit trails.',
    category: 'Operations',
    tags: ['job scheduling', 'controls', 'CISA4'],
  },
  {
    id: 'CISA4-FC-054',
    front: 'What is lights-out operations?',
    back: 'Data center operations with minimal on-site staff using remote monitoring and automation.',
    category: 'Operations',
    tags: ['lights-out', 'operations', 'CISA4'],
  },
  
  // Service Management
  {
    id: 'CISA4-FC-055',
    front: 'What is capacity management?',
    back: 'Ensuring IT resources meet current and future demands cost-effectively - monitoring, forecasting, and planning.',
    category: 'Service Management',
    tags: ['capacity', 'management', 'CISA4'],
  },
  {
    id: 'CISA4-FC-056',
    front: 'What is availability management?',
    back: 'Ensuring services meet availability targets - designing for reliability, monitoring, and improving uptime.',
    category: 'Service Management',
    tags: ['availability', 'management', 'CISA4'],
  },
  {
    id: 'CISA4-FC-057',
    front: 'What is first-call resolution rate?',
    back: 'Percentage of help desk issues resolved on first contact - key metric for service desk effectiveness.',
    category: 'Service Management',
    tags: ['help desk', 'metrics', 'CISA4'],
  },
  {
    id: 'CISA4-FC-058',
    front: 'What is MTBF (Mean Time Between Failures)?',
    back: 'Average time between system failures - measure of reliability.',
    category: 'Service Management',
    tags: ['MTBF', 'availability', 'CISA4'],
  },
  {
    id: 'CISA4-FC-059',
    front: 'What is MTTR (Mean Time To Repair)?',
    back: 'Average time to restore service after failure - measure of maintainability.',
    category: 'Service Management',
    tags: ['MTTR', 'availability', 'CISA4'],
  },
  
  // Physical Security

  {
    id: 'CISA4-FC-061',
    front: 'What environmental controls protect data centers?',
    back: 'HVAC (temperature/humidity), fire detection and suppression, water detection, UPS, and generators.',
    category: 'Physical Security',
    tags: ['environmental', 'controls', 'CISA4'],
  },
  {
    id: 'CISA4-FC-062',
    front: 'What is a mantrap?',
    back: 'Physical access control with two doors where only one can open at a time - prevents tailgating.',
    category: 'Physical Security',
    tags: ['mantrap', 'access control', 'CISA4'],
  },
  {
    id: 'CISA4-FC-063',
    front: 'What is tailgating/piggybacking?',
    back: 'Unauthorized person following an authorized person through a secure entrance.',
    category: 'Physical Security',
    tags: ['tailgating', 'physical', 'CISA4'],
  },
  
  // Cloud Operations
  {
    id: 'CISA4-FC-064',
    front: 'What is the cloud shared responsibility model?',
    back: 'Cloud provider manages infrastructure security; customer manages security of their data and applications (varies by service model).',
    category: 'Cloud',
    tags: ['shared responsibility', 'cloud', 'CISA4'],
  },
  {
    id: 'CISA4-FC-065',
    front: 'What are the three cloud service models?',
    back: 'IaaS (Infrastructure), PaaS (Platform), SaaS (Software) - increasing provider responsibility from IaaS to SaaS.',
    category: 'Cloud',
    tags: ['IaaS', 'PaaS', 'SaaS', 'CISA4'],
  },
  {
    id: 'CISA4-FC-066',
    front: 'What is vendor lock-in in cloud computing?',
    back: 'Dependency on specific cloud provider making migration difficult due to proprietary services, data formats, or high costs.',
    category: 'Cloud',
    tags: ['lock-in', 'cloud', 'CISA4'],
  },
  
  // Asset Management
  {
    id: 'CISA4-FC-067',
    front: 'What is end-of-life (EOL) management?',
    back: 'Process for identifying and addressing systems no longer supported by vendors - upgrade, replace, or add compensating controls.',
    category: 'Asset Management',
    tags: ['EOL', 'lifecycle', 'CISA4'],
  },
  {
    id: 'CISA4-FC-068',
    front: 'What is media sanitization?',
    back: 'Securely erasing data from storage media before disposal or reuse - degaussing, overwriting, or destruction.',
    category: 'Asset Management',
    tags: ['sanitization', 'disposal', 'CISA4'],
  },
  {
    id: 'CISA4-FC-069',
    front: 'What is the lifecycle of IT assets?',
    back: 'Acquisition, Deployment, Operation, Maintenance, Retirement/Disposal.',
    category: 'Asset Management',
    tags: ['lifecycle', 'assets', 'CISA4'],
  },
  
  // Monitoring
  {
    id: 'CISA4-FC-070',
    front: 'What should operational monitoring include?',
    back: 'System health, performance metrics, security events, availability, capacity utilization, and alert management.',
    category: 'Monitoring',
    tags: ['monitoring', 'operations', 'CISA4'],
  },
  {
    id: 'CISA4-FC-071',
    front: 'What is the purpose of log management?',
    back: 'Collecting, storing, analyzing, and retaining logs for troubleshooting, security, compliance, and investigations.',
    category: 'Monitoring',
    tags: ['logging', 'monitoring', 'CISA4'],
  },
];
