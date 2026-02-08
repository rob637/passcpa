# CISA Domain 5: Protection of Information Assets (26%)

## Overview

Domain 5 covers information security frameworks, access control, cryptography, network security, and privacy. This is one of the two largest domains and tests your understanding of how to protect organizational assets.

## Key Weight

**26% of the exam** - Tied for largest domain with Domain 4. Expect approximately 39 questions.

---

## Domain 5A: Security Governance

### Security Frameworks

| Framework | Focus |
|-----------|-------|
| **COBIT** | IT Governance and Management |
| **ISO 27001/27002** | Information Security Management |
| **NIST CSF** | Cybersecurity Framework |
| **CIS Controls** | Prioritized Security Controls |

### NIST Cybersecurity Framework

Five Core Functions:
1. **Identify** - Asset management, risk assessment
2. **Protect** - Safeguards and controls
3. **Detect** - Monitoring and detection
4. **Respond** - Incident response
5. **Recover** - Recovery planning

### Memory Aid: IPDRR
\`\`\`
Identify → Protect → Detect → Respond → Recover
\`\`\`

---

## Domain 5B: Data Classification

### Classification Levels

| Government | Commercial |
|------------|------------|
| Top Secret | Confidential |
| Secret | Private |
| Confidential | Sensitive |
| Unclassified | Public |

### Data Lifecycle

1. **Creation** - Generated or acquired
2. **Storage** - Retained in systems
3. **Use** - Processed and accessed
4. **Sharing** - Transmitted to others
5. **Archival** - Long-term retention
6. **Destruction** - Secure disposal

### Data Roles

| Role | Responsibility |
|------|---------------|
| **Data Owner** | Accountability, classification |
| **Data Custodian** | Technical safeguards |
| **Data Steward** | Quality, standards |
| **Data User** | Authorized access |

---

## Domain 5C: Access Control

### Authentication Factors

| Factor | Description | Examples |
|--------|-------------|----------|
| **Something You Know** | Knowledge | Password, PIN |
| **Something You Have** | Possession | Token, smart card |
| **Something You Are** | Biometric | Fingerprint, retina |

**Multi-Factor Authentication (MFA)**: Two or more different factors

### Biometric Measures

| Term | Definition |
|------|------------|
| **FAR** | False Acceptance Rate - Type II error |
| **FRR** | False Rejection Rate - Type I error |
| **CER** | Crossover Error Rate - Equal FAR/FRR |

**CER is the best measure** of biometric accuracy - lower is better.

### Access Control Models

| Model | Description |
|-------|-------------|
| **DAC** | Discretionary - Owner controls access |
| **MAC** | Mandatory - System/labels control |
| **RBAC** | Role-Based - Access by job function |
| **ABAC** | Attribute-Based - Dynamic policies |

### Privileged Access Management (PAM)

- Just-in-time (JIT) access
- Session monitoring
- Credential vaulting
- Access reviews
- Audit logging

---

## Domain 5D: Cryptography

### Encryption Types

| Type | Key Usage | Speed | Use Cases |
|------|-----------|-------|-----------|
| **Symmetric** | Same key encrypts/decrypts | Fast | Bulk data |
| **Asymmetric** | Public/Private key pair | Slow | Key exchange, signatures |

### Common Algorithms

| Algorithm | Type | Use |
|-----------|------|-----|
| **AES** | Symmetric | Data encryption |
| **3DES** | Symmetric | Legacy (deprecated) |
| **RSA** | Asymmetric | Key exchange, signatures |
| **ECC** | Asymmetric | Mobile, efficient |
| **SHA-256** | Hash | Integrity verification |

### Digital Signatures

Provide:
- **Authentication** - Proves sender identity
- **Integrity** - Detects modification
- **Non-repudiation** - Sender cannot deny

### PKI Components

| Component | Purpose |
|-----------|---------|
| **CA** | Certificate Authority - Issues certs |
| **RA** | Registration Authority - Verifies identity |
| **CRL** | Certificate Revocation List |
| **OCSP** | Online Certificate Status Protocol |

---

## Domain 5E: Network Security

### Network Zones

| Zone | Description |
|------|-------------|
| **DMZ** | Demilitarized zone for public services |
| **Internal** | Trusted network |
| **External** | Untrusted (Internet) |

### Firewall Types

| Type | Inspection Level |
|------|-----------------|
| **Packet Filter** | IP/Port only |
| **Stateful** | Connection tracking |
| **Application (WAF)** | Layer 7 content |
| **NGFW** | Next-Gen, deep inspection |

### Network Attacks

| Attack | Description | Defense |
|--------|-------------|---------|
| **DDoS** | Overwhelm with traffic | Rate limiting, CDN |
| **Man-in-the-Middle** | Intercept communications | Encryption, certificates |
| **ARP Spoofing** | Redirect local traffic | Dynamic ARP inspection |
| **DNS Spoofing** | Redirect DNS queries | DNSSEC |

### IDS vs. IPS

| System | Function |
|--------|----------|
| **IDS** | Intrusion Detection - Alerts only |
| **IPS** | Intrusion Prevention - Blocks threats |

### Detection Methods

| Method | Description |
|--------|-------------|
| **Signature** | Known patterns |
| **Anomaly** | Deviation from baseline |
| **Heuristic** | Behavioral analysis |

---

## Domain 5F: Endpoint Security

### Endpoint Protection

| Control | Purpose |
|---------|---------|
| **Antivirus** | Malware detection |
| **EDR** | Endpoint Detection & Response |
| **DLP** | Data Loss Prevention |
| **FDE** | Full Disk Encryption |
| **MDM** | Mobile Device Management |

### Patch Management

1. **Inventory** - Know all systems
2. **Assess** - Evaluate patches
3. **Test** - Validate in test environment
4. **Deploy** - Roll out systematically
5. **Verify** - Confirm success

---

## Domain 5G: Vulnerability Management

### Vulnerability Lifecycle

1. **Discovery** - Scanning, assessment
2. **Prioritization** - CVSS scoring
3. **Remediation** - Patching, mitigation
4. **Verification** - Confirm resolution
5. **Reporting** - Document status

### Penetration Testing

| Type | Knowledge |
|------|-----------|
| **Black Box** | No prior information |
| **White Box** | Full system knowledge |
| **Gray Box** | Partial knowledge |

### Security Testing Terms

| Term | Definition |
|------|------------|
| **Vulnerability Assessment** | Identify weaknesses |
| **Penetration Test** | Exploit weaknesses |
| **Red Team** | Simulate adversary |
| **Blue Team** | Defenders |
| **Purple Team** | Red + Blue collaboration |

---

## Domain 5H: Cloud Security

### Cloud Service Models

| Model | Provider Manages | Customer Manages |
|-------|-----------------|------------------|
| **IaaS** | Infrastructure | OS, Apps, Data |
| **PaaS** | + OS, Runtime | Apps, Data |
| **SaaS** | Everything | Data only |

### Shared Responsibility

\`\`\`
SaaS: Provider handles most security
PaaS: Shared application security
IaaS: Customer handles most security
\`\`\`

### Cloud Security Concerns

- Data residency and sovereignty
- Multi-tenancy isolation
- Vendor lock-in
- Visibility and monitoring
- API security
- Identity federation

---

## Domain 5I: Privacy

### Key Privacy Principles

1. **Notice** - Inform about collection
2. **Choice** - Opt-in/opt-out
3. **Access** - View own data
4. **Accuracy** - Correct errors
5. **Security** - Protect data
6. **Retention** - Don't keep longer than needed
7. **Accountability** - Responsible handling

### Privacy Regulations

| Regulation | Jurisdiction |
|------------|-------------|
| **GDPR** | European Union |
| **CCPA/CPRA** | California |
| **HIPAA** | US Healthcare |
| **PCI DSS** | Payment Cards |

### GDPR Key Rights

- Right to access
- Right to rectification
- Right to erasure (be forgotten)
- Right to portability
- Right to object

---

## Domain 5J: Zero Trust

### Zero Trust Principles

- **Never trust, always verify**
- Assume breach
- Verify explicitly
- Least privilege access
- Micro-segmentation

### Zero Trust Components

- Identity verification
- Device validation
- Network segmentation
- Application access control
- Data protection
- Continuous monitoring

---

## Key Memory Aids

### NIST CSF Functions
\`\`\`
I-P-D-R-R: Identify → Protect → Detect → Respond → Recover
\`\`\`

### Authentication Factors
\`\`\`
Know (password) + Have (token) + Are (biometric)
\`\`\`

### Encryption Types
\`\`\`
Symmetric = Same key = Fast = Bulk data
Asymmetric = Public/Private = Slow = Key exchange
\`\`\`

### Cloud Models (Low to High Provider Control)
\`\`\`
IaaS → PaaS → SaaS
\`\`\`

---

## Exam Tips for Domain 5

1. **CER is best biometric measure** - lower CER means more accurate
2. **Symmetric encryption is faster** than asymmetric
3. **Digital signatures** provide non-repudiation
4. **IPS blocks**, IDS only alerts
5. **WAF protects web applications** at Layer 7
6. **Zero Trust**: Never trust, always verify
7. **GDPR applies to EU citizens** regardless of company location
8. **SaaS = least customer security responsibility**
9. **Multi-factor = different factor types**, not just multiple passwords
10. **Data owner** is accountable for classification

---

## Practice Questions Focus Areas

- Authentication factors and MFA
- Encryption types and algorithms
- Access control models (DAC, MAC, RBAC)
- PKI components and digital signatures
- Network security devices and zones
- IDS/IPS detection methods
- Cloud security and shared responsibility
- Vulnerability and penetration testing
- Privacy principles and regulations
- Zero Trust architecture
