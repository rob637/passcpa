/**
 * ExamHistory — shows a list of past exam sessions with score, date, and review link.
 * Displayed on the Exam intro screen below the exam type selector.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Trophy, XCircle, ChevronRight, History, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../providers/CourseProvider';
import { getExamSessionHistory, type ExamSessionSummary } from '../../services/examSessionService';
import { format } from 'date-fns';
import clsx from 'clsx';

const ExamHistory: React.FC = () => {
  const { user } = useAuth();
  const { courseId } = useCourse();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<ExamSessionSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }
    let mounted = true;
    getExamSessionHistory(user.uid, 20).then(all => {
      if (mounted) {
        // Filter to current course
        setSessions(all.filter(s => s.courseId === courseId));
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [user?.uid, courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-slate-400">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  if (sessions.length === 0) return null;

  const modeLabel = (mode: string) => {
    switch (mode) {
      case 'mini': return 'Mini';
      case 'mini-tbs': return 'Mini + TBS';
      case 'full': return 'Full';
      case 'curated': return 'Curated Mock';
      default: return mode;
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
          Exam History
        </h3>
        <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
          {sessions.length}
        </span>
      </div>

      <div className="space-y-3">
        {sessions.map(session => {
          const scoreColor = session.passed
            ? 'text-green-600 dark:text-green-400'
            : session.score >= 50
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-red-600 dark:text-red-400';

          return (
            <button
              key={session.id}
              onClick={() => navigate(`/exam-review/${session.id}`)}
              className="w-full flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-sm transition-all text-left group"
            >
              {/* Score circle */}
              <div className={clsx(
                'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm',
                session.passed
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : 'bg-red-100 dark:bg-red-900/30'
              )}>
                {session.passed
                  ? <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
                  : <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white text-sm">
                    {session.section}
                  </span>
                  <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
                    {modeLabel(session.mode)}
                  </span>
                  {session.mockExamName && (
                    <span className="text-xs text-slate-400 dark:text-slate-500 truncate">
                      {session.mockExamName}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                  <span>{format(session.completedAt, 'MMM d, yyyy')}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {session.timeSpentMinutes}m
                  </span>
                  <span>{session.questionsCorrect}/{session.questionsTotal} MCQ</span>
                  {session.questionsIncorrect > 0 && (
                    <span className="text-red-500">{session.questionsIncorrect} wrong</span>
                  )}
                </div>
              </div>

              {/* Score + arrow */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={clsx('text-lg font-bold', scoreColor)}>
                  {session.score}%
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 transition-colors" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ExamHistory;
