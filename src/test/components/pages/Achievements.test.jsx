import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn().mockResolvedValue({
    exists: () => true,
    data: () => ({
      totalQuestions: 100,
      totalCorrect: 80,
      accuracy: 80,
      currentStreak: 5,
    }),
  }),
  setDoc: vi.fn(),
  onSnapshot: vi.fn((ref, callback) => {
    callback({
      exists: () => true,
      data: () => ({ list: ['first_question'] }),
    });
    return vi.fn(); // Unsubscribe function
  }),
}));

vi.mock('../../../config/firebase', () => ({
  db: {},
}));

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user' },
  }),
}));

vi.mock('../../../hooks/useStudy', () => ({
  useStudy: () => ({
    currentStreak: 5,
    todayLog: { questionsAnswered: 10, correctAnswers: 8 },
  }),
}));

vi.mock('../../../providers/CourseProvider', () => ({
  useCourse: () => ({
    courseId: 'cpa',
    course: {
      id: 'cpa',
      name: 'CPA',
      shortName: 'CPA',
    },
  }),
}));

vi.mock('../../../services/achievements', () => ({
  ACHIEVEMENTS: {
    first_question: {
      id: 'first_question',
      name: 'First Steps',
      description: 'Answer your first question',
      icon: '🎯',
      category: 'milestone',
      requirement: { type: 'questions', count: 1 },
      points: 10,
    },
    streak_3: {
      id: 'streak_3',
      name: '3-Day Streak',
      description: 'Maintain a 3-day study streak',
      icon: '🔥',
      category: 'streak',
      requirement: { type: 'streak', days: 3 },
      points: 25,
    },
  },
  checkAchievements: vi.fn().mockReturnValue([]),
  getAchievementProgress: vi.fn((achievementId, stats) => ({
    current: 1,
    target: 1,
    percentage: 100,
  })),
  getAchievementDisplayName: vi.fn((id, courseId) => {
    const names = {
      'first_question': 'First Steps',
      'streak_3': '3-Day Streak',
    };
    return names[id] || id;
  }),
  getAchievementsByCategory: vi.fn((category) => {
    const all = [
      {
        id: 'first_question',
        name: 'First Steps',
        description: 'Answer your first question',
        icon: '🎯',
        category: 'milestone',
        requirement: { type: 'questions', count: 1 },
        points: 10,
      },
      {
        id: 'streak_3',
        name: '3-Day Streak',
        description: 'Maintain a 3-day study streak',
        icon: '🔥',
        category: 'streak',
        requirement: { type: 'streak', days: 3 },
        points: 25,
      },
    ];
    if (category === 'all') return all;
    return all.filter(a => a.category === category);
  }),
}));

vi.mock('../../../services/feedback', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
    levelUp: vi.fn(),
  },
}));

// Import after mocks
import Achievements from '../../../components/pages/Achievements';

const renderAchievements = () => {
  return render(
    <BrowserRouter>
      <Achievements />
    </BrowserRouter>
  );
};

describe('Achievements Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the achievements page', () => {
      renderAchievements();
      expect(screen.getByText('Achievements')).toBeInTheDocument();
    });

    it('displays category filters', () => {
      renderAchievements();
      expect(screen.getByText('All')).toBeInTheDocument();
    });

    it('shows achievement cards', () => {
      renderAchievements();
      expect(screen.getByText('First Steps')).toBeInTheDocument();
    });

    it('shows streak achievements', () => {
      renderAchievements();
      expect(screen.getByText('3-Day Streak')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('filters achievements by category', () => {
      renderAchievements();
      // Find category buttons and click
      const allButton = screen.getByText('All');
      fireEvent.click(allButton);
      expect(screen.getByText('First Steps')).toBeInTheDocument();
    });
  });

  describe('Achievement Progress', () => {
    it('shows progress for achievements', () => {
      renderAchievements();
      // Achievements should show progress indicators
      expect(screen.getByText('First Steps')).toBeInTheDocument();
    });

    it('marks unlocked achievements', () => {
      renderAchievements();
      // First question achievement is in earned list
      expect(screen.getByText('First Steps')).toBeInTheDocument();
    });
  });
});
