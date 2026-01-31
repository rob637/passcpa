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
  setCurrentStreak: (streak: number) => void;
  recordMCQAnswer: (questionId: string, topic: string | undefined, subtopic: string | undefined, isCorrect: boolean, difficulty: string, timeSpentSeconds?: number) => Promise<void>;
  completeLesson: (lessonId: string, section: string, timeSpent: number) => Promise<void>;
  completeSimulation: (id: string, score: number, timeSpent: number) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLessonProgress: () => Promise<Record<string, any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTopicPerformance: () => Promise<any[]>;
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

  // Core study state
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [todayLog, setTodayLog] = useState<DailyLog | null>(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [weeklyStats, setWeeklyStats] = useState<{
    totalQuestions: number;
    accuracy: number;
    totalMinutes: number;
    questionsTrend: number;
    accuracyTrend: number;
  }>({ totalQuestions: 0, accuracy: 0, totalMinutes: 0, questionsTrend: 0, accuracyTrend: 0 });
  const [loading, setLoading] = useState(true);

  const today = format(new Date(), 'yyyy-MM-dd');

  // Fetch study plan when user changes
  useEffect(() => {
    if (!user || (!userProfile?.studyPlanId)) {
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

  // Fetch/create today's daily log
  useEffect(() => {
    if (!user) {
      setTodayLog(null);
      return;
    }

    const dailyLogRef = doc(db, 'users', user.uid, 'daily_log', today);

    const unsubscribe = onSnapshot(dailyLogRef, async (snapshot) => {
      if (snapshot.exists()) {
        setTodayLog({ id: snapshot.id, ...snapshot.data() } as DailyLog);
      } else {
        // Create today's log if it doesn't exist
        const newLog = {
          date: today,
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
  }, [user, today, userProfile?.dailyGoal]);

  // Fetch weekly stats and calculate streak
  useEffect(() => {
    if (!user) {
      setWeeklyStats({ totalQuestions: 0, accuracy: 0, totalMinutes: 0, questionsTrend: 0, accuracyTrend: 0 });
      setCurrentStreak(0);
      return;
    }

    const fetchWeeklyData = async () => {
      try {
        // Get logs for the past 7 days (this week)
        const thisWeekDates: string[] = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          thisWeekDates.push(format(date, 'yyyy-MM-dd'));
        }

        // Get logs for the previous 7 days (last week) for comparison
        const lastWeekDates: string[] = [];
        for (let i = 7; i < 14; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          lastWeekDates.push(format(date, 'yyyy-MM-dd'));
        }

        const dailyLogCollection = collection(db, 'users', user.uid, 'daily_log');
        
        // Fetch this week
        const thisWeekQuery = query(dailyLogCollection, where('date', 'in', thisWeekDates));
        const thisWeekSnapshot = await getDocs(thisWeekQuery);

        let totalQuestions = 0;
        let totalCorrect = 0;
        let totalMinutes = 0;

        thisWeekSnapshot.forEach((doc) => {
          const data = doc.data();
          totalQuestions += data.questionsAttempted || 0;
          totalCorrect += data.questionsCorrect || 0;
          totalMinutes += data.studyTimeMinutes || 0;
        });

        // Fetch last week for trend comparison
        const lastWeekQuery = query(dailyLogCollection, where('date', 'in', lastWeekDates));
        const lastWeekSnapshot = await getDocs(lastWeekQuery);

        let lastWeekQuestions = 0;
        let lastWeekCorrect = 0;

        lastWeekSnapshot.forEach((doc) => {
          const data = doc.data();
          lastWeekQuestions += data.questionsAttempted || 0;
          lastWeekCorrect += data.questionsCorrect || 0;
        });

        const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
        const lastWeekAccuracy = lastWeekQuestions > 0 ? Math.round((lastWeekCorrect / lastWeekQuestions) * 100) : 0;

        // Calculate trends (percentage change from last week)
        const questionsTrend = lastWeekQuestions > 0 
          ? Math.round(((totalQuestions - lastWeekQuestions) / lastWeekQuestions) * 100)
          : totalQuestions > 0 ? 100 : 0;
        const accuracyTrend = lastWeekAccuracy > 0 
          ? Math.round(accuracy - lastWeekAccuracy) // Simple difference for accuracy
          : 0;

        setWeeklyStats({ totalQuestions, accuracy, totalMinutes, questionsTrend, accuracyTrend });

        // Calculate streak (consecutive days with earnedPoints > 0)
        let streak = 0;
        for (let i = 0; i < 30; i++) { // Check up to 30 days back
          const checkDate = new Date();
          checkDate.setDate(checkDate.getDate() - i);
          const dateStr = format(checkDate, 'yyyy-MM-dd');
          
          const logRef = doc(db, 'users', user.uid, 'daily_log', dateStr);
          const logSnap = await getDoc(logRef);
          
          if (logSnap.exists() && (logSnap.data().earnedPoints || 0) > 0) {
            streak++;
          } else if (i > 0) {
            // Don't break on today (i=0) if no activity yet
            break;
          }
        }
        setCurrentStreak(streak);
      } catch (error) {
        logger.error('Error fetching weekly data:', error);
      }
    };

    fetchWeeklyData();
  }, [user, todayLog]); // Re-run when todayLog changes (user did activity)

  // Implementations
  const recordMCQAnswer = async (questionId: string, topic: string = 'General', subtopic: string = 'General', isCorrect: boolean, difficulty: string = 'medium', timeSpentSeconds: number = 0) => {
    if (!user) return;
    void subtopic;
    try {
        const points = isCorrect ? (difficulty === 'hard' ? 3 : difficulty === 'medium' ? 2 : 1) : 0;
        // Convert seconds to minutes (round to 1 decimal place, minimum 0.1 min per question)
        const timeSpentMinutes = Math.max(0.1, Math.round((timeSpentSeconds / 60) * 10) / 10);
        const logRef = doc(db, 'users', user.uid, 'daily_log', today);
        
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
              isCorrect,
              timeSpentSeconds,
              timestamp: new Date().toISOString()
            })
        }, { merge: true });
    } catch (e) {
        logger.error("Error recording answer", e);
    }
  };

  const completeSimulation = async (id: string, score: number, timeSpent: number) => {
      if (!user) return;
      try {
        const earnedPoints = Math.round((score / 100) * 50); // Max 50 points per sim
        const logRef = doc(db, 'users', user.uid, 'daily_log', today);
        await updateDoc(logRef, {
            earnedPoints: increment(earnedPoints),
            simulationsCompleted: increment(1),
            studyTimeMinutes: increment(timeSpent),
            activities: arrayUnion({
              type: 'simulation',
              id,
              score,
              timeSpent,
              timestamp: new Date().toISOString()
            })
        });
      } catch (e) {
          logger.error("Error completing simulation", e);
      }
  };

  const completeLesson = async (lessonId: string, section: string, timeSpent: number) => {
      if (!user) return;
      try {
        const earnedPoints = 10; // Fixed points per lesson
        const logRef = doc(db, 'users', user.uid, 'daily_log', today);
        const lessonRef = doc(db, 'users', user.uid, 'lessons', lessonId);
        
        // Update daily log
        await updateDoc(logRef, {
            earnedPoints: increment(earnedPoints),
            lessonsCompleted: increment(1),
            studyTimeMinutes: increment(timeSpent),
            activities: arrayUnion({
              type: 'lesson',
              lessonId,
              section,
              timeSpent,
              timestamp: new Date().toISOString()
            })
        });
        
        // Mark lesson as completed in user's lessons subcollection
        await setDoc(lessonRef, {
          completedAt: serverTimestamp(),
          section,
          timeSpent,
        }, { merge: true });
      } catch (e) {
          logger.error("Error completing lesson", e);
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

  const getTopicPerformance = async () => {
    if (!user) return [];
    
    try {
      // Aggregate topic performance from daily log activities
      const dailyLogCollection = collection(db, 'users', user.uid, 'daily_log');
      const logsSnapshot = await getDocs(dailyLogCollection);
      
      const topicStats: Record<string, { correct: number; total: number }> = {};
      
      logsSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.activities && Array.isArray(data.activities)) {
          data.activities.forEach((activity: { type: string; topic?: string; isCorrect?: boolean }) => {
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
    setCurrentStreak,
    recordMCQAnswer,
    completeLesson,
    completeSimulation,
    getLessonProgress,
    getTopicPerformance
  };

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
};

export default StudyProvider;
