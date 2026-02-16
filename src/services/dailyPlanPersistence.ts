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
import { DailyPlan, DailyActivity, UserStudyState, RecentDaySnapshot, ActivityFeedbackRecord, ActivityFeedbackStats, generateDailyPlan } from './dailyPlanService';
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

/**
 * Tracks actual time spent on each activity type.
 * Stored in localStorage and periodically synced to Firestore.
 * Used by Phase 3 to personalize duration estimates.
 */
export interface ActivityDurationRecord {
  activityType: DailyActivity['type'];
  estimatedMinutes: number;
  actualMinutes: number;
  completedAt: string; // ISO date
}

const DURATION_STORAGE_KEY = 'voraprep_activity_durations';
const ACTIVITY_START_KEY = 'voraprep_activity_start';
const FEEDBACK_STORAGE_KEY = 'voraprep_activity_feedback';

const PLAN_VERSION = 1;

/**
 * Single-exam courses use one unified daily plan across all domains.
 * This prevents the plan from resetting when users navigate between domains.
 */
const SINGLE_EXAM_COURSES: CourseId[] = ['cisa', 'cfp'];

/**
 * For single-exam courses, normalize the section to 'ALL' for cache keys.
 * This ensures users get the same daily plan regardless of which domain they're viewing.
 */
const normalizeSectionForCache = (section: string | undefined, courseId?: CourseId): string => {
  if (courseId && SINGLE_EXAM_COURSES.includes(courseId)) {
    return 'ALL'; // Unified plan for single-exam courses
  }
  return section || 'default';
};

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
 * Clear today's plan cache (localStorage and optionally Firestore)
 * Call this when exam date or daily goal changes to force regeneration
 * @param userId - User ID
 * @param section - Optional section to clear (if not provided, clears all sections)
 */
export const clearTodaysPlan = async (userId: string, section?: string): Promise<void> => {
  if (!userId) return;
  
  const today = getTodayDate();
  
  // Clear localStorage cache
  try {
    if (section) {
      // Clear specific section cache
      const cacheKey = `daily_plan_${userId}_${today}_${section}`;
      localStorage.removeItem(cacheKey);
      logger.log(`Cleared daily plan cache for section ${section}`);
    } else {
      // Clear all section caches for today
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`daily_plan_${userId}_${today}`)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      logger.log(`Cleared ${keysToRemove.length} daily plan cache(s)`);
    }
  } catch (e) {
    logger.error('Error clearing localStorage cache:', e);
  }
};

/**
 * Get incomplete activities from recent previous days (up to 3 days back).
 *
 * Smarter carryover logic:
 * 1. Collects incomplete high/critical activities from up to 3 previous days
 * 2. Scores each by type value (TBS/mock > MCQ weak-area > MCQ general > flashcards)
 * 3. Deduplicates by activity type (max 1 per type in carryover)
 * 4. Returns top 3, newest first (most relevant)
 */
export const getPreviousIncomplete = async (userId: string): Promise<DailyActivity[]> => {
  if (!userId) return [];

  // Value score: higher = more important to carry over
  const typeScore: Record<string, number> = {
    mock_exam: 10,
    tbs: 8,
    essay: 7,
    cbq: 7,
    case_study: 6,
    timed_quiz: 5,
    mcq: 4,
    lesson: 3,
    review: 2,
    flashcards: 1,
  };

  try {
    const allIncomplete: Array<DailyActivity & { _dayAge: number; _score: number }> = [];
    const seenTypes = new Set<string>();

    // Scan last 3 days
    for (let i = 1; i <= 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const planRef = doc(db, 'users', userId, 'daily_plans', dateStr);
      const snapshot = await getDoc(planRef);

      if (!snapshot.exists()) continue;

      const pastPlan = snapshot.data() as PersistedDailyPlan;
      const completedSet = new Set(pastPlan.completedActivities || []);

      const incomplete = (pastPlan.activities || [])
        .filter(activity => !completedSet.has(activity.id))
        .filter(activity => activity.priority === 'critical' || activity.priority === 'high');

      for (const activity of incomplete) {
        // Deduplicate: max 1 carryover per activity type
        if (seenTypes.has(activity.type)) continue;
        seenTypes.add(activity.type);

        const priorityBoost = activity.priority === 'critical' ? 3 : 0;
        allIncomplete.push({
          ...activity,
          _dayAge: i,
          _score: (typeScore[activity.type] || 2) + priorityBoost,
        });
      }
    }

    if (allIncomplete.length === 0) return [];

    // Sort by score descending, then by recency (newest first)
    allIncomplete.sort((a, b) => {
      if (b._score !== a._score) return b._score - a._score;
      return a._dayAge - b._dayAge;
    });

    logger.debug(`Found ${allIncomplete.length} carryover candidates, taking top 3`);

    // Take top 3 and format
    return allIncomplete.slice(0, 3).map(activity => {
      const daysAgo = activity._dayAge === 1 ? 'yesterday' : `${activity._dayAge} days ago`;
      return {
        ...activity,
        id: `carryover-${activity.id}`,
        reason: `⏪ Carried over from ${daysAgo}: ${activity.reason}`,
        // Remove internal scoring fields
        _dayAge: undefined as any,
        _score: undefined as any,
      };
    });
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
  // For single-exam courses, use unified section 'ALL' to prevent plan reset on domain navigation
  const cacheSection = normalizeSectionForCache(state.section, courseId);

  // Try to fetch existing plan (unless force regenerate)
  // Pass normalized section to ensure consistent cache key
  if (!forceRegenerate) {
    const existingPlan = await fetchTodaysPlan(userId, cacheSection);
    if (existingPlan) {
      logger.log(`Using cached daily plan for section ${cacheSection}`);
      return existingPlan;
    }
  }

  // Generate new plan
  logger.log(`Generating new daily plan for section ${cacheSection}...`);

  // Inject weekly history for intelligent plan generation
  // Fetch last 7 days of plans and convert to lightweight snapshots
  let recentHistory: RecentDaySnapshot[] = [];
  try {
    const history = await getPlanHistory(userId, 7);
    recentHistory = history.map(plan => ({
      date: plan.date,
      activities: (plan.activities || []).map(a => ({
        type: a.type,
        topic: a.params?.topic,
        priority: a.priority,
      })),
      completedActivities: plan.completedActivities || [],
      totalActivities: plan.activities?.length || 0,
      hadMockExam: (plan.activities || []).some(a => a.type === 'mock_exam'),
    }));
  } catch (err) {
    logger.warn('Could not fetch plan history for weekly awareness:', err);
    // Graceful degradation — plan generates without weekly context
  }

  // Inject personalized duration data from tracked history
  let personalizedDurations: Record<string, number> | undefined;
  try {
    const durationStats = getActivityDurationStats();
    const pd: Record<string, number> = {};
    for (const [type, stat] of Object.entries(durationStats)) {
      if (stat) pd[type] = stat.avg; // only include types with enough data
    }
    if (Object.keys(pd).length > 0) {
      personalizedDurations = pd;
    }
  } catch {
    // Graceful degradation — use static defaults
  }

  // Inject micro-feedback data (liked/disliked activity types)
  let activityFeedback: ActivityFeedbackStats | undefined;
  try {
    const fb = getActivityFeedbackStats();
    if (fb.dislikedTypes.length > 0 || fb.likedTypes.length > 0) {
      activityFeedback = fb;
    }
  } catch {
    // Graceful degradation
  }

  const enrichedState: UserStudyState = {
    ...state,
    recentHistory,
    personalizedDurations,
    activityFeedback,
  };
  const newPlan = await generateDailyPlan(enrichedState, courseId);

  // Get carryover activities from recent previous days
  const rawCarryover = await getPreviousIncomplete(userId);

  // Deduplicate: skip carryover items whose type already appears in today's fresh plan
  const freshTypes = new Set(newPlan.activities.map(a => a.type));
  const carryoverActivities = rawCarryover.filter(a => !freshTypes.has(a.type));

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
    ...(carryoverActivities.length > 0
      ? { carryoverActivities, carryoverFrom: 'previous_days' as const }
      : {}),
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
    // Cache key uses normalized section (unified for single-exam courses)
    const cacheKey = `daily_plan_${userId}_${today}_${cacheSection}`;
    localStorage.setItem(cacheKey, JSON.stringify(persistedPlan));

    // 2. Save to Firestore - document path uses normalized section
    const docPath = `${today}_${cacheSection}`;
    const planRef = doc(db, 'users', userId, 'daily_plans', docPath);
    await setDoc(planRef, {
      ...persistedPlan,
      createdAt: Timestamp.fromDate(persistedPlan.createdAt),
      updatedAt: Timestamp.fromDate(persistedPlan.updatedAt),
    });
    logger.log(`Daily plan saved for section ${cacheSection}`);
  } catch (error) {
    logger.error('Error saving daily plan:', error);
    // Return plan anyway (can work in offline mode mostly)
  }

  return persistedPlan;
};

/**
 * Mark an activity as started (records timestamp for duration tracking).
 * Call this when the user clicks on an activity card.
 */
export const markActivityStarted = (activityId: string): void => {
  try {
    const starts = JSON.parse(localStorage.getItem(ACTIVITY_START_KEY) || '{}');
    starts[activityId] = Date.now();
    localStorage.setItem(ACTIVITY_START_KEY, JSON.stringify(starts));
  } catch {
    // Ignore localStorage errors
  }
};

/**
 * Mark an activity as completed
 * @param userId - User ID
 * @param activityId - Activity ID to mark complete
 * @param section - Exam section for the plan (e.g., 'FAR', 'AUD')
 * @param estimatedMinutes - Optional: the estimated duration for this activity
 * @param activityType - Optional: the activity type for duration tracking
 * @param courseId - Optional: Course ID (used to normalize section for single-exam courses)
 */
export const markActivityCompleted = async (
  userId: string,
  activityId: string,
  section?: string,
  estimatedMinutes?: number,
  activityType?: DailyActivity['type'],
  courseId?: CourseId
): Promise<void> => {
  if (!userId || !activityId) return;
  const today = getTodayDate();
  
  // Normalize section for single-exam courses
  const cacheSection = normalizeSectionForCache(section, courseId);

  try {
    // 1. Update LocalStorage first
    // Use normalized section for cache key
    const sectionKey = `daily_plan_${userId}_${today}_${cacheSection}`;
    const legacyKey = `daily_plan_${userId}_${today}`;
    const cacheKey = localStorage.getItem(sectionKey) ? sectionKey : legacyKey;
    
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
    // Use normalized section for doc path
    const docPath = `${today}_${cacheSection}`;
    const planRef = doc(db, 'users', userId, 'daily_plans', docPath);

    await updateDoc(planRef, {
      completedActivities: arrayUnion(activityId),
      updatedAt: Timestamp.now(),
    });

    // Track duration if we have a start time
    recordActivityDuration(activityId, estimatedMinutes, activityType);

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

// ============================================================================
// Activity Duration Tracking
// ============================================================================

/**
 * Record the actual duration of a completed activity.
 * Reads the start timestamp from localStorage, calculates elapsed time,
 * and appends to the rolling duration log.
 */
const recordActivityDuration = (
  activityId: string,
  estimatedMinutes?: number,
  activityType?: DailyActivity['type']
): void => {
  try {
    const starts = JSON.parse(localStorage.getItem(ACTIVITY_START_KEY) || '{}');
    const startTime = starts[activityId];
    if (!startTime || !activityType) return;

    const elapsedMs = Date.now() - startTime;
    const actualMinutes = Math.round(elapsedMs / 60000);

    // Ignore unreasonable durations (< 30 sec or > 4 hours)
    if (actualMinutes < 1 || actualMinutes > 240) return;

    const record: ActivityDurationRecord = {
      activityType,
      estimatedMinutes: estimatedMinutes || 0,
      actualMinutes,
      completedAt: new Date().toISOString(),
    };

    // Append to rolling log (keep last 200 records)
    const log: ActivityDurationRecord[] = JSON.parse(
      localStorage.getItem(DURATION_STORAGE_KEY) || '[]'
    );
    log.push(record);
    if (log.length > 200) log.splice(0, log.length - 200);
    localStorage.setItem(DURATION_STORAGE_KEY, JSON.stringify(log));

    // Clean up start entry
    delete starts[activityId];
    localStorage.setItem(ACTIVITY_START_KEY, JSON.stringify(starts));

    logger.log(`Duration tracked: ${activityType} estimated=${estimatedMinutes}min actual=${actualMinutes}min`);
  } catch {
    // Ignore — duration tracking is best-effort
  }
};

/**
 * Get average actual durations per activity type from tracked history.
 * Returns a map of activityType → average actual minutes.
 * Falls back to null if fewer than 3 data points for a given type.
 *
 * Used by Phase 3 to replace static ACTIVITY_DURATION constants.
 */
export const getActivityDurationStats = (): Record<string, { avg: number; count: number } | null> => {
  try {
    const log: ActivityDurationRecord[] = JSON.parse(
      localStorage.getItem(DURATION_STORAGE_KEY) || '[]'
    );

    const grouped: Record<string, number[]> = {};
    for (const r of log) {
      if (!grouped[r.activityType]) grouped[r.activityType] = [];
      grouped[r.activityType].push(r.actualMinutes);
    }

    const stats: Record<string, { avg: number; count: number } | null> = {};
    for (const [type, durations] of Object.entries(grouped)) {
      if (durations.length >= 3) {
        // Trim outliers: drop top and bottom 10%
        const sorted = [...durations].sort((a, b) => a - b);
        const trimCount = Math.max(1, Math.floor(sorted.length * 0.1));
        const trimmed = sorted.slice(trimCount, sorted.length - trimCount);
        const avg = trimmed.length > 0
          ? Math.round(trimmed.reduce((s, v) => s + v, 0) / trimmed.length)
          : Math.round(durations.reduce((s, v) => s + v, 0) / durations.length);
        stats[type] = { avg, count: durations.length };
      } else {
        stats[type] = null; // Not enough data yet
      }
    }

    return stats;
  } catch {
    return {};
  }
};

/**
 * Record a user's feedback on a completed activity.
 * Stored in localStorage (rolling log of last 100 records).
 */
export const recordActivityFeedback = (
  activityType: DailyActivity['type'],
  rating: 1 | -1,
  tag?: string
): void => {
  try {
    const record: ActivityFeedbackRecord = {
      activityType,
      rating,
      tag,
      recordedAt: new Date().toISOString(),
    };
    const log: ActivityFeedbackRecord[] = JSON.parse(
      localStorage.getItem(FEEDBACK_STORAGE_KEY) || '[]'
    );
    log.push(record);
    if (log.length > 100) log.splice(0, log.length - 100);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(log));
    logger.log(`Feedback recorded: ${activityType} rating=${rating} tag=${tag ?? 'none'}`);
  } catch {
    // Best-effort — non-critical
  }
};

/**
 * Aggregate feedback records into liked/disliked activity type lists.
 * A type is "disliked" if net rating (sum of +1/-1) is ≤ -2,
 * "liked" if net rating is ≥ +2. Requires at least 3 records.
 */
export const getActivityFeedbackStats = (): ActivityFeedbackStats => {
  const stats: ActivityFeedbackStats = { dislikedTypes: [], likedTypes: [] };
  try {
    const log: ActivityFeedbackRecord[] = JSON.parse(
      localStorage.getItem(FEEDBACK_STORAGE_KEY) || '[]'
    );
    const netScores: Record<string, { score: number; count: number }> = {};
    for (const r of log) {
      if (!netScores[r.activityType]) netScores[r.activityType] = { score: 0, count: 0 };
      netScores[r.activityType].score += r.rating;
      netScores[r.activityType].count += 1;
    }
    for (const [type, { score, count }] of Object.entries(netScores)) {
      if (count < 3) continue;
      if (score <= -2) stats.dislikedTypes.push(type as DailyActivity['type']);
      else if (score >= 2) stats.likedTypes.push(type as DailyActivity['type']);
    }
  } catch {
    // fallback: empty stats
  }
  return stats;
};

export default {
  fetchTodaysPlan,
  getOrCreateTodaysPlan,
  markActivityCompleted,
  markActivityStarted,
  getTodaysCompletionStatus,
  getPreviousIncomplete,
  getPlanHistory,
  getCompletionRate,
  getActivityDurationStats,
  recordActivityFeedback,
  getActivityFeedbackStats,
  clearTodaysPlan,
};
