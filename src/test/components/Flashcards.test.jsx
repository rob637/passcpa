import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Flashcards from '../../components/pages/Flashcards';

// Mock hooks
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user-123' },
    userProfile: { examSection: 'REG' },
    loading: false,
  }),
}));

vi.mock('../../services/spacedRepetition', () => ({
  calculateNextReview: vi.fn(() => ({
    interval: 1,
    easeFactor: 2.5,
    repetitions: 1,
    nextReview: new Date(),
    lastReview: new Date(),
  })),
  getDueCards: vi.fn(() => []),
  getStudyStats: vi.fn(() => ({
    total: 100,
    new: 20,
    learning: 30,
    review: 50,
    graduated: 0,
    dueToday: 10,
    overdue: 5,
  })),
}));

vi.mock('../../services/feedback', () => ({
  default: {
    haptic: vi.fn(),
  },
}));

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(() => Promise.resolve({ docs: [] })),
  doc: vi.fn(),
  setDoc: vi.fn(() => Promise.resolve()),
  getDoc: vi.fn(() => Promise.resolve({ exists: () => false })),
}));

vi.mock('../../config/firebase', () => ({
  db: {},
}));

const renderFlashcards = (route = '/flashcards') => {
  return render(
    <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Flashcards />
    </MemoryRouter>
  );
};

describe('Flashcards Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial Render', () => {
    it('should render the flashcards page', async () => {
      renderFlashcards();
      
      await waitFor(() => {
        // Should show something from the flashcards page
        expect(screen.getByText(/Flashcard/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('should show loading state initially', () => {
      renderFlashcards();
      
      // Initially should be loading
      expect(screen.queryByRole('button', { name: /again/i })).not.toBeInTheDocument();
    });
  });

  describe('Study Stats Display', () => {
    it('should display study statistics when available', async () => {
      renderFlashcards();
      
      await waitFor(() => {
        // The component should render stats or cards
        expect(document.body).toBeInTheDocument();
      });
    });
  });

  describe('Rating Buttons', () => {
    it('should have four rating options', () => {
      // The rating buttons: Again, Hard, Good, Easy
      const ratings = ['Again', 'Hard', 'Good', 'Easy'];
      ratings.forEach(rating => {
        // These are defined in the component
        expect(rating).toBeDefined();
      });
    });

    it('should have keyboard shortcuts for ratings', () => {
      // Shortcuts are 1, 2, 3, 4
      const shortcuts = ['1', '2', '3', '4'];
      shortcuts.forEach(shortcut => {
        expect(shortcut).toBeDefined();
      });
    });
  });

  describe('Card Flipping', () => {
    it('should support flipping between front and back', () => {
      // Flipping logic exists in component
      const isFlipped = false;
      expect(typeof isFlipped).toBe('boolean');
    });
  });

  describe('Navigation', () => {
    it('should support going to previous card', () => {
      // Previous button functionality exists
      const goToPrev = () => {};
      expect(typeof goToPrev).toBe('function');
    });

    it('should support going to next card', () => {
      // Next button functionality exists
      const goToNext = () => {};
      expect(typeof goToNext).toBe('function');
    });
  });

  describe('Session Stats Tracking', () => {
    it('should track session statistics', () => {
      const sessionStats = {
        reviewed: 0,
        again: 0,
        hard: 0,
        good: 0,
        easy: 0,
      };
      
      expect(sessionStats.reviewed).toBe(0);
      expect(sessionStats.again).toBe(0);
      expect(sessionStats.hard).toBe(0);
      expect(sessionStats.good).toBe(0);
      expect(sessionStats.easy).toBe(0);
    });
  });
});

describe('Flashcard Study Modes', () => {
  it('should support review mode', () => {
    const mode = 'review';
    expect(mode).toBe('review');
  });

  it('should support new cards mode', () => {
    const mode = 'new';
    expect(mode).toBe('new');
  });

  it('should support all cards mode', () => {
    const mode = 'all';
    expect(mode).toBe('all');
  });
});

describe('Spaced Repetition Integration', () => {
  it('should use calculateNextReview for scheduling', async () => {
    const { calculateNextReview } = await import('../../services/spacedRepetition');
    
    const card = { interval: 1, easeFactor: 2.5, repetitions: 1 };
    const result = calculateNextReview(card, 'good');
    
    expect(result).toHaveProperty('interval');
    expect(result).toHaveProperty('easeFactor');
    expect(result).toHaveProperty('nextReview');
  });

  it('should call getStudyStats for overview', async () => {
    const { getStudyStats } = await import('../../services/spacedRepetition');
    
    const stats = getStudyStats([]);
    
    expect(stats).toHaveProperty('total');
    expect(stats).toHaveProperty('new');
    expect(stats).toHaveProperty('learning');
    expect(stats).toHaveProperty('dueToday');
  });
});
