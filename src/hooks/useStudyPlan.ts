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
  StudyPlanSetupInput,
} from '../types/studyPlan';
import {
  generateStudyPlan,
  calculatePlanHealth,
} from '../services/studyPlanService';
import { clearTodaysPlan } from '../services/dailyPlanPersistence';
import { isWithinInterval } from 'date-fns';
import logger from '../utils/logger';
import { getDefaultSection } from '../utils/sectionUtils';
import { toLocalDate } from '../utils/dateHelpers';
import { getCurrentSection } from '../utils/profileHelpers';
import { resolveStudySection } from '../services/contentRegistry';

// Cross-instance refresh: when one hook instance updates the plan (e.g. createPlan),
// all other instances (e.g. MainLayout nav dot) re-fetch to stay in sync.
const PLAN_UPDATED_EVENT = 'studyPlanUpdated';

function notifyPlanUpdated() {
  window.dispatchEvent(new Event(PLAN_UPDATED_EVENT));
}

interface UseStudyPlanReturn {
  // Plan state
  plan: StudyPlan | null;
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
  simulationsCompleted: number;
  flashcardsReviewed: number;
  essaysCompleted: number;
  cbqsCompleted: number;
  caseStudiesCompleted: number;
  mockExamsCompleted: number;
}> {
  let lessonsCompleted = 0;
  let questionsAnswered = 0;
  let questionsCorrect = 0;
  let daysStudied = 0;
  let simulationsCompleted = 0;
  let flashcardsReviewed = 0;
  let essaysCompleted = 0;
  let cbqsCompleted = 0;
  let caseStudiesCompleted = 0;
  let mockExamsCompleted = 0;

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
    // 3. Count TBS/simulations completed
    const tbsRef = collection(db, 'users', userId, 'tbs_history');
    const tbsSnap = await getDocs(tbsRef);
    simulationsCompleted = tbsSnap.docs.filter(docSnap => {
      const data = docSnap.data();
      const matchesCourse = !data.courseId || data.courseId === courseId;
      const matchesSection = !data.section || data.section === section || section === 'ALL';
      return matchesCourse && matchesSection;
    }).length;
  } catch (err) {
    logger.warn('Could not fetch TBS history:', err);
  }

  try {
    // 4. Count distinct days studied AND aggregate flashcards/essays/CBQs/mockExams from daily_log
    const logsRef = collection(db, 'users', userId, 'daily_log');
    const logsSnap = await getDocs(logsRef);
    const coursePrefix = `${courseId}_`;
    logsSnap.docs.forEach(docSnap => {
      // Only count logs for this specific course
      if (!docSnap.id.startsWith(coursePrefix)) return;
      const data = docSnap.data();
      // Count if any meaningful activity on that day
      if (data.questionsAnswered > 0 || data.lessonsCompleted > 0 || data.minutesStudied > 0) {
        daysStudied++;
      }
      // Aggregate activity counts from daily logs
      flashcardsReviewed += data.flashcardsReviewed || 0;
      essaysCompleted += data.essaysCompleted || 0;
      cbqsCompleted += data.cbqsCompleted || 0;
      caseStudiesCompleted += data.caseStudiesCompleted || 0;
      mockExamsCompleted += data.mockExamsCompleted || 0;
    });
  } catch (err) {
    logger.warn('Could not fetch daily logs:', err);
  }

  const accuracy = questionsAnswered > 0 
    ? Math.round((questionsCorrect / questionsAnswered) * 100) 
    : 0;

  return { 
    lessonsCompleted, 
    questionsAnswered, 
    accuracy, 
    daysStudied,
    simulationsCompleted,
    flashcardsReviewed,
    essaysCompleted,
    cbqsCompleted,
    caseStudiesCompleted,
    mockExamsCompleted,
  };
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
  
  // Refresh key: incremented by cross-instance events to trigger re-fetch
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
    const handler = () => setRefreshKey(k => k + 1);
    window.addEventListener(PLAN_UPDATED_EVENT, handler);
    return () => window.removeEventListener(PLAN_UPDATED_EVENT, handler);
  }, []);
  
  // Get the current section from profile (e.g., 'FAR', 'AUD', 'SEE1')
  const currentSection = getCurrentSection(userProfile, courseId, getDefaultSection);
  
  // For single-exam courses (CFP, CISA), resolve 'ALL' to the actual section ('CFP', 'CISA')
  // This ensures planKey matches how plans are stored
  const resolvedSection = resolveStudySection(courseId, currentSection) || currentSection;
  
  // Plans are stored per-section: e.g., 'cpa_FAR', 'cpa_AUD', 'cfp_CFP', 'cisa_CISA'
  const planKey = resolvedSection ? `${courseId}_${resolvedSection}` : courseId;
  
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
            
            // Phase 1: Set plan immediately with stored progress (fast — no extra reads)
            const weeks = data.weeks?.map(w => ({
              ...w,
              startDate: toLocalDate(w.startDate),
              endDate: toLocalDate(w.endDate),
            })) || [];
            
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
              progress: data.progress || {},
              health: data.health || 'on-track',
            });
            // Mark loading done immediately so dashboard sees hasPlan
            setLoading(false);
            
            // Phase 2: Deferred — sync real progress in the background (3 collection reads)
            // This avoids blocking the initial render with heavy Firestore queries
            const syncProgress = async () => {
              if (!mounted) return;
              try {
                const realProgress = await fetchRealProgress(user.uid, courseId, currentSection);
                if (!mounted) return;
                
                const mergedProgress = {
                  ...data.progress,
                  lessonsCompleted: Math.max(data.progress?.lessonsCompleted || 0, realProgress.lessonsCompleted),
                  questionsAnswered: Math.max(data.progress?.questionsAnswered || 0, realProgress.questionsAnswered),
                  accuracy: realProgress.questionsAnswered > 0 ? realProgress.accuracy : (data.progress?.accuracy || 0),
                  daysStudied: Math.max(data.progress?.daysStudied || 0, realProgress.daysStudied),
                };
                
                // Recalculate health based on synced progress
                const today = new Date();
                const currentWeek = weeks.find(w => 
                  isWithinInterval(today, { start: w.startDate, end: w.endDate })
                );
                
                const planCreatedAt = toLocalDate(data.createdAt);
                const daysSincePlanCreation = Math.floor(
                  (today.getTime() - planCreatedAt.getTime()) / (1000 * 60 * 60 * 24)
                );
                const isNewPlan = daysSincePlanCreation <= 1;
                
                let recalculatedHealth = data.health || 'on-track';
                
                if (!isNewPlan) {
                  let lessonsExpected = 0;
                  let questionsExpected = 0;
                  for (const w of weeks) {
                    if (w.weekNumber < (currentWeek?.weekNumber || 1)) {
                      lessonsExpected += w.goals?.lessons || 0;
                      questionsExpected += w.goals?.questions || 0;
                    }
                  }
                  if (currentWeek) {
                    const weekStart = currentWeek.startDate;
                    const dayOfWeek = Math.floor((today.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                    const weekProgress = Math.min(1, dayOfWeek / 7);
                    lessonsExpected += Math.floor((currentWeek.goals?.lessons || 0) * weekProgress);
                    questionsExpected += Math.floor((currentWeek.goals?.questions || 0) * weekProgress);
                  }
                  
                  recalculatedHealth = calculatePlanHealth(
                    currentWeek?.weekNumber || 1,
                    data.totalWeeks || 1,
                    mergedProgress.lessonsCompleted,
                    lessonsExpected,
                    mergedProgress.questionsAnswered,
                    questionsExpected,
                    mergedProgress.daysStudied,
                    mergedProgress.daysMissed || 0
                  );
                }
                
                if (mounted) {
                  setPlan(prev => prev ? {
                    ...prev,
                    progress: mergedProgress,
                    health: recalculatedHealth,
                  } : null);
                }
              } catch (err) {
                logger.warn('Deferred progress sync failed:', err);
              }
            };
            
            // Use requestIdleCallback if available, otherwise setTimeout
            if (typeof requestIdleCallback === 'function') {
              requestIdleCallback(() => syncProgress());
            } else {
              setTimeout(syncProgress, 2000);
            }
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
  }, [user, courseId, currentSection, planKey, refreshKey]);
  
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
  
  // Create a new study plan (or edit existing one, preserving history)
  const createPlan = useCallback(async (input: StudyPlanSetupInput): Promise<StudyPlan> => {
    if (!user) {
      throw new Error('Must be logged in to create a study plan');
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // ═══════════════════════════════════════════════════════════════════════
      // STEP 1: Fetch real progress FIRST — before generating the plan
      // This ensures the schedule accounts for work done BEFORE the plan existed.
      // Without this, a user who completed 20 lessons then creates a plan would
      // get a schedule for 45 lessons instead of 25 remaining.
      // ═══════════════════════════════════════════════════════════════════════
      const realProgress = await fetchRealProgress(user.uid, input.courseId, input.section);
      logger.info('Fetched real progress before plan generation', {
        lessonsCompleted: realProgress.lessonsCompleted,
        questionsAnswered: realProgress.questionsAnswered,
        simulationsCompleted: realProgress.simulationsCompleted,
      });
      
      // Check for existing plan to preserve historical weeks when editing
      const normalizedSection = resolveStudySection(input.courseId, input.section) || input.section;
      const existingPlanKey = `${input.courseId}_${normalizedSection}`;
      const existingPlanDoc = await getDoc(
        doc(db, 'users', user.uid, 'studyPlans', existingPlanKey)
      );
      
      // Convert existing plan dates if it exists (Firestore Timestamps → JS Dates)
      let existingPlan: StudyPlan | undefined;
      if (existingPlanDoc.exists()) {
        const data = existingPlanDoc.data() as StudyPlan;
        existingPlan = {
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
          // Inject real progress so generateStudyPlan knows what's already done
          progress: {
            ...data.progress,
            lessonsCompleted: realProgress.lessonsCompleted,
            questionsAnswered: realProgress.questionsAnswered,
            simulationsCompleted: realProgress.simulationsCompleted,
            flashcardsReviewed: realProgress.flashcardsReviewed,
          },
        };
        logger.info('Existing plan found — will preserve historical weeks', {
          planId: existingPlan.id,
          currentWeek: existingPlan.currentWeek,
          lessonsCompleted: realProgress.lessonsCompleted,
        });
      } else {
        // No existing plan — create a synthetic "existingPlan" with just progress
        // so generateStudyPlan can account for already-completed work
        // Check ALL activity types, not just lessons and questions
        const hasPriorActivity = 
          realProgress.lessonsCompleted > 0 || 
          realProgress.questionsAnswered > 0 ||
          realProgress.simulationsCompleted > 0 ||
          realProgress.flashcardsReviewed > 0 ||
          realProgress.essaysCompleted > 0 ||
          realProgress.cbqsCompleted > 0 ||
          realProgress.caseStudiesCompleted > 0 ||
          realProgress.mockExamsCompleted > 0;
          
        if (hasPriorActivity) {
          existingPlan = {
            progress: {
              lessonsCompleted: realProgress.lessonsCompleted,
              lessonsTotal: 0, // Will be filled in by generateStudyPlan
              questionsAnswered: realProgress.questionsAnswered,
              questionsTarget: 0,
              accuracy: realProgress.accuracy,
              accuracyTrend: 'stable',
              daysStudied: realProgress.daysStudied,
              daysMissed: 0,
              simulationsCompleted: realProgress.simulationsCompleted,
              flashcardsReviewed: realProgress.flashcardsReviewed,
              essaysCompleted: realProgress.essaysCompleted,
              cbqsCompleted: realProgress.cbqsCompleted,
              caseStudiesCompleted: realProgress.caseStudiesCompleted,
              mockExamsCompleted: realProgress.mockExamsCompleted,
            },
            weeks: [], // No historical weeks to preserve
          } as unknown as StudyPlan; // Partial object - generateStudyPlan only needs progress
          logger.info('No existing plan, but prior activity found — will generate schedule for remaining content', {
            lessonsCompleted: realProgress.lessonsCompleted,
            questionsAnswered: realProgress.questionsAnswered,
            simulationsCompleted: realProgress.simulationsCompleted,
            flashcardsReviewed: realProgress.flashcardsReviewed,
          });
        }
      }
      
      // Generate the plan (passes existing plan/progress for proper scheduling)
      const newPlan = generateStudyPlan(input, user.uid, existingPlan);
      
      // Merge all real progress into the new plan (all activity types)
      newPlan.progress = {
        ...newPlan.progress,
        // Core metrics
        lessonsCompleted: realProgress.lessonsCompleted,
        questionsAnswered: realProgress.questionsAnswered,
        accuracy: realProgress.accuracy,
        daysStudied: realProgress.daysStudied,
        // Extended metrics (TBS, flashcards, essays, etc.)
        simulationsCompleted: realProgress.simulationsCompleted,
        flashcardsReviewed: realProgress.flashcardsReviewed,
        essaysCompleted: realProgress.essaysCompleted,
        cbqsCompleted: realProgress.cbqsCompleted,
        caseStudiesCompleted: realProgress.caseStudiesCompleted,
        mockExamsCompleted: realProgress.mockExamsCompleted,
      };
      
      // Save to Firestore under user's studyPlans subcollection
      // Key is courseId_section, with section normalized for single-exam courses
      const savePlanKey = existingPlanKey;
      
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
      
      // Notify other hook instances (e.g. MainLayout nav dot) to re-fetch
      notifyPlanUpdated();
      
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
  
  // Refresh the plan from server (triggers re-fetch in all hook instances)
  const refreshPlan = useCallback(async () => {
    if (!user || !courseId || !currentSection) return;
    notifyPlanUpdated();
  }, [user, courseId, currentSection]);
  
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
