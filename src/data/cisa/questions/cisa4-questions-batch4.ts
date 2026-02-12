/**
 * CISA Domain 4: Information Systems Operations and Business Resilience
 * Batch 4 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA4_QUESTIONS_BATCH4: Question[] = [
  {
    id: 'cisa4-063',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Chaos engineering:',
    options: [
      'Creates random problems',
      'Tests system resilience through controlled failure injection',
      'Destroys systems intentionally',
      'Avoids testing failure scenarios'
    ],
    correctAnswer: 1,
    explanation: 'Chaos engineering tests system resilience by deliberately injecting controlled failures to identify weaknesses.',
    topic: 'Resilience',
    subtopic: 'Chaos Engineering'
  },
  {
    id: 'cisa4-064',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Service degradation strategies enable:',
    options: [
      'Complete failure',
      'Reduced functionality to maintain core services under stress',
      'Full functionality always',
      'Immediate shutdown'
    ],
    correctAnswer: 1,
    explanation: 'Graceful degradation maintains core services with reduced functionality when systems are under stress rather than failing completely.',
    topic: 'Resilience',
    subtopic: 'Graceful Degradation'
  },
  {
    id: 'cisa4-065',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Circuit breaker pattern prevents:',
    options: [
      'All requests',
      'Cascading failures by stopping requests to failing services',
      'Successful requests',
      'Load balancing'
    ],
    correctAnswer: 1,
    explanation: 'Circuit breakers prevent cascading failures by stopping requests to failing services, allowing them to recover.',
    topic: 'Resilience',
    subtopic: 'Circuit Breaker'
  },
  {
    id: 'cisa4-066',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Auto-scaling provides:',
    options: [
      'Fixed capacity',
      'Dynamic resource adjustment based on demand',
      'Reduced availability',
      'Manual intervention'
    ],
    correctAnswer: 1,
    explanation: 'Auto-scaling automatically adjusts computing resources up or down based on demand, optimizing cost and maintaining performance.',
    topic: 'IT Operations',
    subtopic: 'Auto-Scaling'
  },
  {
    id: 'cisa4-067',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Geographic redundancy protects against:',
    options: [
      'Only server failures',
      'Regional disasters affecting entire facilities',
      'Only network issues',
      'Only power outages'
    ],
    correctAnswer: 1,
    explanation: 'Geographic redundancy provides protection against regional disasters by maintaining capabilities in different geographic locations.',
    topic: 'Disaster Recovery',
    subtopic: 'Geographic Redundancy'
  },
  {
    id: 'cisa4-068',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Active-active configurations:',
    options: [
      'Have one active site',
      'Use multiple sites simultaneously handling traffic',
      'Are only for backup',
      'Require manual failover'
    ],
    correctAnswer: 1,
    explanation: 'Active-active configurations use multiple sites simultaneously, with all sites handling traffic and providing immediate failover.',
    topic: 'Disaster Recovery',
    subtopic: 'Active-Active'
  },
  {
    id: 'cisa4-069',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Split-brain scenarios in clustering occur when:',
    options: [
      'All nodes agree',
      'Nodes lose connectivity and operate independently',
      'Performance improves',
      'Backup completes'
    ],
    correctAnswer: 1,
    explanation: 'Split-brain occurs when cluster nodes lose connectivity and operate independently, potentially causing data inconsistency.',
    topic: 'High Availability',
    subtopic: 'Split-Brain'
  },
  {
    id: 'cisa4-070',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Observability in IT operations encompasses:',
    options: [
      'Only monitoring',
      'Metrics, logs, and traces for understanding system behavior',
      'Only alerting',
      'Only dashboards'
    ],
    correctAnswer: 1,
    explanation: 'Observability combines metrics, logs, and traces to enable understanding of system behavior and troubleshooting.',
    topic: 'IT Operations',
    subtopic: 'Observability'
  },
  {
    id: 'cisa4-071',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Distributed tracing enables:',
    options: [
      'Code review',
      'Following requests across distributed systems',
      'Database design',
      'Security scanning'
    ],
    correctAnswer: 1,
    explanation: 'Distributed tracing follows requests as they flow across multiple services, enabling end-to-end visibility and troubleshooting.',
    topic: 'IT Operations',
    subtopic: 'Tracing'
  },
  {
    id: 'cisa4-072',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'SRE (Site Reliability Engineering) focuses on:',
    options: [
      'Only development',
      'Applying software engineering to operations problems',
      'Only help desk',
      'Only security'
    ],
    correctAnswer: 1,
    explanation: 'SRE applies software engineering principles to operations, focusing on automation, reliability, and scalability.',
    topic: 'IT Operations',
    subtopic: 'SRE'
  },
  {
    id: 'cisa4-073',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Error budgets in SRE define:',
    options: [
      'Development costs',
      'Acceptable unreliability to balance innovation and stability',
      'Staffing levels',
      'Hardware expenses'
    ],
    correctAnswer: 1,
    explanation: 'Error budgets define acceptable unreliability (e.g., 0.1% downtime), balancing innovation speed with reliability requirements.',
    topic: 'IT Operations',
    subtopic: 'Error Budgets'
  },
  {
    id: 'cisa4-074',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Service Level Objectives (SLOs) define:',
    options: [
      'Only availability',
      'Target values for service quality indicators',
      'Only cost',
      'Only response time'
    ],
    correctAnswer: 1,
    explanation: 'SLOs define target values for key service quality indicators like availability, latency, and error rates.',
    topic: 'IT Service Management',
    subtopic: 'SLO'
  },
  {
    id: 'cisa4-075',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Blameless post-mortems focus on:',
    options: [
      'Identifying individuals to blame',
      'Understanding system failures and improving processes',
      'Punishment',
      'Hiding problems'
    ],
    correctAnswer: 1,
    explanation: 'Blameless post-mortems focus on understanding failures and improving systems, not punishing individuals, encouraging openness.',
    topic: 'Incident Management',
    subtopic: 'Post-Mortems'
  },
  {
    id: 'cisa4-076',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Mean time to detect (MTTD) measures:',
    options: [
      'Time to fix issues',
      'Time between incident occurrence and detection',
      'Time between failures',
      'Recovery time'
    ],
    correctAnswer: 1,
    explanation: 'MTTD measures the time between when an incident occurs and when it is detected, indicating monitoring effectiveness.',
    topic: 'Incident Management',
    subtopic: 'MTTD'
  },
  {
    id: 'cisa4-077',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Mean time to repair (MTTR) measures:',
    options: [
      'Time to detect',
      'Time to restore service after failure',
      'Time between failures',
      'Backup duration'
    ],
    correctAnswer: 1,
    explanation: 'MTTR measures the average time to restore service after a failure, indicating repair and recovery efficiency.',
    topic: 'IT Operations',
    subtopic: 'MTTR'
  },
  {
    id: 'cisa4-078',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'AIOps (AI for IT Operations) uses:',
    options: [
      'Only manual analysis',
      'Machine learning for event correlation and anomaly detection',
      'Only scripting',
      'Only dashboards'
    ],
    correctAnswer: 1,
    explanation: 'AIOps applies machine learning to IT operations for intelligent event correlation, anomaly detection, and predictive analysis.',
    topic: 'IT Operations',
    subtopic: 'AIOps'
  },
  {
    id: 'cisa4-079',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Configuration drift occurs when:',
    options: [
      'Configurations are standardized',
      'Systems deviate from their intended configuration over time',
      'Baselines are applied',
      'Changes are documented'
    ],
    correctAnswer: 1,
    explanation: 'Configuration drift occurs when system configurations deviate from the intended baseline over time through informal changes.',
    topic: 'IT Operations',
    subtopic: 'Configuration Drift'
  },
  {
    id: 'cisa4-080',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Infrastructure monitoring should include:',
    options: [
      'Only CPU usage',
      'Compute, storage, network, and application health',
      'Only network traffic',
      'Only disk space'
    ],
    correctAnswer: 1,
    explanation: 'Infrastructure monitoring should cover all layers: compute, storage, network, and application health for complete visibility.',
    topic: 'IT Operations',
    subtopic: 'Infrastructure Monitoring'
  },
  {
    id: 'cisa4-081',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Synthetic monitoring:',
    options: [
      'Uses only real user data',
      'Simulates user interactions to proactively detect issues',
      'Replaces all monitoring',
      'Only works in production'
    ],
    correctAnswer: 1,
    explanation: 'Synthetic monitoring simulates user interactions to proactively detect issues before real users are affected.',
    topic: 'IT Operations',
    subtopic: 'Synthetic Monitoring'
  },
  {
    id: 'cisa4-082',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Real user monitoring (RUM) captures:',
    options: [
      'Simulated transactions',
      'Actual user experience data',
      'Only errors',
      'Only backend data'
    ],
    correctAnswer: 1,
    explanation: 'RUM captures actual user experience data including page load times, errors, and user journeys from real users.',
    topic: 'IT Operations',
    subtopic: 'RUM'
  },
  {
    id: 'cisa4-083',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Capacity planning should consider:',
    options: [
      'Only current usage',
      'Current usage, growth projections, and peak demands',
      'Only cost',
      'Only historical data'
    ],
    correctAnswer: 1,
    explanation: 'Capacity planning considers current usage, growth projections, seasonal patterns, and peak demand requirements.',
    topic: 'IT Operations',
    subtopic: 'Capacity Planning'
  },
  {
    id: 'cisa4-084',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Data center tier classifications indicate:',
    options: [
      'Cost only',
      'Availability and redundancy levels',
      'Size only',
      'Location only'
    ],
    correctAnswer: 1,
    explanation: 'Data center tiers (I-IV) indicate infrastructure redundancy and expected availability levels, with Tier IV being highest.',
    topic: 'Data Center',
    subtopic: 'Tier Classification'
  },
  {
    id: 'cisa4-085',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Power Usage Effectiveness (PUE) measures:',
    options: [
      'Server performance',
      'Data center energy efficiency',
      'Network speed',
      'Storage capacity'
    ],
    correctAnswer: 1,
    explanation: 'PUE measures data center energy efficiency by comparing total facility power to IT equipment power.',
    topic: 'Data Center',
    subtopic: 'Energy Efficiency'
  },
  {
    id: 'cisa4-086',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Preventive maintenance schedules help:',
    options: [
      'Increase failures',
      'Reduce unexpected failures through proactive maintenance',
      'Delay all maintenance',
      'Eliminate all maintenance'
    ],
    correctAnswer: 1,
    explanation: 'Preventive maintenance schedules reduce unexpected failures by performing maintenance proactively based on time or usage.',
    topic: 'IT Operations',
    subtopic: 'Preventive Maintenance'
  },
  {
    id: 'cisa4-087',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Disaster recovery plan testing frequency should be:',
    options: [
      'Once ever',
      'At least annually with more frequent component testing',
      'Only after changes',
      'Optional'
    ],
    correctAnswer: 1,
    explanation: 'DR plans should be tested at least annually with full tests, and more frequently for component or tabletop tests.',
    topic: 'Disaster Recovery',
    subtopic: 'Test Frequency'
  },
  {
    id: 'cisa4-088',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Parallel DR tests:',
    options: [
      'Disrupt production',
      'Test recovery without impacting production systems',
      'Replace production',
      'Are destructive'
    ],
    correctAnswer: 1,
    explanation: 'Parallel tests activate recovery systems alongside production without disrupting production operations.',
    topic: 'Disaster Recovery',
    subtopic: 'Parallel Testing'
  },
  {
    id: 'cisa4-089',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Full interruption DR tests:',
    options: [
      'Have no risk',
      'Provide most realistic validation but carry production risk',
      'Are always required',
      'Test only documentation'
    ],
    correctAnswer: 1,
    explanation: 'Full interruption tests shut down production and recover at the DR site, providing realistic validation but carrying production risk.',
    topic: 'Disaster Recovery',
    subtopic: 'Full Interruption'
  },
  {
    id: 'cisa4-090',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'BC/DR plan maintenance should trigger when:',
    options: [
      'Only after disasters',
      'Significant changes occur to systems, personnel, or business processes',
      'Annually only',
      'Never'
    ],
    correctAnswer: 1,
    explanation: 'Plans should be updated when significant changes occur to systems, personnel, business processes, or contact information.',
    topic: 'Business Continuity',
    subtopic: 'Plan Maintenance'
  },
  {
    id: 'cisa4-091',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Evacuation procedures should include:',
    options: [
      'Only exit routes',
      'Assembly points, headcount, and communication procedures',
      'Only fire drills',
      'Only management notification'
    ],
    correctAnswer: 1,
    explanation: 'Evacuation procedures should include exit routes, assembly points, headcount procedures, special assistance, and communication.',
    topic: 'Emergency Response',
    subtopic: 'Evacuation'
  },
  {
    id: 'cisa4-092',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Pandemic planning differs from traditional DRP by focusing on:',
    options: [
      'Technology recovery only',
      'Extended duration events affecting personnel availability',
      'Short-term outages',
      'Physical damage'
    ],
    correctAnswer: 1,
    explanation: 'Pandemic planning addresses extended-duration events primarily affecting workforce availability rather than physical infrastructure.',
    topic: 'Business Continuity',
    subtopic: 'Pandemic Planning'
  },
];

export default CISA4_QUESTIONS_BATCH4;
