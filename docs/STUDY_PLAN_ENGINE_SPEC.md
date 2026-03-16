# Study Plan Engine - Technical Specification

> **Goal:** World-class, research-backed study planning that matches or exceeds Becker, UWorld, and Gleim.
> 
> **Status:** P0 Critical fixes shipped. This doc covers P1/P2 improvements.

---

## Table of Contents

1. [Current Architecture](#current-architecture)
2. [P0 Fixes Shipped](#p0-fixes-shipped)
3. [P1 High Value Improvements](#p1-high-value-improvements)
4. [P2 Polish & Delight](#p2-polish--delight)
5. [Data Model Changes](#data-model-changes)
6. [Testing Strategy](#testing-strategy)

---

## Current Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                              UI LAYER                                   │
│  StudyPlan.tsx │ StudyPlanSetup.tsx │ DailyPlanCard.tsx │ Home.tsx     │
└─────────────────────────────────┬──────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼──────────────────────────────────────┐
│                         HOOK LAYER (useStudyPlan)                       │
│  • Loads/saves plans from Firestore → users/{uid}/studyPlans/{key}     │
│  • Generates todaysPlan from studyPlan (legacy: should use dailyPlan)  │
│  • Tracks: health, phase, alerts, daysUntilExam                        │
└─────────────────────────────────┬──────────────────────────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
┌─────────────────────┐  ┌───────────────────────┐  ┌───────────────────────┐
│  studyPlanService   │  │   dailyPlanService    │  │ dailyPlanPersistence  │
│                     │  │                       │  │                       │
│ • generateStudyPlan │  │ • generateDailyPlan   │  │ • saveTodaysPlan      │
│ • generateWeeks     │  │ • determineLearningPhase│ • markActivityComplete │
│ • generateRealityCheck│ • phase budgets        │  │ • getPastWeekPlans    │
│ • calculatePlanHealth│ │ • weeklyGapAnalysis   │  │ • getStudyPlanContext │
│ • rebalanceStudyPlan│  │ • curriculum filter   │  │                       │
│ • incrementProgress │  │ • spaced repetition   │  │                       │
└─────────────────────┘  └───────────────────────┘  └───────────────────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  ▼
                    ┌──────────────────────────┐
                    │        Firestore         │
                    │ users/{uid}/studyPlans/  │
                    │ users/{uid}/daily_plans/ │
                    │ users/{uid}/daily_log/   │
                    └──────────────────────────┘
```

### Key Files

| File | LOC | Purpose |
|------|-----|---------|
| `src/services/studyPlanService.ts` | ~1300 | Core plan generation, health, rebalancing |
| `src/services/dailyPlanService.ts` | ~2000 | Smart daily activity generation |
| `src/services/dailyPlanPersistence.ts` | ~1000 | Firebase sync, carryover, history |
| `src/hooks/useStudyPlan.ts` | ~260 | React hook for plan access |
| `src/types/studyPlan.ts` | ~270 | TypeScript interfaces |

---

## P0 Fixes Shipped ✅

### 1. Lesson Overflow Bug
**Problem:** When lessons exceeded phase capacity, they were silently dropped.

**Fix:** Added capacity check and proper distribution:
```typescript
// Before: Lessons could overflow and be lost
const lessonsPerFoundationWeek = Math.ceil(foundationLessons / foundationWeeks);

// After: Capacity-aware with overflow handling
const totalCapacity = learningWeeks * maxLessonsPerWeek;
const canFitAllLessons = totalLessons <= totalCapacity;
if (!canFitAllLessons) {
  // Distribute at max capacity, log warning
  logger.warn(`Lesson overflow: ${totalLessons} lessons but only ${totalCapacity} capacity`);
}
```

### 2. Health Calculation Now Includes MCQs
**Problem:** Health only considered lessons + attendance, ignoring heavy MCQ practice.

**Fix:** Rebalanced scoring:
```typescript
// Before: lessons 60%, attendance 40%
const overallScore = (attendanceRatio * 0.4) + (progressRatio * 0.6);

// After: lessons 40%, MCQs 35%, attendance 25%
const overallScore = (lessonRatio * 0.4) + (questionRatio * 0.35) + (attendanceRatio * 0.25);
```

### 3. Updated SECTION_STUDY_HOURS
**Problem:** CMA, CISA values were too low vs. industry standards.

**Fix:** Updated based on IMA/ISACA/AICPA research:
| Section | Old | New | Source |
|---------|-----|-----|--------|
| FAR | 140h | 150h | AICPA pass rate data |
| CMA1/2 | 100h | 160h | IMA guidance |
| CISA | 120h | 160h | ISACA recommendations |
| CFP | 250h | 275h | CFP Board surveys |

---

## P1 High Value Improvements

### P1.1: Smart Question Goals from Blueprint

**Current:** Random multipliers (15-25 questions/hour)
**Target:** Data-driven estimates based on exam structure

#### Implementation

```typescript
// New constant: Target questions per section (based on 800-1200 MCQs to pass)
export const SECTION_QUESTION_TARGETS: Record<string, number> = {
  FAR: 1000,   // Largest content area
  AUD: 800,    // Moderate
  REG: 900,    // Tax code + law
  BAR: 600,    // Discipline
  ISC: 600,
  TCP: 600,
  SEE1: 500,
  SEE2: 600,
  SEE3: 400,
  CMA1: 800,
  CMA2: 800,
  CIA1: 600,
  CIA2: 600,
  CIA3: 600,
  CISA: 900,
  CFP: 1000,
};

// In generateWeeks():
function calculateWeeklyQuestions(
  section: string,
  totalWeeks: number,
  phase: StudyPhase
): number {
  const totalTarget = SECTION_QUESTION_TARGETS[section] || 800;
  const learningWeeks = // count non-exam weeks
  const basePerWeek = totalTarget / learningWeeks;
  
  // Phase multiplier: more questions in later phases
  const phaseMultiplier = {
    foundation: 0.6,
    building: 1.0,
    reinforcement: 1.4,
    'final-review': 1.2,
    'exam-week': 0.5,
  };
  
  return Math.round(basePerWeek * phaseMultiplier[phase]);
}
```

**Effort:** 3 hours
**Files:** `studyPlanService.ts`, `types/studyPlan.ts`

---

### P1.2: Unify Today's Plan

**Current:** Two sources of "today's plan":
1. `studyPlanService.generateTodaysPlan()` - basic, from study plan
2. `dailyPlanService.generateDailyPlan()` - smart, adaptive

**Target:** Single source of truth: `dailyPlanService`

#### Implementation

```typescript
// useStudyPlan.ts - CHANGE
const todaysPlan = useMemo(() => {
  // OLD: return generateTodaysPlan(plan);
  // NEW: Use the persisted daily plan
  return null; // Let DailyPlanCard fetch from dailyPlanPersistence
}, [plan]);

// OR better: Add to useStudyPlan:
const { dailyPlan, loadDailyPlan } = useDailyPlan(courseId, section);
```

**Effort:** 4 hours
**Files:** `useStudyPlan.ts`, `DailyPlanCard.tsx`, `Home.tsx`

---

### P1.3: Auto-Rebalance When Behind

**Current:** Alerts appear but no automatic redistribution

**Target:** One-click "Catch Up" button that redistributes remaining work

#### Implementation

```typescript
// New function in studyPlanService.ts
export async function autoRebalance(
  userId: string,
  courseId: CourseId,
  section: string
): Promise<RebalanceResult> {
  const plan = await getStudyPlan(userId, courseId, section);
  
  // Calculate how behind they are
  const behindPercentage = 1 - (completedLessons / expectedLessons);
  
  if (behindPercentage < 0.2) {
    // Slight behind: just increase daily pace
    return rebalanceStudyPlan(userId, courseId, section, {
      mode: 'increase-pace',
    });
  } else {
    // Significantly behind: redistribute across remaining weeks
    const remainingWeeks = plan.weeks.filter(w => w.weekNumber >= currentWeek);
    const lessonsToRedistribute = expectedLessons - completedLessons;
    // Spread evenly with cap
    ...
  }
}
```

**UI Change:** Add "Catch Up Plan" button in StudyPlan.tsx when health < 'on-track'

**Effort:** 6 hours
**Files:** `studyPlanService.ts`, `StudyPlan.tsx`

---

### P1.4: Edge Case Handling

**Current Issues:**
- If exam is in < 7 days at plan creation, phase logic breaks
- Overlapping phase definitions

**Fix:**

```typescript
// In generateWeeks():
if (totalDays < 7) {
  // Ultra-short plan: everything is exam-week
  return [{
    weekNumber: 1,
    phase: 'exam-week',
    goals: { lessons: 0, questions: totalWeeklyQuestions * 0.5, ... },
    ...
  }];
}

if (totalDays < 14) {
  // Very short: final-review + exam-week
  return [
    { weekNumber: 1, phase: 'final-review', ... },
    { weekNumber: 2, phase: 'exam-week', ... },
  ];
}

// Phase boundaries (mutually exclusive)
const isExamWeek = daysUntilExam <= 7;
const isFinalReview = !isExamWeek && daysUntilExam <= 14;
const isReinforcement = !isFinalReview && weekProgress >= 0.60;
const isBuilding = !isReinforcement && weekProgress >= 0.25;
const isFoundation = !isBuilding;
```

**Effort:** 3 hours
**Files:** `studyPlanService.ts`

---

## P2 Polish & Delight

### P2.1: Study Day Preferences

**Goal:** Let users specify which days they study (Mon-Fri, weekends only, specific days)

#### Data Model

```typescript
// In StudyPlanSetupInput
studyDayPreferences?: number[]; // 0=Sun, 1=Mon, ..., 6=Sat

// Example: Weekdays only
studyDayPreferences: [1, 2, 3, 4, 5]
```

#### UI Change

Add day picker in `StudyPlanSetup.tsx`:
```
┌─────────────────────────────────────┐
│ Which days can you study?           │
│ ○ Sun  ● Mon  ● Tue  ● Wed  ● Thu  │
│ ● Fri  ○ Sat                        │
└─────────────────────────────────────┘
```

**Effort:** 4 hours
**Files:** `StudyPlanSetup.tsx`, `types/studyPlan.ts`, `dailyPlanPersistence.ts`

---

### P2.2: Dynamic Flashcard Goals

**Current:** Fixed 50/75/100 per phase
**Target:** Based on actual deck size

```typescript
function calculateFlashcardGoal(
  totalFlashcards: number,
  phase: StudyPhase,
  weeklyHours: number
): number {
  // Spaced repetition: review each card 3-5 times
  const cardsPerWeek = totalFlashcards / learningWeeks;
  
  const phaseMultiplier = {
    foundation: 0.5,   // Focus on learning
    building: 1.0,     // Normal review
    reinforcement: 1.2, // Intensive review
    'final-review': 1.5, // High frequency
    'exam-week': 0.8,   // Maintenance
  };
  
  // Cap based on time: ~1 min per flashcard
  const maxByTime = weeklyHours * 60 * 0.15; // 15% of time
  
  return Math.min(
    Math.round(cardsPerWeek * phaseMultiplier[phase]),
    maxByTime
  );
}
```

**Effort:** 3 hours
**Files:** `studyPlanService.ts`

---

### P2.3: Historical Accuracy Insights

**Goal:** Show personalized stats like "Your avg MCQ time is 1.8min" to improve estimates

#### Data Collection

```typescript
// Already tracking in dailyPlanPersistence.ts:
personalizedDurations?: Record<string, number>; // activityType → avg minutes

// Enhance with:
interface UserStudyMetrics {
  avgMcqTimeSeconds: number;
  avgLessonTimeMinutes: number;
  avgTbsTimeMinutes: number;
  accuracyByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  peakStudyHour: number; // 0-23, when they study best
  avgSessionLength: number;
}
```

#### UI Display

In `StudyPlan.tsx` or `Progress.tsx`:
```
┌─────────────────────────────────────────┐
│ Your Study Profile                      │
│ ─────────────────────                   │
│ ⏱️ Avg MCQ time: 1m 48s                 │
│ 📚 Avg session: 52 min                  │
│ 🎯 Best at: 8-10 AM                     │
│ 📈 Accuracy improving: +5% this week   │
└─────────────────────────────────────────┘
```

**Effort:** 6 hours
**Files:** `Progress.tsx`, `dailyPlanPersistence.ts`, new `userMetricsService.ts`

---

### P2.4: Plan Validation

**Goal:** Warn before creating impossible plans

```typescript
function validatePlanInput(input: StudyPlanSetupInput): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  const daysUntilExam = differenceInDays(input.examDate, new Date());
  const totalHoursNeeded = SECTION_STUDY_HOURS[input.section] || 100;
  const hoursAvailable = calculateHoursAvailable(...);
  
  // Errors (block creation)
  if (daysUntilExam < 3) {
    errors.push('Exam date must be at least 3 days away');
  }
  if (input.hoursPerDay > 8) {
    errors.push('Daily study time cannot exceed 8 hours');
  }
  
  // Warnings (show but allow)
  if (hoursAvailable < totalHoursNeeded * 0.5) {
    warnings.push(`You have ${hoursAvailable}h but typically need ${totalHoursNeeded}h. Consider adjusting your timeline.`);
  }
  if (input.hoursPerDay < 1) {
    warnings.push('Less than 1 hour/day may not be enough for consistent progress');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
```

**Effort:** 3 hours
**Files:** `studyPlanService.ts`, `StudyPlanSetup.tsx`

---

## Data Model Changes

### StudyPlanSetupInput (additions)

```typescript
export interface StudyPlanSetupInput {
  // Existing...
  
  // P2.1: Study day preferences
  studyDayPreferences?: number[]; // 0=Sun..6=Sat
  
  // P2.4: Validation bypass
  acknowledgedWarnings?: string[]; // User accepted these warnings
}
```

### StudyPlan (additions)

```typescript
export interface StudyPlan {
  // Existing...
  
  // P1.1: Question targets
  progress: {
    // Existing...
    questionsTarget: number; // Total questions to answer over study period
  };
  
  // P1.3: Rebalance history
  rebalanceHistory?: {
    date: Date;
    reason: string;
    fromHealth: PlanHealth;
    toHealth: PlanHealth;
  }[];
}
```

### SECTION_QUESTION_TARGETS (new constant)

```typescript
export const SECTION_QUESTION_TARGETS: Record<string, number> = {
  FAR: 1000,
  AUD: 800,
  REG: 900,
  // ... etc
};
```

---

## Testing Strategy

### Unit Tests (Vitest)

| Test Suite | Coverage Target | Key Cases |
|------------|-----------------|-----------|
| `studyPlanService.test.ts` | 80% | Overflow handling, health calc, edge cases |
| `dailyPlanService.test.ts` | 75% | Phase detection, activity mix |
| `useStudyPlan.test.tsx` | 70% | Hook behavior, Firestore mock |

### Integration Tests

```typescript
// Test: Complete user journey
describe('Study Plan Journey', () => {
  it('creates plan → tracks progress → shows correct health', async () => {
    // 1. Create plan for FAR, 8 weeks out
    // 2. Complete 5 lessons, 50 questions
    // 3. Check health is 'on-track'
    // 4. Skip 3 days
    // 5. Check health degrades to 'slightly-behind'
  });
  
  it('handles short timeline gracefully', async () => {
    // 1. Create plan for exam in 5 days
    // 2. Verify only exam-week phase
    // 3. Verify no lesson goals
  });
});
```

### Manual QA Checklist

- [ ] Create plan with 2h/day, 6 days/week, 8 weeks out → reasonable distribution
- [ ] Create plan with exam tomorrow → graceful handling
- [ ] Practice 100 MCQs → health improves
- [ ] Skip 3+ days → health degrades, alert appears
- [ ] Click "Catch Up" button → plan redistributes

---

## Appendix: Competitive Analysis

| Feature | VoraPrep | Becker | UWorld | Gleim |
|---------|----------|--------|--------|-------|
| Adaptive daily plan | ✅ Smart | ❌ Fixed | ⭕ Partial | ⭕ Partial |
| Phase-based learning | ✅ | ✅ | ⭕ | ✅ |
| Spaced repetition | ✅ | ⭕ | ❌ | ⭕ |
| Plan health tracking | ✅ | ⭕ | ❌ | ❌ |
| Auto-rebalance | 🔜 P1.3 | ❌ | ❌ | ❌ |
| MCQ targets from blueprint | 🔜 P1.1 | ✅ | ✅ | ✅ |
| Study day preferences | 🔜 P2.1 | ⭕ | ❌ | ❌ |
| Personal metrics | 🔜 P2.3 | ⭕ | ⭕ | ❌ |

**Legend:** ✅ Full support, ⭕ Partial, ❌ Not available, 🔜 Planned

---

## Implementation Timeline

| Phase | Items | Effort | Owner |
|-------|-------|--------|-------|
| **P0 (shipped)** | Overflow, health calc, study hours | 3h | ✅ Done |
| **P1 Week 1** | P1.1 Question targets, P1.4 Edge cases | 6h | |
| **P1 Week 2** | P1.2 Unify today's plan, P1.3 Auto-rebalance | 10h | |
| **P2 Sprint** | P2.1-P2.4 | 16h | |

---

*Last updated: March 4, 2026*
