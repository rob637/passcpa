/**
 * EA Score Predictor Service
 * 
 * Predicts IRS SEE exam performance based on:
 * - Practice question accuracy by part and domain
 * - Time management patterns
 * - Mock exam results
 * - Learning velocity
 * 
 * IRS Scoring: 40-130 scale, 105 passing
 */

import { EASectionId } from '../courses/ea/config';
import { getPerformanceSummary } from './eaAdaptiveEngine';

// IRS SEE scoring constants
const PASSING_SCORE = 105;
const MAX_SCORE = 130;
const MIN_SCORE = 40;

// Domain weights per IRS SEE Content Outline
const PART_DOMAIN_WEIGHTS: Record<EASectionId, Record<string, number>> = {
  SEE1: {
    'SEE1-1': 16.5,
    'SEE1-2': 20.0,
    'SEE1-3': 20.0,
    'SEE1-4': 17.6,
    'SEE1-5': 12.9,
    'SEE1-6': 12.9,
  },
  SEE2: {
    'SEE2-1': 28.2,
    'SEE2-2': 38.8,
    'SEE2-3': 32.9,
  },
  SEE3: {
    'SEE3-1': 25.9,
    'SEE3-2': 17.6,
    'SEE3-3': 23.5,
    'SEE3-4': 16.5,
  },
};

export interface PredictionInput {
  part: EASectionId;
  domainAccuracy: Record<string, number>;
  totalQuestionsAnswered: number;
  averageTimePerQuestion: number; // seconds
  recentTrend: 'improving' | 'stable' | 'declining';
  mockExamScores: number[];
  daysUntilExam?: number;
  studyHoursPerWeek?: number;
}

export interface ScorePrediction {
  part: EASectionId;
  predictedScore: number; // 40-130 scale
  confidenceInterval: { low: number; high: number };
  passProbability: number; // 0-100%
  readinessLevel: 'not-ready' | 'at-risk' | 'borderline' | 'likely' | 'confident';
  domainPredictions: Record<string, {
    predictedScore: number;
    contribution: number; // Weighted contribution
    status: 'weak' | 'developing' | 'proficient' | 'strong';
  }>;
  recommendations: string[];
  estimatedStudyHoursNeeded: number;
}

export interface AllPartsScorePrediction {
  parts: Record<EASectionId, ScorePrediction>;
  overallReadiness: 'not-ready' | 'at-risk' | 'borderline' | 'likely' | 'confident';
  overallPassProbability: number; // Probability of passing all 3
  recommendations: string[];
}

/**
 * Calculate weighted score from domain accuracies for a part
 */
function calculateWeightedScore(part: EASectionId, domainAccuracy: Record<string, number>): number {
  const weights = PART_DOMAIN_WEIGHTS[part];
  let weightedSum = 0;
  let totalWeight = 0;
  
  Object.entries(weights).forEach(([domain, weight]) => {
    const accuracy = domainAccuracy[domain] || 0;
    weightedSum += accuracy * weight;
    totalWeight += weight;
  });
  
  return totalWeight > 0 ? weightedSum / totalWeight : 0;
}

/**
 * Convert raw percentage to IRS scaled score (40-130)
 */
function rawToScaledScore(rawPercentage: number): number {
  // Linear mapping: 0% → 40, 100% → 130
  // Passing (~72%) maps to 105
  return Math.round(MIN_SCORE + (rawPercentage / 100) * (MAX_SCORE - MIN_SCORE));
}

/**
 * Calculate pass probability from scaled score
 */
function scaledToPassProbability(scaledScore: number, variance: number): number {
  // Use logistic curve centered at passing score
  const k = 0.15 - (variance * 0.001); // steeper curve with less variance
  const probability = 100 / (1 + Math.exp(-k * (scaledScore - PASSING_SCORE)));
  return Math.round(Math.max(0, Math.min(100, probability)));
}

/**
 * Calculate confidence interval based on sample size and variance
 */
function calculateConfidenceInterval(
  predictedScore: number,
  sampleSize: number,
  variance: number
): { low: number; high: number } {
  // More questions = narrower confidence interval
  const basePrecision = Math.min(sampleSize / 500, 1);
  const varianceAdjustment = Math.max(0.5, 1 - variance / 20);
  
  // Margin shrinks with more data (max margin ~15 on IRS scale)
  const margin = Math.round(15 * (1 - basePrecision * 0.7) * varianceAdjustment);
  
  return {
    low: Math.max(MIN_SCORE, predictedScore - margin),
    high: Math.min(MAX_SCORE, predictedScore + margin),
  };
}

/**
 * Determine readiness level
 */
function getReadinessLevel(
  passProbability: number,
  totalQuestions: number
): ScorePrediction['readinessLevel'] {
  if (totalQuestions < 100) return 'not-ready';
  
  if (passProbability >= 85) return 'confident';
  if (passProbability >= 70) return 'likely';
  if (passProbability >= 50) return 'borderline';
  if (passProbability >= 30) return 'at-risk';
  return 'not-ready';
}

/**
 * Get domain status
 */
function getDomainStatus(accuracy: number): 'weak' | 'developing' | 'proficient' | 'strong' {
  if (accuracy >= 80) return 'strong';
  if (accuracy >= 70) return 'proficient';
  if (accuracy >= 55) return 'developing';
  return 'weak';
}

/**
 * Generate recommendations for a part
 */
function generateRecommendations(
  part: EASectionId,
  domainPredictions: ScorePrediction['domainPredictions'],
  passProbability: number,
  totalQuestions: number,
  averageTime: number
): string[] {
  const recommendations: string[] = [];
  const partNames = { SEE1: 'Individuals', SEE2: 'Businesses', SEE3: 'Representation' };
  
  // Find weak domains
  const weakDomains = Object.entries(domainPredictions)
    .filter(([, pred]) => pred.status === 'weak')
    .map(([domain]) => domain);
  
  if (weakDomains.length > 0) {
    recommendations.push(`Focus on weak areas in ${partNames[part]}: ${weakDomains.join(', ')}`);
  }
  
  // Question volume check
  if (totalQuestions < 200) {
    recommendations.push(`Complete more practice questions for ${partNames[part]} (current: ${totalQuestions}, target: 500+)`);
  }
  
  // Time management (IRS allows 3.5 hours for 100 questions = 126 sec/question)
  const targetTime = 126;
  if (averageTime > targetTime * 1.2) {
    recommendations.push(`Work on pacing - averaging ${Math.round(averageTime)}s/question, target is ${targetTime}s`);
  } else if (averageTime < targetTime * 0.5) {
    recommendations.push('Slow down and read questions more carefully');
  }
  
  // SEE3-specific: Circular 230
  if (part === 'SEE3') {
    const circular230Status = domainPredictions['SEE3-2']?.status;
    if (circular230Status === 'weak' || circular230Status === 'developing') {
      recommendations.push('Circular 230 is critical for SEE3 - review IRS regulations thoroughly');
    }
  }
  
  // Pass probability guidance
  if (passProbability < 50) {
    recommendations.push(`Current ${partNames[part]} pass probability is ${passProbability}% - schedule exam after more preparation`);
  }
  
  return recommendations.slice(0, 3);
}

/**
 * Calculate variance in accuracy across domains
 */
function calculateVariance(domainAccuracy: Record<string, number>): number {
  const values = Object.values(domainAccuracy);
  if (values.length === 0) return 20;
  
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

/**
 * Estimate study hours needed to reach passing
 */
function estimateStudyHoursNeeded(
  currentScore: number,
  passProbability: number,
  _studyHoursPerWeek = 10
): number {
  if (passProbability >= 85) return 0;
  
  // Rough estimation: each hour of study = ~0.5 point improvement initially
  const pointsNeeded = Math.max(0, PASSING_SCORE + 10 - currentScore);
  const hoursPerPoint = 2 + (currentScore / 20); // diminishing returns
  
  return Math.round(pointsNeeded * hoursPerPoint);
}

/**
 * Predict score for a single part
 */
export function predictScore(input: PredictionInput): ScorePrediction {
  const { part, domainAccuracy, totalQuestionsAnswered, averageTimePerQuestion, mockExamScores } = input;
  
  // Calculate raw weighted accuracy
  const rawAccuracy = calculateWeightedScore(part, domainAccuracy);
  
  // Factor in mock exam performance if available
  let adjustedAccuracy = rawAccuracy;
  if (mockExamScores.length > 0) {
    const avgMockScore = mockExamScores.reduce((a, b) => a + b, 0) / mockExamScores.length;
    // Weight mock exams more heavily as they're more realistic
    adjustedAccuracy = rawAccuracy * 0.6 + avgMockScore * 0.4;
  }
  
  // Apply trend adjustment
  const trendMultiplier = input.recentTrend === 'improving' ? 1.05 : 
                          input.recentTrend === 'declining' ? 0.95 : 1.0;
  adjustedAccuracy = Math.min(100, adjustedAccuracy * trendMultiplier);
  
  // Calculate predicted score
  const predictedScore = rawToScaledScore(adjustedAccuracy);
  
  // Calculate variance & confidence
  const variance = calculateVariance(domainAccuracy);
  const confidenceInterval = calculateConfidenceInterval(predictedScore, totalQuestionsAnswered, variance);
  
  // Pass probability
  const passProbability = scaledToPassProbability(predictedScore, variance);
  
  // Readiness
  const readinessLevel = getReadinessLevel(passProbability, totalQuestionsAnswered);
  
  // Domain predictions
  const domainPredictions: ScorePrediction['domainPredictions'] = {};
  const weights = PART_DOMAIN_WEIGHTS[part];
  
  Object.entries(weights).forEach(([domain, weight]) => {
    const accuracy = domainAccuracy[domain] || 0;
    domainPredictions[domain] = {
      predictedScore: rawToScaledScore(accuracy),
      contribution: Math.round((accuracy * weight) / 100),
      status: getDomainStatus(accuracy),
    };
  });
  
  // Recommendations
  const recommendations = generateRecommendations(
    part,
    domainPredictions,
    passProbability,
    totalQuestionsAnswered,
    averageTimePerQuestion
  );
  
  // Study hours estimate
  const estimatedStudyHoursNeeded = estimateStudyHoursNeeded(
    predictedScore,
    passProbability,
    input.studyHoursPerWeek
  );
  
  return {
    part,
    predictedScore,
    confidenceInterval,
    passProbability,
    readinessLevel,
    domainPredictions,
    recommendations,
    estimatedStudyHoursNeeded,
  };
}

/**
 * Predict scores for all 3 SEE parts
 */
export function predictAllPartsScores(): AllPartsScorePrediction {
  const parts: EASectionId[] = ['SEE1', 'SEE2', 'SEE3'];
  const partPredictions: Record<EASectionId, ScorePrediction> = {} as Record<EASectionId, ScorePrediction>;
  let allRecommendations: string[] = [];
  
  const summary = getPerformanceSummary();
  
  parts.forEach(part => {
    const partBreakdown = summary.partBreakdown.find(p => p.part === part);
    const isWeak = summary.weakParts.includes(part);
    const isStrong = summary.strongParts.includes(part);
    
    // Build domain accuracy from performance summary
    const domainAccuracy: Record<string, number> = {};
    const weights = PART_DOMAIN_WEIGHTS[part];
    Object.keys(weights).forEach((domain: string) => {
      // Estimate domain accuracy based on overall part performance
      const baseAccuracy = partBreakdown?.accuracy || 50;
      domainAccuracy[domain] = isWeak ? Math.max(30, baseAccuracy - 15) :
                              isStrong ? Math.min(95, baseAccuracy + 10) : baseAccuracy;
    });
    
    const prediction = predictScore({
      part,
      domainAccuracy,
      totalQuestionsAnswered: partBreakdown?.questionsAttempted || 0,
      averageTimePerQuestion: 90,
      recentTrend: isStrong ? 'improving' : isWeak ? 'declining' : 'stable',
      mockExamScores: [],
    });
    
    partPredictions[part] = prediction;
    allRecommendations = allRecommendations.concat(prediction.recommendations);
  });
  
  // Overall pass probability (must pass all 3)
  const overallPassProbability = Math.round(
    (partPredictions.SEE1.passProbability / 100) *
    (partPredictions.SEE2.passProbability / 100) *
    (partPredictions.SEE3.passProbability / 100) * 100
  );
  
  // Overall readiness
  const readinessLevels = parts.map(p => partPredictions[p].readinessLevel);
  let overallReadiness: AllPartsScorePrediction['overallReadiness'] = 'confident';
  
  if (readinessLevels.includes('not-ready')) {
    overallReadiness = 'not-ready';
  } else if (readinessLevels.includes('at-risk')) {
    overallReadiness = 'at-risk';
  } else if (readinessLevels.includes('borderline')) {
    overallReadiness = 'borderline';
  } else if (readinessLevels.includes('likely')) {
    overallReadiness = 'likely';
  }
  
  return {
    parts: partPredictions,
    overallReadiness,
    overallPassProbability,
    recommendations: [...new Set(allRecommendations)].slice(0, 5),
  };
}

/**
 * Get quick prediction summary for UI
 */
export function getQuickPrediction(part: EASectionId): {
  score: number;
  probability: number;
  readiness: string;
} {
  const summary = getPerformanceSummary();
  const partData = summary.partBreakdown.find(p => p.part === part);
  
  if (!partData || partData.questionsAttempted < 10) {
    return { score: MIN_SCORE, probability: 0, readiness: 'Not enough data' };
  }
  
  const scaledScore = rawToScaledScore(partData.accuracy);
  const probability = scaledToPassProbability(scaledScore, 10);
  
  const readiness = scaledScore >= 115 ? 'Ready' :
                    scaledScore >= 105 ? 'Almost Ready' :
                    scaledScore >= 95 ? 'Getting Close' : 'Keep Studying';
  
  return { score: scaledScore, probability, readiness };
}
