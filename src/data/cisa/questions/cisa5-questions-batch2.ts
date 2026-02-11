/**
 * CISA Domain 5: Protection of Information Assets
 * Batch 2 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA5_QUESTIONS_BATCH2: Question[] = [
  {
    id: 'CISA5-003',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'The PRIMARY goal of information security management is to:',
    options: [
      'Eliminate all security risks',
      'Protect information assets in alignment with business objectives',
      'Implement the latest security technologies',
      'Achieve regulatory compliance'
    ],
    correctAnswer: 1,
    explanation: 'Information security management protects information assets in a manner that aligns with and supports business objectives, balancing security with operational needs.',
    topic: 'Security Management',
    subtopic: 'Security Goals'
  },
  {
    id: 'CISA5-004',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'The three pillars of information security are:',
    options: [
      'People, process, technology',
      'Confidentiality, integrity, availability (CIA)',
      'Prevention, detection, correction',
      'Physical, technical, administrative'
    ],
    correctAnswer: 1,
    explanation: 'The CIA triad (Confidentiality, Integrity, Availability) represents the three fundamental pillars of information security.',
    topic: 'Security Fundamentals',
    subtopic: 'CIA Triad'
  },
  {
    id: 'CISA5-005',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Data classification is important because it:',
    options: [
      'Reduces storage costs',
      'Enables appropriate protection based on sensitivity',
      'Eliminates the need for encryption',
      'Simplifies user access'
    ],
    correctAnswer: 1,
    explanation: 'Data classification enables organizations to apply appropriate protection based on data sensitivity, ensuring critical data receives adequate protection.',
    topic: 'Data Security',
    subtopic: 'Data Classification'
  },
  {
    id: 'CISA5-006',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'The principle of least privilege means:',
    options: [
      'Users have no access to systems',
      'Users have only the access needed to perform their job',
      'All users have the same access',
      'Access is reviewed annually'
    ],
    correctAnswer: 1,
    explanation: 'Least privilege ensures users have only the minimum access rights necessary to perform their job functions, reducing the risk of unauthorized access.',
    topic: 'Access Control',
    subtopic: 'Least Privilege'
  },
  {
    id: 'CISA5-007',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Mandatory access control (MAC) is characterized by:',
    options: [
      'User-controlled permissions',
      'System-enforced access based on security labels',
      'Role-based permissions',
      'No access restrictions'
    ],
    correctAnswer: 1,
    explanation: 'MAC is enforced by the system based on security labels (classifications) assigned to subjects and objects. Users cannot override these controls.',
    topic: 'Access Control',
    subtopic: 'MAC'
  },
  {
    id: 'CISA5-008',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Role-based access control (RBAC) assigns access based on:',
    options: [
      'User identity',
      'Job function or role',
      'Data classification',
      'Time of day'
    ],
    correctAnswer: 1,
    explanation: 'RBAC assigns access permissions based on the user\'s job function or role, simplifying access management and ensuring consistency.',
    topic: 'Access Control',
    subtopic: 'RBAC'
  },
  {
    id: 'CISA5-009',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Multi-factor authentication requires factors from:',
    options: [
      'Two passwords',
      'Two or more different authentication categories',
      'The same authentication category',
      'Biometrics only'
    ],
    correctAnswer: 1,
    explanation: 'MFA requires authentication factors from different categories: something you know (password), something you have (token), something you are (biometrics).',
    topic: 'Authentication',
    subtopic: 'MFA'
  },
  {
    id: 'CISA5-010',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Single sign-on (SSO) provides:',
    options: [
      'Stronger authentication',
      'Access to multiple systems with one authentication',
      'Elimination of passwords',
      'Reduced security'
    ],
    correctAnswer: 1,
    explanation: 'SSO allows users to authenticate once and access multiple systems without re-authenticating, improving user experience and reducing password fatigue.',
    topic: 'Authentication',
    subtopic: 'SSO'
  },
  {
    id: 'CISA5-011',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Identity and access management (IAM) encompasses:',
    options: [
      'Only password management',
      'Provisioning, authentication, authorization, and review processes',
      'Only user creation',
      'Only network access'
    ],
    correctAnswer: 1,
    explanation: 'IAM includes all processes for managing user identities: provisioning, authentication, authorization, access review, and deprovisioning.',
    topic: 'Access Control',
    subtopic: 'IAM'
  },
  {
    id: 'CISA5-012',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'User access reviews should be performed to:',
    options: [
      'Reduce IT workload',
      'Ensure access remains appropriate and remove unnecessary access',
      'Increase user productivity',
      'Satisfy audit requirements only'
    ],
    correctAnswer: 1,
    explanation: 'Access reviews ensure that user access remains appropriate for current job functions and that unnecessary access is removed, reducing the risk of unauthorized access.',
    topic: 'Access Control',
    subtopic: 'Access Review'
  },
  {
    id: 'CISA5-013',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Encryption protects data by:',
    options: [
      'Deleting sensitive data',
      'Converting data into an unreadable format without the key',
      'Compressing data',
      'Moving data offsite'
    ],
    correctAnswer: 1,
    explanation: 'Encryption transforms data into an unreadable format that can only be decrypted with the appropriate key, protecting confidentiality.',
    topic: 'Cryptography',
    subtopic: 'Encryption'
  },
  {
    id: 'CISA5-014',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Symmetric encryption uses:',
    options: [
      'Different keys for encryption and decryption',
      'The same key for encryption and decryption',
      'No keys',
      'Public keys only'
    ],
    correctAnswer: 1,
    explanation: 'Symmetric encryption uses the same key for both encryption and decryption, making key distribution a challenge but offering faster performance.',
    topic: 'Cryptography',
    subtopic: 'Symmetric Encryption'
  },
  {
    id: 'CISA5-015',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Asymmetric encryption uses:',
    options: [
      'The same key for both operations',
      'A public key and a private key',
      'Only passwords',
      'Hash functions'
    ],
    correctAnswer: 1,
    explanation: 'Asymmetric encryption uses a key pair: a public key for encryption and a private key for decryption, solving the key distribution problem.',
    topic: 'Cryptography',
    subtopic: 'Asymmetric Encryption'
  },
  {
    id: 'CISA5-016',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Digital signatures provide:',
    options: [
      'Encryption of data',
      'Authentication and non-repudiation',
      'Data compression',
      'Access control'
    ],
    correctAnswer: 1,
    explanation: 'Digital signatures provide authentication (verifying sender identity), integrity (detecting changes), and non-repudiation (sender cannot deny sending).',
    topic: 'Cryptography',
    subtopic: 'Digital Signatures'
  },
  {
    id: 'CISA5-017',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Public key infrastructure (PKI) provides:',
    options: [
      'Physical security',
      'Framework for managing digital certificates',
      'Network segmentation',
      'Backup services'
    ],
    correctAnswer: 1,
    explanation: 'PKI provides a framework for issuing, managing, and validating digital certificates that bind public keys to identities.',
    topic: 'Cryptography',
    subtopic: 'PKI'
  },
  {
    id: 'CISA5-018',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'A firewall controls traffic based on:',
    options: [
      'User preferences',
      'Rules defining allowed and blocked traffic',
      'Random selection',
      'Network speed'
    ],
    correctAnswer: 1,
    explanation: 'Firewalls filter network traffic based on predefined rules that specify which traffic is allowed or blocked based on source, destination, ports, and protocols.',
    topic: 'Network Security',
    subtopic: 'Firewalls'
  },
  {
    id: 'CISA5-019',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'An intrusion detection system (IDS) is designed to:',
    options: [
      'Block all network traffic',
      'Detect and alert on suspicious activity',
      'Encrypt network communications',
      'Manage user access'
    ],
    correctAnswer: 1,
    explanation: 'An IDS monitors network or system activity for suspicious behavior and generates alerts when potential intrusions are detected.',
    topic: 'Network Security',
    subtopic: 'IDS'
  },
  {
    id: 'CISA5-020',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'An intrusion prevention system (IPS) differs from an IDS in that it:',
    options: [
      'Only monitors traffic',
      'Can automatically block detected threats',
      'Does not generate alerts',
      'Works only on endpoints'
    ],
    correctAnswer: 1,
    explanation: 'Unlike IDS which only detects and alerts, IPS can automatically take action to block or prevent detected threats.',
    topic: 'Network Security',
    subtopic: 'IPS'
  },
  {
    id: 'CISA5-021',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Network segmentation improves security by:',
    options: [
      'Increasing network speed',
      'Limiting the spread of attacks and isolating sensitive systems',
      'Reducing hardware costs',
      'Simplifying network management'
    ],
    correctAnswer: 1,
    explanation: 'Network segmentation divides networks into separate zones, limiting attack spread, isolating sensitive systems, and enabling more granular access control.',
    topic: 'Network Security',
    subtopic: 'Segmentation'
  },
  {
    id: 'CISA5-022',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'A virtual private network (VPN) provides:',
    options: [
      'Physical network isolation',
      'Encrypted communications over public networks',
      'Faster internet speeds',
      'Antivirus protection'
    ],
    correctAnswer: 1,
    explanation: 'A VPN creates an encrypted tunnel for communications over public networks, providing confidentiality and secure remote access.',
    topic: 'Network Security',
    subtopic: 'VPN'
  },
  {
    id: 'CISA5-023',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Malware protection should include:',
    options: [
      'Only antivirus software',
      'Multiple layers including prevention, detection, and response',
      'Only network controls',
      'Annual scanning'
    ],
    correctAnswer: 1,
    explanation: 'Effective malware protection uses multiple layers: preventive controls, detection mechanisms, and response capabilities for defense in depth.',
    topic: 'Endpoint Security',
    subtopic: 'Malware Protection'
  },
  {
    id: 'CISA5-024',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Vulnerability management includes:',
    options: [
      'Only patching systems',
      'Identification, assessment, prioritization, and remediation of vulnerabilities',
      'Only scanning for vulnerabilities',
      'Only reporting to management'
    ],
    correctAnswer: 1,
    explanation: 'Vulnerability management is a continuous process of identifying, assessing, prioritizing, and remediating security vulnerabilities.',
    topic: 'Security Operations',
    subtopic: 'Vulnerability Management'
  },
  {
    id: 'CISA5-025',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Patch management is important because it:',
    options: [
      'Improves system performance',
      'Addresses known security vulnerabilities',
      'Reduces storage requirements',
      'Simplifies user training'
    ],
    correctAnswer: 1,
    explanation: 'Patch management addresses known security vulnerabilities by applying vendor-provided fixes, reducing the attack surface.',
    topic: 'Security Operations',
    subtopic: 'Patch Management'
  },
  {
    id: 'CISA5-026',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Security awareness training should be:',
    options: [
      'Provided only to IT staff',
      'Provided to all employees and updated regularly',
      'A one-time event',
      'Optional for management'
    ],
    correctAnswer: 1,
    explanation: 'Security awareness training should be provided to all employees and updated regularly to address evolving threats and reinforce security practices.',
    topic: 'Security Management',
    subtopic: 'Security Awareness'
  },
  {
    id: 'CISA5-027',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Security incident response should include:',
    options: [
      'Only technical remediation',
      'Detection, containment, eradication, recovery, and lessons learned',
      'Only reporting to management',
      'Only restoring from backup'
    ],
    correctAnswer: 1,
    explanation: 'Incident response includes detection, containment, eradication, recovery, and post-incident review for continuous improvement.',
    topic: 'Incident Response',
    subtopic: 'IR Process'
  },
  {
    id: 'CISA5-028',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Physical security controls include:',
    options: [
      'Only guards',
      'Barriers, access controls, surveillance, and environmental protections',
      'Only locks',
      'Only cameras'
    ],
    correctAnswer: 1,
    explanation: 'Physical security includes multiple layers: barriers, access controls (badges, biometrics), surveillance (cameras), environmental controls, and security personnel.',
    topic: 'Physical Security',
    subtopic: 'Physical Controls'
  },
  {
    id: 'CISA5-029',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Social engineering attacks target:',
    options: [
      'System vulnerabilities',
      'Human psychology to bypass security controls',
      'Network infrastructure',
      'Physical barriers'
    ],
    correctAnswer: 1,
    explanation: 'Social engineering exploits human psychology rather than technical vulnerabilities, manipulating people into revealing information or taking harmful actions.',
    topic: 'Security Threats',
    subtopic: 'Social Engineering'
  },
  {
    id: 'CISA5-030',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Data loss prevention (DLP) controls:',
    options: [
      'Only encrypt data',
      'Monitor and prevent unauthorized data exfiltration',
      'Only backup data',
      'Only classify data'
    ],
    correctAnswer: 1,
    explanation: 'DLP solutions monitor data in motion, at rest, and in use to detect and prevent unauthorized transmission of sensitive data outside the organization.',
    topic: 'Data Security',
    subtopic: 'DLP'
  },
  {
    id: 'CISA5-031',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Privacy controls should ensure:',
    options: [
      'All data is public',
      'Personal information is collected, used, and protected appropriately',
      'No data is collected',
      'Only IT has access to personal data'
    ],
    correctAnswer: 1,
    explanation: 'Privacy controls ensure personal information is collected with consent, used for stated purposes, protected appropriately, and handled in compliance with regulations.',
    topic: 'Privacy',
    subtopic: 'Privacy Controls'
  },
  {
    id: 'CISA5-032',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Security metrics should:',
    options: [
      'Be kept confidential from management',
      'Measure the effectiveness of security controls',
      'Only count security incidents',
      'Be reported annually'
    ],
    correctAnswer: 1,
    explanation: 'Security metrics should measure the effectiveness of security controls using meaningful, actionable indicators that demonstrate security posture and trends.',
    topic: 'Security Management',
    subtopic: 'Security Metrics'
  },
];

export default CISA5_QUESTIONS_BATCH2;
