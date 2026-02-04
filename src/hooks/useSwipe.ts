import { useRef, useCallback, TouchEvent } from 'react';

interface SwipeHandlers {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  enabled?: boolean;
}

/**
 * Hook for handling horizontal swipe gestures on mobile
 * @param options - Callbacks for swipe left/right and threshold configuration
 * @returns Touch event handlers to spread on your component
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  enabled = true,
}: UseSwipeOptions): SwipeHandlers {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchMoveX = useRef<number | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchMoveX.current = null;
  }, [enabled]);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!enabled || touchStartX.current === null) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - (touchStartY.current || 0);
    
    // Only track horizontal swipes (ignore if vertical movement is greater)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      touchMoveX.current = currentX;
    }
  }, [enabled]);

  const onTouchEnd = useCallback(() => {
    if (!enabled || touchStartX.current === null || touchMoveX.current === null) {
      touchStartX.current = null;
      touchStartY.current = null;
      touchMoveX.current = null;
      return;
    }

    const deltaX = touchMoveX.current - touchStartX.current;

    if (Math.abs(deltaX) >= threshold) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchMoveX.current = null;
  }, [enabled, threshold, onSwipeLeft, onSwipeRight]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

export default useSwipe;
