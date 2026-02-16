/**
 * CFP Progress Service
 *
 * Tracks and calculates progress for Certified Financial Planner exam preparation.
 * Provides readiness metrics across all 8 CFP domains.
 *
 * Firestore collections:
 *   users/{uid}/cfp_progress/current — aggregate domain metrics
 *   users/{uid}/daily_log/{date}     — daily study activity
 *   users/{uid}/cfp_exams/{id}       — practice exam attempts
 */

import { db } from '../config/firebase';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { CFP_SECTIONS } from '../courses/cfp/config';
import logger from '../utils/logger';

export type CFPSectionId = string;

// All CFP section IDs derived from config
const CFP_SECTION_IDS: string[] = CFP_SECTIONS.map(s => s.id);

export interface CFPSectionProgress {
  sectionId: CFPSectionId;
  answeredCount: number;
  correctCount: number;
  score: number;
  lessonsCompleted: number;
  totalLessons: number;
  examsTaken: number;
  lastStudied: string; // ISO Date
  progressPercent: number;
  readinessScore: number;
}

export interface CFPOverallProgress {
  overallAccuracy: number;
  totalQuestionsAttempted: number;
  streakDays: number;
  readinessScore: number;
  progressPercent: number;
  totalStudyTimeMinutes: number;
  sectionProgress: Record<CFPSectionId, CFPSectionProgress>;
  examHistory: CFPExamAttempt[];
  recommendations: string[];
}

export interface CFPExamAttempt {
  id: string;
  mode: 'full' | 'half' | 'quick' | 'mini';
  score: number;
  passingScore: number;
  passed: boolean;
  questionsTotal: number;
  questionsCorrect: number;
  timeSpentMinutes: number;
  completedAt: Date;
}

// CFP passing threshold is approximately 70%
export const CFP_PASSING_PERCENT = 70;

/**
 * Default section progress factory
 */
function defaultSectionProgress(sectionId: string): CFPSectionProgress {
  return {
    sectionId,
    answeredCount: 0,
    correctCount: 0,
    score: 0,
    lessonsCompleted: 0,
    totalLessons: 8,
    examsTaken: 0,
    lastStudied: new Date().toISOString(),
    progressPercent: 0,
    readinessScore: 0,
  };
}

/**
 * Get CFP progress for a user — reads from Firestore and computes metrics
 */
export async function getCFPProgress(userId: string): Promise<CFPOverallProgress> {
  try {
    // Build initial progress structure
    const sectionProgress: Record<string, CFPSectionProgress> = {};
    for (const section of CFP_SECTIONS) {
      sectionProgress[section.id] = defaultSectionProgress(section.id);
    }

    const progress: CFPOverallProgress = {
      overallAccuracy: 0,
      totalQuestionsAttempted: 0,
      streakDays: 0,
      readinessScore: 0,
      progressPercent: 0,
      totalStudyTimeMinutes: 0,
      sectionProgress,
      examHistory: [],
      recommendations: [],
    };

    // ---- 1. Fetch stored progress document ----
    const progressRef = doc(db, 'users', userId, 'cfp_progress', 'current');
    const progressSnap = await getDoc(progressRef);

    if (progressSnap.exists()) {
      const data = progressSnap.data();

      if (data.sectionProgress) {
        for (const sectionId of CFP_SECTION_IDS) {
          if (data.sectionProgress[sectionId]) {
            progress.sectionProgress[sectionId] = {
              ...progress.sectionProgress[sectionId],
              ...data.sectionProgress[sectionId],
            };
          }
        }
      }
    }

    // ---- 2. Fetch recent daily logs ----
    const logsRef = collection(db, 'users', userId, 'daily_log');
    const logsQuery = query(logsRef, orderBy('date', 'desc'), limit(30));
    const logsSnap = await getDocs(logsQuery);

    let totalStudyTime = 0;
    let streakDays = 0;
    let streakBroken = false;

    logsSnap.forEach((logDoc) => {
      const log = logDoc.data();
      totalStudyTime += log.studyTimeMinutes || 0;

      if (!streakBroken && (log.earnedPoints || 0) > 0) {
        streakDays++;
      } else if ((log.earnedPoints || 0) === 0) {
        streakBroken = true;
      }

      if (log.activities) {
        for (const activity of log.activities) {
          const sectionId = activity.section as string;
          if (sectionId && progress.sectionProgress[sectionId]) {
            progress.sectionProgress[sectionId].answeredCount++;
            if (activity.isCorrect) {
              progress.sectionProgress[sectionId].correctCount++;
            }
            progress.sectionProgress[sectionId].lastStudied = activity.timestamp || new Date().toISOString();
          }
        }
      }
    });

    progress.totalStudyTimeMinutes = totalStudyTime;
    progress.streakDays = streakDays;

    // ---- 3. Fetch CFP exam attempts ----
    const examsRef = collection(db, 'users', userId, 'cfp_exams');
    const examsQuery = query(examsRef, orderBy('completedAt', 'desc'), limit(10));
    const examsSnap = await getDocs(examsQuery);

    examsSnap.forEach((examDoc) => {
      const exam = examDoc.data();
      progress.examHistory.push({
        id: examDoc.id,
        mode: exam.mode,
        score: exam.score,
        passingScore: CFP_PASSING_PERCENT,
        passed: exam.score >= CFP_PASSING_PERCENT,
        questionsTotal: exam.questionsTotal,
        questionsCorrect: exam.questionsCorrect,
        timeSpentMinutes: exam.timeSpentMinutes,
        completedAt: exam.completedAt?.toDate?.() || new Date(),
      });
    });

    // ---- 4. Calculate section metrics ----
    let totalAnswered = 0;
    let totalCorrect = 0;

    for (const sectionId of CFP_SECTION_IDS) {
      const section = progress.sectionProgress[sectionId];

      section.score = section.answeredCount > 0
        ? Math.round((section.correctCount / section.answeredCount) * 100)
        : 0;

      // Target ~200 questions per domain
      const targetQuestions = 200;
      section.progressPercent = Math.min(100, Math.round((section.answeredCount / targetQuestions) * 100));

      // Readiness = 60% accuracy + 40% coverage
      section.readinessScore = Math.round(
        (section.score * 0.6) +
        (section.progressPercent * 0.4)
      );

      totalAnswered += section.answeredCount;
      totalCorrect += section.correctCount;
    }

    // ---- 5. Calculate overall metrics ----
    progress.totalQuestionsAttempted = totalAnswered;
    progress.overallAccuracy = totalAnswered > 0
      ? Math.round((totalCorrect / totalAnswered) * 100)
      : 0;

    progress.progressPercent = Math.round(
      CFP_SECTION_IDS.reduce((sum, id) => sum + progress.sectionProgress[id].progressPercent, 0) / CFP_SECTION_IDS.length
    );

    progress.readinessScore = Math.round(
      CFP_SECTION_IDS.reduce((sum, id) => sum + progress.sectionProgress[id].readinessScore, 0) / CFP_SECTION_IDS.length
    );

    // ---- 6. Generate recommendations ----
    progress.recommendations = generateCFPRecommendations(progress);

    return progress;
  } catch (error) {
    logger.error('Error fetching CFP progress:', error);
    throw error;
  }
}

/**
 * Generate personalized CFP recommendations
 */
function generateCFPRecommendations(progress: CFPOverallProgress): string[] {
  const recommendations: string[] = [];

  const sections = CFP_SECTIONS.map(cfg => ({
    id: cfg.id,
    name: cfg.shortName,
    weight: cfg.weight,
    readiness: progress.sectionProgress[cfg.id]?.readinessScore || 0,
    attempted: progress.sectionProgress[cfg.id]?.answeredCount || 0,
  })).sort((a, b) => a.readiness - b.readiness);

  // Weakest domain
  if (sections[0].readiness < 60) {
    recommendations.push(
      `Focus on ${sections[0].name} (${sections[0].weight} of exam) — readiness at ${sections[0].readiness}%`
    );
  }

  // Low accuracy
  if (progress.overallAccuracy > 0 && progress.overallAccuracy < CFP_PASSING_PERCENT) {
    recommendations.push(`Improve accuracy from ${progress.overallAccuracy}% toward the ${CFP_PASSING_PERCENT}% target`);
  }

  // Domains not started
  for (const s of sections) {
    if (s.attempted === 0) {
      recommendations.push(`Start studying ${s.name} — no questions attempted yet`);
      break;
    }
  }

  // Mock exams
  if (progress.examHistory.length < 2) {
    recommendations.push('Take practice exams to assess your overall readiness');
  }

  // Study streak
  if (progress.streakDays < 5) {
    recommendations.push('Build a consistent study habit — aim for 5+ day streaks');
  }

  if (recommendations.length === 0) {
    if (progress.readinessScore >= 80) {
      recommendations.push('Excellent progress! Consider a full 170-question practice exam');
    } else {
      recommendations.push('Keep up your balanced study across all CFP domains!');
    }
  }

  return recommendations.slice(0, 5);
}

/**
 * Save CFP exam attempt to Firestore
 */
export async function saveCFPExamAttempt(
  userId: string,
  attempt: Omit<CFPExamAttempt, 'id' | 'passingScore' | 'passed'>
): Promise<string> {
  try {
    const examsRef = collection(db, 'users', userId, 'cfp_exams');
    const examDoc = doc(examsRef);

    await setDoc(examDoc, {
      ...attempt,
      passingScore: CFP_PASSING_PERCENT,
      passed: attempt.score >= CFP_PASSING_PERCENT,
      completedAt: Timestamp.fromDate(attempt.completedAt),
    });

    return examDoc.id;
  } catch (error) {
    logger.error('Error saving CFP exam attempt:', error);
    throw error;
  }
}

/**
 * Update CFP progress in Firestore
 */
export async function updateCFPProgress(
  userId: string,
  sectionId: string,
  updates: Partial<CFPSectionProgress>
): Promise<void> {
  try {
    const progressRef = doc(db, 'users', userId, 'cfp_progress', 'current');

    await setDoc(progressRef, {
      sectionProgress: {
        [sectionId]: {
          ...updates,
          lastStudied: new Date().toISOString(),
        },
      },
      updatedAt: Timestamp.now(),
    }, { merge: true });
  } catch (error) {
    logger.error('Error updating CFP progress:', error);
    throw error;
  }
}
