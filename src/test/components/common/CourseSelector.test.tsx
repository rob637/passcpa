/**
 * Tests for CourseSelector Component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CourseSelector } from '../../../components/common/CourseSelector';

// Mock the useCourse hook
const mockSetCourse = vi.fn();

vi.mock('../../../providers/CourseProvider', () => ({
  useCourse: () => ({
    courseId: 'cpa',
    setCourse: mockSetCourse,
    availableCourses: ['cpa'],
    userCourses: ['cpa'],
  }),
}));

// Mock course utilities
vi.mock('../../../courses', () => ({
  getCourse: vi.fn((id) => ({
    id,
    name: id === 'cpa' ? 'CPA Exam' : 'CMA Exam',
    shortName: id.toUpperCase(),
  })),
  isCourseActive: vi.fn((id) => id === 'cpa'),
  ACTIVE_COURSES: ['cpa'],
}));

describe('CourseSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the current course badge', () => {
      render(<CourseSelector />);
      expect(screen.getByRole('button', { name: /select course/i })).toBeInTheDocument();
    });

    it('shows CPA as current course', () => {
      render(<CourseSelector />);
      expect(screen.getByText('CPA')).toBeInTheDocument();
    });

    it('renders in compact mode', () => {
      render(<CourseSelector compact />);
      // In compact mode, the full name shouldn't be visible
      expect(screen.queryByText('CPA Exam')).not.toBeInTheDocument();
    });
  });

  describe('Dropdown Behavior', () => {
    it('opens dropdown when clicked', async () => {
      const user = userEvent.setup();
      render(<CourseSelector />);
      
      const button = screen.getByRole('button', { name: /select course/i });
      await user.click(button);
      
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('shows available courses in dropdown', async () => {
      const user = userEvent.setup();
      render(<CourseSelector />);
      
      const button = screen.getByRole('button', { name: /select course/i });
      await user.click(button);
      
      expect(screen.getByText('Select Course')).toBeInTheDocument();
    });

    it('shows coming soon badge for inactive courses', async () => {
      const user = userEvent.setup();
      render(<CourseSelector showComingSoon />);
      
      const button = screen.getByRole('button', { name: /select course/i });
      await user.click(button);
      
      // CMA should show as coming soon
      expect(screen.getAllByText('Soon').length).toBeGreaterThan(0);
    });

    it('closes dropdown when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <CourseSelector />
          <div data-testid="outside">Outside</div>
        </div>
      );
      
      const button = screen.getByRole('button', { name: /select course/i });
      await user.click(button);
      
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      
      // Click outside
      await user.click(screen.getByTestId('outside'));
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('closes dropdown on escape key', async () => {
      const user = userEvent.setup();
      render(<CourseSelector />);
      
      const button = screen.getByRole('button', { name: /select course/i });
      await user.click(button);
      
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('Course Selection', () => {
    it('shows check mark for selected course', async () => {
      const user = userEvent.setup();
      render(<CourseSelector />);
      
      const button = screen.getByRole('button', { name: /select course/i });
      await user.click(button);
      
      // The CPA option should be selected (current course)
      const options = screen.getAllByRole('option');
      const cpaOption = options.find(opt => opt.getAttribute('aria-selected') === 'true');
      expect(cpaOption).toBeTruthy();
    });

    it('does not call setCourse for coming soon courses', async () => {
      const user = userEvent.setup();
      render(<CourseSelector />);
      
      const button = screen.getByRole('button', { name: /select course/i });
      await user.click(button);
      
      // Try clicking CMA (coming soon)
      const cmaButtons = screen.getAllByRole('option');
      const cmaButton = cmaButtons.find(btn => btn.textContent?.includes('CMA'));
      
      if (cmaButton) {
        await user.click(cmaButton);
        // Should not have been called with 'cma' since it's not active
        expect(mockSetCourse).not.toHaveBeenCalledWith('cma');
      }
    });
  });

  describe('Accessibility', () => {
    it('has proper aria attributes on trigger', () => {
      render(<CourseSelector />);
      const button = screen.getByRole('button', { name: /select course/i });
      
      expect(button).toHaveAttribute('aria-haspopup', 'listbox');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded when opened', async () => {
      const user = userEvent.setup();
      render(<CourseSelector />);
      
      const button = screen.getByRole('button', { name: /select course/i });
      await user.click(button);
      
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('has proper role on dropdown', async () => {
      const user = userEvent.setup();
      render(<CourseSelector />);
      
      const button = screen.getByRole('button', { name: /select course/i });
      await user.click(button);
      
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });
});
