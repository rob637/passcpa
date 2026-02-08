/**
 * CMA Score Predictor Service
 * 
 * Predicts IMA CMA exam performance based on:
 * - Practice question accuracy by part and domain
 * - Time management patterns
 * - Mock exam results
 * - Learning velocity
 * 
 * IMA Scoring: 0-500 scale, 360 passing
 */

import { CMASectionId, getPerformanceSummary } from './cmaAdaptiveEngine';

// IMA CMA scoring constants
const PASSING_SCORE = 360;
const MAX_SCORE = 500;
const MIN_SCORE = 0;

// Domain weights per IMA CMA Content Specification
const PART_DOMAIN_WEIGHTS: Record<CMASectionId, Record<string, number>> = {
  CMA1: {
    'CMA1-A': 15, // External Financial Reporting
    'CMA1-B': 20, // Planning, Budgeting, Forecasting
    'CMA1-C': 20, // Performance Management
    'CMA1-D': 15, // Cost Management
    'CMA1-E': 15, // Internal Controls
    'CMA1-F': 15, // Technology and Analytics
  },
  CMA2: {
    'CMA2-A': 20, // Financial Statement Analysis
    'CMA2-B': 20, // Corporate Finance
    'CMA2-C': 25, // Decision Analysis
    'CMA2-D': 10, // Risk Management
    'CMA2-E': 10, // Investment Decisions
    'CMA2-F': 15, // Professional Ethics
  },
};

export interface PredictionInput {
  part: CMASectionId;
  domainAccuracy: Record<string, number>;
  totalQuestionsAnswered: number;
  averageTimePerQuestion: number; // seconds
  recentTrend: 'improving' | 'stable' | 'declining';
  mockExamScores: number[];
  daysUntilExam?: number;
  studyHoursPerWeek?: number;
}

export interface ScorePrediction {
  part: CMASectionId;
  predictedScore: number; // 0-500 scale
  confidenceInterval: { low: number; high: number };
  passProbability: number; // 0-100%
  readinessLevel: 'not-ready' | 'at-risk' | 'borderline' | 'likely' | 'confident';
  domainPredictions: Record<string, {
    predictedScore: number;
    contribution: number;
    status: 'weak' | 'developing' | 'proficient' | 'strong';
  }>;
  recommendations: string[];
  estimatedStudyHoursNeeded: number;
}

export interface AllPartsScorePrediction {
  parts: Record<CMASectionId, ScorePrediction>;
  overallReadiness: 'not-ready' | 'at-risk' | 'borderline' | 'likely' | 'confident';
  overallPassProbability: number; // Probability of passing both
  recommendations: string[];
}

/**
 * Calculate weighted score from domain accuracies for a part
 */
function calculateWeightedScore(part: CMASectionId, domainAccuracy: Record<string, number>): number {
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
 * Convert raw percentage to IMA scaled score (0-500)
 */
function rawToScaledScore(rawPercentage: number): number {
  // Linear mapping: 0% → 0, 100% → 500
  return Math.round((rawPercentage / 100) * MAX_SCORE);
}

/**
 * Calculate pass probability from scaled score
 */
function scaledToPassProbability(scaledScore: number, variance: number): number {
  // Use logistic curve centered at passing score
  const k = 0.03 - (variance * 0.0002); // steeper curve with less variance
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
  
  // Margin shrinks with more data (max margin ~50 on IMA scale)
  const margin = Math.round(50 * (1 - basePrecision * 0.7) * varianceAdjustment);
  
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
  if (accuracy >= 72) return 'proficient';
  if (accuracy >= 55) return 'developing';
  return 'weak';
}

/**
 * Generate recommendations for a part
 */
function generateRecommendations(
  part: CMASectionId,
  domainPredictions: ScorePrediction['domainPredictions'],
  passProbability: number,
  totalQuestions: number,
  averageTime: number
): string[] {
  const recommendations: string[] = [];
  
  // Find weak domains
  const weakDomains = Object.entries(domainPredictions)
    .filter(([, pred]) => pred.status === 'weak')
    .map(([domain]) => domain);
  
  if (weakDomains.length > 0) {
    recommendations.push(`Focus on weak areas: ${weakDomains.join(', ')}`);
  }
  
  // Question volume check
  if (totalQuestions < 200) {
    recommendations.push(`Complete more practice questions for ${part} (current: ${totalQuestions}, target: 500+)`);
  }
  
  // Time management (4 hours for 100 questions = 144 sec/question)
  const targetTime = 144;
  if (averageTime > targetTime * 1.2) {
    recommendations.push(`Work on pacing - averaging ${Math.round(averageTime)}s/question, target is ${targetTime}s`);
  } else if (averageTime < targetTime * 0.5) {
    recommendations.push('Slow down and read questions more carefully');
  }
  
  // CMA2-specific: Decision Analysis is 25%
  if (part === 'CMA2') {
    const decisionStatus = domainPredictions['CMA2-C']?.status;
    if (decisionStatus === 'weak' || decisionStatus === 'developing') {
      recommendations.push('Decision Analysis (CMA2-C) is 25% of Part 2 - prioritize CVP, marginal analysis');
    }
  }
  
  // Pass probability guidance
  if (passProbability < 50) {
    recommendations.push(`Current ${part} pass probability is ${passProbability}% - delay exam until more prepared`);
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
  
  // Rough estimation based on IMA's 150-170 hours per part recommendation
  const pointsNeeded = Math.max(0, PASSING_SCORE + 20 - currentScore);
  const hoursPerPoint = 0.5 + (currentScore / 200); // diminishing returns
  
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
    // Weight mock exams more heavily
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
 * Predict scores for both CMA parts
 */
export function predictAllPartsScores(): AllPartsScorePrediction {
  const parts: CMASectionId[] = ['CMA1', 'CMA2'];
  const partPredictions: Record<CMASectionId, ScorePrediction> = {} as Record<CMASectionId, ScorePrediction>;
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
      const baseAccuracy = partBreakdown?.accuracy || 50;
      domainAccuracy[domain] = isWeak ? Math.max(30, baseAccuracy - 15) :
                              isStrong ? Math.min(95, baseAccuracy + 10) : baseAccuracy;
    });
    
    const prediction = predictScore({
      part,
      domainAccuracy,
      totalQuestionsAnswered: partBreakdown?.questionsAttempted || 0,
      averageTimePerQuestion: 120,
      recentTrend: isStrong ? 'improving' : isWeak ? 'declining' : 'stable',
      mockExamScores: [],
    });
    
    partPredictions[part] = prediction;
    allRecommendations = allRecommendations.concat(prediction.recommendations);
  });
  
  // Overall pass probability (must pass both parts)
  const overallPassProbability = Math.round(
    (partPredictions.CMA1.passProbability / 100) *
    (partPredictions.CMA2.passProbability / 100) * 100
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
export function getQuickPrediction(part: CMASectionId): {
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
  
  const readiness = scaledScore >= 400 ? 'Ready' :
                    scaledScore >= 360 ? 'Almost Ready' :
                    scaledScore >= 320 ? 'Getting Close' : 'Keep Studying';
  
  return { score: scaledScore, probability, readiness };
}
