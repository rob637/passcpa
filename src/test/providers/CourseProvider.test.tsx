/**
 * Tests for CourseProvider
 * Tests course context, detection, switching, and persistence
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Unmock CourseProvider for this test file - we need the real implementation
vi.unmock('../../providers/CourseProvider');

import { CourseProvider, useCourse, useCourseOptional } from '../../providers/CourseProvider';
import { DEFAULT_COURSE_ID } from '../../types/course';

// Test component that consumes the context
function TestConsumer() {
  const { course, courseId, isLoading, setCourse, availableCourses } = useCourse();
  return (
    <div>
      <span data-testid="course-id">{courseId}</span>
      <span data-testid="course-name">{course?.name || ''}</span>
      <span data-testid="loading">{isLoading ? 'true' : 'false'}</span>
      <span data-testid="available-count">{availableCourses.length}</span>
      <button onClick={() => setCourse('cma')} data-testid="switch-btn">
        Switch to CMA
      </button>
    </div>
  );
}

function OptionalTestConsumer() {
  const context = useCourseOptional();
  return (
    <div>
      <span data-testid="has-context">{context ? 'yes' : 'no'}</span>
      {context && <span data-testid="optional-course-id">{context.courseId}</span>}
    </div>
  );
}

describe('CourseProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Context Initialization', () => {
    it('should provide default course on initial load', async () => {
      render(
        <CourseProvider>
          <TestConsumer />
        </CourseProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading').textContent).toBe('false');
      });

      expect(screen.getByTestId('course-id').textContent).toBe(DEFAULT_COURSE_ID);
    });

    it('should accept initial course ID prop', async () => {
      render(
        <CourseProvider initialCourseId="cpa">
          <TestConsumer />
        </CourseProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading').textContent).toBe('false');
      });

      expect(screen.getByTestId('course-id').textContent).toBe('cpa');
    });

    it('should render loading state initially', () => {
      render(
        <CourseProvider>
          <TestConsumer />
        </CourseProvider>
      );

      // Just verify it renders without crashing
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    it('should provide available courses', async () => {
      render(
        <CourseProvider>
          <TestConsumer />
        </CourseProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading').textContent).toBe('false');
      });

      // Should have at least the default course available
      const count = parseInt(screen.getByTestId('available-count').textContent || '0');
      expect(count).toBeGreaterThanOrEqual(1);
    });

    it('should provide CPA course name', async () => {
      render(
        <CourseProvider initialCourseId="cpa">
          <TestConsumer />
        </CourseProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading').textContent).toBe('false');
      });

      expect(screen.getByTestId('course-name').textContent).toBe('CPA Exam Review');
    });
  });

  describe('Course Switching', () => {
    it('should allow switching courses via setCourse', async () => {
      const user = userEvent.setup();
      
      render(
        <CourseProvider>
          <TestConsumer />
        </CourseProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading').textContent).toBe('false');
      });

      const initialCourse = screen.getByTestId('course-id').textContent;
      expect(initialCourse).toBe('cpa');

      // Click switch button
      await user.click(screen.getByTestId('switch-btn'));

      await waitFor(() => {
        expect(screen.getByTestId('course-id').textContent).toBe('cma');
      });
    });
  });

  describe('useCourse Hook', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for expected error
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestConsumer />);
      }).toThrow();

      consoleSpy.mockRestore();
    });
  });

  describe('useCourseOptional Hook', () => {
    it('should return null when used outside provider', () => {
      render(<OptionalTestConsumer />);

      expect(screen.getByTestId('has-context').textContent).toBe('no');
    });

    it('should return context when inside provider', async () => {
      render(
        <CourseProvider>
          <OptionalTestConsumer />
        </CourseProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('has-context').textContent).toBe('yes');
      });

      expect(screen.getByTestId('optional-course-id').textContent).toBe(DEFAULT_COURSE_ID);
    });
  });

  describe('Provider Nesting', () => {
    it('should work with nested providers', async () => {
      render(
        <CourseProvider>
          <div data-testid="outer">
            <CourseProvider>
              <TestConsumer />
            </CourseProvider>
          </div>
        </CourseProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading').textContent).toBe('false');
      });

      expect(screen.getByTestId('course-id').textContent).toBe(DEFAULT_COURSE_ID);
    });
  });

  describe('Course Sections', () => {
    it('should provide course with sections', async () => {
      function SectionsConsumer() {
        const { course } = useCourse();
        return (
          <div>
            <span data-testid="sections-count">{course?.sections?.length || 0}</span>
          </div>
        );
      }

      render(
        <CourseProvider>
          <SectionsConsumer />
        </CourseProvider>
      );

      await waitFor(() => {
        const count = screen.getByTestId('sections-count').textContent;
        // CPA has 6 sections
        expect(parseInt(count || '0')).toBe(6);
      });
    });
  });
});
