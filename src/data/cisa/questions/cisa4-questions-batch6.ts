/**
 * CISA Domain 4: Information Systems Operations and Business Resilience
 * Batch 6 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA4_QUESTIONS_BATCH6: Question[] = [
  {
    id: 'cisa4-123',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Operational resilience focuses on:',
    options: [
      'Only IT recovery',
      'Ability to continue critical business services during disruptions',
      'Only backup systems',
      'Only disaster recovery'
    ],
    correctAnswer: 1,
    explanation: 'Operational resilience focuses on maintaining critical business services during and after disruptions.',
    topic: 'Resilience',
    subtopic: 'Operational Resilience'
  },
  {
    id: 'cisa4-124',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Impact tolerances define:',
    options: [
      'Recovery costs',
      'Maximum acceptable disruption to important business services',
      'Only IT metrics',
      'Vendor requirements'
    ],
    correctAnswer: 1,
    explanation: 'Impact tolerances define maximum tolerable disruption levels for important business services.',
    topic: 'Resilience',
    subtopic: 'Impact Tolerance'
  },
  {
    id: 'cisa4-125',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Business process mapping for resilience identifies:',
    options: [
      'Only IT systems',
      'Critical processes, dependencies, and single points of failure',
      'Only staff requirements',
      'Only cost centers'
    ],
    correctAnswer: 1,
    explanation: 'Process mapping identifies critical processes, their dependencies, and potential single points of failure.',
    topic: 'Business Continuity',
    subtopic: 'Process Mapping'
  },
  {
    id: 'cisa4-126',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Third-party resilience requires:',
    options: [
      'Only SLAs',
      'Understanding provider dependencies and testing recovery capabilities',
      'Contractual terms only',
      'Insurance only'
    ],
    correctAnswer: 1,
    explanation: 'Third-party resilience requires understanding dependencies and validating provider recovery capabilities.',
    topic: 'Business Continuity',
    subtopic: 'Third-Party Resilience'
  },
  {
    id: 'cisa4-127',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Scenario-based resilience testing should include:',
    options: [
      'Only known risks',
      'Severe but plausible scenarios including combination events',
      'Only minor disruptions',
      'Only IT failures'
    ],
    correctAnswer: 1,
    explanation: 'Resilience testing should include severe but plausible scenarios, including combination events.',
    topic: 'Business Continuity',
    subtopic: 'Scenario Testing'
  },
  {
    id: 'cisa4-128',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Communication plans during incidents should address:',
    options: [
      'Only IT staff',
      'Internal stakeholders, customers, regulators, and media',
      'Only executives',
      'Only vendors'
    ],
    correctAnswer: 1,
    explanation: 'Communication plans should address all stakeholders including employees, customers, regulators, and media.',
    topic: 'Incident Management',
    subtopic: 'Crisis Communication'
  },
  {
    id: 'cisa4-129',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Major incident management differs from normal incidents by:',
    options: [
      'Having same processes',
      'Requiring dedicated incident commander and cross-functional coordination',
      'Being faster',
      'Needing less documentation'
    ],
    correctAnswer: 1,
    explanation: 'Major incidents require dedicated incident command, cross-functional coordination, and executive engagement.',
    topic: 'Incident Management',
    subtopic: 'Major Incidents'
  },
  {
    id: 'cisa4-130',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'War rooms during major incidents provide:',
    options: [
      'Only physical space',
      'Centralized coordination, communication, and decision-making',
      'Only technical support',
      'Only documentation'
    ],
    correctAnswer: 1,
    explanation: 'War rooms provide centralized coordination, communication, and decision-making during major incidents.',
    topic: 'Incident Management',
    subtopic: 'War Room'
  },
  {
    id: 'cisa4-131',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Incident classification criteria should include:',
    options: [
      'Only technical impact',
      'Business impact, urgency, and scope of affected services',
      'Only response time',
      'Only system type'
    ],
    correctAnswer: 1,
    explanation: 'Classification should consider business impact, urgency, scope, and affected services/users.',
    topic: 'Incident Management',
    subtopic: 'Classification'
  },
  {
    id: 'cisa4-132',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Service availability is calculated as:',
    options: [
      'Uptime only',
      '(Agreed service time - Downtime) / Agreed service time × 100',
      'Total hours - Outages',
      'Uptime minus maintenance'
    ],
    correctAnswer: 1,
    explanation: 'Availability = (Agreed service time - Downtime) / Agreed service time × 100%.',
    topic: 'IT Service Management',
    subtopic: 'Availability Calculation'
  },
  {
    id: 'cisa4-133',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Planned maintenance windows should:',
    options: [
      'Be random',
      'Be scheduled during low-impact periods with stakeholder notification',
      'Avoid user notification',
      'Be during peak hours'
    ],
    correctAnswer: 1,
    explanation: 'Maintenance windows should be during low-impact periods with advance stakeholder notification.',
    topic: 'IT Operations',
    subtopic: 'Maintenance Windows'
  },
  {
    id: 'cisa4-135',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Standard changes require:',
    options: [
      'Full CAB approval each time',
      'Pre-approved procedures for low-risk, repeatable changes',
      'No documentation',
      'Management approval each time'
    ],
    correctAnswer: 1,
    explanation: 'Standard changes are pre-approved low-risk changes with documented procedures applied without individual CAB review.',
    topic: 'Change Management',
    subtopic: 'Standard Changes'
  },
  {
    id: 'cisa4-136',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Post-implementation review of changes should assess:',
    options: [
      'Only success',
      'Whether objectives were met and any lessons learned',
      'Only failures',
      'Only costs'
    ],
    correctAnswer: 1,
    explanation: 'Post-implementation review assesses if objectives were met and captures lessons learned.',
    topic: 'Change Management',
    subtopic: 'PIR'
  },
  {
    id: 'cisa4-137',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Batch job scheduling controls should include:',
    options: [
      'Only start times',
      'Dependencies, resource allocation, failure handling, and monitoring',
      'Only priorities',
      'Only completion logs'
    ],
    correctAnswer: 1,
    explanation: 'Job scheduling requires managing dependencies, resources, failure handling, and monitoring.',
    topic: 'IT Operations',
    subtopic: 'Job Scheduling'
  },
  {
    id: 'cisa4-138',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Database administration controls should include:',
    options: [
      'Only backups',
      'Access control, monitoring, performance tuning, and backup/recovery',
      'Only capacity',
      'Only schema design'
    ],
    correctAnswer: 1,
    explanation: 'DBA controls include access control, activity monitoring, performance optimization, and backup/recovery.',
    topic: 'Data Management',
    subtopic: 'Database Administration'
  },
  {
    id: 'cisa4-139',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Backup verification should include:',
    options: [
      'Only completion status',
      'Integrity checks and periodic restore testing',
      'Only size verification',
      'Only duration'
    ],
    correctAnswer: 1,
    explanation: 'Backup verification includes integrity checks and periodic restore testing to ensure recoverability.',
    topic: 'Data Management',
    subtopic: 'Backup Verification'
  },
  {
    id: 'cisa4-140',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Off-site backup storage should:',
    options: [
      'Be next door',
      'Be sufficiently distant to survive regional disasters',
      'Be online only',
      'Be at same facility'
    ],
    correctAnswer: 1,
    explanation: 'Off-site storage should be sufficiently distant to survive regional disasters affecting primary site.',
    topic: 'Disaster Recovery',
    subtopic: 'Off-Site Storage'
  },
  {
    id: 'cisa4-141',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Immutable backups protect against:',
    options: [
      'Only accidental deletion',
      'Ransomware and malicious modification by preventing changes',
      'Only hardware failure',
      'Only user errors'
    ],
    correctAnswer: 1,
    explanation: 'Immutable backups cannot be modified or deleted for a defined period, protecting against ransomware.',
    topic: 'Data Management',
    subtopic: 'Immutable Backup'
  },
  {
    id: 'cisa4-142',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Network operations center (NOC) responsibilities include:',
    options: [
      'Only monitoring',
      'Monitoring, initial response, escalation, and coordination',
      'Only physical security',
      'Only help desk'
    ],
    correctAnswer: 1,
    explanation: 'NOC provides monitoring, initial response, escalation, and coordination for network operations.',
    topic: 'IT Operations',
    subtopic: 'NOC'
  },
  {
    id: 'cisa4-143',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Event correlation reduces:',
    options: [
      'All events',
      'Alert noise by identifying related events',
      'Only critical events',
      'Monitoring capability'
    ],
    correctAnswer: 1,
    explanation: 'Event correlation identifies related events, reducing noise and enabling identification of root causes.',
    topic: 'IT Operations',
    subtopic: 'Event Correlation'
  },
  {
    id: 'cisa4-144',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Alert thresholds should be:',
    options: [
      'Set once and never changed',
      'Tuned based on baselines and adjusted to reduce false positives',
      'As sensitive as possible',
      'Identical for all systems'
    ],
    correctAnswer: 1,
    explanation: 'Thresholds should be tuned based on baselines and adjusted to balance detection with false positives.',
    topic: 'IT Operations',
    subtopic: 'Alert Thresholds'
  },
  {
    id: 'cisa4-145',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Log retention periods should consider:',
    options: [
      'Only storage costs',
      'Regulatory requirements, investigation needs, and operational use',
      'Only convenience',
      'Only technical limits'
    ],
    correctAnswer: 1,
    explanation: 'Log retention should consider regulatory requirements, investigation needs, and operational requirements.',
    topic: 'IT Operations',
    subtopic: 'Log Retention'
  },
  {
    id: 'cisa4-146',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Time synchronization (NTP) is important for:',
    options: [
      'Only scheduling',
      'Log correlation, authentication, and forensic investigation',
      'Only backups',
      'Only performance'
    ],
    correctAnswer: 1,
    explanation: 'Time synchronization is critical for log correlation, authentication protocols, and forensic investigations.',
    topic: 'IT Operations',
    subtopic: 'Time Synchronization'
  },
  {
    id: 'cisa4-147',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'End-of-life (EOL) systems should be:',
    options: [
      'Continued indefinitely',
      'Identified, risk-assessed, and migrated or compensated',
      'Ignored',
      'Only documented'
    ],
    correctAnswer: 1,
    explanation: 'EOL systems should be identified, risk-assessed, and either migrated or protected with compensating controls.',
    topic: 'IT Operations',
    subtopic: 'EOL Management'
  },
  {
    id: 'cisa4-148',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Capacity trending analysis helps:',
    options: [
      'Only current status',
      'Predict future capacity needs before they become critical',
      'Only historical review',
      'Only cost analysis'
    ],
    correctAnswer: 1,
    explanation: 'Trending analysis predicts future capacity needs enabling proactive planning before issues occur.',
    topic: 'IT Operations',
    subtopic: 'Capacity Trending'
  },
  {
    id: 'cisa4-149',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Print management controls should address:',
    options: [
      'Only paper usage',
      'Confidential printing, access control, and audit trails',
      'Only costs',
      'Only capacity'
    ],
    correctAnswer: 1,
    explanation: 'Print management should address secure printing, access control, and audit trails for sensitive documents.',
    topic: 'IT Operations',
    subtopic: 'Print Management'
  },
  {
    id: 'cisa4-150',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Data center site selection considers:',
    options: [
      'Only cost',
      'Natural disasters, utilities, connectivity, and accessibility',
      'Only size',
      'Only proximity'
    ],
    correctAnswer: 1,
    explanation: 'Site selection considers natural disaster risk, utility availability, connectivity, and accessibility.',
    topic: 'Data Center',
    subtopic: 'Site Selection'
  },
  {
    id: 'cisa4-151',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'UPS systems provide:',
    options: [
      'Permanent power',
      'Short-term power during outages until generators start',
      'Only surge protection',
      'Only monitoring'
    ],
    correctAnswer: 1,
    explanation: 'UPS provides short-term power during outages, bridging until generators start or allowing graceful shutdown.',
    topic: 'Data Center',
    subtopic: 'UPS'
  },
  {
    id: 'cisa4-152',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Generator testing should include:',
    options: [
      'Only visual inspection',
      'Regular load testing to verify capability',
      'Only fuel checks',
      'Only automatic start'
    ],
    correctAnswer: 1,
    explanation: 'Generator testing should include regular load testing to verify the generator can handle required loads.',
    topic: 'Data Center',
    subtopic: 'Generator Testing'
  },
];

export default CISA4_QUESTIONS_BATCH6;
