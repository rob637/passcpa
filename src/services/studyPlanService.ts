/**
 * Study Plan Service
 * 
 * Generates and manages personalized study plans.
 * This is the core engine that creates roadmaps based on user inputs.
 */

import { 
  differenceInDays, 
  addDays, 
  format, 
  isWithinInterval,
} from 'date-fns';
import type { CourseId } from '../types/course';
import type {
  StudyPlan,
  StudyPlanSetupInput,
  StudyPlanWeek,
  StudyPlanMilestone,
  RealityCheck,
  RealityCheckAction,
  StudyPhase,
  PlanHealth,
  StudyPlanAlert,
  StudyPlanSummary,
  TodaysPlan,
} from '../types/studyPlan';
import { SECTION_STUDY_HOURS, EXPERIENCE_MULTIPLIERS } from '../types/studyPlan';
import { db, auth } from '../config/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';
import logger from '../utils/logger';
import { getSectionContent, calculateSectionStudyHours, resolveStudySection } from './contentRegistry';

// Re-export types for convenience
export type { StudyPlan, StudyPlanSummary, TodaysPlan };

/**
 * Validation result for study plan inputs
 */
export interface PlanValidation {
  isValid: boolean;              // No blocking errors
  canProceedWithAck: boolean;    // Can proceed if user acknowledges warnings
  errors: string[];              // Blocking errors (cannot create plan)
  warnings: string[];            // Non-blocking warnings (require acknowledgment)
}

/**
 * Validate study plan inputs before creation
 * Returns errors that block creation and warnings that require acknowledgment
 */
export function validatePlanInput(input: StudyPlanSetupInput): PlanValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const startDate = input.startDate || new Date();
  const daysUntilExam = differenceInDays(input.examDate, startDate);
  
  // ERRORS - Block plan creation
  if (daysUntilExam < 1) {
    errors.push('Exam date must be in the future.');
  } else if (daysUntilExam < 3) {
    errors.push('Exam must be at least 3 days away to create a study plan.');
  }
  
  if (input.hoursPerDay > 10) {
    errors.push('Daily study time cannot exceed 10 hours.');
  }
  
  if (input.hoursPerDay < 0.5) {
    errors.push('Daily study time must be at least 30 minutes.');
  }
  
  if (input.studyDaysPerWeek < 1 || input.studyDaysPerWeek > 7) {
    errors.push('Study days per week must be between 1 and 7.');
  }
  
  // WARNINGS - Require acknowledgment
  // Use resolveStudySection to normalize 'ALL' to the proper section key (e.g., 'CFP', 'CISA')
  // This ensures single-exam courses get accurate hours from contentRegistry
  const sectionKey = resolveStudySection(input.courseId, input.section) || input.section;
  const hoursNeeded = calculateHoursNeeded(sectionKey, input.priorExperience);
  const hoursAvailable = calculateHoursAvailable(startDate, input.examDate, input.hoursPerDay, input.studyDaysPerWeek);
  const deficitPercentage = (hoursNeeded - hoursAvailable) / hoursNeeded;
  
  if (deficitPercentage > 0.5) {
    warnings.push(`You have ${hoursAvailable} hours available but typically need ${hoursNeeded}+ hours. This is an aggressive timeline.`);
  }
  
  if (daysUntilExam < 14 && daysUntilExam >= 3) {
    warnings.push(`Only ${daysUntilExam} days until your exam. Consider if this is enough time.`);
  }
  
  if (input.hoursPerDay > 6) {
    warnings.push(`${input.hoursPerDay} hours/day is intense. Burnout risk increases above 6 hours.`);
  }
  
  if (input.hoursPerDay < 1) {
    warnings.push('Less than 1 hour/day may not be enough for consistent progress.');
  }

  return {
    isValid: errors.length === 0,
    canProceedWithAck: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Calculate the total study hours needed for a section
 * Uses contentRegistry as the source of truth for content counts.
 * Hours are derived from actual lesson minutes, MCQ targets, TBS, flashcards, and mock exams.
 */
export function calculateHoursNeeded(
  section: string,
  priorExperience: 'none' | 'some' | 'retake',
  diagnosticScore?: number
): number {
  // Get industry baseline for this section (used as fallback only)
  const industryBaseline = (SECTION_STUDY_HOURS as Record<string, number>)[section] || 100;
  
  // Try contentRegistry first (preferred - uses real content data)
  const registryHours = calculateSectionStudyHours(section, priorExperience);
  let hours: number;
  
  if (registryHours.total > 0) {
    hours = registryHours.total;
  } else {
    // Fallback to static SECTION_STUDY_HOURS
    const experienceMultiplier = (EXPERIENCE_MULTIPLIERS as Record<string, number>)[priorExperience] || 1.0;
    hours = industryBaseline * experienceMultiplier;
  }
  
  // If they took a diagnostic, adjust based on score
  if (diagnosticScore !== undefined) {
    // Score 80%+ = they know a lot, reduce study time
    // Score 50% = average, no change
    // Score 20% = struggling, increase time
    const scoreAdjustment = 1 - ((diagnosticScore - 50) / 100);
    hours = hours * Math.max(0.5, Math.min(1.5, scoreAdjustment));
  }
  
  return Math.round(hours);
}

/**
 * Calculate hours available based on schedule.
 * Supports split weekday/weekend hours for more accurate planning.
 */
export function calculateHoursAvailable(
  startDate: Date,
  examDate: Date,
  hoursPerDay: number,
  studyDaysPerWeek: number,
  weekdayHours?: number,
  weekendHours?: number,
): number {
  const totalDays = differenceInDays(examDate, startDate);
  const totalWeeks = totalDays / 7;

  if (weekdayHours != null && weekendHours != null) {
    // Split model: derive weekday/weekend study-day counts from studyDaysPerWeek.
    // Assume weekends are Sat+Sun (2 days) and weekdays Mon-Fri (5 days).
    const weekendStudyDays = Math.min(studyDaysPerWeek, 2);
    const weekdayStudyDays = Math.max(0, studyDaysPerWeek - weekendStudyDays);
    const weeklyHours = weekdayStudyDays * weekdayHours + weekendStudyDays * weekendHours;
    return Math.round(totalWeeks * weeklyHours);
  }

  const totalStudyDays = totalWeeks * studyDaysPerWeek;
  return Math.round(totalStudyDays * hoursPerDay);
}

/**
 * Generate a reality check assessment
 * 
 * Uses contentRegistry as the source of truth for content counts. 
 * Falls back to user-provided data or section-based estimates if needed.
 */
export function generateRealityCheck(input: StudyPlanSetupInput): RealityCheck {
  const startDate = input.startDate || new Date();
  
  // Calculate hours needed - ALWAYS use contentRegistry for industry-aligned hours
  const sectionKey = resolveStudySection(input.courseId, input.section);
  const hoursNeeded = calculateHoursNeeded(
    sectionKey || input.section,
    input.priorExperience,
    input.diagnosticScore
  );
  
  const hoursAvailable = calculateHoursAvailable(
    startDate,
    input.examDate,
    input.hoursPerDay,
    input.studyDaysPerWeek,
    input.weekdayHours,
    input.weekendHours,
  );
  const hourDeficit = hoursNeeded - hoursAvailable;
  
  const suggestedActions: RealityCheckAction[] = [];
  
  if (hourDeficit > 0) {
    // Calculate how much to extend exam date
    const additionalDaysNeeded = Math.ceil(hourDeficit / (input.hoursPerDay * input.studyDaysPerWeek / 7));
    const newExamDate = addDays(input.examDate, additionalDaysNeeded);
    
    suggestedActions.push({
      type: 'extend-date',
      label: `Push exam to ${format(newExamDate, 'MMM d, yyyy')}`,
      description: `Adding ${additionalDaysNeeded} days would give you enough time`,
      newValue: newExamDate,
      recommended: hourDeficit > 20,
    });
    
    // Calculate increased hours per day needed
    const daysUntilExam = differenceInDays(input.examDate, startDate);
    const studyDays = (daysUntilExam / 7) * input.studyDaysPerWeek;
    const neededHoursPerDay = hoursNeeded / studyDays;
    
    if (neededHoursPerDay <= 6) {
      suggestedActions.push({
        type: 'increase-hours',
        label: `Study ${neededHoursPerDay.toFixed(1)} hours/day`,
        description: 'Increase your daily commitment',
        newValue: neededHoursPerDay,
        recommended: hourDeficit <= 20 && neededHoursPerDay <= 4,
      });
    }
    
    // Suggest studying more days per week
    if (input.studyDaysPerWeek < 7) {
      const newDaysNeeded = Math.min(7, Math.ceil(input.studyDaysPerWeek * (hoursNeeded / hoursAvailable)));
      suggestedActions.push({
        type: 'more-days',
        label: `Study ${newDaysNeeded} days/week`,
        description: 'Add more study days to your week',
        newValue: newDaysNeeded,
      });
    }
    
    // Always offer accept risk option
    suggestedActions.push({
      type: 'accept-risk',
      label: 'Continue with current plan',
      description: 'Proceed knowing you may need to study more efficiently',
    });
    
    // If very short on time, offer cram mode
    if (hourDeficit > hoursAvailable * 0.5) {
      suggestedActions.push({
        type: 'cram-mode',
        label: 'Use Cram Mode',
        description: 'Focus only on highest-weighted topics',
      });
    }
  }
  
  // Determine severity
  let severity: 'good' | 'warning' | 'critical' = 'good';
  let message = '';
  
  const deficitPercentage = hourDeficit / hoursNeeded;
  
  // Calculate surplus (when user has more time than needed)
  const hourSurplus = Math.max(0, -hourDeficit);
  const surplusPercentage = hourSurplus / hoursNeeded;
  
  // Calculate relaxed hours/day if user has significant surplus (>20%)
  let relaxedHoursPerDay: number | undefined;
  if (surplusPercentage > 0.2 && input.hoursPerDay > 1) {
    // They could study less per day and still finish on time
    const minHoursPerDay = (hoursNeeded / hoursAvailable) * input.hoursPerDay;
    relaxedHoursPerDay = Math.round(minHoursPerDay * 10) / 10; // Round to 1 decimal
  }
  
  // Allow 5% tolerance for "on track" - small variances shouldn't alarm users
  if (hourDeficit <= 0 || deficitPercentage < 0.05) {
    severity = 'good';
    if (hourSurplus >= 20) {
      message = `You're in great shape! You have ${hourSurplus} extra hours built in for review and practice.`;
    } else {
      message = `Your timeline looks solid. You have enough time to cover all the material.`;
    }
  } else if (deficitPercentage < 0.2) {
    severity = 'warning';
    message = `You're slightly short on time. You have ${hoursAvailable} hours but need ~${hoursNeeded} hours. Consider a small adjustment.`;
  } else {
    severity = 'critical';
    message = `Heads up: You have ${hoursAvailable} hours but typically need ~${hoursNeeded} hours for ${input.section}. We recommend adjusting your timeline.`;
  }
  
  // Resolve industry benchmark for display
  // Use the resolved sectionKey (handles CISA→'CISA', CFP→'CFP' for full-exam courses)
  // Falls back to input.section, then to courseId uppercase
  const industryBenchmark = (SECTION_STUDY_HOURS as Record<string, number>)[sectionKey ?? '']
    || (SECTION_STUDY_HOURS as Record<string, number>)[input.section]
    || (SECTION_STUDY_HOURS as Record<string, number>)[input.courseId.toUpperCase()]
    || 100;

  return {
    isRealistic: hourDeficit <= 0,
    hoursNeeded,
    hoursAvailable,
    hourDeficit: Math.max(0, hourDeficit),
    hourSurplus,
    industryBenchmark,
    suggestedActions,
    message,
    severity,
    // Use null instead of undefined for Firestore compatibility
    relaxedHoursPerDay: relaxedHoursPerDay ?? null,
  };
}

/**
 * Determine the learning phase based on progress and time remaining
 */
export function determinePhase(
  daysUntilExam: number,
  totalDays: number,
  lessonsCompleted: number,
  lessonsTotal: number
): StudyPhase {
  const timeProgress = 1 - (daysUntilExam / totalDays);
  const contentProgress = lessonsTotal > 0 ? lessonsCompleted / lessonsTotal : 0;
  
  if (daysUntilExam <= 7) {
    return 'exam-week';
  }
  
  if (daysUntilExam <= 14 || (contentProgress >= 0.9 && timeProgress >= 0.7)) {
    return 'final-review';
  }
  
  if (contentProgress >= 0.7 || timeProgress >= 0.6) {
    return 'reinforcement';
  }
  
  if (contentProgress >= 0.3 || timeProgress >= 0.25) {
    return 'building';
  }
  
  return 'foundation';
}

// Time constants for realistic planning — aligned with contentRegistry.ts TIME_CONSTANTS
const MINUTES_PER_MCQ = 1.8;            // Matches contentRegistry mcq.firstAttempt
const MINUTES_PER_FLASHCARD = 0.3;      // Matches contentRegistry flashcard.perCard (×4 sessions handled by adaptive passes)
const MINUTES_PER_SIMULATION = 18;      // Matches contentRegistry tbs.firstAttempt
const _MINUTES_PER_ESSAY = 30;          // CMA essays take ~30 min each (same as dailyPlanService)
const _MINUTES_PER_CASE_STUDY = 25;     // CFP case studies take ~25 min each
const _MINUTES_PER_MOCK_EXAM = 240;     // 4-hour mock exam

// MCQ Review Passes — controls how many times a user reviews questions across the study period.
// More passes = better retention through spaced repetition.
// IMPORTANT: This does NOT reduce the time budget — if user commits to 3h/day, they get 3h/day.
// The adaptive engine decides WHICH questions to show, not how much time to allocate.
const MCQ_REVIEW_PASSES: Record<string, number> = {
  'none': 1.0,     // Single pass through question bank
  'some': 1.0,     // Single pass (was 0.60 — this incorrectly reduced time budget)
  'retake': 1.0,   // Single pass (was 0.45 — focus on time, adaptive handles selection)
};

/**
 * Generate weekly breakdown for the study plan - CONTENT-FIRST
 * 
 * This ensures ALL lessons are covered, then distributes practice activities.
 * Key principle: We MUST cover all content - time constraints affect intensity, not coverage.
 * 
 * Algorithm:
 * 1. Calculate total lesson time required for ALL lessons
 * 2. Determine which weeks can include lessons (foundation through final-review if needed)
 * 3. Distribute ALL lessons evenly across available weeks
 * 4. Allocate remaining time to practice activities
 */
export function generateWeeks(
  startDate: Date,
  examDate: Date,
  hoursPerDay: number,
  studyDaysPerWeek: number,
  totalLessons: number = 0,
  totalLessonMinutes: number = 0,
  lessonDurations: number[] = [],
  sectionId?: string,
  priorExperience: 'none' | 'some' | 'retake' = 'some',
  courseId?: string
): StudyPlanWeek[] {
  const weeks: StudyPlanWeek[] = [];
  const totalDays = differenceInDays(examDate, startDate);
  const totalWeeks = Math.max(1, Math.ceil(totalDays / 7));
  
  // Weekly time budget in minutes
  // When weekday/weekend split is provided (via extra params on generateWeeks),
  // the caller has already folded them into an effective hoursPerDay, so we
  // always compute the same way here.
  const weeklyMinutes = hoursPerDay * studyDaysPerWeek * 60;
  
  // If no lesson durations provided, create array with average duration
  const avgLessonMinutes = totalLessons > 0 && totalLessonMinutes > 0
    ? totalLessonMinutes / totalLessons
    : 30;
  const durations = lessonDurations.length > 0 
    ? lessonDurations 
    : Array(totalLessons).fill(avgLessonMinutes);
  
  let currentDate = startDate;
  
  // First pass: determine phases for all weeks
  const weekPhases: StudyPhase[] = [];
  for (let i = 1; i <= totalWeeks; i++) {
    const weekEnd = addDays(addDays(startDate, (i - 1) * 7), 6);
    const daysUntilExam = differenceInDays(examDate, weekEnd);
    const weekProgress = i / totalWeeks;
    
    let phase: StudyPhase;
    if (i === totalWeeks || daysUntilExam <= 7) {
      phase = 'exam-week';
    } else if (daysUntilExam <= 14 || weekProgress >= 0.85) {
      phase = 'final-review';
    } else if (weekProgress >= 0.6) {
      phase = 'reinforcement';
    } else if (weekProgress >= 0.25) {
      phase = 'building';
    } else {
      phase = 'foundation';
    }
    weekPhases.push(phase);
  }
  
  // ==========================================================================
  // CONTENT-FIRST: Get total content requirements from registry
  // ==========================================================================
  const sectionContent = sectionId ? getSectionContent(sectionId) : null;
  const hasTBS = (sectionContent?.counts.tbs ?? 0) > 0;
  
  // Coverage multipliers based on experience
  const mcqCoverageByExp = { none: 0.80, some: 0.60, retake: 0.45 };
  const mcqCoverage = mcqCoverageByExp[priorExperience] ?? 0.60;
  
  // Calculate REQUIRED content to cover
  const totalMCQs = sectionContent?.counts.mcqs ?? 500;
  const requiredMCQs = Math.round(totalMCQs * mcqCoverage);
  
  const totalFlashcards = sectionContent?.counts.flashcards ?? 200;
  // Dynamic cycles: target ~50 flashcards/week, capped at 3 cycles
  // 50/week = ~10/day with 5 study days, ~5 minutes of work
  const targetFlashcardsPerWeek = 50;
  const flashcardCycles = Math.min(3, (targetFlashcardsPerWeek * totalWeeks) / Math.max(totalFlashcards, 1));
  const requiredFlashcardReviews = Math.round(totalFlashcards * flashcardCycles);
  
  const totalTBS = sectionContent?.counts.tbs ?? 0;
  const requiredTBS = Math.round(totalTBS * 1.5); // 1.5 passes through TBS
  
  const totalCaseStudies = sectionContent?.counts.caseStudies ?? 0;
  const requiredCaseStudies = totalCaseStudies; // Cover all at least once
  
  // Phase weights for practice distribution (how much practice per phase type)
  const phaseWeights: Record<StudyPhase, number> = {
    'foundation': 0.6,      // Learning mode: lighter practice
    'building': 1.0,        // Full practice
    'reinforcement': 1.3,   // Heavy practice
    'final-review': 0.7,    // Winding down, mock exams take time
    'exam-week': 0.3,       // Light touch
  };
  
  // Calculate total phase weight for distribution
  const totalPhaseWeight = weekPhases.reduce((sum, p) => sum + phaseWeights[p], 0);
  
  logger.info(`Study plan: ${totalWeeks} weeks, ${requiredMCQs} MCQs, ${requiredFlashcardReviews} flashcard reviews, ${requiredTBS} TBS`);
  
  // ==========================================================================
  // CONTENT-FIRST DISTRIBUTION: Ensure ALL lessons are covered
  // ==========================================================================
  
  // Determine which weeks can include lessons
  // Start with foundation/building/reinforcement, extend to final-review if needed
  const primaryLearningWeeks = weekPhases
    .map((p, i) => ({ phase: p, index: i }))
    .filter(w => ['foundation', 'building', 'reinforcement'].includes(w.phase));
  
  const finalReviewWeeks = weekPhases
    .map((p, i) => ({ phase: p, index: i }))
    .filter(w => w.phase === 'final-review');
  
  // Calculate time available for lessons in primary learning weeks
  // Use 50% of time as average lesson allocation
  const avgLessonTimePercent = 0.40;
  const primaryLessonCapacityMinutes = primaryLearningWeeks.length * weeklyMinutes * avgLessonTimePercent;
  
  // Check if we need to extend lessons into final-review phase
  const needsExtension = totalLessonMinutes > primaryLessonCapacityMinutes;
  const learningWeekIndices = needsExtension
    ? [...primaryLearningWeeks, ...finalReviewWeeks].map(w => w.index)
    : primaryLearningWeeks.map(w => w.index);
  
  // Calculate lessons per learning week (distribute evenly by count)
  const learningWeekCount = learningWeekIndices.length || 1;
  const baseLessonsPerWeek = Math.floor(totalLessons / learningWeekCount);
  const extraLessons = totalLessons % learningWeekCount;
  
  // Create lesson distribution map: weekIndex -> lessonCount
  const lessonDistribution: Map<number, number> = new Map();
  let lessonAssignIndex = 0;
  
  for (let i = 0; i < learningWeekIndices.length; i++) {
    const weekIndex = learningWeekIndices[i];
    // Front-load extra lessons to earlier weeks
    const lessonsThisWeek = baseLessonsPerWeek + (i < extraLessons ? 1 : 0);
    lessonDistribution.set(weekIndex, lessonsThisWeek);
    lessonAssignIndex += lessonsThisWeek;
  }
  
  // Calculate lesson minutes per week based on actual lesson durations
  let durationIndex = 0;
  const lessonMinutesDistribution: Map<number, number> = new Map();
  
  for (const weekIndex of learningWeekIndices) {
    const lessonCount = lessonDistribution.get(weekIndex) || 0;
    let weekLessonMinutes = 0;
    
    for (let j = 0; j < lessonCount && durationIndex < durations.length; j++) {
      weekLessonMinutes += durations[durationIndex];
      durationIndex++;
    }
    
    lessonMinutesDistribution.set(weekIndex, weekLessonMinutes);
  }
  
  // Log distribution for debugging
  logger.info(`Study plan: Distributing ${totalLessons} lessons across ${learningWeekCount} learning weeks`);
  if (needsExtension) {
    logger.info(`Study plan: Extended lessons into final-review phase due to tight timeline`);
  }
  
  // ==========================================================================
  // CONTENT-FIRST: Distribute practice content based on phase weights
  // ==========================================================================
  
  // Calculate practice distribution per week based on phase weight
  const mcqDistribution: Map<number, number> = new Map();
  const flashcardDistribution: Map<number, number> = new Map();
  const tbsDistribution: Map<number, number> = new Map();
  const caseStudyDistribution: Map<number, number> = new Map();
  
  // Distribute MCQs - heavier in reinforcement phase
  let mcqAssigned = 0;
  for (let i = 0; i < totalWeeks; i++) {
    const phase = weekPhases[i];
    const weight = phaseWeights[phase];
    const weekShare = Math.round((weight / totalPhaseWeight) * requiredMCQs);
    mcqDistribution.set(i, weekShare);
    mcqAssigned += weekShare;
  }
  // Distribute any remainder to reinforcement weeks
  const reinforcementWeeks = weekPhases.map((p, i) => ({ p, i })).filter(w => w.p === 'reinforcement');
  let mcqRemainder = requiredMCQs - mcqAssigned;
  for (const w of reinforcementWeeks) {
    if (mcqRemainder <= 0) break;
    const current = mcqDistribution.get(w.i) || 0;
    mcqDistribution.set(w.i, current + 1);
    mcqRemainder--;
  }
  
  // Distribute flashcards evenly (spaced repetition works best spread out)
  const flashcardsPerWeek = Math.ceil(requiredFlashcardReviews / totalWeeks);
  for (let i = 0; i < totalWeeks; i++) {
    flashcardDistribution.set(i, flashcardsPerWeek);
  }
  
  // Distribute TBS - start in building phase, heavier in reinforcement
  if (hasTBS && requiredTBS > 0) {
    const tbsWeeks = weekPhases.map((p, i) => ({ p, i })).filter(w => 
      ['building', 'reinforcement', 'final-review'].includes(w.p)
    );
    const tbsPerWeek = Math.ceil(requiredTBS / Math.max(1, tbsWeeks.length));
    for (const w of tbsWeeks) {
      tbsDistribution.set(w.i, tbsPerWeek);
    }
  }
  
  // Distribute case studies (CFP) - start in building phase
  if (requiredCaseStudies > 0) {
    const csWeeks = weekPhases.map((p, i) => ({ p, i })).filter(w => 
      ['building', 'reinforcement', 'final-review'].includes(w.p)
    );
    const csPerWeek = Math.ceil(requiredCaseStudies / Math.max(1, csWeeks.length));
    for (const w of csWeeks) {
      caseStudyDistribution.set(w.i, Math.min(csPerWeek, 3)); // Cap at 3/week
    }
  }
  
  // ==========================================================================
  // Build weeks with lesson distribution + practice activities
  // ==========================================================================
  
  for (let i = 0; i < totalWeeks; i++) {
    const weekNumber = i + 1;
    const weekStart = currentDate;
    const weekEnd = addDays(currentDate, 6);
    const phase = weekPhases[i];
    
    // Get lessons assigned to this week
    const weekLessonCount = lessonDistribution.get(i) || 0;
    const weekLessonMinutes = lessonMinutesDistribution.get(i) || 0;
    
    // Cap lesson time at 70% of weekly budget so there's always meaningful
    // practice time. For exams with TBS, students need TBS practice time.
    const maxLessonMinutes = weeklyMinutes * 0.70;
    const effectiveLessonMinutes = Math.min(weekLessonMinutes, maxLessonMinutes);
    
    // Calculate remaining time for practice activities
    const remainingMinutes = Math.max(0, weeklyMinutes - effectiveLessonMinutes);
    
    // ========================================================================
    // CONTENT-FIRST: Use pre-calculated distributions, not percentages
    // ========================================================================
    const questionCount = mcqDistribution.get(i) || 0;
    const flashcardCount = flashcardDistribution.get(i) || 0;
    const simulationCount = tbsDistribution.get(i) || 0;
    const caseStudyCount = caseStudyDistribution.get(i) || 0;
    
    // Mock exams in final-review and exam-week phases
    const mockExamCount = (phase === 'final-review' || phase === 'exam-week') ? 1 : 0;
    
    // CMA Essay Goals: Essays are 25% of the CMA exam score
    let essayCount = 0;
    if (courseId === 'cma' && phase !== 'foundation' && phase !== 'exam-week') {
      const essaysPerPhase: Record<string, number> = {
        'building': 1,
        'reinforcement': 2,
        'final-review': 1,
      };
      essayCount = essaysPerPhase[phase] || 0;
    }
    
    // Calculate expected time for this week's activities
    const mcqMinutes = questionCount * MINUTES_PER_MCQ;
    const flashcardMinutes = flashcardCount * MINUTES_PER_FLASHCARD;
    const tbsMinutes = simulationCount * MINUTES_PER_SIMULATION;
    const practiceMinutes = mcqMinutes + flashcardMinutes + tbsMinutes;
    
    const goals = {
      lessons: weekLessonCount,
      lessonMinutes: Math.round(effectiveLessonMinutes),
      questions: questionCount,
      questionMinutes: Math.round(mcqMinutes),
      flashcards: flashcardCount,
      simulations: simulationCount,
      essays: essayCount,
      caseStudies: caseStudyCount,
      mockExams: mockExamCount,
    };
    
    weeks.push({
      weekNumber,
      startDate: weekStart,
      endDate: weekEnd,
      phase,
      focusTopics: [],
      goals,
    });
    
    currentDate = addDays(weekEnd, 1);
  }
  
  // Final verification: ensure all lessons are assigned
  const assignedLessons = weeks.reduce((sum, w) => sum + w.goals.lessons, 0);
  if (assignedLessons !== totalLessons) {
    logger.warn(`Study plan: Lesson mismatch - expected ${totalLessons}, assigned ${assignedLessons}`);
    
    // Fill any gaps by adding to earlier weeks
    let remaining = totalLessons - assignedLessons;
    for (let i = 0; i < weeks.length && remaining > 0; i++) {
      const w = weeks[i];
      if (w.phase !== 'exam-week') {
        const toAdd = Math.min(remaining, 5); // Add up to 5 lessons per week
        w.goals.lessons += toAdd;
        w.goals.lessonMinutes += Math.round(toAdd * avgLessonMinutes);
        remaining -= toAdd;
      }
    }
  }
  
  logger.info(`Study plan: Final distribution - ${weeks.reduce((sum, w) => sum + w.goals.lessons, 0)} lessons across ${totalWeeks} weeks`);
  
  return weeks;
}

/**
 * Generate milestones for the study plan
 */
export function generateMilestones(
  weeks: StudyPlanWeek[],
  examDate: Date
): StudyPlanMilestone[] {
  const milestones: StudyPlanMilestone[] = [];
  
  // Phase transitions
  let lastPhase: StudyPhase | null = null;
  for (const week of weeks) {
    if (week.phase !== lastPhase) {
      milestones.push({
        id: `phase-${week.phase}-${week.weekNumber}`,
        date: week.startDate,
        type: 'phase-start',
        label: getPhaseLabel(week.phase),
        description: getPhaseDescription(week.phase),
      });
      lastPhase = week.phase;
    }
  }
  
  // Checkpoints at 25%, 50%, 75%
  const totalWeeks = weeks.length;
  const checkpointWeeks = [
    Math.round(totalWeeks * 0.25),
    Math.round(totalWeeks * 0.5),
    Math.round(totalWeeks * 0.75),
  ];
  
  checkpointWeeks.forEach((weekNum, index) => {
    if (weekNum > 0 && weekNum <= totalWeeks) {
      const week = weeks[weekNum - 1];
      milestones.push({
        id: `checkpoint-${index + 1}`,
        date: week.endDate,
        type: 'checkpoint',
        label: `${(index + 1) * 25}% Checkpoint`,
        description: 'Time to assess your progress',
      });
    }
  });
  
  // Mock exam milestone (2 weeks before)
  const mockExamDate = addDays(examDate, -14);
  milestones.push({
    id: 'mock-exam-1',
    date: mockExamDate,
    type: 'mock-exam',
    label: 'Full Mock Exam',
    description: 'Simulate real exam conditions',
  });
  
  // Exam day
  milestones.push({
    id: 'exam-day',
    date: examDate,
    type: 'exam-day',
    label: 'Exam Day! 🎯',
    description: 'You\'ve got this!',
  });
  
  return milestones.sort((a, b) => a.date.getTime() - b.date.getTime());
}

function getPhaseLabel(phase: StudyPhase): string {
  switch (phase) {
    case 'foundation': return 'Foundation Phase';
    case 'building': return 'Building Phase';
    case 'reinforcement': return 'Reinforcement Phase';
    case 'final-review': return 'Final Review';
    case 'exam-week': return 'Exam Week';
  }
}

function getPhaseDescription(phase: StudyPhase): string {
  switch (phase) {
    case 'foundation': return 'Focus on learning core concepts through lessons';
    case 'building': return 'Expand knowledge with more practice and simulations';
    case 'reinforcement': return 'Heavy practice mode, focus on weak areas';
    case 'final-review': return 'Mock exams and targeted review';
    case 'exam-week': return 'Light review and confidence building';
  }
}

/**
 * Determine plan health based on progress vs. expected
 * 
 * Health is calculated from 3 factors:
 * - Lesson progress (40%): Are they completing lessons on schedule?
 * - MCQ progress (35%): Are they practicing enough questions?
 * - Attendance (25%): Are they showing up consistently?
 * 
 * This balanced approach ensures that heavy MCQ practice counts even
 * if lessons are slightly behind, and vice versa.
 */
export function calculatePlanHealth(
  _currentWeek: number,
  _totalWeeks: number,
  lessonsCompleted: number,
  lessonsExpected: number,
  questionsAnswered: number,
  questionsExpected: number,
  daysStudied: number,
  daysMissed: number
): PlanHealth {
  // Lesson progress ratio (cap at 1.0 for early finishers)
  const lessonRatio = lessonsExpected > 0 
    ? Math.min(1, lessonsCompleted / lessonsExpected) 
    : 1;
  
  // MCQ progress ratio (cap at 1.0)
  const questionRatio = questionsExpected > 0 
    ? Math.min(1, questionsAnswered / questionsExpected) 
    : 1;
  
  // Attendance ratio
  const attendanceRatio = (daysStudied + daysMissed) > 0 
    ? daysStudied / (daysStudied + daysMissed) 
    : 1;
  
  // Weighted score: lessons 40%, questions 35%, attendance 25%
  const overallScore = (lessonRatio * 0.4) + (questionRatio * 0.35) + (attendanceRatio * 0.25);
  
  if (overallScore >= 0.85) return 'on-track';
  if (overallScore >= 0.70) return 'slightly-behind';
  if (overallScore >= 0.50) return 'behind';
  if (overallScore >= 0.30) return 'at-risk';
  return 'critical';
}

/**
 * Generate a complete study plan
 * 
 * Auto-fills lesson counts and durations from contentRegistry when not provided.
 * This means callers no longer need to fetch lesson data manually.
 */
export function generateStudyPlan(
  input: StudyPlanSetupInput,
  userId: string
): StudyPlan {
  const startDate = input.startDate || new Date();
  const totalDays = differenceInDays(input.examDate, startDate);
  
  // Auto-fill content data from contentRegistry if not provided
  const sectionKey = resolveStudySection(input.courseId, input.section);
  const contentInfo = sectionKey ? getSectionContent(sectionKey) : null;
  
  let totalLessons = input.totalLessons || 0;
  let totalLessonMinutes = input.totalLessonMinutes || 0;
  const lessonDurations = input.lessonDurations || [];
  
  if (contentInfo && contentInfo.counts.lessons > 0) {
    // Use contentRegistry as source of truth (unless caller provided data)
    if (!input.totalLessons || input.totalLessons === 0) {
      totalLessons = contentInfo.counts.lessons;
    }
    if (!input.totalLessonMinutes || input.totalLessonMinutes === 0) {
      totalLessonMinutes = contentInfo.counts.lessonMinutes;
    }
  }
  
  // If still no lesson minutes, use default 30 min/lesson
  if (totalLessonMinutes === 0 && totalLessons > 0) {
    totalLessonMinutes = totalLessons * 30;
  }

  // Snapshot the input with the auto-filled values for recalculation
  const enrichedInput: StudyPlanSetupInput = {
    ...input,
    totalLessons,
    totalLessonMinutes,
    lessonDurations,
  };
  
  // Generate reality check
  const realityCheck = generateRealityCheck(enrichedInput);

  // Compute effective hoursPerDay when weekday/weekend split is provided.
  // generateWeeks uses a flat hoursPerDay × studyDaysPerWeek for weekly budget,
  // so we fold the split into a weighted average.
  let effectiveHoursPerDay = input.hoursPerDay;
  if (input.weekdayHours != null && input.weekendHours != null) {
    const weekendStudyDays = Math.min(input.studyDaysPerWeek, 2);
    const weekdayStudyDays = Math.max(0, input.studyDaysPerWeek - weekendStudyDays);
    const totalDaysPerWeek = weekdayStudyDays + weekendStudyDays;
    effectiveHoursPerDay = totalDaysPerWeek > 0
      ? (weekdayStudyDays * input.weekdayHours + weekendStudyDays * input.weekendHours) / totalDaysPerWeek
      : input.hoursPerDay;
  }

  const weeks = generateWeeks(
    startDate,
    input.examDate,
    effectiveHoursPerDay,
    input.studyDaysPerWeek,
    totalLessons,
    totalLessonMinutes,
    lessonDurations,
    sectionKey || undefined,
    input.priorExperience,
    input.courseId
  );
  
  // Generate milestones
  const milestones = generateMilestones(weeks, input.examDate);
  
  // Initial alerts
  const alerts: StudyPlanAlert[] = [];
  if (!realityCheck.isRealistic) {
    alerts.push({
      id: 'initial-warning',
      type: 'warning',
      title: 'Timeline Check',
      message: realityCheck.message,
      dismissible: true,
      createdAt: new Date(),
    });
  }
  
  // Find current week
  const today = new Date();
  const currentWeekData = weeks.find(w => 
    isWithinInterval(today, { start: w.startDate, end: w.endDate })
  );
  const currentWeek = currentWeekData?.weekNumber || 1;
  const currentPhase = currentWeekData?.phase || 'foundation';
  
  return {
    id: `plan-${input.courseId}-${input.section}-${Date.now()}`,
    courseId: input.courseId,
    section: input.section,
    userId,
    setup: enrichedInput,
    startDate,
    examDate: input.examDate,
    totalDays,
    totalWeeks: weeks.length,
    hoursPerDay: Math.round(effectiveHoursPerDay * 10) / 10,
    studyDaysPerWeek: input.studyDaysPerWeek,
    weeks,
    milestones,
    topics: [], // Will be populated based on curriculum
    realityCheck,
    currentPhase,
    currentWeek,
    // Initial health based on timeline reality check
    health: realityCheck.severity === 'good' ? 'on-track' 
          : realityCheck.severity === 'warning' ? 'slightly-behind' 
          : 'at-risk',
    progress: {
      lessonsCompleted: 0,
      lessonsTotal: totalLessons,
      questionsAnswered: 0,
      questionsTarget: weeks.reduce((sum, w) => sum + w.goals.questions, 0),
      accuracy: 0,
      accuracyTrend: 'stable',
      daysStudied: 0,
      daysMissed: 0,
    },
    alerts,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

// ============================================================================
// Firebase Operations
// ============================================================================

const STUDY_PLAN_COLLECTION = 'studyPlans';

/**
 * Save a study plan to Firestore
 */
export async function saveStudyPlan(plan: StudyPlan): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Must be logged in to save study plan');
  }
  
  try {
    const docRef = doc(db, STUDY_PLAN_COLLECTION, plan.id);
    await setDoc(docRef, {
      ...plan,
      // Convert dates to timestamps for Firestore
      startDate: plan.startDate,
      examDate: plan.examDate,
      createdAt: plan.createdAt,
      updatedAt: serverTimestamp(),
    });
    logger.info('Study plan saved:', plan.id);
  } catch (error) {
    logger.error('Error saving study plan:', error);
    throw error;
  }
}

/**
 * Get the user's study plan for a specific course/section
 */
export async function getStudyPlan(
  courseId: CourseId,
  _section: string
): Promise<StudyPlan | null> {
  const user = auth.currentUser;
  if (!user) {
    return null;
  }
  
  try {
    // For now, get from user profile - in production would query collection
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      const planId = data.studyPlans?.[courseId];
      
      if (planId) {
        const planRef = doc(db, STUDY_PLAN_COLLECTION, planId);
        const planDoc = await getDoc(planRef);
        
        if (planDoc.exists()) {
          return planDoc.data() as StudyPlan;
        }
      }
    }
    
    return null;
  } catch (error) {
    logger.error('Error getting study plan:', error);
    return null;
  }
}

/**
 * Get study plan summary for nav indicator
 */
export async function getStudyPlanSummary(
  courseId: CourseId,
  section: string
): Promise<StudyPlanSummary> {
  const plan = await getStudyPlan(courseId, section);
  
  if (!plan) {
    return { exists: false };
  }
  
  const daysUntilExam = differenceInDays(plan.examDate, new Date());
  
  return {
    exists: true,
    health: plan.health,
    daysUntilExam,
    currentPhase: plan.currentPhase,
    alertCount: plan.alerts.filter(a => !a.dismissed).length,
  };
}

/**
 * Update study plan progress
 */
export async function updateStudyPlanProgress(
  planId: string,
  updates: Partial<StudyPlan['progress']>
): Promise<void> {
  try {
    const planRef = doc(db, STUDY_PLAN_COLLECTION, planId);
    await updateDoc(planRef, {
      'progress': updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    logger.error('Error updating study plan progress:', error);
    throw error;
  }
}

/**
 * Increment study plan progress for a user's plan
 * This is the primary function to call when users complete lessons/questions
 */
export async function incrementStudyPlanProgress(
  userId: string,
  courseId: CourseId,
  section: string,
  updates: {
    lessonsCompleted?: number;
    questionsAnswered?: number;
    daysStudied?: number;
    accuracy?: number; // Session accuracy (0-100) to blend into rolling average
  }
): Promise<void> {
  try {
    // Normalize section to match how plans are stored (uppercase)
    const normalizedSection = resolveStudySection(courseId, section) || section.toUpperCase();
    const planKey = `${courseId}_${normalizedSection}`;
    const planRef = doc(db, 'users', userId, 'studyPlans', planKey);
    
    // Check if plan exists
    const planSnap = await getDoc(planRef);
    if (!planSnap.exists()) {
      logger.info(`No study plan found at users/${userId}/studyPlans/${planKey}, skipping update`);
      return;
    }
    
    const plan = planSnap.data() as StudyPlan;
    const currentProgress = plan.progress || {
      lessonsCompleted: 0,
      lessonsTotal: 0,
      questionsAnswered: 0,
      questionsTarget: 0,
      accuracy: 0,
      accuracyTrend: 'stable',
      daysStudied: 0,
      daysMissed: 0,
    };
    
    // Calculate expected progress for health check
    // Based on current week and goals
    const today = new Date();
    const currentWeek = plan.weeks?.find((w: StudyPlanWeek) => {
      const start = new Date(w.startDate);
      const end = new Date(w.endDate);
      return isWithinInterval(today, { start, end });
    });
    
    let lessonsExpected = 0;
    let questionsExpected = 0;
    if (plan.weeks) {
      for (const w of plan.weeks) {
        if (w.weekNumber < (currentWeek?.weekNumber || 1)) {
          lessonsExpected += w.goals?.lessons || 0;
          questionsExpected += w.goals?.questions || 0;
        }
      }
      // Add partial week progress
      if (currentWeek) {
        const weekStart = new Date(currentWeek.startDate);
        const dayOfWeek = Math.floor((today.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const weekProgress = Math.min(1, dayOfWeek / 7);
        lessonsExpected += Math.floor((currentWeek.goals?.lessons || 0) * weekProgress);
        questionsExpected += Math.floor((currentWeek.goals?.questions || 0) * weekProgress);
      }
    }
    
    // Update progress
    const newLessonsCompleted = currentProgress.lessonsCompleted + (updates.lessonsCompleted || 0);
    const newQuestionsAnswered = currentProgress.questionsAnswered + (updates.questionsAnswered || 0);
    const newDaysStudied = currentProgress.daysStudied + (updates.daysStudied || 0);
    
    // Calculate rolling accuracy (weighted average: 70% existing, 30% new session)
    // This prevents wild swings from one bad session
    let newAccuracy = currentProgress.accuracy || 0;
    let newAccuracyTrend = currentProgress.accuracyTrend || 'stable';
    if (updates.accuracy !== undefined && updates.questionsAnswered && updates.questionsAnswered > 0) {
      const oldAccuracy = currentProgress.accuracy || 0;
      const oldQuestions = currentProgress.questionsAnswered || 0;
      
      if (oldQuestions === 0) {
        // First practice session - use session accuracy directly
        newAccuracy = updates.accuracy;
      } else {
        // Weighted rolling average (more weight to recent performance)
        // Formula: (oldAccuracy * oldQuestions + newAccuracy * newQuestions) / totalQuestions
        // This naturally weights by volume
        newAccuracy = Math.round(
          (oldAccuracy * oldQuestions + updates.accuracy * updates.questionsAnswered) / 
          (oldQuestions + updates.questionsAnswered)
        );
      }
      
      // Determine trend
      const accuracyDelta = newAccuracy - oldAccuracy;
      if (accuracyDelta >= 3) {
        newAccuracyTrend = 'improving';
      } else if (accuracyDelta <= -3) {
        newAccuracyTrend = 'declining';
      } else {
        newAccuracyTrend = 'stable';
      }
    }
    
    // Grace period: don't penalize in the first 2 days of a new plan
    const planCreatedAt = plan.createdAt ? new Date(plan.createdAt) : today;
    const daysSincePlanCreation = Math.floor(
      (today.getTime() - planCreatedAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    const isNewPlan = daysSincePlanCreation <= 1;

    // Recalculate health (now includes MCQ progress)
    const newHealth = isNewPlan
      ? (plan.health || 'on-track')
      : calculatePlanHealth(
          currentWeek?.weekNumber || 1,
          plan.totalWeeks || 1,
          newLessonsCompleted,
          lessonsExpected,
          newQuestionsAnswered,
          questionsExpected,
          newDaysStudied,
          currentProgress.daysMissed || 0
        );
    
    // Generate alert if health degraded
    const healthOrder = ['on-track', 'slightly-behind', 'behind', 'at-risk', 'critical'];
    const oldHealthIdx = healthOrder.indexOf(plan.health || 'on-track');
    const newHealthIdx = healthOrder.indexOf(newHealth);
    
    const updatePayload: Record<string, unknown> = {
      'progress.lessonsCompleted': newLessonsCompleted,
      'progress.questionsAnswered': newQuestionsAnswered,
      'progress.daysStudied': newDaysStudied,
      'progress.accuracy': newAccuracy,
      'progress.accuracyTrend': newAccuracyTrend,
      health: newHealth,
      updatedAt: serverTimestamp(),
    };
    
    // If health degraded, add an alert
    if (newHealthIdx > oldHealthIdx && newHealthIdx >= 2) { // 'behind' or worse
      const alertMessages: Record<string, string> = {
        'behind': "You're falling behind schedule. Consider adding an extra study session this week.",
        'at-risk': "Your exam date is approaching but you're significantly behind. We recommend adjusting your plan.",
        'critical': "Urgent: You may not have enough time to cover all material. Consider rescheduling your exam or intensifying study.",
      };
      
      const newAlert: StudyPlanAlert = {
        id: `health-${Date.now()}`,
        type: newHealthIdx >= 3 ? 'critical' : 'warning',
        title: newHealth === 'critical' ? 'Critical: Behind Schedule' : 'Getting Behind',
        message: alertMessages[newHealth] || 'You may want to increase your study pace.',
        dismissible: true,
        createdAt: new Date(),
      };
      
      updatePayload['alerts'] = arrayUnion(newAlert);
    }
    
    await updateDoc(planRef, updatePayload);
    
    // Notify UI components to refresh (e.g., StudyPlan page, nav dot)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('studyPlanUpdated'));
    }
    
    logger.info(`Updated study plan progress: ${planKey}, accuracy: ${newAccuracy}%, health: ${newHealth}`);
  } catch (error) {
    logger.error('Error incrementing study plan progress:', error);
    // Don't throw - this is a non-critical enhancement
  }
}

/**
 * Rebalance an existing study plan
 * 
 * This function recalculates the remaining weeks of a study plan to redistribute
 * the lessons that haven't been completed yet. It preserves progress history
 * while adjusting future goals to help users catch up.
 * 
 * Options:
 * - keepExamDate: Redistribute lessons at a higher daily pace
 * - extendExamDate: Add more days at the same pace
 */
export interface RebalanceOptions {
  mode: 'increase-pace' | 'extend-date';
  newExamDate?: Date; // Required if mode is 'extend-date'
  newHoursPerDay?: number; // Optional: increase study hours
}

export interface RebalanceResult {
  success: boolean;
  message: string;
  oldPace: number;
  newPace: number;
  lessonsRemaining: number;
  daysRemaining: number;
}

export async function rebalanceStudyPlan(
  userId: string,
  courseId: CourseId,
  section: string,
  options: RebalanceOptions
): Promise<RebalanceResult> {
  try {
    // Normalize section to match how plans are stored (uppercase)
    const normalizedSection = resolveStudySection(courseId, section) || section.toUpperCase();
    const planKey = `${courseId}_${normalizedSection}`;
    const planRef = doc(db, 'users', userId, 'studyPlans', planKey);
    
    const planSnap = await getDoc(planRef);
    if (!planSnap.exists()) {
      return {
        success: false,
        message: 'No study plan found to rebalance.',
        oldPace: 0,
        newPace: 0,
        lessonsRemaining: 0,
        daysRemaining: 0,
      };
    }
    
    const plan = planSnap.data() as StudyPlan;
    const today = new Date();
    
    // Calculate what's left
    const lessonsCompleted = plan.progress?.lessonsCompleted || 0;
    const lessonsTotal = plan.progress?.lessonsTotal || plan.setup?.totalLessons || 0;
    const lessonsRemaining = Math.max(0, lessonsTotal - lessonsCompleted);
    
    // Get exam date (use new one if extending)
    const examDate = options.mode === 'extend-date' && options.newExamDate
      ? options.newExamDate
      : new Date(plan.examDate);
    
    const daysRemaining = Math.max(1, differenceInDays(examDate, today));
    const studyDaysPerWeek = plan.studyDaysPerWeek || 5;
    const studyDaysRemaining = Math.ceil(daysRemaining * (studyDaysPerWeek / 7));
    
    // Calculate old and new pace
    const oldPace = plan.setup?.totalLessons 
      ? Math.round((plan.setup.totalLessons / Math.max(1, plan.totalDays)) * 10) / 10
      : 0;
    const newPace = Math.round((lessonsRemaining / Math.max(1, studyDaysRemaining)) * 10) / 10;
    
    // Estimate lesson minutes for remaining lessons (use setup value or default 30 min)
    const avgLessonMinutes = plan.setup?.totalLessons && plan.setup?.totalLessonMinutes
      ? plan.setup.totalLessonMinutes / plan.setup.totalLessons
      : 30;
    const remainingLessonMinutes = Math.round(lessonsRemaining * avgLessonMinutes);
    
    // Regenerate remaining weeks
    const rebalanceSectionKey = resolveStudySection(courseId, section);
    const newWeeks = generateWeeks(
      today,
      examDate,
      options.newHoursPerDay || plan.hoursPerDay,
      studyDaysPerWeek,
      lessonsRemaining,
      remainingLessonMinutes,
      [],
      rebalanceSectionKey || undefined,
      plan.setup?.priorExperience || 'some',
      courseId
    );
    
    // Merge: keep completed weeks, replace future weeks
    const currentWeekNum = plan.weeks.find(w => 
      isWithinInterval(today, { start: new Date(w.startDate), end: new Date(w.endDate) })
    )?.weekNumber || 1;
    
    // Keep weeks before current week (history)
    const historicalWeeks = plan.weeks.filter(w => w.weekNumber < currentWeekNum);
    
    // Renumber new weeks starting from current week
    const renumberedNewWeeks = newWeeks.map((w, i) => ({
      ...w,
      weekNumber: currentWeekNum + i,
    }));
    
    const mergedWeeks = [...historicalWeeks, ...renumberedNewWeeks];
    
    // Generate new milestones
    const newMilestones = generateMilestones(mergedWeeks, examDate);
    
    // Calculate new total weeks
    const newTotalWeeks = mergedWeeks.length;
    
    // Find current phase
    const currentWeekData = mergedWeeks.find(w =>
      isWithinInterval(today, { start: new Date(w.startDate), end: new Date(w.endDate) })
    );
    
    // Create rebalance alert
    const rebalanceAlert: StudyPlanAlert = {
      id: `rebalance-${Date.now()}`,
      type: 'info',
      title: 'Plan Rebalanced',
      message: options.mode === 'extend-date'
        ? `Your plan has been extended. New pace: ${newPace} lessons/study day.`
        : `Your plan has been rebalanced. New pace: ${newPace} lessons/study day to catch up.`,
      dismissible: true,
      createdAt: new Date(),
    };
    
    // Update the plan
    const updatePayload: Record<string, unknown> = {
      weeks: mergedWeeks,
      milestones: newMilestones,
      totalWeeks: newTotalWeeks,
      totalDays: daysRemaining,
      examDate: examDate,
      currentWeek: currentWeekData?.weekNumber || currentWeekNum,
      currentPhase: currentWeekData?.phase || 'reinforcement',
      health: 'on-track', // Reset health after rebalance
      'setup.examDate': examDate,
      updatedAt: serverTimestamp(),
      alerts: arrayUnion(rebalanceAlert),
    };
    
    // Update hours if changed
    if (options.newHoursPerDay && options.newHoursPerDay !== plan.hoursPerDay) {
      updatePayload['hoursPerDay'] = options.newHoursPerDay;
      updatePayload['setup.hoursPerDay'] = options.newHoursPerDay;
    }
    
    await updateDoc(planRef, updatePayload);
    
    logger.info(`Rebalanced study plan: ${planKey}, new pace: ${newPace} lessons/day`);
    
    return {
      success: true,
      message: options.mode === 'extend-date'
        ? `Plan extended to ${format(examDate, 'MMM d')}. New pace: ${newPace} lessons per study day.`
        : `Plan rebalanced. New pace: ${newPace} lessons per study day to catch up.`,
      oldPace,
      newPace,
      lessonsRemaining,
      daysRemaining,
    };
  } catch (error) {
    logger.error('Error rebalancing study plan:', error);
    return {
      success: false,
      message: 'Failed to rebalance plan. Please try again.',
      oldPace: 0,
      newPace: 0,
      lessonsRemaining: 0,
      daysRemaining: 0,
    };
  }
}
