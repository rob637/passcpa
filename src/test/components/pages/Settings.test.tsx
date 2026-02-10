import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../../providers/ThemeProvider';

/**
 * Comprehensive Settings Component Tests
 * Tests all tabs and functionality of the Settings page
 */

// Mock all Firebase dependencies
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
  getApps: vi.fn(() => [{}]),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  connectAuthEmulator: vi.fn(),
  GoogleAuthProvider: vi.fn(() => ({})),
  signInWithPopup: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  connectFirestoreEmulator: vi.fn(),
  Timestamp: {
    fromDate: vi.fn((d) => ({ toDate: () => d })),
    now: vi.fn(() => ({ toDate: () => new Date() })),
  },
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  serverTimestamp: vi.fn(() => new Date()),
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(() => ({})),
  connectStorageEmulator: vi.fn(),
  ref: vi.fn(),
  uploadBytes: vi.fn(() => Promise.resolve({})),
  getDownloadURL: vi.fn(() => Promise.resolve('https://example.com/photo.jpg')),
}));

vi.mock('firebase/functions', () => ({
  getFunctions: vi.fn(() => ({})),
  connectFunctionsEmulator: vi.fn(),
}));

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => null),
  isSupported: vi.fn(() => Promise.resolve(false)),
}));

vi.mock('../../../config/firebase', () => ({
  auth: {},
  db: {},
  storage: {},
  analytics: null,
}));

// Mock offline cache service
const mockGetCacheStatus = vi.fn(() => Promise.resolve({ questions_count: 100, questions_cached_at: Date.now() }));
const mockClearCache = vi.fn(() => Promise.resolve());
const mockCacheQuestions = vi.fn(() => Promise.resolve(50));

vi.mock('../../../services/offlineCache', () => ({
  getCacheStatus: () => mockGetCacheStatus(),
  clearCache: () => mockClearCache(),
  cacheQuestions: () => mockCacheQuestions(),
}));

// Mock push notifications service
const mockSetupDailyReminder = vi.fn(() => Promise.resolve(true));
const mockSetWeeklyReportEnabled = vi.fn(() => Promise.resolve());

vi.mock('../../../services/pushNotifications', () => ({
  getDailyReminderSettings: vi.fn(() => ({ time: '09:00', enabled: true })),
  setupDailyReminder: () => mockSetupDailyReminder(),
  setWeeklyReportEnabled: () => mockSetWeeklyReportEnabled(),
}));

// Mock question service
vi.mock('../../../services/questionService', () => ({
  fetchQuestions: vi.fn(() => Promise.resolve(Array(50).fill({ id: 'q1', question: 'Test?' }))),
}));

// Mock CourseProvider
vi.mock('../../../providers/CourseProvider', () => ({
  useCourse: () => ({
    courseId: 'cpa',
    course: {
      id: 'cpa',
      name: 'CPA',
      hasTBS: true,
      sections: [
        { id: 'FAR', name: 'Financial Accounting & Reporting', shortName: 'FAR' },
        { id: 'AUD', name: 'Auditing & Attestation', shortName: 'AUD' },
        { id: 'REG', name: 'Regulation', shortName: 'REG' },
        { id: 'BAR', name: 'Business Analysis & Reporting', shortName: 'BAR' },
        { id: 'ISC', name: 'Information Systems & Controls', shortName: 'ISC' },
        { id: 'TCP', name: 'Tax Compliance & Planning', shortName: 'TCP' },
      ],
    },
  }),
}));

// Mock ThemeProvider
vi.mock('../../../providers/ThemeProvider', () => ({
  useTheme: () => ({ isDark: false, themeMode: 'light', setThemeMode: vi.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Create mock user and profile
const mockUser = {
  uid: 'test-user-123',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: null,
  metadata: {
    creationTime: '2025-01-01T00:00:00.000Z',
    lastSignInTime: '2026-01-30T00:00:00.000Z',
  },
};

const mockUserProfile = {
  displayName: 'Test User',
  examSection: 'FAR',
  dailyGoal: 50,
  examDate: { toDate: () => new Date('2026-06-15') },
  weeklyReportEnabled: true,
  photoURL: null,
};

const mockUpdateUserProfile = vi.fn(() => Promise.resolve());
const mockResetPassword = vi.fn(() => Promise.resolve());
const mockSignOut = vi.fn(() => Promise.resolve());

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: mockUser,
    userProfile: mockUserProfile,
    updateUserProfile: mockUpdateUserProfile,
    resetPassword: mockResetPassword,
    signOut: mockSignOut,
  }),
}));

// Mock AuthProvider (used by useSubscription)
vi.mock('../../../providers/AuthProvider', () => ({
  useAuth: () => ({
    user: mockUser,
    userProfile: mockUserProfile,
    updateUserProfile: mockUpdateUserProfile,
    resetPassword: mockResetPassword,
    signOut: mockSignOut,
  }),
}));

// Mock exam config
vi.mock('../../../config/examConfig', () => ({
  CPA_SECTIONS: {
    FAR: { name: 'Financial Accounting & Reporting', shortName: 'FAR', color: '#2196F3', description: 'Financial' },
    AUD: { name: 'Auditing & Attestation', shortName: 'AUD', color: '#FFC107', description: 'Audit' },
    REG: { name: 'Regulation', shortName: 'REG', color: '#4CAF50', description: 'Tax and Business Law' },
    BAR: { name: 'Business Analysis & Reporting', shortName: 'BAR', color: '#9C27B0', description: 'Business' },
  },
  DAILY_GOAL_PRESETS: [
    { points: 25, name: 'Light' },
    { points: 50, name: 'Standard' },
    { points: 75, name: 'Intensive' },
    { points: 100, name: 'Maximum' },
  ],
  EXAM_SECTIONS: ['FAR', 'AUD', 'REG', 'BAR'],
  CORE_SECTIONS: ['AUD', 'FAR', 'REG'],
  DISCIPLINE_SECTIONS_2026: ['BAR', 'ISC', 'TCP'],
  isBefore2026Blueprint: () => false,
}));

// Wrapper component
const renderSettings = async () => {
  const Settings = (await import('../../../components/pages/Settings')).default;
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <Settings />
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Settings Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders the Settings page with title', async () => {
      await renderSettings();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('renders all navigation tabs', async () => {
      await renderSettings();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Study Plan')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('Feedback & Support')).toBeInTheDocument();
      expect(screen.getByText('Offline')).toBeInTheDocument();
      expect(screen.getByText('Account')).toBeInTheDocument();
    });

    it('shows Profile tab content by default', async () => {
      await renderSettings();
      expect(screen.getByText('Profile Information')).toBeInTheDocument();
      expect(screen.getByText('Display Name')).toBeInTheDocument();
    });
  });

  describe('Profile Tab', () => {
    it('displays user email (disabled)', async () => {
      await renderSettings();
      const emailInput = screen.getByDisplayValue('test@example.com');
      expect(emailInput).toBeDisabled();
    });

    it('displays display name input with current value', async () => {
      await renderSettings();
      const nameInput = screen.getByDisplayValue('Test User');
      expect(nameInput).toBeInTheDocument();
    });

    it('allows changing display name', async () => {
      await renderSettings();
      const nameInput = screen.getByDisplayValue('Test User');
      fireEvent.change(nameInput, { target: { value: 'New Name' } });
      expect(screen.getByDisplayValue('New Name')).toBeInTheDocument();
    });

    it('shows Change Photo button', async () => {
      await renderSettings();
      expect(screen.getByText('Change Photo')).toBeInTheDocument();
    });

    it('displays user initials when no photo', async () => {
      await renderSettings();
      expect(screen.getByText('T')).toBeInTheDocument(); // First letter of "Test User"
    });
  });

  describe('Study Plan Tab', () => {
    it('switches to Study Plan tab when clicked', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Study Plan'));
      // The heading shows "{course.name} Settings" which is "CPA Settings" based on mock
      expect(screen.getByText('CPA Settings')).toBeInTheDocument();
    });

    it('displays exam section options', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Study Plan'));
      expect(screen.getByText('Current Exam Section')).toBeInTheDocument();
    });

    it('displays daily goal presets', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Study Plan'));
      expect(screen.getByText('Daily Point Goal')).toBeInTheDocument();
      expect(screen.getByText('Light')).toBeInTheDocument();
      expect(screen.getByText('Standard')).toBeInTheDocument();
      expect(screen.getByText('Intensive')).toBeInTheDocument();
      expect(screen.getByText('Maximum')).toBeInTheDocument();
    });
  });

  describe('Notifications Tab', () => {
    it('switches to Notifications tab when clicked', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Notifications'));
      expect(screen.getByText('Notification Preferences')).toBeInTheDocument();
    });

    it('displays daily reminder toggle', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Notifications'));
      expect(screen.getByText('Daily Study Reminder')).toBeInTheDocument();
    });

    it('displays weekly report toggle', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Notifications'));
      expect(screen.getByText('Weekly Progress Report')).toBeInTheDocument();
    });
  });

  describe('Offline Tab', () => {
    it('switches to Offline tab when clicked', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Offline'));
      expect(screen.getByText('Offline Storage')).toBeInTheDocument();
    });

    it('displays download button', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Offline'));
      expect(screen.getByText('Download Questions')).toBeInTheDocument();
    });
  });

  describe('Feedback & Support Tab', () => {
    it('switches to Feedback tab when clicked', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Feedback & Support'));
      expect(screen.getByText('Have a suggestion?')).toBeInTheDocument();
    });

    it('displays send feedback link', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Feedback & Support'));
      expect(screen.getByText('Send Feedback')).toBeInTheDocument();
    });

    it('displays report bug link', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Feedback & Support'));
      expect(screen.getByText('Report a Bug')).toBeInTheDocument();
    });
  });

  describe('Account Tab', () => {
    it('switches to Account tab when clicked', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Account'));
      expect(screen.getByText('Account Management')).toBeInTheDocument();
    });

    it('displays user ID', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Account'));
      expect(screen.getByText('User ID')).toBeInTheDocument();
      expect(screen.getByText('test-user-123')).toBeInTheDocument();
    });

    it('displays change password button', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Account'));
      expect(screen.getByText('Change Password')).toBeInTheDocument();
    });

    it('displays sign out button', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Account'));
      expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });

    it('calls signOut when sign out button is clicked', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Account'));
      fireEvent.click(screen.getByText('Sign Out'));
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  describe('Save Functionality', () => {
    it('shows save button on profile tab', async () => {
      await renderSettings();
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });

    it('hides save button on offline tab', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Offline'));
      const saveButtons = screen.queryAllByText('Save Changes');
      expect(saveButtons.length).toBe(0);
    });

    it('hides save button on feedback tab', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Feedback & Support'));
      const saveButtons = screen.queryAllByText('Save Changes');
      expect(saveButtons.length).toBe(0);
    });

    it('hides save button on account tab', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Account'));
      const saveButtons = screen.queryAllByText('Save Changes');
      expect(saveButtons.length).toBe(0);
    });

    it('calls updateUserProfile when saving', async () => {
      await renderSettings();
      fireEvent.click(screen.getByText('Save Changes'));
      await waitFor(() => {
        expect(mockUpdateUserProfile).toHaveBeenCalled();
      });
    });
  });
});

describe('Settings Module Export', () => {
  it('exports Settings component as default', async () => {
    const module = await import('../../../components/pages/Settings');
    expect(module.default).toBeDefined();
    expect(typeof module.default).toBe('function');
  });
});
