/**
 * Shared Adaptive Engine Core
 *
 * Unified algorithms and state management used by all exam-specific adaptive engines.
 * Each exam engine (CPA, EA, CMA, CIA, CISA, CFP) imports these shared functions
 * and wraps them with exam-specific configuration and types.
 *
 * Core capabilities:
 * - SM-2 spaced repetition algorithm (binary and full quality variants)
 * - Adaptive difficulty adjustment with configurable thresholds
 * - Per-section/domain performance tracking
 * - Question selection with priority buckets (review → weak areas → balanced)
 * - localStorage state persistence with Map/Date serialization
 * - Performance summary and readiness scoring
 * - Session management
 *
 * Design: Pure functions with no module-level state. Each exam engine manages
 * its own singleton state and delegates to these shared functions.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Tracks individual question performance for spaced repetition.
 * Shared across all exam engines.
 */
export interface QuestionHistoryEntry {
  questionId: string;
  attempts: number;
  correctCount: number;
  lastAttempted: Date;
  lastResult: boolean;
  easeFactor: number;      // SM-2 ease factor (1.3 – 2.5)
  interval: number;        // days until next review
  nextReviewDate: Date;
  // Response-time tracking (Phase 2, #5)
  lastResponseTimeMs: number;     // most recent response time
  averageResponseTimeMs: number;  // running average across all attempts
  // Knowledge stability / decay (Phase 2, #7)
  stability: number;              // FSRS-inspired: expected days until recall drops to 90%
  lapses: number;                 // count of times forgotten (quality < 3)
}

/**
 * Tracks performance within a section/domain/part.
 * The "section" terminology is generic — maps to CPA sections, EA parts,
 * CISA domains, etc.
 */
export interface SectionPerformanceEntry {
  sectionId: string;
  questionsAttempted: number;
  accuracy: number;          // 0–1 ratio
  recentAccuracy: number;    // 0–1 ratio over recent window
  needsWork: boolean;
  lastPracticed: Date | null;
  masteredConcepts: string[];
  struggleConcepts: string[];
  subSectionPerformance: Record<string, {
    questionsAttempted: number;
    accuracy: number;        // 0–1 ratio
  }>;
}

/**
 * Core adaptive state shared by all engines.
 * Exam-specific engines may extend this with additional fields
 * (e.g., CPA's chosenDiscipline, CMA's userId).
 */
export interface CoreAdaptiveState {
  currentDifficulty: 'easy' | 'medium' | 'hard';
  difficultyScore: number;  // 0.0–1.0 fine-grained difficulty (Phase 2, #6)
  targetAccuracy: number;
  recentResults: boolean[];
  sectionPerformance: Record<string, SectionPerformanceEntry>;
  questionHistory: Map<string, QuestionHistoryEntry>;
  lastSessionQuestions: string[];
  totalQuestionsAnswered: number;
  sessionStartTime: Date | null;
}

/**
 * Configuration for an exam-specific adaptive engine instance.
 */
export interface EngineConfig {
  storageKey: string;
  sections: string[];
  /** Weights keyed by section or sub-section ID (e.g. 'FAR-I': 12.5, 'CISA1': 18) */
  sectionWeights: Record<string, number>;
  targetAccuracy: number;            // default 0.75
  easyThreshold: number;             // accuracy above this → increase difficulty (default 0.85)
  hardThreshold: number;             // accuracy below this → decrease difficulty (default 0.60)
  recentWindowSize: number;          // sliding window for recent results (default 10)
  recentQuestionWindow: number;      // anti-repetition window (default 50)
  readinessTargetQuestions: number;   // total questions for 100% coverage score
  weaknessThreshold: number;         // accuracy below this = "needs work" (default 0.70)
  strongThreshold: number;           // accuracy above this = "strong" (default 0.80)
  minQuestionsForStrong: number;     // min attempts to be labeled "strong" (default 50)
  targetTimePerQuestionMs: number;   // expected response time for quality rating (default 120000 = 2min)
  retrievabilityThreshold: number;   // surface for review when recall drops below this (default 0.85)
}

/**
 * Minimal question shape for the selection algorithm.
 * Exam engines extend this with exam-specific fields.
 */
export interface BaseAdaptiveQuestion {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[] | { id: string; text: string }[];
  correctAnswer: number;
  explanation: string;
}

export interface BaseSelectionCriteria {
  sections?: string[];
  subSections?: string[];
  difficulty?: 'easy' | 'medium' | 'hard' | 'adaptive';
  count: number;
  excludeRecent?: boolean;
  prioritizeWeakAreas?: boolean;
  includeReviewDue?: boolean;
  examWeighted?: boolean;
}

export type SelectionReason = 'weak-area' | 'weak-domain' | 'review-due' | 'new' | 'balanced' | 'difficulty-match';

// ============================================================================
// SM-2 Spaced Repetition Algorithm
// ============================================================================

const DEFAULT_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;

/**
 * Create a new question history entry for a first attempt.
 */
export function createQuestionHistory(
  questionId: string,
  isCorrect: boolean
): QuestionHistoryEntry {
  const now = new Date();
  return {
    questionId,
    attempts: 1,
    correctCount: isCorrect ? 1 : 0,
    lastAttempted: now,
    lastResult: isCorrect,
    easeFactor: isCorrect ? DEFAULT_EASE_FACTOR : MIN_EASE_FACTOR,
    interval: 1,
    nextReviewDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
    lastResponseTimeMs: 0,
    averageResponseTimeMs: 0,
    stability: isCorrect ? 1.0 : 0.4,
    lapses: isCorrect ? 0 : 1,
  };
}

/**
 * Update question history using simplified SM-2 (binary correct/incorrect).
 * This is the standard variant used by CPA, EA, CISA, CMA, CFP engines.
 */
export function updateQuestionHistory(
  history: QuestionHistoryEntry,
  isCorrect: boolean
): QuestionHistoryEntry {
  const now = new Date();
  const updated = { ...history };

  updated.attempts++;
  if (isCorrect) updated.correctCount++;
  updated.lastAttempted = now;
  updated.lastResult = isCorrect;

  if (isCorrect) {
    if (updated.attempts === 1) {
      updated.interval = 1;
    } else if (updated.attempts === 2) {
      updated.interval = 6;
    } else {
      updated.interval = Math.round(updated.interval * updated.easeFactor);
    }
    updated.easeFactor = Math.max(MIN_EASE_FACTOR, updated.easeFactor + 0.1);
    // Stability grows on successful recall
    updated.stability = Math.min(365, (updated.stability || 1) * (1.0 + 0.1 * updated.easeFactor));
  } else {
    updated.interval = 1;
    updated.easeFactor = Math.max(MIN_EASE_FACTOR, updated.easeFactor - 0.2);
    // Stability drops on failure; track lapse
    updated.stability = Math.max(0.4, (updated.stability || 1) * 0.5);
    updated.lapses = (updated.lapses || 0) + 1;
  }

  updated.nextReviewDate = new Date(now.getTime() + updated.interval * 24 * 60 * 60 * 1000);
  return updated;
}

/**
 * Full SM-2 with quality rating (0–5). Used by CIA engine.
 *
 * Quality scale:
 *   0 = complete blackout
 *   1 = incorrect, but recalled after seeing answer
 *   2 = incorrect
 *   3 = correct with significant difficulty
 *   4 = correct after hesitation
 *   5 = perfect instant recall
 */
export function calculateSM2WithQuality(
  history: QuestionHistoryEntry,
  quality: number
): QuestionHistoryEntry {
  const q = Math.max(0, Math.min(5, quality));
  const now = new Date();
  const updated = { ...history };

  updated.attempts++;
  updated.lastAttempted = now;
  updated.lastResult = q >= 3;
  if (q >= 3) updated.correctCount++;

  if (q >= 3) {
    if (updated.attempts === 1) {
      updated.interval = 1;
    } else if (updated.attempts === 2) {
      updated.interval = 6;
    } else {
      updated.interval = Math.round(updated.interval * updated.easeFactor);
    }
    // SM-2 ease factor formula
    updated.easeFactor = updated.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    updated.easeFactor = Math.max(MIN_EASE_FACTOR, updated.easeFactor);
    // Stability grows proportionally to quality
    const stabilityGrowth = 1.0 + (q - 2) * 0.05 * updated.easeFactor;
    updated.stability = Math.min(365, (updated.stability || 1) * stabilityGrowth);
  } else {
    updated.interval = 1;
    updated.easeFactor = Math.max(MIN_EASE_FACTOR, updated.easeFactor - 0.2);
    // Stability drops; track lapse
    updated.stability = Math.max(0.4, (updated.stability || 1) * 0.5);
    updated.lapses = (updated.lapses || 0) + 1;
  }

  updated.nextReviewDate = new Date(now.getTime() + updated.interval * 24 * 60 * 60 * 1000);
  return updated;
}

/**
 * Convert correct/incorrect + response time to SM-2 quality rating.
 * Used by CIA engine for time-aware quality assessment.
 */
export function responseToQuality(
  isCorrect: boolean,
  responseTimeMs: number,
  targetTimeMs: number
): number {
  if (!isCorrect) {
    return responseTimeMs > targetTimeMs * 2 ? 0 : 1;
  }
  if (responseTimeMs < targetTimeMs * 0.5) return 5;
  if (responseTimeMs < targetTimeMs) return 4;
  return 3;
}

// ============================================================================
// State Initialization & Persistence
// ============================================================================

/**
 * Create a fresh adaptive state for given config.
 */
export function initializeState(config: EngineConfig): CoreAdaptiveState {
  const sectionPerformance: Record<string, SectionPerformanceEntry> = {};

  config.sections.forEach(sectionId => {
    sectionPerformance[sectionId] = createSectionEntry(sectionId);
  });

  return {
    currentDifficulty: 'medium',
    difficultyScore: 0.5,
    targetAccuracy: config.targetAccuracy,
    recentResults: [],
    sectionPerformance,
    questionHistory: new Map(),
    lastSessionQuestions: [],
    totalQuestionsAnswered: 0,
    sessionStartTime: null,
  };
}

/**
 * Create a fresh section performance entry.
 */
export function createSectionEntry(sectionId: string): SectionPerformanceEntry {
  return {
    sectionId,
    questionsAttempted: 0,
    accuracy: 0,
    recentAccuracy: 0,
    needsWork: true,
    lastPracticed: null,
    masteredConcepts: [],
    struggleConcepts: [],
    subSectionPerformance: {},
  };
}

/**
 * Serialize state for localStorage. Converts Map to array for JSON compatibility.
 */
export function serializeState(state: CoreAdaptiveState): string {
  const toStore = {
    ...state,
    questionHistory: Array.from(state.questionHistory.entries()),
  };
  return JSON.stringify(toStore);
}

/**
 * Deserialize state from localStorage string.
 * Restores Map from array and converts date strings to Date objects.
 */
export function deserializeState(json: string, config: EngineConfig): CoreAdaptiveState {
  const parsed = JSON.parse(json);

  // Restore Map from array (handles both 'questionHistory' and 'questionHistoryArray' keys)
  parsed.questionHistory = new Map(
    parsed.questionHistory || parsed.questionHistoryArray || []
  );
  delete parsed.questionHistoryArray;

  // Restore dates in section performance
  Object.values(parsed.sectionPerformance || {}).forEach((sp: unknown) => {
    const entry = sp as SectionPerformanceEntry;
    if (entry.lastPracticed) {
      entry.lastPracticed = new Date(entry.lastPracticed);
    }
  });

  // Restore dates in question history + backfill new fields for migration
  parsed.questionHistory.forEach((qh: QuestionHistoryEntry) => {
    qh.lastAttempted = new Date(qh.lastAttempted);
    qh.nextReviewDate = new Date(qh.nextReviewDate);
    // Backfill Phase 2 fields for entries saved before this version
    if (qh.stability === undefined) qh.stability = qh.lastResult ? 1.0 : 0.4;
    if (qh.lapses === undefined) qh.lapses = 0;
    if (qh.lastResponseTimeMs === undefined) qh.lastResponseTimeMs = 0;
    if (qh.averageResponseTimeMs === undefined) qh.averageResponseTimeMs = 0;
  });

  if (parsed.sessionStartTime) {
    parsed.sessionStartTime = new Date(parsed.sessionStartTime);
  }

  // Backfill difficultyScore for states saved before Phase 2
  if (parsed.difficultyScore === undefined) {
    const levelMap: Record<string, number> = { easy: 0.2, medium: 0.5, hard: 0.8 };
    parsed.difficultyScore = levelMap[parsed.currentDifficulty] ?? 0.5;
  }

  // Ensure all configured sections exist in performance map
  config.sections.forEach(sectionId => {
    if (!parsed.sectionPerformance[sectionId]) {
      parsed.sectionPerformance[sectionId] = createSectionEntry(sectionId);
    }
  });

  return parsed;
}

/**
 * Load state from localStorage. Returns fresh state if nothing stored or on error.
 */
export function loadState(config: EngineConfig): CoreAdaptiveState {
  try {
    const stored = localStorage.getItem(config.storageKey);
    if (stored) {
      return deserializeState(stored, config);
    }
  } catch (e) {
    console.error(`Failed to load adaptive state (${config.storageKey}):`, e);
  }
  return initializeState(config);
}

/**
 * Save state to localStorage.
 */
export function saveState(state: CoreAdaptiveState, storageKey: string): void {
  try {
    localStorage.setItem(storageKey, serializeState(state));
  } catch (e) {
    console.error(`Failed to save adaptive state (${storageKey}):`, e);
  }
}

// ============================================================================
// Firestore Sync
// ============================================================================

/**
 * Sync adaptive state to Firestore for cross-device persistence.
 *
 * Writes to: users/{uid}/adaptive_state/{courseId}
 *
 * This should be called periodically (e.g. on session end, after a batch of
 * answers, or on a debounced timer) — NOT on every single answer to avoid
 * excessive writes.
 */
export async function syncToFirestore(
  state: CoreAdaptiveState,
  userId: string,
  courseId: string
): Promise<void> {
  try {
    const { db } = await import('../config/firebase');
    const { doc, setDoc } = await import('firebase/firestore');

    const serialized = JSON.parse(serializeState(state));
    // Flatten the Map-turned-array for Firestore (arrays of [key, value] pairs)
    // Add metadata
    serialized._syncedAt = new Date().toISOString();
    serialized._courseId = courseId;

    const docRef = doc(db, 'users', userId, 'adaptive_state', courseId);
    await setDoc(docRef, serialized, { merge: false });
  } catch (e) {
    console.error(`Failed to sync adaptive state to Firestore (${courseId}):`, e);
  }
}

/**
 * Load adaptive state from Firestore. Used as fallback when localStorage is
 * empty (e.g. new device, cleared browser data).
 *
 * Returns null if no Firestore state exists.
 */
export async function loadFromFirestore(
  userId: string,
  courseId: string,
  config: EngineConfig
): Promise<CoreAdaptiveState | null> {
  try {
    const { db } = await import('../config/firebase');
    const { doc, getDoc } = await import('firebase/firestore');

    const docRef = doc(db, 'users', userId, 'adaptive_state', courseId);
    const snap = await getDoc(docRef);

    if (!snap.exists()) return null;

    const data = snap.data();
    // Convert back to the serialized string format so we can reuse deserializeState
    const json = JSON.stringify(data);
    return deserializeState(json, config);
  } catch (e) {
    console.error(`Failed to load adaptive state from Firestore (${courseId}):`, e);
    return null;
  }
}

/**
 * Load state from localStorage with Firestore fallback.
 *
 * Priority: localStorage → Firestore → fresh state
 *
 * When loaded from Firestore, also persists to localStorage for fast future loads.
 */
export async function loadStateWithFirestoreFallback(
  config: EngineConfig,
  userId: string,
  courseId: string
): Promise<CoreAdaptiveState> {
  // Try localStorage first (fast)
  try {
    const stored = localStorage.getItem(config.storageKey);
    if (stored) {
      return deserializeState(stored, config);
    }
  } catch { /* fall through */ }

  // Try Firestore (cross-device)
  const firestoreState = await loadFromFirestore(userId, courseId, config);
  if (firestoreState) {
    // Persist to localStorage for next time
    saveState(firestoreState, config.storageKey);
    return firestoreState;
  }

  return initializeState(config);
}

// ============================================================================
// Recording Answers
// ============================================================================

/**
 * Record an answer and return the updated state.
 *
 * This is the core "record" logic shared by all engines:
 *   1. Update recent results sliding window
 *   2. Update question history (SM-2)
 *   3. Update section performance (accuracy, concepts)
 *   4. Update sub-section performance if provided
 *   5. Adjust difficulty based on recent performance
 *   6. Track question in anti-repetition window
 */
export function recordAnswerCore(
  state: CoreAdaptiveState,
  config: EngineConfig,
  questionId: string,
  sectionId: string,
  isCorrect: boolean,
  options?: {
    subSectionId?: string;
    concepts?: string[];
    responseTimeMs?: number;
  }
): CoreAdaptiveState {
  const now = new Date();

  // 1. Update recent results
  const recentResults = [...state.recentResults, isCorrect].slice(-config.recentWindowSize);

  // 2. Update question history (SM-2)
  const questionHistory = new Map(state.questionHistory);
  const existing = state.questionHistory.get(questionId);
  if (existing) {
    // When response time is available, use quality-based SM-2 for finer-grained repetition (#5)
    if (options?.responseTimeMs && options.responseTimeMs > 0) {
      const quality = responseToQuality(isCorrect, options.responseTimeMs, config.targetTimePerQuestionMs);
      questionHistory.set(questionId, calculateSM2WithQuality(existing, quality));
    } else {
      questionHistory.set(questionId, updateQuestionHistory(existing, isCorrect));
    }
  } else {
    questionHistory.set(questionId, createQuestionHistory(questionId, isCorrect));
  }

  // 2b. Update response time tracking
  if (options?.responseTimeMs && options.responseTimeMs > 0) {
    const entry = questionHistory.get(questionId)!;
    entry.lastResponseTimeMs = options.responseTimeMs;
    entry.averageResponseTimeMs = entry.attempts > 1
      ? (((entry.averageResponseTimeMs || 0) * (entry.attempts - 1)) + options.responseTimeMs) / entry.attempts
      : options.responseTimeMs;
  }

  // 3. Update section performance
  const sectionPerformance = { ...state.sectionPerformance };
  const sectionPerf = {
    ...(state.sectionPerformance[sectionId] || createSectionEntry(sectionId)),
  };
  sectionPerf.questionsAttempted++;
  sectionPerf.lastPracticed = now;
  sectionPerf.accuracy = calculateSectionAccuracy(questionHistory, sectionId);
  sectionPerf.recentAccuracy = calculateRecentAccuracy(recentResults);
  sectionPerf.needsWork = sectionPerf.accuracy < config.weaknessThreshold;

  // 4. Update sub-section performance if provided
  if (options?.subSectionId) {
    sectionPerf.subSectionPerformance = { ...sectionPerf.subSectionPerformance };
    const subEntry = {
      ...(sectionPerf.subSectionPerformance[options.subSectionId] || {
        questionsAttempted: 0,
        accuracy: 0,
      }),
    };
    subEntry.questionsAttempted++;
    subEntry.accuracy = calculateSubSectionAccuracy(questionHistory, options.subSectionId);
    sectionPerf.subSectionPerformance[options.subSectionId] = subEntry;
  }

  // Update concept tracking
  if (options?.concepts && options.concepts.length > 0) {
    sectionPerf.masteredConcepts = [...sectionPerf.masteredConcepts];
    sectionPerf.struggleConcepts = [...sectionPerf.struggleConcepts];

    if (isCorrect) {
      options.concepts.forEach(concept => {
        if (!sectionPerf.masteredConcepts.includes(concept)) {
          sectionPerf.masteredConcepts.push(concept);
        }
        const idx = sectionPerf.struggleConcepts.indexOf(concept);
        if (idx > -1) sectionPerf.struggleConcepts.splice(idx, 1);
      });
    } else {
      options.concepts.forEach(concept => {
        if (!sectionPerf.struggleConcepts.includes(concept)) {
          sectionPerf.struggleConcepts.push(concept);
        }
      });
    }
  }

  sectionPerformance[sectionId] = sectionPerf;

  // 5. Adjust difficulty (numeric score + categorical for backward compat)
  const difficultyScore = adjustDifficultyScore(recentResults, state.difficultyScore ?? 0.5, config);
  const currentDifficulty = difficultyScoreToLevel(difficultyScore);

  // 6. Anti-repetition tracking
  const lastSessionQuestions = [...state.lastSessionQuestions, questionId].slice(
    -config.recentQuestionWindow
  );

  return {
    ...state,
    recentResults,
    questionHistory,
    sectionPerformance,
    currentDifficulty,
    difficultyScore,
    lastSessionQuestions,
    totalQuestionsAnswered: state.totalQuestionsAnswered + 1,
  };
}

// ============================================================================
// Accuracy Calculations
// ============================================================================

/**
 * Calculate accuracy for a section by matching question IDs that start with
 * the section ID prefix (e.g., 'far-001' starts with 'far').
 */
export function calculateSectionAccuracy(
  questionHistory: Map<string, QuestionHistoryEntry>,
  sectionId: string
): number {
  let correct = 0;
  let total = 0;
  const prefix = sectionId.toLowerCase();

  questionHistory.forEach(history => {
    if (history.questionId.toLowerCase().startsWith(prefix)) {
      correct += history.correctCount;
      total += history.attempts;
    }
  });

  return total > 0 ? correct / total : 0;
}

/**
 * Calculate accuracy for a sub-section by matching question IDs that contain
 * the sub-section ID (normalized, without dashes).
 */
export function calculateSubSectionAccuracy(
  questionHistory: Map<string, QuestionHistoryEntry>,
  subSectionId: string
): number {
  let correct = 0;
  let total = 0;
  const normalized = subSectionId.toLowerCase().replace(/-/g, '');

  questionHistory.forEach(history => {
    if (history.questionId.toLowerCase().includes(normalized)) {
      correct += history.correctCount;
      total += history.attempts;
    }
  });

  return total > 0 ? correct / total : 0;
}

/**
 * Calculate accuracy from recent results array.
 */
export function calculateRecentAccuracy(recentResults: boolean[]): number {
  if (recentResults.length === 0) return 0;
  return recentResults.filter(r => r).length / recentResults.length;
}

// ============================================================================
// Difficulty Adjustment
// ============================================================================

/**
 * Adjust difficulty based on recent performance.
 * Steps up one level if accuracy >= easyThreshold, down one level if <= hardThreshold.
 * Requires at least 5 results before adjusting.
 */
export function adjustDifficulty(
  recentResults: boolean[],
  currentDifficulty: 'easy' | 'medium' | 'hard',
  config: EngineConfig
): 'easy' | 'medium' | 'hard' {
  const recent = recentResults.slice(-config.recentWindowSize);
  if (recent.length < 5) return currentDifficulty;

  const accuracy = recent.filter(r => r).length / recent.length;

  if (accuracy >= config.easyThreshold && currentDifficulty !== 'hard') {
    return currentDifficulty === 'easy' ? 'medium' : 'hard';
  }
  if (accuracy <= config.hardThreshold && currentDifficulty !== 'easy') {
    return currentDifficulty === 'hard' ? 'medium' : 'easy';
  }

  return currentDifficulty;
}

/**
 * Compute a fine-grained difficulty score (0.0 – 1.0) as a smooth exponential
 * moving average. Replaces the 3-step ladder with a continuous function.
 *
 * Phase 2, #6 — five effective difficulty bands:
 *   0.0–0.2  beginner    (mostly easy questions)
 *   0.2–0.4  easy        (easy + some medium)
 *   0.4–0.6  medium      (medium questions)
 *   0.6–0.8  hard        (medium + hard)
 *   0.8–1.0  expert      (hard questions only)
 *
 * @param currentScore  Previous score (0–1)
 * @returns             Updated score (0–1), clamped
 */
export function adjustDifficultyScore(
  recentResults: boolean[],
  currentScore: number,
  config: EngineConfig
): number {
  const recent = recentResults.slice(-config.recentWindowSize);
  if (recent.length < 3) return currentScore; // need at least 3 data points

  const accuracy = recent.filter(r => r).length / recent.length;

  // Determine the target score from accuracy
  const target = accuracy > config.easyThreshold ? 1.0
    : accuracy < config.hardThreshold ? 0.0
    : accuracy; // proportional in the middle band

  // Smooth exponential moving average — 20% step toward target each evaluation
  const newScore = currentScore + 0.2 * (target - currentScore);
  return Math.max(0, Math.min(1, newScore));
}

/**
 * Map a numeric difficulty score to the three canonical question-difficulty levels.
 * Used for backward compatibility with `currentDifficulty` and question filtering.
 */
export function difficultyScoreToLevel(score: number): 'easy' | 'medium' | 'hard' {
  if (score < 0.33) return 'easy';
  if (score < 0.67) return 'medium';
  return 'hard';
}

/**
 * Map a question's difficulty label to a numeric value for fuzzy matching
 * against the engine's difficultyScore.
 */
export function difficultyLevelToScore(level: string): number {
  switch (level) {
    case 'easy':
    case 'beginner':
    case 'foundational':
      return 0.17;
    case 'medium':
    case 'intermediate':
    case 'moderate':
      return 0.5;
    case 'hard':
    case 'advanced':
    case 'tough':
      return 0.83;
    default:
      return 0.5;
  }
}

// ============================================================================
// Knowledge Decay — Retrievability (#7)
// ============================================================================

/**
 * Calculate the probability of recalling a question based on elapsed time
 * and the item's stability (FSRS-inspired exponential decay).
 *
 *   R = e^(−t / S)
 *
 * where t = days since last review, S = stability in days.
 * R falls from 1.0 (just reviewed) toward 0.0 over time.
 *
 * Items with higher stability (many successful recalls) decay more slowly.
 */
export function calculateRetrievability(entry: QuestionHistoryEntry): number {
  const daysSinceReview = (Date.now() - entry.lastAttempted.getTime()) / (24 * 60 * 60 * 1000);
  const stability = entry.stability || 1;
  return Math.exp(-daysSinceReview / stability);
}

// ============================================================================
// Queries
// ============================================================================

/**
 * Get question IDs due for spaced repetition review.
 *
 * A question is due when its estimated recall probability (retrievability)
 * drops below the configured threshold. This ensures:
 * - Correctly-answered questions eventually resurface (unlike the old
 *   !lastResult filter which silently discarded them forever)
 * - Urgency is proportional to how much the student has likely forgotten
 *
 * Returns IDs sorted by urgency (lowest retrievability first).
 */
export function getQuestionsDueForReview(
  questionHistory: Map<string, QuestionHistoryEntry>,
  retrievabilityThreshold = 0.85
): string[] {
  const due: { id: string; retrievability: number }[] = [];

  questionHistory.forEach((history, questionId) => {
    const r = calculateRetrievability(history);
    if (r < retrievabilityThreshold) {
      due.push({ id: questionId, retrievability: r });
    }
  });

  // Most forgotten first
  due.sort((a, b) => a.retrievability - b.retrievability);
  return due.map(d => d.id);
}

/**
 * Get weak sections ordered by priority.
 * Priority = sectionWeight × (1 - accuracy), so high‐weight low‐accuracy sections come first.
 */
export function getWeakSections(
  state: CoreAdaptiveState,
  config: EngineConfig,
  activeSections?: string[]
): string[] {
  const sections = activeSections || config.sections;

  return Object.values(state.sectionPerformance)
    .filter(s => sections.includes(s.sectionId))
    .filter(s => s.needsWork || s.accuracy < config.weaknessThreshold)
    .sort((a, b) => {
      const aWeight = config.sectionWeights[a.sectionId] || 1;
      const bWeight = config.sectionWeights[b.sectionId] || 1;
      const aScore = aWeight * (1 - a.accuracy);
      const bScore = bWeight * (1 - b.accuracy);
      return bScore - aScore;
    })
    .map(s => s.sectionId);
}

/**
 * Get weak sub-sections across all active sections, ordered by priority.
 */
export function getWeakSubSections(
  state: CoreAdaptiveState,
  config: EngineConfig,
  activeSections?: string[]
): string[] {
  const weakAreas: { area: string; score: number }[] = [];
  const sections = activeSections || config.sections;

  sections.forEach(sectionId => {
    const sectionPerf = state.sectionPerformance[sectionId];
    if (!sectionPerf) return;

    Object.entries(sectionPerf.subSectionPerformance).forEach(([area, perf]) => {
      if (perf.accuracy < config.weaknessThreshold && perf.questionsAttempted > 5) {
        const weight = config.sectionWeights[area] || 10;
        weakAreas.push({
          area,
          score: weight * (1 - perf.accuracy),
        });
      }
    });
  });

  return weakAreas.sort((a, b) => b.score - a.score).map(d => d.area);
}

// ============================================================================
// Question Selection
// ============================================================================

/**
 * Generic question selection with priority buckets:
 *   1. Review-due questions (spaced repetition) — up to 20% of count
 *   2. Weak area questions — up to 40% of count
 *   3. Difficulty-matched / balanced — fills remainder
 *
 * @param allQuestions   Full question pool
 * @param getSection     Extracts the primary section/domain/part ID from a question
 * @param getSubSection  Extracts the sub-section/blueprint area ID (optional)
 * @param activeSections Override for which sections are "active" (e.g., CPA core + chosen discipline)
 */
export function selectQuestionsCore<Q extends BaseAdaptiveQuestion>(
  allQuestions: Q[],
  state: CoreAdaptiveState,
  config: EngineConfig,
  criteria: BaseSelectionCriteria,
  getSection: (q: Q) => string,
  getSubSection?: (q: Q) => string | undefined,
  activeSections?: string[]
): (Q & { selectionReason: SelectionReason; priority: number })[] {
  type SelectedQ = Q & { selectionReason: SelectionReason; priority: number };
  const selected: SelectedQ[] = [];
  const usedIds = new Set<string>();

  // Filter by sections
  let available = criteria.sections
    ? allQuestions.filter(q => criteria.sections!.includes(getSection(q)))
    : allQuestions;

  // Filter by sub-sections
  if (criteria.subSections && criteria.subSections.length > 0 && getSubSection) {
    available = available.filter(q => {
      const sub = getSubSection(q);
      return sub && criteria.subSections!.includes(sub);
    });
  }

  // Exclude recently seen
  if (criteria.excludeRecent) {
    available = available.filter(q => !state.lastSessionQuestions.includes(q.id));
  }

  // 1. Review-due questions (spaced repetition) — max 20%
  //    Enhanced: priority scales with urgency (lowest retrievability = highest priority)
  if (criteria.includeReviewDue) {
    const threshold = config.retrievabilityThreshold ?? 0.85;
    const dueSet = new Set(getQuestionsDueForReview(state.questionHistory, threshold));
    const dueQuestions = available
      .filter(q => dueSet.has(q.id))
      // Sort by retrievability ascending so most-forgotten are selected first
      .sort((a, b) => {
        const ra = state.questionHistory.get(a.id) ? calculateRetrievability(state.questionHistory.get(a.id)!) : 1;
        const rb = state.questionHistory.get(b.id) ? calculateRetrievability(state.questionHistory.get(b.id)!) : 1;
        return ra - rb;
      })
      .slice(0, Math.ceil(criteria.count * 0.2));

    dueQuestions.forEach(q => {
      if (!usedIds.has(q.id)) {
        const entry = state.questionHistory.get(q.id);
        const retrievability = entry ? calculateRetrievability(entry) : 1;
        // Urgency-weighted priority: 100 base + up to 50 bonus for most-forgotten
        const urgencyBonus = Math.round((1 - retrievability) * 50);
        selected.push({ ...q, selectionReason: 'review-due', priority: 100 + urgencyBonus });
        usedIds.add(q.id);
      }
    });
  }

  // 2. Weak area questions — fills up toward count
  if (criteria.prioritizeWeakAreas) {
    const useSubSections = !!getSubSection;
    const weakAreas = useSubSections
      ? getWeakSubSections(state, config, activeSections)
      : getWeakSections(state, config, activeSections);

    for (const area of weakAreas) {
      if (selected.length >= criteria.count) break;

      const areaQuestions = available
        .filter(q => {
          if (usedIds.has(q.id)) return false;
          if (useSubSections && getSubSection) {
            return getSubSection(q) === area;
          }
          return getSection(q) === area;
        })
        .slice(0, 2); // Max 2 per weak area

      areaQuestions.forEach(q => {
        if (selected.length < criteria.count && !usedIds.has(q.id)) {
          const weight = config.sectionWeights[area] || 10;
          selected.push({
            ...q,
            selectionReason: 'weak-area',
            priority: 80 + weight,
          });
          usedIds.add(q.id);
        }
      });
    }
  }

  // 3. Fill remaining with difficulty-matched / exam-weighted / balanced
  //    Enhanced: uses difficultyScore for fuzzy matching when adaptive (#6)
  const remaining = criteria.count - selected.length;
  if (remaining > 0) {
    const useAdaptive = criteria.difficulty === 'adaptive';
    const targetScore = useAdaptive
      ? (state.difficultyScore ?? 0.5)
      : difficultyLevelToScore(criteria.difficulty || 'medium');

    // Score each available question by how close its difficulty is to the target
    const scoredAvailable = available
      .filter(q => !usedIds.has(q.id))
      .map(q => ({
        question: q,
        closeness: 1 - Math.abs(difficultyLevelToScore(q.difficulty) - targetScore),
      }))
      .sort((a, b) => b.closeness - a.closeness);

    if (criteria.examWeighted) {
      const sects = activeSections || config.sections;
      const targetPerSection = Math.ceil(remaining / sects.length);

      sects.forEach(section => {
        const sectionQuestions = scoredAvailable
          .filter(s => getSection(s.question) === section && !usedIds.has(s.question.id))
          .slice(0, targetPerSection);

        sectionQuestions.forEach(s => {
          if (selected.length < criteria.count) {
            selected.push({ ...s.question, selectionReason: 'balanced', priority: 50 });
            usedIds.add(s.question.id);
          }
        });
      });
    }

    // Fill any remaining slots (best difficulty match first)
    const stillRemaining = criteria.count - selected.length;
    if (stillRemaining > 0) {
      scoredAvailable
        .filter(s => !usedIds.has(s.question.id))
        .slice(0, stillRemaining)
        .forEach(s => {
          selected.push({ ...s.question, selectionReason: 'difficulty-match', priority: 30 });
          usedIds.add(s.question.id);
        });
    }
  }

  selected.sort((a, b) => b.priority - a.priority);
  return selected;
}

// ============================================================================
// Performance Summary
// ============================================================================

export interface PerformanceSummary {
  totalQuestions: number;
  overallAccuracy: number;
  currentDifficulty: string;
  readinessScore: number;
  sectionBreakdown: { section: string; accuracy: number; questionsAttempted: number }[];
  weakSections: string[];
  strongSections: string[];
}

/**
 * Generate a performance summary with readiness scoring.
 *
 * Readiness = 60% accuracy + 40% coverage
 * Coverage = totalQuestionsAnswered / readinessTargetQuestions (capped at 100%)
 */
export function getPerformanceSummaryCore(
  state: CoreAdaptiveState,
  config: EngineConfig,
  activeSections?: string[]
): PerformanceSummary {
  const sections = activeSections || config.sections;

  const sectionBreakdown = Object.values(state.sectionPerformance)
    .filter(s => sections.includes(s.sectionId))
    .map(s => ({
      section: s.sectionId,
      accuracy: Math.round(s.accuracy * 100),
      questionsAttempted: s.questionsAttempted,
    }));

  const totalQuestions = state.totalQuestionsAnswered;
  const overallAccuracy = calculateRecentAccuracy(state.recentResults) * 100;

  const coverageScore = Math.min(100, (totalQuestions / config.readinessTargetQuestions) * 100);
  const readinessScore = Math.round(overallAccuracy * 0.6 + coverageScore * 0.4);

  const weakSections = getWeakSections(state, config, sections);
  const strongSections = Object.values(state.sectionPerformance)
    .filter(s => sections.includes(s.sectionId))
    .filter(
      s =>
        s.accuracy >= config.strongThreshold &&
        s.questionsAttempted >= config.minQuestionsForStrong
    )
    .map(s => s.sectionId);

  return {
    totalQuestions,
    overallAccuracy: Math.round(overallAccuracy),
    currentDifficulty: state.currentDifficulty,
    readinessScore,
    sectionBreakdown,
    weakSections,
    strongSections,
  };
}

// ============================================================================
// Session Management
// ============================================================================

/**
 * Start a session by recording the start time.
 */
export function startSessionCore(state: CoreAdaptiveState): CoreAdaptiveState {
  return { ...state, sessionStartTime: new Date() };
}

/**
 * End a session and return the updated state + session summary.
 */
export function endSessionCore(state: CoreAdaptiveState): {
  state: CoreAdaptiveState;
  summary: { duration: number; questionsAnswered: number; accuracy: number };
} {
  const duration = state.sessionStartTime
    ? Math.round((Date.now() - state.sessionStartTime.getTime()) / 60000)
    : 0;

  const questionsAnswered = state.lastSessionQuestions.length;
  const accuracy = Math.round(calculateRecentAccuracy(state.recentResults) * 100);

  return {
    state: { ...state, sessionStartTime: null },
    summary: { duration, questionsAnswered, accuracy },
  };
}

// ============================================================================
// Utilities
// ============================================================================

/**
 * Fisher-Yates shuffle. Returns a new array.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Create a default engine config with standard defaults.
 * Override individual fields as needed.
 */
export function createEngineConfig(
  overrides: Partial<EngineConfig> & Pick<EngineConfig, 'storageKey' | 'sections' | 'sectionWeights'>
): EngineConfig {
  return {
    targetAccuracy: 0.75,
    easyThreshold: 0.85,
    hardThreshold: 0.60,
    recentWindowSize: 10,
    recentQuestionWindow: 50,
    readinessTargetQuestions: 1500,
    weaknessThreshold: 0.70,
    strongThreshold: 0.80,
    minQuestionsForStrong: 50,
    targetTimePerQuestionMs: 120_000,  // 2 minutes
    retrievabilityThreshold: 0.85,
    ...overrides,
  };
}
