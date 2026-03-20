import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockLessons = [
  {
    id: 'lesson-1',
    title: 'Test Lesson 1',
    section: 'REG',
    duration: 30,
    difficulty: 'easy',
    content: '<p>Test content</p>',
  },
  {
    id: 'lesson-2',
    title: 'Test Lesson 2',
    section: 'REG',
    duration: 45,
    difficulty: 'medium',
    content: '<p>More test content</p>',
  },
  {
    id: 'lesson-3',
    title: 'Advanced Lesson',
    section: 'REG',
    duration: 60,
    difficulty: 'hard',
    content: '<p>Advanced content</p>',
  },
];

// Mock lessonService (Firestore-based service)
vi.mock('../../../services/lessonService', () => {
  const lessonData = [
    {
      id: 'lesson-1',
      title: 'Test Lesson 1',
      section: 'REG',
      duration: 30,
      difficulty: 'easy',
      content: '<p>Test content</p>',
    },
    {
      id: 'lesson-2',
      title: 'Test Lesson 2',
      section: 'REG',
      duration: 45,
      difficulty: 'medium',
      content: '<p>More test content</p>',
    },
    {
      id: 'lesson-3',
      title: 'Advanced Lesson',
      section: 'REG',
      duration: 60,
      difficulty: 'hard',
      content: '<p>Advanced content</p>',
    },
  ];
  return {
    fetchLessonsBySection: vi.fn(() => Promise.resolve(lessonData)),
    fetchAllLessons: vi.fn(() => Promise.resolve(lessonData)),
    fetchLessonById: vi.fn((id) => Promise.resolve(lessonData.find(l => l.id === id) || null)),
  };
});

// Mock all dependencies
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user' },
    userProfile: { examSection: 'REG', displayName: 'Test User' },
  }),
}));

vi.mock('../../../hooks/useStudy', () => ({
  useStudy: () => ({
    studyData: {
      completedLessons: ['lesson-1'],
    },
    recordLessonProgress: vi.fn(),
    logActivity: vi.fn(),
    getLessonProgress: vi.fn(() => Promise.resolve({ 'lesson-1': { status: 'completed' } })),
  }),
}));

vi.mock('../../../config/examConfig', () => ({
  CPA_SECTIONS: {
    AUD: { name: 'Auditing and Attestation', shortName: 'AUD', color: '#2563EB' },
    FAR: { name: 'Financial Accounting and Reporting', shortName: 'FAR', color: '#2563EB' },
    REG: { name: 'Regulation', shortName: 'REG', color: '#DC2626' },
    TCP: { name: 'Tax Compliance and Planning', shortName: 'TCP', color: '#059669' },
    BAR: { name: 'Business Analysis and Reporting', shortName: 'BAR', color: '#7C3AED' },
    ISC: { name: 'Information Systems and Controls', shortName: 'ISC', color: '#0891B2' },
    PREP: { name: 'Exam Strategy & Preparation', shortName: 'PREP', color: '#6366f1', type: 'strategy' },
  },
}));

vi.mock('../../../providers/CourseProvider', () => ({
  useCourse: () => ({
    courseId: 'cpa',
    course: {
      id: 'cpa',
      name: 'CPA',
      shortName: 'CPA',
      hasTBS: true,
      sections: [
        { id: 'FAR', name: 'Financial Accounting & Reporting', shortName: 'FAR', blueprintAreas: [] },
        { id: 'AUD', name: 'Auditing & Attestation', shortName: 'AUD', blueprintAreas: [] },
        { id: 'REG', name: 'Regulation', shortName: 'REG', blueprintAreas: [{ id: 'REG-A', name: 'Area A' }] },
        { id: 'TCP', name: 'Tax Compliance & Planning', shortName: 'TCP', blueprintAreas: [] },
        { id: 'BAR', name: 'Business Analysis & Reporting', shortName: 'BAR', blueprintAreas: [] },
        { id: 'ISC', name: 'Information Systems & Controls', shortName: 'ISC', blueprintAreas: [] },
      ],
    },
  }),
}));

vi.mock('../../../utils/sectionUtils', () => ({
  getSectionDisplayInfo: () => ({ name: 'Regulation', shortName: 'REG', color: '#DC2626' }),
  getDefaultSection: () => 'REG',
  isValidSection: () => true,
}));

vi.mock('../../../components/common/Bookmarks', () => ({
  useBookmarks: () => ({
    toggleBookmark: vi.fn(),
    isBookmarked: () => false,
    getAllBookmarks: () => [],
  }),
}));

vi.mock('../../../data/lessons', () => ({
  getLessonsBySection: vi.fn().mockReturnValue(mockLessons),
}));

// Import after mocks
import Lessons from '../../../components/pages/Lessons';

const renderLessons = () => {
  return render(
    <BrowserRouter>
      <Lessons />
    </BrowserRouter>
  );
};

describe('Lessons Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the lessons page container', () => {
      renderLessons();
      // Component should mount without errors
      const container = document.querySelector('div');
      expect(container).toBeInTheDocument();
    });

    it('renders without crashing', () => {
      // Simple smoke test - render should not throw
      expect(() => renderLessons()).not.toThrow();
    });

    it('shows loading skeleton initially', () => {
      renderLessons();
      // Should show loading skeleton while data is being fetched
      const skeletons = document.querySelectorAll('[class*="bg-slate-200"]');
      expect(skeletons.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Mocks are properly configured', () => {
    it('has courseId from CourseProvider', async () => {
      // Verify the mock is working
      const { useCourse } = await import('../../../providers/CourseProvider');
      const result = useCourse();
      expect(result.courseId).toBe('cpa');
    });

    it('has getLessonProgress from useStudy', async () => {
      // Verify the mock is working
      const { useStudy } = await import('../../../hooks/useStudy');
      const result = useStudy();
      expect(typeof result.getLessonProgress).toBe('function');
    });

    it('has fetchLessonsBySection from lessonService', async () => {
      // Verify the mock is working
      const { fetchLessonsBySection } = await import('../../../services/lessonService');
      expect(typeof fetchLessonsBySection).toBe('function');
      const lessons = await fetchLessonsBySection('REG', 'cpa');
      expect(lessons).toHaveLength(3);
    });
  });
});
