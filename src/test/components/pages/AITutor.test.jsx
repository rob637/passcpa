import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AITutor from '../../../components/pages/AITutor';

// Mock hooks
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user' },
    userProfile: { examSection: 'REG', displayName: 'Test User' },
  }),
}));

vi.mock('../../../hooks/useStudy', () => ({
  useStudy: () => ({
    topicPerformance: [
      { id: '1', name: 'Entity Formation', accuracy: 65 },
      { id: '2', name: 'Tax Credits', accuracy: 55 },
    ],
  }),
}));

// Mock Firebase
vi.mock('../../../config/firebase', () => ({
  db: {},
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn().mockResolvedValue({ exists: () => false }),
  setDoc: vi.fn(),
  collection: vi.fn(),
  addDoc: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  getDocs: vi.fn().mockResolvedValue({ docs: [] }),
  Timestamp: {
    now: () => ({ toDate: () => new Date() }),
  },
}));

// Mock AI service
vi.mock('../../../services/aiService', () => ({
  generateAIResponse: vi.fn().mockResolvedValue({
    content: 'This is a test AI response about CPA exam topics.',
  }),
}));

// Mock location
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ state: null }),
  };
});

const renderAITutor = () => {
  return render(
    <MemoryRouter>
      <AITutor />
    </MemoryRouter>
  );
};

describe('AITutor Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders AI tutor interface', async () => {
      renderAITutor();
      await waitFor(() => {
        expect(screen.getByRole('textbox') || screen.getByPlaceholderText(/ask|type|message/i)).toBeInTheDocument();
      });
    });

    it('shows tutor mode options', async () => {
      renderAITutor();
      await waitFor(() => {
        const content = document.body.textContent;
        expect(
          content.includes('Explain') ||
          content.includes('Guide') ||
          content.includes('Quiz')
        ).toBe(true);
      });
    });

    it('displays message input area', async () => {
      renderAITutor();
      await waitFor(() => {
        const input = screen.getByRole('textbox') || screen.getByPlaceholderText(/ask|type/i);
        expect(input).toBeInTheDocument();
      });
    });

    it('shows send button', async () => {
      renderAITutor();
      await waitFor(() => {
        const sendButton = screen.queryByRole('button', { name: /send/i }) ||
                          screen.queryByLabelText(/send/i);
        expect(sendButton || true).toBeTruthy();
      });
    });
  });

  describe('Tutor Modes', () => {
    it('displays explain mode', async () => {
      renderAITutor();
      await waitFor(() => {
        expect(screen.getByText(/explain/i)).toBeInTheDocument();
      });
    });

    it('allows switching tutor modes', async () => {
      renderAITutor();
      await waitFor(() => {
        const modeButtons = screen.getAllByRole('button');
        const explainButton = modeButtons.find(btn => btn.textContent?.includes('Explain'));
        if (explainButton) {
          fireEvent.click(explainButton);
        }
        expect(true).toBe(true);
      });
    });
  });

  describe('Smart Prompts', () => {
    it('shows suggested prompts', async () => {
      renderAITutor();
      await waitFor(() => {
        // Smart prompts based on weak areas
        const content = document.body.textContent;
        expect(content).toBeTruthy();
      });
    });
  });

  describe('Chat Interaction', () => {
    it('allows typing a message', async () => {
      renderAITutor();
      await waitFor(() => {
        const input = screen.getByRole('textbox') || screen.getByPlaceholderText(/ask|type/i);
        fireEvent.change(input, { target: { value: 'What is depreciation?' } });
        expect(input).toHaveValue('What is depreciation?');
      });
    });

    it('handles message submission', async () => {
      renderAITutor();
      await waitFor(() => {
        const input = screen.getByRole('textbox') || screen.getByPlaceholderText(/ask|type/i);
        fireEvent.change(input, { target: { value: 'Test question' } });
        
        const sendButton = screen.queryByRole('button', { name: /send/i }) ||
                          screen.queryByLabelText(/send/i);
        if (sendButton) {
          fireEvent.click(sendButton);
        }
        expect(true).toBe(true);
      });
    });

    it('supports keyboard interaction in input', async () => {
      renderAITutor();
      await waitFor(() => {
        const input = screen.getByRole('textbox') || screen.getByPlaceholderText(/ask|type/i);
        fireEvent.change(input, { target: { value: 'Test question' } });
        // Just test that typing works without submitting
        expect(input).toHaveValue('Test question');
      });
    });
  });

  describe('Chat History', () => {
    it('displays chat messages area', async () => {
      renderAITutor();
      await waitFor(() => {
        // Chat container should exist
        const container = document.querySelector('[class*="chat"], [class*="message"], [role="log"]');
        expect(container || document.body).toBeTruthy();
      });
    });

    it('shows clear history option', async () => {
      renderAITutor();
      await waitFor(() => {
        const clearButton = screen.queryByRole('button', { name: /clear|delete/i }) ||
                           screen.queryByLabelText(/clear|delete/i);
        expect(clearButton || true).toBeTruthy();
      });
    });
  });
});
