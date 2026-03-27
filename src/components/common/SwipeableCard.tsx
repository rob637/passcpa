import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  /** Minimum swipe distance to trigger action (default: 80px) */
  threshold?: number;
  /** Show swipe hint arrows */
  showHints?: boolean;
  /** Hint labels */
  leftHint?: string;
  rightHint?: string;
  /** Disable swipe in a direction */
  disableLeft?: boolean;
  disableRight?: boolean;
  /** Additional className */
  className?: string;
  /** Whether swipe is enabled (e.g., disable during answer reveal) */
  enabled?: boolean;
}

/**
 * SwipeableCard - Google-style swipe gesture wrapper
 * 
 * Enables horizontal swipe navigation with visual feedback.
 * Use for Practice questions, Flashcards, or any paginated content.
 */
export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 80,
  showHints = true,
  leftHint = 'Previous',
  rightHint = 'Next',
  disableLeft = false,
  disableRight = false,
  className,
  enabled = true,
}) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Visual feedback opacity based on drag distance
  const leftOpacity = useTransform(x, [0, threshold], [0, 1]);
  const rightOpacity = useTransform(x, [-threshold, 0], [1, 0]);
  
  // Scale feedback
  const scale = useTransform(
    x, 
    [-threshold * 1.5, 0, threshold * 1.5], 
    [0.98, 1, 0.98]
  );
  
  // Rotation for natural feel
  const rotate = useTransform(x, [-200, 0, 200], [-3, 0, 3]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      
      if (!enabled) return;
      
      const { offset, velocity } = info;
      
      // Swipe right (go to previous) - requires positive offset
      if (offset.x > threshold || (offset.x > 40 && velocity.x > 500)) {
        if (!disableLeft && onSwipeRight) {
          onSwipeRight();
        }
      }
      // Swipe left (go to next) - requires negative offset
      else if (offset.x < -threshold || (offset.x < -40 && velocity.x < -500)) {
        if (!disableRight && onSwipeLeft) {
          onSwipeLeft();
        }
      }
    },
    [enabled, threshold, disableLeft, disableRight, onSwipeLeft, onSwipeRight]
  );

  return (
    <div 
      ref={constraintsRef}
      className={clsx('relative overflow-hidden touch-pan-y', className)}
    >
      {/* Left swipe hint (Previous) */}
      {showHints && !disableLeft && onSwipeRight && (
        <motion.div
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1 text-primary-500 pointer-events-none"
          style={{ opacity: leftOpacity }}
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xs font-medium hidden sm:inline">{leftHint}</span>
        </motion.div>
      )}
      
      {/* Right swipe hint (Next) */}
      {showHints && !disableRight && onSwipeLeft && (
        <motion.div
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1 text-primary-500 pointer-events-none"
          style={{ opacity: rightOpacity }}
        >
          <span className="text-xs font-medium hidden sm:inline">{rightHint}</span>
          <ChevronRight className="w-6 h-6" />
        </motion.div>
      )}

      {/* Swipeable content */}
      <motion.div
        drag={enabled ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x, scale, rotate }}
        className={clsx(
          'cursor-grab active:cursor-grabbing',
          isDragging && 'select-none'
        )}
        whileTap={{ cursor: 'grabbing' }}
      >
        {children}
      </motion.div>

      {/* Swipe indicator dots (mobile hint) */}
      {showHints && (
        <div className="flex justify-center gap-2 mt-3 md:hidden">
          {!disableLeft && onSwipeRight && (
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"
              style={{ 
                scale: useTransform(x, [0, threshold], [1, 1.5]),
                backgroundColor: useTransform(
                  x, 
                  [0, threshold], 
                  ['rgb(203 213 225)', 'rgb(59 130 246)']
                )
              }}
            />
          )}
          <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
          {!disableRight && onSwipeLeft && (
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"
              style={{ 
                scale: useTransform(x, [-threshold, 0], [1.5, 1]),
                backgroundColor: useTransform(
                  x, 
                  [-threshold, 0], 
                  ['rgb(59 130 246)', 'rgb(203 213 225)']
                )
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SwipeableCard;
