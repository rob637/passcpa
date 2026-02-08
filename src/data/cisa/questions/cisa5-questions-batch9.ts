/**
 * CISA Domain 5: Protection of Information Assets
 * Additional Questions - Batch 9
 * Focus on Security Controls and Compliance
 */

import { Question } from '../../../types';

export const CISA5_QUESTIONS_BATCH9: Question[] = [
  {
    id: 'CISA5-210',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'The MOST effective control against insider threats is:',
    options: [
      'Strong perimeter firewalls',
      'Combination of monitoring, access controls, and behavioral analytics',
      'Antivirus software',
      'Annual security training only'
    ],
    correctAnswer: 1,
    explanation: 'Insider threats require layered controls including access restrictions, activity monitoring, and behavioral analytics to detect anomalies.',
    topic: 'Information Security',
    subtopic: 'Insider Threats'
  },
  {
    id: 'CISA5-211',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Defense in depth strategy means:',
    options: [
      'Having one very strong security control',
      'Implementing multiple layers of security controls',
      'Focusing only on network perimeter',
      'Relying on user awareness alone'
    ],
    correctAnswer: 1,
    explanation: 'Defense in depth uses multiple overlapping security layers so if one control fails, others still provide protection.',
    topic: 'Information Security',
    subtopic: 'Security Architecture'
  },
  {
    id: 'CISA5-212',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Network segmentation PRIMARILY reduces risk by:',
    options: [
      'Increasing network speed',
      'Limiting lateral movement and containing breaches',
      'Reducing hardware costs',
      'Simplifying management'
    ],
    correctAnswer: 1,
    explanation: 'Segmentation limits attacker movement between network zones and contains breaches to smaller areas.',
    topic: 'Network Security',
    subtopic: 'Segmentation'
  },
  {
    id: 'CISA5-213',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Role-based access control (RBAC) assigns permissions based on:',
    options: [
      'Individual user preferences',
      'Job function/role within the organization',
      'Seniority level only',
      'Department budget'
    ],
    correctAnswer: 1,
    explanation: 'RBAC assigns access based on roles aligned to job functions, simplifying administration and enforcing least privilege.',
    topic: 'Access Control',
    subtopic: 'RBAC'
  },
  {
    id: 'CISA5-214',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'When reviewing encryption controls, the auditor should be MOST concerned about:',
    options: [
      'Algorithm choice documentation',
      'Key management practices and procedures',
      'Encryption policy publication',
      'Vendor certifications display'
    ],
    correctAnswer: 1,
    explanation: 'Key management is often the weakest link. Poor key practices can undermine even strong algorithms.',
    topic: 'Cryptography',
    subtopic: 'Key Management'
  },
  {
    id: 'CISA5-215',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Digital certificates are used to:',
    options: [
      'Encrypt all network traffic automatically',
      'Bind public keys to identities for verification',
      'Replace passwords completely',
      'Store private keys securely'
    ],
    correctAnswer: 1,
    explanation: 'Digital certificates link public keys to verified identities, enabling authentication and secure communications.',
    topic: 'Cryptography',
    subtopic: 'PKI'
  },
  {
    id: 'CISA5-216',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Perfect forward secrecy in TLS ensures:',
    options: [
      'Connections are never broken',
      'Compromise of long-term keys cannot decrypt past sessions',
      'All certificates are validated',
      'Connections are faster'
    ],
    correctAnswer: 1,
    explanation: 'Perfect forward secrecy uses ephemeral session keys, so compromising the server\'s private key cannot decrypt recorded past traffic.',
    topic: 'Cryptography',
    subtopic: 'TLS Security'
  },
  {
    id: 'CISA5-217',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Security awareness training should be:',
    options: [
      'Optional for senior executives',
      'Mandatory, ongoing, and tailored to roles',
      'One-time during onboarding only',
      'Technical training only'
    ],
    correctAnswer: 1,
    explanation: 'Effective awareness programs are mandatory for all, delivered regularly, and customized to different roles and risk exposures.',
    topic: 'Information Security',
    subtopic: 'Security Awareness'
  },
  {
    id: 'CISA5-218',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Phishing simulation exercises are valuable because they:',
    options: [
      'Punish employees who click',
      'Identify training needs and measure awareness improvement',
      'Replace all other training',
      'Guarantee phishing prevention'
    ],
    correctAnswer: 1,
    explanation: 'Simulations provide metrics on susceptibility and identify individuals/groups needing additional training.',
    topic: 'Information Security',
    subtopic: 'Phishing Defense'
  },
  {
    id: 'CISA5-219',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Web Application Firewalls (WAF) protect against:',
    options: [
      'All network attacks',
      'Application-layer attacks like SQL injection and XSS',
      'Physical security threats',
      'DDoS only'
    ],
    correctAnswer: 1,
    explanation: 'WAFs inspect HTTP/HTTPS traffic and protect against application-layer attacks including injection, XSS, and CSRF.',
    topic: 'Network Security',
    subtopic: 'WAF'
  },
  {
    id: 'CISA5-220',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Endpoint Detection and Response (EDR) differs from traditional antivirus by:',
    options: [
      'Using signature-only detection',
      'Providing continuous monitoring, behavioral analysis, and response capabilities',
      'Being less expensive',
      'Requiring no updates'
    ],
    correctAnswer: 1,
    explanation: 'EDR provides continuous endpoint visibility, behavioral detection beyond signatures, and automated response capabilities.',
    topic: 'Information Security',
    subtopic: 'EDR'
  },
  {
    id: 'CISA5-221',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Data classification should be performed by:',
    options: [
      'IT department only',
      'Data owners based on sensitivity and regulatory requirements',
      'External auditors',
      'Security vendor'
    ],
    correctAnswer: 1,
    explanation: 'Data owners understand the business value and sensitivity of their data and are accountable for classification decisions.',
    topic: 'Data Protection',
    subtopic: 'Data Classification'
  },
  {
    id: 'CISA5-222',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Security event correlation in SIEM helps by:',
    options: [
      'Reducing log storage',
      'Identifying attack patterns across multiple data sources',
      'Replacing manual investigation',
      'Eliminating false positives'
    ],
    correctAnswer: 1,
    explanation: 'Correlation connects related events from different sources to identify attack patterns that individual logs wouldn\'t reveal.',
    topic: 'Security Operations',
    subtopic: 'SIEM'
  },
  {
    id: 'CISA5-223',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Privileged Access Management (PAM) controls:',
    options: [
      'Standard user accounts',
      'Administrative and elevated access accounts',
      'Guest access only',
      'Public website access'
    ],
    correctAnswer: 1,
    explanation: 'PAM specifically manages high-risk privileged accounts with additional controls like session recording and password vaulting.',
    topic: 'Access Control',
    subtopic: 'PAM'
  },
  {
    id: 'CISA5-224',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Vulnerability assessment differs from penetration testing in that:',
    options: [
      'They are identical',
      'Vulnerability assessment identifies weaknesses; penetration testing actively exploits them',
      'Penetration testing is automated only',
      'Vulnerability assessment is more thorough'
    ],
    correctAnswer: 1,
    explanation: 'Vulnerability assessment scans for weaknesses; penetration testing actively attempts exploitation to prove real-world risk.',
    topic: 'Information Security',
    subtopic: 'Security Testing'
  },
  {
    id: 'CISA5-225',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Data Loss Prevention (DLP) monitors:',
    options: [
      'Network performance only',
      'Data movement to prevent unauthorized exfiltration',
      'Hardware failures',
      'User login times'
    ],
    correctAnswer: 1,
    explanation: 'DLP inspects data in motion, at rest, and in use to detect and prevent unauthorized data transfers.',
    topic: 'Data Protection',
    subtopic: 'DLP'
  },
  {
    id: 'CISA5-226',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Security metrics should be:',
    options: [
      'As technical as possible',
      'Aligned to risk, actionable, and meaningful to stakeholders',
      'Static and unchanging',
      'Focused on quantity over quality'
    ],
    correctAnswer: 1,
    explanation: 'Effective metrics align to risk, drive actions, and are understandable by their intended audience.',
    topic: 'Information Security',
    subtopic: 'Security Metrics'
  },
  {
    id: 'CISA5-227',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Biometric authentication provides:',
    options: [
      'Something you know',
      'Something you are',
      'Something you have',
      'Somewhere you are'
    ],
    correctAnswer: 1,
    explanation: 'Biometrics (fingerprint, face, iris) represent "something you are" - inherent physical characteristics.',
    topic: 'Access Control',
    subtopic: 'Biometrics'
  },
  {
    id: 'CISA5-228',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Supply chain security for software should include:',
    options: [
      'Only using well-known vendors',
      'SBOM, code signing, and dependency vulnerability management',
      'Avoiding all third-party code',
      'Monthly vendor reviews only'
    ],
    correctAnswer: 1,
    explanation: 'Modern supply chain security requires software bill of materials, code signing verification, and active dependency management.',
    topic: 'Information Security',
    subtopic: 'Supply Chain Security'
  },
  {
    id: 'CISA5-229',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Privacy by Design means:',
    options: [
      'Adding privacy settings after development',
      'Embedding privacy throughout the system development lifecycle',
      'Creating privacy policies only',
      'External privacy audits'
    ],
    correctAnswer: 1,
    explanation: 'Privacy by Design embeds privacy considerations into system design from inception rather than adding privacy controls afterward.',
    topic: 'Privacy',
    subtopic: 'Privacy by Design'
  },
  {
    id: 'CISA5-230',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'GDPR data breach notification requires:',
    options: [
      'Annual notification only',
      'Notification to supervisory authority within 72 hours of awareness',
      'Public announcement within 30 days',
      'No notification if data was encrypted'
    ],
    correctAnswer: 1,
    explanation: 'GDPR requires breach notification to the supervisory authority within 72 hours unless the breach is unlikely to result in risk.',
    topic: 'Privacy',
    subtopic: 'GDPR'
  },
  {
    id: 'CISA5-231',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Secure coding practices include:',
    options: [
      'Minimal documentation',
      'Input validation, output encoding, and parameterized queries',
      'Fastest possible development',
      'Avoiding all external libraries'
    ],
    correctAnswer: 1,
    explanation: 'Secure coding includes input validation, proper output encoding, parameterized queries, and error handling.',
    topic: 'Information Security',
    subtopic: 'Secure Coding'
  },
  {
    id: 'CISA5-232',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Security architecture review should occur:',
    options: [
      'Only after implementation',
      'During design phase before significant development investment',
      'During annual audits only',
      'Never for agile projects'
    ],
    correctAnswer: 1,
    explanation: 'Architecture review during design is most cost-effective - fixing security issues later is exponentially more expensive.',
    topic: 'Information Security',
    subtopic: 'Security Architecture'
  },
  {
    id: 'CISA5-233',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Network access control (NAC) ensures:',
    options: [
      'Faster network speeds',
      'Only authorized and compliant devices connect to the network',
      'All devices are identical',
      'Unlimited network access'
    ],
    correctAnswer: 1,
    explanation: 'NAC verifies device authorization and security compliance before allowing network access.',
    topic: 'Network Security',
    subtopic: 'NAC'
  },
  {
    id: 'CISA5-234',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Threat hunting is:',
    options: [
      'Automated malware scanning',
      'Proactive search for threats that evade existing controls',
      'Annual penetration testing',
      'Reactive incident response'
    ],
    correctAnswer: 1,
    explanation: 'Threat hunting proactively searches for indicators of compromise that automated tools may miss.',
    topic: 'Security Operations',
    subtopic: 'Threat Hunting'
  },
  {
    id: 'CISA5-235',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Security exception management should include:',
    options: [
      'Automatic approval',
      'Risk assessment, approval authority, expiration, and compensating controls',
      'Permanent exceptions by default',
      'No documentation'
    ],
    correctAnswer: 1,
    explanation: 'Exceptions require documented risk assessment, appropriate approval, defined expiration, and compensating controls.',
    topic: 'Information Security',
    subtopic: 'Exception Management'
  },
  {
    id: 'CISA5-236',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Third-party security assessments should be based on:',
    options: [
      'Vendor reputation only',
      'Risk level of the relationship and data involved',
      'Contract value alone',
      'Geographic location'
    ],
    correctAnswer: 1,
    explanation: 'Assessment rigor should be proportionate to the risk - higher risk third parties require more thorough assessment.',
    topic: 'Information Security',
    subtopic: 'Third-Party Risk'
  },
  {
    id: 'CISA5-237',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Secure configuration management includes:',
    options: [
      'Default vendor configurations',
      'Hardening baselines, change control, and compliance monitoring',
      'No documentation needed',
      'Ad hoc changes'
    ],
    correctAnswer: 1,
    explanation: 'Secure configuration includes defined hardening baselines, controlled changes, and ongoing compliance verification.',
    topic: 'Information Security',
    subtopic: 'Configuration Management'
  },
  {
    id: 'CISA5-238',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Red team exercises simulate:',
    options: [
      'IT help desk operations',
      'Real-world adversary attacks to test defenses',
      'Security awareness training',
      'Backup recovery procedures'
    ],
    correctAnswer: 1,
    explanation: 'Red teams simulate sophisticated adversary tactics to test detection and response capabilities realistically.',
    topic: 'Information Security',
    subtopic: 'Red Team'
  },
  {
    id: 'CISA5-239',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Tokenization differs from encryption in that:',
    options: [
      'They are identical',
      'Tokenization replaces data with non-reversible substitutes maintained in a secure vault',
      'Encryption is not secure',
      'Tokenization works only for text'
    ],
    correctAnswer: 1,
    explanation: 'Tokenization substitutes sensitive data with tokens that have no mathematical relationship to the original data.',
    topic: 'Data Protection',
    subtopic: 'Tokenization'
  },
  {
    id: 'CISA5-240',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Security Operations Center (SOC) maturity can be measured by:',
    options: [
      'Building size only',
      'Detection capabilities, mean time to respond, and threat coverage',
      'Number of monitors displayed',
      'Staff headcount alone'
    ],
    correctAnswer: 1,
    explanation: 'SOC maturity is measured by operational metrics: detection rates, response times, and coverage of threat landscape.',
    topic: 'Security Operations',
    subtopic: 'SOC Maturity'
  }
];
