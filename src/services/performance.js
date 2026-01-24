/**
 * Performance Monitoring Service
 * Tracks Core Web Vitals and custom app performance metrics
 */

// Lazy import analytics to handle async initialization
let analyticsInstance = null;

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
const logAnalyticsEvent = async (eventName, params) => {
  const analytics = await getAnalytics();
  if (analytics) {
    analytics.logEvent(analytics.instance, eventName, params);
  }
};

// Core Web Vitals thresholds (Google's recommendations)
const WEB_VITALS_THRESHOLDS = {
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
const classifyMetric = (name, value) => {
  const thresholds = WEB_VITALS_THRESHOLDS[name];
  if (!thresholds) return 'unknown';

  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.needsImprovement) return 'needs-improvement';
  return 'poor';
};

/**
 * Report a web vital metric to analytics
 */
const reportWebVital = async (metric) => {
  const { name, value, delta, id, rating } = metric;

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
export const initWebVitals = async () => {
  try {
    // Dynamically import web-vitals to avoid bundling issues
    const { onCLS, onFCP, onFID, onLCP, onTTFB, onINP } = await import('web-vitals');

    // Register metric observers
    onCLS(reportWebVital);
    onFCP(reportWebVital);
    onFID(reportWebVital);
    onLCP(reportWebVital);
    onTTFB(reportWebVital);
    onINP(reportWebVital);

    if (import.meta.env.DEV) {
      console.log('[Performance] Web Vitals monitoring initialized');
    }
  } catch (error) {
    // web-vitals library not available, skip silently
    if (import.meta.env.DEV) {
      console.warn('[Performance] Web Vitals not available:', error.message);
    }
  }
};

/**
 * Custom performance metrics
 */
const customMetrics = new Map();

/**
 * Start timing a custom performance metric
 */
export const startPerformanceMark = (markName) => {
  if (typeof performance !== 'undefined') {
    performance.mark(`${markName}_start`);
    customMetrics.set(markName, performance.now());
  }
};

/**
 * End timing a custom performance metric and report it
 */
export const endPerformanceMark = (markName, options = {}) => {
  if (typeof performance === 'undefined') return null;

  const startTime = customMetrics.get(markName);
  if (!startTime) {
    console.warn(`[Performance] No start mark found for: ${markName}`);
    return null;
  }

  const endTime = performance.now();
  const duration = endTime - startTime;

  performance.mark(`${markName}_end`);

  try {
    performance.measure(markName, `${markName}_start`, `${markName}_end`);
  } catch (e) {
    // Ignore if marks don't exist
  }

  customMetrics.delete(markName);

  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Performance] ${markName}:`, {
      duration: Math.round(duration),
      ...options,
    });
  }

  // Report to Firebase Analytics
  if (options.track !== false) {
    logAnalyticsEvent('custom_performance', {
      metric_name: markName,
      duration_ms: Math.round(duration),
      ...options.metadata,
    });
  }

  return duration;
};

/**
 * Measure async function execution time
 */
export const measureAsync = async (name, asyncFn, options = {}) => {
  startPerformanceMark(name);
  try {
    const result = await asyncFn();
    endPerformanceMark(name, options);
    return result;
  } catch (error) {
    endPerformanceMark(name, { ...options, error: true });
    throw error;
  }
};

/**
 * Track page load performance
 */
export const trackPageLoad = () => {
  if (typeof window === 'undefined' || !window.performance) return;

  // Wait for page to be fully loaded
  if (document.readyState === 'complete') {
    reportLoadMetrics();
  } else {
    window.addEventListener('load', reportLoadMetrics);
  }
};

const reportLoadMetrics = () => {
  setTimeout(() => {
    const timing = performance.timing || {};
    const navigation = performance.getEntriesByType?.('navigation')?.[0];

    const metrics = {
      // DNS lookup time
      dns: (timing.domainLookupEnd || 0) - (timing.domainLookupStart || 0),
      // TCP connection time
      tcp: (timing.connectEnd || 0) - (timing.connectStart || 0),
      // Time to First Byte (TTFB)
      ttfb: (timing.responseStart || 0) - (timing.requestStart || 0),
      // DOM Content Loaded
      domContentLoaded: (timing.domContentLoadedEventEnd || 0) - (timing.navigationStart || 0),
      // Full page load
      pageLoad: (timing.loadEventEnd || 0) - (timing.navigationStart || 0),
    };

    // Also use Navigation Timing API v2 if available
    if (navigation) {
      metrics.transferSize = navigation.transferSize;
      metrics.encodedBodySize = navigation.encodedBodySize;
      metrics.decodedBodySize = navigation.decodedBodySize;
    }

    // Log in development
    if (import.meta.env.DEV) {
      console.log('[Performance] Page load metrics:', metrics);
    }

    // Report to Firebase Analytics
    logAnalyticsEvent('page_load_timing', {
      dns_ms: metrics.dns,
      tcp_ms: metrics.tcp,
      ttfb_ms: metrics.ttfb,
      dom_loaded_ms: metrics.domContentLoaded,
      page_load_ms: metrics.pageLoad,
      transfer_size_kb: Math.round((metrics.transferSize || 0) / 1024),
    });
  }, 0);
};

/**
 * Track resource loading performance
 */
export const trackResourcesPerformance = () => {
  if (typeof performance === 'undefined' || !performance.getEntriesByType) return;

  setTimeout(() => {
    const resources = performance.getEntriesByType('resource');

    // Group by resource type
    const byType = {};
    resources.forEach((resource) => {
      const type = resource.initiatorType || 'other';
      if (!byType[type]) {
        byType[type] = { count: 0, totalSize: 0, totalDuration: 0 };
      }
      byType[type].count++;
      byType[type].totalSize += resource.transferSize || 0;
      byType[type].totalDuration += resource.duration || 0;
    });

    // Find slowest resources
    const slowest = [...resources]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5)
      .map((r) => ({
        name: r.name.split('/').pop()?.substring(0, 50),
        duration: Math.round(r.duration),
        size: Math.round((r.transferSize || 0) / 1024),
      }));

    if (import.meta.env.DEV) {
      console.log('[Performance] Resource stats by type:', byType);
      console.log('[Performance] Slowest resources:', slowest);
    }

    // Report summary to analytics
    logAnalyticsEvent('resource_performance', {
      total_resources: resources.length,
      script_count: byType.script?.count || 0,
      script_size_kb: Math.round((byType.script?.totalSize || 0) / 1024),
      style_count: byType.css?.count || 0,
      style_size_kb: Math.round((byType.css?.totalSize || 0) / 1024),
      image_count: byType.img?.count || 0,
      image_size_kb: Math.round((byType.img?.totalSize || 0) / 1024),
    });
  }, 3000); // Wait for resources to load
};

/**
 * Track JavaScript errors
 */
export const trackErrors = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event) => {
    logAnalyticsEvent('js_error', {
      message: event.message?.substring(0, 100),
      filename: event.filename?.split('/').pop(),
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    logAnalyticsEvent('promise_rejection', {
      reason: String(event.reason)?.substring(0, 100),
    });
  });
};

/**
 * Get current memory usage (if available)
 */
export const getMemoryUsage = () => {
  if (typeof performance === 'undefined' || !performance.memory) {
    return null;
  }

  return {
    usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / (1024 * 1024)),
    totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / (1024 * 1024)),
    jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / (1024 * 1024)),
    percentUsed: Math.round(
      (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100
    ),
  };
};

/**
 * Initialize all performance monitoring
 */
export const initPerformanceMonitoring = () => {
  // Initialize Web Vitals
  initWebVitals();

  // Track page load
  trackPageLoad();

  // Track resource performance
  trackResourcesPerformance();

  // Track JS errors
  trackErrors();

  if (import.meta.env.DEV) {
    console.log('[Performance] Monitoring initialized');
  }
};

export default {
  initWebVitals,
  initPerformanceMonitoring,
  startPerformanceMark,
  endPerformanceMark,
  measureAsync,
  trackPageLoad,
  trackResourcesPerformance,
  getMemoryUsage,
};
