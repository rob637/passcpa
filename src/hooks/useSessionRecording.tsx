/**
 * useSessionRecording Hook
 * 
 * Auto-wires session recording throughout the app.
 * Tracks every page view, click, and user interaction.
 * 
 * Usage:
 * - Add <SessionRecordingProvider> at app root
 * - Use useSessionRecording() in components for manual tracking
 */

import { useEffect, useCallback, useRef, createContext, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import sessionRecorder, { ActivityType, getPageName } from '../services/sessionRecordingService';
import logger from '../utils/logger';

// Context for session recording
interface SessionRecordingContextValue {
  sessionId: string | null;
  trackClick: (element: string, elementType: string, target?: string, metadata?: Record<string, unknown>) => void;
  trackCustomEvent: (type: ActivityType, details: Record<string, unknown>) => void;
  trackError: (errorMessage: string, metadata?: Record<string, unknown>) => void;
  isRecording: boolean;
}

const SessionRecordingContext = createContext<SessionRecordingContextValue | null>(null);

// Get relevant text from an element for tracking
const getElementText = (element: HTMLElement): string => {
  // Try aria-label first
  if (element.getAttribute('aria-label')) {
    return element.getAttribute('aria-label') || '';
  }
  
  // Try data-track-label
  if (element.getAttribute('data-track-label')) {
    return element.getAttribute('data-track-label') || '';
  }
  
  // Try title attribute
  if (element.title) {
    return element.title;
  }
  
  // For buttons and links, get text content
  if (element.tagName === 'BUTTON' || element.tagName === 'A') {
    // Get text content but exclude SVG/icon elements
    const textNodes = Array.from(element.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE || 
        (node instanceof HTMLElement && !['SVG', 'PATH', 'CIRCLE', 'RECT', 'LINE'].includes(node.tagName)))
      .map(node => node.textContent?.trim())
      .filter(Boolean);
    
    if (textNodes.length > 0) {
      return textNodes.join(' ').substring(0, 100);
    }
  }
  
  // For inputs, get placeholder or name
  if (element.tagName === 'INPUT') {
    const input = element as HTMLInputElement;
    // Never track password values
    if (input.type === 'password') {
      return '[password field]';
    }
    return input.placeholder || input.name || input.type || 'input';
  }
  
  // For checkboxes and radios
  if (element.tagName === 'INPUT' && ['checkbox', 'radio'].includes((element as HTMLInputElement).type)) {
    const label = element.closest('label')?.textContent?.trim();
    if (label) return label.substring(0, 100);
  }
  
  // Get closest text content
  const textContent = element.textContent?.trim();
  if (textContent && textContent.length < 100) {
    return textContent;
  }
  
  // Fallback to class name or ID
  if (element.id) {
    return `#${element.id}`;
  }
  if (element.className && typeof element.className === 'string') {
    const classes = element.className.split(' ').slice(0, 3).join('.');
    return `.${classes}`;
  }
  
  return element.tagName.toLowerCase();
};

// Get element type for tracking
const getElementType = (element: HTMLElement): string => {
  const tagName = element.tagName.toLowerCase();
  
  if (tagName === 'button') return 'button';
  if (tagName === 'a') return 'link';
  if (tagName === 'input') {
    const type = (element as HTMLInputElement).type;
    return `input:${type}`;
  }
  if (tagName === 'select') return 'select';
  if (tagName === 'textarea') return 'textarea';
  
  // Check for role attribute
  const role = element.getAttribute('role');
  if (role) return role;
  
  // Check for common interactive classes
  if (element.classList.contains('btn') || element.classList.contains('button')) {
    return 'button';
  }
  
  return tagName;
};

// Session Recording Provider Component
export function SessionRecordingProvider({ children }: { children: ReactNode }) {
  const { user, userProfile } = useAuth();
  const location = useLocation();
  const sessionIdRef = useRef<string | null>(null);
  const lastPathRef = useRef<string>('');
  const isSetupRef = useRef(false);

  // Debug: Log provider mount with timestamp
  useEffect(() => {
    console.log('🔴🔴🔴 [SessionRecording] NEW CODE LOADED AT', new Date().toISOString());
    console.log('[SessionRecording] Provider mounted, user:', user?.uid ? 'logged in as ' + user.uid : 'not logged in');
  }, []);

  // Start session when user logs in
  useEffect(() => {
    console.log('[SessionRecording] Effect triggered, user.uid:', user?.uid, 'isSetup:', isSetupRef.current);
    
    const initSession = async () => {
      if (!user?.uid) {
        console.log('[SessionRecording] No user, skipping session start');
        return;
      }
      if (isSetupRef.current) {
        console.log('[SessionRecording] Already setup, skipping');
        return;
      }
      
      isSetupRef.current = true;
      console.log('[SessionRecording] Starting session for user:', user.uid);
      
      sessionIdRef.current = await sessionRecorder.startSession(
        user.uid,
        user.email || undefined,
        userProfile?.displayName || user.displayName || undefined
      );
      
      console.log('[SessionRecording] Provider initialized, session:', sessionIdRef.current);
    };

    initSession();

    return () => {
      // End session on unmount (tab close, logout)
      if (sessionIdRef.current) {
        sessionRecorder.endSession();
      }
    };
  }, [user?.uid, user?.email, user?.displayName, userProfile?.displayName]);

  // Track page views on route changes
  useEffect(() => {
    console.log('[SessionRecording] Route effect - path:', location.pathname, 'user:', user?.uid, 'lastPath:', lastPathRef.current);
    
    if (!user?.uid || location.pathname === lastPathRef.current) return;
    
    console.log('[SessionRecording] 🚀 Tracking page view:', location.pathname);
    lastPathRef.current = location.pathname;
    sessionRecorder.trackPageView(location.pathname, {
      search: location.search,
      hash: location.hash,
    });
  }, [location.pathname, location.search, user?.uid]);

  // Global click handler
  useEffect(() => {
    if (!user?.uid) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      // Find the clickable element (may be a child of button/link)
      const clickableElement = target.closest('button, a, [role="button"], input, select, [data-track]');
      if (!clickableElement) {
        // Track non-interactive clicks only if they have data-track
        if (target.hasAttribute('data-track')) {
          sessionRecorder.trackClick(
            getElementText(target),
            getElementType(target),
            location.pathname,
            undefined,
            { x: event.clientX, y: event.clientY }
          );
        }
        return;
      }

      const element = clickableElement as HTMLElement;
      const elementText = getElementText(element);
      const elementType = getElementType(element);
      let targetUrl: string | undefined;

      // Get target URL for links
      if (element.tagName === 'A') {
        targetUrl = (element as HTMLAnchorElement).href;
      }

      // Don't track if explicitly opted out
      if (element.hasAttribute('data-no-track')) {
        return;
      }

      sessionRecorder.trackClick(
        elementText,
        elementType,
        location.pathname,
        targetUrl,
        {
          x: event.clientX,
          y: event.clientY,
          dataTrack: element.getAttribute('data-track'),
        }
      );
    };

    // Add click listener
    document.addEventListener('click', handleClick, { capture: true, passive: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [location.pathname, user?.uid]);

  // Handle visibility changes (tab switch, minimize)
  useEffect(() => {
    if (!user?.uid) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User is leaving - flush activities
        sessionRecorder.trackCustomEvent('page_view', location.pathname, {
          metadata: { visibility: 'hidden' },
        });
      } else {
        // User is back
        sessionRecorder.trackCustomEvent('page_view', location.pathname, {
          metadata: { visibility: 'visible' },
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location.pathname, user?.uid]);

  // Heartbeat every 30 seconds to detect active sessions more reliably
  useEffect(() => {
    if (!user?.uid) return;

    const heartbeatInterval = setInterval(() => {
      // Silent heartbeat - just updates lastActivityAt in session
      sessionRecorder.heartbeat();
    }, 30000); // Every 30 seconds

    return () => {
      clearInterval(heartbeatInterval);
    };
  }, [user?.uid]);

  // Handle before unload (page close/refresh) with sendBeacon fallback
  useEffect(() => {
    if (!user?.uid) return;

    const handleBeforeUnload = () => {
      // End session - endSession() flushes any pending activities to Firestore
      // Note: In future, could add sendBeacon to a Cloud Function for more reliable tracking
      sessionRecorder.endSession();
    };

    // Use both events for maximum coverage
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
    };
  }, [user?.uid]);

  // Manual tracking functions
  const trackClick = useCallback((
    element: string,
    elementType: string,
    target?: string,
    metadata?: Record<string, unknown>
  ) => {
    sessionRecorder.trackClick(element, elementType, location.pathname, target, metadata);
  }, [location.pathname]);

  const trackCustomEvent = useCallback((
    type: ActivityType,
    details: Record<string, unknown>
  ) => {
    sessionRecorder.trackCustomEvent(type, location.pathname, details);
  }, [location.pathname]);

  const trackError = useCallback((
    errorMessage: string,
    metadata?: Record<string, unknown>
  ) => {
    sessionRecorder.trackError(errorMessage, location.pathname, metadata);
  }, [location.pathname]);

  const contextValue: SessionRecordingContextValue = {
    sessionId: sessionIdRef.current,
    trackClick,
    trackCustomEvent,
    trackError,
    isRecording: !!sessionIdRef.current && !!user?.uid,
  };

  return (
    <SessionRecordingContext.Provider value={contextValue}>
      {children}
    </SessionRecordingContext.Provider>
  );
}

// Hook to use session recording
export function useSessionRecording(): SessionRecordingContextValue {
  const context = useContext(SessionRecordingContext);
  
  if (!context) {
    // Return safe no-op functions when used outside provider
    return {
      sessionId: null,
      trackClick: () => {},
      trackCustomEvent: () => {},
      trackError: () => {},
      isRecording: false,
    };
  }

  return context;
}

// Quick hook for tracking specific events
export function useTrackEvent() {
  const { trackCustomEvent } = useSessionRecording();
  return trackCustomEvent;
}

// Quick hook for tracking errors
export function useTrackError() {
  const { trackError } = useSessionRecording();
  return trackError;
}

export default useSessionRecording;
