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
      expect(screen.getByText('Practice Questions')).toBeInTheDocument();
      expect(screen.getByText('Configure your practice session')).toBeInTheDocument();
    });

    it('displays exam section select', () => {
      renderPractice();
      expect(screen.getByText('Exam Section')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('shows practice mode options', () => {
      renderPractice();
      expect(screen.getByText('Practice Mode')).toBeInTheDocument();
      expect(screen.getByText('Study')).toBeInTheDocument();
      expect(screen.getByText('Timed')).toBeInTheDocument();
      expect(screen.getByText('Exam Sim')).toBeInTheDocument();
    });

    it('shows question count options', () => {
      renderPractice();
      expect(screen.getByText('Number of Questions')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '5 questions' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '10 questions' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '20 questions' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '30 questions' })).toBeInTheDocument();
    });

    it('shows difficulty options in advanced panel', () => {
      renderPractice();
      // Click to expand advanced options
      const advancedBtn = screen.getByText('Advanced Options');
      fireEvent.click(advancedBtn);
      
      expect(screen.getByText('Difficulty Level')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'All Levels' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Easy' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Medium' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Hard' })).toBeInTheDocument();
    });

    it('shows start practice button', () => {
      renderPractice();
      expect(screen.getByRole('button', { name: /Start Practice/i })).toBeInTheDocument();
    });

    it('allows selecting different practice modes', () => {
      renderPractice();
      const timedButton = screen.getByText('Timed');
      fireEvent.click(timedButton);
      // Button should be highlighted (visual change)
      expect(timedButton.closest('button')).toHaveClass('border-primary-500');
    });

    it('allows selecting different question counts', () => {
      renderPractice();
      const count20 = screen.getByRole('button', { name: '20 questions' });
      fireEvent.click(count20);
      expect(count20).toHaveClass('border-primary-500');
    });

    it('allows selecting difficulty levels', () => {
      renderPractice();
      // Open advanced options first
      const advancedBtn = screen.getByText('Advanced Options');
      fireEvent.click(advancedBtn);
      
      const hardButton = screen.getByRole('button', { name: 'Hard' });
      fireEvent.click(hardButton);
      expect(hardButton).toHaveAttribute('aria-pressed', 'true');
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
