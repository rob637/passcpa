/**
 * CISA Domain 4: Information Systems Operations and Business Resilience
 * Batch 5 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA4_QUESTIONS_BATCH5: Question[] = [
  {
    id: 'CISA4-093',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Crisis management differs from incident management by:',
    options: [
      'Only addressing IT issues',
      'Addressing organization-wide strategic response to significant events',
      'Being more technical',
      'Having faster resolution'
    ],
    correctAnswer: 1,
    explanation: 'Crisis management addresses strategic, organization-wide response to significant events beyond operational incidents.',
    topic: 'Crisis Management',
    subtopic: 'Crisis vs Incident'
  },
  {
    id: 'CISA4-095',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Command center activation occurs when:',
    options: [
      'For all incidents',
      'Incidents exceed normal escalation thresholds',
      'Never',
      'Only for natural disasters'
    ],
    correctAnswer: 1,
    explanation: 'Command centers are activated when incidents exceed normal operational response capabilities and thresholds.',
    topic: 'Crisis Management',
    subtopic: 'Command Center'
  },
  {
    id: 'CISA4-096',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Cyber resilience differs from cybersecurity by:',
    options: [
      'Focusing only on prevention',
      'Emphasizing ability to operate despite successful attacks',
      'Ignoring security',
      'Only addressing recovery'
    ],
    correctAnswer: 1,
    explanation: 'Cyber resilience emphasizes maintaining operations despite attacks, not just preventing them.',
    topic: 'Resilience',
    subtopic: 'Cyber Resilience'
  },
  {
    id: 'CISA4-097',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Playbook documentation for incident response:',
    options: [
      'Is optional',
      'Provides step-by-step procedures for common scenarios',
      'Replaces expertise',
      'Is only for major incidents'
    ],
    correctAnswer: 1,
    explanation: 'Playbooks provide documented step-by-step procedures for common incident scenarios, enabling consistent response.',
    topic: 'Incident Management',
    subtopic: 'Playbooks'
  },
  {
    id: 'CISA4-098',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Runbook automation:',
    options: [
      'Eliminates all operators',
      'Automates routine operational procedures to improve consistency',
      'Increases manual work',
      'Only applies to security'
    ],
    correctAnswer: 1,
    explanation: 'Runbook automation automates routine operational procedures, improving consistency and reducing human error.',
    topic: 'IT Operations',
    subtopic: 'Runbook Automation'
  },
  {
    id: 'CISA4-099',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Self-healing systems:',
    options: [
      'Never fail',
      'Automatically detect and recover from failures',
      'Require no monitoring',
      'Replace all maintenance'
    ],
    correctAnswer: 1,
    explanation: 'Self-healing systems automatically detect failures and take corrective action without human intervention.',
    topic: 'IT Operations',
    subtopic: 'Self-Healing'
  },
  {
    id: 'CISA4-100',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'IT asset management lifecycle includes:',
    options: [
      'Only acquisition',
      'Request, procurement, deployment, maintenance, and disposal',
      'Only maintenance',
      'Only disposal'
    ],
    correctAnswer: 1,
    explanation: 'Asset lifecycle includes request, procurement, testing, deployment, maintenance, and proper disposal.',
    topic: 'IT Asset Management',
    subtopic: 'Asset Lifecycle'
  },
  {
    id: 'CISA4-101',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Software Asset Management (SAM) ensures:',
    options: [
      'Only cost tracking',
      'License compliance and optimization of software investments',
      'Only installation',
      'Only removal'
    ],
    correctAnswer: 1,
    explanation: 'SAM ensures license compliance, tracks entitlements, and optimizes software investments.',
    topic: 'IT Asset Management',
    subtopic: 'SAM'
  },
  {
    id: 'CISA4-102',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Configuration Management Database (CMDB) accuracy requires:',
    options: [
      'One-time population',
      'Automated discovery and reconciliation processes',
      'Manual updates only',
      'Annual reviews only'
    ],
    correctAnswer: 1,
    explanation: 'CMDB accuracy requires automated discovery, regular reconciliation, and integration with change management.',
    topic: 'Configuration Management',
    subtopic: 'CMDB'
  },
  {
    id: 'CISA4-103',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Service catalog provides:',
    options: [
      'Only technical specifications',
      'User-facing view of available IT services',
      'Only internal documentation',
      'Only pricing'
    ],
    correctAnswer: 1,
    explanation: 'Service catalog provides a user-facing view of available IT services, including descriptions and request processes.',
    topic: 'IT Service Management',
    subtopic: 'Service Catalog'
  },
  {
    id: 'CISA4-104',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Service request fulfillment:',
    options: [
      'Is same as incident management',
      'Handles pre-approved routine requests',
      'Only handles emergencies',
      'Requires CAB approval'
    ],
    correctAnswer: 1,
    explanation: 'Request fulfillment handles pre-approved routine requests (password resets, access requests) through standardized processes.',
    topic: 'IT Service Management',
    subtopic: 'Request Fulfillment'
  },
  {
    id: 'CISA4-105',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Problem management investigates:',
    options: [
      'Single incidents',
      'Root causes of recurring incidents',
      'Only major incidents',
      'Only security incidents'
    ],
    correctAnswer: 1,
    explanation: 'Problem management investigates root causes of recurring incidents to prevent future occurrences.',
    topic: 'IT Service Management',
    subtopic: 'Problem Management'
  },
  {
    id: 'CISA4-106',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Known error database (KEDB) contains:',
    options: [
      'All incidents',
      'Problems with identified root causes and workarounds',
      'Only unresolved issues',
      'Only security vulnerabilities'
    ],
    correctAnswer: 1,
    explanation: 'KEDB documents known errors with root causes and workarounds, speeding incident resolution.',
    topic: 'IT Service Management',
    subtopic: 'KEDB'
  },
  {
    id: 'CISA4-107',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Change Advisory Board (CAB) membership should include:',
    options: [
      'Only IT management',
      'Representatives from impacted areas and technical experts',
      'Only developers',
      'Only operations'
    ],
    correctAnswer: 1,
    explanation: 'CAB should include representatives from impacted business areas and relevant technical experts.',
    topic: 'Change Management',
    subtopic: 'CAB'
  },
  {
    id: 'CISA4-108',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Emergency change procedures should:',
    options: [
      'Skip all approvals',
      'Provide expedited approval while ensuring documentation',
      'Avoid documentation',
      'Not exist'
    ],
    correctAnswer: 1,
    explanation: 'Emergency changes require expedited approval processes but must still be documented and reviewed post-implementation.',
    topic: 'Change Management',
    subtopic: 'Emergency Change'
  },
  {
    id: 'CISA4-109',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Change success rate metrics indicate:',
    options: [
      'Only volume',
      'Effectiveness of change management processes',
      'Only speed',
      'Only cost'
    ],
    correctAnswer: 1,
    explanation: 'Change success rate indicates process effectiveness by measuring changes implemented without causing incidents.',
    topic: 'Change Management',
    subtopic: 'Change Metrics'
  },
  {
    id: 'CISA4-110',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Release management coordinates:',
    options: [
      'Only code deployment',
      'Building, testing, and deploying changes to production',
      'Only testing',
      'Only documentation'
    ],
    correctAnswer: 1,
    explanation: 'Release management coordinates building, testing, and deploying changes to production environments.',
    topic: 'Release Management',
    subtopic: 'Release Process'
  },
  {
    id: 'CISA4-111',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Immutable infrastructure means:',
    options: [
      'Never updating',
      'Replacing rather than modifying deployed components',
      'Manual changes only',
      'No automation'
    ],
    correctAnswer: 1,
    explanation: 'Immutable infrastructure replaces deployed components rather than modifying them, ensuring consistency.',
    topic: 'IT Operations',
    subtopic: 'Immutable Infrastructure'
  },
  {
    id: 'CISA4-112',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Deployment pipelines:',
    options: [
      'Are only for code',
      'Automate build, test, and deployment processes',
      'Require manual intervention',
      'Skip testing'
    ],
    correctAnswer: 1,
    explanation: 'Deployment pipelines automate the flow from code commit through build, test, and deployment.',
    topic: 'DevOps',
    subtopic: 'Deployment Pipeline'
  },
  {
    id: 'CISA4-113',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Environment parity means:',
    options: [
      'Different environments',
      'Consistent configuration across development, test, and production',
      'Only production matters',
      'Test environments are optional'
    ],
    correctAnswer: 1,
    explanation: 'Environment parity ensures development, test, and production environments are consistently configured.',
    topic: 'IT Operations',
    subtopic: 'Environment Parity'
  },
  {
    id: 'CISA4-114',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Database replication lag monitoring:',
    options: [
      'Is unnecessary for synchronous replication',
      'Ensures data consistency and failover readiness',
      'Only applies to backups',
      'Is optional'
    ],
    correctAnswer: 1,
    explanation: 'Replication lag monitoring ensures acceptable data consistency and failover readiness for recovery.',
    topic: 'Data Management',
    subtopic: 'Replication'
  },
  {
    id: 'CISA4-115',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Storage tiering optimizes:',
    options: [
      'Only speed',
      'Cost and performance by matching data to appropriate storage',
      'Only security',
      'Only capacity'
    ],
    correctAnswer: 1,
    explanation: 'Storage tiering optimizes cost and performance by placing data on appropriate storage tiers based on access patterns.',
    topic: 'Data Management',
    subtopic: 'Storage Tiering'
  },
  {
    id: 'CISA4-116',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Data archiving differs from backup by:',
    options: [
      'Being faster',
      'Moving data for long-term retention rather than recovery',
      'Being more secure',
      'Being automatic'
    ],
    correctAnswer: 1,
    explanation: 'Archiving moves data for long-term retention and compliance, while backups protect for recovery purposes.',
    topic: 'Data Management',
    subtopic: 'Archiving'
  },
  {
    id: 'CISA4-117',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Data retention policies should consider:',
    options: [
      'Only storage cost',
      'Legal requirements, business needs, and privacy obligations',
      'Only convenience',
      'Only technical limitations'
    ],
    correctAnswer: 1,
    explanation: 'Retention policies must balance legal requirements, business needs, storage costs, and privacy obligations.',
    topic: 'Data Management',
    subtopic: 'Retention'
  },
  {
    id: 'CISA4-118',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Network performance monitoring should track:',
    options: [
      'Only bandwidth',
      'Latency, bandwidth, packet loss, and jitter',
      'Only errors',
      'Only uptime'
    ],
    correctAnswer: 1,
    explanation: 'Network monitoring should track latency, bandwidth utilization, packet loss, jitter, and availability.',
    topic: 'Network Operations',
    subtopic: 'Performance Monitoring'
  },
  {
    id: 'CISA4-119',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Network segmentation in operations helps:',
    options: [
      'Only security',
      'Contain issues and manage traffic for both security and performance',
      'Only performance',
      'Only compliance'
    ],
    correctAnswer: 1,
    explanation: 'Segmentation helps contain security issues, manage traffic, and improve both security and performance.',
    topic: 'Network Operations',
    subtopic: 'Segmentation'
  },
  {
    id: 'CISA4-120',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'SD-WAN (Software-Defined WAN) provides:',
    options: [
      'Only cost reduction',
      'Centralized control and dynamic path selection across WAN',
      'Only security',
      'Only monitoring'
    ],
    correctAnswer: 1,
    explanation: 'SD-WAN provides centralized management, dynamic path selection, and optimization across WAN connections.',
    topic: 'Network Operations',
    subtopic: 'SD-WAN'
  },
  {
    id: 'CISA4-121',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Cloud operations require:',
    options: [
      'No monitoring',
      'Different operational practices from on-premises',
      'Same practices as on-premises',
      'Less governance'
    ],
    correctAnswer: 1,
    explanation: 'Cloud operations require adapted practices for consumption-based billing, shared responsibility, and provider-specific tools.',
    topic: 'Cloud Operations',
    subtopic: 'Cloud Ops'
  },
  {
    id: 'CISA4-122',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'FinOps (Cloud Financial Operations) focuses on:',
    options: [
      'Only security',
      'Optimizing cloud spend through visibility and accountability',
      'Only compliance',
      'Only performance'
    ],
    correctAnswer: 1,
    explanation: 'FinOps focuses on cloud financial management, optimizing spend through visibility, accountability, and optimization.',
    topic: 'Cloud Operations',
    subtopic: 'FinOps'
  },
];

export default CISA4_QUESTIONS_BATCH5;
