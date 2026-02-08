/**
 * CPA Flashcards - ISC Section (Information Systems and Controls)
 * World-Class Sprint Expansion
 * 
 * Covers: IT General Controls, Security, SOC Reports, Data Management
 */

import { Flashcard } from './types';

export const ISC_FLASHCARDS: Flashcard[] = [
  // ==========================================
  // IT GENERAL CONTROLS (ITGC)
  // ==========================================
  {
    id: 'isc-fc-001',
    section: 'ISC',
    type: 'definition',
    topic: 'IT General Controls',
    blueprintArea: 'ISC-I',
    front: 'What are IT GENERAL CONTROLS (ITGC)?',
    back: `**IT General Controls:**
Policies and procedures that apply across all IT systems

**Categories:**
1. **Access Controls:** User authentication, authorization
2. **Change Management:** Software changes, testing, approval
3. **Operations:** Job scheduling, backup, monitoring
4. **Program Development:** SDLC, testing, documentation

ITGCs support the effectiveness of application controls`,
    difficulty: 'easy',
    tags: ['ITGC', 'controls', 'IT audit'],
    reference: 'COBIT Framework',
  },
  {
    id: 'isc-fc-002',
    section: 'ISC',
    type: 'definition',
    topic: 'IT General Controls',
    blueprintArea: 'ISC-I',
    front: 'What are APPLICATION CONTROLS?',
    back: `**Application Controls:**
Controls specific to individual applications

**Types:**
1. **Input Controls:** Validation, edits, authorization
2. **Processing Controls:** Calculations, completeness checks
3. **Output Controls:** Report distribution, reconciliation

**Examples:**
• Field validation (format, range checks)
• Batch totals and control totals
• Exception reports
• Segregation of duties within application`,
    difficulty: 'easy',
    tags: ['application controls', 'input', 'processing'],
    reference: 'IT Audit Standards',
  },
  {
    id: 'isc-fc-003',
    section: 'ISC',
    type: 'comparison',
    topic: 'Controls',
    blueprintArea: 'ISC-I',
    front: 'Compare PREVENTIVE, DETECTIVE, and CORRECTIVE controls',
    back: `**Preventive Controls:**
Stop errors/fraud BEFORE they occur
• Access controls, separation of duties
• Input validation, authorization requirements

**Detective Controls:**
Identify errors/fraud AFTER they occur
• Reconciliations, exception reports
• Log reviews, audits

**Corrective Controls:**
FIX errors after detection
• Backup restoration
• Error correction procedures
• Incident response`,
    comparison: {
      itemA: 'Preventive',
      itemB: 'Detective',
      differences: ['Before occurrence vs after', 'Stops problems vs finds them', 'First line vs second line']
    },
    difficulty: 'medium',
    tags: ['preventive', 'detective', 'corrective'],
    reference: 'COSO Framework',
  },
  {
    id: 'isc-fc-004',
    section: 'ISC',
    type: 'definition',
    topic: 'Access Controls',
    blueprintArea: 'ISC-II',
    front: 'What is AUTHENTICATION vs. AUTHORIZATION?',
    back: `**Authentication:** Verifying WHO you are
• Something you KNOW (password)
• Something you HAVE (token, smart card)
• Something you ARE (biometrics)
• Somewhere you ARE (location)

**Authorization:** Determining WHAT you can access
• Permissions, access rights
• Based on role, need-to-know
• Enforced after authentication

**Multi-Factor Authentication (MFA):**
Combines 2+ authentication factors`,
    difficulty: 'easy',
    tags: ['authentication', 'authorization', 'access'],
    reference: 'IT Security',
  },
  {
    id: 'isc-fc-005',
    section: 'ISC',
    type: 'mnemonic',
    topic: 'Security',
    blueprintArea: 'ISC-II',
    front: 'What is the CIA TRIAD in information security?',
    back: `**CIA Triad:**

**C - Confidentiality**
Only authorized users can access data
• Encryption, access controls
• Data classification

**I - Integrity**
Data is accurate and unchanged
• Hashing, digital signatures
• Change controls, audit trails

**A - Availability**
Systems accessible when needed
• Redundancy, backups
• Disaster recovery, uptime`,
    mnemonic: 'CIA - Confidentiality, Integrity, Availability',
    difficulty: 'easy',
    tags: ['CIA triad', 'security', 'objectives'],
    reference: 'Information Security',
  },
  {
    id: 'isc-fc-006',
    section: 'ISC',
    type: 'definition',
    topic: 'Security',
    blueprintArea: 'ISC-II',
    front: 'What is ENCRYPTION?',
    back: `**Encryption: Converting plaintext to ciphertext**

**Symmetric Encryption:**
• Same key encrypts and decrypts
• Fast, used for bulk data
• Key distribution challenge
• Examples: AES, DES, 3DES

**Asymmetric Encryption:**
• Public/private key pair
• Public encrypts, private decrypts
• Slower, used for key exchange
• Examples: RSA, ECC

**In Transit:** TLS/SSL (HTTPS)
**At Rest:** Full disk encryption, database encryption`,
    difficulty: 'medium',
    tags: ['encryption', 'symmetric', 'asymmetric'],
    reference: 'Cryptography',
  },
  {
    id: 'isc-fc-007',
    section: 'ISC',
    type: 'definition',
    topic: 'Security',
    blueprintArea: 'ISC-II',
    front: 'What is a FIREWALL?',
    back: `**Firewall: Network security device that filters traffic**

**Types:**
• **Packet Filter:** Examines headers only (IP, port)
• **Stateful Inspection:** Tracks connection state
• **Application Proxy:** Deep packet inspection
• **Next-Gen (NGFW):** IPS, application awareness, threat intel

**Rules:**
• Allow or deny based on source, destination, port, protocol
• Default deny (block all unless explicitly allowed)
• Logs for audit trail`,
    difficulty: 'medium',
    tags: ['firewall', 'network', 'security'],
    reference: 'Network Security',
  },
  // ==========================================
  // SOC REPORTS
  // ==========================================
  {
    id: 'isc-fc-008',
    section: 'ISC',
    type: 'comparison',
    topic: 'SOC Reports',
    blueprintArea: 'ISC-III',
    front: 'Compare SOC 1, SOC 2, and SOC 3 reports',
    back: `**SOC 1:** Internal control over financial reporting
• For service organizations affecting client F/S
• Follows SSAE 18 (AT-C 320)
• Used by user auditors

**SOC 2:** Trust Services Criteria (Security, Availability, etc.)
• For service organizations (cloud, data centers)
• Restricted distribution
• Detailed controls and testing

**SOC 3:** Same as SOC 2 but for general distribution
• No detailed testing results
• Can be publicly shared (seal of approval)`,
    comparison: {
      itemA: 'SOC 1',
      itemB: 'SOC 2',
      differences: ['ICFR focus vs Trust criteria', 'Financial vs operational', 'User auditors vs management']
    },
    difficulty: 'hard',
    tags: ['SOC', 'service organization', 'attestation'],
    reference: 'SSAE 18, AT-C 320',
  },
  {
    id: 'isc-fc-009',
    section: 'ISC',
    type: 'comparison',
    topic: 'SOC Reports',
    blueprintArea: 'ISC-III',
    front: 'What is the difference between TYPE I and TYPE II SOC reports?',
    back: `**Type I Report:**
• Point in time (specific date)
• Design and implementation of controls
• Are controls suitably designed?
• No testing of operating effectiveness

**Type II Report:**
• Period of time (typically 6-12 months)
• Design AND operating effectiveness
• Were controls operating effectively?
• Includes testing results and exceptions

Type II provides stronger assurance`,
    comparison: {
      itemA: 'Type I',
      itemB: 'Type II',
      differences: ['Point in time vs period', 'Design only vs design + effectiveness', 'Less vs more assurance']
    },
    difficulty: 'medium',
    tags: ['SOC', 'Type I', 'Type II'],
    reference: 'SSAE 18',
  },
  {
    id: 'isc-fc-010',
    section: 'ISC',
    type: 'definition',
    topic: 'SOC Reports',
    blueprintArea: 'ISC-III',
    front: 'What are the TRUST SERVICES CRITERIA (TSC)?',
    back: `**Trust Services Criteria (SOC 2):**

1. **Security (Common Criteria):** 
   Protection against unauthorized access
   
2. **Availability:** 
   System accessible as agreed
   
3. **Processing Integrity:** 
   Complete, valid, accurate, timely processing
   
4. **Confidentiality:** 
   Information protected as agreed
   
5. **Privacy:** 
   Personal information collected/used/retained/disposed per notice

Security is REQUIRED; others are optional`,
    difficulty: 'medium',
    tags: ['TSC', 'SOC 2', 'trust criteria'],
    reference: 'AICPA Trust Services',
  },
  // ==========================================
  // DATA MANAGEMENT & GOVERNANCE
  // ==========================================
  {
    id: 'isc-fc-011',
    section: 'ISC',
    type: 'definition',
    topic: 'Data Management',
    blueprintArea: 'ISC-IV',
    front: 'What is DATA GOVERNANCE?',
    back: `**Data Governance:**
Framework for managing data as an organizational asset

**Components:**
• **Data Stewardship:** Ownership and accountability
• **Data Quality:** Accuracy, completeness, timeliness
• **Data Security:** Protection and access control
• **Data Retention:** Policies for keeping/deleting data
• **Metadata Management:** Data about data

**Roles:**
Data Owner, Data Steward, Data Custodian`,
    difficulty: 'medium',
    tags: ['data governance', 'stewardship', 'quality'],
    reference: 'Data Management',
  },
  {
    id: 'isc-fc-012',
    section: 'ISC',
    type: 'definition',
    topic: 'Data Management',
    blueprintArea: 'ISC-IV',
    front: 'What is the difference between BACKUP and DISASTER RECOVERY?',
    back: `**Backup:**
Copies of data stored separately for recovery
• Full, incremental, differential
• Local, offsite, cloud
• Retention policies

**Disaster Recovery (DR):**
Plans and procedures to restore IT systems after major disruption
• RTO: Recovery Time Objective (how fast)
• RPO: Recovery Point Objective (how much data loss acceptable)
• Hot, warm, cold sites

**Business Continuity:** Broader—keeps business running during/after disaster`,
    difficulty: 'medium',
    tags: ['backup', 'disaster recovery', 'BCP'],
    reference: 'IT Operations',
  },
  {
    id: 'isc-fc-013',
    section: 'ISC',
    type: 'formula',
    topic: 'Disaster Recovery',
    blueprintArea: 'ISC-IV',
    front: 'What are RTO and RPO?',
    back: `**RTO = Recovery Time Objective**
Maximum acceptable downtime after disaster
"How long can we be down?"

**RPO = Recovery Point Objective**
Maximum acceptable data loss (time)
"How much data can we lose?"

**Example:**
RTO = 4 hours: Systems must be up within 4 hours
RPO = 1 hour: Can only lose up to 1 hour of data

Lower RTO/RPO = more expensive (more frequent backups, faster recovery)`,
    formula: 'RTO = Max Downtime; RPO = Max Data Loss',
    example: 'RPO 1 hour means hourly backups minimum',
    difficulty: 'medium',
    tags: ['RTO', 'RPO', 'disaster recovery'],
    reference: 'Business Continuity',
  },
  // ==========================================
  // CYBERSECURITY
  // ==========================================
  {
    id: 'isc-fc-014',
    section: 'ISC',
    type: 'definition',
    topic: 'Cybersecurity',
    blueprintArea: 'ISC-II',
    front: 'What is MALWARE?',
    back: `**Malware = Malicious Software**

**Types:**
• **Virus:** Attaches to programs, spreads when executed
• **Worm:** Self-replicating, spreads via network
• **Trojan:** Disguised as legitimate software
• **Ransomware:** Encrypts data, demands payment
• **Spyware:** Monitors user activity
• **Rootkit:** Hides in system, gains admin access

**Protection:** Antivirus, patching, user training, email filtering`,
    difficulty: 'easy',
    tags: ['malware', 'virus', 'ransomware'],
    reference: 'Cybersecurity',
  },
  {
    id: 'isc-fc-015',
    section: 'ISC',
    type: 'definition',
    topic: 'Cybersecurity',
    blueprintArea: 'ISC-II',
    front: 'What is PHISHING?',
    back: `**Phishing: Social engineering via deceptive messages**

**Types:**
• **Phishing:** Mass emails impersonating trusted entities
• **Spear Phishing:** Targeted at specific individuals
• **Whaling:** Targeting executives
• **Vishing:** Voice phishing (phone)
• **Smishing:** SMS phishing (text)

**Red Flags:**
Urgency, generic greetings, suspicious links, requests for credentials

**Defense:** Training, email filters, MFA, verification procedures`,
    difficulty: 'easy',
    tags: ['phishing', 'social engineering', 'email'],
    reference: 'Cybersecurity',
  },
  {
    id: 'isc-fc-016',
    section: 'ISC',
    type: 'definition',
    topic: 'Cybersecurity',
    blueprintArea: 'ISC-II',
    front: 'What is DEFENSE IN DEPTH?',
    back: `**Defense in Depth: Multiple layers of security controls**

**Layers:**
1. **Physical:** Locks, badges, cameras
2. **Network:** Firewalls, IDS/IPS, segmentation
3. **Host:** Endpoint protection, patching, hardening
4. **Application:** Input validation, secure coding, WAF
5. **Data:** Encryption, access controls, DLP
6. **User:** Training, policies, access management

If one layer fails, others protect the system`,
    difficulty: 'medium',
    tags: ['defense in depth', 'layers', 'security'],
    reference: 'Security Architecture',
  },
  {
    id: 'isc-fc-017',
    section: 'ISC',
    type: 'definition',
    topic: 'Cybersecurity',
    blueprintArea: 'ISC-II',
    front: 'What is an INTRUSION DETECTION SYSTEM (IDS)?',
    back: `**IDS: Monitors network/system for suspicious activity**

**Types:**
• **Network-based (NIDS):** Monitors network traffic
• **Host-based (HIDS):** Monitors system logs/files

**Detection Methods:**
• **Signature-based:** Known attack patterns
• **Anomaly-based:** Deviations from baseline
• **Heuristic:** Rule-based detection

**IDS vs IPS:**
IDS = Detects and alerts (passive)
IPS = Detects and blocks (active)`,
    difficulty: 'medium',
    tags: ['IDS', 'IPS', 'detection'],
    reference: 'Network Security',
  },
  // ==========================================
  // IT AUDIT & CONTROLS TESTING
  // ==========================================
  {
    id: 'isc-fc-018',
    section: 'ISC',
    type: 'definition',
    topic: 'IT Audit',
    blueprintArea: 'ISC-III',
    front: 'What are COMPUTER-ASSISTED AUDIT TECHNIQUES (CAATs)?',
    back: `**CAATs: Tools for auditing computerized systems**

**Types:**
• **Generalized Audit Software (GAS):** 
  Read/analyze data files (ACL, IDEA)
  - Duplicate detection, gap analysis, aging
  
• **Test Data:** 
  Dummy transactions through live system
  
• **Integrated Test Facility (ITF):**
  Fictitious entity in live system
  
• **Parallel Simulation:**
  Auditor's program processes real data

CAATs enable 100% testing, not sampling`,
    difficulty: 'hard',
    tags: ['CAATs', 'IT audit', 'data analytics'],
    reference: 'IT Audit Standards',
  },
  {
    id: 'isc-fc-019',
    section: 'ISC',
    type: 'concept',
    topic: 'IT Audit',
    blueprintArea: 'ISC-III',
    front: 'What is the SEGREGATION OF DUTIES in IT?',
    back: `**IT Segregation of Duties:**
No single person should have conflicting functions

**Key Separations:**
1. **Development vs. Operations**
   Programmers shouldn't access production
   
2. **Security vs. Operations**
   Security admin separate from system admin
   
3. **Data Entry vs. Authorization**
   Different people input and approve
   
4. **Custody vs. Record-keeping**
   IT operations separate from accounting

**Compensating Controls:** 
If segregation not possible—logging, monitoring, supervision`,
    difficulty: 'medium',
    tags: ['SOD', 'segregation', 'controls'],
    reference: 'Internal Controls',
  },
  {
    id: 'isc-fc-020',
    section: 'ISC',
    type: 'definition',
    topic: 'Change Management',
    blueprintArea: 'ISC-I',
    front: 'What is CHANGE MANAGEMENT in IT?',
    back: `**Change Management:**
Process for controlling changes to IT systems

**Key Controls:**
1. **Request:** Formal change request documented
2. **Approval:** Authorized by management/CAB
3. **Testing:** Changes tested before production
4. **Documentation:** Changes documented
5. **Segregation:** Developer ≠ person moving to production
6. **Rollback:** Plan to reverse if problems

**Emergency Changes:** Expedited process with post-implementation review`,
    difficulty: 'medium',
    tags: ['change management', 'ITGC', 'controls'],
    reference: 'ITIL Framework',
  },
  // ==========================================
  // ADDITIONAL ISC FLASHCARDS
  // ==========================================
  {
    id: 'isc-fc-021',
    section: 'ISC',
    type: 'definition',
    topic: 'Database',
    blueprintArea: 'ISC-IV',
    front: 'What is a RELATIONAL DATABASE?',
    back: `**Relational Database:**
Organizes data in tables with rows and columns

**Key Terms:**
• **Table:** Collection of related data
• **Row (Record):** Single data entry
• **Column (Field):** Attribute/property
• **Primary Key:** Unique identifier for each row
• **Foreign Key:** Links to primary key in another table
• **SQL:** Structured Query Language for access

**ACID Properties:** Atomicity, Consistency, Isolation, Durability`,
    difficulty: 'easy',
    tags: ['database', 'relational', 'SQL'],
    reference: 'Database Management',
  },
  {
    id: 'isc-fc-022',
    section: 'ISC',
    type: 'mnemonic',
    topic: 'Database',
    blueprintArea: 'ISC-IV',
    front: 'What does ACID mean for database transactions?',
    back: `**ACID Properties:**

**A - Atomicity**
Transaction is all-or-nothing (complete or rollback)

**C - Consistency**
Database moves from one valid state to another

**I - Isolation**
Concurrent transactions don't interfere with each other

**D - Durability**
Committed transactions are permanent (survive system failure)

ACID ensures reliable transaction processing`,
    mnemonic: 'ACID - Atomicity, Consistency, Isolation, Durability',
    difficulty: 'medium',
    tags: ['ACID', 'database', 'transactions'],
    reference: 'Database Concepts',
  },
  {
    id: 'isc-fc-023',
    section: 'ISC',
    type: 'definition',
    topic: 'Cloud Computing',
    blueprintArea: 'ISC-V',
    front: 'What are the CLOUD SERVICE MODELS (IaaS, PaaS, SaaS)?',
    back: `**Cloud Service Models:**

**IaaS - Infrastructure as a Service**
• Virtual machines, storage, networking
• Customer manages: OS, apps, data
• Examples: AWS EC2, Azure VMs

**PaaS - Platform as a Service**
• Development platform, runtime environment
• Customer manages: Applications, data
• Examples: Heroku, Google App Engine

**SaaS - Software as a Service**
• Complete applications delivered via web
• Customer manages: Just uses software
• Examples: Salesforce, Office 365, Gmail`,
    difficulty: 'medium',
    tags: ['cloud', 'IaaS', 'PaaS', 'SaaS'],
    reference: 'Cloud Computing',
  },
  {
    id: 'isc-fc-024',
    section: 'ISC',
    type: 'definition',
    topic: 'Cloud Computing',
    blueprintArea: 'ISC-V',
    front: 'What are the CLOUD DEPLOYMENT MODELS?',
    back: `**Cloud Deployment Models:**

**Public Cloud:**
• Shared resources, multi-tenant
• Owned by cloud provider
• Most cost-effective
• Examples: AWS, Azure, GCP

**Private Cloud:**
• Dedicated to single organization
• On-premises or hosted
• More control and security

**Hybrid Cloud:**
• Combination of public and private
• Data/apps can move between

**Community Cloud:**
• Shared by organizations with common needs
• Example: Government cloud`,
    difficulty: 'easy',
    tags: ['cloud', 'deployment', 'public', 'private'],
    reference: 'Cloud Computing',
  },
  {
    id: 'isc-fc-025',
    section: 'ISC',
    type: 'concept',
    topic: 'IT Governance',
    blueprintArea: 'ISC-V',
    front: 'What is COBIT?',
    back: `**COBIT (Control Objectives for IT)**
IT governance and management framework

**Components:**
• Governance Objectives
• Management Objectives
• Design Factors
• Focus Areas

**5 Principles (COBIT 2019):**
1. Meeting stakeholder needs
2. Holistic approach
3. Dynamic governance
4. Governance distinct from management
5. Tailored to enterprise needs

Used for IT audit, compliance, governance`,
    difficulty: 'medium',
    tags: ['COBIT', 'governance', 'framework'],
    reference: 'ISACA COBIT',
  },
  {
    id: 'isc-fc-026',
    section: 'ISC',
    type: 'definition',
    topic: 'Security',
    blueprintArea: 'ISC-II',
    front: 'What is a VPN?',
    back: `**VPN = Virtual Private Network**

Secure, encrypted connection over public network

**Types:**
• **Remote Access VPN:** User connects to corporate network
• **Site-to-Site VPN:** Connects two networks (offices)

**Technologies:**
• IPSec: Network layer encryption
• SSL/TLS VPN: Uses web browser (HTTPS)

**Benefits:**
• Encrypted traffic (privacy)
• Secure remote access
• Bypasses geographic restrictions`,
    difficulty: 'easy',
    tags: ['VPN', 'encryption', 'remote access'],
    reference: 'Network Security',
  },
  {
    id: 'isc-fc-027',
    section: 'ISC',
    type: 'definition',
    topic: 'Security',
    blueprintArea: 'ISC-II',
    front: 'What is HASHING?',
    back: `**Hashing: One-way function producing fixed-length output**

**Characteristics:**
• Deterministic (same input = same output)
• One-way (cannot reverse to get input)
• Fixed length (any input, same size output)
• Collision resistant (different inputs ≠ same hash)

**Common Algorithms:**
• MD5 (128-bit) - deprecated for security
• SHA-256 (256-bit) - current standard
• SHA-3 - newest standard

**Uses:** Password storage, integrity verification, digital signatures`,
    difficulty: 'medium',
    tags: ['hashing', 'SHA', 'integrity'],
    reference: 'Cryptography',
  },
  {
    id: 'isc-fc-028',
    section: 'ISC',
    type: 'definition',
    topic: 'Security',
    blueprintArea: 'ISC-II',
    front: 'What is LEAST PRIVILEGE?',
    back: `**Principle of Least Privilege:**
Users have minimum access needed to perform job

**Implementation:**
• Role-based access control (RBAC)
• Regular access reviews
• Just-in-time access
• Remove access when role changes

**Benefits:**
• Limit damage from compromised accounts
• Reduce insider threat risk
• Meet compliance requirements
• Simplify audit

**Related:** Need-to-know basis`,
    difficulty: 'easy',
    tags: ['least privilege', 'access control', 'security'],
    reference: 'Security Principles',
  },
  {
    id: 'isc-fc-029',
    section: 'ISC',
    type: 'rule',
    topic: 'Compliance',
    blueprintArea: 'ISC-V',
    front: 'What is the NIST Cybersecurity Framework?',
    back: `**NIST CSF - Five Core Functions:**

1. **IDENTIFY**
   Asset management, risk assessment, governance
   
2. **PROTECT**
   Access control, training, data security
   
3. **DETECT**
   Continuous monitoring, detection processes
   
4. **RESPOND**
   Response planning, communications, mitigation
   
5. **RECOVER**
   Recovery planning, improvements

Tiers: Partial → Risk Informed → Repeatable → Adaptive`,
    difficulty: 'hard',
    tags: ['NIST', 'framework', 'cybersecurity'],
    reference: 'NIST SP 800-53',
  },
  {
    id: 'isc-fc-030',
    section: 'ISC',
    type: 'definition',
    topic: 'Data Privacy',
    blueprintArea: 'ISC-IV',
    front: 'What is GDPR?',
    back: `**GDPR - General Data Protection Regulation**
EU data privacy law (effective May 2018)

**Key Requirements:**
• Lawful basis for processing personal data
• Data subject rights (access, erasure, portability)
• Privacy by design and default
• Data breach notification (72 hours)
• Data Protection Officer (DPO) in some cases

**Penalties:**
Up to €20M or 4% of global annual revenue

**Territorial Scope:**
Applies to any organization processing EU residents' data`,
    difficulty: 'medium',
    tags: ['GDPR', 'privacy', 'EU', 'compliance'],
    reference: 'EU GDPR',
  },
];

export default ISC_FLASHCARDS;
