import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Flag,
  // Pause,
  // Play,
  Trophy,
  Target,
  Calculator,
  FileText,
  // Eye,
  BookOpen,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { CPA_SECTIONS } from '../../config/examConfig';
import feedback from '../../services/feedback';
import clsx from 'clsx';
import { Question, ExamSection } from '../../types';

interface TestletConfig {
  type: 'mcq' | 'tbs' | 'wc';
  questions: number;
  time: number;
}

interface ExamConfig {
  testlets: TestletConfig[];
  totalTime: number;
  passingScore: number;
}

// Exam structure based on real CPA exam
const EXAM_CONFIG: Record<ExamSection, ExamConfig> = {
  REG: {
    testlets: [
      { type: 'mcq', questions: 36, time: 45 * 60 }, // 45 minutes
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 }, // Task-based simulations
      { type: 'tbs', questions: 6, time: 60 * 60 },
    ],
    totalTime: 4 * 60 * 60, // 4 hours
    passingScore: 75,
  },
  AUD: {
    testlets: [
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 },
    ],
    totalTime: 4 * 60 * 60,
    passingScore: 75,
  },
  FAR: {
    testlets: [
      { type: 'mcq', questions: 33, time: 45 * 60 },
      { type: 'mcq', questions: 33, time: 45 * 60 },
      { type: 'tbs', questions: 6, time: 70 * 60 },
      { type: 'tbs', questions: 6, time: 70 * 60 },
    ],
    totalTime: 4 * 60 * 60,
    passingScore: 75,
  },
  BAR: {
    testlets: [
      { type: 'mcq', questions: 33, time: 45 * 60 },
      { type: 'mcq', questions: 33, time: 45 * 60 },
      { type: 'tbs', questions: 6, time: 70 * 60 },
      { type: 'tbs', questions: 6, time: 70 * 60 },
    ],
    totalTime: 4 * 60 * 60,
    passingScore: 75,
  },
  ISC: {
    testlets: [
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 },
    ],
    totalTime: 4 * 60 * 60,
    passingScore: 75,
  },
  TCP: {
    testlets: [
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 },
    ],
    totalTime: 4 * 60 * 60,
    passingScore: 75,
  },
  PREP: {
     testlets: [],
     totalTime: 0,
     passingScore: 0,
  }
};

// Mini exam for practice (shorter version)
const MINI_EXAM: ExamConfig = {
  testlets: [
    { type: 'mcq', questions: 18, time: 25 * 60 },
    { type: 'mcq', questions: 18, time: 25 * 60 },
  ],
  totalTime: 50 * 60, // 50 minutes
  passingScore: 75,
};

type ExamState = 'intro' | 'exam' | 'break' | 'review' | 'complete';

const ExamSimulator: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { completeSimulation } = useStudy();

  const [examState, setExamState] = useState<ExamState>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentTestlet, setCurrentTestlet] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  // const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMiniExam, setIsMiniExam] = useState(true);
  const [showCalculator, setShowCalculator] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerRef = useRef<any>(null);
  const currentSection = (userProfile?.examSection || 'REG') as ExamSection;
  const sectionInfo = CPA_SECTIONS[currentSection];
  const examConfig = isMiniExam ? MINI_EXAM : EXAM_CONFIG[currentSection];

  // Load questions for exam
  const startExam = async () => {
    setLoading(true);
    try {
      const totalQuestions = examConfig.testlets.reduce((sum, t) => sum + t.questions, 0);

      const questionsQuery = query(
        collection(db, 'questions'),
        where('section', '==', currentSection),
        limit(totalQuestions)
      );

      const snapshot = await getDocs(questionsQuery);
      let loadedQuestions = snapshot.docs
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((doc) => ({ id: doc.id, ...doc.data() } as any))
        .sort(() => Math.random() - 0.5) as Question[];

      // If not enough questions, fill with duplicates (shuffled)
      while (loadedQuestions.length < totalQuestions) {
        const filler = loadedQuestions
          .slice(0, totalQuestions - loadedQuestions.length)
          .map((q) => ({ ...q, id: `${q.id}-dup-${Math.random()}` }));
        loadedQuestions = [...loadedQuestions, ...filler];
      }

      setQuestions(loadedQuestions.slice(0, totalQuestions));
      setTimeLeft(examConfig.totalTime);
      setStartTime(Date.now());
      setExamState('exam');
      setCurrentTestlet(0);
      setCurrentIndex(0);
      setAnswers({});
      setFlagged(new Set());
    } catch (error) {
      console.error('Error starting exam:', error);
    } finally {
      setLoading(false);
    }
  };

  // Timer
  useEffect(() => {
    if (examState !== 'exam') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setExamState('complete');
          feedback.complete();
          return 0;
        }
        // Warning sounds
        if (t === 600) feedback.click(); // 10 min
        if (t === 300) feedback.click(); // 5 min
        if (t === 60) feedback.incorrect(); // 1 min
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [examState]);

  // Keyboard shortcuts
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (e: any) => {
      if (examState !== 'exam') return;
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
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (key === 'f') {
        toggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examState, currentIndex]);

  // Get current testlet questions
  const testletQuestions = useMemo(() => {
    if (!examConfig) return [];
    let start = 0;
    for (let i = 0; i < currentTestlet; i++) {
      start += examConfig.testlets[i].questions;
    }
    const testlet = examConfig.testlets[currentTestlet];
    return questions.slice(start, start + testlet.questions);
  }, [currentTestlet, examConfig, questions]);

  const currentQuestion = testletQuestions[currentIndex];

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = useCallback((index: number) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: index }));
    feedback.tap();
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentIndex < testletQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
    feedback.click();
  }, [currentIndex, testletQuestions.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
    feedback.tap();
  }, [currentIndex]);

  const toggleFlag = useCallback(() => {
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
  }, [currentQuestion]);

  const handleNextTestlet = () => {
    if (currentTestlet < examConfig.testlets.length - 1) {
      setCurrentTestlet((t) => t + 1);
      setCurrentIndex(0);
      setExamState('break');
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setExamState('complete');
    feedback.complete();

    // Calculate score
    const results = calculateResults();
    const timeSpent = startTime ? Math.round((Date.now() - startTime) / 60000) : 0;

    // Record simulation
    await completeSimulation('exam-sim-' + Date.now(), results.percentage, timeSpent);
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

    const percentage = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
    return { correct, incorrect, unanswered, percentage };
  };

  if (examState === 'intro') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <button
            onClick={() => navigate('/practice')}
            className="mb-6 flex items-center text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-primary-600 p-8 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Exam Simulation</h1>
              <p className="text-primary-100 text-lg">
                Full {sectionInfo?.name} ({currentSection}) Exam Experience
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setIsMiniExam(true)}
                  className={clsx(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    isMiniExam
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-200 hover:border-primary-200'
                  )}
                >
                  <div className="font-bold text-slate-900 mb-1">Mini Exam</div>
                  <div className="text-sm text-slate-600">50 mins • 36 questions</div>
                </button>
                <button
                  onClick={() => setIsMiniExam(false)}
                  className={clsx(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    !isMiniExam
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-200 hover:border-primary-200'
                  )}
                >
                  <div className="font-bold text-slate-900 mb-1">Full Exam</div>
                  <div className="text-sm text-slate-600">4 hours • Full structure</div>
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-medium">Strict Timing</div>
                    <div className="text-sm text-slate-500">
                      The clock continues running during breaks
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-medium">No Pause</div>
                    <div className="text-sm text-slate-500">
                      Simulate real exam pressure and endurance
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-medium">Testlet Structure</div>
                    <div className="text-sm text-slate-500">
                      Cannot return to previous testlets once submitted
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={startExam}
                disabled={loading}
                className="btn-primary w-full py-4 text-lg"
              >
                {loading ? 'Preparing Exam...' : 'Begin Examination'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Break Screen
  if (examState === 'break') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center text-white">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Scheduled Break</h2>
          <p className="text-slate-300 mb-8">
            The timer is paused. Take a moment to rest your eyes and stretch.
          </p>

          <div className="bg-white/10 rounded-xl p-6 mb-8 backdrop-blur-sm">
            <div className="text-sm text-slate-300 mb-2">Next Testlet</div>
            <div className="text-xl font-bold">
              {examConfig.testlets[currentTestlet].type === 'mcq'
                ? 'Multiple Choice Questions'
                : 'Task-Based Simulations'}
            </div>
          </div>

          <button
            onClick={() => {
              setExamState('exam');
              setStartTime(Date.now() - (examConfig.totalTime - timeLeft) * 1000); // Adjust start time
            }}
            className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors"
          >
            Resume Exam
          </button>
        </div>
      </div>
    );
  }

  // Complete Screen
  if (examState === 'complete') {
    const results = calculateResults();
    const passed = results.percentage >= examConfig.passingScore;

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div
            className={clsx(
              'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl',
              passed ? 'bg-success-500' : 'bg-white'
            )}
          >
            {passed ? (
              <Trophy className="w-12 h-12 text-white" />
            ) : (
              <Target className="w-12 h-12 text-error-500" />
            )}
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {passed ? 'Congratulations!' : 'Practice Complete'}
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            {passed
              ? 'You are showing exam-ready performance!'
              : 'Keep practicing to improve your score.'}
          </p>

          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
              Final Score
            </div>
            <div
              className="text-7xl font-bold mb-2"
              style={{
                color:
                  results.percentage >= 75
                    ? '#34a853'
                    : results.percentage >= 50
                      ? '#fbbc04'
                      : '#ea4335',
              }}
            >
              {results.percentage}
            </div>
            <div className="text-slate-400">Target: 75</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-1">
                <CheckCircle className="w-5 h-5 text-success-500" />
                <span className="font-bold text-slate-900">{results.correct}</span>
              </div>
              <div className="text-xs text-slate-500">Correct</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-1">
                <XCircle className="w-5 h-5 text-error-500" />
                <span className="font-bold text-slate-900">{results.incorrect}</span>
              </div>
              <div className="text-xs text-slate-500">Incorrect</div>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => navigate('/practice')} className="btn-secondary flex-1">
              Done
            </button>
            <button onClick={() => navigate('/progress')} className="btn-primary flex-1">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Exam Interface
  return (
    <div className="h-screen bg-slate-100 flex flex-col overflow-hidden">
      {/* Exam Header */}
      <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="font-mono text-xl font-bold tracking-wider">{sectionInfo?.name}</div>
          <div className="h-6 w-px bg-white/20" />
          <div className="text-slate-300 text-sm">
            Testlet {currentTestlet + 1} of {examConfig.testlets.length}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xl font-mono font-bold tabular-nums">
            <Clock className={clsx('w-5 h-5', timeLeft < 300 && 'text-red-500 animate-pulse')} />
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className={clsx(
              'p-2 rounded hover:bg-white/10 transition-colors',
              showCalculator && 'bg-white/20'
            )}
            title="Calculator"
          >
            <Calculator className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col relative">
          {/* Calculator Overlay */}
          {showCalculator && (
            <div className="absolute top-4 right-4 w-64 h-80 bg-slate-800 rounded-lg shadow-2xl z-50 border border-slate-700 flex flex-col">
              <div className="bg-slate-700 p-2 flex justify-between items-center rounded-t-lg cursor-move">
                <span className="text-xs text-slate-300 font-bold uppercase">Calculator</span>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 p-4 flex items-center justify-center text-slate-500 text-sm italic">
                {/* Real calculator implementation would go here */}
                Basic Calculator
              </div>
            </div>
          )}

          {/* Question Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 min-h-[400px] flex flex-col">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                      Question {currentIndex + 1} / {testletQuestions.length}
                    </span>
                    <button
                      onClick={toggleFlag}
                      className={clsx(
                        'flex items-center gap-2 px-3 py-1 rounded transition-colors text-sm font-medium',
                        flagged.has(currentQuestion?.id)
                          ? 'bg-warning-50 text-warning-700'
                          : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                      )}
                    >
                      <Flag
                        className={clsx(
                          'w-4 h-4',
                          flagged.has(currentQuestion?.id) && 'fill-current'
                        )}
                      />
                      {flagged.has(currentQuestion?.id) ? 'Flagged' : 'Flag'}
                    </button>
                  </div>
                  <div className="text-lg text-slate-900 leading-relaxed font-serif">
                    {currentQuestion?.question}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 flex-1">
                  <div className="space-y-3">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(currentQuestion?.options || (currentQuestion as any)?.choices || []).map(
                      (option: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectAnswer(idx)}
                          className={clsx(
                            'w-full p-4 rounded border text-left transition-all flex items-start gap-4 group',
                            answers[currentQuestion?.id] === idx
                              ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600'
                              : 'border-slate-300 bg-white hover:border-primary-400 hover:shadow-sm'
                          )}
                        >
                          <span
                            className={clsx(
                              'w-6 h-6 rounded-full border flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5 transition-colors',
                              answers[currentQuestion?.id] === idx
                                ? 'border-primary-600 bg-primary-600 text-white'
                                : 'border-slate-300 text-slate-500 group-hover:border-primary-400 group-hover:text-primary-600'
                            )}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-slate-800 pt-0.5">{option}</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="bg-white border-t border-slate-200 px-6 py-4 shadow-lg shrink-0 z-10">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="btn-secondary flex items-center gap-2 pl-3 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex gap-1">
                {testletQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={clsx(
                      'w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-all',
                      currentIndex === i
                        ? 'bg-slate-800 text-white ring-2 ring-slate-800 ring-offset-2'
                        : answers[q.id] !== undefined
                          ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
                      flagged.has(q.id) && 'ring-2 ring-warning-400 z-10'
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {currentIndex === testletQuestions.length - 1 ? (
                <button
                  onClick={handleNextTestlet}
                  className="btn-primary flex items-center gap-2 bg-slate-900 hover:bg-slate-800"
                >
                  {currentTestlet < examConfig.testlets.length - 1
                    ? 'Next Testlet'
                    : 'Submit Exam'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="btn-primary flex items-center gap-2 bg-slate-900 hover:bg-slate-800"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSimulator;
