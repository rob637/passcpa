// ISC Depth Questions - Batch 4
// Focus: Rounding out all blueprint areas, more easy/medium questions,
// SOX IT compliance, cloud audit, network protocols, cryptography depth

import { Question } from '../../../types';

export const ISC_QUESTIONS_DEPTH_4: Question[] = [
  // ==========================================
  // ISC-V: SOX IT CONTROLS
  // ==========================================
  {
    id: 'isc-d4-001',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-V',
    topicId: 'isc-sox',
    topic: 'SOX Compliance',
    subtopic: 'IT Controls in SOX',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under Section 404 of the Sarbanes-Oxley Act, management\'s assessment of internal control over financial reporting (ICFR) must include evaluation of:',
    options: [
      'Only controls over revenue recognition',
      'Both manual and automated (IT) controls that are relevant to financial reporting',
      'Only manual controls',
      'IT controls only for publicly traded technology companies',
    ],
    correctAnswer: 1,
    explanation: 'SOX Section 404 requires assessment of all controls relevant to ICFR, including IT controls. Key IT control areas: (1) IT General Controls (ITGCs) — access, change management, operations, development, (2) automated application controls — system-enforced validations, calculations, segregation of duties, (3) IT-dependent manual controls — reports used by management for review, (4) end-user computing controls — spreadsheets used in financial reporting. PCAOB AS 2201 provides guidance for auditors.',
    reference: 'SOX §404; PCAOB AS 2201',
  },
  {
    id: 'isc-d4-002',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-V',
    topicId: 'isc-sox',
    topic: 'SOX Compliance',
    subtopic: 'Key Reports',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An IT-dependent manual control is a control where:',
    options: [
      'The entire control is automated',
      'Management relies on system-generated reports or data to perform a manual review or investigation',
      'The control is performed by the IT department only',
      'No technology is involved',
    ],
    correctAnswer: 1,
    explanation: 'IT-dependent manual controls combine automated and manual elements: the system generates a report (e.g., aging report, exception report, reconciliation), and a person reviews it and takes action. For the control to be effective, BOTH the report integrity AND the manual review must be tested. Auditors must verify: (1) the report is accurate and complete (ITGCs support this), (2) the reviewer is competent and independent, (3) evidence of the review (sign-off, documentation of actions taken).',
    reference: 'PCAOB AS 2201.B1-B4',
  },

  // ==========================================
  // ISC-II: CRYPTOGRAPHY
  // ==========================================
  {
    id: 'isc-d4-003',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-II',
    topicId: 'isc-crypto',
    topic: 'Cryptography',
    subtopic: 'Symmetric vs Asymmetric',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The key difference between symmetric and asymmetric encryption is:',
    options: [
      'Symmetric uses one shared key for encrypt/decrypt; asymmetric uses a public-private key pair',
      'Symmetric encryption is always more secure',
      'Symmetric encryption requires a certificate authority',
      'Asymmetric encryption is faster than symmetric',
    ],
    correctAnswer: 0,
    explanation: 'Symmetric encryption (AES, 3DES): single shared key, fast, used for bulk data encryption. Challenge: secure key distribution. Asymmetric encryption (RSA, ECC): public key (encrypt/verify) and private key (decrypt/sign), slower, solves key distribution problem. In practice, TLS uses both: asymmetric to exchange a session key, then symmetric for data transfer (hybrid approach). Digital signatures use asymmetric: sign with private key, verify with public key.',
    reference: 'NIST SP 800-175B Rev. 1',
  },
  {
    id: 'isc-d4-004',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-II',
    topicId: 'isc-crypto',
    topic: 'Cryptography',
    subtopic: 'Hashing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A cryptographic hash function (such as SHA-256) takes input data and produces:',
    options: [
      'A public-private key pair',
      'An encrypted version of the original data that can be decrypted',
      'A fixed-length output (digest) that is computationally infeasible to reverse, used for integrity verification',
      'A compressed version of the file',
    ],
    correctAnswer: 2,
    explanation: 'Hash functions: (1) produce fixed-length output regardless of input size (SHA-256 always produces 256 bits), (2) are one-way — cannot derive the original input from the hash, (3) are deterministic — same input always produces same hash, (4) are collision-resistant — extremely difficult to find two inputs with the same hash. Uses in IT: password storage, digital signatures, data integrity verification, blockchain, file fingerprinting. MD5 and SHA-1 are deprecated; SHA-256+ is current standard.',
    reference: 'NIST FIPS 180-4',
  },
  {
    id: 'isc-d4-005',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-II',
    topicId: 'isc-crypto',
    topic: 'Cryptography',
    subtopic: 'Digital Certificates',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A digital certificate (X.509) issued by a Certificate Authority (CA) binds:',
    options: [
      'A username to a password',
      'An IP address to a MAC address',
      'An entity\'s identity to its public key, enabling trusted encrypted communications',
      'Two private keys together',
    ],
    correctAnswer: 2,
    explanation: 'Digital certificates (X.509): (1) issued by a trusted Certificate Authority (CA), (2) bind an entity\'s identity to its public key, (3) enable TLS/SSL encrypted web traffic (HTTPS), (4) support digital signatures for email (S/MIME) and documents, (5) have expiration dates and can be revoked (CRL/OCSP). The CA hierarchy: Root CA → Intermediate CA → End-entity certificate. Certificate pinning and Certificate Transparency logs help prevent fraudulent certificates.',
    reference: 'NIST SP 800-57 Part 1',
  },

  // ==========================================
  // ISC-III: SOFTWARE LICENSING & COMPLIANCE
  // ==========================================
  {
    id: 'isc-d4-006',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-III',
    topicId: 'isc-compliance',
    topic: 'Software Asset Management',
    subtopic: 'License Compliance',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Software asset management (SAM) helps organizations:',
    options: [
      'Write better software code',
      'Replace all commercial software with open source',
      'Track software licenses to ensure compliance, optimize costs, and reduce security risks from unauthorized software',
      'Increase internet bandwidth',
    ],
    correctAnswer: 2,
    explanation: 'SAM addresses: (1) compliance — avoid license violations and resulting penalties/legal action, (2) cost optimization — identify unused licenses, renegotiate, eliminate shelfware, (3) security — unauthorized software may be unpatched or malicious, (4) audit readiness — maintain evidence for vendor audits, (5) planning — forecast license needs for growth. ISO 19770 provides the SAM standard. Software audits by vendors (Microsoft, Oracle, SAP) can result in significant financial penalties.',
    reference: 'ISO 19770; ITIL SAM',
  },

  // ==========================================
  // ISC-IV: AUTOMATION & PROCESS
  // ==========================================
  {
    id: 'isc-d4-007',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-IV',
    topicId: 'isc-automation',
    topic: 'Process Automation',
    subtopic: 'Straight-Through Processing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Straight-through processing (STP) in financial services refers to:',
    options: [
      'Fully automated processing of a transaction from initiation through settlement without manual intervention',
      'Using a single vendor for all processing',
      'Manual processing of all transactions',
      'Processing transactions only during business hours',
    ],
    correctAnswer: 0,
    explanation: 'STP automates the complete transaction lifecycle: (1) order capture, (2) validation, (3) matching, (4) confirmation, (5) settlement — all without manual rekeying or intervention. Benefits: reduced errors, faster processing, lower costs, real-time settlement. Risks/controls: (1) automated controls must be properly designed and tested, (2) exception handling for transactions that fail automated rules, (3) reconciliation controls to verify completeness, (4) monitoring dashboards for processing status.',
    reference: 'ISACA COBIT 2019 DSS06',
  },

  // ==========================================
  // ISC-I: NETWORK FUNDAMENTALS
  // ==========================================
  {
    id: 'isc-d4-008',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-I',
    topicId: 'isc-network',
    topic: 'Network Architecture',
    subtopic: 'VPN',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A Virtual Private Network (VPN) provides security by:',
    options: [
      'Creating an encrypted tunnel between a remote device and the corporate network',
      'Eliminating the need for firewalls',
      'Replacing the need for internet service providers',
      'Increasing internet speed',
    ],
    correctAnswer: 0,
    explanation: 'VPNs create encrypted tunnels over public networks (internet) providing: (1) confidentiality — data encrypted in transit, (2) integrity — tamper detection, (3) authentication — verifies user/device identity, (4) remote access — secure connection for remote workers. Types: site-to-site (connecting offices) and remote access (individual user to network). Protocols: IPsec, SSL/TLS, WireGuard. VPN is a compensating control when users access corporate resources from untrusted networks.',
    reference: 'NIST SP 800-77 Rev. 1',
  },

  // ==========================================
  // ISC-II: ACCESS CONTROL DEPTH
  // ==========================================
  {
    id: 'isc-d4-009',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-II',
    topicId: 'isc-access',
    topic: 'Access Control',
    subtopic: 'Least Privilege',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The principle of least privilege requires that:',
    options: [
      'All users receive maximum access to perform any task',
      'Users are granted only the minimum access rights necessary to perform their job functions',
      'Users have no access to any systems',
      'Only managers have system access',
    ],
    correctAnswer: 1,
    explanation: 'Least privilege is a foundational security principle: (1) users receive minimum access needed for their job function — no more, (2) admin/root access is granted only when required, (3) privileges are reviewed periodically and removed when no longer needed, (4) temporary elevated access follows just-in-time (JIT) protocols, (5) service accounts follow least privilege for automated processes. Violations increase the blast radius of account compromise and create segregation of duties risks.',
    reference: 'NIST SP 800-53 AC-6',
  },
  {
    id: 'isc-d4-010',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-II',
    topicId: 'isc-access',
    topic: 'Access Control',
    subtopic: 'User Access Reviews',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Periodic user access reviews (recertification) are important because they:',
    options: [
      'Replace the need for password changes',
      'Detect and remediate access creep — excessive permissions accumulated over time from role changes and transfers',
      'Are a one-time activity during system implementation',
      'Allow users to request new access',
    ],
    correctAnswer: 1,
    explanation: 'Access reviews detect: (1) access creep — permissions accumulated from role changes without removing old access, (2) orphaned accounts — active accounts for terminated employees, (3) segregation of duty violations — conflicting access combinations, (4) excessive privileged access. Best practices: quarterly for critical systems/privileged access, semi-annually for standard access, automated recertification tools, management attestation (not just IT-generated reports), evidence of review and remediation.',
    reference: 'NIST SP 800-53 AC-2; SOX ITGC Guidance',
  },

  // ==========================================
  // ISC-VI: CLOUD AUDIT
  // ==========================================
  {
    id: 'isc-d4-011',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-VI',
    topicId: 'isc-cloud',
    topic: 'Cloud Computing',
    subtopic: 'Cloud Audit Considerations',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When auditing a client\'s cloud computing environment, the auditor should evaluate:',
    options: [
      'The cloud provider\'s SOC report, the shared responsibility model, data residency, and the client\'s cloud configuration and access controls',
      'Only the client\'s on-premises systems',
      'Nothing — cloud providers are responsible for all controls',
      'Only the cloud provider\'s financial statements',
    ],
    correctAnswer: 0,
    explanation: 'Cloud audit considerations: (1) SOC reports — evaluate the provider\'s control environment (SOC 2 Type II preferred), (2) shared responsibility — understand which controls are the client\'s responsibility, (3) data residency — ensure compliance with regulations on data location, (4) configuration — misconfigurations (public S3 buckets, open ports) are a leading cause of cloud breaches, (5) identity/access management — cloud IAM policies, (6) encryption — in transit and at rest, (7) data portability — vendor lock-in risks, (8) incident notification — contractual SLAs.',
    reference: 'ISACA Cloud Audit Framework; CSA STAR',
  },

  // ==========================================
  // ISC-III: PROJECT MANAGEMENT
  // ==========================================
  {
    id: 'isc-d4-012',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-III',
    topicId: 'isc-project',
    topic: 'IT Project Management',
    subtopic: 'Project Governance',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'IT project governance controls should include:',
    options: [
      'Steering committee oversight, defined milestones, budget tracking, quality assurance, and post-implementation review',
      'No oversight — developers should work independently',
      'Daily meetings with every employee in the organization',
      'Only budget tracking',
    ],
    correctAnswer: 0,
    explanation: 'IT project governance: (1) steering committee — executive oversight of scope, budget, timeline, (2) project charter — defines objectives, scope, authority, (3) milestone reviews — go/no-go decisions at key points, (4) budget and resource management, (5) risk management — identify and mitigate project risks, (6) quality assurance — testing, code review, UAT, (7) change management — formal process for scope changes, (8) post-implementation review (PIR) — evaluate outcomes vs. objectives. Projects without governance are prone to scope creep, cost overruns, and failure.',
    reference: 'COBIT 2019 BAI01; PMBOK',
  },

  // ==========================================
  // ISC-IV: REGULATORY & ETHICS
  // ==========================================
  {
    id: 'isc-d4-013',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-IV',
    topicId: 'isc-regulatory',
    topic: 'Regulatory Compliance',
    subtopic: 'HIPAA',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The HIPAA Security Rule requires covered entities to implement which types of safeguards for electronic protected health information (ePHI)?',
    options: [
      'Physical safeguards only',
      'Administrative, physical, and technical safeguards',
      'Financial safeguards only',
      'Technical safeguards only',
    ],
    correctAnswer: 1,
    explanation: 'HIPAA Security Rule requires three categories of safeguards: (1) Administrative — risk analysis, workforce training, contingency planning, business associate agreements, security management process, (2) Physical — facility access controls, workstation/device security, disposal procedures, (3) Technical — access controls, audit controls, integrity controls, transmission security (encryption). Many specifications are "addressable" (must implement or document why an alternative is equally effective) rather than "required."',
    reference: '45 CFR Part 164 Subpart C',
  },
  {
    id: 'isc-d4-014',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-IV',
    topicId: 'isc-privacy',
    topic: 'Data Privacy',
    subtopic: 'CCPA/CPRA',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The California Consumer Privacy Act (CCPA/CPRA) gives California residents the right to:',
    options: [
      'Access, delete, and opt out of the sale/sharing of their personal information, and not be discriminated against for exercising these rights',
      'Transfer their data to any country without restriction',
      'Free access to all services',
      'Unlimited data storage at no cost',
    ],
    correctAnswer: 0,
    explanation: 'CCPA/CPRA consumer rights: (1) Right to know — what data is collected, used, shared, (2) Right to delete — request deletion of personal information, (3) Right to opt out — of sale or sharing of personal information, (4) Right to non-discrimination — equal service regardless of exercising rights, (5) Right to correct — inaccurate personal information (CPRA addition), (6) Right to limit — use of sensitive personal information (CPRA). Applies to businesses meeting revenue, data volume, or revenue-from-data thresholds.',
    reference: 'Cal. Civ. Code §1798.100-199',
  },

  // ==========================================
  // ISC-I: SYSTEM ARCHITECTURE  
  // ==========================================
  {
    id: 'isc-d4-015',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-I',
    topicId: 'isc-systems',
    topic: 'Systems Architecture',
    subtopic: 'Middleware',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Middleware in an enterprise IT architecture serves as:',
    options: [
      'A type of antivirus software',
      'The physical server hardware',
      'Software that connects different applications, databases, and services, enabling them to communicate and exchange data',
      'The end-user interface',
    ],
    correctAnswer: 2,
    explanation: 'Middleware provides the "plumbing" between applications: (1) message queues (MQ) — asynchronous communication between systems, (2) application servers — host business logic, (3) API gateways — manage API calls, (4) enterprise service bus (ESB) — integrate disparate systems, (5) integration platforms (iPaaS) — cloud-based integration. Audit considerations: access controls over middleware, logging of inter-system transactions, data transformation accuracy, and availability/failover.',
    reference: 'ISACA COBIT 2019 BAI03',
  },

  // ==========================================
  // ISC-III: VENDOR MANAGEMENT
  // ==========================================
  {
    id: 'isc-d4-016',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-III',
    topicId: 'isc-vendor',
    topic: 'Third-Party Risk Management',
    subtopic: 'Vendor Due Diligence',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A comprehensive third-party risk management program should include:',
    options: [
      'Initial due diligence, ongoing monitoring, contractual requirements (including audit rights and SLAs), and exit planning',
      'Only assessing price and service level',
      'A one-time vendor assessment at contract signing',
      'Relying entirely on the vendor\'s marketing materials',
    ],
    correctAnswer: 0,
    explanation: 'Third-party risk management lifecycle: (1) planning — identify critical vendors and risk-rate them, (2) due diligence — assess financial stability, security posture, compliance, business continuity, (3) contracting — audit rights, SLAs, data protection, breach notification, exit terms, (4) ongoing monitoring — periodic assessments, SOC reports, performance metrics, (5) exit planning — data return/destruction, transition to alternative provider. Regulators (OCC, FDIC, SEC) increasingly focus on vendor risk.',
    reference: 'OCC Bulletin 2013-29; NIST SP 800-53 SA-9',
  },

  // ==========================================
  // ISC-II: SECURITY AWARENESS
  // ==========================================
  {
    id: 'isc-d4-017',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-II',
    topicId: 'isc-awareness',
    topic: 'Security Awareness',
    subtopic: 'Training Programs',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'An effective security awareness training program should include:',
    options: [
      'No testing or measurement of effectiveness',
      'Regular training covering current threats, social engineering, password practices, incident reporting, and role-specific topics',
      'A one-time presentation during employee onboarding only',
      'Only training for the IT department',
    ],
    correctAnswer: 1,
    explanation: 'Effective security awareness programs: (1) regular training — annual minimum, with quarterly updates for high-risk topics, (2) current content — address emerging threats (phishing campaigns, ransomware), (3) phishing simulations — test and reinforce training, (4) role-specific — IT, executives, finance get tailored content, (5) metrics — track completion rates, phishing simulation click rates, incident reporting rates, (6) multiple formats — e-learning, videos, posters, lunch-and-learns. Required by many frameworks (SOX, HIPAA, PCI-DSS, GLBA).',
    reference: 'NIST SP 800-50; CIS Controls v8 Control 14',
  },

  // ==========================================
  // ISC-V: ASSURANCE & REPORTING
  // ==========================================
  {
    id: 'isc-d4-018',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-V',
    topicId: 'isc-assurance',
    topic: 'IT Assurance',
    subtopic: 'Penetration Testing',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A penetration test differs from a vulnerability scan in that:',
    options: [
      'They are the same thing',
      'Penetration tests actively attempt to exploit vulnerabilities to demonstrate real-world impact, while vulnerability scans only identify potential vulnerabilities',
      'Penetration tests are less thorough than vulnerability scans',
      'Vulnerability scans require more skill than penetration tests',
    ],
    correctAnswer: 1,
    explanation: 'Vulnerability scans are automated tools that identify known vulnerabilities (missing patches, misconfigurations, weak ciphers) — they produce a list but do not verify exploitability. Penetration tests are manual/semi-automated engagements where testers actively exploit vulnerabilities to demonstrate actual risk — showing data exfiltration, privilege escalation, or system compromise. Types: black box (no knowledge), gray box (partial), white box (full knowledge). PCI-DSS and many regulations require both.',
    reference: 'NIST SP 800-115; PCI-DSS Requirement 11.3',
  },

  // ==========================================
  // ISC-I: OPERATING SYSTEMS & PLATFORMS
  // ==========================================
  {
    id: 'isc-d4-019',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-I',
    topicId: 'isc-systems',
    topic: 'Operating Systems',
    subtopic: 'System Hardening',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'System hardening involves:',
    options: [
      'Reducing the attack surface by removing unnecessary services, applying patches, configuring security settings, and disabling default accounts',
      'Adding more software to a server',
      'Increasing CPU speed',
      'Making hardware physically harder to access',
    ],
    correctAnswer: 0,
    explanation: 'System hardening reduces vulnerability: (1) remove unnecessary software, services, and protocols, (2) apply security patches promptly, (3) disable or rename default accounts and change default passwords, (4) configure security settings per benchmarks (CIS Benchmarks, DISA STIGs), (5) implement host-based firewalls, (6) enable logging and auditing, (7) use configuration management tools for consistency. Hardened configurations should be baselined and monitored for drift. Applies to servers, workstations, network devices, and databases.',
    reference: 'CIS Benchmarks; NIST SP 800-123',
  },

  // ==========================================
  // ISC-IV: EMERGING ANALYTICS
  // ==========================================
  {
    id: 'isc-d4-020',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-IV',
    topicId: 'isc-data-analytics',
    topic: 'Data Analytics',
    subtopic: 'Text Mining in Audit',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Natural language processing (NLP) and text mining in auditing can be used to:',
    options: [
      'Replace the entire audit team',
      'Analyze unstructured data such as contracts, emails, and disclosures to identify risks, anomalies, and compliance issues',
      'Create financial statements automatically',
      'Only process numerical data',
    ],
    correctAnswer: 1,
    explanation: 'NLP/text mining audit applications: (1) contract analysis — extract key terms, expiration dates, unusual clauses, (2) journal entry analysis — review descriptions for unusual patterns, (3) compliance monitoring — analyze communications for regulatory violations, (4) disclosure analysis — compare financial statement disclosures to industry norms, (5) sentiment analysis — assess management tone in MD&A and earnings calls, (6) fraud detection — identify suspicious language patterns. Auditors must understand limitations including context sensitivity and false positives.',
    reference: 'AICPA Audit Data Analytics Guide',
  },

  // ==========================================
  // ISC-VI: DEVOPS & CICD
  // ==========================================
  {
    id: 'isc-d4-021',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-VI',
    topicId: 'isc-devops',
    topic: 'DevOps',
    subtopic: 'CI/CD Security',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'In a CI/CD (Continuous Integration/Continuous Deployment) pipeline, security controls (DevSecOps) should include:',
    options: [
      'No security testing — speed is the priority',
      'Automated security scanning at each stage: static analysis, dependency checks, container scanning, and dynamic testing before deployment',
      'Security testing only in the production environment',
      'Manual code review of every line before each deployment',
    ],
    correctAnswer: 1,
    explanation: 'DevSecOps integrates security throughout the CI/CD pipeline: (1) pre-commit — IDE security plugins, (2) build — Static Application Security Testing (SAST), dependency vulnerability scanning (SCA), (3) test — Dynamic Application Security Testing (DAST), container image scanning, (4) deploy — Infrastructure as Code (IaC) scanning, secrets management, (5) operate — runtime application self-protection (RASP), monitoring. "Shift left" — find vulnerabilities early when they are cheaper to fix.',
    reference: 'OWASP DevSecOps; NIST SP 800-218',
  },

  // ==========================================
  // ISC-III: IT SERVICE MANAGEMENT
  // ==========================================
  {
    id: 'isc-d4-022',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-III',
    topicId: 'isc-itsm',
    topic: 'IT Service Management',
    subtopic: 'ITIL Service Desk',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The primary purpose of an IT service desk (help desk) in the context of IT controls is to:',
    options: [
      'Serve as a single point of contact for incident management, service requests, and communication between IT and users',
      'Develop new software applications',
      'Conduct employee performance reviews',
      'Manage the organization\'s finances',
    ],
    correctAnswer: 0,
    explanation: 'The service desk is essential for IT governance: (1) incident management — log, classify, prioritize, and resolve IT issues, (2) service request fulfillment — handle access requests, equipment provisioning, (3) escalation — route complex issues to appropriate teams, (4) communication — notify users of outages and updates, (5) tracking and trending — identify recurring problems for root cause analysis (problem management). Audit evidence: incident logs demonstrate monitoring and response capabilities.',
    reference: 'ITIL 4; COBIT 2019 DSS02',
  },

  // ==========================================
  // ISC-II: LOGGING & MONITORING
  // ==========================================
  {
    id: 'isc-d4-023',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-II',
    topicId: 'isc-monitoring',
    topic: 'Security Monitoring',
    subtopic: 'Audit Logging',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Security audit logs should capture, at minimum:',
    options: [
      'Only system errors',
      'Only failed login attempts',
      'Who performed an action, what action was performed, when it occurred, where it originated, and the outcome (success/failure)',
      'Only the date and time',
    ],
    correctAnswer: 2,
    explanation: 'Audit log requirements: (1) Who — user identity, (2) What — action performed (read, modify, delete, execute), (3) When — timestamp (synchronized via NTP), (4) Where — source IP/location, system/application, (5) Outcome — success or failure. Additional best practices: log integrity protection (write-once, tamper-evident), centralized log management, retention per policy (typically 1-7 years), regular review, alerting on critical events. Logs should not contain sensitive data (passwords, PII) in plain text.',
    reference: 'NIST SP 800-92; NIST SP 800-53 AU Family',
  },

  // ==========================================
  // ISC-I: SYSTEM AVAILABILITY
  // ==========================================
  {
    id: 'isc-d4-024',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-I',
    topicId: 'isc-availability',
    topic: 'System Availability',
    subtopic: 'High Availability',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'High availability (HA) is typically achieved through:',
    options: [
      'Running a single server with maximum processing power',
      'Having a cold site for disaster recovery',
      'Redundancy, failover, clustering, and load balancing to minimize downtime',
      'Backing up data once per week',
    ],
    correctAnswer: 2,
    explanation: 'High availability strategies: (1) redundancy — duplicate components (servers, storage, network paths, power supplies), (2) failover — automatic switching to standby systems upon failure, (3) clustering — multiple servers acting as one logical system, (4) load balancing — distributing traffic across multiple servers, (5) geographic distribution — multiple data centers. HA is measured in "nines": 99.9% (8.76 hrs/year downtime), 99.99% (52.6 min), 99.999% (5.26 min). SLAs define HA requirements.',
    reference: 'NIST SP 800-34; ISO 27001 A.17',
  },

  // ==========================================
  // ISC-V: INTERNAL AUDIT OF IT
  // ==========================================
  {
    id: 'isc-d4-025',
    section: 'ISC',
    courseId: 'cpa',
    blueprintArea: 'ISC-V',
    topicId: 'isc-internal-audit',
    topic: 'IT Assurance',
    subtopic: 'ISACA Standards',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'According to ISACA standards, an IS auditor\'s primary objective when evaluating IT controls is to:',
    options: [
      'Implement new security controls',
      'Replace the IT department\'s role',
      'Provide reasonable assurance that IT controls adequately protect information assets, maintain data integrity, and support organizational objectives',
      'Write application code',
    ],
    correctAnswer: 2,
    explanation: 'IS audit objectives: (1) evaluate adequacy and effectiveness of IT controls, (2) ensure information assets are adequately safeguarded, (3) verify data integrity and reliability, (4) evaluate compliance with policies, standards, and regulations, (5) assess IT efficiency and effectiveness in supporting business objectives. ISACA\'s IT Audit and Assurance Standards (ITAF) provide mandatory requirements, guidelines, and tools. IS auditors must maintain independence, objectivity, and due professional care.',
    reference: 'ISACA ITAF; IS Audit Standards',
  },
];
