/**
 * User Progress Reset Service
 * 
 * Clears all user progress data from Firestore for a fresh start.
 * Use for: testing, course switching, "start over" functionality.
 */

import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  writeBatch,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import logger from '../utils/logger';
import type { CourseId } from '../types/course';

interface ResetOptions {
  /** Reset only for a specific course (default: all courses) */
  courseId?: CourseId;
  /** Reset only for a specific section (default: all sections) */
  section?: string;
  /** What to reset */
  resetTypes?: Array<'questions' | 'lessons' | 'tbs' | 'dailyLogs' | 'studyPlan'>;
}

interface ResetResult {
  success: boolean;
  deleted: {
    questionHistory: number;
    tbsHistory: number;
    cbqHistory: number;
    lessonProgress: number;
    dailyLogs: number;
    indexes: number;
  };
  errors: string[];
}

/**
 * Delete all documents in a subcollection with optional filter
 */
async function clearSubcollection(
  userId: string,
  subcollection: string,
  filterField?: string,
  filterValue?: string
): Promise<number> {
  const collectionRef = collection(db, 'users', userId, subcollection);
  
  let q;
  if (filterField && filterValue) {
    q = query(collectionRef, where(filterField, '==', filterValue));
  } else {
    q = collectionRef;
  }
  
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return 0;
  
  // Batch delete (max 500 per batch)
  const batchSize = 500;
  let deleted = 0;
  const docs = snapshot.docs;
  
  for (let i = 0; i < docs.length; i += batchSize) {
    const batch = writeBatch(db);
    const chunk = docs.slice(i, i + batchSize);
    
    chunk.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    
    await batch.commit();
    deleted += chunk.length;
  }
  
  return deleted;
}

/**
 * Reset all user progress data
 */
export async function resetUserProgress(
  userId: string,
  options: ResetOptions = {}
): Promise<ResetResult> {
  const result: ResetResult = {
    success: false,
    deleted: {
      questionHistory: 0,
      tbsHistory: 0,
      cbqHistory: 0,
      lessonProgress: 0,
      dailyLogs: 0,
      indexes: 0,
    },
    errors: [],
  };

  const { courseId, section, resetTypes } = options;
  const resetAll = !resetTypes || resetTypes.length === 0;

  try {
    logger.info(`Resetting progress for user ${userId}`, { courseId, section, resetTypes });

    // 1. Question History
    if (resetAll || resetTypes?.includes('questions')) {
      try {
        if (section) {
          result.deleted.questionHistory = await clearSubcollection(
            userId,
            'question_history',
            'section',
            section
          );
        } else {
          result.deleted.questionHistory = await clearSubcollection(userId, 'question_history');
        }
        logger.info(`Deleted ${result.deleted.questionHistory} question history records`);
      } catch (e) {
        const msg = `Failed to clear question_history: ${e}`;
        logger.error(msg);
        result.errors.push(msg);
      }
    }

    // 2. TBS History
    if (resetAll || resetTypes?.includes('tbs')) {
      try {
        if (section) {
          result.deleted.tbsHistory = await clearSubcollection(
            userId,
            'tbs_history',
            'section',
            section
          );
        } else {
          result.deleted.tbsHistory = await clearSubcollection(userId, 'tbs_history');
        }
        logger.info(`Deleted ${result.deleted.tbsHistory} TBS history records`);
      } catch (e) {
        const msg = `Failed to clear tbs_history: ${e}`;
        logger.error(msg);
        result.errors.push(msg);
      }
    }

    // 3. CBQ History (CMA)
    if (resetAll || resetTypes?.includes('questions')) {
      try {
        result.deleted.cbqHistory = await clearSubcollection(userId, 'cbq_history');
        logger.info(`Deleted ${result.deleted.cbqHistory} CBQ history records`);
      } catch (e) {
        const msg = `Failed to clear cbq_history: ${e}`;
        logger.error(msg);
        result.errors.push(msg);
      }
    }

    // 4. Lesson Progress
    if (resetAll || resetTypes?.includes('lessons')) {
      try {
        if (section) {
          result.deleted.lessonProgress = await clearSubcollection(
            userId,
            'lessons',
            'section',
            section
          );
        } else {
          result.deleted.lessonProgress = await clearSubcollection(userId, 'lessons');
        }
        logger.info(`Deleted ${result.deleted.lessonProgress} lesson progress records`);
      } catch (e) {
        const msg = `Failed to clear lessons: ${e}`;
        logger.error(msg);
        result.errors.push(msg);
      }
    }

    // 5. Daily Logs
    if (resetAll || resetTypes?.includes('dailyLogs')) {
      try {
        if (courseId) {
          // Filter by courseId prefix in doc ID (format: {course}_{date})
          const collectionRef = collection(db, 'users', userId, 'daily_log');
          const snapshot = await getDocs(collectionRef);
          let deleted = 0;
          
          const batch = writeBatch(db);
          snapshot.docs.forEach((docSnap) => {
            if (docSnap.id.startsWith(`${courseId}_`)) {
              batch.delete(docSnap.ref);
              deleted++;
            }
          });
          
          if (deleted > 0) {
            await batch.commit();
          }
          result.deleted.dailyLogs = deleted;
        } else {
          result.deleted.dailyLogs = await clearSubcollection(userId, 'daily_log');
        }
        logger.info(`Deleted ${result.deleted.dailyLogs} daily log records`);
      } catch (e) {
        const msg = `Failed to clear daily_log: ${e}`;
        logger.error(msg);
        result.errors.push(msg);
      }
    }

    // 6. Indexes (cached question ID lists)
    if (resetAll || resetTypes?.includes('questions')) {
      try {
        result.deleted.indexes = await clearSubcollection(userId, 'indexes');
        logger.info(`Deleted ${result.deleted.indexes} index records`);
      } catch (e) {
        const msg = `Failed to clear indexes: ${e}`;
        logger.error(msg);
        result.errors.push(msg);
      }
    }

    // 7. Reset study plan progress (if exists)
    if (resetAll || resetTypes?.includes('studyPlan')) {
      try {
        const plansRef = collection(db, 'users', userId, 'study_plans');
        const plansSnapshot = await getDocs(plansRef);
        
        for (const planDoc of plansSnapshot.docs) {
          await updateDoc(planDoc.ref, {
            'progress.questionsAnswered': 0,
            'progress.questionsCorrect': 0,
            'progress.lessonsCompleted': 0,
            'progress.tbsCompleted': 0,
            'progress.mockExamsTaken': 0,
            'progress.studyMinutes': 0,
            'progress.currentStreak': 0,
            'progress.lastStudyDate': null,
          });
        }
        logger.info(`Reset progress in ${plansSnapshot.size} study plans`);
      } catch (e) {
        const msg = `Failed to reset study plan progress: ${e}`;
        logger.error(msg);
        result.errors.push(msg);
      }
    }

    result.success = result.errors.length === 0;
    
    const totalDeleted = Object.values(result.deleted).reduce((a, b) => a + b, 0);
    logger.info(`Progress reset complete. Deleted ${totalDeleted} records.`, result);
    
    return result;

  } catch (error) {
    logger.error('Error resetting user progress:', error);
    result.errors.push(`Unexpected error: ${error}`);
    return result;
  }
}

/**
 * Quick reset for current course only
 */
export async function resetCourseProgress(
  userId: string,
  courseId: CourseId
): Promise<ResetResult> {
  return resetUserProgress(userId, { courseId });
}

/**
 * Quick reset for a specific section only
 */
export async function resetSectionProgress(
  userId: string,
  section: string
): Promise<ResetResult> {
  return resetUserProgress(userId, { section });
}
