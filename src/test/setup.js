import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Global cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Firebase
vi.mock('../config/firebase', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
    sendPasswordResetEmail: vi.fn(),
  },
  db: {},
  storage: {},
  functions: {},
  analytics: null,
  default: {},
}));

// Mock Firebase Storage
vi.mock('firebase/storage', () => ({
  ref: vi.fn(),
  uploadBytes: vi.fn().mockResolvedValue({}),
  getDownloadURL: vi.fn().mockResolvedValue('https://example.com/photo.jpg'),
}));

// Mock Google Auth Provider
vi.mock('firebase/auth', () => ({
  GoogleAuthProvider: vi.fn(() => ({})),
  signInWithPopup: vi.fn(),
  signInWithRedirect: vi.fn().mockResolvedValue(undefined),
  getRedirectResult: vi.fn().mockResolvedValue(null),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  sendEmailVerification: vi.fn().mockResolvedValue(undefined),
  onAuthStateChanged: vi.fn(),
  updateProfile: vi.fn(),
}));

// Mock Firestore
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  getDocs: vi.fn(),
  onSnapshot: vi.fn(),
  serverTimestamp: vi.fn(() => new Date()),
  Timestamp: {
    now: vi.fn(() => ({ toDate: () => new Date() })),
  },
}));

// Mock Firebase Functions
vi.mock('firebase/functions', () => ({
  getFunctions: vi.fn(() => ({})),
  httpsCallable: vi.fn(() => vi.fn().mockRejectedValue(new Error('Function not available in test'))),
  connectFunctionsEmulator: vi.fn(),
}));

// Mock window.matchMedia for dark mode tests
// Create a proper mock that persists across calls
const createMatchMediaMock = (matches = false) => ({
  matches,
  media: '',
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

window.matchMedia = vi.fn().mockImplementation((query) => {
  return createMatchMediaMock(query === '(prefers-color-scheme: dark)' ? false : false);
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock AudioContext for feedback.ts tests
class MockAudioContext {
  destination = {};
  currentTime = 0;
  state = 'running';
  createOscillator() {
    return {
      connect: vi.fn(),
      frequency: { value: 0 },
      type: 'sine',
      start: vi.fn(),
      stop: vi.fn(),
    };
  }
  createGain() {
    return {
      connect: vi.fn(),
      gain: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
    };
  }
  resume() {
    return Promise.resolve();
  }
}
window.AudioContext = MockAudioContext;
window.webkitAudioContext = MockAudioContext;

// Mock HTMLCanvasElement.toBlob for ShareableAchievementCard tests
HTMLCanvasElement.prototype.toBlob = vi.fn(function(callback, type, quality) {
  const blob = new Blob(['mock-image-data'], { type: type || 'image/png' });
  setTimeout(() => callback(blob), 0);
});

// Mock HTMLCanvasElement.getContext for canvas rendering
HTMLCanvasElement.prototype.getContext = vi.fn(function(contextType) {
  if (contextType === '2d') {
    return {
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      getImageData: vi.fn(() => ({ data: new Array(4) })),
      putImageData: vi.fn(),
      createImageData: vi.fn(() => []),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      stroke: vi.fn(),
      fill: vi.fn(),
      translate: vi.fn(),
      scale: vi.fn(),
      rotate: vi.fn(),
      arc: vi.fn(),
      fillText: vi.fn(),
      measureText: vi.fn(() => ({ width: 0 })),
      transform: vi.fn(),
      rect: vi.fn(),
      clip: vi.fn(),
      canvas: { width: 800, height: 600 },
    };
  }
  return null;
});

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor() {}
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}
window.IntersectionObserver = IntersectionObserverMock;

// Mock ResizeObserver
class ResizeObserverMock {
  constructor() {}
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}
window.ResizeObserver = ResizeObserverMock;

// Mock scrollIntoView (not available in jsdom)
Element.prototype.scrollIntoView = vi.fn();

// Mock scrollTo (not available in jsdom)
window.scrollTo = vi.fn();

// Note: Service mocks (offlineCache, pushNotifications, questionService) 
// are NOT globally mocked here because service test files need the actual implementations.
// Component tests that use these services should mock them locally in their test files.

// Mock CourseProvider for components that use useCourse hook
vi.mock('../providers/CourseProvider', () => ({
  useCourse: () => ({
    courseId: 'cpa',
    course: {
      id: 'cpa',
      name: 'CPA Exam',
      shortName: 'CPA',
      description: 'Certified Public Accountant Exam',
      sections: ['AUD', 'FAR', 'REG', 'TCP', 'BAR', 'ISC'],
      firestoreCollection: 'questions',
      lessonsCollection: 'lessons',
    },
    setCourse: vi.fn(),
    availableCourses: [{
      id: 'cpa',
      name: 'CPA Exam',
      shortName: 'CPA',
      description: 'Certified Public Accountant Exam',
      sections: ['AUD', 'FAR', 'REG', 'TCP', 'BAR', 'ISC'],
      firestoreCollection: 'questions',
      lessonsCollection: 'lessons',
    }],
    isLoading: false,
    detectionSource: 'default',
  }),
  CourseProvider: ({ children }) => children,
}));

// Mock AuthProvider for components that use useAuth hook
vi.mock('../providers/AuthProvider', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    error: null,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    resetPassword: vi.fn(),
  }),
  AuthProvider: ({ children }) => children,
}));

// Also mock the re-exported hook from hooks/useAuth
vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    error: null,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    resetPassword: vi.fn(),
  }),
}));

// Suppress console errors in tests (optional)
// vi.spyOn(console, 'error').mockImplementation(() => {});
