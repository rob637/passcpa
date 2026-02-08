# CISA Domain 5: Protection of Information Assets
## 26% of Exam Weight (TIED FOR LARGEST)

---

## Information Security Fundamentals

### CIA Triad
| Principle | Meaning | Threats |
|-----------|---------|---------|
| **Confidentiality** | Prevent unauthorized disclosure | Data breach, eavesdropping |
| **Integrity** | Prevent unauthorized modification | Tampering, corruption |
| **Availability** | Ensure authorized access | DoS, system failure |

### Additional Security Concepts
| Concept | Definition |
|---------|------------|
| Non-repudiation | Cannot deny action |
| Authentication | Prove identity |
| Authorization | Grant access rights |
| Accountability | Trace actions to identity |

---

## Access Control

### AAA Framework
```
Authentication → Authorization → Accounting
(Who are you?)   (What can you do?)  (What did you do?)
```

### Authentication Factors
| Factor | Type | Examples |
|--------|------|----------|
| Type 1 | Knowledge | Passwords, PINs |
| Type 2 | Possession | Tokens, smart cards |
| Type 3 | Inherence | Biometrics |
| Type 4 | Location | GPS, IP address |

### Multi-Factor Authentication (MFA)
- Requires 2+ different factor types
- Same type twice is NOT MFA
- Significantly reduces account compromise

### Access Control Models
| Model | Description | Control |
|-------|-------------|---------|
| DAC | Owner decides | Discretionary |
| MAC | Labels/clearances | Mandatory |
| RBAC | Role-based | Roles |
| ABAC | Attribute-based | Attributes |

### Principle of Least Privilege
- Minimum access needed for job
- Just-in-time (JIT) access
- Regular access reviews
- Remove on role change

---

## Identity Management

### Identity Lifecycle
```
Provisioning → Authentication → Authorization
      ↓                              ↓
De-provisioning ← Access Review ← Monitoring
```

### Key IAM Concepts
| Concept | Definition |
|---------|------------|
| SSO | Single Sign-On |
| Federation | Cross-organization identity |
| PAM | Privileged Access Management |
| SAML | Security markup for SSO |
| OAuth | Authorization framework |
| OIDC | Identity layer on OAuth |

### Privileged Access Management
- Password vaulting
- Session recording
- Just-in-time access
- Break-glass procedures
- Regular rotation

---

## Cryptography

### Encryption Types
| Type | Keys | Speed | Use Case |
|------|------|-------|----------|
| Symmetric | Same key | Fast | Bulk data |
| Asymmetric | Public/private | Slow | Key exchange, signatures |
| Hybrid | Both | Optimal | TLS/SSL |

### Common Algorithms
| Type | Algorithms |
|------|------------|
| Symmetric | AES, 3DES, ChaCha20 |
| Asymmetric | RSA, ECC, DH |
| Hash | SHA-256, SHA-3 |

### Digital Signatures
```
Sender: Hash → Encrypt with Private Key = Signature
Receiver: Decrypt with Public Key → Compare Hash
```

Provides:
- Authentication
- Integrity
- Non-repudiation

### PKI Components
| Component | Function |
|-----------|----------|
| CA | Issues certificates |
| RA | Verifies identity |
| CRL | Lists revoked certs |
| OCSP | Real-time revocation check |

### Key Management
- Secure generation
- Protected storage
- Regular rotation
- Secure destruction
- Escrow when required

---

## Network Security

### Network Security Devices
| Device | Function | Layer |
|--------|----------|-------|
| Firewall | Traffic filtering | 3-7 |
| IDS | Detect intrusions | 3-7 |
| IPS | Prevent intrusions | 3-7 |
| WAF | Web app protection | 7 |
| Proxy | Content filtering | 7 |

### Network Zones
```
Internet → DMZ → Internal → Restricted
         (public)  (users)   (sensitive)
```

### Segmentation & Isolation
| Method | Purpose |
|--------|---------|
| VLANs | Logical segmentation |
| Micro-segmentation | Zero trust |
| Air gap | Physical isolation |
| Network ACLs | Traffic filtering |

### VPN Types
| Type | Use Case |
|------|----------|
| Site-to-site | Connect offices |
| Remote access | Individual users |
| SSL VPN | Browser-based |
| IPsec | Full network access |

---

## Threat Landscape

### Common Attack Types
| Attack | Description | Mitigation |
|--------|-------------|------------|
| Phishing | Deceptive emails | Training, filtering |
| Ransomware | Encrypt for ransom | Backups, patching |
| SQL Injection | DB manipulation | Parameterized queries |
| XSS | Script injection | Input validation |
| DoS/DDoS | Overwhelm resources | CDN, rate limiting |
| MitM | Intercept communications | Encryption, certificates |

### Social Engineering
| Technique | Description |
|-----------|-------------|
| Phishing | Email-based deception |
| Spear Phishing | Targeted phishing |
| Whaling | Executive targeting |
| Vishing | Voice phishing |
| Smishing | SMS phishing |
| Pretexting | Fabricated scenario |

### Advanced Threats
| Threat | Characteristics |
|--------|----------------|
| APT | Persistent, sophisticated |
| Zero-day | Unknown vulnerability |
| Supply chain | Through trusted vendors |
| Insider | Authorized users |

---

## Data Protection

### Data Classification
| Level | Examples | Controls |
|-------|----------|----------|
| Public | Marketing | Minimal |
| Internal | Policies | Access control |
| Confidential | PII, financial | Encryption |
| Restricted | Trade secrets | Strong encryption, monitoring |

### Data States
| State | Protection |
|-------|------------|
| At Rest | Disk encryption |
| In Transit | TLS/VPN |
| In Use | Memory protection |

### Data Protection Technologies
| Technology | Purpose |
|------------|---------|
| DLP | Prevent data exfiltration |
| Encryption | Protect confidentiality |
| Masking | Hide sensitive data |
| Tokenization | Replace with tokens |
| Rights Management | Control usage |

---

## Security Operations

### Security Monitoring
| Tool | Purpose |
|------|---------|
| SIEM | Aggregate and correlate events |
| EDR | Endpoint detection/response |
| SOAR | Automate response |
| XDR | Extended detection |

### Vulnerability Management
```
Discover → Assess → Prioritize → Remediate → Verify → Monitor
```

### Penetration Testing
| Type | Knowledge |
|------|-----------|
| Black Box | No knowledge |
| White Box | Full knowledge |
| Gray Box | Partial knowledge |

### Security Awareness
- Phishing simulations
- Regular training
- Policy acknowledgment
- Incident reporting
- Metrics tracking

---

## Cloud Security

### Cloud Security Responsibilities
| Control | IaaS | PaaS | SaaS |
|---------|------|------|------|
| Data | Customer | Customer | Customer |
| Applications | Customer | Customer | Provider |
| OS | Customer | Provider | Provider |
| Network | Shared | Provider | Provider |
| Physical | Provider | Provider | Provider |

### Cloud Security Controls
| Control | Purpose |
|---------|---------|
| CASB | Cloud access broker |
| CSPM | Posture management |
| CWPP | Workload protection |
| Identity Federation | SSO for cloud |

### Zero Trust Model
- Never trust, always verify
- Verify explicitly
- Least privilege access
- Assume breach
- Continuous validation

---

## Quick Reference

### Security Frameworks
| Framework | Focus |
|-----------|-------|
| NIST CSF | Cybersecurity |
| ISO 27001 | ISMS |
| CIS Controls | Prioritized security |
| COBIT | IT governance |
| PCI DSS | Payment security |

### Encryption Strength
| Algorithm | Key Size | Status |
|-----------|----------|--------|
| AES | 128/192/256 | Secure |
| RSA | 2048+ | Secure |
| 3DES | 168 | Legacy |
| DES | 56 | Deprecated |
| MD5 | 128 | Broken |

---

## Exam Tips - Domain 5

1. **CIA Triad is FUNDAMENTAL**
2. **Least privilege = minimum necessary access**
3. **MFA requires DIFFERENT factor types**
4. **Symmetric = fast, Asymmetric = secure key exchange**
5. **Digital signatures provide non-repudiation**
6. **Defense in depth = multiple layers**
7. **Classification drives controls**
8. **Zero Trust = verify everything, trust nothing**
9. **This is the LARGEST domain weight - master it!**

---

*Remember: Security is a process, not a product.*
