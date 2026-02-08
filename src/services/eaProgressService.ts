/**
 * EA Progress Service
 * 
 * Tracks and calculates progress for Enrolled Agent exam preparation.
 * Provides readiness metrics for SEE1, SEE2, and SEE3 sections.
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
import { EASectionId, EA_SECTION_CONFIG } from '../courses/ea';
import logger from '../utils/logger';

// Types
export interface EASectionProgress {
  sectionId: EASectionId;
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

export interface EAOverallProgress {
  overall: {
    readinessScore: number;
    progressPercent: number;
    totalQuestionsAttempted: number;
    overallAccuracy: number;
    totalStudyTimeMinutes: number;
    streakDays: number;
  };
  sections: Record<EASectionId, EASectionProgress>;
  examHistory: EAExamAttempt[];
  recommendations: string[];
}

export interface EAExamAttempt {
  id: string;
  sectionId: EASectionId;
  mode: 'full' | 'half' | 'quick' | 'mini';
  score: number;
  passingScore: number;
  passed: boolean;
  questionsTotal: number;
  questionsCorrect: number;
  timeSpentMinutes: number;
  completedAt: Date;
}

// Constants
const EA_PASSING_SCORE = 105; // Out of 130 scaled score
const EA_PASSING_PERCENT = Math.round((EA_PASSING_SCORE / 130) * 100); // ~81%

/**
 * Get EA progress for a user
 */
export async function getEAProgress(userId: string): Promise<EAOverallProgress> {
  try {
    // Initialize default progress
    const defaultSectionProgress = (sectionId: EASectionId): EASectionProgress => ({
      sectionId,
      questionsAttempted: 0,
      questionsCorrect: 0,
      accuracy: 0,
      lessonsCompleted: 0,
      totalLessons: 10, // Placeholder
      flashcardsReviewed: 0,
      examsTaken: 0,
      lastStudied: null,
      progressPercent: 0,
      readinessScore: 0,
      blueprintAreaProgress: {},
    });

    const progress: EAOverallProgress = {
      overall: {
        readinessScore: 0,
        progressPercent: 0,
        totalQuestionsAttempted: 0,
        overallAccuracy: 0,
        totalStudyTimeMinutes: 0,
        streakDays: 0,
      },
      sections: {
        SEE1: defaultSectionProgress('SEE1'),
        SEE2: defaultSectionProgress('SEE2'),
        SEE3: defaultSectionProgress('SEE3'),
      },
      examHistory: [],
      recommendations: [],
    };

    // Fetch user's EA progress document
    const progressRef = doc(db, 'users', userId, 'ea_progress', 'current');
    const progressSnap = await getDoc(progressRef);

    if (progressSnap.exists()) {
      const data = progressSnap.data();
      
      // Merge stored progress
      if (data.sections) {
        for (const sectionId of ['SEE1', 'SEE2', 'SEE3'] as EASectionId[]) {
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

      // Check for EA activities
      if (log.activities) {
        for (const activity of log.activities) {
          if (activity.section?.startsWith('SEE')) {
            const sectionId = activity.section as EASectionId;
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

    // Fetch EA exam attempts
    const examsRef = collection(db, 'users', userId, 'ea_exams');
    const examsQuery = query(examsRef, orderBy('completedAt', 'desc'), limit(10));
    const examsSnap = await getDocs(examsQuery);

    examsSnap.forEach((doc) => {
      const exam = doc.data();
      progress.examHistory.push({
        id: doc.id,
        sectionId: exam.sectionId,
        mode: exam.mode,
        score: exam.score,
        passingScore: EA_PASSING_PERCENT,
        passed: exam.score >= EA_PASSING_PERCENT,
        questionsTotal: exam.questionsTotal,
        questionsCorrect: exam.questionsCorrect,
        timeSpentMinutes: exam.timeSpentMinutes,
        completedAt: exam.completedAt?.toDate?.() || new Date(),
      });

      // Update section exam count
      if (progress.sections[exam.sectionId as EASectionId]) {
        progress.sections[exam.sectionId as EASectionId].examsTaken++;
      }
    });

    // Calculate section metrics
    let totalQuestions = 0;
    let totalCorrect = 0;

    for (const sectionId of ['SEE1', 'SEE2', 'SEE3'] as EASectionId[]) {
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
      (progress.sections.SEE1.progressPercent +
       progress.sections.SEE2.progressPercent +
       progress.sections.SEE3.progressPercent) / 3
    );

    progress.overall.readinessScore = Math.round(
      (progress.sections.SEE1.readinessScore +
       progress.sections.SEE2.readinessScore +
       progress.sections.SEE3.readinessScore) / 3
    );

    // Generate recommendations
    progress.recommendations = generateRecommendations(progress);

    return progress;
  } catch (error) {
    logger.error('Error fetching EA progress:', error);
    throw error;
  }
}

/**
 * Save EA exam attempt
 */
export async function saveEAExamAttempt(
  userId: string,
  attempt: Omit<EAExamAttempt, 'id' | 'passingScore' | 'passed'>
): Promise<string> {
  try {
    const examsRef = collection(db, 'users', userId, 'ea_exams');
    const examDoc = doc(examsRef);
    
    await setDoc(examDoc, {
      ...attempt,
      passingScore: EA_PASSING_PERCENT,
      passed: attempt.score >= EA_PASSING_PERCENT,
      completedAt: Timestamp.fromDate(attempt.completedAt),
    });

    return examDoc.id;
  } catch (error) {
    logger.error('Error saving EA exam attempt:', error);
    throw error;
  }
}

/**
 * Update section progress
 */
export async function updateEASectionProgress(
  userId: string,
  sectionId: EASectionId,
  updates: Partial<EASectionProgress>
): Promise<void> {
  try {
    const progressRef = doc(db, 'users', userId, 'ea_progress', 'current');
    
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
    logger.error('Error updating EA section progress:', error);
    throw error;
  }
}

/**
 * Generate study recommendations based on progress
 */
function generateRecommendations(progress: EAOverallProgress): string[] {
  const recommendations: string[] = [];
  
  // Find weakest section
  const sections = Object.values(progress.sections);
  const weakestSection = sections.reduce((min, s) => 
    s.readinessScore < min.readinessScore ? s : min
  );
  
  if (weakestSection.readinessScore < 60) {
    const config = EA_SECTION_CONFIG[weakestSection.sectionId];
    recommendations.push(`Focus on ${config.shortName}: ${config.name} - your weakest area at ${weakestSection.readinessScore}% readiness`);
  }

  // Check for low accuracy
  if (progress.overall.overallAccuracy > 0 && progress.overall.overallAccuracy < EA_PASSING_PERCENT) {
    recommendations.push(`Improve accuracy from ${progress.overall.overallAccuracy}% to ${EA_PASSING_PERCENT}%+ to pass`);
  }

  // Check for lack of practice exams
  const totalExams = sections.reduce((sum, s) => sum + s.examsTaken, 0);
  if (totalExams < 3) {
    recommendations.push('Take more practice exams to build test-taking stamina');
  }

  // Check study consistency
  if (progress.overall.streakDays < 5) {
    recommendations.push('Build a consistent study habit - aim for 5+ day streaks');
  }

  // Check even distribution
  const progressSpread = Math.max(...sections.map(s => s.progressPercent)) - 
                         Math.min(...sections.map(s => s.progressPercent));
  if (progressSpread > 30) {
    recommendations.push('Balance your study across all 3 sections for comprehensive coverage');
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
export function getEAReadinessStatus(score: number): {
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
  getEAProgress,
  saveEAExamAttempt,
  updateEASectionProgress,
  getEAReadinessStatus,
};
