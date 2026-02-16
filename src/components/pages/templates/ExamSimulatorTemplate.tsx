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
  LogOut,
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
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  
  // Calculator state
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcPrevValue, setCalcPrevValue] = useState<number | null>(null);
  const [calcOperator, setCalcOperator] = useState<string | null>(null);
  const [calcWaitingForOperand, setCalcWaitingForOperand] = useState(false);

  const handleCalcButton = useCallback((btn: string) => {
    if (btn >= '0' && btn <= '9' || btn === '.') {
      // Number or decimal input
      if (calcWaitingForOperand) {
        setCalcDisplay(btn === '.' ? '0.' : btn);
        setCalcWaitingForOperand(false);
      } else {
        if (btn === '.' && calcDisplay.includes('.')) return;
        setCalcDisplay(calcDisplay === '0' && btn !== '.' ? btn : calcDisplay + btn);
      }
    } else if (['+', '-', '*', '/'].includes(btn)) {
      // Operator
      const currentValue = parseFloat(calcDisplay);
      if (calcPrevValue !== null && calcOperator && !calcWaitingForOperand) {
        const result = performCalc(calcPrevValue, currentValue, calcOperator);
        setCalcDisplay(String(result));
        setCalcPrevValue(result);
      } else {
        setCalcPrevValue(currentValue);
      }
      setCalcOperator(btn);
      setCalcWaitingForOperand(true);
    } else if (btn === '=') {
      // Calculate result
      if (calcPrevValue !== null && calcOperator) {
        const currentValue = parseFloat(calcDisplay);
        const result = performCalc(calcPrevValue, currentValue, calcOperator);
        setCalcDisplay(String(result));
        setCalcPrevValue(null);
        setCalcOperator(null);
        setCalcWaitingForOperand(true);
      }
    } else if (btn === 'C') {
      // Clear
      setCalcDisplay('0');
      setCalcPrevValue(null);
      setCalcOperator(null);
      setCalcWaitingForOperand(false);
    }
  }, [calcDisplay, calcPrevValue, calcOperator, calcWaitingForOperand]);

  const performCalc = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };
  
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

  // Prevent accidental navigation away during active exam
  useEffect(() => {
    if (examState !== 'running') return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
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
            {/* Realistic Theme Toggle */}
            {testingProvider && (
              <div className="max-w-lg mx-auto mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={clsx(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      testingProvider === 'prometric' 
                        ? 'bg-slate-800' 
                        : 'bg-blue-900'
                    )}>
                      <span className="text-white text-xs font-bold">
                        {testingProvider === 'prometric' ? 'WIN' : 'VUE'}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {testingProvider === 'prometric' ? 'Prometric Interface Mode' : 'Pearson VUE Interface Mode'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Practice with the exact look of the real exam
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={useRealisticTheme}
                      onChange={(e) => setUseRealisticTheme(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </div>
                </label>
                {useRealisticTheme && (
                  <div className={clsx(
                    'mt-3 p-3 rounded-lg text-sm',
                    testingProvider === 'prometric'
                      ? 'bg-amber-50 border border-amber-200 text-amber-800'
                      : 'bg-blue-50 border border-blue-200 text-blue-800'
                  )}>
                    <strong>Heads up:</strong>{' '}
                    {testingProvider === 'prometric'
                      ? `The Prometric interface uses a dated 1990s aesthetic that matches the real ${courseName} exam at Prometric testing centers. This helps reduce test-day anxiety.`
                      : `The Pearson VUE interface replicates the modern testing experience you'll encounter at real ${courseName} exam centers. This helps reduce test-day anxiety.`}
                  </div>
                )}
              </div>
            )}

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
    // ============================================
    // Prometric Results Screen
    // ============================================
    if (useRealisticTheme && testingProvider === 'prometric') {
      return (
        <div className="prometric-theme prometric-results">
          <div className="prometric-results-window">
            <div className="prometric-results-titlebar">
              {courseName} Examination Results
              <div className="prometric-titlebar-buttons">
                <button className="prometric-titlebar-btn">_</button>
                <button className="prometric-titlebar-btn">□</button>
                <button className="prometric-titlebar-btn">×</button>
              </div>
            </div>
            <div className="prometric-results-content">
              <div className="prometric-results-header">
                <div className="prometric-score-display">
                  <div className="prometric-score-label">Final Score</div>
                  <div className={clsx('prometric-score-value', examResult.passed ? 'passing' : 'failing')}>
                    {examResult.score}
                  </div>
                  <div className="prometric-score-target">
                    Target: {passingScore} | {examResult.correctAnswers} of {examResult.totalQuestions} correct
                  </div>
                </div>
                <div className={clsx('prometric-result-status', examResult.passed ? 'pass' : 'fail')}>
                  {examResult.passed ? '✓ PASS' : '✗ FAIL'}
                </div>
              </div>
              
              <div className="prometric-results-divider" />
              
              <div className="prometric-results-section">
                <div className="prometric-section-title">Performance by Content Area</div>
                <table className="prometric-results-table">
                  <thead>
                    <tr><th>Section</th><th>Correct</th><th>Total</th><th>Score</th></tr>
                  </thead>
                  <tbody>
                    {Object.entries(examResult.bySection)
                      .filter(([_, data]) => (data as { total: number }).total > 0)
                      .map(([id, data]) => {
                        const { correct, total, name } = data as { correct: number; total: number; name: string };
                        const pct = Math.round((correct / total) * 100);
                        return (
                          <tr key={id}>
                            <td>{name}</td>
                            <td>{correct}</td>
                            <td>{total}</td>
                            <td className={pct < passingScore ? 'weak' : ''}>{pct}%</td>
                          </tr>
                        );
                      })}
                    <tr className="prometric-results-total">
                      <td>Total</td>
                      <td>{examResult.correctAnswers}</td>
                      <td>{examResult.totalQuestions}</td>
                      <td>{examResult.score}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="prometric-results-divider" />
              
              <div className="prometric-results-actions">
                <button onClick={handleRetakeExam} className="prometric-btn">New Exam</button>
                <button onClick={() => navigate(backPath)} className="prometric-btn prometric-btn-primary">
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // ============================================
    // Pearson VUE Results Screen
    // ============================================
    if (useRealisticTheme && testingProvider === 'pearsonvue') {
      return (
        <div className="pvue-theme pvue-results">
          <div className="pvue-results-window">
            <div className="pvue-results-titlebar">
              {courseName} Examination — Results
            </div>
            <div className="pvue-results-content">
              <div className="pvue-results-header">
                <div className="pvue-score-display">
                  <div className="pvue-score-label">Your Score</div>
                  <div className={clsx('pvue-score-value', examResult.passed ? 'passing' : 'failing')}>
                    {examResult.score}%
                  </div>
                  <div className="pvue-score-target">
                    Passing Score: {passingScore}% | {examResult.correctAnswers}/{examResult.totalQuestions} correct
                  </div>
                </div>
                <div className={clsx('pvue-result-status', examResult.passed ? 'pass' : 'fail')}>
                  {examResult.passed ? 'PASS' : 'DID NOT PASS'}
                </div>
              </div>
              
              <div className="pvue-results-section">
                <div className="pvue-section-title">Performance by Content Area</div>
                <table className="pvue-results-table">
                  <thead>
                    <tr><th>Domain</th><th>Correct</th><th>Total</th><th>Score</th></tr>
                  </thead>
                  <tbody>
                    {Object.entries(examResult.bySection)
                      .filter(([_, data]) => (data as { total: number }).total > 0)
                      .map(([id, data]) => {
                        const { correct, total, name } = data as { correct: number; total: number; name: string };
                        const pct = Math.round((correct / total) * 100);
                        return (
                          <tr key={id}>
                            <td>{name}</td>
                            <td>{correct}</td>
                            <td>{total}</td>
                            <td className={pct < passingScore ? 'weak' : ''}>{pct}%</td>
                          </tr>
                        );
                      })}
                    <tr className="pvue-results-total">
                      <td>Total</td>
                      <td>{examResult.correctAnswers}</td>
                      <td>{examResult.totalQuestions}</td>
                      <td>{examResult.score}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="pvue-results-actions">
                <button onClick={handleRetakeExam} className="pvue-btn">New Exam</button>
                <button onClick={() => navigate(backPath)} className="pvue-btn pvue-btn-primary">
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // ============================================
    // Default Modern Results Screen
    // ============================================
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

  // ============================================
  // Prometric Theme — Exam In Progress
  // ============================================
  if (useRealisticTheme && testingProvider === 'prometric') {
    return (
      <div className="prometric-theme h-screen flex flex-col overflow-hidden">
        {/* Prometric Header */}
        <div className="prometric-header">
          <div className="prometric-header-title">
            <span className="prometric-header-section">{courseName} — {sections[selectedSection]?.name || selectedSection}</span>
            <div className="prometric-header-divider" />
            <span className="prometric-header-info">
              Question {currentIndex + 1} of {exam.questions.length}
            </span>
          </div>
          <div className="prometric-header-right">
            <div className={clsx('prometric-timer', timeRemaining < 300 && 'warning')}>
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Prometric Toolbar */}
        <div className="prometric-toolbar">
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className={clsx('prometric-toolbar-btn', showCalculator && 'active')}
          >
            <Calculator className="w-4 h-4" />
            Calculator
          </button>
          <div className="prometric-toolbar-separator" />
          <button
            onClick={handleToggleFlag}
            className={clsx('prometric-toolbar-btn', isCurrentFlagged && 'active')}
          >
            <Flag className="w-4 h-4" />
            {isCurrentFlagged ? 'Unflag' : 'Flag'}
          </button>
          <div className="prometric-toolbar-separator" />
          <button
            onClick={() => setShowExitConfirm(true)}
            className="prometric-toolbar-btn text-red-600 hover:text-red-700"
          >
            <LogOut className="w-4 h-4" />
            Exit Exam
          </button>
          <div className="flex-1" />
          <span className="text-xs text-gray-600">
            Answered: {answeredCount} of {exam.questions.length}
          </span>
        </div>

        {/* Main Content */}
        <div className="prometric-content flex-1">
          <div className="prometric-main relative">
            {/* Calculator Overlay */}
            {showCalculator && (
              <div className="prometric-calculator">
                <div className="prometric-calculator-title">
                  <span>Calculator</span>
                  <button className="prometric-calculator-close" onClick={() => setShowCalculator(false)}>×</button>
                </div>
                <div className="prometric-calculator-display">{calcDisplay}</div>
                <div className="prometric-calculator-buttons">
                  <button className="prometric-calc-btn clear" onClick={() => handleCalcButton('C')}>C</button>
                  {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(btn => (
                    <button
                      key={btn}
                      onClick={() => handleCalcButton(btn)}
                      className={clsx(
                        'prometric-calc-btn',
                        ['+','-','*','/'].includes(btn) && 'operator',
                        btn === '=' && 'equals'
                      )}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MCQ Rendering in Prometric style */}
            <div className="prometric-question-header">
              <span className="prometric-question-number">
                Question {currentIndex + 1} of {exam.questions.length}
              </span>
              <button
                onClick={handleToggleFlag}
                className={clsx('prometric-flag-btn', isCurrentFlagged && 'flagged')}
              >
                <Flag className="w-3 h-3" />
                {isCurrentFlagged ? 'Flagged for Review' : 'Flag for Review'}
              </button>
            </div>

            <div className="prometric-question-body">
              <div className="prometric-question-text">
                {currentQuestion.question}
              </div>

              <div className="prometric-options">
                {shuffledCurrentQuestion?.shuffledOptions.map((option, idx) => {
                  const originalIdx = shuffledCurrentQuestion.reverseMap[idx];
                  const isSelected = currentAnswer !== undefined &&
                    (typeof currentAnswer === 'number' ? currentAnswer === originalIdx : parseInt(String(currentAnswer), 10) === originalIdx);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      data-testid={`answer-option-${idx}`}
                      className={clsx('prometric-option', isSelected && 'selected')}
                    >
                      <span className="prometric-option-letter">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="prometric-option-text">{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Prometric Navigation */}
        <div className="prometric-nav">
          <div className="prometric-nav-buttons">
            <button
              onClick={() => handleNavigate('prev')}
              disabled={currentIndex === 0}
              className="prometric-nav-btn"
            >
              « Previous
            </button>
            <button
              onClick={() => handleNavigate('next')}
              disabled={currentIndex === exam.questions.length - 1}
              className="prometric-nav-btn"
            >
              Next »
            </button>
          </div>

          {/* Question Grid */}
          <div className="prometric-question-grid">
            {exam.questions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleJumpToQuestion(i)}
                className={clsx(
                  'prometric-grid-btn',
                  currentIndex === i && 'current',
                  exam.answers[q.id] !== undefined && 'answered',
                  exam.flagged.has(q.id) && 'flagged'
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="prometric-nav-buttons">
            {currentIndex === exam.questions.length - 1 ? (
              <button onClick={handleSubmitExam} className="prometric-nav-btn primary">
                Submit Exam »
              </button>
            ) : (
              <button onClick={() => handleNavigate('next')} className="prometric-nav-btn primary">
                Next »
              </button>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="prometric-status">
          <div className="prometric-status-left">
            <div className="prometric-status-item">
              <div className="prometric-status-indicator answered" />
              <span>Answered</span>
            </div>
            <div className="prometric-status-item">
              <div className="prometric-status-indicator flagged" />
              <span>Flagged</span>
            </div>
            <div className="prometric-status-item">
              <div className="prometric-status-indicator unanswered" />
              <span>Unanswered</span>
            </div>
          </div>
          <span>
            Answered: {answeredCount} of {exam.questions.length}
          </span>
        </div>

        {/* Exit Confirmation Modal */}
        {showExitConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Exit Exam?</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Are you sure you want to exit? Your progress will be lost and this exam attempt will not be scored.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                >
                  Continue Exam
                </button>
                <button
                  onClick={() => navigate(backPath)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Exit Exam
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================
  // Pearson VUE Theme — Exam In Progress
  // ============================================
  if (useRealisticTheme && testingProvider === 'pearsonvue') {
    return (
      <div className="pvue-theme h-screen flex flex-col overflow-hidden">
        {/* Pearson VUE Header */}
        <div className="pvue-header">
          <div className="pvue-header-left">
            <span className="pvue-header-logo">{courseName} Examination</span>
            <div className="pvue-header-divider" />
            <span className="pvue-header-section">{sections[selectedSection]?.name || selectedSection}</span>
          </div>
          <div className="pvue-header-right">
            <div className={clsx('pvue-timer', timeRemaining < 300 && 'warning')}>
              <Clock className="w-4 h-4" />
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Pearson VUE Toolbar */}
        <div className="pvue-toolbar">
          <div className="pvue-toolbar-left">
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className={clsx('pvue-toolbar-btn', showCalculator && 'active')}
            >
              <Calculator className="w-4 h-4" />
              Calculator
            </button>
            <button
              onClick={handleToggleFlag}
              className={clsx('pvue-toolbar-btn', isCurrentFlagged && 'active')}
            >
              <Flag className="w-4 h-4" />
              {isCurrentFlagged ? 'Unflag' : 'Flag for Review'}
            </button>
            <button
              onClick={() => setShowExitConfirm(true)}
              className="pvue-toolbar-btn text-red-600 hover:text-red-700"
            >
              <LogOut className="w-4 h-4" />
              Exit
            </button>
          </div>
          <div className="pvue-toolbar-right">
            {answeredCount} of {exam.questions.length} answered
          </div>
        </div>

        {/* Main Content */}
        <div className="pvue-content flex-1">
          <div className="pvue-main relative">
            {/* Calculator Overlay */}
            {showCalculator && (
              <div className="pvue-calculator">
                <div className="pvue-calculator-title">
                  <span>Calculator</span>
                  <button className="pvue-calculator-close" onClick={() => setShowCalculator(false)}>×</button>
                </div>
                <div className="pvue-calculator-display">{calcDisplay}</div>
                <div className="pvue-calculator-buttons">
                  <button className="pvue-calc-btn clear" onClick={() => handleCalcButton('C')}>C</button>
                  {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(btn => (
                    <button
                      key={btn}
                      onClick={() => handleCalcButton(btn)}
                      className={clsx(
                        'pvue-calc-btn',
                        ['+','-','*','/'].includes(btn) && 'operator',
                        btn === '=' && 'equals'
                      )}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question Area */}
            <div className="pvue-question-header">
              <span className="pvue-question-number">
                Question {currentIndex + 1} of {exam.questions.length}
              </span>
              <button
                onClick={handleToggleFlag}
                className={clsx('pvue-flag-btn', isCurrentFlagged && 'flagged')}
              >
                <Flag className="w-3.5 h-3.5" />
                {isCurrentFlagged ? 'Flagged' : 'Flag'}
              </button>
            </div>

            <div className="pvue-question-body">
              <div className="pvue-question-text">
                {currentQuestion.question}
              </div>

              <div className="pvue-options">
                {shuffledCurrentQuestion?.shuffledOptions.map((option, idx) => {
                  const originalIdx = shuffledCurrentQuestion.reverseMap[idx];
                  const isSelected = currentAnswer !== undefined &&
                    (typeof currentAnswer === 'number' ? currentAnswer === originalIdx : parseInt(String(currentAnswer), 10) === originalIdx);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      data-testid={`answer-option-${idx}`}
                      className={clsx('pvue-option', isSelected && 'selected')}
                    >
                      <span className="pvue-option-letter">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="pvue-option-text">{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Pearson VUE Navigation */}
        <div className="pvue-nav">
          <div className="pvue-nav-buttons">
            <button
              onClick={() => handleNavigate('prev')}
              disabled={currentIndex === 0}
              className="pvue-nav-btn"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
          </div>

          {/* Question Grid */}
          <div className="pvue-question-grid">
            {exam.questions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleJumpToQuestion(i)}
                className={clsx(
                  'pvue-grid-btn',
                  currentIndex === i && 'current',
                  exam.answers[q.id] !== undefined && 'answered',
                  exam.flagged.has(q.id) && 'flagged'
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="pvue-nav-buttons">
            {currentIndex === exam.questions.length - 1 ? (
              <button onClick={handleSubmitExam} className="pvue-nav-btn primary">
                Submit Exam
              </button>
            ) : (
              <button onClick={() => handleNavigate('next')} className="pvue-nav-btn primary">
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="pvue-status">
          <div className="pvue-status-left">
            <div className="pvue-status-item">
              <div className="pvue-status-indicator answered" />
              <span>Answered</span>
            </div>
            <div className="pvue-status-item">
              <div className="pvue-status-indicator flagged" />
              <span>Flagged</span>
            </div>
            <div className="pvue-status-item">
              <div className="pvue-status-indicator unanswered" />
              <span>Unanswered</span>
            </div>
          </div>
          <span>{answeredCount} of {exam.questions.length} answered</span>
        </div>

        {/* Exit Confirmation Modal */}
        {showExitConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Exit Exam?</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Are you sure you want to exit? Your progress will be lost and this exam attempt will not be scored.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                >
                  Continue Exam
                </button>
                <button
                  onClick={() => navigate(backPath)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Exit Exam
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================
  // Default Modern Theme — Exam In Progress
  // ============================================
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
            onClick={() => setShowExitConfirm(true)}
            aria-label="Exit"
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
                    data-testid={`answer-option-${idx}`}
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

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Exit Exam?</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Are you sure you want to exit? Your progress will be lost and this exam attempt will not be scored.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                Continue Exam
              </button>
              <button
                onClick={() => navigate(backPath)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Exit Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamSimulatorTemplate;
