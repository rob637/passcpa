import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock the hooks
vi.mock('../../../hooks/useStudy', () => ({
  useStudy: () => ({
    currentStreak: 5,
    dailyProgress: 75,
  }),
}));

vi.mock('../../../hooks/useDocumentTitle', () => ({
  useRouteTitle: vi.fn(),
  ROUTE_TITLES: {
    '/dashboard': 'Dashboard',
    '/study': 'Study',
    '/practice': 'Practice',
    '/progress': 'Progress',
    '/settings': 'Settings',
  },
}));

vi.mock('../../../hooks/usePageTracking', () => ({
  usePageTracking: vi.fn(),
}));

import MainLayout from '../../../components/layouts/MainLayout';

describe('MainLayout', () => {
  const renderMainLayout = (initialRoute = '/dashboard') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<div data-testid="dashboard-content">Dashboard Content</div>} />
            <Route path="/study" element={<div data-testid="study-content">Study Content</div>} />
            <Route path="/practice" element={<div data-testid="practice-content">Practice Content</div>} />
            <Route path="/progress" element={<div data-testid="progress-content">Progress Content</div>} />
            <Route path="/settings" element={<div data-testid="settings-content">Settings Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
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
    renderMainLayout('/dashboard');
    
    expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
  });

  it('renders different content based on route', () => {
    renderMainLayout('/study');
    
    expect(screen.getByTestId('study-content')).toBeInTheDocument();
  });

  it('renders navigation with all nav items', () => {
    renderMainLayout();
    
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Study').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Practice').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Progress').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Settings').length).toBeGreaterThan(0);
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
    
    expect(screen.getByText('VoraPrep')).toBeInTheDocument();
    expect(screen.getByText('P')).toBeInTheDocument();
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
    it('renders Dashboard link', () => {
      renderMainLayout();
      
      const dashboardLinks = screen.getAllByRole('link', { name: /dashboard/i });
      expect(dashboardLinks.length).toBeGreaterThan(0);
    });

    it('renders Study link', () => {
      renderMainLayout();
      
      const studyLinks = screen.getAllByRole('link', { name: /study/i });
      expect(studyLinks.length).toBeGreaterThan(0);
    });

    it('renders Practice link', () => {
      renderMainLayout();
      
      const practiceLinks = screen.getAllByRole('link', { name: /practice/i });
      expect(practiceLinks.length).toBeGreaterThan(0);
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
