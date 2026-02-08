/**
 * CISA Domain 4: IS Operations and Business Resilience - Flashcards
 * 23% of exam weight
 */

import { Flashcard } from './types';

export const cisa4Flashcards: Flashcard[] = [
  // IT Operations
  {
    id: 'CISA4-FC-001',
    front: 'What are the main areas of IT operations?',
    back: 'Infrastructure management, service management, batch processing, security operations, monitoring, and support functions.',
    category: 'IT Operations',
    tags: ['IT operations', 'infrastructure', 'CISA4'],
  },
  {
    id: 'CISA4-FC-002',
    front: 'What is job scheduling?',
    back: 'Automated execution of batch jobs according to defined schedules and dependencies. Controls timing, sequence, and resource allocation for processing.',
    category: 'IT Operations',
    tags: ['job scheduling', 'batch processing', 'CISA4'],
  },
  {
    id: 'CISA4-FC-003',
    front: 'What are the Uptime Institute Data Center Tiers?',
    back: 'Tier I: Basic (99.671%)\nTier II: Redundant components (99.741%)\nTier III: Concurrently maintainable (99.982%)\nTier IV: Fault tolerant (99.995%)',
    category: 'Data Center',
    tags: ['data center tiers', 'availability', 'CISA4'],
  },
  
  // Physical/Environmental Security
  {
    id: 'CISA4-FC-004',
    front: 'What are the layers of physical security?',
    back: 'Perimeter (fencing, lighting) → Building (guards, reception) → Floor/Zone (badge access) → Room (biometric, mantrap) → Asset (locks, cages)',
    category: 'Physical Security',
    tags: ['physical security', 'defense in depth', 'CISA4'],
  },
  {
    id: 'CISA4-FC-005',
    front: 'What type of fire suppression is best for data centers?',
    back: 'Clean agent suppression (FM-200, Novec, inert gas). These suppress fire without leaving residue or damaging electronic equipment.',
    category: 'Environmental',
    tags: ['fire suppression', 'clean agent', 'CISA4'],
  },
  {
    id: 'CISA4-FC-006',
    front: 'What is a UPS and what is its purpose?',
    back: 'Uninterruptible Power Supply - provides battery backup for short outages, power conditioning, and surge protection. Typically 15-30 minutes runtime.',
    category: 'Environmental',
    tags: ['UPS', 'power protection', 'CISA4'],
  },
  
  // Incident Management
  {
    id: 'CISA4-FC-007',
    front: 'What is the difference between incident and problem management?',
    back: 'Incident: Restore service quickly (reactive)\nProblem: Find and fix root cause to prevent recurrence (proactive)',
    category: 'Incident Management',
    tags: ['incident', 'problem', 'ITIL', 'CISA4'],
  },
  {
    id: 'CISA4-FC-008',
    front: 'How is incident priority determined?',
    back: 'Priority = Impact × Urgency\nImpact: How many affected, severity\nUrgency: How quickly resolution is needed',
    category: 'Incident Management',
    tags: ['priority', 'impact', 'urgency', 'CISA4'],
  },
  {
    id: 'CISA4-FC-009',
    front: 'What are the types of escalation?',
    back: 'Functional: Route to specialized team for expertise\nHierarchical: Escalate to management for authority/resources',
    category: 'Incident Management',
    tags: ['escalation', 'incident response', 'CISA4'],
  },
  
  // Security Incident Response
  {
    id: 'CISA4-FC-010',
    front: 'What are the NIST incident response phases?',
    back: '1. Preparation\n2. Detection and Analysis\n3. Containment, Eradication, Recovery\n4. Post-Incident Activity',
    category: 'Security Incident',
    tags: ['NIST', 'incident response', 'phases', 'CISA4'],
  },
  {
    id: 'CISA4-FC-011',
    front: 'What is chain of custody?',
    back: 'Documented record of who handled evidence, when, and what they did. Essential for legal admissibility and forensic integrity.',
    category: 'Security Incident',
    tags: ['chain of custody', 'forensics', 'evidence', 'CISA4'],
  },
  {
    id: 'CISA4-FC-012',
    front: 'What is the first priority during security incident containment?',
    back: 'Stop the spread and limit damage while preserving evidence for investigation. Balance speed with evidence preservation.',
    category: 'Security Incident',
    tags: ['containment', 'incident response', 'CISA4'],
  },
  
  // Business Continuity
  {
    id: 'CISA4-FC-013',
    front: 'What is the difference between BCP and DRP?',
    back: 'BCP: Keeps entire business running during disruption (broader scope)\nDRP: Restores IT systems after disaster (technology focused)',
    category: 'Business Continuity',
    tags: ['BCP', 'DRP', 'difference', 'CISA4'],
  },
  {
    id: 'CISA4-FC-014',
    front: 'What are RTO, RPO, and MTD?',
    back: 'RTO: Maximum time to restore (how fast)\nRPO: Maximum data loss acceptable (how much)\nMTD: Maximum downtime before failure (overall limit)',
    category: 'Business Continuity',
    tags: ['RTO', 'RPO', 'MTD', 'recovery objectives', 'CISA4'],
  },
  {
    id: 'CISA4-FC-015',
    front: 'What is the relationship between MTD, RTO, and WRT?',
    back: 'MTD ≥ RTO + WRT\nWRT (Work Recovery Time) = time to verify systems and catch up on work after restoration.',
    category: 'Business Continuity',
    tags: ['MTD', 'RTO', 'WRT', 'formula', 'CISA4'],
  },
  
  // Recovery Sites
  {
    id: 'CISA4-FC-016',
    front: 'What are the recovery site types?',
    back: 'Cold: Facility only, no equipment (weeks to recover)\nWarm: Facility + some equipment (days)\nHot: Fully equipped and configured (hours)\nCloud: Variable, on-demand (minutes to hours)',
    category: 'Disaster Recovery',
    tags: ['recovery sites', 'cold', 'warm', 'hot', 'CISA4'],
  },
  {
    id: 'CISA4-FC-017',
    front: 'What is a reciprocal agreement?',
    back: 'Arrangement between organizations to share facilities during disasters. Low cost but limited capacity and availability concerns.',
    category: 'Disaster Recovery',
    tags: ['reciprocal agreement', 'recovery site', 'CISA4'],
  },
  
  // Backup
  {
    id: 'CISA4-FC-018',
    front: 'What are the three backup types?',
    back: 'Full: Complete copy (longest backup, fastest restore)\nIncremental: Changes since last backup (fastest backup, slowest restore)\nDifferential: Changes since last full (moderate both)',
    category: 'Backup',
    tags: ['backup types', 'full', 'incremental', 'differential', 'CISA4'],
  },
  {
    id: 'CISA4-FC-019',
    front: 'What is the difference between incremental and differential backup?',
    back: 'Incremental: Changes since last ANY backup\nDifferential: Changes since last FULL backup\nDifferential grows larger, but needs fewer tapes to restore.',
    category: 'Backup',
    tags: ['incremental', 'differential', 'comparison', 'CISA4'],
  },
  {
    id: 'CISA4-FC-020',
    front: 'What is GFS backup rotation?',
    back: 'Grandfather-Father-Son rotation:\nSon = Daily backups\nFather = Weekly backups\nGrandfather = Monthly backups\nBalances retention with media usage.',
    category: 'Backup',
    tags: ['GFS', 'rotation', 'retention', 'CISA4'],
  },
  {
    id: 'CISA4-FC-021',
    front: 'What is the most important test for backups?',
    back: 'Restore testing! A backup is worthless if you cannot restore from it. Test regularly and document recovery times.',
    category: 'Backup',
    tags: ['restore testing', 'backup validation', 'CISA4'],
  },
  
  // Replication
  {
    id: 'CISA4-FC-022',
    front: 'What is the difference between synchronous and asynchronous replication?',
    back: 'Synchronous: Write to both sites simultaneously (zero data loss, distance limited)\nAsynchronous: Write to DR after primary (some data loss possible, no distance limit)',
    category: 'Disaster Recovery',
    tags: ['replication', 'synchronous', 'asynchronous', 'CISA4'],
  },
  
  // BC/DR Testing
  {
    id: 'CISA4-FC-023',
    front: 'What are the types of BC/DR tests from least to most rigorous?',
    back: '1. Checklist review (paper)\n2. Tabletop exercise (discussion)\n3. Simulation (practice)\n4. Parallel test (recover without cutover)\n5. Full interruption (actual failover)',
    category: 'BC/DR Testing',
    tags: ['DR testing', 'exercise types', 'CISA4'],
  },
  {
    id: 'CISA4-FC-024',
    front: 'What is a tabletop exercise?',
    back: 'Discussion-based exercise where participants walk through a scenario, identifying decision points, gaps, and issues without actually recovering systems.',
    category: 'BC/DR Testing',
    tags: ['tabletop', 'exercise', 'CISA4'],
  },
  
  // Problem Management
  {
    id: 'CISA4-FC-025',
    front: 'What is the Five Whys technique?',
    back: 'Root cause analysis method that asks "Why?" repeatedly (typically 5 times) until reaching the underlying cause of a problem.',
    category: 'Problem Management',
    tags: ['five whys', 'root cause', 'RCA', 'CISA4'],
  },
  {
    id: 'CISA4-FC-026',
    front: 'What is a Known Error?',
    back: 'A problem with documented root cause and workaround, but no permanent fix yet. Stored in Known Error Database (KEDB) for faster incident resolution.',
    category: 'Problem Management',
    tags: ['known error', 'KEDB', 'ITIL', 'CISA4'],
  },
  
  // Patch Management
  {
    id: 'CISA4-FC-027',
    front: 'What is the patch management process?',
    back: '1. Identify patches available\n2. Assess applicability and priority\n3. Test in non-production\n4. Deploy with rollback plan\n5. Verify and document',
    category: 'Patch Management',
    tags: ['patch management', 'vulnerability', 'CISA4'],
  },
  {
    id: 'CISA4-FC-028',
    front: 'What is CVSS?',
    back: 'Common Vulnerability Scoring System - standard for rating vulnerability severity. Scores range 0-10 (0=None, 9-10=Critical).',
    category: 'Vulnerability Management',
    tags: ['CVSS', 'vulnerability scoring', 'CISA4'],
  },
  
  // Asset Management
  {
    id: 'CISA4-FC-029',
    front: 'What are the stages of the IT asset lifecycle?',
    back: 'Planning/Procurement → Deployment → Operation/Maintenance → Retirement/Disposal',
    category: 'Asset Management',
    tags: ['asset lifecycle', 'ITAM', 'CISA4'],
  },
  {
    id: 'CISA4-FC-030',
    front: 'What is data sanitization?',
    back: 'Process of removing data from media before disposal. Methods include overwriting, degaussing (magnetic), physical destruction, and cryptographic erasure.',
    category: 'Asset Management',
    tags: ['data sanitization', 'disposal', 'CISA4'],
  },
];

export default cisa4Flashcards;
