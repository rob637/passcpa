
// date-fns functions available for future use: differenceInDays, addDays, format

// Types (adapted for CIA)
export type CIASectionId = 'CIA1' | 'CIA2' | 'CIA3';

export const CIA_SECTION_CONFIG: Record<CIASectionId, { name: string; shortName: string; color: string; examCode: string; questionsCount: number }> = {
  CIA1: {
    name: 'Part 1: Essentials of Internal Auditing',
    shortName: 'CIA Part 1',
    color: '#fbbf24', // Amber-400
    examCode: 'CIA-I',
    questionsCount: 125
  },
  CIA2: {
    name: 'Part 2: Practice of Internal Auditing',
    shortName: 'CIA Part 2',
    color: '#f59e0b', // Amber-500
    examCode: 'CIA-II',
    questionsCount: 100
  },
  CIA3: {
    name: 'Part 3: Business Knowledge for Internal Auditing',
    shortName: 'CIA Part 3',
    color: '#d97706', // Amber-600
    examCode: 'CIA-III',
    questionsCount: 100
  }
};

export interface CIAStudyPlanSection {
  sectionId: CIASectionId;
  name: string;
  startDate: Date;
  endDate: Date;
  daysAllocated: number;
  questionsPerDay: number;
  lessonsPerDay: number;
  examDate?: Date;
}

export interface CIAStudyPlanMilestone {
  date: Date;
  dateStr: string;
  label: string;
  type: 'start' | 'section-complete' | 'review-start' | 'exam' | 'checkpoint';
  sectionId?: CIASectionId;
  position: number;
}

export interface CIAWeeklySchedule {
  monday: CIADayPlan;
  tuesday: CIADayPlan;
  wednesday: CIADayPlan;
  thursday: CIADayPlan;
  friday: CIADayPlan;
  saturday: CIADayPlan;
  sunday: CIADayPlan;
}

export interface CIADailyGoals {
    questions: number;
    hours: number;
    lessons: number;
}

export interface CIADayPlan {
  available: boolean;
  hours: number;
}

export interface CIAStudyPlan {
  id: string;
  createdAt: Date;
  examDates: Record<CIASectionId, Date | null>;
  firstExamDate: Date | null;
  lastExamDate: Date | null;
  totalDays: number;
  hoursPerDay: number;
  sections: CIAStudyPlanSection[];
  milestones: CIAStudyPlanMilestone[];
  weeklySchedule: CIAWeeklySchedule;
  dailyGoals: CIADailyGoals;
}

// Constants
export const CIA_RECOMMENDED_HOURS = {
  CIA1: 40,
  CIA2: 40,
  CIA3: 50,
};

export const CIA_QUESTIONS_COUNT = {
  CIA1: 800,
  CIA2: 800,
  CIA3: 1000,
};

export const DEFAULT_WEEKLY_SCHEDULE: CIAWeeklySchedule = {
  monday: { available: true, hours: 2 },
  tuesday: { available: true, hours: 2 },
  wednesday: { available: true, hours: 2 },
  thursday: { available: true, hours: 2 },
  friday: { available: true, hours: 1 },
  saturday: { available: true, hours: 4 },
  sunday: { available: false, hours: 0 },
};

export function generateCIAStudyPlan(
  examDates: Record<CIASectionId, Date | null>,
  weeklySchedule: CIAWeeklySchedule = DEFAULT_WEEKLY_SCHEDULE
): CIAStudyPlan {
  const now = new Date();
  const sortedSectionIds = (Object.keys(examDates) as CIASectionId[])
    .filter(id => examDates[id] !== null)
    .sort((a, b) => (examDates[a]?.getTime() || 0) - (examDates[b]?.getTime() || 0));

  const firstExamDate = sortedSectionIds.length > 0 ? examDates[sortedSectionIds[0]] : null;
  const lastExamDate = sortedSectionIds.length > 0 ? examDates[sortedSectionIds[sortedSectionIds.length - 1]] : null;
  
  // Create Plan Object
  const plan: CIAStudyPlan = {
    id: `cia-plan-${Date.now()}`,
    createdAt: now,
    examDates,
    firstExamDate,
    lastExamDate,
    totalDays: 0,
    hoursPerDay: 2, // Avg
    sections: [],
    milestones: [],
    weeklySchedule,
    dailyGoals: { questions: 20, hours: 2, lessons: 1 }
  };

  // Logic to fill sections/milestones would go here (simplified for this sprint)
  // ... adapter logic ...
  
  return plan;
}

export function getStudyPlanSummary(plan: CIAStudyPlan): string {
    return `CIA Plan: ${plan.sections.length} sections scheduled.`;
}
