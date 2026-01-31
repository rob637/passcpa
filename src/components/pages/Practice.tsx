import React, { useState, useEffect, useCallback } from 'react';
import logger from '../../utils/logger';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Clock,
  CheckCircle,
  XCircle,
  Lightbulb,
  BookOpen,
  Shuffle,
  Target,
  Loader2,
  Keyboard,
  Sparkles,
  AlertTriangle,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useCourse } from '../../providers/CourseProvider';
import { fetchQuestions, getWeakAreaQuestions } from '../../services/questionService';
import { CPA_SECTIONS } from '../../config/examConfig';
import { getBlueprintForExamDate } from '../../config/blueprintConfig';
import feedback from '../../services/feedback';
import clsx from 'clsx';
import { BookmarkButton, NotesButton } from '../common/Bookmarks';
import { Question, ExamSection, Difficulty } from '../../types';

interface SessionConfig {
  section: ExamSection;
  mode: 'study' | 'timed' | 'exam' | 'weak';
  count: number;
  topics: string[];
  difficulty: Difficulty | 'all';
}

interface AnswerState {
  selected: number;
  correct: boolean;
  time: number;
}

interface SessionSetupProps {
  onStart: (config: SessionConfig) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userProfile: any;
  loading: boolean;
}

// Session Setup Component
const SessionSetup: React.FC<SessionSetupProps> = ({ onStart, userProfile, loading }) => {
  const [config, setConfig] = useState<SessionConfig>({
    section: (userProfile?.examSection || 'REG') as ExamSection,
    mode: 'study', // study, timed, exam, weak
    count: 10,
    topics: [],
    difficulty: 'all',
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Practice Questions
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Configure your practice session</p>
      </div>

      <div className="card">
        <div className="card-body space-y-6">
          {/* Section Select */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Exam Section
            </label>
            <select
              value={config.section}
              onChange={(e) => setConfig((prev) => ({ ...prev, section: e.target.value as ExamSection }))}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {Object.entries(CPA_SECTIONS).map(([key, s]) => (
                <option key={key} value={key}>
                  {s.shortName} - {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Practice Mode */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Practice Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'study', name: 'Study', desc: 'Learn at your pace' },
                { id: 'timed', name: 'Timed', desc: '90 sec per question' },
                { id: 'exam', name: 'Exam', desc: 'Simulate real exam' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setConfig((prev) => ({ ...prev, mode: mode.id as SessionConfig['mode'] }))}
                  className={clsx(
                    'p-3 rounded-xl border-2 text-center transition-all focus:ring-2 focus:ring-primary-500/50',
                    config.mode === mode.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                      : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
                  )}
                  aria-pressed={config.mode === mode.id}
                  aria-describedby={`desc-${mode.id}`}
                >
                  <div className="font-medium text-slate-900 dark:text-slate-100">{mode.name}</div>
                  <div id={`desc-${mode.id}`} className="text-xs text-slate-500 dark:text-slate-400">{mode.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Number of Questions
            </label>
            <div className="flex items-center gap-3">
              {[5, 10, 20, 30].map((count) => (
                <button
                  key={count}
                  onClick={() => setConfig((prev) => ({ ...prev, count }))}
                  className={clsx(
                    'flex-1 py-2 rounded-lg border-2 font-medium transition-all focus:ring-2 focus:ring-primary-500/50',
                    config.count === count
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                      : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-primary-300'
                  )}
                  aria-label={`${count} questions`}
                  aria-pressed={config.count === count}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Difficulty
            </label>
            <div className="flex items-center gap-3">
              {[
                { id: 'all', name: 'All Levels' },
                { id: 'easy', name: 'Easy' },
                { id: 'medium', name: 'Medium' },
                { id: 'hard', name: 'Hard' },
              ].map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setConfig((prev) => ({ ...prev, difficulty: diff.id as Difficulty | 'all' }))}
                  className={clsx(
                    'flex-1 py-2 rounded-lg border-2 text-sm font-medium transition-all focus:ring-2 focus:ring-primary-500/50',
                    config.difficulty === diff.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                      : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-primary-300'
                  )}
                  aria-pressed={config.difficulty === diff.id}
                >
                  {diff.name}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={() => onStart(config)}
            disabled={loading}
            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading Questions...
              </>
            ) : (
              <>
                <Shuffle className="w-5 h-5" />
                Start Practice
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userProfile } = useAuth();
  const { recordMCQAnswer, logActivity } = useStudy();
  const { courseId } = useCourse();

  // Session state
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  void sessionConfig; // Use to suppress unused warning
  const [inSession, setInSession] = useState(false);
  const [loading, setLoading] = useState(false);

  // Question state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Timer
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  
  // Report Issue state
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState<string>('');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const currentQuestion: Question | undefined = questions[currentIndex];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isAnswered = currentAnswer !== undefined;

  // Keyboard shortcuts
  useEffect(() => {
    if (!inSession) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (e: any) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // Answer selection (1-4 keys)
      if (!isAnswered && ['1', '2', '3', '4'].includes(e.key)) {
        const index = parseInt(e.key) - 1;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options = currentQuestion?.options || (currentQuestion as any)?.choices || [];
        if (index < options.length) {
          setSelectedAnswer(index);
          feedback.haptic('light');
        }
      }

      // Submit answer (Enter)
      if (e.key === 'Enter' && selectedAnswer !== null && !isAnswered) {
        e.preventDefault();
        handleSubmitAnswer();
      }

      // Next question (ArrowRight or N)
      if ((e.key === 'ArrowRight' || e.key === 'n') && isAnswered) {
        nextQuestion();
      }

      // Previous question (ArrowLeft or P)
      if ((e.key === 'ArrowLeft' || e.key === 'p') && currentIndex > 0) {
        prevQuestion();
      }

      // Flag question (F)
      if (e.key === 'f') {
        toggleFlag();
        feedback.haptic('light');
      }

      // Show/hide shortcuts (?)
      if (e.key === '?') {
        setShowShortcuts((s) => !s);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inSession, isAnswered, selectedAnswer, currentIndex, currentQuestion]); // Removed handleSubmitAnswer, nextQuestion, prevQuestion, toggleFlag to avoid loop, using refs or stable callbacks? They are stable if wrapped in useCallback.

  // But the dependencies are updated in the callbacks.
  // Actually, standard practice is to include them. The callbacks are wrapped in useCallback.

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (inSession && startTime) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [inSession, startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Start a practice session
  const startSession = async (config: SessionConfig) => {
    setLoading(true);

    try {
      let fetchedQuestions: Question[];

      // Determine Blueprint Version based on user's exam date
      const rawExamDate = userProfile?.examDate;
      const examDate = rawExamDate && typeof (rawExamDate as { toDate?: () => Date }).toDate === 'function'
        ? (rawExamDate as { toDate: () => Date }).toDate()
        : rawExamDate ? new Date(rawExamDate as Date) : new Date();
      const blueprintVersion = getBlueprintForExamDate(examDate);
      const is2026 = blueprintVersion === '2026';

      if (config.mode === 'weak') {
        // Get questions from weak areas
        fetchedQuestions = await getWeakAreaQuestions(
          userProfile?.id || '',
          (userProfile?.examSection as ExamSection) || 'REG',
          config.count
        );
      } else {
        // Normal fetch with filters
        fetchedQuestions = await fetchQuestions({
          section: (userProfile?.examSection as ExamSection) || 'REG',
          difficulty: config.difficulty !== 'all' ? config.difficulty : undefined,
          count: config.count,
          hr1Only: is2026, // Enforce 2026 Blueprint rules (e.g. OBBBA/H.R. 1 Tax provisions)
          mode: (config.mode === 'study' ? undefined : config.mode) as any, // Cast to fix strict type overlap
          courseId, // Multi-course support
        });
      }

      setQuestions(fetchedQuestions);
      setSessionConfig(config);
      setInSession(true);
      setStartTime(Date.now());
      setCurrentIndex(0);
      setAnswers({});
      setSelectedAnswer(null);
      setShowExplanation(false);
      setFlagged(new Set());
      setLoading(false);
    } catch (error) {
      logger.error('Error starting session:', error);
      setLoading(false);
    }
  };

  // Auto-start weak areas session if mode=weak in URL
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'weak' && userProfile && !inSession && !loading) {
      const section = (userProfile.examSection || 'REG') as ExamSection;
      startSession({
        section,
        mode: 'weak',
        count: 20,
        topics: [],
        difficulty: 'all',
      });
    }
    // Only run once on mount when mode=weak
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  // Handle answer selection
  const handleSelectAnswer = useCallback((answerIndex: number) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
  }, [isAnswered]); // isAnswered depends on answers and currentIndex.

  // Submit answer
  const handleSubmitAnswer = useCallback(async () => {
    if (selectedAnswer === null || isAnswered || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // Provide feedback
    if (isCorrect) {
      feedback.playSound('correct');
      feedback.haptic('success');
    } else {
      feedback.playSound('incorrect');
      feedback.haptic('error');
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selected: selectedAnswer,
        correct: isCorrect,
        time: elapsed,
      },
    }));
    setShowExplanation(true);

    // Record in study provider
    if (recordMCQAnswer) {
      await recordMCQAnswer(
        currentQuestion.id,
        currentQuestion.topic,
        currentQuestion.subtopic,
        isCorrect,
        currentQuestion.difficulty,
        elapsed // Pass time spent in seconds
      );
    }
  }, [selectedAnswer, isAnswered, currentQuestion, elapsed, recordMCQAnswer]);

  // Ask AI for help
  const askAI = useCallback(() => {
    const questionText = currentQuestion?.question || '';
    const correctAnswer =
      currentQuestion?.options?.[currentQuestion.correctAnswer] ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (currentQuestion as any)?.choices?.[currentQuestion.correctAnswer] ||
      '';
    const explanation = currentQuestion?.explanation || '';

    // Navigate to AI tutor with context
    navigate('/ai-tutor', {
      state: {
        context: `I got this CPA exam question wrong and need help understanding it:\n\nQuestion: ${questionText}\n\nCorrect Answer: ${correctAnswer}\n\nExplanation: ${explanation}\n\nCan you explain this concept in more detail and give me tips for remembering it?`,
      },
    });
  }, [currentQuestion, navigate]);

  // Navigation
  const goToQuestion = useCallback((index: number) => {
    setCurrentIndex(index);
    setSelectedAnswer(answers[questions[index]?.id]?.selected ?? null);
    setShowExplanation(answers[questions[index]?.id] !== undefined);
  }, [answers, questions]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      goToQuestion(currentIndex + 1);
    }
  }, [currentIndex, questions.length, goToQuestion]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1);
    }
  }, [currentIndex, goToQuestion]);

  // Toggle flag
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
  }, [currentQuestion]);

  // Report issue handler
  const handleReportIssue = useCallback(async () => {
    if (!currentQuestion || !reportType) return;
    
    try {
      // Log the report (could be sent to Firestore in production)
      logger.log('Question Issue Report:', {
        questionId: currentQuestion.id,
        section: sessionConfig?.section,
        type: reportType,
        details: reportDetails,
        timestamp: new Date().toISOString()
      });
      
      if (logActivity) {
        logActivity('question_reported', {
          questionId: currentQuestion.id,
          reportType,
          details: reportDetails
        });
      }
      
      setReportSubmitted(true);
      setTimeout(() => {
        setShowReportModal(false);
        setReportType('');
        setReportDetails('');
        setReportSubmitted(false);
      }, 2000);
    } catch (error) {
      logger.error('Failed to submit report:', error);
    }
  }, [currentQuestion, reportType, reportDetails, sessionConfig, logActivity]);

  // End session
  const endSession = () => {
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(answers).length;
    const correctCount = Object.values(answers).filter((a) => a.correct).length;

    if (logActivity) {
      logActivity('practice_completed', {
        totalQuestions,
        answeredCount,
        correctCount,
        accuracy: answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0,
        totalTime: elapsed,
        details: undefined // or provide details if needed
      });
    }

    // Show results or go back
    setInSession(false);
    setSessionConfig(null);
  };

  // Session configuration screen
  if (!inSession) {
    return <SessionSetup onStart={startSession} userProfile={userProfile} loading={loading} />;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // No questions available for selected criteria
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            No Questions Available
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            There are no practice questions available for your selected section and criteria. 
            Try adjusting your filters or selecting a different exam section.
          </p>
          <button
            onClick={endSession}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Setup
          </button>
        </div>
      </div>
    );
  }

  // Shouldn't happen, but handle edge case
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-slate-50 dark:bg-slate-900 page-transition">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Progress */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {currentIndex + 1} / {questions.length}
              </span>
              <div className="w-32 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden hidden sm:block">
                <div
                  className="h-full bg-primary-500 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Timer & Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-mono">{formatTime(elapsed)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-success-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {correctCount}/{answeredCount}
                </span>
              </div>
              <button
                onClick={() => setShowShortcuts(true)}
                className="hidden sm:flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                title="Keyboard shortcuts"
              >
                <Keyboard className="w-4 h-4" />
              </button>
              <button
                onClick={endSession}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                End Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="card mb-4">
          {/* Question Header */}
          <div className="card-header flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={clsx(
                  'px-2 py-0.5 rounded text-xs font-medium',
                  currentQuestion.difficulty === 'easy' && 'bg-green-100 text-green-700',
                  currentQuestion.difficulty === 'medium' && 'bg-amber-100 text-amber-700',
                  currentQuestion.difficulty === 'hard' && 'bg-red-100 text-red-700'
                )}
              >
                {currentQuestion.difficulty}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {currentQuestion.topic}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BookmarkButton 
                itemId={currentQuestion.id} 
                itemType="question" 
                itemData={{ 
                  title: currentQuestion.question.slice(0, 100),
                  section: currentQuestion.section,
                  topic: currentQuestion.topic
                }}
                size="md"
              />
              <NotesButton 
                itemId={currentQuestion.id}
                itemData={{
                  section: currentQuestion.section,
                  topic: currentQuestion.topic
                }}
                size="md"
              />
              <button
                onClick={toggleFlag}
                className={clsx(
                  'p-2 rounded-lg transition-colors',
                  flagged.has(currentQuestion.id)
                    ? 'bg-amber-100 text-amber-600'
                    : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-amber-500'
                )}
              >
                <Flag className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="card-body">
            <p className="text-slate-900 dark:text-slate-100 text-lg leading-relaxed mb-6">
              {currentQuestion.question}
            </p>

            {/* Answer Choices */}
            <div className="space-y-3">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(currentQuestion.options || (currentQuestion as any).choices || []).map((choice: string, index: number) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = isAnswered;

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={isAnswered}
                    className={clsx(
                      'mcq-option w-full text-left',
                      !showResult && isSelected && 'mcq-option-selected',
                      showResult && isCorrect && 'mcq-option-correct',
                      showResult && isSelected && !isCorrect && 'mcq-option-incorrect',
                      isAnswered && 'mcq-option-disabled',
                      showResult && !isSelected && !isCorrect && 'opacity-60'
                    )}
                  >
                    {/* Choice Letter */}
                    <span className="mcq-option-letter">{String.fromCharCode(65 + index)}</span>
                    <span className="flex-1 pt-0.5 text-slate-700 dark:text-slate-300">
                      {choice}
                    </span>
                    {showResult && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-error-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            {!isAnswered && (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={clsx(
                  'mt-6 w-full btn-primary py-3',
                  selectedAnswer === null && 'opacity-50 cursor-not-allowed'
                )}
              >
                Submit Answer
              </button>
            )}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="card mb-4">
            <div className="card-header flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Explanation</h3>
            </div>
            <div className="card-body">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={askAI}
                  className="btn-secondary text-sm flex items-center gap-2 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300"
                >
                  <Sparkles className="w-4 h-4" />
                  Ask Vory to Explain
                </button>
                <Link
                  to={`/study/${currentQuestion.section?.toLowerCase() || 'far'}`}
                  className="btn-secondary text-sm flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Review Lessons
                </Link>
                <button
                  onClick={() => setShowReportModal(true)}
                  className="btn-secondary text-sm flex items-center gap-2 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Modal */}
        {showShortcuts && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowShortcuts(false)}
          >
            <div
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-4">
                <Keyboard className="w-5 h-5 text-primary-600" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Keyboard Shortcuts
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Select answer</span>
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-mono">
                    1-4
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Submit answer</span>
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-mono">
                    Enter
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Next question</span>
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-mono">
                    → or N
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Previous question</span>
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-mono">
                    ← or P
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Flag question</span>
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-mono">
                    F
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Show shortcuts</span>
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-mono">
                    ?
                  </kbd>
                </div>
              </div>
              <button onClick={() => setShowShortcuts(false)} className="w-full btn-primary mt-4">
                Got it
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="btn-secondary flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {/* Question Dots */}
          <div className="flex-1 flex items-center justify-center gap-1.5 overflow-x-auto py-2">
            {questions.slice(0, Math.min(10, questions.length)).map((q, index) => (
              <button
                key={q.id}
                onClick={() => goToQuestion(index)}
                className={clsx(
                  'w-8 h-8 rounded-lg text-xs font-medium transition-colors flex-shrink-0',
                  currentIndex === index && 'bg-primary-500 text-white',
                  currentIndex !== index &&
                    answers[q.id]?.correct &&
                    'bg-success-100 text-success-700',
                  currentIndex !== index &&
                    answers[q.id] &&
                    !answers[q.id].correct &&
                    'bg-red-100 text-red-700',
                  currentIndex !== index &&
                    !answers[q.id] &&
                    'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                )}
              >
                {index + 1}
              </button>
            ))}
            {questions.length > 10 && (
              <span className="text-sm text-slate-400 dark:text-slate-500">
                +{questions.length - 10}
              </span>
            )}
          </div>

          <button
            onClick={nextQuestion}
            disabled={currentIndex === questions.length - 1}
            className="btn-primary flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Report Issue Modal */}
      {showReportModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowReportModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md mx-4 shadow-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {reportSubmitted ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-success-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                  Thank You!
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Your report has been submitted.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Report an Issue
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Question ID: <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">{currentQuestion.id}</code>
                </p>
                
                <div className="space-y-3 mb-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Issue Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'wrong-answer', label: 'Wrong Answer' },
                      { value: 'typo', label: 'Typo/Grammar' },
                      { value: 'unclear', label: 'Unclear Question' },
                      { value: 'outdated', label: 'Outdated Content' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setReportType(option.value)}
                        className={clsx(
                          'px-3 py-2 rounded-lg text-sm font-medium transition-colors border',
                          reportType === option.value
                            ? 'bg-primary-100 border-primary-300 text-primary-700 dark:bg-primary-900 dark:border-primary-700 dark:text-primary-300'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Additional Details (optional)
                  </label>
                  <textarea
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Please describe the issue..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReportIssue}
                    disabled={!reportType}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Practice;
