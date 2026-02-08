import { useState, useCallback } from 'react';
import { collection, query, where, getDocs, limit, doc, getDoc, QueryConstraint } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Question } from '../types';

interface UseQuestionsOptions {
  section?: string;
  topicId?: string;
  difficulty?: string;
  count?: number;
}

interface FetchOptions {
  section?: string;
  topicId?: string;
  difficulty?: string;
  count?: number;
}

interface UseQuestionsReturn {
  questions: Question[];
  currentQuestion: Question | null;
  currentIndex: number;
  totalQuestions: number;
  loading: boolean;
  error: string | null;
  fetchQuestions: (options?: FetchOptions) => Promise<Question[]>;
  getQuestion: (questionId: string) => Promise<Question | null>;
  nextQuestion: () => boolean;
  previousQuestion: () => boolean;
  goToQuestion: (index: number) => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Hook for fetching and managing questions from the question bank
 */
export const useQuestions = (options: UseQuestionsOptions = {}): UseQuestionsReturn => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { section, topicId, difficulty, count = 10 } = options;

  // Fetch questions based on criteria
  const fetchQuestions = useCallback(
    async (fetchOptions: FetchOptions = {}): Promise<Question[]> => {
      setLoading(true);
      setError(null);

      try {
        // Use standard 'questions' collection path (unified with questionService)
        const questionsRef = collection(db, 'questions');
        const constraints: QueryConstraint[] = [];

        // Apply filters
        if (fetchOptions.section || section) {
          constraints.push(where('section', '==', fetchOptions.section || section));
        }
        if (fetchOptions.topicId || topicId) {
          constraints.push(where('topicId', '==', fetchOptions.topicId || topicId));
        }
        if (fetchOptions.difficulty || difficulty) {
          constraints.push(where('difficulty', '==', fetchOptions.difficulty || difficulty));
        }

        constraints.push(limit(fetchOptions.count || count));

        const q = query(questionsRef, ...constraints);
        const snapshot = await getDocs(q);

        const fetchedQuestions = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as Question[];

        // Shuffle questions for variety
        const shuffled = fetchedQuestions.sort(() => Math.random() - 0.5);

        setQuestions(shuffled);
        setCurrentIndex(0);

        return shuffled;
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        return [];
      } finally {
        setLoading(false);
      }
    },
    [section, topicId, difficulty, count]
  );

  // Get single question by ID
  const getQuestion = useCallback(async (questionId: string): Promise<Question | null> => {
    try {
      // Use standard 'questions' collection path (unified with questionService)
      const questionRef = doc(db, 'questions', questionId);
      const snapshot = await getDoc(questionRef);

      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as Question;
      }
      return null;
    } catch (err) {
      console.error('Error fetching question:', err);
      return null;
    }
  }, []);

  // Navigation
  const currentQuestion = questions[currentIndex] || null;

  const nextQuestion = useCallback((): boolean => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return true;
    }
    return false; // No more questions
  }, [currentIndex, questions.length]);

  const previousQuestion = useCallback((): boolean => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      return true;
    }
    return false;
  }, [currentIndex]);

  const goToQuestion = useCallback(
    (index: number): void => {
      if (index >= 0 && index < questions.length) {
        setCurrentIndex(index);
      }
    },
    [questions.length]
  );

  return {
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    loading,
    error,
    fetchQuestions,
    getQuestion,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    hasNext: currentIndex < questions.length - 1,
    hasPrevious: currentIndex > 0,
  };
};

export default useQuestions;
