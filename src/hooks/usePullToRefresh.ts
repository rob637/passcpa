import { useState, useRef, useCallback, useEffect, TouchEvent } from 'react';

interface PullToRefreshState {
  isPulling: boolean;
  isRefreshing: boolean;
  pullDistance: number;
}

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void>;
  threshold?: number;
  maxPull?: number;
  enabled?: boolean;
}

interface PullToRefreshHandlers {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

interface UsePullToRefreshReturn extends PullToRefreshState, PullToRefreshHandlers {
  indicatorStyle: React.CSSProperties;
}

/**
 * Hook for implementing pull-to-refresh on mobile
 * @param options - Configuration for the pull-to-refresh behavior
 * @returns State, handlers, and indicator styling
 */
export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  maxPull = 120,
  enabled = true,
}: UsePullToRefreshOptions): UsePullToRefreshReturn {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  
  const touchStartY = useRef<number | null>(null);
  const scrollTop = useRef<number>(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      scrollTop.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled || isRefreshing) return;
    // Only enable when at top of page
    if (scrollTop.current > 5) return;
    
    touchStartY.current = e.touches[0].clientY;
    setIsPulling(true);
  }, [enabled, isRefreshing]);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!enabled || !isPulling || touchStartY.current === null || isRefreshing) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY.current;
    
    // Only track downward pulls
    if (deltaY > 0) {
      // Apply resistance as the pull gets longer
      const resistance = 0.5;
      const distance = Math.min(deltaY * resistance, maxPull);
      setPullDistance(distance);
    }
  }, [enabled, isPulling, isRefreshing, maxPull]);

  const onTouchEnd = useCallback(async () => {
    if (!enabled || !isPulling) return;
    
    setIsPulling(false);
    touchStartY.current = null;

    if (pullDistance >= threshold && !isRefreshing) {
      // Trigger refresh
      setIsRefreshing(true);
      setPullDistance(threshold); // Lock at threshold during refresh
      
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      // Snap back
      setPullDistance(0);
    }
  }, [enabled, isPulling, pullDistance, threshold, isRefreshing, onRefresh]);

  // Calculate indicator style
  const progress = Math.min(pullDistance / threshold, 1);
  const indicatorStyle: React.CSSProperties = {
    transform: `translateY(${pullDistance - 40}px) rotate(${progress * 360}deg)`,
    opacity: progress,
    transition: isPulling ? 'none' : 'all 0.3s ease-out',
  };

  return {
    isPulling,
    isRefreshing,
    pullDistance,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    indicatorStyle,
  };
}

export default usePullToRefresh;
