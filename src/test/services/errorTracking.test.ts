import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Firebase
vi.mock('../../config/firebase', () => ({
  analytics: null,
  db: {},
  auth: { currentUser: null },
}));

// Mock Firestore
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn().mockResolvedValue({ id: 'test-doc-id' }),
  serverTimestamp: vi.fn(() => new Date().toISOString()),
  onSnapshot: vi.fn(() => vi.fn()),
}));

import {
  initErrorTracking,
  captureError,
  captureMetric,
  createErrorBoundaryClass,
  collectFeedback,
  getErrorStats,
  ErrorSeverity,
  ErrorCategory,
} from '../../services/errorTracking';

describe('errorTracking', () => {
  let originalOnError: typeof window.onerror;
  let originalOnUnhandledRejection: typeof window.onunhandledrejection;
  let originalPerformanceObserver: typeof PerformanceObserver;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Store original handlers
    originalOnError = window.onerror;
    originalOnUnhandledRejection = window.onunhandledrejection;
    originalPerformanceObserver = window.PerformanceObserver;
    
    // Reset session storage
    sessionStorage.clear();
    localStorage.clear();
    
    // Spy on console methods
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    window.onerror = originalOnError;
    window.onunhandledrejection = originalOnUnhandledRejection;
    window.PerformanceObserver = originalPerformanceObserver;
    vi.restoreAllMocks();
  });

  describe('ErrorSeverity enum', () => {
    it('should have LOW value', () => {
      expect(ErrorSeverity.LOW).toBe('low');
    });

    it('should have MEDIUM value', () => {
      expect(ErrorSeverity.MEDIUM).toBe('medium');
    });

    it('should have HIGH value', () => {
      expect(ErrorSeverity.HIGH).toBe('high');
    });

    it('should have CRITICAL value', () => {
      expect(ErrorSeverity.CRITICAL).toBe('critical');
    });
  });

  describe('ErrorCategory enum', () => {
    it('should have NETWORK value', () => {
      expect(ErrorCategory.NETWORK).toBe('network');
    });

    it('should have AUTH value', () => {
      expect(ErrorCategory.AUTH).toBe('auth');
    });

    it('should have FIREBASE value', () => {
      expect(ErrorCategory.FIREBASE).toBe('firebase');
    });

    it('should have UI value', () => {
      expect(ErrorCategory.UI).toBe('ui');
    });

    it('should have VALIDATION value', () => {
      expect(ErrorCategory.VALIDATION).toBe('validation');
    });

    it('should have AI value', () => {
      expect(ErrorCategory.AI).toBe('ai');
    });

    it('should have UNKNOWN value', () => {
      expect(ErrorCategory.UNKNOWN).toBe('unknown');
    });
  });

  describe('initErrorTracking', () => {
    it('should set up global error handler', () => {
      initErrorTracking();
      expect(window.onerror).toBeDefined();
      expect(typeof window.onerror).toBe('function');
    });

    it('should set up unhandled rejection handler', () => {
      initErrorTracking();
      expect(window.onunhandledrejection).toBeDefined();
      expect(typeof window.onunhandledrejection).toBe('function');
    });

    it('should log initialization message', () => {
      initErrorTracking();
      expect(console.log).toHaveBeenCalledWith('[ErrorTracking] Initialized');
    });

    it('should handle global errors via onerror', () => {
      initErrorTracking();
      const error = new Error('Test global error');
      const result = (window.onerror as Function)('Test message', 'test.js', 10, 20, error);
      
      // Should return false to allow default handling
      expect(result).toBe(false);
    });

    it('should handle global errors without error object', () => {
      initErrorTracking();
      const result = (window.onerror as Function)('Test message', 'test.js', 10, 20, null);
      expect(result).toBe(false);
    });

    it('should handle unhandled promise rejections', () => {
      initErrorTracking();
      const event = { reason: new Error('Promise rejection') };
      (window.onunhandledrejection as Function)(event);
      
      // Should not throw
    });

    it('should set up PerformanceObserver for long tasks', () => {
      const mockObserve = vi.fn();
      const MockPerformanceObserver = vi.fn(() => ({
        observe: mockObserve,
      }));
      
      window.PerformanceObserver = MockPerformanceObserver as any;
      
      initErrorTracking();
      
      expect(MockPerformanceObserver).toHaveBeenCalled();
    });

    it('should handle PerformanceObserver not supported', () => {
      // @ts-ignore
      delete window.PerformanceObserver;
      
      // Should not throw
      expect(() => initErrorTracking()).not.toThrow();
    });
  });

  describe('captureError', () => {
    it('should capture error with default context', () => {
      const error = new Error('Test error');
      const result = captureError(error);

      expect(result).toMatchObject({
        message: 'Test error',
        severity: ErrorSeverity.MEDIUM,
      });
      expect(result.timestamp).toBeDefined();
      expect(result.sessionId).toBeDefined();
    });

    it('should capture error with custom severity', () => {
      const error = new Error('Critical error');
      const result = captureError(error, { severity: ErrorSeverity.CRITICAL });

      expect(result.severity).toBe(ErrorSeverity.CRITICAL);
    });

    it('should capture error with custom category', () => {
      const error = new Error('Auth error');
      const result = captureError(error, { category: ErrorCategory.AUTH });

      expect(result.category).toBe(ErrorCategory.AUTH);
    });

    it('should categorize network errors', () => {
      const error = new Error('Network request failed');
      const result = captureError(error);

      expect(result.category).toBe(ErrorCategory.NETWORK);
    });

    it('should categorize fetch errors as network', () => {
      const error = new Error('fetch failed');
      const result = captureError(error);

      expect(result.category).toBe(ErrorCategory.NETWORK);
    });

    it('should categorize offline errors as network', () => {
      const error = new Error('offline mode');
      const result = captureError(error);

      expect(result.category).toBe(ErrorCategory.NETWORK);
    });

    it('should categorize auth errors', () => {
      const error = new Error('Authentication required');
      const result = captureError(error);

      expect(result.category).toBe(ErrorCategory.AUTH);
    });

    it('should categorize permission denied as auth', () => {
      const error = new Error('permission denied');
      const result = captureError(error);

      expect(result.category).toBe(ErrorCategory.AUTH);
    });

    it('should categorize firebase errors', () => {
      const error = new Error('Firebase error occurred');
      const result = captureError(error);

      expect(result.category).toBe(ErrorCategory.FIREBASE);
    });

    it('should categorize firestore errors', () => {
      const error = new Error('firestore read failed');
      const result = captureError(error);

      expect(result.category).toBe(ErrorCategory.FIREBASE);
    });

    it('should categorize React errors as UI', () => {
      const error = new Error('React component error');
      error.name = 'ReactError';
      const result = captureError(error);

      expect(result.category).toBe(ErrorCategory.UI);
    });

    it('should categorize react errors by message', () => {
      const error = new Error('react render failed');
      const result = captureError(error);

      expect(result.category).toBe(ErrorCategory.UI);
    });

    it('should categorize validation errors', () => {
      const error = new Error('Validation failed');
      const result = captureError(error);

      expect(result.category).toBe(ErrorCategory.VALIDATION);
    });

    it('should categorize invalid input errors as validation', () => {
      const error = new Error('invalid input');
      const result = captureError(error);

      expect(result.category).toBe(ErrorCategory.VALIDATION);
    });

    it('should categorize unknown errors', () => {
      const error = new Error('Something strange happened');
      const result = captureError(error);

      expect(result.category).toBe(ErrorCategory.UNKNOWN);
    });

    it('should handle non-Error objects', () => {
      const result = captureError('String error');

      expect(result.message).toBe('String error');
      expect(result.stack).toBeUndefined();
    });

    it('should capture error stack', () => {
      const error = new Error('Error with stack');
      const result = captureError(error);

      expect(result.stack).toBeDefined();
      expect(result.stack).toContain('Error with stack');
    });

    it('should include context information', () => {
      const error = new Error('Test');
      const result = captureError(error, { source: 'test.js', lineno: 42 });

      expect(result.context.source).toBe('test.js');
      expect(result.context.lineno).toBe(42);
      expect(result.context.url).toBeDefined();
      expect(result.context.userAgent).toBeDefined();
      expect(result.context.viewport).toBeDefined();
    });

    it('should generate consistent session ID', () => {
      const error = new Error('Test');
      const result1 = captureError(error);
      const result2 = captureError(error);

      expect(result1.sessionId).toBe(result2.sessionId);
    });

    it('should log error in development', () => {
      const error = new Error('Dev error');
      captureError(error);

      expect(console.error).toHaveBeenCalled();
    });

    it('should handle errors with null message', () => {
      const error = { message: null };
      const result = captureError(error);

      // String(error) will be '[object Object]'
      expect(typeof result.message).toBe('string');
    });
  });

  describe('captureMetric', () => {
    it('should capture metric with name and data', () => {
      const result = captureMetric('test_metric', { value: 42 });

      expect(result).toMatchObject({
        name: 'test_metric',
        data: { value: 42 },
      });
      expect(result.timestamp).toBeDefined();
      expect(result.sessionId).toBeDefined();
    });

    it('should capture metric without data', () => {
      const result = captureMetric('simple_metric');

      expect(result.name).toBe('simple_metric');
      expect(result.data).toEqual({});
    });

    it('should log metric in development', () => {
      captureMetric('test_metric', { value: 1 });

      expect(console.log).toHaveBeenCalled();
    });
  });

  describe('createErrorBoundaryClass', () => {
    it('should return error boundary configuration', () => {
      const fallback = 'Error occurred' as unknown as React.ReactNode;
      const config = createErrorBoundaryClass(fallback);

      expect(config.fallback).toBe(fallback);
      expect(typeof config.onError).toBe('function');
    });

    it('should return config with null fallback when not provided', () => {
      const config = createErrorBoundaryClass();

      expect(config.fallback).toBeNull();
    });

    it('should capture error in onError callback', () => {
      const config = createErrorBoundaryClass();
      const error = new Error('Component error');
      const errorInfo = { componentStack: 'at Component' };

      config.onError(error, errorInfo);

      // Should not throw
    });
  });

  describe('collectFeedback', () => {
    it('should collect feedback for an error', async () => {
      const result = await collectFeedback('error-123', 'This is helpful feedback');

      expect(result).toMatchObject({
        errorId: 'error-123',
        feedback: 'This is helpful feedback',
      });
      expect(result.timestamp).toBeDefined();
      expect(result.sessionId).toBeDefined();
    });

    it('should return feedback data with timestamp', async () => {
      const result = await collectFeedback('error-123', 'Feedback');

      expect(typeof result.timestamp).toBe('string');
      expect(new Date(result.timestamp).getTime()).not.toBeNaN();
    });

    it('should return feedback data with sessionId', async () => {
      const result = await collectFeedback('error-123', 'Feedback');

      expect(typeof result.sessionId).toBe('string');
      expect(result.sessionId.startsWith('sess_')).toBe(true);
    });

    it('should log feedback in development', async () => {
      await collectFeedback('error-123', 'Test feedback');

      expect(console.log).toHaveBeenCalled();
    });
  });

  describe('getErrorStats', () => {
    it('should return stats object with correct shape', () => {
      const stats = getErrorStats();

      expect(stats).toHaveProperty('total');
      expect(stats).toHaveProperty('byCategory');
      expect(stats).toHaveProperty('bySeverity');
      expect(stats).toHaveProperty('last24h');
    });

    it('should return number for total', () => {
      const stats = getErrorStats();

      expect(typeof stats.total).toBe('number');
    });

    it('should return object for byCategory', () => {
      const stats = getErrorStats();

      expect(typeof stats.byCategory).toBe('object');
    });

    it('should return object for bySeverity', () => {
      const stats = getErrorStats();

      expect(typeof stats.bySeverity).toBe('object');
    });

    it('should return number for last24h', () => {
      const stats = getErrorStats();

      expect(typeof stats.last24h).toBe('number');
    });
  });
});
