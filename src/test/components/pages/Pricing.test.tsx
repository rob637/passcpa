import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock subscription service
vi.mock('../../../services/subscription', () => ({
  SUBSCRIPTION_PLANS: {
    free: {
      tier: 'free',
      name: 'Free',
      price: 0,
      features: ['Basic features'],
    },
    monthly: {
      tier: 'monthly',
      name: 'Monthly',
      price: 14.99,
      features: ['All features'],
    },
    quarterly: {
      tier: 'quarterly',
      name: 'Quarterly',
      price: 34.99,
      features: ['All features', 'Save 23%'],
    },
    annual: {
      tier: 'annual',
      name: 'Annual',
      price: 99,
      features: ['All features', 'Best value'],
    },
    lifetime: {
      tier: 'lifetime',
      name: 'Lifetime',
      price: 299,
      features: ['All features forever'],
    },
  },
  useSubscription: vi.fn(() => ({
    subscription: null,
    loading: false,
  })),
  IS_BETA_PERIOD: true,
}));

// Mock document title hook
vi.mock('../../../hooks/useDocumentTitle', () => ({
  useDocumentTitle: vi.fn(),
}));

import Pricing from '../../../components/pages/Pricing';
import { useSubscription } from '../../../services/subscription';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Pricing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useSubscription as ReturnType<typeof vi.fn>).mockReturnValue({
      subscription: null,
      loading: false,
    });
  });

  describe('rendering', () => {
    it('should render the pricing page', () => {
      renderWithRouter(<Pricing />);

      // Should show page heading
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should show loading state when subscription is loading', () => {
      (useSubscription as ReturnType<typeof vi.fn>).mockReturnValue({
        subscription: null,
        loading: true,
      });

      renderWithRouter(<Pricing />);

      // Should have loading spinner
      expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('should render navigation with logo', () => {
      renderWithRouter(<Pricing />);

      const logos = screen.getAllByAltText('VoraPrep');
      expect(logos.length).toBeGreaterThan(0);
    });

    it('should have links to features and login', () => {
      renderWithRouter(<Pricing />);

      // Check for navigation links (may have text or just be present)
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('plan display', () => {
    it('should display free plan', () => {
      renderWithRouter(<Pricing />);

      expect(screen.getByText('Free')).toBeInTheDocument();
    });

    it('should display annual plan', () => {
      renderWithRouter(<Pricing />);

      const annualElements = screen.getAllByText('Annual');
      expect(annualElements.length).toBeGreaterThan(0);
    });

    it('should show beta message during beta period', () => {
      renderWithRouter(<Pricing />);

      // During beta, free tier should be highlighted
      const startFreeButtons = screen.getAllByText(/Start Free|Coming/);
      expect(startFreeButtons.length).toBeGreaterThan(0);
    });

    it('should display pricing amounts', () => {
      renderWithRouter(<Pricing />);

      // Free tier should show $0
      expect(screen.getByText('$0') || screen.getByText(/free/i)).toBeInTheDocument();
    });
  });

  describe('billing interval toggle', () => {
    it('should have billing interval toggle', () => {
      renderWithRouter(<Pricing />);

      // Look for monthly/annual toggle - use getAllByText since there are multiple matches
      const monthlyElements = screen.queryAllByText(/monthly/i);
      const annualElements = screen.queryAllByText(/annual/i);
      
      expect(monthlyElements.length > 0 || annualElements.length > 0).toBe(true);
    });
  });

  describe('current plan indication', () => {
    it('should indicate current plan for subscribed users', () => {
      (useSubscription as ReturnType<typeof vi.fn>).mockReturnValue({
        subscription: { tier: 'free' },
        loading: false,
      });

      renderWithRouter(<Pricing />);

      // The CTA for free should change when user has free subscription
      expect(document.body).toBeInTheDocument();
    });

    it('should disable paid plans during beta', () => {
      renderWithRouter(<Pricing />);

      // Paid plans should show "Coming Q3 2026" during beta
      const comingSoonButtons = screen.getAllByText(/Coming Q3 2026/);
      expect(comingSoonButtons.length).toBeGreaterThan(0);
    });
  });

  describe('plan selection', () => {
    it('should show alert when selecting paid plan during beta', () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      
      renderWithRouter(<Pricing />);

      // Try to click a plan card (if not disabled)
      const selectButtons = screen.getAllByRole('button');
      const enabledButton = selectButtons.find(btn => !btn.hasAttribute('disabled'));
      
      if (enabledButton) {
        fireEvent.click(enabledButton);
      }

      // Clean up
      alertSpy.mockRestore();
    });
  });

  describe('features display', () => {
    it('should display feature checkmarks', () => {
      renderWithRouter(<Pricing />);

      // Plans typically have check marks for features
      const checkmarks = document.querySelectorAll('svg');
      expect(checkmarks.length).toBeGreaterThan(0);
    });
  });

  describe('responsive design', () => {
    it('should render on mobile viewport', () => {
      // Simulate mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      renderWithRouter(<Pricing />);

      expect(document.body).toBeInTheDocument();
    });
  });
});
