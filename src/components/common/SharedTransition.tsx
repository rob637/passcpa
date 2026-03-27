/**
 * SharedTransition - Google-style shared element transitions
 * 
 * Uses View Transitions API (Chrome 111+, Safari 18+) with Framer Motion fallback.
 * Creates the illusion of cards morphing into full-screen pages.
 * 
 * Usage:
 * <SharedTransitionCard id="practice" to="/practice">
 *   <CardContent />
 * </SharedTransitionCard>
 * 
 * On destination page:
 * <SharedTransitionTarget id="practice">
 *   <PageHeader />
 * </SharedTransitionTarget>
 */

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import * as feedback from '../../services/feedback';

interface SharedTransitionCardProps {
  /** Unique ID matching the target page's SharedTransitionTarget */
  id: string;
  /** Navigation destination */
  to: string;
  /** Card content */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
  /** Whether to trigger haptic feedback */
  haptic?: boolean;
}

interface SharedTransitionTargetProps {
  /** Unique ID matching the source card's id */
  id: string;
  /** Content that receives the transition */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

// Check if View Transitions API is available
const supportsViewTransitions = typeof document !== 'undefined' && 
  'startViewTransition' in document;

/**
 * Navigates with View Transition API if supported
 */
async function navigateWithTransition(
  navigate: ReturnType<typeof useNavigate>,
  to: string,
  transitionName: string
): Promise<void> {
  if (supportsViewTransitions) {
    // Set the transition name on the clicked element's style
    // The CSS handles the actual animation
    const transition = (document as any).startViewTransition(() => {
      navigate(to);
    });
    
    try {
      await transition.finished;
    } catch {
      // Transition was skipped or cancelled - that's fine
    }
  } else {
    // Fallback: just navigate (PageTransition handles the animation)
    navigate(to);
  }
}

/**
 * Card that animates into a full-screen page using shared element transition
 */
export const SharedTransitionCard: React.FC<SharedTransitionCardProps> = ({
  id,
  to,
  children,
  className,
  haptic = true,
}) => {
  const navigate = useNavigate();

  const handleClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (haptic) {
      feedback.tap();
    }

    await navigateWithTransition(navigate, to, `shared-${id}`);
  }, [navigate, to, id, haptic]);

  return (
    <motion.div
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={clsx('cursor-pointer', className)}
      style={{
        viewTransitionName: supportsViewTransitions ? `shared-${id}` : undefined,
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Target element on destination page that receives the shared transition
 */
export const SharedTransitionTarget: React.FC<SharedTransitionTargetProps> = ({
  id,
  children,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: {
          duration: 0.25,
          ease: [0.2, 0, 0, 1], // Google standard easing
        }
      }}
      className={className}
      style={{
        viewTransitionName: supportsViewTransitions ? `shared-${id}` : undefined,
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Page header with shared transition effect
 * Combines icon, title, and description in a Google-style header
 */
interface PageHeroProps {
  id: string;
  icon: React.ReactNode;
  iconBgClass: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  id,
  icon,
  iconBgClass,
  title,
  subtitle,
  className,
}) => {
  return (
    <SharedTransitionTarget id={id} className={className}>
      <div className="flex items-center gap-4 mb-6">
        <div className={clsx(
          'w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg',
          iconBgClass
        )}>
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </SharedTransitionTarget>
  );
};

export default SharedTransitionCard;
