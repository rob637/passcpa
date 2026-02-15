/**
 * Diagnostic Quiz Page
 * Full-screen quiz experience that assesses knowledge gaps before starting study.
 * Accessible after onboarding, but fully skippable.
 *
 * Flow: Intro → Quiz (timed, 25 questions) → Results (per-area breakdown)
 * Results are saved to Firestore and feed the adaptive learning engine.
 */
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../providers/CourseProvider';
import { getCourseHomePath } from '../../utils/courseNavigation';
import { trackEvent } from '../../services/analytics';
import { Button } from '../common/Button';
import logger from '../../utils/logger';
import clsx from 'clsx';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Target,
  BookOpen,
  Trophy,
  X,
  Sparkles,
  Brain,
} from 'lucide-react';

import type { CourseId } from '../../types/course';
import type { DiagnosticQuiz as DiagnosticQuizType, DiagnosticResult } from '../../types/diagnostic';
import { scoreDiagnosticQuiz } from '../../types/diagnostic';

// Data imports — lazy-loaded per course
import { CPA_DIAGNOSTIC_QUIZZES, CPA_AREA_NAMES } from '../../data/cpa/diagnostic-quizzes';
import { EA_DIAGNOSTIC_QUIZZES, EA_AREA_NAMES } from '../../data/ea/reference/diagnostic-quizzes';
import { CMA_DIAGNOSTIC_QUIZZES, CMA_AREA_NAMES } from '../../data/cma/diagnostic-quizzes';
import { CIA_DIAGNOSTIC_QUIZZES, CIA_AREA_NAMES } from '../../data/cia/diagnostic-quizzes';
import { CISA_DIAGNOSTIC_QUIZZES, CISA_AREA_NAMES } from '../../data/cisa/diagnostic-quizzes';
import { CFP_DIAGNOSTIC_QUIZZES, CFP_AREA_NAMES } from '../../data/cfp/diagnostic-quizzes';

// ============================================
// Data access helpers
// ============================================
const ALL_DIAGNOSTIC_QUIZZES: Record<CourseId, Record<string, DiagnosticQuizType>> = {
  cpa: CPA_DIAGNOSTIC_QUIZZES,
  ea: EA_DIAGNOSTIC_QUIZZES,
  cma: CMA_DIAGNOSTIC_QUIZZES,
  cia: CIA_DIAGNOSTIC_QUIZZES,
  cisa: CISA_DIAGNOSTIC_QUIZZES,
  cfp: CFP_DIAGNOSTIC_QUIZZES,
};

const ALL_AREA_NAMES: Record<CourseId, Record<string, string>> = {
  cpa: CPA_AREA_NAMES,
  ea: EA_AREA_NAMES,
  cma: CMA_AREA_NAMES,
  cia: CIA_AREA_NAMES,
  cisa: CISA_AREA_NAMES,
  cfp: CFP_AREA_NAMES,
};

// Single-exam courses have one diagnostic quiz for the whole exam
const SINGLE_EXAM_COURSES: CourseId[] = ['cfp', 'cisa'];

function getQuizForSection(courseId: CourseId, section: string): DiagnosticQuizType | null {
  const quizzes = ALL_DIAGNOSTIC_QUIZZES[courseId];
  return quizzes?.[section] || null;
}

function getAvailableSections(courseId: CourseId): string[] {
  return Object.keys(ALL_DIAGNOSTIC_QUIZZES[courseId] || {});
}

// ============================================
// Timer Component
// ============================================
function Timer({ seconds, isWarning }: { seconds: number; isWarning: boolean }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return (
    <div
      className={clsx(
        'flex items-center gap-1.5 font-mono text-sm font-medium px-3 py-1.5 rounded-full',
        isWarning
          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
      )}
    >
      <Clock className="w-4 h-4" />
      {mins}:{secs.toString().padStart(2, '0')}
    </div>
  );
}

// ============================================
// Question Card Component
// ============================================
interface QuestionCardProps {
  questionNum: number;
  totalQuestions: number;
  question: string;
  options: string[];
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
}

function QuestionCard({ questionNum, totalQuestions, question, options, selectedAnswer, onSelect }: QuestionCardProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
        Question {questionNum} of {totalQuestions}
      </div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
        {question}
      </h2>
      <div className="space-y-3">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={clsx(
              'w-full text-left p-4 rounded-xl border-2 transition-all duration-150',
              selectedAnswer === idx
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 ring-1 ring-blue-500/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            )}
          >
            <div className="flex items-start gap-3">
              <span
                className={clsx(
                  'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium',
                  selectedAnswer === idx
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                )}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed pt-0.5">
                {option}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Progress Bar
// ============================================
function ProgressBar({ current, total, answers }: { current: number; total: number; answers: (number | null)[] }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={clsx(
            'h-1.5 rounded-full flex-1 transition-colors',
            i === current
              ? 'bg-blue-500'
              : answers[i] !== null
                ? 'bg-blue-300 dark:bg-blue-600'
                : 'bg-gray-200 dark:bg-gray-700'
          )}
        />
      ))}
    </div>
  );
}

// ============================================
// Question Navigator (mini map)
// ============================================
function QuestionNavigator({
  total,
  current,
  answers,
  onJump,
}: {
  total: number;
  current: number;
  answers: (number | null)[];
  onJump: (idx: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 justify-center">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onJump(i)}
          className={clsx(
            'w-8 h-8 rounded-md text-xs font-medium transition-all',
            i === current
              ? 'bg-blue-500 text-white ring-2 ring-blue-300'
              : answers[i] !== null
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200'
          )}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

// ============================================
// Results Component
// ============================================
interface DiagnosticResultsProps {
  result: DiagnosticResult;
  quiz: DiagnosticQuizType;
  answers: (number | null)[];
  onContinue: () => void;
  onRetake: () => void;
}

function DiagnosticResults({ result, quiz, answers, onContinue, onRetake }: DiagnosticResultsProps) {
  const answeredCount = answers.filter((a) => a !== null).length;
  const scoreColor = result.percentage >= 80 ? 'text-green-600' : result.percentage >= 65 ? 'text-blue-600' : result.percentage >= 50 ? 'text-amber-600' : 'text-red-600';
  const scoreBg = result.percentage >= 80 ? 'bg-green-50 dark:bg-green-900/20' : result.percentage >= 65 ? 'bg-blue-50 dark:bg-blue-900/20' : result.percentage >= 50 ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-red-50 dark:bg-red-900/20';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={clsx('inline-flex items-center justify-center w-16 h-16 rounded-full mb-4', scoreBg)}>
            {result.percentage >= 80 ? (
              <Trophy className={clsx('w-8 h-8', scoreColor)} />
            ) : result.percentage >= 50 ? (
              <Target className={clsx('w-8 h-8', scoreColor)} />
            ) : (
              <BookOpen className={clsx('w-8 h-8', scoreColor)} />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {quiz.title} — Results
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {answeredCount} of {quiz.questions.length} questions answered
            {result.timeSpentSeconds > 0 && (
              <> · {Math.floor(result.timeSpentSeconds / 60)}m {result.timeSpentSeconds % 60}s</>
            )}
          </p>
        </div>

        {/* Score Card */}
        <div className={clsx('rounded-2xl p-6 mb-6 text-center', scoreBg)}>
          <div className={clsx('text-5xl font-bold mb-1', scoreColor)}>
            {result.percentage}%
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            {result.score} / {result.totalQuestions} correct
          </div>
          <div className="mt-3">
            {result.passed ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 dark:text-green-400">
                <CheckCircle className="w-4 h-4" /> Above passing threshold ({quiz.passingScore}%)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 dark:text-amber-400">
                <AlertTriangle className="w-4 h-4" /> Below passing threshold ({quiz.passingScore}%)
              </span>
            )}
          </div>
        </div>

        {/* Area Breakdown */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Performance by Area
          </h3>
          <div className="space-y-4">
            {result.areaScores.map((area) => (
              <div key={area.area}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate pr-2">
                    {area.areaName}
                  </span>
                  <span
                    className={clsx(
                      'text-sm font-medium whitespace-nowrap',
                      area.percentage >= 80
                        ? 'text-green-600 dark:text-green-400'
                        : area.percentage >= 70
                          ? 'text-blue-600 dark:text-blue-400'
                          : area.percentage >= 50
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-red-600 dark:text-red-400'
                    )}
                  >
                    {area.score}/{area.total} ({area.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={clsx(
                      'h-2 rounded-full transition-all duration-500',
                      area.percentage >= 80
                        ? 'bg-green-500'
                        : area.percentage >= 70
                          ? 'bg-blue-500'
                          : area.percentage >= 50
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                    )}
                    style={{ width: `${area.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak & Strong Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {result.weakAreas.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 border border-red-100 dark:border-red-900/30">
              <h4 className="font-medium text-red-800 dark:text-red-400 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Focus Areas
              </h4>
              <ul className="space-y-1">
                {result.weakAreas.map((a) => (
                  <li key={a.area} className="text-sm text-red-700 dark:text-red-300">
                    {a.areaName} ({a.percentage}%)
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.strongAreas.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-100 dark:border-green-900/30">
              <h4 className="font-medium text-green-800 dark:text-green-400 mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> Strong Areas
              </h4>
              <ul className="space-y-1">
                {result.strongAreas.map((a) => (
                  <li key={a.area} className="text-sm text-green-700 dark:text-green-300">
                    {a.areaName} ({a.percentage}%)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Recommendations */}
        {result.recommendations.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30 mb-8">
            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Recommendations
            </h4>
            <ul className="space-y-1.5">
              {result.recommendations.map((r, i) => (
                <li key={i} className="text-sm text-blue-700 dark:text-blue-300">
                  • {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={onRetake} leftIcon={Brain}>
            Retake Quiz
          </Button>
          <Button variant="primary" onClick={onContinue} rightIcon={ArrowRight}>
            Start Studying
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Section Picker (for multi-section courses)
// ============================================
interface SectionPickerProps {
  courseId: CourseId;
  sections: string[];
  onSelect: (section: string) => void;
  onSkip: () => void;
}

function SectionPicker({ courseId, sections, onSelect, onSkip }: SectionPickerProps) {
  const courseName = courseId.toUpperCase();

  // Build section display names
  const sectionDisplayNames: Record<string, string> = {
    FAR: 'Financial Accounting & Reporting',
    AUD: 'Auditing & Attestation',
    REG: 'Regulation',
    SEE1: 'Part 1: Individuals',
    SEE2: 'Part 2: Businesses',
    SEE3: 'Part 3: Representation',
    CMA1: 'Part 1: Financial Planning & Analysis',
    CMA2: 'Part 2: Strategic Financial Management',
    CIA1: 'Part 1: Essentials of Internal Auditing',
    CIA2: 'Part 2: Practice of Internal Auditing',
    CIA3: 'Part 3: Business Knowledge',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <Brain className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {courseName} Diagnostic Quiz
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Choose a section to assess. 25 questions, ~35 minutes.
            <br />
            This helps us personalize your study plan.
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => onSelect(section)}
              className="w-full text-left p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400">
                    {section}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {sectionDisplayNames[section] || section}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onSkip}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline underline-offset-2 transition-colors"
          >
            Skip diagnostic — go to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Intro Screen
// ============================================
function QuizIntro({
  quiz,
  onStart,
  onSkip,
}: {
  quiz: DiagnosticQuizType;
  onStart: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-5">
          <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {quiz.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {quiz.description}
        </p>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 mb-6 text-left">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>{quiz.questions.length} multiple-choice questions</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>{quiz.timeLimit} minute time limit</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Target className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>Identifies your strengths and weak areas</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Sparkles className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>Results feed your personalized study plan</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="primary" size="lg" fullWidth onClick={onStart} rightIcon={ArrowRight}>
            Start Quiz
          </Button>
          <button
            onClick={onSkip}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline underline-offset-2 transition-colors"
          >
            Skip — I'll take it later
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Main DiagnosticQuiz Page
// ============================================
type Phase = 'section-pick' | 'intro' | 'quiz' | 'results';

export default function DiagnosticQuizPage() {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const { courseId } = useCourse();

  const isSingleExam = SINGLE_EXAM_COURSES.includes(courseId);
  const availableSections = useMemo(() => getAvailableSections(courseId), [courseId]);

  // Use the section already chosen during onboarding (if available and valid)
  const onboardingSection = userProfile?.examSection || '';
  const hasValidOnboardingSection = !!onboardingSection && availableSections.includes(onboardingSection);

  // State — skip section picker if we already have a valid section from onboarding
  const [phase, setPhase] = useState<Phase>(
    isSingleExam || hasValidOnboardingSection ? 'intro' : 'section-pick'
  );
  const [selectedSection, setSelectedSection] = useState<string>(
    isSingleExam ? availableSections[0] || '' : hasValidOnboardingSection ? onboardingSection : ''
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  // Fix race condition: userProfile may not be loaded when component first mounts,
  // so useState captured 'section-pick'. Once profile loads with a valid examSection,
  // automatically advance to 'intro' phase.
  useEffect(() => {
    if (phase === 'section-pick' && hasValidOnboardingSection) {
      setSelectedSection(onboardingSection);
      setPhase('intro');
    }
  }, [phase, hasValidOnboardingSection, onboardingSection]);

  const quiz = useMemo(
    () => (selectedSection ? getQuizForSection(courseId, selectedSection) : null),
    [courseId, selectedSection]
  );

  // Timer
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (phase === 'quiz' && quiz) {
      setTimeRemaining(quiz.timeLimit * 60);
      setStartTime(Date.now());
      setAnswers(new Array(quiz.questions.length).fill(null));
      setCurrentQuestion(0);
    }
  }, [phase, quiz]);

  useEffect(() => {
    if (phase !== 'quiz') return;

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up — auto-submit
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (phase === 'quiz' && timeRemaining === 0 && quiz) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining]);

  // Navigation
  const goToDashboard = useCallback(() => {
    const path = getCourseHomePath(courseId);
    navigate(path, { replace: true });
  }, [courseId, navigate]);

  // Quiz handlers
  const handleSelectAnswer = useCallback((answerIdx: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQuestion] = answerIdx;
      return next;
    });
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((c) => c + 1);
    }
  }, [currentQuestion, quiz]);

  const handlePrev = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((c) => c - 1);
    }
  }, [currentQuestion]);

  const handleJump = useCallback((idx: number) => {
    setCurrentQuestion(idx);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!quiz || !user) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const areaNames = ALL_AREA_NAMES[courseId] || {};
    const scored = scoreDiagnosticQuiz(quiz, answers, timeSpent, areaNames);

    setResult(scored);
    setPhase('results');

    // Save to Firestore
    try {
      const docId = `${courseId}-${selectedSection}`;
      await setDoc(
        doc(db, 'users', user.uid, 'diagnosticResults', docId),
        {
          ...scored,
          completedAt: new Date(),
          courseId,
          section: selectedSection,
        }
      );

      trackEvent('diagnostic_completed', {
        course: courseId,
        section: selectedSection,
        score: scored.percentage,
        passed: scored.passed,
        time_spent: timeSpent,
      });

      logger.info('Diagnostic results saved', { courseId, section: selectedSection, score: scored.percentage });
    } catch (err) {
      logger.error('Failed to save diagnostic results:', err);
    }
  }, [quiz, user, startTime, courseId, answers, selectedSection]);

  const handleRetake = useCallback(() => {
    setResult(null);
    setPhase('intro');
  }, []);

  // Confirm exit dialog
  const handleExit = useCallback(() => {
    if (phase === 'quiz') {
      const answered = answers.filter((a) => a !== null).length;
      if (answered > 0) {
        const ok = window.confirm(
          `You've answered ${answered}/${quiz?.questions.length || 0} questions. Exit without saving?`
        );
        if (!ok) return;
      }
    }
    goToDashboard();
  }, [phase, answers, quiz, goToDashboard]);

  // ============================================
  // Render
  // ============================================

  // Phase: Section Picker (multi-section courses)
  if (phase === 'section-pick') {
    return (
      <SectionPicker
        courseId={courseId}
        sections={availableSections}
        onSelect={(section) => {
          setSelectedSection(section);
          setPhase('intro');
        }}
        onSkip={goToDashboard}
      />
    );
  }

  // Phase: Intro
  if (phase === 'intro' && quiz) {
    return (
      <QuizIntro
        quiz={quiz}
        onStart={() => setPhase('quiz')}
        onSkip={goToDashboard}
      />
    );
  }

  // Phase: Results
  if (phase === 'results' && result && quiz) {
    return (
      <DiagnosticResults
        result={result}
        quiz={quiz}
        answers={answers}
        onContinue={goToDashboard}
        onRetake={handleRetake}
      />
    );
  }

  // Phase: Quiz
  if (phase === 'quiz' && quiz) {
    const q = quiz.questions[currentQuestion];
    const answeredCount = answers.filter((a) => a !== null).length;
    const allAnswered = answeredCount === quiz.questions.length;
    const isLastQuestion = currentQuestion === quiz.questions.length - 1;
    const isTimeWarning = timeRemaining <= 120; // 2 minute warning

    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
        {/* Top Bar */}
        <header className="border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button
              onClick={handleExit}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Exit</span>
            </button>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {quiz.title}
            </div>
            <Timer seconds={timeRemaining} isWarning={isTimeWarning} />
          </div>
          <div className="max-w-3xl mx-auto mt-3">
            <ProgressBar current={currentQuestion} total={quiz.questions.length} answers={answers} />
          </div>
        </header>

        {/* Question */}
        <main className="flex-1 px-4 py-8">
          <QuestionCard
            questionNum={currentQuestion + 1}
            totalQuestions={quiz.questions.length}
            question={q.question}
            options={q.options}
            selectedAnswer={answers[currentQuestion]}
            onSelect={handleSelectAnswer}
          />
        </main>

        {/* Bottom Bar */}
        <footer className="border-t border-gray-200 dark:border-gray-800 px-4 py-4">
          <div className="max-w-3xl mx-auto">
            {/* Question Navigator */}
            <div className="mb-4">
              <QuestionNavigator
                total={quiz.questions.length}
                current={currentQuestion}
                answers={answers}
                onJump={handleJump}
              />
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                leftIcon={ChevronLeft}
              >
                Previous
              </Button>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                {answeredCount}/{quiz.questions.length} answered
              </div>

              {isLastQuestion || allAnswered ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={answeredCount === 0}
                  rightIcon={CheckCircle}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  rightIcon={ChevronRight}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Fallback — should not happen
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          No diagnostic quiz available for this course.
        </p>
        <Button variant="primary" onClick={goToDashboard}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
