# CISA Domain 2: Governance and Management of IT (18%)

## Overview

Domain 2 focuses on IT governance structures, policies, risk management, and ensuring IT supports business objectives. This domain tests your understanding of how organizations manage IT strategically.

## Key Weight

**18% of the exam** - Expect approximately 27 questions.

---

## Domain 2A: IT Governance

### What is IT Governance?

A framework ensuring:
- IT investments support business objectives
- Risks are managed appropriately
- Resources are used responsibly

### SVRP-P Outcomes

| Outcome | Description |
|---------|-------------|
| **S**trategic Alignment | IT supports business strategy |
| **V**alue Delivery | IT investments provide value |
| **R**isk Management | IT risks are identified and managed |
| **P**erformance Measurement | IT is measured and monitored |
| **+Resource Management** | IT resources used effectively |

### Governance Bodies

- **Board of Directors** - Ultimate accountability
- **IT Steering Committee** - IT/business leadership oversight
- **Executive Management** - Day-to-day governance

---

## Domain 2B: IT Strategy and Policies

### Strategic Alignment

IT strategy must:
- Support business objectives
- Enable business capabilities
- Be reviewed regularly
- Have executive sponsorship

### Policy Hierarchy

| Level | Nature | Description |
|-------|--------|-------------|
| **Policies** | Mandatory | High-level management intent |
| **Standards** | Mandatory | Specific requirements |
| **Procedures** | Mandatory | Step-by-step instructions |
| **Guidelines** | Optional | Recommendations |

*Remember: Policies say WHAT, Procedures say HOW*

---

## Domain 2C: Organizational Structure

### Segregation of Duties (SoD)

**Incompatible functions to separate:**
- **Authorization** - Approve transactions
- **Custody** - Access to assets
- **Recording** - Accounting/documentation
- **Verification** - Reconciliation

**When SoD not possible:**
Use compensating controls (supervision, logging, reviews)

### Key IT Roles

| Role | Responsibility |
|------|----------------|
| **Data Owner** | Classification, access decisions (Business) |
| **Data Custodian** | Implement controls, protect data (IT) |
| **CISO** | Security program leadership |
| **CIO** | Overall IT management |

---

## Domain 2D: HR Controls

### Hiring Controls
- Background checks
- Reference verification
- Skills validation
- Security awareness

### Ongoing Controls
- Security awareness training
- Performance reviews
- Access reviews
- **Mandatory vacation** (detective control for fraud)
- Job rotation

### Termination Controls
- Immediate access revocation
- Equipment collection
- Exit interview
- Knowledge transfer

---

## Domain 2E: Risk Management

### Risk Treatment Options

| Option | Action |
|--------|--------|
| **Accept** | Accept the risk as-is |
| **Mitigate** | Reduce likelihood or impact |
| **Transfer** | Shift to third party (insurance) |
| **Avoid** | Eliminate the activity |

### Quantitative Risk Formulas

\`\`\`
SLE = Asset Value (AV) × Exposure Factor (EF)
ALE = SLE × ARO (Annualized Rate of Occurrence)
\`\`\`

**Example:**
- Server worth $100,000
- Flood causes 40% damage (EF = 0.4)
- Floods occur once every 5 years (ARO = 0.2)
- SLE = $100,000 × 0.4 = $40,000
- ALE = $40,000 × 0.2 = $8,000/year

### Residual Risk

\`\`\`
Residual Risk = Inherent Risk - Control Effectiveness
\`\`\`

*Must be within risk appetite*

---

## Domain 2F: Vendor Management

### Due Diligence

Before engagement:
- Financial stability
- Security practices
- Compliance status
- References
- Technical capabilities

### Contract Requirements

- Security requirements
- **Right to audit**
- Data protection obligations
- Incident notification
- Breach liability
- **Exit/transition provisions**

### Ongoing Monitoring

- Service level monitoring
- Security assessments
- Compliance verification
- Relationship management

---

## Domain 2G: Business Impact Analysis (BIA)

### Key BIA Outputs

| Metric | Definition |
|--------|------------|
| **MTD** | Maximum Tolerable Downtime - business fails after this |
| **RTO** | Recovery Time Objective - systems restored within |
| **RPO** | Recovery Point Objective - max data loss (time) |
| **WRT** | Work Recovery Time - verify and catch up |

### Relationship
\`\`\`
MTD ≥ RTO + WRT
\`\`\`

### Process Prioritization

Rank by impact:
- Revenue loss
- Regulatory penalties
- Customer impact
- Reputational damage

---

## Domain 2H: IT Service Management

### ITIL Framework

IT Infrastructure Library covers:
- Service Strategy
- Service Design
- Service Transition
- Service Operation
- Continual Improvement

### Key ITIL Concepts

| Concept | Description |
|---------|-------------|
| **Incident** | Unplanned service interruption (restore quickly) |
| **Problem** | Root cause of incidents (prevent recurrence) |
| **Change** | Modification to IT environment |
| **Service Request** | User request (not an incident) |

### SLA Components

- Availability targets
- Response times
- Performance metrics
- Escalation procedures
- Remedies for failure

---

## Key Formulas & Memory Aids

### Risk Formulas
\`\`\`
SLE = AV × EF
ALE = SLE × ARO
\`\`\`

### Recovery Objectives
\`\`\`
MTD > RTO + WRT
RPO determines backup frequency
\`\`\`

### SVRP-P (Governance Outcomes)
- Strategic alignment
- Value delivery
- Risk management
- Performance measurement
- Resource management (Plus)

---

## Exam Tips for Domain 2

1. **Board is ultimately responsible** for IT governance
2. **Data owner decides classification** (business, not IT)
3. **SoD conflicts require compensating controls**
4. **Right to audit** is essential in vendor contracts
5. **MTD must be greater than RTO**
6. **Risk appetite is set by the board**
7. **Policies require senior management approval**
8. **Mandatory vacation is a detective control**

---

## Practice Questions Focus Areas

- IT governance structures and responsibilities
- Policy hierarchy and approval
- SoD and compensating controls
- Risk assessment and quantification
- Vendor management and contracts
- BIA and recovery objectives
- ITIL/ITSM concepts
