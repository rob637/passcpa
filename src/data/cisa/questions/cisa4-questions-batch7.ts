/**
 * CISA Domain 4: Information Systems Operations and Business Resilience
 * Batch 7 - 20 MCQs (Final batch for Domain 4)
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA4_QUESTIONS_BATCH7: Question[] = [
  {
    id: 'CISA4-153',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Digital twin technology for operations enables:',
    options: [
      'Only visualization',
      'Simulation, prediction, and optimization of physical systems',
      'Only monitoring',
      'Only documentation'
    ],
    correctAnswer: 1,
    explanation: 'Digital twins enable simulation, predictive analysis, and optimization of physical systems.',
    topic: 'Operations Management',
    subtopic: 'Digital Twin'
  },
  {
    id: 'CISA4-154',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Edge computing operations require consideration of:',
    options: [
      'Only centralized management',
      'Latency requirements, connectivity, and distributed security',
      'Only cloud integration',
      'Only cost'
    ],
    correctAnswer: 1,
    explanation: 'Edge computing requires managing latency, connectivity challenges, and distributed security.',
    topic: 'IT Operations',
    subtopic: 'Edge Computing'
  },
  {
    id: 'CISA4-155',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Sustainability in IT operations addresses:',
    options: [
      'Only cost reduction',
      'Energy efficiency, carbon footprint, and e-waste management',
      'Only compliance',
      'Only performance'
    ],
    correctAnswer: 1,
    explanation: 'IT sustainability addresses energy efficiency, carbon footprint reduction, and e-waste.',
    topic: 'IT Operations',
    subtopic: 'Sustainability'
  },
  {
    id: 'CISA4-156',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Predictive operations (AIOps) uses:',
    options: [
      'Only manual analysis',
      'Machine learning to predict and prevent operational issues',
      'Only historical data',
      'Only alerts'
    ],
    correctAnswer: 1,
    explanation: 'AIOps uses ML to predict operational issues and enable proactive remediation.',
    topic: 'IT Operations',
    subtopic: 'AIOps'
  },
  {
    id: 'CISA4-157',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Immutable logging ensures:',
    options: [
      'Log deletion capability',
      'Tamper-evident log storage for forensic integrity',
      'Only compression',
      'Only retention'
    ],
    correctAnswer: 1,
    explanation: 'Immutable logging provides tamper-evident storage essential for forensic integrity.',
    topic: 'IT Operations',
    subtopic: 'Logging'
  },
  {
    id: 'CISA4-158',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Geo-redundancy planning considers:',
    options: [
      'Only cost savings',
      'Data residency, latency, and regional failure scenarios',
      'Only performance',
      'Only compliance'
    ],
    correctAnswer: 1,
    explanation: 'Geo-redundancy planning considers data residency, latency, and regional failure scenarios.',
    topic: 'Business Resilience',
    subtopic: 'Geo-Redundancy'
  },
  {
    id: 'CISA4-159',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Ransomware resilience strategies include:',
    options: [
      'Only payment preparation',
      'Immutable backups, network segmentation, and detection capabilities',
      'Only insurance',
      'Only user training'
    ],
    correctAnswer: 1,
    explanation: 'Ransomware resilience requires immutable backups, segmentation, and detection capabilities.',
    topic: 'Business Resilience',
    subtopic: 'Ransomware Resilience'
  },
  {
    id: 'CISA4-160',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Service reliability engineering (SRE) balances:',
    options: [
      'Only availability',
      'Reliability targets with innovation velocity',
      'Only cost',
      'Only performance'
    ],
    correctAnswer: 1,
    explanation: 'SRE balances reliability targets (error budgets) with innovation and feature development.',
    topic: 'IT Operations',
    subtopic: 'SRE'
  },
  {
    id: 'CISA4-161',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'IT asset disposition (ITAD) must ensure:',
    options: [
      'Only cost recovery',
      'Secure data destruction and environmental compliance',
      'Only recycling',
      'Only resale'
    ],
    correctAnswer: 1,
    explanation: 'ITAD must ensure secure data destruction and environmental/regulatory compliance.',
    topic: 'IT Operations',
    subtopic: 'Asset Disposition'
  },
  {
    id: 'CISA4-162',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Operational technology (OT) security differs from IT by:',
    options: [
      'No difference',
      'Prioritizing availability and safety over confidentiality',
      'Only using different vendors',
      'Only using older systems'
    ],
    correctAnswer: 1,
    explanation: 'OT security prioritizes availability and safety, whereas IT typically prioritizes confidentiality.',
    topic: 'IT Operations',
    subtopic: 'OT Security'
  },
  {
    id: 'CISA4-163',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Real-time data replication for DR should monitor:',
    options: [
      'Only storage usage',
      'Replication lag, data integrity, and failover readiness',
      'Only network bandwidth',
      'Only cost'
    ],
    correctAnswer: 1,
    explanation: 'DR replication monitoring covers lag, integrity verification, and failover readiness.',
    topic: 'Business Resilience',
    subtopic: 'Data Replication'
  },
  {
    id: 'CISA4-164',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Event correlation in SIEM helps identify:',
    options: [
      'Only single events',
      'Patterns and relationships indicating security incidents',
      'Only log volume',
      'Only compliance gaps'
    ],
    correctAnswer: 1,
    explanation: 'SIEM correlation identifies patterns and relationships that indicate security incidents.',
    topic: 'IT Operations',
    subtopic: 'SIEM'
  },
  {
    id: 'CISA4-165',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Operational resilience differs from DR by focusing on:',
    options: [
      'Only technology recovery',
      'End-to-end service continuity across people, process, and technology',
      'Only backup operations',
      'Only compliance'
    ],
    correctAnswer: 1,
    explanation: 'Operational resilience focuses on end-to-end service continuity, not just technology.',
    topic: 'Business Resilience',
    subtopic: 'Operational Resilience'
  },
  {
    id: 'CISA4-166',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Chaos testing in production should:',
    options: [
      'Never be done',
      'Be carefully controlled with rollback capabilities',
      'Cause maximum disruption',
      'Bypass all approvals'
    ],
    correctAnswer: 1,
    explanation: 'Production chaos testing requires careful controls, monitoring, and rollback capabilities.',
    topic: 'IT Operations',
    subtopic: 'Chaos Testing'
  },
  {
    id: 'CISA4-167',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Multi-region cloud deployment for resilience must address:',
    options: [
      'Only cost allocation',
      'Data sovereignty, synchronization, and traffic routing',
      'Only vendor lock-in',
      'Only performance'
    ],
    correctAnswer: 1,
    explanation: 'Multi-region deployment addresses data sovereignty, synchronization, and traffic routing.',
    topic: 'Business Resilience',
    subtopic: 'Multi-Region Architecture'
  },
  {
    id: 'CISA4-168',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Cyber insurance claims require:',
    options: [
      'Minimal documentation',
      'Comprehensive incident documentation and forensic evidence',
      'Only financial statements',
      'Only policy numbers'
    ],
    correctAnswer: 1,
    explanation: 'Cyber insurance claims require comprehensive incident documentation and forensic evidence.',
    topic: 'Business Resilience',
    subtopic: 'Cyber Insurance'
  },
  {
    id: 'CISA4-169',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Runbook automation reduces:',
    options: [
      'Only documentation',
      'Human error and response time for operational procedures',
      'Only training needs',
      'Only staffing'
    ],
    correctAnswer: 1,
    explanation: 'Runbook automation reduces human error and improves response times for operations.',
    topic: 'IT Operations',
    subtopic: 'Runbook Automation'
  },
  {
    id: 'CISA4-170',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Post-incident reviews should focus on:',
    options: [
      'Blame assignment',
      'System improvement and learning without blame',
      'Only cost recovery',
      'Only compliance reporting'
    ],
    correctAnswer: 1,
    explanation: 'Post-incident reviews focus on blameless learning and system improvement.',
    topic: 'Incident Management',
    subtopic: 'Post-Incident Review'
  },
  {
    id: 'CISA4-171',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Third-party operational dependencies should be:',
    options: [
      'Ignored after contract signing',
      'Continuously monitored and included in resilience testing',
      'Only reviewed annually',
      'Only assessed initially'
    ],
    correctAnswer: 1,
    explanation: 'Third-party dependencies require continuous monitoring and inclusion in resilience testing.',
    topic: 'Business Resilience',
    subtopic: 'Third-Party Resilience'
  },
  {
    id: 'CISA4-172',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Capacity planning for cloud resources should consider:',
    options: [
      'Only current usage',
      'Growth projections, burst capacity, and cost optimization',
      'Only peak loads',
      'Only average usage'
    ],
    correctAnswer: 1,
    explanation: 'Cloud capacity planning considers growth, burst needs, and cost optimization strategies.',
    topic: 'IT Operations',
    subtopic: 'Capacity Planning'
  },
];

export default CISA4_QUESTIONS_BATCH7;
