import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CourseProvider, useCourse, useCourseOptional } from '../../providers/CourseProvider';
import { MemoryRouter } from 'react-router-dom';

// Explicitly unmock the provider to ensure we are testing the real implementation
// This guards against mock leakage from other tests (e.g. CourseSelector)
vi.unmock('../../providers/CourseProvider');

// Mock feature flags
vi.mock('../../config/featureFlags', () => ({
  ENABLE_EA_COURSE: true,
  ENABLE_CMA_COURSE: true,
  ENABLE_CIA_COURSE: true,
  ENABLE_CFP_COURSE: true,
  ENABLE_CISA_COURSE: true,
  FEATURES: {
    aiTutor: true,
    examSimulator: true,
    flashcards: true,
    tbs: true,
    writtenCommunication: true,
    adminTools: true,
    blueprint2026Preview: true,
    offlineMode: true,
    gamification: true,
  },
  isFeatureEnabled: () => true,
}));

// Mock course detection to act predictably
vi.mock('../../utils/courseDetection', () => ({
  detectCourse: vi.fn(() => ({ courseId: 'cpa', source: 'default' })),
  saveCoursePreference: vi.fn(),
}));

// Test component to consume context
const TestComponent = () => {
  const { courseId, setCourse, availableCourses, isLoading } = useCourse();
  if (isLoading) return <div data-testid="loading">Loading...</div>;
  
  return (
    <div>
      <div data-testid="course-id">{courseId}</div>
      <div data-testid="course-count">{availableCourses.length}</div>
      <button onClick={() => setCourse('cma')}>Switch to CMA</button>
    </div>
  );
};

// Optional consumer test component
const OptionalConsumer = () => {
  const context = useCourseOptional();
  return <div data-testid="optional-context">{context ? 'Context Found' : 'No Context'}</div>;
};

describe('CourseProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Context Initialization', () => {
    it('should provide default course on initial load', async () => {
      render(
        <MemoryRouter>
          <CourseProvider>
            <TestComponent />
          </CourseProvider>
        </MemoryRouter>
      );

      // Should default to CPA (as mocked in detectCourse)
      await waitFor(() => {
        expect(screen.getByTestId('course-id')).toHaveTextContent('cpa');
      });
    });

    it('should accept initial course ID prop', async () => {
      render(
        <MemoryRouter>
          <CourseProvider initialCourseId="ea">
            <TestComponent />
          </CourseProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('course-id')).toHaveTextContent('ea');
      });
    });

    it('should expose loading state via context', () => {
       const LoadingTest = () => {
         const { isLoading } = useCourse();
         return <div data-testid="loading-state">{isLoading ? 'true' : 'false'}</div>;
       };

      render(
        <MemoryRouter>
          <CourseProvider>
            <LoadingTest />
          </CourseProvider>
        </MemoryRouter>
      );
      
      expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    });

    it('should provide available courses', async () => {
      render(
        <MemoryRouter>
          <CourseProvider>
            <TestComponent />
          </CourseProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('course-count')).not.toHaveTextContent('0');
      });
    });

    it('should provide CPA course name', async () => {
      const NameComponent = () => {
        const { course } = useCourse(); 
        return <div data-testid="course-name">{course.name}</div>;
      };

      render(
        <MemoryRouter>
          <CourseProvider>
            <NameComponent />
          </CourseProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('course-name')).toHaveTextContent('CPA');
      });
    });
  });

  describe('Course Switching', () => {
    it('should allow switching courses via setCourse', async () => {
      render(
        <MemoryRouter>
          <CourseProvider>
            <TestComponent />
          </CourseProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('course-id')).toHaveTextContent('cpa');
      });

      screen.getByText('Switch to CMA').click();

      await waitFor(() => {
        expect(screen.getByTestId('course-id')).toHaveTextContent('cma');
      });
    });
  });

  describe('useCourse Hook', () => {
    it('should throw error when used outside provider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => render(<TestComponent />)).toThrow('useCourse must be used within a CourseProvider');
      
      consoleSpy.mockRestore();
    });
  });

  describe('useCourseOptional Hook', () => {
    it('should return null when used outside provider', () => {
      render(<OptionalConsumer />);
      expect(screen.getByTestId('optional-context')).toHaveTextContent('No Context');
    });

    it('should return context when inside provider', async () => {
      render(
        <MemoryRouter>
          <CourseProvider>
            <OptionalConsumer />
          </CourseProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('optional-context')).toHaveTextContent('Context Found');
      });
    });
  });

  describe('Provider Nesting', () => {
    it('should work with nested providers', async () => {
      render(
        <MemoryRouter>
          <CourseProvider initialCourseId="cpa">
             <CourseProvider initialCourseId="cma">
              <TestComponent />
            </CourseProvider>
          </CourseProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('course-id')).toHaveTextContent('cma');
      });
    });
  });

  describe('Course Sections', () => {
    it('should provide course with sections', async () => {
      const SectionsComponent = () => {
        const { course } = useCourse();
        return <div data-testid="sections-count">{course.sections?.length || 0}</div>;
      };

      render(
        <MemoryRouter>
          <CourseProvider>
            <SectionsComponent />
          </CourseProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        const count = screen.getByTestId('sections-count').textContent;
        expect(parseInt(count || '0')).toBeGreaterThan(0);
      });
    });
  });
});
