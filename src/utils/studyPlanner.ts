import { differenceInDays, addDays, format } from 'date-fns';

export interface StudyPlan {
  examDate: Date;
  totalDays: number;
  totalModules: number;
  modulesPerDay: number;
  milestones: { date: string; label: string }[];
}

/**
 * Generates a simple linear study plan based on exam date
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
  
  const milestones = [
    { date: format(today, 'MMM d'), label: 'Start' },
    { date: format(addDays(today, Math.floor(studyDays * 0.5)), 'MMM d'), label: 'Halfway Point' },
    { date: format(addDays(today, studyDays), 'MMM d'), label: 'Content Complete (Begin Review)' },
    { date: format(examDate, 'MMM d'), label: 'Exam Day' }
  ];

  return {
    examDate,
    totalDays: daysUntilExam,
    totalModules,
    modulesPerDay,
    milestones
  };
};
