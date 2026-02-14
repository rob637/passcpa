/**
 * EA Adaptive Question Engine
 * 
 * Intelligently selects questions based on user performance for the IRS SEE exam:
 * - Adjusts difficulty based on recent accuracy
 * - Prioritizes weak domains based on IRS SEE exam weights
 * - Uses spaced repetition for missed questions
 * - Balances coverage across all 3 parts (SEE1, SEE2, SEE3)
 * - Avoids recently seen questions
 * 
 * Based on IRS SEE Content Outline 2025-2026
 */

import { EASectionId } from '../courses/ea/config';

// Question type for adaptive engine
export interface EAAdaptiveQuestion {
  id: string;
  part: EASectionId;
  domain?: string; // e.g., 'SEE1-1', 'SEE1-2', etc.
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concepts: string[];
  irsRef?: string; // IRS publication reference
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

export interface PartPerformance {
  part: EASectionId;
  questionsAttempted: number;
  accuracy: number;
  recentAccuracy: number; // Last 10 questions
  needsWork: boolean;
  lastPracticed: Date | null;
  masteredConcepts: string[];
  struggleConcepts: string[];
  domainPerformance: Record<string, {
    questionsAttempted: number;
    accuracy: number;
  }>;
}

export interface EAAdaptiveState {
  currentDifficulty: 'easy' | 'medium' | 'hard';
  targetAccuracy: number; // 70-85% is optimal for learning
  recentResults: boolean[]; // Last 10 answers
  partPerformance: Record<EASectionId, PartPerformance>;
  questionHistory: Map<string, QuestionHistory>;
  lastSessionQuestions: string[];
  totalQuestionsAnswered: number;
  sessionStartTime: Date | null;
}

export interface SelectionCriteria {
  parts?: EASectionId[];
  domains?: string[]; // e.g., ['SEE1-1', 'SEE1-2']
  difficulty?: 'easy' | 'medium' | 'hard' | 'adaptive';
  count: number;
  excludeRecent?: boolean;
  prioritizeWeakAreas?: boolean;
  includeReviewDue?: boolean;
  examWeighted?: boolean;
}

export interface SelectedQuestion extends EAAdaptiveQuestion {
  selectionReason: 'weak-domain' | 'review-due' | 'new' | 'balanced' | 'difficulty-match';
  priority: number;
}

// IRS SEE domain weights (2025-2026 Content Outline)
// SEE1: Individuals - 6 domains
const SEE1_DOMAIN_WEIGHTS: Record<string, number> = {
  'SEE1-1': 16.5, // Preliminary Work and Taxpayer Data
  'SEE1-2': 20.0, // Income and Assets
  'SEE1-3': 20.0, // Deductions and Credits
  'SEE1-4': 17.6, // Taxation
  'SEE1-5': 12.9, // Advising the Individual Taxpayer
  'SEE1-6': 12.9, // Specialized Returns
};

// SEE2: Businesses - 3 domains
const SEE2_DOMAIN_WEIGHTS: Record<string, number> = {
  'SEE2-1': 28.2, // Business Entities
  'SEE2-2': 38.8, // Business Financial Information
  'SEE2-3': 32.9, // Specialized Returns for Businesses
};

// SEE3: Representation - 4 domains
const SEE3_DOMAIN_WEIGHTS: Record<string, number> = {
  'SEE3-1': 25.9, // Practices and Procedures
  'SEE3-2': 17.6, // Representation Before IRS (Circular 230)
  'SEE3-3': 23.5, // Specific Areas of Representation
  'SEE3-4': 16.5, // Filing Process
};

const ALL_DOMAIN_WEIGHTS: Record<string, number> = {
  ...SEE1_DOMAIN_WEIGHTS,
  ...SEE2_DOMAIN_WEIGHTS,
  ...SEE3_DOMAIN_WEIGHTS,
};

// Difficulty adjustment thresholds
const TARGET_ACCURACY = 0.75;
const EASY_THRESHOLD = 0.85;
const HARD_THRESHOLD = 0.60;
const RECENT_QUESTION_WINDOW = 50; // Avoid last 50 questions

// Storage key
const STORAGE_KEY = 'ea-adaptive-state';

/**
 * Initialize adaptive state
 */
export function initializeAdaptiveState(): EAAdaptiveState {
  const partPerformance: Record<EASectionId, PartPerformance> = {} as Record<EASectionId, PartPerformance>;
  
  const parts: EASectionId[] = ['SEE1', 'SEE2', 'SEE3'];
  parts.forEach(part => {
    partPerformance[part] = {
      part,
      questionsAttempted: 0,
      accuracy: 0,
      recentAccuracy: 0,
      needsWork: true,
      lastPracticed: null,
      masteredConcepts: [],
      struggleConcepts: [],
      domainPerformance: {},
    };
  });
  
  return {
    currentDifficulty: 'medium',
    targetAccuracy: TARGET_ACCURACY,
    recentResults: [],
    partPerformance,
    questionHistory: new Map(),
    lastSessionQuestions: [],
    totalQuestionsAnswered: 0,
    sessionStartTime: null,
  };
}

/**
 * Load state from localStorage
 */
export function loadAdaptiveState(): EAAdaptiveState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Restore Map from array
      parsed.questionHistory = new Map(parsed.questionHistory || []);
      // Restore dates
      Object.values(parsed.partPerformance).forEach((pp: unknown) => {
        const partPerf = pp as PartPerformance;
        if (partPerf.lastPracticed) {
          partPerf.lastPracticed = new Date(partPerf.lastPracticed);
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
    console.error('Failed to load EA adaptive state:', e);
  }
  return initializeAdaptiveState();
}

/**
 * Save state to localStorage
 */
export function saveAdaptiveState(state: EAAdaptiveState): void {
  try {
    const toStore = {
      ...state,
      questionHistory: Array.from(state.questionHistory.entries()),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (e) {
    console.error('Failed to save EA adaptive state:', e);
  }
}

// Module-level state
let adaptiveState: EAAdaptiveState = loadAdaptiveState();

/**
 * Get current adaptive state
 */
export function getAdaptiveState(): EAAdaptiveState {
  return adaptiveState;
}

/**
 * Reset adaptive state (for testing or user request)
 */
export function resetAdaptiveState(): void {
  adaptiveState = initializeAdaptiveState();
  saveAdaptiveState(adaptiveState);
}

/**
 * Record an answer and update adaptive state
 */
export function recordAnswer(
  questionId: string,
  part: EASectionId,
  domain: string | undefined,
  isCorrect: boolean,
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
  
  // Update part performance
  const partPerf = adaptiveState.partPerformance[part];
  partPerf.questionsAttempted++;
  partPerf.accuracy = calculatePartAccuracy(part);
  partPerf.recentAccuracy = calculateRecentAccuracy();
  partPerf.lastPracticed = now;
  partPerf.needsWork = partPerf.accuracy < 0.70;
  
  // Update domain performance if domain provided
  if (domain) {
    if (!partPerf.domainPerformance[domain]) {
      partPerf.domainPerformance[domain] = { questionsAttempted: 0, accuracy: 0 };
    }
    partPerf.domainPerformance[domain].questionsAttempted++;
    // Simple accuracy tracking per domain
    const domainHistory = Array.from(adaptiveState.questionHistory.values())
      .filter(h => h.questionId.includes(domain));
    const domainCorrect = domainHistory.reduce((sum, h) => sum + h.correctCount, 0);
    const domainTotal = domainHistory.reduce((sum, h) => sum + h.attempts, 0);
    partPerf.domainPerformance[domain].accuracy = domainTotal > 0 ? domainCorrect / domainTotal : 0;
  }
  
  // Update concept tracking
  if (isCorrect) {
    concepts.forEach(concept => {
      if (!partPerf.masteredConcepts.includes(concept)) {
        partPerf.masteredConcepts.push(concept);
      }
      const idx = partPerf.struggleConcepts.indexOf(concept);
      if (idx > -1) partPerf.struggleConcepts.splice(idx, 1);
    });
  } else {
    concepts.forEach(concept => {
      if (!partPerf.struggleConcepts.includes(concept)) {
        partPerf.struggleConcepts.push(concept);
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
 * Calculate overall accuracy for a part
 */
function calculatePartAccuracy(_part: EASectionId): number {
  let correct = 0;
  let total = 0;
  
  adaptiveState.questionHistory.forEach((history) => {
    if (history.attempts > 0) {
      correct += history.correctCount;
      total += history.attempts;
    }
  });
  
  return total > 0 ? correct / total : 0;
}

/**
 * Calculate recent accuracy (last 10 questions)
 */
function calculateRecentAccuracy(): number {
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
 * Get weak parts ordered by priority
 */
export function getWeakParts(): EASectionId[] {
  const parts = Object.values(adaptiveState.partPerformance)
    .filter(p => p.needsWork || p.accuracy < 0.70)
    .sort((a, b) => a.accuracy - b.accuracy) // Lowest accuracy first
    .map(p => p.part);
  
  return parts;
}

/**
 * Get weak domains across all parts
 */
export function getWeakDomains(): string[] {
  const weakDomains: { domain: string; score: number }[] = [];
  
  Object.values(adaptiveState.partPerformance).forEach(partPerf => {
    Object.entries(partPerf.domainPerformance).forEach(([domain, perf]) => {
      if (perf.accuracy < 0.70 && perf.questionsAttempted > 5) {
        const weight = ALL_DOMAIN_WEIGHTS[domain] || 10;
        weakDomains.push({
          domain,
          score: weight * (1 - perf.accuracy), // Higher score = higher priority
        });
      }
    });
  });
  
  return weakDomains
    .sort((a, b) => b.score - a.score)
    .map(d => d.domain);
}

/**
 * Select questions based on criteria
 */
export function selectQuestions(
  allQuestions: EAAdaptiveQuestion[],
  criteria: SelectionCriteria
): SelectedQuestion[] {
  const selected: SelectedQuestion[] = [];
  const usedIds = new Set<string>();
  
  // Filter by parts if specified
  let availableQuestions = criteria.parts 
    ? allQuestions.filter(q => criteria.parts!.includes(q.part))
    : allQuestions;
  
  // Filter by domains if specified
  if (criteria.domains && criteria.domains.length > 0) {
    availableQuestions = availableQuestions.filter(
      q => q.domain && criteria.domains!.includes(q.domain)
    );
  }
  
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
    weakDomains.forEach(domain => {
      if (selected.length >= criteria.count) return;
      
      const domainQuestions = availableQuestions
        .filter(q => q.domain === domain && !usedIds.has(q.id))
        .slice(0, 2); // Max 2 per weak domain
      
      domainQuestions.forEach(q => {
        if (selected.length < criteria.count && !usedIds.has(q.id)) {
          selected.push({
            ...q,
            selectionReason: 'weak-domain',
            priority: 90,
          });
          usedIds.add(q.id);
        }
      });
    });
  }
  
  // 3. Fill remaining with difficulty-matched or balanced questions
  const remaining = criteria.count - selected.length;
  if (remaining > 0) {
    const targetDifficulty = criteria.difficulty === 'adaptive' 
      ? adaptiveState.currentDifficulty 
      : (criteria.difficulty || 'medium');
    
    // Filter by difficulty
    let difficultyFiltered = availableQuestions.filter(
      q => !usedIds.has(q.id) && q.difficulty === targetDifficulty
    );
    
    // If not enough, include adjacent difficulties
    if (difficultyFiltered.length < remaining) {
      difficultyFiltered = availableQuestions.filter(q => !usedIds.has(q.id));
    }
    
    // If exam weighted, distribute by part weights (33% each for EA)
    if (criteria.examWeighted) {
      const targetPerPart = Math.ceil(remaining / 3);
      const parts: EASectionId[] = ['SEE1', 'SEE2', 'SEE3'];
      
      parts.forEach(part => {
        const partQuestions = difficultyFiltered
          .filter(q => q.part === part && !usedIds.has(q.id))
          .slice(0, targetPerPart);
        
        partQuestions.forEach(q => {
          if (selected.length < criteria.count) {
            selected.push({
              ...q,
              selectionReason: 'balanced',
              priority: 50,
            });
            usedIds.add(q.id);
          }
        });
      });
    }
    
    // Fill any remaining slots
    const stillRemaining = criteria.count - selected.length;
    if (stillRemaining > 0) {
      const fillQuestions = difficultyFiltered
        .filter(q => !usedIds.has(q.id))
        .slice(0, stillRemaining);
      
      fillQuestions.forEach(q => {
        selected.push({
          ...q,
          selectionReason: 'difficulty-match',
          priority: 30,
        });
        usedIds.add(q.id);
      });
    }
  }
  
  // Sort by priority (highest first) then shuffle within same priority
  selected.sort((a, b) => b.priority - a.priority);
  
  return selected;
}

/**
 * Get performance summary for dashboard
 */
export function getPerformanceSummary(): {
  totalQuestions: number;
  overallAccuracy: number;
  currentDifficulty: string;
  readinessScore: number;
  partBreakdown: { part: EASectionId; accuracy: number; questionsAttempted: number }[];
  weakParts: EASectionId[];
  strongParts: EASectionId[];
} {
  const partBreakdown = Object.values(adaptiveState.partPerformance).map(p => ({
    part: p.part,
    accuracy: Math.round(p.accuracy * 100),
    questionsAttempted: p.questionsAttempted,
  }));
  
  const totalQuestions = adaptiveState.totalQuestionsAnswered;
  const overallAccuracy = calculateRecentAccuracy() * 100;
  
  // Readiness score: weighted average of part accuracy and coverage
  const coverageScore = Math.min(100, (totalQuestions / 1500) * 100); // Target 500 per part
  const accuracyScore = overallAccuracy;
  const readinessScore = Math.round((accuracyScore * 0.6) + (coverageScore * 0.4));
  
  const weakParts = getWeakParts();
  const strongParts = Object.values(adaptiveState.partPerformance)
    .filter(p => p.accuracy >= 0.80 && p.questionsAttempted >= 50)
    .map(p => p.part);
  
  return {
    totalQuestions,
    overallAccuracy: Math.round(overallAccuracy),
    currentDifficulty: adaptiveState.currentDifficulty,
    readinessScore,
    partBreakdown,
    weakParts,
    strongParts,
  };
}

/**
 * Start a new practice session
 */
export function startSession(): void {
  adaptiveState.sessionStartTime = new Date();
  saveAdaptiveState(adaptiveState);
}

/**
 * End practice session and get summary
 */
export function endSession(): { 
  duration: number; 
  questionsAnswered: number; 
  accuracy: number 
} {
  const now = new Date();
  const duration = adaptiveState.sessionStartTime 
    ? Math.round((now.getTime() - adaptiveState.sessionStartTime.getTime()) / 60000)
    : 0;
  
  const questionsAnswered = adaptiveState.lastSessionQuestions.length;
  const accuracy = calculateRecentAccuracy() * 100;
  
  adaptiveState.sessionStartTime = null;
  saveAdaptiveState(adaptiveState);
  
  return { duration, questionsAnswered, accuracy: Math.round(accuracy) };
}
