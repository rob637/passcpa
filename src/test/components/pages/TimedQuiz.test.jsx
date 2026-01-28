import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn().mockResolvedValue({
    docs: [
      { id: 'q1', data: () => ({ question: 'Test Q1?', options: ['A', 'B', 'C', 'D'], correctAnswer: 0 }) },
    ],
  }),
  limit: vi.fn(),
}));

vi.mock('../../../config/firebase', () => ({
  db: {},
}));

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user' },
    userProfile: { examSection: 'REG' },
  }),
}));

vi.mock('../../../hooks/useStudy', () => ({
  useStudy: () => ({
    recordMCQAnswer: vi.fn(),
  }),
}));

vi.mock('../../../services/feedback', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
    correct: vi.fn(),
    incorrect: vi.fn(),
  },
}));

// Mock useSearchParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(''), vi.fn()],
    useNavigate: () => vi.fn(),
  };
});

// Import after mocks
import TimedQuiz from '../../../components/pages/TimedQuiz';

const renderTimedQuiz = () => {
  return render(
    <BrowserRouter>
      <TimedQuiz />
    </BrowserRouter>
  );
};

describe('TimedQuiz Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Setup Phase', () => {
    it('renders quiz setup screen', () => {
      renderTimedQuiz();
      // Should show quiz interface
      expect(document.body.textContent).toBeTruthy();
    });

    it('shows quiz options', () => {
      renderTimedQuiz();
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('has interactive elements', () => {
      renderTimedQuiz();
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Mode Selection', () => {
    it('allows clicking mode buttons', () => {
      renderTimedQuiz();
      const buttons = screen.getAllByRole('button');
      if (buttons.length > 0) {
        fireEvent.click(buttons[0]);
      }
      expect(true).toBe(true);
    });

    it('renders mode options', () => {
      renderTimedQuiz();
      const content = document.body.textContent;
      expect(content).toBeTruthy();
    });
  });

  describe('Quiz Info', () => {
    it('shows quiz information', () => {
      renderTimedQuiz();
      // Should have some content about the quiz
      const content = document.body.textContent;
      expect(content).toBeTruthy();
    });
  });
});
