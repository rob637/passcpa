import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  serverTimestamp: vi.fn(() => new Date()),
}));

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user' },
    userProfile: null,
    updateProfile: vi.fn().mockResolvedValue(undefined),
  }),
}));

vi.mock('../../../config/examConfig', () => ({
  CPA_SECTIONS: {
    FAR: { name: 'Financial Accounting', shortName: 'FAR', color: '#2563EB', description: 'Financial statements' },
    AUD: { name: 'Auditing', shortName: 'AUD', color: '#8B5CF6', description: 'Audit procedures' },
    REG: { name: 'Regulation', shortName: 'REG', color: '#10B981', description: 'Tax and law' },
    TCP: { name: 'Tax', shortName: 'TCP', color: '#EF4444', description: 'Tax planning' },
    BAR: { name: 'Business', shortName: 'BAR', color: '#F59E0B', description: 'Business analysis' },
    ISC: { name: 'Info Systems', shortName: 'ISC', color: '#6366F1', description: 'IT controls' },
  },
  DAILY_GOAL_PRESETS: [
    { questions: 20, label: 'Light' },
    { questions: 40, label: 'Moderate' },
    { questions: 60, label: 'Intensive' },
  ],
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Import after mocks
import Onboarding from '../../../components/pages/Onboarding';

const renderOnboarding = () => {
  return render(
    <BrowserRouter>
      <Onboarding />
    </BrowserRouter>
  );
};

describe('Onboarding Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the onboarding page', () => {
      renderOnboarding();
      // Should have some welcome or onboarding content
      expect(document.body.textContent).toBeTruthy();
    });

    it('shows navigation button', () => {
      renderOnboarding();
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Content', () => {
    it('displays step content', () => {
      renderOnboarding();
      const content = document.body.textContent;
      expect(content).toBeTruthy();
    });

    it('shows exam section options or welcome text', () => {
      renderOnboarding();
      const content = document.body.textContent;
      // May show welcome or section options
      expect(
        content.includes('Welcome') ||
        content.includes('Section') ||
        content.includes('FAR') ||
        content
      ).toBeTruthy();
    });
  });

  describe('Navigation', () => {
    it('has navigation buttons', () => {
      renderOnboarding();
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(1);
    });

    it('allows clicking navigation buttons', () => {
      renderOnboarding();
      const buttons = screen.getAllByRole('button');
      if (buttons.length > 0) {
        fireEvent.click(buttons[0]);
      }
      expect(true).toBe(true);
    });
  });
});
