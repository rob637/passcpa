// ISC TBS Batch 2 - Exam Quality Simulations
import { TBS, TBS_TYPES } from '../../../types';

export const ISC_TBS_BATCH2: TBS[] = [
  {
    id: 'isc-tbs-b2-001',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'SOC 2 Report Evaluation',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'SOC Engagements',
    blueprintArea: 'ISC-III',
    scenario: `
You are reviewing a SOC 2 Type 2 report for CloudSecure Inc., a SaaS provider your audit client uses for data storage.

Report Details:
• Report period: January 1 - December 31, Year 1
• Trust services criteria: Security, Availability, Confidentiality
• Service auditor: Parker & Associates LLP
• Report date: February 15, Year 2

Key Findings:
• 2 control deviations noted in access management
• Subservice organization: DataCenter Corp (carved-out method)
• Complementary user entity controls (CUECs) specified

Your audit client implemented CloudSecure on March 1, Year 1.
Your audit period ends December 31, Year 1.
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Does the SOC 2 report period adequately cover your audit needs?',
        options: ['Yes - covers entire period client used service', 'No - starts before client implementation', 'No - ends before audit period', 'Partially - need to test January-February controls'],
        correctAnswer: 0,
        explanation: 'The report covers Jan 1 - Dec 31, Year 1. Client implemented March 1, Year 1 and audit ends Dec 31, Year 1. The report period fully covers the relevant usage period.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What is the impact of the carved-out subservice organization?',
        options: ['No additional procedures needed', 'Need separate SOC report for DataCenter Corp', 'Must perform direct testing of DataCenter', 'Subservice controls are included in this report'],
        correctAnswer: 1,
        explanation: 'Carved-out method means DataCenter Corp\'s controls are NOT included. You need a separate SOC report for DataCenter Corp or perform alternative procedures.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'How should the 2 access management deviations be addressed?',
        options: ['Ignore - minor deviations', 'Assess if compensating controls exist', 'Issue qualified opinion', 'Terminate use of service organization'],
        correctAnswer: 1,
        explanation: 'Evaluate whether: (1) compensating controls exist, (2) deviations are material to your audit, (3) CUECs operated effectively. Deviations require professional judgment, not automatic qualification.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What is your responsibility regarding CUECs?',
        options: ['No responsibility - they are optional', 'Test that audit client implemented CUECs', 'Assume CUECs are operating effectively', 'CUECs are service organization responsibility'],
        correctAnswer: 1,
        explanation: 'CUECs are controls the user entity (your client) must implement. You must evaluate whether your client has implemented the specified complementary controls.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'What type of opinion does a SOC 2 Type 2 report provide?',
        options: ['Opinion on design only', 'Opinion on design and operating effectiveness', 'Opinion on financial statement assertions', 'Opinion on management representations'],
        correctAnswer: 1,
        explanation: 'Type 2 = Design AND operating effectiveness over a period. Type 1 = Design only at a point in time.'
      }
    ],
    hints: [
      'Type 2 covers operating effectiveness over a period',
      'Carved-out = Subservice controls excluded',
      'Inclusive = Subservice controls included',
      'CUECs = User entity\'s responsibility to implement'
    ]
  },
  {
    id: 'isc-tbs-b2-002',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'IT General Controls Assessment',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'IT General Controls',
    blueprintArea: 'ISC-I',
    scenario: `
During the IT audit of RetailMax Inc., you documented the following ITGC findings:

**Access Controls:**
• User access reviews performed quarterly
• Password policy: 8 characters, changed every 90 days
• 15 terminated employees retained system access for 2-30 days post-termination
• Privileged access limited to 5 IT administrators

**Change Management:**
• All changes require documented approval
• Testing performed in separate environment
• 3 emergency changes in Year 1 lacked prior approval (documented retroactively)
• No segregation between developers and migration to production

**Computer Operations:**
• Daily backups to offsite location
• Backup restoration tested annually
• 2 unplanned outages totaling 8 hours
• Job scheduling automated with exception reporting
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What is the most significant access control deficiency?',
        options: ['Quarterly access reviews (should be monthly)', 'Terminated employee access retention', '8-character passwords (should be 12+)', 'Too many privileged users'],
        correctAnswer: 1,
        explanation: 'Terminated employees retaining access for up to 30 days is a significant deficiency. This creates unauthorized access risk. Industry best practice is same-day termination of access.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'How should the change management findings be assessed?',
        options: ['Material weakness - no segregation of duties', 'Significant deficiency - emergency changes documented retroactively', 'No deficiency - processes are reasonable', 'Deficiency - testing should be in production'],
        correctAnswer: 0,
        explanation: 'Lack of segregation between developers and production migration is a material weakness. Developers should not be able to migrate their own code to production without independent review/approval.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Is the backup process adequate?',
        options: ['Yes - daily backups and offsite storage', 'No - annual restoration testing is insufficient', 'No - should backup hourly', 'Depends on recovery objectives'],
        correctAnswer: 3,
        explanation: 'Adequacy depends on the organization\'s Recovery Point Objective (RPO) and Recovery Time Objective (RTO). The auditor should assess if daily backups meet business requirements.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What compensating control might mitigate the developer access risk?',
        options: ['Quarterly access reviews', 'Detailed change logs reviewed by management', 'Annual penetration testing', 'More frequent backups'],
        correctAnswer: 1,
        explanation: 'If developers can migrate to production, management review of detailed change logs can provide detective control. This doesn\'t eliminate risk but provides compensating evidence.'
      }
    ],
    hints: [
      'Segregation of duties is fundamental to change management',
      'Terminated access should be immediate',
      'Compensating controls can mitigate but not eliminate risk',
      'RPO/RTO drive backup requirements'
    ]
  },
  {
    id: 'isc-tbs-b2-003',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Data Privacy Compliance Assessment',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Privacy Controls',
    blueprintArea: 'ISC-II',
    scenario: `
HealthData Systems processes protected health information (PHI) for healthcare clients.

Current Privacy Program:
• Privacy policy last updated 3 years ago
• Data classification: PHI, Confidential, Internal, Public
• Encryption: At-rest (AES-256), In-transit (TLS 1.2)
• Access: Role-based with minimum necessary principle
• Retention: 7 years per policy (no automated deletion)
• Incident response: 72-hour breach notification
• Training: Annual privacy training (85% completion rate)
• Third parties: Business Associate Agreements (BAAs) in place

Recent Events:
• Employee emailed unencrypted PHI to wrong recipient
• 3 data subject access requests received (2 fulfilled, 1 pending 45 days)
• Penetration test identified SQL injection vulnerability (remediated)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What is the most significant privacy program deficiency?',
        options: ['Outdated privacy policy', 'No automated data deletion', 'Email incident', 'Pending access request at 45 days'],
        correctAnswer: 3,
        explanation: 'HIPAA requires response to access requests within 30 days (with possible 30-day extension). A request pending 45 days without extension may violate regulatory requirements.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Was the email incident a reportable breach?',
        options: ['Yes - any PHI disclosure requires reporting', 'No - if employee discovered and recalled immediately', 'Depends on harm assessment', 'Only if >500 records affected'],
        correctAnswer: 2,
        explanation: 'Under HIPAA, breach notification depends on a 4-factor risk assessment: nature of PHI, unauthorized recipient, whether accessed/viewed, and risk mitigation. Not all disclosures are reportable.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What is the annual training completion rate concern?',
        options: ['85% is acceptable', 'Should target 100% for compliance', 'Need monthly training instead', 'Training not required under HIPAA'],
        correctAnswer: 1,
        explanation: 'HIPAA requires workforce members to be trained. 15% untrained creates compliance risk. Organizations should target 100% completion with follow-up for non-completers.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Is the encryption standard adequate?',
        options: ['Yes - meets current standards', 'No - should use TLS 1.3', 'No - AES-256 is outdated', 'Encryption is optional under HIPAA'],
        correctAnswer: 0,
        explanation: 'AES-256 for at-rest and TLS 1.2 for in-transit are currently acceptable encryption standards. TLS 1.2 is still considered secure, though TLS 1.3 is preferred for new implementations.'
      }
    ],
    hints: [
      'HIPAA access request deadline: 30 days (extendable)',
      'Breach determination requires risk assessment',
      'Training should target 100% completion',
      'Minimum necessary principle = need-to-know access'
    ]
  },
  {
    id: 'isc-tbs-b2-004',
    section: 'ISC',
    type: TBS_TYPES.CALCULATION,
    title: 'Business Continuity Metrics',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Business Continuity',
    blueprintArea: 'ISC-II',
    scenario: `
TechServices Corp. is establishing business continuity requirements:

**Critical Application: Order Processing System**
• Average hourly revenue: $50,000
• Transactions per hour: 500
• Last backup: Daily at 2:00 AM
• Current recovery capability: 4 hours

**Year 1 Outage History:**
| Date | Duration | Root Cause | Revenue Impact |
|------|----------|------------|----------------|
| Mar 15 | 2 hours | Network failure | $100,000 |
| Jun 22 | 6 hours | Database corruption | $300,000 |
| Oct 8 | 1 hour | Hardware failure | $50,000 |
| Dec 3 | 3 hours | Ransomware | $150,000 |

Total annual IT budget: $2,000,000
Proposed DR investment: $400,000 for 1-hour RTO/1-hour RPO
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate total Year 1 downtime hours.',
        correctAnswer: 12,
        tolerance: 0,
        explanation: '2 + 6 + 1 + 3 = 12 hours total downtime'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'Calculate total Year 1 revenue impact.',
        correctAnswer: 600000,
        tolerance: 0,
        explanation: '$100,000 + $300,000 + $50,000 + $150,000 = $600,000'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'Calculate average cost per downtime hour.',
        correctAnswer: 50000,
        tolerance: 0,
        explanation: '$600,000 / 12 hours = $50,000 per hour (matches hourly revenue)'
      },
      {
        id: 'req-4',
        type: 'calculation',
        question: 'If DR investment reduces downtime by 75%, what is the annual savings?',
        correctAnswer: 450000,
        tolerance: 0,
        explanation: 'Current impact $600,000 × 75% reduction = $450,000 annual savings'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'Is the $400,000 DR investment justified?',
        options: ['Yes - payback in less than 1 year', 'No - too expensive relative to IT budget', 'Need more data on implementation risk', 'Yes - but only if 100% uptime guaranteed'],
        correctAnswer: 0,
        explanation: 'Investment $400,000 vs. potential annual savings $450,000 = payback in ~11 months. ROI is positive in Year 1. The investment appears justified from a cost-benefit perspective.'
      }
    ],
    hints: [
      'RPO = How much data can you afford to lose',
      'RTO = How quickly must systems recover',
      'Cost-benefit analysis drives DR investment decisions',
      'Consider probability and impact together'
    ]
  },
  {
    id: 'isc-tbs-b2-005',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Cybersecurity Risk Assessment',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Security Risk Management',
    blueprintArea: 'ISC-II',
    scenario: `
Review the cybersecurity risk register for FinanceFirst Corp:

| Risk ID | Description | Likelihood | Impact | Inherent Risk | Controls | Residual Risk |
|---------|-------------|------------|--------|---------------|----------|---------------|
| R-001 | Ransomware attack | High | Critical | Critical | Daily backups, EDR, training | High |
| R-002 | Phishing compromise | High | High | High | Email filtering, MFA, training | Medium |
| R-003 | Insider threat | Medium | High | High | Access reviews, DLP, monitoring | Medium |
| R-004 | SQL injection | Low | High | Medium | WAF, code review, testing | Low |
| R-005 | Physical theft | Low | Medium | Low | Badge access, cameras, encryption | Low |

Risk Tolerance: Medium (risks above Medium require treatment)
Annual Security Budget: $1,500,000
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'Which risk requires immediate additional treatment?',
        options: ['R-001 Ransomware (residual still High)', 'R-002 Phishing (within tolerance)', 'R-004 SQL Injection (low residual)', 'R-005 Physical theft (acceptable)'],
        correctAnswer: 0,
        explanation: 'R-001 has residual risk of High, which exceeds the Medium risk tolerance. Despite current controls, additional treatment is required to reduce residual risk to acceptable levels.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What additional control would best address ransomware risk?',
        options: ['More frequent backups', 'Network segmentation and immutable backups', 'Additional training', 'Stronger passwords'],
        correctAnswer: 1,
        explanation: 'Network segmentation limits ransomware spread. Immutable (air-gapped) backups ensure recovery even if regular backups are encrypted. These address the critical weakness in current controls.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Why is phishing residual risk acceptable despite high likelihood?',
        options: ['Email filtering eliminates risk', 'MFA prevents account compromise even if credentials stolen', 'Training makes phishing impossible', 'Phishing only affects individuals'],
        correctAnswer: 1,
        explanation: 'MFA provides a strong compensating control. Even if phishing succeeds in stealing credentials, MFA prevents attackers from using them to access systems.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What type of control is DLP for insider threat?',
        options: ['Preventive only', 'Detective only', 'Both preventive and detective', 'Corrective'],
        correctAnswer: 2,
        explanation: 'Data Loss Prevention (DLP) is both preventive (blocks unauthorized transfers) and detective (alerts on suspicious data movement). It addresses multiple points in the attack lifecycle.'
      }
    ],
    hints: [
      'Residual risk = Inherent risk after controls',
      'Risks above tolerance require treatment',
      'Defense in depth = Multiple control layers',
      'MFA is a strong compensating control for credential theft'
    ]
  },
  {
    id: 'isc-tbs-b2-006',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Database Security and Access Controls',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Data Management',
    blueprintArea: 'ISC-I',
    scenario: `
InventoryPro Corp.'s database security configuration:

**Access Configuration:**
• Database: Oracle 19c
• Authentication: Integrated with Active Directory
• Service accounts: 3 (app_user, backup_svc, report_user)
• DBA accounts: 2 (named accounts)
• Generic accounts: 1 (admin - shared by DBAs for emergencies)

**Permissions:**
| Account | Access Level | Tables Accessible |
|---------|--------------|-------------------|
| app_user | Read/Write | Inventory, Orders, Customers |
| backup_svc | Full backup | All tables |
| report_user | Read-only | All tables |
| DBA accounts | SysDBA | All |
| admin (shared) | SysDBA | All |

**Logging:**
• Failed login attempts: Logged and alerted
• Successful logins: Logged
• Data changes: Not logged
• Schema changes: Logged
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What is the most significant access control weakness?',
        options: ['Too many service accounts', 'Shared admin account', 'Report user has too much access', 'No MFA on database'],
        correctAnswer: 1,
        explanation: 'Shared accounts prevent individual accountability. The shared "admin" account means actions cannot be attributed to a specific person, violating basic security principles.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What is the logging deficiency?',
        options: ['Should log login failures only', 'Data changes are not logged', 'Schema changes should not be logged', 'Too much logging creates noise'],
        correctAnswer: 1,
        explanation: 'Data changes (INSERT, UPDATE, DELETE) are not logged. This prevents detection of unauthorized data modification and elimination of audit trails for data integrity.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'Does report_user follow least privilege?',
        options: ['Yes - read-only is minimal access', 'No - should only access needed tables', 'Depends on report requirements', 'Read-only means no risk'],
        correctAnswer: 1,
        explanation: 'Least privilege means access only to what\'s needed. "All tables" read access violates this - report_user should only access tables required for specific reports.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'What should be done about the shared admin account?',
        options: ['Delete immediately', 'Replace with individual emergency accounts with break-glass procedure', 'Acceptable for emergencies only', 'Rename to make it less obvious'],
        correctAnswer: 1,
        explanation: 'Replace shared account with individual emergency accounts that require a "break-glass" procedure (logged checkout, approval, time-limited access) to maintain accountability.'
      }
    ],
    hints: [
      'Individual accountability requires named accounts',
      'Least privilege = Only access what\'s needed',
      'Audit logging should cover data changes',
      'Break-glass = Emergency access with controls'
    ]
  },
  {
    id: 'isc-tbs-b2-007',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Cloud Security Configuration Review',
    difficulty: 'hard',
    timeEstimate: 18,
    topic: 'Cloud Computing',
    blueprintArea: 'ISC-II',
    scenario: `
CloudFirst Corp. uses AWS for production workloads:

**Configuration Summary:**
• VPC with public and private subnets
• EC2 instances: 15 (8 public-facing, 7 private)
• S3 buckets: 12 (3 with public access enabled)
• RDS databases: 3 (all in private subnets)
• IAM users: 50 (MFA enabled: 45, root account MFA: No)
• Security groups: Default allow all outbound

**Recent Security Findings:**
• 2 S3 buckets contain PII with public read access
• 3 EC2 instances have security groups allowing 0.0.0.0/0 on SSH (port 22)
• CloudTrail logging: Enabled but logs stored in same account
• AWS Config: Not enabled
• No encryption at rest for 5 S3 buckets
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What is the highest priority finding?',
        options: ['5 users without MFA', 'S3 buckets with PII publicly accessible', 'SSH open to internet', 'CloudTrail logs in same account'],
        correctAnswer: 1,
        explanation: 'Public S3 buckets with PII is a data breach in progress. This is the highest priority - confidential data is already exposed to the internet. Must be remediated immediately.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'Why is root account MFA critical?',
        options: ['Root is just another admin account', 'Root has unlimited access and cannot be restricted', 'Root password is stronger anyway', 'MFA is optional for root'],
        correctAnswer: 1,
        explanation: 'The AWS root account has unrestricted access to all resources and billing. It cannot be limited by IAM policies. Compromised root = complete account takeover.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What is the risk of CloudTrail logs in the same account?',
        options: ['No risk - that\'s where logs belong', 'Attacker who compromises account can delete audit trail', 'Logs take up too much storage', 'Cross-account logging is too complex'],
        correctAnswer: 1,
        explanation: 'If an attacker compromises the account, they can delete CloudTrail logs to cover their tracks. Logs should be stored in a separate, hardened account with restricted access.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Why enable AWS Config?',
        options: ['For billing optimization', 'To track configuration changes and compliance', 'To improve performance', 'It\'s optional for small deployments'],
        correctAnswer: 1,
        explanation: 'AWS Config records configuration changes and evaluates compliance against rules. Without it, you cannot track configuration drift or detect unauthorized changes.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'What is the concern with default outbound security groups?',
        options: ['No concern - outbound is safe', 'Allows data exfiltration to any destination', 'Increases network costs', 'Slows down instances'],
        correctAnswer: 1,
        explanation: 'Allow-all outbound enables attackers to exfiltrate data to any external destination. Outbound traffic should be restricted to only necessary destinations.'
      }
    ],
    hints: [
      'Public S3 + PII = Active data exposure',
      'Root account = Unlimited, unrestricted access',
      'Audit logs should be protected from tampering',
      'Defense in depth applies to outbound traffic too'
    ]
  },
  {
    id: 'isc-tbs-b2-008',
    section: 'ISC',
    type: TBS_TYPES.CALCULATION,
    title: 'Incident Response Metrics',
    difficulty: 'medium',
    timeEstimate: 15,
    topic: 'Incident Management',
    blueprintArea: 'ISC-II',
    scenario: `
SecurityOps team incident response data for Q4:

| Incident ID | Type | Detection Time | Response Time | Resolution Time | Impact |
|-------------|------|----------------|---------------|-----------------|--------|
| INC-101 | Malware | 15 min | 30 min | 4 hours | High |
| INC-102 | Phishing | 2 hours | 15 min | 1 hour | Medium |
| INC-103 | Data leak | 72 hours | 45 min | 24 hours | Critical |
| INC-104 | DDoS | 5 min | 10 min | 2 hours | High |
| INC-105 | Insider | 168 hours | 4 hours | 72 hours | Critical |
| INC-106 | Ransomware | 30 min | 1 hour | 96 hours | Critical |

Target SLAs:
• Mean Time to Detect (MTTD): < 1 hour
• Mean Time to Respond (MTTR): < 30 minutes
• Resolution: Critical < 24 hours
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'calculation',
        question: 'Calculate Mean Time to Detect (MTTD) in hours.',
        correctAnswer: 40.75,
        tolerance: 1,
        explanation: '(0.25 + 2 + 72 + 0.083 + 168 + 0.5) / 6 = 242.833 / 6 = 40.5 hours (approximately). Detection times vary significantly.'
      },
      {
        id: 'req-2',
        type: 'calculation',
        question: 'How many incidents met the MTTD SLA (<1 hour)?',
        correctAnswer: 3,
        tolerance: 0,
        explanation: 'INC-101 (15 min), INC-104 (5 min), INC-106 (30 min) = 3 incidents met the <1 hour detection SLA.'
      },
      {
        id: 'req-3',
        type: 'calculation',
        question: 'How many critical incidents exceeded the 24-hour resolution SLA?',
        correctAnswer: 2,
        tolerance: 0,
        explanation: 'Critical incidents: INC-103 (24 hrs - at limit), INC-105 (72 hrs - exceeded), INC-106 (96 hrs - exceeded). Two exceeded the 24-hour SLA.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Which incident type has the worst detection capability?',
        options: ['Malware', 'Data leak/Insider threat', 'DDoS', 'Ransomware'],
        correctAnswer: 1,
        explanation: 'Data leak (72 hours) and Insider (168 hours) have by far the worst detection times. These "low and slow" threats are harder to detect than obvious attacks like DDoS.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'What would most improve detection of insider threats?',
        options: ['Faster firewall rules', 'User behavior analytics (UBA)', 'Better antivirus', 'More network segmentation'],
        correctAnswer: 1,
        explanation: 'User Behavior Analytics (UBA) establishes baselines and detects anomalous behavior - key for insider threats that don\'t trigger traditional security controls.'
      }
    ],
    hints: [
      'MTTD = Average time from occurrence to detection',
      'MTTR = Average time from detection to response start',
      'Insider threats are often detected through behavior anomalies',
      'SLA compliance = # meeting target / # total incidents'
    ]
  },
  {
    id: 'isc-tbs-b2-009',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'System Development Lifecycle Controls',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'SDLC Controls',
    blueprintArea: 'ISC-I',
    scenario: `
Review the SDLC process for PaymentPro application development:

**Development Process:**
• Methodology: Agile (2-week sprints)
• Code repository: GitHub Enterprise
• Branch protection: Requires 1 code review approval
• Static code analysis: SonarQube (runs on commit)
• Dynamic testing: Performed in QA environment
• Penetration testing: Annual third-party assessment

**Deployment Pipeline:**
• Dev → QA → Staging → Production
• Automated deployment via Jenkins
• Production deployments require change ticket
• Rollback capability: Yes (previous version)
• Production access: 5 developers have deploy rights

**Recent Audit Findings:**
• 2 production deployments without change tickets
• Code review sometimes performed by developer's peer on same team
• No security review for third-party libraries
• Staging environment data is production copy (full PII)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What is the most significant security gap?',
        options: ['Insufficient code reviewers (only 1 required)', 'Production deployments bypassing change management', 'Staging environment with production PII', 'Annual penetration testing is insufficient'],
        correctAnswer: 2,
        explanation: 'Production data with PII in staging creates major privacy/compliance risk. Staging should use anonymized or synthetic data. This exposes real customer data to developers.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What is the third-party library risk?',
        options: ['Libraries are always secure', 'Supply chain vulnerabilities not being detected', 'Third-party libraries are faster', 'No risk if license is open source'],
        correctAnswer: 1,
        explanation: 'Without security review of third-party libraries (SCA - Software Composition Analysis), vulnerabilities in dependencies are not detected before deployment to production.'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What control addresses the deployment bypass issue?',
        options: ['Remove developer production access', 'Integrate change ticket verification into pipeline', 'Perform more code reviews', 'Increase penetration testing frequency'],
        correctAnswer: 1,
        explanation: 'Automating change ticket verification in the Jenkins pipeline prevents bypassing. Deployment should fail if no approved change ticket is linked.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Is the code review process adequate?',
        options: ['Yes - one approval is standard', 'No - same team peer review lacks independence', 'Depends on team size', 'Code review is optional for Agile'],
        correctAnswer: 1,
        explanation: 'Peer review within the same team may lack independence. Same-team reviewers might approve changes due to team dynamics or shared deadlines. Independent review is more effective.'
      }
    ],
    hints: [
      'Non-production environments should not have production data',
      'SCA tools detect vulnerable dependencies',
      'Automated controls prevent process bypass',
      'Independent review > peer review for security'
    ]
  },
  {
    id: 'isc-tbs-b2-010',
    section: 'ISC',
    type: TBS_TYPES.DOCUMENT_REVIEW,
    title: 'Vendor Risk Assessment',
    difficulty: 'medium',
    timeEstimate: 16,
    topic: 'Third-Party Risk',
    blueprintArea: 'ISC-III',
    scenario: `
DataServices Corp. is onboarding a new SaaS vendor for HR management:

**Vendor: PeopleCloud Inc.**
• Annual revenue: $15 million
• Years in business: 4
• Number of employees: 85
• Data hosted: AWS US-East-1

**Security Certifications:**
• SOC 2 Type 1 (Security only) - dated 6 months ago
• ISO 27001 - Certified
• No PCI-DSS (not processing payments)

**Proposed Data Sharing:**
• Employee names, SSNs, salaries, benefits
• Performance reviews
• W-2 information

**Contract Terms:**
• 3-year term
• Data ownership: Customer retains ownership
• Data return: 30 days after termination
• Subcontractors: May use with notification
• Breach notification: 72 hours
• Liability cap: 12 months of fees ($180,000)
    `,
    requirements: [
      {
        id: 'req-1',
        type: 'multiple_choice',
        question: 'What is the most significant certification gap?',
        options: ['No PCI-DSS', 'SOC 2 Type 1 instead of Type 2', 'ISO 27001 is too broad', 'Certifications are current'],
        correctAnswer: 1,
        explanation: 'SOC 2 Type 1 only covers design at a point in time. For a vendor handling sensitive data over 3 years, Type 2 (operating effectiveness over a period) should be required.'
      },
      {
        id: 'req-2',
        type: 'multiple_choice',
        question: 'What data classification applies?',
        options: ['Public', 'Internal', 'Confidential/PII', 'Top Secret'],
        correctAnswer: 2,
        explanation: 'SSNs, salaries, performance reviews, W-2s are all sensitive PII. This is Confidential data requiring highest security controls and regulatory compliance (state privacy laws).'
      },
      {
        id: 'req-3',
        type: 'multiple_choice',
        question: 'What is the concern with the subcontractor clause?',
        options: ['Notification is sufficient', 'Should require approval, not just notification', 'Subcontractors improve service', 'No concern if vendor is certified'],
        correctAnswer: 1,
        explanation: 'For sensitive PII, you should approve subcontractors, not just be notified. Subcontractors may have weaker security, and the data flow extends beyond the primary vendor.'
      },
      {
        id: 'req-4',
        type: 'multiple_choice',
        question: 'Is the liability cap appropriate?',
        options: ['Yes - standard for SaaS', 'No - should be higher given SSN/W-2 exposure', 'Liability caps are not negotiable', 'Only matters if insurance exists'],
        correctAnswer: 1,
        explanation: '$180,000 cap is inadequate for SSN/W-2 breach. Cost of SSN breach (monitoring, regulatory fines, lawsuits) far exceeds 12 months of fees. Should negotiate higher cap or insurance requirement.'
      },
      {
        id: 'req-5',
        type: 'multiple_choice',
        question: 'What additional due diligence is recommended?',
        options: ['None - certifications are sufficient', 'Request SOC 2 Type 2 and conduct security questionnaire', 'Wait until vendor has 5+ years history', 'Only use vendors with >$100M revenue'],
        correctAnswer: 1,
        explanation: 'Request SOC 2 Type 2 covering Security, Availability, and Confidentiality. Conduct a security questionnaire covering areas not in SOC report. Review insurance coverage.'
      }
    ],
    hints: [
      'Type 2 > Type 1 for ongoing vendor relationships',
      'Liability caps should reflect potential breach costs',
      'Subcontractor controls = Your vendor\'s vendor',
      'Sensitive PII requires enhanced due diligence'
    ]
  }
];

export default ISC_TBS_BATCH2;
