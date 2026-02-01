import React, { useState, useEffect, useRef } from 'react';
import logger from '../../utils/logger';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Pause,
  Play,
  Flag,
  Trophy,
  Target,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import feedback from '../../services/feedback';
import clsx from 'clsx';
import { Question, ExamSection } from '../../types';

interface QuizModeConfig {
  questions: number;
  timePerQuestion: number;
  name: string;
}

interface QuizModes {
  [key: string]: QuizModeConfig;
}

const QUIZ_MODES: QuizModes = {
  quick: { questions: 10, timePerQuestion: 90, name: 'Quick Quiz' },
  standard: { questions: 20, timePerQuestion: 90, name: 'Standard Quiz' },
  challenge: { questions: 30, timePerQuestion: 60, name: 'Challenge Mode' },
  exam: { questions: 36, timePerQuestion: 75, name: 'Exam Simulation' },
};

type QuizState = 'setup' | 'active' | 'review' | 'complete';

const TimedQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userProfile } = useAuth();
  const { recordMCQAnswer } = useStudy();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [_totalTime, setTotalTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>('setup'); // setup, active, review, complete
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerRef = useRef<any>(null);
  const mode = searchParams.get('mode') || 'quick';
  const quizConfig = QUIZ_MODES[mode] || QUIZ_MODES.quick;
  const currentSection = (userProfile?.examSection || 'REG') as ExamSection;

  // Load questions
  const startQuiz = async () => {
    setLoading(true);
    try {
      const questionsQuery = query(
        collection(db, 'questions'),
        where('section', '==', currentSection),
        limit(quizConfig.questions)
      );

      const snapshot = await getDocs(questionsQuery);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const loadedQuestions = snapshot.docs
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((doc) => ({ id: doc.id, ...doc.data() } as any))
        .sort(() => Math.random() - 0.5) as Question[];

      setQuestions(loadedQuestions);
      setTimeLeft(quizConfig.questions * quizConfig.timePerQuestion);
      setTotalTime(quizConfig.questions * quizConfig.timePerQuestion);
      setQuizState('active');
      setCurrentIndex(0);
      setAnswers({});
      setFlagged(new Set());
    } catch (error) {
      logger.error('Error loading quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  // Timer
  useEffect(() => {
    if (quizState !== 'active' || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setQuizState('complete');
          feedback.complete();
          return 0;
        }
        // Warning at 5 minutes left
        if (t === 300) feedback.click();
        // Warning at 1 minute left
        if (t === 60) feedback.incorrect();
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [quizState, isPaused]);

  // Keyboard shortcuts
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (e: any) => {
      if (quizState !== 'active') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      if (['1', '2', '3', '4', 'a', 'b', 'c', 'd'].includes(key)) {
        const index = ['1', 'a'].includes(key)
          ? 0
          : ['2', 'b'].includes(key)
            ? 1
            : ['3', 'c'].includes(key)
              ? 2
              : 3;
        handleSelectAnswer(index);
      } else if (e.key === 'Enter' && selectedAnswer !== null) {
        handleNext();
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) setCurrentIndex((i) => i - 1);
      } else if (key === 'f') {
        toggleFlag();
      } else if (key === 'p') {
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizState, currentIndex, questions.length, selectedAnswer]);

  const currentQuestion = questions[currentIndex];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (currentQuestion) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: index }));
    }
    feedback.tap();
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(answers[questions[currentIndex + 1]?.id] ?? null);
    } else {
      setQuizState('review');
    }
    feedback.click();
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setSelectedAnswer(answers[questions[currentIndex - 1]?.id] ?? null);
    }
    feedback.tap();
  };

  const toggleFlag = () => {
    if (!currentQuestion) return;
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
    feedback.tap();
  };

  const handleSubmit = async () => {
    setQuizState('complete');
    feedback.complete();

    // Record answers
    for (const q of questions) {
      const userAnswer = answers[q.id];
      if (userAnswer !== undefined && recordMCQAnswer) {
        const isCorrect = userAnswer === q.correctAnswer;
        // Pass section for section-specific tracking
        await recordMCQAnswer(q.id, q.topic, 'quiz', isCorrect, q.difficulty || 'medium', 0, q.section);
      }
    }
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((q) => {
      const userAnswer = answers[q.id];
      if (userAnswer === undefined) {
        unanswered++;
      } else if (userAnswer === q.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return { correct, incorrect, unanswered, total: questions.length };
  };

  // Setup Screen
  if (quizState === 'setup') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Timed Quiz</h1>
            <p className="text-slate-600">Test yourself under exam conditions</p>
          </div>

          <div className="space-y-3 mb-8">
            {Object.entries(QUIZ_MODES).map(([key, config]) => (
              <button
                key={key}
                onClick={() => navigate(`/quiz?mode=${key}`)}
                className={clsx(
                  'w-full p-4 rounded-xl border-2 text-left transition-all',
                  mode === key
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-slate-200 bg-white hover:border-primary-200'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{config.name}</div>
                    <div className="text-sm text-slate-600">
                      {config.questions} questions • {config.timePerQuestion}s each
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary-600">
                      {Math.round((config.questions * config.timePerQuestion) / 60)} min
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={startQuiz}
            disabled={loading}
            className="btn-primary w-full py-3 text-lg"
          >
            {loading ? 'Loading...' : 'Start Quiz'}
          </button>

          <button
            onClick={() => navigate('/study')}
            className="w-full mt-3 py-2 text-slate-600 hover:text-slate-900"
          >
            Back to Study
          </button>
        </div>
      </div>
    );
  }

  // Review Screen
  if (quizState === 'review') {
    const answeredCount = Object.keys(answers).length;
    const flaggedCount = flagged.size;

    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Review Your Answers</h2>
              <div className="flex items-center gap-2 text-lg font-mono">
                <Clock className={clsx('w-5 h-5', timeLeft < 300 && 'text-error-500')} />
                <span className={clsx(timeLeft < 300 && 'text-error-600')}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-success-50 rounded-xl">
                <div className="text-2xl font-bold text-success-600">{answeredCount}</div>
                <div className="text-sm text-success-700">Answered</div>
              </div>
              <div className="text-center p-3 bg-warning-50 rounded-xl">
                <div className="text-2xl font-bold text-warning-600">{flaggedCount}</div>
                <div className="text-sm text-warning-700">Flagged</div>
              </div>
              <div className="text-center p-3 bg-slate-100 rounded-xl">
                <div className="text-2xl font-bold text-slate-600">
                  {questions.length - answeredCount}
                </div>
                <div className="text-sm text-slate-700">Unanswered</div>
              </div>
            </div>

            {/* Question Grid */}
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-2 mb-6">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setSelectedAnswer(answers[q.id] ?? null);
                    setQuizState('active');
                  }}
                  className={clsx(
                    'aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all',
                    answers[q.id] !== undefined
                      ? 'bg-success-100 text-success-700'
                      : 'bg-slate-100 text-slate-500',
                    flagged.has(q.id) && 'ring-2 ring-warning-400'
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button onClick={handleSubmit} className="btn-primary w-full py-3 text-lg">
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Complete Screen
  if (quizState === 'complete') {
    const results = calculateResults();
    const percentage = Math.round((results.correct / results.total) * 100);
    const passed = percentage >= 75;

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div
            className={clsx(
              'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4',
              passed ? 'bg-success-100' : 'bg-warning-100'
            )}
          >
            {passed ? (
              <Trophy className="w-10 h-10 text-success-600" />
            ) : (
              <Target className="w-10 h-10 text-warning-600" />
            )}
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {passed ? 'Great Job!' : 'Keep Practicing!'}
          </h1>
          <p className="text-slate-600 mb-6">
            {passed ? "You're on track for success!" : 'Review the topics and try again.'}
          </p>

          <div
            className="text-6xl font-bold mb-6"
            style={{
              color: percentage >= 75 ? '#34a853' : percentage >= 50 ? '#fbbc04' : '#ea4335',
            }}
          >
            {percentage}%
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-success-50 rounded-xl p-4">
              <CheckCircle className="w-6 h-6 text-success-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-success-700">{results.correct}</div>
              <div className="text-xs text-success-600">Correct</div>
            </div>
            <div className="bg-error-50 rounded-xl p-4">
              <XCircle className="w-6 h-6 text-error-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-error-700">{results.incorrect}</div>
              <div className="text-xs text-error-600">Incorrect</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <Clock className="w-6 h-6 text-slate-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-slate-700">{results.unanswered}</div>
              <div className="text-xs text-slate-600">Skipped</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setQuizState('setup')} className="btn-secondary flex-1">
              Try Again
            </button>
            <button onClick={() => navigate('/progress')} className="btn-primary flex-1">
              View Progress
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz Screen
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-medium text-slate-900">
              {currentIndex + 1} / {questions.length}
            </span>
            <button
              onClick={toggleFlag}
              className={clsx(
                'p-1.5 rounded-lg transition-colors',
                flagged.has(currentQuestion?.id)
                  ? 'bg-warning-100 text-warning-600'
                  : 'text-slate-400 hover:bg-slate-100'
              )}
            >
              <Flag className="w-5 h-5" />
            </button>
          </div>

          <div
            className={clsx(
              'flex items-center gap-2 font-mono text-lg',
              timeLeft < 300 && 'text-error-600'
            )}
          >
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>

          <button
            onClick={() => setIsPaused((p) => !p)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
        </div>

        {/* Progress bar */}
        <div className="max-w-3xl mx-auto mt-3">
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Paused Overlay */}
      {isPaused && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50">
          <div className="text-center text-white">
            <Pause className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Quiz Paused</h2>
            <p className="text-slate-300 mb-6">Timer stopped. Click resume to continue.</p>
            <button onClick={() => setIsPaused(false)} className="btn-primary">
              Resume Quiz
            </button>
          </div>
        </div>
      )}

      {/* Question */}
      <div className="flex-1 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
            <div className="text-xs text-primary-600 font-medium mb-2">
              {currentQuestion?.topic || currentSection}
            </div>
            <p className="text-lg text-slate-900 leading-relaxed">{currentQuestion?.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(currentQuestion?.options || (currentQuestion as any)?.choices || []).map((option: string, idx: number) => (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                className={clsx(
                  'w-full p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3',
                  selectedAnswer === idx
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-slate-200 bg-white hover:border-primary-200'
                )}
              >
                <span
                  className={clsx(
                    'w-8 h-8 rounded-lg flex items-center justify-center font-medium flex-shrink-0',
                    selectedAnswer === idx
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-100 text-slate-600'
                  )}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-slate-700 pt-1">{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-slate-100 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="btn-secondary disabled:opacity-30"
          >
            Previous
          </button>

          <button
            onClick={() => setQuizState('review')}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Review All
          </button>

          <button onClick={handleNext} className="btn-primary flex items-center gap-2">
            {currentIndex === questions.length - 1 ? 'Review' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimedQuiz;
