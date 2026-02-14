/**
 * CPA Analytics Service
 *
 * Comprehensive analytics tracking for CPA exam preparation.
 * Delegates common logic to analyticsCore.ts.
 *
 * AICPA CPA Exam Structure (2025-2026):
 * - Core Sections (mandatory): FAR, AUD, REG
 * - Discipline Sections (choose 1): BAR, ISC, TCP
 *
 * Scoring: 0-99 scale, 75 passing
 *
 * CPA-Unique Features:
 * - Task-Based Simulation (TBS) tracking alongside MCQ
 * - Blueprint area performance per section
 * - Discipline section selection
 */

import {
  type MasteryLevel,
  type TrendDirection,
  type ReadinessLevel,
  type PerformanceTrend,
  type SectionMastery,
  type SectionConfig,
  type MasteryThresholds,
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

export type CPASectionId = 'FAR' | 'AUD' | 'REG' | 'BAR' | 'ISC' | 'TCP';
export const CPA_CORE_SECTIONS: CPASectionId[] = ['FAR', 'AUD', 'REG'];
export const CPA_DISCIPLINE_SECTIONS: CPASectionId[] = ['BAR', 'ISC', 'TCP'];
export const ALL_CPA_SECTIONS: CPASectionId[] = [...CPA_CORE_SECTIONS, ...CPA_DISCIPLINE_SECTIONS];

export interface QuestionAttempt {
  questionId: string;
  section: CPASectionId;
  blueprintArea?: string;
  topic?: string;
  isCorrect: boolean;
  timeSpent: number;
  attemptedAt: Date;
  isTBS?: boolean;
}

export interface StudySession {
  sessionId: string;
  date: Date;
  duration: number;
  type: 'practice' | 'flashcards' | 'lessons' | 'simulation' | 'review' | 'tbs';
  section?: CPASectionId;
  questionsAttempted?: number;
}

export interface SectionAnalyticsMastery extends SectionMastery {
  section: CPASectionId;
  sectionFullName: string;
  weakBlueprints: string[];
  strongBlueprints: string[];
  blueprintAccuracy: Record<string, number>;
  tbsAttempted: number;
  tbsCorrect: number;
  tbsAccuracy: number;
}

export interface CPAAnalytics {
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
  sectionMastery: Record<CPASectionId, SectionAnalyticsMastery>;
  mockExamsTaken: number;
  mockExamScores: { section: CPASectionId; score: number; date: Date }[];
  sectionPerformance: Record<CPASectionId, { average: number; best: number; attempts: number }>;
  estimatedPassProbability: Record<CPASectionId, number>;
  examReadiness: Record<CPASectionId, ReadinessLevel>;
  chosenDiscipline: CPASectionId | null;
  recommendedFocusAreas: string[];
  weeklyTrends: PerformanceTrend[];
  dailyTrends: PerformanceTrend[];
  // CPA-specific metrics
  totalTBSAttempted: number;
  totalTBSCorrect: number;
  overallTBSAccuracy: number;
  blueprintCoverage: number; // % of blueprint areas touched
}

// ============================================================================
// Section Configuration (AICPA Blueprints 2025-2026)
// ============================================================================

export const CPA_SECTION_CONFIG: Record<CPASectionId, {
  name: string;
  blueprintAreas: { id: string; name: string; weight: number }[];
}> = {
  FAR: {
    name: 'Financial Accounting and Reporting',
    blueprintAreas: [
      { id: 'FAR-I', name: 'Conceptual Framework, Standard-Setting, and Financial Reporting', weight: 12.5 },
      { id: 'FAR-II', name: 'Select Financial Statement Accounts', weight: 35 },
      { id: 'FAR-III', name: 'Select Transactions', weight: 30 },
      { id: 'FAR-IV', name: 'State and Local Governments', weight: 15 },
      { id: 'FAR-V', name: 'Not-for-Profit Entities', weight: 10 },
    ],
  },
  AUD: {
    name: 'Auditing and Attestation',
    blueprintAreas: [
      { id: 'AUD-I', name: 'Ethics, Independence, and Professional Conduct', weight: 20 },
      { id: 'AUD-II', name: 'Assessing Risk and Developing a Planned Response', weight: 30 },
      { id: 'AUD-III', name: 'Performing Further Procedures and Obtaining Evidence', weight: 35 },
      { id: 'AUD-IV', name: 'Forming Conclusions and Reporting', weight: 20 },
    ],
  },
  REG: {
    name: 'Taxation and Regulation',
    blueprintAreas: [
      { id: 'REG-I', name: 'Ethics, Professional Responsibilities, and Federal Tax Procedures', weight: 15 },
      { id: 'REG-II', name: 'Business Law', weight: 15 },
      { id: 'REG-III', name: 'Federal Taxation of Property Transactions', weight: 20 },
      { id: 'REG-IV', name: 'Federal Taxation of Individuals', weight: 27 },
      { id: 'REG-V', name: 'Federal Taxation of Entities', weight: 17 },
    ],
  },
  BAR: {
    name: 'Business Analysis and Reporting',
    blueprintAreas: [
      { id: 'BAR-I', name: 'Business Analysis', weight: 45 },
      { id: 'BAR-II', name: 'Technical Accounting and Reporting', weight: 40 },
      { id: 'BAR-III', name: 'State and Local Government Concepts', weight: 15 },
    ],
  },
  ISC: {
    name: 'Information Systems and Controls',
    blueprintAreas: [
      { id: 'ISC-I', name: 'Information Systems and Data Management', weight: 40 },
      { id: 'ISC-II', name: 'Security, Confidentiality, and Privacy', weight: 40 },
      { id: 'ISC-III', name: 'Considerations for System and Organization Controls', weight: 20 },
    ],
  },
  TCP: {
    name: 'Tax Compliance and Planning',
    blueprintAreas: [
      { id: 'TCP-I', name: 'Tax Compliance and Planning for Individuals and Personal Financial Planning', weight: 35 },
      { id: 'TCP-II', name: 'Entity Tax Compliance', weight: 30 },
      { id: 'TCP-III', name: 'Property Transactions', weight: 25 },
      { id: 'TCP-IV', name: 'Entity/Individual Tax Planning', weight: 15 },
    ],
  },
};

const CPA_SECTION_CONFIGS: SectionConfig[] = Object.entries(CPA_SECTION_CONFIG).map(([id, cfg]) => ({
  id,
  name: cfg.name,
  weight: CPA_CORE_SECTIONS.includes(id as CPASectionId) ? 25 : 25, // Each section is tested independently
  areas: cfg.blueprintAreas,
}));

const CPA_MASTERY_THRESHOLDS: MasteryThresholds = {
  ...DEFAULT_MASTERY_THRESHOLDS,
  proficientAccuracy: 75, // CPA passing score
};

// ============================================================================
// Score Helpers
// ============================================================================

/**
 * CPA uses a 0-99 scale. Raw accuracy maps directly.
 * The exam is pass/fail at 75.
 */
export function rawToPassProbability(accuracy: number, questionsAttempted: number): number {
  if (questionsAttempted < 20) return Math.max(0, accuracy * 0.3);
  if (accuracy < 50) return Math.max(0, (accuracy / 50) * 15);
  if (accuracy < 65) return 15 + ((accuracy - 50) / 15) * 20;
  if (accuracy < 75) return 35 + ((accuracy - 65) / 10) * 25;
  if (accuracy < 85) return 60 + ((accuracy - 75) / 10) * 25;
  return Math.min(99, 85 + ((accuracy - 85) / 15) * 14);
}

// ============================================================================
// Storage
// ============================================================================

const STORAGE_KEY = 'cpa-analytics';

export { coreSerialize as serializeAnalytics, coreDeserialize as deserializeAnalytics };

// ============================================================================
// Core Functions
// ============================================================================

let analyticsState: CPAAnalytics | null = loadFromStorage<CPAAnalytics>(STORAGE_KEY);

function toSectionMastery(sectionId: CPASectionId, sm: SectionMastery, existing?: SectionAnalyticsMastery): SectionAnalyticsMastery {
  return {
    ...sm,
    section: sectionId,
    sectionFullName: sm.sectionName,
    weakBlueprints: sm.weakAreas,
    strongBlueprints: sm.strongAreas,
    blueprintAccuracy: sm.areaAccuracy,
    tbsAttempted: existing?.tbsAttempted ?? 0,
    tbsCorrect: existing?.tbsCorrect ?? 0,
    tbsAccuracy: existing?.tbsAccuracy ?? 0,
  };
}

export function initializeAnalytics(userId: string): CPAAnalytics {
  const sectionMastery = {} as Record<CPASectionId, SectionAnalyticsMastery>;
  const estimatedPassProbability = {} as Record<CPASectionId, number>;
  const examReadiness = {} as Record<CPASectionId, ReadinessLevel>;
  const sectionPerformance = {} as Record<CPASectionId, { average: number; best: number; attempts: number }>;

  ALL_CPA_SECTIONS.forEach(section => {
    const config = CPA_SECTION_CONFIG[section];
    const baseMastery: SectionMastery = {
      sectionId: section,
      sectionName: config.name,
      weight: CPA_CORE_SECTIONS.includes(section) ? 25 : 25,
      questionsAttempted: 0,
      questionsCorrect: 0,
      accuracy: 0,
      masteryLevel: 'novice',
      trend: 'stable',
      averageTimePerQuestion: 0,
      lastPracticed: null,
      weakAreas: config.blueprintAreas.map(a => a.id),
      strongAreas: [],
      areaAccuracy: {},
    };
    sectionMastery[section] = toSectionMastery(section, baseMastery);
    estimatedPassProbability[section] = 0;
    examReadiness[section] = 'not-ready';
    sectionPerformance[section] = { average: 0, best: 0, attempts: 0 };
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
    sectionMastery,
    mockExamsTaken: 0,
    mockExamScores: [],
    sectionPerformance,
    estimatedPassProbability,
    examReadiness,
    chosenDiscipline: null,
    recommendedFocusAreas: ['FAR-II', 'FAR-III', 'AUD-III'],
    weeklyTrends: [],
    dailyTrends: [],
    totalTBSAttempted: 0,
    totalTBSCorrect: 0,
    overallTBSAccuracy: 0,
    blueprintCoverage: 0,
  };
}

export function loadAnalytics(): CPAAnalytics | null {
  return loadFromStorage<CPAAnalytics>(STORAGE_KEY);
}

export function saveAnalytics(analytics: CPAAnalytics): void {
  saveToStorage(STORAGE_KEY, analytics);
}

export function getAnalytics(userId: string): CPAAnalytics {
  if (!analyticsState || analyticsState.userId !== userId) {
    analyticsState = loadAnalytics() || initializeAnalytics(userId);
  }
  return analyticsState;
}

export function recordQuestionAttempt(attempt: QuestionAttempt): CPAAnalytics {
  if (!analyticsState) analyticsState = initializeAnalytics('default');
  const analytics = { ...analyticsState };
  const section = attempt.section;

  if (attempt.isTBS) {
    // Track TBS separately
    analytics.totalTBSAttempted++;
    if (attempt.isCorrect) analytics.totalTBSCorrect++;
    analytics.overallTBSAccuracy = analytics.totalTBSAttempted > 0
      ? Math.round((analytics.totalTBSCorrect / analytics.totalTBSAttempted) * 100)
      : 0;

    // Update section TBS stats
    if (analytics.sectionMastery[section]) {
      analytics.sectionMastery[section].tbsAttempted++;
      if (attempt.isCorrect) analytics.sectionMastery[section].tbsCorrect++;
      analytics.sectionMastery[section].tbsAccuracy =
        analytics.sectionMastery[section].tbsAttempted > 0
          ? Math.round((analytics.sectionMastery[section].tbsCorrect / analytics.sectionMastery[section].tbsAttempted) * 100)
          : 0;
    }
  }

  // Core: update overall stats (MCQ + TBS both count toward overall stats)
  updateOverallStats(analytics, attempt.isCorrect, attempt.timeSpent);

  // Core: update section mastery
  if (analytics.sectionMastery[section]) {
    const updated = updateSectionMastery(
      analytics.sectionMastery[section],
      attempt.isCorrect,
      attempt.timeSpent,
      attempt.attemptedAt,
      attempt.blueprintArea,
      CPA_MASTERY_THRESHOLDS,
      70,
      80
    );
    analytics.sectionMastery[section] = toSectionMastery(section, updated, analytics.sectionMastery[section]);
  }

  // Update blueprint coverage
  analytics.blueprintCoverage = calculateBlueprintCoverage(analytics);

  analytics.lastUpdated = new Date();
  const updatedAnalytics = updatePredictions(analytics);
  analyticsState = updatedAnalytics;
  saveAnalytics(updatedAnalytics);
  return updatedAnalytics;
}

export function recordStudySession(session: StudySession): CPAAnalytics {
  if (!analyticsState) analyticsState = initializeAnalytics('default');
  const analytics = { ...analyticsState };
  Object.assign(analytics, processStudySession(analytics, session.date, session.duration));
  analyticsState = analytics;
  saveAnalytics(analytics);
  return analytics;
}

export function recordMockExam(section: CPASectionId, rawScore: number): CPAAnalytics {
  if (!analyticsState) analyticsState = initializeAnalytics('default');
  const analytics = { ...analyticsState };
  const now = new Date();

  analytics.mockExamsTaken++;
  analytics.mockExamScores.push({ section, score: rawScore, date: now });

  const sectionPerf = analytics.sectionPerformance[section];
  sectionPerf.attempts++;
  sectionPerf.average = Math.round(
    (sectionPerf.average * (sectionPerf.attempts - 1) + rawScore) / sectionPerf.attempts
  );
  if (rawScore > sectionPerf.best) sectionPerf.best = rawScore;

  analytics.lastUpdated = now;
  const updatedAnalytics = updatePredictions(analytics);
  analyticsState = updatedAnalytics;
  saveAnalytics(updatedAnalytics);
  return updatedAnalytics;
}

// ============================================================================
// Discipline Selection
// ============================================================================

export function setChosenDiscipline(discipline: CPASectionId): CPAAnalytics {
  if (!CPA_DISCIPLINE_SECTIONS.includes(discipline)) {
    throw new Error('Invalid discipline section. Choose BAR, ISC, or TCP.');
  }
  if (!analyticsState) analyticsState = initializeAnalytics('default');
  const analytics = { ...analyticsState, chosenDiscipline: discipline };
  analyticsState = analytics;
  saveAnalytics(analytics);
  return analytics;
}

// ============================================================================
// Predictions
// ============================================================================

function updatePredictions(analytics: CPAAnalytics): CPAAnalytics {
  ALL_CPA_SECTIONS.forEach(section => {
    const sm = analytics.sectionMastery[section];
    // CPA uses direct percentage — combine MCQ (50%) + TBS (50%) for real exam,
    // but if no TBS data, use MCQ accuracy as proxy
    const tbsWeight = sm.tbsAttempted > 5 ? 0.5 : 0;
    const mcqWeight = 1 - tbsWeight;
    const compositeAccuracy = (sm.accuracy * mcqWeight) + (sm.tbsAccuracy * tbsWeight);

    analytics.estimatedPassProbability[section] = rawToPassProbability(
      compositeAccuracy,
      sm.questionsAttempted + sm.tbsAttempted
    );

    const prob = analytics.estimatedPassProbability[section];
    const totalAttempts = sm.questionsAttempted + sm.tbsAttempted;
    if (prob < 40 || totalAttempts < 150) analytics.examReadiness[section] = 'not-ready';
    else if (prob < 70 || totalAttempts < 400) analytics.examReadiness[section] = 'getting-close';
    else if (prob < 85) analytics.examReadiness[section] = 'ready';
    else analytics.examReadiness[section] = 'well-prepared';
  });

  // Focus areas: collect weak blueprints from all sections, prioritize by weight
  const allWeakBlueprints: string[] = [];
  ALL_CPA_SECTIONS.forEach(section => allWeakBlueprints.push(...analytics.sectionMastery[section].weakBlueprints));
  analytics.recommendedFocusAreas = allWeakBlueprints
    .sort((a, b) => getAreaWeight(CPA_SECTION_CONFIGS, b) - getAreaWeight(CPA_SECTION_CONFIGS, a))
    .slice(0, 5);

  return analytics;
}

// ============================================================================
// CPA-Specific Helpers
// ============================================================================

function calculateBlueprintCoverage(analytics: CPAAnalytics): number {
  let totalBlueprints = 0;
  let touchedBlueprints = 0;

  ALL_CPA_SECTIONS.forEach(section => {
    const config = CPA_SECTION_CONFIG[section];
    config.blueprintAreas.forEach(area => {
      totalBlueprints++;
      if ((analytics.sectionMastery[section].blueprintAccuracy[area.id] ?? -1) >= 0) {
        touchedBlueprints++;
      }
    });
  });

  return totalBlueprints > 0 ? Math.round((touchedBlueprints / totalBlueprints) * 100) : 0;
}

/**
 * Get section-specific insights
 */
export function getSectionInsights(analytics: CPAAnalytics, section: CPASectionId): {
  accuracy: number;
  tbsAccuracy: number;
  readiness: ReadinessLevel;
  passProbability: number;
  weakBlueprints: string[];
  strongBlueprints: string[];
  recommendations: string[];
} {
  const sm = analytics.sectionMastery[section];
  const recommendations: string[] = [];

  if (sm.accuracy < 75 && sm.questionsAttempted > 30) {
    recommendations.push(`Review core concepts — ${section} accuracy (${sm.accuracy}%) is below the 75 passing threshold`);
  }
  if (sm.tbsAttempted < 20) {
    recommendations.push(`Practice more TBS — they count for 50% of your ${section} score`);
  }
  if (sm.tbsAccuracy < 60 && sm.tbsAttempted > 10) {
    recommendations.push(`Focus on TBS technique — your ${section} TBS accuracy (${sm.tbsAccuracy}%) needs improvement`);
  }
  if (sm.questionsAttempted < 200) {
    recommendations.push(`Increase MCQ volume for ${section} — target 600+ questions for full coverage`);
  }
  if (sm.weakBlueprints.length > 0) {
    const topWeak = sm.weakBlueprints[0];
    const areaName = CPA_SECTION_CONFIG[section].blueprintAreas.find(a => a.id === topWeak)?.name || topWeak;
    recommendations.push(`Priority area: ${areaName}`);
  }

  return {
    accuracy: sm.accuracy,
    tbsAccuracy: sm.tbsAccuracy,
    readiness: analytics.examReadiness[section],
    passProbability: analytics.estimatedPassProbability[section],
    weakBlueprints: sm.weakBlueprints,
    strongBlueprints: sm.strongBlueprints,
    recommendations: recommendations.slice(0, 4),
  };
}

/**
 * Get overall study plan progress
 */
export function getStudyPlanProgress(analytics: CPAAnalytics): {
  overallReadiness: ReadinessLevel;
  overallPassProbability: number;
  sectionBreakdown: { section: CPASectionId; name: string; accuracy: number; tbsAccuracy: number; readiness: ReadinessLevel; passProbability: number }[];
  chosenDiscipline: CPASectionId | null;
  blueprintCoverage: number;
  recommendations: string[];
} {
  // Focus on core sections + chosen discipline
  const activeSections = analytics.chosenDiscipline
    ? [...CPA_CORE_SECTIONS, analytics.chosenDiscipline]
    : CPA_CORE_SECTIONS;

  const sectionBreakdown = ALL_CPA_SECTIONS.map(section => ({
    section,
    name: CPA_SECTION_CONFIG[section].name,
    accuracy: analytics.sectionMastery[section].accuracy,
    tbsAccuracy: analytics.sectionMastery[section].tbsAccuracy,
    readiness: analytics.examReadiness[section],
    passProbability: analytics.estimatedPassProbability[section],
  }));

  // Overall readiness = worst of active sections (you must pass all)
  let worstReadiness: ReadinessLevel = 'well-prepared';
  const readinessOrder: ReadinessLevel[] = ['not-ready', 'getting-close', 'ready', 'well-prepared'];
  let totalPassProb = 0;
  activeSections.forEach(section => {
    const sectionReadiness = analytics.examReadiness[section];
    if (readinessOrder.indexOf(sectionReadiness) < readinessOrder.indexOf(worstReadiness)) {
      worstReadiness = sectionReadiness;
    }
    totalPassProb += analytics.estimatedPassProbability[section];
  });

  const recommendations: string[] = [];
  if (!analytics.chosenDiscipline) {
    recommendations.push('Select your discipline section (BAR, ISC, or TCP) to focus your study plan');
  }
  const weakestCore = CPA_CORE_SECTIONS
    .map(s => ({ s, acc: analytics.sectionMastery[s].accuracy }))
    .sort((a, b) => a.acc - b.acc)[0];
  if (weakestCore.acc < 75) {
    recommendations.push(`Prioritize ${weakestCore.s} — your weakest core section at ${weakestCore.acc}% accuracy`);
  }
  if (analytics.overallTBSAccuracy < 60 && analytics.totalTBSAttempted > 10) {
    recommendations.push('Improve your overall TBS accuracy — simulations count for 50% on exam day');
  }

  return {
    overallReadiness: worstReadiness,
    overallPassProbability: Math.round(totalPassProb / activeSections.length),
    sectionBreakdown,
    chosenDiscipline: analytics.chosenDiscipline,
    blueprintCoverage: analytics.blueprintCoverage,
    recommendations: recommendations.slice(0, 5),
  };
}

// ============================================================================
// Trends
// ============================================================================

export function addDailyTrend(analytics: CPAAnalytics, trend: PerformanceTrend): CPAAnalytics {
  const updated = { ...analytics };
  updated.dailyTrends = [...updated.dailyTrends, trend].slice(-90);
  return updated;
}

export function addWeeklyTrend(analytics: CPAAnalytics, trend: PerformanceTrend): CPAAnalytics {
  const updated = { ...analytics };
  updated.weeklyTrends = [...updated.weeklyTrends, trend].slice(-52);
  return updated;
}

// ============================================================================
// Insights
// ============================================================================

export function getInsights(): {
  overview: { accuracy: number; questionsCompleted: number; studyHours: number; streak: number };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  sectionBreakdown: { section: CPASectionId; accuracy: number; tbsAccuracy: number; readiness: string; passProbability: number }[];
} {
  if (!analyticsState) {
    return {
      overview: { accuracy: 0, questionsCompleted: 0, studyHours: 0, streak: 0 },
      strengths: [],
      weaknesses: [],
      recommendations: ['Start practicing to see insights'],
      sectionBreakdown: [],
    };
  }

  const sectionBreakdown = ALL_CPA_SECTIONS.map(section => ({
    section,
    accuracy: analyticsState!.sectionMastery[section].accuracy,
    tbsAccuracy: analyticsState!.sectionMastery[section].tbsAccuracy,
    readiness: analyticsState!.examReadiness[section],
    passProbability: analyticsState!.estimatedPassProbability[section],
  }));

  const allStrong = ALL_CPA_SECTIONS.flatMap(s => analyticsState!.sectionMastery[s].strongBlueprints);
  const allWeak = ALL_CPA_SECTIONS.flatMap(s => analyticsState!.sectionMastery[s].weakBlueprints);

  const recommendations: string[] = [];
  if (analyticsState.overallTBSAccuracy < 60 && analyticsState.totalTBSAttempted > 10) {
    recommendations.push('Focus on Task-Based Simulations — they count for 50% of your exam score');
  }
  ALL_CPA_SECTIONS.forEach(section => {
    if (analyticsState!.examReadiness[section] === 'not-ready' && analyticsState!.sectionMastery[section].questionsAttempted > 0) {
      recommendations.push(`Increase practice for ${section} (${CPA_SECTION_CONFIG[section].name})`);
    }
  });
  if (!analyticsState.chosenDiscipline) {
    recommendations.push('Choose your discipline section to create a focused study plan');
  }
  if (analyticsState.currentStreak < 7) {
    recommendations.push('Build a daily study habit — consistency is key for CPA success');
  }

  return {
    overview: buildOverview(analyticsState),
    strengths: allStrong.slice(0, 5),
    weaknesses: allWeak.slice(0, 5),
    recommendations: recommendations.slice(0, 5),
    sectionBreakdown,
  };
}

export function resetAnalytics(userId: string): CPAAnalytics {
  analyticsState = initializeAnalytics(userId);
  saveAnalytics(analyticsState);
  return analyticsState;
}

export function getAnalyticsSummary(analytics: CPAAnalytics): {
  overview: { accuracy: number; questionsCompleted: number; studyHours: number; streak: number };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
} {
  const allStrong = ALL_CPA_SECTIONS.flatMap(s => analytics.sectionMastery[s].strongBlueprints);
  const allWeak = ALL_CPA_SECTIONS.flatMap(s => analytics.sectionMastery[s].weakBlueprints);

  const recommendations: string[] = [];
  if (analytics.totalTBSAttempted < 50) {
    recommendations.push('Practice more Task-Based Simulations — they count for 50% of your CPA score');
  }
  if (analytics.overallAccuracy < 75) {
    recommendations.push('Your MCQ accuracy needs improvement — review explanations on missed questions');
  }
  if (!analytics.chosenDiscipline) {
    recommendations.push('Select your discipline section (BAR, ISC, or TCP)');
  }
  if (analytics.blueprintCoverage < 80) {
    recommendations.push(`Blueprint coverage is ${analytics.blueprintCoverage}% — ensure you study all areas`);
  }

  return {
    overview: buildOverview(analytics),
    strengths: allStrong.slice(0, 5),
    weaknesses: allWeak.slice(0, 5),
    recommendations: recommendations.slice(0, 5),
  };
}
