/**
 * Blueprint Analytics Utility
 * 
 * Provides detailed performance analytics by AICPA blueprint area:
 * - Heat map data for visual mastery display
 * - AICPA weight comparison (coverage vs exam weights)
 * - Smart study recommendations based on weak areas + exam weights
 * - Trend analysis over time
 */

import { ExamSection } from '../types';
import { EXAM_BLUEPRINTS, ExamBlueprintArea, BlueprintTopic } from '../config/examConfig';

// ============================================================================
// Types
// ============================================================================

export interface BlueprintAreaStats {
  areaId: string;
  areaName: string;
  /** AICPA exam weight range [min, max] */
  examWeight: [number, number];
  /** Midpoint of exam weight for calculations */
  examWeightMid: number;
  /** Student's mastery score (0-100) */
  mastery: number;
  /** Number of questions attempted in this area */
  questionsAttempted: number;
  /** Number of questions correct */
  questionsCorrect: number;
  /** Accuracy percentage */
  accuracy: number;
  /** Coverage: % of topics in this area that have been practiced */
  coverage: number;
  /** Topics within this area */
  topics: TopicStats[];
  /** Mastery status for heat map coloring */
  status: 'mastered' | 'proficient' | 'developing' | 'weak' | 'untouched';
  /** Priority score (higher = more important to study) */
  studyPriority: number;
}

export interface TopicStats {
  topicId: string;
  topicName: string;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
  status: 'mastered' | 'proficient' | 'developing' | 'weak' | 'untouched';
}

export interface BlueprintAnalytics {
  section: ExamSection;
  totalAreas: number;
  /** Overall mastery across all blueprint areas */
  overallMastery: number;
  /** Areas sorted by study priority (highest first) */
  areas: BlueprintAreaStats[];
  /** Top 5 recommendations for what to study next */
  recommendations: StudyRecommendation[];
  /** Coverage comparison to AICPA weights */
  weightComparison: WeightComparison[];
  /** Summary stats */
  summary: {
    areasAtRisk: number;      // Areas with <60% mastery and high exam weight
    areasMastered: number;    // Areas with 80%+ mastery
    totalQuestionsAnswered: number;
    overallAccuracy: number;
    coverageScore: number;    // % of blueprint covered
  };
}

export interface StudyRecommendation {
  areaId: string;
  areaName: string;
  reason: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  suggestedAction: string;
  examWeightMid: number;
  currentMastery: number;
  potentialGain: number;  // Estimated point impact on exam
}

export interface WeightComparison {
  areaId: string;
  areaName: string;
  examWeight: number;      // AICPA weight (midpoint)
  studentCoverage: number; // Student's % of questions in this area
  gap: number;             // Difference (positive = under-studied)
  status: 'balanced' | 'under-studied' | 'over-studied';
}

export interface QuestionAttempt {
  questionId: string;
  blueprintArea?: string;
  topicId?: string;
  correct: boolean;
  timestamp?: Date | string;
}

// ============================================================================
// Mastery Thresholds
// ============================================================================

const MASTERY_THRESHOLDS = {
  mastered: 85,    // 85%+ accuracy with 10+ questions
  proficient: 70,  // 70-84% accuracy
  developing: 50,  // 50-69% accuracy
  weak: 0,         // <50% accuracy
  minQuestionsForMastery: 10,
};

// ============================================================================
// Core Analytics Functions
// ============================================================================

/**
 * Calculate comprehensive blueprint analytics for a section
 */
export function calculateBlueprintAnalytics(
  section: ExamSection,
  questionHistory: QuestionAttempt[]
): BlueprintAnalytics {
  const blueprint = EXAM_BLUEPRINTS[section];
  
  if (!blueprint || !blueprint.areas) {
    return createEmptyAnalytics(section);
  }

  // Filter history for this section (by blueprintArea prefix)
  const sectionHistory = questionHistory.filter(q => 
    q.blueprintArea?.startsWith(section) || 
    q.topicId?.startsWith(section.toLowerCase())
  );

  // Calculate stats for each blueprint area
  const areas = blueprint.areas.map((area: ExamBlueprintArea) => 
    calculateAreaStats(area, sectionHistory)
  );

  // Sort by study priority (highest first)
  const sortedAreas = [...areas].sort((a, b) => b.studyPriority - a.studyPriority);

  // Generate recommendations
  const recommendations = generateRecommendations(sortedAreas);

  // Calculate weight comparison
  const weightComparison = calculateWeightComparison(areas, sectionHistory.length);

  // Calculate summary
  const summary = calculateSummary(areas, sectionHistory);

  // Calculate overall mastery (weighted by exam weights)
  const overallMastery = calculateOverallMastery(areas);

  return {
    section,
    totalAreas: areas.length,
    overallMastery,
    areas: sortedAreas,
    recommendations,
    weightComparison,
    summary,
  };
}

/**
 * Calculate stats for a single blueprint area
 */
function calculateAreaStats(
  area: ExamBlueprintArea,
  questionHistory: QuestionAttempt[]
): BlueprintAreaStats {
  // Filter questions for this area
  const areaQuestions = questionHistory.filter(q =>
    q.blueprintArea === area.id ||
    q.blueprintArea?.startsWith(area.id + '-') ||
    q.topicId?.startsWith(area.id.toLowerCase().replace('-', ''))
  );

  const questionsAttempted = areaQuestions.length;
  const questionsCorrect = areaQuestions.filter(q => q.correct).length;
  const accuracy = questionsAttempted > 0 
    ? Math.round((questionsCorrect / questionsAttempted) * 100) 
    : 0;

  // Get all topics in this area
  const allTopics = getAllTopicsInArea(area);
  const topicStats = calculateTopicStats(allTopics, areaQuestions);

  // Coverage = % of topics with at least 1 question attempted
  const topicsWithQuestions = topicStats.filter(t => t.questionsAttempted > 0).length;
  const coverage = allTopics.length > 0 
    ? Math.round((topicsWithQuestions / allTopics.length) * 100) 
    : 0;

  // Calculate mastery (combines accuracy and volume)
  const mastery = calculateMastery(accuracy, questionsAttempted, coverage);
  const status = getMasteryStatus(mastery, questionsAttempted);

  // Exam weight
  const weightRange = area.weightRange || [10, 20];
  const examWeightMid = (weightRange[0] + weightRange[1]) / 2;

  // Study priority = exam weight × (100 - mastery) × coverage factor
  // Prioritize high-weight areas with low mastery
  const coverageFactor = coverage < 50 ? 1.5 : 1; // Boost untouched areas
  const studyPriority = Math.round(examWeightMid * (100 - mastery) * coverageFactor / 100);

  return {
    areaId: area.id,
    areaName: area.name,
    examWeight: weightRange,
    examWeightMid,
    mastery,
    questionsAttempted,
    questionsCorrect,
    accuracy,
    coverage,
    topics: topicStats,
    status,
    studyPriority,
  };
}

/**
 * Get all topics from an area (flattens groups)
 */
function getAllTopicsInArea(area: ExamBlueprintArea): BlueprintTopic[] {
  const topics: BlueprintTopic[] = [];
  
  if (area.groups) {
    for (const group of area.groups) {
      if (group.topics) {
        for (const topic of group.topics) {
          topics.push({ id: topic.id, name: topic.name });
        }
      }
    }
  }
  
  return topics;
}

/**
 * Calculate stats for individual topics
 */
function calculateTopicStats(
  topics: { id: string; name: string }[],
  areaQuestions: QuestionAttempt[]
): TopicStats[] {
  return topics.map(topic => {
    const topicQuestions = areaQuestions.filter(q =>
      q.topicId === topic.id || 
      q.blueprintArea?.includes(topic.id.split('-').slice(-1)[0])
    );

    const questionsAttempted = topicQuestions.length;
    const questionsCorrect = topicQuestions.filter(q => q.correct).length;
    const accuracy = questionsAttempted > 0 
      ? Math.round((questionsCorrect / questionsAttempted) * 100) 
      : 0;

    const mastery = calculateMastery(accuracy, questionsAttempted, questionsAttempted > 0 ? 100 : 0);
    const status = getMasteryStatus(mastery, questionsAttempted);

    return {
      topicId: topic.id,
      topicName: topic.name,
      questionsAttempted,
      questionsCorrect,
      accuracy,
      status,
    };
  });
}

/**
 * Calculate mastery score (0-100)
 * Considers accuracy, volume, and coverage
 */
function calculateMastery(accuracy: number, questionsAttempted: number, coverage: number): number {
  if (questionsAttempted === 0) return 0;

  // Volume factor: ramps up to 1.0 at 15+ questions
  const volumeFactor = Math.min(1, questionsAttempted / 15);

  // Coverage factor: small penalty for incomplete coverage
  const coverageFactor = 0.9 + (coverage / 1000); // 0.9 to 1.0

  // Base mastery from accuracy, scaled by volume and coverage
  const mastery = accuracy * volumeFactor * coverageFactor;

  return Math.round(Math.min(100, mastery));
}

/**
 * Get mastery status for heat map coloring
 */
function getMasteryStatus(
  mastery: number, 
  questionsAttempted: number
): 'mastered' | 'proficient' | 'developing' | 'weak' | 'untouched' {
  if (questionsAttempted === 0) return 'untouched';
  if (mastery >= MASTERY_THRESHOLDS.mastered && questionsAttempted >= MASTERY_THRESHOLDS.minQuestionsForMastery) return 'mastered';
  if (mastery >= MASTERY_THRESHOLDS.proficient) return 'proficient';
  if (mastery >= MASTERY_THRESHOLDS.developing) return 'developing';
  return 'weak';
}

/**
 * Calculate overall mastery weighted by exam weights
 */
function calculateOverallMastery(areas: BlueprintAreaStats[]): number {
  const totalWeight = areas.reduce((sum, a) => sum + a.examWeightMid, 0);
  if (totalWeight === 0) return 0;

  const weightedMastery = areas.reduce(
    (sum, a) => sum + (a.mastery * a.examWeightMid),
    0
  );

  return Math.round(weightedMastery / totalWeight);
}

/**
 * Generate smart study recommendations
 */
function generateRecommendations(areas: BlueprintAreaStats[]): StudyRecommendation[] {
  const recommendations: StudyRecommendation[] = [];

  for (const area of areas) {
    // Skip mastered areas
    if (area.status === 'mastered') continue;

    // Calculate potential exam impact
    // High-weight areas with low mastery = high potential gain
    const potentialGain = Math.round(
      (area.examWeightMid / 100) * (100 - area.mastery) * 0.5
    );

    let priority: 'critical' | 'high' | 'medium' | 'low';
    let reason: string;
    let suggestedAction: string;

    if (area.status === 'untouched') {
      priority = area.examWeightMid >= 25 ? 'critical' : 'high';
      reason = `${area.examWeightMid}% exam weight, no practice yet`;
      suggestedAction = `Start with fundamentals lessons, then practice 20+ MCQs`;
    } else if (area.status === 'weak') {
      priority = area.examWeightMid >= 20 ? 'critical' : 'high';
      reason = `${area.accuracy}% accuracy needs improvement (${area.examWeightMid}% of exam)`;
      suggestedAction = `Review lessons, focus on ${area.topics.filter(t => t.status === 'weak').length} weak topics`;
    } else if (area.status === 'developing') {
      priority = area.examWeightMid >= 25 ? 'high' : 'medium';
      reason = `Building proficiency (${area.accuracy}% accuracy, ${area.examWeightMid}% of exam)`;
      suggestedAction = `Practice ${Math.max(0, 15 - area.questionsAttempted)} more MCQs to solidify`;
    } else {
      priority = 'low';
      reason = `Near mastery (${area.accuracy}% accuracy)`;
      suggestedAction = `Quick review before exam, focus on edge cases`;
    }

    recommendations.push({
      areaId: area.areaId,
      areaName: area.areaName,
      reason,
      priority,
      suggestedAction,
      examWeightMid: area.examWeightMid,
      currentMastery: area.mastery,
      potentialGain,
    });
  }

  // Sort by priority then potential gain
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  return recommendations
    .sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.potentialGain - a.potentialGain;
    })
    .slice(0, 5); // Top 5 recommendations
}

/**
 * Compare student's study distribution to AICPA exam weights
 */
function calculateWeightComparison(
  areas: BlueprintAreaStats[],
  totalQuestions: number
): WeightComparison[] {
  return areas.map(area => {
    const studentCoverage = totalQuestions > 0 
      ? Math.round((area.questionsAttempted / totalQuestions) * 100)
      : 0;

    const gap = area.examWeightMid - studentCoverage;

    let status: 'balanced' | 'under-studied' | 'over-studied';
    if (Math.abs(gap) <= 5) {
      status = 'balanced';
    } else if (gap > 0) {
      status = 'under-studied';
    } else {
      status = 'over-studied';
    }

    return {
      areaId: area.areaId,
      areaName: area.areaName,
      examWeight: area.examWeightMid,
      studentCoverage,
      gap,
      status,
    };
  });
}

/**
 * Calculate summary statistics
 */
function calculateSummary(
  areas: BlueprintAreaStats[],
  questionHistory: QuestionAttempt[]
): BlueprintAnalytics['summary'] {
  const areasAtRisk = areas.filter(
    a => a.mastery < 60 && a.examWeightMid >= 20
  ).length;

  const areasMastered = areas.filter(
    a => a.status === 'mastered'
  ).length;

  const totalQuestionsAnswered = questionHistory.length;
  const totalCorrect = questionHistory.filter(q => q.correct).length;
  const overallAccuracy = totalQuestionsAnswered > 0
    ? Math.round((totalCorrect / totalQuestionsAnswered) * 100)
    : 0;

  // Coverage = % of areas with at least some practice
  const areasWithPractice = areas.filter(a => a.questionsAttempted > 0).length;
  const coverageScore = areas.length > 0
    ? Math.round((areasWithPractice / areas.length) * 100)
    : 0;

  return {
    areasAtRisk,
    areasMastered,
    totalQuestionsAnswered,
    overallAccuracy,
    coverageScore,
  };
}

/**
 * Create empty analytics for sections without blueprint data
 */
function createEmptyAnalytics(section: ExamSection): BlueprintAnalytics {
  return {
    section,
    totalAreas: 0,
    overallMastery: 0,
    areas: [],
    recommendations: [],
    weightComparison: [],
    summary: {
      areasAtRisk: 0,
      areasMastered: 0,
      totalQuestionsAnswered: 0,
      overallAccuracy: 0,
      coverageScore: 0,
    },
  };
}

// ============================================================================
// Heat Map Utilities
// ============================================================================

export const MASTERY_COLORS = {
  mastered: { bg: 'bg-emerald-500', text: 'text-white', border: 'border-emerald-600' },
  proficient: { bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-600' },
  developing: { bg: 'bg-amber-400', text: 'text-slate-900', border: 'border-amber-500' },
  weak: { bg: 'bg-red-500', text: 'text-white', border: 'border-red-600' },
  untouched: { bg: 'bg-slate-200 dark:bg-slate-700', text: 'text-slate-600 dark:text-slate-400', border: 'border-slate-300 dark:border-slate-600' },
} as const;

export const PRIORITY_COLORS = {
  critical: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', badge: 'bg-red-500' },
  high: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', badge: 'bg-amber-500' },
  medium: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', badge: 'bg-blue-500' },
  low: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-400', badge: 'bg-slate-400' },
} as const;

/**
 * Get mastery color classes for a status
 */
export function getMasteryColorClasses(status: BlueprintAreaStats['status']) {
  return MASTERY_COLORS[status];
}

/**
 * Get priority color classes
 */
export function getPriorityColorClasses(priority: StudyRecommendation['priority']) {
  return PRIORITY_COLORS[priority];
}

/**
 * Format mastery score for display
 */
export function formatMasteryScore(mastery: number): string {
  if (mastery >= 85) return 'Mastered';
  if (mastery >= 70) return 'Proficient';
  if (mastery >= 50) return 'Developing';
  if (mastery > 0) return 'Weak';
  return 'Not Started';
}
