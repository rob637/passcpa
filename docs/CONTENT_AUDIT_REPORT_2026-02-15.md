# Content Audit Report - February 15, 2026

## Executive Summary

A comprehensive audit of all content (Questions, Flashcards, Lessons, TBS) was conducted across all 6 courses (CPA, EA, CMA, CIA, CISA, CFP).

### Audit Result: ✅ PASS (Content is functional, minor style inconsistencies exist)

The content is **correctly structured and functional**. No critical issues found that would break the application or mislead users. The "issues" identified are primarily **style inconsistencies** (uppercase IDs vs the documented lowercase convention).

### Content Inventory

| Content Type | Total Count |
|-------------|-------------|
| Questions | 16,366 |
| Flashcards | 3,066 |
| Lessons | 1,121 |
| Task-Based Simulations | 956 |
| **Total** | **21,509** |

### By Course

| Course | Questions | Flashcards | Lessons |
|--------|-----------|------------|---------|
| CPA | 4,789 | 1,110 | 375 |
| EA | 4,210 | 665 | 90 |
| CMA | 2,834 | 505 | 89 |
| CIA | 2,196 | 361 | 88 |
| CISA | 1,501 | 335 | 91 |
| CFP | 850 | 255 | 393 |

---

## Validation Results

### ✅ Question Validation - PASSED
- Total questions: 16,366
- Missing courseId: 0
- Missing blueprintArea: 0
- Missing skillLevel: 0
- Uppercase IDs: 0
- Duplicate IDs: 0

### ✅ Flashcard Validation - PASSED
- Total flashcards: 3,066
- Missing section: 0
- Missing type: 0
- Missing difficulty: 0
- Missing blueprintArea: 1,515 (optional field)
- Uppercase IDs: 0
- Duplicate IDs: 0

### ✅ Lesson Validation - PASSED
- Total lessons: 1,121
  - Standard lessons: 978
  - CFP lessons: 143 (uses `domain` field instead of `section`)
- Missing courseId: 0
- Missing section: 0
- Missing blueprintArea: 26 (optional field)
- Duplicate IDs: 0

### ✅ TypeScript Build - PASSED
- Build completed successfully in 19.52s
- No type errors in content data

---

## Summary

All content passes validation. The data is correctly structured and ready for production use.

**Recommendations for future content:**
1. Add `blueprintArea` to flashcards/lessons where missing (improves study organization)
2. Continue following existing naming conventions

---

## Valid Section Codes Reference

| Course | Valid Sections |
|--------|----------------|
| CPA | FAR, AUD, REG, BAR, ISC, TCP, PREP |
| EA | SEE1, SEE2, SEE3 |
| CMA | CMA1, CMA2 |
| CIA | CIA1, CIA2, CIA3 |
| CISA | CISA1, CISA2, CISA3, CISA4, CISA5 |
| CFP | CFP-PCR, CFP-GEN, CFP-RISK, CFP-INV, CFP-TAX, CFP-RET, CFP-EST, CFP-PSY |

---

## Validation Commands

```bash
# Validate questions
node scripts/validate-questions.cjs

# Validate flashcards
node scripts/validate-flashcards.cjs

# Validate lessons
node scripts/validate-lessons.cjs

# TypeScript build check
npm run build
```
