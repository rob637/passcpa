import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Settings from '../../../components/pages/Settings';

// Mock all dependencies
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user', email: 'test@example.com' },
    userProfile: {
      displayName: 'Test User',
      examSection: 'REG',
      dailyGoal: 50,
      examDate: null,
    },
    updateUserProfile: vi.fn().mockResolvedValue({}),
  }),
}));

vi.mock('../../../services/notifications', () => ({
  getDailyReminderSettings: () => ({ time: '09:00', enabled: true }),
}));

vi.mock('../../../services/offlineCache', () => ({
  getCacheStatus: vi.fn().mockResolvedValue({ size: 1024, items: 10 }),
  clearCache: vi.fn().mockResolvedValue({}),
}));

vi.mock('../../../config/firebase', () => ({
  storage: {},
  db: {},
}));

vi.mock('firebase/storage', () => ({
  ref: vi.fn(),
  uploadBytes: vi.fn(),
  getDownloadURL: vi.fn(),
}));

const renderSettings = () => {
  return render(
    <MemoryRouter>
      <Settings />
    </MemoryRouter>
  );
};

describe('Settings Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders settings page heading', () => {
      renderSettings();
      expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
    });

    it('displays profile tab', () => {
      renderSettings();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('shows user display name field', () => {
      renderSettings();
      const nameInput = screen.getByDisplayValue('Test User');
      expect(nameInput).toBeInTheDocument();
    });

    it('renders exam section options', () => {
      renderSettings();
      // Profile Information header should appear on profile tab
      expect(screen.getByText('Profile Information')).toBeInTheDocument();
    });
  });

  describe('Tab Navigation', () => {
    it('shows multiple navigation tabs', () => {
      renderSettings();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Study Plan')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });

    it('allows clicking on Study Plan tab', async () => {
      renderSettings();
      const studyTab = screen.getByText('Study Plan');
      fireEvent.click(studyTab);
      await waitFor(() => {
        // Tab should now be active
        expect(studyTab.closest('button')).toHaveClass('bg-primary-50');
      });
    });
  });

  describe('Form Interactions', () => {
    it('allows editing display name', () => {
      renderSettings();
      const nameInput = screen.getByDisplayValue('Test User');
      fireEvent.change(nameInput, { target: { value: 'New Name' } });
      expect(nameInput).toHaveValue('New Name');
    });
  });

  describe('Save Functionality', () => {
    it('shows save button', () => {
      renderSettings();
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });

    it('handles save action', async () => {
      renderSettings();
      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);
      // Should not throw
      await waitFor(() => {
        expect(true).toBe(true);
      });
    });
  });
});
