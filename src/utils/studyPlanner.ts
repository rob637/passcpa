import { differenceInDays, addDays, format } from 'date-fns';

export interface StudyPlanMilestone {
  date: string;
  label: string;
  position: number; // Percentage position on timeline (0-100)
  dayFromStart: number; // Days from start date
}

export type PaceStatus = 'ahead' | 'on-track' | 'slightly-behind' | 'behind';

export interface PaceInfo {
  status: PaceStatus;
  lessonsExpected: number;
  lessonsDiff: number; // positive = ahead, negative = behind
  adjustedPace: number; // modules/day needed to catch up or maintain
  message: string;
}

export interface StudyPlan {
  examDate: Date;
  totalDays: number;
  studyDays: number; // Days for content (excludes review period)
  totalModules: number;
  modulesPerDay: number;
  expectedProgress: number; // Expected lesson completion % based on time elapsed
  milestones: StudyPlanMilestone[];
}

/**
 * Calculate the user's pace status relative to their study plan
 */
export const calculatePaceStatus = (
  studyPlan: StudyPlan,
  lessonsCompleted: number,
  totalLessons: number,
  startDate?: Date
): PaceInfo => {
  const today = new Date();
  const start = startDate || today; // If no start date, assume they just started
  const daysElapsed = Math.max(0, differenceInDays(today, start));
  
  // Expected lessons based on linear progress through study period
  const progressRatio = Math.min(1, daysElapsed / studyPlan.studyDays);
  const lessonsExpected = Math.round(totalLessons * progressRatio);
  
  const lessonsDiff = lessonsCompleted - lessonsExpected;
  
  // Calculate adjusted pace needed to finish on time
  const remainingLessons = totalLessons - lessonsCompleted;
  const remainingDays = Math.max(1, studyPlan.studyDays - daysElapsed);
  const adjustedPace = Number((remainingLessons / remainingDays).toFixed(1));
  
  // Determine status based on difference
  let status: PaceStatus;
  let message: string;
  
  if (lessonsDiff >= 2) {
    status = 'ahead';
    message = `${lessonsDiff} lessons ahead`;
  } else if (lessonsDiff >= -1) {
    status = 'on-track';
    message = 'On pace';
  } else if (lessonsDiff >= -5) {
    status = 'slightly-behind';
    message = `${Math.abs(lessonsDiff)} lessons to catch up`;
  } else {
    status = 'behind';
    message = `${adjustedPace} lessons/day to finish on time`;
  }
  
  return {
    status,
    lessonsExpected,
    lessonsDiff,
    adjustedPace,
    message
  };
};

/**
 * Generates a study plan based on exam date with proportional milestone positions
 */
export const generateStudyPlan = (_examSectionId: string, examDate: Date): StudyPlan => {
  const today = new Date();
  const daysUntilExam = differenceInDays(examDate, today);
  
  // Estimate module count (roughly 30-40 lessons per section + 2 reviews)
  const totalModules = 40; 
  
  // Reserve last 14 days for final review (minimum 7 days to avoid crazy numbers)
  const studyDays = Math.max(7, daysUntilExam - 14);
  
  // Cap modulesPerDay at a reasonable maximum (10) to avoid showing unrealistic numbers
  const modulesPerDay = Math.min(10, Number((totalModules / studyDays).toFixed(1)));
  
  // Calculate days for each milestone
  const halfwayDay = Math.floor(studyDays * 0.5);
  const contentCompleteDay = studyDays;
  const examDay = daysUntilExam;
  
  // Calculate expected progress based on days elapsed in study period
  // (0% at start, 100% at content complete)
  const daysElapsed = 0; // Today is day 0
  const expectedProgress = Math.min(100, Math.max(0, (daysElapsed / studyDays) * 100));
  
  const milestones: StudyPlanMilestone[] = [
    { 
      date: format(today, 'MMM d'), 
      label: 'Start', 
      position: 0,
      dayFromStart: 0
    },
    { 
      date: format(addDays(today, halfwayDay), 'MMM d'), 
      label: 'Halfway Point',
      position: (halfwayDay / examDay) * 100,
      dayFromStart: halfwayDay
    },
    { 
      date: format(addDays(today, contentCompleteDay), 'MMM d'), 
      label: 'Review Starts',
      position: (contentCompleteDay / examDay) * 100,
      dayFromStart: contentCompleteDay
    },
    { 
      date: format(examDate, 'MMM d'), 
      label: 'Exam Day',
      position: 100,
      dayFromStart: examDay
    }
  ];

  return {
    examDate,
    totalDays: daysUntilExam,
    studyDays,
    totalModules,
    modulesPerDay,
    expectedProgress,
    milestones
  };
};
