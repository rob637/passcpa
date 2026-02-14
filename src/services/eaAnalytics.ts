/**
 * EA Analytics Service
 *
 * Comprehensive analytics tracking for EA (Enrolled Agent) exam preparation.
 * Delegates common logic to analyticsCore.ts.
 *
 * IRS SEE Exam Structure:
 * - Part 1: Individuals (100 questions, 3.5 hours)
 * - Part 2: Businesses (100 questions, 3.5 hours)
 * - Part 3: Representation (100 questions, 3.5 hours)
 *
 * Scoring: 40-130 scale, 105 passing
 */

import { EASectionId } from '../courses/ea/config';
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
  part: EASectionId;
  domain?: string;
  topic?: string;
  isCorrect: boolean;
  timeSpent: number;
  attemptedAt: Date;
  irsFormRef?: string;
}

export interface StudySession {
  sessionId: string;
  date: Date;
  duration: number;
  type: 'practice' | 'flashcards' | 'lessons' | 'simulation' | 'review';
  part?: EASectionId;
  questionsAttempted?: number;
}

export interface PartMastery extends SectionMastery {
  part: EASectionId;
  partName: string;
  weakDomains: string[];
  strongDomains: string[];
  domainAccuracy: Record<string, number>;
}

export interface EAAnalytics {
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
  partMastery: Record<EASectionId, PartMastery>;
  mockExamsTaken: number;
  mockExamScores: { part: EASectionId; score: number; date: Date }[];
  scaledScores: { part: EASectionId; score: number; date: Date }[];
  partPerformance: Record<EASectionId, { average: number; best: number; attempts: number }>;
  estimatedPassProbability: Record<EASectionId, number>;
  estimatedScaledScore: Record<EASectionId, number>;
  examReadiness: Record<EASectionId, ReadinessLevel>;
  recommendedFocusAreas: string[];
  weeklyTrends: PerformanceTrend[];
  dailyTrends: PerformanceTrend[];
  circular230Knowledge: number;
  irsFormProficiency: number;
  taxLawCurrentness: number;
}

// ============================================================================
// Part Configuration (IRS SEE Content Outline 2025-2026)
// ============================================================================

export const EA_PART_CONFIG: Record<EASectionId, { name: string; domains: { id: string; name: string; weight: number }[] }> = {
  SEE1: {
    name: 'Individuals',
    domains: [
      { id: 'SEE1-1', name: 'Preliminary Work and Taxpayer Data', weight: 16.5 },
      { id: 'SEE1-2', name: 'Income and Assets', weight: 20.0 },
      { id: 'SEE1-3', name: 'Deductions and Credits', weight: 20.0 },
      { id: 'SEE1-4', name: 'Taxation', weight: 17.6 },
      { id: 'SEE1-5', name: 'Advising the Individual Taxpayer', weight: 12.9 },
      { id: 'SEE1-6', name: 'Specialized Returns for Individuals', weight: 13.0 },
    ],
  },
  SEE2: {
    name: 'Businesses',
    domains: [
      { id: 'SEE2-1', name: 'Business Financial Information', weight: 33.5 },
      { id: 'SEE2-2', name: 'Specialized Returns and Taxpayers', weight: 33.5 },
      { id: 'SEE2-3', name: 'Specific Types of Business Financial Activities', weight: 33.0 },
    ],
  },
  SEE3: {
    name: 'Representation, Practices, and Procedures',
    domains: [
      { id: 'SEE3-1', name: 'Practices and Procedures', weight: 27.0 },
      { id: 'SEE3-2', name: 'Representation', weight: 30.0 },
      { id: 'SEE3-3', name: 'Specific Areas of Representation', weight: 23.0 },
      { id: 'SEE3-4', name: 'Filing Process', weight: 20.0 },
    ],
  },
};

const EA_SECTION_CONFIGS: SectionConfig[] = Object.entries(EA_PART_CONFIG).map(([id, cfg]) => ({
  id,
  name: cfg.name,
  weight: 33,
  areas: cfg.domains,
}));

const EA_MASTERY_THRESHOLDS = DEFAULT_MASTERY_THRESHOLDS;

// ============================================================================
// Score Scaling
// ============================================================================

export function rawToScaledScore(rawPercentage: number): number {
  if (rawPercentage <= 0) return 40;
  if (rawPercentage >= 100) return 130;
  return Math.round(40 + (rawPercentage / 100) * 90);
}

export function scaledScoreToPassProbability(scaledScore: number): number {
  if (scaledScore < 85) return Math.max(0, (scaledScore - 40) / 45 * 20);
  if (scaledScore < 95) return 20 + ((scaledScore - 85) / 10) * 20;
  if (scaledScore < 105) return 40 + ((scaledScore - 95) / 10) * 30;
  if (scaledScore < 115) return 70 + ((scaledScore - 105) / 10) * 20;
  return Math.min(99, 90 + ((scaledScore - 115) / 15) * 9);
}

// ============================================================================
// Storage
// ============================================================================

const STORAGE_KEY = 'ea-analytics';

export { coreSerialize as serializeAnalytics, coreDeserialize as deserializeAnalytics };

// ============================================================================
// Core Functions
// ============================================================================

let analyticsState: EAAnalytics | null = loadFromStorage<EAAnalytics>(STORAGE_KEY);

function toPartMastery(sectionId: string, sm: SectionMastery): PartMastery {
  return {
    ...sm,
    part: sectionId as EASectionId,
    partName: sm.sectionName,
    weakDomains: sm.weakAreas,
    strongDomains: sm.strongAreas,
    domainAccuracy: sm.areaAccuracy,
  };
}

export function initializeAnalytics(userId: string): EAAnalytics {
  const partMastery = {} as Record<EASectionId, PartMastery>;
  const estimatedPassProbability = {} as Record<EASectionId, number>;
  const estimatedScaledScore = {} as Record<EASectionId, number>;
  const examReadiness = {} as Record<EASectionId, ReadinessLevel>;
  const partPerformance = {} as Record<EASectionId, { average: number; best: number; attempts: number }>;

  const parts: EASectionId[] = ['SEE1', 'SEE2', 'SEE3'];
  parts.forEach(part => {
    const config = EA_PART_CONFIG[part];
    const baseMastery: SectionMastery = {
      sectionId: part,
      sectionName: config.name,
      weight: 33,
      questionsAttempted: 0,
      questionsCorrect: 0,
      accuracy: 0,
      masteryLevel: 'novice',
      trend: 'stable',
      averageTimePerQuestion: 0,
      lastPracticed: null,
      weakAreas: config.domains.map(d => d.id),
      strongAreas: [],
      areaAccuracy: {},
    };
    partMastery[part] = toPartMastery(part, baseMastery);
    estimatedPassProbability[part] = 0;
    estimatedScaledScore[part] = 40;
    examReadiness[part] = 'not-ready';
    partPerformance[part] = { average: 0, best: 0, attempts: 0 };
  });

  return {
    userId,
    lastUpdated: new Date(),
    totalQuestionsAttempted: 0,
    totalQuestionsCorrect: 0,
    overallAccuracy: 0,
    averageTimePerQuestion: 0,
    totalStudyMinutes: 0,
    currentStreak: 0,
    longestStreak: 0,
    studyDays: 0,
    lastStudyDate: null,
    partMastery,
    mockExamsTaken: 0,
    mockExamScores: [],
    scaledScores: [],
    partPerformance,
    estimatedPassProbability,
    estimatedScaledScore,
    examReadiness,
    recommendedFocusAreas: ['SEE1-2', 'SEE1-3', 'SEE2-1'],
    weeklyTrends: [],
    dailyTrends: [],
    circular230Knowledge: 0,
    irsFormProficiency: 0,
    taxLawCurrentness: 0,
  };
}

export function loadAnalytics(): EAAnalytics | null {
  return loadFromStorage<EAAnalytics>(STORAGE_KEY);
}

export function saveAnalytics(analytics: EAAnalytics): void {
  saveToStorage(STORAGE_KEY, analytics);
}

export function getAnalytics(userId: string): EAAnalytics {
  if (!analyticsState || analyticsState.userId !== userId) {
    analyticsState = loadAnalytics() || initializeAnalytics(userId);
  }
  return analyticsState;
}

export function recordQuestionAttempt(attempt: QuestionAttempt): EAAnalytics {
  if (!analyticsState) analyticsState = initializeAnalytics('default');
  const analytics = { ...analyticsState };
  const part = attempt.part;

  // Core: update overall stats
  updateOverallStats(analytics, attempt.isCorrect, attempt.timeSpent);

  // Core: update part mastery
  if (analytics.partMastery[part]) {
    const updated = updateSectionMastery(
      analytics.partMastery[part],
      attempt.isCorrect,
      attempt.timeSpent,
      attempt.attemptedAt,
      attempt.domain,
      EA_MASTERY_THRESHOLDS,
      70,
      80
    );
    analytics.partMastery[part] = toPartMastery(part, updated);
  }

  // EA-specific: Circular 230 knowledge
  if (part === 'SEE3' && attempt.domain === 'SEE3-2') {
    const delta = attempt.isCorrect ? 2 : -1;
    analytics.circular230Knowledge = Math.min(100, Math.max(0,
      analytics.circular230Knowledge + delta
    ));
  }

  // EA-specific: IRS form proficiency
  if (attempt.irsFormRef) {
    const delta = attempt.isCorrect ? 1 : -0.5;
    analytics.irsFormProficiency = Math.min(100, Math.max(0,
      analytics.irsFormProficiency + delta
    ));
  }

  analytics.lastUpdated = new Date();
  const updatedAnalytics = updatePredictions(analytics);
  analyticsState = updatedAnalytics;
  saveAnalytics(updatedAnalytics);
  return updatedAnalytics;
}

export function recordStudySession(session: StudySession): EAAnalytics {
  if (!analyticsState) analyticsState = initializeAnalytics('default');
  const analytics = { ...analyticsState };
  Object.assign(analytics, processStudySession(analytics, session.date, session.duration));
  analyticsState = analytics;
  saveAnalytics(analytics);
  return analytics;
}

export function recordMockExam(part: EASectionId, rawScore: number): EAAnalytics {
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

function updatePredictions(analytics: EAAnalytics): EAAnalytics {
  const parts: EASectionId[] = ['SEE1', 'SEE2', 'SEE3'];

  parts.forEach(part => {
    const pm = analytics.partMastery[part];
    analytics.estimatedScaledScore[part] = rawToScaledScore(pm.accuracy);
    analytics.estimatedPassProbability[part] = scaledScoreToPassProbability(
      analytics.estimatedScaledScore[part]
    );
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
    .sort((a, b) => getAreaWeight(EA_SECTION_CONFIGS, b) - getAreaWeight(EA_SECTION_CONFIGS, a))
    .slice(0, 5);

  return analytics;
}

export function getInsights(): {
  overview: { accuracy: number; questionsCompleted: number; studyHours: number; streak: number };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  partBreakdown: { part: EASectionId; accuracy: number; readiness: string; passProbability: number }[];
} {
  if (!analyticsState) {
    return {
      overview: { accuracy: 0, questionsCompleted: 0, studyHours: 0, streak: 0 },
      strengths: [],
      weaknesses: [],
      recommendations: ['Start practicing to see insights'],
      partBreakdown: [],
    };
  }

  const parts: EASectionId[] = ['SEE1', 'SEE2', 'SEE3'];
  const partBreakdown = parts.map(part => ({
    part,
    accuracy: analyticsState!.partMastery[part].accuracy,
    readiness: analyticsState!.examReadiness[part],
    passProbability: analyticsState!.estimatedPassProbability[part],
  }));

  const allStrong = parts.flatMap(p => analyticsState!.partMastery[p].strongDomains);
  const allWeak = parts.flatMap(p => analyticsState!.partMastery[p].weakDomains);

  const recommendations: string[] = [];
  if (analyticsState.circular230Knowledge < 70) {
    recommendations.push('Focus on Circular 230 - essential for SEE3');
  }
  parts.forEach(part => {
    if (analyticsState!.examReadiness[part] === 'not-ready') {
      recommendations.push(`Increase practice volume for ${part} (${EA_PART_CONFIG[part].name})`);
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

export function resetAnalytics(userId: string): EAAnalytics {
  analyticsState = initializeAnalytics(userId);
  saveAnalytics(analyticsState);
  return analyticsState;
}
