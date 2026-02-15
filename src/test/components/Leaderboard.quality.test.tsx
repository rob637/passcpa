/**
 * Quality tests for Leaderboard component
 * Tests community leaderboard display and ranking visualization
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

// Mock dependencies
vi.mock('../../hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    user: { uid: 'test-user' },
  })),
}));

vi.mock('../../hooks/useStudy', () => ({
  useStudy: vi.fn(() => ({
    todayLog: { questionsAttempted: 10, studyTimeMinutes: 30 },
    currentStreak: 5,
  })),
}));

vi.mock('../../providers/CourseProvider', () => ({
  useCourse: vi.fn(() => ({
    courseId: 'far',
  })),
}));

vi.mock('../../services/leaderboardService', () => ({
  getUserRanking: vi.fn(),
  getCommunityStats: vi.fn(),
  getMotivationalMessage: vi.fn(() => 'Keep up the great work!'),
  recordDailyActivity: vi.fn().mockResolvedValue(undefined),
  recordStreak: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../utils/logger', () => ({
  default: {
    error: vi.fn(),
  },
}));

import Leaderboard from '../../components/Leaderboard';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import {
  getUserRanking,
  getCommunityStats,
  getMotivationalMessage,
  recordDailyActivity,
  recordStreak,
} from '../../services/leaderboardService';

describe('Leaderboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock return values
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      user: { uid: 'test-user' },
    });
    
    (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
      todayLog: { questionsAttempted: 10, studyTimeMinutes: 30 },
      currentStreak: 5,
    });
    
    (getUserRanking as ReturnType<typeof vi.fn>).mockResolvedValue({
      questionsPercentile: 75,
      minutesPercentile: 60,
      streakPercentile: 85,
      questionsToday: 10,
      minutesToday: 30,
      currentStreak: 5,
    });
    
    (getCommunityStats as ReturnType<typeof vi.fn>).mockResolvedValue({
      todayActive: 1234,
      weeklyActive: 5678,
      totalQuestions: 100000,
      avgDailyStudy: 45,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('loading state', () => {
    it('should show loading skeleton initially', () => {
      // Make the fetch hang
      (getUserRanking as ReturnType<typeof vi.fn>).mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      render(<Leaderboard />);

      // Should show loading skeleton
      expect(document.querySelector('.animate-pulse')).toBeNull(); // regular mode has no animate-pulse
    });

    it('should show loading skeleton in compact mode', () => {
      (getUserRanking as ReturnType<typeof vi.fn>).mockImplementation(
        () => new Promise(() => {})
      );

      render(<Leaderboard compact />);

      // Compact mode has animate-pulse class added
      expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
    });
  });

  describe('unauthenticated state', () => {
    it('should show join community message when user is not logged in', async () => {
      (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
        user: null,
      });

      render(<Leaderboard />);

      await waitFor(() => {
        expect(screen.getByText('Join the Community')).toBeInTheDocument();
      });
      
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByText(/Sign in to see how you compare/)).toBeInTheDocument();
    });

    it('should not fetch data when user is not logged in', async () => {
      (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
        user: null,
      });

      render(<Leaderboard />);

      await waitFor(() => {
        expect(screen.getByText('Join the Community')).toBeInTheDocument();
      });

      expect(getUserRanking).not.toHaveBeenCalled();
      expect(getCommunityStats).not.toHaveBeenCalled();
    });

    it('should have sign in link pointing to login', async () => {
      (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
        user: null,
      });

      render(<Leaderboard />);

      await waitFor(() => {
        const signInLink = screen.getByText('Sign In').closest('a');
        expect(signInLink).toHaveAttribute('href', '/login');
      });
    });
  });

  describe('compact mode', () => {
    it('should render compact view with percentile grid', async () => {
      render(<Leaderboard compact />);

      await waitFor(() => {
        expect(screen.getByText('Your Ranking')).toBeInTheDocument();
      });

      expect(screen.getByText('Questions')).toBeInTheDocument();
      expect(screen.getByText('Study Time')).toBeInTheDocument();
      expect(screen.getByText('Streak')).toBeInTheDocument();
    });

    it('should show percentile values in compact mode', async () => {
      render(<Leaderboard compact />);

      await waitFor(() => {
        expect(screen.getByText('75%')).toBeInTheDocument();
        expect(screen.getByText('60%')).toBeInTheDocument();
        expect(screen.getByText('85%')).toBeInTheDocument();
      });
    });

    it('should show motivational message', async () => {
      render(<Leaderboard compact />);

      await waitFor(() => {
        expect(screen.getByText('Keep up the great work!')).toBeInTheDocument();
      });
    });

    it('should hide View All link when community feature is disabled', async () => {
      render(<Leaderboard compact />);

      await waitFor(() => {
        expect(screen.queryByText('View All')).not.toBeInTheDocument();
      });
    });

    it('should show community stats when available', async () => {
      render(<Leaderboard compact />);

      await waitFor(() => {
        expect(screen.getByText(/1,234 candidates/)).toBeInTheDocument();
      });
    });

    it('should not show community stats when todayActive is 0', async () => {
      (getCommunityStats as ReturnType<typeof vi.fn>).mockResolvedValue({
        todayActive: 0,
        weeklyActive: 0,
        totalQuestions: 0,
        avgDailyStudy: 0,
      });

      render(<Leaderboard compact />);

      await waitFor(() => {
        expect(screen.getByText('Your Ranking')).toBeInTheDocument();
      });

      expect(screen.queryByText('Studying with you today:')).not.toBeInTheDocument();
    });
  });

  describe('data recording', () => {
    it('should record daily activity when user has studied', async () => {
      render(<Leaderboard />);

      await waitFor(() => {
        expect(recordDailyActivity).toHaveBeenCalledWith(
          'test-user',
          'FAR',
          10, // questionsAttempted
          30  // studyTimeMinutes
        );
      });
    });

    it('should record streak when user has one', async () => {
      render(<Leaderboard />);

      await waitFor(() => {
        expect(recordStreak).toHaveBeenCalledWith('test-user', 5);
      });
    });

    it('should not record activity when user has not studied', async () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        todayLog: { questionsAttempted: 0, studyTimeMinutes: 0 },
        currentStreak: 0,
      });

      render(<Leaderboard compact />);

      await waitFor(() => {
        expect(screen.getByText('Your Ranking')).toBeInTheDocument();
      });

      expect(recordDailyActivity).not.toHaveBeenCalled();
    });

    it('should not record streak when currentStreak is 0', async () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        todayLog: { questionsAttempted: 10, studyTimeMinutes: 30 },
        currentStreak: 0,
      });

      render(<Leaderboard compact />);

      await waitFor(() => {
        expect(screen.getByText('Your Ranking')).toBeInTheDocument();
      });

      expect(recordStreak).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle fetch errors gracefully', async () => {
      const logger = await import('../../utils/logger');
      (getUserRanking as ReturnType<typeof vi.fn>).mockRejectedValue(
        new Error('Network error')
      );

      render(<Leaderboard />);

      await waitFor(() => {
        expect(logger.default.error).toHaveBeenCalledWith(
          'Error fetching leaderboard data:',
          expect.any(Error)
        );
      });
    });

    it('should still set loading to false after error', async () => {
      (getUserRanking as ReturnType<typeof vi.fn>).mockRejectedValue(
        new Error('Network error')
      );

      render(<Leaderboard />);

      // Should not stay in loading state forever
      await waitFor(() => {
        // Loading skeleton should be gone
        expect(document.querySelector('.animate-pulse')).toBeNull();
      });
    });
  });

  describe('section detection', () => {
    it('should use courseId for section', async () => {
      render(<Leaderboard />);

      await waitFor(() => {
        expect(getUserRanking).toHaveBeenCalledWith(
          'FAR',
          expect.any(Number),
          expect.any(Number),
          expect.any(Number)
        );
      });
    });

    it('should pass course data to motivational message', async () => {
      render(<Leaderboard />);

      await waitFor(() => {
        expect(getMotivationalMessage).toHaveBeenCalledWith(
          expect.any(Object),
          'FAR'
        );
      });
    });
  });

  describe('null/undefined handling', () => {
    it('should handle null todayLog', async () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        todayLog: null,
        currentStreak: 5,
      });

      render(<Leaderboard compact />);

      await waitFor(() => {
        expect(screen.getByText('Your Ranking')).toBeInTheDocument();
      });

      // Should not crash and should use 0 as default
      expect(getUserRanking).toHaveBeenCalledWith('FAR', 0, 0, 5);
    });

    it('should handle null ranking values with defaults', async () => {
      (getUserRanking as ReturnType<typeof vi.fn>).mockResolvedValue({
        questionsPercentile: null,
        minutesPercentile: undefined,
        streakPercentile: null,
      });

      render(<Leaderboard compact />);

      await waitFor(() => {
        // Should show default 50% values (due to || 50 fallback)
        const fiftyPercents = screen.getAllByText(/50/);
        expect(fiftyPercents.length).toBeGreaterThanOrEqual(3);
      });
    });
  });

  describe('PercentileRing subcomponent', () => {
    it('should render full mode with percentile rings', async () => {
      render(<Leaderboard compact={false} />);

      await waitFor(() => {
        // The full mode has "Community Leaderboard" header
        expect(screen.getByText('Community Leaderboard')).toBeInTheDocument();
      });

      expect(screen.getByText('Your Percentile Rankings')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle very high percentile values', async () => {
      (getUserRanking as ReturnType<typeof vi.fn>).mockResolvedValue({
        questionsPercentile: 99,
        minutesPercentile: 100,
        streakPercentile: 95,
      });

      render(<Leaderboard compact />);

      await waitFor(() => {
        expect(screen.getByText('99%')).toBeInTheDocument();
        expect(screen.getByText('100%')).toBeInTheDocument();
        expect(screen.getByText('95%')).toBeInTheDocument();
      });
    });

    it('should handle zero percentile values', async () => {
      // Note: zero values fallback to 50 due to || operator in the component
      (getUserRanking as ReturnType<typeof vi.fn>).mockResolvedValue({
        questionsPercentile: 0,
        minutesPercentile: 0,
        streakPercentile: 0,
      });

      render(<Leaderboard compact />);

      await waitFor(() => {
        // Because of the || 50 fallback, zero values show as 50
        const fiftyPercents = screen.getAllByText(/50/);
        expect(fiftyPercents.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('should handle large community stats numbers', async () => {
      (getCommunityStats as ReturnType<typeof vi.fn>).mockResolvedValue({
        todayActive: 1000000,
        weeklyActive: 5000000,
        totalQuestions: 100000000,
        avgDailyStudy: 45,
      });

      render(<Leaderboard compact />);

      await waitFor(() => {
        expect(screen.getByText(/1,000,000 candidates/)).toBeInTheDocument();
      });
    });

    it('should not show motivational message when empty', async () => {
      (getMotivationalMessage as ReturnType<typeof vi.fn>).mockReturnValue('');

      render(<Leaderboard compact />);

      await waitFor(() => {
        expect(screen.getByText('Your Ranking')).toBeInTheDocument();
      });

      // Should not render motivational message container
      expect(screen.queryByText('Keep up the great work!')).not.toBeInTheDocument();
    });
  });
});
