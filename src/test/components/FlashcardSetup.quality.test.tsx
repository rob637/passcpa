/**
 * Quality tests for FlashcardSetup component
 * Tests flashcard session configuration
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

vi.mock('../../config/firebase', () => ({
  db: {},
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => ({})),
  getDoc: vi.fn().mockResolvedValue({
    exists: () => false,
    data: () => ({}),
  }),
}));

vi.mock('../../data/flashcards', () => ({
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

vi.mock('../../components/navigation', () => ({
  BackButton: () => <button>Back</button>,
}));

import FlashcardSetup from '../../components/FlashcardSetup';
import { useAuth } from '../../hooks/useAuth';
import { getDoc } from 'firebase/firestore';
import { getFlashcardsBySection } from '../../data/flashcards';

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
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the flashcard setup page', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/Create a Flashcard Session/i)).toBeInTheDocument();
      });
    });

    it('should show section name', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/Financial Accounting & Reporting/i)).toBeInTheDocument();
      });
    });

    it('should display categories section', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Categories')).toBeInTheDocument();
      });
    });

    it('should show back button', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Back')).toBeInTheDocument();
      });
    });
  });

  describe('category selection', () => {
    it('should show All category option', async () => {
      renderComponent();

      await waitFor(() => {
        // "All" text appears both in category and Units section
        const allTexts = screen.getAllByText('All');
        expect(allTexts.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('should show To Review category option', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('To Review')).toBeInTheDocument();
      });
    });

    it('should show Mastered category option', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Mastered')).toBeInTheDocument();
      });
    });

    it('should show Not Worked category option', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Not Worked')).toBeInTheDocument();
      });
    });

    it('should show category counts after loading', async () => {
      renderComponent();

      // Wait for loading to finish (counts become numbers)
      await waitFor(() => {
        expect(screen.queryByText('...')).not.toBeInTheDocument();
      });

      // Check that counts are displayed (All and Not Worked should be 4)
      await waitFor(() => {
        // Use getAllByText since there are multiple 4s (All=4, Not Worked=4)
        expect(screen.getAllByText('4').length).toBeGreaterThan(0);
      });
    });
  });

  describe('card type selection', () => {
    it('should show Definitions card type', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Definitions')).toBeInTheDocument();
      });
    });

    it('should show Formulas card type', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Formulas')).toBeInTheDocument();
      });
    });

    it('should show Mnemonics card type', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Mnemonics')).toBeInTheDocument();
      });
    });

    it('should show Questions card type', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Questions')).toBeInTheDocument();
      });
    });
  });

  describe('unit filter', () => {
    it('should show Units & Modules section', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Units & Modules')).toBeInTheDocument();
      });
    });

    it('should show blueprint areas when expanded', async () => {
      renderComponent();

      // Click Units & Modules to expand
      await waitFor(() => {
        const unitButton = screen.getByText('Units & Modules');
        fireEvent.click(unitButton);
      });

      // Blueprint areas from mock data should appear
      await waitFor(() => {
        expect(screen.getByText('All Units')).toBeInTheDocument();
        expect(screen.getByText('Area1')).toBeInTheDocument();
        expect(screen.getByText('Area2')).toBeInTheDocument();
      });
    });
  });

  describe('session options', () => {
    it('should have shuffle order toggle', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Shuffle order')).toBeInTheDocument();
      });
    });

    it('should have show both sides toggle', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Show both sides')).toBeInTheDocument();
      });
    });

    it('should have Flashcard mode section', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Flashcard mode')).toBeInTheDocument();
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
    it('should show loading indicators during fetch', () => {
      (getDoc as ReturnType<typeof vi.fn>).mockImplementation(
        () => new Promise(() => {})
      );

      renderComponent();

      // Should show "..." for counts during loading
      expect(screen.getAllByText('...').length).toBeGreaterThan(0);
    });
  });

  describe('error handling', () => {
    it('should handle fetch errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (getDoc as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Fetch failed'));

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/Create a Flashcard Session/i)).toBeInTheDocument();
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
        expect(screen.getByText(/Create a Flashcard Session/i)).toBeInTheDocument();
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

  describe('mastery levels', () => {
    it('should calculate mastery counts from SRS data', async () => {
      (getDoc as ReturnType<typeof vi.fn>).mockResolvedValue({
        exists: () => true,
        data: () => ({
          card1: { masteryLevel: 'mastered', nextReview: new Date() },
          card2: { masteryLevel: 'mastered', nextReview: new Date() },
          card3: { masteryLevel: 'learning', nextReview: new Date() },
        }),
      });

      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText('...')).not.toBeInTheDocument();
      });

      // Mastered count should be 2
      expect(screen.getByText('2')).toBeInTheDocument();
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
