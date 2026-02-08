/**
 * CMA Exam Simulator Component
 * 
 * Full-featured exam simulation for IMA Certified Management Accountant (CMA)
 * - Part 1: Financial Planning, Performance, and Analytics (100 questions, 4 hours)
 * - Part 2: Strategic Financial Management (100 questions, 4 hours)
 * 
 * Uses the CMA mock exam generator for blueprint-weighted question selection
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Flag,
  Trophy,
  Target,
  BookOpen,
  ArrowLeft,
  BarChart3,
  Sparkles,
  Play,
  AlertCircle,
  ClipboardCheck,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../common/Card';
import clsx from 'clsx';
import { Question, CMASection } from '../../types';
import { 
  CMA_PART1_QUESTIONS, 
  CMA_PART2_QUESTIONS 
} from '../../data/cma/questions';
import {
  generateCMAMockExam,
  calculateCMAExamResult,
  GeneratedCMAMockExam,
  CMAMockExamResult,
  getCMAMockExamsBySection,
  CMAMockExamConfig,
} from '../../data/cma/mock-exams';
import logger from '../../utils/logger';
import feedback from '../../services/feedback';

// ============================================
// Types
// ============================================

type ExamState = 'setup' | 'running' | 'paused' | 'review' | 'results';

interface ExamMode {
  id: string;
  name: string;
  questionCount: number;
  timeMinutes: number;
  description: string;
}

// ============================================
// Constants
// ============================================

const CMA_SECTION_INFO: Record<CMASection, { name: string; description: string }> = {
  CMA1: {
    name: 'Part 1: Financial Planning, Performance, and Analytics',
    description: 'External reporting, budgeting, performance management, cost management, internal controls, and analytics',
  },
  CMA2: {
    name: 'Part 2: Strategic Financial Management',
    description: 'Financial analysis, corporate finance, decision analysis, risk management, investments, and ethics',
  },
};

const EXAM_MODES: ExamMode[] = [
  { id: 'full', name: 'Full Exam', questionCount: 100, timeMinutes: 240, description: 'Complete 100-question exam simulation (4 hours)' },
  { id: 'half', name: 'Half Exam', questionCount: 50, timeMinutes: 120, description: '50-question practice exam (2 hours)' },
  { id: 'quarter', name: 'Quick Practice', questionCount: 25, timeMinutes: 60, description: '25-question mini exam (1 hour)' },
  { id: 'mini', name: 'Mini Quiz', questionCount: 10, timeMinutes: 24, description: '10-question rapid review (24 minutes)' },
];

// ============================================
// Question Pool Helpers
// ============================================

function getQuestionPoolForSection(section: CMASection): Question[] {
  switch (section) {
    case 'CMA1':
      return CMA_PART1_QUESTIONS;
    case 'CMA2':
      return CMA_PART2_QUESTIONS;
    default:
      return [];
  }
}

// ============================================
// Component
// ============================================

const CMAExamSimulator: React.FC = () => {
  const navigate = useNavigate();
  useSearchParams(); // For potential future use
  useAuth(); // For potential future user tracking

  // Setup state
  const [selectedSection, setSelectedSection] = useState<CMASection>('CMA1');
  const [selectedMode, setSelectedMode] = useState<ExamMode>(EXAM_MODES[1]); // Default to half exam
  const [examState, setExamState] = useState<ExamState>('setup');

  // Exam state
  const [exam, setExam] = useState<GeneratedCMAMockExam | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [_selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Results state
  const [examResult, setExamResult] = useState<CMAMockExamResult | null>(null);

  // Refs
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  // Computed values
  const currentQuestion = useMemo(() => {
    if (!exam || currentIndex >= exam.questions.length) return null;
    return exam.questions[currentIndex];
  }, [exam, currentIndex]);

  const answeredCount = useMemo(() => {
    if (!exam) return 0;
    return Object.keys(exam.answers).length;
  }, [exam?.answers]);

  const flaggedCount = useMemo(() => {
    if (!exam) return 0;
    return exam.flagged.size;
  }, [exam?.flagged]);

  // ============================================
  // Timer Management
  // ============================================

  useEffect(() => {
    if (examState === 'running' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up - submit exam
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [examState]);

  // ============================================
  // Exam Controls
  // ============================================

  const startExam = useCallback(() => {
    const questionPool = getQuestionPoolForSection(selectedSection);
    
    if (questionPool.length < selectedMode.questionCount) {
      logger.warn(`Not enough questions. Need ${selectedMode.questionCount}, have ${questionPool.length}`);
      return;
    }

    // Create a custom config based on mode
    const configs = getCMAMockExamsBySection(selectedSection);
    const baseConfig = configs[0];
    
    const customConfig: CMAMockExamConfig = {
      ...baseConfig,
      id: `${selectedSection}-${selectedMode.id}-${Date.now()}`,
      questionCount: selectedMode.questionCount,
      totalTime: selectedMode.timeMinutes * 60,
    };

    // Generate exam
    const generatedExam = generateCMAMockExam(customConfig.id, questionPool as (Question & { section: CMASection })[]);
    
    if (!generatedExam) {
      logger.error('Failed to generate exam');
      return;
    }

    // Override with custom config
    generatedExam.config = customConfig;
    generatedExam.questions = generatedExam.questions.slice(0, selectedMode.questionCount);
    generatedExam.questionOrder = generatedExam.questions.map(q => q.id);
    generatedExam.timeRemaining = selectedMode.timeMinutes * 60;

    setExam(generatedExam);
    setTimeRemaining(selectedMode.timeMinutes * 60);
    setStartTime(new Date());
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setExamState('running');
    
    feedback.click();
  }, [selectedSection, selectedMode]);

  const handleSelectAnswer = useCallback((answerIndex: number) => {
    if (!exam || !currentQuestion) return;
    
    setSelectedAnswer(answerIndex);
    setExam(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: String(answerIndex),
        },
      };
    });
    
    feedback.tap();
  }, [exam, currentQuestion]);

  const handleToggleFlag = useCallback(() => {
    if (!exam || !currentQuestion) return;
    
    setExam(prev => {
      if (!prev) return prev;
      const newFlagged = new Set(prev.flagged);
      if (newFlagged.has(currentQuestion.id)) {
        newFlagged.delete(currentQuestion.id);
      } else {
        newFlagged.add(currentQuestion.id);
      }
      return {
        ...prev,
        flagged: newFlagged,
      };
    });
    
    feedback.tap();
  }, [exam, currentQuestion]);

  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    if (!exam) return;
    
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if (direction === 'next' && currentIndex < exam.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    
    setSelectedAnswer(null);
    questionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    feedback.tap();
  }, [exam, currentIndex]);

  const handleJumpToQuestion = useCallback((index: number) => {
    setCurrentIndex(index);
    setSelectedAnswer(null);
    questionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    feedback.tap();
  }, []);

  const handleSubmitExam = useCallback(() => {
    if (!exam || !startTime) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const endTime = new Date();
    const result = calculateCMAExamResult(exam, startTime, endTime);
    
    setExamResult(result);
    setExamState('results');
    
    if (result.passed) {
      feedback.complete();
    } else {
      feedback.incorrect();
    }
  }, [exam, startTime]);

  const handleReviewExam = useCallback(() => {
    setExamState('review');
    setCurrentIndex(0);
  }, []);

  const handleReturnToSetup = useCallback(() => {
    setExam(null);
    setExamResult(null);
    setExamState('setup');
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTimeRemaining(0);
    setStartTime(null);
  }, []);

  // ============================================
  // Format Helpers
  // ============================================

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ============================================
  // Render: Setup Screen
  // ============================================

  if (examState === 'setup') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <ClipboardCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  CMA Exam Simulator
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Practice with realistic exam conditions for the IMA Certified Management Accountant exam
              </p>
            </div>
          </div>

          {/* Section Selection */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Exam Part
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.entries(CMA_SECTION_INFO) as [CMASection, typeof CMA_SECTION_INFO[CMASection]][]).map(([section, info]) => (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={clsx(
                    'p-4 rounded-lg border-2 text-left transition-all',
                    selectedSection === section
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600'
                  )}
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {info.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {info.description}
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                    {getQuestionPoolForSection(section).length} questions available
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Mode Selection */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Exam Mode
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXAM_MODES.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode)}
                  className={clsx(
                    'p-4 rounded-lg border-2 text-left transition-all',
                    selectedMode.id === mode.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600'
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {mode.name}
                    </h3>
                    <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {mode.questionCount} Q
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {mode.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{mode.timeMinutes} minutes</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={startExam}
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5" />
              Start Exam
            </button>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              {selectedMode.questionCount} questions • {formatTime(selectedMode.timeMinutes * 60)} time limit
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // Render: Results Screen
  // ============================================

  if (examState === 'results' && examResult) {
    const scorePercentage = Math.round((examResult.correctAnswers / examResult.totalQuestions) * 100);
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            {examResult.passed ? (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <Trophy className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {examResult.passed ? 'Congratulations!' : 'Keep Practicing'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {examResult.passed 
                ? 'You achieved a passing score on this practice exam!'
                : 'You need a bit more study to reach the passing score.'}
            </p>
          </div>

          {/* Score Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 text-center">
              <div className={clsx(
                'text-4xl font-bold mb-2',
                examResult.passed 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              )}>
                {scorePercentage}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Raw Score</div>
            </Card>
            
            <Card className="p-6 text-center">
              <div className={clsx(
                'text-4xl font-bold mb-2',
                examResult.passed 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              )}>
                {examResult.scaledScore}/500
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Scaled Score (pass: 360)</div>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {examResult.correctAnswers}/{examResult.totalQuestions}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Correct Answers</div>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {formatTime(examResult.timeUsed)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Time Used</div>
            </Card>
          </div>

          {/* Blueprint Performance */}
          <Card className="p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance by Blueprint Area
            </h2>
            <div className="space-y-3">
              {examResult.byBlueprint.map(area => (
                <div key={area.area}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{area.name}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {area.correct}/{area.total} ({area.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={clsx(
                        'h-full rounded-full transition-all',
                        area.percentage >= 70 ? 'bg-green-500' : 
                        area.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      )}
                      style={{ width: `${area.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Difficulty Performance */}
          <Card className="p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Performance by Difficulty
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {(['easy', 'medium', 'hard'] as const).map(diff => {
                const data = examResult.byDifficulty[diff];
                return (
                  <div key={diff} className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {data.percentage}%
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {diff} ({data.correct}/{data.total})
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleReviewExam}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Review Answers
            </button>
            <button
              onClick={handleReturnToSetup}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Take Another Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // Render: Running/Review Exam
  // ============================================

  if (!exam || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No exam loaded</p>
          <button
            onClick={handleReturnToSetup}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Return to Setup
          </button>
        </div>
      </div>
    );
  }

  const isFlagged = exam.flagged.has(currentQuestion.id);
  const currentAnswer = exam.answers[currentQuestion.id];
  const isReview = examState === 'review';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (isReview) {
                  setExamState('results');
                } else if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
                  handleReturnToSetup();
                }
              }}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{isReview ? 'Back to Results' : 'Exit'}</span>
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {CMA_SECTION_INFO[selectedSection].name}
            </div>
          </div>

          {/* Timer */}
          {!isReview && (
            <div className={clsx(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono',
              timeRemaining < 300 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            )}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          )}

          {/* Progress */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentIndex + 1} / {exam.questions.length}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-500">
              ({answeredCount} answered)
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <Card 
              ref={questionRef}
              className="p-6"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                    Question {currentIndex + 1}
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className={clsx(
                      'px-1.5 py-0.5 rounded',
                      currentQuestion.difficulty === 'easy' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                      currentQuestion.difficulty === 'medium' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
                      currentQuestion.difficulty === 'hard' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                    )}>
                      {currentQuestion.difficulty}
                    </span>
                    <span>•</span>
                    <span>{currentQuestion.topic}</span>
                  </div>
                </div>
                <button
                  onClick={handleToggleFlag}
                  className={clsx(
                    'p-2 rounded-lg transition-colors',
                    isFlagged
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-amber-500'
                  )}
                >
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              {/* Question Text */}
              <div className="text-lg text-gray-900 dark:text-white mb-6 leading-relaxed">
                {currentQuestion.question}
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = currentAnswer === String(index);
                  const isCorrect = index === currentQuestion.correctAnswer;
                  
                  // Review mode styling
                  let reviewClass = '';
                  if (isReview) {
                    if (isCorrect) {
                      reviewClass = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                    } else if (isSelected && !isCorrect) {
                      reviewClass = 'border-red-500 bg-red-50 dark:bg-red-900/20';
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => !isReview && handleSelectAnswer(index)}
                      disabled={isReview}
                      className={clsx(
                        'w-full flex items-start gap-3 p-4 rounded-lg border-2 text-left transition-all',
                        isReview 
                          ? reviewClass || 'border-gray-200 dark:border-gray-700'
                          : isSelected
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600'
                      )}
                    >
                      <span className={clsx(
                        'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium',
                        isReview && isCorrect
                          ? 'bg-green-500 text-white'
                          : isReview && isSelected && !isCorrect
                            ? 'bg-red-500 text-white'
                            : isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      )}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {option}
                      </span>
                      {isReview && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
                      )}
                      {isReview && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-500 ml-auto flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Review Mode) */}
              {isReview && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    Explanation
                  </h4>
                  <p className="text-blue-700 dark:text-blue-200 text-sm">
                    {currentQuestion.explanation}
                  </p>
                  {currentQuestion.reference && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                      Reference: {currentQuestion.reference}
                    </p>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleNavigate('prev')}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                {!isReview && currentIndex === exam.questions.length - 1 ? (
                  <button
                    onClick={() => {
                      if (answeredCount < exam.questions.length) {
                        if (confirm(`You have ${exam.questions.length - answeredCount} unanswered questions. Submit anyway?`)) {
                          handleSubmitExam();
                        }
                      } else {
                        handleSubmitExam();
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Submit Exam
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavigate('next')}
                    disabled={currentIndex === exam.questions.length - 1}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </Card>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-20">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Question Navigator
              </h3>
              
              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-emerald-500" />
                  Answered: {answeredCount}
                </span>
                <span className="flex items-center gap-1">
                  <Flag className="w-3 h-3 text-amber-500" />
                  Flagged: {flaggedCount}
                </span>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((q, index) => {
                  const isCurrentQ = index === currentIndex;
                  const isAnswered = exam.answers[q.id] !== undefined;
                  const isFlaggedQ = exam.flagged.has(q.id);
                  
                  // Review mode - show correct/incorrect
                  let reviewBg = '';
                  if (isReview && examResult) {
                    const review = examResult.reviewQuestions.find(rq => rq.questionId === q.id);
                    if (review) {
                      reviewBg = review.isCorrect 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white';
                    }
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpToQuestion(index)}
                      className={clsx(
                        'relative w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-all',
                        isReview && reviewBg
                          ? reviewBg
                          : isCurrentQ
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                            : isAnswered
                              ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      )}
                    >
                      {index + 1}
                      {isFlaggedQ && !isReview && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit Button (non-review) */}
              {!isReview && (
                <button
                  onClick={() => {
                    if (answeredCount < exam.questions.length) {
                      if (confirm(`You have ${exam.questions.length - answeredCount} unanswered questions. Submit anyway?`)) {
                        handleSubmitExam();
                      }
                    } else {
                      handleSubmitExam();
                    }
                  }}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  Submit Exam
                </button>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMAExamSimulator;
