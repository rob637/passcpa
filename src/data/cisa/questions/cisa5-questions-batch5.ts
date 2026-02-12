/**
 * CISA Domain 5: Protection of Information Assets
 * Batch 5 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA5_QUESTIONS_BATCH5: Question[] = [
  {
    id: 'cisa5-093',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Security architecture design should be:',
    options: [
      'Reactive',
      'Based on defense-in-depth principles',
      'Single layer only',
      'Technology-focused only'
    ],
    correctAnswer: 1,
    explanation: 'Security architecture should follow defense-in-depth with multiple layers of complementary controls.',
    topic: 'Security Architecture',
    subtopic: 'Defense in Depth'
  },
  {
    id: 'cisa5-094',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Security baseline configurations should be:',
    options: [
      'Static forever',
      'Documented, maintained, and periodically reviewed',
      'Vendor defaults only',
      'Undefined'
    ],
    correctAnswer: 1,
    explanation: 'Security baselines should be documented, consistently applied, and periodically reviewed for appropriateness.',
    topic: 'Security Management',
    subtopic: 'Baselines'
  },
  {
    id: 'cisa5-095',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Hardening standards address:',
    options: [
      'Only passwords',
      'Removing unnecessary services, patching, and secure configuration',
      'Only network settings',
      'Only encryption'
    ],
    correctAnswer: 1,
    explanation: 'Hardening includes removing unnecessary services, applying patches, disabling defaults, and secure configuration.',
    topic: 'Security Management',
    subtopic: 'Hardening'
  },
  {
    id: 'cisa5-096',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Vulnerability scoring (CVSS) considers:',
    options: [
      'Only severity',
      'Base, temporal, and environmental factors',
      'Only exploitability',
      'Only asset value'
    ],
    correctAnswer: 1,
    explanation: 'CVSS scores consider base vulnerability characteristics, temporal factors, and environmental context.',
    topic: 'Vulnerability Management',
    subtopic: 'CVSS'
  },
  {
    id: 'cisa5-097',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Vulnerability remediation should be prioritized by:',
    options: [
      'Discovery date only',
      'Risk based on exploitability and asset criticality',
      'Vendor severity only',
      'Random selection'
    ],
    correctAnswer: 1,
    explanation: 'Remediation prioritization should consider exploitability, asset criticality, and potential business impact.',
    topic: 'Vulnerability Management',
    subtopic: 'Prioritization'
  },
  {
    id: 'cisa5-098',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Patch management processes should include:',
    options: [
      'Immediate production deployment',
      'Testing, approval, deployment, and verification',
      'Only critical patches',
      'Annual patching only'
    ],
    correctAnswer: 1,
    explanation: 'Patch management should include testing, change approval, controlled deployment, and verification.',
    topic: 'Vulnerability Management',
    subtopic: 'Patch Management'
  },
  {
    id: 'cisa5-099',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Virtual patching:',
    options: [
      'Replaces real patches',
      'Provides temporary protection when patches cannot be immediately applied',
      'Eliminates vulnerabilities',
      'Is permanent'
    ],
    correctAnswer: 1,
    explanation: 'Virtual patching provides compensating controls (like WAF rules) when patches cannot be immediately applied.',
    topic: 'Vulnerability Management',
    subtopic: 'Virtual Patching'
  },
  {
    id: 'cisa5-100',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Penetration testing rules of engagement should:',
    options: [
      'Not exist',
      'Define scope, method, timing, and escalation procedures',
      'Be verbal only',
      'Give unlimited access'
    ],
    correctAnswer: 1,
    explanation: 'Rules of engagement should clearly define scope, testing methods, timing, notification, and escalation procedures.',
    topic: 'Security Testing',
    subtopic: 'Rules of Engagement'
  },
  {
    id: 'cisa5-101',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Red team exercises simulate:',
    options: [
      'Compliance audits',
      'Real-world adversary tactics to test defenses',
      'Only vulnerability scanning',
      'Only phishing'
    ],
    correctAnswer: 1,
    explanation: 'Red team exercises simulate real-world adversary tactics and techniques to test detection and response.',
    topic: 'Security Testing',
    subtopic: 'Red Team'
  },
  {
    id: 'cisa5-102',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Purple team activities:',
    options: [
      'Replace red and blue teams',
      'Facilitate collaboration between offensive and defensive teams',
      'Only perform testing',
      'Only review results'
    ],
    correctAnswer: 1,
    explanation: 'Purple team activities facilitate collaboration between red and blue teams to improve both attack simulation and defense.',
    topic: 'Security Testing',
    subtopic: 'Purple Team'
  },
  {
    id: 'cisa5-103',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Bug bounty programs:',
    options: [
      'Replace internal security',
      'Incentivize external researchers to report vulnerabilities',
      'Only find bugs',
      'Guarantee security'
    ],
    correctAnswer: 1,
    explanation: 'Bug bounty programs incentivize external security researchers to responsibly report vulnerabilities.',
    topic: 'Security Testing',
    subtopic: 'Bug Bounty'
  },
  {
    id: 'cisa5-104',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Security Information and Event Management (SIEM):',
    options: [
      'Replaces all other security tools',
      'Aggregates and correlates security events for detection',
      'Only stores logs',
      'Only generates alerts'
    ],
    correctAnswer: 1,
    explanation: 'SIEM aggregates logs, correlates events, and provides detection and alerting for security events.',
    topic: 'Security Operations',
    subtopic: 'SIEM'
  },
  {
    id: 'cisa5-105',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'SOAR (Security Orchestration, Automation and Response):',
    options: [
      'Only performs automation',
      'Integrates tools, automates workflows, and orchestrates response',
      'Replaces analysts',
      'Only creates reports'
    ],
    correctAnswer: 1,
    explanation: 'SOAR integrates security tools, automates repetitive tasks, and orchestrates incident response workflows.',
    topic: 'Security Operations',
    subtopic: 'SOAR'
  },
  {
    id: 'cisa5-106',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'User and Entity Behavior Analytics (UEBA):',
    options: [
      'Replaces access control',
      'Detects anomalous behavior indicating potential threats',
      'Only monitors privileged users',
      'Only generates baselines'
    ],
    correctAnswer: 1,
    explanation: 'UEBA uses machine learning to detect anomalous behavior that may indicate insider threats or compromised accounts.',
    topic: 'Security Operations',
    subtopic: 'UEBA'
  },
  {
    id: 'cisa5-107',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Network Detection and Response (NDR):',
    options: [
      'Replaces firewalls',
      'Monitors network traffic for threats and anomalies',
      'Only blocks traffic',
      'Only logs connections'
    ],
    correctAnswer: 1,
    explanation: 'NDR monitors network traffic patterns to detect threats and anomalies that may evade other controls.',
    topic: 'Network Security',
    subtopic: 'NDR'
  },
  {
    id: 'cisa5-108',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Extended Detection and Response (XDR):',
    options: [
      'Only endpoint focused',
      'Correlates detections across multiple security layers',
      'Replaces all security tools',
      'Only does response'
    ],
    correctAnswer: 1,
    explanation: 'XDR correlates detections across endpoints, network, cloud, and other layers for comprehensive threat detection.',
    topic: 'Security Operations',
    subtopic: 'XDR'
  },
  {
    id: 'cisa5-109',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Digital forensics maintains:',
    options: [
      'Only data',
      'Evidence integrity through documented procedures',
      'Only reports',
      'Only timelines'
    ],
    correctAnswer: 1,
    explanation: 'Digital forensics maintains evidence integrity through documented procedures and chain of custody.',
    topic: 'Incident Response',
    subtopic: 'Forensics'
  },
  {
    id: 'cisa5-110',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Memory forensics can recover:',
    options: [
      'Only files',
      'Volatile data including running processes and encryption keys',
      'Only logs',
      'Only network data'
    ],
    correctAnswer: 1,
    explanation: 'Memory forensics can recover volatile data including running processes, network connections, and encryption keys.',
    topic: 'Incident Response',
    subtopic: 'Memory Forensics'
  },
  {
    id: 'cisa5-111',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Threat hunting differs from detection by:',
    options: [
      'Being automated only',
      'Proactively searching for undetected threats',
      'Waiting for alerts',
      'Only reviewing logs'
    ],
    correctAnswer: 1,
    explanation: 'Threat hunting proactively searches for threats that may have evaded automated detection controls.',
    topic: 'Security Operations',
    subtopic: 'Threat Hunting'
  },
  {
    id: 'cisa5-112',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Indicators of Compromise (IOCs):',
    options: [
      'Only identify known threats',
      'Provide artifacts indicating potential breach activity',
      'Replace investigation',
      'Guarantee detection'
    ],
    correctAnswer: 1,
    explanation: 'IOCs are artifacts (hashes, IPs, behaviors) that indicate potential malicious activity or breach.',
    topic: 'Security Operations',
    subtopic: 'IOCs'
  },
  {
    id: 'cisa5-114',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Data subject access requests (DSARs) require:',
    options: [
      'Immediate response',
      'Verified identity and timely response per regulations',
      'No verification',
      'Automatic denial'
    ],
    correctAnswer: 1,
    explanation: 'DSARs require identity verification and timely response within regulatory timeframes (e.g., 30 days for GDPR).',
    topic: 'Privacy',
    subtopic: 'DSAR'
  },
  {
    id: 'cisa5-115',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Right to be forgotten (erasure):',
    options: [
      'Is absolute',
      'Must be balanced against other legal obligations',
      'Applies to all data',
      'Is immediate'
    ],
    correctAnswer: 1,
    explanation: 'Right to erasure must be balanced against legal retention requirements and other legitimate interests.',
    topic: 'Privacy',
    subtopic: 'Erasure'
  },
  {
    id: 'cisa5-116',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Privacy Impact Assessments (PIAs):',
    options: [
      'Are optional',
      'Identify and mitigate privacy risks before implementation',
      'Only document compliance',
      'Are only for GDPR'
    ],
    correctAnswer: 1,
    explanation: 'PIAs systematically identify and mitigate privacy risks before implementing systems processing personal data.',
    topic: 'Privacy',
    subtopic: 'PIA'
  },
  {
    id: 'cisa5-118',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Physical security layers should include:',
    options: [
      'Only perimeter security',
      'Perimeter, building, floor, room, and equipment protection',
      'Only guards',
      'Only cameras'
    ],
    correctAnswer: 1,
    explanation: 'Physical security should use multiple layers from perimeter to building to room to equipment.',
    topic: 'Physical Security',
    subtopic: 'Defense Layers'
  },
  {
    id: 'cisa5-119',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Visitor management controls should:',
    options: [
      'Allow unrestricted access',
      'Verify identity, log visits, and require escorts where appropriate',
      'Only log entry',
      'Only check for weapons'
    ],
    correctAnswer: 1,
    explanation: 'Visitor management should verify identity, log visits, provide temporary badges, and require escorts in sensitive areas.',
    topic: 'Physical Security',
    subtopic: 'Visitor Management'
  },
  {
    id: 'cisa5-120',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Media sanitization methods should match:',
    options: [
      'Convenience',
      'Data classification and intended media disposition',
      'Cost only',
      'Speed requirements'
    ],
    correctAnswer: 1,
    explanation: 'Sanitization methods (clear, purge, destroy) should match data classification and whether media will be reused.',
    topic: 'Data Security',
    subtopic: 'Media Sanitization'
  },
  {
    id: 'cisa5-121',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Environmental controls for data centers include:',
    options: [
      'Only cooling',
      'Temperature, humidity, fire suppression, and water detection',
      'Only fire suppression',
      'Only power'
    ],
    correctAnswer: 1,
    explanation: 'Environmental controls include HVAC, humidity control, fire detection/suppression, and water detection.',
    topic: 'Physical Security',
    subtopic: 'Environmental'
  },
];

export default CISA5_QUESTIONS_BATCH5;
