/**
 * CISA Domain 5: Protection of Information Assets - Flashcards
 * 27% of exam weight (largest domain)
 */

import { Flashcard } from './types';

export const cisa5Flashcards: Flashcard[] = [
  // Security Governance
  {
    id: 'CISA5-FC-001',
    front: 'What is the CISO\'s primary responsibility?',
    back: 'To establish and maintain the organization\'s security program, ensure security aligns with business objectives, and advise leadership on security risks.',
    category: 'Security Governance',
    tags: ['CISO', 'security governance', 'CISA5'],
  },
  {
    id: 'CISA5-FC-002',
    front: 'What is the difference between a data owner and data custodian?',
    back: 'Data Owner: Business person responsible for classification, access decisions\nData Custodian: IT person responsible for implementing controls, protecting data',
    category: 'Security Governance',
    tags: ['data owner', 'data custodian', 'roles', 'CISA5'],
  },
  {
    id: 'CISA5-FC-003',
    front: 'What is the policy hierarchy?',
    back: 'Policies (high-level, mandatory) → Standards (specific requirements, mandatory) → Procedures (step-by-step, mandatory) → Guidelines (recommendations, optional)',
    category: 'Security Governance',
    tags: ['policy hierarchy', 'standards', 'CISA5'],
  },
  
  // Data Classification
  {
    id: 'CISA5-FC-004',
    front: 'What are typical commercial data classification levels?',
    back: 'Public → Internal → Confidential/Restricted\nProtection increases with classification level.',
    category: 'Data Classification',
    tags: ['classification', 'data protection', 'CISA5'],
  },
  {
    id: 'CISA5-FC-005',
    front: 'Who is responsible for classifying data?',
    back: 'The data owner (business) is responsible for classification. IT (custodian) implements the appropriate controls based on classification.',
    category: 'Data Classification',
    tags: ['classification', 'data owner', 'CISA5'],
  },
  {
    id: 'CISA5-FC-006',
    front: 'What is DLP?',
    back: 'Data Loss Prevention - technology that detects and prevents unauthorized data transfers. Monitors network, endpoints, and storage for sensitive data.',
    category: 'Data Protection',
    tags: ['DLP', 'data protection', 'CISA5'],
  },
  
  // Access Control
  {
    id: 'CISA5-FC-007',
    front: 'What is AAA in access control?',
    back: 'Authentication: Verify identity (who are you?)\nAuthorization: Determine permissions (what can you do?)\nAccounting: Record activities (what did you do?)',
    category: 'Access Control',
    tags: ['AAA', 'authentication', 'authorization', 'CISA5'],
  },
  {
    id: 'CISA5-FC-008',
    front: 'What are the authentication factors?',
    back: 'Something you Know (password)\nSomething you Have (token)\nSomething you Are (biometric)\nSomewhere you Are (location)\nSomething you Do (behavior)',
    category: 'Access Control',
    tags: ['authentication factors', 'MFA', 'CISA5'],
  },
  {
    id: 'CISA5-FC-009',
    front: 'What makes multi-factor authentication (MFA) valid?',
    back: 'Factors must be from DIFFERENT categories. Password + security question = single factor (both "know"). Password + token = true MFA (know + have).',
    category: 'Access Control',
    tags: ['MFA', 'two-factor', 'CISA5'],
  },
  {
    id: 'CISA5-FC-010',
    front: 'What are the main access control models?',
    back: 'DAC: Owner controls access\nMAC: System enforces via labels\nRBAC: Access based on roles\nABAC: Access based on attributes',
    category: 'Access Control',
    tags: ['access control models', 'DAC', 'MAC', 'RBAC', 'CISA5'],
  },
  {
    id: 'CISA5-FC-011',
    front: 'What is the principle of least privilege?',
    back: 'Users should have only the minimum access rights necessary to perform their job functions. Reduces risk from compromised accounts.',
    category: 'Access Control',
    tags: ['least privilege', 'access control', 'CISA5'],
  },
  
  // IAM
  {
    id: 'CISA5-FC-012',
    front: 'What are the three phases of the identity lifecycle?',
    back: 'Provisioning (Joiner): Create account, assign access\nMaintenance (Mover): Update for role changes\nDeprovisioning (Leaver): Remove access on departure',
    category: 'IAM',
    tags: ['identity lifecycle', 'JML', 'CISA5'],
  },
  {
    id: 'CISA5-FC-013',
    front: 'What is an access review/certification?',
    back: 'Periodic review where managers verify user access is still appropriate. Combats privilege creep and ensures least privilege.',
    category: 'IAM',
    tags: ['access review', 'certification', 'CISA5'],
  },
  {
    id: 'CISA5-FC-014',
    front: 'What is PAM?',
    back: 'Privileged Access Management - controls for protecting admin accounts. Includes credential vaulting, session recording, just-in-time access.',
    category: 'IAM',
    tags: ['PAM', 'privileged access', 'CISA5'],
  },
  {
    id: 'CISA5-FC-015',
    front: 'What is SSO?',
    back: 'Single Sign-On - authentication where one login provides access to multiple systems. Improves user experience but concentrates risk at the SSO credential.',
    category: 'IAM',
    tags: ['SSO', 'single sign-on', 'CISA5'],
  },
  
  // Network Security
  {
    id: 'CISA5-FC-016',
    front: 'What is the difference between IDS and IPS?',
    back: 'IDS (Detection): Monitors and alerts, passive\nIPS (Prevention): Monitors and blocks, inline active\nIPS can disrupt traffic if misconfigured.',
    category: 'Network Security',
    tags: ['IDS', 'IPS', 'network security', 'CISA5'],
  },
  {
    id: 'CISA5-FC-017',
    front: 'What are the firewall types?',
    back: 'Packet filter (Layer 3-4) → Stateful (tracks connections) → Application proxy (Layer 7) → Next-gen/NGFW (app-aware, IPS, identity)',
    category: 'Network Security',
    tags: ['firewall', 'network security', 'CISA5'],
  },
  {
    id: 'CISA5-FC-018',
    front: 'What is a DMZ?',
    back: 'Demilitarized Zone - network segment between internal network and internet for public-facing services. Contains servers accessible from outside.',
    category: 'Network Security',
    tags: ['DMZ', 'network zones', 'CISA5'],
  },
  {
    id: 'CISA5-FC-019',
    front: 'What is Zero Trust?',
    back: '"Never trust, always verify" - security model that verifies explicitly, uses least privilege, and assumes breach. No implicit trust based on network location.',
    category: 'Network Security',
    tags: ['zero trust', 'network security', 'CISA5'],
  },
  
  // Cryptography
  {
    id: 'CISA5-FC-020',
    front: 'What is the difference between symmetric and asymmetric encryption?',
    back: 'Symmetric: Same key encrypts/decrypts (fast, key distribution problem)\nAsymmetric: Public/private key pair (slower, solves distribution)',
    category: 'Cryptography',
    tags: ['encryption', 'symmetric', 'asymmetric', 'CISA5'],
  },
  {
    id: 'CISA5-FC-021',
    front: 'What is AES?',
    back: 'Advanced Encryption Standard - current symmetric encryption standard. Supports 128, 192, 256-bit keys. Replaced DES.',
    category: 'Cryptography',
    tags: ['AES', 'symmetric encryption', 'CISA5'],
  },
  {
    id: 'CISA5-FC-022',
    front: 'What does a digital signature provide?',
    back: 'Integrity: Message not altered\nAuthentication: Verified sender\nNon-repudiation: Sender cannot deny\n(Does NOT provide confidentiality)',
    category: 'Cryptography',
    tags: ['digital signature', 'non-repudiation', 'CISA5'],
  },
  {
    id: 'CISA5-FC-023',
    front: 'What is PKI?',
    back: 'Public Key Infrastructure - framework for managing digital certificates. Components: Certificate Authority (CA), Registration Authority (RA), certificates.',
    category: 'Cryptography',
    tags: ['PKI', 'certificates', 'CA', 'CISA5'],
  },
  
  // Web Security
  {
    id: 'CISA5-FC-024',
    front: 'What is XSS (Cross-Site Scripting)?',
    back: 'Attack where malicious scripts are injected into web pages viewed by other users. Steal sessions, deface sites, redirect users.',
    category: 'Web Security',
    tags: ['XSS', 'web vulnerability', 'OWASP', 'CISA5'],
  },
  {
    id: 'CISA5-FC-025',
    front: 'What email authentication standards prevent spoofing?',
    back: 'SPF: Sender Policy Framework (authorized senders)\nDKIM: DomainKeys (email signing)\nDMARC: Domain-based Authentication (policy enforcement)',
    category: 'Email Security',
    tags: ['SPF', 'DKIM', 'DMARC', 'email security', 'CISA5'],
  },
  
  // Malware
  {
    id: 'CISA5-FC-026',
    front: 'What are the main malware types?',
    back: 'Virus: Requires host file\nWorm: Self-replicating, no host needed\nTrojan: Disguised as legitimate\nRansomware: Encrypts for ransom\nRootkit: Hides deep in system',
    category: 'Malware',
    tags: ['malware', 'virus', 'worm', 'ransomware', 'CISA5'],
  },
  {
    id: 'CISA5-FC-027',
    front: 'What is EDR?',
    back: 'Endpoint Detection and Response - advanced endpoint protection with real-time monitoring, threat detection, investigation, and automated response capabilities.',
    category: 'Endpoint Security',
    tags: ['EDR', 'endpoint protection', 'CISA5'],
  },
  
  // Monitoring
  {
    id: 'CISA5-FC-028',
    front: 'What is SIEM?',
    back: 'Security Information and Event Management - centralizes logs, correlates events, provides alerts, dashboards, and compliance reporting.',
    category: 'Security Monitoring',
    tags: ['SIEM', 'log management', 'monitoring', 'CISA5'],
  },
  
  // Cloud Security

  {
    id: 'CISA5-FC-030',
    front: 'What is CASB?',
    back: 'Cloud Access Security Broker - security policy enforcement between users and cloud services. Provides visibility, compliance, DLP, and threat protection.',
    category: 'Cloud Security',
    tags: ['CASB', 'cloud security', 'CISA5'],
  },
  
  // Privacy
  {
    id: 'CISA5-FC-031',
    front: 'What is GDPR?',
    back: 'General Data Protection Regulation - EU law protecting personal data. Requires lawful basis, consent, breach notification (72 hrs), and grants data subject rights.',
    category: 'Privacy',
    tags: ['GDPR', 'privacy', 'regulation', 'CISA5'],
  },
  {
    id: 'CISA5-FC-032',
    front: 'What are the GDPR data subject rights?',
    back: 'Right to: Access, Rectification, Erasure ("right to be forgotten"), Portability, Object to processing, Explanation of automated decisions',
    category: 'Privacy',
    tags: ['GDPR', 'data subject rights', 'CISA5'],
  },
  {
    id: 'CISA5-FC-033',
    front: 'What is Privacy by Design?',
    back: 'Building privacy into systems proactively, not as afterthought. Principles: Default privacy, embedded in design, full functionality, end-to-end security, user-centric.',
    category: 'Privacy',
    tags: ['privacy by design', 'PbD', 'CISA5'],
  },
  {
    id: 'CISA5-FC-034',
    front: 'What is a Privacy Impact Assessment (PIA)?',
    back: 'Systematic analysis of privacy risks from new processing activities. Required under GDPR for high-risk processing. Identifies and mitigates privacy issues.',
    category: 'Privacy',
    tags: ['PIA', 'DPIA', 'privacy assessment', 'CISA5'],
  },
  
  // Social Engineering
  {
    id: 'CISA5-FC-035',
    front: 'What is the difference between phishing and spear phishing?',
    back: 'Phishing: Mass emails to many targets, generic\nSpear phishing: Targeted at specific individuals, personalized, more effective',
    category: 'Social Engineering',
    tags: ['phishing', 'spear phishing', 'social engineering', 'CISA5'],
  },
  {
    id: 'CISA5-FC-036',
    front: 'What is vishing?',
    back: 'Voice phishing - social engineering attack conducted over phone. Attacker impersonates authority figures to extract information or credentials.',
    category: 'Social Engineering',
    tags: ['vishing', 'social engineering', 'CISA5'],
  },
];

export default cisa5Flashcards;
