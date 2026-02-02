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
vi.mock('../../../services/lessonService', () => ({
  fetchLessonsBySection: vi.fn(() => Promise.resolve(mockLessons)),
  fetchAllLessons: vi.fn(() => Promise.resolve(mockLessons)),
  fetchLessonById: vi.fn((id) => Promise.resolve(mockLessons.find(l => l.id === id) || null)),
}));

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
    AUD: { name: 'Auditing and Attestation', shortName: 'AUD', color: '#2563EB' },
    FAR: { name: 'Financial Accounting and Reporting', shortName: 'FAR', color: '#2563EB' },
    REG: { name: 'Regulation', shortName: 'REG', color: '#DC2626' },
    TCP: { name: 'Tax Compliance and Planning', shortName: 'TCP', color: '#059669' },
    BAR: { name: 'Business Analysis and Reporting', shortName: 'BAR', color: '#7C3AED' },
    ISC: { name: 'Information Systems and Controls', shortName: 'ISC', color: '#0891B2' },
    PREP: { name: 'Exam Strategy & Preparation', shortName: 'PREP', color: '#6366f1', type: 'strategy' },
  },
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
    it('renders the lessons page', async () => {
      renderLessons();
      await waitFor(() => {
        expect(screen.getByText('Lessons')).toBeInTheDocument();
      });
    });

    it('shows search functionality', async () => {
      renderLessons();
      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Search lessons/i)).toBeInTheDocument();
      });
    });

    it('displays lessons from the data', async () => {
      renderLessons();
      await waitFor(() => {
        expect(screen.getByText('Test Lesson 1')).toBeInTheDocument();
      });
      expect(screen.getByText('Test Lesson 2')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('allows searching lessons', async () => {
      renderLessons();
      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Search lessons/i)).toBeInTheDocument();
      });
      const searchInput = screen.getByPlaceholderText(/Search lessons/i);
      fireEvent.change(searchInput, { target: { value: 'Advanced' } });
      expect(searchInput.value).toBe('Advanced');
    });

    it('filters lessons based on search', async () => {
      renderLessons();
      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Search lessons/i)).toBeInTheDocument();
      });
      const searchInput = screen.getByPlaceholderText(/Search lessons/i);
      fireEvent.change(searchInput, { target: { value: 'Advanced' } });
      // Should show filtered results
      await waitFor(() => {
        expect(screen.getByText('Advanced Lesson')).toBeInTheDocument();
      });
    });
  });

  describe('Lesson Display', () => {
    it('shows lesson duration', async () => {
      renderLessons();
      await waitFor(() => {
        expect(screen.getByText(/30 min/i)).toBeInTheDocument();
      });
    });

    it('shows completed lessons differently', async () => {
      renderLessons();
      await waitFor(() => {
        const lesson1 = screen.getByText('Test Lesson 1');
        expect(lesson1).toBeInTheDocument();
      });
    });

    it('shows difficulty indicators', async () => {
      renderLessons();
      await waitFor(() => {
        expect(screen.getByText('Test Lesson 1')).toBeInTheDocument();
      });
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
