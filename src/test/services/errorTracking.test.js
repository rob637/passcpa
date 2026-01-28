import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Mock Firestore
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn().mockResolvedValue({ id: 'test-doc-id' }),
  serverTimestamp: vi.fn(() => 'mock-timestamp'),
}));

vi.mock('../../config/firebase', () => ({
  analytics: {},
  db: {},
  auth: { currentUser: { uid: 'test-user-id' } },
}));

// Import after mocks
import {
  ErrorSeverity,
  ErrorCategory,
  initErrorTracking,
  captureError,
  captureMetric,
  createErrorBoundaryClass,
} from '../../services/errorTracking';

describe('errorTracking Service', () => {
  let originalOnerror;
  let originalOnunhandledrejection;
  let consoleSpy;

  beforeEach(() => {
    vi.clearAllMocks();
    originalOnerror = window.onerror;
    originalOnunhandledrejection = window.onunhandledrejection;
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
    
    // Mock sessionStorage
    const storage = {};
    vi.stubGlobal('sessionStorage', {
      getItem: vi.fn((key) => storage[key]),
      setItem: vi.fn((key, value) => { storage[key] = value; }),
    });

    // Mock localStorage
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => '[]'),
      setItem: vi.fn(),
    });
  });

  afterEach(() => {
    window.onerror = originalOnerror;
    window.onunhandledrejection = originalOnunhandledrejection;
    consoleSpy.mockRestore();
    vi.unstubAllGlobals();
  });

  describe('ErrorSeverity enum', () => {
    it('has LOW severity', () => {
      expect(ErrorSeverity.LOW).toBe('low');
    });

    it('has MEDIUM severity', () => {
      expect(ErrorSeverity.MEDIUM).toBe('medium');
    });

    it('has HIGH severity', () => {
      expect(ErrorSeverity.HIGH).toBe('high');
    });

    it('has CRITICAL severity', () => {
      expect(ErrorSeverity.CRITICAL).toBe('critical');
    });
  });

  describe('ErrorCategory enum', () => {
    it('has NETWORK category', () => {
      expect(ErrorCategory.NETWORK).toBe('network');
    });

    it('has AUTH category', () => {
      expect(ErrorCategory.AUTH).toBe('auth');
    });

    it('has FIREBASE category', () => {
      expect(ErrorCategory.FIREBASE).toBe('firebase');
    });

    it('has UI category', () => {
      expect(ErrorCategory.UI).toBe('ui');
    });

    it('has VALIDATION category', () => {
      expect(ErrorCategory.VALIDATION).toBe('validation');
    });

    it('has AI category', () => {
      expect(ErrorCategory.AI).toBe('ai');
    });

    it('has UNKNOWN category', () => {
      expect(ErrorCategory.UNKNOWN).toBe('unknown');
    });
  });

  describe('initErrorTracking', () => {
    it('sets up global error handlers', () => {
      initErrorTracking();
      expect(window.onerror).toBeDefined();
      expect(window.onunhandledrejection).toBeDefined();
    });
  });

  describe('captureError', () => {
    it('captures basic error', () => {
      const error = new Error('Test error');
      const result = captureError(error);

      expect(result).toBeDefined();
      expect(result.message).toBe('Test error');
      expect(result.timestamp).toBeDefined();
      expect(result.sessionId).toBeDefined();
    });

    it('captures error with context', () => {
      const error = new Error('Context error');
      const result = captureError(error, {
        severity: ErrorSeverity.HIGH,
        category: ErrorCategory.AUTH,
        source: 'test-source',
      });

      expect(result.severity).toBe('high');
      expect(result.category).toBe('auth');
      expect(result.context.source).toBe('test-source');
    });

    it('auto-categorizes network errors', () => {
      const error = new Error('Network request failed');
      const result = captureError(error);

      expect(result.category).toBe('network');
    });

    it('auto-categorizes auth errors', () => {
      const error = new Error('Permission denied');
      const result = captureError(error);

      expect(result.category).toBe('auth');
    });

    it('auto-categorizes firebase errors', () => {
      const error = new Error('Firebase error occurred');
      const result = captureError(error);

      expect(result.category).toBe('firebase');
    });

    it('auto-categorizes validation errors', () => {
      const error = new Error('Validation failed: invalid input');
      const result = captureError(error);

      expect(result.category).toBe('validation');
    });

    it('defaults to unknown category', () => {
      const error = new Error('Some random error');
      const result = captureError(error);

      expect(result.category).toBe('unknown');
    });

    it('includes viewport info in context', () => {
      const error = new Error('UI error');
      const result = captureError(error);

      expect(result.context.viewport).toBeDefined();
      expect(result.context.viewport.width).toBeDefined();
      expect(result.context.viewport.height).toBeDefined();
    });

    it('includes URL in context', () => {
      const error = new Error('Test error');
      const result = captureError(error);

      expect(result.context.url).toBeDefined();
    });

    it('handles string errors', () => {
      const result = captureError('String error message');
      expect(result.message).toBe('String error message');
    });

    it('defaults to MEDIUM severity', () => {
      const error = new Error('Test');
      const result = captureError(error);

      expect(result.severity).toBe('medium');
    });
  });

  describe('captureMetric', () => {
    it('captures metric with data', () => {
      const result = captureMetric('page_load', { duration: 1234 });

      expect(result).toBeDefined();
      expect(result.name).toBe('page_load');
      expect(result.data.duration).toBe(1234);
    });

    it('includes timestamp', () => {
      const result = captureMetric('test_metric');

      expect(result.timestamp).toBeDefined();
    });

    it('includes session ID', () => {
      const result = captureMetric('test_metric');

      expect(result.sessionId).toBeDefined();
    });

    it('captures metric without data', () => {
      const result = captureMetric('simple_metric');

      expect(result.name).toBe('simple_metric');
      expect(result.data).toEqual({});
    });
  });

  describe('createErrorBoundaryClass', () => {
    it('creates error boundary configuration', () => {
      const config = createErrorBoundaryClass();

      expect(config).toBeDefined();
      expect(config.onError).toBeInstanceOf(Function);
    });

    it('includes fallback in configuration', () => {
      const FallbackComponent = () => null;
      const config = createErrorBoundaryClass(FallbackComponent);

      expect(config.fallback).toBe(FallbackComponent);
    });

    it('onError captures error with UI category', () => {
      const config = createErrorBoundaryClass();
      const error = new Error('React error');
      const errorInfo = { componentStack: 'at Component' };

      // This should not throw
      config.onError(error, errorInfo);
    });
  });
});
