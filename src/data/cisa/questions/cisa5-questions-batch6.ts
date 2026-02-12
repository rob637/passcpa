/**
 * CISA Domain 5: Protection of Information Assets
 * Batch 6 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA5_QUESTIONS_BATCH6: Question[] = [
  {
    id: 'cisa5-123',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Identity and Access Management (IAM) lifecycle includes:',
    options: [
      'Only account creation',
      'Provisioning, review, modification, and de-provisioning',
      'Only password management',
      'Only authentication'
    ],
    correctAnswer: 1,
    explanation: 'IAM lifecycle includes provisioning, periodic review, modification based on changes, and de-provisioning.',
    topic: 'Access Management',
    subtopic: 'IAM Lifecycle'
  },
  {
    id: 'cisa5-124',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Access certification reviews should:',
    options: [
      'Be IT-owned',
      'Be performed by business managers who understand access needs',
      'Only review privileged access',
      'Be annual only'
    ],
    correctAnswer: 1,
    explanation: 'Certification reviews should be performed by managers who understand business needs for access.',
    topic: 'Access Management',
    subtopic: 'Certification'
  },
  {
    id: 'cisa5-125',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Birthright access refers to:',
    options: [
      'Inherited permissions',
      'Base access automatically granted based on role or position',
      'Temporary access',
      'Emergency access'
    ],
    correctAnswer: 1,
    explanation: 'Birthright access is base access automatically granted when someone joins based on their role.',
    topic: 'Access Management',
    subtopic: 'Birthright Access'
  },
  {
    id: 'cisa5-126',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Access request approval workflow should require:',
    options: [
      'IT approval only',
      'Data owner and manager approval with documented justification',
      'Automatic approval',
      'Self-approval'
    ],
    correctAnswer: 1,
    explanation: 'Access requests should require appropriate approvals (manager, data owner) with documented justification.',
    topic: 'Access Management',
    subtopic: 'Approval Workflow'
  },
  {
    id: 'cisa5-127',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Emergency access procedures should include:',
    options: [
      'Unlimited access',
      'Time-limited access with monitoring and post-review',
      'Permanent elevation',
      'No documentation'
    ],
    correctAnswer: 1,
    explanation: 'Emergency access should be time-limited, logged, monitored, and reviewed after the emergency.',
    topic: 'Access Management',
    subtopic: 'Emergency Access'
  },
  {
    id: 'cisa5-128',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Service accounts should have:',
    options: [
      'Interactive login enabled',
      'Minimum required privileges and documented ownership',
      'Shared passwords',
      'No expiration'
    ],
    correctAnswer: 1,
    explanation: 'Service accounts should have minimum privileges, documented ownership, and controlled credentials.',
    topic: 'Access Management',
    subtopic: 'Service Accounts'
  },
  {
    id: 'cisa5-129',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Privileged access management (PAM) solutions provide:',
    options: [
      'Only password storage',
      'Session recording, credential vaulting, and access control',
      'Only authentication',
      'Only reporting'
    ],
    correctAnswer: 1,
    explanation: 'PAM solutions provide credential vaulting, session recording, access control, and monitoring.',
    topic: 'Access Management',
    subtopic: 'PAM'
  },
  {
    id: 'cisa5-130',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Biometric authentication advantages include:',
    options: [
      'Cannot be bypassed',
      'Difficulty of sharing or forgetting credentials',
      'Complete security',
      'Zero false positives'
    ],
    correctAnswer: 1,
    explanation: 'Biometrics are difficult to share or forget, providing something you are authentication.',
    topic: 'Authentication',
    subtopic: 'Biometrics'
  },
  {
    id: 'cisa5-131',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'False acceptance rate (FAR) in biometrics:',
    options: [
      'Should be high',
      'Measures incorrectly accepting unauthorized users',
      'Measures rejecting authorized users',
      'Is not important'
    ],
    correctAnswer: 1,
    explanation: 'FAR measures the rate of incorrectly accepting unauthorized users and should be minimized.',
    topic: 'Authentication',
    subtopic: 'FAR'
  },
  {
    id: 'cisa5-132',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'FIDO2/WebAuthn authentication:',
    options: [
      'Uses passwords',
      'Provides passwordless authentication using public key cryptography',
      'Requires shared secrets',
      'Only works on mobile'
    ],
    correctAnswer: 1,
    explanation: 'FIDO2/WebAuthn enables passwordless authentication using public key cryptography and hardware tokens.',
    topic: 'Authentication',
    subtopic: 'FIDO2'
  },
  {
    id: 'cisa5-133',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Context-aware authentication considers:',
    options: [
      'Only password',
      'Location, device, time, and behavior patterns',
      'Only username',
      'Only IP address'
    ],
    correctAnswer: 1,
    explanation: 'Context-aware authentication considers multiple factors like location, device, time, and behavior.',
    topic: 'Authentication',
    subtopic: 'Contextual'
  },
  {
    id: 'cisa5-134',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Step-up authentication requires:',
    options: [
      'Lower authentication for all access',
      'Additional authentication for higher-risk transactions',
      'Multiple passwords',
      'Always the same authentication'
    ],
    correctAnswer: 1,
    explanation: 'Step-up authentication requires additional verification for higher-risk transactions or sensitive access.',
    topic: 'Authentication',
    subtopic: 'Step-Up'
  },
  {
    id: 'cisa5-135',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Encryption key hierarchy typically includes:',
    options: [
      'Single key for all data',
      'Master keys, key encryption keys, and data encryption keys',
      'Only data keys',
      'Only master keys'
    ],
    correctAnswer: 1,
    explanation: 'Key hierarchies include master keys protecting key encryption keys which protect data encryption keys.',
    topic: 'Cryptography',
    subtopic: 'Key Hierarchy'
  },
  {
    id: 'cisa5-136',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Encryption at rest protects:',
    options: [
      'Network traffic',
      'Stored data from unauthorized physical or logical access',
      'Only databases',
      'Only backups'
    ],
    correctAnswer: 1,
    explanation: 'Encryption at rest protects stored data from unauthorized access to storage media.',
    topic: 'Cryptography',
    subtopic: 'Encryption at Rest'
  },
  {
    id: 'cisa5-137',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Transport Layer Security (TLS) provides:',
    options: [
      'Only encryption',
      'Encryption, authentication, and integrity for communications',
      'Only authentication',
      'Only integrity'
    ],
    correctAnswer: 1,
    explanation: 'TLS provides encryption, server authentication, and data integrity for network communications.',
    topic: 'Cryptography',
    subtopic: 'TLS'
  },
  {
    id: 'cisa5-139',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Firewall rule review should verify:',
    options: [
      'Only syntax',
      'Business justification, currency, and least privilege',
      'Only performance',
      'Only logging'
    ],
    correctAnswer: 1,
    explanation: 'Firewall rule reviews should verify business justification, currency, and least privilege principle.',
    topic: 'Network Security',
    subtopic: 'Firewall Review'
  },
  {
    id: 'cisa5-140',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Intrusion Detection Systems (IDS) detect:',
    options: [
      'All attacks',
      'Potential security incidents through signature or behavior analysis',
      'Only known attacks',
      'Only internal attacks'
    ],
    correctAnswer: 1,
    explanation: 'IDS detects potential incidents through signature matching and behavioral analysis.',
    topic: 'Network Security',
    subtopic: 'IDS'
  },
  {
    id: 'cisa5-141',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Next-generation firewalls (NGFW) add:',
    options: [
      'Only speed',
      'Application awareness, user identity, and threat intelligence',
      'Only logging',
      'Only VPN'
    ],
    correctAnswer: 1,
    explanation: 'NGFW adds application awareness, user identity integration, and threat intelligence to traditional firewalls.',
    topic: 'Network Security',
    subtopic: 'NGFW'
  },
  {
    id: 'cisa5-142',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Web Application Firewalls (WAF) protect against:',
    options: [
      'Network attacks only',
      'Application-layer attacks targeting web applications',
      'Physical attacks',
      'Social engineering'
    ],
    correctAnswer: 1,
    explanation: 'WAF protects against application-layer attacks like SQL injection and XSS.',
    topic: 'Application Security',
    subtopic: 'WAF'
  },
  {
    id: 'cisa5-143',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'VPN split tunneling:',
    options: [
      'Increases security',
      'Allows some traffic to bypass VPN, creating potential risk',
      'Is always recommended',
      'Improves encryption'
    ],
    correctAnswer: 1,
    explanation: 'Split tunneling allows some traffic to bypass VPN, potentially exposing the network to risk.',
    topic: 'Network Security',
    subtopic: 'VPN'
  },
  {
    id: 'cisa5-144',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'DNS security extensions (DNSSEC):',
    options: [
      'Encrypt DNS queries',
      'Authenticate DNS responses to prevent spoofing',
      'Hide DNS servers',
      'Block malicious domains'
    ],
    correctAnswer: 1,
    explanation: 'DNSSEC authenticates DNS responses using digital signatures to prevent DNS spoofing.',
    topic: 'Network Security',
    subtopic: 'DNSSEC'
  },
  {
    id: 'cisa5-145',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Network Access Control (NAC) verifies:',
    options: [
      'Only identity',
      'Device health and compliance before granting network access',
      'Only location',
      'Only time of access'
    ],
    correctAnswer: 1,
    explanation: 'NAC verifies device identity, health, and policy compliance before allowing network access.',
    topic: 'Network Security',
    subtopic: 'NAC'
  },
  {
    id: 'cisa5-146',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Wireless security requires:',
    options: [
      'Only passwords',
      'Strong encryption, authentication, and rogue AP detection',
      'Only physical controls',
      'Only MAC filtering'
    ],
    correctAnswer: 1,
    explanation: 'Wireless security requires strong encryption (WPA3), authentication, and monitoring for rogue access points.',
    topic: 'Network Security',
    subtopic: 'Wireless'
  },
  {
    id: 'cisa5-147',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Supply chain security for software should verify:',
    options: [
      'Only vendor reputation',
      'Component integrity, provenance, and vendor security practices',
      'Only pricing',
      'Only functionality'
    ],
    correctAnswer: 1,
    explanation: 'Supply chain security verifies component integrity, provenance, and vendor security practices.',
    topic: 'Security Management',
    subtopic: 'Supply Chain'
  },
  {
    id: 'cisa5-148',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Security metrics should be:',
    options: [
      'As numerous as possible',
      'Meaningful, measurable, and actionable',
      'Technical only',
      'Complex'
    ],
    correctAnswer: 1,
    explanation: 'Security metrics should be meaningful to stakeholders, measurable, and drive actionable decisions.',
    topic: 'Security Management',
    subtopic: 'Metrics'
  },
  {
    id: 'cisa5-149',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Security control framework mapping:',
    options: [
      'Is unnecessary',
      'Helps demonstrate compliance with multiple requirements efficiently',
      'Increases complexity',
      'Only applies to large organizations'
    ],
    correctAnswer: 1,
    explanation: 'Framework mapping enables efficient demonstration of compliance with multiple regulatory requirements.',
    topic: 'Security Management',
    subtopic: 'Framework Mapping'
  },
  {
    id: 'cisa5-150',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Security by obscurity:',
    options: [
      'Is sufficient for protection',
      'Should not be relied upon as the only protection',
      'Is recommended practice',
      'Replaces other controls'
    ],
    correctAnswer: 1,
    explanation: 'Security by obscurity should not be relied upon alone; defense in depth with multiple controls is required.',
    topic: 'Security Principles',
    subtopic: 'Security by Obscurity'
  },
  {
    id: 'cisa5-151',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Insider threat programs should include:',
    options: [
      'Only monitoring',
      'Prevention, detection, training, and response capabilities',
      'Only termination procedures',
      'Only background checks'
    ],
    correctAnswer: 1,
    explanation: 'Insider threat programs require prevention, detection, awareness training, and response capabilities.',
    topic: 'Security Management',
    subtopic: 'Insider Threat'
  },
  {
    id: 'cisa5-152',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Security culture development requires:',
    options: [
      'Policies only',
      'Leadership commitment, training, and positive reinforcement',
      'Punishment only',
      'Technology solutions only'
    ],
    correctAnswer: 1,
    explanation: 'Security culture requires leadership commitment, ongoing training, and positive reinforcement.',
    topic: 'Security Management',
    subtopic: 'Security Culture'
  },
];

export default CISA5_QUESTIONS_BATCH6;
