/**
 * useStudyPlan Hook
 * 
 * Provides access to the user's study plan and related operations.
 * Handles loading, caching, and real-time updates.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { doc, getDoc, setDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useCourse } from '../providers/CourseProvider';
import { useAuth } from './useAuth';
import type { CourseId } from '../types/course';
import type { 
  StudyPlan, 
  StudyPlanSummary, 
  TodaysPlan,
  StudyPlanSetupInput,
} from '../types/studyPlan';
import {
  generateStudyPlan,
  generateTodaysPlan,
  calculatePlanHealth,
} from '../services/studyPlanService';
import { clearTodaysPlan } from '../services/dailyPlanPersistence';
import { isWithinInterval } from 'date-fns';
import logger from '../utils/logger';
import { getDefaultSection } from '../utils/sectionUtils';
import { toLocalDate } from '../utils/dateHelpers';
import { getCurrentSection } from '../utils/profileHelpers';

interface UseStudyPlanReturn {
  // Plan state
  plan: StudyPlan | null;
  todaysPlan: TodaysPlan | null;
  summary: StudyPlanSummary;
  
  // Loading states
  loading: boolean;
  error: string | null;
  
  // Actions
  createPlan: (input: StudyPlanSetupInput) => Promise<StudyPlan>;
  refreshPlan: () => Promise<void>;
  markActivityComplete: (activityId: string) => void;
  
  // Computed
  hasPlan: boolean;
  daysUntilExam: number | null;
  isOnTrack: boolean;
}

/**
 * Fetch real progress from user's actual activity data (lessons, questions, daily logs)
 * This syncs the plan's progress with what the user has actually done,
 * including activity that happened before the plan was created.
 */
async function fetchRealProgress(
  userId: string,
  courseId: CourseId,
  section: string
): Promise<{
  lessonsCompleted: number;
  questionsAnswered: number;
  accuracy: number;
  daysStudied: number;
}> {
  let lessonsCompleted = 0;
  let questionsAnswered = 0;
  let questionsCorrect = 0;
  let daysStudied = 0;

  try {
    // 1. Count completed lessons for this course/section
    const lessonsRef = collection(db, 'users', userId, 'lessons');
    const lessonsSnap = await getDocs(lessonsRef);
    lessonsCompleted = lessonsSnap.docs.filter(docSnap => {
      const data = docSnap.data();
      // Count if completed AND matches course/section
      const isCompleted = data.status === 'completed' || data.completedAt || data.progress >= 100;
      const matchesCourse = !data.courseId || data.courseId === courseId;
      const matchesSection = !data.section || data.section === section || section === 'ALL';
      return isCompleted && matchesCourse && matchesSection;
    }).length;
  } catch (err) {
    logger.warn('Could not fetch lessons progress:', err);
  }

  try {
    // 2. Count questions answered for this course/section
    const questionsRef = collection(db, 'users', userId, 'questionHistory');
    const questionsSnap = await getDocs(questionsRef);
    questionsSnap.docs.forEach(docSnap => {
      const data = docSnap.data();
      const matchesCourse = !data.courseId || data.courseId === courseId;
      const matchesSection = !data.section || data.section === section || section === 'ALL';
      if (matchesCourse && matchesSection) {
        questionsAnswered++;
        if (data.correct || data.isCorrect) {
          questionsCorrect++;
        }
      }
    });
  } catch (err) {
    logger.warn('Could not fetch question history:', err);
  }

  try {
    // 3. Count distinct days studied from daily_log
    const logsRef = collection(db, 'users', userId, 'daily_log');
    const logsSnap = await getDocs(logsRef);
    daysStudied = logsSnap.docs.filter(docSnap => {
      const data = docSnap.data();
      // Count if any meaningful activity on that day
      return (data.questionsAnswered > 0 || data.lessonsCompleted > 0 || data.minutesStudied > 0);
    }).length;
  } catch (err) {
    logger.warn('Could not fetch daily logs:', err);
  }

  const accuracy = questionsAnswered > 0 
    ? Math.round((questionsCorrect / questionsAnswered) * 100) 
    : 0;

  return { lessonsCompleted, questionsAnswered, accuracy, daysStudied };
}

/**
 * Hook to access and manage the user's study plan
 */
export function useStudyPlan(): UseStudyPlanReturn {
  const { courseId } = useCourse();
  const { user, userProfile } = useAuth();
  
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get the current section from profile (e.g., 'FAR', 'AUD', 'SEE1')
  const currentSection = getCurrentSection(userProfile, courseId, getDefaultSection);
  
  // Plans are stored per-section: e.g., 'cpa_FAR', 'cpa_AUD', 'ea_SEE1'
  const planKey = currentSection ? `${courseId}_${currentSection}` : courseId;
  
  // Load the study plan on mount and when course/section changes
  useEffect(() => {
    let mounted = true;
    
    async function loadPlan() {
      if (!user || !courseId || !currentSection) {
        setLoading(false);
        setPlan(null);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        // Try to load existing plan for this section
        const planDoc = await getDoc(
          doc(db, 'users', user.uid, 'studyPlans', planKey)
        );
        
        if (mounted) {
          if (planDoc.exists()) {
            const data = planDoc.data() as StudyPlan;
            
            // Fetch real progress from user's actual activity data
            // This syncs the plan with all activities, including those done before plan creation
            const realProgress = await fetchRealProgress(user.uid, courseId, currentSection);
            
            // Merge stored progress with real progress (use max values to avoid losing data)
            const mergedProgress = {
              ...data.progress,
              lessonsCompleted: Math.max(data.progress?.lessonsCompleted || 0, realProgress.lessonsCompleted),
              questionsAnswered: Math.max(data.progress?.questionsAnswered || 0, realProgress.questionsAnswered),
              accuracy: realProgress.questionsAnswered > 0 ? realProgress.accuracy : (data.progress?.accuracy || 0),
              daysStudied: Math.max(data.progress?.daysStudied || 0, realProgress.daysStudied),
            };
            
            // Recalculate health based on synced progress
            // This ensures health reflects actual user activity, not stale stored value
            const today = new Date();
            const weeks = data.weeks?.map(w => ({
              ...w,
              startDate: toLocalDate(w.startDate),
              endDate: toLocalDate(w.endDate),
            })) || [];
            
            const currentWeek = weeks.find(w => 
              isWithinInterval(today, { start: w.startDate, end: w.endDate })
            );
            
            // Calculate expected progress
            let lessonsExpected = 0;
            let questionsExpected = 0;
            for (const w of weeks) {
              if (w.weekNumber < (currentWeek?.weekNumber || 1)) {
                lessonsExpected += w.goals?.lessons || 0;
                questionsExpected += w.goals?.questions || 0;
              }
            }
            // Add partial week progress
            if (currentWeek) {
              const weekStart = currentWeek.startDate;
              const dayOfWeek = Math.floor((today.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
              const weekProgress = Math.min(1, dayOfWeek / 7);
              lessonsExpected += Math.floor((currentWeek.goals?.lessons || 0) * weekProgress);
              questionsExpected += Math.floor((currentWeek.goals?.questions || 0) * weekProgress);
            }
            
            const recalculatedHealth = calculatePlanHealth(
              currentWeek?.weekNumber || 1,
              data.totalWeeks || 1,
              mergedProgress.lessonsCompleted,
              lessonsExpected,
              mergedProgress.questionsAnswered,
              questionsExpected,
              mergedProgress.daysStudied,
              mergedProgress.daysMissed || 0
            );
            
            // Convert Firestore timestamps to Dates
            setPlan({
              ...data,
              startDate: toLocalDate(data.startDate),
              examDate: toLocalDate(data.examDate),
              createdAt: toLocalDate(data.createdAt),
              updatedAt: toLocalDate(data.updatedAt),
              weeks,
              milestones: data.milestones?.map(m => ({
                ...m,
                date: toLocalDate(m.date),
              })) || [],
              progress: mergedProgress,
              health: recalculatedHealth, // Use recalculated health, not stored value
            });
          } else {
            setPlan(null);
          }
        }
      } catch (err) {
        logger.error('Error loading study plan:', err);
        if (mounted) {
          setError('Failed to load study plan');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }
    
    loadPlan();
    
    return () => {
      mounted = false;
    };
  }, [user, courseId, currentSection, planKey]);
  
  // Generate today's plan whenever the plan changes
  const todaysPlan = useMemo(() => {
    if (!plan) return null;
    try {
      return generateTodaysPlan(plan);
    } catch (err) {
      logger.error('Error generating today\'s plan:', err);
      return null;
    }
  }, [plan]);
  
  // Summary for nav indicator
  const summary = useMemo((): StudyPlanSummary => {
    if (!plan) {
      return { exists: false };
    }
    
    const now = new Date();
    const examDate = toLocalDate(plan.examDate);
    const daysUntilExam = Math.ceil(
      (examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return {
      exists: true,
      health: plan.health,
      daysUntilExam,
      currentPhase: plan.currentPhase,
      alertCount: plan.alerts?.filter(a => !a.dismissed).length || 0,
    };
  }, [plan]);
  
  // Create a new study plan
  const createPlan = useCallback(async (input: StudyPlanSetupInput): Promise<StudyPlan> => {
    if (!user) {
      throw new Error('Must be logged in to create a study plan');
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Generate the plan
      const newPlan = generateStudyPlan(input, user.uid);
      
      // Save to Firestore under user's studyPlans subcollection
      // Key is courseId_section for section-independent plans
      const savePlanKey = `${input.courseId}_${input.section}`;
      
      // Firestore doesn't accept undefined values - use JSON serialization to strip them
      // This converts Date objects to ISO strings, which Firestore handles fine
      const planForFirestore = JSON.parse(JSON.stringify(newPlan));
      
      await setDoc(
        doc(db, 'users', user.uid, 'studyPlans', savePlanKey),
        {
          ...planForFirestore,
          updatedAt: serverTimestamp(),
        }
      );
      
      // Update local state
      setPlan(newPlan);
      
      // Clear daily plan cache so it regenerates with the new study plan context
      await clearTodaysPlan(user.uid, input.section);
      
      logger.info('Study plan created, daily plan cache cleared:', newPlan.id);
      return newPlan;
    } catch (err) {
      // Always log to console for debugging, even in production
      console.error('Error creating study plan in useStudyPlan:', err);
      logger.error('Error creating study plan:', err);
      setError('Failed to create study plan');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  // Refresh the plan from server
  const refreshPlan = useCallback(async () => {
    if (!user || !courseId || !currentSection) return;
    
    try {
      setLoading(true);
      const planDoc = await getDoc(
        doc(db, 'users', user.uid, 'studyPlans', planKey)
      );
      
      if (planDoc.exists()) {
        setPlan(planDoc.data() as StudyPlan);
      }
    } catch (err) {
      logger.error('Error refreshing study plan:', err);
    } finally {
      setLoading(false);
    }
  }, [user, courseId, currentSection, planKey]);
  
  // Mark an activity as complete (local state only for now)
  const markActivityComplete = useCallback((activityId: string) => {
    if (!plan) return;
    
    // This would also update Firestore in a full implementation
    logger.info('Activity completed:', activityId);
  }, [plan]);
  
  // Computed values
  const hasPlan = !!plan;
  
  const daysUntilExam = useMemo(() => {
    if (!plan) return null;
    const now = new Date();
    const examDate = toLocalDate(plan.examDate);
    return Math.ceil(
      (examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
  }, [plan]);
  
  const isOnTrack = plan?.health === 'on-track' || plan?.health === 'slightly-behind';
  
  return {
    plan,
    todaysPlan,
    summary,
    loading,
    error,
    createPlan,
    refreshPlan,
    markActivityComplete,
    hasPlan,
    daysUntilExam,
    isOnTrack,
  };
}

export default useStudyPlan;
