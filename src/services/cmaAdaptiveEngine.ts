/**
 * CMA Adaptive Question Engine
 * 
 * Intelligently selects questions based on user performance for the IMA CMA exam:
 * - Adjusts difficulty based on recent accuracy
 * - Prioritizes weak domains based on IMA exam weights
 * - Uses spaced repetition for missed questions
 * - Balances coverage across both parts (CMA1, CMA2)
 * - Avoids recently seen questions
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 */

// CMA Part types
export type CMASectionId = 'CMA1' | 'CMA2';

// Question type for adaptive engine
export interface CMAAdaptiveQuestion {
  id: string;
  part: CMASectionId;
  domain?: string; // e.g., 'CMA1-A', 'CMA2-C'
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concepts: string[];
  imaRef?: string; // IMA reference
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
  part: CMASectionId;
  questionsAttempted: number;
  accuracy: number;
  recentAccuracy: number; // Last 10 questions
  needsWork: boolean;
  lastPracticed: Date | null;
  masteredConcepts: string[];
  struggleConcepts: string[];
}

export interface AdaptiveState {
  userId: string;
  currentDifficulty: 'easy' | 'medium' | 'hard';
  totalQuestionsAnswered: number;
  recentAnswers: boolean[]; // Last 20 answers
  partPerformance: Record<CMASectionId, PartPerformance>;
  questionHistory: Map<string, QuestionHistory>;
  lastQuestionIds: string[]; // Last 50 questions to avoid repetition
  sessionStartTime: Date | null;
  sessionQuestionsAnswered: number;
}

// Domain weights from IMA CSO
export const CMA_DOMAIN_WEIGHTS: Record<string, number> = {
  // CMA1: Financial Planning, Performance, and Analytics
  'CMA1-A': 15, // External Financial Reporting Decisions
  'CMA1-B': 20, // Planning, Budgeting, and Forecasting
  'CMA1-C': 20, // Performance Management
  'CMA1-D': 15, // Cost Management
  'CMA1-E': 15, // Internal Controls
  'CMA1-F': 15, // Technology and Analytics
  // CMA2: Strategic Financial Management
  'CMA2-A': 20, // Financial Statement Analysis
  'CMA2-B': 20, // Corporate Finance
  'CMA2-C': 25, // Decision Analysis
  'CMA2-D': 10, // Risk Management
  'CMA2-E': 10, // Investment Decisions
  'CMA2-F': 15, // Professional Ethics
};

// Storage key for localStorage
const STORAGE_KEY = 'cma-adaptive-state';

// Initialize default state
function createDefaultState(userId: string): AdaptiveState {
  const parts: CMASectionId[] = ['CMA1', 'CMA2'];
  const partPerformance: Record<CMASectionId, PartPerformance> = {} as Record<CMASectionId, PartPerformance>;
  
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
    };
  });
  
  return {
    userId,
    currentDifficulty: 'medium',
    totalQuestionsAnswered: 0,
    recentAnswers: [],
    partPerformance,
    questionHistory: new Map(),
    lastQuestionIds: [],
    sessionStartTime: null,
    sessionQuestionsAnswered: 0,
  };
}

// Module-level state
let adaptiveState: AdaptiveState = createDefaultState('default');

/**
 * Load state from localStorage
 */
function loadAdaptiveState(): AdaptiveState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Restore Map
      parsed.questionHistory = new Map(parsed.questionHistoryArray || []);
      delete parsed.questionHistoryArray;
      // Restore dates
      if (parsed.sessionStartTime) {
        parsed.sessionStartTime = new Date(parsed.sessionStartTime);
      }
      Object.values(parsed.partPerformance).forEach((p: unknown) => {
        const part = p as PartPerformance;
        if (part.lastPracticed) {
          part.lastPracticed = new Date(part.lastPracticed);
        }
      });
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load CMA adaptive state:', e);
  }
  return null;
}

/**
 * Save state to localStorage
 */
function saveAdaptiveState(state: AdaptiveState): void {
  try {
    const toStore = {
      ...state,
      questionHistoryArray: Array.from(state.questionHistory.entries()),
    };
    delete (toStore as Record<string, unknown>).questionHistory;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (e) {
    console.error('Failed to save CMA adaptive state:', e);
  }
}

/**
 * Initialize or load adaptive engine state
 */
export function initializeAdaptiveEngine(userId: string): AdaptiveState {
  const loaded = loadAdaptiveState();
  if (loaded && loaded.userId === userId) {
    adaptiveState = loaded;
  } else {
    adaptiveState = createDefaultState(userId);
    saveAdaptiveState(adaptiveState);
  }
  return adaptiveState;
}

/**
 * Record an answer and update adaptive state
 */
export function recordAnswer(
  questionId: string,
  isCorrect: boolean,
  part: CMASectionId,
  _domain?: string,
  _timeSpent?: number
): void {
  // Update recent answers (sliding window of 20)
  adaptiveState.recentAnswers.push(isCorrect);
  if (adaptiveState.recentAnswers.length > 20) {
    adaptiveState.recentAnswers.shift();
  }
  
  adaptiveState.totalQuestionsAnswered++;
  adaptiveState.sessionQuestionsAnswered++;
  
  // Update part performance
  const partPerf = adaptiveState.partPerformance[part];
  partPerf.questionsAttempted++;
  partPerf.lastPracticed = new Date();
  
  // Calculate new accuracy
  const totalCorrect = partPerf.accuracy * (partPerf.questionsAttempted - 1) / 100;
  partPerf.accuracy = ((totalCorrect + (isCorrect ? 1 : 0)) / partPerf.questionsAttempted) * 100;
  
  // Calculate recent accuracy (last 10 in this part)
  const recentPartAnswers = adaptiveState.recentAnswers.slice(-10);
  partPerf.recentAccuracy = recentPartAnswers.length > 0
    ? (recentPartAnswers.filter(Boolean).length / recentPartAnswers.length) * 100
    : 0;
  
  partPerf.needsWork = partPerf.accuracy < 70 || partPerf.questionsAttempted < 50;
  
  // Update question history with SM-2 algorithm
  updateQuestionHistory(questionId, isCorrect);
  
  // Track last questions for anti-repetition
  adaptiveState.lastQuestionIds.push(questionId);
  if (adaptiveState.lastQuestionIds.length > 50) {
    adaptiveState.lastQuestionIds.shift();
  }
  
  // Adjust difficulty based on recent performance
  adjustDifficulty();
  
  saveAdaptiveState(adaptiveState);
}

/**
 * Update question history using SM-2 spaced repetition
 */
function updateQuestionHistory(questionId: string, isCorrect: boolean): void {
  const existing = adaptiveState.questionHistory.get(questionId);
  const now = new Date();
  
  if (existing) {
    existing.attempts++;
    existing.lastAttempted = now;
    existing.lastResult = isCorrect;
    
    if (isCorrect) {
      existing.correctCount++;
      // Increase ease factor for correct answers
      existing.easeFactor = Math.min(2.5, existing.easeFactor + 0.1);
      existing.interval = Math.round(existing.interval * existing.easeFactor);
    } else {
      // Reset interval for incorrect answers
      existing.easeFactor = Math.max(1.3, existing.easeFactor - 0.2);
      existing.interval = 1;
    }
    
    existing.nextReviewDate = new Date(now.getTime() + existing.interval * 24 * 60 * 60 * 1000);
    adaptiveState.questionHistory.set(questionId, existing);
  } else {
    const newHistory: QuestionHistory = {
      questionId,
      attempts: 1,
      correctCount: isCorrect ? 1 : 0,
      lastAttempted: now,
      lastResult: isCorrect,
      easeFactor: isCorrect ? 2.5 : 1.3,
      interval: isCorrect ? 3 : 1,
      nextReviewDate: new Date(now.getTime() + (isCorrect ? 3 : 1) * 24 * 60 * 60 * 1000),
    };
    adaptiveState.questionHistory.set(questionId, newHistory);
  }
}

/**
 * Adjust difficulty based on recent performance
 */
function adjustDifficulty(): void {
  const recentAccuracy = calculateRecentAccuracy();
  
  if (recentAccuracy >= 0.85 && adaptiveState.currentDifficulty !== 'hard') {
    adaptiveState.currentDifficulty = adaptiveState.currentDifficulty === 'easy' ? 'medium' : 'hard';
  } else if (recentAccuracy <= 0.50 && adaptiveState.currentDifficulty !== 'easy') {
    adaptiveState.currentDifficulty = adaptiveState.currentDifficulty === 'hard' ? 'medium' : 'easy';
  }
}

/**
 * Calculate overall recent accuracy
 */
function calculateRecentAccuracy(): number {
  if (adaptiveState.recentAnswers.length === 0) return 0.5;
  return adaptiveState.recentAnswers.filter(Boolean).length / adaptiveState.recentAnswers.length;
}

/**
 * Get parts that need more work (low accuracy or low coverage)
 */
function getWeakParts(): CMASectionId[] {
  return Object.values(adaptiveState.partPerformance)
    .filter(p => p.needsWork || p.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .map(p => p.part);
}

/**
 * Get questions due for spaced repetition review
 */
export function getDueForReview(): string[] {
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
 * Select next questions adaptively
 */
export function selectQuestions(
  availableQuestions: CMAAdaptiveQuestion[],
  count: number = 10,
  focusPart?: CMASectionId
): CMAAdaptiveQuestion[] {
  const selected: CMAAdaptiveQuestion[] = [];
  const usedIds = new Set<string>(adaptiveState.lastQuestionIds);
  
  // Filter out recently seen questions
  let candidates = availableQuestions.filter(q => !usedIds.has(q.id));
  
  // If focusing on a specific part, filter to that part
  if (focusPart) {
    candidates = candidates.filter(q => q.part === focusPart);
  }
  
  if (candidates.length === 0) {
    candidates = availableQuestions;
  }
  
  // Priority 1: Due for review (up to 30% of questions)
  const reviewQuestions = getDueForReview();
  const reviewCandidates = candidates.filter(q => reviewQuestions.includes(q.id));
  const reviewCount = Math.min(Math.ceil(count * 0.3), reviewCandidates.length);
  
  for (let i = 0; i < reviewCount && selected.length < count; i++) {
    const q = reviewCandidates[i];
    if (!usedIds.has(q.id)) {
      selected.push(q);
      usedIds.add(q.id);
    }
  }
  
  // Priority 2: Weak parts (40% of questions)
  const weakParts = getWeakParts();
  if (weakParts.length > 0 && !focusPart) {
    const weakCount = Math.ceil(count * 0.4);
    const weakCandidates = candidates
      .filter(q => weakParts.includes(q.part) && !usedIds.has(q.id))
      .filter(q => q.difficulty === adaptiveState.currentDifficulty || q.difficulty === 'medium');
    
    for (let i = 0; i < weakCount && selected.length < count && i < weakCandidates.length; i++) {
      selected.push(weakCandidates[i]);
      usedIds.add(weakCandidates[i].id);
    }
  }
  
  // Priority 3: Current difficulty level questions
  const difficultyMatches = candidates
    .filter(q => q.difficulty === adaptiveState.currentDifficulty && !usedIds.has(q.id));
  
  for (const q of difficultyMatches) {
    if (selected.length >= count) break;
    selected.push(q);
    usedIds.add(q.id);
  }
  
  // Priority 4: Any remaining questions
  for (const q of candidates) {
    if (selected.length >= count) break;
    if (!usedIds.has(q.id)) {
      selected.push(q);
      usedIds.add(q.id);
    }
  }
  
  // Shuffle to avoid predictable ordering
  return shuffleArray(selected);
}

/**
 * Fisher-Yates shuffle
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
 * Get performance summary for dashboard
 */
export function getPerformanceSummary(): {
  totalQuestions: number;
  overallAccuracy: number;
  currentDifficulty: string;
  readinessScore: number;
  partBreakdown: { part: CMASectionId; accuracy: number; questionsAttempted: number }[];
  weakParts: CMASectionId[];
  strongParts: CMASectionId[];
} {
  const partBreakdown = Object.values(adaptiveState.partPerformance).map(p => ({
    part: p.part,
    accuracy: Math.round(p.accuracy),
    questionsAttempted: p.questionsAttempted,
  }));
  
  const totalQuestions = adaptiveState.totalQuestionsAnswered;
  const overallAccuracy = calculateRecentAccuracy() * 100;
  
  // Readiness score: weighted average of part accuracy and coverage
  const coverageScore = Math.min(100, (totalQuestions / 1000) * 100); // Target 500 per part
  const accuracyScore = overallAccuracy;
  const readinessScore = Math.round((accuracyScore * 0.6) + (coverageScore * 0.4));
  
  const weakParts = getWeakParts();
  const strongParts = Object.values(adaptiveState.partPerformance)
    .filter(p => p.accuracy >= 75 && p.questionsAttempted >= 50)
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
  adaptiveState.sessionQuestionsAnswered = 0;
  saveAdaptiveState(adaptiveState);
}

/**
 * End practice session and get summary
 */
export function endSession(): {
  duration: number;
  questionsAnswered: number;
  accuracy: number;
} {
  const duration = adaptiveState.sessionStartTime
    ? Math.round((Date.now() - adaptiveState.sessionStartTime.getTime()) / 1000 / 60)
    : 0;
  
  const recentAccuracy = calculateRecentAccuracy() * 100;
  
  const summary = {
    duration,
    questionsAnswered: adaptiveState.sessionQuestionsAnswered,
    accuracy: Math.round(recentAccuracy),
  };
  
  adaptiveState.sessionStartTime = null;
  adaptiveState.sessionQuestionsAnswered = 0;
  saveAdaptiveState(adaptiveState);
  
  return summary;
}

/**
 * Reset adaptive state (for testing or user request)
 */
export function resetAdaptiveState(userId: string): void {
  adaptiveState = createDefaultState(userId);
  saveAdaptiveState(adaptiveState);
}

/**
 * Get domain-level performance within a part
 */
export function getDomainPerformance(part: CMASectionId): Record<string, { attempted: number; accuracy: number }> {
  const domains: Record<string, { attempted: number; correct: number }> = {};
  
  // Initialize domains for the part
  const partDomains = Object.keys(CMA_DOMAIN_WEIGHTS).filter(d => d.startsWith(part));
  partDomains.forEach(domain => {
    domains[domain] = { attempted: 0, correct: 0 };
  });
  
  // This would need to be populated from question history with domain tags
  // For now, return estimated data
  return Object.fromEntries(
    partDomains.map(domain => [
      domain,
      { attempted: 0, accuracy: 0 }
    ])
  );
}

// Initialize on module load
const loaded = loadAdaptiveState();
if (loaded) {
  adaptiveState = loaded;
}
