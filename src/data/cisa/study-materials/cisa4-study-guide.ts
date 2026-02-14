/**
 * CISA Domain 4 Study Guide
 * Information Systems Operations and Business Resilience
 * 
 * Based on 2024 ISACA CISA Exam Content Outline
 * Weight: 23% (approximately 35 questions)
 */

import { CISAStudyGuide } from './cisa1-study-guide';

export const CISA4_STUDY_GUIDE: CISAStudyGuide = {
  id: 'cisa4-study-guide',
  section: 'CISA4',
  title: 'Domain 4: Information Systems Operations and Business Resilience',
  version: '2024',
  lastUpdated: '2026-02-10',

  examFormat: {
    totalQuestions: 150,
    questionType: 'Multiple Choice Questions (MCQ)',
    duration: '4 hours',
    passingScore: '450 scaled score (out of 800)',
  },

  blueprintAreas: [
    // =====================================================
    // Domain 4A: IS Operations
    // =====================================================
    {
      id: 'CISA4-A',
      title: 'IS Operations',
      weight: '~8%',
      overview: 'Understanding IT operations including infrastructure, scheduling, monitoring, and incident management to ensure reliable service delivery.',

      keyTopics: [
        {
          name: 'IT Service Management',
          description: 'ITIL-based service management practices',
          keyPoints: [
            'ITIL: IT Infrastructure Library - service management framework',
            'Service Level Agreements (SLAs) define expected service levels',
            'Key metrics: availability, response time, throughput',
            'Incident vs Problem management distinction',
            'Change Management: CAB approval, testing, rollback plans',
          ],
        },
        {
          name: 'Data Center Operations',
          description: 'Physical and environmental controls for IT infrastructure',
          keyPoints: [
            'Environmental controls: HVAC, humidity, fire suppression',
            'Physical security: biometrics, mantraps, security guards',
            'Power: UPS, generators, dual feeds, PDUs',
            'Tier classification (1-4) based on redundancy level',
            'Hot/warm/cold aisles for cooling efficiency',
          ],
        },
        {
          name: 'Job Scheduling and Batch Processing',
          description: 'Automated processing and monitoring',
          keyPoints: [
            'Job scheduling software automates batch processing',
            'Dependencies between jobs must be managed',
            'Monitoring for job failures and delays',
            'Restart and recovery procedures documented',
            'Audit trails for all batch processes',
          ],
        },
        {
          name: 'End-User Computing',
          description: 'Managing user-developed applications',
          keyPoints: [
            'Shadow IT risks: unauthorized applications',
            'Spreadsheet controls: version control, access, validation',
            'EUC governance policies required',
            'Risk: lack of testing, documentation, change control',
            'Mitigation: inventory, risk assessment, standards',
          ],
        },
      ],
      criticalFormulas: [
        'Availability = (Total Time - Downtime) / Total Time × 100%',
        'MTBF = Total Operating Time / Number of Failures',
        'MTTR = Total Repair Time / Number of Repairs',
      ],
      examTips: [
        'Change management requires CAB approval before implementation',
        'Know the difference between incident and problem management',
        'EUC poses significant risk without governance',
      ],
    },
    // =====================================================
    // Domain 4B: Business Resilience
    // =====================================================
    {
      id: 'CISA4-B',
      title: 'Business Resilience',
      weight: '~15%',
      overview: 'Business continuity planning, disaster recovery, and ensuring organizational resilience against disruptions.',

      keyTopics: [
        {
          name: 'Business Continuity Planning (BCP)',
          description: 'Maintaining critical business functions during disruption',
          keyPoints: [
            'BCP ensures business can continue operating during disruption',
            'Business Impact Analysis (BIA) identifies critical processes',
            'BIA determines RTO, RPO, MTPD for each process',
            'BCP scope: people, processes, technology, facilities',
            'Regular testing and updates required (at least annually)',
          ],
        },
        {
          name: 'Business Impact Analysis (BIA)',
          description: 'Identifying critical processes and recovery requirements',
          keyPoints: [
            'Identifies critical business processes and dependencies',
            'Quantifies financial and operational impact of disruption',
            'Determines recovery time objectives (RTO)',
            'Establishes recovery point objectives (RPO)',
            'Maximum Tolerable Downtime (MTD) / MTPD defined',
          ],
        },
        {
          name: 'Key Recovery Metrics',
          description: 'Critical time-based recovery objectives',
          keyPoints: [
            'RTO: Recovery Time Objective - how quickly to recover',
            'RPO: Recovery Point Objective - acceptable data loss window',
            'MTPD: Maximum Tolerable Period of Disruption',
            'WRT: Work Recovery Time - time to verify and catch up',
            'RTO + WRT must be ≤ MTPD',
          ],
        },
        {
          name: 'Disaster Recovery Planning (DRP)',
          description: 'Technical recovery of IT systems',
          keyPoints: [
            'DRP is the technical component of BCP',
            'Hot site: Fully equipped, ready immediately',
            'Warm site: Equipment present, data needs restoration',
            'Cold site: Facilities only, equipment must be installed',
            'Cloud DR: increasingly common, test thoroughly',
          ],
        },
        {
          name: 'Recovery Site Types',
          description: 'Alternative processing locations',
          keyPoints: [
            'Hot site: Minutes to hours RTO, highest cost',
            'Warm site: Hours to days RTO, moderate cost',
            'Cold site: Days to weeks RTO, lowest cost',
            'Mobile sites: Transportable facilities',
            'Reciprocal agreements: mutual aid between organizations',
          ],
        },
        {
          name: 'Backup Strategies',
          description: 'Data protection and recovery approaches',
          keyPoints: [
            'Full backup: Complete data copy, longest time',
            'Incremental: Only changes since last backup',
            'Differential: Changes since last full backup',
            '3-2-1 rule: 3 copies, 2 media types, 1 offsite',
            'Test restores regularly - backups fail silently',
          ],
        },
        {
          name: 'DR Testing Types',
          description: 'Validating disaster recovery capabilities',
          keyPoints: [
            'Checklist/desk review: Walk through documentation',
            'Structured walkthrough: Team reviews plan together',
            'Simulation: Roles played without actual recovery',
            'Parallel test: Systems recovered alongside production',
            'Full interruption: Complete switchover (highest risk)',
          ],
        },
      ],
      criticalFormulas: [
        'RTO + WRT ≤ MTPD',
        'RPO determines backup frequency',
        'Site cost is inversely related to RTO',
      ],
      examTips: [
        'BIA must be completed before developing BCP',
        'Hot sites have shortest RTO but highest cost',
        'Always test backups with actual restores',
        'Full interruption tests are riskiest but most thorough',
      ],
    },
  ],

  studyPlan: [
    {
      week: 1,
      focus: 'IS Operations',
      topics: ['IT service management', 'Data center operations', 'Job scheduling', 'EUC risks'],
      hours: 12,
      activities: ['Read CISA Review Manual Domain 4A', 'Practice operations questions', 'ITIL fundamentals review'],
    },
    {
      week: 2,
      focus: 'BCP and BIA',
      topics: ['BIA process', 'RTO/RPO/MTPD', 'BCP development', 'Recovery strategies'],
      hours: 14,
      activities: ['Memorize recovery metrics', 'Practice BIA questions', 'Understand BCP lifecycle'],
    },
    {
      week: 3,
      focus: 'Disaster Recovery',
      topics: ['Recovery sites', 'Backup strategies', 'DR testing', 'Cloud DR'],
      hours: 10,
      activities: ['Compare site types', 'Practice DR questions', 'Review testing approaches'],
    },
  ],

  examTips: [
    'BIA identifies WHAT needs protection; BCP addresses HOW',
    'RTO + WRT must never exceed MTPD',
    'Hot sites = fast recovery = high cost',
    'Cold sites = slow recovery = low cost',
    'Reciprocal agreements are lowest cost but least reliable',
    'Always test DR plans - untested plans will fail',
    'RPO determines minimum backup frequency',
    'Change management always requires testing and approval',
  ],

  commonMistakes: [
    'Confusing RTO (time to recover) with RPO (data loss tolerance)',
    'Not understanding that BIA must precede BCP development',
    'Forgetting that hot sites are ready immediately but expensive',
    'Assuming cloud automatically provides disaster recovery',
    'Overlooking the need for regular testing and plan updates',
  ],
};
