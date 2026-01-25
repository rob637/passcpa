/**
 * Performance Monitoring Service
 * Tracks Core Web Vitals and custom app performance metrics
 */

// Lazy import analytics to handle async initialization
let analyticsInstance: { instance: any; logEvent: any } | null | undefined = null;

const getAnalytics = async () => {
  if (analyticsInstance === undefined) return null;
  if (analyticsInstance) return analyticsInstance;

  try {
    const { analytics } = await import('../config/firebase');
    const { logEvent: logEventFn } = await import('firebase/analytics');
    if (analytics) {
      analyticsInstance = { instance: analytics, logEvent: logEventFn };
    } else {
      analyticsInstance = undefined; // Mark as unavailable
    }
    return analyticsInstance;
  } catch {
    analyticsInstance = undefined;
    return null;
  }
};

// Helper to log analytics events
const logAnalyticsEvent = async (eventName: string, params: Record<string, any>) => {
  const analytics = await getAnalytics();
  if (analytics) {
    analytics.logEvent(analytics.instance, eventName, params);
  }
};

interface Thresholds {
  good: number;
  needsImprovement: number;
}

// Core Web Vitals thresholds (Google's recommendations)
const WEB_VITALS_THRESHOLDS: Record<string, Thresholds> = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 }, // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
  INP: { good: 200, needsImprovement: 500 }, // Interaction to Next Paint
};

/**
 * Classify a metric value as good, needs improvement, or poor
 */
const classifyMetric = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' | 'unknown' => {
  const thresholds = WEB_VITALS_THRESHOLDS[name];
  if (!thresholds) return 'unknown';

  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.needsImprovement) return 'needs-improvement';
  return 'poor';
};

interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating?: 'good' | 'needs-improvement' | 'poor';
  entries?: any[];
}

/**
 * Report a web vital metric to analytics
 */
const reportWebVital = async (metric: any) => {
  const { name, value, delta, id, rating } = metric as WebVitalMetric;

  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Web Vital] ${name}:`, {
      value: Math.round(value),
      delta: Math.round(delta),
      rating: rating || classifyMetric(name, value),
    });
  }

  // Report to Firebase Analytics
  await logAnalyticsEvent('web_vital', {
    metric_name: name,
    metric_value: Math.round(value),
    metric_delta: Math.round(delta),
    metric_id: id,
    metric_rating: rating || classifyMetric(name, value),
  });
};

/**
 * Initialize Core Web Vitals monitoring using web-vitals library
 * This dynamically imports the library to avoid blocking
 */
export const initWebVitals = async (): Promise<void> => {
  try {
    // Dynamically import web-vitals to avoid bundling issues
    const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');

    // Register metric observers
    onCLS(reportWebVital);
    onFCP(reportWebVital);
    onINP(reportWebVital); // Replaces FID
    onLCP(reportWebVital);
    onTTFB(reportWebVital);
    onTTFB(reportWebVital);
    onINP(reportWebVital);

    if (import.meta.env.DEV) {
      console.log('[Performance] Web Vitals monitoring initialized');
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[Performance] Failed to init web-vitals:', error);
    }
  }
};

/**
 * Track a custom duration metric (e.g., component load time)
 */
export const trackDuration = (metricName: string, startMark: string, endMark?: string) => {
  try {
    const end = endMark || `${metricName}-end`;
    const start = startMark;

    // Use User Timing API
    if (performance.measure) {
      performance.measure(metricName, start, end);
      const entries = performance.getEntriesByName(metricName);
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        if (import.meta.env.DEV) {
          console.log(`[Performance] ${metricName}: ${Math.round(lastEntry.duration)}ms`);
        }
        
        logAnalyticsEvent('custom_timing', {
          metric_name: metricName,
          value: Math.round(lastEntry.duration),
        });
      }
    }
  } catch (e) {
    // Ignore performance tracking errors
  }
};

export default {
  initWebVitals,
  trackDuration,
};
