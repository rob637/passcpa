# Question Accuracy Issues Log

**Generated:** March 2, 2026  
**Total Questions Audited:** 20,627  
**Total Accuracy Issues Found:** 54  

## Summary by Exam

| Exam | Questions | Accuracy Issues |
|------|-----------|-----------------|
| CPA | 9,002 | 49 |
| EA | 2,997 | 1 |
| CMA | 2,528 | 0 |
| CIA | 2,212 | 0 |
| CISA | 1,520 | 0 |
| CFP | 2,368 | 4 |

## Issue Types

- **whyWrong-contradiction (50)**: The `whyWrong` field for the correct answer says "is wrong" instead of "is correct", or a wrong answer's `whyWrong` says "is correct"
- **explanation-contradiction (4)**: The explanation text mentions a different answer as correct than what's set in `correctAnswer`

---

## CPA Issues (49)

### FAR (3 issues)

| Question ID | Issue |
|-------------|-------|
| `far-d14-014` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `far-d20-011` | Option B (correctAnswer=1) whyWrong says "is wrong" but this is the CORRECT answer |
| `far-scf-001` | Option B (correctAnswer=1) whyWrong says "is wrong" but this is the CORRECT answer |

### AUD (0 issues)

No accuracy issues found.

### REG (18 issues)

| Question ID | Issue |
|-------------|-------|
| `reg-gen-1028` | Option D (correctAnswer=3) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1034` | Option D (correctAnswer=3) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1035` | Option A whyWrong says "is correct" but correctAnswer=3 (D) |
| `reg-gen-1069` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1077` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1080` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1103` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1119` | Option C (correctAnswer=2) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1193` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1204` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1228` | Option B (correctAnswer=1) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1230` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1240` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1241` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1248` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1255` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1265` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1280` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `reg-gen-1346` | Option B (correctAnswer=1) whyWrong says "is wrong" but this is the CORRECT answer |

### TCP (22 issues)

| Question ID | Issue |
|-------------|-------|
| `tcp-093` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-d1-025` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-d3-006` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-d4-011` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-0933` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-1030` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-1037` | Option C whyWrong says "is correct" but correctAnswer=0 (A) |
| `tcp-gen-1046` | Option D (correctAnswer=3) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-1068` | Option D (correctAnswer=3) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-1077` | Option C (correctAnswer=2) whyWrong header says "is wrong" but this should be CORRECT |
| `tcp-gen-1083` | Option A whyWrong says "is correct" but correctAnswer=3 (D) |
| `tcp-gen-1091` | Option D (correctAnswer=3) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-1093` | Option B whyWrong says "is correct" but correctAnswer=3 (D) |
| `tcp-gen-1104` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-1141` | Option C (correctAnswer=2) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-1152` | Option C (correctAnswer=2) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-1171` | Option C (correctAnswer=2) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-1227` | Option B (correctAnswer=1) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-1333` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-1364` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-1414` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-gen-1453` | Option A (correctAnswer=0) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-wc-060` | Option C (correctAnswer=2) whyWrong says "is wrong" but this is the CORRECT answer |
| `tcp-wc-157` | Option B (correctAnswer=1) whyWrong says "is wrong" but this is the CORRECT answer |

### ISC (0 issues)

No accuracy issues found.

### BAR (3 issues)

| Question ID | Issue |
|-------------|-------|
| `bar-gen-1268` | Option D (correctAnswer=3) whyWrong says "is wrong" but this is the CORRECT answer |
| `bar-gen-1339` | Option C (correctAnswer=2) whyWrong says "is wrong" but this is the CORRECT answer |
| `bar-gen-1475` | Option D whyWrong says "is correct" but correctAnswer=0 (A) |

---

## EA Issues (1)

### SEE3 (1 issue)

| Question ID | Issue |
|-------------|-------|
| `see3-easy-gen-1772313479851-2` | Explanation mentions "c is correct" but correctAnswer=1 (B) |

---

## CFP Issues (4)

| Section | Question ID | Issue |
|---------|-------------|-------|
| CFP-GEN | `cfp-gen-019` | Explanation mentions "b is correct" but correctAnswer=2 (C) |
| CFP-INV | `cfp-inv-023` | Explanation mentions "b is correct" but correctAnswer=2 (C) |
| CFP-RET | `cfp-cross-003` | Explanation mentions "b is correct" but correctAnswer=3 (D) |
| CFP-TAX | `cfp-tax-055` | Option B (correctAnswer=1) whyWrong says "is wrong" but this is the CORRECT answer |

---

## CMA Issues (0)

No accuracy issues found.

---

## CIA Issues (0)

No accuracy issues found.

---

## CISA Issues (0)

No accuracy issues found.

---

## How to Fix

Each issue requires manual review to determine the correct resolution:

1. **If `correctAnswer` is wrong**: Update `correctAnswer` to the correct index (0=A, 1=B, 2=C, 3=D)
2. **If `whyWrong` text is wrong**: Update the whyWrong text for that option to correctly indicate whether it's right or wrong
3. **If `explanation` text is wrong**: Update the explanation to reference the correct answer

### Files to Edit

- CPA questions: `content/cpa/{section}/questions.json`
- EA questions: `content/ea/{section}/questions.json`
- CFP questions: `content/cfp/{section}/questions.json`

### Validation

After fixes, run: `node scripts/audit-all-questions.cjs`
