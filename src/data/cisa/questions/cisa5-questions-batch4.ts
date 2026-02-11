/**
 * CISA Domain 5: Protection of Information Assets
 * Batch 4 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA5_QUESTIONS_BATCH4: Question[] = [
  {
    id: 'CISA5-063',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Hardware Security Modules (HSMs) provide:',
    options: [
      'Only storage',
      'Tamper-resistant cryptographic key protection and operations',
      'Only network security',
      'Only authentication'
    ],
    correctAnswer: 1,
    explanation: 'HSMs provide tamper-resistant hardware for cryptographic key storage and performing cryptographic operations securely.',
    topic: 'Cryptography',
    subtopic: 'HSM'
  },
  {
    id: 'CISA5-064',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Key escrow:',
    options: [
      'Destroys keys',
      'Stores copies of keys with trusted third parties',
      'Generates keys',
      'Rotates keys automatically'
    ],
    correctAnswer: 1,
    explanation: 'Key escrow stores copies of cryptographic keys with trusted third parties for recovery or lawful access purposes.',
    topic: 'Cryptography',
    subtopic: 'Key Escrow'
  },
  {
    id: 'CISA5-065',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Perfect forward secrecy ensures:',
    options: [
      'Key reuse',
      'Past sessions remain secure even if long-term keys are compromised',
      'Permanent keys',
      'Single key for all sessions'
    ],
    correctAnswer: 1,
    explanation: 'Perfect forward secrecy uses ephemeral keys so that compromise of long-term keys does not compromise past session data.',
    topic: 'Cryptography',
    subtopic: 'Forward Secrecy'
  },
  {
    id: 'CISA5-066',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Certificate transparency logs help detect:',
    options: [
      'Performance issues',
      'Misissued or fraudulent SSL/TLS certificates',
      'Network latency',
      'Storage problems'
    ],
    correctAnswer: 1,
    explanation: 'Certificate transparency logs provide public, auditable records of issued certificates, helping detect misissued or fraudulent certificates.',
    topic: 'Cryptography',
    subtopic: 'Certificate Transparency'
  },
  {
    id: 'CISA5-067',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'API security should include:',
    options: [
      'No authentication',
      'Authentication, authorization, rate limiting, and input validation',
      'Public access',
      'No logging'
    ],
    correctAnswer: 1,
    explanation: 'API security requires authentication, authorization, rate limiting, input validation, and monitoring for abuse.',
    topic: 'Application Security',
    subtopic: 'API Security'
  },
  {
    id: 'CISA5-068',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'OAuth 2.0 provides:',
    options: [
      'Integration',
      'Delegated authorization for third-party application access',
      'Database access',
      'File sharing'
    ],
    correctAnswer: 1,
    explanation: 'OAuth 2.0 enables delegated authorization, allowing users to grant third-party applications limited access to resources.',
    topic: 'Access Control',
    subtopic: 'OAuth'
  },
  {
    id: 'CISA5-069',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'SAML assertions contain:',
    options: [
      'Only passwords',
      'Authentication, authorization, and attribute information',
      'Only usernames',
      'Only timestamps'
    ],
    correctAnswer: 1,
    explanation: 'SAML assertions contain authentication status, authorization decisions, and user attributes for federated identity.',
    topic: 'Access Control',
    subtopic: 'SAML'
  },
  {
    id: 'CISA5-070',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Just-In-Time (JIT) provisioning:',
    options: [
      'Pre-creates all accounts',
      'Creates accounts automatically at first login',
      'Deletes accounts immediately',
      'Disables access'
    ],
    correctAnswer: 1,
    explanation: 'JIT provisioning automatically creates user accounts in applications at the time of first login based on identity provider data.',
    topic: 'Access Management',
    subtopic: 'JIT Provisioning'
  },
  {
    id: 'CISA5-071',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Privileged Access Workstations (PAWs):',
    options: [
      'Allow all activities',
      'Are dedicated systems for privileged administration tasks',
      'Are shared workstations',
      'Have no restrictions'
    ],
    correctAnswer: 1,
    explanation: 'PAWs are hardened, dedicated systems used exclusively for privileged administrative tasks, reducing attack surface.',
    topic: 'Access Control',
    subtopic: 'PAW'
  },
  {
    id: 'CISA5-072',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Credential stuffing attacks use:',
    options: [
      'Random passwords',
      'Breached credentials from other sites to gain unauthorized access',
      'Brute force only',
      'Social engineering only'
    ],
    correctAnswer: 1,
    explanation: 'Credential stuffing uses breached username/password combinations from other sites, exploiting password reuse.',
    topic: 'Information Security',
    subtopic: 'Credential Stuffing'
  },
  {
    id: 'CISA5-073',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Security awareness training should cover:',
    options: [
      'Only technical staff',
      'All employees with role-appropriate content',
      'Only management',
      'Only IT security'
    ],
    correctAnswer: 1,
    explanation: 'Security awareness training should reach all employees with content appropriate to their roles and responsibilities.',
    topic: 'Security Management',
    subtopic: 'Security Awareness'
  },
  {
    id: 'CISA5-074',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Phishing simulations:',
    options: [
      'Punish users',
      'Test and improve employee awareness of phishing threats',
      'Replace training',
      'Only count failures'
    ],
    correctAnswer: 1,
    explanation: 'Phishing simulations test employee awareness and provide learning opportunities, not to punish but to improve awareness.',
    topic: 'Security Management',
    subtopic: 'Phishing Simulations'
  },
  {
    id: 'CISA5-075',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Deception technology (honeypots/honeynets):',
    options: [
      'Provides production services',
      'Attracts attackers to detect and study their methods',
      'Replaces firewalls',
      'Stores sensitive data'
    ],
    correctAnswer: 1,
    explanation: 'Deception technology uses decoys to attract attackers, enabling detection and analysis of attack methods.',
    topic: 'Security Controls',
    subtopic: 'Deception'
  },
  {
    id: 'CISA5-076',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Network segmentation reduces risk by:',
    options: [
      'Increasing connectivity',
      'Limiting lateral movement and containing breaches',
      'Removing firewalls',
      'Allowing all traffic'
    ],
    correctAnswer: 1,
    explanation: 'Network segmentation limits lateral movement by attackers and contains breaches to smaller network segments.',
    topic: 'Network Security',
    subtopic: 'Segmentation'
  },
  {
    id: 'CISA5-077',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Micro-segmentation extends segmentation to:',
    options: [
      'Only network perimeter',
      'Individual workloads and applications',
      'Only data centers',
      'Only cloud'
    ],
    correctAnswer: 1,
    explanation: 'Micro-segmentation provides granular security by segmenting at the individual workload or application level.',
    topic: 'Network Security',
    subtopic: 'Micro-segmentation'
  },
  {
    id: 'CISA5-078',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Cloud Access Security Brokers (CASBs) provide:',
    options: [
      'Only authentication',
      'Visibility and control over cloud service usage',
      'Only encryption',
      'Only storage'
    ],
    correctAnswer: 1,
    explanation: 'CASBs provide visibility, compliance, data security, and threat protection for cloud service usage.',
    topic: 'Cloud Security',
    subtopic: 'CASB'
  },
  {
    id: 'CISA5-079',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Data Loss Prevention (DLP) systems:',
    options: [
      'Only encrypt data',
      'Detect and prevent unauthorized data transmission',
      'Only backup data',
      'Only classify data'
    ],
    correctAnswer: 1,
    explanation: 'DLP systems detect sensitive data and prevent unauthorized transmission through monitoring, detection, and blocking.',
    topic: 'Data Security',
    subtopic: 'DLP'
  },
  {
    id: 'CISA5-080',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Email security gateways should provide:',
    options: [
      'Only spam filtering',
      'Anti-malware, anti-phishing, and content filtering',
      'Only routing',
      'Only archiving'
    ],
    correctAnswer: 1,
    explanation: 'Email security gateways should provide comprehensive protection including anti-malware, anti-phishing, and content filtering.',
    topic: 'Network Security',
    subtopic: 'Email Security'
  },
  {
    id: 'CISA5-081',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'DMARC (Domain-based Message Authentication):',
    options: [
      'Encrypts emails',
      'Helps prevent email spoofing using SPF and DKIM',
      'Filters spam',
      'Archives emails'
    ],
    correctAnswer: 1,
    explanation: 'DMARC builds on SPF and DKIM to help prevent email spoofing by defining how receivers should handle authentication failures.',
    topic: 'Network Security',
    subtopic: 'DMARC'
  },
  {
    id: 'CISA5-082',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Secure file transfer should use:',
    options: [
      'FTP only',
      'Encrypted protocols like SFTP or FTPS',
      'Unencrypted channels',
      'Email attachments only'
    ],
    correctAnswer: 1,
    explanation: 'Secure file transfer should use encrypted protocols like SFTP or FTPS to protect data in transit.',
    topic: 'Data Security',
    subtopic: 'Secure Transfer'
  },
  {
    id: 'CISA5-083',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Database activity monitoring (DAM):',
    options: [
      'Only backs up data',
      'Monitors and analyzes database activity for security',
      'Only optimizes queries',
      'Only manages schemas'
    ],
    correctAnswer: 1,
    explanation: 'DAM monitors database activity in real-time to detect unauthorized access, policy violations, and anomalies.',
    topic: 'Data Security',
    subtopic: 'DAM'
  },
  {
    id: 'CISA5-084',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Data masking:',
    options: [
      'Deletes data',
      'Obscures sensitive data while preserving format for testing',
      'Encrypts in transit',
      'Compresses data'
    ],
    correctAnswer: 1,
    explanation: 'Data masking obscures sensitive data while maintaining realistic format, enabling safe use in non-production environments.',
    topic: 'Data Security',
    subtopic: 'Data Masking'
  },
  {
    id: 'CISA5-085',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Tokenization:',
    options: [
      'Encrypts data symmetrically',
      'Replaces sensitive data with non-sensitive tokens',
      'Hashes data irreversibly',
      'Compresses data'
    ],
    correctAnswer: 1,
    explanation: 'Tokenization replaces sensitive data with non-sensitive tokens, with mapping stored securely in a token vault.',
    topic: 'Data Security',
    subtopic: 'Tokenization'
  },
  {
    id: 'CISA5-086',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Mobile device management (MDM) enables:',
    options: [
      'Only device tracking',
      'Policy enforcement, remote wipe, and application management',
      'Only email access',
      'Only call management'
    ],
    correctAnswer: 1,
    explanation: 'MDM enables policy enforcement, remote wipe, application management, and secure configuration of mobile devices.',
    topic: 'Endpoint Security',
    subtopic: 'MDM'
  },
  {
    id: 'CISA5-087',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Containerization on mobile devices:',
    options: [
      'Mixes personal and work data',
      'Separates work data in a secure container',
      'Removes all security',
      'Allows unrestricted access'
    ],
    correctAnswer: 1,
    explanation: 'Mobile containerization separates work data in a secure, encrypted container, enabling BYOD while protecting corporate data.',
    topic: 'Endpoint Security',
    subtopic: 'Containerization'
  },
  {
    id: 'CISA5-088',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Security Operations Center (SOC) primary function is:',
    options: [
      'Development',
      'Monitoring, detecting, and responding to security incidents',
      'Sales support',
      'Hardware maintenance'
    ],
    correctAnswer: 1,
    explanation: 'SOCs provide centralized security monitoring, detection, analysis, and response to security incidents.',
    topic: 'Security Operations',
    subtopic: 'SOC'
  },
  {
    id: 'CISA5-089',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Threat intelligence feeds provide:',
    options: [
      'Only historical data',
      'Indicators of compromise and threat context',
      'Only vendor marketing',
      'Only compliance information'
    ],
    correctAnswer: 1,
    explanation: 'Threat intelligence feeds provide indicators of compromise, threat actor information, and context for proactive defense.',
    topic: 'Security Operations',
    subtopic: 'Threat Intelligence'
  },
  {
    id: 'CISA5-090',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'MITRE ATT&CK framework:',
    options: [
      'Is a compliance standard',
      'Documents adversary tactics, techniques, and procedures',
      'Is a vulnerability database',
      'Is a policy framework'
    ],
    correctAnswer: 1,
    explanation: 'MITRE ATT&CK documents adversary TTPs, providing a knowledge base for understanding and defending against threats.',
    topic: 'Security Operations',
    subtopic: 'MITRE ATT&CK'
  },
  {
    id: 'CISA5-092',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Evidence preservation in incident response requires:',
    options: [
      'Immediate deletion',
      'Chain of custody documentation and forensic imaging',
      'Quick recovery only',
      'No documentation'
    ],
    correctAnswer: 1,
    explanation: 'Evidence preservation requires proper chain of custody documentation, forensic imaging, and secure storage for potential legal proceedings.',
    topic: 'Incident Response',
    subtopic: 'Evidence Preservation'
  },
];

export default CISA5_QUESTIONS_BATCH4;
