/**
 * CIA Progress Service
 * 
 * Tracks and calculates progress for Certified Internal Auditor exam preparation.
 * Provides readiness metrics for CIA1, CIA2, and CIA3 sections.
 * 
 * Firestore collections:
 *   users/{uid}/cia_progress/current — aggregate section metrics
 *   users/{uid}/daily_log/{date}     — daily study activity
 *   users/{uid}/cia_exams/{id}       — practice exam attempts
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
import { CIASectionId, CIA_SECTIONS, CIA_SECTION_CONFIG } from '../courses/cia/config';
import logger from '../utils/logger';

// Re-export CIASectionId for downstream consumers that used to get it from here
export type { CIASectionId };

// Types
export interface CIASectionProgress {
  sectionId: CIASectionId;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
  lessonsCompleted: number;
  totalLessons: number;
  flashcardsReviewed: number;
  examsTaken: number;
  lastStudied: Date | null;
  progressPercent: number;
  readinessScore: number;
  blueprintAreaProgress: Record<string, {
    questionsAttempted: number;
    accuracy: number;
    progressPercent: number;
  }>;
}

export interface CIAOverallProgress {
  overall: {
    readinessScore: number;
    progressPercent: number;
    totalQuestionsAttempted: number;
    overallAccuracy: number;
    totalStudyTimeMinutes: number;
    streakDays: number;
  };
  sections: Record<CIASectionId, CIASectionProgress>;
  examHistory: CIAExamAttempt[];
  recommendations: string[];
}

export interface CIAExamAttempt {
  id: string;
  sectionId: CIASectionId;
  mode: 'full' | 'half' | 'quick' | 'mini';
  score: number;
  scaledScore: number;
  passingScore: number;
  passed: boolean;
  questionsTotal: number;
  questionsCorrect: number;
  timeSpentMinutes: number;
  completedAt: Date;
}

// Constants — CIA passing score is 600 out of 750 scaled
export const CIA_PASSING_SCORE = 600;
export const CIA_PASSING_PERCENT = 80;

/**
 * Default section progress factory
 */
function defaultSectionProgress(sectionId: CIASectionId): CIASectionProgress {
  return {
    sectionId,
    questionsAttempted: 0,
    questionsCorrect: 0,
    accuracy: 0,
    lessonsCompleted: 0,
    totalLessons: 4,
    flashcardsReviewed: 0,
    examsTaken: 0,
    lastStudied: null,
    progressPercent: 0,
    readinessScore: 0,
    blueprintAreaProgress: {},
  };
}

/**
 * Get CIA progress for a user — reads from Firestore and computes metrics
 */
export async function getCIAProgress(userId: string): Promise<CIAOverallProgress> {
  try {
    const progress: CIAOverallProgress = {
      overall: {
        readinessScore: 0,
        progressPercent: 0,
        totalQuestionsAttempted: 0,
        overallAccuracy: 0,
        totalStudyTimeMinutes: 0,
        streakDays: 0,
      },
      sections: {
        CIA1: defaultSectionProgress('CIA1'),
        CIA2: defaultSectionProgress('CIA2'),
        CIA3: defaultSectionProgress('CIA3'),
      },
      examHistory: [],
      recommendations: [],
    };

    // ---- 1. Fetch stored progress document ----
    const progressRef = doc(db, 'users', userId, 'cia_progress', 'current');
    const progressSnap = await getDoc(progressRef);

    if (progressSnap.exists()) {
      const data = progressSnap.data();

      if (data.sections) {
        for (const sectionId of CIA_SECTIONS) {
          if (data.sections[sectionId]) {
            progress.sections[sectionId] = {
              ...progress.sections[sectionId],
              ...data.sections[sectionId],
              lastStudied: data.sections[sectionId].lastStudied?.toDate?.() || null,
            };
          }
        }
      }
      if (data.overall) {
        progress.overall = { ...progress.overall, ...data.overall };
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
          if (activity.section?.startsWith('CIA')) {
            const sectionId = activity.section as CIASectionId;
            if (progress.sections[sectionId]) {
              progress.sections[sectionId].questionsAttempted++;
              if (activity.isCorrect) {
                progress.sections[sectionId].questionsCorrect++;
              }
              progress.sections[sectionId].lastStudied = new Date(activity.timestamp);
            }
          }
        }
      }
    });

    progress.overall.totalStudyTimeMinutes = totalStudyTime;
    progress.overall.streakDays = streakDays;

    // ---- 3. Fetch CIA exam attempts ----
    const examsRef = collection(db, 'users', userId, 'cia_exams');
    const examsQuery = query(examsRef, orderBy('completedAt', 'desc'), limit(20));
    const examsSnap = await getDocs(examsQuery);

    examsSnap.forEach((examDoc) => {
      const exam = examDoc.data();
      progress.examHistory.push({
        id: examDoc.id,
        sectionId: exam.sectionId,
        mode: exam.mode,
        score: exam.score,
        scaledScore: exam.scaledScore || 0,
        passingScore: CIA_PASSING_SCORE,
        passed: (exam.scaledScore || exam.score) >= CIA_PASSING_SCORE,
        questionsTotal: exam.questionsTotal,
        questionsCorrect: exam.questionsCorrect,
        timeSpentMinutes: exam.timeSpentMinutes,
        completedAt: exam.completedAt?.toDate?.() || new Date(),
      });

      const sectionId = exam.sectionId as CIASectionId;
      if (progress.sections[sectionId]) {
        progress.sections[sectionId].examsTaken++;
      }
    });

    // ---- 4. Calculate section metrics ----
    let totalQuestions = 0;
    let totalCorrect = 0;

    for (const sectionId of CIA_SECTIONS) {
      const section = progress.sections[sectionId];

      section.accuracy = section.questionsAttempted > 0
        ? Math.round((section.questionsCorrect / section.questionsAttempted) * 100)
        : 0;

      // Target ~400 questions per part
      const targetQuestions = 400;
      section.progressPercent = Math.min(100, Math.round((section.questionsAttempted / targetQuestions) * 100));

      // Readiness = 60% accuracy + 40% coverage
      section.readinessScore = Math.round(
        (section.accuracy * 0.6) +
        (section.progressPercent * 0.4)
      );

      totalQuestions += section.questionsAttempted;
      totalCorrect += section.questionsCorrect;
    }

    // ---- 5. Calculate overall metrics ----
    progress.overall.totalQuestionsAttempted = totalQuestions;
    progress.overall.overallAccuracy = totalQuestions > 0
      ? Math.round((totalCorrect / totalQuestions) * 100)
      : 0;

    progress.overall.progressPercent = Math.round(
      CIA_SECTIONS.reduce((sum, id) => sum + progress.sections[id].progressPercent, 0) / CIA_SECTIONS.length
    );

    progress.overall.readinessScore = Math.round(
      CIA_SECTIONS.reduce((sum, id) => sum + progress.sections[id].readinessScore, 0) / CIA_SECTIONS.length
    );

    // ---- 6. Generate recommendations ----
    progress.recommendations = generateCIARecommendations(progress);

    return progress;
  } catch (error) {
    logger.error('Error fetching CIA progress:', error);
    throw error;
  }
}

/**
 * Generate personalized CIA recommendations
 */
function generateCIARecommendations(progress: CIAOverallProgress): string[] {
  const recommendations: string[] = [];

  const sections = CIA_SECTIONS.map(id => ({
    id,
    name: CIA_SECTION_CONFIG[id].shortName,
    readiness: progress.sections[id].readinessScore,
    attempted: progress.sections[id].questionsAttempted,
  })).sort((a, b) => a.readiness - b.readiness);

  // Weakest part
  if (sections[0].readiness < 60) {
    recommendations.push(
      `Focus on Part ${sections[0].id.replace('CIA', '')} (${sections[0].name}) — your weakest section at ${sections[0].readiness}% readiness`
    );
  }

  // Low accuracy
  if (progress.overall.overallAccuracy > 0 && progress.overall.overallAccuracy < CIA_PASSING_PERCENT) {
    recommendations.push(`Improve accuracy from ${progress.overall.overallAccuracy}% toward the ${CIA_PASSING_PERCENT}% target`);
  }

  // Parts not started
  for (const s of sections) {
    if (s.attempted === 0) {
      recommendations.push(`Start studying ${s.name} (${s.id}) — no questions attempted yet`);
      break;
    }
  }

  // Mock exams
  const totalExams = CIA_SECTIONS.reduce((sum, id) => sum + progress.sections[id].examsTaken, 0);
  if (totalExams < 3) {
    recommendations.push('Take more practice exams to build test-taking stamina');
  }

  // Study streak
  if (progress.overall.streakDays < 5) {
    recommendations.push('Build a consistent study habit — aim for 5+ day streaks');
  }

  if (recommendations.length === 0) {
    if (progress.overall.readinessScore >= 80) {
      recommendations.push('Excellent progress! Consider taking a full practice exam');
    } else {
      recommendations.push('Keep up the consistent practice — you\'re making good progress!');
    }
  }

  return recommendations.slice(0, 5);
}

/**
 * Save CIA exam attempt to Firestore
 */
export async function saveCIAExamAttempt(
  userId: string,
  attempt: Omit<CIAExamAttempt, 'id' | 'passingScore' | 'passed'>
): Promise<string> {
  try {
    const examsRef = collection(db, 'users', userId, 'cia_exams');
    const examDoc = doc(examsRef);

    await setDoc(examDoc, {
      ...attempt,
      passingScore: CIA_PASSING_SCORE,
      passed: (attempt.scaledScore || attempt.score) >= CIA_PASSING_SCORE,
      completedAt: Timestamp.fromDate(attempt.completedAt),
    });

    return examDoc.id;
  } catch (error) {
    logger.error('Error saving CIA exam attempt:', error);
    throw error;
  }
}

/**
 * Update CIA section progress in Firestore
 */
export async function updateCIAProgress(
  userId: string,
  sectionId: CIASectionId,
  updates: Partial<CIASectionProgress>
): Promise<void> {
  try {
    const progressRef = doc(db, 'users', userId, 'cia_progress', 'current');

    await setDoc(progressRef, {
      sections: {
        [sectionId]: {
          ...updates,
          lastStudied: Timestamp.now(),
        },
      },
      updatedAt: Timestamp.now(),
    }, { merge: true });
  } catch (error) {
    logger.error('Error updating CIA section progress:', error);
    throw error;
  }
}
