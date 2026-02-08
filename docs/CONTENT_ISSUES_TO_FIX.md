# Content Issues to Fix

> **Created:** February 2026  
> **Updated:** February 7, 2026 - Irrelevant content deleted, CMA audit needed  
> **Reference:** [EXAM_FORMAT_REFERENCE.md](./EXAM_FORMAT_REFERENCE.md)

---

## Summary

| Course | Exam Format | Status |
|--------|-------------|--------|
| CPA | MCQ + TBS + WC | ✅ Correct (covers both 2025 & 2026 blueprints) |
| EA | MCQ only | ✅ Fixed - TBS content deleted |
| CMA | 75% MCQ + 25% Essays/CBQs | ✅ Fixed - Essay route restored |
| CFP | MCQ only (incl. case vignettes) | ✅ Correct |
| CIA | MCQ only | ✅ Fixed - simulations deleted |
| CISA | MCQ only | ✅ Fixed - simulations deleted |

---

## Completed Actions

### 1. EA TBS Content - DELETED ✅

EA exam is 100% MCQ. TBS content was irrelevant and has been removed.

**Deleted:**
- `src/data/ea/tbs/` (entire folder)
- TBS imports from `src/data/ea/index.ts`

---

### 2. CIA Practice Simulations - DELETED ✅

CIA exam is 100% MCQ. Simulation content was irrelevant and has been removed.

**Deleted:**
- `src/data/cia/practice-simulations/` (entire folder)

---

### 3. CISA Practice Simulations - DELETED ✅

CISA exam is 100% MCQ. Simulation content was irrelevant and has been removed.

**Deleted:**
- `src/data/cisa/practice-simulations/` (entire folder)

---

## Completed Actions (continued)

### 4. CMA Essays/CBQs - RESTORED ✅

CMA essay route and dashboard link were incorrectly commented out. Now restored.

**Fixed:**
- ✅ Essay content exists: `src/data/cma/essays/` (40 essays)
- ✅ Essay UI restored: `/cma/essay` route in App.tsx
- ✅ Dashboard link restored: CMADashboard.tsx "Essay Practice" button
- ✅ Config fixed: `hasEssay: true` in cma/config.ts

**Exam Details:**
- 100 MCQs (75% of score) + 2 Essays/CBQs (25% of score) per part
- Must score 50%+ on MCQ for essays to be scored
- Transitioning to CBQs in 2026

---

## Correctly Implemented ✅

### CPA - TBS, WC, MCQ ✅
Content covers **both** 2025 and 2026 blueprints. No action needed.

### CFP - Case Study Vignettes ✅
Case studies are MCQ-based (read scenario → answer related MCQs). Correctly implemented.

### CMA - Practice Simulations ✅
Keep `src/data/cma/practice-simulations/` - CMA has CBQs which include interactive elements.

---

## Validation Rules

Before building new features:

| Rule | CPA | EA | CMA | CFP | CIA | CISA |
|------|:---:|:--:|:---:|:---:|:---:|:----:|
| Has TBS? | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Has Essays/CBQs? | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Has Written Comm? | ✅* | ❌ | ❌ | ❌ | ❌ | ❌ |
| Has Case Studies? | ❌ | ❌ | ✅ | ✅** | ❌ | ❌ |

*WC only in REG, BAR, TCP  
**CFP case studies are MCQ-based vignettes, not simulations

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|----------|
| Feb 7, 2026 | Deleted EA TBS | EA is MCQ-only, TBS irrelevant |
| Feb 7, 2026 | Deleted CIA simulations | CIA is MCQ-only |
| Feb 7, 2026 | Deleted CISA simulations | CISA is MCQ-only |
| Feb 7, 2026 | Restored CMA essay route | Essays are 25% of CMA score - were incorrectly removed |
| Feb 7, 2026 | CPA covers both blueprints | No action needed |
