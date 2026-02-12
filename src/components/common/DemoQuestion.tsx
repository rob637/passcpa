/**
 * DemoQuestion.tsx
 * 
 * Interactive demo question component for landing pages.
 * Allows visitors to experience the question UI before signing up.
 */

import { useState } from 'react';
import { CheckCircle, XCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface DemoQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  topic: string;
  registerPath: string;
  primaryColor?: string;
}

export const DemoQuestion = ({
  question,
  options,
  correctAnswer,
  explanation,
  section,
  topic,
  registerPath,
  primaryColor = 'blue',
}: DemoQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return; // Already answered
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  const colorClasses = {
    blue: { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200' },
    emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200' },
    purple: { bg: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-200' },
    amber: { bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-200' },
    green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50', border: 'border-green-200' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600', light: 'bg-cyan-50', border: 'border-cyan-200' },
  };
  
  const colors = colorClasses[primaryColor as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg">
      {/* Header */}
      <div className={clsx('px-6 py-4', colors.light, 'dark:bg-slate-700/50')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={clsx('px-2 py-1 rounded text-xs font-bold text-white', colors.bg)}>
              {section}
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400">{topic}</span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Try it free
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <p className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-6">
          {question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === correctAnswer;
            const showResult = selectedAnswer !== null;

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={selectedAnswer !== null}
                className={clsx(
                  'w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200',
                  !showResult && 'hover:border-slate-400 dark:hover:border-slate-500 cursor-pointer',
                  showResult && isCorrectOption && 'border-green-500 bg-green-50 dark:bg-green-900/20',
                  showResult && isSelected && !isCorrectOption && 'border-red-500 bg-red-50 dark:bg-red-900/20',
                  !showResult && 'border-slate-200 dark:border-slate-600',
                  showResult && !isSelected && !isCorrectOption && 'border-slate-200 dark:border-slate-600 opacity-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={clsx(
                    'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                    showResult && isCorrectOption && 'bg-green-500 text-white',
                    showResult && isSelected && !isCorrectOption && 'bg-red-500 text-white',
                    !showResult && 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  )}>
                    {showResult && isCorrectOption ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : showResult && isSelected && !isCorrectOption ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className={clsx(
                    'text-slate-700 dark:text-slate-300',
                    showResult && isCorrectOption && 'font-semibold text-green-700 dark:text-green-300',
                    showResult && isSelected && !isCorrectOption && 'text-red-700 dark:text-red-300'
                  )}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={clsx(
            'mt-6 p-4 rounded-xl',
            isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
          )}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-amber-600" />
              )}
              <span className={clsx(
                'font-semibold',
                isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}>
                {isCorrect ? 'Correct!' : 'Not quite'}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {explanation}
            </p>
          </div>
        )}

        {/* CTA */}
        {showExplanation && (
          <div className="mt-6 text-center">
            <Link
              to={registerPath}
              className={clsx(
                'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5',
                colors.bg
              )}
            >
              Try More Questions Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              3,000+ practice questions with detailed explanations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoQuestion;
