/**
 * Daily Plan Persistence Service
 * 
 * Handles saving/loading daily plans from Firestore with:
 * 1. Plan caching (don't regenerate if already exists for today)
 * 2. Activity completion tracking (synced across devices)
 * 3. Carryover of incomplete activities from yesterday
 * 4. Plan history for analytics
 * 
 * Data Structure:
 * users/{uid}/daily_plans/{date} -> {
 *   ...DailyPlan,
 *   completedActivities: string[],
 *   carryoverFrom?: string, // Previous date if activities carried over
 *   version: number,
 * }
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { DailyPlan, DailyActivity, UserStudyState, generateDailyPlan } from './dailyPlanService';
import logger from '../utils/logger';
import type { CourseId } from '../types';

export interface PersistedDailyPlan extends DailyPlan {
  userId: string;
  completedActivities: string[];
  carryoverActivities?: DailyActivity[];
  carryoverFrom?: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

const PLAN_VERSION = 1;

/**
 * Get today's date as YYYY-MM-DD string
 */
const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Fetch today's plan from Firestore (if exists) or LocalStorage (offline)
 * @param userId - User ID
 * @param section - Exam section (e.g., 'FAR', 'AUD') - if provided, only returns plan if section matches
 */
export const fetchTodaysPlan = async (userId: string, section?: string): Promise<PersistedDailyPlan | null> => {
  if (!userId) return null;

  const today = getTodayDate();
  
  // Try LocalStorage first (cache-first strategy)
  // Cache key now includes section to prevent cross-section plan reuse
  const cacheKey = section 
    ? `daily_plan_${userId}_${today}_${section}`
    : `daily_plan_${userId}_${today}`;
    
  try {
      const localData = localStorage.getItem(cacheKey);
      if (localData) {
          const parsed = JSON.parse(localData);
          // Verify section matches if specified (extra safety check)
          if (section && parsed.section !== section) {
              logger.log(`Cached plan section (${parsed.section}) doesn't match requested (${section}), will regenerate`);
              return null;
          }
          // Convert date strings back to Date objects
          return {
              ...parsed,
              createdAt: new Date(parsed.createdAt),
              updatedAt: new Date(parsed.updatedAt),
          } as PersistedDailyPlan;
      }
  } catch (e) {
      // Ignore LC errors
  }

  try {
    // Firestore path includes section to keep plans separate per section
    const docPath = section 
      ? `${today}_${section}`
      : today;
    const planRef = doc(db, 'users', userId, 'daily_plans', docPath);
    const snapshot = await getDoc(planRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      const plan = {
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      } as PersistedDailyPlan;
      
      // Verify section matches if specified
      if (section && plan.section !== section) {
        logger.log(`Firestore plan section (${plan.section}) doesn't match requested (${section}), will regenerate`);
        return null;
      }
      
      // Update local cache with section in key
      const cacheKey = section 
        ? `daily_plan_${userId}_${today}_${section}`
        : `daily_plan_${userId}_${today}`;
      localStorage.setItem(cacheKey, JSON.stringify(plan));
      
      return plan;
    }

    return null;
  } catch (error) {
    logger.error('Error fetching today\'s plan:', error);
    return null;
  }
};

/**
 * Get incomplete activities from recent previous days (up to 3 days back)
 * This handles cases where user misses a day or two (e.g. skips weekend)
 */
export const getPreviousIncomplete = async (userId: string): Promise<DailyActivity[]> => {
  if (!userId) return [];

  try {
    // Check last 3 days
    for (let i = 1; i <= 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const planRef = doc(db, 'users', userId, 'daily_plans', dateStr);
      const snapshot = await getDoc(planRef);

      if (snapshot.exists()) {
        const pastPlan = snapshot.data() as PersistedDailyPlan;
        const completedSet = new Set(pastPlan.completedActivities || []);

        // check if plan has incomplete items
        const incomplete = pastPlan.activities
            .filter(activity => !completedSet.has(activity.id))
            .filter(activity => activity.priority === 'critical' || activity.priority === 'high');

        if (incomplete.length > 0) {
            logger.debug(`Found ${incomplete.length} carryover items from ${dateStr}`);
            
            return incomplete.map(activity => ({
                ...activity,
                // Update the ID to include today's date to avoid conflicts
                id: `carryover-${activity.id}`,
                reason: `⏪ From previous plan (${dateStr}): ${activity.reason}`,
            })).slice(0, 3); // Carry over max 3 activities
        }
      }
    }
    
    return [];
  } catch (error) {
    logger.error('Error fetching previous incomplete activities:', error);
    return [];
  }
};

/**
 * Get or create today's plan
 * This is the main entry point for the daily plan system
 */
export const getOrCreateTodaysPlan = async (
  userId: string,
  state: UserStudyState,
  courseId: CourseId = 'cpa',
  forceRegenerate: boolean = false
): Promise<PersistedDailyPlan> => {
  const today = getTodayDate();
  const section = state.section; // Use section from study state for cache key

  // Try to fetch existing plan (unless force regenerate)
  // Pass section to ensure we get a plan for the current section
  if (!forceRegenerate) {
    const existingPlan = await fetchTodaysPlan(userId, section);
    if (existingPlan) {
      logger.log(`Using cached daily plan for section ${section}`);
      return existingPlan;
    }
  }

  // Generate new plan
  logger.log(`Generating new daily plan for section ${section}...`);
  const newPlan = await generateDailyPlan(state, courseId);

  // Get carryover activities from recent previous days
  const carryoverActivities = await getPreviousIncomplete(userId);

  // Merge carryover with new activities (carryover first)
  const mergedActivities: DailyActivity[] = [
    ...carryoverActivities,
    ...newPlan.activities,
  ];

  // Create persisted plan
  const persistedPlan: PersistedDailyPlan = {
    ...newPlan,
    activities: mergedActivities,
    userId,
    completedActivities: [],
    carryoverActivities: carryoverActivities.length > 0 ? carryoverActivities : undefined,
    carryoverFrom: carryoverActivities.length > 0 ? 'previous_days' : undefined,
    version: PLAN_VERSION,
    createdAt: new Date(),
    updatedAt: new Date(),
    summary: {
      ...newPlan.summary,
      totalActivities: mergedActivities.length,
    },
  };

  // Save to Firestore and LocalStorage
  try {
    // 1. Save to LocalStorage (Immediate / Offline)
    // Cache key includes section to keep plans separate
    const cacheKey = `daily_plan_${userId}_${today}_${section}`;
    localStorage.setItem(cacheKey, JSON.stringify(persistedPlan));

    // 2. Save to Firestore - document path includes section
    const docPath = `${today}_${section}`;
    const planRef = doc(db, 'users', userId, 'daily_plans', docPath);
    await setDoc(planRef, {
      ...persistedPlan,
      createdAt: Timestamp.fromDate(persistedPlan.createdAt),
      updatedAt: Timestamp.fromDate(persistedPlan.updatedAt),
    });
    logger.log(`Daily plan saved for section ${section}`);
  } catch (error) {
    logger.error('Error saving daily plan:', error);
    // Return plan anyway (can work in offline mode mostly)
  }

  return persistedPlan;
};

/**
 * Mark an activity as completed
 * @param userId - User ID
 * @param activityId - Activity ID to mark complete
 * @param section - Exam section for the plan (e.g., 'FAR', 'AUD')
 */
export const markActivityCompleted = async (
  userId: string,
  activityId: string,
  section?: string
): Promise<void> => {
  if (!userId || !activityId) return;
  const today = getTodayDate();

  try {
    // 1. Update LocalStorage first
    // Try section-specific key first, fall back to legacy key
    const sectionKey = section ? `daily_plan_${userId}_${today}_${section}` : null;
    const legacyKey = `daily_plan_${userId}_${today}`;
    const cacheKey = sectionKey && localStorage.getItem(sectionKey) ? sectionKey : legacyKey;
    
    const localData = localStorage.getItem(cacheKey);
    if (localData) {
        const plan = JSON.parse(localData);
        if (!plan.completedActivities) plan.completedActivities = [];
        if (!plan.completedActivities.includes(activityId)) {
            plan.completedActivities.push(activityId);
            plan.updatedAt = new Date();
            localStorage.setItem(cacheKey, JSON.stringify(plan));
        }
    }

    // 2. Update Firestore
    // Try section-specific doc path first
    const docPath = section ? `${today}_${section}` : today;
    const planRef = doc(db, 'users', userId, 'daily_plans', docPath);

    await updateDoc(planRef, {
      completedActivities: arrayUnion(activityId),
      updatedAt: Timestamp.now(),
    });

    logger.log('Activity marked complete:', activityId);
  } catch (error) {
    logger.error('Error marking activity complete:', error);
    // Don't throw - allow offline completion to stick in UI via local state
  }
};

/**
 * Get completion status for today's activities
 * @param userId - User ID
 * @param section - Optional exam section for section-specific plan
 */
export const getTodaysCompletionStatus = async (
  userId: string,
  section?: string
): Promise<Set<string>> => {
  const plan = await fetchTodaysPlan(userId, section);
  return new Set(plan?.completedActivities || []);
};

/**
 * Get recent plan history for analytics
 */
export const getPlanHistory = async (
  userId: string,
  daysBack: number = 7
): Promise<PersistedDailyPlan[]> => {
  if (!userId) return [];

  try {
    const plansRef = collection(db, 'users', userId, 'daily_plans');
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
    const cutoffDateStr = cutoffDate.toISOString().split('T')[0];

    // Query plans from last N days
    const q = query(
      plansRef,
      where('date', '>=', cutoffDateStr),
      orderBy('date', 'desc'),
      limit(daysBack)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
    })) as PersistedDailyPlan[];
  } catch (error) {
    logger.error('Error fetching plan history:', error);
    return [];
  }
};

/**
 * Calculate completion rate from plan history
 */
export const getCompletionRate = async (
  userId: string,
  daysBack: number = 7
): Promise<{ rate: number; completed: number; total: number }> => {
  const history = await getPlanHistory(userId, daysBack);

  let totalActivities = 0;
  let completedActivities = 0;

  history.forEach(plan => {
    totalActivities += plan.activities.length;
    completedActivities += plan.completedActivities?.length || 0;
  });

  return {
    rate: totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0,
    completed: completedActivities,
    total: totalActivities,
  };
};

export default {
  fetchTodaysPlan,
  getOrCreateTodaysPlan,
  markActivityCompleted,
  getTodaysCompletionStatus,
  getPreviousIncomplete,
  getPlanHistory,
  getCompletionRate,
};
