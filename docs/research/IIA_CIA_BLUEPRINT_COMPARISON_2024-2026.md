# IIA CIA Exam Blueprint Analysis: Official vs App Configuration

**Research Date:** February 7, 2026  
**Blueprint Version:** 2024-2026 CIA Content Specification Outlines  
**Last IIA Update:** January 9, 2025 (Global Internal Audit Standards effective)

---

## Executive Summary

This document compares the **official IIA Certified Internal Auditor (CIA) Exam Blueprint** with the current PassCPA app configuration. The main course configuration is **largely accurate**, but there are **critical errors in the mock exam weight configuration** that must be corrected.

### Key Discrepancies Found

| Location | Issue | Severity |
|----------|-------|----------|
| **mock-exams/config.ts - CIA2** | Domain III weight is 20% instead of 40% | 🔴 Critical |
| **mock-exams/config.ts - CIA2** | Has CIA2-V (5 domains) but exam has only 4 domains | 🔴 Critical |
| **mock-exams/config.ts - CIA3** | Domain I (Business Acumen) is 25% instead of 35% | 🔴 Critical |
| **mock-exams/config.ts - CIA3** | Domain IV (Financial) is 30% instead of 20% | 🔴 Critical |
| **Content** | GIAS 2024 terminology should be verified | 🟡 Moderate |
| **Lessons** | Part 3 IT topics may need updating for emerging tech | 🟡 Moderate |

---

## Official IIA CIA Exam Structure (2024-2026)

### Overview

The CIA certification is a three-part exam administered by the Institute of Internal Auditors (IIA) through Pearson VUE testing centers worldwide.

**Key Update:** The **Global Internal Audit Standards (GIAS)** became effective **January 9, 2025**, replacing the previous International Standards for the Professional Practice of Internal Auditing. This is a significant change that affects Part 1 content particularly.

### Exam Format Summary

| Part | Questions | Time | Passing Score |
|------|-----------|------|---------------|
| Part 1: Essentials of Internal Auditing | 125 MCQs | 2.5 hours (150 min) | 600/750 (scaled) |
| Part 2: Practice of Internal Auditing | 100 MCQs | 2 hours (120 min) | 600/750 (scaled) |
| Part 3: Business Knowledge for Internal Auditing | 100 MCQs | 2 hours (120 min) | 600/750 (scaled) |

### Scoring
- Scaled scoring from 250-750
- Passing score: 600
- No penalty for wrong answers
- All questions weighted equally

---

## Part 1: Essentials of Internal Auditing

### Official Domain Structure

| Domain | Content | Weight | App Weight | Status |
|--------|---------|--------|------------|--------|
| I | Foundations of Internal Auditing | 40% | 40% | ✅ Correct |
| II | Independence and Objectivity | 15% | 15% | ✅ Correct |
| III | Proficiency and Due Professional Care | 15% | 15% | ✅ Correct |
| IV | Quality Assurance and Improvement Program | 10% | 10% | ✅ Correct |
| V | Governance, Risk Management, and Control | 20% | 20% | ✅ Correct |

### Domain Details

#### Domain I: Foundations of Internal Auditing (40%) - HIGHEST WEIGHT
**Topics:**
- Mission of internal auditing
- Definition of internal auditing
- Core Principles for the Professional Practice of Internal Auditing
- Code of Ethics (Integrity, Objectivity, Confidentiality, Competency)
- International Standards for the Professional Practice of Internal Auditing / Global Internal Audit Standards (GIAS)
- Types of internal audit services (assurance vs. consulting)
- Three Lines Model

**Heavily Tested:**
- IIA Mission statement: "To enhance and protect organizational value..."
- Internal Audit Definition: "Independent, objective assurance and consulting activity..."
- Mandatory vs. Recommended IPPF guidance
- Core Principles (10 total)

#### Domain II: Independence and Objectivity (15%)
**Topics:**
- Organizational independence
- Individual objectivity
- Impairments to independence or objectivity
- Threats and safeguards

**Heavily Tested:**
- CAE functional reporting to board
- Disclosure requirements for impairments
- Self-review threats

#### Domain III: Proficiency and Due Professional Care (15%)
**Topics:**
- Knowledge, skills, and other competencies
- Due professional care
- Continuing professional development

**Heavily Tested:**
- Reasonable care vs. infallibility
- Professional skepticism
- CPE requirements

#### Domain IV: Quality Assurance and Improvement Program (10%) - LOWEST WEIGHT
**Topics:**
- Internal assessments
- External assessments
- Reporting on QAIP

**Heavily Tested:**
- External assessment every 5 years
- "Conforms with IIA Standards" usage requirements
- QAIP program elements

#### Domain V: Governance, Risk Management, and Control (20%)
**Topics:**
- Corporate governance concepts
- Organizational ethics
- Enterprise risk management (ERM)
- Internal control frameworks (COSO)
- Business continuity

**Heavily Tested:**
- COSO Internal Control Framework (5 components, 17 principles)
- Three Lines Model
- Risk assessment and response

---

## Part 2: Practice of Internal Auditing

### Official Domain Structure

| Domain | Content | Weight | App Config | Mock Config | Status |
|--------|---------|--------|------------|-------------|--------|
| I | Managing the Internal Audit Activity | 20% | 20% | 20% | ✅ Correct |
| II | Planning the Engagement | 20% | 20% | 20% | ✅ Correct |
| III | Performing the Engagement | **40%** | 40% | ❌ 20% | 🔴 **CRITICAL** |
| IV | Communicating Engagement Results | 20% | 20% | 20% | ✅ Correct |
| V | (Does not exist) | - | - | ❌ 20% | 🔴 **CRITICAL** |

### Domain Details

#### Domain I: Managing the Internal Audit Activity (20%)
**Topics:**
- Internal audit planning and strategy
- Resource management
- Policies and procedures
- Coordination with other assurance providers
- Reporting to management and board

**Heavily Tested:**
- Risk-based audit planning
- Audit universe development
- CAE responsibilities

#### Domain II: Planning the Engagement (20%)
**Topics:**
- Engagement planning process
- Establishing objectives, scope, and resource allocation
- Preliminary survey/planning
- Engagement work program
- Fraud considerations

**Heavily Tested:**
- Engagement objectives linked to risks
- Scope determination
- Work program development

#### Domain III: Performing the Engagement (40%) - HIGHEST WEIGHT
**Topics:**
- Information gathering techniques (interviewing, observation, flowcharting)
- Sampling methodologies (statistical and non-statistical)
- Testing and analysis
- Working paper documentation
- Supervision and review

**Heavily Tested:**
- Sufficient, reliable, relevant, useful evidence criteria
- Analytical procedures
- Audit sampling approaches
- Documentation standards

#### Domain IV: Communicating Engagement Results (20%)
**Topics:**
- Communication criteria (accurate, objective, clear, constructive, complete, timely)
- Quality of communications
- Errors and omissions
- Disseminating results
- Monitoring progress

**Heavily Tested:**
- Five C's of communication
- Final report contents
- Follow-up procedures

---

## Part 3: Business Knowledge for Internal Auditing

### Official Domain Structure

| Domain | Content | Weight | App Config | Mock Config | Status |
|--------|---------|--------|------------|-------------|--------|
| I | Business Acumen | **35%** | 35% | ❌ 25% | 🔴 **CRITICAL** |
| II | Information Security | 25% | 25% | 25% | ✅ Correct |
| III | Information Technology | 20% | 20% | 20% | ✅ Correct |
| IV | Financial Management | **20%** | 20% | ❌ 30% | 🔴 **CRITICAL** |

### Domain Details

#### Domain I: Business Acumen (35%) - HIGHEST WEIGHT
**Topics:**
- Strategic management concepts
- Organizational objectives and operations
- Business processes and structures
- Organizational behavior
- Project management concepts
- Quality management (Six Sigma, Lean, TQM)
- Change management

**Heavily Tested:**
- Porter's Five Forces
- SWOT analysis
- Balanced Scorecard
- KPIs and metrics
- Business process reengineering

#### Domain II: Information Security (25%)
**Topics:**
- Information security fundamentals (CIA triad)
- Information security governance
- Security frameworks (ISO 27001, NIST)
- Threat and vulnerability assessment
- Security controls (preventive, detective, corrective)
- Incident response
- Business continuity/disaster recovery

**Heavily Tested:**
- CIA Triad (Confidentiality, Integrity, Availability)
- Defense in depth
- Access control principles
- Encryption basics
- Social engineering threats

#### Domain III: Information Technology (20%)
**Topics:**
- IT governance and strategy
- IT general controls
- Application controls
- IT operations and infrastructure
- System development lifecycle (SDLC)
- Data analytics
- Emerging technologies (AI, blockchain, cloud, IoT)

**Heavily Tested:**
- IT general controls vs. application controls
- Change management controls
- Backup and recovery
- Cloud computing models (IaaS, PaaS, SaaS)

#### Domain IV: Financial Management (20%)
**Topics:**
- Financial accounting and finance fundamentals
- Financial statement analysis
- Ratio analysis
- Managerial accounting concepts
- Budgeting and forecasting
- Cost concepts (fixed, variable, direct, indirect)
- Capital budgeting

**Heavily Tested:**
- Financial ratios (liquidity, profitability, leverage)
- Break-even analysis
- Time value of money
- Variance analysis
- Working capital management

---

## Recent Changes to Be Aware Of (2024-2026)

### 1. Global Internal Audit Standards (GIAS) - Effective January 9, 2025

The IIA released new Global Internal Audit Standards that replace the previous IPPF structure:

**Key Changes:**
- New 15 domains instead of the previous Attribute/Performance structure
- Updated Mission of Internal Auditing
- Revised Core Principles
- New implementation guidance structure
- Enhanced focus on:
  - Technology and data analytics
  - Building trusted relationships
  - Communicating effective information
  - Advancing quality and continuous improvement

**Impact on Exam:**
- Part 1 content heavily affected
- Current IPPF mentions may need updating to GIAS terminology
- Transition period allows for both frameworks

### 2. Enhanced Technology Focus
- Greater emphasis on emerging technologies
- Data analytics as an audit tool
- Cybersecurity considerations
- Cloud computing and third-party risk

### 3. ESG and Sustainability
- Increased questions on:
  - Environmental risks
  - Social responsibility auditing
  - Governance over sustainability reporting

---

## Discrepancies Requiring Immediate Correction

### 1. 🔴 CRITICAL: Mock Exam Config CIA2 Weights

**File:** `src/data/cia/mock-exams/config.ts`

**Current (INCORRECT):**
```typescript
CIA2: {
  'CIA2-I': 0.20,
  'CIA2-II': 0.20,
  'CIA2-III': 0.20,  // WRONG - should be 0.40
  'CIA2-IV': 0.20,
  'CIA2-V': 0.20    // WRONG - this domain doesn't exist
}
```

**Should Be:**
```typescript
CIA2: {
  'CIA2-I': 0.20,
  'CIA2-II': 0.20,
  'CIA2-III': 0.40,  // Performing the Engagement is 40%
  'CIA2-IV': 0.20
  // No CIA2-V - Part 2 only has 4 domains
}
```

### 2. 🔴 CRITICAL: Mock Exam Config CIA3 Weights

**File:** `src/data/cia/mock-exams/config.ts`

**Current (INCORRECT):**
```typescript
CIA3: {
  'CIA3-I': 0.25,   // WRONG - should be 0.35
  'CIA3-II': 0.25,  // Correct
  'CIA3-III': 0.20, // Correct
  'CIA3-IV': 0.30   // WRONG - should be 0.20
}
```

**Should Be:**
```typescript
CIA3: {
  'CIA3-I': 0.35,   // Business Acumen is 35%
  'CIA3-II': 0.25,  // Information Security is 25%
  'CIA3-III': 0.20, // IT is 20%
  'CIA3-IV': 0.20   // Financial is 20%
}
```

---

## Topics That May Need Enhancement

### Part 1 - GIAS 2024 Updates
- [ ] Update references from "IPPF" to include "Global Internal Audit Standards"
- [ ] Add new 15-domain structure of GIAS
- [ ] Update any deprecated terminology
- [ ] Add coverage of new Core Principles wording

### Part 3 - Emerging Technologies
- [ ] Generative AI and machine learning in auditing
- [ ] Advanced data analytics techniques
- [ ] Cloud-native architectures
- [ ] Zero-trust security models
- [ ] Cryptocurrency and blockchain auditing
- [ ] IoT security considerations

### Part 3 - ESG Topics
- [ ] Climate risk assessment
- [ ] Sustainability reporting frameworks (GRI, SASB)
- [ ] Social responsibility auditing
- [ ] DEI (Diversity, Equity, Inclusion) governance

---

## Validation Status

### Course Configuration (config.ts) ✅
- Part 1 domains and weights: **CORRECT**
- Part 2 domains and weights: **CORRECT**
- Part 3 domains and weights: **CORRECT**
- Question counts: **CORRECT** (125, 100, 100)
- Time allowed: **CORRECT** (150, 120, 120 minutes)
- Passing score: **CORRECT** (600/750)

### Mock Exam Configuration (mock-exams/config.ts) ❌
- CIA1 weights: **CORRECT**
- CIA2 weights: **INCORRECT** - Domain III weight wrong, phantom Domain V
- CIA3 weights: **INCORRECT** - Domains I and IV weights swapped

### Content Files ✅
Based on grep results, the content files (questions, lessons, flashcards, cheatsheets) correctly reference:
- Domain III: Performing the Engagement (40%) for Part 2
- Domain I: Business Acumen (35%) for Part 3

---

## Recommended Actions

### Immediate (Critical)
1. **Fix mock-exams/config.ts** - Correct CIA2 and CIA3 blueprint weights

### Short-term (Moderate)
2. **Review GIAS 2024 alignment** - Ensure Part 1 content reflects new standards
3. **Update emerging tech content** - Add current technology topics to Part 3

### Long-term (Enhancement)
4. **Add ESG content** - Growing exam focus area
5. **Enhance data analytics coverage** - Practical audit applications
6. **Add more simulation-based practice** - Complex scenario practice

---

## References

- IIA Global - CIA Certification: https://www.theiia.org/en/certifications/cia/
- IIA Global Internal Audit Standards (2024): https://www.theiia.org/standards
- CIA Exam Syllabus: https://www.theiia.org/en/certifications/cia/cia-exam-syllabus/
- Pearson VUE CIA Testing: https://home.pearsonvue.com/iia

---

*Document prepared for PassCPA internal use - February 2026*
