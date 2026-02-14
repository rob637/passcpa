/**
 * Question Option Shuffling Utility
 * 
 * World-class deterministic shuffling of MCQ options to:
 * 1. Prevent answer pattern gaming (original data has B-bias)
 * 2. Provide consistent experience per user (same shuffle every time for recall)
 * 3. Support exam simulation mode with per-attempt randomization
 * 
 * Shuffle Modes:
 * - 'practice' (default): Stable per user+question. Same user always sees same order.
 *   Best for learning, review, and mistake analysis.
 * - 'exam': Per-session randomization. Different order each attempt.
 *   Simulates real exam conditions, prevents pattern memorization.
 * 
 * Analytics Note: Always record isCorrect (boolean), not answer indices.
 * The shuffle is presentation-layer only; storage uses original indices.
 */

import { Question } from '../types';

/** Shuffle mode determines seed composition */
export type ShuffleMode = 'practice' | 'exam';

export interface ShuffledQuestion extends Question {
  /** Original indices in shuffled order: shuffleMap[displayIndex] = originalIndex */
  shuffleMap: number[];
  /** Shuffled index of the correct answer (for display) */
  shuffledCorrectAnswer: number;
  /** Shuffled options array (for display) */
  shuffledOptions: string[];
  /** Mode used for this shuffle */
  shuffleMode: ShuffleMode;
}

/**
 * Seeded random number generator (mulberry32)
 * Produces deterministic random numbers from a seed
 */
function seededRandom(seed: number): number {
  let t = seed + 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

/**
 * Convert string to numeric seed
 */
function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Generate shuffled indices using Fisher-Yates with seeded random
 */
function getShuffledIndicesInternal(seed: number, length: number): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  
  // Fisher-Yates shuffle with seeded random
  for (let i = indices.length - 1; i > 0; i--) {
    const seedVal = seededRandom(seed * 1000 + i);
    const j = Math.floor(seedVal * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  return indices;
}

/**
 * Public helper to get shuffled indices from a seed string
 * Returns array where shuffledIndices[newPosition] = originalIndex
 */
export function getShuffledIndices(length: number, seedString: string): number[] {
  const seed = stringToSeed(seedString);
  return getShuffledIndicesInternal(seed, length);
}

export interface ShuffleOptions {
  /** User ID for deterministic shuffling. Required for 'practice' mode. */
  userId?: string;
  /** Session ID for per-session shuffling. Used in 'exam' mode. */
  sessionId?: string;
  /** Shuffle mode: 'practice' (stable per user) or 'exam' (per session). Default: 'practice' */
  mode?: ShuffleMode;
}

/**
 * Shuffle a question's options deterministically
 * 
 * @param question - The question to shuffle
 * @param options - Shuffle options (userId, sessionId, mode)
 * @returns Question with shuffled options and mapping
 * 
 * @example
 * // Practice mode - same user always sees same order
 * const shuffled = shuffleQuestionOptions(question, { userId: user.uid, mode: 'practice' });
 * 
 * @example  
 * // Exam mode - different order per session
 * const shuffled = shuffleQuestionOptions(question, { sessionId: examSessionId, mode: 'exam' });
 */
export function shuffleQuestionOptions(
  question: Question,
  options: ShuffleOptions = {}
): ShuffledQuestion {
  const { userId, sessionId, mode = 'practice' } = options;
  const questionOptions = question.options || [];
  
  // Don't shuffle if less than 2 options
  if (questionOptions.length < 2) {
    return {
      ...question,
      shuffleMap: questionOptions.map((_, i) => i),
      shuffledCorrectAnswer: question.correctAnswer,
      shuffledOptions: questionOptions,
      shuffleMode: mode,
    };
  }
  
  // Build seed based on mode:
  // - practice: questionId + userId (stable per user)
  // - exam: questionId + sessionId (varies per attempt)
  let seedString: string;
  if (mode === 'exam') {
    seedString = `${question.id}-exam-${sessionId || Date.now()}`;
  } else {
    // practice mode: stable per user
    seedString = `${question.id}-${userId || 'anonymous'}`;
  }
  
  const seed = stringToSeed(seedString);
  
  // Get shuffled indices
  const shuffleMap = getShuffledIndicesInternal(seed, questionOptions.length);
  
  // Create shuffled options
  const shuffledOptions = shuffleMap.map(i => questionOptions[i]);
  
  // Find the new position of the correct answer
  const shuffledCorrectAnswer = shuffleMap.indexOf(question.correctAnswer);
  
  return {
    ...question,
    shuffleMap,
    shuffledCorrectAnswer,
    shuffledOptions,
    shuffleMode: mode,
  };
}

/**
 * Legacy signature for backwards compatibility
 * @deprecated Use shuffleQuestionOptions(question, { userId, sessionId, mode }) instead
 */
export function shuffleQuestionOptionsLegacy(
  question: Question,
  userId?: string,
  sessionId?: string
): ShuffledQuestion {
  // Legacy behavior: uses sessionId which causes per-session variation
  // New code should use mode: 'practice' for consistent experience
  return shuffleQuestionOptions(question, { 
    userId, 
    sessionId, 
    mode: sessionId ? 'exam' : 'practice' 
  });
}

/**
 * Translate user's answer from shuffled index to original index
 * Useful for recording answer history
 */
export function translateAnswer(shuffledIndex: number, shuffleMap: number[]): number {
  return shuffleMap[shuffledIndex];
}

/**
 * Check if user's answer is correct using shuffled indices
 */
export function isAnswerCorrect(
  userShuffledIndex: number,
  shuffledCorrectAnswer: number
): boolean {
  return userShuffledIndex === shuffledCorrectAnswer;
}

/**
 * Batch shuffle multiple questions
 * @param questions - Array of questions to shuffle
 * @param options - Shuffle options (userId, sessionId, mode)
 */
export function shuffleQuestions(
  questions: Question[],
  options: ShuffleOptions = {}
): ShuffledQuestion[] {
  return questions.map(q => shuffleQuestionOptions(q, options));
}
