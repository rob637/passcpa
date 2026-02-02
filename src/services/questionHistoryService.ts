/**
 * Question History Service
 * 
 * Tracks which questions users have answered to:
 * 1. Prevent duplicate questions in short timeframes
 * 2. Prioritize questions they got wrong for spaced repetition
 * 3. Introduce new questions gradually
 * 4. Track mastery per topic
 * 
 * Data Structure in Firestore:
 * users/{uid}/question_history/{questionId} -> {
 *   questionId: string,
 *   timesAnswered: number,
 *   timesCorrect: number,
 *   lastAnswered: Timestamp,
 *   lastCorrect: boolean,
 *   masteryLevel: 'new' | 'learning' | 'reviewing' | 'mastered',
 *   nextReviewDate: Timestamp (for spaced repetition),
 *   topic: string,
 *   section: string,
 * }
 */

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  writeBatch,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import logger from '../utils/logger';

export interface QuestionHistoryEntry {
  questionId: string;
  timesAnswered: number;
  timesCorrect: number;
  lastAnswered: Date;
  lastCorrect: boolean;
  masteryLevel: 'new' | 'learning' | 'reviewing' | 'mastered';
  nextReviewDate: Date;
  topic: string;
  section: string;
}

export interface QuestionPerformance {
  questionId: string;
  isCorrect: boolean;
  topic: string;
  section: string;
  answeredAt?: Date;
}

// Spaced repetition intervals (in days)
const SPACED_INTERVALS = {
  new: 0,        // Show immediately
  learning: 1,   // Show next day
  reviewing: 3,  // Show in 3 days
  mastered: 7,   // Show weekly
};

// Threshold for mastery progression
const MASTERY_THRESHOLDS = {
  learning: 1,   // Answered at least once
  reviewing: 3,  // Answered 3+ times with >60% accuracy
  mastered: 5,   // Answered 5+ times with >80% accuracy
};

/**
 * Record a question answer and update history
 */
export const recordQuestionAnswer = async (
  userId: string,
  performance: QuestionPerformance
): Promise<void> => {
  if (!userId) return;

  const historyRef = doc(db, 'users', userId, 'question_history', performance.questionId);

  try {
    const existingDoc = await getDoc(historyRef);
    const now = new Date();
    
    if (existingDoc.exists()) {
      // Update existing history
      const existing = existingDoc.data() as QuestionHistoryEntry;
      const newTimesAnswered = existing.timesAnswered + 1;
      const newTimesCorrect = existing.timesCorrect + (performance.isCorrect ? 1 : 0);
      const accuracy = newTimesCorrect / newTimesAnswered;
      
      // Calculate new mastery level
      let masteryLevel: QuestionHistoryEntry['masteryLevel'] = 'learning';
      if (newTimesAnswered >= MASTERY_THRESHOLDS.mastered && accuracy >= 0.8) {
        masteryLevel = 'mastered';
      } else if (newTimesAnswered >= MASTERY_THRESHOLDS.reviewing && accuracy >= 0.6) {
        masteryLevel = 'reviewing';
      }
      
      // Calculate next review date based on mastery and correctness
      const intervalDays = performance.isCorrect 
        ? SPACED_INTERVALS[masteryLevel]
        : 0; // If wrong, show sooner
      
      const nextReviewDate = new Date(now);
      nextReviewDate.setDate(nextReviewDate.getDate() + intervalDays);
      
      await setDoc(historyRef, {
        ...existing,
        timesAnswered: newTimesAnswered,
        timesCorrect: newTimesCorrect,
        lastAnswered: Timestamp.fromDate(now),
        lastCorrect: performance.isCorrect,
        masteryLevel,
        nextReviewDate: Timestamp.fromDate(nextReviewDate),
      }, { merge: true });
    } else {
      // Create new history entry
      const nextReviewDate = new Date(now);
      nextReviewDate.setDate(nextReviewDate.getDate() + (performance.isCorrect ? 1 : 0));
      
      await setDoc(historyRef, {
        questionId: performance.questionId,
        timesAnswered: 1,
        timesCorrect: performance.isCorrect ? 1 : 0,
        lastAnswered: Timestamp.fromDate(now),
        lastCorrect: performance.isCorrect,
        masteryLevel: 'learning',
        nextReviewDate: Timestamp.fromDate(nextReviewDate),
        topic: performance.topic,
        section: performance.section,
      });
    }
    
    // Invalidate cache since we added a new question
    const cacheKey = `${userId}_${performance.section}`;
    answeredQuestionsCache.delete(cacheKey);
    answeredQuestionsCache.delete(`${userId}_all`);
    
    // Update the index document (async, fire-and-forget)
    const indexRef = doc(db, 'users', userId, 'indexes', `answered_${performance.section}`);
    setDoc(indexRef, {
      questionIds: arrayUnion(performance.questionId),
      updatedAt: Timestamp.now(),
    }, { merge: true }).catch(e => logger.error('Failed to update answered index:', e));
    
  } catch (error) {
    logger.error('Error recording question history:', error);
    throw error;
  }
};

/**
 * Record a TBS (Task-Based Simulation) result
 * Uses a simpler mastery model than questions (score based)
 */
export const recordTBSResult = async (
  userId: string,
  tbsId: string,
  score: number, // 0-100
  section: string,
  timeSpentSeconds: number
): Promise<void> => {
  if (!userId) return;

  try {
    const historyRef = doc(db, 'users', userId, 'tbs_history', tbsId);
    const docSnap = await getDoc(historyRef);
    const now = new Date();

    if (docSnap.exists()) {
      const data = docSnap.data();
      const newAttempts = (data.attempts || 0) + 1;
      const bestScore = Math.max(data.bestScore || 0, score);
      
      await setDoc(historyRef, {
        attempts: newAttempts,
        lastScore: score,
        bestScore,
        lastAttempted: Timestamp.fromDate(now),
        avgScore: ((data.avgScore || 0) * (newAttempts - 1) + score) / newAttempts,
        totalTimeSpent: (data.totalTimeSpent || 0) + timeSpentSeconds,
        mastered: bestScore >= 75
      }, { merge: true });
    } else {
      await setDoc(historyRef, {
        tbsId,
        section,
        attempts: 1,
        lastScore: score,
        bestScore: score,
        avgScore: score,
        lastAttempted: Timestamp.fromDate(now),
        totalTimeSpent: timeSpentSeconds,
        mastered: score >= 75
      });
    }
  } catch (error) {
    logger.error('Error recording TBS history:', error);
  }
};

/**
 * Record multiple question answers in a batch (for end of practice session)
 */
export const recordQuestionBatch = async (
  userId: string,
  performances: QuestionPerformance[]
): Promise<void> => {
  if (!userId || performances.length === 0) return;

  const batch = writeBatch(db);
  const now = new Date();

  for (const performance of performances) {
    const historyRef = doc(db, 'users', userId, 'question_history', performance.questionId);
    
    // For batches, we do simpler upsert logic
    // In production, you might want to fetch existing docs first for accurate counts
    const nextReviewDate = new Date(now);
    nextReviewDate.setDate(nextReviewDate.getDate() + (performance.isCorrect ? 1 : 0));
    
    batch.set(historyRef, {
      questionId: performance.questionId,
      lastAnswered: Timestamp.fromDate(performance.answeredAt || now),
      lastCorrect: performance.isCorrect,
      topic: performance.topic,
      section: performance.section,
      nextReviewDate: Timestamp.fromDate(nextReviewDate),
    }, { merge: true });
  }

  try {
    await batch.commit();
  } catch (error) {
    logger.error('Error recording question batch:', error);
    throw error;
  }
};

/**
 * Get questions due for review (spaced repetition)
 */
export const getDueQuestions = async (
  userId: string,
  section: string,
  maxCount: number = 20
): Promise<string[]> => {
  if (!userId) return [];

  try {
    const historyRef = collection(db, 'users', userId, 'question_history');
    const now = Timestamp.fromDate(new Date());
    
    const q = query(
      historyRef,
      where('section', '==', section),
      where('nextReviewDate', '<=', now),
      orderBy('nextReviewDate', 'asc'),
      limit(maxCount)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.id);
  } catch (error) {
    logger.error('Error fetching due questions:', error);
    return [];
  }
};

/**
 * Get questions the user got wrong recently (for reinforcement)
 */
export const getRecentlyIncorrect = async (
  userId: string,
  section: string,
  daysBack: number = 7,
  maxCount: number = 15
): Promise<string[]> => {
  if (!userId) return [];

  try {
    const historyRef = collection(db, 'users', userId, 'question_history');
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
    
    const q = query(
      historyRef,
      where('section', '==', section),
      where('lastCorrect', '==', false),
      where('lastAnswered', '>=', Timestamp.fromDate(cutoffDate)),
      orderBy('lastAnswered', 'desc'),
      limit(maxCount)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.id);
  } catch (error) {
    logger.error('Error fetching recently incorrect questions:', error);
    return [];
  }
};

// In-memory cache for answered question IDs (avoids repeated Firestore reads)
const answeredQuestionsCache: Map<string, { ids: Set<string>; timestamp: number }> = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Get all question IDs the user has answered (for exclusion from "new" pools)
 * Uses an index document + in-memory cache to avoid the "Reads Bomb"
 */
export const getAnsweredQuestionIds = async (
  userId: string,
  section?: string
): Promise<Set<string>> => {
  if (!userId) return new Set();

  const cacheKey = `${userId}_${section || 'all'}`;
  const cached = answeredQuestionsCache.get(cacheKey);
  
  // Return from cache if fresh
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.ids;
  }

  try {
    // Try index document first (single read vs N reads)
    const indexRef = doc(db, 'users', userId, 'indexes', `answered_${section || 'all'}`);
    const indexSnap = await getDoc(indexRef);
    
    if (indexSnap.exists()) {
      const data = indexSnap.data();
      const ids = new Set<string>(data.questionIds || []);
      answeredQuestionsCache.set(cacheKey, { ids, timestamp: Date.now() });
      return ids;
    }
    
    // Fallback: Build from individual docs (one-time migration)
    const historyRef = collection(db, 'users', userId, 'question_history');
    let q;
    if (section) {
      q = query(historyRef, where('section', '==', section));
    } else {
      q = historyRef;
    }
    
    const snapshot = await getDocs(q);
    const ids = new Set(snapshot.docs.map(doc => doc.id));
    
    // Cache it
    answeredQuestionsCache.set(cacheKey, { ids, timestamp: Date.now() });
    
    // Async: Create the index document for next time (fire-and-forget)
    setDoc(indexRef, { 
      questionIds: Array.from(ids),
      updatedAt: Timestamp.now(),
      count: ids.size
    }).catch(e => logger.error('Failed to create answered index:', e));
    
    return ids;
  } catch (error) {
    logger.error('Error fetching answered questions:', error);
    return new Set();
  }
};

export interface TBSHistoryEntry {
  tbsId: string;
  section: string;
  attempts: number;
  bestScore: number;
  lastScore: number;
  avgScore: number;
  lastAttempted: Date; // Timestamp in DB
  totalTimeSpent: number;
  mastered: boolean;
}

/**
 * Get TBS performance mastery stats by topic (inferred from TBS metadata if possible, else raw list)
 * Since TBS metadata might not be in Firestore, we return list of TBS history entries
 */
export const getTBSHistory = async (userId: string, section?: string): Promise<TBSHistoryEntry[]> => {
  if (!userId) return [];

  try {
    const historyRef = collection(db, 'users', userId, 'tbs_history');
    let q;
    if (section) {
      q = query(historyRef, where('section', '==', section));
    } else {
      q = query(historyRef);
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            tbsId: doc.id,
            section: data.section,
            attempts: data.attempts,
            bestScore: data.bestScore,
            lastScore: data.lastScore,
            avgScore: data.avgScore,
            lastAttempted: data.lastAttempted?.toDate?.() || new Date(),
            totalTimeSpent: data.totalTimeSpent,
            mastered: data.mastered
        } as TBSHistoryEntry;
    });
  } catch (error) {
    logger.error('Error fetching TBS history:', error);
    return [];
  }
};

/**
 * Get topic performance from question history (more accurate than daily logs)
 */
export const getTopicPerformanceFromHistory = async (
  userId: string,
  section: string
): Promise<Map<string, { correct: number; total: number; accuracy: number }>> => {
  if (!userId) return new Map();

  try {
    const historyRef = collection(db, 'users', userId, 'question_history');
    const q = query(historyRef, where('section', '==', section));
    
    const snapshot = await getDocs(q);
    const topicStats = new Map<string, { correct: number; total: number; accuracy: number }>();
    
    snapshot.forEach(doc => {
      const data = doc.data() as QuestionHistoryEntry;
      const existing = topicStats.get(data.topic) || { correct: 0, total: 0, accuracy: 0 };
      
      existing.correct += data.timesCorrect;
      existing.total += data.timesAnswered;
      existing.accuracy = existing.total > 0 ? (existing.correct / existing.total) * 100 : 0;
      
      topicStats.set(data.topic, existing);
    });
    
    return topicStats;
  } catch (error) {
    logger.error('Error fetching topic performance:', error);
    return new Map();
  }
};

/**
 * Get fresh questions (never answered by this user)
 * This is the key to preventing repetition!
 */
export const getFreshQuestions = async (
  userId: string,
  section: string,
  allQuestionIds: string[],
  maxCount: number = 10
): Promise<string[]> => {
  const answeredIds = await getAnsweredQuestionIds(userId, section);
  
  // Filter out already-answered questions
  const fresh = allQuestionIds.filter(id => !answeredIds.has(id));
  
  // Return up to maxCount fresh questions
  return fresh.slice(0, maxCount);
};

/**
 * Get smart question selection for practice
 * Mix of: due for review, recently incorrect, fresh
 * Weights adapt based on exam proximity:
 *   - Normal: 40% due, 30% incorrect, 30% fresh
 *   - Crunch time (<14 days): 50% due, 35% incorrect, 15% fresh (focus on retention)
 *   - Final week (<7 days): 60% due, 30% incorrect, 10% fresh (maximum review)
 */
export const getSmartQuestionSelection = async (
  userId: string,
  section: string,
  allQuestionIds: string[],
  targetCount: number = 15,
  examDate?: string // Optional exam date for adaptive weights
): Promise<{ questionIds: string[]; breakdown: { due: number; incorrect: number; fresh: number } }> => {
  // Calculate adaptive weights based on exam proximity
  let dueWeight = 0.4;
  let incorrectWeight = 0.3;
  let freshWeight = 0.3;
  
  if (examDate) {
    const daysUntilExam = Math.ceil(
      (new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysUntilExam <= 7) {
      // Final week: Heavy review mode
      dueWeight = 0.6;
      incorrectWeight = 0.3;
      freshWeight = 0.1;
    } else if (daysUntilExam <= 14) {
      // Crunch time: Focus on retention
      dueWeight = 0.5;
      incorrectWeight = 0.35;
      freshWeight = 0.15;
    }
  }
  
  const dueCount = Math.ceil(targetCount * dueWeight);
  const incorrectCount = Math.ceil(targetCount * incorrectWeight);
  const freshCount = Math.ceil(targetCount * freshWeight);
  
  // Fetch from each category
  const [dueQuestions, incorrectQuestions, freshQuestions] = await Promise.all([
    getDueQuestions(userId, section, dueCount),
    getRecentlyIncorrect(userId, section, 7, incorrectCount),
    getFreshQuestions(userId, section, allQuestionIds, freshCount + 10), // Get extra fresh in case we need to fill
  ]);
  
  // Combine and deduplicate
  const selected = new Set<string>();
  
  // Add due questions first (highest priority)
  dueQuestions.forEach(id => selected.add(id));
  
  // Add incorrect questions (if not already in due)
  incorrectQuestions.forEach(id => {
    if (selected.size < targetCount) {
      selected.add(id);
    }
  });
  
  // Fill remaining with fresh questions
  freshQuestions.forEach(id => {
    if (selected.size < targetCount) {
      selected.add(id);
    }
  });
  
  // If still not enough, add random from all questions
  if (selected.size < targetCount) {
    const shuffled = [...allQuestionIds].sort(() => Math.random() - 0.5);
    for (const id of shuffled) {
      if (selected.size >= targetCount) break;
      selected.add(id);
    }
  }
  
  return {
    questionIds: Array.from(selected),
    breakdown: {
      due: Math.min(dueQuestions.length, dueCount),
      incorrect: Math.min(incorrectQuestions.length, incorrectCount),
      fresh: Math.min(freshQuestions.length, freshCount),
    },
  };
};

export default {
  recordQuestionAnswer,
  recordQuestionBatch,
  getDueQuestions,
  getRecentlyIncorrect,
  getAnsweredQuestionIds,
  getTopicPerformanceFromHistory,
  getFreshQuestions,
  getSmartQuestionSelection,
  recordTBSResult,
  getTBSHistory,
};
