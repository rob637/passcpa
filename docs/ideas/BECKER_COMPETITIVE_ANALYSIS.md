# Becker Competitive Analysis - VoraPrep Improvements

## Executive Summary

After analyzing Becker's CPA review platform, here are the key gaps and recommended improvements for VoraPrep to achieve competitive parity with a **modern, mobile-first advantage**.

## Current State: VoraPrep vs Becker

### Where VoraPrep is BETTER
| Feature | Why We're Better |
|---------|------------------|
| **Modern UI** | Google-inspired design vs Becker's dated corporate look |
| **Mobile Experience** | Native Capacitor app vs Becker's web-only |
| **AI Daily Plan** | Personalized study plans - Becker doesn't have this |
| **Gamification** | Streaks, points, readiness ring - more engaging |
| **Active Learning Focus** | Practice-first vs video-heavy approach |
| **Price** | More accessible pricing |

### Where Becker is Better (GAPS TO CLOSE)
| Feature | Becker | VoraPrep Gap |
|---------|--------|--------------|
| **Content Counts** | "10 Videos · 40 MCQs · 6 TBS" per module | We don't show this |
| **Study Journey** | Clear F1→F6 progression with Mini Exams | Our Lessons page is flat |
| **Practice Test Config** | MCQ/TBS counts, Random vs Personalized | Our setup is simpler |
| **Units Report** | Detailed completion % by module | Less granular |
| **Question Search** | Find by question ID | Missing |
| **Exam Tools** | Calculator, Spreadsheet in practice | We have calc, need spreadsheet |

---

## Priority 1: Study Journey Redesign (HIGH)

### Current State
Our Lessons page shows a flat list of topics. Becker shows a clear progression:
- F1 · Financial Reporting
- F2 · Financial Reporting and Disclosures  
- Mini Exam 1
- F3 · Assets and Related Topics
- ...

### Recommendation
Create a **Study Journey** view that:

1. **Groups lessons into Units** (F1, F2, etc.)
2. **Shows content counts per unit**: "12 Lessons · 45 MCQs · 6 TBS"
3. **Includes Mini Exams** between units
4. **Shows progress bar** per unit
5. **Tracks completion %** like Becker's Units Report

### Implementation
```tsx
// New component: StudyJourney.tsx
const STUDY_UNITS = {
  FAR: [
    { id: 'F1', name: 'Financial Reporting', lessons: [...], mcqCount: 98, tbsCount: 11 },
    { id: 'F2', name: 'Financial Reporting and Disclosures', lessons: [...], mcqCount: 206, tbsCount: 22 },
    { id: 'MINI-1', type: 'exam', name: 'Mini Exam 1' },
    { id: 'F3', name: 'Assets and Related Topics', lessons: [...], mcqCount: 164, tbsCount: 28 },
    // ...
  ]
};
```

---

## Priority 2: Enhanced Practice Test Configuration (HIGH)

### Current State
- Basic question count selector (5, 10, 20)
- Mode selection (Study, Timed, Exam)
- Section filter

### Becker Features We Need
1. **Scoring Mode**: Exam vs Practice (show explanations after each vs at end)
2. **Test Mode**: Random vs Personalized (Adapt2U - weak areas)
3. **Question Type Mix**: Specify MCQ and TBS counts separately
4. **Unit/Module Filter**: Select specific units (F1, F2, etc.)
5. **Filter by Status**: Unanswered, Got Incorrect, Got Correct, Marked for Review

### Implementation
```tsx
// Enhanced SessionConfig
interface EnhancedSessionConfig {
  scoringMode: 'exam' | 'practice';  // When to show answers
  testMode: 'random' | 'personalized' | 'weak-areas';
  mcqCount: number;
  tbsCount: number;
  units: string[];  // ['F1', 'F2'] 
  questionStatus: ('unanswered' | 'incorrect' | 'correct' | 'review')[];
}
```

---

## Priority 3: Detailed Performance Dashboard (MEDIUM)

### Current State
We have basic progress tracking on the Progress page.

### Becker Features We Need
1. **Units Report Table**:
   - Columns: Unit, Videos %, MCQs ✓, MCQs %, TBSs ✓, TBSs %, EDR (Exam Day Readiness)
   - Expandable rows showing modules within units

2. **Study Time Chart**:
   - Area chart showing daily study time over selected period
   - Breakdown by activity type (Lessons, Practice, Exams, Others)

3. **Time Range Selector**: Last Week, Last Month, All Time

### Implementation
Create a detailed `PerformanceReport.tsx` component with:
- Units completion table
- Study time visualization
- Export/print capability

---

## Priority 4: Question Search (MEDIUM)

### Becker Feature
Users can search for specific questions by ID (e.g., "MCQ-15259").

### Why It Matters
- Students share question IDs in study groups
- Instructors reference specific questions
- Easier to review specific topics

### Implementation
```tsx
// QuestionSearch page
const QuestionSearch = () => {
  const [questionId, setQuestionId] = useState('');
  const [questionType, setQuestionType] = useState<'mcq' | 'tbs'>('mcq');
  
  const handleSearch = async () => {
    const question = await getQuestionById(questionId);
    // Display question with explanation
  };
};
```

---

## Priority 5: Blueprint Report (MEDIUM)

### Becker Feature
Modal showing AICPA Blueprint with:
- Content areas and weights (30-40%)
- Skill levels (Remembering, Application, Analysis, Evaluation)
- Topic performance per blueprint item
- Links to relevant modules

### We Already Have
- Blueprint data in `examConfig.ts`
- Blueprint tags on questions
- LessonMatrix mapping lessons to blueprint

### What We Need
A visual Blueprint Report showing:
1. Blueprint areas with weight percentages
2. User's performance per area
3. Skill level breakdown (checkmarks like Becker)
4. Links to practice those areas

---

## Priority 6: Exam Interface Enhancements (LOW)

### Current State
Our ExamSimulator has: Timer, question navigation, testlets, calculator, TBS

### Becker Features to Add
1. **Spreadsheet Tool** - Excel-like for calculations
2. **Question ID Display** - Show MCQ-XXXXX format
3. **Skill Level Badge** - "Remembering & Understanding" per question

---

## UI/UX Observations

### Becker's Design
- Corporate/enterprise feel (navy blue, gold accents)
- Dense information display
- Professional but dated
- Left sidebar navigation

### VoraPrep's Advantage
- Modern, clean, Google-inspired
- Mobile-first responsive
- More whitespace, less overwhelming
- Bottom navigation (mobile-friendly)

### Recommendation
Keep our modern aesthetic but add the **information density** that serious students expect:
- Show content counts
- Display completion percentages
- Surface more statistics

---

## Implementation Roadmap

### Phase 1 (Sprint 1-2): High Priority
1. ✅ Study Journey view with Units/Modules
2. ✅ Content counts per unit (Lessons · MCQs · TBS)
3. ✅ Enhanced Practice Test configuration

### Phase 2 (Sprint 3-4): Medium Priority  
4. Detailed Units Report table
5. Question Search feature
6. Blueprint Report modal

### Phase 3 (Sprint 5+): Polish
7. Spreadsheet tool in exam simulator
8. Question ID display
9. Additional analytics

---

## Conclusion

VoraPrep already has a **stronger foundation** than Becker in several areas (mobile, AI, modern UI). The main gaps are in:

1. **Information architecture** - Showing the "F1, F2, F3" unit structure
2. **Content visibility** - Displaying MCQ/TBS counts
3. **Detailed reporting** - Units completion table

These are **presentation** issues, not content gaps. Our question bank and lesson content is comprehensive. We just need to surface it better.

**Key insight**: Becker looks "professional" by showing lots of numbers and statistics. Adding content counts and completion percentages will immediately make VoraPrep feel more serious/comprehensive without actually changing the underlying content.
