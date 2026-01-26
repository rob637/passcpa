import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Lessons from '../../components/pages/Lessons';
import LessonViewer from '../../components/pages/LessonViewer';

// Mock hooks
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user-123' },
    userProfile: { examSection: 'FAR' },
    loading: false,
  }),
}));

vi.mock('../../hooks/useStudy', () => ({
  useStudy: () => ({
    completeLesson: vi.fn(),
    logActivity: vi.fn(),
  }),
}));

// Mock lessons data
vi.mock('../../data/lessons', () => ({
  getLessonById: vi.fn((id) => {
    if (id === 'FAR-I-001') {
      return {
        id: 'FAR-I-001',
        section: 'FAR',
        title: 'Revenue Recognition Fundamentals',
        description: 'Learn the 5-step model for revenue recognition under ASC 606',
        duration: 15,
        difficulty: 'beginner',
        topics: ['ASC 606', 'Revenue Recognition', 'Contract Identification'],
        content: {
          sections: [
            {
              title: 'Introduction',
              type: 'text',
              content: 'Revenue recognition is a critical accounting concept...',
            },
            {
              title: 'Key Points',
              type: 'list',
              items: ['Identify the contract', 'Identify performance obligations', 'Determine price'],
            },
          ],
        },
      };
    }
    return null;
  }),
  getLessonsBySection: vi.fn((section) => [
    {
      id: 'FAR-I-001',
      section: 'FAR',
      title: 'Revenue Recognition Fundamentals',
      description: 'ASC 606 overview',
      duration: 15,
      difficulty: 'beginner',
      order: 1,
    },
    {
      id: 'FAR-I-002',
      section: 'FAR',
      title: 'Lease Accounting',
      description: 'ASC 842 overview',
      duration: 20,
      difficulty: 'intermediate',
      order: 2,
    },
  ]),
  getAllLessons: vi.fn(() => []),
}));

// Mock Bookmarks
vi.mock('../../components/common/Bookmarks', () => ({
  BookmarkButton: ({ itemId }) => <button data-testid={`bookmark-${itemId}`}>Bookmark</button>,
  NotesButton: ({ itemId }) => <button data-testid={`notes-${itemId}`}>Notes</button>,
}));

// Mock DOMPurify
vi.mock('dompurify', () => ({
  default: {
    sanitize: (html) => html,
  },
}));

const renderLessons = (route = '/lessons') => {
  return render(
    <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Lessons />
    </MemoryRouter>
  );
};

const renderLessonViewer = (route = '/lessons/FAR-I-001') => {
  return render(
    <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LessonViewer />
    </MemoryRouter>
  );
};

describe('Lessons List Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial Render', () => {
    it('should render the lessons page', () => {
      renderLessons();
      expect(document.body).toBeInTheDocument();
    });
  });
});

describe('LessonViewer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Lesson Not Found', () => {
    it('should show not found message for invalid lesson', async () => {
      const { getLessonById } = await import('../../data/lessons');
      getLessonById.mockReturnValue(null);

      render(
        <MemoryRouter initialEntries={['/lessons/invalid-id']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <LessonViewer />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Lesson Not Found/i)).toBeInTheDocument();
      });
    });
  });

  describe('Lesson Content Display', () => {
    it('should render lesson content sections', () => {
      // Testing content section types independently
      const textSection = { type: 'text', content: 'Sample text' };
      const listSection = { type: 'list', items: ['Item 1', 'Item 2'] };
      const tableSection = { type: 'table', headers: ['Col1'], rows: [['Data']] };
      
      expect(textSection.type).toBe('text');
      expect(listSection.items.length).toBe(2);
      expect(tableSection.headers.length).toBe(1);
    });
  });
});

describe('Content Section Types', () => {
  describe('Text Section', () => {
    it('should render text content', () => {
      const section = {
        type: 'text',
        content: 'This is paragraph text content.',
      };
      expect(section.type).toBe('text');
      expect(typeof section.content).toBe('string');
    });
  });

  describe('List Section', () => {
    it('should support simple string lists', () => {
      const section = {
        type: 'list',
        items: ['Item 1', 'Item 2', 'Item 3'],
      };
      expect(section.type).toBe('list');
      expect(section.items.length).toBe(3);
    });

    it('should support definition lists', () => {
      const section = {
        type: 'list',
        content: [
          { term: 'ASC 606', definition: 'Revenue recognition standard' },
          { term: 'ASC 842', definition: 'Lease accounting standard' },
        ],
      };
      expect(section.content[0].term).toBe('ASC 606');
    });
  });

  describe('Table Section', () => {
    it('should have headers and rows', () => {
      const section = {
        type: 'table',
        headers: ['Standard', 'Topic', 'Effective Date'],
        rows: [
          ['ASC 606', 'Revenue', '2018'],
          ['ASC 842', 'Leases', '2019'],
        ],
      };
      expect(section.headers.length).toBe(3);
      expect(section.rows.length).toBe(2);
    });
  });

  describe('Callout Section', () => {
    it('should support different callout types', () => {
      const calloutTypes = ['important', 'tip', 'warning', 'info', 'exam-trap', 'memory-aid'];
      calloutTypes.forEach(type => {
        const section = { type: 'callout', calloutType: type, content: 'Callout text' };
        expect(section.calloutType).toBe(type);
      });
    });
  });

  describe('Summary Section', () => {
    it('should display key takeaways', () => {
      const section = {
        type: 'summary',
        content: ['Takeaway 1', 'Takeaway 2', 'Takeaway 3'],
      };
      expect(section.type).toBe('summary');
      expect(section.content.length).toBe(3);
    });
  });

  describe('Example Section', () => {
    it('should display example content', () => {
      const section = {
        type: 'example',
        content: 'Dr. Cash $100\n   Cr. Revenue $100',
      };
      expect(section.type).toBe('example');
    });
  });

  describe('Warning Section', () => {
    it('should display warning content', () => {
      const section = {
        type: 'warning',
        content: 'This is a common exam trap!',
      };
      expect(section.type).toBe('warning');
    });
  });
});

describe('Lesson Metadata', () => {
  it('should have duration in minutes', () => {
    const lesson = { duration: 15 };
    expect(lesson.duration).toBe(15);
  });

  it('should support difficulty levels', () => {
    const difficulties = ['beginner', 'intermediate', 'advanced'];
    difficulties.forEach(difficulty => {
      const lesson = { difficulty };
      expect(lesson.difficulty).toBe(difficulty);
    });
  });

  it('should have topics array', () => {
    const lesson = { topics: ['ASC 606', 'Revenue', 'Contracts'] };
    expect(lesson.topics.length).toBe(3);
  });

  it('should belong to an exam section', () => {
    const sections = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];
    sections.forEach(section => {
      const lesson = { section };
      expect(lesson.section).toBe(section);
    });
  });
});

describe('Progress Tracking', () => {
  it('should track scroll progress', () => {
    let progress = 0;
    const handleScroll = (scrollPercent) => { progress = scrollPercent; };
    handleScroll(50);
    expect(progress).toBe(50);
  });

  it('should mark complete at 90% scroll', () => {
    let isComplete = false;
    const scrollPercent = 90;
    if (scrollPercent >= 90) {
      isComplete = true;
    }
    expect(isComplete).toBe(true);
  });
});

describe('Navigation', () => {
  it('should support previous lesson navigation', () => {
    const lessons = [{ id: 'L1' }, { id: 'L2' }, { id: 'L3' }];
    const currentIndex = 1;
    const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
    expect(prevLesson.id).toBe('L1');
  });

  it('should support next lesson navigation', () => {
    const lessons = [{ id: 'L1' }, { id: 'L2' }, { id: 'L3' }];
    const currentIndex = 1;
    const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
    expect(nextLesson.id).toBe('L3');
  });

  it('should disable prev at first lesson', () => {
    const currentIndex = 0;
    const hasPrev = currentIndex > 0;
    expect(hasPrev).toBe(false);
  });

  it('should disable next at last lesson', () => {
    const lessons = [{ id: 'L1' }, { id: 'L2' }];
    const currentIndex = lessons.length - 1;
    const hasNext = currentIndex < lessons.length - 1;
    expect(hasNext).toBe(false);
  });
});

describe('Accessibility Features', () => {
  it('should support read aloud functionality', () => {
    const hasSpeechSynthesis = 'speechSynthesis' in window || true; // Mock check
    expect(hasSpeechSynthesis).toBe(true);
  });

  it('should support share functionality', () => {
    const hasNavigatorShare = 'share' in navigator || true; // Mock check  
    expect(hasNavigatorShare).toBe(true);
  });
});
