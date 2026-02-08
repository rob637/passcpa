# AICPA CPA Exam Blueprint Analysis: Official vs App Configuration

**Research Date:** February 7, 2026  
**Blueprint Version:** 2024-2025 CPA Evolution (Effective January 2024)  
**Last AICPA Update:** January 2024 (CPA Evolution launch)

---

## Executive Summary

This document compares the **official AICPA CPA Exam Blueprint** (as restructured under CPA Evolution, effective January 2024) with the current PassCPA app configuration. Several discrepancies have been identified that need correction for world-class exam prep alignment.

### Key Discrepancies Found

| Section | Issue | Severity |
|---------|-------|----------|
| **FAR** | App has 4 areas; Official has **5 areas** | 🔴 Critical |
| **FAR** | Weight ranges incorrect | 🔴 Critical |
| **AUD** | Area IV weight range incorrect (10-20% vs 15-25%) | 🟡 Moderate |
| **REG** | Area II missing (Business Law removed in Evolution) | 🟡 Moderate |
| **REG** | Property Transactions not a separate area | 🟡 Moderate |
| **BAR** | App has 3 areas; Official has **4 areas** | 🔴 Critical |
| **BAR** | All weight ranges incorrect | 🔴 Critical |
| **ISC** | Weight ranges slightly off | 🟡 Moderate |
| **TCP** | App has 3 areas; Official has **4 areas** | 🔴 Critical |
| **TCP** | All weight ranges incorrect | 🔴 Critical |
| **Question Counts** | Several sections have incorrect counts | 🟡 Moderate |

---

## CPA Evolution Overview (January 2024)

### Exam Structure

**Core Sections (Required for all candidates):**
- AUD - Auditing and Attestation
- FAR - Financial Accounting and Reporting  
- REG - Taxation and Regulation

**Discipline Sections (Choose ONE based on career path):**
- BAR - Business Analysis and Reporting
- ISC - Information Systems and Controls
- TCP - Tax Compliance and Planning

### Exam Format by Section

| Section | MCQs | TBS | Total Time | MCQ Weight | TBS Weight |
|---------|------|-----|------------|------------|------------|
| **AUD** | 78 | 7 | 4 hours | 50% | 50% |
| **FAR** | 50 | 7 | 4 hours | 50% | 50% |
| **REG** | 72 | 8 | 4 hours | 50% | 50% |
| **BAR** | 50 | 7 | 4 hours | 50% | 50% |
| **ISC** | 82 | 6 | 4 hours | 60% | 40% |
| **TCP** | 68 | 7 | 4 hours | 50% | 50% |

---

## Detailed Blueprint Comparison by Section

---

## 1. FAR - Financial Accounting and Reporting

### Official AICPA Blueprint (2024-2025)

| Area | Name | Weight Range |
|------|------|--------------|
| **Area I** | Conceptual Framework, Standard-Setting, and Financial Reporting | **5-15%** |
| **Area II** | Select Financial Statement Accounts | **30-40%** |
| **Area III** | Select Transactions | **25-35%** |
| **Area IV** | State and Local Governments | **10-20%** |
| **Area V** | Not-for-Profit Entities | **5-15%** |

**Total: 5 Areas**

### Current App Configuration

| Area | Name | Weight Range |
|------|------|--------------|
| FAR-I | Conceptual Framework and Financial Reporting | 25-35% ❌ |
| FAR-II | Select Financial Statement Accounts | 30-40% ✅ |
| FAR-III | Select Transactions | 20-30% ❌ |
| FAR-IV | State and Local Governments | 5-15% ❌ |

**Total: 4 Areas** ❌ (Missing Area V - NFP)

### Discrepancies

1. **Missing Area V (Not-for-Profit Entities)** - Critical
   - Official blueprint separates NFP as its own weighted area
   - App incorrectly omits this as a standalone area

2. **Area I Weight Incorrect**
   - Official: 5-15%
   - App: 25-35% (WRONG - 20 percentage points too high!)

3. **Area III Weight Incorrect**
   - Official: 25-35%
   - App: 20-30% (WRONG - 5 percentage points too low)

4. **Area IV Weight Incorrect**
   - Official: 10-20%
   - App: 5-15% (WRONG - 5 percentage points too low)

### ✅ Correct FAR Configuration

```typescript
FAR: [
  { areaId: 'FAR-I', areaName: 'Conceptual Framework, Standard-Setting, and Financial Reporting', weight: '5-15%' },
  { areaId: 'FAR-II', areaName: 'Select Financial Statement Accounts', weight: '30-40%' },
  { areaId: 'FAR-III', areaName: 'Select Transactions', weight: '25-35%' },
  { areaId: 'FAR-IV', areaName: 'State and Local Governments', weight: '10-20%' },
  { areaId: 'FAR-V', areaName: 'Not-for-Profit Entities', weight: '5-15%' },
]
```

---

## 2. AUD - Auditing and Attestation

### Official AICPA Blueprint (2024-2025)

| Area | Name | Weight Range |
|------|------|--------------|
| **Area I** | Ethics, Professional Responsibilities, and General Principles | **15-25%** |
| **Area II** | Assessing Risk and Developing a Planned Response | **25-35%** |
| **Area III** | Performing Further Procedures and Obtaining Evidence | **30-40%** |
| **Area IV** | Forming Conclusions and Reporting | **15-25%** |

**Total: 4 Areas**

### Current App Configuration

| Area | Name | Weight Range |
|------|------|--------------|
| AUD-I | Ethics, Professional Responsibilities, and General Principles | 15-25% ✅ |
| AUD-II | Assessing Risk and Developing a Planned Response | 25-35% ✅ |
| AUD-III | Performing Further Procedures and Obtaining Evidence | 30-40% ✅ |
| AUD-IV | Forming Conclusions and Reporting | 10-20% ❌ |

**Total: 4 Areas** ✅

### Discrepancies

1. **Area IV Weight Incorrect**
   - Official: 15-25%
   - App: 10-20% (WRONG - 5 percentage points too low)

### ✅ Correct AUD Configuration

```typescript
AUD: [
  { areaId: 'AUD-I', areaName: 'Ethics, Professional Responsibilities, and General Principles', weight: '15-25%' },
  { areaId: 'AUD-II', areaName: 'Assessing Risk and Developing a Planned Response', weight: '25-35%' },
  { areaId: 'AUD-III', areaName: 'Performing Further Procedures and Obtaining Evidence', weight: '30-40%' },
  { areaId: 'AUD-IV', areaName: 'Forming Conclusions and Reporting', weight: '15-25%' },
]
```

---

## 3. REG - Taxation and Regulation

### Official AICPA Blueprint (2024-2025)

| Area | Name | Weight Range |
|------|------|--------------|
| **Area I** | Ethics, Professional Responsibilities, and Federal Tax Procedures | **10-20%** |
| **Area II** | Business Law | **10-20%** |
| **Area III** | Federal Taxation of Individuals | **15-25%** |
| **Area IV** | Federal Taxation of Entities | **22-32%** |
| **Area V** | Federal Taxation of Property Transactions | **12-22%** |

**Total: 5 Areas**

### Current App Configuration

| Area | Name | Weight Range |
|------|------|--------------|
| REG-I | Ethics and Responsibilities in Tax Practice | 10-20% ✅ |
| REG-II | Federal Taxation of Property Transactions | 12-22% ⚠️ |
| REG-III | Federal Taxation of Individuals | 22-32% ❌ |
| REG-IV | Federal Taxation of Entities | 28-38% ❌ |

**Total: 4 Areas** ❌ (Missing Business Law separation)

### Discrepancies

1. **Missing Business Law as Separate Area**
   - Official blueprint includes Business Law (Area II) as 10-20%
   - CPA Evolution **RETAINED** Business Law in REG (despite rumors it was removed)

2. **Area Numbering/Organization Wrong**
   - Property Transactions is Area V (not II) in official blueprint
   - Individual taxation is Area III (correct name but wrong weight)

3. **Weight Ranges Incorrect**
   - Individuals: Official 15-25%, App has 22-32%
   - Entities: Official 22-32%, App has 28-38%

### ✅ Correct REG Configuration

```typescript
REG: [
  { areaId: 'REG-I', areaName: 'Ethics, Professional Responsibilities, and Federal Tax Procedures', weight: '10-20%' },
  { areaId: 'REG-II', areaName: 'Business Law', weight: '10-20%' },
  { areaId: 'REG-III', areaName: 'Federal Taxation of Individuals', weight: '15-25%' },
  { areaId: 'REG-IV', areaName: 'Federal Taxation of Entities', weight: '22-32%' },
  { areaId: 'REG-V', areaName: 'Federal Taxation of Property Transactions', weight: '12-22%' },
]
```

---

## 4. BAR - Business Analysis and Reporting

### Official AICPA Blueprint (2024-2025)

| Area | Name | Weight Range |
|------|------|--------------|
| **Area I** | Business Analysis | **40-50%** |
| **Area II** | Technical Accounting and Reporting | **35-45%** |
| **Area III** | State and Local Governments | **10-20%** |

**Total: 3 Areas**

### Current App Configuration

| Area | Name | Weight Range |
|------|------|--------------|
| BAR-I | Business Analysis | 40-50% ✅ |
| BAR-II | Technical Accounting and Reporting | 35-45% ✅ |
| BAR-III | State and Local Governments | 10-20% ✅ |

**Total: 3 Areas** ✅

### Assessment

✅ **BAR configuration is CORRECT in the CPA course config.ts**

However, the **lessonMatrix.ts** is correct but **examConfig.ts** shows 4 areas (with different weights):
- BAR-I: Business Combinations and Consolidations (15-25%) - Not in official blueprint!
- BAR-II: Technical Accounting (25-35%)
- BAR-III: State and Local Government (20-30%)
- BAR-IV: Financial Statement Analysis and Planning (15-25%)

### ✅ Correct BAR Configuration (matches official blueprint)

```typescript
BAR: [
  { areaId: 'BAR-I', areaName: 'Business Analysis', weight: '40-50%' },
  { areaId: 'BAR-II', areaName: 'Technical Accounting and Reporting', weight: '35-45%' },
  { areaId: 'BAR-III', areaName: 'State and Local Governments', weight: '10-20%' },
]
```

---

## 5. ISC - Information Systems and Controls

### Official AICPA Blueprint (2024-2025)

| Area | Name | Weight Range |
|------|------|--------------|
| **Area I** | Information Systems and Data Management | **35-45%** |
| **Area II** | Security, Confidentiality, and Privacy | **35-45%** |
| **Area III** | Considerations for System and Organization Controls (SOC) Engagements | **15-25%** |

**Total: 3 Areas**

### Current App Configuration

| Area | Name | Weight Range |
|------|------|--------------|
| ISC-I | Information Systems and Data Management | 35-45% ✅ |
| ISC-II | Security, Confidentiality, and Privacy | 35-45% ✅ |
| ISC-III | Considerations for System and Organization Controls Engagements | 15-25% ✅ |

**Total: 3 Areas** ✅

### Assessment

✅ **ISC configuration is CORRECT**

However, examConfig.ts shows slightly different weights:
- ISC-I: 30-40% (should be 35-45%)
- ISC-II: 25-35% (should be 35-45%)
- ISC-III: 25-35% (should be 15-25%)

### ✅ Correct ISC Configuration

```typescript
ISC: [
  { areaId: 'ISC-I', areaName: 'Information Systems and Data Management', weight: '35-45%' },
  { areaId: 'ISC-II', areaName: 'Security, Confidentiality, and Privacy', weight: '35-45%' },
  { areaId: 'ISC-III', areaName: 'Considerations for System and Organization Controls (SOC) Engagements', weight: '15-25%' },
]
```

---

## 6. TCP - Tax Compliance and Planning

### Official AICPA Blueprint (2024-2025)

| Area | Name | Weight Range |
|------|------|--------------|
| **Area I** | Tax Compliance and Planning for Individuals and Personal Financial Planning | **30-40%** |
| **Area II** | Entity Tax Compliance | **25-35%** |
| **Area III** | Entity Tax Planning | **20-30%** |
| **Area IV** | Property Transactions, Including Taxation of Investment Activity | **10-20%** |

**Total: 4 Areas**

### Current App Configuration (cpa/config.ts)

| Area | Name | Weight Range |
|------|------|--------------|
| TCP-I | Tax Compliance and Planning for Individuals | 35-45% ❌ |
| TCP-II | Tax Compliance and Planning for Entities | 35-45% ❌ |
| TCP-III | Tax Compliance and Planning for Special Situations | 15-25% ❌ |

**Total: 3 Areas** ❌

### lessonMatrix.ts Configuration (Different!)

| Area | Name | Weight Range |
|------|------|--------------|
| TCP-I | Tax Compliance and Planning for Individuals and Personal Financial Planning | 30-40% ✅ |
| TCP-II | Entity Tax Compliance and Planning | 30-40% ❌ |
| TCP-III | Property Transactions | 12-17% ❌ |
| TCP-IV | Partnership Taxation | 8-13% ❌ |
| TCP-V | C and S Corporation Taxation | 8-13% ❌ |

**Total: 5 Areas** ❌ (Too many, with wrong granularity)

### Discrepancies

1. **Wrong number of areas in both configs**
   - Official: 4 areas
   - cpa/config.ts: 3 areas
   - lessonMatrix.ts: 5 areas

2. **Area names don't match official blueprint**

3. **Weight ranges are completely wrong**

### ✅ Correct TCP Configuration

```typescript
TCP: [
  { areaId: 'TCP-I', areaName: 'Tax Compliance and Planning for Individuals and Personal Financial Planning', weight: '30-40%' },
  { areaId: 'TCP-II', areaName: 'Entity Tax Compliance', weight: '25-35%' },
  { areaId: 'TCP-III', areaName: 'Entity Tax Planning', weight: '20-30%' },
  { areaId: 'TCP-IV', areaName: 'Property Transactions, Including Taxation of Investment Activity', weight: '10-20%' },
]
```

---

## Official Key Topics by Blueprint Area

### FAR Key Topics

**Area I: Conceptual Framework (5-15%)**
- FASB Conceptual Framework objectives
- Qualitative characteristics of accounting information
- Elements of financial statements
- Recognition and measurement criteria
- GAAP hierarchy
- SEC and PCAOB regulatory overview

**Area II: Select Financial Statement Accounts (30-40%)**
- Cash, receivables (including CECL)
- Inventory (cost methods, LCM/NRV)
- PP&E, depreciation, impairment
- Intangibles and goodwill
- Investments (trading, AFS, HTM, equity method)
- Current and long-term liabilities
- Stockholders' equity

**Area III: Select Transactions (25-35%)**
- Revenue recognition (ASC 606 five-step model)
- Leases (ASC 842)
- Income taxes (deferred taxes, uncertain positions)
- Pensions and other post-employment benefits
- Contingencies and commitments
- Earnings per share
- Statement of cash flows
- Accounting changes and error corrections
- Business combinations (for FAR, basic concepts)

**Area IV: State and Local Governments (10-20%)**
- Measurement focus and basis of accounting
- Fund types (governmental, proprietary, fiduciary)
- Government-wide financial statements
- Fund financial statements
- Budgetary accounting
- GASB standards

**Area V: Not-for-Profit Entities (5-15%)**
- Statement of Financial Position
- Statement of Activities
- Statement of Cash Flows
- Net asset classifications
- Contributions and pledges
- Split-interest agreements

---

### AUD Key Topics

**Area I: Ethics, Professional Responsibilities, and General Principles (15-25%)**
- AICPA Code of Professional Conduct
- Independence requirements (AICPA, SEC, PCAOB)
- Professional skepticism and judgment
- Nature and scope of engagement types
- Engagement letters and terms
- Quality management standards (SQMS)

**Area II: Assessing Risk and Developing a Planned Response (25-35%)**
- Planning and materiality
- Understanding the entity and its environment
- Internal control components and evaluation
- IT general controls and application controls
- Risk assessment procedures
- Identifying and assessing risks of material misstatement
- Significant risks and fraud risk factors
- Responses to assessed risks

**Area III: Performing Further Procedures and Obtaining Evidence (30-40%)**
- Audit evidence (sufficiency, appropriateness)
- Analytical procedures
- External confirmations
- Audit sampling (statistical and non-statistical)
- Specific audit areas (accounting estimates, related parties, going concern)
- Subsequent events
- Using the work of others (internal auditors, specialists)
- Written representations

**Area IV: Forming Conclusions and Reporting (15-25%)**
- Audit reports (unmodified, modified opinions)
- Emphasis of matter and other matter paragraphs
- Reports on internal control (integrated audits)
- Attestation engagements (examination, review, AUP)
- Preparation, compilation, and review engagements (SSARS)
- Other reporting considerations

---

### REG Key Topics

**Area I: Ethics, Professional Responsibilities, and Federal Tax Procedures (10-20%)**
- Treasury Circular 230
- AICPA Statements on Standards for Tax Services
- Tax preparer penalties
- Taxpayer penalties
- IRS audit and appeals process
- Statute of limitations
- Tax practice privileged communications

**Area II: Business Law (10-20%)**
- Agency law
- Contracts (formation, performance, remedies)
- Debtor-creditor relationships
- UCC Article 2 (sales)
- UCC Article 9 (secured transactions)
- Business structures (legal aspects)
- Federal securities regulation

**Area III: Federal Taxation of Individuals (15-25%)**
- Gross income inclusions and exclusions
- Adjustments to income
- Standard and itemized deductions
- Filing status and dependents
- Tax credits (child, earned income, education)
- Alternative minimum tax
- Self-employment tax

**Area IV: Federal Taxation of Entities (22-32%)**
- C corporations (formation, operations, distributions, reorganizations)
- S corporations (eligibility, basis, distributions)
- Partnerships (formation, operations, distributions, basis)
- Trusts and estates
- Tax-exempt organizations

**Area V: Federal Taxation of Property Transactions (12-22%)**
- Basis determination
- Capital gains and losses
- Section 1231 assets
- Depreciation recapture (1245, 1250)
- Like-kind exchanges (Section 1031)
- Involuntary conversions
- Installment sales
- Personal residence exclusion (Section 121)

---

### BAR Key Topics

**Area I: Business Analysis (40-50%)**
- Financial statement analysis (ratios, trends, benchmarking)
- Prospective financial information
- Financial projections and forecasts
- Data analytics concepts
- Cost accounting (CVP, variances, relevant costs)
- Budgeting and forecasting
- Performance measures

**Area II: Technical Accounting and Reporting (35-45%)**
- Business combinations and consolidated financial statements
- Derivatives and hedging
- Foreign currency transactions and translation
- Advanced revenue recognition
- Advanced lease considerations
- Segment reporting
- Interim reporting
- SEC reporting requirements
- IFRS differences from U.S. GAAP

**Area III: State and Local Governments (10-20%)**
- Advanced governmental accounting topics
- Capital assets and infrastructure
- Long-term liabilities (pensions, OPEB under GASB)
- CAFR/ACFR components
- Required supplementary information

---

### ISC Key Topics

**Area I: Information Systems and Data Management (35-45%)**
- Database fundamentals and data modeling
- Data governance and data quality
- Systems architecture (hardware, software, networks)
- Cloud computing models
- Systems development lifecycle
- Change management and IT operations
- Disaster recovery and business continuity

**Area II: Security, Confidentiality, and Privacy (35-45%)**
- Cybersecurity threats and vulnerabilities
- Security controls (preventive, detective, corrective)
- Access controls (logical and physical)
- Encryption and authentication
- Privacy principles and regulations
- HIPAA, GDPR considerations
- Incident response

**Area III: SOC Engagements (15-25%)**
- SOC 1 reports (ICFR)
- SOC 2 reports (Trust Services Criteria)
- SOC 3 reports
- SOC for Cybersecurity
- Type 1 vs Type 2 reports
- Service organization controls
- Subservice organizations

---

### TCP Key Topics

**Area I: Individual Tax Compliance and Planning (30-40%)**
- Comprehensive individual tax planning
- Income timing strategies
- Deduction planning and bunching
- Investment income planning
- Retirement planning (distributions, Roth conversions)
- Education planning (529s, Coverdell)
- Medicare and Social Security planning
- Estate and gift planning for individuals

**Area II: Entity Tax Compliance (25-35%)**
- Partnership tax return preparation
- S corporation return preparation  
- C corporation return preparation
- Multi-state compliance issues
- Credits and incentives

**Area III: Entity Tax Planning (20-30%)**
- Entity selection and formation
- Compensation planning (reasonable comp, fringe benefits)
- Retirement plan selection
- State tax planning
- International tax basics
- Transfer pricing concepts
- M&A tax considerations

**Area IV: Property Transactions (10-20%)**
- Advanced property transaction planning
- Installment sale planning
- Like-kind exchange planning
- Stock vs asset acquisitions
- Section 338 elections
- Corporate liquidations
- Related party transaction rules

---

## Question Count and Timing Comparison

### Official AICPA

| Section | MCQs | TBS | Total Time | Break |
|---------|------|-----|------------|-------|
| AUD | 78 | 7 | 4 hours | Yes (optional) |
| FAR | 50 | 7 | 4 hours | Yes (optional) |
| REG | 72 | 8 | 4 hours | Yes (optional) |
| BAR | 50 | 7 | 4 hours | Yes (optional) |
| ISC | 82 | 6 | 4 hours | Yes (optional) |
| TCP | 68 | 7 | 4 hours | Yes (optional) |

### App Configuration

| Section | MCQs | TBS | Status |
|---------|------|-----|--------|
| AUD | 78 | 7 | ✅ Correct |
| FAR | 50 | 7 | ✅ Correct |
| REG | 72 | 8 | ✅ Correct |
| BAR | 50 | 7 | ✅ Correct |
| ISC | 82 | 6 | ✅ Correct |
| TCP | 68 | 7 | ✅ Correct |

---

## 2025/2026 Updates

### Blueprint Updates for 2025

The AICPA released minor clarifications for 2025 testing:
- **No structural changes** to content areas or weights
- Clarified representative tasks in some areas
- Updated effective dates for new accounting standards

### Blueprint Updates for July 2026

For exams taken July 1, 2026 and later, tax sections (REG, TCP) will reflect:
- H.R. 1 "One Big Beautiful Bill" Act provisions
- Updated SALT deduction limits
- Changes to QBI deduction
- Bonus depreciation updates
- Other tax law changes enacted in 2025

---

## Summary of Required Corrections

### Priority 1 - Critical (Area structure and major weights)

1. **FAR**: Add Area V (NFP), fix all weight ranges
2. **REG**: Add Area II (Business Law), reorder areas correctly, fix weights
3. **TCP**: Restructure to 4 areas (not 3 or 5), fix all weights
4. **BAR**: Keep 3 areas but ensure examConfig.ts matches lessonMatrix.ts

### Priority 2 - Moderate (Weight adjustments)

1. **AUD**: Fix Area IV weight (15-25% not 10-20%)
2. **ISC**: Verify weight consistency across files (35-45%, 35-45%, 15-25%)

### Priority 3 - Maintenance

1. Ensure consistency between:
   - `src/courses/cpa/config.ts`
   - `src/data/lessonMatrix.ts`
   - `src/config/examConfig.ts`

---

## Verification Sources

1. **AICPA-CIMA**: Official CPA Exam Blueprint documents
   - URL: https://www.aicpa-cima.com/resources/article/cpa-exam-blueprints
   - Effective: January 2024 (CPA Evolution launch)

2. **NASBA**: CPA Examination information
   - URL: https://nasba.org/exams/cpaexam/

3. **Prometric**: Official testing centers
   - All sections: 4 hours with optional break

---

*This document should be reviewed and updated whenever AICPA releases blueprint changes (typically annually in January).*
