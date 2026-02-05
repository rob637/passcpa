import React from 'react';
import logger from './utils/logger';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './styles/globals.css';
import { AuthProvider } from './providers/AuthProvider';
import { StudyProvider } from './providers/StudyProvider';
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
    
    // Don't interrupt exams or practice sessions
    const isInExam = window.location.pathname.includes('/exam') || 
                     window.location.pathname.includes('/practice') ||
                     window.location.pathname.includes('/tbs-simulator');
    
    if (isInExam) {
      // Store update pending flag - will prompt after exam
      sessionStorage.setItem('pwa-update-pending', 'true');
      logger.log('PWA update available, deferred until exam completes');
    } else {
      // Show the update banner
      triggerUpdateBanner();
      logger.log('PWA update available, showing banner');
    }
  },
  onOfflineReady() {
    logger.log('App ready to work offline');
  },
});

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
          <StudyProvider>
            <App />
          </StudyProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
