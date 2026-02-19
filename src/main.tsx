import React from 'react';
import logger from './utils/logger';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './styles/globals.css';
import { AuthProvider } from './providers/AuthProvider';
// StudyProvider moved inside App.tsx (inside CourseProvider) for course-aware study tracking
import { initWebVitals } from './services/performance';
import { initErrorTracking } from './services/errorTracking';
import { initSkipLinks } from './utils/accessibility';
import { triggerUpdateBanner } from './components/common/UpdateBanner';

// Initialize performance monitoring
initWebVitals();

// Initialize error tracking for production-grade monitoring
initErrorTracking();

// Initialize accessibility helpers after DOM is ready
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initSkipLinks);
}

// Store the update function globally so UpdateBanner can access it
let performUpdate: (() => void) | null = null;

export const getUpdateFunction = () => performUpdate;

// Register service worker for PWA
const updateSW = registerSW({
  onNeedRefresh() {
    // Check if we just updated - skip banner to prevent loop
    // Use localStorage for persistence across reloads (sessionStorage can be unreliable)
    const justUpdated = localStorage.getItem('pwa-just-updated');
    if (justUpdated) {
      const updateTime = parseInt(justUpdated, 10);
      const elapsed = Date.now() - updateTime;
      // If update was within last 30 seconds, skip showing banner
      if (elapsed < 30000) {
        logger.log('PWA: Skipping update banner (just updated ' + Math.round(elapsed/1000) + 's ago)');
        return;
      }
      // Clean up old flag
      localStorage.removeItem('pwa-just-updated');
    }
    
    // Store the update function
    performUpdate = () => updateSW(true);
    
    // Only show update banner on safe pages - NOT during any study activity
    const path = window.location.pathname;
    const safePages = ['/', '/login', '/register', '/dashboard', '/you', '/settings', '/pricing'];
    const isSafePage = safePages.some(safe => path === safe || path.startsWith('/you/'));
    
    if (isSafePage) {
      // Show the update banner immediately on safe pages
      triggerUpdateBanner();
      logger.log('PWA update available, showing banner (safe page)');
    } else {
      // Store update pending flag - will prompt when user navigates to safe page
      sessionStorage.setItem('pwa-update-pending', 'true');
      logger.log('PWA update available, deferred until safe page');
    }
  },
  onOfflineReady() {
    logger.log('App ready to work offline');
  },
});

// Proactive update checking for PWA
// iOS Safari doesn't check for SW updates on app resume, so we do it manually
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  // Check for updates when app becomes visible (user returns to tab/PWA)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // Check for pending updates when returning to a safe page
      const path = window.location.pathname;
      const safePages = ['/', '/login', '/register', '/dashboard', '/you', '/settings', '/pricing'];
      const isSafePage = safePages.some(safe => path === safe || path.startsWith('/you/'));
      
      if (isSafePage && sessionStorage.getItem('pwa-update-pending') === 'true') {
        sessionStorage.removeItem('pwa-update-pending');
        triggerUpdateBanner();
        logger.log('PWA: Showing pending update banner on safe page');
      }
      
      // Also check for new updates
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          logger.log('PWA: Checking for updates on visibility change');
          registration.update().catch((err) => {
            logger.log('PWA: Update check failed', err);
          });
        }
      });
    }
  });
  
  // Check for pending updates on route changes (SPA navigation)
  // This catches when user navigates from practice → dashboard
  const checkPendingOnNavigation = () => {
    const path = window.location.pathname;
    const safePages = ['/', '/login', '/register', '/dashboard', '/you', '/settings', '/pricing'];
    const isSafePage = safePages.some(safe => path === safe || path.startsWith('/you/'));
    
    if (isSafePage && sessionStorage.getItem('pwa-update-pending') === 'true') {
      sessionStorage.removeItem('pwa-update-pending');
      // Small delay to let the page render first
      setTimeout(() => {
        triggerUpdateBanner();
        logger.log('PWA: Showing pending update banner after navigation to safe page');
      }, 500);
    }
  };
  
  // Listen for browser back/forward
  window.addEventListener('popstate', checkPendingOnNavigation);
  
  // Listen for React Router navigation (pushState/replaceState)
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    setTimeout(checkPendingOnNavigation, 100);
  };
  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    setTimeout(checkPendingOnNavigation, 100);
  };
  
  // Also check periodically while app is open (every 30 minutes)
  setInterval(() => {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        logger.log('PWA: Periodic update check');
        registration.update().catch(() => {});
      }
    });
  }, 30 * 60 * 1000); // 30 minutes
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AuthProvider>
            <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
