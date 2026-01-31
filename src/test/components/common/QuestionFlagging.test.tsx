import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

/**
 * QuestionFlagging Component Tests
 * Tests flag submission, different flag types, compact mode, and QuickFlagButton
 */

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => ({ id: 'mock-doc-id' })),
  setDoc: vi.fn(() => Promise.resolve()),
  deleteDoc: vi.fn(() => Promise.resolve()),
  serverTimestamp: vi.fn(() => new Date()),
}));

vi.mock('../../../config/firebase', () => ({
  db: {},
}));

// Mock accessibility announce
vi.mock('../../../utils/accessibility', () => ({
  announce: vi.fn(),
}));

// Mock clsx
vi.mock('clsx', () => ({
  default: (...args: any[]) => args.filter(a => typeof a === 'string' || (typeof a === 'boolean' && a)).flat().filter(Boolean).join(' '),
}));

// Mock useAuth
const mockUser = { uid: 'test-user-123', email: 'test@example.com' };
const mockUseAuth = vi.fn<[], { user: { uid: string; email: string; } | null }>(() => ({
  user: mockUser,
}));

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

// Import after mocks
const renderQuestionFlagging = async (props = {}) => {
  const { QuestionFlagging } = await import('../../../components/common/QuestionFlagging');
  return render(
    <QuestionFlagging
      questionId="test-question-123"
      section="FAR"
      topic="Revenue Recognition"
      {...props}
    />
  );
};

const renderQuickFlagButton = async (props = {}) => {
  const { QuickFlagButton } = await import('../../../components/common/QuestionFlagging');
  return render(
    <QuickFlagButton
      questionId="test-question-123"
      section="FAR"
      {...props}
    />
  );
};

describe('QuestionFlagging Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ user: mockUser });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the flag button', async () => {
      await renderQuestionFlagging();
      expect(screen.getByText('Flag this question')).toBeInTheDocument();
    });

    it('does not render when user is not logged in', async () => {
      mockUseAuth.mockReturnValue({ user: null });
      const { container } = await renderQuestionFlagging();
      expect(container.innerHTML).toBe('');
    });

    it('renders in compact mode', async () => {
      await renderQuestionFlagging({ compact: true });
      const flagButton = screen.getByRole('button', { name: /flag question/i });
      expect(flagButton).toBeInTheDocument();
    });
  });

  describe('Toggle Functionality', () => {
    it('expands when clicked', async () => {
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      expect(screen.getByText('Hide options')).toBeInTheDocument();
    });

    it('collapses when clicked again', async () => {
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Hide options'));
      expect(screen.getByText('Flag this question')).toBeInTheDocument();
    });

    it('has correct aria-expanded attribute', async () => {
      await renderQuestionFlagging();
      const button = screen.getByText('Flag this question').closest('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(button!);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Flag Options', () => {
    it('displays all flag options when expanded', async () => {
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      
      expect(screen.getByText('Review Later')).toBeInTheDocument();
      expect(screen.getByText('Challenging')).toBeInTheDocument();
      expect(screen.getByText('Very Helpful')).toBeInTheDocument();
      expect(screen.getByText('Confusing')).toBeInTheDocument();
      expect(screen.getByText('Report Error')).toBeInTheDocument();
      expect(screen.getByText('Outdated')).toBeInTheDocument();
    });

    it('selects flag type when clicked', async () => {
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      
      const reviewButton = screen.getByText('Review Later');
      fireEvent.click(reviewButton);
      
      // Should show submit button
      expect(screen.getByText('Submit Flag')).toBeInTheDocument();
    });

    it('shows description for selected flag type', async () => {
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Review Later'));
      
      expect(screen.getByText('Mark this question to review again later')).toBeInTheDocument();
    });

    it('shows comment box for error flag', async () => {
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Report Error'));
      
      expect(screen.getByPlaceholderText(/please describe the issue/i)).toBeInTheDocument();
    });

    it('shows comment box for outdated flag', async () => {
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Outdated'));
      
      expect(screen.getByPlaceholderText(/please describe the issue/i)).toBeInTheDocument();
    });

    it('shows comment box for confusing flag', async () => {
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Confusing'));
      
      expect(screen.getByPlaceholderText(/please describe the issue/i)).toBeInTheDocument();
    });

    it('does not show comment box for review flag', async () => {
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Review Later'));
      
      expect(screen.queryByPlaceholderText(/please describe the issue/i)).not.toBeInTheDocument();
    });
  });

  describe('Submit Functionality', () => {
    it('submits flag when Submit Flag is clicked', async () => {
      const { setDoc } = await import('firebase/firestore');
      const onFlagSubmit = vi.fn();
      
      await renderQuestionFlagging({ onFlagSubmit });
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Review Later'));
      fireEvent.click(screen.getByText('Submit Flag'));
      
      await waitFor(() => {
        expect(setDoc).toHaveBeenCalled();
      });
    });

    it('shows success message after submission', async () => {
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Review Later'));
      fireEvent.click(screen.getByText('Submit Flag'));
      
      await waitFor(() => {
        expect(screen.getByText('Thank you for your feedback!')).toBeInTheDocument();
      });
    });

    it('calls onFlagSubmit callback after submission', async () => {
      const onFlagSubmit = vi.fn();
      
      await renderQuestionFlagging({ onFlagSubmit });
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Review Later'));
      fireEvent.click(screen.getByText('Submit Flag'));
      
      await waitFor(() => {
        expect(onFlagSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            questionId: 'test-question-123',
            type: 'review',
            section: 'FAR',
          })
        );
      });
    });

    it('shows Submitting... during submission', async () => {
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Review Later'));
      
      // Don't await - check loading state
      fireEvent.click(screen.getByText('Submit Flag'));
      expect(screen.getByText('Submitting...')).toBeInTheDocument();
    });

    it('saves to global flags for error reports', async () => {
      const { setDoc } = await import('firebase/firestore');
      
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Report Error'));
      
      const textarea = screen.getByPlaceholderText(/please describe the issue/i);
      fireEvent.change(textarea, { target: { value: 'Wrong answer provided' } });
      
      fireEvent.click(screen.getByText('Submit Flag'));
      
      await waitFor(() => {
        // Should call setDoc twice - once for user flag, once for global flag
        expect(setDoc).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('Cancel Functionality', () => {
    it('resets selection when Cancel is clicked', async () => {
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Review Later'));
      
      expect(screen.getByText('Submit Flag')).toBeInTheDocument();
      
      fireEvent.click(screen.getByText('Cancel'));
      
      expect(screen.queryByText('Submit Flag')).not.toBeInTheDocument();
    });

    it('clears comment when Cancel is clicked', async () => {
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Report Error'));
      
      const textarea = screen.getByPlaceholderText(/please describe the issue/i);
      fireEvent.change(textarea, { target: { value: 'Test comment' } });
      
      fireEvent.click(screen.getByText('Cancel'));
      fireEvent.click(screen.getByText('Report Error'));
      
      const newTextarea = screen.getByPlaceholderText(/please describe the issue/i);
      expect(newTextarea).toHaveValue('');
    });
  });

  describe('Compact Mode', () => {
    it('renders dropdown in compact mode', async () => {
      await renderQuestionFlagging({ compact: true });
      const button = screen.getByRole('button', { name: /flag question/i });
      fireEvent.click(button);
      
      // Should show dropdown with flag options
      await waitFor(() => {
        expect(screen.getByText('Flag Question')).toBeInTheDocument();
      });
    });

    it('shows abbreviated flag options in compact mode', async () => {
      await renderQuestionFlagging({ compact: true });
      const button = screen.getByRole('button', { name: /flag question/i });
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Review Later')).toBeInTheDocument();
        expect(screen.getByText('Challenging')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-label on flag button', async () => {
      await renderQuestionFlagging({ compact: true });
      const button = screen.getByRole('button', { name: /flag question/i });
      expect(button).toHaveAttribute('aria-label', 'Flag question');
    });

    it('has aria-expanded attribute on toggle', async () => {
      await renderQuestionFlagging({ compact: true });
      const button = screen.getByRole('button', { name: /flag question/i });
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('announces success message', async () => {
      const { announce } = await import('../../../utils/accessibility');
      
      await renderQuestionFlagging();
      fireEvent.click(screen.getByText('Flag this question'));
      fireEvent.click(screen.getByText('Review Later'));
      fireEvent.click(screen.getByText('Submit Flag'));
      
      await waitFor(() => {
        expect(announce).toHaveBeenCalledWith('Flag submitted successfully', 'polite');
      });
    });
  });
});

describe('QuickFlagButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ user: mockUser });
  });

  describe('Rendering', () => {
    it('renders the quick flag button', async () => {
      await renderQuickFlagButton();
      const button = screen.getByRole('button', { name: /flag for review/i });
      expect(button).toBeInTheDocument();
    });

    it('does not render when user is not logged in', async () => {
      mockUseAuth.mockReturnValue({ user: null });
      const { container } = await renderQuickFlagButton();
      expect(container.innerHTML).toBe('');
    });

    it('shows correct state when initially flagged', async () => {
      await renderQuickFlagButton({ isFlagged: true });
      const button = screen.getByRole('button', { name: /remove flag/i });
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('shows correct state when not flagged', async () => {
      await renderQuickFlagButton({ isFlagged: false });
      const button = screen.getByRole('button', { name: /flag for review/i });
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Toggle Functionality', () => {
    it('toggles flag state when clicked', async () => {
      await renderQuickFlagButton();
      const button = screen.getByRole('button', { name: /flag for review/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-pressed', 'true');
      });
    });

    it('calls setDoc when flagging', async () => {
      const { setDoc } = await import('firebase/firestore');
      
      await renderQuickFlagButton();
      const button = screen.getByRole('button', { name: /flag for review/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(setDoc).toHaveBeenCalled();
      });
    });

    it('calls onToggle callback when toggling', async () => {
      const onToggle = vi.fn();
      
      await renderQuickFlagButton({ onToggle });
      const button = screen.getByRole('button', { name: /flag for review/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(onToggle).toHaveBeenCalledWith(true);
      });
    });

    it('announces flag action', async () => {
      const { announce } = await import('../../../utils/accessibility');
      
      await renderQuickFlagButton();
      const button = screen.getByRole('button', { name: /flag for review/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(announce).toHaveBeenCalledWith('Question flagged for review', 'polite');
      });
    });

    it('announces unflag action', async () => {
      const { announce } = await import('../../../utils/accessibility');
      
      await renderQuickFlagButton({ isFlagged: true });
      const button = screen.getByRole('button', { name: /remove flag/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(announce).toHaveBeenCalledWith('Flag removed', 'polite');
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-label when not flagged', async () => {
      await renderQuickFlagButton();
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Flag for review');
    });

    it('has correct aria-label when flagged', async () => {
      await renderQuickFlagButton({ isFlagged: true });
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Remove flag');
    });

    it('has correct title attribute', async () => {
      await renderQuickFlagButton();
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Flag for review');
    });
  });
});

describe('FLAG_OPTIONS Configuration', () => {
  it('has correct number of flag types', async () => {
    await renderQuestionFlagging();
    fireEvent.click(screen.getByText('Flag this question'));
    
    // Should have 6 flag options
    const buttons = screen.getAllByRole('button').filter(btn => 
      ['Review Later', 'Challenging', 'Very Helpful', 'Confusing', 'Report Error', 'Outdated']
        .some(label => btn.textContent?.includes(label))
    );
    expect(buttons.length).toBe(6);
  });
});
