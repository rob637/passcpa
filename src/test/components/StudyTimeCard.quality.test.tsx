/**
 * Quality tests for StudyTimeCard component
 * Tests study time visualization and breakdown
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';


// Mock useStudy hook
vi.mock('../../hooks/useStudy', () => ({
  useStudy: vi.fn(() => ({
    weeklyStats: { totalMinutes: 300 },
    todayLog: { studyTimeMinutes: 60 },
  })),
}));

import StudyTimeCard from '../../components/StudyTimeCard';
import { useStudy } from '../../hooks/useStudy';

const renderComponent = (props = {}) => {
  return render(
    <BrowserRouter>
      <StudyTimeCard {...props} />
    </BrowserRouter>
  );
};

describe('StudyTimeCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
      weeklyStats: { totalMinutes: 300 },
      todayLog: { studyTimeMinutes: 60 },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render study time card with data', () => {
      renderComponent();

      expect(screen.getByText('Study Time')).toBeInTheDocument();
    });

    it('should display today time', () => {
      renderComponent();

      expect(screen.getByText('1h')).toBeInTheDocument();
      expect(screen.getByText('today')).toBeInTheDocument();
    });

    it('should display activity legends', () => {
      renderComponent();

      expect(screen.getByText('Lessons')).toBeInTheDocument();
      expect(screen.getByText('MCQs')).toBeInTheDocument();
      expect(screen.getByText('TBS')).toBeInTheDocument();
      expect(screen.getByText('Flashcards')).toBeInTheDocument();
    });

    it('should display weekly total', () => {
      renderComponent();

      expect(screen.getByText('This week')).toBeInTheDocument();
      expect(screen.getByText('5h')).toBeInTheDocument();
    });

    it('should be a link to progress page', () => {
      renderComponent();

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/progress');
    });
  });

  describe('time formatting', () => {
    it('should format minutes under an hour', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 45 },
        todayLog: { studyTimeMinutes: 30 },
      });

      renderComponent();

      expect(screen.getByText('30m')).toBeInTheDocument();
    });

    it('should format exactly one hour', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 60 },
        todayLog: { studyTimeMinutes: 60 },
      });

      renderComponent();

      // Both today and weekly show 1h, use getAllByText
      const hourTexts = screen.getAllByText('1h');
      expect(hourTexts.length).toBeGreaterThanOrEqual(1);
    });

    it('should format hours and minutes', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 150 },
        todayLog: { studyTimeMinutes: 90 },
      });

      renderComponent();

      expect(screen.getByText('1h 30m')).toBeInTheDocument();
    });

    it('should format multi-hour times', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 600 },
        todayLog: { studyTimeMinutes: 180 },
      });

      renderComponent();

      expect(screen.getByText('3h')).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('should return null when no study time today or weekly', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 0 },
        todayLog: { studyTimeMinutes: 0 },
      });

      const { container } = renderComponent();

      expect(container.firstChild).toBeNull();
    });

    it('should return null when todayLog is null and weeklyStats is 0', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 0 },
        todayLog: null,
      });

      const { container } = renderComponent();

      expect(container.firstChild).toBeNull();
    });

    it('should render when only weekly stats exist', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 120 },
        todayLog: { studyTimeMinutes: 0 },
      });

      // Still has weekly stats so component shows
      renderComponent();

      // But component returns null when BOTH are 0
      // Since weekly is 120, it should show
      // Actually looking at code: if todayMinutes === 0 && weeklyMinutes === 0 return null
      // So if weekly > 0 but today = 0, it should still show
      expect(screen.getByText('Study Time')).toBeInTheDocument();
    });
  });

  describe('activity breakdown', () => {
    it('should show estimated lesson time', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 100 },
        todayLog: { studyTimeMinutes: 100 },
      });

      renderComponent();

      // 30% of 100 = 30m for lessons
      expect(screen.getByText('30m')).toBeInTheDocument();
    });

    it('should show estimated MCQ time', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 100 },
        todayLog: { studyTimeMinutes: 100 },
      });

      renderComponent();

      // 40% of 100 = 40m for MCQs
      expect(screen.getByText('40m')).toBeInTheDocument();
    });

    it('should show estimated TBS time', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 100 },
        todayLog: { studyTimeMinutes: 100 },
      });

      renderComponent();

      // 20% of 100 = 20m for TBS
      expect(screen.getByText('20m')).toBeInTheDocument();
    });

    it('should show estimated flashcard time', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 100 },
        todayLog: { studyTimeMinutes: 100 },
      });

      renderComponent();

      // 10% of 100 = 10m for flashcards
      expect(screen.getByText('10m')).toBeInTheDocument();
    });
  });

  describe('donut chart', () => {
    it('should render an SVG donut chart', () => {
      renderComponent();

      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should have circle elements for chart segments', () => {
      renderComponent();

      const circles = document.querySelectorAll('svg circle');
      // At least background circle + segments
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('weekly stats section', () => {
    it('should show weekly section when has weekly time', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 200 },
        todayLog: { studyTimeMinutes: 50 },
      });

      renderComponent();

      expect(screen.getByText('This week')).toBeInTheDocument();
    });

    it('should not show weekly section when weekly minutes is 0', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 0 },
        todayLog: { studyTimeMinutes: 50 },
      });

      renderComponent();

      expect(screen.queryByText('This week')).not.toBeInTheDocument();
    });

    it('should not show weekly section when weeklyStats is null', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: null,
        todayLog: { studyTimeMinutes: 50 },
      });

      renderComponent();

      expect(screen.queryByText('This week')).not.toBeInTheDocument();
    });
  });

  describe('undefined/null handling', () => {
    it('should handle undefined todayLog', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 100 },
        todayLog: undefined,
      });

      renderComponent();

      // Should still show because weekly > 0
      expect(screen.getByText('Study Time')).toBeInTheDocument();
    });

    it('should handle undefined weeklyStats', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: undefined,
        todayLog: { studyTimeMinutes: 60 },
      });

      renderComponent();

      expect(screen.getByText('Study Time')).toBeInTheDocument();
    });
  });

  describe('custom className', () => {
    it('should apply custom className', () => {
      const { container } = renderComponent({ className: 'custom-class' });

      const link = container.querySelector('a');
      expect(link).toHaveClass('custom-class');
    });
  });

  describe('color-coded legend', () => {
    it('should have colored dots for each activity type', () => {
      renderComponent();

      // Check for rounded color dots
      const colorDots = document.querySelectorAll('.rounded-full');
      expect(colorDots.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('SVG accessibility', () => {
    it('should render proper SVG elements', () => {
      renderComponent();

      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width');
      expect(svg).toHaveAttribute('height');
    });
  });

  describe('edge cases', () => {
    it('should handle very small study time', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 5 },
        todayLog: { studyTimeMinutes: 1 },
      });

      renderComponent();

      expect(screen.getByText('1m')).toBeInTheDocument();
    });

    it('should handle very large study time', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 1200 },
        todayLog: { studyTimeMinutes: 600 },
      });

      renderComponent();

      expect(screen.getByText('10h')).toBeInTheDocument();
    });

    it('should round decimal minutes', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        weeklyStats: { totalMinutes: 100 },
        todayLog: { studyTimeMinutes: 37.8 },
      });

      renderComponent();

      // Should round to 38m
      expect(screen.getByText('38m')).toBeInTheDocument();
    });
  });
});
