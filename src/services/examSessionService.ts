/**
 * Exam Session Service
 * 
 * Saves and loads full exam sessions so users can review past exams,
 * including individual question answers and explanations.
 * 
 * Firestore path: users/{uid}/examSessions/{sessionId}
 */

import { db } from '../config/firebase';
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import logger from '../utils/logger';
import type { CourseId } from '../types/course';

/** Compact question record saved per exam session */
export interface ExamSessionQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer: number | undefined;
  explanation: string;
  topic: string;
  blueprintArea: string;
}

/** Summary of an exam session (for history list) */
export interface ExamSessionSummary {
  id: string;
  courseId: CourseId;
  section: string;
  mode: string;
  score: number;
  mcqScore: number;
  tbsScore: number;
  passed: boolean;
  passingScore: number;
  questionsTotal: number;
  questionsCorrect: number;
  questionsIncorrect: number;
  tbsTotal: number;
  tbsCorrect: number;
  timeSpentMinutes: number;
  completedAt: Date;
  mockExamName?: string;
}

/** Full exam session (includes question-level detail for review) */
export interface ExamSession extends ExamSessionSummary {
  questions: ExamSessionQuestion[];
  blueprintScores: Record<string, { correct: number; total: number }>;
}

/**
 * Save a completed exam session to Firestore.
 */
export async function saveExamSession(
  userId: string,
  session: Omit<ExamSession, 'id'>
): Promise<string> {
  const sessionId = `exam-${Date.now()}`;
  try {
    const sessionRef = doc(db, 'users', userId, 'examSessions', sessionId);
    await setDoc(sessionRef, {
      ...session,
      id: sessionId,
      completedAt: serverTimestamp(),
    });
    logger.info('Exam session saved:', sessionId);
  } catch (err) {
    logger.error('Failed to save exam session:', err);
  }
  return sessionId;
}

/**
 * Load recent exam sessions (summary only, no question detail).
 */
export async function getExamSessionHistory(
  userId: string,
  maxResults = 20
): Promise<ExamSessionSummary[]> {
  try {
    const sessionsRef = collection(db, 'users', userId, 'examSessions');
    const q = query(sessionsRef, orderBy('completedAt', 'desc'), limit(maxResults));
    const snap = await getDocs(q);

    return snap.docs.map(d => {
      const data = d.data();
      return {
        id: d.id,
        courseId: data.courseId,
        section: data.section,
        mode: data.mode,
        score: data.score,
        mcqScore: data.mcqScore,
        tbsScore: data.tbsScore,
        passed: data.passed,
        passingScore: data.passingScore,
        questionsTotal: data.questionsTotal,
        questionsCorrect: data.questionsCorrect,
        questionsIncorrect: data.questionsIncorrect,
        tbsTotal: data.tbsTotal,
        tbsCorrect: data.tbsCorrect,
        timeSpentMinutes: data.timeSpentMinutes,
        completedAt: data.completedAt?.toDate?.() || new Date(),
        mockExamName: data.mockExamName,
      };
    });
  } catch (err) {
    logger.error('Failed to load exam session history:', err);
    return [];
  }
}

/**
 * Load a single exam session with full question detail (for review).
 */
export async function getExamSession(
  userId: string,
  sessionId: string
): Promise<ExamSession | null> {
  try {
    const sessionRef = doc(db, 'users', userId, 'examSessions', sessionId);
    const snap = await getDoc(sessionRef);

    if (!snap.exists()) return null;

    const data = snap.data();
    return {
      id: snap.id,
      courseId: data.courseId,
      section: data.section,
      mode: data.mode,
      score: data.score,
      mcqScore: data.mcqScore,
      tbsScore: data.tbsScore,
      passed: data.passed,
      passingScore: data.passingScore,
      questionsTotal: data.questionsTotal,
      questionsCorrect: data.questionsCorrect,
      questionsIncorrect: data.questionsIncorrect,
      tbsTotal: data.tbsTotal,
      tbsCorrect: data.tbsCorrect,
      timeSpentMinutes: data.timeSpentMinutes,
      completedAt: data.completedAt?.toDate?.() || new Date(),
      mockExamName: data.mockExamName,
      questions: data.questions || [],
      blueprintScores: data.blueprintScores || {},
    };
  } catch (err) {
    logger.error('Failed to load exam session:', err);
    return null;
  }
}
