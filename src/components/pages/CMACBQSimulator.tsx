/**
 * CMA CBQ (Case-Based Questions) Simulator
 * 
 * Effective September 2026, CBQs replace essays on the CMA exam.
 * Each part has 2 CBQs worth 25% of total score.
 * 
 * CBQ Question Types:
 * - numerical_entry: Calculate and type a value
 * - drag_and_drop: Arrange items or match concepts
 * - multiple_select: Select ALL correct options
 * - dropdown: Choose from dropdown options
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  ChevronLeft,
  FileText,
  CheckCircle,
  XCircle,
  GripVertical,
  ListChecks,
  RotateCcw,
  AlertCircle,
  Info,
  Trophy,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import { CBQ, CBQQuestion } from '../../types';
import { CMA1_CBQS, CMA2_CBQS } from '../../data/cma/cbq';

// ============================================
// Types
// ============================================

type CMASection = 'CMA1' | 'CMA2';

interface UserAnswer {
  questionId: string;
  answer: number | string | string[] | Record<string, string>;
  isSubmitted: boolean;
}

interface QuestionResult {
  questionId: string;
  isCorrect: boolean;
  pointsEarned: number;
  pointsPossible: number;
}

// ============================================
// Helper Components
// ============================================

// Numerical Entry Question
const NumericalEntryInput: React.FC<{
  question: CBQQuestion;
  value: number | string;
  onChange: (val: number) => void;
  disabled?: boolean;
  showFeedback?: boolean;
  isCorrect?: boolean;
}> = ({ question, value, onChange, disabled, showFeedback, isCorrect }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          type="number"
          step="any"
          value={value === '' ? '' : value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          disabled={disabled}
          className={clsx(
            'w-48 px-4 py-3 text-lg font-mono rounded-lg border-2 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500',
            disabled && 'bg-slate-100 dark:bg-slate-700 cursor-not-allowed',
            showFeedback && isCorrect && 'border-success-500 bg-success-50 dark:bg-success-900/20',
            showFeedback && !isCorrect && 'border-error-500 bg-error-50 dark:bg-error-900/20',
            !showFeedback && 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
          )}
          placeholder="Enter value..."
        />
        {question.tolerance && (
          <span className="text-sm text-slate-500 dark:text-slate-400">
            (±{question.tolerance} tolerance)
          </span>
        )}
      </div>
      {showFeedback && (
        <div className={clsx(
          'flex items-start gap-2 p-3 rounded-lg text-sm',
          isCorrect ? 'bg-success-50 dark:bg-success-900/20 text-success-800 dark:text-success-200' : 'bg-error-50 dark:bg-error-900/20 text-error-800 dark:text-error-200'
        )}>
          {isCorrect ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
          <div>
            <span className="font-medium">{isCorrect ? 'Correct!' : 'Incorrect'}</span>
            {!isCorrect && typeof question.correctAnswer === 'number' && (
              <span className="ml-2">Correct answer: {question.correctAnswer.toLocaleString()}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Multiple Select Question
const MultipleSelectInput: React.FC<{
  question: CBQQuestion;
  selected: string[];
  onChange: (val: string[]) => void;
  disabled?: boolean;
  showFeedback?: boolean;
}> = ({ question, selected, onChange, disabled, showFeedback }) => {
  const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [];
  
  const toggleOption = (option: string) => {
    if (disabled) return;
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
        <ListChecks className="w-4 h-4 inline mr-1" /> Select ALL that apply
      </p>
      {question.options?.map((option, idx) => {
        const isSelected = selected.includes(option);
        const isCorrect = correctAnswers.includes(option);
        const isWrong = showFeedback && isSelected && !isCorrect;
        const isMissed = showFeedback && !isSelected && isCorrect;
        
        return (
          <button
            key={idx}
            onClick={() => toggleOption(option)}
            disabled={disabled}
            className={clsx(
              'w-full text-left p-4 rounded-lg border-2 transition-all flex items-start gap-3',
              disabled && 'cursor-not-allowed',
              !showFeedback && isSelected && 'border-primary-500 bg-primary-50 dark:bg-primary-900/20',
              !showFeedback && !isSelected && 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600',
              showFeedback && isSelected && isCorrect && 'border-success-500 bg-success-50 dark:bg-success-900/20',
              isWrong && 'border-error-500 bg-error-50 dark:bg-error-900/20',
              isMissed && 'border-warning-500 bg-warning-50 dark:bg-warning-900/20',
            )}
          >
            <div className={clsx(
              'w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center mt-0.5',
              isSelected ? 'border-primary-500 bg-primary-500' : 'border-slate-300 dark:border-slate-600',
              showFeedback && isSelected && isCorrect && 'border-success-500 bg-success-500',
              isWrong && 'border-error-500 bg-error-500',
            )}>
              {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
            </div>
            <span className={clsx(
              'text-slate-800 dark:text-slate-200',
              isWrong && 'line-through text-error-600 dark:text-error-400',
            )}>
              {option}
              {isMissed && <span className="ml-2 text-warning-600 dark:text-warning-400 text-sm">(should be selected)</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// Dropdown Question
const DropdownInput: React.FC<{
  question: CBQQuestion;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  showFeedback?: boolean;
  isCorrect?: boolean;
}> = ({ question, value, onChange, disabled, showFeedback, isCorrect }) => {
  return (
    <div className="space-y-3">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={clsx(
          'w-full max-w-md px-4 py-3 rounded-lg border-2 transition-colors text-slate-800 dark:text-slate-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          'bg-white dark:bg-slate-800',
          disabled && 'cursor-not-allowed opacity-75',
          showFeedback && isCorrect && 'border-success-500',
          showFeedback && !isCorrect && 'border-error-500',
          !showFeedback && 'border-slate-300 dark:border-slate-600'
        )}
      >
        <option value="">Select an answer...</option>
        {question.options?.map((option, idx) => (
          <option key={idx} value={option}>{option}</option>
        ))}
      </select>
      {showFeedback && (
        <div className={clsx(
          'flex items-start gap-2 p-3 rounded-lg text-sm',
          isCorrect ? 'bg-success-50 dark:bg-success-900/20 text-success-800 dark:text-success-200' : 'bg-error-50 dark:bg-error-900/20 text-error-800 dark:text-error-200'
        )}>
          {isCorrect ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
          <div>
            <span className="font-medium">{isCorrect ? 'Correct!' : 'Incorrect'}</span>
            {!isCorrect && typeof question.correctAnswer === 'string' && (
              <span className="ml-2">Correct: {question.correctAnswer}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Drag and Drop Question (simplified - uses numbered selection)
const DragDropInput: React.FC<{
  question: CBQQuestion;
  order: string[];
  onChange: (val: string[]) => void;
  disabled?: boolean;
  showFeedback?: boolean;
}> = ({ question, order, onChange, disabled, showFeedback }) => {
  const correctOrder = Array.isArray(question.correctAnswer) ? question.correctAnswer : [];
  
  const moveItem = (fromIdx: number, toIdx: number) => {
    if (disabled) return;
    const newOrder = [...order];
    const [item] = newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, item);
    onChange(newOrder);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
        <GripVertical className="w-4 h-4 inline mr-1" /> Drag to reorder (1 = first/highest)
      </p>
      <div className="space-y-2">
        {order.map((item, idx) => {
          const correctIdx = correctOrder.indexOf(item);
          const isCorrectPosition = showFeedback && correctIdx === idx;
          const isWrongPosition = showFeedback && correctIdx !== idx;
          
          return (
            <div
              key={item}
              className={clsx(
                'flex items-center gap-3 p-4 rounded-lg border-2 transition-all',
                !showFeedback && 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800',
                isCorrectPosition && 'border-success-500 bg-success-50 dark:bg-success-900/20',
                isWrongPosition && 'border-error-500 bg-error-50 dark:bg-error-900/20',
              )}
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </span>
                {!disabled && (
                  <div className="flex flex-col">
                    <button
                      onClick={() => idx > 0 && moveItem(idx, idx - 1)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded disabled:opacity-30"
                      disabled={idx === 0}
                    >
                      <ChevronLeft className="w-4 h-4 rotate-90" />
                    </button>
                    <button
                      onClick={() => idx < order.length - 1 && moveItem(idx, idx + 1)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded disabled:opacity-30"
                      disabled={idx === order.length - 1}
                    >
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </button>
                  </div>
                )}
              </div>
              <span className="flex-1 text-slate-800 dark:text-slate-200">{item}</span>
              {showFeedback && isWrongPosition && (
                <span className="text-sm text-error-600 dark:text-error-400">
                  (Should be #{correctIdx + 1})
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// Main Component
// ============================================

const CMACBQSimulator: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sectionParam = searchParams.get('section') as CMASection | null;
  
  // State
  const [selectedSection, setSelectedSection] = useState<CMASection>(sectionParam || 'CMA1');
  const [currentCBQ, setCurrentCBQ] = useState<CBQ | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Map<string, UserAnswer>>(new Map());
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [viewState, setViewState] = useState<'select' | 'scenario' | 'questions' | 'results'>('select');
  const [results, setResults] = useState<QuestionResult[]>([]);

  // Get CBQs for section
  const cbqs = selectedSection === 'CMA1' ? CMA1_CBQS : CMA2_CBQS;

  // Timer
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

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Start CBQ
  const handleStartCBQ = (cbq: CBQ) => {
    setCurrentCBQ(cbq);
    setCurrentQuestionIdx(0);
    setAnswers(new Map());
    setResults([]);
    setTimeLeft(cbq.estimatedTime * 60);
    setIsTimerRunning(true);
    setViewState('scenario');
  };

  // Get/set answer
  const getAnswer = (questionId: string): UserAnswer | undefined => {
    return answers.get(questionId);
  };

  const setAnswer = (questionId: string, answer: UserAnswer['answer']) => {
    const newAnswers = new Map(answers);
    newAnswers.set(questionId, { questionId, answer, isSubmitted: false });
    setAnswers(newAnswers);
  };

  // Check answer correctness
  const checkAnswer = useCallback((question: CBQQuestion, userAnswer: UserAnswer['answer']): { isCorrect: boolean; pointsEarned: number } => {
    let isCorrect = false;
    let pointsEarned = 0;

    switch (question.type) {
      case 'numerical_entry':
        const numAnswer = typeof userAnswer === 'number' ? userAnswer : parseFloat(String(userAnswer));
        const correctNum = question.correctAnswer as number;
        const tolerance = question.tolerance || 0;
        isCorrect = Math.abs(numAnswer - correctNum) <= tolerance;
        pointsEarned = isCorrect ? question.points : 0;
        break;

      case 'dropdown':
        isCorrect = userAnswer === question.correctAnswer;
        pointsEarned = isCorrect ? question.points : 0;
        break;

      case 'multiple_select':
        const selectedOptions = Array.isArray(userAnswer) ? userAnswer : [];
        const correctOptions = question.correctAnswer as string[];
        const correctSelections = selectedOptions.filter(s => correctOptions.includes(s)).length;
        const wrongSelections = selectedOptions.filter(s => !correctOptions.includes(s)).length;
        const missedSelections = correctOptions.filter(c => !selectedOptions.includes(c)).length;
        
        // Partial credit: points for correct selections minus penalty for wrong
        const partialScore = Math.max(0, (correctSelections - wrongSelections) / correctOptions.length);
        isCorrect = wrongSelections === 0 && missedSelections === 0;
        pointsEarned = Math.round(question.points * partialScore);
        break;

      case 'drag_and_drop':
        const userOrder = Array.isArray(userAnswer) ? userAnswer : [];
        const correctOrder = question.correctAnswer as string[];
        const correctPositions = userOrder.filter((item, idx) => item === correctOrder[idx]).length;
        isCorrect = correctPositions === correctOrder.length;
        pointsEarned = Math.round(question.points * (correctPositions / correctOrder.length));
        break;
    }

    return { isCorrect, pointsEarned };
  }, []);

  // Submit all answers
  const handleSubmit = () => {
    if (!currentCBQ) return;
    setIsTimerRunning(false);

    const questionResults: QuestionResult[] = currentCBQ.questions.map(q => {
      const userAnswer = answers.get(q.id);
      const { isCorrect, pointsEarned } = checkAnswer(q, userAnswer?.answer || '');
      return {
        questionId: q.id,
        isCorrect,
        pointsEarned,
        pointsPossible: q.points,
      };
    });

    setResults(questionResults);
    setViewState('results');
  };

  // Calculate total score
  const totalScore = results.reduce((sum, r) => sum + r.pointsEarned, 0);
  const totalPossible = results.reduce((sum, r) => sum + r.pointsPossible, 0);
  const percentScore = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  // Current question
  const currentQuestion = currentCBQ?.questions[currentQuestionIdx];

  // ============================================
  // Render
  // ============================================

  // Selection View
  if (viewState === 'select') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 pb-12">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/cma/dashboard">
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">CBQ Simulator</h1>
          </div>
          <p className="text-emerald-100">Practice Case-Based Questions (effective Sept 2026)</p>
          
          {/* Section Toggle */}
          <div className="mt-4 flex gap-2">
            {(['CMA1', 'CMA2'] as const).map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  selectedSection === section
                    ? 'bg-white text-emerald-700'
                    : 'bg-white/20 text-white hover:bg-white/30'
                )}
              >
                {section === 'CMA1' ? 'Part 1' : 'Part 2'}
              </button>
            ))}
          </div>
        </div>

        {/* CBQ Info Card */}
        <div className="px-4 -mt-6 mb-6">
          <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-emerald-800 dark:text-emerald-200">
                  <p className="font-medium mb-1">About Case-Based Questions (CBQs)</p>
                  <ul className="list-disc list-inside space-y-1 text-emerald-700 dark:text-emerald-300">
                    <li>2 CBQs per exam part (25% of total score)</li>
                    <li>Business scenario with 3-5 related questions</li>
                    <li>Question types: calculations, multi-select, drag-and-drop, dropdowns</li>
                    <li>15-20 minutes per CBQ recommended</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CBQ List */}
        <div className="px-4 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            {selectedSection === 'CMA1' ? 'Part 1' : 'Part 2'} CBQ Scenarios
          </h2>
          
          {cbqs.length === 0 ? (
            <Card className="p-6 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-slate-400 mb-3" />
              <p className="text-slate-600 dark:text-slate-400">No CBQs available for this section yet.</p>
            </Card>
          ) : (
            cbqs.map((cbq) => (
              <Card key={cbq.id} className="overflow-hidden">
                <button
                  onClick={() => handleStartCBQ(cbq)}
                  className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                        {cbq.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {cbq.estimatedTime} min
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {cbq.questions.length} questions
                        </span>
                        <span className={clsx(
                          'px-2 py-0.5 rounded-full text-xs font-medium',
                          cbq.difficulty === 'easy' && 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-300',
                          cbq.difficulty === 'medium' && 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-300',
                          cbq.difficulty === 'hard' && 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-300',
                        )}>
                          {cbq.difficulty}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {cbq.topics.slice(0, 3).map((topic, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs text-slate-600 dark:text-slate-300">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2" />
                  </div>
                </button>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }

  // Scenario View
  if (viewState === 'scenario' && currentCBQ) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
          <div className="p-4 flex items-center justify-between">
            <button onClick={() => setViewState('select')} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
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
            {currentCBQ.title}
          </h1>
          
          <Card className="mb-6">
            <div className="p-6 prose dark:prose-invert max-w-none">
              <ReactMarkdown>{currentCBQ.scenario}</ReactMarkdown>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button
              variant="primary"
              onClick={() => setViewState('questions')}
              rightIcon={ChevronRight}
              className="px-8"
            >
              Start Questions ({currentCBQ.questions.length} questions)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Questions View
  if (viewState === 'questions' && currentCBQ && currentQuestion) {
    const userAnswer = getAnswer(currentQuestion.id);
    
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <button onClick={() => setViewState('scenario')} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <FileText className="w-4 h-4" />
                <span className="text-sm">View Scenario</span>
              </button>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Clock className="w-5 h-5" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
            </div>
            
            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2">
              {currentCBQ.questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIdx(idx)}
                  className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                    idx === currentQuestionIdx && 'bg-primary-500 text-white',
                    idx !== currentQuestionIdx && answers.has(currentCBQ.questions[idx].id) && 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
                    idx !== currentQuestionIdx && !answers.has(currentCBQ.questions[idx].id) && 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-4 max-w-3xl mx-auto">
          <div className="mb-4">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Question {currentQuestionIdx + 1} of {currentCBQ.questions.length} • {currentQuestion.points} points
            </span>
          </div>
          
          <Card className="mb-6">
            <div className="p-6">
              <p className="text-lg text-slate-900 dark:text-white mb-6">
                {currentQuestion.prompt}
              </p>

              {/* Question Type Inputs */}
              {currentQuestion.type === 'numerical_entry' && (
                <NumericalEntryInput
                  question={currentQuestion}
                  value={userAnswer?.answer as number || ''}
                  onChange={(val) => setAnswer(currentQuestion.id, val)}
                />
              )}

              {currentQuestion.type === 'multiple_select' && (
                <MultipleSelectInput
                  question={currentQuestion}
                  selected={(userAnswer?.answer as string[]) || []}
                  onChange={(val) => setAnswer(currentQuestion.id, val)}
                />
              )}

              {currentQuestion.type === 'dropdown' && (
                <DropdownInput
                  question={currentQuestion}
                  value={(userAnswer?.answer as string) || ''}
                  onChange={(val) => setAnswer(currentQuestion.id, val)}
                />
              )}

              {currentQuestion.type === 'drag_and_drop' && (
                <DragDropInput
                  question={currentQuestion}
                  order={(userAnswer?.answer as string[]) || currentQuestion.dragItems || []}
                  onChange={(val) => setAnswer(currentQuestion.id, val)}
                />
              )}

              {/* Hints */}
              {currentQuestion.hints && currentQuestion.hints.length > 0 && (
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">Hint:</p>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 list-disc list-inside">
                    {currentQuestion.hints.map((hint, idx) => (
                      <li key={idx}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setCurrentQuestionIdx(idx => Math.max(0, idx - 1))}
              disabled={currentQuestionIdx === 0}
              leftIcon={ChevronLeft}
            >
              Previous
            </Button>

            {currentQuestionIdx < currentCBQ.questions.length - 1 ? (
              <Button
                variant="primary"
                onClick={() => setCurrentQuestionIdx(idx => idx + 1)}
                rightIcon={ChevronRight}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                rightIcon={CheckCircle}
                className="bg-success-600 hover:bg-success-700"
              >
                Submit All
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results View
  if (viewState === 'results' && currentCBQ) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">
        {/* Header */}
        <div className={clsx(
          'p-6 pb-12',
          percentScore >= 70 ? 'bg-gradient-to-br from-success-600 to-success-700' : 'bg-gradient-to-br from-amber-600 to-amber-700'
        )}>
          <div className="text-center text-white">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">
              {percentScore >= 70 ? 'Great Job!' : 'Keep Practicing!'}
            </h1>
            <p className="text-2xl font-bold">{totalScore} / {totalPossible} points ({percentScore}%)</p>
            <p className="text-sm opacity-80 mt-2">
              Time spent: {formatTime((currentCBQ.estimatedTime * 60) - timeLeft)}
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
              {currentCBQ.questions.map((question, idx) => {
                const result = results.find(r => r.questionId === question.id);
                
                return (
                  <div key={question.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={clsx(
                        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                        result?.isCorrect ? 'bg-success-100 dark:bg-success-900/30' : 'bg-error-100 dark:bg-error-900/30'
                      )}>
                        {result?.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-error-600 dark:text-error-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white mb-1">
                          Q{idx + 1}: {question.prompt}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {result?.pointsEarned} / {result?.pointsPossible} points
                        </p>
                        <div className="text-sm p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <p className="text-slate-700 dark:text-slate-300">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              onClick={() => handleStartCBQ(currentCBQ)}
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
              Choose Another CBQ
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CMACBQSimulator;
