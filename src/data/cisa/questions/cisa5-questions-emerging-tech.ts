/**
 * CISA Domain 5: Protection of Information Assets
 * Emerging Technology Security Questions
 * AI/ML, Cloud, IoT/OT, and API Security
 */

import { Question } from '../../../types';

export const CISA5_QUESTIONS_EMERGING_TECH: Question[] = [
  // ============================================================================
  // AI/ML SECURITY QUESTIONS
  // ============================================================================
  {
    id: 'cisa5-et-001',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An IS auditor reviewing an AI-based fraud detection system should be MOST concerned if:',
    options: [
      'Business users cannot explain individual predictions',
      'Multiple models are used in an ensemble approach',
      'The model is retrained quarterly with new data',
      'Training data sources are undocumented with no lineage tracking',
    ],
    correctAnswer: 3,
    explanation: 'Undocumented training data creates risks of bias, data quality issues, and compliance problems. Data lineage is critical for AI governance.',
    topic: 'AI Security',
    subtopic: 'AI Governance'
  },
  {
    id: 'cisa5-et-002',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which attack involves manipulating inputs to cause an AI model to misclassify data?',
    options: [
      'Membership inference',
      'Model extraction',
      'Data poisoning',
      'Evasion attack',
    ],
    correctAnswer: 3,
    explanation: 'Evasion attacks manipulate inputs at inference time to cause misclassification. Data poisoning attacks training data instead.',
    topic: 'AI Security',
    subtopic: 'Adversarial Attacks'
  },
  {
    id: 'cisa5-et-003',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Prompt injection attacks against large language models (LLMs) primarily target:',
    options: [
      'Network infrastructure',
      'The model\'s instruction following behavior',
      'User authentication systems',
      'Database encryption',
    ],
    correctAnswer: 1,
    explanation: 'Prompt injection crafts inputs that override or manipulate the LLM\'s instructions, potentially exposing sensitive data or bypassing controls.',
    topic: 'AI Security',
    subtopic: 'LLM Security'
  },
  {
    id: 'cisa5-et-004',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The PRIMARY purpose of AI model monitoring is to:',
    options: [
      'Increase prediction speed',
      'Reduce training costs',
      'Eliminate the need for retraining',
      'Detect model drift and degradation over time',
    ],
    correctAnswer: 3,
    explanation: 'Model monitoring detects drift where performance degrades as real-world data diverges from training data, requiring intervention.',
    topic: 'AI Security',
    subtopic: 'Model Monitoring'
  },
  {
    id: 'cisa5-et-005',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When auditing AI systems, explainability is MOST important for:',
    options: [
      'Data warehouse analytics',
      'Internal batch processing systems',
      'Internal reporting dashboards',
      'Systems making decisions affecting individuals',
    ],
    correctAnswer: 3,
    explanation: 'Explainability is critical when AI makes decisions affecting individuals due to regulatory requirements (like GDPR) and ethical considerations.',
    topic: 'AI Security',
    subtopic: 'AI Ethics'
  },

  // ============================================================================
  // ADVANCED CLOUD SECURITY QUESTIONS
  // ============================================================================
  {
    id: 'cisa5-et-006',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Cloud Security Posture Management (CSPM) tools primarily help organizations:',
    options: [
      'Manage user passwords',
      'Encrypt all cloud data',
      'Replace cloud-native security tools',
      'Continuously monitor for misconfigurations and compliance violations',
    ],
    correctAnswer: 3,
    explanation: 'CSPM continuously scans cloud environments for misconfigurations, compliance violations, and security risks.',
    topic: 'Cloud Security',
    subtopic: 'CSPM'
  },
  {
    id: 'cisa5-et-007',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'In container security, the MOST critical layer to secure is:',
    options: [
      'End user devices',
      'The container registry',
      'The network only',
      'The container image before deployment',
    ],
    correctAnswer: 3,
    explanation: 'Image security is foundational - vulnerable or malicious images propagate to all deployments. Shifting security left to images prevents issues at scale.',
    topic: 'Cloud Security',
    subtopic: 'Container Security'
  },
  {
    id: 'cisa5-et-008',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Kubernetes Network Policies are used to:',
    options: [
      'Encrypt data at rest',
      'Schedule container deployments',
      'Manage user authentication',
      'Control pod-to-pod communication',
    ],
    correctAnswer: 3,
    explanation: 'Network policies control which pods can communicate with each other, implementing network segmentation within the cluster.',
    topic: 'Cloud Security',
    subtopic: 'Kubernetes Security'
  },
  {
    id: 'cisa5-et-009',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The PRIMARY security challenge with serverless computing is:',
    options: [
      'High infrastructure costs',
      'Lack of programming language support',
      'Managing server patches',
      'Limited visibility and ephemeral nature of functions',
    ],
    correctAnswer: 3,
    explanation: 'Serverless functions are ephemeral and traditional monitoring tools may not capture their short-lived execution, creating visibility challenges.',
    topic: 'Cloud Security',
    subtopic: 'Serverless Security'
  },
  {
    id: 'cisa5-et-010',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In multi-cloud environments, the GREATEST security challenge is:',
    options: [
      'Better vendor relationships',
      'Increased performance',
      'Lower costs',
      'Maintaining consistent security policies across platforms',
    ],
    correctAnswer: 3,
    explanation: 'Different clouds have different native controls, making consistent security policy implementation and monitoring challenging.',
    topic: 'Cloud Security',
    subtopic: 'Multi-Cloud Security'
  },

  // ============================================================================
  // IoT/OT SECURITY QUESTIONS
  // ============================================================================
  {
    id: 'cisa5-et-011',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'In OT/ICS environments, the PRIMARY security priority differs from IT because:',
    options: [
      'OT systems are always air-gapped',
      'OT does not process sensitive data',
      'OT has lower budgets',
      'Availability and safety take precedence over confidentiality',
    ],
    correctAnswer: 3,
    explanation: 'OT prioritizes availability and safety (AIC) because failures can cause physical harm, while IT prioritizes confidentiality (CIA).',
    topic: 'OT Security',
    subtopic: 'IT/OT Differences'
  },
  {
    id: 'cisa5-et-012',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The Purdue Model is used in industrial environments to:',
    options: [
      'Manage user identities',
      'Encrypt industrial protocols',
      'Classify data sensitivity levels',
      'Define network segmentation between OT levels',
    ],
    correctAnswer: 3,
    explanation: 'The Purdue Model defines hierarchical network zones from field devices (level 0) to enterprise (level 5) for ICS segmentation.',
    topic: 'OT Security',
    subtopic: 'ICS Architecture'
  },
  {
    id: 'cisa5-et-013',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Shadow IoT devices pose a significant risk because they:',
    options: [
      'Always use strong encryption',
      'Are too expensive',
      'Are regularly updated',
      'Connect to networks without IT knowledge or security controls',
    ],
    correctAnswer: 3,
    explanation: 'Shadow IoT devices bypass security controls and create unknown attack surface since IT is unaware of their existence.',
    topic: 'IoT Security',
    subtopic: 'Shadow IoT'
  },
  {
    id: 'cisa5-et-014',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When auditing ICS/SCADA systems, the IS auditor should understand that patching is challenging because:',
    options: [
      'Patches are always applied automatically',
      'Vendors do not release patches',
      'Industrial systems do not have vulnerabilities',
      'Systems often cannot be taken offline and require vendor testing',
    ],
    correctAnswer: 3,
    explanation: 'ICS patching is difficult due to availability requirements, potential impact on operations, and need for vendor-validated patches.',
    topic: 'OT Security',
    subtopic: 'ICS Patching'
  },
  {
    id: 'cisa5-et-015',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A key security concern with industrial protocols like Modbus is:',
    options: [
      'They are too complex to implement',
      'They only work on modern systems',
      'They cannot transmit data quickly enough',
      'They often lack built-in authentication and encryption',
    ],
    correctAnswer: 3,
    explanation: 'Many industrial protocols were designed before security was a concern and lack authentication, encryption, or integrity checking.',
    topic: 'OT Security',
    subtopic: 'Industrial Protocols'
  },

  // ============================================================================
  // API SECURITY QUESTIONS
  // ============================================================================
  {
    id: 'cisa5-et-016',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'According to OWASP API Security Top 10, the most critical API vulnerability is:',
    options: [
      'SQL Injection',
      'Missing encryption',
      'Cross-site scripting',
      'Broken Object Level Authorization',
    ],
    correctAnswer: 3,
    explanation: 'Broken Object Level Authorization (BOLA) allows attackers to access other users\' data by manipulating object IDs in API calls.',
    topic: 'API Security',
    subtopic: 'OWASP API Top 10'
  },
  {
    id: 'cisa5-et-017',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'API rate limiting is essential to prevent:',
    options: [
      'User authentication',
      'SQL injection',
      'Data encryption',
      'Denial of service and resource exhaustion attacks',
    ],
    correctAnswer: 3,
    explanation: 'Rate limiting controls request volume to prevent abuse, DoS attacks, and excessive resource consumption.',
    topic: 'API Security',
    subtopic: 'Rate Limiting'
  },
  {
    id: 'cisa5-et-018',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'For service-to-service API authentication, the MOST secure approach is:',
    options: [
      'No authentication needed internally',
      'Username and password',
      'Shared API keys',
      'Mutual TLS (mTLS) with certificates',
    ],
    correctAnswer: 3,
    explanation: 'mTLS provides strong cryptographic authentication where both parties verify each other\'s certificates.',
    topic: 'API Security',
    subtopic: 'API Authentication'
  },
  {
    id: 'cisa5-et-019',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An API gateway provides centralized:',
    options: [
      'Code development',
      'Hardware provisioning',
      'Database management',
      'Authentication, rate limiting, and security policy enforcement',
    ],
    correctAnswer: 3,
    explanation: 'API gateways centralize security functions including authentication, authorization, rate limiting, and monitoring.',
    topic: 'API Security',
    subtopic: 'API Gateway'
  },
  {
    id: 'cisa5-et-020',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When auditing API security, the IS auditor should verify that authorization is checked at:',
    options: [
      'User login only',
      'Annual audits only',
      'The network perimeter only',
      'Object, property, and function levels for each request',
    ],
    correctAnswer: 3,
    explanation: 'APIs must verify authorization at multiple levels - object (whose data), property (which fields), and function (what actions) for each request.',
    topic: 'API Security',
    subtopic: 'API Authorization'
  },

  // ============================================================================
  // ZERO TRUST AND MODERN ARCHITECTURE QUESTIONS
  // ============================================================================
  {
    id: 'cisa5-et-021',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A Software Bill of Materials (SBOM) helps organizations:',
    options: [
      'Eliminate the need for patching',
      'Replace software testing',
      'Speed up software development',
      'Track components for vulnerability and supply chain risk management',
    ],
    correctAnswer: 3,
    explanation: 'SBOM provides inventory of software components enabling identification of vulnerable dependencies and supply chain risk management.',
    topic: 'Security Architecture',
    subtopic: 'Supply Chain Security'
  },
  {
    id: 'cisa5-et-022',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'In a Zero Trust architecture, access decisions are based on:',
    options: [
      'One-time password at login',
      'Network location only',
      'VPN connection',
      'User identity, device health, and contextual factors continuously',
    ],
    correctAnswer: 3,
    explanation: 'Zero Trust evaluates multiple factors continuously - identity, device posture, location, behavior - not just network position.',
    topic: 'Security Architecture',
    subtopic: 'Zero Trust'
  },
  {
    id: 'cisa5-et-023',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'DevSecOps integrates security into:',
    options: [
      'Post-deployment monitoring only',
      'Annual security audits',
      'End-user training only',
      'Every phase of the software development lifecycle',
    ],
    correctAnswer: 3,
    explanation: 'DevSecOps shifts security left, embedding it throughout development, testing, deployment, and operations phases.',
    topic: 'Security Architecture',
    subtopic: 'DevSecOps'
  },
  {
    id: 'cisa5-et-024',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Infrastructure as Code (IaC) security scanning helps prevent:',
    options: [
      'All malware',
      'Network latency',
      'User password issues',
      'Misconfigurations before cloud resources are deployed',
    ],
    correctAnswer: 3,
    explanation: 'IaC scanning identifies misconfigurations in templates before deployment, preventing vulnerable infrastructure from being created.',
    topic: 'Security Architecture',
    subtopic: 'IaC Security'
  },
  {
    id: 'cisa5-et-025',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The shared responsibility model in cloud computing means:',
    options: [
      'No one is responsible for security',
      'The cloud provider handles all security',
      'The customer handles all security',
      'Security responsibilities are divided between provider and customer',
    ],
    correctAnswer: 3,
    explanation: 'Cloud security is shared - providers secure infrastructure, customers secure their data, applications, and configurations.',
    topic: 'Cloud Security',
    subtopic: 'Shared Responsibility'
  }
];
