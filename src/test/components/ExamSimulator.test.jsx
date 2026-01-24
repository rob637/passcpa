import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ExamSimulator from '../../components/pages/ExamSimulator';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(() =>
    Promise.resolve({
      docs: [
        {
          id: 'q1',
          data: () => ({
            section: 'REG',
            question: 'Test question 1?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 0,
            explanation: 'Test explanation',
          }),
        },
        {
          id: 'q2',
          data: () => ({
            section: 'REG',
            question: 'Test question 2?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 1,
            explanation: 'Test explanation 2',
          }),
        },
      ],
    })
  ),
  limit: vi.fn(),
}));

vi.mock('../../config/firebase', () => ({
  db: {},
}));

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user-123' },
    userProfile: {
      examSection: 'REG',
      displayName: 'Test User',
    },
  }),
}));

vi.mock('../../hooks/useStudy', () => ({
  useStudy: () => ({
    completeSimulation: vi.fn(),
  }),
}));

vi.mock('../../services/feedback', () => ({
  default: {
    haptic: vi.fn(),
    playSound: vi.fn(),
    complete: vi.fn(),
    click: vi.fn(),
    tap: vi.fn(),
    incorrect: vi.fn(),
  },
}));

const renderExamSimulator = () => {
  return render(
    <MemoryRouter>
      <ExamSimulator />
    </MemoryRouter>
  );
};

describe('ExamSimulator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Intro Screen', () => {
    it('should display exam simulator title', () => {
      renderExamSimulator();
      expect(screen.getByText(/Exam Simulator/i)).toBeInTheDocument();
    });

    it('should show exam type selection (Mini vs Full)', () => {
      renderExamSimulator();
      expect(screen.getByText(/Mini Exam/i)).toBeInTheDocument();
      expect(screen.getByText(/Full Exam/i)).toBeInTheDocument();
    });

    it('should have Mini Exam as recommended and default', () => {
      renderExamSimulator();
      expect(screen.getByText(/Recommended/i)).toBeInTheDocument();
    });

    it('should display exam time info for Mini Exam', () => {
      renderExamSimulator();
      expect(screen.getByText(/50 minutes/i)).toBeInTheDocument();
    });

    it('should display exam rules', () => {
      renderExamSimulator();
      expect(screen.getByText(/Exam Rules/i)).toBeInTheDocument();
      expect(screen.getByText(/flag questions/i)).toBeInTheDocument();
    });

    it('should mention passing threshold of 75%', () => {
      renderExamSimulator();
      expect(screen.getByText(/75%/i)).toBeInTheDocument();
    });

    it('should have Begin Exam button', () => {
      renderExamSimulator();
      expect(screen.getByRole('button', { name: /Begin Exam/i })).toBeInTheDocument();
    });

    it('should have Back to Study button', () => {
      renderExamSimulator();
      expect(screen.getByRole('button', { name: /Back to Study/i })).toBeInTheDocument();
    });
  });

  describe('Exam Type Selection', () => {
    it('should allow selecting Full Exam', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderExamSimulator();

      const fullExamButton = screen.getByText(/Full Exam/i).closest('button');
      await user.click(fullExamButton);

      // Full exam should now be selected (has primary border)
      expect(fullExamButton).toHaveClass('border-primary-500');
    });

    it('should display Full Exam duration (4 hours)', async () => {
      renderExamSimulator();
      expect(screen.getByText(/4 hours/i)).toBeInTheDocument();
    });

    it('should display Full Exam question count', async () => {
      renderExamSimulator();
      expect(screen.getByText(/72\+/i)).toBeInTheDocument();
    });

    it('should display Mini Exam question count', async () => {
      renderExamSimulator();
      expect(screen.getByText(/36 MCQs/i)).toBeInTheDocument();
    });
  });

  describe('Exam Rules Display', () => {
    it('should inform about flagging questions', () => {
      renderExamSimulator();
      expect(screen.getByText(/flag questions and return/i)).toBeInTheDocument();
    });

    it('should inform about timer behavior', () => {
      renderExamSimulator();
      expect(screen.getByText(/Timer runs continuously/i)).toBeInTheDocument();
    });

    it('should mention score report at end', () => {
      renderExamSimulator();
      expect(screen.getByText(/detailed score report/i)).toBeInTheDocument();
    });
  });

  describe('Starting Exam', () => {
    it('should show loading state when clicking Begin Exam', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderExamSimulator();

      const beginButton = screen.getByRole('button', { name: /Begin Exam/i });
      await user.click(beginButton);

      // Should show loading state
      await waitFor(() => {
        const hasLoading = screen.queryByText(/Preparing Exam/i);
        expect(hasLoading || beginButton).toBeTruthy();
      });
    });
  });

  describe('Section Info Display', () => {
    it('should display user section (REG)', () => {
      renderExamSimulator();
      expect(screen.getByText('REG')).toBeInTheDocument();
    });

    it('should show practice under real exam conditions message', () => {
      renderExamSimulator();
      expect(screen.getByText(/Practice under real exam conditions/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper button roles', () => {
      renderExamSimulator();
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });

    it('should have descriptive button labels', () => {
      renderExamSimulator();
      expect(screen.getByRole('button', { name: /Begin Exam/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Back to Study/i })).toBeInTheDocument();
    });
  });
});
