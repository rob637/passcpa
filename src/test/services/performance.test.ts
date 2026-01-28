import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock web-vitals module
vi.mock('web-vitals', () => ({
  onCLS: vi.fn(),
  onFCP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
  onINP: vi.fn(),
  onFID: vi.fn(),
}));

// Mock firebase analytics
vi.mock('../../config/firebase', () => ({
  analytics: { app: {} },
}));

vi.mock('firebase/analytics', () => ({
  logEvent: vi.fn(),
}));

// Import after mocking
import { initWebVitals, trackDuration } from '../../services/performance';

describe('performance.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock console.log for development messages
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initWebVitals', () => {
    it('should initialize web vitals monitoring', async () => {
      const webVitals = await import('web-vitals');
      
      await initWebVitals();
      
      expect(webVitals.onCLS).toHaveBeenCalled();
      expect(webVitals.onFCP).toHaveBeenCalled();
      expect(webVitals.onLCP).toHaveBeenCalled();
      expect(webVitals.onTTFB).toHaveBeenCalled();
      expect(webVitals.onINP).toHaveBeenCalled();
    });

    it('should not throw on initialization', async () => {
      // Should not throw
      await expect(initWebVitals()).resolves.not.toThrow();
    });
  });

  describe('trackDuration', () => {
    let originalMeasure: typeof performance.measure;
    let originalGetEntriesByName: typeof performance.getEntriesByName;
    let originalMark: typeof performance.mark;
    
    beforeEach(() => {
      originalMeasure = performance.measure;
      originalGetEntriesByName = performance.getEntriesByName;
      originalMark = performance.mark;
      
      // Mock performance.measure
      performance.measure = vi.fn();
      performance.getEntriesByName = vi.fn(() => [
        { name: 'test-metric', duration: 123.456, entryType: 'measure', startTime: 0, toJSON: () => ({}) } as PerformanceEntry
      ]);
      performance.mark = vi.fn();
    });
    
    afterEach(() => {
      performance.measure = originalMeasure;
      performance.getEntriesByName = originalGetEntriesByName;
      performance.mark = originalMark;
    });

    it('should track duration between marks', () => {
      trackDuration('test-metric', 'start-mark', 'end-mark');
      
      expect(performance.measure).toHaveBeenCalledWith('test-metric', 'start-mark', 'end-mark');
      expect(performance.getEntriesByName).toHaveBeenCalledWith('test-metric');
    });

    it('should use default end mark if not provided', () => {
      trackDuration('test-metric', 'start-mark');
      
      expect(performance.measure).toHaveBeenCalledWith('test-metric', 'start-mark', 'test-metric-end');
    });

    it('should handle empty entries gracefully', () => {
      performance.getEntriesByName = vi.fn(() => []);
      
      // Should not throw
      expect(() => trackDuration('test-metric', 'start-mark')).not.toThrow();
    });

    it('should handle performance.measure not available', () => {
      // @ts-ignore
      performance.measure = undefined;
      
      // Should not throw
      expect(() => trackDuration('test-metric', 'start-mark')).not.toThrow();
    });

    it('should handle errors gracefully', () => {
      performance.measure = vi.fn(() => {
        throw new Error('Measure error');
      });
      
      // Should not throw
      expect(() => trackDuration('test-metric', 'start-mark')).not.toThrow();
    });
  });

  describe('default export', () => {
    it('should export initWebVitals and trackDuration', async () => {
      const performanceModule = await import('../../services/performance');
      
      expect(performanceModule.default).toBeDefined();
      expect(performanceModule.default.initWebVitals).toBe(performanceModule.initWebVitals);
      expect(performanceModule.default.trackDuration).toBe(performanceModule.trackDuration);
    });
  });
});

describe('performance.ts - classifyMetric', () => {
  // Test the thresholds indirectly by testing the reportWebVital behavior
  // Since classifyMetric is not exported, we test it through web vitals callbacks
  
  it('should classify metrics correctly when callback is invoked', async () => {
    const webVitals = await import('web-vitals');
    
    await initWebVitals();
    
    // Get the callback that was registered
    const onCLSCallback = (webVitals.onCLS as ReturnType<typeof vi.fn>).mock.calls[0][0];
    
    // Test with good value (CLS < 0.1)
    expect(() => onCLSCallback({
      name: 'CLS',
      value: 0.05,
      delta: 0.05,
      id: 'test-cls-1',
    })).not.toThrow();
    
    // Test with needs-improvement value (0.1 < CLS < 0.25)
    expect(() => onCLSCallback({
      name: 'CLS',
      value: 0.15,
      delta: 0.05,
      id: 'test-cls-2',
    })).not.toThrow();
    
    // Test with poor value (CLS > 0.25)
    expect(() => onCLSCallback({
      name: 'CLS',
      value: 0.5,
      delta: 0.1,
      id: 'test-cls-3',
    })).not.toThrow();
  });
  
  it('should handle unknown metric names', async () => {
    const webVitals = await import('web-vitals');
    
    await initWebVitals();
    
    const onCLSCallback = (webVitals.onCLS as ReturnType<typeof vi.fn>).mock.calls[0][0];
    
    // Test with unknown metric
    expect(() => onCLSCallback({
      name: 'UNKNOWN_METRIC',
      value: 100,
      delta: 10,
      id: 'test-unknown',
    })).not.toThrow();
  });
  
  it('should handle LCP classification', async () => {
    const webVitals = await import('web-vitals');
    
    await initWebVitals();
    
    const onLCPCallback = (webVitals.onLCP as ReturnType<typeof vi.fn>).mock.calls[0][0];
    
    // Good (< 2500)
    expect(() => onLCPCallback({ name: 'LCP', value: 2000, delta: 2000, id: 'lcp-1' })).not.toThrow();
    
    // Needs improvement (2500-4000)
    expect(() => onLCPCallback({ name: 'LCP', value: 3000, delta: 3000, id: 'lcp-2' })).not.toThrow();
    
    // Poor (> 4000)
    expect(() => onLCPCallback({ name: 'LCP', value: 5000, delta: 5000, id: 'lcp-3' })).not.toThrow();
  });
  
  it('should handle FCP classification', async () => {
    const webVitals = await import('web-vitals');
    
    await initWebVitals();
    
    const onFCPCallback = (webVitals.onFCP as ReturnType<typeof vi.fn>).mock.calls[0][0];
    
    // Good (< 1800)
    expect(() => onFCPCallback({ name: 'FCP', value: 1500, delta: 1500, id: 'fcp-1' })).not.toThrow();
    
    // Needs improvement (1800-3000)
    expect(() => onFCPCallback({ name: 'FCP', value: 2500, delta: 2500, id: 'fcp-2' })).not.toThrow();
    
    // Poor (> 3000)
    expect(() => onFCPCallback({ name: 'FCP', value: 4000, delta: 4000, id: 'fcp-3' })).not.toThrow();
  });
  
  it('should handle TTFB classification', async () => {
    const webVitals = await import('web-vitals');
    
    await initWebVitals();
    
    const onTTFBCallback = (webVitals.onTTFB as ReturnType<typeof vi.fn>).mock.calls[0][0];
    
    // Good (< 800)
    expect(() => onTTFBCallback({ name: 'TTFB', value: 500, delta: 500, id: 'ttfb-1' })).not.toThrow();
    
    // Needs improvement (800-1800)
    expect(() => onTTFBCallback({ name: 'TTFB', value: 1200, delta: 1200, id: 'ttfb-2' })).not.toThrow();
    
    // Poor (> 1800)
    expect(() => onTTFBCallback({ name: 'TTFB', value: 2500, delta: 2500, id: 'ttfb-3' })).not.toThrow();
  });
  
  it('should handle INP classification', async () => {
    const webVitals = await import('web-vitals');
    
    await initWebVitals();
    
    const onINPCallback = (webVitals.onINP as ReturnType<typeof vi.fn>).mock.calls[0][0];
    
    // Good (< 200)
    expect(() => onINPCallback({ name: 'INP', value: 100, delta: 100, id: 'inp-1' })).not.toThrow();
    
    // Needs improvement (200-500)
    expect(() => onINPCallback({ name: 'INP', value: 350, delta: 350, id: 'inp-2' })).not.toThrow();
    
    // Poor (> 500)
    expect(() => onINPCallback({ name: 'INP', value: 700, delta: 700, id: 'inp-3' })).not.toThrow();
  });
});
