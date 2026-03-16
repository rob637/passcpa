/**
 * ExamReview — review a past exam session, focusing on incorrect answers.
 * Route: /exam-review/:sessionId
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Trophy,
  Target,
  Clock,
  BarChart3,
  BookOpen,
  AlertTriangle,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getExamSession, type ExamSession } from '../../services/examSessionService';
import { format } from 'date-fns';
import clsx from 'clsx';

type ReviewFilter = 'incorrect' | 'all';

const ExamReview: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [session, setSession] = useState<ExamSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ReviewFilter>('incorrect');
  const [expandedBlueprint, setExpandedBlueprint] = useState(true);

  useEffect(() => {
    if (!user?.uid || !sessionId) {
      setLoading(false);
      return;
    }
    let mounted = true;
    getExamSession(user.uid, sessionId).then(data => {
      if (mounted) {
        setSession(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [user?.uid, sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Exam Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">This exam session may have been removed or doesn't exist.</p>
        <button onClick={() => navigate(-1)} className="btn-primary">Go Back</button>
      </div>
    );
  }

  const passed = session.passed;
  const incorrectQuestions = session.questions.filter(q => q.userAnswer !== q.correctAnswer);
  const filteredQuestions = filter === 'incorrect'
    ? incorrectQuestions
    : session.questions;

  const modeLabel = (mode: string) => {
    switch (mode) {
      case 'mini': return 'Mini Exam';
      case 'mini-tbs': return 'Mini + TBS';
      case 'full': return 'Full Exam';
      case 'curated': return 'Curated Mock';
      default: return mode;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      {/* Header */}
      <div className="text-center">
        <div className={clsx(
          'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
          passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
        )}>
          {passed
            ? <Trophy className="w-8 h-8 text-green-600 dark:text-green-400" />
            : <Target className="w-8 h-8 text-red-600 dark:text-red-400" />}
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {session.section} — {modeLabel(session.mode)}
        </h1>
        {session.mockExamName && (
          <p className="text-sm text-slate-500 dark:text-slate-400">{session.mockExamName}</p>
        )}
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {format(session.completedAt, 'MMMM d, yyyy')} ·{' '}
          <Clock className="w-3 h-3 inline" /> {session.timeSpentMinutes} min
        </p>
      </div>

      {/* Score card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
        <div className="text-center mb-4">
          <div className="text-5xl font-bold" style={{
            color: session.score >= 75 ? '#34a853' : session.score >= 50 ? '#fbbc04' : '#ea4335'
          }}>
            {session.score}%
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Target: {session.passingScore} · {passed ? 'Passed' : 'Not Yet'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">{session.questionsCorrect}</div>
            <div className="text-xs text-green-700 dark:text-green-300">Correct</div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">{session.questionsIncorrect}</div>
            <div className="text-xs text-red-700 dark:text-red-300">Incorrect</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-xl">
            <div className="text-lg font-bold text-slate-700 dark:text-slate-200">{session.questionsTotal}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Total MCQ</div>
          </div>
        </div>

        {session.tbsTotal > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{session.mcqScore}%</div>
              <div className="text-xs text-blue-700 dark:text-blue-300">MCQ Score</div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl">
              <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{session.tbsScore}%</div>
              <div className="text-xs text-indigo-700 dark:text-indigo-300">TBS Score</div>
            </div>
          </div>
        )}
      </div>

      {/* Blueprint breakdown */}
      {Object.keys(session.blueprintScores).length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => setExpandedBlueprint(!expandedBlueprint)}
            className="w-full flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Blueprint Performance
              </h3>
            </div>
            <ChevronDown className={clsx(
              'w-5 h-5 text-slate-400 transition-transform',
              expandedBlueprint && 'rotate-180'
            )} />
          </button>
          {expandedBlueprint && (
            <div className="px-6 pb-6 space-y-3">
              {Object.entries(session.blueprintScores)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([area, score]) => {
                  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
                  return (
                    <div key={area}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700 dark:text-slate-200 font-medium">{area}</span>
                        <span className={clsx(
                          'font-bold',
                          pct >= 75 ? 'text-green-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600'
                        )}>{pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={clsx(
                            'h-full rounded-full',
                            pct >= 75 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      {pct < 60 && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Needs more practice
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {/* Question review */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              Question Review
            </h3>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('incorrect')}
              className={clsx(
                'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                filter === 'incorrect'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              )}
            >
              Incorrect ({incorrectQuestions.length})
            </button>
            <button
              onClick={() => setFilter('all')}
              className={clsx(
                'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                filter === 'all'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              )}
            >
              All Questions ({session.questions.length})
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700 max-h-[60vh] overflow-y-auto">
          {filteredQuestions.length === 0 && (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-medium">All questions answered correctly!</p>
            </div>
          )}
          {filteredQuestions.map((q, idx) => {
            const isCorrect = q.userAnswer === q.correctAnswer;
            const userAnswerText = q.userAnswer !== undefined && q.options
              ? q.options[q.userAnswer]
              : 'Not answered';
            const correctAnswerText = q.options ? q.options[q.correctAnswer] : '';
            const originalIndex = session.questions.indexOf(q);

            return (
              <div key={q.id + idx} className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    isCorrect
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  )}>
                    {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Question {originalIndex + 1} · {q.topic || q.blueprintArea || 'General'}
                    </p>
                    <p className="text-sm text-slate-900 dark:text-white font-medium">
                      {q.question}
                    </p>
                  </div>
                </div>

                <div className="ml-11 space-y-2">
                  <div className={clsx(
                    'p-3 rounded-lg text-sm',
                    isCorrect
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  )}>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Your answer: </span>
                    <span className={isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
                      {userAnswerText}
                    </span>
                  </div>

                  {!isCorrect && (
                    <div className="p-3 rounded-lg text-sm bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Correct answer: </span>
                      <span className="text-green-700 dark:text-green-400">{correctAnswerText}</span>
                    </div>
                  )}

                  {q.explanation && (
                    <div className="p-3 rounded-lg text-sm bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                      <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">Explanation:</p>
                      <p className="text-slate-600 dark:text-slate-400">{q.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button onClick={() => navigate(-1)} className="btn-secondary flex-1">
          Back to Exams
        </button>
      </div>
    </div>
  );
};

export default ExamReview;
