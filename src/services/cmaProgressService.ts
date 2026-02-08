/**
 * CMA Progress Service
 * 
 * Tracks and calculates progress for Certified Management Accountant exam preparation.
 * Provides readiness metrics for CMA1 and CMA2 sections.
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
import { CMASectionId, CMA_SECTION_CONFIG } from '../courses/cma';
import logger from '../utils/logger';

// Types
export interface CMASectionProgress {
  sectionId: CMASectionId;
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

export interface CMAOverallProgress {
  overall: {
    readinessScore: number;
    progressPercent: number;
    totalQuestionsAttempted: number;
    overallAccuracy: number;
    totalStudyTimeMinutes: number;
    streakDays: number;
  };
  sections: Record<CMASectionId, CMASectionProgress>;
  examHistory: CMAExamAttempt[];
  recommendations: string[];
}

export interface CMAExamAttempt {
  id: string;
  sectionId: CMASectionId;
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

// Constants
const CMA_PASSING_SCORE = 360; // Out of 500 scaled score
const CMA_PASSING_PERCENT = Math.round((CMA_PASSING_SCORE / 500) * 100); // 72%

/**
 * Get CMA progress for a user
 */
export async function getCMAProgress(userId: string): Promise<CMAOverallProgress> {
  try {
    // Initialize default progress
    const defaultSectionProgress = (sectionId: CMASectionId): CMASectionProgress => ({
      sectionId,
      questionsAttempted: 0,
      questionsCorrect: 0,
      accuracy: 0,
      lessonsCompleted: 0,
      totalLessons: 6, // 6 blueprint areas per section
      flashcardsReviewed: 0,
      examsTaken: 0,
      lastStudied: null,
      progressPercent: 0,
      readinessScore: 0,
      blueprintAreaProgress: {},
    });

    const progress: CMAOverallProgress = {
      overall: {
        readinessScore: 0,
        progressPercent: 0,
        totalQuestionsAttempted: 0,
        overallAccuracy: 0,
        totalStudyTimeMinutes: 0,
        streakDays: 0,
      },
      sections: {
        CMA1: defaultSectionProgress('CMA1'),
        CMA2: defaultSectionProgress('CMA2'),
      },
      examHistory: [],
      recommendations: [],
    };

    // Fetch user's CMA progress document
    const progressRef = doc(db, 'users', userId, 'cma_progress', 'current');
    const progressSnap = await getDoc(progressRef);

    if (progressSnap.exists()) {
      const data = progressSnap.data();
      
      // Merge stored progress
      if (data.sections) {
        for (const sectionId of ['CMA1', 'CMA2'] as CMASectionId[]) {
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

    // Fetch recent daily logs to calculate activity
    const logsRef = collection(db, 'users', userId, 'daily_log');
    const logsQuery = query(logsRef, orderBy('date', 'desc'), limit(30));
    const logsSnap = await getDocs(logsQuery);

    let totalStudyTime = 0;
    let streakDays = 0;
    let streakBroken = false;

    logsSnap.forEach((doc) => {
      const log = doc.data();
      totalStudyTime += log.studyTimeMinutes || 0;
      
      // Count streak
      if (!streakBroken && (log.earnedPoints || 0) > 0) {
        streakDays++;
      } else if ((log.earnedPoints || 0) === 0) {
        streakBroken = true;
      }

      // Check for CMA activities
      if (log.activities) {
        for (const activity of log.activities) {
          if (activity.section?.startsWith('CMA')) {
            const sectionId = activity.section as CMASectionId;
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

    // Fetch CMA exam attempts
    const examsRef = collection(db, 'users', userId, 'cma_exams');
    const examsQuery = query(examsRef, orderBy('completedAt', 'desc'), limit(10));
    const examsSnap = await getDocs(examsQuery);

    examsSnap.forEach((doc) => {
      const exam = doc.data();
      progress.examHistory.push({
        id: doc.id,
        sectionId: exam.sectionId,
        mode: exam.mode,
        score: exam.score,
        scaledScore: exam.scaledScore || Math.round((exam.score / 100) * 500),
        passingScore: CMA_PASSING_SCORE,
        passed: (exam.scaledScore || Math.round((exam.score / 100) * 500)) >= CMA_PASSING_SCORE,
        questionsTotal: exam.questionsTotal,
        questionsCorrect: exam.questionsCorrect,
        timeSpentMinutes: exam.timeSpentMinutes,
        completedAt: exam.completedAt?.toDate?.() || new Date(),
      });

      // Update section exam count
      if (progress.sections[exam.sectionId as CMASectionId]) {
        progress.sections[exam.sectionId as CMASectionId].examsTaken++;
      }
    });

    // Calculate section metrics
    let totalQuestions = 0;
    let totalCorrect = 0;

    for (const sectionId of ['CMA1', 'CMA2'] as CMASectionId[]) {
      const section = progress.sections[sectionId];
      
      // Calculate accuracy
      section.accuracy = section.questionsAttempted > 0
        ? Math.round((section.questionsCorrect / section.questionsAttempted) * 100)
        : 0;

      // Calculate progress percent (questions attempted as % of target ~500 per section)
      const targetQuestions = 500;
      section.progressPercent = Math.min(100, Math.round((section.questionsAttempted / targetQuestions) * 100));

      // Calculate readiness score (weighted: 60% accuracy, 40% coverage)
      section.readinessScore = Math.round(
        (section.accuracy * 0.6) + 
        (section.progressPercent * 0.4)
      );

      totalQuestions += section.questionsAttempted;
      totalCorrect += section.questionsCorrect;
    }

    // Calculate overall metrics
    progress.overall.totalQuestionsAttempted = totalQuestions;
    progress.overall.overallAccuracy = totalQuestions > 0
      ? Math.round((totalCorrect / totalQuestions) * 100)
      : 0;

    progress.overall.progressPercent = Math.round(
      (progress.sections.CMA1.progressPercent +
       progress.sections.CMA2.progressPercent) / 2
    );

    progress.overall.readinessScore = Math.round(
      (progress.sections.CMA1.readinessScore +
       progress.sections.CMA2.readinessScore) / 2
    );

    // Generate recommendations
    progress.recommendations = generateRecommendations(progress);

    return progress;
  } catch (error) {
    logger.error('Error fetching CMA progress:', error);
    throw error;
  }
}

/**
 * Save CMA exam attempt
 */
export async function saveCMAExamAttempt(
  userId: string,
  attempt: Omit<CMAExamAttempt, 'id' | 'passingScore' | 'passed'>
): Promise<string> {
  try {
    const examsRef = collection(db, 'users', userId, 'cma_exams');
    const examDoc = doc(examsRef);
    
    await setDoc(examDoc, {
      ...attempt,
      passingScore: CMA_PASSING_SCORE,
      passed: attempt.scaledScore >= CMA_PASSING_SCORE,
      completedAt: Timestamp.fromDate(attempt.completedAt),
    });

    return examDoc.id;
  } catch (error) {
    logger.error('Error saving CMA exam attempt:', error);
    throw error;
  }
}

/**
 * Update section progress
 */
export async function updateCMASectionProgress(
  userId: string,
  sectionId: CMASectionId,
  updates: Partial<CMASectionProgress>
): Promise<void> {
  try {
    const progressRef = doc(db, 'users', userId, 'cma_progress', 'current');
    
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
    logger.error('Error updating CMA section progress:', error);
    throw error;
  }
}

/**
 * Generate study recommendations based on progress
 */
function generateRecommendations(progress: CMAOverallProgress): string[] {
  const recommendations: string[] = [];
  
  // Find weakest section
  const sections = Object.values(progress.sections);
  const weakestSection = sections.reduce((min, s) => 
    s.readinessScore < min.readinessScore ? s : min
  );
  
  if (weakestSection.readinessScore < 60) {
    const config = CMA_SECTION_CONFIG[weakestSection.sectionId];
    recommendations.push(`Focus on ${config.shortName}: ${config.name} - your weakest area at ${weakestSection.readinessScore}% readiness`);
  }

  // Check for low accuracy
  if (progress.overall.overallAccuracy > 0 && progress.overall.overallAccuracy < CMA_PASSING_PERCENT) {
    recommendations.push(`Improve accuracy from ${progress.overall.overallAccuracy}% to ${CMA_PASSING_PERCENT}%+ to pass`);
  }

  // Check for lack of practice exams
  const totalExams = sections.reduce((sum, s) => sum + s.examsTaken, 0);
  if (totalExams < 2) {
    recommendations.push('Take more practice exams to build test-taking stamina');
  }

  // Check study consistency
  if (progress.overall.streakDays < 5) {
    recommendations.push('Build a consistent study habit - aim for 5+ day streaks');
  }

  // Check even distribution
  const progressSpread = Math.abs(
    progress.sections.CMA1.progressPercent - 
    progress.sections.CMA2.progressPercent
  );
  if (progressSpread > 30) {
    recommendations.push('Balance your study across both parts for comprehensive coverage');
  }

  // CMA-specific: Essay recommendation
  if (progress.overall.progressPercent > 50) {
    recommendations.push('Practice essay responses - CMA includes 2 essay questions per part');
  }

  // Default recommendation
  if (recommendations.length === 0) {
    if (progress.overall.readinessScore >= 80) {
      recommendations.push('Excellent progress! Consider taking a full practice exam');
    } else {
      recommendations.push('Keep up the consistent practice - you\'re making good progress!');
    }
  }

  return recommendations.slice(0, 3); // Max 3 recommendations
}

/**
 * Get readiness status text
 */
export function getCMAReadinessStatus(score: number): {
  status: 'not-started' | 'needs-work' | 'progressing' | 'almost-ready' | 'ready';
  text: string;
  color: string;
} {
  if (score === 0) {
    return { status: 'not-started', text: 'Not Started', color: 'text-slate-500' };
  }
  if (score < 40) {
    return { status: 'needs-work', text: 'Needs Work', color: 'text-error-500' };
  }
  if (score < 60) {
    return { status: 'progressing', text: 'Progressing', color: 'text-warning-500' };
  }
  if (score < 80) {
    return { status: 'almost-ready', text: 'Almost Ready', color: 'text-primary-500' };
  }
  return { status: 'ready', text: 'Exam Ready', color: 'text-success-500' };
}

export default {
  getCMAProgress,
  saveCMAExamAttempt,
  updateCMASectionProgress,
  getCMAReadinessStatus,
};
