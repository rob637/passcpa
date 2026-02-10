# CISA Key Acronyms Reference

## Audit & Governance

| Acronym | Full Form | Definition |
|---------|-----------|------------|
| ISACA | Information Systems Audit and Control Association | Professional organization for CISA |
| CISA | Certified Information Systems Auditor | The certification |
| CAE | Chief Audit Executive | Head of internal audit function |
| COBIT | Control Objectives for Information and Related Technologies | IT governance framework |
| ITIL | Information Technology Infrastructure Library | IT service management framework |

---

## Business Continuity & Disaster Recovery

| Acronym | Full Form | Definition |
|---------|-----------|------------|
| BCP | Business Continuity Plan | Overall plan to maintain business operations |
| DRP | Disaster Recovery Plan | Plan to recover IT systems after disaster |
| BIA | Business Impact Analysis | Identifies critical functions and impacts |
| RTO | Recovery Time Objective | Max acceptable downtime |
| RPO | Recovery Point Objective | Max acceptable data loss (time) |
| MTPD | Maximum Tolerable Period of Disruption | Longest outage before severe harm |
| MTTR | Mean Time to Repair | Average time to fix a component |
| MTBF | Mean Time Between Failures | Average time between system failures |

### BCP/DRP Hierarchy
```
MTPD ≥ RTO ≥ WRT (Work Recovery Time)
```

---

## Systems Development

| Acronym | Full Form | Definition |
|---------|-----------|------------|
| SDLC | Systems Development Life Cycle | Framework for developing systems |
| RAD | Rapid Application Development | Iterative development approach |
| CI/CD | Continuous Integration/Continuous Deployment | Automated build/deploy |
| UAT | User Acceptance Testing | End-user validates requirements met |
| QA | Quality Assurance | Process to ensure quality standards |
| SIT | System Integration Testing | Testing integrated components |
| FAT | Factory Acceptance Testing | Vendor testing before delivery |

---

## Security & Access Control

| Acronym | Full Form | Definition |
|---------|-----------|------------|
| IAM | Identity and Access Management | System for managing user identities |
| SSO | Single Sign-On | One login for multiple systems |
| MFA | Multi-Factor Authentication | Multiple authentication methods |
| RBAC | Role-Based Access Control | Access by job role |
| DAC | Discretionary Access Control | Owner controls access |
| MAC | Mandatory Access Control | System enforces access (clearances) |
| PKI | Public Key Infrastructure | Framework for digital certificates |
| CA | Certificate Authority | Issues digital certificates |

---

## Network & Security

| Acronym | Full Form | Definition |
|---------|-----------|------------|
| IDS | Intrusion Detection System | Detects suspicious activity |
| IPS | Intrusion Prevention System | Blocks suspicious activity |
| SIEM | Security Information and Event Management | Log aggregation and analysis |
| DMZ | Demilitarized Zone | Network buffer between internal/external |
| VPN | Virtual Private Network | Encrypted tunnel over internet |
| WAF | Web Application Firewall | Protects web applications |
| DLP | Data Loss Prevention | Prevents data exfiltration |
| SOC | Security Operations Center | Team monitoring security |

---

## Encryption & Cryptography

| Acronym | Full Form | Definition |
|---------|-----------|------------|
| AES | Advanced Encryption Standard | Symmetric encryption (128/192/256-bit) |
| DES | Data Encryption Standard | Legacy symmetric encryption (56-bit) |
| 3DES | Triple DES | Three rounds of DES |
| RSA | Rivest-Shamir-Adleman | Asymmetric encryption algorithm |
| SHA | Secure Hash Algorithm | Hashing algorithm (SHA-256, etc.) |
| MD5 | Message Digest 5 | Legacy hashing (broken) |
| SSL | Secure Sockets Layer | Legacy encryption protocol |
| TLS | Transport Layer Security | Current encryption protocol |

---

## Risk & Controls

| Acronym | Full Form | Definition |
|---------|-----------|------------|
| KRI | Key Risk Indicator | Metric indicating risk level |
| KPI | Key Performance Indicator | Metric for performance |
| CSF | Critical Success Factor | Essential for success |
| SOD | Segregation of Duties | Separate conflicting roles |
| SLA | Service Level Agreement | Contracted performance standards |
| OLA | Operational Level Agreement | Internal service agreement |

---

## Standards & Frameworks

| Acronym | Full Form | Purpose |
|---------|-----------|---------|
| ISO 27001 | Information Security Management | Security management standard |
| ISO 27002 | Security Controls | Implementation guidance |
| NIST | National Institute of Standards and Technology | US standards body |
| SOC | Service Organization Control | Audit reports for service providers |
| PCI DSS | Payment Card Industry Data Security Standard | Credit card security |
| HIPAA | Health Insurance Portability and Accountability Act | Healthcare data privacy |
| GDPR | General Data Protection Regulation | EU privacy law |

---

## Quick Memory Aids

### RTO vs RPO
- **RTO** = "Time" to get back up
- **RPO** = "Point" in time for data (how much lost)

### IDS vs IPS
- **IDS** = Detects (passive)
- **IPS** = Prevents (active)

### Symmetric vs Asymmetric
- **Symmetric** = Same key (faster, bulk data)
- **Asymmetric** = Different keys (slower, key exchange)

---

## Most Tested Acronyms

1. RTO, RPO, MTPD (BCP/DRP)
2. SDLC (Development)
3. COBIT, ITIL (Frameworks)
4. IDS, IPS, SIEM (Security)
5. PKI, CA, SSL/TLS (Encryption)
6. RBAC, DAC, MAC (Access Control)
