/**
 * Study Plan Types
 * 
 * Defines the data structures for the comprehensive Study Plan feature.
 * A Study Plan provides users with a personalized roadmap to pass their exam.
 */

import type { CourseId } from './course';

/**
 * Learning phases in a study plan
 */
export type StudyPhase = 
  | 'foundation'      // Learning core concepts, high lesson-to-practice ratio
  | 'building'        // Expanding knowledge, more practice, introducing simulations
  | 'reinforcement'   // Heavy practice, mixed review, identifying weak areas
  | 'final-review'    // No new content, mock exams, confidence building
  | 'exam-week';      // Light review only, rest before exam

/**
 * Health status of the study plan
 */
export type PlanHealth = 
  | 'on-track'        // Meeting or exceeding targets
  | 'slightly-behind' // 1-2 days behind, recoverable
  | 'behind'          // 3-5 days behind, needs attention
  | 'at-risk'         // Significantly behind, may need plan adjustment
  | 'critical';       // Exam date approaching, not enough time

/**
 * Input collected during study plan setup
 */
export interface StudyPlanSetupInput {
  courseId: CourseId;
  section: string;                    // e.g., 'FAR', 'SEE1', 'CISA'
  examDate: Date;
  hoursPerDay: number;                // Average hours available per day (backward-compatible flat value)
  studyDaysPerWeek: number;           // Days per week (1-7)
  weekdayHours?: number;              // Hours per weekday (Mon-Fri). If set, overrides hoursPerDay.
  weekendHours?: number;              // Hours per weekend day (Sat-Sun). If set, overrides hoursPerDay.
  priorExperience: 'none' | 'some' | 'retake';  // Background knowledge
  diagnosticScore?: number;           // 0-100, from diagnostic quiz
  diagnosticWeakAreas?: string[];     // Topics that need extra focus
  startDate?: Date;                   // Default: today
  totalLessons?: number;              // Total lessons available for section
  totalLessonMinutes?: number;        // Sum of all lesson durations (minutes)
  lessonDurations?: number[];         // Individual lesson durations in order (minutes)
}

/**
 * A week in the study plan
 */
export interface StudyPlanWeek {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  phase: StudyPhase;
  focusTopics: string[];              // Primary topics for this week
  goals: {
    lessons: number;                  // Target lessons to complete
    lessonMinutes: number;            // Target lesson time (minutes)
    questions: number;                // Target MCQs to answer
    questionMinutes: number;          // Target MCQ time (minutes) 
    flashcards: number;               // Target flashcard reviews
    simulations: number;              // Target TBS/simulations
    essays?: number;                  // Target essays (CMA only, until Sept 2026)
    cbqs?: number;                    // Target CBQs (CMA only, from May 2026)
    caseStudies?: number;             // Target case studies (CFP only)
    mockExams: number;                // Target mock exams (usually 0 or 1)
  };
  isCurrentWeek?: boolean;
  completionPercentage?: number;      // 0-100, calculated from activity
}

/**
 * A milestone in the study plan
 */
export interface StudyPlanMilestone {
  id: string;
  date: Date;
  type: 'phase-start' | 'phase-end' | 'checkpoint' | 'mock-exam' | 'exam-day';
  label: string;
  description?: string;
  completed?: boolean;
  completedAt?: Date;
}

/**
 * Topic coverage in the plan
 */
export interface TopicPlanItem {
  topicId: string;
  topicName: string;
  blueprintArea: string;
  blueprintWeight: number;            // 0-100 percentage
  plannedWeek: number;                // Which week to cover this topic
  estimatedHours: number;
  lessonIds: string[];
  isWeakArea: boolean;                // From diagnostic
  status: 'not-started' | 'in-progress' | 'completed';
  completionPercentage: number;
}

/**
 * Reality check assessment
 */
export interface RealityCheck {
  isRealistic: boolean;
  hoursNeeded: number;                // Total hours estimated to prepare (VoraPrep adaptive)
  hoursAvailable: number;             // Total hours based on user's schedule
  hourDeficit: number;                // hoursNeeded - hoursAvailable (0 if deficit)
  hourSurplus: number;                // hoursAvailable - hoursNeeded (0 if deficit)
  industryBenchmark: number;          // Industry average study hours (always > hoursNeeded)
  suggestedActions: RealityCheckAction[];
  message: string;                    // Human-readable assessment
  severity: 'good' | 'warning' | 'critical';
  relaxedHoursPerDay?: number | null; // Optional: reduced hours/day if surplus exists
}

export interface RealityCheckAction {
  type: 'extend-date' | 'increase-hours' | 'more-days' | 'accept-risk' | 'cram-mode';
  label: string;
  description: string;
  newValue?: number | Date;           // The suggested new value
  recommended?: boolean;
}

/**
 * The complete study plan
 */
export interface StudyPlan {
  // Identity
  id: string;
  courseId: CourseId;
  section: string;
  userId: string;
  
  // Setup inputs (for recalculation)
  setup: StudyPlanSetupInput;
  
  // Calculated plan
  startDate: Date;
  examDate: Date;
  totalDays: number;
  totalWeeks: number;
  hoursPerDay: number;
  studyDaysPerWeek: number;
  
  // The roadmap
  weeks: StudyPlanWeek[];
  milestones: StudyPlanMilestone[];
  topics: TopicPlanItem[];
  
  // Reality check
  realityCheck: RealityCheck;
  
  // Current status
  currentPhase: StudyPhase;
  currentWeek: number;
  health: PlanHealth;
  
  // Progress tracking
  progress: {
    lessonsCompleted: number;
    lessonsTotal: number;
    questionsAnswered: number;
    questionsTarget: number;
    accuracy: number;                 // Current overall accuracy
    accuracyTrend: 'improving' | 'stable' | 'declining';
    daysStudied: number;
    daysMissed: number;
    lastStudyDate?: Date;
  };
  
  // Alerts and notifications
  alerts: StudyPlanAlert[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastRecalculatedAt?: Date;
}

/**
 * Alert for the user about their plan
 */
export interface StudyPlanAlert {
  id: string;
  type: 'info' | 'warning' | 'critical' | 'achievement';
  title: string;
  message: string;
  actionLabel?: string;
  actionPath?: string;
  dismissible: boolean;
  dismissed?: boolean;
  createdAt: Date;
}

/**
 * Today's plan derived from the study plan
 */
export interface TodaysPlan {
  date: string;                       // ISO date string
  phase: StudyPhase;
  isRestDay: boolean;
  restDayReason?: string;
  activities: TodayActivity[];
  estimatedMinutes: number;
  completedMinutes: number;
  message?: string;                   // Encouraging message or alert
}

export interface TodayActivity {
  id: string;
  type: 'lesson' | 'mcq' | 'tbs' | 'flashcards' | 'mock-exam' | 'review';
  title: string;
  description: string;
  estimatedMinutes: number;
  priority: 'required' | 'recommended' | 'optional';
  params: {
    lessonId?: string;
    topic?: string;
    topics?: string[];
    questionCount?: number;
    section?: string;
    [key: string]: unknown;
  };
  completed: boolean;
  completedAt?: Date;
}

/**
 * Summary for display in nav health indicator
 */
export interface StudyPlanSummary {
  exists: boolean;
  health?: PlanHealth;
  daysUntilExam?: number;
  currentPhase?: StudyPhase;
  todayCompleted?: boolean;
  alertCount?: number;
}

/**\n * Estimate hours needed based on exam and section\n * \n * These values are based on industry research and pass rates:\n * - AICPA surveys: 300-400 hours total for all CPA sections\n * - Gleim/Becker: FAR 140-150h, AUD 80-120h, REG 100-120h\n * - NASBA: Average candidate attempts 3-4 sections over 18-24 months\n * - IMA for CMA: 150-170 hours per part\n * - ISACA for CISA: 150-200 hours recommended\n * - CFP Board: 250-300 hours of study\n */
export const SECTION_STUDY_HOURS: Record<string, number> = {
  // CPA sections (based on AICPA blueprint complexity + pass rates)
  FAR: 150,    // Hardest section, lowest pass rate (~45%)
  AUD: 110,    // Moderate difficulty, ~50% pass rate
  REG: 120,    // Moderate-hard, tax code memorization
  BAR: 100,    // Discipline - Business Analysis & Reporting
  ISC: 100,    // Discipline - Information Systems & Controls
  TCP: 100,    // Discipline - Tax Compliance & Planning
  // EA sections (IRS SEE exams)
  SEE1: 70,    // Individuals - most content
  SEE2: 80,    // Businesses - most complex
  SEE3: 50,    // Representation - shortest
  // CMA sections (IMA recommendation: 150-170h per part)
  CMA1: 160,   // Financial Planning, Performance, Analytics
  CMA2: 160,   // Strategic Financial Management
  // CIA sections (IIA: ~300-400h total; Gleim/Wiley per-part estimates)
  CIA1: 130,   // Essentials of Internal Auditing — foundational standards, heaviest
  CIA2: 115,   // Practice of Internal Auditing — application-oriented
  CIA3: 105,   // Business Knowledge — broadest scope, less depth
  // CISA (ISACA recommendation: 150-200h)
  CISA: 160,   // Single exam, 5 domains
  // CFP (CFP Board recommendation: 250-300h)
  CFP: 275,    // Single exam, 8 domains
};

/**
 * Experience modifier for study hours
 * 
 * These multipliers apply to the FALLBACK calculation only (when contentRegistry
 * is unavailable). The primary calculation uses mcqTarget + experience-scaled
 * timing from contentRegistry.ts.
 */
export const EXPERIENCE_MULTIPLIERS: Record<string, number> = {
  'none': 1.25,     // 125% - Beginners need more time
  'some': 0.90,     // 90% - Some familiarity reduces time
  'retake': 0.65,   // 65% - Focused remediation
};
