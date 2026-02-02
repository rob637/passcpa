import '@testing-library/jest-dom';

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
  analytics: null,
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

// Suppress console errors in tests (optional)
// vi.spyOn(console, 'error').mockImplementation(() => {});// Suppress console errors in tests (optional)
// vi.spyOn(console, 'error').mockImplementation(() => {});
