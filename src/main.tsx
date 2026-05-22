import React from 'react';
import logger from './utils/logger';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './styles/globals.css';
import { AuthProvider } from './providers/AuthProvider';
// StudyProvider moved inside App.tsx (inside CourseProvider) for course-aware study tracking
// NOTE: performance + errorTracking are intentionally dynamic-imported below (post-load)
// to keep them out of the entry chunk's static graph and trim initial JS.
import { initSkipLinks } from './utils/accessibility';
// UpdateBanner is kept available for manual triggering but no longer auto-shown.
// Auto-update is silent (Google-style): new SW activates in background, page reloads
// on next safe navigation (defined by isSafePath below).

const scheduleNonCritical = (work: () => void, timeout = 1200) => {
  if (typeof window === 'undefined') {
    work();
    return;
  }

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(work, { timeout });
  } else {
    globalThis.setTimeout(work, 0);
  }
};

// Initialize accessibility helpers after DOM is ready
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initSkipLinks, { once: true });

  // Move metrics and global error observers off the critical render path.
  window.addEventListener('load', () => {
    scheduleNonCritical(() => {
      void import('./services/performance').then((mod) => mod.initWebVitals()).catch(() => {});
    }, 1500);
    scheduleNonCritical(() => {
      void import('./services/errorTracking').then((mod) => mod.initErrorTracking()).catch(() => {});
    }, 2000);
  }, { once: true });
}

// Store the update function globally so UpdateBanner can access it
// (kept for backwards-compat; banner is no longer triggered automatically)
let performUpdate: (() => void) | null = null;

export const getUpdateFunction = () => performUpdate;

// Helper: is current route safe to silently reload on?
const SAFE_PATH_PREFIXES = ['/', '/login', '/register', '/dashboard', '/you', '/settings', '/pricing', '/home'];
const isSafePath = () => {
  const path = window.location.pathname;
  return SAFE_PATH_PREFIXES.some((safe) => path === safe || path.startsWith(safe + '/'));
};

// Register service worker for PWA — Google-style silent auto-update.
// New SW activates in background (skipWaiting + clientsClaim in workbox config).
// We reload the page automatically on safe routes, defer on unsafe ones (mid-exam, etc).
const updateSW = registerSW({
  onNeedRefresh() {
    performUpdate = () => updateSW(true);

    // Prevent reload loops — don't reload again if we just did within 30s.
    const justUpdated = localStorage.getItem('pwa-just-updated');
    if (justUpdated && Date.now() - parseInt(justUpdated, 10) < 30000) {
      logger.log('PWA: Skipping auto-reload (just updated)');
      return;
    }

    if (isSafePath()) {
      logger.log('PWA: New version detected — reloading silently');
      localStorage.setItem('pwa-just-updated', String(Date.now()));
      updateSW(true);
    } else {
      logger.log('PWA: New version detected — deferring reload until safe page');
      sessionStorage.setItem('pwa-update-pending', 'true');
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
      if (isSafePath() && sessionStorage.getItem('pwa-update-pending') === 'true') {
        sessionStorage.removeItem('pwa-update-pending');
        logger.log('PWA: Applying deferred update on visibility change');
        localStorage.setItem('pwa-just-updated', String(Date.now()));
        updateSW(true);
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
  
  // Check for pending updates on route changes (SPA navigation).
  // When user navigates from an exam → dashboard, silently apply the queued update.
  const checkPendingOnNavigation = () => {
    if (isSafePath() && sessionStorage.getItem('pwa-update-pending') === 'true') {
      sessionStorage.removeItem('pwa-update-pending');
      // Small delay to let the page render first
      setTimeout(() => {
        logger.log('PWA: Applying deferred update after navigation to safe page');
        localStorage.setItem('pwa-just-updated', String(Date.now()));
        updateSW(true);
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
