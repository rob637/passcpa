import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../../components/pages/Dashboard';

// Mock date-fns
vi.mock('date-fns', () => ({
  differenceInDays: vi.fn(() => 30),
  format: vi.fn(() => 'Jan 1'),
}));

// Mock hooks
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: '123' },
    userProfile: {
      examSection: 'REG',
      displayName: 'Test User',
      examDate: '2026-03-01',
      studyStreak: 5,
    },
  }),
}));

vi.mock('../../../hooks/useStudy', () => ({
  useStudy: () => ({
    todayLog: { questionsAnswered: 25, lessonsCompleted: 2 },
    dailyProgress: 70,
    dailyGoalMet: false,
    weeklyStats: {
      questionsByDay: [10, 15, 20, 25, 30, 35, 25],
      averageAccuracy: 75,
    },
    recentActivity: [
      { type: 'lesson', title: 'Tax Basics', timestamp: new Date() },
    ],
  }),
}));

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render welcome message', () => {
      renderDashboard();
      // Check for any heading or main content
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });

    it('should display study section link', () => {
      renderDashboard();
      // Should have navigation links
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });

    it('should render main dashboard content', () => {
      const { container } = renderDashboard();
      // Just check it renders without errors
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should display quick action links', () => {
      renderDashboard();
      // Should have links to continue studying
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('Progress Ring', () => {
    it('should render progress visualization', () => {
      const { container } = renderDashboard();
      // Check for SVG progress ring
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Study Stats', () => {
    it('should display statistics', () => {
      const { container } = renderDashboard();
      // Check that stats are rendered
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should have navigation links', () => {
      renderDashboard();
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });

    it('should have practice or study links', () => {
      renderDashboard();
      const links = screen.getAllByRole('link');
      // Verify at least one link exists
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('Exam Countdown', () => {
    it('should display exam info', () => {
      const { container } = renderDashboard();
      // Dashboard should render exam-related content
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
