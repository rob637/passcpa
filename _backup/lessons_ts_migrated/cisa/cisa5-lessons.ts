/**
 * CISA Domain 5: Protection of Information Assets (27%)
 * Based on ISACA CISA Review Manual
 * 
 * Key Topics:
 * - Information Security Management
 * - Access Controls
 * - Network Security
 * - Data Protection
 */

import { Lesson } from '../../../types';

export const cisa5Lessons: Lesson[] = [
  // ============================================================================
  // DOMAIN 5A: INFORMATION SECURITY MANAGEMENT
  // ============================================================================
  
  {
    id: 'CISA5-001',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Information Security Governance',
    description: 'Understand security governance structures and management responsibilities',
    order: 1,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Security Governance', 'Security Management', 'Roles and Responsibilities', 'Policies'],
    blueprintArea: 'CISA5-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Security governance ensures security aligns with business objectives. Without proper governance, security becomes either an impediment to business or an afterthought that fails to protect.",
        },
        {
          title: 'Security Governance Framework',
          type: 'text',
          content: "**Key Governance Elements:**\n\n**Strategic Direction**\n• Security strategy aligned with business\n• Risk appetite definition\n• Resource allocation\n• Performance measurement\n\n**Organizational Structure**\n• Clear roles and responsibilities\n• Reporting relationships\n• Accountability framework\n• Segregation of duties\n\n**Policy Framework**\n• Security policies\n• Standards and procedures\n• Guidelines\n• Enforcement mechanisms\n\n**Oversight**\n• Board involvement\n• Management steering\n• Audit and assurance\n• Continuous improvement",
        },
        {
          title: 'Key Security Roles',
          type: 'table',
          headers: ['Role', 'Responsibilities', 'Reports To'],
          rows: [
            ['CISO', 'Security strategy, program oversight', 'CEO/Board'],
            ['Security Manager', 'Day-to-day security operations', 'CISO'],
            ['Data Owner', 'Classification, access decisions', 'Business Unit'],
            ['Data Custodian', 'Implement controls, protect data', 'IT'],
            ['Security Analyst', 'Monitoring, incident response', 'Security Mgr'],
          ],
        },
        {
          title: 'Security Policy Hierarchy',
          type: 'text',
          content: "**Policy Documentation Levels:**\n\n**Policies**\n• High-level statements\n• Management intent\n• Mandatory\n• Reviewed annually\n\n**Standards**\n• Specific requirements\n• Measurable criteria\n• Technology-specific\n• Mandatory\n\n**Procedures**\n• Step-by-step instructions\n• How to implement\n• Role-specific\n• Updated frequently\n\n**Guidelines**\n• Recommendations\n• Best practices\n• Optional/advisory\n• Flexible",
        },
        {
          title: '🧠 Memory Aid: Policy Hierarchy',
          type: 'callout',
          content: "**P-S-P-G:**\n• **P**olicy = High-level what (mandatory)\n• **S**tandards = Specific how much (mandatory)\n• **P**rocedures = Detailed how-to (mandatory)\n• **G**uidelines = Recommended way (optional)\n\n*Policies are strategic; Procedures are tactical*",
        },
        {
          title: 'Security Metrics',
          type: 'text',
          content: "**Measuring Security Effectiveness:**\n\n**Operational Metrics**\n• Incidents detected/resolved\n• Patch compliance percentage\n• Vulnerability remediation time\n• Access review completion\n\n**Risk Metrics**\n• Risk exposure trends\n• Control effectiveness\n• Audit findings\n• Compliance status\n\n**Program Metrics**\n• Awareness training completion\n• Policy acknowledgment\n• Budget utilization\n• Project delivery\n\n**Reporting:**\n• Dashboard for executives\n• Detailed for operations\n• Trend analysis\n• Benchmarking",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Security governance aligns security with business objectives",
            "Structure includes CISO, managers, data owners, custodians",
            "Policy hierarchy: policies, standards, procedures, guidelines",
            "Policies and standards are mandatory; guidelines are advisory",
            "Metrics measure operational effectiveness and risk posture",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-002',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Data Classification and Protection',
    description: 'Learn data classification schemes and protection requirements',
    order: 2,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Data Classification', 'Data Protection', 'Information Handling', 'DLP'],
    blueprintArea: 'CISA5-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Not all data is equal. Classification enables appropriate protection - too little protection risks breaches, too much wastes resources. Classification is the foundation of data protection.",
        },
        {
          title: 'Classification Schemes',
          type: 'table',
          headers: ['Level', 'Commercial', 'Government', 'Impact'],
          rows: [
            ['Highest', 'Confidential', 'Top Secret', 'Severe/catastrophic'],
            ['High', 'Restricted', 'Secret', 'Serious damage'],
            ['Medium', 'Internal', 'Confidential', 'Limited damage'],
            ['Low', 'Public', 'Unclassified', 'No damage'],
          ],
        },
        {
          title: 'Classification Process',
          type: 'text',
          content: "**Classification Steps:**\n\n**1. Inventory**\n• Identify data assets\n• Determine data types\n• Map data locations\n• Document data flows\n\n**2. Classify**\n• Apply classification criteria\n• Data owner assigns level\n• Consider regulatory requirements\n• Document decisions\n\n**3. Label**\n• Mark documents/files\n• Metadata tagging\n• Visual indicators\n• Automated tools\n\n**4. Handle**\n• Apply appropriate controls\n• Storage requirements\n• Transmission security\n• Disposal procedures",
        },
        {
          title: 'Classification Criteria',
          type: 'text',
          content: "**How to Determine Classification:**\n\n**Sensitivity Factors:**\n• Competitive value\n• Personal information\n• Legal/regulatory requirements\n• Contractual obligations\n\n**Impact Assessment:**\n• Financial impact if disclosed\n• Reputational damage\n• Regulatory penalties\n• Operational disruption\n\n**Examples:**\n• **Confidential**: Trade secrets, customer PII, financial data\n• **Internal**: Internal memos, project plans, general business\n• **Public**: Marketing materials, press releases, public filings",
        },
        {
          title: 'Data Protection Controls',
          type: 'text',
          content: "**Protection by Classification:**\n\n**Confidential Data:**\n• Encryption at rest and in transit\n• Strict access control\n• Audit logging\n• DLP monitoring\n• Secure disposal\n\n**Internal Data:**\n• Access control\n• Employee only access\n• Standard encryption\n• Controlled distribution\n\n**Public Data:**\n• Integrity controls\n• Version control\n• Minimal access restrictions\n• Standard handling",
        },
        {
          title: 'Data Loss Prevention (DLP)',
          type: 'text',
          content: "**DLP Components:**\n\n**Network DLP**\n• Monitor network traffic\n• Email scanning\n• Web uploads\n• Protocol inspection\n\n**Endpoint DLP**\n• USB controls\n• Print monitoring\n• Clipboard protection\n• Application control\n\n**Storage DLP**\n• File share scanning\n• Database discovery\n• Cloud storage\n• Data at rest\n\n**Actions:**\n• Alert\n• Block\n• Quarantine\n• Encrypt",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Classification levels: public, internal, restricted, confidential",
            "Data owner is responsible for classification decisions",
            "Protection controls increase with classification level",
            "Classification process: inventory, classify, label, handle",
            "DLP monitors data at network, endpoint, and storage levels",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 5B: ACCESS CONTROL
  // ============================================================================

  {
    id: 'CISA5-003',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Access Control Fundamentals',
    description: 'Master the principles and models of access control',
    order: 3,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Access Control', 'Authentication', 'Authorization', 'AAA'],
    blueprintArea: 'CISA5-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Access control is the gatekeeper of information security. It ensures only authorized users can access resources they need. Weak access control is a leading cause of breaches.",
        },
        {
          title: 'AAA Framework',
          type: 'text',
          content: "**Authentication, Authorization, Accounting:**\n\n**Authentication**\n• Verifies identity\n• \"Who are you?\"\n• Credentials validation\n• Multi-factor options\n\n**Authorization**\n• Determines access rights\n• \"What can you do?\"\n• Based on policies/rules\n• After authentication\n\n**Accounting (Auditing)**\n• Records activities\n• \"What did you do?\"\n• Audit trails\n• Non-repudiation",
        },
        {
          title: 'Authentication Factors',
          type: 'table',
          headers: ['Factor', 'Category', 'Examples'],
          rows: [
            ['Something you know', 'Knowledge', 'Password, PIN, security questions'],
            ['Something you have', 'Possession', 'Token, smart card, phone'],
            ['Something you are', 'Inherence', 'Fingerprint, retina, voice'],
            ['Somewhere you are', 'Location', 'GPS, IP address, network'],
            ['Something you do', 'Behavior', 'Typing pattern, gait'],
          ],
        },
        {
          title: '🧠 Memory Aid: MFA',
          type: 'callout',
          content: "**Multi-Factor Authentication:**\n\nMust be from DIFFERENT categories!\n\n✅ Valid MFA: Password + SMS code (know + have)\n✅ Valid MFA: Fingerprint + smart card (are + have)\n❌ NOT MFA: Password + security question (both \"know\")\n❌ NOT MFA: Two fingerprints (both \"are\")\n\n*Two factors from same category = single-factor*",
        },
        {
          title: 'Access Control Models',
          type: 'text',
          content: "**Access Control Approaches:**\n\n**Discretionary (DAC)**\n• Owner controls access\n• Resource owner decides\n• ACLs common\n• Flexible but risky\n\n**Mandatory (MAC)**\n• System enforces access\n• Labels and clearances\n• Military/government\n• Very restrictive\n\n**Role-Based (RBAC)**\n• Access based on job role\n• Roles assigned permissions\n• Users assigned roles\n• Most common in business\n\n**Attribute-Based (ABAC)**\n• Access based on attributes\n• User, resource, environment\n• Dynamic evaluation\n• Most flexible",
        },
        {
          title: 'Access Control Principles',
          type: 'text',
          content: "**Key Principles:**\n\n**Least Privilege**\n• Minimum access needed\n• Only for required tasks\n• Reduces attack surface\n\n**Need to Know**\n• Access only if required\n• Even if cleared for level\n• Common with MAC\n\n**Separation of Duties**\n• Divide critical functions\n• No single person completes critical task\n• Fraud prevention\n\n**Defense in Depth**\n• Multiple control layers\n• Don't rely on single control\n• Physical + logical + admin",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "AAA = Authentication (who), Authorization (what), Accounting (audit)",
            "Auth factors: know, have, are, where, do - MFA requires different categories",
            "Models: DAC (owner), MAC (labels), RBAC (roles), ABAC (attributes)",
            "Principles: least privilege, need to know, separation of duties",
            "RBAC is most common in business environments",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-004',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Identity and Access Management',
    description: 'Understand IAM systems and identity lifecycle management',
    order: 4,
    duration: 50,
    difficulty: 'advanced',
    topics: ['IAM', 'Identity Lifecycle', 'Provisioning', 'Access Review'],
    blueprintArea: 'CISA5-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IAM is the backbone of access control. It manages who has access to what throughout their employment lifecycle. Poor IAM leads to excessive access and security gaps.",
        },
        {
          title: 'Identity Lifecycle',
          type: 'text',
          content: "**Identity Management Phases:**\n\n**1. Provisioning (Joiner)**\n• Create identity\n• Assign initial access\n• Based on role/position\n• Approval workflow\n\n**2. Maintenance (Mover)**\n• Role changes\n• Access modifications\n• Department transfers\n• Project assignments\n\n**3. Deprovisioning (Leaver)**\n• Disable account\n• Remove access\n• Timely execution\n• Data handoff",
        },
        {
          title: 'IAM Components',
          type: 'table',
          headers: ['Component', 'Function', 'Examples'],
          rows: [
            ['Directory Services', 'Identity store', 'Active Directory, LDAP'],
            ['SSO', 'Single authentication', 'SAML, OAuth, OIDC'],
            ['MFA', 'Strong authentication', 'Tokens, biometrics, push'],
            ['PAM', 'Privileged access', 'CyberArk, BeyondTrust'],
            ['IGA', 'Governance', 'Access certification, provisioning'],
          ],
        },
        {
          title: 'Provisioning Controls',
          type: 'text',
          content: "**Provisioning Best Practices:**\n\n**Approval Workflow**\n• Manager approval\n• Data owner approval\n• Documented requests\n• Audit trail\n\n**Role-Based Provisioning**\n• Standard access by role\n• Birthright access\n• Additional access on request\n• Exceptions documented\n\n**Automated Provisioning**\n• Integration with HR systems\n• Reduces delays\n• Consistent application\n• Fewer errors\n\n**Separation of Duties**\n• Requester ≠ approver\n• Conflicts checked\n• Compensating controls",
        },
        {
          title: 'Access Reviews',
          type: 'text',
          content: "**Access Certification:**\n\n**Why Review:**\n• Privilege creep\n• Job changes\n• Compliance requirements\n• Audit preparation\n\n**Review Types:**\n• **User access review**: All user's access\n• **Resource access review**: All users of a resource\n• **Privileged access review**: Admin accounts\n• **Role review**: Role definitions\n\n**Frequency:**\n• Privileged: Quarterly or more\n• Standard: At least annually\n• High-risk: More frequent\n\n**Process:**\n• Manager/owner reviews\n• Approve or revoke\n• Document decisions\n• Track completion",
        },
        {
          title: 'Privileged Access Management',
          type: 'text',
          content: "**PAM Controls:**\n\n**Credential Management**\n• Vaulting (secure storage)\n• Automatic rotation\n• No shared passwords\n• Just-in-time access\n\n**Session Management**\n• Session recording\n• Keystroke logging\n• Command filtering\n• Time limits\n\n**Monitoring**\n• Real-time monitoring\n• Alerting on anomalies\n• Usage reporting\n• Compliance reporting\n\n**Key Principle:** Privileged accounts are the keys to the kingdom and require extra protection.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Identity lifecycle: provisioning, maintenance, deprovisioning",
            "IAM components: directory, SSO, MFA, PAM, IGA",
            "Provisioning requires approval workflow and documentation",
            "Access reviews combat privilege creep - quarterly for privileged",
            "PAM protects admin accounts with vaulting, monitoring, session control",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-005',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Logical Access Controls',
    description: 'Learn about system-level access controls and security mechanisms',
    order: 5,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Logical Access', 'Operating System Security', 'Database Security', 'Application Security'],
    blueprintArea: 'CISA5-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Logical access controls protect digital resources at the system level. They implement the access policies defined by management through technical mechanisms.",
        },
        {
          title: 'Operating System Security',
          type: 'text',
          content: "**OS Access Controls:**\n\n**User Account Management**\n• Unique user IDs\n• Strong password policies\n• Account lockout\n• Session timeout\n\n**Access Control Lists**\n• File/folder permissions\n• Read, write, execute\n• Owner, group, others\n• Inheritance\n\n**Security Features**\n• Kernel protection\n• Memory protection\n• Process isolation\n• Audit logging\n\n**Hardening**\n• Disable unnecessary services\n• Apply patches\n• Remove default accounts\n• Enable logging",
        },
        {
          title: 'Password Controls',
          type: 'table',
          headers: ['Control', 'Purpose', 'Typical Setting'],
          rows: [
            ['Minimum Length', 'Resist guessing', '12-14+ characters'],
            ['Complexity', 'Resist dictionary attack', 'Mixed case, numbers, symbols'],
            ['Expiration', 'Limit exposure', '90 days (or longer with MFA)'],
            ['History', 'Prevent reuse', 'Remember 12-24 passwords'],
            ['Lockout', 'Resist brute force', '3-5 failed attempts'],
          ],
        },
        {
          title: 'Database Security',
          type: 'text',
          content: "**Database Access Controls:**\n\n**Authentication**\n• Database accounts\n• Integrated authentication\n• Strong passwords\n• No shared accounts\n\n**Authorization**\n• Object-level permissions\n• Row-level security\n• Column-level access\n• Views for data hiding\n\n**Auditing**\n• Login/logout\n• Failed access attempts\n• Schema changes\n• Data modifications\n\n**Additional Controls**\n• Encryption (TDE, column)\n• Input validation\n• Stored procedure security\n• Backup encryption",
        },
        {
          title: 'Application Security Controls',
          type: 'text',
          content: "**Application-Level Access:**\n\n**Authentication**\n• Application login\n• Session management\n• Token handling\n• SSO integration\n\n**Authorization**\n• Feature-level access\n• Data-level access\n• Role-based controls\n• Workflow enforcement\n\n**Session Controls**\n• Session timeout\n• Secure token generation\n• Cookie protection\n• Concurrent session limits\n\n**Input Validation**\n• Prevent injection\n• Whitelisting\n• Encoding output\n• Parameterized queries",
        },
        {
          title: 'Remote Access Security',
          type: 'text',
          content: "**Remote Access Controls:**\n\n**VPN Security**\n• Strong authentication (MFA)\n• Encryption (IPSec, SSL/TLS)\n• Split vs. full tunneling\n• Network access control\n\n**Remote Desktop**\n• MFA required\n• Jump servers/bastion hosts\n• Session recording\n• Limited access\n\n**Cloud Access**\n• Cloud access security broker (CASB)\n• Conditional access policies\n• Device compliance\n• User and entity behavior analytics (UEBA)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "OS security: accounts, ACLs, security features, hardening",
            "Password controls: length, complexity, expiration, history, lockout",
            "Database security: authentication, authorization, auditing, encryption",
            "Application security: session management, input validation, access control",
            "Remote access requires MFA, encryption, and monitoring",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 5C: NETWORK SECURITY
  // ============================================================================

  {
    id: 'CISA5-006',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Network Security Architecture',
    description: 'Understand network security design principles and technologies',
    order: 6,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Network Security', 'Firewalls', 'IDS/IPS', 'Network Segmentation'],
    blueprintArea: 'CISA5-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Network security controls the flow of traffic between systems and networks. Defense in depth at the network layer creates multiple barriers for attackers.",
        },
        {
          title: 'Firewall Types',
          type: 'table',
          headers: ['Type', 'Description', 'OSI Layer'],
          rows: [
            ['Packet Filter', 'IP/port-based filtering', 'Layer 3-4'],
            ['Stateful', 'Track connection state', 'Layer 3-4'],
            ['Application Proxy', 'Full traffic inspection', 'Layer 7'],
            ['Next-Gen (NGFW)', 'App awareness, IPS, identity', 'Layer 3-7'],
            ['Web Application (WAF)', 'HTTP/HTTPS protection', 'Layer 7'],
          ],
        },
        {
          title: 'Firewall Rules',
          type: 'text',
          content: "**Firewall Rule Best Practices:**\n\n**Rule Structure**\n• Source address\n• Destination address\n• Port/protocol\n• Action (allow/deny)\n• Logging\n\n**Rule Order**\n• Most specific first\n• Most used near top\n• Deny rules before allows\n• Default deny at end\n\n**Maintenance**\n• Regular rule review\n• Remove unused rules\n• Document rule purpose\n• Change control\n\n**Common Mistakes:**\n• Overly permissive rules\n• Any-any rules\n• Orphaned rules\n• No default deny",
        },
        {
          title: 'IDS vs. IPS',
          type: 'text',
          content: "**Intrusion Detection/Prevention:**\n\n**IDS (Detection)**\n• Monitors traffic\n• Generates alerts\n• Passive (mirror/tap)\n• No traffic blocking\n• Requires human response\n\n**IPS (Prevention)**\n• Monitors and blocks\n• Active inline\n• Real-time prevention\n• Can cause disruption\n• Automatic response\n\n**Detection Methods:**\n• **Signature-based**: Known attack patterns\n• **Anomaly-based**: Deviation from baseline\n• **Heuristic**: Behavioral analysis\n\n**Placement:**\n• Network perimeter\n• Between zones\n• Critical segments\n• Host-based (HIDS/HIPS)",
        },
        {
          title: 'Network Segmentation',
          type: 'text',
          content: "**Segmentation Strategies:**\n\n**VLANs**\n• Logical separation\n• Layer 2 partitioning\n• ACLs between VLANs\n• Reduces broadcast domain\n\n**Zones**\n• DMZ for public services\n• Internal zones\n• Secure zones for sensitive\n• Management network\n\n**Microsegmentation**\n• Granular control\n• Workload isolation\n• East-west traffic control\n• Zero trust approach\n\n**Benefits:**\n• Contain breaches\n• Reduce attack surface\n• Compliance isolation\n• Traffic visibility",
        },
        {
          title: 'Zero Trust Architecture',
          type: 'text',
          content: "**Zero Trust Principles:**\n\n**Core Concepts:**\n• \"Never trust, always verify\"\n• Verify explicitly\n• Least privilege access\n• Assume breach\n\n**Key Components:**\n• Identity verification\n• Device validation\n• Continuous authentication\n• Microsegmentation\n• Encryption everywhere\n\n**Implementation:**\n• Identity-based access\n• Device health checks\n• Application-level access\n• No implicit trust\n• Monitor all traffic\n\n**Benefits:**\n• Reduced attack surface\n• Contained breaches\n• Improved visibility\n• Flexible architecture",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Firewall types: packet filter, stateful, proxy, NGFW, WAF",
            "Firewall rules: specific first, default deny last",
            "IDS detects and alerts; IPS detects and blocks",
            "Segmentation contains breaches and reduces attack surface",
            "Zero trust: never trust, always verify, assume breach",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-007',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Cryptography Fundamentals',
    description: 'Master encryption concepts and cryptographic controls',
    order: 7,
    duration: 60,
    difficulty: 'advanced',
    topics: ['Cryptography', 'Encryption', 'Digital Signatures', 'PKI'],
    blueprintArea: 'CISA5-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Cryptography protects data confidentiality, integrity, and authenticity. It's the foundation of secure communications, data protection, and digital trust.",
        },
        {
          title: 'Encryption Types',
          type: 'table',
          headers: ['Type', 'Key Usage', 'Speed', 'Use Cases'],
          rows: [
            ['Symmetric', 'Same key encrypt/decrypt', 'Fast', 'Bulk data, file encryption'],
            ['Asymmetric', 'Public/private key pair', 'Slow', 'Key exchange, signatures'],
            ['Hashing', 'No key (one-way)', 'Fast', 'Integrity, passwords'],
          ],
        },
        {
          title: 'Common Algorithms',
          type: 'text',
          content: "**Algorithm Categories:**\n\n**Symmetric (Secret Key)**\n• AES (128, 192, 256-bit) - Current standard\n• 3DES - Legacy, deprecated\n• DES - Obsolete, never use\n• RC4 - Broken, deprecated\n\n**Asymmetric (Public Key)**\n• RSA - Digital signatures, key exchange\n• ECC - Efficient, smaller keys\n• Diffie-Hellman - Key exchange\n• DSA - Digital signatures\n\n**Hashing**\n• SHA-256, SHA-3 - Current standards\n• SHA-1 - Deprecated, avoid\n• MD5 - Broken, never for security\n\n**⚠️ CISA Tip:** Know which are weak/deprecated!",
        },
        {
          title: '🧠 Memory Aid: Symmetric vs Asymmetric',
          type: 'callout',
          content: "**Symmetric = Same key** (one key, both parties)\n• Fast for bulk data\n• Key distribution problem\n• Examples: AES, 3DES\n\n**Asymmetric = A pair of keys** (public + private)\n• Slower but solves key distribution\n• Public encrypts, private decrypts\n• Examples: RSA, ECC\n\n*Use asymmetric to exchange symmetric keys, then symmetric for data!*",
        },
        {
          title: 'Digital Signatures',
          type: 'text',
          content: "**Digital Signature Process:**\n\n**Signing (Sender)**\n1. Hash the message\n2. Encrypt hash with private key\n3. Attach encrypted hash to message\n4. Send message + signature\n\n**Verification (Receiver)**\n1. Decrypt signature with sender's public key\n2. Hash the received message\n3. Compare hashes\n4. Match = authentic and unchanged\n\n**Provides:**\n• **Integrity** - Message unchanged\n• **Authentication** - From claimed sender\n• **Non-repudiation** - Sender can't deny\n\n**Note:** Does NOT provide confidentiality (use encryption for that)",
        },
        {
          title: 'PKI Components',
          type: 'text',
          content: "**Public Key Infrastructure:**\n\n**Certificate Authority (CA)**\n• Issues certificates\n• Validates identity\n• Maintains CRL\n• Revokes certificates\n\n**Registration Authority (RA)**\n• Verifies identity\n• Forwards to CA\n• Administrative role\n\n**Certificate**\n• Public key\n• Owner identity\n• CA signature\n• Validity period\n\n**Trust Model:**\n• Root CA (self-signed)\n• Subordinate CAs\n• End-entity certificates\n• Certificate chain",
        },
        {
          title: 'Key Management',
          type: 'text',
          content: "**Key Lifecycle:**\n\n**Generation**\n• Sufficient key length\n• Secure random generation\n• Secure environment\n\n**Distribution**\n• Secure key exchange\n• Out-of-band verification\n• Key encryption keys\n\n**Storage**\n• Hardware security modules (HSM)\n• Key vaults\n• Encryption of keys\n• Access control\n\n**Rotation**\n• Regular replacement\n• Crypto-period limits\n• Automated where possible\n\n**Destruction**\n• Secure deletion\n• All copies\n• Audit trail",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Symmetric = same key (fast); Asymmetric = key pair (solves distribution)",
            "Current standards: AES (symmetric), RSA/ECC (asymmetric), SHA-256 (hash)",
            "Digital signatures provide integrity, authentication, non-repudiation",
            "PKI uses CAs to issue and manage certificates",
            "Key management covers generation, distribution, storage, rotation, destruction",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-008',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Internet and Web Security',
    description: 'Understand web application security and internet threats',
    order: 8,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Web Security', 'Email Security', 'Internet Threats', 'Secure Protocols'],
    blueprintArea: 'CISA5-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The internet is the primary attack vector for most organizations. Web applications and email are the most common entry points for attackers.",
        },
        {
          title: 'Common Web Vulnerabilities',
          type: 'table',
          headers: ['Vulnerability', 'Description', 'Mitigation'],
          rows: [
            ['SQL Injection', 'Malicious SQL in input', 'Parameterized queries, validation'],
            ['XSS', 'Malicious scripts injected', 'Output encoding, CSP'],
            ['CSRF', 'Unauthorized actions', 'Anti-CSRF tokens, SameSite cookies'],
            ['Broken Auth', 'Session/credential flaws', 'Strong session mgmt, MFA'],
            ['Security Misconfig', 'Default/insecure settings', 'Hardening, secure defaults'],
          ],
        },
        {
          title: 'OWASP Top 10 Overview',
          type: 'text',
          content: "**Key Web Vulnerabilities:**\n\n**Injection**\n• SQL, OS, LDAP injection\n• Untrusted data as commands\n• Parameterized queries prevent\n\n**Broken Authentication**\n• Weak credentials\n• Session fixation\n• Credential stuffing\n\n**Sensitive Data Exposure**\n• Unencrypted data\n• Weak crypto\n• Missing TLS\n\n**XML External Entities (XXE)**\n• XML parser attacks\n• File disclosure\n• Disable external entities\n\n**Broken Access Control**\n• Missing authorization checks\n• IDOR (Insecure Direct Object Reference)\n• Enforce access control server-side",
        },
        {
          title: 'Email Security',
          type: 'text',
          content: "**Email Protection:**\n\n**Spam/Phishing Protection**\n• Spam filters\n• Phishing detection\n• Link analysis\n• Sandboxing attachments\n\n**Email Authentication**\n• **SPF** - Sender Policy Framework (authorized senders)\n• **DKIM** - DomainKeys (email signing)\n• **DMARC** - Domain-based authentication\n\n**Encryption**\n• TLS for transport\n• S/MIME for message encryption\n• PGP for end-to-end\n\n**DLP Integration**\n• Content inspection\n• Sensitive data detection\n• Policy enforcement",
        },
        {
          title: 'Secure Protocols',
          type: 'text',
          content: "**Protocol Security:**\n\n**Secure Alternatives:**\n• HTTP → HTTPS (TLS)\n• FTP → SFTP or FTPS\n• Telnet → SSH\n• SMTP → SMTP with TLS\n• DNS → DNS over HTTPS (DoH)\n\n**TLS Best Practices:**\n• TLS 1.2 minimum (1.3 preferred)\n• Strong cipher suites\n• Disable weak algorithms\n• Certificate validation\n\n**VPN Protocols:**\n• IPSec - Network layer\n• SSL/TLS VPN - Application layer\n• WireGuard - Modern, fast\n• Deprecated: PPTP (never use)",
        },
        {
          title: 'Web Security Controls',
          type: 'text',
          content: "**Web Protection Mechanisms:**\n\n**WAF (Web Application Firewall)**\n• HTTP/HTTPS inspection\n• Attack signature blocking\n• Virtual patching\n• Rate limiting\n\n**Secure Headers**\n• Content-Security-Policy (CSP)\n• HTTP Strict Transport Security (HSTS)\n• X-Frame-Options\n• X-Content-Type-Options\n\n**Bot Protection**\n• CAPTCHA\n• Rate limiting\n• Behavioral analysis\n• IP reputation\n\n**CDN Security**\n• DDoS protection\n• Origin hiding\n• Edge caching\n• SSL termination",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "OWASP Top 10: injection, broken auth, XSS, sensitive data exposure, etc.",
            "Email security: SPF, DKIM, DMARC for authentication; TLS/S/MIME for encryption",
            "Use secure protocol versions: HTTPS, SFTP, SSH, TLS 1.2+",
            "WAF provides application-layer protection for web apps",
            "Security headers (CSP, HSTS) provide browser-enforced protection",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-009',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Physical and Environmental Security',
    description: 'Learn physical security controls for protecting information assets',
    order: 9,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Physical Security', 'Environmental Controls', 'Access Control', 'Surveillance'],
    blueprintArea: 'CISA5-D',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Physical security is the first line of defense. The best cybersecurity is worthless if an attacker can physically access your systems.",
        },
        {
          title: 'Physical Security Layers',
          type: 'table',
          headers: ['Layer', 'Controls', 'Purpose'],
          rows: [
            ['Perimeter', 'Fencing, lighting, barriers', 'Deter and delay'],
            ['Building', 'Locks, guards, reception', 'Access control'],
            ['Floor/Zone', 'Badge access, cameras', 'Restrict movement'],
            ['Room', 'Special access, mantrap', 'Protect critical areas'],
            ['Asset', 'Locks, cables, cages', 'Protect specific items'],
          ],
        },
        {
          title: 'Access Control Methods',
          type: 'text',
          content: "**Physical Access Controls:**\n\n**Mechanical**\n• Locks and keys\n• Combination locks\n• Master key systems\n\n**Electronic**\n• Badge/card access\n• PIN codes\n• Biometric (fingerprint, retina, face)\n• Smart cards\n\n**Procedural**\n• Visitor logs\n• Escort requirements\n• Sign-in/sign-out\n• Tailgating prevention\n\n**Mantrap/Airlock**\n• Two-door system\n• One open at a time\n• Forces authentication\n• Prevents tailgating",
        },
        {
          title: 'Surveillance Systems',
          type: 'text',
          content: "**Surveillance Components:**\n\n**CCTV**\n• Monitor entry/exit\n• Record for evidence\n• Deter behaviors\n• Integration with access control\n\n**Camera Types**\n• Fixed vs. PTZ (pan-tilt-zoom)\n• IP vs. analog\n• Indoor vs. outdoor\n• Visible vs. covert\n\n**Recording**\n• Retention period\n• Storage requirements\n• Secure access\n• Chain of custody\n\n**Monitoring**\n• Real-time viewing\n• Motion detection\n• Analytics\n• Guard station",
        },
        {
          title: 'Environmental Threats',
          type: 'text',
          content: "**Environmental Risks:**\n\n**Fire**\n• Detection systems\n• Suppression (clean agent, water)\n• Prevention (no combustibles)\n• Evacuation procedures\n\n**Water**\n• Flood risk assessment\n• Water detection sensors\n• Raised floors\n• Equipment placement\n\n**Climate**\n• Temperature control (64-75°F / 18-24°C)\n• Humidity control (40-60%)\n• HVAC redundancy\n• Hot/cold aisle containment\n\n**Power**\n• UPS (short-term)\n• Generator (long-term)\n• Surge protection\n• Redundant feeds",
        },
        {
          title: 'Mobile Device Physical Security',
          type: 'text',
          content: "**Protecting Mobile Assets:**\n\n**Laptops**\n• Cable locks\n• Encrypted drives\n• Asset tracking\n• Remote wipe capability\n\n**Phones/Tablets**\n• MDM enrollment\n• Screen lock required\n• Encryption\n• Find/remote wipe\n\n**Media**\n• Secure storage\n• Encryption\n• Proper disposal\n• Chain of custody\n\n**Travel Security**\n• Never leave unattended\n• Hotel safe usage\n• Customs considerations\n• VPN usage on public WiFi",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Physical security uses defense in depth with multiple layers",
            "Access controls: mechanical, electronic, procedural",
            "Surveillance provides deterrence, detection, and evidence",
            "Environmental controls: fire, water, climate, power",
            "Mobile devices need encryption, MDM, and remote wipe",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-010',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Security Awareness and Training',
    description: 'Understand security awareness program design and delivery',
    order: 10,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Security Awareness', 'Training Programs', 'Social Engineering', 'Culture'],
    blueprintArea: 'CISA5-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "People are often the weakest link in security. Awareness training transforms employees from security liabilities into security assets. Technical controls alone cannot stop social engineering.",
        },
        {
          title: 'Awareness vs. Training',
          type: 'table',
          headers: ['Aspect', 'Awareness', 'Training'],
          rows: [
            ['Goal', 'Understand importance', 'Build skills'],
            ['Audience', 'All employees', 'Specific roles'],
            ['Depth', 'General concepts', 'Detailed procedures'],
            ['Method', 'Posters, emails, videos', 'Hands-on, courses'],
            ['Outcome', 'Behavior change', 'Task performance'],
          ],
        },
        {
          title: 'Awareness Program Elements',
          type: 'text',
          content: "**Effective Awareness Programs:**\n\n**Content Topics:**\n• Password security\n• Phishing recognition\n• Data handling\n• Physical security\n• Reporting procedures\n• Social media risks\n\n**Delivery Methods:**\n• Online modules\n• Live presentations\n• Newsletters/emails\n• Posters and screensavers\n• Gamification\n• Phishing simulations\n\n**Measurement:**\n• Completion rates\n• Assessment scores\n• Phishing test results\n• Incident trends\n• Reported suspicious activity",
        },
        {
          title: 'Social Engineering Threats',
          type: 'text',
          content: "**Social Engineering Techniques:**\n\n**Phishing**\n• Email-based deception\n• Fake login pages\n• Malicious attachments\n• Urgent calls to action\n\n**Spear Phishing**\n• Targeted at individuals\n• Personalized content\n• Higher success rate\n• Research-based\n\n**Vishing**\n• Voice phishing\n• Phone-based attacks\n• Impersonation\n• Urgency tactics\n\n**Pretexting**\n• Fabricated scenario\n• Builds trust over time\n• Information gathering\n• Authority impersonation\n\n**Baiting**\n• Enticing offers\n• Infected USB drives\n• Malicious downloads",
        },
        {
          title: 'Building Security Culture',
          type: 'text',
          content: "**Culture Components:**\n\n**Leadership**\n• Executive sponsorship\n• Visible commitment\n• Budget allocation\n• Tone from top\n\n**Communication**\n• Regular messaging\n• Clear expectations\n• Open reporting\n• No blame culture\n\n**Reinforcement**\n• Recognition programs\n• Positive feedback\n• Consistent enforcement\n• Continuous improvement\n\n**Integration**\n• Part of onboarding\n• Ongoing refresher\n• Performance objectives\n• Business alignment",
        },
        {
          title: 'Training for Technical Roles',
          type: 'text',
          content: "**Role-Specific Training:**\n\n**Developers**\n• Secure coding practices\n• OWASP Top 10\n• Security testing\n• Code review\n\n**System Administrators**\n• Hardening procedures\n• Patch management\n• Incident response\n• Monitoring\n\n**Help Desk**\n• Social engineering recognition\n• Verification procedures\n• Escalation protocols\n• Documentation\n\n**Executives**\n• Risk management\n• Compliance requirements\n• Incident handling\n• Business email compromise",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Awareness builds understanding; training builds skills",
            "Effective programs use multiple delivery methods",
            "Social engineering attacks people, not technology",
            "Security culture requires leadership commitment",
            "Role-specific training addresses unique risks per job function",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-011',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Malware and Endpoint Security',
    description: 'Understand malware types and endpoint protection strategies',
    order: 11,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Malware', 'Antivirus', 'Endpoint Protection', 'EDR'],
    blueprintArea: 'CISA5-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Malware is a primary attack vector. Endpoints are where users work and where data lives. Protecting endpoints is essential for overall security.",
        },
        {
          title: 'Malware Types',
          type: 'table',
          headers: ['Type', 'Behavior', 'Propagation'],
          rows: [
            ['Virus', 'Infects files, requires host', 'User action, files'],
            ['Worm', 'Self-replicates', 'Network, no user action'],
            ['Trojan', 'Disguised as legitimate', 'Social engineering'],
            ['Ransomware', 'Encrypts data, demands ransom', 'Email, exploits'],
            ['Spyware', 'Collects information', 'Bundled software'],
            ['Rootkit', 'Hides presence, deep access', 'Exploits, trojans'],
          ],
        },
        {
          title: 'Malware Behavior',
          type: 'text',
          content: "**How Malware Works:**\n\n**Initial Access**\n• Phishing emails\n• Malicious downloads\n• Infected USB drives\n• Exploit kits\n\n**Execution**\n• User runs file\n• Exploit vulnerability\n• Script execution\n• Macro activation\n\n**Persistence**\n• Registry modifications\n• Scheduled tasks\n• Startup programs\n• Boot sector infection\n\n**Actions**\n• Data theft\n• Encryption (ransomware)\n• Botnet enrollment\n• Lateral movement\n• Cryptocurrency mining",
        },
        {
          title: 'Antivirus Approaches',
          type: 'text',
          content: "**Detection Methods:**\n\n**Signature-Based**\n• Known malware patterns\n• Fast detection\n• Requires updates\n• Misses zero-day\n\n**Heuristic**\n• Detect suspicious behavior\n• Catches variants\n• False positives possible\n• More resource intensive\n\n**Behavioral**\n• Monitors execution\n• Detects actual malice\n• Real-time protection\n• Can stop unknown threats\n\n**Machine Learning**\n• Pattern recognition\n• Adapts over time\n• Reduces false positives\n• Cloud-powered",
        },
        {
          title: 'Endpoint Detection and Response (EDR)',
          type: 'text',
          content: "**EDR Capabilities:**\n\n**Detection**\n• Real-time monitoring\n• Behavioral analysis\n• Threat correlation\n• Indicator matching\n\n**Response**\n• Isolate endpoint\n• Terminate processes\n• Quarantine files\n• Collect forensic data\n\n**Investigation**\n• Process trees\n• Timeline analysis\n• Network connections\n• File modifications\n\n**Hunting**\n• Proactive threat search\n• IOC queries\n• Pattern analysis\n• Historical data search",
        },
        {
          title: 'Endpoint Protection Best Practices',
          type: 'text',
          content: "**Endpoint Security Controls:**\n\n**Prevention**\n• Updated antivirus/EDR\n• Application whitelisting\n• Least privilege\n• Host-based firewall\n\n**Detection**\n• Real-time monitoring\n• Behavioral analytics\n• Log collection\n• Alerting\n\n**Response**\n• Incident response plan\n• Isolation capability\n• Remediation procedures\n• Evidence collection\n\n**Maintenance**\n• Patch management\n• Configuration hardening\n• Regular scanning\n• Policy updates",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Malware types: virus, worm, trojan, ransomware, spyware, rootkit",
            "AV methods: signature, heuristic, behavioral, machine learning",
            "EDR adds detection, response, and investigation capabilities",
            "Defense in depth: prevention, detection, response, maintenance",
            "Behavioral detection catches unknown (zero-day) threats",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-012',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Security Monitoring and Logging',
    description: 'Master security event management and monitoring practices',
    order: 12,
    duration: 50,
    difficulty: 'advanced',
    topics: ['SIEM', 'Log Management', 'Security Monitoring', 'Threat Detection'],
    blueprintArea: 'CISA5-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "You can't protect what you can't see. Security monitoring provides visibility into threats and attacks. Effective logging is essential for detection and forensics.",
        },
        {
          title: 'Log Management',
          type: 'text',
          content: "**Log Management Process:**\n\n**Collection**\n• Identify log sources\n• Configure logging\n• Secure transport\n• Normalize format\n\n**Storage**\n• Centralized repository\n• Secure storage\n• Retention policies\n• Archive management\n\n**Protection**\n• Integrity verification\n• Access controls\n• Encryption\n• Tampering prevention\n\n**Analysis**\n• Search and query\n• Correlation\n• Alerting\n• Reporting",
        },
        {
          title: 'Key Log Sources',
          type: 'table',
          headers: ['Source', 'Key Events', 'Importance'],
          rows: [
            ['OS/Server', 'Logins, process, changes', 'System security'],
            ['Network', 'Connections, flows, drops', 'Traffic analysis'],
            ['Application', 'Transactions, errors', 'Business context'],
            ['Security', 'AV, IDS, firewall', 'Threat detection'],
            ['Database', 'Access, queries, changes', 'Data protection'],
          ],
        },
        {
          title: 'SIEM Overview',
          type: 'text',
          content: "**Security Information and Event Management:**\n\n**Core Functions:**\n• Log aggregation\n• Event correlation\n• Alerting\n• Dashboards\n• Reporting\n• Incident workflow\n\n**Correlation Use Cases:**\n• Brute force detection\n• Privilege escalation\n• Lateral movement\n• Data exfiltration\n• Compliance monitoring\n\n**Benefits:**\n• Centralized visibility\n• Real-time detection\n• Historical analysis\n• Compliance reporting\n• Incident investigation",
        },
        {
          title: 'Monitoring Best Practices',
          type: 'text',
          content: "**Effective Monitoring:**\n\n**What to Monitor:**\n• Authentication events\n• Privileged activity\n• Changes to security settings\n• Network anomalies\n• Data access patterns\n\n**Alert Management:**\n• Tune to reduce false positives\n• Prioritize by risk\n• Define response procedures\n• Escalation paths\n\n**Operations:**\n• 24/7 coverage for critical\n• Defined SLAs\n• Trained analysts\n• Documented runbooks\n\n**Continuous Improvement:**\n• Regular rule tuning\n• New threat indicators\n• Lessons learned\n• Red team findings",
        },
        {
          title: 'Threat Intelligence',
          type: 'text',
          content: "**Using Threat Intelligence:**\n\n**Types:**\n• **Strategic**: High-level trends, planning\n• **Tactical**: TTPs, attack methods\n• **Operational**: Campaign details\n• **Technical**: IOCs, signatures\n\n**Sources:**\n• Commercial feeds\n• Open source (OSINT)\n• ISACs (industry sharing)\n• Government (CISA, FBI)\n• Internal research\n\n**Integration:**\n• SIEM correlation\n• Firewall/IPS rules\n• Email security\n• Endpoint detection\n\n**IOC Types:**\n• IP addresses\n• Domains/URLs\n• File hashes\n• Email addresses\n• Behavioral patterns",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Log management: collect, store, protect, analyze",
            "SIEM provides aggregation, correlation, alerting, and reporting",
            "Monitor authentication, privileged activity, changes, anomalies",
            "Threat intelligence: strategic, tactical, operational, technical",
            "Continuous tuning reduces false positives and improves detection",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-013',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Cloud Security',
    description: 'Understand cloud security controls and shared responsibility',
    order: 13,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Cloud Security', 'Shared Responsibility', 'Cloud Controls', 'Cloud Governance'],
    blueprintArea: 'CISA5-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Cloud computing changes security responsibilities. Understanding what the provider secures versus what you secure is critical for avoiding gaps.",
        },
        {
          title: 'Shared Responsibility Model',
          type: 'table',
          headers: ['Layer', 'IaaS', 'PaaS', 'SaaS'],
          rows: [
            ['Data classification', 'Customer', 'Customer', 'Customer'],
            ['Identity/access', 'Customer', 'Customer', 'Shared'],
            ['Application', 'Customer', 'Shared', 'Provider'],
            ['Operating System', 'Customer', 'Provider', 'Provider'],
            ['Network controls', 'Shared', 'Provider', 'Provider'],
            ['Physical', 'Provider', 'Provider', 'Provider'],
          ],
        },
        {
          title: '🧠 Memory Aid: Cloud Models',
          type: 'callout',
          content: "**IaaS = Infrastructure** - You manage OS up\nExample: AWS EC2, Azure VMs\n\n**PaaS = Platform** - Provider manages through runtime\nExample: Azure App Service, Heroku\n\n**SaaS = Software** - Provider manages everything\nExample: Salesforce, Office 365\n\n*More \"aaS\" = Less you manage = More provider responsibility*",
        },
        {
          title: 'Cloud Security Controls',
          type: 'text',
          content: "**Key Cloud Controls:**\n\n**Identity and Access**\n• IAM policies\n• MFA enforcement\n• Least privilege\n• Federated identity\n\n**Network Security**\n• VPC/virtual networks\n• Security groups\n• Network ACLs\n• Private endpoints\n\n**Data Protection**\n• Encryption at rest/transit\n• Key management\n• Data classification\n• DLP\n\n**Monitoring**\n• Cloud-native logging\n• SIEM integration\n• Alerts and dashboards\n• Compliance reporting",
        },
        {
          title: 'Cloud Governance',
          type: 'text',
          content: "**Governing Cloud Use:**\n\n**Policy Framework**\n• Approved providers\n• Approved services\n• Classification requirements\n• Security standards\n\n**Risk Assessment**\n• Vendor due diligence\n• Data location concerns\n• Compliance requirements\n• Exit strategy\n\n**Monitoring**\n• Shadow IT detection\n• Usage monitoring\n• Cost management\n• Compliance verification\n\n**Vendor Management**\n• Contract terms\n• SLAs\n• Right to audit\n• Subprocessor management",
        },
        {
          title: 'CASB (Cloud Access Security Broker)',
          type: 'text',
          content: "**CASB Functions:**\n\n**Visibility**\n• Shadow IT discovery\n• Usage analytics\n• Risk scoring\n• User behavior\n\n**Compliance**\n• DLP enforcement\n• Encryption\n• Access controls\n• Regulatory compliance\n\n**Threat Protection**\n• Malware detection\n• Anomaly detection\n• Data exfiltration prevention\n• Account compromise\n\n**Deployment:**\n• API-based (out-of-band)\n• Proxy-based (inline)\n• Agent-based (endpoint)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Shared responsibility varies by model (IaaS, PaaS, SaaS)",
            "Customer always responsible for data classification",
            "Cloud controls: IAM, network, data protection, monitoring",
            "Governance includes policy, risk assessment, monitoring",
            "CASB provides visibility, compliance, and threat protection for cloud",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-014',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Privacy and Data Protection',
    description: 'Understand privacy principles and data protection regulations',
    order: 14,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Privacy', 'Data Protection', 'GDPR', 'Privacy by Design'],
    blueprintArea: 'CISA5-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Privacy regulations are expanding globally with significant penalties. Organizations must protect personal data not only for compliance but for customer trust.",
        },
        {
          title: 'Privacy Principles',
          type: 'text',
          content: "**Core Privacy Principles:**\n\n**Collection Limitation**\n• Collect only what's needed\n• Lawful and fair means\n• With knowledge/consent\n\n**Purpose Specification**\n• Stated purpose at collection\n• No use beyond purpose\n\n**Use Limitation**\n• Use only for stated purpose\n• Unless consent or law\n\n**Data Quality**\n• Accurate and complete\n• Current as needed\n\n**Security Safeguards**\n• Protect against loss/misuse\n• Appropriate controls\n\n**Openness**\n• Transparent practices\n• Available policies\n\n**Individual Participation**\n• Access to own data\n• Ability to correct\n\n**Accountability**\n• Organization responsible\n• Demonstrable compliance",
        },
        {
          title: 'Key Regulations',
          type: 'table',
          headers: ['Regulation', 'Jurisdiction', 'Key Focus'],
          rows: [
            ['GDPR', 'EU/EEA', 'Comprehensive data protection'],
            ['CCPA/CPRA', 'California', 'Consumer privacy rights'],
            ['HIPAA', 'US Healthcare', 'Protected health information'],
            ['PIPEDA', 'Canada', 'Commercial privacy'],
            ['LGPD', 'Brazil', 'Personal data protection'],
          ],
        },
        {
          title: 'GDPR Key Requirements',
          type: 'text',
          content: "**GDPR Fundamentals:**\n\n**Lawful Basis for Processing**\n• Consent\n• Contract\n• Legal obligation\n• Vital interests\n• Public task\n• Legitimate interests\n\n**Data Subject Rights**\n• Access\n• Rectification\n• Erasure (\"Right to be forgotten\")\n• Portability\n• Object to processing\n\n**Organization Requirements**\n• Data protection officer (if required)\n• Privacy impact assessments\n• Breach notification (72 hours)\n• Records of processing\n• Privacy by design\n\n**Penalties:**\n• Up to 4% annual global revenue or €20M",
        },
        {
          title: 'Privacy by Design',
          type: 'text',
          content: "**PbD Principles:**\n\n**1. Proactive not Reactive**\n• Prevent privacy issues\n• Not just respond to them\n\n**2. Default Privacy**\n• Maximum privacy by default\n• No action required by user\n\n**3. Embedded in Design**\n• Built into systems\n• Not bolted on after\n\n**4. Full Functionality**\n• Privacy AND functionality\n• Not zero-sum tradeoff\n\n**5. End-to-End Security**\n• Cradle to grave protection\n• Throughout data lifecycle\n\n**6. Visibility and Transparency**\n• Open practices\n• Subject to verification\n\n**7. User-Centric**\n• Respect user privacy\n• User-friendly options",
        },
        {
          title: 'Privacy Impact Assessment',
          type: 'text',
          content: "**PIA Process:**\n\n**When Required:**\n• New processing activities\n• High-risk processing\n• New technology\n• Large-scale processing\n\n**Assessment Elements:**\n• Description of processing\n• Purpose and necessity\n• Risks to individuals\n• Mitigation measures\n• Stakeholder input\n\n**Outcomes:**\n• Risk acceptance\n• Risk mitigation\n• Process changes\n• Controls implementation\n• Consultation with DPA",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Privacy principles: collection/use limitation, security, accountability",
            "GDPR requires lawful basis, data subject rights, breach notification",
            "Privacy by Design embeds privacy into systems proactively",
            "PIA assesses privacy risks of new processing activities",
            "Penalties for violations can be significant (up to 4% revenue)",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 5E: EMERGING TECHNOLOGY SECURITY
  // ============================================================================

  {
    id: 'CISA5-017',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'AI and Machine Learning Security',
    description: 'Security considerations for artificial intelligence and machine learning systems',
    order: 17,
    duration: 55,
    difficulty: 'advanced',
    topics: ['AI Security', 'ML Security', 'Model Governance', 'AI Ethics', 'Adversarial Attacks'],
    blueprintArea: 'CISA5-E',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "AI/ML systems are increasingly integrated into business-critical applications. Understanding their unique security risks is essential for auditors as these systems can make decisions affecting customers, operations, and compliance.",
        },
        {
          title: 'AI/ML Security Risks',
          type: 'text',
          content: "**Key Risk Categories:**\n\n**Data Risks**\n• Training data poisoning\n• Data leakage from models\n• Bias in training data\n• Privacy violations\n• Inadequate data provenance\n\n**Model Risks**\n• Model theft/extraction\n• Adversarial attacks\n• Model drift and degradation\n• Unexplainable decisions\n• Overfitting vulnerabilities\n\n**Operational Risks**\n• Hallucinations/fabrications\n• Prompt injection attacks\n• Unauthorized model access\n• Lack of human oversight\n• Integration vulnerabilities",
        },
        {
          title: 'AI Security Controls',
          type: 'table',
          headers: ['Control Area', 'Key Controls', 'Audit Focus'],
          rows: [
            ['Data Governance', 'Data lineage, quality validation, bias testing', 'Training data integrity'],
            ['Model Development', 'Secure SDLC, version control, testing', 'Development practices'],
            ['Access Control', 'API authentication, rate limiting, monitoring', 'Unauthorized access prevention'],
            ['Monitoring', 'Model drift detection, output validation', 'Ongoing performance'],
            ['Explainability', 'Decision logging, interpretable models', 'Audit trail adequacy'],
          ],
        },
        {
          title: 'Adversarial Attacks on AI',
          type: 'text',
          content: "**Common Attack Types:**\n\n**Evasion Attacks**\n• Manipulating inputs to cause misclassification\n• Adding noise imperceptible to humans\n• Bypassing detection systems\n\n**Poisoning Attacks**\n• Corrupting training data\n• Injecting malicious samples\n• Creating backdoors in models\n\n**Model Extraction**\n• Querying to reverse-engineer model\n• Stealing intellectual property\n• Creating adversarial examples\n\n**Inference Attacks**\n• Membership inference\n• Attribute inference\n• Model inversion to reveal training data",
        },
        {
          title: 'AI Governance Framework',
          type: 'text',
          content: "**Governance Elements:**\n\n**Ethics and Oversight**\n• AI ethics committee\n• Use case approval process\n• Human-in-the-loop requirements\n• Bias assessment\n\n**Risk Management**\n• AI-specific risk assessment\n• Impact classification\n• Third-party AI evaluation\n• Incident response for AI failures\n\n**Compliance**\n• Regulatory requirements (EU AI Act)\n• Industry standards\n• Documentation requirements\n• Audit trail maintenance\n\n**Lifecycle Management**\n• Model inventory\n• Version control\n• Retirement procedures\n• Continuous monitoring",
        },
        {
          title: '🧠 Memory Aid: AI Security DAMP',
          type: 'callout',
          content: "**D-A-M-P:**\n• **D**ata integrity - Protect training data\n• **A**dversarial defense - Resist attacks\n• **M**odel governance - Control lifecycle\n• **P**rivacy protection - Prevent data leakage",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "AI systems face unique risks: data poisoning, adversarial attacks, model theft",
            "Adversarial attacks include evasion, poisoning, extraction, and inference",
            "AI governance includes ethics oversight, risk management, and compliance",
            "Explainability and audit trails are critical for AI accountability",
            "Auditors should assess training data quality, model controls, and monitoring",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-018',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Advanced Cloud Security',
    description: 'Deep dive into cloud security architecture, controls, and audit considerations',
    order: 18,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Cloud Security', 'CSPM', 'Container Security', 'Serverless', 'Multi-Cloud'],
    blueprintArea: 'CISA5-E',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Cloud adoption continues accelerating. Auditors must understand cloud-native security concepts, shared responsibility nuances, and emerging cloud security challenges like container security and serverless computing.",
        },
        {
          title: 'Cloud Security Posture Management (CSPM)',
          type: 'text',
          content: "**CSPM Capabilities:**\n\n**Configuration Monitoring**\n• Continuous compliance checks\n• Drift detection\n• Misconfiguration alerts\n• CIS benchmark validation\n\n**Risk Assessment**\n• Asset inventory\n• Vulnerability prioritization\n• Attack path analysis\n• Risk scoring\n\n**Remediation**\n• Automated fixes\n• Policy enforcement\n• Infrastructure as Code scanning\n• Guardrails implementation\n\n**Key Audit Points:**\n• CSPM tool coverage\n• Alert response procedures\n• Remediation timelines\n• Policy exception handling",
        },
        {
          title: 'Container Security',
          type: 'table',
          headers: ['Layer', 'Security Controls', 'Risks'],
          rows: [
            ['Image', 'Vulnerability scanning, signed images, minimal base', 'Malicious/vulnerable images'],
            ['Registry', 'Access control, image verification, scanning', 'Unauthorized image push'],
            ['Orchestration', 'RBAC, network policies, secrets management', 'Privilege escalation'],
            ['Runtime', 'Immutability, monitoring, resource limits', 'Container escape'],
            ['Host', 'Hardening, patching, isolation', 'Host compromise'],
          ],
        },
        {
          title: 'Kubernetes Security',
          type: 'text',
          content: "**K8s Security Domains:**\n\n**Authentication & Authorization**\n• Service accounts\n• RBAC policies\n• Pod security admission\n• Network policies\n\n**Secrets Management**\n• Encrypted secrets\n• External secrets operators\n• Vault integration\n• Rotation policies\n\n**Runtime Security**\n• Pod security standards\n• Runtime threat detection\n• Audit logging\n• Admission controllers\n\n**Supply Chain**\n• Image signing (Sigstore)\n• SBOM generation\n• Policy enforcement\n• Provenance verification",
        },
        {
          title: 'Serverless Security',
          type: 'text',
          content: "**Serverless Security Considerations:**\n\n**Function Security**\n• Minimal permissions (least privilege)\n• Environment variable protection\n• Dependency vulnerabilities\n• Code injection prevention\n\n**Configuration**\n• Timeout settings\n• Memory limits\n• Concurrency controls\n• VPC integration\n\n**Monitoring**\n• Invocation logging\n• Error tracking\n• Performance monitoring\n• Security event detection\n\n**Challenges:**\n• Limited visibility\n• Ephemeral nature\n• Complex event triggers\n• Third-party dependencies",
        },
        {
          title: 'Multi-Cloud Considerations',
          type: 'text',
          content: "**Multi-Cloud Security:**\n\n**Governance**\n• Consistent security policies\n• Centralized identity management\n• Cross-cloud visibility\n• Unified compliance reporting\n\n**Technical Controls**\n• Cloud-agnostic security tools\n• Consistent encryption standards\n• Unified logging and monitoring\n• Cross-cloud network security\n\n**Challenges:**\n• Skill gaps across platforms\n• Tool sprawl\n• Inconsistent native controls\n• Complex incident response",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CSPM provides continuous cloud configuration monitoring and compliance",
            "Container security spans image, registry, orchestration, runtime, and host layers",
            "Kubernetes requires RBAC, network policies, secrets management, and pod security",
            "Serverless security focuses on minimal permissions and dependency management",
            "Multi-cloud requires unified governance, identity, and monitoring approaches",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-019',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'IoT and OT Security',
    description: 'Security for Internet of Things and Operational Technology environments',
    order: 19,
    duration: 50,
    difficulty: 'advanced',
    topics: ['IoT Security', 'OT Security', 'ICS', 'SCADA', 'IT/OT Convergence'],
    blueprintArea: 'CISA5-E',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IoT and OT systems control physical processes and critical infrastructure. Security failures can cause physical harm, production disruption, and safety incidents. Auditors must understand the unique challenges of these environments.",
        },
        {
          title: 'IoT vs OT vs IT',
          type: 'table',
          headers: ['Aspect', 'IT', 'OT/ICS', 'IoT'],
          rows: [
            ['Primary Goal', 'Confidentiality', 'Availability/Safety', 'Functionality'],
            ['Lifecycle', '3-5 years', '15-25 years', '5-10 years'],
            ['Patching', 'Frequent', 'Rare/Scheduled', 'Infrequent'],
            ['Protocols', 'TCP/IP standard', 'Modbus, DNP3, OPC', 'MQTT, CoAP, Zigbee'],
            ['Impact of Failure', 'Business disruption', 'Physical harm', 'Privacy/safety'],
          ],
        },
        {
          title: 'IoT Security Challenges',
          type: 'text',
          content: "**Key IoT Challenges:**\n\n**Device Constraints**\n• Limited processing power\n• Memory constraints\n• Battery limitations\n• Difficult to update\n\n**Security Gaps**\n• Default credentials\n• Unencrypted communications\n• Lack of authentication\n• No security updates\n\n**Management Challenges**\n• Device inventory\n• Patch management\n• Lifecycle management\n• Shadow IoT\n\n**Network Risks**\n• Large attack surface\n• Lateral movement\n• Botnets (e.g., Mirai)\n• DDoS participation",
        },
        {
          title: 'OT/ICS Security Framework',
          type: 'text',
          content: "**ICS Security Layers (Purdue Model):**\n\n**Level 0-1: Field Devices**\n• Sensors, actuators, PLCs\n• Physical security critical\n• Limited cyber controls\n\n**Level 2: Control Systems**\n• HMI, engineering workstations\n• Network segmentation\n• Application whitelisting\n\n**Level 3: Operations**\n• Historians, OT servers\n• Jump servers for access\n• Logging and monitoring\n\n**Level 3.5: DMZ**\n• Data diodes\n• Secure file transfer\n• Patch management\n\n**Level 4-5: Enterprise**\n• Standard IT controls\n• Identity management\n• Security operations",
        },
        {
          title: 'IT/OT Convergence Security',
          type: 'text',
          content: "**Convergence Challenges:**\n\n**Cultural**\n• Different priorities (CIA vs AIC)\n• Different skill sets\n• Different risk tolerances\n• Communication gaps\n\n**Technical**\n• Legacy protocol security\n• Incompatible security tools\n• Real-time requirements\n• Vendor dependencies\n\n**Governance**\n• Unified security policies\n• Shared incident response\n• Integrated risk management\n• Joint security operations\n\n**Best Practices:**\n• Network segmentation\n• Zero trust architecture\n• OT-specific monitoring\n• Joint training programs",
        },
        {
          title: 'IoT/OT Audit Considerations',
          type: 'text',
          content: "**Audit Focus Areas:**\n\n**Asset Management**\n• Complete device inventory\n• Firmware version tracking\n• End-of-life identification\n• Vendor relationship\n\n**Network Security**\n• Segmentation verification\n• Traffic monitoring\n• Protocol analysis\n• Remote access controls\n\n**Incident Response**\n• OT-specific playbooks\n• Safety procedures\n• Recovery priorities\n• Vendor escalation\n\n**Compliance**\n• NERC CIP (energy)\n• IEC 62443 (industrial)\n• NIST CSF mapping\n• Sector-specific requirements",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "OT prioritizes availability and safety over confidentiality",
            "IoT devices have constraints limiting traditional security controls",
            "Purdue Model provides framework for ICS network segmentation",
            "IT/OT convergence requires unified governance and specialized skills",
            "OT audits must consider safety, availability, and long device lifecycles",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-020',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'API Security',
    description: 'Security for Application Programming Interfaces and web services',
    order: 20,
    duration: 45,
    difficulty: 'advanced',
    topics: ['API Security', 'OAuth', 'API Gateway', 'OWASP API Top 10', 'Rate Limiting'],
    blueprintArea: 'CISA5-E',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "APIs are the backbone of modern applications and integrations. API vulnerabilities have led to major data breaches. Auditors must understand API-specific risks and controls as organizations expose more functionality through APIs.",
        },
        {
          title: 'OWASP API Security Top 10 (2023)',
          type: 'table',
          headers: ['Rank', 'Vulnerability', 'Description'],
          rows: [
            ['API1', 'Broken Object Level Authorization', 'Accessing other users resources by manipulating IDs'],
            ['API2', 'Broken Authentication', 'Weak authentication or token management'],
            ['API3', 'Broken Object Property Level Authorization', 'Exposing or modifying sensitive object properties'],
            ['API4', 'Unrestricted Resource Consumption', 'No rate limiting or resource controls'],
            ['API5', 'Broken Function Level Authorization', 'Accessing admin functions without proper checks'],
          ],
        },
        {
          title: 'API Authentication Methods',
          type: 'text',
          content: "**Authentication Options:**\n\n**API Keys**\n• Simple implementation\n• Limited security\n• No user context\n• Best for internal/low-risk\n\n**OAuth 2.0**\n• Industry standard\n• Delegated authorization\n• Scoped access\n• Token-based\n\n**JWT (JSON Web Tokens)**\n• Self-contained claims\n• Stateless validation\n• Expiration built-in\n• Signature verification\n\n**mTLS (Mutual TLS)**\n• Certificate-based\n• Strong authentication\n• Service-to-service\n• Complex management\n\n**Best Practice:**\n• Use OAuth 2.0 + JWT for user access\n• Use mTLS for service-to-service\n• Never expose API keys client-side",
        },
        {
          title: 'API Gateway Security',
          type: 'text',
          content: "**Gateway Security Functions:**\n\n**Traffic Management**\n• Rate limiting\n• Throttling\n• Request/response transformation\n• Load balancing\n\n**Security**\n• Authentication/authorization\n• Input validation\n• TLS termination\n• WAF integration\n\n**Monitoring**\n• Logging all requests\n• Anomaly detection\n• Usage analytics\n• SLA monitoring\n\n**Policy Enforcement**\n• API versioning\n• Deprecation management\n• Consumer quotas\n• IP whitelisting",
        },
        {
          title: 'API Security Controls',
          type: 'text',
          content: "**Essential Controls:**\n\n**Input Validation**\n• Schema validation\n• Size limits\n• Type checking\n• Content-type enforcement\n\n**Output Security**\n• Data filtering\n• Pagination\n• Error message sanitization\n• Response headers\n\n**Rate Limiting**\n• Per-user limits\n• Per-endpoint limits\n• Burst handling\n• Retry-after headers\n\n**Logging & Monitoring**\n• Full request logging\n• Sensitive data masking\n• Anomaly detection\n• Alerting thresholds",
        },
        {
          title: 'API Audit Checklist',
          type: 'text',
          content: "**Audit Focus Areas:**\n\n**Authentication & Authorization**\n• Token validation implementation\n• Scope enforcement\n• BOLA/BFLA testing\n• Session management\n\n**Data Protection**\n• Encryption in transit (TLS 1.2+)\n• Sensitive data exposure\n• Response filtering\n• Field-level authorization\n\n**Availability**\n• Rate limiting configuration\n• DDoS protection\n• Resource quotas\n• Graceful degradation\n\n**Documentation & Governance**\n• OpenAPI specifications\n• API inventory\n• Deprecation process\n• Change management",
        },
        {
          title: '🧠 Memory Aid: API Security TRAP',
          type: 'callout',
          content: "**T-R-A-P:**\n• **T**okens - Secure authentication/authorization\n• **R**ate limiting - Prevent abuse\n• **A**uthorization - Object/function level checks\n• **P**rotection - Input validation, output filtering",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "OWASP API Top 10 highlights authorization and authentication as top risks",
            "OAuth 2.0 + JWT is recommended for user API access; mTLS for services",
            "API gateways provide centralized security, monitoring, and policy enforcement",
            "Rate limiting and input validation are essential abuse prevention controls",
            "API audits should verify authorization at object, property, and function levels",
          ],
        },
      ],
    },
  },
];

export default cisa5Lessons;
