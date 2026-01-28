import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock firebase
vi.mock('../../config/firebase', () => ({
  analytics: null,
}));

vi.mock('firebase/analytics', () => ({
  logEvent: vi.fn(),
}));

vi.mock('web-vitals', () => ({
  onCLS: vi.fn(),
  onFCP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
  onINP: vi.fn(),
}));

import {
  initWebVitals,
  trackDuration,
} from '../../services/performance';

describe('Performance Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock performance.measure
    vi.spyOn(performance, 'mark').mockImplementation(() => {});
    vi.spyOn(performance, 'measure').mockImplementation(() => {});
    vi.spyOn(performance, 'getEntriesByName').mockReturnValue([{ duration: 100 }]);
  });

  describe('initWebVitals', () => {
    it('should initialize without errors', async () => {
      await expect(initWebVitals()).resolves.not.toThrow();
    });

    it('should be callable multiple times', async () => {
      await initWebVitals();
      await initWebVitals();
      expect(true).toBe(true);
    });
  });

  describe('trackDuration', () => {
    it('should track duration between marks', () => {
      performance.mark('test-start');
      performance.mark('test-end');
      
      trackDuration('test-duration', 'test-start', 'test-end');
      
      expect(performance.measure).toHaveBeenCalledWith('test-duration', 'test-start', 'test-end');
    });

    it('should use default end mark if not provided', () => {
      performance.mark('test-start');
      performance.mark('myMetric-end');
      
      trackDuration('myMetric', 'test-start');
      
      expect(performance.measure).toHaveBeenCalledWith('myMetric', 'test-start', 'myMetric-end');
    });

    it('should handle errors gracefully', () => {
      vi.spyOn(performance, 'measure').mockImplementation(() => {
        throw new Error('Not supported');
      });
      
      // Should not throw
      expect(() => trackDuration('test', 'start', 'end')).not.toThrow();
    });
  });

  describe('default export', () => {
    it('should export initWebVitals and trackDuration', async () => {
      const performanceDefault = await import('../../services/performance');
      expect(performanceDefault.default.initWebVitals).toBeDefined();
      expect(performanceDefault.default.trackDuration).toBeDefined();
    });
  });
});
