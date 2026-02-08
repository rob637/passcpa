/**
 * CFP Adaptive Question Engine
 * 
 * Intelligently selects questions based on user performance:
 * - Adjusts difficulty based on recent accuracy
 * - Prioritizes weak domains based on exam weight
 * - Uses spaced repetition for missed questions
 * - Balances coverage across all domains
 * - Avoids recently seen questions
 */

// Question type for adaptive engine - works with CFP-style questions
export interface AdaptiveQuestion {
  id: string;
  courseId?: string;
  domain?: string;
  section?: string;
  difficulty?: string;
  question: string;
  options: string[] | { id: string; text: string }[];
  correctAnswer?: number;
  correctOptionId?: string;
  explanation: string;
}

// Types
export interface QuestionHistory {
  questionId: string;
  attempts: number;
  correctCount: number;
  lastAttempted: Date;
  lastResult: boolean;
  easeFactor: number; // SM-2 inspired
  interval: number; // days until next review
  nextReviewDate: Date;
}

export interface DomainPerformance {
  domain: string;
  questionsAttempted: number;
  accuracy: number;
  recentAccuracy: number; // Last 10 questions
  needsWork: boolean;
  lastPracticed: Date | null;
}

export interface AdaptiveState {
  currentDifficulty: 'easy' | 'medium' | 'hard';
  targetAccuracy: number; // 70-85% is optimal for learning
  recentResults: boolean[]; // Last 10 answers
  domainPerformance: Record<string, DomainPerformance>;
  questionHistory: Map<string, QuestionHistory>;
  lastSessionQuestions: string[];
}

export interface SelectionCriteria {
  domains?: string[];
  difficulty?: 'easy' | 'medium' | 'hard' | 'adaptive';
  count: number;
  excludeRecent?: boolean;
  prioritizeWeakAreas?: boolean;
  includeReviewDue?: boolean;
  examWeighted?: boolean;
}

export interface SelectedQuestion extends AdaptiveQuestion {
  selectionReason: 'weak-domain' | 'review-due' | 'new' | 'balanced' | 'difficulty-match';
  priority: number;
}

// Exam domain weights
const DOMAIN_WEIGHTS: Record<string, number> = {
  'RET': 19,
  'GEN': 18,
  'PRO': 15,
  'TAX': 14,
  'EST': 12,
  'RISK': 12,
  'INV': 11,
};

// Difficulty adjustment thresholds
const TARGET_ACCURACY = 0.75; // 75% target accuracy
const EASY_THRESHOLD = 0.85; // Above this, increase difficulty
const HARD_THRESHOLD = 0.60; // Below this, decrease difficulty

/**
 * Initialize adaptive state
 */
export function initializeAdaptiveState(): AdaptiveState {
  const domainPerformance: Record<string, DomainPerformance> = {};
  
  Object.keys(DOMAIN_WEIGHTS).forEach(domain => {
    domainPerformance[domain] = {
      domain,
      questionsAttempted: 0,
      accuracy: 0,
      recentAccuracy: 0,
      needsWork: true,
      lastPracticed: null,
    };
  });
  
  return {
    currentDifficulty: 'medium',
    targetAccuracy: TARGET_ACCURACY,
    recentResults: [],
    domainPerformance,
    questionHistory: new Map(),
    lastSessionQuestions: [],
  };
}

/**
 * Record a question result and update adaptive state
 */
export function recordResult(
  state: AdaptiveState,
  questionId: string,
  domain: string,
  isCorrect: boolean
): AdaptiveState {
  const newState = { ...state };
  
  // Update recent results
  newState.recentResults = [...state.recentResults, isCorrect].slice(-10);
  
  // Update question history
  const history = state.questionHistory.get(questionId);
  const now = new Date();
  
  if (history) {
    const newHistory = updateQuestionHistory(history, isCorrect);
    newState.questionHistory = new Map(state.questionHistory);
    newState.questionHistory.set(questionId, newHistory);
  } else {
    const newHistory = createQuestionHistory(questionId, isCorrect);
    newState.questionHistory = new Map(state.questionHistory);
    newState.questionHistory.set(questionId, newHistory);
  }
  
  // Update domain performance
  const domainStats = { ...state.domainPerformance[domain] };
  if (domainStats) {
    domainStats.questionsAttempted++;
    // Update accuracy using running average
    const correctBefore = Math.round(domainStats.accuracy * (domainStats.questionsAttempted - 1) / 100);
    const correctNow = correctBefore + (isCorrect ? 1 : 0);
    domainStats.accuracy = Math.round((correctNow / domainStats.questionsAttempted) * 100);
    domainStats.lastPracticed = now;
    
    // Calculate recent accuracy for this domain
    domainStats.recentAccuracy = calculateRecentDomainAccuracy(newState.questionHistory, domain);
    domainStats.needsWork = domainStats.accuracy < 70;
    
    newState.domainPerformance = {
      ...state.domainPerformance,
      [domain]: domainStats,
    };
  }
  
  // Adjust difficulty
  newState.currentDifficulty = adjustDifficulty(newState.recentResults, state.currentDifficulty);
  
  // Track last session questions
  newState.lastSessionQuestions = [...state.lastSessionQuestions, questionId].slice(-50);
  
  return newState;
}

/**
 * Create initial history for a new question
 */
function createQuestionHistory(questionId: string, isCorrect: boolean): QuestionHistory {
  const now = new Date();
  const interval = isCorrect ? 1 : 0.1;
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + Math.ceil(interval));
  
  return {
    questionId,
    attempts: 1,
    correctCount: isCorrect ? 1 : 0,
    lastAttempted: now,
    lastResult: isCorrect,
    easeFactor: isCorrect ? 2.5 : 1.3,
    interval,
    nextReviewDate: nextReview,
  };
}

/**
 * Update question history using SM-2 inspired algorithm
 */
function updateQuestionHistory(history: QuestionHistory, isCorrect: boolean): QuestionHistory {
  const now = new Date();
  let newEaseFactor = history.easeFactor;
  let newInterval = history.interval;
  
  if (isCorrect) {
    // Increase interval
    if (history.attempts === 1) {
      newInterval = 1;
    } else if (history.attempts === 2) {
      newInterval = 6;
    } else {
      newInterval = Math.round(history.interval * newEaseFactor);
    }
    
    // Adjust ease factor (min 1.3)
    newEaseFactor = Math.max(1.3, newEaseFactor + 0.1);
  } else {
    // Reset interval, decrease ease factor
    newInterval = 0.1;
    newEaseFactor = Math.max(1.3, newEaseFactor - 0.2);
  }
  
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + Math.ceil(newInterval));
  
  return {
    ...history,
    attempts: history.attempts + 1,
    correctCount: history.correctCount + (isCorrect ? 1 : 0),
    lastAttempted: now,
    lastResult: isCorrect,
    easeFactor: newEaseFactor,
    interval: newInterval,
    nextReviewDate: nextReview,
  };
}

/**
 * Calculate recent accuracy for a domain
 */
function calculateRecentDomainAccuracy(
  history: Map<string, QuestionHistory>,
  domain: string
): number {
  const domainHistory = Array.from(history.values())
    .filter(h => h.questionId.includes(domain))
    .sort((a, b) => b.lastAttempted.getTime() - a.lastAttempted.getTime())
    .slice(0, 10);
  
  if (domainHistory.length === 0) return 0;
  
  const correct = domainHistory.filter(h => h.lastResult).length;
  return Math.round((correct / domainHistory.length) * 100);
}

/**
 * Adjust difficulty based on recent performance
 */
function adjustDifficulty(
  recentResults: boolean[],
  currentDifficulty: 'easy' | 'medium' | 'hard'
): 'easy' | 'medium' | 'hard' {
  if (recentResults.length < 5) return currentDifficulty;
  
  const recentAccuracy = recentResults.filter(r => r).length / recentResults.length;
  
  if (recentAccuracy >= EASY_THRESHOLD && currentDifficulty !== 'hard') {
    // Doing too well, increase difficulty
    return currentDifficulty === 'easy' ? 'medium' : 'hard';
  }
  
  if (recentAccuracy < HARD_THRESHOLD && currentDifficulty !== 'easy') {
    // Struggling, decrease difficulty
    return currentDifficulty === 'hard' ? 'medium' : 'easy';
  }
  
  return currentDifficulty;
}

/**
 * Select questions adaptively based on state and criteria
 */
export function selectQuestions(
  allQuestions: AdaptiveQuestion[],
  state: AdaptiveState,
  criteria: SelectionCriteria
): SelectedQuestion[] {
  const now = new Date();
  const selected: SelectedQuestion[] = [];
  const usedIds = new Set<string>();
  
  // Helper to get domain from question ID or section
  const getDomain = (q: AdaptiveQuestion): string => {
    return q.domain || q.section || q.id.split('-')[1] || 'GEN';
  };
  
  // Filter questions by criteria domains
  let candidateQuestions = criteria.domains
    ? allQuestions.filter(q => criteria.domains!.includes(getDomain(q)))
    : allQuestions;
  
  // Exclude recently seen questions if requested
  if (criteria.excludeRecent) {
    candidateQuestions = candidateQuestions.filter(q => !state.lastSessionQuestions.includes(q.id));
  }
  
  // 1. First, add questions due for review (spaced repetition)
  if (criteria.includeReviewDue) {
    const reviewDue = candidateQuestions.filter(q => {
      const history = state.questionHistory.get(q.id);
      if (!history) return false;
      return history.nextReviewDate <= now && !history.lastResult;
    });
    
    // Sort by priority (missed questions first, then by next review date)
    reviewDue.sort((a, b) => {
      const histA = state.questionHistory.get(a.id)!;
      const histB = state.questionHistory.get(b.id)!;
      return histA.nextReviewDate.getTime() - histB.nextReviewDate.getTime();
    });
    
    for (const q of reviewDue.slice(0, Math.ceil(criteria.count * 0.3))) {
      if (!usedIds.has(q.id)) {
        selected.push({
          ...q,
          selectionReason: 'review-due',
          priority: 1,
        });
        usedIds.add(q.id);
      }
    }
  }
  
  // 2. Add questions from weak domains
  if (criteria.prioritizeWeakAreas) {
    const weakDomains = Object.values(state.domainPerformance)
      .filter(d => d.needsWork)
      .sort((a, b) => {
        // Prioritize by: low accuracy + high exam weight
        const aWeight = DOMAIN_WEIGHTS[a.domain] || 10;
        const bWeight = DOMAIN_WEIGHTS[b.domain] || 10;
        return (b.accuracy - a.accuracy) + (bWeight - aWeight) * 2;
      })
      .map(d => d.domain);
    
    for (const domain of weakDomains) {
      const domainQuestions = candidateQuestions
        .filter(q => getDomain(q) === domain && !usedIds.has(q.id))
        .filter(q => matchesDifficulty(q, state.currentDifficulty, criteria.difficulty));
      
      // Prefer unseen questions
      const unseen = domainQuestions.filter(q => !state.questionHistory.has(q.id));
      const source = unseen.length > 0 ? unseen : domainQuestions;
      
      for (const q of shuffleArray(source).slice(0, 2)) {
        if (selected.length < criteria.count && !usedIds.has(q.id)) {
          selected.push({
            ...q,
            selectionReason: 'weak-domain',
            priority: 2,
          });
          usedIds.add(q.id);
        }
      }
    }
  }
  
  // 3. Fill remaining with balanced/weighted selection
  const remaining = criteria.count - selected.length;
  
  if (remaining > 0 && criteria.examWeighted) {
    // Distribute remaining by exam weight
    const domainAllocation: Record<string, number> = {};
    const totalWeight = Object.values(DOMAIN_WEIGHTS).reduce((a, b) => a + b, 0);
    
    Object.entries(DOMAIN_WEIGHTS).forEach(([domain, weight]) => {
      domainAllocation[domain] = Math.max(1, Math.round((weight / totalWeight) * remaining));
    });
    
    Object.entries(domainAllocation).forEach(([domain, count]) => {
      const domainQuestions = candidateQuestions
        .filter(q => getDomain(q) === domain && !usedIds.has(q.id))
        .filter(q => matchesDifficulty(q, state.currentDifficulty, criteria.difficulty));
      
      for (const q of shuffleArray(domainQuestions).slice(0, count)) {
        if (selected.length < criteria.count && !usedIds.has(q.id)) {
          selected.push({
            ...q,
            selectionReason: 'balanced',
            priority: 3,
          });
          usedIds.add(q.id);
        }
      }
    });
  } else if (remaining > 0) {
    // Simple random selection with difficulty matching
    const pool = candidateQuestions
      .filter(q => !usedIds.has(q.id))
      .filter(q => matchesDifficulty(q, state.currentDifficulty, criteria.difficulty));
    
    for (const q of shuffleArray(pool).slice(0, remaining)) {
      selected.push({
        ...q,
        selectionReason: 'new',
        priority: 4,
      });
      usedIds.add(q.id);
    }
  }
  
  // Sort by priority
  selected.sort((a, b) => a.priority - b.priority);
  
  return selected;
}

/**
 * Check if question matches target difficulty
 */
function matchesDifficulty(
  question: AdaptiveQuestion,
  currentDifficulty: 'easy' | 'medium' | 'hard',
  requestedDifficulty?: 'easy' | 'medium' | 'hard' | 'adaptive'
): boolean {
  const questionDifficulty = question.difficulty || 'medium';
  
  if (!requestedDifficulty || requestedDifficulty === 'adaptive') {
    // Use adaptive difficulty from state
    return questionDifficulty === currentDifficulty;
  }
  
  return questionDifficulty === requestedDifficulty;
}

/**
 * Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Get questions for a targeted practice session
 */
export function getTargetedPractice(
  allQuestions: AdaptiveQuestion[],
  state: AdaptiveState,
  domain: string,
  count: number = 10
): SelectedQuestion[] {
  return selectQuestions(allQuestions, state, {
    domains: [domain],
    difficulty: 'adaptive',
    count,
    excludeRecent: true,
    prioritizeWeakAreas: false,
    includeReviewDue: true,
    examWeighted: false,
  });
}

/**
 * Get questions for an adaptive study session
 */
export function getAdaptiveSession(
  allQuestions: AdaptiveQuestion[],
  state: AdaptiveState,
  count: number = 20
): SelectedQuestion[] {
  return selectQuestions(allQuestions, state, {
    difficulty: 'adaptive',
    count,
    excludeRecent: true,
    prioritizeWeakAreas: true,
    includeReviewDue: true,
    examWeighted: true,
  });
}

/**
 * Get questions for weak area focus
 */
export function getWeakAreaFocus(
  allQuestions: AdaptiveQuestion[],
  state: AdaptiveState,
  count: number = 15
): SelectedQuestion[] {
  // Find weakest domains
  const weakDomains = Object.values(state.domainPerformance)
    .filter(d => d.needsWork || d.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3)
    .map(d => d.domain);
  
  if (weakDomains.length === 0) {
    // No weak areas - use lowest performing
    const lowestDomains = Object.values(state.domainPerformance)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 2)
      .map(d => d.domain);
    
    return selectQuestions(allQuestions, state, {
      domains: lowestDomains,
      difficulty: 'adaptive',
      count,
      excludeRecent: true,
      prioritizeWeakAreas: true,
      includeReviewDue: true,
      examWeighted: false,
    });
  }
  
  return selectQuestions(allQuestions, state, {
    domains: weakDomains,
    difficulty: 'adaptive', // Slightly easier to build confidence
    count,
    excludeRecent: true,
    prioritizeWeakAreas: true,
    includeReviewDue: true,
    examWeighted: false,
  });
}

/**
 * Get recommended next study action
 */
export function getStudyRecommendation(state: AdaptiveState): {
  action: 'review' | 'weak-areas' | 'new-content' | 'mock-exam' | 'maintain';
  domain?: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
} {
  // Check for review due
  const reviewDue = Array.from(state.questionHistory.values())
    .filter(h => h.nextReviewDate <= new Date() && !h.lastResult)
    .length;
  
  if (reviewDue > 10) {
    return {
      action: 'review',
      reason: `You have ${reviewDue} questions due for review. Catch up to maintain retention.`,
      priority: 'high',
    };
  }
  
  // Check for weak domains
  const weakDomains = Object.values(state.domainPerformance)
    .filter(d => d.needsWork && d.questionsAttempted >= 10)
    .sort((a, b) => {
      const aWeight = DOMAIN_WEIGHTS[a.domain] || 10;
      const bWeight = DOMAIN_WEIGHTS[b.domain] || 10;
      return (a.accuracy - b.accuracy) + (aWeight - bWeight) * 2;
    });
  
  if (weakDomains.length > 0) {
    const weakest = weakDomains[0];
    return {
      action: 'weak-areas',
      domain: weakest.domain,
      reason: `Focus on ${weakest.domain} (${weakest.accuracy}% accuracy, ${DOMAIN_WEIGHTS[weakest.domain] || 10}% of exam).`,
      priority: 'high',
    };
  }
  
  // Check for domains with low practice count
  const lowPractice = Object.values(state.domainPerformance)
    .filter(d => d.questionsAttempted < 20)
    .sort((a, b) => a.questionsAttempted - b.questionsAttempted);
  
  if (lowPractice.length > 0) {
    return {
      action: 'new-content',
      domain: lowPractice[0].domain,
      reason: `Practice more in ${lowPractice[0].domain} to build comprehensive coverage.`,
      priority: 'medium',
    };
  }
  
  // Check overall performance
  const totalAttempts = Object.values(state.domainPerformance)
    .reduce((sum, d) => sum + d.questionsAttempted, 0);
  
  if (totalAttempts > 300 && state.recentResults.length >= 10) {
    const recentAccuracy = state.recentResults.filter(r => r).length / state.recentResults.length;
    if (recentAccuracy >= 0.75) {
      return {
        action: 'mock-exam',
        reason: 'Strong recent performance. Take a mock exam to test readiness.',
        priority: 'medium',
      };
    }
  }
  
  return {
    action: 'maintain',
    reason: 'Continue balanced practice across all domains.',
    priority: 'low',
  };
}

export default {
  initializeAdaptiveState,
  recordResult,
  selectQuestions,
  getTargetedPractice,
  getAdaptiveSession,
  getWeakAreaFocus,
  getStudyRecommendation,
};
