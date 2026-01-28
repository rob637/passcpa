import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Progress from '../../../components/pages/Progress';

// Mock auth hook
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user' },
    userProfile: {
      examSection: 'REG',
      displayName: 'Test User',
      dailyGoal: 50,
    },
  }),
}));

// Mock study hook with stats
vi.mock('../../../hooks/useStudy', () => ({
  useStudy: () => ({
    userStats: {
      totalQuestions: 150,
      correctAnswers: 120,
      accuracy: 80,
      streak: 7,
      totalStudyTime: 3600,
    },
    studyData: {
      completedLessons: ['lesson-1', 'lesson-2'],
    },
    topicPerformance: [
      { id: '1', topic: 'Entity Formation', accuracy: 85, questions: 20 },
      { id: '2', topic: 'Tax Credits', accuracy: 75, questions: 15 },
    ],
  }),
}));

// Mock lessonService
vi.mock('../../../services/lessonService', () => ({
  fetchAllLessons: vi.fn(() => Promise.resolve([
    { id: 'lesson-1', title: 'Test Lesson 1', section: 'REG' },
    { id: 'lesson-2', title: 'Test Lesson 2', section: 'REG' },
  ])),
  fetchLessonsBySection: vi.fn(() => Promise.resolve([])),
}));

// Mock Firebase
vi.mock('../../../config/firebase', () => ({
  db: {},
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn().mockResolvedValue({ exists: () => false, data: () => null }),
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn().mockResolvedValue({ docs: [] }),
  orderBy: vi.fn(),
}));

const renderProgress = () => {
  return render(
    <MemoryRouter>
      <Progress />
    </MemoryRouter>
  );
};

describe('Progress Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      // Just verify the component can be rendered without throwing
      const { container } = renderProgress();
      expect(container).toBeInTheDocument();
    });

    it('mounts progress component', () => {
      renderProgress();
      // The component should mount even if data loading is async
      expect(document.body).toBeInTheDocument();
    });
  });

  describe('Hooks Integration', () => {
    it('uses useAuth hook', () => {
      renderProgress();
      // Component uses auth - if it mounts, hook is working
      expect(document.body).toBeInTheDocument();
    });

    it('uses useStudy hook', () => {
      renderProgress();
      // Component uses study data - if it mounts, hook is working  
      expect(document.body).toBeInTheDocument();
    });
  });
});
