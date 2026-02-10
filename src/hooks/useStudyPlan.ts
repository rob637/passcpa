/**
 * useStudyPlan Hook
 * 
 * Fetches and returns study plan data from Firestore for a given course.
 * Provides daysToExam calculation based on stored exam date.
 */

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './useAuth';
import { differenceInDays } from 'date-fns';
import { CourseId } from '../types/course';

interface StudyPlanData {
  examDate?: string;
  hoursPerDay?: number;
  daysPerWeek?: number;
  totalStudyHours?: number;
  createdAt?: string;
  savedAt?: string;
}

interface UseStudyPlanResult {
  studyPlan: StudyPlanData | null;
  daysToExam: number | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch study plan for a specific course
 * @param courseId - The course identifier (cpa, ea, cma, cia, cfp, cisa)
 */
export function useStudyPlan(courseId: CourseId): UseStudyPlanResult {
  const { user } = useAuth();
  const [studyPlan, setStudyPlan] = useState<StudyPlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStudyPlan() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const planDoc = await getDoc(
          doc(db, 'users', user.uid, 'settings', `${courseId}StudyPlan`)
        );

        if (planDoc.exists()) {
          setStudyPlan(planDoc.data() as StudyPlanData);
        } else {
          setStudyPlan(null);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch study plan'));
        setStudyPlan(null);
      } finally {
        setLoading(false);
      }
    }

    fetchStudyPlan();
  }, [user, courseId]);

  // Calculate days to exam
  const daysToExam = studyPlan?.examDate
    ? differenceInDays(new Date(studyPlan.examDate), new Date())
    : null;

  return {
    studyPlan,
    daysToExam: daysToExam !== null && daysToExam >= 0 ? daysToExam : null,
    loading,
    error,
  };
}

export default useStudyPlan;
