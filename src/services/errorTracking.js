// Error Tracking & Monitoring Service
// Production-grade error handling for world-class quality

import { analytics } from '../config/firebase';

// Error severity levels
export const ErrorSeverity = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

// Error categories
export const ErrorCategory = {
  NETWORK: 'network',
  AUTH: 'auth',
  FIREBASE: 'firebase',
  UI: 'ui',
  VALIDATION: 'validation',
  AI: 'ai',
  UNKNOWN: 'unknown',
};

// Error queue for batching
let errorQueue = [];
let flushTimeout = null;
const FLUSH_INTERVAL = 5000; // 5 seconds
const MAX_QUEUE_SIZE = 10;

/**
 * Initialize error tracking
 */
export const initErrorTracking = () => {
  // Global error handler
  window.onerror = (message, source, lineno, colno, error) => {
    captureError(error || new Error(message), {
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
 * Capture and track an error
 */
export const captureError = (error, context = {}) => {
  const errorData = {
    timestamp: new Date().toISOString(),
    message: error?.message || String(error),
    stack: error?.stack,
    category: categorizeError(error),
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
export const captureMetric = (name, data = {}) => {
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
 * Categorize error by type
 */
const categorizeError = (error) => {
  const message = error?.message?.toLowerCase() || '';

  if (message.includes('network') || message.includes('fetch') || message.includes('cors')) {
    return ErrorCategory.NETWORK;
  }
  if (
    message.includes('auth') ||
    message.includes('permission') ||
    message.includes('unauthorized')
  ) {
    return ErrorCategory.AUTH;
  }
  if (message.includes('firebase') || message.includes('firestore')) {
    return ErrorCategory.FIREBASE;
  }
  if (message.includes('render') || message.includes('component') || message.includes('react')) {
    return ErrorCategory.UI;
  }
  if (message.includes('validation') || message.includes('invalid')) {
    return ErrorCategory.VALIDATION;
  }
  if (message.includes('ai') || message.includes('gemini') || message.includes('api')) {
    return ErrorCategory.AI;
  }

  return ErrorCategory.UNKNOWN;
};

/**
 * Get or create session ID
 */
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('errorTracking_sessionId');
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('errorTracking_sessionId', sessionId);
  }
  return sessionId;
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

  // In production, this would send to a logging service
  // For now, we'll log to console and could integrate with:
  // - Sentry
  // - LogRocket
  // - Firebase Crashlytics (for native apps)
  // - Custom backend endpoint

  if (import.meta.env.PROD) {
    try {
      // Example: Send to custom endpoint
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ errors: errorsToSend }),
      // });

      // For now, store in localStorage for debugging
      const storedErrors = JSON.parse(localStorage.getItem('errorLog') || '[]');
      const updatedErrors = [...storedErrors, ...errorsToSend].slice(-50); // Keep last 50
      localStorage.setItem('errorLog', JSON.stringify(updatedErrors));
    } catch (e) {
      console.error('[ErrorTracking] Failed to flush errors:', e);
    }
  }
};

/**
 * Create error boundary wrapper
 * Note: This should be used as a class component, not a function
 */
export const createErrorBoundaryClass = (fallbackComponent = null) => {
  // This function returns configuration for use with React's error boundary
  // The actual ErrorBoundary component is in components/common/ErrorBoundary.jsx
  return {
    fallback: fallbackComponent,
    onError: (error, errorInfo) => {
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
export const collectFeedback = async (errorId, feedback) => {
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

  const stats = {
    total: errors.length,
    byCategory: {},
    bySeverity: {},
    last24h: 0,
  };

  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  errors.forEach((error) => {
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
