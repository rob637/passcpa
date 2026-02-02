// Firebase Configuration for CPA Review
// This will be a SEPARATE Firebase project from Reppy

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator, browserLocalPersistence, browserSessionPersistence, indexedDBLocalPersistence, setPersistence } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics, isSupported } from 'firebase/analytics';
import logger from '../utils/logger';

// ============================================
// Environment Detection & Validation
// ============================================

const isDevelopment = import.meta.env.DEV;
const useEmulators = import.meta.env.VITE_USE_EMULATORS === 'true';
const declaredEnvironment = import.meta.env.VITE_ENVIRONMENT || 'development';

// Required environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
];

// Validate required environment variables
const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
if (missingVars.length > 0) {
  const errorMsg = `Missing required Firebase config: ${missingVars.join(', ')}`;
  console.error(`❌ ${errorMsg}`);
  if (!isDevelopment) {
    throw new Error(errorMsg);
  }
}

// Firebase config - requires environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ============================================
// Environment Mismatch Detection
// ============================================

// Validate that the configured project ID matches the declared environment
// This catches misconfiguration during builds
const validateEnvironmentMatch = () => {
  const projectId = firebaseConfig.projectId;
  
  // Expected project ID patterns for each environment
  const isDevProject = projectId?.includes('-dev');
  const isStagingProject = projectId?.includes('staging');
  const isProdProject = projectId?.includes('prod') && !projectId?.includes('-dev');
  
  let expectedEnv = null;
  if (isDevProject) expectedEnv = 'development';
  else if (isStagingProject) expectedEnv = 'staging';
  else if (isProdProject) expectedEnv = 'production';
  
  if (expectedEnv && expectedEnv !== declaredEnvironment) {
    console.warn(
      `⚠️ Environment mismatch detected!\n` +
      `   Declared: ${declaredEnvironment}\n` +
      `   Project ID suggests: ${expectedEnv}\n` +
      `   This could lead to data corruption. Please verify your configuration.`
    );
  }
};

validateEnvironmentMatch();

// SAFETY CHECK: Prevent Production Config on Development URLs
// This prevents "npm run build" (prod default) from being accidentally deployed to dev
if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;
  const isDevUrl = hostname.includes('passcpa-dev') || hostname.includes('localhost') || hostname.includes('127.0.0.1');
  const isProdConfig = firebaseConfig.projectId === 'voraprep-prod';

  if (isDevUrl && isProdConfig) {
    const errorMsg = 'CRITICAL CONFIG ERROR: Production database connection detected on Development URL. \n\n' +
      'This usually happens when you run "npm run build" (defaults to Prod) instead of "npm run build:dev".\n\n' +
      'Please rebuild with: npm run build:dev';
    
    // Stop execution and alert user
    alert(errorMsg);
    throw new Error(errorMsg);
  }
}

// Log environment info in non-production
if (declaredEnvironment !== 'production') {
  logger.log(
    `🔥 Firebase initialized:\n` +
    `   Environment: ${declaredEnvironment}\n` +
    `   Project: ${firebaseConfig.projectId}\n` +
    `   Emulators: ${useEmulators ? 'enabled' : 'disabled'}`
  );
}

// Initialize Firebase (prevent re-initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Set auth persistence with fallback for corrupted IndexedDB
(async () => {
  try {
    // Try IndexedDB first (best persistence)
    await setPersistence(auth, indexedDBLocalPersistence);
  } catch (e) {
    console.warn('IndexedDB auth persistence failed, falling back to localStorage');
    try {
      // Fall back to localStorage
      await setPersistence(auth, browserLocalPersistence);
    } catch (e2) {
      console.warn('localStorage auth persistence failed, falling back to session');
      // Last resort: session storage (won't persist across tabs/browser close)
      await setPersistence(auth, browserSessionPersistence);
    }
  }
})();

// Initialize Analytics (only in browser, not in SSR)
export let analytics = null;
if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // Analytics not supported
    });
}

// Connect to emulators in development if enabled
if (isDevelopment && useEmulators) {
  // eslint-disable-next-line no-console
  console.log('🔧 Connecting to Firebase emulators...');

  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
    connectFunctionsEmulator(functions, 'localhost', 5001);
    // eslint-disable-next-line no-console
    console.log('✅ Connected to Firebase emulators');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('⚠️ Could not connect to emulators:', error.message);
  }
}

export default app;
