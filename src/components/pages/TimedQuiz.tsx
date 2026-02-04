import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Settings,
  ChevronDown,
  BookOpen,
  Zap,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { fetchQuestions } from '../../services/questionService';
import feedback from '../../services/feedback';
import clsx from 'clsx';
import { Question, ExamSection, Difficulty } from '../../types';
import { CPA_SECTIONS } from '../../config/examConfig';

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
  weak: { questions: 15, timePerQuestion: 90, name: 'Weak Areas' },
  custom: { questions: 10, timePerQuestion: 90, name: 'Custom Quiz' },
};

// Blueprint areas for targeting specific content
const BLUEPRINT_AREAS: Record<ExamSection, { id: string; name: string }[]> = {
  FAR: [
    { id: 'FAR-I', name: 'Conceptual Framework & Financial Reporting' },
    { id: 'FAR-II', name: 'Select Financial Statement Accounts' },
    { id: 'FAR-III', name: 'Select Transactions' },
    { id: 'FAR-IV', name: 'State and Local Governments' },
    { id: 'FAR-V', name: 'Not-for-Profit Entities' },
  ],
  AUD: [
    { id: 'AUD-I', name: 'Ethics & Professional Responsibilities' },
    { id: 'AUD-II', name: 'Assessing Risk & Developing Response' },
    { id: 'AUD-III', name: 'Performing Procedures & Obtaining Evidence' },
    { id: 'AUD-IV', name: 'Forming Conclusions & Reporting' },
    { id: 'AUD-V', name: 'Accounting & Review Services' },
  ],
  REG: [
    { id: 'REG-I', name: 'Ethics, Professional Responsibilities & Tax Procedures' },
    { id: 'REG-II', name: 'Business Law' },
    { id: 'REG-III', name: 'Federal Taxation of Property Transactions' },
    { id: 'REG-IV', name: 'Federal Taxation of Individuals' },
    { id: 'REG-V', name: 'Federal Taxation of Entities' },
  ],
  BAR: [
    { id: 'BAR-I', name: 'Business Analysis' },
    { id: 'BAR-II', name: 'Technical Accounting & Reporting' },
    { id: 'BAR-III', name: 'State & Local Government Concepts' },
    { id: 'BAR-IV', name: 'Not-for-Profit Concepts' },
  ],
  ISC: [
    { id: 'ISC-I', name: 'Information Systems & Data Management' },
    { id: 'ISC-II', name: 'Security, Confidentiality & Privacy' },
    { id: 'ISC-III', name: 'Technology-Enabled Finance Transformation' },
  ],
  TCP: [
    { id: 'TCP-I', name: 'Tax Compliance & Planning for Individuals' },
    { id: 'TCP-II', name: 'Entity Tax Compliance' },
    { id: 'TCP-III', name: 'Entity Tax Planning' },
    { id: 'TCP-IV', name: 'Property Transactions' },
  ],
  BEC: [
    { id: 'BEC-I', name: 'Enterprise Risk Management' },
    { id: 'BEC-II', name: 'Economics' },
  ],
  PREP: [
    { id: 'PREP-I', name: 'CPA Exam Preparation' },
  ],
};

type QuizState = 'setup' | 'active' | 'review' | 'complete' | 'explanations';

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
  const [quizState, setQuizState] = useState<QuizState>('setup'); // setup, active, review, complete, explanations
  const [loading, setLoading] = useState(false);
  
  // New setup options
  const [selectedSection, setSelectedSection] = useState<ExamSection | 'all'>('all');
  const [selectedBlueprintArea, setSelectedBlueprintArea] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [customQuestionCount, setCustomQuestionCount] = useState(10);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerRef = useRef<any>(null);
  // Ref for scrolling to top of question on navigation (mobile fix)
  const questionTopRef = useRef<HTMLDivElement>(null);
  const mode = searchParams.get('mode') || 'quick';
  const quizConfig = QUIZ_MODES[mode] || QUIZ_MODES.quick;
  const currentSection = selectedSection !== 'all' ? selectedSection : (userProfile?.examSection || 'REG') as ExamSection;

  // Load questions
  const startQuiz = async () => {
    setLoading(true);
    try {
      const questionCount = mode === 'custom' ? customQuestionCount : quizConfig.questions;
      
      // Use local questionService instead of Firebase for faster loading
      const loadedQuestions = await fetchQuestions({
        section: selectedSection !== 'all' ? selectedSection : currentSection,
        blueprintArea: selectedBlueprintArea !== 'all' ? selectedBlueprintArea : undefined,
        difficulty: selectedDifficulty !== 'all' ? selectedDifficulty : undefined,
        count: questionCount,
        mode: mode === 'weak' ? 'weak' : 'random',
      });

      if (loadedQuestions.length === 0) {
        logger.warn('No questions found for selected filters');
        setLoading(false);
        return;
      }

      // Shuffle questions
      const shuffled = [...loadedQuestions].sort(() => Math.random() - 0.5);

      setQuestions(shuffled);
      setTimeLeft(shuffled.length * quizConfig.timePerQuestion);
      setTotalTime(shuffled.length * quizConfig.timePerQuestion);
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
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((i) => i + 1);
          scrollToQuestionTop();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setCurrentIndex((i) => i - 1);
          scrollToQuestionTop();
        }
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

  // Helper to scroll to top of question (mobile fix)
  const scrollToQuestionTop = useCallback(() => {
    if (questionTopRef.current) {
      questionTopRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

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
      scrollToQuestionTop();
    } else {
      setQuizState('review');
    }
    feedback.click();
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setSelectedAnswer(answers[questions[currentIndex - 1]?.id] ?? null);
      scrollToQuestionTop();
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
    const effectiveSection = selectedSection !== 'all' ? selectedSection : (userProfile?.examSection || 'REG') as ExamSection;
    const blueprintAreas = BLUEPRINT_AREAS[effectiveSection] || [];
    
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate('/home')}
            className="mb-4 flex items-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowRight className="w-4 h-4 mr-1 rotate-180" />
            Back to Home
          </button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Timed Quiz</h1>
            <p className="text-slate-600">Test yourself under exam conditions</p>
          </div>

          {/* Quiz Mode Selection */}
          <div className="space-y-3 mb-6">
            {Object.entries(QUIZ_MODES).filter(([key]) => key !== 'custom').map(([key, config]) => (
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
                  <div className="flex items-center gap-3">
                    {key === 'weak' && <AlertCircle className="w-5 h-5 text-warning-500" />}
                    {key === 'exam' && <Target className="w-5 h-5 text-error-500" />}
                    {key === 'challenge' && <Zap className="w-5 h-5 text-primary-500" />}
                    {(key === 'quick' || key === 'standard') && <Clock className="w-5 h-5 text-primary-500" />}
                    <div>
                      <div className="font-semibold text-slate-900">{config.name}</div>
                      <div className="text-sm text-slate-600">
                        {config.questions} questions • {config.timePerQuestion}s each
                      </div>
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

          {/* Advanced Options Toggle */}
          <button
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            className="w-full flex items-center justify-between p-3 text-slate-600 hover:text-slate-900 mb-4"
          >
            <span className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Quiz Options</span>
            </span>
            <ChevronDown className={clsx('w-4 h-4 transition-transform', showAdvancedOptions && 'rotate-180')} />
          </button>

          {/* Advanced Options Panel */}
          {showAdvancedOptions && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 space-y-4">
              {/* Section Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Exam Section</label>
                <select
                  value={selectedSection}
                  onChange={(e) => {
                    setSelectedSection(e.target.value as ExamSection | 'all');
                    setSelectedBlueprintArea('all');
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">Current Section ({userProfile?.examSection || 'REG'})</option>
                  {Object.entries(CPA_SECTIONS).map(([key, section]) => (
                    <option key={key} value={key}>{section.shortName} - {section.name}</option>
                  ))}
                </select>
              </div>

              {/* Blueprint Area Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  Blueprint Area
                </label>
                <select
                  value={selectedBlueprintArea}
                  onChange={(e) => setSelectedBlueprintArea(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Areas</option>
                  {blueprintAreas.map((area) => (
                    <option key={area.id} value={area.id}>{area.id}: {area.name}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
                <div className="flex gap-2">
                  {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={clsx(
                        'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors',
                        selectedDifficulty === diff
                          ? diff === 'easy' ? 'bg-success-100 text-success-700 border-2 border-success-300'
                          : diff === 'medium' ? 'bg-warning-100 text-warning-700 border-2 border-warning-300'
                          : diff === 'hard' ? 'bg-error-100 text-error-700 border-2 border-error-300'
                          : 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                          : 'bg-slate-100 text-slate-600 border-2 border-transparent hover:bg-slate-200'
                      )}
                    >
                      {diff === 'all' ? 'All' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Question Count (only for custom mode) */}
              {mode === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Number of Questions</label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={customQuestionCount}
                    onChange={(e) => setCustomQuestionCount(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-slate-600 mt-1">{customQuestionCount} questions</div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={startQuiz}
            disabled={loading}
            className="btn-primary w-full py-3 text-lg"
          >
            {loading ? 'Loading...' : 'Start Quiz'}
          </button>

          <button
            onClick={() => navigate('/home')}
            className="w-full mt-3 py-2 text-slate-600 hover:text-slate-900"
          >
            Back to Home
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
                      : 'bg-slate-100 text-slate-600',
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
              <Clock className="w-6 h-6 text-slate-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-slate-700">{results.unanswered}</div>
              <div className="text-xs text-slate-600">Skipped</div>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button onClick={() => setQuizState('setup')} className="btn-secondary flex-1">
              Try Again
            </button>
            <button onClick={() => navigate('/progress')} className="btn-primary flex-1">
              View Progress
            </button>
          </div>
          
          {/* Review Explanations Button */}
          <button
            onClick={() => {
              setReviewIndex(0);
              setQuizState('explanations');
            }}
            className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Review All Explanations
          </button>
        </div>
      </div>
    );
  }

  // Explanations Review Screen
  if (quizState === 'explanations') {
    const reviewQuestion = questions[reviewIndex];
    const userAnswer = answers[reviewQuestion?.id];
    const isCorrect = userAnswer === reviewQuestion?.correctAnswer;
    const wasAnswered = userAnswer !== undefined;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setQuizState('complete')}
              className="text-slate-600 hover:text-slate-900"
            >
              ← Back to Results
            </button>
            <span className="font-medium text-slate-900">
              Review {reviewIndex + 1} / {questions.length}
            </span>
            <div className="w-20" />
          </div>
          
          {/* Progress bar */}
          <div className="max-w-3xl mx-auto mt-3">
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 transition-all"
                style={{ width: `${((reviewIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Result Badge */}
            <div className={clsx(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
              !wasAnswered ? 'bg-slate-100 text-slate-600'
                : isCorrect ? 'bg-success-100 text-success-700'
                : 'bg-error-100 text-error-700'
            )}>
              {!wasAnswered ? (
                <><Clock className="w-4 h-4" /> Skipped</>
              ) : isCorrect ? (
                <><CheckCircle className="w-4 h-4" /> Correct</>
              ) : (
                <><XCircle className="w-4 h-4" /> Incorrect</>
              )}
            </div>

            {/* Question */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="text-xs text-primary-600 font-medium mb-2">
                {reviewQuestion?.topic || reviewQuestion?.blueprintArea || currentSection}
              </div>
              <p className="text-lg text-slate-900 leading-relaxed">{reviewQuestion?.question}</p>
            </div>

            {/* Options with correct/incorrect highlighting */}
            <div className="space-y-2">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(reviewQuestion?.options || (reviewQuestion as any)?.choices || []).map((option: string, idx: number) => {
                const isUserAnswer = userAnswer === idx;
                const isCorrectAnswer = reviewQuestion?.correctAnswer === idx;
                
                return (
                  <div
                    key={idx}
                    className={clsx(
                      'w-full p-4 rounded-xl border-2 flex items-start gap-3',
                      isCorrectAnswer
                        ? 'border-success-500 bg-success-50'
                        : isUserAnswer && !isCorrectAnswer
                        ? 'border-error-500 bg-error-50'
                        : 'border-slate-200 bg-white'
                    )}
                  >
                    <span
                      className={clsx(
                        'w-8 h-8 rounded-lg flex items-center justify-center font-medium flex-shrink-0',
                        isCorrectAnswer
                          ? 'bg-success-500 text-white'
                          : isUserAnswer
                          ? 'bg-error-500 text-white'
                          : 'bg-slate-100 text-slate-600'
                      )}
                    >
                      {isCorrectAnswer ? <CheckCircle className="w-5 h-5" /> : 
                       isUserAnswer ? <XCircle className="w-5 h-5" /> : 
                       String.fromCharCode(65 + idx)}
                    </span>
                    <span className={clsx(
                      'pt-1',
                      isCorrectAnswer ? 'text-success-700 font-medium' : 'text-slate-700'
                    )}>
                      {option}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {reviewQuestion?.explanation && (
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-primary-800 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Explanation
                </h3>
                <p className="text-primary-900 leading-relaxed">{reviewQuestion.explanation}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="bg-white border-t border-slate-100 px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setReviewIndex(i => Math.max(0, i - 1))}
              disabled={reviewIndex === 0}
              className="btn-secondary disabled:opacity-30"
            >
              Previous
            </button>

            <div className="flex gap-1">
              {questions.slice(Math.max(0, reviewIndex - 3), reviewIndex + 4).map((q, idx) => {
                const actualIdx = Math.max(0, reviewIndex - 3) + idx;
                const isAnswered = answers[q.id] !== undefined;
                const wasCorrect = answers[q.id] === q.correctAnswer;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => setReviewIndex(actualIdx)}
                    className={clsx(
                      'w-8 h-8 rounded-lg text-xs font-medium transition-colors',
                      actualIdx === reviewIndex
                        ? 'bg-primary-500 text-white'
                        : !isAnswered
                        ? 'bg-slate-100 text-slate-600'
                        : wasCorrect
                        ? 'bg-success-100 text-success-700'
                        : 'bg-error-100 text-error-700'
                    )}
                  >
                    {actualIdx + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setReviewIndex(i => Math.min(questions.length - 1, i + 1))}
              disabled={reviewIndex === questions.length - 1}
              className="btn-primary disabled:opacity-30 flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
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
      <div ref={questionTopRef} className="flex-1 p-4">
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
