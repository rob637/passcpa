import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../../../providers/ThemeProvider';

// Mock the hooks
vi.mock('../../../hooks/useStudy', () => ({
  useStudy: () => ({
    currentStreak: 5,
    dailyProgress: 75,
  }),
}));

// Mock AuthProvider (used by useSubscription)
vi.mock('../../../providers/AuthProvider', () => ({
  useAuth: () => ({
    user: { uid: 'test-user' },
    userProfile: null,
  }),
}));

// Mock useSubscription (used by TrialBanner in SubscriptionGate and CourseSelector)
vi.mock('../../../services/subscription', () => ({
  useSubscription: () => ({
    subscription: null,
    isPremium: false,
    isTrialing: false,
    trialDaysRemaining: 0,
    trialExpired: false,
    loading: false,
    limits: { questionsPerDay: Infinity },
    getExamAccess: () => ({
      hasAccess: true,
      isPaid: false,
      isTrialing: true,
      trialDaysRemaining: 14,
      trialExpired: false,
      canStartTrial: false,
      trialEndDate: null,
    }),
    startExamTrial: vi.fn().mockResolvedValue(true),
    hasFullAccess: true,
  }),
}));

// Mock CourseProvider (used by TrialBanner)
vi.mock('../../../providers/CourseProvider', () => ({
  useCourse: () => ({
    courseId: 'cpa',
    course: { id: 'cpa', name: 'CPA' },
  }),
}));

vi.mock('../../../hooks/useDocumentTitle', () => ({
  useRouteTitle: vi.fn(),
  ROUTE_TITLES: {
    '/home': 'Home',
    '/learn': 'Learn',
    '/you': 'You',
  },
}));

vi.mock('../../../hooks/usePageTracking', () => ({
  usePageTracking: vi.fn(),
}));

// Mock useToast (used by CourseSelector)
vi.mock('../../../components/common/Toast', () => ({
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
    show: vi.fn(),
  }),
}));

import MainLayout from '../../../components/layouts/MainLayout';

describe('MainLayout', () => {
  const renderMainLayout = (initialRoute = '/home') => {
    return render(
      <ThemeProvider>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<div data-testid="home-content">Home Content</div>} />
              <Route path="/learn" element={<div data-testid="learn-content">Learn Content</div>} />
              <Route path="/you" element={<div data-testid="you-content">You Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the layout structure', () => {
    renderMainLayout();
    
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders the outlet content', () => {
    renderMainLayout('/home');
    
    expect(screen.getByTestId('home-content')).toBeInTheDocument();
  });

  it('renders different content based on route', () => {
    renderMainLayout('/learn');
    
    expect(screen.getByTestId('learn-content')).toBeInTheDocument();
  });

  it('renders navigation with all nav items', () => {
    renderMainLayout();
    
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Learn').length).toBeGreaterThan(0);
    expect(screen.getAllByText('You').length).toBeGreaterThan(0);
  });

  it('renders skip to main content link', () => {
    renderMainLayout();
    
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('renders streak display', () => {
    renderMainLayout();
    
    // Current streak is 5 from mock
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders daily progress sidebar on desktop', () => {
    renderMainLayout();
    
    // Daily progress shows 75% from mock
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders streak message in sidebar', () => {
    renderMainLayout();
    
    expect(screen.getByText('5 day streak!')).toBeInTheDocument();
  });

  it('has navigation landmarks', () => {
    renderMainLayout();
    
    const navElements = screen.getAllByRole('navigation');
    expect(navElements.length).toBeGreaterThan(0);
  });

  it('has main content with proper role', () => {
    renderMainLayout();
    
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('handles skip link click', () => {
    renderMainLayout();
    
    const skipLink = screen.getByText('Skip to main content');
    fireEvent.click(skipLink);
    
    // Main content should exist and be focusable
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders VoraPrep branding', () => {
    renderMainLayout();
    
    // VoraPrep branding might be in logo image alt text or as text
    // Check for the brand presence
    const logos = screen.queryAllByAltText('VoraPrep');
    const brandText = screen.queryByText('VoraPrep');
    expect(logos.length > 0 || brandText !== null).toBe(true);
  });

  it('renders daily goal section', () => {
    renderMainLayout();
    
    expect(screen.getByText('Daily Goal')).toBeInTheDocument();
  });

  describe('ProgressRing component', () => {
    it('renders SVG progress ring', () => {
      renderMainLayout();
      
      const svgs = document.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });

    it('renders progress ring with circles', () => {
      renderMainLayout();
      
      const circles = document.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation links', () => {
    it('renders Home link', () => {
      renderMainLayout();
      
      const homeLinks = screen.getAllByRole('link', { name: /home/i });
      expect(homeLinks.length).toBeGreaterThan(0);
    });

    it('renders Learn link', () => {
      renderMainLayout();
      
      const learnLinks = screen.getAllByRole('link', { name: /learn/i });
      expect(learnLinks.length).toBeGreaterThan(0);
    });

    it('renders You link', () => {
      renderMainLayout();
      
      const youLinks = screen.getAllByRole('link', { name: /you/i });
      expect(youLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Mobile navigation', () => {
    it('renders mobile navigation with aria-label', () => {
      renderMainLayout();
      
      const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i });
      expect(mobileNav).toBeInTheDocument();
    });
  });

  describe('Desktop sidebar', () => {
    it('renders desktop sidebar with aria-label', () => {
      renderMainLayout();
      
      const mainNav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(mainNav).toBeInTheDocument();
    });
  });
});
