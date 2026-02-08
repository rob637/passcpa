/**
 * EA Study Plan Generator
 * 
 * Creates personalized study schedules for the Enrolled Agent exam.
 * Generates a plan that covers all 3 SEE parts with appropriate time allocation.
 */

import { differenceInDays, addDays, format, isBefore, isAfter } from 'date-fns';
import { EASectionId, EA_SECTION_CONFIG } from '../courses/ea';

// Types
export interface EAStudyPlanSection {
  sectionId: EASectionId;
  name: string;
  startDate: Date;
  endDate: Date;
  daysAllocated: number;
  questionsPerDay: number;
  lessonsPerDay: number;
  examDate?: Date;
}

export interface EAStudyPlanMilestone {
  date: Date;
  dateStr: string;
  label: string;
  type: 'start' | 'section-complete' | 'review-start' | 'exam' | 'checkpoint';
  sectionId?: EASectionId;
  position: number; // 0-100 for timeline display
}

export interface EAStudyPlan {
  id: string;
  createdAt: Date;
  examDates: Record<EASectionId, Date | null>;
  firstExamDate: Date | null;
  lastExamDate: Date | null;
  totalDays: number;
  hoursPerDay: number;
  sections: EAStudyPlanSection[];
  milestones: EAStudyPlanMilestone[];
  weeklySchedule: EAWeeklySchedule;
  dailyGoals: EADailyGoals;
}

export interface EAWeeklySchedule {
  monday: EADayPlan;
  tuesday: EADayPlan;
  wednesday: EADayPlan;
  thursday: EADayPlan;
  friday: EADayPlan;
  saturday: EADayPlan;
  sunday: EADayPlan;
}

export interface EADayPlan {
  isStudyDay: boolean;
  hoursPlanned: number;
  focusSections: EASectionId[];
  activities: EAActivity[];
}

export interface EAActivity {
  type: 'lessons' | 'practice' | 'flashcards' | 'exam-simulation' | 'review';
  duration: number; // minutes
  sectionId?: EASectionId;
}

export interface EADailyGoals {
  questionsPerDay: number;
  lessonsPerDay: number;
  flashcardsPerDay: number;
  studyMinutesPerDay: number;
}

export interface EAStudyPlanInput {
  examDates: Partial<Record<EASectionId, Date>>;
  hoursPerDay: number;
  studyDaysPerWeek: number;
  currentProgress?: Partial<Record<EASectionId, number>>; // 0-100 progress
  preferredStartTime?: string; // e.g., "09:00"
  weakAreas?: string[];
}

// Constants
const EA_LESSONS_PER_SECTION = 12;
const EA_TARGET_QUESTIONS_PER_SECTION = 500;
const EA_REVIEW_DAYS = 7; // Days before exam for final review

/**
 * Generate an EA study plan based on exam dates and preferences
 */
export function generateEAStudyPlan(input: EAStudyPlanInput): EAStudyPlan {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Normalize exam dates
  const examDates: Record<EASectionId, Date | null> = {
    SEE1: input.examDates.SEE1 || null,
    SEE2: input.examDates.SEE2 || null,
    SEE3: input.examDates.SEE3 || null,
  };

  // Find first and last exam dates
  const validDates = Object.values(examDates).filter((d): d is Date => d !== null);
  const firstExamDate = validDates.length > 0 
    ? validDates.reduce((min, d) => isBefore(d, min) ? d : min)
    : null;
  const lastExamDate = validDates.length > 0
    ? validDates.reduce((max, d) => isAfter(d, max) ? d : max)
    : null;

  const totalDays = lastExamDate ? Math.max(1, differenceInDays(lastExamDate, today)) : 90;

  // Calculate section allocations
  const sections = calculateSectionAllocations(
    today,
    examDates,
    input.hoursPerDay,
    input.currentProgress
  );

  // Generate milestones
  const milestones = generateMilestones(today, sections, examDates, totalDays);

  // Generate weekly schedule
  const weeklySchedule = generateWeeklySchedule(
    input.hoursPerDay,
    input.studyDaysPerWeek,
    sections
  );

  // Calculate daily goals
  const dailyGoals = calculateDailyGoals(sections, input.hoursPerDay, input.studyDaysPerWeek);

  return {
    id: `ea-plan-${Date.now()}`,
    createdAt: today,
    examDates,
    firstExamDate,
    lastExamDate,
    totalDays,
    hoursPerDay: input.hoursPerDay,
    sections,
    milestones,
    weeklySchedule,
    dailyGoals,
  };
}

/**
 * Calculate how many days to allocate to each section
 */
function calculateSectionAllocations(
  startDate: Date,
  examDates: Record<EASectionId, Date | null>,
  _hoursPerDay: number,
  currentProgress?: Partial<Record<EASectionId, number>>
): EAStudyPlanSection[] {
  const sections: EAStudyPlanSection[] = [];
  let currentDate = new Date(startDate);

  // Sort sections by exam date (earliest first), then by order
  const orderedSections: EASectionId[] = ['SEE1', 'SEE2', 'SEE3'];
  
  orderedSections.sort((a, b) => {
    const dateA = examDates[a];
    const dateB = examDates[b];
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return differenceInDays(dateA, dateB);
  });

  for (const sectionId of orderedSections) {
    const examDate = examDates[sectionId];
    const config = EA_SECTION_CONFIG[sectionId];
    const progress = currentProgress?.[sectionId] || 0;
    
    // Calculate remaining work
    const remainingWork = 1 - (progress / 100);
    
    // Determine study period
    let daysForSection: number;
    let endDate: Date;
    
    if (examDate) {
      // Calculate days until this exam (minus review period)
      const daysUntilExam = differenceInDays(examDate, currentDate);
      daysForSection = Math.max(7, daysUntilExam - EA_REVIEW_DAYS);
      endDate = addDays(currentDate, daysForSection);
    } else {
      // No exam date set - allocate 30 days by default
      daysForSection = Math.floor(30 * remainingWork);
      daysForSection = Math.max(14, daysForSection);
      endDate = addDays(currentDate, daysForSection);
    }

    // Calculate daily workload
    const questionsRemaining = Math.ceil(EA_TARGET_QUESTIONS_PER_SECTION * remainingWork);
    const lessonsRemaining = Math.ceil(EA_LESSONS_PER_SECTION * remainingWork);
    
    const questionsPerDay = Math.ceil(questionsRemaining / daysForSection);
    const lessonsPerDay = Math.max(1, Math.ceil(lessonsRemaining / daysForSection));

    sections.push({
      sectionId,
      name: config.name,
      startDate: new Date(currentDate),
      endDate,
      daysAllocated: daysForSection,
      questionsPerDay,
      lessonsPerDay,
      examDate: examDate || undefined,
    });

    // Move to next section
    currentDate = addDays(endDate, 1);
  }

  return sections;
}

/**
 * Generate milestones for the study plan
 */
function generateMilestones(
  startDate: Date,
  sections: EAStudyPlanSection[],
  examDates: Record<EASectionId, Date | null>,
  totalDays: number
): EAStudyPlanMilestone[] {
  const milestones: EAStudyPlanMilestone[] = [];
  
  // Start milestone
  milestones.push({
    date: startDate,
    dateStr: format(startDate, 'MMM d'),
    label: 'Start Study Plan',
    type: 'start',
    position: 0,
  });

  // Section completion milestones
  for (const section of sections) {
    const position = (differenceInDays(section.endDate, startDate) / totalDays) * 100;
    
    milestones.push({
      date: section.endDate,
      dateStr: format(section.endDate, 'MMM d'),
      label: `${section.sectionId} Content Complete`,
      type: 'section-complete',
      sectionId: section.sectionId,
      position: Math.min(95, position),
    });
  }

  // Exam milestones
  for (const [sectionId, examDate] of Object.entries(examDates)) {
    if (examDate) {
      const reviewStart = addDays(examDate, -EA_REVIEW_DAYS);
      const position = (differenceInDays(examDate, startDate) / totalDays) * 100;
      
      // Review start
      if (isAfter(reviewStart, startDate)) {
        milestones.push({
          date: reviewStart,
          dateStr: format(reviewStart, 'MMM d'),
          label: `${sectionId} Final Review`,
          type: 'review-start',
          sectionId: sectionId as EASectionId,
          position: Math.max(0, position - 5),
        });
      }
      
      // Exam day
      milestones.push({
        date: examDate,
        dateStr: format(examDate, 'MMM d'),
        label: `${sectionId} Exam`,
        type: 'exam',
        sectionId: sectionId as EASectionId,
        position: Math.min(100, position),
      });
    }
  }

  // Sort by date
  milestones.sort((a, b) => differenceInDays(a.date, b.date));

  return milestones;
}

/**
 * Generate a weekly schedule template
 */
function generateWeeklySchedule(
  hoursPerDay: number,
  studyDaysPerWeek: number,
  sections: EAStudyPlanSection[]
): EAWeeklySchedule {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  const currentSection = sections[0]?.sectionId || 'SEE1';
  
  const createDayPlan = (isStudyDay: boolean): EADayPlan => {
    if (!isStudyDay) {
      return {
        isStudyDay: false,
        hoursPlanned: 0,
        focusSections: [],
        activities: [],
      };
    }

    const activities: EAActivity[] = [
      { type: 'lessons', duration: Math.floor(hoursPerDay * 60 * 0.3), sectionId: currentSection },
      { type: 'practice', duration: Math.floor(hoursPerDay * 60 * 0.4), sectionId: currentSection },
      { type: 'flashcards', duration: Math.floor(hoursPerDay * 60 * 0.2), sectionId: currentSection },
      { type: 'review', duration: Math.floor(hoursPerDay * 60 * 0.1) },
    ];

    return {
      isStudyDay: true,
      hoursPlanned: hoursPerDay,
      focusSections: [currentSection],
      activities,
    };
  };

  // Determine which days are study days
  const studyDayIndices = studyDaysPerWeek >= 7 
    ? [0, 1, 2, 3, 4, 5, 6]
    : studyDaysPerWeek >= 5
      ? [0, 1, 2, 3, 4] // Weekdays
      : [0, 1, 2, 3, 4].slice(0, studyDaysPerWeek); // First N weekdays

  const schedule: Record<string, EADayPlan> = {};
  
  for (let i = 0; i < days.length; i++) {
    schedule[days[i]] = createDayPlan(studyDayIndices.includes(i));
  }

  return schedule as unknown as EAWeeklySchedule;
}

/**
 * Calculate recommended daily goals
 */
function calculateDailyGoals(
  sections: EAStudyPlanSection[],
  hoursPerDay: number,
  _studyDaysPerWeek: number
): EADailyGoals {
  // Average across sections
  const avgQuestionsPerDay = Math.round(
    sections.reduce((sum, s) => sum + s.questionsPerDay, 0) / sections.length
  );
  const avgLessonsPerDay = Math.round(
    sections.reduce((sum, s) => sum + s.lessonsPerDay, 0) / sections.length
  );

  // Calculate based on available time
  const studyMinutesPerDay = hoursPerDay * 60;
  
  // Flashcards: ~15 min for 20 cards
  const flashcardsPerDay = Math.max(10, Math.floor(studyMinutesPerDay * 0.15));

  return {
    questionsPerDay: Math.max(10, avgQuestionsPerDay),
    lessonsPerDay: Math.max(1, avgLessonsPerDay),
    flashcardsPerDay,
    studyMinutesPerDay,
  };
}

/**
 * Get a text summary of the study plan
 */
export function getStudyPlanSummary(plan: EAStudyPlan): string {
  const sections = plan.sections.map(s => 
    `${s.sectionId}: ${s.daysAllocated} days (${s.questionsPerDay} Q/day)`
  ).join(', ');

  return `${plan.totalDays} days total | ${plan.hoursPerDay}h/day | ${sections}`;
}

/**
 * Check if user is on track with their study plan
 */
export function getStudyPlanStatus(
  plan: EAStudyPlan,
  currentProgress: Record<EASectionId, number>
): {
  status: 'ahead' | 'on-track' | 'behind' | 'significantly-behind';
  message: string;
  adjustments: string[];
} {
  const today = new Date();
  const adjustments: string[] = [];
  let totalDiff = 0;

  for (const section of plan.sections) {
    if (isAfter(today, section.endDate)) continue;
    if (isBefore(today, section.startDate)) continue;

    const daysElapsed = differenceInDays(today, section.startDate);
    const expectedProgress = Math.min(100, (daysElapsed / section.daysAllocated) * 100);
    const actualProgress = currentProgress[section.sectionId] || 0;
    const diff = actualProgress - expectedProgress;
    totalDiff += diff;

    if (diff < -20) {
      adjustments.push(`Increase ${section.sectionId} daily practice to catch up`);
    }
  }

  const avgDiff = totalDiff / plan.sections.length;

  if (avgDiff >= 10) {
    return { status: 'ahead', message: 'Great job! You\'re ahead of schedule', adjustments };
  } else if (avgDiff >= -10) {
    return { status: 'on-track', message: 'You\'re on track with your study plan', adjustments };
  } else if (avgDiff >= -25) {
    return { status: 'behind', message: 'Slightly behind - increase daily study time', adjustments };
  } else {
    return { status: 'significantly-behind', message: 'Need to significantly increase pace', adjustments };
  }
}

export default {
  generateEAStudyPlan,
  getStudyPlanSummary,
  getStudyPlanStatus,
};
