/**
 * useStudyPlan Hook
 * 
 * Provides access to the user's study plan and related operations.
 * Handles loading, caching, and real-time updates.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useCourse } from '../providers/CourseProvider';
import { useAuth } from './useAuth';
import { differenceInDays } from 'date-fns';
import type { CourseId } from '../types/course';
import type { 
  StudyPlan, 
  StudyPlanSummary, 
  TodaysPlan,
  StudyPlanSetupInput,
  PlanHealth,
} from '../types/studyPlan';
import {
  generateStudyPlan,
  generateTodaysPlan,
} from '../services/studyPlanService';
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
            // Convert Firestore timestamps to Dates
            setPlan({
              ...data,
              startDate: toLocalDate(data.startDate),
              examDate: toLocalDate(data.examDate),
              createdAt: toLocalDate(data.createdAt),
              updatedAt: toLocalDate(data.updatedAt),
              weeks: data.weeks?.map(w => ({
                ...w,
                startDate: toLocalDate(w.startDate),
                endDate: toLocalDate(w.endDate),
              })) || [],
              milestones: data.milestones?.map(m => ({
                ...m,
                date: toLocalDate(m.date),
              })) || [],
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
      
      logger.info('Study plan created:', newPlan.id);
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
