import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

// Navigation session modes
export type NavigationMode = 'free-browse' | 'daily-plan' | 'timed-quiz' | 'exam';

// Breadcrumb item
export interface Crumb {
  label: string;
  path: string;
}

// Session state
export interface NavigationSession {
  mode: NavigationMode;
  origin: string;              // Where to return when session ends
  activityId?: string;         // Current daily plan activity ID
  activityTitle?: string;      // For display purposes
  startedAt: number;
  breadcrumbs: Crumb[];        // Dynamic path for drill-down pages
}

// Context value
interface NavigationContextValue {
  session: NavigationSession;
  
  // Session management
  startDailyPlanSession: (activityId: string, activityTitle: string) => void;
  startTimedSession: (mode: 'timed-quiz' | 'exam', returnPath?: string) => void;
  endSession: () => void;
  isInSession: () => boolean;
  getReturnPath: () => string;
  
  // Breadcrumb management
  pushBreadcrumb: (crumb: Crumb) => void;
  popBreadcrumb: () => void;
  setBreadcrumbs: (crumbs: Crumb[]) => void;
  clearBreadcrumbs: () => void;
}

const defaultSession: NavigationSession = {
  mode: 'free-browse',
  origin: '/home',
  startedAt: Date.now(),
  breadcrumbs: [],
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

// Session storage key
const SESSION_KEY = 'voraprep-nav-session';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<NavigationSession>(() => {
    // Restore from session storage
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as NavigationSession;
        // Check if session is still valid (not timed out)
        if (Date.now() - parsed.startedAt < SESSION_TIMEOUT) {
          return parsed;
        }
      }
    } catch {
      // Ignore parse errors
    }
    return defaultSession;
  });

  // Persist session to storage
  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }, [session]);

  // Check for session timeout periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (session.mode !== 'free-browse') {
        const elapsed = Date.now() - session.startedAt;
        if (elapsed > SESSION_TIMEOUT) {
          setSession(defaultSession);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [session]);

  const startDailyPlanSession = useCallback((activityId: string, activityTitle: string) => {
    setSession({
      mode: 'daily-plan',
      origin: '/home',
      activityId,
      activityTitle,
      startedAt: Date.now(),
      breadcrumbs: [],
    });
  }, []);

  const startTimedSession = useCallback((mode: 'timed-quiz' | 'exam', returnPath?: string) => {
    setSession({
      mode,
      origin: returnPath || '/home',
      startedAt: Date.now(),
      breadcrumbs: [],
    });
  }, []);

  const endSession = useCallback(() => {
    setSession(defaultSession);
  }, []);

  const isInSession = useCallback(() => {
    return session.mode !== 'free-browse';
  }, [session.mode]);

  const getReturnPath = useCallback(() => {
    // In a session, always return to origin
    if (session.mode !== 'free-browse') {
      return session.origin;
    }
    return '/home';
  }, [session]);

  const pushBreadcrumb = useCallback((crumb: Crumb) => {
    setSession(prev => ({
      ...prev,
      breadcrumbs: [...prev.breadcrumbs.filter(c => c.path !== crumb.path), crumb],
    }));
  }, []);

  const popBreadcrumb = useCallback(() => {
    setSession(prev => ({
      ...prev,
      breadcrumbs: prev.breadcrumbs.slice(0, -1),
    }));
  }, []);

  const setBreadcrumbs = useCallback((crumbs: Crumb[]) => {
    setSession(prev => ({
      ...prev,
      breadcrumbs: crumbs,
    }));
  }, []);

  const clearBreadcrumbs = useCallback(() => {
    setSession(prev => ({
      ...prev,
      breadcrumbs: [],
    }));
  }, []);

  const value: NavigationContextValue = {
    session,
    startDailyPlanSession,
    startTimedSession,
    endSession,
    isInSession,
    getReturnPath,
    pushBreadcrumb,
    popBreadcrumb,
    setBreadcrumbs,
    clearBreadcrumbs,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

// Default/noop context for when used outside provider (e.g., in tests)
const noopContext: NavigationContextValue = {
  session: defaultSession,
  startDailyPlanSession: () => {},
  startTimedSession: () => {},
  endSession: () => {},
  isInSession: () => false,
  getReturnPath: () => '/home',
  pushBreadcrumb: () => {},
  popBreadcrumb: () => {},
  setBreadcrumbs: () => {},
  clearBreadcrumbs: () => {},
};

export const useNavigation = (): NavigationContextValue => {
  const context = useContext(NavigationContext);
  // Return noop context if not wrapped in provider (safe for tests)
  return context ?? noopContext;
};

export default NavigationProvider;
