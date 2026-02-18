/**
 * CPA Study Plan Generator
 * 
 * Creates personalized study schedules for the CPA exam.
 * Handles the unique CPA structure: 3 Core sections + 1 Discipline choice.
 */

import { differenceInDays, addDays, format, isBefore, isAfter } from 'date-fns';
import type { 
  CPASectionId, 
  CPADisciplineSectionId,
} from '../courses/cpa';
import { 
  CPA_SECTION_CONFIG,
  CPA_CORE_SECTIONS,
} from '../courses/cpa';

// Types
export interface CPAStudyPlanSection {
  sectionId: CPASectionId;
  name: string;
  startDate: Date;
  endDate: Date;
  daysAllocated: number;
  questionsPerDay: number;
  lessonsPerDay: number;
  examDate?: Date;
  isCore: boolean;
}

export interface CPAStudyPlanMilestone {
  date: Date;
  dateStr: string;
  label: string;
  type: 'start' | 'section-complete' | 'review-start' | 'exam' | 'checkpoint';
  sectionId?: CPASectionId;
  position: number; // 0-100 for timeline display
}

export interface CPAStudyPlan {
  id: string;
  createdAt: Date;
  examDates: Record<CPASectionId, Date | null>;
  discipline: CPADisciplineSectionId | null;
  firstExamDate: Date | null;
  lastExamDate: Date | null;
  totalDays: number;
  hoursPerDay: number;
  sections: CPAStudyPlanSection[];
  milestones: CPAStudyPlanMilestone[];
  weeklySchedule: CPAWeeklySchedule;
  dailyGoals: CPADailyGoals;
}

export interface CPAWeeklySchedule {
  monday: CPADayPlan;
  tuesday: CPADayPlan;
  wednesday: CPADayPlan;
  thursday: CPADayPlan;
  friday: CPADayPlan;
  saturday: CPADayPlan;
  sunday: CPADayPlan;
}

export interface CPADayPlan {
  isStudyDay: boolean;
  hoursPlanned: number;
  focusSections: CPASectionId[];
  activities: CPAActivity[];
}

export interface CPAActivity {
  type: 'lessons' | 'practice' | 'flashcards' | 'exam-simulation' | 'review' | 'tbs';
  duration: number; // minutes
  sectionId?: CPASectionId;
}

export interface CPADailyGoals {
  questionsPerDay: number;
  lessonsPerDay: number;
  flashcardsPerDay: number;
  tbsPerWeek: number;
  studyMinutesPerDay: number;
}

export interface CPAStudyPlanInput {
  examDates: Partial<Record<CPASectionId, Date>>;
  discipline: CPADisciplineSectionId | null;
  hoursPerDay: number;
  studyDaysPerWeek: number;
  currentProgress?: Partial<Record<CPASectionId, number>>; // 0-100 progress
  preferredStartTime?: string; // e.g., "09:00"
  weakAreas?: string[];
}

// Constants - CPA has more content than EA
const CPA_LESSONS_PER_SECTION = 30; // Average per section
const CPA_TARGET_QUESTIONS_PER_SECTION = 800;
const CPA_REVIEW_DAYS = 10; // Days before exam for final review
const CPA_TBS_PER_SECTION = 50; // Task-Based Simulations

// Recommended study hours per section
const CPA_SECTION_HOURS: Record<CPASectionId, number> = {
  FAR: 120, // Most content
  AUD: 90,
  REG: 100,
  BAR: 80,
  ISC: 80,
  TCP: 80,
};

/**
 * Generate a CPA study plan based on exam dates and preferences
 */
export function generateCPAStudyPlan(input: CPAStudyPlanInput): CPAStudyPlan {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get active sections (3 core + chosen discipline)
  const activeSections: CPASectionId[] = [...CPA_CORE_SECTIONS];
  if (input.discipline) {
    activeSections.push(input.discipline);
  }

  // Normalize exam dates
  const examDates: Record<CPASectionId, Date | null> = {
    FAR: input.examDates.FAR || null,
    AUD: input.examDates.AUD || null,
    REG: input.examDates.REG || null,
    BAR: input.examDates.BAR || null,
    ISC: input.examDates.ISC || null,
    TCP: input.examDates.TCP || null,
  };

  // Find first and last exam dates
  const validDates = Object.entries(examDates)
    .filter(([id, d]) => d !== null && activeSections.includes(id as CPASectionId))
    .map(([_, d]) => d as Date);
  
  const firstExamDate = validDates.length > 0 
    ? validDates.reduce((min, d) => isBefore(d, min) ? d : min)
    : null;
  const lastExamDate = validDates.length > 0
    ? validDates.reduce((max, d) => isAfter(d, max) ? d : max)
    : null;

  const totalDays = lastExamDate ? Math.max(1, differenceInDays(lastExamDate, today)) : 180;

  // Calculate section allocations
  const sections = calculateSectionAllocations(
    today,
    examDates,
    activeSections,
    input.hoursPerDay,
    input.currentProgress
  );

  // Generate milestones
  const milestones = generateMilestones(sections, examDates, today, lastExamDate);

  // Create weekly schedule
  const weeklySchedule = createWeeklySchedule(
    input.hoursPerDay,
    input.studyDaysPerWeek,
    sections
  );

  // Calculate daily goals
  const dailyGoals = calculateDailyGoals(
    input.hoursPerDay,
    totalDays,
    sections.length
  );

  return {
    id: `cpa-plan-${Date.now()}`,
    createdAt: new Date(),
    examDates,
    discipline: input.discipline,
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

function calculateSectionAllocations(
  startDate: Date,
  examDates: Record<CPASectionId, Date | null>,
  activeSections: CPASectionId[],
  hoursPerDay: number,
  currentProgress?: Partial<Record<CPASectionId, number>>
): CPAStudyPlanSection[] {
  const sections: CPAStudyPlanSection[] = [];
  
  // Sort sections by exam date (nulls last)
  const sortedSections = activeSections.sort((a, b) => {
    const dateA = examDates[a];
    const dateB = examDates[b];
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return dateA.getTime() - dateB.getTime();
  });

  let currentStart = startDate;

  for (const sectionId of sortedSections) {
    const config = CPA_SECTION_CONFIG[sectionId];
    const examDate = examDates[sectionId];
    
    // Calculate study hours needed
    const baseHours = CPA_SECTION_HOURS[sectionId];
    const progressPct = currentProgress?.[sectionId] || 0;
    const remainingHours = baseHours * (1 - progressPct / 100);
    
    // Calculate days needed
    const daysNeeded = Math.ceil(remainingHours / hoursPerDay);
    
    // If we have an exam date, work backwards
    let sectionStart = currentStart;
    let sectionEnd: Date;
    
    if (examDate) {
      sectionEnd = addDays(examDate, -CPA_REVIEW_DAYS);
      sectionStart = addDays(sectionEnd, -daysNeeded);
      if (isBefore(sectionStart, currentStart)) {
        sectionStart = currentStart;
      }
    } else {
      sectionEnd = addDays(currentStart, daysNeeded);
    }
    
    const daysAllocated = Math.max(1, differenceInDays(sectionEnd, sectionStart));
    
    sections.push({
      sectionId,
      name: config.name,
      startDate: sectionStart,
      endDate: sectionEnd,
      daysAllocated,
      questionsPerDay: Math.ceil(CPA_TARGET_QUESTIONS_PER_SECTION / daysAllocated),
      lessonsPerDay: Math.ceil(CPA_LESSONS_PER_SECTION / daysAllocated),
      examDate: examDate || undefined,
      isCore: config.isCore,
    });

    // Move to next section
    currentStart = addDays(sectionEnd, 1);
  }

  return sections;
}

function generateMilestones(
  sections: CPAStudyPlanSection[],
  _examDates: Record<CPASectionId, Date | null>,
  startDate: Date,
  endDate: Date | null
): CPAStudyPlanMilestone[] {
  const milestones: CPAStudyPlanMilestone[] = [];
  const totalSpan = endDate ? differenceInDays(endDate, startDate) : 180;

  // Start milestone
  milestones.push({
    date: startDate,
    dateStr: format(startDate, 'MMM d'),
    label: 'Study plan begins',
    type: 'start',
    position: 0,
  });

  // Section and exam milestones
  for (const section of sections) {
    // Section complete milestone
    milestones.push({
      date: section.endDate,
      dateStr: format(section.endDate, 'MMM d'),
      label: `Complete ${section.sectionId} content`,
      type: 'section-complete',
      sectionId: section.sectionId,
      position: Math.min(100, (differenceInDays(section.endDate, startDate) / totalSpan) * 100),
    });

    // Exam milestone
    if (section.examDate) {
      const reviewStart = addDays(section.examDate, -CPA_REVIEW_DAYS);
      
      milestones.push({
        date: reviewStart,
        dateStr: format(reviewStart, 'MMM d'),
        label: `${section.sectionId} final review`,
        type: 'review-start',
        sectionId: section.sectionId,
        position: Math.min(100, (differenceInDays(reviewStart, startDate) / totalSpan) * 100),
      });

      milestones.push({
        date: section.examDate,
        dateStr: format(section.examDate, 'MMM d'),
        label: `${section.sectionId} Exam Day!`,
        type: 'exam',
        sectionId: section.sectionId,
        position: Math.min(100, (differenceInDays(section.examDate, startDate) / totalSpan) * 100),
      });
    }
  }

  // Sort by date
  milestones.sort((a, b) => a.date.getTime() - b.date.getTime());

  return milestones;
}

function createWeeklySchedule(
  hoursPerDay: number,
  studyDaysPerWeek: number,
  sections: CPAStudyPlanSection[]
): CPAWeeklySchedule {
  const createDayPlan = (isStudyDay: boolean): CPADayPlan => {
    if (!isStudyDay) {
      return {
        isStudyDay: false,
        hoursPlanned: 0,
        focusSections: [],
        activities: [],
      };
    }

    const minutesPerDay = hoursPerDay * 60;
    const currentSection = sections[0]?.sectionId;

    // CPA-specific: More TBS practice than EA
    return {
      isStudyDay: true,
      hoursPlanned: hoursPerDay,
      focusSections: currentSection ? [currentSection] : [],
      activities: [
        { type: 'lessons', duration: Math.floor(minutesPerDay * 0.25), sectionId: currentSection },
        { type: 'practice', duration: Math.floor(minutesPerDay * 0.35), sectionId: currentSection },
        { type: 'tbs', duration: Math.floor(minutesPerDay * 0.20), sectionId: currentSection },
        { type: 'flashcards', duration: Math.floor(minutesPerDay * 0.10), sectionId: currentSection },
        { type: 'review', duration: Math.floor(minutesPerDay * 0.10), sectionId: currentSection },
      ],
    };
  };

  // Determine rest days based on study days per week
  const restDays = studyDaysPerWeek < 7 
    ? (studyDaysPerWeek === 6 ? ['sunday'] : ['saturday', 'sunday'])
    : [];

  return {
    monday: createDayPlan(!restDays.includes('monday')),
    tuesday: createDayPlan(!restDays.includes('tuesday')),
    wednesday: createDayPlan(!restDays.includes('wednesday')),
    thursday: createDayPlan(!restDays.includes('thursday')),
    friday: createDayPlan(!restDays.includes('friday')),
    saturday: createDayPlan(!restDays.includes('saturday')),
    sunday: createDayPlan(!restDays.includes('sunday')),
  };
}

function calculateDailyGoals(
  hoursPerDay: number,
  totalDays: number,
  numSections: number
): CPADailyGoals {
  const minutesPerDay = hoursPerDay * 60;
  
  // CPA requires more questions per day than EA (larger question banks)
  const questionsPerDay = Math.max(20, Math.floor((CPA_TARGET_QUESTIONS_PER_SECTION * numSections) / totalDays));
  const lessonsPerDay = Math.max(1, Math.floor((CPA_LESSONS_PER_SECTION * numSections) / totalDays));
  
  return {
    questionsPerDay: Math.min(questionsPerDay, 50), // Cap at 50/day
    lessonsPerDay: Math.min(lessonsPerDay, 3), // Cap at 3/day
    flashcardsPerDay: Math.floor(minutesPerDay * 0.10 / 2), // ~2 min per flashcard
    tbsPerWeek: Math.max(5, Math.min(15, Math.floor(CPA_TBS_PER_SECTION / (totalDays / 7)))),
    studyMinutesPerDay: minutesPerDay,
  };
}

/**
 * Get a human-readable summary of the study plan
 */
export function getStudyPlanSummary(plan: CPAStudyPlan): string {
  const sectionCount = plan.sections.length;
  const coreCount = plan.sections.filter(s => s.isCore).length;
  const disciplineSection = plan.sections.find(s => !s.isCore);

  if (plan.firstExamDate && plan.lastExamDate) {
    const daysUntilFirst = differenceInDays(plan.firstExamDate, new Date());
    
    let summary = `You'll cover ${coreCount} core section${coreCount > 1 ? 's' : ''}`;
    if (disciplineSection) {
      summary += ` plus ${disciplineSection.sectionId}`;
    }
    summary += ` over ${plan.totalDays} days.`;
    
    if (daysUntilFirst > 0) {
      summary += ` First exam in ${daysUntilFirst} days.`;
    }
    
    return summary;
  }

  return `Flexible ${sectionCount}-section study plan. Set exam dates to lock in your schedule.`;
}

/**
 * Recommended study order for CPA
 */
export const CPA_RECOMMENDED_ORDER: CPASectionId[] = ['FAR', 'AUD', 'REG'];

export function getRecommendedOrderReason(): string {
  return 'FAR first (most content, builds foundation) → AUD (builds on FAR) → REG (self-contained) → Your discipline';
}
