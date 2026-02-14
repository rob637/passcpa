/**
 * Analytics Core — Shared utilities for exam analytics services
 *
 * Provides types, computation helpers, storage utilities, and display helpers
 * used by all per-exam analytics files (EA, CMA, CIA, CISA, CFP).
 *
 * Each exam wrapper defines its own config + types, then delegates common
 * computation to these utilities. This eliminates ~2,700 lines of duplication.
 */

// ============================================================================
// Shared Types
// ============================================================================

export type MasteryLevel = 'novice' | 'developing' | 'proficient' | 'expert';
export type TrendDirection = 'improving' | 'stable' | 'declining';
export type ReadinessLevel = 'not-ready' | 'getting-close' | 'ready' | 'well-prepared';

export interface PerformanceTrend {
  date: Date;
  accuracy: number;
  questionsCompleted: number;
  studyMinutes: number;
}

/**
 * Generic section mastery — covers both "part" (EA/CMA/CIA) and "domain" (CISA/CFP).
 * Each exam wrapper can alias or extend this.
 */
export interface SectionMastery {
  sectionId: string;
  sectionName: string;
  weight: number;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
  masteryLevel: MasteryLevel;
  trend: TrendDirection;
  averageTimePerQuestion: number;
  lastPracticed: Date | null;
  weakAreas: string[];
  strongAreas: string[];
  areaAccuracy: Record<string, number>;
}

export interface SectionConfig {
  id: string;
  name: string;
  weight: number;
  areas?: { id: string; name: string; weight: number }[];
  topics?: string[];
}

export interface MasteryThresholds {
  minAttempts: number;
  developingMinAttempts: number;
  expertAccuracy: number;
  proficientAccuracy: number;
  developingAccuracy: number;
}

export const DEFAULT_MASTERY_THRESHOLDS: MasteryThresholds = {
  minAttempts: 10,
  developingMinAttempts: 20,
  expertAccuracy: 85,
  proficientAccuracy: 75,
  developingAccuracy: 60,
};

export interface ExamAnalyticsConfig {
  examId: string;
  storageKey: string;
  sections: SectionConfig[];
  scoring: {
    rawToScaled: (rawPercentage: number) => number;
    scaledToPassProbability: (scaledScore: number) => number;
    initialScaledScore: number;
  };
  masteryThresholds?: MasteryThresholds;
  weaknessThreshold?: number; // default 65
  strengthThreshold?: number; // default 80
}

// ============================================================================
// Computation Helpers
// ============================================================================

/**
 * Calculate mastery level based on accuracy and question count.
 */
export function calculateMasteryLevel(
  accuracy: number,
  attempts: number,
  thresholds: MasteryThresholds = DEFAULT_MASTERY_THRESHOLDS
): MasteryLevel {
  if (attempts < thresholds.minAttempts) return 'novice';
  if (attempts < thresholds.developingMinAttempts) {
    return accuracy >= thresholds.developingAccuracy ? 'developing' : 'novice';
  }
  if (accuracy >= thresholds.expertAccuracy) return 'expert';
  if (accuracy >= thresholds.proficientAccuracy) return 'proficient';
  if (accuracy >= thresholds.developingAccuracy) return 'developing';
  return 'novice';
}

/**
 * Determine trend direction based on recent vs historical accuracy.
 * Default threshold: ±5%.
 */
export function calculateTrend(
  historicalAccuracy: number,
  recentAccuracy: number,
  threshold = 5
): TrendDirection {
  if (recentAccuracy > historicalAccuracy + threshold) return 'improving';
  if (recentAccuracy < historicalAccuracy - threshold) return 'declining';
  return 'stable';
}

/**
 * Update overall stats (accuracy + avg time) after a question attempt.
 * Mutates the object in place for efficiency; call on a shallow copy.
 */
export function updateOverallStats(
  stats: {
    totalQuestionsAttempted: number;
    totalQuestionsCorrect: number;
    overallAccuracy: number;
    averageTimePerQuestion: number;
  },
  isCorrect: boolean,
  timeSpent: number
): void {
  const prevTotal = stats.totalQuestionsAttempted;
  stats.totalQuestionsAttempted++;
  if (isCorrect) stats.totalQuestionsCorrect++;
  stats.overallAccuracy = Math.round(
    (stats.totalQuestionsCorrect / stats.totalQuestionsAttempted) * 100
  );
  const oldTimeTotal = prevTotal * stats.averageTimePerQuestion;
  stats.averageTimePerQuestion = Math.round(
    (oldTimeTotal + timeSpent) / stats.totalQuestionsAttempted
  );
}

/**
 * Update section/domain mastery stats after a question attempt.
 * Returns a new SectionMastery object (does not mutate).
 */
export function updateSectionMastery(
  section: SectionMastery,
  isCorrect: boolean,
  timeSpent: number,
  practiceDate: Date,
  area?: string,
  thresholds: MasteryThresholds = DEFAULT_MASTERY_THRESHOLDS,
  weakThreshold = 65,
  strongThreshold = 80
): SectionMastery {
  const updated = { ...section };
  updated.questionsAttempted++;
  if (isCorrect) updated.questionsCorrect++;
  updated.accuracy = Math.round(
    (updated.questionsCorrect / updated.questionsAttempted) * 100
  );
  updated.lastPracticed = practiceDate;

  // Running average time
  const oldTimeTotal = (section.questionsAttempted) * section.averageTimePerQuestion;
  updated.averageTimePerQuestion = Math.round(
    (oldTimeTotal + timeSpent) / updated.questionsAttempted
  );

  // Update mastery level
  updated.masteryLevel = calculateMasteryLevel(
    updated.accuracy,
    updated.questionsAttempted,
    thresholds
  );

  // Update area accuracy + weak/strong areas
  if (area) {
    updated.areaAccuracy = { ...section.areaAccuracy };
    const currentAreaAccuracy = updated.areaAccuracy[area] || 0;
    const areaCount = Object.keys(updated.areaAccuracy).length || 1;
    updated.areaAccuracy[area] = Math.round(
      (currentAreaAccuracy * (areaCount - 1) + (isCorrect ? 100 : 0)) / areaCount
    );

    updated.weakAreas = Object.entries(updated.areaAccuracy)
      .filter(([, acc]) => acc < weakThreshold)
      .map(([a]) => a);
    updated.strongAreas = Object.entries(updated.areaAccuracy)
      .filter(([, acc]) => acc >= strongThreshold)
      .map(([a]) => a);
  }

  return updated;
}

/**
 * Calculate study streak. Returns the new streak value and whether it's a new day.
 */
export function calculateStreak(
  currentStreak: number,
  lastStudyDate: Date | null,
  today?: Date
): { streak: number; isNewDay: boolean } {
  const now = today || new Date();
  now.setHours(0, 0, 0, 0);

  if (!lastStudyDate) {
    return { streak: 1, isNewDay: true };
  }

  const last = new Date(lastStudyDate);
  last.setHours(0, 0, 0, 0);
  const daysDiff = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) {
    return { streak: currentStreak, isNewDay: false };
  } else if (daysDiff === 1) {
    return { streak: currentStreak + 1, isNewDay: true };
  } else {
    return { streak: 1, isNewDay: true };
  }
}

/**
 * Append a trend data point, keeping max entries.
 */
export function appendTrend(
  trends: PerformanceTrend[],
  newTrend: PerformanceTrend,
  maxCount: number
): PerformanceTrend[] {
  return [...trends, newTrend].slice(-maxCount);
}

/**
 * Calculate weighted score from section masteries.
 */
export function calculateWeightedScore(
  sections: SectionMastery[]
): number {
  let weightedScore = 0;
  let totalWeight = 0;

  sections.forEach(section => {
    if (section.questionsAttempted > 0) {
      weightedScore += section.accuracy * section.weight;
      totalWeight += section.weight;
    }
  });

  return totalWeight > 0 ? weightedScore / totalWeight : 0;
}

/**
 * Identify focus areas — weak sections prioritized by (100 - accuracy) * weight.
 */
export function identifyFocusAreas(
  sections: SectionMastery[],
  weakThreshold = 65,
  minAttempts = 30,
  maxResults = 3
): string[] {
  return sections
    .filter(s => s.accuracy < weakThreshold || s.questionsAttempted < minAttempts)
    .sort((a, b) => {
      const aPriority = (100 - a.accuracy) * a.weight;
      const bPriority = (100 - b.accuracy) * b.weight;
      return bPriority - aPriority;
    })
    .slice(0, maxResults)
    .map(s => s.sectionId);
}

/**
 * Get domain/area weight from a list of section configs.
 */
export function getAreaWeight(
  sectionConfigs: SectionConfig[],
  areaId: string
): number {
  for (const section of sectionConfigs) {
    if (section.areas) {
      const area = section.areas.find(a => a.id === areaId);
      if (area) return area.weight;
    }
  }
  return 0;
}

// ============================================================================
// Section Mastery Initialization
// ============================================================================

/**
 * Create initial section mastery from config.
 */
export function createSectionMastery(
  config: SectionConfig
): SectionMastery {
  return {
    sectionId: config.id,
    sectionName: config.name,
    weight: config.weight,
    questionsAttempted: 0,
    questionsCorrect: 0,
    accuracy: 0,
    masteryLevel: 'novice',
    trend: 'stable',
    averageTimePerQuestion: 0,
    lastPracticed: null,
    weakAreas: config.areas?.map(a => a.id) || config.topics || [],
    strongAreas: [],
    areaAccuracy: {},
  };
}

/**
 * Initialize a record of section masteries from config.
 */
export function createAllSectionMasteries(
  sections: SectionConfig[]
): Record<string, SectionMastery> {
  const mastery: Record<string, SectionMastery> = {};
  sections.forEach(s => {
    mastery[s.id] = createSectionMastery(s);
  });
  return mastery;
}

// ============================================================================
// Study Session Helpers
// ============================================================================

/**
 * Apply study session updates to analytics.
 * Returns partial updates to merge into the analytics object.
 */
export function processStudySession(
  current: {
    totalStudyMinutes: number;
    currentStreak: number;
    longestStreak: number;
    studyDays: number;
    lastStudyDate: Date | null;
  },
  sessionDate: Date,
  durationMinutes: number
): {
  totalStudyMinutes: number;
  currentStreak: number;
  longestStreak: number;
  studyDays: number;
  lastStudyDate: Date;
  lastUpdated: Date;
} {
  const { streak, isNewDay } = calculateStreak(
    current.currentStreak,
    current.lastStudyDate,
    sessionDate
  );

  return {
    totalStudyMinutes: current.totalStudyMinutes + durationMinutes,
    currentStreak: streak,
    longestStreak: Math.max(current.longestStreak, streak),
    studyDays: isNewDay ? current.studyDays + 1 : current.studyDays,
    lastStudyDate: sessionDate,
    lastUpdated: new Date(),
  };
}

// ============================================================================
// Mock Exam Helpers
// ============================================================================

/**
 * Update basic mock exam stats (flat scores array).
 * Returns partial updates to merge into the analytics object.
 */
export function processMockExam(
  current: {
    mockExamsTaken: number;
    mockExamScores: number[];
  },
  rawScore: number
): {
  mockExamsTaken: number;
  mockExamScores: number[];
  averageMockScore: number;
  bestMockScore: number;
} {
  const newScores = [...current.mockExamScores, rawScore];
  return {
    mockExamsTaken: current.mockExamsTaken + 1,
    mockExamScores: newScores,
    averageMockScore: Math.round(
      newScores.reduce((a, b) => a + b, 0) / newScores.length
    ),
    bestMockScore: Math.max(...newScores),
  };
}

/**
 * Update section mastery from mock exam domain-level scores.
 */
export function updateSectionsFromMockExam(
  sectionMastery: Record<string, SectionMastery>,
  domainScores: Record<string, { correct: number; total: number }>,
  thresholds: MasteryThresholds = DEFAULT_MASTERY_THRESHOLDS
): Record<string, SectionMastery> {
  const updated = { ...sectionMastery };

  Object.entries(domainScores).forEach(([sectionId, stats]) => {
    if (updated[sectionId]) {
      const section = { ...updated[sectionId] };
      section.questionsAttempted += stats.total;
      section.questionsCorrect += stats.correct;
      section.accuracy = Math.round(
        (section.questionsCorrect / section.questionsAttempted) * 100
      );
      section.masteryLevel = calculateMasteryLevel(
        section.accuracy,
        section.questionsAttempted,
        thresholds
      );
      section.lastPracticed = new Date();
      updated[sectionId] = section;
    }
  });

  return updated;
}

// ============================================================================
// Prediction Helpers
// ============================================================================

/**
 * Determine readiness level from probability and/or scaled score.
 * Configurable thresholds.
 */
export function determineReadiness(
  probability: number,
  thresholds: { wellPrepared: number; ready: number; gettingClose: number } = {
    wellPrepared: 80,
    ready: 65,
    gettingClose: 45,
  }
): ReadinessLevel {
  if (probability >= thresholds.wellPrepared) return 'well-prepared';
  if (probability >= thresholds.ready) return 'ready';
  if (probability >= thresholds.gettingClose) return 'getting-close';
  return 'not-ready';
}

/**
 * Determine readiness from attempt count + probability thresholds.
 * Used by EA/CMA where readiness is per-section.
 */
export function determineReadinessFromStats(
  probability: number,
  questionsAttempted: number,
  minQuestionsNotReady = 100,
  minQuestionsGettingClose = 300
): ReadinessLevel {
  if (probability < 40 || questionsAttempted < minQuestionsNotReady) {
    return 'not-ready';
  } else if (probability < 70 || questionsAttempted < minQuestionsGettingClose) {
    return 'getting-close';
  } else if (probability < 85) {
    return 'ready';
  }
  return 'well-prepared';
}

/**
 * Apply confidence adjustment based on question volume.
 */
export function applyConfidenceAdjustment(
  rawProbability: number,
  totalAttempts: number,
  lowThreshold = 100,
  mediumThreshold = 300,
  lowFactor = 0.5,
  mediumFactor = 0.75
): number {
  if (totalAttempts < lowThreshold) {
    return rawProbability * lowFactor;
  } else if (totalAttempts < mediumThreshold) {
    return rawProbability * mediumFactor;
  }
  return rawProbability;
}

// ============================================================================
// Analytics Summary Helpers
// ============================================================================

/**
 * Build a standard overview object from analytics fields.
 */
export function buildOverview(analytics: {
  overallAccuracy: number;
  totalQuestionsAttempted: number;
  totalStudyMinutes: number;
  currentStreak: number;
}): {
  accuracy: number;
  questionsCompleted: number;
  studyHours: number;
  streak: number;
} {
  return {
    accuracy: analytics.overallAccuracy,
    questionsCompleted: analytics.totalQuestionsAttempted,
    studyHours: Math.round(analytics.totalStudyMinutes / 60),
    streak: analytics.currentStreak,
  };
}

/**
 * Separate sections into strengths and weaknesses.
 */
export function categorizeSections(
  sections: SectionMastery[],
  strengthAccuracy = 80,
  weaknessAccuracy = 65,
  minAttemptsForStrength = 20,
  minAttemptsForWeakness = 20
): { strengths: string[]; weaknesses: string[] } {
  const strengths = sections
    .filter(s => s.accuracy >= strengthAccuracy && s.questionsAttempted >= minAttemptsForStrength)
    .map(s => s.sectionName);
  const weaknesses = sections
    .filter(s => s.accuracy < weaknessAccuracy || s.questionsAttempted < minAttemptsForWeakness)
    .map(s => s.sectionName);
  return { strengths, weaknesses };
}

/**
 * Generate standard recommendations based on analytics state.
 */
export function generateBaseRecommendations(
  analytics: {
    totalQuestionsAttempted: number;
    mockExamsTaken: number;
    currentStreak: number;
  },
  minQuestions = 200,
  minMocks = 2,
  minStreak = 7,
  _examName = 'the exam'
): string[] {
  const recs: string[] = [];
  if (analytics.totalQuestionsAttempted < minQuestions) {
    recs.push('Complete more practice questions to build a stronger foundation.');
  }
  if (analytics.mockExamsTaken < minMocks) {
    recs.push(`Take at least ${minMocks} full mock exams before your exam date.`);
  }
  if (analytics.currentStreak < minStreak) {
    recs.push('Build a consistent daily study habit for best retention.');
  }
  return recs;
}

/**
 * Build a domain/section breakdown for display.
 */
export function buildSectionBreakdown(
  sections: SectionMastery[]
): Array<{
  sectionId: string;
  name: string;
  accuracy: number;
  level: string;
  trend: string;
  weight: number;
}> {
  return [...sections]
    .sort((a, b) => b.weight - a.weight)
    .map(s => ({
      sectionId: s.sectionId,
      name: s.sectionName,
      accuracy: s.accuracy,
      level: s.masteryLevel,
      trend: s.trend,
      weight: s.weight,
    }));
}

// ============================================================================
// Storage Utilities
// ============================================================================

/**
 * Load analytics from localStorage with date restoration.
 */
export function loadFromStorage<T>(
  key: string,
  dateFields: string[] = ['lastUpdated', 'lastStudyDate']
): T | null {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;

    const parsed = JSON.parse(stored);

    // Restore top-level date fields
    dateFields.forEach(field => {
      if (parsed[field]) parsed[field] = new Date(parsed[field]);
    });

    // Restore dates in section mastery objects
    const masteryKey = findMasteryKey(parsed);
    if (masteryKey && parsed[masteryKey]) {
      Object.values(parsed[masteryKey]).forEach((section: unknown) => {
        const s = section as Record<string, unknown>;
        if (s.lastPracticed) s.lastPracticed = new Date(s.lastPracticed as string);
      });
    }

    return parsed;
  } catch (e) {
    console.error(`Failed to load ${key} analytics:`, e);
    return null;
  }
}

/**
 * Save analytics to localStorage.
 */
export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to save ${key} analytics:`, e);
  }
}

/**
 * Serialize analytics with Date handling.
 */
export function serializeAnalytics<T>(data: T): string {
  return JSON.stringify(data, (_, value) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  });
}

/**
 * Deserialize analytics with Date restoration.
 */
export function deserializeAnalytics<T>(json: string): T {
  return JSON.parse(json, (_, value) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return value;
  });
}

// ============================================================================
// Display Helpers
// ============================================================================

/**
 * Format readiness level for display.
 */
export function formatReadiness(readiness: ReadinessLevel): string {
  switch (readiness) {
    case 'well-prepared': return 'Well Prepared';
    case 'ready': return 'Ready';
    case 'getting-close': return 'Getting Close';
    case 'not-ready': return 'Not Ready';
    default: return 'Unknown';
  }
}

// ============================================================================
// Internal Helpers
// ============================================================================

/**
 * Find the mastery record key — handles partMastery, domainMastery, sectionMastery.
 */
function findMasteryKey(obj: Record<string, unknown>): string | null {
  const candidates = ['partMastery', 'domainMastery', 'sectionMastery'];
  return candidates.find(k => obj[k] && typeof obj[k] === 'object') || null;
}
