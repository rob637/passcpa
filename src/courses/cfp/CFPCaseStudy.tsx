/**
 * CFP Case Study Simulator
 *
 * Full-featured case study practice tool using real data from src/data/cfp/case-studies/
 * Features:
 * - Selection view with domain filtering and completion indicators
 * - Read-first scenario view → questions view
 * - Split-panel (scenario + questions) on desktop, tabbed on mobile
 * - Countdown timer matching CBQ/TBS pattern
 * - Completion tracking via Firestore (case_study_history)
 * - Score indicators (checkmark for mastered ≥75%, percentage for attempted)
 * - Full results review with explanations
 * - GFM markdown support with styled tables
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  ChevronLeft,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Trophy,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { CaseStudy } from '../../types';
import { CFP_CASE_STUDIES } from '../../data/cfp/case-studies';
import { useAuth } from '../../hooks/useAuth';
import {
  recordCaseStudyResult,
  getCaseStudyHistory,
} from '../../services/questionHistoryService';
import type { CaseStudyHistoryEntry } from '../../services/questionHistoryService';

// ============================================
// Constants
// ============================================

const DOMAIN_LABELS: Record<string, string> = {
  ALL: 'All Domains',
  RET: 'Retirement',
  TAX: 'Tax Planning',
  INV: 'Investments',
  EST: 'Estate Planning',
  RISK: 'Risk Management',
  GEN: 'General Principles',
  PRO: 'Professional Conduct',
};

const DOMAIN_KEYS = ['ALL', 'RET', 'TAX', 'INV', 'EST', 'RISK', 'GEN'] as const;

type ViewState = 'select' | 'scenario' | 'questions' | 'results';

// Styled markdown components for tables and formatting (matches CBQ simulator)
const markdownComponents = {
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-slate-300 dark:border-slate-600 text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-slate-100 dark:bg-slate-700">{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-slate-700 dark:text-slate-300">
      {children}
    </td>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => (
    <tr className="even:bg-slate-50 dark:even:bg-slate-800/50">{children}</tr>
  ),
};

// Format timer display
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// ============================================
// Main Component
// ============================================

export default function CFPCaseStudy() {
  const { user } = useAuth();

  // State
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [currentCase, setCurrentCase] = useState<CaseStudy | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [viewState, setViewState] = useState<ViewState>('select');
  const [startTime, setStartTime] = useState<number>(0);
  const [caseHistory, setCaseHistory] = useState<Map<string, CaseStudyHistoryEntry>>(new Map());
  const [activeTab, setActiveTab] = useState<'scenario' | 'questions'>('scenario');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Filter case studies by domain
  const filteredCases =
    selectedDomain === 'ALL'
      ? CFP_CASE_STUDIES
      : CFP_CASE_STUDIES.filter((cs) => cs.domains.includes(selectedDomain));

  // Load history when returning to selection view
  useEffect(() => {
    if (viewState !== 'select' || !user?.uid) return;
    const loadHistory = async () => {
      const history = await getCaseStudyHistory(user.uid);
      setCaseHistory(new Map(history.map((h) => [h.caseStudyId, h])));
    };
    loadHistory();
  }, [viewState, user?.uid]);

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  // Start a case study
  const handleStartCase = (cs: CaseStudy) => {
    setCurrentCase(cs);
    setCurrentQuestionIdx(0);
    setAnswers(new Map());
    setStartTime(Date.now());
    setTimeLeft(cs.estimatedTime * 60);
    setIsTimerRunning(true);
    setViewState('scenario');
    setActiveTab('scenario');
    window.scrollTo(0, 0);
  };

  // Submit all answers and record result
  const handleSubmit = useCallback(async () => {
    if (!currentCase) return;
    setIsTimerRunning(false);
    setViewState('results');

    if (user?.uid) {
      const correct = currentCase.questions.filter(
        (q) => answers.get(q.id) === q.correctOptionId
      ).length;
      const total = currentCase.questions.length;
      const scorePercent = total > 0 ? Math.round((correct / total) * 100) : 0;
      const timeSpent = (currentCase.estimatedTime * 60) - timeLeft;
      await recordCaseStudyResult(user.uid, currentCase.id, scorePercent, timeSpent);
    }
  }, [currentCase, answers, user?.uid, startTime]);

  // Calculate score for results view
  const getResults = () => {
    if (!currentCase) return { correct: 0, total: 0, percent: 0 };
    const correct = currentCase.questions.filter(
      (q) => answers.get(q.id) === q.correctOptionId
    ).length;
    const total = currentCase.questions.length;
    return { correct, total, percent: total > 0 ? Math.round((correct / total) * 100) : 0 };
  };

  const results = getResults();
  const currentQuestion = currentCase?.questions[currentQuestionIdx];
  const allAnswered = currentCase
    ? currentCase.questions.every((q) => answers.has(q.id))
    : false;

  // ============================================
  // Selection View
  // ============================================
  if (viewState === 'select') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 pb-12">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/cfp/dashboard">
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Case Study Workshop</h1>
          </div>
          <p className="text-green-100">
            Practice comprehensive financial planning scenarios
          </p>

          {/* Domain Filter */}
          <div className="mt-4 flex gap-2 flex-wrap">
            {DOMAIN_KEYS.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg font-medium transition-colors text-sm',
                  selectedDomain === domain
                    ? 'bg-white text-green-700'
                    : 'bg-white/20 text-white hover:bg-white/30'
                )}
              >
                {DOMAIN_LABELS[domain] || domain}
              </button>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="px-4 mt-4 mb-6">
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800 dark:text-green-200">
                  <p className="font-medium mb-1">About CFP Case Studies</p>
                  <ul className="list-disc list-inside space-y-1 text-green-700 dark:text-green-300">
                    <li>Comprehensive client scenarios with 4-8 questions each</li>
                    <li>Tests integrated financial planning knowledge across domains</li>
                    <li>Mirrors CFP Board exam item set format</li>
                    <li>15-30 minutes per case study recommended</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Case Study List */}
        <div className="px-4 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            {selectedDomain === 'ALL' ? 'All' : DOMAIN_LABELS[selectedDomain]} Case Studies
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">
              ({filteredCases.length})
            </span>
          </h2>

          {filteredCases.length === 0 ? (
            <Card className="p-6 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-slate-400 mb-3" />
              <p className="text-slate-600 dark:text-slate-400">
                No case studies match this domain filter.
              </p>
            </Card>
          ) : (
            filteredCases.map((cs) => {
              const history = caseHistory.get(cs.id);
              const isCompleted = history?.mastered;
              const hasAttempted = history && history.attempts > 0;

              return (
                <Card
                  key={cs.id}
                  className={clsx(
                    'overflow-hidden',
                    isCompleted && 'ring-2 ring-green-400 dark:ring-green-600'
                  )}
                >
                  <button
                    onClick={() => handleStartCase(cs)}
                    className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {cs.title}
                          </h3>
                          {isCompleted && (
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          )}
                          {hasAttempted && !isCompleted && (
                            <span className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 rounded text-xs font-medium text-amber-700 dark:text-amber-300">
                              {history.bestScore}%
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {cs.estimatedTime} min
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            {cs.questions.length} questions
                          </span>
                          <span
                            className={clsx(
                              'px-2 py-0.5 rounded-full text-xs font-medium',
                              cs.difficulty === 'easy' &&
                                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                              cs.difficulty === 'medium' &&
                                'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
                              cs.difficulty === 'hard' &&
                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                            )}
                          >
                            {cs.difficulty.charAt(0).toUpperCase() + cs.difficulty.slice(1)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {cs.domains.map((domain) => (
                            <span
                              key={domain}
                              className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 rounded text-xs font-medium text-green-700 dark:text-green-300"
                            >
                              {DOMAIN_LABELS[domain] || domain}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2 mt-1" />
                    </div>
                  </button>
                </Card>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // ============================================
  // Scenario View (Read scenario before questions)
  // ============================================
  if (viewState === 'scenario' && currentCase) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
          <div className="p-4 flex items-center justify-between">
            <button
              onClick={() => { setViewState('select'); setIsTimerRunning(false); }}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Scenario Content */}
        <div className="p-4 max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            {currentCase.title}
          </h1>

          <Card className="mb-6">
            <div className="p-6 prose dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {currentCase.scenario}
              </ReactMarkdown>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button
              variant="primary"
              onClick={() => setViewState('questions')}
              rightIcon={ChevronRight}
              className="px-8"
            >
              Start Questions ({currentCase.questions.length} questions)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // Questions View (Split-panel on desktop, tabbed on mobile)
  // ============================================
  if (viewState === 'questions' && currentCase) {
    const answeredCount = currentCase.questions.filter((q) => answers.has(q.id)).length;

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setViewState('scenario')}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm">View Scenario</span>
              </button>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {answeredCount}/{currentCase.questions.length} answered
                </span>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Clock className="w-5 h-5" />
                  <span className="font-mono">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2">
              {currentCase.questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIdx(idx)}
                  className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                    idx === currentQuestionIdx && 'bg-green-600 text-white',
                    idx !== currentQuestionIdx && answers.has(q.id) &&
                      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
                    idx !== currentQuestionIdx && !answers.has(q.id) &&
                      'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile tab switcher */}
          <div className="flex gap-1 px-4 pb-3 lg:hidden">
            <Button
              variant={activeTab === 'scenario' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveTab('scenario')}
            >
              Scenario
            </Button>
            <Button
              variant={activeTab === 'questions' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveTab('questions')}
            >
              Questions
            </Button>
          </div>
        </div>

        {/* Split Panel */}
        <div
          className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4"
          style={{ height: 'calc(100vh - 120px)' }}
        >
          {/* Left: Scenario */}
          <div
            className={clsx(
              'flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden',
              activeTab === 'questions' ? 'hidden lg:flex' : 'flex'
            )}
          >
            <div className="p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-green-600" />
                Case Scenario
              </h3>
            </div>
            <div className="p-4 overflow-y-auto flex-1 prose dark:prose-invert max-w-none prose-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {currentCase.scenario}
              </ReactMarkdown>
            </div>
          </div>

          {/* Right: Questions */}
          <div
            className={clsx(
              'flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden',
              activeTab === 'scenario' ? 'hidden lg:flex' : 'flex'
            )}
          >
            <div className="p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                Question {currentQuestionIdx + 1} of {currentCase.questions.length}
              </h3>
              {currentQuestion && (
                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 rounded text-xs font-medium text-green-700 dark:text-green-300">
                  {DOMAIN_LABELS[currentQuestion.domain] || currentQuestion.domain}
                </span>
              )}
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              {currentQuestion && (
                <>
                  <p className="font-medium text-slate-900 dark:text-white leading-relaxed">
                    {currentQuestion.question}
                  </p>

                  <div className="space-y-2">
                    {currentQuestion.options.map((opt) => {
                      const selected = answers.get(currentQuestion.id) === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            const newAnswers = new Map(answers);
                            newAnswers.set(currentQuestion.id, opt.id);
                            setAnswers(newAnswers);
                          }}
                          className={clsx(
                            'w-full text-left p-4 rounded-xl border-2 transition-all text-sm',
                            selected
                              ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                          )}
                        >
                          <span className="font-semibold mr-2">{opt.id}.</span>
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Navigation */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
                disabled={currentQuestionIdx === 0}
                leftIcon={ChevronLeft}
              >
                Previous
              </Button>

              {currentQuestionIdx < currentCase.questions.length - 1 ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                  rightIcon={ChevronRight}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  rightIcon={CheckCircle}
                  className="bg-green-700 hover:bg-green-800"
                >
                  Submit All
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // Results View
  // ============================================
  if (viewState === 'results' && currentCase) {
    const timeSpent = (currentCase.estimatedTime * 60) - timeLeft;

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">
        {/* Score Header */}
        <div
          className={clsx(
            'p-6 pb-12',
            results.percent >= 75
              ? 'bg-gradient-to-br from-green-600 to-green-700'
              : 'bg-gradient-to-br from-amber-600 to-amber-700'
          )}
        >
          <div className="text-center text-white">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">
              {results.percent >= 75 ? 'Great Job!' : 'Keep Practicing!'}
            </h1>
            <p className="text-2xl font-bold">
              {results.correct} / {results.total} correct ({results.percent}%)
            </p>
            <p className="text-sm opacity-80 mt-2">
              Time spent: {formatTime(timeSpent)}
            </p>
          </div>
        </div>

        {/* Question Review */}
        <div className="p-4 max-w-3xl mx-auto -mt-6">
          <Card className="mb-6">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-semibold text-slate-900 dark:text-white">Question Review</h2>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {currentCase.questions.map((question, idx) => {
                const userAnswer = answers.get(question.id);
                const isCorrect = userAnswer === question.correctOptionId;
                const userOption = question.options.find((o) => o.id === userAnswer);
                const correctOption = question.options.find(
                  (o) => o.id === question.correctOptionId
                );

                return (
                  <div key={question.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={clsx(
                          'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                          isCorrect
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : 'bg-red-100 dark:bg-red-900/30'
                        )}
                      >
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white mb-1 text-sm">
                          Q{idx + 1}: {question.question}
                        </p>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-2 space-y-0.5">
                          <p>
                            Your answer: {userOption ? `${userOption.id}) ${userOption.text}` : 'Not answered'}
                          </p>
                          {!isCorrect && correctOption && (
                            <p className="text-green-600 dark:text-green-400">
                              Correct: {correctOption.id}) {correctOption.text}
                            </p>
                          )}
                          <span className="inline-block mt-1 px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 rounded text-green-700 dark:text-green-300">
                            {DOMAIN_LABELS[question.domain] || question.domain}
                          </span>
                        </div>
                        <div className="text-sm p-3 bg-slate-50 dark:bg-slate-800 rounded-lg prose dark:prose-invert max-w-none prose-sm">
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                            {question.explanation}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Scoring Guide */}
          {currentCase.scoringGuide && (
            <Card className="mb-6">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="font-semibold text-slate-900 dark:text-white">Scoring Guide</h2>
              </div>
              <div className="p-4 prose dark:prose-invert max-w-none prose-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {currentCase.scoringGuide}
                </ReactMarkdown>
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              onClick={() => handleStartCase(currentCase)}
              leftIcon={RotateCcw}
              className="flex-1"
            >
              Try Again
            </Button>
            <Button
              variant="secondary"
              onClick={() => setViewState('select')}
              className="flex-1"
            >
              Choose Another Case
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
