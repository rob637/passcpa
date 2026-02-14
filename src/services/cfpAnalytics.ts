/**
 * CFP Analytics Service
 *
 * Analytics tracking for CFP (Certified Financial Planner) exam preparation.
 * Delegates common logic to analyticsCore.ts.
 *
 * CFP Exam: 170 questions, 3 hours
 * Scoring: Percentage-based, ~70% estimated passing
 * Domains: 7 (Retirement, General, Professional Conduct, Tax, Estate, Risk, Investments)
 */

import {
  type MasteryLevel,
  type TrendDirection,
  type ReadinessLevel,
  type PerformanceTrend,
  type SectionMastery,
  type MasteryThresholds,
  updateOverallStats,
  updateSectionMastery,
  processStudySession,
  processMockExam,
  updateSectionsFromMockExam,
  calculateWeightedScore,
  identifyFocusAreas,
  applyConfidenceAdjustment,
  buildOverview,
  categorizeSections,
  generateBaseRecommendations,
  buildSectionBreakdown,
  appendTrend,
  calculateTrend,
} from './analyticsCore';

export type { MasteryLevel, TrendDirection, ReadinessLevel, PerformanceTrend };

// ============================================================================
// Types
// ============================================================================

export interface QuestionAttempt {
  questionId: string;
  domain: string;
  topic?: string;
  isCorrect: boolean;
  timeSpent: number;
  attemptedAt: Date;
}

export interface StudySession {
  sessionId: string;
  date: Date;
  duration: number;
  type: 'practice' | 'flashcards' | 'lessons' | 'simulation' | 'review';
  domain?: string;
  questionsAttempted?: number;
}

export interface DomainMastery extends SectionMastery {
  domain: string;
  domainName: string;
  examWeight: number;
  weakTopics: string[];
  strongTopics: string[];
}

export interface CFPAnalytics {
  userId: string;
  lastUpdated: Date;
  totalQuestionsAttempted: number;
  totalQuestionsCorrect: number;
  overallAccuracy: number;
  averageTimePerQuestion: number;
  totalStudyMinutes: number;
  currentStreak: number;
  longestStreak: number;
  studyDays: number;
  lastStudyDate: Date | null;
  domainMastery: Record<string, DomainMastery>;
  mockExamsTaken: number;
  mockExamScores: number[];
  averageMockScore: number;
  bestMockScore: number;
  estimatedPassProbability: number;
  examReadiness: ReadinessLevel;
  recommendedFocusAreas: string[];
  weeklyTrends: PerformanceTrend[];
  dailyTrends: PerformanceTrend[];
}

// ============================================================================
// Domain Configuration
// ============================================================================

export const DOMAIN_CONFIG: Record<string, { name: string; weight: number }> = {
  retirement: { name: 'Retirement Savings and Income Planning', weight: 19 },
  general: { name: 'General Financial Planning Principles', weight: 18 },
  professional: { name: 'Professional Conduct and Regulation', weight: 15 },
  tax: { name: 'Tax Planning', weight: 14 },
  estate: { name: 'Estate Planning', weight: 12 },
  risk: { name: 'Risk Management and Insurance Planning', weight: 12 },
  investment: { name: 'Investment Planning', weight: 11 },
};

const CFP_MASTERY_THRESHOLDS: MasteryThresholds = {
  minAttempts: 10,
  developingMinAttempts: 20,
  expertAccuracy: 85,
  proficientAccuracy: 75,
  developingAccuracy: 60,
};

// ============================================================================
// Core Functions
// ============================================================================

function toDomainMastery(sm: SectionMastery): DomainMastery {
  return {
    ...sm,
    domain: sm.sectionId,
    domainName: sm.sectionName,
    examWeight: sm.weight,
    weakTopics: sm.weakAreas,
    strongTopics: sm.strongAreas,
  };
}

export function initializeAnalytics(userId: string): CFPAnalytics {
  const domainMastery: Record<string, DomainMastery> = {};
  Object.entries(DOMAIN_CONFIG).forEach(([domain, config]) => {
    const baseMastery: SectionMastery = {
      sectionId: domain, sectionName: config.name, weight: config.weight,
      questionsAttempted: 0, questionsCorrect: 0, accuracy: 0,
      masteryLevel: 'novice', trend: 'stable', averageTimePerQuestion: 0,
      lastPracticed: null, weakAreas: [], strongAreas: [], areaAccuracy: {},
    };
    domainMastery[domain] = toDomainMastery(baseMastery);
  });

  return {
    userId, lastUpdated: new Date(),
    totalQuestionsAttempted: 0, totalQuestionsCorrect: 0, overallAccuracy: 0,
    averageTimePerQuestion: 0, totalStudyMinutes: 0,
    currentStreak: 0, longestStreak: 0, studyDays: 0, lastStudyDate: null,
    domainMastery, mockExamsTaken: 0, mockExamScores: [],
    averageMockScore: 0, bestMockScore: 0,
    estimatedPassProbability: 0,
    examReadiness: 'not-ready',
    recommendedFocusAreas: Object.keys(DOMAIN_CONFIG),
    weeklyTrends: [], dailyTrends: [],
  };
}

export function recordQuestionAttempt(
  analytics: CFPAnalytics,
  attempt: QuestionAttempt
): CFPAnalytics {
  const newAnalytics = { ...analytics };
  const domain = attempt.domain;

  updateOverallStats(newAnalytics, attempt.isCorrect, attempt.timeSpent);

  if (newAnalytics.domainMastery[domain]) {
    const updated = updateSectionMastery(
      newAnalytics.domainMastery[domain], attempt.isCorrect, attempt.timeSpent,
      attempt.attemptedAt, undefined, CFP_MASTERY_THRESHOLDS
    );
    newAnalytics.domainMastery[domain] = toDomainMastery(updated);
  }

  newAnalytics.lastUpdated = new Date();
  return updatePredictions(newAnalytics);
}

export function recordStudySession(
  analytics: CFPAnalytics,
  session: StudySession
): CFPAnalytics {
  const newAnalytics = { ...analytics };
  Object.assign(newAnalytics, processStudySession(newAnalytics, session.date, session.duration));
  return newAnalytics;
}

export function recordMockExam(
  analytics: CFPAnalytics,
  score: number,
  domainScores: Record<string, { correct: number; total: number }>
): CFPAnalytics {
  const newAnalytics = { ...analytics };

  const mockUpdates = processMockExam(newAnalytics, score);
  Object.assign(newAnalytics, mockUpdates);

  newAnalytics.domainMastery = updateSectionsFromMockExam(
    newAnalytics.domainMastery, domainScores, CFP_MASTERY_THRESHOLDS
  ) as Record<string, DomainMastery>;

  newAnalytics.lastUpdated = new Date();
  return updatePredictions(newAnalytics);
}

export function updateDomainTrend(
  analytics: CFPAnalytics,
  domain: string,
  recentAccuracy: number
): CFPAnalytics {
  const domainStats = analytics.domainMastery[domain];
  if (!domainStats) return analytics;
  return {
    ...analytics,
    domainMastery: {
      ...analytics.domainMastery,
      [domain]: { ...domainStats, trend: calculateTrend(domainStats.accuracy, recentAccuracy) },
    },
  };
}

function updatePredictions(analytics: CFPAnalytics): CFPAnalytics {
  const newAnalytics = { ...analytics };
  const sections = Object.values(analytics.domainMastery) as SectionMastery[];
  const effectiveScore = calculateWeightedScore(sections);

  const questionsFactor = Math.min(1, analytics.totalQuestionsAttempted / 500);
  const mockExamFactor = Math.min(1, analytics.mockExamsTaken / 3);
  const accuracyFactor = effectiveScore / 100;

  let rawProbability = (
    accuracyFactor * 0.5 +
    (analytics.bestMockScore / 100) * 0.3 +
    questionsFactor * 0.1 +
    mockExamFactor * 0.1
  );
  rawProbability = applyConfidenceAdjustment(rawProbability, analytics.totalQuestionsAttempted);
  newAnalytics.estimatedPassProbability = Math.min(95, Math.round(rawProbability * 100));

  if (newAnalytics.estimatedPassProbability >= 80) newAnalytics.examReadiness = 'well-prepared';
  else if (newAnalytics.estimatedPassProbability >= 65) newAnalytics.examReadiness = 'ready';
  else if (newAnalytics.estimatedPassProbability >= 45) newAnalytics.examReadiness = 'getting-close';
  else newAnalytics.examReadiness = 'not-ready';

  newAnalytics.recommendedFocusAreas = identifyFocusAreas(sections, 70, 30, 3);
  return newAnalytics;
}

export function addDailyTrend(analytics: CFPAnalytics, trend: PerformanceTrend): CFPAnalytics {
  return { ...analytics, dailyTrends: appendTrend(analytics.dailyTrends, trend, 30) };
}

export function addWeeklyTrend(analytics: CFPAnalytics, trend: PerformanceTrend): CFPAnalytics {
  return { ...analytics, weeklyTrends: appendTrend(analytics.weeklyTrends, trend, 12) };
}

// ============================================================================
// Analytics Summary
// ============================================================================

export function getAnalyticsSummary(analytics: CFPAnalytics) {
  const sections = Object.values(analytics.domainMastery) as SectionMastery[];
  const { strengths, weaknesses } = categorizeSections(sections, 80, 65);
  const recommendations = generateBaseRecommendations(analytics, 200, 2, 7, 'CFP');

  analytics.recommendedFocusAreas.forEach(domain => {
    const d = analytics.domainMastery[domain];
    if (d) recommendations.push(`Focus on ${d.domainName} (${d.examWeight}% of exam, currently ${d.accuracy}% accuracy).`);
  });

  return {
    overview: {
      ...buildOverview(analytics),
      passChance: `${analytics.estimatedPassProbability}%`,
      readiness: analytics.examReadiness.replace('-', ' '),
    },
    strengths, weaknesses,
    recommendations,
    domainBreakdown: buildSectionBreakdown(sections).map(s => ({
      domain: s.sectionId, name: s.name, accuracy: s.accuracy,
      level: s.level, trend: s.trend, weight: s.weight,
    })),
  };
}

export function getTimeInsights(analytics: CFPAnalytics) {
  const avgTime = analytics.averageTimePerQuestion;
  let timeStatus: 'too-fast' | 'good' | 'too-slow';
  let recommendation: string;

  if (avgTime < 30) {
    timeStatus = 'too-fast';
    recommendation = 'You may be rushing. Take time to read questions and all options carefully.';
  } else if (avgTime > 90) {
    timeStatus = 'too-slow';
    recommendation = 'Work on time management. Target 60-70 seconds per question to complete the exam.';
  } else {
    timeStatus = 'good';
    recommendation = 'Your pace is good. Maintain this timing on exam day.';
  }

  const domainTimes = Object.values(analytics.domainMastery)
    .filter(d => d.questionsAttempted > 0)
    .map(d => ({
      domain: d.domainName,
      avgTime: d.averageTimePerQuestion,
      status: d.averageTimePerQuestion < 30 ? 'Fast' : d.averageTimePerQuestion > 90 ? 'Slow' : 'Good',
    }));

  return { averageTimePerQuestion: avgTime, timeStatus, recommendation, domainTimes };
}

export function getConsistencyScore(analytics: CFPAnalytics) {
  let score = 0;
  score += Math.min(40, analytics.currentStreak * 4);
  score += Math.min(30, analytics.studyDays * 2);
  score += Math.min(30, analytics.totalQuestionsAttempted / 20);

  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  let message: string;
  if (score >= 90) { grade = 'A'; message = 'Excellent consistency! Keep up the great work.'; }
  else if (score >= 80) { grade = 'B'; message = 'Good consistency. Try to study a little more each day.'; }
  else if (score >= 70) { grade = 'C'; message = 'Moderate consistency. Build longer study streaks.'; }
  else if (score >= 60) { grade = 'D'; message = 'Room for improvement. Set daily study reminders.'; }
  else { grade = 'F'; message = 'Just getting started. Commit to daily practice.'; }

  return { score: Math.round(score), grade, message };
}

export default {
  initializeAnalytics,
  recordQuestionAttempt,
  recordStudySession,
  recordMockExam,
  updateDomainTrend,
  addDailyTrend,
  addWeeklyTrend,
  getAnalyticsSummary,
  getTimeInsights,
  getConsistencyScore,
};
