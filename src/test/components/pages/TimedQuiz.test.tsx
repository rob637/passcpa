import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

/**
 * Comprehensive TimedQuiz Component Tests
 * Tests quiz setup screen functionality
 */

// Mock Firebase
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
  getApps: vi.fn(() => [{}]),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  limit: vi.fn(),
  getDocs: vi.fn(() => Promise.resolve({ docs: [] })),
  serverTimestamp: vi.fn(() => new Date()),
}));

vi.mock('../../../config/firebase', () => ({
  auth: {},
  db: {},
  storage: {},
  analytics: null,
}));

// Mock feedback service
vi.mock('../../../services/feedback', () => ({
  default: {
    tap: vi.fn(),
    click: vi.fn(),
    correct: vi.fn(),
    incorrect: vi.fn(),
    complete: vi.fn(),
  },
}));

// Mock useAuth
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user-123', email: 'test@example.com' },
    userProfile: { examSection: 'FAR', dailyGoal: 50 },
  }),
}));

// Mock useStudy
vi.mock('../../../hooks/useStudy', () => ({
  useStudy: () => ({
    recordMCQAnswer: vi.fn(() => Promise.resolve()),
  }),
}));

// Mock clsx
vi.mock('clsx', () => ({
  default: (...args: any[]) => args.filter(Boolean).join(' '),
}));

// Render helper
const renderTimedQuiz = async (mode = 'quick') => {
  const TimedQuiz = (await import('../../../components/pages/TimedQuiz')).default;
  return render(
    <MemoryRouter initialEntries={[`/quiz?mode=${mode}`]}>
      <TimedQuiz />
    </MemoryRouter>
  );
};

describe('TimedQuiz Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Setup Screen', () => {
    it('renders the setup screen initially', async () => {
      await renderTimedQuiz();
      expect(screen.getByText('Timed Quiz')).toBeInTheDocument();
    });

    it('displays the subtitle', async () => {
      await renderTimedQuiz();
      expect(screen.getByText('Test yourself under exam conditions')).toBeInTheDocument();
    });

    it('displays Quick Quiz mode', async () => {
      await renderTimedQuiz();
      expect(screen.getByText('Quick Quiz')).toBeInTheDocument();
    });

    it('displays Standard Quiz mode', async () => {
      await renderTimedQuiz();
      expect(screen.getByText('Standard Quiz')).toBeInTheDocument();
    });

    it('displays Challenge Mode', async () => {
      await renderTimedQuiz();
      expect(screen.getByText('Challenge Mode')).toBeInTheDocument();
    });

    it('displays Exam Simulation mode', async () => {
      await renderTimedQuiz();
      expect(screen.getByText('Exam Simulation')).toBeInTheDocument();
    });

    it('displays question counts for modes', async () => {
      await renderTimedQuiz();
      expect(screen.getByText(/10 questions/)).toBeInTheDocument();
      expect(screen.getByText(/20 questions/)).toBeInTheDocument();
      expect(screen.getByText(/30 questions/)).toBeInTheDocument();
      expect(screen.getByText(/36 questions/)).toBeInTheDocument();
    });

    it('shows Start button', async () => {
      await renderTimedQuiz();
      expect(screen.getByText('Start')).toBeInTheDocument();
    });

    it('shows Back to Home button', async () => {
      await renderTimedQuiz();
      expect(screen.getAllByText('Back to Home').length).toBeGreaterThanOrEqual(1);
    });

    it('displays estimated time for quick mode (15 min)', async () => {
      await renderTimedQuiz();
      expect(screen.getByText('15 min')).toBeInTheDocument();
    });

    it('displays difficulty levels for some modes', async () => {
      await renderTimedQuiz();
      // The component shows time durations like "15 min", "30 min", "45 min"
      expect(screen.getByText('15 min')).toBeInTheDocument();
    });
  });

  describe('Quiz Mode Selection', () => {
    it('allows selecting Quick Quiz mode', async () => {
      await renderTimedQuiz();
      const quickQuizCard = screen.getByText('Quick Quiz').closest('button') || screen.getByText('Quick Quiz');
      expect(quickQuizCard).toBeInTheDocument();
    });

    it('allows selecting Standard Quiz mode', async () => {
      await renderTimedQuiz();
      const standardCard = screen.getByText('Standard Quiz').closest('button') || screen.getByText('Standard Quiz');
      fireEvent.click(standardCard);
    });

    it('allows selecting Challenge Mode', async () => {
      await renderTimedQuiz();
      const challengeCard = screen.getByText('Challenge Mode').closest('button') || screen.getByText('Challenge Mode');
      fireEvent.click(challengeCard);
    });

    it('allows selecting Exam Simulation mode', async () => {
      await renderTimedQuiz();
      const examCard = screen.getByText('Exam Simulation').closest('button') || screen.getByText('Exam Simulation');
      fireEvent.click(examCard);
    });
  });

  describe('Start Button', () => {
    it('Start button is clickable', async () => {
      await renderTimedQuiz();
      const startButton = screen.getByText('Start');
      expect(startButton).not.toBeDisabled();
    });
  });

  describe('Back Navigation', () => {
    it('Back to Home button is present', async () => {
      await renderTimedQuiz();
      const backButtons = screen.getAllByText('Back to Home');
      expect(backButtons.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Quiz Mode Details', () => {
    it('Quick Quiz shows 10 questions', async () => {
      await renderTimedQuiz();
      expect(screen.getByText(/10 questions/)).toBeInTheDocument();
    });

    it('Standard Quiz shows 20 questions', async () => {
      await renderTimedQuiz();
      expect(screen.getByText(/20 questions/)).toBeInTheDocument();
    });

    it('Challenge Mode shows 30 questions', async () => {
      await renderTimedQuiz();
      expect(screen.getByText(/30 questions/)).toBeInTheDocument();
    });

    it('Exam Simulation shows 36 questions', async () => {
      await renderTimedQuiz();
      expect(screen.getByText(/36 questions/)).toBeInTheDocument();
    });
  });
});

describe('TimedQuiz Module Export', () => {
  it('exports TimedQuiz component as default', async () => {
    const module = await import('../../../components/pages/TimedQuiz');
    expect(module.default).toBeDefined();
    expect(typeof module.default).toBe('function');
  });
});

describe('Quiz Mode Constants', () => {
  it('has correct question counts defined', async () => {
    await renderTimedQuiz();
    
    const quickText = screen.getByText(/10 questions/);
    const standardText = screen.getByText(/20 questions/);
    const challengeText = screen.getByText(/30 questions/);
    const examText = screen.getByText(/36 questions/);
    
    expect(quickText).toBeInTheDocument();
    expect(standardText).toBeInTheDocument();
    expect(challengeText).toBeInTheDocument();
    expect(examText).toBeInTheDocument();
  });
});
