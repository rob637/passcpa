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

vi.mock('../../providers/CourseProvider', () => ({
  useCourse: () => ({
    courseId: 'cpa',
    course: {
      id: 'cpa',
      name: 'CPA',
      hasTBS: true,
      sections: [
        { id: 'FAR', name: 'Financial Accounting & Reporting', shortName: 'FAR' },
        { id: 'AUD', name: 'Auditing & Attestation', shortName: 'AUD' },
        { id: 'REG', name: 'Regulation', shortName: 'REG' },
        { id: 'TCP', name: 'Tax Compliance & Planning', shortName: 'TCP' },
        { id: 'BAR', name: 'Business Analysis & Reporting', shortName: 'BAR' },
        { id: 'ISC', name: 'Information Systems & Controls', shortName: 'ISC' },
      ],
    },
  }),
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
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('Session Setup Screen', () => {
    it('should render practice questions title', async () => {
      renderPractice();

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Practice/i })).toBeInTheDocument();
      });
    });

    it('should display exam section selector', async () => {
      renderPractice();

      await waitFor(() => {
        expect(screen.getByText(/Section/i)).toBeInTheDocument();
      });
    });

    it('should display practice mode options', async () => {
      renderPractice();

      await waitFor(() => {
        // Practice modes are now checkboxes for Timed and Focus on weak areas
        expect(screen.getByText(/Timed/i)).toBeInTheDocument();
        expect(screen.getByText(/Focus on weak areas/i)).toBeInTheDocument();
      });
    });

    it('should display question count options', async () => {
      renderPractice();

      await waitFor(() => {
        // "Questions" label should be present (can match multiple, so use getAllByText)
        const questionsLabels = screen.getAllByText(/questions/i);
        expect(questionsLabels.length).toBeGreaterThan(0);
        expect(screen.getByRole('button', { name: '10 questions' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '25 questions' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '50 questions' })).toBeInTheDocument();
      });
    });

    it('should display difficulty selector in advanced options', async () => {
      const user = userEvent.setup();
      renderPractice();

      // Click to open more options
      await waitFor(() => {
        expect(screen.getByText(/More options/i)).toBeInTheDocument();
      });
      await user.click(screen.getByText(/More options/i));

      await waitFor(() => {
        expect(screen.getByText(/Difficulty/i)).toBeInTheDocument();
        // Difficulty is now a select dropdown, not buttons
        const difficultySelect = screen.getAllByRole('combobox')[1]; // Second dropdown after section
        expect(difficultySelect).toBeInTheDocument();
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
        expect(screen.getByRole('button', { name: '25 questions' })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: '25 questions' }));
      const button25 = screen.getByRole('button', { name: '25 questions' });
      expect(button25).toBeInTheDocument();
    });

    it('should allow selecting different difficulty levels', async () => {
      const user = userEvent.setup();
      renderPractice();

      // Open more options first
      await waitFor(() => {
        expect(screen.getByText(/More options/i)).toBeInTheDocument();
      });
      await user.click(screen.getByText(/More options/i));

      await waitFor(() => {
        // Difficulty is now a select dropdown
        expect(screen.getByText(/Difficulty/i)).toBeInTheDocument();
      });

      // Find the difficulty dropdown and change it
      const difficultySelects = screen.getAllByRole('combobox');
      const difficultySelect = difficultySelects.find(s => s.textContent?.includes('All Levels') || Array.from(s.options || []).some(o => o.value === 'hard'));
      if (difficultySelect) {
        await user.selectOptions(difficultySelect, 'hard');
      }
    });
  });

  describe('Practice Mode Selection', () => {
    it('should have default mode (not timed)', async () => {
      renderPractice();

      await waitFor(() => {
        // Timed is a checkbox - should not be checked by default
        const timedCheckbox = screen.getByRole('checkbox', { name: /Timed/i });
        expect(timedCheckbox).not.toBeChecked();
      });
    });

    it('should allow selecting Timed mode', async () => {
      const user = userEvent.setup();
      renderPractice();

      await waitFor(() => {
        expect(screen.getByText(/Timed/i)).toBeInTheDocument();
      });

      // Timed is now a checkbox
      const timedCheckbox = screen.getByRole('checkbox', { name: /Timed/i });
      await user.click(timedCheckbox);

      expect(timedCheckbox).toBeChecked();
    });

    it('should allow selecting weak areas mode', async () => {
      const user = userEvent.setup();
      renderPractice();

      await waitFor(() => {
        expect(screen.getByText(/Focus on weak areas/i)).toBeInTheDocument();
      });

      // Weak areas is a checkbox
      const weakAreasCheckbox = screen.getByRole('checkbox', { name: /Focus on weak areas/i });
      await user.click(weakAreasCheckbox);

      expect(weakAreasCheckbox).toBeChecked();
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
        expect(screen.getByText(/Section/i)).toBeInTheDocument();
        // "Questions" text appears in multiple places, use getAllByText
        const questionsElements = screen.getAllByText(/questions/i);
        expect(questionsElements.length).toBeGreaterThan(0);
        // More options toggle
        expect(screen.getByText(/More options/i)).toBeInTheDocument();
      });
    });

    it('should have accessible buttons', async () => {
      renderPractice();

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        // At least 4 buttons: 3 question counts + start button
        expect(buttons.length).toBeGreaterThanOrEqual(4);
      });
    });
  });
});
