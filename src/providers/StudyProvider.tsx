import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  increment,
  arrayUnion,
  collection,
  getDocs,
  getDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { useAuth } from './AuthProvider';
import { format } from 'date-fns';
import logger from '../utils/logger';
import { recordQuestionAnswer, recordTBSResult } from '../services/questionHistoryService';
import { recordAnswerToEngine } from '../services/adaptiveEngineAdapter';
import analytics, { trackEvent } from '../services/analytics';
import { getStudyPlanId, getCurrentSection } from '../utils/profileHelpers';
import { getDefaultSection } from '../utils/sectionUtils';
import { COURSES } from '../courses';
import { CourseId } from '../types/course';
import { useCourse } from './CourseProvider';
import { incrementStudyPlanProgress } from '../services/studyPlanService';
import sessionRecorder from '../services/sessionRecordingService';

export interface StudyPlan {
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface DailyLog {
  id: string;
  date: string;
  goalPoints: number;
  earnedPoints: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activities: any[];
  questionsAttempted: number;
  questionsAnswered?: number;  // Alias for questionsAttempted (for consistency with studyPlans)
  questionsCorrect: number;
  lessonsCompleted: number;
  simulationsCompleted: number;
  studyTimeMinutes: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface StudyContextType {
  studyPlan: StudyPlan | null;
  todayLog: DailyLog | null;
  currentStreak: number;
  loading: boolean;
  dailyProgress: number; // calculated percentage
  dailyGoalMet: boolean;
  weeklyStats: {
    totalQuestions: number;
    accuracy: number;
    totalMinutes: number;
    questionsTrend: number;
    accuracyTrend: number;
  };
  stats: { totalQuestions: number; accuracy: number } | null; // Section-filtered stats
  setCurrentStreak: (streak: number) => void;
  refreshStats: () => Promise<void>; // NEW: Force refresh stats
  recordMCQAnswer: (questionId: string, topic: string | undefined, subtopic: string | undefined, isCorrect: boolean, difficulty: string, timeSpentSeconds?: number, section?: string) => Promise<void>;
  completeLesson: (lessonId: string, section: string, timeSpent: number) => Promise<void>;
  completeSimulation: (id: string, score: number, timeSpent: number, section?: string) => Promise<void>;
  recordStudyActivity: (activityType: string, points: number, timeSpentMinutes: number, metadata?: Record<string, unknown>) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLessonProgress: () => Promise<Record<string, any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTopicPerformance: (section?: string) => Promise<any[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; 
}

const StudyContext = createContext<StudyContextType | null>(null);

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};

interface StudyProviderProps {
  children: ReactNode;
}

export const StudyProvider = ({ children }: StudyProviderProps) => {
  const { user, userProfile } = useAuth();
  const { courseId: activeCourse } = useCourse();
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [todayLog, setTodayLog] = useState<DailyLog | null>(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [stats, setStats] = useState<{ totalQuestions: number; accuracy: number } | null>(null);
  const [weeklyStats, setWeeklyStats] = useState<{
    totalQuestions: number;
    accuracy: number;
    totalMinutes: number;
    questionsTrend: number;
    accuracyTrend: number;
  }>({ totalQuestions: 0, accuracy: 0, totalMinutes: 0, questionsTrend: 0, accuracyTrend: 0 });
  const [loading, setLoading] = useState(true);
  const [statsVersion, setStatsVersion] = useState(0); // Trigger re-fetch when incremented

  // Always compute today fresh to avoid stale date after midnight
  const getToday = () => format(new Date(), 'yyyy-MM-dd');
  const today = getToday();
  
  // Get the current section for this course
  const currentSection = getCurrentSection(userProfile, activeCourse, getDefaultSection);
  
  // Course-level daily log ID (keeps all data together for aggregates)
  const dailyLogId = `${activeCourse}_${today}`;

  // Fetch study plan when user changes
  // Uses getStudyPlanId for multi-course support
  useEffect(() => {
    const planId = getStudyPlanId(userProfile, activeCourse);
    if (!user || !planId) {
      setStudyPlan(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid, 'study_plan', 'current'),
      (snapshot) => {
        if (snapshot.exists()) {
          setStudyPlan({ id: snapshot.id, ...snapshot.data() });
        } else {
          setStudyPlan(null);
        }
        setLoading(false);
      },
      (error) => {
        logger.error('Error fetching study plan:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, userProfile]);

  // Fetch/create today's daily log (course-specific)
  useEffect(() => {
    if (!user) {
      setTodayLog(null);
      return;
    }

    const dailyLogRef = doc(db, 'users', user.uid, 'daily_log', dailyLogId);

    const unsubscribe = onSnapshot(dailyLogRef, async (snapshot) => {
      if (snapshot.exists()) {
        setTodayLog({ id: snapshot.id, ...snapshot.data() } as DailyLog);
      } else {
        // Create today's log if it doesn't exist (course-specific)
        const newLog = {
          date: today,
          courseId: activeCourse,
          goalPoints: userProfile?.dailyGoal || 50,
          earnedPoints: 0,
          activities: [],
          questionsAttempted: 0,
          questionsAnswered: 0,
          questionsCorrect: 0,
          lessonsCompleted: 0,
          simulationsCompleted: 0,
          studyTimeMinutes: 0,
          createdAt: serverTimestamp(),
        };

        // We use setDoc but don't wait for it to block the UI too long
        // The snapshot listener will pick it up when written
        await setDoc(dailyLogRef, newLog);
      }
    });

    return () => unsubscribe();
  }, [user, dailyLogId, userProfile?.dailyGoal]);

  // Fetch weekly stats and calculate streak - now section-aware
  useEffect(() => {
    logger.debug('[STREAK] useEffect triggered, user:', !!user, 'activeCourse:', activeCourse, 'currentSection:', currentSection);
    if (!user) {
      setWeeklyStats({ totalQuestions: 0, accuracy: 0, totalMinutes: 0, questionsTrend: 0, accuracyTrend: 0 });
      setStats(null);
      setCurrentStreak(0);
      return;
    }

    const fetchWeeklyData = async () => {
      logger.debug('[STREAK] fetchWeeklyData starting...');
      try {
        // Get logs for the past 7 days (this week)
        // Use course-prefixed doc IDs to ensure we only get this course's data
        const thisWeekIds: string[] = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          thisWeekIds.push(`${activeCourse}_${format(date, 'yyyy-MM-dd')}`);
        }

        // Get logs for the previous 7 days (last week) for comparison
        const lastWeekIds: string[] = [];
        for (let i = 7; i < 14; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          lastWeekIds.push(`${activeCourse}_${format(date, 'yyyy-MM-dd')}`);
        }

        const dailyLogCollection = collection(db, 'users', user.uid, 'daily_log');
        
        // Fetch this week — use doc ID query to get only this course's logs
        // Firestore 'in' queries support up to 10 values, 7 fits perfectly
        const thisWeekQuery = query(dailyLogCollection, where('__name__', 'in', thisWeekIds));
        const thisWeekSnapshot = await getDocs(thisWeekQuery);

        // Get sections that belong to the current course for filtering
        const courseSections = COURSES[activeCourse as CourseId]?.sections?.map(s => s.id) || [];
        
        // Course-filtered counts (all sections in this course)
        let totalQuestions = 0;
        let totalCorrect = 0;
        let totalMinutes = 0;
        // Section-filtered counts (current section only)
        let sectionQuestions = 0;
        let sectionCorrect = 0;

        thisWeekSnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          
          // Skip if this log is for a different course (for backwards compatibility)
          if (data.courseId && data.courseId !== activeCourse) return;

          // Use the top-level studyTimeMinutes field (same source as todayLog)
          // to avoid discrepancy between today and weekly totals
          if (data.studyTimeMinutes) {
            totalMinutes += data.studyTimeMinutes;
          }

          // Count course-specific stats from activities
          if (data.activities && Array.isArray(data.activities)) {
            data.activities.forEach((activity: { type: string; section?: string; isCorrect?: boolean; timeSpentSeconds?: number; timeSpent?: number }) => {
              const activitySection = activity.section || 'unknown';
              const belongsToCourse = courseSections.includes(activitySection);
              
              if (belongsToCourse) {
                if (activity.type === 'mcq') {
                  totalQuestions++;
                  if (activity.isCorrect) totalCorrect++;
                }
              }
              
              // Section-specific stats (current section within course)
              if (activity.type === 'mcq' && activitySection === currentSection) {
                sectionQuestions++;
                if (activity.isCorrect) sectionCorrect++;
              }
            });
          }
        });

        // Fetch last week for trend comparison
        const lastWeekQuery = query(dailyLogCollection, where('__name__', 'in', lastWeekIds));
        const lastWeekSnapshot = await getDocs(lastWeekQuery);

        let lastWeekQuestions = 0;
        let lastWeekCorrect = 0;

        lastWeekSnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          
          // Filter last week by course sections for accurate trends
          if (data.activities && Array.isArray(data.activities)) {
            data.activities.forEach((activity: { type: string; section?: string; isCorrect?: boolean }) => {
              const activitySection = activity.section || 'unknown';
              if (courseSections.includes(activitySection) && activity.type === 'mcq') {
                lastWeekQuestions++;
                if (activity.isCorrect) lastWeekCorrect++;
              }
            });
          }
        });

        const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
        const lastWeekAccuracy = lastWeekQuestions > 0 ? Math.round((lastWeekCorrect / lastWeekQuestions) * 100) : 0;
        
        // Section-specific accuracy
        const sectionAccuracy = sectionQuestions > 0 ? Math.round((sectionCorrect / sectionQuestions) * 100) : 0;

        // Calculate trends (percentage change from last week)
        const questionsTrend = lastWeekQuestions > 0 
          ? Math.round(((totalQuestions - lastWeekQuestions) / lastWeekQuestions) * 100)
          : totalQuestions > 0 ? 100 : 0;
        const accuracyTrend = lastWeekAccuracy > 0 
          ? Math.round(accuracy - lastWeekAccuracy) // Simple difference for accuracy
          : 0;

        setWeeklyStats({ totalQuestions, accuracy, totalMinutes, questionsTrend, accuracyTrend });
        
        // Set section-filtered stats
        setStats({ totalQuestions: sectionQuestions, accuracy: sectionAccuracy });

        // Calculate streak (consecutive days with activity, per-section for multi-section exams)
        // For CPA/EA/CMA/CIA: streak is per-section (e.g., studying FAR daily)
        // For CISA/CFP: streak is per-exam (any activity counts)
        let streak = 0;
        const streakDates: string[] = [];
        for (let i = 0; i < 30; i++) {
          const checkDate = new Date();
          checkDate.setDate(checkDate.getDate() - i);
          streakDates.push(format(checkDate, 'yyyy-MM-dd'));
        }
        
        // Determine if this is a single-exam course
        const SINGLE_EXAM_COURSES_LOCAL: CourseId[] = ['cisa', 'cfp'];
        const isSingleExamCourse = SINGLE_EXAM_COURSES_LOCAL.includes(activeCourse as CourseId);
        
        logger.debug('[STREAK] === Starting streak calculation ===');
        logger.debug('[STREAK] activeCourse:', activeCourse, 'currentSection:', currentSection, 'isSingleExam:', isSingleExamCourse);
        logger.debug('[STREAK] User UID:', user.uid);
        logger.debug('[STREAK] Checking dates:', streakDates.slice(0, 5).join(', '), '...');
        
        // Use course-level log IDs (data is stored at course level with activities having section field)
        const streakLogIds = streakDates.map(d => `${activeCourse}_${d}`);
        logger.debug('[STREAK] Looking for log IDs:', streakLogIds.slice(0, 3).join(', '), '...');
        
        // Batch into chunks of 10 (Firestore 'in' limit)
        // Store full doc data so we can filter activities by section
        const streakDocs = new Map<string, { 
          earnedPoints: number; 
          questionsAttempted: number; 
          activities?: Array<{ section?: string; type?: string }>;
        }>();
        for (let batch = 0; batch < streakLogIds.length; batch += 10) {
          const batchIds = streakLogIds.slice(batch, batch + 10);
          const streakQuery = query(
            collection(db, 'users', user.uid, 'daily_log'),
            where('__name__', 'in', batchIds)
          );
          const streakSnap = await getDocs(streakQuery);
          // DEBUG: Log what we found
          logger.debug('[STREAK] Query batch', batch/10, 'returned', streakSnap.size, 'docs');
          streakSnap.forEach(docSnap => {
            const data = docSnap.data();
            logger.debug('[STREAK] Doc:', docSnap.id, 'earnedPoints:', data.earnedPoints, 'questionsAttempted:', data.questionsAttempted, 'activities:', JSON.stringify(data.activities?.slice(0, 2)));
            streakDocs.set(docSnap.id, {
              earnedPoints: data.earnedPoints || 0,
              questionsAttempted: data.questionsAttempted || 0,
              activities: data.activities || []
            });
          });
        }
        
        // Count consecutive days starting from today
        // For multi-section courses: only count days with activity in the CURRENT section
        // For single-exam courses: count any activity
        logger.debug('[STREAK] Total docs found:', streakDocs.size, 'Map keys:', Array.from(streakDocs.keys()).join(', '));
        for (let i = 0; i < streakDates.length; i++) {
          const logId = `${activeCourse}_${streakDates[i]}`;
          const dayData = streakDocs.get(logId);
          
          // Determine if there was activity
          let hadActivity = false;
          if (dayData) {
            if (isSingleExamCourse) {
              // For single-exam courses: any activity counts
              hadActivity = dayData.earnedPoints > 0 || dayData.questionsAttempted > 0;
            } else {
              // For multi-section courses: filter activities by current section
              const sectionActivities = dayData.activities?.filter(
                a => a.section?.toUpperCase() === currentSection?.toUpperCase()
              ) || [];
              hadActivity = sectionActivities.length > 0;
              logger.debug('[STREAK] Day', i, 'section activities:', sectionActivities.length, 'for section:', currentSection);
            }
          }
          // For today (i=0): also check live todayLog state which may have activity
          // recorded after the Firestore streak query ran
          if (!hadActivity && i === 0 && todayLog) {
            if (isSingleExamCourse) {
              hadActivity = (todayLog.earnedPoints || 0) > 0 || (todayLog.questionsAttempted || 0) > 0;
            } else {
              const liveSectionActivities = (todayLog.activities || []).filter(
                (a: { section?: string }) => a.section?.toUpperCase() === currentSection?.toUpperCase()
              );
              hadActivity = liveSectionActivities.length > 0;
            }
            if (hadActivity) logger.debug('[STREAK] Day 0 activity found via live todayLog');
          }
          
          if (hadActivity) {
            streak++;
            logger.debug('[STREAK] Day', i, streakDates[i], 'HAD activity, streak now:', streak);
          } else if (i > 0) {
            // Don't break on today (i=0) if no activity yet - they might study today
            logger.debug('[STREAK] Day', i, streakDates[i], 'NO activity, breaking');
            break;
          } else {
            logger.debug('[STREAK] Day 0 (today) no activity yet, continuing');
          }
        }
        logger.debug('[STREAK] Final streak:', streak);
        // GA4 analytics — track streaks
        if (streak >= 2) {
          analytics.maintainStreak(streak);
        }
        setCurrentStreak(streak);
      } catch (error) {
        logger.error('[STREAK] Error in fetchWeeklyData:', error);
        logger.error('Error fetching weekly data:', error);
      }
    };

    // Defer initial fetch to avoid competing with critical data on boot
    // (auth, daily log, subscription). Subsequent fetches (section change, refresh) run immediately.
    const isInitialFetch = !weeklyStats.totalQuestions && !stats;
    const delay = isInitialFetch ? 1500 : 0;
    const timer = setTimeout(() => {
      fetchWeeklyData().catch(err => logger.error('[STREAK] fetchWeeklyData promise rejected:', err));
    }, delay);
    return () => clearTimeout(timer);
    // NOTE: todayLog intentionally excluded — it changes on every MCQ answer,
    // which would trigger 5 Firestore queries per answer. Use refreshStats() instead.
  }, [user, currentSection, activeCourse, statsVersion]); // Re-run when course/section changes or stats forced refresh
  
  // Function to force refresh stats (called when section changes)
  const refreshStats = async () => {
    setStatsVersion(v => v + 1); // Increment version to trigger useEffect
  };

  // Implementations
  const recordMCQAnswer = async (questionId: string, topic: string = 'General', subtopic: string = 'General', isCorrect: boolean, difficulty: string = 'medium', timeSpentSeconds: number = 0, section?: string) => {
    if (!user) return;
    void subtopic;
    try {
        const points = isCorrect ? (difficulty === 'hard' ? 3 : difficulty === 'medium' ? 2 : 1) : 0;
        // Convert seconds to minutes (round to 1 decimal place, minimum 0.1 min per question)
        const timeSpentMinutes = Math.max(0.1, Math.round((timeSpentSeconds / 60) * 10) / 10);
        const logRef = doc(db, 'users', user.uid, 'daily_log', dailyLogId);
        
        // Use setDoc with merge to handle case where doc doesn't exist yet
        // Note: questionsAttempted is legacy name, questionsAnswered is preferred
        // Both written for backwards compatibility with existing data reads
        await setDoc(logRef, {
            earnedPoints: increment(points),
            questionsAttempted: increment(1),
            questionsAnswered: increment(1),  // Alias for consistency with studyPlans
            questionsCorrect: increment(isCorrect ? 1 : 0),
            studyTimeMinutes: increment(timeSpentMinutes),
            activities: arrayUnion({
              type: 'mcq',
              questionId,
              topic,
              section: section || 'unknown',
              isCorrect,
              points,
              timeSpentSeconds,
              timestamp: new Date().toISOString()
            })
        }, { merge: true });
        
        // IMPORTANT: Also record in question history for spaced repetition & deduplication
        await recordQuestionAnswer(user.uid, {
          questionId,
          isCorrect,
          topic: topic || 'General',
          section: section || 'unknown',
          answeredAt: new Date(),
        });

        // Feed answer into the adaptive engine (SM-2 scheduling, difficulty tracking)
        // Fire-and-forget — engine errors should never block the UI
        void recordAnswerToEngine(
          activeCourse as CourseId,
          questionId,
          section || 'unknown',
          isCorrect,
          {
            topic: topic || 'General',
            difficulty,
            timeSpentSeconds,
          }
        );

        // GA4 analytics — track every question answered
        analytics.answerQuestion(isCorrect, section, topic || 'General');

        // Session recording — track MCQ answer for complete user journey
        sessionRecorder.trackCustomEvent('question_answer', window.location.pathname, {
          section: section || 'unknown',
          courseId: activeCourse,
          metadata: {
            questionId,
            topic: topic || 'General',
            isCorrect,
            difficulty,
            timeSpentSeconds,
          },
        });

        // If streak is 0 but we just recorded activity, bump to 1
        if (currentStreak === 0) {
          setCurrentStreak(1);
        }

        // Update study plan progress (non-blocking)
        incrementStudyPlanProgress(user.uid, activeCourse, section || currentSection, {
          questionsAnswered: 1,
          accuracy: isCorrect ? 100 : 0,
        }).catch(err => logger.warn('Failed to update study plan progress from MCQ:', err));
    } catch (e) {
        logger.error("Error recording answer", e);
    }
  };

  const completeSimulation = async (id: string, score: number, timeSpent: number, section?: string) => {
      if (!user) return;
      try {
        const earnedPoints = Math.round((score / 100) * 50); // Max 50 points per sim
        const logRef = doc(db, 'users', user.uid, 'daily_log', dailyLogId);
        const activity = {
          type: 'simulation',
          id,
          section: section || 'unknown',
          score,
          points: earnedPoints,
          timeSpent,
          timestamp: new Date().toISOString()
        };

        // Check if daily log exists, create if not (updateDoc fails on missing doc)
        const logSnap = await getDoc(logRef);
        if (!logSnap.exists()) {
          await setDoc(logRef, {
            date: getToday(),
            goalPoints: userProfile?.dailyGoal || 50,
            earnedPoints: earnedPoints,
            questionsAttempted: 0,
            questionsAnswered: 0,
            questionsCorrect: 0,
            lessonsCompleted: 0,
            simulationsCompleted: 1,
            studyTimeMinutes: timeSpent,
            createdAt: serverTimestamp(),
            activities: [activity]
          });
        } else {
          await updateDoc(logRef, {
            earnedPoints: increment(earnedPoints),
            simulationsCompleted: increment(1),
            studyTimeMinutes: increment(timeSpent),
            activities: arrayUnion(activity)
          });
        }
        
        // Record in TBS history for mastery tracking
        await recordTBSResult(user.uid, id, score, section || 'unknown', timeSpent * 60);

        // GA4 analytics — track simulation/exam completion
        analytics.completeExam(section || 'unknown', score, score >= 75);

        // Session recording — track simulation completion for complete user journey
        sessionRecorder.trackCustomEvent('practice_end', window.location.pathname, {
          section: section || 'unknown',
          courseId: activeCourse,
          metadata: {
            simulationId: id,
            score,
            passed: score >= 75,
            timeSpentMinutes: timeSpent,
          },
        });

        // Update study plan progress (non-blocking)
        incrementStudyPlanProgress(user.uid, activeCourse, section || currentSection, {
          questionsAnswered: 1,
        }).catch(err => logger.warn('Failed to update study plan progress from simulation:', err));
      } catch (e) {
          logger.error("Error completing simulation", e);
      }
  };

  const completeLesson = async (lessonId: string, section: string, timeSpent: number) => {
      if (!user) return;
      try {
        const earnedPoints = 10; // Fixed points per lesson
        const logRef = doc(db, 'users', user.uid, 'daily_log', dailyLogId);
        const lessonRef = doc(db, 'users', user.uid, 'lessons', lessonId);
        
        // Check if daily log exists, create if not
        const logSnap = await getDoc(logRef);
        if (!logSnap.exists()) {
          // Create the daily log first
          await setDoc(logRef, {
            date: today,
            goalPoints: userProfile?.dailyGoal || 50,
            earnedPoints: earnedPoints,
            questionsAttempted: 0,
            questionsAnswered: 0,
            questionsCorrect: 0,
            lessonsCompleted: 1,
            simulationsCompleted: 0,
            studyTimeMinutes: timeSpent,
            createdAt: serverTimestamp(),
            activities: [{
              type: 'lesson',
              lessonId,
              section,
              courseId: activeCourse,
              points: earnedPoints,
              timeSpent,
              timestamp: new Date().toISOString()
            }]
          });
        } else {
          // Update existing daily log
          await updateDoc(logRef, {
              earnedPoints: increment(earnedPoints),
              lessonsCompleted: increment(1),
              studyTimeMinutes: increment(timeSpent),
              activities: arrayUnion({
                type: 'lesson',
                lessonId,
                section,
                courseId: activeCourse,
                points: earnedPoints,
                timeSpent,
                timestamp: new Date().toISOString()
              })
          });
        }
        
        // Mark lesson as completed in user's lessons subcollection
        await setDoc(lessonRef, {
          completedAt: serverTimestamp(),
          status: 'completed',
          section,
          courseId: activeCourse,
          timeSpent,
        }, { merge: true });
        
        // Update study plan progress (non-blocking)
        incrementStudyPlanProgress(user.uid, activeCourse, section, {
          lessonsCompleted: 1,
        }).catch(err => logger.warn('Failed to update study plan progress:', err));
        
        // GA4 analytics — track lesson completion
        trackEvent('lesson_complete', {
          lesson_id: lessonId,
          exam_section: section,
          course_id: activeCourse,
          time_spent_minutes: timeSpent,
        });

        // Session recording — track lesson completion for complete user journey
        sessionRecorder.trackCustomEvent('lesson_complete', window.location.pathname, {
          section,
          courseId: activeCourse,
          metadata: {
            lessonId,
            timeSpentMinutes: timeSpent,
            points: earnedPoints,
          },
        });

        logger.log('Lesson completed:', lessonId);
      } catch (e) {
          logger.error("Error completing lesson", e);
      }
  };

  /**
   * Generic study activity recorder for flashcards, essays, written communication, etc.
   * Increments earnedPoints and studyTimeMinutes in the daily log.
   */
  const recordStudyActivity = async (
    activityType: string,
    points: number,
    timeSpentMinutes: number,
    metadata: Record<string, unknown> = {}
  ) => {
    if (!user) return;
    try {
      const logRef = doc(db, 'users', user.uid, 'daily_log', dailyLogId);
      await setDoc(logRef, {
        earnedPoints: increment(points),
        studyTimeMinutes: increment(timeSpentMinutes),
        activities: arrayUnion({
          type: activityType,
          points,
          courseId: activeCourse,
          timestamp: new Date().toISOString(),
          ...metadata,
        }),
      }, { merge: true });
      logger.log(`Study activity recorded: ${activityType}, +${points}pts`);
    } catch (e) {
      logger.error('Error recording study activity:', e);
    }
  };

  const getLessonProgress = async () => {
      if (!user) return {};
       try {
        const q = collection(db, 'users', user.uid, 'lessons');
        const snapshot = await getDocs(q);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const progress: Record<string, any> = {};
        snapshot.docs.forEach(doc => {
            progress[doc.id] = doc.data();
        });
        return progress;
      } catch (error) {
        logger.error('Error fetching lesson progress:', error);
        return {};
      }
  }

  const getTopicPerformance = async (section?: string) => {
    if (!user) return [];
    
    try {
      // Aggregate topic performance from daily log activities
      // Limit to last 90 days to avoid fetching entire history (performance)
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 90);
      const cutoffDateStr = format(cutoffDate, 'yyyy-MM-dd');
      
      const dailyLogCollection = collection(db, 'users', user.uid, 'daily_log');
      const recentLogsQuery = query(dailyLogCollection, where('date', '>=', cutoffDateStr));
      const logsSnapshot = await getDocs(recentLogsQuery);
      
      const topicStats: Record<string, { correct: number; total: number }> = {};
      
      logsSnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Skip logs from other courses
        if (data.courseId && data.courseId !== activeCourse) return;
        // Also check doc ID prefix for course-specific logs (format: {course}_{date})
        if (doc.id.includes('_') && !doc.id.startsWith(`${activeCourse}_`)) return;
        
        // Determine if this is a single-exam course (no section filtering needed)
        const SINGLE_EXAM_COURSES_TOPIC: CourseId[] = ['cisa', 'cfp'];
        const isSingleExamCourse = SINGLE_EXAM_COURSES_TOPIC.includes(activeCourse as CourseId);
        
        if (data.activities && Array.isArray(data.activities)) {
          data.activities.forEach((activity: { type: string; topic?: string; isCorrect?: boolean; section?: string }) => {
            // For multi-section courses: strict section filter (activity MUST have matching section)
            // For single-exam courses: include all activities
            if (!isSingleExamCourse && section) {
              // Strict filter: activity must have section field AND it must match
              if (!activity.section || activity.section.toUpperCase() !== section.toUpperCase()) {
                return;
              }
            }
            if (activity.type === 'mcq' && activity.topic) {
              if (!topicStats[activity.topic]) {
                topicStats[activity.topic] = { correct: 0, total: 0 };
              }
              topicStats[activity.topic].total++;
              if (activity.isCorrect) {
                topicStats[activity.topic].correct++;
              }
            }
          });
        }
      });
      
      // Convert to array format expected by Progress page
      return Object.entries(topicStats).map(([topic, stats]) => ({
        id: topic,
        topic,
        accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
        questions: stats.total,
      }));
    } catch (error) {
      logger.error('Error fetching topic performance:', error);
      return [];
    }
  }

  // Compute section-filtered earned points from activities
  // For multi-section courses (CPA, EA, CMA, CIA): show only current section's points
  // For single-exam courses (CISA, CFP): show course-wide total
  const SINGLE_EXAM_COURSES_DAILY: CourseId[] = ['cisa', 'cfp'];
  const isSingleExamForGoal = SINGLE_EXAM_COURSES_DAILY.includes(activeCourse as CourseId);

  const sectionEarnedPoints = (() => {
    if (!todayLog) return 0;
    if (isSingleExamForGoal) return todayLog.earnedPoints;
    if (!todayLog.activities || !Array.isArray(todayLog.activities)) return 0;

    return todayLog.activities.reduce((sum: number, activity: { section?: string; points?: number; type?: string; isCorrect?: boolean; score?: number }) => {
      if (activity.section?.toUpperCase() !== currentSection?.toUpperCase()) return sum;
      // Use stored points if available (new format)
      if (typeof activity.points === 'number') return sum + activity.points;
      // Estimate points for legacy activities without points field
      if (activity.type === 'mcq') return sum + (activity.isCorrect ? 2 : 0); // ~medium difficulty
      if (activity.type === 'lesson') return sum + 10;
      if (activity.type === 'simulation') return sum + Math.round(((activity.score || 0) / 100) * 50);
      return sum;
    }, 0);
  })();

  // Calculate daily progress percentage (section-filtered for multi-section courses)
  const dailyProgress = todayLog 
    ? Math.min(100, Math.round((sectionEarnedPoints / todayLog.goalPoints) * 100)) 
    : 0;

  const dailyGoalMet = dailyProgress >= 100;

  const value: StudyContextType = {
    studyPlan,
    todayLog,
    currentStreak,
    loading,
    dailyProgress,
    dailyGoalMet,
    sectionEarnedPoints,
    weeklyStats,
    stats, // NEW: Section-filtered stats
    setCurrentStreak,
    refreshStats, // NEW: Force refresh function
    recordMCQAnswer,
    completeLesson,
    completeSimulation,
    recordStudyActivity,
    getLessonProgress,
    getTopicPerformance
  };

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
};

export default StudyProvider;
