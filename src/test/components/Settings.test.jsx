import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Settings from '../../components/pages/Settings';

// Mock useAuth
const mockUpdateUserProfile = vi.fn();
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user-id', email: 'test@example.com' },
    userProfile: {
      displayName: 'Test User',
      examSection: 'REG',
      dailyGoal: 50,
      examDate: null,
      photoURL: null,
    },
    updateUserProfile: mockUpdateUserProfile,
  }),
}));

// Mock Firebase storage
vi.mock('firebase/storage', () => ({
  ref: vi.fn(),
  uploadBytes: vi.fn().mockResolvedValue({}),
  getDownloadURL: vi.fn().mockResolvedValue('https://example.com/photo.jpg'),
}));

vi.mock('../../config/firebase', () => ({
  storage: {},
  db: {},
}));

// Mock services
vi.mock('../../services/notifications', () => ({
  getDailyReminderSettings: () => ({ time: '09:00', enabled: true }),
}));

vi.mock('../../services/offlineCache', () => ({
  getCacheStatus: vi.fn().mockResolvedValue({ size: '5 MB', items: 100 }),
  clearCache: vi.fn().mockResolvedValue({}),
}));

// Mock exam config
vi.mock('../../config/examConfig', () => ({
  CPA_SECTIONS: {
    REG: { name: 'Regulation', shortName: 'REG', color: 'blue', description: 'Tax' },
    FAR: { name: 'Financial Accounting', shortName: 'FAR', color: 'green', description: 'Accounting' },
    AUD: { name: 'Auditing', shortName: 'AUD', color: 'purple', description: 'Audit' },
    BAR: { name: 'Business Analysis', shortName: 'BAR', color: 'orange', description: 'Business' },
  },
  DAILY_GOAL_PRESETS: [25, 50, 75, 100],
}));

const renderSettings = () => {
  return render(
    <BrowserRouter>
      <Settings />
    </BrowserRouter>
  );
};

describe('Settings Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the settings page', () => {
      renderSettings();
      expect(screen.getByText(/settings/i)).toBeInTheDocument();
    });

    it('should render tabs', () => {
      renderSettings();
      // Use getAllByText since "profile" might appear multiple times
      const profileElements = screen.getAllByText(/profile/i);
      expect(profileElements.length).toBeGreaterThan(0);
    });

    it('should show user display name', () => {
      renderSettings();
      const displayNameInput = screen.getByDisplayValue('Test User');
      expect(displayNameInput).toBeInTheDocument();
    });
  });

  describe('Profile Tab', () => {
    it('should allow editing display name', () => {
      renderSettings();
      const displayNameInput = screen.getByDisplayValue('Test User');
      fireEvent.change(displayNameInput, { target: { value: 'New Name' } });
      expect(displayNameInput.value).toBe('New Name');
    });

    it('should have save button', () => {
      renderSettings();
      const saveButton = screen.getByRole('button', { name: /save/i });
      expect(saveButton).toBeInTheDocument();
    });

    it('should call updateUserProfile on save', async () => {
      mockUpdateUserProfile.mockResolvedValueOnce({});
      renderSettings();

      const displayNameInput = screen.getByDisplayValue('Test User');
      fireEvent.change(displayNameInput, { target: { value: 'New Name' } });

      const saveButton = screen.getByRole('button', { name: /save/i });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockUpdateUserProfile).toHaveBeenCalled();
      });
    });
  });

  describe('Study Tab', () => {
    it('should show exam section selector', () => {
      renderSettings();
      // Click on study tab if needed
      const studyTabs = screen.getAllByText(/study/i);
      fireEvent.click(studyTabs[0]);

      // Look for exam section related content (multiple may exist)
      const examElements = screen.getAllByText(/exam/i);
      expect(examElements.length).toBeGreaterThan(0);
    });

    it('should show study preferences', () => {
      renderSettings();
      const studyTabs = screen.getAllByText(/study/i);
      fireEvent.click(studyTabs[0]);

      // Look for study-related content (multiple may exist)
      const studyElements = screen.getAllByText(/study|goal|section/i);
      expect(studyElements.length).toBeGreaterThan(0);
    });
  });

  describe('Tab Navigation', () => {
    it('should switch between tabs', () => {
      renderSettings();

      // Default is profile tab
      expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();

      // Click study tab
      const studyTab = screen.getByText(/study/i);
      fireEvent.click(studyTab);

      // Should show study content
      expect(screen.getByText(/exam section/i)).toBeInTheDocument();
    });
  });
});
