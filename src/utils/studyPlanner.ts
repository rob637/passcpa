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
  startDate: Date; // When the study plan started
  totalDays: number;
  studyDays: number; // Days for content (excludes review period)
  daysElapsed: number; // Days elapsed since start
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
  _startDate?: Date // Deprecated — startDate now lives on studyPlan
): PaceInfo => {
  // Use the study plan's own start date for consistency
  const daysElapsed = studyPlan.daysElapsed;
  
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
  
  if (daysElapsed <= 1 && lessonsExpected === 0) {
    // Too early to judge pace — any completed work is just a good start
    if (lessonsCompleted > 0) {
      status = 'on-track';
      message = 'Great start!';
    } else {
      status = 'on-track';
      message = 'On pace';
    }
  } else if (lessonsDiff >= 2) {
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
 * Generates a study plan based on exam date with proportional milestone positions.
 * 
 * @param _examSectionId - The exam section (e.g. 'FAR', 'SEE1').
 * @param examDate - Target exam date.
 * @param startDate - When the user started studying (e.g. account creation or exam date set).
 *                    Defaults to today if not provided.
 * @param actualLessonCount - Real number of lessons for this section. If provided,
 *                            used for accurate modulesPerDay. Falls back to 40 estimate.
 */
export const generateStudyPlan = (
  _examSectionId: string, 
  examDate: Date, 
  startDate?: Date,
  actualLessonCount?: number
): StudyPlan => {
  const today = new Date();
  const start = startDate && startDate < today ? startDate : today;
  const daysUntilExam = differenceInDays(examDate, today);
  const totalPlanDays = Math.max(1, differenceInDays(examDate, start));
  
  // Use actual lesson count when available, otherwise estimate
  const totalModules = actualLessonCount && actualLessonCount > 0 ? actualLessonCount : 40; 
  
  // Reserve last 14 days for final review
  const reviewDays = 14;
  
  // Study days = content learning period (minimum 7 days)
  const studyDays = Math.max(7, totalPlanDays - reviewDays);
  
  // Days elapsed since plan start
  const daysElapsed = Math.max(0, differenceInDays(today, start));
  
  // Remaining lessons / remaining study days = daily target
  const remainingStudyDays = Math.max(1, studyDays - daysElapsed);
  const modulesPerDay = Math.min(10, Number((totalModules / remainingStudyDays).toFixed(1)));
  
  // Calculate days for each milestone (relative to start date)
  const halfwayDay = Math.floor(studyDays * 0.5);
  const contentCompleteDay = studyDays;
  const examDay = totalPlanDays;
  
  // Calculate expected progress based on days elapsed in study period
  const expectedProgress = Math.min(100, Math.max(0, (daysElapsed / studyDays) * 100));
  
  const milestones: StudyPlanMilestone[] = [
    { 
      date: format(start, 'MMM d'), 
      label: 'Start', 
      position: 0,
      dayFromStart: 0
    },
    { 
      date: format(addDays(start, halfwayDay), 'MMM d'), 
      label: 'Halfway Point',
      position: (halfwayDay / examDay) * 100,
      dayFromStart: halfwayDay
    },
    { 
      date: format(addDays(start, contentCompleteDay), 'MMM d'), 
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
    startDate: start,
    totalDays: daysUntilExam,
    studyDays,
    daysElapsed,
    totalModules,
    modulesPerDay,
    expectedProgress,
    milestones
  };
};
