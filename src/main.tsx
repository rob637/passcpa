import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './styles/globals.css';
import { AuthProvider } from './providers/AuthProvider';
import { StudyProvider } from './providers/StudyProvider';
import { initWebVitals } from './services/performance';
import { initErrorTracking } from './services/errorTracking';
import { initSkipLink } from './utils/accessibility';

// Initialize performance monitoring
initWebVitals();

// Initialize error tracking for production-grade monitoring
initErrorTracking();

// Initialize accessibility helpers after DOM is ready
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initSkipLink);
}

// Register service worker for PWA
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <StudyProvider>
            <App />
          </StudyProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
