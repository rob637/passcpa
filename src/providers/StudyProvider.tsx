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
  
  
  // Course-specific daily log ID to keep progress separate per course
  const dailyLogId = `${activeCourse}_${today}`;
  const currentSection = getCurrentSection(userProfile, activeCourse, getDefaultSection);

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
    if (!user) {
      setWeeklyStats({ totalQuestions: 0, accuracy: 0, totalMinutes: 0, questionsTrend: 0, accuracyTrend: 0 });
      setStats(null);
      setCurrentStreak(0);
      return;
    }

    const fetchWeeklyData = async () => {
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
        const thisWeekQuery = query(dailyLogCollection, where('__name__', 'in', thisWeekIds.map(id => `users/${user.uid}/daily_log/${id}`)));
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
        const lastWeekQuery = query(dailyLogCollection, where('__name__', 'in', lastWeekIds.map(id => `users/${user.uid}/daily_log/${id}`)));
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

        // Calculate streak (consecutive days with earnedPoints > 0, course-specific)
        // Use a single batch query instead of 30 individual reads
        let streak = 0;
        const streakDates: string[] = [];
        for (let i = 0; i < 30; i++) {
          const checkDate = new Date();
          checkDate.setDate(checkDate.getDate() - i);
          streakDates.push(format(checkDate, 'yyyy-MM-dd'));
        }
        
        // Firestore 'in' queries support up to 30 values
        const streakLogIds = streakDates.map(d => `${activeCourse}_${d}`);
        
        // Batch into chunks of 10 (Firestore 'in' limit)
        const streakDocs = new Map<string, number>();
        for (let batch = 0; batch < streakLogIds.length; batch += 10) {
          const batchIds = streakLogIds.slice(batch, batch + 10);
          const streakQuery = query(
            collection(db, 'users', user.uid, 'daily_log'),
            where('__name__', 'in', batchIds)
          );
          const streakSnap = await getDocs(streakQuery);
          streakSnap.forEach(docSnap => {
            streakDocs.set(docSnap.id, docSnap.data().earnedPoints || 0);
          });
        }
        
        // Count consecutive days starting from today
        for (let i = 0; i < streakDates.length; i++) {
          const logId = `${activeCourse}_${streakDates[i]}`;
          const points = streakDocs.get(logId) || 0;
          if (points > 0) {
            streak++;
          } else if (i > 0) {
            // Don't break on today (i=0) if no activity yet
            break;
          }
        }
        // GA4 analytics — track streaks
        if (streak >= 2) {
          analytics.maintainStreak(streak);
        }
        setCurrentStreak(streak);
      } catch (error) {
        logger.error('Error fetching weekly data:', error);
      }
    };

    fetchWeeklyData();
  }, [user, todayLog, currentSection, activeCourse, statsVersion]); // Re-run when course/section changes or stats forced refresh
  
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
        await setDoc(logRef, {
            earnedPoints: increment(points),
            questionsAttempted: increment(1),
            questionsCorrect: increment(isCorrect ? 1 : 0),
            studyTimeMinutes: increment(timeSpentMinutes),
            activities: arrayUnion({
              type: 'mcq',
              questionId,
              topic,
              section: section || 'unknown',
              isCorrect,
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
        
        // GA4 analytics — track lesson completion
        trackEvent('lesson_complete', {
          lesson_id: lessonId,
          exam_section: section,
          course_id: activeCourse,
          time_spent_minutes: timeSpent,
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
        
        if (data.activities && Array.isArray(data.activities)) {
          data.activities.forEach((activity: { type: string; topic?: string; isCorrect?: boolean; section?: string }) => {
            // Filter by section if provided
            if (section && activity.section && activity.section !== section) {
              return;
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

  // Calculate daily progress percentage
  const dailyProgress = todayLog 
    ? Math.min(100, Math.round((todayLog.earnedPoints / todayLog.goalPoints) * 100)) 
    : 0;

  const dailyGoalMet = dailyProgress >= 100;

  const value: StudyContextType = {
    studyPlan,
    todayLog,
    currentStreak,
    loading,
    dailyProgress,
    dailyGoalMet,
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
