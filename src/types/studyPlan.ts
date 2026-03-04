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
  hoursPerDay: number;                // Average hours available per day
  studyDaysPerWeek: number;           // Days per week (1-7)
  priorExperience: 'none' | 'some' | 'retake';  // Background knowledge
  diagnosticScore?: number;           // 0-100, from diagnostic quiz
  diagnosticWeakAreas?: string[];     // Topics that need extra focus
  startDate?: Date;                   // Default: today
  totalLessons?: number;              // Total lessons available for section
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
    questions: number;                // Target MCQs to answer
    flashcards: number;               // Target flashcard reviews
    simulations: number;              // Target TBS/simulations
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
  hoursNeeded: number;                // Total hours estimated to prepare
  hoursAvailable: number;             // Total hours based on user's schedule
  hourDeficit: number;                // hoursNeeded - hoursAvailable
  suggestedActions: RealityCheckAction[];
  message: string;                    // Human-readable assessment
  severity: 'good' | 'warning' | 'critical';
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

/**
 * Estimate hours needed based on exam and section
 */
export const SECTION_STUDY_HOURS: Record<string, number> = {
  // CPA sections
  FAR: 140,
  AUD: 100,
  REG: 110,
  BAR: 90,
  ISC: 90,
  TCP: 90,
  // EA sections
  SEE1: 60,
  SEE2: 70,
  SEE3: 50,
  // CMA sections
  CMA1: 100,
  CMA2: 100,
  // CIA sections
  CIA1: 80,
  CIA2: 80,
  CIA3: 80,
  // CISA (single exam)
  CISA: 120,
  // CFP (single exam)
  CFP: 250,
};

/**
 * Experience modifier for study hours
 */
export const EXPERIENCE_MULTIPLIERS: Record<string, number> = {
  'none': 1.0,      // Full study time
  'some': 0.75,     // 25% reduction
  'retake': 0.6,    // 40% reduction - they've seen the material before
};
