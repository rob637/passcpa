/**
 * CPA Score Predictor Service
 * 
 * Predicts CPA exam performance based on:
 * - Practice question accuracy by section and blueprint area
 * - TBS (Task-Based Simulation) performance
 * - Time management patterns
 * - Mock exam results
 * - Learning velocity
 * 
 * AICPA Scoring: 0-99 scale, 75 passing
 * 
 * CPA Evolution Model:
 * - Core Sections: FAR, AUD, REG (mandatory)
 * - Discipline Sections: BAR, ISC, TCP (choose 1)
 */

import { 
  CPASectionId, 
  CPA_CORE_SECTIONS,
  getPerformanceSummary,
  getSectionBlueprintPerformance,
  getActiveSections,
  SECTION_BLUEPRINT_WEIGHTS,
} from './cpaAdaptiveEngine';

// AICPA CPA scoring constants
const PASSING_SCORE = 75;
const MAX_SCORE = 99;
const MIN_SCORE = 0;

// Section names for display
const SECTION_NAMES: Record<CPASectionId, string> = {
  FAR: 'Financial Accounting and Reporting',
  AUD: 'Auditing and Attestation',
  REG: 'Regulation',
  BAR: 'Business Analysis and Reporting',
  ISC: 'Information Systems and Controls',
  TCP: 'Tax Compliance and Planning',
};

export interface PredictionInput {
  section: CPASectionId;
  blueprintAreaAccuracy: Record<string, number>; // e.g., { 'FAR-I': 75, 'FAR-II': 82 }
  totalQuestionsAnswered: number;
  tbsAccuracy?: number; // 0-100
  averageTimePerQuestion: number; // seconds
  recentTrend: 'improving' | 'stable' | 'declining';
  mockExamScores: number[]; // Recent mock exam scores (0-99)
  daysUntilExam?: number;
  studyHoursPerWeek?: number;
}

export interface ScorePrediction {
  section: CPASectionId;
  sectionName: string;
  predictedScore: number; // 0-99 scale
  confidenceInterval: { low: number; high: number };
  passProbability: number; // 0-100%
  readinessLevel: 'not-ready' | 'at-risk' | 'borderline' | 'likely' | 'confident';
  blueprintAreaPredictions: Record<string, {
    predictedScore: number;
    contribution: number; // Weighted contribution
    status: 'weak' | 'developing' | 'proficient' | 'strong';
    weight: number;
  }>;
  recommendations: string[];
  estimatedStudyHoursNeeded: number;
  mcqReadiness: number; // 0-100
  tbsReadiness: number; // 0-100
}

export interface AllSectionsScorePrediction {
  sections: Record<CPASectionId, ScorePrediction>;
  activeSections: CPASectionId[];
  overallReadiness: 'not-ready' | 'at-risk' | 'borderline' | 'likely' | 'confident';
  overallPassProbability: number; // Probability of passing all 4 sections
  recommendations: string[];
  estimatedTotalStudyHours: number;
}

/**
 * Calculate weighted score from blueprint area accuracies for a section
 */
function calculateWeightedScore(section: CPASectionId, blueprintAreaAccuracy: Record<string, number>): number {
  const weights = SECTION_BLUEPRINT_WEIGHTS[section];
  if (!weights) return 0;
  
  let weightedSum = 0;
  let totalWeight = 0;
  
  Object.entries(weights).forEach(([area, weight]) => {
    const accuracy = blueprintAreaAccuracy[area] || 0;
    weightedSum += accuracy * weight;
    totalWeight += weight;
  });
  
  return totalWeight > 0 ? weightedSum / totalWeight : 0;
}

/**
 * Convert raw percentage to AICPA scaled score (0-99)
 * The CPA exam uses a non-linear scaling where ~75% correct ≈ 75 scaled
 */
function rawToScaledScore(rawPercentage: number): number {
  // Apply a curve that maps practice performance to expected exam score
  // Practice performance typically slightly overestimates exam performance
  const examAdjustment = 0.92; // Exam is typically harder than practice
  const adjustedPercentage = rawPercentage * examAdjustment;
  
  // Linear mapping with floor and ceiling
  const scaledScore = Math.round(adjustedPercentage);
  return Math.max(MIN_SCORE, Math.min(MAX_SCORE, scaledScore));
}

/**
 * Calculate pass probability from predicted score
 */
function scaledToPassProbability(scaledScore: number, variance: number): number {
  // Use logistic curve centered at passing score
  const k = 0.20 - (variance * 0.002); // steeper curve with less variance
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
  const basePrecision = Math.min(sampleSize / 400, 1); // 400 questions = full precision
  const varianceAdjustment = Math.max(0.5, 1 - variance / 25);
  
  // Margin shrinks with more data (max margin ~10 points)
  const margin = Math.round(10 * (1 - basePrecision * 0.7) * varianceAdjustment);
  
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
  totalQuestions: number,
  section: CPASectionId
): ScorePrediction['readinessLevel'] {
  // Different thresholds based on section difficulty
  const questionThreshold = section === 'FAR' ? 150 : 100; // FAR needs more prep
  
  if (totalQuestions < questionThreshold) return 'not-ready';
  
  if (passProbability >= 85) return 'confident';
  if (passProbability >= 70) return 'likely';
  if (passProbability >= 50) return 'borderline';
  if (passProbability >= 30) return 'at-risk';
  return 'not-ready';
}

/**
 * Get blueprint area status
 */
function getBlueprintAreaStatus(accuracy: number): 'weak' | 'developing' | 'proficient' | 'strong' {
  if (accuracy >= 80) return 'strong';
  if (accuracy >= 70) return 'proficient';
  if (accuracy >= 55) return 'developing';
  return 'weak';
}

/**
 * Generate recommendations for a section
 */
function generateRecommendations(
  section: CPASectionId,
  blueprintAreaPredictions: ScorePrediction['blueprintAreaPredictions'],
  passProbability: number,
  totalQuestions: number,
  averageTime: number,
  tbsAccuracy?: number
): string[] {
  const recommendations: string[] = [];
  const sectionName = SECTION_NAMES[section];
  
  // Find weak blueprint areas
  const weakAreas = Object.entries(blueprintAreaPredictions)
    .filter(([, pred]) => pred.status === 'weak')
    .sort((a, b) => b[1].weight - a[1].weight) // Sort by weight (most important first)
    .map(([area]) => area);
  
  const developingAreas = Object.entries(blueprintAreaPredictions)
    .filter(([, pred]) => pred.status === 'developing')
    .map(([area]) => area);
  
  // High-weight weak areas are critical
  if (weakAreas.length > 0) {
    recommendations.push(`Focus on weak areas in ${sectionName}: ${weakAreas.slice(0, 2).join(', ')}`);
  } else if (developingAreas.length > 0) {
    recommendations.push(`Strengthen developing areas: ${developingAreas.slice(0, 2).join(', ')}`);
  }
  
  // Question volume check
  const targetQuestions = section === 'FAR' ? 500 : 400;
  if (totalQuestions < targetQuestions) {
    recommendations.push(`Complete more ${sectionName} questions (current: ${totalQuestions}, target: ${targetQuestions}+)`);
  }
  
  // TBS check (50% of CPA score is from TBS!)
  if (tbsAccuracy !== undefined && tbsAccuracy < 70) {
    recommendations.push(`TBS practice is critical - current accuracy ${tbsAccuracy}%, target 70%+. TBS is 50% of your score!`);
  } else if (tbsAccuracy === undefined) {
    recommendations.push('Practice Task-Based Simulations (TBS) - they comprise 50% of your exam score');
  }
  
  // Time management (CPA allows 4 hours for ~72 MCQ + TBS)
  // Roughly 90-100 seconds per MCQ is target
  const targetTime = 90;
  if (averageTime > targetTime * 1.3) {
    recommendations.push(`Improve pacing - averaging ${Math.round(averageTime)}s/question, target is ${targetTime}s for MCQs`);
  } else if (averageTime < targetTime * 0.4) {
    recommendations.push('Slow down on MCQs - read questions and all answer choices carefully');
  }
  
  // Section-specific advice
  if (section === 'FAR') {
    const govtNfpAreas = ['FAR-IV', 'FAR-V'];
    const govtNfpWeak = govtNfpAreas.some(a => blueprintAreaPredictions[a]?.status === 'weak');
    if (govtNfpWeak) {
      recommendations.push('Government and NFP accounting are heavily tested in FAR - focus on fund accounting');
    }
  } else if (section === 'REG') {
    const entityTaxArea = blueprintAreaPredictions['REG-IV'];
    if (entityTaxArea?.status === 'weak' || entityTaxArea?.status === 'developing') {
      recommendations.push('Entity taxation (REG-IV) is 22-32% of REG - master C corp, S corp, and partnership rules');
    }
  } else if (section === 'AUD') {
    const reportingArea = blueprintAreaPredictions['AUD-IV'];
    if (reportingArea?.status === 'weak') {
      recommendations.push('Audit reports and modifications (AUD-IV) are frequently tested - study AU-C 700-705');
    }
  }
  
  // Pass probability guidance
  if (passProbability < 50) {
    recommendations.push(`Current ${section} pass probability is ${passProbability}% - continue studying before scheduling`);
  } else if (passProbability >= 80) {
    recommendations.push(`Strong ${section} readiness - consider scheduling your exam within 2-4 weeks`);
  }
  
  return recommendations.slice(0, 4);
}

/**
 * Calculate variance in accuracy across blueprint areas
 */
function calculateVariance(blueprintAreaAccuracy: Record<string, number>): number {
  const values = Object.values(blueprintAreaAccuracy);
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
  section: CPASectionId
): number {
  if (passProbability >= 85) return 0;
  
  // Base hours needed varies by section difficulty
  const baseDifficulty: Record<CPASectionId, number> = {
    FAR: 2.5, // FAR is hardest
    AUD: 2.0,
    REG: 2.2,
    BAR: 1.8,
    ISC: 1.8,
    TCP: 2.0,
  };
  
  const pointsNeeded = Math.max(0, PASSING_SCORE + 5 - currentScore);
  const hoursPerPoint = baseDifficulty[section] + (currentScore / 30); // diminishing returns
  
  return Math.round(pointsNeeded * hoursPerPoint);
}

/**
 * Predict score for a single section
 */
export function predictScore(input: PredictionInput): ScorePrediction {
  const { 
    section, 
    blueprintAreaAccuracy, 
    totalQuestionsAnswered, 
    averageTimePerQuestion, 
    mockExamScores,
    tbsAccuracy 
  } = input;
  
  // Calculate raw weighted accuracy from MCQs
  const rawMcqAccuracy = calculateWeightedScore(section, blueprintAreaAccuracy);
  
  // Factor in TBS performance (TBS is 50% of actual exam!)
  let combinedAccuracy = rawMcqAccuracy;
  if (tbsAccuracy !== undefined) {
    combinedAccuracy = (rawMcqAccuracy * 0.5) + (tbsAccuracy * 0.5);
  }
  
  // Factor in mock exam performance if available
  let adjustedAccuracy = combinedAccuracy;
  if (mockExamScores.length > 0) {
    const avgMockScore = mockExamScores.reduce((a, b) => a + b, 0) / mockExamScores.length;
    // Weight mock exams more heavily as they're more realistic
    adjustedAccuracy = combinedAccuracy * 0.5 + avgMockScore * 0.5;
  }
  
  // Apply trend adjustment
  const trendMultiplier = input.recentTrend === 'improving' ? 1.05 : 
                          input.recentTrend === 'declining' ? 0.93 : 1.0;
  adjustedAccuracy = Math.min(99, adjustedAccuracy * trendMultiplier);
  
  // Calculate predicted score
  const predictedScore = rawToScaledScore(adjustedAccuracy);
  
  // Calculate variance & confidence
  const variance = calculateVariance(blueprintAreaAccuracy);
  const confidenceInterval = calculateConfidenceInterval(predictedScore, totalQuestionsAnswered, variance);
  
  // Pass probability
  const passProbability = scaledToPassProbability(predictedScore, variance);
  
  // Readiness
  const readinessLevel = getReadinessLevel(passProbability, totalQuestionsAnswered, section);
  
  // Blueprint area predictions
  const blueprintAreaPredictions: ScorePrediction['blueprintAreaPredictions'] = {};
  const weights = SECTION_BLUEPRINT_WEIGHTS[section];
  
  Object.entries(weights).forEach(([area, weight]) => {
    const accuracy = blueprintAreaAccuracy[area] || 0;
    blueprintAreaPredictions[area] = {
      predictedScore: rawToScaledScore(accuracy),
      contribution: Math.round((accuracy * weight) / 100),
      status: getBlueprintAreaStatus(accuracy),
      weight,
    };
  });
  
  // Recommendations
  const recommendations = generateRecommendations(
    section,
    blueprintAreaPredictions,
    passProbability,
    totalQuestionsAnswered,
    averageTimePerQuestion,
    tbsAccuracy
  );
  
  // Study hours estimate
  const estimatedStudyHoursNeeded = estimateStudyHoursNeeded(
    predictedScore,
    passProbability,
    section
  );
  
  // MCQ and TBS readiness
  const mcqReadiness = Math.round(rawMcqAccuracy);
  const tbsReadiness = tbsAccuracy !== undefined ? Math.round(tbsAccuracy) : 0;
  
  return {
    section,
    sectionName: SECTION_NAMES[section],
    predictedScore,
    confidenceInterval,
    passProbability,
    readinessLevel,
    blueprintAreaPredictions,
    recommendations,
    estimatedStudyHoursNeeded,
    mcqReadiness,
    tbsReadiness,
  };
}

/**
 * Predict scores for all active sections (Core + chosen discipline)
 */
export function predictAllSectionsScores(): AllSectionsScorePrediction {
  const activeSections = getActiveSections();
  const sectionPredictions: Record<CPASectionId, ScorePrediction> = {} as Record<CPASectionId, ScorePrediction>;
  let allRecommendations: string[] = [];
  let totalStudyHours = 0;
  
  const summary = getPerformanceSummary();
  
  activeSections.forEach(section => {
    const sectionData = summary.sectionBreakdown.find(s => s.section === section);
    const blueprintPerf = getSectionBlueprintPerformance(section);
    
    // Build blueprint area accuracy from performance
    const blueprintAreaAccuracy: Record<string, number> = {};
    Object.entries(blueprintPerf).forEach(([area, perf]) => {
      blueprintAreaAccuracy[area] = perf.accuracy;
    });
    
    const isWeak = summary.weakSections.includes(section);
    const isStrong = summary.strongSections.includes(section);
    
    const prediction = predictScore({
      section,
      blueprintAreaAccuracy,
      totalQuestionsAnswered: sectionData?.questionsAttempted || 0,
      averageTimePerQuestion: 90,
      recentTrend: isStrong ? 'improving' : isWeak ? 'declining' : 'stable',
      mockExamScores: [],
    });
    
    sectionPredictions[section] = prediction;
    allRecommendations = allRecommendations.concat(prediction.recommendations);
    totalStudyHours += prediction.estimatedStudyHoursNeeded;
  });
  
  // Overall pass probability (must pass all 4 sections)
  let overallPassProbability = 100;
  activeSections.forEach(section => {
    overallPassProbability *= (sectionPredictions[section].passProbability / 100);
  });
  overallPassProbability = Math.round(overallPassProbability * 100);
  
  // Overall readiness (worst section determines overall)
  const readinessLevels = activeSections.map(s => sectionPredictions[s].readinessLevel);
  let overallReadiness: AllSectionsScorePrediction['overallReadiness'] = 'confident';
  
  if (readinessLevels.includes('not-ready')) {
    overallReadiness = 'not-ready';
  } else if (readinessLevels.includes('at-risk')) {
    overallReadiness = 'at-risk';
  } else if (readinessLevels.includes('borderline')) {
    overallReadiness = 'borderline';
  } else if (readinessLevels.includes('likely')) {
    overallReadiness = 'likely';
  }
  
  // Order recommendations by section priority (FAR first as it's hardest)
  const sectionOrder: CPASectionId[] = ['FAR', 'REG', 'AUD', 'BAR', 'ISC', 'TCP'];
  const orderedRecommendations: string[] = [];
  sectionOrder.forEach(section => {
    if (sectionPredictions[section]) {
      orderedRecommendations.push(...sectionPredictions[section].recommendations.slice(0, 1));
    }
  });
  
  return {
    sections: sectionPredictions,
    activeSections,
    overallReadiness,
    overallPassProbability,
    recommendations: [...new Set(orderedRecommendations)].slice(0, 5),
    estimatedTotalStudyHours: totalStudyHours,
  };
}

/**
 * Get quick prediction summary for UI dashboard
 */
export function getQuickPrediction(section: CPASectionId): {
  score: number;
  probability: number;
  readiness: string;
  color: string;
} {
  const summary = getPerformanceSummary();
  const sectionData = summary.sectionBreakdown.find(s => s.section === section);
  
  if (!sectionData || sectionData.questionsAttempted < 20) {
    return { 
      score: 0, 
      probability: 0, 
      readiness: 'Not enough data',
      color: 'gray'
    };
  }
  
  const scaledScore = rawToScaledScore(sectionData.accuracy);
  const probability = scaledToPassProbability(scaledScore, 10);
  
  let readiness: string;
  let color: string;
  
  if (scaledScore >= 82) {
    readiness = 'Ready';
    color = 'green';
  } else if (scaledScore >= 75) {
    readiness = 'Almost Ready';
    color = 'lime';
  } else if (scaledScore >= 68) {
    readiness = 'Getting Close';
    color = 'yellow';
  } else if (scaledScore >= 60) {
    readiness = 'Keep Studying';
    color = 'orange';
  } else {
    readiness = 'More Practice Needed';
    color = 'red';
  }
  
  return { score: scaledScore, probability, readiness, color };
}

/**
 * Get section-by-section readiness overview for dashboard
 */
export function getSectionReadinessOverview(): {
  section: CPASectionId;
  name: string;
  score: number;
  probability: number;
  status: string;
  isCore: boolean;
}[] {
  const activeSections = getActiveSections();
  const results: {
    section: CPASectionId;
    name: string;
    score: number;
    probability: number;
    status: string;
    isCore: boolean;
  }[] = [];
  
  activeSections.forEach(section => {
    const prediction = getQuickPrediction(section);
    results.push({
      section,
      name: SECTION_NAMES[section],
      score: prediction.score,
      probability: prediction.probability,
      status: prediction.readiness,
      isCore: CPA_CORE_SECTIONS.includes(section),
    });
  });
  
  return results;
}

/**
 * Get estimated exam date based on current readiness
 */
export function getEstimatedExamReadyDate(
  section: CPASectionId,
  studyHoursPerWeek: number = 15
): Date {
  const prediction = getQuickPrediction(section);
  
  if (prediction.probability >= 80) {
    // Ready now - suggest 2 weeks for final review
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date;
  }
  
  const summary = getPerformanceSummary();
  const sectionData = summary.sectionBreakdown.find(s => s.section === section);
  
  // Estimate hours needed
  const hoursNeeded = estimateStudyHoursNeeded(
    prediction.score,
    prediction.probability,
    section
  );
  
  // Consider current progress
  const progressBonus = sectionData?.questionsAttempted ? 
    Math.min(20, sectionData.questionsAttempted / 10) : 0;
  
  const adjustedHours = Math.max(10, hoursNeeded - progressBonus);
  const weeksNeeded = Math.ceil(adjustedHours / studyHoursPerWeek);
  
  const date = new Date();
  date.setDate(date.getDate() + (weeksNeeded * 7));
  return date;
}

export { SECTION_NAMES };
