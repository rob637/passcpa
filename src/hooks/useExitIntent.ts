/**
 * useExitIntent Hook
 * 
 * Detects when a user is about to leave the page (moves mouse to top of viewport)
 * and triggers a callback. Used for exit intent modals on pricing/landing pages.
 */

import { useEffect, useCallback, useRef, useState } from 'react';

interface ExitIntentOptions {
  /** Threshold from top of viewport to trigger (default: 20px) */
  threshold?: number;
  /** Only trigger once per session (default: true) */
  triggerOnce?: boolean;
  /** Delay before the detection becomes active (default: 3000ms) */
  delay?: number;
  /** LocalStorage key to track if already shown (default: 'exitIntentShown') */
  storageKey?: string;
  /** Disable on mobile devices (default: true) */
  disableOnMobile?: boolean;
  /** Minimum time on page before enabling (default: 5000ms) */
  minTimeOnPage?: number;
}

interface ExitIntentReturn {
  /** Whether exit intent has been triggered */
  triggered: boolean;
  /** Manually reset the trigger (e.g., after modal closed without action) */
  reset: () => void;
  /** Manually mark as shown (e.g., after user takes action) */
  markAsShown: () => void;
}

export const useExitIntent = (
  onExitIntent: () => void,
  options: ExitIntentOptions = {}
): ExitIntentReturn => {
  const {
    threshold = 20,
    triggerOnce = true,
    delay = 3000,
    storageKey = 'exitIntentShown',
    disableOnMobile = true,
    minTimeOnPage = 5000,
  } = options;

  const [triggered, setTriggered] = useState(false);
  const hasTriggeredRef = useRef(false);
  const pageLoadTimeRef = useRef(Date.now());
  const isActiveRef = useRef(false);

  // Check if already shown in this session
  const hasShownInSession = useCallback(() => {
    if (!triggerOnce) return false;
    try {
      return sessionStorage.getItem(storageKey) === 'true';
    } catch {
      return false;
    }
  }, [storageKey, triggerOnce]);

  // Mark as shown in session storage
  const markAsShown = useCallback(() => {
    try {
      sessionStorage.setItem(storageKey, 'true');
    } catch {
      // Session storage not available
    }
    hasTriggeredRef.current = true;
    setTriggered(true);
  }, [storageKey]);

  // Reset trigger state
  const reset = useCallback(() => {
    hasTriggeredRef.current = false;
    setTriggered(false);
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // Session storage not available
    }
  }, [storageKey]);

  // Check if mobile device
  const isMobile = useCallback(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger when leaving through the top
    if (e.clientY > threshold) return;

    // Check if enough time has passed since page load
    if (Date.now() - pageLoadTimeRef.current < minTimeOnPage) return;

    // Check if detection is active (after delay)
    if (!isActiveRef.current) return;

    // Check if already triggered
    if (hasTriggeredRef.current || hasShownInSession()) return;

    // Trigger the callback
    hasTriggeredRef.current = true;
    setTriggered(true);
    onExitIntent();
  }, [threshold, minTimeOnPage, hasShownInSession, onExitIntent]);

  useEffect(() => {
    // Don't run on mobile if disabled
    if (disableOnMobile && isMobile()) return;

    // Already shown in this session
    if (hasShownInSession()) return;

    // Activate detection after delay
    const activationTimer = setTimeout(() => {
      isActiveRef.current = true;
    }, delay);

    // Add event listener
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(activationTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [delay, disableOnMobile, handleMouseLeave, hasShownInSession, isMobile]);

  return { triggered, reset, markAsShown };
};

export default useExitIntent;
