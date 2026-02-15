/**
 * ExamSimulatorTemplate
 * 
 * A unified exam simulator component that all courses can use.
 * Accepts course-specific configuration and question pools.
 * 
 * Features:
 * - Setup screen with section and mode selection
 * - Timed exam with question navigation
 * - Answer tracking with flagging support
 * - Results display with breakdown by section
 * - Dark mode support
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Flag,
  Trophy,
  ArrowLeft,
  BarChart3,
  Play,
  ClipboardCheck,
  X,
  Calculator,
} from 'lucide-react';
import clsx from 'clsx';
import feedback from '../../../services/feedback';
import logger from '../../../utils/logger';
import { getShuffledIndices } from '../../../utils/questionShuffle';
import '../../../styles/prometric.css';
import '../../../styles/pearsonvue.css';

// ============================================
// Types
// ============================================

export type ExamState = 'setup' | 'running' | 'paused' | 'review' | 'results';

export interface ExamMode {
  id: string;
  name: string;
  questionCount: number;
  timeMinutes: number;
  description: string;
}

export interface SectionInfo {
  id: string;
  name: string;
  description: string;
  color?: string;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  section?: string;
  domain?: string;
  topic?: string;
}

export interface GeneratedExam {
  questions: ExamQuestion[];
  timeRemaining: number;
  answers: Record<string, string | number>;
  flagged: Set<string>;
}

export interface ExamResult {
  score: number;
  passed: boolean;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  timeUsed: number;
  bySection: Record<string, { correct: number; total: number; name: string }>;
}

export type TestingProvider = 'prometric' | 'pearsonvue';

export interface ExamSimulatorConfig<SectionId extends string = string> {
  // Course identity
  courseId: string;
  courseName: string;
  courseIcon?: React.ReactNode;
  courseDescription: string;
  backPath: string;
  
  // Testing provider theme (optional - enables realistic exam interface toggle)
  testingProvider?: TestingProvider;
  
  // Section configuration
  sections: Record<SectionId, SectionInfo>;
  defaultSection: SectionId;
  
  // Mode configuration  
  modes: ExamMode[];
  defaultModeIndex?: number;
  /** Optional: return section-specific modes (e.g., CIA parts have different question counts) */
  getModes?: (section: SectionId) => ExamMode[];
  
  // Question pool - function so it's only called when needed
  getQuestionPool: (section: SectionId) => ExamQuestion[];
  
  // Exam generator - creates the exam from config and pool
  generateExam: (
    section: SectionId,
    mode: ExamMode,
    questionPool: ExamQuestion[]
  ) => GeneratedExam;
  
  // Optional: Calculate results with blueprint breakdown
  calculateResults?: (
    exam: GeneratedExam,
    startTime: Date,
    endTime: Date
  ) => ExamResult;
  
  // Passing score (default 70)
  passingScore?: number;
  
  // Allow section multi-select (for domain-based exams like CISA)
  allowMultiSectionSelect?: boolean;
}

// ============================================
// Default Exam Generator
// ============================================

export function createDefaultExamGenerator<SectionId extends string>() {
  return (
    _section: SectionId,
    mode: ExamMode,
    questionPool: ExamQuestion[]
  ): GeneratedExam => {
    // Shuffle and select questions
    const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(mode.questionCount, shuffled.length));
    
    return {
      questions: selected,
      timeRemaining: mode.timeMinutes * 60,
      answers: {},
      flagged: new Set(),
    };
  };
}

// ============================================
// Default Results Calculator
// ============================================

export function createDefaultResultsCalculator<SectionId extends string>(
  sections: Record<SectionId, SectionInfo>,
  passingScore: number = 70
) {
  return (
    exam: GeneratedExam,
    startTime: Date,
    endTime: Date
  ): ExamResult => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    
    const bySection: Record<string, { correct: number; total: number; name: string }> = {};
    
    // Initialize sections
    Object.entries(sections).forEach(([id, info]) => {
      bySection[id] = { correct: 0, total: 0, name: (info as SectionInfo).name };
    });
    
    exam.questions.forEach(q => {
      const userAnswer = exam.answers[q.id];
      const sectionId = q.section || q.domain || 'unknown';
      
      if (!bySection[sectionId]) {
        bySection[sectionId] = { correct: 0, total: 0, name: sectionId };
      }
      bySection[sectionId].total++;
      
      if (userAnswer === undefined || userAnswer === null) {
        unanswered++;
      } else {
        const userAnswerNum = typeof userAnswer === 'string' ? parseInt(userAnswer, 10) : userAnswer;
        if (userAnswerNum === q.correctAnswer) {
          correct++;
          bySection[sectionId].correct++;
        } else {
          incorrect++;
        }
      }
    });
    
    const score = Math.round((correct / exam.questions.length) * 100);
    const timeUsed = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
    
    return {
      score,
      passed: score >= passingScore,
      totalQuestions: exam.questions.length,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      unanswered,
      timeUsed,
      bySection,
    };
  };
}

// ============================================
// Helper Functions
// ============================================

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============================================
// Component
// ============================================

export function ExamSimulatorTemplate<SectionId extends string>({
  config,
}: {
  config: ExamSimulatorConfig<SectionId>;
}) {
  const navigate = useNavigate();
  const {
    // courseId reserved for future analytics integration
    courseName,
    courseDescription,
    backPath,
    sections,
    defaultSection,
    modes,
    defaultModeIndex = 1,
    getQuestionPool,
    generateExam,
    calculateResults,
    passingScore = 70,
    allowMultiSectionSelect = false,
    getModes,
    testingProvider,
  } = config;

  // Setup state
  const [selectedSection, setSelectedSection] = useState<SectionId>(defaultSection);
  const [selectedSections, setSelectedSections] = useState<SectionId[]>([defaultSection]);
  
  // Realistic theme toggle (only available when testingProvider is set)
  const [useRealisticTheme, setUseRealisticTheme] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  
  // Compute active modes based on selected section
  const activeModes = getModes ? getModes(selectedSection) : modes;
  const [selectedMode, setSelectedMode] = useState<ExamMode>(activeModes[defaultModeIndex] || activeModes[0]);
  const [examState, setExamState] = useState<ExamState>('setup');

  // Update selected mode when section changes (modes may differ per section)
  useEffect(() => {
    if (getModes) {
      const newModes = getModes(selectedSection);
      // Keep the same mode type if it exists, otherwise reset to default
      const sameType = newModes.find(m => m.id === selectedMode.id);
      setSelectedMode(sameType || newModes[defaultModeIndex] || newModes[0]);
    }
  }, [selectedSection]); // eslint-disable-line react-hooks/exhaustive-deps

  // Exam state
  const [exam, setExam] = useState<GeneratedExam | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Results state
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  // Session ID for deterministic shuffling
  const [sessionId] = useState(() => `exam-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`);

  // Refs
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Computed values
  const currentQuestion = useMemo(() => {
    if (!exam || currentIndex >= exam.questions.length) return null;
    return exam.questions[currentIndex];
  }, [exam, currentIndex]);

  // Shuffled options for current question - deterministic per session
  const shuffledCurrentQuestion = useMemo(() => {
    if (!currentQuestion) return null;
    const seed = `${currentQuestion.id}-${sessionId}`;
    const shuffledIndices = getShuffledIndices(currentQuestion.options.length, seed);
    const shuffledOptions = shuffledIndices.map(i => currentQuestion.options[i]);
    // reverseMap: shuffledIndex -> originalIndex
    const reverseMap = shuffledIndices;
    // Find where the original correct answer ended up
    const shuffledCorrectAnswer = shuffledIndices.indexOf(currentQuestion.correctAnswer);
    return { shuffledOptions, reverseMap, shuffledCorrectAnswer };
  }, [currentQuestion, sessionId]);

  const answeredCount = useMemo(() => {
    if (!exam) return 0;
    return Object.keys(exam.answers).length;
  }, [exam?.answers]);

  const flaggedCount = useMemo(() => {
    if (!exam) return 0;
    return exam.flagged.size;
  }, [exam?.flagged]);

  // Get question pool for current selection
  const questionPool = useMemo(() => {
    if (allowMultiSectionSelect) {
      return selectedSections.flatMap(s => getQuestionPool(s));
    }
    return getQuestionPool(selectedSection);
  }, [selectedSection, selectedSections, allowMultiSectionSelect, getQuestionPool]);

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
    if (questionPool.length < selectedMode.questionCount) {
      logger.warn(`Not enough questions. Need ${selectedMode.questionCount}, have ${questionPool.length}`);
    }

    const section = allowMultiSectionSelect ? selectedSections[0] : selectedSection;
    const generatedExam = generateExam(section, selectedMode, questionPool);

    if (!generatedExam || generatedExam.questions.length === 0) {
      logger.error('Failed to generate exam');
      return;
    }

    setExam(generatedExam);
    setTimeRemaining(generatedExam.timeRemaining);
    setStartTime(new Date());
    setCurrentIndex(0);
    setExamState('running');
    
    feedback.click();
  }, [selectedSection, selectedSections, selectedMode, questionPool, generateExam, allowMultiSectionSelect]);

  const handleSelectAnswer = useCallback((shuffledAnswerIndex: number) => {
    if (!exam || !currentQuestion || !shuffledCurrentQuestion) return;
    
    // Translate shuffled index back to original index for storage
    const originalAnswerIndex = shuffledCurrentQuestion.reverseMap[shuffledAnswerIndex];
    
    setExam(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: originalAnswerIndex,
        },
      };
    });
    
    feedback.tap();
  }, [exam, currentQuestion, shuffledCurrentQuestion]);

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
      return { ...prev, flagged: newFlagged };
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
    
    feedback.tap();
  }, [exam, currentIndex]);

  const handleJumpToQuestion = useCallback((index: number) => {
    setCurrentIndex(index);
    feedback.tap();
  }, []);

  const handleSubmitExam = useCallback(() => {
    if (!exam || !startTime) return;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const endTime = new Date();
    
    // Use custom calculator or default
    const resultsCalculator = calculateResults || createDefaultResultsCalculator(sections, passingScore);
    const result = resultsCalculator(exam, startTime, endTime);
    
    setExamResult(result);
    setExamState('results');
    
    feedback.click();
  }, [exam, startTime, calculateResults, sections, passingScore]);

  const handleRetakeExam = useCallback(() => {
    setExamState('setup');
    setExam(null);
    setExamResult(null);
    setCurrentIndex(0);
  }, []);

  // ============================================
  // Render: Setup Screen
  // ============================================

  if (examState === 'setup') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(backPath)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <ClipboardCheck className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {courseName} Exam Simulator
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {courseDescription}
            </p>
          </div>

          {/* Section Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {allowMultiSectionSelect ? 'Select Domains' : 'Select Exam Part'}
            </h2>
            
            {allowMultiSectionSelect ? (
              <div className="space-y-2">
                <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedSections.length === Object.keys(sections).length}
                    onChange={() => {
                      if (selectedSections.length === Object.keys(sections).length) {
                        setSelectedSections([]);
                      } else {
                        setSelectedSections(Object.keys(sections) as SectionId[]);
                      }
                    }}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="font-medium text-gray-900 dark:text-white">All Domains</span>
                </label>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
                {(Object.entries(sections) as [SectionId, SectionInfo][]).map(([id, info]) => (
                  <label key={id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedSections.includes(id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSections([...selectedSections, id]);
                        } else {
                          setSelectedSections(selectedSections.filter(s => s !== id));
                        }
                      }}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{info.name}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(Object.entries(sections) as [SectionId, SectionInfo][]).map(([id, info]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedSection(id)}
                    className={clsx(
                      'p-4 rounded-lg border-2 text-left transition-all',
                      selectedSection === id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                    )}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {info.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {info.description}
                    </p>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                      {getQuestionPool(id).length} questions available
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mode Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Exam Mode
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeModes.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode)}
                  className={clsx(
                    'p-4 rounded-lg border-2 text-left transition-all',
                    selectedMode.id === mode.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
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

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={startExam}
              disabled={allowMultiSectionSelect && selectedSections.length === 0}
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
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
                : 'You need a bit more study to reach the passing score.'}
            </p>
          </div>

          {/* Score Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
              <div className={clsx(
                'text-4xl font-bold mb-2',
                examResult.passed 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              )}>
                {examResult.score}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Your Score</div>
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

          {/* Section Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance by Section
            </h2>
            <div className="space-y-4">
              {Object.entries(examResult.bySection)
                .filter(([_, data]) => (data as { total: number }).total > 0)
                .map(([sectionId, data]) => {
                  const { correct, total, name } = data as { correct: number; total: number; name: string };
                  const percentage = Math.round((correct / total) * 100);
                  return (
                    <div key={sectionId}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {correct}/{total} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={clsx(
                            'h-2 rounded-full transition-all',
                            percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetakeExam}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              Take Another Exam
            </button>
            <button
              onClick={() => navigate(backPath)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // Render: Exam In Progress
  // ============================================

  if (!exam || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading exam...</div>
      </div>
    );
  }

  const currentAnswer = exam.answers[currentQuestion.id];
  const isCurrentFlagged = exam.flagged.has(currentQuestion.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">{courseName} Exam</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Question {currentIndex + 1} of {exam.questions.length}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Progress */}
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>{answeredCount}/{exam.questions.length}</span>
            {flaggedCount > 0 && (
              <>
                <Flag className="w-4 h-4 text-yellow-500 ml-2" />
                <span>{flaggedCount}</span>
              </>
            )}
          </div>
          
          {/* Timer */}
          <div className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-full font-mono font-medium',
            timeRemaining < 300 
              ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          )}>
            <Clock className="w-4 h-4" />
            {formatTime(timeRemaining)}
          </div>
          
          {/* Exit */}
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
                navigate(backPath);
              }
            }}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-10 min-h-[60vh] flex flex-col">
          {/* Question Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {currentQuestion.section && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                  {currentQuestion.section}
                </span>
              )}
            </div>
            <button
              onClick={handleToggleFlag}
              className={clsx(
                'p-2 rounded-lg transition-colors',
                isCurrentFlagged 
                  ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400'
              )}
              title={isCurrentFlagged ? 'Unflag question' : 'Flag for review'}
            >
              <Flag className="w-5 h-5" />
            </button>
          </div>

          {/* Question Text */}
          <div className="flex-1">
            <p className="text-xl text-gray-900 dark:text-gray-100 leading-relaxed mb-8">
              {currentQuestion.question}
            </p>
            
            {/* Answer Options */}
            <div className="space-y-3">
              {shuffledCurrentQuestion?.shuffledOptions.map((option, idx) => {
                // currentAnswer stores original index, reverseMap[idx] gives original index for this shuffled position
                const originalIdx = shuffledCurrentQuestion.reverseMap[idx];
                const isSelected = currentAnswer !== undefined && 
                  (typeof currentAnswer === 'number' ? currentAnswer === originalIdx : parseInt(currentAnswer, 10) === originalIdx);
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={clsx(
                      'w-full text-left p-4 rounded-xl border-2 transition-all flex items-start group',
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                    )}
                  >
                    <span className={clsx(
                      'w-6 h-6 rounded-full border flex items-center justify-center mr-4 text-sm font-medium shrink-0 mt-0.5 transition-colors',
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-600 text-white' 
                        : 'border-gray-400 text-gray-500 group-hover:border-indigo-400'
                    )}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={clsx(
                      isSelected ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-700 dark:text-gray-300'
                    )}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <button
              onClick={() => handleNavigate('prev')}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {currentIndex === exam.questions.length - 1 ? (
              <button
                onClick={handleSubmitExam}
                className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <CheckCircle className="w-4 h-4" /> Submit Exam
              </button>
            ) : (
              <button
                onClick={() => handleNavigate('next')}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Question Navigator</h3>
          <div className="flex flex-wrap gap-2">
            {exam.questions.map((q, idx) => {
              const isAnswered = exam.answers[q.id] !== undefined;
              const isFlagged = exam.flagged.has(q.id);
              const isCurrent = idx === currentIndex;
              
              return (
                <button
                  key={q.id}
                  onClick={() => handleJumpToQuestion(idx)}
                  className={clsx(
                    'w-8 h-8 rounded-lg text-sm font-medium transition-all relative',
                    isCurrent 
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-300' 
                      : isAnswered 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  )}
                >
                  {idx + 1}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamSimulatorTemplate;
