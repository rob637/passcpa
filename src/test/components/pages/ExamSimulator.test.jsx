import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExamSimulator from '../../../components/pages/ExamSimulator';

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock auth
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user' },
    userProfile: { examSection: 'REG', displayName: 'Test User' },
  }),
}));

// Mock study hook
vi.mock('../../../hooks/useStudy', () => ({
  useStudy: () => ({
    recordMCQAnswer: vi.fn(),
    recordExamAttempt: vi.fn(),
  }),
}));

// Mock Firebase
vi.mock('../../../config/firebase', () => ({
  db: {},
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn().mockResolvedValue({
    docs: Array.from({ length: 36 }, (_, i) => ({
      id: `q${i}`,
      data: () => ({
        id: `q${i}`,
        question: `Test question ${i + 1}?`,
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Test explanation',
        section: 'REG',
        topic: 'Test Topic',
      }),
    })),
  }),
  limit: vi.fn(),
}));

// Mock feedback
vi.mock('../../../services/feedback', () => ({
  default: {
    playSound: vi.fn(),
    haptic: vi.fn(),
  },
}));

const renderExamSimulator = () => {
  return render(
    <MemoryRouter>
      <ExamSimulator />
    </MemoryRouter>
  );
};

describe('ExamSimulator Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Exam Setup', () => {
    it('renders exam simulator', () => {
      renderExamSimulator();
      // Should show setup or exam interface
      expect(document.body.textContent).toBeTruthy();
    });

    it('displays section selection', () => {
      renderExamSimulator();
      // Should show exam section options or selected section
      const content = document.body.textContent;
      expect(content.includes('REG') || content.includes('Exam') || content.includes('Section')).toBe(true);
    });

    it('shows navigation buttons', () => {
      renderExamSimulator();
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Interface Elements', () => {
    it('displays page structure', () => {
      renderExamSimulator();
      const content = document.body.textContent;
      expect(content).toBeTruthy();
    });

    it('shows buttons for interaction', () => {
      renderExamSimulator();
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(1);
    });
  });
});
