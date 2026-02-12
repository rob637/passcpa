/**
 * CISA Domain 5: Protection of Information Assets
 * Batch 3 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA5_QUESTIONS_BATCH3: Question[] = [
  {
    id: 'cisa5-033',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Defense in depth strategy implements:',
    options: [
      'Single strong control',
      'Multiple layers of security controls',
      'Only perimeter security',
      'Only endpoint security'
    ],
    correctAnswer: 1,
    explanation: 'Defense in depth uses multiple layers of security controls so that if one layer fails, other layers still protect assets.',
    topic: 'Security Architecture',
    subtopic: 'Defense in Depth'
  },
  {
    id: 'cisa5-034',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Zero trust security model assumes:',
    options: [
      'Internal network is trusted',
      'No user or system should be trusted by default',
      'Only external threats exist',
      'Perimeter security is sufficient'
    ],
    correctAnswer: 1,
    explanation: 'Zero trust assumes no implicit trust, requiring verification of every user and device regardless of location inside or outside the network.',
    topic: 'Security Architecture',
    subtopic: 'Zero Trust'
  },
  {
    id: 'cisa5-035',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Demilitarized zone (DMZ) provides:',
    options: [
      'Maximum access for all users',
      'Buffer zone between internal network and internet',
      'No security benefit',
      'Only email services'
    ],
    correctAnswer: 1,
    explanation: 'A DMZ creates a buffer zone where public-facing services are isolated from the internal network, limiting exposure if compromised.',
    topic: 'Network Security',
    subtopic: 'DMZ'
  },
  {
    id: 'cisa5-036',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Next-generation firewalls (NGFW) add capabilities including:',
    options: [
      'Only basic packet filtering',
      'Application awareness, intrusion prevention, and advanced threat detection',
      'Only VPN',
      'Only logging'
    ],
    correctAnswer: 1,
    explanation: 'NGFWs add application-level inspection, integrated IPS, advanced threat detection, and identity awareness beyond traditional packet filtering.',
    topic: 'Network Security',
    subtopic: 'NGFW'
  },
  {
    id: 'cisa5-037',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Wireless security best practices include:',
    options: [
      'Using WEP encryption',
      'Using WPA3/WPA2-Enterprise with strong authentication',
      'Broadcasting SSID always',
      'No encryption for convenience'
    ],
    correctAnswer: 1,
    explanation: 'Wireless security should use WPA3 or WPA2-Enterprise with strong authentication, disable unnecessary features, and segment wireless networks.',
    topic: 'Network Security',
    subtopic: 'Wireless Security'
  },
  {
    id: 'cisa5-038',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Network access control (NAC) ensures:',
    options: [
      'No devices can connect',
      'Only authorized, compliant devices connect to the network',
      'All devices have full access',
      'Only wireless devices are checked'
    ],
    correctAnswer: 1,
    explanation: 'NAC verifies that devices connecting to the network are authorized and meet compliance requirements before granting access.',
    topic: 'Network Security',
    subtopic: 'NAC'
  },
  {
    id: 'cisa5-039',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Endpoint detection and response (EDR) provides:',
    options: [
      'Only antivirus protection',
      'Continuous monitoring, threat detection, and response on endpoints',
      'Only patch management',
      'Only inventory'
    ],
    correctAnswer: 1,
    explanation: 'EDR continuously monitors endpoints, detects threats through behavioral analysis, and provides investigation and response capabilities.',
    topic: 'Endpoint Security',
    subtopic: 'EDR'
  },
  {
    id: 'cisa5-040',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Mobile device management (MDM) provides:',
    options: [
      'Only email access',
      'Control over mobile device configuration, security, and data',
      'Only app installation',
      'Only tracking'
    ],
    correctAnswer: 1,
    explanation: 'MDM enables organizations to manage, configure, secure, and monitor mobile devices, including enforcement of security policies and remote wipe.',
    topic: 'Endpoint Security',
    subtopic: 'MDM'
  },
  {
    id: 'cisa5-041',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Bring your own device (BYOD) introduces risks including:',
    options: [
      'No security concerns',
      'Data leakage, non-compliant devices, and support complexity',
      'Only hardware costs',
      'Only training needs'
    ],
    correctAnswer: 1,
    explanation: 'BYOD introduces risks of data leakage on personal devices, non-compliant devices, and complexity in managing mixed environments.',
    topic: 'Endpoint Security',
    subtopic: 'BYOD'
  },
  {
    id: 'cisa5-042',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Threat intelligence helps organizations by:',
    options: [
      'Eliminating all threats',
      'Providing context about threat actors and their methods',
      'Replacing security controls',
      'Automating all responses'
    ],
    correctAnswer: 1,
    explanation: 'Threat intelligence provides context about threat actors, their tactics, techniques, and procedures, enabling proactive and informed defense.',
    topic: 'Security Operations',
    subtopic: 'Threat Intelligence'
  },
  {
    id: 'cisa5-043',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Security orchestration, automation, and response (SOAR) provides:',
    options: [
      'Only ticketing',
      'Automated incident response workflows and integration',
      'Only reporting',
      'Only monitoring'
    ],
    correctAnswer: 1,
    explanation: 'SOAR platforms automate incident response workflows, integrate security tools, and orchestrate responses to improve efficiency.',
    topic: 'Security Operations',
    subtopic: 'SOAR'
  },
  {
    id: 'cisa5-044',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Phishing attacks primarily rely on:',
    options: [
      'Technical exploits',
      'Deceiving users into taking harmful actions',
      'Network vulnerabilities',
      'Physical access'
    ],
    correctAnswer: 1,
    explanation: 'Phishing exploits human psychology, deceiving users into clicking links, opening attachments, or providing credentials.',
    topic: 'Security Threats',
    subtopic: 'Phishing'
  },
  {
    id: 'cisa5-045',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Ransomware protection should include:',
    options: [
      'Only antivirus',
      'Backups, user training, patching, and network segmentation',
      'Only paying ransom',
      'Only insurance'
    ],
    correctAnswer: 1,
    explanation: 'Ransomware defense requires multiple layers: regular tested backups, user awareness, patching, network segmentation, and endpoint protection.',
    topic: 'Security Threats',
    subtopic: 'Ransomware'
  },
  {
    id: 'cisa5-046',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Business email compromise (BEC) attacks target:',
    options: [
      'Network infrastructure',
      'Employees through impersonation targeting financial transactions',
      'Physical security',
      'Backup systems'
    ],
    correctAnswer: 1,
    explanation: 'BEC attacks impersonate executives or vendors via email to trick employees into making fraudulent payments or revealing sensitive information.',
    topic: 'Security Threats',
    subtopic: 'BEC'
  },
  {
    id: 'cisa5-047',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Advanced persistent threats (APTs) are characterized by:',
    options: [
      'Quick, random attacks',
      'Long-term, targeted, and sophisticated intrusions',
      'Only automated scanning',
      'Only denial of service'
    ],
    correctAnswer: 1,
    explanation: 'APTs are sophisticated, long-term targeted attacks, typically by well-resourced threat actors pursuing specific objectives.',
    topic: 'Security Threats',
    subtopic: 'APT'
  },
  {
    id: 'cisa5-048',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Insider threat detection should include:',
    options: [
      'Only background checks',
      'Behavioral analytics, access monitoring, and data loss prevention',
      'Only termination procedures',
      'Only policy awareness'
    ],
    correctAnswer: 1,
    explanation: 'Insider threat detection requires behavioral analytics, access pattern monitoring, DLP, and anomaly detection to identify malicious or negligent insiders.',
    topic: 'Security Threats',
    subtopic: 'Insider Threats'
  },
  {
    id: 'cisa5-049',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Security testing should include:',
    options: [
      'Only annual assessments',
      'Regular vulnerability scans, penetration tests, and security audits',
      'Only compliance checks',
      'Only automated scans'
    ],
    correctAnswer: 1,
    explanation: 'Security testing should include regular vulnerability scanning, periodic penetration testing, security audits, and continuous monitoring.',
    topic: 'Security Assessment',
    subtopic: 'Security Testing'
  },
  {
    id: 'cisa5-050',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Red team exercises:',
    options: [
      'Test backup procedures',
      'Simulate real-world attacks to test defensive capabilities',
      'Only test policies',
      'Only test awareness'
    ],
    correctAnswer: 1,
    explanation: 'Red team exercises simulate sophisticated real-world attacks to test the organization\'s detection and response capabilities.',
    topic: 'Security Assessment',
    subtopic: 'Red Team'
  },
  {
    id: 'cisa5-051',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Incident response preparation should include:',
    options: [
      'Only technical tools',
      'Plans, trained team, tools, and tested procedures',
      'Only insurance',
      'Only legal counsel'
    ],
    correctAnswer: 1,
    explanation: 'IR preparation requires documented plans, a trained response team, appropriate tools, and regularly tested procedures.',
    topic: 'Incident Response',
    subtopic: 'IR Preparation'
  },
  {
    id: 'cisa5-052',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Chain of custody in incident response ensures:',
    options: [
      'Evidence is destroyed',
      'Evidence integrity is maintained for potential legal proceedings',
      'Incidents are closed quickly',
      'Staff are notified'
    ],
    correctAnswer: 1,
    explanation: 'Chain of custody documents evidence handling to maintain integrity, essential if evidence may be used in legal proceedings.',
    topic: 'Incident Response',
    subtopic: 'Evidence Handling'
  },
  {
    id: 'cisa5-053',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Forensic investigation in incident response should:',
    options: [
      'Modify original evidence',
      'Work on forensic copies while preserving originals',
      'Delete log files',
      'Immediately restore systems'
    ],
    correctAnswer: 1,
    explanation: 'Forensic investigation should work on forensic copies of evidence, preserving original evidence in its unaltered state.',
    topic: 'Incident Response',
    subtopic: 'Forensics'
  },
  {
    id: 'cisa5-054',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Privacy by design requires:',
    options: [
      'Adding privacy controls after development',
      'Building privacy into systems from the beginning',
      'Ignoring privacy in IT',
      'Only legal review'
    ],
    correctAnswer: 1,
    explanation: 'Privacy by design incorporates privacy considerations into system design from the beginning, not as an afterthought.',
    topic: 'Privacy',
    subtopic: 'Privacy by Design'
  },
  {
    id: 'cisa5-055',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'GDPR requires organizations to:',
    options: [
      'Only protect EU citizens',
      'Protect personal data of EU residents with specific rights and requirements',
      'Only report breaches in 30 days',
      'Only encrypt data'
    ],
    correctAnswer: 1,
    explanation: 'GDPR requires protecting personal data of EU residents with requirements for consent, data subject rights, breach notification, and data protection.',
    topic: 'Privacy',
    subtopic: 'GDPR'
  },
  {
    id: 'cisa5-056',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Data subject access requests require organizations to:',
    options: [
      'Ignore the request',
      'Provide individuals access to their personal data',
      'Delete all data immediately',
      'Charge unlimited fees'
    ],
    correctAnswer: 1,
    explanation: 'Data subject access requests require organizations to provide individuals with access to their personal data within specified timeframes.',
    topic: 'Privacy',
    subtopic: 'Data Subject Rights'
  },
  {
    id: 'cisa5-057',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Cross-border data transfers require:',
    options: [
      'No special consideration',
      'Appropriate safeguards for data protection',
      'Only encryption',
      'Only management approval'
    ],
    correctAnswer: 1,
    explanation: 'Cross-border transfers require appropriate safeguards such as standard contractual clauses, binding corporate rules, or adequacy decisions.',
    topic: 'Privacy',
    subtopic: 'Cross-Border Transfers'
  },
  {
    id: 'cisa5-058',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Data minimization principle requires:',
    options: [
      'Collecting all available data',
      'Collecting only data necessary for specified purposes',
      'Storing data indefinitely',
      'Sharing data freely'
    ],
    correctAnswer: 1,
    explanation: 'Data minimization requires collecting only the personal data necessary for the specified purpose, limiting exposure.',
    topic: 'Privacy',
    subtopic: 'Data Minimization'
  },
  {
    id: 'cisa5-059',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Security control effectiveness should be:',
    options: [
      'Assumed',
      'Regularly tested and measured',
      'Reported once',
      'Delegated to vendors'
    ],
    correctAnswer: 1,
    explanation: 'Control effectiveness should be regularly tested and measured to ensure controls actually work as intended.',
    topic: 'Security Management',
    subtopic: 'Control Testing'
  },
  {
    id: 'cisa5-060',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Cloud security shared responsibility model means:',
    options: [
      'Cloud provider handles all security',
      'Security responsibilities are divided between provider and customer',
      'Customer handles all security',
      'No one is responsible'
    ],
    correctAnswer: 1,
    explanation: 'The shared responsibility model divides security responsibilities between the cloud provider and customer based on the service model (IaaS, PaaS, SaaS).',
    topic: 'Cloud Security',
    subtopic: 'Shared Responsibility'
  },
  {
    id: 'cisa5-061',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Cloud access security brokers (CASBs) provide:',
    options: [
      'Only cloud storage',
      'Visibility and control over cloud service usage',
      'Only authentication',
      'Only encryption'
    ],
    correctAnswer: 1,
    explanation: 'CASBs provide visibility into cloud service usage, enable policy enforcement, and offer security controls between users and cloud services.',
    topic: 'Cloud Security',
    subtopic: 'CASB'
  },
  {
    id: 'cisa5-062',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Tokenization protects sensitive data by:',
    options: [
      'Encrypting data',
      'Replacing sensitive data with non-sensitive placeholders',
      'Deleting data',
      'Compressing data'
    ],
    correctAnswer: 1,
    explanation: 'Tokenization replaces sensitive data with non-sensitive tokens that have no intrinsic value, with the original data stored securely in a token vault.',
    topic: 'Data Security',
    subtopic: 'Tokenization'
  },
];

export default CISA5_QUESTIONS_BATCH3;
