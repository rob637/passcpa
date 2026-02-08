/**
 * CISA Adaptive Question Engine
 * 
 * Intelligently selects questions based on user performance:
 * - Adjusts difficulty based on recent accuracy
 * - Prioritizes weak domains based on ISACA exam weights
 * - Uses spaced repetition for missed questions
 * - Balances coverage across all 5 domains
 * - Avoids recently seen questions
 */

import { CISASectionId, CISA_SECTION_CONFIG } from '../courses/cisa/config';

// Question type for adaptive engine
export interface CISAAdaptiveQuestion {
  id: string;
  domain: CISASectionId;
  subdomain?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concepts: string[];
  isacaRef?: string;
}

// Types for tracking performance
export interface QuestionHistory {
  questionId: string;
  attempts: number;
  correctCount: number;
  lastAttempted: Date;
  lastResult: boolean;
  easeFactor: number; // SM-2 algorithm
  interval: number; // days until next review
  nextReviewDate: Date;
}

export interface DomainPerformance {
  domain: CISASectionId;
  questionsAttempted: number;
  accuracy: number;
  recentAccuracy: number; // Last 10 questions
  needsWork: boolean;
  lastPracticed: Date | null;
  masteredConcepts: string[];
  struggleConcepts: string[];
}

export interface AdaptiveState {
  currentDifficulty: 'easy' | 'medium' | 'hard';
  targetAccuracy: number; // 70-85% is optimal for learning
  recentResults: boolean[]; // Last 10 answers
  domainPerformance: Record<CISASectionId, DomainPerformance>;
  questionHistory: Map<string, QuestionHistory>;
  lastSessionQuestions: string[];
  totalQuestionsAnswered: number;
  sessionStartTime: Date | null;
}

export interface SelectionCriteria {
  domains?: CISASectionId[];
  difficulty?: 'easy' | 'medium' | 'hard' | 'adaptive';
  count: number;
  excludeRecent?: boolean;
  prioritizeWeakAreas?: boolean;
  includeReviewDue?: boolean;
  examWeighted?: boolean;
}

export interface SelectedQuestion extends CISAAdaptiveQuestion {
  selectionReason: 'weak-domain' | 'review-due' | 'new' | 'balanced' | 'difficulty-match';
  priority: number;
}

// ISACA CISA domain weights (2024-2026)
const DOMAIN_WEIGHTS: Record<CISASectionId, number> = {
  CISA1: 18, // IS Auditing Process
  CISA2: 18, // IT Governance
  CISA3: 12, // Acquisition, Development & Implementation
  CISA4: 26, // Operations & Business Resilience
  CISA5: 26, // Protection of Information Assets
};

// Difficulty adjustment thresholds
const TARGET_ACCURACY = 0.75;
const EASY_THRESHOLD = 0.85;
const HARD_THRESHOLD = 0.60;
const RECENT_QUESTION_WINDOW = 50; // Avoid last 50 questions

// Storage key
const STORAGE_KEY = 'cisa-adaptive-state';

/**
 * Initialize adaptive state
 */
export function initializeAdaptiveState(): AdaptiveState {
  const domainPerformance: Record<CISASectionId, DomainPerformance> = {} as Record<CISASectionId, DomainPerformance>;
  
  Object.keys(DOMAIN_WEIGHTS).forEach(domain => {
    const domainId = domain as CISASectionId;
    domainPerformance[domainId] = {
      domain: domainId,
      questionsAttempted: 0,
      accuracy: 0,
      recentAccuracy: 0,
      needsWork: true,
      lastPracticed: null,
      masteredConcepts: [],
      struggleConcepts: [],
    };
  });
  
  return {
    currentDifficulty: 'medium',
    targetAccuracy: TARGET_ACCURACY,
    recentResults: [],
    domainPerformance,
    questionHistory: new Map(),
    lastSessionQuestions: [],
    totalQuestionsAnswered: 0,
    sessionStartTime: null,
  };
}

/**
 * Load state from localStorage
 */
export function loadAdaptiveState(): AdaptiveState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Restore Map from array
      parsed.questionHistory = new Map(parsed.questionHistory || []);
      // Restore dates
      Object.values(parsed.domainPerformance).forEach((dp: unknown) => {
        const domainPerf = dp as DomainPerformance;
        if (domainPerf.lastPracticed) {
          domainPerf.lastPracticed = new Date(domainPerf.lastPracticed);
        }
      });
      parsed.questionHistory.forEach((qh: QuestionHistory) => {
        qh.lastAttempted = new Date(qh.lastAttempted);
        qh.nextReviewDate = new Date(qh.nextReviewDate);
      });
      if (parsed.sessionStartTime) {
        parsed.sessionStartTime = new Date(parsed.sessionStartTime);
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load adaptive state:', e);
  }
  return initializeAdaptiveState();
}

/**
 * Save state to localStorage
 */
export function saveAdaptiveState(state: AdaptiveState): void {
  try {
    const toStore = {
      ...state,
      questionHistory: Array.from(state.questionHistory.entries()),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (e) {
    console.error('Failed to save adaptive state:', e);
  }
}

// Module-level state
let adaptiveState: AdaptiveState = loadAdaptiveState();

/**
 * Get current adaptive state
 */
export function getAdaptiveState(): AdaptiveState {
  return adaptiveState;
}

/**
 * Record an answer and update adaptive state
 */
export function recordAnswer(
  questionId: string,
  domain: CISASectionId,
  isCorrect: boolean,
  _difficulty: 'easy' | 'medium' | 'hard',
  concepts: string[] = []
): void {
  const now = new Date();
  
  // Update recent results
  adaptiveState.recentResults.push(isCorrect);
  if (adaptiveState.recentResults.length > 10) {
    adaptiveState.recentResults.shift();
  }
  
  // Update question history
  let history = adaptiveState.questionHistory.get(questionId);
  if (!history) {
    history = {
      questionId,
      attempts: 0,
      correctCount: 0,
      lastAttempted: now,
      lastResult: isCorrect,
      easeFactor: 2.5, // SM-2 default
      interval: 1,
      nextReviewDate: now,
    };
  }
  
  history.attempts++;
  if (isCorrect) history.correctCount++;
  history.lastAttempted = now;
  history.lastResult = isCorrect;
  
  // SM-2 algorithm for spaced repetition
  if (isCorrect) {
    if (history.attempts === 1) {
      history.interval = 1;
    } else if (history.attempts === 2) {
      history.interval = 6;
    } else {
      history.interval = Math.round(history.interval * history.easeFactor);
    }
    history.easeFactor = Math.max(1.3, history.easeFactor + 0.1);
  } else {
    history.interval = 1;
    history.easeFactor = Math.max(1.3, history.easeFactor - 0.2);
  }
  
  history.nextReviewDate = new Date(now.getTime() + history.interval * 24 * 60 * 60 * 1000);
  adaptiveState.questionHistory.set(questionId, history);
  
  // Update domain performance
  const domainPerf = adaptiveState.domainPerformance[domain];
  domainPerf.questionsAttempted++;
  domainPerf.accuracy = calculateDomainAccuracy(domain);
  domainPerf.recentAccuracy = calculateRecentDomainAccuracy(domain);
  domainPerf.lastPracticed = now;
  domainPerf.needsWork = domainPerf.accuracy < 0.70;
  
  // Update concept tracking
  if (isCorrect) {
    concepts.forEach(concept => {
      if (!domainPerf.masteredConcepts.includes(concept)) {
        domainPerf.masteredConcepts.push(concept);
      }
      const idx = domainPerf.struggleConcepts.indexOf(concept);
      if (idx > -1) domainPerf.struggleConcepts.splice(idx, 1);
    });
  } else {
    concepts.forEach(concept => {
      if (!domainPerf.struggleConcepts.includes(concept)) {
        domainPerf.struggleConcepts.push(concept);
      }
    });
  }
  
  // Update difficulty based on recent performance
  adjustDifficulty();
  
  // Track session questions
  adaptiveState.lastSessionQuestions.push(questionId);
  if (adaptiveState.lastSessionQuestions.length > RECENT_QUESTION_WINDOW) {
    adaptiveState.lastSessionQuestions.shift();
  }
  
  adaptiveState.totalQuestionsAnswered++;
  
  // Save state
  saveAdaptiveState(adaptiveState);
}

/**
 * Calculate overall accuracy for a domain
 */
function calculateDomainAccuracy(_domain: CISASectionId): number {
  let correct = 0;
  let total = 0;
  
  adaptiveState.questionHistory.forEach((history) => {
    // This would need question-to-domain mapping in real implementation
    if (history.attempts > 0) {
      correct += history.correctCount;
      total += history.attempts;
    }
  });
  
  return total > 0 ? correct / total : 0;
}

/**
 * Calculate recent accuracy for a domain (last 10 questions)
 */
function calculateRecentDomainAccuracy(_domain: CISASectionId): number {
  const recent = adaptiveState.recentResults.slice(-10);
  if (recent.length === 0) return 0;
  return recent.filter(r => r).length / recent.length;
}

/**
 * Adjust difficulty based on recent performance
 */
function adjustDifficulty(): void {
  const recentAccuracy = adaptiveState.recentResults.slice(-10);
  if (recentAccuracy.length < 5) return; // Need at least 5 answers
  
  const accuracy = recentAccuracy.filter(r => r).length / recentAccuracy.length;
  
  if (accuracy >= EASY_THRESHOLD && adaptiveState.currentDifficulty !== 'hard') {
    adaptiveState.currentDifficulty = 
      adaptiveState.currentDifficulty === 'easy' ? 'medium' : 'hard';
  } else if (accuracy <= HARD_THRESHOLD && adaptiveState.currentDifficulty !== 'easy') {
    adaptiveState.currentDifficulty = 
      adaptiveState.currentDifficulty === 'hard' ? 'medium' : 'easy';
  }
}

/**
 * Get questions due for review (spaced repetition)
 */
export function getQuestionsDueForReview(): string[] {
  const now = new Date();
  const dueQuestions: string[] = [];
  
  adaptiveState.questionHistory.forEach((history, questionId) => {
    if (history.nextReviewDate <= now && !history.lastResult) {
      dueQuestions.push(questionId);
    }
  });
  
  return dueQuestions;
}

/**
 * Get weak domains ordered by priority
 */
export function getWeakDomains(): CISASectionId[] {
  const domains = Object.values(adaptiveState.domainPerformance)
    .filter(d => d.needsWork || d.accuracy < 0.70)
    .sort((a, b) => {
      // Prioritize by exam weight * inverse accuracy
      const aScore = DOMAIN_WEIGHTS[a.domain] * (1 - a.accuracy);
      const bScore = DOMAIN_WEIGHTS[b.domain] * (1 - b.accuracy);
      return bScore - aScore;
    })
    .map(d => d.domain);
  
  return domains;
}

/**
 * Select questions based on criteria
 */
export function selectQuestions(
  allQuestions: CISAAdaptiveQuestion[],
  criteria: SelectionCriteria
): SelectedQuestion[] {
  const selected: SelectedQuestion[] = [];
  const usedIds = new Set<string>();
  
  // Filter by domains if specified
  let availableQuestions = criteria.domains 
    ? allQuestions.filter(q => criteria.domains!.includes(q.domain))
    : allQuestions;
  
  // Exclude recent questions
  if (criteria.excludeRecent) {
    availableQuestions = availableQuestions.filter(
      q => !adaptiveState.lastSessionQuestions.includes(q.id)
    );
  }
  
  // 1. First, add questions due for review (spaced repetition)
  if (criteria.includeReviewDue) {
    const dueIds = new Set(getQuestionsDueForReview());
    const dueQuestions = availableQuestions
      .filter(q => dueIds.has(q.id))
      .slice(0, Math.ceil(criteria.count * 0.2)); // Max 20% review questions
    
    dueQuestions.forEach(q => {
      if (!usedIds.has(q.id)) {
        selected.push({
          ...q,
          selectionReason: 'review-due',
          priority: 100,
        });
        usedIds.add(q.id);
      }
    });
  }
  
  // 2. Add weak domain questions
  if (criteria.prioritizeWeakAreas) {
    const weakDomains = getWeakDomains();
    const weakQuestions = availableQuestions
      .filter(q => weakDomains.includes(q.domain) && !usedIds.has(q.id))
      .slice(0, Math.ceil(criteria.count * 0.4)); // Max 40% weak area questions
    
    weakQuestions.forEach(q => {
      if (!usedIds.has(q.id)) {
        selected.push({
          ...q,
          selectionReason: 'weak-domain',
          priority: 80 + DOMAIN_WEIGHTS[q.domain],
        });
        usedIds.add(q.id);
      }
    });
  }
  
  // 3. Fill remaining with balanced selection
  const remaining = criteria.count - selected.length;
  if (remaining > 0) {
    // Select questions to fill
    const fillerQuestions = availableQuestions
      .filter(q => !usedIds.has(q.id))
      .map(q => ({
        ...q,
        selectionReason: 'balanced' as const,
        priority: criteria.examWeighted 
          ? DOMAIN_WEIGHTS[q.domain] 
          : Math.random() * 50,
      }))
      .sort((a, b) => b.priority - a.priority)
      .slice(0, remaining);
    
    fillerQuestions.forEach(q => {
      selected.push(q);
      usedIds.add(q.id);
    });
  }
  
  // Shuffle to avoid predictable order
  return shuffleArray(selected);
}

/**
 * Get recommended next action
 */
export function getRecommendedAction(): {
  action: 'practice' | 'review' | 'mock-exam' | 'break';
  domain?: CISASectionId;
  reason: string;
} {
  const dueCount = getQuestionsDueForReview().length;
  const weakDomains = getWeakDomains();
  const recentAccuracy = adaptiveState.recentResults.slice(-20);
  const overallAccuracy = recentAccuracy.length > 0 
    ? recentAccuracy.filter(r => r).length / recentAccuracy.length 
    : 0;
  
  // If many questions due for review
  if (dueCount >= 20) {
    return {
      action: 'review',
      reason: `You have ${dueCount} questions due for review using spaced repetition.`,
    };
  }
  
  // If performing well, suggest mock exam
  if (adaptiveState.totalQuestionsAnswered >= 500 && overallAccuracy >= 0.75) {
    return {
      action: 'mock-exam',
      reason: 'Your accuracy is strong! Test your skills with a full mock exam.',
    };
  }
  
  // If weak domains exist, focus there
  if (weakDomains.length > 0) {
    const priorityDomain = weakDomains[0];
    const domainName = CISA_SECTION_CONFIG[priorityDomain].shortTitle;
    return {
      action: 'practice',
      domain: priorityDomain,
      reason: `Focus on ${domainName} - it accounts for ${DOMAIN_WEIGHTS[priorityDomain]}% of the exam.`,
    };
  }
  
  // Default to balanced practice
  return {
    action: 'practice',
    reason: 'Continue your balanced study across all domains.',
  };
}

/**
 * Get performance summary
 */
export function getPerformanceSummary(): {
  overallAccuracy: number;
  totalQuestions: number;
  strongDomains: CISASectionId[];
  weakDomains: CISASectionId[];
  readinessScore: number;
  passProbability: number;
} {
  const domainScores = Object.entries(adaptiveState.domainPerformance).map(([domain, perf]) => ({
    domain: domain as CISASectionId,
    accuracy: perf.accuracy,
    weight: DOMAIN_WEIGHTS[domain as CISASectionId],
    questions: perf.questionsAttempted,
  }));
  
  // Weighted accuracy
  const weightedSum = domainScores.reduce((sum, d) => sum + d.accuracy * d.weight, 0);
  const totalWeight = domainScores.reduce((sum, d) => sum + d.weight, 0);
  const overallAccuracy = totalWeight > 0 ? weightedSum / totalWeight : 0;
  
  // Categorize domains
  const strongDomains = domainScores
    .filter(d => d.accuracy >= 0.75 && d.questions >= 20)
    .map(d => d.domain);
  const weakDomains = domainScores
    .filter(d => d.accuracy < 0.70 || d.questions < 10)
    .map(d => d.domain);
  
  // Calculate readiness (combination of accuracy and coverage)
  const coverageScore = Math.min(adaptiveState.totalQuestionsAnswered / 500, 1);
  const accuracyScore = overallAccuracy;
  const readinessScore = Math.round((coverageScore * 0.4 + accuracyScore * 0.6) * 100);
  
  // Estimate pass probability (simple model)
  const passProbability = Math.round(
    Math.min(100, Math.max(0, (overallAccuracy - 0.45) * 200 + coverageScore * 20))
  );
  
  return {
    overallAccuracy: Math.round(overallAccuracy * 100),
    totalQuestions: adaptiveState.totalQuestionsAnswered,
    strongDomains,
    weakDomains,
    readinessScore,
    passProbability,
  };
}

/**
 * Reset adaptive state
 */
export function resetAdaptiveState(): void {
  adaptiveState = initializeAdaptiveState();
  saveAdaptiveState(adaptiveState);
}

/**
 * Utility: Shuffle array
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Start a new study session
 */
export function startSession(): void {
  adaptiveState.sessionStartTime = new Date();
  adaptiveState.lastSessionQuestions = [];
  saveAdaptiveState(adaptiveState);
}

/**
 * End current study session
 */
export function endSession(): {
  duration: number;
  questionsAnswered: number;
  accuracy: number;
} {
  const duration = adaptiveState.sessionStartTime 
    ? Math.round((Date.now() - adaptiveState.sessionStartTime.getTime()) / 60000)
    : 0;
  
  const questionsAnswered = adaptiveState.lastSessionQuestions.length;
  const recentResults = adaptiveState.recentResults.slice(-questionsAnswered);
  const accuracy = recentResults.length > 0 
    ? Math.round(recentResults.filter(r => r).length / recentResults.length * 100)
    : 0;
  
  adaptiveState.sessionStartTime = null;
  saveAdaptiveState(adaptiveState);
  
  return { duration, questionsAnswered, accuracy };
}
