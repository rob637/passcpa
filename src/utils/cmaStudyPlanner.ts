/**
 * CMA Study Plan Generator
 * 
 * Creates personalized study schedules for the Certified Management Accountant exam.
 * Generates a plan that covers both CMA parts with appropriate time allocation.
 */

import { differenceInDays, addDays, format, isBefore, isAfter } from 'date-fns';
import { CMASectionId, CMA_SECTION_CONFIG } from '../courses/cma';

// Types
export interface CMAStudyPlanSection {
  sectionId: CMASectionId;
  name: string;
  startDate: Date;
  endDate: Date;
  daysAllocated: number;
  questionsPerDay: number;
  lessonsPerDay: number;
  examDate?: Date;
}

export interface CMAStudyPlanMilestone {
  date: Date;
  dateStr: string;
  label: string;
  type: 'start' | 'section-complete' | 'review-start' | 'exam' | 'checkpoint';
  sectionId?: CMASectionId;
  position: number; // 0-100 for timeline display
}

export interface CMAWeeklySchedule {
  monday: CMADayPlan;
  tuesday: CMADayPlan;
  wednesday: CMADayPlan;
  thursday: CMADayPlan;
  friday: CMADayPlan;
  saturday: CMADayPlan;
  sunday: CMADayPlan;
}

export interface CMADailyGoals {
    questions: number;
    hours: number;
    lessons: number;
}

export interface CMADayPlan {
  available: boolean;
  hours: number;
}

export interface CMAStudyPlan {
  id: string;
  createdAt: Date;
  examDates: Record<CMASectionId, Date | null>;
  firstExamDate: Date | null;
  lastExamDate: Date | null;
  totalDays: number;
  hoursPerDay: number;
  sections: CMAStudyPlanSection[];
  milestones: CMAStudyPlanMilestone[];
  weeklySchedule: CMAWeeklySchedule;
  dailyGoals: CMADailyGoals;
}

// Constants
export const CMA_RECOMMENDED_HOURS = {
  CMA1: 150, // Part 1: Financial Planning, Performance, and Analytics
  CMA2: 120, // Part 2: Strategic Financial Management
};

export const CMA_QUESTIONS_COUNT = {
  CMA1: 1800, // Est total questions
  CMA2: 1500, // Est total questions
};

export const DEFAULT_WEEKLY_SCHEDULE: CMAWeeklySchedule = {
  monday: { available: true, hours: 2 },
  tuesday: { available: true, hours: 2 },
  wednesday: { available: true, hours: 2 },
  thursday: { available: true, hours: 2 },
  friday: { available: true, hours: 1 },
  saturday: { available: true, hours: 4 },
  sunday: { available: false, hours: 0 },
};

export function generateCMAStudyPlan(
  examDates: Record<CMASectionId, Date | null>,
  weeklySchedule: CMAWeeklySchedule = DEFAULT_WEEKLY_SCHEDULE
): CMAStudyPlan {
  const now = new Date();
  const sortedSectionIds = (Object.keys(examDates) as CMASectionId[])
    .filter(id => examDates[id] !== null)
    .sort((a, b) => (examDates[a]?.getTime() || 0) - (examDates[b]?.getTime() || 0));

  const firstExamDate = sortedSectionIds.length > 0 ? examDates[sortedSectionIds[0]] : null;
  const lastExamDate = sortedSectionIds.length > 0 ? examDates[sortedSectionIds[sortedSectionIds.length - 1]] : null;
  
  // Calculate total study hours available per week
  let weeklyHours = 0;
  Object.values(weeklySchedule).forEach(day => {
    if (day.available) weeklyHours += day.hours;
  });

  // Calculate generic daily average for stats
  const avgHoursPerDay = weeklyHours / 7;

  // Generate Sections
  const sections: CMAStudyPlanSection[] = [];
  const milestones: CMAStudyPlanMilestone[] = [];
  let currentStartDate = now;

  // Add "Plan Start" milestone
  milestones.push({
    date: now,
    dateStr: format(now, 'yyyy-MM-dd'),
    label: 'Start Study Plan',
    type: 'start',
    position: 0,
  });

  sortedSectionIds.forEach(sectionId => {
    const examDate = examDates[sectionId];
    if (!examDate) return;

    // Days between current start and this exam
    // Reserve 14 days for review before exam
    const reviewDays = 14;
    const studyEndDate = addDays(examDate, -reviewDays);
    
    // Ensure we have reasonable time, else warn/compress (logic simplified here)
    if (isBefore(studyEndDate, currentStartDate)) {
       // Warn: Not enough time!
    }

    const availableDays = Math.max(1, differenceInDays(studyEndDate, currentStartDate));
    
    // Calculate intensity
    // Total questions / available days
    const totalQuestions = CMA_QUESTIONS_COUNT[sectionId];
    const questionsPerDay = Math.ceil(totalQuestions / availableDays);
    
    // Lessons (approx 50 per part)
    const totalLessons = 50; 
    const lessonsPerDay = Number((totalLessons / availableDays).toFixed(1));

    sections.push({
      sectionId,
      name: CMA_SECTION_CONFIG[sectionId].name,
      startDate: currentStartDate,
      endDate: examDate,
      daysAllocated: availableDays + reviewDays,
      questionsPerDay,
      lessonsPerDay,
      examDate,
    });

    // Add milestones
    milestones.push({
      date: studyEndDate,
      dateStr: format(studyEndDate, 'yyyy-MM-dd'),
      label: `Begin ${sectionId} Review`,
      type: 'review-start',
      sectionId,
      position: 0, // Recalc later
    });

    milestones.push({
      date: examDate,
      dateStr: format(examDate, 'yyyy-MM-dd'),
      label: `${sectionId} Exam Day`,
      type: 'exam',
      sectionId,
      position: 0, // Recalc later
    });

    // Next section starts after this exam + 1 day break
    currentStartDate = addDays(examDate, 2);
  });

  // Normalize Milestone Positions
  if (firstExamDate && lastExamDate) {
    const totalDuration = differenceInDays(lastExamDate, now);
    milestones.forEach(m => {
      const dayOffset = differenceInDays(m.date, now);
      m.position = Math.min(100, Math.max(0, (dayOffset / totalDuration) * 100));
    });
  }

  // Calculate daily goals (weighted average of active section)
  // For simplicity, take the first active section
  const currentSection = sections[0];
  const dailyGoals: CMADailyGoals = {
    questions: currentSection ? currentSection.questionsPerDay : 20,
    hours: avgHoursPerDay,
    lessons: currentSection ? Math.ceil(currentSection.lessonsPerDay) : 1,
  };

  return {
    id: `cma-plan-${Date.now()}`,
    createdAt: now,
    examDates,
    firstExamDate,
    lastExamDate,
    totalDays: lastExamDate ? differenceInDays(lastExamDate, now) : 0,
    hoursPerDay: avgHoursPerDay,
    sections,
    milestones: milestones.sort((a, b) => a.date.getTime() - b.date.getTime()),
    weeklySchedule,
    dailyGoals,
  };
}

export function getStudyPlanSummary(plan: CMAStudyPlan) {
  return {
    totalSections: plan.sections.length,
    finalExamDate: plan.lastExamDate,
    dailyCommitment: `${Math.round(plan.hoursPerDay * 10) / 10} hours/day`,
    topDailyGoal: `${plan.dailyGoals.questions} questions`,
  };
}
