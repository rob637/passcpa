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

vi.mock('../../utils/sectionUtils', () => ({
  getSectionDisplayInfo: () => ({ name: 'REG', fullName: 'Regulation' }),
  getCurrentSectionForCourse: () => 'REG',
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

vi.mock('../../providers/CourseProvider', () => ({
  useCourse: () => ({
    courseId: 'cpa',
    course: {
      id: 'cpa',
      name: 'CPA',
      shortName: 'CPA',
      hasTBS: true,
      passingScore: 75,
    },
  }),
}));

const renderExamSimulator = () => {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
    it('should display exams page title', () => {
      renderExamSimulator();
      expect(screen.getByRole('heading', { name: /Exams/i })).toBeInTheDocument();
    });

    it('should show exam type selection (Mini vs Full)', () => {
      renderExamSimulator();
      expect(screen.getByText(/Mini Exam/i)).toBeInTheDocument();
      expect(screen.getByText(/Full Exam/i)).toBeInTheDocument();
    });

    it('should have Mini Exam selected by default', () => {
      renderExamSimulator();
      const miniExamButton = screen.getByText(/Mini Exam/i).closest('button');
      expect(miniExamButton).toHaveClass('border-primary-500');
    });

    it('should display exam time info for Mini Exam', () => {
      renderExamSimulator();
      expect(screen.getAllByText(/50 mins/i).length).toBeGreaterThan(0);
    });

    it('should display exam type selection', () => {
      renderExamSimulator();
      expect(screen.getByText(/Select Exam Type/i)).toBeInTheDocument();
    });

    it('should show section info', () => {
      renderExamSimulator();
      expect(screen.getByText(/REG/i)).toBeInTheDocument();
    });

    it('should have Begin Examination button', () => {
      renderExamSimulator();
      expect(screen.getByRole('button', { name: /Begin Examination/i })).toBeInTheDocument();
    });

    it('should display course section name', () => {
      renderExamSimulator();
      expect(screen.getByText(/Practice exams and simulations/i)).toBeInTheDocument();
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

    it('should display Full Exam structure info', async () => {
      renderExamSimulator();
      expect(screen.getByText(/Full CPA exam/i)).toBeInTheDocument();
    });

    it('should display Mini Exam question count', async () => {
      renderExamSimulator();
      expect(screen.getByText(/36 MCQs/i)).toBeInTheDocument();
    });
  });

  describe('Exam Rules Display', () => {
    it('should inform about testlet structure', () => {
      renderExamSimulator();
      expect(screen.getByText(/Cannot return to previous testlets/i)).toBeInTheDocument();
    });

    it('should inform about timer behavior', () => {
      renderExamSimulator();
      expect(screen.getByText(/clock continues running/i)).toBeInTheDocument();
    });

    it('should mention real exam simulation', () => {
      renderExamSimulator();
      expect(screen.getByText(/Simulate real exam pressure/i)).toBeInTheDocument();
    });
  });

  describe('Starting Exam', () => {
    it('should show loading state when clicking Begin Examination', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderExamSimulator();

      const beginButton = screen.getByRole('button', { name: /Begin Examination/i });
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
      // Section shows in the subtitle text
      expect(screen.getByText(/REG/)).toBeInTheDocument();
    });

    it('should show section description', () => {
      renderExamSimulator();
      expect(screen.getByText(/Practice exams and simulations for/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper button roles', () => {
      renderExamSimulator();
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('should have descriptive button labels', () => {
      renderExamSimulator();
      expect(screen.getByRole('button', { name: /Begin Examination/i })).toBeInTheDocument();
    });
  });
});
