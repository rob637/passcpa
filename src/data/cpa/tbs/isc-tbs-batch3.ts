// ISC TBS Batch 3 - Exam Quality Simulations
import { TBS, TBS_TYPES } from '../../../types';

export const ISC_TBS_BATCH3: TBS[] = [
  {
    id: 'isc-tbs-b3-001',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Cybersecurity Risk Assessment',
    difficulty: 'hard',
    timeEstimate: 20,
    topic: 'Cybersecurity',
    blueprintArea: 'ISC-III',
    scenario: `
TechVault Corp. conducted a cybersecurity risk assessment. You are reviewing the findings:

Asset Inventory:
• Customer database (PII for 500,000 customers)
• Financial systems (ERP with payment processing)
• Employee portal (HR data, W-2 information)
• Public website (e-commerce platform)

Threat Assessment:
• Ransomware attacks (High likelihood, High impact)
• Phishing emails (High likelihood, Medium impact)
• SQL injection (Medium likelihood, High impact)
• Insider theft (Low likelihood, High impact)
• DDoS attacks (Medium likelihood, Medium impact)

Current Controls:
• Antivirus software (signature-based)
• Perimeter firewall
• Password policy (8 characters, 90-day rotation)
• Weekly backup to on-premises server
• No encryption on customer database
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which threat represents the highest inherent risk?',
        options: ['Ransomware attacks', 'Phishing emails', 'SQL injection', 'DDoS attacks'],
        correctAnswer: 0,
        explanation: 'Ransomware = High likelihood × High impact = Highest inherent risk score.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What is the most critical control weakness?',
        options: ['Signature-based antivirus', 'Unencrypted customer database', 'On-premises backup', '8-character passwords'],
        correctAnswer: 1,
        explanation: 'Unencrypted PII for 500K customers creates extreme breach liability under privacy laws (GDPR, CCPA).'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Which control improvement would best address ransomware risk?',
        options: ['Stronger passwords', 'Air-gapped offline backups', 'Website DDoS protection', 'SQL input validation'],
        correctAnswer: 1,
        explanation: 'Air-gapped backups prevent ransomware encryption of backup data, enabling recovery without paying ransom.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The weekly backup to on-premises server creates which vulnerability?',
        options: ['RPO of up to 7 days of data loss', 'RTO delay', 'Compliance violation', 'All of these'],
        correctAnswer: 3,
        explanation: 'Weekly backups = up to 7 days data loss (RPO). On-site only = no disaster recovery. Payment data unprotected = PCI-DSS violation.'
      }
    ],
    hints: [
      'Inherent risk = Likelihood × Impact before controls',
      'PII and payment data have regulatory requirements',
      'Ransomware recovery depends on backup strategy'
    ]
  },
  {
    id: 'isc-tbs-b3-002',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Change Management Controls',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'IT Controls',
    blueprintArea: 'ISC-II',
    scenario: `
You are evaluating ABC Corp's IT change management process:

Current Process Documentation:
1. Developer submits change request form
2. Developer's manager approves the change
3. Developer codes and tests changes in development environment
4. Developer moves code to production during next release window
5. Operations team documents the change post-deployment

Change Log Review (Last Quarter):
| Date | Change | Requestor | Approver | Tester |
|------|--------|-----------|----------|--------|
| 3/15 | Payroll calculation fix | J. Smith | J. Smith | J. Smith |
| 3/22 | New vendor setup | T. Jones | M. Brown | T. Jones |
| 4/01 | Bank account update | S. Lee | R. Davis | S. Lee |
| 4/15 | Emergency security patch | System | Auto-approved | Vendor |

User Access Review:
• All developers have production write access
• No separate QA team exists
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What is the primary segregation of duties violation?',
        options: ['Developers test their own code', 'Developers deploy to production', 'Managers approve subordinate changes', 'All are violations'],
        correctAnswer: 3,
        explanation: 'All represent SoD violations: self-testing = no independent verification, production access = circumvents controls, self-approval = oversight failure.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The March 15 payroll change raises which red flag?',
        options: ['Self-approval', 'Missing documentation', 'No testing evidence', 'All of these'],
        correctAnswer: 3,
        explanation: 'J. Smith requested, approved, and tested their own payroll change - complete circumvention of all controls.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What control should be added for emergency changes?',
        options: ['Prohibit all emergency changes', 'Require post-implementation review', 'Require advance board approval', 'Manual deployment only'],
        correctAnswer: 1,
        explanation: 'Emergency changes are necessary but require compensating controls: post-implementation review and retroactive proper approval documentation.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Developer production access violates which IT general control?',
        options: ['Program change controls', 'Access controls', 'Computer operations controls', 'Both A and B'],
        correctAnswer: 3,
        explanation: 'Production access violates program change controls (unauthorized modifications) and access controls (excessive privileges).'
      }
    ],
    hints: [
      'SoD: Developer ≠ Tester ≠ Deployer',
      'ITGCs: Access, Change, Operations, SDLC',
      'Emergency procedures need compensating controls'
    ]
  },
  {
    id: 'isc-tbs-b3-003',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Database Security Assessment',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Data Security',
    blueprintArea: 'ISC-III',
    scenario: `
Enterprise Database Configuration Review:

Server: SQLServer2019 - FINANCE_PROD

User Account Audit:
| Username | Role | Last Login | Password Age |
|----------|------|------------|--------------|
| sa | DB Admin | Active | 730 days |
| svc_app | Application | Active | Never expires |
| jsmith | User | 180 days ago | 45 days |
| terminated_emp | User | 365 days ago | 400 days |
| guest | Public | Never | Default |

Security Settings:
• Encryption: None (TDE not enabled)
• Audit logging: Disabled
• Backup encryption: None
• Network: All ports open to internal network
• Authentication: SQL authentication only (no Windows auth)

Data Classification:
• Customer SSNs (250,000 records)
• Credit card numbers (tokenized)
• Employee salary data
• Financial statements (pre-release)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which user account poses the highest security risk?',
        options: ['sa with 730-day password', 'svc_app with non-expiring password', 'terminated_emp still active', 'guest account enabled'],
        correctAnswer: 2,
        explanation: 'terminated_emp represents a terminated employee with active access - immediate security incident and audit failure.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The disabled audit logging violates which requirement?',
        options: ['SOX Section 404', 'PCI-DSS Requirement 10', 'GDPR Article 32', 'All of these'],
        correctAnswer: 3,
        explanation: 'SOX requires audit trails for financial data, PCI requires logging of cardholder data access, GDPR requires security measures for personal data.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What type of encryption should be implemented first?',
        options: ['TDE for data at rest', 'TLS for data in transit', 'Backup encryption', 'All simultaneously'],
        correctAnswer: 3,
        explanation: 'With SSNs and financial data, all encryption vectors must be addressed: at-rest (TDE), in-transit (TLS), and backups.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The SQL-only authentication creates which vulnerability?',
        options: ['Cannot use multi-factor authentication', 'Credentials stored in connection strings', 'No integration with identity governance', 'All of these'],
        correctAnswer: 3,
        explanation: 'SQL auth prevents MFA, requires embedded credentials, and bypasses enterprise identity management and access reviews.'
      }
    ],
    hints: [
      'Terminated employees = immediate access removal',
      'Service accounts need special controls',
      'Encryption: at-rest + in-transit + backups'
    ]
  },
  {
    id: 'isc-tbs-b3-004',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Business Continuity Plan Review',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Business Continuity',
    blueprintArea: 'ISC-IV',
    scenario: `
Global Financial Services - Business Continuity Plan Summary:

Critical Systems Classification:
| System | RTO | RPO | Current Backup |
|--------|-----|-----|----------------|
| Core Banking | 4 hours | 0 hours | Real-time replication |
| Trading Platform | 15 minutes | 0 hours | Hot standby |
| Email | 24 hours | 4 hours | Daily backup |
| HR System | 72 hours | 24 hours | Weekly backup |
| Customer Portal | 8 hours | 1 hour | Hourly snapshots |

Recovery Sites:
• Primary: New York data center
• DR Site: New Jersey (15 miles away)
• Cloud backup: AWS us-east-1 (Virginia)

Last Test: Tabletop exercise 18 months ago
Communication Plan: Paper-based call tree in IT manager's office
Dependencies: Internet, power, HVAC monitored by facilities
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'The DR site location creates which risk?',
        options: ['Single regional disaster affects both sites', 'Network latency issues', 'Regulatory non-compliance', 'Staffing challenges'],
        correctAnswer: 0,
        explanation: '15 miles apart means both sites could be affected by a single regional disaster (hurricane, earthquake, widespread power outage).'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The HR system backup strategy fails to meet stated RPO because:',
        options: ['Weekly backup ≠ 24-hour RPO', 'Recovery testing not performed', 'No offsite copy', 'Cloud backup too distant'],
        correctAnswer: 0,
        explanation: 'Weekly backup could result in up to 7 days of data loss, far exceeding the 24-hour RPO target.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What is the primary weakness in the communication plan?',
        options: ['Paper-based in disaster', 'Single location storage', 'No alternative contact methods', 'All of these'],
        correctAnswer: 3,
        explanation: 'Paper call tree in one office: inaccessible in disaster, no redundancy, no automated notification capability.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The 18-month-old tabletop exercise is inadequate because:',
        options: ['Annual testing typically required', 'Only tabletop, not full simulation', 'Staff may have changed', 'All of these'],
        correctAnswer: 3,
        explanation: 'Best practice: annual testing, full simulation (not just discussion), updated for personnel and system changes.'
      }
    ],
    hints: [
      'RTO: How long to restore; RPO: How much data loss acceptable',
      'Geographic diversity prevents single-point failure',
      'Test plans regularly and after significant changes'
    ]
  },
  {
    id: 'isc-tbs-b3-005',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'System Development Life Cycle',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'SDLC',
    blueprintArea: 'ISC-I',
    scenario: `
Project: New Customer Relationship Management (CRM) System

Phase Documentation Review:

Requirements Phase:
• Business requirements document signed by VP Sales
• No IT security review performed
• User acceptance criteria not defined

Design Phase:
• Technical architecture approved by IT Director
• No data flow diagrams created
• Integration points documented for 3 legacy systems

Development Phase:
• Agile methodology with 2-week sprints
• Code reviews performed by development team lead
• Unit testing 70% code coverage achieved

Testing Phase:
• Integration testing completed
• Performance testing skipped due to timeline
• User acceptance testing in progress (50% complete)

Deployment Plan:
• Big bang deployment scheduled for Friday 5 PM
• Rollback plan: "Restore from backup if issues"
• Go-live decision by IT Director alone
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'The requirements phase has which critical gap?',
        options: ['Missing business sign-off', 'No IT security review', 'Incomplete user criteria', 'Both B and C'],
        correctAnswer: 3,
        explanation: 'Security review should occur in requirements phase (shift left). UAT criteria must be defined upfront to validate delivery.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Skipping performance testing creates which risk?',
        options: ['System may not handle production load', 'Response times may be unacceptable', 'Scalability unknown', 'All of these'],
        correctAnswer: 3,
        explanation: 'Performance testing validates load handling, response times, and scalability - critical for customer-facing CRM.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'The deployment approach has multiple red flags including:',
        options: ['Friday deployment risks weekend incident', 'Vague rollback plan', 'Single approval authority', 'All of these'],
        correctAnswer: 3,
        explanation: 'Friday = reduced support, "restore backup" = untested/incomplete rollback, single approver = no checks and balances.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What should happen before go-live?',
        options: ['Complete UAT 100%', 'Perform security review', 'Test rollback procedure', 'All of these'],
        correctAnswer: 3,
        explanation: 'All are prerequisites: UAT validates requirements met, security review identifies vulnerabilities, rollback testing ensures recovery capability.'
      }
    ],
    hints: [
      'Security review early in SDLC = "shift left"',
      'Complete testing phases before deployment',
      'Deployment needs multiple approvals and tested rollback'
    ]
  },
  {
    id: 'isc-tbs-b3-006',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Access Control Review',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Access Controls',
    blueprintArea: 'ISC-II',
    scenario: `
Quarterly Access Review - Financial Applications

User Access Matrix:
| User | Role | GL | AP | AR | Payroll | Reports |
|------|------|----|----|----|---------|---------| 
| CFO | Executive | View | View | View | View | Full |
| Controller | Mgmt | Full | Approve | Approve | View | Full |
| AP Clerk | Operations | View | Full | None | None | AP Only |
| AR Clerk | Operations | View | None | Full | None | AR Only |
| Payroll Mgr | Operations | Modify | None | None | Full | Payroll |
| IT Admin | Support | Full | Full | Full | Full | Full |
| Temp Worker | Contractor | View | Enter | Enter | None | None |

Review Findings:
1. AP Clerk has both AP entry and AP approval access
2. IT Admin accesses financial systems for support tickets
3. Temp Worker account active 60 days past contract end
4. Payroll Manager can modify GL accounts
5. No multi-factor authentication on remote access
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Finding #1 violates which control principle?',
        options: ['Least privilege', 'Segregation of duties', 'Need to know', 'Defense in depth'],
        correctAnswer: 1,
        explanation: 'Entry + approval = SoD violation. Same person should not enter and approve transactions (fraud risk).'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The IT Admin access is problematic because:',
        options: ['IT should not access financial data', 'No business justification documented', 'Violates least privilege', 'Both B and C'],
        correctAnswer: 3,
        explanation: 'IT may need limited troubleshooting access, but "Full" access everywhere lacks documentation and exceeds need.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'The Temp Worker finding indicates failure of which process?',
        options: ['Background check', 'Provisioning', 'De-provisioning', 'Access review'],
        correctAnswer: 2,
        explanation: 'De-provisioning failure: terminated/expired accounts should be disabled within 24 hours of departure.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Payroll Manager GL modify access creates which specific risk?',
        options: ['Ghost employees in payroll', 'Journal entries to hide payroll fraud', 'Unauthorized pay increases', 'Both A and B'],
        correctAnswer: 3,
        explanation: 'GL modify + Payroll = create fake employees and hide via journal entries. Classic fraud scheme combination.'
      }
    ],
    hints: [
      'SoD: Custody, Authorization, Recording separated',
      'Least privilege: Minimum access needed',
      'Accounts: Provision, Review, De-provision lifecycle'
    ]
  },
  {
    id: 'isc-tbs-b3-007',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Network Security Assessment',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Network Security',
    blueprintArea: 'ISC-III',
    scenario: `
Network Security Audit - Manufacturing Company

Network Architecture:
• Corporate LAN: 500 workstations, 50 servers
• Production floor: 200 IoT devices, PLCs, SCADA systems
• Guest WiFi: Open network, shared password posted in lobby
• Remote access: VPN with username/password only
• Cloud: AWS for backup, Azure for Office 365

Firewall Configuration:
• Rule 1: Allow all outbound traffic
• Rule 2: Allow inbound 80, 443 from any
• Rule 3: Allow inbound 22 (SSH) from any
• Rule 4: Allow inbound 3389 (RDP) from VPN range
• Rule 5: Deny all other inbound

Segmentation:
• Corporate and production on same network segment
• No DMZ implemented
• Flat network architecture

Recent Incidents:
• Malware infection spread to 50 machines in 2 hours
• Production line stopped due to ransomware on SCADA
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'The "Allow all outbound" rule enables which attack?',
        options: ['Data exfiltration', 'Command and control communication', 'Malware downloads', 'All of these'],
        correctAnswer: 3,
        explanation: 'Unrestricted outbound allows: stealing data, malware calling home for instructions, downloading additional malware.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'SSH from "any" (Rule 3) is dangerous because:',
        options: ['Brute force attacks from internet', 'Known vulnerabilities in SSH', 'No source IP restriction', 'Both A and C'],
        correctAnswer: 3,
        explanation: 'Internet-exposed SSH faces constant brute force attacks. Should restrict to specific admin IP ranges or VPN only.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What caused rapid malware spread based on architecture?',
        options: ['Guest WiFi exposure', 'Flat network - no segmentation', 'IoT device vulnerabilities', 'VPN weakness'],
        correctAnswer: 1,
        explanation: 'Flat network = no barriers. Once malware enters, lateral movement is unrestricted across all 500+ devices.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The SCADA ransomware attack succeeded due to:',
        options: ['Production not isolated from corporate', 'No DMZ for external facing', 'IoT devices unpatched', 'Both A and likely C'],
        correctAnswer: 3,
        explanation: 'OT/SCADA systems require network isolation from IT. Same segment means corporate infection spreads to production. IoT/PLCs often unpatched.'
      }
    ],
    hints: [
      'Network segmentation limits blast radius',
      'OT/SCADA should be isolated from IT network',
      'Firewall: Deny all, allow specific (opposite of current)'
    ]
  },
  {
    id: 'isc-tbs-b3-008',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Cloud Security Configuration',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Cloud Computing',
    blueprintArea: 'ISC-III',
    scenario: `
AWS Cloud Security Assessment

S3 Bucket Configuration:
| Bucket | Contents | Public Access | Encryption | Logging |
|--------|----------|---------------|------------|---------|
| backup-prod | Database dumps | Disabled | None | Disabled |
| website-assets | Images, CSS | Enabled | None | Disabled |
| customer-data | PII, contracts | Disabled | None | Disabled |
| logs-archive | Audit logs | Disabled | SSE-S3 | Enabled |

IAM Configuration:
• Root account: No MFA, access keys active
• Admin users: 15 accounts with full AWS access
• Service accounts: Embedded in application code
• Password policy: 8 characters, no complexity

EC2 Security Groups:
• Production: Allows 0.0.0.0/0 on ports 22, 80, 443, 3306
• Development: Allows all traffic from any source

Cost Alert: $50,000 unexpected charges from crypto mining instances
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which finding indicates highest immediate risk?',
        options: ['Unencrypted backups', 'Root account without MFA', 'Public S3 bucket', 'Embedded credentials'],
        correctAnswer: 1,
        explanation: 'Root account without MFA = complete AWS takeover if compromised. Root has unrestricted access and cannot be limited.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The customer-data bucket needs which immediate remediation?',
        options: ['Enable encryption', 'Enable logging', 'Block public access', 'All of these'],
        correctAnswer: 3,
        explanation: 'PII requires: encryption (compliance), logging (audit trail), public block (even if currently disabled, ensure policy prevents future exposure).'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Port 3306 open to 0.0.0.0/0 exposes:',
        options: ['MySQL database to internet', 'Web server vulnerability', 'SSH brute force', 'Remote desktop attacks'],
        correctAnswer: 0,
        explanation: 'Port 3306 = MySQL. Open to all = database directly accessible from internet. Should only allow application servers.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The crypto mining charges indicate:',
        options: ['Billing error', 'Compromised credentials', 'Insider threat', 'Configuration mistake'],
        correctAnswer: 1,
        explanation: 'Crypto mining is classic credential compromise indicator. Attackers spin up large instances to mine cryptocurrency for profit.'
      }
    ],
    hints: [
      'Root account: Enable MFA, delete access keys',
      'S3: Default to private, encrypt at rest',
      'Security groups: Principle of least privilege'
    ]
  },
  {
    id: 'isc-tbs-b3-009',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Vendor Risk Assessment',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Third-Party Risk',
    blueprintArea: 'ISC-IV',
    scenario: `
Vendor Due Diligence Review - Cloud Payroll Provider

Vendor: PayrollCloud Inc.
Service: HR and payroll processing for 5,000 employees
Data accessed: SSN, bank accounts, salary, benefits, tax forms

Security Questionnaire Responses:
• SOC 2 Type II report: Available (12 months old)
• ISO 27001 certification: Not certified
• Penetration testing: Performed annually, findings remediated
• Data encryption: At rest and in transit
• Data center: Shared facility, unknown other tenants
• Subcontractors: Uses 3 subcontractors for development
• Incident response: 72-hour notification SLA
• Business continuity: 99.5% uptime SLA
• Data return: 30-day deletion upon contract termination

Contract Review:
• Right to audit: Not included
• Liability cap: $50,000
• Insurance: Cyber liability $1M
• Subcontractor oversight: Vendor responsible
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'The SOC 2 report being 12 months old means:',
        options: ['Still valid, covers prior period', 'Out of date, need current', 'Type II is perpetual', 'Request bridge letter'],
        correctAnswer: 3,
        explanation: 'SOC 2 Type II covers a specific period. If report is 12 months old, request bridge letter or management assertion for gap period.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The liability cap of $50,000 is problematic because:',
        options: ['Insufficient for breach costs', 'Below regulatory fines', 'Does not cover notification', 'All of these'],
        correctAnswer: 3,
        explanation: 'Breach of 5,000 SSNs could cost millions in notification, credit monitoring, fines. $50K cap transfers most risk to company.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'The missing right to audit clause prevents:',
        options: ['Verifying vendor controls', 'Independent security assessment', 'Compliance validation', 'All of these'],
        correctAnswer: 3,
        explanation: 'Right to audit is essential for: control verification, independent assessment, regulatory compliance demonstration.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Using 3 development subcontractors creates which concern?',
        options: ['Fourth-party risk uninvestigated', 'Code quality unknown', 'Access to PII by unknown parties', 'Both A and C'],
        correctAnswer: 3,
        explanation: 'Fourth-party (sub-subcontractor) risk: who are they, where located, what access to your data, what controls?'
      }
    ],
    hints: [
      'SOC reports cover specific time periods',
      'Liability and insurance should match data risk',
      'Fourth-party risk = your vendor\'s vendors'
    ]
  },
  {
    id: 'isc-tbs-b3-010',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Data Analytics - Anomaly Detection',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Data Analytics',
    blueprintArea: 'ISC-V',
    scenario: `
Continuous Auditing Dashboard - AP Transaction Monitoring

30-Day Statistics:
• Total invoices processed: 4,500
• Total amount: $12,500,000
• Average invoice: $2,778
• Invoices below $10,000 (below approval threshold): 4,200 (93%)

Flagged Transactions:
| Alert Type | Count | Examples |
|------------|-------|----------|
| Duplicate invoices | 23 | Same vendor/amount/date |
| Round dollar amounts | 145 | $5,000.00 exactly |
| Sequential invoice numbers | 12 | INV-001, INV-002, INV-003 same day |
| Weekend processing | 34 | Saturday/Sunday entries |
| New vendors, no PO | 8 | First-time vendor, rush payment |
| Amount just below threshold | 67 | $9,900 - $9,999 |

Vendor Master Alerts:
• 3 vendors with PO Box addresses in high-risk jurisdictions
• 2 vendors with same bank account as employees
• 1 vendor with same address as employee
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'The "amount just below threshold" pattern suggests:',
        options: ['Legitimate small purchases', 'Approval threshold avoidance', 'Vendor pricing patterns', 'System rounding'],
        correctAnswer: 1,
        explanation: '67 transactions at $9,900-$9,999 (below $10,000 threshold) = classic split invoicing to avoid approval controls.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Vendors with employee bank accounts indicate:',
        options: ['Ghost vendor scheme', 'Shell company fraud', 'Kickback arrangement', 'Need investigation'],
        correctAnswer: 3,
        explanation: 'Matching bank accounts between vendors and employees is red flag for fictitious vendor fraud - requires immediate investigation.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'The sequential invoice numbers from one vendor suggest:',
        options: ['Efficient vendor processing', 'Potentially fictitious invoices', 'Volume discount customer', 'Nothing unusual'],
        correctAnswer: 1,
        explanation: 'Sequential invoices same day suggests created together, possibly fictitious. Real invoices typically have gaps from other customers.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which analysis would detect invoice splitting most effectively?',
        options: ['Stratification by amount', 'Same vendor within approval period', 'Benford\'s law analysis', 'Duplicate detection'],
        correctAnswer: 1,
        explanation: 'Invoice splitting: multiple invoices from same vendor within short period to stay below approval threshold. Time-based analysis is key.'
      }
    ],
    hints: [
      'Fraud indicators: round amounts, threshold proximity, duplicates',
      'Vendor master integrity critical for AP fraud prevention',
      'Data analytics enables continuous monitoring vs. sampling'
    ]
  },
  {
    id: 'isc-tbs-b3-011',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'IT Governance Framework',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'IT Governance',
    blueprintArea: 'ISC-I',
    scenario: `
IT Governance Assessment - Mid-Size Financial Institution

Current State:
• IT reports to CFO (no CIO position)
• IT budget: $5M (3% of revenue)
• IT headcount: 25 (no security-specific roles)
• Projects selected by department requests
• No formal IT strategy document
• Annual IT spending approved by CFO alone

Committee Structure:
• Executive Committee: Meets monthly, IT not represented
• Audit Committee: Reviews IT audit findings annually
• No IT Steering Committee exists
• No Risk Committee oversight of IT

Frameworks in Use:
• No formal IT framework adopted
• ITIL mentioned but not implemented
• COBIT awareness but no adoption
• SOX compliance driven, no broader governance

IT Performance Metrics:
• Help desk ticket close time
• System uptime percentage
• No business outcome metrics
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'IT reporting to CFO rather than CEO indicates:',
        options: ['IT viewed as cost center', 'Appropriate for financial institution', 'Better budget control', 'Improved oversight'],
        correctAnswer: 0,
        explanation: 'IT under CFO often indicates IT seen as expense to minimize rather than strategic asset. CIO role and board representation indicate strategic importance.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Absence of IT Steering Committee means:',
        options: ['Faster decision making', 'No IT-business alignment', 'Reduced bureaucracy', 'Cost savings'],
        correctAnswer: 1,
        explanation: 'IT Steering Committee aligns IT projects with business strategy. Without it, projects may not support business objectives.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'The IT metrics focus solely on:',
        options: ['Business outcomes', 'Operational efficiency', 'Strategic value', 'Customer satisfaction'],
        correctAnswer: 1,
        explanation: 'Ticket time and uptime are operational metrics. Missing: business value delivered, strategic alignment, customer/user satisfaction.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'For this organization, which framework adoption is most critical?',
        options: ['COBIT for governance', 'ITIL for operations', 'NIST for security', 'All needed, prioritize COBIT'],
        correctAnswer: 3,
        explanation: 'Financial institution needs all frameworks, but governance (COBIT) establishes foundation for security and operations frameworks.'
      }
    ],
    hints: [
      'IT Governance: Align IT with business strategy',
      'COBIT: Enterprise IT governance framework',
      'Metrics should measure business value, not just operations'
    ]
  },
  {
    id: 'isc-tbs-b3-012',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Incident Response Assessment',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Incident Response',
    blueprintArea: 'ISC-III',
    scenario: `
Post-Incident Review - Ransomware Attack

Timeline:
• Day 0, 2:00 AM: Ransomware executed
• Day 0, 7:30 AM: Help desk receives first call about "strange email"
• Day 0, 9:00 AM: IT discovers encrypted servers
• Day 0, 11:00 AM: CIO notified
• Day 0, 2:00 PM: Incident response team convened
• Day 0, 4:00 PM: Forensic firm contacted
• Day 1, 10:00 AM: Insurance company notified
• Day 2: Legal engaged, regulatory notification begins
• Day 5: Systems restored from backup

Impact Assessment:
• 150 servers encrypted
• Manufacturing down 5 days
• Estimated loss: $3.5M
• Ransom demand: $500,000 (not paid)

Response Gaps Identified:
• No 24/7 monitoring - attack ran undetected for 5 hours
• Initial responder powered off servers (destroyed volatile evidence)
• Backup server also encrypted (connected to network)
• No pre-engaged incident response firm
• Regulatory notification deadline almost missed
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'The 5-hour detection gap resulted from:',
        options: ['Sophisticated malware', 'No 24/7 SOC monitoring', 'User error', 'Firewall failure'],
        correctAnswer: 1,
        explanation: 'Attack at 2 AM, detection at 7:30 AM when staff arrived. 24/7 Security Operations Center would have detected earlier.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Powering off servers was problematic because:',
        options: ['Extended downtime', 'Destroyed memory evidence', 'Spread the malware', 'Required vendor support'],
        correctAnswer: 1,
        explanation: 'Memory forensics captures running malware, encryption keys, attack tools. Power-off destroys volatile evidence critical for investigation.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'The backup server encryption demonstrates:',
        options: ['Failed backup procedures', 'Need for offline/air-gapped backups', 'Insufficient backup frequency', 'Wrong backup software'],
        correctAnswer: 1,
        explanation: 'Network-connected backups are encrypted by ransomware. Air-gapped or immutable backups survive ransomware attacks.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Pre-engaging an IR firm would have:',
        options: ['Reduced downtime', 'Preserved evidence better', 'Faster regulatory response', 'All of these'],
        correctAnswer: 3,
        explanation: 'Pre-engaged IR firm: faster response (no vetting delay), trained staff on evidence preservation, established regulatory procedures.'
      }
    ],
    hints: [
      '24/7 SOC: Continuous threat monitoring',
      'IR: Contain first, preserve evidence, then remediate',
      'Backups must be isolated from production network'
    ]
  },
  {
    id: 'isc-tbs-b3-013',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Privacy Controls Assessment',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Data Privacy',
    blueprintArea: 'ISC-IV',
    scenario: `
Privacy Impact Assessment - Customer Mobile App

Data Collection:
• Full name, email, phone number
• Device identifiers, IP address
• Location data (when app is open)
• Purchase history
• Browsing behavior within app
• Photos (for profile and product images)

Data Sharing:
• Marketing analytics vendor (US-based)
• Payment processor (PCI-compliant)
• Push notification service (US-based)
• Development outsourcer (India-based)
• Facebook/Google for login

Privacy Controls:
• Privacy policy: Last updated 2 years ago
• Cookie consent: Not implemented (app only)
• Data subject requests: Manual email process
• Data retention: "Indefinite until account deletion"
• Cross-border transfer: No safeguards documented
• Children's data: No age verification
• Data minimization: Not assessed
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'The India-based outsourcer creates which compliance issue?',
        options: ['GDPR cross-border transfer', 'CCPA requirements', 'COPPA violation', 'Both A and B'],
        correctAnswer: 3,
        explanation: 'Sharing data with India requires GDPR transfer mechanisms (SCCs). If California residents, CCPA requires service provider contracts.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The 2-year-old privacy policy violates:',
        options: ['GDPR transparency requirements', 'App store policies', 'FTC guidelines', 'All of these'],
        correctAnswer: 3,
        explanation: 'Privacy policies must reflect current practices. Two years of changes (new vendors, features) creates false representations.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'No age verification creates COPPA risk if:',
        options: ['App targets children under 13', 'App has actual knowledge of child users', 'General audience app collects child data', 'Any of these'],
        correctAnswer: 3,
        explanation: 'COPPA applies if: directed to children, actual knowledge of child users, or general audience with child data collection.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: '"Indefinite retention" violates which privacy principle?',
        options: ['Purpose limitation', 'Storage limitation', 'Data minimization', 'Both B and C'],
        correctAnswer: 3,
        explanation: 'Storage limitation: keep only as long as necessary. Data minimization: collect only what is needed. Indefinite retention violates both.'
      }
    ],
    hints: [
      'GDPR requires lawful basis and safeguards for transfers',
      'Privacy policies must be current and accurate',
      'Retention periods should be defined and justified'
    ]
  },
  {
    id: 'isc-tbs-b3-014',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Application Controls Review',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Application Controls',
    blueprintArea: 'ISC-II',
    scenario: `
ERP System Controls Assessment - Order-to-Cash Module

Input Controls:
• Customer number: Required, system validated
• Order quantity: Accepts any positive number
• Unit price: Allows manual override
• Ship date: Accepts any future date
• Credit check: Bypass option available
• Discount: Up to 50% allowed for "other" reason

Processing Controls:
• Inventory check: Performed at order entry
• Credit limit: Checked against customer master
• Tax calculation: Automatic by jurisdiction
• Batch posting: Daily at 6 PM

Output Controls:
• Invoice generated automatically
• Credit memos require approval
• Statement of account monthly
• AR aging report: Ad-hoc only

Edit Reports:
• Exception report: Generated but not reviewed
• Override report: Not generated
• Batch control totals: Compared manually
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'The manual price override creates which risk?',
        options: ['Unauthorized discounts', 'Revenue understatement', 'Kickback schemes', 'All of these'],
        correctAnswer: 3,
        explanation: 'Price override without approval: unauthorized discounts, revenue manipulation, potential kickbacks to customers.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The credit check bypass option should be:',
        options: ['Removed entirely', 'Restricted to specific roles with logging', 'Available to all sales staff', 'Used for VIP customers only'],
        correctAnswer: 1,
        explanation: 'Credit bypass may be needed (COD, prepaid) but requires restricted access and audit trail. Available to all = no control.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Exception reports being "not reviewed" means:',
        options: ['Detective control failure', 'Errors go undetected', 'Compensating control needed', 'All of these'],
        correctAnswer: 3,
        explanation: 'Generated but not reviewed = control does not exist. Must assign ownership, review, sign-off, remediation procedures.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What control should be added for discount entries?',
        options: ['Dollar limit by role', 'Approval workflow above threshold', 'Reason code validation', 'All of these'],
        correctAnswer: 3,
        explanation: '50% discount with "other" reason = easily abused. Need: role-based limits, approval requirements, valid reason codes.'
      }
    ],
    hints: [
      'Input controls: Validate data at entry point',
      'Processing controls: Ensure accurate calculations',
      'Exception reports must be reviewed and acted upon'
    ]
  },
  {
    id: 'isc-tbs-b3-015',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Emerging Technology Risk',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Emerging Technologies',
    blueprintArea: 'ISC-V',
    scenario: `
AI/ML Implementation Assessment - Credit Decision Model

Model Details:
• Purpose: Automated loan approval for amounts under $50,000
• Training data: 10 years of historical loan applications and outcomes
• Algorithm: Machine learning neural network
• Deployment: Real-time decision API

Model Performance:
• Approval accuracy: 94%
• Default prediction: 87%
• Processing time: 2 seconds average

Risk Assessment Findings:
• Training data includes ZIP codes (correlated with demographics)
• "Black box" model - decisions not explainable
• No human review for declining decisions
• Model retrained annually
• No fairness testing performed
• Historical data contains pre-2019 processes (different underwriting)

Regulatory Environment:
• Fair lending laws apply
• ECOA requires statement of reasons for adverse action
• OCC model risk management guidance
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'ZIP codes in training data create which risk?',
        options: ['Fair lending violation (proxy discrimination)', 'Data quality issues', 'Privacy concerns', 'Processing delays'],
        correctAnswer: 0,
        explanation: 'ZIP codes correlate with race/ethnicity demographics. Using them as input creates discriminatory outcomes even without directly using protected characteristics.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The "black box" nature violates which requirement?',
        options: ['ECOA adverse action notice requirement', 'Model validation standards', 'Consumer transparency', 'All of these'],
        correctAnswer: 3,
        explanation: 'ECOA requires specific reasons for denial. OCC requires model explainability. Consumers entitled to understand decisions affecting them.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Annual retraining frequency is inadequate because:',
        options: ['Models can drift between retraining', 'Economic conditions change faster', 'Fraud patterns evolve quickly', 'All of these'],
        correctAnswer: 3,
        explanation: 'ML models degrade as conditions change (concept drift). Year-long gap allows significant performance degradation.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What fairness testing should be performed?',
        options: ['Disparate impact analysis', 'Approval rate comparison by demographics', 'Bias testing on protected classes', 'All of these'],
        correctAnswer: 3,
        explanation: 'Fairness requires: disparate impact testing (outcome differences), demographic parity checks, bias detection across protected characteristics.'
      }
    ],
    hints: [
      'Proxy discrimination: Neutral inputs that correlate with protected classes',
      'Model explainability required for regulated decisions',
      'Continuous monitoring for drift and bias'
    ]
  },
  {
    id: 'isc-tbs-b3-016',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Physical Security Controls',
    difficulty: 'medium',
    timeEstimate: 14,
    topic: 'Physical Security',
    blueprintArea: 'ISC-II',
    scenario: `
Data Center Physical Security Assessment

Access Controls:
• Main entrance: Badge reader + PIN code
• Data center door: Badge reader only
• Server cages: Key locks (25 keys distributed)
• Visitor access: Escorted, paper log book
• Badge lost: Self-reported, 24-hour replacement

Environmental Controls:
• HVAC: Single unit, no redundancy
• Fire suppression: Sprinkler system
• Water detection: Not installed
• UPS: 15-minute runtime
• Generator: 48-hour fuel supply, monthly test

Monitoring:
• CCTV: Entrances only, 30-day retention
• Server room: No cameras
• Environmental sensors: Temperature alerts only
• Physical intrusion: Motion detectors off during business hours

Maintenance:
• Cleaning crew: Unsupervised after hours access
• Vendors: Badge issued for day, self-escort common
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'The sprinkler fire suppression system is problematic because:',
        options: ['Water damages electronic equipment', 'Not fast enough for fires', 'Requires manual activation', 'Too expensive to maintain'],
        correctAnswer: 0,
        explanation: 'Data centers should use clean agent suppression (FM-200, Novec) that extinguishes without water damage to equipment.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Cleaning crew unsupervised access enables:',
        options: ['Theft of equipment', 'Social engineering attacks', 'Malware installation via USB', 'All of these'],
        correctAnswer: 3,
        explanation: 'Unsupervised data center access without background checks enables theft, physical attack vectors, and social engineering.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'No server room cameras means:',
        options: ['Cannot detect unauthorized access', 'No evidence for investigations', 'Cannot identify tampering', 'All of these'],
        correctAnswer: 3,
        explanation: 'Server room cameras essential for: real-time intrusion detection, forensic evidence, identifying physical tampering with systems.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'The 25 key locks for server cages creates which problem?',
        options: ['Keys easily duplicated', 'No audit trail of access', 'Lost keys require rekey', 'All of these'],
        correctAnswer: 3,
        explanation: 'Keys cannot be audited, easily copied, and lost key compromises all cages until rekey. Electronic locks preferred.'
      }
    ],
    hints: [
      'Clean agent suppression for data center fires',
      'All data center access should be logged and monitored',
      'Vendors and cleaning crews need supervised access'
    ]
  },
  {
    id: 'isc-tbs-b3-017',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Blockchain and DLT Controls',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Emerging Technologies',
    blueprintArea: 'ISC-V',
    scenario: `
Blockchain Implementation Assessment - Supply Chain Tracking

System Overview:
• Private permissioned blockchain
• 50 participating supply chain partners
• Tracks product origin, handling, and delivery
• Smart contracts for automated payments
• Integration with ERP systems via APIs

Technical Architecture:
• Hyperledger Fabric framework
• Cloud-hosted nodes (AWS)
• Certificate authority for node identities
• Off-chain storage for large documents

Control Environment:
• Consortium governance board for rule changes
• Partner onboarding: Application and approval
• Smart contract changes: Developer deploys
• Key management: Each partner manages own keys
• Node access: Admin credentials shared among partners
• Data visibility: All participants see all transactions

Audit Findings:
• No formal smart contract audit performed
• Partner offboarding process not defined
• Immutability prevents error correction
• Performance degradation as chain grows
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Smart contracts without code audit create risk of:',
        options: ['Logic errors causing incorrect payments', 'Security vulnerabilities exploited', 'Unintended business outcomes', 'All of these'],
        correctAnswer: 3,
        explanation: 'Smart contracts are code that auto-executes. Bugs can cause financial loss, security breaches, and cannot be easily fixed once deployed.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Shared admin credentials among partners violates:',
        options: ['Individual accountability', 'Access control principles', 'Audit trail requirements', 'All of these'],
        correctAnswer: 3,
        explanation: 'Shared credentials prevent identifying who performed actions, violate principle of individual passwords, destroy audit trail.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'All participants seeing all transactions creates:',
        options: ['Competitive information exposure', 'Privacy concerns', 'Potential collusion facilitation', 'All of these'],
        correctAnswer: 3,
        explanation: 'Universal visibility exposes: pricing to competitors, volumes/relationships, enables coordination on pricing or supply.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Immutability preventing error correction requires:',
        options: ['Compensating entries for corrections', 'Governance process for exceptions', 'Error prevention controls at input', 'All of these'],
        correctAnswer: 3,
        explanation: 'Since blockchain cannot be edited, need: correction transactions (like accounting), governance for disputes, strong input validation.'
      }
    ],
    hints: [
      'Smart contracts = code audits essential',
      'Permissioned blockchain still needs access controls',
      'Immutability requires compensating controls for errors'
    ]
  },
  {
    id: 'isc-tbs-b3-018',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Software License Compliance',
    difficulty: 'medium',
    timeEstimate: 14,
    topic: 'Software Asset Management',
    blueprintArea: 'ISC-I',
    scenario: `
Software License Audit - Technology Company

License Inventory Review:
| Software | License Type | Purchased | Deployed | Gap |
|----------|--------------|-----------|----------|-----|
| Microsoft 365 | Per user | 500 | 520 | (20) |
| Oracle DB | Per processor | 4 | 8 | (4) |
| VMware | Per socket | 20 | 20 | 0 |
| Adobe CC | Named user | 50 | 45 | +5 |
| AutoCAD | Per device | 25 | 30 | (5) |
| Windows Server | Per core | 96 | 128 | (32) |

Compliance Risks Identified:
• Cloud migrations changing license requirements
• Virtual machines multiplying processor counts
• Contractor laptops with enterprise software
• Legacy perpetual licenses on unsupported versions
• Open source components without compliance tracking

Current Controls:
• Manual spreadsheet tracking
• Annual true-up with Microsoft
• No discovery tools deployed
• IT responsible for all software requests
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'The Oracle processor gap is most costly because:',
        options: ['Oracle audits frequently and aggressively', 'Processor licenses cost tens of thousands each', 'Virtualization complicates counts', 'All of these'],
        correctAnswer: 3,
        explanation: 'Oracle is known for aggressive audits, per-processor costs are very high, and VM environments often trigger unexpected licensing.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Manual spreadsheet tracking fails because:',
        options: ['Deployments change faster than updates', 'No verification of actual usage', 'Shadow IT not captured', 'All of these'],
        correctAnswer: 3,
        explanation: 'Spreadsheets: outdated instantly, don\'t detect actual installs, miss software that IT didn\'t provision.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Contractor laptops with enterprise software risk:',
        options: ['License violation if not properly licensed', 'Data loss when contract ends', 'Security vulnerabilities unmanaged', 'All of these'],
        correctAnswer: 3,
        explanation: 'Contractors need proper license allocation, device management for data protection, and security patching coverage.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Cloud migration affects licensing by:',
        options: ['BYOL may not transfer to cloud', '"Lift and shift" may violate terms', 'Processor counts differ by cloud', 'All of these'],
        correctAnswer: 3,
        explanation: 'Many licenses prohibit cloud use, or require different licensing (Azure Hybrid Benefit, AWS dedicated hosts for Oracle).'
      }
    ],
    hints: [
      'Software Asset Management (SAM) tools essential',
      'Virtualization multiplies license requirements',
      'Cloud migration requires license review'
    ]
  },
  {
    id: 'isc-tbs-b3-019',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'RPA Controls Assessment',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Robotic Process Automation',
    blueprintArea: 'ISC-V',
    scenario: `
RPA Implementation Review - Finance Department

Bot Inventory:
| Bot Name | Process | Run Schedule | Owner | Last Modified |
|----------|---------|--------------|-------|---------------|
| AP_Bot | Invoice processing | Continuous | Finance | 6 months ago |
| Bank_Bot | Bank reconciliation | Daily 6 AM | Finance | 2 years ago |
| Report_Bot | Management reports | Weekly Mon | Controller | Unknown |
| GL_Bot | Journal entries | Monthly | AP Manager | 1 week ago |
| AR_Bot | Collections emails | Daily | AR Manager | 3 months ago |

Control Environment:
• Bot credentials: Service accounts with full user access
• Code repository: Developer local machines
• Change management: Developer self-approval
• Error handling: Emails to developer mailbox
• Logging: Application default logs only
• Testing: Production testing after each change
• Business continuity: Manual process exists but untrained

Access Levels:
• Bots have same access as department head
• 3 developers can modify any bot
• No segregation between dev and production environments
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Bot credentials with "full user access" violates:',
        options: ['Least privilege principle', 'Service account best practices', 'Audit trail requirements', 'All of these'],
        correctAnswer: 3,
        explanation: 'Bots should have minimum required access, service account policies, and all actions attributed to specific bot identity.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Bank_Bot unchanged for 2 years indicates:',
        options: ['Stable, low-risk process', 'May not reflect current business rules', 'Application changes may have broken it', 'Both B and C'],
        correctAnswer: 3,
        explanation: 'Business rules, application interfaces, and regulations change. Old bot may be processing incorrectly without detection.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'GL_Bot posting journal entries needs:',
        options: ['Segregation from who creates entries', 'Approval workflow integration', 'Enhanced logging and review', 'All of these'],
        correctAnswer: 3,
        explanation: 'Journal entry bots = high fraud risk. Need: SoD controls, approval before posting, detailed audit trail, exception review.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Production testing of RPA changes is risky because:',
        options: ['Errors affect real data', 'No rollback capability tested', 'Users affected unexpectedly', 'All of these'],
        correctAnswer: 3,
        explanation: 'RPA should test in non-production environment. Production testing with real data can cause errors, lacks tested rollback, disrupts operations.'
      }
    ],
    hints: [
      'RPA bots are system users requiring access controls',
      'Bot changes need testing, approval, version control',
      'High-risk processes (banking, GL) need enhanced controls'
    ]
  },
  {
    id: 'isc-tbs-b3-020',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'SOC Report Evaluation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Service Organization Controls',
    blueprintArea: 'ISC-IV',
    scenario: `
SOC 2 Type II Report Review - Cloud Payroll Provider

Report Details:
• Report date: December 31, 2023
• Period covered: January 1 - December 31, 2023
• Trust criteria: Security, Availability, Confidentiality
• Opinion type: Qualified

Auditor Qualifications:
• Access management: 3 of 25 user access reviews not completed
• Change management: Emergency changes lacked documentation
• Encryption: Data in transit not encrypted for legacy API

Control Exceptions Noted:
• Control CC6.1: Logical access policies not consistently enforced
  - 15% of terminated users had access 30+ days after termination
• Control CC7.2: Vulnerability management
  - Critical patches delayed average 45 days beyond target
• Control CC8.1: Change management
  - 12% of changes lacked proper approval documentation

Management Response:
• Enhanced HR/IT integration for terminations in progress
• Automation of patch deployment being implemented
• Change management training completed

Subservice Organizations:
• AWS (Infrastructure) - Carved out, separate SOC 2 available
• Twilio (SMS notifications) - Not examined
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'A "qualified" opinion indicates:',
        options: ['Material control exceptions exist', 'Report cannot be relied upon', 'Only qualified staff can use', 'Excellence certification'],
        correctAnswer: 0,
        explanation: 'Qualified opinion = control exceptions material enough to mention but not pervasive. Controls did not operate effectively in all areas.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'The 15% terminated user access exception affects:',
        options: ['Security trust criteria', 'Confidentiality trust criteria', 'User entity controls assessment', 'All of these'],
        correctAnswer: 3,
        explanation: 'Terminated access impacts: Security (unauthorized access), Confidentiality (data exposure), User controls (reliance on timely notification).'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Twilio "not examined" as subservice organization means:',
        options: ['Your organization must assess Twilio directly', 'SMS functionality has no controls', 'Separate SOC report required', 'Both A and C'],
        correctAnswer: 3,
        explanation: 'Non-examined subservice organization: user entity responsible for assessing controls, either directly or via that vendor\'s own SOC report.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: '45-day patch delay creates which risk for you as user entity?',
        options: ['Known vulnerabilities exploited against your data', 'Compliance failures if you require timely patching', 'Need compensating controls consideration', 'All of these'],
        correctAnswer: 3,
        explanation: 'Critical patch delays = extended vulnerability window. May violate your own policies, require risk acceptance, or compensating controls.'
      }
    ],
    hints: [
      'SOC types: Type I (design), Type II (operating effectiveness)',
      'Qualified vs unqualified opinion = with vs without exceptions',
      'Subservice: Carved-out (separate assessment) vs Inclusive (examined)'
    ]
  }
];
