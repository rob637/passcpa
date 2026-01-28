# PHASE 1: Multi-Course Expansion Plan

## VoraPrep Platform Evolution

**Document Version:** 1.0  
**Created:** January 28, 2026  
**Status:** Planning  

---

## Executive Summary

This document outlines the technical and business strategy for expanding VoraPrep from a CPA-focused product into a multi-exam prep platform. The goal is to leverage our existing infrastructure (~70-80% reusable) while creating a scalable foundation for adding new exam courses with minimal incremental development.

**Target Courses (Priority Order):**
1. CPA (existing) - Foundation
2. CMA (Certified Management Accountant) - High content overlap
3. EA (Enrolled Agent) - Tax overlap with REG
4. CIA (Certified Internal Auditor) - Audit overlap with AUD
5. GMAT/GRE - Different audience, proves platform flexibility

---

## Part 1: Architecture Refactor

### 1.1 New Type System

```typescript
// src/types/course.ts

/**
 * Course represents a complete exam prep product (CPA, CMA, etc.)
 */
export interface Course {
  id: CourseId;
  name: string;
  shortName: string;
  description: string;
  sections: ExamSectionConfig[];
  passingScore: number;
  totalTime: number; // in minutes
  pricing: CoursePricing;
  metadata: CourseMetadata;
}

export type CourseId = 'cpa' | 'cma' | 'ea' | 'cia' | 'gmat';

export interface ExamSectionConfig {
  id: string;                    // e.g., 'FAR', 'PART1', 'QUANT'
  name: string;                  // e.g., 'Financial Accounting and Reporting'
  shortName: string;             // e.g., 'FAR'
  weight: string;                // e.g., '25-35%'
  questionCount: number;
  timeAllowed: number;           // minutes
  questionTypes: QuestionType[];
  blueprintAreas: BlueprintArea[];
}

export interface BlueprintArea {
  id: string;
  name: string;
  weight: string;
  topics: string[];
}

export type QuestionType = 'mcq' | 'tbs' | 'wc' | 'essay' | 'data-insights';

export interface CoursePricing {
  monthly: number;
  annual: number;
  lifetime?: number;
  bundleDiscount?: number;       // % discount when bundled
}

export interface CourseMetadata {
  examProvider: string;          // 'AICPA', 'IMA', 'IRS', 'GMAC'
  websiteUrl: string;
  nextExamWindow?: string;
  averageStudyHours: number;
  difficultyRating: 1 | 2 | 3 | 4 | 5;
  prerequisites?: string[];
  careerPaths: string[];
}
```

### 1.2 Abstracted Lesson Type

```typescript
// src/types/index.ts (updated)

export interface Lesson {
  id: string;
  courseId: CourseId;            // NEW: which course this belongs to
  sectionId: string;             // e.g., 'FAR', 'PART1'
  title: string;
  description: string;
  order: number;
  duration: number;
  difficulty: Difficulty;
  topics: string[];
  content: LessonContent;
  
  // Optional blueprint mapping (exam-specific)
  blueprintArea?: string;
  blueprintTopic?: string;
  skillLevel?: SkillLevel;
}

export interface Question {
  id: string;
  courseId: CourseId;            // NEW
  sectionId: string;             // NEW (replaces 'section')
  topic: string;
  subtopic: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  
  // Blueprint tagging (optional, exam-specific)
  blueprintArea?: string;
  skillLevel?: SkillLevel;
}

export type SkillLevel = 
  | 'Remembering and Understanding'
  | 'Application' 
  | 'Analysis' 
  | 'Evaluation';
```

### 1.3 Course Configuration Files

```typescript
// src/courses/cpa/config.ts

import { Course } from '../../types/course';

export const CPA_COURSE: Course = {
  id: 'cpa',
  name: 'CPA Exam Review',
  shortName: 'CPA',
  description: 'Comprehensive preparation for the Uniform CPA Examination',
  passingScore: 75,
  totalTime: 240, // 4 hours per section
  
  sections: [
    {
      id: 'FAR',
      name: 'Financial Accounting and Reporting',
      shortName: 'FAR',
      weight: '100%',
      questionCount: 66,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs'],
      blueprintAreas: [
        { id: 'FAR-I', name: 'Conceptual Framework and Financial Reporting', weight: '25-35%', topics: [] },
        { id: 'FAR-II', name: 'Select Financial Statement Accounts', weight: '30-40%', topics: [] },
        { id: 'FAR-III', name: 'Select Transactions', weight: '20-30%', topics: [] },
        { id: 'FAR-IV', name: 'State and Local Governments', weight: '5-15%', topics: [] },
      ]
    },
    {
      id: 'AUD',
      name: 'Auditing and Attestation',
      shortName: 'AUD',
      weight: '100%',
      questionCount: 72,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs'],
      blueprintAreas: [
        { id: 'AUD-I', name: 'Ethics, Professional Responsibilities, and General Principles', weight: '15-25%', topics: [] },
        { id: 'AUD-II', name: 'Assessing Risk and Developing a Planned Response', weight: '25-35%', topics: [] },
        { id: 'AUD-III', name: 'Performing Further Procedures and Obtaining Evidence', weight: '30-40%', topics: [] },
        { id: 'AUD-IV', name: 'Forming Conclusions and Reporting', weight: '10-20%', topics: [] },
      ]
    },
    {
      id: 'REG',
      name: 'Regulation',
      shortName: 'REG',
      weight: '100%',
      questionCount: 72,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs', 'wc'],
      blueprintAreas: [
        { id: 'REG-I', name: 'Ethics and Responsibilities in Tax Practice', weight: '10-20%', topics: [] },
        { id: 'REG-II', name: 'Federal Taxation of Property Transactions', weight: '12-22%', topics: [] },
        { id: 'REG-III', name: 'Federal Taxation of Individuals', weight: '22-32%', topics: [] },
        { id: 'REG-IV', name: 'Federal Taxation of Entities', weight: '28-38%', topics: [] },
      ]
    },
    // BAR, ISC, TCP sections...
  ],
  
  pricing: {
    monthly: 29,
    annual: 99,
    lifetime: 299,
    bundleDiscount: 25,
  },
  
  metadata: {
    examProvider: 'AICPA',
    websiteUrl: 'https://www.aicpa.org/cpa-exam',
    averageStudyHours: 400,
    difficultyRating: 5,
    careerPaths: ['Public Accounting', 'Corporate Finance', 'Tax', 'Audit'],
  }
};
```

```typescript
// src/courses/cma/config.ts

import { Course } from '../../types/course';

export const CMA_COURSE: Course = {
  id: 'cma',
  name: 'CMA Exam Review',
  shortName: 'CMA',
  description: 'Preparation for the Certified Management Accountant exam',
  passingScore: 360, // Scaled score (300-500)
  totalTime: 240,
  
  sections: [
    {
      id: 'PART1',
      name: 'Financial Planning, Performance, and Analytics',
      shortName: 'Part 1',
      weight: '50%',
      questionCount: 100,
      timeAllowed: 240,
      questionTypes: ['mcq', 'essay'],
      blueprintAreas: [
        { id: 'CMA1-A', name: 'External Financial Reporting Decisions', weight: '15%', topics: [] },
        { id: 'CMA1-B', name: 'Planning, Budgeting, and Forecasting', weight: '20%', topics: [] },
        { id: 'CMA1-C', name: 'Performance Management', weight: '20%', topics: [] },
        { id: 'CMA1-D', name: 'Cost Management', weight: '15%', topics: [] },
        { id: 'CMA1-E', name: 'Internal Controls', weight: '15%', topics: [] },
        { id: 'CMA1-F', name: 'Technology and Analytics', weight: '15%', topics: [] },
      ]
    },
    {
      id: 'PART2',
      name: 'Strategic Financial Management',
      shortName: 'Part 2',
      weight: '50%',
      questionCount: 100,
      timeAllowed: 240,
      questionTypes: ['mcq', 'essay'],
      blueprintAreas: [
        { id: 'CMA2-A', name: 'Financial Statement Analysis', weight: '20%', topics: [] },
        { id: 'CMA2-B', name: 'Corporate Finance', weight: '20%', topics: [] },
        { id: 'CMA2-C', name: 'Decision Analysis', weight: '25%', topics: [] },
        { id: 'CMA2-D', name: 'Risk Management', weight: '10%', topics: [] },
        { id: 'CMA2-E', name: 'Investment Decisions', weight: '10%', topics: [] },
        { id: 'CMA2-F', name: 'Professional Ethics', weight: '15%', topics: [] },
      ]
    }
  ],
  
  pricing: {
    monthly: 29,
    annual: 99,
    lifetime: 249,
    bundleDiscount: 25,
  },
  
  metadata: {
    examProvider: 'IMA',
    websiteUrl: 'https://www.imanet.org/cma-certification',
    averageStudyHours: 300,
    difficultyRating: 4,
    prerequisites: ['2 years accounting experience OR bachelor\'s degree'],
    careerPaths: ['Corporate Finance', 'FP&A', 'Cost Accounting', 'Management'],
  }
};
```

---

## Part 2: Directory Structure

### 2.1 Proposed Structure

```
src/
├── courses/                          # Course-specific content & config
│   ├── index.ts                      # Course registry
│   ├── cpa/
│   │   ├── config.ts                 # CPA_COURSE definition
│   │   ├── lessons/
│   │   │   ├── index.ts
│   │   │   ├── far.ts
│   │   │   ├── aud.ts
│   │   │   ├── reg.ts
│   │   │   ├── bar.ts
│   │   │   ├── isc.ts
│   │   │   └── tcp.ts
│   │   ├── questions/
│   │   │   ├── index.ts
│   │   │   └── [section].ts
│   │   └── blueprintMatrix.ts
│   ├── cma/
│   │   ├── config.ts
│   │   ├── lessons/
│   │   │   ├── index.ts
│   │   │   ├── part1.ts
│   │   │   └── part2.ts
│   │   └── questions/
│   └── ea/
│       ├── config.ts
│       ├── lessons/
│       └── questions/
│
├── components/
│   ├── common/                       # Shared UI components (unchanged)
│   ├── layouts/
│   │   ├── AppLayout.tsx             # Generic app shell
│   │   └── CourseLayout.tsx          # NEW: Course-aware wrapper
│   └── pages/
│       ├── Dashboard.tsx             # Updated: Course-aware
│       ├── LessonViewer.tsx          # Unchanged (content-agnostic)
│       ├── Practice.tsx              # Updated: Course-aware
│       ├── ExamSimulator.tsx         # Updated: Uses course config
│       └── CourseSelector.tsx        # NEW: Course picker
│
├── hooks/
│   ├── useCourse.ts                  # NEW: Course context hook
│   ├── useStudy.ts                   # Updated: Course-aware progress
│   └── useAuth.ts                    # Unchanged
│
├── providers/
│   └── CourseProvider.tsx            # NEW: Course context provider
│
├── services/
│   ├── courseService.ts              # NEW: Course data fetching
│   ├── lessonService.ts              # Updated: Course-aware
│   └── questionService.ts            # Updated: Course-aware
│
└── types/
    ├── index.ts                      # Core types
    └── course.ts                     # NEW: Course-specific types
```

### 2.2 Course Registry

```typescript
// src/courses/index.ts

import { Course, CourseId } from '../types/course';
import { CPA_COURSE } from './cpa/config';
import { CMA_COURSE } from './cma/config';
// import { EA_COURSE } from './ea/config';

export const COURSES: Record<CourseId, Course> = {
  cpa: CPA_COURSE,
  cma: CMA_COURSE,
  // ea: EA_COURSE,
};

export const ACTIVE_COURSES: CourseId[] = ['cpa', 'cma'];

export const getCourse = (id: CourseId): Course | undefined => COURSES[id];

export const getDefaultCourse = (): CourseId => 'cpa';
```

---

## Part 3: Domain-Based Routing

### 3.1 Multi-Domain Strategy

| Domain | Purpose | Default Course |
|--------|---------|----------------|
| `voraprep.com` | Main landing, course selector | None (picker) |
| `voraprepcpa.com` | CPA-focused marketing/SEO | CPA |
| `voraprepcma.com` | CMA-focused marketing/SEO | CMA |
| `app.voraprep.com` | Unified application | User's selected course |

### 3.2 Course Detection

```typescript
// src/utils/courseDetection.ts

import { CourseId } from '../types/course';

interface CourseDetectionResult {
  courseId: CourseId | null;
  source: 'domain' | 'subdomain' | 'path' | 'user-preference' | 'default';
}

export const detectCourse = (): CourseDetectionResult => {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  
  // 1. Check domain-based routing
  const domainMap: Record<string, CourseId> = {
    'voraprepcpa.com': 'cpa',
    'www.voraprepcpa.com': 'cpa',
    'voraprepcma.com': 'cma',
    'www.voraprepcma.com': 'cma',
  };
  
  if (domainMap[hostname]) {
    return { courseId: domainMap[hostname], source: 'domain' };
  }
  
  // 2. Check subdomain-based routing
  const subdomainMatch = hostname.match(/^(cpa|cma|ea|cia)\.voraprep\.com$/);
  if (subdomainMatch) {
    return { courseId: subdomainMatch[1] as CourseId, source: 'subdomain' };
  }
  
  // 3. Check path-based routing
  const pathMatch = pathname.match(/^\/(cpa|cma|ea|cia)\//);
  if (pathMatch) {
    return { courseId: pathMatch[1] as CourseId, source: 'path' };
  }
  
  // 4. Check user preference (localStorage or user profile)
  const savedCourse = localStorage.getItem('voraprep_active_course');
  if (savedCourse && isValidCourseId(savedCourse)) {
    return { courseId: savedCourse as CourseId, source: 'user-preference' };
  }
  
  // 5. Default
  return { courseId: null, source: 'default' };
};

const isValidCourseId = (id: string): id is CourseId => {
  return ['cpa', 'cma', 'ea', 'cia', 'gmat'].includes(id);
};
```

### 3.3 Course Provider

```typescript
// src/providers/CourseProvider.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CourseId, Course } from '../types/course';
import { getCourse, getDefaultCourse } from '../courses';
import { detectCourse } from '../utils/courseDetection';

interface CourseContextType {
  courseId: CourseId;
  course: Course;
  setCourse: (id: CourseId) => void;
  availableCourses: CourseId[];
  userCourses: CourseId[];        // Courses user has purchased
}

const CourseContext = createContext<CourseContextType | null>(null);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courseId, setCourseId] = useState<CourseId>(() => {
    const detected = detectCourse();
    return detected.courseId || getDefaultCourse();
  });
  
  const [userCourses, setUserCourses] = useState<CourseId[]>(['cpa']); // From subscription
  
  const course = getCourse(courseId)!;
  
  const setCourse = (id: CourseId) => {
    setCourseId(id);
    localStorage.setItem('voraprep_active_course', id);
  };
  
  // Sync with URL on course change
  useEffect(() => {
    // Optionally update URL when course changes
    // history.replaceState(null, '', `/${courseId}${window.location.pathname}`);
  }, [courseId]);
  
  return (
    <CourseContext.Provider value={{
      courseId,
      course,
      setCourse,
      availableCourses: ['cpa', 'cma'],
      userCourses,
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) throw new Error('useCourse must be used within CourseProvider');
  return context;
};
```

### 3.4 Updated Routing

```typescript
// src/App.tsx (updated routing structure)

import { Routes, Route, Navigate } from 'react-router-dom';
import { CourseProvider } from './providers/CourseProvider';

function App() {
  return (
    <CourseProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/courses" element={<CourseSelector />} />
        
        {/* Course-specific routes (path-based) */}
        <Route path="/:courseId/*" element={<CourseRoutes />} />
        
        {/* Legacy CPA routes (redirect for backwards compatibility) */}
        <Route path="/lessons/*" element={<Navigate to="/cpa/lessons" replace />} />
        <Route path="/practice/*" element={<Navigate to="/cpa/practice" replace />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </CourseProvider>
  );
}

// Nested course routes
const CourseRoutes: React.FC = () => {
  const { courseId } = useParams();
  const { setCourse } = useCourse();
  
  useEffect(() => {
    if (courseId) setCourse(courseId as CourseId);
  }, [courseId]);
  
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="lessons" element={<Lessons />} />
      <Route path="lessons/:sectionId" element={<Lessons />} />
      <Route path="lessons/:sectionId/:lessonId" element={<LessonViewer />} />
      <Route path="practice" element={<Practice />} />
      <Route path="practice/:sectionId" element={<Practice />} />
      <Route path="exam" element={<ExamSimulator />} />
      <Route path="flashcards" element={<Flashcards />} />
      <Route path="progress" element={<Progress />} />
    </Routes>
  );
};
```

---

## Part 4: Bundle Pricing Model

### 4.1 Subscription Tiers

```typescript
// src/config/pricing.ts

export interface SubscriptionTier {
  id: string;
  name: string;
  courses: CourseId[] | 'all';
  pricing: {
    monthly: number;
    annual: number;
    lifetime?: number;
  };
  features: string[];
  popular?: boolean;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free',
    courses: ['cpa'], // Limited access to one course
    pricing: { monthly: 0, annual: 0 },
    features: [
      'First 10 lessons per section',
      '50 practice questions',
      'Basic progress tracking',
    ],
  },
  {
    id: 'single',
    name: 'Single Exam',
    courses: ['cpa'], // User picks one
    pricing: { monthly: 29, annual: 99, lifetime: 299 },
    features: [
      'Complete course access',
      'Unlimited practice questions',
      'Full exam simulator',
      'AI tutor assistance',
      'Progress analytics',
    ],
  },
  {
    id: 'dual',
    name: 'Two Exams',
    courses: ['cpa', 'cma'], // User picks two
    pricing: { monthly: 39, annual: 149, lifetime: 449 },
    popular: true,
    features: [
      'Access to 2 exam courses',
      'All Single Exam features',
      'Cross-exam progress tracking',
      'Priority support',
    ],
  },
  {
    id: 'all-access',
    name: 'All Access',
    courses: 'all',
    pricing: { monthly: 49, annual: 199, lifetime: 599 },
    features: [
      'Every current and future course',
      'All Two Exam features',
      'Early access to new courses',
      'Study group features',
      'Career resources',
    ],
  },
];
```

### 4.2 Subscription Service Updates

```typescript
// src/services/subscription.ts (updated)

export interface UserSubscription {
  id: string;
  oderId: string;
  tier: 'free' | 'single' | 'dual' | 'all-access';
  courses: CourseId[];           // Which courses they have access to
  billingInterval: 'monthly' | 'annual' | 'lifetime';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: Date;
  createdAt: Date;
}

export const hasAccessToCourse = (
  subscription: UserSubscription | null,
  courseId: CourseId
): boolean => {
  if (!subscription) return false;
  if (subscription.tier === 'all-access') return true;
  return subscription.courses.includes(courseId);
};

export const canUpgrade = (
  currentTier: string,
  targetTier: string
): boolean => {
  const tierOrder = ['free', 'single', 'dual', 'all-access'];
  return tierOrder.indexOf(targetTier) > tierOrder.indexOf(currentTier);
};

export const calculateUpgradePrice = (
  currentSubscription: UserSubscription,
  targetTier: SubscriptionTier
): number => {
  // Prorate based on remaining time
  const daysRemaining = Math.ceil(
    (currentSubscription.currentPeriodEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const currentTier = SUBSCRIPTION_TIERS.find(t => t.id === currentSubscription.tier)!;
  const dailyDifference = (targetTier.pricing.annual - currentTier.pricing.annual) / 365;
  return Math.max(0, dailyDifference * daysRemaining);
};
```

### 4.3 Course Access Gate Component

```typescript
// src/components/common/CourseGate.tsx

import React from 'react';
import { useCourse } from '../../hooks/useCourse';
import { useSubscription } from '../../services/subscription';
import { Link } from 'react-router-dom';

interface CourseGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const CourseGate: React.FC<CourseGateProps> = ({ children, fallback }) => {
  const { courseId } = useCourse();
  const { subscription } = useSubscription();
  
  const hasAccess = hasAccessToCourse(subscription, courseId);
  
  if (hasAccess) {
    return <>{children}</>;
  }
  
  return fallback || (
    <div className="text-center py-12">
      <h2 className="text-xl font-bold mb-4">Upgrade to Access This Course</h2>
      <p className="text-slate-600 mb-6">
        Your current plan doesn't include access to this course.
      </p>
      <Link to="/pricing" className="btn-primary">
        View Plans
      </Link>
    </div>
  );
};
```

---

## Part 5: Data Migration Strategy

### 5.1 Firestore Schema Updates

```typescript
// Current: users/{userId}/progress/{lessonId}
// New:     users/{userId}/courses/{courseId}/progress/{lessonId}

// Migration path:
// 1. Add courseId field to existing progress documents
// 2. New documents go to nested structure
// 3. Read from both locations during transition
// 4. Background job migrates old documents

interface ProgressDocument {
  lessonId: string;
  courseId: CourseId;          // NEW
  sectionId: string;           // NEW (replaces 'section')
  completed: boolean;
  completedAt?: Timestamp;
  timeSpent: number;
  quizScore?: number;
}

interface UserDocument {
  // Existing fields...
  
  // NEW: Course-specific preferences
  activeCourse: CourseId;
  coursePreferences: Record<CourseId, {
    examDate?: Timestamp;
    weeklyGoal?: number;
    focusAreas?: string[];
  }>;
}
```

### 5.2 Migration Script

```typescript
// scripts/migrate_to_multi_course.ts

import { db } from '../src/config/firebase';

async function migrateUserProgress() {
  const usersSnapshot = await db.collection('users').get();
  
  for (const userDoc of usersSnapshot.docs) {
    const progressSnapshot = await userDoc.ref.collection('progress').get();
    
    for (const progressDoc of progressSnapshot.docs) {
      const data = progressDoc.data();
      
      // Skip if already migrated
      if (data.courseId) continue;
      
      // Infer courseId from lessonId prefix
      const courseId = inferCourseFromLessonId(data.lessonId);
      
      // Write to new location
      await userDoc.ref
        .collection('courses')
        .doc(courseId)
        .collection('progress')
        .doc(progressDoc.id)
        .set({
          ...data,
          courseId,
          sectionId: data.section,
          migratedAt: new Date(),
        });
    }
  }
}

function inferCourseFromLessonId(lessonId: string): CourseId {
  // Current format: 'FAR-I-001', 'AUD-II-003', etc.
  // All existing lessons are CPA
  return 'cpa';
}
```

---

## Part 6: Implementation Timeline

### Phase 1A: Foundation (Weeks 1-2)

| Task | Priority | Effort | Owner |
|------|----------|--------|-------|
| Create `types/course.ts` | P0 | 2h | Dev |
| Create course config files | P0 | 4h | Dev |
| Implement `CourseProvider` | P0 | 4h | Dev |
| Update routing structure | P0 | 8h | Dev |
| Add course detection utility | P1 | 2h | Dev |

**Milestone:** CPA works identically with new architecture

### Phase 1B: CPA Migration (Weeks 3-4)

| Task | Priority | Effort | Owner |
|------|----------|--------|-------|
| Move CPA lessons to `courses/cpa/` | P0 | 4h | Dev |
| Move CPA questions to `courses/cpa/` | P0 | 4h | Dev |
| Update all imports | P0 | 4h | Dev |
| Update Firestore schema | P1 | 8h | Dev |
| Run migration script | P1 | 2h | Dev |
| E2E testing | P0 | 8h | Dev |

**Milestone:** CPA fully migrated, tests passing

### Phase 1C: CMA Course (Weeks 5-8)

| Task | Priority | Effort | Owner |
|------|----------|--------|-------|
| Create CMA config | P0 | 2h | Dev |
| Create CMA lesson content | P0 | 40h | Content |
| Create CMA questions | P0 | 40h | Content |
| Content review & QA | P0 | 16h | Reviewer |
| Update pricing page | P1 | 4h | Dev |
| Update subscription service | P1 | 8h | Dev |

**Milestone:** CMA course live

### Phase 1D: Multi-Domain Setup (Week 9)

| Task | Priority | Effort | Owner |
|------|----------|--------|-------|
| Configure DNS for new domains | P1 | 2h | DevOps |
| Update hosting configuration | P1 | 4h | DevOps |
| Test domain-based routing | P1 | 4h | QA |
| Update landing pages per domain | P2 | 8h | Dev |

**Milestone:** voraprepcma.com live

---

## Part 7: Content Creation Pipeline

### 7.1 Lesson Template

```typescript
// Template for creating new course lessons

const LESSON_TEMPLATE: Lesson = {
  id: '[COURSE]-[AREA]-[NUMBER]',  // e.g., 'CMA-1A-001'
  courseId: '[COURSE_ID]',
  sectionId: '[SECTION_ID]',
  title: '[Descriptive Title]',
  description: '[One sentence description]',
  order: 1,
  duration: 45,  // Estimate in minutes
  difficulty: 'intermediate',
  topics: ['Topic1', 'Topic2'],
  content: {
    sections: [
      {
        title: 'Why This Matters',
        type: 'callout',
        content: '[Motivate why student should care]'
      },
      {
        title: '[Core Concept 1]',
        type: 'text',
        content: '[Explanation with **bold** for emphasis]'
      },
      {
        title: '[Comparison/Data]',
        type: 'table',
        headers: ['Column1', 'Column2', 'Column3'],
        rows: [
          ['Data1', 'Data2', 'Data3'],
        ]
      },
      {
        title: '🧠 Memory Aid',
        type: 'callout',
        content: '[Mnemonic or memory technique]'
      },
      {
        title: '⚠️ Exam Trap Alert',
        type: 'warning',
        content: '[Common mistake to avoid]'
      },
      {
        title: 'Key Takeaways',
        type: 'summary',
        content: [
          'Takeaway 1',
          'Takeaway 2',
          'Takeaway 3',
        ]
      }
    ]
  }
};
```

### 7.2 Content Overlap Matrix

Identifies lessons that can be adapted from existing CPA content:

| CMA Topic | Overlapping CPA Lessons | Adaptation Needed |
|-----------|------------------------|-------------------|
| Financial Statements | FAR-I-001 through FAR-I-010 | Minor (remove GAAP deep-dives) |
| Cost Accounting | FAR-II (inventory) | Moderate (add management focus) |
| Budgeting | BEC content | Minor |
| Internal Controls | AUD-II (risk assessment) | Moderate (internal focus) |
| Ethics | AUD-I (ethics) | Heavy (IMA vs AICPA standards) |
| Corporate Finance | BAR content | Moderate |

**Estimated Content Reuse: 30-40%**

---

## Part 8: Success Metrics

### 8.1 Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Bundle size increase | <15% | Lighthouse |
| Time to add new course | <2 weeks (content ready) | Tracking |
| Shared component usage | >80% | Code analysis |
| Test coverage | >80% | Jest/Vitest |

### 8.2 Business Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| CMA launch users (M1) | 500 | Analytics |
| CPA→CMA conversion | 15% | Subscription data |
| Bundle tier adoption | 30% of paid users | Subscription data |
| Course completion rate | >40% | Progress data |

---

## Part 9: Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Breaking existing CPA functionality | Medium | High | Feature flags, gradual rollout |
| Content quality for new exams | Medium | High | Expert reviewers, beta feedback |
| Complexity explosion | Medium | Medium | Strict typing, code reviews |
| User confusion (which course?) | Low | Medium | Clear onboarding, course selector |
| SEO dilution | Medium | Medium | Separate domains, targeted content |

---

## Appendix A: Quick Reference Commands

```bash
# Create new course scaffolding
npm run create-course -- --id=ea --name="Enrolled Agent"

# Validate course config
npm run validate-course -- --id=cma

# Generate content template
npm run generate-lesson -- --course=cma --section=PART1 --count=10

# Run course-specific tests
npm run test -- --course=cma

# Build for specific domain
npm run build -- --domain=voraprepcma.com
```

---

## Appendix B: Decision Log

| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|------------------------|
| 2026-01-28 | Unified codebase | Lower maintenance, easier cross-sell | Separate apps per exam |
| 2026-01-28 | Path-based routing | Simpler than subdomains, SEO-friendly | Subdomain routing |
| 2026-01-28 | CMA as first expansion | High content overlap, same audience | EA, CIA |
| 2026-01-28 | Bundle pricing model | Maximize LTV, encourage expansion | Per-course only |

---

## Next Steps

1. [ ] Review and approve this plan
2. [ ] Create Phase 1A tasks in project tracker
3. [ ] Begin type system implementation
4. [ ] Identify CMA content writer/reviewer
5. [ ] Reserve domains (voraprepcma.com, voraprepea.com)

---

*Document maintained by: VoraPrep Engineering*  
*Last updated: January 28, 2026*
