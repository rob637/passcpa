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
  } else {
    updated.interval = 1;
    updated.easeFactor = Math.max(MIN_EASE_FACTOR, updated.easeFactor - 0.2);
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
  } else {
    updated.interval = 1;
    updated.easeFactor = Math.max(MIN_EASE_FACTOR, updated.easeFactor - 0.2);
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

  // Restore dates in question history
  parsed.questionHistory.forEach((qh: QuestionHistoryEntry) => {
    qh.lastAttempted = new Date(qh.lastAttempted);
    qh.nextReviewDate = new Date(qh.nextReviewDate);
  });

  if (parsed.sessionStartTime) {
    parsed.sessionStartTime = new Date(parsed.sessionStartTime);
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
  }
): CoreAdaptiveState {
  const now = new Date();

  // 1. Update recent results
  const recentResults = [...state.recentResults, isCorrect].slice(-config.recentWindowSize);

  // 2. Update question history (SM-2)
  const questionHistory = new Map(state.questionHistory);
  const existing = state.questionHistory.get(questionId);
  if (existing) {
    questionHistory.set(questionId, updateQuestionHistory(existing, isCorrect));
  } else {
    questionHistory.set(questionId, createQuestionHistory(questionId, isCorrect));
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

  // 5. Adjust difficulty
  const currentDifficulty = adjustDifficulty(recentResults, state.currentDifficulty, config);

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

// ============================================================================
// Queries
// ============================================================================

/**
 * Get question IDs due for spaced repetition review.
 * A question is due when its next review date has passed AND it was last answered incorrectly.
 */
export function getQuestionsDueForReview(
  questionHistory: Map<string, QuestionHistoryEntry>
): string[] {
  const now = new Date();
  const due: string[] = [];

  questionHistory.forEach((history, questionId) => {
    if (history.nextReviewDate <= now && !history.lastResult) {
      due.push(questionId);
    }
  });

  return due;
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
  if (criteria.includeReviewDue) {
    const dueIds = new Set(getQuestionsDueForReview(state.questionHistory));
    const dueQuestions = available
      .filter(q => dueIds.has(q.id))
      .slice(0, Math.ceil(criteria.count * 0.2));

    dueQuestions.forEach(q => {
      if (!usedIds.has(q.id)) {
        selected.push({ ...q, selectionReason: 'review-due', priority: 100 });
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
  const remaining = criteria.count - selected.length;
  if (remaining > 0) {
    const targetDifficulty =
      criteria.difficulty === 'adaptive'
        ? state.currentDifficulty
        : criteria.difficulty || 'medium';

    let difficultyFiltered = available.filter(
      q => !usedIds.has(q.id) && q.difficulty === targetDifficulty
    );

    // Fallback to any difficulty if not enough
    if (difficultyFiltered.length < remaining) {
      difficultyFiltered = available.filter(q => !usedIds.has(q.id));
    }

    if (criteria.examWeighted) {
      const sects = activeSections || config.sections;
      const targetPerSection = Math.ceil(remaining / sects.length);

      sects.forEach(section => {
        const sectionQuestions = difficultyFiltered
          .filter(q => getSection(q) === section && !usedIds.has(q.id))
          .slice(0, targetPerSection);

        sectionQuestions.forEach(q => {
          if (selected.length < criteria.count) {
            selected.push({ ...q, selectionReason: 'balanced', priority: 50 });
            usedIds.add(q.id);
          }
        });
      });
    }

    // Fill any remaining slots
    const stillRemaining = criteria.count - selected.length;
    if (stillRemaining > 0) {
      difficultyFiltered
        .filter(q => !usedIds.has(q.id))
        .slice(0, stillRemaining)
        .forEach(q => {
          selected.push({ ...q, selectionReason: 'difficulty-match', priority: 30 });
          usedIds.add(q.id);
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
    ...overrides,
  };
}
