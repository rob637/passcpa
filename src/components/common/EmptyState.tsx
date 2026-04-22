/**
 * EmptyState - Google Material Design 3 empty state component
 * 
 * Used when lists/views have no content to display.
 * Features SVG illustrations that match the context.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Search, BookOpen, Target, Brain, FileText, Calendar, Trophy, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export type EmptyStateType = 
  | 'no-results'      // Search returned nothing
  | 'no-lessons'      // No lessons completed/available
  | 'no-practice'     // No practice sessions yet
  | 'no-flashcards'   // No flashcards studied  
  | 'no-progress'     // No activity yet
  | 'no-bookmarks'    // No saved items
  | 'no-plan'         // No study plan created
  | 'achievement'     // Celebration state
  | 'offline'         // No internet connection
  | 'error'           // Something went wrong
  | 'custom';         // Custom icon provided

interface EmptyStateProps {
  /** Type of empty state - determines illustration */
  type: EmptyStateType;
  /** Main heading */
  title: string;
  /** Supporting description */
  description?: string;
  /** Call-to-action button */
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  /** Secondary action */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  /** Custom icon (only for type="custom") */
  icon?: LucideIcon;
  /** Custom icon color class */
  iconColorClass?: string;
  /** Additional className */
  className?: string;
  /** Compact mode for inline empty states */
  compact?: boolean;
}

// Icon mapping for each type
const TYPE_CONFIG: Record<EmptyStateType, { icon: LucideIcon; color: string; bg: string }> = {
  'no-results': { 
    icon: Search, 
    color: 'text-slate-400 dark:text-slate-500',
    bg: 'bg-slate-100 dark:bg-slate-800'
  },
  'no-lessons': { 
    icon: BookOpen, 
    color: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30'
  },
  'no-practice': { 
    icon: Target, 
    color: 'text-primary-500 dark:text-primary-400',
    bg: 'bg-primary-100 dark:bg-primary-900/30'
  },
  'no-flashcards': { 
    icon: Brain, 
    color: 'text-amber-500 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/30'
  },
  'no-progress': { 
    icon: Sparkles, 
    color: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/30'
  },
  'no-bookmarks': { 
    icon: FileText, 
    color: 'text-purple-500 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-900/30'
  },
  'no-plan': { 
    icon: Calendar, 
    color: 'text-indigo-500 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-900/30'
  },
  'achievement': { 
    icon: Trophy, 
    color: 'text-yellow-500 dark:text-yellow-400',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30'
  },
  'offline': { 
    icon: Search, 
    color: 'text-slate-400 dark:text-slate-500',
    bg: 'bg-slate-100 dark:bg-slate-800'
  },
  'error': { 
    icon: Search, 
    color: 'text-red-500 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30'
  },
  'custom': { 
    icon: Sparkles, 
    color: 'text-primary-500 dark:text-primary-400',
    bg: 'bg-primary-100 dark:bg-primary-900/30'
  },
};

/**
 * Google-style empty state with illustration
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  action,
  secondaryAction,
  icon: CustomIcon,
  iconColorClass,
  className,
  compact = false,
}) => {
  const config = TYPE_CONFIG[type];
  const Icon = type === 'custom' && CustomIcon ? CustomIcon : config.icon;
  const colorClass = iconColorClass || config.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      className={clsx(
        'flex flex-col items-center text-center',
        compact ? 'py-8 px-4' : 'py-16 px-6',
        className
      )}
      role="status"
      aria-label={title}
    >
      {/* Illustration */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.34, 1.56, 0.64, 1] // Bounce effect
        }}
        className={clsx(
          'rounded-2xl flex items-center justify-center mb-6',
          config.bg,
          compact ? 'w-16 h-16' : 'w-20 h-20'
        )}
      >
        <Icon className={clsx(
          colorClass,
          compact ? 'w-8 h-8' : 'w-10 h-10'
        )} />
      </motion.div>

      {/* Title */}
      <h3 className={clsx(
        'font-bold text-slate-900 dark:text-white mb-2',
        compact ? 'text-lg' : 'text-xl'
      )}>
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className={clsx(
          'text-slate-600 dark:text-slate-400 max-w-sm',
          compact ? 'text-sm mb-4' : 'text-base mb-6'
        )}>
          {description}
        </p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className={clsx(
          'flex gap-3',
          compact ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'
        )}>
          {action && (
            <button
              onClick={action.onClick}
              className={clsx(
                'px-6 py-2.5 rounded-xl font-semibold transition-all',
                action.variant === 'secondary'
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200'
                  : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25'
              )}
            >
              {action.label}
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="px-6 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
