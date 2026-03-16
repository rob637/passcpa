/**
 * Study Plan Generator v2
 * 
 * A complete rewrite of the study plan generation system.
 * 
 * KEY PRINCIPLES:
 * 1. Content-First: Uses REAL content counts from contentRegistry, not estimates
 * 2. Reactive: Any input change triggers full recalculation
 * 3. Multi-Exam: Works for all 6 supported exams (CPA, EA, CMA, CIA, CISA, CFP)
 * 4. Realistic: Calculations based on actual content + experience level + adaptive learning
 * 
 * INPUTS:
 * - Section (FAR, SEE1, CISA3, etc.)
 * - Exam date
 * - Hours per day available
 * - Days per week available
 * - Experience level (none, some, retake)
 * - Assessment score (optional)
 * - Assessment weak areas (optional)
 * 
 * OUTPUTS:
 * - Weekly study plan with specific goals
 * - Phase-based progression (foundation → building → reinforcement → final review → exam week)
 * - Realistic time estimates
 * - Reality check with actionable recommendations
 */

import { 
  differenceInDays, 
  addDays, 
  format,
} from 'date-fns';
import type { CourseId } from '../types/course';
import {
  getSectionContent,
  calculateSectionStudyHours,
  TIME_CONSTANTS,
  type SectionContentInfo,
  type ContentCounts,
} from './contentRegistry';

// =============================================================================
// TYPES
// =============================================================================

export type StudyPhase = 
  | 'foundation'      // Learn new concepts (high lesson ratio)
  | 'building'        // Expand & practice (balanced)
  | 'reinforcement'   // Heavy practice, weak area focus
  | 'final-review'    // Mock exams, confidence building
  | 'exam-week';      // Light review, rest

export type PlanHealth = 
  | 'on-track'
  | 'slightly-behind'
  | 'behind'
  | 'at-risk'
  | 'critical';

export type RealitySeverity = 'good' | 'tight' | 'challenging' | 'unrealistic';

export interface StudyPlanInput {
  courseId: CourseId;
  section: string;
  examDate: Date;
  startDate?: Date;                   // Default: today
  hoursPerDay: number;                // 0.5 - 10
  studyDaysPerWeek: number;           // 1 - 7
  experience: 'none' | 'some' | 'retake';
  assessmentScore?: number;           // 0-100
  assessmentWeakAreas?: string[];     // Topic IDs that need focus
}

export interface WeeklyGoals {
  lessons: number;
  lessonMinutes: number;
  mcqs: number;
  mcqMinutes: number;
  tbs: number;
  tbsMinutes: number;
  flashcards: number;
  flashcardMinutes: number;
  caseStudies: number;
  caseStudyMinutes: number;
  mockExams: number;
  mockExamMinutes: number;
  totalMinutes: number;
}

export interface StudyPlanWeek {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  phase: StudyPhase;
  phaseWeekNumber: number;            // Week N of M in this phase
  goals: WeeklyGoals;
  focusAreas: string[];               // Blueprint areas or topics
  isCurrentWeek: boolean;
}

export interface StudyPlanMilestone {
  id: string;
  date: Date;
  type: 'phase-start' | 'checkpoint' | 'mock-exam' | 'exam-day';
  label: string;
  description: string;
}

export interface RealityCheck {
  severity: RealitySeverity;
  hoursNeeded: number;
  hoursAvailable: number;
  deficit: number;                    // Positive = short on time
  surplus: number;                    // Positive = extra time
  message: string;
  recommendations: RealityRecommendation[];
}

export interface RealityRecommendation {
  id: string;
  type: 'extend-date' | 'increase-hours' | 'more-days' | 'accept-aggressive' | 'cram-mode';
  label: string;
  description: string;
  impact: string;                     // What this changes
  newValue?: Date | number;
}

export interface StudyPlan {
  // Identity
  id: string;
  courseId: CourseId;
  section: string;
  sectionName: string;
  
  // Input snapshot (for recalculation)
  input: StudyPlanInput;
  
  // Content info
  contentCounts: ContentCounts;
  
  // Time calculations
  hoursNeeded: number;
  hoursAvailable: number;
  
  // Schedule
  startDate: Date;
  examDate: Date;
  totalDays: number;
  totalWeeks: number;
  
  // The plan
  weeks: StudyPlanWeek[];
  milestones: StudyPlanMilestone[];
  currentWeek: number;
  currentPhase: StudyPhase;
  
  // Reality check
  realityCheck: RealityCheck;
  
  // Progress (initialized to zeros)
  progress: {
    lessonsCompleted: number;
    mcqsCompleted: number;
    tbsCompleted: number;
    flashcardsReviewed: number;
    mockExamsTaken: number;
    daysStudied: number;
    daysMissed: number;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

// =============================================================================
// CORE FUNCTIONS
// =============================================================================

/**
 * Generate a complete study plan
 */
export function generateStudyPlan(input: StudyPlanInput): StudyPlan {
  const startDate = input.startDate || new Date();
  
  // Get content information
  const content = getSectionContent(input.section);
  if (!content) {
    throw new Error(`Unknown section: ${input.section}`);
  }
  
  // Calculate time requirements
  const timeCalc = calculateSectionStudyHours(input.section, input.experience);
  const hoursNeeded = adjustForAssessment(timeCalc.total, input.assessmentScore);
  const hoursAvailable = calculateAvailableHours(
    startDate,
    input.examDate,
    input.hoursPerDay,
    input.studyDaysPerWeek
  );
  
  // Generate reality check
  const realityCheck = generateRealityCheck(
    hoursNeeded,
    hoursAvailable,
    input,
    content
  );
  
  // Calculate schedule
  const totalDays = differenceInDays(input.examDate, startDate);
  const totalWeeks = Math.max(1, Math.ceil(totalDays / 7));
  
  // Generate phases
  const phaseAllocation = allocatePhases(totalWeeks, hoursNeeded, hoursAvailable);
  
  // Generate weeks with content distribution
  const weeks = generateWeeks(
    startDate,
    input.examDate,
    input.hoursPerDay,
    input.studyDaysPerWeek,
    input.experience,
    content,
    phaseAllocation,
    input.assessmentWeakAreas
  );
  
  // Generate milestones
  const milestones = generateMilestones(weeks, input.examDate);
  
  // Determine current state
  const currentWeek = getCurrentWeekNumber(weeks, startDate);
  const currentPhase = weeks[currentWeek - 1]?.phase || 'foundation';
  
  return {
    id: generatePlanId(input),
    courseId: input.courseId,
    section: input.section,
    sectionName: content.sectionName,
    input,
    contentCounts: content.counts,
    hoursNeeded,
    hoursAvailable,
    startDate,
    examDate: input.examDate,
    totalDays,
    totalWeeks,
    weeks,
    milestones,
    currentWeek,
    currentPhase,
    realityCheck,
    progress: {
      lessonsCompleted: 0,
      mcqsCompleted: 0,
      tbsCompleted: 0,
      flashcardsReviewed: 0,
      mockExamsTaken: 0,
      daysStudied: 0,
      daysMissed: 0,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 2,
  };
}

/**
 * Recalculate a study plan when inputs change
 */
export function recalculatePlan(
  existingPlan: StudyPlan,
  newInput: Partial<StudyPlanInput>
): StudyPlan {
  // Merge with existing input
  const mergedInput: StudyPlanInput = {
    ...existingPlan.input,
    ...newInput,
  };
  
  // Generate new plan
  const newPlan = generateStudyPlan(mergedInput);
  
  // Preserve progress from existing plan
  newPlan.progress = existingPlan.progress;
  newPlan.createdAt = existingPlan.createdAt;
  
  return newPlan;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function calculateAvailableHours(
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

function adjustForAssessment(baseHours: number, assessmentScore?: number): number {
  if (assessmentScore === undefined) return baseHours;
  
  // High score = knows material, needs less time
  // Low score = needs more time
  // 50% = baseline, no adjustment
  const adjustment = 1 - ((assessmentScore - 50) / 100);
  const clamped = Math.max(0.7, Math.min(1.3, adjustment));
  
  return Math.round(baseHours * clamped);
}

function generateRealityCheck(
  hoursNeeded: number,
  hoursAvailable: number,
  input: StudyPlanInput,
  content: SectionContentInfo
): RealityCheck {
  const deficit = hoursNeeded - hoursAvailable;
  const surplus = hoursAvailable - hoursNeeded;
  const deficitPercent = deficit / hoursNeeded;
  
  const recommendations: RealityRecommendation[] = [];
  let severity: RealitySeverity;
  let message: string;
  
  if (deficit <= 0) {
    // User has enough time
    severity = 'good';
    if (surplus > 20) {
      message = `Excellent! You have ${surplus} extra hours for thorough review. Consider focusing on weak areas or taking additional practice exams.`;
    } else {
      message = `Your schedule works well. You have enough time to cover all ${content.sectionName} material.`;
    }
  } else if (deficitPercent < 0.15) {
    // Slightly tight
    severity = 'tight';
    message = `Your schedule is a bit tight (${hoursAvailable}h available vs ${hoursNeeded}h recommended). With focused study, you can make it work.`;
    
    // Suggest small adjustments
    if (input.hoursPerDay < 4) {
      recommendations.push({
        id: 'increase-hours',
        type: 'increase-hours',
        label: `Study ${Math.ceil(input.hoursPerDay + 0.5)} hours/day`,
        description: 'Add 30 minutes to your daily study time',
        impact: `Adds ${Math.round(deficit / 2)} hours to your schedule`,
        newValue: Math.ceil(input.hoursPerDay + 0.5),
      });
    }
    
    if (input.studyDaysPerWeek < 6) {
      recommendations.push({
        id: 'more-days',
        type: 'more-days',
        label: `Study ${input.studyDaysPerWeek + 1} days/week`,
        description: 'Add one more study day per week',
        impact: `Adds ${Math.round(input.hoursPerDay * 4)} hours total`,
        newValue: input.studyDaysPerWeek + 1,
      });
    }
  } else if (deficitPercent < 0.3) {
    // Challenging but doable
    severity = 'challenging';
    message = `This is an aggressive timeline. You have ${hoursAvailable} hours but typically need ${hoursNeeded}+ for ${content.sectionName}.`;
    
    // Calculate date extension
    const daysNeeded = Math.ceil(deficit / (input.hoursPerDay * input.studyDaysPerWeek / 7));
    const newExamDate = addDays(input.examDate, daysNeeded);
    
    recommendations.push({
      id: 'extend-date',
      type: 'extend-date',
      label: `Move exam to ${format(newExamDate, 'MMM d')}`,
      description: `Add ${daysNeeded} days to your timeline`,
      impact: `Gives you ${deficit} more hours`,
      newValue: newExamDate,
    });
    
    recommendations.push({
      id: 'accept-aggressive',
      type: 'accept-aggressive',
      label: 'Keep my current schedule',
      description: 'Study efficiently with adaptive focus on high-weight topics',
      impact: 'Requires focused, efficient study sessions',
    });
  } else {
    // Unrealistic
    severity = 'unrealistic';
    message = `Your timeline is very aggressive. You have ${hoursAvailable} hours but ${content.sectionName} typically requires ${hoursNeeded}+ hours.`;
    
    // Calculate realistic date
    const daysNeeded = Math.ceil(deficit / (input.hoursPerDay * input.studyDaysPerWeek / 7));
    const newExamDate = addDays(input.examDate, daysNeeded);
    
    recommendations.push({
      id: 'extend-date',
      type: 'extend-date',
      label: `Move exam to ${format(newExamDate, 'MMM d')}`,
      description: 'Recommended: Give yourself more time',
      impact: `Provides ${deficit} more study hours`,
      newValue: newExamDate,
    });
    
    if (input.hoursPerDay < 6) {
      recommendations.push({
        id: 'increase-hours',
        type: 'increase-hours',
        label: 'Study more hours per day',
        description: 'Increase to 4-6 hours daily if possible',
        impact: 'Significant time boost but risk of burnout',
        newValue: Math.min(6, input.hoursPerDay + 2),
      });
    }
    
    recommendations.push({
      id: 'cram-mode',
      type: 'cram-mode',
      label: 'Use Cram Mode',
      description: 'Focus only on highest-weight blueprint areas',
      impact: 'Covers ~80% of exam content in less time',
    });
  }
  
  return {
    severity,
    hoursNeeded,
    hoursAvailable,
    deficit: Math.max(0, deficit),
    surplus: Math.max(0, surplus),
    message,
    recommendations,
  };
}

interface PhaseAllocation {
  phase: StudyPhase;
  weeks: number;
  hoursTarget: number;
}

function allocatePhases(
  totalWeeks: number,
  hoursNeeded: number,
  hoursAvailable: number
): PhaseAllocation[] {
  // Phase distribution percentages (of total time)
  // These are based on research on optimal study patterns
  const phasePercents = {
    foundation: 0.30,       // 30% - Learn new material
    building: 0.25,         // 25% - Expand and practice
    reinforcement: 0.25,    // 25% - Heavy practice
    'final-review': 0.15,   // 15% - Mock exams, consolidation
    'exam-week': 0.05,      // 5% - Light review, rest
  };
  
  // Adjust based on time constraints
  const isConstrained = hoursAvailable < hoursNeeded;
  if (isConstrained) {
    // Less time = compress foundation, more reinforcement
    phasePercents.foundation = 0.25;
    phasePercents.reinforcement = 0.30;
  }
  
  // Calculate weeks per phase
  const allocation: PhaseAllocation[] = [];
  let remainingWeeks = totalWeeks;
  
  // Exam week is always 1 week (minimum)
  if (totalWeeks >= 2) {
    allocation.push({
      phase: 'exam-week',
      weeks: 1,
      hoursTarget: hoursAvailable * phasePercents['exam-week'],
    });
    remainingWeeks -= 1;
  }
  
  // Final review is at least 1 week if we have 3+ weeks
  if (remainingWeeks >= 3) {
    const finalReviewWeeks = Math.max(1, Math.floor(remainingWeeks * 0.15));
    allocation.unshift({
      phase: 'final-review',
      weeks: finalReviewWeeks,
      hoursTarget: hoursAvailable * phasePercents['final-review'],
    });
    remainingWeeks -= finalReviewWeeks;
  }
  
  // Distribute remaining weeks among foundation, building, reinforcement
  if (remainingWeeks >= 3) {
    const foundationWeeks = Math.ceil(remainingWeeks * 0.35);
    const buildingWeeks = Math.ceil(remainingWeeks * 0.30);
    const reinforcementWeeks = remainingWeeks - foundationWeeks - buildingWeeks;
    
    allocation.unshift(
      { phase: 'foundation', weeks: foundationWeeks, hoursTarget: hoursAvailable * phasePercents.foundation },
      { phase: 'building', weeks: buildingWeeks, hoursTarget: hoursAvailable * phasePercents.building },
      { phase: 'reinforcement', weeks: reinforcementWeeks, hoursTarget: hoursAvailable * phasePercents.reinforcement },
    );
  } else if (remainingWeeks >= 2) {
    // Very short timeline: foundation + building
    const foundationWeeks = Math.ceil(remainingWeeks * 0.5);
    const buildingWeeks = remainingWeeks - foundationWeeks;
    
    allocation.unshift(
      { phase: 'foundation', weeks: foundationWeeks, hoursTarget: hoursAvailable * 0.5 },
      { phase: 'building', weeks: buildingWeeks, hoursTarget: hoursAvailable * 0.5 },
    );
  } else if (remainingWeeks >= 1) {
    // Ultra short: just foundation
    allocation.unshift({
      phase: 'foundation',
      weeks: remainingWeeks,
      hoursTarget: hoursAvailable,
    });
  }
  
  return allocation;
}

function generateWeeks(
  startDate: Date,
  _examDate: Date,
  hoursPerDay: number,
  studyDaysPerWeek: number,
  experience: 'none' | 'some' | 'retake',
  content: SectionContentInfo,
  phaseAllocation: PhaseAllocation[],
  weakAreas?: string[]
): StudyPlanWeek[] {
  const weeks: StudyPlanWeek[] = [];
  const totalWeeks = phaseAllocation.reduce((sum, p) => sum + p.weeks, 0);
  const weeklyMinutes = hoursPerDay * studyDaysPerWeek * 60;
  
  // Content distribution ratios by phase
  const phaseRatios: Record<StudyPhase, { lesson: number; mcq: number; tbs: number; flash: number; mock: number }> = {
    'foundation':     { lesson: 0.50, mcq: 0.30, tbs: 0.15, flash: 0.05, mock: 0.00 },
    'building':       { lesson: 0.35, mcq: 0.40, tbs: 0.20, flash: 0.05, mock: 0.00 },
    'reinforcement':  { lesson: 0.15, mcq: 0.45, tbs: 0.30, flash: 0.05, mock: 0.05 },
    'final-review':   { lesson: 0.10, mcq: 0.30, tbs: 0.20, flash: 0.10, mock: 0.30 },
    'exam-week':      { lesson: 0.05, mcq: 0.40, tbs: 0.10, flash: 0.25, mock: 0.20 },
  };
  
  // Calculate total content to distribute
  const totalLessons = content.counts.lessons;
  const totalMcqs = Math.round(content.counts.mcqs * getAdaptiveCoverage(experience));
  const totalTbs = content.counts.tbs;
  const totalFlashcards = content.counts.flashcards;
  const totalCaseStudies = content.counts.caseStudies;
  
  // Track distributed content
  let lessonsRemaining = totalLessons;
  let mcqsRemaining = totalMcqs;
  let tbsRemaining = totalTbs;
  let flashcardsRemaining = totalFlashcards;
  let caseStudiesRemaining = totalCaseStudies;
  
  let currentDate = startDate;
  let weekNumber = 0;
  let phaseWeekCounter: Record<StudyPhase, number> = {
    'foundation': 0,
    'building': 0,
    'reinforcement': 0,
    'final-review': 0,
    'exam-week': 0,
  };
  
  for (const phaseInfo of phaseAllocation) {
    for (let i = 0; i < phaseInfo.weeks; i++) {
      weekNumber++;
      phaseWeekCounter[phaseInfo.phase]++;
      
      const weekStart = currentDate;
      const weekEnd = addDays(currentDate, 6);
      const _isLastWeek = weekNumber === totalWeeks;
      
      // Calculate this week's content allocation
      const remainingWeeks = totalWeeks - weekNumber + 1;
      const ratios = phaseRatios[phaseInfo.phase];
      
      // Distribute lessons (must complete all by end of reinforcement)
      let weekLessons = 0;
      let weekLessonMinutes = 0;
      if (phaseInfo.phase !== 'exam-week' && lessonsRemaining > 0) {
        // Calculate lessons for this week
        if (phaseInfo.phase === 'final-review') {
          // Light review only
          weekLessons = Math.min(lessonsRemaining, Math.ceil(totalLessons * 0.05));
        } else {
          // Distribute evenly among learning weeks
          const learningWeeksRemaining = phaseAllocation
            .filter(p => ['foundation', 'building', 'reinforcement'].includes(p.phase))
            .reduce((sum, p) => sum + p.weeks, 0) - (weekNumber - 1);
          
          weekLessons = Math.ceil(lessonsRemaining / Math.max(1, learningWeeksRemaining));
        }
        weekLessons = Math.min(weekLessons, lessonsRemaining);
        weekLessonMinutes = Math.round(weekLessons * (content.counts.lessonMinutes / totalLessons));
        lessonsRemaining -= weekLessons;
      }
      
      // Calculate remaining time after lessons
      let remainingMinutes = weeklyMinutes - weekLessonMinutes;
      
      // Distribute MCQs
      const mcqMinutes = Math.round(remainingMinutes * ratios.mcq);
      const weekMcqs = Math.min(
        Math.round(mcqMinutes / TIME_CONSTANTS.mcq.firstAttempt),
        mcqsRemaining
      );
      mcqsRemaining -= weekMcqs;
      remainingMinutes -= mcqMinutes;
      
      // Distribute TBS
      const tbsMinutes = Math.round(remainingMinutes * ratios.tbs / (1 - ratios.mcq));
      const weekTbs = Math.min(
        Math.round(tbsMinutes / ((TIME_CONSTANTS.tbs.firstAttempt + TIME_CONSTANTS.tbs.reviewAttempt) / 2)),
        tbsRemaining
      );
      tbsRemaining -= weekTbs;
      
      // Distribute flashcards
      const flashMinutes = Math.round(remainingMinutes * ratios.flash / (1 - ratios.mcq));
      const weekFlashcards = Math.min(
        Math.round(flashMinutes / TIME_CONSTANTS.flashcard.perCard),
        flashcardsRemaining
      );
      flashcardsRemaining -= weekFlashcards;
      
      // Mock exams (1 per week max in final-review/exam-week)
      let weekMockExams = 0;
      let mockExamMinutes = 0;
      if (['final-review', 'exam-week', 'reinforcement'].includes(phaseInfo.phase) && ratios.mock > 0) {
        // Limit mock exams: 2-3 total
        const mockExamsAlreadyScheduled = weeks.filter(w => w.goals.mockExams > 0).length;
        if (mockExamsAlreadyScheduled < 3) {
          weekMockExams = 1;
          mockExamMinutes = TIME_CONSTANTS.mockExam.duration + TIME_CONSTANTS.mockExam.reviewTime;
        }
      }
      
      // Case studies (CFP)
      let weekCaseStudies = 0;
      let caseStudyMinutes = 0;
      if (caseStudiesRemaining > 0) {
        weekCaseStudies = Math.min(
          Math.ceil(caseStudiesRemaining / remainingWeeks),
          caseStudiesRemaining
        );
        caseStudyMinutes = weekCaseStudies * (TIME_CONSTANTS.caseStudy.firstAttempt + TIME_CONSTANTS.caseStudy.reviewAttempt) / 2;
        caseStudiesRemaining -= weekCaseStudies;
      }
      
      const goals: WeeklyGoals = {
        lessons: weekLessons,
        lessonMinutes: weekLessonMinutes,
        mcqs: weekMcqs,
        mcqMinutes: Math.round(weekMcqs * TIME_CONSTANTS.mcq.firstAttempt),
        tbs: weekTbs,
        tbsMinutes: Math.round(weekTbs * (TIME_CONSTANTS.tbs.firstAttempt + TIME_CONSTANTS.tbs.reviewAttempt) / 2),
        flashcards: weekFlashcards,
        flashcardMinutes: Math.round(weekFlashcards * TIME_CONSTANTS.flashcard.perCard),
        caseStudies: weekCaseStudies,
        caseStudyMinutes: Math.round(caseStudyMinutes),
        mockExams: weekMockExams,
        mockExamMinutes,
        totalMinutes: weekLessonMinutes + 
          Math.round(weekMcqs * TIME_CONSTANTS.mcq.firstAttempt) + 
          Math.round(weekTbs * 15) + 
          Math.round(weekFlashcards * TIME_CONSTANTS.flashcard.perCard) +
          Math.round(caseStudyMinutes) +
          mockExamMinutes,
      };
      
      weeks.push({
        weekNumber,
        startDate: weekStart,
        endDate: weekEnd,
        phase: phaseInfo.phase,
        phaseWeekNumber: phaseWeekCounter[phaseInfo.phase],
        goals,
        focusAreas: weakAreas?.slice(0, 3) || [],
        isCurrentWeek: false, // Will be set when determining current state
      });
      
      currentDate = addDays(weekEnd, 1);
    }
  }
  
  return weeks;
}

function getAdaptiveCoverage(experience: 'none' | 'some' | 'retake'): number {
  return TIME_CONSTANTS.adaptive[`mcqCoverage${capitalize(experience)}` as keyof typeof TIME_CONSTANTS.adaptive] as number;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generateMilestones(weeks: StudyPlanWeek[], examDate: Date): StudyPlanMilestone[] {
  const milestones: StudyPlanMilestone[] = [];
  
  // Phase start milestones
  let currentPhase: StudyPhase | null = null;
  for (const week of weeks) {
    if (week.phase !== currentPhase) {
      milestones.push({
        id: `phase-${week.phase}`,
        date: week.startDate,
        type: 'phase-start',
        label: getPhaseLabel(week.phase),
        description: getPhaseDescription(week.phase),
      });
      currentPhase = week.phase;
    }
  }
  
  // Progress checkpoints at 25%, 50%, 75%
  const totalWeeks = weeks.length;
  [0.25, 0.5, 0.75].forEach((pct, i) => {
    const weekNum = Math.round(totalWeeks * pct);
    if (weekNum > 0 && weekNum <= totalWeeks) {
      const week = weeks[weekNum - 1];
      milestones.push({
        id: `checkpoint-${i + 1}`,
        date: week.endDate,
        type: 'checkpoint',
        label: `${Math.round(pct * 100)}% Progress Check`,
        description: 'Review your progress and adjust if needed',
      });
    }
  });
  
  // Mock exam milestones
  weeks.forEach(week => {
    if (week.goals.mockExams > 0) {
      milestones.push({
        id: `mock-${week.weekNumber}`,
        date: week.startDate,
        type: 'mock-exam',
        label: 'Mock Exam',
        description: 'Full-length practice exam under test conditions',
      });
    }
  });
  
  // Exam day
  milestones.push({
    id: 'exam-day',
    date: examDate,
    type: 'exam-day',
    label: 'Exam Day! 🎯',
    description: 'You\'ve prepared well. Trust your knowledge!',
  });
  
  return milestones.sort((a, b) => a.date.getTime() - b.date.getTime());
}

function getPhaseLabel(phase: StudyPhase): string {
  const labels: Record<StudyPhase, string> = {
    'foundation': 'Foundation Phase',
    'building': 'Building Phase',
    'reinforcement': 'Reinforcement Phase',
    'final-review': 'Final Review',
    'exam-week': 'Exam Week',
  };
  return labels[phase];
}

function getPhaseDescription(phase: StudyPhase): string {
  const descriptions: Record<StudyPhase, string> = {
    'foundation': 'Focus on learning new concepts through lessons and light practice',
    'building': 'Expand your knowledge with more practice and simulations',
    'reinforcement': 'Heavy practice mode - focus on weak areas and build speed',
    'final-review': 'Mock exams, review key concepts, build confidence',
    'exam-week': 'Light review only - rest and mental preparation',
  };
  return descriptions[phase];
}

function getCurrentWeekNumber(weeks: StudyPlanWeek[], today: Date): number {
  for (const week of weeks) {
    if (today >= week.startDate && today <= week.endDate) {
      return week.weekNumber;
    }
  }
  return 1; // Default to first week if before start
}

function generatePlanId(input: StudyPlanInput): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${input.courseId}-${input.section}-${timestamp}-${random}`;
}

// =============================================================================
// VALIDATION
// =============================================================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateInput(input: StudyPlanInput): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const startDate = input.startDate || new Date();
  const daysUntilExam = differenceInDays(input.examDate, startDate);
  
  // Content validation
  const content = getSectionContent(input.section);
  if (!content) {
    errors.push(`Section "${input.section}" not found`);
  }
  
  // Date validation
  if (daysUntilExam < 1) {
    errors.push('Exam date must be in the future');
  } else if (daysUntilExam < 7) {
    warnings.push(`Only ${daysUntilExam} days until exam - this is a very short timeline`);
  } else if (daysUntilExam < 14) {
    warnings.push(`${daysUntilExam} days is a tight timeline - be prepared for intensive study`);
  }
  
  // Hours validation
  if (input.hoursPerDay < 0.5) {
    errors.push('Study time must be at least 30 minutes per day');
  } else if (input.hoursPerDay > 10) {
    errors.push('Daily study time cannot exceed 10 hours');
  } else if (input.hoursPerDay > 6) {
    warnings.push('Studying more than 6 hours/day increases burnout risk');
  } else if (input.hoursPerDay < 1) {
    warnings.push('Less than 1 hour/day may not provide consistent progress');
  }
  
  // Days per week validation
  if (input.studyDaysPerWeek < 1 || input.studyDaysPerWeek > 7) {
    errors.push('Study days must be between 1 and 7 per week');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// =============================================================================
// RE-EXPORTS FROM CONTENT REGISTRY
// =============================================================================

// Re-export content registry functions for convenience
export {
  getSectionContent,
  calculateSectionStudyHours,
  getExamTotals,
  compareWithIndustry,
  getExamSections,
  TIME_CONSTANTS,
  type SectionContentInfo,
  type ContentCounts,
} from './contentRegistry';

