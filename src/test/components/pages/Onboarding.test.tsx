import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

/**
 * Onboarding Component Tests
 * Tests the multi-step onboarding wizard
 */

// Mock Firebase
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
  getApps: vi.fn(() => [{}]),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  serverTimestamp: vi.fn(() => new Date()),
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(() => ({})),
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

// Mock useAuth
const mockUpdateUserProfile = vi.fn(() => Promise.resolve());

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user-123', email: 'test@example.com' },
    userProfile: null,
    updateUserProfile: mockUpdateUserProfile,
  }),
}));

// Mock clsx
vi.mock('clsx', () => ({
  default: (...args: any[]) => args.filter(Boolean).join(' '),
}));

// Mock exam config
vi.mock('../../../config/examConfig', () => ({
  CPA_SECTIONS: {
    FAR: { name: 'Financial Accounting & Reporting', shortName: 'FAR', color: '#2196F3', description: 'Financial' },
    AUD: { name: 'Auditing & Attestation', shortName: 'AUD', color: '#FFC107', description: 'Audit' },
    REG: { name: 'Regulation', shortName: 'REG', color: '#4CAF50', description: 'Tax and Business Law' },
    BAR: { name: 'Business Analysis & Reporting', shortName: 'BAR', color: '#9C27B0', description: 'Business' },
    ISC: { name: 'Information Systems & Controls', shortName: 'ISC', color: '#00BCD4', description: 'IT Controls' },
    TCP: { name: 'Tax Compliance & Planning', shortName: 'TCP', color: '#FF5722', description: 'Tax' },
    BEC: { name: 'Business Environment & Concepts', shortName: 'BEC', color: '#9C27B0', description: 'Business' },
  },
  DAILY_GOAL_PRESETS: [
    { points: 25, name: 'Light', description: '15-20 min/day' },
    { points: 50, name: 'Standard', description: '30-45 min/day' },
    { points: 75, name: 'Intensive', description: '60-90 min/day' },
    { points: 100, name: 'Maximum', description: '90+ min/day' },
  ],
  EXAM_SECTIONS: ['FAR', 'AUD', 'REG', 'BAR'],
  CORE_SECTIONS: ['AUD', 'FAR', 'REG'],
  DISCIPLINE_SECTIONS_2026: ['BAR', 'ISC', 'TCP'],
}));

// Render helper
const renderOnboarding = async () => {
  const Onboarding = (await import('../../../components/pages/Onboarding')).default;
  return render(
    <MemoryRouter>
      <Onboarding />
    </MemoryRouter>
  );
};

describe('Onboarding Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Welcome Step', () => {
    it('renders the welcome step initially', async () => {
      await renderOnboarding();
      expect(screen.getByText(/Welcome to CPA Review/i)).toBeInTheDocument();
    });

    it('displays CPA logo', async () => {
      await renderOnboarding();
      expect(screen.getByText('CPA')).toBeInTheDocument();
    });

    it('shows what we will cover section', async () => {
      await renderOnboarding();
      expect(screen.getByText(/What we'll cover/i)).toBeInTheDocument();
    });

    it('displays Continue button', async () => {
      await renderOnboarding();
      expect(screen.getByText(/Continue/i)).toBeInTheDocument();
    });

    it('mentions exam section in what we cover', async () => {
      await renderOnboarding();
      expect(screen.getByText(/exam section/i)).toBeInTheDocument();
    });

    it('mentions exam date in what we cover', async () => {
      await renderOnboarding();
      expect(screen.getByText(/target exam date/i)).toBeInTheDocument();
    });

    it('mentions daily goals in what we cover', async () => {
      await renderOnboarding();
      expect(screen.getByText(/daily study goals/i)).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('advances to exam date step when Continue is clicked', async () => {
      await renderOnboarding();
      fireEvent.click(screen.getByText(/Continue/i));
      
      await waitFor(() => {
        // Now goes to exam date step first
        expect(screen.getByText(/exam date/i)).toBeInTheDocument();
      });
    });

    it('shows Back button on exam date step', async () => {
      await renderOnboarding();
      fireEvent.click(screen.getByText(/Continue/i));
      
      await waitFor(() => {
        expect(screen.getByText('Back')).toBeInTheDocument();
      });
    });

    it('returns to welcome step when Back is clicked', async () => {
      await renderOnboarding();
      fireEvent.click(screen.getByText(/Continue/i));
      
      await waitFor(() => {
        fireEvent.click(screen.getByText('Back'));
      });
      
      expect(screen.getByText(/Welcome to CPA Review/i)).toBeInTheDocument();
    });
  });

  describe('Section Step', () => {
    const navigateToSectionStep = async () => {
      await renderOnboarding();
      // Step 1: Welcome -> Exam Date
      fireEvent.click(screen.getByText(/Continue/i));
      await waitFor(() => {
        expect(screen.getByText(/When's Your Exam/i)).toBeInTheDocument();
      });
      // Pick an exam date - get input by type since label isn't linked
      const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
      fireEvent.change(dateInput, { target: { value: '2027-01-15' } });
      // Step 2: Exam Date -> Section
      const continueButtons = screen.getAllByText(/Continue/i);
      fireEvent.click(continueButtons[continueButtons.length - 1]);
    };

    it('displays CPA exam sections after navigating to section step', async () => {
      await navigateToSectionStep();
      
      await waitFor(() => {
        // Should see section choice title
        expect(screen.getByText(/Choose Your Section/i)).toBeInTheDocument();
      });
    });

    it('allows clicking on a section card', async () => {
      await navigateToSectionStep();
      
      await waitFor(() => {
        // Look for any section button
        const sectionButton = screen.getByText('FAR').closest('button');
        expect(sectionButton).toBeInTheDocument();
        fireEvent.click(sectionButton!);
      });
    });
  });

  describe('Module Exports', () => {
    it('exports Onboarding as default', async () => {
      const module = await import('../../../components/pages/Onboarding');
      expect(module.default).toBeDefined();
      expect(typeof module.default).toBe('function');
    });
  });
});
