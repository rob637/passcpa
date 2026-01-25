import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
  // query,
  // where,
  // Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { useAuth } from './AuthProvider';
import { format } from 'date-fns';

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
  setCurrentStreak: (streak: number) => void;
  recordMCQAnswer: (questionId: string, topic: string | undefined, subtopic: string | undefined, isCorrect: boolean, difficulty: string) => Promise<void>;
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
        console.error('Error fetching study plan:', error);
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

  // Implementations
  const recordMCQAnswer = async (questionId: string, topic: string = 'General', subtopic: string = 'General', isCorrect: boolean, difficulty: string = 'medium') => {
    if (!user) return;
    void subtopic;
    try {
        const points = isCorrect ? (difficulty === 'hard' ? 3 : difficulty === 'medium' ? 2 : 1) : 0;
        const logRef = doc(db, 'users', user.uid, 'daily_log', today);
        
        await updateDoc(logRef, {
            earnedPoints: increment(points),
            questionsAttempted: increment(1),
            questionsCorrect: increment(isCorrect ? 1 : 0),
             activities: arrayUnion({
              type: 'mcq',
              questionId,
              topic,
              isCorrect,
              timestamp: new Date().toISOString()
            })
        });
    } catch (e) {
        console.error("Error recording answer", e);
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
          console.error("Error completing simulation", e);
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
        console.error('Error fetching lesson progress:', error);
        return {};
      }
  }

  const getTopicPerformance = async () => {
    // Mock for now, since we haven't implemented the aggregation backend yet
    // In a real app, this would query a 'stats' subcollection or aggregation query
    return [];
  }

  // Calculate daily progress percentage
  const dailyProgress = todayLog 
    ? Math.min(100, Math.round((todayLog.earnedPoints / todayLog.goalPoints) * 100)) 
    : 0;

  const value: StudyContextType = {
    studyPlan,
    todayLog,
    currentStreak,
    loading,
    dailyProgress,
    setCurrentStreak,
    recordMCQAnswer,
    completeSimulation,
    getLessonProgress,
    getTopicPerformance
  };

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
};

export default StudyProvider;
