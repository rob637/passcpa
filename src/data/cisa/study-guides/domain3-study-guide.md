# CISA Domain 3: IS Acquisition, Development, and Implementation (12%)

## Overview

Domain 3 covers the systems development lifecycle, project management, and change control. This domain tests your understanding of how systems are acquired, developed, and implemented securely.

## Key Weight

**12% of the exam** - Smallest domain. Expect approximately 18 questions.

---

## Domain 3A: Project Governance

### Project Charter

Formal document that:
- Authorizes the project
- Defines scope and objectives
- Identifies stakeholders
- Grants PM authority
- Establishes governance

### Triple Constraints (Iron Triangle)

\`\`\`
Scope ↔ Time ↔ Cost
\`\`\`

Changes to one affect the others. Quality is sometimes considered a fourth constraint.

### Project Oversight

- Project Steering Committee
- Milestone reviews
- Budget tracking
- Risk management
- Issue escalation

---

## Domain 3B: Development Methodologies

### Waterfall

**Sequential phases, each completed before next:**

1. Requirements → 2. Design → 3. Development → 4. Testing → 5. Implementation

**Best for:**
- Well-defined requirements
- Stable technology
- Clear deliverables
- Minimal change expected

### Agile

**Iterative and incremental:**

- Short iterations (sprints)
- Continuous feedback
- Adaptive planning
- Working software priority

**Best for:**
- Evolving requirements
- Rapid delivery needed
- Customer collaboration
- Flexible scope

### Scrum Elements

| Element | Description |
|---------|-------------|
| **Sprint** | Time-boxed iteration (2-4 weeks) |
| **Product Backlog** | Prioritized feature list |
| **Sprint Backlog** | Items for current sprint |
| **Daily Standup** | Brief daily sync meeting |
| **Retrospective** | Post-sprint improvement review |

---

## Domain 3C: SDLC Phases

### Phase Overview

| Phase | Activities | Key Outputs |
|-------|------------|-------------|
| **Feasibility** | Analyze viability | Feasibility study |
| **Requirements** | Define what system should do | Requirements spec |
| **Design** | How system will work | Design documents |
| **Development** | Build the system | Code, configurations |
| **Testing** | Verify functionality | Test results |
| **Implementation** | Deploy to production | Live system |
| **Maintenance** | Ongoing support | Updates, fixes |

### Defect Cost Principle

**Cost to fix defects increases exponentially through phases:**

Requirements → Design → Development → Testing → Production

*Finding issues early saves significant time and money*

---

## Domain 3D: Application Security

### OWASP Top 10 (Key Vulnerabilities)

| Vulnerability | Description | Prevention |
|--------------|-------------|------------|
| **Injection** | Malicious data as commands | Parameterized queries |
| **Broken Auth** | Session/credential flaws | Strong session mgmt, MFA |
| **XSS** | Malicious scripts in pages | Output encoding, CSP |
| **Sensitive Data Exposure** | Unprotected data | Encryption, TLS |
| **Broken Access Control** | Missing authorization | Server-side enforcement |

### Security Testing Types

| Type | When | What |
|------|------|------|
| **SAST** | During development | Analyzes source code (white-box) |
| **DAST** | Against running app | Tests from outside (black-box) |
| **SCA** | During build | Checks dependencies/libraries |
| **Penetration Testing** | Pre-production | Simulates real attacks |

### DevSecOps Principles

- Security "shifts left" into development
- Automated security testing in CI/CD
- Security as code
- Continuous security monitoring
- Collaboration between dev, sec, ops

---

## Domain 3E: Testing Types

### Testing Hierarchy

| Test Type | Scope | Performed By |
|-----------|-------|--------------|
| **Unit Testing** | Individual components | Developers |
| **Integration Testing** | Components working together | Developers/QA |
| **System Testing** | Complete system | QA team |
| **UAT** | Business requirements | End users |
| **Regression Testing** | After changes | QA team |

### User Acceptance Testing (UAT)

- Performed by end users
- Verifies business requirements met
- Business decides acceptance
- Gate for production deployment

---

## Domain 3F: System Acquisition

### Build vs. Buy Decision

| Factor | Build | Buy |
|--------|-------|-----|
| **Time** | Longer | Faster |
| **Cost** | Higher upfront | Lower upfront |
| **Customization** | Full control | Limited |
| **Maintenance** | Internal | Vendor |
| **Risk** | Development risk | Vendor risk |

### Vendor Selection Process

1. Define requirements
2. Issue RFP (Request for Proposal)
3. Evaluate responses
4. Demonstrations/POC
5. Due diligence
6. Contract negotiation
7. Selection

---

## Domain 3G: Change Management

### Change Control Process

1. **Request** - Submit RFC (Request for Change)
2. **Assess** - Impact analysis
3. **Approve** - CAB review
4. **Test** - Validate in test environment
5. **Implement** - Deploy with rollback plan
6. **Review** - Post-implementation review

### Change Types

| Type | Process |
|------|---------|
| **Standard** | Pre-approved, low-risk |
| **Normal** | Full CAB review |
| **Emergency** | Expedited, post-approval |

### CAB (Change Advisory Board)

- Reviews and approves changes
- Assesses impact and risk
- Includes IT and business
- Prioritizes changes
- Manages change calendar

---

## Domain 3H: Implementation Approaches

### Conversion Strategies

| Approach | Description | Risk Level |
|----------|-------------|------------|
| **Parallel** | Old and new run together | Lowest |
| **Phased** | Implement by module/location | Medium |
| **Big Bang** | Complete cutover at once | Highest |
| **Pilot** | Test with subset first | Medium |

### Post-Implementation Review (PIR)

- Assess if objectives met
- Identify lessons learned
- Document improvements
- Address remaining issues
- Formal closure

---

## Domain 3I: Configuration Management

### CMDB (Configuration Management Database)

- Repository of configuration items (CIs)
- Documents relationships
- Foundation for change management
- Supports incident resolution

### Version Control

- Tracks code changes
- Maintains history
- Enables branching/merging
- Supports rollback
- Examples: Git, SVN

### Infrastructure as Code (IaC)

- Manage infrastructure via code
- Version controlled
- Testable and repeatable
- Examples: Terraform, Ansible, CloudFormation

---

## Key Memory Aids

### SDLC Phases
\`\`\`
Feasibility → Requirements → Design → Development → Testing → Implementation → Maintenance
\`\`\`

### Testing Order
\`\`\`
Unit → Integration → System → UAT → Regression
\`\`\`

### Change Process
\`\`\`
Request → Assess → Approve → Test → Implement → Review
\`\`\`

---

## Exam Tips for Domain 3

1. **Requirements errors are most expensive** to fix later
2. **User acceptance testing** is performed by end users, not QA
3. **Parallel implementation** is safest but most resource-intensive
4. **Emergency changes** still need post-implementation review
5. **SAST analyzes code**, DAST tests running applications
6. **Segregation** between development and production environments
7. **Version control** is essential for audit trails
8. **PIR** determines if project met objectives

---

## Practice Questions Focus Areas

- SDLC phases and activities
- Waterfall vs. Agile selection
- Testing types and sequence
- Change management process
- Implementation approaches
- Application security (OWASP)
- Security testing methods
- Configuration management
