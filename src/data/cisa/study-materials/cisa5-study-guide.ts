/**
 * CISA Domain 5 Study Guide
 * Protection of Information Assets
 * 
 * Based on 2024 ISACA CISA Exam Content Outline
 * Weight: 27% (approximately 41 questions) - HIGHEST WEIGHTED DOMAIN
 */

import { CISAStudyGuide } from './cisa1-study-guide';

export const CISA5_STUDY_GUIDE: CISAStudyGuide = {
  id: 'cisa5-study-guide',
  section: 'CISA5',
  title: 'Domain 5: Protection of Information Assets',
  version: '2024',
  lastUpdated: '2026-02-10',

  examFormat: {
    totalQuestions: 150,
    questionType: 'Multiple Choice Questions (MCQ)',
    duration: '4 hours',
    passingScore: '450 scaled score (out of 800)',
  },

  blueprintAreas: [
    // =====================================================
    // Domain 5A: Information Asset Security and Control
    // =====================================================
    {
      id: 'CISA5-A',
      title: 'Information Asset Security Frameworks',
      weight: '~9%',
      overview: 'Security policies, standards, and frameworks for protecting organizational information assets.',

      keyTopics: [
        {
          name: 'Information Security Governance',
          description: 'Establishing security management structure',
          keyPoints: [
            'Security policy: High-level statement of management intent',
            'Standards: Specific mandatory requirements',
            'Procedures: Step-by-step instructions',
            'Guidelines: Recommended practices (optional)',
            'Security awareness training for all employees',
          ],
        },
        {
          name: 'Information Classification',
          description: 'Categorizing data based on sensitivity',
          keyPoints: [
            'Public: No harm if disclosed',
            'Internal: Limited internal access',
            'Confidential: Significant harm if disclosed',
            'Secret/Top Secret: Severe organizational damage',
            'Data owners responsible for classification decisions',
          ],
        },
        {
          name: 'Security Frameworks',
          description: 'Industry standard security approaches',
          keyPoints: [
            'ISO 27001/27002: International security standard',
            'NIST Cybersecurity Framework: US government framework',
            'COBIT: IT governance including security',
            'CIS Controls: Prioritized security actions',
            'Framework selection based on industry and regulations',
          ],
        },
      ],
      examTips: [
        'Policies are high-level; procedures are detailed steps',
        'Data owner determines classification level',
        'Know the hierarchy: Policy > Standard > Procedure > Guideline',
      ],
    },
    // =====================================================
    // Domain 5B: Logical Access Controls
    // =====================================================
    {
      id: 'CISA5-B',
      title: 'Logical Access Controls',
      weight: '~9%',
      overview: 'Authentication, authorization, and access control mechanisms for information systems.',

      keyTopics: [
        {
          name: 'Authentication Methods',
          description: 'Verifying user identity',
          keyPoints: [
            'Something you KNOW: Password, PIN',
            'Something you HAVE: Token, smart card, phone',
            'Something you ARE: Biometrics (fingerprint, retina)',
            'Something you DO: Keystroke dynamics, gait',
            'Multi-factor: Combining two or more categories',
          ],
        },
        {
          name: 'Biometric Authentication',
          description: 'Physical and behavioral characteristics',
          keyPoints: [
            'Type I Error (FRR): False Rejection - legitimate user rejected',
            'Type II Error (FAR): False Acceptance - impostor accepted',
            'CER/EER: Crossover Error Rate - where FRR = FAR',
            'Lower CER = more accurate biometric system',
            'Most accurate: Iris/retina > fingerprint > voice',
          ],
        },
        {
          name: 'Access Control Models',
          description: 'Frameworks for granting access',
          keyPoints: [
            'DAC: Discretionary - owner grants access at discretion',
            'MAC: Mandatory - system enforces based on labels',
            'RBAC: Role-Based - access based on job role',
            'ABAC: Attribute-Based - dynamic based on attributes',
            'Least privilege: Minimum access needed for job',
          ],
        },
        {
          name: 'Single Sign-On (SSO)',
          description: 'Centralized authentication',
          keyPoints: [
            'One authentication grants access to multiple systems',
            'Advantage: User convenience, reduced password fatigue',
            'Risk: Single point of failure for authentication',
            'Kerberos: Common SSO protocol using tickets',
            'SAML/OAuth: Web-based SSO standards',
          ],
        },
        {
          name: 'Privileged Access Management',
          description: 'Controlling administrative access',
          keyPoints: [
            'Admin accounts pose highest risk',
            'Privileged Access Management (PAM) tools',
            'Just-in-time access: Temporary elevated rights',
            'Session recording for accountability',
            'Separate admin accounts from daily use accounts',
          ],
        },
      ],
      criticalFormulas: [
        'FAR (Type II) = Impostors Accepted / Total Impostor Attempts',
        'FRR (Type I) = Legitimate Users Rejected / Total Legitimate Attempts',
        'CER = Point where FAR = FRR (lower is better)',
      ],
      examTips: [
        'Type I error = false rejection of legitimate user',
        'Type II error = false acceptance of impostor (more dangerous)',
        'RBAC is most common in enterprises',
        'SSO: convenience vs single point of failure trade-off',
      ],
    },
    // =====================================================
    // Domain 5C: Network Security
    // =====================================================
    {
      id: 'CISA5-C',
      title: 'Network and Infrastructure Security',
      weight: '~5%',
      overview: 'Protecting network infrastructure, communications, and detecting/preventing intrusions.',

      keyTopics: [
        {
          name: 'Firewalls',
          description: 'Network traffic filtering',
          keyPoints: [
            'Packet filtering: Examines header info (IP, port)',
            'Stateful inspection: Tracks connection state',
            'Application/proxy: Inspects content at application layer',
            'Next-gen (NGFW): Includes IPS, application awareness',
            'Default deny: Block all, then allow specifically',
          ],
        },
        {
          name: 'Network Segmentation',
          description: 'Isolating network zones',
          keyPoints: [
            'DMZ: Demilitarized zone for public-facing servers',
            'VLANs: Logical network separation',
            'Microsegmentation: Granular east-west control',
            'Air gap: Physical isolation for highest security',
            'Zero Trust: Verify all traffic, internal and external',
          ],
        },
        {
          name: 'IDS/IPS',
          description: 'Intrusion detection and prevention',
          keyPoints: [
            'IDS: Detection only - alerts on suspicious activity',
            'IPS: Prevention - blocks suspicious activity',
            'Signature-based: Known attack patterns',
            'Anomaly-based: Deviations from baseline',
            'HIDS: Host-based / NIDS: Network-based',
          ],
        },
        {
          name: 'VPN and Encryption',
          description: 'Securing communications',
          keyPoints: [
            'VPN creates encrypted tunnel over public network',
            'IPSec: Network layer encryption (tunnel/transport mode)',
            'SSL/TLS: Application layer encryption',
            'Site-to-site vs remote access VPN',
            'Always verify VPN split tunneling policies',
          ],
        },
      ],
      examTips: [
        'Firewalls should default to deny-all',
        'IDS detects, IPS prevents',
        'DMZ hosts public-facing services',
        'Signal-based detects known threats, anomaly detects unknown',
      ],
    },
    // =====================================================
    // Domain 5D: Cryptography
    // =====================================================
    {
      id: 'CISA5-D',
      title: 'Cryptography',
      weight: '~4%',
      overview: 'Encryption algorithms, key management, and cryptographic applications.',

      keyTopics: [
        {
          name: 'Symmetric Encryption',
          description: 'Single shared key encryption',
          keyPoints: [
            'Same key for encryption and decryption',
            'Fast performance, suitable for bulk data',
            'Key distribution is the main challenge',
            'Examples: AES (128/192/256 bit), 3DES, Blowfish',
            'AES-256 is current standard for sensitive data',
          ],
        },
        {
          name: 'Asymmetric Encryption',
          description: 'Public/private key pairs',
          keyPoints: [
            'Public key encrypts, private key decrypts',
            'Solves key distribution problem',
            'Slower than symmetric - often used for key exchange',
            'Examples: RSA, ECC, Diffie-Hellman',
            'RSA 2048-bit minimum recommended',
          ],
        },
        {
          name: 'Hashing',
          description: 'One-way cryptographic functions',
          keyPoints: [
            'Fixed-length output regardless of input size',
            'One-way: Cannot reverse to get original',
            'Used for integrity verification, passwords',
            'Examples: SHA-256, SHA-3 (current standards)',
            'MD5 and SHA-1 are deprecated (collision vulnerabilities)',
          ],
        },
        {
          name: 'Digital Signatures',
          description: 'Authentication and non-repudiation',
          keyPoints: [
            'Hash of message encrypted with sender\'s private key',
            'Provides authenticity, integrity, non-repudiation',
            'Recipient verifies with sender\'s public key',
            'PKI (Public Key Infrastructure) manages certificates',
            'Certificate Authority (CA) validates identity',
          ],
        },
        {
          name: 'Key Management',
          description: 'Secure handling of cryptographic keys',
          keyPoints: [
            'Key generation with proper randomness',
            'Secure key storage (HSM recommended)',
            'Key rotation at regular intervals',
            'Key escrow for recovery (with controls)',
            'Secure key destruction when expired',
          ],
        },
      ],
      criticalFormulas: [
        'Symmetric = faster, key distribution problem',
        'Asymmetric = slower, solves key distribution',
        'Digital Signature = Hash(message) encrypted with private key',
      ],
      examTips: [
        'AES is the current symmetric standard',
        'RSA 2048+ for asymmetric encryption',
        'SHA-256 or SHA-3 for hashing',
        'MD5 and SHA-1 are compromised',
        'Digital signatures provide non-repudiation',
      ],
    },
    // =====================================================
    // Domain 5E: Physical and Environmental Security
    // =====================================================
    {
      id: 'CISA5-E',
      title: 'Physical and Environmental Security',
      weight: '~3%',
      overview: 'Protecting physical assets and ensuring environmental controls for IT infrastructure.',

      keyTopics: [
        {
          name: 'Physical Access Controls',
          description: 'Controlling physical entry to facilities',
          keyPoints: [
            'Perimeter security: Fences, walls, gates',
            'Entry controls: Card readers, biometrics, guards',
            'Mantraps: Prevent tailgating/piggybacking',
            'Visitor management and escort policies',
            'CCTV for monitoring and deterrence',
          ],
        },
        {
          name: 'Environmental Controls',
          description: 'Protecting against environmental threats',
          keyPoints: [
            'HVAC: Temperature and humidity control',
            'Fire suppression: FM-200, Inergen (not water near equipment)',
            'Water detection: Sensors for leaks/flooding',
            'Smoke/fire detection: Multiple types for redundancy',
            'Emergency power off (EPO) switches',
          ],
        },
        {
          name: 'Power Protection',
          description: 'Ensuring continuous power supply',
          keyPoints: [
            'UPS: Uninterruptible Power Supply for short outages',
            'Generator: Extended power during outages',
            'Surge protectors against power spikes',
            'Dual power feeds from separate substations',
            'Regular testing of backup power systems',
          ],
        },
      ],
      examTips: [
        'Mantraps prevent tailgating',
        'FM-200/Inergen for computer rooms (not water)',
        'UPS bridges short gaps, generators for extended outages',
      ],
    },
  ],

  studyPlan: [
    {
      week: 1,
      focus: 'Security Governance and Frameworks',
      topics: ['Security policies', 'Classification', 'ISO 27001', 'NIST CSF'],
      hours: 12,
      activities: ['Read CISA Review Manual Domain 5A', 'Compare security frameworks', 'Policy hierarchy review'],
    },
    {
      week: 2,
      focus: 'Access Controls',
      topics: ['Authentication factors', 'Biometrics', 'Access models', 'SSO'],
      hours: 14,
      activities: ['Memorize FAR/FRR/CER', 'Practice access control questions', 'Compare DAC vs MAC vs RBAC'],
    },
    {
      week: 3,
      focus: 'Network Security',
      topics: ['Firewalls', 'IDS/IPS', 'VPN', 'Network segmentation'],
      hours: 12,
      activities: ['Firewall types comparison', 'IDS vs IPS scenarios', 'DMZ architecture'],
    },
    {
      week: 4,
      focus: 'Cryptography and Physical Security',
      topics: ['Symmetric vs asymmetric', 'Hashing', 'Digital signatures', 'Physical controls'],
      hours: 12,
      activities: ['Algorithm comparison chart', 'Key management process', 'Environmental controls review'],
    },
  ],

  examTips: [
    'Domain 5 is 27% of exam - HIGHEST WEIGHTED - study thoroughly',
    'Type I error = false rejection; Type II = false acceptance (worse)',
    'Lower CER = better biometric system',
    'RBAC is most common enterprise access model',
    'Symmetric = fast but key distribution problem',
    'Asymmetric = slow but solves key distribution',
    'AES-256 and RSA-2048+ are current standards',
    'SHA-256/SHA-3 for hashing; MD5/SHA-1 are deprecated',
    'Firewall default should be deny-all',
    'IDS detects and alerts; IPS prevents and blocks',
  ],

  commonMistakes: [
    'Confusing Type I (FRR) with Type II (FAR) errors',
    'Mixing up symmetric and asymmetric encryption characteristics',
    'Not knowing that MD5 and SHA-1 are deprecated',
    'Forgetting that IDS only detects, IPS prevents',
    'Overlooking that water-based fire suppression damages equipment',
  ],
};
