/**
 * CISA Domain 5: Protection of Information Assets
 * Batch 8 - 30 Additional MCQs
 * Advanced exam-style questions
 */

import { Question } from '../../../types';

export const CISA5_QUESTIONS_BATCH8: Question[] = [
  {
    id: 'CISA5-173',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'The MOST effective control against social engineering attacks is:',
    options: [
      'Strong firewall rules',
      'Security awareness training for all employees',
      'Intrusion detection systems',
      'Complex password requirements'
    ],
    correctAnswer: 1,
    explanation: 'Social engineering targets people, so awareness training is the most effective control.',
    topic: 'Information Security',
    subtopic: 'Social Engineering'
  },
  {
    id: 'CISA5-174',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Multi-factor authentication requires:',
    options: [
      'Two passwords',
      'Something you know and something you have or are',
      'Fingerprint and retina scan',
      'Username and password'
    ],
    correctAnswer: 1,
    explanation: 'MFA requires factors from different categories: knowledge, possession, or biometric.',
    topic: 'Access Control',
    subtopic: 'Multi-Factor Authentication'
  },
  {
    id: 'CISA5-175',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'When reviewing encryption key management, the IS auditor should be MOST concerned if:',
    options: [
      'Keys are stored in a hardware security module',
      'Encryption keys are stored alongside encrypted data',
      'Key rotation is performed quarterly',
      'Dual control is used for key generation'
    ],
    correctAnswer: 1,
    explanation: 'Storing keys with encrypted data defeats the purpose of encryption if both are compromised together.',
    topic: 'Cryptography',
    subtopic: 'Key Management'
  },
  {
    id: 'CISA5-176',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'The purpose of a security information and event management (SIEM) system is to:',
    options: [
      'Prevent all security incidents',
      'Collect, correlate, and analyze security events for detection and response',
      'Replace firewalls and IDS',
      'Encrypt network traffic'
    ],
    correctAnswer: 1,
    explanation: 'SIEM systems collect and correlate security events to enable detection and response to threats.',
    topic: 'Security Operations',
    subtopic: 'SIEM'
  },
  {
    id: 'CISA5-177',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Zero trust architecture is based on the principle of:',
    options: [
      'Trusting all internal network traffic',
      'Never trust, always verify regardless of location',
      'Trusting users after initial authentication',
      'Blocking all external connections'
    ],
    correctAnswer: 1,
    explanation: 'Zero trust assumes no implicit trust and requires verification of all access regardless of network location.',
    topic: 'Network Security',
    subtopic: 'Zero Trust'
  },
  {
    id: 'CISA5-178',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Data loss prevention (DLP) controls should:',
    options: [
      'Focus only on external threats',
      'Detect and prevent unauthorized data exfiltration',
      'Replace encryption',
      'Monitor network traffic only'
    ],
    correctAnswer: 1,
    explanation: 'DLP detects and prevents unauthorized transmission or storage of sensitive data.',
    topic: 'Data Protection',
    subtopic: 'Data Loss Prevention'
  },
  {
    id: 'CISA5-179',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'The PRIMARY purpose of network segmentation is to:',
    options: [
      'Improve network speed',
      'Limit the scope and impact of security breaches',
      'Reduce hardware costs',
      'Simplify network management'
    ],
    correctAnswer: 1,
    explanation: 'Segmentation limits lateral movement and contains the impact of security breaches.',
    topic: 'Network Security',
    subtopic: 'Network Segmentation'
  },
  {
    id: 'CISA5-180',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Mobile device management (MDM) should include:',
    options: [
      'Only device tracking',
      'Policy enforcement, encryption, and remote wipe capabilities',
      'App store access only',
      'Personal device exclusion'
    ],
    correctAnswer: 1,
    explanation: 'MDM should enforce security policies, encryption, and enable remote wipe of lost/stolen devices.',
    topic: 'Endpoint Security',
    subtopic: 'Mobile Device Management'
  },
  {
    id: 'CISA5-181',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'When reviewing cloud security, the IS auditor should verify that:',
    options: [
      'The cloud provider handles all security',
      'Responsibilities under the shared responsibility model are understood and addressed',
      'Cloud is always more secure than on-premises',
      'No security controls are needed for SaaS'
    ],
    correctAnswer: 1,
    explanation: 'The shared responsibility model requires the organization to address security for its areas of responsibility.',
    topic: 'Cloud Security',
    subtopic: 'Shared Responsibility'
  },
  {
    id: 'CISA5-182',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Vulnerability scanning should be performed:',
    options: [
      'Only after a security incident',
      'Regularly and after significant changes',
      'Once during initial deployment',
      'Only by external parties'
    ],
    correctAnswer: 1,
    explanation: 'Vulnerability scanning should be regular and triggered by significant system changes.',
    topic: 'Vulnerability Management',
    subtopic: 'Scanning Frequency'
  },
  {
    id: 'CISA5-183',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Penetration testing differs from vulnerability scanning in that penetration testing:',
    options: [
      'Is fully automated',
      'Attempts to exploit vulnerabilities to demonstrate real-world impact',
      'Only identifies vulnerabilities',
      'Requires no authorization'
    ],
    correctAnswer: 1,
    explanation: 'Penetration testing goes beyond identification to attempt exploitation, demonstrating actual risk.',
    topic: 'Security Testing',
    subtopic: 'Penetration Testing'
  },
  {
    id: 'CISA5-184',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'The purpose of a web application firewall (WAF) is to:',
    options: [
      'Replace network firewalls',
      'Protect web applications from application-layer attacks',
      'Encrypt web traffic only',
      'Block all web access'
    ],
    correctAnswer: 1,
    explanation: 'WAFs protect web applications from application-layer attacks like SQL injection and XSS.',
    topic: 'Application Security',
    subtopic: 'Web Application Firewall'
  },
  {
    id: 'CISA5-185',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'When evaluating privileged access management, the IS auditor should verify:',
    options: [
      'All users have admin access for convenience',
      'Just-in-time access with session recording and approval workflows',
      'Permanent privileged access for IT staff',
      'No monitoring of admin activities'
    ],
    correctAnswer: 1,
    explanation: 'PAM should provide just-in-time access with approval workflows and session recording.',
    topic: 'Access Control',
    subtopic: 'Privileged Access Management'
  },
  {
    id: 'CISA5-186',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Data classification should be based on:',
    options: [
      'Storage location',
      'Sensitivity and the impact of unauthorized disclosure',
      'File size',
      'Department ownership'
    ],
    correctAnswer: 1,
    explanation: 'Classification should reflect data sensitivity and potential impact of unauthorized disclosure.',
    topic: 'Data Protection',
    subtopic: 'Data Classification'
  },
  {
    id: 'CISA5-187',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'The MOST significant risk with IoT devices in an enterprise environment is:',
    options: [
      'High power consumption',
      'Inadequate security controls and difficulty patching',
      'Limited functionality',
      'Compatibility issues'
    ],
    correctAnswer: 1,
    explanation: 'IoT devices often have weak security and are difficult to patch, creating significant risk.',
    topic: 'Endpoint Security',
    subtopic: 'IoT Security'
  },
  {
    id: 'CISA5-188',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'End-to-end encryption ensures:',
    options: [
      'Data is only encrypted at rest',
      'Data is encrypted between sender and recipient with decryption only at endpoints',
      'Network boundaries are protected',
      'Encryption keys are shared'
    ],
    correctAnswer: 1,
    explanation: 'End-to-end encryption protects data so only endpoints can decrypt, not intermediaries.',
    topic: 'Cryptography',
    subtopic: 'End-to-End Encryption'
  },
  {
    id: 'CISA5-189',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'An IS auditor discovers that database activity monitoring is not implemented. This is MOST concerning for:',
    options: [
      'Performance optimization',
      'Detection of unauthorized data access or exfiltration',
      'Capacity planning',
      'Query optimization'
    ],
    correctAnswer: 1,
    explanation: 'Database activity monitoring is critical for detecting unauthorized access and data exfiltration.',
    topic: 'Data Protection',
    subtopic: 'Database Monitoring'
  },
  {
    id: 'CISA5-190',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Security patches should be:',
    options: [
      'Applied immediately without testing',
      'Risk assessed, tested, and applied within defined timeframes',
      'Applied only annually',
      'Handled by vendors only'
    ],
    correctAnswer: 1,
    explanation: 'Patches should be assessed for risk, tested, and applied within timeframes based on severity.',
    topic: 'Vulnerability Management',
    subtopic: 'Patch Management'
  },
  {
    id: 'CISA5-191',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'When evaluating email security, the IS auditor should verify implementation of:',
    options: [
      'Largest mailbox sizes',
      'SPF, DKIM, and DMARC to prevent email spoofing',
      'Unlimited attachment sizes',
      'No email filtering to prevent delays'
    ],
    correctAnswer: 1,
    explanation: 'SPF, DKIM, and DMARC are essential email authentication controls to prevent spoofing.',
    topic: 'Email Security',
    subtopic: 'Email Authentication'
  },
  {
    id: 'CISA5-193',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'A security operations center (SOC) should have:',
    options: [
      '24/7 staffing only during business hours',
      'Continuous monitoring, detection, and response capabilities',
      'Focus only on external threats',
      'No escalation procedures'
    ],
    correctAnswer: 1,
    explanation: 'An effective SOC provides continuous monitoring, detection, and response to security events.',
    topic: 'Security Operations',
    subtopic: 'Security Operations Center'
  },
  {
    id: 'CISA5-194',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Identity and access management (IAM) should ensure:',
    options: [
      'All users have the same access',
      'Users have appropriate access based on role and least privilege',
      'Access is never revoked',
      'Authentication is optional for low-risk systems'
    ],
    correctAnswer: 1,
    explanation: 'IAM ensures appropriate access based on role, applying least privilege principles.',
    topic: 'Access Control',
    subtopic: 'Identity Management'
  },
  {
    id: 'CISA5-195',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'When evaluating third-party risk management for security, the IS auditor should verify:',
    options: [
      'Vendors are selected based on lowest cost',
      'Security assessments and ongoing monitoring of critical vendors',
      'All vendor access is unrestricted',
      'Vendor security is the vendor\'s responsibility only'
    ],
    correctAnswer: 1,
    explanation: 'Third-party risk management requires security assessment and ongoing monitoring of vendors.',
    topic: 'Third-Party Security',
    subtopic: 'Vendor Security'
  },
  {
    id: 'CISA5-196',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Secure data destruction should ensure:',
    options: [
      'Data is deleted from primary storage',
      'Data cannot be recovered through any means',
      'Only digital data is addressed',
      'Destruction is performed by data owners'
    ],
    correctAnswer: 1,
    explanation: 'Secure destruction must ensure data cannot be recovered, using appropriate techniques for the media type.',
    topic: 'Data Protection',
    subtopic: 'Data Destruction'
  },
  {
    id: 'CISA5-197',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Threat intelligence should be:',
    options: [
      'Collected but not acted upon',
      'Integrated into security operations to inform detection and response',
      'Focused only on historical threats',
      'Purchased from one source only'
    ],
    correctAnswer: 1,
    explanation: 'Threat intelligence should inform and improve detection and response capabilities.',
    topic: 'Security Operations',
    subtopic: 'Threat Intelligence'
  },
  {
    id: 'CISA5-198',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Biometric authentication is based on:',
    options: [
      'Something you know',
      'Something you are (physical characteristics)',
      'Something you have',
      'Somewhere you are'
    ],
    correctAnswer: 1,
    explanation: 'Biometrics authenticate based on physical or behavioral characteristics (something you are).',
    topic: 'Access Control',
    subtopic: 'Biometric Authentication'
  },
  {
    id: 'CISA5-199',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'When reviewing data privacy controls, the IS auditor should verify:',
    options: [
      'All personal data is public',
      'Privacy requirements are identified and appropriate controls are implemented',
      'Privacy is IT\'s responsibility only',
      'Consent is never required'
    ],
    correctAnswer: 1,
    explanation: 'Privacy controls require identifying applicable requirements and implementing appropriate controls.',
    topic: 'Privacy',
    subtopic: 'Privacy Controls'
  },
  {
    id: 'CISA5-200',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'An intrusion prevention system (IPS) differs from an IDS in that IPS:',
    options: [
      'Only logs attacks',
      'Can automatically block detected attacks',
      'Is installed on endpoints only',
      'Does not require signatures'
    ],
    correctAnswer: 1,
    explanation: 'IPS can automatically block attacks, while IDS only detects and alerts.',
    topic: 'Network Security',
    subtopic: 'Intrusion Prevention'
  },
  {
    id: 'CISA5-202',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Physical access controls should include:',
    options: [
      'Open access during business hours',
      'Visitor logging, badge access, and security monitoring',
      'Keys only for executives',
      'No cameras for privacy'
    ],
    correctAnswer: 1,
    explanation: 'Physical access controls include visitor management, badge access, and security monitoring.',
    topic: 'Physical Security',
    subtopic: 'Physical Access Controls'
  }
];
