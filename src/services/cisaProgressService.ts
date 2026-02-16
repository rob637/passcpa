/**
 * CISA Progress Service
 * 
 * Tracks and calculates progress for Certified Information Systems Auditor exam preparation.
 * Provides readiness metrics for CISA Domains 1-5.
 *
 * Firestore collections:
 *   users/{uid}/cisa_progress/current — aggregate domain metrics
 *   users/{uid}/daily_log/{date}      — daily study activity
 *   users/{uid}/cisa_exams/{id}       — practice exam attempts
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
import { CISASectionId, CISA_SECTION_IDS, CISA_SECTION_CONFIG } from '../courses/cisa/config';
import logger from '../utils/logger';

// Re-export for downstream consumers
export type { CISASectionId };

// Types
export interface CISASectionProgress {
  sectionId: CISASectionId;
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

export interface CISAOverallProgress {
  overall: {
    readinessScore: number;
    progressPercent: number;
    totalQuestionsAttempted: number;
    overallAccuracy: number;
    totalStudyTimeMinutes: number;
    streakDays: number;
  };
  sections: Record<CISASectionId, CISASectionProgress>;
  examHistory: CISAExamAttempt[];
  recommendations: string[];
}

export interface CISAExamAttempt {
  id: string;
  sectionId: CISASectionId | 'FULL';
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

// Constants — CISA passing score is 450 out of 800 scaled, roughly 65-70%
export const CISA_PASSING_SCORE = 450;
export const CISA_PASSING_PERCENT = 70;

/**
 * Default section progress factory
 */
function defaultSectionProgress(sectionId: CISASectionId): CISASectionProgress {
  return {
    sectionId,
    questionsAttempted: 0,
    questionsCorrect: 0,
    accuracy: 0,
    lessonsCompleted: 0,
    totalLessons: 10,
    flashcardsReviewed: 0,
    examsTaken: 0,
    lastStudied: null,
    progressPercent: 0,
    readinessScore: 0,
    blueprintAreaProgress: {},
  };
}

/**
 * Get CISA progress for a user — reads from Firestore and computes metrics
 */
export async function getCISAProgress(userId: string): Promise<CISAOverallProgress> {
  try {
    const progress: CISAOverallProgress = {
      overall: {
        readinessScore: 0,
        progressPercent: 0,
        totalQuestionsAttempted: 0,
        overallAccuracy: 0,
        totalStudyTimeMinutes: 0,
        streakDays: 0,
      },
      sections: {
        CISA1: defaultSectionProgress('CISA1'),
        CISA2: defaultSectionProgress('CISA2'),
        CISA3: defaultSectionProgress('CISA3'),
        CISA4: defaultSectionProgress('CISA4'),
        CISA5: defaultSectionProgress('CISA5'),
      },
      examHistory: [],
      recommendations: [],
    };

    // ---- 1. Fetch stored progress document ----
    const progressRef = doc(db, 'users', userId, 'cisa_progress', 'current');
    const progressSnap = await getDoc(progressRef);

    if (progressSnap.exists()) {
      const data = progressSnap.data();

      if (data.sections) {
        for (const sectionId of CISA_SECTION_IDS) {
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
          if (activity.section?.startsWith('CISA')) {
            const sectionId = activity.section as CISASectionId;
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

    // ---- 3. Fetch CISA exam attempts ----
    const examsRef = collection(db, 'users', userId, 'cisa_exams');
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
        passingScore: CISA_PASSING_SCORE,
        passed: (exam.scaledScore || exam.score) >= CISA_PASSING_SCORE,
        questionsTotal: exam.questionsTotal,
        questionsCorrect: exam.questionsCorrect,
        timeSpentMinutes: exam.timeSpentMinutes,
        completedAt: exam.completedAt?.toDate?.() || new Date(),
      });

      const sectionId = exam.sectionId as CISASectionId;
      if (progress.sections[sectionId]) {
        progress.sections[sectionId].examsTaken++;
      }
    });

    // ---- 4. Calculate section metrics ----
    let totalQuestions = 0;
    let totalCorrect = 0;

    // Domain weights for weighted readiness: D1=21, D2=16, D3=18, D4=20, D5=25
    const domainWeights: Record<CISASectionId, number> = {
      CISA1: 21, CISA2: 16, CISA3: 18, CISA4: 20, CISA5: 25,
    };

    for (const sectionId of CISA_SECTION_IDS) {
      const section = progress.sections[sectionId];

      section.accuracy = section.questionsAttempted > 0
        ? Math.round((section.questionsCorrect / section.questionsAttempted) * 100)
        : 0;

      // Target ~300 questions per domain
      const targetQuestions = 300;
      section.progressPercent = Math.min(100, Math.round((section.questionsAttempted / targetQuestions) * 100));

      // Readiness = 60% accuracy + 40% coverage
      section.readinessScore = Math.round(
        (section.accuracy * 0.6) +
        (section.progressPercent * 0.4)
      );

      totalQuestions += section.questionsAttempted;
      totalCorrect += section.questionsCorrect;
    }

    // ---- 5. Calculate overall metrics (weighted by domain weights) ----
    progress.overall.totalQuestionsAttempted = totalQuestions;
    progress.overall.overallAccuracy = totalQuestions > 0
      ? Math.round((totalCorrect / totalQuestions) * 100)
      : 0;

    const totalWeight = Object.values(domainWeights).reduce((a, b) => a + b, 0);
    progress.overall.progressPercent = Math.round(
      CISA_SECTION_IDS.reduce((sum, id) =>
        sum + progress.sections[id].progressPercent * domainWeights[id], 0
      ) / totalWeight
    );

    progress.overall.readinessScore = Math.round(
      CISA_SECTION_IDS.reduce((sum, id) =>
        sum + progress.sections[id].readinessScore * domainWeights[id], 0
      ) / totalWeight
    );

    // ---- 6. Generate recommendations ----
    progress.recommendations = generateCISARecommendations(progress);

    return progress;
  } catch (error) {
    logger.error('Error fetching CISA progress:', error);
    throw error;
  }
}

/**
 * Generate personalized CISA recommendations
 */
function generateCISARecommendations(progress: CISAOverallProgress): string[] {
  const recommendations: string[] = [];

  const sections = CISA_SECTION_IDS.map(id => ({
    id,
    name: CISA_SECTION_CONFIG[id].shortTitle,
    weight: CISA_SECTION_CONFIG[id].weight,
    readiness: progress.sections[id].readinessScore,
    attempted: progress.sections[id].questionsAttempted,
  })).sort((a, b) => a.readiness - b.readiness);

  // Weakest high-weight domain
  if (sections[0].readiness < 60) {
    recommendations.push(
      `Focus on ${sections[0].name} (${sections[0].weight}% of exam) — readiness at ${sections[0].readiness}%`
    );
  }

  // Low accuracy
  if (progress.overall.overallAccuracy > 0 && progress.overall.overallAccuracy < CISA_PASSING_PERCENT) {
    recommendations.push(`Improve accuracy from ${progress.overall.overallAccuracy}% toward the ${CISA_PASSING_PERCENT}% target`);
  }

  // Domains not started
  for (const s of sections) {
    if (s.attempted === 0) {
      recommendations.push(`Start studying ${s.name} (Domain ${s.id.replace('CISA', '')}) — no questions attempted yet`);
      break;
    }
  }

  // Mock exams
  const totalExams = CISA_SECTION_IDS.reduce((sum, id) => sum + progress.sections[id].examsTaken, 0);
  if (totalExams < 3) {
    recommendations.push('Take more practice exams to build test-taking stamina');
  }

  // Study streak
  if (progress.overall.streakDays < 5) {
    recommendations.push('Build a consistent study habit — aim for 5+ day streaks');
  }

  if (recommendations.length === 0) {
    if (progress.overall.readinessScore >= 80) {
      recommendations.push('Excellent progress! Consider taking a full 150-question mock exam');
    } else {
      recommendations.push('Keep up the consistent practice across all 5 domains!');
    }
  }

  return recommendations.slice(0, 5);
}

/**
 * Save CISA exam attempt to Firestore
 */
export async function saveCISAExamAttempt(
  userId: string,
  attempt: Omit<CISAExamAttempt, 'id' | 'passingScore' | 'passed'>
): Promise<string> {
  try {
    const examsRef = collection(db, 'users', userId, 'cisa_exams');
    const examDoc = doc(examsRef);

    await setDoc(examDoc, {
      ...attempt,
      passingScore: CISA_PASSING_SCORE,
      passed: (attempt.scaledScore || attempt.score) >= CISA_PASSING_SCORE,
      completedAt: Timestamp.fromDate(attempt.completedAt),
    });

    return examDoc.id;
  } catch (error) {
    logger.error('Error saving CISA exam attempt:', error);
    throw error;
  }
}

/**
 * Update CISA progress in Firestore
 */
export async function updateCISAProgress(userId: string, sectionId: CISASectionId, updates: Partial<CISASectionProgress>): Promise<void> {
  try {
    const progressRef = doc(db, 'users', userId, 'cisa_progress', 'current');

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
    logger.error('Error updating CISA progress:', error);
    throw error;
  }
}
