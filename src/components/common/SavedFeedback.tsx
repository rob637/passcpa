import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Cloud, CloudOff } from 'lucide-react';
import clsx from 'clsx';

export interface SavedFeedbackProps {
  /** Whether to show the feedback */
  show: boolean;
  /** Type of feedback */
  type?: 'saved' | 'saving' | 'error' | 'synced';
  /** Custom message */
  message?: string;
  /** Position */
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
  /** Additional className */
  className?: string;
}

const feedbackConfig = {
  saved: {
    icon: Check,
    message: 'Saved',
    bgClass: 'bg-green-500',
    textClass: 'text-white',
  },
  saving: {
    icon: Cloud,
    message: 'Saving...',
    bgClass: 'bg-slate-500',
    textClass: 'text-white',
  },
  error: {
    icon: CloudOff,
    message: 'Not saved',
    bgClass: 'bg-red-500',
    textClass: 'text-white',
  },
  synced: {
    icon: Cloud,
    message: 'Synced',
    bgClass: 'bg-primary-500',
    textClass: 'text-white',
  },
};

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-20 right-4 md:bottom-4',
  'bottom-center': 'bottom-20 left-1/2 -translate-x-1/2 md:bottom-4',
};

/**
 * SavedFeedback - Google-style micro-feedback indicator
 * 
 * Shows brief "Saved ✓" feedback after user actions to build trust.
 * Auto-dismisses after animation completes.
 */
export const SavedFeedback: React.FC<SavedFeedbackProps> = ({
  show,
  type = 'saved',
  message,
  position = 'top-right',
  className,
}) => {
  const config = feedbackConfig[type];
  const Icon = config.icon;
  const displayMessage = message || config.message;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ 
            duration: 0.2, 
            ease: [0.2, 0, 0, 1] // Google standard easing
          }}
          className={clsx(
            'fixed z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg',
            config.bgClass,
            config.textClass,
            positionClasses[position],
            className
          )}
          role="status"
          aria-live="polite"
        >
          <Icon className={clsx(
            'w-4 h-4',
            type === 'saving' && 'animate-pulse'
          )} />
          <span className="text-sm font-medium">{displayMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Hook to manage saved feedback state with auto-dismiss
 */
export const useSavedFeedback = (autoDismissMs = 2000) => {
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [feedbackType, setFeedbackType] = React.useState<SavedFeedbackProps['type']>('saved');
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const showSaved = React.useCallback((type: SavedFeedbackProps['type'] = 'saved') => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setFeedbackType(type);
    setShowFeedback(true);
    
    // Auto-dismiss (except for 'saving' state)
    if (type !== 'saving') {
      timeoutRef.current = setTimeout(() => {
        setShowFeedback(false);
      }, autoDismissMs);
    }
  }, [autoDismissMs]);

  const hideFeedback = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowFeedback(false);
  }, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    showFeedback,
    feedbackType,
    showSaved,
    hideFeedback,
  };
};

export default SavedFeedback;
