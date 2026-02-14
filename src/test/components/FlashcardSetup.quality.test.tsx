/**
 * Quality tests for FlashcardSetup component
 * Tests flashcard session configuration (simplified form)
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';


// Mock hooks and dependencies
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    user: { uid: 'test-user' },
    userProfile: {
      examSection: 'FAR',
    },
  })),
}));

vi.mock('../../providers/CourseProvider', () => ({
  useCourse: vi.fn(() => ({
    courseId: 'cpa',
    course: { id: 'cpa', name: 'CPA' },
  })),
}));

vi.mock('../../config/firebase', () => ({
  db: {},
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => ({})),
  getDoc: vi.fn().mockResolvedValue({
    exists: () => false,
    data: () => ({}),
  }),
  onSnapshot: vi.fn(() => vi.fn()),
}));

vi.mock('../../data/cpa/flashcards', () => ({
  getFlashcardsBySection: vi.fn(() => [
    { id: 'card1', blueprintArea: 'Area1', type: 'definition', front: 'Q1', back: 'A1' },
    { id: 'card2', blueprintArea: 'Area1', type: 'formula', front: 'Q2', back: 'A2' },
    { id: 'card3', blueprintArea: 'Area2', type: 'mnemonic', front: 'Q3', back: 'A3' },
    { id: 'card4', blueprintArea: 'Area2', type: 'question', front: 'Q4', back: 'A4' },
  ]),
}));

vi.mock('../../config/examConfig', () => ({
  CPA_SECTIONS: {
    FAR: { name: 'Financial Accounting & Reporting', color: '#3B82F6' },
    AUD: { name: 'Auditing & Attestation', color: '#10B981' },
    REG: { name: 'Regulation', color: '#F59E0B' },
    BAR: { name: 'Business Analysis & Reporting', color: '#8B5CF6' },
    ISC: { name: 'Information Systems & Controls', color: '#EC4899' },
    TCP: { name: 'Tax Compliance & Planning', color: '#EF4444' },
  },
}));

import FlashcardSetup from '../../components/FlashcardSetup';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../providers/CourseProvider';
import { getDoc } from 'firebase/firestore';
import { getFlashcardsBySection } from '../../data/cpa/flashcards';

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <FlashcardSetup />
    </BrowserRouter>
  );
};

describe('FlashcardSetup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      user: { uid: 'test-user' },
      userProfile: {
        examSection: 'FAR',
      },
    });
    
    (useCourse as ReturnType<typeof vi.fn>).mockReturnValue({
      courseId: 'cpa',
      course: { id: 'cpa', name: 'CPA' },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the flashcard setup page', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Flashcards/i })).toBeInTheDocument();
      });
    });

    it('should show section name', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/Financial Accounting & Reporting/i)).toBeInTheDocument();
      });
    });

    it('should display count buttons (10, 25, 50)', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /10 cards/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /25 cards/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /50 cards/i })).toBeInTheDocument();
      });
    });

    it('should show available cards count', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/cards available/i)).toBeInTheDocument();
      });
    });
  });

  describe('simple options', () => {
    it('should show Shuffle toggle', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Shuffle')).toBeInTheDocument();
      });
    });

    it('should show Focus on weak areas toggle', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Focus on weak areas')).toBeInTheDocument();
      });
    });

    it('should show More options button', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('More options')).toBeInTheDocument();
      });
    });
  });

  describe('advanced options', () => {
    it('should show card types when More options is clicked', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('More options')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('More options'));

      await waitFor(() => {
        expect(screen.getByText('Card Types')).toBeInTheDocument();
        expect(screen.getByText('Definitions')).toBeInTheDocument();
        expect(screen.getByText('Formulas')).toBeInTheDocument();
        expect(screen.getByText('Mnemonics')).toBeInTheDocument();
        expect(screen.getByText('Questions')).toBeInTheDocument();
      });
    });

    it('should show Filter by Mastery dropdown when More options is clicked', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('More options')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('More options'));

      await waitFor(() => {
        expect(screen.getByText('Filter by Mastery')).toBeInTheDocument();
      });
    });

    it('should show Unit dropdown when More options is clicked', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('More options')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('More options'));

      await waitFor(() => {
        expect(screen.getByText('Unit')).toBeInTheDocument();
      });
    });

    it('should show Show both sides toggle when More options is clicked', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('More options')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('More options'));

      await waitFor(() => {
        expect(screen.getByText('Show both sides')).toBeInTheDocument();
      });
    });
  });

  describe('navigation', () => {
    it('should navigate to flashcard session on start', async () => {
      renderComponent();

      await waitFor(() => {
        const startButton = screen.getByText(/start session/i);
        expect(startButton).toBeInTheDocument();
      });

      const startButton = screen.getByText(/start session/i);
      fireEvent.click(startButton);

      expect(mockNavigate).toHaveBeenCalled();
    });

    it('should pass mode parameter when navigating', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText('...')).not.toBeInTheDocument();
      });

      const startButton = screen.getByText(/start session/i);
      fireEvent.click(startButton);

      expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('/flashcards/session'));
    });
  });

  describe('loading state', () => {
    it('should show loading indicator during fetch', () => {
      (getDoc as ReturnType<typeof vi.fn>).mockImplementation(
        () => new Promise(() => {})
      );

      renderComponent();

      // During loading, the "cards available" text shows "..."
      expect(screen.getByText(/\.\.\. cards available/i)).toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    it('should handle fetch errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (getDoc as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Fetch failed'));

      renderComponent();

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Flashcards/i })).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('unauthenticated state', () => {
    it('should handle missing user', async () => {
      (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
        user: null,
        userProfile: null,
      });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Flashcards/i })).toBeInTheDocument();
      });
    });

    it('should use FAR as default section when no profile', async () => {
      (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: null,
      });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/Financial Accounting & Reporting/i)).toBeInTheDocument();
      });
    });
  });

  describe('count button selection', () => {
    it('should default to 25 cards selected', async () => {
      renderComponent();

      await waitFor(() => {
        const button25 = screen.getByRole('button', { name: /25 cards/i });
        expect(button25).toHaveAttribute('aria-pressed', 'true');
      });
    });

    it('should allow selecting different count', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /10 cards/i })).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: /10 cards/i }));

      await waitFor(() => {
        const button10 = screen.getByRole('button', { name: /10 cards/i });
        expect(button10).toHaveAttribute('aria-pressed', 'true');
      });
    });
  });

  describe('different sections', () => {
    it('should load cards for current exam section', async () => {
      (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: {
          examSection: 'AUD',
        },
      });

      renderComponent();

      await waitFor(() => {
        expect(getFlashcardsBySection).toHaveBeenCalledWith('AUD');
      });
    });

    it('should display AUD section name when selected', async () => {
      (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: {
          examSection: 'AUD',
        },
      });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/Auditing & Attestation/i)).toBeInTheDocument();
      });
    });
  });
});
