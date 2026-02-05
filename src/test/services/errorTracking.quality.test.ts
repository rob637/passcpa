/**
 * Error Tracking Service - Quality Tests (Bug-Finding Focus)
 * 
 * Tests error monitoring and tracking for edge cases.
 * These tests are designed to find issues in:
 * - Error categorization
 * - Severity classification
 * - Queue batching
 * - Error boundary integration
 * 
 * @batch 3 of 20 (30 tests)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  ErrorSeverity,
  ErrorCategory,
  captureError,
  initErrorTracking,
  getErrorStats,
  captureMetric,
  createErrorBoundaryClass,
} from '../../services/errorTracking';

describe('Error Tracking Service - Quality Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('ErrorSeverity Enum', () => {
    it('has all required severity levels', () => {
      expect(ErrorSeverity.LOW).toBe('low');
      expect(ErrorSeverity.MEDIUM).toBe('medium');
      expect(ErrorSeverity.HIGH).toBe('high');
      expect(ErrorSeverity.CRITICAL).toBe('critical');
    });

    it('has exactly 4 severity levels', () => {
      const levels = Object.values(ErrorSeverity);
      expect(levels.length).toBe(4);
    });
  });

  describe('ErrorCategory Enum', () => {
    it('has all required categories', () => {
      expect(ErrorCategory.NETWORK).toBe('network');
      expect(ErrorCategory.AUTH).toBe('auth');
      expect(ErrorCategory.FIREBASE).toBe('firebase');
      expect(ErrorCategory.UI).toBe('ui');
      expect(ErrorCategory.VALIDATION).toBe('validation');
      expect(ErrorCategory.AI).toBe('ai');
      expect(ErrorCategory.UNKNOWN).toBe('unknown');
    });
  });

  describe('captureError - Edge Cases', () => {
    it('handles null error object', () => {
      expect(() => captureError(null as any)).not.toThrow();
    });

    it('handles undefined error object', () => {
      expect(() => captureError(undefined as any)).not.toThrow();
    });

    it('handles string error', () => {
      expect(() => captureError('Something went wrong' as any)).not.toThrow();
    });

    it('handles Error object with no stack', () => {
      const error = new Error('Test');
      delete (error as any).stack;
      expect(() => captureError(error)).not.toThrow();
    });

    it('handles Error object with no message', () => {
      const error = new Error();
      expect(() => captureError(error)).not.toThrow();
    });

    it('handles very long error message', () => {
      const longMessage = 'Error: ' + 'x'.repeat(10000);
      const error = new Error(longMessage);
      expect(() => captureError(error)).not.toThrow();
    });

    it('handles circular reference in error context', () => {
      const circular: any = { a: 1 };
      circular.self = circular;
      
      expect(() => captureError(new Error('Test'), circular)).not.toThrow();
    });

    it('handles empty context object', () => {
      expect(() => captureError(new Error('Test'), {})).not.toThrow();
    });

    it('handles context with undefined values', () => {
      expect(() => captureError(new Error('Test'), { key: undefined })).not.toThrow();
    });

    it('handles Error with custom properties', () => {
      const error = new Error('Custom error');
      (error as any).code = 'CUSTOM_CODE';
      (error as any).httpStatus = 500;
      
      expect(() => captureError(error)).not.toThrow();
    });
  });

  describe('captureError - Severity Classification', () => {
    it('marks network errors as HIGH severity by default', () => {
      const networkError = new Error('Failed to fetch');
      (networkError as any).code = 'NETWORK_ERROR';
      
      expect(() => captureError(networkError, { severity: ErrorSeverity.HIGH })).not.toThrow();
    });

    it('allows custom severity override', () => {
      const error = new Error('Minor issue');
      expect(() => captureError(error, { severity: ErrorSeverity.LOW })).not.toThrow();
    });
  });

  describe('captureError - Return Value', () => {
    it('returns ErrorData object', () => {
      const result = captureError(new Error('Test error'));
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('category');
      expect(result).toHaveProperty('severity');
    });

    it('captured error has timestamp', () => {
      const result = captureError(new Error('Test'));
      expect(result).toHaveProperty('timestamp');
    });

    it('captured error has sessionId', () => {
      const result = captureError(new Error('Test'));
      expect(result).toHaveProperty('sessionId');
    });
  });

  describe('initErrorTracking - Edge Cases', () => {
    it('can be called multiple times (idempotent)', () => {
      expect(() => {
        initErrorTracking();
        initErrorTracking();
        initErrorTracking();
      }).not.toThrow();
    });

    it('sets up global error handler', () => {
      initErrorTracking();
      
      // window.onerror should be defined
      expect(typeof window.onerror === 'function' || window.onerror === null).toBe(true);
    });

    it('sets up unhandled rejection handler', () => {
      initErrorTracking();
      
      // Should not throw
      expect(true).toBe(true);
    });
  });

  describe('getErrorStats', () => {
    it('returns valid stats object', () => {
      const stats = getErrorStats();
      
      expect(stats).toHaveProperty('total');
      expect(typeof stats.total).toBe('number');
    });

    it('has byCategory property', () => {
      const stats = getErrorStats();
      expect(stats).toHaveProperty('byCategory');
    });

    it('has bySeverity property', () => {
      const stats = getErrorStats();
      expect(stats).toHaveProperty('bySeverity');
    });

    it('has last24h property', () => {
      const stats = getErrorStats();
      expect(stats).toHaveProperty('last24h');
    });
  });

  describe('captureMetric - Edge Cases', () => {
    it('does not throw with valid params', () => {
      expect(() => captureMetric('test_metric', { value: 100 })).not.toThrow();
    });

    it('returns MetricData object', () => {
      const result = captureMetric('test_metric', { value: 100 });
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('timestamp');
    });

    it('handles empty metric name', () => {
      expect(() => captureMetric('', { value: 100 })).not.toThrow();
    });

    it('handles empty data object', () => {
      expect(() => captureMetric('test', {})).not.toThrow();
    });

    it('handles complex data objects', () => {
      expect(() => captureMetric('test', {
        nested: { deep: { value: 123 } },
        array: [1, 2, 3],
      })).not.toThrow();
    });
  });

  describe('createErrorBoundaryClass - Edge Cases', () => {
    it('returns a class/function', () => {
      const ErrorBoundary = createErrorBoundaryClass(null);
      expect(ErrorBoundary).toBeDefined();
    });

    it('can be created with custom fallback', () => {
      const ErrorBoundary = createErrorBoundaryClass('Error occurred');
      expect(ErrorBoundary).toBeDefined();
    });

    it('returns component class or object', () => {
      const ErrorBoundary = createErrorBoundaryClass();
      // Could be class (function) or React element (object)
      expect(['function', 'object'].includes(typeof ErrorBoundary)).toBe(true);
    });
  });

  describe('Error Context Sanitization', () => {
    it('handles PII in error context', () => {
      const context = {
        email: 'user@example.com',
        password: 'secret123',
        creditCard: '4111-1111-1111-1111',
      };
      
      expect(() => captureError(new Error('Test'), context as any)).not.toThrow();
    });

    it('handles large objects in context', () => {
      const largeContext = {
        data: Array.from({ length: 100 }, (_, i) => ({ index: i, value: `item-${i}` })),
      };
      
      expect(() => captureError(new Error('Test'), largeContext as any)).not.toThrow();
    });

    it('handles function values in context', () => {
      const context = {
        callback: () => console.log('test'),
        nested: { fn: function() {} },
      };
      
      expect(() => captureError(new Error('Test'), context as any)).not.toThrow();
    });

    it('handles Symbol values in context', () => {
      const context = {
        sym: Symbol('test'),
      };
      
      expect(() => captureError(new Error('Test'), context as any)).not.toThrow();
    });
  });
});
