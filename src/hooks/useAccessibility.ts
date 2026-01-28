// useAccessibility Hook
// React hook for accessibility utilities

import { useEffect, useRef, useCallback, useState } from 'react';
import {
  announce,
  announceImmediate,
  FocusTrap,
  mediaPreferences,
  ariaHelpers,
  focusVisible,
} from '../utils/accessibility';

/**
 * Hook for screen reader announcements
 */
export const useAnnounce = () => {
  return {
    announce: useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
      announce(message, priority);
    }, []),
    announceImmediate: useCallback((message: string) => {
      announceImmediate(message);
    }, []),
    announceProgress: useCallback((current: number, total: number, action?: string) => {
      return ariaHelpers.announceProgress(current, total, action);
    }, []),
    announceResult: useCallback((isCorrect: boolean, explanation?: string) => {
      ariaHelpers.announceResult(isCorrect, explanation);
    }, []),
  };
};

/**
 * Hook for focus trap management
 */
export const useFocusTrap = (active = false) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const trapRef = useRef<FocusTrap | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    if (active) {
      trapRef.current = new FocusTrap(elementRef.current);
      trapRef.current.activate();
    }

    return () => {
      trapRef.current?.deactivate();
    };
  }, [active]);

  const setElement = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
  }, []);

  return {
    ref: setElement,
    activate: useCallback(() => trapRef.current?.activate(), []),
    deactivate: useCallback((restoreFocus?: boolean) => trapRef.current?.deactivate(restoreFocus), []),
  };
};

/**
 * Hook for media preferences (reduced motion, dark mode, etc.)
 */
export const useMediaPreferences = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    mediaPreferences.prefersReducedMotion()
  );
  const [prefersDarkMode, setPrefersDarkMode] = useState(
    mediaPreferences.prefersDarkMode()
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [prefersHighContrast, _setPrefersHighContrast] = useState(
    mediaPreferences.prefersHighContrast()
  );

  useEffect(() => {
    const unsubMotion = mediaPreferences.onReducedMotionChange(setPrefersReducedMotion);
    const unsubColor = mediaPreferences.onColorSchemeChange(setPrefersDarkMode);
    
    return () => {
      unsubMotion();
      unsubColor();
    };
  }, []);

  return {
    prefersReducedMotion,
    prefersDarkMode,
    prefersHighContrast,
    prefersReducedTransparency: mediaPreferences.prefersReducedTransparency(),
    prefersLowContrast: mediaPreferences.prefersLowContrast(),
  };
};

/**
 * Hook for keyboard-only focus styles
 */
export const useFocusVisible = () => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const cleanup = focusVisible.init();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      cleanup();
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isKeyboardUser;
};

/**
 * Hook for managing ARIA expanded state
 */
export const useAriaExpanded = (initialState = false) => {
  const [isExpanded, setIsExpanded] = useState(initialState);
  const triggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);

  const toggle = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const expand = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const collapse = useCallback(() => {
    setIsExpanded(false);
  }, []);

  useEffect(() => {
    if (triggerRef.current && panelRef.current) {
      ariaHelpers.setExpanded(triggerRef.current, panelRef.current, isExpanded);
    }
  }, [isExpanded]);

  return {
    isExpanded,
    toggle,
    expand,
    collapse,
    triggerProps: {
      ref: (el: HTMLElement | null) => { triggerRef.current = el; },
      'aria-expanded': isExpanded,
      onClick: toggle,
    },
    panelProps: {
      ref: (el: HTMLElement | null) => { panelRef.current = el; },
      'aria-hidden': !isExpanded,
    },
  };
};

/**
 * Hook for roving tabindex pattern (for toolbars, tab lists, etc.)
 */
export const useRovingTabindex = <T extends HTMLElement>(
  items: T[],
  options: {
    orientation?: 'horizontal' | 'vertical' | 'both';
    wrap?: boolean;
    initialIndex?: number;
  } = {}
) => {
  const { orientation = 'horizontal', wrap = true, initialIndex = 0 } = options;
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    items.forEach((item, index) => {
      item.setAttribute('tabindex', index === activeIndex ? '0' : '-1');
    });
  }, [items, activeIndex]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    let newIndex = activeIndex;
    const maxIndex = items.length - 1;

    const isVertical = orientation === 'vertical' || orientation === 'both';
    const isHorizontal = orientation === 'horizontal' || orientation === 'both';

    switch (event.key) {
      case 'ArrowDown':
        if (isVertical) {
          event.preventDefault();
          newIndex = wrap 
            ? (activeIndex + 1) % items.length 
            : Math.min(activeIndex + 1, maxIndex);
        }
        break;
      case 'ArrowUp':
        if (isVertical) {
          event.preventDefault();
          newIndex = wrap 
            ? (activeIndex - 1 + items.length) % items.length 
            : Math.max(activeIndex - 1, 0);
        }
        break;
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          newIndex = wrap 
            ? (activeIndex + 1) % items.length 
            : Math.min(activeIndex + 1, maxIndex);
        }
        break;
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          newIndex = wrap 
            ? (activeIndex - 1 + items.length) % items.length 
            : Math.max(activeIndex - 1, 0);
        }
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = maxIndex;
        break;
      default:
        return;
    }

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      items[newIndex]?.focus();
    }
  }, [activeIndex, items, orientation, wrap]);

  return {
    activeIndex,
    setActiveIndex,
    handleKeyDown,
    getItemProps: (index: number) => ({
      tabIndex: index === activeIndex ? 0 : -1,
      onKeyDown: handleKeyDown,
    }),
  };
};

/**
 * Hook for timer announcements (exam timing)
 */
export const useTimerAnnouncement = (secondsRemaining: number, thresholds?: number[]) => {
  const prevSecondsRef = useRef(secondsRemaining);
  const { announce: doAnnounce } = useAnnounce();

  useEffect(() => {
    // Only announce when crossing threshold boundaries
    if (prevSecondsRef.current !== secondsRemaining) {
      ariaHelpers.announceTimer(secondsRemaining, thresholds);
      prevSecondsRef.current = secondsRemaining;
    }
  }, [secondsRemaining, thresholds, doAnnounce]);
};

/**
 * Hook for loading state announcements
 */
export const useLoadingAnnouncement = (isLoading: boolean, customMessage?: string) => {
  const prevLoadingRef = useRef(isLoading);

  useEffect(() => {
    if (prevLoadingRef.current !== isLoading) {
      if (isLoading) {
        announce(customMessage || 'Loading...', 'polite');
      } else if (prevLoadingRef.current) {
        announce('Content loaded', 'polite');
      }
      prevLoadingRef.current = isLoading;
    }
  }, [isLoading, customMessage]);
};

export default {
  useAnnounce,
  useFocusTrap,
  useMediaPreferences,
  useFocusVisible,
  useAriaExpanded,
  useRovingTabindex,
  useTimerAnnouncement,
  useLoadingAnnouncement,
};
