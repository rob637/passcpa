import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, initAnalytics } from '../services/analytics';
import { ROUTE_TITLES } from './useDocumentTitle';

/**
 * Hook to automatically track page views
 * Place this in App.jsx or MainLayout to track all navigation
 */
export const usePageTracking = () => {
  const location = useLocation();

  // Initialize analytics on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track page view on route change
  useEffect(() => {
    const path = location.pathname;
    const title = ROUTE_TITLES[path] || 'PassCPA';

    // Small delay to ensure page title is updated
    const timeout = setTimeout(() => {
      trackPageView(path, title);
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname]);
};

export default usePageTracking;
