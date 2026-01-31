// QuestionFlagging Component
// Allows users to flag questions for review, report errors, or mark as too difficult

import React, { useState, useCallback } from 'react';
import logger from '../../utils/logger';
import { useAuth } from '../../hooks/useAuth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { announce } from '../../utils/accessibility';
import clsx from 'clsx';

export type FlagType = 
  | 'review'          // Flag for personal review later
  | 'difficult'       // Mark as challenging
  | 'error'          // Report potential error in question
  | 'outdated'       // Flag as potentially outdated
  | 'confusing'      // Question wording is confusing
  | 'helpful';       // Mark as particularly helpful

export interface QuestionFlag {
  questionId: string;
  type: FlagType;
  comment?: string;
  createdAt: any;
  section: string;
  topic?: string;
}

interface QuestionFlaggingProps {
  questionId: string;
  section: string;
  topic?: string;
  onFlagSubmit?: (flag: QuestionFlag) => void;
  compact?: boolean;
}

const FLAG_OPTIONS: Array<{
  type: FlagType;
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}> = [
  {
    type: 'review',
    label: 'Review Later',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    description: 'Mark this question to review again later',
  },
  {
    type: 'difficult',
    label: 'Challenging',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    description: 'Mark as a difficult question for extra practice',
  },
  {
    type: 'helpful',
    label: 'Very Helpful',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    description: 'Mark as a high-quality, helpful question',
  },
  {
    type: 'confusing',
    label: 'Confusing',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    description: 'The question wording is unclear or confusing',
  },
  {
    type: 'error',
    label: 'Report Error',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    description: 'Report an error in the question or answer',
  },
  {
    type: 'outdated',
    label: 'Outdated',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    description: 'This content may be outdated or incorrect',
  },
];

export const QuestionFlagging: React.FC<QuestionFlaggingProps> = ({
  questionId,
  section,
  topic,
  onFlagSubmit,
  compact = false,
}) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<FlagType | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!user?.uid || !selectedType) return;

    setIsSubmitting(true);

    const flag: QuestionFlag = {
      questionId,
      type: selectedType,
      comment: comment.trim() || undefined,
      createdAt: serverTimestamp(),
      section,
      topic,
    };

    try {
      // Save to user's flags collection
      const userFlagRef = doc(db, 'users', user.uid, 'flags', `${questionId}_${selectedType}`);
      await setDoc(userFlagRef, flag);

      // Also save to global flags for admin review (if error or outdated)
      if (selectedType === 'error' || selectedType === 'outdated' || selectedType === 'confusing') {
        const globalFlagRef = doc(db, 'questionFlags', `${questionId}_${user.uid}_${Date.now()}`);
        await setDoc(globalFlagRef, {
          ...flag,
          userId: user.uid,
          userEmail: user.email,
          status: 'pending',
        });
      }

      setSubmitted(true);
      announce('Flag submitted successfully', 'polite');
      
      if (onFlagSubmit) {
        onFlagSubmit(flag);
      }

      // Reset after showing success
      setTimeout(() => {
        setIsOpen(false);
        setSelectedType(null);
        setComment('');
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      logger.error('Error submitting flag:', error);
      announce('Failed to submit flag. Please try again.', 'assertive');
    } finally {
      setIsSubmitting(false);
    }
  }, [user, questionId, selectedType, comment, section, topic, onFlagSubmit]);

  if (!user) {
    return null; // Flagging requires login
  }

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Flag question"
          aria-expanded={isOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50">
            <div className="p-3 border-b border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">Flag Question</h4>
            </div>
            <div className="p-2">
              {FLAG_OPTIONS.slice(0, 4).map((option) => (
                <button
                  key={option.type}
                  onClick={() => {
                    setSelectedType(option.type);
                    handleSubmit();
                  }}
                  className={clsx(
                    'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors',
                    'hover:bg-slate-100 dark:hover:bg-slate-700',
                    selectedType === option.type && option.color
                  )}
                >
                  {option.icon}
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        aria-expanded={isOpen}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
        <span className="text-sm font-medium">
          {isOpen ? 'Hide options' : 'Flag this question'}
        </span>
        <svg 
          className={clsx('w-4 h-4 transition-transform', isOpen && 'rotate-180')} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {submitted ? (
            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-700 dark:text-green-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Thank you for your feedback!</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FLAG_OPTIONS.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setSelectedType(option.type)}
                    className={clsx(
                      'flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all',
                      selectedType === option.type
                        ? `${option.color} border-current`
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    )}
                    aria-pressed={selectedType === option.type}
                    title={option.description}
                  >
                    {option.icon}
                    <span className="text-xs font-medium text-center">{option.label}</span>
                  </button>
                ))}
              </div>

              {selectedType && (
                <div className="space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {FLAG_OPTIONS.find(o => o.type === selectedType)?.description}
                  </p>
                  
                  {(selectedType === 'error' || selectedType === 'outdated' || selectedType === 'confusing') && (
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Please describe the issue (optional but helpful)..."
                      className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      aria-label="Additional comments"
                    />
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Flag'}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedType(null);
                        setComment('');
                      }}
                      className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Quick Flag Button - Simple toggle for review flag
 */
export const QuickFlagButton: React.FC<{
  questionId: string;
  section: string;
  isFlagged?: boolean;
  onToggle?: (flagged: boolean) => void;
}> = ({ questionId, section, isFlagged = false, onToggle }) => {
  const { user } = useAuth();
  const [flagged, setFlagged] = useState(isFlagged);

  const handleToggle = useCallback(async () => {
    if (!user?.uid) return;

    const newFlagged = !flagged;
    setFlagged(newFlagged);

    try {
      const flagRef = doc(db, 'users', user.uid, 'flags', `${questionId}_review`);
      if (newFlagged) {
        await setDoc(flagRef, {
          questionId,
          type: 'review',
          section,
          createdAt: serverTimestamp(),
        });
        announce('Question flagged for review', 'polite');
      } else {
        const { deleteDoc } = await import('firebase/firestore');
        await deleteDoc(flagRef);
        announce('Flag removed', 'polite');
      }

      if (onToggle) {
        onToggle(newFlagged);
      }
    } catch (error) {
      logger.error('Error toggling flag:', error);
      setFlagged(!newFlagged); // Revert on error
    }
  }, [user, questionId, section, flagged, onToggle]);

  if (!user) return null;

  return (
    <button
      onClick={handleToggle}
      className={clsx(
        'p-2 rounded-lg transition-all',
        flagged
          ? 'text-amber-600 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/30 dark:hover:bg-amber-900/50'
          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
      )}
      aria-pressed={flagged}
      aria-label={flagged ? 'Remove flag' : 'Flag for review'}
      title={flagged ? 'Remove flag' : 'Flag for review'}
    >
      <svg 
        className="w-5 h-5" 
        fill={flagged ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" 
        />
      </svg>
    </button>
  );
};

export default QuestionFlagging;
