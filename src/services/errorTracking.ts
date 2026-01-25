// Error Tracking & Monitoring Service
// Production-grade error handling for world-class quality

import { analytics, db, auth } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// Error categories
export enum ErrorCategory {
  NETWORK = 'network',
  AUTH = 'auth',
  FIREBASE = 'firebase',
  UI = 'ui',
  VALIDATION = 'validation',
  AI = 'ai',
  UNKNOWN = 'unknown',
}

// Error queue for batching
let errorQueue: ErrorData[] = [];
let flushTimeout: any = null;
const FLUSH_INTERVAL = 5000; // 5 seconds
const MAX_QUEUE_SIZE = 10;

export interface ErrorContext {
  severity?: ErrorSeverity;
  source?: string;
  type?: string;
  lineno?: number;
  colno?: number;
  componentStack?: string;
  category?: ErrorCategory;
  [key: string]: any;
}

export interface ErrorData {
  timestamp: string;
  message: string;
  stack?: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  context: Record<string, any>;
  sessionId: string;
}

/**
 * Initialize error tracking
 */
export const initErrorTracking = (): void => {
  // Global error handler
  window.onerror = (message, source, lineno, colno, error) => {
    captureError(error || new Error(String(message)), {
      source,
      lineno,
      colno,
      severity: ErrorSeverity.HIGH,
    });
    return false; // Allow default handling
  };

  // Unhandled promise rejections
  window.onunhandledrejection = (event) => {
    captureError(event.reason, {
      type: 'unhandledrejection',
      severity: ErrorSeverity.HIGH,
    });
  };

  // Performance observer for long tasks
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 100) {
            // Tasks over 100ms
            captureMetric('long_task', {
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long task observation not supported
    }
  }

  console.log('[ErrorTracking] Initialized');
};

/**
 * Get session ID for tracking
 */
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('errorTracking_sessionId');
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('errorTracking_sessionId', sessionId);
  }
  return sessionId;
};

/**
 * Categorize error by type
 */
const categorizeError = (error: any): ErrorCategory => {
  const message = error?.message?.toLowerCase() || '';

  if (message.includes('network') || message.includes('fetch') || message.includes('offline')) {
    return ErrorCategory.NETWORK;
  }
  if (message.includes('auth') || message.includes('permission') || message.includes('denied')) {
    return ErrorCategory.AUTH;
  }
  if (message.includes('firebase') || message.includes('firestore')) {
    return ErrorCategory.FIREBASE;
  }
  if (error?.name === 'ReactError' || message.includes('react')) {
    return ErrorCategory.UI;
  }
  if (message.includes('validation') || message.includes('invalid')) {
    return ErrorCategory.VALIDATION;
  }
  
  return ErrorCategory.UNKNOWN;
};

/**
 * Capture and track an error
 */
export const captureError = (error: any, context: ErrorContext = {}): ErrorData => {
  const errorData: ErrorData = {
    timestamp: new Date().toISOString(),
    message: error?.message || String(error),
    stack: error?.stack,
    category: context.category || categorizeError(error),
    severity: context.severity || ErrorSeverity.MEDIUM,
    context: {
      ...context,
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    },
    sessionId: getSessionId(),
  };

  // Add to queue
  errorQueue.push(errorData);

  // Log in development
  if (import.meta.env.DEV) {
    console.error('[ErrorTracking]', errorData);
  }

  // Flush if queue is full or critical
  if (errorQueue.length >= MAX_QUEUE_SIZE || context.severity === ErrorSeverity.CRITICAL) {
    flushErrors();
  } else {
    scheduleFlush();
  }

  return errorData;
};

/**
 * Capture a metric/event
 */
export const captureMetric = (name: string, data: Record<string, any> = {}): any => {
  const metric = {
    name,
    timestamp: new Date().toISOString(),
    data,
    sessionId: getSessionId(),
  };

  if (import.meta.env.DEV) {
    console.log('[Metric]', metric);
  }

  // Send to analytics
  if (analytics) {
    try {
      // Log to Firebase Analytics
      // This would use logEvent in production
    } catch (e) {
      // Analytics not available
    }
  }

  return metric;
};

/**
 * Schedule error flush
 */
const scheduleFlush = () => {
  if (flushTimeout) return;
  flushTimeout = setTimeout(() => {
    flushErrors();
    flushTimeout = null;
  }, FLUSH_INTERVAL);
};

/**
 * Flush error queue
 */
const flushErrors = async () => {
  if (errorQueue.length === 0) return;

  const errorsToSend = [...errorQueue];
  errorQueue = [];

  // Log to Firestore (Cost-effective alternative to Sentry)
  try {
    const errorCollection = collection(db, 'error_logs');
    
    // Batch write would be better, but for simplicity loop
    const promises = errorsToSend.map(err => 
      addDoc(errorCollection, {
        ...err,
        syncedAt: serverTimestamp(),
        userId: auth.currentUser?.uid || 'anonymous'
      })
    );

    await Promise.allSettled(promises);
    
    // Also log to console if in dev
    if (import.meta.env.DEV && errorsToSend.length > 0) {
      console.log(`[ErrorTracking] Flushed ${errorsToSend.length} errors`);
    }

    // Save to local storage as backup if offline
    if (!navigator.onLine) {
       const storedErrors = JSON.parse(localStorage.getItem('errorQueueBackup') || '[]');
       const newStoredErrors = [...storedErrors, ...errorsToSend].slice(-50); // Keep last 50
       localStorage.setItem('errorQueueBackup', JSON.stringify(newStoredErrors));
    }
  } catch (e) {
    console.error('[ErrorTracking] Failed to sync errors', e);
    // Put back in queue? maybe, but risk loop
  }
};

/**
 * Create error boundary wrapper
 * Note: This should be used as a class component, not a function
 */
export const createErrorBoundaryClass = (fallbackComponent: any = null) => {
  // This function returns configuration for use with React's error boundary
  // The actual ErrorBoundary component is in components/common/ErrorBoundary.jsx
  return {
    fallback: fallbackComponent,
    onError: (error: Error, errorInfo: any) => {
      captureError(error, {
        componentStack: errorInfo.componentStack,
        severity: ErrorSeverity.HIGH,
        category: ErrorCategory.UI,
      });
    },
  };
};

/**
 * User feedback collection for errors
 */
export const collectFeedback = async (errorId: string, feedback: string) => {
  const feedbackData = {
    errorId,
    feedback,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
  };

  if (import.meta.env.DEV) {
    console.log('[Feedback]', feedbackData);
  }

  // Store feedback
  const storedFeedback = JSON.parse(localStorage.getItem('errorFeedback') || '[]');
  storedFeedback.push(feedbackData);
  localStorage.setItem('errorFeedback', JSON.stringify(storedFeedback.slice(-20)));

  return feedbackData;
};

/**
 * Get error statistics
 */
export const getErrorStats = () => {
  const errors = JSON.parse(localStorage.getItem('errorLog') || '[]');

  const stats: any = {
    total: errors.length,
    byCategory: {},
    bySeverity: {},
    last24h: 0,
  };

  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  errors.forEach((error: any) => {
    // By category
    stats.byCategory[error.category] = (stats.byCategory[error.category] || 0) + 1;

    // By severity
    stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;

    // Last 24h
    if (new Date(error.timestamp) > dayAgo) {
      stats.last24h++;
    }
  });

  return stats;
};

export default {
  initErrorTracking,
  captureError,
  captureMetric,
  ErrorSeverity,
  ErrorCategory,
  createErrorBoundaryClass,
  collectFeedback,
  getErrorStats,
};
