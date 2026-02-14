/**
 * CMA Analytics Service
 *
 * Analytics tracking for CMA (Certified Management Accountant) exam preparation.
 * Delegates common logic to analyticsCore.ts.
 *
 * IMA CMA Exam Structure:
 * - Part 1: Financial Planning, Performance, and Analytics (100 MCQs + 2 essays, 4 hours)
 * - Part 2: Strategic Financial Management (100 MCQs + 2 essays, 4 hours)
 *
 * Scoring: 0-500 scale, 360 passing
 */

import { CMASectionId } from '../courses/cma/config';
import {
  type MasteryLevel,
  type TrendDirection,
  type ReadinessLevel,
  type PerformanceTrend,
  type SectionMastery,
  type SectionConfig,
  updateOverallStats,
  updateSectionMastery,
  processStudySession,
  loadFromStorage,
  saveToStorage,
  serializeAnalytics as coreSerialize,
  deserializeAnalytics as coreDeserialize,
  buildOverview,
  getAreaWeight,
  DEFAULT_MASTERY_THRESHOLDS,
} from './analyticsCore';

export type { MasteryLevel, TrendDirection, ReadinessLevel, PerformanceTrend };

// ============================================================================
// Types
// ============================================================================

export interface QuestionAttempt {
  questionId: string;
  part: CMASectionId;
  domain?: string;
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
  part?: CMASectionId;
  questionsAttempted?: number;
}

export interface PartMastery extends SectionMastery {
  part: CMASectionId;
  partName: string;
  weakDomains: string[];
  strongDomains: string[];
  domainAccuracy: Record<string, number>;
}

export interface CMAAnalytics {
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
  partMastery: Record<CMASectionId, PartMastery>;
  mockExamsTaken: number;
  mockExamScores: { part: CMASectionId; score: number; date: Date }[];
  scaledScores: { part: CMASectionId; score: number; date: Date }[];
  partPerformance: Record<CMASectionId, { average: number; best: number; attempts: number }>;
  estimatedPassProbability: Record<CMASectionId, number>;
  estimatedScaledScore: Record<CMASectionId, number>;
  examReadiness: Record<CMASectionId, ReadinessLevel>;
  recommendedFocusAreas: string[];
  weeklyTrends: PerformanceTrend[];
  dailyTrends: PerformanceTrend[];
  financialAnalysisSkill: number;
  strategicThinkingScore: number;
  ethicsKnowledge: number;
}

// ============================================================================
// Part Configuration
// ============================================================================

export const CMA_PART_CONFIG: Record<CMASectionId, { name: string; domains: { id: string; name: string; weight: number }[] }> = {
  CMA1: {
    name: 'Financial Planning, Performance, and Analytics',
    domains: [
      { id: 'CMA1-A', name: 'External Financial Reporting Decisions', weight: 15 },
      { id: 'CMA1-B', name: 'Planning, Budgeting, and Forecasting', weight: 20 },
      { id: 'CMA1-C', name: 'Performance Management', weight: 20 },
      { id: 'CMA1-D', name: 'Cost Management', weight: 15 },
      { id: 'CMA1-E', name: 'Internal Controls', weight: 15 },
      { id: 'CMA1-F', name: 'Technology and Analytics', weight: 15 },
    ],
  },
  CMA2: {
    name: 'Strategic Financial Management',
    domains: [
      { id: 'CMA2-A', name: 'Financial Statement Analysis', weight: 20 },
      { id: 'CMA2-B', name: 'Corporate Finance', weight: 20 },
      { id: 'CMA2-C', name: 'Decision Analysis', weight: 25 },
      { id: 'CMA2-D', name: 'Risk Management', weight: 10 },
      { id: 'CMA2-E', name: 'Investment Decisions', weight: 10 },
      { id: 'CMA2-F', name: 'Professional Ethics', weight: 15 },
    ],
  },
};

const CMA_SECTION_CONFIGS: SectionConfig[] = Object.entries(CMA_PART_CONFIG).map(([id, cfg]) => ({
  id,
  name: cfg.name,
  weight: 50,
  areas: cfg.domains,
}));

const CMA_MASTERY_THRESHOLDS = { ...DEFAULT_MASTERY_THRESHOLDS, proficientAccuracy: 72 };

// ============================================================================
// Score Scaling
// ============================================================================

export function rawToScaledScore(rawPercentage: number): number {
  if (rawPercentage <= 0) return 0;
  if (rawPercentage >= 100) return 500;
  return Math.round((rawPercentage / 100) * 500);
}

export function scaledScoreToPassProbability(scaledScore: number): number {
  if (scaledScore < 280) return Math.max(0, (scaledScore / 280) * 20);
  if (scaledScore < 320) return 20 + ((scaledScore - 280) / 40) * 20;
  if (scaledScore < 360) return 40 + ((scaledScore - 320) / 40) * 30;
  if (scaledScore < 400) return 70 + ((scaledScore - 360) / 40) * 20;
  return Math.min(99, 90 + ((scaledScore - 400) / 100) * 9);
}

// ============================================================================
// Storage
// ============================================================================

const STORAGE_KEY = 'cma-analytics';
export { coreSerialize as serializeAnalytics, coreDeserialize as deserializeAnalytics };

// ============================================================================
// Core Functions
// ============================================================================

let analyticsState: CMAAnalytics | null = loadFromStorage<CMAAnalytics>(STORAGE_KEY);

function toPartMastery(sectionId: string, sm: SectionMastery): PartMastery {
  return {
    ...sm,
    part: sectionId as CMASectionId,
    partName: sm.sectionName,
    weakDomains: sm.weakAreas,
    strongDomains: sm.strongAreas,
    domainAccuracy: sm.areaAccuracy,
  };
}

export function initializeAnalytics(userId: string): CMAAnalytics {
  const partMastery = {} as Record<CMASectionId, PartMastery>;
  const estimatedPassProbability = {} as Record<CMASectionId, number>;
  const estimatedScaledScore = {} as Record<CMASectionId, number>;
  const examReadiness = {} as Record<CMASectionId, ReadinessLevel>;
  const partPerformance = {} as Record<CMASectionId, { average: number; best: number; attempts: number }>;

  const parts: CMASectionId[] = ['CMA1', 'CMA2'];
  parts.forEach(part => {
    const config = CMA_PART_CONFIG[part];
    const baseMastery: SectionMastery = {
      sectionId: part, sectionName: config.name, weight: 50,
      questionsAttempted: 0, questionsCorrect: 0, accuracy: 0,
      masteryLevel: 'novice', trend: 'stable', averageTimePerQuestion: 0,
      lastPracticed: null, weakAreas: config.domains.map(d => d.id),
      strongAreas: [], areaAccuracy: {},
    };
    partMastery[part] = toPartMastery(part, baseMastery);
    estimatedPassProbability[part] = 0;
    estimatedScaledScore[part] = 0;
    examReadiness[part] = 'not-ready';
    partPerformance[part] = { average: 0, best: 0, attempts: 0 };
  });

  return {
    userId, lastUpdated: new Date(),
    totalQuestionsAttempted: 0, totalQuestionsCorrect: 0, overallAccuracy: 0,
    averageTimePerQuestion: 0, totalStudyMinutes: 0,
    currentStreak: 0, longestStreak: 0, studyDays: 0, lastStudyDate: null,
    partMastery, mockExamsTaken: 0, mockExamScores: [], scaledScores: [],
    partPerformance, estimatedPassProbability, estimatedScaledScore, examReadiness,
    recommendedFocusAreas: ['CMA1-B', 'CMA1-C', 'CMA2-C'],
    weeklyTrends: [], dailyTrends: [],
    financialAnalysisSkill: 0, strategicThinkingScore: 0, ethicsKnowledge: 0,
  };
}

export function loadAnalytics(): CMAAnalytics | null {
  return loadFromStorage<CMAAnalytics>(STORAGE_KEY);
}

export function saveAnalytics(analytics: CMAAnalytics): void {
  saveToStorage(STORAGE_KEY, analytics);
}

export function getAnalytics(userId: string): CMAAnalytics {
  if (!analyticsState || analyticsState.userId !== userId) {
    analyticsState = loadAnalytics() || initializeAnalytics(userId);
  }
  return analyticsState;
}

export function recordQuestionAttempt(attempt: QuestionAttempt): CMAAnalytics {
  if (!analyticsState) analyticsState = initializeAnalytics('default');
  const analytics = { ...analyticsState };
  const part = attempt.part;

  updateOverallStats(analytics, attempt.isCorrect, attempt.timeSpent);

  if (analytics.partMastery[part]) {
    const updated = updateSectionMastery(
      analytics.partMastery[part], attempt.isCorrect, attempt.timeSpent,
      attempt.attemptedAt, attempt.domain, CMA_MASTERY_THRESHOLDS, 70, 80
    );
    analytics.partMastery[part] = toPartMastery(part, updated);
  }

  // CMA-specific metrics
  if (part === 'CMA2' && attempt.domain === 'CMA2-A') {
    const delta = attempt.isCorrect ? 2 : -1;
    analytics.financialAnalysisSkill = Math.min(100, Math.max(0, analytics.financialAnalysisSkill + delta));
  }
  if (attempt.domain === 'CMA2-C' || attempt.domain === 'CMA2-E') {
    const delta = attempt.isCorrect ? 1 : -0.5;
    analytics.strategicThinkingScore = Math.min(100, Math.max(0, analytics.strategicThinkingScore + delta));
  }
  if (attempt.domain === 'CMA2-F') {
    const delta = attempt.isCorrect ? 2 : -1;
    analytics.ethicsKnowledge = Math.min(100, Math.max(0, analytics.ethicsKnowledge + delta));
  }

  analytics.lastUpdated = new Date();
  const updatedAnalytics = updatePredictions(analytics);
  analyticsState = updatedAnalytics;
  saveAnalytics(updatedAnalytics);
  return updatedAnalytics;
}

export function recordStudySession(session: StudySession): CMAAnalytics {
  if (!analyticsState) analyticsState = initializeAnalytics('default');
  const analytics = { ...analyticsState };
  Object.assign(analytics, processStudySession(analytics, session.date, session.duration));
  analyticsState = analytics;
  saveAnalytics(analytics);
  return analytics;
}

export function recordMockExam(part: CMASectionId, rawScore: number): CMAAnalytics {
  if (!analyticsState) analyticsState = initializeAnalytics('default');
  const analytics = { ...analyticsState };
  const scaledScore = rawToScaledScore(rawScore);
  const now = new Date();

  analytics.mockExamsTaken++;
  analytics.mockExamScores.push({ part, score: rawScore, date: now });
  analytics.scaledScores.push({ part, score: scaledScore, date: now });

  const partPerf = analytics.partPerformance[part];
  partPerf.attempts++;
  partPerf.average = Math.round(
    (partPerf.average * (partPerf.attempts - 1) + rawScore) / partPerf.attempts
  );
  if (rawScore > partPerf.best) partPerf.best = rawScore;

  analytics.lastUpdated = now;
  const updatedAnalytics = updatePredictions(analytics);
  analyticsState = updatedAnalytics;
  saveAnalytics(updatedAnalytics);
  return updatedAnalytics;
}

function updatePredictions(analytics: CMAAnalytics): CMAAnalytics {
  const parts: CMASectionId[] = ['CMA1', 'CMA2'];
  parts.forEach(part => {
    const pm = analytics.partMastery[part];
    analytics.estimatedScaledScore[part] = rawToScaledScore(pm.accuracy);
    analytics.estimatedPassProbability[part] = scaledScoreToPassProbability(analytics.estimatedScaledScore[part]);
    const prob = analytics.estimatedPassProbability[part];
    const questions = pm.questionsAttempted;
    if (prob < 40 || questions < 100) analytics.examReadiness[part] = 'not-ready';
    else if (prob < 70 || questions < 300) analytics.examReadiness[part] = 'getting-close';
    else if (prob < 85) analytics.examReadiness[part] = 'ready';
    else analytics.examReadiness[part] = 'well-prepared';
  });

  const allWeakDomains: string[] = [];
  parts.forEach(part => allWeakDomains.push(...analytics.partMastery[part].weakDomains));
  analytics.recommendedFocusAreas = allWeakDomains
    .sort((a, b) => getAreaWeight(CMA_SECTION_CONFIGS, b) - getAreaWeight(CMA_SECTION_CONFIGS, a))
    .slice(0, 5);

  return analytics;
}

export function getInsights(): {
  overview: { accuracy: number; questionsCompleted: number; studyHours: number; streak: number };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  partBreakdown: { part: CMASectionId; accuracy: number; readiness: string; passProbability: number }[];
} {
  if (!analyticsState) {
    return {
      overview: { accuracy: 0, questionsCompleted: 0, studyHours: 0, streak: 0 },
      strengths: [], weaknesses: [],
      recommendations: ['Start practicing to see insights'], partBreakdown: [],
    };
  }

  const parts: CMASectionId[] = ['CMA1', 'CMA2'];
  const partBreakdown = parts.map(part => ({
    part,
    accuracy: analyticsState!.partMastery[part].accuracy,
    readiness: analyticsState!.examReadiness[part],
    passProbability: analyticsState!.estimatedPassProbability[part],
  }));

  const allStrong = parts.flatMap(p => analyticsState!.partMastery[p].strongDomains);
  const allWeak = parts.flatMap(p => analyticsState!.partMastery[p].weakDomains);

  const recommendations: string[] = [];
  if (analyticsState.ethicsKnowledge < 70) {
    recommendations.push('Focus on Professional Ethics (CMA2-F) - 15% of Part 2');
  }
  parts.forEach(part => {
    if (analyticsState!.examReadiness[part] === 'not-ready') {
      recommendations.push(`Increase practice volume for ${part} (${CMA_PART_CONFIG[part].name})`);
    }
  });
  if (analyticsState.currentStreak < 7) {
    recommendations.push('Build a daily study habit - consistency is key');
  }

  return {
    overview: buildOverview(analyticsState),
    strengths: allStrong.slice(0, 5),
    weaknesses: allWeak.slice(0, 5),
    recommendations: recommendations.slice(0, 5),
    partBreakdown,
  };
}

export function resetAnalytics(userId: string): CMAAnalytics {
  analyticsState = initializeAnalytics(userId);
  saveAnalytics(analyticsState);
  return analyticsState;
}
