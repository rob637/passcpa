/**
 * Smart Daily Plan Service
 * 
 * Generates personalized daily study plans based on:
 * - User's weak areas (topic accuracy < 70%)
 * - Spaced repetition (due reviews)
 * - Progress gaps (unstarted lessons, untested topics)
 * - Exam date proximity (intensity scaling)
 * - Learning variety (mix MCQs, lessons, TBS)
 * - Learning phase awareness (Foundation → Building → Reinforcement → Final Review → Exam Week)
 * - Curriculum awareness (only quiz on topics from completed lessons)
 * 
 * Philosophy: Activity mix adapts to learning phase.
 * Foundation: 60% lessons, 30% practice, 10% flashcards
 * Building: 35% lessons, 40% practice, 15% flashcards, 10% simulations
 * Reinforcement: 15% lessons, 45% practice, 15% flashcards, 25% simulations
 * Final Review: 10% lessons, 35% practice, 20% flashcards, 35% simulations
 * Exam Week: 0% new lessons, 30% light practice, 30% flashcards, 40% review
 */

import { fetchLessonsBySection } from './lessonService';
import { POINT_VALUES } from '../config/examConfig';
import type { CourseId, ExamSection } from '../types';
import { TBSHistoryEntry } from './questionHistoryService';
import { getCourse } from '../courses';
import logger from '../utils/logger';
import { 
  getCoveredTopics, 
  getPreviewTopics, 
  getUnlockedTBSTypes 
} from './curriculumService';

export interface DailyActivity {
  id: string;
  type: 'lesson' | 'mcq' | 'tbs' | 'flashcards' | 'review' | 'essay' | 'cbq' | 'case_study' | 'timed_quiz' | 'mock_exam';
  title: string;
  description: string;
  estimatedMinutes: number;
  points: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  reason: string; // Why this activity was recommended
  params: {
    lessonId?: string;
    tbsId?: string;
    essayId?: string;
    cbqId?: string;
    caseStudyId?: string;
    section?: string;
    topic?: string;
    topics?: string[];
    questionCount?: number;
    cardCount?: number; // For flashcard sessions
    difficulty?: string;
    mode?: string;
    timeLimit?: number; // For timed quiz
    examType?: 'mini' | 'full'; // For mock exam
  };
  completed?: boolean;
  completedAt?: string;
}

export interface DailyPlan {
  date: string;
  section: string;
  targetPoints: number;
  estimatedMinutes: number;
  activities: DailyActivity[];
  /** Current learning phase and why it was selected */
  learningPhase?: {
    phase: LearningPhase;
    reason: string;
    description: string;
  };
  /** Rest day recommendation (if applicable) */
  restDay?: {
    isRestDay: boolean;
    reason: string;
  };
  summary: {
    totalActivities: number;
    lessonCount: number;
    mcqCount: number;
    tbsCount: number;
    flashcardCount: number;
    essayCount: number;
    cbqCount: number;
    caseStudyCount: number;
    timedQuizCount: number;
    mockExamCount: number;
    weakAreaFocus: string[];
  };
  generatedAt: string;
}

export interface TopicStats {
  topic: string;
  topicId?: string;
  accuracy: number;
  totalQuestions: number;
  correct: number;
  lastPracticed?: string;
  /** Average response time in milliseconds (if tracked). Used by Phase 4
   *  to distinguish true mastery (fast + accurate) from fragile knowledge
   *  (slow + accurate). */
  avgResponseTimeMs?: number;
}

export interface UserStudyState {
  section: string;
  examDate?: string;
  dailyGoal: number;
  topicStats: TopicStats[];
  tbsStats?: TBSHistoryEntry[]; // Added TBS stats
  questionsDue?: string[]; // Added Due Questions (Spaced Repetition)
  lessonProgress: Record<string, number>; // lessonId -> progress %
  flashcardsDue: number;
  currentStreak: number;
  todayPoints: number;
  // Curriculum-aware options
  enableCurriculumFilter?: boolean; // Filter MCQs to covered topics only
  enablePreviewMode?: boolean; // Allow 10% lookahead for next topics
  // Weekly intelligence: injected by persistence layer from recent plan history
  recentHistory?: RecentDaySnapshot[];
  // Personalized duration estimates (injected from Phase 1 tracking data)
  personalizedDurations?: Record<string, number>; // activityType → avg minutes
  // Study schedule (0=Sun..6=Sat). If omitted, all days are study days.
  studyDayPreferences?: number[];
  // Aggregated micro-feedback from past activities (injected by persistence)
  activityFeedback?: ActivityFeedbackStats;
}

// ============================================================================
// Weekly Intelligence Types
// ============================================================================

/**
 * Lightweight snapshot of a past day's plan, used for weekly awareness.
 * Created from PersistedDailyPlan to avoid circular dependency.
 */
export interface RecentDaySnapshot {
  date: string;
  activities: { type: DailyActivity['type']; topic?: string; priority: string }[];
  completedActivities: string[];
  totalActivities: number;
  hadMockExam: boolean;
}

/**
 * Analysis of the past week's study patterns — used to fill gaps and prevent
 * repetitive plans.
 */
interface WeeklyGaps {
  /** Activity types not seen (or underrepresented) in the past week */
  underrepresentedTypes: DailyActivity['type'][];
  /** Topics not practiced in the past week despite being available */
  untouchedTopics: string[];
  /** Days since last mock exam (null if never taken) */
  daysSinceLastMock: number | null;
  /** Average completion rate over the past week (0-1) */
  avgCompletionRate: number;
  /** Whether yesterday included a mock exam */
  yesterdayHadMock: boolean;
  /** Completion rates for last 3 days (newest first) */
  recentCompletionRates: number[];
  /** Total questions answered in history (sum across all days) */
  totalQuestionsAnswered: number;
}

// ============================================================================
// Micro-Feedback Types
// ============================================================================

/**
 * Aggregate feedback statistics per activity type, built from user thumbs-up/down
 * ratings recorded after completing activities. Stored in localStorage,
 * injected by the persistence layer.
 */
export interface ActivityFeedbackStats {
  /** Activity types the user has rated negatively more often than positively.
   *  Plan generator will reduce frequency of these types. */
  dislikedTypes: DailyActivity['type'][];
  /** Activity types the user has rated positively more often than negatively.
   *  Plan generator may boost frequency of these when filling time. */
  likedTypes: DailyActivity['type'][];
}

/**
 * A single feedback record from the user after completing an activity.
 */
export interface ActivityFeedbackRecord {
  activityType: DailyActivity['type'];
  /** +1 = liked / helpful, -1 = disliked / unhelpful */
  rating: 1 | -1;
  /** Optional free-form tag: 'too_easy' | 'too_hard' | 'too_long' | 'not_relevant' */
  tag?: string;
  recordedAt: string; // ISO date
}

// Average points per MCQ (used for estimates)
const MCQ_AVG_POINTS = 2; // Average of easy(1) + medium(2) + hard(3)

// Static fallback minutes per activity type (used when no personalized data)
const ACTIVITY_DURATION = {
  lesson_short: 15,
  lesson_medium: 25,
  lesson_long: 40,
  mcq_10: 12,
  mcq_15: 18,
  mcq_20: 25,
  tbs: 20,
  flashcards: 10,
  flashcards_new: 15,    // Learning new flashcards
  essay: 30,             // CMA essays are 30 mins each
  cbq: 20,               // CMA CBQs are 15-20 mins each (effective Sept 2026)
  case_study: 25,        // CFP case studies
  timed_quiz: 15,        // 10-15 question timed quiz
  mock_exam_mini: 30,    // Mini mock (20-25 questions)
};

/**
 * Get the estimated duration for an activity type, using personalized data
 * when available (3+ tracked completions) and falling back to static defaults.
 *
 * @param durationKey - A key from ACTIVITY_DURATION (e.g. 'mcq_15', 'tbs')
 * @param activityType - The DailyActivity.type used as the personalization key
 * @param personalized - Map from activityType → avg actual minutes (may be undefined)
 */
const getDuration = (
  durationKey: keyof typeof ACTIVITY_DURATION,
  activityType: string | undefined,
  personalized: Record<string, number> | undefined
): number => {
  if (personalized && activityType && personalized[activityType] != null) {
    // Clamp personalized values to ±50% of the static default to prevent wild swings
    const staticVal = ACTIVITY_DURATION[durationKey];
    const personalVal = personalized[activityType];
    return Math.round(Math.max(staticVal * 0.5, Math.min(staticVal * 1.5, personalVal)));
  }
  return ACTIVITY_DURATION[durationKey];
};

// ============================================================================
// Learning Phases
// ============================================================================

/**
 * Learning phases model the student's journey through exam preparation.
 * Each phase changes the *type* of activities in the plan, not just volume.
 *
 * - foundation:    First exposure. Heavy on lessons, light practice.
 * - building:      Balanced. Lessons + moderate practice + first simulations.
 * - reinforcement: Practice-heavy. Drilling weak areas, TBS mastery, spaced repetition.
 * - finalReview:   Mock exams, timed drills, comprehensive flashcard review.
 * - examWeek:      Light review only. No new material. Confidence builders.
 */
export type LearningPhase = 'foundation' | 'building' | 'reinforcement' | 'finalReview' | 'examWeek';

/**
 * Phase budget controls how the plan allocates time across activity categories.
 * Values are fractions that sum to ~1.0.
 */
interface PhaseBudget {
  /** Max number of new lessons to add */
  maxLessons: number;
  /** Max number of weak-area MCQ blocks */
  maxWeakAreaBlocks: number;
  /** Whether to include TBS/essays/CBQs/case studies */
  includeSimulations: boolean;
  /** Whether to include timed quizzes */
  includeTimedQuiz: boolean;
  /** Whether to include mock exams (overrides day-of-week logic) */
  includeMockExam: boolean;
  /** Priority boost for flashcards ('high' | 'medium' | 'low') */
  flashcardPriority: 'critical' | 'high' | 'medium' | 'low';
  /** Whether to add new lessons or only continue incomplete ones */
  allowNewLessons: boolean;
  /** Description shown in plan metadata */
  description: string;
}

const PHASE_BUDGETS: Record<LearningPhase, PhaseBudget> = {
  foundation: {
    maxLessons: 3,
    maxWeakAreaBlocks: 1,
    includeSimulations: false,
    includeTimedQuiz: false,
    includeMockExam: false,
    flashcardPriority: 'medium',
    allowNewLessons: true,
    description: 'Building your knowledge base — focus on lessons and light practice',
  },
  building: {
    maxLessons: 2,
    maxWeakAreaBlocks: 2,
    includeSimulations: true,
    includeTimedQuiz: false,
    includeMockExam: false,
    flashcardPriority: 'medium',
    allowNewLessons: true,
    description: 'Balanced study — lessons, practice, and first simulations',
  },
  reinforcement: {
    maxLessons: 1,
    maxWeakAreaBlocks: 3,
    includeSimulations: true,
    includeTimedQuiz: true,
    includeMockExam: true,
    flashcardPriority: 'high',
    allowNewLessons: true,
    description: 'Practice-heavy — drilling weak areas and building speed',
  },
  finalReview: {
    maxLessons: 0,
    maxWeakAreaBlocks: 2,
    includeSimulations: true,
    includeTimedQuiz: true,
    includeMockExam: true,
    flashcardPriority: 'high',
    allowNewLessons: false,
    description: 'Final push — mock exams, timed drills, comprehensive review',
  },
  examWeek: {
    maxLessons: 0,
    maxWeakAreaBlocks: 1,
    includeSimulations: false,
    includeTimedQuiz: false,
    includeMockExam: false,
    flashcardPriority: 'high',
    allowNewLessons: false,
    description: 'Exam week — light review and confidence building. You\'re ready!',
  },
};

/**
 * Determine the user's current learning phase based on:
 * 1. Lesson completion percentage (content coverage)
 * 2. Days until exam (urgency)
 * 3. Overall question accuracy (mastery)
 *
 * The phase drives which activity types appear in the daily plan.
 */
export const determineLearningPhase = (
  lessonProgress: Record<string, number>,
  totalLessonsInSection: number,
  examDate?: string,
  topicStats?: TopicStats[],
): { phase: LearningPhase; reason: string } => {
  // Calculate content coverage
  const completedLessons = Object.values(lessonProgress).filter(p => p >= 100).length;
  const contentCoverage = totalLessonsInSection > 0
    ? completedLessons / totalLessonsInSection
    : 0;

  // Calculate overall accuracy across all attempted topics
  const attemptedTopics = (topicStats || []).filter(t => t.totalQuestions >= 3);
  const overallAccuracy = attemptedTopics.length > 0
    ? attemptedTopics.reduce((sum, t) => sum + t.accuracy, 0) / attemptedTopics.length
    : 0;
  const totalQuestionsAnswered = (topicStats || []).reduce((sum, t) => sum + t.totalQuestions, 0);

  // Calculate days until exam
  let daysUntilExam: number | null = null;
  if (examDate) {
    daysUntilExam = Math.ceil(
      (new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
  }

  // === Phase Detection (most specific first) ===

  // Exam Week: ≤7 days out regardless of progress
  if (daysUntilExam !== null && daysUntilExam <= 7) {
    return {
      phase: 'examWeek',
      reason: `${daysUntilExam} day${daysUntilExam === 1 ? '' : 's'} until exam — light review only`,
    };
  }

  // Final Review: ≤21 days out AND decent coverage (>60%)
  if (daysUntilExam !== null && daysUntilExam <= 21 && contentCoverage >= 0.6) {
    return {
      phase: 'finalReview',
      reason: `${daysUntilExam} days until exam with ${Math.round(contentCoverage * 100)}% content covered — final push`,
    };
  }

  // Final Review: High coverage + high accuracy (even without exam date)
  if (contentCoverage >= 0.9 && overallAccuracy >= 70 && totalQuestionsAnswered >= 200) {
    return {
      phase: 'finalReview',
      reason: `${Math.round(contentCoverage * 100)}% content covered with ${Math.round(overallAccuracy)}% accuracy — ready for final review`,
    };
  }

  // Reinforcement: >60% content covered and some practice history
  if (contentCoverage >= 0.6 && totalQuestionsAnswered >= 50) {
    return {
      phase: 'reinforcement',
      reason: `${Math.round(contentCoverage * 100)}% content covered — time to drill and strengthen`,
    };
  }

  // Building: 25-60% content covered
  if (contentCoverage >= 0.25) {
    return {
      phase: 'building',
      reason: `${Math.round(contentCoverage * 100)}% content covered — balanced lessons and practice`,
    };
  }

  // Accelerated Foundation → Building: Exam within 45 days AND user has been assessed
  // (diagnostic quiz seeds topicStats). Even with 0% lessons, a tight deadline
  // demands more than just lessons — include practice blocks for identified weak areas.
  if (daysUntilExam !== null && daysUntilExam <= 45 && attemptedTopics.length >= 2) {
    return {
      phase: 'building',
      reason: `${daysUntilExam} days until exam with diagnostic data — accelerated study plan`,
    };
  }

  // Foundation: <25% content covered (default)
  return {
    phase: 'foundation',
    reason: `${Math.round(contentCoverage * 100)}% content covered — focus on learning the material`,
  };
};

// ============================================================================
// Weekly Gap Analysis
// ============================================================================

/**
 * Analyze the past week of study history to find patterns and gaps.
 * Used to diversify today's plan so the user doesn't repeat the same
 * activity types or topics day after day.
 */
const analyzeWeeklyGaps = (
  recentHistory: RecentDaySnapshot[],
  availableTopics: string[]
): WeeklyGaps => {
  // Count activity types across the week
  const typeCount: Record<string, number> = {};
  const topicsSeen = new Set<string>();
  let daysSinceLastMock: number | null = null;
  let totalCompleted = 0;
  let totalActivities = 0;
  let totalQuestionsAnswered = 0;

  // Sort by date descending (newest first)
  const sorted = [...recentHistory].sort((a, b) => b.date.localeCompare(a.date));

  sorted.forEach((day, index) => {
    const completedSet = new Set(day.completedActivities || []);
    totalCompleted += completedSet.size;
    totalActivities += day.totalActivities;

    for (const act of day.activities) {
      typeCount[act.type] = (typeCount[act.type] || 0) + 1;
      if (act.topic) topicsSeen.add(act.topic);
      // Estimate questions answered from completed MCQ activities
      if (act.type === 'mcq' && completedSet.size > 0) {
        totalQuestionsAnswered += 10; // rough estimate per MCQ block
      }
    }

    if (day.hadMockExam && daysSinceLastMock === null) {
      daysSinceLastMock = index; // 0 = today (shouldn't happen), 1 = yesterday, etc.
    }
  });

  // Identify underrepresented activity types
  // Expected frequency per week: MCQ ~daily, lessons ~4x, flashcards ~4x,
  // TBS ~2x, timed_quiz ~1-2x, mock_exam ~1x
  const expectedMinFreq: Partial<Record<DailyActivity['type'], number>> = {
    mcq: 4,
    lesson: 3,
    flashcards: 3,
    tbs: 1,
    timed_quiz: 1,
  };

  const underrepresentedTypes: DailyActivity['type'][] = [];
  for (const [type, minFreq] of Object.entries(expectedMinFreq)) {
    if ((typeCount[type] || 0) < minFreq) {
      underrepresentedTypes.push(type as DailyActivity['type']);
    }
  }

  // Topics the user has stats for but hasn't practiced this week
  const untouchedTopics = availableTopics.filter(t => !topicsSeen.has(t));

  // Completion rates for last 3 days
  const recentCompletionRates = sorted.slice(0, 3).map(day =>
    day.totalActivities > 0
      ? (day.completedActivities?.length || 0) / day.totalActivities
      : 0
  );

  const avgCompletionRate = totalActivities > 0 ? totalCompleted / totalActivities : 1;

  const yesterdayHadMock = sorted.length > 0 && sorted[0].hadMockExam;

  return {
    underrepresentedTypes,
    untouchedTopics,
    daysSinceLastMock,
    avgCompletionRate,
    yesterdayHadMock,
    recentCompletionRates,
    totalQuestionsAnswered,
  };
};

// ============================================================================
// Rest Day Detection
// ============================================================================

interface RestDayResult {
  isRestDay: boolean;
  reason: string;
  /** Multiplier applied to plan volume (e.g. 0.5 for a light day) */
  volumeMultiplier: number;
}

/**
 * Detect whether the user should have a rest or light day.
 *
 * Triggers:
 * 1. 7+ consecutive study days without a break (streak fatigue)
 * 2. Yesterday was a mock exam (recovery day)
 * 3. Completion rate < 30% for 2+ consecutive days (burnout signal)
 *
 * Does NOT trigger during examWeek or finalReview phases (crunch time).
 */
const detectRestDay = (
  currentStreak: number,
  weeklyGaps: WeeklyGaps | null,
  phase: LearningPhase
): RestDayResult => {
  // Never auto-rest during crunch time
  if (phase === 'examWeek' || phase === 'finalReview') {
    return { isRestDay: false, reason: '', volumeMultiplier: 1 };
  }

  // Trigger 1: Streak fatigue — 7+ consecutive study days
  if (currentStreak >= 7 && currentStreak % 7 === 0) {
    return {
      isRestDay: true,
      reason: `You've studied ${currentStreak} days in a row — great dedication! Today is a light review day to recharge.`,
      volumeMultiplier: 0.4,
    };
  }

  if (weeklyGaps) {
    // Trigger 2: Post-mock recovery
    if (weeklyGaps.yesterdayHadMock) {
      return {
        isRestDay: true,
        reason: 'Recovery day after yesterday\'s mock exam — light review to let concepts settle.',
        volumeMultiplier: 0.5,
      };
    }

    // Trigger 3: Low completion (burnout signal)
    const recentRates = weeklyGaps.recentCompletionRates;
    if (recentRates.length >= 2 && recentRates[0] < 0.3 && recentRates[1] < 0.3) {
      return {
        isRestDay: true,
        reason: 'You\'ve had a tough couple of days — here\'s a lighter plan to rebuild momentum.',
        volumeMultiplier: 0.5,
      };
    }
  }

  return { isRestDay: false, reason: '', volumeMultiplier: 1 };
};

/**
 * Generate a smart daily study plan
 */
export const generateDailyPlan = async (
  state: UserStudyState,
  courseId: CourseId = 'cpa'
): Promise<DailyPlan> => {
  const activities: DailyActivity[] = [];
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate intensity based on exam proximity
  const intensity = calculateIntensity(state.examDate);
  const fullTargetMinutes = getTargetMinutes(state.dailyGoal, intensity);
  
  // ── Study Day Preferences ──────────────────────────────────────────
  // If user has set preferred study days and today is NOT one of them,
  // generate a minimal "off-day" plan (just flashcard review + spaced rep).
  // Exception: exam within 7 days overrides off-day preferences.
  const todayDow = new Date().getDay(); // 0=Sun..6=Sat
  const daysToExam = state.examDate
    ? Math.ceil((new Date(state.examDate).getTime() - Date.now()) / 86400000)
    : null;
  const isOffDay = state.studyDayPreferences
    && state.studyDayPreferences.length > 0
    && state.studyDayPreferences.length < 7
    && !state.studyDayPreferences.includes(todayDow)
    && (daysToExam === null || daysToExam > 7); // override in final week
  
  if (isOffDay) {
    // Minimal off-day plan: just flashcard review to maintain streak
    const offDayActivities: DailyActivity[] = [];
    const offDayToday = new Date().toISOString().split('T')[0];
    
    if (state.flashcardsDue > 0) {
      offDayActivities.push({
        id: `flashcards-offday-${offDayToday}`,
        type: 'flashcards',
        title: 'Quick Flashcard Review',
        description: `${Math.min(state.flashcardsDue, 10)} cards — keep your streak alive`,
        estimatedMinutes: 5,
        points: Math.min(state.flashcardsDue, 10),
        priority: 'medium',
        reason: 'Off-day — just a quick review to maintain momentum',
        params: { section: state.section, mode: 'review', cardCount: Math.min(state.flashcardsDue, 10) },
      });
    }
    
    return {
      date: offDayToday,
      section: state.section,
      targetPoints: 0,
      estimatedMinutes: offDayActivities.reduce((s, a) => s + a.estimatedMinutes, 0),
      activities: offDayActivities,
      restDay: { isRestDay: true, reason: 'Scheduled off-day — enjoy your break! 🎉' },
      summary: {
        totalActivities: offDayActivities.length,
        lessonCount: 0, mcqCount: 0, tbsCount: 0, flashcardCount: offDayActivities.length,
        essayCount: 0, cbqCount: 0, caseStudyCount: 0, timedQuizCount: 0, mockExamCount: 0,
        weakAreaFocus: [],
      },
      generatedAt: new Date().toISOString(),
    };
  }
  
  // Adjust for work already done today — don't rebuild a full plan if user is halfway through
  const goalCompletion = state.dailyGoal > 0 ? Math.min(1, state.todayPoints / state.dailyGoal) : 0;
  const remainingFraction = Math.max(0.3, 1 - goalCompletion); // Always plan at least 30%
  const scaledMinutes = Math.round(fullTargetMinutes * remainingFraction);
  // Enforce a floor of 45 minutes so the plan always has room for 2-3 activities
  const MIN_PLAN_MINUTES = 45;
  const targetMinutes = Math.max(MIN_PLAN_MINUTES, scaledMinutes);
  let remainingMinutes = targetMinutes;
  
  // Shorthand for personalized duration lookups
  const pd = state.personalizedDurations;
  
  // Calculate max activities based on intensity and daily goal, scaled by remaining work
  const baseMaxActivities = Math.ceil(state.dailyGoal / 15); // ~3-4 for 50 goal, ~10 for 150
  const scaledMaxActivities = Math.round(baseMaxActivities * intensity * remainingFraction);
  const maxActivities = Math.max(3, Math.min(10, scaledMaxActivities)); // Minimum 3 activities
  
  logger.info('Daily plan generation params', {
    dailyGoal: state.dailyGoal,
    todayPoints: state.todayPoints,
    goalCompletion: Math.round(goalCompletion * 100) + '%',
    remainingFraction,
    fullTargetMinutes,
    targetMinutes,
    maxActivities,
    intensity,
    phase: 'pending',
    section: state.section,
    topicStatsCount: state.topicStats.length,
    enableCurriculumFilter: state.enableCurriculumFilter,
  });
  
  // Determine learning phase to modulate activity mix
  const lessons = await fetchLessonsBySection(state.section, courseId);
  const phaseInfo = determineLearningPhase(
    state.lessonProgress,
    lessons.length,
    state.examDate,
    state.topicStats,
  );
  const phase = phaseInfo.phase;
  const phaseBudget = PHASE_BUDGETS[phase];
  
  // ── Weekly Intelligence ─────────────────────────────────────────────
  // Analyze recent study history to balance across the week and detect rest needs
  const weeklyGaps = state.recentHistory && state.recentHistory.length > 0
    ? analyzeWeeklyGaps(
        state.recentHistory,
        state.topicStats.map(t => t.topic)
      )
    : null;

  // Rest day detection (streak fatigue, post-mock recovery, burnout signals)
  const restDay = detectRestDay(state.currentStreak, weeklyGaps, phase);
  if (restDay.isRestDay) {
    // Scale plan volume down for rest/light days
    remainingMinutes = Math.round(remainingMinutes * restDay.volumeMultiplier);
  }
  
  // ── Completion-Rate Feedback Loop ───────────────────────────────────
  // If the user consistently finishes <50% of their plan, the plan is too
  // ambitious. Scale it down so they experience success and stay motivated.
  // Conversely, if they crush >90% consistently, we can be slightly bolder.
  if (weeklyGaps && weeklyGaps.recentCompletionRates.length >= 3) {
    const avg = weeklyGaps.avgCompletionRate;
    if (avg < 0.35) {
      // Severely under-completing — cut plan by 35%
      remainingMinutes = Math.round(remainingMinutes * 0.65);
    } else if (avg < 0.5) {
      // Under-completing — cut plan by 20%
      remainingMinutes = Math.round(remainingMinutes * 0.8);
    } else if (avg > 0.9) {
      // Crushing it — stretch plan by 10%
      remainingMinutes = Math.round(remainingMinutes * 1.1);
    }
  }
  
  // Re-enforce minimum after all adjustments
  remainingMinutes = Math.max(MIN_PLAN_MINUTES, remainingMinutes);
  
  logger.info('Daily plan phase & budget', {
    phase,
    phaseReason: phaseInfo.reason,
    lessonsAvailable: lessons.length,
    isRestDay: restDay.isRestDay,
    remainingMinutesAfterAdjustments: remainingMinutes,
    filteredTopicStatsCount: state.topicStats.length,
    flashcardsDue: state.flashcardsDue,
    questionsDueCount: state.questionsDue?.length || 0,
  });
  
  // Track what we're adding for summary
  const weakAreaFocus: string[] = [];
  
  // NEW: Get covered topics for curriculum filtering
  let coveredTopics: Set<string> = new Set();
  let previewTopics: Set<string> = new Set();
  
  if (state.enableCurriculumFilter) {
    coveredTopics = await getCoveredTopics(
      state.lessonProgress, 
      state.section as ExamSection, 
      courseId
    );
    
    // Add preview topics if enabled (10% lookahead)
    if (state.enablePreviewMode) {
      previewTopics = await getPreviewTopics(
        state.lessonProgress,
        state.section as ExamSection,
        0.1, // 10% lookahead
        courseId
      );
    }
  }
  
  // Filter topic stats to only covered topics (if curriculum filter enabled)
  const filteredTopicStats = state.enableCurriculumFilter && coveredTopics.size > 0
    ? state.topicStats.filter(t => {
        const normalizedTopic = t.topic.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
        // Check if topic is covered or in preview
        for (const covered of coveredTopics) {
          const normalizedCovered = covered.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
          if (normalizedTopic === normalizedCovered ||
              normalizedTopic.includes(normalizedCovered) ||
              normalizedCovered.includes(normalizedTopic)) {
            return true;
          }
        }
        // Check preview topics too
        for (const preview of previewTopics) {
          const normalizedPreview = preview.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
          if (normalizedTopic === normalizedPreview ||
              normalizedTopic.includes(normalizedPreview) ||
              normalizedPreview.includes(normalizedTopic)) {
            return true;
          }
        }
        return false;
      })
    : state.topicStats;
  
  // 1. CRITICAL: Weak areas first (accuracy < 60%)
  // Phase budget limits how many weak-area blocks we add
  // Weekly-aware: prefer weak topics that haven't been practiced this week
  const untouchedSet = new Set(weeklyGaps?.untouchedTopics || []);
  const criticalWeakAreas = filteredTopicStats
    .filter(t => t.accuracy < 60 && t.totalQuestions >= 3)
    .sort((a, b) => {
      // Topics not practiced this week come first
      const aUntouched = untouchedSet.has(a.topic) ? 0 : 1;
      const bUntouched = untouchedSet.has(b.topic) ? 0 : 1;
      if (aUntouched !== bUntouched) return aUntouched - bUntouched;
      return a.accuracy - b.accuracy; // then by lowest accuracy
    })
    .slice(0, phaseBudget.maxWeakAreaBlocks);
  
  for (const weak of criticalWeakAreas) {
    if (remainingMinutes < 10) break;
    
    weakAreaFocus.push(weak.topic);
    activities.push({
      id: `weak-${weak.topic}-${today}`,
      type: 'mcq',
      title: `Strengthen: ${weak.topic}`,
      description: `Your accuracy is ${weak.accuracy}%. Let's improve it.`,
      estimatedMinutes: getDuration('mcq_15', 'mcq', pd),
      points: 15 * MCQ_AVG_POINTS, // Estimate
      priority: 'critical',
      reason: `Only ${weak.accuracy}% accuracy - this topic needs work`,
      params: {
        section: state.section,
        topic: weak.topic,
        questionCount: 15,
        mode: 'study',
      },
    });
    remainingMinutes -= getDuration('mcq_15', 'mcq', pd);
  }
  
  // 2. HIGH: Medium weak areas (60-70% accuracy)
  // Remaining budget after critical weak areas
  const remainingWeakBudget = Math.max(0, phaseBudget.maxWeakAreaBlocks - criticalWeakAreas.length);
  const mediumWeakAreas = remainingWeakBudget > 0
    ? filteredTopicStats
        .filter(t => t.accuracy >= 60 && t.accuracy < 70 && t.totalQuestions >= 3)
        .sort((a, b) => a.accuracy - b.accuracy)
        .slice(0, remainingWeakBudget)
    : [];
  
  for (const weak of mediumWeakAreas) {
    if (remainingMinutes < 10) break;
    
    weakAreaFocus.push(weak.topic);
    activities.push({
      id: `review-${weak.topic}-${today}`,
      type: 'mcq',
      title: `Review: ${weak.topic}`,
      description: `At ${weak.accuracy}% - close to mastery!`,
      estimatedMinutes: getDuration('mcq_10', 'mcq', pd),
      points: 10 * MCQ_AVG_POINTS,
      priority: 'high',
      reason: `${weak.accuracy}% accuracy - almost there, let's solidify`,
      params: {
        section: state.section,
        topic: weak.topic,
        questionCount: 10,
        mode: 'study',
      },
    });
    remainingMinutes -= getDuration('mcq_10', 'mcq', pd);
  }
  
  // 2b. HIGH: Fragile knowledge (decent accuracy but slow response times)
  // If a topic has 60-85% accuracy AND avg response time > 90 seconds,
  // the learner is "getting there" but thinking too hard — knowledge isn't automatic yet.
  const SLOW_RESPONSE_THRESHOLD_MS = 90_000; // 90 seconds = struggling
  const fragileTopicBudget = Math.max(0,
    phaseBudget.maxWeakAreaBlocks - criticalWeakAreas.length - mediumWeakAreas.length);
  if (fragileTopicBudget > 0) {
    const fragileTopics = filteredTopicStats
      .filter(t =>
        t.accuracy >= 60 && t.accuracy < 85 &&
        t.totalQuestions >= 5 &&
        t.avgResponseTimeMs != null &&
        t.avgResponseTimeMs > SLOW_RESPONSE_THRESHOLD_MS &&
        !weakAreaFocus.includes(t.topic) // not already targeted
      )
      .sort((a, b) => (b.avgResponseTimeMs ?? 0) - (a.avgResponseTimeMs ?? 0)) // slowest first
      .slice(0, fragileTopicBudget);

    for (const fragile of fragileTopics) {
      if (remainingMinutes < 10) break;
      const avgSec = Math.round((fragile.avgResponseTimeMs ?? 0) / 1000);
      weakAreaFocus.push(fragile.topic);
      activities.push({
        id: `fragile-${fragile.topic}-${today}`,
        type: 'mcq',
        title: `Speed Drill: ${fragile.topic}`,
        description: `${fragile.accuracy}% accuracy but avg ${avgSec}s per question — let's build fluency`,
        estimatedMinutes: getDuration('mcq_10', 'mcq', pd),
        points: 10 * MCQ_AVG_POINTS,
        priority: 'high',
        reason: `Accurate but slow (${avgSec}s avg) — practice builds automatic recall`,
        params: {
          section: state.section,
          topic: fragile.topic,
          questionCount: 10,
          mode: 'study',
        },
      });
      remainingMinutes -= getDuration('mcq_10', 'mcq', pd);
    }
  }
  
  // 3a. HIGH: Spaced Repetition (Questions Due)
  // This is critical for retention - catches items you are about to forget
  if (state.questionsDue && state.questionsDue.length >= 5 && remainingMinutes >= 15) {
      const dueCount = Math.min(state.questionsDue.length, 15);
      activities.push({
          id: `review-due-${today}`,
          type: 'mcq',
          title: 'Retention Review',
          description: `${state.questionsDue.length} questions due for spaced repetition`,
          estimatedMinutes: getDuration('mcq_15', 'mcq', pd),
          points: dueCount * MCQ_AVG_POINTS,
          priority: 'high',
          reason: 'Spaced repetition: Review these now to lock them in long-term memory',
          params: {
              section: state.section,
              questionCount: dueCount,
              mode: 'study', // Will trigger smart selection which prioritizes these due questions
          }
      });
      remainingMinutes -= getDuration('mcq_15', 'mcq', pd);
  }

  // 3. MEDIUM: Flashcard review if cards are due (priority review)
  // Note: We also add general flashcard practice in section 5d
  if (state.flashcardsDue > 5 && remainingMinutes >= 10) {
    const flashcardCount = Math.min(state.flashcardsDue, 20); // Cap at 20 cards per session
    activities.push({
      id: `flashcards-due-${today}`,
      type: 'flashcards',
      title: 'Urgent Flashcard Review',
      description: `${state.flashcardsDue} cards need review today`,
      estimatedMinutes: getDuration('flashcards', 'flashcards', pd),
      points: flashcardCount * POINT_VALUES.flashcard_review,
      priority: 'high', // Elevated to high when many cards due
      reason: 'Spaced repetition - review these before you forget them',
      params: {
        section: state.section,
        mode: 'review',
        cardCount: flashcardCount,
      },
    });
    remainingMinutes -= getDuration('flashcards', 'flashcards', pd);
  }
  
  // 4. MEDIUM: Lessons — phase budget controls how many and whether new ones are added
  // (lessons already fetched above for phase detection)
  let lessonsAdded = 0;
  const incompleteLesson = lessons.find(l => {
    const progress = state.lessonProgress[l.id] || 0;
    return progress > 0 && progress < 100;
  });
  
  const unstartedLesson = phaseBudget.allowNewLessons
    ? lessons.find(l => {
        const progress = state.lessonProgress[l.id] || 0;
        return progress === 0;
      })
    : undefined;
  
  // Always allow continuing incomplete lessons (even in exam week)
  if (incompleteLesson && remainingMinutes >= 15 && lessonsAdded < phaseBudget.maxLessons) {
    const progress = state.lessonProgress[incompleteLesson.id] || 0;
    activities.push({
      id: `lesson-${incompleteLesson.id}`,
      type: 'lesson',
      title: `Continue: ${incompleteLesson.title}`,
      description: `${progress}% complete - pick up where you left off`,
      estimatedMinutes: Math.round((incompleteLesson.duration || 30) * (1 - progress / 100)),
      points: POINT_VALUES.lesson_medium,
      priority: 'medium',
      reason: 'Finish what you started for better retention',
      params: {
        lessonId: incompleteLesson.id,
        section: state.section,
      },
    });
    remainingMinutes -= getDuration('lesson_medium', 'lesson', pd);
    lessonsAdded++;
  } else if (unstartedLesson && remainingMinutes >= 15 && lessonsAdded < phaseBudget.maxLessons) {
    activities.push({
      id: `lesson-${unstartedLesson.id}`,
      type: 'lesson',
      title: `Learn: ${unstartedLesson.title}`,
      description: 'New material to expand your knowledge',
      estimatedMinutes: unstartedLesson.duration || getDuration('lesson_medium', 'lesson', pd),
      points: POINT_VALUES.lesson_medium,
      priority: 'medium',
      reason: 'New content - keep progressing through the material',
      params: {
        lessonId: unstartedLesson.id,
        section: state.section,
      },
    });
    remainingMinutes -= getDuration('lesson_medium', 'lesson', pd);
    lessonsAdded++;
  }
  
  // In foundation phase, add a second lesson if time permits
  if (phase === 'foundation' && lessonsAdded < phaseBudget.maxLessons && remainingMinutes >= 20) {
    const nextLesson = lessons.find(l => {
      const progress = state.lessonProgress[l.id] || 0;
      return progress === 0 && !activities.some(a => a.id === `lesson-${l.id}`);
    });
    if (nextLesson) {
      activities.push({
        id: `lesson-${nextLesson.id}`,
        type: 'lesson',
        title: `Learn: ${nextLesson.title}`,
        description: 'Build your knowledge base',
        estimatedMinutes: nextLesson.duration || getDuration('lesson_medium', 'lesson', pd),
        points: POINT_VALUES.lesson_medium,
        priority: 'medium',
        reason: `Foundation phase: prioritizing content coverage (${phaseInfo.reason})`,
        params: {
          lessonId: nextLesson.id,
          section: state.section,
        },
      });
      remainingMinutes -= getDuration('lesson_medium', 'lesson', pd);
      lessonsAdded++;
    }
  }
  
  // 5. MEDIUM: TBS practice (critical - 50% of CPA exam!)\n  // Phase gate: simulations only in building/reinforcement/finalReview phases\n  // Skip TBS entirely for courses that don't have it (EA, CMA, etc.)
  const courseConfig = getCourse(courseId);
  const courseHasTBS = courseConfig?.hasTBS ?? false;
  
  const tbsNeeded = phaseBudget.includeSimulations && activities.filter(a => a.type === 'tbs').length === 0;
  const tbsUnderrepresented = weeklyGaps?.underrepresentedTypes.includes('tbs') ?? false;
  if (courseHasTBS && tbsNeeded && remainingMinutes >= 15) {
    const tbsTopics = getTBSTopicsForSection(state.section);
    let targetTBSTopic = tbsTopics[0];
    let reason = tbsUnderrepresented
      ? 'No TBS practice recently — this is 50% of your exam score!'
      : 'TBS = 50% of your exam score. Practice daily!';
    let tbsPriority: 'critical' | 'high' | 'medium' | 'low' = tbsUnderrepresented ? 'high' : 'medium';
    let tbsLocked = false;
    
    // NEW: Check curriculum unlock status for TBS
    if (state.enableCurriculumFilter) {
      const unlockedTBS = await getUnlockedTBSTypes(
        state.section as ExamSection,
        state.lessonProgress,
        courseId
      );
      
      // Filter to only unlocked TBS types
      const unlockedTypes = unlockedTBS.filter(t => t.isUnlocked).map(t => t.type);
      
      if (unlockedTypes.length === 0) {
        // No TBS unlocked yet - skip TBS, lessons will naturally unlock it
        tbsLocked = true;
      } else {
        // Filter tbsTopics to only unlocked ones
        const filteredTbsTopics = tbsTopics.filter(t => 
          unlockedTypes.some(u => u.toLowerCase() === t.toLowerCase())
        );
        if (filteredTbsTopics.length > 0) {
          // Only consider unlocked TBS topics for selection
          targetTBSTopic = filteredTbsTopics[0];
          reason = `Unlocked TBS: ${targetTBSTopic} - you've learned the prerequisites!`;
        }
      }
    }
    
    if (!tbsLocked) {
      // Intelligent selection using TBS history
      if (state.tbsStats && state.tbsStats.length > 0) {
         const sectionStats = state.tbsStats.filter(s => s.section === state.section);
         
         // Build a set of mastered TBS topics (approximate from IDs)
         const masteredTopicPatterns = sectionStats
             .filter(s => s.mastered)
             .map(s => s.tbsId.toLowerCase());
         
         // Find topics NOT yet practiced or not mastered
         const unpracticedTopics = tbsTopics.filter(topic => {
             const topicLower = topic.toLowerCase().replace(/\\s+/g, '-');
             return !masteredTopicPatterns.some(pattern => 
                 pattern.includes(topicLower) || topicLower.includes(pattern.split('-')[0])
             );
         });
         
         if (unpracticedTopics.length > 0) {
             // Prioritize topics never attempted
             targetTBSTopic = unpracticedTopics[0];
             reason = `New TBS topic: You haven't practiced ${targetTBSTopic} yet`;
             tbsPriority = 'high'; // Elevate priority for coverage gaps
         } else {
             // All topics practiced - focus on lowest scoring
             const weakestStats = sectionStats
                 .filter(s => !s.mastered)
                 .sort((a, b) => (a.avgScore || 0) - (b.avgScore || 0));
             
             if (weakestStats.length > 0) {
                 // Try to match ID pattern back to topic name
                 const weakestId = weakestStats[0].tbsId.toLowerCase();
                 const matchedTopic = tbsTopics.find(t => 
                     weakestId.includes(t.toLowerCase().replace(/\\s+/g, '-')) ||
                     t.toLowerCase().includes(weakestId.split('-')[0])
                 );
                 targetTBSTopic = matchedTopic || tbsTopics[0];
                 reason = `Weak TBS: ${Math.round(weakestStats[0].avgScore)}% avg score - improve this`;
                 tbsPriority = 'high';
             }
         }
      } else {
          // No history - rotate through topics by day
          const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
          targetTBSTopic = tbsTopics[dayOfYear % tbsTopics.length];
          reason = `Introduction: ${targetTBSTopic} simulation practice`;
      }

      activities.push({
        id: `tbs-${today}`,
        type: 'tbs',
        title: 'Task-Based Simulation',
        description: `Practice: ${targetTBSTopic}`,
        estimatedMinutes: getDuration('tbs', 'tbs', pd),
        points: POINT_VALUES.tbs_basic,
        priority: tbsPriority,
        reason,
        params: {
          section: state.section,
          topic: targetTBSTopic,
        },
      });
      remainingMinutes -= getDuration('tbs', 'tbs', pd);
    }
    // NOTE: When TBS is locked, we simply don't add it to the plan.
    // The lesson recommendations (section 4) already handle suggesting
    // the next lesson to complete, which will naturally unlock TBS.
    // This prevents showing "Start" buttons on activities users can't access.
  }
  
  // 5b. CMA ESSAY PRACTICE - CMA Part 1 & 2 each have 2 essay questions (25% of score)
  // NOTE: Essays are available until Aug 2026. Starting Sept 2026, CBQs replace essays.
  // Phase gate: only in phases that include simulations
  if (phaseBudget.includeSimulations && courseId === 'cma' && remainingMinutes >= 20) {
    const essayTopics = getEssayTopicsForSection(state.section);
    if (essayTopics.length > 0) {
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const targetTopic = essayTopics[dayOfYear % essayTopics.length];
      
      activities.push({
        id: `essay-${today}`,
        type: 'essay',
        title: 'Essay Practice',
        description: `Topic: ${targetTopic}`,
        estimatedMinutes: getDuration('essay', 'essay', pd),
        points: POINT_VALUES.tbs_basic, // Similar value to TBS
        priority: 'medium',
        reason: 'Essays are 25% of your CMA score - practice writing clear, structured responses',
        params: {
          section: state.section,
          topic: targetTopic,
        },
      });
      remainingMinutes -= getDuration('essay', 'essay', pd);
    }
  }
  
  // 5b-2. CMA CBQ PRACTICE - Case-Based Questions replace essays starting Sept 2026
  // Phase gate: only in phases that include simulations
  if (phaseBudget.includeSimulations && courseId === 'cma' && remainingMinutes >= 15) {
    const now = new Date();
    const cbqTransitionStart = new Date('2026-05-01');
    const cbqMandatoryDate = new Date('2026-09-01');
    
    // Show CBQ practice if:
    // 1. We're in the transition window (May-Aug 2026) - user can choose format
    // 2. Or after Sept 2026 when CBQ is mandatory
    // For now, always show CBQ practice to help users prepare
    const shouldShowCBQ = true; // Always show to prepare users for the transition
    
    if (shouldShowCBQ) {
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const cbqTopics = getCBQTopicsForSection(state.section);
      
      if (cbqTopics.length > 0) {
        const targetTopic = cbqTopics[dayOfYear % cbqTopics.length];
        
        // Determine priority based on timeline
        let priority: 'critical' | 'high' | 'medium' = 'medium';
        let reason = 'CBQs replace essays starting Sept 2026 - start practicing the new format';
        
        if (now >= cbqMandatoryDate) {
          priority = 'high';
          reason = 'CBQs are now the mandatory format - master numerical entry, drag-and-drop, and multi-select questions';
        } else if (now >= cbqTransitionStart) {
          priority = 'high';
          reason = 'You can choose CBQ format for your exam - practice before making your choice';
        }
        
        activities.push({
          id: `cbq-${today}`,
          type: 'cbq',
          title: 'CBQ Practice',
          description: `Topic: ${targetTopic}`,
          estimatedMinutes: getDuration('cbq', 'cbq', pd),
          points: POINT_VALUES.tbs_basic,
          priority,
          reason,
          params: {
            section: state.section,
            topic: targetTopic,
          },
        });
        remainingMinutes -= getDuration('cbq', 'cbq', pd);
      }
    }
  }
  
  // 5c. CFP CASE STUDY PRACTICE - CFP exam includes case-based item sets\n  // Phase gate: only in phases that include simulations
  if (phaseBudget.includeSimulations && courseId === 'cfp' && remainingMinutes >= 20) {
    const caseStudyDomains = getCFPCaseStudyDomains(state.section);
    if (caseStudyDomains.length > 0) {
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const targetDomain = caseStudyDomains[dayOfYear % caseStudyDomains.length];
      
      activities.push({
        id: `case-study-${today}`,
        type: 'case_study',
        title: 'Case Study Practice',
        description: `Domain: ${targetDomain}`,
        estimatedMinutes: getDuration('case_study', 'case_study', pd),
        points: POINT_VALUES.tbs_basic,
        priority: 'medium',
        reason: 'CFP exam tests application through multi-question case scenarios',
        params: {
          section: state.section,
          topic: targetDomain,
        },
      });
      remainingMinutes -= getDuration('case_study', 'case_study', pd);
    }
  }
  
  // 5d. FLASHCARD PRACTICE - Always include flashcards for variety
  // Weekly-aware: boost priority when flashcards haven't appeared recently
  const flashcardActivityExists = activities.some(a => a.type === 'flashcards');
  const flashcardsUnderrepresented = weeklyGaps?.underrepresentedTypes.includes('flashcards') ?? false;
  if (!flashcardActivityExists && remainingMinutes >= 10) {
    const flashcardsDueCount = state.flashcardsDue || 0;
    const isReview = flashcardsDueCount > 0;
    const cardCount = isReview ? Math.min(flashcardsDueCount, 20) : 15; // 20 review or 15 new
    
    // Boost priority if flashcards haven't been seen in a while
    const basePriority = isReview ? phaseBudget.flashcardPriority : 'low';
    const flashcardPriority = flashcardsUnderrepresented && basePriority === 'low'
      ? 'medium' as const
      : basePriority;
    
    activities.push({
      id: `flashcards-${today}`,
      type: 'flashcards',
      title: isReview ? 'Flashcard Review' : 'Learn Flashcards',
      description: isReview 
        ? `${flashcardsDueCount} cards due for review`
        : 'Build retention with spaced repetition',
      estimatedMinutes: isReview ? getDuration('flashcards', 'flashcards', pd) : getDuration('flashcards_new', 'flashcards', pd),
      points: isReview 
        ? Math.min(flashcardsDueCount, 20) * POINT_VALUES.flashcard_review
        : 10 * POINT_VALUES.flashcard_review,
      priority: flashcardPriority,
      reason: flashcardsUnderrepresented
        ? 'No flashcard practice recently — keep those key concepts fresh'
        : isReview 
          ? 'Spaced repetition - review before you forget'
          : 'Flashcards boost long-term retention for key concepts',
      params: {
        section: state.section,
        mode: isReview ? 'review' : 'learn',
        cardCount,
      },
    });
    remainingMinutes -= isReview ? getDuration('flashcards', 'flashcards', pd) : getDuration('flashcards_new', 'flashcards', pd);
  }
  
  // 5e. TIMED QUIZ - Test under pressure periodically
  // Phase gate: only in reinforcement/finalReview phases
  // Weekly-aware: if no timed quiz in past 4+ days, include one regardless of day-of-week
  const dayOfWeek = new Date().getDay(); // 0-6
  const timedQuizGap = weeklyGaps
    ? weeklyGaps.underrepresentedTypes.includes('timed_quiz')
    : false;
  const shouldIncludeTimedQuiz = phaseBudget.includeTimedQuiz && (
    dayOfWeek === 2 || dayOfWeek === 5 || timedQuizGap
  );
  
  if (shouldIncludeTimedQuiz && remainingMinutes >= 15 && !restDay.isRestDay) {
    activities.push({
      id: `timed-quiz-${today}`,
      type: 'timed_quiz',
      title: 'Timed Quiz',
      description: '10 questions in 12 minutes - test under pressure',
      estimatedMinutes: getDuration('timed_quiz', 'timed_quiz', pd),
      points: 10 * MCQ_AVG_POINTS + 5, // Bonus for timed mode
      priority: timedQuizGap ? 'high' : 'medium',
      reason: timedQuizGap
        ? 'No timed practice recently — keep those time-management skills sharp'
        : 'Practice time management for exam conditions',
      params: {
        section: state.section,
        questionCount: 10,
        timeLimit: 12, // 12 minutes
        mode: 'timed',
      },
    });
    remainingMinutes -= getDuration('timed_quiz', 'timed_quiz', pd);
  }
  
  // 5f. MOCK EXAM — Milestone-based (replaces day-of-week logic)
  // Phase gate: only in reinforcement/finalReview phases
  const daysUntilExam = state.examDate 
    ? Math.ceil((new Date(state.examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  
  // Readiness milestones for mock exams:
  // 1. Has answered 100+ total questions  (first milestone)
  // 2. Average accuracy across practiced topics >= 60%  (basic readiness)
  // 3. At least 5 days since last mock  (spacing)
  // 4. Not on a rest day
  // In final-week crunch, override spacing to every-other-day
  const totalQsFromTopics = state.topicStats.reduce((sum, t) => sum + t.totalQuestions, 0);
  const avgAccuracy = state.topicStats.length > 0
    ? state.topicStats.reduce((sum, t) => sum + t.accuracy, 0) / state.topicStats.length
    : 0;
  const daysSinceMock = weeklyGaps?.daysSinceLastMock ?? null;
  const mockSpacingOk = daysSinceMock === null || daysSinceMock >= 5; // null = never taken → ok
  const finalWeekSpacing = daysUntilExam !== null && daysUntilExam <= 7 && daysUntilExam > 2
    && (daysSinceMock === null || daysSinceMock >= 2); // every-other-day in final week
  
  const shouldRecommendMock = phaseBudget.includeMockExam
    && !restDay.isRestDay
    && totalQsFromTopics >= 100
    && avgAccuracy >= 60
    && (
      finalWeekSpacing     // final week: every-other-day
      || mockSpacingOk     // normal: 5+ day gap
    )
    && (daysUntilExam === null || daysUntilExam > 2); // no mocks in final 2 days
  
  if (shouldRecommendMock && remainingMinutes >= 30) {
    const isFirstMock = daysSinceMock === null;
    activities.push({
      id: `mock-exam-mini-${today}`,
      type: 'mock_exam',
      title: isFirstMock ? '🎯 First Mock Exam!' : 'Mini Mock Exam',
      description: '25 questions simulating exam conditions',
      estimatedMinutes: getDuration('mock_exam_mini', 'mock_exam', pd),
      points: 25 * MCQ_AVG_POINTS + 20, // Good bonus for completing mock
      priority: daysUntilExam !== null && daysUntilExam <= 14 ? 'high' : 'medium',
      reason: isFirstMock
        ? `You've answered ${totalQsFromTopics} questions with ${Math.round(avgAccuracy)}% accuracy — time for your first mock!`
        : daysUntilExam !== null && daysUntilExam <= 7
          ? `${daysUntilExam} days until exam — simulate test conditions`
          : `${daysSinceMock} days since your last mock — time to benchmark again`,
      params: {
        section: state.section,
        questionCount: 25,
        examType: 'mini',
        mode: 'exam',
      },
    });
    remainingMinutes -= getDuration('mock_exam_mini', 'mock_exam', pd);
  }
  
  // 6. LOW: General practice if time remains
  if (remainingMinutes >= 10) {
    activities.push({
      id: `practice-mixed-${today}`,
      type: 'mcq',
      title: 'Mixed Practice',
      description: 'Random questions across all topics',
      estimatedMinutes: getDuration('mcq_10', 'mcq', pd),
      points: 10 * MCQ_AVG_POINTS,
      priority: 'low',
      reason: 'Variety helps build connections between topics',
      params: {
        section: state.section,
        questionCount: 10,
        mode: 'study',
      },
    });
    remainingMinutes -= getDuration('mcq_10', 'mcq', pd);
  }
  
  // 7. FILL REMAINING TIME for intensive/full-time students
  // Only add more if we haven't hit max activities AND have significant time remaining
  // Respect phase lesson limits
  let fillRound = 1;
  while (remainingMinutes >= 25 && activities.length < maxActivities) {
    // Add additional lesson if available and phase allows
    const nextLesson = (phaseBudget.allowNewLessons && lessonsAdded < phaseBudget.maxLessons)
      ? lessons.find(l => {
          const progress = state.lessonProgress[l.id] || 0;
          return progress === 0 && !activities.some(a => a.id === `lesson-${l.id}`);
        })
      : undefined;
    
    if (nextLesson && remainingMinutes >= 25 && activities.length < maxActivities) {
      activities.push({
        id: `lesson-${nextLesson.id}`,
        type: 'lesson',
        title: `Learn: ${nextLesson.title}`,
        description: 'Keep building knowledge',
        estimatedMinutes: nextLesson.duration || getDuration('lesson_medium', 'lesson', pd),
        points: POINT_VALUES.lesson_medium,
        priority: 'low',
        reason: 'Extra lesson to accelerate your progress',
        params: {
          lessonId: nextLesson.id,
          section: state.section,
        },
      });
      remainingMinutes -= getDuration('lesson_medium', 'lesson', pd);
      lessonsAdded++;
      continue;
    }
    
    // Add more practice questions
    if (remainingMinutes >= 15 && activities.length < maxActivities) {
      activities.push({
        id: `practice-extra-${fillRound}-${today}`,
        type: 'mcq',
        title: 'Extra Practice',
        description: 'Additional questions for mastery',
        estimatedMinutes: getDuration('mcq_15', 'mcq', pd),
        points: 15 * MCQ_AVG_POINTS,
        priority: 'low',
        reason: 'More practice builds confidence and retention',
        params: {
          section: state.section,
          questionCount: 15,
          mode: 'study',
        },
      });
      remainingMinutes -= getDuration('mcq_15', 'mcq', pd);
      fillRound++;
      continue;
    }
    
    break; // Safety break
  }
  
  // Apply micro-feedback: deprioritize disliked activity types
  // If the user has consistently marked a type as unhelpful, lower its priority
  // so it appears later and is more likely to be cut by the maxActivities cap.
  const dislikedSet = new Set(state.activityFeedback?.dislikedTypes ?? []);
  if (dislikedSet.size > 0) {
    for (const act of activities) {
      if (dislikedSet.has(act.type) && act.priority !== 'critical') {
        // Demote one level — high→medium, medium→low. Critical never demoted.
        if (act.priority === 'high') act.priority = 'medium';
        else if (act.priority === 'medium') act.priority = 'low';
      }
    }
  }
  
  // Sort by cognitive load: hard tasks first (when energy is highest), light tasks last
  // Within the same cognitive tier, sort by priority.
  // Tier 1 (high cognitive load): weak-area MCQs, TBS, essays, CBQs, timed quizzes, mock exams
  // Tier 2 (medium cognitive load): lessons, case studies, spaced repetition review
  // Tier 3 (low cognitive load): flashcards, mixed practice
  const cognitiveLoad: Record<DailyActivity['type'], number> = {
    mcq: 1,           // MCQ blocks are often weak-area drills — cognitively demanding
    tbs: 1,
    essay: 1,
    cbq: 1,
    timed_quiz: 1,
    mock_exam: 1,
    lesson: 2,
    case_study: 2,
    review: 2,
    flashcards: 3,
  };
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  
  activities.sort((a, b) => {
    // Low-priority MCQs (mixed practice) should be tier 3, not tier 1
    const aLoad = a.priority === 'low' ? 3 : (cognitiveLoad[a.type] ?? 2);
    const bLoad = b.priority === 'low' ? 3 : (cognitiveLoad[b.type] ?? 2);
    if (aLoad !== bLoad) return aLoad - bLoad;
    // Within same cognitive tier, sort by priority
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  
  // ── Minimum Activity Guarantee ──────────────────────────────────────
  // If the plan has fewer than 3 activities after all generation logic,
  // add lightweight guaranteed activities so users always get a meaningful plan.
  const MIN_ACTIVITIES = 3;
  if (activities.length < MIN_ACTIVITIES) {
    logger.info(`Plan has only ${activities.length} activities — adding guaranteed activities to reach ${MIN_ACTIVITIES}`);
    
    // Add flashcards if missing
    if (!activities.some(a => a.type === 'flashcards')) {
      activities.push({
        id: `flashcards-guaranteed-${today}`,
        type: 'flashcards',
        title: state.flashcardsDue > 0 ? 'Flashcard Review' : 'Learn Flashcards',
        description: state.flashcardsDue > 0
          ? `${state.flashcardsDue} cards due for review`
          : 'Build retention with spaced repetition',
        estimatedMinutes: 10,
        points: 10 * POINT_VALUES.flashcard_review,
        priority: 'medium',
        reason: 'Quick flashcard practice to boost retention',
        params: {
          section: state.section,
          mode: state.flashcardsDue > 0 ? 'review' : 'learn',
          cardCount: state.flashcardsDue > 0 ? Math.min(state.flashcardsDue, 15) : 10,
        },
      });
    }
    
    // Add mixed practice MCQ if still under minimum
    if (activities.length < MIN_ACTIVITIES && !activities.some(a => a.id?.startsWith('practice-mixed'))) {
      activities.push({
        id: `practice-mixed-${today}`,
        type: 'mcq',
        title: 'Mixed Practice',
        description: 'Random questions across all topics',
        estimatedMinutes: 12,
        points: 10 * MCQ_AVG_POINTS,
        priority: 'low',
        reason: 'Variety helps build connections between topics',
        params: {
          section: state.section,
          questionCount: 10,
          mode: 'study',
        },
      });
    }
    
    // If STILL under minimum (e.g. both already existed), add a lesson or another MCQ
    if (activities.length < MIN_ACTIVITIES) {
      const availableLesson = lessons.find(l => {
        const progress = state.lessonProgress[l.id] || 0;
        return progress < 100 && !activities.some(a => a.id === `lesson-${l.id}`);
      });
      if (availableLesson) {
        activities.push({
          id: `lesson-${availableLesson.id}`,
          type: 'lesson',
          title: `Learn: ${availableLesson.title}`,
          description: 'Continue building your knowledge',
          estimatedMinutes: availableLesson.duration || 25,
          points: POINT_VALUES.lesson_medium,
          priority: 'medium',
          reason: 'Keep progressing through the material',
          params: {
            lessonId: availableLesson.id,
            section: state.section,
          },
        });
      } else {
        activities.push({
          id: `practice-extra-guaranteed-${today}`,
          type: 'mcq',
          title: 'Quick Practice',
          description: '5 questions to stay sharp',
          estimatedMinutes: 8,
          points: 5 * MCQ_AVG_POINTS,
          priority: 'low',
          reason: 'A few questions to keep your skills fresh',
          params: {
            section: state.section,
            questionCount: 5,
            mode: 'study',
          },
        });
      }
    }
  }
  
  logger.info('Daily plan generated', {
    totalActivities: activities.length,
    types: activities.map(a => a.type),
    phase,
    maxActivities,
    remainingMinutesAfter: remainingMinutes,
  });
  
  // Enforce max activities cap (keep highest priority ones)
  const cappedActivities = activities.slice(0, maxActivities);
  
  // Calculate summary
  const summary = {
    totalActivities: cappedActivities.length,
    lessonCount: cappedActivities.filter(a => a.type === 'lesson').length,
    mcqCount: cappedActivities.filter(a => a.type === 'mcq').reduce((sum, a) => sum + (a.params.questionCount || 0), 0),
    tbsCount: cappedActivities.filter(a => a.type === 'tbs').length,
    flashcardCount: cappedActivities.filter(a => a.type === 'flashcards').length,
    essayCount: cappedActivities.filter(a => a.type === 'essay').length,
    cbqCount: cappedActivities.filter(a => a.type === 'cbq').length,
    caseStudyCount: cappedActivities.filter(a => a.type === 'case_study').length,
    timedQuizCount: cappedActivities.filter(a => a.type === 'timed_quiz').length,
    mockExamCount: cappedActivities.filter(a => a.type === 'mock_exam').length,
    weakAreaFocus: [...new Set(weakAreaFocus)],
  };
  
  return {
    date: today,
    section: state.section,
    targetPoints: state.dailyGoal,
    estimatedMinutes: cappedActivities.reduce((sum, a) => sum + a.estimatedMinutes, 0),
    activities: cappedActivities,
    learningPhase: {
      phase,
      reason: phaseInfo.reason,
      description: phaseBudget.description,
    },
    ...(restDay.isRestDay ? { restDay: { isRestDay: true, reason: restDay.reason } } : {}),
    summary,
    generatedAt: new Date().toISOString(),
  };
};

/**
 * Calculate study intensity based on exam date proximity
 * 
 * Key insight: Study intensity should follow a gentle ramp-up curve:
 * - Very far (6+ months): Light load (0.6x) - build habits, avoid burnout
 * - Far (3-6 months): Moderate-light (0.75x) - steady progress
 * - Medium (1-3 months): Normal (1.0x) - consistent daily work
 * - Close (2-4 weeks): Elevated (1.2x) - focused push
 * - Final week: Intense (1.4x) - maximum effort
 * 
 * This prevents overwhelming users early in their journey while ensuring
 * adequate preparation as the exam approaches.
 */
const calculateIntensity = (examDate?: string): number => {
  if (!examDate) return 1.0; // Default intensity
  
  const daysUntilExam = Math.ceil(
    (new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  
  // Final week push
  if (daysUntilExam <= 7) return 1.4;
  // Two weeks out
  if (daysUntilExam <= 14) return 1.25;
  // One month out
  if (daysUntilExam <= 30) return 1.1;
  // 1-3 months - normal pace
  if (daysUntilExam <= 90) return 1.0;
  // 3-6 months - moderate-light
  if (daysUntilExam <= 180) return 0.75;
  // 6+ months - light start (prevent burnout, build habits)
  return 0.6;
};

/**
 * Get target study minutes based on daily goal and intensity
 */
const getTargetMinutes = (dailyGoal: number, intensity: number): number => {
  // Scale minutes based on daily goal to match preset descriptions:
  // Light (25 pts) = ~45 mins, Moderate (50 pts) = ~2 hrs, Intensive (80 pts) = ~3 hrs, Full-Time (150 pts) = ~5 hrs
  const baseMinutes = dailyGoal * 2;
  return Math.round(baseMinutes * intensity);
};

/**
 * Get TBS topics for a section
 */
const getTBSTopicsForSection = (section: string): string[] => {
  const tbsTopics: Record<string, string[]> = {
    FAR: ['Journal Entries', 'Bank Reconciliation', 'Depreciation', 'Lease Classification', 'Financial Statements'],
    AUD: ['Audit Sampling', 'Risk Assessment', 'Internal Control', 'Substantive Procedures', 'Audit Report'],
    REG: ['Tax Return', 'Basis Calculation', 'Entity Selection', 'Tax Credits', 'Depreciation'],
    BAR: ['Cost Accounting', 'Variance Analysis', 'Data Analytics', 'Budgeting', 'Performance Metrics'],
    ISC: ['IT Controls', 'System Security', 'Data Management', 'SOC Reports', 'Cybersecurity'],
    TCP: ['Tax Planning', 'Entity Restructuring', 'Compensation Planning', 'Retirement Planning', 'Estate Planning'],
  };
  
  return tbsTopics[section] || tbsTopics.FAR;
};

/**
 * Get Essay topics for CMA sections
 * CMA Part 1 & 2 each have 2 essay questions worth 25% of the score
 */
const getEssayTopicsForSection = (section: string): string[] => {
  const essayTopics: Record<string, string[]> = {
    CMA1: [
      'Budget Variance Analysis',
      'Cost-Volume-Profit Analysis',
      'Transfer Pricing Decisions',
      'Capital Budgeting Analysis',
      'Performance Measurement',
      'Financial Statement Analysis',
    ],
    CMA2: [
      'Ethical Dilemma Resolution',
      'Investment Decision Analysis',
      'Risk Management Strategy',
      'Working Capital Management',
      'Corporate Governance',
      'Strategic Planning',
    ],
  };
  
  return essayTopics[section] || essayTopics.CMA1;
};

/**
 * Get CBQ (Case-Based Question) topics for CMA sections
 * CBQs replace essays starting Sept 2026 (25% of score)
 * Question types: numerical_entry, drag_and_drop, multiple_select, dropdown
 */
const getCBQTopicsForSection = (section: string): string[] => {
  const cbqTopics: Record<string, string[]> = {
    CMA1: [
      'Manufacturing Variance Analysis',
      'Flexible Budgeting',
      'Cost Allocation Decisions',
      'Internal Control Assessment',
      'Cost-Volume-Profit Scenarios',
      'Operating Budget Preparation',
    ],
    CMA2: [
      'Capital Investment Analysis',
      'Financial Ratio Assessment',
      'Ethical Decision Making',
      'Risk Mitigation Strategies',
      'Working Capital Optimization',
      'Performance Metrics Evaluation',
    ],
  };
  
  return cbqTopics[section] || cbqTopics.CMA1;
};

/**
 * Get CFP Case Study domains
 * CFP exam uses case-based item sets across all 8 domains
 */
const getCFPCaseStudyDomains = (section: string): string[] => {
  const caseStudyDomains: Record<string, string[]> = {
    'CFP-GEN': ['Comprehensive Financial Plan', 'Client Data Analysis', 'Goal Prioritization'],
    'CFP-PCR': ['Fiduciary Duty Scenarios', 'Ethics Case Studies', 'Client Disclosure'],
    'CFP-RISK': ['Insurance Needs Analysis', 'Risk Assessment Case', 'Disability Planning'],
    'CFP-INV': ['Portfolio Construction', 'Asset Allocation Case', 'Investment Selection'],
    'CFP-TAX': ['Tax Planning Strategies', 'Multi-Year Tax Case', 'Entity Selection'],
    'CFP-RET': ['Retirement Needs Analysis', 'Social Security Optimization', 'Distribution Strategy'],
    'CFP-EST': ['Estate Plan Review', 'Trust Selection Case', 'Gift Tax Planning'],
    'CFP-PSY': ['Client Communication', 'Behavioral Coaching', 'Family Dynamics'],
  };
  
  // Return topics for the specific domain, or general topics if not found
  return caseStudyDomains[section] || caseStudyDomains['CFP-GEN'];
};

/**
 * Get adaptive questions - prioritizes weak areas and spaced repetition
 */
export const getAdaptiveQuestionTopics = (
  topicStats: TopicStats[],
  targetCount: number = 15
): { topic: string; count: number; reason: string }[] => {
  const result: { topic: string; count: number; reason: string }[] = [];
  let remaining = targetCount;
  
  // 50% from weak areas (< 70% accuracy)
  const weakTopics = topicStats
    .filter(t => t.accuracy < 70 && t.totalQuestions >= 3)
    .sort((a, b) => a.accuracy - b.accuracy);
  
  const weakCount = Math.ceil(targetCount * 0.5);
  for (const topic of weakTopics) {
    if (remaining <= 0) break;
    const count = Math.min(5, remaining, weakCount);
    result.push({
      topic: topic.topic,
      count,
      reason: `Weak area: ${topic.accuracy}% accuracy`,
    });
    remaining -= count;
  }
  
  // 30% from topics not practiced recently
  const staleTopics = topicStats
    .filter(t => {
      if (!t.lastPracticed) return true;
      const daysSince = Math.ceil(
        (Date.now() - new Date(t.lastPracticed).getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysSince > 7;
    })
    .sort((a, b) => {
      const aDate = a.lastPracticed ? new Date(a.lastPracticed).getTime() : 0;
      const bDate = b.lastPracticed ? new Date(b.lastPracticed).getTime() : 0;
      return aDate - bDate;
    });
  
  const staleCount = Math.ceil(targetCount * 0.3);
  for (const topic of staleTopics) {
    if (remaining <= 0) break;
    if (result.find(r => r.topic === topic.topic)) continue;
    const count = Math.min(3, remaining, staleCount);
    result.push({
      topic: topic.topic,
      count,
      reason: 'Not practiced recently - prevent forgetting',
    });
    remaining -= count;
  }
  
  // 20% random for variety
  if (remaining > 0) {
    result.push({
      topic: 'mixed',
      count: remaining,
      reason: 'Variety - build connections between topics',
    });
  }
  
  return result;
};

/**
 * Analyze what the user should focus on next
 */
export const analyzeNextFocus = (
  topicStats: TopicStats[],
  lessonProgress: Record<string, number>,
  totalLessons: number
): {
  primaryFocus: string;
  secondaryFocus: string;
  readinessGaps: string[];
  strengths: string[];
} => {
  // Find weakest areas
  const weakAreas = topicStats
    .filter(t => t.accuracy < 70 && t.totalQuestions >= 5)
    .sort((a, b) => a.accuracy - b.accuracy);
  
  // Find strengths
  const strengths = topicStats
    .filter(t => t.accuracy >= 80 && t.totalQuestions >= 5)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 3)
    .map(t => t.topic);
  
  // Calculate lesson completion
  const completedLessons = Object.values(lessonProgress).filter(p => p >= 100).length;
  const lessonCompletion = totalLessons > 0 ? completedLessons / totalLessons : 0;
  
  let primaryFocus = 'Practice MCQs';
  let secondaryFocus = 'Continue lessons';
  
  if (lessonCompletion < 0.5) {
    primaryFocus = 'Complete more lessons';
    secondaryFocus = weakAreas[0]?.topic ? `Practice ${weakAreas[0].topic}` : 'Practice MCQs';
  } else if (weakAreas.length > 0) {
    primaryFocus = `Focus on ${weakAreas[0].topic}`;
    secondaryFocus = weakAreas[1]?.topic ? `Then ${weakAreas[1].topic}` : 'TBS Practice';
  }
  
  return {
    primaryFocus,
    secondaryFocus,
    readinessGaps: weakAreas.slice(0, 5).map(w => `${w.topic} (${w.accuracy}%)`),
    strengths,
  };
};

export default {
  generateDailyPlan,
  getAdaptiveQuestionTopics,
  analyzeNextFocus,
};
