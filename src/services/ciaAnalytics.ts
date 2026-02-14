/**
 * CIA Analytics Service
 *
 * Analytics tracking for CIA (Certified Internal Auditor) exam preparation.
 * Delegates common logic to analyticsCore.ts.
 *
 * IIA CIA Exam: 3 parts
 * - Part 1: Essentials of Internal Auditing (125 questions, 2.5 hours)
 * - Part 2: Practice of Internal Auditing (100 questions, 2 hours)
 * - Part 3: Business Knowledge for Internal Auditing (100 questions, 2 hours)
 *
 * Scoring: 250-750 scale, 600 passing
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
  serializeAnalytics as coreSerialize,
  deserializeAnalytics as coreDeserialize,
  formatReadiness,
  buildOverview,
  categorizeSections,
  generateBaseRecommendations,
  appendTrend,
  calculateMasteryLevel,
  calculateTrend,
} from './analyticsCore';

export type { MasteryLevel, TrendDirection, ReadinessLevel, PerformanceTrend };
export { coreSerialize as serializeAnalytics, coreDeserialize as deserializeAnalytics };

// ============================================================================
// Types
// ============================================================================

export type CIAPart = 'CIA1' | 'CIA2' | 'CIA3';

export interface QuestionAttempt {
  questionId: string;
  part: CIAPart;
  topic?: string;
  isCorrect: boolean;
  timeSpent: number;
  attemptedAt: Date;
  cognitiveLevel?: 'knowledge' | 'application' | 'analysis';
  ippfReference?: string;
}

export interface StudySession {
  sessionId: string;
  date: Date;
  duration: number;
  type: 'practice' | 'flashcards' | 'lessons' | 'simulation' | 'review';
  part?: CIAPart;
  questionsAttempted?: number;
}

export interface PartMastery extends SectionMastery {
  part: CIAPart;
  partName: string;
  examWeight: number;
  weakTopics: string[];
  strongTopics: string[];
  ippfStandardsMastery: Record<string, number>;
  scaledScore: number;
  passed: boolean;
}

export interface CIAAnalytics {
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
  partMastery: Record<CIAPart, PartMastery>;
  mockExamsTaken: Record<CIAPart, number>;
  mockExamScores: Record<CIAPart, number[]>;
  scaledScores: Record<CIAPart, number[]>;
  totalMockExamsTaken: number;
  averageScaledScore: number;
  partsPassed: number;
  estimatedPassProbability: Record<CIAPart, number>;
  overallPassProbability: number;
  examReadiness: ReadinessLevel;
  recommendedFocusAreas: string[];
  weeklyTrends: PerformanceTrend[];
  dailyTrends: PerformanceTrend[];
  ippfKnowledge: number;
  iiaStandardsMastery: number;
  ethicsCodeFamiliarity: number;
  riskAssessmentProficiency: number;
}

// ============================================================================
// Part Configuration
// ============================================================================

export const CIA_PART_CONFIG: Record<CIAPart, {
  name: string; weight: number; questions: number; timeMinutes: number; topics: string[];
}> = {
  CIA1: {
    name: 'Essentials of Internal Auditing', weight: 40, questions: 125, timeMinutes: 150,
    topics: ['Foundations of Internal Auditing', 'Independence and Objectivity', 'Proficiency and Due Professional Care', 'Quality Assurance and Improvement Program', 'Governance, Risk Management, and Control', 'Fraud Risks'],
  },
  CIA2: {
    name: 'Practice of Internal Auditing', weight: 30, questions: 100, timeMinutes: 120,
    topics: ['Managing the Internal Audit Activity', 'Planning the Engagement', 'Performing the Engagement', 'Communicating Engagement Results', 'Monitoring Progress'],
  },
  CIA3: {
    name: 'Business Knowledge for Internal Auditing', weight: 30, questions: 100, timeMinutes: 120,
    topics: ['Business Acumen', 'Information Security', 'Information Technology', 'Financial Management'],
  },
};

const CIA_MASTERY_THRESHOLDS: MasteryThresholds = {
  minAttempts: 10, developingMinAttempts: 25,
  expertAccuracy: 90, proficientAccuracy: 80, developingAccuracy: 65,
};

// ============================================================================
// Score Scaling
// ============================================================================

export function rawToScaledScore(rawPercentage: number): number {
  if (rawPercentage <= 0) return 250;
  if (rawPercentage >= 100) return 750;
  if (rawPercentage <= 75) return Math.round(250 + (rawPercentage / 75) * 350);
  return Math.round(600 + ((rawPercentage - 75) / 25) * 150);
}

export function scaledScoreToPassInfo(scaledScore: number): { passed: boolean; probability: number } {
  const passed = scaledScore >= 600;
  let probability: number;
  if (scaledScore < 500) probability = Math.max(0, (scaledScore - 250) / 2.5);
  else if (scaledScore < 550) probability = 10 + (scaledScore - 500) * 0.4;
  else if (scaledScore < 600) probability = 30 + (scaledScore - 550) * 0.8;
  else if (scaledScore < 650) probability = 70 + (scaledScore - 600) * 0.5;
  else probability = 95 + (scaledScore - 650) * 0.04;
  return { passed, probability: Math.min(99, Math.max(0, probability)) };
}

// ============================================================================
// Core Functions
// ============================================================================

function toPartMastery(part: CIAPart, sm: SectionMastery, config: typeof CIA_PART_CONFIG[CIAPart]): PartMastery {
  return {
    ...sm,
    part,
    partName: sm.sectionName,
    examWeight: config.weight,
    weakTopics: sm.weakAreas,
    strongTopics: sm.strongAreas,
    ippfStandardsMastery: {},
    scaledScore: rawToScaledScore(sm.accuracy),
    passed: rawToScaledScore(sm.accuracy) >= 600,
  };
}

export function initializeAnalytics(userId: string): CIAAnalytics {
  const partMastery = {} as Record<CIAPart, PartMastery>;
  const mockExamsTaken = {} as Record<CIAPart, number>;
  const mockExamScores = {} as Record<CIAPart, number[]>;
  const scaledScores = {} as Record<CIAPart, number[]>;
  const estimatedPassProbability = {} as Record<CIAPart, number>;

  (Object.keys(CIA_PART_CONFIG) as CIAPart[]).forEach(part => {
    const config = CIA_PART_CONFIG[part];
    const baseMastery: SectionMastery = {
      sectionId: part, sectionName: config.name, weight: config.weight,
      questionsAttempted: 0, questionsCorrect: 0, accuracy: 0,
      masteryLevel: 'novice', trend: 'stable', averageTimePerQuestion: 0,
      lastPracticed: null, weakAreas: config.topics, strongAreas: [], areaAccuracy: {},
    };
    partMastery[part] = toPartMastery(part, baseMastery, config);
    mockExamsTaken[part] = 0;
    mockExamScores[part] = [];
    scaledScores[part] = [];
    estimatedPassProbability[part] = 0;
  });

  return {
    userId, lastUpdated: new Date(),
    totalQuestionsAttempted: 0, totalQuestionsCorrect: 0, overallAccuracy: 0,
    averageTimePerQuestion: 0, totalStudyMinutes: 0,
    currentStreak: 0, longestStreak: 0, studyDays: 0, lastStudyDate: null,
    partMastery, mockExamsTaken, mockExamScores, scaledScores,
    totalMockExamsTaken: 0, averageScaledScore: 250, partsPassed: 0,
    estimatedPassProbability, overallPassProbability: 0,
    examReadiness: 'not-ready',
    recommendedFocusAreas: ['CIA1', 'CIA2', 'CIA3'],
    weeklyTrends: [], dailyTrends: [],
    ippfKnowledge: 0, iiaStandardsMastery: 0, ethicsCodeFamiliarity: 0, riskAssessmentProficiency: 0,
  };
}

export function recordQuestionAttempt(
  analytics: CIAAnalytics,
  attempt: QuestionAttempt
): CIAAnalytics {
  const newAnalytics = { ...analytics };
  const part = attempt.part;

  updateOverallStats(newAnalytics, attempt.isCorrect, attempt.timeSpent);

  if (newAnalytics.partMastery[part]) {
    const updated = updateSectionMastery(
      newAnalytics.partMastery[part], attempt.isCorrect, attempt.timeSpent,
      attempt.attemptedAt, undefined, CIA_MASTERY_THRESHOLDS
    );
    const pm: PartMastery = {
      ...updated,
      part,
      partName: updated.sectionName,
      examWeight: CIA_PART_CONFIG[part].weight,
      weakTopics: updated.weakAreas,
      strongTopics: updated.strongAreas,
      ippfStandardsMastery: { ...newAnalytics.partMastery[part].ippfStandardsMastery },
      scaledScore: rawToScaledScore(updated.accuracy),
      passed: rawToScaledScore(updated.accuracy) >= 600,
    };

    // Track IPPF references
    if (attempt.ippfReference && pm.ippfStandardsMastery) {
      const currentMastery = pm.ippfStandardsMastery[attempt.ippfReference] || 0;
      pm.ippfStandardsMastery[attempt.ippfReference] =
        Math.round((currentMastery + (attempt.isCorrect ? 100 : 0)) / 2);
    }

    newAnalytics.partMastery[part] = pm;
  }

  // CIA-specific: risk assessment from analysis questions
  if (attempt.cognitiveLevel === 'analysis') {
    const delta = attempt.isCorrect ? 1 : -0.5;
    newAnalytics.riskAssessmentProficiency = Math.min(100, Math.max(0,
      newAnalytics.riskAssessmentProficiency + delta));
  }

  newAnalytics.lastUpdated = new Date();
  return updatePredictions(newAnalytics);
}

export function recordStudySession(
  analytics: CIAAnalytics,
  session: StudySession
): CIAAnalytics {
  const newAnalytics = { ...analytics };
  Object.assign(newAnalytics, processStudySession(newAnalytics, session.date, session.duration));
  return newAnalytics;
}

export function recordMockExam(
  analytics: CIAAnalytics,
  part: CIAPart,
  score: number,
  questionsCorrect: number,
  questionsTotal: number
): CIAAnalytics {
  const newAnalytics = { ...analytics };
  const scaledScore = rawToScaledScore(score);

  newAnalytics.mockExamsTaken[part]++;
  newAnalytics.mockExamScores[part] = [...analytics.mockExamScores[part], score];
  newAnalytics.scaledScores[part] = [...analytics.scaledScores[part], scaledScore];
  newAnalytics.totalMockExamsTaken++;

  // Update part mastery
  const pm = { ...newAnalytics.partMastery[part] };
  pm.questionsAttempted += questionsTotal;
  pm.questionsCorrect += questionsCorrect;
  pm.accuracy = Math.round((pm.questionsCorrect / pm.questionsAttempted) * 100);
  pm.masteryLevel = calculateMasteryLevel(pm.accuracy, pm.questionsAttempted, CIA_MASTERY_THRESHOLDS);
  pm.scaledScore = rawToScaledScore(pm.accuracy);
  pm.passed = pm.scaledScore >= 600;
  pm.lastPracticed = new Date();
  newAnalytics.partMastery[part] = pm;

  // Average scaled score
  let totalScaled = 0;
  let totalExams = 0;
  (Object.keys(newAnalytics.scaledScores) as CIAPart[]).forEach(p => {
    newAnalytics.scaledScores[p].forEach(s => { totalScaled += s; totalExams++; });
  });
  newAnalytics.averageScaledScore = totalExams > 0 ? Math.round(totalScaled / totalExams) : 250;
  newAnalytics.partsPassed = (Object.values(newAnalytics.partMastery) as PartMastery[]).filter(p => p.passed).length;
  newAnalytics.lastUpdated = new Date();

  return updatePredictions(newAnalytics);
}

function updatePredictions(analytics: CIAAnalytics): CIAAnalytics {
  const newAnalytics = { ...analytics };

  (Object.keys(analytics.partMastery) as CIAPart[]).forEach(part => {
    const partData = analytics.partMastery[part];
    const { probability } = scaledScoreToPassInfo(partData.scaledScore);
    let adjustedProb = probability;
    if (partData.questionsAttempted < 50) adjustedProb *= 0.5;
    else if (partData.questionsAttempted < 100) adjustedProb *= 0.75;

    const mockCount = analytics.mockExamsTaken[part];
    if (mockCount > 0) {
      const bestMock = Math.max(...analytics.scaledScores[part]);
      const mockProb = scaledScoreToPassInfo(bestMock).probability;
      adjustedProb = adjustedProb * 0.6 + mockProb * 0.4;
    }
    newAnalytics.estimatedPassProbability[part] = Math.min(95, Math.round(adjustedProb));
  });

  const partProbs = Object.values(newAnalytics.estimatedPassProbability);
  newAnalytics.overallPassProbability = Math.round(
    partProbs.reduce((acc, p) => acc * (p / 100), 1) * 100
  );

  const avgProb = partProbs.reduce((a, b) => a + b, 0) / partProbs.length;
  if (avgProb >= 80 && newAnalytics.partsPassed >= 2) newAnalytics.examReadiness = 'well-prepared';
  else if (avgProb >= 65 || newAnalytics.partsPassed >= 1) newAnalytics.examReadiness = 'ready';
  else if (avgProb >= 45) newAnalytics.examReadiness = 'getting-close';
  else newAnalytics.examReadiness = 'not-ready';

  const focusAreas = (Object.entries(newAnalytics.partMastery) as [CIAPart, PartMastery][])
    .filter(([, p]) => p.accuracy < 75 || p.questionsAttempted < 50)
    .sort((a, b) => ((100 - b[1].accuracy) * b[1].examWeight) - ((100 - a[1].accuracy) * a[1].examWeight))
    .slice(0, 2)
    .map(([part]) => part);
  newAnalytics.recommendedFocusAreas = focusAreas.length > 0 ? focusAreas : ['CIA1'];

  return newAnalytics;
}

// ============================================================================
// Trend & Metric Updates
// ============================================================================

export function updatePartTrend(analytics: CIAAnalytics, part: CIAPart, recentAccuracy: number): CIAAnalytics {
  const partStats = analytics.partMastery[part];
  if (!partStats) return analytics;
  return { ...analytics, partMastery: { ...analytics.partMastery, [part]: { ...partStats, trend: calculateTrend(partStats.accuracy, recentAccuracy) } } };
}

export function updateIppfKnowledge(analytics: CIAAnalytics, score: number): CIAAnalytics {
  return { ...analytics, ippfKnowledge: Math.min(100, Math.max(0, score)), lastUpdated: new Date() };
}

export function updateIiaStandardsMastery(analytics: CIAAnalytics, score: number): CIAAnalytics {
  return { ...analytics, iiaStandardsMastery: Math.min(100, Math.max(0, score)), lastUpdated: new Date() };
}

export function updateEthicsCodeFamiliarity(analytics: CIAAnalytics, score: number): CIAAnalytics {
  return { ...analytics, ethicsCodeFamiliarity: Math.min(100, Math.max(0, score)), lastUpdated: new Date() };
}

export function addDailyTrend(analytics: CIAAnalytics, trend: PerformanceTrend): CIAAnalytics {
  return { ...analytics, dailyTrends: appendTrend(analytics.dailyTrends, trend, 30) };
}

export function addWeeklyTrend(analytics: CIAAnalytics, trend: PerformanceTrend): CIAAnalytics {
  return { ...analytics, weeklyTrends: appendTrend(analytics.weeklyTrends, trend, 12) };
}

// ============================================================================
// Analytics Summary
// ============================================================================

export function getAnalyticsSummary(analytics: CIAAnalytics) {
  const partsArr = Object.values(analytics.partMastery) as PartMastery[];
  const { strengths, weaknesses } = categorizeSections(partsArr as SectionMastery[], 80, 70, 30, 30);

  const recommendations = generateBaseRecommendations(
    { ...analytics, mockExamsTaken: analytics.totalMockExamsTaken }, 200, 3, 7, 'CIA'
  );
  if (analytics.ippfKnowledge < 70) recommendations.push("Review the IPPF framework - it's fundamental to all three parts.");
  if (analytics.iiaStandardsMastery < 60) recommendations.push('Study IIA Standards more thoroughly - heavily tested on Part 1.');
  if (analytics.ethicsCodeFamiliarity < 60) recommendations.push('Review the IIA Code of Ethics - required for Part 1.');
  analytics.recommendedFocusAreas.forEach(part => {
    const p = analytics.partMastery[part as CIAPart];
    if (p) recommendations.push(`Focus on ${p.partName} (${p.examWeight}% weight, currently ${p.accuracy}% accuracy).`);
  });

  const partBreakdown = partsArr
    .sort((a, b) => b.examWeight - a.examWeight)
    .map(p => ({
      part: p.part, name: p.partName, accuracy: p.accuracy,
      level: p.masteryLevel, trend: p.trend, weight: p.examWeight,
      scaledScore: p.scaledScore, passed: p.passed,
    }));

  return {
    overview: {
      ...buildOverview(analytics),
      partsPassed: analytics.partsPassed,
      passChance: `${analytics.overallPassProbability}%`,
      readiness: formatReadiness(analytics.examReadiness),
    },
    strengths,
    weaknesses,
    recommendations: recommendations.slice(0, 5),
    partBreakdown,
    ciaSpecific: {
      ippfScore: analytics.ippfKnowledge,
      iiaStandards: analytics.iiaStandardsMastery,
      ethicsCode: analytics.ethicsCodeFamiliarity,
      riskAssessment: analytics.riskAssessmentProficiency,
    },
  };
}

export function getPartInsights(analytics: CIAAnalytics, part: CIAPart) {
  const pm = analytics.partMastery[part];
  if (!pm) return null;
  const targetAccuracy = 75;
  const gapToPass = Math.max(0, targetAccuracy - pm.accuracy);
  const isOnTrack = pm.accuracy >= targetAccuracy && pm.questionsAttempted >= 40;

  const recommendations: string[] = [];
  if (pm.questionsAttempted < 40) recommendations.push(`Complete at least ${40 - pm.questionsAttempted} more questions.`);
  if (pm.accuracy < 65) recommendations.push('Review fundamental concepts before attempting more questions.');
  else if (pm.accuracy < 75) recommendations.push('Focus on weak topics to push accuracy above passing threshold.');
  const targetTime = CIA_PART_CONFIG[part].timeMinutes * 60 / CIA_PART_CONFIG[part].questions;
  if (pm.averageTimePerQuestion > targetTime * 1.2) recommendations.push(`Work on time management - target ${Math.round(targetTime)} seconds per question.`);
  if (pm.trend === 'declining') recommendations.push('Recent performance is declining. Consider reviewing basics.');

  return {
    part: pm.part, name: pm.partName, accuracy: pm.accuracy,
    questionsAttempted: pm.questionsAttempted, avgTimePerQuestion: pm.averageTimePerQuestion,
    mastery: pm.masteryLevel, trend: pm.trend, examWeight: pm.examWeight,
    scaledScore: pm.scaledScore, passed: pm.passed, isOnTrack, gapToPass,
    weakTopics: pm.weakTopics, strongTopics: pm.strongTopics, recommendations,
  };
}

export function getStudyPlanProgress(analytics: CIAAnalytics) {
  const partProgress = {} as Record<CIAPart, number>;
  let totalProgress = 0;

  (Object.entries(analytics.partMastery) as [CIAPart, PartMastery][]).forEach(([part, mastery]) => {
    const questionsProgress = Math.min(1, mastery.questionsAttempted / 75) * 50;
    const accuracyProgress = Math.min(1, mastery.accuracy / 80) * 50;
    const progress = Math.round(questionsProgress + accuracyProgress);
    partProgress[part] = progress;
    totalProgress += progress;
  });

  const overallProgress = Math.round(totalProgress / 3);
  const milestonesCompleted: string[] = [];
  if (analytics.totalQuestionsAttempted >= 100) milestonesCompleted.push('100 Questions Completed');
  if (analytics.totalQuestionsAttempted >= 500) milestonesCompleted.push('500 Questions Completed');
  if (analytics.totalMockExamsTaken >= 1) milestonesCompleted.push('First Mock Exam Taken');
  if (analytics.partsPassed >= 1) milestonesCompleted.push('First Part Passed (Mock)');
  if (analytics.partsPassed >= 3) milestonesCompleted.push('All Parts Passed (Mock)');
  if (analytics.currentStreak >= 7) milestonesCompleted.push('7-Day Study Streak');
  if (analytics.ippfKnowledge >= 80) milestonesCompleted.push('IPPF Master');

  let nextMilestone = '';
  if (analytics.totalQuestionsAttempted < 100) nextMilestone = `Complete ${100 - analytics.totalQuestionsAttempted} more questions`;
  else if (analytics.totalMockExamsTaken < 1) nextMilestone = 'Take your first mock exam';
  else if (analytics.partsPassed < 1) nextMilestone = 'Score 600+ on a part mock exam';
  else if (analytics.partsPassed < 3) {
    const failedParts = (Object.entries(analytics.partMastery) as [CIAPart, PartMastery][])
      .filter(([, p]) => !p.passed)
      .map(([part]) => part);
    nextMilestone = `Pass ${failedParts[0]} mock exam`;
  } else nextMilestone = 'Ready for exam day!';

  return { overallProgress, partProgress, milestonesCompleted, nextMilestone };
}
