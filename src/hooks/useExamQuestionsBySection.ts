/**
 * useExamQuestionsBySection
 *
 * Hook for exam simulators: lazily fetches a course's entire question bank
 * from /public/data/ via courseDataLoader, then groups questions by section
 * so each simulator's `getQuestionPool(section)` callback can read from
 * preloaded state without any static `import`.
 *
 * This is the bridge that lets the `ExamSimulatorTemplate` keep its sync
 * `getQuestionPool` API while ensuring no question bank ever lands in the
 * JS bundle.
 *
 * Usage:
 *   const { questionsBySection, loading, error } = useExamQuestionsBySection<EASection>('ea');
 *   if (loading || !questionsBySection) return <ExamQuestionsLoading />;
 *   const getQuestionPool = (s: EASection) => questionsBySection[s] ?? [];
 */

import { useEffect, useState } from 'react';
import type { CourseId } from '../types/course';
import type { Question } from '../types';
import type { ExamQuestion } from '../components/pages/templates/ExamSimulatorTemplate';
import { loadAllCourseQuestions } from '../services/courseDataLoader';
import logger from '../utils/logger';

function toExamQuestion(q: Question): ExamQuestion {
  return {
    id: q.id,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    section: q.section,
    topic: q.topic,
  };
}

interface State<SectionId extends string> {
  questionsBySection: Record<SectionId, ExamQuestion[]> | null;
  loading: boolean;
  error: Error | null;
}

export function useExamQuestionsBySection<SectionId extends string>(
  courseId: CourseId
): State<SectionId> {
  const [state, setState] = useState<State<SectionId>>({
    questionsBySection: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = (await loadAllCourseQuestions(courseId)) as Question[];
        if (cancelled) return;

        const map = {} as Record<SectionId, ExamQuestion[]>;
        for (const q of raw) {
          const sec = (q.section || 'UNKNOWN') as SectionId;
          (map[sec] ||= []).push(toExamQuestion(q));
        }
        setState({ questionsBySection: map, loading: false, error: null });
      } catch (err) {
        if (cancelled) return;
        logger.error(`useExamQuestionsBySection(${courseId}) failed`, err);
        setState({
          questionsBySection: null,
          loading: false,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [courseId]);

  return state;
}
