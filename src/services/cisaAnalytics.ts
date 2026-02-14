/**
 * CISA Analytics Service
 *
 * Analytics tracking for CISA (Certified Information Systems Auditor) exam preparation.
 * Delegates common logic to analyticsCore.ts.
 *
 * ISACA CISA Exam: 150 questions, 4 hours
 * Scoring: 200-800 scale, 450 passing
 * Domains: 5 (D1=21%, D2=16%, D3=18%, D4=20%, D5=25%)
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
  serializeAnalytics as coreSerialize,
  deserializeAnalytics as coreDeserialize,
  formatReadiness,
  buildOverview,
  categorizeSections,
  generateBaseRecommendations,
  buildSectionBreakdown,
  appendTrend,
  calculateTrend,
} from './analyticsCore';

export type { MasteryLevel, TrendDirection, ReadinessLevel, PerformanceTrend };
export { coreSerialize as serializeAnalytics, coreDeserialize as deserializeAnalytics };

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
  cognitiveLevel?: 'knowledge' | 'application' | 'analysis';
  isacaStandard?: string;
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
  isacaStandardsMastery: Record<string, number>;
}

export interface CISAAnalytics {
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
  scaledScores: number[];
  averageMockScore: number;
  bestMockScore: number;
  averageScaledScore: number;
  bestScaledScore: number;
  estimatedPassProbability: number;
  estimatedScaledScore: number;
  examReadiness: ReadinessLevel;
  recommendedFocusAreas: string[];
  weeklyTrends: PerformanceTrend[];
  dailyTrends: PerformanceTrend[];
  isacaStandardsKnowledge: number;
  controlFrameworksFamiliarity: number;
  auditMethodologyProficiency: number;
  practiceSimulationsCompleted: number;
}

// ============================================================================
// Domain Configuration — ISACA CISA 2025
// ============================================================================

export const CISA_DOMAIN_CONFIG: Record<string, { name: string; weight: number; topics: string[] }> = {
  CISA1: {
    name: 'Information Systems Auditing Process',
    weight: 21,
    topics: ['IS Audit Standards and Guidelines', 'Risk-Based Audit Planning', 'Audit Execution', 'Audit Reporting and Follow-up', 'Quality Assurance'],
  },
  CISA2: {
    name: 'Governance and Management of IT',
    weight: 16,
    topics: ['IT Governance Structure', 'IT Strategy and Policies', 'IT Resource Management', 'IT Risk Management', 'Business Continuity'],
  },
  CISA3: {
    name: 'Information Systems Acquisition, Development, and Implementation',
    weight: 18,
    topics: ['Project Governance', 'SDLC and Methodologies', 'System Design and Implementation', 'Testing and QA', 'Post-Implementation Review'],
  },
  CISA4: {
    name: 'Information Systems Operations and Business Resilience',
    weight: 20,
    topics: ['IS Operations', 'Hardware and System Architecture', 'IT Asset Management', 'Disaster Recovery', 'Business Continuity Planning'],
  },
  CISA5: {
    name: 'Protection of Information Assets',
    weight: 25,
    topics: ['Information Security Frameworks', 'Access Controls', 'Network Security', 'Data Classification', 'Security Incident Management'],
  },
};

const CISA_MASTERY_THRESHOLDS: MasteryThresholds = {
  minAttempts: 10, developingMinAttempts: 20,
  expertAccuracy: 90, proficientAccuracy: 78, developingAccuracy: 65,
};

// ============================================================================
// Score Scaling
// ============================================================================

export function rawToScaledScore(rawPercentage: number): number {
  if (rawPercentage <= 0) return 200;
  if (rawPercentage >= 100) return 800;
  if (rawPercentage <= 60) return Math.round(200 + (rawPercentage / 60) * 250);
  return Math.round(450 + ((rawPercentage - 60) / 40) * 350);
}

export function scaledScoreToPassProbability(scaledScore: number): number {
  if (scaledScore < 350) return Math.max(0, (scaledScore - 200) / 1.5);
  if (scaledScore < 400) return 10 + (scaledScore - 350) * 0.4;
  if (scaledScore < 450) return 30 + (scaledScore - 400) * 0.8;
  if (scaledScore < 500) return 70 + (scaledScore - 450) * 0.5;
  if (scaledScore < 600) return 95 + (scaledScore - 500) * 0.04;
  return 99;
}

// ============================================================================
// Core Functions
// ============================================================================

function toDomainMastery(sm: SectionMastery, _config?: typeof CISA_DOMAIN_CONFIG[string]): DomainMastery {
  return {
    ...sm,
    domain: sm.sectionId,
    domainName: sm.sectionName,
    examWeight: sm.weight,
    weakTopics: sm.weakAreas,
    strongTopics: sm.strongAreas,
    isacaStandardsMastery: {},
  };
}

export function initializeAnalytics(userId: string): CISAAnalytics {
  const domainMastery: Record<string, DomainMastery> = {};
  Object.entries(CISA_DOMAIN_CONFIG).forEach(([domain, config]) => {
    const baseMastery: SectionMastery = {
      sectionId: domain, sectionName: config.name, weight: config.weight,
      questionsAttempted: 0, questionsCorrect: 0, accuracy: 0,
      masteryLevel: 'novice', trend: 'stable', averageTimePerQuestion: 0,
      lastPracticed: null, weakAreas: config.topics, strongAreas: [], areaAccuracy: {},
    };
    domainMastery[domain] = toDomainMastery(baseMastery, config);
  });

  return {
    userId, lastUpdated: new Date(),
    totalQuestionsAttempted: 0, totalQuestionsCorrect: 0, overallAccuracy: 0,
    averageTimePerQuestion: 0, totalStudyMinutes: 0,
    currentStreak: 0, longestStreak: 0, studyDays: 0, lastStudyDate: null,
    domainMastery, mockExamsTaken: 0, mockExamScores: [], scaledScores: [],
    averageMockScore: 0, bestMockScore: 0, averageScaledScore: 200, bestScaledScore: 200,
    estimatedPassProbability: 0, estimatedScaledScore: 200,
    examReadiness: 'not-ready',
    recommendedFocusAreas: Object.keys(CISA_DOMAIN_CONFIG),
    weeklyTrends: [], dailyTrends: [],
    isacaStandardsKnowledge: 0, controlFrameworksFamiliarity: 0,
    auditMethodologyProficiency: 0, practiceSimulationsCompleted: 0,
  };
}

export function recordQuestionAttempt(
  analytics: CISAAnalytics,
  attempt: QuestionAttempt
): CISAAnalytics {
  const newAnalytics = { ...analytics };
  const domain = attempt.domain;

  updateOverallStats(newAnalytics, attempt.isCorrect, attempt.timeSpent);

  if (newAnalytics.domainMastery[domain]) {
    const updated = updateSectionMastery(
      newAnalytics.domainMastery[domain], attempt.isCorrect, attempt.timeSpent,
      attempt.attemptedAt, undefined, CISA_MASTERY_THRESHOLDS
    );
    const dm = { ...updated, domain: updated.sectionId, domainName: updated.sectionName, examWeight: updated.weight, weakTopics: updated.weakAreas, strongTopics: updated.strongAreas } as DomainMastery;

    // Track ISACA standards if provided
    if (attempt.isacaStandard) {
      dm.isacaStandardsMastery = { ...newAnalytics.domainMastery[domain].isacaStandardsMastery };
      const currentMastery = dm.isacaStandardsMastery[attempt.isacaStandard] || 0;
      dm.isacaStandardsMastery[attempt.isacaStandard] =
        Math.round((currentMastery + (attempt.isCorrect ? 100 : 0)) / 2);
    } else {
      dm.isacaStandardsMastery = newAnalytics.domainMastery[domain].isacaStandardsMastery;
    }

    newAnalytics.domainMastery[domain] = dm;
  }

  // CISA-specific: audit methodology from analysis questions
  if (attempt.cognitiveLevel === 'analysis') {
    const delta = attempt.isCorrect ? 1 : -0.5;
    newAnalytics.auditMethodologyProficiency = Math.min(100, Math.max(0,
      newAnalytics.auditMethodologyProficiency + delta));
  }

  newAnalytics.lastUpdated = new Date();
  return updatePredictions(newAnalytics);
}

export function recordStudySession(
  analytics: CISAAnalytics,
  session: StudySession
): CISAAnalytics {
  const newAnalytics = { ...analytics };
  if (session.type === 'simulation') {
    newAnalytics.practiceSimulationsCompleted++;
  }
  Object.assign(newAnalytics, processStudySession(newAnalytics, session.date, session.duration));
  return newAnalytics;
}

export function recordMockExam(
  analytics: CISAAnalytics,
  score: number,
  domainScores: Record<string, { correct: number; total: number }>
): CISAAnalytics {
  const newAnalytics = { ...analytics };
  const scaledScore = rawToScaledScore(score);

  const mockUpdates = processMockExam(newAnalytics, score);
  Object.assign(newAnalytics, mockUpdates);

  // Scaled score tracking
  newAnalytics.scaledScores = [...analytics.scaledScores, scaledScore];
  newAnalytics.averageScaledScore = Math.round(
    newAnalytics.scaledScores.reduce((a, b) => a + b, 0) / newAnalytics.scaledScores.length
  );
  newAnalytics.bestScaledScore = Math.max(...newAnalytics.scaledScores);

  // Update domain mastery from mock
  newAnalytics.domainMastery = updateSectionsFromMockExam(
    newAnalytics.domainMastery, domainScores, CISA_MASTERY_THRESHOLDS
  ) as Record<string, DomainMastery>;

  newAnalytics.lastUpdated = new Date();
  return updatePredictions(newAnalytics);
}

function updatePredictions(analytics: CISAAnalytics): CISAAnalytics {
  const newAnalytics = { ...analytics };
  const sections = Object.values(analytics.domainMastery) as SectionMastery[];
  const effectiveScore = calculateWeightedScore(sections);

  newAnalytics.estimatedScaledScore = rawToScaledScore(effectiveScore);

  const questionsFactor = Math.min(1, analytics.totalQuestionsAttempted / 600);
  const mockExamFactor = Math.min(1, analytics.mockExamsTaken / 3);
  const accuracyFactor = effectiveScore / 100;
  const simulationsFactor = Math.min(1, analytics.practiceSimulationsCompleted / 5);
  const cisaSpecificFactor = (
    (analytics.isacaStandardsKnowledge / 100) * 0.3 +
    (analytics.controlFrameworksFamiliarity / 100) * 0.3 +
    (analytics.auditMethodologyProficiency / 100) * 0.4
  );

  let rawProbability = (
    accuracyFactor * 0.40 + (analytics.bestMockScore / 100) * 0.25 +
    questionsFactor * 0.10 + mockExamFactor * 0.10 +
    simulationsFactor * 0.05 + cisaSpecificFactor * 0.10
  );
  rawProbability = applyConfidenceAdjustment(rawProbability, analytics.totalQuestionsAttempted, 150, 400);
  newAnalytics.estimatedPassProbability = Math.min(95, Math.round(rawProbability * 100));

  if (newAnalytics.estimatedScaledScore >= 500) newAnalytics.examReadiness = 'well-prepared';
  else if (newAnalytics.estimatedScaledScore >= 450) newAnalytics.examReadiness = 'ready';
  else if (newAnalytics.estimatedScaledScore >= 400) newAnalytics.examReadiness = 'getting-close';
  else newAnalytics.examReadiness = 'not-ready';

  newAnalytics.recommendedFocusAreas = identifyFocusAreas(sections, 65, 30, 3);
  return newAnalytics;
}

// ============================================================================
// Trend & Specific Metric Updates
// ============================================================================

export function updateDomainTrend(analytics: CISAAnalytics, domain: string, recentAccuracy: number): CISAAnalytics {
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

export function updateIsacaStandardsKnowledge(analytics: CISAAnalytics, score: number): CISAAnalytics {
  return { ...analytics, isacaStandardsKnowledge: Math.min(100, Math.max(0, score)), lastUpdated: new Date() };
}

export function updateControlFrameworksFamiliarity(analytics: CISAAnalytics, score: number): CISAAnalytics {
  return { ...analytics, controlFrameworksFamiliarity: Math.min(100, Math.max(0, score)), lastUpdated: new Date() };
}

export function addDailyTrend(analytics: CISAAnalytics, trend: PerformanceTrend): CISAAnalytics {
  return { ...analytics, dailyTrends: appendTrend(analytics.dailyTrends, trend, 30) };
}

export function addWeeklyTrend(analytics: CISAAnalytics, trend: PerformanceTrend): CISAAnalytics {
  return { ...analytics, weeklyTrends: appendTrend(analytics.weeklyTrends, trend, 12) };
}

// ============================================================================
// Analytics Summary
// ============================================================================

export function getAnalyticsSummary(analytics: CISAAnalytics) {
  const sections = Object.values(analytics.domainMastery) as SectionMastery[];
  const { strengths, weaknesses } = categorizeSections(sections, 80, 65);

  const recommendations: string[] = [];

  // CISA-specific recommendations first (high priority)
  if (analytics.isacaStandardsKnowledge < 70) {
    recommendations.push('Review ISACA standards and guidelines - these are heavily tested.');
  }
  if (analytics.controlFrameworksFamiliarity < 60) {
    recommendations.push('Study control frameworks (COBIT, ITIL, ISO 27001) - key for IT governance.');
  }
  if (analytics.practiceSimulationsCompleted < 3) {
    recommendations.push('Complete more practice simulations to prepare for real-world scenarios.');
  }

  // Generic recommendations
  const baseRecs = generateBaseRecommendations(
    analytics, 300, 2, 7, 'CISA'
  );
  recommendations.push(...baseRecs);
  analytics.recommendedFocusAreas.forEach(domain => {
    const d = analytics.domainMastery[domain];
    if (d) recommendations.push(`Focus on ${d.domainName} (${d.examWeight}% of exam, currently ${d.accuracy}% accuracy).`);
  });

  return {
    overview: {
      ...buildOverview(analytics),
      scaledScore: analytics.estimatedScaledScore,
      passChance: `${analytics.estimatedPassProbability}%`,
      readiness: formatReadiness(analytics.examReadiness),
    },
    strengths, weaknesses,
    recommendations: recommendations.slice(0, 5),
    domainBreakdown: buildSectionBreakdown(sections).map(s => ({
      domain: s.sectionId, name: s.name, accuracy: s.accuracy,
      level: s.level, trend: s.trend, weight: s.weight,
    })),
    cisaSpecific: {
      isacaStandardsScore: analytics.isacaStandardsKnowledge,
      frameworksFamiliarity: analytics.controlFrameworksFamiliarity,
      auditProficiency: analytics.auditMethodologyProficiency,
      simulationsCompleted: analytics.practiceSimulationsCompleted,
    },
  };
}

export function getDomainInsights(analytics: CISAAnalytics, domain: string) {
  const dm = analytics.domainMastery[domain];
  if (!dm) return null;
  const targetAccuracy = 70;
  const gapToTarget = Math.max(0, targetAccuracy - dm.accuracy);
  const isOnTrack = dm.accuracy >= targetAccuracy && dm.questionsAttempted >= 25;

  const recommendations: string[] = [];
  if (dm.questionsAttempted < 25) recommendations.push(`Complete at least ${25 - dm.questionsAttempted} more questions in this domain.`);
  if (dm.accuracy < 60) recommendations.push('Review the fundamental concepts before attempting more questions.');
  else if (dm.accuracy < 70) recommendations.push('Focus on your weak topics to push your accuracy above passing threshold.');
  if (dm.averageTimePerQuestion > 120) recommendations.push('Work on time management - aim for under 90 seconds per question.');
  if (dm.trend === 'declining') recommendations.push('Your recent performance is declining. Consider reviewing basics before continuing.');

  return {
    domain: dm.domain, name: dm.domainName, accuracy: dm.accuracy,
    questionsAttempted: dm.questionsAttempted, avgTimePerQuestion: dm.averageTimePerQuestion,
    mastery: dm.masteryLevel, trend: dm.trend, examWeight: dm.examWeight,
    isOnTrack, gapToTarget, weakTopics: dm.weakTopics, strongTopics: dm.strongTopics,
    recommendations,
  };
}

export function getStudyPlanProgress(analytics: CISAAnalytics) {
  const domainProgress: Record<string, number> = {};
  let totalProgress = 0;
  let domainCount = 0;

  Object.entries(analytics.domainMastery).forEach(([domain, mastery]) => {
    const questionsProgress = Math.min(1, mastery.questionsAttempted / 50) * 50;
    const accuracyProgress = Math.min(1, mastery.accuracy / 80) * 50;
    const progress = Math.round(questionsProgress + accuracyProgress);
    domainProgress[domain] = progress;
    totalProgress += progress;
    domainCount++;
  });

  const overallProgress = Math.round(totalProgress / domainCount);
  const milestonesCompleted: string[] = [];
  if (analytics.totalQuestionsAttempted >= 100) milestonesCompleted.push('100 Questions Completed');
  if (analytics.totalQuestionsAttempted >= 500) milestonesCompleted.push('500 Questions Completed');
  if (analytics.mockExamsTaken >= 1) milestonesCompleted.push('First Mock Exam Taken');
  if (analytics.bestScaledScore >= 450) milestonesCompleted.push('Passed a Mock Exam');
  if (analytics.currentStreak >= 7) milestonesCompleted.push('7-Day Study Streak');
  if (analytics.practiceSimulationsCompleted >= 3) milestonesCompleted.push('Completed 3 Practice Simulations');
  if (Object.values(analytics.domainMastery).every(d => d.accuracy >= 70)) milestonesCompleted.push('All Domains Above 70%');

  let nextMilestone = '';
  if (analytics.totalQuestionsAttempted < 100) nextMilestone = `Complete ${100 - analytics.totalQuestionsAttempted} more questions`;
  else if (analytics.mockExamsTaken < 1) nextMilestone = 'Take your first mock exam';
  else if (analytics.bestScaledScore < 450) nextMilestone = 'Score 450+ on a mock exam';
  else if (analytics.practiceSimulationsCompleted < 3) nextMilestone = 'Complete 3 practice simulations';
  else if (!Object.values(analytics.domainMastery).every(d => d.accuracy >= 70)) {
    const weakDomain = Object.values(analytics.domainMastery)
      .filter(d => d.accuracy < 70)
      .sort((a, b) => b.examWeight - a.examWeight)[0];
    nextMilestone = `Get ${weakDomain.domainName} to 70%+ accuracy`;
  } else nextMilestone = 'Ready for exam day!';

  return { overallProgress, domainProgress, milestonesCompleted, nextMilestone };
}
