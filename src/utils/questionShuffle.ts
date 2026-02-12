/**
 * Question Option Shuffling Utility
 * 
 * Provides deterministic shuffling of MCQ options to prevent answer pattern gaming.
 * Uses question ID + user ID as seed for reproducibility within a session.
 */

import { Question } from '../types';

export interface ShuffledQuestion extends Question {
  /** Original indices in shuffled order */
  shuffleMap: number[];
  /** Shuffled index of the correct answer */
  shuffledCorrectAnswer: number;
  /** Shuffled options array */
  shuffledOptions: string[];
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

/**
 * Shuffle a question's options deterministically
 * 
 * @param question - The question to shuffle
 * @param userId - User ID for session-specific shuffling (optional)
 * @param sessionId - Session ID for additional uniqueness (optional)
 * @returns Question with shuffled options and mapping
 */
export function shuffleQuestionOptions(
  question: Question,
  userId?: string,
  sessionId?: string
): ShuffledQuestion {
  const options = question.options || [];
  
  // Don't shuffle if less than 2 options
  if (options.length < 2) {
    return {
      ...question,
      shuffleMap: options.map((_, i) => i),
      shuffledCorrectAnswer: question.correctAnswer,
      shuffledOptions: options,
    };
  }
  
  // Create seed from question ID + user ID + session ID
  const seedString = `${question.id}-${userId || 'anonymous'}-${sessionId || 'default'}`;
  const seed = stringToSeed(seedString);
  
  // Get shuffled indices
  const shuffleMap = getShuffledIndicesInternal(seed, options.length);
  
  // Create shuffled options
  const shuffledOptions = shuffleMap.map(i => options[i]);
  
  // Find the new position of the correct answer
  const shuffledCorrectAnswer = shuffleMap.indexOf(question.correctAnswer);
  
  return {
    ...question,
    shuffleMap,
    shuffledCorrectAnswer,
    shuffledOptions,
  };
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
 */
export function shuffleQuestions(
  questions: Question[],
  userId?: string,
  sessionId?: string
): ShuffledQuestion[] {
  return questions.map(q => shuffleQuestionOptions(q, userId, sessionId));
}
