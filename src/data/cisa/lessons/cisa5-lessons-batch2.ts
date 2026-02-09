/**
 * CISA Domain 5: Protection of Information Assets - Batch 2
 * Coverage: Advanced security controls, encryption, identity management, and data protection
 */

import { Lesson } from '../../../types';

export const cisa5LessonsBatch2: Lesson[] = [
  // ===========================================================================
  // IDENTITY AND ACCESS MANAGEMENT
  // ===========================================================================
  
  {
    id: 'CISA5-021',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Identity and Access Management Fundamentals',
    description: 'Master the principles of identity management, authentication, and authorization',
    order: 21,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['IAM', 'Authentication', 'Authorization', 'Access Control Models'],
    blueprintArea: 'CISA5-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IAM is the cornerstone of information security. Properly implemented, it ensures only authorized users access appropriate resources. IAM is heavily tested on CISA.",
        },
        {
          title: 'The AAA Framework',
          type: 'text',
          content: "**Authentication, Authorization, Accounting (AAA):**\n\n**Authentication - \"Who are you?\"**\n• Verify claimed identity\n• Credentials: passwords, tokens, biometrics\n• Result: Confirmed identity\n\n**Authorization - \"What can you do?\"**\n• Determine permitted actions\n• Based on roles, rules, policies\n• Result: Access rights granted/denied\n\n**Accounting (Auditing) - \"What did you do?\"**\n• Log user activities\n• Monitor and report\n• Support forensics and compliance\n\n**Identification (preceding AAA):**\n• Claim an identity\n• Username, account ID, badge number\n• Not proof, just assertion",
        },
        {
          title: 'Authentication Factors',
          type: 'table',
          headers: ['Factor', 'Description', 'Examples', 'Weaknesses'],
          rows: [
            ['Something You Know', 'Knowledge-based', 'Password, PIN, security question', 'Can be shared, guessed, stolen'],
            ['Something You Have', 'Possession-based', 'Token, smart card, mobile phone', 'Can be lost, stolen, cloned'],
            ['Something You Are', 'Biometric', 'Fingerprint, face, iris, voice', 'Can be spoofed, privacy concerns'],
            ['Somewhere You Are', 'Location-based', 'GPS, IP address, geofencing', 'Can be spoofed, may be too restrictive'],
            ['Something You Do', 'Behavior-based', 'Typing pattern, mouse movement', 'Still maturing, false positives'],
          ],
        },
        {
          title: '🧠 Memory Aid: Authentication Factors',
          type: 'callout',
          content: "**The Big 3: Know, Have, Are**\n\nThink of entering a secure building:\n• **Know**: Tell the guard the password\n• **Have**: Swipe your badge\n• **Are**: Scan your fingerprint\n\n**MFA = Multi-Factor**: Use 2+ DIFFERENT factor types\n2 passwords = NOT MFA (same factor type)",
        },
        {
          title: 'Multi-Factor Authentication (MFA)',
          type: 'text',
          content: "**Why MFA Matters:**\n• Single factor can be compromised\n• Multiple factors dramatically reduce risk\n• Required by many regulations (PCI DSS, HIPAA)\n\n**MFA Implementation Types:**\n\n**SMS/Voice OTP:**\n• One-time code sent to phone\n• Vulnerable to SIM swapping\n• Better than nothing, but weakest MFA\n\n**TOTP (Time-Based OTP):**\n• Authenticator app generates codes\n• Codes change every 30 seconds\n• More secure than SMS\n\n**Push Notifications:**\n• Approve/deny on mobile app\n• User-friendly\n• Watch for \"MFA fatigue\" attacks\n\n**Hardware Tokens:**\n• FIDO2/WebAuthn, YubiKey\n• Phishing-resistant\n• Strongest common method",
        },
        {
          title: 'Access Control Models',
          type: 'text',
          content: "**Discretionary Access Control (DAC):**\n• Owner controls access to resources\n• Users can share access\n• Flexible but less secure\n• Example: Windows file permissions\n\n**Mandatory Access Control (MAC):**\n• System enforces access based on labels\n• Users cannot change labels\n• Most restrictive, used in military\n• Example: Top Secret, Secret, Unclassified\n\n**Role-Based Access Control (RBAC):**\n• Access based on job roles\n• Users assigned to roles\n• Roles have permissions\n• Most common in enterprises\n\n**Attribute-Based Access Control (ABAC):**\n• Access based on attributes\n• User, resource, environment attributes\n• Most flexible, complex to manage\n• Example: IF user.department=Finance AND time=BusinessHours THEN allow",
        },
        {
          title: 'Privileged Access Management (PAM)',
          type: 'text',
          content: "**What is Privileged Access?**\n• Administrative accounts (root, admin)\n• Service accounts\n• Emergency/break-glass accounts\n• Accounts with elevated permissions\n\n**PAM Best Practices:**\n\n**Just-In-Time (JIT) Access:**\n• Grant privileges only when needed\n• Automatic expiration\n• Reduces standing privileges\n\n**Session Monitoring:**\n• Record privileged sessions\n• Real-time monitoring\n• Forensic evidence\n\n**Password Vaulting:**\n• Centralized credential storage\n• Automated rotation\n• Check-out/check-in process\n\n**Privileged Access Workstations (PAWs):**\n• Dedicated hardened systems\n• Only for admin tasks\n• Reduced attack surface",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "AAA: Authentication (who), Authorization (what), Accounting (audit)",
            "Factors: Something you Know, Have, Are (plus location and behavior)",
            "MFA requires 2+ different factor types; 2 passwords is NOT MFA",
            "Access models: DAC (owner-controlled), MAC (system-enforced), RBAC (role-based), ABAC (attribute-based)",
            "Privileged access needs extra controls: JIT, vaulting, monitoring, PAWs",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-022',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Cryptography Fundamentals',
    description: 'Understand encryption, hashing, and cryptographic key management',
    order: 22,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Encryption', 'Symmetric', 'Asymmetric', 'Hashing', 'PKI'],
    blueprintArea: 'CISA5-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Cryptography protects data confidentiality and integrity. Understanding crypto concepts helps auditors evaluate whether controls are properly implemented.",
        },
        {
          title: 'Symmetric vs. Asymmetric Encryption',
          type: 'table',
          headers: ['Aspect', 'Symmetric', 'Asymmetric'],
          rows: [
            ['Keys', 'One shared key', 'Key pair (public + private)'],
            ['Speed', 'Fast', 'Slow (100-1000x slower)'],
            ['Key Distribution', 'Challenge (must share securely)', 'Easy (public key is public)'],
            ['Use Cases', 'Bulk data encryption', 'Key exchange, digital signatures'],
            ['Examples', 'AES, 3DES, ChaCha20', 'RSA, ECC, DSA'],
            ['Key Length', 'AES-256 (256 bits)', 'RSA-2048, ECC-256'],
          ],
        },
        {
          title: 'Common Algorithms',
          type: 'text',
          content: "**Symmetric Algorithms:**\n\n**AES (Advanced Encryption Standard):**\n• Current gold standard\n• Key sizes: 128, 192, 256 bits\n• Block cipher (128-bit blocks)\n\n**3DES (Triple DES):**\n• Legacy, being phased out\n• Applies DES three times\n• Slower than AES\n\n**Asymmetric Algorithms:**\n\n**RSA:**\n• Most widely used\n• Based on factoring large primes\n• Key sizes: 2048, 3072, 4096 bits\n\n**ECC (Elliptic Curve Cryptography):**\n• Smaller keys, same security\n• ECC-256 ≈ RSA-3072\n• More efficient for mobile\n\n**In Practice:**\nAsymmetric encrypts symmetric key → symmetric encrypts data",
        },
        {
          title: '🧠 Memory Aid: Symmetric vs Asymmetric',
          type: 'callout',
          content: "**SYMMETRIC = Same key (Sym = Same)**\nFast for big data, hard to share key safely\n\n**ASYMMETRIC = A pair of keys (A = Apart)**\nSlow but solves key sharing problem\n\nReal-world: Use asymmetric to share a symmetric key, then symmetric for the data!",
        },
        {
          title: 'Hashing',
          type: 'text',
          content: "**What is Hashing?**\n• One-way function\n• Fixed-length output regardless of input\n• Any change produces completely different hash\n• Cannot reverse to original (unlike encryption)\n\n**Properties of Good Hash:**\n• Deterministic: Same input → same hash\n• Fast to compute\n• Collision resistant: Hard to find two inputs with same hash\n• Avalanche effect: Small change → big hash change\n\n**Common Hash Algorithms:**\n\n| Algorithm | Output Size | Status |\n|-----------|-------------|--------|\n| MD5 | 128 bits | Broken, don't use |\n| SHA-1 | 160 bits | Deprecated |\n| SHA-256 | 256 bits | Current standard |\n| SHA-3 | Variable | Newest standard |\n\n**Use Cases:**\n• Password storage (with salt)\n• File integrity verification\n• Digital signatures\n• Blockchain",
        },
        {
          title: 'Digital Signatures',
          type: 'text',
          content: "**How Digital Signatures Work:**\n\n**Signing (Sender):**\n1. Hash the message\n2. Encrypt hash with sender's PRIVATE key\n3. Attach encrypted hash as signature\n\n**Verification (Recipient):**\n1. Decrypt signature with sender's PUBLIC key\n2. Hash the received message\n3. Compare: If hashes match, signature is valid\n\n**What Digital Signatures Provide:**\n• **Authentication**: Proves sender identity\n• **Integrity**: Proves message wasn't altered\n• **Non-repudiation**: Sender can't deny signing\n\n**Note:** Unlike encryption (public key encrypts, private decrypts), signatures work in reverse (private signs, public verifies).",
        },
        {
          title: 'Public Key Infrastructure (PKI)',
          type: 'text',
          content: "**PKI Components:**\n\n**Certificate Authority (CA):**\n• Issues and manages certificates\n• Verifies identity before issuing\n• Maintains revocation lists\n\n**Registration Authority (RA):**\n• Validates certificate requests\n• May be part of CA or separate\n\n**Digital Certificate:**\n• Binds public key to identity\n• Contains: Subject, issuer, validity, public key\n• X.509 is standard format\n\n**Certificate Revocation:**\n• CRL (Certificate Revocation List)\n• OCSP (Online Certificate Status Protocol)\n• Checks if certificate is still valid\n\n**Trust Chain:**\n• Root CA → Intermediate CA → End Entity\n• Each level signs the next\n• Trust anchors in browsers/OS",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Symmetric uses one shared key (fast); Asymmetric uses key pairs (slow but easier distribution)",
            "AES-256 is current symmetric standard; RSA-2048+ or ECC for asymmetric",
            "Hashing is one-way; SHA-256 is current standard; MD5 and SHA-1 are deprecated",
            "Digital signatures: private key signs, public key verifies → provides authenticity and non-repudiation",
            "PKI uses CAs to issue certificates that bind public keys to identities",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-023',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Network Security Controls',
    description: 'Learn network protection technologies and their audit considerations',
    order: 23,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Firewalls', 'IDS/IPS', 'VPN', 'Network Segmentation', 'Zero Trust'],
    blueprintArea: 'CISA5-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Network security controls protect the perimeter and internal network. Understanding these technologies helps auditors evaluate whether networks are properly protected.",
        },
        {
          title: 'Firewall Types',
          type: 'table',
          headers: ['Type', 'Layer', 'Function', 'Limitations'],
          rows: [
            ['Packet Filter', 'Layer 3-4', 'Filter by IP, port, protocol', 'No session awareness'],
            ['Stateful', 'Layer 3-4', 'Track connection state', 'No deep inspection'],
            ['Application (WAF)', 'Layer 7', 'Inspect application content', 'Performance impact'],
            ['Next-Gen (NGFW)', 'All', 'Stateful + application + threat intel', 'Complex, costly'],
          ],
        },
        {
          title: 'Firewall Rule Best Practices',
          type: 'text',
          content: "**Rule Order Matters:**\n• Process top-to-bottom\n• First match wins\n• Most specific rules first\n• Implicit deny at end (default deny)\n\n**Rule Hygiene:**\n\n**Do:**\n• Document business justification for each rule\n• Remove unused rules regularly\n• Use specific addresses, not \"any\"\n• Log denied traffic\n• Review rules periodically\n\n**Don't:**\n• Allow \"any\" to \"any\"\n• Leave rules from terminated projects\n• Allow unnecessary inbound access\n• Forget to log",
        },
        {
          title: 'IDS vs. IPS',
          type: 'text',
          content: "**Intrusion Detection System (IDS):**\n• Passive monitoring\n• Alerts on suspicious activity\n• Does NOT block traffic\n• Placed on network tap/span port\n\n**Intrusion Prevention System (IPS):**\n• Active inline device\n• Can block malicious traffic\n• Introduces latency risk\n• Placed in traffic path\n\n**Detection Methods:**\n\n**Signature-Based:**\n• Matches known attack patterns\n• Fast, low false positives\n• Cannot detect new (zero-day) attacks\n\n**Anomaly-Based:**\n• Baseline normal behavior\n• Detect deviations\n• Can find unknown attacks\n• Higher false positive rate",
        },
        {
          title: '🧠 Memory Aid: IDS vs IPS',
          type: 'callout',
          content: "**IDS = Detective (D for Detect)**\nWatches and alerts, doesn't intervene\n\n**IPS = Patrol (P for Prevent)**\nActively blocks threats in real-time\n\nIDS is like a security camera\nIPS is like a security guard",
        },
        {
          title: 'Network Segmentation',
          type: 'text',
          content: "**Why Segment Networks?**\n• Limit breach impact (lateral movement)\n• Isolate sensitive systems\n• Compliance requirements (PCI DSS)\n• Performance optimization\n\n**Segmentation Approaches:**\n\n**VLANs:**\n• Logical separation at Layer 2\n• Easy to implement\n• Requires firewall between VLANs for access control\n\n**Physical Separation:**\n• Completely separate hardware\n• Highest security\n• Highest cost\n\n**Micro-Segmentation:**\n• Segment down to workload level\n• Software-defined\n• Zero trust approach",
        },
        {
          title: 'Zero Trust Architecture',
          type: 'text',
          content: "**Core Principle: Never trust, always verify**\n\n**Traditional Perimeter Security:**\n• Trust inside the network\n• Protect the edge\n• Once inside, move freely\n\n**Zero Trust:**\n• No implicit trust anywhere\n• Verify every access request\n• Least privilege access\n• Assume breach\n\n**Key Components:**\n• Strong identity verification\n• Device health validation\n• Micro-segmentation\n• Continuous monitoring\n• Encrypted communications\n\n**ZT Pillars (CISA model):**\n• Identity\n• Devices\n• Networks\n• Applications & Workloads\n• Data",
        },
        {
          title: 'VPN Technologies',
          type: 'text',
          content: "**VPN Types:**\n\n**Site-to-Site VPN:**\n• Connects two networks\n• Always-on\n• Configured on routers/firewalls\n\n**Remote Access VPN:**\n• Connects user to network\n• On-demand\n• Client software on endpoint\n\n**Protocols:**\n\n**IPsec:**\n• Network layer (Layer 3)\n• Strong security\n• Complex setup\n\n**SSL/TLS VPN:**\n• Application layer\n• Web-based or client\n• Easier through firewalls\n\n**WireGuard:**\n• Modern, lightweight\n• Simple configuration\n• Gaining adoption",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Firewalls: packet filter → stateful → application → NGFW (increasing capability)",
            "IDS detects and alerts; IPS detects and blocks inline",
            "Detection: Signature-based (known threats) vs Anomaly-based (unknown threats)",
            "Network segmentation limits breach impact and lateral movement",
            "Zero Trust: Never trust, always verify - no implicit trust based on network location",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-024',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Data Protection and Privacy',
    description: 'Understand data classification, protection controls, and privacy requirements',
    order: 24,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Data Classification', 'DLP', 'Encryption', 'Privacy', 'Data Lifecycle'],
    blueprintArea: 'CISA5-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Data is the asset organizations most need to protect. Understanding data protection helps auditors evaluate whether sensitive information is adequately safeguarded.",
        },
        {
          title: 'Data Classification',
          type: 'text',
          content: "**Why Classify Data?**\n• Apply appropriate controls based on sensitivity\n• Regulatory compliance\n• Resource prioritization\n• User awareness\n\n**Common Classification Schemes:**\n\n**Corporate:**\n• Public\n• Internal\n• Confidential\n• Restricted/Secret\n\n**Government:**\n• Unclassified\n• Confidential\n• Secret\n• Top Secret\n\n**Key Principles:**\n• Data owner defines classification\n• Classification drives controls\n• Label data with classification\n• Review classifications periodically\n• Reclassify when sensitivity changes",
        },
        {
          title: 'Data States',
          type: 'table',
          headers: ['State', 'Description', 'Protection Methods'],
          rows: [
            ['Data at Rest', 'Stored on disk, database, backup', 'Full disk encryption, database encryption, file encryption'],
            ['Data in Transit', 'Moving across network', 'TLS/SSL, VPN, encrypted protocols'],
            ['Data in Use', 'Being processed in memory', 'Memory encryption, secure enclaves, access controls'],
          ],
        },
        {
          title: 'Data Loss Prevention (DLP)',
          type: 'text',
          content: "**What is DLP?**\nTechnology to prevent unauthorized data disclosure.\n\n**DLP Deployment Points:**\n\n**Endpoint DLP:**\n• Installed on workstations\n• Controls USB, email, print\n• Monitors user actions\n\n**Network DLP:**\n• Monitors traffic at network edge\n• Inspects email, web, file transfers\n• Can block or alert\n\n**Cloud DLP:**\n• Monitors cloud services\n• API integration with SaaS\n• Controls cloud uploads/shares\n\n**Detection Methods:**\n• Pattern matching (SSN, credit cards)\n• Fingerprinting (specific documents)\n• Machine learning (context-based)\n• Keywords and dictionaries",
        },
        {
          title: '🧠 Memory Aid: Data States',
          type: 'callout',
          content: "**RUT = Rest, Use, Transit**\n\n• **R**est: Sleeping on disk (encrypt the disk)\n• **U**se: Awake in memory (hardest to protect)\n• **T**ransit: Traveling (encrypt the connection)\n\nProtect data in ALL states!",
        },
        {
          title: 'Privacy Principles',
          type: 'text',
          content: "**Fair Information Practice Principles (FIPPs):**\n\n**1. Collection Limitation:**\n• Collect only what's needed\n• Lawful and fair means\n• With consent where appropriate\n\n**2. Data Quality:**\n• Relevant to purposes\n• Accurate, complete, current\n\n**3. Purpose Specification:**\n• State purposes at collection\n• Don't use for incompatible purposes\n\n**4. Use Limitation:**\n• Use only for stated purposes\n• Exceptions: Consent or legal requirement\n\n**5. Security Safeguards:**\n• Protect against unauthorized access\n• Protect against misuse, loss\n\n**6. Openness:**\n• Be transparent about practices\n• Policies available to individuals\n\n**7. Individual Participation:**\n• Right to access, correct, delete\n\n**8. Accountability:**\n• Organization is responsible for compliance",
        },
        {
          title: 'Data Lifecycle Management',
          type: 'text',
          content: "**Data Lifecycle Stages:**\n\n**1. Creation/Collection:**\n• Classify at creation\n• Minimize collection\n• Capture consent\n\n**2. Storage:**\n• Encrypt sensitive data\n• Access controls\n• Maintain integrity\n\n**3. Use/Processing:**\n• Limit access to authorized users\n• Log access\n• Maintain purpose limitation\n\n**4. Sharing/Transfer:**\n• Encrypt in transit\n• Verify recipient authorization\n• Document transfers\n\n**5. Archival:**\n• Retain per policy\n• Secure archive storage\n• Maintain retrievability\n\n**6. Destruction:**\n• Destroy when no longer needed\n• Use appropriate methods\n• Document destruction",
        },
        {
          title: 'Data Destruction Methods',
          type: 'table',
          headers: ['Method', 'Description', 'Use Cases'],
          rows: [
            ['Deletion', 'Remove file system pointers', 'Routine cleanup (not secure disposal)'],
            ['Overwriting', 'Write patterns over data', 'Reusing media (verify complete)'],
            ['Degaussing', 'Destroy magnetic field', 'Magnetic media (HDD, tape)'],
            ['Encryption (cryptographic erasure)', 'Destroy encryption keys', 'SSDs, cloud (fast, effective)'],
            ['Physical destruction', 'Shred, incinerate, pulverize', 'Highest sensitivity, end of life'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Classification drives protection controls; owner defines classification",
            "Protect data at rest (encryption), in transit (TLS), and in use (access controls)",
            "DLP prevents unauthorized data disclosure at endpoint, network, and cloud",
            "Privacy principles: collection limitation, purpose specification, individual rights",
            "Data destruction must match sensitivity; simple deletion is not secure disposal",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-025',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Vulnerability Management',
    description: 'Learn to audit vulnerability identification, assessment, and remediation processes',
    order: 25,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Vulnerability Scanning', 'Patch Management', 'Remediation', 'Risk Ranking'],
    blueprintArea: 'CISA5-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Vulnerabilities are the weaknesses attackers exploit. Effective vulnerability management reduces the attack surface and is a key audit focus area.",
        },
        {
          title: 'Vulnerability Management Process',
          type: 'text',
          content: "**1. Asset Discovery:**\n• Identify all assets in scope\n• Maintain accurate inventory\n• Discover shadow IT\n\n**2. Vulnerability Scanning:**\n• Regular automated scans\n• Authenticated for better coverage\n• Network, host, and application scans\n\n**3. Prioritization:**\n• Rank by severity and business context\n• CVSS scores as input\n• Consider exploitability and asset value\n\n**4. Remediation:**\n• Patch, configure, or mitigate\n• Track remediation actions\n• Verify fixes\n\n**5. Reporting:**\n• Metrics and trends\n• Compliance reporting\n• Exception management",
        },
        {
          title: 'Vulnerability Scoring (CVSS)',
          type: 'table',
          headers: ['CVSS Score', 'Severity', 'Typical SLA'],
          rows: [
            ['9.0 - 10.0', 'Critical', '24-72 hours'],
            ['7.0 - 8.9', 'High', '7-14 days'],
            ['4.0 - 6.9', 'Medium', '30 days'],
            ['0.1 - 3.9', 'Low', '90 days'],
            ['0.0', 'None (Informational)', 'Plan for next cycle'],
          ],
        },
        {
          title: 'Authenticated vs. Unauthenticated Scans',
          type: 'text',
          content: "**Unauthenticated (Network) Scan:**\n• Scans from outside perspective\n• Limited visibility\n• Finds exposed vulnerabilities\n• May miss local issues\n\n**Authenticated (Credentialed) Scan:**\n• Logs into systems\n• Full visibility of software\n• Finds missing patches, configs\n• More accurate results\n\n**Best Practice:**\n• Use authenticated scans for internal assets\n• Protect scan credentials\n• Use service accounts with minimal privileges\n• Credential rotation",
        },
        {
          title: '🧠 Memory Aid: Vuln Management',
          type: 'callout',
          content: "**DISCOVER → SCAN → RANK → FIX → VERIFY**\n\nThink of it like cleaning a house:\n1. Find all the rooms (Discover assets)\n2. Check for problems (Scan)\n3. Prioritize what to fix first (Rank)\n4. Fix the issues (Remediate)\n5. Make sure it's fixed (Verify)",
        },
        {
          title: 'Patch Management',
          type: 'text',
          content: "**Patch Lifecycle:**\n\n**1. Awareness:**\n• Subscribe to vendor notifications\n• Monitor vulnerability feeds\n• Security advisories (CISA KEV, etc.)\n\n**2. Assessment:**\n• Determine applicability\n• Evaluate criticality\n• Test compatibility\n\n**3. Acquisition:**\n• Download from trusted sources\n• Verify integrity (hashes)\n\n**4. Testing:**\n• Test in non-production first\n• Regression testing\n• Back-out plan\n\n**5. Deployment:**\n• Schedule appropriate window\n• Use automated deployment tools\n• Document deployment\n\n**6. Verification:**\n• Confirm successful installation\n• Rescan to verify remediation\n• Monitor for issues",
        },
        {
          title: 'Remediation Alternatives',
          type: 'text',
          content: "**When Patching Isn't Possible:**\n\n**Compensating Controls:**\n• Network segmentation\n• Additional monitoring\n• Access restrictions\n• Firewall rules\n\n**Other Options:**\n• Virtual patching (WAF rules)\n• Disable vulnerable feature\n• Increase monitoring\n• Accept risk (with approval)\n\n**Exception Management:**\n• Document business justification\n• Define compensating controls\n• Set expiration/review date\n• Require appropriate approval\n• Track and report",
        },
        {
          title: 'Auditing Vulnerability Management',
          type: 'text',
          content: "**Audit Areas:**\n\n**Coverage:**\n• Are all assets scanned?\n• Is scanning frequent enough?\n• Are scans authenticated?\n\n**Prioritization:**\n• Is CVSS considered?\n• Is business context factored in?\n• Are remediation SLAs defined?\n\n**Remediation:**\n• Are SLAs being met?\n• Is verification performed?\n• Are exceptions managed properly?\n\n**Metrics:**\n• Mean time to remediate\n• Number of critical vulnerabilities open\n• Trend over time\n• Scan coverage percentage",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Vulnerability management: Discover → Scan → Rank → Fix → Verify",
            "CVSS provides standardized severity scoring (0-10 scale)",
            "Authenticated scans provide better visibility than network scans",
            "Patch management must include testing before production deployment",
            "When patching isn't possible, implement compensating controls with documented exceptions",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA5-026',
    courseId: 'cisa',
    section: 'CISA5',
    title: 'Security Awareness and Training',
    description: 'Understand the human element of security and effective awareness programs',
    order: 26,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Security Awareness', 'Phishing Simulation', 'Training', 'Culture'],
    blueprintArea: 'CISA5-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Humans are often called the weakest link in security. Effective awareness programs transform users from vulnerabilities into defenders.",
        },
        {
          title: 'Awareness vs. Training',
          type: 'table',
          headers: ['Aspect', 'Security Awareness', 'Security Training'],
          rows: [
            ['Goal', 'Change behavior and culture', 'Build specific skills'],
            ['Audience', 'All personnel', 'Specific roles (IT, developers)'],
            ['Depth', 'Broad, general', 'Deep, specialized'],
            ['Format', 'Ongoing reinforcement', 'Structured courses'],
            ['Examples', 'Phishing tips, password guidance', 'Secure coding, incident response'],
          ],
        },
        {
          title: 'Effective Awareness Program Elements',
          type: 'text',
          content: "**Content Topics:**\n• Phishing and social engineering\n• Password security\n• Physical security\n• Clean desk policy\n• Data handling\n• Incident reporting\n• Acceptable use\n• Remote work security\n\n**Delivery Methods:**\n• Online learning modules\n• Phishing simulations\n• Newsletters and email tips\n• Posters and screen savers\n• Lunch and learns\n• Security champions network\n• Gamification\n\n**Frequency:**\n• Annual comprehensive training\n• Monthly reinforcements\n• Event-driven (e.g., tax season fraud)\n• Real-time (phishing test feedback)",
        },
        {
          title: 'Phishing Simulations',
          type: 'text',
          content: "**Purpose:**\n• Measure susceptibility\n• Provide teachable moments\n• Track improvement over time\n• Identify high-risk users\n\n**Best Practices:**\n\n**Design:**\n• Realistic scenarios\n• Varying difficulty levels\n• Include spear phishing\n• Time randomization\n\n**Execution:**\n• Coordinate with HR and legal\n• Have opt-out for stress concerns\n• Immediate education on click\n• No public shaming\n\n**Metrics:**\n• Click rate\n• Report rate\n• Repeat clickers\n• Improvement over time",
        },
        {
          title: '🧠 Memory Aid: PEOPLE',
          type: 'callout',
          content: "**Security awareness addresses PEOPLE:**\n\n• **P**hishing defense\n• **E**ducation on threats\n• **O**ngoing reinforcement\n• **P**assword practices\n• **L**earn from incidents\n• **E**mpower to report",
        },
        {
          title: 'Role-Based Training',
          type: 'text',
          content: "**By Role:**\n\n**All Employees:**\n• Basic security awareness\n• Acceptable use policy\n• Phishing recognition\n• Incident reporting\n\n**IT Staff:**\n• Secure configuration\n• Change management\n• Privileged access\n• Patch management\n\n**Developers:**\n• Secure coding (OWASP Top 10)\n• Input validation\n• Code review\n• Vulnerability remediation\n\n**Executives:**\n• Business email compromise\n• Governance and risk\n• Incident response decisions\n• Regulatory requirements\n\n**New Employees:**\n• Onboarding security training\n• Policy acknowledgment\n• Access provisioning process",
        },
        {
          title: 'Measuring Effectiveness',
          type: 'text',
          content: "**Metrics to Track:**\n\n**Behavioral Metrics:**\n• Phishing simulation click rates\n• Phishing report rates\n• Policy violations\n• Unauthorized software installs\n\n**Knowledge Metrics:**\n• Training completion rates\n• Quiz/assessment scores\n• Pre/post training comparison\n\n**Cultural Metrics:**\n• Security survey responses\n• Voluntary security participation\n• Unsolicited security reports\n\n**Outcome Metrics:**\n• Security incidents caused by users\n• Data breaches from human error\n• Audit findings related to awareness",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Awareness changes behavior broadly; training builds specific skills",
            "Effective programs use multiple delivery methods and ongoing reinforcement",
            "Phishing simulations measure susceptibility and provide teachable moments",
            "Training should be tailored by role (all staff, IT, developers, executives)",
            "Measure effectiveness through behavioral, knowledge, and outcome metrics",
          ],
        },
      ],
    },
  },
];

export default cisa5LessonsBatch2;
