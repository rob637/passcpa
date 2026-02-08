# Course Parity Implementation Plan

> **Created:** February 8, 2026  
> **Status:** 🔴 In Progress  
> **Goal:** Align all 6 courses with consistent structure, content depth, and feature parity

---

## Overview

| Priority | Task Category | Estimated Effort | Status |
|----------|---------------|------------------|--------|
| 🔴 Critical | CFP Questions Expansion (790 → 2,500+) | 25+ batches | ⬜ Not Started |
| 🔴 Critical | CFP Lessons Expansion (112 → 500+) | 40+ lesson files | ⬜ Not Started |
| 🔴 Critical | Standardize Config Patterns | 3 files | ✅ DONE |
| 🟡 High | Add Study Guides (4 courses) | 12 files | ✅ ALREADY EXIST |
| 🟡 High | Add Cheatsheets (3 courses) | 6 files | ✅ CPA + EA DONE |
| 🟡 High | Add Diagnostic Quizzes (5 courses) | 5 files | ⬜ Not Started |
| 🟡 High | CFP Study Plan Route | 2 files | ✅ DONE |
| 🟡 High | CMA Glossary & Quick Ref | 3 files | ✅ ALREADY EXIST |

---

## ✅ COMPLETED

### Task 3: Config Standardization (DONE)
- **CISA:** Rewrote `src/courses/cisa/config.ts` to follow standard `Course` interface
- **CFP:** Added proper `features` object to `src/courses/cfp/config.ts`
- Build verified ✓

### Task 7: CFP Study Plan Route (DONE)
- Created `src/components/pages/CFPStudyPlanSetup.tsx` (346 lines)
- Added lazy import and route `/cfp/study-plan` in `src/App.tsx`
- Build verified ✓

### Task 4: Study Guides (ALREADY EXIST)
- **CMA:** `src/data/cma/study-materials/cma1-study-guide.ts`, `cma2-study-guide.ts`
- **CIA:** `src/data/cia/study-materials/cia1-study-guide.ts`, `cia2-study-guide.ts`, `cia3-study-guide.ts`
- **CISA:** `src/data/cisa/study-guides/domain1-5-study-guide.md` (5 files)
- **CFP:** Has comprehensive `src/data/cfp/quickReference/index.ts` (802 lines)

### Task 5: CPA Cheatsheets (DONE)
- Created `src/data/cpa/cheatsheets/far-cheatsheet.md` (FAR section)
- Created `src/data/cpa/cheatsheets/aud-cheatsheet.md` (AUD section)
- Created `src/data/cpa/cheatsheets/reg-cheatsheet.md` (REG section)
- Created `src/data/cpa/cheatsheets/bar-cheatsheet.md` (BAR discipline)
- Created `src/data/cpa/cheatsheets/index.ts` (TypeScript exports)
- Build verified ✓

### Task 5b: EA Cheatsheets (DONE)
- Created `src/data/ea/cheatsheets/see1-cheatsheet.md` (Individuals)
- Created `src/data/ea/cheatsheets/see2-cheatsheet.md` (Businesses)
- Created `src/data/ea/cheatsheets/see3-cheatsheet.md` (Representation)
- Created `src/data/ea/cheatsheets/index.ts` (TypeScript exports)
- Build verified ✓

### Task 8: CMA Glossary & Quick Ref (ALREADY EXIST)
- **Glossary:** `src/data/cma/study-materials/cma-glossary.ts`
- **Cheat Sheets:** `src/data/cma/study-materials/cma-cheat-sheets.ts`
- **Formula Sheets:** `cma1-formula-sheet.ts`, `cma2-formula-sheet.ts`

---

## 🔴 CRITICAL PRIORITY

---

### Task 1: CFP Question Bank Expansion (790 → 2,500+)

**Current State:** 790 questions  
**Target:** 2,500+ questions  
**Gap:** ~1,710 questions needed  
**Approach:** Create ~25 batches of ~70 questions each, distributed across 8 domains

#### CFP Blueprint Weights (170 questions on exam)
| Domain | Weight | Target Questions |
|--------|--------|------------------|
| Professional Conduct (PCR) | 8% | 200 |
| General Principles (GEN) | 15% | 375 |
| Risk Management (RISK) | 11% | 275 |
| Investment Planning (INV) | 17% | 425 |
| Tax Planning (TAX) | 14% | 350 |
| Retirement Planning (RET) | 19% | 475 |
| Estate Planning (EST) | 12% | 300 |
| Psychology (PSY) | 7% | 175 |
| **TOTAL** | **100%** | **2,575** |

#### Batch Schedule - Questions

| Batch | Domain | File Name | Questions | Status |
|-------|--------|-----------|-----------|--------|
| 1 | Professional | `professional_batch3.ts` | 70 | ⬜ |
| 2 | Professional | `professional_batch4.ts` | 70 | ⬜ |
| 3 | General | `gen_principles_batch4.ts` | 70 | ⬜ |
| 4 | General | `gen_principles_batch5.ts` | 70 | ⬜ |
| 5 | General | `gen_principles_batch6.ts` | 70 | ⬜ |
| 6 | Risk | `risk_batch3.ts` | 70 | ⬜ |
| 7 | Risk | `risk_batch4.ts` | 70 | ⬜ |
| 8 | Risk | `risk_batch5.ts` | 70 | ⬜ |
| 9 | Investments | `investments_batch5.ts` | 70 | ⬜ |
| 10 | Investments | `investments_batch6.ts` | 70 | ⬜ |
| 11 | Investments | `investments_batch7.ts` | 70 | ⬜ |
| 12 | Investments | `investments_batch8.ts` | 70 | ⬜ |
| 13 | Tax | `tax_batch5.ts` | 70 | ⬜ |
| 14 | Tax | `tax_batch6.ts` | 70 | ⬜ |
| 15 | Tax | `tax_batch7.ts` | 70 | ⬜ |
| 16 | Retirement | `retirement_batch4.ts` | 70 | ⬜ |
| 17 | Retirement | `retirement_batch5.ts` | 70 | ⬜ |
| 18 | Retirement | `retirement_batch6.ts` | 70 | ⬜ |
| 19 | Retirement | `retirement_batch7.ts` | 70 | ⬜ |
| 20 | Retirement | `retirement_batch8.ts` | 70 | ⬜ |
| 21 | Estate | `estate_batch4.ts` | 70 | ⬜ |
| 22 | Estate | `estate_batch5.ts` | 70 | ⬜ |
| 23 | Estate | `estate_batch6.ts` | 70 | ⬜ |
| 24 | Psychology | `psychology_batch2.ts` | 70 | ⬜ |
| 25 | Psychology | `psychology_batch3.ts` | 70 | ⬜ |

**Template File:** `src/data/ea/questions/see1-questions-batch1.ts`

---

### Task 2: CFP Lessons Expansion (112 → 500+)

**Current State:** ~112 lessons across 8 domains  
**Target:** 500+ lessons  
**Gap:** ~390 lessons needed

#### Lessons Per Domain Target

| Domain | Current | Target | Gap |
|--------|---------|--------|-----|
| Professional (PCR) | ~8 | 40 | 32 |
| General (GEN) | ~23 | 75 | 52 |
| Risk (RISK) | ~12 | 55 | 43 |
| Investments (INV) | ~12 | 85 | 73 |
| Tax (TAX) | ~12 | 70 | 58 |
| Retirement (RET) | ~20 | 95 | 75 |
| Estate (EST) | ~12 | 60 | 48 |
| Psychology (PSY) | ~5 | 35 | 30 |
| **TOTAL** | **~112** | **515** | **~403** |

#### Batch Schedule - Lessons

| Batch | Domain | Files to Create | Lessons | Status |
|-------|--------|-----------------|---------|--------|
| 1 | Professional | `pro_ethics.ts`, `pro_disciplinary.ts` | 16 | ⬜ |
| 2 | Professional | `pro_compliance.ts`, `pro_practice_standards.ts` | 16 | ⬜ |
| 3 | General | `gen_client_communication.ts`, `gen_data_gathering.ts` | 15 | ⬜ |
| 4 | General | `gen_ratios.ts`, `gen_emergency_fund.ts` | 15 | ⬜ |
| 5 | General | `gen_life_stages.ts`, `gen_special_needs.ts` | 15 | ⬜ |
| 6 | Risk | `ris_analysis.ts`, `ris_commercial.ts` | 15 | ⬜ |
| 7 | Risk | `ris_ltc.ts`, `ris_group_benefits.ts` | 15 | ⬜ |
| 8 | Risk | `ris_policy_ownership.ts` | 13 | ⬜ |
| 9 | Investments | `inv_options.ts`, `inv_bonds_advanced.ts` | 20 | ⬜ |
| 10 | Investments | `inv_alternatives.ts`, `inv_performance.ts` | 20 | ⬜ |
| 11 | Investments | `inv_behavioral.ts`, `inv_client_factors.ts` | 20 | ⬜ |
| 12 | Investments | `inv_regulations.ts` | 13 | ⬜ |
| 13 | Tax | `tax_entity.ts`, `tax_amt.ts` | 15 | ⬜ |
| 14 | Tax | `tax_charitable.ts`, `tax_passive.ts` | 15 | ⬜ |
| 15 | Tax | `tax_international.ts`, `tax_estate.ts` | 15 | ⬜ |
| 16 | Tax | `tax_planning_techniques.ts` | 13 | ⬜ |
| 17 | Retirement | `ret_distribution.ts`, `ret_rmd.ts` | 18 | ⬜ |
| 18 | Retirement | `ret_roth.ts`, `ret_small_business.ts` | 18 | ⬜ |
| 19 | Retirement | `ret_social_security.ts`, `ret_medicare.ts` | 18 | ⬜ |
| 20 | Retirement | `ret_annuities.ts`, `ret_withdrawal.ts` | 18 | ⬜ |
| 21 | Estate | `est_trusts_advanced.ts`, `est_business.ts` | 15 | ⬜ |
| 22 | Estate | `est_charitable.ts`, `est_generation.ts` | 15 | ⬜ |
| 23 | Estate | `est_liquidity.ts`, `est_disability.ts` | 18 | ⬜ |
| 24 | Psychology | `psy_client_behaviors.ts`, `psy_biases.ts` | 15 | ⬜ |
| 25 | Psychology | `psy_communication.ts`, `psy_couples.ts` | 15 | ⬜ |

**Template File:** `src/data/cpa/lessons/far.ts`

---

### Task 3: Standardize Config Patterns

#### 3A: Fix CISA Config (Use ExamSectionConfig)

**File:** `src/courses/cisa/config.ts`

**Current Issue:** Uses custom `CISASectionConfig` type  
**Fix:** Convert to use standard `ExamSectionConfig` like other courses

```typescript
// CURRENT (wrong)
export interface CISASectionConfig { ... }

// TARGET (correct)
import { Course, ExamSectionConfig } from '../../types/course';
export const CISA_COURSE: Course = { ... }
```

**Status:** ⬜ Not Started

---

#### 3B: Add Explicit Features Object to All Courses

**Files to Update:**
1. `src/courses/cpa/config.ts` - Add `features` object
2. `src/courses/ea/config.ts` - Already has it ✅
3. `src/courses/cma/config.ts` - Add `features` object
4. `src/courses/cia/config.ts` - Already has it ✅
5. `src/courses/cisa/config.ts` - After rewrite, add `features`
6. `src/courses/cfp/config.ts` - Add `features` object

**Standard Features Object:**
```typescript
features: {
  hasTBS: boolean;
  hasWrittenCommunication: boolean;
  hasEssay: boolean;
  hasDataInsights: boolean;
  hasCaseStudies?: boolean;  // CFP only
}
```

**Status:** ⬜ Not Started

---

## 🟡 HIGH PRIORITY

---

### Task 4: Add Study Guides/Schedules (4 Courses)

**Reference Template:** `src/data/ea/reference/study-guide-see1.ts`

| Course | Files to Create | Status |
|--------|-----------------|--------|
| CMA | `src/data/cma/study-materials/study-guide-cma1.ts`, `study-guide-cma2.ts`, `study-schedules.ts` | ⬜ |
| CIA | `src/data/cia/study-materials/study-guide-cia1.ts`, `study-guide-cia2.ts`, `study-guide-cia3.ts`, `study-schedules.ts` | ⬜ |
| CISA | `src/data/cisa/study-guides/study-guide-cisa1.ts` through `cisa5.ts`, `study-schedules.ts` | ⬜ |
| CFP | `src/data/cfp/studyGuides/study-guide-gen.ts` (per domain), `study-schedules.ts` | ⬜ |

---

### Task 5: Add Cheatsheets (3 Courses)

**Reference Template:** `src/data/cia/cheatsheets/` or `src/data/cisa/cheatsheets/`

| Course | Files to Create | Status |
|--------|-----------------|--------|
| CPA | `src/data/cpa/cheatsheets/far-cheatsheet.ts`, `aud-cheatsheet.ts`, `reg-cheatsheet.ts`, `tcp-cheatsheet.ts`, `bar-cheatsheet.ts`, `isc-cheatsheet.ts` | ⬜ |
| EA | `src/data/ea/reference/see1-cheatsheet.ts`, `see2-cheatsheet.ts`, `see3-cheatsheet.ts` | ⬜ |
| CMA | `src/data/cma/study-materials/cma1-cheatsheet.ts`, `cma2-cheatsheet.ts` | ⬜ |

---

### Task 6: Add Diagnostic Quizzes (5 Courses)

**Reference Template:** `src/data/ea/reference/diagnostic-quizzes.ts`

| Course | File to Create | Status |
|--------|----------------|--------|
| CPA | `src/data/cpa/diagnostics/diagnostic-quizzes.ts` | ⬜ |
| CMA | `src/data/cma/study-materials/diagnostic-quizzes.ts` | ⬜ |
| CIA | `src/data/cia/study-materials/diagnostic-quizzes.ts` | ⬜ |
| CISA | `src/data/cisa/study-guides/diagnostic-quizzes.ts` | ⬜ |
| CFP | `src/data/cfp/diagnostics/diagnostic-quizzes.ts` | ⬜ |

---

### Task 7: Add CFP Study Plan Route

**Files to Create/Modify:**

1. **Create:** `src/components/pages/CFPStudyPlanSetup.tsx`
   - Template from: `src/components/pages/EAStudyPlanSetup.tsx`

2. **Modify:** `src/App.tsx`
   - Add `/cfp/study-plan` route

**Status:** ⬜ Not Started

---

### Task 8: CMA Glossary & Quick Reference

**Files to Create:**

1. `src/data/cma/study-materials/glossary.ts`
2. `src/data/cma/study-materials/quick-reference-cma1.ts`
3. `src/data/cma/study-materials/quick-reference-cma2.ts`

**Reference Templates:**
- Glossary: `src/data/cia/glossary/index.ts`
- Quick Ref: `src/data/ea/reference/quick-reference-see1.ts`

**Status:** ⬜ Not Started

---

## Implementation Schedule (Recommended)

### Sprint 1 (Week 1-2): Config Standardization
- [ ] Task 3A: Fix CISA config
- [ ] Task 3B: Add features object to CPA, CMA, CISA, CFP configs
- [ ] Task 7: Add CFP study-plan route

### Sprint 2 (Week 3-4): CFP Questions Part 1
- [ ] CFP Questions Batches 1-8 (560 questions)

### Sprint 3 (Week 5-6): CFP Questions Part 2
- [ ] CFP Questions Batches 9-17 (630 questions)

### Sprint 4 (Week 7-8): CFP Questions Part 3
- [ ] CFP Questions Batches 18-25 (560 questions)

### Sprint 5 (Week 9-10): CFP Lessons Part 1
- [ ] CFP Lessons Batches 1-10 (~155 lessons)

### Sprint 6 (Week 11-12): CFP Lessons Part 2
- [ ] CFP Lessons Batches 11-20 (~170 lessons)

### Sprint 7 (Week 13-14): CFP Lessons Part 3
- [ ] CFP Lessons Batches 21-25 (~78 lessons)

### Sprint 8 (Week 15-16): Study Guides & Schedules
- [ ] Task 4: All study guides for CMA, CIA, CISA, CFP

### Sprint 9 (Week 17-18): Cheatsheets & Diagnostics
- [ ] Task 5: All cheatsheets
- [ ] Task 6: All diagnostic quizzes
- [ ] Task 8: CMA glossary & quick reference

---

## File Templates

### Question File Template
```typescript
/**
 * CFP [Domain] Questions - Batch [X]
 * [Description of topics covered]
 */

import { CFPQuestion } from '../types';

export const CFP_[DOMAIN]_BATCH[X]_QUESTIONS: CFPQuestion[] = [
  {
    id: 'CFP-[DOMAIN]-B[X]-001',
    courseId: 'cfp',
    domain: '[DOMAIN_CODE]',
    question: '',
    options: [
      { id: 'A', text: '' },
      { id: 'B', text: '' },
      { id: 'C', text: '' },
      { id: 'D', text: '' },
    ],
    correctOptionId: '',
    explanation: '',
    difficulty: 'medium',
    topics: [],
    blueprintArea: '',
  },
  // ... 69 more questions
];
```

### Lesson File Template
```typescript
/**
 * CFP [Domain] Lessons - [Topic]
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_[DOMAIN]_LESSONS: CFPLesson[] = [
  {
    id: 'cfp-[domain]-[topic]-001',
    courseId: 'cfp',
    domain: '[DOMAIN_CODE]',
    title: '',
    description: '',
    order: 1,
    duration: 15, // minutes
    difficulty: 'beginner',
    topics: [],
    blueprintArea: '',
    content: `
## Learning Objectives
...

## Key Concepts
...

## Examples
...

## Exam Tips
...
    `,
    keyTakeaways: [],
  },
];
```

---

## Progress Tracking

```
🔴 CRITICAL
├── CFP Questions: [░░░░░░░░░░] 0/25 batches (0%)
├── CFP Lessons:   [░░░░░░░░░░] 0/25 batches (0%)  
└── Config Fix:    [░░░░░░░░░░] 0/3 tasks (0%)

🟡 HIGH PRIORITY
├── Study Guides:  [░░░░░░░░░░] 0/4 courses (0%)
├── Cheatsheets:   [░░░░░░░░░░] 0/3 courses (0%)
├── Diagnostics:   [░░░░░░░░░░] 0/5 courses (0%)
├── CFP Route:     [░░░░░░░░░░] 0/1 task (0%)
└── CMA Glossary:  [░░░░░░░░░░] 0/1 task (0%)

OVERALL: [░░░░░░░░░░] 0%
```

---

## Notes

- Each question batch should take ~2-3 hours to create with quality
- Each lesson batch should take ~4-5 hours to create with quality
- Config fixes are quick (~30 min each)
- Study guides/cheatsheets ~2 hours each
- Always run `npm run lint` and `npm run build` after each batch
- Test question loading in UI after adding to index.ts
