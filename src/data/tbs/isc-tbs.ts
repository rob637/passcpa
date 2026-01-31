// ISC - Information Systems and Controls TBS
// Task-Based Simulations for ISC Section
// Covers: Information Systems, Data Management, Security, SOC Engagements

import { TBS, TBS_TYPES } from '../../types';

export const ISC_TBS: TBS[] = [
  // =========================================================================
  // AREA I: Information Systems and Data Management (30-40%)
  // =========================================================================
  {
    id: 'isc-tbs-001',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Database Design and Normalization Assessment',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Database Management',
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-A-2',
    scenario: `
You are reviewing a database design for a new accounting information system. The client has presented the following table structure for their sales transaction system:

TABLE: SalesTransactions
| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| TransactionID | INT | Primary Key |
| TransactionDate | DATE | Date of sale |
| CustomerID | INT | Customer identifier |
| CustomerName | VARCHAR(100) | Customer name |
| CustomerAddress | VARCHAR(200) | Customer address |
| CustomerCity | VARCHAR(50) | City |
| CustomerState | VARCHAR(2) | State |
| CustomerZip | VARCHAR(10) | ZIP code |
| ProductID | INT | Product identifier |
| ProductName | VARCHAR(100) | Product name |
| ProductCategory | VARCHAR(50) | Category |
| ProductUnitPrice | DECIMAL | Standard price |
| QuantitySold | INT | Units sold |
| SalePrice | DECIMAL | Price per unit (may differ from standard) |
| TotalAmount | DECIMAL | Total sale amount |
| SalespersonID | INT | Salesperson identifier |
| SalespersonName | VARCHAR(100) | Salesperson name |
| CommissionRate | DECIMAL | Commission percentage |

The system expects 500,000+ transactions per year.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What normalization form issue is MOST apparent in this table design?',
        options: [
          'Violation of First Normal Form (1NF) - repeating groups',
          'Violation of Second Normal Form (2NF) - partial dependencies',
          'Violation of Third Normal Form (3NF) - transitive dependencies',
          'The table is properly normalized',
        ],
        correctAnswer: 2,
        explanation: 'The table has transitive dependencies: CustomerName depends on CustomerID (not TransactionID), ProductName depends on ProductID, etc. Non-key attributes depend on other non-key attributes.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Which data anomaly is MOST likely to occur with this design?',
        options: [
          'Insert anomaly - cannot add a new product without a sale',
          'Delete anomaly - deleting a customer deletes unrelated data',
          'Update anomaly - changing customer address requires multiple updates',
          'All of the above',
        ],
        correctAnswer: 3,
        explanation: 'All three anomalies can occur: Insert (can\'t add new customers/products without transactions), Delete (last transaction for a customer loses customer data), Update (customer info stored in every row).',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'How many separate tables should this design be split into for proper 3NF?',
        options: [
          '2 tables',
          '3 tables',
          '4 tables',
          '5 or more tables',
        ],
        correctAnswer: 3,
        explanation: 'Proper 3NF requires: Customers, Products, Salespersons, and SalesTransactions (with only foreign keys and transaction-specific data). Possibly ProductCategories as a 5th table.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The TotalAmount field represents a calculated value (QuantitySold × SalePrice). What is the database design recommendation?',
        options: [
          'Always store calculated values for faster retrieval',
          'Never store calculated values; always compute at runtime',
          'Evaluate trade-offs: storage cost vs. performance vs. data integrity risk',
          'Store both the calculation formula and the result',
        ],
        correctAnswer: 2,
        explanation: 'The best approach is to evaluate trade-offs. Storing calculated values can improve query performance but creates risk of inconsistency. For financial data, consider triggers or views.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Which database feature would help prevent TotalAmount from becoming inconsistent with QuantitySold × SalePrice?',
        options: [
          'Foreign key constraint',
          'Unique constraint',
          'Database trigger',
          'Primary key',
        ],
        correctAnswer: 2,
        explanation: 'A database trigger can automatically recalculate TotalAmount whenever QuantitySold or SalePrice is updated, maintaining data consistency.',
      },
    ],
    hints: [
      'Look for attributes that depend on non-key columns',
      'Consider what happens when you need to update customer information',
      'Think about entity separation: what are the distinct "things" in this data?',
    ],
    references: ['Database Normalization', 'CODD\'s Normal Forms', 'Data Integrity'],
  },
  {
    id: 'isc-tbs-002',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'IT General Controls Assessment',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'IT General Controls',
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-B-1',
    scenario: `
You are performing an IT general controls assessment for ABC Manufacturing Company. Review the following information about their IT environment:

CHANGE MANAGEMENT:
• All program changes require a change request form
• Changes are tested in development environment
• The same programmers who write code also migrate to production
• No formal change approval committee exists
• Emergency changes bypass normal procedures with verbal approval

ACCESS CONTROLS:
• New users are granted access via email request to IT
• User access reviews are performed annually
• Terminated employee access is removed within 30 days
• 15 users share a generic "Admin" account for system maintenance
• Password requirements: 6 characters, no complexity rules, never expires

OPERATIONS:
• Backups performed daily to tape, stored on-site
• No backup restoration testing has been performed
• Batch job schedules are documented
• System administrators can modify financial records

PHYSICAL SECURITY:
• Server room has keycard access limited to IT staff
• Visitor log maintained at main entrance
• Fire suppression system in server room
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which change management control weakness creates the highest risk?',
        options: [
          'No formal change approval committee',
          'Programmers migrating their own code to production',
          'Emergency changes with verbal approval',
          'Testing only in development environment',
        ],
        correctAnswer: 1,
        explanation: 'Programmers migrating their own code violates segregation of duties - a fundamental control. They could introduce unauthorized changes without detection. This is a significant control deficiency.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The 30-day termination access removal policy represents what type of risk?',
        options: [
          'Minor operational inefficiency',
          'Compliance risk only',
          'Significant unauthorized access risk',
          'Acceptable risk given industry standards',
        ],
        correctAnswer: 2,
        explanation: '30 days is excessive for termination access removal. Disgruntled former employees could access sensitive data. Best practice is same-day or next-business-day removal.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'The shared "Admin" account creates what primary control issue?',
        options: [
          'Increased system performance load',
          'Lack of individual accountability',
          'Password management complexity',
          'Too many users with access',
        ],
        correctAnswer: 1,
        explanation: 'Shared accounts eliminate individual accountability - you cannot determine WHO performed a specific action. This violates basic security principles and audit trail requirements.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The password policy (6 characters, no complexity, never expires) violates which security principle?',
        options: [
          'Defense in depth only',
          'Least privilege only',
          'Multiple security best practices including complexity and rotation',
          'Segregation of duties',
        ],
        correctAnswer: 2,
        explanation: 'The policy violates multiple best practices: minimum 8+ characters recommended, complexity requirements (upper, lower, numbers, special), and periodic rotation (60-90 days typical).',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'System administrators modifying financial records represents what control weakness?',
        options: [
          'Inadequate change management',
          'Violation of segregation of duties between IT and accounting',
          'Insufficient backup procedures',
          'Poor physical security',
        ],
        correctAnswer: 1,
        explanation: 'IT staff should not have ability to modify financial records - this violates segregation of duties. IT manages systems; accounting manages data. Combined access enables fraud.',
      },
      {
        id: 'req-6',
        type: 'multiple_choice',
        question: 'Storing backup tapes on-site without restoration testing indicates:',
        options: [
          'Adequate backup procedures',
          'Multiple deficiencies: off-site storage and restoration testing missing',
          'Only minor documentation issues',
          'Acceptable disaster recovery posture',
        ],
        correctAnswer: 1,
        explanation: 'Two major deficiencies: (1) On-site only storage means disaster could destroy both systems AND backups; (2) Untested backups may be unusable when needed.',
      },
    ],
    hints: [
      'Segregation of duties is fundamental - look for single points of failure',
      'Consider both preventive AND detective controls',
      'Individual accountability requires individual accounts',
    ],
    references: ['COBIT', 'ITGC Framework', 'SOX IT Controls'],
  },
  {
    id: 'isc-tbs-003',
    section: 'ISC',
    type: TBS_TYPES.FORM_COMPLETION,
    title: 'Data Flow Diagram Analysis',
    difficulty: 'medium',
    timeEstimate: 12,
    topic: 'Systems Analysis',
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-C-1',
    scenario: `
You are documenting the accounts payable process for a client. The process is as follows:

1. Purchase requisitions are submitted by department managers through an online portal
2. The purchasing department reviews requisitions and creates purchase orders
3. Purchase orders are sent to approved vendors electronically
4. Vendors ship goods and send invoices
5. The receiving department logs received goods in the inventory system
6. AP clerks match invoices with purchase orders and receiving reports (3-way match)
7. Matched invoices are queued for payment
8. The AP manager reviews and approves payment batches
9. The treasury department processes payments through the bank

Identify the appropriate Data Flow Diagram (DFD) elements.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'In a DFD, "Department Managers" would be represented as:',
        options: [
          'A process (circle or rectangle)',
          'An external entity (square or rectangle)',
          'A data store (open-ended rectangle)',
          'A data flow (arrow)',
        ],
        correctAnswer: 1,
        explanation: 'Department managers are external to the AP process being modeled - they interact with it but are not part of it. External entities are shown as squares.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The "3-way match" activity would be shown as:',
        options: [
          'An external entity',
          'A process',
          'A data store',
          'A data flow',
        ],
        correctAnswer: 1,
        explanation: 'The 3-way match is an activity that transforms inputs (invoice, PO, receiving report) into outputs (matched/unmatched status). Activities/transformations are processes.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'The "Inventory System" database would be represented as:',
        options: [
          'An external entity',
          'A process',
          'A data store',
          'A data flow',
        ],
        correctAnswer: 2,
        explanation: 'The inventory system stores data at rest (receiving records). Data stores are repositories that hold data for later retrieval.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'How many distinct external entities exist in this process description?',
        options: [
          '2 - Department Managers and Vendors',
          '3 - Department Managers, Vendors, and Bank',
          '4 - Including Receiving Department',
          '5 - Including AP Manager',
        ],
        correctAnswer: 1,
        explanation: 'External entities are: Department Managers (requesters), Vendors (suppliers), and Bank (payment processor). Receiving, Purchasing, AP are internal to the organization\'s process.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'The "Purchase Order" sent to vendors represents:',
        options: [
          'A process',
          'An external entity',
          'A data store',
          'A data flow',
        ],
        correctAnswer: 3,
        explanation: 'A purchase order being sent is data in motion - moving from one entity/process to another. Data flows are represented by arrows labeled with the data name.',
      },
    ],
    hints: [
      'External entities are outside the system boundary',
      'Processes transform data - they DO something',
      'Data stores hold data at rest',
      'Data flows show data in motion',
    ],
    references: ['Data Flow Diagrams', 'Systems Analysis and Design'],
  },

  // =========================================================================
  // AREA II: Security, Confidentiality, and Privacy (25-35%)
  // =========================================================================
  {
    id: 'isc-tbs-004',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Cybersecurity Framework Assessment',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Cybersecurity',
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-A-1',
    scenario: `
XYZ Financial Services is implementing a cybersecurity program aligned with the NIST Cybersecurity Framework. Review the following control implementation status:

IDENTIFY:
✓ Asset inventory maintained (hardware/software)
✓ Data classification policy exists
✗ Risk assessment not performed in 2 years
✓ Vendor risk assessment process documented

PROTECT:
✓ Multi-factor authentication for remote access
✗ No encryption on laptops
✓ Security awareness training annual
✗ No Data Loss Prevention (DLP) tools
✓ Network segmentation between departments

DETECT:
✓ Antivirus on all endpoints
✗ No Security Information and Event Management (SIEM)
✓ Intrusion detection system on perimeter
✗ No internal network monitoring
✓ Vulnerability scanning quarterly

RESPOND:
✗ Incident response plan not tested
✓ Incident response team identified
✗ No communication plan for breaches
✓ Forensics capability exists (3rd party)

RECOVER:
✓ Business continuity plan documented
✗ Disaster recovery testing not performed
✓ Backup procedures in place
✗ Recovery time objectives (RTO) not defined
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which gap represents the highest immediate risk to data confidentiality?',
        options: [
          'No SIEM implementation',
          'No laptop encryption',
          'Risk assessment not current',
          'DR testing not performed',
        ],
        correctAnswer: 1,
        explanation: 'Unencrypted laptops mean a lost or stolen device exposes all data. This is an immediate, direct confidentiality risk. The other items are important but don\'t directly expose data.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The lack of SIEM and internal network monitoring creates what gap?',
        options: [
          'Cannot identify assets',
          'Cannot prevent initial intrusion',
          'Cannot detect lateral movement of attackers',
          'Cannot recover from incidents',
        ],
        correctAnswer: 2,
        explanation: 'Perimeter detection exists, but without internal monitoring, an attacker who bypasses the perimeter can move freely inside the network without detection.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Having an untested incident response plan is equivalent to:',
        options: [
          'Having a strong incident response capability',
          'Having a moderate incident response capability',
          'Questionable incident response capability - may fail when needed',
          'No impact on incident response',
        ],
        correctAnswer: 2,
        explanation: 'Untested plans often fail during real incidents. Testing reveals gaps in procedures, communication, and coordination that only surface under pressure.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'No defined RTOs for disaster recovery indicates:',
        options: [
          'Recovery will proceed without delays',
          'Cannot measure if recovery meets business needs',
          'Technical recovery is not possible',
          'Only minor documentation gap',
        ],
        correctAnswer: 1,
        explanation: 'Without RTOs, you don\'t know how quickly you NEED to recover or whether your capability MEETS the need. Recovery might take 2 weeks when business requires 4 hours.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Which NIST Framework function has the most critical gaps overall?',
        options: [
          'Identify',
          'Protect',
          'Detect',
          'Respond',
        ],
        correctAnswer: 3,
        explanation: 'Respond has the most critical gaps: untested IR plan, no communication plan, and partial capability (forensics is outsourced). When a breach occurs, response readiness is critical.',
      },
      {
        id: 'req-6',
        type: 'multiple_choice',
        question: 'A risk assessment not performed in 2 years is problematic because:',
        options: [
          'Regulatory compliance requires annual assessment',
          'Threat landscape and business environment change rapidly',
          'It violates the NIST Framework requirements',
          'Asset inventory becomes outdated',
        ],
        correctAnswer: 1,
        explanation: 'The threat landscape evolves constantly (new attack vectors, vulnerabilities). Business changes (new systems, data, processes) create new risks. Risk assessments must be current.',
      },
    ],
    hints: [
      'Consider probability AND impact of each gap',
      'Detective controls complement preventive controls',
      'Plans without testing are theoretical only',
    ],
    references: ['NIST Cybersecurity Framework', 'COSO Framework'],
  },
  {
    id: 'isc-tbs-005',
    section: 'ISC',
    type: TBS_TYPES.MULTIPLE_CHOICE,
    title: 'Access Control and Authentication',
    difficulty: 'medium',
    timeEstimate: 12,
    topic: 'Access Controls',
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-B-2',
    scenario: `
Global Bank is implementing enhanced access controls for their core banking system. The system contains customer PII, financial transactions, and regulatory reports.

Current environment:
• 500 employees access the system
• Roles include: Tellers, Account Managers, Branch Managers, IT Admins, Auditors
• System handles $50 billion in daily transactions
• Regulatory requirements: SOX, GLBA, PCI-DSS

Proposed controls:
A. Role-Based Access Control (RBAC)
B. Multi-Factor Authentication (MFA) for all users
C. Privileged Access Management (PAM) for administrators
D. Single Sign-On (SSO) integration
E. Just-in-Time (JIT) access provisioning
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which access control principle does RBAC primarily implement?',
        options: [
          'Defense in depth',
          'Least privilege',
          'Separation of duties',
          'Need to know',
        ],
        correctAnswer: 1,
        explanation: 'RBAC implements least privilege by granting only the permissions needed for a specific role. Users get role-appropriate access, not more.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Multi-factor authentication typically combines which types of factors?',
        options: [
          'Username, password, and security question',
          'Password and PIN',
          'Something you know, have, and/or are',
          'Multiple passwords for different systems',
        ],
        correctAnswer: 2,
        explanation: 'MFA uses factors from different categories: Knowledge (password), Possession (token/phone), Biometric (fingerprint). Multiple passwords are still single-factor.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Privileged Access Management (PAM) is MOST important for:',
        options: [
          'Regular tellers',
          'External auditors',
          'IT administrators',
          'Branch managers',
        ],
        correctAnswer: 2,
        explanation: 'IT admins have elevated privileges that could compromise the entire system. PAM provides additional controls: session recording, password vaulting, just-in-time access.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Just-in-Time (JIT) access provisioning reduces risk by:',
        options: [
          'Eliminating the need for passwords',
          'Minimizing the window of elevated access',
          'Providing faster access to systems',
          'Reducing the number of users',
        ],
        correctAnswer: 1,
        explanation: 'JIT grants elevated access only when needed and automatically revokes it afterward. This reduces the attack surface by minimizing standing privileges.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Which regulatory requirement specifically mandates access logging and monitoring?',
        options: [
          'GLBA only',
          'PCI-DSS only',
          'SOX only',
          'All three: SOX, GLBA, and PCI-DSS',
        ],
        correctAnswer: 3,
        explanation: 'All three require access logging: SOX for financial controls, GLBA for customer data protection, PCI-DSS for cardholder data security. Logging is fundamental.',
      },
    ],
    hints: [
      'Consider the sensitivity of data and actions each role performs',
      'Regulatory requirements often overlap',
      'Defense in depth means multiple layers of controls',
    ],
    references: ['Access Control Models', 'NIST SP 800-53', 'PCI-DSS Requirements'],
  },
  {
    id: 'isc-tbs-006',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Privacy and Data Protection Assessment',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Privacy',
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-C-1',
    scenario: `
HealthFirst Insurance processes sensitive healthcare and financial data for 2 million members. Review their data handling practices:

DATA COLLECTION:
• Collects: Name, SSN, DOB, address, health history, claims data, credit card for premiums
• Privacy notice provided at enrollment only
• Consent obtained via checkbox on online form
• Data minimization: NOT practiced - all available data collected

DATA USE:
• Primary use: Insurance claims processing
• Secondary use: Marketing analytics (members not informed)
• Data sharing with network providers (necessary for claims)
• Data sharing with marketing partners (not disclosed)

DATA STORAGE:
• All data stored in single database
• No data classification implemented
• Retention: Indefinite (no deletion policy)
• Location: US-based cloud provider

DATA PROTECTION:
• Encryption at rest: Credit card data only
• Encryption in transit: All data
• PHI access logging: Implemented
• Annual privacy training for employees
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Sharing data with marketing partners without disclosure violates which principle?',
        options: [
          'Data minimization',
          'Purpose limitation (use only as disclosed)',
          'Storage limitation',
          'Accuracy',
        ],
        correctAnswer: 1,
        explanation: 'Purpose limitation requires that data be used only for purposes disclosed to and consented by individuals. Marketing use without disclosure violates this principle.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The indefinite retention policy violates which privacy principle?',
        options: [
          'Data minimization',
          'Purpose limitation',
          'Storage limitation',
          'Integrity',
        ],
        correctAnswer: 2,
        explanation: 'Storage limitation requires keeping data only as long as necessary for the stated purpose. Indefinite retention creates unnecessary risk and likely violates regulations.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Under HIPAA, which data handling practice is MOST concerning?',
        options: [
          'Credit card encryption only',
          'No encryption for PHI at rest',
          'Cloud storage location',
          'Annual training frequency',
        ],
        correctAnswer: 1,
        explanation: 'HIPAA requires protection of PHI. Encrypting only credit cards while leaving health data unencrypted at rest is a significant compliance gap and security risk.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The practice of collecting all available data violates:',
        options: [
          'Only HIPAA minimum necessary standard',
          'Only GDPR data minimization',
          'Both HIPAA and GDPR principles',
          'Neither - more data is always beneficial',
        ],
        correctAnswer: 2,
        explanation: 'Both HIPAA (minimum necessary) and GDPR (data minimization) require collecting only what\'s needed. Collecting "all available data" violates both.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Privacy notice "at enrollment only" is inadequate because:',
        options: [
          'Notices should be posted in offices only',
          'Practices change; updated notices should be provided',
          'HIPAA doesn\'t require privacy notices',
          'Electronic notices are not valid',
        ],
        correctAnswer: 1,
        explanation: 'Privacy practices change over time. Regulations require providing updated notices when practices change materially. One-time enrollment notice may be outdated.',
      },
      {
        id: 'req-6',
        type: 'multiple_choice',
        question: 'Storing all data in a single database without classification creates:',
        options: [
          'Better data management efficiency',
          'Reduced storage costs',
          'Inability to apply appropriate controls by sensitivity',
          'Improved query performance',
        ],
        correctAnswer: 2,
        explanation: 'Without data classification, you cannot apply different controls to different sensitivity levels. All data gets the same protection, which is either excessive or insufficient.',
      },
    ],
    hints: [
      'Consider multiple regulatory frameworks: HIPAA, GLBA, state privacy laws',
      'Privacy by design requires proactive measures',
      'Notice and consent must be ongoing, not one-time',
    ],
    references: ['HIPAA Privacy Rule', 'GDPR', 'GLBA Privacy Requirements'],
  },

  // =========================================================================
  // AREA III: SOC Engagements (25-35%)
  // =========================================================================
  {
    id: 'isc-tbs-007',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'SOC 1 vs SOC 2 Report Selection',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'SOC Reports',
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-A-1',
    scenario: `
Three service organizations are determining which SOC report to obtain:

COMPANY A - PayrollPro Inc.
• Processes payroll for 500 client companies
• Calculates wages, taxes, and deductions
• Generates paychecks and direct deposits
• Files tax returns on behalf of clients
• Clients' auditors request service organization reports annually

COMPANY B - CloudStore Solutions
• Provides data backup and storage services
• Stores financial and operational data for clients
• No financial processing or calculations
• Concerned about demonstrating security to prospective clients
• Wants report for marketing purposes

COMPANY C - MerchantPay Gateway
• Processes credit card transactions
• Subject to PCI-DSS compliance
• Handles millions of transactions daily
• Both financial auditors and security teams request reports
• High-profile clients require detailed control testing
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What type of SOC report should PayrollPro Inc. obtain?',
        options: [
          'SOC 2 Type 1',
          'SOC 2 Type 2',
          'SOC 1 Type 2',
          'SOC 3',
        ],
        correctAnswer: 2,
        explanation: 'PayrollPro processes financial transactions (payroll, taxes) that affect clients\' financial statements. SOC 1 is specifically for service organizations whose controls are relevant to user entities\' ICFR.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What type of SOC report should CloudStore Solutions obtain?',
        options: [
          'SOC 1 Type 2',
          'SOC 2 Type 2',
          'SOC 3',
          'Either SOC 2 Type 2 or SOC 3 depending on audience',
        ],
        correctAnswer: 3,
        explanation: 'CloudStore doesn\'t process financial data - SOC 2 for security. For marketing (general use), SOC 3 is appropriate as it\'s a public report. SOC 2 Type 2 for detailed assurance.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'The difference between Type 1 and Type 2 reports is:',
        options: [
          'Type 1 covers security; Type 2 covers availability',
          'Type 1 is design only; Type 2 includes operating effectiveness',
          'Type 1 is public; Type 2 is restricted',
          'Type 1 is for SOC 1; Type 2 is for SOC 2',
        ],
        correctAnswer: 1,
        explanation: 'Type 1 reports on control design at a point in time. Type 2 tests operating effectiveness over a period (usually 6-12 months). Type 2 provides more assurance.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'MerchantPay Gateway would likely need which combination?',
        options: [
          'SOC 1 only',
          'SOC 2 only',
          'Both SOC 1 and SOC 2',
          'SOC 3 only',
        ],
        correctAnswer: 2,
        explanation: 'MerchantPay handles financial transactions (SOC 1 for auditors) AND sensitive card data (SOC 2 for security). High-profile clients often require both.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Which Trust Services Criteria would be MOST relevant to CloudStore\'s SOC 2?',
        options: [
          'Processing Integrity only',
          'Security only',
          'Security and Availability',
          'Confidentiality only',
        ],
        correctAnswer: 2,
        explanation: 'As a backup/storage provider, CloudStore must ensure data is Protected (Security) and Accessible when needed (Availability). Both are critical for backup services.',
      },
      {
        id: 'req-6',
        type: 'multiple_choice',
        question: 'Who can distribute a SOC 2 Type 2 report?',
        options: [
          'Anyone - it\'s a public document',
          'Only the service organization to user entities',
          'Only the auditor who prepared it',
          'Only to regulators',
        ],
        correctAnswer: 1,
        explanation: 'SOC 2 reports are restricted-use documents. The service organization controls distribution to user entities (and their auditors) who need the report.',
      },
    ],
    hints: [
      'SOC 1 = Financial reporting controls (ICFR)',
      'SOC 2 = Trust Services Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy)',
      'SOC 3 = Public version of SOC 2 (general use)',
    ],
    references: ['SSAE 18', 'SOC 1/2/3 Reports', 'Trust Services Criteria'],
  },
  {
    id: 'isc-tbs-008',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'SOC 2 Trust Services Criteria Analysis',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Trust Services Criteria',
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-B-2',
    scenario: `
You are reviewing a SOC 2 Type 2 report for a SaaS provider. The report covers the following Trust Services Criteria:
• Security (Common Criteria)
• Availability
• Confidentiality

EXCERPTS FROM DESCRIPTION OF CONTROLS:

CC6.1 - Logical Access Controls:
"Access to production systems requires VPN connection and Active Directory authentication. Password policy requires 12 characters with complexity. Access reviews performed semi-annually."

CC6.6 - System Boundaries:
"Firewalls restrict network traffic to necessary ports. Web Application Firewall (WAF) protects against common attacks. Network segmentation isolates production from development."

A1.2 - Availability:
"Systems are hosted in two geographically diverse data centers with automatic failover. SLA guarantees 99.95% uptime. Monitoring alerts are sent to on-call personnel 24/7."

C1.1 - Confidentiality:
"Customer data is encrypted using AES-256 at rest. Data in transit uses TLS 1.2+. Encryption keys are stored in hardware security modules (HSM)."

TESTING RESULTS:
• CC6.1: 3 of 50 terminated employees retained access > 48 hours (target: 24 hours)
• CC6.6: All controls tested without exception
• A1.2: Actual uptime was 99.92% (below SLA)
• C1.1: 2 development databases found with unencrypted customer data copies
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'The terminated employee access finding would be reported as:',
        options: [
          'No exception - 48 hours is reasonable',
          'Qualified opinion on entire report',
          'Exception noted in Security criteria testing results',
          'Basis for adverse opinion',
        ],
        correctAnswer: 2,
        explanation: 'This is a deviation from the stated control (24-hour target). It\'s reported as an exception for CC6.1 but likely wouldn\'t affect the overall opinion unless pervasive.',
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Unencrypted customer data in development databases affects which criteria?',
        options: [
          'Security only',
          'Confidentiality only',
          'Both Security and Confidentiality',
          'Availability only',
        ],
        correctAnswer: 2,
        explanation: 'Unencrypted sensitive data is both a Security issue (protection of data) and Confidentiality issue (specifically protecting confidential data). Both criteria are impacted.',
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'The 99.92% uptime vs 99.95% SLA indicates:',
        options: [
          'The system failed completely',
          'Availability control is well designed but not meeting target',
          'The SLA is unrealistic',
          'No impact on the report',
        ],
        correctAnswer: 1,
        explanation: 'Controls are functioning (99.92% is still high) but not meeting the stated objective (99.95% SLA). This is likely reported as an exception in Availability testing.',
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The development database encryption finding suggests what control gap?',
        options: [
          'Production encryption is inadequate',
          'Data handling controls don\'t cover non-production environments',
          'HSM is not functioning properly',
          'TLS configuration is incorrect',
        ],
        correctAnswer: 1,
        explanation: 'Controls describe production encryption but customer data exists unencrypted in development. This suggests data handling policies don\'t adequately cover all environments.',
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Based on these findings, a user entity auditor should:',
        options: [
          'Reject the report entirely',
          'Consider compensating controls and assess risk impact',
          'Require a new report immediately',
          'Accept the report without further consideration',
        ],
        correctAnswer: 1,
        explanation: 'Exceptions don\'t automatically invalidate the report. Auditors should evaluate the nature, severity, and whether compensating controls exist, then assess impact on their risk assessment.',
      },
      {
        id: 'req-6',
        type: 'multiple_choice',
        question: 'Which finding poses the GREATEST risk to user entities?',
        options: [
          'Terminated employee access (3 of 50)',
          'Uptime below SLA',
          'Unencrypted development databases with customer data',
          'All findings present equal risk',
        ],
        correctAnswer: 2,
        explanation: 'Unencrypted customer data in development creates direct data breach risk. The other findings are process/performance issues; this is a data protection failure.',
      },
    ],
    hints: [
      'Exceptions are deviations from stated controls, not necessarily opinion qualifications',
      'Consider the population size when evaluating exception rates',
      'Non-production environments handling real data need equivalent controls',
    ],
    references: ['SOC 2 Examination Guide', 'Trust Services Criteria', 'AICPA Attestation Standards'],
  },
];

export default ISC_TBS;
