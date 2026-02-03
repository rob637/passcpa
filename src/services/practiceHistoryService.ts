/**
 * Practice Session History Service
 * 
 * Stores and retrieves practice test attempt history for display like Becker's "Attempts List"
 */

import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import logger from '../utils/logger';

export interface PracticeSession {
  id: string;
  userId: string;
  section: string;
  mode: 'study' | 'timed' | 'exam' | 'weak';
  questionCount: number;
  correctCount: number;
  accuracy: number;
  timeSpentSeconds: number;
  completedAt: Date;
  blueprintArea?: string;
  difficulty?: string;
  // Optional details for drill-down
  questionIds?: string[];
}

/**
 * Save a practice session result
 */
export const savePracticeSession = async (
  userId: string,
  sessionData: Omit<PracticeSession, 'id' | 'userId' | 'completedAt'>
): Promise<string> => {
  try {
    const sessionId = `practice-${Date.now()}`;
    const sessionRef = doc(db, 'users', userId, 'practice_sessions', sessionId);
    
    await setDoc(sessionRef, {
      ...sessionData,
      id: sessionId,
      userId,
      completedAt: Timestamp.now(),
    });
    
    logger.info('Practice session saved:', sessionId);
    return sessionId;
  } catch (error) {
    logger.error('Error saving practice session:', error);
    throw error;
  }
};

/**
 * Get recent practice sessions for a user
 */
export const getPracticeSessions = async (
  userId: string,
  maxResults: number = 10
): Promise<PracticeSession[]> => {
  try {
    const sessionsRef = collection(db, 'users', userId, 'practice_sessions');
    const q = query(sessionsRef, orderBy('completedAt', 'desc'), limit(maxResults));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        completedAt: data.completedAt?.toDate?.() || new Date(data.completedAt),
      } as PracticeSession;
    });
  } catch (error) {
    logger.error('Error fetching practice sessions:', error);
    return [];
  }
};

/**
 * Get practice sessions filtered by section
 */
export const getPracticeSessionsBySection = async (
  userId: string,
  section: string,
  maxResults: number = 10
): Promise<PracticeSession[]> => {
  const allSessions = await getPracticeSessions(userId, maxResults * 2);
  return allSessions.filter(s => s.section === section).slice(0, maxResults);
};
