/**
 * CISA Domain 5: Protection of Information Assets
 * Batch 7 - 20 MCQs (Final batch for Domain 5)
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA5_QUESTIONS_BATCH7: Question[] = [
  {
    id: 'cisa5-153',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Post-quantum cryptography preparation should include:',
    options: [
      'Waiting for standards',
      'Crypto inventory, algorithm agility assessment, and migration planning',
      'Only key lengthening',
      'Ignoring quantum threats'
    ],
    correctAnswer: 1,
    explanation: 'Post-quantum preparation requires inventory, agility assessment, and migration planning.',
    topic: 'Cryptography',
    subtopic: 'Post-Quantum Cryptography'
  },
  {
    id: 'cisa5-154',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Zero-trust network access (ZTNA) replaces:',
    options: [
      'All firewalls',
      'Traditional VPN with identity-aware, context-based access',
      'All security controls',
      'Only authentication'
    ],
    correctAnswer: 1,
    explanation: 'ZTNA provides identity-aware, context-based access as an alternative to traditional VPN.',
    topic: 'Network Security',
    subtopic: 'ZTNA'
  },
  {
    id: 'cisa5-155',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Behavioral analytics for threat detection identifies:',
    options: [
      'Only known threats',
      'Anomalies in user and entity behavior indicating threats',
      'Only malware signatures',
      'Only policy violations'
    ],
    correctAnswer: 1,
    explanation: 'Behavioral analytics identifies anomalies in user and entity behavior indicating threats.',
    topic: 'Security Operations',
    subtopic: 'Behavioral Analytics'
  },
  {
    id: 'cisa5-156',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Secure access service edge (SASE) combines:',
    options: [
      'Only networking',
      'Network and security services in a cloud-delivered model',
      'Only security',
      'Only SD-WAN'
    ],
    correctAnswer: 1,
    explanation: 'SASE combines network (SD-WAN) and security services in a cloud-delivered model.',
    topic: 'Network Security',
    subtopic: 'SASE'
  },
  {
    id: 'cisa5-158',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Data loss prevention (DLP) in cloud environments requires:',
    options: [
      'Only on-premise tools',
      'Cloud-native DLP capabilities and API integration',
      'Only network monitoring',
      'Only endpoint agents'
    ],
    correctAnswer: 1,
    explanation: 'Cloud DLP requires cloud-native capabilities and API integration for visibility.',
    topic: 'Data Security',
    subtopic: 'Cloud DLP'
  },
  {
    id: 'cisa5-159',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Extended detection and response (XDR) provides:',
    options: [
      'Only endpoint detection',
      'Unified threat detection across endpoints, network, and cloud',
      'Only log aggregation',
      'Only incident response'
    ],
    correctAnswer: 1,
    explanation: 'XDR provides unified threat detection and response across endpoints, network, and cloud.',
    topic: 'Security Operations',
    subtopic: 'XDR'
  },
  {
    id: 'cisa5-160',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'API security testing should include:',
    options: [
      'Only functional testing',
      'Authentication bypass, injection, and authorization testing',
      'Only load testing',
      'Only documentation review'
    ],
    correctAnswer: 1,
    explanation: 'API security testing covers authentication, injection, authorization, and rate limiting.',
    topic: 'Application Security',
    subtopic: 'API Security Testing'
  },
  {
    id: 'cisa5-161',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Digital identity verification for remote onboarding uses:',
    options: [
      'Only passwords',
      'Document verification, biometrics, and liveness detection',
      'Only knowledge questions',
      'Only email verification'
    ],
    correctAnswer: 1,
    explanation: 'Remote identity verification uses documents, biometrics, and liveness detection.',
    topic: 'Identity Management',
    subtopic: 'Identity Verification'
  },
  {
    id: 'cisa5-162',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Confidential computing protects:',
    options: [
      'Data at rest only',
      'Data in use through hardware-based trusted execution environments',
      'Data in transit only',
      'Only storage encryption'
    ],
    correctAnswer: 1,
    explanation: 'Confidential computing protects data in use through hardware-based TEEs.',
    topic: 'Data Security',
    subtopic: 'Confidential Computing'
  },
  {
    id: 'cisa5-163',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Security orchestration, automation, and response (SOAR) enables:',
    options: [
      'Only manual workflows',
      'Automated incident response playbooks and workflow integration',
      'Only ticketing',
      'Only reporting'
    ],
    correctAnswer: 1,
    explanation: 'SOAR enables automated incident response playbooks and security tool integration.',
    topic: 'Security Operations',
    subtopic: 'SOAR'
  },
  {
    id: 'cisa5-164',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Attack surface management (ASM) continuously:',
    options: [
      'Only scans internal systems',
      'Discovers and monitors external-facing assets and exposures',
      'Only reviews policies',
      'Only tests applications'
    ],
    correctAnswer: 1,
    explanation: 'ASM continuously discovers and monitors external-facing assets and potential exposures.',
    topic: 'Security Operations',
    subtopic: 'Attack Surface Management'
  },
  {
    id: 'cisa5-165',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Privacy enhancing technologies (PETs) include:',
    options: [
      'Only encryption',
      'Differential privacy, homomorphic encryption, and secure computation',
      'Only anonymization',
      'Only access controls'
    ],
    correctAnswer: 1,
    explanation: 'PETs include differential privacy, homomorphic encryption, and secure multi-party computation.',
    topic: 'Data Security',
    subtopic: 'Privacy Enhancing Technologies'
  },
  {
    id: 'cisa5-166',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Supply chain security frameworks like SLSA focus on:',
    options: [
      'Only vendor contracts',
      'Source integrity, build process security, and provenance',
      'Only code quality',
      'Only licensing'
    ],
    correctAnswer: 1,
    explanation: 'SLSA focuses on source integrity, secure build processes, and software provenance.',
    topic: 'Security Management',
    subtopic: 'Supply Chain Security'
  },
  {
    id: 'cisa5-167',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Workload identity management in cloud addresses:',
    options: [
      'Only human identities',
      'Non-human identities for services, containers, and automation',
      'Only service accounts',
      'Only API keys'
    ],
    correctAnswer: 1,
    explanation: 'Workload identity manages non-human identities for services, containers, and automation.',
    topic: 'Identity Management',
    subtopic: 'Workload Identity'
  },
  {
    id: 'cisa5-168',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Deception technology (honeypots, honeytokens) provides:',
    options: [
      'Production services',
      'Early attack detection and threat intelligence',
      'Only distraction',
      'Only compliance evidence'
    ],
    correctAnswer: 1,
    explanation: 'Deception technology provides early attack detection and valuable threat intelligence.',
    topic: 'Security Operations',
    subtopic: 'Deception Technology'
  },
  {
    id: 'cisa5-169',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Security data lakes aggregate:',
    options: [
      'Only SIEM data',
      'Security data from multiple sources for advanced analytics',
      'Only compliance data',
      'Only log data'
    ],
    correctAnswer: 1,
    explanation: 'Security data lakes aggregate data from multiple sources for advanced analytics and hunting.',
    topic: 'Security Operations',
    subtopic: 'Security Data Lake'
  },
  {
    id: 'cisa5-170',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Runtime application self-protection (RASP) provides:',
    options: [
      'Only static analysis',
      'Real-time attack detection and blocking within applications',
      'Only logging',
      'Only network protection'
    ],
    correctAnswer: 1,
    explanation: 'RASP provides real-time attack detection and blocking from within the application runtime.',
    topic: 'Application Security',
    subtopic: 'RASP'
  },
  {
    id: 'cisa5-171',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Threat intelligence platforms (TIP) enable:',
    options: [
      'Only threat feeds',
      'Aggregation, analysis, and operationalization of threat intelligence',
      'Only IOC storage',
      'Only reporting'
    ],
    correctAnswer: 1,
    explanation: 'TIPs enable aggregation, analysis, and operationalization of threat intelligence.',
    topic: 'Security Operations',
    subtopic: 'Threat Intelligence Platform'
  },
  {
    id: 'cisa5-172',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Continuous control monitoring (CCM) automates:',
    options: [
      'Only annual testing',
      'Real-time assessment of control effectiveness',
      'Only documentation',
      'Only reporting'
    ],
    correctAnswer: 1,
    explanation: 'CCM automates real-time assessment of control effectiveness replacing point-in-time testing.',
    topic: 'Security Management',
    subtopic: 'Continuous Control Monitoring'
  },
];

export default CISA5_QUESTIONS_BATCH7;
