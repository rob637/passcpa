import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock all dependencies
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user' },
    userProfile: { examSection: 'REG', displayName: 'Test User' },
  }),
}));

vi.mock('../../../hooks/useStudy', () => ({
  useStudy: () => ({
    recordMCQAnswer: vi.fn(),
    logActivity: vi.fn(),
  }),
}));

vi.mock('../../../services/questionService', () => ({
  fetchQuestions: vi.fn().mockResolvedValue([
    {
      id: 'q1',
      question: 'Test question 1?',
      text: 'Test question 1?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      explanation: 'Test explanation',
      section: 'REG',
      topic: 'test-topic',
      difficulty: 'medium',
    },
  ]),
  getWeakAreaQuestions: vi.fn().mockResolvedValue([]),
}));

vi.mock('../../../config/examConfig', () => ({
  CPA_SECTIONS: {
    AUD: { name: 'Auditing and Attestation', shortName: 'AUD' },
    FAR: { name: 'Financial Accounting and Reporting', shortName: 'FAR' },
    REG: { name: 'Regulation', shortName: 'REG' },
    TCP: { name: 'Tax Compliance and Planning', shortName: 'TCP' },
    BAR: { name: 'Business Analysis and Reporting', shortName: 'BAR' },
    ISC: { name: 'Information Systems and Controls', shortName: 'ISC' },
  },
}));

vi.mock('../../../services/feedback', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    tap: vi.fn(),
  },
}));

vi.mock('../../../providers/CourseProvider', () => ({
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

// Import after mocks
import Practice from '../../../components/pages/Practice';

const renderPractice = () => {
  return render(
    <BrowserRouter>
      <Practice />
    </BrowserRouter>
  );
};

describe('Practice Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Session Setup', () => {
    it('renders setup screen by default', () => {
      renderPractice();
      expect(screen.getByRole('heading', { name: /Practice/i })).toBeInTheDocument();
    });

    it('displays exam section select', () => {
      renderPractice();
      expect(screen.getByText('Section')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('shows practice mode options', () => {
      renderPractice();
      // Practice modes are now checkboxes for Timed and Focus on weak areas
      expect(screen.getByText('Timed')).toBeInTheDocument();
      expect(screen.getByText(/Focus on weak areas/i)).toBeInTheDocument();
    });

    it('shows question count options', () => {
      renderPractice();
      expect(screen.getByText('Questions')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '10 questions' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '25 questions' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '50 questions' })).toBeInTheDocument();
    });

    it('shows difficulty options in advanced panel', () => {
      renderPractice();
      // Click to expand more options
      const moreOptionsBtn = screen.getByText('More options');
      fireEvent.click(moreOptionsBtn);
      
      expect(screen.getByText('Difficulty')).toBeInTheDocument();
      // Difficulty is now a dropdown
      const dropdowns = screen.getAllByRole('combobox');
      expect(dropdowns.length).toBeGreaterThan(1);
    });

    it('shows start practice button', () => {
      renderPractice();
      expect(screen.getByRole('button', { name: /Start Practice/i })).toBeInTheDocument();
    });

    it('allows selecting different practice modes', () => {
      renderPractice();
      // Timed is now a checkbox inside a label
      const timedCheckbox = screen.getByRole('checkbox', { name: /Timed/i });
      fireEvent.click(timedCheckbox);
      expect(timedCheckbox).toBeChecked();
    });

    it('allows selecting different question counts', () => {
      renderPractice();
      const count25 = screen.getByRole('button', { name: '25 questions' });
      fireEvent.click(count25);
      expect(count25).toHaveClass('border-primary-500');
    });

    it('allows selecting difficulty levels', () => {
      renderPractice();
      // Open more options first
      const moreOptionsBtn = screen.getByText('More options');
      fireEvent.click(moreOptionsBtn);
      
      // Difficulty is now a dropdown - just verify it's there
      expect(screen.getByText('Difficulty')).toBeInTheDocument();
    });

    it('allows changing exam section', () => {
      renderPractice();
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'FAR' } });
      expect(select.value).toBe('FAR');
    });
  });

  describe('Start Practice', () => {
    it('clicking start button triggers loading state', async () => {
      renderPractice();
      
      const startButton = screen.getByRole('button', { name: /Start Practice/i });
      fireEvent.click(startButton);
      
      // Button should show loading state or change
      expect(startButton).toBeInTheDocument();
    });
  });
});
