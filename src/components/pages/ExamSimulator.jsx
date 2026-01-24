import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Flag,
  Pause,
  Play,
  BarChart3,
  Trophy,
  Target,
  Calculator,
  FileText,
  Eye,
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

// Exam structure based on real CPA exam
const EXAM_CONFIG = {
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
  BEC: {
    testlets: [
      { type: 'mcq', questions: 31, time: 45 * 60 },
      { type: 'mcq', questions: 31, time: 45 * 60 },
      { type: 'tbs', questions: 4, time: 45 * 60 },
      { type: 'tbs', questions: 4, time: 45 * 60 },
      { type: 'wc', questions: 3, time: 30 * 60 }, // Written communications
    ],
    totalTime: 4 * 60 * 60,
    passingScore: 75,
  },
};

// Mini exam for practice (shorter version)
const MINI_EXAM = {
  testlets: [
    { type: 'mcq', questions: 18, time: 25 * 60 },
    { type: 'mcq', questions: 18, time: 25 * 60 },
  ],
  totalTime: 50 * 60, // 50 minutes
  passingScore: 75,
};

const ExamSimulator = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const { completeSimulation } = useStudy();

  const [examState, setExamState] = useState('intro'); // intro, exam, break, review, complete
  const [questions, setQuestions] = useState([]);
  const [currentTestlet, setCurrentTestlet] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMiniExam, setIsMiniExam] = useState(true);
  const [showCalculator, setShowCalculator] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const timerRef = useRef(null);
  const currentSection = userProfile?.examSection || 'REG';
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
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort(() => Math.random() - 0.5);

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
    if (examState !== 'exam' || isPaused) {
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
  }, [examState, isPaused]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
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
  }, [examState, currentIndex]);

  // Get current testlet questions
  const getTestletQuestions = () => {
    let start = 0;
    for (let i = 0; i < currentTestlet; i++) {
      start += examConfig.testlets[i].questions;
    }
    const testlet = examConfig.testlets[currentTestlet];
    return questions.slice(start, start + testlet.questions);
  };

  const testletQuestions = getTestletQuestions();
  const currentQuestion = testletQuestions[currentIndex];

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (index) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: index }));
    feedback.tap();
  };

  const handleNext = () => {
    if (currentIndex < testletQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
    feedback.click();
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
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
    const timeSpent = Math.round((Date.now() - startTime) / 60000);

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

    const percentage = Math.round((correct / questions.length) * 100);

    return { correct, incorrect, unanswered, total: questions.length, percentage };
  };

  // Intro Screen
  if (examState === 'intro') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl"
              style={{ backgroundColor: sectionInfo?.color }}
            >
              {sectionInfo?.shortName}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Exam Simulator</h1>
            <p className="text-slate-400">Practice under real exam conditions</p>
          </div>

          {/* Exam Type Selection */}
          <div className="space-y-3 mb-8">
            <button
              onClick={() => setIsMiniExam(true)}
              className={clsx(
                'w-full p-4 rounded-xl border-2 text-left transition-all',
                isMiniExam
                  ? 'border-primary-500 bg-primary-500/10'
                  : 'border-slate-700 bg-slate-800 hover:border-slate-600'
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Mini Exam</div>
                  <div className="text-sm text-slate-400">
                    36 MCQs • 50 minutes • Perfect for practice
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-success-500/20 text-success-400 rounded-lg text-xs">
                    Recommended
                  </span>
                </div>
              </div>
            </button>

            <button
              onClick={() => setIsMiniExam(false)}
              className={clsx(
                'w-full p-4 rounded-xl border-2 text-left transition-all',
                !isMiniExam
                  ? 'border-primary-500 bg-primary-500/10'
                  : 'border-slate-700 bg-slate-800 hover:border-slate-600'
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Full Exam</div>
                  <div className="text-sm text-slate-400">
                    72+ MCQs + TBS • 4 hours • Full simulation
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-warning-500/20 text-warning-400 rounded-lg text-xs">
                    Advanced
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Exam Info */}
          <div className="bg-slate-800 rounded-xl p-4 mb-8">
            <h3 className="font-medium text-white mb-3">Exam Rules:</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                You can flag questions and return to them
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                Timer runs continuously (you can pause)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                You'll get a detailed score report at the end
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-warning-500 mt-0.5 flex-shrink-0" />
                75% is the passing threshold
              </li>
            </ul>
          </div>

          <button
            onClick={startExam}
            disabled={loading}
            className="btn-primary w-full py-4 text-lg"
          >
            {loading ? 'Preparing Exam...' : 'Begin Exam'}
          </button>

          <button
            onClick={() => navigate('/study')}
            className="w-full mt-3 py-2 text-slate-400 hover:text-white"
          >
            Back to Study
          </button>
        </div>
      </div>
    );
  }

  // Break Screen
  if (examState === 'break') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Pause className="w-8 h-8 text-primary-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Testlet Complete!</h2>
          <p className="text-slate-400 mb-6">Take a short break if needed. Your timer is paused.</p>

          <div className="bg-slate-800 rounded-xl p-4 mb-6">
            <div className="text-3xl font-mono text-white mb-1">{formatTime(timeLeft)}</div>
            <div className="text-sm text-slate-400">Time remaining</div>
          </div>

          <button onClick={() => setExamState('exam')} className="btn-primary w-full py-3">
            Continue to Testlet {currentTestlet + 1}
          </button>
        </div>
      </div>
    );
  }

  // Complete Screen
  if (examState === 'complete') {
    const results = calculateResults();
    const passed = results.percentage >= examConfig.passingScore;
    const timeSpent = Math.round((examConfig.totalTime - timeLeft) / 60);

    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <div
            className={clsx(
              'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6',
              passed ? 'bg-success-500/20' : 'bg-warning-500/20'
            )}
          >
            {passed ? (
              <Trophy className="w-12 h-12 text-success-400" />
            ) : (
              <Target className="w-12 h-12 text-warning-400" />
            )}
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            {passed ? 'Congratulations!' : 'Keep Going!'}
          </h1>
          <p className="text-slate-400 mb-8">
            {passed
              ? "You're on track to pass the CPA exam!"
              : 'Review your weak areas and try again.'}
          </p>

          <div
            className={clsx(
              'text-7xl font-bold mb-8',
              passed
                ? 'text-success-400'
                : results.percentage >= 60
                  ? 'text-warning-400'
                  : 'text-error-400'
            )}
          >
            {results.percentage}%
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800 rounded-xl p-4">
              <CheckCircle className="w-6 h-6 text-success-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{results.correct}</div>
              <div className="text-sm text-slate-400">Correct</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <XCircle className="w-6 h-6 text-error-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{results.incorrect}</div>
              <div className="text-sm text-slate-400">Incorrect</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <Clock className="w-6 h-6 text-primary-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{timeSpent}m</div>
              <div className="text-sm text-slate-400">Time Used</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <BarChart3 className="w-6 h-6 text-warning-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{results.unanswered}</div>
              <div className="text-sm text-slate-400">Skipped</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setExamState('intro')}
              className="flex-1 py-3 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600"
            >
              Try Again
            </button>
            <button onClick={() => navigate('/progress')} className="flex-1 btn-primary py-3">
              View Progress
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Exam Screen
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 text-white px-4 py-3 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="px-3 py-1 rounded-lg font-medium text-sm"
              style={{ backgroundColor: sectionInfo?.color }}
            >
              {sectionInfo?.shortName}
            </div>
            <span className="text-sm text-slate-400">
              Testlet {currentTestlet + 1} • Q{currentIndex + 1}/{testletQuestions.length}
            </span>
          </div>

          <div
            className={clsx(
              'flex items-center gap-2 font-mono text-lg',
              timeLeft < 600 && 'text-error-400'
            )}
          >
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCalculator((c) => !c)}
              className={clsx(
                'p-2 rounded-lg transition-colors',
                showCalculator ? 'bg-primary-600' : 'hover:bg-slate-800'
              )}
              title="Calculator"
            >
              <Calculator className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPaused((p) => !p)}
              className="p-2 rounded-lg hover:bg-slate-800"
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Paused Overlay */}
      {isPaused && (
        <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center z-50">
          <div className="text-center text-white">
            <Pause className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Exam Paused</h2>
            <p className="text-slate-400 mb-6">Take a breather. Your progress is saved.</p>
            <button onClick={() => setIsPaused(false)} className="btn-primary">
              Resume Exam
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Question Navigator */}
        <div className="hidden lg:block w-64 bg-white border-r border-slate-200 p-4 overflow-y-auto">
          <h3 className="font-medium text-slate-900 mb-3">Questions</h3>
          <div className="grid grid-cols-5 gap-2">
            {testletQuestions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={clsx(
                  'aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all',
                  currentIndex === idx && 'ring-2 ring-primary-500',
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
        </div>

        {/* Question Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-slate-500">
                Question {currentIndex + 1} of {testletQuestions.length}
              </div>
              <button
                onClick={toggleFlag}
                className={clsx(
                  'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors',
                  flagged.has(currentQuestion?.id)
                    ? 'bg-warning-100 text-warning-700'
                    : 'text-slate-500 hover:bg-slate-100'
                )}
              >
                <Flag className="w-4 h-4" />
                {flagged.has(currentQuestion?.id) ? 'Flagged' : 'Flag'}
              </button>
            </div>

            {/* Question */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
              <p className="text-lg text-slate-900 leading-relaxed">{currentQuestion?.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {(currentQuestion?.options || currentQuestion?.choices || []).map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={clsx(
                    'w-full p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3',
                    answers[currentQuestion?.id] === idx
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-200 bg-white hover:border-primary-200'
                  )}
                >
                  <span
                    className={clsx(
                      'w-8 h-8 rounded-lg flex items-center justify-center font-medium flex-shrink-0',
                      answers[currentQuestion?.id] === idx
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
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-slate-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="btn-secondary disabled:opacity-30 flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="text-sm text-slate-500">
            {Object.keys(answers).length} of {testletQuestions.length} answered
          </div>

          {currentIndex === testletQuestions.length - 1 ? (
            <button onClick={handleNextTestlet} className="btn-primary flex items-center gap-2">
              {currentTestlet === examConfig.testlets.length - 1 ? 'Submit Exam' : 'Next Testlet'}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary flex items-center gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamSimulator;
