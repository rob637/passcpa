/**
 * CIA Exam Simulator Component
 * 
 * Full-featured exam simulation for IIA Certified Internal Auditor (CIA)
 * - Part 1: Essentials of Internal Auditing (125 questions, 2.5 hours)
 * - Part 2: Practice of Internal Auditing (100 questions, 2 hours)
 * - Part 3: Business Knowledge for Internal Auditing (100 questions, 2 hours)
 * 
 * Uses blueprint-weighted question selection for realistic exam experience
 */

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
import clsx from 'clsx';
import { Question } from '../../types';
import { CIASectionId } from '../../courses/cia/config';
import { 
  CIA1_QUESTIONS, 
  CIA2_QUESTIONS, 
  CIA3_QUESTIONS 
} from '../../data/cia/questions';
import {
  generateCIAMockExamFromConfig,
  calculateCIAExamResult,
  GeneratedCIAMockExam,
  CIAMockExamResult,
  getCIAMockExamsBySection,
  CIAMockExamConfig,
  CIA_BLUEPRINT_WEIGHTS,
} from '../../data/cia/mock-exams';
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

const CIA_SECTION_INFO: Record<CIASectionId, { name: string; description: string }> = {
  CIA1: {
    name: 'Part 1: Essentials of Internal Auditing',
    description: 'Foundations, independence, proficiency, QAIP, governance, risk, and control',
  },
  CIA2: {
    name: 'Part 2: Practice of Internal Auditing',
    description: 'Managing IA activity, planning, performing, and communicating results',
  },
  CIA3: {
    name: 'Part 3: Business Knowledge for Internal Auditing',
    description: 'Business acumen, information security, IT, and financial management',
  },
};

function getExamModes(section: CIASectionId): ExamMode[] {
  const isPartOne = section === 'CIA1';
  const fullCount = isPartOne ? 125 : 100;
  const fullTime = isPartOne ? 150 : 120;
  
  return [
    { id: 'full', name: 'Full Exam', questionCount: fullCount, timeMinutes: fullTime, description: `Complete ${fullCount}-question exam simulation (${fullTime / 60} hours)` },
    { id: 'half', name: 'Half Exam', questionCount: Math.round(fullCount / 2), timeMinutes: Math.round(fullTime / 2), description: `${Math.round(fullCount / 2)}-question practice exam` },
    { id: 'quarter', name: 'Quick Practice', questionCount: 25, timeMinutes: 30, description: '25-question mini exam (30 minutes)' },
    { id: 'mini', name: 'Mini Quiz', questionCount: 10, timeMinutes: 15, description: '10-question rapid review (15 minutes)' },
  ];
}

// ============================================
// Question Pool Helpers
// ============================================

function getQuestionPoolForSection(section: CIASectionId): Question[] {
  switch (section) {
    case 'CIA1':
      return CIA1_QUESTIONS as Question[];
    case 'CIA2':
      return CIA2_QUESTIONS as Question[];
    case 'CIA3':
      return CIA3_QUESTIONS as Question[];
    default:
      return [];
  }
}

// ============================================
// Component
// ============================================

const CIAExamSimulator: React.FC = () => {
  const navigate = useNavigate();
  useAuth();

  // Setup state
  const [selectedSection, setSelectedSection] = useState<CIASectionId>('CIA1');
  const examModes = useMemo(() => getExamModes(selectedSection), [selectedSection]);
  const [selectedMode, setSelectedMode] = useState<ExamMode>(examModes[2]); // Default to quick practice
  const [examState, setExamState] = useState<ExamState>('setup');

  // Exam state
  const [exam, setExam] = useState<GeneratedCIAMockExam | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [_selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  void _selectedAnswer; // Used for controlled input
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Results state
  const [examResult, setExamResult] = useState<CIAMockExamResult | null>(null);

  // Refs
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  // Update mode when section changes
  useEffect(() => {
    setSelectedMode(examModes[2]); // Reset to quick practice
  }, [selectedSection, examModes]);

  // Computed values
  const currentQuestion = useMemo(() => {
    if (!exam || currentIndex >= exam.questions.length) return null;
    return exam.questions[currentIndex];
  }, [exam, currentIndex]);

  const answeredCount = useMemo(() => {
    if (!exam) return 0;
    return Object.keys(exam.answers).length;
  }, [exam]);

  const flaggedCount = useMemo(() => {
    if (!exam) return 0;
    return exam.flagged.size;
  }, [exam]);

  // ============================================
  // Timer Management
  // ============================================

  useEffect(() => {
    if (examState === 'running' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
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
    }

    // Create a custom config based on mode
    const configs = getCIAMockExamsBySection(selectedSection);
    const baseConfig = configs[0];
    
    const customConfig: CIAMockExamConfig = {
      ...baseConfig,
      id: `${selectedSection}-${selectedMode.id}-${Date.now()}`,
      questionCount: Math.min(selectedMode.questionCount, questionPool.length),
      totalTime: selectedMode.timeMinutes * 60,
    };

    // Generate exam with blueprint-weighted selection
    const generatedExam = generateCIAMockExamFromConfig(customConfig, questionPool as any);
    
    if (!generatedExam) {
      logger.error('Failed to generate exam');
      return;
    }

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

    const timeUsed = Math.round((Date.now() - startTime.getTime()) / 1000);
    const result = calculateCIAExamResult(exam, timeUsed);
    
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
                <ClipboardCheck className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  CIA Exam Simulator
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Practice with realistic exam conditions for the IIA Certified Internal Auditor exam
              </p>
            </div>
          </div>

          {/* Section Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Exam Part
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(Object.entries(CIA_SECTION_INFO) as [CIASectionId, typeof CIA_SECTION_INFO[CIASectionId]][]).map(([section, info]) => (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={clsx(
                    'p-4 rounded-lg border-2 text-left transition-all',
                    selectedSection === section
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600'
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
          </div>

          {/* Mode Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Exam Mode
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {examModes.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode)}
                  className={clsx(
                    'p-4 rounded-lg border-2 text-left transition-all',
                    selectedMode.id === mode.id
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600'
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
          </div>

          {/* Blueprint Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Blueprint Coverage
            </h2>
            <div className="space-y-2">
              {CIA_BLUEPRINT_WEIGHTS[selectedSection].map(weight => (
                <div key={weight.area} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">{weight.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{weight.weight}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={startExam}
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
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
                : 'You need more study to reach the passing score of 600.'}
            </p>
          </div>

          {/* Score Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
              <div className={clsx(
                'text-4xl font-bold mb-2',
                examResult.passed 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              )}>
                {examResult.score}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Raw Score</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
              <div className={clsx(
                'text-4xl font-bold mb-2',
                examResult.passed 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              )}>
                {examResult.scaledScore}/750
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Scaled Score (pass: 600)</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {examResult.correctAnswers}/{examResult.totalQuestions}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Correct Answers</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {formatTime(examResult.timeUsed)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Time Used</div>
            </div>
          </div>

          {/* Blueprint Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
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
          </div>

          {/* Difficulty Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
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
          </div>

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
              className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
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
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
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

  // Get review info if in review mode
  const reviewQuestion = isReview ? examResult?.reviewQuestions.find(rq => rq.questionId === currentQuestion.id) : null;
  void reviewQuestion; // Used for review mode display logic

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
              {CIA_SECTION_INFO[selectedSection].name}
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
              ({answeredCount} answered{flaggedCount > 0 ? `, ${flaggedCount} flagged` : ''})
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <div 
              ref={questionRef}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide">
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
                {!isReview && (
                  <button
                    onClick={handleToggleFlag}
                    className={clsx(
                      'p-2 rounded-lg transition-colors',
                      isFlagged
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-amber-500'
                    )}
                  >
                    <Flag className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Question Text */}
              <p className="text-gray-900 dark:text-white text-lg mb-6 leading-relaxed">
                {currentQuestion.question}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = currentAnswer === String(idx);
                  const isCorrectOption = idx === currentQuestion.correctAnswer;
                  
                  let optionStyle = 'border-gray-200 dark:border-gray-700 hover:border-amber-300';
                  if (isReview) {
                    if (isCorrectOption) {
                      optionStyle = 'border-green-500 bg-green-50 dark:bg-green-900/30';
                    } else if (isSelected && !isCorrectOption) {
                      optionStyle = 'border-red-500 bg-red-50 dark:bg-red-900/30';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-amber-500 bg-amber-50 dark:bg-amber-900/30';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !isReview && handleSelectAnswer(idx)}
                      disabled={isReview}
                      className={clsx(
                        'w-full text-left p-4 rounded-lg border-2 transition-all',
                        optionStyle
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-gray-900 dark:text-white">{option}</span>
                        {isReview && isCorrectOption && (
                          <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-500 ml-auto" />
                        )}
                        {isReview && isSelected && !isCorrectOption && (
                          <XCircle className="flex-shrink-0 w-5 h-5 text-red-500 ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Review Mode) */}
              {isReview && currentQuestion.explanation && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Explanation</h4>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleNavigate('prev')}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                {!isReview && currentIndex === exam.questions.length - 1 ? (
                  <button
                    onClick={handleSubmitExam}
                    className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                  >
                    Submit Exam
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavigate('next')}
                    disabled={currentIndex === exam.questions.length - 1}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Navigator (Desktop) */}
          <div className="hidden lg:block">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Questions</h3>
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((q, idx) => {
                  const isAnswered = exam.answers[q.id] !== undefined;
                  const isQuestionFlagged = exam.flagged.has(q.id);
                  const isCurrent = idx === currentIndex;
                  
                  let bgColor = 'bg-gray-100 dark:bg-gray-700';
                  if (isReview) {
                    const reviewQ = examResult?.reviewQuestions.find(rq => rq.questionId === q.id);
                    if (reviewQ?.isCorrect) {
                      bgColor = 'bg-green-100 dark:bg-green-900/50';
                    } else if (reviewQ) {
                      bgColor = 'bg-red-100 dark:bg-red-900/50';
                    }
                  } else if (isAnswered) {
                    bgColor = 'bg-amber-100 dark:bg-amber-900/50';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpToQuestion(idx)}
                      className={clsx(
                        'w-8 h-8 rounded text-sm font-medium transition-all',
                        bgColor,
                        isCurrent && 'ring-2 ring-amber-500',
                        isQuestionFlagged && 'ring-1 ring-red-500'
                      )}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
              
              {!isReview && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleSubmitExam}
                    className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Submit Exam
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CIAExamSimulator;
