
import { differenceInDays, addDays, format } from 'date-fns';
import { CISASectionId } from '../courses/cisa';

// Re-export specific config for the planner
export type { CISASectionId };

export const CISA_PLANNER_CONFIG: Record<CISASectionId, { name: string; shortName: string; color: string; examCode: string; questionsCount: number }> = {
  CISA1: {
    name: 'Domain 1: Information Systems Auditing Process',
    shortName: 'Domain 1',
    color: '#6366f1', // Indigo-500
    examCode: 'CISA',
    questionsCount: 200
  },
  CISA2: {
    name: 'Domain 2: Governance and Management of IT',
    shortName: 'Domain 2',
    color: '#3b82f6', // Blue-500
    examCode: 'CISA',
    questionsCount: 200
  },
  CISA3: {
    name: 'Domain 3: IS Acquisition, Development & Implementation',
    shortName: 'Domain 3',
    color: '#06b6d4', // Cyan-500
    examCode: 'CISA',
    questionsCount: 200
  },
  CISA4: {
    name: 'Domain 4: IS Operations and Business Resilience',
    shortName: 'Domain 4',
    color: '#14b8a6', // Teal-500
    examCode: 'CISA',
    questionsCount: 200
  },
  CISA5: {
    name: 'Domain 5: Protection of Information Assets',
    shortName: 'Domain 5',
    color: '#10b981', // Emerald-500
    examCode: 'CISA',
    questionsCount: 200
  }
};

export interface CISAStudyPlanSection {
  sectionId: CISASectionId;
  name: string;
  startDate: Date;
  endDate: Date;
  daysAllocated: number;
  questionsPerDay: number;
  lessonsPerDay: number;
  examDate?: Date; // For CISA, this is likely the same for all, or standard single exam
}

export interface CISAStudyPlanMilestone {
  date: Date;
  dateStr: string;
  label: string;
  type: 'start' | 'section-complete' | 'review-start' | 'exam' | 'checkpoint';
  sectionId?: CISASectionId;
  position: number;
}

export interface CISAWeeklySchedule {
  monday: CISADayPlan;
  tuesday: CISADayPlan;
  wednesday: CISADayPlan;
  thursday: CISADayPlan;
  friday: CISADayPlan;
  saturday: CISADayPlan;
  sunday: CISADayPlan;
}

export interface CISADailyGoals {
    questions: number;
    hours: number;
    lessons: number;
}

export interface CISADayPlan {
  available: boolean;
  hours: number;
}

export interface CISAStudyPlan {
  id: string;
  createdAt: Date;
  examDate: Date | null; // Single exam date for CISA
  totalDays: number;
  hoursPerDay: number;
  sections: CISAStudyPlanSection[];
  milestones: CISAStudyPlanMilestone[];
  weeklySchedule: CISAWeeklySchedule;
  dailyGoals: CISADailyGoals;
}

// Constants
export const CISA_RECOMMENDED_HOURS = {
  CISA1: 20,
  CISA2: 15,
  CISA3: 15,
  CISA4: 20,
  CISA5: 25,
};

export const CISA_QUESTIONS_COUNT = {
  CISA1: 200,
  CISA2: 200,
  CISA3: 200,
  CISA4: 200,
  CISA5: 200,
};

export const DEFAULT_WEEKLY_SCHEDULE: CISAWeeklySchedule = {
  monday: { available: true, hours: 2 },
  tuesday: { available: true, hours: 2 },
  wednesday: { available: true, hours: 2 },
  thursday: { available: true, hours: 2 },
  friday: { available: true, hours: 1 },
  saturday: { available: true, hours: 4 },
  sunday: { available: false, hours: 0 },
};

/**
 * Generates a study plan for CISA
 * @param examDate Target date for the CISA exam
 * @param weeklySchedule User's availability
 * @param startDate Start date (defaults to today)
 */
export function generateCISAStudyPlan(
  examDate: Date,
  weeklySchedule: CISAWeeklySchedule = DEFAULT_WEEKLY_SCHEDULE,
  startDate: Date = new Date()
): CISAStudyPlan {
  // Calculate total available study hours between start and exam
  // Allocate hours proportionally to domains based on weight/difficulty
  // ... this is a simplified generator
  
  const totalDays = differenceInDays(examDate, startDate);
  
  // Create generic sections
  const sections: CISAStudyPlanSection[] = [];
  const milestones: CISAStudyPlanMilestone[] = [];
  
  // Add Start Milestone
  milestones.push({
    date: startDate,
    dateStr: format(startDate, 'yyyy-MM-dd'),
    label: 'Start Studying',
    type: 'start',
    position: 0
  });

  // Distribute days roughly (20% per domain approx)
  const daysPerDomain = Math.floor((totalDays - 14) / 5); // Reserve 2 weeks for final review
  let currentStart = startDate;

  (['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'] as CISASectionId[]).forEach((sectionId, index) => {
    const end = addDays(currentStart, daysPerDomain);
    
    sections.push({
      sectionId,
      name: CISA_PLANNER_CONFIG[sectionId].name,
      startDate: currentStart,
      endDate: end,
      daysAllocated: daysPerDomain,
      questionsPerDay: 10,
      lessonsPerDay: 1,
      examDate: examDate
    });

    // Add milestone
    milestones.push({
      date: end,
      dateStr: format(end, 'yyyy-MM-dd'),
      label: `Finish ${CISA_PLANNER_CONFIG[sectionId].shortName}`,
      type: 'section-complete',
      sectionId,
      position: (index + 1) * 20
    });

    currentStart = addDays(end, 1);
  });

  // Final Review
  milestones.push({
    date: currentStart,
    dateStr: format(currentStart, 'yyyy-MM-dd'),
    label: 'Begin Final Review',
    type: 'review-start',
    position: 95
  });

  // Exam Day
  milestones.push({
    date: examDate,
    dateStr: format(examDate, 'yyyy-MM-dd'),
    label: 'CISA Exam Day',
    type: 'exam',
    position: 100
  });

  return {
    id: `plan_${Date.now()}`,
    createdAt: new Date(),
    examDate,
    totalDays,
    hoursPerDay: 2,
    sections,
    milestones,
    weeklySchedule,
    dailyGoals: {
      questions: 20,
      hours: 2,
      lessons: 1
    }
  };
}
