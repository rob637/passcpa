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
  TodayActivity,
} from '../types/studyPlan';
import { SECTION_STUDY_HOURS, EXPERIENCE_MULTIPLIERS } from '../types/studyPlan';
import { db, auth } from '../config/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';
import logger from '../utils/logger';

// Re-export types for convenience
export type { StudyPlan, StudyPlanSummary, TodaysPlan };

/**
 * Calculate the total study hours needed for a section
 */
export function calculateHoursNeeded(
  section: string,
  priorExperience: 'none' | 'some' | 'retake',
  diagnosticScore?: number
): number {
  // Base hours for the section
  const baseHours = (SECTION_STUDY_HOURS as Record<string, number>)[section] || 100;
  
  // Adjust for experience
  const experienceMultiplier = (EXPERIENCE_MULTIPLIERS as Record<string, number>)[priorExperience] || 1.0;
  let hours = baseHours * experienceMultiplier;
  
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
 * Calculate hours available based on schedule
 */
export function calculateHoursAvailable(
  startDate: Date,
  examDate: Date,
  hoursPerDay: number,
  studyDaysPerWeek: number
): number {
  const totalDays = differenceInDays(examDate, startDate);
  const totalWeeks = totalDays / 7;
  const totalStudyDays = totalWeeks * studyDaysPerWeek;
  return Math.round(totalStudyDays * hoursPerDay);
}

/**
 * Generate a reality check assessment
 */
export function generateRealityCheck(input: StudyPlanSetupInput): RealityCheck {
  const startDate = input.startDate || new Date();
  const hoursNeeded = calculateHoursNeeded(
    input.section,
    input.priorExperience,
    input.diagnosticScore
  );
  const hoursAvailable = calculateHoursAvailable(
    startDate,
    input.examDate,
    input.hoursPerDay,
    input.studyDaysPerWeek
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
  
  if (hourDeficit <= 0) {
    severity = 'good';
    message = `You have enough time! With ${hoursAvailable} hours available and ~${hoursNeeded} hours needed, you're set up for success.`;
  } else if (deficitPercentage < 0.2) {
    severity = 'warning';
    message = `You're slightly short on time. You have ${hoursAvailable} hours but need ~${hoursNeeded} hours. Consider a small adjustment.`;
  } else {
    severity = 'critical';
    message = `Heads up: You have ${hoursAvailable} hours but typically need ~${hoursNeeded} hours for ${input.section}. We recommend adjusting your timeline.`;
  }
  
  return {
    isRealistic: hourDeficit <= 0,
    hoursNeeded,
    hoursAvailable,
    hourDeficit: Math.max(0, hourDeficit),
    suggestedActions,
    message,
    severity,
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

/**
 * Generate weekly breakdown for the study plan
 * 
 * Distributes lessons across weeks proportionally based on phase:
 * - Foundation (first ~25%): 50% of lessons
 * - Building (25%-60%): 35% of lessons
 * - Reinforcement (60%-85%): 15% of lessons
 * - Final review / exam week: 0 lessons (review only)
 */
export function generateWeeks(
  startDate: Date,
  examDate: Date,
  hoursPerDay: number,
  studyDaysPerWeek: number,
  totalLessons: number = 0
): StudyPlanWeek[] {
  const weeks: StudyPlanWeek[] = [];
  const totalDays = differenceInDays(examDate, startDate);
  const totalWeeks = Math.ceil(totalDays / 7);
  
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
  
  // Count weeks by phase that get lessons
  const foundationWeeks = weekPhases.filter(p => p === 'foundation').length;
  const buildingWeeks = weekPhases.filter(p => p === 'building').length;
  const reinforcementWeeks = weekPhases.filter(p => p === 'reinforcement').length;
  
  // Distribute lessons: Foundation 50%, Building 35%, Reinforcement 15%
  const foundationLessons = Math.round(totalLessons * 0.50);
  const buildingLessons = Math.round(totalLessons * 0.35);
  const reinforcementLessons = totalLessons - foundationLessons - buildingLessons;
  
  // Per-week lesson counts
  const lessonsPerFoundationWeek = foundationWeeks > 0 ? Math.ceil(foundationLessons / foundationWeeks) : 0;
  const lessonsPerBuildingWeek = buildingWeeks > 0 ? Math.ceil(buildingLessons / buildingWeeks) : 0;
  const lessonsPerReinforcementWeek = reinforcementWeeks > 0 ? Math.ceil(reinforcementLessons / reinforcementWeeks) : 0;
  
  for (let i = 1; i <= totalWeeks; i++) {
    const weekStart = currentDate;
    const weekEnd = addDays(currentDate, 6);
    const phase = weekPhases[i - 1];
    
    // Calculate goals based on phase
    const weeklyHours = hoursPerDay * studyDaysPerWeek;
    
    let goals = {
      lessons: 0,
      questions: 0,
      flashcards: 0,
      simulations: 0,
      mockExams: 0,
    };
    
    switch (phase) {
      case 'foundation':
        goals = {
          lessons: lessonsPerFoundationWeek,
          questions: Math.round(weeklyHours * 15),
          flashcards: 50,
          simulations: 0,
          mockExams: 0,
        };
        break;
      case 'building':
        goals = {
          lessons: lessonsPerBuildingWeek,
          questions: Math.round(weeklyHours * 20),
          flashcards: 75,
          simulations: 2,
          mockExams: 0,
        };
        break;
      case 'reinforcement':
        goals = {
          lessons: lessonsPerReinforcementWeek,
          questions: Math.round(weeklyHours * 25),
          flashcards: 100,
          simulations: 4,
          mockExams: 0,
        };
        break;
      case 'final-review':
        goals = {
          lessons: 0,
          questions: Math.round(weeklyHours * 20),
          flashcards: 50,
          simulations: 3,
          mockExams: 1,
        };
        break;
      case 'exam-week':
        goals = {
          lessons: 0,
          questions: Math.round(weeklyHours * 10),
          flashcards: 30,
          simulations: 0,
          mockExams: 1,
        };
        break;
    }
    
    weeks.push({
      weekNumber: i,
      startDate: weekStart,
      endDate: weekEnd,
      phase,
      focusTopics: [],
      goals,
    });
    
    currentDate = addDays(weekEnd, 1);
  }
  
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
 */
export function calculatePlanHealth(
  _currentWeek: number,
  _totalWeeks: number,
  lessonsCompleted: number,
  lessonsExpected: number,
  daysStudied: number,
  daysMissed: number
): PlanHealth {
  const progressRatio = lessonsExpected > 0 ? lessonsCompleted / lessonsExpected : 1;
  const attendanceRatio = (daysStudied + daysMissed) > 0 
    ? daysStudied / (daysStudied + daysMissed) 
    : 1;
  
  // Weight attendance (40%) and content progress (60%)
  const overallScore = (attendanceRatio * 0.4) + (progressRatio * 0.6);
  
  if (overallScore >= 0.9) return 'on-track';
  if (overallScore >= 0.75) return 'slightly-behind';
  if (overallScore >= 0.5) return 'behind';
  if (overallScore >= 0.25) return 'at-risk';
  return 'critical';
}

/**
 * Generate a complete study plan
 */
export function generateStudyPlan(
  input: StudyPlanSetupInput,
  userId: string
): StudyPlan {
  const startDate = input.startDate || new Date();
  const totalDays = differenceInDays(input.examDate, startDate);
  
  // Generate reality check
  const realityCheck = generateRealityCheck(input);
  
  // Generate weeks with lesson distribution
  const totalLessons = input.totalLessons || 0;
  const weeks = generateWeeks(
    startDate,
    input.examDate,
    input.hoursPerDay,
    input.studyDaysPerWeek,
    totalLessons
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
    setup: input,
    startDate,
    examDate: input.examDate,
    totalDays,
    totalWeeks: weeks.length,
    hoursPerDay: input.hoursPerDay,
    studyDaysPerWeek: input.studyDaysPerWeek,
    weeks,
    milestones,
    topics: [], // Will be populated based on curriculum
    realityCheck,
    currentPhase,
    currentWeek,
    health: 'on-track', // Initial state
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

/**
 * Generate today's plan from the study plan
 */
export function generateTodaysPlan(studyPlan: StudyPlan): TodaysPlan {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  
  // Find current week
  const currentWeek = studyPlan.weeks.find(w =>
    isWithinInterval(today, { start: w.startDate, end: w.endDate })
  );
  
  if (!currentWeek) {
    // Before plan starts or after exam
    return {
      date: todayStr,
      phase: studyPlan.currentPhase,
      isRestDay: true,
      restDayReason: 'Your study plan hasn\'t started yet or the exam has passed.',
      activities: [],
      estimatedMinutes: 0,
      completedMinutes: 0,
    };
  }
  
  // Check if it's a rest day (based on study days per week)
  const dayOfWeek = today.getDay(); // 0 = Sunday
  // For now, assume study days are Monday-Saturday if 6 days, etc.
  const isRestDay = (7 - studyPlan.studyDaysPerWeek) > (6 - dayOfWeek);
  
  if (isRestDay) {
    return {
      date: todayStr,
      phase: currentWeek.phase,
      isRestDay: true,
      restDayReason: 'Today is a scheduled rest day. Take a break!',
      activities: [],
      estimatedMinutes: 0,
      completedMinutes: 0,
      message: '🧘 Rest is part of the plan. Your brain consolidates learning while you rest.',
    };
  }
  
  // Generate activities based on phase
  const activities: TodayActivity[] = [];
  const dailyHours = studyPlan.hoursPerDay;
  const dailyMinutes = dailyHours * 60;
  
  switch (currentWeek.phase) {
    case 'foundation':
      // 40% lessons, 40% practice, 20% flashcards
      activities.push({
        id: 'lesson-1',
        type: 'lesson',
        title: 'Continue Lessons',
        description: 'Work through your next lesson',
        estimatedMinutes: Math.round(dailyMinutes * 0.4),
        priority: 'required',
        params: { section: studyPlan.section },
        completed: false,
      });
      activities.push({
        id: 'mcq-1',
        type: 'mcq',
        title: 'Practice Questions',
        description: 'Test your knowledge with MCQs',
        estimatedMinutes: Math.round(dailyMinutes * 0.4),
        priority: 'required',
        params: { 
          section: studyPlan.section,
          questionCount: Math.round(dailyMinutes * 0.4 / 2), // ~2 min per question
        },
        completed: false,
      });
      activities.push({
        id: 'flashcards-1',
        type: 'flashcards',
        title: 'Review Flashcards',
        description: 'Reinforce key concepts',
        estimatedMinutes: Math.round(dailyMinutes * 0.2),
        priority: 'recommended',
        params: { section: studyPlan.section },
        completed: false,
      });
      break;
      
    case 'building':
      // 30% lessons, 50% practice, 20% simulations
      activities.push({
        id: 'lesson-1',
        type: 'lesson',
        title: 'Continue Lessons',
        description: 'Expand your knowledge',
        estimatedMinutes: Math.round(dailyMinutes * 0.3),
        priority: 'required',
        params: { section: studyPlan.section },
        completed: false,
      });
      activities.push({
        id: 'mcq-1',
        type: 'mcq',
        title: 'Practice Questions',
        description: 'Build exam readiness',
        estimatedMinutes: Math.round(dailyMinutes * 0.5),
        priority: 'required',
        params: { 
          section: studyPlan.section,
          questionCount: Math.round(dailyMinutes * 0.5 / 2),
        },
        completed: false,
      });
      activities.push({
        id: 'tbs-1',
        type: 'tbs',
        title: 'Task-Based Simulation',
        description: 'Practice exam-style simulations',
        estimatedMinutes: Math.round(dailyMinutes * 0.2),
        priority: 'recommended',
        params: { section: studyPlan.section },
        completed: false,
      });
      break;
      
    case 'reinforcement':
      // 10% lessons, 60% practice, 30% simulations
      activities.push({
        id: 'mcq-1',
        type: 'mcq',
        title: 'Practice Questions',
        description: 'Focus on weak areas',
        estimatedMinutes: Math.round(dailyMinutes * 0.6),
        priority: 'required',
        params: { 
          section: studyPlan.section,
          questionCount: Math.round(dailyMinutes * 0.6 / 2),
        },
        completed: false,
      });
      activities.push({
        id: 'tbs-1',
        type: 'tbs',
        title: 'Task-Based Simulations',
        description: 'Master complex scenarios',
        estimatedMinutes: Math.round(dailyMinutes * 0.3),
        priority: 'required',
        params: { section: studyPlan.section },
        completed: false,
      });
      activities.push({
        id: 'review-1',
        type: 'review',
        title: 'Review Weak Areas',
        description: 'Targeted lesson review',
        estimatedMinutes: Math.round(dailyMinutes * 0.1),
        priority: 'recommended',
        params: { section: studyPlan.section },
        completed: false,
      });
      break;
      
    case 'final-review':
      activities.push({
        id: 'mcq-1',
        type: 'mcq',
        title: 'Timed Practice',
        description: 'Exam-paced questions',
        estimatedMinutes: Math.round(dailyMinutes * 0.5),
        priority: 'required',
        params: { 
          section: studyPlan.section,
          questionCount: Math.round(dailyMinutes * 0.5 / 1.5), // Faster pace
        },
        completed: false,
      });
      activities.push({
        id: 'flashcards-1',
        type: 'flashcards',
        title: 'Quick Review',
        description: 'Refresh key concepts',
        estimatedMinutes: Math.round(dailyMinutes * 0.3),
        priority: 'recommended',
        params: { section: studyPlan.section },
        completed: false,
      });
      activities.push({
        id: 'review-1',
        type: 'review',
        title: 'Weak Area Review',
        description: 'Final polish on trouble spots',
        estimatedMinutes: Math.round(dailyMinutes * 0.2),
        priority: 'optional',
        params: { section: studyPlan.section },
        completed: false,
      });
      break;
      
    case 'exam-week':
      activities.push({
        id: 'review-1',
        type: 'review',
        title: 'Light Review',
        description: 'Gentle refresh only',
        estimatedMinutes: Math.round(dailyMinutes * 0.5),
        priority: 'recommended',
        params: { section: studyPlan.section },
        completed: false,
      });
      activities.push({
        id: 'flashcards-1',
        type: 'flashcards',
        title: 'Key Concepts',
        description: 'High-yield flashcards',
        estimatedMinutes: Math.round(dailyMinutes * 0.3),
        priority: 'optional',
        params: { section: studyPlan.section },
        completed: false,
      });
      break;
  }
  
  const estimatedMinutes = activities.reduce((sum, a) => sum + a.estimatedMinutes, 0);
  
  return {
    date: todayStr,
    phase: currentWeek.phase,
    isRestDay: false,
    activities,
    estimatedMinutes,
    completedMinutes: 0,
    message: getTodayMessage(currentWeek.phase, studyPlan.health),
  };
}

function getTodayMessage(phase: StudyPhase, health: PlanHealth): string {
  if (health === 'critical' || health === 'at-risk') {
    return '⚠️ You\'re falling behind. Let\'s focus on catching up today.';
  }
  
  switch (phase) {
    case 'foundation':
      return '📚 Focus on understanding the concepts. Take your time with lessons.';
    case 'building':
      return '🏗️ You\'re building momentum! Balance learning with practice.';
    case 'reinforcement':
      return '💪 Practice makes perfect. Focus on your weak areas today.';
    case 'final-review':
      return '🎯 Final stretch! Mock exams and targeted review.';
    case 'exam-week':
      return '🌟 Trust your preparation. Light review and stay confident!';
  }
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
    const planKey = `${courseId}_${section}`;
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
    if (plan.weeks) {
      for (const w of plan.weeks) {
        if (w.weekNumber < (currentWeek?.weekNumber || 1)) {
          lessonsExpected += w.goals?.lessons || 0;
        }
      }
      // Add partial week progress
      if (currentWeek) {
        const weekStart = new Date(currentWeek.startDate);
        const dayOfWeek = Math.floor((today.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const weekProgress = Math.min(1, dayOfWeek / 7);
        lessonsExpected += Math.floor((currentWeek.goals?.lessons || 0) * weekProgress);
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
    
    // Recalculate health
    const newHealth = calculatePlanHealth(
      currentWeek?.weekNumber || 1,
      plan.totalWeeks || 1,
      newLessonsCompleted,
      lessonsExpected,
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
    const planKey = `${courseId}_${section}`;
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
    
    // Regenerate remaining weeks
    const newWeeks = generateWeeks(
      today,
      examDate,
      options.newHoursPerDay || plan.hoursPerDay,
      studyDaysPerWeek,
      lessonsRemaining
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
