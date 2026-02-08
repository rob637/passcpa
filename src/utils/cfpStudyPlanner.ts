/**
 * CFP Study Plan Generator
 * 
 * Creates personalized study schedules for the CFP® exam.
 * Generates a plan covering all 7 domains with appropriate time allocation
 * based on exam weights, user preferences, and weak areas.
 */

import { differenceInDays, addDays, format, isBefore } from 'date-fns';

// Types
export type CFPDomainId = 'GEN' | 'RISK' | 'INV' | 'TAX' | 'RET' | 'EST' | 'PRO';

export interface CFPDomainConfig {
  id: CFPDomainId;
  name: string;
  examWeight: number; // percentage
  questionCount: number;
  lessonCount: number;
}

export const CFP_DOMAIN_CONFIG: Record<CFPDomainId, CFPDomainConfig> = {
  GEN: { id: 'GEN', name: 'General Principles', examWeight: 18, questionCount: 75, lessonCount: 10 },
  RISK: { id: 'RISK', name: 'Risk Management & Insurance', examWeight: 12, questionCount: 75, lessonCount: 8 },
  INV: { id: 'INV', name: 'Investment Planning', examWeight: 11, questionCount: 75, lessonCount: 10 },
  TAX: { id: 'TAX', name: 'Tax Planning', examWeight: 14, questionCount: 75, lessonCount: 10 },
  RET: { id: 'RET', name: 'Retirement Planning', examWeight: 19, questionCount: 75, lessonCount: 12 },
  EST: { id: 'EST', name: 'Estate Planning', examWeight: 12, questionCount: 75, lessonCount: 10 },
  PRO: { id: 'PRO', name: 'Professional Conduct', examWeight: 15, questionCount: 75, lessonCount: 8 },
};

export interface CFPStudyPlanDomain {
  domainId: CFPDomainId;
  name: string;
  startDate: Date;
  endDate: Date;
  daysAllocated: number;
  questionsPerDay: number;
  lessonsPerDay: number;
  flashcardsPerDay: number;
  examWeight: number;
}

export interface CFPStudyPlanMilestone {
  date: Date;
  dateStr: string;
  label: string;
  type: 'start' | 'domain-complete' | 'mock-exam' | 'review-start' | 'exam' | 'checkpoint';
  domainId?: CFPDomainId;
  position: number; // 0-100 for timeline display
}

export interface CFPStudyPlan {
  id: string;
  createdAt: Date;
  examDate: Date;
  totalDays: number;
  hoursPerDay: number;
  studyDaysPerWeek: number;
  domains: CFPStudyPlanDomain[];
  milestones: CFPStudyPlanMilestone[];
  weeklySchedule: CFPWeeklySchedule;
  dailyGoals: CFPDailyGoals;
  phases: CFPStudyPhase[];
}

export interface CFPWeeklySchedule {
  monday: CFPDayPlan;
  tuesday: CFPDayPlan;
  wednesday: CFPDayPlan;
  thursday: CFPDayPlan;
  friday: CFPDayPlan;
  saturday: CFPDayPlan;
  sunday: CFPDayPlan;
}

export interface CFPDayPlan {
  isStudyDay: boolean;
  hoursPlanned: number;
  focusDomains: CFPDomainId[];
  activities: CFPActivity[];
}

export interface CFPActivity {
  type: 'lessons' | 'practice' | 'flashcards' | 'mock-exam' | 'review' | 'formulas' | 'case-study';
  duration: number; // minutes
  domainId?: CFPDomainId;
  description?: string;
}

export interface CFPDailyGoals {
  questionsPerDay: number;
  lessonsPerDay: number;
  flashcardsPerDay: number;
  studyMinutesPerDay: number;
  reviewMinutesPerDay: number;
}

export interface CFPStudyPhase {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  focusAreas: CFPDomainId[];
  activities: string[];
}

export interface CFPStudyPlanInput {
  examDate: Date;
  hoursPerDay: number;
  studyDaysPerWeek: number;
  currentProgress?: Partial<Record<CFPDomainId, number>>; // 0-100 progress
  weakAreas?: CFPDomainId[];
  preferredStartTime?: string; // e.g., "09:00"
  experienceLevel?: 'beginner' | 'intermediate' | 'experienced';
}

// Constants
const CFP_REVIEW_DAYS = 14; // Final review period before exam
const CFP_MOCK_EXAM_INTERVAL = 14; // Days between mock exams
const CFP_TARGET_QUESTIONS_PER_DOMAIN = 150; // Through the study period
const CFP_FLASHCARDS_PER_DOMAIN = 30;

/**
 * Generate a CFP study plan based on exam date and preferences
 */
export function generateCFPStudyPlan(input: CFPStudyPlanInput): CFPStudyPlan {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const examDate = new Date(input.examDate);
  examDate.setHours(0, 0, 0, 0);

  // Validate exam date is in the future
  if (isBefore(examDate, today)) {
    throw new Error('Exam date must be in the future');
  }

  const totalDays = Math.max(1, differenceInDays(examDate, today));
  
  // Calculate domain allocations based on exam weights and weak areas
  const domains = calculateDomainAllocations(
    today,
    examDate,
    input.hoursPerDay,
    input.currentProgress,
    input.weakAreas
  );

  // Generate study phases
  const phases = generateStudyPhases(today, examDate, totalDays, domains);

  // Generate milestones
  const milestones = generateMilestones(today, domains, examDate, totalDays);

  // Generate weekly schedule
  const weeklySchedule = generateWeeklySchedule(
    input.hoursPerDay,
    input.studyDaysPerWeek,
    domains
  );

  // Calculate daily goals
  const dailyGoals = calculateDailyGoals(
    domains,
    input.hoursPerDay,
    input.studyDaysPerWeek,
    totalDays
  );

  return {
    id: `cfp-plan-${Date.now()}`,
    createdAt: today,
    examDate,
    totalDays,
    hoursPerDay: input.hoursPerDay,
    studyDaysPerWeek: input.studyDaysPerWeek,
    domains,
    milestones,
    weeklySchedule,
    dailyGoals,
    phases,
  };
}

/**
 * Calculate how many days to allocate to each domain
 * Uses exam weights and adjusts for weak areas
 */
function calculateDomainAllocations(
  startDate: Date,
  examDate: Date,
  hoursPerDay: number,
  currentProgress?: Partial<Record<CFPDomainId, number>>,
  weakAreas?: CFPDomainId[]
): CFPStudyPlanDomain[] {
  const domains: CFPStudyPlanDomain[] = [];
  
  // Total study days (minus review period)
  const totalStudyDays = Math.max(14, differenceInDays(examDate, startDate) - CFP_REVIEW_DAYS);
  
  // Order domains by priority:
  // 1. Weak areas first
  // 2. Higher exam weight second
  // 3. Less progress third
  const domainIds: CFPDomainId[] = ['GEN', 'RISK', 'INV', 'TAX', 'RET', 'EST', 'PRO'];
  
  const sortedDomains = domainIds.sort((a, b) => {
    const aWeak = weakAreas?.includes(a) ? 1 : 0;
    const bWeak = weakAreas?.includes(b) ? 1 : 0;
    if (aWeak !== bWeak) return bWeak - aWeak; // Weak areas first
    
    const aWeight = CFP_DOMAIN_CONFIG[a].examWeight;
    const bWeight = CFP_DOMAIN_CONFIG[b].examWeight;
    if (aWeight !== bWeight) return bWeight - aWeight; // Higher weight first
    
    const aProgress = currentProgress?.[a] || 0;
    const bProgress = currentProgress?.[b] || 0;
    return aProgress - bProgress; // Less progress first
  });

  // Calculate base allocation for each domain based on exam weight
  let currentDate = new Date(startDate);
  let remainingDays = totalStudyDays;

  for (let i = 0; i < sortedDomains.length; i++) {
    const domainId = sortedDomains[i];
    const config = CFP_DOMAIN_CONFIG[domainId];
    const progress = currentProgress?.[domainId] || 0;
    const isWeak = weakAreas?.includes(domainId);
    
    // Calculate remaining work
    const remainingWork = 1 - (progress / 100);
    
    // Base allocation by exam weight, adjusted for remaining work and weak area
    let weightFactor = config.examWeight / 100;
    if (isWeak) weightFactor *= 1.25; // 25% more time for weak areas
    
    const baseAllocation = Math.ceil(totalStudyDays * weightFactor * remainingWork);
    
    // Ensure minimum days per domain
    const minDays = isWeak ? 5 : 3;
    const isLast = i === sortedDomains.length - 1;
    const daysForDomain = isLast 
      ? Math.max(minDays, remainingDays)
      : Math.min(Math.max(minDays, baseAllocation), remainingDays - (sortedDomains.length - i - 1) * minDays);
    
    const endDate = addDays(currentDate, daysForDomain - 1);
    
    // Calculate daily workload based on hours available
    const minutesPerDay = hoursPerDay * 60;
    const questionsPerDay = Math.ceil((CFP_TARGET_QUESTIONS_PER_DOMAIN * remainingWork) / daysForDomain);
    const lessonsPerDay = Math.max(1, Math.ceil((config.lessonCount * remainingWork) / daysForDomain));
    const flashcardsPerDay = Math.ceil((CFP_FLASHCARDS_PER_DOMAIN * remainingWork) / daysForDomain);

    domains.push({
      domainId,
      name: config.name,
      startDate: new Date(currentDate),
      endDate,
      daysAllocated: daysForDomain,
      questionsPerDay: Math.min(questionsPerDay, Math.floor(minutesPerDay / 2)), // ~2 min per question
      lessonsPerDay: Math.min(lessonsPerDay, 3),
      flashcardsPerDay: Math.min(flashcardsPerDay, 20),
      examWeight: config.examWeight,
    });

    currentDate = addDays(endDate, 1);
    remainingDays -= daysForDomain;
  }

  return domains;
}

/**
 * Generate study phases (Learning, Review, Practice, Final Prep)
 */
function generateStudyPhases(
  startDate: Date,
  examDate: Date,
  totalDays: number,
  domains: CFPStudyPlanDomain[]
): CFPStudyPhase[] {
  const phases: CFPStudyPhase[] = [];
  
  // Phase 1: Foundation (first 40% of time)
  const foundationEndDay = Math.floor(totalDays * 0.4);
  const foundationEnd = addDays(startDate, foundationEndDay);
  
  phases.push({
    id: 'foundation',
    name: 'Foundation Building',
    startDate: new Date(startDate),
    endDate: foundationEnd,
    description: 'Focus on learning core concepts and completing lessons for each domain',
    focusAreas: domains.slice(0, 4).map(d => d.domainId),
    activities: [
      'Complete lesson content systematically',
      'Create flashcards for key concepts',
      'Practice 20-30 questions per domain daily',
      'Review formulas and key numbers',
    ],
  });

  // Phase 2: Reinforcement (next 30% of time)
  const reinforceStart = addDays(foundationEnd, 1);
  const reinforceEndDay = Math.floor(totalDays * 0.7);
  const reinforceEnd = addDays(startDate, reinforceEndDay);
  
  phases.push({
    id: 'reinforcement',
    name: 'Reinforcement & Practice',
    startDate: reinforceStart,
    endDate: reinforceEnd,
    description: 'Solidify understanding through practice questions and mock exams',
    focusAreas: domains.slice(4).map(d => d.domainId),
    activities: [
      'Take first mock exam to identify gaps',
      '50+ practice questions daily',
      'Focus on weak areas identified',
      'Deep-dive case study practice',
      'Review wrong answers thoroughly',
    ],
  });

  // Phase 3: Final Review (last 2 weeks)
  const reviewStart = addDays(examDate, -14);
  
  phases.push({
    id: 'final-review',
    name: 'Final Review',
    startDate: reviewStart,
    endDate: addDays(examDate, -1),
    description: 'Final polish and confidence building',
    focusAreas: domains.map(d => d.domainId),
    activities: [
      'Take second mock exam under test conditions',
      'Review quick reference sheets',
      'Focus on high-weight domains (Retirement, General Principles, Professional Conduct)',
      'Light practice - avoid burnout',
      'Review commonly missed concepts',
      'Get adequate rest before exam day',
    ],
  });

  return phases;
}

/**
 * Generate milestones for the study plan
 */
function generateMilestones(
  startDate: Date,
  domains: CFPStudyPlanDomain[],
  examDate: Date,
  totalDays: number
): CFPStudyPlanMilestone[] {
  const milestones: CFPStudyPlanMilestone[] = [];
  
  // Start milestone
  milestones.push({
    date: startDate,
    dateStr: format(startDate, 'MMM d'),
    label: 'Start CFP Study Plan',
    type: 'start',
    position: 0,
  });

  // Domain completion milestones
  for (const domain of domains) {
    const position = Math.min(100, (differenceInDays(domain.endDate, startDate) / totalDays) * 100);
    
    milestones.push({
      date: domain.endDate,
      dateStr: format(domain.endDate, 'MMM d'),
      label: `Complete ${domain.name}`,
      type: 'domain-complete',
      domainId: domain.domainId,
      position,
    });
  }

  // Mock exam milestones
  let mockExamDate = addDays(startDate, CFP_MOCK_EXAM_INTERVAL);
  let mockExamCount = 1;
  
  while (isBefore(mockExamDate, addDays(examDate, -7))) {
    const position = (differenceInDays(mockExamDate, startDate) / totalDays) * 100;
    
    milestones.push({
      date: mockExamDate,
      dateStr: format(mockExamDate, 'MMM d'),
      label: `Mock Exam ${mockExamCount}`,
      type: 'mock-exam',
      position,
    });
    
    mockExamDate = addDays(mockExamDate, CFP_MOCK_EXAM_INTERVAL);
    mockExamCount++;
  }

  // Final review start
  const reviewStart = addDays(examDate, -CFP_REVIEW_DAYS);
  milestones.push({
    date: reviewStart,
    dateStr: format(reviewStart, 'MMM d'),
    label: 'Begin Final Review',
    type: 'review-start',
    position: (differenceInDays(reviewStart, startDate) / totalDays) * 100,
  });

  // Exam day
  milestones.push({
    date: examDate,
    dateStr: format(examDate, 'MMM d'),
    label: 'CFP® Exam Day',
    type: 'exam',
    position: 100,
  });

  // Sort milestones by date
  milestones.sort((a, b) => differenceInDays(a.date, b.date));

  return milestones;
}

/**
 * Generate weekly schedule template
 */
function generateWeeklySchedule(
  hoursPerDay: number,
  studyDaysPerWeek: number,
  domains: CFPStudyPlanDomain[]
): CFPWeeklySchedule {
  const minutesPerSession = hoursPerDay * 60;
  
  // Determine which days are study days
  const studyDayPattern: boolean[] = (() => {
    switch (studyDaysPerWeek) {
      case 7: return [true, true, true, true, true, true, true];
      case 6: return [true, true, true, true, true, true, false];
      case 5: return [true, true, true, true, true, false, false];
      case 4: return [true, true, false, true, true, false, false];
      case 3: return [true, false, true, false, true, false, false];
      default: return [true, true, true, true, true, false, false];
    }
  })();

  // Get current focus domains (first 2-3 not yet completed)
  const focusDomains = domains.slice(0, 3).map(d => d.domainId);

  const createDayPlan = (isStudyDay: boolean): CFPDayPlan => {
    if (!isStudyDay) {
      return {
        isStudyDay: false,
        hoursPlanned: 0,
        focusDomains: [],
        activities: [],
      };
    }

    const activities: CFPActivity[] = [
      { type: 'lessons', duration: Math.floor(minutesPerSession * 0.3), domainId: focusDomains[0] },
      { type: 'practice', duration: Math.floor(minutesPerSession * 0.4), domainId: focusDomains[0] },
      { type: 'flashcards', duration: Math.floor(minutesPerSession * 0.15) },
      { type: 'review', duration: Math.floor(minutesPerSession * 0.15) },
    ];

    return {
      isStudyDay: true,
      hoursPlanned: hoursPerDay,
      focusDomains,
      activities,
    };
  };

  const dayNames: (keyof CFPWeeklySchedule)[] = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  const schedule: Partial<CFPWeeklySchedule> = {};
  dayNames.forEach((day, index) => {
    schedule[day] = createDayPlan(studyDayPattern[index]);
  });

  // Make Saturday a mock exam day if it's a study day
  if (schedule.saturday?.isStudyDay) {
    schedule.saturday.activities = [
      { type: 'mock-exam', duration: 180, description: 'Full-length mock exam section' },
      { type: 'review', duration: 60, description: 'Review missed questions' },
    ];
  }

  return schedule as CFPWeeklySchedule;
}

/**
 * Calculate recommended daily goals
 */
function calculateDailyGoals(
  domains: CFPStudyPlanDomain[],
  hoursPerDay: number,
  studyDaysPerWeek: number,
  totalDays: number
): CFPDailyGoals {
  const totalStudyDays = Math.floor((totalDays / 7) * studyDaysPerWeek);
  const studyMinutesPerDay = hoursPerDay * 60;
  
  // Total targets
  const totalQuestions = domains.reduce((sum, d) => sum + (d.questionsPerDay * d.daysAllocated), 0);
  const totalLessons = domains.reduce((sum, d) => sum + CFP_DOMAIN_CONFIG[d.domainId].lessonCount, 0);
  const totalFlashcards = domains.length * CFP_FLASHCARDS_PER_DOMAIN;
  
  return {
    questionsPerDay: Math.ceil(totalQuestions / totalStudyDays),
    lessonsPerDay: Math.ceil(totalLessons / (totalStudyDays * 0.4)), // Lessons in first 40%
    flashcardsPerDay: Math.ceil(totalFlashcards / totalStudyDays),
    studyMinutesPerDay,
    reviewMinutesPerDay: Math.floor(studyMinutesPerDay * 0.2),
  };
}

/**
 * Get personalized study tips based on time remaining
 */
export function getStudyTips(plan: CFPStudyPlan): string[] {
  const tips: string[] = [];
  
  if (plan.totalDays < 30) {
    tips.push('With limited time, focus on high-weight domains: Retirement (19%), General Principles (18%), and Professional Conduct (15%)');
    tips.push('Prioritize practice questions over re-reading material');
    tips.push('Use quick reference sheets for memorizing key numbers and thresholds');
  } else if (plan.totalDays < 60) {
    tips.push('Balance lesson content with practice questions (60/40 split recommended)');
    tips.push('Take a full mock exam every 2 weeks to track progress');
    tips.push('Create a dedicated formula and key numbers review sheet');
  } else {
    tips.push('Build a strong foundation by thoroughly completing all domain lessons');
    tips.push('Use flashcards daily for spaced repetition');
    tips.push('Start case study practice early - they test cross-domain knowledge');
  }

  // General tips
  tips.push('Review wrong answers carefully - understand WHY each option is correct or incorrect');
  tips.push('Practice calculator keystrokes (HP 12C or BA II Plus) until automatic');
  tips.push('The exam tests application, not memorization - focus on solving problems, not just reading');

  return tips;
}

/**
 * Calculate study progress percentage
 */
export function calculateProgress(
  plan: CFPStudyPlan,
  completedQuestions: number,
  completedLessons: number,
  mockExamsTaken: number
): number {
  const totalQuestions = 525; // Total questions in question bank
  const totalLessons = Object.values(CFP_DOMAIN_CONFIG).reduce((sum, d) => sum + d.lessonCount, 0);
  const expectedMockExams = Math.floor(plan.totalDays / CFP_MOCK_EXAM_INTERVAL);
  
  const questionProgress = Math.min(1, completedQuestions / totalQuestions) * 40;
  const lessonProgress = Math.min(1, completedLessons / totalLessons) * 40;
  const mockExamProgress = Math.min(1, mockExamsTaken / Math.max(1, expectedMockExams)) * 20;
  
  return Math.round(questionProgress + lessonProgress + mockExamProgress);
}

/**
 * Get domain-specific study recommendations
 */
export function getDomainRecommendations(domainId: CFPDomainId, progress: number): string[] {
  const recommendations: string[] = [];
  const config = CFP_DOMAIN_CONFIG[domainId];
  
  if (progress < 25) {
    recommendations.push(`Start with ${config.name} lessons to build foundational knowledge`);
    recommendations.push('Focus on understanding core concepts before practice questions');
  } else if (progress < 50) {
    recommendations.push(`Continue ${config.name} lessons while adding practice questions`);
    recommendations.push('Begin flashcard review for key terms and thresholds');
  } else if (progress < 75) {
    recommendations.push(`Shift focus to practice questions for ${config.name}`);
    recommendations.push('Identify and review commonly missed topics');
  } else {
    recommendations.push(`Review quick reference sheet for ${config.name}`);
    recommendations.push('Focus on advanced/tricky scenarios in practice questions');
  }
  
  // Domain-specific tips
  switch (domainId) {
    case 'RET':
      recommendations.push('Memorize contribution limits and catch-up amounts');
      recommendations.push('Understand RMD rules, Social Security strategies, and pension calculations');
      break;
    case 'TAX':
      recommendations.push('Know tax brackets, standard deductions, and filing status rules');
      recommendations.push('Practice passive loss rules and capital gain calculations');
      break;
    case 'INV':
      recommendations.push('Master risk-adjusted return calculations (Sharpe, Treynor, Alpha)');
      recommendations.push('Understand bond duration and MPT concepts');
      break;
    case 'EST':
      recommendations.push('Know the unified credit amount and portability rules');
      recommendations.push('Understand trust types and their estate/gift tax implications');
      break;
    case 'RISK':
      recommendations.push('Learn life insurance taxation rules and MEC requirements');
      recommendations.push('Understand disability insurance own-occ vs any-occ');
      break;
    case 'PRO':
      recommendations.push('Focus on fiduciary duty requirements and conflict management');
      recommendations.push('Know the 7 Principles and Standards of Conduct');
      break;
    case 'GEN':
      recommendations.push('Master TVM calculations on both HP 12C and BA II Plus');
      recommendations.push('Know personal financial statement ratios and property ownership forms');
      break;
  }
  
  return recommendations;
}

export default generateCFPStudyPlan;
