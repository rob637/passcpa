/**
 * CIA Part 3: Business Knowledge - Additional Questions (Batch 1)
 * Questions CIA3-071 through CIA3-170
 * 
 * Domain breakdown:
 * - Domain I: Business Acumen (35%)
 * - Domain II: Information Security (25%)
 * - Domain III: Information Technology (20%)
 * - Domain IV: Financial Management (20%)
 */

import { Question } from '../../../types';

export const CIA3_QUESTIONS_BATCH2: Question[] = [
  // ============================================================================
  // DOMAIN I: BUSINESS ACUMEN (35%)
  // ============================================================================
  
  
  {
    id: 'CIA3-072',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'A company pursuing a cost leadership strategy focuses on:',
    options: [
      'Premium pricing for unique products',
      'Being the lowest cost producer while maintaining acceptable quality',
      'Serving niche markets exclusively',
      'Offering the widest product variety'
    ],
    correctAnswer: 1,
    explanation: 'Cost leadership strategy aims to become the lowest-cost producer in the industry, enabling competitive pricing while maintaining profitability.',
    topic: 'Business Acumen',
    subtopic: 'Competitive Strategy'
  },
  {
    id: 'CIA3-073',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Vertical integration involves:',
    options: [
      'Acquiring competitors at the same level',
      'Expanding into upstream supply or downstream distribution activities',
      'Diversifying into unrelated businesses',
      'Entering foreign markets'
    ],
    correctAnswer: 1,
    explanation: 'Vertical integration expands control over the value chain, either backward (toward suppliers) or forward (toward distributors/customers).',
    topic: 'Business Acumen',
    subtopic: 'Corporate Strategy'
  },
  {
    id: 'CIA3-074',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'A company\'s mission statement typically describes:',
    options: [
      'Detailed financial projections',
      'The organization\'s purpose and reason for existence',
      'Specific operational procedures',
      'Employee compensation plans'
    ],
    correctAnswer: 1,
    explanation: 'The mission statement articulates the organization\'s fundamental purpose, what it does, for whom, and why it exists.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Management'
  },
  {
    id: 'CIA3-075',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The balanced scorecard includes perspectives on:',
    options: [
      'Only financial performance',
      'Financial, customer, internal process, and learning/growth',
      'Only customer satisfaction',
      'Only operational efficiency'
    ],
    correctAnswer: 1,
    explanation: 'The balanced scorecard framework measures performance across four perspectives: Financial, Customer, Internal Business Process, and Learning & Growth.',
    topic: 'Business Acumen',
    subtopic: 'Performance Management'
  },
  {
    id: 'CIA3-076',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Key Performance Indicators (KPIs) should be:',
    options: [
      'As numerous as possible',
      'Aligned with strategic objectives and actionable',
      'Only financial in nature',
      'Changed frequently'
    ],
    correctAnswer: 1,
    explanation: 'Effective KPIs are aligned with strategy, measurable, actionable, and limited in number to focus attention on what truly matters.',
    topic: 'Business Acumen',
    subtopic: 'Performance Metrics'
  },
  {
    id: 'CIA3-077',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Benchmarking compares organizational performance to:',
    options: [
      'Only internal historical data',
      'Best practices or peer performance',
      'Only regulatory requirements',
      'Only budget targets'
    ],
    correctAnswer: 1,
    explanation: 'Benchmarking compares performance to best practices, industry leaders, or peer organizations to identify improvement opportunities.',
    topic: 'Business Acumen',
    subtopic: 'Performance Improvement'
  },
  {
    id: 'CIA3-078',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Organizational culture refers to:',
    options: [
      'Physical office layout',
      'Shared values, beliefs, and norms within an organization',
      'Formal policies only',
      'Technology infrastructure'
    ],
    correctAnswer: 1,
    explanation: 'Organizational culture comprises the shared values, beliefs, behaviors, and norms that characterize how an organization operates.',
    topic: 'Business Acumen',
    subtopic: 'Organizational Behavior'
  },
  {
    id: 'CIA3-079',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Change management includes:',
    options: [
      'Only technical system changes',
      'Leading people through organizational transitions effectively',
      'Only document control',
      'Only crisis response'
    ],
    correctAnswer: 1,
    explanation: 'Change management encompasses the processes, tools, and techniques for managing the people side of change to achieve desired outcomes.',
    topic: 'Business Acumen',
    subtopic: 'Change Management'
  },
  {
    id: 'CIA3-080',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Stakeholder analysis identifies:',
    options: [
      'Only shareholders',
      'All parties with interest in or influence on organizational activities',
      'Only employees',
      'Only regulatory agencies'
    ],
    correctAnswer: 1,
    explanation: 'Stakeholder analysis identifies all parties who may affect or be affected by organizational actions, their interests, and how to engage them.',
    topic: 'Business Acumen',
    subtopic: 'Stakeholder Management'
  },
  {
    id: 'CIA3-081',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Core competencies are:',
    options: [
      'Basic skills all employees should have',
      'Unique capabilities that provide competitive advantage',
      'Industry-standard processes',
      'Required certifications'
    ],
    correctAnswer: 1,
    explanation: 'Core competencies are unique organizational capabilities that provide competitive advantage and are difficult for competitors to replicate.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Management'
  },
  {
    id: 'CIA3-082',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Business process reengineering involves:',
    options: [
      'Minor process improvements',
      'Fundamental rethinking and radical redesign of business processes',
      'Only technology upgrades',
      'Only staff reductions'
    ],
    correctAnswer: 1,
    explanation: 'BPR involves fundamentally rethinking and radically redesigning processes to achieve dramatic improvements in performance.',
    topic: 'Business Acumen',
    subtopic: 'Process Improvement'
  },
  {
    id: 'CIA3-083',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Lean management focuses on:',
    options: [
      'Maximizing inventory levels',
      'Eliminating waste while maximizing customer value',
      'Increasing overhead costs',
      'Extending production cycles'
    ],
    correctAnswer: 1,
    explanation: 'Lean methodology focuses on eliminating waste (non-value-adding activities) while maximizing value from the customer perspective.',
    topic: 'Business Acumen',
    subtopic: 'Operations Management'
  },
  {
    id: 'CIA3-084',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Six Sigma methodology aims to:',
    options: [
      'Reduce quality to save costs',
      'Reduce process variation and defects to near-zero levels',
      'Increase production speed only',
      'Eliminate all processes'
    ],
    correctAnswer: 1,
    explanation: 'Six Sigma uses statistical methods to reduce process variation and defects to 3.4 defects per million opportunities.',
    topic: 'Business Acumen',
    subtopic: 'Quality Management'
  },
  {
    id: 'CIA3-085',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Supply chain management encompasses:',
    options: [
      'Only transportation logistics',
      'End-to-end flow of materials, information, and finances from source to customer',
      'Only vendor selection',
      'Only inventory management'
    ],
    correctAnswer: 1,
    explanation: 'Supply chain management integrates the flow of goods, information, and finances across the entire chain from raw materials to end customer.',
    topic: 'Business Acumen',
    subtopic: 'Supply Chain'
  },
  {
    id: 'CIA3-086',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Outsourcing is appropriate when:',
    options: [
      'Always, for all functions',
      'A function is not a core competency and can be done better/cheaper externally',
      'Internal resources are available',
      'Activities are highly confidential'
    ],
    correctAnswer: 1,
    explanation: 'Outsourcing is typically appropriate for non-core activities that external providers can perform more efficiently while allowing focus on core competencies.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Sourcing'
  },
  {
    id: 'CIA3-087',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Project management fundamentals include:',
    options: [
      'Only scheduling',
      'Scope, time, cost, quality, risk, and resource management',
      'Only budgeting',
      'Only status reporting'
    ],
    correctAnswer: 1,
    explanation: 'Project management encompasses managing scope, schedule, cost, quality, resources, risk, communication, stakeholders, and procurement.',
    topic: 'Business Acumen',
    subtopic: 'Project Management'
  },
  {
    id: 'CIA3-088',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The critical path in a project is:',
    options: [
      'The shortest sequence of activities',
      'The longest sequence that determines minimum project duration',
      'Optional tasks only',
      'Administrative activities only'
    ],
    correctAnswer: 1,
    explanation: 'The critical path is the longest sequence of dependent activities; any delay on critical path activities extends the project timeline.',
    topic: 'Business Acumen',
    subtopic: 'Project Management'
  },
  
  {
    id: 'CIA3-090',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Risk tolerance differs from risk appetite in that it:',
    options: [
      'Is the same concept',
      'Represents more specific, measurable limits within the appetite',
      'Applies only to financial risks',
      'Is determined by external auditors'
    ],
    correctAnswer: 1,
    explanation: 'Risk tolerance represents specific, measurable limits on variation acceptable within the broader risk appetite framework.',
    topic: 'Business Acumen',
    subtopic: 'Enterprise Risk Management'
  },
  {
    id: 'CIA3-091',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Corporate social responsibility (CSR) includes:',
    options: [
      'Only charitable donations',
      'Environmental, social, and governance considerations in business decisions',
      'Only legal compliance',
      'Only employee benefits'
    ],
    correctAnswer: 1,
    explanation: 'CSR encompasses environmental sustainability, social responsibility, ethical business practices, and governance beyond legal requirements.',
    topic: 'Business Acumen',
    subtopic: 'Sustainability'
  },
  {
    id: 'CIA3-092',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Business continuity planning ensures:',
    options: [
      'Only IT system recovery',
      'The organization can continue critical operations during and after disruption',
      'Only natural disaster response',
      'Only facility security'
    ],
    correctAnswer: 1,
    explanation: 'BCP addresses how the organization will continue critical operations during disruptions and recover fully afterward.',
    topic: 'Business Acumen',
    subtopic: 'Business Continuity'
  },
  {
    id: 'CIA3-093',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Recovery Time Objective (RTO) represents:',
    options: [
      'Data backup frequency',
      'Maximum acceptable downtime before operations must resume',
      'Time to install new systems',
      'Employee recovery period'
    ],
    correctAnswer: 1,
    explanation: 'RTO is the maximum tolerable duration of an outage before the impact becomes unacceptable; determines recovery urgency.',
    topic: 'Business Acumen',
    subtopic: 'Business Continuity'
  },
  {
    id: 'CIA3-094',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Recovery Point Objective (RPO) defines:',
    options: [
      'System availability requirements',
      'Maximum acceptable data loss measured in time',
      'Recovery team membership',
      'Backup storage locations'
    ],
    correctAnswer: 1,
    explanation: 'RPO represents the maximum acceptable data loss, driving backup frequency decisions (e.g., 4-hour RPO requires at least 4-hourly backups).',
    topic: 'Business Acumen',
    subtopic: 'Business Continuity'
  },

  // ============================================================================
  // DOMAIN II: INFORMATION SECURITY (25%)
  // ============================================================================
  
  {
    id: 'CIA3-095',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The CIA triad in information security represents:',
    options: [
      'Cost, integration, automation',
      'Confidentiality, integrity, availability',
      'Control, implementation, audit',
      'Compliance, investigation, assessment'
    ],
    correctAnswer: 1,
    explanation: 'The CIA triad encompasses Confidentiality (preventing unauthorized disclosure), Integrity (preventing unauthorized modification), and Availability (ensuring authorized access).',
    topic: 'Information Security',
    subtopic: 'Security Fundamentals'
  },
  {
    id: 'CIA3-096',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Defense in depth security strategy uses:',
    options: [
      'Single strong perimeter control only',
      'Multiple overlapping security controls at different layers',
      'Physical security only',
      'User training only'
    ],
    correctAnswer: 1,
    explanation: 'Defense in depth layers multiple security controls so that if one fails, others provide protection, avoiding single points of failure.',
    topic: 'Information Security',
    subtopic: 'Security Architecture'
  },
  {
    id: 'CIA3-097',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Access control based on job responsibilities is called:',
    options: [
      'Discretionary access control',
      'Role-based access control (RBAC)',
      'Mandatory access control',
      'Physical access control'
    ],
    correctAnswer: 1,
    explanation: 'Role-based access control assigns permissions based on job roles, simplifying administration and ensuring least privilege by job function.',
    topic: 'Information Security',
    subtopic: 'Access Control'
  },
  {
    id: 'CIA3-098',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Multi-factor authentication requires:',
    options: [
      'Multiple passwords',
      'Authentication using two or more different factor types',
      'Multiple user accounts',
      'Frequent password changes'
    ],
    correctAnswer: 1,
    explanation: 'MFA combines factors from different categories: something you know (password), something you have (token), and/or something you are (biometric).',
    topic: 'Information Security',
    subtopic: 'Authentication'
  },
  {
    id: 'CIA3-099',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Encryption protects data by:',
    options: [
      'Deleting unnecessary data',
      'Converting data to unreadable form reversible only with a key',
      'Compressing data',
      'Duplicating data'
    ],
    correctAnswer: 1,
    explanation: 'Encryption transforms readable data (plaintext) into unreadable form (ciphertext) that can only be reversed using the appropriate decryption key.',
    topic: 'Information Security',
    subtopic: 'Cryptography'
  },
  {
    id: 'CIA3-100',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Public key infrastructure (PKI) enables:',
    options: [
      'Only password management',
      'Secure digital identity verification and encrypted communication',
      'Physical access control only',
      'Database administration only'
    ],
    correctAnswer: 1,
    explanation: 'PKI provides the framework for digital certificates, enabling identity verification, secure key exchange, and encrypted communications.',
    topic: 'Information Security',
    subtopic: 'Cryptography'
  },
  {
    id: 'CIA3-101',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A firewall\'s primary function is to:',
    options: [
      'Encrypt all data',
      'Filter network traffic based on security rules',
      'Store backup data',
      'Authenticate users'
    ],
    correctAnswer: 1,
    explanation: 'Firewalls control network traffic by evaluating packets against defined rules and allowing or blocking based on source, destination, port, and protocol.',
    topic: 'Information Security',
    subtopic: 'Network Security'
  },
  {
    id: 'CIA3-102',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'An intrusion detection system (IDS):',
    options: [
      'Blocks all network traffic',
      'Monitors for and alerts on suspicious activities',
      'Encrypts network transmissions',
      'Backs up critical data'
    ],
    correctAnswer: 1,
    explanation: 'An IDS monitors network or system activities for malicious behavior or policy violations and generates alerts for investigation.',
    topic: 'Information Security',
    subtopic: 'Network Security'
  },
  {
    id: 'CIA3-103',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Social engineering attacks target:',
    options: [
      'Only computer systems',
      'Human psychology to manipulate people into revealing information',
      'Only network infrastructure',
      'Only hardware components'
    ],
    correctAnswer: 1,
    explanation: 'Social engineering exploits human psychology through manipulation, deception, or persuasion rather than technical vulnerabilities.',
    topic: 'Information Security',
    subtopic: 'Security Threats'
  },
  {
    id: 'CIA3-104',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'A ransomware attack:',
    options: [
      'Steals data quietly',
      'Encrypts victim\'s data and demands payment for decryption',
      'Only affects email systems',
      'Provides free software'
    ],
    correctAnswer: 1,
    explanation: 'Ransomware malware encrypts the victim\'s files and demands ransom payment in exchange for the decryption key.',
    topic: 'Information Security',
    subtopic: 'Malware'
  },
  {
    id: 'CIA3-105',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A man-in-the-middle attack involves:',
    options: [
      'Only physical intrusion',
      'Intercepting and potentially altering communications between two parties',
      'Only malware installation',
      'Only denial of service'
    ],
    correctAnswer: 1,
    explanation: 'MITM attacks intercept communications between two parties, enabling eavesdropping or manipulation without either party\'s knowledge.',
    topic: 'Information Security',
    subtopic: 'Security Threats'
  },
  {
    id: 'CIA3-106',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Vulnerability scanning is used to:',
    options: [
      'Block all network traffic',
      'Identify security weaknesses in systems',
      'Encrypt sensitive data',
      'Train employees'
    ],
    correctAnswer: 1,
    explanation: 'Vulnerability scanning automatically identifies known security weaknesses in systems, applications, and configurations.',
    topic: 'Information Security',
    subtopic: 'Security Assessment'
  },
  {
    id: 'CIA3-107',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Penetration testing differs from vulnerability scanning in that it:',
    options: [
      'Is fully automated',
      'Actively attempts to exploit vulnerabilities to assess real-world impact',
      'Only checks configurations',
      'Never involves human testers'
    ],
    correctAnswer: 1,
    explanation: 'Penetration testing actively attempts to exploit vulnerabilities to demonstrate real-world attack impact, going beyond automated scanning.',
    topic: 'Information Security',
    subtopic: 'Security Assessment'
  },
  {
    id: 'CIA3-108',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Security incident response phases include:',
    options: [
      'Only investigation',
      'Preparation, detection, containment, eradication, recovery, and lessons learned',
      'Only recovery',
      'Only notification'
    ],
    correctAnswer: 1,
    explanation: 'Incident response follows structured phases: preparation, detection/analysis, containment, eradication, recovery, and post-incident lessons learned.',
    topic: 'Information Security',
    subtopic: 'Incident Response'
  },
  {
    id: 'CIA3-109',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Data classification typically includes levels such as:',
    options: [
      'Only public',
      'Public, internal, confidential, and top secret/restricted',
      'Only secret',
      'Only encrypted and unencrypted'
    ],
    correctAnswer: 1,
    explanation: 'Data classification assigns sensitivity levels (public, internal, confidential, highly restricted) determining protection requirements.',
    topic: 'Information Security',
    subtopic: 'Data Protection'
  },
  {
    id: 'CIA3-110',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Security awareness training helps:',
    options: [
      'Replace technical controls',
      'Educate employees about security risks and proper behaviors',
      'Eliminate all security threats',
      'Automate security responses'
    ],
    correctAnswer: 1,
    explanation: 'Security awareness training educates employees to recognize threats, follow security policies, and protect organizational assets.',
    topic: 'Information Security',
    subtopic: 'Security Training'
  },
  {
    id: 'CIA3-111',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A security policy should:',
    options: [
      'Include detailed technical configurations',
      'Define information security objectives and management direction',
      'Only address passwords',
      'Be confidential to IT only'
    ],
    correctAnswer: 1,
    explanation: 'Security policies communicate management\'s direction and requirements for protecting information assets, providing the foundation for detailed standards and procedures.',
    topic: 'Information Security',
    subtopic: 'Security Governance'
  },
  {
    id: 'CIA3-112',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Zero trust security architecture assumes:',
    options: [
      'The network perimeter is secure',
      'No user or system is trusted by default regardless of location',
      'Internal users are always trusted',
      'Only external threats exist'
    ],
    correctAnswer: 1,
    explanation: 'Zero trust assumes no implicit trust based on network location; every access request must be verified regardless of origin.',
    topic: 'Information Security',
    subtopic: 'Security Architecture'
  },
  {
    id: 'CIA3-113',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Data loss prevention (DLP) tools:',
    options: [
      'Only back up data',
      'Monitor and protect sensitive data from unauthorized transfer',
      'Only encrypt data',
      'Only compress data'
    ],
    correctAnswer: 1,
    explanation: 'DLP solutions detect and prevent unauthorized transmission of sensitive data through email, web, storage devices, or other channels.',
    topic: 'Information Security',
    subtopic: 'Data Protection'
  },
  {
    id: 'CIA3-114',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Physical security for IT assets includes:',
    options: [
      'Only software controls',
      'Access controls, surveillance, and environmental protections',
      'Only network firewalls',
      'Only data encryption'
    ],
    correctAnswer: 1,
    explanation: 'Physical security encompasses access controls, surveillance systems, and environmental protections (fire, flood, climate) for IT infrastructure.',
    topic: 'Information Security',
    subtopic: 'Physical Security'
  },

  // ============================================================================
  // DOMAIN III: INFORMATION TECHNOLOGY (20%)
  // ============================================================================
  
  {
    id: 'CIA3-115',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'IT governance ensures:',
    options: [
      'IT operates without oversight',
      'IT investments support business objectives and manage risks',
      'All technology decisions are automated',
      'IT operates independently'
    ],
    correctAnswer: 1,
    explanation: 'IT governance provides the structure ensuring IT investments align with business strategy, deliver value, and properly manage IT-related risks.',
    topic: 'Information Technology',
    subtopic: 'IT Governance'
  },
  {
    id: 'CIA3-116',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'COBIT (Control Objectives for Information Technology) provides:',
    options: [
      'Hardware specifications',
      'A framework for IT governance and management practices',
      'Programming standards only',
      'Network configurations only'
    ],
    correctAnswer: 1,
    explanation: 'COBIT provides a comprehensive framework of governance and management objectives for enterprise IT, linking business goals to IT goals.',
    topic: 'Information Technology',
    subtopic: 'IT Frameworks'
  },
  {
    id: 'CIA3-117',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'ITIL focuses primarily on:',
    options: [
      'Hardware maintenance',
      'IT service management best practices',
      'Programming languages',
      'Database design'
    ],
    correctAnswer: 1,
    explanation: 'ITIL (Information Technology Infrastructure Library) provides best practices for IT service management, focusing on aligning IT services with business needs.',
    topic: 'Information Technology',
    subtopic: 'IT Frameworks'
  },
  {
    id: 'CIA3-118',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'The systems development life cycle (SDLC) includes phases of:',
    options: [
      'Only programming',
      'Planning, analysis, design, development, testing, implementation, and maintenance',
      'Only testing',
      'Only documentation'
    ],
    correctAnswer: 1,
    explanation: 'SDLC encompasses the full life cycle from requirements through development, testing, deployment, and ongoing maintenance of systems.',
    topic: 'Information Technology',
    subtopic: 'Systems Development'
  },
  {
    id: 'CIA3-119',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Agile development methodology emphasizes:',
    options: [
      'Detailed upfront planning only',
      'Iterative development, customer collaboration, and responding to change',
      'Sequential phases only',
      'Documentation over working software'
    ],
    correctAnswer: 1,
    explanation: 'Agile prioritizes iterative delivery, customer collaboration, responding to change, and working software over comprehensive documentation.',
    topic: 'Information Technology',
    subtopic: 'Development Methodologies'
  },
  {
    id: 'CIA3-120',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'DevOps practices aim to:',
    options: [
      'Separate development and operations',
      'Integrate development and operations for faster, more reliable delivery',
      'Eliminate testing',
      'Increase manual processes'
    ],
    correctAnswer: 1,
    explanation: 'DevOps integrates development and operations through cultural practices and tools enabling continuous integration and delivery with improved reliability.',
    topic: 'Information Technology',
    subtopic: 'Development Practices'
  },
  {
    id: 'CIA3-121',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Change management controls in IT ensure:',
    options: [
      'No changes are ever made',
      'Changes are authorized, tested, and implemented properly',
      'Only emergency changes are documented',
      'Changes bypass testing'
    ],
    correctAnswer: 1,
    explanation: 'IT change management controls ensure changes are requested, authorized, tested, documented, and implemented in a controlled manner.',
    topic: 'Information Technology',
    subtopic: 'IT Controls'
  },
  {
    id: 'CIA3-122',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Cloud computing service models include:',
    options: [
      'Only hardware as a service',
      'IaaS (Infrastructure), PaaS (Platform), and SaaS (Software) as a Service',
      'Only backup services',
      'Only email services'
    ],
    correctAnswer: 1,
    explanation: 'Cloud service models span IaaS (infrastructure resources), PaaS (development platforms), and SaaS (complete software applications).',
    topic: 'Information Technology',
    subtopic: 'Cloud Computing'
  },
  {
    id: 'CIA3-123',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'In cloud computing, the shared responsibility model means:',
    options: [
      'The cloud provider is responsible for everything',
      'Security responsibilities are divided between provider and customer',
      'The customer is responsible for everything',
      'No party is responsible'
    ],
    correctAnswer: 1,
    explanation: 'Shared responsibility divides security duties: the provider secures underlying infrastructure while customers secure their data, applications, and access management.',
    topic: 'Information Technology',
    subtopic: 'Cloud Computing'
  },
  {
    id: 'CIA3-124',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Database normalization reduces:',
    options: [
      'Query performance',
      'Data redundancy and anomalies through organizing data structure',
      'Data access speed',
      'Security protections'
    ],
    correctAnswer: 1,
    explanation: 'Normalization organizes database tables to reduce redundancy and prevent update, insertion, and deletion anomalies.',
    topic: 'Information Technology',
    subtopic: 'Database Management'
  },
  {
    id: 'CIA3-125',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Big data is characterized by:',
    options: [
      'Only large volume',
      'Volume, velocity, variety, and veracity of data',
      'Only structured data',
      'Only historical data'
    ],
    correctAnswer: 1,
    explanation: 'Big data is characterized by Volume (large amounts), Velocity (high speed), Variety (different formats), and Veracity (quality/accuracy challenges).',
    topic: 'Information Technology',
    subtopic: 'Data Management'
  },
  {
    id: 'CIA3-126',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'An API (Application Programming Interface) enables:',
    options: [
      'Only hardware communication',
      'Software applications to communicate and share data/functionality',
      'Only user interfaces',
      'Only database storage'
    ],
    correctAnswer: 1,
    explanation: 'APIs enable software components to communicate, share data, and use each other\'s functionality through defined interfaces.',
    topic: 'Information Technology',
    subtopic: 'Application Integration'
  },
  {
    id: 'CIA3-127',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Virtualization technology:',
    options: [
      'Only applies to desktops',
      'Creates virtual instances of hardware, operating systems, or networks',
      'Eliminates the need for hardware',
      'Only applies to storage'
    ],
    correctAnswer: 1,
    explanation: 'Virtualization creates abstracted, virtual versions of computing resources, enabling efficient utilization and flexibility.',
    topic: 'Information Technology',
    subtopic: 'Infrastructure'
  },
  {
    id: 'CIA3-128',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Artificial intelligence audit risks include:',
    options: [
      'Only hardware failures',
      'Bias, explainability challenges, data quality, and unintended consequences',
      'Only cost overruns',
      'Only vendor issues'
    ],
    correctAnswer: 1,
    explanation: 'AI audit risks include algorithmic bias, lack of explainability ("black box"), data quality issues, and potential unintended outcomes.',
    topic: 'Information Technology',
    subtopic: 'Emerging Technology'
  },
  {
    id: 'CIA3-129',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Blockchain technology provides:',
    options: [
      'Centralized transaction control',
      'Distributed, immutable ledger for recording transactions',
      'Traditional database features only',
      'Automated accounting entries'
    ],
    correctAnswer: 1,
    explanation: 'Blockchain creates a distributed, tamper-resistant ledger where transactions are cryptographically linked and validated across nodes.',
    topic: 'Information Technology',
    subtopic: 'Emerging Technology'
  },
  {
    id: 'CIA3-130',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Robotic Process Automation (RPA) automates:',
    options: [
      'Physical manufacturing robots',
      'Repetitive rule-based tasks typically performed by humans',
      'Only customer service',
      'Only financial trading'
    ],
    correctAnswer: 1,
    explanation: 'RPA uses software robots to automate repetitive, rule-based tasks like data entry, reducing manual effort and errors.',
    topic: 'Information Technology',
    subtopic: 'Automation'
  },

  // ============================================================================
  // DOMAIN IV: FINANCIAL MANAGEMENT (20%)
  // ============================================================================
  
  {
    id: 'CIA3-131',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The balance sheet presents:',
    options: [
      'Revenue and expenses over a period',
      'Assets, liabilities, and equity at a point in time',
      'Cash flows for a period',
      'Changes in equity over time'
    ],
    correctAnswer: 1,
    explanation: 'The balance sheet presents the financial position at a specific date, showing what the organization owns (assets), owes (liabilities), and net worth (equity).',
    topic: 'Financial Management',
    subtopic: 'Financial Statements'
  },
  {
    id: 'CIA3-132',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Working capital equals:',
    options: [
      'Total assets minus long-term debt',
      'Current assets minus current liabilities',
      'Net income plus depreciation',
      'Cash and cash equivalents only'
    ],
    correctAnswer: 1,
    explanation: 'Working capital (current assets minus current liabilities) measures short-term liquidity and operational efficiency.',
    topic: 'Financial Management',
    subtopic: 'Liquidity Analysis'
  },
  {
    id: 'CIA3-133',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The quick ratio excludes:',
    options: [
      'Cash',
      'Inventory and prepaid expenses',
      'Accounts receivable',
      'Marketable securities'
    ],
    correctAnswer: 1,
    explanation: 'The quick (acid-test) ratio excludes inventory and prepaids because they may not convert to cash quickly, testing more stringent liquidity.',
    topic: 'Financial Management',
    subtopic: 'Financial Ratios'
  },
  
  {
    id: 'CIA3-135',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Debt-to-equity ratio assesses:',
    options: [
      'Short-term liquidity',
      'Financial leverage and capital structure',
      'Operational efficiency',
      'Profit margins'
    ],
    correctAnswer: 1,
    explanation: 'Debt-to-equity ratio (Total Debt / Total Equity) measures financial leverage; higher ratios indicate greater reliance on debt financing.',
    topic: 'Financial Management',
    subtopic: 'Financial Ratios'
  },
  {
    id: 'CIA3-136',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Return on investment (ROI) is calculated as:',
    options: [
      'Revenue / Assets',
      'Net Income / Investment or Gain minus Cost / Cost',
      'Assets / Equity',
      'Revenue / Expenses'
    ],
    correctAnswer: 1,
    explanation: 'ROI measures the return generated relative to the investment, calculated as (Gain - Cost) / Cost or Net Income / Investment.',
    topic: 'Financial Management',
    subtopic: 'Financial Ratios'
  },
  {
    id: 'CIA3-137',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Net present value (NPV) analysis:',
    options: [
      'Ignores the time value of money',
      'Discounts future cash flows to present value for investment decisions',
      'Only considers initial cost',
      'Measures accounting profit'
    ],
    correctAnswer: 1,
    explanation: 'NPV discounts expected future cash flows to present value using a required rate, determining if an investment creates value (positive NPV).',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting'
  },
  
  {
    id: 'CIA3-139',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Internal rate of return (IRR) is:',
    options: [
      'The minimum acceptable return',
      'The discount rate that makes NPV equal zero',
      'The actual project profit',
      'The weighted average cost of capital'
    ],
    correctAnswer: 1,
    explanation: 'IRR is the discount rate at which a project\'s NPV equals zero; projects with IRR exceeding the required rate may be acceptable.',
    topic: 'Financial Management',
    subtopic: 'Capital Budgeting'
  },
  {
    id: 'CIA3-140',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Weighted average cost of capital (WACC) represents:',
    options: [
      'Only the cost of debt',
      'The blended cost of all capital sources used by the firm',
      'Only the cost of equity',
      'The risk-free rate'
    ],
    correctAnswer: 1,
    explanation: 'WACC is the average rate the company must pay for its capital, weighted by the proportion of debt and equity in its capital structure.',
    topic: 'Financial Management',
    subtopic: 'Cost of Capital'
  },
  {
    id: 'CIA3-141',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A budget variance analysis compares:',
    options: [
      'Only two fiscal years',
      'Actual results to budgeted expectations',
      'Only industry benchmarks',
      'Only prior period results'
    ],
    correctAnswer: 1,
    explanation: 'Variance analysis compares actual performance to budget, identifying favorable or unfavorable variances for investigation and corrective action.',
    topic: 'Financial Management',
    subtopic: 'Budgeting'
  },
  {
    id: 'CIA3-142',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Fixed costs:',
    options: [
      'Change proportionally with production volume',
      'Remain constant regardless of production volume within a relevant range',
      'Only apply to direct materials',
      'Are never controllable'
    ],
    correctAnswer: 1,
    explanation: 'Fixed costs remain constant within a relevant range regardless of production or activity volume (e.g., rent, salaries).',
    topic: 'Financial Management',
    subtopic: 'Cost Behavior'
  },
  {
    id: 'CIA3-143',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Contribution margin is:',
    options: [
      'Gross profit',
      'Revenue minus variable costs',
      'Net income',
      'Operating income'
    ],
    correctAnswer: 1,
    explanation: 'Contribution margin (Revenue minus Variable Costs) shows the amount available to cover fixed costs and generate profit.',
    topic: 'Financial Management',
    subtopic: 'Cost Analysis'
  },
  {
    id: 'CIA3-144',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Break-even analysis determines:',
    options: [
      'Maximum profit potential',
      'The volume at which total revenues equal total costs',
      'Market share requirements',
      'Minimum inventory levels'
    ],
    correctAnswer: 1,
    explanation: 'Break-even analysis finds the sales volume where total revenue equals total costs; beyond this point, additional sales generate profit.',
    topic: 'Financial Management',
    subtopic: 'Cost Analysis'
  },
  {
    id: 'CIA3-145',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Activity-based costing allocates overhead based on:',
    options: [
      'Only direct labor hours',
      'Activities that drive costs',
      'Only machine hours',
      'Only revenue'
    ],
    correctAnswer: 1,
    explanation: 'ABC assigns overhead based on the activities that consume resources, providing more accurate cost allocation than traditional methods.',
    topic: 'Financial Management',
    subtopic: 'Cost Accounting'
  },
  {
    id: 'CIA3-146',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Material variances analyze differences between:',
    options: [
      'Only labor costs',
      'Actual and standard material costs (price and quantity)',
      'Only overhead',
      'Only fixed costs'
    ],
    correctAnswer: 1,
    explanation: 'Material variances break down cost differences into price variances (cost per unit) and quantity/usage variances (amount used).',
    topic: 'Financial Management',
    subtopic: 'Variance Analysis'
  },
  {
    id: 'CIA3-147',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Transfer pricing policies affect:',
    options: [
      'Only external sales',
      'Profit allocation between divisions and tax implications',
      'Only manufacturing costs',
      'Only customer pricing'
    ],
    correctAnswer: 1,
    explanation: 'Transfer pricing determines how transactions between organizational units are priced, affecting divisional profits and potentially taxes across jurisdictions.',
    topic: 'Financial Management',
    subtopic: 'Management Accounting'
  },
  {
    id: 'CIA3-148',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Treasury management includes:',
    options: [
      'Only payroll processing',
      'Cash management, investments, and funding strategies',
      'Only accounts payable',
      'Only financial reporting'
    ],
    correctAnswer: 1,
    explanation: 'Treasury management encompasses cash and liquidity management, short-term investments, banking relationships, and financing activities.',
    topic: 'Financial Management',
    subtopic: 'Treasury'
  },
  {
    id: 'CIA3-149',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Cash flow from operations in the statement of cash flows:',
    options: [
      'Includes capital expenditures',
      'Shows cash generated from core business activities',
      'Includes dividend payments',
      'Shows financing activities only'
    ],
    correctAnswer: 1,
    explanation: 'Operating cash flow reflects cash generated from or used in core business operations, derived from the income statement with working capital adjustments.',
    topic: 'Financial Management',
    subtopic: 'Financial Statements'
  },
  {
    id: 'CIA3-150',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'EBITDA stands for:',
    options: [
      'Earnings Before Investment, Taxes, Depreciation, Amortization',
      'Earnings Before Interest, Taxes, Depreciation, and Amortization',
      'Expense Budget Including Taxes, Deductions, Allowances',
      'Economic Baseline Internal Tax Determination Amount'
    ],
    correctAnswer: 1,
    explanation: 'EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is a measure of operating performance excluding financing and non-cash charges.',
    topic: 'Financial Management',
    subtopic: 'Financial Metrics'
  },

  // ============================================================================
  // ADDITIONAL MIXED DOMAIN QUESTIONS
  // ============================================================================
  
  {
    id: 'CIA3-151',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Market segmentation divides:',
    options: [
      'Internal departments',
      'Customer markets into distinct groups with common needs',
      'Product costs',
      'Accounting periods'
    ],
    correctAnswer: 1,
    explanation: 'Market segmentation identifies and groups customers with similar characteristics, needs, or behaviors to enable targeted marketing strategies.',
    topic: 'Business Acumen',
    subtopic: 'Marketing'
  },
  {
    id: 'CIA3-152',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Pricing strategies like penetration pricing typically:',
    options: [
      'Set highest possible prices',
      'Set low initial prices to gain market share',
      'Match competitor prices exactly',
      'Ignore market conditions'
    ],
    correctAnswer: 1,
    explanation: 'Penetration pricing uses low initial prices to gain market share quickly, potentially raising prices after establishing market position.',
    topic: 'Business Acumen',
    subtopic: 'Pricing'
  },
  {
    id: 'CIA3-153',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Contract risk management includes:',
    options: [
      'Only price negotiations',
      'Identifying and addressing risks in contractual terms and obligations',
      'Only vendor selection',
      'Only payment terms'
    ],
    correctAnswer: 1,
    explanation: 'Contract risk management evaluates terms, obligations, liability provisions, termination rights, and other elements affecting organizational risk.',
    topic: 'Business Acumen',
    subtopic: 'Procurement'
  },
  {
    id: 'CIA3-154',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Economic order quantity (EOQ) balances:',
    options: [
      'Revenue and expense',
      'Ordering costs and carrying costs for inventory',
      'Sales and marketing',
      'Fixed and variable costs'
    ],
    correctAnswer: 1,
    explanation: 'EOQ calculates the optimal order quantity that minimizes total inventory costs by balancing ordering costs against carrying/holding costs.',
    topic: 'Business Acumen',
    subtopic: 'Inventory Management'
  },
  {
    id: 'CIA3-155',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Just-in-time (JIT) inventory management:',
    options: [
      'Maximizes inventory levels',
      'Minimizes inventory by receiving goods only when needed for production',
      'Eliminates quality control',
      'Requires large safety stocks'
    ],
    correctAnswer: 1,
    explanation: 'JIT minimizes inventory by coordinating deliveries to arrive exactly when needed, reducing carrying costs but requiring reliable suppliers.',
    topic: 'Business Acumen',
    subtopic: 'Operations Management'
  },
  {
    id: 'CIA3-156',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Digital transformation involves:',
    options: [
      'Only adopting social media',
      'Fundamental business changes leveraging digital technologies',
      'Only upgrading hardware',
      'Only implementing cloud services'
    ],
    correctAnswer: 1,
    explanation: 'Digital transformation is the integration of digital technology into all business areas, fundamentally changing how organizations operate and deliver value.',
    topic: 'Business Acumen',
    subtopic: 'Digital Strategy'
  },
  {
    id: 'CIA3-157',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Privacy regulations like GDPR require:',
    options: [
      'Only U.S. compliance',
      'Lawful processing, consent, and data subject rights',
      'Unlimited data retention',
      'No breach notification'
    ],
    correctAnswer: 1,
    explanation: 'GDPR and similar regulations require lawful basis for processing, explicit consent for certain uses, data subject rights, and breach notification.',
    topic: 'Information Security',
    subtopic: 'Privacy Regulations'
  },
  {
    id: 'CIA3-158',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Network segmentation enhances security by:',
    options: [
      'Connecting all systems together',
      'Dividing networks to contain breaches and control traffic flow',
      'Eliminating firewalls',
      'Removing access controls'
    ],
    correctAnswer: 1,
    explanation: 'Network segmentation divides the network into zones, limiting lateral movement if one area is compromised and enabling targeted security controls.',
    topic: 'Information Security',
    subtopic: 'Network Security'
  },
  {
    id: 'CIA3-159',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Business intelligence systems provide:',
    options: [
      'Only transaction processing',
      'Analytical capabilities for data-driven decision making',
      'Only operational reports',
      'Only financial statements'
    ],
    correctAnswer: 1,
    explanation: 'BI systems collect, integrate, and analyze data to provide insights, dashboards, and analytics supporting informed business decisions.',
    topic: 'Information Technology',
    subtopic: 'Data Analytics'
  },
  {
    id: 'CIA3-160',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Machine learning differs from traditional programming in that:',
    options: [
      'It requires no data',
      'Systems learn patterns from data rather than following explicit instructions',
      'It only works for simple tasks',
      'It produces identical results each time'
    ],
    correctAnswer: 1,
    explanation: 'Machine learning systems learn from data to recognize patterns and make predictions, rather than following explicitly programmed rules.',
    topic: 'Information Technology',
    subtopic: 'Artificial Intelligence'
  },
  {
    id: 'CIA3-161',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Enterprise resource planning (ERP) systems:',
    options: [
      'Only handle accounting',
      'Integrate core business processes across the organization',
      'Only manage inventory',
      'Only support manufacturing'
    ],
    correctAnswer: 1,
    explanation: 'ERP systems integrate core business functions (finance, HR, manufacturing, supply chain) into a unified platform with shared data.',
    topic: 'Information Technology',
    subtopic: 'Enterprise Systems'
  },
  {
    id: 'CIA3-162',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Data warehousing:',
    options: [
      'Stores only transactional data',
      'Consolidates data from multiple sources for reporting and analysis',
      'Replaces operational systems',
      'Only stores financial data'
    ],
    correctAnswer: 1,
    explanation: 'Data warehouses consolidate data from various sources into a central repository optimized for reporting, analytics, and business intelligence.',
    topic: 'Information Technology',
    subtopic: 'Data Management'
  },
  {
    id: 'CIA3-163',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Operating leverage is high when:',
    options: [
      'Variable costs are predominant',
      'Fixed costs represent a large portion of total costs',
      'Debt levels are high',
      'Interest expense is significant'
    ],
    correctAnswer: 1,
    explanation: 'High operating leverage means fixed costs are a large portion of total costs; changes in revenue produce amplified changes in operating income.',
    topic: 'Financial Management',
    subtopic: 'Cost Structure'
  },
  {
    id: 'CIA3-164',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Financial leverage refers to:',
    options: [
      'Use of fixed assets',
      'Use of debt financing to amplify returns (and risks)',
      'Operating efficiency',
      'Inventory turnover'
    ],
    correctAnswer: 1,
    explanation: 'Financial leverage is the use of debt to increase potential returns to equity holders, while also increasing risk if returns fall below debt costs.',
    topic: 'Financial Management',
    subtopic: 'Capital Structure'
  },
  {
    id: 'CIA3-165',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Foreign exchange risk arises from:',
    options: [
      'Only domestic transactions',
      'Fluctuations in currency exchange rates affecting international operations',
      'Only interest rate changes',
      'Only credit decisions'
    ],
    correctAnswer: 1,
    explanation: 'Foreign exchange risk is the potential for losses due to changes in exchange rates affecting the value of international transactions, assets, or liabilities.',
    topic: 'Financial Management',
    subtopic: 'Financial Risk'
  },
  {
    id: 'CIA3-166',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Hedging strategies are used to:',
    options: [
      'Increase speculative risk',
      'Reduce exposure to adverse price movements',
      'Maximize trading profits',
      'Avoid all risk'
    ],
    correctAnswer: 1,
    explanation: 'Hedging uses financial instruments to offset potential losses from adverse price movements in currencies, commodities, or interest rates.',
    topic: 'Financial Management',
    subtopic: 'Financial Risk Management'
  },
  {
    id: 'CIA3-167',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Goodwill impairment testing assesses:',
    options: [
      'Only depreciation schedules',
      'Whether the carrying value of goodwill exceeds its recoverable value',
      'Only physical assets',
      'Only accounts receivable'
    ],
    correctAnswer: 1,
    explanation: 'Goodwill impairment testing determines whether goodwill recorded from acquisitions has declined in value and requires write-down.',
    topic: 'Financial Management',
    subtopic: 'Financial Reporting'
  },
  {
    id: 'CIA3-168',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Revenue recognition under modern accounting standards requires:',
    options: [
      'Immediate recognition of all contracts',
      'Recognizing revenue when performance obligations are satisfied',
      'Cash basis recognition only',
      'Recognition when contracts are signed'
    ],
    correctAnswer: 1,
    explanation: 'Revenue recognition standards require identifying performance obligations and recognizing revenue as (or when) those obligations are satisfied.',
    topic: 'Financial Management',
    subtopic: 'Financial Reporting'
  },
  {
    id: 'CIA3-169',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Audit committee responsibilities typically include:',
    options: [
      'Day-to-day operations management',
      'Overseeing financial reporting, internal controls, and audit activities',
      'Only human resources',
      'Only marketing strategies'
    ],
    correctAnswer: 1,
    explanation: 'Audit committees oversee financial reporting integrity, internal controls, internal and external audit functions, and related risk management.',
    topic: 'Business Acumen',
    subtopic: 'Corporate Governance'
  },
  {
    id: 'CIA3-170',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'easy',
    question: 'Environmental, Social, and Governance (ESG) factors:',
    options: [
      'Only apply to environmental companies',
      'Are increasingly important in investment and business decisions',
      'Have no regulatory implications',
      'Only concern shareholders'
    ],
    correctAnswer: 1,
    explanation: 'ESG factors are increasingly important to investors, regulators, and stakeholders in evaluating organizational sustainability and ethical practices.',
    topic: 'Business Acumen',
    subtopic: 'Sustainability'
  },
];

export default CIA3_QUESTIONS_BATCH2;
