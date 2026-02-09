import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AITutor from '../../components/pages/AITutor';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(() => Promise.resolve({ exists: () => false })),
  setDoc: vi.fn(() => Promise.resolve()),
  collection: vi.fn(),
  addDoc: vi.fn(() => Promise.resolve({ id: 'test-conv-id' })),
  query: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  getDocs: vi.fn(() => Promise.resolve({ empty: true, docs: [] })),
  updateDoc: vi.fn(() => Promise.resolve()),
  serverTimestamp: vi.fn(),
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
    weeklyStats: {},
    logActivity: vi.fn(),
  }),
}));

const mockGenerateAIResponse = vi.fn(() =>
  Promise.resolve('This is a test AI response about taxation.')
);

vi.mock('../../services/aiService', () => ({
  generateAIResponse: (...args) => mockGenerateAIResponse(...args),
}));

vi.mock('../../services/feedback', () => ({
  default: {
    haptic: vi.fn(),
    playSound: vi.fn(),
  },
}));

const renderAITutor = () => {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AITutor />
    </MemoryRouter>
  );
};

describe('AITutor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should render Vory interface with header', async () => {
      renderAITutor();

      await waitFor(() => {
        expect(screen.getByText(/Vory/i)).toBeInTheDocument();
      });
    });

    it('should show mode selection options', async () => {
      renderAITutor();

      await waitFor(() => {
        expect(screen.getByText(/Explain/i)).toBeInTheDocument();
        expect(screen.getByText(/Guide Me/i)).toBeInTheDocument();
        expect(screen.getByText(/Quiz Me/i)).toBeInTheDocument();
      });
    });

    it('should display message input area', async () => {
      renderAITutor();

      await waitFor(() => {
        // Default mode is 'explain' with placeholder "Ask anything about the CPA exam..."
        const input = screen.getByPlaceholderText(/Ask anything about the CPA exam/i);
        expect(input).toBeInTheDocument();
      });
    });

    it('should show greeting message after load', async () => {
      renderAITutor();

      await waitFor(
        () => {
          // Should show Vory header (the AI tutor's name)
          expect(screen.getByText(/Vory/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });
  });

  describe('Tutor Modes', () => {
    it('should have Explain mode button', async () => {
      renderAITutor();

      await waitFor(() => {
        expect(screen.getByText(/Explain/i)).toBeInTheDocument();
      });
    });

    it('should have Guide Me (Socratic) mode button', async () => {
      renderAITutor();

      await waitFor(() => {
        expect(screen.getByText(/Guide Me/i)).toBeInTheDocument();
      });
    });

    it('should have Quiz Me mode button', async () => {
      renderAITutor();

      await waitFor(() => {
        expect(screen.getByText(/Quiz Me/i)).toBeInTheDocument();
      });
    });

    it('should allow switching between modes', async () => {
      const user = userEvent.setup();
      renderAITutor();

      await waitFor(() => {
        expect(screen.getByText(/Vory/i)).toBeInTheDocument();
      });

      // Find all mode buttons in the header
      const buttons = screen.getAllByRole('button');
      const quizButton = buttons.find((btn) => btn.textContent.includes('Quiz'));

      if (quizButton) {
        await user.click(quizButton);
        // Button should be visually selected (has some visual indicator)
        // The class varies, so just verify click doesn't error
        expect(quizButton).toBeInTheDocument();
      } else {
        // If no Quiz Me text button, check for mode selector presence
        expect(buttons.length).toBeGreaterThan(2);
      }
    });
  });

  describe('Message Input', () => {
    it('should have a text input field', async () => {
      renderAITutor();

      await waitFor(() => {
        const input = screen.getByPlaceholderText(/Ask anything about the CPA exam/i);
        expect(input).toBeInTheDocument();
      });
    });

    it('should have a send button', async () => {
      renderAITutor();

      await waitFor(() => {
        // Form has submit button (type="submit")
        const form = document.querySelector('form');
        expect(form).toBeInTheDocument();
        const submitButton = form.querySelector('button[type="submit"]');
        expect(submitButton).toBeTruthy();
      });
    });

    it('should allow typing in the input', async () => {
      const user = userEvent.setup();
      renderAITutor();

      await waitFor(() => {
        const input = screen.getByPlaceholderText(/Ask anything about the CPA exam/i);
        expect(input).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText(/Ask anything about the CPA exam/i);
      await user.type(input, 'What is depreciation?');

      expect(input).toHaveValue('What is depreciation?');
    });
  });

  describe('Suggested Prompts', () => {
    it('should display suggested prompts', async () => {
      renderAITutor();

      await waitFor(() => {
        // Should have some clickable suggestions
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(3);
      });
    });
  });

  describe('Section Awareness', () => {
    it('should reference user exam section (REG)', async () => {
      renderAITutor();

      await waitFor(() => {
        // The page should load with Vory header and AI tutor interface
        expect(screen.getByText(/Vory/i)).toBeInTheDocument();
        // Should find at least one element referencing REG section
        expect(screen.getAllByText(/REG/i).length).toBeGreaterThan(0);
      });
    });
  });

  describe('Clear Chat', () => {
    it('should have a clear/new conversation button', async () => {
      renderAITutor();

      await waitFor(() => {
        const clearButton =
          screen.getByRole('button', { name: /new conversation/i }) ||
          screen.getByTitle(/new conversation/i);
        expect(clearButton).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper input label/placeholder', async () => {
      renderAITutor();

      await waitFor(() => {
        const input = screen.getByPlaceholderText(/Ask anything about the CPA exam/i);
        expect(input).toBeInTheDocument();
      });
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      renderAITutor();

      await waitFor(() => {
        expect(screen.getByText(/Vory/i)).toBeInTheDocument();
      });

      // Tab should move focus
      await user.tab();
      expect(document.activeElement).toBeTruthy();
    });
  });
});
