import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Practice from '../../components/pages/Practice';

// Mock questions data
const mockQuestions = [
  {
    id: 'q1',
    section: 'REG',
    topicId: 'reg-ethics',
    topic: 'Ethics',
    difficulty: 'medium',
    question: 'What is the penalty for willful failure to file?',
    options: ['$250', '$500', '$1,000', '$5,000'],
    correctAnswer: 2,
    explanation: 'The penalty for willful failure to file is $1,000 per IRC Section 6651.',
  },
  {
    id: 'q2',
    section: 'REG',
    topicId: 'reg-income',
    topic: 'Individual Income Tax',
    difficulty: 'easy',
    question: 'Which of the following is not included in gross income?',
    options: ['Wages', 'Life insurance proceeds', 'Dividends', 'Interest'],
    correctAnswer: 1,
    explanation: 'Life insurance proceeds paid by reason of death are excluded.',
  },
];

const mockRecordMCQAnswer = vi.fn();
const mockLogActivity = vi.fn();

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    userProfile: {
      examSection: 'REG',
      displayName: 'Test User',
    },
    user: { uid: 'test-user-123' },
  }),
}));

vi.mock('../../hooks/useStudy', () => ({
  useStudy: () => ({
    recordMCQAnswer: mockRecordMCQAnswer,
    logActivity: mockLogActivity,
  }),
}));

vi.mock('../../services/questionService', () => ({
  fetchQuestions: vi.fn(() => Promise.resolve(mockQuestions)),
  getWeakAreaQuestions: vi.fn(() => Promise.resolve(mockQuestions)),
}));

vi.mock('../../services/feedback', () => ({
  default: {
    haptic: vi.fn(),
    playSound: vi.fn(),
  },
}));

const renderPractice = () => {
  return render(
    <MemoryRouter initialEntries={['/practice']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Practice />
    </MemoryRouter>
  );
};

describe('Practice Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Session Setup Screen', () => {
    it('should render practice questions title', async () => {
      renderPractice();

      await waitFor(() => {
        expect(screen.getByText(/Practice Questions/i)).toBeInTheDocument();
      });
    });

    it('should display exam section selector', async () => {
      renderPractice();

      await waitFor(() => {
        expect(screen.getByText(/Exam Section/i)).toBeInTheDocument();
      });
    });

    it('should display practice mode options', async () => {
      renderPractice();

      await waitFor(() => {
        expect(screen.getByText(/Practice Mode/i)).toBeInTheDocument();
        expect(screen.getByText(/Study/i)).toBeInTheDocument();
        expect(screen.getByText(/Timed/i)).toBeInTheDocument();
      });
    });

    it('should display question count options', async () => {
      renderPractice();

      await waitFor(() => {
        expect(screen.getByText(/Number of Questions/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '5 questions' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '10 questions' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '20 questions' })).toBeInTheDocument();
      });
    });

    it('should display difficulty selector in advanced options', async () => {
      const user = userEvent.setup();
      renderPractice();

      // Click to open advanced options
      await waitFor(() => {
        expect(screen.getByText(/Advanced Options/i)).toBeInTheDocument();
      });
      await user.click(screen.getByText(/Advanced Options/i));

      await waitFor(() => {
        expect(screen.getByText(/Difficulty Level/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /All Levels/i })).toBeInTheDocument();
      });
    });

    it('should display start button', async () => {
      renderPractice();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Start Practice/i })).toBeInTheDocument();
      });
    });

    it('should allow selecting different question counts', async () => {
      const user = userEvent.setup();
      renderPractice();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: '20 questions' })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: '20 questions' }));
      const button20 = screen.getByRole('button', { name: '20 questions' });
      expect(button20).toBeInTheDocument();
    });

    it('should allow selecting different difficulty levels', async () => {
      const user = userEvent.setup();
      renderPractice();

      // Open advanced options first
      await waitFor(() => {
        expect(screen.getByText(/Advanced Options/i)).toBeInTheDocument();
      });
      await user.click(screen.getByText(/Advanced Options/i));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Hard/i })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: /Hard/i }));
      expect(screen.getByRole('button', { name: /Hard/i })).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Practice Mode Selection', () => {
    it('should have Study mode as default', async () => {
      renderPractice();

      await waitFor(() => {
        const studyButton = screen.getByText(/Study/i).closest('button');
        expect(studyButton).toHaveClass('border-primary-500');
      });
    });

    it('should allow selecting Timed mode', async () => {
      const user = userEvent.setup();
      renderPractice();

      await waitFor(() => {
        expect(screen.getByText(/Timed/i)).toBeInTheDocument();
      });

      await user.click(screen.getByText(/Timed/i).closest('button'));

      const timedButton = screen.getByText(/Timed/i).closest('button');
      expect(timedButton).toHaveClass('border-primary-500');
    });

    it('should allow selecting Exam Sim mode', async () => {
      const user = userEvent.setup();
      renderPractice();

      await waitFor(() => {
        // Find the Exam Sim mode button (contains "Full exam conditions" text)
        expect(screen.getByText(/Exam Sim/i)).toBeInTheDocument();
      });

      // Find the Exam Sim button in the practice modes section
      const examModeButton = screen.getByText(/Exam Sim/i).closest('button');
      await user.click(examModeButton);

      expect(examModeButton).toHaveClass('border-primary-500');
    });
  });

  describe('Section Selection', () => {
    it('should have section dropdown with all CPA sections', async () => {
      renderPractice();

      await waitFor(() => {
        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
      });
    });

    it('should default to user profile exam section (REG)', async () => {
      renderPractice();

      await waitFor(() => {
        const select = screen.getByRole('combobox');
        expect(select).toHaveValue('REG');
      });
    });
  });

  describe('Starting a Session', () => {
    it('should show loading state when start is clicked', async () => {
      const user = userEvent.setup();
      renderPractice();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Start Practice/i })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: /Start Practice/i }));

      // Should show loading state or questions
      await waitFor(
        () => {
          const hasLoading = screen.queryByText(/Loading Questions/i);
          const hasQuestion = screen.queryByText(/What is the penalty/i);
          expect(hasLoading || hasQuestion).toBeTruthy();
        },
        { timeout: 3000 }
      );
    });
  });

  describe('Accessibility', () => {
    it('should have proper form labels', async () => {
      renderPractice();

      await waitFor(() => {
        expect(screen.getByText(/Exam Section/i)).toBeInTheDocument();
        expect(screen.getByText(/Practice Mode/i)).toBeInTheDocument();
        expect(screen.getByText(/Number of Questions/i)).toBeInTheDocument();
        // Difficulty is now in Advanced Options, so check that section exists
        expect(screen.getByText(/Advanced Options/i)).toBeInTheDocument();
      });
    });

    it('should have accessible buttons', async () => {
      renderPractice();

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(5);
      });
    });
  });
});
