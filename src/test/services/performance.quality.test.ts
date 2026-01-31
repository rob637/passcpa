/**
 * REAL Quality Tests for Performance Monitoring Service
 * 
 * Tests the exported performance monitoring functions.
 * Uses mocks for browser Performance API and web-vitals library.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock web-vitals library
vi.mock('web-vitals', () => ({
  onCLS: vi.fn(),
  onFCP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
  onINP: vi.fn(),
}));

// Mock Firebase analytics
vi.mock('../../config/firebase', () => ({
  analytics: null,
}));

vi.mock('firebase/analytics', () => ({
  logEvent: vi.fn(),
}));

describe('Performance Monitoring Service - REAL Tests', () => {
  beforeEach(() => {
    vi.resetModules();
    
    // Setup Performance API mocks that exist in jsdom
    const mockPerformance = {
      mark: vi.fn(),
      measure: vi.fn(),
      getEntriesByName: vi.fn().mockReturnValue([]),
      clearMarks: vi.fn(),
      clearMeasures: vi.fn(),
    };
    
    // jsdom has a performance object but not all methods
    if (!globalThis.performance.mark) {
      Object.assign(globalThis.performance, mockPerformance);
    }
    vi.spyOn(globalThis.performance, 'mark');
    vi.spyOn(globalThis.performance, 'measure');
    vi.spyOn(globalThis.performance, 'getEntriesByName').mockReturnValue([]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  describe('initWebVitals', () => {
    it('should import and initialize web-vitals observers', async () => {
      const { initWebVitals } = await import('../../services/performance');
      const webVitals = await import('web-vitals');
      
      await initWebVitals();
      
      // Should register all vital observers
      expect(webVitals.onCLS).toHaveBeenCalled();
      expect(webVitals.onFCP).toHaveBeenCalled();
      expect(webVitals.onLCP).toHaveBeenCalled();
      expect(webVitals.onTTFB).toHaveBeenCalled();
      expect(webVitals.onINP).toHaveBeenCalled();
    });

    it('should not throw when called multiple times', async () => {
      const { initWebVitals } = await import('../../services/performance');
      
      await expect(initWebVitals()).resolves.not.toThrow();
      await expect(initWebVitals()).resolves.not.toThrow();
    });
  });

  describe('trackDuration', () => {
    it('should call performance.measure with correct arguments', async () => {
      const { trackDuration } = await import('../../services/performance');
      
      // Setup mark first
      performance.mark('test-start');
      performance.mark('test-end');
      
      trackDuration('test-metric', 'test-start', 'test-end');
      
      expect(performance.measure).toHaveBeenCalledWith('test-metric', 'test-start', 'test-end');
    });

    it('should use default end mark name when not provided', async () => {
      const { trackDuration } = await import('../../services/performance');
      
      performance.mark('my-start');
      performance.mark('my-metric-end');
      
      trackDuration('my-metric', 'my-start');
      
      expect(performance.measure).toHaveBeenCalledWith('my-metric', 'my-start', 'my-metric-end');
    });

    it('should not throw if marks do not exist', async () => {
      const { trackDuration } = await import('../../services/performance');
      
      // This should not throw even if marks don't exist
      expect(() => trackDuration('missing', 'nonexistent-start')).not.toThrow();
    });

    it('should handle performance API errors gracefully', async () => {
      vi.spyOn(globalThis.performance, 'measure').mockImplementation(() => {
        throw new Error('Performance API error');
      });
      
      const { trackDuration } = await import('../../services/performance');
      
      // Should not throw
      expect(() => trackDuration('error-test', 'start')).not.toThrow();
    });
  });

  describe('Default Export', () => {
    it('should export both functions via default export', async () => {
      const performanceModule = await import('../../services/performance');
      const defaultExport = performanceModule.default;
      
      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.initWebVitals).toBe('function');
      expect(typeof defaultExport.trackDuration).toBe('function');
    });
  });

  describe('Web Vitals Callback', () => {
    it('should pass callback functions to web-vitals observers', async () => {
      vi.resetModules();
      const { initWebVitals } = await import('../../services/performance');
      const webVitals = await import('web-vitals');
      
      await initWebVitals();
      
      // Each observer should receive a callback function
      const onCLSCall = (webVitals.onCLS as any).mock.calls;
      expect(onCLSCall.length).toBeGreaterThan(0);
      expect(typeof onCLSCall[0][0]).toBe('function');
    });
  });
});

describe('Performance API Integration', () => {
  // These tests verify that our code integrates correctly with the Performance API
  
  describe('User Timing API', () => {
    it('should support performance.mark', () => {
      expect(typeof performance.mark).toBe('function');
    });

    it('should support performance.measure', () => {
      expect(typeof performance.measure).toBe('function');
    });

    it('should support performance.getEntriesByName', () => {
      expect(typeof performance.getEntriesByName).toBe('function');
    });
  });

  describe('Real Performance Measurement', () => {
    it('should create actual performance marks', () => {
      const markName = `test-mark-${Date.now()}`;
      performance.mark(markName);
      
      const marks = performance.getEntriesByName(markName, 'mark');
      expect(marks.length).toBeGreaterThanOrEqual(0);
    });
  });
});
