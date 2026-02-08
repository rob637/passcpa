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
    id: 'CISA5-ET-001',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'An IS auditor reviewing an AI-based fraud detection system should be MOST concerned if:',
    options: [
      'The model is retrained quarterly with new data',
      'Training data sources are undocumented with no lineage tracking',
      'Multiple models are used in an ensemble approach',
      'Business users cannot explain individual predictions'
    ],
    correctAnswer: 1,
    explanation: 'Undocumented training data creates risks of bias, data quality issues, and compliance problems. Data lineage is critical for AI governance.',
    topic: 'AI Security',
    subtopic: 'AI Governance'
  },
  {
    id: 'CISA5-ET-002',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Which attack involves manipulating inputs to cause an AI model to misclassify data?',
    options: [
      'Data poisoning',
      'Evasion attack',
      'Model extraction',
      'Membership inference'
    ],
    correctAnswer: 1,
    explanation: 'Evasion attacks manipulate inputs at inference time to cause misclassification. Data poisoning attacks training data instead.',
    topic: 'AI Security',
    subtopic: 'Adversarial Attacks'
  },
  {
    id: 'CISA5-ET-003',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Prompt injection attacks against large language models (LLMs) primarily target:',
    options: [
      'Network infrastructure',
      'Database encryption',
      'The model\'s instruction following behavior',
      'User authentication systems'
    ],
    correctAnswer: 2,
    explanation: 'Prompt injection crafts inputs that override or manipulate the LLM\'s instructions, potentially exposing sensitive data or bypassing controls.',
    topic: 'AI Security',
    subtopic: 'LLM Security'
  },
  {
    id: 'CISA5-ET-004',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'The PRIMARY purpose of AI model monitoring is to:',
    options: [
      'Increase prediction speed',
      'Detect model drift and degradation over time',
      'Reduce training costs',
      'Eliminate the need for retraining'
    ],
    correctAnswer: 1,
    explanation: 'Model monitoring detects drift where performance degrades as real-world data diverges from training data, requiring intervention.',
    topic: 'AI Security',
    subtopic: 'Model Monitoring'
  },
  {
    id: 'CISA5-ET-005',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'When auditing AI systems, explainability is MOST important for:',
    options: [
      'Internal batch processing systems',
      'Systems making decisions affecting individuals',
      'Data warehouse analytics',
      'Internal reporting dashboards'
    ],
    correctAnswer: 1,
    explanation: 'Explainability is critical when AI makes decisions affecting individuals due to regulatory requirements (like GDPR) and ethical considerations.',
    topic: 'AI Security',
    subtopic: 'AI Ethics'
  },

  // ============================================================================
  // ADVANCED CLOUD SECURITY QUESTIONS
  // ============================================================================
  {
    id: 'CISA5-ET-006',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Cloud Security Posture Management (CSPM) tools primarily help organizations:',
    options: [
      'Encrypt all cloud data',
      'Continuously monitor for misconfigurations and compliance violations',
      'Replace cloud-native security tools',
      'Manage user passwords'
    ],
    correctAnswer: 1,
    explanation: 'CSPM continuously scans cloud environments for misconfigurations, compliance violations, and security risks.',
    topic: 'Cloud Security',
    subtopic: 'CSPM'
  },
  {
    id: 'CISA5-ET-007',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'In container security, the MOST critical layer to secure is:',
    options: [
      'The container registry',
      'The container image before deployment',
      'The network only',
      'End user devices'
    ],
    correctAnswer: 1,
    explanation: 'Image security is foundational - vulnerable or malicious images propagate to all deployments. Shifting security left to images prevents issues at scale.',
    topic: 'Cloud Security',
    subtopic: 'Container Security'
  },
  {
    id: 'CISA5-ET-008',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Kubernetes Network Policies are used to:',
    options: [
      'Manage user authentication',
      'Control pod-to-pod communication',
      'Encrypt data at rest',
      'Schedule container deployments'
    ],
    correctAnswer: 1,
    explanation: 'Network policies control which pods can communicate with each other, implementing network segmentation within the cluster.',
    topic: 'Cloud Security',
    subtopic: 'Kubernetes Security'
  },
  {
    id: 'CISA5-ET-009',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'The PRIMARY security challenge with serverless computing is:',
    options: [
      'Managing server patches',
      'Limited visibility and ephemeral nature of functions',
      'High infrastructure costs',
      'Lack of programming language support'
    ],
    correctAnswer: 1,
    explanation: 'Serverless functions are ephemeral and traditional monitoring tools may not capture their short-lived execution, creating visibility challenges.',
    topic: 'Cloud Security',
    subtopic: 'Serverless Security'
  },
  {
    id: 'CISA5-ET-010',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'In multi-cloud environments, the GREATEST security challenge is:',
    options: [
      'Lower costs',
      'Maintaining consistent security policies across platforms',
      'Increased performance',
      'Better vendor relationships'
    ],
    correctAnswer: 1,
    explanation: 'Different clouds have different native controls, making consistent security policy implementation and monitoring challenging.',
    topic: 'Cloud Security',
    subtopic: 'Multi-Cloud Security'
  },

  // ============================================================================
  // IoT/OT SECURITY QUESTIONS
  // ============================================================================
  {
    id: 'CISA5-ET-011',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'In OT/ICS environments, the PRIMARY security priority differs from IT because:',
    options: [
      'OT has lower budgets',
      'Availability and safety take precedence over confidentiality',
      'OT systems are always air-gapped',
      'OT does not process sensitive data'
    ],
    correctAnswer: 1,
    explanation: 'OT prioritizes availability and safety (AIC) because failures can cause physical harm, while IT prioritizes confidentiality (CIA).',
    topic: 'OT Security',
    subtopic: 'IT/OT Differences'
  },
  {
    id: 'CISA5-ET-012',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'The Purdue Model is used in industrial environments to:',
    options: [
      'Classify data sensitivity levels',
      'Define network segmentation between OT levels',
      'Manage user identities',
      'Encrypt industrial protocols'
    ],
    correctAnswer: 1,
    explanation: 'The Purdue Model defines hierarchical network zones from field devices (level 0) to enterprise (level 5) for ICS segmentation.',
    topic: 'OT Security',
    subtopic: 'ICS Architecture'
  },
  {
    id: 'CISA5-ET-013',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Shadow IoT devices pose a significant risk because they:',
    options: [
      'Are too expensive',
      'Connect to networks without IT knowledge or security controls',
      'Always use strong encryption',
      'Are regularly updated'
    ],
    correctAnswer: 1,
    explanation: 'Shadow IoT devices bypass security controls and create unknown attack surface since IT is unaware of their existence.',
    topic: 'IoT Security',
    subtopic: 'Shadow IoT'
  },
  {
    id: 'CISA5-ET-014',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'When auditing ICS/SCADA systems, the IS auditor should understand that patching is challenging because:',
    options: [
      'Vendors do not release patches',
      'Systems often cannot be taken offline and require vendor testing',
      'Patches are always applied automatically',
      'Industrial systems do not have vulnerabilities'
    ],
    correctAnswer: 1,
    explanation: 'ICS patching is difficult due to availability requirements, potential impact on operations, and need for vendor-validated patches.',
    topic: 'OT Security',
    subtopic: 'ICS Patching'
  },
  {
    id: 'CISA5-ET-015',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'A key security concern with industrial protocols like Modbus is:',
    options: [
      'They are too complex to implement',
      'They often lack built-in authentication and encryption',
      'They cannot transmit data quickly enough',
      'They only work on modern systems'
    ],
    correctAnswer: 1,
    explanation: 'Many industrial protocols were designed before security was a concern and lack authentication, encryption, or integrity checking.',
    topic: 'OT Security',
    subtopic: 'Industrial Protocols'
  },

  // ============================================================================
  // API SECURITY QUESTIONS
  // ============================================================================
  {
    id: 'CISA5-ET-016',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'According to OWASP API Security Top 10, the most critical API vulnerability is:',
    options: [
      'SQL Injection',
      'Broken Object Level Authorization',
      'Cross-site scripting',
      'Missing encryption'
    ],
    correctAnswer: 1,
    explanation: 'Broken Object Level Authorization (BOLA) allows attackers to access other users\' data by manipulating object IDs in API calls.',
    topic: 'API Security',
    subtopic: 'OWASP API Top 10'
  },
  {
    id: 'CISA5-ET-017',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'API rate limiting is essential to prevent:',
    options: [
      'SQL injection',
      'Denial of service and resource exhaustion attacks',
      'Data encryption',
      'User authentication'
    ],
    correctAnswer: 1,
    explanation: 'Rate limiting controls request volume to prevent abuse, DoS attacks, and excessive resource consumption.',
    topic: 'API Security',
    subtopic: 'Rate Limiting'
  },
  {
    id: 'CISA5-ET-018',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'For service-to-service API authentication, the MOST secure approach is:',
    options: [
      'Shared API keys',
      'Mutual TLS (mTLS) with certificates',
      'Username and password',
      'No authentication needed internally'
    ],
    correctAnswer: 1,
    explanation: 'mTLS provides strong cryptographic authentication where both parties verify each other\'s certificates.',
    topic: 'API Security',
    subtopic: 'API Authentication'
  },
  {
    id: 'CISA5-ET-019',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'An API gateway provides centralized:',
    options: [
      'Database management',
      'Authentication, rate limiting, and security policy enforcement',
      'Code development',
      'Hardware provisioning'
    ],
    correctAnswer: 1,
    explanation: 'API gateways centralize security functions including authentication, authorization, rate limiting, and monitoring.',
    topic: 'API Security',
    subtopic: 'API Gateway'
  },
  {
    id: 'CISA5-ET-020',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'When auditing API security, the IS auditor should verify that authorization is checked at:',
    options: [
      'The network perimeter only',
      'Object, property, and function levels for each request',
      'User login only',
      'Annual audits only'
    ],
    correctAnswer: 1,
    explanation: 'APIs must verify authorization at multiple levels - object (whose data), property (which fields), and function (what actions) for each request.',
    topic: 'API Security',
    subtopic: 'API Authorization'
  },

  // ============================================================================
  // ZERO TRUST AND MODERN ARCHITECTURE QUESTIONS
  // ============================================================================
  {
    id: 'CISA5-ET-021',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'A Software Bill of Materials (SBOM) helps organizations:',
    options: [
      'Speed up software development',
      'Track components for vulnerability and supply chain risk management',
      'Replace software testing',
      'Eliminate the need for patching'
    ],
    correctAnswer: 1,
    explanation: 'SBOM provides inventory of software components enabling identification of vulnerable dependencies and supply chain risk management.',
    topic: 'Security Architecture',
    subtopic: 'Supply Chain Security'
  },
  {
    id: 'CISA5-ET-022',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'In a Zero Trust architecture, access decisions are based on:',
    options: [
      'Network location only',
      'User identity, device health, and contextual factors continuously',
      'One-time password at login',
      'VPN connection'
    ],
    correctAnswer: 1,
    explanation: 'Zero Trust evaluates multiple factors continuously - identity, device posture, location, behavior - not just network position.',
    topic: 'Security Architecture',
    subtopic: 'Zero Trust'
  },
  {
    id: 'CISA5-ET-023',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'DevSecOps integrates security into:',
    options: [
      'Post-deployment monitoring only',
      'Every phase of the software development lifecycle',
      'Annual security audits',
      'End-user training only'
    ],
    correctAnswer: 1,
    explanation: 'DevSecOps shifts security left, embedding it throughout development, testing, deployment, and operations phases.',
    topic: 'Security Architecture',
    subtopic: 'DevSecOps'
  },
  {
    id: 'CISA5-ET-024',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Infrastructure as Code (IaC) security scanning helps prevent:',
    options: [
      'All malware',
      'Misconfigurations before cloud resources are deployed',
      'Network latency',
      'User password issues'
    ],
    correctAnswer: 1,
    explanation: 'IaC scanning identifies misconfigurations in templates before deployment, preventing vulnerable infrastructure from being created.',
    topic: 'Security Architecture',
    subtopic: 'IaC Security'
  },
  {
    id: 'CISA5-ET-025',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'The shared responsibility model in cloud computing means:',
    options: [
      'The cloud provider handles all security',
      'Security responsibilities are divided between provider and customer',
      'The customer handles all security',
      'No one is responsible for security'
    ],
    correctAnswer: 1,
    explanation: 'Cloud security is shared - providers secure infrastructure, customers secure their data, applications, and configurations.',
    topic: 'Cloud Security',
    subtopic: 'Shared Responsibility'
  }
];
