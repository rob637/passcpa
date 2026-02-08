/**
 * CPA Progress Service
 * 
 * Tracks and calculates progress for CPA exam preparation.
 * Provides readiness metrics for all 6 CPA sections (FAR, AUD, REG + discipline).
 * 
 * CPA Evolution Model:
 * - 3 Core Sections (mandatory): AUD, FAR, REG
 * - 3 Discipline Sections (choose 1): BAR, ISC, TCP
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
import logger from '../utils/logger';

// CPA section IDs
export type CPASectionId = 'FAR' | 'AUD' | 'REG' | 'BAR' | 'ISC' | 'TCP';
export const CPA_SECTION_IDS: CPASectionId[] = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];
export const CPA_CORE_SECTIONS: CPASectionId[] = ['FAR', 'AUD', 'REG'];
export const CPA_DISCIPLINE_SECTIONS: CPASectionId[] = ['BAR', 'ISC', 'TCP'];

// Types
export interface CPASectionProgress {
  sectionId: CPASectionId;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
  tbsAttempted: number;
  tbsCorrect: number;
  tbsAccuracy: number;
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

export interface CPAOverallProgress {
  overall: {
    readinessScore: number;
    progressPercent: number;
    totalQuestionsAttempted: number;
    overallAccuracy: number;
    totalTBSAttempted: number;
    tbsAccuracy: number;
    totalStudyTimeMinutes: number;
    streakDays: number;
    chosenDiscipline: CPASectionId | null;
  };
  sections: Record<CPASectionId, CPASectionProgress>;
  examHistory: CPAExamAttempt[];
  recommendations: string[];
}

export interface CPAExamAttempt {
  id: string;
  sectionId: CPASectionId;
  mode: 'full' | 'half' | 'quick' | 'mini' | 'testlet';
  score: number;
  mcqScore: number;
  tbsScore: number;
  passingScore: number;
  passed: boolean;
  questionsTotal: number;
  questionsCorrect: number;
  tbsTotal: number;
  tbsCorrect: number;
  timeSpentMinutes: number;
  completedAt: Date;
}

// Constants
const CPA_PASSING_SCORE = 75; // Official passing score

/**
 * Get default section progress
 */
function defaultSectionProgress(sectionId: CPASectionId): CPASectionProgress {
  return {
    sectionId,
    questionsAttempted: 0,
    questionsCorrect: 0,
    accuracy: 0,
    tbsAttempted: 0,
    tbsCorrect: 0,
    tbsAccuracy: 0,
    lessonsCompleted: 0,
    totalLessons: 15, // Approximate per section
    flashcardsReviewed: 0,
    examsTaken: 0,
    lastStudied: null,
    progressPercent: 0,
    readinessScore: 0,
    blueprintAreaProgress: {},
  };
}

/**
 * Get CPA progress for a user
 */
export async function getCPAProgress(userId: string): Promise<CPAOverallProgress> {
  try {
    const progress: CPAOverallProgress = {
      overall: {
        readinessScore: 0,
        progressPercent: 0,
        totalQuestionsAttempted: 0,
        overallAccuracy: 0,
        totalTBSAttempted: 0,
        tbsAccuracy: 0,
        totalStudyTimeMinutes: 0,
        streakDays: 0,
        chosenDiscipline: null,
      },
      sections: {
        FAR: defaultSectionProgress('FAR'),
        AUD: defaultSectionProgress('AUD'),
        REG: defaultSectionProgress('REG'),
        BAR: defaultSectionProgress('BAR'),
        ISC: defaultSectionProgress('ISC'),
        TCP: defaultSectionProgress('TCP'),
      },
      examHistory: [],
      recommendations: [],
    };

    // Fetch user's CPA progress document
    const progressRef = doc(db, 'users', userId, 'cpa_progress', 'current');
    const progressSnap = await getDoc(progressRef);

    if (progressSnap.exists()) {
      const data = progressSnap.data();
      
      // Merge stored progress
      if (data.sections) {
        for (const sectionId of CPA_SECTION_IDS) {
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

    logsSnap.forEach((logDoc) => {
      const log = logDoc.data();
      totalStudyTime += log.studyTimeMinutes || 0;
      
      // Count streak
      if (!streakBroken && (log.earnedPoints || 0) > 0) {
        streakDays++;
      } else if ((log.earnedPoints || 0) === 0) {
        streakBroken = true;
      }

      // Check for CPA activities
      if (log.activities) {
        for (const activity of log.activities) {
          const sectionId = activity.section as CPASectionId;
          if (CPA_SECTION_IDS.includes(sectionId) && progress.sections[sectionId]) {
            if (activity.type === 'tbs') {
              progress.sections[sectionId].tbsAttempted++;
              if (activity.isCorrect) {
                progress.sections[sectionId].tbsCorrect++;
              }
            } else {
              progress.sections[sectionId].questionsAttempted++;
              if (activity.isCorrect) {
                progress.sections[sectionId].questionsCorrect++;
              }
            }
            progress.sections[sectionId].lastStudied = new Date(activity.timestamp);
          }
        }
      }
    });

    progress.overall.totalStudyTimeMinutes = totalStudyTime;
    progress.overall.streakDays = streakDays;

    // Fetch CPA exam attempts
    const examsRef = collection(db, 'users', userId, 'cpa_exams');
    const examsQuery = query(examsRef, orderBy('completedAt', 'desc'), limit(20));
    const examsSnap = await getDocs(examsQuery);

    examsSnap.forEach((examDoc) => {
      const exam = examDoc.data();
      progress.examHistory.push({
        id: examDoc.id,
        sectionId: exam.sectionId,
        mode: exam.mode,
        score: exam.score,
        mcqScore: exam.mcqScore || 0,
        tbsScore: exam.tbsScore || 0,
        passingScore: CPA_PASSING_SCORE,
        passed: exam.score >= CPA_PASSING_SCORE,
        questionsTotal: exam.questionsTotal,
        questionsCorrect: exam.questionsCorrect,
        tbsTotal: exam.tbsTotal || 0,
        tbsCorrect: exam.tbsCorrect || 0,
        timeSpentMinutes: exam.timeSpentMinutes,
        completedAt: exam.completedAt?.toDate?.() || new Date(),
      });

      // Update section exam count
      const sectionId = exam.sectionId as CPASectionId;
      if (progress.sections[sectionId]) {
        progress.sections[sectionId].examsTaken++;
      }
    });

    // Calculate section metrics
    let totalMCQ = 0;
    let totalMCQCorrect = 0;
    let totalTBS = 0;
    let totalTBSCorrect = 0;

    for (const sectionId of CPA_SECTION_IDS) {
      const section = progress.sections[sectionId];
      
      // Calculate MCQ accuracy
      section.accuracy = section.questionsAttempted > 0
        ? Math.round((section.questionsCorrect / section.questionsAttempted) * 100)
        : 0;

      // Calculate TBS accuracy
      section.tbsAccuracy = section.tbsAttempted > 0
        ? Math.round((section.tbsCorrect / section.tbsAttempted) * 100)
        : 0;

      // Calculate progress percent (questions attempted as % of target ~600 MCQ + 100 TBS per section)
      const targetMCQ = 600;
      const targetTBS = 100;
      const mcqProgress = Math.min(100, (section.questionsAttempted / targetMCQ) * 100);
      const tbsProgress = Math.min(100, (section.tbsAttempted / targetTBS) * 100);
      section.progressPercent = Math.round((mcqProgress * 0.7) + (tbsProgress * 0.3)); // Weight MCQ more

      // Calculate readiness score (weighted: 50% MCQ accuracy, 25% TBS accuracy, 25% coverage)
      section.readinessScore = Math.round(
        (section.accuracy * 0.5) + 
        (section.tbsAccuracy * 0.25) +
        (section.progressPercent * 0.25)
      );

      totalMCQ += section.questionsAttempted;
      totalMCQCorrect += section.questionsCorrect;
      totalTBS += section.tbsAttempted;
      totalTBSCorrect += section.tbsCorrect;
    }

    // Calculate overall metrics
    progress.overall.totalQuestionsAttempted = totalMCQ;
    progress.overall.overallAccuracy = totalMCQ > 0
      ? Math.round((totalMCQCorrect / totalMCQ) * 100)
      : 0;
    progress.overall.totalTBSAttempted = totalTBS;
    progress.overall.tbsAccuracy = totalTBS > 0
      ? Math.round((totalTBSCorrect / totalTBS) * 100)
      : 0;

    // Calculate overall progress (weighted by core sections + chosen discipline)
    const coreProgress = (
      progress.sections.FAR.progressPercent +
      progress.sections.AUD.progressPercent +
      progress.sections.REG.progressPercent
    ) / 3;

    // If user has chosen a discipline, include it
    let disciplineProgress = 0;
    if (progress.overall.chosenDiscipline) {
      disciplineProgress = progress.sections[progress.overall.chosenDiscipline].progressPercent;
    } else {
      // Average all discipline sections if none chosen
      disciplineProgress = (
        progress.sections.BAR.progressPercent +
        progress.sections.ISC.progressPercent +
        progress.sections.TCP.progressPercent
      ) / 3;
    }

    progress.overall.progressPercent = Math.round((coreProgress * 0.75) + (disciplineProgress * 0.25));

    // Calculate overall readiness
    const coreReadiness = (
      progress.sections.FAR.readinessScore +
      progress.sections.AUD.readinessScore +
      progress.sections.REG.readinessScore
    ) / 3;

    let disciplineReadiness = 0;
    if (progress.overall.chosenDiscipline) {
      disciplineReadiness = progress.sections[progress.overall.chosenDiscipline].readinessScore;
    } else {
      disciplineReadiness = Math.max(
        progress.sections.BAR.readinessScore,
        progress.sections.ISC.readinessScore,
        progress.sections.TCP.readinessScore
      );
    }

    progress.overall.readinessScore = Math.round((coreReadiness * 0.75) + (disciplineReadiness * 0.25));

    // Generate recommendations
    progress.recommendations = generateCPARecommendations(progress);

    return progress;
  } catch (error) {
    logger.error('Error fetching CPA progress:', error);
    throw error;
  }
}

/**
 * Generate personalized recommendations
 */
function generateCPARecommendations(progress: CPAOverallProgress): string[] {
  const recommendations: string[] = [];

  // Get weakest core section
  const coreSections = CPA_CORE_SECTIONS.map(id => ({
    id,
    readiness: progress.sections[id].readinessScore,
  })).sort((a, b) => a.readiness - b.readiness);

  if (coreSections[0].readiness < 60) {
    recommendations.push(`Focus on ${coreSections[0].id} - your weakest core section at ${coreSections[0].readiness}% readiness`);
  }

  // Check TBS practice
  const totalTBS = CPA_SECTION_IDS.reduce((sum, id) => sum + progress.sections[id].tbsAttempted, 0);
  if (totalTBS < 50) {
    recommendations.push('Practice more Task-Based Simulations (TBS) - they count for 50% of your score');
  }

  // Check if discipline section chosen
  if (!progress.overall.chosenDiscipline) {
    recommendations.push('Select your discipline section (BAR, ISC, or TCP) to focus your study plan');
  }

  // Check overall accuracy
  if (progress.overall.overallAccuracy < 75) {
    recommendations.push('Your MCQ accuracy needs improvement - review explanations on missed questions');
  }

  // Check study streak
  if (progress.overall.streakDays < 7) {
    recommendations.push('Build consistent study habits - aim for daily practice to maintain momentum');
  }

  // Check for sections not started
  for (const sectionId of CPA_CORE_SECTIONS) {
    if (progress.sections[sectionId].questionsAttempted === 0) {
      recommendations.push(`Start studying ${sectionId} - no questions attempted yet`);
      break;
    }
  }

  return recommendations.slice(0, 5); // Limit to 5 recommendations
}

/**
 * Save CPA exam attempt
 */
export async function saveCPAExamAttempt(
  userId: string,
  attempt: Omit<CPAExamAttempt, 'id' | 'passingScore' | 'passed'>
): Promise<string> {
  try {
    const examsRef = collection(db, 'users', userId, 'cpa_exams');
    const examDoc = doc(examsRef);
    
    await setDoc(examDoc, {
      ...attempt,
      passingScore: CPA_PASSING_SCORE,
      passed: attempt.score >= CPA_PASSING_SCORE,
      completedAt: Timestamp.fromDate(attempt.completedAt),
    });

    return examDoc.id;
  } catch (error) {
    logger.error('Error saving CPA exam attempt:', error);
    throw error;
  }
}

/**
 * Update section progress
 */
export async function updateCPASectionProgress(
  userId: string,
  sectionId: CPASectionId,
  updates: Partial<CPASectionProgress>
): Promise<void> {
  try {
    const progressRef = doc(db, 'users', userId, 'cpa_progress', 'current');
    
    await setDoc(progressRef, {
      sections: {
        [sectionId]: {
          ...updates,
          lastStudied: Timestamp.now(),
        },
      },
    }, { merge: true });
  } catch (error) {
    logger.error('Error updating CPA section progress:', error);
    throw error;
  }
}

/**
 * Set chosen discipline section
 */
export async function setChosenDiscipline(
  userId: string,
  discipline: CPASectionId
): Promise<void> {
  if (!CPA_DISCIPLINE_SECTIONS.includes(discipline)) {
    throw new Error('Invalid discipline section. Choose BAR, ISC, or TCP.');
  }

  try {
    const progressRef = doc(db, 'users', userId, 'cpa_progress', 'current');
    
    await setDoc(progressRef, {
      overall: {
        chosenDiscipline: discipline,
      },
    }, { merge: true });
  } catch (error) {
    logger.error('Error setting chosen discipline:', error);
    throw error;
  }
}

/**
 * Get section-specific recommendations
 */
export function getSectionRecommendations(
  section: CPASectionProgress
): string[] {
  const recommendations: string[] = [];

  if (section.accuracy < 60 && section.questionsAttempted > 20) {
    recommendations.push('Review core concepts - accuracy below target');
  }

  if (section.tbsAttempted < 10) {
    recommendations.push('Practice more TBS questions');
  }

  if (section.tbsAccuracy < 50 && section.tbsAttempted > 5) {
    recommendations.push('Focus on TBS skills - technique improvement needed');
  }

  if (section.questionsAttempted < 100) {
    recommendations.push('Increase question volume for better coverage');
  }

  return recommendations;
}
