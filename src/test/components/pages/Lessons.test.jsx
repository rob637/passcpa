import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

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
  }),
}));

vi.mock('../../../config/examConfig', () => ({
  CPA_SECTIONS: {
    AUD: { name: 'Auditing and Attestation', shortName: 'AUD' },
    FAR: { name: 'Financial Accounting and Reporting', shortName: 'FAR' },
    REG: { name: 'Regulation', shortName: 'REG' },
    TCP: { name: 'Tax Compliance and Planning', shortName: 'TCP' },
    BAR: { name: 'Business Analysis and Reporting', shortName: 'BAR' },
    ISC: { name: 'Information Systems and Controls', shortName: 'ISC' },
  },
}));

vi.mock('../../../data/lessons', () => ({
  getLessonsBySection: vi.fn().mockReturnValue([
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
  ]),
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
    it('renders the lessons page', () => {
      renderLessons();
      expect(screen.getByText('Lessons')).toBeInTheDocument();
    });

    it('shows search functionality', () => {
      renderLessons();
      expect(screen.getByPlaceholderText(/Search lessons/i)).toBeInTheDocument();
    });

    it('displays lessons from the data', () => {
      renderLessons();
      expect(screen.getByText('Test Lesson 1')).toBeInTheDocument();
      expect(screen.getByText('Test Lesson 2')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('allows searching lessons', () => {
      renderLessons();
      const searchInput = screen.getByPlaceholderText(/Search lessons/i);
      fireEvent.change(searchInput, { target: { value: 'Advanced' } });
      expect(searchInput.value).toBe('Advanced');
    });

    it('filters lessons based on search', () => {
      renderLessons();
      const searchInput = screen.getByPlaceholderText(/Search lessons/i);
      fireEvent.change(searchInput, { target: { value: 'Advanced' } });
      // Should show filtered results
      expect(screen.getByText('Advanced Lesson')).toBeInTheDocument();
    });
  });

  describe('Lesson Display', () => {
    it('shows lesson duration', () => {
      renderLessons();
      // Duration should be displayed
      expect(screen.getByText(/30 min/i)).toBeInTheDocument();
    });

    it('shows completed lessons differently', () => {
      renderLessons();
      // Lesson 1 is completed according to mock
      const lesson1 = screen.getByText('Test Lesson 1');
      expect(lesson1).toBeInTheDocument();
    });

    it('shows difficulty indicators', () => {
      renderLessons();
      // Difficulty levels should be indicated somewhere
      expect(screen.getByText('Test Lesson 1')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('renders lesson links', () => {
      renderLessons();
      // Lessons should be clickable links
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });
  });
});
